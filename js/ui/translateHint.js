/**
 * TRANSLATE HINT
 *
 * Shows a subtle "Translate German content" pill for non-German users.
 * Some content (wisdom texts, reflexion) is only available in German.
 * Dismissed state persists for 30 days in localStorage.
 *
 * © 2025-2026 Ti-age.de All rights reserved.
 */

const TiageTranslateHint = (function() {
    'use strict';

    const DISMISSED_KEY = 'tiage_translate_hint_dismissed';
    const DISMISS_DAYS = 30;

    function isDismissed() {
        try {
            const val = localStorage.getItem(DISMISSED_KEY);
            if (!val) return false;
            const ts = parseInt(val, 10);
            return Date.now() - ts < DISMISS_DAYS * 86400 * 1000;
        } catch (e) { return false; }
    }

    function dismiss() {
        try { localStorage.setItem(DISMISSED_KEY, Date.now().toString()); } catch (e) {}
        const el = document.getElementById('tiage-translate-hint');
        if (el) el.remove();
    }

    function getTranslateUrl(lang) {
        const url = window.location.href;
        return `https://translate.google.com/translate?sl=de&tl=${lang}&u=${encodeURIComponent(url)}`;
    }

    function getLabelForLang(lang) {
        const labels = {
            en: 'Translate German content',
            fr: 'Traduire le contenu allemand',
            it: 'Traduci il contenuto tedesco',
            ru: 'Перевести немецкий контент',
            es: 'Traducir contenido alemán'
        };
        return labels[lang] || 'Translate German content';
    }

    function show(lang) {
        if (isDismissed()) return;
        if (document.getElementById('tiage-translate-hint')) return;

        const label = getLabelForLang(lang);
        const url = getTranslateUrl(lang);

        const el = document.createElement('div');
        el.id = 'tiage-translate-hint';
        el.innerHTML = `
            <a href="${url}" target="_blank" rel="noopener noreferrer"
               style="color:inherit;text-decoration:none;display:flex;align-items:center;gap:6px;">
                <span style="font-size:15px;">🌐</span>
                <span style="font-size:12px;font-weight:500;">${label}</span>
                <span style="font-size:11px;opacity:0.6;">↗</span>
            </a>
            <button onclick="TiageTranslateHint.dismiss()" title="Dismiss"
                    style="background:none;border:none;cursor:pointer;color:inherit;opacity:0.5;padding:0 0 0 6px;font-size:14px;line-height:1;">✕</button>
        `;
        Object.assign(el.style, {
            position: 'fixed',
            bottom: '72px',
            right: '16px',
            zIndex: '9000',
            background: 'rgba(30,30,40,0.92)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '20px',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            color: 'rgba(255,255,255,0.8)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.3s ease',
            maxWidth: '260px'
        });

        document.body.appendChild(el);
    }

    function init() {
        if (typeof TiageI18n === 'undefined') return;
        const lang = TiageI18n.getLanguage();
        if (lang === 'de') return;

        // Show after short delay to not interrupt page load
        setTimeout(function() { show(lang); }, 1500);

        // Update on language switch
        TiageI18n.subscribe(function(event) {
            const hint = document.getElementById('tiage-translate-hint');
            if (event.newLanguage === 'de') {
                if (hint) hint.remove();
            } else if (!isDismissed()) {
                if (hint) hint.remove();
                setTimeout(function() { show(event.newLanguage); }, 300);
            }
        });
    }

    // Auto-init when DOM is ready
    if (typeof window !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
        } else {
            init();
        }
    }

    return { init, dismiss };
})();

window.TiageTranslateHint = TiageTranslateHint;
