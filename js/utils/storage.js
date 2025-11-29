/**
 * STORAGE UTILITIES
 *
 * localStorage Abstraktion mit Fehlerbehandlung.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const TiageStorage = (function() {
    'use strict';

    const PREFIX = 'tiage_';

    /**
     * Prüft ob localStorage verfügbar ist
     */
    function isAvailable() {
        try {
            const test = '__storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }

    const available = isAvailable();

    return {
        /**
         * Wert speichern
         */
        set(key, value) {
            if (!available) return false;
            try {
                const serialized = JSON.stringify(value);
                localStorage.setItem(PREFIX + key, serialized);
                return true;
            } catch (e) {
                console.warn('[TiageStorage] Set failed:', key, e);
                return false;
            }
        },

        /**
         * Wert laden
         */
        get(key, defaultValue = null) {
            if (!available) return defaultValue;
            try {
                const item = localStorage.getItem(PREFIX + key);
                if (item === null) return defaultValue;
                return JSON.parse(item);
            } catch (e) {
                console.warn('[TiageStorage] Get failed:', key, e);
                return defaultValue;
            }
        },

        /**
         * Wert entfernen
         */
        remove(key) {
            if (!available) return false;
            try {
                localStorage.removeItem(PREFIX + key);
                return true;
            } catch (e) {
                console.warn('[TiageStorage] Remove failed:', key, e);
                return false;
            }
        },

        /**
         * Alle Tiage-Einträge löschen
         */
        clear() {
            if (!available) return false;
            try {
                const keys = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && key.startsWith(PREFIX)) {
                        keys.push(key);
                    }
                }
                keys.forEach(key => localStorage.removeItem(key));
                return true;
            } catch (e) {
                console.warn('[TiageStorage] Clear failed:', e);
                return false;
            }
        },

        /**
         * Altersverifikation
         */
        isAgeVerified() {
            return this.get('age_verified', false) === true;
        },

        setAgeVerified(verified) {
            return this.set('age_verified', verified);
        },

        /**
         * Auswahl speichern/laden
         */
        saveSelection(selection) {
            return this.set('selection', selection);
        },

        loadSelection() {
            return this.get('selection', null);
        },

        /**
         * Feedback speichern/laden (lokaler Speicher)
         */
        saveFeedback(feedback) {
            const existing = this.get('feedback', []);
            existing.push({
                ...feedback,
                id: Date.now(),
                timestamp: new Date().toISOString()
            });
            return this.set('feedback', existing);
        },

        getFeedback() {
            return this.get('feedback', []);
        },

        /**
         * Verfügbarkeit prüfen
         */
        isAvailable() {
            return available;
        }
    };
})();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageStorage;
}
