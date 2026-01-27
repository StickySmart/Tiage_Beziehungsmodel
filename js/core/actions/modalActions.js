/**
 * TIAGE Modal Actions
 *
 * Registriert Actions für Category, Match und Memory Modals.
 * Teil des Refactoring-Plans v2.0 - Phase 2.14.
 *
 * @version 1.0.0
 * @since 2026-01-27
 */
(function() {
    'use strict';

    function registerActions() {
        if (typeof ActionHandler === 'undefined') {
            console.warn('[ModalActions] ActionHandler nicht verfügbar, retry in 100ms');
            setTimeout(registerActions, 100);
            return;
        }

        ActionHandler.registerAll({
            // ========================================
            // Category Modal
            // ========================================

            /**
             * Open Category Modal
             * Ersetzt: onclick="openCategoryModal()"
             */
            'open-category-modal': function(el, event) {
                if (typeof openCategoryModal === 'function') {
                    openCategoryModal();
                } else if (typeof window.openCategoryModal === 'function') {
                    window.openCategoryModal();
                }
            },

            /**
             * Close Category Modal
             * Ersetzt: onclick="closeCategoryModal(event)"
             */
            'close-category-modal': function(el, event) {
                if (typeof closeCategoryModal === 'function') {
                    closeCategoryModal(event);
                } else if (typeof window.closeCategoryModal === 'function') {
                    window.closeCategoryModal(event);
                } else {
                    var modal = document.getElementById('categoryModal');
                    if (modal) modal.style.display = 'none';
                }
            },

            /**
             * Navigate Category Archetype
             * Ersetzt: onclick="navigateCategoryArchetype(-1)"
             * data-direction: -1 oder 1
             */
            'navigate-category-archetype': function(el, event) {
                var direction = parseInt(el.dataset.direction, 10) || 1;
                if (typeof navigateCategoryArchetype === 'function') {
                    navigateCategoryArchetype(direction);
                } else if (typeof window.navigateCategoryArchetype === 'function') {
                    window.navigateCategoryArchetype(direction);
                }
            },

            /**
             * Toggle Match Modal View
             * Ersetzt: onclick="toggleMatchModalView('pathos')"
             * data-view: 'pathos' oder 'logos'
             */
            'toggle-match-modal-view': function(el, event) {
                var view = el.dataset.view || 'pathos';
                if (typeof toggleMatchModalView === 'function') {
                    toggleMatchModalView(view);
                } else if (typeof window.toggleMatchModalView === 'function') {
                    window.toggleMatchModalView(view);
                }
            },

            // ========================================
            // Match Modal
            // ========================================

            /**
             * Open Match Modal
             * Ersetzt: onclick="openMatchModal('top')"
             * data-match-type: 'top' oder 'challenge'
             */
            'open-match-modal': function(el, event) {
                var matchType = el.dataset.matchType || 'top';
                if (typeof openMatchModal === 'function') {
                    openMatchModal(matchType);
                } else if (typeof window.openMatchModal === 'function') {
                    window.openMatchModal(matchType);
                }
            },

            // ========================================
            // Memory Modal
            // ========================================

            /**
             * Close Memory Modal
             * Ersetzt: onclick="closeMemoryModal(event)"
             */
            'close-memory-modal': function(el, event) {
                if (typeof closeMemoryModal === 'function') {
                    closeMemoryModal(event);
                } else if (typeof window.closeMemoryModal === 'function') {
                    window.closeMemoryModal(event);
                } else {
                    var modal = document.getElementById('memoryModal');
                    if (modal) modal.style.display = 'none';
                }
            },

            /**
             * Close Memory Detail Modal
             * Ersetzt: onclick="closeMemoryDetailModal(event)"
             */
            'close-memory-detail-modal': function(el, event) {
                if (typeof closeMemoryDetailModal === 'function') {
                    closeMemoryDetailModal(event);
                } else if (typeof window.closeMemoryDetailModal === 'function') {
                    window.closeMemoryDetailModal(event);
                } else {
                    var modal = document.getElementById('memoryDetailModal');
                    if (modal) modal.style.display = 'none';
                }
            },

            // ========================================
            // Impressum Modal
            // ========================================

            /**
             * Open Impressum Modal
             * Ersetzt: onclick="document.getElementById('impressumModal').style.display='flex'"
             */
            'open-impressum-modal': function(el, event) {
                event.preventDefault();
                var modal = document.getElementById('impressumModal');
                if (modal) {
                    modal.style.display = 'flex';
                }
                return false;
            },

            /**
             * Close Impressum Modal
             * Ersetzt: onclick="this.style.display='none'"
             */
            'close-impressum-modal': function(el, event) {
                var modal = document.getElementById('impressumModal');
                if (modal) {
                    modal.style.display = 'none';
                }
            }
        });

        console.log('[ModalActions] Actions registriert');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
