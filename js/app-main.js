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

        // NOTE: GEWICHTUNGEN -> js/components/GewichtungCard.js
        // NOTE: personDimensions is a TiageState proxy (state.js)
        const personDimensions = window.personDimensions;

        // Phase 1.1: Archetyp Wrapper Functions (State Refactoring)

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

        // Phase 1.2: TiageState Subscriber — hält Legacy-Variablen synchron
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
                        // Pro-Archetyp GODFUFH Persistenz: save old, restore new
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

        // NOTE: MICRO-STATEMENTS -> statements/*.js (archetypeStatements, dominanceStatements, etc.)

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

        // NOTE: getTagTooltip, generateFallbackTooltip -> js/data/tagTooltipHandler.js

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
            window.initApp();
        }
        window.loadData = loadData;

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

        // NOTE: initApp, initGreetingHint, initDimensionInfoLinks -> js/core/appInit.js
        // NOTE: UPDATE RENDERING -> js/ui/updateRendering.js
        // NOTE: resetPartnerGOD -> js/ui/updateRendering.js
        // NOTE: SCORE DISPLAY -> js/ui/scoreDisplay.js
        // NOTE: CARD NAVIGATION -> js/ui/cardNavigation.js
        // NOTE: CATEGORY / MATCH / DEFINITION MODALS -> js/modals/categoryModal.js
        // NOTE: FEEDBACK SYSTEM -> js/feedback/feedbackSystem.js
        // NOTE: AGE VERIFICATION -> js/ui/ageVerification.js
        // NOTE: GESCHLECHT UI SYSTEM -> js/ui/geschlechtUI.js
        // NOTE: DIMENSION INIT FUNCTIONS -> js/ui/dimensionInit.js
        // NOTE: DIMENSION UI -> js/dimensions/dimensionUI.js
        // NOTE: GFK HANDLER -> js/dimensions/gfkMatching.js
        // NOTE: DIMENSION HELPERS -> js/ui/dimensionHelpers.js
        // NOTE: SCORING ENGINE -> js/synthesis/scoringEngine.js
        // NOTE: CALCULATION ENGINE -> js/synthesis/calculationEngine.js
        // NOTE: ARCHETYPE NAVIGATION -> js/ui/archetypeGrid.js
        // NOTE: BEST MATCH -> js/ui/bestMatch.js
        // NOTE: findBestIchMatch -> js/ui/bestMatch.js
        // NOTE: navigateArchetypeOnPage2/3, updateMobilePage3 -> js/ui/archetypeGrid.js
        // NOTE: currentDisplayedCategory + navigateCategoryArchetype -> js/modals/categoryDetailsModal.js
        // NOTE: COMPARISON LAYOUT -> js/ui/comparisonLayout.js
        // NOTE: COMPARISON VIEW -> js/ui/comparisonView.js
        // NOTE: CATEGORY DETAILS MODAL -> js/modals/categoryDetailsModal.js
        // NOTE: PATHOS/LOGOS GENERATOR -> js/synthesis/pathosLogosGenerator.js
        // NOTE: MOBILE NAVIGATION -> js/ui/mobileNavigation.js
        let currentMobilePage = 1;
        window.currentMobilePage = 1;
        // mobileIchArchetype / mobilePartnerArchetype stay here: referenced by setIchArchetype/setPartnerArchetype closures
        let mobilePersonDimensions = window.mobilePersonDimensions;
        let mobileIchArchetype = null;
        let mobilePartnerArchetype = null;
        let mobileTouchStartX = 0;
        let mobileTouchEndX = 0;

        // NOTE: MOBILE UI -> js/ui/mobileUI.js
        // NOTE: LOAD DIMENSIONS -> js/persistence/dimensionLoader.js
        // NOTE: DOMContentLoaded initialization -> js/core/initialization.js
        // NOTE: factorExplanations -> js/modals/factorExplanations.js
        // NOTE: FACTOR MODAL -> js/modals/factorModal.js
        // NOTE: SYNTHESE MODAL -> js/modals/syntheseModal.js

        // Close modals with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const factorModal = document.getElementById('factorModal');
                if (factorModal && factorModal.classList.contains('active')) {
                    if (typeof window.closeFactorModal === 'function') window.closeFactorModal();
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

        // NOTE: VISITOR TRACKING -> js/persistence/visitorTracking.js
        // NOTE: openArchetypeInfo -> js/core/appInit.js
        // NOTE: PERSISTENCE MANAGER -> js/persistence/persistenceManager.js
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

        // NOTE: showArchetypeInfo -> js/ui/comparisonView.js
        // NOTE: openArchetypeInfo -> js/core/appInit.js
        // NOTE: openFactorModal, closeFactorModal, navigateFactorArchetype -> js/modals/factorModal.js
        // NOTE: closeCategoryModal, closeDefinitionModal, navigateDefinition,
        // navigateDefinitionToIndex, window.showArchetypeInfoByType -> js/modals/categoryModal.js
        // NOTE: closeFeedbackModal -> js/modals/categoryModal.js
        window.openCommentModal = openCommentModal;
        window.closeCommentModal = closeCommentModal;
        // NOTE: navigateArchetype -> js/ui/archetypeGrid.js
        window.openCommentsListModal = openCommentsListModal;
        window.closeCommentsListModal = closeCommentsListModal;
        window.toggleReplyForm = toggleReplyForm;
        window.submitReply = submitReply;
        // NOTE: Pro/Contra Modal functions exported via js/modals/syntheseModal.js
        // window.openProContraModal, closeProContraModal, navigateProContraArchetype

        // NOTE: selectArchetypeFromGrid, updateArchetypeGrid, navigateArchetypeOnPage2/3 -> js/ui/archetypeGrid.js
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
        // NOTE: toggleAllDimensionsCollapse, toggleDimensionCollapse -> delegated to js/ui/collapsible.js
        // NOTE: showDimensionTooltip, closeDimensionTooltip -> js/ui/geschlechtUI.js
        // NOTE: showGeschlechtInfoModal, closeGeschlechtInfoModal -> js/ui/geschlechtUI.js
        // NOTE: showDominanzInfoModal, closeDominanzInfoModal -> js/ui/geschlechtUI.js
        // NOTE: showOrientierungInfoModal, closeOrientierungInfoModal -> js/ui/geschlechtUI.js
        // NOTE: showBodySoulModal, closeBodySoulModal -> js/ui/geschlechtUI.js
        // NOTE: closeGfkExplanationModal -> now in js/modals/explanationModals.js
        // NOTE: handleGeschlechtClick, handleGeschlechtPClick, handleGeschlechtSClick -> js/ui/geschlechtUI.js
        // NOTE: handleGeschlechtExtrasClick -> js/ui/geschlechtUI.js
        // NOTE: handleDominanzClick -> js/ui/dimensionInit.js
        // NOTE: handleOrientierungClick, handleDominanzStatusToggle, handleOrientierungStatusToggle,
        // syncMobileDominanzStatusButtons, syncMobileOrientierungStatusButtons, syncDominanzUI,
        // syncOrientierungUI -> now in js/dimensions/dimensionUI.js (TiageDimensionUI)
        // NOTE: handleGfkClick -> now in js/dimensions/gfkMatching.js
        // NOTE: syncGeschlechtUI, syncGeschlechtExtrasUI, geschlechtExtrasCache -> js/ui/geschlechtUI.js
        // NOTE: updateAll -> js/ui/updateRendering.js
        // NOTE: saveSelectionToStorage -> js/persistence/persistenceManager.js
        // NOTE: updateComparisonView, updateExpandableCategoryBars, renderCategoryBars, showArchetypeInfo -> js/ui/comparisonView.js
        // NOTE: updateRFactorDisplay -> js/ui/scoreDisplay.js
        // NOTE: updateDesktopFactorContent -> js/ui/scoreDisplay.js
        // NOTE: updateSelectionInfoMessage -> js/ui/dimensionHelpers.js
        // NOTE: openPathosLogosModal exported via js/modals/syntheseModal.js
        // NOTE: submitComment, clearCommentsSearch -> js/modals/commentModal.js
        // NOTE: selectPartner -> js/ui/updateRendering.js
        // NOTE: navigatePrev -> js/ui/cardNavigation.js
        // NOTE: navigateNext -> js/ui/cardNavigation.js
        // NOTE: scrollToCard -> js/ui/cardNavigation.js

        window.updateAllTranslations = updateAllTranslations;

        // NOTE: Category/Match/Definition modal functions -> js/modals/categoryModal.js
        // openCategoryModal, openSingleCategoryModal, navigateCategoryPrev/Next
        // openDefinitionModal, closeDefinitionModal, navigateDefinition*
        // openMatchModal, toggleMatchModalView, openFeedbackModalWithContext
        // openTagTooltip, closeTagTooltip, renderTagWithTooltip, window.getShortDef

        // NOTE: navigateCategoryArchetype, showCategoryDetails, showSubDimensionInfo ->
        //       js/modals/categoryDetailsModal.js

        // NOTE: openReplyModal, loadFeedback, initFeedbackSystem -> js/feedback/feedbackSystem.js
        // NOTE: toggleLogosWarning, showPathosLogosInfo -> js/synthesis/scoringEngine.js
        // NOTE: mobileGoToPage, getMissingDimensions, validateDimensionsComplete -> js/ui/mobileNavigation.js
        // NOTE: initMobileSwipe, initMobileDimensionListeners, syncDimensionToDesktop -> js/ui/mobileNavigation.js
        // NOTE: toggleMobileCategory -> js/ui/mobileUI.js

        window.ensureValidOrientierung = ensureValidOrientierung;

        // NOTE: toggleCollapsible -> delegated to js/ui/collapsible.js
        // NOTE: resetAll, clearAllStorage -> js/persistence/persistenceManager.js

        window.handleSecondaryInteressiert = function(person, dominanzType, btn) {
            handleDominanzStatusToggle(person, dominanzType, 'interessiert', btn);
        };
        window.handleOrientierungSecondaryInteressiert = function(person, orientierungType, btn) {
            handleOrientierungStatusToggle(person, orientierungType, 'interessiert', btn);
        };

        // NOTE: PROFILE REVIEW MODAL -> js/modals/profileReviewModal.js

        console.log('All modal functions are now globally available');

        // NOTE: Debug Inspector -> js/core/debugInspector.js
