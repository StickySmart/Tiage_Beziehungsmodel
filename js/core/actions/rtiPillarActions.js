/**
 * Need Priority Actions
 *
 * Registriert die Action für die 0/1/2-Prioritäts-Toggles der 16 Grundbedürfnisse.
 */
(function() {
    'use strict';

    function registerActions() {
        if (typeof ActionHandler === 'undefined') {
            setTimeout(registerActions, 100);
            return;
        }

        // Mapping 0/1/2 → flatNeeds-Wert 0-100
        var PRIO_TO_VALUE = { 0: 0, 1: 50, 2: 100 };
        var ICH_ARCHETYPEN = ['single', 'duo', 'duo_flex', 'solopoly', 'polyamor', 'ra', 'lat', 'aromantisch'];

        ActionHandler.registerAll({
            'set-need-priority': function(el, event) {
                var needId = el.dataset.need;
                var value = parseInt(el.dataset.value, 10);
                if (isNaN(value)) value = 1;

                // Priorität speichern (für Synthesis-Gewichtung)
                if (typeof window.setNeedPriority === 'function') {
                    window.setNeedPriority(needId, value);
                }

                // flatNeeds-Wert für ICH direkt setzen
                var flatValue = PRIO_TO_VALUE.hasOwnProperty(value) ? PRIO_TO_VALUE[value] : 50;
                if (typeof TiageState !== 'undefined' && needId) {
                    ICH_ARCHETYPEN.forEach(function(arch) {
                        TiageState.set('flatNeeds.ich.' + arch + '.' + needId, flatValue);
                    });
                    TiageState.saveToStorage();
                    // Cache invalidieren + Views aktualisieren
                    if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.invalidateFlatNeedsCache) {
                        AttributeSummaryCard.invalidateFlatNeedsCache();
                    }
                    document.dispatchEvent(new CustomEvent('tiage:needs16Changed', {
                        detail: { needId: needId, value: flatValue, source: 'priority' }
                    }));
                }

                if (typeof window.updateComparisonView === 'function') {
                    window.updateComparisonView();
                }
                if (typeof ResonanzProfileHeaderCard !== 'undefined' && ResonanzProfileHeaderCard.update) {
                    ResonanzProfileHeaderCard.update();
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
