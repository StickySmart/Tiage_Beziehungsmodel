/**
 * AGOD WEIGHTS MODULE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Verwaltet die AGOD-Gewichtung (A=Archetyp, G=Geschlecht, O=Orientierung, D=Dominanz)
 * für die Synthese-Score-Berechnung.
 *
 * 3-Wege-Gewichtung:
 *   0 = Egal (ignoriert)
 *   1 = Normal
 *   2 = Wichtig (doppelt)
 *
 * Speichert persistent in TiageState (überlebt Reload)
 *
 * @module TiageWeights.AGOD
 */

var TiageWeights = TiageWeights || {};

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // CONSTANTS
    // ═══════════════════════════════════════════════════════════════════════

    const AGOD_DEFAULT_WEIGHTS = { O: 1, A: 1, D: 1, G: 1 };

    // ═══════════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════════

    let agodWeights = { ...AGOD_DEFAULT_WEIGHTS };

    // ═══════════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Initialize AGOD weight toggles on page load
     * v4.4: Loads from gewichtungen.ich (persisted) as primary, paarung.gewichtungen as fallback
     */
    function init() {
        // Start with defaults
        agodWeights = { ...AGOD_DEFAULT_WEIGHTS };

        if (typeof TiageState !== 'undefined') {
            // Primary: Load from gewichtungen.ich (this IS persisted in saveToStorage)
            let stored = TiageState.get('gewichtungen.ich');
            let source = 'gewichtungen.ich';

            // Fallback: Load from paarung.gewichtungen (session only, not persisted)
            if (!stored || stored.O === undefined) {
                stored = TiageState.get('paarung.gewichtungen');
                source = 'paarung.gewichtungen (fallback)';
            }

            console.log('[AGOD] Loading from TiageState:', source, JSON.stringify(stored));

            if (stored) {
                // New format: { O: 1, A: 2, D: 0, G: 1 }
                if (typeof stored.O === 'number' && stored.O >= 0 && stored.O <= 2) {
                    agodWeights = {
                        O: stored.O ?? 1,
                        A: stored.A ?? 1,
                        D: stored.D ?? 1,
                        G: stored.G ?? 1
                    };
                    console.log('[AGOD] Loaded new format weights:', agodWeights);
                }
                // Legacy format: { O: { value: 25, locked: false }, ... }
                else if (stored.O && typeof stored.O === 'object' && 'value' in stored.O) {
                    // Migrate: 0-33 = 0, 34-66 = 1, 67-100 = 2
                    agodWeights = {
                        O: migrateOldWeight(stored.O.value),
                        A: migrateOldWeight(stored.A.value),
                        D: migrateOldWeight(stored.D.value),
                        G: migrateOldWeight(stored.G.value)
                    };
                    console.log('[AGOD] Migrated legacy weights:', agodWeights);
                    // Save migrated values
                    save();
                }
            }
        }

        // Update toggle UI
        updateUI();

        console.log('[AGOD] Weight toggles initialized:', agodWeights);
    }

    /**
     * Migrate old 0-100 weight to new 0/1/2 format
     * @param {number} oldValue - Old weight value (0-100)
     * @returns {number} - New weight (0, 1, or 2)
     */
    function migrateOldWeight(oldValue) {
        if (oldValue === undefined || oldValue === null) return 1;
        if (oldValue <= 10) return 0;  // Very low = Egal
        if (oldValue >= 40) return 2;  // High = Wichtig
        return 1;  // Normal
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SETTERS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Set AGOD weight (called by toggle buttons)
     * @param {string} factor - O, A, D, or G
     * @param {number} value - New weight value (0, 1, or 2)
     */
    function set(factor, value) {
        // Validate value (0, 1, or 2) - use isNaN check to allow 0
        const parsed = parseInt(value);
        const numValue = Math.max(0, Math.min(2, isNaN(parsed) ? 1 : parsed));

        // Update state
        agodWeights[factor] = numValue;

        // Update toggle UI
        updateUI();

        // Save to TiageState
        save();

        // Trigger synthesis recalculation
        if (typeof updateComparisonView === 'function') {
            updateComparisonView();
        }

        console.log('[AGOD] Weight set:', factor, '=', numValue);
    }

    /**
     * Reset all AGOD weights to default (all = 1)
     */
    function reset() {
        agodWeights = { ...AGOD_DEFAULT_WEIGHTS };
        updateUI();
        save();

        // Trigger synthesis recalculation
        if (typeof updateComparisonView === 'function') {
            updateComparisonView();
        }

        console.log('[AGOD] Weights reset to defaults:', agodWeights);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // GETTERS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Get current AGOD weights (raw 0/1/2 values)
     * @returns {object} { O, A, D, G } with values 0, 1, or 2
     */
    function get() {
        return { ...agodWeights };
    }

    /**
     * Get sum of all AGOD weights
     * @returns {number}
     */
    function getSum() {
        return agodWeights.O + agodWeights.A + agodWeights.D + agodWeights.G;
    }

    /**
     * Get weights from TiageState (SSOT - persistent)
     * @returns {object|null} { O, A, D, G }
     */
    function getFromSession() {
        try {
            if (typeof TiageState !== 'undefined') {
                const stored = TiageState.get('paarung.gewichtungen');
                if (stored && typeof stored.O === 'number') {
                    return {
                        O: stored.O,
                        A: stored.A,
                        D: stored.D,
                        G: stored.G
                    };
                }
            }
            return null;
        } catch (e) {
            console.warn('[AGOD] Could not read from TiageState:', e);
            return null;
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PERSISTENCE
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Save weights to TiageState (SSOT - persistent)
     * v4.4: gewichtungen.ich is the primary persisted path
     */
    function save() {
        try {
            if (typeof TiageState !== 'undefined') {
                // New simple format: { O: 1, A: 2, D: 0, G: 1 }
                const gewData = {
                    O: agodWeights.O,
                    A: agodWeights.A,
                    D: agodWeights.D,
                    G: agodWeights.G
                };

                // Primary: Save to gewichtungen.ich (this IS persisted in saveToStorage)
                TiageState.set('gewichtungen.ich', gewData);

                // Session backup: Save to paarung.gewichtungen (for backwards compat)
                TiageState.set('paarung.gewichtungen', gewData);

                TiageState.saveToStorage();
                console.log('[AGOD] Saved to TiageState (gewichtungen.ich):', gewData);
            }
        } catch (e) {
            console.warn('[AGOD] Could not save to TiageState:', e);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // UI UPDATES
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Update toggle button UI to reflect current weights
     */
    function updateUI() {
        ['O', 'A', 'D', 'G'].forEach(factor => {
            const currentValue = agodWeights[factor];

            // Update desktop toggles
            const desktopGroup = document.getElementById(`agodToggle${factor}`);
            if (desktopGroup) {
                desktopGroup.querySelectorAll('.agod-toggle-btn').forEach(btn => {
                    const btnValue = parseInt(btn.dataset.value);
                    btn.classList.toggle('active', btnValue === currentValue);
                });
            }

            // Update mobile toggles
            const mobileGroup = document.getElementById(`mobileToggle${factor}`);
            if (mobileGroup) {
                mobileGroup.querySelectorAll('.agod-toggle-btn').forEach(btn => {
                    const btnValue = parseInt(btn.dataset.value);
                    btn.classList.toggle('active', btnValue === currentValue);
                });
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // MODULE EXPORT
    // ═══════════════════════════════════════════════════════════════════════

    TiageWeights.AGOD = {
        // Constants
        DEFAULT_WEIGHTS: AGOD_DEFAULT_WEIGHTS,

        // Lifecycle
        init: init,

        // Setters
        set: set,
        reset: reset,

        // Getters
        get: get,
        getSum: getSum,
        getFromSession: getFromSession,

        // Persistence
        save: save,

        // UI
        updateUI: updateUI
    };

    // ═══════════════════════════════════════════════════════════════════════
    // BACKWARDS COMPATIBILITY - Global function aliases
    // ═══════════════════════════════════════════════════════════════════════

    if (typeof window !== 'undefined') {
        // Expose module
        window.TiageWeights = TiageWeights;

        // Legacy function names for existing onclick handlers
        window.initAgodWeightInputs = init;
        window.setAgodWeight = set;
        window.resetAgodWeights = reset;
        window.getAgodWeights = get;
        window.getAgodWeightSum = getSum;
        window.saveAgodWeights = save;
        window.getAgodWeightsFromSession = getFromSession;
        window.saveAgodWeightsToSession = save; // Legacy alias
        window.updateAgodToggleUI = updateUI;
    }

    // Node.js export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = TiageWeights.AGOD;
    }

})();
