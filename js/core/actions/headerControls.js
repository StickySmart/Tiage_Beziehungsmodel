/**
 * TIAGE Header Controls Actions
 *
 * Registriert Actions für Header-Buttons und allgemeine Steuerung.
 * Teil des Refactoring-Plans v2.0 - Phase 2.10.
 *
 * @version 1.0.0
 * @since 2026-01-27
 */
(function() {
    'use strict';

    function registerActions() {
        if (typeof ActionHandler === 'undefined') {
            console.warn('[HeaderControlsActions] ActionHandler nicht verfügbar, retry in 100ms');
            setTimeout(registerActions, 100);
            return;
        }

        ActionHandler.registerAll({
            /**
             * Toggle alle Dimensionen collapse/expand
             * Ersetzt: onclick="toggleAllDimensionsCollapse()"
             */
            'toggle-all-dimensions': function(el, event) {
                if (typeof toggleAllDimensionsCollapse === 'function') {
                    toggleAllDimensionsCollapse();
                } else if (typeof window.toggleAllDimensionsCollapse === 'function') {
                    window.toggleAllDimensionsCollapse();
                }
            },

            /**
             * Sprache wechseln
             * Ersetzt: onclick="TiageI18n.toggle(); updateAllTranslations();"
             */
            'toggle-language': function(el, event) {
                if (typeof TiageI18n !== 'undefined' && typeof TiageI18n.toggle === 'function') {
                    TiageI18n.toggle();
                }
                if (typeof updateAllTranslations === 'function') {
                    updateAllTranslations();
                }
            },

            /**
             * Sprache wechseln (mit Age Verification Update)
             * Ersetzt: onclick="TiageI18n.toggle(); updateAllTranslations(); updateAgeVerificationTexts();"
             */
            'toggle-language-full': function(el, event) {
                if (typeof TiageI18n !== 'undefined' && typeof TiageI18n.toggle === 'function') {
                    TiageI18n.toggle();
                }
                if (typeof updateAllTranslations === 'function') {
                    updateAllTranslations();
                }
                if (typeof updateAgeVerificationTexts === 'function') {
                    updateAgeVerificationTexts();
                }
            },

            /**
             * Öffnet Memory Modal
             * Ersetzt: onclick="openMemoryModal()"
             */
            'open-memory-modal': function(el, event) {
                if (typeof openMemoryModal === 'function') {
                    openMemoryModal();
                } else if (typeof window.openMemoryModal === 'function') {
                    window.openMemoryModal();
                }
            },

            /**
             * Löscht allen Storage
             * Ersetzt: onclick="clearAllStorage()"
             */
            'clear-all-storage': function(el, event) {
                if (typeof clearAllStorage === 'function') {
                    clearAllStorage();
                } else if (typeof window.clearAllStorage === 'function') {
                    window.clearAllStorage();
                }
            },

            /**
             * Passt AGOD-Gewichtung an
             * Ersetzt: onclick="adjustAgodWeight('A', 5)"
             * data-dimension: 'A', 'G', 'O', 'D'
             * data-delta: numerischer Wert (z.B. 5, -5)
             */
            'adjust-agod-weight': function(el, event) {
                var dimension = el.dataset.dimension;
                var delta = parseInt(el.dataset.delta, 10) || 0;
                if (typeof adjustAgodWeight === 'function') {
                    adjustAgodWeight(dimension, delta);
                } else if (typeof window.adjustAgodWeight === 'function') {
                    window.adjustAgodWeight(dimension, delta);
                }
            },

            /**
             * Schließt Resonanz Help Modal
             * Ersetzt: onclick="closeResonanzHelpModal(event)"
             */
            'close-resonanz-help-modal': function(el, event) {
                if (typeof closeResonanzHelpModal === 'function') {
                    closeResonanzHelpModal(event);
                } else if (typeof window.closeResonanzHelpModal === 'function') {
                    window.closeResonanzHelpModal(event);
                } else {
                    var modal = document.getElementById('resonanzHelpModal');
                    if (modal) modal.style.display = 'none';
                }
            },

            /**
             * Bestätigt Alter (Age Verification)
             * Ersetzt: onclick="window.confirmAge(true)"
             * data-confirm: 'true' oder 'false'
             */
            'confirm-age': function(el, event) {
                var confirm = el.dataset.confirm === 'true';
                if (typeof window.confirmAge === 'function') {
                    window.confirmAge(confirm);
                }
            }
        });

        console.log('[HeaderControlsActions] Actions registriert');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
