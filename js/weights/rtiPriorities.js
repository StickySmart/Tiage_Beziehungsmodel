/**
 * NEED PRIORITIES MODULE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Verwaltet die Prioritäten der 16 Grundbedürfnisse (#B1-#B16)
 * nach dem 4-Stufen-Modell (Volker Kiel)
 *
 * 3-Wege-Gewichtung:
 *   0 = Egal (ignoriert)
 *   1 = Normal
 *   2 = Wichtig (doppelt)
 *
 * @module TiageWeights.NeedPriorities
 */

var TiageWeights = TiageWeights || {};

(function() {
    'use strict';

    const NEED_IDS = [
        '#B1','#B2','#B3','#B4',
        '#B5','#B6','#B7','#B8',
        '#B9','#B10','#B11','#B12',
        '#B13','#B14','#B15','#B16'
    ];

    function makeDefaults() {
        var d = {};
        NEED_IDS.forEach(function(id) { d[id] = 1; });
        return d;
    }

    var needPriorities = makeDefaults();

    function load() {
        if (typeof TiageState === 'undefined') return;
        var stored = TiageState.get('needPriorities');
        if (stored && typeof stored === 'object') {
            NEED_IDS.forEach(function(id) {
                if (typeof stored[id] === 'number') needPriorities[id] = stored[id];
            });
        }
        updateUI();
    }

    function set(needId, value) {
        var parsed = parseInt(value);
        var numValue = isNaN(parsed) ? 1 : Math.max(0, Math.min(2, parsed));
        needPriorities[needId] = numValue;
        updateUI(needId);
        save();
    }

    function get() {
        return Object.assign({}, needPriorities);
    }

    function save() {
        if (typeof TiageState === 'undefined') return;
        TiageState.set('needPriorities', Object.assign({}, needPriorities));
        TiageState.saveToStorage();
    }

    function updateUI(onlyNeedId) {
        var ids = onlyNeedId ? [onlyNeedId] : NEED_IDS;
        ids.forEach(function(needId) {
            var safeId = needId.replace('#', '');
            var group = document.getElementById('needPrioToggle' + safeId);
            if (!group) return;
            var currentValue = needPriorities[needId];
            group.querySelectorAll('.agod-toggle-btn').forEach(function(btn) {
                var btnValue = parseInt(btn.dataset.value, 10);
                btn.classList.toggle('active', btnValue === currentValue);
            });
        });
    }

    TiageWeights.NeedPriorities = {
        load: load,
        set: set,
        get: get,
        save: save,
        updateUI: updateUI
    };

    if (typeof window !== 'undefined') {
        window.TiageWeights = TiageWeights;
        window.loadNeedPriorities = load;
        window.setNeedPriority = set;
        window.getNeedPriorities = get;
        window.saveNeedPriorities = save;

        // Backwards-compat stubs so any remaining RTI references don't throw
        window.loadRtiPriorities = load;
        window.setRtiPriority = function() {};
        window.getRtiPriorities = function() { return {}; };
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = TiageWeights.NeedPriorities;
    }
})();
