/**
 * TIAGE App - Main Application Logic
 * Extracted from archetype-interaction.html for modularization
 *
 * Contents:
 * - Modal Management
 * - UI Interactions
 * - Core Application Logic
 *
 * (c) 2025 Ti-age.de - All rights reserved
 */

        // ========================================
        // MAIN APPLICATION
        // ========================================

        let data = null;
        let currentArchetype = null;
        let selectedPartner = null;

        // Modal-Kontext für Profile Review (muss vor openProfileReviewModal() definiert sein)
        var currentProfileReviewContext = { archetypeKey: null, person: null };
        window.currentProfileReviewContext = currentProfileReviewContext; // Expose for profileReviewModal.js

        // ═══════════════════════════════════════════════════════════════════════
        // GEWICHTUNGEN - siehe js/components/GewichtungCard.js
        // Legacy-Kompatibilität: Alle Funktionen sind über window.* verfügbar
        // ═══════════════════════════════════════════════════════════════════════

        // ═══════════════════════════════════════════════════════════════════════════
        // PHASE 1: PROXY-LAYER MIGRATION
        // ═══════════════════════════════════════════════════════════════════════════
        // personDimensions ist jetzt ein Proxy zu TiageState (definiert in state.js)
        // Diese lokale Referenz ermöglicht weiterhin den Zugriff ohne 'window.' Prefix
        // Alle Änderungen werden automatisch an TiageState weitergeleitet.
        // ═══════════════════════════════════════════════════════════════════════════
        const personDimensions = window.personDimensions;

        // ═══════════════════════════════════════════════════════════════════════════
        // PHASE 1.1: ARCHETYP WRAPPER FUNCTIONS (State Refactoring)
        // ═══════════════════════════════════════════════════════════════════════════
        // Zentrale Getter/Setter für Archetypen die TiageState UND legacy-Variablen synchron halten.
        // Ermöglicht schrittweise Migration ohne Breaking Changes.
        // Dokumentation: docs/STATE_REFACTORING_PLAN.md
        // ═══════════════════════════════════════════════════════════════════════════

        /**
         * Holt den aktuellen ICH-Archetyp (SSOT: TiageState)
         * @returns {string} Archetyp-ID z.B. 'single', 'duo', 'polyamor'
         */
        function getIchArchetype() {
            if (typeof TiageState !== 'undefined') {
                return TiageState.getArchetype('ich') || currentArchetype || 'single';
            }
            return currentArchetype || 'single';
        }
        window.getIchArchetype = getIchArchetype;

        /**
         * Holt den aktuellen Partner-Archetyp (SSOT: TiageState)
         * @returns {string} Archetyp-ID
         */
        function getPartnerArchetype() {
            if (typeof TiageState !== 'undefined') {
                return TiageState.getArchetype('partner') || selectedPartner || null;
            }
            return selectedPartner || null;
        }
        window.getPartnerArchetype = getPartnerArchetype;

        /**
         * Setzt den ICH-Archetyp in allen Systemen synchron
         * @param {string} value - Archetyp-ID
         */
        function setIchArchetype(value) {
            currentArchetype = value;
            window.currentArchetype = value;
            // mobileIchArchetype ist ein let - try-catch für temporal dead zone
            try { mobileIchArchetype = value; } catch(e) { /* not yet defined */ }
            if (typeof TiageState !== 'undefined') {
                TiageState.setArchetype('ich', value);
            }
        }
        window.setIchArchetype = setIchArchetype;

        /**
         * Setzt den Partner-Archetyp in allen Systemen synchron
         * @param {string} value - Archetyp-ID
         */
        function setPartnerArchetype(value) {
            selectedPartner = value;
            window.selectedPartner = value;
            // mobilePartnerArchetype ist ein let - try-catch für temporal dead zone
            try { mobilePartnerArchetype = value; } catch(e) { /* not yet defined */ }
            if (typeof TiageState !== 'undefined') {
                TiageState.setArchetype('partner', value);
            }
        }
        window.setPartnerArchetype = setPartnerArchetype;

        // ═══════════════════════════════════════════════════════════════════════════
        // PHASE 1.2: TIAGESTATE SUBSCRIBER - Hält Legacy-Variablen synchron
        // ═══════════════════════════════════════════════════════════════════════════
        if (typeof TiageState !== 'undefined') {
            // Subscriber für ICH-Archetyp Änderungen
            TiageState.subscribe('archetypes.ich', function(event) {
                // FIX v4.3: event.newValue/oldValue kann String oder Objekt sein
                // set('archetypes.ich.primary', 'aro') → newValue = 'aro' (String)
                // set('archetypes.ich', { primary: 'aro' }) → newValue = { primary: 'aro' } (Objekt)
                const newArch = typeof event.newValue === 'string' ? event.newValue : (event.newValue && event.newValue.primary);
                // NACHHALTIG: oldValue aus dem Event nutzen (nicht aus currentArchetype)
                // currentArchetype wird oft VOR setArchetype() gesetzt (Dropdown, Grid),
                // daher ist event.oldValue die einzig zuverlässige Quelle für den alten Wert.
                const oldArch = typeof event.oldValue === 'string' ? event.oldValue : (event.oldValue && event.oldValue.primary);

                if (newArch) {
                    currentArchetype = newArch;
                    window.currentArchetype = newArch;
                    try { mobileIchArchetype = newArch; } catch(e) { /* not yet defined */ }

                    // Bei Archetyp-Wechsel: GODFUFH + Bedürfnisse für neuen Archetyp laden
                    if (oldArch && oldArch !== newArch) {
                        // ═══════════════════════════════════════════════════════════════
                        // PRO-ARCHETYP GODFUFH PERSISTENZ
                        // Beim Wechsel werden GOD+FFH+AGOD des alten Archetyps gesichert
                        // und die gespeicherten Werte des neuen Archetyps wiederhergestellt.
                        // event.oldValue ist die SSOT für den vorherigen Archetyp.
                        // ═══════════════════════════════════════════════════════════════
                        if (typeof MemoryManagerV2 !== 'undefined') {
                            // 1. SAVE: GOD+FFH+AGOD des ALTEN Archetyps sofort sichern
                            //    (Werte sind noch in TiageState, nur archetypes.ich hat sich geändert)
                            MemoryManagerV2.saveIchForSpecificArchetyp(oldArch);
                            console.log('[app-main] GODFUFH gesichert für alten Archetyp:', oldArch);

                            // 2. RESTORE: GOD+FFH+AGOD des NEUEN Archetyps laden
                            //    (Falls vorhanden - sonst bleiben aktuelle Werte erhalten)
                            const restored = MemoryManagerV2.restoreSettingsForArchetyp(newArch);
                            console.log('[app-main] GODFUFH Restore für', newArch, ':', restored ? 'geladen' : 'keine Daten');
                        }

                        // TiageState persistieren (mit allen aktualisierten Werten)
                        if (TiageState.saveToStorage) {
                            TiageState.saveToStorage();
                            console.log('[app-main] Auto-Save nach Archetyp-Wechsel von', oldArch, 'zu', newArch);
                        }
                        console.log('[app-main] Archetyp gewechselt von', oldArch, 'zu', newArch, '- lade Bedürfnisse neu');

                        // Synchronisiere Lock-Status aus TiageState für neuen Archetyp
                        if (typeof AttributeSummaryCard !== 'undefined') {
                            // Cache invalidieren damit frische Werte geladen werden
                            if (AttributeSummaryCard.invalidateFlatNeedsCache) {
                                AttributeSummaryCard.invalidateFlatNeedsCache();
                            }
                            // UI neu rendern mit Werten für neuen Archetyp
                            if (AttributeSummaryCard.reRenderFlatNeeds) {
                                setTimeout(function() {
                                    AttributeSummaryCard.reRenderFlatNeeds(newArch);
                                    console.log('[app-main] Bedürfnis-UI für Archetyp', newArch, 'aktualisiert');
                                }, 100); // Kurze Verzögerung damit State vollständig aktualisiert ist
                            }
                        }
                    }
                }
            });

            // Subscriber für Partner-Archetyp Änderungen
            TiageState.subscribe('archetypes.partner', function(event) {
                // FIX v4.3: event.newValue kann String oder Objekt sein (wie ICH)
                const newPartnerArch = typeof event.newValue === 'string' ? event.newValue : (event.newValue && event.newValue.primary);
                if (newPartnerArch) {
                    selectedPartner = newPartnerArch;
                    try { mobilePartnerArchetype = newPartnerArch; } catch(e) { /* not yet defined */ }
                }
            });

            // v4.3: Reactive UI-Update wenn Resonanzfaktoren sich ändern
            // Egal ob durch FFH, Orientierung, Dominanz, Archetyp oder manuell —
            // die R-Faktor-Anzeige aktualisiert sich automatisch.
            TiageState.subscribe('resonanzFaktoren.ich', function() {
                if (typeof updateRFactorDisplay === 'function') {
                    updateRFactorDisplay();
                }
            });
            TiageState.subscribe('resonanzFaktoren.partner', function() {
                if (typeof updateRFactorDisplay === 'function') {
                    updateRFactorDisplay();
                }
            });

            // v4.5: R-Faktor-Display aktualisieren wenn BeduerfnisIds (async) fertig geladen hat
            // Die Subscriber-Kette ProfileCalculator→flatNeeds→Resonanz→UI aktualisiert zwar,
            // aber ein expliziter Refresh stellt sicher dass die R-Boxen den finalen Wert zeigen.
            document.addEventListener('beduerfnisIdsLoaded', function() {
                setTimeout(function() {
                    if (typeof updateRFactorDisplay === 'function') {
                        updateRFactorDisplay();
                    }
                }, 300);
            });

            console.log('[app-main] Archetyp-Wrapper initialisiert (Phase 1 State Refactoring)');
        }

        // Dimension tooltips, icons, categoryNames: delegated to js/core/tooltips.js (TiageTooltips module)
        const dimensionTooltips = TiageTooltips.dimensionTooltips;
        const icons = TiageTooltips.icons;
        const categoryNames = TiageTooltips.categoryNames;
        window.icons = icons;
        window.categoryNames = categoryNames;

        // ═══════════════════════════════════════════════════════════════════════
        // MICRO-STATEMENTS DATABASE REFERENCES
        // Philosophische Grundlage: Pirsig (MOQ) + OSHO
        //
        // Alle Micro-Statements werden aus externen Dateien geladen:
        // - statements/archetypeStatements.js (Archetyp-Kombinationen DE)
        // - statements/archetypeStatements_EN.js (Archetyp-Kombinationen EN)
        // - statements/dominanceStatements.js (Dominanz-Kombinationen)
        // - statements/orientationStatements.js (Orientierungs-Kombinationen)
        // - statements/statusStatements.js (Status-Kombinationen)
        // - statements/gfkStatements.js (GFK-Kombinationen)
        // ═══════════════════════════════════════════════════════════════════════

        // Fallback-Definitionen falls externe Dateien nicht geladen wurden
        if (typeof window.archetypeStatements === 'undefined') {
            console.warn('archetypeStatements nicht geladen - verwende leeres Objekt');
            window.archetypeStatements = {};
        }
        if (typeof window.dominanceStatements === 'undefined') {
            console.warn('dominanceStatements nicht geladen - verwende leeres Objekt');
            window.dominanceStatements = {};
        }
        if (typeof window.orientationStatements === 'undefined') {
            console.warn('orientationStatements nicht geladen - verwende leeres Objekt');
            window.orientationStatements = {};
        }
        if (typeof window.statusStatements === 'undefined') {
            console.warn('statusStatements nicht geladen - verwende leeres Objekt');
            window.statusStatements = {};
        }
        if (typeof window.gfkStatements === 'undefined') {
            console.warn('gfkStatements nicht geladen - verwende leeres Objekt');
            window.gfkStatements = {};
        }

        // Statement helpers: delegated to js/core/statementHelpers.js (TiageStatementHelpers module)
        const orientierungStatements = window.orientationStatements;
        var getArchetypeStatements = TiageStatementHelpers.getArchetypeStatements;
        var getDominanceStatements = TiageStatementHelpers.getDominanceStatements;
        var getOrientierungStatements = TiageStatementHelpers.getOrientierungStatements;
        var getStatusStatements = TiageStatementHelpers.getStatusStatements;

        // --- block removed: statement helper functions now in statementHelpers.js ---
        

        // Archetype UI descriptions: delegated to js/core/archetypeDescriptions.js
        const archetypeDescriptions = TiageArchetypeDescriptions.archetypeDescriptions;
        window.archetypeDescriptions = archetypeDescriptions; // expose for modules

        // Tag tooltip content + normalizeTagName: delegated to js/core/tagTooltips.js
        var tagTooltipContent = TiageTagTooltips.tagTooltipContent;
        var normalizeTagName = TiageTagTooltips.normalizeTagName;

        

        // Get tooltip content for a specific tag
        function getTagTooltip(type1Id, type2Id, category, tagName) {
            const normalizedTag = normalizeTagName(tagName);

            // Sort type IDs alphabetically for consistent key lookup
            const sortedTypes = [type1Id, type2Id].sort();
            const comboKey = sortedTypes.join('-');

            // Try to find specific tooltip
            const comboData = tagTooltipContent[comboKey];
            if (comboData && comboData[category] && comboData[category][normalizedTag]) {
                const tooltip = comboData[category][normalizedTag];
                const type1 = data.archetypes[type1Id];
                const type2 = data.archetypes[type2Id];

                // Swap perspectives if types were reordered
                if (sortedTypes[0] === type2Id) {
                    return {
                        type1Name: type1?.name || type1Id,
                        type2Name: type2?.name || type2Id,
                        type1Perspective: tooltip.type2Perspective,
                        type2Perspective: tooltip.type1Perspective,
                        dynamic: tooltip.dynamic
                    };
                }

                return {
                    type1Name: type1?.name || type1Id,
                    type2Name: type2?.name || type2Id,
                    type1Perspective: tooltip.type1Perspective,
                    type2Perspective: tooltip.type2Perspective,
                    dynamic: tooltip.dynamic
                };
            }

            // Fallback: Generate generic tooltip
            return generateFallbackTooltip(type1Id, type2Id, category, tagName);
        }

        // Generate fallback tooltip when no specific content exists
        function generateFallbackTooltip(type1Id, type2Id, category, tagName) {
            const type1 = data.archetypes[type1Id];
            const type2 = data.archetypes[type2Id];
            const type1Def = archetypeDescriptions[type1Id];
            const type2Def = archetypeDescriptions[type2Id];

            const interactionKey = `${type1Id}_${type2Id}`;
            const interaction = data.interactions[interactionKey] || {};
            const scores = interaction.scores || {};
            const catScore = scores[category]?.value || 50;

            // Generate context-aware fallback
            let dynamicText = '';
            if (catScore >= 85) {
                dynamicText = `Hohe Übereinstimmung (${catScore}) in diesem Bereich - beide Typen haben ähnliche Ansätze.`;
            } else if (catScore >= 70) {
                dynamicText = `Moderate Übereinstimmung (${catScore}) - einige gemeinsame Grundlagen, aber auch Unterschiede.`;
            } else if (catScore >= 50) {
                dynamicText = `Mittlere Beziehungsqualität (${catScore}) - deutliche Unterschiede, die Kompromisse erfordern.`;
            } else {
                dynamicText = `Herausfordernde Konstellation (${catScore}) - grundlegend verschiedene Ansätze in diesem Bereich.`;
            }

            return {
                type1Name: type1?.name || type1Id,
                type2Name: type2?.name || type2Id,
                type1Perspective: type1Def?.keyPrinciples?.[0] || `${type1?.name || type1Id} hat eigene Präferenzen in diesem Bereich.`,
                type2Perspective: type2Def?.keyPrinciples?.[0] || `${type2?.name || type2Id} hat eigene Präferenzen in diesem Bereich.`,
                dynamic: dynamicText
            };
        }

        // Category descriptions loaded from data
        let categoryDescriptions = {};

        async function loadData() {
            try {
                const response = await fetch('archetype-matrix.json');
                const rawData = await response.json();

                // Transform archetypes from #A1-#A8 keys to key names (single, duo, etc.)
                if (rawData.archetypes) {
                    const transformedArchetypes = {};
                    for (const [id, archetype] of Object.entries(rawData.archetypes)) {
                        const key = archetype.key || id;
                        // Normalize id property to match the key for consistency
                        archetype.id = key;
                        transformedArchetypes[key] = archetype;
                    }
                    rawData.archetypes = transformedArchetypes;
                }

                // Transform dimensions from #D1-#D6 keys to key names (A, B, C, etc.)
                // Also support legacy 'categories' field
                if (rawData.dimensions) {
                    const transformedDimensions = {};
                    for (const [id, dimension] of Object.entries(rawData.dimensions)) {
                        const key = dimension.key || id;
                        // Normalize id property to match the key for consistency
                        dimension.id = key;
                        transformedDimensions[key] = dimension;
                    }
                    rawData.categories = transformedDimensions;
                }

                data = rawData;
                window.tiageData = data; // Expose for extracted modules

                // Load category descriptions from data
                if (data.categories) {
                    categoryDescriptions = data.categories;
                    window.categoryDescriptions = categoryDescriptions; // Expose for extracted modules
                }
            } catch (error) {
                console.error('Error loading data:', error);
                data = getFallbackData();
            }
            initApp();
        }

        function getFallbackData() {
            return {
                archetypes: {
                    single: { id: "single", name: "Single", color: "#E63946", shortDescription: "Fokus auf Selbstentwicklung", pro: [], contra: [], pathos: "", logos: "" },
                    duo: { id: "duo", name: "Duo", color: "#E84393", shortDescription: "Klassische monogame Zweierbeziehung", pro: [], contra: [], pathos: "", logos: "" },
                    duo_flex: { id: "duo_flex", name: "Duo-Flex", color: "#FF6B6B", shortDescription: "Primär Zweierbeziehung mit situativer Öffnung", pro: [], contra: [], pathos: "", logos: "" },
                    solopoly: { id: "solopoly", name: "Solopoly", color: "#2A9D8F", shortDescription: "Polyamor mit Autonomie", pro: [], contra: [], pathos: "", logos: "" },
                    polyamor: { id: "polyamor", name: "Polyamor", color: "#F4A261", shortDescription: "Strukturierte Mehrfachbeziehungen", pro: [], contra: [], pathos: "", logos: "" },
                    ra: { id: "ra", name: "RA", color: "#9B5DE5", shortDescription: "RA - Ablehnung von Labels", pro: [], contra: [], pathos: "", logos: "" },
                    lat: { id: "lat", name: "LAT", color: "#06D6A0", shortDescription: "Living Apart Together", pro: [], contra: [], pathos: "", logos: "" },
                    aromantisch: { id: "aromantisch", name: "Aromantisch", color: "#118AB2", shortDescription: "Platonische Verbindungen", pro: [], contra: [], pathos: "", logos: "" }
                },
                categories: {},
                interactions: {},
                aggregatedMatrix: { rows: [], cols: [], values: [] }
            };
        }

        function initApp() {
            const archetypeSelect = document.getElementById('archetypeSelect');
            if (archetypeSelect) {
                archetypeSelect.addEventListener('change', (e) => {
                    currentArchetype = e.target.value;
                    mobileIchArchetype = e.target.value;
                    // Sync with TiageState for save/load
                    if (typeof TiageState !== 'undefined') {
                        TiageState.setArchetype('ich', e.target.value);
                    }
                    updateAll();
                });
            }

            // Carousel scroll detection
            const carousel = document.getElementById('carousel');
            if (carousel) {
                carousel.addEventListener('scroll', updateNavDots);
            }

            // Initialize dimension info link event listeners
            initDimensionInfoLinks();

            // Greeting Hint wird jetzt über den WorkflowGuide (Schritt 0) angezeigt
            // initGreetingHint();

            updateAll();
        }

        /**
         * Initialize Philosophy Greeting Hints
         * Shows Moment 0a for new users, Moment 0b for returning users
         * Displays as centered popup modal controlled by global moments toggle
         */
        function initGreetingHint() {
            // Check if PhilosophyHints is available
            if (typeof PhilosophyHints === 'undefined' || typeof PhilosophyHint === 'undefined') {
                console.warn('[PhilosophyHints] Components not loaded');
                return;
            }

            // Check if moments are globally enabled
            if (!PhilosophyHints.areMomentsEnabled()) {
                console.log('[PhilosophyHints] Moments disabled - skipping greeting hint');
                return;
            }

            // Check if user has an existing profile (locked needs indicate engagement)
            const savedState = localStorage.getItem('tiage_state');
            let hasExistingProfile = false;

            if (savedState) {
                try {
                    const state = JSON.parse(savedState);
                    // Check for locked needs or AGOD selections as indicator of profile
                    // v4.3: Global-Format (profileReview.ich.global) + Fallback auf altes lockedNeeds
                    const ichLocked = state.profileReview?.ich?.global || state.profileReview?.ich?.lockedNeeds;
                    const hasLockedNeeds = ichLocked && Object.keys(ichLocked).length > 0;
                    const hasAGOD = state.personDimensions?.ich?.archetyp?.primary;
                    hasExistingProfile = hasLockedNeeds || hasAGOD;
                } catch (e) {
                    console.warn('[PhilosophyHints] Could not parse saved state');
                }
            }

            // Create appropriate greeting hint (without dismissable option - controlled via global toggle)
            let hintElement;
            if (hasExistingProfile) {
                // Moment 0b: Returning user
                hintElement = PhilosophyHints.createMoment0bReturning({
                    dismissable: false,
                    onExpand: function(id) {
                        if (typeof HintState !== 'undefined') {
                            HintState.trackHintEvent('expanded', id);
                        }
                    }
                });
            } else {
                // Moment 0a: New user / Landing
                hintElement = PhilosophyHints.createMoment0aLanding({
                    dismissable: false,
                    onExpand: function(id) {
                        if (typeof HintState !== 'undefined') {
                            HintState.trackHintEvent('expanded', id);
                        }
                    }
                });
            }

            // Show as centered popup modal
            PhilosophyHint.showModal(hintElement, {
                onClose: function() {
                    if (typeof HintState !== 'undefined') {
                        HintState.trackHintEvent('closed', hasExistingProfile ? 'moment-0b-returning' : 'moment-0a-landing');
                    }
                }
            });
        }

        /**
         * Initialize event listeners for dimension info links
         * Uses CSS classes instead of onclick attributes for cleaner code
         */
        function initDimensionInfoLinks() {
            // Geschlechtsidentität links
            document.querySelectorAll('.geschlecht-info-link').forEach(el => {
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showGeschlechtInfoModal();
                });
            });

            // Dominanz links
            document.querySelectorAll('.dominanz-info-link').forEach(el => {
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showDominanzInfoModal();
                });
            });

            // Orientierung links
            document.querySelectorAll('.orientierung-info-link').forEach(el => {
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showOrientierungInfoModal();
                });
            });

            // GFK links
            document.querySelectorAll('.gfk-info-link').forEach(el => {
                el.addEventListener('click', (e) => {
                    e.stopPropagation();
                    showDimensionTooltip('gfk');
                });
            });
        }

        function updateAll() {
            // Guard: Don't update UI if data not loaded yet
            if (!data || !data.archetypes) {
                console.warn('[TIAGE] updateAll called before data loaded - skipping');
                return;
            }
            updateTheme();
            updateMyType();
            updatePartnerSelector();
            updateTopAndChallenge();
            updatePartnerView();
            updateLegendCategories();
            updateAnalysisOverview();
            updateComparisonView(); // Trigger score calculation and UI update
            // GFK automatisch aus Archetypen-Matching ableiten
            if (typeof updateGfkFromArchetypes === 'function') {
                updateGfkFromArchetypes();
            }
        }

        function updateTheme() {
            document.body.className = `theme-${currentArchetype}`;
        }

        function updateMyType() {
            // Guard against data not being loaded yet
            if (!data || !data.archetypes) {
                console.warn('[TIAGE] updateMyType called before data loaded');
                return;
            }
            const arch = data.archetypes[currentArchetype];
            if (!arch) return;

            const myTypeIcon = document.getElementById('myTypeIcon');
            if (myTypeIcon) {
                myTypeIcon.textContent = icons[currentArchetype];
                myTypeIcon.style.background = arch.color;
            }

            const myTypeName = document.getElementById('myTypeName');
            if (myTypeName) {
                myTypeName.textContent = arch.name;
                myTypeName.style.color = arch.color;
            }

            const myTypeDesc = document.getElementById('myTypeDesc');
            if (myTypeDesc) myTypeDesc.textContent = arch.shortDescription || '';

            const myTypeTooltip = document.getElementById('myTypeTooltip');
            if (myTypeTooltip) myTypeTooltip.textContent = window.getShortDef(currentArchetype);

            const proList = document.getElementById('myTypePro');
            if (proList) proList.innerHTML = (arch.pro || []).slice(0, 4).map(p => `<li>${p}</li>`).join('');

            const contraList = document.getElementById('myTypeContra');
            if (contraList) contraList.innerHTML = (arch.contra || []).slice(0, 4).map(c => `<li>${c}</li>`).join('');

            const myTypePathos = document.getElementById('myTypePathos');
            if (myTypePathos) myTypePathos.textContent = arch.pathos || '';

            const myTypeLogos = document.getElementById('myTypeLogos');
            if (myTypeLogos) myTypeLogos.textContent = arch.logos || '';
        }

        // Fixed archetype order to ensure all types are shown
        const archetypeOrder = ['single', 'duo', 'duo_flex', 'solopoly', 'polyamor', 'ra', 'lat', 'aromantisch'];
        window.archetypeOrder = archetypeOrder;

        function updatePartnerSelector() {
            const container = document.getElementById('partnerSelector');
            // Show ALL archetypes as partner options (including own type for self-matching)
            const allPartners = archetypeOrder
                .map(id => data.archetypes[id])
                .filter(arch => arch); // Remove any undefined

            // Nur Default setzen wenn selectedPartner einen Wert hat aber ungültig ist
            // Bei null (kein Partner gewählt) → null lassen
            if (selectedPartner && !allPartners.find(o => o.id === selectedPartner)) {
                selectedPartner = allPartners[0]?.id || null;
            }

            container.innerHTML = allPartners.map(arch => `
                <button class="partner-btn ${arch.id === selectedPartner ? 'active' : ''}"
                        onclick="selectPartner('${arch.id}')"
                        data-id="${arch.id}">
                    <span class="dot" style="background: ${arch.color}"></span>
                    ${arch.name}
                </button>
            `).join('');
        }

        function selectPartner(partnerId) {
            selectedPartner = partnerId;
            mobilePartnerArchetype = partnerId;

            // Sync with TiageState for persistence
            if (typeof TiageState !== 'undefined') {
                TiageState.setArchetype('partner', partnerId);
            }

            // Sync select dropdowns
            const partnerSelect = document.getElementById('partnerSelect');
            const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
            if (partnerSelect) partnerSelect.value = partnerId;
            if (mobilePartnerSelect) mobilePartnerSelect.value = partnerId;

            // Sync archetype grid highlighting
            updateArchetypeGrid('partner', partnerId);

            document.querySelectorAll('.partner-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.id === partnerId);
            });
            updatePartnerView();
            updateAnalysisOverview();
            updateComparisonView(); // Trigger score calculation and UI update
        }

        function updateTopAndChallenge() {
            // Include all types (including self) for top match and challenge
            const others = archetypeOrder;
            let topMatch = { id: null, score: 0 };
            let challenge = { id: null, score: 100 };

            others.forEach(otherId => {
                const key = `${currentArchetype}_${otherId}`;
                const interaction = data.interactions[key];
                const score = interaction?.overall || 0;

                if (score > topMatch.score) {
                    topMatch = { id: otherId, score };
                }
                if (score < challenge.score) {
                    challenge = { id: otherId, score };
                }
            });

            // Store for modal access
            currentTopMatch = topMatch;
            currentChallenge = challenge;

            const myArch = data.archetypes[currentArchetype];

            if (topMatch.id) {
                const arch = data.archetypes[topMatch.id];
                if (arch) {
                    document.getElementById('topMatchDot').style.background = arch.color;
                    document.getElementById('topMatchName').textContent = `${myArch?.name || 'Ich'} (Ich) mit ${arch.name}`;
                    document.getElementById('topMatchScore').textContent = topMatch.score;
                }
            }

            if (challenge.id) {
                const arch = data.archetypes[challenge.id];
                if (arch) {
                    document.getElementById('challengeDot').style.background = arch.color;
                    document.getElementById('challengeName').textContent = `${myArch?.name || 'Ich'} (Ich) mit ${arch.name}`;
                    document.getElementById('challengeScore').textContent = challenge.score;
                }
            }
        }

        function updatePartnerView() {
            const myArch = data.archetypes[currentArchetype];
            const partnerArch = data.archetypes[selectedPartner];
            const interactionKey = `${currentArchetype}_${selectedPartner}`;
            const interaction = data.interactions[interactionKey] || {};

            // Run Pathos/Logos checks (keine Blockierung mehr - zeigt nur Warnungen)
            runCompatibilityChecks();

            // NEU: GFK-Bedürfnis-Matching mit allen Dimensionen neu berechnen
            updateGfkFromArchetypes();

            document.getElementById('myTypeNameDisplay').textContent = myArch?.name || '...';
            document.getElementById('partnerNameDisplay').textContent = partnerArch?.name || '...';
            document.getElementById('myTypeTooltipPage3').textContent = window.getShortDef(currentArchetype);
            document.getElementById('partnerTooltipPage3').textContent = window.getShortDef(selectedPartner);

            const score = interaction.overall || 0;
            const scoreEl = document.getElementById('overallScore');
            scoreEl.textContent = score;
            scoreEl.style.color = getScoreColor(score);

            drawRadarChart(interaction.scores || {}, partnerArch?.color || '#457B9D');
            updateCategoryBars(interaction.scores || {});

            const proList = document.getElementById('partnerPro');
            proList.innerHTML = (interaction.pro || []).map(p => `<li>${p}</li>`).join('') || `<li>${TiageI18n.t('ui.noData', 'Keine Daten')}</li>`;

            const contraList = document.getElementById('partnerContra');
            contraList.innerHTML = (interaction.contra || []).map(c => `<li>${c}</li>`).join('') || `<li>${TiageI18n.t('ui.noData', 'Keine Daten')}</li>`;
        }

        // Radar chart: delegated to js/ui/chartUtils.js (TiageChartUtils module)
        var drawRadarChart = TiageChartUtils.drawRadarChart;

        function updateCategoryBars(scores) {
            const container = document.getElementById('categoryBars');
            const categories = ['A', 'B', 'C', 'D', 'E', 'F'];

            container.innerHTML = categories.map(cat => {
                const value = scores[cat]?.value || 0;
                const barClass = getBarClass(value);
                const name = categoryNames[cat] || cat;

                return `
                    <div class="category-row" onclick="openSingleCategoryModal('${cat}')">
                        <span class="category-label">${cat}</span>
                        <div class="category-bar-wrap">
                            <div class="category-bar-container">
                                <div class="category-bar ${barClass}" style="width: ${value}%">
                                    <span class="category-bar-value">${value}%</span>
                                </div>
                            </div>
                            <div class="category-name">${name}</div>
                        </div>
                    </div>
                `;
            }).join('');
        }

        // Score color utilities: delegated to js/ui/chartUtils.js (TiageChartUtils module)
        var getScoreColor = TiageChartUtils.getScoreColor;
        var getScoreGradientColor = TiageChartUtils.getScoreGradientColor;

        // ═══════════════════════════════════════════════════════════════════════════
        // AGOD WEIGHT TOGGLES - Ausgelagert nach js/weights/agodWeights.js
        // Die Funktionen werden vom Modul über window.* exportiert:
        // - initAgodWeightInputs(), setAgodWeight(), resetAgodWeights()
        // - getAgodWeights(), getAgodWeightSum(), saveAgodWeights()
        // - updateAgodToggleUI(), getAgodWeightsFromSession()
        // ═══════════════════════════════════════════════════════════════════════════

        /**
         * Reset Partner GOD (Geschlecht, Orientierung, Dominanz) selection
         * Makes all partner options "free" again
         * NOTE: Bleibt in app-main.js weil es personDimensions/mobilePersonDimensions nutzt
         */
        function resetPartnerGOD() {
            // ═══════════════════════════════════════════════════════════════
            // v1.8.908: FREE-Button setzt jetzt auch Archetyp + R-Faktoren zurück
            // Reset: G, O, D, A (Archetyp), R1-R4 (Resonanzfaktoren)
            // ═══════════════════════════════════════════════════════════════

            // Reset personDimensions for partner (G, O, D, GFK)
            if (typeof personDimensions !== 'undefined' && personDimensions.partner) {
                personDimensions.partner.geschlecht = null;
                personDimensions.partner.orientierung = null;
                personDimensions.partner.dominanz = null;
                personDimensions.partner.gfk = null;
            }
            // v4.4: GFK für ICH auch zurücksetzen (GFK ist paarabhängig)
            if (typeof personDimensions !== 'undefined' && personDimensions.ich) {
                personDimensions.ich.gfk = null;
            }

            // Reset mobilePersonDimensions for partner
            if (typeof mobilePersonDimensions !== 'undefined' && mobilePersonDimensions.partner) {
                mobilePersonDimensions.partner.geschlecht = null;
                mobilePersonDimensions.partner.orientierung = null;
                mobilePersonDimensions.partner.dominanz = null;
                mobilePersonDimensions.partner.gfk = null;
            }
            if (typeof mobilePersonDimensions !== 'undefined' && mobilePersonDimensions.ich) {
                mobilePersonDimensions.ich.gfk = null;
            }

            // Reset partner archetype global variables
            selectedPartner = null;
            mobilePartnerArchetype = null;

            // Reset TiageState (G, O, D, A, R-Faktoren, flatNeeds)
            if (typeof TiageState !== 'undefined') {
                // GOD
                TiageState.set('personDimensions.partner.geschlecht', null);
                TiageState.set('personDimensions.partner.orientierung', null);
                TiageState.set('personDimensions.partner.dominanz', null);

                // Archetyp (A)
                TiageState.set('archetypes.partner', { primary: null, secondary: null });

                // R-Faktoren auf Default (1.0, unlocked)
                const defaultRFaktoren = {
                    R1: { value: 1.0, locked: false },
                    R2: { value: 1.0, locked: false },
                    R3: { value: 1.0, locked: false },
                    R4: { value: 1.0, locked: false }
                };
                TiageState.setResonanzFaktoren('partner', defaultRFaktoren);

                // flatNeeds für Partner leeren
                TiageState.set('flatNeeds.partner', {});

                TiageState.saveToStorage();
            }

            // Reset UI - clear all active states in partner grids
            // FIX: Entferne ALLE möglichen Klassen (active, primary-selected, secondary-selected)
            const allClasses = ['active', 'active-primary', 'active-secondary', 'primary-selected', 'secondary-selected'];

            // Geschlecht P-Grid
            document.querySelectorAll('#partner-geschlecht-p-grid .geschlecht-btn, #mobile-partner-geschlecht-p-grid .geschlecht-btn, #modal-partner-geschlecht-grid .geschlecht-btn').forEach(btn => {
                btn.classList.remove(...allClasses);
                btn.querySelectorAll('.geschlecht-indicator').forEach(ind => ind.remove());
            });

            // Geschlecht Extras (Fit/Fucked up/Horny) - AUCH Inline-Styles entfernen!
            document.querySelectorAll('#partner-geschlecht-extras-grid .geschlecht-btn, #mobile-partner-geschlecht-extras-grid .geschlecht-btn').forEach(btn => {
                btn.classList.remove(...allClasses);
                // Inline-Styles entfernen (syncGeschlechtExtrasUI setzt diese)
                btn.style.background = '';
                btn.style.borderColor = '';
                btn.style.color = '';
                btn.style.opacity = '';
            });

            // Reset geschlechtExtrasCache für Partner
            if (typeof geschlechtExtrasCache !== 'undefined' && geschlechtExtrasCache.partner) {
                geschlechtExtrasCache.partner = { fit: false, fuckedup: false, horny: false };
            }

            // Reset TiageState geschlecht extras für Partner
            // FIX v4.3: geschlecht_extras als Objekt setzen (nicht einzelne Felder)
            if (typeof TiageState !== 'undefined') {
                TiageState.set('personDimensions.partner.geschlecht_extras', { fit: false, fuckedup: false, horny: false });
            }

            // Reset in-memory personDimensions
            if (typeof personDimensions !== 'undefined' && personDimensions.partner) {
                personDimensions.partner.geschlecht_extras = { fit: false, fuckedup: false, horny: false };
            }
            if (typeof mobilePersonDimensions !== 'undefined' && mobilePersonDimensions.partner) {
                mobilePersonDimensions.partner.geschlecht_extras = { fit: false, fuckedup: false, horny: false };
            }
            document.querySelectorAll('#partner-geschlecht-s-grid .geschlecht-btn, #mobile-partner-geschlecht-s-grid .geschlecht-btn').forEach(btn => {
                btn.classList.remove(...allClasses);
                btn.querySelectorAll('.geschlecht-indicator').forEach(ind => ind.remove());
            });

            // Orientierung
            document.querySelectorAll('#partner-orientierung-grid .orientierung-btn, #mobile-partner-orientierung-grid .orientierung-btn, #modal-partner-orientierung-grid .orientierung-btn').forEach(btn => {
                btn.classList.remove(...allClasses);
                btn.querySelectorAll('.geschlecht-indicator').forEach(ind => ind.remove());
            });

            // Dominanz
            document.querySelectorAll('#partner-dominanz-grid .dominanz-btn, #mobile-partner-dominanz-grid .dominanz-btn, #modal-partner-dominanz-grid .dominanz-btn').forEach(btn => {
                btn.classList.remove(...allClasses);
                btn.querySelectorAll('.geschlecht-indicator').forEach(ind => ind.remove());
            });

            // v1.8.908: Archetyp-Grid reset (A)
            document.querySelectorAll('#partner-archetype-grid .archetype-symbol-item, #mobile-partner-archetype-grid .archetype-symbol-item').forEach(item => {
                item.classList.remove('active');
            });

            // Reset partner archetype select dropdowns
            const partnerSelect = document.getElementById('partnerSelect');
            const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
            if (partnerSelect) partnerSelect.selectedIndex = 0;
            if (mobilePartnerSelect) mobilePartnerSelect.selectedIndex = 0;

            // Clear summaries
            ['partner-geschlecht-summary', 'partner-orientierung-summary', 'partner-dominanz-summary',
             'mobile-partner-geschlecht-summary', 'mobile-partner-orientierung-summary', 'mobile-partner-dominanz-summary'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = '';
            });

            // Clear header info
            ['partner-header-geschlecht', 'partner-header-dominanz', 'partner-header-orientierung',
             'mobile-partner-header-geschlecht', 'mobile-partner-header-dominanz', 'mobile-partner-header-orientierung'].forEach(id => {
                const el = document.getElementById(id);
                if (el) el.innerHTML = '';
            });

            // Add needs-selection class back
            document.querySelectorAll('[data-dimension*="partner-geschlecht"], [data-dimension*="partner-orientierung"], [data-dimension*="partner-dominanz"]').forEach(el => {
                el.classList.add('needs-selection');
            });

            // v4.4: GFK-UI sofort zurücksetzen (BEIDE Seiten)
            if (typeof syncGfkUI === 'function') {
                syncGfkUI('ich');
                syncGfkUI('partner');
            }

            // v4.4: Lightbulb-Blink deaktivieren (kein Score ohne Partner)
            if (typeof stopLightbulbBlink === 'function') {
                stopLightbulbBlink();
            }

            // Trigger recalculation
            if (typeof updateComparisonView === 'function') {
                updateComparisonView();
            }

            // v1.8.908: ResonanzCard UI aktualisieren
            if (typeof ResonanzCard !== 'undefined' && typeof ResonanzCard.updateDisplay === 'function') {
                ResonanzCard.updateDisplay('partner');
            }

            // v4.3: R-Faktor-Anzeige auf Hauptseite aktualisieren (zeigt jetzt ICH statt "-")
            if (typeof updateRFactorDisplay === 'function') {
                updateRFactorDisplay();
            }

            TiageToast.info('Partner zurückgesetzt 🔄');
            console.log('[Partner FREE] Reset complete - G, O, D, A, GFK und R-Faktoren zurückgesetzt');
        }

        // Expose globally
        window.resetPartnerGOD = resetPartnerGOD;

        // Update Score Cycle im Synthese Modal und auf der Hauptseite
        function updateSyntheseScoreCycle() {
            const scoreValueEl = document.getElementById('syntheseScoreValue');
            const scoreProgressEl = document.getElementById('syntheseScoreProgress');
            const mainScoreValueEl = document.getElementById('mainScoreValue');
            const mainScoreProgressEl = document.getElementById('mainScoreProgress');

            // Get current score from resultPercentage
            const percentage = document.getElementById('resultPercentage');
            const percentageText = percentage ? percentage.textContent : '–';

            // FIX: Handle incomplete state (when percentage shows "–")
            const isIncomplete = percentageText === '–' || percentageText.trim() === '';
            const currentScore = isIncomplete ? 0 : (parseFloat(percentageText) || 0);
            const displayScore = isIncomplete ? '–' : currentScore.toFixed(1);

            // console.log('[TIAGE] updateSyntheseScoreCycle - score:', currentScore, 'mainScoreValueEl:', !!mainScoreValueEl); // DISABLED: verursacht Message-Overflow

            // Update circle progress (circumference = 2 * PI * r = 2 * 3.14159 * 42 ≈ 264)
            const circumference = 264;
            // Kreisanzeige auf 100% begrenzen, aber Score-Zahl kann höher sein
            const visualProgress = Math.min(currentScore, 100);
            const offset = isIncomplete ? circumference : (circumference - (visualProgress / 100) * circumference);

            // Update color based on score (rot → gelb → grün → gold bei >100%)
            // FIX: Use muted color for incomplete state
            const color = isIncomplete ? 'var(--text-muted, #888)' : getScoreGradientColor(currentScore);

            // Update Modal Score Circle
            if (scoreValueEl && scoreProgressEl) {
                scoreValueEl.textContent = displayScore;
                scoreProgressEl.style.strokeDashoffset = offset;
                scoreProgressEl.style.stroke = color;
                scoreValueEl.style.color = color;
            }

            // Update Main Page Score Circle
            if (mainScoreValueEl && mainScoreProgressEl) {
                mainScoreValueEl.textContent = displayScore;
                mainScoreProgressEl.style.strokeDashoffset = offset;
                mainScoreProgressEl.style.stroke = color;
                mainScoreValueEl.style.color = color;
            }

            // Update Mobile Score Circle
            const mobileScoreEl = document.getElementById('mobileScoreCircle');
            const mobileScoreProgressEl = document.getElementById('mobileScoreProgress');

            if (mobileScoreEl) {
                mobileScoreEl.textContent = displayScore;
                mobileScoreEl.style.color = color;
            }

            if (mobileScoreProgressEl) {
                mobileScoreProgressEl.style.strokeDashoffset = offset;
                mobileScoreProgressEl.style.stroke = color;
            }

            // Trigger lightbulb blink animation when score is calculated
            // v4.4: Blink deaktivieren wenn Score incomplete/0
            if (currentScore > 0) {
                triggerLightbulbBlink();
            } else {
                stopLightbulbBlink();
            }

            // Update Score Summary Line in Synthese Modal
            const scoreSummaryValueEl = document.getElementById('syntheseScoreSummaryValue');
            const needsSummaryValueEl = document.getElementById('syntheseNeedsSummaryValue');

            if (scoreSummaryValueEl) {
                scoreSummaryValueEl.textContent = displayScore;
                scoreSummaryValueEl.style.color = color;
            }

            if (needsSummaryValueEl) {
                // Get Bedürfnis-Übereinstimmung from lastGfkMatchingResult
                // FIX: Show "–" for incomplete state
                if (isIncomplete) {
                    needsSummaryValueEl.textContent = '–';
                    needsSummaryValueEl.style.color = 'var(--text-muted, #888)';
                } else {
                    const needsScore = lastGfkMatchingResult ? lastGfkMatchingResult.score : 0;
                    needsSummaryValueEl.textContent = needsScore;
                    // Color based on needs score
                    const needsColor = getScoreGradientColor(needsScore);
                    needsSummaryValueEl.style.color = needsColor;
                }
            }
        }
        window.updateSyntheseScoreCycle = updateSyntheseScoreCycle;

        // Trigger lightbulb blink animation to encourage clicking
        function triggerLightbulbBlink() {
            const lightbulbIcons = document.querySelectorAll('.lightbulb-icon');
            lightbulbIcons.forEach(icon => {
                // Add blink-active class if not already present
                if (!icon.classList.contains('blink-active')) {
                    icon.classList.add('blink-active');
                    console.log('[TIAGE] Lightbulb blink animation activated');
                }
            });
        }

        // Stop lightbulb blink animation (can be called when user clicks the lightbulb)
        function stopLightbulbBlink() {
            const lightbulbIcons = document.querySelectorAll('.lightbulb-icon');
            lightbulbIcons.forEach(icon => {
                icon.classList.remove('blink-active');
            });
        }

        // Bar class utility: delegated to js/ui/chartUtils.js
        var getBarClass = TiageChartUtils.getBarClass;

        // Collapsible functions: delegated to js/ui/collapsible.js (TiageCollapsible module)
        // - toggleCollapsible, toggleDimensionCollapse, toggleAllDimensionsCollapse
        // - toggleDesktopFactor, updateDesktopFactorFoldButton

        // Update all desktop factor expandable content
        function updateDesktopFactorContent() {
            // Check if factorExplanations is defined (it's defined later in the file)
            if (typeof factorExplanations === 'undefined') return;

            const ich = mobileIchArchetype;
            const partner = mobilePartnerArchetype;
            const dimensions = personDimensions;

            const factorTypes = ['archetyp', 'dominanz', 'orientierung', 'geschlecht'];

            factorTypes.forEach(factorType => {
                const factor = factorExplanations[factorType];
                if (!factor) return;

                // Get score
                const prefix = 'desktopFactor';
                let score = 0;
                const scoreEl = document.getElementById(prefix + factorType.charAt(0).toUpperCase() + factorType.slice(1));
                if (scoreEl) {
                    score = parseInt(scoreEl.textContent) || 0;
                }

                // Update explanation
                const explanationId = prefix + factorType.charAt(0).toUpperCase() + factorType.slice(1) + 'Explanation';
                const explanationEl = document.getElementById(explanationId);
                if (explanationEl) {
                    explanationEl.textContent = factor.getExplanation(ich, partner, score, dimensions);
                }

                // Update meaning list
                const meaningId = prefix + factorType.charAt(0).toUpperCase() + factorType.slice(1) + 'Meaning';
                const meaningList = document.getElementById(meaningId);
                if (meaningList) {
                    meaningList.innerHTML = '';
                    factor.getMeaning(score, ich, partner).forEach(item => {
                        const li = document.createElement('li');
                        if (typeof item === 'object' && item.title) {
                            li.innerHTML = `<strong>${item.title}</strong>${item.desc ? ` – ${item.desc}` : ''}`;
                        } else {
                            li.textContent = item;
                        }
                        meaningList.appendChild(li);
                    });
                }
            });
        }

        // Update R-Factor Display (Resonanz der Paarung R1-R4)
        function updateRFactorDisplay() {
            const rDisplay = document.getElementById('rFactorDisplay');
            if (!rDisplay) return;

            // Extrahiere R-Wert (Format kann { R1: value } oder { R1: { value, locked } } sein)
            const extractR = (rf, key) => {
                if (!rf || rf[key] === undefined) return 1.0;
                if (typeof rf[key] === 'object' && rf[key].value !== undefined) return rf[key].value;
                return rf[key];
            };

            // FIX v4.3: Nur selectedPartner verwenden, nicht auf TiageState zurückfallen
            // (TiageState kann alte Werte aus localStorage haben obwohl kein Partner aktiv ist)
            const partnerArchetype = selectedPartner || null;
            const ichArchetype = currentArchetype || (typeof TiageState !== 'undefined' ? TiageState.get('archetypes.ich.primary') : null);
            const subtitle = document.getElementById('rFactorSubtitle');

            let rFactors = { R1: null, R2: null, R3: null, R4: null };

            try {
                if (!ichArchetype) {
                    // Kein ICH-Archetyp → zeige "-"
                    if (subtitle) subtitle.textContent = 'ICH × PARTNER';
                } else if (!partnerArchetype) {
                    // v4.3: Kein Partner gewählt → zeige ICH-R-Faktoren (statt "-")
                    if (subtitle) subtitle.textContent = 'ICH';
                    if (typeof TiageState !== 'undefined') {
                        // FIX: Per-Archetyp-Pfad lesen (resonanzFaktoren.ich.{archetyp})
                        const rfIch = TiageState.getResonanzFaktoren('ich');
                        if (rfIch) {
                            rFactors = {
                                R1: extractR(rfIch, 'R1'),
                                R2: extractR(rfIch, 'R2'),
                                R3: extractR(rfIch, 'R3'),
                                R4: extractR(rfIch, 'R4')
                            };
                        }
                    }
                } else {
                    // Partner gewählt → kombinierte R-Faktoren (ICH × PARTNER)
                    if (subtitle) subtitle.textContent = 'ICH × PARTNER';

                    if (typeof TiageSynthesis !== 'undefined' && TiageSynthesis.Calculator && TiageSynthesis.Calculator.getLastRFactors) {
                        rFactors = TiageSynthesis.Calculator.getLastRFactors() || rFactors;
                    }

                    if (rFactors.R1 === null && typeof TiageState !== 'undefined') {
                        // FIX v1.8.1001: getResonanzFaktoren löst per-Archetyp-Pfad korrekt auf
                        const rfIch = TiageState.getResonanzFaktoren('ich');
                        const rfPartner = TiageState.getResonanzFaktoren('partner');

                        if (rfIch && rfPartner) {
                            // FIX v4.3: combineRFactors statt einfacher Multiplikation
                            // Vorher: R_ich * R_partner → 3.02 * 3.02 = 9.12 (falsch!)
                            // Jetzt:  (summe * similarity) / 2 → (6.04 * 1.0) / 2 = 3.02
                            // SSOT: Gleiche Formel wie combineRFactors() in synthesisCalculator.js
                            // Keine Zwischen-Rundung — Display-Rundung per toFixed(2)
                            const combine = (a, b) => {
                                const va = a || 1.0, vb = b || 1.0;
                                const summe = va + vb;
                                const similarity = Math.min(va, vb) / Math.max(va, vb);
                                return (summe * similarity) / 2;
                            };
                            rFactors = {
                                R1: combine(extractR(rfIch, 'R1'), extractR(rfPartner, 'R1')),
                                R2: combine(extractR(rfIch, 'R2'), extractR(rfPartner, 'R2')),
                                R3: combine(extractR(rfIch, 'R3'), extractR(rfPartner, 'R3')),
                                R4: combine(extractR(rfIch, 'R4'), extractR(rfPartner, 'R4'))
                            };
                        }
                    }
                }
            } catch (e) {
                console.warn('[TIAGE] updateRFactorDisplay error:', e);
            }

            // Update UI
            ['R1', 'R2', 'R3', 'R4'].forEach(key => {
                const valueEl = document.getElementById('rValue' + key);
                const boxEl = document.getElementById('rFactor' + key);
                if (!valueEl || !boxEl) return;

                const val = rFactors[key];
                if (val === null || val === undefined) {
                    valueEl.textContent = '-';
                    boxEl.classList.remove('high', 'medium', 'low');
                } else {
                    // FIX v4.3: R-Faktoren können mit v4.0 Sensitivität > 1.0 sein
                    valueEl.textContent = val.toFixed(2);

                    // Farb-Klasse: v4.0 Skala (R=1.0 = Neutral, >1.2 = Gut, >1.8 = Stark)
                    boxEl.classList.remove('high', 'medium', 'low');
                    if (val >= 1.8) {
                        boxEl.classList.add('high');
                    } else if (val >= 1.2) {
                        boxEl.classList.add('medium');
                    } else if (val < 0.6) {
                        boxEl.classList.add('low');
                    }
                }
            });
        }

        function scrollToCard(index) {
            const carousel = document.getElementById('carousel');
            const cardWidth = window.innerWidth;
            carousel.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
        }

        const TOTAL_PAGES = 4;

        function updateNavDots() {
            const carousel = document.getElementById('carousel');
            const cardWidth = window.innerWidth;
            const currentCard = Math.round(carousel.scrollLeft / cardWidth);

            document.querySelectorAll('.nav-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentCard);
            });

            // Update arrow states
            const arrows = document.querySelectorAll('.nav-arrow');
            if (arrows.length >= 2) {
                arrows[0].disabled = currentCard === 0;
                arrows[1].disabled = currentCard === TOTAL_PAGES - 1;
            }

            // Load feedback when on page 4
            if (currentCard === 3) {
                loadFeedback();
            }
        }

        function navigatePrev() {
            const carousel = document.getElementById('carousel');
            const cardWidth = window.innerWidth;
            const currentCard = Math.round(carousel.scrollLeft / cardWidth);
            if (currentCard > 0) {
                scrollToCard(currentCard - 1);
            }
        }

        function navigateNext() {
            const carousel = document.getElementById('carousel');
            const cardWidth = window.innerWidth;
            const currentCard = Math.round(carousel.scrollLeft / cardWidth);
            if (currentCard < TOTAL_PAGES - 1) {
                scrollToCard(currentCard + 1);
            }
        }

        // Legend Categories
        function updateLegendCategories() {
            const container = document.getElementById('legendCategories');
            const categories = ['A', 'B', 'C', 'D', 'E', 'F'];

            // Get current interaction scores
            const interactionKey = `${currentArchetype}_${selectedPartner}`;
            const interaction = data.interactions[interactionKey] || {};
            const scores = interaction.scores || {};

            const myArch = data.archetypes[currentArchetype];
            const partnerArch = data.archetypes[selectedPartner];
            const myName = myArch?.name || currentArchetype;
            const partnerName = partnerArch?.name || selectedPartner;

            // Show which combination is displayed
            const headerText = currentArchetype === selectedPartner
                ? `${myName} (Ich) mit ${myName}`
                : `${myName} (Ich) mit ${partnerName}`;

            container.innerHTML = `
                <div style="margin-bottom: 15px; padding: 10px; background: var(--bg-dark); border-radius: 10px; text-align: center;">
                    <span style="color: var(--text-muted); font-size: var(--font-sm);">Aktuelle Auswahl:</span>
                    <div style="color: var(--primary); font-weight: 600; font-size: var(--font-base);">${headerText}</div>
                </div>
            ` + categories.map(cat => {
                const catData = categoryDescriptions[cat] || {};
                const name = catData.name || categoryNames[cat] || cat;
                const desc = catData.description || 'Beschreibung nicht verfügbar';
                const value = scores[cat]?.value || 0;
                const scoreColor = getScoreColor(value);

                return `
                    <div class="legend-category-item" onclick="openSingleCategoryModal('${cat}')">
                        <div class="legend-category-letter">${cat}</div>
                        <div class="legend-category-content">
                            <div class="legend-category-name">${name}</div>
                            <div class="legend-category-desc">${desc}</div>
                        </div>
                        <div style="font-weight: 700; font-size: var(--font-md); color: ${scoreColor}; min-width: 50px; text-align: right;">${value}</div>
                    </div>
                `;
            }).join('');
        }


        // ═══════════════════════════════════════════════════════════════════════════
        // CATEGORY / MATCH / DEFINITION MODALS
        // NOTE: Moved to js/modals/categoryModal.js
        // Functions available via window.*:
        // - openCategoryModal, openSingleCategoryModal, navigateCategoryPrev/Next
        // - getCategoryModalContent, renderTagWithTooltip, switchTooltipType
        // - openTagTooltip, closeTagTooltip, closeCategoryModal
        // - openDefinitionModal, closeDefinitionModal, window.showArchetypeInfoByType
        // - navigateDefinition, navigateDefinitionToIndex, confirmDefinitionSelection
        // - openMatchModal, getMatchModalContent, toggleMatchModalView
        // - generateDynamicPro, generateDynamicContra, generateSynthesisSection
        // - window.getShortDef, openFeedbackModalWithContext
        // ═══════════════════════════════════════════════════════════════════════════

        // Local storage backup - alles in tiage_comments
        function saveLocalFeedback(entry) {
            const stored = JSON.parse(localStorage.getItem('tiage_comments') || '[]');
            entry.timestamp = new Date().toISOString();
            entry.Typ = 'comment';  // Einheitlicher Typ
            stored.unshift(entry);
            localStorage.setItem('tiage_comments', JSON.stringify(stored));
        }

        function getLocalFeedback() {
            return JSON.parse(localStorage.getItem('tiage_comments') || '[]');
        }

        // Load and display feedback
        async function loadFeedback() {
            const container = document.getElementById('feedbackList');

            try {
                if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL) {
                    // Try to load from Google Sheets
                    const response = await fetch(GOOGLE_SCRIPT_URL);
                    const serverData = await response.json();
                    feedbackData = serverData.reverse(); // Newest first
                } else {
                    // Use local data only
                    feedbackData = getLocalFeedback();
                }
            } catch (error) {
                console.error('Load feedback error:', error);
                // Fallback to local
                feedbackData = getLocalFeedback();
            }

            // Populate type filter dropdowns
            populateTypeFilters();
            renderFeedbackList();
        }

        // Populate type dropdowns for filters
        function populateTypeFilters() {
            const archetypes = Object.values(data?.archetypes || {});
            const myTypeSelect = document.getElementById('filterMyType');
            const partnerTypeSelect = document.getElementById('filterPartnerType');

            const options = archetypes.map(a =>
                `<option value="${a.id}">${a.name}</option>`
            ).join('');

            myTypeSelect.innerHTML = `<option value="all">Alle Typen</option>${options}`;
            partnerTypeSelect.innerHTML = `<option value="all">Alle Partner</option>${options}`;
        }

        function renderFeedbackList() {
            const container = document.getElementById('feedbackList');

            // Apply all filters
            let filtered = feedbackData.filter(f => {
                const kontextId = (f.KontextID || f.kontextId || '').toLowerCase();
                const name = (f.Name || f.name || '').toLowerCase();
                const titel = (f.Titel || f.titel || '').toLowerCase();
                const kommentar = (f.Kommentar || f.kommentar || '').toLowerCase();
                const antwortAuf = f.AntwortAuf || f.antwortAuf || '';

                // Skip replies in main list (they'll be shown as threads)
                if (antwortAuf) return false;

                // Search filter
                if (feedbackFilters.search) {
                    const search = feedbackFilters.search.toLowerCase();
                    if (!name.includes(search) && !titel.includes(search) && !kommentar.includes(search)) {
                        return false;
                    }
                }

                // Type filters (parse from context ID like "Single (Ich) mit Duo")
                if (feedbackFilters.myType !== 'all' || feedbackFilters.partnerType !== 'all') {
                    const myTypeName = data?.archetypes?.[feedbackFilters.myType]?.name?.toLowerCase();
                    const partnerTypeName = data?.archetypes?.[feedbackFilters.partnerType]?.name?.toLowerCase();

                    if (feedbackFilters.myType !== 'all' && myTypeName) {
                        if (!kontextId.includes(myTypeName)) return false;
                    }
                    if (feedbackFilters.partnerType !== 'all' && partnerTypeName) {
                        if (!kontextId.includes('mit ' + partnerTypeName)) return false;
                    }
                }

                // Category filter
                if (feedbackFilters.category !== 'all') {
                    const cat = feedbackFilters.category;
                    if (cat === 'TM') {
                        if (!kontextId.includes('top match')) return false;
                    } else if (cat === 'CH') {
                        if (!kontextId.includes('challenge')) return false;
                    } else {
                        // Category A-F: check for category name
                        const catName = categoryNames[cat]?.toLowerCase();
                        if (catName && !kontextId.includes(catName)) return false;
                    }
                }

                return true;
            });

            // Sort
            if (feedbackFilters.sort === 'oldest') {
                filtered = filtered.reverse();
            } else if (feedbackFilters.sort === 'rating') {
                filtered.sort((a, b) => {
                    const aRating = (a.Verstand || a.verstand || 0) + (a.Gefuehl || a.gefuehl || 0);
                    const bRating = (b.Verstand || b.verstand || 0) + (b.Gefuehl || b.gefuehl || 0);
                    return bRating - aRating;
                });
            }

            if (filtered.length === 0) {
                container.innerHTML = `
                    <div class="feedback-empty">
                        ${feedbackData.length === 0
                            ? TiageI18n.t('feedback.noFeedback', 'Noch kein Feedback vorhanden.<br>Sei der Erste!')
                            : TiageI18n.t('feedback.noFilterResults', 'Kein Feedback für diesen Filter.')}
                    </div>
                `;
                return;
            }

            container.innerHTML = filtered.map(f => renderFeedbackItem(f)).join('');
        }

        // Render single feedback item with replies
        function renderFeedbackItem(f, isReply = false) {
            const id = f.Id || f.id || f.timestamp || '';
            const kontextId = f.KontextID || f.kontextId || '-';
            const name = f.Name || f.name || 'Anonym';
            const titel = f.Titel || f.titel || '';
            const kommentar = f.Kommentar || f.kommentar || '';
            const verstand = f.Verstand || f.verstand || 0;
            const gefuehl = f.Gefuehl || f.gefuehl || 0;
            const timestamp = f.Timestamp || f.timestamp || '';

            // Find replies to this item
            const replies = feedbackData.filter(r =>
                (r.AntwortAuf || r.antwortAuf) === id
            );

            const timeStr = timestamp ? new Date(timestamp).toLocaleDateString('de-DE') : '';

            return `
                <div class="feedback-item ${isReply ? 'reply' : ''}" data-id="${id}">
                    <div class="feedback-item-header">
                        <span class="feedback-item-context">${kontextId}</span>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <span class="feedback-item-name">${name}</span>
                            ${timeStr ? `<span class="feedback-timestamp">${timeStr}</span>` : ''}
                        </div>
                    </div>
                    <div class="feedback-item-title">${titel}</div>
                    ${kommentar ? `<div class="feedback-item-comment">${kommentar}</div>` : ''}
                    <div class="feedback-item-footer">
                        <div class="feedback-item-ratings">
                            <div class="feedback-rating">
                                <span>Verstand:</span>
                                <span class="stars">${'★'.repeat(verstand)}${'☆'.repeat(5-verstand)}</span>
                            </div>
                            <div class="feedback-rating">
                                <span>Gefühl:</span>
                                <span class="stars">${'★'.repeat(gefuehl)}${'☆'.repeat(5-gefuehl)}</span>
                            </div>
                        </div>
                        <button class="feedback-reply-btn" onclick="openReplyModal('${id}', '${name}')">
                            ↩ Antworten
                        </button>
                    </div>
                    ${replies.length > 0 ? `
                        <div class="feedback-replies">
                            ${replies.map(r => renderFeedbackItem(r, true)).join('')}
                        </div>
                    ` : ''}
                </div>
            `;
        }

        // Open reply modal - uses commentModal (feedbackModal was removed)
        function openReplyModal(parentId, parentName) {
            replyToId = parentId;
            // Open comment modal for replies
            const modal = document.getElementById('commentModal');
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Reset form
                const nameInput = document.getElementById('commentName');
                const textInput = document.getElementById('commentText');
                if (nameInput) nameInput.value = '';
                if (textInput) {
                    textInput.value = '';
                    textInput.placeholder = TiageI18n.t('ui.replyTo', 'Antwort auf {name}...').replace('{name}', parentName);
                }
            }
        }

        // Initialize advanced filters
        function initAdvancedFilters() {
            // Search input
            document.getElementById('feedbackSearch').addEventListener('input', (e) => {
                feedbackFilters.search = e.target.value;
                renderFeedbackList();
            });

            // Type selects
            document.getElementById('filterMyType').addEventListener('change', (e) => {
                feedbackFilters.myType = e.target.value;
                renderFeedbackList();
            });

            document.getElementById('filterPartnerType').addEventListener('change', (e) => {
                feedbackFilters.partnerType = e.target.value;
                renderFeedbackList();
            });

            // Category buttons
            document.querySelectorAll('.cat-filter-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    document.querySelectorAll('.cat-filter-btn').forEach(b =>
                        b.classList.remove('active')
                    );
                    btn.classList.add('active');
                    feedbackFilters.category = btn.dataset.cat;
                    renderFeedbackList();
                });
            });

            // Sort select
            document.getElementById('filterSort').addEventListener('change', (e) => {
                feedbackFilters.sort = e.target.value;
                renderFeedbackList();
            });
        }

        // Initialize feedback system
        function initFeedbackSystem() {
            initStarRatings();
            initAdvancedFilters();
        }

        // Age Verification - Modal shows once per session (uses sessionStorage)
        function checkAgeVerification() {
            // Check if user already verified age in this session
            try {
                if (sessionStorage.getItem('tiage_age_verified') === 'true') {
                    // Already verified in this session, don't show modal
                    const modal = document.getElementById('ageVerificationModal');
                    if (modal) {
                        modal.classList.add('hidden');
                        modal.style.display = 'none';
                    }
                    return;
                }
            } catch(e) {
                console.warn('Could not check sessionStorage:', e);
            }

            // Show modal for age verification
            const modal = document.getElementById('ageVerificationModal');
            if (modal) {
                modal.classList.remove('hidden');
                modal.style.display = 'flex';
                modal.style.visibility = 'visible';
                modal.style.opacity = '1';
                modal.style.pointerEvents = 'auto';
                document.body.style.overflow = 'hidden';
            }
        }

        // confirmAge - hoisted function declaration ensures availability even if script
        // partially fails (prevents infinite recursion from wrapper pattern)
        function confirmAge(isAdult) {
            console.log('confirmAge called with:', isAdult);

            if (isAdult) {
                // Save age verification for this session (prevents showing on back navigation)
                try {
                    sessionStorage.setItem('tiage_age_verified', 'true');
                } catch(e) {
                    console.warn('Could not save session age verification:', e);
                }

                // Automatically save cookie consent when user confirms age
                try {
                    localStorage.setItem('tiage_cookie_consent', 'true');
                    localStorage.setItem('tiage_cookie_consent_timestamp', new Date().toISOString());
                } catch(e) {
                    console.warn('Could not save cookie consent:', e);
                }

                // Hide modal
                var modal = document.getElementById('ageVerificationModal');
                if (modal) {
                    modal.classList.add('hidden');
                    modal.style.display = 'none';
                }
                document.body.style.overflow = 'auto';
            } else {
                window.location.href = 'https://www.google.com';
            }
        }
        window.confirmAge = confirmAge;

        // Initialize age verification - robust version with multiple fallbacks
        function initAgeVerification() {
            const modal = document.getElementById('ageVerificationModal');
            const yesButton = document.getElementById('ageVerifyYes');
            const noButton = document.getElementById('ageVerifyNo');

            // Helper function to handle age confirmation - uses sessionStorage
            function handleAgeConfirm(isAdult, event) {
                if (event) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                console.log('handleAgeConfirm called:', isAdult);

                if (isAdult) {
                    // Save age verification for this session (prevents showing on back navigation)
                    try {
                        sessionStorage.setItem('tiage_age_verified', 'true');
                    } catch(e) {
                        console.warn('Could not save session age verification:', e);
                    }

                    if (modal) {
                        modal.classList.add('hidden');
                        modal.style.display = 'none';
                        modal.style.visibility = 'hidden';
                        modal.style.opacity = '0';
                        modal.style.pointerEvents = 'none';
                    }
                    document.body.style.overflow = 'auto';

                    // Check for pending openComments navigation after age verification
                    const urlParams = new URLSearchParams(window.location.search);
                    if (urlParams.get('openComments') === '1') {
                        // Remove openComments parameter from URL to prevent loop on back-navigation
                        urlParams.delete('openComments');
                        const cleanUrl = urlParams.toString()
                            ? `${window.location.pathname}?${urlParams.toString()}${window.location.hash}`
                            : `${window.location.pathname}${window.location.hash}`;
                        history.replaceState(null, '', cleanUrl);

                        setTimeout(() => {
                            if (typeof openCommentsListModal === 'function') {
                                openCommentsListModal();
                            }
                        }, 100);
                    }
                } else {
                    window.location.href = 'https://www.google.com';
                }
            }

            // Add event listeners to YES button
            if (yesButton) {
                yesButton.style.pointerEvents = 'auto';
                yesButton.style.cursor = 'pointer';
                yesButton.style.position = 'relative';
                yesButton.style.zIndex = '10002';

                // Remove old onclick to prevent double-firing
                yesButton.removeAttribute('onclick');

                // Add multiple event types for maximum compatibility
                yesButton.addEventListener('click', function(e) {
                    handleAgeConfirm(true, e);
                }, { passive: false, capture: true });

                yesButton.addEventListener('touchend', function(e) {
                    handleAgeConfirm(true, e);
                }, { passive: false, capture: true });

                // Also handle mousedown as fallback
                yesButton.addEventListener('mousedown', function(e) {
                    handleAgeConfirm(true, e);
                }, { passive: false, capture: true });
            }

            // Add event listeners to NO button
            if (noButton) {
                noButton.style.pointerEvents = 'auto';
                noButton.style.cursor = 'pointer';
                noButton.style.position = 'relative';
                noButton.style.zIndex = '10002';

                // Remove old onclick
                noButton.removeAttribute('onclick');

                noButton.addEventListener('click', function(e) {
                    handleAgeConfirm(false, e);
                }, { passive: false, capture: true });

                noButton.addEventListener('touchend', function(e) {
                    handleAgeConfirm(false, e);
                }, { passive: false, capture: true });
            }

            // Check if already verified in this session before showing modal
            try {
                if (sessionStorage.getItem('tiage_age_verified') === 'true') {
                    // Already verified, hide modal
                    if (modal) {
                        modal.classList.add('hidden');
                        modal.style.display = 'none';
                    }
                    return;
                }
            } catch(e) {
                console.warn('Could not check sessionStorage:', e);
            }

            // Show modal on page load if not verified
            if (modal) {
                modal.classList.remove('hidden');
                modal.style.display = 'flex';
                modal.style.visibility = 'visible';
                modal.style.opacity = '1';
                modal.style.pointerEvents = 'auto';
                document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
            }
        }

        // ========================================
        // Extended Dimensions Functions
        // ========================================

        function showDimensionTooltip(type) {
            // Try to get translated tooltip first, fall back to hardcoded
            let tooltip = TiageI18n.t(`tooltips.${type}`);
            if (!tooltip || typeof tooltip !== 'object' || !tooltip.title) {
                tooltip = dimensionTooltips[type];
            }
            if (!tooltip) return;

            document.getElementById('dimensionTooltipTitle').textContent = tooltip.title;
            document.getElementById('dimensionTooltipText').innerHTML = tooltip.text.replace(/\n/g, '<br>');
            document.getElementById('dimensionTooltipOverlay').classList.add('active');
        }

        function closeDimensionTooltip() {
            document.getElementById('dimensionTooltipOverlay').classList.remove('active');
        }

        // ========================================
        // Geschlecht Info Modal Functions
        // ========================================
        function showGeschlechtInfoModal() {
            document.getElementById('geschlechtInfoModal').classList.add('active');
        }

        function closeGeschlechtInfoModal() {
            document.getElementById('geschlechtInfoModal').classList.remove('active');
        }

        // ========================================
        // Dominanz Info Modal Functions
        // ========================================
        function showDominanzInfoModal() {
            document.getElementById('dominanzInfoModal').classList.add('active');
        }

        function closeDominanzInfoModal() {
            document.getElementById('dominanzInfoModal').classList.remove('active');
        }

        // ========================================
        // Orientierung Info Modal Functions
        // ========================================
        function showOrientierungInfoModal() {
            document.getElementById('orientierungInfoModal').classList.add('active');
        }

        function closeOrientierungInfoModal() {
            document.getElementById('orientierungInfoModal').classList.remove('active');
        }

        // ========================================
        // Body & Soul Info Modal Functions
        // ========================================
        function showBodySoulModal() {
            document.getElementById('bodySoulModal').classList.add('active');
        }

        function closeBodySoulModal() {
            document.getElementById('bodySoulModal').classList.remove('active');
        }

        // ═══════════════════════════════════════════════════════════════════════
        // GESCHLECHT PRIMARY/SECONDARY SYSTEM
        // ═══════════════════════════════════════════════════════════════════════

        /**
         * Handle click on geschlecht button
         * v4.0: Geschlecht ist jetzt ein einfacher String (mann, frau, nonbinaer)
         */
        function handleGeschlechtPClick(person, value, btn) {
            // console.log('[TIAGE] handleGeschlechtPClick (v4.0):', person, value);

            // v4.0: Geschlecht als einfacher String
            const currentGeschlecht = personDimensions[person].geschlecht;

            if (value === currentGeschlecht) {
                // Click on same: Deselect
                personDimensions[person].geschlecht = null;
                TiageToast.info(TiageI18n.t('geschlecht.' + value, value) + ' deselektiert');
            } else {
                // Click on different: Set new value
                personDimensions[person].geschlecht = value;
                TiageToast.info(TiageI18n.t('geschlecht.' + value, value) + ' gesetzt');
            }

            // v4.0: Kein S-Grid mehr nötig - verstecken falls noch sichtbar
            const sRow = document.getElementById(`${person}-geschlecht-s-row`);
            if (sRow) sRow.style.display = 'none';

            // Sync and save
            syncGeschlechtState(person);
            syncGeschlechtUI(person);
            updateGeschlechtNeedsSelection(person);

            // ═══════════════════════════════════════════════════════════════════════════
            // FIX: Resonanzfaktoren bei Geschlecht-Wechsel neu berechnen
            // R4 (Identität) hängt vom Geschlecht ab und muss aktualisiert werden
            // ═══════════════════════════════════════════════════════════════════════════
            if (typeof ResonanzCard !== 'undefined' && typeof ResonanzCard.loadCalculatedValues === 'function') {
                const personArchetyp = person === 'ich' ? currentArchetype : selectedPartner;
                let needs = null;

                const flatNeeds = window.LoadedArchetypProfile?.[person]?.profileReview?.flatNeeds;
                if (flatNeeds) {
                    needs = {};
                    if (Array.isArray(flatNeeds)) {
                        flatNeeds.forEach(n => {
                            if (n.id) needs[n.id] = n.value;
                            if (n.stringKey) needs[n.stringKey] = n.value;
                        });
                    } else {
                        for (const key in flatNeeds) {
                            if (flatNeeds.hasOwnProperty(key)) {
                                const entry = flatNeeds[key];
                                needs[key] = (typeof entry === 'object' && entry.value !== undefined) ? entry.value : entry;
                            }
                        }
                    }
                }

                if (!needs || Object.keys(needs).length === 0) {
                    if (typeof GfkBeduerfnisse !== 'undefined' &&
                        GfkBeduerfnisse.archetypProfile && GfkBeduerfnisse.archetypProfile[personArchetyp]) {
                        needs = GfkBeduerfnisse.archetypProfile[personArchetyp].umfrageWerte || {};
                    }
                }

                const resonanzProfileContext = {
                    archetyp: personArchetyp,
                    needs: needs,
                    dominanz: personDimensions[person]?.dominanz || null,
                    orientierung: personDimensions[person]?.orientierung || null,
                    geschlecht: personDimensions[person]?.geschlecht || null
                };

                if (resonanzProfileContext.needs && Object.keys(resonanzProfileContext.needs).length > 0) {
                    ResonanzCard.loadCalculatedValues(resonanzProfileContext, person);
                }
            }

            updateComparisonView();

            if (typeof saveSelectionToStorage === 'function') {
                saveSelectionToStorage();
            }
        }

        /**
         * Handle click on S (Identität) geschlecht button
         * S = Secondary = Identität (kontextabhängig von P)
         */
        function handleGeschlechtSClick(person, value, btn) {
            // console.log('[TIAGE] handleGeschlechtSClick:', person, value);

            // Ensure geschlecht has correct structure
            if (!personDimensions[person].geschlecht) {
                personDimensions[person].geschlecht = { primary: null, secondary: null };
            }

            const currentSecondary = personDimensions[person].geschlecht.secondary;

            if (value === currentSecondary) {
                // Click on same S: Deselect S
                personDimensions[person].geschlecht.secondary = null;
            } else {
                // Click on different S: Set new S
                personDimensions[person].geschlecht.secondary = value;
            }

            // Sync and save
            syncGeschlechtState(person);
            syncGeschlechtUI(person);

            // ═══════════════════════════════════════════════════════════════════════════
            // FIX: Resonanzfaktoren bei Geschlecht-Wechsel neu berechnen
            // R4 (Identität) hängt vom Geschlecht ab und muss aktualisiert werden
            // ═══════════════════════════════════════════════════════════════════════════
            if (typeof ResonanzCard !== 'undefined' && typeof ResonanzCard.loadCalculatedValues === 'function') {
                const personArchetyp = person === 'ich' ? currentArchetype : selectedPartner;
                let needs = null;

                const flatNeeds = window.LoadedArchetypProfile?.[person]?.profileReview?.flatNeeds;
                if (flatNeeds) {
                    needs = {};
                    if (Array.isArray(flatNeeds)) {
                        flatNeeds.forEach(n => {
                            if (n.id) needs[n.id] = n.value;
                            if (n.stringKey) needs[n.stringKey] = n.value;
                        });
                    } else {
                        for (const key in flatNeeds) {
                            if (flatNeeds.hasOwnProperty(key)) {
                                const entry = flatNeeds[key];
                                needs[key] = (typeof entry === 'object' && entry.value !== undefined) ? entry.value : entry;
                            }
                        }
                    }
                }

                if (!needs || Object.keys(needs).length === 0) {
                    if (typeof GfkBeduerfnisse !== 'undefined' &&
                        GfkBeduerfnisse.archetypProfile && GfkBeduerfnisse.archetypProfile[personArchetyp]) {
                        needs = GfkBeduerfnisse.archetypProfile[personArchetyp].umfrageWerte || {};
                    }
                }

                const resonanzProfileContext = {
                    archetyp: personArchetyp,
                    needs: needs,
                    dominanz: personDimensions[person]?.dominanz || null,
                    orientierung: personDimensions[person]?.orientierung || null,
                    geschlecht: personDimensions[person]?.geschlecht || null
                };

                if (resonanzProfileContext.needs && Object.keys(resonanzProfileContext.needs).length > 0) {
                    ResonanzCard.loadCalculatedValues(resonanzProfileContext, person);
                }
            }

            updateComparisonView();

            if (typeof saveSelectionToStorage === 'function') {
                saveSelectionToStorage();
            }
        }

        /**
         * Handle click on Geschlecht Extras button (Fit / Fucked up)
         * Multi-Select: Both can be active simultaneously
         * @param {string} person - 'ich' or 'partner'
         * @param {string} value - 'fit' or 'fuckedup'
         * @param {string} stateKey - State key: 'geschlecht_fit' or 'geschlecht_fuckedup'
         * @param {HTMLElement} btn - The clicked button
         */
        // Local cache for geschlecht_extras (avoids TiageState subscriber race conditions)
        const geschlechtExtrasCache = {
            ich: { fit: false, fuckedup: false, horny: false },
            partner: { fit: false, fuckedup: false, horny: false }
        };

        function handleGeschlechtExtrasClick(person, value, stateKey, btn) {
            console.log('[TIAGE] handleGeschlechtExtrasClick:', person, value, stateKey);

            // Use local cache (avoids TiageState subscriber issues)
            const currentExtras = geschlechtExtrasCache[person];

            // Toggle the clicked value (multi-select)
            currentExtras[value] = !currentExtras[value];

            // Toast
            const ffhLabels = { fit: 'Fit 💪', fuckedup: 'Fucked up 🔥', horny: 'Horny 😈' };
            const ffhDescs = {
                fit: TiageI18n.t('ffh.fitDesc', 'Sport und körperliche Fitness fließen in die Berechnung ein.'),
                fuckedup: TiageI18n.t('ffh.fuckedupDesc', 'Unkonventioneller Lebensstil fließt in die Berechnung ein.'),
                horny: TiageI18n.t('ffh.hornyDesc', 'Sexualität als Faktor fließt in die Berechnung ein.')
            };
            if (currentExtras[value]) {
                TiageToast.info(ffhLabels[value] + ' aktiviert — ' + ffhDescs[value]);
            } else {
                TiageToast.info(ffhLabels[value] + ' deaktiviert');
            }

            console.log('[TIAGE] geschlecht_extras updated:', person, JSON.stringify(currentExtras));

            // Save to TiageState for persistence
            if (typeof TiageState !== 'undefined') {
                const extrasToSave = { ...currentExtras };
                TiageState.set(`personDimensions.${person}.geschlecht_extras`, extrasToSave);
                // FIX v1.8.902: Explicit saveToStorage to ensure FFH settings persist
                TiageState.saveToStorage();
                console.log('[TIAGE] FFH saved to TiageState:', person, JSON.stringify(extrasToSave));
            }

            // Update UI directly using the cache
            syncGeschlechtExtrasUI(person);

            // v4.3: Score und R-Faktoren neu berechnen (wie Orientierung/Dominanz)
            updateComparisonView();

            // Also save selection (includes geschlecht_extras in selection.ich/partner)
            if (typeof saveSelectionToStorage === 'function') {
                saveSelectionToStorage();
            }
        }

        /**
         * Sync Geschlecht Extras UI buttons with state
         * @param {string} person - 'ich' or 'partner'
         */
        function syncGeschlechtExtrasUI(person) {
            // SSOT: Zuerst aus TiageState lesen, dann Cache aktualisieren
            const stateExtras = TiageState.get('personDimensions.' + person + '.geschlecht_extras');
            if (stateExtras && typeof stateExtras === 'object') {
                geschlechtExtrasCache[person] = {
                    fit: !!stateExtras.fit,
                    fuckedup: !!stateExtras.fuckedup,
                    horny: !!stateExtras.horny
                };
            }
            const extras = geschlechtExtrasCache[person] || { fit: false, fuckedup: false, horny: false };

            // console.log('[TIAGE] syncGeschlechtExtrasUI:', person, extras);

            // All grids for this person
            const selectors = [
                `#${person}-geschlecht-extras-grid .geschlecht-btn`,
                `#mobile-${person}-geschlecht-extras-grid .geschlecht-btn`
            ];

            selectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(btn => {
                    const value = btn.dataset.value;
                    const isActive = extras[value] === true;
                    // console.log('[TIAGE] Button sync:', value, isActive);
                    if (isActive) {
                        btn.classList.add('active');
                        // Apply inline styles for immediate visual feedback
                        btn.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
                        btn.style.borderColor = '#8b5cf6';
                        btn.style.color = 'white';
                        btn.style.opacity = '1';
                    } else {
                        btn.classList.remove('active');
                        // Reset inline styles
                        btn.style.background = '';
                        btn.style.borderColor = '';
                        btn.style.color = '';
                        btn.style.opacity = '';
                    }
                });
            });
        }

        /**
         * Update S-Grid options based on P selection
         * P = Mann/Frau → S = Cis, Trans, Nonbinär
         * P = Inter → S = Nonbinär, Fluid
         */
        function updateGeschlechtSGrid(person) {
            const primary = personDimensions[person].geschlecht?.primary;

            // Desktop S-Grid
            const sRow = document.getElementById(`${person}-geschlecht-s-row`);
            const sGrid = document.getElementById(`${person}-geschlecht-s-grid`);

            // Mobile S-Grid
            const mobileSRow = document.getElementById(`mobile-${person}-geschlecht-s-row`);
            const mobileSGrid = document.getElementById(`mobile-${person}-geschlecht-s-grid`);

            // Helper to update a single S grid
            function updateSingleSGrid(row, grid) {
                if (!row || !grid) return;

                if (!primary) {
                    // No P selected: hide S row
                    row.style.display = 'none';
                    grid.innerHTML = '';
                    return;
                }

                // Show S row
                row.style.display = 'block';

                // Get S options based on P
                let sOptions;
                if (primary === 'inter') {
                    sOptions = [
                        { value: 'nonbinaer', label: TiageI18n.t('geschlecht.secondary.nonbinaer', 'Nonbinär') },
                        { value: 'fluid', label: TiageI18n.t('geschlecht.secondary.fluid', 'Fluid') }
                    ];
                } else {
                    // Mann or Frau: Cis, Trans, Nonbinär (3 options - matches profile-config.js)
                    sOptions = [
                        { value: 'cis', label: TiageI18n.t('geschlecht.secondary.cis', 'Cis') },
                        { value: 'trans', label: TiageI18n.t('geschlecht.secondary.trans', 'Trans') },
                        { value: 'nonbinaer', label: TiageI18n.t('geschlecht.secondary.nonbinaer', 'Nonbinär') }
                    ];
                }

                // Populate S grid (include secondary-selected class if already selected)
                const currentSecondary = personDimensions[person].geschlecht?.secondary;
                grid.innerHTML = sOptions.map(opt => {
                    const isSelected = opt.value === currentSecondary;
                    const selectedClass = isSelected ? ' secondary-selected' : '';
                    const secTitle = TiageI18n.t('ui.identitySecondary', 'Identität (Sekundär)');
                    return `<button type="button" class="geschlecht-btn geschlecht-s-btn${selectedClass}" data-value="${opt.value}" onclick="handleGeschlechtSClick('${person}', '${opt.value}', this)">${opt.label}${isSelected ? `<span class="geschlecht-indicator indicator-secondary" title="${secTitle}">S</span>` : ''}</button>`;
                }).join('');
            }

            // Update Desktop S-Grid
            updateSingleSGrid(sRow, sGrid);

            // Update Mobile S-Grid
            updateSingleSGrid(mobileSRow, mobileSGrid);
        }

        /**
         * Sync geschlecht state with mobile/TiageState
         * v4.0: Geschlecht ist jetzt ein einfacher String
         */
        function syncGeschlechtState(person) {
            // v4.0: Geschlecht als String
            const geschlecht = personDimensions[person].geschlecht;

            // Sync with mobilePersonDimensions (für Legacy-Kompatibilität)
            if (typeof mobilePersonDimensions !== 'undefined') {
                mobilePersonDimensions[person].geschlecht = geschlecht;
            }

            // Sync with TiageState
            if (typeof TiageState !== 'undefined') {
                TiageState.set(`personDimensions.${person}.geschlecht`, geschlecht);
            }
        }

        /**
         * Update needs-selection class for geschlecht
         * v4.0: Prüft ob Geschlecht als String gesetzt ist
         */
        function updateGeschlechtNeedsSelection(person) {
            // v4.0: Geschlecht ist String, nicht Object
            const geschlecht = personDimensions[person].geschlecht;
            const hasGeschlecht = geschlecht !== null && geschlecht !== undefined;
            document.querySelectorAll(`[data-dimension="${person}-geschlecht-multi"], [data-dimension="mobile-${person}-geschlecht"], [data-dimension="mobile-${person}-geschlecht-multi"], [data-dimension="${person}-geschlecht"]`).forEach(dim => {
                if (hasGeschlecht) {
                    dim.classList.remove('needs-selection');
                } else {
                    dim.classList.add('needs-selection');
                }
            });
        }

        // Legacy aliases for backwards compatibility
        function handleGeschlechtClick(person, value, btn) {
            handleGeschlechtPClick(person, value, btn);
        }
        function handleGeschlechtPrimaryClick(person, value, btn) {
            handleGeschlechtPClick(person, value, btn);
        }
        function handleGeschlechtSecondaryClick(person, value, btn) {
            handleGeschlechtSClick(person, value, btn);
        }

        /**
         * Sync Geschlecht UI across all views (Desktop, Mobile, Modal)
         * v4.0: Geschlecht als einfacher String (kein P/S System mehr)
         */
        function syncGeschlechtUI(person) {
            // v4.0: Geschlecht als String
            const geschlecht = personDimensions[person].geschlecht;

            // Update Geschlecht buttons - Desktop and Mobile
            const gridSelectors = [
                `#${person}-geschlecht-p-grid .geschlecht-btn`,
                `#mobile-${person}-geschlecht-p-grid .geschlecht-btn`,
                `#mobile-${person}-geschlecht-grid .geschlecht-btn`,
                `#modal-${person}-geschlecht-grid .geschlecht-btn`
            ];
            gridSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(btn => {
                    const value = btn.dataset.value;
                    btn.classList.remove('primary-selected', 'primary-strikethrough', 'secondary-selected', 'selected');

                    // Remove existing indicators
                    const existingIndicator = btn.querySelector('.geschlecht-indicator');
                    if (existingIndicator) existingIndicator.remove();

                    if (value === geschlecht) {
                        btn.classList.add('selected', 'primary-selected');
                    }
                });
            });

            // v4.0: S-Grid verstecken (nicht mehr benötigt)
            const sRow = document.getElementById(`${person}-geschlecht-s-row`);
            if (sRow) sRow.style.display = 'none';

            // LEGACY: S-Grid buttons leeren
            const sGridSelectors = [
                `#${person}-geschlecht-s-grid .geschlecht-btn`,
                `#mobile-${person}-geschlecht-s-grid .geschlecht-btn`
            ];
            sGridSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(btn => {
                    btn.classList.remove('secondary-selected');
                });
            });

            // Legacy: Update old combined grids (mobile etc.)
            const legacySelectors = [
                `#mobile-${person}-geschlecht-grid .geschlecht-btn`,
                `#modal-${person}-geschlecht-grid .geschlecht-btn`
            ];

            legacySelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(btn => {
                    const value = btn.dataset.value;
                    btn.classList.remove('primary-selected', 'secondary-selected', 'primary-strikethrough');

                    const existingIndicator = btn.querySelector('.geschlecht-indicator');
                    if (existingIndicator) existingIndicator.remove();

                    // v4.0: Geschlecht ist jetzt ein einfacher String, kein P/S System
                    if (value === geschlecht) {
                        btn.classList.add('primary-selected');
                    }
                });
            });

            // Also sync legacy radio buttons if they exist
            document.querySelectorAll(`input[name="${person}-geschlecht"]`).forEach(radio => {
                radio.checked = (radio.value === geschlecht);
            });
            document.querySelectorAll(`input[name="mobile-${person}-geschlecht"]`).forEach(radio => {
                radio.checked = (radio.value === geschlecht);
            });

            // Ensure S-Grid visibility is correct
            updateGeschlechtSGrid(person);

            // Update collapsed summary for geschlecht
            updateGeschlechtSummary(person);
        }

        /**
         * Update secondary geschlecht from external source (e.g., Profile Review Modal)
         * Syncs personDimensions with the new value and updates UI
         * @param {string} person - 'ich' or 'partner'
         * @param {string} secondaryValue - New secondary value ('mann', 'frau', 'nonbinaer', 'fluid', 'suchend')
         */
        function setSecondaryGeschlechtAndSync(person, secondaryValue) {
            if (!personDimensions[person].geschlecht) {
                personDimensions[person].geschlecht = { primary: null, secondary: null };
            }
            personDimensions[person].geschlecht.secondary = secondaryValue;

            // Sync to TiageState
            if (typeof TiageState !== 'undefined') {
                TiageState.set(`personDimensions.${person}.geschlecht.secondary`, secondaryValue);
            }

            // Update UI
            syncGeschlechtUI(person);

            console.log('[Geschlecht] Secondary updated and synced:', person, '→', secondaryValue);
        }
        window.setSecondaryGeschlechtAndSync = setSecondaryGeschlechtAndSync;

        /**
         * Get summary text for geschlecht selection
         */
        function getGeschlechtSummary(person) {
            // v4.0: geschlecht is a simple string, not an object with .primary/.secondary
            const geschlecht = personDimensions[person].geschlecht;
            const primary = typeof geschlecht === 'string' ? geschlecht : (geschlecht?.primary || null);

            if (!primary) {
                return 'Geschlecht fehlt';
            }

            const primaryLabel = TiageI18n.t(`geschlecht.types.${primary}`, primary);
            return '✓ ' + primaryLabel + ' (P)';
        }

        /**
         * Get summary text for geschlecht selection in grid (without 'fehlt' text)
         * Returns selected values in green, or empty string if nothing selected
         */
        function getGeschlechtGridSummary(person) {
            // v4.0: geschlecht is a simple string, not an object with .primary/.secondary
            const geschlecht = personDimensions[person].geschlecht;
            const primary = typeof geschlecht === 'string' ? geschlecht : (geschlecht?.primary || null);

            if (!primary) {
                return ''; // No 'fehlt' text for grid - only show selections
            }

            const primaryLabel = TiageI18n.t(`geschlecht.types.${primary}`, primary);
            return '✓ ' + primaryLabel + ' (P)';
        }

        /**
         * Update header summary for geschlecht (only in header area, not in collapsed-summary)
         */
        function updateGeschlechtSummary(person) {
            const summaryText = getGeschlechtSummary(person);
            const gridSummaryText = getGeschlechtGridSummary(person);
            // v4.0: geschlecht is a simple string, not an object with .primary
            const geschlecht = personDimensions[person].geschlecht;
            const primary = typeof geschlecht === 'string' ? geschlecht : (geschlecht?.primary || null);
            const isMissing = !primary;

            // Update header element (shows 'fehlt' if nothing selected) - Desktop and Mobile
            ['', 'mobile-'].forEach(prefix => {
                const headerId = `${prefix}${person}-header-geschlecht`;
                const header = document.getElementById(headerId);
                if (header) {
                    header.textContent = summaryText;
                    header.classList.toggle('missing', isMissing);
                }
            });

            // Update grid collapsed-summary (only shows selections in green, no 'fehlt')
            ['', 'mobile-'].forEach(prefix => {
                const summaryId = `${prefix}${person}-geschlecht-summary`;
                const summary = document.getElementById(summaryId);
                if (summary) {
                    summary.innerHTML = gridSummaryText;
                    summary.classList.toggle('has-selection', !isMissing);
                }
            });
        }

        /**
         * Check if geschlecht has any selection (primary)
         */
        function hasGeschlechtSelected(person) {
            // v4.0: geschlecht is a simple string, not an object with .primary
            const geschlecht = personDimensions[person].geschlecht;
            const primary = typeof geschlecht === 'string' ? geschlecht : (geschlecht?.primary || null);
            return primary !== null;
        }

        /**
         * Handle hover on geschlecht button - highlight I or G in legend
         * Based on click logic: if no primary -> next click sets I, if primary exists -> next click sets G
         */
        function handleGeschlechtHover(person, geschlechtValue, isEntering) {
            const legendSelectors = [
                `#${person}-geschlecht-legend`,
                `#mobile-${person}-geschlecht-legend`
            ];

            legendSelectors.forEach(selector => {
                const legend = document.querySelector(selector);
                if (!legend) return;

                if (!isEntering) {
                    // Mouse left - remove all highlights
                    legend.classList.remove('highlight-p', 'highlight-s');
                    return;
                }

                // Mouse entered - determine which to highlight based on click logic
                const geschlechtObj = personDimensions[person].geschlecht;
                const currentPrimary = geschlechtObj ? geschlechtObj.primary : null;
                const currentSecondary = geschlechtObj ? geschlechtObj.secondary : null;

                legend.classList.remove('highlight-p', 'highlight-s');

                if (geschlechtValue === currentPrimary || geschlechtValue === currentSecondary) {
                    // Hovering over already selected - highlight what would be affected
                    if (geschlechtValue === currentPrimary) {
                        legend.classList.add('highlight-p');
                    } else {
                        legend.classList.add('highlight-s');
                    }
                } else if (currentPrimary === null) {
                    // No primary yet: next click sets primary (P)
                    legend.classList.add('highlight-p');
                } else {
                    // Primary exists, different value: next click sets secondary (S)
                    legend.classList.add('highlight-s');
                }
            });
        }

        // ═══════════════════════════════════════════════════════════════════════
        // DYNAMISCHE BUTTON-GENERIERUNG (Harmonisierung Desktop/Mobile/Modal)
        // ═══════════════════════════════════════════════════════════════════════

        /**
         * Initialisiert alle Dimension-Buttons dynamisch
         * Ersetzt statische HTML-Buttons durch dynamisch generierte
         */
        function initDimensionButtons() {
            // console.log('[TIAGE DEBUG] initDimensionButtons called');

            // v4.0: Geschlecht als einfacher String (kein Primary/Secondary mehr)
            const geschlechtPOptions = [
                { value: 'mann', label: TiageI18n.t('geschlecht.primary.mann', 'Mann') },
                { value: 'frau', label: TiageI18n.t('geschlecht.primary.frau', 'Frau') },
                { value: 'nonbinaer', label: TiageI18n.t('geschlecht.primary.nonbinaer', 'Nonbinär') }
            ];

            // LEGACY: S-Optionen bleiben für eventuelle Rückwärtskompatibilität
            // Für P = Mann/Frau: Cis, Trans, Nonbinär (3 options - matches profile-config.js)
            const geschlechtSOptionsMannFrau = [
                { value: 'cis', label: TiageI18n.t('geschlecht.secondary.cis', 'Cis') },
                { value: 'trans', label: TiageI18n.t('geschlecht.secondary.trans', 'Trans') },
                { value: 'nonbinaer', label: TiageI18n.t('geschlecht.secondary.nonbinaer', 'Nonbinär') }
            ];
            // Für P = Inter: Nonbinär, Fluid (2 options)
            const geschlechtSOptionsInter = [
                { value: 'nonbinaer', label: TiageI18n.t('geschlecht.secondary.nonbinaer', 'Nonbinär') },
                { value: 'fluid', label: TiageI18n.t('geschlecht.secondary.fluid', 'Fluid') }
            ];

            // Dominanz Optionen
            const dominanzOptions = [
                { value: 'dominant', label: 'dominant' },
                { value: 'submissiv', label: 'submissiv' },
                { value: 'switch', label: 'switch' },
                { value: 'ausgeglichen', label: 'ausgeglichen' }
            ];

            // v5.0 SSOT: Orientierung als Multi-Select Array (5 Optionen)
            // Konsistent mit TiageSynthesis.Constants.ORIENTIERUNG_OPTIONS.ALL
            const orientierungOptions = [
                { value: 'heterosexuell', label: 'Hetero' },
                { value: 'homosexuell', label: 'Homo' },
                { value: 'bisexuell', label: 'Bi' },
                { value: 'pansexuell', label: 'Pan' },
                { value: 'queer', label: 'Queer' }
            ];

            // GFK Optionen (Gewaltfreie Kommunikation / NVC)
            const gfkOptions = [
                { value: 'niedrig', label: TiageI18n.t('dimensions.gfkLevels.niedrig', 'niedrig') },
                { value: 'mittel', label: TiageI18n.t('dimensions.gfkLevels.mittel', 'mittel') },
                { value: 'hoch', label: TiageI18n.t('dimensions.gfkLevels.hoch', 'hoch') }
            ];

            // Geschlecht Extras Optionen (Fit / Fucked up / Horny) - Multi-Select
            const geschlechtExtrasOptions = [
                { value: 'fit', label: 'Fit 💪', stateKey: 'geschlecht_fit', descKey: 'ffh.fitDesc', desc: TiageI18n.t('ffh.fitDesc', 'Sport und körperliche Fitness sind dir wichtig.') },
                { value: 'fuckedup', label: 'Fucked up 🔥', stateKey: 'geschlecht_fuckedup', descKey: 'ffh.fuckedupDesc', desc: TiageI18n.t('ffh.fuckedupDesc', 'Du hast einen unkonventionellen oder intensiven Lebensstil.') },
                { value: 'horny', label: 'Horny 😈', stateKey: 'geschlecht_horny', descKey: 'ffh.hornyDesc', desc: TiageI18n.t('ffh.hornyDesc', 'Sexualität spielt eine wichtige Rolle in deinem Leben.') }
            ];

            // Geschlecht P-Grids befüllen (Körper: Mann, Frau, Inter)
            // Use both class selector and explicit IDs as fallback (including mobile)
            const pGridSelectors = ['.geschlecht-p-grid', '#ich-geschlecht-p-grid', '#partner-geschlecht-p-grid', '#mobile-ich-geschlecht-p-grid', '#mobile-partner-geschlecht-p-grid'];
            const processedPGrids = new Set();
            pGridSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(grid => {
                    if (processedPGrids.has(grid.id)) return;
                    processedPGrids.add(grid.id);
                    const person = grid.dataset.person;
                    // console.log('[TIAGE DEBUG] Processing p-grid for person:', person, 'id:', grid.id);
                    if (!person) return;
                    grid.innerHTML = geschlechtPOptions.map(opt =>
                        `<button type="button" class="geschlecht-btn geschlecht-p-btn" data-value="${opt.value}" onclick="handleGeschlechtPClick('${person}', '${opt.value}', this)">${opt.label}</button>`
                    ).join('');
                });
            });
            // console.log('[TIAGE DEBUG] Processed geschlecht-p-grids:', processedPGrids.size);

            // Mobile und Modal Geschlecht-Grids befüllen (kombiniertes P/S Grid)
            const mobileModalGrids = document.querySelectorAll('#mobile-ich-geschlecht-grid, #mobile-partner-geschlecht-grid, #modal-ich-geschlecht-grid, #modal-partner-geschlecht-grid');
            // console.log('[TIAGE DEBUG] Found mobile/modal geschlecht-grids:', mobileModalGrids.length);
            mobileModalGrids.forEach(grid => {
                const person = grid.dataset.person;
                if (!person) return;
                // Mobile/Modal uses combined P options with handleGeschlechtClick
                grid.innerHTML = geschlechtPOptions.map(opt =>
                    `<button type="button" class="geschlecht-btn" data-value="${opt.value}" onclick="handleGeschlechtClick('${person}', '${opt.value}', this)">${opt.label}</button>`
                ).join('');
            });

            // Geschlecht S-Grids werden dynamisch in handleGeschlechtPClick befüllt
            // (kontextabhängig von P-Auswahl)

            // Geschlecht Extras-Grids befüllen (Fit / Fucked up - Multi-Select)
            const extrasGridSelectors = ['.geschlecht-extras-grid', '#ich-geschlecht-extras-grid', '#partner-geschlecht-extras-grid', '#mobile-ich-geschlecht-extras-grid', '#mobile-partner-geschlecht-extras-grid'];
            const processedExtrasGrids = new Set();
            extrasGridSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(grid => {
                    if (processedExtrasGrids.has(grid.id)) return;
                    processedExtrasGrids.add(grid.id);
                    const person = grid.dataset.person;
                    // console.log('[TIAGE DEBUG] Processing extras-grid for person:', person, 'id:', grid.id);
                    if (!person) {
                        console.warn('[TIAGE DEBUG] No person attribute for extras-grid:', grid.id);
                        return;
                    }
                    const buttonsHTML = geschlechtExtrasOptions.map(opt =>
                        `<button type="button" class="geschlecht-btn geschlecht-extras-btn" data-value="${opt.value}" data-state-key="${opt.stateKey}" data-person="${person}" title="${opt.desc}" data-i18n-title="${opt.descKey}">${opt.label}</button>`
                    ).join('');
                    grid.innerHTML = buttonsHTML;
                    // console.log('[TIAGE DEBUG] Generated extras buttons HTML for', person, ':', buttonsHTML.substring(0, 100) + '...');

                    // Add click handlers via addEventListener (more reliable than inline onclick)
                    grid.querySelectorAll('.geschlecht-extras-btn').forEach(btn => {
                        btn.addEventListener('click', function(e) {
                            e.preventDefault();
                            e.stopPropagation();
                            const btnPerson = this.dataset.person;
                            const btnValue = this.dataset.value;
                            const btnStateKey = this.dataset.stateKey;
                            // console.log('[TIAGE] Button clicked:', btnPerson, btnValue, btnStateKey);
                            handleGeschlechtExtrasClick(btnPerson, btnValue, btnStateKey, this);
                        });
                    });
                });
            });
            // console.log('[TIAGE DEBUG] Processed geschlecht-extras-grids:', processedExtrasGrids.size);

            // Dominanz-Grids befüllen (nur Desktop mit data-person)
            // Use both class selector and explicit IDs as fallback
            const dGridSelectors = ['.dominanz-grid[data-person]', '#ich-dominanz-grid', '#partner-dominanz-grid'];
            const processedDGrids = new Set();
            dGridSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(grid => {
                    if (processedDGrids.has(grid.id)) return;
                    processedDGrids.add(grid.id);
                    const person = grid.dataset.person;
                    // console.log('[TIAGE DEBUG] Processing dominanz-grid for person:', person, 'id:', grid.id);
                    if (!person) return;
                    grid.innerHTML = dominanzOptions.map(opt =>
                        `<button type="button" class="dominanz-btn" data-value="${opt.value}" onclick="handleDominanzClick('${person}', '${opt.value}', this)">${opt.label}</button>`
                    ).join('');
                });
            });
            // console.log('[TIAGE DEBUG] Processed dominanz-grids:', processedDGrids.size);

            // Orientierung-Grids befüllen (nur Desktop mit data-person)
            // Use both class selector and explicit IDs as fallback
            const oGridSelectors = ['.orientierung-grid[data-person]', '#ich-orientierung-grid', '#partner-orientierung-grid'];
            const processedOGrids = new Set();
            oGridSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(grid => {
                    if (processedOGrids.has(grid.id)) return;
                    processedOGrids.add(grid.id);
                    const person = grid.dataset.person;
                    // console.log('[TIAGE DEBUG] Processing orientierung-grid for person:', person, 'id:', grid.id);
                    if (!person) return;
                    grid.innerHTML = orientierungOptions.map(opt =>
                        `<button type="button" class="orientierung-btn" data-value="${opt.value}" onclick="handleOrientierungClick('${person}', '${opt.value}', this)">${opt.label}</button>`
                    ).join('');
                });
            });
            // console.log('[TIAGE DEBUG] Processed orientierung-grids:', processedOGrids.size);

            // GFK-Grids befüllen
            // Use both class selector and explicit IDs as fallback
            const gfkGridSelectors = ['.gfk-grid[data-person]', '#ich-gfk-grid', '#partner-gfk-grid', '#mobile-ich-gfk-grid', '#mobile-partner-gfk-grid'];
            const processedGfkGrids = new Set();
            gfkGridSelectors.forEach(selector => {
                document.querySelectorAll(selector).forEach(grid => {
                    if (processedGfkGrids.has(grid.id)) return;
                    processedGfkGrids.add(grid.id);
                    const person = grid.dataset.person;
                    // console.log('[TIAGE DEBUG] Processing gfk-grid for person:', person, 'id:', grid.id);
                    if (!person) return;
                    grid.innerHTML = gfkOptions.map(opt =>
                        `<button type="button" class="gfk-btn" data-value="${opt.value}" onclick="handleGfkClick('${person}', '${opt.value}', this)">${opt.label}</button>`
                    ).join('');
                });
            });
            // console.log('[TIAGE DEBUG] Processed gfk-grids:', processedGfkGrids.size);

            // UI mit gespeichertem State synchronisieren
            ['ich', 'partner'].forEach(person => {
                syncGeschlechtUI(person);
                syncGeschlechtExtrasUI(person);
                syncDominanzUI(person);
                syncOrientierungUI(person);
                syncGfkUI(person);
            });

            // console.log('[TIAGE DEBUG] initDimensionButtons completed');
        }

        /**
         * Initialize geschlecht hover events for all grids
         */
        function initGeschlechtHoverEvents() {
            document.querySelectorAll('.geschlecht-grid').forEach(grid => {
                const person = grid.dataset.person;
                if (!person) return;

                grid.querySelectorAll('.geschlecht-btn').forEach(btn => {
                    const value = btn.dataset.value;

                    btn.addEventListener('mouseenter', () => {
                        handleGeschlechtHover(person, value, true);
                    });

                    btn.addEventListener('mouseleave', () => {
                        handleGeschlechtHover(person, value, false);
                    });
                });
            });
        }

        // ═══════════════════════════════════════════════════════════════════════
        // DOMINANZ PRIMARY/SECONDARY SYSTEM (same logic as Geschlechtsidentität)
        // ═══════════════════════════════════════════════════════════════════════

        /**
         * Handle click on a Dominanz button
         * Logic (same as Geschlechtsidentität):
         * - First click = Primary (I indicator)
         * - Second click on different = Secondary (G indicator)
         * - Click on Primary = Clear both (primary and secondary)
         * - Click on Secondary = Clear only secondary
         */
        function handleDominanzClick(person, dominanzValue, btn) {
            // console.log('[TIAGE] handleDominanzClick:', person, dominanzValue);

            // Ensure dominanz has correct structure (migration from old format)
            if (!personDimensions[person].dominanz ||
                !('primary' in personDimensions[person].dominanz)) {
                personDimensions[person].dominanz = { primary: null, secondary: null };
            }

            const currentPrimary = personDimensions[person].dominanz.primary;
            const currentSecondary = personDimensions[person].dominanz.secondary;

            if (dominanzValue === currentPrimary) {
                // Click on Primary: Clear both
                personDimensions[person].dominanz.primary = null;
                personDimensions[person].dominanz.secondary = null;
                TiageToast.info('Dominanz deselektiert');
            } else if (dominanzValue === currentSecondary) {
                // Click on Secondary: Clear only secondary
                personDimensions[person].dominanz.secondary = null;
                TiageToast.info(dominanzValue + ' (sekundär) entfernt');
            } else if (!currentPrimary) {
                // No primary yet: Set as primary (handles both null and undefined)
                personDimensions[person].dominanz.primary = dominanzValue;
                TiageToast.info(dominanzValue + ' als Primär-Dominanz gesetzt');
            } else {
                // Primary exists, different value clicked: Set as secondary
                personDimensions[person].dominanz.secondary = dominanzValue;
                TiageToast.info(dominanzValue + ' als Sekundär-Dominanz gesetzt');
            }

            // Sync with mobilePersonDimensions for mobile view consistency
            if (typeof mobilePersonDimensions !== 'undefined' && mobilePersonDimensions[person]) {
                if (!mobilePersonDimensions[person].dominanz) {
                    mobilePersonDimensions[person].dominanz = { primary: null, secondary: null };
                }
                mobilePersonDimensions[person].dominanz.primary = personDimensions[person].dominanz.primary;
                mobilePersonDimensions[person].dominanz.secondary = personDimensions[person].dominanz.secondary;
            }

            // Sync with TiageState if available
            if (typeof TiageState !== 'undefined') {
                TiageState.set(`personDimensions.${person}.dominanz`, personDimensions[person].dominanz);
                TiageState.saveToStorage(); // Sofort speichern für Persistenz
            }

            // Sync all UIs
            syncDominanzUI(person);

            // Remove needs-selection if primary is set
            const hasPrimary = personDimensions[person].dominanz.primary !== null;
            document.querySelectorAll(`[data-dimension="${person}-dominanz-multi"], [data-dimension="mobile-${person}-dominanz"], [data-dimension="${person}-dominanz"]`).forEach(dim => {
                if (hasPrimary) {
                    dim.classList.remove('needs-selection');
                } else {
                    dim.classList.add('needs-selection');
                }
            });

            // ═══════════════════════════════════════════════════════════════════════════
            // FIX: Resonanzfaktoren bei Dominanz-Wechsel neu berechnen
            // R3 (Dynamik) hängt von der Dominanz ab und muss aktualisiert werden
            // ═══════════════════════════════════════════════════════════════════════════
            if (typeof ResonanzCard !== 'undefined' && typeof ResonanzCard.loadCalculatedValues === 'function') {
                const personArchetyp = person === 'ich' ? currentArchetype : selectedPartner;
                let needs = null;

                // Hole Needs aus LoadedArchetypProfile
                const flatNeeds = window.LoadedArchetypProfile?.[person]?.profileReview?.flatNeeds;
                if (flatNeeds) {
                    needs = {};
                    if (Array.isArray(flatNeeds)) {
                        flatNeeds.forEach(n => {
                            if (n.id) needs[n.id] = n.value;
                            if (n.stringKey) needs[n.stringKey] = n.value;
                        });
                    } else {
                        for (const key in flatNeeds) {
                            if (flatNeeds.hasOwnProperty(key)) {
                                const entry = flatNeeds[key];
                                needs[key] = (typeof entry === 'object' && entry.value !== undefined) ? entry.value : entry;
                            }
                        }
                    }
                }

                // Fallback: Standard-Werte des Archetyps
                if (!needs || Object.keys(needs).length === 0) {
                    if (typeof GfkBeduerfnisse !== 'undefined' &&
                        GfkBeduerfnisse.archetypProfile && GfkBeduerfnisse.archetypProfile[personArchetyp]) {
                        needs = GfkBeduerfnisse.archetypProfile[personArchetyp].umfrageWerte || {};
                    }
                }

                const resonanzProfileContext = {
                    archetyp: personArchetyp,
                    needs: needs,
                    dominanz: personDimensions[person]?.dominanz || null,
                    orientierung: personDimensions[person]?.orientierung || null,
                    geschlecht: personDimensions[person]?.geschlecht || null
                };

                if (resonanzProfileContext.needs && Object.keys(resonanzProfileContext.needs).length > 0) {
                    const resonanzLoaded = ResonanzCard.loadCalculatedValues(resonanzProfileContext, person);
                    if (resonanzLoaded) {
                        // console.log('[TIAGE] Resonanzfaktoren nach Dominanz-Wechsel aktualisiert für', person);
                    }
                }
            }

            updateComparisonView();

            if (typeof saveSelectionToStorage === 'function') {
                saveSelectionToStorage();
            }
        }

        // ═══════════════════════════════════════════════════════════════════════════
        // DIMENSION UI: Extracted to js/dimensions/dimensionUI.js (TiageDimensionUI)
        // ═══════════════════════════════════════════════════════════════════════════

        // ═══════════════════════════════════════════════════════════════════════════
        // GFK HANDLER: Extracted to js/dimensions/gfkMatching.js (TiageGfkMatching)
        // ═══════════════════════════════════════════════════════════════════════════

        // NeedsModals extracted to js/modals/needsModals.js

        // ═══════════════════════════════════════════════════════════════════════════
        // GFK UI & MATCHING: Extracted to js/dimensions/gfkMatching.js (TiageGfkMatching)
        // ═══════════════════════════════════════════════════════════════════════════

        // Desktop Selection Info Message
        // ========================================
        // Helper function to get geschlecht value from both string and object formats
        function getGeschlechtValue(g) {
            if (!g) return null;
            if (typeof g === 'string') return g;
            if (typeof g === 'object' && g.primary) return g.primary;
            return null;
        }

        function updateSelectionInfoMessage() {
            const infoElement = document.getElementById('desktopSelectionInfo');
            if (!infoElement) return;

            const missing = [];

            // Check ICH
            const ichMissing = [];
            if (!getGeschlechtValue(personDimensions.ich.geschlecht)) ichMissing.push('Geschlecht');
            if (!hasAnyDominanzSelected('ich')) ichMissing.push('Dominanz');
            if (!hasAnyOrientierungSelected('ich')) ichMissing.push('Orientierung');
            if (ichMissing.length > 0) {
                missing.push('DU: ' + ichMissing.join(', '));
            }

            // Check Partner
            const partnerMissing = [];
            if (!getGeschlechtValue(personDimensions.partner.geschlecht)) partnerMissing.push('Geschlecht');
            if (!hasAnyDominanzSelected('partner')) partnerMissing.push('Dominanz');
            if (!hasAnyOrientierungSelected('partner')) partnerMissing.push('Orientierung');
            if (partnerMissing.length > 0) {
                missing.push('PARTNER: ' + partnerMissing.join(', '));
            }

            // Update display
            if (missing.length > 0) {
                infoElement.textContent = TiageI18n.t('ui.missingSelection', 'Fehlende Auswahl') + ' - ' + missing.join(' | ');
                infoElement.classList.add('visible');
            } else {
                infoElement.textContent = '';
                infoElement.classList.remove('visible');
            }
        }

        function handleDimensionChange(person, dimension, value, element) {
            // Update state
            personDimensions[person][dimension] = value;

            // Remove needs-selection class from the parent group
            if (element) {
                const dimensionGroup = element.closest('.dimension-group, .dimension-status-group');
                if (dimensionGroup) {
                    dimensionGroup.classList.remove('needs-selection');
                }
            }

            // Visual feedback - highlight animation
            if (element) {
                const label = element.nextElementSibling;
                if (label) {
                    label.classList.add('highlight-change');
                    setTimeout(() => label.classList.remove('highlight-change'), 300);
                }
            }

            // Update overview box
            updateAnalysisOverview();

            // Re-run compatibility checks when dimensions change
            if (data) {
                updatePartnerView();
            }

            // WICHTIG: Speichere Änderungen sofort, um Datenverlust zu verhindern
            // (Fix für GOD-Einstellungen die bei Navigation verloren gingen)
            if (typeof saveSelectionToStorage === 'function') {
                saveSelectionToStorage();
            }
        }

        function getGeschlechtKurz(geschlecht) {
            if (!geschlecht) return '?';

            // Neues Format: { primary, secondary }
            let primary = geschlecht;
            let secondary = null;
            if (typeof geschlecht === 'object') {
                primary = geschlecht.primary;
                secondary = geschlecht.secondary;
            }

            if (!primary) return '?';

            // Nutze TiageConfig wenn verfügbar
            const getShort = (g) => {
                if (typeof TiageConfig !== 'undefined' && TiageConfig.GESCHLECHT_SHORT) {
                    return TiageConfig.GESCHLECHT_SHORT[g] || g;
                }
                // Fallback-Map
                const map = {
                    'cis_mann': 'CM',
                    'cis_frau': 'CF',
                    'trans_mann': 'TM',
                    'trans_frau': 'TF',
                    'nonbinaer': 'NB',
                    'genderfluid': 'GF',
                    'agender': 'AG',
                    'intersex': 'IS',
                    'divers': 'DI',
                    // Legacy-Support
                    'männlich': 'M',
                    'weiblich': 'W',
                    'non-binär': 'NB'
                };
                return map[g] || g;
            };

            // Primär + optional Sekundär anzeigen
            let result = getShort(primary);
            if (secondary) {
                result += '/' + getShort(secondary);
            }
            return result;
        }

        function getGeschlechtVoll(geschlecht) {
            if (!geschlecht) return null;

            let primary = geschlecht;
            let secondary = null;
            if (typeof geschlecht === 'object') {
                primary = geschlecht.primary;
                secondary = geschlecht.secondary;
            }

            if (!primary) return null;

            // Nutze i18n wenn verfügbar, sonst Fallback-Map
            const getName = (g) => {
                if (typeof TiageI18n !== 'undefined') {
                    return TiageI18n.t(`geschlecht.types.${g}`, g);
                }
                // Fallback-Map
                const map = {
                    'cis_mann': 'Cis Mann',
                    'cis_frau': 'Cis Frau',
                    'trans_mann': 'Trans Mann',
                    'trans_frau': 'Trans Frau',
                    'nonbinaer': 'Nonbinär',
                    'genderfluid': 'Genderfluid',
                    'agender': 'Agender',
                    'intersex': 'Intersex',
                    'divers': 'Divers',
                    'männlich': 'Mann',
                    'weiblich': 'Frau',
                    'non-binär': 'Nonbinär'
                };
                return map[g] || g;
            };

            let result = getName(primary);
            if (secondary) {
                result += ' (' + getName(secondary) + ')';
            }
            return result;
        }

        function getGeschlechtCategory(geschlecht) {
            // Extract primary gender from object format { primary: 'cis_mann', secondary: null }
            if (geschlecht && typeof geschlecht === 'object' && 'primary' in geschlecht) {
                geschlecht = geschlecht.primary;
            }
            // Gibt die Kategorie für Orientierungslogik zurück
            if (typeof TiageConfig !== 'undefined' && TiageConfig.GESCHLECHT_CATEGORY) {
                return TiageConfig.GESCHLECHT_CATEGORY[geschlecht] || 'andere';
            }
            const map = {
                'cis_mann': 'maennlich',
                'cis_frau': 'weiblich',
                'trans_mann': 'maennlich',
                'trans_frau': 'weiblich',
                'nonbinaer': 'nonbinaer',
                'genderfluid': 'fluid',
                'agender': 'agender',
                // Legacy-Support
                'männlich': 'maennlich',
                'weiblich': 'weiblich',
                'non-binär': 'nonbinaer',
                // Einfache Geschlechter (für R4 Hybrid)
                'mann': 'maennlich',
                'frau': 'weiblich',
                'inter': 'nonbinaer',
                'fluid': 'fluid'
            };
            return map[geschlecht] || 'andere';
        }

        function getDominanzKurz(dominanz) {
            // Handle multi-select object
            if (dominanz && typeof dominanz === 'object') {
                const parts = [];
                const map = { 'dominant': 'dom', 'submissiv': 'sub', 'switch': 'sw', 'ausgeglichen': 'ausg' };

                // New Primary/Secondary structure
                if ('primary' in dominanz) {
                    if (dominanz.primary) {
                        parts.push(map[dominanz.primary] || dominanz.primary);
                    }
                    if (dominanz.secondary) {
                        parts.push((map[dominanz.secondary] || dominanz.secondary) + '?');
                    }
                    return parts.length > 0 ? parts.join('+') : '?';
                }

                // Old format: { dominant: 'gelebt', submissiv: 'interessiert' }
                for (const [type, status] of Object.entries(dominanz)) {
                    if (status) {
                        let kurz = map[type] || type;
                        if (status === 'interessiert') kurz += '?';
                        parts.push(kurz);
                    }
                }

                return parts.length > 0 ? parts.join('+') : '?';
            }

            // Old single-value format (backwards compatibility)
            if (!dominanz) return '?';
            const map = {
                'dominant': 'dom',
                'submissiv': 'sub',
                'switch': 'sw',
                'ausgeglichen': 'ausg'
            };
            return map[dominanz] || dominanz;
        }

        function getOrientierungKurz(orientierung, status) {
            // Handle multi-select orientierung object
            if (orientierung && typeof orientierung === 'object') {
                const map = {
                    'heterosexuell': 'het',
                    'homosexuell': 'hom',
                    'bisexuell': 'bi'
                };
                const parts = [];
                // New Primary/Secondary structure
                if (orientierung.primary) {
                    parts.push(map[orientierung.primary] || orientierung.primary);
                }
                if (orientierung.secondary) {
                    parts.push(map[orientierung.secondary] || orientierung.secondary);
                }
                return parts.length > 0 ? parts.join('/') : '?';
            }

            // Backwards compatibility for old single-value format
            if (!orientierung) return '?';
            const map = {
                'heterosexuell': 'hetero',
                'homosexuell': 'homo',
                'bisexuell': 'bi'
            };
            let kurz = map[orientierung] || orientierung;
            if (status === 'interessiert') {
                kurz += '(?)';
            }
            return kurz;
        }

        function updateAnalysisOverview() {
            const ichType = data?.archetypes[currentArchetype]?.name || currentArchetype;
            const partnerType = data?.archetypes[selectedPartner]?.name || selectedPartner;

            const ichDims = personDimensions.ich;
            const partnerDims = personDimensions.partner;

            // Voller Geschlechtsname mit sekundärem in Klammern
            const ichGeschlecht = getGeschlechtVoll(ichDims.geschlecht);
            const partnerGeschlecht = getGeschlechtVoll(partnerDims.geschlecht);

            const ichInfo = `(${getDominanzKurz(ichDims.dominanz)}, ${getOrientierungKurz(ichDims.orientierung, ichDims.orientierungStatus)})`;
            const partnerInfo = `(${getDominanzKurz(partnerDims.dominanz)}, ${getOrientierungKurz(partnerDims.orientierung, partnerDims.orientierungStatus)})`;

            const content = document.getElementById('analysisOverviewContent');
            if (content) {
                // Nutze i18n für "Du:" / "You:"
                const youALabel = typeof TiageI18n !== 'undefined' ? TiageI18n.t('analysisOverview.youA', 'Du:') : 'Du:';
                const ichGeschlechtHtml = ichGeschlecht ? `<span class="geschlecht-info">${youALabel} ${ichGeschlecht}</span>` : '';
                const partnerGeschlechtHtml = partnerGeschlecht ? `<span class="geschlecht-info">${partnerGeschlecht}</span>` : '';

                content.innerHTML = `
                    <span class="type-name">${ichType}</span> ${ichGeschlechtHtml} <span class="dim-info">${ichInfo}</span>
                    <span> × </span>
                    <span class="type-name">${partnerType}</span> ${partnerGeschlechtHtml} <span class="dim-info">${partnerInfo}</span>
                `;
            }
        }

        // Make function globally available for i18n updates
        window.updateAnalysisOverview = updateAnalysisOverview;

        function initDimensionListeners() {
            // ICH dimensions
            document.querySelectorAll('input[name="ich-geschlecht"]').forEach(radio => {
                radio.addEventListener('change', (e) => handleDimensionChange('ich', 'geschlecht', e.target.value, e.target));
            });
            document.querySelectorAll('input[name="ich-dominanz"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const dimensionGroup = e.target.closest('.dimension-group');
                    if (dimensionGroup) dimensionGroup.classList.remove('needs-selection');
                    handleDominanzClick('ich', e.target.value);
                });
            });
            document.querySelectorAll('input[name="ich-dominanz-status"]').forEach(radio => {
                radio.addEventListener('change', (e) => handleDimensionChange('ich', 'dominanzStatus', e.target.value, e.target));
            });

            // PARTNER dimensions
            document.querySelectorAll('input[name="partner-geschlecht"]').forEach(radio => {
                radio.addEventListener('change', (e) => handleDimensionChange('partner', 'geschlecht', e.target.value, e.target));
            });
            document.querySelectorAll('input[name="partner-dominanz"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    const dimensionGroup = e.target.closest('.dimension-group');
                    if (dimensionGroup) dimensionGroup.classList.remove('needs-selection');
                    handleDominanzClick('partner', e.target.value);
                });
            });
            document.querySelectorAll('input[name="partner-dominanz-status"]').forEach(radio => {
                radio.addEventListener('change', (e) => handleDimensionChange('partner', 'dominanzStatus', e.target.value, e.target));
            });
        }

        // ========================================
        // Pathos/Logos Check System
        // ========================================
        // NOTE: Logic extracted to /js/compatibility/ modules
        // These wrapper functions maintain backward compatibility

        /**
         * SSOT v3.7: Holt den Konfidenz-Multiplikator für physische Kompatibilität
         *
         * Primäre Matches (confidence: 'hoch') werden bevorzugt gegenüber sekundären (confidence: 'mittel').
         * Dies stellt sicher, dass ein hetero Mann primär Frauen sieht, nicht Männer über seine sekundäre Bi-Orientierung.
         *
         * @param {string} confidence - 'hoch', 'mittel', oder 'niedrig'
         * @returns {number} Multiplikator (1.0 für hoch, 0.85 für mittel, 0.70 für niedrig)
         */
        function getConfidenceMultiplier(confidence) {
            // SSOT: TiageSynthesis.Constants.PHYSICAL_COMPATIBILITY.CONFIDENCE_MULTIPLIER
            if (typeof TiageSynthesis !== 'undefined' &&
                TiageSynthesis.Constants &&
                TiageSynthesis.Constants.PHYSICAL_COMPATIBILITY &&
                TiageSynthesis.Constants.PHYSICAL_COMPATIBILITY.CONFIDENCE_MULTIPLIER) {
                return TiageSynthesis.Constants.PHYSICAL_COMPATIBILITY.CONFIDENCE_MULTIPLIER[confidence] || 1.0;
            }
            // Fallback wenn SSOT nicht verfügbar
            const defaults = { 'hoch': 1.0, 'mittel': 0.85, 'niedrig': 0.70 };
            return defaults[confidence] || 1.0;
        }

        function checkPhysicalCompatibility(person1, person2) {
            // Delegate to extracted module
            if (typeof TiageCompatibility !== 'undefined' && TiageCompatibility.Physical) {
                return TiageCompatibility.Physical.check(person1, person2);
            }
            // Fallback: inline implementation for backwards compatibility
            // Extract effective gender identity (handles Trans transformation)
            const extractEffectiveGender = (geschlecht) => {
                if (!geschlecht) return null;
                if (typeof geschlecht === 'object' && 'primary' in geschlecht) {
                    const primary = geschlecht.primary;
                    const secondary = geschlecht.secondary;
                    if (secondary) {
                        if (secondary === 'cis') return primary;
                        if (secondary === 'trans') {
                            if (primary === 'mann') return 'frau';
                            if (primary === 'frau') return 'mann';
                            return primary;
                        }
                        if (['nonbinaer', 'fluid', 'suchend'].includes(secondary)) return secondary;
                        return secondary;
                    }
                    return primary || null;
                }
                if (typeof geschlecht === 'string') return geschlecht;
                return null;
            };

            let g1 = extractEffectiveGender(person1.geschlecht);
            let g2 = extractEffectiveGender(person2.geschlecht);

            // Get orientierung as multi-select object
            const ori1 = person1.orientierung;
            const ori2 = person2.orientierung;

            // Collect all missing items
            const missingItems = [];

            if (!g1) missingItems.push('Ich: Geschlecht');
            if (!g2) missingItems.push('Partner: Geschlecht');

            // Handle multi-select orientierung
            const oriList1 = [];
            const oriList2 = [];

            // v4.0: Array-Format
            if (Array.isArray(ori1)) {
                ori1.forEach(o => oriList1.push({ type: o, status: 'gelebt' }));
            } else if (ori1 && typeof ori1 === 'object') {
                // New format: { primary: 'homosexuell', secondary: 'heterosexuell' }
                if ('primary' in ori1) {
                    if (ori1.primary) oriList1.push({ type: ori1.primary, status: 'gelebt' });
                    if (ori1.secondary) oriList1.push({ type: ori1.secondary, status: 'interessiert' });
                } else {
                    // Old format: { heterosexuell: 'gelebt', homosexuell: 'interessiert' }
                    if (ori1.heterosexuell) oriList1.push({ type: 'heterosexuell', status: ori1.heterosexuell });
                    if (ori1.homosexuell) oriList1.push({ type: 'homosexuell', status: ori1.homosexuell });
                    if (ori1.bisexuell) oriList1.push({ type: 'bisexuell', status: ori1.bisexuell });
                }
            } else if (ori1 && typeof ori1 === 'string') {
                // Backwards compatibility for old single-value format
                oriList1.push({ type: ori1, status: person1.orientierungStatus || 'gelebt' });
            }

            // v4.0: Array-Format
            if (Array.isArray(ori2)) {
                ori2.forEach(o => oriList2.push({ type: o, status: 'gelebt' }));
            } else if (ori2 && typeof ori2 === 'object') {
                // New format: { primary: 'homosexuell', secondary: 'heterosexuell' }
                if ('primary' in ori2) {
                    if (ori2.primary) oriList2.push({ type: ori2.primary, status: 'gelebt' });
                    if (ori2.secondary) oriList2.push({ type: ori2.secondary, status: 'interessiert' });
                } else {
                    // Old format: { heterosexuell: 'gelebt', homosexuell: 'interessiert' }
                    if (ori2.heterosexuell) oriList2.push({ type: 'heterosexuell', status: ori2.heterosexuell });
                    if (ori2.homosexuell) oriList2.push({ type: 'homosexuell', status: ori2.homosexuell });
                    if (ori2.bisexuell) oriList2.push({ type: 'bisexuell', status: ori2.bisexuell });
                }
            } else if (ori2 && typeof ori2 === 'string') {
                // Backwards compatibility for old single-value format
                oriList2.push({ type: ori2, status: person2.orientierungStatus || 'gelebt' });
            }

            // Check if orientierung is missing
            if (oriList1.length === 0) missingItems.push('Ich: Orientierung');
            if (oriList2.length === 0) missingItems.push('Partner: Orientierung');

            // Return incomplete if any items are missing
            if (missingItems.length > 0) {
                return {
                    result: 'unvollständig',
                    reason: 'Dimensionen unvollständig',
                    explanation: 'Es fehlt noch: ' + missingItems.join(', '),
                    missingItems: missingItems
                };
            }

            // Check all combinations
            let hasPossible = false;
            let hasUnsicher = false;
            let hasInteressiert = false;

            for (const o1 of oriList1) {
                for (const o2 of oriList2) {
                    const result = checkSingleOrientationPair(o1.type, o1.status, o2.type, o2.status, g1, g2);

                    if (result === 'möglich') {
                        hasPossible = true;
                    } else if (result === 'unsicher') {
                        hasUnsicher = true;
                    }

                    if (o1.status === 'interessiert' || o2.status === 'interessiert') {
                        hasInteressiert = true;
                    }
                }
            }

            // Return best result
            if (hasPossible && !hasInteressiert) {
                return { result: 'möglich', confidence: 'hoch' };
            }

            if (hasPossible && hasInteressiert) {
                return {
                    result: 'unsicher',
                    confidence: 'mittel',
                    explanation: 'Anziehung möglich, aber mindestens eine Person ist in der Explorationsphase.',
                    note: 'Status "Interessiert" bedeutet Exploration'
                };
            }

            if (hasUnsicher) {
                return {
                    result: 'unsicher',
                    confidence: 'niedrig',
                    explanation: 'Anziehung ist theoretisch möglich, aber unsicher.',
                    note: 'Exploration-Phase'
                };
            }

            return {
                result: 'unmöglich',
                reason: 'Inkompatible Orientierungen',
                explanation: 'Die sexuellen Orientierungen schließen gegenseitige Anziehung aus.'
            };
        }

        // Helper: Check if gender is male category (includes cis and trans)
        function isMaleGender(gender) {
            if (!gender) return false;
            const g = gender.toLowerCase();
            return g === 'männlich' || g === 'cis_mann' || g === 'trans_mann' ||
                   g === 'mann' || g === 'male' || g === 'm';
        }

        // Helper: Check if gender is female category (includes cis and trans)
        function isFemaleGender(gender) {
            if (!gender) return false;
            const g = gender.toLowerCase();
            return g === 'weiblich' || g === 'cis_frau' || g === 'trans_frau' ||
                   g === 'frau' || g === 'female' || g === 'w' || g === 'f';
        }

        // Helper: Check if two genders are in the same category
        function isSameGenderCategory(g1, g2) {
            if (isMaleGender(g1) && isMaleGender(g2)) return true;
            if (isFemaleGender(g1) && isFemaleGender(g2)) return true;
            // Non-binary/other: compare directly
            return g1 === g2;
        }

        // Helper: Check if two genders are in different binary categories (male vs female)
        function isDifferentBinaryGender(g1, g2) {
            return (isMaleGender(g1) && isFemaleGender(g2)) ||
                   (isFemaleGender(g1) && isMaleGender(g2));
        }

        // Helper: Check single pair of orientations
        function checkSingleOrientationPair(type1, status1, type2, status2, g1, g2) {
            const isUnsicher = status1 === 'interessiert' || status2 === 'interessiert';

            // Helper: Can this orientation be attracted to the other person's gender?
            const canBeAttractedTo = (orientation, myGender, theirGender) => {
                if (orientation === 'bisexuell') return true; // Bi can be attracted to any gender
                if (orientation === 'heterosexuell') {
                    // Nonbinär mit Hetero: Anziehung zu beiden binären Geschlechtern erlauben
                    const isNonBinary = !isMaleGender(myGender) && !isFemaleGender(myGender);
                    if (isNonBinary) {
                        return isMaleGender(theirGender) || isFemaleGender(theirGender);
                    }
                    return isDifferentBinaryGender(myGender, theirGender);
                }
                if (orientation === 'homosexuell') return isSameGenderCategory(myGender, theirGender);
                return false;
            };

            // BOTH persons must be able to be attracted to each other's gender
            const person1CanBeAttracted = canBeAttractedTo(type1, g1, g2);
            const person2CanBeAttracted = canBeAttractedTo(type2, g2, g1);

            if (person1CanBeAttracted && person2CanBeAttracted) {
                return isUnsicher ? 'unsicher' : 'möglich';
            }

            // If only one person is exploring, there might be potential
            if (isUnsicher && (person1CanBeAttracted || person2CanBeAttracted)) {
                return 'unsicher';
            }

            return 'unmöglich';
        }

        function calculatePhilosophyCompatibility(type1, type2) {
            // Delegate to extracted module
            if (typeof TiageCompatibility !== 'undefined' && TiageCompatibility.Philosophy) {
                return TiageCompatibility.Philosophy.calculate(type1, type2, data);
            }
            // Fallback: inline implementation for backwards compatibility
            // Get the philosophy score (Category A) from the matrix
            const key = `${type1}_${type2}`;
            const interaction = data?.interactions[key];

            if (interaction && interaction.scores && interaction.scores.A) {
                return {
                    score: interaction.scores.A.value,
                    note: interaction.scores.A.note
                };
            }

            // Fallback if not found
            return { score: 50, note: TiageI18n.t('ui.noSpecificData', 'Keine spezifischen Daten verfügbar') };
        }

        // Helper function to format orientierung object to string
        function formatOrientierung(orientierung) {
            if (!orientierung) return '?';
            if (typeof orientierung === 'object') {
                const parts = [];
                if (orientierung.primary) {
                    parts.push(orientierung.primary + ' (P)');
                }
                if (orientierung.secondary) {
                    parts.push(orientierung.secondary + ' (S)');
                }
                return parts.length > 0 ? parts.join(', ') : '?';
            }
            // Backwards compatibility for old single-value format
            return orientierung;
        }

        function formatPersonSummary(person) {
            // Extract primary gender from object format { primary: 'cis_mann', secondary: null }
            let geschlecht = person.geschlecht || '?';
            if (geschlecht && typeof geschlecht === 'object' && 'primary' in geschlecht) {
                geschlecht = geschlecht.primary || '?';
            }

            // Handle Primary/Secondary orientierung structure
            const orientierungStr = formatOrientierung(person.orientierung);

            return `${geschlecht}, ${orientierungStr}`;
        }

        function runCompatibilityChecks() {
            const person1 = {
                archetyp: currentArchetype,
                ...personDimensions.ich
            };
            const person2 = {
                archetyp: selectedPartner,
                ...personDimensions.partner
            };

            // Reset all warnings
            document.getElementById('pathosBlocker').classList.remove('active');
            document.getElementById('logosWarning').classList.remove('active');
            document.getElementById('pathosUncertain').classList.remove('active');
            document.getElementById('doubleWarning').classList.remove('active');
            document.getElementById('compatibilityContent').style.display = 'block';

            // 1. PATHOS CHECK
            const pathosCheck = checkPhysicalCompatibility(person1, person2);

            if (pathosCheck.result === 'unvollständig') {
                // Show Pathos Uncertain with incomplete message
                document.getElementById('pathosUncertain').classList.add('active');
                document.getElementById('pathosUncertainText').textContent =
                    pathosCheck.explanation;
                // Continue showing compatibility content since it's just incomplete
            }

            // v4.0 FIX: 'hohe_reibung' aus physicalCompatibility.js muss auch als inkompatibel behandelt werden
            if (pathosCheck.result === 'unmöglich' || pathosCheck.result === 'hohe_reibung') {
                // SANFTER HINWEIS statt K.O.-Blocker
                // Zeige Warnung, aber blockiere nicht mehr
                document.getElementById('pathosBlocker').classList.add('active');
                // Content wird NICHT mehr versteckt - zeige den (niedrigen) Score
                // document.getElementById('compatibilityContent').style.display = 'none';

                document.getElementById('pathosBlockerReason').textContent =
                    `Hinweis: ${pathosCheck.reason || 'Inkompatible Orientierungen'} – Resonanz ist sehr niedrig, aber nicht unmöglich.`;
                document.getElementById('pathosBlockerPerson1').textContent =
                    formatPersonSummary(person1);
                document.getElementById('pathosBlockerPerson2').textContent =
                    formatPersonSummary(person2);

                // Kein return mehr - weitermachen mit niedriger Resonanz!
                // return { blocked: true, reason: 'pathos' };
            }

            // 2. LOGOS CHECK
            const logosCheck = calculatePhilosophyCompatibility(person1.archetyp, person2.archetyp);
            const hasLogosWarning = logosCheck.score < 50;
            const hasPathosUncertain = pathosCheck.result === 'unsicher';

            // Handle different warning combinations
            if (hasPathosUncertain && hasLogosWarning) {
                // Double Warning
                document.getElementById('doubleWarning').classList.add('active');
                document.getElementById('doubleWarningPathos').textContent =
                    `${formatOrientierung(person2.orientierung)} (${person2.orientierungStatus}) → Exploration-Phase`;
                document.getElementById('doubleWarningLogos').textContent =
                    `Beziehungsphilosophie: ${logosCheck.score} → ${data?.archetypes[person1.archetyp]?.name || person1.archetyp} vs. ${data?.archetypes[person2.archetyp]?.name || person2.archetyp}`;
            } else {
                // Single warnings
                if (hasLogosWarning) {
                    document.getElementById('logosWarning').classList.add('active');
                    const warningTitle = logosCheck.score < 30
                        ? TiageI18n.t('warnings.fundamentalDifferences', 'Verstandsebene-Warnung: Fundamentale philosophische Unterschiede')
                        : TiageI18n.t('warnings.differentApproaches', 'Verstandsebene-Hinweis: Unterschiedliche philosophische Ansätze');
                    document.getElementById('logosWarningTitle').textContent = warningTitle;
                    document.getElementById('logosWarningSubtitle').textContent =
                        TiageI18n.t('warnings.relationshipPhilosophy', 'Beziehungsphilosophie: {score}').replace('{score}', logosCheck.score);
                    document.getElementById('logosWarningScore').textContent = `${logosCheck.score}`;
                    document.getElementById('logosWarningText').textContent = logosCheck.score < 30
                        ? TiageI18n.t('warnings.warningText', 'Eure Grundüberzeugungen über Beziehungen sind sehr unterschiedlich. Dies erfordert intensive Kommunikation und Kompromissbereitschaft.')
                        : TiageI18n.t('warnings.infoText', 'Ihr habt verschiedene Vorstellungen von Beziehungen. Offene Kommunikation ist wichtig.');
                }

                if (hasPathosUncertain) {
                    document.getElementById('pathosUncertain').classList.add('active');
                    document.getElementById('pathosUncertainText').textContent =
                        `Mindestens eine Person ist in der Explorationsphase (Status: "Interessiert"). Die tatsächliche körperliche Anziehung ist noch unklar.`;
                }
            }

            // 3. DISPLAY DIMENSION MODIFIERS
            const modifierSummaries = getModifierSummary(person1, person2);
            const modifierSummaryEl = document.getElementById('modifierSummary');
            const modifierContentEl = document.getElementById('modifierSummaryContent');

            if (modifierSummaries.length > 0) {
                modifierSummaryEl.classList.add('active');
                modifierContentEl.innerHTML = modifierSummaries.map(mod => {
                    const sign = mod.modifier > 0 ? '+' : '';
                    const modClass = mod.modifier > 0 ? 'positive' : (mod.modifier < 0 ? 'negative' : 'neutral');
                    const icon = mod.modifier > 0 ? '↑' : (mod.modifier < 0 ? '↓' : '→');
                    return `
                        <div class="modifier-summary-item">
                            <span class="modifier-icon">${icon}</span>
                            <span>${mod.description}</span>
                            <span class="modifier-badge ${modClass}">${sign}${mod.modifier}%</span>
                        </div>
                    `;
                }).join('');
            } else {
                modifierSummaryEl.classList.remove('active');
            }

            return {
                blocked: false,
                pathosCheck,
                logosCheck,
                warnings: { hasLogosWarning, hasPathosUncertain },
                modifiers: modifierSummaries
            };
        }

        function toggleLogosWarning() {
            const warning = document.getElementById('logosWarning');
            warning.classList.toggle('expanded');
        }

        function showPathosLogosInfo() {
            // Show info modal about Pathos vs Logos
            const title = TiageI18n.t('warnings.pathosLogosTitle', 'Pathos vs. Logos');
            const content = `
                <div style="line-height: 1.6;">
                    <h4 style="color: var(--primary); margin-bottom: 10px;">${TiageI18n.t('warnings.emotionLevel', 'GEFÜHLSEBENE (Emotion/Körper)')}</h4>
                    <ul style="margin-bottom: 15px; padding-left: 20px;">
                        <li>${TiageI18n.t('warnings.emotionDesc', 'Körperliche und emotionale Anziehung')}</li>
                        <li>${TiageI18n.t('warnings.emotionDimension', 'Sexuelle Orientierung')}</li>
                        <li>${TiageI18n.t('warnings.emotionImmutable', 'Nicht durch Lernen oder Kommunikation veränderbar')}</li>
                        <li>${TiageI18n.t('warnings.emotionConsequence', 'Ohne Gefühlsebene: Keine romantische Beziehung möglich')}</li>
                    </ul>

                    <h4 style="color: var(--warning); margin-bottom: 10px;">${TiageI18n.t('warnings.reasonLevel', 'VERSTANDSEBENE (Philosophie/Überzeugungen)')}</h4>
                    <ul style="margin-bottom: 15px; padding-left: 20px;">
                        <li>${TiageI18n.t('warnings.reasonDesc', 'Beziehungsphilosophie und rationale Überzeugungen')}</li>
                        <li>${TiageI18n.t('warnings.reasonDimension', 'Überzeugungen und Werte')}</li>
                        <li>${TiageI18n.t('warnings.reasonMutable', 'Kann durch Kommunikation und Lernen verändert werden')}</li>
                        <li>${TiageI18n.t('warnings.reasonConsequence', 'Ohne Verstandsebene: Schwierige, aber mögliche Beziehung')}</li>
                    </ul>

                    <p style="font-style: italic; color: var(--text-muted);">
                        ${TiageI18n.t('warnings.pathosLogosQuote', '"Die Gefühlsebene ist das Fundament - ohne körperliche Anziehung kann keine romantische Beziehung entstehen. Die Verstandsebene ist das Dach - es schützt und strukturiert, kann aber umgebaut werden."')}
                    </p>
                </div>
            `;

            document.getElementById('modalTitle').textContent = title;
            document.getElementById('modalBody').innerHTML = content;
            document.getElementById('categoryModal').classList.add('active');
        }

        // ========================================
        // Dimensions Modifiers System
        // ========================================

        // Tag dimension relevance mapping
        const tagDimensionRelevance = {
            // KATEGORIE A: Beziehungsphilosophie - KEINE Dimensions-Einflüsse!
            "exklusivitaets-erwartung": [],
            "offenheit-fuer-alternative-modelle": [],
            "beziehung-als-lebensinhalt": [],
            "primaerbeziehung-konzept": [],
            "commitment-tiefe": [],

            // KATEGORIE B: Werte-Alignment
            "fuehrung-und-initiative": ["dominanz"],
            "macht-balance": ["dominanz"],
            "emotionale-reziprozitaet": [],
            "eifersucht-umgang": [],
            "konfliktloesung": ["dominanz"],
            "emotionale-tiefe": [],

            // KATEGORIE C: Nähe-Distanz
            "entscheidungsfindung": ["dominanz"],
            "alltags-organisation": ["dominanz"],
            "autonomie-vs-gemeinsame-zeit": [],
            "finanzielle-organisation": ["dominanz"],
            "wohnform-flexibilitaet": [],
            "zeitmanagement": ["dominanz"],

            // KATEGORIE D: Autonomie
            "koerperliche-anziehung": ["geschlecht", "orientierung", "orientierungStatus"],
            "sexuelle-dominanz-dynamik": ["dominanz"],
            "experimentierfreude": ["orientierungStatus"],
            "intimitaets-frequenz": [],
            "koerperliche-naehe": [],
            "sexuelle-offenheit": ["orientierungStatus"],

            // KATEGORIE E: Kommunikation
            "kommunikations-stil": ["dominanz"],
            "konflikt-kommunikation": ["dominanz"],
            "beduerfnis-artikulation": [],
            "feedback-kultur": [],

            // KATEGORIE F: Soziale Kompatibilität
            "philosophische-entwicklung": [],
            "anpassungsfaehigkeit": ["dominanz"],
            "krisenresilienz": ["dominanz"],
            "gemeinsame-vision": [],
            "soziales-umfeld": [],
            "gesellschaftliche-akzeptanz": []
        };

        // Calculate dominanz modifier
        // NOTE: Logic extracted to /js/dimensions/dominanzModifier.js
        function getDominanzModifier(dom1, dom2) {
            // Delegate to extracted module
            if (typeof TiageDimensions !== 'undefined' && TiageDimensions.Dominanz) {
                return TiageDimensions.Dominanz.getModifier(dom1, dom2);
            }
            // Fallback: inline implementation for backwards compatibility
            // Return 0 if either is null/undefined
            if (!dom1 || !dom2) return 0;

            // KOMPLEMENTÄR
            if ((dom1 === "dominant" && dom2 === "submissiv") ||
                (dom1 === "submissiv" && dom2 === "dominant")) {
                return 8;
            }
            // BEIDE GLEICH
            if (dom1 === dom2) {
                if (dom1 === "ausgeglichen") return 5;
                if (dom1 === "switch") return 3;
                if (dom1 === "dominant") return -5;
                if (dom1 === "submissiv") return -5;
            }
            // EINER FLEXIBEL
            if (dom1 === "switch" || dom2 === "switch" ||
                dom1 === "ausgeglichen" || dom2 === "ausgeglichen") {
                return 2;
            }
            return 0;
        }

        // Get dominanz modifier description
        // Basiert auf Forschung: Sadikaj et al. (2017), Tiedens & Fragale (2003)
        // NOTE: Logic extracted to /js/dimensions/dominanzModifier.js
        function getDominanzDescription(dom1, dom2, modifier) {
            // Delegate to extracted module
            if (typeof TiageDimensions !== 'undefined' && TiageDimensions.Dominanz) {
                return TiageDimensions.Dominanz.getDescription(dom1, dom2, modifier);
            }
            // Fallback: inline implementation for backwards compatibility
            if (modifier === 8) return `Komplementär (${dom1} × ${dom2}): Optimale Rollenverteilung - Forschung zeigt höhere Sympathie und Komfort`;
            if (modifier === 5) return `Beide ausgeglichen: Flexible Dynamik ohne starre Hierarchie`;
            if (modifier === 3) return `Beide switch: Wechselnde Dynamik mit situativer Anpassung`;
            if (modifier === -5 && dom1 === "dominant") return `Beide dominant: Machtkampf-Risiko - bewusste Kommunikationsregeln empfohlen`;
            if (modifier === -5 && dom1 === "submissiv") return `Beide submissiv: Führungsvakuum - klare Aufgabenteilung empfohlen`;
            if (modifier === 2) return `Flexibilität: Ein Partner passt sich situativ an`;
            return "Neutral";
        }

        // Map tag to category
        // NOTE: Logic extracted to /js/dimensions/tagDimensionRelevance.js
        function getTagCategory(tagId) {
            // Delegate to extracted module
            if (typeof TiageDimensions !== 'undefined' && TiageDimensions.TagRelevance) {
                return TiageDimensions.TagRelevance.getTagCategory(tagId);
            }
            // Fallback: inline implementation for backwards compatibility
            const mapping = {
                "exklusivitaets-erwartung": "A", "offenheit-fuer-alternative-modelle": "A",
                "beziehung-als-lebensinhalt": "A", "primaerbeziehung-konzept": "A", "commitment-tiefe": "A",
                "fuehrung-und-initiative": "B", "macht-balance": "B", "emotionale-reziprozitaet": "B",
                "eifersucht-umgang": "B", "konfliktloesung": "B", "emotionale-tiefe": "B",
                "entscheidungsfindung": "C", "alltags-organisation": "C", "autonomie-vs-gemeinsame-zeit": "C",
                "finanzielle-organisation": "C", "wohnform-flexibilitaet": "C", "zeitmanagement": "C",
                "koerperliche-anziehung": "D", "sexuelle-dominanz-dynamik": "D", "experimentierfreude": "D",
                "intimitaets-frequenz": "D", "koerperliche-naehe": "D", "sexuelle-offenheit": "D",
                "kommunikations-stil": "E", "konflikt-kommunikation": "E",
                "beduerfnis-artikulation": "E", "feedback-kultur": "E",
                "philosophische-entwicklung": "F", "anpassungsfaehigkeit": "F", "krisenresilienz": "F",
                "gemeinsame-vision": "F", "soziales-umfeld": "F", "gesellschaftliche-akzeptanz": "F"
            };
            return mapping[tagId] || null;
        }

        // Calculate tag score with modifiers
        // NOTE: Logic extracted to /js/dimensions/tagCalculator.js
        function calculateTagWithModifiers(tagId, person1, person2, pathosCheck) {
            // Delegate to extracted module
            if (typeof TiageDimensions !== 'undefined' && TiageDimensions.TagCalculator) {
                return TiageDimensions.TagCalculator.calculateTagWithModifiers(tagId, person1, person2, pathosCheck, data);
            }
            // Fallback: inline implementation for backwards compatibility
            const interactionKey = `${person1.archetyp}_${person2.archetyp}`;
            const interaction = data?.interactions[interactionKey];
            const tagCategory = getTagCategory(tagId);
            let baseScore = interaction?.scores?.[tagCategory]?.value || 50;

            const relevantDims = tagDimensionRelevance[tagId] || [];
            if (relevantDims.length === 0) {
                return { score: baseScore, baseScore, modifier: 0, dims: [], desc: "Archetyp-basiert" };
            }

            let modifier = 0;
            let descriptions = [];

            // Dominanz modifier
            if (relevantDims.includes("dominanz")) {
                const domMod = getDominanzModifier(person1.dominanz, person2.dominanz);
                modifier += domMod;
                if (domMod !== 0) descriptions.push(getDominanzDescription(person1.dominanz, person2.dominanz, domMod));
            }

            // Physical compatibility (Pathos uncertainty)
            if (relevantDims.some(d => ["geschlecht", "orientierung", "orientierungStatus"].includes(d))) {
                if (pathosCheck?.result === "unsicher") {
                    modifier -= 10;
                    descriptions.push("Unsichere körperliche Anziehung");
                }
            }

            // Orientation status (exploration bonus)
            if (relevantDims.includes("orientierungStatus")) {
                if (person1.orientierungStatus === "interessiert" || person2.orientierungStatus === "interessiert") {
                    if (tagId === "experimentierfreude" || tagId === "sexuelle-offenheit") {
                        modifier += 5;
                        descriptions.push("Explorationsbonus");
                    }
                }
            }

            const finalScore = Math.round(baseScore + modifier);
            return {
                score: finalScore,
                baseScore,
                modifier,
                dims: relevantDims,
                desc: descriptions.length > 0 ? descriptions.join("; ") : TiageI18n.t('quality.noModification', 'Keine Anpassung')
            };
        }

        // Calculate category with modifiers
        // NOTE: Logic extracted to /js/dimensions/tagCalculator.js
        function calculateCategoryWithModifiers(catLetter, person1, person2, pathosCheck) {
            // Delegate to extracted module
            if (typeof TiageDimensions !== 'undefined' && TiageDimensions.TagCalculator) {
                return TiageDimensions.TagCalculator.calculateCategoryWithModifiers(catLetter, person1, person2, pathosCheck, data);
            }
            // Fallback: inline implementation for backwards compatibility
            const categoryTags = Object.keys(tagDimensionRelevance).filter(t => getTagCategory(t) === catLetter);

            if (categoryTags.length === 0) {
                const interactionKey = `${person1.archetyp}_${person2.archetyp}`;
                const interaction = data?.interactions[interactionKey];
                return { score: interaction?.scores?.[catLetter]?.value || 50, modifier: 0, tags: [] };
            }

            let totalScore = 0, totalMod = 0;
            const tagDetails = [];

            for (const tagId of categoryTags) {
                const result = calculateTagWithModifiers(tagId, person1, person2, pathosCheck);
                totalScore += result.score;
                totalMod += result.modifier;
                tagDetails.push({ id: tagId, ...result });
            }

            return {
                score: Math.round(totalScore / categoryTags.length),
                modifier: Math.round(totalMod / categoryTags.length),
                tags: tagDetails
            };
        }

        // ========================================
        // NEW: 4-Factor Relationship Quality Model
        // ========================================

        // Factor 1: Archetype Match (40%) - SSOT aus Bedürfnis-Profilen
        // ═══════════════════════════════════════════════════════════════════════════
        // SSOT: Nutzt ArchetypeMatrixCalculator.getScore() für Live-Berechnung
        // KEINE Fallback-Matrix - Werte werden aus Bedürfnis-Profilen berechnet
        // ═══════════════════════════════════════════════════════════════════════════
        function getArchetypeScore(type1, type2) {
            // SSOT: Nutze ArchetypeMatrixCalculator.getScore() direkt
            if (typeof TiageSynthesis !== 'undefined' &&
                TiageSynthesis.ArchetypeMatrixCalculator &&
                typeof TiageSynthesis.ArchetypeMatrixCalculator.getScore === 'function') {
                const score = TiageSynthesis.ArchetypeMatrixCalculator.getScore(type1, type2);
                // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
                // console.log('[getArchetypeScore] SSOT:', type1, type2, '→', score);
                return score;
            }

            // Fallback: TiageSynthesis.Factors.Archetyp (nutzt auch SSOT intern)
            if (typeof TiageSynthesis !== 'undefined' &&
                TiageSynthesis.Factors &&
                TiageSynthesis.Factors.Archetyp &&
                typeof TiageSynthesis.Factors.Archetyp.calculate === 'function') {
                const result = TiageSynthesis.Factors.Archetyp.calculate(type1, type2, data);
                // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
                // console.log('[getArchetypeScore] Via Factors.Archetyp:', type1, type2, '→', result.score);
                return result.score;
            }

            // Letzte Fallback: Matrix-Interaction
            const key = `${type1}_${type2}`;
            const interaction = data?.interactions?.[key];
            if (interaction?.overall) {
                return interaction.overall;
            }

            console.warn('[getArchetypeScore] SSOT nicht verfügbar für:', type1, type2);
            return 50; // Neutraler Default
        }

        // ═══════════════════════════════════════════════════════════════════════
        // Factor 2: Dominance Harmony (20% Gewichtung - Pathos/Gefühl)
        // ═══════════════════════════════════════════════════════════════════════
        // Philosophische Grundlage: OSHO + Metaphysik der Qualität (Pirsig)
        //
        // OSHO: "Nur Extreme können sich wirklich verlieben. Nur Extreme ziehen
        //        sich an. Je weiter sie voneinander entfernt sind, desto tiefer
        //        wird die Anziehung."
        //
        // OSHO: "Es gibt nur eine Energie - Tao. Sie funktioniert auf zwei Arten.
        //        Du kannst Konflikt ODER Harmonie zwischen beiden erschaffen."
        //
        // MOQ (Pirsig): Dynamische Qualität entsteht durch Spannung zwischen
        //               Polen. Statische Qualität bewahrt funktionierende Muster.
        //
        // Werte-Logik:
        // - 100%: Komplementäre Polarität (Dom↔Sub) = maximale dynamische Qualität
        // -  95%: Tao-Balance (Ausgeglichen↔Ausgeglichen) = harmonische Einheit
        // -  90%: Flexible Dynamik (Switch↔Switch) = spielerische Anpassung
        // -  85%: Pol + Balance = stabile Ergänzung
        // -  80%: Switch + Pol = Anpassung möglich, aber Spannung
        // -  60%: Gleiche Pole (Dom↔Dom, Sub↔Sub) = Konflikt, fehlende Spannung
        // ═══════════════════════════════════════════════════════════════════════
        // ═══════════════════════════════════════════════════════════════════════
        // DOMINANZ HARMONY MATRIX - SSOT: Referenziert Constants.DOMINANCE_MATRIX
        // ═══════════════════════════════════════════════════════════════════════
        function getDominanzHarmonyMatrix() {
            if (typeof TiageSynthesis !== 'undefined' &&
                TiageSynthesis.Constants &&
                TiageSynthesis.Constants.DOMINANCE_MATRIX) {
                return TiageSynthesis.Constants.DOMINANCE_MATRIX;
            }
            // Fallback (sollte nicht erreicht werden)
            console.warn('[getDominanzHarmonyMatrix] SSOT nicht verfügbar, nutze Fallback');
            return {
                "dominant-submissiv": 100, "submissiv-dominant": 100,
                "ausgeglichen-ausgeglichen": 100, "switch-switch": 100,
                "switch-ausgeglichen": 100, "ausgeglichen-switch": 100,
                "dominant-ausgeglichen": 93, "ausgeglichen-dominant": 93,
                "submissiv-ausgeglichen": 93, "ausgeglichen-submissiv": 93,
                "switch-dominant": 93, "dominant-switch": 93,
                "switch-submissiv": 93, "submissiv-switch": 93,
                "dominant-dominant": 55, "submissiv-submissiv": 55
            };
        }
        const dominanzHarmonyMatrix = getDominanzHarmonyMatrix();

        // Calculate harmony between two single dominanz types
        function calculateSingleDominanzHarmony(type1, status1, type2, status2) {
            const key = `${type1}-${type2}`;
            let baseScore = dominanzHarmonyMatrix[key] || dominanzHarmonyMatrix[`${type2}-${type1}`] || 75;

            // STATUS-MODIFIER: Reduzierte Konfidenz bei "interessiert"
            if (status1 === 'interessiert' || status2 === 'interessiert') {
                baseScore = Math.round(baseScore * 0.7);
            }

            return baseScore;
        }

        // Calculate best dominanz harmony for multi-select (finds best combination)
        function calculateDominanceHarmony(domObj1, domObj2) {
            // Handle old single-value format (backwards compatibility)
            if (typeof domObj1 === 'string' || typeof domObj2 === 'string') {
                return calculateSingleDominanzHarmony(domObj1, 'gelebt', domObj2, 'gelebt');
            }

            // Get selected dominanz preferences for each person (Primary/Secondary structure)
            const list1 = [];
            const list2 = [];

            if (domObj1) {
                if (domObj1.primary) list1.push({ type: domObj1.primary, status: 'primary' });
                if (domObj1.secondary) list1.push({ type: domObj1.secondary, status: 'secondary' });
            }

            if (domObj2) {
                if (domObj2.primary) list2.push({ type: domObj2.primary, status: 'primary' });
                if (domObj2.secondary) list2.push({ type: domObj2.secondary, status: 'secondary' });
            }

            // Default if no selections
            if (list1.length === 0 || list2.length === 0) return 75;

            // Gewichteter Durchschnitt: Primär 70%, Sekundär 30%
            const PRIMARY_WEIGHT = 0.7;
            const SECONDARY_WEIGHT = 0.3;

            // Berechne gewichteten Score für jede Person-Kombination
            let totalWeight = 0;
            let weightedSum = 0;

            for (const d1 of list1) {
                for (const d2 of list2) {
                    const score = calculateSingleDominanzHarmony(d1.type, d1.status, d2.type, d2.status);
                    // Gewicht = Produkt der jeweiligen Gewichte
                    const w1 = d1.status === 'primary' ? PRIMARY_WEIGHT : SECONDARY_WEIGHT;
                    const w2 = d2.status === 'primary' ? PRIMARY_WEIGHT : SECONDARY_WEIGHT;
                    const combinedWeight = w1 * w2;
                    weightedSum += score * combinedWeight;
                    totalWeight += combinedWeight;
                }
            }

            return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 75;
        }

        // Factor 3: Orientation Compatibility (25%) - uses existing checkPhysicalCompatibility
        function calculateOrientationScore(person1, person2) {
            const pathosCheck = checkPhysicalCompatibility(person1, person2);

            // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
            // console.log('[calculateOrientationScore] pathosCheck.result:', pathosCheck.result,
            //             'reason:', pathosCheck.reason || '-',
            //             'missingItems:', pathosCheck.missingItems || '-');

            if (pathosCheck.result === "unmöglich") {
                // console.log('[calculateOrientationScore] K.O. - returning 0');
                return 0;  // K.O.-Kriterium!
            }

            if (pathosCheck.result === "unsicher") {
                // console.log('[calculateOrientationScore] Unsicher - returning 70');
                return 70;  // Exploration-Phase
            }

            // console.log('[calculateOrientationScore] Möglich - returning 100');
            return 100;  // Kompatibel
        }

        // Factor 4: Gender Attraction (15%)
        function calculateGenderAttraction(p1, p2) {
            // Extract primary gender from object format { primary: 'mann', secondary: 'cis' }
            let g1 = p1.geschlecht;
            let g2 = p2.geschlecht;
            let identity1 = null;
            let identity2 = null;

            if (g1 && typeof g1 === 'object' && 'primary' in g1) {
                identity1 = g1.secondary;  // cis, trans, suchend, nonbinaer, fluid
                g1 = g1.primary;           // mann, frau, inter
            }
            if (g2 && typeof g2 === 'object' && 'primary' in g2) {
                identity2 = g2.secondary;
                g2 = g2.primary;
            }

            // Handle Primary/Secondary orientierung structure
            const oriList1 = [];
            const oriList2 = [];

            if (p1.orientierung && typeof p1.orientierung === 'object') {
                if (p1.orientierung.primary) oriList1.push(p1.orientierung.primary);
                if (p1.orientierung.secondary) oriList1.push(p1.orientierung.secondary);
            } else if (p1.orientierung) {
                oriList1.push(p1.orientierung);
            }

            if (p2.orientierung && typeof p2.orientierung === 'object') {
                if (p2.orientierung.primary) oriList2.push(p2.orientierung.primary);
                if (p2.orientierung.secondary) oriList2.push(p2.orientierung.secondary);
            } else if (p2.orientierung) {
                oriList2.push(p2.orientierung);
            }

            // Return default if values missing
            if (!g1 || !g2 || oriList1.length === 0 || oriList2.length === 0) return 75;

            // Check best combination for base score
            let bestScore = 0;

            for (const o1 of oriList1) {
                for (const o2 of oriList2) {
                    const score = calculateSingleGenderAttraction(g1, o1, g2, o2);
                    if (score > bestScore) {
                        bestScore = score;
                    }
                }
            }

            // Apply Identity Resonance (cis/trans/suchend) if both identities are set
            if (identity1 && identity2) {
                const identityFactor = calculateIdentityResonance(identity1, identity2);
                // Combine: 70% base attraction + 30% identity resonance
                bestScore = Math.round(bestScore * 0.7 + identityFactor * 0.3);
            }

            return bestScore;
        }

        // Calculate Identity Resonance using IDENTITY_MATRIX from constants
        function calculateIdentityResonance(id1, id2) {
            // Use TiageSynthesis constants if available
            const IDENTITY_MATRIX = (typeof TiageSynthesis !== 'undefined' && TiageSynthesis.Constants?.IDENTITY_MATRIX) || {
                "cis-cis": 100,
                "cis-trans": 85,
                "cis-suchend": 70,
                "trans-cis": 85,
                "trans-trans": 100,
                "trans-suchend": 75,
                "nonbinaer-nonbinaer": 100,
                "nonbinaer-fluid": 90,
                "nonbinaer-suchend": 80,
                "fluid-nonbinaer": 90,
                "fluid-fluid": 100,
                "fluid-suchend": 85,
                "suchend-cis": 70,
                "suchend-trans": 75,
                "suchend-nonbinaer": 80,
                "suchend-fluid": 85,
                "suchend-suchend": 100,
                "cis-nonbinaer": 65,
                "cis-fluid": 55,
                "trans-nonbinaer": 75,
                "trans-fluid": 65,
                "nonbinaer-cis": 65,
                "nonbinaer-trans": 75,
                "fluid-cis": 55,
                "fluid-trans": 65
            };

            const IDENTITY_OPENNESS = (typeof TiageSynthesis !== 'undefined' && TiageSynthesis.Constants?.IDENTITY_OPENNESS) || {
                "cis": 0,
                "trans": 30,
                "nonbinaer": 50,
                "fluid": 80,
                "suchend": 100
            };

            // Get base score from matrix
            const key = `${id1}-${id2}`;
            let baseScore = IDENTITY_MATRIX[key];

            // Fallback for unknown combinations
            if (baseScore === undefined) {
                baseScore = 75;
            }

            // Calculate openness bonus
            const openness1 = IDENTITY_OPENNESS[id1] || 0;
            const openness2 = IDENTITY_OPENNESS[id2] || 0;
            const opennessBonus = Math.round((openness1 + openness2) / 200 * 10); // Max 10 points

            // Keine Obergrenze - Score kann über 100 gehen (z.B. durch Openness-Bonus)
            return baseScore + opennessBonus;
        }

        // Helper for single orientierung pair - nutzt Geschlechts-Kategorien
        function calculateSingleGenderAttraction(g1, o1, g2, o2) {
            // Konvertiere Geschlechter zu Kategorien für die Logik
            const cat1 = getGeschlechtCategory(g1);
            const cat2 = getGeschlechtCategory(g2);

            // Bi = immer 100% (angezogen von männlich und weiblich)
            if (o1 === "bisexuell" || o2 === "bisexuell") return 100;

            // Hetero: Angezogen vom "anderen" Geschlecht
            if (o1 === "heterosexuell" && o2 === "heterosexuell") {
                if ((cat1 === "maennlich" && cat2 === "weiblich") ||
                    (cat1 === "weiblich" && cat2 === "maennlich")) return 100;
                // Nonbinär, Fluid, Agender - partielle Kompatibilität
                if (cat1 === "nonbinaer" || cat2 === "nonbinaer" ||
                    cat1 === "fluid" || cat2 === "fluid") return 80;
                if (cat1 === "agender" || cat2 === "agender") return 60;
                return 0;
            }

            // Homo: Angezogen vom "gleichen" Geschlecht
            if (o1 === "homosexuell" && o2 === "homosexuell") {
                if (cat1 === cat2 && cat1 !== "nonbinaer" && cat1 !== "fluid" && cat1 !== "agender") return 100;
                // Nonbinär mit Homo - angezogen von ähnlichen
                if ((cat1 === "nonbinaer" && cat2 === "nonbinaer") ||
                    (cat1 === "fluid" && cat2 === "fluid")) return 90;
                if (cat1 === "nonbinaer" || cat2 === "nonbinaer" ||
                    cat1 === "fluid" || cat2 === "fluid") return 75;
                if (cat1 === "agender" || cat2 === "agender") return 60;
                return 0;
            }

            return 75;  // Gemischte Orientierungen
        }

        // ═══════════════════════════════════════════════════════════════════════
        // R4 HYBRID: BIDIREKTIONALE ATTRAKTION MIT P/S GEWICHTUNG
        // ═══════════════════════════════════════════════════════════════════════
        // Berechnet gegenseitige Attraktion unter Berücksichtigung von:
        // - Primäre Orientierung (70% Gewicht)
        // - Sekundäre Orientierung (30% Gewicht, Bonus nicht Override)
        // - Bidirektional: ICH→Partner UND Partner→ICH
        // ═══════════════════════════════════════════════════════════════════════

        /**
         * Berechnet die Attraktion in EINE Richtung (Person A → Person B)
         * Berücksichtigt Primär/Sekundär Orientierung mit Gewichtung
         *
         * @param {string} genderA - Geschlecht von A (effektiv, nach Cis/Trans)
         * @param {object} orientierungA - { primary, secondary } von A
         * @param {string} genderB - Geschlecht von B (effektiv)
         * @returns {number} Attraktion 0-100
         */
        function calculateDirectionalAttraction(genderA, orientierungA, genderB) {
            const PRIMARY_WEIGHT = 0.70;
            const SECONDARY_WEIGHT = 0.30;

            // Extrahiere P/S Orientierungen
            let primaryOri = null;
            let secondaryOri = null;

            if (orientierungA && typeof orientierungA === 'object') {
                primaryOri = orientierungA.primary || null;
                secondaryOri = orientierungA.secondary || null;
            } else if (typeof orientierungA === 'string') {
                primaryOri = orientierungA;
            }

            if (!primaryOri || !genderA || !genderB) {
                return 75; // Neutral bei fehlenden Daten
            }

            // Konvertiere zu Kategorien
            const catA = getGeschlechtCategory(genderA);
            const catB = getGeschlechtCategory(genderB);

            // Hilfsfunktion: Prüft ob Orientierung zu Geschlecht passt
            const checkAttraction = (ori, fromCat, toCat) => {
                if (!ori) return 0;

                if (ori === 'bisexuell' || ori === 'pansexuell') {
                    return 100; // Bi/Pan = offen für alle
                }

                if (ori === 'heterosexuell') {
                    // Hetero: Angezogen vom "anderen" Geschlecht
                    if ((fromCat === 'maennlich' && toCat === 'weiblich') ||
                        (fromCat === 'weiblich' && toCat === 'maennlich')) {
                        return 100;
                    }
                    // Nonbinär/Fluid - partielle Kompatibilität
                    if (toCat === 'nonbinaer' || toCat === 'fluid') return 60;
                    // Gleiches Geschlecht = keine Attraktion
                    return 0;
                }

                if (ori === 'homosexuell') {
                    // Homo: Angezogen vom "gleichen" Geschlecht
                    if (fromCat === toCat && fromCat !== 'nonbinaer' && fromCat !== 'fluid') {
                        return 100;
                    }
                    // Nonbinär mit ähnlichen
                    if ((fromCat === 'nonbinaer' || fromCat === 'fluid') &&
                        (toCat === 'nonbinaer' || toCat === 'fluid')) {
                        return 85;
                    }
                    // Verschiedene binäre Geschlechter = keine Attraktion
                    if ((fromCat === 'maennlich' && toCat === 'weiblich') ||
                        (fromCat === 'weiblich' && toCat === 'maennlich')) {
                        return 0;
                    }
                    return 50; // Unsicher
                }

                return 50; // Unbekannte Orientierung
            };

            // Berechne Attraktion für Primär und Sekundär
            const primaryAttraction = checkAttraction(primaryOri, catA, catB);
            const secondaryAttraction = secondaryOri
                ? checkAttraction(secondaryOri, catA, catB)
                : 0;

            // Gewichtete Kombination
            // Wenn kein Secondary: nur Primary zählt (100%)
            if (!secondaryOri) {
                return primaryAttraction;
            }

            // Mit Secondary: P × 0.70 + S × 0.30
            return Math.round(primaryAttraction * PRIMARY_WEIGHT + secondaryAttraction * SECONDARY_WEIGHT);
        }

        /**
         * Berechnet BIDIREKTIONALE Attraktion zwischen zwei Personen
         * Beide Richtungen müssen passen!
         *
         * @param {object} person1 - { geschlecht: {primary, secondary}, orientierung: {primary, secondary} }
         * @param {object} person2 - { geschlecht: {primary, secondary}, orientierung: {primary, secondary} }
         * @returns {object} { score, direction1to2, direction2to1, details }
         */
        function calculateBidirectionalAttraction(person1, person2) {
            // Extrahiere effektive Geschlechter (nach Cis/Trans Transformation)
            const getEffectiveGender = (geschlecht) => {
                if (!geschlecht) return null;
                if (typeof geschlecht === 'string') return geschlecht;

                const primary = geschlecht.primary;   // Körper: mann, frau, inter
                const secondary = geschlecht.secondary; // Identität: cis, trans, nonbinaer

                if (!secondary || secondary === 'cis') return primary;
                if (secondary === 'trans') {
                    if (primary === 'mann') return 'frau';
                    if (primary === 'frau') return 'mann';
                    return primary;
                }
                if (secondary === 'nonbinaer') return 'nonbinaer';
                if (secondary === 'fluid') return 'fluid';

                return primary || secondary;
            };

            const gender1 = getEffectiveGender(person1.geschlecht);
            const gender2 = getEffectiveGender(person2.geschlecht);

            // Berechne beide Richtungen
            const attraction1to2 = calculateDirectionalAttraction(gender1, person1.orientierung, gender2);
            const attraction2to1 = calculateDirectionalAttraction(gender2, person2.orientierung, gender1);

            // Bidirektional: Durchschnitt beider Richtungen
            // Alternativ: Minimum (strenger) - aber Durchschnitt ist fairer
            const bidirectionalScore = Math.round((attraction1to2 + attraction2to1) / 2);

            return {
                score: bidirectionalScore,
                direction1to2: attraction1to2,
                direction2to1: attraction2to1,
                details: {
                    gender1,
                    gender2,
                    orientierung1: person1.orientierung,
                    orientierung2: person2.orientierung
                }
            };
        }

        /**
         * Berechnet R4 HYBRID: Kombination aus Identität + Bidirektionaler Attraktion
         *
         * Formel: R4 = 0.5 + (identity × 0.30 + attraction × 0.70) / 100
         *
         * @param {object} person1 - Vollständiges Profil
         * @param {object} person2 - Vollständiges Profil
         * @returns {object} { R4, identityScore, attractionScore, details }
         */
        function calculateR4Hybrid(person1, person2) {
            const IDENTITY_WEIGHT = 0.30;
            const ATTRACTION_WEIGHT = 0.70;

            // 1. Identitäts-Resonanz (Cis↔Cis, Trans↔Trans, etc.)
            const identity1 = person1.geschlecht?.secondary || 'cis';
            const identity2 = person2.geschlecht?.secondary || 'cis';
            const identityScore = calculateIdentityResonance(identity1, identity2);

            // 2. Bidirektionale Attraktion
            const attractionResult = calculateBidirectionalAttraction(person1, person2);
            const attractionScore = attractionResult.score;

            // 3. Hybrid-Kombination
            // v3.7: R4 = (combinedScore / 100)² - keine Obergrenze
            const combinedScore = identityScore * IDENTITY_WEIGHT + attractionScore * ATTRACTION_WEIGHT;
            const normalized = combinedScore / 100;
            const R4 = normalized * normalized;

            // v3.7: Keine Obergrenze - R4 kann > 1.0 sein wenn combinedScore > 100
            const R4Final = Math.max(0, R4);

            // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
            // console.log('[calculateR4Hybrid] Ergebnis:', {
            //     identityScore,
            //     attractionScore,
            //     combinedScore: Math.round(combinedScore),
            //     R4: Math.round(R4Final * 1000) / 1000,
            //     attraction1to2: attractionResult.direction1to2,
            //     attraction2to1: attractionResult.direction2to1
            // });

            return {
                R4: Math.round(R4Final * 1000) / 1000,
                identityScore,
                attractionScore,
                combinedScore: Math.round(combinedScore),
                attractionDetails: attractionResult
            };
        }

        // ═══════════════════════════════════════════════════════════════════════
        // RESONANZ-BERECHNUNG (Meta-Dimension)
        // ═══════════════════════════════════════════════════════════════════════
        // R = 0.9 + [(M/100 × 0.5) + (B × 0.5)] × 0.2
        // wobei:
        //   M = Profil-Match (0-100%): Übereinstimmung der 30 Attribute
        //   B = Balance (0-1): Harmonie zwischen Logos und Pathos
        // Ergebnis: R zwischen 0.9 und 1.1
        // ═══════════════════════════════════════════════════════════════════════

        // Die 30 Profil-Attribute in 3 Kategorien
        const PROFILE_ATTRIBUTES = {
            D: ['kinderWunsch', 'eheWunsch', 'wohnform', 'religion', 'karrierePrioritaet',
                'finanzPhilosophie', 'lebensstil', 'umzugsbereitschaft', 'zukunftsplanung', 'traditionenWichtigkeit'],
            E: ['kommunikationsstil', 'konfliktverhalten', 'emotionaleOffenheit', 'gespraechsBedürfnis', 'feedbackStil',
                'entschuldigungen', 'streitVerhalten', 'versoehnung', 'kritikAnnehmen', 'humorKonflikte'],
            F: ['introExtro', 'familieWichtigkeit', 'freundeskreis', 'oeffentlichkeit', 'alleinzeit',
                'events', 'reisen', 'hobbys', 'wochenende', 'netzwerkGroesse']
        };

        /**
         * Berechnet den Profil-Match-Score (M)
         * Vergleicht die 30 Attribute zweier psychologischer Profile
         * Nutzt TiageProfileStore für 648 P/S-basierte Profile
         * @returns {number} Match-Prozent 0-100
         */
        function calculateProfilMatch(person1, person2) {
            // TiageProfileStore verfügbar?
            if (typeof TiageProfileStore === 'undefined') {
                // Fallback: Schätze Match basierend auf Archetyp-Ähnlichkeit
                return estimateProfilMatch(person1, person2);
            }

            // Profile aus TiageProfileStore laden (synchron)
            const profile1 = getProfileFromStore(person1);
            const profile2 = getProfileFromStore(person2);

            if (!profile1 || !profile2) {
                return estimateProfilMatch(person1, person2);
            }

            // Zähle übereinstimmende Attribute
            let matches = 0;
            const allAttributes = [...PROFILE_ATTRIBUTES.D, ...PROFILE_ATTRIBUTES.E, ...PROFILE_ATTRIBUTES.F];
            const attrs1 = profile1.attributes || profile1;
            const attrs2 = profile2.attributes || profile2;

            for (const attr of allAttributes) {
                if (attrs1[attr] && attrs2[attr]) {
                    if (attrs1[attr] === attrs2[attr]) {
                        matches++;
                    } else if (areAttributesCompatible(attr, attrs1[attr], attrs2[attr])) {
                        matches += 0.5; // Partielle Übereinstimmung
                    }
                }
            }

            return Math.round((matches / 30) * 100);
        }

        /**
         * Lädt ein Profil aus TiageProfileStore basierend auf Person-Daten
         */
        /**
         * Berechnet Bedürfnis-Matching direkt aus TiageState.flatNeeds
         * Verwendet die individualisierten Werte (Archetyp + Modifikatoren)
         * und berücksichtigt manuell gelockte Werte (lockedNeeds)
         *
         * @returns {Object|null} { score, gemeinsam, komplementaer, unterschiedlich } oder null
         */
        function calculateNeedsMatchFromFlatNeeds() {
            if (typeof TiageState === 'undefined') {
                return null;
            }

            // flatNeeds aus TiageState holen (Archetyp + D/G/O Modifikatoren)
            const ichFlatNeeds = TiageState.getFlatNeeds('ich') || {};
            const partnerFlatNeeds = TiageState.getFlatNeeds('partner') || {};

            // Prüfen ob Daten vorhanden
            const ichKeys = Object.keys(ichFlatNeeds);
            const partnerKeys = Object.keys(partnerFlatNeeds);

            // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
            // console.log('[calculateNeedsMatchFromFlatNeeds] Vergleich:', {
            //     ichCount: ichKeys.length,
            //     partnerCount: partnerKeys.length,
            //     ichSample: ichKeys.slice(0, 5).reduce((o, k) => ({ ...o, [k]: ichFlatNeeds[k] }), {}),
            //     partnerSample: partnerKeys.slice(0, 5).reduce((o, k) => ({ ...o, [k]: partnerFlatNeeds[k] }), {}),
            //     ichDimensions: TiageState.get('personDimensions.ich'),
            //     partnerDimensions: TiageState.get('personDimensions.partner')
            // });

            if (ichKeys.length === 0 || partnerKeys.length === 0) {
                return null; // Keine Daten verfügbar
            }

            // lockedNeeds holen (überschreiben flatNeeds)
            const ichLockedNeeds = TiageState.getLockedNeeds('ich') || {};
            const partnerLockedNeeds = TiageState.getLockedNeeds('partner') || {};

            // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
            // const ichLockedCount = Object.keys(ichLockedNeeds).length;
            // const partnerLockedCount = Object.keys(partnerLockedNeeds).length;
            // if (ichLockedCount > 0 || partnerLockedCount > 0) {
            //     console.log('[calculateNeedsMatchFromFlatNeeds] LockedNeeds:', {
            //         ichLocked: ichLockedCount,
            //         partnerLocked: partnerLockedCount
            //     });
            // }

            // Finale Werte: lockedNeeds überschreiben flatNeeds
            const getFinalValue = (person, needId) => {
                const locked = person === 'ich' ? ichLockedNeeds[needId] : partnerLockedNeeds[needId];
                const flat = person === 'ich' ? ichFlatNeeds[needId] : partnerFlatNeeds[needId];

                // lockedNeeds haben Priorität
                if (locked !== undefined && locked !== null) return locked;
                if (flat !== undefined && flat !== null) return flat;
                return null;
            };

            // Alle Bedürfnis-IDs sammeln (Union von beiden)
            const allNeedIds = new Set([...ichKeys, ...partnerKeys]);

            const gemeinsam = [];
            const komplementaer = [];
            const unterschiedlich = [];

            // Matching berechnen
            allNeedIds.forEach(needId => {
                const wert1 = getFinalValue('ich', needId);
                const wert2 = getFinalValue('partner', needId);

                // Skip wenn einer der Werte fehlt
                if (wert1 === null || wert2 === null) return;

                const diff = Math.abs(wert1 - wert2);

                const item = {
                    need: needId,       // '#B1', '#B2', etc.
                    wert1: wert1,
                    wert2: wert2
                };

                // Kategorisierung basierend auf Differenz
                if (diff <= 15) {
                    gemeinsam.push(item);           // Übereinstimmung (0-15)
                } else if (diff <= 35) {
                    komplementaer.push(item);       // Komplementär (16-35)
                } else {
                    unterschiedlich.push(item);     // Konflikt (36+)
                }
            });

            // Score berechnen (gewichtet)
            const totalItems = gemeinsam.length + komplementaer.length + unterschiedlich.length;
            if (totalItems === 0) return null;

            const score = Math.round(
                ((gemeinsam.length * 100) + (komplementaer.length * 60) + (unterschiedlich.length * 20)) / totalItems
            );

            return {
                score: score,
                gemeinsam: gemeinsam,
                komplementaer: komplementaer,
                unterschiedlich: unterschiedlich
            };
        }


        // ═══════════════════════════════════════════════════════════════════════════
        // CALCULATION ENGINE
        // NOTE: Moved to js/synthesis/calculationEngine.js
        // Functions available via window.*:
        // - getProfileFromStore, estimateProfilMatch, areAttributesCompatible
        // - calculateRelationshipQuality, calculateOverallWithModifiers
        // - calculateLogosPathosBalance, calculateResonanz
        // - calculateKSubfaktor, calculateGfkFactor, calculateRFactorsFromNeeds
        // - getPrimaryDominanz, getPrimaryOrientierung, getModifierSummary
        // ═══════════════════════════════════════════════════════════════════════════
        // ========================================
        // NEW: Side-by-Side Comparison Functions
        // ========================================

        // Navigate through archetypes with forward/backward buttons
        function navigateArchetype(person, direction) {
            const selectId = person === 'ich' ? 'ichSelect' : 'partnerSelect';
            const mobileSelectId = person === 'ich' ? 'mobileIchSelect' : 'mobilePartnerSelect';
            const select = document.getElementById(selectId);
            const mobileSelect = document.getElementById(mobileSelectId);

            // Use whichever select is visible/available
            const activeSelect = select || mobileSelect;
            if (!activeSelect) return;

            const currentIndex = activeSelect.selectedIndex;
            const optionsCount = activeSelect.options.length;
            let newIndex = currentIndex + direction;

            // Wrap around
            if (newIndex < 0) newIndex = optionsCount - 1;
            if (newIndex >= optionsCount) newIndex = 0;

            // Update both desktop and mobile selects
            if (select) select.selectedIndex = newIndex;
            if (mobileSelect) mobileSelect.selectedIndex = newIndex;

            // Update global state variables
            const newValue = activeSelect.options[newIndex].value;
            if (person === 'ich') {
                currentArchetype = newValue;
                mobileIchArchetype = newValue;
            } else {
                selectedPartner = newValue;
                mobilePartnerArchetype = newValue;
            }

            // Sync with TiageState for persistence (WICHTIG: Sofort speichern!)
            if (typeof TiageState !== 'undefined') {
                TiageState.setArchetype(person, newValue);
            }

            // Trigger change event on the active select
            activeSelect.dispatchEvent(new Event('change'));

            // Update archetype grid
            updateArchetypeGrid(person, newValue);
        }

        // Function to select archetype from grid click
        function selectArchetypeFromGrid(person, archetype) {
            console.log('[selectArchetypeFromGrid] Aufgerufen für:', person, 'archetype:', archetype);

            // ═══════════════════════════════════════════════════════════════
            // v1.8.908: Partner-Archetyp ist abwählbar (wie GOD)
            // Klick auf bereits ausgewählten Archetyp = Deselect (null)
            // ICH-Archetyp ist NICHT abwählbar (muss immer gesetzt sein)
            // ═══════════════════════════════════════════════════════════════
            let effectiveArchetype = archetype;
            if (person === 'partner') {
                const currentPartnerArchetype = selectedPartner;
                if (archetype === currentPartnerArchetype) {
                    // Klick auf gleichen Archetyp: Deselect
                    effectiveArchetype = null;
                    console.log('[selectArchetypeFromGrid] Partner-Archetyp deselektiert');
                }
            }

            const selectId = person === 'ich' ? 'ichSelect' : 'partnerSelect';
            const mobileSelectId = person === 'ich' ? 'mobileIchSelect' : 'mobilePartnerSelect';
            const select = document.getElementById(selectId);
            const mobileSelect = document.getElementById(mobileSelectId);

            // Update select elements
            if (effectiveArchetype) {
                if (select) {
                    for (let i = 0; i < select.options.length; i++) {
                        if (select.options[i].value === effectiveArchetype) {
                            select.selectedIndex = i;
                            break;
                        }
                    }
                }
                if (mobileSelect) {
                    for (let i = 0; i < mobileSelect.options.length; i++) {
                        if (mobileSelect.options[i].value === effectiveArchetype) {
                            mobileSelect.selectedIndex = i;
                            break;
                        }
                    }
                }
            } else {
                // Deselected: Reset select to first option or empty
                if (select) select.selectedIndex = 0;
                if (mobileSelect) mobileSelect.selectedIndex = 0;
            }

            // Update global state variables
            if (person === 'ich') {
                currentArchetype = effectiveArchetype || 'duo'; // ICH muss immer gesetzt sein
                mobileIchArchetype = currentArchetype;
            } else {
                selectedPartner = effectiveArchetype; // Partner kann null sein
                mobilePartnerArchetype = effectiveArchetype;
            }

            // Sync with TiageState for persistence
            // SSOT: setArchetype() löst synchron die Subscriber aus, die
            // flatNeeds UND Resonanzfaktoren automatisch neu berechnen
            if (typeof TiageState !== 'undefined') {
                TiageState.setArchetype(person, effectiveArchetype);
            }

            // ═══════════════════════════════════════════════════════════════
            // SSOT: Berechne flatNeeds + Resonanzfaktoren bei Archetyp-Wechsel
            // ProfileCalculator.loadProfile() schreibt direkt in TiageState
            // WICHTIG: Muss VOR updateComparisonView() aufgerufen werden!
            // ═══════════════════════════════════════════════════════════════
            if (effectiveArchetype && typeof ProfileCalculator !== 'undefined' && typeof TiageState !== 'undefined') {
                const profileData = {
                    archetyp: effectiveArchetype,
                    geschlecht: TiageState.get(`personDimensions.${person}.geschlecht`),
                    dominanz: TiageState.get(`personDimensions.${person}.dominanz`),
                    orientierung: TiageState.get(`personDimensions.${person}.orientierung`)
                };
                ProfileCalculator.loadProfile(person, profileData);
                console.log(`[selectArchetypeFromGrid] Profil für ${person.toUpperCase()} neu berechnet:`, effectiveArchetype);
            } else if (!effectiveArchetype && person === 'partner') {
                // Partner deselektiert: R-Faktoren auf Default zurücksetzen
                if (typeof TiageState !== 'undefined') {
                    const defaultRFaktoren = {
                        R1: { value: 1.0, locked: false },
                        R2: { value: 1.0, locked: false },
                        R3: { value: 1.0, locked: false },
                        R4: { value: 1.0, locked: false }
                    };
                    TiageState.setResonanzFaktoren('partner', defaultRFaktoren);
                    TiageState.set('flatNeeds.partner', {});
                    console.log('[selectArchetypeFromGrid] Partner R-Faktoren + flatNeeds zurückgesetzt');
                }
            }

            // Update archetype grid highlighting
            updateArchetypeGrid(person, effectiveArchetype);

            // Trigger change event - use bubbles: true to ensure it propagates
            const activeSelect = select || mobileSelect;
            if (activeSelect) {
                activeSelect.dispatchEvent(new Event('change', { bubbles: true }));
            }

            // Update comparison view directly to ensure UI updates even without change event
            if (typeof updateComparisonView === 'function') {
                updateComparisonView();
            }

            // Update GFK from archetypes
            if (typeof updateGfkFromArchetypes === 'function') {
                updateGfkFromArchetypes();
            }

            // Toast
            const archetypeEmojis = { duo: '🤝', solo: '⚡', lat: '🌙', solopoly: '🌟', duo_flex: '🔄', aromantisch: '🧊' };
            const personLabel = person === 'ich' ? 'ICH' : 'PARTNER';
            if (effectiveArchetype) {
                const emoji = archetypeEmojis[effectiveArchetype] || '';
                TiageToast.success(personLabel + ': ' + effectiveArchetype.charAt(0).toUpperCase() + effectiveArchetype.slice(1) + ' ' + emoji);
            } else {
                TiageToast.info(personLabel + ' deselektiert');
            }

            console.log('[selectArchetypeFromGrid] Abgeschlossen für:', person, 'archetype:', effectiveArchetype);
        }

        // Function to update archetype grid highlighting
        function updateArchetypeGrid(person, archetype) {
            // Desktop grid IDs
            const gridId = person === 'ich' ? 'ich-archetype-grid' : 'partner-archetype-grid';
            // Mobile grid IDs
            const mobileGridId = person === 'ich' ? 'mobile-ich-archetype-grid' : 'mobile-partner-archetype-grid';

            // Update all grids (desktop and mobile)
            [gridId, mobileGridId].forEach(id => {
                const grid = document.getElementById(id);
                if (!grid) return;

                // Remove active class from all items
                grid.querySelectorAll('.archetype-symbol-item').forEach(item => {
                    item.classList.remove('active');
                });

                // Add active class to selected item
                const selectedItem = grid.querySelector(`.archetype-symbol-item[data-archetype="${archetype}"]`);
                if (selectedItem) {
                    selectedItem.classList.add('active');
                }
            });
        }

        // ═══════════════════════════════════════════════════════════════════════
        // BEST MATCH FINDER - Findet den besten Partner-Archetyp
        // ═══════════════════════════════════════════════════════════════════════
        /**
         * Berechnet und wählt automatisch den besten Partner-Archetyp
         * basierend auf den aktuellen ICH-Einstellungen (Archetyp, Dimensionen, Gewichtungen)
         *
         * ═══════════════════════════════════════════════════════════════════════
         * TIAGE SYNTHESE v3.1 FORMEL
         * ═══════════════════════════════════════════════════════════════════════
         *
         * Basis-Formel:
         *   Q = [(A × wₐ) + (O × wₒ) + (D × wᵈ) + (G × wᵍ)] × R
         *
         * Gewichtungen (constants.js):
         *   A (Archetyp/LOGOS)    = 15%  - Beziehungsphilosophie
         *   O (Orientierung)      = 40%  - Sexuelle Orientierung
         *   D (Dominanz)          = 20%  - Dom/Sub/Switch Dynamik
         *   G (Geschlecht)        = 25%  - Gender-Attraktion
         *
         * v3.1 Dimensionale Resonanz (wenn Bedürfnis-Profile vorhanden):
         *   Q = (A × wₐ × R_Philosophie) +
         *       (O × wₒ × R_Leben) +
         *       (D × wᵈ × R_Dynamik) +
         *       (G × wᵍ × R_Identität)
         *
         * Wobei R_dim = 0.9 + (Bedürfnis-Match × 0.2), also 0.9-1.1
         *
         * Fallback (ohne Profile): Q = baseScore × R_gesamt
         * ═══════════════════════════════════════════════════════════════════════
         */
        // Hilfsfunktion: Stellt sicher, dass Geschlechts-Objekt valide Werte hat
        // FIX v4.1.2: Unterstützt sowohl String-Format (v4.0) als auch Objekt-Format {primary, secondary}
        function ensureValidGeschlecht(geschlechtObj) {
            // v4.0: String-Format (z.B. "frau", "mann", "nonbinaer")
            if (typeof geschlechtObj === 'string' && geschlechtObj) {
                return {
                    primary: geschlechtObj,
                    secondary: 'cis'    // Default für v4.0 String-Format
                };
            }
            // Legacy/Full: Objekt-Format {primary, secondary}
            const g = geschlechtObj || {};
            return {
                primary: g.primary || 'mann',      // Default: mann
                secondary: g.secondary || 'cis'    // Default: cis
            };
        }

        // Hilfsfunktion: Stellt sicher, dass Dominanz-Objekt valide Werte hat
        // FIX v4.1.2: Unterstützt sowohl String-Format (v4.0) als auch Objekt-Format {primary, secondary}
        function ensureValidDominanz(dominanzObj) {
            // v4.0: String-Format (z.B. "dominant", "submissiv", "switch", "ausgeglichen")
            if (typeof dominanzObj === 'string' && dominanzObj) {
                return {
                    primary: dominanzObj,
                    secondary: null
                };
            }
            // Legacy/Full: Objekt-Format {primary, secondary}
            const d = dominanzObj || {};
            return {
                primary: d.primary || 'ausgeglichen',
                secondary: d.secondary || null
            };
        }

        // Hilfsfunktion: Stellt sicher, dass Orientierungs-Objekt valide Werte hat
        // FIX v4.1.2: Unterstützt String, Array und Objekt-Format
        function ensureValidOrientierung(orientierungObj) {
            // v4.0: String-Format (z.B. "heterosexuell", "homosexuell", "bisexuell")
            if (typeof orientierungObj === 'string' && orientierungObj) {
                return {
                    primary: orientierungObj,
                    secondary: null,
                    all: [orientierungObj]
                };
            }
            // v4.1.1: Array-Format (UI speichert als Array)
            if (Array.isArray(orientierungObj) && orientierungObj.length > 0) {
                return {
                    primary: orientierungObj[0] || 'heterosexuell',
                    secondary: orientierungObj.length > 1 ? orientierungObj[1] : null,
                    // Alle weiteren Orientierungen für erweiterte Kompatibilität
                    all: orientierungObj
                };
            }
            // Legacy: Objekt-Format {primary, secondary}
            const o = orientierungObj || {};
            return {
                primary: o.primary || 'heterosexuell',
                secondary: o.secondary || null,
                all: o.all || [o.primary || 'heterosexuell'].concat(o.secondary ? [o.secondary] : [])
            };
        }

        function findBestPartnerMatch() {
            // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
            // console.log('[findBestPartnerMatch] Funktion aufgerufen');
            // console.log('[findBestPartnerMatch] data geladen:', data !== null);
            // console.log('[findBestPartnerMatch] personDimensions:', JSON.stringify(personDimensions));

            // Prüfe, ob data geladen ist
            if (!data) {
                console.warn('[findBestPartnerMatch] WARNUNG: data ist nicht geladen! Verwende Fallback-Matrix.');
            }

            const ALL_ARCHETYPES = ['single', 'duo', 'duo_flex', 'ra', 'lat', 'aromantisch', 'solopoly', 'polyamor'];

            // v3.6: Hole echte Needs aus TiageState für R-Faktor-Berechnung
            let ichNeeds = null;
            let partnerNeeds = null;
            if (typeof TiageState !== 'undefined') {
                // FIX v4.3: getFlatNeeds() statt get() — gibt flache Needs für aktuellen Archetyp zurück
                ichNeeds = TiageState.getFlatNeeds ? TiageState.getFlatNeeds('ich') : null;
                partnerNeeds = TiageState.getFlatNeeds ? TiageState.getFlatNeeds('partner') : null;
            }

            // Sammle ICH-Daten (feste Basis)
            const ichArchetype = currentArchetype || 'single';
            const ichDims = personDimensions.ich || {};

            // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
            // console.log('[findBestPartnerMatch] currentArchetype:', currentArchetype, '-> verwendet:', ichArchetype);

            // Sammle Partner-Dimensionen (für die Berechnung)
            const partnerDims = personDimensions.partner || {};

            // Validierte Dimensionen mit Defaults für fehlende Werte
            const validIchGeschlecht = ensureValidGeschlecht(ichDims.geschlecht);
            const validIchDominanz = ensureValidDominanz(ichDims.dominanz);
            const validIchOrientierung = ensureValidOrientierung(ichDims.orientierung);

            // BUGFIX: Wenn Partner-Dimensionen fehlen, verwende kompatible Defaults
            // statt feste Defaults die möglicherweise inkompatibel sind
            const partnerHasGeschlecht = partnerDims.geschlecht && partnerDims.geschlecht.primary;
            const partnerHasOrientierung = partnerDims.orientierung && partnerDims.orientierung.primary;

            let validPartnerGeschlecht;
            if (partnerHasGeschlecht) {
                validPartnerGeschlecht = ensureValidGeschlecht(partnerDims.geschlecht);
            } else {
                // Setze kompatibles Geschlecht basierend auf ICH-Orientierung
                const ichOriPrimary = validIchOrientierung.primary;
                const ichGeschPrimary = validIchGeschlecht.primary;
                if (ichOriPrimary === 'heterosexuell') {
                    // Heterosexuell: Partner sollte anderes Geschlecht haben
                    validPartnerGeschlecht = {
                        primary: ichGeschPrimary === 'mann' ? 'frau' : 'mann',
                        secondary: 'cis'
                    };
                } else {
                    // Homosexuell/bi-pansexuell: Gleiches Geschlecht ist kompatibel
                    validPartnerGeschlecht = {
                        primary: ichGeschPrimary,
                        secondary: 'cis'
                    };
                }
                // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
                // console.log('[findBestPartnerMatch] Partner-Geschlecht nicht gesetzt, verwende kompatiblen Default:', validPartnerGeschlecht);
            }

            let validPartnerOrientierung;
            if (partnerHasOrientierung) {
                validPartnerOrientierung = ensureValidOrientierung(partnerDims.orientierung);
            } else {
                // Setze kompatible Orientierung basierend auf ICH
                validPartnerOrientierung = {
                    primary: validIchOrientierung.primary,
                    secondary: validIchOrientierung.secondary
                };
                // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
                // console.log('[findBestPartnerMatch] Partner-Orientierung nicht gesetzt, verwende ICH-Orientierung:', validPartnerOrientierung);
            }

            // FEATURE: Dominanz-Auto-Korrelation - komplementäre Dominanz für beste Kompatibilität
            const partnerHasDominanz = partnerDims.dominanz && partnerDims.dominanz.primary;
            let validPartnerDominanz;
            if (partnerHasDominanz) {
                validPartnerDominanz = ensureValidDominanz(partnerDims.dominanz);
            } else {
                // Setze komplementäre Dominanz basierend auf ICH für maximalen Modifier (+8)
                const ichDomPrimary = validIchDominanz.primary;
                if (ichDomPrimary === 'dominant') {
                    // dominant + submissiv = +8 Modifier (beste Kombination)
                    validPartnerDominanz = { primary: 'submissiv', secondary: null };
                } else if (ichDomPrimary === 'submissiv') {
                    // submissiv + dominant = +8 Modifier (beste Kombination)
                    validPartnerDominanz = { primary: 'dominant', secondary: null };
                } else if (ichDomPrimary === 'switch') {
                    // switch + switch = +3 Modifier
                    validPartnerDominanz = { primary: 'switch', secondary: null };
                } else {
                    // ausgeglichen + ausgeglichen = +5 Modifier
                    validPartnerDominanz = { primary: 'ausgeglichen', secondary: null };
                }
                // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
                // console.log('[findBestPartnerMatch] Partner-Dominanz nicht gesetzt, verwende komplementären Default:', validPartnerDominanz);
            }

            // FEATURE: GFK-Auto-Korrelation - gleiche oder höhere GFK-Kompetenz
            const partnerHasGfk = partnerDims.gfk && partnerDims.gfk !== '';
            let validPartnerGfk;
            if (partnerHasGfk) {
                validPartnerGfk = partnerDims.gfk;
            } else {
                // Setze GFK basierend auf ICH - gleich oder höher für beste Kompatibilität
                const ichGfk = ichDims.gfk || 'mittel';
                // hoch-hoch = 100, mittel-mittel = 65, niedrig-niedrig = 25
                // Für beste Kompatibilität: Gleiche Stufe oder höher
                if (ichGfk === 'hoch') {
                    validPartnerGfk = 'hoch'; // hoch-hoch = 100
                } else if (ichGfk === 'mittel') {
                    validPartnerGfk = 'hoch'; // mittel-hoch = 75 (besser als mittel-mittel = 65)
                } else {
                    validPartnerGfk = 'mittel'; // niedrig-mittel = 45 (besser als niedrig-niedrig = 25)
                }
                // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
                // console.log('[findBestPartnerMatch] Partner-GFK nicht gesetzt, verwende optimalen Default:', validPartnerGfk);
            }

            // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
            // console.log('[findBestPartnerMatch] Validierte ICH-Dimensionen:', {
            //     geschlecht: validIchGeschlecht,
            //     dominanz: validIchDominanz,
            //     orientierung: validIchOrientierung,
            //     gfk: ichDims.gfk || 'mittel'
            // });
            // console.log('[findBestPartnerMatch] Validierte Partner-Dimensionen:', {
            //     geschlecht: validPartnerGeschlecht,
            //     dominanz: validPartnerDominanz,
            //     orientierung: validPartnerOrientierung,
            //     gfk: validPartnerGfk
            // });

            let bestMatch = null;
            let bestScore = -1;
            const results = [];

            // Berechne Score für jeden möglichen Partner-Archetyp
            for (const partnerArch of ALL_ARCHETYPES) {
                try {
                    // Erstelle temporäre Person-Objekte für die Berechnung
                    // Person1 = ICH (die festen Einstellungen)
                    const person1 = {
                        archetyp: ichArchetype,
                        dominanz: validIchDominanz,
                        geschlecht: validIchGeschlecht,
                        orientierung: validIchOrientierung,
                        gfk: ichDims.gfk || 'mittel',
                        needs: ichNeeds  // v3.6: Echte Needs für R-Faktor-Berechnung
                    };

                    // Person2 = PARTNER (der Archetyp, der getestet wird)
                    const person2 = {
                        archetyp: partnerArch,
                        dominanz: validPartnerDominanz,
                        geschlecht: validPartnerGeschlecht,
                        orientierung: validPartnerOrientierung,
                        gfk: validPartnerGfk,
                        needs: partnerNeeds  // v3.6: Echte Needs für R-Faktor-Berechnung
                    };

                    let score = 0;

                    // WICHTIG: Verwende dieselbe Berechnung wie updateComparisonView()
                    // um konsistente Scores zu erhalten

                    // Temporär globale Variablen setzen für calculateRelationshipQuality
                    const savedCurrentArchetype = currentArchetype;
                    const savedSelectedPartner = selectedPartner;
                    currentArchetype = ichArchetype;
                    selectedPartner = partnerArch;

                    try {
                        const pathosCheck = checkPhysicalCompatibility(person1, person2);
                        const logosCheck = calculatePhilosophyCompatibility(ichArchetype, partnerArch);

                        // v4.0 FIX: 'hohe_reibung' aus physicalCompatibility.js muss auch als inkompatibel behandelt werden
                        const isIncompatible = pathosCheck.result === 'unmöglich' || pathosCheck.result === 'hohe_reibung';

                        if (!isIncompatible && pathosCheck.result !== 'unvollständig') {
                            // SSOT v3.10: R-Faktoren aus person.needs
                            const result = calculateOverallWithModifiers(person1, person2, pathosCheck, logosCheck);
                            let baseScore = result.overall || 0;

                            // SSOT v3.7: Konfidenz-Multiplikator anwenden
                            const confidenceMultiplier = getConfidenceMultiplier(pathosCheck.confidence);
                            score = Math.round(baseScore * confidenceMultiplier * 10) / 10;
                        } else if (pathosCheck.result === 'unvollständig') {
                            // Bei unvollständigen Dimensionen: Fallback auf Archetyp-Matrix
                            const logosScore = logosCheck.score || 50;
                            score = logosScore;
                        }
                        // Bei 'unmöglich' oder 'hohe_reibung': score bleibt 0
                    } finally {
                        // Globale Variablen wiederherstellen
                        currentArchetype = savedCurrentArchetype;
                        selectedPartner = savedSelectedPartner;
                    }

                    results.push({ archetype: partnerArch, score: score });

                    if (score > bestScore) {
                        bestScore = score;
                        bestMatch = partnerArch;
                    }
                } catch (e) {
                    console.warn(`[findBestPartnerMatch] Fehler bei der Berechnung für ${partnerArch}:`, e);
                }
            }

            // Sortiere Ergebnisse nach Score
            results.sort((a, b) => b.score - a.score);
            console.log('[findBestPartnerMatch] ICH:', ichArchetype);
            console.log('[findBestPartnerMatch] Ranking:', results);

            // Wähle den besten Match aus, der NICHT derselbe Archetyp wie ICH ist
            // (nächstbester statt identischer Archetyp)
            const bestDifferentMatch = results.find(r => r.archetype !== ichArchetype);
            if (bestDifferentMatch) {
                bestMatch = bestDifferentMatch.archetype;
                bestScore = bestDifferentMatch.score;
            }

            console.log('[findBestPartnerMatch] Bester Match (≠ ICH):', bestMatch, 'mit Score:', bestScore);

            // Wähle den besten Match aus
            if (bestMatch) {
                selectArchetypeFromGrid('partner', bestMatch);

                // Zeige kurze Feedback-Animation auf dem Button
                const matchBtns = document.querySelectorAll('.best-match-btn');
                matchBtns.forEach(btn => {
                    btn.classList.add('match-found');
                    setTimeout(() => btn.classList.remove('match-found'), 1000);
                });
            }

            return { bestMatch, bestScore, results };
        }

        // ═══════════════════════════════════════════════════════════════════════
        // SLOT MACHINE - Ausgelagert in js/modals/slotMachineModal.js
        // ═══════════════════════════════════════════════════════════════════════



        // ═══════════════════════════════════════════════════════════════════════
        // HILFSFUNKTIONEN FÜR DIMENSIONEN
        // ═══════════════════════════════════════════════════════════════════════

        // Extrahiert primäre Dominanz aus dem Dominanz-Objekt
        function getPrimaryDominanz(dominanzObj) {
            if (!dominanzObj) return 'ausgeglichen';
            for (const type of ['dominant', 'submissiv', 'switch', 'ausgeglichen']) {
                if (dominanzObj[type] === 'gelebt') return type;
            }
            return 'ausgeglichen';
        }

        // Extrahiert primäre Orientierung aus dem Orientierungs-Objekt
        function getPrimaryOrientierung(orientierungObj) {
            if (!orientierungObj) return 'heterosexuell';
            for (const type of ['heterosexuell', 'homosexuell', 'bisexuell', 'pansexuell']) {
                if (orientierungObj[type] === 'gelebt') return type;
            }
            return 'heterosexuell';
        }

        // Extrahiert primäres Geschlecht aus dem Geschlechts-Objekt
        function getPrimaryGeschlecht(geschlechtObj) {
            if (!geschlechtObj) return 'mann';
            const primary = geschlechtObj.primary;
            if (primary) return primary.toLowerCase();
            return 'mann';
        }

        /**
         * findBestIchMatch() - Findet den besten ICH-Archetyp basierend auf den Partner-Einstellungen
         * Umgekehrte Logik zu findBestPartnerMatch(): Hier werden die PARTNER-Einstellungen als Basis genommen
         * und der beste ICH-Archetyp gesucht.
         *
         * ═══════════════════════════════════════════════════════════════════════
         * TIAGE SYNTHESE v3.1 FORMEL (siehe findBestPartnerMatch für Details)
         * ═══════════════════════════════════════════════════════════════════════
         *
         * Q = [(A × 0.15) + (O × 0.40) + (D × 0.20) + (G × 0.25)] × R
         *
         * v3.1: Q = Σ(Faktor × Gewicht × R_Dimension)
         * ═══════════════════════════════════════════════════════════════════════
         */
        function findBestIchMatch() {
            console.log('[findBestIchMatch] Funktion aufgerufen');
            console.log('[findBestIchMatch] data geladen:', data !== null);
            console.log('[findBestIchMatch] personDimensions:', JSON.stringify(personDimensions));

            // Prüfe, ob data geladen ist
            if (!data) {
                console.warn('[findBestIchMatch] WARNUNG: data ist nicht geladen! Verwende Fallback-Matrix.');
            }

            const ALL_ARCHETYPES = ['single', 'duo', 'duo_flex', 'ra', 'lat', 'aromantisch', 'solopoly', 'polyamor'];

            // v3.6: Hole echte Needs aus TiageState für R-Faktor-Berechnung
            let ichNeeds = null;
            let partnerNeeds = null;
            if (typeof TiageState !== 'undefined') {
                // FIX v4.3: getFlatNeeds() statt get() — gibt flache Needs für aktuellen Archetyp zurück
                ichNeeds = TiageState.getFlatNeeds ? TiageState.getFlatNeeds('ich') : null;
                partnerNeeds = TiageState.getFlatNeeds ? TiageState.getFlatNeeds('partner') : null;
                console.log('[findBestIchMatch] Echte Needs geladen:', {
                    ichNeeds: ichNeeds ? Object.keys(ichNeeds).length : 0,
                    partnerNeeds: partnerNeeds ? Object.keys(partnerNeeds).length : 0
                });
            }

            // Sammle PARTNER-Daten (DU) als Basis
            const partnerArchetype = selectedPartner || 'duo';
            const partnerDims = personDimensions.partner || {};

            // Sammle ICH-Dimensionen (für die Berechnung)
            const ichDims = personDimensions.ich || {};

            // Validierte Dimensionen mit Defaults für fehlende Werte
            const validIchGeschlecht = ensureValidGeschlecht(ichDims.geschlecht);
            const validIchDominanz = ensureValidDominanz(ichDims.dominanz);
            const validIchOrientierung = ensureValidOrientierung(ichDims.orientierung);

            // BUGFIX: Wenn Partner-Dimensionen fehlen, verwende kompatible Defaults
            // statt feste Defaults die möglicherweise inkompatibel sind
            const partnerHasGeschlecht = partnerDims.geschlecht && partnerDims.geschlecht.primary;
            const partnerHasOrientierung = partnerDims.orientierung && partnerDims.orientierung.primary;

            let validPartnerGeschlecht;
            if (partnerHasGeschlecht) {
                validPartnerGeschlecht = ensureValidGeschlecht(partnerDims.geschlecht);
            } else {
                // Setze kompatibles Geschlecht basierend auf ICH-Orientierung
                // Für heterosexuell: gegengeschlechtlich, sonst gleiches Geschlecht
                const ichOriPrimary = validIchOrientierung.primary;
                const ichGeschPrimary = validIchGeschlecht.primary;
                if (ichOriPrimary === 'heterosexuell') {
                    // Heterosexuell: Partner sollte anderes Geschlecht haben
                    validPartnerGeschlecht = {
                        primary: ichGeschPrimary === 'mann' ? 'frau' : 'mann',
                        secondary: 'cis'
                    };
                } else {
                    // Homosexuell/bi-pansexuell: Gleiches Geschlecht ist kompatibel
                    validPartnerGeschlecht = {
                        primary: ichGeschPrimary,
                        secondary: 'cis'
                    };
                }
                console.log('[findBestIchMatch] Partner-Geschlecht nicht gesetzt, verwende kompatiblen Default:', validPartnerGeschlecht);
            }

            let validPartnerOrientierung;
            if (partnerHasOrientierung) {
                validPartnerOrientierung = ensureValidOrientierung(partnerDims.orientierung);
            } else {
                // Setze kompatible Orientierung basierend auf ICH
                validPartnerOrientierung = {
                    primary: validIchOrientierung.primary,
                    secondary: validIchOrientierung.secondary
                };
                console.log('[findBestIchMatch] Partner-Orientierung nicht gesetzt, verwende ICH-Orientierung:', validPartnerOrientierung);
            }

            // FEATURE: Dominanz-Auto-Korrelation - komplementäre Dominanz für beste Kompatibilität
            const partnerHasDominanz = partnerDims.dominanz && partnerDims.dominanz.primary;
            let validPartnerDominanz;
            if (partnerHasDominanz) {
                validPartnerDominanz = ensureValidDominanz(partnerDims.dominanz);
            } else {
                // Setze komplementäre Dominanz basierend auf ICH für maximalen Modifier (+8)
                const ichDomPrimary = validIchDominanz.primary;
                if (ichDomPrimary === 'dominant') {
                    // dominant + submissiv = +8 Modifier (beste Kombination)
                    validPartnerDominanz = { primary: 'submissiv', secondary: null };
                } else if (ichDomPrimary === 'submissiv') {
                    // submissiv + dominant = +8 Modifier (beste Kombination)
                    validPartnerDominanz = { primary: 'dominant', secondary: null };
                } else if (ichDomPrimary === 'switch') {
                    // switch + switch = +3 Modifier
                    validPartnerDominanz = { primary: 'switch', secondary: null };
                } else {
                    // ausgeglichen + ausgeglichen = +5 Modifier
                    validPartnerDominanz = { primary: 'ausgeglichen', secondary: null };
                }
                console.log('[findBestIchMatch] Partner-Dominanz nicht gesetzt, verwende komplementären Default:', validPartnerDominanz);
            }

            // FEATURE: GFK-Auto-Korrelation - gleiche oder höhere GFK-Kompetenz
            const partnerHasGfk = partnerDims.gfk && partnerDims.gfk !== '';
            let validPartnerGfk;
            if (partnerHasGfk) {
                validPartnerGfk = partnerDims.gfk;
            } else {
                // Setze GFK basierend auf ICH - gleich oder höher für beste Kompatibilität
                const ichGfk = ichDims.gfk || 'mittel';
                // hoch-hoch = 100, mittel-mittel = 65, niedrig-niedrig = 25
                // Für beste Kompatibilität: Gleiche Stufe oder höher
                if (ichGfk === 'hoch') {
                    validPartnerGfk = 'hoch'; // hoch-hoch = 100
                } else if (ichGfk === 'mittel') {
                    validPartnerGfk = 'hoch'; // mittel-hoch = 75 (besser als mittel-mittel = 65)
                } else {
                    validPartnerGfk = 'mittel'; // niedrig-mittel = 45 (besser als niedrig-niedrig = 25)
                }
                console.log('[findBestIchMatch] Partner-GFK nicht gesetzt, verwende optimalen Default:', validPartnerGfk);
            }

            console.log('[findBestIchMatch] selectedPartner:', selectedPartner, '-> verwendet:', partnerArchetype);
            console.log('[findBestIchMatch] Validierte Partner-Dimensionen:', {
                geschlecht: validPartnerGeschlecht,
                dominanz: validPartnerDominanz,
                orientierung: validPartnerOrientierung,
                gfk: validPartnerGfk
            });

            let bestMatch = null;
            let bestScore = -1;
            const results = [];

            // Berechne Score für jeden möglichen ICH-Archetyp
            for (const ichArch of ALL_ARCHETYPES) {
                try {
                    // Erstelle temporäre Person-Objekte für die Berechnung
                    // Person1 = ICH (der Archetyp, der getestet wird)
                    const person1 = {
                        archetyp: ichArch,
                        dominanz: validIchDominanz,
                        geschlecht: validIchGeschlecht,
                        orientierung: validIchOrientierung,
                        gfk: ichDims.gfk || 'mittel',
                        needs: ichNeeds  // v3.6: Echte Needs für R-Faktor-Berechnung
                    };

                    // Person2 = PARTNER (die festen Einstellungen)
                    const person2 = {
                        archetyp: partnerArchetype,
                        dominanz: validPartnerDominanz,
                        geschlecht: validPartnerGeschlecht,
                        orientierung: validPartnerOrientierung,
                        gfk: validPartnerGfk,
                        needs: partnerNeeds  // v3.6: Echte Needs für R-Faktor-Berechnung
                    };

                    let score = 0;

                    // WICHTIG: Verwende dieselbe Berechnung wie updateComparisonView()
                    // um konsistente Scores zu erhalten

                    // Temporär globale Variablen setzen für calculateRelationshipQuality
                    const savedCurrentArchetype = currentArchetype;
                    const savedSelectedPartner = selectedPartner;
                    currentArchetype = ichArch;
                    selectedPartner = partnerArchetype;

                    try {
                        const pathosCheck = checkPhysicalCompatibility(person1, person2);
                        const logosCheck = calculatePhilosophyCompatibility(ichArch, partnerArchetype);

                        // v4.0 FIX: 'hohe_reibung' aus physicalCompatibility.js muss auch als inkompatibel behandelt werden
                        const isIncompatible = pathosCheck.result === 'unmöglich' || pathosCheck.result === 'hohe_reibung';

                        if (!isIncompatible && pathosCheck.result !== 'unvollständig') {
                            // SSOT v3.10: R-Faktoren aus person.needs
                            const result = calculateOverallWithModifiers(person1, person2, pathosCheck, logosCheck);
                            let baseScore = result.overall || 0;

                            // SSOT v3.7: Konfidenz-Multiplikator anwenden
                            const confidenceMultiplier = getConfidenceMultiplier(pathosCheck.confidence);
                            score = Math.round(baseScore * confidenceMultiplier * 10) / 10;
                        } else if (pathosCheck.result === 'unvollständig') {
                            // Bei unvollständigen Dimensionen: Fallback auf Archetyp-Matrix
                            const logosScore = logosCheck.score || 50;
                            score = logosScore;
                        }
                        // Bei 'unmöglich' oder 'hohe_reibung': score bleibt 0
                    } finally {
                        // Globale Variablen wiederherstellen
                        currentArchetype = savedCurrentArchetype;
                        selectedPartner = savedSelectedPartner;
                    }

                    results.push({ archetype: ichArch, score: score });

                    if (score > bestScore) {
                        bestScore = score;
                        bestMatch = ichArch;
                    }
                } catch (e) {
                    console.warn(`Fehler bei der Berechnung für ${ichArch}:`, e);
                }
            }

            // Sortiere Ergebnisse für Debugging
            results.sort((a, b) => b.score - a.score);
            console.log('[findBestIchMatch] PARTNER:', partnerArchetype);
            console.log('[findBestIchMatch] Ranking:', results);

            // Wähle den besten Match aus, der NICHT derselbe Archetyp wie PARTNER ist
            // (nächstbester statt identischer Archetyp)
            const bestDifferentMatch = results.find(r => r.archetype !== partnerArchetype);
            if (bestDifferentMatch) {
                bestMatch = bestDifferentMatch.archetype;
                bestScore = bestDifferentMatch.score;
            }

            console.log('[findBestIchMatch] Bester ICH-Match (≠ PARTNER):', bestMatch, 'mit Score:', bestScore);

            // Wähle den besten Match aus
            if (bestMatch) {
                selectArchetypeFromGrid('ich', bestMatch);

                // Zeige kurze Feedback-Animation auf dem Button
                const matchBtns = document.querySelectorAll('.ich-match-btn');
                matchBtns.forEach(btn => {
                    btn.classList.add('match-found');
                    setTimeout(() => btn.classList.remove('match-found'), 1000);
                });
            }

            return { bestMatch, bestScore, results };
        }

        // Globale Funktion verfügbar machen
        window.findBestIchMatch = findBestIchMatch;

        // Navigation auf Seite 2 (Ergebnis) - ruft navigateArchetype auf und aktualisiert Seite 2
        function navigateArchetypeOnPage2(person, direction) {
            navigateArchetype(person, direction);
            // Seite 2 explizit aktualisieren
            updateMobileResultPage();
        }

        // Navigation auf Seite 3 (Kategorien) - ruft navigateArchetype auf und aktualisiert Seite 3
        function navigateArchetypeOnPage3(person, direction) {
            navigateArchetype(person, direction);
            // Seite 3 explizit aktualisieren
            updateMobilePage3();
        }

        // Aktualisiert die Anzeige auf Mobile Seite 3
        function updateMobilePage3() {
            const ichArch = data.archetypes[currentArchetype];
            const partnerArch = data.archetypes[selectedPartner];

            const ichEl = document.getElementById('mobileResultIch3');
            const partnerEl = document.getElementById('mobileResultPartner3');

            if (ichEl) ichEl.textContent = ichArch?.name || currentArchetype;
            if (partnerEl) partnerEl.textContent = partnerArch?.name || selectedPartner;
        }

        // Variable für aktuelle Kategorie im Modal
        let currentDisplayedCategory = 'A';

        // Navigation für CategoryModal - wechselt beide Archetypen (ICH)
        function navigateCategoryArchetype(direction) {
            navigateArchetype('ich', direction);
            // CategoryModal neu laden mit aktueller Kategorie
            showCategoryDetails(currentDisplayedCategory);
            // Alle Ansichten aktualisieren
            updateComparisonView();
        }

        function initComparisonLayout() {
            // ICH select
            const ichSelect = document.getElementById('ichSelect');
            if (ichSelect) {
                ichSelect.addEventListener('change', (e) => {
                    currentArchetype = e.target.value;
                    mobileIchArchetype = e.target.value;
                    // Sync with TiageState for save/load
                    if (typeof TiageState !== 'undefined') {
                        TiageState.setArchetype('ich', e.target.value);
                    }
                    // Sync with old select if exists
                    const oldSelect = document.getElementById('archetypeSelect');
                    if (oldSelect) oldSelect.value = e.target.value;
                    updateArchetypeGrid('ich', e.target.value);

                    // ═══════════════════════════════════════════════════════════════
                    // SSOT: Berechne flatNeeds + Resonanzfaktoren bei Archetyp-Wechsel
                    // ProfileCalculator.loadProfile() schreibt direkt in TiageState
                    // ═══════════════════════════════════════════════════════════════
                    if (typeof ProfileCalculator !== 'undefined' && typeof TiageState !== 'undefined') {
                        const profileData = {
                            archetyp: e.target.value,
                            geschlecht: TiageState.get('personDimensions.ich.geschlecht'),
                            dominanz: TiageState.get('personDimensions.ich.dominanz'),
                            orientierung: TiageState.get('personDimensions.ich.orientierung')
                        };
                        console.log('[SSOT] Rufe ProfileCalculator.loadProfile auf mit:', JSON.stringify(profileData));
                        ProfileCalculator.loadProfile('ich', profileData);
                        console.log('[SSOT] Profil für ICH neu berechnet:', e.target.value);
                        // Debug: Was steht jetzt in TiageState?
                        const resonanzNachBerechnung = TiageState.getResonanzFaktoren('ich');
                        console.log('[SSOT] resonanzFaktoren nach Berechnung:', JSON.stringify(resonanzNachBerechnung));
                    }

                    updateComparisonView();
                    // GFK automatisch aus Archetypen-Matching ableiten
                    updateGfkFromArchetypes();
                });
            }

            // Partner select
            const partnerSelect = document.getElementById('partnerSelect');
            if (partnerSelect) {
                partnerSelect.addEventListener('change', (e) => {
                    selectedPartner = e.target.value;
                    mobilePartnerArchetype = e.target.value;
                    // Sync with TiageState for save/load
                    if (typeof TiageState !== 'undefined') {
                        TiageState.setArchetype('partner', e.target.value);
                    }
                    updateArchetypeGrid('partner', e.target.value);

                    // ═══════════════════════════════════════════════════════════════
                    // SSOT: Berechne flatNeeds + Resonanzfaktoren bei Archetyp-Wechsel
                    // ProfileCalculator.loadProfile() schreibt direkt in TiageState
                    // ═══════════════════════════════════════════════════════════════
                    if (typeof ProfileCalculator !== 'undefined' && typeof TiageState !== 'undefined') {
                        const profileData = {
                            archetyp: e.target.value,
                            geschlecht: TiageState.get('personDimensions.partner.geschlecht'),
                            dominanz: TiageState.get('personDimensions.partner.dominanz'),
                            orientierung: TiageState.get('personDimensions.partner.orientierung')
                        };
                        ProfileCalculator.loadProfile('partner', profileData);
                        console.log('[SSOT] Profil für PARTNER neu berechnet:', e.target.value);
                    }

                    updateComparisonView();
                    // GFK automatisch aus Archetypen-Matching ableiten
                    updateGfkFromArchetypes();
                });
            }

            // ICH compact dimensions
            document.querySelectorAll('input[name="ich-geschlecht-new"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    // Use handleGeschlechtClick to maintain consistent object format
                    handleGeschlechtClick('ich', e.target.value, e.target);
                });
            });
            document.querySelectorAll('input[name="ich-dominanz-new"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    handleDominanzClick('ich', e.target.value);
                });
            });
            document.querySelectorAll('input[name="ich-dominanz-status-new"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    personDimensions.ich.dominanzStatus = e.target.value;
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    updateAnalysisOverview();
                    updateComparisonView();
                });
            });

            // Partner compact dimensions
            document.querySelectorAll('input[name="partner-geschlecht-new"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    // Use handleGeschlechtClick to maintain consistent object format
                    handleGeschlechtClick('partner', e.target.value, e.target);
                });
            });
            document.querySelectorAll('input[name="partner-dominanz-new"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    handleDominanzClick('partner', e.target.value);
                });
            });
            document.querySelectorAll('input[name="partner-dominanz-status-new"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    personDimensions.partner.dominanzStatus = e.target.value;
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    updateAnalysisOverview();
                    updateComparisonView();
                });
            });

            // Initial Score-Circle Update beim Start
            updateComparisonView();
        }

        // Throttle für updateComparisonView (max 1x pro 150ms)
        let _updateComparisonViewScheduled = false;
        let _updateComparisonViewPending = false;

        function updateComparisonView() {
            // Performance: Verhindere zu häufige Updates
            if (_updateComparisonViewScheduled) {
                _updateComparisonViewPending = true;
                return;
            }

            _updateComparisonViewScheduled = true;
            setTimeout(function() {
                _updateComparisonViewScheduled = false;
                if (_updateComparisonViewPending) {
                    _updateComparisonViewPending = false;
                    updateComparisonView();
                }
            }, 150);

            if (!data) return;

            // console.log('[TIAGE] updateComparisonView called - dimensions:', JSON.stringify({
            //     ich: personDimensions.ich,
            //     partner: personDimensions.partner
            // })); // DISABLED: verursacht Message-Overflow

            const ichArch = data.archetypes[currentArchetype];
            const partnerArch = data.archetypes[selectedPartner];

            // NEU: GFK-Bedürfnis-Matching mit allen Dimensionen neu berechnen
            try {
                updateGfkFromArchetypes();
            } catch (e) {
                console.warn('[TIAGE] updateGfkFromArchetypes error:', e);
            }

            // Update type names
            document.getElementById('resultIchType').textContent = ichArch?.name || currentArchetype;
            document.getElementById('resultPartnerType').textContent = partnerArch?.name || selectedPartner;

            // Calculate compatibility
            // SSOT v3.10: Needs aus TiageState laden für R-Faktor-Berechnung
            // FIX v4.3: getFlatNeeds() statt get('flatNeeds.ich') — letzteres gibt verschachteltes
            // Eltern-Objekt { ra: {...}, single: {...} } zurück statt die flachen Bedürfnisse.
            // calculateDimensionalResonance findet dann keine Needs → R=1.0 → überschreibt korrekte Werte!
            const ichNeeds = typeof TiageState !== 'undefined' && TiageState.getFlatNeeds ? TiageState.getFlatNeeds('ich') : null;
            const partnerNeeds = typeof TiageState !== 'undefined' && TiageState.getFlatNeeds ? TiageState.getFlatNeeds('partner') : null;

            // FIX: Konvertiere Orientierung von Array (UI-Format) zu Object (Berechnungs-Format)
            // UI speichert Orientierung als Array ['hetero', 'bi'], Berechnung erwartet {primary, secondary}
            const person1 = {
                archetyp: currentArchetype,
                ...personDimensions.ich,
                orientierung: ensureValidOrientierung(personDimensions.ich.orientierung),
                needs: ichNeeds
            };
            const person2 = {
                archetyp: selectedPartner,
                ...personDimensions.partner,
                orientierung: ensureValidOrientierung(personDimensions.partner.orientierung),
                needs: partnerNeeds
            };

            // console.log('[updateComparisonView] person1:', JSON.stringify(person1)); // DISABLED: verursacht Message-Overflow
            // console.log('[updateComparisonView] person2:', JSON.stringify(person2)); // DISABLED: verursacht Message-Overflow
            // console.log('[updateComparisonView] SSOT: ichNeeds:', !!ichNeeds, 'partnerNeeds:', !!partnerNeeds); // DISABLED: verursacht Message-Overflow

            const pathosCheck = checkPhysicalCompatibility(person1, person2);
            // console.log('[updateComparisonView] pathosCheck:', JSON.stringify(pathosCheck)); // DISABLED: verursacht Message-Overflow
            const logosCheck = calculatePhilosophyCompatibility(currentArchetype, selectedPartner);

            // Update warnings
            const warningsContainer = document.getElementById('warningsContainer');
            warningsContainer.innerHTML = '';

            if (pathosCheck.result === 'unvollständig') {
                let warningHTML = '<div class="warning-box incomplete-warning">⚠️ Es fehlt noch:';
                if (pathosCheck.missingItems && pathosCheck.missingItems.length > 0) {
                    warningHTML += '<ul style="margin: 5px 0 0 20px; padding: 0;">';
                    pathosCheck.missingItems.forEach(item => {
                        warningHTML += `<li>${item}</li>`;
                    });
                    warningHTML += '</ul>';
                }
                warningHTML += '</div>';
                warningsContainer.innerHTML = warningHTML;
            } else if (pathosCheck.result === 'unmöglich' || pathosCheck.result === 'hohe_reibung') {
                // v4.0: 'hohe_reibung' ersetzt 'unmöglich' - gleiche Behandlung in der UI
                warningsContainer.innerHTML = `<div class="warning-box pathos-warning">🚫 ${TiageI18n.t('warnings.noAttraction', 'Keine emotionale/körperliche Anziehung:')} ${pathosCheck.reason || TiageI18n.t('warnings.noAttractionDesc', 'Orientierungs-Inkompatibilität verhindert romantische Beziehung')}</div>`;
            } else if (pathosCheck.result === 'unsicher') {
                warningsContainer.innerHTML = `<div class="warning-box logos-warning">⚠️ ${TiageI18n.t('warnings.uncertainAttraction', 'Unsichere körperliche Anziehung (Exploration-Phase)')}</div>`;
            }

            // Warnung bei unsicherem Dominanz-Status (prüfe ob mindestens eine Auswahl "interessiert" ist)
            const hasInteressiert1 = person1.dominanz && Object.values(person1.dominanz).some(s => s === 'interessiert');
            const hasInteressiert2 = person2.dominanz && Object.values(person2.dominanz).some(s => s === 'interessiert');
            if (hasInteressiert1 || hasInteressiert2) {
                warningsContainer.innerHTML += `<div class="warning-box logos-warning">⚠️ ${TiageI18n.t('warnings.uncertainDominance', 'Unsichere Dominanz-Dynamik (Exploration-Phase – reduzierte Konfidenz)')}</div>`;
            }

            if (logosCheck.score < 50) {
                warningsContainer.innerHTML += `<div class="warning-box logos-warning">⚠️ ${TiageI18n.t('warnings.philosophyWarning', 'Verstandsebene-Warnung: Philosophie nur {score}').replace('{score}', logosCheck.score)}</div>`;
            }

            // If dimensions incomplete, show empty state and return
            if (pathosCheck.result === 'unvollständig') {
                // Clear all expandable sections
                const percentage = document.getElementById('resultPercentage');
                const progressFill = document.getElementById('resultProgressFill');
                percentage.textContent = '–';
                percentage.className = 'result-percentage';
                progressFill.style.width = '0%';

                // Update desktop circle for incomplete state
                const desktopCircle = document.getElementById('desktopCirclePercentage');
                if (desktopCircle) desktopCircle.textContent = '–';
                const desktopScoreCircle = document.getElementById('desktopScoreCircle');
                if (desktopScoreCircle) desktopScoreCircle.style.background = 'transparent';

                const categoryBars = document.getElementById('expandCategoryBars');
                if (categoryBars) categoryBars.innerHTML = '<p style="color: var(--text-muted); font-style: italic; text-align: center; padding: 20px;">' + TiageI18n.t('toast.selectAllDimensions', 'Bitte alle Dimensionen auswählen.') + '</p>';

                const expandRadar = document.getElementById('expandRadarChart');
                if (expandRadar) expandRadar.innerHTML = '';

                const desktopScoreNoteIncomplete = document.getElementById('desktopScoreNote');
                if (desktopScoreNoteIncomplete) desktopScoreNoteIncomplete.textContent = TiageI18n.t('ui.selectAllDimensions', 'Bitte alle Dimensionen auswählen.');

                // KO-Text ausblenden bei unvollständigen Dimensionen (Desktop)
                const desktopKoTextIncomplete = document.getElementById('desktopKoTextDisplay');
                if (desktopKoTextIncomplete) {
                    desktopKoTextIncomplete.style.display = 'none';
                    desktopKoTextIncomplete.innerHTML = '';
                }

                // KO-Text ausblenden bei unvollständigen Dimensionen (Mobile)
                const mobileKoTextIncomplete = document.getElementById('mobileKoTextDisplay');
                if (mobileKoTextIncomplete) {
                    mobileKoTextIncomplete.style.display = 'none';
                    mobileKoTextIncomplete.innerHTML = '';
                }

                // Update Score-Circle auch bei unvollständigen Dimensionen
                updateSyntheseScoreCycle();
                return;
            }

            // Calculate overall score
            let overallScore = 0;
            let qualityBreakdown = { archetyp: 0, dominanz: 0, orientierung: 0, geschlecht: 0 };

            // v4.0 FIX: 'hohe_reibung' aus physicalCompatibility.js muss auch als inkompatibel behandelt werden
            const isIncompatible = pathosCheck.result === 'unmöglich' || pathosCheck.result === 'hohe_reibung';

            if (!isIncompatible) {
                try {
                    // SSOT v3.10: R-Faktoren aus person.needs (TiageState)
                    const result = calculateOverallWithModifiers(person1, person2, pathosCheck, logosCheck);
                    overallScore = result.overall;
                    qualityBreakdown = result.breakdown || qualityBreakdown;
                    // console.log('[TIAGE] Score calculated:', overallScore, 'breakdown:', qualityBreakdown); // DISABLED: verursacht Message-Overflow

                    // Update expandable category bars
                    updateExpandableCategoryBars(result.categories);

                    // Update R-Factor Display (Resonanz der Paarung)
                    updateRFactorDisplay();
                } catch (e) {
                    console.error('[TIAGE] calculateOverallWithModifiers error:', e);
                }
            }

            // Update 4-Factor Breakdown (Desktop)
            const factorArchetyp = document.getElementById('desktopFactorArchetyp');
            const factorDominanz = document.getElementById('desktopFactorDominanz');
            const factorOrientierung = document.getElementById('desktopFactorOrientierung');
            const factorGeschlecht = document.getElementById('desktopFactorGeschlecht');

            if (factorArchetyp) factorArchetyp.textContent = qualityBreakdown.archetyp;
            if (factorDominanz) factorDominanz.textContent = qualityBreakdown.dominanz;
            if (factorOrientierung) factorOrientierung.textContent = qualityBreakdown.orientierung;
            if (factorGeschlecht) factorGeschlecht.textContent = qualityBreakdown.geschlecht;

            // Update expandable desktop factor content
            updateDesktopFactorContent();

            // Update result bar
            const percentage = document.getElementById('resultPercentage');
            const progressFill = document.getElementById('resultProgressFill');

            percentage.textContent = overallScore.toFixed(1);
            progressFill.style.width = Math.min(100, overallScore) + '%';

            // Update desktop score circle
            const desktopCircle = document.getElementById('desktopCirclePercentage');
            if (desktopCircle) {
                desktopCircle.textContent = overallScore.toFixed(1);
            }

            // Set color based on score (3-Stufen-Skala: 70/50)
            let colorClass = 'low';
            let color = 'var(--danger)';
            if (overallScore >= 70) { colorClass = 'good'; color = 'var(--primary)'; }
            else if (overallScore >= 50) { colorClass = 'moderate'; color = 'var(--warning)'; }

            percentage.className = 'result-percentage ' + colorClass;
            progressFill.style.background = color;

            // Update desktop circle color
            const desktopScoreCircle = document.getElementById('desktopScoreCircle');
            if (desktopScoreCircle) {
                desktopScoreCircle.style.background = 'transparent';
            }

            // ═══════════════════════════════════════════════════════════════
            // DESKTOP KO-TEXT DISPLAY (unter dem Score Circle)
            // v4.0 FIX: 'hohe_reibung' aus physicalCompatibility.js muss auch als inkompatibel behandelt werden
            // ═══════════════════════════════════════════════════════════════
            const desktopKoTextDisplay = document.getElementById('desktopKoTextDisplay');
            if (desktopKoTextDisplay) {
                if (pathosCheck.result === 'unmöglich' || pathosCheck.result === 'hohe_reibung') {
                    // KO-Text anzeigen
                    const koReason = pathosCheck.reason || 'Inkompatible Orientierungen';
                    desktopKoTextDisplay.innerHTML = '<span class="ko-title">⚠️ K.O.-Kriterium</span><span class="ko-reason">' + koReason + '</span>';
                    desktopKoTextDisplay.style.display = 'block';
                } else {
                    // KO-Text ausblenden
                    desktopKoTextDisplay.style.display = 'none';
                    desktopKoTextDisplay.innerHTML = '';
                }
            }

            // ═══════════════════════════════════════════════════════════════
            // MOBILE KO-TEXT DISPLAY (unter dem Score Circle auf Page 3)
            // v4.0 FIX: 'hohe_reibung' aus physicalCompatibility.js muss auch als inkompatibel behandelt werden
            // ═══════════════════════════════════════════════════════════════
            const mobileKoTextDisplay = document.getElementById('mobileKoTextDisplay');
            if (mobileKoTextDisplay) {
                if (pathosCheck.result === 'unmöglich' || pathosCheck.result === 'hohe_reibung') {
                    // KO-Text anzeigen
                    const koReason = pathosCheck.reason || 'Inkompatible Orientierungen';
                    mobileKoTextDisplay.innerHTML = '<span class="ko-title">⚠️ K.O.-Kriterium</span><br><span class="ko-reason">' + koReason + '</span>';
                    mobileKoTextDisplay.style.display = 'block';
                } else {
                    // KO-Text ausblenden
                    mobileKoTextDisplay.style.display = 'none';
                    mobileKoTextDisplay.innerHTML = '';
                }
            }

            // Update Desktop Score Note (direkt beim Kreis) - 3-Stufen-Skala
            const desktopScoreNote = document.getElementById('desktopScoreNote');
            if (desktopScoreNote) {
                let noteText = '';
                let quoteText = '';
                let quoteSource = '';

                // Bestimme Resonanzlevel basierend auf Score
                let resonanceLevel = 'niedrig';
                if (overallScore >= 80) resonanceLevel = 'hoch';
                else if (overallScore >= 50) resonanceLevel = 'mittel';

                // v4.0 FIX: 'hohe_reibung' muss auch als inkompatibel behandelt werden
                const isCompatibleForQuotes = pathosCheck.result !== 'unmöglich' && pathosCheck.result !== 'hohe_reibung';

                // Versuche Zitat aus ResonanceQuotesTable zu holen
                if (typeof ResonanceQuotesTable !== 'undefined' && isCompatibleForQuotes) {
                    const category = overallScore >= 65 ? 'RESONANCE' : overallScore >= 50 ? 'GROWTH' : 'AWARENESS';
                    const result = ResonanceQuotesTable.generateResonanceText(resonanceLevel, category, 'de');

                    if (result && result.quote) {
                        noteText = result.title;
                        quoteText = result.quote;
                        quoteSource = result.quoteSource ? ` — ${result.quoteSource}` : '';
                    }
                }

                // Fallback zu hardcoded Texten
                if (!quoteText) {
                    if (pathosCheck.result === 'unmöglich' || pathosCheck.result === 'hohe_reibung') {
                        noteText = TiageI18n.t('quality.noResonance', 'Keine Basis für Resonanz vorhanden.');
                        quoteText = TiageI18n.t('quality.noResonanceDesc', 'Diese Beziehung zeigt eine Qualität von {score} – keine kompatible Basis vorhanden, deren Muster sich ausschließen.').replace('{score}', overallScore);
                    } else if (overallScore >= 70) {
                        noteText = TiageI18n.t('quality.goodResonance', 'Gute Resonanz – Muster ergänzen sich.');
                        quoteText = TiageI18n.t('quality.goodResonanceDesc', 'Diese Beziehung zeigt eine Qualität von {score} – eine gute Resonanz zwischen zwei Menschen, deren Muster sich ergänzen.').replace('{score}', overallScore);
                    } else if (overallScore >= 50) {
                        noteText = TiageI18n.t('quality.basisPresent', 'Basis vorhanden, Arbeit erforderlich.');
                        quoteText = TiageI18n.t('quality.basisPresentDesc', 'Diese Beziehung zeigt eine Qualität von {score} – eine Basis ist vorhanden, erfordert aber bewusste Arbeit und Kommunikation.').replace('{score}', overallScore);
                    } else {
                        noteText = TiageI18n.t('quality.reflectionNeeded', 'Bewusste Reflexion erforderlich.');
                        quoteText = TiageI18n.t('quality.reflectionNeededDesc', 'Diese Beziehung zeigt eine Qualität von {score} – bewusste Reflexion und offene Kommunikation sind erforderlich.').replace('{score}', overallScore);
                    }
                }

                desktopScoreNote.innerHTML = '<strong>' + noteText + '</strong><br><span style="font-style: italic; opacity: 0.85; font-size: 0.9em;">"' + quoteText + '"' + quoteSource + '</span>';
            }

            // Update Radar Chart
            const interactionKey = `${currentArchetype}_${selectedPartner}`;
            const interaction = data.interactions?.[interactionKey] || {};
            drawRadarChart(interaction.scores || {}, partnerArch?.color || '#457B9D');

            // Update Desktop Selection Info Message
            updateSelectionInfoMessage();

            // Update Score-Circle auf der Hauptseite
            updateSyntheseScoreCycle();
        }

        // Universelle Funktion für Kategorien-Balken (Mobile & Desktop)
        const categoryNamesMap = {
            A: 'Beziehungsphilosophie',
            B: 'Werte-Alignment',
            C: 'Nähe-Distanz',
            D: 'Autonomie',
            E: 'Kommunikation',
            F: 'Soziale Kompatibilität'
        };

        function renderCategoryBars(containerId, categories) {
            const container = document.getElementById(containerId);
            if (!container) return;

            let html = '';
            for (const [cat, catData] of Object.entries(categories)) {
                const score = catData.score || 0;
                let colorClass = 'low';
                if (score >= 70) colorClass = 'good';
                else if (score >= 50) colorClass = 'moderate';

                html += `
                    <div class="category-bar-row clickable-bar" style="margin-bottom: 12px; cursor: pointer; padding: 8px; border-radius: 8px; transition: background 0.2s;" onclick="showCategoryDetails('${cat}')" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px; align-items: center;">
                            <span style="font-size: 12px; color: var(--text-secondary);">${cat}: ${categoryNamesMap[cat]}</span>
                            <div style="display: flex; align-items: center; gap: 8px;">
                                <span style="font-size: 12px; font-weight: 600;" class="${colorClass}">${score}%</span>
                                <span style="font-size: 10px; color: var(--text-muted);">ℹ</span>
                            </div>
                        </div>
                        <div style="height: 6px; background: var(--bg-dark); border-radius: 3px; overflow: hidden;">
                            <div style="height: 100%; width: ${score}%; background: var(--${colorClass === 'good' ? 'primary' : colorClass === 'moderate' ? 'warning' : 'danger'}); border-radius: 3px;"></div>
                        </div>
                    </div>
                `;
            }
            container.innerHTML = html;
        }

        // Desktop: Wrapper für Kompatibilität
        function updateExpandableCategoryBars(categories) {
            renderCategoryBars('expandCategoryBars', categories);
        }

        function showArchetypeInfo(person) {
            console.log('showArchetypeInfo called with:', person);
            const archetype = person === 'ich' ? currentArchetype : selectedPartner;
            console.log('archetype:', archetype, 'data:', data);
            if (!data || !data.archetypes || !data.archetypes[archetype]) {
                console.error('Data not available for archetype:', archetype);
                return;
            }

            // Set current index for swipe navigation
            currentDefinitionIndex = archetypeOrder.indexOf(archetype);
            if (currentDefinitionIndex === -1) currentDefinitionIndex = 0;
            currentDefinitionPerson = person;

            // Use the shared function to render content
            window.showArchetypeInfoByType(archetype);

            document.getElementById('definitionModal').classList.add('active');
            document.body.style.overflow = 'hidden';

            // Add touch swipe support
            const modal = document.querySelector('#definitionModal .modal');
            modal.ontouchstart = handleDefinitionTouchStart;
            modal.ontouchend = handleDefinitionTouchEnd;
        }

        function showCategoryDetails(cat) {
            if (!data || !data.categories || !data.categories[cat]) return;

            // Aktuelle Kategorie speichern für Navigation
            currentDisplayedCategory = cat;

            const catInfo = data.categories[cat];
            const catNames = {
                A: 'Beziehungsphilosophie',
                B: 'Werte-Alignment',
                C: 'Nähe-Distanz',
                D: 'Autonomie',
                E: 'Kommunikation',
                F: 'Soziale Kompatibilität'
            };

            const ichArch = data.archetypes[currentArchetype];
            const partnerArch = data.archetypes[selectedPartner];
            const key = `${currentArchetype}_${selectedPartner}`;
            const interaction = data.interactions?.[key] || {};
            const catScore = interaction.scores?.[cat]?.value || 0;

            let scoreClass = 'low';
            let scoreText = 'Herausfordernd';
            if (catScore >= 70) { scoreClass = 'good'; scoreText = 'Gut'; }
            else if (catScore >= 50) { scoreClass = 'moderate'; scoreText = 'Mittel'; }

            let modalContent = `
                <div class="modal-category">
                    <div style="background: rgba(69,123,157,0.1); padding: 12px; border-radius: 10px; margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                            <span style="color: var(--text-secondary); font-size: 12px;">Aktuelle Kombination</span>
                            <span style="font-size: 18px; font-weight: 700; color: var(--${scoreClass === 'good' ? 'primary' : scoreClass === 'moderate' ? 'warning' : 'danger'});">${catScore}%</span>
                        </div>
                        <div style="font-size: 14px; font-weight: 600; color: var(--text-primary);">
                            <span style="color: #2ecc71;">${ichArch?.name || currentArchetype}</span>
                            <span style="color: var(--text-muted);"> × </span>
                            <span style="color: #e74c3c;">${partnerArch?.name || selectedPartner}</span>
                        </div>
                        <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">${scoreText} in dieser Kategorie</div>
                    </div>

                    <div class="modal-category-header">
                        <div class="modal-category-letter">${cat}</div>
                        <div class="modal-category-name">${catNames[cat]}</div>
                    </div>
                    <div class="modal-category-desc">${catInfo.description || TiageI18n.t('ui.noDescription', 'Keine Beschreibung verfügbar.')}</div>
            `;

            if (catInfo.subDimensions && catInfo.subDimensions.length > 0) {
                modalContent += `
                    <div class="definition-section">
                        <div class="definition-section-title">Subdimensionen <span style="font-size: 10px; color: var(--text-muted);">(klicken für Details)</span></div>
                        <ul class="definition-list variants clickable-subs">
                            ${catInfo.subDimensions.map(sub => `<li onclick="showSubDimensionInfo('${cat}', '${sub.replace(/'/g, "\\'")}')" style="cursor: pointer; padding: 8px; border-radius: 6px; transition: background 0.2s;" onmouseover="this.style.background='rgba(255,255,255,0.1)'" onmouseout="this.style.background='transparent'">${sub} <span style="color: var(--text-muted); font-size: 10px;">→</span></li>`).join('')}
                        </ul>
                    </div>
                `;
            }

            modalContent += '</div>';

            document.getElementById('modalTitle').textContent = `Qualitätsmuster ${cat}: ${catNames[cat]}`;
            document.getElementById('modalBody').innerHTML = modalContent;
            document.getElementById('categoryModal').classList.add('active');
        }

        const subDimensionData = {
            "Exklusivitäts-Erwartung": {
                was: "Die Erwartung, der einzige romantische/sexuelle Partner zu sein.",
                warum: "Diese Dimension ist fundamental, weil unterschiedliche Erwartungen zu Enttäuschung, Eifersucht und Vertrauensbrüchen führen können.",
                wozu: "Klare Erwartungen verhindern Missverständnisse und schaffen eine gemeinsame Basis für die Beziehungsgestaltung.",
                archetypen: {
                    single: "Flexibel - keine feste Erwartung, offen für verschiedene Modelle",
                    duo: "Hohe Erwartung an vollständige Exklusivität",
                    duo_flex: "Grundsätzlich exklusiv, aber mit Ausnahmen nach Absprache",
                    solopoly: "Keine Exklusivitätserwartung - jede Beziehung ist eigenständig",
                    polyamor: "Bewusste Nicht-Exklusivität mit klaren Strukturen",
                    ra: "Keine normativen Exklusivitätserwartungen - alles verhandelbar",
                    lat: "Flexibel - Exklusivität ist unabhängig von Wohnsituation",
                    aromantisch: "Romantische Exklusivität nicht relevant - andere Verbindungen zählen"
                }
            },
            "Offenheit für alternative Modelle": {
                was: "Die Bereitschaft, nicht-traditionelle Beziehungsformen zu akzeptieren oder auszuprobieren.",
                warum: "Unterschiedliche Offenheit kann zu Konflikten führen, wenn ein Partner expandieren möchte und der andere nicht.",
                wozu: "Gemeinsame Offenheit ermöglicht Wachstum und Anpassung der Beziehung an veränderte Bedürfnisse.",
                archetypen: {
                    single: "Oft sehr offen - keine festgelegte Struktur",
                    duo: "Tendenziell geschlossen - Monogamie als Ideal",
                    duo_flex: "Moderat offen - bereit für situative Anpassungen",
                    solopoly: "Sehr offen - lebt bereits alternatives Modell",
                    polyamor: "Strukturiert offen - klare Rahmen für Vielfalt",
                    ra: "Maximal offen - alle Normen werden hinterfragt",
                    lat: "Moderat offen - alternative Wohnform wird bereits gelebt",
                    aromantisch: "Offen für alternative Beziehungsformen - Romantik ist nicht zentral"
                }
            },
            "Beziehung als Lebensinhalt vs. Lebensbereich": {
                was: "Wie zentral ist die Beziehung im Leben? Ist sie alles oder ein Teil von vielem?",
                warum: "Wenn einer die Beziehung als Lebensmittelpunkt sieht und der andere als Nebensache, entstehen ungleiche Investitionen.",
                wozu: "Ähnliche Priorisierung schafft Balance und verhindert das Gefühl von Vernachlässigung oder Überforderung.",
                archetypen: {
                    single: "Lebensbereich - das eigene Leben steht im Zentrum",
                    duo: "Oft Lebensinhalt - die Beziehung ist sehr wichtig",
                    duo_flex: "Wichtiger Lebensbereich mit hoher Priorität",
                    solopoly: "Klar Lebensbereich - das Selbst bleibt Zentrum",
                    polyamor: "Wichtiger Lebensbereich - aber mit mehreren Beziehungen",
                    ra: "Lebensbereich - Autonomie und Selbstbestimmung zentral",
                    lat: "Wichtiger Lebensbereich - aber eigener Raum ist essentiell",
                    aromantisch: "Lebensbereich - Freundschaften und andere Verbindungen zentral"
                }
            },
            "Definition von Treue": {
                was: "Was bedeutet 'treu sein' konkret? Körperliche Exklusivität, emotionale Treue, oder Ehrlichkeit?",
                warum: "Unterschiedliche Definitionen führen oft zu den schmerzhaftesten Missverständnissen in Beziehungen.",
                wozu: "Eine gemeinsame Definition von Treue schafft Klarheit und Vertrauen - unabhängig davon, wie sie aussieht.",
                archetypen: {
                    single: "Flexibel - Treue ist kontextabhängig",
                    duo: "Klassisch - körperliche UND emotionale Exklusivität",
                    duo_flex: "Angepasst - emotionale Treue wichtiger als körperliche",
                    solopoly: "Neu definiert - Treue = Ehrlichkeit und Transparenz",
                    polyamor: "Strukturiert - Treue zu vereinbarten Regeln und Grenzen",
                    ra: "Individuell definiert - Treue ist nicht normativ vorgegeben",
                    lat: "Emotionale Treue wichtig - unabhängig von Wohnsituation",
                    aromantisch: "Treue zu Absprachen - romantische Treue nicht relevant"
                }
            },
            "Ethische Grundhaltung": {
                was: "Die gemeinsamen Werte wie Ehrlichkeit, Respekt, Consent und Fairness.",
                warum: "Unterschiedliche ethische Grundhaltungen untergraben das Fundament jeder Beziehung und führen zu Vertrauensverlust.",
                wozu: "Geteilte ethische Werte schaffen ein sicheres Fundament für alle anderen Aspekte der Beziehung.",
                archetypen: {
                    single: "Individuell geprägt - eigene ethische Standards",
                    duo: "Traditionell - gesellschaftliche Normen als Leitfaden",
                    duo_flex: "Reflektiert - bewusste Auseinandersetzung mit Normen",
                    solopoly: "Progressiv - aktive ethische Reflexion",
                    polyamor: "Strukturiert ethisch - klare Regeln für fairen Umgang",
                    ra: "Anarchisch-ethisch - Normen werden radikal hinterfragt",
                    lat: "Autonom-ethisch - Respekt vor individuellem Raum",
                    aromantisch: "Authentisch - Ehrlichkeit über eigene Grenzen"
                }
            },
            "Verantwortungsbewusstsein": {
                was: "Die Bereitschaft, Verantwortung für eigene Handlungen und deren Auswirkungen zu übernehmen.",
                warum: "Ohne Verantwortungsbewusstsein werden Fehler wiederholt und Partner verletzt.",
                wozu: "Verantwortung ermöglicht Wachstum, Reparatur nach Konflikten und nachhaltige Beziehungsqualität.",
                archetypen: {
                    single: "Primär für sich selbst verantwortlich",
                    duo: "Hohe gegenseitige Verantwortung erwartet",
                    duo_flex: "Balancierte Verantwortung mit Flexibilität",
                    solopoly: "Selbstverantwortung betont, aber fair zu Partnern",
                    polyamor: "Komplexe Verantwortung für mehrere Beziehungen",
                    ra: "Hohe Selbstverantwortung - keine normativen Erwartungen",
                    lat: "Verantwortung für Beziehungsqualität trotz Distanz",
                    aromantisch: "Verantwortung für klare Kommunikation der Grenzen"
                }
            },
            "Emotionale Verschmelzungs-Tendenz": {
                was: "Das Bedürfnis, emotional mit dem Partner zu verschmelzen - von 'wir sind eins' bis 'wir sind zwei'.",
                warum: "Starke Unterschiede führen dazu, dass einer sich eingeengt und der andere sich abgelehnt fühlt.",
                wozu: "Ähnliche Verschmelzungs-Präferenzen ermöglichen eine Nähe, die sich für beide richtig anfühlt.",
                archetypen: {
                    single: "Niedrig - Autonomie steht vor Verschmelzung",
                    duo: "Oft hoch - 'Wir' als zentrale Identität",
                    duo_flex: "Moderat - Nähe mit Grenzen",
                    solopoly: "Niedrig - bewusste Distanz zu Verschmelzung",
                    polyamor: "Differenziert - unterschiedlich mit verschiedenen Partnern",
                    ra: "Niedrig - Autonomie ist zentraler Wert",
                    lat: "Moderat - emotionale Nähe ohne räumliche Verschmelzung",
                    aromantisch: "Niedrig - romantische Verschmelzung nicht gewünscht"
                }
            },
            "Physische Nähe-Bedürfnisse": {
                was: "Wie viel körperliche Präsenz und Nähe braucht man? Zusammenleben, täglicher Kontakt, wöchentlich?",
                warum: "Mismatches führen zu Einsamkeit (bei zu wenig) oder Erstickung (bei zu viel).",
                wozu: "Abgestimmte Nähe-Bedürfnisse ermöglichen, dass beide sich gesehen und respektiert fühlen.",
                archetypen: {
                    single: "Flexibel - kein konstantes Nähe-Bedürfnis",
                    duo: "Hoch - oft Wunsch nach Zusammenleben",
                    duo_flex: "Moderat bis hoch mit Freiraum-Phasen",
                    solopoly: "Bewusst niedrig - eigener Wohnraum wichtig",
                    polyamor: "Komplex - unterschiedliche Nähe mit verschiedenen Partnern",
                    ra: "Individuell verhandelbar - keine normativen Erwartungen",
                    lat: "Bewusst niedrig - getrennte Wohnungen als Prinzip",
                    aromantisch: "Variabel - nicht an romantische Nähe gebunden"
                }
            },
            "Fähigkeit, Raum zu geben": {
                was: "Die Fähigkeit, dem Partner Freiraum zu lassen ohne sich vernachlässigt oder unsicher zu fühlen.",
                warum: "Ohne diese Fähigkeit entstehen Kontrolle, Eifersucht und Erstickung der Beziehung.",
                wozu: "Raum geben können ermöglicht individuelle Entwicklung innerhalb der Beziehung.",
                archetypen: {
                    single: "Hoch - Raum ist selbstverständlich",
                    duo: "Muss oft gelernt werden - Nähe ist Standard",
                    duo_flex: "Bewusst entwickelt - wichtig für das Modell",
                    solopoly: "Sehr hoch - Teil der Grundphilosophie",
                    polyamor: "Essentiell - strukturell eingebaut",
                    ra: "Maximal - Autonomie als höchster Wert",
                    lat: "Sehr hoch - räumlicher Freiraum ist zentral",
                    aromantisch: "Hoch - respektiert nicht-romantische Grenzen"
                }
            },
            "Individuelle Freiheit": {
                was: "Der Wert, den man persönlicher Freiheit in der Beziehung beimisst - eigene Entscheidungen, Hobbies, Freunde.",
                warum: "Unterschiedliche Freiheitsbedürfnisse führen zu Machtkämpfen oder Entfremdung.",
                wozu: "Respektierte Freiheit ermöglicht authentisches Selbst und verhindert Resentment.",
                archetypen: {
                    single: "Maximale Freiheit - das Kernbedürfnis",
                    duo: "Eingeschränkt - Kompromisse erwartet",
                    duo_flex: "Balanciert - Freiheit mit Rücksichtnahme",
                    solopoly: "Maximal - Autonomie ist nicht verhandelbar",
                    polyamor: "Hoch - aber mit Verantwortung verbunden",
                    ra: "Maximal - Freiheit von allen Normen",
                    lat: "Hoch - räumliche Autonomie garantiert Freiheit",
                    aromantisch: "Hoch - Freiheit von romantischen Erwartungen"
                }
            },
            "Entscheidungsautonomie": {
                was: "Wer entscheidet was? Wie viel Mitsprache hat der Partner bei persönlichen Entscheidungen?",
                warum: "Konflikte entstehen, wenn einer Kontrolle erwartet und der andere Autonomie braucht.",
                wozu: "Klare Entscheidungsstrukturen verhindern Machtkämpfe und schaffen Klarheit.",
                archetypen: {
                    single: "Vollständig - alle Entscheidungen selbst",
                    duo: "Oft geteilt - wichtige Dinge gemeinsam",
                    duo_flex: "Hybrid - manche gemeinsam, manche allein",
                    solopoly: "Hoch - Autonomie auch in der Beziehung",
                    polyamor: "Komplex - unterschiedlich je nach Beziehung",
                    ra: "Maximal - keine externen Vorgaben akzeptiert",
                    lat: "Hoch - eigene Entscheidungen im eigenen Raum",
                    aromantisch: "Hoch - Entscheidungen nicht an romantischen Normen orientiert"
                }
            },
            "Akzeptanz der Autonomie des anderen": {
                was: "Die Fähigkeit zu akzeptieren, dass der Partner eigene Entscheidungen trifft - auch wenn man nicht zustimmt.",
                warum: "Fehlende Akzeptanz führt zu Kontrolle, Manipulation und Vertrauensverlust.",
                wozu: "Akzeptanz ermöglicht echte Partnerschaft statt Abhängigkeit.",
                archetypen: {
                    single: "Hoch - Autonomie wird geschätzt",
                    duo: "Muss oft gelernt werden",
                    duo_flex: "Bewusst entwickelt",
                    solopoly: "Sehr hoch - zentral für das Modell",
                    polyamor: "Essentiell - ohne geht es nicht",
                    ra: "Maximal - Grundprinzip der Beziehungsphilosophie",
                    lat: "Hoch - respektiert räumliche Autonomie des anderen",
                    aromantisch: "Hoch - akzeptiert nicht-romantische Bedürfnisse"
                }
            },
            "Kommunikationstiefe": {
                was: "Wie tief gehen Gespräche? Von Alltag bis zu Ängsten, Träumen und Verletzlichkeit.",
                warum: "Unterschiedliche Tiefen-Präferenzen führen zu Frustration - einer will mehr, einer weniger.",
                wozu: "Passende Kommunikationstiefe schafft echte Verbindung und Verständnis.",
                archetypen: {
                    single: "Variabel - je nach Beziehung",
                    duo: "Oft hoch - alles teilen als Ideal",
                    duo_flex: "Selektiv tief - wichtiges wird geteilt",
                    solopoly: "Bewusst tief - Kommunikation ist essentiell",
                    polyamor: "Hoch - Komplexität erfordert Kommunikation",
                    ra: "Individuell - keine normativen Erwartungen an Tiefe",
                    lat: "Qualitätsfokussiert - tiefe Gespräche in begrenzter Zeit",
                    aromantisch: "Authentisch - tiefe Verbindung ohne romantische Komponente"
                }
            },
            "Konfliktfähigkeit": {
                was: "Wie geht man mit Konflikten um? Vermeidung, Eskalation, konstruktive Lösung?",
                warum: "Unterschiedliche Stile führen dazu, dass Konflikte ungelöst bleiben oder eskalieren.",
                wozu: "Kompatible Konfliktfähigkeit ermöglicht Wachstum durch Krisen statt Zerstörung.",
                archetypen: {
                    single: "Kann Konflikte vermeiden durch Distanz",
                    duo: "Muss Konflikte lösen - kein Entkommen",
                    duo_flex: "Flexibel - manchmal Distanz, manchmal Lösung",
                    solopoly: "Klar - bei Unlösbarkeit kann man gehen",
                    polyamor: "Entwickelt - Kommunikation als Lösung",
                    ra: "Individuell - keine externen Konfliktlösungsmodelle",
                    lat: "Distanz möglich - räumliche Trennung als Puffer",
                    aromantisch: "Sachlich - nicht-romantische Konfliktlösung"
                }
            },
            "Emotionale Transparenz": {
                was: "Wie offen teilt man Gefühle? Alles aussprechen oder manches für sich behalten?",
                warum: "Unterschiede führen zu Missverständnissen - einer fühlt sich verschlossen, der andere überfordert.",
                wozu: "Abgestimmte Transparenz schafft Vertrauen ohne Überforderung.",
                archetypen: {
                    single: "Selektiv - teilt was nötig ist",
                    duo: "Oft hohe Erwartung an Transparenz",
                    duo_flex: "Balanciert - wichtiges wird geteilt",
                    solopoly: "Hoch - Ehrlichkeit ist zentral",
                    polyamor: "Sehr hoch - Basis des Modells",
                    ra: "Individuell - keine normativen Transparenz-Erwartungen",
                    lat: "Qualitativ - tiefe Gespräche in begrenzter Zeit",
                    aromantisch: "Ehrlich - klar über eigene Grenzen"
                }
            },
            "Gesellschaftliche Akzeptanz": {
                was: "Wie wichtig ist es, dass Familie, Freunde und Gesellschaft die Beziehung akzeptieren?",
                warum: "Unterschiedliche Wichtigkeit führt zu Konflikten über 'Outing' und öffentliches Auftreten.",
                wozu: "Ähnliche Wichtigkeit ermöglicht einen gemeinsamen Umgang mit dem sozialen Umfeld.",
                archetypen: {
                    single: "Unkompliziert - gesellschaftlich akzeptiert",
                    duo: "Sehr wichtig - passt zur Norm",
                    duo_flex: "Moderat - gewisse Erklärungen nötig",
                    solopoly: "Weniger wichtig - lebt gegen die Norm",
                    polyamor: "Komplex - manche Offenheit, manche Diskretion",
                    ra: "Unwichtig - gesellschaftliche Normen werden abgelehnt",
                    lat: "Erklärungsbedürftig - 'Warum wohnt ihr nicht zusammen?'",
                    aromantisch: "Herausfordernd - romantische Norm ist tief verankert"
                }
            },
            "Integration in soziale Kreise": {
                was: "Wie wird die Beziehung in Freundeskreis, Familie und Arbeit integriert und präsentiert?",
                warum: "Unterschiede führen zu Frustration - einer will präsentieren, der andere verstecken.",
                wozu: "Gemeinsame Strategien für soziale Integration schaffen ein einheitliches Auftreten.",
                archetypen: {
                    single: "Einfach - keine komplexe Integration nötig",
                    duo: "Vollständig - Partner wird überall eingeführt",
                    duo_flex: "Weitgehend - mit gewissen Grenzen",
                    solopoly: "Selektiv - nicht überall erklärbar",
                    polyamor: "Komplex - unterschiedlich je nach Umfeld",
                    ra: "Individuell - Integration nach eigenen Regeln",
                    lat: "Erklärungsbedürftig - getrennte Wohnungen irritieren",
                    aromantisch: "Herausfordernd - 'Nur Freunde?' wird oft missverstanden"
                }
            },
            "Umgang mit Stigma": {
                was: "Wie geht man mit negativen Reaktionen auf die Beziehungsform um? Erklären, ignorieren, kämpfen?",
                warum: "Unterschiedliche Strategien führen zu Konflikten darüber, wie man als Paar auftritt.",
                wozu: "Gemeinsame Strategie stärkt die Beziehung gegen äußeren Druck.",
                archetypen: {
                    single: "Kaum Stigma - gesellschaftlich normal",
                    duo: "Kein Stigma - das Ideal der Gesellschaft",
                    duo_flex: "Leichtes Stigma - 'offene Beziehung'",
                    solopoly: "Erhebliches Stigma - schwer erklärbar",
                    polyamor: "Stigma vorhanden - aber zunehmend bekannt",
                    ra: "Hohes Stigma - radikale Position wird missverstanden",
                    lat: "Moderates Stigma - 'echte' Beziehung in Frage gestellt",
                    aromantisch: "Hohes Stigma - wird als Defizit wahrgenommen"
                }
            }
        };

        function showSubDimensionInfo(cat, subName) {
            const subData = subDimensionData[subName] || { was: TiageI18n.t('ui.noDescription', 'Keine Beschreibung verfügbar.'), warum: "", wozu: "", archetypen: {} };
            const catNames = {
                A: 'Beziehungsphilosophie',
                B: 'Werte-Alignment',
                C: 'Nähe-Distanz',
                D: 'Autonomie',
                E: 'Kommunikation',
                F: 'Soziale Kompatibilität'
            };

            const ichArch = data?.archetypes?.[currentArchetype];
            const partnerArch = data?.archetypes?.[selectedPartner];
            const ichId = currentArchetype;
            const partnerId = selectedPartner;

            const ichPerspektive = subData.archetypen?.[ichId] || TiageI18n.t('ui.noData', 'Keine Daten');
            const partnerPerspektive = subData.archetypen?.[partnerId] || TiageI18n.t('ui.noData', 'Keine Daten');

            let modalContent = `
                <div style="background: rgba(69,123,157,0.1); padding: 12px; border-radius: 10px; margin-bottom: 15px;">
                    <div style="font-size: 11px; color: var(--text-muted);">Teil von Qualitätsmuster ${cat}: ${catNames[cat]}</div>
                </div>

                <div style="margin-bottom: 15px;">
                    <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">WAS?</div>
                    <p style="color: var(--text-primary); line-height: 1.5;">${subData.was}</p>
                </div>

                <div style="margin-bottom: 15px;">
                    <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">WARUM WICHTIG?</div>
                    <p style="color: var(--text-secondary); line-height: 1.5;">${subData.warum}</p>
                </div>

                <div style="margin-bottom: 20px;">
                    <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">WOZU?</div>
                    <p style="color: var(--text-secondary); line-height: 1.5;">${subData.wozu}</p>
                </div>

                <div style="background: rgba(46,204,113,0.1); padding: 12px; border-radius: 10px; margin-bottom: 10px;">
                    <div style="font-size: 12px; color: #2ecc71; font-weight: 600; margin-bottom: 8px;">ICH (${ichArch?.name || ichId}):</div>
                    <p style="color: var(--text-secondary); font-size: 12px; line-height: 1.5;">${ichPerspektive}</p>
                </div>

                <div style="background: rgba(231,76,60,0.1); padding: 12px; border-radius: 10px; margin-bottom: 15px;">
                    <div style="font-size: 12px; color: #e74c3c; font-weight: 600; margin-bottom: 8px;">PARTNER (${partnerArch?.name || partnerId}):</div>
                    <p style="color: var(--text-secondary); font-size: 12px; line-height: 1.5;">${partnerPerspektive}</p>
                </div>

                <div style="background: rgba(108, 117, 125, 0.1); padding: 12px; border-radius: 10px;">
                    <div style="font-size: 12px; color: #6c757d; font-weight: 600; margin-bottom: 8px;">BEDEUTUNG FÜR EURE KOMBINATION:</div>
                    <p style="color: var(--text-secondary); font-size: 12px; line-height: 1.5;">${generateCombinationAnalysis(ichId, partnerId, subName, subData)}</p>
                </div>
            `;

            document.getElementById('modalTitle').textContent = subName;
            document.getElementById('modalBody').innerHTML = modalContent;
        }

        function generateCombinationAnalysis(ichId, partnerId, subName, subData) {
            if (ichId === partnerId) {
                return `Da ihr beide denselben Archetyp habt, solltet ihr hier ähnliche Vorstellungen haben. Das reduziert Konfliktpotential in dieser Dimension erheblich.`;
            }

            const polyTypes = ['solopoly', 'polyamor', 'ra'];
            const monoTypes = ['single', 'duo', 'duo_flex', 'lat', 'aromantisch'];
            const ichIsPoly = polyTypes.includes(ichId);
            const partnerIsPoly = polyTypes.includes(partnerId);

            if (ichIsPoly !== partnerIsPoly) {
                return `Hier treffen fundamental unterschiedliche Weltanschauungen aufeinander. Ein Poly-Typ und ein Mono-Typ haben oft gegensätzliche Perspektiven auf "${subName}". Intensive Kommunikation und gegenseitiges Verständnis sind essentiell.`;
            }

            if (ichIsPoly && partnerIsPoly) {
                return `Als zwei Poly-Typen teilt ihr grundsätzlich ähnliche Werte in dieser Dimension. Die Unterschiede liegen eher in der konkreten Ausgestaltung als in den Grundprinzipien.`;
            }

            return `Eure Archetypen haben unterschiedliche Schwerpunkte in dieser Dimension. Offene Gespräche darüber, was euch beiden wichtig ist, helfen, gemeinsame Lösungen zu finden.`;
        }

        // NEU: Generiere dynamische Pro/Contra aus Micro-Statements
        function generateDynamicProContra(type1, type2, dims1, dims2) {
            const pro = [];
            const contra = [];

            // 1. Archetyp-basierte Pro/Contra
            const archStatements = getArchetypeStatements(type1, type2);
            if (archStatements) {
                pro.push(...(archStatements.pro || []));
                contra.push(...(archStatements.contra || []));
            }

            // 2. Dominanz-basierte Pro/Contra hinzufügen
            const domStatements = getDominanceStatements(dims1?.dominanz, dims2?.dominanz);
            if (domStatements && domStatements.pro) {
                // Füge nur die relevantesten hinzu, um Doppelungen zu vermeiden
                domStatements.pro.slice(0, 2).forEach(p => {
                    if (!pro.includes(p)) pro.push(p);
                });
            }
            if (domStatements && domStatements.contra) {
                domStatements.contra.slice(0, 2).forEach(c => {
                    if (!contra.includes(c)) contra.push(c);
                });
            }

            return { pro, contra };
        }

        // ═══════════════════════════════════════════════════════════════════════
        // KOMBINIERTES SYNTHESE-SYSTEM (A+B+C)
        // A) Score → Tonalität (positiv/neutral/kritisch)
        // B) Hash aus 4 Faktoren → deterministische Variation
        // C) 6 Kategorien + Templates → Zusammenführung
        // ═══════════════════════════════════════════════════════════════════════

        /**
         * Berechnet einen deterministischen Hash aus den 4 Faktoren
         * Gibt einen Index zurück, der für Statement-Auswahl verwendet wird
         */
        function getFactorHash(archetypScore, dominanzScore, orientierungScore, geschlechtScore) {
            // Einfacher aber deterministischer Hash basierend auf allen 4 Faktoren
            const combined = (archetypScore * 1000000) + (dominanzScore * 10000) + (orientierungScore * 100) + geschlechtScore;
            // Verwende Modulo um einen Index zu bekommen
            return combined;
        }

        /**
         * Wählt ein Statement deterministisch aus einem Array basierend auf Hash
         */
        function selectStatementByHash(statements, hash) {
            if (!statements || statements.length === 0) return null;
            const index = hash % statements.length;
            return statements[index];
        }

        /**
         * Bestimmt die Tonalität basierend auf dem Gesamtscore
         * @returns 'positiv' | 'neutral' | 'kritisch'
         */
        function getTonality(score) {
            if (score >= 70) return 'positiv';
            if (score >= 50) return 'neutral';
            return 'kritisch';
        }

        /**
         * Tonalitäts-Templates für die Synthese-Einleitungen
         */
        const tonalityTemplates = {
            positiv: {
                pathos: [
                    "Eine vielversprechende Resonanz entsteht zwischen euch.",
                    "Die emotionale Chemie deutet auf tiefes Potenzial hin.",
                    "Eure Energien harmonieren auf einer fundamentalen Ebene."
                ],
                logos: [
                    "Die strukturelle Kompatibilität bildet eine solide Basis.",
                    "Eure Beziehungsphilosophien ergänzen sich konstruktiv.",
                    "Das rationale Fundament ermöglicht fruchtbare Kommunikation."
                ]
            },
            neutral: {
                pathos: [
                    "Eine interessante Dynamik entfaltet sich zwischen euch.",
                    "Die emotionale Landschaft bietet sowohl Chancen als auch Herausforderungen.",
                    "Eure Energien begegnen sich – was daraus wird, liegt in euren Händen."
                ],
                logos: [
                    "Die strukturellen Unterschiede erfordern bewusste Navigation.",
                    "Eure Beziehungsvorstellungen haben Überschneidungen, aber auch Differenzen.",
                    "Dialog und Klärung werden wichtig sein für das gegenseitige Verständnis."
                ]
            },
            kritisch: {
                pathos: [
                    "Die emotionalen Welten prallen aufeinander.",
                    "Spannungen auf der Gefühlsebene sind zu erwarten.",
                    "Die unterschiedlichen emotionalen Bedürfnisse erfordern besondere Achtsamkeit."
                ],
                logos: [
                    "Fundamentale Unterschiede in den Beziehungsvorstellungen werden sichtbar.",
                    "Die strukturellen Differenzen stellen eine erhebliche Herausforderung dar.",
                    "Grundlegende Gespräche über Erwartungen sind unerlässlich."
                ]
            }
        };

        /**
         * Kategorie-spezifische Synthese-Bausteine für die 6 Bereiche
         */
        const categorySynthesisTemplates = {
            A: { // Beziehungsphilosophie
                name: "Beziehungsphilosophie",
                positiv: "Eure Grundhaltungen zu Beziehungen harmonieren.",
                neutral: "Eure Beziehungsphilosophien haben gemeinsame Punkte, aber auch Unterschiede.",
                kritisch: "Fundamentale Differenzen in der Beziehungsphilosophie erfordern Klärung."
            },
            B: { // Werte-Alignment
                name: "Werte-Alignment",
                positiv: "Geteilte Werte bilden ein stabiles Fundament.",
                neutral: "Manche Werte teilt ihr, andere unterscheiden sich.",
                kritisch: "Unterschiedliche Wertevorstellungen können zu Konflikten führen."
            },
            C: { // Nähe-Distanz
                name: "Nähe-Distanz",
                positiv: "Eure Bedürfnisse nach Nähe und Raum passen gut zusammen.",
                neutral: "Die Balance zwischen Nähe und Distanz wird Kommunikation erfordern.",
                kritisch: "Unterschiedliche Nähe-Distanz-Bedürfnisse können Spannung erzeugen."
            },
            D: { // Autonomie
                name: "Autonomie",
                positiv: "Ihr respektiert gegenseitig eure Unabhängigkeit.",
                neutral: "Das Autonomie-Verständnis bedarf weiterer Abstimmung.",
                kritisch: "Konfliktpotenzial bei unterschiedlichen Autonomie-Erwartungen."
            },
            E: { // Kommunikation
                name: "Kommunikation",
                positiv: "Die Basis für fruchtbaren Dialog ist gegeben.",
                neutral: "Kommunikationsstile unterscheiden sich – Anpassung möglich.",
                kritisch: "Unterschiedliche Kommunikationsweisen können Missverständnisse erzeugen."
            },
            F: { // Soziale Kompatibilität
                name: "Soziale Kompatibilität",
                positiv: "Soziale Vorstellungen und Umfelder harmonieren.",
                neutral: "Soziale Kompatibilität ist teilweise gegeben.",
                kritisch: "Unterschiedliche soziale Erwartungen können belasten."
            }
        };

        /**
         * Generiert detaillierte Pathos-Inhalte mit ICH/Partner/Synthese Struktur
         * Nutzt PathosTextGenerator für fließende, poetische Texte
         * @returns {Object} { ich, partner, synthese, resonanz }
         */
        function generateDetailedPathos(ichArch, partnerArch) {
            const ichName = ichArch?.name || 'ICH';
            const partnerName = partnerArch?.name || 'Partner';
            const ichId = ichArch?.id || currentArchetype || '';
            const partnerId = partnerArch?.id || selectedPartner || '';

            // Berechne die 4 Faktor-Scores
            const person1 = {
                archetyp: ichId,
                dominanz: personDimensions.ich?.dominanz,
                orientierung: personDimensions.ich?.orientierung,
                geschlecht: personDimensions.ich?.geschlecht,
                orientierungStatus: personDimensions.ich?.orientierungStatus
            };
            const person2 = {
                archetyp: partnerId,
                dominanz: personDimensions.partner?.dominanz,
                orientierung: personDimensions.partner?.orientierung,
                geschlecht: personDimensions.partner?.geschlecht,
                orientierungStatus: personDimensions.partner?.orientierungStatus
            };

            // Hole Score-Breakdown
            const qualityResult = calculateRelationshipQuality(person1, person2);
            const breakdown = qualityResult.breakdown || { archetyp: 50, dominanz: 75, orientierung: 100, geschlecht: 100 };
            const overallScore = qualityResult.score || 50;
            const resonanzData = qualityResult.resonanz;
            const tonality = getTonality(overallScore);

            // Hole Statement-Quellen
            const archStatements = getArchetypeStatements(ichId, partnerId);
            const domStatements = getDominanceStatements(person1.dominanz, person2.dominanz);
            const orientStatements = getOrientierungStatements(person1.orientierung, person2.orientierung, person1.geschlecht, person2.geschlecht);

            // ═══════════════════════════════════════════════════════════════
            // NUTZE PATHOS TEXT GENERATOR (wenn verfügbar)
            // ═══════════════════════════════════════════════════════════════
            if (typeof PathosTextGenerator !== 'undefined') {
                // Extrahiere primitive Werte für Hash (dominanz kann Objekt sein)
                const dom1 = typeof person1.dominanz === 'object' ? (person1.dominanz?.primary || 'none') : (person1.dominanz || 'none');
                const dom2 = typeof person2.dominanz === 'object' ? (person2.dominanz?.primary || 'none') : (person2.dominanz || 'none');

                // Generiere deterministischen Hash für Varianz
                const seed = PathosTextGenerator.generateHash(
                    ichId, partnerId,
                    dom1,
                    dom2,
                    overallScore
                );

                // ICH BRINGT MIT - Poetischer Fließtext
                const ichText = PathosTextGenerator.generatePersonText(
                    ichArch,
                    personDimensions.ich,
                    ichName,
                    seed
                );

                // PARTNER BRINGT MIT - Poetischer Fließtext
                const partnerText = PathosTextGenerator.generatePersonText(
                    partnerArch,
                    personDimensions.partner,
                    partnerName,
                    seed + 100
                );

                // DARAUS ENTSTEHT - Poetische Synthese
                const syntheseText = PathosTextGenerator.generateSyntheseText({
                    ichArch,
                    partnerArch,
                    ichName,
                    partnerName,
                    ichDimensions: personDimensions.ich,
                    partnerDimensions: personDimensions.partner,
                    overallScore,
                    archStatements,
                    domStatements,
                    orientStatements,
                    seed
                });

                // RESONANZ - Poetische Interpretation
                let resonanzText = null;
                if (resonanzData && resonanzData.R !== undefined) {
                    resonanzText = PathosTextGenerator.generateResonanzText(
                        resonanzData.R,
                        seed + 200
                    );
                }

                return {
                    ich: ichText,
                    partner: partnerText,
                    synthese: syntheseText,
                    resonanz: resonanzText,
                    score: overallScore,
                    tonality: tonality
                };
            }

            // ═══════════════════════════════════════════════════════════════
            // FALLBACK: Original-Logik (wenn PathosTextGenerator nicht geladen)
            // ═══════════════════════════════════════════════════════════════
            const hash = getFactorHash(breakdown.archetyp, breakdown.dominanz, breakdown.orientierung, breakdown.geschlecht);

            // ICH BRINGT MIT
            const ichParts = [];
            if (ichArch?.pirsig?.dynamicQuality !== undefined) {
                const dynQual = ichArch.pirsig.dynamicQuality;
                if (dynQual >= 0.7) {
                    ichParts.push(`${ichName} bringt eine hohe dynamische Energie mit – offen für Veränderung und spontane Verbindung.`);
                } else if (dynQual >= 0.4) {
                    ichParts.push(`${ichName} balanciert zwischen Stabilität und Beweglichkeit in der emotionalen Welt.`);
                } else {
                    ichParts.push(`${ichName} sucht emotionale Tiefe durch Beständigkeit und vertraute Muster.`);
                }
            }
            if (ichArch?.osho?.naturalness >= 0.7) {
                ichParts.push(`Emotionale Authentizität steht im Vordergrund – ${ichName} folgt dem natürlichen Fluss der Gefühle.`);
            }
            const ichDom = person1.dominanz;
            if (ichDom) {
                const domText = {
                    'dominant': `Als Führende/r trägt ${ichName} eine aktive emotionale Energie.`,
                    'submissiv': `${ichName} bringt eine empfängliche, hingebungsvolle Qualität mit.`,
                    'switch': `${ichName} ist flexibel in der emotionalen Dynamik – mal führend, mal folgend.`,
                    'ausgeglichen': `${ichName} strebt nach emotionalem Gleichgewicht in der Verbindung.`
                };
                if (domText[ichDom]) ichParts.push(domText[ichDom]);
            }
            if (ichArch?.coreValues?.length) {
                ichParts.push(`Kernwerte wie ${ichArch.coreValues.slice(0, 2).join(' und ')} prägen das emotionale Erleben.`);
            }

            // PARTNER BRINGT MIT
            const partnerParts = [];
            if (partnerArch?.pirsig?.dynamicQuality !== undefined) {
                const dynQual = partnerArch.pirsig.dynamicQuality;
                if (dynQual >= 0.7) {
                    partnerParts.push(`${partnerName} bringt eine hohe dynamische Energie mit – offen für Veränderung und spontane Verbindung.`);
                } else if (dynQual >= 0.4) {
                    partnerParts.push(`${partnerName} balanciert zwischen Stabilität und Beweglichkeit in der emotionalen Welt.`);
                } else {
                    partnerParts.push(`${partnerName} sucht emotionale Tiefe durch Beständigkeit und vertraute Muster.`);
                }
            }
            if (partnerArch?.osho?.naturalness >= 0.7) {
                partnerParts.push(`Emotionale Authentizität steht im Vordergrund – ${partnerName} folgt dem natürlichen Fluss der Gefühle.`);
            }
            const partnerDom = person2.dominanz;
            if (partnerDom) {
                const domText = {
                    'dominant': `Als Führende/r trägt ${partnerName} eine aktive emotionale Energie.`,
                    'submissiv': `${partnerName} bringt eine empfängliche, hingebungsvolle Qualität mit.`,
                    'switch': `${partnerName} ist flexibel in der emotionalen Dynamik – mal führend, mal folgend.`,
                    'ausgeglichen': `${partnerName} strebt nach emotionalem Gleichgewicht in der Verbindung.`
                };
                if (domText[partnerDom]) partnerParts.push(domText[partnerDom]);
            }
            if (partnerArch?.coreValues?.length) {
                partnerParts.push(`Kernwerte wie ${partnerArch.coreValues.slice(0, 2).join(' und ')} prägen das emotionale Erleben.`);
            }

            // SYNTHESE
            const syntheseParts = [];
            const tonalityIntro = selectStatementByHash(tonalityTemplates[tonality].pathos, hash);
            if (tonalityIntro) syntheseParts.push(tonalityIntro);
            if (archStatements?.pathos) {
                const allPathos = [...(archStatements.pathos.gemeinsam || []), ...(archStatements.pathos.spannung || [])];
                const selected = selectStatementByHash(allPathos, hash + 7);
                if (selected) syntheseParts.push(selected);
            }
            if (domStatements?.pathos?.length) {
                syntheseParts.push(selectStatementByHash(domStatements.pathos, hash + 11));
            }
            const ichDyn = ichArch?.pirsig?.dynamicQuality || 0.5;
            const partnerDyn = partnerArch?.pirsig?.dynamicQuality || 0.5;
            if (Math.abs(ichDyn - partnerDyn) < 0.2) {
                syntheseParts.push(`Beide schwingen auf einer ähnlichen emotionalen Frequenz.`);
            }
            if (syntheseParts.length === 0) {
                syntheseParts.push(`${ichName} und ${partnerName} können emotional zueinander finden.`);
            }

            // RESONANZ
            let resonanzText = null;
            if (resonanzData?.R !== undefined) {
                const R = resonanzData.R;
                if (R >= 1.05) resonanzText = `Hohe emotionale Resonanz (R=${R.toFixed(2)}): Pathos und Logos harmonieren.`;
                else if (R >= 0.95) resonanzText = `Gute Resonanz (R=${R.toFixed(2)}): Emotionale und rationale Ebene im Gleichgewicht.`;
                else resonanzText = `Resonanz R=${R.toFixed(2)}: Die Wellenlängen sind noch nicht vollständig abgestimmt.`;
            }

            return {
                ich: ichParts.join(' '),
                partner: partnerParts.join(' '),
                synthese: syntheseParts.join(' '),
                resonanz: resonanzText,
                score: overallScore,
                tonality: tonality
            };
        }

        // Legacy-Wrapper für Kompatibilität
        function generateCombinedPathos(ichArch, partnerArch) {
            const detailed = generateDetailedPathos(ichArch, partnerArch);
            return detailed.synthese;
        }
        window.generateCombinedPathos = generateCombinedPathos;

        /**
         * Generiert detaillierte Logos-Inhalte mit ICH/Partner/Synthese Struktur
         * Nutzt LogosTextGenerator für fließende, analytische Texte
         * @returns {Object} { ich, partner, synthese, resonanz }
         */
        function generateDetailedLogos(ichArch, partnerArch) {
            const ichName = ichArch?.name || 'ICH';
            const partnerName = partnerArch?.name || 'Partner';
            const ichId = ichArch?.id || currentArchetype || '';
            const partnerId = partnerArch?.id || selectedPartner || '';

            // Berechne die 4 Faktor-Scores
            const person1 = {
                archetyp: ichId,
                dominanz: personDimensions.ich?.dominanz,
                orientierung: personDimensions.ich?.orientierung,
                geschlecht: personDimensions.ich?.geschlecht,
                orientierungStatus: personDimensions.ich?.orientierungStatus
            };
            const person2 = {
                archetyp: partnerId,
                dominanz: personDimensions.partner?.dominanz,
                orientierung: personDimensions.partner?.orientierung,
                geschlecht: personDimensions.partner?.geschlecht,
                orientierungStatus: personDimensions.partner?.orientierungStatus
            };

            // Hole Score-Breakdown
            const qualityResult = calculateRelationshipQuality(person1, person2);
            const breakdown = qualityResult.breakdown || { archetyp: 50, dominanz: 75, orientierung: 100, geschlecht: 100 };
            const overallScore = qualityResult.score || 50;
            const resonanzData = qualityResult.resonanz;
            const tonality = getTonality(overallScore);

            // Get category scores
            const key = `${ichId}_${partnerId}`;
            const interaction = data?.interactions?.[key];
            const categoryScores = interaction?.scores || {};

            // Hole Statement-Quellen
            const archStatements = getArchetypeStatements(ichId, partnerId);

            // ═══════════════════════════════════════════════════════════════
            // NUTZE LOGOS TEXT GENERATOR (wenn verfügbar)
            // ═══════════════════════════════════════════════════════════════
            if (typeof LogosTextGenerator !== 'undefined') {
                // Extrahiere primitive Werte für Hash (dominanz kann Objekt sein)
                const dom1 = typeof person1.dominanz === 'object' ? (person1.dominanz?.primary || 'none') : (person1.dominanz || 'none');
                const dom2 = typeof person2.dominanz === 'object' ? (person2.dominanz?.primary || 'none') : (person2.dominanz || 'none');

                // Generiere deterministischen Hash für Varianz
                const seed = LogosTextGenerator.generateHash(
                    ichId, partnerId,
                    dom1,
                    dom2,
                    overallScore
                );

                // ICH BRINGT MIT - Analytischer Fließtext
                const ichText = LogosTextGenerator.generatePersonText(
                    ichArch,
                    personDimensions.ich,
                    ichName,
                    seed
                );

                // PARTNER BRINGT MIT - Analytischer Fließtext
                const partnerText = LogosTextGenerator.generatePersonText(
                    partnerArch,
                    personDimensions.partner,
                    partnerName,
                    seed + 100
                );

                // DARAUS ENTSTEHT - Analytische Synthese
                const syntheseText = LogosTextGenerator.generateSyntheseText({
                    ichArch,
                    partnerArch,
                    ichName,
                    partnerName,
                    ichDimensions: personDimensions.ich,
                    partnerDimensions: personDimensions.partner,
                    overallScore,
                    archStatements,
                    categoryScores,
                    seed
                });

                // RESONANZ - Analytische Interpretation
                let resonanzText = null;
                if (resonanzData && resonanzData.R !== undefined) {
                    resonanzText = LogosTextGenerator.generateResonanzText(
                        resonanzData.R,
                        seed + 200
                    );
                }

                return {
                    ich: ichText,
                    partner: partnerText,
                    synthese: syntheseText,
                    resonanz: resonanzText,
                    score: overallScore,
                    tonality: tonality
                };
            }

            // ═══════════════════════════════════════════════════════════════
            // FALLBACK: Original-Logik (wenn LogosTextGenerator nicht geladen)
            // ═══════════════════════════════════════════════════════════════
            const hash = getFactorHash(breakdown.archetyp, breakdown.dominanz, breakdown.orientierung, breakdown.geschlecht);

            // ICH BRINGT MIT
            const ichParts = [];
            if (ichArch?.pirsig?.staticQuality !== undefined) {
                const statQual = ichArch.pirsig.staticQuality;
                if (statQual >= 0.7) {
                    ichParts.push(`${ichName} bringt klare Strukturen und feste Werte mit – Verlässlichkeit ist ein Grundpfeiler.`);
                } else if (statQual >= 0.4) {
                    ichParts.push(`${ichName} balanciert zwischen festen Überzeugungen und Offenheit für neue Perspektiven.`);
                } else {
                    ichParts.push(`${ichName} bevorzugt Flexibilität über starre Regeln.`);
                }
            }
            if (ichArch?.coreValues?.length) {
                ichParts.push(`Kernwerte: ${ichArch.coreValues.slice(0, 3).join(', ')}.`);
            }
            if (ichArch?.avoids?.length) {
                ichParts.push(`Vermeidet: ${ichArch.avoids.slice(0, 2).join(' und ')}.`);
            }
            const ichGfk = personDimensions.ich?.gfk;
            if (ichGfk) {
                const gfkText = {
                    'hoch': `GFK-Kompetenz: hoch.`,
                    'mittel': `GFK-Kompetenz: mittel.`,
                    'niedrig': `GFK-Kompetenz: niedrig.`
                };
                if (gfkText[ichGfk]) ichParts.push(gfkText[ichGfk]);
            }

            // PARTNER BRINGT MIT
            const partnerParts = [];
            if (partnerArch?.pirsig?.staticQuality !== undefined) {
                const statQual = partnerArch.pirsig.staticQuality;
                if (statQual >= 0.7) {
                    partnerParts.push(`${partnerName} bringt klare Strukturen und feste Werte mit.`);
                } else if (statQual >= 0.4) {
                    partnerParts.push(`${partnerName} balanciert zwischen Struktur und Flexibilität.`);
                } else {
                    partnerParts.push(`${partnerName} bevorzugt adaptive Strukturen.`);
                }
            }
            if (partnerArch?.coreValues?.length) {
                partnerParts.push(`Kernwerte: ${partnerArch.coreValues.slice(0, 3).join(', ')}.`);
            }
            if (partnerArch?.avoids?.length) {
                partnerParts.push(`Vermeidet: ${partnerArch.avoids.slice(0, 2).join(' und ')}.`);
            }
            const partnerGfk = personDimensions.partner?.gfk;
            if (partnerGfk) {
                const gfkText = {
                    'hoch': `GFK-Kompetenz: hoch.`,
                    'mittel': `GFK-Kompetenz: mittel.`,
                    'niedrig': `GFK-Kompetenz: niedrig.`
                };
                if (gfkText[partnerGfk]) partnerParts.push(gfkText[partnerGfk]);
            }

            // SYNTHESE
            const syntheseParts = [];
            const tonalityIntro = selectStatementByHash(tonalityTemplates[tonality].logos, hash);
            if (tonalityIntro) syntheseParts.push(tonalityIntro);
            if (archStatements?.logos) {
                const allLogos = [...(archStatements.logos.gemeinsam || []), ...(archStatements.logos.unterschied || [])];
                const selected = selectStatementByHash(allLogos, hash + 7);
                if (selected) syntheseParts.push(selected);
            }
            const ichStat = ichArch?.pirsig?.staticQuality || 0.5;
            const partnerStat = partnerArch?.pirsig?.staticQuality || 0.5;
            if (Math.abs(ichStat - partnerStat) < 0.2) {
                syntheseParts.push(`Ähnliches Strukturbedürfnis erleichtert die Abstimmung.`);
            }
            if (syntheseParts.length === 0) {
                syntheseParts.push(`${ichName} und ${partnerName} haben Potenzial für eine tragfähige Basis.`);
            }

            // RESONANZ
            let resonanzText = null;
            if (resonanzData?.R !== undefined) {
                const R = resonanzData.R;
                if (R >= 1.05) resonanzText = `Resonanz R=${R.toFixed(2)}: Hohe strukturelle Übereinstimmung.`;
                else if (R >= 0.95) resonanzText = `Resonanz R=${R.toFixed(2)}: Gute Kompatibilität.`;
                else resonanzText = `Resonanz R=${R.toFixed(2)}: Erfordert bewusste Abstimmung.`;
            }

            return {
                ich: ichParts.join(' '),
                partner: partnerParts.join(' '),
                synthese: syntheseParts.join(' '),
                resonanz: resonanzText,
                score: overallScore,
                tonality: tonality
            };
        }

        // Legacy-Wrapper für Kompatibilität
        function generateCombinedLogos(ichArch, partnerArch) {
            const detailed = generateDetailedLogos(ichArch, partnerArch);
            return detailed.synthese;
        }
        window.generateCombinedLogos = generateCombinedLogos;

        // Legacy-Funktion für Kompatibilität (wird nicht mehr verwendet)
        function generateCombinedLogos_legacy(ichArch, partnerArch) {
            const ichName = ichArch?.name || 'ICH';
            const partnerName = partnerArch?.name || 'Partner';
            // Use global archetype keys as IDs since archetypeDefinitions doesn't have id property
            const ichId = ichArch?.id || currentArchetype || '';
            const partnerId = partnerArch?.id || selectedPartner || '';

            // Get philosophy score from compatibility matrix
            const key = `${ichId}_${partnerId}`;
            const interaction = data?.interactions?.[key];
            const philScore = interaction?.scores?.A?.value || interaction?.overall || 50;

            // Hole Statements aus der Datenbank
            const archStatements = getArchetypeStatements(ichId, partnerId);
            const domStatements = getDominanceStatements(
                personDimensions.ich?.dominanz,
                personDimensions.partner?.dominanz
            );
            const orientStatements = getOrientierungStatements(
                personDimensions.ich?.orientierung,
                personDimensions.partner?.orientierung,
                personDimensions.ich?.geschlecht,
                personDimensions.partner?.geschlecht
            );
            const statusStmts = getStatusStatements(
                personDimensions.ich,
                personDimensions.partner
            );

            const textParts = [];

            // Archetyp-basierte Logos-Statements
            if (archStatements?.logos) {
                if (archStatements.logos.gemeinsam?.length) {
                    textParts.push(archStatements.logos.gemeinsam[0]);
                }
                if (archStatements.logos.unterschied?.length && philScore < 70) {
                    textParts.push(archStatements.logos.unterschied[0]);
                }
            }

            // Dominanz-basierte Logos-Statements (nur wenn nicht default)
            if (domStatements?.logos?.length && domStatements !== dominanceStatements.default) {
                textParts.push(domStatements.logos[0]);
            }

            // Orientierungs-basierte Logos-Statements hinzufügen (nur wenn nicht default)
            if (orientStatements?.logos?.length && orientStatements !== orientierungStatements.default) {
                textParts.push(orientStatements.logos[0]);
            }

            // Status-basierte Logos-Statements hinzufügen (Pirsig-Perspektive)
            if (statusStmts?.logos?.length && statusStmts !== statusStatements.default) {
                textParts.push(statusStmts.logos[0]);
            }

            // Fallback mit Philosophie-Score
            if (textParts.length === 0) {
                if (philScore >= 80) {
                    return `${ichName} und ${partnerName} teilen viele rationale Grundüberzeugungen über Beziehungen (Philosophie-Score: ${philScore}%). Das bildet eine solide Basis für konstruktive Gespräche.`;
                } else if (philScore < 50) {
                    return `${ichName} und ${partnerName} haben unterschiedliche rationale Vorstellungen von Beziehungen (Philosophie-Score: ${philScore}%). Grundlegende Gespräche über Erwartungen sind wichtig.`;
                }
                return `${ichName} und ${partnerName} haben einige Überschneidungen in ihren rationalen Beziehungsvorstellungen (Philosophie-Score: ${philScore}%), aber auch Unterschiede, die Kommunikation erfordern.`;
            }

            return textParts.join(' ');
        }

        // ========================================
        // MOBILE MULTI-PAGE FUNCTIONS
        // ========================================

        let currentMobilePage = 1;
        window.currentMobilePage = 1;
        // ═══════════════════════════════════════════════════════════════════════════
        // PHASE 1: PROXY-LAYER MIGRATION
        // ═══════════════════════════════════════════════════════════════════════════
        // mobilePersonDimensions verweist jetzt auf denselben Proxy wie personDimensions.
        // Mobile und Desktop teilen sich TiageState als Single Source of Truth.
        // ═══════════════════════════════════════════════════════════════════════════
        let mobilePersonDimensions = window.mobilePersonDimensions;
        let mobileIchArchetype = null;
        let mobilePartnerArchetype = null;
        let mobileTouchStartX = 0;
        let mobileTouchEndX = 0;

        function getMissingDimensions() {
            // Check if we're in mobile mode
            const isMobile = window.innerWidth <= 768;
            const dimensions = isMobile ? mobilePersonDimensions : personDimensions;
            const missing = [];

            // Check ICH dimensions
            // Geschlecht ist jetzt { primary, secondary } - nur primary ist erforderlich
            if (!dimensions.ich.geschlecht || !dimensions.ich.geschlecht.primary) {
                missing.push('Ich: Geschlecht');
            }
            if (dimensions.ich.dominanz === null) {
                missing.push('Ich: Dominanz');
            }
            if (dimensions.ich.orientierung === null) {
                missing.push('Ich: Orientierung');
            }
            if (dimensions.ich.orientierungStatus === null) {
                missing.push('Ich: Orientierung-Status');
            }

            // Check PARTNER dimensions
            if (!dimensions.partner.geschlecht || !dimensions.partner.geschlecht.primary) {
                missing.push('Partner: Geschlecht');
            }
            if (dimensions.partner.dominanz === null) {
                missing.push('Partner: Dominanz');
            }
            if (dimensions.partner.orientierung === null) {
                missing.push('Partner: Orientierung');
            }
            if (dimensions.partner.orientierungStatus === null) {
                missing.push('Partner: Orientierung-Status');
            }

            return missing;
        }

        function validateDimensionsComplete() {
            return getMissingDimensions().length === 0;
        }

        function showValidationWarning() {
            // Find or create warning element
            let warning = document.getElementById('dimensionWarning');
            if (warning) {
                warning.remove();
            }

            const missingItems = getMissingDimensions();

            warning = document.createElement('div');
            warning.id = 'dimensionWarning';
            warning.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(231, 76, 60, 0.95);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                font-size: 14px;
                font-weight: 600;
                z-index: 9999;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
                animation: slideDown 0.3s ease;
                max-width: 90%;
                text-align: left;
            `;

            // Build message with missing items
            let messageHTML = '<div style="margin-bottom: 8px;">⚠️ Es fehlt noch:</div>';
            messageHTML += '<ul style="margin: 0; padding-left: 20px; font-weight: normal; font-size: 13px;">';
            missingItems.forEach(item => {
                messageHTML += `<li>${item}</li>`;
            });
            messageHTML += '</ul>';

            warning.innerHTML = messageHTML;
            document.body.appendChild(warning);

            // Auto-remove after 4 seconds (slightly longer for reading)
            setTimeout(() => {
                warning.style.animation = 'slideUp 0.3s ease';
                setTimeout(() => warning.remove(), 300);
            }, 4000);
        }

        function mobileGoToPage(pageNumber, skipPushState = false) {
            // WICHTIG: Speichere alle Einstellungen BEVOR navigiert wird
            // Dies verhindert Datenverlust bei Zurück-Navigation (Fix für GOD-Einstellungen)
            if (typeof saveSelectionToStorage === 'function') {
                saveSelectionToStorage();
            }

            // Validate before moving to page 4 (Synthese) - ensure all dimensions are complete
            if (currentMobilePage === 3 && pageNumber === 4 && !validateDimensionsComplete()) {
                showValidationWarning();
                return;
            }

            // Hide all pages
            document.querySelectorAll('.mobile-page').forEach(p => {
                p.classList.remove('active');
            });

            // Show target page
            const targetPage = document.getElementById(`mobilePage${pageNumber}`);
            if (targetPage) {
                targetPage.classList.add('active');
            }

            // Update dots
            document.querySelectorAll('.page-dot').forEach((dot, index) => {
                dot.classList.toggle('active', index === pageNumber - 1);
            });

            currentMobilePage = pageNumber;
            window.currentMobilePage = pageNumber;

            // Update page content when navigating
            if (pageNumber === 4) {
                updateMobileResultPage();
            }

            // Push to browser history for back button navigation (only for forward navigation)
            if (!skipPushState) {
                history.pushState({ mobilePage: pageNumber }, '', `#seite${pageNumber}`);
            }

            // Scroll to top
            window.scrollTo(0, 0);
        }

        // DEAKTIVIERT: Swipe-Navigation entfernt - alle Seiten sind jetzt untereinander angeordnet
        function initMobileSwipe() {
            // Swipe-Funktionalität deaktiviert
            // Alle mobilen Seiten werden nun untereinander angezeigt
            return;
        }

        function handleMobileSwipe() {
            // Swipe-Funktionalität deaktiviert
            return;
        }

        function initMobileDimensionListeners() {
            // ICH Select
            const mobileIchSelect = document.getElementById('mobileIchSelect');
            if (mobileIchSelect) {
                mobileIchSelect.addEventListener('change', (e) => {
                    mobileIchArchetype = e.target.value;
                    // Sync with TiageState for save/load
                    if (typeof TiageState !== 'undefined') {
                        TiageState.setArchetype('ich', e.target.value);
                    }
                    // Sync with desktop
                    const desktopSelect = document.getElementById('ichSelect');
                    if (desktopSelect) desktopSelect.value = e.target.value;
                    currentArchetype = e.target.value;
                    // Sync archetype grid highlighting
                    updateArchetypeGrid('ich', e.target.value);

                    // SSOT: Berechne flatNeeds + Resonanzfaktoren bei Archetyp-Wechsel
                    if (typeof ProfileCalculator !== 'undefined' && typeof TiageState !== 'undefined') {
                        const profileData = {
                            archetyp: e.target.value,
                            geschlecht: TiageState.get('personDimensions.ich.geschlecht'),
                            dominanz: TiageState.get('personDimensions.ich.dominanz'),
                            orientierung: TiageState.get('personDimensions.ich.orientierung')
                        };
                        ProfileCalculator.loadProfile('ich', profileData);
                    }

                    updateComparisonView();
                    // GFK automatisch aus Archetypen-Matching ableiten
                    updateGfkFromArchetypes();
                });
            }

            // Partner Select
            const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
            if (mobilePartnerSelect) {
                mobilePartnerSelect.addEventListener('change', (e) => {
                    mobilePartnerArchetype = e.target.value;
                    // Sync with TiageState for save/load
                    if (typeof TiageState !== 'undefined') {
                        TiageState.setArchetype('partner', e.target.value);
                    }
                    // Sync with desktop
                    const desktopSelect = document.getElementById('partnerSelect');
                    if (desktopSelect) desktopSelect.value = e.target.value;
                    selectedPartner = e.target.value;
                    // Sync archetype grid highlighting
                    updateArchetypeGrid('partner', e.target.value);

                    // SSOT: Berechne flatNeeds + Resonanzfaktoren bei Archetyp-Wechsel
                    if (typeof ProfileCalculator !== 'undefined' && typeof TiageState !== 'undefined') {
                        const profileData = {
                            archetyp: e.target.value,
                            geschlecht: TiageState.get('personDimensions.partner.geschlecht'),
                            dominanz: TiageState.get('personDimensions.partner.dominanz'),
                            orientierung: TiageState.get('personDimensions.partner.orientierung')
                        };
                        ProfileCalculator.loadProfile('partner', profileData);
                    }

                    updateComparisonView();
                    // GFK automatisch aus Archetypen-Matching ableiten
                    updateGfkFromArchetypes();
                });
            }

            // ICH Dimensions
            document.querySelectorAll('input[name="mobile-ich-geschlecht"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    // Use handleGeschlechtClick to maintain consistent object format
                    handleGeschlechtClick('ich', e.target.value, e.target);
                });
            });
            document.querySelectorAll('input[name="mobile-ich-dominanz"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    handleDominanzClick('ich', e.target.value, true);
                });
            });
            document.querySelectorAll('input[name="mobile-ich-dominanz-status"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    mobilePersonDimensions.ich.dominanzStatus = e.target.value;
                    personDimensions.ich.dominanzStatus = e.target.value;
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    syncDimensionToDesktop('ich-dominanz-status-new', e.target.value);
                    updateComparisonView();
                    // Fix: Speichere Änderungen sofort
                    if (typeof saveSelectionToStorage === 'function') {
                        saveSelectionToStorage();
                    }
                });
            });

            // Partner Dimensions
            document.querySelectorAll('input[name="mobile-partner-geschlecht"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    // Use handleGeschlechtClick to maintain consistent object format
                    handleGeschlechtClick('partner', e.target.value, e.target);
                });
            });
            document.querySelectorAll('input[name="mobile-partner-dominanz"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    handleDominanzClick('partner', e.target.value, true);
                });
            });
            document.querySelectorAll('input[name="mobile-partner-dominanz-status"]').forEach(radio => {
                radio.addEventListener('change', (e) => {
                    mobilePersonDimensions.partner.dominanzStatus = e.target.value;
                    personDimensions.partner.dominanzStatus = e.target.value;
                    e.target.closest('.compact-dimension').classList.remove('needs-selection');
                    syncDimensionToDesktop('partner-dominanz-status-new', e.target.value);
                    updateComparisonView();
                    // Fix: Speichere Änderungen sofort
                    if (typeof saveSelectionToStorage === 'function') {
                        saveSelectionToStorage();
                    }
                });
            });
        }

        function syncDimensionToDesktop(name, value) {
            const desktopRadio = document.querySelector(`input[name="${name}"][value="${value}"]`);
            if (desktopRadio) {
                desktopRadio.checked = true;
                const container = desktopRadio.closest('.compact-dimension');
                if (container) container.classList.remove('needs-selection');
            }
        }

        function updateMobileResultPage() {
            if (!data) return;

            const ichArch = data.archetypes[mobileIchArchetype || currentArchetype];
            const partnerArch = data.archetypes[mobilePartnerArchetype || selectedPartner];

            // Update type names
            document.getElementById('mobileResultIch').textContent = ichArch?.name || mobileIchArchetype;
            document.getElementById('mobileResultPartner').textContent = partnerArch?.name || mobilePartnerArchetype;

            // Calculate scores - use mobilePersonDimensions for consistency with tooltips
            const dims = mobilePersonDimensions;
            const person1 = { archetyp: mobileIchArchetype || currentArchetype, ...dims.ich };
            const person2 = { archetyp: mobilePartnerArchetype || selectedPartner, ...dims.partner };

            // Check if both genders are selected before calculating
            // Support both string format ('cis_mann') and object format ({ primary: 'cis_mann' })
            const g1Raw = dims.ich.geschlecht;
            const g2Raw = dims.partner.geschlecht;
            const g1 = (typeof g1Raw === 'string') ? g1Raw : (g1Raw && g1Raw.primary);
            const g2 = (typeof g2Raw === 'string') ? g2Raw : (g2Raw && g2Raw.primary);

            // Check if any orientierung is selected for both (Primary/Secondary structure)
            const hasOri1 = dims.ich.orientierung && dims.ich.orientierung.primary;
            const hasOri2 = dims.partner.orientierung && dims.partner.orientierung.primary;

            // Check if any dominanz is selected for both (Primary/Secondary structure)
            const hasDom1 = dims.ich.dominanz && dims.ich.dominanz.primary;
            const hasDom2 = dims.partner.dominanz && dims.partner.dominanz.primary;

            const isIncomplete = !g1 || !g2 || !hasOri1 || !hasOri2 || !hasDom1 || !hasDom2;

            const qualityResult = isIncomplete ?
                { score: 0, blocked: false, incomplete: true, breakdown: { archetyp: 0, dominanz: 0, orientierung: 0, geschlecht: 0 } } :
                calculateRelationshipQuality(person1, person2);

            // Update score circle
            const scoreCircle = document.getElementById('mobileScoreCircle');

            // Set score circle color and content
            // Kein harter K.O. mehr - sanfte Abstufung durch Resonanz
            if (qualityResult.incomplete) {
                scoreCircle.textContent = '–';
            } else {
                scoreCircle.textContent = qualityResult.score.toFixed(1);
            }
            scoreCircle.style.background = 'transparent';

            // Sync score to resultPercentage for Tiage's Synthese modal
            const resultPercentageEl = document.getElementById('resultPercentage');
            if (resultPercentageEl) {
                resultPercentageEl.textContent = qualityResult.incomplete ? '–' : qualityResult.score.toFixed(1);
            }

            // Update Mobile Score Note (direkt beim Kreis)
            const mobileScoreNote = document.getElementById('mobileScoreNote');
            if (mobileScoreNote) {
                let noteText = '';
                let quoteText = '';
                let quoteSource = '';
                const score = qualityResult.score;

                // ═══════════════════════════════════════════════════════════════
                // K.O.-WARNUNG: Prüfe auf harte Ausschlusskriterien
                // ═══════════════════════════════════════════════════════════════
                let koWarning = null;

                // 1. Orientierungs-K.O. (keine körperliche Anziehung möglich)
                if (qualityResult.blocked && qualityResult.reason) {
                    koWarning = {
                        type: 'orientation',
                        message: qualityResult.reason
                    };
                }

                // 2. Lifestyle-K.O. prüfen (Kinderwunsch, Wohnform etc.)
                if (!koWarning && typeof TiageSynthesis !== 'undefined' && TiageSynthesis.LifestyleFilter) {
                    const attrs1 = personDimensions.ich?.baseAttributes || {};
                    const attrs2 = personDimensions.partner?.baseAttributes || {};
                    const lifestyleCheck = TiageSynthesis.LifestyleFilter.check(attrs1, attrs2);

                    if (lifestyleCheck.isKO && lifestyleCheck.koReasons.length > 0) {
                        koWarning = {
                            type: 'lifestyle',
                            message: lifestyleCheck.koReasons.map(r => r.message).join(' | '),
                            details: lifestyleCheck.koReasons
                        };
                    }
                }

                if (qualityResult.incomplete) {
                    noteText = TiageI18n.t('ui.selectAllDimensions', 'Bitte alle Dimensionen auswählen.');
                    mobileScoreNote.textContent = noteText;
                    mobileScoreNote.style.display = 'block';
                } else if (koWarning) {
                    // K.O.-Warnung anzeigen
                    mobileScoreNote.innerHTML = '<div class="ko-warning-message" style="color: #e74c3c; background: rgba(231, 76, 60, 0.15); border: 1px solid #e74c3c; border-radius: 8px; padding: 10px 12px; margin-top: 8px; text-align: center;"><strong style="display: block; margin-bottom: 4px;">⚠️ K.O.-Kriterium</strong><span style="font-size: 0.9em; opacity: 0.95;">' + koWarning.message + '</span></div>';
                    mobileScoreNote.style.display = 'block';
                } else if (qualityResult.noRealNeeds) {
                    // Warnung: Keine echten Needs verfügbar - R1-R3 sind neutral (1.0)
                    mobileScoreNote.innerHTML = '<div class="needs-warning-message" style="color: #f39c12; background: rgba(243, 156, 18, 0.15); border: 1px solid #f39c12; border-radius: 8px; padding: 10px 12px; margin-top: 8px; text-align: center;"><strong style="display: block; margin-bottom: 4px;">⚠️ ' + TiageI18n.t('warnings.noNeedsData', 'Keine Bedürfnis-Daten') + '</strong><span style="font-size: 0.9em; opacity: 0.95;">' + TiageI18n.t('warnings.noNeedsDataDesc', 'R1-R3 Resonanz-Faktoren können nicht berechnet werden. Bitte Bedürfnis-Werte im Profil anpassen.') + '</span></div>';
                    mobileScoreNote.style.display = 'block';
                } else {
                    // Bestimme Resonanzlevel basierend auf Score
                    let resonanceLevel = 'niedrig';
                    if (score >= 80) resonanceLevel = 'hoch';
                    else if (score >= 50) resonanceLevel = 'mittel';

                    // Versuche Zitat aus ResonanceQuotesTable zu holen
                    if (typeof ResonanceQuotesTable !== 'undefined') {
                        const category = score >= 65 ? 'RESONANCE' : score >= 50 ? 'GROWTH' : 'AWARENESS';
                        const result = ResonanceQuotesTable.generateResonanceText(resonanceLevel, category, 'de');

                        if (result && result.quote) {
                            noteText = result.title;
                            quoteText = result.quote;
                            quoteSource = result.quoteSource ? ` — ${result.quoteSource}` : '';
                        }
                    }

                    // Fallback zu hardcoded Texten wenn ResonanceQuotesTable nicht verfügbar
                    if (!quoteText) {
                        if (score < 30) {
                            noteText = 'Sehr niedrige Resonanz – große Unterschiede.';
                            quoteText = 'Hier begegnen sich zwei Menschen, deren Frequenzen sich deutlich unterscheiden. Diese Beziehung erfordert besondere Achtsamkeit und die Bereitschaft, die Andersartigkeit des anderen als Bereicherung zu sehen.';
                        } else if (score >= 80) {
                            noteText = 'Hohe Resonanz – Muster ergänzen sich.';
                            quoteText = 'Hier begegnen sich zwei Menschen, deren Frequenzen sich natürlich ergänzen. Diese Verbindung trägt die Qualität tiefer Resonanz – ein Zusammenspiel, das beide bereichert und wachsen lässt.';
                        } else if (score >= 65) {
                            noteText = 'Solide Balance mit Potenzial.';
                            quoteText = 'Hier begegnen sich zwei Menschen mit guter Grundresonanz. Diese Verbindung bietet eine solide Balance und echtes Potenzial für gemeinsames Wachstum.';
                        } else if (score >= 50) {
                            noteText = 'Basis vorhanden, Arbeit erforderlich.';
                            quoteText = 'Hier begegnen sich zwei Menschen mit einer tragfähigen Basis. Diese Verbindung hat Qualität, die durch bewusste Kommunikation und gegenseitiges Verständnis vertieft werden kann.';
                        } else {
                            noteText = 'Bewusste Reflexion erforderlich.';
                            quoteText = 'Hier begegnen sich zwei Menschen mit unterschiedlichen Mustern. Diese Verbindung lädt zur bewussten Reflexion ein – ein Weg, der Offenheit und ehrliche Kommunikation erfordert.';
                        }
                    }

                    mobileScoreNote.innerHTML = '<strong>' + noteText + '</strong><br><span style="font-style: italic; opacity: 0.85; font-size: 0.9em;">"' + quoteText + '"' + quoteSource + '</span>';
                    mobileScoreNote.style.display = 'block';
                }
            }
        }

        function updateMobileProContraPage() {
            if (!data) return;

            const ichArch = data.archetypes[mobileIchArchetype || currentArchetype];
            const partnerArch = data.archetypes[mobilePartnerArchetype || selectedPartner];

            // Update title
            const title = document.getElementById('mobileProContraTitle');
            if (title) {
                title.textContent = `${ichArch?.name || 'ICH'} × ${partnerArch?.name || 'PARTNER'}`;
            }

            // Get interaction data
            const interactionKey = `${mobileIchArchetype || currentArchetype}_${mobilePartnerArchetype || selectedPartner}`;
            const interaction = data.interactions?.[interactionKey];

            const proList = document.getElementById('mobileProList');
            const contraList = document.getElementById('mobileContraList');

            if (interaction) {
                // Pro list
                if (proList && interaction.pros?.length) {
                    proList.innerHTML = interaction.pros.map(p => `<li>${p}</li>`).join('');
                } else if (proList) {
                    proList.innerHTML = `<li>${TiageI18n.t('ui.noSpecificAdvantages', 'Keine spezifischen Vorteile bekannt')}</li>`;
                }

                // Contra list
                if (contraList && interaction.contras?.length) {
                    contraList.innerHTML = interaction.contras.map(c => `<li>${c}</li>`).join('');
                } else if (contraList) {
                    contraList.innerHTML = `<li>${TiageI18n.t('ui.noSpecificChallenges', 'Keine spezifischen Herausforderungen bekannt')}</li>`;
                }
            } else {
                if (proList) proList.innerHTML = `<li>${TiageI18n.t('ui.noDataAvailable', 'Keine Daten verfügbar.')}</li>`;
                if (contraList) contraList.innerHTML = `<li>${TiageI18n.t('ui.noDataAvailable', 'Keine Daten verfügbar.')}</li>`;
            }
        }

        function updateMobileCategoriesPage() {
            if (!data) return;

            const container = document.getElementById('mobileCategoriesAccordion');
            if (!container) return;

            // SSOT v3.10: Needs aus TiageState laden für R-Faktor-Berechnung
            // FIX v4.3: getFlatNeeds() statt get() — gibt flache Needs für aktuellen Archetyp zurück
            const ichNeeds = typeof TiageState !== 'undefined' && TiageState.getFlatNeeds ? TiageState.getFlatNeeds('ich') : null;
            const partnerNeeds = typeof TiageState !== 'undefined' && TiageState.getFlatNeeds ? TiageState.getFlatNeeds('partner') : null;

            const person1 = { archetyp: mobileIchArchetype || currentArchetype, ...personDimensions.ich, needs: ichNeeds };
            const person2 = { archetyp: mobilePartnerArchetype || selectedPartner, ...personDimensions.partner, needs: partnerNeeds };

            const pathosCheck = checkPhysicalCompatibility(person1, person2);
            const logosCheck = calculatePhilosophyCompatibility(person1.archetyp, person2.archetyp);
            // SSOT v3.10: R-Faktoren aus person.needs
            const result = calculateOverallWithModifiers(person1, person2, pathosCheck, logosCheck);

            const categoryNamesMap = {
                A: 'Beziehungsphilosophie',
                B: 'Werte-Alignment',
                C: 'Nähe-Distanz',
                D: 'Autonomie',
                E: 'Kommunikation',
                F: 'Soziale Kompatibilität'
            };

            const categoryDescMap = {
                A: 'Übereinstimmung in den grundlegenden Beziehungsvorstellungen und -erwartungen.',
                B: 'Wie gut eure moralischen und ethischen Werte übereinstimmen.',
                C: 'Balance zwischen Bedürfnis nach Nähe und Freiraum.',
                D: 'Respekt für individuelle Unabhängigkeit und Selbstbestimmung.',
                E: 'Fähigkeit zur offenen und ehrlichen Kommunikation.',
                F: 'Kompatibilität im sozialen Umfeld und gesellschaftlicher Akzeptanz.'
            };

            // FEATURE 2: Category explanations
            function getCategoryExplanation(cat, score, ich, partner) {
                const ichName = data?.archetypes?.[ich]?.name || ich;
                const partnerName = data?.archetypes?.[partner]?.name || partner;

                const explanations = {
                    A: () => {
                        if (ich === partner) {
                            return `${ichName} und ${partnerName} teilen dieselbe Beziehungsphilosophie (100% Übereinstimmung). Beide haben identische Grundüberzeugungen über Beziehungsstrukturen, was eine solide Basis bietet.`;
                        }
                        if (score >= 80) {
                            return `${ichName} und ${partnerName} haben sehr ähnliche Beziehungsphilosophien (${score}%). Die Grundüberzeugungen passen gut zusammen und schaffen eine harmonische Basis.`;
                        } else if (score >= 60) {
                            return `${ichName} (sucht ${ichName === 'Single' ? 'Freiheit' : ichName === 'Duo' ? 'Exklusivität' : 'Flexibilität'}) und ${partnerName} (sucht ${partnerName === 'Single' ? 'Freiheit' : partnerName === 'Duo' ? 'Exklusivität' : 'Flexibilität'}) haben unterschiedliche, aber vereinbare Beziehungsphilosophien (${score}%). Mit Kommunikation und Verständnis ist eine Brücke möglich.`;
                        } else {
                            return `${ichName} und ${partnerName} haben fundamentale philosophische Unterschiede (${score}%). Die Beziehungsvorstellungen weichen stark voneinander ab. Intensive Kommunikation und große Kompromisse sind nötig.`;
                        }
                    },
                    B: () => `Diese Kategorie misst, wie gut eure moralischen Werte übereinstimmen. Ein Score von ${score}% zeigt ${score >= 70 ? 'starke' : score >= 50 ? 'moderate' : 'schwache'} Übereinstimmung in ethischen Grundfragen.`,
                    C: () => `Nähe-Distanz bewertet das Gleichgewicht zwischen Zusammensein und Freiraum. Bei ${score}% gibt es ${score >= 70 ? 'eine harmonische Balance' : score >= 50 ? 'moderate Abstimmung nötig' : 'deutliche Unterschiede in den Bedürfnissen'}.`,
                    D: () => `Autonomie misst den Respekt für individuelle Freiheit. ${score}% bedeutet ${score >= 70 ? 'hohe gegenseitige Wertschätzung' : score >= 50 ? 'moderate Übereinstimmung' : 'Spannungen durch unterschiedliche Autonomie-Bedürfnisse'}.`,
                    E: () => `Kommunikation bewertet Offenheit und Ehrlichkeit. Ein Score von ${score}% zeigt ${score >= 70 ? 'exzellente Kommunikationsbasis' : score >= 50 ? 'solide, aber ausbaufähige Kommunikation' : 'Herausforderungen in der Verständigung'}.`,
                    F: () => `Soziale Kompatibilität bewertet gesellschaftliche Akzeptanz und Umfeld-Passung. ${score}% bedeutet ${score >= 70 ? 'sehr gute soziale Harmonie' : score >= 50 ? 'akzeptable soziale Integration' : 'potenzielle soziale Herausforderungen'}.`
                };

                return explanations[cat] ? explanations[cat]() : '';
            }

            let html = '';
            for (const [cat, catData] of Object.entries(result.categories)) {
                const score = catData.score || 0;
                const barClass = score >= 80 ? 'bar-excellent' : score >= 65 ? 'bar-good' : score >= 50 ? 'bar-medium' : 'bar-low';
                const explanation = getCategoryExplanation(cat, score, person1.archetyp, person2.archetyp);

                html += `
                    <div class="category-accordion-item">
                        <div class="category-accordion-header" onclick="toggleMobileCategory(this)">
                            <span class="category-accordion-letter">${cat}</span>
                            <span class="category-accordion-name">${categoryNamesMap[cat] || cat}</span>
                            <span class="category-accordion-score">${score}%</span>
                            <span class="category-accordion-icon">▼</span>
                        </div>
                        <div class="category-accordion-content">
                            <div class="category-accordion-inner">
                                <p class="category-accordion-desc">${categoryDescMap[cat] || ''}</p>
                                <div style="margin-top: 10px; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                                    <div class="${barClass}" style="height: 100%; width: ${score}%; border-radius: 4px;"></div>
                                </div>
                                <div style="margin-top: 15px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid var(--primary);">
                                    <h4 style="font-size: var(--font-sm); color: var(--text-primary); margin-bottom: 8px;">Warum ${score}%?</h4>
                                    <p style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5; margin: 0;">${explanation}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            }

            container.innerHTML = html;
        }

        function toggleMobileCategory(header) {
            const item = header.closest('.category-accordion-item');
            if (item) {
                item.classList.toggle('open');
            }
        }

        function checkAndShowMobileLayout() {
            const isMobile = window.innerWidth <= 768;
            const desktopView = document.getElementById('comparisonView');
            const mobileView = document.getElementById('mobileMultipage');

            if (isMobile) {
                if (desktopView) desktopView.style.display = 'none';
                if (mobileView) mobileView.style.display = 'block';
            } else {
                if (desktopView) desktopView.style.display = 'block';
                if (mobileView) mobileView.style.display = 'none';
            }
        }

        // ========================================
        // MOBILE GEWICHTUNG FUNCTIONS
        // ========================================

        function updateMobileGewichtung(factor, value) {
            const numValue = Math.max(0, Math.min(100, parseInt(value, 10) || 0));

            // Update input and slider
            const input = document.getElementById(`mobile-gewicht-${factor}`);
            const slider = document.getElementById(`mobile-gewicht-slider-${factor}`);
            if (input) input.value = numValue;
            if (slider) slider.value = numValue;

            // Sync mit GewichtungCard (nutzt deren normalize-Logik)
            if (typeof GewichtungCard !== 'undefined') {
                GewichtungCard.normalize(factor, numValue);
                // Sync zurück von GewichtungCard zu Mobile UI
                syncMobileGewichtungFromState();
            }

            // Update Summe
            updateMobileGewichtungSumme();

            // Sync mit Desktop AGOD Sticks
            syncDesktopAgodFromMobile();

            // Trigger recalculation
            if (typeof updateDisplay === 'function') updateDisplay();
        }

        function syncMobileGewichtungFromState() {
            if (typeof GewichtungCard === 'undefined') return;

            const gew = GewichtungCard.getValues();

            // Update Mobile inputs/sliders
            ['orientierung', 'archetyp', 'dominanz', 'geschlecht'].forEach(factor => {
                const key = factor === 'orientierung' ? 'O' :
                           factor === 'archetyp' ? 'A' :
                           factor === 'dominanz' ? 'D' : 'G';
                const val = gew[key];
                const input = document.getElementById(`mobile-gewicht-${factor}`);
                const slider = document.getElementById(`mobile-gewicht-slider-${factor}`);
                if (input) input.value = val;
                if (slider) slider.value = val;
            });

            updateMobileGewichtungSumme();
        }

        function updateMobileGewichtungSumme() {
            const o = parseInt(document.getElementById('mobile-gewicht-orientierung')?.value) || 0;
            const a = parseInt(document.getElementById('mobile-gewicht-archetyp')?.value) || 0;
            const d = parseInt(document.getElementById('mobile-gewicht-dominanz')?.value) || 0;
            const g = parseInt(document.getElementById('mobile-gewicht-geschlecht')?.value) || 0;
            const summe = o + a + d + g;

            const summeEl = document.getElementById('mobile-gewicht-summe');
            const summeLabelEl = document.getElementById('mobile-gewicht-summe-label');

            if (summeEl) {
                summeEl.textContent = summe + '%';
                summeEl.style.color = summe === 100 ? '#10B981' : '#EF4444';
            }
            if (summeLabelEl) {
                summeLabelEl.textContent = summe + '%';
                summeLabelEl.style.color = summe === 100 ? '' : '#EF4444';
            }
        }

        function syncDesktopAgodFromMobile() {
            // Sync to Desktop AGOD Weight Sticks
            const gew = typeof GewichtungCard !== 'undefined' ? GewichtungCard.getValues() : null;
            if (!gew) return;

            const agodA = document.getElementById('agodWeightA');
            const agodG = document.getElementById('agodWeightG');
            const agodO = document.getElementById('agodWeightO');
            const agodD = document.getElementById('agodWeightD');

            if (agodA) agodA.value = gew.A;
            if (agodG) agodG.value = gew.G;
            if (agodO) agodO.value = gew.O;
            if (agodD) agodD.value = gew.D;

            // Update AGOD stick visuals if function exists
            if (typeof updateAgodStickVisuals === 'function') {
                updateAgodStickVisuals();
            }
        }

        function resetMobileGewichtung() {
            if (typeof GewichtungCard !== 'undefined') {
                GewichtungCard.reset();
            }

            // Reset Mobile UI
            ['orientierung', 'archetyp', 'dominanz', 'geschlecht'].forEach(factor => {
                const input = document.getElementById(`mobile-gewicht-${factor}`);
                const slider = document.getElementById(`mobile-gewicht-slider-${factor}`);
                if (input) input.value = 25;
                if (slider) slider.value = 25;
            });

            updateMobileGewichtungSumme();
            syncDesktopAgodFromMobile();

            if (typeof updateDisplay === 'function') updateDisplay();
        }

        function initMobileGewichtung() {
            // Load initial values from GewichtungCard
            syncMobileGewichtungFromState();
        }

        // Make functions globally available
        window.updateMobileGewichtung = updateMobileGewichtung;
        window.resetMobileGewichtung = resetMobileGewichtung;

        // ========================================
        // MOBILE GESCHLECHT SECONDARY GRIDS
        // ========================================

        function initMobileGeschlechtGrids() {
            // Mobile geschlecht P-grids are initialized by initDimensionButtons (via pGridSelectors)
            // S-grids are dynamically populated by updateGeschlechtSGrid when P is selected
            // Just trigger S-grid update for any existing P selections
            ['ich', 'partner'].forEach(person => {
                if (personDimensions[person].geschlecht?.primary) {
                    updateGeschlechtSGrid(person);
                }
            });
        }

        function initMobileLayout() {
            initMobileSwipe();
            initMobileDimensionListeners();
            checkAndShowMobileLayout();
            initMobileGewichtung();
            initMobileGeschlechtGrids();

            // Listen for window resize
            window.addEventListener('resize', checkAndShowMobileLayout);

            // Initialize browser history for back button support
            initBrowserHistoryNavigation();
        }

        function initBrowserHistoryNavigation() {
            // Set initial state without adding to history
            history.replaceState({ mobilePage: 1 }, '', '#seite1');

            // Handle browser back/forward button
            window.addEventListener('popstate', function(event) {
                // First, close any open modals when going back
                const factorModal = document.getElementById('factorModal');
                const helpModal = document.getElementById('helpModal');
                const commentModal = document.getElementById('commentModal');
                const tiageSyntheseModal = document.getElementById('tiageSyntheseModal');

                // Check if we're returning FROM a modal state (current modal should close)
                if (factorModal && factorModal.classList.contains('active')) {
                    closeFactorModal(null, true);
                }
                if (helpModal && helpModal.classList.contains('active')) {
                    closeHelpModal(null, true);
                }
                if (commentModal && commentModal.classList.contains('active')) {
                    closeCommentModal(null, true);
                }
                if (tiageSyntheseModal && tiageSyntheseModal.classList.contains('active')) {
                    if (typeof closeTiageSyntheseModal === 'function') closeTiageSyntheseModal(null, true);
                    else if (typeof window.closeTiageSyntheseModal === 'function') window.closeTiageSyntheseModal(null, true);
                }

                // Navigate to the correct page
                if (event.state && event.state.mobilePage) {
                    // Only change page if we're not on a modal state
                    if (!event.state.modal) {
                        mobileGoToPage(event.state.mobilePage, true);
                    }
                } else {
                    // If no state, go to page 1
                    mobileGoToPage(1, true);
                }
            });

            // Handle initial load with hash (e.g., direct link to #seite2)
            const hash = window.location.hash;
            if (hash && hash.startsWith('#seite')) {
                const pageNum = parseInt(hash.replace('#seite', ''));
                if (pageNum >= 1 && pageNum <= 3) {
                    // Delay to ensure DOM is ready
                    setTimeout(() => {
                        // For page 2 and 3, we need valid selections - go to page 1 first
                        if (pageNum > 1) {
                            mobileGoToPage(1, true);
                        }
                    }, 100);
                }
            }
        }

        /**
         * Load saved dimensions from TiageState into local personDimensions variable
         * This ensures the UI reflects any previously saved selections
         */
        function loadDimensionsFromState() {
            console.log('[loadDimensionsFromState] Start - TiageState verfügbar:', typeof TiageState !== 'undefined');
            if (typeof TiageState === 'undefined') return;

            // FIX v1.8.691: init() statt loadFromStorage() - idempotent, kann mehrfach aufgerufen werden
            // state.js ruft init() bereits beim DOMContentLoaded auf, aber zur Sicherheit nochmal
            TiageState.init();

            // Load archetypes from TiageState and sync with global variables (Desktop + Mobile)
            const savedIchArchetype = TiageState.getArchetype('ich');
            const savedPartnerArchetype = TiageState.getArchetype('partner');

            console.log('[loadDimensionsFromState] Geladene Archetypen - ICH:', savedIchArchetype, 'PARTNER:', savedPartnerArchetype);

            if (savedIchArchetype) {
                currentArchetype = savedIchArchetype;
                mobileIchArchetype = savedIchArchetype;
                // Sync all ICH select dropdowns
                const archetypeSelect = document.getElementById('archetypeSelect');
                const ichSelect = document.getElementById('ichSelect');
                const mobileIchSelect = document.getElementById('mobileIchSelect');
                if (archetypeSelect) archetypeSelect.value = savedIchArchetype;
                if (ichSelect) ichSelect.value = savedIchArchetype;
                if (mobileIchSelect) mobileIchSelect.value = savedIchArchetype;
                // Sync archetype grid highlighting
                if (typeof updateArchetypeGrid === 'function') {
                    updateArchetypeGrid('ich', savedIchArchetype);
                }
            }

            if (savedPartnerArchetype) {
                selectedPartner = savedPartnerArchetype;
                mobilePartnerArchetype = savedPartnerArchetype;
                // Sync all PARTNER select dropdowns
                const partnerSelect = document.getElementById('partnerSelect');
                const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
                if (partnerSelect) partnerSelect.value = savedPartnerArchetype;
                if (mobilePartnerSelect) mobilePartnerSelect.value = savedPartnerArchetype;
                // Sync archetype grid highlighting
                if (typeof updateArchetypeGrid === 'function') {
                    updateArchetypeGrid('partner', savedPartnerArchetype);
                }
            }

            ['ich', 'partner'].forEach(person => {
                const savedDims = TiageState.get(`personDimensions.${person}`);
                console.log(`[loadDimensionsFromState] ${person} savedDims:`, JSON.stringify(savedDims));
                if (!savedDims) {
                    console.log(`[loadDimensionsFromState] Keine gespeicherten Dimensionen für ${person}`);
                    return;
                }

                // Sync geschlecht
                if (savedDims.geschlecht) {
                    // Handle both old format (string) and new format (object with primary/secondary)
                    if (typeof savedDims.geschlecht === 'object' && 'primary' in savedDims.geschlecht) {
                        personDimensions[person].geschlecht = savedDims.geschlecht;
                    } else if (typeof savedDims.geschlecht === 'string') {
                        // Old format: string like "cis_frau" - convert to new format as primary
                        personDimensions[person].geschlecht = { primary: savedDims.geschlecht, secondary: null };
                    }
                }

                // Sync dominanz - handle both formats
                if (savedDims.dominanz) {
                    if (typeof savedDims.dominanz === 'object') {
                        // New format: { primary: 'dominant', secondary: null }
                        if ('primary' in savedDims.dominanz) {
                            personDimensions[person].dominanz = savedDims.dominanz;
                        } else {
                            // Old format: { dominant: 'gelebt', submissiv: null, ... }
                            // Convert to new format
                            let primary = null;
                            let secondary = null;
                            for (const [type, status] of Object.entries(savedDims.dominanz)) {
                                if (status === 'gelebt' && !primary) {
                                    primary = type;
                                } else if (status === 'interessiert' && !secondary) {
                                    secondary = type;
                                }
                            }
                            personDimensions[person].dominanz = { primary, secondary };
                        }
                    }
                }

                // Sync orientierung - handle all formats and migrate to v4.1 Array format
                if (savedDims.orientierung) {
                    let orientierungen = [];

                    // Convert from various formats to Array
                    if (Array.isArray(savedDims.orientierung)) {
                        // Already array format (v4.0+)
                        orientierungen = [...savedDims.orientierung];
                    } else if (typeof savedDims.orientierung === 'object') {
                        if ('primary' in savedDims.orientierung) {
                            // Format: { primary: 'heterosexuell', secondary: null }
                            if (savedDims.orientierung.primary) {
                                orientierungen.push(savedDims.orientierung.primary);
                            }
                            if (savedDims.orientierung.secondary) {
                                orientierungen.push(savedDims.orientierung.secondary);
                            }
                        } else {
                            // Old format: { heterosexuell: 'gelebt', homosexuell: null, ... }
                            for (const [type, status] of Object.entries(savedDims.orientierung)) {
                                if (status === 'gelebt') {
                                    orientierungen.push(type);
                                } else if (status === 'interessiert') {
                                    orientierungen.push(type);
                                }
                            }
                        }
                    }

                    // v5.0 SSOT: Migrate legacy values zu aktuellen Keys
                    orientierungen = orientierungen.map(ori => {
                        if (ori === 'pansexuell_queer') return 'pansexuell';
                        if (ori === 'gay_lesbisch') return 'homosexuell';
                        if (ori === 'bihomo') return 'bisexuell';
                        return ori;
                    });

                    // Remove duplicates and invalid values
                    orientierungen = [...new Set(orientierungen)].filter(o =>
                        o && typeof o === 'string' && o.trim() !== ''
                    );

                    // Store as Array (v4.1 format)
                    personDimensions[person].orientierung = orientierungen;

                    console.log(`[loadDimensionsFromState] ${person} orientierung migriert:`, orientierungen);
                }

                // Sync GFK if present
                if (savedDims.gfk) {
                    personDimensions[person].gfk = savedDims.gfk;
                }

                // Sync Geschlecht Extras if present (Fit/Fucked up/Horny)
                if (savedDims.geschlecht_extras) {
                    personDimensions[person].geschlecht_extras = savedDims.geschlecht_extras;
                    // FIX: geschlechtExtrasCache synchronisieren — syncGeschlechtExtrasUI liest aus Cache, nicht personDimensions
                    geschlechtExtrasCache[person] = {
                        fit: !!savedDims.geschlecht_extras.fit,
                        fuckedup: !!savedDims.geschlecht_extras.fuckedup,
                        horny: !!savedDims.geschlecht_extras.horny
                    };
                }

                // Sync mobilePersonDimensions if it exists
                if (typeof mobilePersonDimensions !== 'undefined') {
                    mobilePersonDimensions[person].geschlecht = personDimensions[person].geschlecht;
                    mobilePersonDimensions[person].dominanz = personDimensions[person].dominanz;
                    mobilePersonDimensions[person].orientierung = personDimensions[person].orientierung;
                    mobilePersonDimensions[person].gfk = personDimensions[person].gfk;
                    mobilePersonDimensions[person].geschlecht_extras = personDimensions[person].geschlecht_extras;
                }

                // Sync UI elements after loading (Desktop + Mobile einheitlich)
                if (typeof syncGeschlechtUI === 'function') {
                    syncGeschlechtUI(person);
                }
                if (typeof syncGeschlechtExtrasUI === 'function') {
                    syncGeschlechtExtrasUI(person);
                }
                if (typeof syncDominanzUI === 'function') {
                    syncDominanzUI(person);  // Enthält jetzt auch syncMobileStatusButtons
                }
                if (typeof syncOrientierungUI === 'function') {
                    syncOrientierungUI(person);  // Enthält jetzt auch syncMobileStatusButtons
                }
            });

            // Update entire UI after loading all dimensions and archetypes
            // This ensures all UI elements reflect the loaded state
            if (typeof updateAll === 'function') {
                updateAll();
            }

            // Load Gewichtungen into UI after TiageState is loaded
            // Only if GewichtungCard DOM elements exist (card is visible)
            if (typeof GewichtungCard !== 'undefined' && GewichtungCard.loadIntoUI) {
                const gewichtungCardVisible = document.getElementById('gewicht-orientierung');
                if (gewichtungCardVisible) {
                    GewichtungCard.loadIntoUI();
                    console.log('[loadDimensionsFromState] GewichtungCard UI aktualisiert');
                } else {
                    console.log('[loadDimensionsFromState] GewichtungCard skipped - DOM not present');
                }
            }

            // Load ResonanzCard into UI after TiageState is loaded
            if (typeof ResonanzCard !== 'undefined' && ResonanzCard.initializeUI) {
                ResonanzCard.initializeUI('ich');
                console.log('[loadDimensionsFromState] ResonanzCard UI aktualisiert');
            }

            console.log('[loadDimensionsFromState] Abgeschlossen - personDimensions:', JSON.stringify(personDimensions));
            console.log('[loadDimensionsFromState] Abgeschlossen - currentArchetype:', currentArchetype, 'selectedPartner:', selectedPartner);
        }

        // Initialize when DOM is ready
        document.addEventListener('DOMContentLoaded', async function() {
            // console.log('[TIAGE DEBUG] DOMContentLoaded fired');
            try {
                // Load archetype data first - this is critical for all other functions
                // console.log('[TIAGE DEBUG] Before loadData');
                await loadData();
                // console.log('[TIAGE DEBUG] After loadData, data loaded:', data !== null);

                checkAgeVerification();
                initAgeVerification();
                initFeedbackSystem();
                initVisitorId();
                // console.log('[TIAGE DEBUG] Before initDimensionListeners');
                initDimensionListeners();
                // console.log('[TIAGE DEBUG] Before initComparisonLayout');
                initComparisonLayout();
                // console.log('[TIAGE DEBUG] Before initMobileLayout');
                initMobileLayout();
                // console.log('[TIAGE DEBUG] Before initDimensionButtons');
                initDimensionButtons();
                // console.log('[TIAGE DEBUG] After initDimensionButtons');
                initGeschlechtHoverEvents();

                // FIX: Stelle sicher, dass Subscriber registriert sind BEVOR loadFromStorage()
                // aufgerufen wird, damit flatNeeds reaktiv berechnet werden
                if (typeof ProfileCalculator !== 'undefined' && ProfileCalculator.registerSubscribers) {
                    ProfileCalculator.registerSubscribers();
                }

                // console.log('[TIAGE DEBUG] Before loadDimensionsFromState');
                // Load saved dimensions from TiageState AFTER initializing buttons
                // so that UI sync functions can update the buttons
                loadDimensionsFromState();

                // ═══════════════════════════════════════════════════════════════════════════
                // SSOT: Stelle sicher, dass flatNeeds + Resonanzfaktoren für beide Personen
                // berechnet und in TiageState gespeichert sind (bei App-Start)
                // ═══════════════════════════════════════════════════════════════════════════
                if (typeof ProfileCalculator !== 'undefined' && typeof TiageState !== 'undefined') {
                    ['ich', 'partner'].forEach(person => {
                        const archetyp = person === 'ich' ? currentArchetype : selectedPartner;
                        const flatNeeds = TiageState.get(`flatNeeds.${person}`);

                        // Nur berechnen wenn flatNeeds leer oder nicht vorhanden
                        if (!flatNeeds || Object.keys(flatNeeds).length === 0) {
                            const profileData = {
                                archetyp: archetyp,
                                geschlecht: TiageState.get(`personDimensions.${person}.geschlecht`),
                                dominanz: TiageState.get(`personDimensions.${person}.dominanz`),
                                orientierung: TiageState.get(`personDimensions.${person}.orientierung`),
                                geschlecht_extras: TiageState.get(`personDimensions.${person}.geschlecht_extras`) || {}
                            };
                            if (profileData.archetyp) {
                                ProfileCalculator.loadProfile(person, profileData);
                                console.log('[SSOT] Initial-Profil berechnet für', person, ':', archetyp);
                            }
                        } else {
                            console.log('[SSOT] flatNeeds bereits vorhanden für', person, ':', Object.keys(flatNeeds).length, 'Einträge');
                        }
                    });
                }

                // Initialize all summary displays in header
                updateGeschlechtSummary('ich');
                updateGeschlechtSummary('partner');
                updateDominanzSummary('ich');
                updateDominanzSummary('partner');
                updateOrientierungSummary('ich');
                updateOrientierungSummary('partner');
                // GFK automatisch aus Archetypen-Matching setzen
                updateGfkFromArchetypes();

                // IMPORTANT: Update comparison view AFTER loading dimensions
                // This ensures the score is calculated with the correct data
                // // console.log('[TIAGE DEBUG] Before updateComparisonView'); // DISABLED: verursacht Message-Overflow
                updateComparisonView();
                updateSyntheseScoreCycle();
                // // console.log('[TIAGE DEBUG] After updateComparisonView'); // DISABLED: verursacht Message-Overflow

                // Note: openComments=1 parameter is now handled in handleAgeConfirm()
                // to ensure age verification is completed before opening comments modal

                // ═══════════════════════════════════════════════════════════════════════════
                // Event-Listener für Resonanzfaktoren-Änderungen
                // Aktualisiert LoadedArchetypProfile wenn sich Resonanzfaktoren ändern
                // ═══════════════════════════════════════════════════════════════════════════
                // Debounce für Slider-Änderungen (verhindert zu häufige Score-Updates)
                let resonanzUpdateDebounce = null;
                const RESONANZ_DEBOUNCE_DELAY = 100; // ms

                window.addEventListener('resonanzfaktoren-changed', function(e) {
                    const { person, values, source } = e.detail;

                    // NOTE: LoadedArchetypProfile ist ein View auf TiageState (SSOT).
                    // save() in ResonanzCard hat TiageState bereits aktualisiert.
                    // Hier NICHT separat schreiben, da 'values' nur Werte ohne Lock-Status enthält.
                    // Das würde die Lock-Struktur {value, locked} mit nur Werten überschreiben.
                    // console.log('[TIAGE] resonanzfaktoren-changed Event für', person, '- Quelle:', source); // DISABLED: verursacht Message-Overflow

                    // FIX: Aktualisiere Comparison View für ALLE Quellen (inkl. Slider)
                    // Debounce bei Slider-Änderungen um Performance zu optimieren
                    if (source === 'slider') {
                        if (resonanzUpdateDebounce) {
                            clearTimeout(resonanzUpdateDebounce);
                        }
                        resonanzUpdateDebounce = setTimeout(function() {
                            updateComparisonView();
                        }, RESONANZ_DEBOUNCE_DELAY);
                    } else {
                        // Sofortiges Update für andere Quellen (reset, calculated, etc.)
                        updateComparisonView();
                    }
                });

                // ═══════════════════════════════════════════════════════════════════════════
                // Hilfsfunktion: Kurze Toast-Meldung für Lock-Speicherung
                // ═══════════════════════════════════════════════════════════════════════════
                function showLockSavedToast(message) {
                    TiageToast.success(message);
                }

                // ═══════════════════════════════════════════════════════════════════════════
                // Event-Listener für Bedürfnis-Lock-Änderungen
                // Synchronisiert Lock-Status mit TiageState.profileReview.{person}.lockedNeeds
                // ═══════════════════════════════════════════════════════════════════════════
                console.log('[DEBUG] Registering flatNeedLockChange listener');
                document.addEventListener('flatNeedLockChange', function(e) {
                    console.log('[DEBUG] flatNeedLockChange listener CALLED', e.detail);
                    var needId = e.detail && e.detail.needId;
                    var locked = e.detail && e.detail.locked;

                    if (!needId || typeof TiageState === 'undefined') return;

                    // Ermittle aktuelle Person aus Kontext
                    var currentPerson = 'ich';
                    if (window.currentProfileReviewContext && window.currentProfileReviewContext.person) {
                        currentPerson = window.currentProfileReviewContext.person;
                    }

                    if (locked) {
                        // Beim Sperren: Hole aktuellen Wert aus AttributeSummaryCard
                        var currentValue = 50; // Fallback
                        if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.getFlatNeeds) {
                            var flatNeeds = AttributeSummaryCard.getFlatNeeds();
                            var needObj = flatNeeds.find(function(n) { return n.id === needId; });
                            if (needObj) {
                                currentValue = needObj.value;
                            }
                        }
                        TiageState.lockNeed(currentPerson, needId, currentValue);
                        console.log('[flatNeedLockChange] Bedürfnis gesperrt:', needId, '=', currentValue, 'für', currentPerson);
                    } else {
                        // Beim Entsperren: Entferne aus lockedNeeds
                        TiageState.unlockNeed(currentPerson, needId);
                        console.log('[flatNeedLockChange] Bedürfnis entsperrt:', needId, 'für', currentPerson);
                    }
                    // Sofort in localStorage speichern
                    TiageState.saveToStorage();

                    // Kurze Info einblenden
                    showLockSavedToast(locked ? TiageI18n.t('toast.locked', 'Wert gesperrt & gespeichert') : TiageI18n.t('toast.unlocked', 'Wert entsperrt'));
                });

var flatNeedSaveDebounceTimer = null;
var FLAT_NEED_SAVE_DEBOUNCE_MS = 500;



                // ═══════════════════════════════════════════════════════════════════════════
                // Event-Listener für Bedürfnis-Wert-Änderungen
                // FIX v1.8.837: AUTO-LOCK bei manueller Änderung
                // Manuelle Änderung = User will abweichen → automatisch locken
                // Bei Archetyp-Wechsel bleiben nur gelockte Werte erhalten
                // ═══════════════════════════════════════════════════════════════════════════
                document.addEventListener('flatNeedChange', function(e) {
                    var needId = e.detail && e.detail.needId;
                    var value = e.detail && e.detail.value;

                    if (!needId || value === undefined || typeof TiageState === 'undefined') return;

                    // Ermittle aktuelle Person aus Kontext
                    var currentPerson = 'ich';
                    if (window.currentProfileReviewContext && window.currentProfileReviewContext.person) {
                        currentPerson = window.currentProfileReviewContext.person;
                    }

                    // Wert in flatNeeds speichern
                    TiageState.setNeed(currentPerson, needId, value);

                    // FIX v1.8.837: AUTO-LOCK - Jede manuelle Änderung wird automatisch gelockt
                    // Damit bleibt der Wert bei Archetyp-Wechsel erhalten
                    if (currentPerson === 'ich' && TiageState.lockNeed) {
                        TiageState.lockNeed(currentPerson, needId, value);
                        console.log('[flatNeedChange] AUTO-LOCK:', needId, '=', value, 'für Archetyp', TiageState.get('archetypes.ich.primary'));
                    }

                    // Debounced Save
                    if (flatNeedSaveDebounceTimer) {
                        clearTimeout(flatNeedSaveDebounceTimer);
                    }
                    flatNeedSaveDebounceTimer = setTimeout(function() {
                        TiageState.saveToStorage();
                        console.log('[flatNeedChange] Auto-Save ausgeführt');
                    }, FLAT_NEED_SAVE_DEBOUNCE_MS);

                });

                // Initialize MomentsToggle in header
                if (typeof MomentsToggle !== 'undefined' && typeof MomentsToggle.init === 'function') {
                    MomentsToggle.init();
                }

                // Initialize Workflow Guide (floating panel)
                if (typeof WorkflowGuide !== 'undefined' && typeof WorkflowGuide.init === 'function') {
                    WorkflowGuide.init();
                }

                // Initialize AGOD weight inputs (loads from TiageState, defaults to all=1 if no data)
                if (typeof initAgodWeightInputs === 'function') {
                    initAgodWeightInputs();
                    // console.log('[TIAGE DEBUG] AGOD weight inputs initialized');
                }

                // console.log('[TIAGE DEBUG] DOMContentLoaded completed successfully');
            } catch (e) {
                console.error('[TIAGE ERROR] DOMContentLoaded failed:', e);
            }
        });

        // ========================================
        // FEATURE 1: Factor Detail Modal
        // ========================================
        // NOTE: factorExplanations moved to js/modals/factorExplanations.js
        // Uses window.factorExplanations for backwards compatibility

        /* factorExplanations data moved to js/modals/factorExplanations.js */

        function openFactorModal(factorType, source = 'mobile') {
            const factor = factorExplanations[factorType];
            if (!factor) return;

            // Store current factor type and source for navigation
            currentFactorType = factorType;
            currentFactorSource = source;

            const ich = mobileIchArchetype;
            const partner = mobilePartnerArchetype;

            // Use correct dimensions based on source
            const dimensions = source === 'desktop' ? personDimensions : mobilePersonDimensions;

            // Get score from display - support both mobile and desktop
            const prefix = source === 'desktop' ? 'desktopFactor' : 'mobileFactor';
            let score = 0;
            if (factorType === 'archetyp') {
                score = parseInt(document.getElementById(prefix + 'Archetyp').textContent) || 0;
            } else if (factorType === 'dominanz') {
                score = parseInt(document.getElementById(prefix + 'Dominanz').textContent) || 0;
            } else if (factorType === 'orientierung') {
                score = parseInt(document.getElementById(prefix + 'Orientierung').textContent) || 0;
            } else if (factorType === 'geschlecht') {
                score = parseInt(document.getElementById(prefix + 'Geschlecht').textContent) || 0;
            }

            // Update modal content
            document.getElementById('factorModalTitle').textContent = factor.title;
            document.getElementById('factorModalSubtitle').textContent = factor.subtitle;

            // Update archetype navigation display
            updateFactorModalArchetypeDisplay();

            // Show combination code for archetyp and dominanz factors
            const comboCodeEl = document.getElementById('factorModalComboCode');
            if (factorType === 'archetyp' && ich && partner) {
                const comboCode = `${ich}_${partner}`;
                comboCodeEl.textContent = `Code: ${comboCode}`;
                comboCodeEl.style.display = 'inline-block';
            } else if (factorType === 'dominanz') {
                // Get dominanz and orientierung selections for combo code
                const ichDom = dimensions.ich.dominanz;
                const partnerDom = dimensions.partner.dominanz;
                const ichOri = dimensions.ich.orientierung;
                const partnerOri = dimensions.partner.orientierung;
                const domAbbrev = { 'dominant': 'Dom', 'submissiv': 'Sub', 'switch': 'Swi', 'ausgeglichen': 'Aus' };
                const oriAbbrev = { 'heterosexuell': 'Het', 'homosexuell': 'Hom', 'bisexuell': 'Bi' };

                const getSelectedDom = (domObj) => {
                    if (!domObj) return null;
                    for (const [type, status] of Object.entries(domObj)) {
                        if (status) return domAbbrev[type] || type;
                    }
                    return null;
                };

                const getSelectedOri = (oriObj) => {
                    if (!oriObj) return null;
                    for (const [type, status] of Object.entries(oriObj)) {
                        if (status) return oriAbbrev[type] || type;
                    }
                    return null;
                };

                const ichDomCode = getSelectedDom(ichDom);
                const partnerDomCode = getSelectedDom(partnerDom);
                const ichOriCode = getSelectedOri(ichOri);
                const partnerOriCode = getSelectedOri(partnerOri);

                // Build code: Orientierung-Dominanz for each person
                const ichCode = [ichOriCode, ichDomCode].filter(Boolean).join('-');
                const partnerCode = [partnerOriCode, partnerDomCode].filter(Boolean).join('-');

                if (ichCode && partnerCode) {
                    comboCodeEl.textContent = `Code: ${ichCode}_${partnerCode}`;
                    comboCodeEl.style.display = 'inline-block';
                } else if (ichDomCode && partnerDomCode) {
                    // Fallback to just dominanz if orientierung not selected
                    comboCodeEl.textContent = `Code: ${ichDomCode}_${partnerDomCode}`;
                    comboCodeEl.style.display = 'inline-block';
                } else {
                    comboCodeEl.style.display = 'none';
                }
            } else {
                comboCodeEl.style.display = 'none';
            }

            document.getElementById('factorModalScore').textContent = score;
            document.getElementById('factorModalExplanation').textContent = factor.getExplanation(ich, partner, score, dimensions);

            const meaningList = document.getElementById('factorModalMeaning');
            meaningList.innerHTML = '';
            factor.getMeaning(score, ich, partner).forEach(item => {
                const li = document.createElement('li');
                // Support both old (string) and new (object with title+desc) formats
                if (typeof item === 'object' && item.title) {
                    li.innerHTML = `<strong>${item.title}</strong>${item.desc ? ` – ${item.desc}` : ''}`;
                } else {
                    li.textContent = item;
                }
                meaningList.appendChild(li);
            });

            // Show modal
            document.getElementById('factorModal').classList.add('active');
            // Push state for back button to close modal
            history.pushState({ mobilePage: currentMobilePage, modal: 'factor' }, '', `#seite${currentMobilePage}-factor`);
        }

        function closeFactorModal(event, skipHistoryBack = false) {
            if (event && event.target !== event.currentTarget) return;
            document.getElementById('factorModal').classList.remove('active');
            // Go back in history if not triggered by back button
            if (!skipHistoryBack && history.state && history.state.modal === 'factor') {
                history.back();
            }
        }


        // ═══════════════════════════════════════════════════════════════════════════
        // TI-AGE SYNTHESE MODAL
        // NOTE: Moved to js/modals/syntheseModal.js
        // Functions available via window.*:
        // - openTiageSyntheseModal, closeTiageSyntheseModal, showTiageSyntheseContent
        // - openPathosLogosModal, closePathosLogosModal (legacy aliases)
        // - openProContraModal, closeProContraModal, navigateProContraArchetype (legacy)
        // - getScoreContent, getScoreNeedsContent, getGfkBeduerfnisAnalyse
        // - getNeedsContent, getRTIContent, getTiageTheoryContent
        // - getPathosContent, getLogosContent, getOshoZenContent
        // - openResonanzfaktorenModal, closeResonanzfaktorenModal, updateResonanzfaktorenModalContent
        // - navigateTiageSyntheseArchetype, navigatePathosLogosArchetype
        // - sortNeedsSyntheseContent, getSyntheseQuoteText, toggleCreativityTTS
        // ═══════════════════════════════════════════════════════════════════════════

        // Factor Modal Archetype Navigation
        let currentFactorType = null;
        let currentFactorSource = 'mobile';

        function navigateFactorArchetype(person, direction) {
            // Get current archetype for the person
            let currentArch;
            if (person === 'ich') {
                currentArch = mobileIchArchetype;
            } else {
                currentArch = mobilePartnerArchetype;
            }

            // Find current index and calculate new index
            let currentIdx = archetypeOrder.indexOf(currentArch);
            if (currentIdx === -1) currentIdx = 0;

            let newIndex = currentIdx + direction;
            if (newIndex < 0) newIndex = archetypeOrder.length - 1;
            if (newIndex >= archetypeOrder.length) newIndex = 0;

            const newArchetype = archetypeOrder[newIndex];

            // Update the actual selections and sync both mobile and desktop
            if (person === 'ich') {
                mobileIchArchetype = newArchetype;
                currentArchetype = newArchetype; // Sync desktop variable
                // Sync with TiageState for persistence
                if (typeof TiageState !== 'undefined') {
                    TiageState.setArchetype('ich', newArchetype);
                    TiageState.saveToStorage(); // Sofort speichern
                }
                // Update mobile and desktop select elements
                const mobileSelect = document.getElementById('mobileIchSelect');
                const desktopSelect = document.getElementById('ichSelect');
                if (mobileSelect) mobileSelect.value = newArchetype;
                if (desktopSelect) desktopSelect.value = newArchetype;
            } else {
                mobilePartnerArchetype = newArchetype;
                selectedPartner = newArchetype; // Sync desktop variable
                // Sync with TiageState for persistence
                if (typeof TiageState !== 'undefined') {
                    TiageState.setArchetype('partner', newArchetype);
                    TiageState.saveToStorage(); // Sofort speichern
                }
                // Update mobile and desktop select elements
                const mobileSelect = document.getElementById('mobilePartnerSelect');
                const desktopSelect = document.getElementById('partnerSelect');
                if (mobileSelect) mobileSelect.value = newArchetype;
                if (desktopSelect) desktopSelect.value = newArchetype;
            }

            // Update the display in the modal
            updateFactorModalArchetypeDisplay();

            // Preserve selection state: sync Dominanz and Orientierung UI with stored state
            syncDominanzUI('ich');
            syncDominanzUI('partner');
            syncOrientierungUI('ich');
            syncOrientierungUI('partner');

            // Trigger full recalculation for both mobile and desktop views
            if (typeof updateComparisonView === 'function') {
                updateComparisonView();
            }
            if (typeof updateMobileResultPage === 'function') {
                updateMobileResultPage();
            }
            if (typeof updateMobileProContraPage === 'function') {
                updateMobileProContraPage();
            }

            // Recalculate and update the modal content after views are updated
            if (currentFactorType) {
                // Get updated score from display elements
                const prefix = currentFactorSource === 'desktop' ? 'desktopFactor' : 'mobileFactor';
                let score = 0;
                if (currentFactorType === 'archetyp') {
                    score = parseInt(document.getElementById(prefix + 'Archetyp')?.textContent) || 0;
                } else if (currentFactorType === 'dominanz') {
                    score = parseInt(document.getElementById(prefix + 'Dominanz')?.textContent) || 0;
                } else if (currentFactorType === 'orientierung') {
                    score = parseInt(document.getElementById(prefix + 'Orientierung')?.textContent) || 0;
                } else if (currentFactorType === 'geschlecht') {
                    score = parseInt(document.getElementById(prefix + 'Geschlecht')?.textContent) || 0;
                }

                const factor = factorExplanations[currentFactorType];
                if (factor) {
                    const ich = mobileIchArchetype;
                    const partner = mobilePartnerArchetype;
                    const dimensions = currentFactorSource === 'desktop' ? personDimensions : mobilePersonDimensions;

                    document.getElementById('factorModalScore').textContent = score;
                    document.getElementById('factorModalExplanation').textContent = factor.getExplanation(ich, partner, score, dimensions);

                    const meaningList = document.getElementById('factorModalMeaning');
                    meaningList.innerHTML = '';
                    factor.getMeaning(score, ich, partner).forEach(item => {
                        const li = document.createElement('li');
                        // Support both old (string) and new (object with title+desc) formats
                        if (typeof item === 'object' && item.title) {
                            li.innerHTML = `<strong>${item.title}</strong>${item.desc ? ` – ${item.desc}` : ''}`;
                        } else {
                            li.textContent = item;
                        }
                        meaningList.appendChild(li);
                    });
                }
            }
        }

        function updateFactorModalArchetypeDisplay() {
            const ichCodeEl = document.getElementById('factorModalIchCode');
            const partnerCodeEl = document.getElementById('factorModalPartnerCode');

            if (ichCodeEl) {
                const ichDef = archetypeDescriptions[mobileIchArchetype];
                ichCodeEl.textContent = ichDef ? ichDef.name : mobileIchArchetype;
            }
            if (partnerCodeEl) {
                const partnerDef = archetypeDescriptions[mobilePartnerArchetype];
                partnerCodeEl.textContent = partnerDef ? partnerDef.name : mobilePartnerArchetype;
            }

            // Update combo code if visible
            const comboCodeEl = document.getElementById('factorModalComboCode');
            if (comboCodeEl && comboCodeEl.style.display !== 'none') {
                comboCodeEl.textContent = `Code: ${mobileIchArchetype}_${mobilePartnerArchetype}`;
            }
        }

        // Close modals with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const factorModal = document.getElementById('factorModal');
                if (factorModal && factorModal.classList.contains('active')) {
                    closeFactorModal();
                    return;
                }
                const helpModal = document.getElementById('helpModal');
                if (helpModal && helpModal.classList.contains('active')) {
                    closeHelpModal();
                    return;
                }
                const commentModal = document.getElementById('commentModal');
                if (commentModal && commentModal.classList.contains('active')) {
                    closeCommentModal();
                    return;
                }
            }
        });

        // ========================================
        // VISITOR ID & RATE LIMITING
        // ========================================
        // NOTE: Moved to js/persistence/visitorTracking.js
        // Functions available via TiageVisitorTracking.* and window.* exports:
        // - generateBrowserFingerprint, getBrowserFingerprint
        // - getOrCreateVisitorId, fetchOrCreateVisitorId, fetchTotalVisitors
        // - getCachedTotalVisitors, setCachedTotalVisitors
        // - fetchWithRetry, formatVisitorDisplay
        // - trackPageView, initVisitorId
        // - canSubmitComment, recordCommentSubmission

        // ========================================
        // FEATURE 4: Archetype Info Modal (merged with definitionModal)
        // ========================================

        function openArchetypeInfo(archetypeId, person = null) {
            // Redirect to definitionModal (zusammengeführt)
            console.log('openArchetypeInfo called with:', archetypeId, 'person:', person);

            // Track which person this modal is for
            currentDefinitionPerson = person;

            // Update current index
            currentDefinitionIndex = archetypeOrder.indexOf(archetypeId);
            if (currentDefinitionIndex === -1) currentDefinitionIndex = 0;

            // Use the detailed definition modal
            window.showArchetypeInfoByType(archetypeId);

            document.getElementById('definitionModal').classList.add('active');
            document.body.style.overflow = 'hidden';

            // Add touch swipe support
            const modal = document.querySelector('#definitionModal .modal');
            modal.ontouchstart = handleDefinitionTouchStart;
            modal.ontouchend = handleDefinitionTouchEnd;
        }

        // ========================================
        // FEATURE 5: LocalStorage Persistence
        // ========================================

        function saveSelectionToStorage() {
            const selection = {
                ich: {
                    archetyp: mobileIchArchetype,
                    geschlecht: personDimensions.ich.geschlecht,
                    dominanz: personDimensions.ich.dominanz, // Multi-select object
                    orientierung: personDimensions.ich.orientierung, // Multi-select object
                    geschlecht_extras: geschlechtExtrasCache.ich // From local cache (SSOT-sync)
                },
                partner: {
                    archetyp: mobilePartnerArchetype,
                    geschlecht: personDimensions.partner.geschlecht,
                    dominanz: personDimensions.partner.dominanz, // Multi-select object
                    orientierung: personDimensions.partner.orientierung, // Multi-select object
                    geschlecht_extras: geschlechtExtrasCache.partner // From local cache (SSOT-sync)
                }
            };

            try {
                // TiageState als SSOT - selection und personDimensions speichern
                if (typeof TiageState !== 'undefined') {
                    TiageState.set('ui.selection', selection);
                    TiageState.set('personDimensions.ich', personDimensions.ich);
                    TiageState.set('personDimensions.partner', personDimensions.partner);
                    TiageState.saveToStorage();
                }
            } catch (e) {
                console.warn('TiageState not available:', e);
            }
        }

        function loadSelectionFromStorage() {
            try {
                // Lade von TiageState (SSOT) mit localStorage Fallback
                let selection = null;
                if (typeof TiageState !== 'undefined') {
                    selection = TiageState.get('ui.selection');
                }
                // Fallback: alte localStorage-Daten (werden bei loadFromStorage migriert)
                if (!selection) {
                    const saved = localStorage.getItem('tiage-selection');
                    if (!saved) return false;
                    selection = JSON.parse(saved);
                }
                if (!selection) return false;

                // Mapping von alten #A1-#A8 Keys zu neuen String-Keys
                const archetypeIdToKey = {
                    '#A1': 'single',
                    '#A2': 'duo',
                    '#A3': 'duo_flex',
                    '#A4': 'solopoly',
                    '#A5': 'polyamor',
                    '#A6': 'ra',
                    '#A7': 'lat',
                    '#A8': 'aromantisch'
                };
                const convertArchetypeId = (id) => {
                    if (!id) return id;
                    return archetypeIdToKey[id] || id;
                };

                // Restore ICH
                if (selection.ich) {
                    const ichArchetyp = convertArchetypeId(selection.ich.archetyp);
                    mobileIchArchetype = ichArchetyp;
                    currentArchetype = ichArchetyp;
                    document.getElementById('mobileIchSelect').value = ichArchetyp;
                    const ichSelect = document.getElementById('ichSelect');
                    if (ichSelect) ichSelect.value = ichArchetyp;

                    if (selection.ich.geschlecht) {
                        // Handle new primary/secondary format
                        if (typeof selection.ich.geschlecht === 'object' && 'primary' in selection.ich.geschlecht) {
                            // New format: { primary: 'cis-mann', secondary: null }
                            personDimensions.ich.geschlecht = selection.ich.geschlecht;
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.ich.geschlecht = selection.ich.geschlecht;
                            }
                        } else {
                            // Old format: string like "cis-mann" - convert to new format
                            personDimensions.ich.geschlecht = { primary: selection.ich.geschlecht, secondary: null };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.ich.geschlecht = { primary: selection.ich.geschlecht, secondary: null };
                            }
                        }
                        // Sync UI
                        if (typeof syncGeschlechtUI === 'function') {
                            syncGeschlechtUI('ich');
                        }
                        if (personDimensions.ich.geschlecht.primary) {
                            const dimension = document.querySelector('[data-dimension="ich-geschlecht-new"]');
                            if (dimension) dimension.classList.remove('needs-selection');
                        }
                    }

                    if (selection.ich.dominanz) {
                        // Handle new primary/secondary format
                        if (typeof selection.ich.dominanz === 'object' && 'primary' in selection.ich.dominanz) {
                            // New format: { primary: 'dominant', secondary: null }
                            personDimensions.ich.dominanz = selection.ich.dominanz;
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.ich.dominanz = selection.ich.dominanz;
                            }
                            // Sync UI
                            if (typeof syncDominanzUI === 'function') {
                                syncDominanzUI('ich');
                            }
                            if (selection.ich.dominanz.primary) {
                                const dimension = document.querySelector('[data-dimension="ich-dominanz-multi"]');
                                if (dimension) dimension.classList.remove('needs-selection');
                            }
                        } else if (typeof selection.ich.dominanz === 'object') {
                            // Old format: { dominant: 'gelebt', submissiv: null, ... }
                            // Convert to new format
                            let primary = null;
                            let secondary = null;
                            for (const [type, status] of Object.entries(selection.ich.dominanz)) {
                                if (status === 'gelebt' && !primary) {
                                    primary = type;
                                } else if (status === 'interessiert' && !secondary) {
                                    secondary = type;
                                }
                            }
                            personDimensions.ich.dominanz = { primary, secondary };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.ich.dominanz = { primary, secondary };
                            }
                            // Sync UI
                            if (typeof syncDominanzUI === 'function') {
                                syncDominanzUI('ich');
                            }
                            if (primary) {
                                const dimension = document.querySelector('[data-dimension="ich-dominanz-multi"]');
                                if (dimension) dimension.classList.remove('needs-selection');
                            }
                        } else {
                            // Legacy: string format - convert to new primary/secondary format
                            personDimensions.ich.dominanz = { primary: selection.ich.dominanz, secondary: null };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.ich.dominanz = { primary: selection.ich.dominanz, secondary: null };
                            }
                            // Sync UI
                            if (typeof syncDominanzUI === 'function') {
                                syncDominanzUI('ich');
                            }
                            const dimension = document.querySelector('[data-dimension="ich-dominanz-multi"]');
                            if (dimension) dimension.classList.remove('needs-selection');
                        }
                    }

                    if (selection.ich.orientierung) {
                        // Handle new primary/secondary format
                        if (typeof selection.ich.orientierung === 'object' && 'primary' in selection.ich.orientierung) {
                            // New format: { primary: 'heterosexuell', secondary: null }
                            personDimensions.ich.orientierung = selection.ich.orientierung;
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.ich.orientierung = selection.ich.orientierung;
                            }
                            // Sync UI
                            if (typeof syncOrientierungUI === 'function') {
                                syncOrientierungUI('ich');
                            }
                            if (selection.ich.orientierung.primary) {
                                const dimension = document.querySelector('[data-dimension="ich-orientierung-multi"]');
                                if (dimension) dimension.classList.remove('needs-selection');
                            }
                        } else if (typeof selection.ich.orientierung === 'object') {
                            // Old format: { heterosexuell: 'gelebt', homosexuell: null, ... }
                            // Convert to new format
                            let primary = null;
                            let secondary = null;
                            for (const [type, status] of Object.entries(selection.ich.orientierung)) {
                                if (status === 'gelebt' && !primary) {
                                    primary = type;
                                } else if (status === 'interessiert' && !secondary) {
                                    secondary = type;
                                }
                            }
                            personDimensions.ich.orientierung = { primary, secondary };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.ich.orientierung = { primary, secondary };
                            }
                            // Sync UI
                            if (typeof syncOrientierungUI === 'function') {
                                syncOrientierungUI('ich');
                            }
                            if (primary) {
                                const dimension = document.querySelector('[data-dimension="ich-orientierung-multi"]');
                                if (dimension) dimension.classList.remove('needs-selection');
                            }
                        } else {
                            // Legacy: string format - convert to new primary/secondary format
                            personDimensions.ich.orientierung = { primary: selection.ich.orientierung, secondary: null };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.ich.orientierung = { primary: selection.ich.orientierung, secondary: null };
                            }
                            // Sync UI
                            if (typeof syncOrientierungUI === 'function') {
                                syncOrientierungUI('ich');
                            }
                            const dimension = document.querySelector('[data-dimension="ich-orientierung-multi"]');
                            if (dimension) dimension.classList.remove('needs-selection');
                        }
                    }

                    // Restore geschlecht_extras (Fit/Fucked up/Horny)
                    if (selection.ich.geschlecht_extras) {
                        const extras = selection.ich.geschlecht_extras;
                        // Sync to local cache (SSOT → Cache)
                        geschlechtExtrasCache.ich = {
                            fit: !!extras.fit,
                            fuckedup: !!extras.fuckedup,
                            horny: !!extras.horny
                        };
                        // Sync to TiageState
                        if (typeof TiageState !== 'undefined') {
                            TiageState.set('personDimensions.ich.geschlecht_extras', geschlechtExtrasCache.ich);
                        }
                        // Sync UI
                        if (typeof syncGeschlechtExtrasUI === 'function') {
                            syncGeschlechtExtrasUI('ich');
                        }
                    }
                }

                // Restore PARTNER
                if (selection.partner) {
                    const partnerArchetyp = convertArchetypeId(selection.partner.archetyp);
                    mobilePartnerArchetype = partnerArchetyp;
                    selectedPartner = partnerArchetyp;
                    document.getElementById('mobilePartnerSelect').value = partnerArchetyp;
                    const partnerSelect = document.getElementById('partnerSelect');
                    if (partnerSelect) partnerSelect.value = partnerArchetyp;

                    if (selection.partner.geschlecht) {
                        // Handle new primary/secondary format
                        if (typeof selection.partner.geschlecht === 'object' && 'primary' in selection.partner.geschlecht) {
                            // New format: { primary: 'cis-mann', secondary: null }
                            personDimensions.partner.geschlecht = selection.partner.geschlecht;
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.partner.geschlecht = selection.partner.geschlecht;
                            }
                        } else {
                            // Old format: string like "cis-mann" - convert to new format
                            personDimensions.partner.geschlecht = { primary: selection.partner.geschlecht, secondary: null };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.partner.geschlecht = { primary: selection.partner.geschlecht, secondary: null };
                            }
                        }
                        // Sync UI
                        if (typeof syncGeschlechtUI === 'function') {
                            syncGeschlechtUI('partner');
                        }
                        if (personDimensions.partner.geschlecht.primary) {
                            const dimension = document.querySelector('[data-dimension="partner-geschlecht-new"]');
                            if (dimension) dimension.classList.remove('needs-selection');
                        }
                    }

                    if (selection.partner.dominanz) {
                        // Handle new primary/secondary format
                        if (typeof selection.partner.dominanz === 'object' && 'primary' in selection.partner.dominanz) {
                            // New format: { primary: 'dominant', secondary: null }
                            personDimensions.partner.dominanz = selection.partner.dominanz;
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.partner.dominanz = selection.partner.dominanz;
                            }
                            // Sync UI
                            if (typeof syncDominanzUI === 'function') {
                                syncDominanzUI('partner');
                            }
                            if (selection.partner.dominanz.primary) {
                                const dimension = document.querySelector('[data-dimension="partner-dominanz-multi"]');
                                if (dimension) dimension.classList.remove('needs-selection');
                            }
                        } else if (typeof selection.partner.dominanz === 'object') {
                            // Old format: { dominant: 'gelebt', submissiv: null, ... }
                            // Convert to new format
                            let primary = null;
                            let secondary = null;
                            for (const [type, status] of Object.entries(selection.partner.dominanz)) {
                                if (status === 'gelebt' && !primary) {
                                    primary = type;
                                } else if (status === 'interessiert' && !secondary) {
                                    secondary = type;
                                }
                            }
                            personDimensions.partner.dominanz = { primary, secondary };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.partner.dominanz = { primary, secondary };
                            }
                            // Sync UI
                            if (typeof syncDominanzUI === 'function') {
                                syncDominanzUI('partner');
                            }
                            if (primary) {
                                const dimension = document.querySelector('[data-dimension="partner-dominanz-multi"]');
                                if (dimension) dimension.classList.remove('needs-selection');
                            }
                        } else {
                            // Legacy: string format - convert to new primary/secondary format
                            personDimensions.partner.dominanz = { primary: selection.partner.dominanz, secondary: null };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.partner.dominanz = { primary: selection.partner.dominanz, secondary: null };
                            }
                            // Sync UI
                            if (typeof syncDominanzUI === 'function') {
                                syncDominanzUI('partner');
                            }
                            const dimension = document.querySelector('[data-dimension="partner-dominanz-multi"]');
                            if (dimension) dimension.classList.remove('needs-selection');
                        }
                    }

                    if (selection.partner.orientierung) {
                        // Handle new primary/secondary format
                        if (typeof selection.partner.orientierung === 'object' && 'primary' in selection.partner.orientierung) {
                            // New format: { primary: 'heterosexuell', secondary: null }
                            personDimensions.partner.orientierung = selection.partner.orientierung;
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.partner.orientierung = selection.partner.orientierung;
                            }
                            // Sync UI
                            if (typeof syncOrientierungUI === 'function') {
                                syncOrientierungUI('partner');
                            }
                            if (selection.partner.orientierung.primary) {
                                const dimension = document.querySelector('[data-dimension="partner-orientierung-multi"]');
                                if (dimension) dimension.classList.remove('needs-selection');
                            }
                        } else if (typeof selection.partner.orientierung === 'object') {
                            // Old format: { heterosexuell: 'gelebt', homosexuell: null, ... }
                            // Convert to new format
                            let primary = null;
                            let secondary = null;
                            for (const [type, status] of Object.entries(selection.partner.orientierung)) {
                                if (status === 'gelebt' && !primary) {
                                    primary = type;
                                } else if (status === 'interessiert' && !secondary) {
                                    secondary = type;
                                }
                            }
                            personDimensions.partner.orientierung = { primary, secondary };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.partner.orientierung = { primary, secondary };
                            }
                            // Sync UI
                            if (typeof syncOrientierungUI === 'function') {
                                syncOrientierungUI('partner');
                            }
                            if (primary) {
                                const dimension = document.querySelector('[data-dimension="partner-orientierung-multi"]');
                                if (dimension) dimension.classList.remove('needs-selection');
                            }
                        } else {
                            // Legacy: string format - convert to new primary/secondary format
                            personDimensions.partner.orientierung = { primary: selection.partner.orientierung, secondary: null };
                            if (typeof mobilePersonDimensions !== 'undefined') {
                                mobilePersonDimensions.partner.orientierung = { primary: selection.partner.orientierung, secondary: null };
                            }
                            // Sync UI
                            if (typeof syncOrientierungUI === 'function') {
                                syncOrientierungUI('partner');
                            }
                            const dimension = document.querySelector('[data-dimension="partner-orientierung-multi"]');
                            if (dimension) dimension.classList.remove('needs-selection');
                        }
                    }

                    // Restore geschlecht_extras (Fit/Fucked up/Horny)
                    if (selection.partner.geschlecht_extras) {
                        const extras = selection.partner.geschlecht_extras;
                        // Sync to local cache (SSOT → Cache)
                        geschlechtExtrasCache.partner = {
                            fit: !!extras.fit,
                            fuckedup: !!extras.fuckedup,
                            horny: !!extras.horny
                        };
                        // Sync to TiageState
                        if (typeof TiageState !== 'undefined') {
                            TiageState.set('personDimensions.partner.geschlecht_extras', geschlechtExtrasCache.partner);
                        }
                        // Sync UI
                        if (typeof syncGeschlechtExtrasUI === 'function') {
                            syncGeschlechtExtrasUI('partner');
                        }
                    }
                }

                // Sync mobilePersonDimensions to personDimensions for desktop view
                personDimensions.ich = { ...mobilePersonDimensions.ich };
                personDimensions.partner = { ...mobilePersonDimensions.partner };

                // Sync all UIs (Desktop, Mobile, Modal) for dominanz
                if (typeof syncDominanzUI === 'function') {
                    syncDominanzUI('ich');
                    syncDominanzUI('partner');
                }

                // Sync all UIs (Desktop, Mobile, Modal) for orientierung
                if (typeof syncOrientierungUI === 'function') {
                    syncOrientierungUI('ich');
                    syncOrientierungUI('partner');
                }

                // Update comparison view with loaded data
                if (typeof updateComparisonView === 'function') {
                    updateComparisonView();
                }

                // Sync archetype grid highlighting with loaded selections
                if (typeof updateArchetypeGrid === 'function') {
                    if (selection.ich && selection.ich.archetyp) {
                        updateArchetypeGrid('ich', convertArchetypeId(selection.ich.archetyp));
                    }
                    if (selection.partner && selection.partner.archetyp) {
                        updateArchetypeGrid('partner', convertArchetypeId(selection.partner.archetyp));
                    }
                }

                return true;
            } catch (e) {
                console.warn('Failed to load from LocalStorage:', e);
                return false;
            }
        }

        function resetAll() {
            if (!confirm('Möchtest du wirklich alle Eingaben zurücksetzen?')) {
                return;
            }

            // Clear TiageState selection (SSOT)
            try {
                if (typeof TiageState !== 'undefined') {
                    TiageState.set('ui.selection', null);
                }
            } catch (e) {
                console.warn('TiageState not available:', e);
            }

            // Reset mobile selections
            mobileIchArchetype = null;
            mobilePartnerArchetype = null;

            // ═══════════════════════════════════════════════════════════════════════════
            // PHASE 1: PROXY-LAYER MIGRATION
            // ═══════════════════════════════════════════════════════════════════════════
            // Verwende TiageState.reset() statt direkter Zuweisung
            // GOD-Auswahl (personDimensions) bleibt erhalten!
            // ═══════════════════════════════════════════════════════════════════════════
            if (typeof TiageState !== 'undefined' && TiageState.reset) {
                TiageState.reset();
                TiageToast.info('Alles zurückgesetzt 🔄');
                console.log('[resetAll] TiageState reset durchgeführt');

                // Legacy-Variablen synchronisieren (TiageState.reset() setzt auf null)
                currentArchetype = null;
                selectedPartner = null;
            }

            // Reset dropdowns
            const mobileIchSel = document.getElementById('mobileIchSelect');
            const mobilePartnerSel = document.getElementById('mobilePartnerSelect');
            const ichSel = document.getElementById('ichSelect');
            const partnerSel = document.getElementById('partnerSelect');
            if (mobileIchSel) mobileIchSel.value = '';
            if (mobilePartnerSel) mobilePartnerSel.value = '';
            if (ichSel) ichSel.value = '';
            if (partnerSel) partnerSel.value = '';

            // Reset archetype grids (remove active from all)
            if (typeof updateArchetypeGrid === 'function') {
                updateArchetypeGrid('ich', null);
                updateArchetypeGrid('partner', null);
            }

            // Reset R-Faktor-Anzeige
            if (typeof updateRFactorDisplay === 'function') {
                updateRFactorDisplay();
            }

            // Reset all radio buttons
            document.querySelectorAll('.mobile-page input[type="radio"]').forEach(radio => {
                radio.checked = false;
                const dimension = radio.closest('.compact-dimension');
                if (dimension) {
                    dimension.classList.add('needs-selection');
                }
            });

            // Reset Desktop, Mobile and Modal multi-select checkboxes and status dropdowns
            const shortIds = ['dom', 'sub', 'sw', 'aus'];
            ['ich', 'partner'].forEach(person => {
                shortIds.forEach(shortId => {
                    // Desktop
                    const checkbox = document.getElementById(person + '-d-' + shortId);
                    if (checkbox) checkbox.checked = false;
                    const statusSelect = document.getElementById(person + '-d-' + shortId + '-status');
                    if (statusSelect) {
                        statusSelect.style.display = 'none';
                        statusSelect.value = 'gelebt';
                    }
                    // Mobile
                    const mobileCheckbox = document.getElementById('m-' + person + '-d-' + shortId);
                    if (mobileCheckbox) mobileCheckbox.checked = false;
                    const mobileStatusSelect = document.getElementById('m-' + person + '-d-' + shortId + '-status');
                    if (mobileStatusSelect) {
                        mobileStatusSelect.style.display = 'none';
                        mobileStatusSelect.value = 'gelebt';
                    }
                    // Modal
                    const modalCheckbox = document.getElementById('modal-' + person + '-d-' + shortId);
                    if (modalCheckbox) modalCheckbox.checked = false;
                    const modalStatusSelect = document.getElementById('modal-' + person + '-d-' + shortId + '-status');
                    if (modalStatusSelect) {
                        modalStatusSelect.style.display = 'none';
                        modalStatusSelect.value = 'gelebt';
                    }
                });
                // Mark dominanz as needing selection (Desktop, Mobile & Modal)
                const dimension = document.querySelector('[data-dimension="' + person + '-dominanz-multi"]');
                if (dimension) dimension.classList.add('needs-selection');
                const mobileDimension = document.querySelector('[data-dimension="mobile-' + person + '-dominanz-multi"]');
                if (mobileDimension) mobileDimension.classList.add('needs-selection');
                const modalDimension = document.querySelector('[data-dimension="modal-' + person + '-dominanz-multi"]');
                if (modalDimension) modalDimension.classList.add('needs-selection');

                // Mark orientierung as needing selection (Desktop, Mobile & Modal)
                const orientDimension = document.querySelector('[data-dimension="' + person + '-orientierung-multi"]');
                if (orientDimension) orientDimension.classList.add('needs-selection');
                const mobileOrientDimension = document.querySelector('[data-dimension="mobile-' + person + '-orientierung-multi"]');
                if (mobileOrientDimension) mobileOrientDimension.classList.add('needs-selection');
                const modalOrientDimension = document.querySelector('[data-dimension="modal-' + person + '-orientierung-multi"]');
                if (modalOrientDimension) modalOrientDimension.classList.add('needs-selection');
            });

            // Reset Geschlecht-Extras (Fit/Fucked up/Horny)
            ['ich', 'partner'].forEach(person => {
                // Reset local cache
                geschlechtExtrasCache[person] = { fit: false, fuckedup: false, horny: false };
                // Reset TiageState
                if (typeof TiageState !== 'undefined') {
                    TiageState.set(`personDimensions.${person}.geschlecht_extras`, { fit: false, fuckedup: false, horny: false });
                }
                // Update UI
                syncGeschlechtExtrasUI(person);
            });
            console.log('[resetAll] Geschlecht-Extras zurückgesetzt');

            // Go to page 1
            mobileGoToPage(1);

            // Show confirmation
            const warning = document.createElement('div');
            warning.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(46, 204, 113, 0.95);
                color: white;
                padding: 15px 25px;
                border-radius: 10px;
                font-size: 14px;
                font-weight: 600;
                z-index: 9999;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            `;
            warning.textContent = '✓ Alle Eingaben wurden zurückgesetzt';
            document.body.appendChild(warning);

            setTimeout(() => warning.remove(), 3000);
        }

        /**
         * Löscht die aktuelle Auswahl und setzt die UI zurück.
         * WICHTIG: Die gespeicherten Profile (Memory-Slots) bleiben erhalten!
         */
        function clearAllStorage() {
            const confirmMsg = TiageI18n && TiageI18n.currentLang === 'en'
                ? 'Reset current selection and UI?\n\nThis will remove:\n• Current archetype selections\n• Current dimension settings\n• Current preferences\n\nSaved profiles (memory slots) will be PRESERVED!'
                : 'Aktuelle Auswahl und UI zurücksetzen?\n\nDies entfernt:\n• Aktuelle Archetyp-Auswahlen\n• Aktuelle Dimensions-Einstellungen\n• Aktuelle Präferenzen\n\nGespeicherte Profile (Speicherplätze) bleiben ERHALTEN!';

            if (!confirm(confirmMsg)) {
                return;
            }

            try {
                // Besucher-ID und Memory-Slots vor dem Löschen sichern
                const visitorId = localStorage.getItem('tiage_visitor_id');

                // Memory-Slots sichern (tiage_memory_ME001-004 und tiage_memory_PART001-004)
                const memorySlots = {};
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith('tiage_memory_')) {
                        memorySlots[key] = localStorage.getItem(key);
                    }
                }

                // Lösche alle tiage_* Einträge AUSSER Memory-Slots
                const keysToDelete = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith('tiage') && !key.startsWith('tiage_memory_')) {
                        keysToDelete.push(key);
                    }
                }
                keysToDelete.forEach(key => localStorage.removeItem(key));

                // Besucher-ID wiederherstellen
                if (visitorId) {
                    localStorage.setItem('tiage_visitor_id', visitorId);
                }

                // Memory-Slots wiederherstellen
                Object.entries(memorySlots).forEach(([key, value]) => {
                    if (value) {
                        localStorage.setItem(key, value);
                    }
                });

                // Legacy Keys löschen (Migration zu TiageState)
                localStorage.removeItem('tiage-selection');
                localStorage.removeItem('matchModalView');
                localStorage.removeItem('tiageSyntheseType');
                localStorage.removeItem('pathosLogosType');

                // TiageState UI-Settings zurücksetzen
                if (typeof TiageState !== 'undefined') {
                    TiageState.set('ui.selection', null);
                    TiageState.set('ui.matchModalView', 'pathos');
                    TiageState.set('ui.syntheseType', 'score');
                }

                // Kurze Bestätigung anzeigen
                const toast = document.createElement('div');
                toast.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: linear-gradient(135deg, #10B981, #059669);
                    color: white;
                    padding: 20px 30px;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 600;
                    z-index: 99999;
                    box-shadow: 0 8px 24px rgba(0,0,0,0.4);
                    text-align: center;
                `;
                toast.innerHTML = TiageI18n && TiageI18n.currentLang === 'en'
                    ? '✓ Selection cleared!<br><small>Saved profiles preserved. Reloading...</small>'
                    : '✓ Auswahl gelöscht!<br><small>Profile erhalten. Lade neu...</small>';
                document.body.appendChild(toast);

                // Service Worker + Browser-Cache leeren
                if ('serviceWorker' in navigator) {
                    navigator.serviceWorker.getRegistrations().then(function(regs) {
                        regs.forEach(function(r) { r.unregister(); });
                    });
                }
                if ('caches' in window) {
                    caches.keys().then(function(names) {
                        names.forEach(function(n) { caches.delete(n); });
                    });
                }

                // Seite nach kurzer Verzögerung neu laden
                setTimeout(() => {
                    window.location.reload();
                }, 1000);

            } catch (e) {
                console.error('[clearAllStorage] Fehler:', e);
                alert(TiageI18n.t('ui.errorClearing', 'Fehler beim Zurücksetzen: ') + e.message);
            }
        }

        // Auto-save on changes
        function initAutoSave() {
            // Save on archetype change
            document.getElementById('mobileIchSelect')?.addEventListener('change', saveSelectionToStorage);
            document.getElementById('mobilePartnerSelect')?.addEventListener('change', saveSelectionToStorage);

            // Save on dimension change
            document.querySelectorAll('.mobile-page input[type="radio"]').forEach(radio => {
                radio.addEventListener('change', saveSelectionToStorage);
            });
        }

        // Initialize geschlechtExtrasCache from TiageState (SSOT → Cache sync)
        // v1.8.902: Enhanced logging for FFH persistence debugging
        function initGeschlechtExtrasCacheFromState() {
            if (typeof TiageState === 'undefined') {
                console.warn('[FFH] TiageState not available');
                return;
            }

            console.log('[FFH] initGeschlechtExtrasCacheFromState called');

            ['ich', 'partner'].forEach(person => {
                const extras = TiageState.get(`personDimensions.${person}.geschlecht_extras`);
                console.log(`[FFH] ${person} geschlecht_extras from TiageState:`, JSON.stringify(extras));

                if (extras) {
                    geschlechtExtrasCache[person] = {
                        fit: !!extras.fit,
                        fuckedup: !!extras.fuckedup,
                        horny: !!extras.horny
                    };
                    console.log(`[FFH] ${person} cache updated:`, JSON.stringify(geschlechtExtrasCache[person]));

                    // Sync UI
                    if (typeof syncGeschlechtExtrasUI === 'function') {
                        syncGeschlechtExtrasUI(person);
                    }
                } else {
                    console.log(`[FFH] ${person} no extras found, keeping defaults`);
                }
            });
        }

        // Load saved data on startup - fallback for legacy data
        // TiageState is now loaded in DOMContentLoaded, so we only need
        // to check for legacy 'tiage-selection' data if TiageState is empty
        setTimeout(() => {
            // Check if TiageState already has data (loaded in DOMContentLoaded)
            // v4.0: geschlecht is a direct string, not an object with .primary
            const hasStateData = typeof TiageState !== 'undefined' &&
                (TiageState.get('personDimensions.ich.geschlecht') ||
                 TiageState.get('personDimensions.partner.geschlecht') ||
                 TiageState.get('personDimensions.ich.dominanz.primary') ||
                 TiageState.get('personDimensions.partner.dominanz.primary'));

            // Only load from legacy storage if TiageState is empty
            if (!hasStateData) {
                loadSelectionFromStorage();
            } else {
                // TiageState has data - sync geschlecht_extras cache from it
                initGeschlechtExtrasCacheFromState();
            }
            initAutoSave();
        }, 100); // Reduced timeout since DOMContentLoaded already loads TiageState

        // Update comparison view when data is loaded
        const originalLoadData = loadData;
        async function loadDataAndUpdateComparison() {
            await originalLoadData();
            setTimeout(() => {
                updateComparisonView();
                updateSyntheseScoreCycle();
            }, 100);
        }
        loadDataAndUpdateComparison();

        // Make key functions globally accessible for onclick handlers
        window.showArchetypeInfo = showArchetypeInfo;
        window.openArchetypeInfo = openArchetypeInfo;
        window.openFactorModal = openFactorModal;
        window.closeFactorModal = closeFactorModal;
        window.navigateFactorArchetype = navigateFactorArchetype;
        // NOTE: closeCategoryModal, closeDefinitionModal, navigateDefinition,
        // navigateDefinitionToIndex, window.showArchetypeInfoByType -> js/modals/categoryModal.js
        // NOTE: closeFeedbackModal -> js/modals/categoryModal.js
        window.openCommentModal = openCommentModal;
        window.closeCommentModal = closeCommentModal;
        window.navigateArchetype = navigateArchetype;
        window.openCommentsListModal = openCommentsListModal;
        window.closeCommentsListModal = closeCommentsListModal;
        window.toggleReplyForm = toggleReplyForm;
        window.submitReply = submitReply;
        // NOTE: Pro/Contra Modal functions exported via js/modals/syntheseModal.js
        // window.openProContraModal, closeProContraModal, navigateProContraArchetype

        // Archetype selection functions (critical for main page buttons)
        window.selectArchetypeFromGrid = selectArchetypeFromGrid;
        window.updateArchetypeGrid = updateArchetypeGrid;
        window.navigateArchetypeOnPage2 = navigateArchetypeOnPage2;
        window.navigateArchetypeOnPage3 = navigateArchetypeOnPage3;
        window.findBestPartnerMatch = findBestPartnerMatch;

        // AGOD Weight functions (for synthesis weight toggles)
        window.setAgodWeight = setAgodWeight;
        window.resetAgodWeights = resetAgodWeights;
        window.getAgodWeights = getAgodWeights;
        window.initAgodWeightInputs = initAgodWeightInputs;
        window.updateAgodToggleUI = updateAgodToggleUI;

        // NOTE: Pathos/Logos + Synthese Modal functions exported via js/modals/syntheseModal.js
        // window.closePathosLogosModal, showPathosLogosContent, navigatePathosLogosArchetype
        // window.openTiageSyntheseModal, closeTiageSyntheseModal, showTiageSyntheseContent
        // window.navigateTiageSyntheseArchetype

        // NOTE: NeedsModals exported via js/modals/needsModals.js

        // Dimension toggle and collapse functions
        // NOTE: toggleAllDimensionsCollapse, toggleDimensionCollapse -> delegated to js/ui/collapsible.js
        window.showDimensionTooltip = showDimensionTooltip;
        window.closeDimensionTooltip = closeDimensionTooltip;
        window.showGeschlechtInfoModal = showGeschlechtInfoModal;
        window.closeGeschlechtInfoModal = closeGeschlechtInfoModal;
        window.showDominanzInfoModal = showDominanzInfoModal;
        window.closeDominanzInfoModal = closeDominanzInfoModal;
        window.showOrientierungInfoModal = showOrientierungInfoModal;
        window.closeOrientierungInfoModal = closeOrientierungInfoModal;
        window.showBodySoulModal = showBodySoulModal;
        window.closeBodySoulModal = closeBodySoulModal;
        // NOTE: closeGfkExplanationModal -> now in js/modals/explanationModals.js

        // Dimension click handlers
        window.handleGeschlechtClick = handleGeschlechtClick;
        window.handleGeschlechtPClick = handleGeschlechtPClick;
        window.handleGeschlechtSClick = handleGeschlechtSClick;
        window.handleGeschlechtExtrasClick = handleGeschlechtExtrasClick;
        window.handleDominanzClick = handleDominanzClick;
        // NOTE: handleOrientierungClick, handleDominanzStatusToggle, handleOrientierungStatusToggle,
        // syncMobileDominanzStatusButtons, syncMobileOrientierungStatusButtons, syncDominanzUI,
        // syncOrientierungUI -> now in js/dimensions/dimensionUI.js (TiageDimensionUI)
        // NOTE: handleGfkClick -> now in js/dimensions/gfkMatching.js

        // UI Sync functions (for MemoryManager)
        window.syncGeschlechtUI = syncGeschlechtUI;
        window.syncGeschlechtExtrasUI = syncGeschlechtExtrasUI;
        window.geschlechtExtrasCache = geschlechtExtrasCache;
        window.updateAll = updateAll;
        window.saveSelectionToStorage = saveSelectionToStorage;
        window.updateComparisonView = updateComparisonView;

        // State variables - HINWEIS: window.personDimensions und window.mobilePersonDimensions
        // werden jetzt in state.js als Proxy zu TiageState definiert.
        // Diese Zeilen sind nicht mehr nötig (Proxy-Layer Migration Phase 1).

        // NOTE: openPathosLogosModal exported via js/modals/syntheseModal.js

        // Comment and feedback functions
        window.submitComment = submitComment;
        window.clearCommentsSearch = clearCommentsSearch;

        // Partner selection
        window.selectPartner = selectPartner;

        // Navigation functions (for nav dots and carousel)
        window.navigatePrev = navigatePrev;
        window.navigateNext = navigateNext;
        window.scrollToCard = scrollToCard;

        // i18n translation update function (for language toggle button)
        window.updateAllTranslations = updateAllTranslations;

        // NOTE: Category/Match/Definition modal functions -> js/modals/categoryModal.js
        // openCategoryModal, openSingleCategoryModal, navigateCategoryPrev/Next
        // openDefinitionModal, closeDefinitionModal, navigateDefinition*
        // openMatchModal, toggleMatchModalView, openFeedbackModalWithContext
        // openTagTooltip, closeTagTooltip, renderTagWithTooltip, window.getShortDef

        // Category navigation (showCategoryDetails still in app-main.js)
        window.navigateCategoryArchetype = navigateCategoryArchetype;
        window.showCategoryDetails = showCategoryDetails;

        // Feedback and reply functions
        window.openReplyModal = openReplyModal;

        // Pathos/Logos info functions
        window.toggleLogosWarning = toggleLogosWarning;
        window.showPathosLogosInfo = showPathosLogosInfo;
        window.showSubDimensionInfo = showSubDimensionInfo;

        // Mobile navigation functions
        window.mobileGoToPage = mobileGoToPage;
        window.toggleMobileCategory = toggleMobileCategory;

        // Utility functions
        // NOTE: toggleCollapsible -> delegated to js/ui/collapsible.js
        window.resetAll = resetAll;

        // Wrapper functions for secondary interessiert buttons (used in modal)
        // These call the status toggle with 'interessiert' as the status
        window.handleSecondaryInteressiert = function(person, dominanzType, btn) {
            handleDominanzStatusToggle(person, dominanzType, 'interessiert', btn);
        };
        window.handleOrientierungSecondaryInteressiert = function(person, orientierungType, btn) {
            handleOrientierungStatusToggle(person, orientierungType, 'interessiert', btn);
        };


        // ═══════════════════════════════════════════════════════════════════════════
        // PROFILE REVIEW MODAL
        // NOTE: Moved to js/modals/profileReviewModal.js
        // Functions available via window.*:
        // - openProfileReviewModal, closeProfileReviewModal
        // - filterProfileReviewByNeed, resetProfileReviewFilter, clearProfileReviewSearch
        // - getSelectedArchetype, getProfileReviewState, saveProfileReview
        // - selectTripleBtn, selectToggleBtn, getToggleBtnValue, setToggleBtnValue
        // - getTripleBtnValue, setTripleBtnValue, toggleProfileBtn, setProfileBtnState
        // - updateGeschlechtsidentitaetOptions, reloadProfileAttributesAfterGenderChange
        // - showProfileReviewInfo, closeProfileReviewInfoModal, filterProfileReviewAttributes
        // - updateSourceExplanation, updateProfileReviewSlider, trackProfileReviewChange
        // - handleIntelligentSearch, handleSearchKeydown, showSearchSuggestions, etc.
        // ═══════════════════════════════════════════════════════════════════════════

        console.log('All modal functions are now globally available');

        // ═══════════════════════════════════════════════════════════════
        // DEBUG: Element Inspector - Click to log element path & styles
        // ═══════════════════════════════════════════════════════════════
        (function initDebugger() {
            function getElementPath(el) {
                const path = [];
                while (el && el.nodeType === 1) {
                    let selector = el.tagName.toLowerCase();
                    if (el.id) {
                        selector += '#' + el.id;
                    } else if (el.className && typeof el.className === 'string') {
                        const classes = el.className.trim().split(/\s+/).filter(c => c);
                        if (classes.length) selector += '.' + classes.join('.');
                    }
                    path.unshift(selector);
                    el = el.parentElement;
                }
                return path.join(' > ');
            }

            function getAppliedStyles(el) {
                const computed = window.getComputedStyle(el);
                return {
                    display: computed.display,
                    flexDirection: computed.flexDirection,
                    gridTemplateColumns: computed.gridTemplateColumns,
                    padding: computed.padding,
                    background: computed.background,
                    borderLeft: computed.borderLeft
                };
            }

            document.addEventListener('click', function(e) {
                const el = e.target;
                const path = getElementPath(el);
                const styles = getAppliedStyles(el);

                console.group('%c🔍 DEBUG: Element clicked', 'color: #8B5CF6; font-weight: bold;');
                console.log('%c📍 Path:', 'color: #22c55e;', path);
                console.log('%c🏷️ Tag:', 'color: #3b82f6;', el.tagName);
                console.log('%c🆔 ID:', 'color: #f59e0b;', el.id || '(none)');
                console.log('%c📋 Classes:', 'color: #ec4899;', el.className || '(none)');
                console.log('%c🎨 Styles:', 'color: #14b8a6;', styles);
                console.log('%c📦 Element:', 'color: #6366f1;', el);
                console.groupEnd();
            }, true);

            console.log('%c🐛 DEBUG MODE ACTIVE - Click any element to inspect', 'background: #8B5CF6; color: white; padding: 4px 8px; border-radius: 4px;');
        })();

