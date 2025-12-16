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
 * Datenquelle: archetype-matrix.json (8x8 Matrix)
 */

var TiageSynthesis = TiageSynthesis || {};
TiageSynthesis.Factors = TiageSynthesis.Factors || {};

TiageSynthesis.Factors.Archetyp = {

    // Fallback-Kompatibilitätsmatrix wenn keine overall Scores vorhanden
    _fallbackMatrix: {
        'single': { 'single': 85, 'duo': 25, 'duo_flex': 45, 'ra': 75, 'lat': 70, 'aromantisch': 80, 'solopoly': 75, 'polyamor': 50 },
        'duo': { 'single': 25, 'duo': 95, 'duo_flex': 65, 'ra': 15, 'lat': 55, 'aromantisch': 20, 'solopoly': 20, 'polyamor': 35 },
        'duo_flex': { 'single': 45, 'duo': 65, 'duo_flex': 85, 'ra': 55, 'lat': 70, 'aromantisch': 45, 'solopoly': 60, 'polyamor': 75 },
        'ra': { 'single': 75, 'duo': 15, 'duo_flex': 55, 'ra': 90, 'lat': 70, 'aromantisch': 75, 'solopoly': 85, 'polyamor': 70 },
        'lat': { 'single': 70, 'duo': 55, 'duo_flex': 70, 'ra': 70, 'lat': 90, 'aromantisch': 75, 'solopoly': 65, 'polyamor': 60 },
        'aromantisch': { 'single': 80, 'duo': 20, 'duo_flex': 45, 'ra': 75, 'lat': 75, 'aromantisch': 95, 'solopoly': 65, 'polyamor': 55 },
        'solopoly': { 'single': 75, 'duo': 20, 'duo_flex': 60, 'ra': 85, 'lat': 65, 'aromantisch': 65, 'solopoly': 90, 'polyamor': 80 },
        'polyamor': { 'single': 50, 'duo': 35, 'duo_flex': 75, 'ra': 70, 'lat': 60, 'aromantisch': 55, 'solopoly': 80, 'polyamor': 90 }
    },

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

        var key = type1 + '_' + type2;
        var interaction = matrixData?.interactions?.[key];

        if (!interaction) {
            // Fallback: Versuche umgekehrte Kombination
            var reverseKey = type2 + '_' + type1;
            var reverseInteraction = matrixData?.interactions?.[reverseKey];

            if (reverseInteraction) {
                interaction = reverseInteraction;
                key = reverseKey;
            }
        }

        // Wenn Interaction vorhanden, berechne Score
        if (interaction) {
            // Wenn overall vorhanden, nutze es
            if (typeof interaction.overall === 'number') {
                return {
                    score: interaction.overall,
                    details: {
                        combination: key,
                        source: 'matrix-overall'
                    }
                };
            }

            // Wenn nur pro/contra vorhanden, berechne Score daraus
            if (interaction.pro || interaction.contra) {
                var score = this._calculateFromProContra(interaction, type1, type2);
                return {
                    score: score,
                    details: {
                        combination: key,
                        source: 'matrix-procontra',
                        proCount: (interaction.pro || []).length,
                        contraCount: (interaction.contra || []).length
                    }
                };
            }
        }

        // Fallback: Nutze die eingebaute Kompatibilitätsmatrix
        var fallbackScore = this._getFallbackScore(type1, type2);
        return {
            score: fallbackScore,
            details: {
                combination: key,
                source: 'fallback-matrix',
                reason: 'Keine Matrix-Daten vorhanden'
            }
        };
    },

    /**
     * Berechnet Score aus Pro/Contra Listen
     * Berücksichtigt auch die Fallback-Matrix für Basis-Kompatibilität
     */
    _calculateFromProContra: function(interaction, type1, type2) {
        var proCount = (interaction.pro || []).length;
        var contraCount = (interaction.contra || []).length;

        // Hole Basis-Score aus Fallback-Matrix
        var baseScore = this._getFallbackScore(type1, type2);

        // Pro/Contra modifizieren den Score leicht (±5 pro Punkt, max ±15)
        var modifier = Math.min(15, Math.max(-15, (proCount - contraCount) * 5));

        var finalScore = Math.min(100, Math.max(0, baseScore + modifier));
        return finalScore;
    },

    /**
     * Holt Score aus der berechneten oder Fallback-Matrix
     *
     * PRIORITÄT:
     * 1. Dynamisch berechnete Matrix (aus ArchetypeMatrixCalculator)
     * 2. Hardcodierte Fallback-Matrix (nur wenn Berechnung nicht verfügbar)
     */
    _getFallbackScore: function(type1, type2) {
        // Priorität 1: Nutze dynamisch berechnete Matrix falls verfügbar
        if (typeof TiageSynthesis !== 'undefined' &&
            TiageSynthesis.ArchetypeMatrixCalculator &&
            TiageSynthesis.ArchetypeMatrixCalculator._cachedMatrix) {

            var calculatedMatrix = TiageSynthesis.ArchetypeMatrixCalculator._cachedMatrix;

            if (calculatedMatrix[type1] && typeof calculatedMatrix[type1][type2] === 'number') {
                return calculatedMatrix[type1][type2];
            }
            // Versuche umgekehrt
            if (calculatedMatrix[type2] && typeof calculatedMatrix[type2][type1] === 'number') {
                return calculatedMatrix[type2][type1];
            }
        }

        // Priorität 2: Fallback auf hardcodierte Matrix
        if (this._fallbackMatrix[type1] && typeof this._fallbackMatrix[type1][type2] === 'number') {
            return this._fallbackMatrix[type1][type2];
        }
        // Versuche umgekehrt
        if (this._fallbackMatrix[type2] && typeof this._fallbackMatrix[type2][type1] === 'number') {
            return this._fallbackMatrix[type2][type1];
        }
        return 50; // Default
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
        var conflictPairs = [
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
