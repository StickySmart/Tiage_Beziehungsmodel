/**
 * TIAGE Secondary Interessiert Actions
 *
 * Registriert Actions für Secondary Interessiert Toggles.
 * Teil des Refactoring-Plans v2.0 - Phase 2.15.
 *
 * @version 1.0.0
 * @since 2026-01-27
 */
(function() {
    'use strict';

    function registerActions() {
        if (typeof ActionHandler === 'undefined') {
            console.warn('[SecondaryActions] ActionHandler nicht verfügbar, retry in 100ms');
            setTimeout(registerActions, 100);
            return;
        }

        ActionHandler.registerAll({
            /**
             * Handle Orientierung Secondary Interessiert
             * Ersetzt: onclick="handleOrientierungSecondaryInteressiert('partner', 'heterosexuell', this)"
             * data-person: 'ich' oder 'partner'
             * data-type: Orientierungstyp
             */
            'orientierung-secondary-interessiert': function(el, event) {
                var person = el.dataset.person;
                var type = el.dataset.type;
                if (typeof handleOrientierungSecondaryInteressiert === 'function') {
                    handleOrientierungSecondaryInteressiert(person, type, el);
                } else if (typeof window.handleOrientierungSecondaryInteressiert === 'function') {
                    window.handleOrientierungSecondaryInteressiert(person, type, el);
                }
            },

            /**
             * Handle Secondary Interessiert (Dominanz)
             * Ersetzt: onclick="handleSecondaryInteressiert('partner', 'dominant', this)"
             * data-person: 'ich' oder 'partner'
             * data-type: Dominanztyp
             */
            'secondary-interessiert': function(el, event) {
                var person = el.dataset.person;
                var type = el.dataset.type;
                if (typeof handleSecondaryInteressiert === 'function') {
                    handleSecondaryInteressiert(person, type, el);
                } else if (typeof window.handleSecondaryInteressiert === 'function') {
                    window.handleSecondaryInteressiert(person, type, el);
                }
            },

            /**
             * Open Type Info Icon
             * Ersetzt: onclick="openDefinitionModal(currentArchetype)"
             */
            'open-type-info': function(el, event) {
                if (typeof currentArchetype !== 'undefined') {
                    if (typeof openDefinitionModal === 'function') {
                        openDefinitionModal(currentArchetype);
                    } else if (typeof window.openDefinitionModal === 'function') {
                        window.openDefinitionModal(currentArchetype);
                    }
                }
            }
        });

        console.log('[SecondaryActions] Actions registriert');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
