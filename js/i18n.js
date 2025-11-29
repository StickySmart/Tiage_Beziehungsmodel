/**
 * INTERNATIONALIZATION (i18n) MODULE
 *
 * Handles language switching between German and English.
 * Uses localStorage for persistence and provides reactive updates.
 *
 * © 2025 Ti-age.de All rights reserved.
 */

const TiageI18n = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // PRIVATE STATE
    // ═══════════════════════════════════════════════════════════════════════

    const STORAGE_KEY = 'tiage_language';
    const DEFAULT_LANGUAGE = 'de';
    const SUPPORTED_LANGUAGES = ['de', 'en'];

    let currentLanguage = DEFAULT_LANGUAGE;
    let currentLocale = null;
    const subscribers = [];

    // Locale references (loaded from external files)
    const locales = {
        de: typeof TiageLocale_DE !== 'undefined' ? TiageLocale_DE : null,
        en: typeof TiageLocale_EN !== 'undefined' ? TiageLocale_EN : null
    };

    // ═══════════════════════════════════════════════════════════════════════
    // HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Get value by dot-notation path
     * @param {Object} obj - The object to traverse
     * @param {string} path - Dot-notation path (e.g., 'ui.title')
     * @returns {*} The value at the path or undefined
     */
    function getByPath(obj, path) {
        if (!obj || !path) return undefined;
        const parts = path.split('.');
        let current = obj;
        for (const part of parts) {
            if (current === null || current === undefined) return undefined;
            current = current[part];
        }
        return current;
    }

    /**
     * Detect browser language preference
     * @returns {string} The detected language code or default
     */
    function detectBrowserLanguage() {
        if (typeof navigator === 'undefined') return DEFAULT_LANGUAGE;

        const browserLang = navigator.language || navigator.userLanguage || '';
        const langCode = browserLang.split('-')[0].toLowerCase();

        return SUPPORTED_LANGUAGES.includes(langCode) ? langCode : DEFAULT_LANGUAGE;
    }

    /**
     * Load language preference from storage
     * @returns {string} The stored language or null
     */
    function loadFromStorage() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored && SUPPORTED_LANGUAGES.includes(stored)) {
                return stored;
            }
        } catch (e) {
            console.warn('[TiageI18n] Failed to load from storage:', e);
        }
        return null;
    }

    /**
     * Save language preference to storage
     * @param {string} lang - The language code to save
     */
    function saveToStorage(lang) {
        try {
            localStorage.setItem(STORAGE_KEY, lang);
        } catch (e) {
            console.warn('[TiageI18n] Failed to save to storage:', e);
        }
    }

    /**
     * Notify all subscribers of language change
     * @param {string} newLang - The new language code
     * @param {string} oldLang - The previous language code
     */
    function notifySubscribers(newLang, oldLang) {
        const event = {
            newLanguage: newLang,
            oldLanguage: oldLang,
            locale: currentLocale,
            timestamp: Date.now()
        };

        subscribers.forEach(callback => {
            try {
                callback(event);
            } catch (e) {
                console.error('[TiageI18n] Subscriber error:', e);
            }
        });
    }

    /**
     * Update HTML lang attribute
     * @param {string} lang - The language code
     */
    function updateHtmlLang(lang) {
        if (typeof document !== 'undefined') {
            document.documentElement.lang = lang;
        }
    }

    /**
     * Get date locale string based on current language
     * @returns {string} The locale string (e.g., 'de-DE', 'en-US')
     */
    function getDateLocale() {
        return currentLanguage === 'de' ? 'de-DE' : 'en-US';
    }

    // ═══════════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════════

    function init() {
        // Priority: 1. Storage, 2. Browser detection, 3. Default
        const storedLang = loadFromStorage();
        const browserLang = detectBrowserLanguage();

        currentLanguage = storedLang || browserLang || DEFAULT_LANGUAGE;
        currentLocale = locales[currentLanguage];

        // Update HTML lang attribute
        updateHtmlLang(currentLanguage);

        console.log(`[TiageI18n] Initialized with language: ${currentLanguage}`);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        /**
         * Initialize the i18n system
         * Called automatically but can be called manually for re-init
         */
        init() {
            init();
        },

        /**
         * Get the current language code
         * @returns {string} Current language code ('de' or 'en')
         */
        getLanguage() {
            return currentLanguage;
        },

        /**
         * Set the current language
         * @param {string} lang - The language code ('de' or 'en')
         * @returns {boolean} True if successful
         */
        setLanguage(lang) {
            if (!SUPPORTED_LANGUAGES.includes(lang)) {
                console.warn(`[TiageI18n] Unsupported language: ${lang}`);
                return false;
            }

            if (lang === currentLanguage) {
                return true; // Already set
            }

            const oldLang = currentLanguage;
            currentLanguage = lang;
            currentLocale = locales[lang];

            // Persist to storage
            saveToStorage(lang);

            // Update HTML
            updateHtmlLang(lang);

            // Notify subscribers
            notifySubscribers(lang, oldLang);

            console.log(`[TiageI18n] Language changed: ${oldLang} -> ${lang}`);
            return true;
        },

        /**
         * Toggle between German and English
         * @returns {string} The new language code
         */
        toggle() {
            const newLang = currentLanguage === 'de' ? 'en' : 'de';
            this.setLanguage(newLang);
            return newLang;
        },

        /**
         * Get a translated string by path
         * @param {string} path - Dot-notation path (e.g., 'ui.title', 'archetypes.single.name')
         * @param {*} fallback - Fallback value if not found
         * @returns {*} The translated value or fallback
         */
        t(path, fallback = null) {
            if (!currentLocale) {
                console.warn('[TiageI18n] No locale loaded');
                return fallback || path;
            }

            const value = getByPath(currentLocale, path);

            if (value === undefined) {
                // Try German as fallback if current is English
                if (currentLanguage !== 'de' && locales.de) {
                    const deFallback = getByPath(locales.de, path);
                    if (deFallback !== undefined) return deFallback;
                }
                console.warn(`[TiageI18n] Missing translation: ${path}`);
                return fallback || path;
            }

            return value;
        },

        /**
         * Get the full current locale object
         * @returns {Object} The current locale object
         */
        getLocale() {
            return currentLocale;
        },

        /**
         * Get list of supported languages
         * @returns {Array} Array of supported language codes
         */
        getSupportedLanguages() {
            return [...SUPPORTED_LANGUAGES];
        },

        /**
         * Get language name by code
         * @param {string} code - The language code
         * @returns {string} The language name
         */
        getLanguageName(code) {
            const names = { de: 'Deutsch', en: 'English' };
            return names[code] || code;
        },

        /**
         * Subscribe to language changes
         * @param {Function} callback - Called with { newLanguage, oldLanguage, locale, timestamp }
         * @returns {Function} Unsubscribe function
         */
        subscribe(callback) {
            subscribers.push(callback);
            return () => {
                const index = subscribers.indexOf(callback);
                if (index > -1) {
                    subscribers.splice(index, 1);
                }
            };
        },

        /**
         * Format a date according to current language
         * @param {Date|string|number} date - The date to format
         * @param {Object} options - Intl.DateTimeFormat options
         * @returns {string} Formatted date string
         */
        formatDate(date, options = {}) {
            const dateObj = date instanceof Date ? date : new Date(date);
            const locale = getDateLocale();
            const defaultOptions = { day: '2-digit', month: '2-digit', year: 'numeric' };
            return dateObj.toLocaleDateString(locale, { ...defaultOptions, ...options });
        },

        /**
         * Format a number according to current language
         * @param {number} number - The number to format
         * @param {Object} options - Intl.NumberFormat options
         * @returns {string} Formatted number string
         */
        formatNumber(number, options = {}) {
            const locale = getDateLocale();
            return new Intl.NumberFormat(locale, options).format(number);
        },

        /**
         * Get date locale string
         * @returns {string} The locale string (e.g., 'de-DE', 'en-US')
         */
        getDateLocale() {
            return getDateLocale();
        },

        /**
         * Register a locale (for dynamic loading)
         * @param {string} code - Language code
         * @param {Object} locale - Locale object
         */
        registerLocale(code, locale) {
            locales[code] = locale;
            if (!SUPPORTED_LANGUAGES.includes(code)) {
                SUPPORTED_LANGUAGES.push(code);
            }
        },

        /**
         * Check if a language is supported
         * @param {string} lang - Language code
         * @returns {boolean} True if supported
         */
        isSupported(lang) {
            return SUPPORTED_LANGUAGES.includes(lang);
        },

        /**
         * Debug: Log current state
         */
        debug() {
            console.log('[TiageI18n] Debug:', {
                currentLanguage,
                supportedLanguages: SUPPORTED_LANGUAGES,
                subscriberCount: subscribers.length,
                localesLoaded: Object.keys(locales).filter(k => locales[k] !== null)
            });
        }
    };
})();

// Auto-initialize when locales are available
if (typeof window !== 'undefined') {
    // Wait for DOM and locales to be ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => TiageI18n.init());
    } else {
        TiageI18n.init();
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageI18n;
}
