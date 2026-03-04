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
     * Rundet einen Wert auf den nächsten 25er Schritt (0, 25, 50, 75, 100)
     * @param {number} value - Der Eingabewert (0-100)
     * @returns {number} Der gerundete Wert
     */
    function roundTo10(value) {
        const num = parseFloat(value) || 0;
        return Math.round(num / 10) * 10;
    }
    // Alias für Rückwärtskompatibilität
    const roundTo25 = roundTo10;

    /**
     * R-FAKTOR EINFLUSS-INDIKATOR
     * Ermittelt zu welchem R-Faktor ein Bedürfnis beiträgt.
     * Nutzt DimensionKategorieFilter.DIMENSIONEN.kategorienKeys (SSOT).
     * Alle 216 Needs haben eine Kategorie → alle bekommen ein R-Badge.
     *
     * @param {string} needId - Die Bedürfnis-ID (#B-ID)
     * @returns {object|null} { factor: 'R1'|'R2'|'R3'|'R4', color: '#...', label: '...' } oder null
     */
    function getRFactorForNeed(needId) {
        // Primäre Quelle: DimensionKategorieFilter (Kategorie-basiert, deckt ALLE 216 Needs ab)
        if (typeof DimensionKategorieFilter !== 'undefined' && DimensionKategorieFilter.DIMENSIONEN) {
            const dims = DimensionKategorieFilter.DIMENSIONEN;

            // Hole die Kategorie des Needs
            let categoryKey = null;
            if (typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.beduerfnisse && BeduerfnisIds.beduerfnisse[needId]) {
                const need = BeduerfnisIds.beduerfnisse[needId];
                const catId = need.kategorie;
                if (catId && typeof window.TiageTaxonomie !== 'undefined' && window.TiageTaxonomie.kategorien) {
                    const cat = window.TiageTaxonomie.kategorien[catId];
                    if (cat && cat.key) categoryKey = cat.key;
                }
            }

            if (categoryKey) {
                for (const [factor, config] of Object.entries(dims)) {
                    if (config.kategorienKeys && config.kategorienKeys.includes(categoryKey)) {
                        return {
                            factor: factor,
                            color: config.color,
                            label: config.label
                        };
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
     * MODIFIER-BADGES: Zeigt pro Need welche Modifikatoren den Wert verändert haben
     * z.B. "G:+10" (Geschlecht), "O:+6" (Orientierung), "D:-4" (Dominanz), "H:+10" (Horny)
     *
     * @param {string} needId - Die Bedürfnis-ID (#B-ID)
     * @returns {string} HTML-String mit Modifier-Badges oder leer
     */
    function renderModifierBadges(needId) {
        if (typeof ProfileModifiers === 'undefined' || typeof TiageState === 'undefined') return '';
        if (typeof BeduerfnisIds === 'undefined' || !BeduerfnisIds.toKey) return '';

        const stringKey = BeduerfnisIds.toKey(needId);
        if (!stringKey) return '';

        const person = currentFlatPerson || 'ich';
        const geschlecht = TiageState.get(`personDimensions.${person}.geschlecht`) || null;
        const dominanz = TiageState.get(`personDimensions.${person}.dominanz`) || null;
        const orientierung = TiageState.get(`personDimensions.${person}.orientierung`) || null;
        const extras = TiageState.get(`personDimensions.${person}.geschlecht_extras`) || {};

        const badges = [];

        // Hilfsfunktion: Delta für einen Modifier berechnen
        function getDelta(mod, category) {
            if (!mod || !mod.deltas || mod.deltas[stringKey] === undefined) return 0;
            const multiplier = ProfileModifiers.getRtiMultiplier(category);
            return mod.deltas[stringKey] * multiplier;
        }

        // Gender
        if (geschlecht) {
            const gMod = ProfileModifiers.getGenderModifier(
                typeof geschlecht === 'string' ? geschlecht : geschlecht?.primary,
                typeof geschlecht === 'object' ? geschlecht?.secondary : undefined
            );
            const delta = getDelta(gMod, 'gender');
            if (delta !== 0) badges.push({ label: 'G', delta, color: '#F4A261' });
        }

        // Orientierung
        if (orientierung) {
            let orientierungen = [];
            if (Array.isArray(orientierung)) orientierungen = orientierung;
            else if (typeof orientierung === 'string') orientierungen = [orientierung];
            else if (orientierung?.primary) {
                orientierungen.push(orientierung.primary);
                if (orientierung.secondary) orientierungen.push(orientierung.secondary);
            }

            let totalDelta = 0;
            orientierungen.forEach(ori => {
                const oMod = ProfileModifiers.getOrientierungModifier(ori);
                totalDelta += getDelta(oMod, 'orientierung');
            });
            if (totalDelta !== 0) badges.push({ label: 'O', delta: totalDelta, color: '#E63946' });
        }

        // Dominanz
        if (dominanz) {
            const dVal = typeof dominanz === 'object' ? dominanz.primary : dominanz;
            const dMod = ProfileModifiers.getDominanzModifier(dVal);
            const delta = getDelta(dMod, 'dominanz');
            if (delta !== 0) badges.push({ label: 'D', delta, color: '#8B5CF6' });
        }

        // FFH: Fit, Fuckedup, Horny
        if (extras.fit) {
            const fMod = ProfileModifiers.getFFHModifier('fit');
            const delta = getDelta(fMod, 'fit');
            if (delta !== 0) badges.push({ label: 'Fi', delta, color: '#2ECC71' });
        }
        if (extras.fuckedup) {
            const fuMod = ProfileModifiers.getFFHModifier('fuckedup');
            const delta = getDelta(fuMod, 'fuckedup');
            if (delta !== 0) badges.push({ label: 'Fu', delta, color: '#E74C3C' });
        }
        if (extras.horny) {
            const hMod = ProfileModifiers.getFFHModifier('horny');
            const delta = getDelta(hMod, 'horny');
            if (delta !== 0) badges.push({ label: 'H', delta, color: '#EC4899' });
        }

        if (badges.length === 0) return '';

        return badges.map(b => {
            const sign = b.delta > 0 ? '+' : '';
            const displayDelta = Number.isInteger(b.delta) ? b.delta : b.delta.toFixed(1);
            return `<span class="modifier-badge" style="--mod-color: ${b.color};"
                          title="${b.label}: ${sign}${displayDelta} (Modifier)">${b.label}:${sign}${displayDelta}</span>`;
        }).join('');
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

        // Verwendet getFlatNeeds() das für ICH den aktuellen Archetyp-Slot liest
        const stateValues = TiageState.getFlatNeeds?.(person) || {};
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
            // FIX: Werte auf 25er Schritte runden (0, 25, 50, 75, 100)
            const rawValue = isLocked
                ? lockedNeeds[needId]
                : (stateValues[needId] !== undefined ? stateValues[needId] : 50);
            const value = roundTo25(rawValue);

            flatNeeds.push({
                id: needId,
                key: numKey,
                stringKey: needData?.key || '',
                label: needData?.label || needId,
                value: value,
                locked: isLocked
            });
        });

        // v1.8.998: Hauptfragen-Duplikat-Ladung ENTFERNT
        // Alle Needs (haupt + nuance + sub) werden bereits oben aus BeduerfnisIds geladen

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
     * REFACTORING v1.8.982: lockedHauptfragen Set ENTFERNT
     * Hauptfragen werden jetzt wie Nuancen in flatNeeds[] gespeichert mit .locked Property
     * Kein separates Set mehr nötig - einheitliche Speicherstruktur!
     */

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
     * REFACTORING v1.8.982: Vereinfacht - zählt alle locked Items in flatNeeds[]
     * @param {string} currentPerson - 'ich' oder 'partner'
     * @returns {number} Anzahl der gesperrten Items
     */
    function calculateTotalLockedCount(currentPerson) {
        // REFACTORING v1.8.982: Einfach alle .locked Items in flatNeeds zählen
        // Hauptfragen und Nuancen werden jetzt einheitlich behandelt
        return flatNeeds.filter(need => need.locked === true).length;
    }

    /**
     * Helper: Aktualisiert ein Bedürfnis NUR in RAM
     * SSOT FIX v1.8.983: Explicit Save Workflow - NUR in flatNeeds[] schreiben
     * Speichern in TiageState erst bei saveAllChanges() via syncRamToState()
     *
     * @param {string} id - Die #B-ID
     * @param {Object} updates - Zu aktualisierende Felder (value, locked)
     */
    function upsertNeed(id, updates) {
        // Finde oder erstelle Need in flatNeeds[]
        let needObj = findNeedById(id);

        if (!needObj) {
            // Need existiert noch nicht - erstelle es
            needObj = {
                id: id,
                key: parseInt(id.replace('#B', ''), 10) || 0,
                stringKey: '',
                label: id,
                value: 50,
                locked: false
            };
            flatNeeds.push(needObj);
        }

        // Aktualisiere Felder in RAM
        if (updates.value !== undefined) {
            needObj.value = updates.value;
        }
        if (updates.locked !== undefined) {
            needObj.locked = updates.locked;
        }

        // SSOT FIX v1.8.983: KEIN Auto-Save mehr!
        // Werte bleiben in RAM bis User "Speichern" klickt
        console.log(`[upsertNeed] RAM: ${id} = ${needObj.value}, locked: ${needObj.locked}`);
    }

    /**
     * MULTI-SELECT: Togglet die Auswahl eines Bedürfnisses
     * v1.8.990: CTRL+Klick für Mehrfachauswahl, normaler Klick = Einzelauswahl
     * @param {string} needId - Die #B-ID
     * @param {Event} [event] - Click-Event (für CTRL-Erkennung)
     */
    function toggleNeedSelection(needId, event) {
        // SSOT v2.0: Partner-Bedürfnisse können nicht für Bulk-Edit ausgewählt werden
        if (currentFlatPerson === 'partner') {
            return; // Keine Auswahl bei Partner - alles read-only
        }

        const isCtrl = event && (event.ctrlKey || event.metaKey);

        if (isCtrl) {
            // CTRL+Klick: Toggle dieses Item zur Auswahl hinzu/entfernen
            if (selectedNeeds.has(needId)) {
                selectedNeeds.delete(needId);
                originalNeedValues.delete(needId);
            } else {
                selectedNeeds.add(needId);
                const needObj = findNeedById(needId);
                if (needObj) {
                    originalNeedValues.set(needId, needObj.value);
                }
            }
        } else {
            // Normaler Klick: Nur dieses eine Item auswählen (oder abwählen wenn schon allein ausgewählt)
            const wasOnlySelected = selectedNeeds.size === 1 && selectedNeeds.has(needId);

            // Alle bisherigen abwählen
            selectedNeeds.forEach(id => {
                const item = document.querySelector(`.flat-need-item[data-need="${id}"]`);
                if (item) item.classList.remove('need-selected');
            });
            selectedNeeds.clear();
            originalNeedValues.clear();

            if (!wasOnlySelected) {
                // Dieses auswählen
                selectedNeeds.add(needId);
                const needObj = findNeedById(needId);
                if (needObj) {
                    originalNeedValues.set(needId, needObj.value);
                }
            }
        }

        // Update UI für alle Items
        document.querySelectorAll('.flat-need-item').forEach(item => {
            const id = item.getAttribute('data-need');
            item.classList.toggle('need-selected', selectedNeeds.has(id));
        });

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

        // v1.8.998: Hauptfrage-Klassen entfernt — alle Items uniform

        // Update Auswahl-Counter
        updateSelectionCounter();

        // FIX v1.8.974: Update Lock-Button-Status sofort
        updateSelectedLockButtonState();
    }

    /**
     * MULTI-SELECT: Wählt alle gefilterten Bedürfnisse aus oder ab
     * v1.8.998: Vereinfacht — alle Needs gleichberechtigt, keine Hierarchie
     */
    function selectAllFilteredNeeds() {
        function isNeedVisibleByFilters(need) {
            if (typeof DimensionKategorieFilter !== 'undefined' && !DimensionKategorieFilter.shouldShowNeed(need.id)) {
                return false;
            }
            const needItem = document.querySelector(`.flat-need-item[data-need="${need.id}"]`);
            if (needItem && (needItem.classList.contains('dimension-filter-hidden') || needItem.classList.contains('filter-hidden'))) {
                return false;
            }
            return true;
        }

        // Alle sichtbaren Needs (keine Hierarchie-Filterung)
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
        // v1.8.998: updateHauptfragenSelectionVisuals() entfernt

        // FIX v1.8.974: Update Lock-Button-Status sofort
        updateSelectedLockButtonState();
    }

    /**
     * MULTI-SELECT: Kehrt die Auswahl aller Bedürfnisse um (die durch Filter erlaubt sind)
     * Ausgewählte werden abgewählt und umgekehrt
     */
    function invertNeedSelection() {
        // v1.8.998: Vereinfacht — alle Needs gleichberechtigt
        function isNeedVisibleByFilters(need) {
            if (typeof DimensionKategorieFilter !== 'undefined' && !DimensionKategorieFilter.shouldShowNeed(need.id)) {
                return false;
            }
            const needItem = document.querySelector(`.flat-need-item[data-need="${need.id}"]`);
            if (needItem && (needItem.classList.contains('dimension-filter-hidden') || needItem.classList.contains('filter-hidden'))) {
                return false;
            }
            return true;
        }

        const visibleNeeds = flatNeeds.filter(need => isNeedVisibleByFilters(need));

        if (visibleNeeds.length === 0) {
            return;
        }

        // Invertiere die Auswahl für alle sichtbaren Hauptfragen
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
        // v1.8.998: updateHauptfragenSelectionVisuals() entfernt

        // FIX v1.8.974: Update Lock-Button-Status sofort
        updateSelectedLockButtonState();
    }

    // v1.8.998: toggleHauptfrageSelection() ENTFERNT — alle Needs gleichberechtigt, einzeln markierbar

    /**
     * MULTI-SELECT: Aktualisiert den Auswahl-Counter in der UI
     */
    function updateSelectionCounter() {
        const counter = document.querySelector('.selection-counter');
        if (counter) {
            const count = selectedNeeds.size;
            counter.textContent = count > 0 ? `${count} markiert (CTRL+Klick für Mehrfachauswahl)` : 'Klick = markieren, CTRL+Klick = mehrere';
            counter.classList.toggle('has-selection', count > 0);
        }

        // Bulk-Action-Buttons aktivieren/deaktivieren
        const bulkCard = document.querySelector('.bulk-action-card');
        if (bulkCard) {
            const hasSelection = selectedNeeds.size > 0;
            bulkCard.classList.toggle('disabled', !hasSelection);

            bulkCard.querySelectorAll('button').forEach(btn => {
                btn.disabled = !hasSelection;
            });
        }
    }

    // v1.8.998: updateHauptfragenSelectionVisuals() ENTFERNT — keine Hierarchie-basierte Selektion mehr

    /**
     * MULTI-SELECT: Setzt alle ausgewählten Bedürfnisse auf ihre Original-Profil-Werte zurück
     * Lädt die Werte aus GfkBeduerfnisse.archetypProfile (SSOT Katalog)
     */
    function resetSelectedNeedsValues() {
        // Nur markierte Needs zurücksetzen — nichts tun wenn keine markiert
        if (selectedNeeds.size === 0) {
            console.log('[AttributeSummaryCard] Reset: Keine Needs markiert — nichts zu tun');
            return;
        }

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

        if (!currentArchetyp) {
            console.error('[AttributeSummaryCard] Kein Archetyp für Reset gefunden');
            return;
        }

        const needsToReset = Array.from(selectedNeeds);
        console.log(`[AttributeSummaryCard] Reset: ${needsToReset.length} markierte Needs für ${currentPerson}/${currentArchetyp}`);

        // ═══════════════════════════════════════════════════════════════════════════
        // SCHRITT 1: Berechnete Zielwerte holen (Basis + Modifikatoren)
        // ═══════════════════════════════════════════════════════════════════════════
        let calculatedValues = null;
        if (typeof ProfileCalculator !== 'undefined' && ProfileCalculator.calculateFlatNeeds) {
            const geschlecht = typeof TiageState !== 'undefined' ? TiageState.get(`personDimensions.${currentPerson}.geschlecht`) : null;
            const dominanz = typeof TiageState !== 'undefined' ? TiageState.get(`personDimensions.${currentPerson}.dominanz`) : null;
            const orientierung = typeof TiageState !== 'undefined' ? TiageState.get(`personDimensions.${currentPerson}.orientierung`) : null;
            const geschlecht_extras = typeof TiageState !== 'undefined' ? TiageState.get(`personDimensions.${currentPerson}.geschlecht_extras`) || {} : {};
            calculatedValues = ProfileCalculator.calculateFlatNeeds(currentArchetyp, geschlecht, dominanz, orientierung, geschlecht_extras);
        }

        // Fallback: Roh-Werte aus BaseArchetypProfile
        if (!calculatedValues || Object.keys(calculatedValues).length === 0) {
            if (typeof BaseArchetypProfile !== 'undefined' && BaseArchetypProfile[currentArchetyp]) {
                calculatedValues = BaseArchetypProfile[currentArchetyp].umfrageWerte || {};
            }
        }

        if (!calculatedValues) {
            console.error('[AttributeSummaryCard] Keine Zielwerte für Reset gefunden');
            return;
        }

        // ═══════════════════════════════════════════════════════════════════════════
        // SCHRITT 2: NUR markierte Needs auf berechnete Werte zurücksetzen
        // ═══════════════════════════════════════════════════════════════════════════
        let resetCount = 0;
        needsToReset.forEach(needId => {
            const targetValue = calculatedValues[needId];
            if (targetValue === undefined) return;

            // Unlock + Wert setzen
            upsertNeed(needId, { value: targetValue, locked: false });

            // TiageState Lock entfernen (setNeedLocked existiert nicht — unlockNeed nutzen)
            if (typeof TiageState !== 'undefined' && TiageState.unlockNeed) {
                TiageState.unlockNeed(currentPerson, needId);
            }

            resetCount++;
        });

        console.log(`[AttributeSummaryCard] Reset: ${resetCount} von ${needsToReset.length} Needs zurückgesetzt`);

        // ═══════════════════════════════════════════════════════════════════════════
        // SCHRITT 3: RAM → TiageState synchronisieren + Persistieren
        // ═══════════════════════════════════════════════════════════════════════════
        syncRamToState();
        if (typeof TiageState !== 'undefined' && TiageState.saveToStorage) {
            TiageState.saveToStorage();
            console.log('[AttributeSummaryCard] Reset persistiert für', currentPerson);
        }

        // ═══════════════════════════════════════════════════════════════════════════
        // SCHRITT 4: UI aktualisieren
        // ═══════════════════════════════════════════════════════════════════════════
        document.dispatchEvent(new CustomEvent('flatNeedChange', { bubbles: true }));
        updateLockedCountDisplay();
        invalidateFlatNeedsCache();
        reRenderFlatNeeds();

        // Resonanzfaktoren neu berechnen und Header aktualisieren
        if (typeof ProfileCalculator !== 'undefined' && ProfileCalculator.recalculateResonanzForPerson) {
            ProfileCalculator.recalculateResonanzForPerson(currentPerson);
        }
        if (typeof ResonanzProfileHeaderCard !== 'undefined' && ResonanzProfileHeaderCard.update) {
            ResonanzProfileHeaderCard.update();
        }

        console.log(`[AttributeSummaryCard] Reset abgeschlossen: ${resetCount} Needs für ${currentPerson}/${currentArchetyp}`);
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
    function incrementSelectedNeeds(step = 10) {
        console.log("[incrementSelectedNeeds] START", {
            selectedSize: selectedNeeds.size,
            flatNeedsLen: flatNeeds.length,
            selectedIds: Array.from(selectedNeeds)
        });
        if (selectedNeeds.size === 0) return;

        let processedCount = 0;
        let skippedLocked = 0;
        let skippedMax = 0;
        let notFound = 0;

        selectedNeeds.forEach(needId => {
            const needObj = findNeedById(needId);
            if (!needObj) {
                notFound++;
                console.warn('[incrementSelectedNeeds] Need nicht gefunden:', needId);
                return;
            }
            if (needObj?.locked) {
                skippedLocked++;
                console.log('[incrementSelectedNeeds] LOCKED:', needId);
                return; // Skip locked needs
            }

            // v1.8.998: Alle Needs flach — kein Hauptfrage/Nuancen-Unterschied
            const currentValue = needObj?.value ?? 50;

            // Wert bleibt bei 100 wenn bereits erreicht
            if (currentValue >= 100) {
                skippedMax++;
                return;
            }

            processedCount++;
            const newValue = Math.min(100, currentValue + step);

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

            // Event für Änderungstracking
            document.dispatchEvent(new CustomEvent('flatNeedChange', {
                bubbles: true,
                detail: { needId, value: newValue, bulk: true }
            }));
        });

        // Aktualisiere Subtitle (geänderte Anzahl)
        updateLockedCountDisplay();
        console.log("[incrementSelectedNeeds] ENDE", { processed: processedCount, skippedLocked: skippedLocked, skippedMax: skippedMax, notFound: notFound });
    }

    /**
     * BULK-DECREMENT: Verringert alle markierten Bedürfnisse um einen Schritt
     * Werte die 0 erreichen bleiben dort bis alle anderen auch 0 sind
     * @param {number} step - Schrittgröße (Standard: 5)
     */
    function decrementSelectedNeeds(step = 10) {
        console.log("[decrementSelectedNeeds] START", { selectedSize: selectedNeeds.size, flatNeedsLen: flatNeeds.length });
        if (selectedNeeds.size === 0) return;

        let processedCount = 0;
        let skippedLocked = 0;
        let skippedMin = 0;
        let notFound = 0;

        selectedNeeds.forEach(needId => {
            const needObj = findNeedById(needId);
            if (!needObj) {
                notFound++;
                console.warn('[decrementSelectedNeeds] Need nicht gefunden:', needId);
                return;
            }
            if (needObj?.locked) {
                skippedLocked++;
                return; // Skip locked needs
            }

            // v1.8.998: Alle Needs flach — kein Hauptfrage/Nuancen-Unterschied
            const currentValue = needObj?.value ?? 50;

            // Wert bleibt bei 0 wenn bereits erreicht
            if (currentValue <= 0) {
                skippedMin++;
                return;
            }

            processedCount++;
            const newValue = Math.max(0, currentValue - step);

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

            // Event für Änderungstracking
            document.dispatchEvent(new CustomEvent('flatNeedChange', {
                bubbles: true,
                detail: { needId, value: newValue, bulk: true }
            }));
        });

        // Aktualisiere Subtitle (geänderte Anzahl)
        updateLockedCountDisplay();
        console.log("[decrementSelectedNeeds] ENDE", { processed: processedCount, skippedLocked: skippedLocked, skippedMin: skippedMin, notFound: notFound });
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
     * MULTI-SELECT: Sperrt/entsperrt alle ausgewählten Bedürfnisse
     * SSOT v2.0: Partner-Bedürfnisse sind NICHT manuell editierbar
     * @param {boolean} lockState - true = sperren, false = entsperren
     */
    function lockSelectedNeeds(lockState) {
        // Ermittle aktuelle Person aus Kontext
        let currentPerson = 'ich';
        if (window.currentProfileReviewContext && window.currentProfileReviewContext.person) {
            currentPerson = window.currentProfileReviewContext.person;
        }

        // SSOT v2.0: Partner-Bedürfnisse sind nicht editierbar
        if (currentPerson === 'partner') {
            console.warn('[AttributeSummaryCard] Partner-Bedürfnisse sind nicht editierbar');
            return;
        }

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
                const lockIcon = needItem.querySelector('.need-lock-icon');
                if (slider) slider.disabled = lockState;
                if (input) input.readOnly = lockState;
                if (lockIcon) lockIcon.textContent = lockState ? '🔒' : '🔓';

                // FIX v1.8.972: Aktualisiere "Geändert *" Indikator sofort
                const currentValue = needObj ? needObj.value : 50;
                updateChangedIndicator(needItem, needId, currentValue);
            }

            // v1.8.990: Lock wird in RAM gesetzt, Auto-Save erfolgt nach der Schleife
            lockedCount++;

            // Event
            document.dispatchEvent(new CustomEvent('flatNeedLockChange', {
                bubbles: true,
                detail: { needId, locked: lockState }
            }));
        }

        // PRINZIP: Filter + Markierung = Recordset
        // NUR die explizit markierten Bedürfnisse werden verarbeitet
        // Keine automatische Erweiterung auf Nuancen - der User entscheidet was markiert ist
        selectedNeeds.forEach(needId => {
            lockSingleNeed(needId);
        });

        // v1.8.990: Lock = Auto-Save — sofort persistieren
        if (lockedCount > 0) {
            // RAM → TiageState → Storage
            syncRamToState();
            if (typeof TiageState !== 'undefined' && TiageState.saveToStorage) {
                TiageState.saveToStorage();
            }

            console.log('[lockSelectedNeeds]', lockState ? 'Gesperrt' : 'Entsperrt', lockedCount, 'Bedürfnisse für', currentPerson, '(auto-saved)');
            showLockToast(lockState ? `🟢 ${lockedCount} Werte gesperrt & gespeichert` : `🟢 ${lockedCount} Werte entsperrt & gespeichert`);
            // Aktualisiere die "davon gesperrt: X" Anzeige im Subtitle
            updateLockedCountDisplay();
            // Button-State aktualisieren
            updateSelectedLockButtonState();
            // Badges aktualisieren (sollten jetzt alle 🟢 sein)
            updateAllSaveStatusBadges();
            // Auswahl nach Lock/Unlock leeren (verhindert Doppel-Lock)
            clearNeedSelection();
        }
    }

    /**
     * TOGGLE: Sperrt alle markierten wenn nicht alle gesperrt, entsperrt alle wenn alle gesperrt
     */
    function toggleLockSelectedNeeds() {
        if (selectedNeeds.size === 0) return;

        // FIX v1.8.973: Prüfe ob alle markierten bereits gesperrt sind
        let allLocked = true;
        selectedNeeds.forEach(needId => {
            const needObj = findNeedById(needId);
            if (!needObj || !needObj.locked) {
                allLocked = false;
            }
        });

        // Toggle: Wenn alle gesperrt → entsperren, sonst → sperren
        const newLockState = !allLocked;
        lockSelectedNeeds(newLockState);
    }

    /**
     * Kopiert markierte Bedürfnisse in ALLE Archetyp-Slots
     * FIX v1.8.970: Explicit Copy - Werte sofort in alle Slots schreiben
     */
    function copySelectedNeedsToAllArchetypes() {
        if (selectedNeeds.size === 0) {
            showLockToast('⚠ Keine Bedürfnisse markiert');
            return;
        }

        // Ermittle aktuelle Person
        let currentPerson = 'ich';
        if (window.currentProfileReviewContext && window.currentProfileReviewContext.person) {
            currentPerson = window.currentProfileReviewContext.person;
        }

        // Partner kann nicht kopiert werden
        if (currentPerson === 'partner') {
            showLockToast('⚠ Partner-Bedürfnisse können nicht kopiert werden');
            return;
        }

        const archetypes = ['single', 'duo', 'duoflex', 'solopoly', 'polyamor', 'ra', 'lat', 'aromantisch'];
        let copiedCount = 0;

        selectedNeeds.forEach(needId => {
            const needObj = findNeedById(needId);
            if (!needObj) return;

            const currentValue = needObj.value;

            // Kopiere in alle Archetyp-Slots
            archetypes.forEach(arch => {
                // Hole aktuellen flatNeeds für diesen Archetyp
                const archNeeds = TiageState.get(`flatNeeds.ich.${arch}`) || {};

                // Setze den Wert
                archNeeds[needId] = currentValue;

                // Schreibe zurück
                TiageState.set(`flatNeeds.ich.${arch}`, archNeeds);
            });

            copiedCount++;
        });

        // v1.8.990: Copy = Auto-Save — sofort persistieren
        if (copiedCount > 0) {
            if (typeof TiageState !== 'undefined' && TiageState.saveToStorage) {
                TiageState.saveToStorage();
            }

            showLockToast(`🟢 ${copiedCount} Bedürfnis(se) in ${archetypes.length} Archetypen kopiert & gespeichert`);
            console.log('[copySelectedNeedsToAllArchetypes] Kopiert:', copiedCount, 'Bedürfnisse in', archetypes.length, 'Archetypen (auto-saved)');

            // Auswahl leeren
            clearNeedSelection();
            // Badges aktualisieren
            updateAllSaveStatusBadges();
        }
    }

    /**
     * FIX v1.8.977: Aktualisiert nur die Save-Status-Badges (🟢/🔴)
     * Ohne komplettes Re-Rendering der Liste
     */
    function updateAllSaveStatusBadges() {
        // Aktualisiere Badges für flache Needs (Nuancen)
        flatNeeds.forEach(need => {
            const needItem = document.querySelector(`.flat-need-item[data-need="${need.id}"]`);
            if (!needItem) return;

            const controls = needItem.querySelector('.flat-need-controls');
            if (!controls) return;

            // Finde existierenden Badge
            const oldBadge = controls.querySelector('.save-status-badge');

            // Erstelle neuen Badge
            const newBadgeHtml = renderSaveStatusBadge(need.id, need.value, need.locked);

            if (oldBadge && newBadgeHtml) {
                // Ersetze alten Badge mit neuem
                const temp = document.createElement('div');
                temp.innerHTML = newBadgeHtml;
                const newBadge = temp.firstChild;
                oldBadge.replaceWith(newBadge);
            } else if (!oldBadge && newBadgeHtml) {
                // Füge neuen Badge am Anfang ein
                const temp = document.createElement('div');
                temp.innerHTML = newBadgeHtml;
                const newBadge = temp.firstChild;
                controls.insertBefore(newBadge, controls.firstChild);
            }
        });

        // UNIFIED v1.8.985: Kein separater Hauptfragen-Code mehr nötig!
        // Hauptfragen nutzen jetzt .flat-need-item[data-need] wie Nuancen
        // → Werden bereits im flatNeeds.forEach() oben erfasst
    }

    /**
     * DEPRECATED: Verwende updateAllSaveStatusBadges() stattdessen
     * FIX v1.8.971: Vergleicht RAM-Werte mit TiageState
     */
    function updateAllStatusIndicators() {
        flatNeeds.forEach(need => {
            const needItem = document.querySelector(`.flat-need-item[data-need="${need.id}"]`);
            if (!needItem) return;

            const lockIcon = needItem.querySelector('.need-lock-icon');
            if (!lockIcon) return;

            // Entferne alten Indikator
            const oldIndicator = lockIcon.querySelector('.lock-status-indicator');
            if (oldIndicator) oldIndicator.remove();

            // Ermittle Person
            let currentPerson = 'ich';
            if (window.currentProfileReviewContext?.person) {
                currentPerson = window.currentProfileReviewContext.person;
            }

            // Hole aktuellen Archetyp
            const archetyp = TiageState.get('archetypes.ich.primary') || 'single';

            // Hole RAM-Wert
            const ramValue = need.value;
            const ramLocked = need.locked;

            // Hole TiageState-Wert
            const stateNeeds = TiageState.get(`flatNeeds.ich.${archetyp}`) || {};
            const stateValue = stateNeeds[need.id];
            const stateLocked = TiageState.isNeedLocked(currentPerson, need.id);

            // Vergleiche: Synchron wenn Wert UND Lock-Status gleich
            const isSaved = (ramValue === stateValue) && (ramLocked === stateLocked);

            // Erstelle Status-Indikator
            const indicator = document.createElement('span');
            indicator.className = `lock-status-indicator ${isSaved ? 'saved' : 'unsaved'}`;
            indicator.title = isSaved ? 'Gespeichert ✓' : 'Nicht gespeichert (nur RAM) ✗';
            lockIcon.appendChild(indicator);
        });
    }

    /**
     * SSOT: Synchronisiert RAM (flatNeeds[]) → TiageState
     * Schreibt ALLE Locks und Values von flatNeeds in TiageState
     * MUSS vor saveToStorage() aufgerufen werden!
     */
    function syncRamToState() {
        if (typeof TiageState === 'undefined') {
            console.error('[SSOT] TiageState nicht verfügbar!');
            return;
        }

        let currentPerson = 'ich';
        if (window.currentProfileReviewContext?.person) {
            currentPerson = window.currentProfileReviewContext.person;
        }

        console.log(`[SSOT] Sync RAM → TiageState für ${currentPerson} (${flatNeeds.length} needs)`);

        // Alle Needs durchgehen und in TiageState schreiben
        flatNeeds.forEach(need => {
            if (need.locked) {
                // Need ist gelockt → lockNeed() mit aktuellem Wert
                if (TiageState.lockNeed) {
                    TiageState.lockNeed(currentPerson, need.id, need.value);
                }
            } else {
                // Need ist NICHT gelockt → entsperren falls es vorher gelockt war
                if (TiageState.isNeedLocked && TiageState.isNeedLocked(currentPerson, need.id)) {
                    if (TiageState.unlockNeed) {
                        TiageState.unlockNeed(currentPerson, need.id);
                    }
                }
                // Wert trotzdem schreiben (für ungelockte Needs)
                if (TiageState.setNeed) {
                    TiageState.setNeed(currentPerson, need.id, need.value);
                }
            }
        });

        console.log('[SSOT] ✅ Sync abgeschlossen - RAM → TiageState');
    }

    /**
     * Speichert alle Änderungen sofort (manueller Speicher-Button)
     * Gibt visuelles Feedback beim Speichern
     */
    function saveAllChanges() {
        const btn = document.querySelector('.bulk-save-btn');

        if (typeof TiageState !== 'undefined' && TiageState.saveToStorage) {
            // SSOT FIX v1.8.983: ERST RAM → TiageState synchronisieren!
            syncRamToState();

            // DANN persistieren (localStorage)
            TiageState.saveToStorage();
            console.log('[AttributeSummaryCard] ✅ Manuelles Speichern ausgeführt (RAM → State → Storage)');

            // Visuelles Feedback
            if (btn) {
                btn.classList.add('save-success');
                const icon = btn.querySelector('.bulk-btn-icon');
                const originalIcon = icon ? icon.textContent : '💾';
                if (icon) icon.textContent = '✓';

                setTimeout(() => {
                    btn.classList.remove('save-success');
                    if (icon) icon.textContent = originalIcon;
                }, 1500);
            }

            // FIX v1.8.977: Aktualisiere nur Save-Status-Badges (🔴 → 🟢), kein komplettes Re-Rendering
            updateAllSaveStatusBadges();
        } else {
            console.warn('[AttributeSummaryCard] TiageState.saveToStorage nicht verfügbar');
            if (btn) {
                btn.classList.add('save-error');
                setTimeout(() => btn.classList.remove('save-error'), 1500);
            }
        }
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

        // FIX v1.8.973: Nur 2 Zustände - kein "teilweise gesperrt" Text
        if (allLocked) {
            // Alle gesperrt → Entsperren-Icon
            if (icon) icon.textContent = '🔓';
            btn.title = 'Markierte Werte entsperren';
        } else {
            // Nicht alle gesperrt → Sperren-Icon (egal ob teilweise oder gar nicht)
            if (icon) icon.textContent = '🔒';
            btn.title = 'Markierte Werte sperren';
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

            return true;
        }

        return flatNeeds.filter(need => isNeedVisibleByFilters(need));
    }

    /**
     * Ermittelt den Lock-Status aller gefilterten Needs
     * v1.8.998: Vereinfacht — keine Nuancen-Kaskade mehr
     * @returns {{ allLocked: boolean, someLocked: boolean, lockedCount: number, totalCount: number }}
     */
    function getFilteredNeedsLockStatus() {
        const visibleNeeds = getVisibleFilteredNeeds();
        if (visibleNeeds.length === 0) {
            return { allLocked: false, someLocked: false, lockedCount: 0, totalCount: 0 };
        }

        let lockedCount = 0;
        const totalCount = visibleNeeds.length;

        visibleNeeds.forEach(need => {
            const needObj = findNeedById(need.id);
            if (needObj && needObj.locked) {
                lockedCount++;
            }
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
            const lockIcon = needItem.querySelector('.need-lock-icon');
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
     * BULK-LOCK TOGGLE: Sperrt/Entsperrt alle gefilterten (sichtbaren) Bedürfnisse
     * v1.8.998: Vereinfacht — keine Nuancen-Kaskade mehr
     * - Wenn ALLE gesperrt → alle entsperren
     * - Wenn TEILWEISE oder KEINE gesperrt → alle noch nicht gesperrten sperren
     */
    function toggleLockAllFilteredNeeds() {
        // Ermittle aktuelle Person aus Kontext
        let currentPerson = 'ich';
        if (window.currentProfileReviewContext && window.currentProfileReviewContext.person) {
            currentPerson = window.currentProfileReviewContext.person;
        }

        const visibleNeeds = getVisibleFilteredNeeds();

        if (visibleNeeds.length === 0) {
            showLockToast('Keine gefilterten Bedürfnisse vorhanden');
            return;
        }

        const status = getFilteredNeedsLockStatus();
        const shouldUnlock = status.allLocked;
        let changedCount = 0;

        visibleNeeds.forEach(need => {
            const needId = need.id;
            const needObj = findNeedById(needId);
            const isCurrentlyLocked = needObj && needObj.locked;

            if (shouldUnlock) {
                if (isCurrentlyLocked) {
                    changedCount += setNeedLockState(needId, false, currentPerson);
                }
            } else {
                if (!isCurrentlyLocked) {
                    changedCount += setNeedLockState(needId, true, currentPerson);
                }
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
            btn.title = 'Gefilterte Bedürfnisse entsperren';
        } else {
            // FIX v1.8.973: Nur 2 Zustände - kein "teilweise gesperrt" Text
            if (icon) icon.textContent = '🔒';
            btn.title = 'Gefilterte Bedürfnisse sperren';
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
     * v1.8.998: ENTFERNT — alle Needs werden flach angezeigt
     */

    /**
     * v1.8.998: expandedHauptfragen ENTFERNT — keine Expand/Collapse mehr
     */

    /**
     * Filter: Zeigt nur geänderte Bedürfnisse an
     * (Bedürfnisse deren Wert vom Archetyp-Standard abweicht)
     */
    let showOnlyChangedNeeds = false;

    /**
     * Baseline FlatNeeds: Speichert die Anfangswerte beim ersten Laden
     * v4.3: ENTFERNT — isValueChanged nutzt jetzt TiageState.isNeedLocked() (SSOT)
     * Kein fragiles In-Memory-Baseline mehr nötig.
     */

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
     * Prüft ob ein Bedürfnis vom User manuell geändert (= gesperrt) wurde.
     * v4.3 SSOT: "geändert" = "gesperrt" — kein fragiles Baseline mehr.
     * Ein gesperrtes Bedürfnis ist eine bewusste User-Entscheidung, egal ob
     * der Wert zufällig dem Archetyp-Standard entspricht oder nicht.
     *
     * FIX v1.8.972: Prüfe RAM-Status (flatNeeds.locked), nicht TiageState.
     * Mit Explicit Save Workflow sind Lock-Änderungen erst im RAM.
     *
     * @param {string} needId - #B-ID (z.B. '#B34')
     * @param {number} currentValue - Wird nicht mehr für Vergleich genutzt (Rückwärtskompatibilität)
     * @returns {boolean} true wenn vom User gesperrt, false wenn system-berechnet
     */
    function isValueChanged(needId, currentValue) {
        // FIX v1.8.972: Prüfe RAM-Status (flatNeeds), nicht TiageState
        // Mit Explicit Save Workflow sind Lock-Änderungen erst im RAM, nicht in persistent storage.
        const needObj = findNeedById(needId);
        if (needObj) {
            return needObj.locked === true;
        }
        return false;
    }

    /**
     * v4.3: No-Op — Baseline entfernt. isValueChanged nutzt TiageState.isNeedLocked() (SSOT).
     * Signatur beibehalten für Rückwärtskompatibilität.
     */
    function setBaselineForPerson(person, archetyp) {
        // v4.3: No-Op — kein Baseline mehr nötig
    }

    /**
     * v4.3: No-Op — Baseline entfernt. Reset ruft unlockNeed() auf → isNeedLocked = false → geändert = false.
     * Signatur beibehalten für Rückwärtskompatibilität.
     */
    function updateBaselineAfterReset(person, archetyp, resetNeedIds) {
        // v4.3: No-Op — kein Baseline mehr nötig
    }

    /**
     * v4.3: No-Op — Baseline entfernt. isValueChanged nutzt TiageState.isNeedLocked() (SSOT).
     * Signatur beibehalten für Rückwärtskompatibilität (wird exportiert).
     */
    function syncBaselineWithFlatNeeds(person, archetyp) {
        // v4.3: No-Op — kein Baseline mehr nötig
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

    // v1.8.998: toggleHauptfragenFilter() und toggleHauptfrageExpand() ENTFERNT
    // Alle Needs werden flach ohne Hierarchie angezeigt

    /**
     * Prüft ob ein Bedürfnis angezeigt werden soll (nur Hauptfragen, keine Nuancen)
     * Bedürfnisse die nicht im Katalog existieren werden ausgeblendet (z.B. B95-B125 wurden entfernt)
     * @param {string} needId - #B-ID (z.B. '#B34')
     * @returns {boolean} true wenn das Bedürfnis angezeigt werden soll
     */
    function shouldShowNeed(needId) {
        if (typeof BeduerfnisIds === 'undefined' || !BeduerfnisIds.beduerfnisse) {
            return true; // Fallback wenn Katalog nicht geladen
        }
        const need = BeduerfnisIds.beduerfnisse[needId];
        // Bedürfnis existiert nicht im Katalog → nicht anzeigen (z.B. entfernte B95-B125)
        if (!need) {
            return false;
        }
        // v1.8.998: Alle Needs gleichberechtigt anzeigen (keine Hauptfrage/Nuance-Hierarchie)
        return true;
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

        // FIX v1.8.966: Sortierung aus TiageState laden beim Archetyp-/Person-Wechsel
        if ((isNewArchetyp || isNewPerson) && typeof TiageState !== 'undefined') {
            const savedSorting = TiageState.get(`ui.needsSorting.${currentPerson}`);
            if (savedSorting) {
                currentFlatSortMode = savedSorting.sortMode || 'changed';
                sortStack = savedSorting.sortStack || ['changed'];
                Object.assign(sortDirections, savedSorting.sortDirections || {});
                additiveSortMode = savedSorting.additiveSortMode || false;
                currentSortPerson = currentPerson;
                console.log('[AttributeSummaryCard] Sortierung aus TiageState geladen:', savedSorting);
            }
        }

        // v4.3: No-Op (Baseline entfernt, isValueChanged nutzt Locks als SSOT)
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
        // v4.4: Filtere Nuancen und entfernte Bedürfnisse aus (B95-B125 wurden aus Katalog entfernt)
        let allNeeds = flatNeeds
            .filter(need => shouldShowNeed(need.id))
            .map(need => ({
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

        // v4.3: Zähle geänderte Bedürfnisse (= gesperrt/locked, SSOT via TiageState)
        // Bei aktivem Filter: zähle nur gefilterte geänderte Bedürfnisse
        const changedCount = filteredNeeds.filter(need => isValueChanged(need.id, need.value)).length;

        // v1.8.998: Hauptfragen-Aggregation ENTFERNT — alle Needs sind flach gleichberechtigt

        // Subtitle mit Filter-Info, gesperrten und geänderten Bedürfnissen
        const filterActive = filteredCount < totalNeedsCount;
        let subtitleText = filterActive
            ? `Dein ${archetypLabel}-Profil (Gefiltert: ${filteredCount} von ${totalNeedsCount}), davon gesperrt: ${lockedCount}`
            : `Dein ${archetypLabel}-Profil (${totalNeedsCount} Bedürfnisse), davon gesperrt: ${lockedCount}`;
        // Füge geänderte Zählung hinzu wenn > 0
        if (changedCount > 0) {
            subtitleText += `, geändert: ${changedCount}`;
        }

        // v1.8.998: Einheitlicher Titel (keine Hauptfragen-Ansicht mehr)
        const titleText = 'Alle Bedürfnisse';

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
                <span class="selection-counter${selectedNeeds.size > 0 ? ' has-selection' : ''}">${selectedNeeds.size > 0 ? selectedNeeds.size + ' markiert' : 'Klick = markieren, CTRL+Klick = mehrere'}</span>
                <div class="selection-quick-btns">
                    <button class="selection-quick-btn" data-action="select-all-needs" title="Alle sichtbaren markieren">Alle</button>
                    <button class="selection-quick-btn" data-action="clear-needs-selection" title="Keine markieren">Keine</button>
                    <button class="selection-quick-btn" data-action="invert-needs-selection" title="Markierung umkehren">Umkehren</button>
                </div>
                <div class="bulk-action-card${selectedNeeds.size === 0 ? ' disabled' : ''}">
                    <button class="bulk-reset-btn" data-action="bulk-reset-needs" title="Markierte (nicht gesperrte) Werte auf Original zurücksetzen" ${selectedNeeds.size === 0 ? 'disabled' : ''}>
                        <span class="bulk-btn-icon">↺</span>
                        <span class="bulk-btn-label">Reset</span>
                    </button>
                </div>
                <button class="bulk-save-btn" data-action="bulk-save-needs" title="Alle Änderungen jetzt speichern">
                    <span class="bulk-btn-icon">💾</span>
                    <span class="bulk-btn-label">Speichern</span>
                </button>
            </div>
        </div>`;

        // NOTE: Filter-Container ist bereits oben in der Header-Sektion (Zeile ~1346)
        // Kein zweiter Container nötig - wurde entfernt um duplicate ID zu vermeiden

        // v1.8.998: Einheitliche flache Liste — alle Needs gleichberechtigt
        html += `<div class="flat-needs-list-wrapper">
            <div class="flat-needs-list">`;
        sortedNeeds.forEach(need => {
            const needObj = findNeedById(need.id);
            const isLocked = needObj?.locked || false;
            const dimColor = getDimensionColor(need.id);

            const hiddenByChangedFilter = showOnlyChangedNeeds && !isValueChanged(need.id, need.value);
            const hiddenByDimensionFilter = typeof DimensionKategorieFilter !== 'undefined' &&
                !DimensionKategorieFilter.shouldShowNeed(need.id);
            const shouldHide = hiddenByChangedFilter || hiddenByDimensionFilter;

            html += renderFlatNeedItem(need.id, need.label, need.value, isLocked, dimColor, shouldHide);
        });
        html += `</div>`;
        html += `</div>`;

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

        // FIX v1.8.966: Sortierung in TiageState persistent speichern
        if (typeof TiageState !== 'undefined') {
            TiageState.set(`ui.needsSorting.${currentSortPerson}`, {
                sortMode: currentFlatSortMode,
                sortStack: [...sortStack],
                sortDirections: {...sortDirections},
                additiveSortMode: additiveSortMode
            });
        }

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

        // REFACTORING v1.8.982: loadLockedHauptfragen() entfernt
        // Hauptfragen werden jetzt in getFlatNeedsFromState() geladen

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
     * @param {string} [newArchetyp] - Optional: Neuer Archetyp (bei Archetyp-Wechsel)
     */
    function reRenderFlatNeeds(newArchetyp) {
        // Bei Archetyp-Wechsel: Neuen Archetyp und Label verwenden
        let archetyp = currentFlatArchetyp;
        let archetypLabel = currentFlatArchetypLabel;

        if (newArchetyp && typeof TiageArchetypes !== 'undefined') {
            archetyp = newArchetyp;
            // Label aus TiageArchetypes holen
            archetypLabel = TiageArchetypes.getName(newArchetyp) || newArchetyp;
            console.log('[AttributeSummaryCard] Rerender mit neuem Archetyp:', archetyp, 'Label:', archetypLabel);
        }

        if (!archetyp || !archetypLabel) return;

        const container = document.querySelector('.flat-needs-container');
        if (!container) return;

        // Generiere neuen HTML
        const newHtml = renderAllNeedsFlat(archetyp, archetypLabel);

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
     * Rendert den Speicher-Status-Badge (🟢 gespeichert / 🔴 nicht gespeichert)
     * FIX v1.8.975: Explicit Save Workflow - zeigt ob RAM-Werte mit TiageState übereinstimmen
     * @param {string} needId - #B-ID
     * @param {number} ramValue - Aktueller Wert im RAM
     * @param {boolean} ramLocked - Lock-Status im RAM
     * @returns {string} HTML für den Status-Badge
     */
    function renderSaveStatusBadge(needId, ramValue, ramLocked) {
        // Prüfe ob TiageState verfügbar ist
        if (typeof TiageState === 'undefined' || !TiageState.get || !TiageState.isNeedLocked) {
            // Fallback: Zeige 🔴 (nicht gespeichert) wenn TiageState nicht verfügbar
            return `<span class="save-status-badge save-status-unsaved" title="Storage nicht verfügbar">🔴</span>`;
        }

        try {
            // Ermittle Person und Archetyp
            let currentPerson = 'ich';
            if (window.currentProfileReviewContext?.person) {
                currentPerson = window.currentProfileReviewContext.person;
            }
            const archetyp = TiageState.get('archetypes.ich.primary') || 'single';

            // REFACTORING v1.8.982: Vereinfachte Logik - alle Needs (inkl. Hauptfragen) in flatNeeds
            // Einheitliche Speicherstruktur - keine Sonderbehandlung mehr nötig!
            const stateNeeds = TiageState.get(`flatNeeds.${currentPerson}.${archetyp}`) || {};
            const stateValue = stateNeeds[needId];
            const stateLocked = TiageState.isNeedLocked(currentPerson, needId);

            // Vergleiche: Synchron wenn Wert UND Lock-Status gleich
            const isSaved = (ramValue === stateValue) && (ramLocked === stateLocked);

            const icon = isSaved ? '🟢' : '🔴';
            const title = isSaved ? 'Gespeichert ✓' : 'Nicht gespeichert (nur RAM) ✗';
            const cssClass = isSaved ? 'save-status-saved' : 'save-status-unsaved';

            return `<span class="save-status-badge ${cssClass}" title="${title}">${icon}</span>`;
        } catch (error) {
            console.error('[renderSaveStatusBadge] Fehler:', error, 'needId:', needId);
            return `<span class="save-status-badge save-status-unsaved" title="Fehler beim Laden">🔴</span>`;
        }
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
    /**
     * v1.8.998: Vereinfachtes Rendering — alle Needs gleichberechtigt (keine Hierarchie)
     * @param {string} needId - #B-ID
     * @param {string} label - Anzeige-Label
     * @param {number} value - Wert 0-100
     * @param {boolean} isLocked - Ob fixiert
     * @param {string|null} dimensionColor - Farbe für border-left
     * @param {boolean} shouldHide - Ob durch Filter versteckt
     */
    function renderFlatNeedItem(needId, label, value, isLocked, dimensionColor, shouldHide = false) {
        // v1.8.998: Vereinfacht — keine hfOptions, keine Hauptfrage/Nuancen-Unterscheidung
        value = roundTo25(value);

        const itemStyle = dimensionColor
            ? `style="border-left: 5px solid ${dimensionColor}; --dimension-color: ${dimensionColor};"`
            : '';
        const colorClass = dimensionColor ? ' has-dimension-color' : '';
        const isSelected = selectedNeeds.has(needId);
        const selectedClass = isSelected ? ' need-selected' : '';
        const filterHiddenClass = shouldHide ? ' dimension-filter-hidden' : '';

        const sliderStyle = dimensionColor
            ? `style="background: ${getSliderFillGradient(dimensionColor, value)};"`
            : '';

        const valueChanged = isValueChanged(needId, value);
        const changedIndicator = valueChanged ? ' <span class="value-changed-indicator" title="Wert wurde geändert">*</span>' : '';
        const changedClass = valueChanged ? ' value-changed' : '';

        const rFactorBadge = renderRFactorBadge(needId, value);
        const godModBadge = renderModifierBadges(needId);
        const saveStatusBadge = renderSaveStatusBadge(needId, value, isLocked);
        const lockTitle = isLocked ? 'Entsperren' : 'Sperren';

        return `
        <div class="flat-need-item${isLocked ? ' need-locked' : ''}${colorClass}${selectedClass}${filterHiddenClass}${changedClass}" data-need="${needId}" ${itemStyle}
             onclick="AttributeSummaryCard.toggleNeedSelection('${needId}', event)">
            <div class="flat-need-header">
                <span class="flat-need-label clickable"
                      onclick="event.stopPropagation(); openNeedWithResonance('${needId}')"
                      title="Klicken für Resonanz-Details">${label}${changedIndicator}</span>
                <div class="flat-need-controls">
                    ${saveStatusBadge}
                    ${godModBadge}
                    ${rFactorBadge}
                    <span class="need-lock-icon"
                          onclick="event.stopPropagation(); AttributeSummaryCard.toggleFlatNeedLock('${needId}', this)"
                          title="${lockTitle}">${isLocked ? '🔒' : '🔓'}</span>
                </div>
            </div>
            <div class="flat-need-slider-row">
                <input type="range" class="need-slider"
                       min="0" max="100" step="10" value="${value}"
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
     * SSOT v2.0: Partner-Bedürfnisse sind NICHT manuell editierbar
     */
    function onFlatSliderInput(needId, value, sliderElement) {
        // SSOT v2.0: Partner-Bedürfnisse sind nicht editierbar
        if (currentFlatPerson === 'partner') {
            console.warn('[AttributeSummaryCard] Partner-Bedürfnisse sind nicht editierbar');
            return;
        }
        const needObj = findNeedById(needId);
        if (needObj?.locked) return;

        const numValue = parseInt(value, 10);
        if (isNaN(numValue)) return;

        // Aktualisiere oder erstelle Bedürfnis
        upsertNeed(needId, { value: numValue });

        // v1.8.998: Hauptfrage→Nuancen Propagation ENTFERNT — alle Needs unabhängig

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

            // FIX v1.8.998: Save-Status-Badge aktualisieren (🟢→🔴)
            const controls = needItem.querySelector('.flat-need-controls');
            if (controls) {
                const oldBadge = controls.querySelector('.save-status-badge');
                const newBadgeHtml = renderSaveStatusBadge(needId, numValue, needObj?.locked || false);
                if (oldBadge && newBadgeHtml) {
                    const temp = document.createElement('div');
                    temp.innerHTML = newBadgeHtml;
                    oldBadge.replaceWith(temp.firstChild);
                }
            }
        }

        // Event für Änderungstracking
        document.dispatchEvent(new CustomEvent('flatNeedChange', {
            bubbles: true,
            detail: { needId, value: numValue }
        }));

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

            // v1.8.998: updateParentHauptfrageValue() entfernt — keine Aggregation
        });
    }

    // v1.8.998: updateParentHauptfrageValue, toggleHauptfrageLock, onHauptfrageSliderInput,
    // getAggregatedValueForHauptfrage, getAggregatedValueLimits ENTFERNT — keine Hierarchie mehr

    /**
     * Passt die nicht-gelockten Nuancen einer Hauptfrage an, um den Zielwert zu erreichen.
     * Begrenzt den Slider auf den erreichbaren Bereich wenn Nuancen gelockt sind.
     * @param {string} hauptfrageId - Die #B-ID der Hauptfrage
     * @param {number} targetValue - Der gewünschte Zielwert
     * @param {HTMLElement} sliderElement - Das Slider-Element
     * @param {HTMLElement} hauptfrageItem - Das Hauptfrage-Container-Element
     * @returns {Object} { handled: boolean, finalValue: number }
     */
    // v1.8.998: adjustNuancenToTarget, updateHauptfrageUI, updateHauptfrageChangedIndicator,
    // updateNuanceSlider ENTFERNT — keine Hierarchie/Aggregation mehr

    // v1.8.998: checkHauptfrageHasNuancen, areAllNuancenLocked, updateHauptfrageValue,
    // isNuanceLockedByHauptfrage ENTFERNT — keine Hierarchie mehr

    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Aktualisiert einen Bedürfniswert in der flachen Darstellung
     * SSOT v2.0: Partner-Bedürfnisse sind NICHT manuell editierbar
     */
    function updateFlatNeedValue(needId, value) {
        // SSOT v2.0: Partner-Bedürfnisse sind nicht manuell editierbar
        if (currentFlatPerson === 'partner') {
            console.warn('[AttributeSummaryCard] Partner-Bedürfnisse sind nicht editierbar');
            return;
        }
        const needObj = findNeedById(needId);
        if (needObj?.locked) return;

        // FIX: Wert auf 25er Schritte runden
        const numValue = roundTo25(parseInt(value, 10));
        if (isNaN(numValue) || numValue < 0 || numValue > 100) return;

        // Aktualisiere oder erstelle Bedürfnis
        upsertNeed(needId, { value: numValue });

        // v1.8.998: Hauptfrage→Nuancen Propagation ENTFERNT — alle Needs unabhängig

        // Auto-Sort auf "changed" wenn Wert geändert wird
        if (isValueChanged(needId, numValue) && currentFlatSortMode !== 'changed') {
            currentFlatSortMode = 'changed';
            savedStatePerPerson[currentSortPerson].sortMode = 'changed';
        }

        // Sync Slider
        const needItem = document.querySelector(`.flat-need-item[data-need="${needId}"]`);
        if (needItem) {
            const slider = needItem.querySelector('.need-slider');
            if (slider) {
                slider.value = numValue;
                // Slider-Track-Hintergrund aktualisieren
                const dimColor = getDimensionColor(needId);
                if (dimColor) {
                    slider.style.background = getSliderFillGradient(dimColor, numValue, slider);
                }
            }

            // Changed-Indicator (*) aktualisieren
            updateChangedIndicator(needItem, needId, numValue);

            // FIX v1.8.998: Save-Status-Badge aktualisieren (🟢→🔴)
            const controls = needItem.querySelector('.flat-need-controls');
            if (controls) {
                const oldBadge = controls.querySelector('.save-status-badge');
                const newBadgeHtml = renderSaveStatusBadge(needId, numValue, needObj?.locked || false);
                if (oldBadge && newBadgeHtml) {
                    const temp = document.createElement('div');
                    temp.innerHTML = newBadgeHtml;
                    oldBadge.replaceWith(temp.firstChild);
                }
            }
        }

        // Event
        document.dispatchEvent(new CustomEvent('flatNeedChange', {
            bubbles: true,
            detail: { needId, value: numValue }
        }));

        // Aktualisiere den Subtitle mit der neuen Geändert-Zählung
        updateLockedCountDisplay();
    }

    /**
     * Toggle Lock für ein Bedürfnis in der flachen Darstellung
     * BULK-EDIT: Wenn das Bedürfnis markiert ist, werden alle markierten mit gesperrt/entsperrt
     * SSOT v2.0: Partner-Bedürfnisse sind NICHT manuell editierbar
     */
    function toggleFlatNeedLock(needId, lockElement) {
        // SSOT v2.0: Partner-Bedürfnisse sind nicht editierbar (keine Locks möglich)
        if (currentFlatPerson === 'partner') {
            console.warn('[AttributeSummaryCard] Partner-Bedürfnisse sind nicht editierbar');
            return;
        }
        const needObj = findNeedById(needId);
        const newLockState = needObj ? !needObj.locked : true;

        // Aktualisiere oder erstelle Bedürfnis
        upsertNeed(needId, { locked: newLockState });
        const isLocked = newLockState;
        // Update UI
        const needItem = lockElement.closest('.flat-need-item');
        if (needItem) {
            needItem.classList.toggle('need-locked', isLocked);

            const slider = needItem.querySelector('.need-slider');
            const input = needItem.querySelector('.flat-need-input');
            const lockIcon = needItem.querySelector('.need-lock-icon');

            if (slider) slider.disabled = isLocked;
            if (input) input.readOnly = isLocked;

            // FIX v1.8.984: UPDATE LOCK ICON! 🔒/🔓
            if (lockIcon) {
                lockIcon.textContent = isLocked ? '🔒' : '🔓';
                lockIcon.title = isLocked ? 'Wert fixiert - Klick zum Entsperren' : 'Wert flexibel - Klick zum Fixieren';
            }
        }

        // v1.8.990: Lock = Auto-Save — sofort persistieren
        syncRamToState();
        if (typeof TiageState !== 'undefined' && TiageState.saveToStorage) {
            TiageState.saveToStorage();
        }

        showLockToast(isLocked ? '🟢 Wert gesperrt & gespeichert' : '🟢 Wert entsperrt & gespeichert');

        // Aktualisiere die "davon gesperrt: X" Anzeige im Subtitle
        updateLockedCountDisplay();

        // FIX v1.8.979: Konsistent mit lockSelectedNeeds() - gleiche Update-Funktion
        updateAllSaveStatusBadges();

        // Event (für andere Listener)
        document.dispatchEvent(new CustomEvent('flatNeedLockChange', {
            bubbles: true,
            detail: { needId, locked: isLocked }
        }));

        // v1.8.998: Hauptfrage-Lock-Propagation entfernt — keine Hierarchie mehr
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

        // v4.3: Zähle geänderte Bedürfnisse (= gesperrt/locked, SSOT via TiageState)
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
                // v4.3: locked: false verhindert Auto-Lock bei programmatischem Laden
                upsertNeed(needId, { value: numValue, locked: false });
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
                const lockIcon = needItem.querySelector('.need-lock-icon');

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

        const aggregatedValue = roundTo25(calculateAggregatedValue(attrId));
        const hintHtml = hint ? ` <span class="dimension-hint">(${hint})</span>` : '';
        const infoIconHtml = description
            ? ` <span class="attr-info-icon" onclick="event.stopPropagation(); openAttributeDefinitionModal('${attrId}')" title="Info anzeigen">ℹ</span>`
            : '';

        // Prüfe ob Slider aktiviert sein sollen
        const useSliders = SLIDER_ENABLED_CATEGORIES.includes(mapping.category);

        // Generiere Bedürfnis-Liste für Expansion
        const needsListHtml = mapping.needs.map(need => {
            const needLabel = getNeedLabel(need);
            const needValue = roundTo25(needsValues[attrId][need] || 50);
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
                               min="0" max="100" step="10" value="${needValue}"
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

        // FIX: Wert auf 25er Schritte runden
        const numValue = roundTo25(parseInt(value, 10));
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
                summaryInput.value = roundTo25(calculateAggregatedValue(attrId));
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
                summaryInput.value = roundTo25(calculateAggregatedValue(attrId));
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
        return roundTo25(calculateAggregatedValue(attrId));
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
                summaryInput.value = roundTo25(calculateAggregatedValue(attrId));
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
                aggregated: roundTo25(calculateAggregatedValue(attrId)),
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
        // v1.8.998: Hauptfragen-Funktionen entfernt (keine Hierarchie mehr)
        GFK_KATEGORIEN,
        // Multi-Select Feature für Bedürfnisse
        toggleNeedSelection,
        clearNeedSelection,
        selectAllFilteredNeeds,
        invertNeedSelection,
        resetSelectedNeedsValues,
        resetFilters,
        updateSelectedNeedsValue,
        lockSelectedNeeds,
        toggleLockSelectedNeeds,
        copySelectedNeedsToAllArchetypes,
        saveAllChanges,
        updateSelectedLockButtonState,
        // NEU: Bulk-Increment/Decrement für markierte Bedürfnisse
        incrementSelectedNeeds,
        decrementSelectedNeeds,
        getSelectedNeeds: function() { return selectedNeeds; },
        // NEU: Person-spezifische Lock-Synchronisierung
        syncLocksFromState: syncLocksFromTiageState,
        // v4.3: No-Op (Baseline entfernt, beibehalten für Rückwärtskompatibilität)
        syncBaselineWithFlatNeeds
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AttributeSummaryCard;
}

// Export für Browser (onclick-Handler benötigen window.AttributeSummaryCard)
if (typeof window !== 'undefined') {
    window.AttributeSummaryCard = AttributeSummaryCard;
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

            // REFACTORING v1.8.982: loadLockedHauptfragen() entfernt
            // Hauptfragen werden automatisch in getFlatNeedsFromState() geladen
        }
    });

    // FIX v1.8.970: Event-Delegation für Bulk-Action-Buttons
    document.addEventListener('click', function(event) {
        const target = event.target.closest('[data-action]');
        if (!target) return;

        const action = target.dataset.action;

        switch (action) {
            case 'bulk-copy-needs':
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.copySelectedNeedsToAllArchetypes) {
                    AttributeSummaryCard.copySelectedNeedsToAllArchetypes();
                }
                break;
            case 'bulk-lock-needs':
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.toggleLockSelectedNeeds) {
                    AttributeSummaryCard.toggleLockSelectedNeeds();
                }
                break;
            case 'bulk-increment-needs':
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.incrementSelectedNeeds) {
                    AttributeSummaryCard.incrementSelectedNeeds();
                }
                break;
            case 'bulk-decrement-needs':
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.decrementSelectedNeeds) {
                    AttributeSummaryCard.decrementSelectedNeeds();
                }
                break;
            case 'bulk-reset-needs':
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.resetSelectedNeedsValues) {
                    AttributeSummaryCard.resetSelectedNeedsValues();
                }
                break;
            case 'bulk-save-needs':
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.saveAllChanges) {
                    AttributeSummaryCard.saveAllChanges();
                }
                break;
            case 'select-all-needs':
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.selectAllFilteredNeeds) {
                    AttributeSummaryCard.selectAllFilteredNeeds();
                }
                break;
            case 'clear-needs-selection':
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.clearNeedSelection) {
                    AttributeSummaryCard.clearNeedSelection();
                }
                break;
            case 'invert-needs-selection':
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.invertNeedSelection) {
                    AttributeSummaryCard.invertNeedSelection();
                }
                break;
        }
    });
}
