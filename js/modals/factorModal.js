/**
 * factorModal.js — Factor Detail Modal (Archetyp, Dominanz, Orientierung, Geschlecht)
 * Extracted from app-main.js v1.8.1023
 *
 * Dependencies (via window.*):
 *   window.getIchArchetype()      – current ICH archetype
 *   window.getPartnerArchetype()  – current PARTNER archetype
 *   window.setIchArchetype(v)     – set ICH archetype (syncs all state)
 *   window.setPartnerArchetype(v) – set PARTNER archetype (syncs all state)
 *   window.archetypeOrder         – ordered list of archetypes
 *   window.archetypeDescriptions  – archetype descriptions map
 *   window.personDimensions       – desktop dimensions proxy (TiageState)
 *   window.mobilePersonDimensions – mobile dimensions proxy (TiageState)
 *   window.currentMobilePage      – current mobile page number
 *   window.factorExplanations     – factor explanations data
 *   window.updateComparisonView   – full desktop recalculation
 *   window.updateMobileResultPage – mobile result page update
 *   window.updateMobileProContraPage – mobile pro/contra update
 *   window.syncDominanzUI         – sync dominanz UI
 *   window.syncOrientierungUI     – sync orientierung UI
 */
(function() {
    'use strict';

    // Local helper aliases
    function getIchArchetype() {
        return window.getIchArchetype ? window.getIchArchetype() : null;
    }
    function getPartnerArchetype() {
        return window.getPartnerArchetype ? window.getPartnerArchetype() : null;
    }

    // ── Module-level state ──────────────────────────────────────────────────
    let currentFactorType = null;
    let currentFactorSource = 'mobile';

    // ── openFactorModal ─────────────────────────────────────────────────────
    function openFactorModal(factorType, source) {
        if (source === undefined) source = 'mobile';
        const factor = window.factorExplanations[factorType];
        if (!factor) return;

        // Store current factor type and source for navigation
        currentFactorType = factorType;
        currentFactorSource = source;

        const ich = getIchArchetype();
        const partner = getPartnerArchetype();

        // Use correct dimensions based on source
        const dimensions = source === 'desktop' ? window.personDimensions : window.mobilePersonDimensions;

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
        history.pushState({ mobilePage: window.currentMobilePage, modal: 'factor' }, '', `#seite${window.currentMobilePage}-factor`);
    }

    // ── closeFactorModal ────────────────────────────────────────────────────
    function closeFactorModal(event, skipHistoryBack) {
        if (skipHistoryBack === undefined) skipHistoryBack = false;
        if (event && event.target !== event.currentTarget) return;
        document.getElementById('factorModal').classList.remove('active');
        // Go back in history if not triggered by back button
        if (!skipHistoryBack && history.state && history.state.modal === 'factor') {
            history.back();
        }
    }

    // ── navigateFactorArchetype ─────────────────────────────────────────────
    function navigateFactorArchetype(person, direction) {
        // Get current archetype for the person
        let currentArch;
        if (person === 'ich') {
            currentArch = getIchArchetype();
        } else {
            currentArch = getPartnerArchetype();
        }

        // Find current index and calculate new index
        let currentIdx = window.archetypeOrder.indexOf(currentArch);
        if (currentIdx === -1) currentIdx = 0;

        let newIndex = currentIdx + direction;
        if (newIndex < 0) newIndex = window.archetypeOrder.length - 1;
        if (newIndex >= window.archetypeOrder.length) newIndex = 0;

        const newArchetype = window.archetypeOrder[newIndex];

        // Update the actual selections and sync both mobile and desktop
        if (person === 'ich') {
            window.setIchArchetype(newArchetype); // syncs mobileIchArchetype + currentArchetype + TiageState
            // Update mobile and desktop select elements
            const mobileSelect = document.getElementById('mobileIchSelect');
            const desktopSelect = document.getElementById('ichSelect');
            if (mobileSelect) mobileSelect.value = newArchetype;
            if (desktopSelect) desktopSelect.value = newArchetype;
        } else {
            window.setPartnerArchetype(newArchetype); // syncs mobilePartnerArchetype + selectedPartner + TiageState
            // Update mobile and desktop select elements
            const mobileSelect = document.getElementById('mobilePartnerSelect');
            const desktopSelect = document.getElementById('partnerSelect');
            if (mobileSelect) mobileSelect.value = newArchetype;
            if (desktopSelect) desktopSelect.value = newArchetype;
        }

        // Update the display in the modal
        updateFactorModalArchetypeDisplay();

        // Preserve selection state: sync Dominanz and Orientierung UI with stored state
        if (typeof window.syncDominanzUI === 'function') window.syncDominanzUI('ich');
        if (typeof window.syncDominanzUI === 'function') window.syncDominanzUI('partner');
        if (typeof window.syncOrientierungUI === 'function') window.syncOrientierungUI('ich');
        if (typeof window.syncOrientierungUI === 'function') window.syncOrientierungUI('partner');

        // Trigger full recalculation for both mobile and desktop views
        if (typeof window.updateComparisonView === 'function') {
            window.updateComparisonView();
        }
        if (typeof window.updateMobileResultPage === 'function') {
            window.updateMobileResultPage();
        }
        if (typeof window.updateMobileProContraPage === 'function') {
            window.updateMobileProContraPage();
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

            const factor = window.factorExplanations[currentFactorType];
            if (factor) {
                const ich = getIchArchetype();
                const partner = getPartnerArchetype();
                const dimensions = currentFactorSource === 'desktop' ? window.personDimensions : window.mobilePersonDimensions;

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

    // ── updateFactorModalArchetypeDisplay ───────────────────────────────────
    function updateFactorModalArchetypeDisplay() {
        const ichCodeEl = document.getElementById('factorModalIchCode');
        const partnerCodeEl = document.getElementById('factorModalPartnerCode');

        if (ichCodeEl) {
            const ichDef = window.archetypeDescriptions[getIchArchetype()];
            ichCodeEl.textContent = ichDef ? ichDef.name : getIchArchetype();
        }
        if (partnerCodeEl) {
            const partnerDef = window.archetypeDescriptions[getPartnerArchetype()];
            partnerCodeEl.textContent = partnerDef ? partnerDef.name : getPartnerArchetype();
        }

        // Update combo code if visible
        const comboCodeEl = document.getElementById('factorModalComboCode');
        if (comboCodeEl && comboCodeEl.style.display !== 'none') {
            comboCodeEl.textContent = `Code: ${getIchArchetype()}_${getPartnerArchetype()}`;
        }
    }

    // ── Exports ─────────────────────────────────────────────────────────────
    window.openFactorModal = openFactorModal;
    window.closeFactorModal = closeFactorModal;
    window.navigateFactorArchetype = navigateFactorArchetype;
    window.updateFactorModalArchetypeDisplay = updateFactorModalArchetypeDisplay;

})();
