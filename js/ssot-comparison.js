/**
 * SSOT-VERGLEICHS-MODUL
 *
 * Vergleicht Client- und Server-Berechnungen ohne bestehende Logik zu ändern.
 * Loggt Divergenzen für schrittweise Migration zu echtem SSOT.
 *
 * RISIKO: 0 - Nur Logging, keine Änderung an Berechnungen
 *
 * Aktivierung: SSOTComparison.enable()
 * Deaktivierung: SSOTComparison.disable()
 * Report: SSOTComparison.getReport()
 */

var SSOTComparison = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // KONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════════

    const config = {
        enabled: false,
        logToConsole: true,
        tolerance: 0.01,           // 1% Toleranz für Floating-Point
        maxHistory: 100,           // Max gespeicherte Vergleiche
        serverEndpoint: '/api/calculate/synthesis',
        compareOnEveryCalculation: true
    };

    // Speicher für Vergleichs-Historie
    const history = [];
    const divergences = [];

    // ═══════════════════════════════════════════════════════════════════════════
    // VERGLEICHS-LOGIK
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Vergleicht zwei Werte mit Toleranz
     */
    function isEqual(a, b, tolerance) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            return a === b;
        }
        return Math.abs(a - b) <= (tolerance || config.tolerance);
    }

    /**
     * Tiefenvergleich zweier Objekte
     */
    function deepCompare(client, server, path) {
        path = path || '';
        const differences = [];

        if (typeof client !== typeof server) {
            differences.push({
                path: path || 'root',
                client: client,
                server: server,
                type: 'type_mismatch'
            });
            return differences;
        }

        if (typeof client === 'object' && client !== null) {
            const allKeys = new Set([...Object.keys(client || {}), ...Object.keys(server || {})]);

            for (const key of allKeys) {
                const newPath = path ? `${path}.${key}` : key;
                const subDiffs = deepCompare(client[key], server[key], newPath);
                differences.push(...subDiffs);
            }
        } else if (!isEqual(client, server)) {
            differences.push({
                path: path || 'root',
                client: client,
                server: server,
                diff: typeof client === 'number' ? Math.abs(client - server) : null,
                type: 'value_mismatch'
            });
        }

        return differences;
    }

    /**
     * Hauptvergleichsfunktion - wird nach jeder Client-Berechnung aufgerufen
     */
    async function compare(clientResult, person1, person2, options) {
        if (!config.enabled) return null;

        const timestamp = new Date().toISOString();
        const comparison = {
            timestamp,
            input: {
                person1: sanitizeInput(person1),
                person2: sanitizeInput(person2),
                options: options
            },
            clientResult: sanitizeResult(clientResult),
            serverResult: null,
            differences: [],
            status: 'pending'
        };

        try {
            // Server-Berechnung parallel ausführen
            const serverResult = await fetchServerCalculation(person1, person2, options);
            comparison.serverResult = sanitizeResult(serverResult);

            // Vergleich durchführen
            comparison.differences = deepCompare(
                comparison.clientResult,
                comparison.serverResult
            );

            // Status setzen
            if (comparison.differences.length === 0) {
                comparison.status = 'match';
            } else {
                comparison.status = 'divergence';
                divergences.push(comparison);

                if (config.logToConsole) {
                    console.warn('[SSOT] DIVERGENZ ERKANNT!', {
                        timestamp,
                        clientScore: clientResult.score,
                        serverScore: serverResult?.score,
                        differences: comparison.differences
                    });
                }
            }

        } catch (error) {
            comparison.status = 'server_error';
            comparison.error = error.message;

            if (config.logToConsole) {
                console.info('[SSOT] Server nicht erreichbar:', error.message);
            }
        }

        // Historie aktualisieren
        history.push(comparison);
        if (history.length > config.maxHistory) {
            history.shift();
        }

        // Log bei Erfolg
        if (config.logToConsole && comparison.status === 'match') {
            console.log('[SSOT] ✓ Client = Server', {
                score: clientResult.score,
                timestamp
            });
        }

        return comparison;
    }

    /**
     * Server-API aufrufen
     */
    async function fetchServerCalculation(person1, person2, options) {
        const response = await fetch(config.serverEndpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ich: person1,
                partner: person2,
                options: options
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        // Server gibt { success: true, result: {...} } zurück
        if (data.success && data.result) {
            return data.result;
        }

        return data;
    }

    /**
     * Input-Daten für Logging bereinigen (keine sensiblen Daten)
     */
    function sanitizeInput(person) {
        if (!person) return null;
        return {
            archetyp: person.archetyp,
            geschlecht: person.geschlecht,
            dominanz: person.dominanz,
            orientierung: person.orientierung,
            hasNeeds: !!(person.needs && Object.keys(person.needs).length > 0),
            needsCount: person.needs ? Object.keys(person.needs).length : 0
        };
    }

    /**
     * Ergebnis für Logging bereinigen
     */
    function sanitizeResult(result) {
        if (!result) return null;
        return {
            score: result.score,
            blocked: result.blocked,
            breakdown: result.breakdown,
            resonanz: result.resonanz,
            // Keine vollständigen Needs-Daten loggen
        };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // REPORT-FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Generiert einen Bericht über alle Vergleiche
     */
    function getReport() {
        const total = history.length;
        const matches = history.filter(h => h.status === 'match').length;
        const divergenceCount = history.filter(h => h.status === 'divergence').length;
        const errors = history.filter(h => h.status === 'server_error').length;

        return {
            summary: {
                total,
                matches,
                divergences: divergenceCount,
                errors,
                matchRate: total > 0 ? ((matches / total) * 100).toFixed(1) + '%' : 'N/A'
            },
            divergences: divergences.map(d => ({
                timestamp: d.timestamp,
                clientScore: d.clientResult?.score,
                serverScore: d.serverResult?.score,
                differences: d.differences
            })),
            config: { ...config }
        };
    }

    /**
     * Gibt häufigste Divergenz-Felder zurück
     */
    function getDivergenceHotspots() {
        const pathCounts = {};

        for (const d of divergences) {
            for (const diff of d.differences) {
                pathCounts[diff.path] = (pathCounts[diff.path] || 0) + 1;
            }
        }

        return Object.entries(pathCounts)
            .sort((a, b) => b[1] - a[1])
            .map(([path, count]) => ({ path, count }));
    }

    /**
     * Console-Report ausgeben
     */
    function printReport() {
        const report = getReport();

        console.group('[SSOT] Vergleichs-Report');
        console.log('═══════════════════════════════════════════════════════');
        console.log('Gesamt:      ', report.summary.total);
        console.log('Übereinstimmungen:', report.summary.matches, `(${report.summary.matchRate})`);
        console.log('Divergenzen: ', report.summary.divergences);
        console.log('Server-Fehler:', report.summary.errors);
        console.log('═══════════════════════════════════════════════════════');

        if (report.summary.divergences > 0) {
            console.group('Hotspots (häufigste Divergenzen):');
            getDivergenceHotspots().slice(0, 10).forEach(h => {
                console.log(`  ${h.path}: ${h.count}x`);
            });
            console.groupEnd();
        }

        console.groupEnd();

        return report;
    }

    /**
     * Berechnet detaillierte Score-Statistiken
     */
    function getScoreStatistics() {
        const scoreDiffs = divergences
            .filter(d => d.clientResult?.score !== undefined && d.serverResult?.score !== undefined)
            .map(d => ({
                diff: Math.abs(d.clientResult.score - d.serverResult.score),
                client: d.clientResult.score,
                server: d.serverResult.score,
                timestamp: d.timestamp
            }));

        if (scoreDiffs.length === 0) {
            return { count: 0, avgDiff: 0, maxDiff: 0, minDiff: 0 };
        }

        const diffs = scoreDiffs.map(s => s.diff);
        return {
            count: scoreDiffs.length,
            avgDiff: Math.round((diffs.reduce((a, b) => a + b, 0) / diffs.length) * 100) / 100,
            maxDiff: Math.round(Math.max(...diffs) * 100) / 100,
            minDiff: Math.round(Math.min(...diffs) * 100) / 100,
            details: scoreDiffs
        };
    }

    /**
     * Exportiert Report als JSON
     */
    function exportJSON() {
        const report = {
            exportedAt: new Date().toISOString(),
            summary: getReport().summary,
            statistics: getScoreStatistics(),
            hotspots: getDivergenceHotspots(),
            divergences: divergences.map(d => ({
                timestamp: d.timestamp,
                input: d.input,
                clientScore: d.clientResult?.score,
                serverScore: d.serverResult?.score,
                differences: d.differences
            })),
            history: history.map(h => ({
                timestamp: h.timestamp,
                status: h.status,
                clientScore: h.clientResult?.score,
                serverScore: h.serverResult?.score
            }))
        };

        return JSON.stringify(report, null, 2);
    }

    /**
     * Exportiert Report als CSV
     */
    function exportCSV() {
        const lines = ['timestamp,status,clientScore,serverScore,scoreDiff,divergentPaths'];

        for (const h of history) {
            const clientScore = h.clientResult?.score ?? '';
            const serverScore = h.serverResult?.score ?? '';
            const scoreDiff = (clientScore !== '' && serverScore !== '')
                ? Math.abs(clientScore - serverScore).toFixed(2)
                : '';
            const paths = h.differences?.map(d => d.path).join(';') || '';

            lines.push(`${h.timestamp},${h.status},${clientScore},${serverScore},${scoreDiff},"${paths}"`);
        }

        return lines.join('\n');
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // UI-RENDERING
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Rendert ein Divergenz-Report UI in einem Container
     */
    function renderUI(containerId) {
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('[SSOT] Container nicht gefunden:', containerId);
            return;
        }

        const report = getReport();
        const stats = getScoreStatistics();
        const hotspots = getDivergenceHotspots().slice(0, 10);

        // Status-Farbe bestimmen
        let statusColor = '#4CAF50';  // Grün
        let statusText = 'SSOT OK';
        if (report.summary.divergences > 0) {
            statusColor = '#ff9800';  // Orange
            statusText = 'DIVERGENZEN';
        }
        if (report.summary.errors > report.summary.total / 2) {
            statusColor = '#f44336';  // Rot
            statusText = 'SERVER-FEHLER';
        }

        container.innerHTML = `
            <div class="ssot-report" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px; background: #1a1a2e; color: #eee; border-radius: 12px;">

                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="margin: 0; color: #00d9ff;">SSOT Divergenz-Report</h2>
                    <div style="display: flex; gap: 10px;">
                        <button id="ssot-toggle-btn" style="padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; background: ${config.enabled ? '#4CAF50' : '#666'}; color: white;">
                            ${config.enabled ? 'Aktiv' : 'Inaktiv'}
                        </button>
                        <button id="ssot-export-json" style="padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; background: #2196F3; color: white;">
                            JSON
                        </button>
                        <button id="ssot-export-csv" style="padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; background: #2196F3; color: white;">
                            CSV
                        </button>
                        <button id="ssot-clear" style="padding: 8px 16px; border: none; border-radius: 6px; cursor: pointer; background: #f44336; color: white;">
                            Löschen
                        </button>
                    </div>
                </div>

                <!-- Status-Banner -->
                <div style="background: ${statusColor}; color: white; padding: 15px; border-radius: 8px; text-align: center; margin-bottom: 20px;">
                    <span style="font-size: 24px; font-weight: bold;">${statusText}</span>
                    <span style="margin-left: 20px; font-size: 18px;">${report.summary.matchRate} Übereinstimmung</span>
                </div>

                <!-- Statistik-Karten -->
                <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 20px;">
                    <div style="background: #16213e; padding: 15px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 32px; font-weight: bold; color: #00d9ff;">${report.summary.total}</div>
                        <div style="color: #888;">Vergleiche</div>
                    </div>
                    <div style="background: #16213e; padding: 15px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 32px; font-weight: bold; color: #4CAF50;">${report.summary.matches}</div>
                        <div style="color: #888;">Übereinstimmungen</div>
                    </div>
                    <div style="background: #16213e; padding: 15px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 32px; font-weight: bold; color: #ff9800;">${report.summary.divergences}</div>
                        <div style="color: #888;">Divergenzen</div>
                    </div>
                    <div style="background: #16213e; padding: 15px; border-radius: 8px; text-align: center;">
                        <div style="font-size: 32px; font-weight: bold; color: #f44336;">${report.summary.errors}</div>
                        <div style="color: #888;">Server-Fehler</div>
                    </div>
                </div>

                <!-- Score-Statistiken -->
                ${stats.count > 0 ? `
                <div style="background: #16213e; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h3 style="margin-top: 0; color: #00d9ff;">Score-Abweichungen</h3>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                        <div>
                            <span style="color: #888;">Durchschnitt:</span>
                            <span style="font-weight: bold; color: #ff9800;"> ${stats.avgDiff} Punkte</span>
                        </div>
                        <div>
                            <span style="color: #888;">Maximum:</span>
                            <span style="font-weight: bold; color: #f44336;"> ${stats.maxDiff} Punkte</span>
                        </div>
                        <div>
                            <span style="color: #888;">Minimum:</span>
                            <span style="font-weight: bold; color: #4CAF50;"> ${stats.minDiff} Punkte</span>
                        </div>
                    </div>
                </div>
                ` : ''}

                <!-- Hotspots -->
                ${hotspots.length > 0 ? `
                <div style="background: #16213e; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h3 style="margin-top: 0; color: #00d9ff;">Häufigste Divergenzen (Hotspots)</h3>
                    <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                        ${hotspots.map(h => `
                            <span style="background: #ff9800; color: #000; padding: 5px 12px; border-radius: 15px; font-size: 13px;">
                                ${h.path} <strong>(${h.count}x)</strong>
                            </span>
                        `).join('')}
                    </div>
                </div>
                ` : ''}

                <!-- Letzte Divergenzen -->
                ${divergences.length > 0 ? `
                <div style="background: #16213e; padding: 15px; border-radius: 8px;">
                    <h3 style="margin-top: 0; color: #00d9ff;">Letzte Divergenzen</h3>
                    <div style="max-height: 300px; overflow-y: auto;">
                        ${divergences.slice(-10).reverse().map(d => `
                            <div style="background: #0f3460; padding: 12px; border-radius: 6px; margin-bottom: 10px; border-left: 4px solid #ff9800;">
                                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                                    <span style="color: #888; font-size: 12px;">${new Date(d.timestamp).toLocaleString('de-DE')}</span>
                                    <span>
                                        <span style="color: #00d9ff;">Client: ${d.clientResult?.score ?? '?'}</span>
                                        <span style="color: #888;"> vs </span>
                                        <span style="color: #ff9800;">Server: ${d.serverResult?.score ?? '?'}</span>
                                    </span>
                                </div>
                                <div style="font-size: 12px; color: #aaa;">
                                    ${d.input?.person1?.archetyp || '?'} + ${d.input?.person2?.archetyp || '?'}
                                </div>
                                <div style="margin-top: 8px; font-size: 11px;">
                                    ${d.differences.slice(0, 5).map(diff => `
                                        <span style="background: #1a1a2e; padding: 2px 8px; border-radius: 4px; margin-right: 5px;">
                                            ${diff.path}: ${typeof diff.client === 'number' ? diff.client.toFixed(2) : diff.client} != ${typeof diff.server === 'number' ? diff.server.toFixed(2) : diff.server}
                                        </span>
                                    `).join('')}
                                    ${d.differences.length > 5 ? `<span style="color: #888;">+${d.differences.length - 5} weitere</span>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : `
                <div style="background: #16213e; padding: 30px; border-radius: 8px; text-align: center; color: #4CAF50;">
                    <span style="font-size: 48px;">✓</span>
                    <p>Keine Divergenzen gefunden!</p>
                    <p style="color: #888; font-size: 13px;">
                        ${config.enabled
                            ? 'SSOT-Vergleich ist aktiv. Führen Sie Berechnungen durch, um Vergleiche zu sammeln.'
                            : 'Aktivieren Sie den SSOT-Vergleich, um Client vs. Server zu testen.'}
                    </p>
                </div>
                `}

                <!-- Footer -->
                <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #333; font-size: 12px; color: #666; text-align: center;">
                    SSOT Comparison Module v1.0 | Toleranz: ${config.tolerance * 100}% |
                    Aktivierung: <code style="background: #333; padding: 2px 6px; border-radius: 3px;">?ssot=true</code>
                </div>
            </div>
        `;

        // Event-Listener hinzufügen
        document.getElementById('ssot-toggle-btn')?.addEventListener('click', function() {
            if (config.enabled) {
                SSOTComparison.disable();
            } else {
                SSOTComparison.enable();
            }
            renderUI(containerId);
        });

        document.getElementById('ssot-export-json')?.addEventListener('click', function() {
            const json = exportJSON();
            downloadFile('ssot-report.json', json, 'application/json');
        });

        document.getElementById('ssot-export-csv')?.addEventListener('click', function() {
            const csv = exportCSV();
            downloadFile('ssot-report.csv', csv, 'text/csv');
        });

        document.getElementById('ssot-clear')?.addEventListener('click', function() {
            if (confirm('Alle SSOT-Vergleichsdaten löschen?')) {
                SSOTComparison.clearHistory();
                renderUI(containerId);
            }
        });
    }

    /**
     * Hilfsfunktion: Datei herunterladen
     */
    function downloadFile(filename, content, mimeType) {
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    /**
     * Erstellt ein schwebendes Mini-Widget für Status-Anzeige
     */
    function createStatusWidget() {
        // Prüfen ob Widget bereits existiert
        if (document.getElementById('ssot-status-widget')) return;

        const widget = document.createElement('div');
        widget.id = 'ssot-status-widget';
        widget.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #1a1a2e;
            color: #eee;
            padding: 10px 15px;
            border-radius: 8px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 13px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.3);
            z-index: 10000;
            cursor: pointer;
            transition: all 0.3s ease;
        `;
        widget.innerHTML = '<span id="ssot-widget-content">SSOT: Laden...</span>';

        widget.addEventListener('click', function() {
            printReport();
        });

        document.body.appendChild(widget);
        updateStatusWidget();

        // Auto-Update alle 5 Sekunden
        setInterval(updateStatusWidget, 5000);
    }

    /**
     * Aktualisiert das Status-Widget
     */
    function updateStatusWidget() {
        const widget = document.getElementById('ssot-widget-content');
        if (!widget) return;

        const report = getReport();

        if (!config.enabled) {
            widget.innerHTML = '<span style="color: #666;">SSOT: Inaktiv</span>';
            return;
        }

        let color = '#4CAF50';
        if (report.summary.divergences > 0) color = '#ff9800';
        if (report.summary.errors > 0) color = '#f44336';

        widget.innerHTML = `
            <span style="color: ${color};">SSOT</span>:
            ${report.summary.matches}/${report.summary.total}
            <span style="color: #888;">(${report.summary.matchRate})</span>
            ${report.summary.divergences > 0 ? `<span style="color: #ff9800;"> | ${report.summary.divergences} Div.</span>` : ''}
        `;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // WRAPPER FÜR BESTEHENDE FUNKTION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Wrapper der die bestehende calculateRelationshipQuality umhüllt
     * OHNE sie zu modifizieren - nur zusätzliches Logging
     */
    function wrapCalculation(originalFunction) {
        return function(person1, person2, options) {
            // Original-Funktion aufrufen (unverändert!)
            const clientResult = originalFunction(person1, person2, options);

            // Vergleich im Hintergrund (async, blockiert nicht)
            if (config.enabled && config.compareOnEveryCalculation) {
                compare(clientResult, person1, person2, options).catch(err => {
                    console.warn('[SSOT] Vergleichs-Fehler:', err);
                });
            }

            // Original-Ergebnis zurückgeben (Client bleibt unverändert!)
            return clientResult;
        };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Steuerung
        enable: function() {
            config.enabled = true;
            console.log('[SSOT] Vergleichs-Logging AKTIVIERT');
            console.log('[SSOT] Server-Endpoint:', config.serverEndpoint);
            updateStatusWidget();
        },

        disable: function() {
            config.enabled = false;
            console.log('[SSOT] Vergleichs-Logging DEAKTIVIERT');
            updateStatusWidget();
        },

        isEnabled: function() {
            return config.enabled;
        },

        // Konfiguration
        configure: function(options) {
            Object.assign(config, options);
            console.log('[SSOT] Konfiguration aktualisiert:', config);
        },

        // Manueller Vergleich
        compare: compare,

        // Wrapper für automatischen Vergleich
        wrapCalculation: wrapCalculation,

        // Reports
        getReport: getReport,
        getDivergenceHotspots: getDivergenceHotspots,
        printReport: printReport,
        getScoreStatistics: getScoreStatistics,

        // Export
        exportJSON: exportJSON,
        exportCSV: exportCSV,

        // UI
        renderUI: renderUI,
        createStatusWidget: createStatusWidget,

        // Historie
        getHistory: function() { return [...history]; },
        getDivergences: function() { return [...divergences]; },
        clearHistory: function() {
            history.length = 0;
            divergences.length = 0;
            console.log('[SSOT] Historie gelöscht');
            updateStatusWidget();
        }
    };

})();

// ═══════════════════════════════════════════════════════════════════════════
// AUTO-AKTIVIERUNG (optional via URL-Parameter)
// ═══════════════════════════════════════════════════════════════════════════
// Aktiviere mit: ?ssot=true oder ?ssot-compare=true

(function() {
    if (typeof window !== 'undefined' && window.location) {
        const params = new URLSearchParams(window.location.search);
        if (params.get('ssot') === 'true' || params.get('ssot-compare') === 'true') {
            SSOTComparison.enable();
        }
    }
})();

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SSOTComparison;
}
