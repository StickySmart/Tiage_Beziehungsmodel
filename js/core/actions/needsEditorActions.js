/**
 * NEEDS EDITOR ACTIONS
 *
 * Action-Handler für den Bedürfnis-Editor (AttributeSummaryCard)
 * Ersetzt onclick-Handler für bessere Konsistenz
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
             * Bulk-Increment: Erhöht markierte Werte um 25
             */
            'bulk-increment-needs': function(el, event) {
                console.log('[NeedsEditorActions] bulk-increment-needs triggered');
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.incrementSelectedNeeds) {
                    AttributeSummaryCard.incrementSelectedNeeds(25);
                } else {
                    console.error('[NeedsEditorActions] AttributeSummaryCard.incrementSelectedNeeds nicht gefunden!');
                }
            },

            /**
             * Bulk-Decrement: Verringert markierte Werte um 25
             */
            'bulk-decrement-needs': function(el, event) {
                console.log('[NeedsEditorActions] bulk-decrement-needs triggered');
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.decrementSelectedNeeds) {
                    AttributeSummaryCard.decrementSelectedNeeds(25);
                } else {
                    console.error('[NeedsEditorActions] AttributeSummaryCard.decrementSelectedNeeds nicht gefunden!');
                }
            },

            /**
             * Reset: Setzt markierte Werte zurück
             */
            'bulk-reset-needs': function(el, event) {
                console.log('[NeedsEditorActions] bulk-reset-needs triggered');
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.resetSelectedNeedsValues) {
                    AttributeSummaryCard.resetSelectedNeedsValues();
                } else {
                    console.error('[NeedsEditorActions] AttributeSummaryCard.resetSelectedNeedsValues nicht gefunden!');
                }
            },

            /**
             * Lock/Unlock: Sperrt/Entsperrt markierte Werte
             */
            'bulk-lock-needs': function(el, event) {
                console.log('[NeedsEditorActions] bulk-lock-needs triggered');
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.toggleLockSelectedNeeds) {
                    AttributeSummaryCard.toggleLockSelectedNeeds();
                } else {
                    console.error('[NeedsEditorActions] AttributeSummaryCard.toggleLockSelectedNeeds nicht gefunden!');
                }
            },

            /**
             * Save: Speichert alle Änderungen
             */
            'bulk-save-needs': function(el, event) {
                console.log('[NeedsEditorActions] bulk-save-needs triggered');
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.saveAllChanges) {
                    AttributeSummaryCard.saveAllChanges();
                } else {
                    console.error('[NeedsEditorActions] AttributeSummaryCard.saveAllChanges nicht gefunden!');
                }
            },

            /**
             * Alle auswählen
             */
            'select-all-needs': function(el, event) {
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.selectAllFilteredNeeds) {
                    AttributeSummaryCard.selectAllFilteredNeeds();
                }
            },

            /**
             * Keine auswählen
             */
            'clear-needs-selection': function(el, event) {
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.clearNeedSelection) {
                    AttributeSummaryCard.clearNeedSelection();
                }
            },

            /**
             * Auswahl umkehren
             */
            'invert-needs-selection': function(el, event) {
                if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.invertNeedSelection) {
                    AttributeSummaryCard.invertNeedSelection();
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
