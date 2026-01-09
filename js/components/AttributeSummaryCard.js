/**
 * ATTRIBUTE SUMMARY CARD COMPONENT
 *
 * Zeigt Attribute als Zusammenfassung der zugehörigen Bedürfnisse.
 * Klick zum Erweitern und Bearbeiten der einzelnen Bedürfnisse.
 * Mit Eingabewert und Schloss wie bei Gewichtungen.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

// Fallback für Seiten ohne app-main.js (z.B. needs-editor.html)
if (typeof window.openNeedWithResonance !== 'function') {
    window.openNeedWithResonance = function(needId) {
        console.log('[AttributeSummaryCard] openNeedWithResonance not available, needId:', needId);
    };
}

const AttributeSummaryCard = (function() {
    'use strict';

    // FIX v1.8.687: Debounced save für Performance bei Slider-Bewegungen
    let saveDebounceTimer = null;
    const SAVE_DEBOUNCE_MS = 300; // Speichern max alle 300ms

    function debouncedSaveToStorage() {
        if (saveDebounceTimer) {
            clearTimeout(saveDebounceTimer);
        }
        saveDebounceTimer = setTimeout(function() {
            if (typeof TiageState !== 'undefined' && TiageState.saveToStorage) {
                TiageState.saveToStorage();
            }
        }, SAVE_DEBOUNCE_MS);
    }

    /**
     * Berechnet den korrekten Fill-Prozentsatz für Slider-Track-Hintergrund.
     * Berücksichtigt die Thumb-Breite (16px), damit der Gradient mit dem
     * Thumb-Mittelpunkt übereinstimmt statt mit dem Raw-Wert.
     *
     * @param {number} value - Der Slider-Wert (0-100)
     * @param {HTMLElement} [sliderElement] - Optional: Das Slider-Element für exakte Berechnung
     * @returns {number} Der korrigierte Fill-Prozentsatz
     */
    function getSliderFillPercent(value, sliderElement = null) {
        const thumbWidth = 16;

        if (sliderElement && sliderElement.offsetWidth > 0) {
            const trackWidth = sliderElement.offsetWidth;
            const thumbOffset = thumbWidth / 2;
            const fillPx = thumbOffset + (value / 100) * (trackWidth - thumbWidth);
            return (fillPx / trackWidth) * 100;
        }

        // Fallback: Lineare Approximation für ~200-300px breite Slider
        // Gibt ca. 3% bei 0 und 97% bei 100
        return 3 + value * 0.94;
    }

    /**
     * Erzeugt den CSS linear-gradient String für Slider-Track-Fill.
     * @param {string} color - Die Füllfarbe
     * @param {number} value - Der Slider-Wert (0-100)
     * @param {HTMLElement} [sliderElement] - Optional: Das Slider-Element
     * @returns {string} Der CSS linear-gradient String
     */
    function getSliderFillGradient(color, value, sliderElement = null) {
        const fillPercent = getSliderFillPercent(value, sliderElement);
        return `linear-gradient(to right, ${color} 0%, ${color} ${fillPercent}%, rgba(255,255,255,0.15) ${fillPercent}%, rgba(255,255,255,0.15) 100%)`;
    }

    /**
     * R-FAKTOR EINFLUSS-INDIKATOR
     * Ermittelt zu welchem R-Faktor ein Bedürfnis beiträgt.
     *
     * Mapping:
     * - R1 (Leben) = ORIENTIERUNG_NEEDS (Sexualität, Intimität)
     * - R2 (Philosophie) = ARCHETYP_NEEDS (Lebensplanung, Bindung)
     * - R3 (Dynamik) = DOMINANZ_NEEDS (Machtdynamik)
     * - R4 (Identität) = GESCHLECHT_NEEDS (Authentizität, Ausdruck)
     *
     * @param {string} needId - Die Bedürfnis-ID (#B-ID oder String-Key)
     * @returns {object|null} { factor: 'R1'|'R2'|'R3'|'R4', color: '#...', label: '...' } oder null
     */
    function getRFactorForNeed(needId) {
        // Konvertiere #B-ID zu String-Key falls nötig
        let stringKey = needId;
        if (needId.startsWith('#B') && typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.toKey) {
            stringKey = BeduerfnisIds.toKey(needId) || needId;
        }

        // Hole NEEDS_INTEGRATION aus TiageSynthesis.Constants
        const constants = (typeof TiageSynthesis !== 'undefined' && TiageSynthesis.Constants)
            ? TiageSynthesis.Constants.NEEDS_INTEGRATION
            : null;

        if (!constants) return null;

        // R-Faktor Konfiguration
        const R_FACTOR_CONFIG = {
            R1: { label: 'Leben', color: '#E63946', needs: constants.ORIENTIERUNG_NEEDS || [] },
            R2: { label: 'Philosophie', color: '#2A9D8F', needs: constants.ARCHETYP_NEEDS || [] },
            R3: { label: 'Dynamik', color: '#8B5CF6', needs: constants.DOMINANZ_NEEDS || [] },
            R4: { label: 'Identität', color: '#F4A261', needs: constants.GESCHLECHT_NEEDS || [] }
        };

        // Suche in welchem R-Faktor das Bedürfnis vorkommt
        for (const [factor, config] of Object.entries(R_FACTOR_CONFIG)) {
            if (config.needs.includes(stringKey)) {
                return {
                    factor: factor,
                    color: config.color,
                    label: config.label
                };
            }
        }

        // Zusätzlich: Prüfe ARCHETYP_KOHAERENZ für die 4-5 Kern-Bedürfnisse pro Dimension
        const kohaerenz = (typeof TiageSynthesis !== 'undefined' && TiageSynthesis.Constants)
            ? TiageSynthesis.Constants.ARCHETYP_KOHAERENZ
            : null;

        if (kohaerenz) {
            const KOHAERENZ_MAPPING = {
                R1: { label: 'Leben', color: '#E63946', dimension: 'leben' },
                R2: { label: 'Philosophie', color: '#2A9D8F', dimension: 'philosophie' },
                R3: { label: 'Dynamik', color: '#8B5CF6', dimension: 'dynamik' },
                R4: { label: 'Identität', color: '#F4A261', dimension: 'identitaet' }
            };

            for (const [factor, config] of Object.entries(KOHAERENZ_MAPPING)) {
                const dimData = kohaerenz[config.dimension];
                if (dimData) {
                    // Prüfe jeden Archetyp
                    for (const archetype of Object.keys(dimData)) {
                        const archetypNeeds = dimData[archetype];
                        if (archetypNeeds) {
                            for (const needKey of Object.keys(archetypNeeds)) {
                                const needEntry = archetypNeeds[needKey];
                                // Prüfe sowohl needKey als auch #B-ID
                                if (needKey === stringKey ||
                                    (needEntry && needEntry.id === needId)) {
                                    return {
                                        factor: factor,
                                        color: config.color,
                                        label: config.label,
                                        isCore: true // Markiere als Kern-Bedürfnis
                                    };
                                }
                            }
                        }
                    }
                }
            }
        }

        return null;
    }

    /**
     * Erzeugt das HTML für das R-Faktor Badge
     * @param {string} needId - Die Bedürfnis-ID
     * @param {number} value - Der aktuelle Wert des Bedürfnisses
     * @returns {string} HTML-String für das Badge oder leer
     */
    function renderRFactorBadge(needId, value) {
        const rInfo = getRFactorForNeed(needId);
        if (!rInfo) return '';

        // Berechne den Beitrag: Wert / 100 zeigt wie stark dieses Bedürfnis R beeinflusst
        const contribution = (value / 100).toFixed(2);
        const isHigh = value >= 70;
        const isLow = value <= 30;
        const intensityClass = isHigh ? 'r-badge-high' : (isLow ? 'r-badge-low' : '');
        const coreClass = rInfo.isCore ? ' r-badge-core' : '';

        return `<span class="r-factor-badge ${intensityClass}${coreClass}"
                      style="--r-color: ${rInfo.color};"
                      title="${rInfo.label}: Wert ${value} → Beitrag ×${contribution}">
                    ${rInfo.factor}
                </span>`;
    }

    /**
     * SINGLE SOURCE OF TRUTH für Bedürfnis-Labels
     * Greift dynamisch auf GfkBeduerfnisse.getDefinition() zu.
     * Unterstützt sowohl #B-IDs als auch String-Keys.
     *
     * Format: "#B34 Selbstbestimmung" (mit #ID für Referenzierbarkeit)
     *
     * @param {string} needId - Die Bedürfnis-ID (#B-ID wie '#B21' oder String-Key wie 'liebe')
     * @returns {string} Das Label für das Bedürfnis mit #B-ID Prefix
     */
    function getNeedLabel(needId) {
        // Bestimme die #B-ID für das Prefix
        let hashId = needId.startsWith('#B') ? needId : '';
        if (!hashId && typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.toId) {
            hashId = BeduerfnisIds.toId(needId) || '';
        }
        const prefix = hashId ? hashId + ' ' : '';

        // Primär: GfkBeduerfnisse.getDefinition() (unterstützt #B-IDs und String-Keys)
        if (typeof GfkBeduerfnisse !== 'undefined' && GfkBeduerfnisse.getDefinition) {
            const def = GfkBeduerfnisse.getDefinition(needId);
            if (def && def.label) {
                return prefix + def.label;
            }
        }

        // Fallback für alte definitionen-Struktur
        if (typeof GfkBeduerfnisse !== 'undefined' && GfkBeduerfnisse.definitionen) {
            const def = GfkBeduerfnisse.definitionen[needId];
            if (def && def.label) {
                return prefix + def.label;
            }
        }

        // Fallback: Formatiere ID als lesbaren String
        const fallbackLabel = needId
            .replace(/^#B\d+\s*/, '') // Entferne #B-Prefix falls vorhanden
            .replace(/_/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());
        return prefix + fallbackLabel;
    }

    /**
     * Mapping: Attribut → zugehörige Bedürfnisse
     *
     * Die Bedürfnis-IDs müssen mit den IDs in den Archetyp-Profilen
     * (z.B. solopoly.js, duo.js) übereinstimmen, damit beide Modals
     * auf dieselbe Datenquelle zugreifen.
     */
    const ATTRIBUTE_NEEDS_MAPPING = {
        // GESCHLECHTSIDENTITÄT
        'pr-geschlecht-sekundaer': {
            needs: ['akzeptanz', 'verstanden_werden', 'gesehen_werden', 'authentizitaet',
                    'selbstbestimmung', 'identitaet', 'selbst_ausdruck'],
            label: 'Geschlechtsidentität',
            category: 'geschlechtsidentitaet'
        },

        // LEBENSPLANUNG
        'pr-kinder': {
            needs: ['kinderwunsch', 'elternschaft', 'fortpflanzung', 'fuersorge',
                    'familie_gruenden', 'generativitaet', 'verantwortung_uebernehmen'],
            label: 'Kinder',
            category: 'lebensplanung'
        },
        'pr-ehe': {
            needs: ['verbindlichkeit', 'langfristige_bindung', 'rechtliche_sicherheit',
                    'gesellschaftliche_anerkennung', 'tradition', 'treueversprechen'],
            label: 'Ehe',
            category: 'lebensplanung'
        },
        'pr-zusammen': {
            needs: ['gemeinsamer_wohnraum', 'haeuslichkeit', 'nest_bauen', 'alltag_teilen',
                    'naehe', 'eigener_raum', 'rueckzugsort'],
            label: 'Zusammen wohnen',
            category: 'lebensplanung'
        },
        'pr-haustiere': {
            needs: ['tierliebe', 'fuersorge_tiere', 'begleiter', 'verantwortung_tier',
                    'natur_verbundenheit', 'ungebundenheit'],
            label: 'Haustiere',
            category: 'lebensplanung'
        },
        'pr-umzug': {
            needs: ['sesshaftigkeit', 'verwurzelung', 'mobilitaet', 'flexibilitaet',
                    'heimat', 'neue_orte', 'stabiler_lebensmittelpunkt'],
            label: 'Umzugsbereitschaft',
            category: 'lebensplanung'
        },
        'pr-familie': {
            needs: ['familienbindung', 'herkunftsfamilie', 'familientreffen',
                    'generationenverbund', 'familienpflichten', 'eigenstaendigkeit_von_familie'],
            label: 'Familie-Wichtigkeit',
            category: 'lebensplanung'
        },

        // FINANZEN & KARRIERE
        'pr-finanzen': {
            needs: ['finanzielle_unabhaengigkeit', 'gemeinsame_finanzen', 'finanzielle_transparenz',
                    'finanzielle_sicherheit', 'sparsamkeit', 'grosszuegigkeit'],
            label: 'Finanzen',
            category: 'finanzen'
        },
        'pr-karriere': {
            needs: ['berufliche_erfuellung', 'karriereambition', 'work_life_balance',
                    'berufliche_anerkennung', 'zeit_fuer_beziehung', 'berufliche_flexibilitaet'],
            label: 'Karriere-Priorität',
            category: 'finanzen'
        },

        // KOMMUNIKATION
        'pr-gespraech': {
            needs: ['taeglicher_austausch', 'tiefgehende_gespraeche', 'small_talk',
                    'stille_gemeinsam', 'verbale_verbindung', 'zuhoeren'],
            label: 'Gesprächsbedürfnis',
            category: 'kommunikation'
        },
        'pr-emotional': {
            needs: ['emotionale_offenheit', 'gefuehle_zeigen', 'verletzlichkeit',
                    'emotionale_zurueckhaltung', 'emotionale_sicherheit', 'gefuehle_teilen'],
            label: 'Emotionale Offenheit',
            category: 'kommunikation'
        },
        'pr-konflikt': {
            needs: ['konfliktklaerung', 'harmonie', 'aussprache', 'konflikt_vermeiden',
                    'streitkultur', 'versoehnlichkeit'],
            label: 'Konfliktverhalten',
            category: 'kommunikation'
        },

        // SOZIALES
        'pr-introextro': {
            needs: ['soziale_energie', 'geselligkeit', 'ruhe_von_menschen',
                    'allein_aufladen', 'menschen_treffen', 'kleine_gruppen'],
            label: 'Intro/Extrovertiert',
            category: 'soziales'
        },
        'pr-alleinzeit': {
            needs: ['zeit_fuer_sich', 'eigene_hobbys', 'gemeinsame_zeit',
                    'unabhaengigkeit', 'partnerzeit', 'eigene_interessen'],
            label: 'Alleinzeit-Bedürfnis',
            category: 'soziales'
        },
        'pr-freunde': {
            needs: ['eigene_freunde', 'gemeinsame_freunde', 'freundeskreis_teilen',
                    'soziales_netz', 'freunde_pflegen', 'neue_freundschaften'],
            label: 'Freundeskreis',
            category: 'soziales'
        },

        // INTIMITÄT
        'pr-naehe': {
            needs: ['koerpernaehe', 'beruehrung', 'kuscheln', 'physische_distanz',
                    'koerperkontakt', 'umarmungen', 'hand_halten'],
            label: 'Körperliche Nähe',
            category: 'intimitaet'
        },
        'pr-romantik': {
            needs: ['romantische_gesten', 'ueberraschungen', 'dates', 'alltags_romantik',
                    'aufmerksamkeiten', 'liebesbekundungen'],
            label: 'Romantik-Bedürfnis',
            category: 'intimitaet'
        },
        'pr-sex': {
            needs: ['sexuelle_haeufigkeit', 'sexuelle_intimiaet', 'koerperliche_lust',
                    'sexuelle_experimentierfreude', 'sexuelle_verbindung', 'sexuelle_zufriedenheit'],
            label: 'Sexuelle Frequenz',
            category: 'intimitaet'
        },

        // WERTE
        'pr-religion': {
            needs: ['spiritualitaet', 'glaubenspraxis', 'religioese_gemeinschaft',
                    'saekularitaet', 'sinnsuche', 'transzendenz'],
            label: 'Religiosität',
            category: 'werte'
        },
        'pr-tradition': {
            needs: ['traditionelle_werte', 'moderne_lebensweise', 'konservative_werte',
                    'progressive_werte', 'kulturelle_tradition', 'offenheit_fuer_neues'],
            label: 'Tradition vs. Modern',
            category: 'werte'
        },
        'pr-umwelt': {
            needs: ['umweltverantwortung', 'nachhaltigkeit', 'oekologisches_bewusstsein',
                    'pragmatismus', 'klimaschutz', 'ressourcenschonung'],
            label: 'Umweltbewusstsein',
            category: 'werte'
        },

        // PRAKTISCHES
        'pr-ordnung': {
            needs: ['ordnungssinn', 'sauberkeit', 'struktur', 'chaos_toleranz',
                    'organisiert_sein', 'flexibilitaet_haushalt'],
            label: 'Ordnung',
            category: 'praktisches'
        },
        'pr-reise': {
            needs: ['reisen', 'abenteuer', 'neue_orte_entdecken', 'zuhause_bleiben',
                    'urlaub', 'fernweh', 'heimatverbundenheit'],
            label: 'Reise-Frequenz',
            category: 'praktisches'
        }
    };

    /**
     * DEPRECATED: NEEDS_LABELS
     * Die Labels werden jetzt dynamisch aus GfkBeduerfnisse.definitionen geladen.
     * Siehe getNeedLabel() Funktion oben.
     *
     * Diese Konstante bleibt nur für Abwärtskompatibilität erhalten,
     * falls externe Module darauf zugreifen.
     */
    const NEEDS_LABELS = null; // Wird durch getNeedLabel() ersetzt

    /**
     * FLAT NEEDS - SSOT ARCHITEKTUR (v1.8.691)
     *
     * TiageState ist die EINZIGE Datenquelle für Bedürfnis-Werte.
     * flatNeeds dient nur als CACHE für Performance (Rendering).
     *
     * LESEN: Über getFlatNeedsFromState() - liest von TiageState
     * SCHREIBEN: Über TiageState.setNeed() - schreibt zu TiageState
     *
     * Format: [
     *   { id: "#B1", key: 1, stringKey: "sicherheit", label: "Sicherheit", value: 50, locked: false },
     *   ...
     * ]
     */
    let flatNeeds = [];
    let flatNeedsCacheValid = false;
    let flatNeedsCachePerson = null;

    /**
     * SSOT: Holt flatNeeds IMMER frisch von TiageState
     * Kombiniert Werte aus TiageState mit Metadaten aus BeduerfnisIds
     *
     * @param {string} person - 'ich' oder 'partner' (optional, default: currentPerson)
     * @returns {Array} Array mit Bedürfnis-Objekten
     */
    function getFlatNeedsFromState(person) {
        // Person ermitteln
        if (!person) {
            if (window.currentProfileReviewContext?.person) {
                person = window.currentProfileReviewContext.person;
            } else {
                person = 'ich';
            }
        }

        // Cache prüfen - nur verwenden wenn gültig UND gleiche Person
        if (flatNeedsCacheValid && flatNeedsCachePerson === person && flatNeeds.length > 0) {
            return flatNeeds;
        }

        // Von TiageState lesen
        if (typeof TiageState === 'undefined') {
            console.warn('[AttributeSummaryCard] TiageState nicht verfügbar!');
            return flatNeeds;
        }

        const stateValues = TiageState.get(`flatNeeds.${person}`) || {};
        const lockedNeeds = TiageState.getLockedNeeds?.(person) || {};

        // Metadaten aus BeduerfnisIds
        if (typeof BeduerfnisIds === 'undefined' || !BeduerfnisIds.beduerfnisse) {
            console.warn('[AttributeSummaryCard] BeduerfnisIds nicht verfügbar!');
            return flatNeeds;
        }

        // Array aufbauen
        flatNeeds = [];
        Object.keys(BeduerfnisIds.beduerfnisse).forEach(needId => {
            const needData = BeduerfnisIds.beduerfnisse[needId];
            const numKey = parseInt(needId.replace('#B', ''), 10) || 0;
            const isLocked = lockedNeeds.hasOwnProperty(needId);

            // Wert: Gesperrter Wert hat Vorrang, dann State-Wert, dann Default 50
            const value = isLocked
                ? lockedNeeds[needId]
                : (stateValues[needId] !== undefined ? stateValues[needId] : 50);

            flatNeeds.push({
                id: needId,
                key: numKey,
                stringKey: needData?.key || '',
                label: needData?.label || needId,
                value: value,
                locked: isLocked
            });
        });

        // Cache als gültig markieren
        flatNeedsCacheValid = true;
        flatNeedsCachePerson = person;

        console.log('[AttributeSummaryCard] getFlatNeedsFromState() -', flatNeeds.length, 'Bedürfnisse für', person);
        return flatNeeds;
    }

    /**
     * Invalidiert den flatNeeds Cache
     * Wird aufgerufen wenn Werte geändert werden
     */
    function invalidateFlatNeedsCache() {
        flatNeedsCacheValid = false;
    }

    /**
     * MULTI-SELECT FEATURE: Set zum Speichern ausgewählter Bedürfnisse
     * Enthält die IDs der ausgewählten Bedürfnisse (#B1, #B2, etc.)
     */
    let selectedNeeds = new Set();

    /**
     * MULTI-SELECT FEATURE: Map zum Speichern der ursprünglichen Werte
     * Speichert die Werte der Bedürfnisse vor Änderungen (needId -> originalValue)
     */
    let originalNeedValues = new Map();

    /**
     * HAUPTFRAGEN-LOCK FEATURE: Set zum Speichern gelockter Hauptfragen
     * Wenn eine Hauptfrage gelockt ist, sind auch alle ihre Nuancen gelockt.
     * Der Slider-Wert der Hauptfrage wird direkt gesetzt (nicht aus Nuancen berechnet).
     */
    let lockedHauptfragen = new Set();

    /**
     * Helper: Findet ein Bedürfnis nach ID im flatNeeds Array
     * @param {string} id - Die #B-ID (z.B. "#B34")
     * @returns {Object|undefined} Das Bedürfnis-Objekt oder undefined
     */
    function findNeedById(id) {
        return flatNeeds.find(n => n.id === id);
    }

    /**
     * Helper: Findet den Index eines Bedürfnisses nach ID
     * @param {string} id - Die #B-ID
     * @returns {number} Index oder -1 wenn nicht gefunden
     */
    function findNeedIndex(id) {
        return flatNeeds.findIndex(n => n.id === id);
    }

    /**
     * Helper: Berechnet die Gesamtzahl der gesperrten Items
     * FIX v1.8.568: Berücksichtigt sowohl direkt gesperrte Nuancen als auch
     * Nuancen die durch gesperrte Hauptfragen implizit gesperrt sind
     * @param {string} currentPerson - 'ich' oder 'partner'
     * @returns {number} Anzahl der gesperrten Items
     */
    function calculateTotalLockedCount(currentPerson) {
        let lockedCount = 0;
        const alreadyCountedNuancen = new Set();

        // 1. Direkt gesperrte Nuancen aus TiageState
        if (typeof TiageState !== 'undefined' && TiageState.getLockedNeeds) {
            const lockedNeeds = TiageState.getLockedNeeds(currentPerson) || {};
            Object.keys(lockedNeeds).forEach(id => {
                lockedCount++;
                alreadyCountedNuancen.add(id);
            });
        }

        // 2. Nuancen die durch gesperrte Hauptfragen implizit gesperrt sind
        if (lockedHauptfragen.size > 0 && typeof HauptfrageAggregation !== 'undefined') {
            const hauptfragen = HauptfrageAggregation.getHauptfragen();

            lockedHauptfragen.forEach(hfId => {
                const hf = hauptfragen[hfId];
                if (hf && hf.nuancen && hf.nuancen.length > 0) {
                    // Hauptfrage hat Nuancen - zähle die nicht bereits gezählten
                    hf.nuancen.forEach(nuanceId => {
                        if (!alreadyCountedNuancen.has(nuanceId)) {
                            lockedCount++;
                            alreadyCountedNuancen.add(nuanceId);
                        }
                    });
                } else {
                    // Hauptfrage ohne Nuancen - zähle die Hauptfrage selbst
                    if (!alreadyCountedNuancen.has(hfId)) {
                        lockedCount++;
                        alreadyCountedNuancen.add(hfId);
                    }
                }
            });
        }

        return lockedCount;
    }

    /**
     * Helper: Aktualisiert ein Bedürfnis
     * SSOT v1.8.691: Schreibt IMMER zu TiageState, Cache wird invalidiert
     *
     * @param {string} id - Die #B-ID
     * @param {Object} updates - Zu aktualisierende Felder
     */
    function upsertNeed(id, updates) {
        // SSOT: Schreibe zu TiageState (einzige Datenquelle)
        if (typeof TiageState === 'undefined') {
            console.error('[AttributeSummaryCard] TiageState nicht verfügbar!');
            return;
        }

        let currentPerson = 'ich';
        if (window.currentProfileReviewContext?.person) {
            currentPerson = window.currentProfileReviewContext.person;
        }

        // Value zu TiageState schreiben
        if (updates.value !== undefined && TiageState.setNeed) {
            TiageState.setNeed(currentPerson, id, updates.value);
        }

        // Lock-Status zu TiageState schreiben
        if (updates.locked !== undefined) {
            if (updates.locked && TiageState.lockNeed) {
                const currentValue = updates.value !== undefined ? updates.value : 50;
                TiageState.lockNeed(currentPerson, id, currentValue);
            } else if (!updates.locked && TiageState.unlockNeed) {
                TiageState.unlockNeed(currentPerson, id);
            }
        }

        // Cache invalidieren - nächster Zugriff lädt frisch von TiageState
        invalidateFlatNeedsCache();

        // Lokalen Cache auch aktualisieren für sofortige UI-Reaktion
        const index = findNeedIndex(id);
        if (index >= 0) {
            flatNeeds[index] = { ...flatNeeds[index], ...updates };
        }

        // Debounced in localStorage persistieren
        debouncedSaveToStorage();
    }

    /**
     * MULTI-SELECT: Togglet die Auswahl eines Bedürfnisses
     * @param {string} needId - Die #B-ID
     */
    function toggleNeedSelection(needId) {
        if (selectedNeeds.has(needId)) {
            selectedNeeds.delete(needId);
            // Entferne auch den ursprünglichen Wert
            originalNeedValues.delete(needId);
        } else {
            selectedNeeds.add(needId);
            // Speichere den aktuellen Wert als Original
            const needObj = findNeedById(needId);
            if (needObj) {
                originalNeedValues.set(needId, needObj.value);
            }
        }

        // Update UI
        const needItem = document.querySelector(`.flat-need-item[data-need="${needId}"]`);
        if (needItem) {
            const isSelected = selectedNeeds.has(needId);
            needItem.classList.toggle('need-selected', isSelected);
        }

        // Event
        document.dispatchEvent(new CustomEvent('needSelectionChange', {
            bubbles: true,
            detail: { needId, selected: selectedNeeds.has(needId), totalSelected: selectedNeeds.size }
        }));

        // Update Auswahl-Counter
        updateSelectionCounter();
    }

    /**
     * MULTI-SELECT: Löscht alle Auswahlen
     */
    function clearNeedSelection() {
        selectedNeeds.forEach(needId => {
            const needItem = document.querySelector(`.flat-need-item[data-need="${needId}"]`);
            if (needItem) {
                needItem.classList.remove('need-selected');
            }
        });
        selectedNeeds.clear();
        originalNeedValues.clear();

        // FIX: Auch Hauptfrage-Selection-Classes entfernen
        document.querySelectorAll('.hauptfrage-item.hauptfrage-selected, .hauptfrage-item.hauptfrage-partial-selected').forEach(item => {
            item.classList.remove('hauptfrage-selected', 'hauptfrage-partial-selected');
        });

        // Update Auswahl-Counter
        updateSelectionCounter();
    }

    /**
     * MULTI-SELECT: Wählt alle gefilterten Bedürfnisse aus oder ab
     * Toggle-Logik: Wenn alle gefilterten bereits ausgewählt → alle abwählen, sonst alle auswählen
     * WICHTIG: Bei keinem aktiven Filter werden ALLE Bedürfnisse ausgewählt (inkl. nicht-expandierte Nuancen)
     */
    function selectAllFilteredNeeds() {
        // Hilfsfunktion: Prüft ob ein Need durch Filter (inkl. Suchfilter) sichtbar ist
        function isNeedVisibleByFilters(need) {
            // DimensionKategorieFilter prüfen (primärer Filter)
            if (typeof DimensionKategorieFilter !== 'undefined' && !DimensionKategorieFilter.shouldShowNeed(need.id)) {
                return false;
            }

            // DOM-basierte Filter prüfen - für Items die ein DOM-Element haben
            const needItem = document.querySelector(`.flat-need-item[data-need="${need.id}"]`);
            if (needItem && (needItem.classList.contains('dimension-filter-hidden') || needItem.classList.contains('filter-hidden'))) {
                return false;
            }

            // Prüfe ob es eine Hauptfrage ist und ob sie durch Filter versteckt ist
            const hauptfrageItem = document.querySelector(`.hauptfrage-item[data-hauptfrage-id="${need.id}"]`);
            if (hauptfrageItem && hauptfrageItem.classList.contains('filter-hidden')) {
                return false;
            }

            // FIX: Für Nuancen ohne DOM-Element: Prüfe ob Parent-Hauptfrage durch Filter versteckt ist
            if (!needItem && !hauptfrageItem && typeof HauptfrageAggregation !== 'undefined') {
                const parentHf = HauptfrageAggregation.getHauptfrageForNuance(need.id);
                if (parentHf) {
                    const parentItem = document.querySelector(`.hauptfrage-item[data-hauptfrage-id="${parentHf.id}"]`);
                    // Wenn Parent-Hauptfrage durch Filter versteckt ist, ist auch Nuance versteckt
                    if (parentItem && parentItem.classList.contains('filter-hidden')) {
                        return false;
                    }
                }
            }

            return true;
        }

        // Ermittle alle Bedürfnisse die durch aktive Filter erlaubt sind
        const visibleNeeds = flatNeeds.filter(need => isNeedVisibleByFilters(need));

        // Ermittle Bedürfnisse die durch Filter ausgeschlossen sind
        const hiddenNeeds = flatNeeds.filter(need => !isNeedVisibleByFilters(need));

        if (visibleNeeds.length === 0) {
            return;
        }

        // Prüfe, ob alle sichtbaren bereits ausgewählt sind
        const allSelected = visibleNeeds.every(need => selectedNeeds.has(need.id));

        // ZUERST: Alle nicht-sichtbaren (gefilterten) Bedürfnisse abwählen
        // Dies stellt sicher, dass NUR die gefilterten Bedürfnisse ausgewählt werden
        hiddenNeeds.forEach(need => {
            if (selectedNeeds.has(need.id)) {
                selectedNeeds.delete(need.id);
                originalNeedValues.delete(need.id);

                const needItem = document.querySelector(`.flat-need-item[data-need="${need.id}"]`);
                if (needItem) {
                    needItem.classList.remove('need-selected');
                }
            }
        });

        if (allSelected) {
            // Alle sichtbaren abwählen
            visibleNeeds.forEach(need => {
                if (selectedNeeds.has(need.id)) {
                    selectedNeeds.delete(need.id);
                    originalNeedValues.delete(need.id);

                    const needItem = document.querySelector(`.flat-need-item[data-need="${need.id}"]`);
                    if (needItem) {
                        needItem.classList.remove('need-selected');
                    }
                }
            });
        } else {
            // Alle sichtbaren auswählen
            visibleNeeds.forEach(need => {
                if (!selectedNeeds.has(need.id)) {
                    selectedNeeds.add(need.id);
                    // Speichere den aktuellen Wert als Original
                    const needObj = findNeedById(need.id);
                    if (needObj) {
                        originalNeedValues.set(need.id, needObj.value);
                    }

                    const needItem = document.querySelector(`.flat-need-item[data-need="${need.id}"]`);
                    if (needItem) {
                        needItem.classList.add('need-selected');
                    }
                }
            });
        }

        // Event
        document.dispatchEvent(new CustomEvent('needSelectionChange', {
            bubbles: true,
            detail: { action: allSelected ? 'deselectAll' : 'selectAll', totalSelected: selectedNeeds.size }
        }));

        // Update Auswahl-Counter und Hauptfrage-Visuals
        updateSelectionCounter();
        updateHauptfragenSelectionVisuals();
    }

    /**
     * MULTI-SELECT: Kehrt die Auswahl aller Bedürfnisse um (die durch Filter erlaubt sind)
     * Ausgewählte werden abgewählt und umgekehrt
     */
    function invertNeedSelection() {
        // Hilfsfunktion: Prüft ob ein Need durch Filter (inkl. Suchfilter) sichtbar ist
        function isNeedVisibleByFilters(need) {
            // DimensionKategorieFilter prüfen (primärer Filter)
            if (typeof DimensionKategorieFilter !== 'undefined' && !DimensionKategorieFilter.shouldShowNeed(need.id)) {
                return false;
            }

            // DOM-basierte Filter prüfen - für Items die ein DOM-Element haben
            const needItem = document.querySelector(`.flat-need-item[data-need="${need.id}"]`);
            if (needItem && (needItem.classList.contains('dimension-filter-hidden') || needItem.classList.contains('filter-hidden'))) {
                return false;
            }

            // Prüfe ob es eine Hauptfrage ist und ob sie durch Filter versteckt ist
            const hauptfrageItem = document.querySelector(`.hauptfrage-item[data-hauptfrage-id="${need.id}"]`);
            if (hauptfrageItem && hauptfrageItem.classList.contains('filter-hidden')) {
                return false;
            }

            // FIX: Für Nuancen ohne DOM-Element: Prüfe ob Parent-Hauptfrage durch Filter versteckt ist
            if (!needItem && !hauptfrageItem && typeof HauptfrageAggregation !== 'undefined') {
                const parentHf = HauptfrageAggregation.getHauptfrageForNuance(need.id);
                if (parentHf) {
                    const parentItem = document.querySelector(`.hauptfrage-item[data-hauptfrage-id="${parentHf.id}"]`);
                    if (parentItem && parentItem.classList.contains('filter-hidden')) {
                        return false;
                    }
                }
            }

            return true;
        }

        // Ermittle alle Bedürfnisse die durch Filter erlaubt sind
        const visibleNeeds = flatNeeds.filter(need => isNeedVisibleByFilters(need));

        if (visibleNeeds.length === 0) {
            return;
        }

        // Invertiere die Auswahl für alle sichtbaren
        visibleNeeds.forEach(need => {
            if (selectedNeeds.has(need.id)) {
                // War ausgewählt -> abwählen
                selectedNeeds.delete(need.id);
                originalNeedValues.delete(need.id);

                const needItem = document.querySelector(`.flat-need-item[data-need="${need.id}"]`);
                if (needItem) {
                    needItem.classList.remove('need-selected');
                }
            } else {
                // War nicht ausgewählt -> auswählen
                selectedNeeds.add(need.id);
                const needObj = findNeedById(need.id);
                if (needObj) {
                    originalNeedValues.set(need.id, needObj.value);
                }

                const needItem = document.querySelector(`.flat-need-item[data-need="${need.id}"]`);
                if (needItem) {
                    needItem.classList.add('need-selected');
                }
            }
        });

        // Event
        document.dispatchEvent(new CustomEvent('needSelectionChange', {
            bubbles: true,
            detail: { action: 'invert', totalSelected: selectedNeeds.size }
        }));

        // Update Auswahl-Counter und Hauptfrage-Visuals
        updateSelectionCounter();
        updateHauptfragenSelectionVisuals();
    }

    /**
     * MULTI-SELECT: Markiert/Demarkiert eine Hauptfrage zusammen mit allen ihren GEFILTERTEN Nuancen
     * @param {string} hauptfrageId - Die #B-ID der Hauptfrage (z.B. '#B1')
     */
    function toggleHauptfrageSelection(hauptfrageId) {
        // Hole Hauptfragen-Daten aus dem Cache
        const hauptfragen = typeof HauptfrageAggregation !== 'undefined'
            ? HauptfrageAggregation.getHauptfragen()
            : {};

        const hf = hauptfragen[hauptfrageId];
        if (!hf) {
            console.warn('[AttributeSummaryCard] Hauptfrage nicht gefunden:', hauptfrageId);
            return;
        }

        // Sammle alle IDs: Hauptfrage + alle Nuancen - NUR GEFILTERTE
        const allNuancen = hf.nuancen || [];
        const filteredNuancen = allNuancen.filter(nuanceId => {
            // DimensionKategorieFilter prüfen
            if (typeof DimensionKategorieFilter !== 'undefined' && !DimensionKategorieFilter.shouldShowNeed(nuanceId)) {
                return false;
            }
            return true;
        });

        // Hauptfrage selbst auch prüfen
        const hauptfrageVisible = typeof DimensionKategorieFilter === 'undefined' ||
            DimensionKategorieFilter.shouldShowNeed(hauptfrageId);

        // Alle sichtbaren IDs sammeln
        const allIds = hauptfrageVisible ? [hauptfrageId, ...filteredNuancen] : filteredNuancen;

        if (allIds.length === 0) {
            console.log('[AttributeSummaryCard] Keine sichtbaren Nuancen für', hauptfrageId);
            return;
        }

        // Prüfe ob alle bereits ausgewählt sind
        const allSelected = allIds.every(id => selectedNeeds.has(id));

        if (allSelected) {
            // Alle abwählen
            allIds.forEach(id => {
                if (selectedNeeds.has(id)) {
                    selectedNeeds.delete(id);
                    originalNeedValues.delete(id);

                    const needItem = document.querySelector(`.flat-need-item[data-need="${id}"]`);
                    if (needItem) {
                        needItem.classList.remove('need-selected');
                    }
                }
            });

            // Hauptfrage-Item auch aktualisieren
            const hfItem = document.querySelector(`.hauptfrage-item[data-hauptfrage-id="${hauptfrageId}"]`);
            if (hfItem) {
                hfItem.classList.remove('hauptfrage-selected');
            }
        } else {
            // Alle auswählen
            allIds.forEach(id => {
                if (!selectedNeeds.has(id)) {
                    selectedNeeds.add(id);
                    const needObj = findNeedById(id);
                    if (needObj) {
                        originalNeedValues.set(id, needObj.value);
                    }

                    const needItem = document.querySelector(`.flat-need-item[data-need="${id}"]`);
                    if (needItem) {
                        needItem.classList.add('need-selected');
                    }
                }
            });

            // Hauptfrage-Item auch als ausgewählt markieren
            const hfItem = document.querySelector(`.hauptfrage-item[data-hauptfrage-id="${hauptfrageId}"]`);
            if (hfItem) {
                hfItem.classList.add('hauptfrage-selected');
            }
        }

        // Event
        document.dispatchEvent(new CustomEvent('needSelectionChange', {
            bubbles: true,
            detail: {
                action: allSelected ? 'deselectHauptfrage' : 'selectHauptfrage',
                hauptfrageId,
                nuancenCount: filteredNuancen.length,
                totalSelected: selectedNeeds.size
            }
        }));

        // Update Auswahl-Counter
        updateSelectionCounter();

        console.log(`[AttributeSummaryCard] Hauptfrage ${hauptfrageId} ${allSelected ? 'abgewählt' : 'ausgewählt'} mit ${filteredNuancen.length} gefilterten Nuancen. Total: ${selectedNeeds.size}`);
    }

    /**
     * MULTI-SELECT: Aktualisiert den Auswahl-Counter in der UI
     */
    function updateSelectionCounter() {
        const counter = document.querySelector('.selection-counter');
        if (counter) {
            const count = selectedNeeds.size;
            counter.textContent = count > 0 ? `${count} markiert` : '';
            counter.classList.toggle('has-selection', count > 0);
        }

        // FIX: Auch die Bulk-Buttons aktivieren/deaktivieren
        const bulkCard = document.querySelector('.bulk-increment-card');
        if (bulkCard) {
            const hasSelection = selectedNeeds.size > 0;
            bulkCard.classList.toggle('disabled', !hasSelection);

            // Buttons innerhalb aktivieren/deaktivieren
            bulkCard.querySelectorAll('button').forEach(btn => {
                btn.disabled = !hasSelection;
            });
        }
    }

    /**
     * MULTI-SELECT: Aktualisiert die visuellen Selektions-Klassen aller Hauptfragen
     * Basierend auf dem aktuellen Zustand von selectedNeeds
     */
    function updateHauptfragenSelectionVisuals() {
        if (typeof HauptfrageAggregation === 'undefined') return;

        const hauptfragen = HauptfrageAggregation.getHauptfragen();
        if (!hauptfragen) return;

        document.querySelectorAll('.hauptfrage-item[data-hauptfrage-id]').forEach(hfItem => {
            const hfId = hfItem.getAttribute('data-hauptfrage-id');
            const hf = hauptfragen[hfId];
            if (!hf) return;

            // Prüfe Auswahl-Status: Alle Nuancen + Hauptfrage ausgewählt?
            const allIds = [hfId, ...(hf.nuancen || [])];
            const allSelected = allIds.every(id => selectedNeeds.has(id));
            const someSelected = allIds.some(id => selectedNeeds.has(id));

            // Aktualisiere Klassen
            hfItem.classList.remove('hauptfrage-selected', 'hauptfrage-partial-selected');
            if (allSelected) {
                hfItem.classList.add('hauptfrage-selected');
            } else if (someSelected) {
                hfItem.classList.add('hauptfrage-partial-selected');
            }
        });
    }

    /**
     * MULTI-SELECT: Setzt alle ausgewählten Bedürfnisse auf ihre Original-Profil-Werte zurück
     * Lädt die Werte aus GfkBeduerfnisse.archetypProfile (SSOT Katalog)
     */
    function resetSelectedNeedsValues() {
        // Ermittle aktuelle Person aus Kontext
        let currentPerson = 'ich';
        if (typeof window !== 'undefined' && window.currentProfileReviewContext?.person) {
            currentPerson = window.currentProfileReviewContext.person;
        }

        // Ermittle aktuellen Archetyp (KEY, nicht Label!)
        let currentArchetyp = currentFlatArchetyp;
        if (!currentArchetyp && typeof window !== 'undefined' && window.currentProfileReviewContext?.archetypeKey) {
            currentArchetyp = window.currentProfileReviewContext.archetypeKey;
        }

        // SSOT: BaseArchetypProfile (Archetyp-Profil-Dateien)
        if (!currentArchetyp || typeof BaseArchetypProfile === 'undefined' ||
            !BaseArchetypProfile[currentArchetyp]) {
            console.error('[AttributeSummaryCard] Archetyp nicht in BaseArchetypProfile gefunden:', currentArchetyp);
            alert('Zurücksetzen nicht möglich: Archetyp-Profil nicht gefunden.');
            return;
        }

        const umfrageWerte = BaseArchetypProfile[currentArchetyp].umfrageWerte;
        if (!umfrageWerte || Object.keys(umfrageWerte).length === 0) {
            console.error('[AttributeSummaryCard] Keine Umfragewerte in BaseArchetypProfile für', currentArchetyp);
            alert('Zurücksetzen nicht möglich: Keine Umfragewerte für diesen Archetyp.');
            return;
        }

        console.log(`[AttributeSummaryCard] Reset mit Umfragewerten aus BaseArchetypProfile für ${currentPerson}/${currentArchetyp}`);

        // Hole Hauptfragen-Daten für Nuancen-Zugriff
        const hauptfragen = typeof HauptfrageAggregation !== 'undefined'
            ? HauptfrageAggregation.getHauptfragen()
            : [];

        // Sammle alle zu resettenden IDs (inkl. Nuancen der markierten Hauptfragen)
        // FIX: Verwende Set um Duplikate zu vermeiden
        const needsToResetSet = new Set();
        if (selectedNeeds.size > 0) {
            selectedNeeds.forEach(needId => {
                needsToResetSet.add(needId);
                // Finde zugehörige Hauptfrage für Nuancen (hauptfragen ist ein Objekt, kein Array)
                const hauptfrage = hauptfragen[needId];
                if (hauptfrage?.nuancen) {
                    hauptfrage.nuancen.forEach(nuanceId => needsToResetSet.add(nuanceId));
                }
            });
        } else {
            Object.keys(umfrageWerte).forEach(id => needsToResetSet.add(id));
        }
        const needsToReset = Array.from(needsToResetSet);

        console.log(`[AttributeSummaryCard] ${selectedNeeds.size > 0 ? 'Ausgewählte' : 'Alle'} Bedürfnisse werden zurückgesetzt:`, needsToReset.length);

        let resetCount = 0;
        let skippedLocked = 0;
        let skippedNoValue = 0;
        const actuallyResetNeeds = []; // FIX: Nur tatsächlich zurückgesetzte Needs tracken
        needsToReset.forEach(needId => {
            // FIX v1.8.700: Prüfe Lock-Status direkt aus TiageState (SSOT)
            // statt aus flatNeeds, da flatNeeds möglicherweise nicht alle Needs enthält
            const isLocked = typeof TiageState !== 'undefined' && TiageState.isNeedLocked
                ? TiageState.isNeedLocked(currentPerson, needId)
                : false;

            // WICHTIG: Gesperrte Bedürfnisse NICHT zurücksetzen
            if (isLocked) {
                skippedLocked++;
                return;
            }

            const originalValue = umfrageWerte[needId];
            if (originalValue === undefined) {
                skippedNoValue++;
                return;
            }

            // FIX v1.8.700: upsertNeed schreibt direkt zu TiageState
            // und braucht kein needObj - Reset funktioniert auch wenn
            // das Need nicht in flatNeeds enthalten ist
            upsertNeed(needId, { value: originalValue });

            // Update UI - nur wenn das Need in flatNeeds existiert
            const needObj = findNeedById(needId);
            if (needObj) {
                const needItem = document.querySelector(`.flat-need-item[data-need="${needId}"]`);
                if (needItem) {
                    const slider = needItem.querySelector('.need-slider');
                    const input = needItem.querySelector('.flat-need-input');
                    if (slider) slider.value = originalValue;
                    if (input) input.value = originalValue;

                    // Slider-Track-Hintergrund aktualisieren
                    const dimColor = getDimensionColor(needId);
                    if (dimColor && slider) {
                        slider.style.background = getSliderFillGradient(dimColor, originalValue, slider);
                    }

                    // Changed-Indicator (*) aktualisieren
                    updateChangedIndicator(needItem, needId, originalValue);
                }
            }

            // Aktualisiere auch den gespeicherten Original-Wert
            originalNeedValues.set(needId, originalValue);
            actuallyResetNeeds.push(needId); // FIX: Tracke tatsächlich zurückgesetzte Needs
            resetCount++;
        });

        console.log(`[AttributeSummaryCard] Reset: ${resetCount} zurückgesetzt, ${skippedLocked} gesperrt übersprungen, ${skippedNoValue} ohne Originalwert`);

        // ═══════════════════════════════════════════════════════════════════════════
        // FIX v1.8.711: Schreibe ALLE 226 Needs explizit zu TiageState
        // Damit TiageState.flatNeeds nach Reset vollständig ist und keine
        // undefined-Werte beim nächsten Laden auftreten
        // ═══════════════════════════════════════════════════════════════════════════
        if (selectedNeeds.size === 0 && typeof TiageState !== 'undefined' && TiageState.setFlatNeeds) {
            // Vollständiger Reset: Schreibe ALLE Werte aus BaseArchetypProfile
            const completeNeeds = {};
            const lockedNeeds = TiageState.getLockedNeeds ? TiageState.getLockedNeeds(currentPerson) || {} : {};

            // Alle Needs aus BaseArchetypProfile übernehmen
            Object.keys(umfrageWerte).forEach(needId => {
                // Gesperrte Needs behalten ihren Wert
                if (lockedNeeds.hasOwnProperty(needId)) {
                    completeNeeds[needId] = lockedNeeds[needId];
                } else {
                    completeNeeds[needId] = umfrageWerte[needId];
                }
            });

            // Schreibe alle 226 Needs auf einmal zu TiageState
            TiageState.setFlatNeeds(currentPerson, completeNeeds);
            console.log(`[AttributeSummaryCard] VOLLSTÄNDIGER Reset: ${Object.keys(completeNeeds).length} Needs zu TiageState geschrieben für ${currentPerson}`);
        }

        // Trigger event for resonance recalculation
        if (resetCount > 0) {
            document.dispatchEvent(new CustomEvent('flatNeedChange', { bubbles: true }));

            // Update Hauptfrage-Aggregationen für alle betroffenen Hauptfragen
            needsToReset.forEach(needId => {
                updateParentHauptfrageValue(needId);
            });

            // FIX v1.8.700: Baseline aktualisieren damit "geändert"-Zähler korrekt ist
            // Nach Reset auf Archetyp-Werte sollten diese Needs als "nicht geändert" gelten
            // WICHTIG: Nur für tatsächlich zurückgesetzte Needs, NICHT für gesperrte!
            updateBaselineAfterReset(currentPerson, currentArchetyp, actuallyResetNeeds);
        }

        // FIX: Reset soll NUR Werte zurücksetzen - NICHT Filter oder Markierung ändern
        // Aktualisiere Subtitle (geänderte Anzahl)
        updateLockedCountDisplay();

        // FIX v1.8.701: Explizit speichern nach Reset (nicht nur debounced)
        // Damit beim Wechsel ICH/PARTNER die Werte korrekt geladen werden
        if (typeof TiageState !== 'undefined' && TiageState.saveToStorage) {
            TiageState.saveToStorage();
            console.log('[AttributeSummaryCard] Reset gespeichert für', currentPerson);
        }

        // FIX v1.8.700: Cache invalidieren damit flatNeeds beim Re-Render
        // frisch aus TiageState geladen wird (enthält jetzt alle Reset-Werte)
        if (resetCount > 0) {
            invalidateFlatNeedsCache();
            reRenderFlatNeeds();
        }
    }

    /**
     * Setzt alle Filter zurück (Kategorien-Filter + "Nur Geänderte" Filter)
     * OHNE Werte zu ändern
     */
    function resetFilters() {
        console.log('[AttributeSummaryCard] Filter zurücksetzen');

        // Kategorien-Filter zurücksetzen (silent=true um double reRender zu vermeiden)
        // reset() würde sonst via Event auch reRenderFlatNeeds() triggern
        if (typeof DimensionKategorieFilter !== 'undefined') {
            DimensionKategorieFilter.reset(true);

            // FIX: Auch den gespeicherten State für die aktuelle Person löschen
            // damit Filter nicht bei Tab-Wechsel wiederhergestellt werden
            const currentPerson = DimensionKategorieFilter.getCurrentPerson ?
                DimensionKategorieFilter.getCurrentPerson() : 'ich';
            if (DimensionKategorieFilter.saveStateForPerson) {
                DimensionKategorieFilter.saveStateForPerson(currentPerson);
            }
        }

        // "Nur Geänderte" Filter zurücksetzen
        showOnlyChangedNeeds = false;

        // Liste neu rendern (nur einmal, da reset() jetzt silent ist)
        reRenderFlatNeeds();
    }

    /**
     * MULTI-SELECT: Aktualisiert alle ausgewählten Bedürfnisse auf einen neuen Wert
     * @param {number} value - Der neue Wert (0-100)
     */
    function updateSelectedNeedsValue(value) {
        const numValue = parseInt(value, 10);
        if (isNaN(numValue) || numValue < 0 || numValue > 100) return;

        // Sync control panel slider and input
        const panel = document.querySelector('#multi-select-control-panel');
        if (panel) {
            const controlSlider = panel.querySelector('.multi-select-slider');
            const controlInput = panel.querySelector('.multi-select-input');
            if (controlSlider) controlSlider.value = numValue;
            if (controlInput) controlInput.value = numValue;
        }

        selectedNeeds.forEach(needId => {
            const needObj = findNeedById(needId);
            if (needObj?.locked) return; // Skip locked needs

            // Update value
            upsertNeed(needId, { value: numValue });

            // Update UI
            const needItem = document.querySelector(`.flat-need-item[data-need="${needId}"]`);
            if (needItem) {
                const slider = needItem.querySelector('.need-slider');
                const input = needItem.querySelector('.flat-need-input');
                if (slider) {
                    slider.value = numValue;
                    // Update slider background with dimension color
                    const dimColor = getDimensionColor(needId);
                    if (dimColor) {
                        slider.style.background = getSliderFillGradient(dimColor, numValue, slider);
                    }
                }
                if (input) input.value = numValue;

                // Changed-Indicator (*) aktualisieren
                updateChangedIndicator(needItem, needId, numValue);
            }

            // Event für Änderungstracking
            document.dispatchEvent(new CustomEvent('flatNeedChange', {
                bubbles: true,
                detail: { needId, value: numValue }
            }));
        });
    }

    /**
     * BULK-INCREMENT: Erhöht alle markierten Bedürfnisse um einen Schritt
     * Werte die 100 erreichen bleiben dort bis alle anderen auch 100 sind
     * @param {number} step - Schrittgröße (Standard: 5)
     */
    function incrementSelectedNeeds(step = 5) {
        if (selectedNeeds.size === 0) return;

        selectedNeeds.forEach(needId => {
            const needObj = findNeedById(needId);
            if (needObj?.locked) return; // Skip locked needs

            const currentValue = needObj?.value ?? 50;
            // Wert bleibt bei 100 wenn bereits erreicht
            if (currentValue >= 100) return;

            const newValue = Math.min(100, currentValue + step);

            // Update value
            upsertNeed(needId, { value: newValue });

            // Update UI
            const needItem = document.querySelector(`.flat-need-item[data-need="${needId}"]`);
            if (needItem) {
                const slider = needItem.querySelector('.need-slider');
                const input = needItem.querySelector('.flat-need-input');
                if (slider) {
                    slider.value = newValue;
                    const dimColor = getDimensionColor(needId);
                    if (dimColor) {
                        slider.style.background = getSliderFillGradient(dimColor, newValue, slider);
                    }
                }
                if (input) input.value = newValue;
                updateChangedIndicator(needItem, needId, newValue);
            }

            // Update Hauptfrage-Aggregation
            updateParentHauptfrageValue(needId);

            // Event für Änderungstracking
            document.dispatchEvent(new CustomEvent('flatNeedChange', {
                bubbles: true,
                detail: { needId, value: newValue, bulk: true }
            }));
        });

        // Aktualisiere Subtitle (geänderte Anzahl)
        updateLockedCountDisplay();
        console.log(`[AttributeSummaryCard] ${selectedNeeds.size} markierte Bedürfnisse um +${step} erhöht`);
    }

    /**
     * BULK-DECREMENT: Verringert alle markierten Bedürfnisse um einen Schritt
     * Werte die 0 erreichen bleiben dort bis alle anderen auch 0 sind
     * @param {number} step - Schrittgröße (Standard: 5)
     */
    function decrementSelectedNeeds(step = 5) {
        if (selectedNeeds.size === 0) return;

        selectedNeeds.forEach(needId => {
            const needObj = findNeedById(needId);
            if (needObj?.locked) return; // Skip locked needs

            const currentValue = needObj?.value ?? 50;
            // Wert bleibt bei 0 wenn bereits erreicht
            if (currentValue <= 0) return;

            const newValue = Math.max(0, currentValue - step);

            // Update value
            upsertNeed(needId, { value: newValue });

            // Update UI
            const needItem = document.querySelector(`.flat-need-item[data-need="${needId}"]`);
            if (needItem) {
                const slider = needItem.querySelector('.need-slider');
                const input = needItem.querySelector('.flat-need-input');
                if (slider) {
                    slider.value = newValue;
                    const dimColor = getDimensionColor(needId);
                    if (dimColor) {
                        slider.style.background = getSliderFillGradient(dimColor, newValue, slider);
                    }
                }
                if (input) input.value = newValue;
                updateChangedIndicator(needItem, needId, newValue);
            }

            // Update Hauptfrage-Aggregation
            updateParentHauptfrageValue(needId);

            // Event für Änderungstracking
            document.dispatchEvent(new CustomEvent('flatNeedChange', {
                bubbles: true,
                detail: { needId, value: newValue, bulk: true }
            }));
        });

        // Aktualisiere Subtitle (geänderte Anzahl)
        updateLockedCountDisplay();
        console.log(`[AttributeSummaryCard] ${selectedNeeds.size} markierte Bedürfnisse um -${step} verringert`);
    }

    /**
     * MULTI-SELECT: Aktualisiert die Sichtbarkeit und den Status des Control Panels
     */
    function updateMultiSelectControlPanel() {
        const panel = document.querySelector('#multi-select-control-panel');
        if (!panel) return;

        const count = selectedNeeds.size;
        // Panel bleibt immer sichtbar
        panel.style.display = 'flex';
        const countLabel = panel.querySelector('.multi-select-count');
        if (countLabel) {
            countLabel.textContent = `${count} ausgewählt`;
        }
    }

    /**
     * MULTI-SELECT: Sperrt/entsperrt alle ausgewählten Bedürfnisse inkl. deren Nuancen
     * @param {boolean} lockState - true = sperren, false = entsperren
     */
    function lockSelectedNeeds(lockState) {
        // Ermittle aktuelle Person aus Kontext
        let currentPerson = 'ich';
        if (window.currentProfileReviewContext && window.currentProfileReviewContext.person) {
            currentPerson = window.currentProfileReviewContext.person;
        }

        // Hole Hauptfragen-Daten für Nuancen-Zugriff
        const hauptfragen = typeof HauptfrageAggregation !== 'undefined'
            ? HauptfrageAggregation.getHauptfragen()
            : [];

        let lockedCount = 0;
        const processedNeeds = new Set(); // FIX: Verhindere Doppelzählung

        // Hilfsfunktion zum Sperren/Entsperren eines einzelnen Needs
        function lockSingleNeed(needId) {
            // FIX: Überspringe bereits verarbeitete Needs
            if (processedNeeds.has(needId)) {
                return;
            }
            processedNeeds.add(needId);
            const needObj = findNeedById(needId);
            if (needObj) {
                needObj.locked = lockState;
            } else {
                upsertNeed(needId, { locked: lockState });
            }

            // Update UI
            const needItem = document.querySelector(`.flat-need-item[data-need="${needId}"]`);
            if (needItem) {
                needItem.classList.toggle('need-locked', lockState);
                const slider = needItem.querySelector('.need-slider');
                const input = needItem.querySelector('.flat-need-input');
                const lockIcon = needItem.querySelector('.flat-need-lock');
                if (slider) slider.disabled = lockState;
                if (input) input.readOnly = lockState;
                if (lockIcon) lockIcon.textContent = lockState ? '🔒' : '🔓';
            }

            // Speichere Lock-Status in TiageState (SSOT)
            if (typeof TiageState !== 'undefined') {
                if (lockState) {
                    const currentValue = needObj ? needObj.value : 50;
                    TiageState.lockNeed(currentPerson, needId, currentValue);
                } else {
                    TiageState.unlockNeed(currentPerson, needId);
                }
                lockedCount++;
            }

            // Event
            document.dispatchEvent(new CustomEvent('flatNeedLockChange', {
                bubbles: true,
                detail: { needId, locked: lockState }
            }));
        }

        selectedNeeds.forEach(needId => {
            // Sperre/Entsperre das Hauptbedürfnis
            lockSingleNeed(needId);

            // Finde zugehörige Hauptfrage für Nuancen (hauptfragen ist ein Objekt, kein Array)
            const hauptfrage = hauptfragen[needId];
            const nuancen = hauptfrage?.nuancen || [];

            // Sperre/Entsperre auch alle Nuancen
            nuancen.forEach(nuanceId => {
                lockSingleNeed(nuanceId);
            });
        });

        // Einmal speichern nach allen Änderungen
        if (typeof TiageState !== 'undefined' && lockedCount > 0) {
            TiageState.saveToStorage();
            console.log('[lockSelectedNeeds]', lockState ? 'Gesperrt' : 'Entsperrt', lockedCount, 'Bedürfnisse für', currentPerson);
            showLockToast(lockState ? `${lockedCount} Werte gesperrt` : `${lockedCount} Werte entsperrt`);
            // Aktualisiere die "davon gesperrt: X" Anzeige im Subtitle
            updateLockedCountDisplay();
            // Button-State aktualisieren
            updateSelectedLockButtonState();
            // Re-render für konsistente UI-Darstellung (Hauptfrage Lock-Icons, Nuancen-Status)
            reRenderFlatNeeds();
        }
    }

    /**
     * TOGGLE: Sperrt alle markierten wenn nicht alle gesperrt, entsperrt alle wenn alle gesperrt
     */
    function toggleLockSelectedNeeds() {
        if (selectedNeeds.size === 0) return;

        // Prüfe ob alle markierten bereits gesperrt sind
        let allLocked = true;
        let someLockedCount = 0;
        selectedNeeds.forEach(needId => {
            const needObj = findNeedById(needId);
            if (needObj && needObj.locked) {
                someLockedCount++;
            } else {
                allLocked = false;
            }
        });

        // Toggle: Wenn alle gesperrt → entsperren, sonst → sperren
        const newLockState = !allLocked;
        lockSelectedNeeds(newLockState);
    }

    /**
     * Aktualisiert den Lock-Button für markierte Needs (Icon und Label)
     */
    function updateSelectedLockButtonState() {
        const btn = document.querySelector('.bulk-lock-btn');
        if (!btn) return;

        const icon = btn.querySelector('.bulk-btn-icon');
        const label = btn.querySelector('.bulk-btn-label');

        // Label bleibt immer gleich
        if (label) label.textContent = 'Ent-/Sperren';

        if (selectedNeeds.size === 0) {
            // Nichts markiert
            if (icon) icon.textContent = '🔒';
            btn.title = 'Alle markierten Werte sperren/entsperren';
            return;
        }

        // Prüfe Lock-Status der markierten
        let lockedCount = 0;
        selectedNeeds.forEach(needId => {
            const needObj = findNeedById(needId);
            if (needObj && needObj.locked) {
                lockedCount++;
            }
        });

        const allLocked = lockedCount === selectedNeeds.size;
        const someLocked = lockedCount > 0 && lockedCount < selectedNeeds.size;

        if (allLocked) {
            if (icon) icon.textContent = '🔓';
            btn.title = 'Alle markierten Werte entsperren';
        } else if (someLocked) {
            if (icon) icon.textContent = '🔐';
            btn.title = `${selectedNeeds.size - lockedCount} von ${selectedNeeds.size} noch nicht gesperrt`;
        } else {
            if (icon) icon.textContent = '🔒';
            btn.title = 'Alle markierten Werte sperren';
        }
    }

    /**
     * Hilfsfunktion: Ermittelt alle gefilterten/sichtbaren Bedürfnisse
     */
    function getVisibleFilteredNeeds() {
        function isNeedVisibleByFilters(need) {
            // DimensionKategorieFilter prüfen (primärer Filter)
            if (typeof DimensionKategorieFilter !== 'undefined' && !DimensionKategorieFilter.shouldShowNeed(need.id)) {
                return false;
            }

            // DOM-basierte Filter prüfen
            const needItem = document.querySelector(`.flat-need-item[data-need="${need.id}"]`);
            if (needItem && (needItem.classList.contains('dimension-filter-hidden') || needItem.classList.contains('filter-hidden'))) {
                return false;
            }

            // Hauptfrage-Filter prüfen
            const hauptfrageItem = document.querySelector(`.hauptfrage-item[data-hauptfrage-id="${need.id}"]`);
            if (hauptfrageItem && hauptfrageItem.classList.contains('filter-hidden')) {
                return false;
            }

            // Für Nuancen: Prüfe Parent-Hauptfrage
            if (!needItem && !hauptfrageItem && typeof HauptfrageAggregation !== 'undefined') {
                const parentHf = HauptfrageAggregation.getHauptfrageForNuance(need.id);
                if (parentHf) {
                    const parentItem = document.querySelector(`.hauptfrage-item[data-hauptfrage-id="${parentHf.id}"]`);
                    if (parentItem && parentItem.classList.contains('filter-hidden')) {
                        return false;
                    }
                }
            }

            return true;
        }

        return flatNeeds.filter(need => isNeedVisibleByFilters(need));
    }

    /**
     * Ermittelt den Lock-Status aller gefilterten Needs inkl. Nuancen
     * @returns {{ allLocked: boolean, someLocked: boolean, lockedCount: number, totalCount: number }}
     */
    function getFilteredNeedsLockStatus() {
        const visibleNeeds = getVisibleFilteredNeeds();
        if (visibleNeeds.length === 0) {
            return { allLocked: false, someLocked: false, lockedCount: 0, totalCount: 0 };
        }

        // Hole Hauptfragen-Daten für Nuancen-Zugriff
        const hauptfragen = typeof HauptfrageAggregation !== 'undefined'
            ? HauptfrageAggregation.getHauptfragen()
            : [];

        let lockedCount = 0;
        let totalCount = 0;

        visibleNeeds.forEach(need => {
            // Hauptfrage zählen
            const needObj = findNeedById(need.id);
            totalCount++;
            if (needObj && needObj.locked) {
                lockedCount++;
            }

            // Nuancen zählen (hauptfragen ist ein Objekt, kein Array)
            const hauptfrage = hauptfragen[need.id];
            const nuancen = hauptfrage?.nuancen || [];
            nuancen.forEach(nuanceId => {
                totalCount++;
                const nuanceObj = findNeedById(nuanceId);
                if (nuanceObj && nuanceObj.locked) {
                    lockedCount++;
                }
            });
        });

        return {
            allLocked: totalCount > 0 && lockedCount === totalCount,
            someLocked: lockedCount > 0 && lockedCount < totalCount,
            lockedCount,
            totalCount
        };
    }

    /**
     * Prüft ob alle gefilterten Needs gesperrt sind
     */
    function areAllFilteredNeedsLocked() {
        return getFilteredNeedsLockStatus().allLocked;
    }

    /**
     * Hilfsfunktion: Sperrt/Entsperrt ein einzelnes Need mit UI-Update
     */
    function setNeedLockState(needId, lockState, currentPerson) {
        const needObj = findNeedById(needId);

        if (needObj) {
            needObj.locked = lockState;
        } else {
            upsertNeed(needId, { locked: lockState });
        }

        // Update UI
        const needItem = document.querySelector(`.flat-need-item[data-need="${needId}"]`);
        if (needItem) {
            needItem.classList.toggle('need-locked', lockState);
            const slider = needItem.querySelector('.need-slider');
            const input = needItem.querySelector('.flat-need-input');
            const lockIcon = needItem.querySelector('.flat-need-lock');
            if (slider) slider.disabled = lockState;
            if (input) input.readOnly = lockState;
            if (lockIcon) lockIcon.textContent = lockState ? '🔒' : '🔓';
        }

        // Speichere Lock-Status in TiageState
        if (typeof TiageState !== 'undefined') {
            if (lockState) {
                const currentValue = needObj ? needObj.value : 50;
                TiageState.lockNeed(currentPerson, needId, currentValue);
            } else {
                TiageState.unlockNeed(currentPerson, needId);
            }
        }

        // Event
        document.dispatchEvent(new CustomEvent('flatNeedLockChange', {
            bubbles: true,
            detail: { needId, locked: lockState }
        }));

        return 1; // 1 geändertes Item
    }

    /**
     * BULK-LOCK TOGGLE: Sperrt/Entsperrt alle gefilterten (sichtbaren) Bedürfnisse inkl. Nuancen
     * - Wenn ALLE gesperrt → alle entsperren
     * - Wenn TEILWEISE oder KEINE gesperrt → alle noch nicht gesperrten sperren
     */
    function toggleLockAllFilteredNeeds() {
        // Ermittle aktuelle Person aus Kontext
        let currentPerson = 'ich';
        if (window.currentProfileReviewContext && window.currentProfileReviewContext.person) {
            currentPerson = window.currentProfileReviewContext.person;
        }

        // Ermittle alle sichtbaren Bedürfnisse (Hauptfragen)
        const visibleNeeds = getVisibleFilteredNeeds();

        if (visibleNeeds.length === 0) {
            showLockToast('Keine gefilterten Bedürfnisse vorhanden');
            return;
        }

        // Status ermitteln (inkl. Nuancen)
        const status = getFilteredNeedsLockStatus();

        // Logik:
        // - Alle gesperrt → alle entsperren
        // - Nicht alle gesperrt (teilweise oder keine) → alle noch nicht gesperrten sperren
        const shouldUnlock = status.allLocked;

        let changedCount = 0;

        // Hole Hauptfragen-Daten für Nuancen-Zugriff
        const hauptfragen = typeof HauptfrageAggregation !== 'undefined'
            ? HauptfrageAggregation.getHauptfragen()
            : [];

        visibleNeeds.forEach(need => {
            const needId = need.id;
            const needObj = findNeedById(needId);
            const isCurrentlyLocked = needObj && needObj.locked;

            // Finde zugehörige Hauptfrage für Nuancen (hauptfragen ist ein Objekt, kein Array)
            const hauptfrage = hauptfragen[needId];
            const nuancen = hauptfrage?.nuancen || [];

            if (shouldUnlock) {
                // Entsperren: Hauptfrage und alle Nuancen
                if (isCurrentlyLocked) {
                    changedCount += setNeedLockState(needId, false, currentPerson);
                }
                // Auch alle Nuancen entsperren
                nuancen.forEach(nuanceId => {
                    const nuanceObj = findNeedById(nuanceId);
                    if (nuanceObj && nuanceObj.locked) {
                        changedCount += setNeedLockState(nuanceId, false, currentPerson);
                    }
                });
            } else {
                // Sperren: Hauptfrage und alle Nuancen (nur nicht-gesperrte)
                if (!isCurrentlyLocked) {
                    changedCount += setNeedLockState(needId, true, currentPerson);
                }
                // Auch alle Nuancen sperren
                nuancen.forEach(nuanceId => {
                    const nuanceObj = findNeedById(nuanceId);
                    if (!nuanceObj || !nuanceObj.locked) {
                        changedCount += setNeedLockState(nuanceId, true, currentPerson);
                    }
                });
            }
        });

        // Speichern und UI aktualisieren
        if (typeof TiageState !== 'undefined' && changedCount > 0) {
            TiageState.saveToStorage();
            console.log('[toggleLockAllFilteredNeeds]', shouldUnlock ? 'Entsperrt' : 'Gesperrt', changedCount, 'gefilterte Bedürfnisse für', currentPerson);
            showLockToast(shouldUnlock ? `${changedCount} gefilterte Werte entsperrt` : `${changedCount} gefilterte Werte gesperrt`);
            updateLockedCountDisplay();
            // Update Button-Darstellung
            updateFilteredLockButtonState();
        }
    }

    /**
     * Aktualisiert den Lock-Button für gefilterte Needs (Icon und Label)
     * - Alle gesperrt: 🔓 "Entsperren"
     * - Teilweise gesperrt: 🔒 "Sperren*" (mit * Indikator)
     * - Keine gesperrt: 🔒 "Sperren"
     * - Kein Filter aktiv: Button disabled
     */
    function updateFilteredLockButtonState() {
        const btn = document.querySelector('.bulk-lock-filtered-btn');
        if (!btn) return;

        const status = getFilteredNeedsLockStatus();
        const visibleCount = status.totalCount;

        // Prüfe ob ein Filter aktiv ist (sichtbare < gesamt)
        const totalCount = flatNeeds.length;
        const filterActive = visibleCount < totalCount;

        // Button nur aktivieren wenn Filter aktiv ist
        btn.disabled = !filterActive;
        btn.classList.toggle('disabled', !filterActive);

        // Icon und Label aktualisieren
        const icon = btn.querySelector('.bulk-btn-icon');
        const label = btn.querySelector('.bulk-btn-label');

        // Label bleibt immer gleich
        if (label) label.textContent = 'Ent-/Sperren';

        if (!filterActive) {
            // Kein Filter aktiv
            if (icon) icon.textContent = '🔒';
            btn.title = 'Erst Filter setzen um gefilterte Bedürfnisse zu sperren';
        } else if (status.allLocked) {
            // Alle gesperrt → Entsperren Icon
            if (icon) icon.textContent = '🔓';
            btn.title = 'Alle gefilterten Bedürfnisse entsperren';
        } else if (status.someLocked) {
            // Teilweise gesperrt
            if (icon) icon.textContent = '🔐';
            btn.title = `${status.totalCount - status.lockedCount} von ${status.totalCount} noch nicht gesperrt`;
        } else {
            // Keine gesperrt → Sperren Icon
            if (icon) icon.textContent = '🔒';
            btn.title = 'Alle gefilterten Bedürfnisse sperren';
        }
    }

    // Legacy-Funktion für Abwärtskompatibilität
    function lockAllFilteredNeeds() {
        toggleLockAllFilteredNeeds();
    }

    /**
     * Aktueller Archetyp für flache Darstellung
     */
    let currentFlatArchetyp = null;

    /**
     * Aktuelle Person für flache Darstellung (ich/partner)
     * FIX: Track person to reset flatNeeds when switching
     */
    let currentFlatPerson = null;

    /**
     * Aktuelles Archetyp-Label für flache Darstellung
     */
    let currentFlatArchetypLabel = null;

    /**
     * Aktuelle Sortierung für flache Darstellung
     * 'changed' (Standard), 'value', 'name', 'id', 'status'
     */
    let currentFlatSortMode = 'changed';

    /**
     * Per-mode Sortierrichtungen: Jeder Sort-Mode hat seine eigene Richtung
     * true = absteigend, false = aufsteigend
     */
    const sortDirections = {
        'value': true,
        'name': true,
        'id': true,
        'status': true,
        'changed': true
    };

    /**
     * Multi-Sort Stack: Array von Sort-Modi für additive Sortierung
     * z.B. ['changed', 'status'] = erst nach Geändert, dann nach Status
     */
    let sortStack = ['changed'];

    /**
     * Additiver Sort-Modus: Wenn true, werden Klicks zur Sortierung hinzugefügt
     * Wenn false, ersetzt jeder Klick die bestehende Sortierung
     */
    let additiveSortMode = false;

    /**
     * Person-spezifische Persistenz für Sort-Mode UND "Geänderte"-Filter
     * (FIX: Sortierung und Filter pro ICH/PARTNER speichern)
     */
    const savedStatePerPerson = {
        ich: { sortMode: 'changed', sortStack: ['changed'], sortDirections: {...sortDirections}, showOnlyChanged: false },
        partner: { sortMode: 'changed', sortStack: ['changed'], sortDirections: {...sortDirections}, showOnlyChanged: false }
    };
    let currentSortPerson = 'ich';  // Aktuelle Person für Sort-Kontext

    /**
     * DEPRECATED: Perspektiven-Filter wurden durch DimensionKategorieFilter ersetzt
     * Kept for backward compatibility
     */
    let activePerspektiveFilters = new Set();

    /**
     * Hauptfragen-Ansicht: Zeigt nur Hauptfragen mit aggregierten Werten
     * Nuancen werden als aufklappbare Details darunter angezeigt
     * Default: true (vereinfachte Ansicht)
     */
    let showOnlyHauptfragen = true;

    /**
     * Set der aufgeklappten Hauptfragen (speichert IDs der expandierten Hauptfragen)
     */
    let expandedHauptfragen = new Set();

    /**
     * Filter: Zeigt nur geänderte Bedürfnisse an
     * (Bedürfnisse deren Wert vom Archetyp-Standard abweicht)
     */
    let showOnlyChangedNeeds = false;

    /**
     * Baseline FlatNeeds: Speichert die Anfangswerte beim ersten Laden
     * Pro Person ('ich', 'partner') - wird verwendet für isValueChanged-Vergleich
     * Wird nur einmal pro Person/Archetyp gesetzt und nicht mehr geändert
     */
    const baselineFlatNeeds = {
        ich: null,
        partner: null
    };
    // Speichert den Archetyp für den das Baseline gesetzt wurde
    const baselineArchetyp = {
        ich: null,
        partner: null
    };

    /**
     * GFK-Kategorien mit Labels und Icons
     */
    const GFK_KATEGORIEN = {
        existenz: { label: 'Existenz', icon: '🫁' },
        sicherheit: { label: 'Sicherheit', icon: '🛡️' },
        zuneigung: { label: 'Zuneigung', icon: '💕' },
        verstaendnis: { label: 'Verständnis', icon: '🤝' },
        freiheit: { label: 'Freiheit', icon: '🦅' },
        teilnahme: { label: 'Teilnahme', icon: '👥' },
        musse: { label: 'Muße', icon: '🎨' },
        identitaet: { label: 'Identität', icon: '🪞' },
        erschaffen: { label: 'Erschaffen', icon: '✨' },
        verbundenheit: { label: 'Verbundenheit', icon: '🌊' },
        dynamik: { label: 'Dynamik', icon: '⚡' },
        lebensplanung: { label: 'Lebensplanung', icon: '🏠' },
        finanzen_karriere: { label: 'Finanzen & Karriere', icon: '💼' },
        kommunikation_stil: { label: 'Kommunikation', icon: '💬' },
        soziales_leben: { label: 'Soziales Leben', icon: '🎭' },
        intimitaet_romantik: { label: 'Intimität & Romantik', icon: '💋' },
        werte_haltung: { label: 'Werte & Haltungen', icon: '⚖️' },
        praktisches_leben: { label: 'Praktisches Leben', icon: '🧹' }
    };

    /**
     * Extrahiert die #B-Nummer aus einem Label für Sortierung
     * @param {string} label - Label wie "#B21 Liebe"
     * @returns {number} Die Nummer (z.B. 21) oder 9999 wenn nicht gefunden
     */
    function extractBNumber(label) {
        const match = label.match(/#B(\d+)/);
        return match ? parseInt(match[1], 10) : 9999;
    }

    /**
     * Holt die Kategorie-Nummer für ein Bedürfnis
     * Unterstützt sowohl #B-IDs als auch String-Keys
     *
     * @param {string} needId - #B-ID (z.B. '#B21') oder String-Key (z.B. 'liebe')
     * @returns {number} Kategorie-Nummer (1-18) oder 99 wenn nicht gefunden
     */
    function getCategoryNumber(needId) {
        if (typeof BeduerfnisIds === 'undefined' || !BeduerfnisIds.beduerfnisse) {
            return 99;
        }

        // Konvertiere String-Key zu #B-ID falls nötig
        let hashId = needId;
        if (!needId.startsWith('#B') && BeduerfnisIds.toId) {
            hashId = BeduerfnisIds.toId(needId);
        }

        const need = BeduerfnisIds.beduerfnisse[hashId];
        if (need && need.kategorie) {
            const match = need.kategorie.match(/#K(\d+)/);
            return match ? parseInt(match[1], 10) : 99;
        }
        return 99;
    }

    /**
     * Holt die Dimension-Farbe für ein Bedürfnis basierend auf seiner Kategorie
     * Unterstützt sowohl #B-IDs als auch String-Keys
     *
     * @param {string} needIdOrKey - z.B. '#B21' oder 'selbstbestimmung' (Key)
     * @returns {string} CSS-Farbwert oder null
     */
    function getDimensionColor(needIdOrKey) {
        // Versuche TiageTaxonomie zu finden (global oder window)
        const taxonomie = (typeof TiageTaxonomie !== 'undefined') ? TiageTaxonomie :
                          (typeof window !== 'undefined' && window.TiageTaxonomie) ? window.TiageTaxonomie : null;

        // Versuche BeduerfnisIds zu finden
        const beduerfnisIds = (typeof BeduerfnisIds !== 'undefined') ? BeduerfnisIds :
                              (typeof window !== 'undefined' && window.BeduerfnisIds) ? window.BeduerfnisIds : null;

        if (!taxonomie || !taxonomie.kategorien) {
            return null;
        }
        if (!beduerfnisIds || !beduerfnisIds.beduerfnisse) {
            return null;
        }

        // Konvertiere Key zu ID falls nötig (z.B. 'selbstbestimmung' -> '#B34')
        let needId = needIdOrKey;
        if (!needIdOrKey.startsWith('#')) {
            if (beduerfnisIds.toId) {
                needId = beduerfnisIds.toId(needIdOrKey);
            }
        }

        const need = beduerfnisIds.beduerfnisse[needId];
        if (!need || !need.kategorie) {
            return null;
        }

        const kategorie = taxonomie.kategorien[need.kategorie];
        if (!kategorie || !kategorie.dimension) {
            return null;
        }

        const dimension = taxonomie.dimensionen?.[kategorie.dimension];
        return dimension?.color || null;
    }

    /**
     * Prüft ob ein Bedürfniswert vom Archetyp-Standard abweicht
     * @param {string} needId - #B-ID (z.B. '#B34')
     * @param {number} currentValue - Aktueller Wert
     * @returns {boolean} true wenn Wert geändert wurde, false wenn Standard
     */
    function isValueChanged(needId, currentValue) {
        // Ermittle aktuelle Person aus Kontext
        let currentPerson = 'ich';
        if (typeof window !== 'undefined' && window.currentProfileReviewContext?.person) {
            currentPerson = window.currentProfileReviewContext.person;
        }

        let initialValue;

        // PRIORITÄT 1: Vergleiche gegen gespeichertes Baseline (beste Quelle)
        // Das Baseline wird beim ersten Laden des Profils gespeichert
        if (baselineFlatNeeds[currentPerson]) {
            const baseline = baselineFlatNeeds[currentPerson];
            if (Array.isArray(baseline)) {
                const needEntry = baseline.find(n => n.id === needId);
                initialValue = needEntry?.value;
            } else if (typeof baseline === 'object') {
                const entry = baseline[needId];
                initialValue = (typeof entry === 'object' && entry?.value !== undefined) ? entry.value : entry;
            }
        }

        // PRIORITÄT 2: Vergleiche gegen BaseArchetypProfile (dieselbe Quelle wie Reset)
        // FIX v1.8.710: Verwende BaseArchetypProfile als primäre Fallback-Quelle
        // (Falls kein Baseline gesetzt ist)
        if (initialValue === undefined) {
            // FIX v1.8.710: Hole Archetyp aus TiageState für die richtige Person (SSOT)
            // statt globaler currentFlatArchetyp Variable
            const archetyp = (typeof TiageState !== 'undefined' && TiageState.getArchetype)
                ? TiageState.getArchetype(currentPerson)
                : (currentFlatArchetyp || 'polyamor');
            // Primär: BaseArchetypProfile (SSOT)
            if (typeof BaseArchetypProfile !== 'undefined' && BaseArchetypProfile[archetyp]?.umfrageWerte) {
                initialValue = BaseArchetypProfile[archetyp].umfrageWerte[needId];
            }
            // Fallback: GfkBeduerfnisse
            else if (typeof GfkBeduerfnisse !== 'undefined' && GfkBeduerfnisse.archetypProfile?.[archetyp]?.umfrageWerte) {
                initialValue = GfkBeduerfnisse.archetypProfile[archetyp].umfrageWerte[needId];
            }
        }

        // PRIORITÄT 3: Vergleiche gegen LoadedArchetypProfile (Fallback)
        if (initialValue === undefined) {
            const loadedProfile = (typeof window !== 'undefined' && window.LoadedArchetypProfile)
                ? window.LoadedArchetypProfile[currentPerson]
                : null;

            if (loadedProfile?.profileReview?.flatNeeds) {
                const flatNeedsData = loadedProfile.profileReview.flatNeeds;
                if (Array.isArray(flatNeedsData)) {
                    const needEntry = flatNeedsData.find(n => n.id === needId);
                    initialValue = needEntry?.value;
                } else {
                    initialValue = flatNeedsData[needId];
                }
            }
        }

        if (initialValue === undefined) {
            return false;
        }

        return currentValue !== initialValue;
    }

    /**
     * Setzt das Baseline für eine Person (nur einmal pro Archetyp)
     * Wird beim ersten Laden des Profils aufgerufen
     * FIX v1.8.710: Verwendet BaseArchetypProfile als primäre Quelle (SSOT)
     * @param {string} person - 'ich' oder 'partner'
     * @param {string} archetyp - Archetyp-ID
     */
    function setBaselineForPerson(person, archetyp) {
        // Nur setzen wenn noch nicht für diesen Archetyp gesetzt
        if (baselineArchetyp[person] === archetyp && baselineFlatNeeds[person]) {
            return; // Bereits gesetzt für diesen Archetyp
        }

        // FIX v1.8.710: Verwende BaseArchetypProfile als primäre Quelle (SSOT)
        // PRIORITÄT 1: BaseArchetypProfile (dieselbe Quelle wie Reset)
        let umfrageWerte = null;
        if (typeof BaseArchetypProfile !== 'undefined' && BaseArchetypProfile[archetyp]?.umfrageWerte) {
            umfrageWerte = BaseArchetypProfile[archetyp].umfrageWerte;
        }
        // FALLBACK: GfkBeduerfnisse
        else if (typeof GfkBeduerfnisse !== 'undefined' && GfkBeduerfnisse.archetypProfile?.[archetyp]?.umfrageWerte) {
            umfrageWerte = GfkBeduerfnisse.archetypProfile[archetyp].umfrageWerte;
        }

        if (umfrageWerte) {
            // Tiefe Kopie der Basis-Werte
            baselineFlatNeeds[person] = { ...umfrageWerte };
            baselineArchetyp[person] = archetyp;
            console.log('[AttributeSummaryCard] Baseline gesetzt für', person, '/', archetyp, '- Anzahl:', Object.keys(baselineFlatNeeds[person]).length);
        }
    }

    /**
     * FIX v1.8.700: Aktualisiert das Baseline nach einem Reset
     * Damit der "geändert"-Zähler korrekt ist (0 nach Reset)
     * FIX v1.8.710: Verwendet BaseArchetypProfile (dieselbe Quelle wie Reset)
     * statt GfkBeduerfnisse um Inkonsistenzen zu vermeiden
     * @param {string} person - 'ich' oder 'partner'
     * @param {string} archetyp - Archetyp-ID
     * @param {Array<string>} resetNeedIds - Array von Need-IDs die zurückgesetzt wurden
     */
    function updateBaselineAfterReset(person, archetyp, resetNeedIds) {
        // FIX v1.8.710: Verwende BaseArchetypProfile (dieselbe Quelle wie Reset)
        // PRIORITÄT 1: BaseArchetypProfile (SSOT für Reset)
        let archetypWerte = null;
        if (typeof BaseArchetypProfile !== 'undefined' && BaseArchetypProfile[archetyp]?.umfrageWerte) {
            archetypWerte = BaseArchetypProfile[archetyp].umfrageWerte;
        }
        // FALLBACK: GfkBeduerfnisse (falls BaseArchetypProfile nicht verfügbar)
        else if (typeof GfkBeduerfnisse !== 'undefined' && GfkBeduerfnisse.archetypProfile?.[archetyp]?.umfrageWerte) {
            archetypWerte = GfkBeduerfnisse.archetypProfile[archetyp].umfrageWerte;
            console.warn('[AttributeSummaryCard] updateBaselineAfterReset: BaseArchetypProfile nicht verfügbar, verwende GfkBeduerfnisse');
        }

        if (!archetypWerte) {
            console.warn('[AttributeSummaryCard] updateBaselineAfterReset: Keine Werte gefunden für', archetyp);
            return;
        }

        // Initialisiere baseline falls nicht vorhanden
        if (!baselineFlatNeeds[person]) {
            baselineFlatNeeds[person] = {};
        }

        // Aktualisiere nur die zurückgesetzten Needs im Baseline
        resetNeedIds.forEach(needId => {
            if (archetypWerte[needId] !== undefined) {
                baselineFlatNeeds[person][needId] = archetypWerte[needId];
            }
        });

        console.log('[AttributeSummaryCard] Baseline aktualisiert nach Reset für', person, '- Aktualisiert:', resetNeedIds.length);
    }

    /**
     * FIX: Synchronisiert das Baseline mit den aktuellen flatNeeds aus TiageState
     * Wird nach Reset aufgerufen, damit GOD-modifizierte Bedürfnisse NICHT als "geändert" markiert sind.
     * Das Baseline wird auf die aktuell berechneten flatNeeds gesetzt (inklusive GOD-Modifikatoren).
     * @param {string} person - 'ich' oder 'partner'
     * @param {string} archetyp - Archetyp-ID (z.B. 'single', 'duo')
     */
    function syncBaselineWithFlatNeeds(person, archetyp) {
        if (typeof TiageState === 'undefined') {
            console.warn('[AttributeSummaryCard] syncBaselineWithFlatNeeds: TiageState nicht verfügbar');
            return;
        }

        // Hole die aktuell berechneten flatNeeds (mit GOD-Modifikatoren)
        const currentFlatNeeds = TiageState.get(`flatNeeds.${person}`);
        if (!currentFlatNeeds || Object.keys(currentFlatNeeds).length === 0) {
            console.warn('[AttributeSummaryCard] syncBaselineWithFlatNeeds: Keine flatNeeds für', person);
            return;
        }

        // Setze Baseline auf aktuelle flatNeeds (mit GOD-Modifikatoren)
        baselineFlatNeeds[person] = { ...currentFlatNeeds };
        baselineArchetyp[person] = archetyp;

        console.log('[AttributeSummaryCard] Baseline synchronisiert mit flatNeeds für', person, '/', archetyp,
            '- Anzahl:', Object.keys(baselineFlatNeeds[person]).length);
    }

    /**
     * Gibt die Perspektiven-ID für ein Bedürfnis zurück
     * @param {string} needId - #B-ID (z.B. '#B34')
     * @returns {string} Perspektiven-ID ('#P1', '#P2', '#P3', '#P4')
     */
    function getPerspektiveIdForNeed(needId) {
        // Nutze PerspektivenModal wenn verfügbar
        if (typeof PerspektivenModal !== 'undefined' && PerspektivenModal.getPerspektiveForNeed) {
            // Hole needKey und kategorieKey
            const beduerfnisIds = typeof BeduerfnisIds !== 'undefined' ? BeduerfnisIds : null;
            if (beduerfnisIds && beduerfnisIds.beduerfnisse) {
                const need = beduerfnisIds.beduerfnisse[needId];
                if (need) {
                    const needKey = need.key;
                    // Kategorie-Key aus Taxonomie holen
                    const taxonomie = typeof TiageTaxonomie !== 'undefined' ? TiageTaxonomie : null;
                    let kategorieKey = null;
                    if (taxonomie && need.kategorie) {
                        const kat = taxonomie.kategorien[need.kategorie];
                        kategorieKey = kat?.key || null;
                    }
                    const perspektive = PerspektivenModal.getPerspektiveForNeed(needKey, kategorieKey);
                    return perspektive?.id || '#P1';
                }
            }
        }
        // Fallback: Statistik/GFK
        return '#P1';
    }

    /**
     * Filtert Bedürfnisse nach aktiven Perspektiven-Filtern
     * @param {Array} needs - Array von {id, value, label}
     * @returns {Array} Gefilterte Array
     */
    function filterNeedsByPerspektive(needs) {
        // Kein Filter aktiv = alle anzeigen
        if (activePerspektiveFilters.size === 0) {
            return needs;
        }
        return needs.filter(need => {
            const perspektiveId = getPerspektiveIdForNeed(need.id);
            return activePerspektiveFilters.has(perspektiveId);
        });
    }

    /**
     * DEPRECATED: Toggle einen Perspektiven-Filter
     * Ersetzt durch DimensionKategorieFilter
     * @param {string} perspektiveId - '#P1', '#P2', '#P3', '#P4'
     */
    function togglePerspektiveFilter(perspektiveId) {
        console.warn('[AttributeSummaryCard] togglePerspektiveFilter ist deprecated. Verwende DimensionKategorieFilter.');
        // No-op für Rückwärtskompatibilität
    }

    /**
     * DEPRECATED: Setzt alle Perspektiven-Filter zurück
     * Ersetzt durch DimensionKategorieFilter.reset()
     */
    function clearPerspektiveFilters() {
        console.warn('[AttributeSummaryCard] clearPerspektiveFilters ist deprecated. Verwende DimensionKategorieFilter.reset().');
        if (typeof DimensionKategorieFilter !== 'undefined') {
            DimensionKategorieFilter.reset();
        }
    }

    /**
     * DEPRECATED: Toggle zwischen Hauptfragen und allen Bedürfnissen
     * Hauptfragen-Filter wurde entfernt (Benutzer-Feedback)
     */
    /**
     * Toggle zwischen Hauptfragen-Ansicht und Detail-Ansicht
     */
    function toggleHauptfragenFilter() {
        showOnlyHauptfragen = !showOnlyHauptfragen;
        console.log('[AttributeSummaryCard] Hauptfragen-Ansicht:', showOnlyHauptfragen ? 'AN' : 'AUS');
        reRenderFlatNeeds();
    }

    /**
     * Toggle einer einzelnen Hauptfrage (aufklappen/zuklappen der Nuancen)
     * @param {string} hauptfrageId - Die #B-ID der Hauptfrage
     */
    function toggleHauptfrageExpand(hauptfrageId) {
        if (expandedHauptfragen.has(hauptfrageId)) {
            expandedHauptfragen.delete(hauptfrageId);
        } else {
            expandedHauptfragen.add(hauptfrageId);
        }
        reRenderFlatNeeds();
    }

    /**
     * Holt den frageTyp für ein Bedürfnis aus dem Katalog
     * @param {string} needId - #B-ID (z.B. '#B34')
     * @returns {string} 'haupt', 'nuance', oder null
     */
    function getFrageTyp(needId) {
        if (typeof BeduerfnisIds === 'undefined' || !BeduerfnisIds.beduerfnisse) {
            return null;
        }
        const need = BeduerfnisIds.beduerfnisse[needId];
        return need?.frageTyp || null;
    }

    /**
     * Gibt das Anzeige-Label für einen Sort-Mode zurück
     * @param {string} mode - Sort-Mode
     * @returns {string} Anzeige-Label
     */
    function getSortLabel(mode) {
        const labels = {
            'value': 'Wert',
            'name': 'Name',
            'id': '#B Nr.',
            'status': 'Status',
            'changed': 'Geändert',
            'kategorie': 'Kategorie'
        };
        return labels[mode] || mode;
    }

    /**
     * Vergleichsfunktion für einen einzelnen Sort-Mode
     * @param {Object} a - Bedürfnis A
     * @param {Object} b - Bedürfnis B
     * @param {string} mode - Sort-Mode
     * @returns {number} Vergleichswert (-1, 0, 1)
     */
    function compareByMode(a, b, mode) {
        switch (mode) {
            case 'name':
                const nameA = a.label.replace(/#B\d+\s*/, '').toLowerCase();
                const nameB = b.label.replace(/#B\d+\s*/, '').toLowerCase();
                return nameA.localeCompare(nameB, 'de');
            case 'id':
                return extractBNumber(a.label) - extractBNumber(b.label);
            case 'status':
                const aNeed = findNeedById(a.id);
                const bNeed = findNeedById(b.id);
                const aLocked = aNeed?.locked ? 1 : 0;
                const bLocked = bNeed?.locked ? 1 : 0;
                return bLocked - aLocked; // Gelockte zuerst
            case 'kategorie':
                return getCategoryNumber(a.id) - getCategoryNumber(b.id);
            case 'changed':
                const aChanged = isValueChanged(a.id, a.value) ? 1 : 0;
                const bChanged = isValueChanged(b.id, b.value) ? 1 : 0;
                return bChanged - aChanged; // Geänderte zuerst
            case 'value':
            default:
                return b.value - a.value; // Höchste Werte zuerst
        }
    }

    /**
     * Sortiert die Bedürfnis-Liste nach dem aktuellen Sort-Stack (Multi-Sort)
     * Jeder Sort-Mode hat seine eigene Richtung (sortDirections)
     * @param {Array} needs - Array von {id, value, label}
     * @param {string} mode - Primärer Sort-Mode (für Rückwärtskompatibilität)
     * @returns {Array} Sortiertes Array
     */
    function sortNeedsList(needs, mode) {
        const sorted = [...needs];
        const stack = sortStack.length > 0 ? sortStack : [mode];

        sorted.sort((a, b) => {
            // Multi-Sort: Iteriere durch den Stack
            for (const sortMode of stack) {
                const result = compareByMode(a, b, sortMode);
                if (result !== 0) {
                    // Jeder Mode hat seine eigene Richtung
                    const direction = sortDirections[sortMode] ? 1 : -1;
                    return result * direction;
                }
            }
            // Fallback: Nach Wert wenn alle gleich
            const fallbackDir = sortDirections['value'] ? 1 : -1;
            return (b.value - a.value) * fallbackDir;
        });

        return sorted;
    }

    /**
     * LEGACY: Alte sortNeedsList Logik (nur für Referenz)
     */
    function sortNeedsListLegacy(needs, mode) {
        const sorted = [...needs];
        switch (mode) {
            case 'name':
                // Nach Name alphabetisch (ohne #B-Prefix)
                sorted.sort((a, b) => {
                    const nameA = a.label.replace(/#B\d+\s*/, '').toLowerCase();
                    const nameB = b.label.replace(/#B\d+\s*/, '').toLowerCase();
                    return nameA.localeCompare(nameB, 'de');
                });
                break;
            case 'id':
                // Nach #B-Nummer aufsteigend
                sorted.sort((a, b) => extractBNumber(a.label) - extractBNumber(b.label));
                break;
            case 'status':
                // Nach Status: Geschlossene (locked) zuerst, dann nach Wert
                sorted.sort((a, b) => {
                    const aNeed = findNeedById(a.id);
                    const bNeed = findNeedById(b.id);
                    const aLocked = aNeed?.locked ? 1 : 0;
                    const bLocked = bNeed?.locked ? 1 : 0;
                    // Geschlossene zuerst
                    if (bLocked !== aLocked) {
                        return bLocked - aLocked;
                    }
                    // Bei gleichem Status nach Wert absteigend
                    return b.value - a.value;
                });
                break;
            case 'kategorie':
                // Nach Kategorie (#K1-#K18), innerhalb Kategorie nach Wert absteigend
                sorted.sort((a, b) => {
                    const catA = getCategoryNumber(a.id);
                    const catB = getCategoryNumber(b.id);
                    // Erst nach Kategorie sortieren
                    if (catA !== catB) {
                        return catA - catB;
                    }
                    // Bei gleicher Kategorie nach Wert absteigend
                    return b.value - a.value;
                });
                break;
            case 'changed':
                // Nach geänderten Werten: Geänderte zuerst, dann nach Wert absteigend
                sorted.sort((a, b) => {
                    const aChanged = isValueChanged(a.id, a.value) ? 1 : 0;
                    const bChanged = isValueChanged(b.id, b.value) ? 1 : 0;
                    // Geänderte zuerst
                    if (bChanged !== aChanged) {
                        return bChanged - aChanged;
                    }
                    // Bei gleichem Status nach Wert absteigend
                    return b.value - a.value;
                });
                break;
            case 'value':
            default:
                // Nach Wert absteigend
                sorted.sort((a, b) => b.value - a.value);
                break;
        }
        return sorted;
    }

    /**
     * Rendert ALLE Bedürfnisse aus dem Archetyp-Profil als flache Liste
     * OHNE Kategorien-Gruppierung - einfache flache Liste
     *
     * @param {string} archetyp - Archetyp-ID (z.B. 'polyamor', 'solopoly')
     * @param {string} archetypLabel - Anzeige-Label des Archetyps
     * @returns {string} HTML-String
     */
    function renderAllNeedsFlat(archetyp, archetypLabel) {
        // Prüfe ob GfkBeduerfnisse verfügbar ist
        if (typeof GfkBeduerfnisse === 'undefined' || !GfkBeduerfnisse.archetypProfile) {
            console.warn('renderAllNeedsFlat: GfkBeduerfnisse nicht verfügbar');
            return '<p style="color: var(--text-muted);">Bedürfnis-Daten nicht verfügbar</p>';
        }

        const profil = GfkBeduerfnisse.archetypProfile[archetyp];
        if (!profil || !profil.umfrageWerte) {
            console.warn('renderAllNeedsFlat: Profil nicht gefunden:', archetyp);
            return '<p style="color: var(--text-muted);">Profil nicht gefunden</p>';
        }

        // Ermittle aktuelle Person aus Kontext
        let currentPerson = 'ich';
        if (typeof window !== 'undefined' && window.currentProfileReviewContext?.person) {
            currentPerson = window.currentProfileReviewContext.person;
        }

        // Prüfe ob neuer Archetyp oder neue Person geladen wird
        const isNewArchetyp = currentFlatArchetyp !== archetyp;
        const isNewPerson = currentFlatPerson !== currentPerson;

        // Speichere aktuellen Archetyp, Person und Label
        currentFlatArchetyp = archetyp;
        currentFlatPerson = currentPerson;
        currentFlatArchetypLabel = archetypLabel;

        // WICHTIG: Setze Baseline für die aktuelle Person/Archetyp Kombination
        // Das Baseline enthält die statischen Archetyp-Werte und dient als Vergleichsbasis
        setBaselineForPerson(currentPerson, archetyp);

        // Bei neuem Archetyp ODER neuer Person: Alle Einträge zurücksetzen
        // FIX: Ohne Person-Reset werden Werte von ich auf partner übertragen und umgekehrt
        if (isNewArchetyp || isNewPerson) {
            // Alle Bedürfnisse zurücksetzen damit neue Profil-Werte geladen werden
            flatNeeds = [];
            console.log('[AttributeSummaryCard] Neuer Archetyp oder Person geladen - Bedürfnisse zurückgesetzt',
                { archetyp, person: currentPerson, isNewArchetyp, isNewPerson });
        }

        // Hole ALLE Bedürfnisse - PRIORITÄT: TiageState.flatNeeds (SSOT für User-Änderungen)
        let umfrageWerte = {};

        // FIX v1.8.701: TiageState.flatNeeds hat PRIORITÄT über LoadedArchetypProfile
        // TiageState enthält die aktuellen User-Änderungen (inkl. Reset-Werte)
        // LoadedArchetypProfile ist nur ein Cache und wird nicht bei Reset aktualisiert
        if (typeof TiageState !== 'undefined') {
            const tiageStateFlatNeeds = TiageState.get('flatNeeds.' + currentPerson);

            // FIX v1.8.705: TiageState kann ARRAY oder OBJECT sein
            // saveCurrentState() in needs-editor.html speichert ARRAY
            // Aber umfrageWerte muss ein OBJECT { '#B1': value } sein
            if (Array.isArray(tiageStateFlatNeeds) && tiageStateFlatNeeds.length > 0) {
                // Konvertiere Array zu Object
                tiageStateFlatNeeds.forEach(need => {
                    if (need.id && need.value !== undefined) {
                        umfrageWerte[need.id] = need.value;
                    }
                });
                console.log('[AttributeSummaryCard] Verwende Werte aus TiageState.flatNeeds (ARRAY→OBJECT) für', currentPerson, 'Anzahl:', Object.keys(umfrageWerte).length);
            } else if (tiageStateFlatNeeds && typeof tiageStateFlatNeeds === 'object' && Object.keys(tiageStateFlatNeeds).length > 0) {
                // Bereits Object-Format
                umfrageWerte = tiageStateFlatNeeds;
                console.log('[AttributeSummaryCard] Verwende Werte aus TiageState.flatNeeds (OBJECT) für', currentPerson, 'Anzahl:', Object.keys(umfrageWerte).length);
            }
        }

        // Fallback 1: LoadedArchetypProfile (nur wenn TiageState leer)
        if (Object.keys(umfrageWerte).length === 0) {
            const loadedProfile = (typeof window !== 'undefined' && window.LoadedArchetypProfile)
                ? window.LoadedArchetypProfile[currentPerson]
                : null;

            const loadedFlatNeeds = loadedProfile?.profileReview?.flatNeeds;
            const hasFlatNeeds = loadedFlatNeeds && Object.keys(loadedFlatNeeds).length > 0;

            if (hasFlatNeeds) {
                umfrageWerte = loadedFlatNeeds;
                console.log('[AttributeSummaryCard] Fallback: Verwende Werte aus LoadedArchetypProfile für', currentPerson, 'Anzahl:', Object.keys(umfrageWerte).length);
            }
        }

        // Fallback 2: Statische Archetyp-Werte aus BaseArchetypProfile
        if (Object.keys(umfrageWerte).length === 0) {
            umfrageWerte = profil.umfrageWerte || {};
            console.log('[AttributeSummaryCard] Fallback: Verwende statische umfrageWerte aus BaseArchetypProfile für', currentPerson, 'Anzahl:', Object.keys(umfrageWerte).length);
        }

        // DEBUG: Prüfe ob umfrageWerte korrekt geladen wurden
        if (Object.keys(umfrageWerte).length === 0) {
            console.error('[AttributeSummaryCard] FEHLER: umfrageWerte ist leer!', {
                tiageStateFlatNeeds: typeof TiageState !== 'undefined' ? TiageState.get('flatNeeds.' + currentPerson) : null,
                profilUmfrageWerte: profil?.umfrageWerte,
                archetyp: archetyp
            });
        } else {
            // Sample check: Zeige erste 3 Werte
            const sampleKeys = Object.keys(umfrageWerte).slice(0, 3);
            console.log('[AttributeSummaryCard] Sample umfrageWerte:', sampleKeys.map(k => `${k}=${umfrageWerte[k]}`));
        }

        // ═══════════════════════════════════════════════════════════════════════════
        // SSOT: Initialisiere ALLE 219 Bedürfnisse aus BeduerfnisIds (Single Source of Truth)
        // BeduerfnisIds ist die einzige Quelle für die Bedürfnis-Definition
        // Werte kommen aus LoadedArchetypProfile (SSOT für berechnete Werte)
        // ═══════════════════════════════════════════════════════════════════════════
        if (typeof BeduerfnisIds === 'undefined' || !BeduerfnisIds.beduerfnisse) {
            console.error('[AttributeSummaryCard] SSOT FEHLER: BeduerfnisIds nicht verfügbar! Kann keine Bedürfnisse laden.');
            return '<p style="color: var(--error-color);">Fehler: BeduerfnisIds nicht geladen. Bitte Seite neu laden.</p>';
        }

        // ═══════════════════════════════════════════════════════════════════════════
        // FIX: Lade gesperrte Bedürfnisse aus TiageState.profileReview.lockedNeeds
        // Diese werden beim Sperren via toggleFlatNeedLock gespeichert
        // ═══════════════════════════════════════════════════════════════════════════
        let savedLockedNeeds = {};
        if (typeof TiageState !== 'undefined') {
            savedLockedNeeds = TiageState.getLockedNeeds(currentPerson) || {};
            const lockedCount = Object.keys(savedLockedNeeds).length;
            if (lockedCount > 0) {
                console.log('[AttributeSummaryCard] Geladene gesperrte Bedürfnisse aus TiageState:', lockedCount, 'für', currentPerson);
            }
        }

        Object.keys(BeduerfnisIds.beduerfnisse).forEach(needId => {
            const existing = findNeedById(needId);
            if (!existing) {
                const numKey = parseInt(needId.replace('#B', ''), 10) || 0;
                const needData = BeduerfnisIds.beduerfnisse[needId];
                const stringKey = needData?.key || '';

                // Prüfe ob Bedürfnis gesperrt ist (aus TiageState.profileReview.lockedNeeds)
                const isLocked = savedLockedNeeds.hasOwnProperty(needId);
                // FIX v1.8.710: Fallback auf Archetyp-Default wenn TiageState-Wert undefined
                // Das behebt das Problem dass manche Needs nach Reset noch als "geändert" erscheinen
                const tiageStateValue = umfrageWerte[needId];
                const archetypDefaultValue = profil?.umfrageWerte?.[needId];
                const value = isLocked
                    ? savedLockedNeeds[needId]
                    : (tiageStateValue !== undefined ? tiageStateValue : archetypDefaultValue);

                flatNeeds.push({
                    id: needId,
                    key: numKey,
                    stringKey: stringKey,
                    label: needData?.label || getNeedLabel(needId).replace(/^#B\d+\s*/, ''),
                    value: value, // Gesperrter Wert oder umfrageWert
                    locked: isLocked
                });
            }
        });
        console.log('[AttributeSummaryCard] Alle', flatNeeds.length, 'Bedürfnisse aus BeduerfnisIds geladen');

        // ═══════════════════════════════════════════════════════════════════════════
        // FIX: Synchronisiere Lock-Status UND Werte für BESTEHENDE Needs
        // Die obige Schleife fügt nur NEUE Needs hinzu. Bestehende Needs werden nicht
        // aktualisiert - das führte dazu, dass gesperrte Werte verloren gingen.
        // syncLocksFromTiageState() aktualisiert sowohl locked-Status als auch Werte
        // für bestehende Needs aus TiageState.profileReview.lockedNeeds (SSOT).
        // ═══════════════════════════════════════════════════════════════════════════
        syncLocksFromTiageState();

        // Sammle ALLE Bedürfnisse - nutze direkt flatNeeds Array
        let allNeeds = flatNeeds.map(need => ({
            id: need.id,
            value: need.value,
            label: `${need.id} ${need.label}` // Format: "#B34 Selbstbestimmung"
        }));

        // Zähle Gesamt vor dem Filtern
        const totalNeedsCount = allNeeds.length;

        // HAUPTFRAGEN-FILTER ENTFERNT (showOnlyHauptfragen immer false)
        // Zeige IMMER alle 219 Bedürfnisse

        // Sortiere nach aktuellem Modus
        const sortedNeeds = sortNeedsList(allNeeds, currentFlatSortMode);

        // FIX: Zähle gefilterte Bedürfnisse (für Anzeige)
        // Dies ermöglicht korrekte Anzeige im Subtitle wenn Filter aktiv sind
        let filteredNeeds = sortedNeeds;
        let filteredCount = sortedNeeds.length;
        if (typeof DimensionKategorieFilter !== 'undefined') {
            filteredNeeds = sortedNeeds.filter(need => DimensionKategorieFilter.shouldShowNeed(need.id));
            filteredCount = filteredNeeds.length;
            if (filteredCount < sortedNeeds.length) {
                console.log('[AttributeSummaryCard] Filter aktiv:', filteredCount, 'von', sortedNeeds.length, 'Bedürfnissen sichtbar');
            }
        }

        // FIX v1.8.568: Zähle alle gesperrten Items (inkl. durch Hauptfragen-Lock implizit gesperrte Nuancen)
        const lockedCount = calculateTotalLockedCount(currentPerson);

        // Zähle geänderte Bedürfnisse (abweichend vom Archetyp-Standard)
        // Bei aktivem Filter: zähle nur gefilterte geänderte Bedürfnisse
        const changedCount = filteredNeeds.filter(need => isValueChanged(need.id, need.value)).length;

        // Hauptfragen-Daten für aggregierte Ansicht
        let hauptfragenCount = 0;
        let hauptfragenData = [];
        if (typeof HauptfrageAggregation !== 'undefined') {
            // Mapping der UI-Sortieroptionen auf HauptfrageAggregation-Parameter
            // UI: 'value', 'name', 'id', 'status', 'changed'
            // HauptfrageAggregation: 'value', 'label', 'kategorie', 'id'
            let sortParam = 'value';
            let sortDescending = true;
            let needsCustomChangedSort = false;

            switch (currentFlatSortMode) {
                case 'name':
                    sortParam = 'label';
                    sortDescending = false; // A-Z aufsteigend
                    break;
                case 'id':
                    sortParam = 'id';
                    sortDescending = false; // #B1, #B2, ... aufsteigend
                    break;
                case 'changed':
                    // Spezielle Sortierung: Hauptfragen mit geänderten Nuancen zuerst
                    sortParam = 'value'; // Initial nach Wert
                    sortDescending = true;
                    needsCustomChangedSort = true;
                    break;
                case 'status':
                case 'value':
                default:
                    sortParam = 'value';
                    sortDescending = true; // Höchste zuerst
                    break;
            }

            hauptfragenData = HauptfrageAggregation.getAggregatedHauptfragenList(
                Object.fromEntries(flatNeeds.map(n => [n.id, n.value])),
                sortParam,
                sortDescending
            );

            // Spezielle "Geändert"-Sortierung für Hauptfragen:
            // Hauptfragen mit geänderten Nuancen zuerst/letzt (je nach Richtung), dann nach Anzahl geänderter Nuancen
            if (needsCustomChangedSort) {
                const changedDirection = sortDirections.changed ? 1 : -1; // true = ↓ (mehr zuerst), false = ↑ (weniger zuerst)
                hauptfragenData.sort((a, b) => {
                    const aChangedCount = (a.nuancen || []).filter(nuanceId => {
                        const nuanceObj = findNeedById(nuanceId);
                        return nuanceObj && isValueChanged(nuanceId, nuanceObj.value);
                    }).length;
                    const bChangedCount = (b.nuancen || []).filter(nuanceId => {
                        const nuanceObj = findNeedById(nuanceId);
                        return nuanceObj && isValueChanged(nuanceId, nuanceObj.value);
                    }).length;
                    // Sortierrichtung berücksichtigen
                    if (bChangedCount !== aChangedCount) {
                        return (bChangedCount - aChangedCount) * changedDirection;
                    }
                    // Bei gleicher Anzahl (insbes. 0 Änderungen): nach #B-Nummer sortieren für konsistente Reihenfolge
                    const numA = parseInt((a.id || '').replace('#B', ''), 10) || 0;
                    const numB = parseInt((b.id || '').replace('#B', ''), 10) || 0;
                    return numA - numB;
                });
            }

            // Filtere Hauptfragen nach aktivem DimensionKategorieFilter
            // Eine Hauptfrage ist sichtbar wenn mindestens eine ihrer Nuancen sichtbar ist
            const totalHauptfragen = hauptfragenData.length;
            if (typeof DimensionKategorieFilter !== 'undefined' && filteredCount < sortedNeeds.length) {
                hauptfragenData = hauptfragenData.filter(hf => {
                    // Prüfe ob die Hauptfrage selbst sichtbar ist
                    if (DimensionKategorieFilter.shouldShowNeed(hf.id)) {
                        return true;
                    }
                    // Prüfe ob mindestens eine Nuance sichtbar ist
                    if (hf.nuancen && hf.nuancen.length > 0) {
                        return hf.nuancen.some(nuanceId => DimensionKategorieFilter.shouldShowNeed(nuanceId));
                    }
                    return false;
                });
            }
            hauptfragenCount = hauptfragenData.length;
        }

        // Subtitle mit Filter-Info, gesperrten und geänderten Bedürfnissen
        const filterActive = filteredCount < totalNeedsCount;
        let subtitleText;
        if (showOnlyHauptfragen) {
            // Bei Hauptfragen-Ansicht: Zeige gefilterte Anzahl wenn Filter aktiv
            if (filterActive) {
                subtitleText = `Dein ${archetypLabel}-Profil (Gefiltert: ${hauptfragenCount} Hauptfragen), davon gesperrt: ${lockedCount}`;
            } else {
                subtitleText = `Dein ${archetypLabel}-Profil (${hauptfragenCount} Hauptfragen), davon gesperrt: ${lockedCount}`;
            }
        } else {
            subtitleText = filterActive
                ? `Dein ${archetypLabel}-Profil (Gefiltert: ${filteredCount}), davon gesperrt: ${lockedCount}`
                : `Dein ${archetypLabel}-Profil (${totalNeedsCount} Bedürfnisse), davon gesperrt: ${lockedCount}`;
        }
        // Füge geänderte Zählung hinzu wenn > 0
        if (changedCount > 0) {
            subtitleText += `, geändert: ${changedCount}`;
        }

        // Titel je nach Ansichtsmodus
        const titleText = showOnlyHauptfragen ? 'Bedürfnisse (Hauptfragen)' : 'Alle Bedürfnisse';

        // Rendere HTML - flache Liste ohne Kategorien
        let html = `<div class="flat-needs-container flat-needs-no-categories" data-archetyp="${archetyp}">`;
        html += `<div class="flat-needs-header">
            <div class="flat-needs-header-top">
                <div class="flat-needs-header-left">
                    <span class="flat-needs-title">${titleText}</span>
                    <span class="flat-needs-subtitle">${subtitleText}</span>
                </div>
            </div>

            <div class="flat-needs-sort-bar">
                <span class="flat-needs-sort-label">Sortieren:</span>
                <button class="flat-needs-sort-btn sort-additive-btn${additiveSortMode ? ' active' : ''}"
                        onclick="AttributeSummaryCard.toggleAdditiveSortMode()" title="${additiveSortMode ? 'Multi-Sort aktiv: Klicks werden kombiniert' : 'Multi-Sort: Klick zum Aktivieren'}">+</button>
                <button class="flat-needs-sort-btn${sortStack.includes('value') ? ' active' : ''}${sortStack.indexOf('value') >= 0 ? ' sort-' + (sortStack.indexOf('value') + 1) : ''}"
                        onclick="AttributeSummaryCard.setSortMode('value')" title="Klick: primär sortieren / nochmal: Richtung wechseln">Wert ${sortDirections.value ? '↓' : '↑'}</button>
                <button class="flat-needs-sort-btn${sortStack.includes('name') ? ' active' : ''}${sortStack.indexOf('name') >= 0 ? ' sort-' + (sortStack.indexOf('name') + 1) : ''}"
                        onclick="AttributeSummaryCard.setSortMode('name')" title="Klick: primär sortieren / nochmal: Richtung wechseln">Name ${sortDirections.name ? '↓' : '↑'}</button>
                <button class="flat-needs-sort-btn${sortStack.includes('id') ? ' active' : ''}${sortStack.indexOf('id') >= 0 ? ' sort-' + (sortStack.indexOf('id') + 1) : ''}"
                        onclick="AttributeSummaryCard.setSortMode('id')" title="Klick: primär sortieren / nochmal: Richtung wechseln">#B Nr. ${sortDirections.id ? '↓' : '↑'}</button>
                <button class="flat-needs-sort-btn${sortStack.includes('status') ? ' active' : ''}${sortStack.indexOf('status') >= 0 ? ' sort-' + (sortStack.indexOf('status') + 1) : ''}"
                        onclick="AttributeSummaryCard.setSortMode('status')" title="Klick: primär sortieren / nochmal: Richtung wechseln">Status ${sortDirections.status ? '↓' : '↑'}</button>
                <button class="flat-needs-sort-btn${sortStack.includes('changed') ? ' active' : ''}${sortStack.indexOf('changed') >= 0 ? ' sort-' + (sortStack.indexOf('changed') + 1) : ''}"
                        onclick="AttributeSummaryCard.setSortMode('changed')" title="Klick: primär sortieren / nochmal: Richtung wechseln">Geändert ${sortDirections.changed ? '↓' : '↑'}</button>
                <button class="flat-needs-sort-btn sort-reset-btn${sortStack.length === 1 && sortStack[0] === 'changed' && sortDirections.changed && !additiveSortMode ? ' hidden' : ''}"
                        onclick="AttributeSummaryCard.resetSort()" title="Sortierung zurücksetzen">✕</button>
            </div>
            ${sortStack.length > 1 || additiveSortMode ? `<div class="flat-needs-sort-info">${additiveSortMode ? '<span class="sort-mode-indicator">Multi-Sort aktiv</span> ' : ''}${sortStack.length > 1 ? `Sortierung: ${sortStack.map((s, i) => `<span class="sort-badge sort-${i+1}">${getSortLabel(s)} ${sortDirections[s] ? '↓' : '↑'}</span>`).join(' → ')}` : ''}</div>` : ''}

            <div class="flat-needs-selection-bar">
                <span class="flat-needs-selection-label">Markieren:</span>
                <button class="flat-needs-selection-btn" onclick="AttributeSummaryCard.selectAllFilteredNeeds()" title="Alle sichtbaren Bedürfnisse auswählen">✓ Alle</button>
                <button class="flat-needs-selection-btn" onclick="AttributeSummaryCard.clearNeedSelection()" title="Alle Auswahlen aufheben">✗ Keine</button>
                <button class="flat-needs-selection-btn" onclick="AttributeSummaryCard.invertNeedSelection()" title="Auswahl umkehren">⇄ Umkehren</button>
                <span class="selection-counter${selectedNeeds.size > 0 ? ' has-selection' : ''}">${selectedNeeds.size > 0 ? selectedNeeds.size + ' markiert' : ''}</span>
                <div class="bulk-increment-card${selectedNeeds.size === 0 ? ' disabled' : ''}">
                    <button class="bulk-increment-btn bulk-increment" onclick="AttributeSummaryCard.incrementSelectedNeeds(5)" title="Alle markierten Werte um 5 erhöhen" ${selectedNeeds.size === 0 ? 'disabled' : ''}>
                        <span class="bulk-btn-icon">+</span>
                        <span class="bulk-btn-label">5</span>
                    </button>
                    <button class="bulk-increment-btn bulk-decrement" onclick="AttributeSummaryCard.decrementSelectedNeeds(5)" title="Alle markierten Werte um 5 verringern" ${selectedNeeds.size === 0 ? 'disabled' : ''}>
                        <span class="bulk-btn-icon">−</span>
                        <span class="bulk-btn-label">5</span>
                    </button>
                    <button class="bulk-reset-btn" onclick="AttributeSummaryCard.resetSelectedNeedsValues()" title="Alle ungesperrten Werte auf Original zurücksetzen" ${selectedNeeds.size === 0 ? 'disabled' : ''}>
                        <span class="bulk-btn-icon">↺</span>
                        <span class="bulk-btn-label">Reset</span>
                    </button>
                    <button class="bulk-lock-btn" onclick="AttributeSummaryCard.toggleLockSelectedNeeds()" title="Alle markierten Werte sperren/entsperren" ${selectedNeeds.size === 0 ? 'disabled' : ''}>
                        <span class="bulk-btn-icon">🔒</span>
                        <span class="bulk-btn-label">Ent-/Sperren</span>
                    </button>
                </div>
            </div>
        </div>`;

        // NOTE: Filter-Container ist bereits oben in der Header-Sektion (Zeile ~1346)
        // Kein zweiter Container nötig - wurde entfernt um duplicate ID zu vermeiden

        // ═══════════════════════════════════════════════════════════════════════════
        // BEDINGTE RENDER-LOGIK: Hauptfragen-Ansicht vs. Detail-Ansicht
        // ═══════════════════════════════════════════════════════════════════════════

        if (showOnlyHauptfragen && hauptfragenData.length > 0) {
            // ═══════════════════════════════════════════════════════════════════════════
            // HAUPTFRAGEN-ANSICHT: Zeigt nur Hauptfragen mit aggregierten Werten
            // ═══════════════════════════════════════════════════════════════════════════
            html += `<div class="flat-needs-list-wrapper">
                <div class="flat-needs-list hauptfragen-mode">`;

            hauptfragenData.forEach(hf => {
                const isExpanded = expandedHauptfragen.has(hf.id);
                const dimColor = getDimensionColor(hf.id);
                const nuancenCount = hf.nuancenCount || 0;
                const aggregatedValue = hf.aggregatedValue;
                const isHauptfrageLocked = lockedHauptfragen.has(hf.id);
                const hasNuancen = nuancenCount > 0;

                // Zähle gelockte Nuancen
                let lockedNuancenCount = 0;
                let allNuancenLocked = false;
                if (hasNuancen && hf.nuancen && hf.nuancen.length > 0) {
                    lockedNuancenCount = hf.nuancen.filter(nuanceId => {
                        const nuanceObj = findNeedById(nuanceId);
                        return nuanceObj?.locked === true;
                    }).length;
                    allNuancenLocked = lockedNuancenCount === hf.nuancen.length;
                }
                const hasLockedNuancen = lockedNuancenCount > 0;
                const someNuancenLocked = hasLockedNuancen && !allNuancenLocked;

                // Hauptfrage ist effektiv gelockt wenn: explizit gelockt ODER alle Nuancen gelockt
                const isEffectivelyLocked = isHauptfrageLocked || allNuancenLocked;

                // Slider ist disabled wenn: gelockt (explizit oder durch Nuancen) UND hat Nuancen
                // Bei Hauptfragen ohne Nuancen ist Slider immer editierbar
                const sliderDisabled = hasNuancen && isEffectivelyLocked;

                // Zähle geänderte Nuancen
                const changedNuancenCount = (hf.nuancen || []).filter(nuanceId => {
                    const nuanceObj = findNeedById(nuanceId);
                    return nuanceObj && isValueChanged(nuanceId, nuanceObj.value);
                }).length;
                const hasChangedNuancen = changedNuancenCount > 0;

                // FIX: Prüfe auch ob Hauptfrage selbst geändert wurde (für Hauptfragen ohne Nuancen)
                const hauptfrageDirectlyChanged = !hasNuancen && isValueChanged(hf.id, aggregatedValue);
                const hasAnyChange = hasChangedNuancen || hauptfrageDirectlyChanged;

                // CSS-Klassen
                const changedClass = hasAnyChange ? ' has-changed-nuancen' : '';
                const lockedClass = isEffectivelyLocked ? ' hauptfrage-locked' : '';
                const lockedByNuancenClass = allNuancenLocked && !isHauptfrageLocked ? ' locked-by-nuancen' : '';
                const partialLockedClass = someNuancenLocked ? ' has-locked-nuancen' : '';

                // Indikator: Sternchen für geänderte Nuancen ODER direkte Änderung
                const changedIndicator = hasAnyChange
                    ? `<span class="hauptfrage-changed-indicator" title="${hauptfrageDirectlyChanged ? 'Wert wurde geändert' : `${changedNuancenCount} Nuance(n) geändert`}">*</span>`
                    : '';

                // Nuancen-Status Info (zeigt gelockt/geändert Anzahl)
                let nuancenStatusInfo = '';
                if (hasNuancen) {
                    const statusParts = [];
                    if (lockedNuancenCount > 0) statusParts.push(`${lockedNuancenCount}🔒`);
                    if (changedNuancenCount > 0) statusParts.push(`${changedNuancenCount}*`);
                    nuancenStatusInfo = statusParts.length > 0 ? ` <span class="nuancen-status-info">${statusParts.join(' ')}</span>` : '';
                }

                // Slider-Style für Hauptfrage
                const sliderValue = aggregatedValue !== null ? aggregatedValue : 50;
                const sliderStyle = dimColor
                    ? `style="background: ${getSliderFillGradient(dimColor, sliderValue)};"`
                    : '';

                // Lock-Icon Tooltip
                let lockTitle = '';
                if (allNuancenLocked && !isHauptfrageLocked) {
                    lockTitle = 'Alle Nuancen gesperrt - Hauptfrage automatisch fixiert';
                } else if (someNuancenLocked) {
                    lockTitle = `${lockedNuancenCount}/${nuancenCount} Nuancen gesperrt`;
                } else if (isHauptfrageLocked) {
                    lockTitle = 'Entsperren (Nuancen wieder editierbar)';
                } else {
                    lockTitle = 'Sperren (fixiert Wert, sperrt Nuancen)';
                }

                // Prüfe Auswahl-Status: Alle Nuancen + Hauptfrage ausgewählt?
                const allIds = [hf.id, ...(hf.nuancen || [])];
                const isHauptfrageSelected = allIds.every(id => selectedNeeds.has(id));
                const someSelected = allIds.some(id => selectedNeeds.has(id));
                const selectedClass = isHauptfrageSelected ? ' hauptfrage-selected' : (someSelected ? ' hauptfrage-partial-selected' : '');

                // Hauptfrage-Item mit Expand-Toggle und Slider - CARD STYLE (Klick auf Card = Markieren)
                html += `
                <div class="hauptfrage-item hauptfrage-card${isExpanded ? ' expanded' : ''}${changedClass}${lockedClass}${lockedByNuancenClass}${partialLockedClass}${selectedClass}" data-hauptfrage-id="${hf.id}"
                     onclick="AttributeSummaryCard.toggleHauptfrageSelection('${hf.id}')"
                     title="Klicken um Hauptfrage + alle Nuancen zu markieren">
                    <div class="hauptfrage-header">
                        <span class="hauptfrage-expand-icon" onclick="event.stopPropagation(); AttributeSummaryCard.toggleHauptfrageExpand('${hf.id}')">${isExpanded ? '▼' : '▶'}</span>
                        <span class="hauptfrage-label" style="border-left: 3px solid ${dimColor}; padding-left: 8px;">
                            ${hf.id} ${hf.label}${changedIndicator}
                        </span>
                        <span class="hauptfrage-nuancen-count" onclick="event.stopPropagation(); AttributeSummaryCard.toggleHauptfrageExpand('${hf.id}')">${hasNuancen ? `(${nuancenCount} Nuancen)${nuancenStatusInfo}` : '(direkt)'}</span>
                        <div class="hauptfrage-controls" onclick="event.stopPropagation();">
                            <span class="hauptfrage-lock-icon ${isEffectivelyLocked ? 'locked' : ''}${allNuancenLocked && !isHauptfrageLocked ? ' auto-locked' : ''}${someNuancenLocked ? ' partial-locked' : ''}"
                                  onclick="AttributeSummaryCard.toggleHauptfrageLock('${hf.id}', this)"
                                  title="${lockTitle}"></span>
                        </div>
                    </div>
                    <div class="hauptfrage-slider-row" onclick="event.stopPropagation();">
                        <input type="range" class="hauptfrage-slider"
                               min="0" max="100" value="${sliderValue}"
                               oninput="AttributeSummaryCard.onHauptfrageSliderInput('${hf.id}', this.value, this)"
                               ${sliderStyle}
                               ${sliderDisabled ? 'disabled' : ''}>
                        <input type="text" class="hauptfrage-input" value="${sliderValue}" maxlength="3"
                               onchange="AttributeSummaryCard.updateHauptfrageValue('${hf.id}', this.value)"
                               ${sliderDisabled ? 'readonly' : ''}>
                    </div>`;

                // Nuancen-Liste (wenn aufgeklappt und Nuancen vorhanden)
                if (isExpanded && hf.nuancen && hf.nuancen.length > 0) {
                    html += `<div class="nuancen-list${isHauptfrageLocked ? ' nuancen-locked-by-parent' : ''}" onclick="event.stopPropagation();">`;
                    hf.nuancen.forEach(nuanceId => {
                        const nuanceObj = findNeedById(nuanceId);
                        if (nuanceObj) {
                            // Wenn Hauptfrage gelockt → Nuancen auch gelockt
                            const isLocked = isHauptfrageLocked || nuanceObj.locked || false;
                            const nuanceValue = nuanceObj.value;
                            html += renderFlatNeedItem(
                                nuanceId,
                                `${nuanceId} ${nuanceObj.label}`,
                                nuanceValue,
                                isLocked,
                                dimColor,
                                false // Nicht verstecken in expandierter Ansicht
                            );
                        }
                    });
                    html += `</div>`; // Close nuancen-list
                }

                html += `</div>`; // Close hauptfrage-item
            });

            html += `</div>`; // Close flat-needs-list
            html += `</div>`; // Close flat-needs-list-wrapper
        } else {
            // ═══════════════════════════════════════════════════════════════════════════
            // DETAIL-ANSICHT: Zeigt alle Bedürfnisse flach
            // ═══════════════════════════════════════════════════════════════════════════
            html += `<div class="flat-needs-list-wrapper">
                <div class="flat-needs-list kategorie-mode">`;
            // Rendere alle Bedürfnisse mit aktiven Filtern
            sortedNeeds.forEach(need => {
                const needObj = findNeedById(need.id);
                const isLocked = needObj?.locked || false;
                // Zeige immer Dimension-Farbe
                const dimColor = getDimensionColor(need.id);

                // "Nur Geänderte" Filter - zeigt nur Bedürfnisse deren Wert vom Standard abweicht
                const hiddenByChangedFilter = showOnlyChangedNeeds && !isValueChanged(need.id, need.value);

                // DimensionKategorieFilter anwenden (Kategorie-Filter)
                const hiddenByDimensionFilter = typeof DimensionKategorieFilter !== 'undefined' &&
                    !DimensionKategorieFilter.shouldShowNeed(need.id);

                // Beide Filter kombinieren
                const shouldHide = hiddenByChangedFilter || hiddenByDimensionFilter;

                html += renderFlatNeedItem(need.id, need.label, need.value, isLocked, dimColor, shouldHide);
            });
            html += `</div>`; // Close flat-needs-list
            html += `</div>`; // Close flat-needs-list-wrapper
        }

        html += '</div>'; // Close flat-needs-container
        return html;
    }

    /**
     * Setzt den Sortiermodus und rendert die Liste neu
     * Verwendet additiveSortMode und per-mode sortDirections
     * Jeder Sort-Mode hat seine eigene Richtung (sortDirections)
     * @param {string} mode - 'value', 'name', 'id', 'status', 'changed'
     */
    function setSortMode(mode) {
        // Wenn dieser Mode bereits der primäre ist (und nicht additiv): Toggle Richtung
        if (sortStack[0] === mode && !additiveSortMode) {
            sortDirections[mode] = !sortDirections[mode];
            savedStatePerPerson[currentSortPerson].sortDirections = {...sortDirections};
            console.log('[AttributeSummaryCard] Richtung getoggelt für', mode, ':', sortDirections[mode] ? '↓' : '↑');
            reRenderFlatNeeds();
            return;
        }

        if (additiveSortMode && sortStack.length < 3) {
            // Additive Sortierung: zum Stack hinzufügen wenn nicht schon drin
            if (!sortStack.includes(mode)) {
                sortStack.push(mode);
            } else {
                // Wenn schon im Stack: Toggle Richtung
                sortDirections[mode] = !sortDirections[mode];
                savedStatePerPerson[currentSortPerson].sortDirections = {...sortDirections};
            }
        } else {
            // Normale Sortierung: ersetzt den Stack
            sortStack = [mode];
        }
        currentFlatSortMode = sortStack[0];

        // Speichere für aktuelle Person
        savedStatePerPerson[currentSortPerson].sortMode = currentFlatSortMode;
        savedStatePerPerson[currentSortPerson].sortStack = [...sortStack];
        savedStatePerPerson[currentSortPerson].sortDirections = {...sortDirections};

        console.log('[AttributeSummaryCard] Sort-Stack:', sortStack, 'Richtungen:', sortDirections);
        reRenderFlatNeeds();
    }

    /**
     * Toggle additiven Sortiermodus (+ Button)
     * Wenn aktiv: Klicks fügen zur Sortierung hinzu
     * Wenn inaktiv: Klicks ersetzen die Sortierung
     */
    function toggleAdditiveSortMode() {
        additiveSortMode = !additiveSortMode;
        console.log('[AttributeSummaryCard] Additiver Modus:', additiveSortMode ? 'AN' : 'AUS');
        reRenderFlatNeeds();
    }

    /**
     * Setzt Sortierung auf Standard zurück (nur 'changed', absteigend, nicht-additiv)
     */
    function resetSort() {
        sortStack = ['changed'];
        currentFlatSortMode = 'changed';
        additiveSortMode = false;
        // Alle Richtungen auf Standard zurücksetzen
        sortDirections.value = true;
        sortDirections.name = true;
        sortDirections.id = true;
        sortDirections.status = true;
        sortDirections.changed = true;
        savedStatePerPerson[currentSortPerson].sortMode = 'changed';
        savedStatePerPerson[currentSortPerson].sortStack = ['changed'];
        savedStatePerPerson[currentSortPerson].sortDirections = {...sortDirections};
        console.log('[AttributeSummaryCard] Sortierung zurückgesetzt');
        reRenderFlatNeeds();
    }

    /**
     * Speichert den aktuellen State (Sort-Mode + Filter) für eine Person
     * @param {string} person - 'ich' oder 'partner'
     */
    function saveSortModeForPerson(person) {
        if (!person || (person !== 'ich' && person !== 'partner')) {
            person = 'ich';
        }
        savedStatePerPerson[person].sortMode = currentFlatSortMode;
        savedStatePerPerson[person].sortStack = [...sortStack];
        savedStatePerPerson[person].sortDirections = {...sortDirections};
        savedStatePerPerson[person].showOnlyChanged = showOnlyChangedNeeds;
        console.log('[AttributeSummaryCard] State gespeichert für', person, ':', savedStatePerPerson[person]);
    }

    /**
     * Lädt den gespeicherten State (Sort-Mode + Filter) für eine Person
     * @param {string} person - 'ich' oder 'partner'
     */
    function loadSortModeForPerson(person) {
        if (!person || (person !== 'ich' && person !== 'partner')) {
            person = 'ich';
        }
        const state = savedStatePerPerson[person];
        currentFlatSortMode = state?.sortMode || 'changed';
        sortStack = state?.sortStack || ['changed'];
        // Lade sortDirections per-mode oder setze Defaults
        if (state?.sortDirections) {
            Object.assign(sortDirections, state.sortDirections);
        } else {
            sortDirections.value = true;
            sortDirections.name = true;
            sortDirections.id = true;
            sortDirections.status = true;
            sortDirections.changed = true;
        }
        showOnlyChangedNeeds = state?.showOnlyChanged || false;
        currentSortPerson = person;

        // Lade auch gelockte Hauptfragen für diese Person
        loadLockedHauptfragen(person);

        console.log('[AttributeSummaryCard] State geladen für', person, ':', { sortMode: currentFlatSortMode, sortStack, sortDescending: currentSortDescending, showOnlyChanged: showOnlyChangedNeeds });
    }

    /**
     * Wechselt die Person und speichert/lädt den State entsprechend
     * @param {string} newPerson - 'ich' oder 'partner'
     */
    function switchSortPerson(newPerson) {
        if (!newPerson || (newPerson !== 'ich' && newPerson !== 'partner')) {
            newPerson = 'ich';
        }
        if (newPerson === currentSortPerson) {
            return; // Keine Änderung nötig
        }
        // Speichere State der vorherigen Person
        saveSortModeForPerson(currentSortPerson);
        // Lade State der neuen Person
        loadSortModeForPerson(newPerson);
    }

    /**
     * Toggled den "Nur Geänderte" Filter und rendert die Liste neu
     */
    function toggleShowOnlyChanged() {
        showOnlyChangedNeeds = !showOnlyChangedNeeds;
        // Speichere auch für aktuelle Person
        savedStatePerPerson[currentSortPerson].showOnlyChanged = showOnlyChangedNeeds;

        // Automatisch auf "Geändert" sortieren wenn Filter aktiviert wird
        if (showOnlyChangedNeeds && currentFlatSortMode !== 'changed') {
            currentFlatSortMode = 'changed';
            savedStatePerPerson[currentSortPerson].sortMode = 'changed';
        }

        console.log('[AttributeSummaryCard] showOnlyChangedNeeds:', showOnlyChangedNeeds);
        reRenderFlatNeeds();
    }

    /**
     * Rendert die flache Bedürfnisliste neu (z.B. nach Sortierung oder Reset)
     */
    function reRenderFlatNeeds() {
        if (!currentFlatArchetyp || !currentFlatArchetypLabel) return;

        const container = document.querySelector('.flat-needs-container');
        if (!container) return;

        // Generiere neuen HTML
        const newHtml = renderAllNeedsFlat(currentFlatArchetyp, currentFlatArchetypLabel);

        // Ersetze Container
        const temp = document.createElement('div');
        temp.innerHTML = newHtml;
        const newContainer = temp.firstElementChild;

        if (newContainer) {
            container.replaceWith(newContainer);

            // Re-initialisiere Filter
            initDimensionFilter();

            // Event feuern damit externe Komponenten (z.B. ActiveFilterCard) ihre Filter anwenden können
            document.dispatchEvent(new CustomEvent('flatNeedsRendered', {
                bubbles: true,
                detail: { archetyp: currentFlatArchetyp }
            }));
        }
    }

    /**
     * Initialisiert den DimensionKategorieFilter im Container
     * DEAKTIVIERT für SSOT-Refactoring
     */
    function initDimensionFilter() {
        // FILTER DEAKTIVIERT für SSOT-Refactoring
        console.log('[AttributeSummaryCard] DimensionKategorieFilter DEAKTIVIERT für SSOT-Refactoring');

        // Verstecke Filter-Container falls vorhanden
        setTimeout(() => {
            const filterContainer = document.querySelector('#flat-needs-dimension-filter');
            if (filterContainer) {
                filterContainer.style.display = 'none';
            }
        }, 50);

        return;

        /* ORIGINAL CODE - DEAKTIVIERT:
        if (typeof DimensionKategorieFilter === 'undefined') {
            console.warn('[AttributeSummaryCard] DimensionKategorieFilter nicht geladen');
            return;
        }

        // Warte bis DOM bereit ist
        setTimeout(() => {
            const filterContainer = document.querySelector('#flat-needs-dimension-filter');
            if (!filterContainer) {
                console.warn('[AttributeSummaryCard] Filter container nicht gefunden');
                return;
            }

            // Rendere Filter
            const filterHtml = DimensionKategorieFilter.render('#flat-needs-dimension-filter');
            filterContainer.innerHTML = filterHtml;

            // Initialisiere Tree-View nach DOM-Insertion
            DimensionKategorieFilter.initTreeView();

            console.log('[AttributeSummaryCard] DimensionKategorieFilter initialisiert');
        }, 100);

        // Event-Listener nur einmal registrieren
        if (!window._dimensionFilterListenerAdded) {
            document.addEventListener('dimensionKategorieFilterChange', handleFilterChange);
            window._dimensionFilterListenerAdded = true;
        }
        */
    }

    /**
     * Handler für Filter-Änderungen
     */
    function handleFilterChange(event) {
        console.log('[AttributeSummaryCard] Filter geändert:', event.detail);
        // Re-render der Bedürfnisliste mit neuen Filtern
        reRenderFlatNeeds();
    }

    /**
     * Holt die GOD-Modifikatoren für ein Bedürfnis
     * @param {string} needId - #B-ID (z.B. '#B74')
     * @returns {Object|null} { gender: number, dominance: number, orientation: number, total: number } oder null
     */
    function getGodModifiersForNeed(needId) {
        // Ermittle aktuelle Person aus Kontext
        let currentPerson = 'ich';
        if (typeof window !== 'undefined' && window.currentProfileReviewContext?.person) {
            currentPerson = window.currentProfileReviewContext.person;
        }

        // Konvertiere #B-ID zu stringKey
        let stringKey = needId;
        if (needId.startsWith('#') && typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.getKey) {
            stringKey = BeduerfnisIds.getKey(needId) || needId;
        }

        // Hole aktuelle GOD-Einstellungen aus TiageState
        if (typeof TiageState === 'undefined') return null;
        const geschlecht = TiageState.get(`personDimensions.${currentPerson}.geschlecht`);
        const dominanz = TiageState.get(`personDimensions.${currentPerson}.dominanz`);
        const orientierung = TiageState.get(`personDimensions.${currentPerson}.orientierung`);

        // Hole Modifikatoren von TiageProfileStore
        if (typeof TiageProfileStore === 'undefined' || !TiageProfileStore.getNeedsModifiers) return null;
        const allMods = TiageProfileStore.getNeedsModifiers();
        if (!allMods) return null;

        // Baue Keys für Lookup
        let geschlechtKey = null;
        if (geschlecht?.primary && geschlecht?.secondary) {
            geschlechtKey = `${geschlecht.primary}-${geschlecht.secondary}`;
        } else if (geschlecht?.primary) {
            geschlechtKey = geschlecht.primary;
        }
        const dominanzKey = dominanz?.primary || null;
        const orientierungKey = orientierung?.primary || null;

        // Hole Modifikatoren für dieses Bedürfnis
        const genderMod = geschlechtKey && allMods.gender?.[geschlechtKey]?.[stringKey] || 0;
        const dominanceMod = dominanzKey && allMods.dominance?.[dominanzKey]?.[stringKey] || 0;
        const orientationMod = orientierungKey && allMods.orientation?.[orientierungKey]?.[stringKey] || 0;

        const total = genderMod + dominanceMod + orientationMod;
        if (total === 0) return null;

        return {
            gender: genderMod,
            dominance: dominanceMod,
            orientation: orientationMod,
            total: total
        };
    }

    /**
     * Rendert das GOD-Modifikator Badge für ein Bedürfnis
     * Zeigt die einzelnen Modifikatoren direkt auf der Card an (G:+5 D:+10 O:-5)
     * @param {string} needId - #B-ID
     * @returns {string} HTML für das Badge oder leerer String
     */
    function renderGodModifierBadge(needId) {
        const mods = getGodModifiersForNeed(needId);
        if (!mods) return '';

        // Baue die einzelnen Modifikator-Teile für direkte Anzeige
        const parts = [];
        if (mods.gender !== 0) {
            const val = mods.gender > 0 ? `+${mods.gender}` : `${mods.gender}`;
            const cls = mods.gender > 0 ? 'positive' : 'negative';
            parts.push(`<span class="god-mod-part god-mod-g ${cls}" title="Geschlecht">G:${val}</span>`);
        }
        if (mods.dominance !== 0) {
            const val = mods.dominance > 0 ? `+${mods.dominance}` : `${mods.dominance}`;
            const cls = mods.dominance > 0 ? 'positive' : 'negative';
            parts.push(`<span class="god-mod-part god-mod-d ${cls}" title="Dominanz">D:${val}</span>`);
        }
        if (mods.orientation !== 0) {
            const val = mods.orientation > 0 ? `+${mods.orientation}` : `${mods.orientation}`;
            const cls = mods.orientation > 0 ? 'positive' : 'negative';
            parts.push(`<span class="god-mod-part god-mod-o ${cls}" title="Orientierung">O:${val}</span>`);
        }

        if (parts.length === 0) return '';

        return `<span class="god-modifier-badge">${parts.join(' ')}</span>`;
    }

    /**
     * Rendert ein einzelnes Bedürfnis-Item für die flache Darstellung
     * @param {string} needId - Bedürfnis-ID
     * @param {string} label - Anzeige-Label
     * @param {number} value - Wert 0-100
     * @param {boolean} isLocked - Ob fixiert
     * @param {string|null} dimensionColor - Optional: Farbe für border-left (bei Kategorie-Sortierung)
     * @param {boolean} shouldHide - Ob durch DimensionKategorieFilter versteckt
     */
    function renderFlatNeedItem(needId, label, value, isLocked, dimensionColor, shouldHide = false) {
        // Bei Dimensionsfarbe: Border-left + CSS-Variable für Slider-Thumb
        const itemStyle = dimensionColor
            ? `style="border-left: 5px solid ${dimensionColor}; --dimension-color: ${dimensionColor};"`
            : '';
        const colorClass = dimensionColor ? ' has-dimension-color' : '';
        const isSelected = selectedNeeds.has(needId);
        const selectedClass = isSelected ? ' need-selected' : '';
        const filterHiddenClass = shouldHide ? ' dimension-filter-hidden' : '';
        // Slider-Track-Hintergrund: gefüllt bis zum Wert mit Dimensionsfarbe
        const sliderStyle = dimensionColor
            ? `style="background: ${getSliderFillGradient(dimensionColor, value)};"`
            : '';
        // Prüfe ob Wert geändert wurde (für Markierung und Filter)
        const valueChanged = isValueChanged(needId, value);
        const changedIndicator = valueChanged ? ' <span class="value-changed-indicator" title="Wert wurde geändert">*</span>' : '';
        // CSS-Klasse für geänderte Werte (visuelle Hervorhebung)
        const changedClass = valueChanged ? ' value-changed' : '';
        // R-Faktor Badge (zeigt zu welchem R-Faktor dieses Bedürfnis beiträgt)
        const rFactorBadge = renderRFactorBadge(needId, value);
        // GOD-Modifikator Badge (zeigt G/O/D Einfluss auf dieses Bedürfnis)
        const godModBadge = renderGodModifierBadge(needId);
        return `
        <div class="flat-need-item${isLocked ? ' need-locked' : ''}${colorClass}${selectedClass}${filterHiddenClass}${changedClass}" data-need="${needId}" ${itemStyle}
             onclick="AttributeSummaryCard.toggleNeedSelection('${needId}')">
            <div class="flat-need-header">
                <span class="flat-need-label clickable"
                      onclick="event.stopPropagation(); openNeedWithResonance('${needId}')"
                      title="Klicken für Resonanz-Details">${label}${changedIndicator}</span>
                <div class="flat-need-controls">
                    ${godModBadge}
                    ${rFactorBadge}
                    <span class="need-lock-icon"
                          onclick="event.stopPropagation(); AttributeSummaryCard.toggleFlatNeedLock('${needId}', this)"
                          title="Wert fixieren"></span>
                </div>
            </div>
            <div class="flat-need-slider-row">
                <input type="range" class="need-slider"
                       min="0" max="100" value="${value}"
                       oninput="AttributeSummaryCard.onFlatSliderInput('${needId}', this.value, this)"
                       onclick="event.stopPropagation()"
                       ${sliderStyle}
                       ${isLocked ? 'disabled' : ''}>
                <input type="text" class="flat-need-input" value="${value}" maxlength="3"
                       onchange="AttributeSummaryCard.updateFlatNeedValue('${needId}', this.value)"
                       onclick="event.stopPropagation()"
                       ${isLocked ? 'readonly' : ''}>
            </div>
        </div>`;
    }

    /**
     * Slider-Input-Handler für flache Darstellung
     * BULK-EDIT: Wenn das Bedürfnis markiert ist, werden alle markierten mit geändert
     */
    function onFlatSliderInput(needId, value, sliderElement) {
        const needObj = findNeedById(needId);
        if (needObj?.locked) return;

        const numValue = parseInt(value, 10);
        if (isNaN(numValue)) return;

        // BULK-EDIT: Wenn dieses Bedürfnis markiert ist, alle markierten aktualisieren
        if (selectedNeeds.has(needId) && selectedNeeds.size > 1) {
            updateAllSelectedNeedsUI(numValue, needId);
        }

        // Aktualisiere oder erstelle Bedürfnis
        upsertNeed(needId, { value: numValue });

        // Auto-Sort auf "changed" wenn Wert geändert wird (ohne Rerender)
        if (isValueChanged(needId, numValue) && currentFlatSortMode !== 'changed') {
            currentFlatSortMode = 'changed';
            savedStatePerPerson[currentSortPerson].sortMode = 'changed';
        }

        // Sync Input-Feld
        const needItem = sliderElement.closest('.flat-need-item');
        if (needItem) {
            const input = needItem.querySelector('.flat-need-input');
            if (input) input.value = numValue;

            // Slider-Track-Hintergrund aktualisieren mit Dimension-Farbe
            const dimColor = getDimensionColor(needId);
            if (dimColor) {
                sliderElement.style.background = getSliderFillGradient(dimColor, numValue, sliderElement);
            }

            // Changed-Indicator (*) aktualisieren
            updateChangedIndicator(needItem, needId, numValue);
        }

        // Event für Änderungstracking
        document.dispatchEvent(new CustomEvent('flatNeedChange', {
            bubbles: true,
            detail: { needId, value: numValue }
        }));

        // Aktualisiere den aggregierten Wert der übergeordneten Hauptfrage
        updateParentHauptfrageValue(needId);

        // Aktualisiere den Subtitle mit der neuen Geändert-Zählung
        updateLockedCountDisplay();
    }

    /**
     * BULK-EDIT: Aktualisiert alle markierten Bedürfnisse auf den gleichen Wert
     * @param {number} value - Der neue Wert
     * @param {string} excludeNeedId - Das Bedürfnis das gerade geändert wird (bereits aktualisiert)
     */
    function updateAllSelectedNeedsUI(value, excludeNeedId) {
        selectedNeeds.forEach(selectedNeedId => {
            if (selectedNeedId === excludeNeedId) return; // Skip das aktuelle

            const selectedNeedObj = findNeedById(selectedNeedId);
            if (selectedNeedObj?.locked) return; // Skip gesperrte

            // Update Daten
            upsertNeed(selectedNeedId, { value: value });

            // Update UI
            const selectedNeedItem = document.querySelector(`.flat-need-item[data-need="${selectedNeedId}"]`);
            if (selectedNeedItem) {
                const slider = selectedNeedItem.querySelector('.need-slider');
                const input = selectedNeedItem.querySelector('.flat-need-input');

                if (slider) {
                    slider.value = value;
                    // Slider-Track-Hintergrund aktualisieren
                    const dimColor = getDimensionColor(selectedNeedId);
                    if (dimColor) {
                        slider.style.background = getSliderFillGradient(dimColor, value, slider);
                    }
                }
                if (input) input.value = value;

                // Changed-Indicator aktualisieren
                updateChangedIndicator(selectedNeedItem, selectedNeedId, value);
            }

            // Event für Änderungstracking
            document.dispatchEvent(new CustomEvent('flatNeedChange', {
                bubbles: true,
                detail: { needId: selectedNeedId, value: value, bulk: true }
            }));

            // Aktualisiere Hauptfrage-Aggregation
            updateParentHauptfrageValue(selectedNeedId);
        });
    }

    /**
     * Aktualisiert den aggregierten Wert einer Hauptfrage in der UI
     * wenn eine ihrer Nuancen geändert wurde
     * @param {string} nuanceId - Die ID der geänderten Nuance
     */
    function updateParentHauptfrageValue(nuanceId) {
        if (typeof HauptfrageAggregation === 'undefined') return;

        // Finde die übergeordnete Hauptfrage
        const hauptfrage = HauptfrageAggregation.getHauptfrageForNuance(nuanceId);
        if (!hauptfrage) return;

        // Berechne den neuen aggregierten Wert
        const currentNeeds = {};
        flatNeeds.forEach(n => { currentNeeds[n.id] = n.value; });

        const aggregation = HauptfrageAggregation.aggregateHauptfrage(hauptfrage.id, currentNeeds);
        const newValue = aggregation.value;

        // Aktualisiere die UI
        const hauptfrageItem = document.querySelector(`.hauptfrage-item[data-hauptfrage-id="${hauptfrage.id}"]`);
        if (hauptfrageItem) {
            const bar = hauptfrageItem.querySelector('.hauptfrage-bar');
            const valueSpan = hauptfrageItem.querySelector('.hauptfrage-value');

            if (bar) {
                bar.style.width = `${newValue || 0}%`;
            }
            if (valueSpan) {
                valueSpan.textContent = newValue !== null ? newValue : '-';
            }

            // NEU: Aktualisiere auch Slider und Input (wenn nicht gelockt)
            if (!lockedHauptfragen.has(hauptfrage.id)) {
                const slider = hauptfrageItem.querySelector('.hauptfrage-slider');
                const input = hauptfrageItem.querySelector('.hauptfrage-input');

                if (slider && newValue !== null) {
                    slider.value = newValue;
                    // Slider-Track-Hintergrund aktualisieren
                    const dimColor = getDimensionColor(hauptfrage.id);
                    if (dimColor) {
                        slider.style.background = getSliderFillGradient(dimColor, newValue, slider);
                    }
                }
                if (input && newValue !== null) {
                    input.value = newValue;
                }
            }

            // Aktualisiere die Änderungsmarkierung für diese Hauptfrage
            const nuancen = hauptfrage.nuancen || [];
            const changedNuancenCount = nuancen.filter(nId => {
                const nuanceObj = findNeedById(nId);
                return nuanceObj && isValueChanged(nId, nuanceObj.value);
            }).length;
            const hasChangedNuancen = changedNuancenCount > 0;

            // CSS-Klasse aktualisieren
            if (hasChangedNuancen) {
                hauptfrageItem.classList.add('has-changed-nuancen');
            } else {
                hauptfrageItem.classList.remove('has-changed-nuancen');
            }

            // Sternchen-Indikator aktualisieren
            const labelSpan = hauptfrageItem.querySelector('.hauptfrage-label');
            if (labelSpan) {
                let indicator = labelSpan.querySelector('.hauptfrage-changed-indicator');
                if (hasChangedNuancen) {
                    if (!indicator) {
                        indicator = document.createElement('span');
                        indicator.className = 'hauptfrage-changed-indicator';
                        indicator.textContent = '*';
                        labelSpan.appendChild(indicator);
                    }
                    indicator.title = `${changedNuancenCount} Nuance(n) geändert`;
                } else if (indicator) {
                    indicator.remove();
                }
            }
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // HAUPTFRAGEN-SLIDER UND LOCK FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Toggle Lock für eine Hauptfrage
     * Wenn gelockt: Slider ist editierbar, Nuancen sind gesperrt
     * Wenn entsperrt: Slider zeigt aggregierten Wert, Nuancen sind editierbar
     * @param {string} hauptfrageId - Die #B-ID der Hauptfrage
     * @param {HTMLElement} lockElement - Das Lock-Icon-Element
     */
    function toggleHauptfrageLock(hauptfrageId, lockElement) {
        const isCurrentlyLocked = lockedHauptfragen.has(hauptfrageId);
        const newLockState = !isCurrentlyLocked;

        if (newLockState) {
            lockedHauptfragen.add(hauptfrageId);
        } else {
            lockedHauptfragen.delete(hauptfrageId);
        }

        console.log(`[AttributeSummaryCard] Hauptfrage ${hauptfrageId} Lock: ${newLockState}`);

        // Speichere Lock-Status in TiageState
        if (typeof TiageState !== 'undefined') {
            let currentPerson = 'ich';
            if (window.currentProfileReviewContext && window.currentProfileReviewContext.person) {
                currentPerson = window.currentProfileReviewContext.person;
            }

            // Speichere gelockte Hauptfragen als Array
            const lockedArray = Array.from(lockedHauptfragen);
            TiageState.set(`profileReview.${currentPerson}.lockedHauptfragen`, lockedArray);

            // Wenn gelockt: Speichere auch den aktuellen Wert
            if (newLockState) {
                const hauptfrageItem = document.querySelector(`.hauptfrage-item[data-hauptfrage-id="${hauptfrageId}"]`);
                if (hauptfrageItem) {
                    const input = hauptfrageItem.querySelector('.hauptfrage-input');
                    const currentValue = parseInt(input?.value, 10) || 50;
                    TiageState.set(`profileReview.${currentPerson}.lockedHauptfragenValues.${hauptfrageId}`, currentValue);
                }
            }
        }

        // UI aktualisieren - komplettes Re-Render für konsistente Darstellung
        reRenderFlatNeeds();
    }

    /**
     * Handler für Hauptfrage-Slider Input
     * Erlaubt wenn: Hauptfrage NICHT gelockt UND (keine Nuancen ODER nicht alle Nuancen gelockt)
     * @param {string} hauptfrageId - Die #B-ID der Hauptfrage
     * @param {string|number} value - Der neue Slider-Wert
     * @param {HTMLElement} sliderElement - Das Slider-Element
     */
    function onHauptfrageSliderInput(hauptfrageId, value, sliderElement) {
        // Prüfe ob Hauptfrage Nuancen hat
        const hasNuancen = checkHauptfrageHasNuancen(hauptfrageId);

        // Prüfe ob Hauptfrage explizit gelockt ist
        if (lockedHauptfragen.has(hauptfrageId)) {
            return; // Gelockt = nicht editierbar
        }

        // Prüfe ob alle Nuancen gelockt sind
        if (hasNuancen && areAllNuancenLocked(hauptfrageId)) {
            return; // Alle Nuancen gelockt = nicht editierbar
        }

        const numValue = parseInt(value, 10);
        if (isNaN(numValue)) return;

        // Sync Input-Feld
        const hauptfrageItem = sliderElement.closest('.hauptfrage-item');
        if (hauptfrageItem) {
            const input = hauptfrageItem.querySelector('.hauptfrage-input');
            if (input) input.value = numValue;

            // Slider-Track-Hintergrund aktualisieren
            const dimColor = getDimensionColor(hauptfrageId);
            if (dimColor) {
                sliderElement.style.background = getSliderFillGradient(dimColor, numValue, sliderElement);
            }
        }

        // Wenn Nuancen vorhanden: Nuancen anpassen um Zielwert zu erreichen
        // Begrenzt durch gelockte Nuancen (max/min erreichbarer Wert)
        if (hasNuancen) {
            const result = adjustNuancenToTarget(hauptfrageId, numValue, sliderElement, hauptfrageItem);
            if (result.handled) {
                return; // Nuancen wurden angepasst
            }
        }

        // Speichere den Wert in TiageState und flatNeeds (nur für Hauptfragen OHNE Nuancen)
        if (typeof TiageState !== 'undefined') {
            let currentPerson = 'ich';
            if (window.currentProfileReviewContext && window.currentProfileReviewContext.person) {
                currentPerson = window.currentProfileReviewContext.person;
            }
            TiageState.set(`profileReview.${currentPerson}.lockedHauptfragenValues.${hauptfrageId}`, numValue);
        }

        upsertNeed(hauptfrageId, { value: numValue });

        // Event für externe Listener
        document.dispatchEvent(new CustomEvent('hauptfrageValueChange', {
            bubbles: true,
            detail: { hauptfrageId, value: numValue, isLocked: lockedHauptfragen.has(hauptfrageId), hasNuancen }
        }));

        // Aktualisiere den Subtitle mit der neuen Geändert-Zählung (für Hauptfragen ohne Nuancen)
        updateLockedCountDisplay();
    }

    /**
     * Berechnet den aggregierten Wert der Nuancen einer Hauptfrage.
     * @param {string} hauptfrageId - Die #B-ID der Hauptfrage
     * @returns {number|null} Der aggregierte Wert oder null
     */
    function getAggregatedValueForHauptfrage(hauptfrageId) {
        if (typeof HauptfrageAggregation === 'undefined') return null;

        const currentNeeds = {};
        flatNeeds.forEach(n => { currentNeeds[n.id] = n.value; });

        const aggregation = HauptfrageAggregation.aggregateHauptfrage(hauptfrageId, currentNeeds);
        return aggregation.value;
    }

    /**
     * Berechnet den min/max erreichbaren aggregierten Wert basierend auf gelockten Nuancen.
     * @param {string} hauptfrageId - Die #B-ID der Hauptfrage
     * @returns {Object} { min, max, hasLockedNuancen }
     */
    function getAggregatedValueLimits(hauptfrageId) {
        if (typeof HauptfrageAggregation === 'undefined') return { min: 0, max: 100, hasLockedNuancen: false };

        const hauptfragen = HauptfrageAggregation.getHauptfragen();
        const hauptfrage = hauptfragen[hauptfrageId];

        if (!hauptfrage || !hauptfrage.nuancen || hauptfrage.nuancen.length === 0) {
            return { min: 0, max: 100, hasLockedNuancen: false };
        }

        // Sammle gelockte und nicht-gelockte Nuancen
        const lockedNuancen = [];
        const unlockedNuancen = [];

        for (const nuanceId of hauptfrage.nuancen) {
            const nuanceObj = findNeedById(nuanceId);
            if (nuanceObj?.locked) {
                lockedNuancen.push({ id: nuanceId, value: nuanceObj.value ?? 50 });
            } else {
                unlockedNuancen.push({ id: nuanceId, value: nuanceObj?.value ?? 50 });
            }
        }

        if (lockedNuancen.length === 0) {
            // Keine gelockten Nuancen = voller Bereich
            return { min: 0, max: 100, hasLockedNuancen: false };
        }

        // Berechne Min: alle nicht-gelockten auf 0
        const minNeeds = {};
        flatNeeds.forEach(n => { minNeeds[n.id] = n.value; });
        unlockedNuancen.forEach(n => { minNeeds[n.id] = 0; });
        const minAgg = HauptfrageAggregation.aggregateHauptfrage(hauptfrageId, minNeeds);

        // Berechne Max: alle nicht-gelockten auf 100
        const maxNeeds = {};
        flatNeeds.forEach(n => { maxNeeds[n.id] = n.value; });
        unlockedNuancen.forEach(n => { maxNeeds[n.id] = 100; });
        const maxAgg = HauptfrageAggregation.aggregateHauptfrage(hauptfrageId, maxNeeds);

        return {
            min: minAgg.value ?? 0,
            max: maxAgg.value ?? 100,
            hasLockedNuancen: true
        };
    }

    /**
     * Passt die nicht-gelockten Nuancen einer Hauptfrage an, um den Zielwert zu erreichen.
     * Begrenzt den Slider auf den erreichbaren Bereich wenn Nuancen gelockt sind.
     * @param {string} hauptfrageId - Die #B-ID der Hauptfrage
     * @param {number} targetValue - Der gewünschte Zielwert
     * @param {HTMLElement} sliderElement - Das Slider-Element
     * @param {HTMLElement} hauptfrageItem - Das Hauptfrage-Container-Element
     * @returns {Object} { handled: boolean, finalValue: number }
     */
    function adjustNuancenToTarget(hauptfrageId, targetValue, sliderElement, hauptfrageItem) {
        if (typeof HauptfrageAggregation === 'undefined') return { handled: false };

        const hauptfragen = HauptfrageAggregation.getHauptfragen();
        const hauptfrage = hauptfragen[hauptfrageId];

        if (!hauptfrage || !hauptfrage.nuancen || hauptfrage.nuancen.length === 0) {
            return { handled: false };
        }

        // Hole die Grenzen basierend auf gelockten Nuancen
        const limits = getAggregatedValueLimits(hauptfrageId);

        // Begrenze den Zielwert auf den erreichbaren Bereich
        let clampedTarget = Math.max(limits.min, Math.min(limits.max, targetValue));
        clampedTarget = Math.round(clampedTarget);

        // Sammle nicht-gelockte Nuancen
        const unlockedNuancen = [];
        for (const nuanceId of hauptfrage.nuancen) {
            const nuanceObj = findNeedById(nuanceId);
            if (!nuanceObj?.locked) {
                unlockedNuancen.push({
                    id: nuanceId,
                    value: nuanceObj?.value ?? 50
                });
            }
        }

        if (unlockedNuancen.length === 0) {
            // Alle gelockt - zeige nur aktuellen Wert
            const currentValue = getAggregatedValueForHauptfrage(hauptfrageId);
            updateHauptfrageUI(sliderElement, hauptfrageItem, hauptfrageId, currentValue);
            return { handled: true, finalValue: currentValue };
        }

        // Spezialfall: Bei Zielwert 0 oder 100 alle Nuancen direkt setzen
        // ABER nur wenn ALLE Nuancen unlocked sind (keine gelockten Nuancen)
        // (vermeidet Rundungsprobleme wie 99+100/2 = 99.5 → 100)
        if ((clampedTarget === 0 || clampedTarget === 100) && !limits.hasLockedNuancen) {
            for (const nuance of unlockedNuancen) {
                nuance.value = clampedTarget;
            }
            // Finale Werte in State und UI übertragen
            for (const nuance of unlockedNuancen) {
                updateNuanceSlider(nuance.id, nuance.value);
            }
            updateHauptfrageUI(sliderElement, hauptfrageItem, hauptfrageId, clampedTarget);
            return { handled: true, finalValue: clampedTarget };
        }

        // Iterative Anpassung der nicht-gelockten Nuancen
        const maxIterations = 20;
        let iteration = 0;

        while (iteration < maxIterations) {
            // Berechne aktuellen aggregierten Wert
            const currentNeeds = {};
            flatNeeds.forEach(n => { currentNeeds[n.id] = n.value; });
            unlockedNuancen.forEach(n => { currentNeeds[n.id] = n.value; });

            const aggregation = HauptfrageAggregation.aggregateHauptfrage(hauptfrageId, currentNeeds);
            const currentValue = aggregation.value;

            if (currentValue === null) break;

            const diff = clampedTarget - currentValue;

            // Ziel erreicht? (Toleranz: 0.5)
            if (Math.abs(diff) < 0.5) break;

            // Finde anpassbare Nuancen (nicht an Grenzen)
            const adjustable = unlockedNuancen.filter(n => {
                if (diff > 0) return n.value < 100;
                return n.value > 0;
            });

            if (adjustable.length === 0) break;

            // Verteile Differenz
            const diffPerNuance = diff / adjustable.length;
            let anyChanged = false;

            for (const nuance of adjustable) {
                const oldValue = nuance.value;
                let newValue = nuance.value + diffPerNuance * 1.2; // Leichte Überkorrektur für schnellere Konvergenz
                newValue = Math.max(0, Math.min(100, Math.round(newValue)));

                if (newValue !== oldValue) {
                    nuance.value = newValue;
                    anyChanged = true;
                }
            }

            if (!anyChanged) break;
            iteration++;
        }

        // Finale Werte in State und UI übertragen
        for (const nuance of unlockedNuancen) {
            updateNuanceSlider(nuance.id, nuance.value);
        }

        // Berechne finalen aggregierten Wert
        const finalValue = getAggregatedValueForHauptfrage(hauptfrageId);

        // Aktualisiere Hauptfrage UI
        updateHauptfrageUI(sliderElement, hauptfrageItem, hauptfrageId, finalValue);

        // FIX: Aktualisiere den * Indikator der Hauptfrage sofort
        // (bisher wurde dieser nur beim Aufklappen berechnet)
        updateHauptfrageChangedIndicator(hauptfrageId, hauptfrageItem);

        // Aktualisiere den Subtitle mit der neuen Geändert-Zählung
        updateLockedCountDisplay();

        return { handled: true, finalValue };
    }

    /**
     * Aktualisiert die UI-Elemente einer Hauptfrage (Slider, Input, Track)
     */
    function updateHauptfrageUI(sliderElement, hauptfrageItem, hauptfrageId, value) {
        if (value === null) return;

        sliderElement.value = value;

        if (hauptfrageItem) {
            const input = hauptfrageItem.querySelector('.hauptfrage-input');
            if (input) input.value = value;
        }

        const dimColor = getDimensionColor(hauptfrageId);
        if (dimColor) {
            sliderElement.style.background = getSliderFillGradient(dimColor, value, sliderElement);
        }
    }

    /**
     * Aktualisiert den * Indikator einer Hauptfrage basierend auf geänderten Nuancen
     * FIX v1.8.568: Diese Funktion wird jetzt auch bei Hauptfrage-Slider-Änderungen aufgerufen
     * @param {string} hauptfrageId - Die #B-ID der Hauptfrage
     * @param {HTMLElement|null} hauptfrageItem - Das DOM-Element (optional, wird gesucht wenn nicht übergeben)
     */
    function updateHauptfrageChangedIndicator(hauptfrageId, hauptfrageItem) {
        if (typeof HauptfrageAggregation === 'undefined') return;

        const hauptfragen = HauptfrageAggregation.getHauptfragen();
        const hauptfrage = hauptfragen[hauptfrageId];
        if (!hauptfrage) return;

        // Finde das DOM-Element wenn nicht übergeben
        const item = hauptfrageItem || document.querySelector(`.hauptfrage-item[data-hauptfrage-id="${hauptfrageId}"]`);
        if (!item) return;

        // Zähle geänderte Nuancen
        const nuancen = hauptfrage.nuancen || [];
        const changedNuancenCount = nuancen.filter(nId => {
            const nuanceObj = findNeedById(nId);
            return nuanceObj && isValueChanged(nId, nuanceObj.value);
        }).length;
        const hasChangedNuancen = changedNuancenCount > 0;

        // CSS-Klasse aktualisieren
        if (hasChangedNuancen) {
            item.classList.add('has-changed-nuancen');
        } else {
            item.classList.remove('has-changed-nuancen');
        }

        // Sternchen-Indikator aktualisieren
        const labelSpan = item.querySelector('.hauptfrage-label');
        if (labelSpan) {
            let indicator = labelSpan.querySelector('.hauptfrage-changed-indicator');
            if (hasChangedNuancen) {
                if (!indicator) {
                    indicator = document.createElement('span');
                    indicator.className = 'hauptfrage-changed-indicator';
                    indicator.textContent = '*';
                    labelSpan.appendChild(indicator);
                }
                indicator.title = `${changedNuancenCount} Nuance(n) geändert`;
            } else if (indicator) {
                indicator.remove();
            }
        }

        // Nuancen-Status-Info aktualisieren (rechts neben der Nuancen-Anzahl)
        const nuancenCountSpan = item.querySelector('.hauptfrage-nuancen-count');
        if (nuancenCountSpan && nuancen.length > 0) {
            // Zähle gelockte Nuancen
            const lockedNuancenCount = nuancen.filter(nId => {
                const nuanceObj = findNeedById(nId);
                return nuanceObj?.locked;
            }).length;

            // Baue Status-Info zusammen
            const statusParts = [];
            if (lockedNuancenCount > 0) statusParts.push(`${lockedNuancenCount}🔒`);
            if (changedNuancenCount > 0) statusParts.push(`${changedNuancenCount}*`);

            // Entferne alte Status-Info und füge neue hinzu
            const existingStatusInfo = nuancenCountSpan.querySelector('.nuancen-status-info');
            if (existingStatusInfo) existingStatusInfo.remove();

            if (statusParts.length > 0) {
                const statusInfoSpan = document.createElement('span');
                statusInfoSpan.className = 'nuancen-status-info';
                statusInfoSpan.textContent = ' ' + statusParts.join(' ');
                nuancenCountSpan.appendChild(statusInfoSpan);
            }
        }
    }

    /**
     * Aktualisiert einen einzelnen Nuance-Slider (Wert, UI, State)
     * @param {string} nuanceId - Die #B-ID der Nuance
     * @param {number} newValue - Der neue Wert
     */
    function updateNuanceSlider(nuanceId, newValue) {
        // Speichere den Wert
        upsertNeed(nuanceId, { value: newValue });

        // Finde das DOM-Element und aktualisiere die UI
        const nuanceItem = document.querySelector(`.flat-need-item[data-need="${nuanceId}"]`);
        if (nuanceItem) {
            const slider = nuanceItem.querySelector('.need-slider');
            const input = nuanceItem.querySelector('.flat-need-input');

            if (slider) {
                slider.value = newValue;
                // Slider-Track-Hintergrund aktualisieren
                const dimColor = getDimensionColor(nuanceId);
                if (dimColor) {
                    slider.style.background = getSliderFillGradient(dimColor, newValue, slider);
                }
            }
            if (input) {
                input.value = newValue;
            }

            // Changed-Indicator aktualisieren
            updateChangedIndicator(nuanceItem, nuanceId, newValue);
        }

        // Event für Änderungstracking
        document.dispatchEvent(new CustomEvent('flatNeedChange', {
            bubbles: true,
            detail: { needId: nuanceId, value: newValue, fromHauptfrage: true }
        }));
    }

    /**
     * Prüft ob eine Hauptfrage Nuancen hat
     * @param {string} hauptfrageId - Die #B-ID der Hauptfrage
     * @returns {boolean} True wenn Nuancen vorhanden
     */
    function checkHauptfrageHasNuancen(hauptfrageId) {
        if (typeof HauptfrageAggregation === 'undefined') return true; // Fallback: annehmen dass Nuancen existieren

        const hauptfragen = HauptfrageAggregation.getHauptfragen();
        const hauptfrage = hauptfragen[hauptfrageId];

        if (!hauptfrage) return true; // Fallback

        return (hauptfrage.nuancen && hauptfrage.nuancen.length > 0);
    }

    /**
     * Prüft ob ALLE Nuancen einer Hauptfrage gelockt sind
     * @param {string} hauptfrageId - Die #B-ID der Hauptfrage
     * @returns {boolean} True wenn alle Nuancen gelockt sind
     */
    function areAllNuancenLocked(hauptfrageId) {
        if (typeof HauptfrageAggregation === 'undefined') return false;

        const hauptfragen = HauptfrageAggregation.getHauptfragen();
        const hauptfrage = hauptfragen[hauptfrageId];

        if (!hauptfrage || !hauptfrage.nuancen || hauptfrage.nuancen.length === 0) {
            return false; // Keine Nuancen = nicht "alle gelockt"
        }

        return hauptfrage.nuancen.every(nuanceId => {
            const nuanceObj = findNeedById(nuanceId);
            return nuanceObj?.locked === true;
        });
    }

    /**
     * Aktualisiert den Wert einer Hauptfrage (via Input-Feld)
     * Erlaubt wenn: keine Nuancen (direkter Wert)
     * @param {string} hauptfrageId - Die #B-ID der Hauptfrage
     * @param {string|number} value - Der neue Wert
     */
    function updateHauptfrageValue(hauptfrageId, value) {
        // Prüfe ob Hauptfrage Nuancen hat
        const hasNuancen = checkHauptfrageHasNuancen(hauptfrageId);

        // Prüfe ob Hauptfrage explizit gelockt ist
        if (lockedHauptfragen.has(hauptfrageId)) {
            return; // Gelockt = nicht editierbar
        }

        // Prüfe ob alle Nuancen gelockt sind
        if (hasNuancen && areAllNuancenLocked(hauptfrageId)) {
            return; // Alle Nuancen gelockt = nicht editierbar
        }

        const numValue = parseInt(value, 10);
        if (isNaN(numValue) || numValue < 0 || numValue > 100) return;

        const hauptfrageItem = document.querySelector(`.hauptfrage-item[data-hauptfrage-id="${hauptfrageId}"]`);
        const slider = hauptfrageItem?.querySelector('.hauptfrage-slider');

        // Wenn Nuancen vorhanden: Nuancen anpassen um Zielwert zu erreichen
        if (hasNuancen && slider) {
            const result = adjustNuancenToTarget(hauptfrageId, numValue, slider, hauptfrageItem);
            if (result.handled) {
                return; // Nuancen wurden angepasst
            }
        }

        // Sync Slider (nur für Hauptfragen OHNE Nuancen)
        if (hauptfrageItem && slider) {
            slider.value = numValue;

            const dimColor = getDimensionColor(hauptfrageId);
            if (dimColor) {
                slider.style.background = getSliderFillGradient(dimColor, numValue, slider);
            }
        }

        // Speichere den Wert in TiageState und flatNeeds
        if (typeof TiageState !== 'undefined') {
            let currentPerson = 'ich';
            if (window.currentProfileReviewContext && window.currentProfileReviewContext.person) {
                currentPerson = window.currentProfileReviewContext.person;
            }
            TiageState.set(`profileReview.${currentPerson}.lockedHauptfragenValues.${hauptfrageId}`, numValue);
        }

        upsertNeed(hauptfrageId, { value: numValue });

        // Event für externe Listener
        document.dispatchEvent(new CustomEvent('hauptfrageValueChange', {
            bubbles: true,
            detail: { hauptfrageId, value: numValue, isLocked: lockedHauptfragen.has(hauptfrageId), hasNuancen }
        }));

        // Aktualisiere den Subtitle mit der neuen Geändert-Zählung (für Hauptfragen ohne Nuancen)
        updateLockedCountDisplay();
    }

    /**
     * Prüft ob eine Nuance durch ihre Hauptfrage gelockt ist
     * @param {string} nuanceId - Die #B-ID der Nuance
     * @returns {boolean} True wenn die übergeordnete Hauptfrage gelockt ist
     */
    function isNuanceLockedByHauptfrage(nuanceId) {
        if (typeof HauptfrageAggregation === 'undefined') return false;

        const hauptfrage = HauptfrageAggregation.getHauptfrageForNuance(nuanceId);
        if (!hauptfrage) return false;

        return lockedHauptfragen.has(hauptfrage.id);
    }

    /**
     * Lädt gelockte Hauptfragen aus TiageState
     * @param {string} person - 'ich' oder 'partner'
     */
    function loadLockedHauptfragen(person) {
        lockedHauptfragen.clear();

        if (typeof TiageState !== 'undefined') {
            const lockedArray = TiageState.get(`profileReview.${person}.lockedHauptfragen`);
            if (Array.isArray(lockedArray)) {
                lockedArray.forEach(id => lockedHauptfragen.add(id));
                console.log(`[AttributeSummaryCard] ${lockedHauptfragen.size} gelockte Hauptfragen geladen für ${person}`);
            }
        }
    }

    /**
     * Gibt den gelockten Wert einer Hauptfrage zurück (oder null wenn nicht gelockt)
     * @param {string} hauptfrageId - Die #B-ID der Hauptfrage
     * @returns {number|null} Der gelockte Wert oder null
     */
    function getLockedHauptfrageValue(hauptfrageId) {
        if (!lockedHauptfragen.has(hauptfrageId)) return null;

        if (typeof TiageState !== 'undefined') {
            let currentPerson = 'ich';
            if (window.currentProfileReviewContext && window.currentProfileReviewContext.person) {
                currentPerson = window.currentProfileReviewContext.person;
            }
            return TiageState.get(`profileReview.${currentPerson}.lockedHauptfragenValues.${hauptfrageId}`) || null;
        }

        return null;
    }

    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Aktualisiert einen Bedürfniswert in der flachen Darstellung
     */
    function updateFlatNeedValue(needId, value) {
        const needObj = findNeedById(needId);
        if (needObj?.locked) return;

        const numValue = parseInt(value, 10);
        if (isNaN(numValue) || numValue < 0 || numValue > 100) return;

        // Aktualisiere oder erstelle Bedürfnis
        upsertNeed(needId, { value: numValue });

        // Auto-Sort auf "changed" wenn Wert geändert wird
        if (isValueChanged(needId, numValue) && currentFlatSortMode !== 'changed') {
            currentFlatSortMode = 'changed';
            savedStatePerPerson[currentSortPerson].sortMode = 'changed';
        }

        // Sync Slider
        const needItem = document.querySelector(`.flat-need-item[data-need="${needId}"]`);
        if (needItem) {
            const slider = needItem.querySelector('.need-slider');
            if (slider) slider.value = numValue;

            // Changed-Indicator (*) aktualisieren
            updateChangedIndicator(needItem, needId, numValue);
        }

        // Event
        document.dispatchEvent(new CustomEvent('flatNeedChange', {
            bubbles: true,
            detail: { needId, value: numValue }
        }));

        // Aktualisiere den aggregierten Wert der übergeordneten Hauptfrage
        updateParentHauptfrageValue(needId);

        // Aktualisiere den Subtitle mit der neuen Geändert-Zählung
        updateLockedCountDisplay();
    }

    /**
     * Toggle Lock für ein Bedürfnis in der flachen Darstellung
     * BULK-EDIT: Wenn das Bedürfnis markiert ist, werden alle markierten mit gesperrt/entsperrt
     */
    function toggleFlatNeedLock(needId, lockElement) {
        console.log('[DEBUG toggleFlatNeedLock] Called with:', needId);
        const needObj = findNeedById(needId);
        const newLockState = needObj ? !needObj.locked : true;

        // BULK-EDIT: Wenn dieses Bedürfnis markiert ist, alle markierten sperren/entsperren
        if (selectedNeeds.has(needId) && selectedNeeds.size > 1) {
            lockSelectedNeeds(newLockState);
            return; // lockSelectedNeeds handled alles
        }

        // Aktualisiere oder erstelle Bedürfnis
        upsertNeed(needId, { locked: newLockState });
        const isLocked = newLockState;
        console.log('[DEBUG toggleFlatNeedLock] isLocked:', isLocked);

        // Update UI
        const needItem = lockElement.closest('.flat-need-item');
        if (needItem) {
            needItem.classList.toggle('need-locked', isLocked);

            const slider = needItem.querySelector('.need-slider');
            const input = needItem.querySelector('.flat-need-input');

            if (slider) slider.disabled = isLocked;
            if (input) input.readOnly = isLocked;
        }

        // ═══════════════════════════════════════════════════════════════════════════
        // DIREKT: Speichere Lock-Status in TiageState (SSOT)
        // ═══════════════════════════════════════════════════════════════════════════
        if (typeof TiageState !== 'undefined') {
            // Ermittle aktuelle Person aus Kontext
            var currentPerson = 'ich';
            if (window.currentProfileReviewContext && window.currentProfileReviewContext.person) {
                currentPerson = window.currentProfileReviewContext.person;
            }

            if (isLocked) {
                // Beim Sperren: Speichere Wert
                const currentValue = needObj ? needObj.value : 50;
                TiageState.lockNeed(currentPerson, needId, currentValue);
                console.log('[toggleFlatNeedLock] Gesperrt & gespeichert:', needId, '=', currentValue, 'für', currentPerson);
            } else {
                // Beim Entsperren: Entferne aus lockedNeeds
                TiageState.unlockNeed(currentPerson, needId);
                console.log('[toggleFlatNeedLock] Entsperrt:', needId, 'für', currentPerson);
            }
            TiageState.saveToStorage();

            // Toast-Meldung
            showLockToast(isLocked ? 'Wert gesperrt & gespeichert' : 'Wert entsperrt');

            // Aktualisiere die "davon gesperrt: X" Anzeige im Subtitle
            updateLockedCountDisplay();
        }

        // Event (für andere Listener)
        document.dispatchEvent(new CustomEvent('flatNeedLockChange', {
            bubbles: true,
            detail: { needId, locked: isLocked }
        }));

        // NEU: Prüfe ob diese Nuance zu einer Hauptfrage gehört und aktualisiere deren Lock-Status
        if (typeof HauptfrageAggregation !== 'undefined') {
            const hauptfrage = HauptfrageAggregation.getHauptfrageForNuance(needId);
            if (hauptfrage) {
                // Re-render um den "auto-locked" Status der Hauptfrage zu aktualisieren
                updateHauptfrageLockDisplay(hauptfrage.id);
            }
        }
    }

    /**
     * Aktualisiert die Lock-Anzeige einer Hauptfrage (nach Nuancen-Lock-Änderung)
     * @param {string} hauptfrageId - Die #B-ID der Hauptfrage
     */
    function updateHauptfrageLockDisplay(hauptfrageId) {
        const hauptfrageItem = document.querySelector(`.hauptfrage-item[data-hauptfrage-id="${hauptfrageId}"]`);
        if (!hauptfrageItem) return;

        const isHauptfrageLocked = lockedHauptfragen.has(hauptfrageId);
        const allNuancenLocked = areAllNuancenLocked(hauptfrageId);
        const isEffectivelyLocked = isHauptfrageLocked || allNuancenLocked;

        // Update CSS-Klassen
        hauptfrageItem.classList.toggle('hauptfrage-locked', isEffectivelyLocked);
        hauptfrageItem.classList.toggle('locked-by-nuancen', allNuancenLocked && !isHauptfrageLocked);

        // Update Lock-Icon
        const lockIcon = hauptfrageItem.querySelector('.hauptfrage-lock-icon');
        if (lockIcon) {
            lockIcon.classList.toggle('locked', isEffectivelyLocked);
            lockIcon.classList.toggle('auto-locked', allNuancenLocked && !isHauptfrageLocked);

            // Update Tooltip
            if (allNuancenLocked && !isHauptfrageLocked) {
                lockIcon.title = 'Alle Nuancen gesperrt - Hauptfrage automatisch fixiert';
            } else if (isHauptfrageLocked) {
                lockIcon.title = 'Entsperren (Nuancen wieder editierbar)';
            } else {
                lockIcon.title = 'Sperren (fixiert Wert, sperrt Nuancen)';
            }
        }

        // Update Slider und Input
        const slider = hauptfrageItem.querySelector('.hauptfrage-slider');
        const input = hauptfrageItem.querySelector('.hauptfrage-input');
        const hasNuancen = checkHauptfrageHasNuancen(hauptfrageId);
        const sliderDisabled = hasNuancen && isEffectivelyLocked;

        if (slider) slider.disabled = sliderDisabled;
        if (input) input.readOnly = sliderDisabled;
    }

    /**
     * Zeigt kurze Toast-Meldung für Lock-Aktionen
     */
    function showLockToast(message) {
        var existing = document.getElementById('lockSavedToast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.id = 'lockSavedToast';
        toast.textContent = message;
        toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:#22c55e;color:#fff;padding:8px 16px;border-radius:6px;font-size:13px;z-index:10000;opacity:0;transition:opacity 0.2s;box-shadow:0 2px 8px rgba(0,0,0,0.3);';
        document.body.appendChild(toast);

        requestAnimationFrame(function() { toast.style.opacity = '1'; });
        setTimeout(function() {
            toast.style.opacity = '0';
            setTimeout(function() { toast.remove(); }, 200);
        }, 1500);
    }

    /**
     * Aktualisiert die Anzeige der gesperrten und geänderten Bedürfnisse im Subtitle
     * Wird nach Lock/Unlock-Aktionen und nach Wertänderungen aufgerufen
     * FIX v1.8.568: Verwendet calculateTotalLockedCount für korrekte Zählung
     */
    function updateLockedCountDisplay() {
        // Ermittle aktuelle Person aus Kontext
        let currentPerson = 'ich';
        if (window.currentProfileReviewContext && window.currentProfileReviewContext.person) {
            currentPerson = window.currentProfileReviewContext.person;
        }

        // FIX v1.8.568: Nutze zentrale Hilfsfunktion für korrekte Zählung
        const lockedNeedsCount = calculateTotalLockedCount(currentPerson);

        // Zähle geänderte Bedürfnisse
        const changedNeedsCount = flatNeeds.filter(need => isValueChanged(need.id, need.value)).length;

        // Finde das Subtitle-Element und aktualisiere den Text
        const subtitleElement = document.querySelector('.flat-needs-subtitle');
        if (subtitleElement) {
            let currentText = subtitleElement.textContent;
            // Ersetze den "davon gesperrt: X" Teil
            currentText = currentText.replace(/davon gesperrt: \d+/, `davon gesperrt: ${lockedNeedsCount}`);
            // Ersetze oder füge den "geändert: X" Teil hinzu
            if (currentText.includes('geändert:')) {
                currentText = currentText.replace(/geändert: \d+/, `geändert: ${changedNeedsCount}`);
            } else if (changedNeedsCount > 0) {
                currentText += `, geändert: ${changedNeedsCount}`;
            }
            // Entferne "geändert: 0" wenn vorhanden
            if (changedNeedsCount === 0) {
                currentText = currentText.replace(/, geändert: \d+/, '');
            }
            subtitleElement.textContent = currentText;
            console.log('[updateLockedCountDisplay] Subtitle aktualisiert:', lockedNeedsCount, 'gesperrt,', changedNeedsCount, 'geändert');
        }
    }

    /**
     * Holt alle flachen Bedürfnisse (NEUE Array-Struktur v1.8.128)
     * @returns {Array} Array von { id, key, stringKey, label, value, locked }
     */
    function getFlatNeeds() {
        // Tiefe Kopie um Mutationen zu vermeiden
        return flatNeeds.map(need => ({ ...need }));
    }

    /**
     * Setzt alle flachen Bedürfnisse
     * Unterstützt mehrere Datenformate (Migration):
     *
     * @param {Array|Object} data - Kann sein:
     *   - v1.8.128+ Array: [{ id, key, stringKey, label, value, locked }, ...]
     *   - v1.8.89-127 Object: { needId: { value: number, locked: boolean } }
     *   - Legacy Object: { needId: number } (nur Werte, locked=false)
     */
    function setFlatNeeds(data) {
        if (!data) return;

        let migratedCount = 0;
        let newFormatCount = 0;

        // Format 1: Neues Array-Format (v1.8.128+)
        if (Array.isArray(data)) {
            flatNeeds = data.map(need => {
                // Validiere und normalisiere
                const numValue = parseInt(need.value, 10);
                if (isNaN(numValue) || numValue < 0 || numValue > 100) {
                    return null;
                }
                newFormatCount++;
                return {
                    id: need.id || '',
                    key: need.key || parseInt((need.id || '').replace('#B', ''), 10) || 0,
                    stringKey: need.stringKey || '',
                    label: need.label || '',
                    value: numValue,
                    locked: !!need.locked
                };
            }).filter(Boolean);
            console.log('[AttributeSummaryCard] Flat needs geladen (Array-Format v1.8.128+):', newFormatCount, 'Einträge');
            // FIX: Auch bei Array-Format Lock-Status aus TiageState synchronisieren
            syncLocksFromTiageState();
            return;
        }

        // Format 2 & 3: Altes Object-Format (Migration)
        if (typeof data === 'object') {
            flatNeeds = []; // Reset Array

            Object.keys(data).forEach(needId => {
                const entry = data[needId];
                const numKey = parseInt(needId.replace('#B', ''), 10) || 0;
                let stringKey = '';
                if (typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.toKey) {
                    stringKey = BeduerfnisIds.toKey(needId) || '';
                }

                if (typeof entry === 'object' && entry !== null && 'value' in entry) {
                    // v1.8.89-127: { needId: { value, locked } }
                    const numValue = parseInt(entry.value, 10);
                    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
                        flatNeeds.push({
                            id: needId,
                            key: numKey,
                            stringKey: stringKey,
                            label: getNeedLabel(needId).replace(/^#B\d+\s*/, ''),
                            value: numValue,
                            locked: !!entry.locked
                        });
                        newFormatCount++;
                    }
                } else if (typeof entry === 'number' || !isNaN(parseInt(entry, 10))) {
                    // Legacy: { needId: number }
                    const numValue = parseInt(entry, 10);
                    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
                        flatNeeds.push({
                            id: needId,
                            key: numKey,
                            stringKey: stringKey,
                            label: getNeedLabel(needId).replace(/^#B\d+\s*/, ''),
                            value: numValue,
                            locked: false
                        });
                        migratedCount++;
                    }
                }
            });

            if (migratedCount > 0) {
                console.log('[AttributeSummaryCard] Flat needs migriert (Legacy-Object):', migratedCount, 'Werte');
            }
            if (newFormatCount > 0) {
                console.log('[AttributeSummaryCard] Flat needs migriert (v1.8.89-127 Object):', newFormatCount, 'Werte');
            }
        }

        // FIX: Synchronisiere Lock-Status aus TiageState.lockedNeeds (SSOT)
        // Ohne diesen Code werden gesperrte Bedürfnisse beim Laden nicht wiederhergestellt
        syncLocksFromTiageState();
    }

    /**
     * Synchronisiert Lock-Status aus TiageState.profileReview.lockedNeeds in flatNeeds
     * TiageState ist SSOT für Lock-Status, flatNeeds.locked ist nur UI-Cache
     * FIX v1.8.559: Resette zuerst alle Locks, dann setze nur die für aktuelle Person
     */
    function syncLocksFromTiageState() {
        if (typeof TiageState === 'undefined' || !TiageState.getLockedNeeds) return;

        let currentPerson = 'ich';
        if (window.currentProfileReviewContext && window.currentProfileReviewContext.person) {
            currentPerson = window.currentProfileReviewContext.person;
        }

        const lockedNeeds = TiageState.getLockedNeeds(currentPerson) || {};
        let syncedCount = 0;
        let unlockedCount = 0;

        // FIX v1.8.559: Zuerst ALLE Locks resetten, dann nur die für aktuelle Person setzen
        // Dies verhindert dass Locks von der anderen Person übertragen werden beim Wechsel
        flatNeeds.forEach(need => {
            const wasLocked = need.locked;
            if (lockedNeeds.hasOwnProperty(need.id)) {
                need.locked = true;
                need.value = lockedNeeds[need.id]; // Übernehme auch den gesperrten Wert
                syncedCount++;
            } else if (wasLocked) {
                // War vorher gelockt (von anderer Person), jetzt nicht mehr
                need.locked = false;
                unlockedCount++;
            }
        });

        if (syncedCount > 0 || unlockedCount > 0) {
            console.log('[AttributeSummaryCard] Lock-Status synchronisiert für', currentPerson,
                '- gesperrt:', syncedCount, ', entsperrt:', unlockedCount);
        }
    }

    /**
     * DEPRECATED: Holt alle flachen Bedürfniswerte (Kompatibilitäts-Wrapper)
     * Verwendet intern getFlatNeeds() und extrahiert nur die Werte.
     * @returns {Object} { needId: value }
     */
    function getFlatNeedsValues() {
        const values = {};
        flatNeeds.forEach(need => {
            values[need.id] = need.value;
        });
        return values;
    }

    /**
     * DEPRECATED: Setzt flache Bedürfniswerte (Kompatibilitäts-Wrapper)
     * Für Rückwärtskompatibilität mit altem Code.
     * @param {Object} values - { needId: value }
     */
    function setFlatNeedsValues(values) {
        if (!values || typeof values !== 'object') return;

        Object.keys(values).forEach(needId => {
            const numValue = parseInt(values[needId], 10);
            if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
                upsertNeed(needId, { value: numValue });
            }
        });

        console.log('[AttributeSummaryCard] Flat needs values geladen (Legacy):', Object.keys(values).length, 'Werte');
    }

    /**
     * DEPRECATED: Holt alle gesperrten flachen Bedürfnisse (Kompatibilitäts-Wrapper)
     * @returns {Object} { needId: boolean }
     */
    function getFlatLockedNeeds() {
        const locks = {};
        flatNeeds.forEach(need => {
            if (need.locked) {
                locks[need.id] = true;
            }
        });
        return locks;
    }

    /**
     * DEPRECATED: Setzt gesperrte Bedürfnisse (Kompatibilitäts-Wrapper)
     * @param {Object} locks - { needId: boolean }
     */
    function setFlatLockedNeeds(locks) {
        if (!locks || typeof locks !== 'object') return;

        Object.keys(locks).forEach(needId => {
            upsertNeed(needId, { locked: !!locks[needId] });
        });

        console.log('[AttributeSummaryCard] Flat locks geladen (Legacy):', Object.keys(locks).length, 'Locks');
    }

    /**
     * Löscht alle flachen Bedürfnis-Sperren und aktualisiert die UI
     * Wird aufgerufen beim Reset auf Standard oder beim Laden eines neuen Profils
     */
    function clearFlatLockedNeeds() {
        // Alle Lock-Status auf false setzen
        flatNeeds.forEach(need => {
            need.locked = false;

            // UI aktualisieren - Lock-Icon und Disabled-Status zurücksetzen
            const needItem = document.querySelector(`.flat-need-item[data-need="${need.id}"]`);
            if (needItem) {
                needItem.classList.remove('need-locked');
                const slider = needItem.querySelector('.need-slider');
                const input = needItem.querySelector('.flat-need-input');
                const lockIcon = needItem.querySelector('.flat-need-lock');

                if (slider) slider.disabled = false;
                if (input) input.readOnly = false;
                if (lockIcon) lockIcon.textContent = '🔓';
            }
        });

        console.log('[AttributeSummaryCard] Alle flachen Bedürfnis-Sperren wurden gelöscht');
    }

    /**
     * Setzt alle flachen Bedürfniswerte zurück auf Profil-Werte
     * WICHTIG: Respektiert gesperrte Werte - nur ungesperrte Werte werden zurückgesetzt!
     * Löscht die Auswahl (setzt auf 0)
     *
     * Verwendet LoadedArchetypProfile (Basis + Modifikatoren) als SSOT,
     * damit die "Geändert"-Kennzeichnung korrekt funktioniert.
     * Filter bleiben UNVERÄNDERT (nur Werte werden neu geladen)
     */
    function resetFlatNeeds() {
        // Ermittle aktuelle Person aus Kontext
        let currentPerson = 'ich';
        if (typeof window !== 'undefined' && window.currentProfileReviewContext?.person) {
            currentPerson = window.currentProfileReviewContext.person;
        }

        // LoadedArchetypProfile ist die einzige Quelle (SSOT)
        const loadedProfile = window?.LoadedArchetypProfile?.[currentPerson];

        if (!loadedProfile?.profileReview?.flatNeeds) {
            const errorMsg = 'Reset nicht möglich: Profil-Werte nicht geladen. Bitte laden Sie zuerst ein Profil.';
            console.error('[AttributeSummaryCard]', errorMsg);
            alert(errorMsg);
            return;
        }

        const umfrageWerte = loadedProfile.profileReview.flatNeeds;
        console.log('[AttributeSummaryCard] Reset mit berechneten Werten (Basis + Modifikatoren) für', currentPerson);

        // Multi-Select Auswahl löschen (auf 0 setzen)
        clearNeedSelection();

        // Alle Werte zurücksetzen - ABER NUR wenn nicht gesperrt!
        Object.keys(umfrageWerte).forEach(needId => {
            const needObj = findNeedById(needId);

            // Überspringe gesperrte Bedürfnisse
            if (needObj && needObj.locked) {
                console.log(`[AttributeSummaryCard] ${needId} ist gesperrt - Reset übersprungen`);
                return;
            }

            const newValue = umfrageWerte[needId];

            if (needObj) {
                needObj.value = newValue;
                // locked-Status bleibt unverändert
            } else {
                // Sollte nicht passieren, aber sicherheitshalber
                upsertNeed(needId, { value: newValue, locked: false });
            }

            // Update UI
            const needItem = document.querySelector(`.flat-need-item[data-need="${needId}"]`);
            if (needItem) {
                const slider = needItem.querySelector('.need-slider');
                const input = needItem.querySelector('.flat-need-input');
                if (slider) slider.value = newValue;
                if (input) input.value = newValue;

                // Slider-Track-Hintergrund aktualisieren mit Dimension-Farbe
                const dimColor = getDimensionColor(needId);
                if (dimColor && slider) {
                    slider.style.background = getSliderFillGradient(dimColor, newValue, slider);
                }

                // Changed-Indicator (*) aktualisieren
                updateChangedIndicator(needItem, needId, newValue);
            }

            // Aktualisiere gespeicherten Original-Wert für isValueChanged-Prüfung
            originalNeedValues.set(needId, newValue);
        });

        // Event für Resonanz-Neuberechnung
        document.dispatchEvent(new CustomEvent('flatNeedChange', { bubbles: true }));
    }

    /**
     * Aktualisiert den Changed-Indicator (*) für ein Bedürfnis-Element
     * @param {HTMLElement} needItem - Das .flat-need-item Element
     * @param {string} needId - Die #B-ID
     * @param {number} currentValue - Der aktuelle Wert
     */
    function updateChangedIndicator(needItem, needId, currentValue) {
        const labelElement = needItem.querySelector('.flat-need-label');
        if (!labelElement) return;

        const existingIndicator = labelElement.querySelector('.value-changed-indicator');
        const shouldShowIndicator = isValueChanged(needId, currentValue);

        if (shouldShowIndicator && !existingIndicator) {
            // Indikator hinzufügen
            const indicator = document.createElement('span');
            indicator.className = 'value-changed-indicator';
            indicator.title = 'Wert wurde geändert';
            indicator.textContent = ' *';
            labelElement.appendChild(indicator);
        } else if (!shouldShowIndicator && existingIndicator) {
            // Indikator entfernen
            existingIndicator.remove();
        }
    }

    /**
     * Speicher für Bedürfniswerte pro Attribut
     */
    const needsValues = {};

    /**
     * Speicher für Lock-Status pro Attribut
     */
    const lockedAttributes = {};

    /**
     * Speicher für Lock-Status pro Bedürfnis (NEU)
     * Format: { 'attrId': { 'needId': true/false } }
     */
    const lockedNeeds = {};

    /**
     * Kategorien die Slider verwenden sollen
     * Alle Kategorien mit Bedürfnis-Mapping aktiviert
     */
    const SLIDER_ENABLED_CATEGORIES = [
        'geschlechtsidentitaet',
        'lebensplanung',
        'finanzen',
        'kommunikation',
        'soziales',
        'intimitaet',
        'werte',
        'praktisches'
    ];

    /**
     * Berechnet den aggregierten Wert für ein Attribut basierend auf seinen Bedürfnissen
     * @param {string} attrId - Attribut-ID
     * @returns {number} Aggregierter Wert (0-100)
     */
    function calculateAggregatedValue(attrId) {
        const mapping = ATTRIBUTE_NEEDS_MAPPING[attrId];
        if (!mapping || !needsValues[attrId]) return 50;

        const values = needsValues[attrId];
        const total = mapping.needs.reduce((sum, need) => sum + (values[need] || 50), 0);
        return Math.round(total / mapping.needs.length);
    }

    /**
     * Initialisiert die Bedürfniswerte für ein Attribut
     * @param {string} attrId - Attribut-ID
     * @param {number} defaultValue - Standardwert
     */
    function initializeNeedsValues(attrId, defaultValue = 50) {
        const mapping = ATTRIBUTE_NEEDS_MAPPING[attrId];
        if (!mapping) return;

        if (!needsValues[attrId]) {
            needsValues[attrId] = {};
            mapping.needs.forEach(need => {
                needsValues[attrId][need] = defaultValue;
            });
        }
    }

    /**
     * Erstellt HTML für eine Attribute-Summary-Card
     * @param {Object} config - Konfiguration
     * @param {string} config.attrId - Attribut-ID
     * @param {string} config.label - Anzeige-Label
     * @param {string} [config.hint] - Optionaler Hinweis
     * @param {number} [config.defaultValue=50] - Standard-Wert
     * @param {string} [config.description] - Beschreibung für Tooltip
     * @returns {string} HTML-String
     */
    function render(config) {
        const { attrId, label, hint, defaultValue = 50, description } = config;

        // Initialisiere Werte
        initializeNeedsValues(attrId, defaultValue);

        const mapping = ATTRIBUTE_NEEDS_MAPPING[attrId];
        if (!mapping) {
            console.warn(`AttributeSummaryCard: Kein Mapping für ${attrId}`);
            return '';
        }

        // Initialisiere lockedNeeds für dieses Attribut
        if (!lockedNeeds[attrId]) {
            lockedNeeds[attrId] = {};
        }

        // ═══════════════════════════════════════════════════════════════════
        // FIX: Lade Lock-Status aus TiageState.profileReview.lockedNeeds (SSOT)
        // ═══════════════════════════════════════════════════════════════════
        if (typeof TiageState !== 'undefined') {
            const savedLockedNeeds = TiageState.getLockedNeeds(currentPerson) || {};
            // Prüfe jedes Bedürfnis im Mapping ob es in TiageState gesperrt ist
            mapping.needs.forEach(need => {
                let hashId = need;
                if (!need.startsWith('#B') && typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.toId) {
                    hashId = BeduerfnisIds.toId(need) || need;
                }
                // Wenn in TiageState gesperrt, auch lokal markieren
                if (savedLockedNeeds.hasOwnProperty(hashId)) {
                    lockedNeeds[attrId][need] = true;
                    // Auch den Wert übernehmen
                    if (needsValues[attrId]) {
                        needsValues[attrId][need] = savedLockedNeeds[hashId];
                    }
                }
            });
        }

        const aggregatedValue = calculateAggregatedValue(attrId);
        const hintHtml = hint ? ` <span class="dimension-hint">(${hint})</span>` : '';
        const infoIconHtml = description
            ? ` <span class="attr-info-icon" onclick="event.stopPropagation(); openAttributeDefinitionModal('${attrId}')" title="Info anzeigen">ℹ</span>`
            : '';

        // Prüfe ob Slider aktiviert sein sollen
        const useSliders = SLIDER_ENABLED_CATEGORIES.includes(mapping.category);

        // Generiere Bedürfnis-Liste für Expansion
        const needsListHtml = mapping.needs.map(need => {
            const needLabel = getNeedLabel(need);
            const needValue = needsValues[attrId][need] || 50;
            const isNeedLocked = lockedNeeds[attrId] && lockedNeeds[attrId][need];

            if (useSliders) {
                // NEU: Slider-Layout mit individuellem Lock
                return `
                <div class="attribute-need-item with-slider${isNeedLocked ? ' need-locked' : ''}" data-need="${need}">
                    <div class="need-item-header">
                        <span class="attribute-need-label clickable"
                              onclick="event.stopPropagation(); openNeedWithResonance('${need}')"
                              title="Klicken für Resonanz-Details">${needLabel}</span>
                        <div class="need-item-controls">
                            <span class="need-lock-icon"
                                  onclick="event.stopPropagation(); AttributeSummaryCard.toggleNeedLock('${attrId}', '${need}', this)"
                                  title="Wert fixieren"></span>
                        </div>
                    </div>
                    <div class="need-slider-row">
                        <input type="range" class="need-slider"
                               min="0" max="100" value="${needValue}"
                               oninput="AttributeSummaryCard.onSliderInput('${attrId}', '${need}', this.value, this)"
                               onclick="event.stopPropagation()">
                        <input type="text" class="attribute-need-input" value="${needValue}" maxlength="3"
                               onchange="AttributeSummaryCard.updateNeedValue('${attrId}', '${need}', this.value)"
                               onclick="event.stopPropagation()">
                    </div>
                </div>`;
            } else {
                // Original-Layout ohne Slider
                return `
                <div class="attribute-need-item" data-need="${need}">
                    <span class="attribute-need-label clickable"
                          onclick="event.stopPropagation(); openNeedWithResonance('${need}')"
                          title="Klicken für Resonanz-Details">${needLabel}</span>
                    <div class="attribute-need-input-group">
                        <input type="text" class="attribute-need-input" value="${needValue}" maxlength="3"
                               onchange="AttributeSummaryCard.updateNeedValue('${attrId}', '${need}', this.value)"
                               onclick="event.stopPropagation()">
                        <span class="attribute-need-percent"></span>
                    </div>
                </div>`;
            }
        }).join('');

        return `
            <div class="attribute-summary-card" data-attr="${attrId}" onclick="AttributeSummaryCard.toggleExpand(this)">
                <div class="attribute-summary-header">
                    <div class="attribute-summary-label-group">
                        <span class="attribute-summary-label">${label}${hintHtml}${infoIconHtml}</span>
                        <span class="attribute-summary-sublabel">Zwischenergebnis aus ${mapping.needs.length} Bedürfnissen</span>
                    </div>
                    <div class="attribute-summary-input-group">
                        <input type="text" class="attribute-summary-input" value="${aggregatedValue}" maxlength="3"
                               onclick="event.stopPropagation()" readonly>
                        <span class="attribute-summary-percent"></span>
                        <span class="attribute-summary-lock" onclick="event.stopPropagation(); AttributeSummaryCard.toggleLock('${attrId}', this)"></span>
                        <span class="attribute-summary-expand-icon">▼</span>
                    </div>
                </div>
                <div class="attribute-summary-needs-list collapsed">
                    ${needsListHtml}
                </div>
            </div>`;
    }

    /**
     * Erstellt mehrere Attribute-Summary-Cards
     * @param {Array<Object>} configs - Array von Konfigurationen
     * @returns {string} HTML-String
     */
    function renderMany(configs) {
        return configs.map(render).join('\n');
    }

    /**
     * Togglet den Expand-Status einer Card
     * @param {HTMLElement} card - Die Card
     */
    function toggleExpand(card) {
        const needsList = card.querySelector('.attribute-summary-needs-list');
        const expandIcon = card.querySelector('.attribute-summary-expand-icon');

        if (needsList && expandIcon) {
            needsList.classList.toggle('collapsed');
            expandIcon.classList.toggle('expanded');
        }
    }

    /**
     * Togglet den Lock-Status eines Attributs
     * @param {string} attrId - Attribut-ID
     * @param {HTMLElement} lockElement - Das Lock-Element
     */
    function toggleLock(attrId, lockElement) {
        const card = lockElement.closest('.attribute-summary-card');
        if (!card) return;

        lockedAttributes[attrId] = !lockedAttributes[attrId];
        card.classList.toggle('locked', lockedAttributes[attrId]);
    }

    /**
     * Prüft ob ein Attribut durch Kategorie-Lock gesperrt ist
     * @param {string} attrId - Attribut-ID
     * @returns {boolean} Ob das Attribut gesperrt ist
     */
    function isLockedByCategory(attrId) {
        const card = document.querySelector(`[data-attr="${attrId}"]`);
        if (!card) return false;
        return card.classList.contains('category-parent-locked');
    }

    /**
     * Aktualisiert einen einzelnen Bedürfniswert
     * @param {string} attrId - Attribut-ID
     * @param {string} needId - Bedürfnis-ID
     * @param {string|number} value - Neuer Wert
     */
    function updateNeedValue(attrId, needId, value) {
        // Prüfe sowohl eigenen Lock als auch Kategorie-Lock
        if (lockedAttributes[attrId] || isLockedByCategory(attrId)) return;

        // Prüfe ob das individuelle Bedürfnis gesperrt ist
        if (lockedNeeds[attrId] && lockedNeeds[attrId][needId]) return;

        const numValue = parseInt(value, 10);
        if (isNaN(numValue) || numValue < 0 || numValue > 100) return;

        if (!needsValues[attrId]) {
            initializeNeedsValues(attrId);
        }

        needsValues[attrId][needId] = numValue;

        // Update aggregierter Wert
        const card = document.querySelector(`[data-attr="${attrId}"]`);
        if (card) {
            const summaryInput = card.querySelector('.attribute-summary-input');
            if (summaryInput) {
                summaryInput.value = calculateAggregatedValue(attrId);
            }

            // Sync Slider falls vorhanden
            const needItem = card.querySelector(`[data-need="${needId}"]`);
            if (needItem) {
                const slider = needItem.querySelector('.need-slider');
                if (slider && slider.value !== String(numValue)) {
                    slider.value = numValue;
                }
            }
        }

        // Custom Event für Änderungstracking
        const event = new CustomEvent('attributeNeedChange', {
            bubbles: true,
            detail: { attrId, needId, value: numValue }
        });
        document.dispatchEvent(event);
    }

    /**
     * Handler für Slider-Input (live update während Drag)
     * @param {string} attrId - Attribut-ID
     * @param {string} needId - Bedürfnis-ID
     * @param {string|number} value - Slider-Wert
     * @param {HTMLElement} sliderEl - Slider-Element
     */
    function onSliderInput(attrId, needId, value, sliderEl) {
        if (lockedAttributes[attrId]) return;
        if (lockedNeeds[attrId] && lockedNeeds[attrId][needId]) return;

        const numValue = parseInt(value, 10);
        if (isNaN(numValue)) return;

        // Update interner Wert
        if (!needsValues[attrId]) {
            initializeNeedsValues(attrId);
        }
        needsValues[attrId][needId] = numValue;

        // Sync Input-Feld
        const needItem = sliderEl.closest('.attribute-need-item');
        if (needItem) {
            const input = needItem.querySelector('.attribute-need-input');
            if (input) {
                input.value = numValue;
                // Kurze Animation
                input.classList.add('value-changed');
                setTimeout(() => input.classList.remove('value-changed'), 200);
            }
        }

        // Update aggregierter Wert
        const card = document.querySelector(`[data-attr="${attrId}"]`);
        if (card) {
            const summaryInput = card.querySelector('.attribute-summary-input');
            if (summaryInput) {
                summaryInput.value = calculateAggregatedValue(attrId);
            }
        }

        // Custom Event für Änderungstracking (wie bei updateNeedValue)
        // Ermöglicht Live-Sync mit TiageState während Slider-Drag
        const event = new CustomEvent('attributeNeedChange', {
            bubbles: true,
            detail: { attrId, needId, value: numValue }
        });
        document.dispatchEvent(event);
    }

    /**
     * Togglet den Lock-Status eines einzelnen Bedürfnisses
     * @param {string} attrId - Attribut-ID
     * @param {string} needId - Bedürfnis-ID (String-Key wie 'akzeptanz')
     * @param {HTMLElement} lockElement - Das Lock-Icon Element
     */
    function toggleNeedLock(attrId, needId, lockElement) {
        // Initialisiere falls nötig
        if (!lockedNeeds[attrId]) {
            lockedNeeds[attrId] = {};
        }

        // Toggle Lock-Status (lokal für UI)
        lockedNeeds[attrId][needId] = !lockedNeeds[attrId][needId];
        const isLocked = lockedNeeds[attrId][needId];

        // ═══════════════════════════════════════════════════════════════════
        // FIX: Synchronisiere mit TiageState.profileReview.lockedNeeds (SSOT)
        // ═══════════════════════════════════════════════════════════════════
        if (typeof TiageState !== 'undefined') {
            // Konvertiere String-Key (z.B. 'akzeptanz') zu #B-ID (z.B. '#B15')
            let hashId = needId;
            if (!needId.startsWith('#B') && typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.toId) {
                hashId = BeduerfnisIds.toId(needId) || needId;
            }

            if (isLocked) {
                // Beim Sperren: Speichere aktuellen Wert
                const currentValue = needsValues[attrId]?.[needId] ?? 50;
                TiageState.lockNeed(currentPerson, hashId, currentValue);
                console.log('[toggleNeedLock] Gesperrt & gespeichert:', hashId, '=', currentValue, 'für', currentPerson);
            } else {
                // Beim Entsperren: Entferne aus lockedNeeds
                TiageState.unlockNeed(currentPerson, hashId);
                console.log('[toggleNeedLock] Entsperrt:', hashId, 'für', currentPerson);
            }
            TiageState.saveToStorage();
        }

        // Update UI
        const needItem = lockElement.closest('.attribute-need-item');
        if (needItem) {
            needItem.classList.toggle('need-locked', isLocked);

            // Disable/Enable Slider und Input
            const slider = needItem.querySelector('.need-slider');
            const input = needItem.querySelector('.attribute-need-input');

            if (slider) {
                slider.disabled = isLocked;
            }
            if (input) {
                input.readOnly = isLocked;
            }
        }

        // Custom Event
        const event = new CustomEvent('needLockChange', {
            bubbles: true,
            detail: { attrId, needId, locked: isLocked }
        });
        document.dispatchEvent(event);
    }

    /**
     * Prüft ob ein Bedürfnis gesperrt ist
     * @param {string} attrId - Attribut-ID
     * @param {string} needId - Bedürfnis-ID
     * @returns {boolean}
     */
    function isNeedLocked(attrId, needId) {
        return !!(lockedNeeds[attrId] && lockedNeeds[attrId][needId]);
    }

    /**
     * Gibt alle gesperrten Bedürfnisse zurück
     * @returns {Object}
     */
    function getLockedNeeds() {
        return { ...lockedNeeds };
    }

    /**
     * Holt den aggregierten Wert eines Attributs
     * @param {string} attrId - Attribut-ID
     * @returns {number} Aggregierter Wert
     */
    function getValue(attrId) {
        return calculateAggregatedValue(attrId);
    }

    /**
     * Holt alle Bedürfniswerte eines Attributs
     * @param {string} attrId - Attribut-ID
     * @returns {Object} Bedürfniswerte
     */
    function getNeedsValues(attrId) {
        return needsValues[attrId] || {};
    }

    /**
     * Setzt alle Bedürfniswerte eines Attributs
     * @param {string} attrId - Attribut-ID
     * @param {Object} values - Bedürfniswerte
     */
    function setNeedsValues(attrId, values) {
        // Prüfe sowohl eigenen Lock als auch Kategorie-Lock
        if (lockedAttributes[attrId] || isLockedByCategory(attrId)) return;

        needsValues[attrId] = { ...values };

        // Update UI
        const card = document.querySelector(`[data-attr="${attrId}"]`);
        if (card) {
            Object.entries(values).forEach(([needId, value]) => {
                const needInput = card.querySelector(`[data-need="${needId}"] .attribute-need-input`);
                if (needInput) {
                    needInput.value = value;
                }
            });

            const summaryInput = card.querySelector('.attribute-summary-input');
            if (summaryInput) {
                summaryInput.value = calculateAggregatedValue(attrId);
            }
        }
    }

    /**
     * Setzt ein Attribut zurück auf Standardwert
     * Respektiert Lock-Status: Gesperrte Attribute werden NICHT zurückgesetzt
     * @param {string} attrId - Attribut-ID
     * @param {number} defaultValue - Standardwert
     * @returns {boolean} true wenn zurückgesetzt, false wenn gesperrt
     */
    function reset(attrId, defaultValue = 50) {
        // WICHTIG: Respektiere Lock - gesperrte Attribute nicht zurücksetzen
        if (lockedAttributes[attrId]) {
            console.log(`[AttributeSummaryCard] ${attrId} ist gesperrt - Reset übersprungen`);
            return false;
        }

        initializeNeedsValues(attrId, defaultValue);

        const mapping = ATTRIBUTE_NEEDS_MAPPING[attrId];
        if (mapping) {
            mapping.needs.forEach(need => {
                needsValues[attrId][need] = defaultValue;
            });
        }

        // Update UI
        const card = document.querySelector(`[data-attr="${attrId}"]`);
        if (card) {
            card.classList.remove('locked');

            const needInputs = card.querySelectorAll('.attribute-need-input');
            needInputs.forEach(input => {
                input.value = defaultValue;
            });

            const summaryInput = card.querySelector('.attribute-summary-input');
            if (summaryInput) {
                summaryInput.value = defaultValue;
            }
        }
        return true;
    }

    /**
     * Holt alle Werte aller Attribute
     * @returns {Object} Alle Attributwerte
     */
    function getAllValues() {
        const result = {};
        Object.keys(ATTRIBUTE_NEEDS_MAPPING).forEach(attrId => {
            result[attrId] = {
                aggregated: calculateAggregatedValue(attrId),
                needs: getNeedsValues(attrId),
                locked: lockedAttributes[attrId] || false
            };
        });
        return result;
    }

    /**
     * Togglet den Collapse-Status der Faktor-Gewichtung (Sliders)
     */
    function toggleFlatNeedsCollapse() {
        const wrapper = document.querySelector('.flat-needs-list-wrapper');
        const icon = document.querySelector('.flat-needs-collapse-icon');

        if (wrapper && icon) {
            wrapper.classList.toggle('collapsed');
            icon.classList.toggle('collapsed');
        }
    }

    return {
        render,
        renderMany,
        toggleExpand,
        toggleLock,
        toggleNeedLock,
        onSliderInput,
        updateNeedValue,
        getValue,
        getNeedsValues,
        setNeedsValues,
        reset,
        getAllValues,
        isNeedLocked,
        getLockedNeeds,
        ATTRIBUTE_NEEDS_MAPPING,
        getNeedLabel,
        SLIDER_ENABLED_CATEGORIES,
        // NEU: Flache Darstellung aller Bedürfnisse (wie Ti-Age Synthese)
        renderAllNeedsFlat,
        onFlatSliderInput,
        updateFlatNeedValue,
        toggleFlatNeedLock,
        toggleFlatNeedsCollapse,
        // NEU (v1.8.89): Integrierte Struktur { needId: { value, locked } }
        getFlatNeeds,
        setFlatNeeds,
        // SSOT v1.8.691: Liest IMMER frisch von TiageState
        getFlatNeedsFromState,
        invalidateFlatNeedsCache,
        // DEPRECATED: Legacy-Wrapper für Rückwärtskompatibilität
        getFlatNeedsValues,
        setFlatNeedsValues,
        getFlatLockedNeeds,
        setFlatLockedNeeds,
        clearFlatLockedNeeds,
        resetFlatNeeds,
        reRenderFlatNeeds,
        setSortMode,
        toggleAdditiveSortMode,
        resetSort,
        toggleShowOnlyChanged,
        // Person-spezifische Sort-Persistenz (FIX für ICH/PARTNER Tab-Wechsel)
        saveSortModeForPerson,
        loadSortModeForPerson,
        switchSortPerson,
        // Getter für aktuellen Archetyp-Label (für Filter-Updates)
        getCurrentArchetypLabel: function() { return currentFlatArchetypLabel; },
        // NEU: DimensionKategorieFilter Integration
        initDimensionFilter,
        // DEPRECATED: Alte Filter-Funktionen (für Rückwärtskompatibilität)
        togglePerspektiveFilter,
        clearPerspektiveFilters,
        toggleHauptfragenFilter,
        // NEU: Hauptfragen-Ansicht mit aufklappbaren Nuancen
        toggleHauptfrageExpand,
        // NEU: Hauptfragen-Slider mit Lock-Mechanismus
        toggleHauptfrageLock,
        onHauptfrageSliderInput,
        updateHauptfrageValue,
        isNuanceLockedByHauptfrage,
        loadLockedHauptfragen,
        getLockedHauptfrageValue,
        GFK_KATEGORIEN,
        // NEU: Multi-Select Feature für Bedürfnisse
        toggleNeedSelection,
        clearNeedSelection,
        selectAllFilteredNeeds,
        invertNeedSelection,
        toggleHauptfrageSelection,
        resetSelectedNeedsValues,
        resetFilters,
        updateSelectedNeedsValue,
        lockSelectedNeeds,
        toggleLockSelectedNeeds,
        updateSelectedLockButtonState,
        // NEU: Bulk-Increment/Decrement für markierte Bedürfnisse
        incrementSelectedNeeds,
        decrementSelectedNeeds,
        getSelectedNeeds: function() { return selectedNeeds; },
        // NEU: Person-spezifische Lock-Synchronisierung
        syncLocksFromState: syncLocksFromTiageState,
        // FIX: Baseline mit aktuellen flatNeeds synchronisieren (für Reset mit GOD)
        syncBaselineWithFlatNeeds
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AttributeSummaryCard;
}

// FIX: Event-Listener für Katalog-Laden - UI aktualisieren wenn Katalog fertig lädt
if (typeof document !== 'undefined') {
    document.addEventListener('beduerfnisIdsLoaded', function() {
        console.log('[AttributeSummaryCard] Katalog geladen - UI wird aktualisiert');
        // Re-render wenn die Komponente bereits sichtbar ist
        const container = document.querySelector('.flat-needs-container');
        if (container && typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.reRenderFlatNeeds) {
            // Kurze Verzögerung um sicherzustellen dass der Cache invalidiert wurde
            setTimeout(function() {
                AttributeSummaryCard.reRenderFlatNeeds();
            }, 50);
        }
    });

    // FIX: Event-Listener für DimensionKategorieFilter - UI aktualisieren wenn Filter geändert wird
    // Dies war zuvor in initDimensionFilter() auskommentiert, wurde aber für korrekte Sortierung benötigt
    document.addEventListener('dimensionKategorieFilterChange', function(event) {
        console.log('[AttributeSummaryCard] Filter geändert:', event.detail);
        // Re-render der Bedürfnisliste mit neuen Filtern (inkl. korrekter Sortierung)
        const container = document.querySelector('.flat-needs-container');
        if (container && typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.reRenderFlatNeeds) {
            AttributeSummaryCard.reRenderFlatNeeds();
        }
    });

    // FIX: Event-Listener für Person-Wechsel - Markierungen zurücksetzen
    // Beim Wechsel zwischen ICH/PARTNER müssen Selektionen geleert werden,
    // da sie sonst die falsche Person betreffen würden
    window.addEventListener('personChanged', function(event) {
        console.log('[AttributeSummaryCard] Person gewechselt:', event.detail?.person);

        // Selektionen zurücksetzen (über Public API)
        if (typeof AttributeSummaryCard !== 'undefined') {
            // clearNeedSelection() leert selectedNeeds und originalNeedValues
            if (AttributeSummaryCard.clearNeedSelection) {
                AttributeSummaryCard.clearNeedSelection();
                console.log('[AttributeSummaryCard] Selektionen zurückgesetzt');
            }

            // Gelockte Hauptfragen für neue Person laden
            if (AttributeSummaryCard.loadLockedHauptfragen && event.detail?.person) {
                AttributeSummaryCard.loadLockedHauptfragen(event.detail.person);
                console.log('[AttributeSummaryCard] LockedHauptfragen geladen für', event.detail.person);
            }
        }
    });
}
