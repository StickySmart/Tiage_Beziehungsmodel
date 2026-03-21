/**
 * TIAGE App Init
 * Extracted from app-main.js
 *
 * Functions: initApp, initGreetingHint, initDimensionInfoLinks
 *
 * Dependencies:
 *   - window.setIchArchetype (app-main.js)
 *   - window.updateAll (js/ui/updateRendering.js)
 *   - window.updateNavDots (js/ui/cardNavigation.js)
 *   - window.showGeschlechtInfoModal, showDominanzInfoModal, showOrientierungInfoModal,
 *     showDimensionTooltip (js/ui/geschlechtUI.js)
 *   - PhilosophyHints, PhilosophyHint, HintState (optional)
 */

function initApp() {
    const archetypeSelect = document.getElementById('archetypeSelect');
    if (archetypeSelect) {
        archetypeSelect.addEventListener('change', (e) => {
            window.setIchArchetype(e.target.value);
            window.updateAll();
        });
    }

    // Carousel scroll detection
    const carousel = document.getElementById('carousel');
    if (carousel) {
        carousel.addEventListener('scroll', window.updateNavDots);
    }

    // Initialize dimension info link event listeners
    initDimensionInfoLinks();

    // Greeting Hint wird jetzt über den WorkflowGuide (Schritt 0) angezeigt
    // initGreetingHint();

    window.updateAll();
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

function openArchetypeInfo(archetypeId, person = null) {
    // Redirect to definitionModal (zusammengeführt)
    console.log('openArchetypeInfo called with:', archetypeId, 'person:', person);

    // Track which person this modal is for
    window.currentDefinitionPerson = person;

    // Update current index
    window.currentDefinitionIndex = window.archetypeOrder.indexOf(archetypeId);
    if (window.currentDefinitionIndex === -1) window.currentDefinitionIndex = 0;

    // Use the detailed definition modal
    window.showArchetypeInfoByType(archetypeId);

    document.getElementById('definitionModal').classList.add('active');
    document.body.style.overflow = 'hidden';

    // Add touch swipe support
    const modal = document.querySelector('#definitionModal .modal');
    modal.ontouchstart = handleDefinitionTouchStart;
    modal.ontouchend = handleDefinitionTouchEnd;
}

window.initApp = initApp;
window.initGreetingHint = initGreetingHint;
window.initDimensionInfoLinks = initDimensionInfoLinks;
window.openArchetypeInfo = openArchetypeInfo;
