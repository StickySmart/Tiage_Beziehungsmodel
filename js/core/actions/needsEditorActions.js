/**
 * NEEDS EDITOR ACTIONS
 *
 * Action-Handler für den Bedürfnis-Editor (AttributeSummaryCard)
 * v1.8.990: Vereinfacht — nur Reset + Save als Bulk-Aktionen
 */

(function() {
    'use strict';

    function registerActions() {
        if (typeof ActionHandler === 'undefined' || !ActionHandler.registerAll) {
            console.warn('[NeedsEditorActions] ActionHandler nicht verfügbar - wird später registriert');
            setTimeout(registerActions, 100);
            return;
        }

        ActionHandler.registerAll({
            /**
             * Reset: Setzt markierte (nicht gesperrte) Werte auf Original zurück
             */
            'bulk-reset-needs': function(el, event) {
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.resetSelectedNeedsValues) {
                    AttributeSummaryCard.resetSelectedNeedsValues();
                }
            },

            /**
             * Save: Speichert alle Änderungen
             */
            'bulk-save-needs': function(el, event) {
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.saveAllChanges) {
                    AttributeSummaryCard.saveAllChanges();
                }
            }
        });

        console.log('[NeedsEditorActions] Actions registriert');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
