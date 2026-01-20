/**
 * LAZY LANGUAGE LOADER
 *
 * Lädt Sprachdateien nur bei Bedarf.
 * Spart ~70KB beim initialen Laden (eine Sprache statt zwei).
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const TiageLocaleLoader = (function() {
    'use strict';

    const STORAGE_KEY = 'tiage_language';
    const DEFAULT_LANGUAGE = 'de';
    const SUPPORTED_LANGUAGES = ['de', 'en'];

    // Cache für geladene Locales
    const loadedLocales = {};
    const loadingPromises = {};

    /**
     * Erkennt die bevorzugte Sprache
     */
    function detectLanguage() {
        // 1. Aus TiageState
        if (typeof TiageState !== 'undefined') {
            const stored = TiageState.get('ui.language');
            if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
                return stored;
            }
        }

        // 2. Aus localStorage
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
                return stored;
            }
        } catch (e) { /* ignore */ }

        // 3. Browser-Sprache
        if (typeof navigator !== 'undefined') {
            const browserLang = (navigator.language || navigator.userLanguage || '').split('-')[0].toLowerCase();
            if (SUPPORTED_LANGUAGES.includes(browserLang)) {
                return browserLang;
            }
        }

        return DEFAULT_LANGUAGE;
    }

    /**
     * Lädt eine Sprachdatei dynamisch
     */
    function loadLocale(lang) {
        // Bereits geladen?
        if (loadedLocales[lang]) {
            return Promise.resolve(loadedLocales[lang]);
        }

        // Bereits am Laden?
        if (loadingPromises[lang]) {
            return loadingPromises[lang];
        }

        // Prüfe ob bereits global verfügbar (falls synchron geladen)
        if (lang === 'de' && typeof TiageLocale_DE !== 'undefined') {
            loadedLocales.de = TiageLocale_DE;
            return Promise.resolve(TiageLocale_DE);
        }
        if (lang === 'en' && typeof TiageLocale_EN !== 'undefined') {
            loadedLocales.en = TiageLocale_EN;
            return Promise.resolve(TiageLocale_EN);
        }

        // Dynamisch laden
        const scriptUrl = `js/locales/${lang}.js`;

        loadingPromises[lang] = new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = scriptUrl;
            script.async = true;

            script.onload = function() {
                // Nach dem Laden ist die globale Variable verfügbar
                const locale = lang === 'de' ? window.TiageLocale_DE : window.TiageLocale_EN;
                if (locale) {
                    loadedLocales[lang] = locale;
                    console.log(`[LocaleLoader] Sprache '${lang}' geladen (${Math.round(JSON.stringify(locale).length / 1024)}KB)`);
                    resolve(locale);
                } else {
                    reject(new Error(`Locale ${lang} nicht gefunden nach Laden`));
                }
                delete loadingPromises[lang];
            };

            script.onerror = function() {
                console.error(`[LocaleLoader] Fehler beim Laden von '${lang}'`);
                delete loadingPromises[lang];
                reject(new Error(`Konnte ${scriptUrl} nicht laden`));
            };

            document.head.appendChild(script);
        });

        return loadingPromises[lang];
    }

    /**
     * Lädt die initiale Sprache (basierend auf Präferenz)
     */
    async function loadInitialLocale() {
        const lang = detectLanguage();
        console.log(`[LocaleLoader] Initiale Sprache: ${lang}`);

        try {
            const locale = await loadLocale(lang);
            return { lang, locale };
        } catch (e) {
            // Fallback zu Deutsch
            if (lang !== 'de') {
                console.warn(`[LocaleLoader] Fallback zu Deutsch`);
                const locale = await loadLocale('de');
                return { lang: 'de', locale };
            }
            throw e;
        }
    }

    /**
     * Gibt gecachtes Locale zurück (synchron, wenn bereits geladen)
     */
    function getLocale(lang) {
        return loadedLocales[lang] || null;
    }

    /**
     * Prüft ob eine Sprache bereits geladen ist
     */
    function isLoaded(lang) {
        return !!loadedLocales[lang];
    }

    return {
        detectLanguage,
        loadLocale,
        loadInitialLocale,
        getLocale,
        isLoaded,
        SUPPORTED_LANGUAGES,
        DEFAULT_LANGUAGE
    };
})();

// Für globalen Zugriff
window.TiageLocaleLoader = TiageLocaleLoader;

console.log('[LocaleLoader] Lazy Language Loader initialisiert');
