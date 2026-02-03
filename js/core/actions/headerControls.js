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
             * Setzt AGOD-Gewichtung (3-Wege-Toggle)
             * Ersetzt: onclick="setAgodWeight('A', 1)"
             * data-dimension: 'A', 'G', 'O', 'D'
             * data-value: 0, 1, oder 2
             */
            'set-agod-weight': function(el, event) {
                var dimension = el.dataset.dimension;
                var parsed = parseInt(el.dataset.value, 10);
                var value = isNaN(parsed) ? 1 : parsed; // Allow 0 value
                console.log('[set-agod-weight] Clicked:', dimension, value);
                if (typeof window.setAgodWeight === 'function') {
                    window.setAgodWeight(dimension, value);
                    console.log('[set-agod-weight] Called window.setAgodWeight');
                } else if (typeof TiageWeights !== 'undefined' && TiageWeights.AGOD && typeof TiageWeights.AGOD.set === 'function') {
                    TiageWeights.AGOD.set(dimension, value);
                    console.log('[set-agod-weight] Called TiageWeights.AGOD.set');
                } else {
                    console.error('[set-agod-weight] No setAgodWeight function available!', {
                        'window.setAgodWeight': typeof window.setAgodWeight,
                        'TiageWeights': typeof TiageWeights,
                        'TiageWeights.AGOD': typeof TiageWeights !== 'undefined' ? typeof TiageWeights.AGOD : 'N/A'
                    });
                }
            },

            /**
             * Reset AGOD-Gewichtungen auf Standard (alle = 1)
             * Ersetzt: onclick="resetAgodWeights()"
             */
            'reset-agod-weights': function(el, event) {
                if (typeof resetAgodWeights === 'function') {
                    resetAgodWeights();
                } else if (typeof window.resetAgodWeights === 'function') {
                    window.resetAgodWeights();
                }
            },

            /**
             * Schließt Resonanz Help Modal
             * Ersetzt: onclick="closeResonanzHelpModal(event)"
             * HINWEIS: Direktes Schließen ohne Event-Check, da ActionHandler
             * event.target/currentTarget anders behandelt als direktes onclick
             */
            'close-resonanz-help-modal': function(el, event) {
                var modal = document.getElementById('resonanzHelpModal');
                if (modal) {
                    modal.classList.remove('active');
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
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
            },

            /**
             * Reset Partner GOD (Geschlecht, Orientierung, Dominanz)
             * Setzt alle Partner-Attribute auf "frei" zurück
             */
            'reset-partner-god': function(el, event) {
                if (typeof resetPartnerGOD === 'function') {
                    resetPartnerGOD();
                } else if (typeof window.resetPartnerGOD === 'function') {
                    window.resetPartnerGOD();
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
