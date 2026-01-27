/**
 * TIAGE Factor Detail Modal Actions
 *
 * Registriert Actions für das Factor Detail Modal.
 * Teil des Refactoring-Plans v2.0 - Phase 2.5.
 *
 * Migrierte onclick-Attribute:
 *   - closeFactorModal(event) → data-action="close-factor-modal"
 *   - navigateFactorArchetype(person, dir) → data-action="navigate-factor-archetype"
 *
 * @version 1.0.0
 * @since 2026-01-27
 */
(function() {
    'use strict';

    function registerActions() {
        if (typeof ActionHandler === 'undefined') {
            console.warn('[FactorModalActions] ActionHandler nicht verfügbar, retry in 100ms');
            setTimeout(registerActions, 100);
            return;
        }

        ActionHandler.registerAll({
            /**
             * Schließt das Factor Detail Modal
             * Ersetzt: onclick="closeFactorModal(event)"
             */
            'close-factor-modal': function(el, event) {
                if (typeof closeFactorModal === 'function') {
                    closeFactorModal(event);
                } else if (typeof window.closeFactorModal === 'function') {
                    window.closeFactorModal(event);
                } else {
                    var modal = document.getElementById('factorModal');
                    if (modal) modal.style.display = 'none';
                }
            },

            /**
             * Navigiert zum vorherigen/nächsten Archetyp im Factor Modal
             * Ersetzt: onclick="navigateFactorArchetype('ich', -1)"
             * data-person: 'ich' oder 'partner'
             * data-direction: -1 (vorherig) oder 1 (nächster)
             */
            'navigate-factor-archetype': function(el, event) {
                var person = el.dataset.person || 'ich';
                var direction = parseInt(el.dataset.direction, 10) || 1;
                if (typeof navigateFactorArchetype === 'function') {
                    navigateFactorArchetype(person, direction);
                } else if (typeof window.navigateFactorArchetype === 'function') {
                    window.navigateFactorArchetype(person, direction);
                } else {
                    console.error('[FactorModalActions] navigateFactorArchetype() nicht gefunden');
                }
            }
        });

        console.log('[FactorModalActions] Actions registriert');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
