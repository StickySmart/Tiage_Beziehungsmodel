/**
 * analytics.js — Tiage GA4 Event Tracking
 * Tracks key user interactions via window.gtag (Google Tag G-LQ0GEG4W7B)
 */
(function () {
    'use strict';

    function track(eventName, params) {
        if (typeof window.gtag !== 'function') return;
        window.gtag('event', eventName, params || {});
    }

    // ── Archetyp-Auswahl ───────────────────────────────────────────────────
    // Wird von TiageState-Subscribern aufgerufen
    if (typeof TiageState !== 'undefined') {
        TiageState.subscribe('archetypes.ich', function (event) {
            const val = typeof event.newValue === 'string'
                ? event.newValue
                : (event.newValue && event.newValue.primary);
            if (val) track('select_ich_archetyp', { archetyp: val });
        });

        TiageState.subscribe('archetypes.partner', function (event) {
            const val = typeof event.newValue === 'string'
                ? event.newValue
                : (event.newValue && event.newValue.primary);
            if (val) track('select_partner_archetyp', { archetyp: val });
        });
    }

    // ── Best-Match-Finder ──────────────────────────────────────────────────
    // Patch auf window.findBestPartnerMatch nach DOM-Ready
    document.addEventListener('DOMContentLoaded', function () {
        // Warten bis alle Module geladen sind
        setTimeout(function () {
            // Best Match Partner
            const origBestPartner = window.findBestPartnerMatch;
            if (typeof origBestPartner === 'function') {
                window.findBestPartnerMatch = function () {
                    track('use_best_match_partner');
                    return origBestPartner.apply(this, arguments);
                };
            }

            // Best Match Ich
            const origBestIch = window.findBestIchMatch;
            if (typeof origBestIch === 'function') {
                window.findBestIchMatch = function () {
                    track('use_best_match_ich');
                    return origBestIch.apply(this, arguments);
                };
            }
        }, 1000);
    });

    // ── Modal-Tracking via ActionHandler ──────────────────────────────────
    // Lauscht auf data-action Klicks im gesamten Dokument
    document.addEventListener('click', function (e) {
        const el = e.target.closest('[data-action]');
        if (!el) return;
        const action = el.getAttribute('data-action');

        const tracked = {
            'open-synthese-modal':      'open_modal_synthese',
            'open-factor-modal':        'open_modal_factor',
            'open-procontra-modal':     'open_modal_procontra',
            'open-pathos-logos-modal':  'open_modal_pathos_logos',
            'open-needs-compare-modal': 'open_modal_needs_compare',
            'open-category-modal':      'open_modal_category',
            'open-match-modal':         'open_modal_match',
            'find-best-partner':        'use_best_match_partner',
            'find-best-ich':            'use_best_match_ich',
            'reset-all':                'reset_all',
        };

        if (tracked[action]) {
            const params = {};
            if (el.dataset.factorType) params.factor = el.dataset.factorType;
            if (el.dataset.category)   params.category = el.dataset.category;
            track(tracked[action], params);
        }
    }, { capture: true });

    // ── Mobile Seitenwechsel ───────────────────────────────────────────────
    // Patch navigateNext / navigatePrev nach Load
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(function () {
            ['navigateNext', 'navigatePrev'].forEach(function (fn) {
                const orig = window[fn];
                if (typeof orig !== 'function') return;
                window[fn] = function () {
                    const page = typeof window.currentMobilePage === 'number'
                        ? window.currentMobilePage : '?';
                    track('mobile_navigate', { fn: fn, page: page });
                    return orig.apply(this, arguments);
                };
            });
        }, 1000);
    });

    // ── Sprach-Toggle ─────────────────────────────────────────────────────
    const origUpdateTranslations = window.updateAllTranslations;
    if (typeof origUpdateTranslations === 'function') {
        window.updateAllTranslations = function (lang) {
            track('change_language', { language: lang || 'unknown' });
            return origUpdateTranslations.apply(this, arguments);
        };
    }

    window.TiageAnalytics = { track: track };
    console.log('[analytics] Tiage GA4 Tracking aktiv');
})();
