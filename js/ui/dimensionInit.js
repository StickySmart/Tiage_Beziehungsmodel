// js/ui/dimensionInit.js
// Extracted from app-main.js
// Functions: initDimensionButtons, initGeschlechtHoverEvents, handleDominanzClick, initDimensionListeners

/* global TiageI18n, TiageState, TiageToast, ResonanzCard, GfkBeduerfnisse */

function initDimensionButtons() {
    // console.log('[TIAGE DEBUG] initDimensionButtons called');

    // v4.0: Geschlecht als einfacher String (kein Primary/Secondary mehr)
    const geschlechtPOptions = [
        { value: 'mann', label: TiageI18n.t('geschlecht.primary.mann', 'Mann') },
        { value: 'frau', label: TiageI18n.t('geschlecht.primary.frau', 'Frau') },
        { value: 'nonbinaer', label: TiageI18n.t('geschlecht.primary.nonbinaer', 'Nonbinär') }
    ];

    // LEGACY: S-Optionen bleiben für eventuelle Rückwärtskompatibilität
    // Für P = Mann/Frau: Cis, Trans, Nonbinär (3 options - matches profile-config.js)
    const geschlechtSOptionsMannFrau = [
        { value: 'cis', label: TiageI18n.t('geschlecht.secondary.cis', 'Cis') },
        { value: 'trans', label: TiageI18n.t('geschlecht.secondary.trans', 'Trans') },
        { value: 'nonbinaer', label: TiageI18n.t('geschlecht.secondary.nonbinaer', 'Nonbinär') }
    ];
    // Für P = Inter: Nonbinär, Fluid (2 options)
    const geschlechtSOptionsInter = [
        { value: 'nonbinaer', label: TiageI18n.t('geschlecht.secondary.nonbinaer', 'Nonbinär') },
        { value: 'fluid', label: TiageI18n.t('geschlecht.secondary.fluid', 'Fluid') }
    ];

    // Dominanz Optionen
    const dominanzOptions = [
        { value: 'dominant', label: 'dominant' },
        { value: 'submissiv', label: 'submissiv' },
        { value: 'switch', label: 'switch' },
        { value: 'ausgeglichen', label: 'ausgeglichen' }
    ];

    // v5.0 SSOT: Orientierung als Multi-Select Array (5 Optionen)
    // Konsistent mit TiageSynthesis.Constants.ORIENTIERUNG_OPTIONS.ALL
    const orientierungOptions = [
        { value: 'heterosexuell', label: 'Hetero' },
        { value: 'homosexuell', label: 'Homo' },
        { value: 'bisexuell', label: 'Bi' },
        { value: 'pansexuell', label: 'Pan' },
        { value: 'queer', label: 'Queer' }
    ];

    // GFK Optionen (Gewaltfreie Kommunikation / NVC)
    const gfkOptions = [
        { value: 'niedrig', label: TiageI18n.t('dimensions.gfkLevels.niedrig', 'niedrig') },
        { value: 'mittel', label: TiageI18n.t('dimensions.gfkLevels.mittel', 'mittel') },
        { value: 'hoch', label: TiageI18n.t('dimensions.gfkLevels.hoch', 'hoch') }
    ];

    // Geschlecht Extras Optionen (Fit / Fucked up / Horny / Fresh) - Multi-Select
    const geschlechtExtrasOptions = [
        { value: 'fit', label: 'Fit 💪', stateKey: 'geschlecht_fit', descKey: 'ffh.fitDesc', desc: TiageI18n.t('ffh.fitDesc', 'Sport und körperliche Fitness sind dir wichtig.') },
        { value: 'fuckedup', label: 'Fucked up 🔥', stateKey: 'geschlecht_fuckedup', descKey: 'ffh.fuckedupDesc', desc: TiageI18n.t('ffh.fuckedupDesc', 'Du hast einen unkonventionellen oder intensiven Lebensstil.') },
        { value: 'horny', label: 'Horny 😈', stateKey: 'geschlecht_horny', descKey: 'ffh.hornyDesc', desc: TiageI18n.t('ffh.hornyDesc', 'Sexualität spielt eine wichtige Rolle in deinem Leben.') },
        { value: 'fresh', label: 'Fresh 🌱', stateKey: 'geschlecht_fresh', descKey: 'ffh.freshDesc', desc: TiageI18n.t('ffh.freshDesc', 'Frisch, unverbraucht, ausgeruht — neue Energie ohne Ballast.') }
    ];

    // Geschlecht P-Grids befüllen (Körper: Mann, Frau, Inter)
    // Use both class selector and explicit IDs as fallback (including mobile)
    const pGridSelectors = ['.geschlecht-p-grid', '#ich-geschlecht-p-grid', '#partner-geschlecht-p-grid', '#mobile-ich-geschlecht-p-grid', '#mobile-partner-geschlecht-p-grid'];
    const processedPGrids = new Set();
    pGridSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(grid => {
            if (processedPGrids.has(grid.id)) return;
            processedPGrids.add(grid.id);
            const person = grid.dataset.person;
            // console.log('[TIAGE DEBUG] Processing p-grid for person:', person, 'id:', grid.id);
            if (!person) return;
            grid.innerHTML = geschlechtPOptions.map(opt =>
                `<button type="button" class="geschlecht-btn geschlecht-p-btn" data-value="${opt.value}" onclick="handleGeschlechtPClick('${person}', '${opt.value}', this)">${opt.label}</button>`
            ).join('');
        });
    });
    // console.log('[TIAGE DEBUG] Processed geschlecht-p-grids:', processedPGrids.size);

    // Mobile und Modal Geschlecht-Grids befüllen (kombiniertes P/S Grid)
    const mobileModalGrids = document.querySelectorAll('#mobile-ich-geschlecht-grid, #mobile-partner-geschlecht-grid, #modal-ich-geschlecht-grid, #modal-partner-geschlecht-grid');
    // console.log('[TIAGE DEBUG] Found mobile/modal geschlecht-grids:', mobileModalGrids.length);
    mobileModalGrids.forEach(grid => {
        const person = grid.dataset.person;
        if (!person) return;
        // Mobile/Modal uses combined P options with handleGeschlechtClick
        grid.innerHTML = geschlechtPOptions.map(opt =>
            `<button type="button" class="geschlecht-btn" data-value="${opt.value}" onclick="handleGeschlechtClick('${person}', '${opt.value}', this)">${opt.label}</button>`
        ).join('');
    });

    // Geschlecht S-Grids werden dynamisch in handleGeschlechtPClick befüllt
    // (kontextabhängig von P-Auswahl)

    // Geschlecht Extras-Grids befüllen (Fit / Fucked up - Multi-Select)
    const extrasGridSelectors = ['.geschlecht-extras-grid', '#ich-geschlecht-extras-grid', '#partner-geschlecht-extras-grid', '#mobile-ich-geschlecht-extras-grid', '#mobile-partner-geschlecht-extras-grid'];
    const processedExtrasGrids = new Set();
    extrasGridSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(grid => {
            if (processedExtrasGrids.has(grid.id)) return;
            processedExtrasGrids.add(grid.id);
            const person = grid.dataset.person;
            // console.log('[TIAGE DEBUG] Processing extras-grid for person:', person, 'id:', grid.id);
            if (!person) {
                console.warn('[TIAGE DEBUG] No person attribute for extras-grid:', grid.id);
                return;
            }
            const buttonsHTML = geschlechtExtrasOptions.map(opt =>
                `<button type="button" class="geschlecht-btn geschlecht-extras-btn" data-value="${opt.value}" data-state-key="${opt.stateKey}" data-person="${person}" title="${opt.desc}" data-i18n-title="${opt.descKey}">${opt.label}</button>`
            ).join('');
            grid.innerHTML = buttonsHTML;
            // console.log('[TIAGE DEBUG] Generated extras buttons HTML for', person, ':', buttonsHTML.substring(0, 100) + '...');

            // Add click handlers via addEventListener (more reliable than inline onclick)
            grid.querySelectorAll('.geschlecht-extras-btn').forEach(btn => {
                btn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    const btnPerson = this.dataset.person;
                    const btnValue = this.dataset.value;
                    const btnStateKey = this.dataset.stateKey;
                    // console.log('[TIAGE] Button clicked:', btnPerson, btnValue, btnStateKey);
                    window.handleGeschlechtExtrasClick(btnPerson, btnValue, btnStateKey, this);
                });
            });
        });
    });
    // console.log('[TIAGE DEBUG] Processed geschlecht-extras-grids:', processedExtrasGrids.size);

    // Dominanz-Grids befüllen (nur Desktop mit data-person)
    // Use both class selector and explicit IDs as fallback
    const dGridSelectors = ['.dominanz-grid[data-person]', '#ich-dominanz-grid', '#partner-dominanz-grid'];
    const processedDGrids = new Set();
    dGridSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(grid => {
            if (processedDGrids.has(grid.id)) return;
            processedDGrids.add(grid.id);
            const person = grid.dataset.person;
            // console.log('[TIAGE DEBUG] Processing dominanz-grid for person:', person, 'id:', grid.id);
            if (!person) return;
            grid.innerHTML = dominanzOptions.map(opt =>
                `<button type="button" class="dominanz-btn" data-value="${opt.value}" onclick="handleDominanzClick('${person}', '${opt.value}', this)">${opt.label}</button>`
            ).join('');
        });
    });
    // console.log('[TIAGE DEBUG] Processed dominanz-grids:', processedDGrids.size);

    // Orientierung-Grids befüllen (nur Desktop mit data-person)
    // Use both class selector and explicit IDs as fallback
    const oGridSelectors = ['.orientierung-grid[data-person]', '#ich-orientierung-grid', '#partner-orientierung-grid'];
    const processedOGrids = new Set();
    oGridSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(grid => {
            if (processedOGrids.has(grid.id)) return;
            processedOGrids.add(grid.id);
            const person = grid.dataset.person;
            // console.log('[TIAGE DEBUG] Processing orientierung-grid for person:', person, 'id:', grid.id);
            if (!person) return;
            grid.innerHTML = orientierungOptions.map(opt =>
                `<button type="button" class="orientierung-btn" data-value="${opt.value}" onclick="handleOrientierungClick('${person}', '${opt.value}', this)">${opt.label}</button>`
            ).join('');
        });
    });
    // console.log('[TIAGE DEBUG] Processed orientierung-grids:', processedOGrids.size);

    // GFK-Grids befüllen
    // Use both class selector and explicit IDs as fallback
    const gfkGridSelectors = ['.gfk-grid[data-person]', '#ich-gfk-grid', '#partner-gfk-grid', '#mobile-ich-gfk-grid', '#mobile-partner-gfk-grid'];
    const processedGfkGrids = new Set();
    gfkGridSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(grid => {
            if (processedGfkGrids.has(grid.id)) return;
            processedGfkGrids.add(grid.id);
            const person = grid.dataset.person;
            // console.log('[TIAGE DEBUG] Processing gfk-grid for person:', person, 'id:', grid.id);
            if (!person) return;
            grid.innerHTML = gfkOptions.map(opt =>
                `<button type="button" class="gfk-btn" data-value="${opt.value}" onclick="handleGfkClick('${person}', '${opt.value}', this)">${opt.label}</button>`
            ).join('');
        });
    });
    // console.log('[TIAGE DEBUG] Processed gfk-grids:', processedGfkGrids.size);

    // UI mit gespeichertem State synchronisieren
    ['ich', 'partner'].forEach(person => {
        window.syncGeschlechtUI(person);
        window.syncGeschlechtExtrasUI(person);
        window.syncDominanzUI(person);
        window.syncOrientierungUI(person);
        window.syncGfkUI(person);
    });

    // console.log('[TIAGE DEBUG] initDimensionButtons completed');
}

