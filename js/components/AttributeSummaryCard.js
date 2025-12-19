/**
 * ATTRIBUTE SUMMARY CARD COMPONENT
 *
 * Zeigt Attribute als Zusammenfassung der zugehörigen Bedürfnisse.
 * Klick zum Erweitern und Bearbeiten der einzelnen Bedürfnisse.
 * Mit Eingabewert und Schloss wie bei Gewichtungen.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const AttributeSummaryCard = (function() {
    'use strict';

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

            // Update checkbox
            const checkbox = needItem.querySelector('.need-checkbox');
            if (checkbox) {
                checkbox.checked = isSelected;
            }
        }

        // Update control panel visibility
        updateMultiSelectControlPanel();

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

                // Checkbox auch unchecken
                const checkbox = needItem.querySelector('.need-checkbox');
                if (checkbox) {
                    checkbox.checked = false;
                }
            }
        });
        selectedNeeds.clear();
        originalNeedValues.clear();
        updateMultiSelectControlPanel();
    }

    /**
     * MULTI-SELECT: Wählt alle gefilterten (sichtbaren) Bedürfnisse aus oder ab
     * Toggle-Logik: Wenn alle gefilterten bereits ausgewählt → alle abwählen, sonst alle auswählen
     */
    function selectAllFilteredNeeds() {
        // Ermittle alle sichtbaren (nicht gefilterten) Bedürfnisse
        const visibleNeeds = flatNeeds.filter(need => {
            // Prüfe DimensionKategorieFilter
            if (typeof DimensionKategorieFilter !== 'undefined' && !DimensionKategorieFilter.shouldShowNeed(need.id)) {
                return false;
            }
            // Prüfe auch Suchfilter (dimension-filter-hidden und filter-hidden Klassen)
            const needItem = document.querySelector(`.flat-need-item[data-need="${need.id}"]`);
            if (needItem && (needItem.classList.contains('dimension-filter-hidden') || needItem.classList.contains('filter-hidden'))) {
                return false;
            }
            return true;
        });

        if (visibleNeeds.length === 0) {
            return;
        }

        // Prüfe, ob alle sichtbaren bereits ausgewählt sind
        const allSelected = visibleNeeds.every(need => selectedNeeds.has(need.id));

        if (allSelected) {
            // Alle abwählen (nur die sichtbaren)
            visibleNeeds.forEach(need => {
                if (selectedNeeds.has(need.id)) {
                    selectedNeeds.delete(need.id);
                    originalNeedValues.delete(need.id);

                    const needItem = document.querySelector(`.flat-need-item[data-need="${need.id}"]`);
                    if (needItem) {
                        needItem.classList.remove('need-selected');
                        const checkbox = needItem.querySelector('.need-checkbox');
                        if (checkbox) {
                            checkbox.checked = false;
                        }
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
                        const checkbox = needItem.querySelector('.need-checkbox');
                        if (checkbox) {
                            checkbox.checked = true;
                        }
                    }
                }
            });
        }

        // Update control panel
        updateMultiSelectControlPanel();

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

        let resetCount = 0;
        selectedNeeds.forEach(needId => {
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
                        slider.style.background = `linear-gradient(to right, ${dimColor} 0%, ${dimColor} ${numValue}%, rgba(255,255,255,0.15) ${numValue}%, rgba(255,255,255,0.15) 100%)`;
                    }
                }
                if (input) input.value = numValue;
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
                if (slider) slider.disabled = lockState;
                if (input) input.readOnly = lockState;
            }

            // Event
            document.dispatchEvent(new CustomEvent('flatNeedLockChange', {
                bubbles: true,
                detail: { needId, locked: lockState }
            }));
        });
    }

    /**
     * Aktueller Archetyp für flache Darstellung
     */
    let currentFlatArchetyp = null;

    /**
     * Aktuelles Archetyp-Label für flache Darstellung
     */
    let currentFlatArchetypLabel = null;

    /**
     * Aktuelle Sortierung für flache Darstellung
     * 'value' (Standard), 'name', 'id'
     */
    let currentFlatSortMode = 'value';

    /**
     * DEPRECATED: Perspektiven-Filter wurden durch DimensionKategorieFilter ersetzt
     * Kept for backward compatibility
     */
    let activePerspektiveFilters = new Set();

    /**
     * ENTFERNT: Hauptfragen-Filter (Benutzer-Feedback: zu komplex, nicht nötig)
     * Zeige IMMER alle Bedürfnisse (219)
     */
    let showOnlyHauptfragen = false;

    /**
     * Filter: Zeigt nur geänderte Bedürfnisse an
     * (Bedürfnisse deren Wert vom Archetyp-Standard abweicht)
     */
    let showOnlyChangedNeeds = false;

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
        intimitaet_beziehung: { label: 'Intimität & Romantik', icon: '💋' },
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

        // Vergleiche gegen die berechneten Anfangswerte (Basis + Modifiers)
        // aus LoadedArchetypProfile - diese sind die SSOT für die initialen Werte
        const loadedProfile = (typeof window !== 'undefined' && window.LoadedArchetypProfile)
            ? window.LoadedArchetypProfile[currentPerson]
            : null;

        if (!loadedProfile?.profileReview?.flatNeeds) {
            return false;
        }

        const initialValue = loadedProfile.profileReview.flatNeeds[needId];
        if (initialValue === undefined) {
            return false;
        }

        return currentValue !== initialValue;
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
    function toggleHauptfragenFilter() {
        console.warn('[AttributeSummaryCard] toggleHauptfragenFilter ist deprecated. Hauptfragen-Filter wurde entfernt.');
        // No-op - showOnlyHauptfragen ist immer false
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
     * Sortiert die Bedürfnis-Liste nach dem aktuellen Modus
     * @param {Array} needs - Array von {id, value, label}
     * @param {string} mode - 'value', 'name', 'id', 'status', 'kategorie', 'changed'
     * @returns {Array} Sortiertes Array
     */
    function sortNeedsList(needs, mode) {
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

        // Prüfe ob neuer Archetyp geladen wird
        const isNewArchetyp = currentFlatArchetyp !== archetyp;

        // Speichere aktuellen Archetyp und Label
        currentFlatArchetyp = archetyp;
        currentFlatArchetypLabel = archetypLabel;

        // Bei neuem Archetyp: Alle Einträge zurücksetzen
        if (isNewArchetyp) {
            // Alle Bedürfnisse zurücksetzen damit neue Profil-Werte geladen werden
            flatNeeds = [];
            console.log('[AttributeSummaryCard] Neuer Archetyp geladen - Bedürfnisse zurückgesetzt');
        }

        // Hole ALLE Bedürfnisse - BEVORZUGE berechnete Werte aus LoadedArchetypProfile (Basis + Modifikatoren)
        let umfrageWerte = {};

        // Ermittle aktuelle Person aus Kontext
        let currentPerson = 'ich';
        if (typeof window !== 'undefined' && window.currentProfileReviewContext?.person) {
            currentPerson = window.currentProfileReviewContext.person;
        }

        // 1. Versuche berechnete Werte aus LoadedArchetypProfile zu holen (für ich ODER partner)
        const loadedProfile = (typeof window !== 'undefined' && window.LoadedArchetypProfile)
            ? window.LoadedArchetypProfile[currentPerson]
            : null;

        if (loadedProfile?.profileReview?.flatNeeds) {
            umfrageWerte = loadedProfile.profileReview.flatNeeds;
            console.log('[AttributeSummaryCard] Verwende berechnete Werte aus LoadedArchetypProfile für', currentPerson);
        } else {
            // 2. Fallback: Statische Archetyp-Werte
            umfrageWerte = profil.umfrageWerte || {};
            console.log('[AttributeSummaryCard] Fallback auf statische umfrageWerte für', currentPerson);
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

        Object.keys(BeduerfnisIds.beduerfnisse).forEach(needId => {
            const existing = findNeedById(needId);
            if (!existing) {
                const numKey = parseInt(needId.replace('#B', ''), 10) || 0;
                const needData = BeduerfnisIds.beduerfnisse[needId];
                const stringKey = needData?.key || '';
                // Wert aus SSOT (umfrageWerte = LoadedArchetypProfile.flatNeeds)
                const value = umfrageWerte[needId];
                flatNeeds.push({
                    id: needId,
                    key: numKey,
                    stringKey: stringKey,
                    label: needData?.label || getNeedLabel(needId).replace(/^#B\d+\s*/, ''),
                    value: value, // undefined wenn nicht in SSOT vorhanden
                    locked: false
                });
            }
        });
        console.log('[AttributeSummaryCard] Alle', flatNeeds.length, 'Bedürfnisse aus BeduerfnisIds geladen');

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

        // FIX: Zähle gefilterte Bedürfnisse (für Anzeige), aber rendere ALLE
        // Dies ermöglicht, dass die Suche funktioniert, auch wenn Filter aktiv sind
        let filteredCount = sortedNeeds.length;
        if (typeof DimensionKategorieFilter !== 'undefined') {
            filteredCount = sortedNeeds.filter(need => DimensionKategorieFilter.shouldShowNeed(need.id)).length;
            console.log('[AttributeSummaryCard] Filter gezählt:', {
                gesamt: sortedNeeds.length,
                sichtbar: filteredCount,
                filterAktiv: filteredCount < sortedNeeds.length
            });
        }

        // Subtitle mit Filter-Info
        const filterActive = filteredCount < totalNeedsCount;
        const subtitleText = filterActive
            ? `Dein ${archetypLabel}-Profil (${filteredCount} von ${totalNeedsCount} Bedürfnissen)`
            : `Dein ${archetypLabel}-Profil (${totalNeedsCount} Bedürfnisse)`;

        // Rendere HTML - flache Liste ohne Kategorien
        let html = `<div class="flat-needs-container flat-needs-no-categories" data-archetyp="${archetyp}">`;
        html += `<div class="flat-needs-header">
            <div class="flat-needs-header-top">
                <div class="flat-needs-header-left">
                    <span class="flat-needs-title">Alle Bedürfnisse</span>
                    <span class="flat-needs-subtitle">${subtitleText}</span>
                </div>
                <button class="flat-needs-reset-btn" onclick="AttributeSummaryCard.resetFlatNeeds(); AttributeSummaryCard.reRenderFlatNeeds();" title="Auf Profil-Standard zurücksetzen">
                    🔄 Standard
                </button>
            </div>
        </div>

        <!-- STICKY CONTROLS CONTAINER -->
        <div class="flat-needs-sticky-controls">
            <!-- MULTI-SELECT CONTROL PANEL (immer sichtbar) -->
            <div id="multi-select-control-panel" class="multi-select-control-panel" style="display: flex;">
                <div class="multi-select-info">
                    <button class="multi-select-toggle-all-btn" onclick="AttributeSummaryCard.selectAllFilteredNeeds();" title="Alle gefilterten auswählen/abwählen">
                        ☑ Alle/Keine
                    </button>
                    <button class="multi-select-toggle-changed-btn${showOnlyChangedNeeds ? ' active' : ''}" onclick="AttributeSummaryCard.toggleShowOnlyChanged();" title="Nur geänderte Bedürfnisse anzeigen">
                        ✎ Geänderte
                    </button>
                    <span class="multi-select-count">0 ausgewählt</span>
                    <div class="multi-select-actions">
                        <button class="multi-select-lock-btn" onclick="AttributeSummaryCard.lockSelectedNeeds(true);" title="Ausgewählte sperren">
                            🔒 Sperren
                        </button>
                        <button class="multi-select-unlock-btn" onclick="AttributeSummaryCard.lockSelectedNeeds(false);" title="Ausgewählte entsperren">
                            🔓 Entsperren
                        </button>
                        <button class="multi-select-reset-btn" onclick="AttributeSummaryCard.resetSelectedNeedsValues();" title="Werte zurücksetzen">
                            ↶ Zurücksetzen
                        </button>
                        <button class="multi-select-ok-btn" onclick="AttributeSummaryCard.clearNeedSelection();" title="Bestätigen und Auswahl aufheben">
                            ✓ OK
                        </button>
                    </div>
                </div>
                <div class="multi-select-slider-container">
                    <span class="multi-select-slider-label">Alle auf:</span>
                    <input type="range" class="multi-select-slider" min="0" max="100" value="50"
                           oninput="AttributeSummaryCard.updateSelectedNeedsValue(this.value)">
                    <input type="text" class="multi-select-input" value="50" maxlength="3"
                           onchange="AttributeSummaryCard.updateSelectedNeedsValue(this.value)">
                </div>
            </div>

            <!-- RESONANZFAKTOREN-ANZEIGE (STICKY) -->
            <!-- AUSGEBLENDET: Doppelte Anzeige der Resonanzfaktoren (werden bereits oben in "Dein RA-Profil" angezeigt) -->
            <!-- <div id="flat-needs-resonanz-display"></div> -->

            <!-- DIMENSION-KATEGORIE-FILTER -->
            <div id="flat-needs-dimension-filter"></div>

            <div class="flat-needs-sort-bar">
                <span class="flat-needs-sort-label">Sortieren:</span>
                <button class="flat-needs-sort-btn${currentFlatSortMode === 'value' ? ' active' : ''}" onclick="AttributeSummaryCard.setSortMode('value')">Wert</button>
                <button class="flat-needs-sort-btn${currentFlatSortMode === 'name' ? ' active' : ''}" onclick="AttributeSummaryCard.setSortMode('name')">Name</button>
                <button class="flat-needs-sort-btn${currentFlatSortMode === 'id' ? ' active' : ''}" onclick="AttributeSummaryCard.setSortMode('id')">#B Nr.</button>
                <button class="flat-needs-sort-btn${currentFlatSortMode === 'status' ? ' active' : ''}" onclick="AttributeSummaryCard.setSortMode('status')">Status</button>
                <button class="flat-needs-sort-btn${currentFlatSortMode === 'changed' ? ' active' : ''}" onclick="AttributeSummaryCard.setSortMode('changed')">Geändert</button>
            </div>
        </div>`; // Ende sticky-controls

        // Direkte flache Liste ohne Kategorien-Wrapper
        html += `<div class="flat-needs-list-wrapper">
            <div class="flat-needs-list kategorie-mode">`;
        // FIX: Rendere ALLE Bedürfnisse, auch gefilterte (für Suche)
        // Der DimensionKategorieFilter wird als CSS-Klasse angewendet
        sortedNeeds.forEach(need => {
            const needObj = findNeedById(need.id);
            const isLocked = needObj?.locked || false;
            // Zeige immer Dimension-Farbe
            const dimColor = getDimensionColor(need.id);

            // Prüfe ob Bedürfnis durch DimensionKategorieFilter versteckt werden soll
            const hiddenByDimensionFilter = (typeof DimensionKategorieFilter !== 'undefined')
                && !DimensionKategorieFilter.shouldShowNeed(need.id);

            // Prüfe ob Bedürfnis durch "Nur Geänderte" Filter versteckt werden soll
            const hiddenByChangedFilter = showOnlyChangedNeeds && !isValueChanged(need.id, need.value);

            const shouldHide = hiddenByDimensionFilter || hiddenByChangedFilter;

            html += renderFlatNeedItem(need.id, need.label, need.value, isLocked, dimColor, shouldHide);
        });
        html += `</div>`; // Close flat-needs-list

        html += '</div>'; // Close flat-needs-container
        return html;
    }

    /**
     * Setzt den Sortiermodus und rendert die Liste neu
     * @param {string} mode - 'value', 'name', 'id', 'status'
     */
    function setSortMode(mode) {
        currentFlatSortMode = mode;
        reRenderFlatNeeds();
    }

    /**
     * Toggled den "Nur Geänderte" Filter und rendert die Liste neu
     */
    function toggleShowOnlyChanged() {
        showOnlyChangedNeeds = !showOnlyChangedNeeds;
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
        }
    }

    /**
     * Initialisiert den DimensionKategorieFilter im Container
     */
    function initDimensionFilter() {
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
            ? `style="background: linear-gradient(to right, ${dimensionColor} 0%, ${dimensionColor} ${value}%, rgba(255,255,255,0.15) ${value}%, rgba(255,255,255,0.15) 100%);"`
            : '';
        // Sternchen (*) wenn Wert vom Standard abweicht
        const changedIndicator = isValueChanged(needId, value) ? ' <span class="value-changed-indicator" title="Wert wurde geändert">*</span>' : '';
        return `
        <div class="flat-need-item${isLocked ? ' need-locked' : ''}${colorClass}${selectedClass}${filterHiddenClass}" data-need="${needId}" ${itemStyle}
             onclick="AttributeSummaryCard.toggleNeedSelection('${needId}')">
            <div class="flat-need-header">
                <div class="flat-need-select-indicator">
                    <input type="checkbox" class="need-checkbox" ${isSelected ? 'checked' : ''}
                           onclick="event.stopPropagation(); AttributeSummaryCard.toggleNeedSelection('${needId}')">
                </div>
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

        // Sync Input-Feld
        const needItem = sliderElement.closest('.flat-need-item');
        if (needItem) {
            const input = needItem.querySelector('.flat-need-input');
            if (input) input.value = numValue;

            // Slider-Track-Hintergrund aktualisieren mit Dimension-Farbe
            const dimColor = getDimensionColor(needId);
            if (dimColor) {
                sliderElement.style.background = `linear-gradient(to right, ${dimColor} 0%, ${dimColor} ${numValue}%, rgba(255,255,255,0.15) ${numValue}%, rgba(255,255,255,0.15) 100%)`;
            }
        }

        // Event für Änderungstracking
        document.dispatchEvent(new CustomEvent('flatNeedChange', {
            bubbles: true,
            detail: { needId, value: numValue }
        }));
    }

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

        // Sync Slider
        const needItem = document.querySelector(`.flat-need-item[data-need="${needId}"]`);
        if (needItem) {
            const slider = needItem.querySelector('.need-slider');
            if (slider) slider.value = numValue;
        }

        // Event
        document.dispatchEvent(new CustomEvent('flatNeedChange', {
            bubbles: true,
            detail: { needId, value: numValue }
        }));
    }

    /**
     * Toggle Lock für ein Bedürfnis in der flachen Darstellung
     */
    function toggleFlatNeedLock(needId, lockElement) {
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

            if (slider) slider.disabled = isLocked;
            if (input) input.readOnly = isLocked;
        }

        // Event
        document.dispatchEvent(new CustomEvent('flatNeedLockChange', {
            bubbles: true,
            detail: { needId, locked: isLocked }
        }));
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
                    slider.style.background = `linear-gradient(to right, ${dimColor} 0%, ${dimColor} ${newValue}%, rgba(255,255,255,0.15) ${newValue}%, rgba(255,255,255,0.15) 100%)`;
                }
            }
        });

        // Event für Resonanz-Neuberechnung
        document.dispatchEvent(new CustomEvent('flatNeedChange', { bubbles: true }));
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
     * @param {string} needId - Bedürfnis-ID
     * @param {HTMLElement} lockElement - Das Lock-Icon Element
     */
    function toggleNeedLock(attrId, needId, lockElement) {
        // Initialisiere falls nötig
        if (!lockedNeeds[attrId]) {
            lockedNeeds[attrId] = {};
        }

        // Toggle Lock-Status
        lockedNeeds[attrId][needId] = !lockedNeeds[attrId][needId];
        const isLocked = lockedNeeds[attrId][needId];

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
        toggleShowOnlyChanged,
        // NEU: DimensionKategorieFilter Integration
        initDimensionFilter,
        // DEPRECATED: Alte Filter-Funktionen (für Rückwärtskompatibilität)
        togglePerspektiveFilter,
        clearPerspektiveFilters,
        toggleHauptfragenFilter,
        GFK_KATEGORIEN,
        // NEU: Multi-Select Feature für Bedürfnisse
        toggleNeedSelection,
        clearNeedSelection,
        selectAllFilteredNeeds,
        resetSelectedNeedsValues,
        updateSelectedNeedsValue,
        lockSelectedNeeds
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AttributeSummaryCard;
}
