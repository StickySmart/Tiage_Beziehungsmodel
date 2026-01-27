/**
 * TIAGE EventBus - Zentrales Event-System
 *
 * Ermöglicht lose Kopplung zwischen Modulen durch Pub/Sub-Pattern.
 * Teil des Refactoring-Plans v2.0 - Phase 2.
 *
 * Verwendung:
 *   EventBus.on('modal:open', (data) => console.log('Modal opened:', data));
 *   EventBus.emit('modal:open', { modal: 'comment' });
 *   EventBus.off('modal:open', handler);
 *
 * @version 1.0.0
 * @since 2026-01-26
 */
var EventBus = (function() {
    'use strict';

    // Private: Event-Handler-Registry
    var handlers = {};

    /**
     * Registriert einen Event-Handler
     * @param {string} event - Event-Name (z.B. 'modal:open', 'archetype:selected')
     * @param {Function} callback - Handler-Funktion
     * @returns {Function} Unsubscribe-Funktion
     */
    function on(event, callback) {
        if (typeof callback !== 'function') {
            console.warn('[EventBus] Callback muss eine Funktion sein:', event);
            return function() {};
        }

        if (!handlers[event]) {
            handlers[event] = [];
        }
        handlers[event].push(callback);

        // Rückgabe: Unsubscribe-Funktion
        return function unsubscribe() {
            off(event, callback);
        };
    }

    /**
     * Registriert einen einmaligen Event-Handler
     * @param {string} event - Event-Name
     * @param {Function} callback - Handler-Funktion
     * @returns {Function} Unsubscribe-Funktion
     */
    function once(event, callback) {
        function wrapper(data) {
            off(event, wrapper);
            callback(data);
        }
        return on(event, wrapper);
    }

    /**
     * Entfernt einen Event-Handler
     * @param {string} event - Event-Name
     * @param {Function} callback - Die zu entfernende Handler-Funktion
     */
    function off(event, callback) {
        if (!handlers[event]) return;

        if (callback) {
            handlers[event] = handlers[event].filter(function(cb) {
                return cb !== callback;
            });
        } else {
            // Ohne Callback: Alle Handler für dieses Event entfernen
            delete handlers[event];
        }
    }

    /**
     * Löst ein Event aus
     * @param {string} event - Event-Name
     * @param {*} data - Daten, die an Handler übergeben werden
     */
    function emit(event, data) {
        if (!handlers[event]) return;

        handlers[event].forEach(function(callback) {
            try {
                callback(data);
            } catch (error) {
                console.error('[EventBus] Fehler in Handler für "' + event + '":', error);
            }
        });
    }

    /**
     * Prüft ob Handler für ein Event registriert sind
     * @param {string} event - Event-Name
     * @returns {boolean}
     */
    function hasListeners(event) {
        return !!(handlers[event] && handlers[event].length > 0);
    }

    /**
     * Entfernt alle Event-Handler (für Tests/Reset)
     */
    function clear() {
        handlers = {};
    }

    /**
     * Debug: Gibt alle registrierten Events aus
     * @returns {Object} Event-Namen mit Anzahl der Handler
     */
    function debug() {
        var result = {};
        Object.keys(handlers).forEach(function(event) {
            result[event] = handlers[event].length;
        });
        return result;
    }

    // Öffentliche API
    return {
        on: on,
        once: once,
        off: off,
        emit: emit,
        hasListeners: hasListeners,
        clear: clear,
        debug: debug
    };
})();

// Für Module die EventBus importieren wollen
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EventBus;
}
