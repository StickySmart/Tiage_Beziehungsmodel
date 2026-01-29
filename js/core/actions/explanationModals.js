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
             */
            'close-needs-compare-modal': function(el, event) {
                if (typeof closeNeedsCompareModal === 'function') {
                    closeNeedsCompareModal(event);
                } else if (typeof window.closeNeedsCompareModal === 'function') {
                    window.closeNeedsCompareModal(event);
                } else {
                    var modal = document.getElementById('needsCompareModal');
                    if (modal) modal.style.display = 'none';
                }
            },

            // ========================================
            // Needs Score Explanation Modal
            // ========================================

            /**
             * Schließt das Needs Score Explanation Modal
             * Ersetzt: onclick="closeNeedsScoreExplanation(event)"
             */
            'close-needs-score-explanation': function(el, event) {
                if (typeof closeNeedsScoreExplanation === 'function') {
                    closeNeedsScoreExplanation(event);
                } else if (typeof window.closeNeedsScoreExplanation === 'function') {
                    window.closeNeedsScoreExplanation(event);
                } else {
                    var modal = document.getElementById('needsScoreExplanationModal');
                    if (modal) modal.style.display = 'none';
                }
            },

            // ========================================
            // Paarung Explanation Modal
            // ========================================

            /**
             * Schließt das Paarung Explanation Modal
             * Ersetzt: onclick="closePaarungExplanationModal(event)"
             */
            'close-paarung-modal': function(el, event) {
                if (typeof closePaarungExplanationModal === 'function') {
                    closePaarungExplanationModal(event);
                } else if (typeof window.closePaarungExplanationModal === 'function') {
                    window.closePaarungExplanationModal(event);
                } else {
                    var modal = document.getElementById('paarungExplanationModal');
                    if (modal) modal.style.display = 'none';
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
