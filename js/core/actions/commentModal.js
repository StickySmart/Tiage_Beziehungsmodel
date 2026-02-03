/**
 * TIAGE Comment Modal Actions
 *
 * Registriert Actions für das Comment Modal.
 * Teil des Refactoring-Plans v2.0 - Phase 2.3.
 *
 * Migrierte onclick-Attribute:
 *   - closeCommentModal(event) → data-action="close-comment-modal"
 *   - submitComment() → data-action="submit-comment"
 *   - openCommentModal() → data-action="open-comment-modal"
 *
 * @version 1.0.0
 * @since 2026-01-27
 */
(function() {
    'use strict';

    // Warte bis ActionHandler verfügbar ist
    function registerActions() {
        if (typeof ActionHandler === 'undefined') {
            console.warn('[CommentModalActions] ActionHandler nicht verfügbar, retry in 100ms');
            setTimeout(registerActions, 100);
            return;
        }

        ActionHandler.registerAll({
            /**
             * Öffnet das Comment Modal
             * Ersetzt: onclick="openCommentModal()"
             * Optional: data-close-list="true" schließt erst das Comments List Modal
             */
            'open-comment-modal': function(el, event) {
                // Optional: Erst Comments List Modal schließen
                if (el.dataset.closeList === 'true') {
                    if (typeof closeCommentsListModal === 'function') {
                        closeCommentsListModal();
                    } else if (typeof window.closeCommentsListModal === 'function') {
                        window.closeCommentsListModal();
                    }
                }

                // Comment Modal öffnen
                if (typeof openCommentModal === 'function') {
                    openCommentModal();
                } else if (typeof window.openCommentModal === 'function') {
                    window.openCommentModal();
                } else {
                    // Fallback: Modal direkt öffnen
                    var modal = document.getElementById('commentModal');
                    if (modal) {
                        modal.style.display = 'flex';
                        document.body.style.overflow = 'hidden';
                    }
                }
            },

            /**
             * Schließt das Comment Modal
             * Ersetzt: onclick="closeCommentModal(event)"
             * HINWEIS: Direktes Schließen ohne Event-Check, da ActionHandler
             * event.target/currentTarget anders behandelt als direktes onclick
             */
            'close-comment-modal': function(el, event) {
                var modal = document.getElementById('commentModal');
                if (modal) {
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            },

            /**
             * Sendet den Kommentar ab
             * Ersetzt: onclick="submitComment()"
             */
            'submit-comment': function(el, event) {
                // Rufe bestehende Funktion auf (in app-main.js definiert)
                if (typeof submitComment === 'function') {
                    submitComment();
                } else if (typeof window.submitComment === 'function') {
                    window.submitComment();
                } else {
                    console.error('[CommentModalActions] submitComment() nicht gefunden');
                }
            }
        });

        console.log('[CommentModalActions] Actions registriert: open-comment-modal, close-comment-modal, submit-comment');
    }

    // Registriere bei DOMContentLoaded oder sofort wenn DOM bereit
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
