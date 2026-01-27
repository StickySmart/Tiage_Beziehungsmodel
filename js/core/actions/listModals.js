/**
 * TIAGE List Modals Actions
 *
 * Registriert Actions für Listen-Modals:
 * - Profile Review Info Modal
 * - Comments List Modal
 *
 * Teil des Refactoring-Plans v2.0 - Phase 2.8.
 *
 * @version 1.0.0
 * @since 2026-01-27
 */
(function() {
    'use strict';

    function registerActions() {
        if (typeof ActionHandler === 'undefined') {
            console.warn('[ListModalsActions] ActionHandler nicht verfügbar, retry in 100ms');
            setTimeout(registerActions, 100);
            return;
        }

        ActionHandler.registerAll({
            // ========================================
            // Profile Review Info Modal
            // ========================================

            /**
             * Schließt das Profile Review Info Modal
             * Ersetzt: onclick="closeProfileReviewInfoModal(event)"
             */
            'close-profile-review-info-modal': function(el, event) {
                if (typeof closeProfileReviewInfoModal === 'function') {
                    closeProfileReviewInfoModal(event);
                } else if (typeof window.closeProfileReviewInfoModal === 'function') {
                    window.closeProfileReviewInfoModal(event);
                } else {
                    var modal = document.getElementById('profileReviewInfoModal');
                    if (modal) modal.style.display = 'none';
                }
            },

            // ========================================
            // Comments List Modal
            // ========================================

            /**
             * Schließt das Comments List Modal
             * Ersetzt: onclick="closeCommentsListModal(event)"
             */
            'close-comments-list-modal': function(el, event) {
                if (typeof closeCommentsListModal === 'function') {
                    closeCommentsListModal(event);
                } else if (typeof window.closeCommentsListModal === 'function') {
                    window.closeCommentsListModal(event);
                } else {
                    var modal = document.getElementById('commentsListModal');
                    if (modal) modal.style.display = 'none';
                }
            },

            /**
             * Leert das Suchfeld im Comments List Modal
             * Ersetzt: onclick="clearCommentsSearch()"
             */
            'clear-comments-search': function(el, event) {
                if (typeof clearCommentsSearch === 'function') {
                    clearCommentsSearch();
                } else if (typeof window.clearCommentsSearch === 'function') {
                    window.clearCommentsSearch();
                } else {
                    var input = document.getElementById('commentsSearchInput');
                    if (input) {
                        input.value = '';
                        if (typeof filterComments === 'function') {
                            filterComments('');
                        }
                    }
                }
            }
        });

        console.log('[ListModalsActions] Actions registriert');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
