/**
 * TIAGE ActionHandler - Zentraler Click-Handler für data-action Attribute
 *
 * Ersetzt onclick-Attribute durch Event-Delegation.
 * Teil des Refactoring-Plans v2.0 - Phase 2.
 *
 * HTML-Verwendung:
 *   <button data-action="open-modal" data-modal="comment">Kommentar</button>
 *   <button data-action="navigate-archetype" data-person="ich" data-direction="1">→</button>
 *
 * JS-Registrierung:
 *   ActionHandler.register('open-modal', (el, event) => {
 *       const modalName = el.dataset.modal;
 *       openModal(modalName);
 *   });
 *
 * @version 1.0.0
 * @since 2026-01-26
 */
var ActionHandler = (function() {
    'use strict';

    // Private: Registrierte Actions
    var actions = {};

    // Private: Ist bereits initialisiert?
    var initialized = false;

    /**
     * Registriert eine Action
     * @param {string} name - Action-Name (z.B. 'open-modal', 'close-modal')
     * @param {Function} handler - Handler-Funktion(element, event)
     */
    function register(name, handler) {
        if (typeof handler !== 'function') {
            console.warn('[ActionHandler] Handler muss eine Funktion sein:', name);
            return;
        }
        actions[name] = handler;
    }

    /**
     * Registriert mehrere Actions auf einmal
     * @param {Object} actionMap - Objekt mit action-name: handler Paaren
     */
    function registerAll(actionMap) {
        Object.keys(actionMap).forEach(function(name) {
            register(name, actionMap[name]);
        });
    }

    /**
     * Entfernt eine Action
     * @param {string} name - Action-Name
     */
    function unregister(name) {
        delete actions[name];
    }

    /**
     * Führt eine Action manuell aus
     * @param {string} name - Action-Name
     * @param {HTMLElement} element - Das auslösende Element
     * @param {Event} event - Das Event-Objekt
     */
    function execute(name, element, event) {
        if (!actions[name]) {
            console.warn('[ActionHandler] Unbekannte Action:', name);
            return false;
        }

        try {
            actions[name](element, event);
            return true;
        } catch (error) {
            console.error('[ActionHandler] Fehler bei Action "' + name + '":', error);
            return false;
        }
    }

    /**
     * Zentraler Click-Handler (Event-Delegation)
     * @param {Event} event - Das Click-Event
     */
    function handleClick(event) {
        // Finde das nächste Element mit data-action
        var actionEl = event.target.closest('[data-action]');
        if (!actionEl) return;

        // Prüfe ob das Klick-Ziel (oder ein Parent bis zum actionEl) data-stop-propagation hat
        // In diesem Fall: Action NICHT ausführen, damit Links normal funktionieren
        var stopEl = event.target.closest('[data-stop-propagation]');
        if (stopEl && actionEl.contains(stopEl)) {
            // Das geklickte Element (oder Parent) hat data-stop-propagation
            // und ist innerhalb des action-Elements → ignoriere die Action
            return;
        }

        var action = actionEl.dataset.action;
        if (!action) return;

        // Prüfe ob Action registriert ist
        if (!actions[action]) {
            console.warn('[ActionHandler] Unregistrierte Action:', action);
            return;
        }

        // Verhindere Default nur wenn Action existiert
        event.preventDefault();

        // Führe Action aus
        execute(action, actionEl, event);
    }

    /**
     * Behandelt data-stop-propagation Attribut
     * @param {Event} event - Das Click-Event
     */
    function handleStopPropagation(event) {
        var stopEl = event.target.closest('[data-stop-propagation]');
        if (stopEl && stopEl.contains(event.target)) {
            // Nur stoppen wenn das Ziel innerhalb des Elements ist
            // aber nicht das Element selbst (für Modal-Overlays)
            if (event.target !== stopEl.parentElement) {
                event.stopPropagation();
            }
        }
    }

    /**
     * Initialisiert den ActionHandler
     * Sollte einmal bei DOMContentLoaded aufgerufen werden
     */
    function init() {
        if (initialized) {
            console.warn('[ActionHandler] Bereits initialisiert');
            return;
        }

        // Event-Delegation auf document-Ebene
        document.addEventListener('click', function(event) {
            handleStopPropagation(event);
            handleClick(event);
        }, false);

        initialized = true;
        console.log('[ActionHandler] Initialisiert');
    }

    /**
     * Prüft ob eine Action registriert ist
     * @param {string} name - Action-Name
     * @returns {boolean}
     */
    function hasAction(name) {
        return !!actions[name];
    }

    /**
     * Debug: Gibt alle registrierten Actions aus
     * @returns {string[]} Liste der Action-Namen
     */
    function debug() {
        return Object.keys(actions);
    }

    // Öffentliche API
    return {
        register: register,
        registerAll: registerAll,
        unregister: unregister,
        execute: execute,
        init: init,
        hasAction: hasAction,
        debug: debug
    };
})();

// Auto-Init bei DOMContentLoaded
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', ActionHandler.init);
    } else {
        // DOM bereits geladen
        ActionHandler.init();
    }
}

// Für Module die ActionHandler importieren wollen
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ActionHandler;
}
