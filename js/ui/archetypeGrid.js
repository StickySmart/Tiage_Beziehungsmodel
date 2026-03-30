/**
 * archetypeGrid.js — Archetype grid selection, navigation, and grid highlighting
 * Extracted from app-main.js v1.8.1033
 *
 * Dependencies (via window.*):
 *   window.setIchArchetype(v), window.setPartnerArchetype(v)
 *   window.getIchArchetype(), window.getPartnerArchetype()
 *   window.tiageData, window.updateComparisonView, window.updateGfkFromArchetypes
 *   window.updateMobileResultPage (mobileUI.js)
 *   ProfileCalculator, TiageState, TiageToast
 */
(function() {
    'use strict';

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

        // Update all archetype state via SSOT setters
        const newValue = activeSelect.options[newIndex].value;
        if (person === 'ich') {
            window.setIchArchetype(newValue);
        } else {
            window.setPartnerArchetype(newValue);
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
            const currentPartnerArchetype = window.getPartnerArchetype();
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

        // Update all archetype state via SSOT setters
        if (person === 'ich') {
            window.setIchArchetype(effectiveArchetype || 'duo'); // ICH muss immer gesetzt sein
        } else {
            window.setPartnerArchetype(effectiveArchetype); // Partner kann null sein
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
        if (typeof window.updateComparisonView === 'function') {
            window.updateComparisonView();
        }

        // Update GFK from archetypes
        if (typeof window.updateGfkFromArchetypes === 'function') {
            window.updateGfkFromArchetypes()
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


    // Navigation auf Seite 2 (Ergebnis) - ruft navigateArchetype auf und aktualisiert Seite 2
    function navigateArchetypeOnPage2(person, direction) {
        navigateArchetype(person, direction);
        // Seite 2 explizit aktualisieren
        window.updateMobileResultPage();
    }

    // Navigation auf Seite 3 (Kategorien) - ruft navigateArchetype auf und aktualisiert Seite 3
    function navigateArchetypeOnPage3(person, direction) {
        navigateArchetype(person, direction);
        // Seite 3 explizit aktualisieren
        updateMobilePage3();
    }

    // Aktualisiert die Anzeige auf Mobile Seite 3
    function updateMobilePage3() {
        const ichArch = window.tiageData.archetypes[window.getIchArchetype()];
        const partnerArch = window.tiageData.archetypes[window.getPartnerArchetype()];

        const ichEl = document.getElementById('mobileResultIch3');
        const partnerEl = document.getElementById('mobileResultPartner3');

        if (ichEl) ichEl.textContent = ichArch?.name || window.getIchArchetype();
        if (partnerEl) partnerEl.textContent = partnerArch?.name || window.getPartnerArchetype();
    }


    // ── Exports ─────────────────────────────────────────────────────────────
    window.navigateArchetype = navigateArchetype;
    window.selectArchetypeFromGrid = selectArchetypeFromGrid;
    window.updateArchetypeGrid = updateArchetypeGrid;
    window.navigateArchetypeOnPage2 = navigateArchetypeOnPage2;
    window.navigateArchetypeOnPage3 = navigateArchetypeOnPage3;

})();
