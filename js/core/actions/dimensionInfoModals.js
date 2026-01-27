/**
 * TIAGE Dimension Info Modals Actions
 *
 * Registriert Actions für alle Dimensions-Info Modals:
 * - Dimension Tooltip Overlay
 * - Geschlecht Info Modal
 * - Dominanz Info Modal
 * - Orientierung Info Modal
 * - Body Soul Modal
 *
 * Teil des Refactoring-Plans v2.0 - Phase 2.9.
 *
 * @version 1.0.0
 * @since 2026-01-27
 */
(function() {
    'use strict';

    function registerActions() {
        if (typeof ActionHandler === 'undefined') {
            console.warn('[DimensionInfoModalsActions] ActionHandler nicht verfügbar, retry in 100ms');
            setTimeout(registerActions, 100);
            return;
        }

        ActionHandler.registerAll({
            // ========================================
            // Dimension Tooltip (generisch)
            // ========================================

            /**
             * Zeigt einen Dimensions-Tooltip an
             * Ersetzt: onclick="showDimensionTooltip('key')"
             * data-tooltip-key: Der Tooltip-Schlüssel
             */
            'show-dimension-tooltip': function(el, event) {
                var key = el.dataset.tooltipKey;
                if (typeof showDimensionTooltip === 'function') {
                    showDimensionTooltip(key);
                } else if (typeof window.showDimensionTooltip === 'function') {
                    window.showDimensionTooltip(key);
                } else {
                    console.error('[DimensionInfoModalsActions] showDimensionTooltip() nicht gefunden');
                }
            },

            /**
             * Zeigt einen Dimensions-Tooltip an mit preventDefault
             * Ersetzt: onclick="event.preventDefault(); showDimensionTooltip('key')"
             * data-tooltip-key: Der Tooltip-Schlüssel
             */
            'show-dimension-tooltip-prevent': function(el, event) {
                event.preventDefault();
                event.stopPropagation();
                var key = el.dataset.tooltipKey;
                if (typeof showDimensionTooltip === 'function') {
                    showDimensionTooltip(key);
                } else if (typeof window.showDimensionTooltip === 'function') {
                    window.showDimensionTooltip(key);
                }
            },

            /**
             * Zeigt einen Dimensions-Tooltip an mit stopPropagation
             * Ersetzt: onclick="event.stopPropagation(); showDimensionTooltip('key')"
             * data-tooltip-key: Der Tooltip-Schlüssel
             */
            'show-dimension-tooltip-stop': function(el, event) {
                event.stopPropagation();
                var key = el.dataset.tooltipKey;
                if (typeof showDimensionTooltip === 'function') {
                    showDimensionTooltip(key);
                } else if (typeof window.showDimensionTooltip === 'function') {
                    window.showDimensionTooltip(key);
                }
            },

            /**
             * Schließt den Dimension Tooltip
             * Ersetzt: onclick="closeDimensionTooltip()"
             */
            'close-dimension-tooltip': function(el, event) {
                if (typeof closeDimensionTooltip === 'function') {
                    closeDimensionTooltip();
                } else if (typeof window.closeDimensionTooltip === 'function') {
                    window.closeDimensionTooltip();
                } else {
                    var modal = document.getElementById('dimensionTooltipOverlay');
                    if (modal) modal.style.display = 'none';
                }
            },

            // ========================================
            // Geschlecht Info Modal
            // ========================================

            /**
             * Schließt das Geschlecht Info Modal
             * Ersetzt: onclick="closeGeschlechtInfoModal()"
             */
            'close-geschlecht-info-modal': function(el, event) {
                if (typeof closeGeschlechtInfoModal === 'function') {
                    closeGeschlechtInfoModal();
                } else if (typeof window.closeGeschlechtInfoModal === 'function') {
                    window.closeGeschlechtInfoModal();
                } else {
                    var modal = document.getElementById('geschlechtInfoModal');
                    if (modal) modal.style.display = 'none';
                }
            },

            // ========================================
            // Dominanz Info Modal
            // ========================================

            /**
             * Schließt das Dominanz Info Modal
             * Ersetzt: onclick="closeDominanzInfoModal()"
             */
            'close-dominanz-info-modal': function(el, event) {
                if (typeof closeDominanzInfoModal === 'function') {
                    closeDominanzInfoModal();
                } else if (typeof window.closeDominanzInfoModal === 'function') {
                    window.closeDominanzInfoModal();
                } else {
                    var modal = document.getElementById('dominanzInfoModal');
                    if (modal) modal.style.display = 'none';
                }
            },

            // ========================================
            // Orientierung Info Modal
            // ========================================

            /**
             * Schließt das Orientierung Info Modal
             * Ersetzt: onclick="closeOrientierungInfoModal()"
             */
            'close-orientierung-info-modal': function(el, event) {
                if (typeof closeOrientierungInfoModal === 'function') {
                    closeOrientierungInfoModal();
                } else if (typeof window.closeOrientierungInfoModal === 'function') {
                    window.closeOrientierungInfoModal();
                } else {
                    var modal = document.getElementById('orientierungInfoModal');
                    if (modal) modal.style.display = 'none';
                }
            },

            // ========================================
            // Body Soul Modal
            // ========================================

            /**
             * Öffnet das Body Soul Modal
             * Ersetzt: onclick="showBodySoulModal()"
             */
            'show-body-soul-modal': function(el, event) {
                if (typeof showBodySoulModal === 'function') {
                    showBodySoulModal();
                } else if (typeof window.showBodySoulModal === 'function') {
                    window.showBodySoulModal();
                } else {
                    var modal = document.getElementById('bodySoulModal');
                    if (modal) {
                        modal.style.display = 'flex';
                    }
                }
            },

            /**
             * Schließt das Body Soul Modal
             * Ersetzt: onclick="closeBodySoulModal()"
             */
            'close-body-soul-modal': function(el, event) {
                if (typeof closeBodySoulModal === 'function') {
                    closeBodySoulModal();
                } else if (typeof window.closeBodySoulModal === 'function') {
                    window.closeBodySoulModal();
                } else {
                    var modal = document.getElementById('bodySoulModal');
                    if (modal) modal.style.display = 'none';
                }
            }
        });

        console.log('[DimensionInfoModalsActions] Actions registriert');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
