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

    // Tracks which Stufe modal is currently open (null = closed)
    let _activeStufeNr = null;

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
                    const _needCat = window.BeduerfnisIds && window.BeduerfnisIds.beduerfnisse && window.BeduerfnisIds.beduerfnisse[needId];
                    matches.push({
                        id: needId,
                        label: _needCat ? t('beduerfnisKatalog.needs.' + _needCat.key, zenData.label || needId) : (zenData.label || needId),
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
            if (file) return file.startsWith('Future/') ? `/assets/images/${file}` : `/assets/images/beduerfnisse-v2/${file}`;
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
        const STUFEN_LABELS_LOC = {
            1: t('beduerfnisKatalog.stufen.S1.label', 'Fundament'),
            2: t('beduerfnisKatalog.stufen.S2.label', 'Entfaltung'),
            3: t('beduerfnisKatalog.stufen.S3.label', 'Verbundenheit'),
            4: t('beduerfnisKatalog.stufen.S4.label', 'Sinn')
        };
        const stufeGroups = {};
        topMatches.forEach(match => {
            const bedEntry = (typeof window !== 'undefined' && window.BeduerfnisKatalog && window.BeduerfnisKatalog.beduerfnisse)
                ? window.BeduerfnisKatalog.beduerfnisse[match.id] : null;
            const stufe = (bedEntry && bedEntry.stufe) ? bedEntry.stufe : 0;
            if (!stufeGroups[stufe]) stufeGroups[stufe] = [];
            stufeGroups[stufe].push(match);
        });

        // Store stufe data for modal access
        if (!window._OshoStufeData) window._OshoStufeData = {};

        // Raw ICH/Partner values for dimmed unmatched needs
        const _rawIch = (typeof TiageState !== 'undefined')
            ? (TiageState.getCombinedFlatNeeds ? TiageState.getCombinedFlatNeeds() : TiageState.getFlatNeeds('ich')) || {}
            : {};
        const _rawPartner = (typeof TiageState !== 'undefined' && TiageState.getFlatNeeds)
            ? TiageState.getFlatNeeds('partner') || {} : {};

        const stufenSectionHtml = [1, 2, 3, 4].map(stufeNr => {
            const needs = stufeGroups[stufeNr] || [];
            const color = STUFEN_FARBEN[stufeNr];
            const label = STUFEN_LABELS_LOC[stufeNr];
            const stufeInfo = _getStufeInfo(stufeNr);
            const allChar = stufeInfo.charakteristik || [];
            const matchedIds = new Set(needs.map(n => n.id));

            const avgScore = needs.length > 0
                ? Math.round(needs.reduce((s, n) => s + (n.score1 + n.score2) / 2, 0) / needs.length)
                : null;

            // Store for modal (always, so modal opens even for non-matched Stufen)
            window._OshoStufeData[stufeNr] = { label, color, avgScore: avgScore || 0, needs };

            // All 4 characteristic needs: matched = bright, unmatched = dimmed
            const allNeedsHtml = allChar.map(c => {
                const isMatched = c.id ? matchedIds.has(c.id) : false;
                const mn = isMatched ? needs.find(n => n.id === c.id) : null;
                const s1Raw = mn ? mn.score1 : (c.id && _rawIch[c.id] !== undefined ? _rawIch[c.id] : null);
                const s2Raw = mn ? mn.score2 : (c.id && _rawPartner[c.id] !== undefined ? _rawPartner[c.id] : null);
                const s1 = s1Raw !== null ? Math.round(s1Raw) : null;
                const s2 = s2Raw !== null ? Math.round(s2Raw) : null;
                const avg = s1 !== null && s2 !== null ? Math.round((s1 + s2) / 2)
                          : s1 !== null ? s1 : s2 !== null ? s2 : null;
                const nameCol = isMatched ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.28)';
                const barCol  = isMatched ? color : 'rgba(255,255,255,0.1)';
                const numCol  = isMatched ? 'rgba(255,255,255,0.45)' : 'rgba(255,255,255,0.18)';
                const ic1Col  = isMatched ? '#22C55E' : 'rgba(34,197,94,0.28)';
                const ic2Col  = isMatched ? '#EF4444' : 'rgba(239,68,68,0.28)';
                const sepCol  = isMatched ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.08)';
                const valRow  = (s1 !== null || s2 !== null)
                    ? `<div style="display:flex;gap:5px;margin-top:2px;padding-left:2px;">
                        ${s1 !== null ? `<span style="font-size:9px;color:${ic1Col};">ICH ${s1}</span>` : ''}
                        ${s1 !== null && s2 !== null ? `<span style="font-size:9px;color:${sepCol};">|</span>` : ''}
                        ${s2 !== null ? `<span style="font-size:9px;color:${ic2Col};">Partner ${s2}</span>` : ''}
                    </div>` : '';
                return `<div style="margin-top:5px;">
                    <div style="display:flex;align-items:center;gap:5px;">
                        <div style="font-size:10px;color:${nameCol};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;flex:1;min-width:0;">${c.name}</div>
                        <div style="width:32px;height:3px;background:rgba(255,255,255,0.07);border-radius:2px;flex-shrink:0;">
                            <div style="width:${Math.min(100, avg !== null ? avg : 0)}%;height:100%;background:${barCol};border-radius:2px;"></div>
                        </div>
                        <div style="font-size:9px;color:${numCol};width:18px;text-align:right;flex-shrink:0;">${avg !== null ? avg : '—'}</div>
                    </div>
                    ${valRow}
                </div>`;
            }).join('');

            const hasMatch = needs.length > 0;
            return `<div id="osho-stufe-card-${stufeNr}" style="flex:1;min-width:0;border-radius:8px;border:1px solid ${hasMatch ? color + '40' : 'rgba(255,255,255,0.07)'};padding:8px 10px;background:${hasMatch ? color + '12' : 'rgba(255,255,255,0.02)'};cursor:pointer;transition:opacity 0.25s,box-shadow 0.25s,border-color 0.25s;" onclick="OshoZenTextGenerator.showStufeModal(${stufeNr})" title="Details zu Stufe ${stufeNr}">
                <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2px;">
                    <div style="font-size:9px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:0.05em;">Stufe ${stufeNr}</div>
                    <div style="font-size:11px;font-weight:700;color:${hasMatch ? color : 'rgba(255,255,255,0.2)'};">${avgScore !== null ? avgScore : '—'}</div>
                </div>
                <div style="font-size:9px;color:rgba(255,255,255,0.4);margin-bottom:5px;">${label}</div>
                <div style="height:3px;background:rgba(255,255,255,0.08);border-radius:1.5px;margin-bottom:7px;">
                    <div style="width:${avgScore !== null ? avgScore : 0}%;height:100%;background:${hasMatch ? color : 'rgba(255,255,255,0.1)'};border-radius:1.5px;"></div>
                </div>
                ${allNeedsHtml}
            </div>`;
        }).join('');

        let html = `
            <div class="osho-zen-container">
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
    // STUFE MODAL
    // ═══════════════════════════════════════════════════════════════════════════

    // Static stage knowledge — based on evolutionary model of human psychological development
    var _STUFE_INFO = {
        1: {
            titel: 'Fundament',
            evolution: 'Mehrzellige Lebensformen',
            icon: '🌱',
            kernthema: 'Sicherheit & Stabilität',
            beschreibung: 'Die erste Stufe psychischer Entwicklung entstand mit dem mehrzelligen Leben. Sie sichert das Überleben durch Koordination und Schutz. Bedürfnisse dieser Ebene wirken tief und oft unbewusst — ihre Nichterfüllung erzeugt anhaltenden Stress und Rückzug.',
            charakteristik: [
                { id: '#B1', name: 'Wohlbefinden', sub: 'Unversehrtheit, Gesundheit, Fitness, Erholung' },
                { id: '#B2', name: 'Sicherheit', sub: 'Zuversicht, Stabilität, Schutz, Halt, Loyalität' },
                { id: '#B3', name: 'Leichtigkeit', sub: 'Energieeinsparung, Einfachheit, Harmonie' },
                { id: '#B4', name: 'Orientierung', sub: 'Klarheit, Struktur, Ordnung, Führung, Kontrolle' }
            ],
            beziehung: 'In Beziehungen zeigt sich diese Stufe als Wunsch nach Verlässlichkeit, klaren Absprachen und emotionaler Sicherheit. Ein Mangel auf dieser Ebene führt zu Angst, Rückzug oder übermäßiger Kontrolle.',
            frage: 'Wo fühlst du dich wirklich sicher — und wo nicht?'
        },
        2: {
            titel: 'Entfaltung',
            evolution: 'Tierisches Leben',
            icon: '⚡',
            kernthema: 'Kraft & Selbstausdruck',
            beschreibung: 'Mit der Entwicklung komplexerer tierischer Lebensformen entstanden Bedürfnisse nach Eigenständigkeit und Wirksamkeit. Diese Stufe treibt uns an, die Welt aktiv zu gestalten — uns zu spüren, zu wachsen und Einfluss zu nehmen.',
            charakteristik: [
                { id: '#B5', name: 'Wirksamkeit', sub: 'Handlungsfähigkeit, Einfluss, Macht, Souveränität' },
                { id: '#B6', name: 'Freiheit', sub: 'Autonomie, Selbstbestimmtheit, Unabhängigkeit' },
                { id: '#B7', name: 'Intensität', sub: 'Lebendigkeit, Leidenschaft, Selbst-Erfahrung, Sinnlichkeit' },
                { id: '#B8', name: 'Entwicklung', sub: 'Wachstum, Entfaltung, Lernen' }
            ],
            beziehung: 'In Beziehungen spiegelt sich diese Stufe als Spannung zwischen Nähe und Freiheit. Beide Partner brauchen Raum zur Selbstentfaltung — gleichzeitig bereichert gelebte Intensität die gemeinsame Verbindung.',
            frage: 'Wo lebst du deine Kraft — und wo hältst du dich zurück?'
        },
        3: {
            titel: 'Verbundenheit',
            evolution: 'Soziale Tiere',
            icon: '🤝',
            kernthema: 'Zugehörigkeit & Resonanz',
            beschreibung: 'Soziales Leben brachte neue Schichten der Psyche hervor: das Bedürfnis nach Zugehörigkeit, Anerkennung und echter Verbundenheit. Diese Ebene ist der emotionale Kern unserer Beziehungsfähigkeit — hier entscheidet sich, ob wir uns wirklich gesehen fühlen.',
            charakteristik: [
                { id: '#B9',  name: 'Gemeinschaft', sub: 'Gesellschaft, Zugehörigkeit, Familie, Clan' },
                { id: '#B10', name: 'Anerkennung', sub: 'Wertschätzung, Respekt, Bedeutung, Nützlichkeit' },
                { id: '#B11', name: 'Gerechtigkeit', sub: 'Fairness, Angemessenheit, Gleichwertigkeit' },
                { id: '#B12', name: 'Verbundenheit', sub: 'Intimität, Geborgenheit, Nähe, Vertrauen' }
            ],
            beziehung: 'Diese Stufe ist das Herzstück jeder Liebesbeziehung. Das Gefühl, wirklich gesehen, gehört und angenommen zu werden, nährt die emotionale Bindung tiefer als alle Worte.',
            frage: 'Wo fühlst du echte Verbindung — und wo bist du innerlich allein?'
        },
        4: {
            titel: 'Sinn',
            evolution: '(Selbst-)Bewusstes Leben',
            icon: '✨',
            kernthema: 'Bedeutung & Authentizität',
            beschreibung: 'Die höchste Entwicklungsstufe der Psyche entstand mit dem Selbstbewusstsein. Hier geht es nicht mehr nur ums Überleben oder Dazugehören — sondern darum, wer wir wirklich sind und wozu wir hier sind. Diese Bedürfnisse zu kennen ist der Schlüssel zur inneren Reife.',
            charakteristik: [
                { id: '#B13', name: 'Selbsterkenntnis', sub: 'Bewusstheit, Reflexion, Weisheit' },
                { id: '#B14', name: 'Sinn', sub: 'Berufung, Vision, Mission, Bedeutung' },
                { id: '#B15', name: 'Integrität', sub: 'Wahrhaftigkeit, Konsistenz, Authentizität, Würde' },
                { id: '#B16', name: 'Selbstentfaltung', sub: 'Selbstwerdung, Selbstverwirklichung, Gedeihen' }
            ],
            beziehung: 'Auf dieser Ebene begegnen sich zwei Menschen als bewusste Wesen mit eigener Tiefe. Gemeinsame Werte, gegenseitiges Wachstum und geteilter Sinn machen Beziehungen dauerhaft lebendig.',
            frage: 'Was gibt deinem Leben — und dieser Beziehung — wirklich Bedeutung?'
        }
    };

    var B_TO_KEY = {
        '#B1':'wohlbefinden','#B2':'sicherheit','#B3':'leichtigkeit','#B4':'orientierung',
        '#B5':'wirksamkeit','#B6':'freiheit','#B7':'intensitaet','#B8':'entwicklung',
        '#B9':'gemeinschaft','#B10':'anerkennung','#B11':'gerechtigkeit','#B12':'verbundenheit',
        '#B13':'selbsterkenntnis','#B14':'sinn','#B15':'integritaet','#B16':'selbstentfaltung'
    };

    function _getStufeInfo(n) {
        var base = _STUFE_INFO[n];
        if (!base) return {};
        if (typeof TiageI18n === 'undefined' || !TiageI18n.t) return base;
        var pfx = 'beduerfnisKatalog.stufeInfo.' + n + '.';
        return {
            titel:      t(pfx + 'titel',      base.titel),
            evolution:  t(pfx + 'evolution',  base.evolution),
            icon:       base.icon,
            kernthema:  t(pfx + 'kernthema',  base.kernthema),
            beschreibung: t(pfx + 'beschreibung', base.beschreibung),
            charakteristik: (base.charakteristik || []).map(function(c, i) {
                return {
                    id:   c.id,
                    name: t('beduerfnisKatalog.needs.' + (B_TO_KEY[c.id] || ''), c.name),
                    sub:  t(pfx + 'charakteristik.' + i + '.sub', c.sub)
                };
            }),
            beziehung: t(pfx + 'beziehung', base.beziehung),
            frage:     t(pfx + 'frage',     base.frage)
        };
    }

    function _resetStufeCards() {
        [1, 2, 3, 4].forEach(function(n) {
            var card = document.getElementById('osho-stufe-card-' + n);
            if (!card) return;
            var d = window._OshoStufeData && window._OshoStufeData[n];
            var c = d ? d.color : 'rgba(255,255,255,0.15)';
            card.style.opacity = '1';
            card.style.boxShadow = '';
            card.style.border = '1px solid ' + c + '40';
            card.style.pointerEvents = 'auto';
            card.style.cursor = 'pointer';
        });
    }

    function _activateStufeCard(stufeNr, color) {
        [1, 2, 3, 4].forEach(function(n) {
            var card = document.getElementById('osho-stufe-card-' + n);
            if (!card) return;
            if (n === stufeNr) {
                card.style.opacity = '1';
                card.style.boxShadow = '0 0 14px ' + color + '70';
                card.style.border = '1.5px solid ' + color;
                card.style.pointerEvents = 'auto';
                card.style.cursor = 'pointer';
            } else {
                card.style.opacity = '0.2';
                card.style.boxShadow = '';
                card.style.pointerEvents = 'none';
                card.style.cursor = 'default';
            }
        });
    }

    function highlightStufeForNeed(needId) {
        if (!needId) { _resetStufeCards(); return; }
        var targetStufe = null;
        [1, 2, 3, 4].forEach(function(sn) {
            var info = _STUFE_INFO[sn];
            if (!info || !info.charakteristik) return;
            info.charakteristik.forEach(function(c) {
                if (c.id === needId) targetStufe = sn;
            });
        });
        if (targetStufe === null) { _resetStufeCards(); return; }
        _activateStufeCard(targetStufe, STUFEN_FARBEN[targetStufe]);
    }

    function _buildStufeNeedChips(stufeNr) {
        const data = window._OshoStufeData && window._OshoStufeData[stufeNr];
        if (!data) return '';
        const { color } = data;
        const info = _getStufeInfo(stufeNr);
        const ichNeeds = (typeof TiageState !== 'undefined')
            ? (TiageState.getCombinedFlatNeeds ? TiageState.getCombinedFlatNeeds() : TiageState.getFlatNeeds('ich'))
            : {};
        const pNeeds = (typeof TiageState !== 'undefined' && TiageState.getFlatNeeds)
            ? TiageState.getFlatNeeds('partner') : {};
        const rankMap = {};
        Object.entries(ichNeeds)
            .filter(([, v]) => typeof v === 'number')
            .sort((a, b) => b[1] - a[1])
            .forEach(([id], i) => { rankMap[id] = i + 1; });
        return (info.charakteristik || [])
            .slice()
            .sort((a, b) => {
                const va = a.id && ichNeeds[a.id] !== undefined ? ichNeeds[a.id] : -1;
                const vb = b.id && ichNeeds[b.id] !== undefined ? ichNeeds[b.id] : -1;
                return vb - va;
            })
            .map(c => {
                const s1 = c.id && ichNeeds[c.id] !== undefined ? Math.round(ichNeeds[c.id]) : null;
                const s2 = c.id && pNeeds[c.id]   !== undefined ? Math.round(pNeeds[c.id])   : null;
                const avg = (s1 !== null && s2 !== null) ? Math.round((s1 + s2) / 2) : (s1 !== null ? s1 : 0);
                const rank = c.id ? rankMap[c.id] : null;
                const rankBadge = rank
                    ? `<span style="font-size:9px;font-weight:700;color:#EAB308;flex-shrink:0;min-width:32px;text-align:right;">Top ${rank}</span>`
                    : `<span style="flex-shrink:0;min-width:32px;"></span>`;
                const valHtml = s1 !== null
                    ? `<div style="font-size:10px;color:#22C55E;flex-shrink:0;">ICH ${s1}</div>`
                      + (s2 !== null ? `<div style="font-size:10px;color:#EF4444;flex-shrink:0;">P ${s2}</div>` : '')
                    : '';
                return `<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                ${rankBadge}
                <div style="font-size:12px;color:rgba(255,255,255,0.8);flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.name}</div>
                <div style="width:40px;height:3px;background:rgba(255,255,255,0.08);border-radius:1.5px;flex-shrink:0;">
                    <div style="width:${Math.min(100, avg)}%;height:100%;background:${color};border-radius:1.5px;"></div>
                </div>
                ${valHtml}
            </div>`;
            }).join('');
    }

    function _buildStufeNeedChipsResonanz(stufeNr) {
        const data = window._OshoStufeData && window._OshoStufeData[stufeNr];
        if (!data) return '';
        const info = _getStufeInfo(stufeNr);
        const ichNeeds = (typeof TiageState !== 'undefined')
            ? (TiageState.getCombinedFlatNeeds ? TiageState.getCombinedFlatNeeds() : TiageState.getFlatNeeds('ich'))
            : {};
        const pNeeds = (typeof TiageState !== 'undefined' && TiageState.getFlatNeeds)
            ? TiageState.getFlatNeeds('partner') : {};
        const barMax = Math.max(
            ...(info.charakteristik || []).flatMap(c => [
                c.id && ichNeeds[c.id] !== undefined ? ichNeeds[c.id] : 0,
                c.id && pNeeds[c.id]   !== undefined ? pNeeds[c.id]   : 0
            ]), 100
        );
        return (info.charakteristik || [])
            .slice()
            .sort((a, b) => {
                const da = a.id ? Math.abs((ichNeeds[a.id] || 0) - (pNeeds[a.id] || 0)) : 999;
                const db = b.id ? Math.abs((ichNeeds[b.id] || 0) - (pNeeds[b.id] || 0)) : 999;
                return da - db;
            })
            .map(c => {
                const s1 = c.id && ichNeeds[c.id] !== undefined ? Math.round(ichNeeds[c.id]) : null;
                const s2 = c.id && pNeeds[c.id]   !== undefined ? Math.round(pNeeds[c.id])   : null;
                const delta = (s1 !== null && s2 !== null) ? s1 - s2 : null;
                const absDelta = delta !== null ? Math.abs(delta) : null;
                const dCol = absDelta !== null
                    ? (absDelta < 20 ? '#22C55E' : absDelta < 40 ? '#F59E0B' : '#EF4444')
                    : 'rgba(255,255,255,0.3)';
                const dSign = delta !== null ? (delta >= 0 ? '+' : '') : '';
                const ichPct = s1 !== null ? Math.min(100, Math.round(s1 / barMax * 100)) : 0;
                const pPct   = s2 !== null ? Math.min(100, Math.round(s2 / barMax * 100)) : 0;
                const deltaPill = delta !== null
                    ? `<span style="font-size:9px;font-weight:700;color:${dCol};background:${dCol}18;border-radius:4px;padding:1px 6px;flex-shrink:0;">Δ ${dSign}${delta}</span>`
                    : '';
                return `<div style="padding:7px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:5px;">
                        <span style="font-size:12px;color:rgba(255,255,255,0.8);flex:1;">${c.name}</span>
                        ${deltaPill}
                    </div>
                    <div style="display:flex;align-items:center;gap:6px;margin-bottom:3px;">
                        <span style="font-size:9px;font-weight:600;color:#38BDF8;flex-shrink:0;width:22px;">ICH</span>
                        <div style="flex:1;height:5px;background:rgba(255,255,255,0.06);border-radius:2.5px;">
                            <div style="width:${ichPct}%;height:100%;background:#38BDF8;border-radius:2.5px;"></div>
                        </div>
                        <span style="font-size:9px;color:#38BDF8;flex-shrink:0;min-width:24px;text-align:right;">${s1 !== null ? s1 : '—'}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:6px;">
                        <span style="font-size:9px;font-weight:600;color:#FB923C;flex-shrink:0;width:22px;">P</span>
                        <div style="flex:1;height:5px;background:rgba(255,255,255,0.06);border-radius:2.5px;">
                            <div style="width:${pPct}%;height:100%;background:#FB923C;border-radius:2.5px;"></div>
                        </div>
                        <span style="font-size:9px;color:#FB923C;flex-shrink:0;min-width:24px;text-align:right;">${s2 !== null ? s2 : '—'}</span>
                    </div>
                </div>`;
            }).join('');
    }

    function _buildCharChips(stufeNr) {
        const data = window._OshoStufeData && window._OshoStufeData[stufeNr];
        if (!data) return '';
        const { color } = data;
        const info = _getStufeInfo(stufeNr);
        const ichNeeds = (typeof TiageState !== 'undefined')
            ? (TiageState.getCombinedFlatNeeds ? TiageState.getCombinedFlatNeeds() : TiageState.getFlatNeeds('ich'))
            : {};
        const pNeeds = (typeof TiageState !== 'undefined' && TiageState.getFlatNeeds)
            ? TiageState.getFlatNeeds('partner') : {};
        const ichRankMap = {};
        Object.entries(ichNeeds)
            .filter(([, v]) => typeof v === 'number')
            .sort((a, b) => b[1] - a[1])
            .forEach(([id], i) => { ichRankMap[id] = i + 1; });
        const gemeinsamIds = (Object.keys(pNeeds).length > 0)
            ? calculateTopMatches(ichNeeds, pNeeds, 5).map(m => m.id)
            : [];
        return (info.charakteristik || []).map(c => {
            const isGemeinsam = c.id && gemeinsamIds.indexOf(c.id) !== -1;
            const nameColor = isGemeinsam ? '#22C55E' : color;
            const gemeinsLink = isGemeinsam
                ? `<span style="font-size:9px;font-weight:600;color:#22C55E;background:rgba(34,197,94,0.12);border-radius:4px;padding:1px 5px;margin-left:5px;vertical-align:middle;">✓ ${t('beduerfnisKatalog.geteiltLabel', 'geteilt')}</span>`
                : '';
            const ichRank = c.id ? ichRankMap[c.id] : null;
            const topBadge = ichRank
                ? `<span style="font-size:9px;font-weight:600;color:#EAB308;background:rgba(234,179,8,0.12);border-radius:4px;padding:1px 5px;margin-left:4px;vertical-align:middle;">Top ${ichRank}</span>`
                : '';
            const gearLink = c.id
                ? `<a href="needs-editor.html?person=ich&focus=${encodeURIComponent(c.id)}" onclick="event.stopPropagation();" title="Bedürfnis anpassen" style="position:absolute;top:5px;right:6px;font-size:12px;color:rgba(255,255,255,0.25);text-decoration:none;line-height:1;transition:color 0.15s;" onmouseover="this.style.color='rgba(255,255,255,0.7)'" onmouseout="this.style.color='rgba(255,255,255,0.25)'">⚙</a>`
                : '';
            return `<div style="background:${color}0f;border:1px solid ${isGemeinsam ? '#22C55E40' : color + '25'};border-radius:8px;padding:8px 10px;position:relative;">
                ${gearLink}
                <div style="font-size:12px;font-weight:700;color:${nameColor};margin-bottom:2px;padding-right:16px;">${c.name}${gemeinsLink}${topBadge}</div>
                <div style="font-size:10px;color:rgba(255,255,255,0.4);line-height:1.4;">${c.sub}</div>
            </div>`;
        }).join('');
    }

    function showStufeModal(stufeNr) {
        const data = window._OshoStufeData && window._OshoStufeData[stufeNr];
        if (!data) return;

        _activeStufeNr = stufeNr;

        const { color, avgScore, needs } = data;
        const info = _getStufeInfo(stufeNr);
        const modalId = 'osho-stufe-modal';

        const existing = document.getElementById(modalId);
        if (existing) existing.remove();

        _activateStufeCard(stufeNr, color);

        const charHtml = _buildCharChips(stufeNr);
        const needChips = _buildStufeNeedChips(stufeNr);
        const needChipsResonanz = _buildStufeNeedChipsResonanz(stufeNr);

        const modal = document.createElement('div');
        modal.id = modalId;
        modal.style.cssText = 'position:fixed;inset:0;z-index:99999;display:flex;align-items:flex-start;justify-content:center;background:rgba(0,0,0,0.8);overflow-y:auto;padding:20px 12px;';
        modal.innerHTML = `
            <div style="background:#1a1a2e;border:1px solid ${color}50;border-radius:14px;max-width:500px;width:100%;padding:20px;position:relative;box-shadow:0 8px 40px rgba(0,0,0,0.7);">
                <button onclick="document.getElementById('${modalId}').remove();document.body.style.overflow='';OshoZenTextGenerator._resetStufeCards();"
                    style="position:absolute;top:12px;right:12px;background:rgba(255,255,255,0.08);border:none;border-radius:50%;width:32px;height:32px;cursor:pointer;font-size:16px;color:rgba(255,255,255,0.6);display:flex;align-items:center;justify-content:center;line-height:1;">✕</button>

                <!-- Header -->
                <div style="margin-bottom:16px;">
                    <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:2px;">
                        <span style="font-size:22px;">${info.icon || '🔷'}</span>
                        <div>
                            <div style="font-size:11px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:0.1em;">${t('beduerfnisKatalog.stufeLabel', 'Stufe')} ${stufeNr} · ${info.evolution || ''}</div>
                            <div style="font-size:20px;font-weight:800;color:rgba(255,255,255,0.95);line-height:1.2;">${info.titel || ''}</div>
                        </div>
                        <div style="margin-left:auto;text-align:right;">
                            <div style="font-size:11px;color:rgba(255,255,255,0.3);">${t('beduerfnisKatalog.avgLabel', 'Euer Ø')}</div>
                            <div style="font-size:18px;font-weight:700;color:${color};">${avgScore}</div>
                        </div>
                    </div>
                    <div style="height:3px;background:rgba(255,255,255,0.06);border-radius:1.5px;margin-top:10px;">
                        <div style="width:${avgScore}%;height:100%;background:${color};border-radius:1.5px;transition:width 0.6s ease;"></div>
                    </div>
                </div>

                <!-- Kernthema -->
                <div style="background:${color}18;border-left:3px solid ${color};border-radius:0 8px 8px 0;padding:10px 14px;margin-bottom:14px;">
                    <div style="font-size:10px;font-weight:700;color:${color};text-transform:uppercase;letter-spacing:0.08em;margin-bottom:3px;">${t('beduerfnisKatalog.kernthemaLabel', 'Kernthema')}</div>
                    <div style="font-size:14px;font-weight:600;color:rgba(255,255,255,0.9);">${info.kernthema || ''}</div>
                </div>

                <!-- Beschreibung -->
                <div style="font-size:13px;color:rgba(255,255,255,0.65);line-height:1.6;margin-bottom:16px;">${info.beschreibung || ''}</div>

                <!-- Archetypal needs grid -->
                <div style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:8px;">${t('beduerfnisKatalog.charakteristikLabel', 'Charakteristische Bedürfnisse dieser Stufe')}</div>
                <div id="${modalId}-char" style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:16px;">${charHtml}</div>

                <!-- Beziehungsrelevanz -->
                <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px 14px;margin-bottom:14px;">
                    <div style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:6px;">${t('beduerfnisKatalog.beziehungLabel', 'In eurer Beziehung')}</div>
                    <div style="font-size:12px;color:rgba(255,255,255,0.6);line-height:1.5;">${info.beziehung || ''}</div>
                </div>

                <!-- Reflexionsfrage -->
                <div style="font-size:13px;color:${color};font-style:italic;text-align:center;padding:10px 0;border-top:1px solid rgba(255,255,255,0.06);">💭 ${info.frage || ''}</div>

                <!-- Quelle -->
                <div style="text-align:center;margin-top:8px;">
                    <a href="https://www.liebe-auf-augenhoehe.de/psychische-grundbeduerfnisse/" target="_blank" rel="noopener" style="font-size:10px;color:rgba(255,255,255,0.2);text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.1);padding-bottom:1px;">Quelle: liebe-auf-augenhoehe.de</a>
                </div>

                <!-- Eure Bedürfnisse — toggle Meine Stärke / Resonanz -->
                ${info.charakteristik && info.charakteristik.length > 0 ? `
                <div style="margin-top:14px;border-top:1px solid rgba(255,255,255,0.06);padding-top:12px;">
                    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">
                        <div style="font-size:10px;font-weight:700;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.08em;">${t('beduerfnisKatalog.eureBeduerfnisseLabel', 'Eure Bedürfnisse auf dieser Stufe')}</div>
                        <div style="display:flex;gap:4px;">
                            <button id="${modalId}-b-s"
                                onclick="document.getElementById('${modalId}-v-s').style.display='';document.getElementById('${modalId}-v-r').style.display='none';document.getElementById('${modalId}-b-s').style.opacity='1';document.getElementById('${modalId}-b-r').style.opacity='0.45';"
                                style="font-size:10px;font-weight:700;color:${color};background:${color}20;border:1px solid ${color}50;border-radius:5px;padding:3px 9px;cursor:pointer;">${t('beduerfnisKatalog.meineStaerkeLabel', 'Meine Stärke')}</button>
                            <button id="${modalId}-b-r"
                                onclick="document.getElementById('${modalId}-v-r').style.display='';document.getElementById('${modalId}-v-s').style.display='none';document.getElementById('${modalId}-b-r').style.opacity='1';document.getElementById('${modalId}-b-s').style.opacity='0.45';"
                                style="font-size:10px;font-weight:600;color:rgba(255,255,255,0.4);background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:5px;padding:3px 9px;cursor:pointer;opacity:0.45;">${t('beduerfnisKatalog.resonanzLabel', 'Resonanz')}</button>
                        </div>
                    </div>
                    <div id="${modalId}-v-s">${needChips}</div>
                    <div id="${modalId}-v-r" style="display:none;">${needChipsResonanz}</div>
                </div>` : ''}
            </div>`;

        function _closeModal() { modal.remove(); document.body.style.overflow = ''; _resetStufeCards(); _activeStufeNr = null; }

        modal.addEventListener('click', function(e) { if (e.target === modal) _closeModal(); });

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        function onEsc(e) { if (e.key === 'Escape') { _closeModal(); document.removeEventListener('keydown', onEsc); } }
        document.addEventListener('keydown', onEsc);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // LIVE UPDATE — Stufen modal refreshes when needs change
    // ═══════════════════════════════════════════════════════════════════════════

    (function initStufeModalSubscriber() {
        if (typeof TiageState === 'undefined' || typeof TiageState.subscribe !== 'function') {
            setTimeout(initStufeModalSubscriber, 100);
            return;
        }

        // Rebuild helper — called by both ich and partner subscribers
        function _rebuildChips() {
            if (_activeStufeNr === null) return;
            const modalId = 'osho-stufe-modal';
            const charEl = document.getElementById(modalId + '-char');
            const vsEl   = document.getElementById(modalId + '-v-s');
            const vrEl   = document.getElementById(modalId + '-v-r');
            if (!charEl && !vsEl && !vrEl) { _activeStufeNr = null; return; }
            if (charEl) charEl.innerHTML = _buildCharChips(_activeStufeNr);
            if (vsEl)   vsEl.innerHTML   = _buildStufeNeedChips(_activeStufeNr);
            if (vrEl)   vrEl.innerHTML   = _buildStufeNeedChipsResonanz(_activeStufeNr);
        }

        // Subscribe to the full flatNeeds path so _rebuildChips fires on:
        //  a) individual setNeed() calls (upward propagation from flatNeeds.ich.{arch}.{id})
        //  b) loadFromStorage()'s batch set('flatNeeds', ...) on bfcache restore
        // Using 'flatNeeds' instead of 'flatNeeds.ich'+'flatNeeds.partner' covers both cases
        // because parent-path notify always bubbles UP (not down), so a set on any child
        // eventually reaches 'flatNeeds'.
        TiageState.subscribe('flatNeeds', _rebuildChips);

        // Safety net: if the pageshow fires before the flatNeeds subscriber (ordering edge case),
        // rebuild again 350ms later after loadFromStorage() has definitely completed.
        window.addEventListener('pageshow', function(event) {
            if (!event.persisted || _activeStufeNr === null) return;
            setTimeout(_rebuildChips, 350);
        });
    })();

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
        showStufeModal: showStufeModal,
        _resetStufeCards: _resetStufeCards,
        highlightStufeForNeed: highlightStufeForNeed,

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
