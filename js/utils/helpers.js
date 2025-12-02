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
         * Geschlecht kurz - nutzt TiageConfig wenn verfügbar
         * Unterstützt das neue Primär/Sekundär System
         *
         * @param {string|object} geschlecht - String oder { primary, secondary }
         * @returns {string} Kurzform wie "M→F" oder "M"
         */
        getGeschlechtKurz(geschlecht) {
            // Neues Format: { primary, secondary }
            if (geschlecht && typeof geschlecht === 'object') {
                const primary = geschlecht.primary;
                const secondary = geschlecht.secondary;

                if (typeof TiageConfig !== 'undefined' && TiageConfig.getGeschlechtKombiShort) {
                    return TiageConfig.getGeschlechtKombiShort(primary, secondary || primary);
                }

                const pShort = TiageConfig?.GESCHLECHT_PRIMARY_SHORT?.[primary] || primary?.[0]?.toUpperCase() || '?';
                const sShort = TiageConfig?.GESCHLECHT_SECONDARY_SHORT?.[secondary] || secondary?.[0]?.toUpperCase() || '?';

                if (!secondary || primary === secondary) {
                    return pShort;
                }
                return `${pShort}→${sShort}`;
            }

            // Legacy: String-Format
            if (typeof TiageConfig !== 'undefined' && TiageConfig.GESCHLECHT_SHORT) {
                return TiageConfig.GESCHLECHT_SHORT[geschlecht] || '?';
            }
            // Fallback für ältere Werte
            const fallbackMap = {
                'männlich': 'M',
                'weiblich': 'W',
                'nonbinär': 'NB',
                'mann': 'M',
                'frau': 'F',
                'inter': 'I'
            };
            return fallbackMap[geschlecht] || '?';
        },

        /**
         * Geschlecht Label (vollständiger Name)
         * Unterstützt das neue Primär/Sekundär System
         *
         * @param {string|object} geschlecht - String oder { primary, secondary }
         * @returns {string} Label wie "Mann → Frau" oder "Mann"
         */
        getGeschlechtLabel(geschlecht) {
            // Neues Format: { primary, secondary }
            if (geschlecht && typeof geschlecht === 'object') {
                const primary = geschlecht.primary;
                const secondary = geschlecht.secondary;

                if (typeof TiageConfig !== 'undefined' && TiageConfig.getGeschlechtKombiLabel) {
                    return TiageConfig.getGeschlechtKombiLabel(primary, secondary || primary);
                }

                const pLabel = TiageConfig?.GESCHLECHT_PRIMARY_LABELS?.[primary] || primary || '?';
                const sLabel = TiageConfig?.GESCHLECHT_SECONDARY_LABELS?.[secondary] || secondary || '?';

                if (!secondary || primary === secondary) {
                    return pLabel;
                }
                return `${pLabel} → ${sLabel}`;
            }

            // Legacy: String-Format
            if (typeof TiageConfig !== 'undefined' && TiageConfig.GESCHLECHT_LABELS) {
                return TiageConfig.GESCHLECHT_LABELS[geschlecht] || geschlecht;
            }
            return geschlecht || '?';
        },

        /**
         * Geschlecht-Kategorie für Orientierungslogik
         * Nutzt die SEKUNDÄRE Identität wenn verfügbar, sonst Primär
         *
         * @param {string|object} geschlecht - String oder { primary, secondary }
         * @returns {string} Kategorie: 'maennlich', 'weiblich', 'nonbinaer', 'fluid', 'inter', oder 'andere'
         */
        getGeschlechtCategory(geschlecht) {
            // Neues Format: { primary, secondary }
            // Für Orientierungslogik ist SEKUNDÄR (Identität) entscheidend
            if (geschlecht && typeof geschlecht === 'object') {
                const valueForCategory = geschlecht.secondary || geschlecht.primary;
                if (typeof TiageConfig !== 'undefined' && TiageConfig.GESCHLECHT_CATEGORY) {
                    return TiageConfig.GESCHLECHT_CATEGORY[valueForCategory] || 'andere';
                }
            }

            // Legacy: String-Format
            if (typeof TiageConfig !== 'undefined' && TiageConfig.GESCHLECHT_CATEGORY) {
                return TiageConfig.GESCHLECHT_CATEGORY[geschlecht] || 'andere';
            }
            // Fallback
            const fallbackMap = {
                'männlich': 'maennlich',
                'weiblich': 'weiblich',
                'nonbinär': 'nonbinaer',
                'mann': 'maennlich',
                'frau': 'weiblich',
                'nonbinaer': 'nonbinaer',
                'fluid': 'fluid',
                'unsicher': 'nonbinaer',
                'inter': 'inter'
            };
            return fallbackMap[geschlecht] || 'andere';
        },

        /**
         * Prüft ob zwei Personen orientierungskompatibel sind
         * @param {string} geschlecht1 - Geschlecht Person 1
         * @param {string} orientierung1 - Orientierung Person 1 (heterosexuell, homosexuell, bisexuell)
         * @param {string} geschlecht2 - Geschlecht Person 2
         * @param {string} orientierung2 - Orientierung Person 2
         * @returns {object} { compatible: boolean, score: 0-100, reason: string }
         */
        checkOrientierungKompatibilitaet(geschlecht1, orientierung1, geschlecht2, orientierung2) {
            const cat1 = this.getGeschlechtCategory(geschlecht1);
            const cat2 = this.getGeschlechtCategory(geschlecht2);

            // Prüfe ob Person 1 von Person 2 angezogen wird
            const p1AttractedToP2 = this.isAttractedTo(orientierung1, cat1, cat2);
            // Prüfe ob Person 2 von Person 1 angezogen wird
            const p2AttractedToP1 = this.isAttractedTo(orientierung2, cat2, cat1);

            if (p1AttractedToP2 && p2AttractedToP1) {
                return { compatible: true, score: 100, reason: 'Gegenseitige Anziehung' };
            } else if (p1AttractedToP2 || p2AttractedToP1) {
                return { compatible: false, score: 30, reason: 'Einseitige Anziehung' };
            } else {
                return { compatible: false, score: 0, reason: 'Keine Anziehung' };
            }
        },

        /**
         * Prüft ob jemand mit einer bestimmten Orientierung von einer Geschlechtskategorie angezogen wird
         */
        isAttractedTo(orientierung, ownCategory, targetCategory) {
            // Bisexuell: Angezogen von männlich und weiblich
            if (orientierung === 'bisexuell') {
                return targetCategory === 'maennlich' || targetCategory === 'weiblich' ||
                       targetCategory === 'fluid' || targetCategory === 'nonbinaer';
            }

            // Heterosexuell: Angezogen vom "anderen" Geschlecht
            if (orientierung === 'heterosexuell') {
                if (ownCategory === 'maennlich') {
                    return targetCategory === 'weiblich';
                } else if (ownCategory === 'weiblich') {
                    return targetCategory === 'maennlich';
                }
                // Nonbinär/Fluid/Agender mit hetero - komplex, als partiell kompatibel behandeln
                return targetCategory !== ownCategory && targetCategory !== 'agender';
            }

            // Homosexuell: Angezogen vom "gleichen" Geschlecht
            if (orientierung === 'homosexuell') {
                if (ownCategory === 'maennlich') {
                    return targetCategory === 'maennlich';
                } else if (ownCategory === 'weiblich') {
                    return targetCategory === 'weiblich';
                }
                // Nonbinär mit homo - angezogen von nonbinär
                return targetCategory === ownCategory || targetCategory === 'nonbinaer';
            }

            return false;
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
            // New format: { primary: 'dominant', secondary: 'submissiv' }
            if ('primary' in dominanz) {
                return dominanz.primary || null;
            }
            // Old format: { dominant: 'gelebt', submissiv: 'interessiert' }
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
            // New format: { primary: 'homosexuell', secondary: 'heterosexuell' }
            if ('primary' in orientierung) {
                return orientierung.primary || null;
            }
            // Old format: { heterosexuell: 'gelebt', homosexuell: 'interessiert' }
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
