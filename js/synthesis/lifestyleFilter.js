/**
 * TIAGE LIFESTYLE-FILTER
 *
 * Prüft baseAttributes auf K.O.-Kriterien und Warnungen.
 * Wird VOR dem GFK-Matching ausgeführt.
 *
 * Kein Score - nur: K.O. / Warnung / OK
 */

var TiageSynthesis = TiageSynthesis || {};

TiageSynthesis.LifestyleFilter = {

    // ═══════════════════════════════════════════════════════════════════════════
    // K.O.-REGELN (Deal-Breaker)
    // ═══════════════════════════════════════════════════════════════════════════

    koRules: {
        // Kinderwunsch: ja ↔ nein = K.O.
        kinderWunsch: {
            incompatible: [['ja', 'nein']],
            message: 'Kinderwunsch unvereinbar'
        },

        // Wohnform: zusammen ↔ getrennt (nur wenn einer "zusammen" will)
        wohnform: {
            incompatible: [['zusammen', 'getrennt'], ['zusammen', 'alleine']],
            message: 'Wohnvorstellungen unvereinbar'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // WARNUNGS-REGELN (Gelbe Flaggen)
    // ═══════════════════════════════════════════════════════════════════════════

    warningRules: {
        // Kategorische Warnungen
        categorical: {
            kinderWunsch: {
                pairs: [['ja', 'vielleicht'], ['nein', 'vielleicht']],
                message: 'Kinderwunsch unterschiedlich'
            },
            eheWunsch: {
                pairs: [['ja', 'nein']],
                message: 'Ehewunsch unterschiedlich'
            },
            finanzen: {
                pairs: [['gemeinsam', 'getrennt']],
                message: 'Finanzvorstellungen unterschiedlich'
            }
        },

        // Numerische Warnungen (Schwellenwert für Differenz)
        numeric: {
            religiositaet: {
                threshold: 0.40,
                message: 'Religiöse Einstellung unterschiedlich'
            },
            traditionVsModern: {
                threshold: 0.45,
                message: 'Tradition/Moderne-Einstellung unterschiedlich'
            },
            eifersuchtNeigung: {
                threshold: 0.35,
                message: 'Eifersuchtsniveau unterschiedlich'
            },
            alleinZeitBeduernis: {
                threshold: 0.35,
                message: 'Bedürfnis nach Alleinzeit unterschiedlich'
            },
            koerperlicheNaehe: {
                threshold: 0.35,
                message: 'Bedürfnis nach körperlicher Nähe unterschiedlich'
            },
            sexFrequenz: {
                threshold: 0.35,
                message: 'Erwartungen an Intimität unterschiedlich'
            }
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // HAUPTFUNKTION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Prüft zwei baseAttributes-Objekte auf Kompatibilität
     *
     * @param {object} attrs1 - baseAttributes Person 1
     * @param {object} attrs2 - baseAttributes Person 2
     * @returns {object} { isKO, koReasons, warnings, isCompatible }
     */
    check: function(attrs1, attrs2) {
        var result = {
            isKO: false,
            koReasons: [],
            warnings: [],
            isCompatible: true
        };

        if (!attrs1 || !attrs2) {
            return result; // Keine Daten = kein Filter
        }

        // K.O.-Checks
        this._checkKOs(attrs1, attrs2, result);

        // Wenn kein K.O., dann Warnungen prüfen
        if (!result.isKO) {
            this._checkWarnings(attrs1, attrs2, result);
        }

        result.isCompatible = !result.isKO;

        return result;
    },

    /**
     * Prüft K.O.-Kriterien
     */
    _checkKOs: function(attrs1, attrs2, result) {
        var self = this;

        Object.keys(this.koRules).forEach(function(attr) {
            var rule = self.koRules[attr];
            var val1 = attrs1[attr];
            var val2 = attrs2[attr];

            if (!val1 || !val2) return;

            // Prüfe alle inkompatiblen Paare
            rule.incompatible.forEach(function(pair) {
                if (self._isPairMatch(val1, val2, pair)) {
                    result.isKO = true;
                    result.koReasons.push({
                        attribute: attr,
                        value1: val1,
                        value2: val2,
                        message: rule.message
                    });
                }
            });
        });
    },

    /**
     * Prüft Warnungs-Kriterien
     */
    _checkWarnings: function(attrs1, attrs2, result) {
        var self = this;

        // Kategorische Warnungen
        Object.keys(this.warningRules.categorical).forEach(function(attr) {
            var rule = self.warningRules.categorical[attr];
            var val1 = attrs1[attr];
            var val2 = attrs2[attr];

            if (!val1 || !val2) return;

            rule.pairs.forEach(function(pair) {
                if (self._isPairMatch(val1, val2, pair)) {
                    result.warnings.push({
                        attribute: attr,
                        value1: val1,
                        value2: val2,
                        message: rule.message,
                        type: 'categorical'
                    });
                }
            });
        });

        // Numerische Warnungen
        Object.keys(this.warningRules.numeric).forEach(function(attr) {
            var rule = self.warningRules.numeric[attr];
            var val1 = attrs1[attr];
            var val2 = attrs2[attr];

            if (typeof val1 !== 'number' || typeof val2 !== 'number') return;

            var diff = Math.abs(val1 - val2);
            if (diff > rule.threshold) {
                result.warnings.push({
                    attribute: attr,
                    value1: val1,
                    value2: val2,
                    diff: Math.round(diff * 100) / 100,
                    threshold: rule.threshold,
                    message: rule.message,
                    type: 'numeric'
                });
            }
        });
    },

    /**
     * Hilfsfunktion: Prüft ob zwei Werte einem Paar entsprechen (in beliebiger Reihenfolge)
     */
    _isPairMatch: function(val1, val2, pair) {
        return (val1 === pair[0] && val2 === pair[1]) ||
               (val1 === pair[1] && val2 === pair[0]);
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // HILFSFUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Holt baseAttributes aus archetypeDefinitions für einen Archetyp
     *
     * @param {string} archetypId - ID des Archetyps
     * @param {object} archetypeDefinitions - Die Archetyp-Definitionen
     * @returns {object|null} baseAttributes oder null
     */
    getBaseAttributes: function(archetypId, archetypeDefinitions) {
        if (!archetypeDefinitions || !archetypId) return null;

        var archetype = archetypeDefinitions[archetypId];
        return archetype ? archetype.baseAttributes : null;
    },

    /**
     * Convenience: Prüft zwei Archetypen direkt
     *
     * @param {string} archetype1 - ID Archetyp 1
     * @param {string} archetype2 - ID Archetyp 2
     * @param {object} archetypeDefinitions - Die Archetyp-Definitionen
     * @returns {object} Filter-Ergebnis
     */
    checkArchetypes: function(archetype1, archetype2, archetypeDefinitions) {
        var attrs1 = this.getBaseAttributes(archetype1, archetypeDefinitions);
        var attrs2 = this.getBaseAttributes(archetype2, archetypeDefinitions);

        return this.check(attrs1, attrs2);
    },

    /**
     * Formatiert das Ergebnis für die UI
     *
     * @param {object} result - Ergebnis von check()
     * @returns {object} { status, icon, messages }
     */
    formatForUI: function(result) {
        if (result.isKO) {
            return {
                status: 'ko',
                icon: '🚫',
                title: 'Nicht kompatibel',
                messages: result.koReasons.map(function(r) { return r.message; })
            };
        }

        if (result.warnings.length > 0) {
            return {
                status: 'warning',
                icon: '⚠️',
                title: 'Gesprächsbedarf',
                messages: result.warnings.map(function(w) { return w.message; })
            };
        }

        return {
            status: 'ok',
            icon: '✓',
            title: 'Kompatibel',
            messages: []
        };
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LifestyleFilter: TiageSynthesis.LifestyleFilter };
}
