/**
 * TIAGE Status Toggles Actions
 *
 * Registriert Actions für Dominanz/Orientierung Status Toggles und Mobile Navigation.
 * Teil des Refactoring-Plans v2.0 - Phase 2.11.
 *
 * @version 1.0.0
 * @since 2026-01-27
 */
(function() {
    'use strict';

    function registerActions() {
        if (typeof ActionHandler === 'undefined') {
            console.warn('[StatusTogglesActions] ActionHandler nicht verfügbar, retry in 100ms');
            setTimeout(registerActions, 100);
            return;
        }

        ActionHandler.registerAll({
            /**
             * Dominanz Status Toggle
             * Ersetzt: onclick="handleDominanzStatusToggle('ich', 'dominant', 'gelebt', this)"
             * data-person: 'ich' oder 'partner'
             * data-type: 'dominant', 'submissiv', 'switch', 'ausgeglichen'
             * data-status: 'gelebt', 'interessiert'
             */
            'dominanz-status-toggle': function(el, event) {
                var person = el.dataset.person;
                var type = el.dataset.type;
                var status = el.dataset.status;
                if (typeof handleDominanzStatusToggle === 'function') {
                    handleDominanzStatusToggle(person, type, status, el);
                } else if (typeof window.handleDominanzStatusToggle === 'function') {
                    window.handleDominanzStatusToggle(person, type, status, el);
                }
            },

            /**
             * Orientierung Status Toggle
             * Ersetzt: onclick="handleOrientierungStatusToggle('ich', 'heterosexuell', 'primaer', this)"
             * data-person: 'ich' oder 'partner'
             * data-type: 'heterosexuell', 'gay_lesbisch', 'bisexuell', etc.
             * data-status: 'primaer', 'sekundaer'
             */
            'orientierung-status-toggle': function(el, event) {
                var person = el.dataset.person;
                var type = el.dataset.type;
                var status = el.dataset.status;
                if (typeof handleOrientierungStatusToggle === 'function') {
                    handleOrientierungStatusToggle(person, type, status, el);
                } else if (typeof window.handleOrientierungStatusToggle === 'function') {
                    window.handleOrientierungStatusToggle(person, type, status, el);
                }
            },

            /**
             * Toggle Dimension Collapse
             * Ersetzt: onclick="toggleDimensionCollapse(this.parentElement)"
             */
            'toggle-dimension-collapse': function(el, event) {
                var parent = el.parentElement;
                if (typeof toggleDimensionCollapse === 'function') {
                    toggleDimensionCollapse(parent);
                } else if (typeof window.toggleDimensionCollapse === 'function') {
                    window.toggleDimensionCollapse(parent);
                }
            },

            /**
             * Mobile Go To Page
             * Ersetzt: onclick="mobileGoToPage(2)"
             * data-page: Seitennummer
             */
            'mobile-go-to-page': function(el, event) {
                var page = parseInt(el.dataset.page, 10) || 1;
                if (typeof mobileGoToPage === 'function') {
                    mobileGoToPage(page);
                } else if (typeof window.mobileGoToPage === 'function') {
                    window.mobileGoToPage(page);
                }
            },

            /**
             * Open Archetype Info (mobile version)
             * Ersetzt: onclick="openArchetypeInfo(select.value, 'ich')"
             * data-person: 'ich' oder 'partner'
             * data-select-id: ID des Select-Elements
             */
            'open-archetype-info': function(el, event) {
                var person = el.dataset.person || 'ich';
                var selectId = el.dataset.selectId;
                var archetype = selectId ? document.getElementById(selectId)?.value : null;
                if (typeof openArchetypeInfo === 'function') {
                    openArchetypeInfo(archetype, person);
                } else if (typeof window.openArchetypeInfo === 'function') {
                    window.openArchetypeInfo(archetype, person);
                }
            },

            /**
             * Age Verification Confirm
             * Ersetzt: onclick="window.confirmAge(true); return false;"
             * data-confirm: 'true' oder 'false'
             */
            'confirm-age': function(el, event) {
                event.preventDefault();
                var confirm = el.dataset.confirm === 'true';
                if (typeof window.confirmAge === 'function') {
                    window.confirmAge(confirm);
                }
                return false;
            }
        });

        console.log('[StatusTogglesActions] Actions registriert');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
