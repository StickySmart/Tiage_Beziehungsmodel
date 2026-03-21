/**
 * TIAGE Debug Inspector
 * Extracted from app-main.js
 *
 * Click-to-inspect element path & applied styles.
 * Self-executing IIFE — no exports needed.
 */

// DEBUG: Element Inspector — click to log element path & styles
(function initDebugger() {
    function getElementPath(el) {
        const path = [];
        while (el && el.nodeType === 1) {
            let selector = el.tagName.toLowerCase();
            if (el.id) {
                selector += '#' + el.id;
            } else if (el.className && typeof el.className === 'string') {
                const classes = el.className.trim().split(/\s+/).filter(c => c);
                if (classes.length) selector += '.' + classes.join('.');
            }
            path.unshift(selector);
            el = el.parentElement;
        }
        return path.join(' > ');
    }

    function getAppliedStyles(el) {
        const computed = window.getComputedStyle(el);
        return {
            display: computed.display,
            flexDirection: computed.flexDirection,
            gridTemplateColumns: computed.gridTemplateColumns,
            padding: computed.padding,
            background: computed.background,
            borderLeft: computed.borderLeft
        };
    }

    document.addEventListener('click', function(e) {
        const el = e.target;
        const path = getElementPath(el);
        const styles = getAppliedStyles(el);

        console.group('%c🔍 DEBUG: Element clicked', 'color: #8B5CF6; font-weight: bold;');
        console.log('%c📍 Path:', 'color: #22c55e;', path);
        console.log('%c🏷️ Tag:', 'color: #3b82f6;', el.tagName);
        console.log('%c🆔 ID:', 'color: #f59e0b;', el.id || '(none)');
        console.log('%c📋 Classes:', 'color: #ec4899;', el.className || '(none)');
        console.log('%c🎨 Styles:', 'color: #14b8a6;', styles);
        console.log('%c📦 Element:', 'color: #6366f1;', el);
        console.groupEnd();
    }, true);

    console.log('%c🐛 DEBUG MODE ACTIVE - Click any element to inspect', 'background: #8B5CF6; color: white; padding: 4px 8px; border-radius: 4px;');
})();
