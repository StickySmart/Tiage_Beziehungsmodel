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
     * Greift dynamisch auf GfkBeduerfnisse.definitionen zu.
     * Dies stellt sicher, dass Attribute Modal und Ti-Age Synthese
     * identische Bedürfnis-Namen/IDs anzeigen.
     *
     * Format: "#B34 Selbstbestimmung" (mit #ID für Referenzierbarkeit)
     *
     * @param {string} needId - Die Bedürfnis-ID (String-Key)
     * @returns {string} Das Label für das Bedürfnis mit #B-ID
     */
    function getNeedLabel(needId) {
        // Hole die #B-ID aus BeduerfnisIds
        let hashId = '';
        if (typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.toId) {
            const id = BeduerfnisIds.toId(needId);
            if (id && id.startsWith('#B')) {
                hashId = id + ' ';
            }
        }

        // Primär: GfkBeduerfnisse.definitionen (Single Source of Truth)
        if (typeof GfkBeduerfnisse !== 'undefined' && GfkBeduerfnisse.definitionen) {
            const def = GfkBeduerfnisse.definitionen[needId];
            if (def && def.label) {
                return hashId + def.label;
            }
        }
        // Fallback: Formatiere ID als lesbaren String
        const fallbackLabel = needId
            .replace(/_/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase());
        return hashId + fallbackLabel;
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
     * Speicher für flache Bedürfniswerte (für renderAllNeedsFlat)
     * Format: { needId: value }
     */
    const flatNeedsValues = {};

    /**
     * Speicher für Lock-Status bei flacher Darstellung
     * Format: { needId: true/false }
     */
    const flatLockedNeeds = {};

    /**
     * Aktueller Archetyp für flache Darstellung
     */
    let currentFlatArchetyp = null;

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
     * Rendert ALLE Bedürfnisse aus dem Archetyp-Profil als flache Liste
     * Gruppiert nach GFK-Kategorien, wie in der Ti-Age Synthese
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
        if (!profil || !profil.kernbeduerfnisse) {
            console.warn('renderAllNeedsFlat: Profil nicht gefunden:', archetyp);
            return '<p style="color: var(--text-muted);">Profil nicht gefunden</p>';
        }

        // Speichere aktuellen Archetyp
        currentFlatArchetyp = archetyp;

        // Initialisiere Werte aus Profil
        const kernbeduerfnisse = profil.kernbeduerfnisse;
        Object.keys(kernbeduerfnisse).forEach(needId => {
            if (flatNeedsValues[needId] === undefined) {
                flatNeedsValues[needId] = kernbeduerfnisse[needId];
            }
        });

        // Gruppiere Bedürfnisse nach Kategorien
        const grouped = {};
        Object.keys(kernbeduerfnisse).forEach(needId => {
            const def = GfkBeduerfnisse.definitionen[needId];
            const kategorie = def?.kategorie || 'sonstige';

            if (!grouped[kategorie]) {
                grouped[kategorie] = [];
            }
            grouped[kategorie].push({
                id: needId,
                value: flatNeedsValues[needId] ?? kernbeduerfnisse[needId],
                label: getNeedLabel(needId)
            });
        });

        // Sortiere Bedürfnisse in jeder Kategorie nach Wert (absteigend)
        Object.keys(grouped).forEach(kategorie => {
            grouped[kategorie].sort((a, b) => b.value - a.value);
        });

        // Rendere HTML
        let html = `<div class="flat-needs-container" data-archetyp="${archetyp}">`;
        html += `<div class="flat-needs-header">
            <span class="flat-needs-title">Alle Bedürfnisse</span>
            <span class="flat-needs-subtitle">Dein ${archetypLabel}-Profil</span>
        </div>`;

        // Sortiere Kategorien nach GFK_KATEGORIEN Reihenfolge
        const kategorieOrder = Object.keys(GFK_KATEGORIEN);
        const sortedKategorien = Object.keys(grouped).sort((a, b) => {
            const idxA = kategorieOrder.indexOf(a);
            const idxB = kategorieOrder.indexOf(b);
            return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
        });

        sortedKategorien.forEach(kategorie => {
            const needs = grouped[kategorie];
            const katInfo = GFK_KATEGORIEN[kategorie] || { label: kategorie, icon: '📌' };

            html += `
            <div class="flat-needs-category" data-category="${kategorie}">
                <div class="flat-needs-category-header" onclick="this.parentElement.classList.toggle('collapsed')">
                    <span class="flat-needs-category-icon">${katInfo.icon}</span>
                    <span class="flat-needs-category-label">${katInfo.label}</span>
                    <span class="flat-needs-category-count">(${needs.length})</span>
                    <span class="flat-needs-category-expand">▼</span>
                </div>
                <div class="flat-needs-category-content">`;

            needs.forEach(need => {
                const isLocked = flatLockedNeeds[need.id] || false;
                html += renderFlatNeedItem(need.id, need.label, need.value, isLocked);
            });

            html += `</div></div>`;
        });

        html += '</div>';
        return html;
    }

    /**
     * Rendert ein einzelnes Bedürfnis-Item für die flache Darstellung
     */
    function renderFlatNeedItem(needId, label, value, isLocked) {
        return `
        <div class="flat-need-item${isLocked ? ' need-locked' : ''}" data-need="${needId}">
            <div class="flat-need-header">
                <span class="flat-need-label clickable"
                      onclick="event.stopPropagation(); openNeedDefinitionModal('${needId}')"
                      title="Klicken für Info">${label}</span>
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
        if (flatLockedNeeds[needId]) return;

        const numValue = parseInt(value, 10);
        if (isNaN(numValue)) return;

        flatNeedsValues[needId] = numValue;

        // Sync Input-Feld
        const needItem = sliderElement.closest('.flat-need-item');
        if (needItem) {
            const input = needItem.querySelector('.flat-need-input');
            if (input) input.value = numValue;
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
        if (flatLockedNeeds[needId]) return;

        const numValue = parseInt(value, 10);
        if (isNaN(numValue) || numValue < 0 || numValue > 100) return;

        flatNeedsValues[needId] = numValue;

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
        flatLockedNeeds[needId] = !flatLockedNeeds[needId];
        const isLocked = flatLockedNeeds[needId];

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
     * Holt alle flachen Bedürfniswerte
     */
    function getFlatNeedsValues() {
        return { ...flatNeedsValues };
    }

    /**
     * Holt alle gesperrten flachen Bedürfnisse
     */
    function getFlatLockedNeeds() {
        return { ...flatLockedNeeds };
    }

    /**
     * Setzt alle flachen Bedürfniswerte zurück auf Profil-Werte
     */
    function resetFlatNeeds() {
        if (!currentFlatArchetyp || typeof GfkBeduerfnisse === 'undefined') return;

        const profil = GfkBeduerfnisse.archetypProfile[currentFlatArchetyp];
        if (!profil) return;

        // Nur nicht-gesperrte Werte zurücksetzen
        Object.keys(profil.kernbeduerfnisse).forEach(needId => {
            if (!flatLockedNeeds[needId]) {
                flatNeedsValues[needId] = profil.kernbeduerfnisse[needId];

                // Update UI
                const needItem = document.querySelector(`.flat-need-item[data-need="${needId}"]`);
                if (needItem) {
                    const slider = needItem.querySelector('.need-slider');
                    const input = needItem.querySelector('.flat-need-input');
                    if (slider) slider.value = flatNeedsValues[needId];
                    if (input) input.value = flatNeedsValues[needId];
                }
            }
        });
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
                              onclick="event.stopPropagation(); openNeedDefinitionModal('${need}')"
                              title="Klicken für Info zu diesem Bedürfnis">${needLabel}</span>
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
                          onclick="event.stopPropagation(); openNeedDefinitionModal('${need}')"
                          title="Klicken für Info zu diesem Bedürfnis">${needLabel}</span>
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
        getFlatNeedsValues,
        getFlatLockedNeeds,
        resetFlatNeeds,
        GFK_KATEGORIEN
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AttributeSummaryCard;
}
