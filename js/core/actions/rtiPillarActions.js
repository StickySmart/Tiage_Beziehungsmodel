/**
 * TIAGE RTI Pillar Actions
 *
 * Registriert Actions für RTI-Säulen Modal und Priority-Buttons.
 * Teil des Refactoring-Plans v2.0 - Phase 2.
 *
 * @version 1.0.0
 * @since 2026-02-05
 */
(function() {
    'use strict';

    function registerActions() {
        if (typeof ActionHandler === 'undefined') {
            console.warn('[RtiPillarActions] ActionHandler nicht verfügbar, retry in 100ms');
            setTimeout(registerActions, 100);
            return;
        }

        ActionHandler.registerAll({
            /**
             * Öffnet RTI-Pillar Definition Modal
             * data-pillar: 'S1', 'S2', 'S3', 'S4', 'S5'
             */
            'open-rti-pillar-modal': function(el, event) {
                var pillar = el.dataset.pillar;
                if (typeof openRtiPillarModal === 'function') {
                    openRtiPillarModal(pillar);
                } else if (typeof window.openRtiPillarModal === 'function') {
                    window.openRtiPillarModal(pillar);
                }
            },

            /**
             * Schließt RTI-Pillar Modal
             */
            'close-rti-pillar-modal': function(el, event) {
                var modal = document.getElementById('rtiPillarModal');
                if (modal) {
                    modal.classList.remove('active');
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            },

            /**
             * Setzt RTI Priority (0, 1, 2)
             * data-pillar: 'S1', 'S2', 'S3', 'S4', 'S5'
             * data-value: 0, 1, 2
             */
            'set-rti-priority': function(el, event) {
                var pillar = el.dataset.pillar;
                var value = parseInt(el.dataset.value, 10);
                if (isNaN(value)) value = 1;

                if (typeof setRtiPriority === 'function') {
                    setRtiPriority(pillar, value);
                } else if (typeof window.setRtiPriority === 'function') {
                    window.setRtiPriority(pillar, value);
                }

                // Update active state
                var container = el.closest('.rti-priority-buttons, .agod-toggle-group');
                if (container) {
                    container.querySelectorAll('.agod-toggle-btn').forEach(function(btn) {
                        btn.classList.remove('active');
                    });
                    el.classList.add('active');
                }
            }
        });

        console.log('[RtiPillarActions] Actions registriert');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
