/**
 * mobileNavigation.js — Mobile Page Navigation, Validation & Dimension Listeners
 * Extracted from app-main.js v1.8.1029
 *
 * Dependencies (via window.*):
 *   window.getIchArchetype(), window.getPartnerArchetype()
 *   window.setIchArchetype(v), window.setPartnerArchetype(v)
 *   window.mobilePersonDimensions, window.personDimensions
 *   window.handleGeschlechtClick, window.handleDominanzClick
 *   window.updateComparisonView, window.updateGfkFromArchetypes
 *   window.updateArchetypeGrid, window.saveSelectionToStorage
 *   window.updateMobileResultPage (js/ui/mobileUI.js)
 *   ProfileCalculator, TiageState
 */
(function() {
    'use strict';

    // ========================================
    // MOBILE MULTI-PAGE FUNCTIONS
    // ========================================

    let currentMobilePage = 1;
    window.currentMobilePage = 1;
    // ═══════════════════════════════════════════════════════════════════════════
    // PHASE 1: PROXY-LAYER MIGRATION
    // ═══════════════════════════════════════════════════════════════════════════
    // window.mobilePersonDimensions verweist jetzt auf denselben Proxy wie window.personDimensions.
    // Mobile und Desktop teilen sich TiageState als Single Source of Truth.
    // ═══════════════════════════════════════════════════════════════════════════

    function getMissingDimensions() {
        // Check if we're in mobile mode
        const isMobile = window.innerWidth <= 768;
        const dimensions = isMobile ? window.mobilePersonDimensions : window.personDimensions;
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
        if (typeof window.saveSelectionToStorage === 'function') {
            window.saveSelectionToStorage();
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
            window.updateMobileResultPage();
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
                // Sync all archetype state (currentArchetype, mobileIchArchetype, TiageState)
                window.setIchArchetype(e.target.value);
                // Sync desktop select
                const desktopSelect = document.getElementById('ichSelect');
                if (desktopSelect) desktopSelect.value = e.target.value;
                // Sync archetype grid highlighting
                window.updateArchetypeGrid('ich', e.target.value);

                // SSOT: Berechne flatNeeds + Resonanzfaktoren bei Archetyp-Wechsel
                if (typeof ProfileCalculator !== 'undefined' && typeof TiageState !== 'undefined') {
                    const profileData = {
                        archetyp: e.target.value,
                        geschlecht: TiageState.get('window.personDimensions.ich.geschlecht'),
                        dominanz: TiageState.get('window.personDimensions.ich.dominanz'),
                        orientierung: TiageState.get('window.personDimensions.ich.orientierung')
                    };
                    ProfileCalculator.loadProfile('ich', profileData);
                }

                window.updateComparisonView();
                // GFK automatisch aus Archetypen-Matching ableiten
                window.updateGfkFromArchetypes();
            });
        }

        // Partner Select
        const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
        if (mobilePartnerSelect) {
            mobilePartnerSelect.addEventListener('change', (e) => {
                // Sync all archetype state (selectedPartner, mobilePartnerArchetype, TiageState)
                window.setPartnerArchetype(e.target.value);
                // Sync desktop select
                const desktopSelect = document.getElementById('partnerSelect');
                if (desktopSelect) desktopSelect.value = e.target.value;
                // Sync archetype grid highlighting
                window.updateArchetypeGrid('partner', e.target.value);

                // SSOT: Berechne flatNeeds + Resonanzfaktoren bei Archetyp-Wechsel
                if (typeof ProfileCalculator !== 'undefined' && typeof TiageState !== 'undefined') {
                    const profileData = {
                        archetyp: e.target.value,
                        geschlecht: TiageState.get('window.personDimensions.partner.geschlecht'),
                        dominanz: TiageState.get('window.personDimensions.partner.dominanz'),
                        orientierung: TiageState.get('window.personDimensions.partner.orientierung')
                    };
                    ProfileCalculator.loadProfile('partner', profileData);
                }

                window.updateComparisonView();
                // GFK automatisch aus Archetypen-Matching ableiten
                window.updateGfkFromArchetypes();
            });
        }

        // ICH Dimensions
        document.querySelectorAll('input[name="mobile-ich-geschlecht"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                e.target.closest('.compact-dimension').classList.remove('needs-selection');
                // Use handleGeschlechtClick to maintain consistent object format
                window.handleGeschlechtClick('ich', e.target.value, e.target);
            });
        });
        document.querySelectorAll('input[name="mobile-ich-dominanz"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                e.target.closest('.compact-dimension').classList.remove('needs-selection');
                window.handleDominanzClick('ich', e.target.value, true);
            });
        });
        document.querySelectorAll('input[name="mobile-ich-dominanz-status"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                window.mobilePersonDimensions.ich.dominanzStatus = e.target.value;
                window.personDimensions.ich.dominanzStatus = e.target.value;
                e.target.closest('.compact-dimension').classList.remove('needs-selection');
                syncDimensionToDesktop('ich-dominanz-status-new', e.target.value);
                window.updateComparisonView();
                // Fix: Speichere Änderungen sofort
                if (typeof window.saveSelectionToStorage === 'function') {
                    window.saveSelectionToStorage();
                }
            });
        });

        // Partner Dimensions
        document.querySelectorAll('input[name="mobile-partner-geschlecht"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                e.target.closest('.compact-dimension').classList.remove('needs-selection');
                // Use handleGeschlechtClick to maintain consistent object format
                window.handleGeschlechtClick('partner', e.target.value, e.target);
            });
        });
        document.querySelectorAll('input[name="mobile-partner-dominanz"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                e.target.closest('.compact-dimension').classList.remove('needs-selection');
                window.handleDominanzClick('partner', e.target.value, true);
            });
        });
        document.querySelectorAll('input[name="mobile-partner-dominanz-status"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                window.mobilePersonDimensions.partner.dominanzStatus = e.target.value;
                window.personDimensions.partner.dominanzStatus = e.target.value;
                e.target.closest('.compact-dimension').classList.remove('needs-selection');
                syncDimensionToDesktop('partner-dominanz-status-new', e.target.value);
                window.updateComparisonView();
                // Fix: Speichere Änderungen sofort
                if (typeof window.saveSelectionToStorage === 'function') {
                    window.saveSelectionToStorage();
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


    // ── Exports ─────────────────────────────────────────────────────────────
    window.getMissingDimensions = getMissingDimensions;
    window.validateDimensionsComplete = validateDimensionsComplete;
    window.mobileGoToPage = mobileGoToPage;
    window.initMobileSwipe = initMobileSwipe;
    window.initMobileDimensionListeners = initMobileDimensionListeners;
    window.syncDimensionToDesktop = syncDimensionToDesktop;

})();
