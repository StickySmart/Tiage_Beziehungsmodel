/**
 * Ti-Age Performance Utilities
 * Verhindert UI-Freezes durch intelligentes Chunking und Scheduling
 */

window.TiagePerformance = (function() {
    'use strict';

    // Throttle-Map für verschiedene Funktionen
    const throttleTimers = new Map();
    const debounceTimers = new Map();

    /**
     * Throttle: Führt Funktion höchstens alle `wait` ms aus
     */
    function throttle(key, func, wait) {
        if (throttleTimers.has(key)) {
            return; // Bereits in Wartezeit
        }

        func();
        throttleTimers.set(key, setTimeout(function() {
            throttleTimers.delete(key);
        }, wait));
    }

    /**
     * Debounce: Führt Funktion erst nach `wait` ms Ruhe aus
     */
    function debounce(key, func, wait) {
        if (debounceTimers.has(key)) {
            clearTimeout(debounceTimers.get(key));
        }

        debounceTimers.set(key, setTimeout(function() {
            debounceTimers.delete(key);
            func();
        }, wait));
    }

    /**
     * requestIdleCallback Polyfill mit Fallback
     */
    const requestIdle = window.requestIdleCallback || function(cb) {
        const start = Date.now();
        return setTimeout(function() {
            cb({
                didTimeout: false,
                timeRemaining: function() {
                    return Math.max(0, 50 - (Date.now() - start));
                }
            });
        }, 1);
    };

    const cancelIdle = window.cancelIdleCallback || clearTimeout;

    /**
     * Führt Arbeit in Chunks aus, um UI-Freezes zu vermeiden
     * @param {Array} items - Zu verarbeitende Elemente
     * @param {Function} processItem - Funktion für jedes Element
     * @param {Function} onComplete - Callback nach Abschluss
     * @param {number} chunkSize - Elemente pro Chunk (default: 10)
     */
    function processInChunks(items, processItem, onComplete, chunkSize) {
        chunkSize = chunkSize || 10;
        let index = 0;
        const results = [];

        function processChunk(deadline) {
            // Verarbeite Elemente solange Zeit übrig ist
            while (index < items.length && (deadline.timeRemaining() > 0 || deadline.didTimeout)) {
                try {
                    results.push(processItem(items[index], index));
                } catch (e) {
                    console.warn('[Performance] Chunk processing error:', e);
                    results.push(null);
                }
                index++;

                // Nach chunkSize Elementen pausieren
                if (index % chunkSize === 0) break;
            }

            if (index < items.length) {
                // Mehr Arbeit übrig - nächsten Chunk planen
                requestIdle(processChunk, { timeout: 100 });
            } else if (typeof onComplete === 'function') {
                // Fertig - Callback aufrufen
                onComplete(results);
            }
        }

        if (items.length === 0) {
            if (typeof onComplete === 'function') {
                onComplete([]);
            }
            return;
        }

        requestIdle(processChunk, { timeout: 100 });
    }

    /**
     * Führt eine Funktion aus, wenn der Browser idle ist
     * @param {Function} func - Auszuführende Funktion
     * @param {Object} options - Optionen (timeout)
     */
    function whenIdle(func, options) {
        options = options || { timeout: 1000 };
        return requestIdle(function(deadline) {
            try {
                func(deadline);
            } catch (e) {
                console.warn('[Performance] whenIdle error:', e);
            }
        }, options);
    }

    /**
     * Verzögert DOM-Batch-Updates für bessere Performance
     * @param {Function} updateFunc - DOM-Update-Funktion
     */
    function batchDOMUpdate(updateFunc) {
        if (window.requestAnimationFrame) {
            window.requestAnimationFrame(function() {
                updateFunc();
            });
        } else {
            updateFunc();
        }
    }

    /**
     * Misst die Ausführungszeit einer Funktion
     * @param {string} label - Log-Label
     * @param {Function} func - Zu messende Funktion
     */
    function measureTime(label, func) {
        const start = performance.now();
        const result = func();
        const duration = performance.now() - start;

        if (duration > 50) {
            console.warn('[Performance] Slow operation "' + label + '":', duration.toFixed(2) + 'ms');
        }

        return result;
    }

    /**
     * Erstellt eine gecachte Version einer Funktion
     * @param {Function} func - Zu cachende Funktion
     * @param {Function} keyFn - Funktion zur Schlüsselerzeugung
     */
    function memoize(func, keyFn) {
        const cache = new Map();
        const MAX_CACHE_SIZE = 100;

        return function() {
            const args = Array.prototype.slice.call(arguments);
            const key = keyFn ? keyFn.apply(null, args) : JSON.stringify(args);

            if (cache.has(key)) {
                return cache.get(key);
            }

            const result = func.apply(this, args);

            // Cache-Größe begrenzen
            if (cache.size >= MAX_CACHE_SIZE) {
                const firstKey = cache.keys().next().value;
                cache.delete(firstKey);
            }

            cache.set(key, result);
            return result;
        };
    }

    /**
     * Prüft ob der Main Thread blockiert ist
     */
    let lastFrameTime = 0;
    let frameDrops = 0;

    function monitorFrameDrops() {
        const now = performance.now();
        if (lastFrameTime > 0) {
            const delta = now - lastFrameTime;
            if (delta > 50) { // Mehr als 50ms = dropped frame
                frameDrops++;
                if (frameDrops % 10 === 0) {
                    console.warn('[Performance] Frame drops detected:', frameDrops);
                }
            }
        }
        lastFrameTime = now;
        requestAnimationFrame(monitorFrameDrops);
    }

    // Optional: Frame-Monitoring starten (deaktiviert für Produktion)
    // monitorFrameDrops();

    return {
        throttle: throttle,
        debounce: debounce,
        processInChunks: processInChunks,
        whenIdle: whenIdle,
        batchDOMUpdate: batchDOMUpdate,
        measureTime: measureTime,
        memoize: memoize,
        requestIdle: requestIdle,
        cancelIdle: cancelIdle
    };
})();

console.log('[Performance] TiagePerformance utilities loaded');
