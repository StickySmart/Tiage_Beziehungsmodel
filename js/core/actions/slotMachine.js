/**
 * TIAGE Slot Machine Modal Actions
 *
 * Registriert Actions für das Slot Machine (Bindungsmuster) Modal.
 * Teil des Refactoring-Plans v2.0 - Phase 2.10.
 *
 * @version 1.0.0
 * @since 2026-01-27
 */
(function() {
    'use strict';

    function registerActions() {
        if (typeof ActionHandler === 'undefined') {
            console.warn('[SlotMachineActions] ActionHandler nicht verfügbar, retry in 100ms');
            setTimeout(registerActions, 100);
            return;
        }

        ActionHandler.registerAll({
            /**
             * Öffnet das Slot Machine Modal
             * Ersetzt: onclick="openSlotMachineModal()"
             */
            'open-slot-machine-modal': function(el, event) {
                if (typeof openSlotMachineModal === 'function') {
                    openSlotMachineModal();
                } else if (typeof window.openSlotMachineModal === 'function') {
                    window.openSlotMachineModal();
                } else {
                    var modal = document.getElementById('slotMachineModal');
                    if (modal) {
                        modal.style.display = 'flex';
                        document.body.style.overflow = 'hidden';
                    }
                }
            },

            /**
             * Schließt das Slot Machine Modal
             * Ersetzt: onclick="closeSlotMachineModal(event)"
             */
            'close-slot-machine-modal': function(el, event) {
                if (typeof closeSlotMachineModal === 'function') {
                    closeSlotMachineModal(event);
                } else if (typeof window.closeSlotMachineModal === 'function') {
                    window.closeSlotMachineModal(event);
                } else {
                    var modal = document.getElementById('slotMachineModal');
                    if (modal) modal.style.display = 'none';
                }
            },

            /**
             * Wählt ein Bindungsmuster
             * Ersetzt: onclick="selectBindungsmuster('primary', 'sicher')"
             * data-slot: 'primary' oder 'secondary'
             * data-value: 'sicher', 'aengstlich', 'vermeidend', 'desorganisiert'
             */
            'select-bindung': function(el, event) {
                var slot = el.dataset.slot;
                var value = el.dataset.value;
                if (typeof selectBindungsmuster === 'function') {
                    selectBindungsmuster(slot, value);
                } else if (typeof window.selectBindungsmuster === 'function') {
                    window.selectBindungsmuster(slot, value);
                } else {
                    console.error('[SlotMachineActions] selectBindungsmuster() nicht gefunden');
                }
            },

            /**
             * Startet die Slot Machine Animation
             * Ersetzt: onclick="startSlotMachine()"
             */
            'start-slot-machine': function(el, event) {
                if (typeof startSlotMachine === 'function') {
                    startSlotMachine();
                } else if (typeof window.startSlotMachine === 'function') {
                    window.startSlotMachine();
                } else {
                    console.error('[SlotMachineActions] startSlotMachine() nicht gefunden');
                }
            },

            /**
             * Toggle Slot Expand
             * Ersetzt: onclick="toggleSlotExpand()"
             */
            'toggle-slot-expand': function(el, event) {
                if (typeof toggleSlotExpand === 'function') {
                    toggleSlotExpand();
                } else if (typeof window.toggleSlotExpand === 'function') {
                    window.toggleSlotExpand();
                } else {
                    console.error('[SlotMachineActions] toggleSlotExpand() nicht gefunden');
                }
            },

            /**
             * Geht zu ICH Attributes
             * Ersetzt: onclick="goToIchAttributes()"
             */
            'go-to-ich-attributes': function(el, event) {
                if (typeof goToIchAttributes === 'function') {
                    goToIchAttributes();
                } else if (typeof window.goToIchAttributes === 'function') {
                    window.goToIchAttributes();
                } else {
                    console.error('[SlotMachineActions] goToIchAttributes() nicht gefunden');
                }
            }
        });

        console.log('[SlotMachineActions] Actions registriert');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
