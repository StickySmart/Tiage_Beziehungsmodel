/**
 * TIAGE Definition Modal Actions
 *
 * Registriert Actions für alle Definition-Modals:
 * - Definition Modal (Archetyp-Definitionen)
 * - Need Definition Modal (Bedürfnis-Definitionen)
 * - Attribute Definition Modal (Attribut-Definitionen)
 *
 * Teil des Refactoring-Plans v2.0 - Phase 2.4.
 *
 * @version 1.0.0
 * @since 2026-01-27
 */
(function() {
    'use strict';

    function registerActions() {
        if (typeof ActionHandler === 'undefined') {
            console.warn('[DefinitionModalActions] ActionHandler nicht verfügbar, retry in 100ms');
            setTimeout(registerActions, 100);
            return;
        }

        ActionHandler.registerAll({
            // ========================================
            // Definition Modal (Archetyp-Definitionen)
            // ========================================

            /**
             * Öffnet das Definition Modal für einen Archetyp
             * Ersetzt: onclick="openDefinitionModal(archetyp)"
             * data-archetype: Der Archetyp-Name
             */
            'open-definition-modal': function(el, event) {
                var archetype = el.dataset.archetype;
                if (typeof openDefinitionModal === 'function') {
                    openDefinitionModal(archetype);
                } else if (typeof window.openDefinitionModal === 'function') {
                    window.openDefinitionModal(archetype);
                } else {
                    console.error('[DefinitionModalActions] openDefinitionModal() nicht gefunden');
                }
            },

            /**
             * Schließt das Definition Modal
             * Ersetzt: onclick="closeDefinitionModal(event)"
             * HINWEIS: Direktes Schließen ohne Event-Check, da ActionHandler
             * event.target/currentTarget anders behandelt als direktes onclick
             */
            'close-definition-modal': function(el, event) {
                var modal = document.getElementById('definitionModal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            },

            /**
             * Navigiert zum vorherigen/nächsten Archetyp im Definition Modal
             * Ersetzt: onclick="navigateDefinitionModal(-1)" / onclick="navigateDefinitionModal(1)"
             * data-direction: -1 (vorherig) oder 1 (nächster)
             */
            'navigate-definition-modal': function(el, event) {
                var direction = parseInt(el.dataset.direction, 10) || 1;
                if (typeof navigateDefinitionModal === 'function') {
                    navigateDefinitionModal(direction);
                } else if (typeof window.navigateDefinitionModal === 'function') {
                    window.navigateDefinitionModal(direction);
                } else {
                    console.error('[DefinitionModalActions] navigateDefinitionModal() nicht gefunden');
                }
            },

            // ========================================
            // Need Definition Modal (Bedürfnis-Definitionen)
            // ========================================

            /**
             * Schließt das Need Definition Modal
             * Ersetzt: onclick="closeNeedDefinitionModal(event)"
             * HINWEIS: Direktes Schließen ohne Event-Check, da ActionHandler
             * event.target/currentTarget anders behandelt als direktes onclick
             */
            'close-need-definition-modal': function(el, event) {
                var modal = document.getElementById('needDefinitionModal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            },

            // ========================================
            // Attribute Definition Modal
            // ========================================

            /**
             * Schließt das Attribute Definition Modal
             * Ersetzt: onclick="closeAttributeDefinitionModal(event)"
             * HINWEIS: Direktes Schließen ohne Event-Check, da ActionHandler
             * event.target/currentTarget anders behandelt als direktes onclick
             */
            'close-attribute-definition-modal': function(el, event) {
                var modal = document.getElementById('attributeDefinitionModal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });

        console.log('[DefinitionModalActions] Actions registriert');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
