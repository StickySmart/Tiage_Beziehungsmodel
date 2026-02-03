/**
 * TIAGE Synthese Modal Actions
 *
 * Registriert Actions für das Ti-Age Synthese Modal und Resonanzfaktoren Modal.
 * Teil des Refactoring-Plans v2.0 - Phase 2.6.
 *
 * Migrierte onclick-Attribute:
 *   - closeTiageSyntheseModal(event) → data-action="close-synthese-modal"
 *   - showTiageSyntheseContent(tab) → data-action="show-synthese-content"
 *   - navigateTiageSyntheseArchetype(person, dir) → data-action="navigate-synthese-archetype"
 *   - openResonanzfaktorenModal() → data-action="open-resonanz-modal"
 *   - closeResonanzfaktorenModal(event) → data-action="close-resonanz-modal"
 *
 * @version 1.0.0
 * @since 2026-01-27
 */
(function() {
    'use strict';

    function registerActions() {
        if (typeof ActionHandler === 'undefined') {
            console.warn('[SyntheseModalActions] ActionHandler nicht verfügbar, retry in 100ms');
            setTimeout(registerActions, 100);
            return;
        }

        ActionHandler.registerAll({
            // ========================================
            // Ti-Age Synthese Modal
            // ========================================

            /**
             * Schließt das Ti-Age Synthese Modal
             * Ersetzt: onclick="closeTiageSyntheseModal(event)"
             * HINWEIS: Direktes Schließen ohne Event-Check, da ActionHandler
             * event.target/currentTarget anders behandelt als direktes onclick
             */
            'close-synthese-modal': function(el, event) {
                var modal = document.getElementById('tiageSyntheseModal');
                if (modal) {
                    modal.classList.remove('active');
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            },

            /**
             * Zeigt einen bestimmten Content-Tab im Synthese Modal
             * Ersetzt: onclick="showTiageSyntheseContent('score')"
             * data-tab: 'score', 'oshozen', oder 'needs'
             */
            'show-synthese-content': function(el, event) {
                var tab = el.dataset.tab || 'score';
                if (typeof showTiageSyntheseContent === 'function') {
                    showTiageSyntheseContent(tab);
                } else if (typeof window.showTiageSyntheseContent === 'function') {
                    window.showTiageSyntheseContent(tab);
                } else {
                    console.error('[SyntheseModalActions] showTiageSyntheseContent() nicht gefunden');
                }
            },

            /**
             * Navigiert zum vorherigen/nächsten Archetyp im Synthese Modal
             * Ersetzt: onclick="navigateTiageSyntheseArchetype('ich', -1)"
             * data-person: 'ich' oder 'partner'
             * data-direction: -1 (vorherig) oder 1 (nächster)
             */
            'navigate-synthese-archetype': function(el, event) {
                var person = el.dataset.person || 'ich';
                var direction = parseInt(el.dataset.direction, 10) || 1;
                if (typeof navigateTiageSyntheseArchetype === 'function') {
                    navigateTiageSyntheseArchetype(person, direction);
                } else if (typeof window.navigateTiageSyntheseArchetype === 'function') {
                    window.navigateTiageSyntheseArchetype(person, direction);
                } else {
                    console.error('[SyntheseModalActions] navigateTiageSyntheseArchetype() nicht gefunden');
                }
            },

            // ========================================
            // Resonanzfaktoren Modal
            // ========================================

            /**
             * Öffnet das Resonanzfaktoren Modal
             * Ersetzt: onclick="openResonanzfaktorenModal()"
             */
            'open-resonanz-modal': function(el, event) {
                if (typeof openResonanzfaktorenModal === 'function') {
                    openResonanzfaktorenModal();
                } else if (typeof window.openResonanzfaktorenModal === 'function') {
                    window.openResonanzfaktorenModal();
                } else {
                    var modal = document.getElementById('resonanzfaktorenModal');
                    if (modal) {
                        modal.style.display = 'flex';
                        document.body.style.overflow = 'hidden';
                    }
                }
            },

            /**
             * Schließt das Resonanzfaktoren Modal
             * Ersetzt: onclick="closeResonanzfaktorenModal(event)"
             * HINWEIS: Direktes Schließen ohne Event-Check, da ActionHandler
             * event.target/currentTarget anders behandelt als direktes onclick
             */
            'close-resonanz-modal': function(el, event) {
                var modal = document.getElementById('resonanzfaktorenModal');
                if (modal) {
                    modal.classList.remove('active');
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            },

            /**
             * Öffnet das Resonanz Help Modal
             * Ersetzt: onclick="openResonanzHelpModal()"
             */
            'open-resonanz-help-modal': function(el, event) {
                if (typeof openResonanzHelpModal === 'function') {
                    openResonanzHelpModal();
                } else if (typeof window.openResonanzHelpModal === 'function') {
                    window.openResonanzHelpModal();
                } else {
                    console.error('[SyntheseModalActions] openResonanzHelpModal() nicht gefunden');
                }
            }
        });

        console.log('[SyntheseModalActions] Actions registriert');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
