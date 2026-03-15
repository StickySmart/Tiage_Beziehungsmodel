/**
 * TiageToast — Globales Toast/Snackbar System
 * ============================================
 * Ersetzt alle verstreuten showLockSavedToast / showMemoryToast Implementierungen.
 *
 * API:
 *   TiageToast.show(message, type, duration)
 *   TiageToast.success(message)
 *   TiageToast.info(message)
 *   TiageToast.warning(message)
 *   TiageToast.error(message)
 *
 * Types: 'success' | 'info' | 'warning' | 'error'
 */

var TiageToast = (function() {
    'use strict';

    var queue = [];
    var isShowing = false;

    function show(message, type, duration) {
        type = type || 'success';
        duration = duration || 2500;
        queue.push({ message: message, type: type, duration: duration });
        if (!isShowing) _next();
    }

    function _next() {
        if (queue.length === 0) {
            isShowing = false;
            return;
        }
        isShowing = true;
        var item = queue.shift();
        _render(item.message, item.type, item.duration);
    }

    function _render(message, type, duration) {
        var existing = document.querySelector('.tiage-toast');
        if (existing) existing.remove();

        var toast = document.createElement('div');
        toast.className = 'memory-toast tiage-toast ' + type;
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(function() {
            toast.classList.add('show');
        });

        setTimeout(function() {
            toast.classList.remove('show');
            setTimeout(function() {
                toast.remove();
                _next();
            }, 300);
        }, duration);
    }

    return {
        show:    function(msg, type, dur) { show(msg, type, dur); },
        success: function(msg, dur)       { show(msg, 'success', dur); },
        info:    function(msg, dur)       { show(msg, 'info', dur); },
        warning: function(msg, dur)       { show(msg, 'warning', dur); },
        error:   function(msg, dur)       { show(msg, 'error', dur); }
    };
})();

// Rückwärtskompatibilität: showMemoryToast leitet weiter
window.showMemoryToast = function(message, type) {
    TiageToast.show(message, type || 'success');
};

window.TiageToast = TiageToast;
