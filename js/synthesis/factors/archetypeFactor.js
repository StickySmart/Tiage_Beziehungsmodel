/**
 * TIAGE SYNTHESE - Archetyp-Faktor
 *
 * LOGOS (Verstand) - 25% Gewichtung
 *
 * Philosophische Grundlage: Pirsig's "Statische Qualität"
 * - Strukturelle Fundamente der Beziehungsphilosophie
 * - Wie wollen beide Partner zusammenleben?
 * - Die Archetyp-Frage stellt sich NACH den initialen Pathos-Faktoren
 *
 * Datenquelle: archetype-matrix.json (6x6 Matrix)
 */

var TiageSynthesis = TiageSynthesis || {};
TiageSynthesis.Factors = TiageSynthesis.Factors || {};

TiageSynthesis.Factors.Archetyp = {

    /**
     * Berechnet den Archetyp-Kompatibilitätsscore
     *
     * @param {string} type1 - Archetyp Person 1 (single, duo, duoflex, poly, solopoly, polyamor)
     * @param {string} type2 - Archetyp Person 2
     * @param {object} matrixData - Die geladenen archetype-matrix.json Daten
     * @returns {object} { score: 0-100, details: {...} }
     */
    calculate: function(type1, type2, matrixData) {
        if (!type1 || !type2) {
            return {
                score: 50,
                details: {
                    reason: 'Unvollständige Daten',
                    combination: null
                }
            };
        }

        const key = type1 + '_' + type2;
        const interaction = matrixData?.interactions?.[key];

        if (!interaction) {
            // Fallback: Versuche umgekehrte Kombination
            const reverseKey = type2 + '_' + type1;
            const reverseInteraction = matrixData?.interactions?.[reverseKey];

            if (reverseInteraction) {
                return {
                    score: reverseInteraction.overall || 50,
                    details: {
                        combination: reverseKey,
                        source: 'matrix-reverse'
                    }
                };
            }

            return {
                score: 50,
                details: {
                    reason: 'Kombination nicht in Matrix',
                    combination: key
                }
            };
        }

        return {
            score: interaction.overall || 50,
            details: {
                combination: key,
                source: 'matrix',
                philosophyMatch: interaction.philosophyMatch,
                compatibilityLevel: this._getCompatibilityLevel(interaction.overall)
            }
        };
    },

    /**
     * Gibt das Kompatibilitätslevel als Text zurück
     */
    _getCompatibilityLevel: function(score) {
        if (score >= 90) return 'sehr-hoch';
        if (score >= 70) return 'hoch';
        if (score >= 50) return 'mittel';
        if (score >= 30) return 'niedrig';
        return 'sehr-niedrig';
    },

    /**
     * Prüft ob Archetypen fundamental inkompatibel sind
     * (Kein K.O., aber wichtige Info für Resonanz)
     */
    hasFundamentalConflict: function(type1, type2) {
        const conflictPairs = [
            ['single', 'polyamor'],
            ['duo', 'polyamor'],
            ['solopoly', 'duo']
        ];

        for (var i = 0; i < conflictPairs.length; i++) {
            var pair = conflictPairs[i];
            if ((type1 === pair[0] && type2 === pair[1]) ||
                (type1 === pair[1] && type2 === pair[0])) {
                return true;
            }
        }
        return false;
    }
};
