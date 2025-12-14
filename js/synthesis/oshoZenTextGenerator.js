/**
 * OSHO ZEN TEXT GENERATOR
 * =======================
 * Generiert Texte basierend auf Osho Zen Tarot Karten für die Top 5
 * übereinstimmenden Bedürfnisse zweier Profile.
 *
 * Ersetzt die separaten Pathos/Logos Buttons durch einen einzigen
 * "Gemeinsame Bedürfnisse" Button mit Osho Zen Weisheiten.
 *
 * Philosophische Grundlage:
 * - Osho Zen Tarot: Bewusstsein, Konditionierung, Flow, Meditation
 * - GFK (Rosenberg): Universelle menschliche Bedürfnisse
 */

const OshoZenTextGenerator = (function() {
    'use strict';

    // Cache für die geladenen Osho Zen Daten
    let oshoZenData = null;
    let isLoading = false;
    let loadPromise = null;

    // ═══════════════════════════════════════════════════════════════════════════
    // DATEN LADEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Lädt die Osho Zen Bedürfnis-Texte aus der JSON-Datei
     * @returns {Promise<Object>} Die geladenen Daten
     */
    async function loadOshoZenData() {
        if (oshoZenData) {
            return oshoZenData;
        }

        if (isLoading && loadPromise) {
            return loadPromise;
        }

        isLoading = true;
        loadPromise = fetch('profiles/data/osho-zen-beduerfnisse.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Osho Zen Daten konnten nicht geladen werden');
                }
                return response.json();
            })
            .then(data => {
                oshoZenData = data;
                isLoading = false;
                return data;
            })
            .catch(error => {
                console.error('Fehler beim Laden der Osho Zen Daten:', error);
                isLoading = false;
                throw error;
            });

        return loadPromise;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // TOP 5 BEDÜRFNIS-MATCH BERECHNUNG
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Berechnet die Top 5 Bedürfnisse mit der besten Übereinstimmung
     *
     * Übereinstimmung = Beide haben ähnlich hohe Werte für das Bedürfnis
     *
     * @param {Object} needs1 - Bedürfnisse von Person 1 { "#B1": 80, "#B2": 60, ... }
     * @param {Object} needs2 - Bedürfnisse von Person 2 { "#B1": 75, "#B2": 40, ... }
     * @param {number} topN - Anzahl der Top-Matches (default: 5)
     * @returns {Array} Array von { id, label, score1, score2, match, karte, text }
     */
    function calculateTopMatches(needs1, needs2, topN = 5) {
        if (!needs1 || !needs2 || !oshoZenData) {
            return [];
        }

        const matches = [];
        const beduerfnisse = oshoZenData.beduerfnisse || {};

        // Alle gemeinsamen Bedürfnisse durchgehen
        for (const needId in needs1) {
            if (needs2.hasOwnProperty(needId) && beduerfnisse.hasOwnProperty(needId)) {
                const score1 = parseFloat(needs1[needId]) || 0;
                const score2 = parseFloat(needs2[needId]) || 0;

                // Nur Bedürfnisse berücksichtigen, die beiden wichtig sind (> 30)
                if (score1 > 30 && score2 > 30) {
                    // Match-Score: Durchschnitt der beiden Werte * Ähnlichkeitsfaktor
                    const average = (score1 + score2) / 2;
                    const difference = Math.abs(score1 - score2);
                    const similarity = 1 - (difference / 100); // 0-1, höher = ähnlicher

                    // Gewichteter Match-Score
                    // Hohe Durchschnittswerte + hohe Ähnlichkeit = beste Matches
                    const matchScore = average * similarity;

                    const zenData = beduerfnisse[needId];
                    matches.push({
                        id: needId,
                        label: zenData.label || needId,
                        frage: zenData.frage || '',
                        score1: Math.round(score1),
                        score2: Math.round(score2),
                        matchScore: Math.round(matchScore),
                        karte: zenData.karte || 'Unknown',
                        text: zenData.text || ''
                    });
                }
            }
        }

        // Nach matchScore sortieren (höchster zuerst)
        matches.sort((a, b) => b.matchScore - a.matchScore);

        // Top N zurückgeben
        return matches.slice(0, topN);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // HTML GENERIERUNG
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Generiert HTML für die Top 5 gemeinsamen Bedürfnisse mit Accordion
     *
     * @param {Array} topMatches - Array von Match-Objekten
     * @param {string} name1 - Name von Person 1
     * @param {string} name2 - Name von Person 2
     * @returns {string} HTML-String
     */
    function generateHTML(topMatches, name1 = 'Ich', name2 = 'Partner') {
        if (!topMatches || topMatches.length === 0) {
            return `
                <div class="osho-zen-empty">
                    <p>Keine gemeinsamen Bedürfnisse gefunden.</p>
                    <p class="hint">Stellt sicher, dass beide Profile Bedürfnisse ausgefüllt haben.</p>
                </div>
            `;
        }

        let html = `
            <div class="osho-zen-container">
                <div class="osho-zen-header">
                    <h3>🔥 Eure Top ${topMatches.length} gemeinsamen Bedürfnisse</h3>
                    <p class="osho-zen-subtitle">Basierend auf der Übereinstimmung eurer Bedürfnis-Profile</p>
                </div>
                <div class="osho-zen-list">
        `;

        topMatches.forEach((match, index) => {
            const matchPercent = Math.round((match.matchScore / 100) * 100);
            const barWidth1 = match.score1;
            const barWidth2 = match.score2;

            html += `
                <div class="osho-zen-item" data-index="${index}">
                    <div class="osho-zen-item-header" onclick="OshoZenTextGenerator.toggleItem(${index})">
                        <div class="osho-zen-item-left">
                            <span class="osho-zen-rank">${index + 1}</span>
                            <span class="osho-zen-label">${match.label}</span>
                            <span class="osho-zen-karte">— ${match.karte}</span>
                        </div>
                        <div class="osho-zen-item-right">
                            <span class="osho-zen-match">${matchPercent}%</span>
                            <span class="osho-zen-toggle">▶</span>
                        </div>
                    </div>
                    <div class="osho-zen-item-content" style="display: none;">
                        <div class="osho-zen-scores">
                            <div class="osho-zen-score-row">
                                <span class="osho-zen-name">${name1}</span>
                                <div class="osho-zen-bar-container">
                                    <div class="osho-zen-bar" style="width: ${barWidth1}%"></div>
                                </div>
                                <span class="osho-zen-value">${match.score1}%</span>
                            </div>
                            <div class="osho-zen-score-row">
                                <span class="osho-zen-name">${name2}</span>
                                <div class="osho-zen-bar-container">
                                    <div class="osho-zen-bar bar-partner" style="width: ${barWidth2}%"></div>
                                </div>
                                <span class="osho-zen-value">${match.score2}%</span>
                            </div>
                        </div>
                        <div class="osho-zen-text">
                            <blockquote>
                                <span class="osho-zen-karte-icon">🃏</span>
                                <strong>${match.karte}:</strong> ${match.text}
                            </blockquote>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
                <div class="osho-zen-footer">
                    <small>
                        <em>Inhalte inspiriert durch das Osho Zen Tarot von Ma Deva Padma (St. Martins Press),
                        basierend auf den Lehren von Osho. Alle Rechte bei den jeweiligen Inhabern.</em>
                    </small>
                </div>
            </div>
        `;

        return html;
    }

    /**
     * Toggle für Accordion-Items
     * @param {number} index - Index des Items
     */
    function toggleItem(index) {
        const items = document.querySelectorAll('.osho-zen-item');
        const item = items[index];
        if (!item) return;

        const content = item.querySelector('.osho-zen-item-content');
        const toggle = item.querySelector('.osho-zen-toggle');

        if (content.style.display === 'none') {
            content.style.display = 'block';
            toggle.textContent = '▼';
            item.classList.add('expanded');
        } else {
            content.style.display = 'none';
            toggle.textContent = '▶';
            item.classList.remove('expanded');
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // HAUPT-GENERIERUNGS-FUNKTION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Hauptfunktion: Generiert die komplette Osho Zen Ansicht für zwei Profile
     *
     * @param {Object} config - Konfiguration
     * @param {Object} config.profile1 - Erstes Profil mit needs-Objekt
     * @param {Object} config.profile2 - Zweites Profil mit needs-Objekt
     * @param {string} config.name1 - Name von Person 1
     * @param {string} config.name2 - Name von Person 2
     * @param {number} config.topN - Anzahl der Top-Matches (default: 5)
     * @returns {Promise<string>} HTML-String
     */
    async function generate(config) {
        const {
            profile1,
            profile2,
            name1 = 'Ich',
            name2 = 'Partner',
            topN = 5
        } = config;

        // Daten laden falls noch nicht geschehen
        await loadOshoZenData();

        // Bedürfnisse extrahieren (flatNeeds enthält die tatsächlichen Bewertungen)
        const needs1 = profile1?.profileReview?.flatNeeds || profile1?.needs || profile1?.beduerfnisse || {};
        const needs2 = profile2?.profileReview?.flatNeeds || profile2?.needs || profile2?.beduerfnisse || {};

        // Top-Matches berechnen
        const topMatches = calculateTopMatches(needs1, needs2, topN);

        // HTML generieren
        return generateHTML(topMatches, name1, name2);
    }

    /**
     * Synchrone Version für Fälle wo Daten bereits geladen sind
     */
    function generateSync(config) {
        if (!oshoZenData) {
            console.warn('OshoZenTextGenerator: Daten noch nicht geladen. Verwende generate() stattdessen.');
            return '<div class="osho-zen-loading">Lade Osho Zen Daten...</div>';
        }

        const {
            profile1,
            profile2,
            name1 = 'Ich',
            name2 = 'Partner',
            topN = 5
        } = config;

        const needs1 = profile1?.profileReview?.flatNeeds || profile1?.needs || profile1?.beduerfnisse || {};
        const needs2 = profile2?.profileReview?.flatNeeds || profile2?.needs || profile2?.beduerfnisse || {};
        const topMatches = calculateTopMatches(needs1, needs2, topN);

        return generateHTML(topMatches, name1, name2);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // CSS STYLES (inline für einfache Integration)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Fügt die CSS-Styles ein falls noch nicht vorhanden
     */
    function injectStyles() {
        if (document.getElementById('osho-zen-styles')) return;

        const styles = `
            .osho-zen-container {
                font-family: var(--font-family, 'Segoe UI', sans-serif);
                max-width: 100%;
                padding: 1rem;
            }

            .osho-zen-header {
                text-align: center;
                margin-bottom: 1.5rem;
            }

            .osho-zen-header h3 {
                margin: 0 0 0.5rem 0;
                color: var(--text-color, #333);
                font-size: 1.3rem;
            }

            .osho-zen-subtitle {
                color: var(--text-muted, #666);
                font-size: 0.9rem;
                margin: 0;
            }

            .osho-zen-list {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }

            .osho-zen-item {
                background: var(--card-bg, #f8f9fa);
                border-radius: 8px;
                overflow: hidden;
                border: 1px solid var(--border-color, #e0e0e0);
                transition: box-shadow 0.2s ease;
            }

            .osho-zen-item:hover {
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }

            .osho-zen-item.expanded {
                border-color: var(--primary-color, #8B5CF6);
            }

            .osho-zen-item-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem 1rem;
                cursor: pointer;
                user-select: none;
            }

            .osho-zen-item-header:hover {
                background: var(--hover-bg, rgba(0,0,0,0.03));
            }

            .osho-zen-item-left {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                flex: 1;
            }

            .osho-zen-rank {
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 24px;
                height: 24px;
                background: var(--primary-color, #8B5CF6);
                color: white;
                border-radius: 50%;
                font-size: 0.8rem;
                font-weight: bold;
            }

            .osho-zen-label {
                font-weight: 600;
                color: var(--text-color, #333);
            }

            .osho-zen-karte {
                color: var(--text-muted, #888);
                font-style: italic;
                font-size: 0.9rem;
            }

            .osho-zen-item-right {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }

            .osho-zen-match {
                background: var(--success-bg, #d4edda);
                color: var(--success-color, #155724);
                padding: 0.25rem 0.5rem;
                border-radius: 4px;
                font-size: 0.85rem;
                font-weight: 600;
            }

            .osho-zen-toggle {
                color: var(--text-muted, #888);
                font-size: 0.8rem;
                transition: transform 0.2s ease;
            }

            .osho-zen-item.expanded .osho-zen-toggle {
                transform: rotate(90deg);
            }

            .osho-zen-item-content {
                padding: 1rem;
                border-top: 1px solid var(--border-color, #e0e0e0);
                background: var(--content-bg, white);
            }

            .osho-zen-scores {
                margin-bottom: 1rem;
            }

            .osho-zen-score-row {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 0.5rem;
            }

            .osho-zen-name {
                width: 80px;
                font-size: 0.85rem;
                color: var(--text-muted, #666);
            }

            .osho-zen-bar-container {
                flex: 1;
                height: 8px;
                background: var(--bar-bg, #e9ecef);
                border-radius: 4px;
                overflow: hidden;
            }

            .osho-zen-bar {
                height: 100%;
                background: var(--primary-color, #8B5CF6);
                border-radius: 4px;
                transition: width 0.3s ease;
            }

            .osho-zen-bar.bar-partner {
                background: var(--secondary-color, #EC4899);
            }

            .osho-zen-value {
                width: 40px;
                text-align: right;
                font-size: 0.85rem;
                color: var(--text-color, #333);
                font-weight: 500;
            }

            .osho-zen-text {
                margin-top: 1rem;
            }

            .osho-zen-text blockquote {
                margin: 0;
                padding: 1rem;
                background: var(--quote-bg, #f0f0f5);
                border-left: 4px solid var(--primary-color, #8B5CF6);
                border-radius: 0 8px 8px 0;
                font-style: italic;
                color: var(--text-color, #333);
                line-height: 1.6;
            }

            .osho-zen-karte-icon {
                margin-right: 0.5rem;
            }

            .osho-zen-footer {
                margin-top: 1.5rem;
                padding-top: 1rem;
                border-top: 1px solid var(--border-color, #e0e0e0);
                text-align: center;
                color: var(--text-muted, #888);
            }

            .osho-zen-empty {
                text-align: center;
                padding: 2rem;
                color: var(--text-muted, #666);
            }

            .osho-zen-empty .hint {
                font-size: 0.85rem;
                margin-top: 0.5rem;
            }

            .osho-zen-loading {
                text-align: center;
                padding: 2rem;
                color: var(--text-muted, #666);
            }

            /* Dark Mode Support */
            @media (prefers-color-scheme: dark) {
                .osho-zen-container {
                    --text-color: #e0e0e0;
                    --text-muted: #a0a0a0;
                    --card-bg: #2d2d2d;
                    --border-color: #404040;
                    --hover-bg: rgba(255,255,255,0.05);
                    --content-bg: #1e1e1e;
                    --bar-bg: #404040;
                    --quote-bg: #2d2d2d;
                    --success-bg: #1e4620;
                    --success-color: #90ee90;
                }
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.id = 'osho-zen-styles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Hauptfunktionen
        generate: generate,
        generateSync: generateSync,
        loadData: loadOshoZenData,

        // UI-Funktionen
        toggleItem: toggleItem,
        injectStyles: injectStyles,

        // Hilfsfunktionen
        calculateTopMatches: calculateTopMatches,

        // Für Debugging
        getData: function() { return oshoZenData; },
        isDataLoaded: function() { return oshoZenData !== null; }
    };

})();

// Automatisch Styles injizieren wenn DOM bereit
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        OshoZenTextGenerator.injectStyles();
    });
} else {
    OshoZenTextGenerator.injectStyles();
}
