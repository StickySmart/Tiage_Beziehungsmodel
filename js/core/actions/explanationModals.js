/**
 * TIAGE Explanation Modals Actions
 *
 * Registriert Actions für alle Erklärungs-Modals:
 * - GFK Explanation Modal
 * - Needs Compare Modal
 * - Needs Score Explanation Modal
 * - Paarung Explanation Modal
 *
 * Teil des Refactoring-Plans v2.0 - Phase 2.7.
 *
 * @version 1.0.0
 * @since 2026-01-27
 */
(function() {
    'use strict';

    function registerActions() {
        if (typeof ActionHandler === 'undefined') {
            console.warn('[ExplanationModalsActions] ActionHandler nicht verfügbar, retry in 100ms');
            setTimeout(registerActions, 100);
            return;
        }

        ActionHandler.registerAll({
            // ========================================
            // GFK Explanation Modal
            // ========================================

            /**
             * Schließt das GFK Explanation Modal
             * Ersetzt: onclick="closeGfkExplanationModal(event)"
             * HINWEIS: Direktes Schließen ohne Event-Check, da ActionHandler
             * event.target/currentTarget anders behandelt als direktes onclick
             */
            'close-gfk-modal': function(el, event) {
                var modal = document.getElementById('gfkExplanationModal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            },

            // ========================================
            // Needs Compare Modal
            // ========================================

            /**
             * Schließt das Needs Compare Modal
             * Ersetzt: onclick="closeNeedsCompareModal(event)"
             * HINWEIS: Direktes Schließen ohne Event-Check, da ActionHandler
             * event.target/currentTarget anders behandelt als direktes onclick
             */
            'close-needs-compare-modal': function(el, event) {
                var modal = document.getElementById('needsCompareModal');
                if (modal) {
                    modal.classList.remove('active');
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            },

            // ========================================
            // Needs Score Explanation Modal
            // ========================================

            /**
             * Schließt das Needs Score Explanation Modal
             * Ersetzt: onclick="closeNeedsScoreExplanation(event)"
             * HINWEIS: Direktes Schließen ohne Event-Check, da ActionHandler
             * event.target/currentTarget anders behandelt als direktes onclick
             */
            'close-needs-score-explanation': function(el, event) {
                var modal = document.getElementById('needsScoreExplanationModal');
                if (modal) {
                    modal.classList.remove('active');
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            },

            // ========================================
            // Paarung Explanation Modal
            // ========================================

            /**
             * Schließt das Paarung Explanation Modal
             * Ersetzt: onclick="closePaarungExplanationModal(event)"
             * HINWEIS: Direktes Schließen ohne Event-Check, da ActionHandler
             * event.target/currentTarget anders behandelt als direktes onclick
             */
            'close-paarung-modal': function(el, event) {
                var modal = document.getElementById('paarungExplanationModal');
                if (modal) {
                    modal.classList.remove('active');
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            }
        });

        console.log('[ExplanationModalsActions] Actions registriert');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
