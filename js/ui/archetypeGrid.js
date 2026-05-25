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

        let effectiveArchetype = archetype;

        // ═══════════════════════════════════════════════════════════════
        // ICH: Multi-Select (bis zu 4 Archetypen)
        // Toggle-Verhalten: Klick fügt hinzu oder entfernt
        // ═══════════════════════════════════════════════════════════════
        if (person === 'ich' && typeof TiageState !== 'undefined') {
            const currentSlots = TiageState.getIchSlots();

            if (currentSlots.includes(archetype)) {
                // Bereits aktiv → entfernen (außer letzter)
                if (currentSlots.length <= 1) {
                    TiageToast.info('Mindestens 1 Archetyp nötig');
                    return;
                }
                TiageState.removeIchSlot(archetype);
                effectiveArchetype = TiageState.getIchSlots()[0]; // Neuer Primary
                console.log('[selectArchetypeFromGrid] ICH-Slot entfernt:', archetype, '→ Slots:', TiageState.getIchSlots());
            } else {
                // Noch nicht aktiv → hinzufügen
                if (currentSlots.length >= 4) {
                    TiageToast.info('Maximum 4 Archetypen');
                    return;
                }
                TiageState.addIchSlot(archetype);
                effectiveArchetype = TiageState.getIchSlots()[0]; // Primary bleibt
                console.log('[selectArchetypeFromGrid] ICH-Slot hinzugefügt:', archetype, '→ Slots:', TiageState.getIchSlots());
            }
        }
        // Partner: Toggle (an/aus)
        else if (person === 'partner') {
            const currentPartnerArchetype = window.getPartnerArchetype();
            if (archetype === currentPartnerArchetype) {
                effectiveArchetype = null;
            }
        }

        const selectId = person === 'ich' ? 'ichSelect' : 'partnerSelect';
        const mobileSelectId = person === 'ich' ? 'mobileIchSelect' : 'mobilePartnerSelect';
        const select = document.getElementById(selectId);
        const mobileSelect = document.getElementById(mobileSelectId);

        // Dropdown zeigt immer Primary
        if (effectiveArchetype) {
            if (select) select.value = effectiveArchetype;
            if (mobileSelect) mobileSelect.value = effectiveArchetype;
        } else {
            if (select) select.selectedIndex = 0;
            if (mobileSelect) mobileSelect.selectedIndex = 0;
        }

        // SSOT setters (primary)
        if (person === 'ich') {
            window.setIchArchetype(effectiveArchetype || 'single');
        } else {
            window.setPartnerArchetype(effectiveArchetype);
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

        // Toast — for ICH multi-select show the clicked archetype, not just the primary
        const archetypeEmojis = { duo: '🤝', solo: '⚡', lat: '🌙', solopoly: '🌟', duo_flex: '🔄', aromantisch: '🧊' };
        const personLabel = person === 'ich' ? 'ICH' : 'PARTNER';
        if (effectiveArchetype || (person === 'ich' && archetype)) {
            const toastArch = (person === 'ich') ? archetype : effectiveArchetype;
            const emoji = archetypeEmojis[toastArch] || '';
            const displayName = (window.tiageData && window.tiageData.archetypes && window.tiageData.archetypes[toastArch])
                ? window.tiageData.archetypes[toastArch].name
                : toastArch.charAt(0).toUpperCase() + toastArch.slice(1).replace('_', '-');
            TiageToast.success(personLabel + ': ' + displayName + ' ' + emoji);
        } else {
            TiageToast.info(personLabel + ' deselektiert');
        }

        console.log('[selectArchetypeFromGrid] Abgeschlossen für:', person, 'archetype:', effectiveArchetype);
    }

    // Function to update archetype grid highlighting
    function updateArchetypeGrid(person, archetype) {
        const gridId = person === 'ich' ? 'ich-archetype-grid' : 'partner-archetype-grid';
        const mobileGridId = person === 'ich' ? 'mobile-ich-archetype-grid' : 'mobile-partner-archetype-grid';

        // Multi-Select Highlighting (ICH und PARTNER via TiageState.slots)
        const activeSlots = (typeof TiageState !== 'undefined')
            ? (person === 'ich' ? TiageState.getIchSlots() : TiageState.getPartnerSlots())
            : (archetype ? [archetype] : []);

        [gridId, mobileGridId].forEach(id => {
            const grid = document.getElementById(id);
            if (!grid) return;

            grid.querySelectorAll('.archetype-symbol-item').forEach(item => {
                const itemArch = item.dataset.archetype;
                const slotIdx = activeSlots.indexOf(itemArch);
                item.classList.toggle('active', slotIdx >= 0);

                // Slot-Nummer Badge
                let badge = item.querySelector('.slot-badge');
                if (slotIdx >= 0 && activeSlots.length > 1) {
                    if (!badge) {
                        badge = document.createElement('span');
                        badge.className = 'slot-badge';
                        badge.style.cssText = 'position:absolute;top:2px;left:2px;background:var(--primary);color:white;font-size:9px;font-weight:700;width:14px;height:14px;border-radius:50%;display:flex;align-items:center;justify-content:center;z-index:1;';
                        item.style.position = 'relative';
                        item.appendChild(badge);
                    }
                    badge.textContent = slotIdx + 1;
                } else if (badge) {
                    badge.remove();
                }
            });
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

        if (ichEl) {
            const _slots3 = (typeof TiageState !== 'undefined' && TiageState.getIchSlots) ? TiageState.getIchSlots() : null;
            ichEl.textContent = (_slots3 && _slots3.length > 1)
                ? _slots3.map(function(s) { return window.tiageData?.archetypes?.[s]?.name || s; }).join(' · ')
                : (ichArch?.name || window.getIchArchetype());
        }
        if (partnerEl) partnerEl.textContent = partnerArch?.name || window.getPartnerArchetype();
    }


    // Marks the best-matching archetype in the grid with a gold star + score badge.
    // Does NOT change the current selection — purely visual.
    function markBestMatchInGrid(person, archetype, score) {
        const gridIds = person === 'ich'
            ? ['ich-archetype-grid', 'mobile-ich-archetype-grid']
            : ['partner-archetype-grid', 'mobile-partner-archetype-grid'];

        gridIds.forEach(function(id) {
            const grid = document.getElementById(id);
            if (!grid) return;

            // Clear previous indicator
            grid.querySelectorAll('.archetype-symbol-item').forEach(function(item) {
                item.classList.remove('best-match-indicator');
                const old = item.querySelector('.best-match-score-badge');
                if (old) old.remove();
            });

            if (!archetype) return;

            const bestItem = grid.querySelector('.archetype-symbol-item[data-archetype="' + archetype + '"]');
            if (!bestItem) return;

            bestItem.classList.add('best-match-indicator');
            const badge = document.createElement('span');
            badge.className = 'best-match-score-badge';
            badge.textContent = score ? Math.round(score) + '%' : '★';
            bestItem.appendChild(badge);
        });
    }

    // ── Exports ─────────────────────────────────────────────────────────────
    window.navigateArchetype = navigateArchetype;
    window.selectArchetypeFromGrid = selectArchetypeFromGrid;
    window.updateArchetypeGrid = updateArchetypeGrid;
    window.markBestMatchInGrid = markBestMatchInGrid;
    window.navigateArchetypeOnPage2 = navigateArchetypeOnPage2;
    window.navigateArchetypeOnPage3 = navigateArchetypeOnPage3;

})();
