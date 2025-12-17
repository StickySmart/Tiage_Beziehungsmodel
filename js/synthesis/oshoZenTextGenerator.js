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
    let tarotKartenData = null;
    let isLoading = false;
    let loadPromise = null;

    // Lookup-Map für schnellen Kartenzugriff nach Name
    let kartenLookup = null;

    // ═══════════════════════════════════════════════════════════════════════════
    // DATEN LADEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Lädt die Osho Zen Bedürfnis-Texte aus der JSON-Datei
     * @returns {Promise<Object>} Die geladenen Daten
     */
    async function loadOshoZenData() {
        if (oshoZenData && tarotKartenData) {
            return oshoZenData;
        }

        if (isLoading && loadPromise) {
            return loadPromise;
        }

        isLoading = true;
        loadPromise = Promise.all([
            fetch('profiles/data/osho-zen-beduerfnisse.json').then(r => r.ok ? r.json() : Promise.reject('Bedürfnisse nicht geladen')),
            fetch('profiles/data/osho-zen-tarot-karten.json').then(r => r.ok ? r.json() : Promise.reject('Tarot-Karten nicht geladen'))
        ])
            .then(([beduerfnisseData, kartenData]) => {
                oshoZenData = beduerfnisseData;
                tarotKartenData = kartenData;
                buildKartenLookup();
                isLoading = false;
                return oshoZenData;
            })
            .catch(error => {
                console.error('Fehler beim Laden der Osho Zen Daten:', error);
                isLoading = false;
                throw error;
            });

        return loadPromise;
    }

    /**
     * Baut eine Lookup-Map für Karten nach Name
     */
    function buildKartenLookup() {
        kartenLookup = {};
        if (!tarotKartenData) return;

        // Major Arcana
        if (tarotKartenData.major_arcana) {
            for (const key in tarotKartenData.major_arcana) {
                const karte = tarotKartenData.major_arcana[key];
                if (karte.name) {
                    kartenLookup[karte.name.toLowerCase()] = karte;
                }
            }
        }

        // Minor Arcana
        if (tarotKartenData.minor_arcana) {
            for (const suit in tarotKartenData.minor_arcana) {
                const suitData = tarotKartenData.minor_arcana[suit];
                if (suitData.karten) {
                    for (const key in suitData.karten) {
                        const karte = suitData.karten[key];
                        if (karte.name) {
                            kartenLookup[karte.name.toLowerCase()] = { ...karte, element: suitData.element };
                        }
                    }
                }
            }
        }

        // Zusätzliche Karten
        if (tarotKartenData.zusaetzliche_karten?.karten) {
            for (const key in tarotKartenData.zusaetzliche_karten.karten) {
                const karte = tarotKartenData.zusaetzliche_karten.karten[key];
                if (karte.name) {
                    kartenLookup[karte.name.toLowerCase()] = karte;
                }
            }
        }
    }

    /**
     * Findet Kartendetails nach Name
     * @param {string} karteName - Name der Karte (z.B. "Courage")
     * @returns {Object|null} Kartendetails mit bild, osho, etc.
     */
    function getKartenDetails(karteName) {
        if (!kartenLookup || !karteName) return null;
        return kartenLookup[karteName.toLowerCase()] || null;
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
                    const kartenDetails = getKartenDetails(zenData.karte);
                    matches.push({
                        id: needId,
                        label: zenData.label || needId,
                        frage: zenData.frage || '',
                        score1: Math.round(score1),
                        score2: Math.round(score2),
                        matchScore: Math.round(matchScore),
                        karte: zenData.karte || 'Unknown',
                        karteName_de: kartenDetails?.name_de || zenData.karte,
                        text: zenData.text || '',
                        bild: kartenDetails?.bild || '',
                        osho: kartenDetails?.osho || '',
                        quelle: kartenDetails?.quelle || ''
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
     * Extrahiert den ersten Satz aus einem Text
     * @param {string} text - Der vollständige Text
     * @returns {Object} { firstSentence, rest }
     */
    function extractFirstSentence(text) {
        if (!text) return { firstSentence: '', rest: '' };

        // Finde das Ende des ersten Satzes (., !, ?)
        const match = text.match(/^([^.!?]+[.!?])\s*(.*)/s);
        if (match) {
            return {
                firstSentence: match[1].trim(),
                rest: match[2].trim()
            };
        }
        return { firstSentence: text, rest: '' };
    }

    /**
     * Generiert HTML für die Top 5 gemeinsamen Bedürfnisse mit Accordion
     * Zeigt nur Text und Bedürfnis mit ID - ohne Balken und Zahlen
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
            const { firstSentence, rest } = extractFirstSentence(match.text);
            const hasExpandableContent = rest.length > 0 || match.bild || match.osho;

            html += `
                <div class="osho-zen-item ${hasExpandableContent ? 'expanded' : ''}" data-index="${index}">
                    <div class="osho-zen-item-header" onclick="OshoZenTextGenerator.toggleItem(${index})">
                        <div class="osho-zen-item-left">
                            <span class="osho-zen-rank">${index + 1}</span>
                            <span class="osho-zen-label">${match.label}</span>
                            <span class="osho-zen-id">${match.id}</span>
                            <span class="osho-zen-karte">— ${match.karte}${match.karteName_de && match.karteName_de !== match.karte ? ` (${match.karteName_de})` : ''}</span>
                        </div>
                        <div class="osho-zen-item-right">
                            <span class="osho-zen-toggle">${hasExpandableContent ? '▼' : ''}</span>
                        </div>
                    </div>
                    <div class="osho-zen-text-preview">
                        <span class="osho-zen-karte-icon">🃏</span>
                        <strong>${match.karte}:</strong> ${firstSentence}
                    </div>
                    ${hasExpandableContent ? `
                    <div class="osho-zen-item-content" style="display: block;">
                        ${rest ? `<div class="osho-zen-text-full">${rest}</div>` : ''}
                        ${match.bild || match.osho ? `
                        <div class="osho-zen-bild">
                            <div class="osho-zen-section-title">🎴 Stell Dir vor ...</div>
                            ${match.bild ? `<p>${match.bild}</p>` : ''}
                            ${match.osho ? `
                            <blockquote class="osho-zen-statement">${match.osho}</blockquote>
                            ${match.quelle ? `<cite>— ${match.quelle}</cite>` : ''}
                            ` : ''}
                        </div>
                        ` : ''}
                    </div>
                    ` : ''}
                    <div class="osho-zen-item-footer">
                        <span class="osho-zen-footer-stat">${name1}: ${match.score1}%</span>
                        <span class="osho-zen-footer-stat">${name2}: ${match.score2}%</span>
                        <span class="osho-zen-footer-stat">Match: ${match.matchScore}%</span>
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
                /* Dark theme as default - matching Ti-Age app design */
                --text-color: #e0e0e0;
                --text-muted: #a0a0b0;
                --card-bg: rgba(30, 30, 45, 0.95);
                --border-color: rgba(255, 255, 255, 0.1);
                --hover-bg: rgba(255, 255, 255, 0.08);
                --content-bg: rgba(20, 20, 35, 0.95);
                --footer-bg: rgba(0, 0, 0, 0.2);
                --id-bg: rgba(139, 92, 246, 0.25);
                --bild-bg: rgba(139, 92, 246, 0.12);
                --osho-bg: rgba(255, 152, 0, 0.15);
                --osho-accent: #FFB74D;
                --primary-color: var(--primary, #9b59b6);
            }

            .osho-zen-header {
                text-align: center;
                margin-bottom: 1.5rem;
            }

            .osho-zen-header h3 {
                margin: 0 0 0.5rem 0;
                color: var(--heading-color, #ffffff);
                font-size: 1.3rem;
                text-shadow: 0 1px 2px rgba(0,0,0,0.3);
            }

            .osho-zen-subtitle {
                color: var(--text-muted);
                font-size: 0.9rem;
                margin: 0;
            }

            .osho-zen-list {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }

            .osho-zen-item {
                background: var(--card-bg);
                border-radius: 8px;
                overflow: hidden;
                border: 1px solid var(--border-color);
                transition: box-shadow 0.2s ease, border-color 0.2s ease;
            }

            .osho-zen-item:hover {
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                border-color: rgba(255, 255, 255, 0.2);
            }

            .osho-zen-item.expanded {
                border-color: var(--primary-color);
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
                background: var(--hover-bg);
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
                background: var(--primary-color);
                color: white;
                border-radius: 50%;
                font-size: 0.8rem;
                font-weight: bold;
            }

            .osho-zen-label {
                font-weight: 600;
                color: var(--text-color);
            }

            .osho-zen-karte {
                color: var(--text-muted);
                font-style: italic;
                font-size: 0.9rem;
            }

            .osho-zen-item-right {
                display: flex;
                align-items: center;
                gap: 0.75rem;
            }

            .osho-zen-toggle {
                color: var(--text-muted);
                font-size: 0.8rem;
                transition: transform 0.2s ease;
            }

            .osho-zen-item.expanded .osho-zen-toggle {
                transform: rotate(90deg);
            }

            .osho-zen-id {
                font-size: 0.75rem;
                color: var(--text-muted);
                background: var(--id-bg);
                padding: 0.15rem 0.4rem;
                border-radius: 4px;
                font-family: monospace;
            }

            .osho-zen-text-preview {
                padding: 0.75rem 1rem;
                font-style: italic;
                color: var(--text-color);
                line-height: 1.5;
                border-top: 1px solid var(--border-color);
            }

            .osho-zen-item-content {
                padding: 0 1rem 0.75rem 1rem;
                background: var(--content-bg);
            }

            .osho-zen-text-full {
                font-style: italic;
                color: var(--text-color);
                line-height: 1.5;
                margin-bottom: 0.75rem;
            }

            .osho-zen-section-title {
                font-size: 1.2rem;
                font-weight: 700;
                color: #FFD700;
                margin-bottom: 0.5rem;
                margin-top: 0.75rem;
            }

            .osho-zen-bild {
                padding: 0.75rem;
                background: var(--bild-bg);
                border-radius: 6px;
                margin-bottom: 0.75rem;
            }

            .osho-zen-bild p {
                margin: 0;
                color: var(--text-color);
                line-height: 1.6;
                font-size: 0.9rem;
            }

            .osho-zen-bild .osho-zen-statement {
                margin: 0.75rem 0 0 0;
                padding: 0.75rem;
                font-style: italic;
                color: var(--text-color, #333);
                line-height: 1.6;
                font-size: 0.9rem;
                background: var(--osho-bg, rgba(255, 152, 0, 0.08));
                border-left: 3px solid var(--osho-accent, #FF9800);
                border-radius: 4px;
            }

            .osho-zen-bild cite {
                display: block;
                margin-top: 0.5rem;
                font-size: 0.8rem;
                color: var(--text-muted, #888);
                font-style: normal;
            }

            .osho-zen-osho {
                padding: 0.75rem;
                background: var(--osho-bg);
                border-radius: 6px;
                border-left: 3px solid var(--osho-accent);
            }

            .osho-zen-osho blockquote {
                margin: 0;
                padding: 0;
                font-style: italic;
                color: var(--text-color);
                line-height: 1.6;
                font-size: 0.9rem;
            }

            .osho-zen-osho cite {
                display: block;
                margin-top: 0.5rem;
                font-size: 0.8rem;
                color: var(--text-muted);
                font-style: normal;
            }

            .osho-zen-item-footer {
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
                padding: 0.5rem 1rem;
                border-top: 1px solid var(--border-color);
                background: var(--footer-bg);
            }

            .osho-zen-footer-stat {
                font-size: 0.7rem;
                color: var(--text-muted);
            }

            .osho-zen-karte-icon {
                margin-right: 0.5rem;
            }

            .osho-zen-footer {
                margin-top: 1.5rem;
                padding-top: 1rem;
                border-top: 1px solid var(--border-color);
                text-align: center;
                color: var(--text-muted);
            }

            .osho-zen-empty {
                text-align: center;
                padding: 2rem;
                color: var(--text-muted);
            }

            .osho-zen-empty .hint {
                font-size: 0.85rem;
                margin-top: 0.5rem;
            }

            .osho-zen-loading {
                text-align: center;
                padding: 2rem;
                color: var(--text-muted);
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
