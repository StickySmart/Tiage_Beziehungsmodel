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

    // i18n helper
    function t(key, fallback) {
        if (typeof TiageI18n !== 'undefined' && TiageI18n.t) {
            return TiageI18n.t(key, fallback);
        }
        return fallback || key;
    }

    // Cache für die geladenen Osho Zen Daten
    let oshoZenData = null;
    let tarotKartenData = null;
    let imageMappingData = null;
    let isLoading = false;
    let loadPromise = null;

    // Lookup-Map für schnellen Kartenzugriff nach Name
    let kartenLookup = null;

    // ═══════════════════════════════════════════════════════════════════════════
    // DATEN LADEN
    // ═══════════════════════════════════════════════════════════════════════════

    // Aktuelle geladene Sprache
    let loadedLanguage = null;

    /**
     * Gibt den Sprach-Suffix für Dateinamen zurück
     * DE = '' (Original-Dateien), andere = '-en', '-fr', '-it'
     */
    function getLangSuffix() {
        var lang = (typeof TiageI18n !== 'undefined') ? TiageI18n.getLanguage() : 'de';
        return lang === 'de' ? '' : ('-' + lang);
    }

    /**
     * Lädt die Osho Zen Bedürfnis-Texte aus der JSON-Datei
     * Sprach-abhängig: DE = osho-zen-beduerfnisse.json, FR = osho-zen-beduerfnisse-fr.json
     * @returns {Promise<Object>} Die geladenen Daten
     */
    async function loadOshoZenData() {
        var currentLang = (typeof TiageI18n !== 'undefined') ? TiageI18n.getLanguage() : 'de';

        // Bereits geladen für aktuelle Sprache?
        if (oshoZenData && tarotKartenData && loadedLanguage === currentLang) {
            return oshoZenData;
        }

        if (isLoading && loadPromise) {
            return loadPromise;
        }

        var suffix = getLangSuffix();
        isLoading = true;

        loadPromise = Promise.all([
            fetch('profiles/data/osho-zen-beduerfnisse' + suffix + '.json')
                .then(function(r) { return r.ok ? r.json() : Promise.reject(t('synthese.errorBeduerfnisseNichtGeladen', 'Bedürfnisse nicht geladen')); })
                .catch(function() {
                    // Fallback zu DE wenn Sprach-Datei nicht existiert
                    if (suffix !== '') {
                        console.warn('[OshoZen] Fallback zu DE für Bedürfnisse (kein ' + suffix + ')');
                        return fetch('profiles/data/osho-zen-beduerfnisse.json').then(function(r) { return r.json(); });
                    }
                    throw new Error(t('synthese.errorDEBeduerfnisse', 'DE Bedürfnisse nicht geladen'));
                }),
            fetch('profiles/data/osho-zen-tarot-karten' + suffix + '.json')
                .then(function(r) { return r.ok ? r.json() : Promise.reject(t('synthese.errorTarotNichtGeladen', 'Tarot-Karten nicht geladen')); })
                .catch(function() {
                    // Fallback zu DE wenn Sprach-Datei nicht existiert
                    if (suffix !== '') {
                        console.warn('[OshoZen] Fallback zu DE für Tarot-Karten (kein ' + suffix + ')');
                        return fetch('profiles/data/osho-zen-tarot-karten.json').then(function(r) { return r.json(); });
                    }
                    throw new Error(t('synthese.errorDETarot', 'DE Tarot-Karten nicht geladen'));
                }),
            fetch('assets/images/beduerfnisse-v2/image-mapping.json')
                .then(function(r) { return r.ok ? r.json() : null; })
                .catch(function() { return null; })
        ])
            .then(([beduerfnisseData, kartenData, imgMapping]) => {
                oshoZenData = beduerfnisseData;
                tarotKartenData = kartenData;
                imageMappingData = imgMapping;
                loadedLanguage = currentLang;
                buildKartenLookup();
                isLoading = false;
                return oshoZenData;
            })
            .catch(error => {
                console.error(t('synthese.errorOshoLoad', 'Fehler beim Laden der Osho Zen Daten:'), error);
                isLoading = false;
                throw error;
            });

        return loadPromise;
    }

    /**
     * Erzwingt Neuladen für eine andere Sprache
     * Wird von TiageI18n.subscribe() aufgerufen
     */
    function reloadForLanguage(lang) {
        // Cache invalidieren
        oshoZenData = null;
        tarotKartenData = null;
        imageMappingData = null;
        kartenLookup = null;
        loadedLanguage = null;
        loadPromise = null;
        isLoading = false;
        console.log('[OshoZen] Cache invalidiert für Sprachwechsel zu:', lang);
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
    // Stufen-Strategien: Mappt #K-Kategorien auf Fähigkeit + Erfüllungsstrategien
    // ═══════════════════════════════════════════════════════════════════════════

    // Direct #B → Stufe/Fähigkeit/Strategie mapping (replaces old #K-based lookup)
    const B_STRATEGIEN = {
        '#B1':  { stufe: 1, faehigkeit: 'Selbstversorgung',      strategie: 'Jedes andere erfüllte Bedürfnis nährt das Wohlbefinden.' },
        '#B2':  { stufe: 1, faehigkeit: 'Selbstschutz',          strategie: 'Ein Haus, Kleidung, Verträge, Absprachen...' },
        '#B3':  { stufe: 1, faehigkeit: 'Energieeinsparung',     strategie: 'Ordnung, Gewohnheiten, Urlaub, Medienkonsum...' },
        '#B4':  { stufe: 1, faehigkeit: 'Wahrnehmung',           strategie: 'Eine Karte, eine Uhr, ein Organigramm, ein Gespräch...' },
        '#B5':  { stufe: 2, faehigkeit: 'Handlungsfähigkeit',    strategie: 'Jede aktive Einflussnahme nährt die Wirksamkeit.' },
        '#B6':  { stufe: 2, faehigkeit: 'Entscheidungsfähigkeit',strategie: 'Jede selbstbestimmte Entscheidung nährt die Freiheit.' },
        '#B7':  { stufe: 2, faehigkeit: 'Empfinden',             strategie: 'Jede intensive Sinnes- oder Gefühls-Erfahrung nährt die Intensität.' },
        '#B8':  { stufe: 2, faehigkeit: 'Lernen',                strategie: 'Ein Seminar, eine Reise, ein Abenteuer, eine bewusste Erfahrung.' },
        '#B9':  { stufe: 3, faehigkeit: 'Soziale Interaktion',   strategie: 'Gemeinsame Rituale, Zusammenkünfte, Regeln, Namen...' },
        '#B10': { stufe: 3, faehigkeit: 'Soziale Interaktion',   strategie: 'Gemeinsame Rituale, Zusammenkünfte, Regeln, Namen...' },
        '#B11': { stufe: 3, faehigkeit: 'Wertebewusstsein',      strategie: 'Jedes Handeln im Einklang mit den eigenen Werten nährt die Gerechtigkeit.' },
        '#B12': { stufe: 3, faehigkeit: 'Empathie',              strategie: 'Ein Gespräch, gemeinsame intensive Erfahrungen, tiefe Begegnung...' },
        '#B13': { stufe: 4, faehigkeit: 'Selbstreflexion',       strategie: 'Meditation, Coaching und Therapie, ehrliche Freundschaft...' },
        '#B14': { stufe: 4, faehigkeit: 'Intentionalität',       strategie: 'Jedes Tun, das die Welt als Ganzes bereichert, nährt das Sinnempfinden.' },
        '#B15': { stufe: 4, faehigkeit: 'Selbstverantwortung',   strategie: 'Jedes Handeln im Einklang mit den eigenen Werten nährt die Integrität.' },
        '#B16': { stufe: 4, faehigkeit: 'Selbstliebe',           strategie: 'Vervollkommnung eigener Anlagen und Talente zum Wohle der Welt.' }
    };

    // Stufen-Farben (passend zu STUFEN_MAP in needsIntegration.js)
    const STUFEN_FARBEN = { 1: '#10B981', 2: '#3B82F6', 3: '#8B5CF6', 4: '#F59E0B' };

    // Löst den bild-Pfad aus osho-zen-beduerfnisse.json in einen vollständigen URL-Pfad auf
    function resolveImagePath(bild) {
        if (!bild) return '';
        if (bild.startsWith('Future/')) return 'assets/images/' + bild;
        if (bild.endsWith('.webp') || bild.endsWith('.png')) return 'assets/images/beduerfnisse-v2/' + bild;
        return bild;
    }

    /**
     * Gibt die Stufen-Strategie für ein Bedürfnis zurück
     * Lookup: needId → BeduerfnisKatalog.kategorie → STUFEN_STRATEGIEN
     */
    function getStrategieForNeed(needId) {
        // Direct #B lookup (v4.0+)
        if (B_STRATEGIEN[needId]) return B_STRATEGIEN[needId];
        // Legacy fallback via catalog
        var katalog = (typeof window !== 'undefined' && window.BeduerfnisKatalog)
            ? window.BeduerfnisKatalog : null;
        if (!katalog || !katalog.beduerfnisse) return null;
        var bed = katalog.beduerfnisse[needId];
        if (!bed) return null;
        if (bed.stufe) {
            return { stufe: bed.stufe, faehigkeit: bed.faehigkeit || '', strategie: bed.strategie || '' };
        }
        var katId = bed.kategorie || (bed.altKategorien && bed.altKategorien[0]);
        return katId ? (STUFEN_STRATEGIEN[katId] || null) : null;
    }

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
    // Per-need priority multiplier: 0=Egal→0.1, 1=Normal→1.0, 2=Wichtig→4.0
    function getNeedPriorityMultiplier(needId) {
        var priorities = (typeof TiageWeights !== 'undefined' && TiageWeights.NeedPriorities)
            ? TiageWeights.NeedPriorities.get() : null;
        if (!priorities) return 1.0;
        var val = priorities[needId];
        if (val === 0) return 0.1;
        if (val === 2) return 4.0;
        return 1.0;
    }

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
                    const average = (score1 + score2) / 2;
                    const difference = Math.abs(score1 - score2);
                    const similarity = 1 - (difference / 100);

                    // Prioritäts-gewichteter Match-Score: starke Wirkung bei 0 oder 2
                    const prioMultiplier = getNeedPriorityMultiplier(needId);
                    const matchScore = average * similarity * prioMultiplier;

                    const zenData = beduerfnisse[needId];
                    const v1 = (zenData.varianten && zenData.varianten.V1) ? zenData.varianten.V1 : {};
                    const karteName = v1.karte || '';
                    matches.push({
                        id: needId,
                        label: zenData.label || needId,
                        frage: v1.reflexion || '',
                        score1: Math.round(score1),
                        score2: Math.round(score2),
                        matchScore: Math.round(matchScore),
                        karte: karteName || 'Unknown',
                        karteName_de: v1.karte_de || karteName,
                        text: v1.tiage || '',
                        imagePath: resolveImagePath(v1.bild),
                        traditionen: v1.traditionen || {}
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
     * Konvertiert eine Bedürfnis-ID zu einem Bildpfad
     * @param {string} needId - z.B. "#B21" oder "B21"
     * @returns {string} - z.B. "/assets/images/beduerfnisse-v2/B021.webp"
     */
    function getNeedImagePath(needId) {
        if (!needId) return '';
        // v4.0: Lookup aus image-mapping.json (primäre Variante)
        if (imageMappingData && imageMappingData.images && imageMappingData.images[needId]) {
            const entry = imageMappingData.images[needId];
            const file = entry.varianten && entry.varianten[0] && entry.varianten[0].file;
            if (file) return `/assets/images/beduerfnisse-v2/${file}`;
        }
        // Legacy: sequenzieller Pfad für alte #B-IDs
        const id = needId.replace('#', '').replace('B', '');
        const num = parseInt(id, 10);
        if (isNaN(num) || num < 1 || num > 226) return '';
        return `/assets/images/beduerfnisse-v2/B${num.toString().padStart(3, '0')}.webp`;
    }

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
    function t(key, fallback) {
        return (typeof TiageI18n !== 'undefined') ? TiageI18n.t(key, fallback) : fallback;
    }

    function generateHTML(topMatches, name1 = 'Ich', name2 = 'Partner') {
        if (!topMatches || topMatches.length === 0) {
            return `
                <div class="osho-zen-empty">
                    <p>${t('synthese.oshoNoSharedNeeds', 'Keine gemeinsamen Bedürfnisse gefunden.')}</p>
                    <p class="hint">${t('synthese.oshoEnsureProfiles', 'Stellt sicher, dass beide Profile Bedürfnisse ausgefüllt haben.')}</p>
                </div>
            `;
        }

        // Gruppiere Bedürfnisse mit gleicher Karte zusammen (muss vor Card-Strip stehen)
        const kartenGroups = [];
        const kartenMap = {};
        topMatches.forEach(match => {
            const key = match.karte || 'Unknown';
            if (!kartenMap[key]) {
                kartenMap[key] = { karte: key, karteName_de: match.karteName_de, bild: match.bild, osho: match.osho, quelle: match.quelle, needs: [] };
                kartenGroups.push(kartenMap[key]);
            }
            kartenMap[key].needs.push(match);
        });

        // Visuelle Karten-Leiste — pro Gruppe (Index stimmt mit Accordion überein)
        const cardStripHtml = kartenGroups.map((group, groupIndex) => {
            const firstMatch = group.needs[0];
            const imgSrc = firstMatch.imagePath || getNeedImagePath(firstMatch.id);
            const bedEntry = (typeof window !== 'undefined' && window.BeduerfnisKatalog && window.BeduerfnisKatalog.beduerfnisse)
                ? window.BeduerfnisKatalog.beduerfnisse[firstMatch.id] : null;
            const color = bedEntry && bedEntry.stufe ? (STUFEN_FARBEN[bedEntry.stufe] || '#888') : '#888';
            const label = group.needs.map(n => n.label).join(' + ');
            const imgBlock = imgSrc
                ? `<img src="${imgSrc}" alt="${label}" loading="lazy" style="width:100%;height:80px;object-fit:cover;border-radius:6px 6px 0 0;pointer-events:none;" onerror="this.parentElement.style.display='none'">`
                : `<div style="width:100%;height:80px;background:rgba(255,255,255,0.05);border-radius:6px 6px 0 0;display:flex;align-items:center;justify-content:center;font-size:28px;">🃏</div>`;
            return `<div id="osho-strip-card-${groupIndex}" data-strip-color="${color}" style="flex:1;min-width:0;background:rgba(20,20,30,0.8);border:1.5px solid rgba(255,255,255,0.08);border-radius:8px;overflow:hidden;cursor:pointer;transition:border-color 0.2s;" onclick="OshoZenTextGenerator.toggleItem(${groupIndex})" title="${label} · ${group.karte}">
                ${imgBlock}
                <div style="padding:5px 7px;">
                    <div style="font-size:10px;font-weight:700;color:${color};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${label}</div>
                    <div style="font-size:10px;color:rgba(255,255,255,0.4);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${group.karte}</div>
                </div>
            </div>`;
        }).join('');

        // 4 Stufen breakdown below card strip
        const STUFEN_LABELS_LOC = { 1: 'Fundament', 2: 'Entfaltung', 3: 'Verbundenheit', 4: 'Sinn' };
        const stufeGroups = {};
        topMatches.forEach(match => {
            const bedEntry = (typeof window !== 'undefined' && window.BeduerfnisKatalog && window.BeduerfnisKatalog.beduerfnisse)
                ? window.BeduerfnisKatalog.beduerfnisse[match.id] : null;
            const stufe = (bedEntry && bedEntry.stufe) ? bedEntry.stufe : 0;
            if (!stufeGroups[stufe]) stufeGroups[stufe] = [];
            stufeGroups[stufe].push(match);
        });

        const stufenSectionHtml = [1, 2, 3, 4].map(stufeNr => {
            const needs = stufeGroups[stufeNr] || [];
            const color = STUFEN_FARBEN[stufeNr];
            const label = STUFEN_LABELS_LOC[stufeNr];
            if (needs.length === 0) {
                return `<div style="flex:1;border-radius:8px;border:1px solid rgba(255,255,255,0.06);padding:8px 10px;opacity:0.35;background:rgba(255,255,255,0.02);">
                    <div style="font-size:9px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:0.05em;">Stufe ${stufeNr}</div>
                    <div style="font-size:9px;color:rgba(255,255,255,0.25);margin-top:3px;">${label}</div>
                    <div style="font-size:10px;color:rgba(255,255,255,0.2);margin-top:6px;">—</div>
                </div>`;
            }
            const avgScore = Math.round(needs.reduce((s, n) => s + (n.score1 + n.score2) / 2, 0) / needs.length);
            const needsHtml = needs.map(n => {
                const avg = Math.round((n.score1 + n.score2) / 2);
                return `<div style="display:flex;align-items:center;gap:5px;margin-top:5px;">
                    <div style="font-size:10px;color:rgba(255,255,255,0.85);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0;">${n.label}</div>
                    <div style="width:36px;height:3px;background:rgba(255,255,255,0.1);border-radius:2px;flex-shrink:0;">
                        <div style="width:${avg}%;height:100%;background:${color};border-radius:2px;"></div>
                    </div>
                    <div style="font-size:9px;color:rgba(255,255,255,0.4);width:20px;text-align:right;flex-shrink:0;">${avg}%</div>
                </div>`;
            }).join('');
            return `<div style="flex:1;min-width:0;border-radius:8px;border:1px solid ${color}40;padding:8px 10px;background:${color}12;">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;">
                    <div style="font-size:9px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:0.05em;">Stufe ${stufeNr}</div>
                    <div style="font-size:11px;font-weight:700;color:${color};">${avgScore}%</div>
                </div>
                <div style="font-size:9px;color:rgba(255,255,255,0.4);margin-bottom:5px;">${label}</div>
                <div style="height:3px;background:rgba(255,255,255,0.08);border-radius:1.5px;margin-bottom:7px;">
                    <div style="width:${avgScore}%;height:100%;background:${color};border-radius:1.5px;"></div>
                </div>
                ${needsHtml}
            </div>`;
        }).join('');

        let html = `
            <div class="osho-zen-container">
                <div class="osho-zen-header">
                    <h3>${t('synthese.oshoTopNeeds', '🔥 Eure Top {count} gemeinsamen Bedürfnisse').replace('{count}', topMatches.length)}</h3>
                    <p class="osho-zen-subtitle">${t('synthese.oshoBasedOn', 'Basierend auf der Übereinstimmung eurer Bedürfnis-Profile')}</p>
                </div>
                <div class="osho-zen-card-strip" style="display:flex;gap:8px;margin-bottom:10px;">${cardStripHtml}</div>
                <div style="display:flex;gap:8px;margin-bottom:16px;">${stufenSectionHtml}</div>
                <div class="osho-zen-list">
        `;

        kartenGroups.forEach((group, groupIndex) => {
            // Header: Karte mit allen Bedürfnissen
            const needLabels = group.needs.map((m, i) =>
                `<span class="osho-zen-label">${m.label}</span> <span class="osho-zen-id">${m.id}</span>`
            ).join('<span style="opacity:0.4;margin:0 6px;">+</span>');

            const hasExpandableContent = group.bild || group.osho || group.needs.some(m => extractFirstSentence(m.text).rest.length > 0);

            // Thumbnail für den Header (erstes Bedürfnis der Gruppe)
            const thumbSrc = group.needs[0].imagePath || getNeedImagePath(group.needs[0].id);
            const thumbHtml = thumbSrc
                ? `<img src="${thumbSrc}" alt="${group.needs[0].label}" style="width:38px;height:38px;object-fit:cover;border-radius:6px;flex-shrink:0;" loading="lazy" onerror="this.style.display='none'">`
                : '';

            const itemStufeColor = group.needs[0] && group.needs[0].stufe ? (STUFEN_FARBEN[group.needs[0].stufe] || '#8B5CF6') : '#8B5CF6';
            html += `
                <div class="osho-zen-item" data-index="${groupIndex}" data-need-ids="${group.needs.map(n => n.id).join(" ")}" data-stufe-color="${itemStufeColor}">
                    <div class="osho-zen-item-header" onclick="OshoZenTextGenerator.toggleItem(${groupIndex})">
                        <div class="osho-zen-item-left">
                            ${thumbHtml}
                            <span class="osho-zen-rank">${groupIndex + 1}</span>
                            ${needLabels}
                            <span class="osho-zen-karte">— ${group.karte}${group.karteName_de && group.karteName_de !== group.karte ? ` (${group.karteName_de})` : ''}</span>
                        </div>
                        <div class="osho-zen-item-right">
                            <span class="osho-zen-toggle">▶</span>
                        </div>
                    </div>
            `;

            // Alles nach dem Header — standardmäßig eingeklappt
            html += `<div class="osho-zen-item-content" style="display: none;">`;

            // 1. Bilder pro Bedürfnis
            group.needs.forEach(match => {
                const imgPath = match.imagePath || getNeedImagePath(match.id);
                if (imgPath) {
                    html += `
                        <div class="osho-zen-image-container">
                            <img src="${imgPath}"
                                 alt="${t('synthese.oshoNeedAlt', 'Bedürfnis {label}').replace('{label}', match.label)}"
                                 class="osho-zen-need-image"
                                 loading="lazy"
                                 onerror="this.style.display='none'"
                                 onclick="OshoZenTextGenerator.openLightbox(this.src, this.alt)"
                                 style="cursor: pointer;">
                        </div>
                    `;
                }
            });

            // 2. Individuelle Texte pro Bedürfnis
            group.needs.forEach(match => {
                const { firstSentence, rest } = extractFirstSentence(match.text);
                const strategie = getStrategieForNeed(match.id);
                const strategieHtml = strategie ? `
                    <div style="margin-top:6px;padding-left:14px;border-left:2px solid ${STUFEN_FARBEN[strategie.stufe]};opacity:0.7;">
                        <span style="font-size:10px;font-weight:600;color:${STUFEN_FARBEN[strategie.stufe]};text-transform:uppercase;letter-spacing:0.05em;">${strategie.faehigkeit}</span>
                        <span style="font-size:11px;color:rgba(255,255,255,0.5);font-style:italic;display:block;margin-top:1px;">${strategie.strategie}</span>
                    </div>` : '';
                html += `
                    <div class="osho-zen-text-preview">
                        <span class="osho-zen-karte-icon">🃏</span>
                        <strong>${match.label}:</strong> ${firstSentence}
                        ${rest ? `<div class="osho-zen-text-full">${rest}</div>` : ''}
                        ${strategieHtml}
                    </div>
                `;
            });

            // 3. Traditionen-Perspektive (Osho-Zitat aus neuem JSON)
            const firstNeed = group.needs[0];
            const oshoText = firstNeed.traditionen && firstNeed.traditionen.osho;
            if (oshoText) {
                html += `
                    <div class="osho-zen-osho-quote">
                        <blockquote class="osho-zen-statement">${oshoText}</blockquote>
                    </div>`;
            }

            // 4. Footer mit Scores
            html += `<div class="osho-zen-item-footer">`;
            group.needs.forEach(match => {
                html += `<span class="osho-zen-footer-stat">${match.label}: ${name1} ${match.score1}% / ${name2} ${match.score2}% (Match: ${match.matchScore}%)</span>`;
            });
            html += `</div>`;

            html += `</div></div>`;
        });

        html += `
                </div>
                <div class="osho-zen-footer">
                    <small>
                        <em>${t('synthese.oshoFooter', 'Diese Synthese verbindet Konzepte aus dem RTI-Modell, dem 4-Stufen-Modell nach Volker Schmidt, den Lehren von Osho sowie der Qualitätsphilosophie von Robert M. Pirsig. Alle Rechte bei den jeweiligen Inhabern.')}</em>
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
        const header = item.querySelector('.osho-zen-item-header');
        const isOpening = content.style.display === 'none';
        const stufeColor = item.dataset.stufeColor || '#8B5CF6';

        // Strip-Karten zurücksetzen
        document.querySelectorAll('[id^="osho-strip-card-"]').forEach(function(el) {
            el.style.borderColor = 'rgba(255,255,255,0.08)';
            el.style.opacity = '1';
        });

        if (isOpening) {
            // Alle anderen Items vollständig ausblenden
            items.forEach(function(other, i) {
                if (i !== index) other.style.display = 'none';
            });

            // Dieses Item: Header + Inhalt zeigen
            item.style.display = 'block';
            content.style.display = 'block';
            toggle.textContent = '▼';
            item.classList.add('expanded');
            if (header) {
                header.style.borderLeft = `3px solid ${stufeColor}`;
                header.style.background = `${stufeColor}22`;
            }

            // Aktive Strip-Karte hervorheben, andere abdunkeln
            document.querySelectorAll('[id^="osho-strip-card-"]').forEach(function(el) {
                const i = parseInt(el.id.replace('osho-strip-card-', ''), 10);
                if (i === index) {
                    el.style.borderColor = stufeColor;
                    el.style.opacity = '1';
                } else {
                    el.style.opacity = '0.4';
                }
            });

        } else {
            // Schließen: alle Items wieder anzeigen, collapsed
            items.forEach(function(other, i) {
                other.style.display = 'block';
                const otherContent = other.querySelector('.osho-zen-item-content');
                const otherToggle = other.querySelector('.osho-zen-toggle');
                const otherHeader = other.querySelector('.osho-zen-item-header');
                if (otherContent) otherContent.style.display = 'none';
                if (otherToggle) otherToggle.textContent = '▶';
                other.classList.remove('expanded');
                if (otherHeader) { otherHeader.style.borderLeft = ''; otherHeader.style.background = ''; }
            });
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
            return '<div class="osho-zen-loading">' + (typeof TiageI18n !== 'undefined' ? TiageI18n.t('synthese.oshoLoadingData', 'Lade Osho Zen Daten...') : 'Lade Osho Zen Daten...') + '</div>';
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
                font-weight: 700;
                font-size: 1.3rem;
                color: #FFD700;  /* Gold/Gelb */
                text-transform: uppercase;
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

            .osho-zen-bild-text {
                padding: 0.75rem 1rem;
                color: var(--text-color);
                line-height: 1.6;
                font-size: 0.95rem;
                background: var(--bild-bg);
                border-left: 3px solid var(--primary-color);
            }

            .osho-zen-osho-quote {
                padding: 0.75rem 1rem;
                background: var(--osho-bg);
                border-left: 3px solid var(--osho-accent);
            }

            .osho-zen-osho-quote .osho-zen-statement {
                margin: 0;
                padding: 0;
                font-style: italic;
                color: var(--text-color);
                line-height: 1.6;
                font-size: 0.9rem;
            }

            .osho-zen-osho-quote cite {
                display: block;
                margin-top: 0.5rem;
                font-size: 0.8rem;
                color: var(--text-muted);
                font-style: normal;
            }

            .osho-zen-image-container {
                display: flex;
                justify-content: center;
                padding: 1rem 0;
            }

            .osho-zen-need-image {
                max-width: 200px;
                max-height: 300px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
                object-fit: contain;
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
                font-size: 0.95rem;
                font-weight: 600;
                color: var(--text-muted);
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

            /* Lightbox Styles */
            .osho-zen-lightbox {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 10000;
                display: none;
                align-items: center;
                justify-content: center;
            }

            .osho-zen-lightbox.active {
                display: flex;
            }

            .osho-zen-lightbox-backdrop {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                cursor: pointer;
            }

            .osho-zen-lightbox-content {
                position: relative;
                z-index: 1;
                width: 100vw;
                height: 100vh;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .osho-zen-lightbox-image {
                max-width: 100vw;
                max-height: 100vh;
                object-fit: contain;
                border-radius: 0;
                animation: osho-zen-lightbox-zoom 0.3s ease-out;
            }

            @keyframes osho-zen-lightbox-zoom {
                from {
                    transform: scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }

            .osho-zen-lightbox-close {
                position: fixed;
                top: 16px;
                right: 16px;
                width: 44px;
                height: 44px;
                border: 2px solid rgba(255,255,255,0.4);
                background: rgba(0, 0, 0, 0.6);
                color: white;
                font-size: 26px;
                line-height: 1;
                border-radius: 50%;
                cursor: pointer;
                z-index: 10001;
                transition: background 0.2s, transform 0.2s;
            }

            .osho-zen-lightbox-close:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: scale(1.1);
            }
        `;

        const styleElement = document.createElement('style');
        styleElement.id = 'osho-zen-styles';
        styleElement.textContent = styles;
        document.head.appendChild(styleElement);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // LIGHTBOX FUNKTION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Öffnet ein Bild in einer Lightbox
     * @param {string} src - Bild-URL
     * @param {string} alt - Alt-Text für das Bild
     */
    function openLightbox(src, alt) {
        // Prüfe ob Lightbox bereits existiert
        let lightbox = document.getElementById('osho-zen-lightbox');

        if (!lightbox) {
            // Erstelle Lightbox-Container
            lightbox = document.createElement('div');
            lightbox.id = 'osho-zen-lightbox';
            lightbox.className = 'osho-zen-lightbox';
            lightbox.innerHTML = `
                <div class="osho-zen-lightbox-backdrop"></div>
                <div class="osho-zen-lightbox-content">
                    <button class="osho-zen-lightbox-close" aria-label="Schließen">&times;</button>
                    <img class="osho-zen-lightbox-image" src="" alt="">
                </div>
            `;
            document.body.appendChild(lightbox);

            // Event-Listener für Schließen
            const backdrop = lightbox.querySelector('.osho-zen-lightbox-backdrop');
            const closeBtn = lightbox.querySelector('.osho-zen-lightbox-close');

            backdrop.addEventListener('click', closeLightbox);
            closeBtn.addEventListener('click', closeLightbox);

            // Escape-Taste zum Schließen
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') closeLightbox();
            });
        }

        // Setze Bild und zeige Lightbox
        const img = lightbox.querySelector('.osho-zen-lightbox-image');
        img.src = src;
        img.alt = alt || '';

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    /**
     * Schließt die Lightbox
     */
    function closeLightbox() {
        const lightbox = document.getElementById('osho-zen-lightbox');
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
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
        openLightbox: openLightbox,
        closeLightbox: closeLightbox,

        // Hilfsfunktionen
        calculateTopMatches: calculateTopMatches,

        // i18n: Sprachwechsel-Support
        reloadForLanguage: reloadForLanguage,

        // Für Debugging
        getData: function() { return oshoZenData; },
        isDataLoaded: function() { return oshoZenData !== null; },

        // Gibt die Varianten-Daten für ein Bedürfnis zurück (oder null wenn noch nicht geladen)
        getBeduerfnisData: function(needId) {
            if (!oshoZenData || !oshoZenData.beduerfnisse) return null;
            return oshoZenData.beduerfnisse[needId] || null;
        },

        // Lädt Daten + gibt Bedürfnis-Daten zurück (Promise)
        loadAndGetBeduerfnisData: function(needId) {
            return loadOshoZenData().then(function() {
                if (!oshoZenData || !oshoZenData.beduerfnisse) return null;
                return oshoZenData.beduerfnisse[needId] || null;
            });
        }
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

// Bei Sprachwechsel: Osho-Daten-Cache invalidieren
if (typeof TiageI18n !== 'undefined' && typeof TiageI18n.subscribe === 'function') {
    TiageI18n.subscribe(function(event) {
        OshoZenTextGenerator.reloadForLanguage(event.newLanguage);
    });
}
