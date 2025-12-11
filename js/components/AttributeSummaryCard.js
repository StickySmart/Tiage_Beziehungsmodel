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
     * Speicher für flache Bedürfnisse mit integriertem Lock-Status
     * NEUE STRUKTUR (v1.8.89): { needId: { value: number, locked: boolean } }
     *
     * Diese integrierte Struktur ersetzt die vorherigen getrennten Objekte:
     * - flatNeedsValues (alt): { needId: value }
     * - flatLockedNeeds (alt): { needId: boolean }
     *
     * Vorteile:
     * - Wert und Lock-Status gehören zusammen
     * - Erweiterbar für weitere Metadaten (z.B. timestamp, comment)
     * - Keine Sync-Probleme zwischen zwei getrennten Objekten
     */
    const flatNeeds = {};

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
     * @param {string} needId - z.B. '#B21'
     * @returns {number} Kategorie-Nummer (1-18) oder 99 wenn nicht gefunden
     */
    function getCategoryNumber(needId) {
        if (typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.beduerfnisse) {
            const need = BeduerfnisIds.beduerfnisse[needId];
            if (need && need.kategorie) {
                const match = need.kategorie.match(/#K(\d+)/);
                return match ? parseInt(match[1], 10) : 99;
            }
        }
        return 99;
    }

    /**
     * Holt die Dimension-Farbe für ein Bedürfnis basierend auf seiner Kategorie
     * @param {string} needId - z.B. '#B21'
     * @returns {string} CSS-Farbwert oder null
     */
    function getDimensionColor(needId) {
        // Versuche TiageTaxonomie zu finden (global oder window)
        const taxonomie = (typeof TiageTaxonomie !== 'undefined') ? TiageTaxonomie :
                          (typeof window !== 'undefined' && window.TiageTaxonomie) ? window.TiageTaxonomie : null;

        // Versuche BeduerfnisIds zu finden
        const beduerfnisIds = (typeof BeduerfnisIds !== 'undefined') ? BeduerfnisIds :
                              (typeof window !== 'undefined' && window.BeduerfnisIds) ? window.BeduerfnisIds : null;

        if (!taxonomie) {
            console.warn('[getDimensionColor] TiageTaxonomie nicht verfügbar für', needId);
            return null;
        }
        if (!taxonomie.kategorien) {
            console.warn('[getDimensionColor] TiageTaxonomie.kategorien nicht verfügbar für', needId);
            return null;
        }
        if (!beduerfnisIds || !beduerfnisIds.beduerfnisse) {
            console.warn('[getDimensionColor] BeduerfnisIds nicht verfügbar für', needId);
            return null;
        }

        const need = beduerfnisIds.beduerfnisse[needId];
        if (!need) {
            console.warn('[getDimensionColor] Bedürfnis nicht gefunden:', needId);
            return null;
        }
        if (!need.kategorie) {
            console.warn('[getDimensionColor] Keine Kategorie für:', needId);
            return null;
        }

        const kategorie = taxonomie.kategorien[need.kategorie];
        if (!kategorie) {
            console.warn('[getDimensionColor] Kategorie nicht gefunden:', need.kategorie, 'für', needId);
            return null;
        }
        if (!kategorie.dimension) {
            console.warn('[getDimensionColor] Keine Dimension in Kategorie:', need.kategorie);
            return null;
        }

        const dimension = taxonomie.dimensionen?.[kategorie.dimension];
        if (!dimension || !dimension.color) {
            console.warn('[getDimensionColor] Dimension nicht gefunden:', kategorie.dimension);
            return null;
        }

        return dimension.color;
    }

    /**
     * Sortiert die Bedürfnis-Liste nach dem aktuellen Modus
     * @param {Array} needs - Array von {id, value, label}
     * @param {string} mode - 'value', 'name', 'id', 'status', 'kategorie'
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
                    const aLocked = flatNeeds[a.id]?.locked ? 1 : 0;
                    const bLocked = flatNeeds[b.id]?.locked ? 1 : 0;
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
        if (!profil || !profil.kernbeduerfnisse) {
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
            Object.keys(flatNeeds).forEach(needId => {
                delete flatNeeds[needId];
            });
            console.log('[AttributeSummaryCard] Neuer Archetyp geladen - Bedürfnisse zurückgesetzt');
        }

        // Hole ALLE Bedürfnisse aus dem Profil (alle 220)
        const kernbeduerfnisse = profil.kernbeduerfnisse || {};

        // Initialisiere Werte aus Profil (neue integrierte Struktur)
        Object.keys(kernbeduerfnisse).forEach(needId => {
            if (flatNeeds[needId] === undefined) {
                flatNeeds[needId] = {
                    value: kernbeduerfnisse[needId],
                    locked: false
                };
            }
        });

        // Sammle ALLE Bedürfnisse aus dem Profil
        const allNeeds = Object.keys(kernbeduerfnisse).map(needId => ({
            id: needId,
            value: flatNeeds[needId]?.value ?? kernbeduerfnisse[needId],
            label: getNeedLabel(needId)
        }));

        // Sortiere nach aktuellem Modus
        const sortedNeeds = sortNeedsList(allNeeds, currentFlatSortMode);

        // Rendere HTML - flache Liste ohne Kategorien
        let html = `<div class="flat-needs-container flat-needs-no-categories" data-archetyp="${archetyp}">`;
        html += `<div class="flat-needs-header">
            <div class="flat-needs-header-top">
                <div class="flat-needs-header-left">
                    <span class="flat-needs-title">Alle Bedürfnisse</span>
                    <span class="flat-needs-subtitle">Dein ${archetypLabel}-Profil (${allNeeds.length} Bedürfnisse)</span>
                </div>
                <button class="flat-needs-reset-btn" onclick="AttributeSummaryCard.resetFlatNeeds(); AttributeSummaryCard.reRenderFlatNeeds();" title="Auf Profil-Standard zurücksetzen">
                    🔄 Standard
                </button>
            </div>
            <div class="flat-needs-sort-bar">
                <span class="flat-needs-sort-label">Sortieren:</span>
                <button class="flat-needs-sort-btn${currentFlatSortMode === 'value' ? ' active' : ''}" onclick="AttributeSummaryCard.setSortMode('value')">Wert</button>
                <button class="flat-needs-sort-btn${currentFlatSortMode === 'name' ? ' active' : ''}" onclick="AttributeSummaryCard.setSortMode('name')">Name</button>
                <button class="flat-needs-sort-btn${currentFlatSortMode === 'id' ? ' active' : ''}" onclick="AttributeSummaryCard.setSortMode('id')">#B Nr.</button>
                <button class="flat-needs-sort-btn${currentFlatSortMode === 'status' ? ' active' : ''}" onclick="AttributeSummaryCard.setSortMode('status')">Status</button>
                <button class="flat-needs-sort-btn${currentFlatSortMode === 'kategorie' ? ' active' : ''}" onclick="AttributeSummaryCard.setSortMode('kategorie')">Kategorie</button>
            </div>
        </div>`;

        // Direkte flache Liste ohne Kategorien-Wrapper
        html += `<div class="flat-needs-list${currentFlatSortMode === 'kategorie' ? ' kategorie-mode' : ''}">`;
        console.log('[AttributeSummaryCard] Rendering with sortMode:', currentFlatSortMode);
        sortedNeeds.forEach(need => {
            const isLocked = flatNeeds[need.id]?.locked || false;
            // Bei Kategorie-Sortierung: Dimension-Farbe anzeigen
            const dimColor = currentFlatSortMode === 'kategorie' ? getDimensionColor(need.id) : null;
            if (currentFlatSortMode === 'kategorie') {
                console.log('[AttributeSummaryCard] getDimensionColor for', need.id, '=', dimColor);
            }
            html += renderFlatNeedItem(need.id, need.label, need.value, isLocked, dimColor);
        });
        html += `</div>`;

        html += '</div>';
        return html;
    }

    /**
     * Setzt den Sortiermodus und rendert die Liste neu
     * @param {string} mode - 'value', 'name', 'id'
     */
    function setSortMode(mode) {
        currentFlatSortMode = mode;
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
        }
    }

    /**
     * Rendert ein einzelnes Bedürfnis-Item für die flache Darstellung
     * @param {string} needId - Bedürfnis-ID
     * @param {string} label - Anzeige-Label
     * @param {number} value - Wert 0-100
     * @param {boolean} isLocked - Ob fixiert
     * @param {string|null} dimensionColor - Optional: Farbe für border-left (bei Kategorie-Sortierung)
     */
    function renderFlatNeedItem(needId, label, value, isLocked, dimensionColor) {
        // Bei Dimensionsfarbe: Border-left + CSS-Variable für Slider-Thumb
        const itemStyle = dimensionColor
            ? `style="border-left: 5px solid ${dimensionColor}; --dimension-color: ${dimensionColor};"`
            : '';
        const colorClass = dimensionColor ? ' has-dimension-color' : '';
        // Slider-Track-Hintergrund: gefüllt bis zum Wert mit Dimensionsfarbe
        const sliderStyle = dimensionColor
            ? `style="background: linear-gradient(to right, ${dimensionColor} 0%, ${dimensionColor} ${value}%, rgba(255,255,255,0.15) ${value}%, rgba(255,255,255,0.15) 100%);"`
            : '';
        return `
        <div class="flat-need-item${isLocked ? ' need-locked' : ''}${colorClass}" data-need="${needId}" ${itemStyle}>
            <div class="flat-need-header">
                <span class="flat-need-label clickable"
                      onclick="event.stopPropagation(); openNeedWithResonance('${needId}')"
                      title="Klicken für Resonanz-Details">${label}</span>
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
        if (flatNeeds[needId]?.locked) return;

        const numValue = parseInt(value, 10);
        if (isNaN(numValue)) return;

        // Initialisiere falls nötig
        if (!flatNeeds[needId]) {
            flatNeeds[needId] = { value: numValue, locked: false };
        } else {
            flatNeeds[needId].value = numValue;
        }

        // Sync Input-Feld
        const needItem = sliderElement.closest('.flat-need-item');
        if (needItem) {
            const input = needItem.querySelector('.flat-need-input');
            if (input) input.value = numValue;

            // Bei Kategorie-Modus: Slider-Track-Hintergrund aktualisieren
            if (currentFlatSortMode === 'kategorie') {
                const dimColor = getDimensionColor(needId);
                if (dimColor) {
                    sliderElement.style.background = `linear-gradient(to right, ${dimColor} 0%, ${dimColor} ${numValue}%, rgba(255,255,255,0.15) ${numValue}%, rgba(255,255,255,0.15) 100%)`;
                }
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
        if (flatNeeds[needId]?.locked) return;

        const numValue = parseInt(value, 10);
        if (isNaN(numValue) || numValue < 0 || numValue > 100) return;

        // Initialisiere falls nötig
        if (!flatNeeds[needId]) {
            flatNeeds[needId] = { value: numValue, locked: false };
        } else {
            flatNeeds[needId].value = numValue;
        }

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
        // Initialisiere falls nötig
        if (!flatNeeds[needId]) {
            flatNeeds[needId] = { value: 50, locked: true };
        } else {
            flatNeeds[needId].locked = !flatNeeds[needId].locked;
        }
        const isLocked = flatNeeds[needId].locked;

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
     * Holt alle flachen Bedürfnisse (NEUE integrierte Struktur)
     * @returns {Object} { needId: { value: number, locked: boolean } }
     */
    function getFlatNeeds() {
        // Tiefe Kopie um Mutationen zu vermeiden
        const copy = {};
        Object.keys(flatNeeds).forEach(needId => {
            copy[needId] = { ...flatNeeds[needId] };
        });
        return copy;
    }

    /**
     * Setzt alle flachen Bedürfnisse (NEUE integrierte Struktur)
     * Unterstützt sowohl neue als auch alte Datenformate (Migration)
     *
     * @param {Object} data - Kann sein:
     *   - Neue Struktur: { needId: { value: number, locked: boolean } }
     *   - Alte Struktur: { needId: number } (nur Werte, locked=false)
     */
    function setFlatNeeds(data) {
        if (!data || typeof data !== 'object') return;

        let migratedCount = 0;
        let newFormatCount = 0;

        Object.keys(data).forEach(needId => {
            const entry = data[needId];

            if (typeof entry === 'object' && entry !== null && 'value' in entry) {
                // Neue Struktur: { value: number, locked: boolean }
                const numValue = parseInt(entry.value, 10);
                if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
                    flatNeeds[needId] = {
                        value: numValue,
                        locked: !!entry.locked
                    };
                    newFormatCount++;
                }
            } else if (typeof entry === 'number' || !isNaN(parseInt(entry, 10))) {
                // Alte Struktur (Migration): nur Wert als Zahl
                const numValue = parseInt(entry, 10);
                if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
                    flatNeeds[needId] = {
                        value: numValue,
                        locked: false
                    };
                    migratedCount++;
                }
            }
        });

        if (migratedCount > 0) {
            console.log('[AttributeSummaryCard] Flat needs migriert:', migratedCount, 'Werte (alte Struktur)');
        }
        if (newFormatCount > 0) {
            console.log('[AttributeSummaryCard] Flat needs geladen:', newFormatCount, 'Werte (neue Struktur)');
        }
    }

    /**
     * DEPRECATED: Holt alle flachen Bedürfniswerte (Kompatibilitäts-Wrapper)
     * Verwendet intern getFlatNeeds() und extrahiert nur die Werte.
     * @returns {Object} { needId: value }
     */
    function getFlatNeedsValues() {
        const values = {};
        Object.keys(flatNeeds).forEach(needId => {
            values[needId] = flatNeeds[needId].value;
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
                if (!flatNeeds[needId]) {
                    flatNeeds[needId] = { value: numValue, locked: false };
                } else {
                    flatNeeds[needId].value = numValue;
                }
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
        Object.keys(flatNeeds).forEach(needId => {
            if (flatNeeds[needId].locked) {
                locks[needId] = true;
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
            if (flatNeeds[needId]) {
                flatNeeds[needId].locked = !!locks[needId];
            } else {
                // Erstelle Eintrag mit Default-Wert wenn nicht vorhanden
                flatNeeds[needId] = { value: 50, locked: !!locks[needId] };
            }
        });

        console.log('[AttributeSummaryCard] Flat locks geladen (Legacy):', Object.keys(locks).length, 'Locks');
    }

    /**
     * Löscht alle flachen Bedürfnis-Sperren und aktualisiert die UI
     * Wird aufgerufen beim Reset auf Standard oder beim Laden eines neuen Profils
     */
    function clearFlatLockedNeeds() {
        // Alle Lock-Status auf false setzen
        Object.keys(flatNeeds).forEach(needId => {
            flatNeeds[needId].locked = false;

            // UI aktualisieren - Lock-Icon und Disabled-Status zurücksetzen
            const needItem = document.querySelector(`.flat-need-item[data-need="${needId}"]`);
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
     * WICHTIG: Setzt auch alle Sperren zurück!
     */
    function resetFlatNeeds() {
        if (!currentFlatArchetyp || typeof GfkBeduerfnisse === 'undefined') return;

        const profil = GfkBeduerfnisse.archetypProfile[currentFlatArchetyp];
        const kernbeduerfnisse = profil?.kernbeduerfnisse || {};

        // ERST alle Sperren löschen, DANN alle Werte zurücksetzen
        clearFlatLockedNeeds();

        // Alle Werte zurücksetzen (jetzt ohne Lock-Prüfung, da alle entsperrt)
        Object.keys(kernbeduerfnisse).forEach(needId => {
            const newValue = profil.kernbeduerfnisse[needId];
            flatNeeds[needId] = {
                value: newValue,
                locked: false
            };

            // Update UI
            const needItem = document.querySelector(`.flat-need-item[data-need="${needId}"]`);
            if (needItem) {
                const slider = needItem.querySelector('.need-slider');
                const input = needItem.querySelector('.flat-need-input');
                if (slider) slider.value = newValue;
                if (input) input.value = newValue;
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
        GFK_KATEGORIEN
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AttributeSummaryCard;
}