/**
 * Initialize geschlecht hover events for all grids
 */
function initGeschlechtHoverEvents() {
    document.querySelectorAll('.geschlecht-grid').forEach(grid => {
        const person = grid.dataset.person;
        if (!person) return;

        grid.querySelectorAll('.geschlecht-btn').forEach(btn => {
            const value = btn.dataset.value;

            btn.addEventListener('mouseenter', () => {
                window.handleGeschlechtHover(person, value, true);
            });

            btn.addEventListener('mouseleave', () => {
                window.handleGeschlechtHover(person, value, false);
            });
        });
    });
}

// ═══════════════════════════════════════════════════════════════════════
// DOMINANZ PRIMARY/SECONDARY SYSTEM (same logic as Geschlechtsidentität)
// ═══════════════════════════════════════════════════════════════════════

/**
 * Handle click on a Dominanz button
 * Logic (same as Geschlechtsidentität):
 * - First click = Primary (I indicator)
 * - Second click on different = Secondary (G indicator)
 * - Click on Primary = Clear both (primary and secondary)
 * - Click on Secondary = Clear only secondary
 */
function handleDominanzClick(person, dominanzValue, btn) {
    // console.log('[TIAGE] handleDominanzClick:', person, dominanzValue);

    // Ensure dominanz has correct structure (migration from old format)
    if (!window.personDimensions[person].dominanz ||
        !('primary' in window.personDimensions[person].dominanz)) {
        window.personDimensions[person].dominanz = { primary: null, secondary: null };
    }

    const currentPrimary = window.personDimensions[person].dominanz.primary;
    const currentSecondary = window.personDimensions[person].dominanz.secondary;

    if (dominanzValue === currentPrimary) {
        // Click on Primary: Clear both
        window.personDimensions[person].dominanz.primary = null;
        window.personDimensions[person].dominanz.secondary = null;
        TiageToast.info('Dominanz deselektiert');
    } else if (dominanzValue === currentSecondary) {
        // Click on Secondary: Clear only secondary
        window.personDimensions[person].dominanz.secondary = null;
        TiageToast.info(dominanzValue + ' (sekundär) entfernt');
    } else if (!currentPrimary) {
        // No primary yet: Set as primary (handles both null and undefined)
        window.personDimensions[person].dominanz.primary = dominanzValue;
        TiageToast.info(dominanzValue + ' als Primär-Dominanz gesetzt');
    } else {
        // Primary exists, different value clicked: Set as secondary
        window.personDimensions[person].dominanz.secondary = dominanzValue;
        TiageToast.info(dominanzValue + ' als Sekundär-Dominanz gesetzt');
    }

    // Sync with window.mobilePersonDimensions for mobile view consistency
    if (typeof window.mobilePersonDimensions !== 'undefined' && window.mobilePersonDimensions[person]) {
        if (!window.mobilePersonDimensions[person].dominanz) {
            window.mobilePersonDimensions[person].dominanz = { primary: null, secondary: null };
        }
        window.mobilePersonDimensions[person].dominanz.primary = window.personDimensions[person].dominanz.primary;
        window.mobilePersonDimensions[person].dominanz.secondary = window.personDimensions[person].dominanz.secondary;
    }

    // Sync with TiageState if available
    if (typeof TiageState !== 'undefined') {
        TiageState.set(`window.personDimensions.${person}.dominanz`, window.personDimensions[person].dominanz);
        TiageState.saveToStorage(); // Sofort speichern für Persistenz
    }

    // Sync all UIs
    window.syncDominanzUI(person);

    // Remove needs-selection if primary is set
    const hasPrimary = window.personDimensions[person].dominanz.primary !== null;
    document.querySelectorAll(`[data-dimension="${person}-dominanz-multi"], [data-dimension="mobile-${person}-dominanz"], [data-dimension="${person}-dominanz"]`).forEach(dim => {
        if (hasPrimary) {
            dim.classList.remove('needs-selection');
        } else {
            dim.classList.add('needs-selection');
        }
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // FIX: Resonanzfaktoren bei Dominanz-Wechsel neu berechnen
    // R3 (Dynamik) hängt von der Dominanz ab und muss aktualisiert werden
    // ═══════════════════════════════════════════════════════════════════════════
    if (typeof ResonanzCard !== 'undefined' && typeof ResonanzCard.loadCalculatedValues === 'function') {
        const personArchetyp = person === 'ich' ? window.getIchArchetype() : window.getPartnerArchetype();
        let needs = null;

        // Hole Needs aus LoadedArchetypProfile
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

        // Fallback: Standard-Werte des Archetyps
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
            const resonanzLoaded = ResonanzCard.loadCalculatedValues(resonanzProfileContext, person);
            if (resonanzLoaded) {
                // console.log('[TIAGE] Resonanzfaktoren nach Dominanz-Wechsel aktualisiert für', person);
            }
        }
    }

    window.updateComparisonView();

    if (typeof window.saveSelectionToStorage === 'function') {
        window.saveSelectionToStorage();
    }
}

function initDimensionListeners() {
    // ICH dimensions
    document.querySelectorAll('input[name="ich-geschlecht"]').forEach(radio => {
        radio.addEventListener('change', (e) => window.handleDimensionChange('ich', 'geschlecht', e.target.value, e.target));
    });
    document.querySelectorAll('input[name="ich-dominanz"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const dimensionGroup = e.target.closest('.dimension-group');
            if (dimensionGroup) dimensionGroup.classList.remove('needs-selection');
            handleDominanzClick('ich', e.target.value);
        });
    });
    document.querySelectorAll('input[name="ich-dominanz-status"]').forEach(radio => {
        radio.addEventListener('change', (e) => window.handleDimensionChange('ich', 'dominanzStatus', e.target.value, e.target));
    });

    // PARTNER dimensions
    document.querySelectorAll('input[name="partner-geschlecht"]').forEach(radio => {
        radio.addEventListener('change', (e) => window.handleDimensionChange('partner', 'geschlecht', e.target.value, e.target));
    });
    document.querySelectorAll('input[name="partner-dominanz"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            const dimensionGroup = e.target.closest('.dimension-group');
            if (dimensionGroup) dimensionGroup.classList.remove('needs-selection');
            handleDominanzClick('partner', e.target.value);
        });
    });
    document.querySelectorAll('input[name="partner-dominanz-status"]').forEach(radio => {
        radio.addEventListener('change', (e) => window.handleDimensionChange('partner', 'dominanzStatus', e.target.value, e.target));
    });
}

// ─── Exports ──────────────────────────────────────────────────────────────────
window.initDimensionButtons = initDimensionButtons;
window.initGeschlechtHoverEvents = initGeschlechtHoverEvents;
window.handleDominanzClick = handleDominanzClick;
window.initDimensionListeners = initDimensionListeners;
