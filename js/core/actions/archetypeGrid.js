/**
 * TIAGE Archetype Grid Actions
 *
 * Registriert Actions für Archetyp-Auswahl und Navigation.
 * Teil des Refactoring-Plans v2.0 - Phase 2.10.
 *
 * @version 1.0.0
 * @since 2026-01-27
 */
(function() {
    'use strict';

    function registerActions() {
        if (typeof ActionHandler === 'undefined') {
            console.warn('[ArchetypeGridActions] ActionHandler nicht verfügbar, retry in 100ms');
            setTimeout(registerActions, 100);
            return;
        }

        ActionHandler.registerAll({
            /**
             * Wählt einen Archetyp aus dem Grid
             * Ersetzt: onclick="selectArchetypeFromGrid('ich', 'single')"
             * data-person: 'ich' oder 'partner'
             * data-archetype: Archetyp-Code
             */
            'select-archetype': function(el, event) {
                var person = el.dataset.person;
                var archetype = el.dataset.archetype;
                if (typeof selectArchetypeFromGrid === 'function') {
                    selectArchetypeFromGrid(person, archetype);
                } else if (typeof window.selectArchetypeFromGrid === 'function') {
                    window.selectArchetypeFromGrid(person, archetype);
                } else {
                    console.error('[ArchetypeGridActions] selectArchetypeFromGrid() nicht gefunden');
                }
            },

            /**
             * Navigiert zum vorherigen/nächsten Archetyp
             * Ersetzt: onclick="navigateArchetype('ich', -1)"
             * data-person: 'ich' oder 'partner'
             * data-direction: -1 oder 1
             */
            'navigate-archetype': function(el, event) {
                var person = el.dataset.person || 'ich';
                var direction = parseInt(el.dataset.direction, 10) || 1;
                if (typeof navigateArchetype === 'function') {
                    navigateArchetype(person, direction);
                } else if (typeof window.navigateArchetype === 'function') {
                    window.navigateArchetype(person, direction);
                } else {
                    console.error('[ArchetypeGridActions] navigateArchetype() nicht gefunden');
                }
            },

            /**
             * Zeigt Info zum aktuellen Archetyp
             * Ersetzt: onclick="showArchetypeInfo('ich')"
             * data-person: 'ich' oder 'partner'
             */
            'show-archetype-info': function(el, event) {
                var person = el.dataset.person || 'ich';
                if (typeof showArchetypeInfo === 'function') {
                    showArchetypeInfo(person);
                } else if (typeof window.showArchetypeInfo === 'function') {
                    window.showArchetypeInfo(person);
                } else {
                    console.error('[ArchetypeGridActions] showArchetypeInfo() nicht gefunden');
                }
            }
        });

        console.log('[ArchetypeGridActions] Actions registriert');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
