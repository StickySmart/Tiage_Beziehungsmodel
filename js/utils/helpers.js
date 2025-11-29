/**
 * HELPER UTILITIES
 *
 * Allgemeine Hilfsfunktionen.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const TiageHelpers = (function() {
    'use strict';

    return {
        /**
         * Geschlecht kurz
         */
        getGeschlechtKurz(geschlecht) {
            const map = {
                'männlich': 'M',
                'weiblich': 'W',
                'nonbinär': 'NB'
            };
            return map[geschlecht] || '?';
        },

        /**
         * Dominanz kurz (aus Objekt)
         */
        getDominanzKurz(dominanz) {
            if (!dominanz || typeof dominanz !== 'object') return '?';

            const selected = [];
            const map = {
                'dominant': 'Dom',
                'submissiv': 'Sub',
                'switch': 'Swi',
                'ausgeglichen': 'Aus'
            };

            // Erst 'gelebt', dann 'interessiert'
            for (const [type, status] of Object.entries(dominanz)) {
                if (status === 'gelebt') {
                    selected.unshift(map[type] || type);
                } else if (status === 'interessiert') {
                    selected.push(`(${map[type] || type})`);
                }
            }

            return selected.length > 0 ? selected.join('/') : '?';
        },

        /**
         * Orientierung kurz (aus Objekt)
         */
        getOrientierungKurz(orientierung) {
            if (!orientierung || typeof orientierung !== 'object') return '?';

            const selected = [];
            const map = {
                'heterosexuell': 'Hetero',
                'homosexuell': 'Homo',
                'bisexuell': 'Bi'
            };

            for (const [type, status] of Object.entries(orientierung)) {
                if (status === 'gelebt') {
                    selected.unshift(map[type] || type);
                } else if (status === 'interessiert') {
                    selected.push(`(${map[type] || type})`);
                }
            }

            return selected.length > 0 ? selected.join('/') : '?';
        },

        /**
         * Primäre (gelebte) Dominanz ermitteln
         */
        getPrimaryDominanz(dominanz) {
            if (!dominanz || typeof dominanz !== 'object') return null;
            for (const [type, status] of Object.entries(dominanz)) {
                if (status === 'gelebt') return type;
            }
            return null;
        },

        /**
         * Primäre (gelebte) Orientierung ermitteln
         */
        getPrimaryOrientierung(orientierung) {
            if (!orientierung || typeof orientierung !== 'object') return null;
            for (const [type, status] of Object.entries(orientierung)) {
                if (status === 'gelebt') return type;
            }
            return null;
        },

        /**
         * Score-Farbe basierend auf Wert
         */
        getScoreColor(score) {
            if (score >= 70) return '#27ae60';  // Grün
            if (score >= 50) return '#f39c12';  // Orange
            if (score >= 30) return '#e67e22';  // Dunkelorange
            return '#e74c3c';                   // Rot
        },

        /**
         * Bar-Klasse basierend auf Wert
         */
        getBarClass(value) {
            if (value >= 70) return 'high';
            if (value >= 50) return 'medium';
            if (value >= 30) return 'low';
            return 'very-low';
        },

        /**
         * Tonalität basierend auf Score
         */
        getTonality(score) {
            if (score >= 75) return 'sehr-positiv';
            if (score >= 60) return 'positiv';
            if (score >= 45) return 'neutral';
            if (score >= 30) return 'kritisch';
            return 'sehr-kritisch';
        },

        /**
         * Tag-Name normalisieren
         */
        normalizeTagName(tag) {
            if (!tag) return '';
            return tag.toLowerCase()
                .replace(/ä/g, 'ae')
                .replace(/ö/g, 'oe')
                .replace(/ü/g, 'ue')
                .replace(/ß/g, 'ss')
                .replace(/[^a-z0-9-]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
        },

        /**
         * Hash für deterministisches Mischen
         */
        getFactorHash(archetypScore, dominanzScore, orientierungScore, geschlechtScore) {
            const combined = `${archetypScore}-${dominanzScore}-${orientierungScore}-${geschlechtScore}`;
            let hash = 0;
            for (let i = 0; i < combined.length; i++) {
                const char = combined.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            return Math.abs(hash);
        },

        /**
         * Statement basierend auf Hash auswählen
         */
        selectStatementByHash(statements, hash) {
            if (!statements || statements.length === 0) return null;
            const index = hash % statements.length;
            return statements[index];
        },

        /**
         * Datum formatieren
         */
        formatDate(timestamp) {
            const date = new Date(timestamp);
            const now = new Date();
            const diff = now - date;

            // Weniger als 1 Minute
            if (diff < 60000) return 'Gerade eben';

            // Weniger als 1 Stunde
            if (diff < 3600000) {
                const mins = Math.floor(diff / 60000);
                return `Vor ${mins} Minute${mins > 1 ? 'n' : ''}`;
            }

            // Weniger als 24 Stunden
            if (diff < 86400000) {
                const hours = Math.floor(diff / 3600000);
                return `Vor ${hours} Stunde${hours > 1 ? 'n' : ''}`;
            }

            // Weniger als 7 Tage
            if (diff < 604800000) {
                const days = Math.floor(diff / 86400000);
                return `Vor ${days} Tag${days > 1 ? 'en' : ''}`;
            }

            // Datum formatieren
            return date.toLocaleDateString('de-DE', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            });
        },

        /**
         * Deep Clone
         */
        deepClone(obj) {
            if (obj === null || typeof obj !== 'object') return obj;
            if (Array.isArray(obj)) return obj.map(item => this.deepClone(item));

            const cloned = {};
            for (const key in obj) {
                if (Object.prototype.hasOwnProperty.call(obj, key)) {
                    cloned[key] = this.deepClone(obj[key]);
                }
            }
            return cloned;
        },

        /**
         * Objekte mergen
         */
        merge(target, ...sources) {
            for (const source of sources) {
                if (!source) continue;
                for (const key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                            target[key] = this.merge(target[key] || {}, source[key]);
                        } else {
                            target[key] = source[key];
                        }
                    }
                }
            }
            return target;
        },

        /**
         * Wildcard zu Regex konvertieren
         */
        wildcardToRegex(pattern) {
            const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, '\\$&');
            const regex = escaped.replace(/\*/g, '.*').replace(/\?/g, '.');
            return new RegExp(`^${regex}$`, 'i');
        }
    };
})();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageHelpers;
}
