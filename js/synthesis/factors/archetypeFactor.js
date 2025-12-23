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

    // Fallback-Kompatibilitätsmatrix - berechnet aus Bedürfnis-Profilen (220 Bedürfnisse)
    // Stand: 2025-12-23 - Identisch mit dynamisch berechneter Matrix aus archetypeMatrixCalculator.js
    // Formel: Für jedes Bedürfnis: Ähnlichkeit = 100 - |Wert1 - Wert2|, Gewicht = (Wert1 + Wert2) / 2
    _fallbackMatrix: {
        'single': { 'single': 100, 'duo': 68, 'duo_flex': 81, 'solopoly': 93, 'polyamor': 79, 'ra': 91, 'lat': 85, 'aromantisch': 92 },
        'duo': { 'single': 68, 'duo': 100, 'duo_flex': 86, 'solopoly': 72, 'polyamor': 84, 'ra': 71, 'lat': 83, 'aromantisch': 73 },
        'duo_flex': { 'single': 81, 'duo': 86, 'duo_flex': 100, 'solopoly': 85, 'polyamor': 94, 'ra': 84, 'lat': 94, 'aromantisch': 86 },
        'solopoly': { 'single': 93, 'duo': 72, 'duo_flex': 85, 'solopoly': 100, 'polyamor': 84, 'ra': 95, 'lat': 89, 'aromantisch': 93 },
        'polyamor': { 'single': 79, 'duo': 84, 'duo_flex': 94, 'solopoly': 84, 'polyamor': 100, 'ra': 83, 'lat': 90, 'aromantisch': 84 },
        'ra': { 'single': 91, 'duo': 71, 'duo_flex': 84, 'solopoly': 95, 'polyamor': 83, 'ra': 100, 'lat': 87, 'aromantisch': 93 },
        'lat': { 'single': 85, 'duo': 83, 'duo_flex': 94, 'solopoly': 89, 'polyamor': 90, 'ra': 87, 'lat': 100, 'aromantisch': 90 },
        'aromantisch': { 'single': 92, 'duo': 73, 'duo_flex': 86, 'solopoly': 93, 'polyamor': 84, 'ra': 93, 'lat': 90, 'aromantisch': 100 }
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
