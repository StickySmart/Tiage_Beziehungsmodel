/**
 * dimensionLoader.js — Load saved dimensions from TiageState into UI
 * Extracted from app-main.js v1.8.1030
 *
 * Dependencies (via window.*):
 *   window.setIchArchetype(v), window.setPartnerArchetype(v)
 *   window.getIchArchetype(), window.getPartnerArchetype()
 *   window.personDimensions, window.mobilePersonDimensions
 *   window.geschlechtExtrasCache (js/ui/geschlechtUI.js)
 *   window.updateArchetypeGrid, window.updateAll
 *   window.syncGeschlechtUI, window.syncGeschlechtExtrasUI (js/ui/geschlechtUI.js)
 *   window.syncDominanzUI, window.syncOrientierungUI (js/dimensions/dimensionUI.js)
 *   TiageState, ProfileCalculator, GewichtungCard, ResonanzCard
 */
(function() {
    'use strict';

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
            window.setIchArchetype(savedIchArchetype);  // sets currentArchetype, mobileIchArchetype, TiageState
            // Sync all ICH select dropdowns
            const archetypeSelect = document.getElementById('archetypeSelect');
            const ichSelect = document.getElementById('ichSelect');
            const mobileIchSelect = document.getElementById('mobileIchSelect');
            if (archetypeSelect) archetypeSelect.value = savedIchArchetype;
            if (ichSelect) ichSelect.value = savedIchArchetype;
            if (mobileIchSelect) mobileIchSelect.value = savedIchArchetype;
            // Sync archetype grid highlighting
            if (typeof updateArchetypeGrid === 'function') {
                window.updateArchetypeGrid('ich', savedIchArchetype);
            }
        }

        if (savedPartnerArchetype) {
            window.setPartnerArchetype(savedPartnerArchetype);  // sets selectedPartner, mobilePartnerArchetype, TiageState
            // Sync all PARTNER select dropdowns
            const partnerSelect = document.getElementById('partnerSelect');
            const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
            if (partnerSelect) partnerSelect.value = savedPartnerArchetype;
            if (mobilePartnerSelect) mobilePartnerSelect.value = savedPartnerArchetype;
            // Sync archetype grid highlighting
            if (typeof updateArchetypeGrid === 'function') {
                window.updateArchetypeGrid('partner', savedPartnerArchetype);
            }
        }

        ['ich', 'partner'].forEach(person => {
            const savedDims = TiageState.get(`window.personDimensions.${person}`);
            console.log(`[loadDimensionsFromState] ${person} savedDims:`, JSON.stringify(savedDims));
            if (!savedDims) {
                console.log(`[loadDimensionsFromState] Keine gespeicherten Dimensionen für ${person}`);
                return;
            }

            // Sync geschlecht
            if (savedDims.geschlecht) {
                // Handle both old format (string) and new format (object with primary/secondary)
                if (typeof savedDims.geschlecht === 'object' && 'primary' in savedDims.geschlecht) {
                    window.personDimensions[person].geschlecht = savedDims.geschlecht;
                } else if (typeof savedDims.geschlecht === 'string') {
                    // Old format: string like "cis_frau" - convert to new format as primary
                    window.personDimensions[person].geschlecht = { primary: savedDims.geschlecht, secondary: null };
                }
            }

            // Sync dominanz - handle both formats
            if (savedDims.dominanz) {
                if (typeof savedDims.dominanz === 'object') {
                    // New format: { primary: 'dominant', secondary: null }
                    if ('primary' in savedDims.dominanz) {
                        window.personDimensions[person].dominanz = savedDims.dominanz;
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
                        window.personDimensions[person].dominanz = { primary, secondary };
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
                window.personDimensions[person].orientierung = orientierungen;

                console.log(`[loadDimensionsFromState] ${person} orientierung migriert:`, orientierungen);
            }

            // Sync GFK if present
            if (savedDims.gfk) {
                window.personDimensions[person].gfk = savedDims.gfk;
            }

            // Sync Geschlecht Extras if present (Fit/Fucked up/Horny)
            if (savedDims.geschlecht_extras) {
                window.personDimensions[person].geschlecht_extras = savedDims.geschlecht_extras;
                // FIX: window.geschlechtExtrasCache synchronisieren — syncGeschlechtExtrasUI liest aus Cache, nicht window.personDimensions
                window.geschlechtExtrasCache[person] = {
                    fit: !!savedDims.geschlecht_extras.fit,
                    fuckedup: !!savedDims.geschlecht_extras.fuckedup,
                    horny: !!savedDims.geschlecht_extras.horny
                };
            }

            // Sync mobilePersonDimensions if it exists
            if (typeof mobilePersonDimensions !== 'undefined') {
                mobilePersonDimensions[person].geschlecht = window.personDimensions[person].geschlecht;
                mobilePersonDimensions[person].dominanz = window.personDimensions[person].dominanz;
                mobilePersonDimensions[person].orientierung = window.personDimensions[person].orientierung;
                mobilePersonDimensions[person].gfk = window.personDimensions[person].gfk;
                mobilePersonDimensions[person].geschlecht_extras = window.personDimensions[person].geschlecht_extras;
            }

            // Sync UI elements after loading (Desktop + Mobile einheitlich)
            if (typeof window.syncGeschlechtUI === 'function') {
                window.syncGeschlechtUI(person);
            }
            if (typeof window.syncGeschlechtExtrasUI === 'function') {
                window.syncGeschlechtExtrasUI(person);
            }
            if (typeof window.syncDominanzUI === 'function') {
                window.window.syncDominanzUI(person);  // Enthält jetzt auch syncMobileStatusButtons
            }
            if (typeof window.syncOrientierungUI === 'function') {
                window.syncOrientierungUI(person);  // Enthält jetzt auch syncMobileStatusButtons
            }
        });

        // Update entire UI after loading all dimensions and archetypes
        // This ensures all UI elements reflect the loaded state
        if (typeof window.updateAll === 'function') {
            window.updateAll();
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

        console.log('[loadDimensionsFromState] Abgeschlossen - window.personDimensions:', JSON.stringify(window.personDimensions));
        console.log('[loadDimensionsFromState] Abgeschlossen - currentArchetype:', window.getIchArchetype(), 'selectedPartner:', window.getPartnerArchetype());
    }

    // Initialize when DOM is ready

    // ── Export ──────────────────────────────────────────────────────────────
    window.loadDimensionsFromState = loadDimensionsFromState;

})();
