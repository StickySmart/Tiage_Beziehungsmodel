/**
 * DOM UTILITIES
 *
 * Helper-Funktionen für DOM-Manipulation.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const TiageDom = (function() {
    'use strict';

    return {
        /**
         * Element sicher selektieren
         */
        $(selector, context = document) {
            return context.querySelector(selector);
        },

        /**
         * Alle Elemente selektieren
         */
        $$(selector, context = document) {
            return [...context.querySelectorAll(selector)];
        },

        /**
         * Element erstellen mit Attributen
         */
        create(tag, attrs = {}, children = []) {
            const el = document.createElement(tag);

            for (const [key, value] of Object.entries(attrs)) {
                if (key === 'className') {
                    el.className = value;
                } else if (key === 'innerHTML') {
                    el.innerHTML = value;
                } else if (key === 'textContent') {
                    el.textContent = value;
                } else if (key.startsWith('on')) {
                    el.addEventListener(key.slice(2).toLowerCase(), value);
                } else if (key === 'dataset') {
                    for (const [dataKey, dataValue] of Object.entries(value)) {
                        el.dataset[dataKey] = dataValue;
                    }
                } else {
                    el.setAttribute(key, value);
                }
            }

            for (const child of children) {
                if (typeof child === 'string') {
                    el.appendChild(document.createTextNode(child));
                } else if (child instanceof Node) {
                    el.appendChild(child);
                }
            }

            return el;
        },

        /**
         * HTML escapen
         */
        escapeHtml(text) {
            if (!text) return '';
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        },

        /**
         * Element leeren
         */
        empty(el) {
            if (typeof el === 'string') el = this.$(el);
            if (el) el.innerHTML = '';
            return el;
        },

        /**
         * Klasse hinzufügen/entfernen
         */
        toggleClass(el, className, force) {
            if (typeof el === 'string') el = this.$(el);
            if (el) el.classList.toggle(className, force);
            return el;
        },

        /**
         * Element anzeigen
         */
        show(el) {
            if (typeof el === 'string') el = this.$(el);
            if (el) el.style.display = '';
            return el;
        },

        /**
         * Element verstecken
         */
        hide(el) {
            if (typeof el === 'string') el = this.$(el);
            if (el) el.style.display = 'none';
            return el;
        },

        /**
         * Event-Listener mit Delegation
         */
        on(parent, eventType, selector, handler) {
            if (typeof parent === 'string') parent = this.$(parent);
            if (!parent) return;

            parent.addEventListener(eventType, (e) => {
                const target = e.target.closest(selector);
                if (target && parent.contains(target)) {
                    handler.call(target, e, target);
                }
            });
        },

        /**
         * Einmaliger Event-Listener
         */
        once(el, eventType, handler) {
            if (typeof el === 'string') el = this.$(el);
            if (!el) return;

            el.addEventListener(eventType, handler, { once: true });
        },

        /**
         * Scroll zu Element
         */
        scrollTo(el, options = { behavior: 'smooth', block: 'start' }) {
            if (typeof el === 'string') el = this.$(el);
            if (el) el.scrollIntoView(options);
        },

        /**
         * Element in Viewport?
         */
        isInViewport(el) {
            if (typeof el === 'string') el = this.$(el);
            if (!el) return false;

            const rect = el.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },

        /**
         * Animation Frame wrapper
         */
        nextFrame(callback) {
            requestAnimationFrame(() => requestAnimationFrame(callback));
        },

        /**
         * Debounce
         */
        debounce(fn, delay = 250) {
            let timer;
            return function(...args) {
                clearTimeout(timer);
                timer = setTimeout(() => fn.apply(this, args), delay);
            };
        },

        /**
         * Throttle
         */
        throttle(fn, limit = 250) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    fn.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    };
})();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageDom;
}
