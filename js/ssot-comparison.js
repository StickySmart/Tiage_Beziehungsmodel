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
        },

        disable: function() {
            config.enabled = false;
            console.log('[SSOT] Vergleichs-Logging DEAKTIVIERT');
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

        // Historie
        getHistory: function() { return [...history]; },
        getDivergences: function() { return [...divergences]; },
        clearHistory: function() {
            history.length = 0;
            divergences.length = 0;
            console.log('[SSOT] Historie gelöscht');
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
