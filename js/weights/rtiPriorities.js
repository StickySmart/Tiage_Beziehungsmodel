/**
 * RTI PRIORITIES MODULE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Verwaltet die RTI-Säulen Prioritäten (5 Säulen nach Petzold)
 * S1: Leiblichkeit, S2: Soziales Netzwerk, S3: Autonomie, S4: Sicherheit, S5: Werte
 *
 * 3-Wege-Gewichtung:
 *   0 = Egal (ignoriert)
 *   1 = Normal
 *   2 = Wichtig (doppelt)
 *
 * Speichert persistent in TiageState (überlebt Reload)
 *
 * @module TiageWeights.RTI
 */

var TiageWeights = TiageWeights || {};

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // CONSTANTS
    // ═══════════════════════════════════════════════════════════════════════

    const RTI_DEFAULT_PRIORITIES = { S1: 1, S2: 1, S3: 1, S4: 1, S5: 1 };

    // ═══════════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════════

    let rtiPriorities = { ...RTI_DEFAULT_PRIORITIES };

    // ═══════════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Lädt gespeicherte RTI-Prioritäten aus TiageState in die Toggles
     */
    function load() {
        if (typeof TiageState === 'undefined') return;

        // Load from TiageState
        const stored = TiageState.get('rtiPriorities');
        if (stored && typeof stored.S1 === 'number') {
            rtiPriorities = {
                S1: stored.S1 ?? 1,
                S2: stored.S2 ?? 1,
                S3: stored.S3 ?? 1,
                S4: stored.S4 ?? 1,
                S5: stored.S5 ?? 1
            };
            console.log('[RTI] Loaded priorities from TiageState:', rtiPriorities);
        }

        // Update UI
        updateUI();
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SETTERS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Setzt eine RTI-Säulen Priorität (3-Wege-Toggle: 0=Egal, 1=Normal, 2=Wichtig)
     * @param {string} pillar - 'S1', 'S2', 'S3', 'S4', oder 'S5'
     * @param {number} value - 0, 1, oder 2
     */
    function set(pillar, value) {
        const parsed = parseInt(value);
        const numValue = Math.max(0, Math.min(2, isNaN(parsed) ? 1 : parsed));

        rtiPriorities[pillar] = numValue;
        updateUI();
        save();

        console.log('[RTI] Set priority:', pillar, '=', numValue);
    }

    /**
     * Reset all RTI priorities to default (all = 1)
     */
    function reset() {
        rtiPriorities = { ...RTI_DEFAULT_PRIORITIES };
        updateUI();
        save();
        console.log('[RTI] Priorities reset to defaults:', rtiPriorities);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // GETTERS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Get current RTI priorities
     * @returns {Object} { S1, S2, S3, S4, S5 } with values 0, 1, or 2
     */
    function get() {
        return { ...rtiPriorities };
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PERSISTENCE
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Speichert RTI-Prioritäten in TiageState (persistent)
     */
    function save() {
        if (typeof TiageState === 'undefined') return;

        TiageState.set('rtiPriorities', {
            S1: rtiPriorities.S1,
            S2: rtiPriorities.S2,
            S3: rtiPriorities.S3,
            S4: rtiPriorities.S4,
            S5: rtiPriorities.S5
        });
        TiageState.saveToStorage();
        console.log('[RTI] Priorities saved:', rtiPriorities);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // UI UPDATES
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Update RTI Toggle UI to reflect current priorities
     */
    function updateUI() {
        ['S1', 'S2', 'S3', 'S4', 'S5'].forEach(pillar => {
            const currentValue = rtiPriorities[pillar];
            const group = document.getElementById(`rtiToggle${pillar}`);
            if (group) {
                group.querySelectorAll('.agod-toggle-btn').forEach(btn => {
                    const btnValue = parseInt(btn.dataset.value, 10);
                    btn.classList.toggle('active', btnValue === currentValue);
                });
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // LEGACY COMPATIBILITY
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Legacy: Map old B227/B228 to new S1/S2
     */
    function updateReibungSlider(needId, value) {
        const pillarMap = { 'B227': 'S1', 'B228': 'S2' };
        const pillar = pillarMap[needId];
        if (pillar) {
            // Convert 0-100 to 0/1/2
            const newValue = value <= 33 ? 0 : (value >= 67 ? 2 : 1);
            set(pillar, newValue);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // MODULE EXPORT
    // ═══════════════════════════════════════════════════════════════════════

    TiageWeights.RTI = {
        // Constants
        DEFAULT_PRIORITIES: RTI_DEFAULT_PRIORITIES,

        // Lifecycle
        load: load,

        // Setters
        set: set,
        reset: reset,

        // Getters
        get: get,

        // Persistence
        save: save,

        // UI
        updateUI: updateUI,

        // Legacy
        updateReibungSlider: updateReibungSlider
    };

    // ═══════════════════════════════════════════════════════════════════════
    // BACKWARDS COMPATIBILITY - Global function aliases
    // ═══════════════════════════════════════════════════════════════════════

    if (typeof window !== 'undefined') {
        // Expose module
        window.TiageWeights = TiageWeights;

        // Legacy function names for existing onclick handlers
        window.loadRtiPriorities = load;
        window.loadReibungValues = load; // Legacy alias
        window.setRtiPriority = set;
        window.getRtiPriorities = get;
        window.saveRtiPriorities = save;
        window.updateRtiToggleUI = updateUI;
        window.updateReibungSlider = updateReibungSlider;
    }

    // Node.js export
    if (typeof module !== 'undefined' && module.exports) {
        module.exports = TiageWeights.RTI;
    }

})();
