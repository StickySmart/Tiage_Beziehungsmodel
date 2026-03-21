/**
 * initialization.js — App startup sequence
 * Called on DOMContentLoaded after all defer scripts have loaded
 */

var flatNeedSaveDebounceTimer = null;
var FLAT_NEED_SAVE_DEBOUNCE_MS = 500;

async function runAppInitialization() {
    try {
        // Load archetype data first - this is critical for all other functions
        // console.log('[TIAGE DEBUG] Before loadData');
        await window.loadData();
        // console.log('[TIAGE DEBUG] After loadData, data loaded:', data !== null);

        window.checkAgeVerification();
        window.initAgeVerification();
        if (typeof window.initFeedbackSystem === 'function') window.initFeedbackSystem();
        window.initVisitorId();
        // console.log('[TIAGE DEBUG] Before initDimensionListeners');
        window.initDimensionListeners();
        // console.log('[TIAGE DEBUG] Before initComparisonLayout');
        window.initComparisonLayout();
        // console.log('[TIAGE DEBUG] Before initMobileLayout');
        window.initMobileLayout();
        // console.log('[TIAGE DEBUG] Before initDimensionButtons');
        window.initDimensionButtons();
        // console.log('[TIAGE DEBUG] After initDimensionButtons');
        window.initGeschlechtHoverEvents();

        // FIX: Stelle sicher, dass Subscriber registriert sind BEVOR loadFromStorage()
        // aufgerufen wird, damit flatNeeds reaktiv berechnet werden
        if (typeof ProfileCalculator !== 'undefined' && ProfileCalculator.registerSubscribers) {
            ProfileCalculator.registerSubscribers();
        }

        // console.log('[TIAGE DEBUG] Before loadDimensionsFromState');
        // Load saved dimensions from TiageState AFTER initializing buttons
        // so that UI sync functions can update the buttons
        window.loadDimensionsFromState();

        // SSOT: Ensure flatNeeds + Resonanzfaktoren calculated at app start
        if (typeof ProfileCalculator !== 'undefined' && typeof TiageState !== 'undefined') {
            ['ich', 'partner'].forEach(person => {
                const archetyp = person === 'ich' ? window.getIchArchetype() : window.getPartnerArchetype();
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
        window.updateGeschlechtSummary('ich');
        window.updateGeschlechtSummary('partner');
        window.updateDominanzSummary('ich');
        window.updateDominanzSummary('partner');
        window.updateOrientierungSummary('ich');
        window.updateOrientierungSummary('partner');
        // GFK automatisch aus Archetypen-Matching setzen
        window.updateGfkFromArchetypes();

        // IMPORTANT: Update comparison view AFTER loading dimensions
        // This ensures the score is calculated with the correct data
        // // console.log('[TIAGE DEBUG] Before updateComparisonView'); // DISABLED: verursacht Message-Overflow
        window.updateComparisonView();
        window.updateSyntheseScoreCycle();
        // // console.log('[TIAGE DEBUG] After updateComparisonView'); // DISABLED: verursacht Message-Overflow

        // Note: openComments=1 parameter is now handled in handleAgeConfirm()
        // to ensure age verification is completed before opening comments modal

        // Event-Listener für Resonanzfaktoren — debounce for slider changes
        let resonanzUpdateDebounce = null;
        const RESONANZ_DEBOUNCE_DELAY = 100; // ms

        window.addEventListener('resonanzfaktoren-changed', function(e) {
            const { person, values, source } = e.detail;

            // NOTE: TiageState already updated by ResonanzCard.save() — do not overwrite here
            // console.log('[TIAGE] resonanzfaktoren-changed Event für', person, '- Quelle:', source); // DISABLED: verursacht Message-Overflow

            // FIX: Aktualisiere Comparison View für ALLE Quellen (inkl. Slider)
            // Debounce bei Slider-Änderungen um Performance zu optimieren
            if (source === 'slider') {
                if (resonanzUpdateDebounce) {
                    clearTimeout(resonanzUpdateDebounce);
                }
                resonanzUpdateDebounce = setTimeout(function() {
                    window.updateComparisonView();
                }, RESONANZ_DEBOUNCE_DELAY);
            } else {
                // Sofortiges Update für andere Quellen (reset, calculated, etc.)
                window.updateComparisonView();
            }
        });


        function showLockSavedToast(message) {
            TiageToast.success(message);
        }


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
        if (typeof window.initAgodWeightInputs === 'function') {
            window.initAgodWeightInputs();
            // console.log('[TIAGE DEBUG] AGOD weight inputs initialized');
        }

        // console.log('[TIAGE DEBUG] DOMContentLoaded completed successfully');
    } catch (e) {
        console.error('[TIAGE ERROR] DOMContentLoaded failed:', e);
    }
}

window.runAppInitialization = runAppInitialization;

document.addEventListener('DOMContentLoaded', runAppInitialization);
