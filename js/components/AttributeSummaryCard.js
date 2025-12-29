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
     * Speicher für flache Bedürfnisse als Array von Objekten
     * NEUE STRUKTUR (v1.8.128): Array mit einheitlicher Objekt-Struktur
     *
     * Format: [
     *   { id: "#B1", key: 1, stringKey: "sicherheit", label: "Sicherheit", value: 50, locked: false },
     *   { id: "#B2", key: 2, stringKey: "geborgenheit", label: "Geborgenheit", value: 75, locked: true },
     *   ...
     * ]
     *
     * Vorteile:
     * - Einheitliche Struktur überall (Matching-Ergebnisse, Storage, UI)
     * - Alle Metadaten direkt am Objekt (id, key, label, value, locked)
     * - Einfache Iteration und Filterung
     */
    let flatNeeds = [];

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
     * Helper: Aktualisiert ein Bedürfnis oder fügt es hinzu
     * @param {string} id - Die #B-ID
     * @param {Object} updates - Zu aktualisierende Felder
     */
    function upsertNeed(id, updates) {
        const index = findNeedIndex(id);
        if (index >= 0) {
            flatNeeds[index] = { ...flatNeeds[index], ...updates };
        } else {
            // Neues Bedürfnis hinzufügen mit vollständigen Metadaten
            const numKey = parseInt(id.replace('#B', ''), 10) || 0;
            let stringKey = '';
            if (typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.toKey) {
                stringKey = BeduerfnisIds.toKey(id) || '';
            }
            flatNeeds.push({
                id: id,
                key: numKey,
                stringKey: stringKey,
                label: getNeedLabel(id).replace(/^#B\d+\s*/, ''), // Label ohne #B-Prefix
                value: 50,
                locked: false,
                ...updates
            });
        }

        // FIX: Direkt in TiageState synchronisieren (SSOT)
        // Ohne diesen Code werden Änderungen auf Seiten ohne flatNeedChange-Handler nicht synchronisiert
        if (typeof TiageState !== 'undefined') {
            let currentPerson = 'ich';
            if (window.currentProfileReviewContext && window.currentProfileReviewContext.person) {
                currentPerson = window.currentProfileReviewContext.person;
            }

            // Value synchronisieren
            if (updates.value !== undefined && TiageState.setNeed) {
                TiageState.setNeed(currentPerson, id, updates.value);
            }

            // Lock-Status synchronisieren (SSOT für Locks ist TiageState.profileReview.lockedNeeds)
            if (updates.locked !== undefined) {
                if (updates.locked && TiageState.lockNeed) {
                    // Beim Sperren: Wert in lockedNeeds speichern
                    const currentValue = updates.value !== undefined ? updates.value :
                        (findNeedById(id)?.value || 50);
                    TiageState.lockNeed(currentPerson, id, currentValue);
                } else if (!updates.locked && TiageState.unlockNeed) {
                    // Beim Entsperren: Aus lockedNeeds entfernen
                    TiageState.unlockNeed(currentPerson, id);
                }
            }
        }
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
    }

    /**
     * MULTI-SELECT: Wählt alle gefilterten (sichtbaren) Bedürfnisse aus oder ab
     * Toggle-Logik: Wenn alle gefilterten bereits ausgewählt → alle abwählen, sonst alle auswählen
     * WICHTIG: Bei aktiven Filtern werden NUR die gefilterten Bedürfnisse berücksichtigt
     */
    function selectAllFilteredNeeds() {
        // Ermittle alle sichtbaren (nicht gefilterten) Bedürfnisse
        // FILTER DEAKTIVIERT - Zeige alle Bedürfnisse ohne DimensionKategorieFilter
        const visibleNeeds = flatNeeds.filter(need => {
            // DimensionKategorieFilter DEAKTIVIERT für SSOT-Refactoring
            // if (typeof DimensionKategorieFilter !== 'undefined' && !DimensionKategorieFilter.shouldShowNeed(need.id)) {
            //     return false;
            // }
            // Prüfe auch Suchfilter (dimension-filter-hidden und filter-hidden Klassen)
            const needItem = document.querySelector(`.flat-need-item[data-need="${need.id}"]`);
            if (needItem && (needItem.classList.contains('dimension-filter-hidden') || needItem.classList.contains('filter-hidden'))) {
                return false;
            }
            return true;
        });

        // Ermittle nicht-sichtbare (gefilterte) Bedürfnisse
        // FILTER DEAKTIVIERT - DimensionKategorieFilter für SSOT-Refactoring
        const hiddenNeeds = flatNeeds.filter(need => {
            // DimensionKategorieFilter DEAKTIVIERT für SSOT-Refactoring
            // if (typeof DimensionKategorieFilter !== 'undefined' && !DimensionKategorieFilter.shouldShowNeed(need.id)) {
            //     return true;
            // }
            // Prüfe auch Suchfilter (dimension-filter-hidden und filter-hidden Klassen)
            const needItem = document.querySelector(`.flat-need-item[data-need="${need.id}"]`);
            if (needItem && (needItem.classList.contains('dimension-filter-hidden') || needItem.classList.contains('filter-hidden'))) {
                return true;
            }
            return false;
        });

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
    }

    /**
     * MULTI-SELECT: Setzt alle ausgewählten Bedürfnisse auf ihre Original-Profil-Werte zurück
     * Lädt die Werte aus LoadedArchetypProfile (SSOT) - kein Fallback
     */
    function resetSelectedNeedsValues() {
        // Ermittle aktuelle Person aus Kontext
        let currentPerson = 'ich';
        if (typeof window !== 'undefined' && window.currentProfileReviewContext?.person) {
            currentPerson = window.currentProfileReviewContext.person;
        }

        // Hole berechnete Werte aus LoadedArchetypProfile (SSOT)
        const loadedProfile = (typeof window !== 'undefined' && window.LoadedArchetypProfile)
            ? window.LoadedArchetypProfile[currentPerson]
            : null;

        if (!loadedProfile?.profileReview?.flatNeeds) {
            console.error('[AttributeSummaryCard] Keine Original-Werte gefunden in LoadedArchetypProfile für', currentPerson);
            alert('Zurücksetzen nicht möglich: Keine Original-Profil-Werte gefunden. Bitte laden Sie zuerst ein Profil.');
            return;
        }

        const umfrageWerte = loadedProfile.profileReview.flatNeeds;
        console.log('[AttributeSummaryCard] Reset mit berechneten Werten aus LoadedArchetypProfile für', currentPerson);

        // Wenn keine Bedürfnisse ausgewählt sind, alle ungesperrten Bedürfnisse zurücksetzen
        const needsToReset = selectedNeeds.size > 0
            ? Array.from(selectedNeeds)
            : Object.keys(umfrageWerte);

        console.log(`[AttributeSummaryCard] ${selectedNeeds.size > 0 ? 'Ausgewählte' : 'Alle'} Bedürfnisse werden zurückgesetzt:`, needsToReset.length);

        let resetCount = 0;
        needsToReset.forEach(needId => {
            const needObj = findNeedById(needId);

            // WICHTIG: Gesperrte Bedürfnisse NICHT zurücksetzen
            if (needObj?.locked) {
                console.log(`[AttributeSummaryCard] ${needId} ist gesperrt - Reset übersprungen`);
                return;
            }

            const originalValue = umfrageWerte[needId];
            if (originalValue !== undefined && needObj) {
                // Setze den Wert auf den Original-Profil-Wert zurück
                upsertNeed(needId, { value: originalValue });

                // Update UI
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

                // Aktualisiere auch den gespeicherten Original-Wert
                originalNeedValues.set(needId, originalValue);
                resetCount++;
            }
        });

        console.log(`[AttributeSummaryCard] ${resetCount} Bedürfnisse auf Original-Werte zurückgesetzt`);

        // Trigger event for resonance recalculation
        if (resetCount > 0) {
            document.dispatchEvent(new CustomEvent('flatNeedChange', { bubbles: true }));
        }

        // FIX: Auch Filter zurücksetzen um das konsolidierte Layout zu zeigen
        if (typeof DimensionKategorieFilter !== 'undefined') {
            DimensionKategorieFilter.reset(true);
            const currentPerson = DimensionKategorieFilter.getCurrentPerson ?
                DimensionKategorieFilter.getCurrentPerson() : 'ich';
            if (DimensionKategorieFilter.saveStateForPerson) {
                DimensionKategorieFilter.saveStateForPerson(currentPerson);
            }
        }
        showOnlyChangedNeeds = false;

        // Auswahl löschen und Liste neu rendern
        clearNeedSelection();
        reRenderFlatNeeds();
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
     * @param {boolean} lockState - true = sperren, false = entsperren
     */
    function lockSelectedNeeds(lockState) {
        // Ermittle aktuelle Person aus Kontext
        let currentPerson = 'ich';
        if (window.currentProfileReviewContext && window.currentProfileReviewContext.person) {
            currentPerson = window.currentProfileReviewContext.person;
        }

        let lockedCount = 0;
        selectedNeeds.forEach(needId => {
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

            // ═══════════════════════════════════════════════════════════════════════════
            // FIX: Speichere Lock-Status in TiageState (SSOT)
            // ═══════════════════════════════════════════════════════════════════════════
            if (typeof TiageState !== 'undefined') {
                if (lockState) {
                    // Beim Sperren: Speichere Wert
                    const currentValue = needObj ? needObj.value : 50;
                    TiageState.lockNeed(currentPerson, needId, currentValue);
                } else {
                    // Beim Entsperren: Entferne aus lockedNeeds
                    TiageState.unlockNeed(currentPerson, needId);
                }
                lockedCount++;
            }

            // Event
            document.dispatchEvent(new CustomEvent('flatNeedLockChange', {
                bubbles: true,
                detail: { needId, locked: lockState }
            }));
        });

        // Einmal speichern nach allen Änderungen
        if (typeof TiageState !== 'undefined' && lockedCount > 0) {
            TiageState.saveToStorage();
            console.log('[lockSelectedNeeds]', lockState ? 'Gesperrt' : 'Entsperrt', lockedCount, 'Bedürfnisse für', currentPerson);
            showLockToast(lockState ? `${lockedCount} Werte gesperrt` : `${lockedCount} Werte entsperrt`);
            // Aktualisiere die "davon gesperrt: X" Anzeige im Subtitle
            updateLockedCountDisplay();
        }
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

        // PRIORITÄT 2: Vergleiche gegen statische Archetyp-Werte aus GfkBeduerfnisse
        // (Falls kein Baseline gesetzt ist)
        if (initialValue === undefined) {
            const archetyp = currentFlatArchetyp || 'polyamor';
            if (typeof GfkBeduerfnisse !== 'undefined' && GfkBeduerfnisse.archetypProfile?.[archetyp]?.umfrageWerte) {
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
     * @param {string} person - 'ich' oder 'partner'
     * @param {string} archetyp - Archetyp-ID
     */
    function setBaselineForPerson(person, archetyp) {
        // Nur setzen wenn noch nicht für diesen Archetyp gesetzt
        if (baselineArchetyp[person] === archetyp && baselineFlatNeeds[person]) {
            return; // Bereits gesetzt für diesen Archetyp
        }

        // Hole die berechneten Anfangswerte aus GfkBeduerfnisse
        if (typeof GfkBeduerfnisse !== 'undefined' && GfkBeduerfnisse.archetypProfile?.[archetyp]?.umfrageWerte) {
            // Tiefe Kopie der Basis-Werte
            baselineFlatNeeds[person] = { ...GfkBeduerfnisse.archetypProfile[archetyp].umfrageWerte };
            baselineArchetyp[person] = archetyp;
            console.log('[AttributeSummaryCard] Baseline gesetzt für', person, '/', archetyp, '- Anzahl:', Object.keys(baselineFlatNeeds[person]).length);
        }
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

        // Hole ALLE Bedürfnisse - BEVORZUGE berechnete Werte aus LoadedArchetypProfile (Basis + Modifikatoren)
        let umfrageWerte = {};

        // 1. Versuche berechnete Werte aus LoadedArchetypProfile zu holen (für ich ODER partner)
        const loadedProfile = (typeof window !== 'undefined' && window.LoadedArchetypProfile)
            ? window.LoadedArchetypProfile[currentPerson]
            : null;

        // Prüfe ob flatNeeds existiert UND nicht leer ist (leeres {} ist truthy!)
        const loadedFlatNeeds = loadedProfile?.profileReview?.flatNeeds;
        const hasFlatNeeds = loadedFlatNeeds && Object.keys(loadedFlatNeeds).length > 0;

        if (hasFlatNeeds) {
            umfrageWerte = loadedFlatNeeds;
            console.log('[AttributeSummaryCard] Verwende berechnete Werte aus TiageState.flatNeeds für', currentPerson, 'Anzahl:', Object.keys(umfrageWerte).length);
        } else {
            // 2. Fallback: Statische Archetyp-Werte aus BaseArchetypProfile
            umfrageWerte = profil.umfrageWerte || {};
            console.log('[AttributeSummaryCard] Verwende statische umfrageWerte aus BaseArchetypProfile für', currentPerson, 'Anzahl:', Object.keys(umfrageWerte).length);

            // Warnung wenn TiageState.flatNeeds leer ist (sollte nicht passieren)
            if (loadedFlatNeeds && Object.keys(loadedFlatNeeds).length === 0) {
                console.warn('[AttributeSummaryCard] TiageState.flatNeeds.' + currentPerson + ' ist leer! Verwende Fallback aus BaseArchetypProfile.');
            }
        }

        // DEBUG: Prüfe ob umfrageWerte korrekt geladen wurden
        if (Object.keys(umfrageWerte).length === 0) {
            console.error('[AttributeSummaryCard] FEHLER: umfrageWerte ist leer!', {
                loadedProfile: !!loadedProfile,
                flatNeeds: loadedProfile?.profileReview?.flatNeeds,
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
                // Wenn gesperrt: verwende gespeicherten Wert, sonst umfrageWert
                const value = isLocked ? savedLockedNeeds[needId] : umfrageWerte[needId];

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
                    // Bei gleicher Anzahl nach Wert absteigend
                    return (b.aggregatedValue || 0) - (a.aggregatedValue || 0);
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

                // CSS-Klassen
                const changedClass = hasChangedNuancen ? ' has-changed-nuancen' : '';
                const lockedClass = isEffectivelyLocked ? ' hauptfrage-locked' : '';
                const lockedByNuancenClass = allNuancenLocked && !isHauptfrageLocked ? ' locked-by-nuancen' : '';
                const partialLockedClass = someNuancenLocked ? ' has-locked-nuancen' : '';

                // Indikator: Sternchen für geänderte Nuancen
                const changedIndicator = hasChangedNuancen
                    ? `<span class="hauptfrage-changed-indicator" title="${changedNuancenCount} Nuance(n) geändert">*</span>`
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

                // Hauptfrage-Item mit Expand-Toggle und Slider
                html += `
                <div class="hauptfrage-item${isExpanded ? ' expanded' : ''}${changedClass}${lockedClass}${lockedByNuancenClass}${partialLockedClass}" data-hauptfrage-id="${hf.id}">
                    <div class="hauptfrage-header">
                        <span class="hauptfrage-expand-icon" onclick="AttributeSummaryCard.toggleHauptfrageExpand('${hf.id}')">${isExpanded ? '▼' : '▶'}</span>
                        <span class="hauptfrage-label" style="border-left: 3px solid ${dimColor}; padding-left: 8px;"
                              onclick="AttributeSummaryCard.toggleHauptfrageExpand('${hf.id}')">
                            ${hf.id} ${hf.label}${changedIndicator}
                        </span>
                        <span class="hauptfrage-nuancen-count" onclick="AttributeSummaryCard.toggleHauptfrageExpand('${hf.id}')">${hasNuancen ? `(${nuancenCount} Nuancen)${nuancenStatusInfo}` : '(direkt)'}</span>
                        <div class="hauptfrage-controls">
                            <span class="hauptfrage-lock-icon ${isEffectivelyLocked ? 'locked' : ''}${allNuancenLocked && !isHauptfrageLocked ? ' auto-locked' : ''}${someNuancenLocked ? ' partial-locked' : ''}"
                                  onclick="event.stopPropagation(); AttributeSummaryCard.toggleHauptfrageLock('${hf.id}', this)"
                                  title="${lockTitle}"></span>
                        </div>
                    </div>
                    <div class="hauptfrage-slider-row">
                        <input type="range" class="hauptfrage-slider"
                               min="0" max="100" value="${sliderValue}"
                               oninput="AttributeSummaryCard.onHauptfrageSliderInput('${hf.id}', this.value, this)"
                               onclick="event.stopPropagation()"
                               ${sliderStyle}
                               ${sliderDisabled ? 'disabled' : ''}>
                        <input type="text" class="hauptfrage-input" value="${sliderValue}" maxlength="3"
                               onchange="AttributeSummaryCard.updateHauptfrageValue('${hf.id}', this.value)"
                               onclick="event.stopPropagation()"
                               ${sliderDisabled ? 'readonly' : ''}>
                    </div>`;

                // Nuancen-Liste (wenn aufgeklappt und Nuancen vorhanden)
                if (isExpanded && hf.nuancen && hf.nuancen.length > 0) {
                    html += `<div class="nuancen-list${isHauptfrageLocked ? ' nuancen-locked-by-parent' : ''}">`;
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
        return `
        <div class="flat-need-item${isLocked ? ' need-locked' : ''}${colorClass}${selectedClass}${filterHiddenClass}${changedClass}" data-need="${needId}" ${itemStyle}
             onclick="AttributeSummaryCard.toggleNeedSelection('${needId}')">
            <div class="flat-need-header">
                <span class="flat-need-label clickable"
                      onclick="event.stopPropagation(); openNeedWithResonance('${needId}')"
                      title="Klicken für Resonanz-Details">${label}${changedIndicator}</span>
                <div class="flat-need-controls">
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
     */
    function onFlatSliderInput(needId, value, sliderElement) {
        const needObj = findNeedById(needId);
        if (needObj?.locked) return;

        const numValue = parseInt(value, 10);
        if (isNaN(numValue)) return;

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
     */
    function toggleFlatNeedLock(needId, lockElement) {
        console.log('[DEBUG toggleFlatNeedLock] Called with:', needId);
        const needObj = findNeedById(needId);
        const newLockState = needObj ? !needObj.locked : true;

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
        resetSelectedNeedsValues,
        resetFilters,
        updateSelectedNeedsValue,
        lockSelectedNeeds,
        // NEU: Person-spezifische Lock-Synchronisierung
        syncLocksFromState: syncLocksFromTiageState
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
}
