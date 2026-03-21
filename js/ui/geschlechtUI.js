/**
 * geschlechtUI.js — Geschlecht (Gender) UI System
 * Extracted from app-main.js v1.8.1025
 *
 * Contains: Geschlecht/Orientierung/Dominanz info modals, click handlers,
 * sync functions, grid rendering, and summary generation.
 *
 * Dependencies (via window.*):
 *   window.personDimensions, window.mobilePersonDimensions
 *   geschlechtExtrasCache
 *   window.getIchArchetype(), window.getPartnerArchetype()
 *   window.updateComparisonView, window.saveSelectionToStorage
 *   TiageState, ResonanzCard
 */
(function() {
    'use strict';

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
    const currentGeschlecht = window.personDimensions[person].geschlecht;

    if (value === currentGeschlecht) {
        // Click on same: Deselect
        window.personDimensions[person].geschlecht = null;
        TiageToast.info(TiageI18n.t('geschlecht.' + value, value) + ' deselektiert');
    } else {
        // Click on different: Set new value
        window.personDimensions[person].geschlecht = value;
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
        const personArchetyp = person === 'ich' ? window.getIchArchetype() : window.getPartnerArchetype();
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
            dominanz: window.personDimensions[person]?.dominanz || null,
            orientierung: window.personDimensions[person]?.orientierung || null,
            geschlecht: window.personDimensions[person]?.geschlecht || null
        };

        if (resonanzProfileContext.needs && Object.keys(resonanzProfileContext.needs).length > 0) {
            ResonanzCard.loadCalculatedValues(resonanzProfileContext, person);
        }
    }

    window.updateComparisonView();

    if (typeof window.saveSelectionToStorage === 'function') {
        window.saveSelectionToStorage();
    }
}

/**
 * Handle click on S (Identität) geschlecht button
 * S = Secondary = Identität (kontextabhängig von P)
 */
function handleGeschlechtSClick(person, value, btn) {
    // console.log('[TIAGE] handleGeschlechtSClick:', person, value);

    // Ensure geschlecht has correct structure
    if (!window.personDimensions[person].geschlecht) {
        window.personDimensions[person].geschlecht = { primary: null, secondary: null };
    }

    const currentSecondary = window.personDimensions[person].geschlecht.secondary;

    if (value === currentSecondary) {
        // Click on same S: Deselect S
        window.personDimensions[person].geschlecht.secondary = null;
    } else {
        // Click on different S: Set new S
        window.personDimensions[person].geschlecht.secondary = value;
    }

    // Sync and save
    syncGeschlechtState(person);
    syncGeschlechtUI(person);

    // ═══════════════════════════════════════════════════════════════════════════
    // FIX: Resonanzfaktoren bei Geschlecht-Wechsel neu berechnen
    // R4 (Identität) hängt vom Geschlecht ab und muss aktualisiert werden
    // ═══════════════════════════════════════════════════════════════════════════
    if (typeof ResonanzCard !== 'undefined' && typeof ResonanzCard.loadCalculatedValues === 'function') {
        const personArchetyp = person === 'ich' ? window.getIchArchetype() : window.getPartnerArchetype();
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
            dominanz: window.personDimensions[person]?.dominanz || null,
            orientierung: window.personDimensions[person]?.orientierung || null,
            geschlecht: window.personDimensions[person]?.geschlecht || null
        };

        if (resonanzProfileContext.needs && Object.keys(resonanzProfileContext.needs).length > 0) {
            ResonanzCard.loadCalculatedValues(resonanzProfileContext, person);
        }
    }

    window.updateComparisonView();

    if (typeof window.saveSelectionToStorage === 'function') {
        window.saveSelectionToStorage();
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
// Expose on window so other modules (persistenceManager, etc.) can access it
window.geschlechtExtrasCache = geschlechtExtrasCache;

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
    window.updateComparisonView();

    // Also save selection (includes geschlecht_extras in selection.ich/partner)
    if (typeof window.saveSelectionToStorage === 'function') {
        window.saveSelectionToStorage();
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
    const primary = window.personDimensions[person].geschlecht?.primary;

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
        const currentSecondary = window.personDimensions[person].geschlecht?.secondary;
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
    const geschlecht = window.personDimensions[person].geschlecht;

    // Sync with window.mobilePersonDimensions (für Legacy-Kompatibilität)
    if (typeof window.mobilePersonDimensions !== 'undefined') {
        window.mobilePersonDimensions[person].geschlecht = geschlecht;
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
    const geschlecht = window.personDimensions[person].geschlecht;
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
    const geschlecht = window.personDimensions[person].geschlecht;

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
 * Syncs window.personDimensions with the new value and updates UI
 * @param {string} person - 'ich' or 'partner'
 * @param {string} secondaryValue - New secondary value ('mann', 'frau', 'nonbinaer', 'fluid', 'suchend')
 */
function setSecondaryGeschlechtAndSync(person, secondaryValue) {
    if (!window.personDimensions[person].geschlecht) {
        window.personDimensions[person].geschlecht = { primary: null, secondary: null };
    }
    window.personDimensions[person].geschlecht.secondary = secondaryValue;

    // Sync to TiageState
    if (typeof TiageState !== 'undefined') {
        TiageState.set(`personDimensions.${person}.geschlecht.secondary`, secondaryValue);
    }

    // Update UI
    syncGeschlechtUI(person);

    console.log('[Geschlecht] Secondary updated and synced:', person, '→', secondaryValue);
}

/**
 * Get summary text for geschlecht selection
 */
function getGeschlechtSummary(person) {
    // v4.0: geschlecht is a simple string, not an object with .primary/.secondary
    const geschlecht = window.personDimensions[person].geschlecht;
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
    const geschlecht = window.personDimensions[person].geschlecht;
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
    const geschlecht = window.personDimensions[person].geschlecht;
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
    const geschlecht = window.personDimensions[person].geschlecht;
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
        const geschlechtObj = window.personDimensions[person].geschlecht;
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


    // ── Exports ─────────────────────────────────────────────────────────────
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
    window.handleGeschlechtPClick = handleGeschlechtPClick;
    window.handleGeschlechtSClick = handleGeschlechtSClick;
    window.handleGeschlechtExtrasClick = handleGeschlechtExtrasClick;
    window.syncGeschlechtExtrasUI = syncGeschlechtExtrasUI;
    window.updateGeschlechtSGrid = updateGeschlechtSGrid;
    window.syncGeschlechtState = syncGeschlechtState;
    window.updateGeschlechtNeedsSelection = updateGeschlechtNeedsSelection;
    window.handleGeschlechtClick = handleGeschlechtClick;
    window.handleGeschlechtPrimaryClick = handleGeschlechtPrimaryClick;
    window.handleGeschlechtSecondaryClick = handleGeschlechtSecondaryClick;
    window.syncGeschlechtUI = syncGeschlechtUI;
    window.setSecondaryGeschlechtAndSync = setSecondaryGeschlechtAndSync;
    window.getGeschlechtSummary = getGeschlechtSummary;
    window.getGeschlechtGridSummary = getGeschlechtGridSummary;
    window.updateGeschlechtSummary = updateGeschlechtSummary;
    window.hasGeschlechtSelected = hasGeschlechtSelected;
    window.handleGeschlechtHover = handleGeschlechtHover;

})();
