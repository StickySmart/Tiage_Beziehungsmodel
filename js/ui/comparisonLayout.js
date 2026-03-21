/**
 * comparisonLayout.js — initComparisonLayout (desktop dimension listeners)
 * Extracted from app-main.js v1.8.1032
 *
 * Dependencies (via window.*):
 *   window.setIchArchetype(v), window.setPartnerArchetype(v)
 *   window.personDimensions, window.updateArchetypeGrid
 *   window.handleGeschlechtClick (geschlechtUI.js)
 *   window.handleDominanzClick
 *   window.updateAnalysisOverview, window.updateComparisonView
 *   window.updateGfkFromArchetypes (gfkMatching.js)
 *   ProfileCalculator, TiageState
 */
(function() {
    'use strict';

    function initComparisonLayout() {
        // ICH select
        const ichSelect = document.getElementById('ichSelect');
        if (ichSelect) {
            ichSelect.addEventListener('change', (e) => {
                // Sync all archetype state (currentArchetype, mobileIchArchetype, TiageState)
                window.setIchArchetype(e.target.value);
                // Sync with old select if exists
                const oldSelect = document.getElementById('archetypeSelect');
                if (oldSelect) oldSelect.value = e.target.value;
                window.updateArchetypeGrid('ich', e.target.value);

                // ═══════════════════════════════════════════════════════════════
                // SSOT: Berechne flatNeeds + Resonanzfaktoren bei Archetyp-Wechsel
                // ProfileCalculator.loadProfile() schreibt direkt in TiageState
                // ═══════════════════════════════════════════════════════════════
                if (typeof ProfileCalculator !== 'undefined' && typeof TiageState !== 'undefined') {
                    const profileData = {
                        archetyp: e.target.value,
                        geschlecht: TiageState.get('window.personDimensions.ich.geschlecht'),
                        dominanz: TiageState.get('window.personDimensions.ich.dominanz'),
                        orientierung: TiageState.get('window.personDimensions.ich.orientierung')
                    };
                    console.log('[SSOT] Rufe ProfileCalculator.loadProfile auf mit:', JSON.stringify(profileData));
                    ProfileCalculator.loadProfile('ich', profileData);
                    console.log('[SSOT] Profil für ICH neu berechnet:', e.target.value);
                    // Debug: Was steht jetzt in TiageState?
                    const resonanzNachBerechnung = TiageState.getResonanzFaktoren('ich');
                    console.log('[SSOT] resonanzFaktoren nach Berechnung:', JSON.stringify(resonanzNachBerechnung));
                }

                window.updateComparisonView();
                // GFK automatisch aus Archetypen-Matching ableiten
                window.updateGfkFromArchetypes();
            });
        }

        // Partner select
        const partnerSelect = document.getElementById('partnerSelect');
        if (partnerSelect) {
            partnerSelect.addEventListener('change', (e) => {
                // Sync all archetype state (selectedPartner, mobilePartnerArchetype, TiageState)
                window.setPartnerArchetype(e.target.value);
                window.updateArchetypeGrid('partner', e.target.value);

                // ═══════════════════════════════════════════════════════════════
                // SSOT: Berechne flatNeeds + Resonanzfaktoren bei Archetyp-Wechsel
                // ProfileCalculator.loadProfile() schreibt direkt in TiageState
                // ═══════════════════════════════════════════════════════════════
                if (typeof ProfileCalculator !== 'undefined' && typeof TiageState !== 'undefined') {
                    const profileData = {
                        archetyp: e.target.value,
                        geschlecht: TiageState.get('window.personDimensions.partner.geschlecht'),
                        dominanz: TiageState.get('window.personDimensions.partner.dominanz'),
                        orientierung: TiageState.get('window.personDimensions.partner.orientierung')
                    };
                    ProfileCalculator.loadProfile('partner', profileData);
                    console.log('[SSOT] Profil für PARTNER neu berechnet:', e.target.value);
                }

                window.updateComparisonView();
                // GFK automatisch aus Archetypen-Matching ableiten
                window.updateGfkFromArchetypes();
            });
        }

        // ICH compact dimensions
        document.querySelectorAll('input[name="ich-geschlecht-new"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                e.target.closest('.compact-dimension').classList.remove('needs-selection');
                // Use handleGeschlechtClick to maintain consistent object format
                window.handleGeschlechtClick('ich', e.target.value, e.target);
            });
        });
        document.querySelectorAll('input[name="ich-dominanz-new"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                e.target.closest('.compact-dimension').classList.remove('needs-selection');
                window.handleDominanzClick('ich', e.target.value);
            });
        });
        document.querySelectorAll('input[name="ich-dominanz-status-new"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                window.personDimensions.ich.dominanzStatus = e.target.value;
                e.target.closest('.compact-dimension').classList.remove('needs-selection');
                window.updateAnalysisOverview();
                window.updateComparisonView();
            });
        });

        // Partner compact dimensions
        document.querySelectorAll('input[name="partner-geschlecht-new"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                e.target.closest('.compact-dimension').classList.remove('needs-selection');
                // Use handleGeschlechtClick to maintain consistent object format
                window.handleGeschlechtClick('partner', e.target.value, e.target);
            });
        });
        document.querySelectorAll('input[name="partner-dominanz-new"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                e.target.closest('.compact-dimension').classList.remove('needs-selection');
                window.handleDominanzClick('partner', e.target.value);
            });
        });
        document.querySelectorAll('input[name="partner-dominanz-status-new"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                window.personDimensions.partner.dominanzStatus = e.target.value;
                e.target.closest('.compact-dimension').classList.remove('needs-selection');
                window.updateAnalysisOverview();
                window.updateComparisonView();
            });
        });

        // Initial Score-Circle Update beim Start
        window.updateComparisonView();
    }


    // ── Export ──────────────────────────────────────────────────────────────
    window.initComparisonLayout = initComparisonLayout;

})();
