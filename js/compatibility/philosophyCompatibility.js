/**
 * PHILOSOPHY COMPATIBILITY - Logos Check
 *
 * Prüft die philosophische Kompatibilität (Beziehungsphilosophie/Logos)
 * zwischen zwei Archetypen basierend auf der Interaktionsmatrix.
 *
 * Extrahiert aus app-main.js für bessere Wartbarkeit und Testbarkeit.
 *
 * @module TiageCompatibility.Philosophy
 */

var TiageCompatibility = TiageCompatibility || {};

TiageCompatibility.Philosophy = (function() {
    'use strict';

    // Fallback-Kompatibilitätsmatrix - berechnet aus Bedürfnis-Profilen (220 Bedürfnisse)
    // Stand: 2025-12-23 - Identisch mit archetypeFactor.js und archetypeMatrixCalculator.js
    var FALLBACK_MATRIX = {
        'single': { 'single': 100, 'duo': 68, 'duo_flex': 81, 'solopoly': 93, 'polyamor': 79, 'ra': 91, 'lat': 85, 'aromantisch': 92 },
        'duo': { 'single': 68, 'duo': 100, 'duo_flex': 86, 'solopoly': 72, 'polyamor': 84, 'ra': 71, 'lat': 83, 'aromantisch': 73 },
        'duo_flex': { 'single': 81, 'duo': 86, 'duo_flex': 100, 'solopoly': 85, 'polyamor': 94, 'ra': 84, 'lat': 94, 'aromantisch': 86 },
        'solopoly': { 'single': 93, 'duo': 72, 'duo_flex': 85, 'solopoly': 100, 'polyamor': 84, 'ra': 95, 'lat': 89, 'aromantisch': 93 },
        'polyamor': { 'single': 79, 'duo': 84, 'duo_flex': 94, 'solopoly': 84, 'polyamor': 100, 'ra': 83, 'lat': 90, 'aromantisch': 84 },
        'ra': { 'single': 91, 'duo': 71, 'duo_flex': 84, 'solopoly': 95, 'polyamor': 83, 'ra': 100, 'lat': 87, 'aromantisch': 93 },
        'lat': { 'single': 85, 'duo': 83, 'duo_flex': 94, 'solopoly': 89, 'polyamor': 90, 'ra': 87, 'lat': 100, 'aromantisch': 90 },
        'aromantisch': { 'single': 92, 'duo': 73, 'duo_flex': 86, 'solopoly': 93, 'polyamor': 84, 'ra': 93, 'lat': 90, 'aromantisch': 100 }
    };

    /**
     * Holt Score aus der Fallback-Matrix
     */
    function getFallbackScore(type1, type2) {
        if (FALLBACK_MATRIX[type1] && typeof FALLBACK_MATRIX[type1][type2] === 'number') {
            return FALLBACK_MATRIX[type1][type2];
        }
        // Versuche umgekehrt
        if (FALLBACK_MATRIX[type2] && typeof FALLBACK_MATRIX[type2][type1] === 'number') {
            return FALLBACK_MATRIX[type2][type1];
        }
        return 50; // Default
    }

    /**
     * Calculate philosophy compatibility between two archetypes
     *
     * Uses Category A (Beziehungsphilosophie) from the interaction matrix
     * as the primary indicator for philosophical alignment.
     *
     * @param {string} type1 - Archetype of person 1
     * @param {string} type2 - Archetype of person 2
     * @param {object} matrixData - The archetype-matrix.json data
     * @returns {object} Result with:
     *   - score: 0-100 philosophy compatibility score
     *   - note: Optional note from the matrix
     *   - hasWarning: boolean if score < 50
     *   - severity: 'low' | 'medium' | 'high' based on score
     */
    function calculate(type1, type2, matrixData) {
        // Build interaction key
        var key = type1 + '_' + type2;

        // Try to get interaction from matrix
        var interaction = matrixData && matrixData.interactions && matrixData.interactions[key];

        if (interaction && interaction.scores && interaction.scores.A) {
            var score = interaction.scores.A.value;
            var note = interaction.scores.A.note || '';

            return {
                score: score,
                note: note,
                hasWarning: score < 50,
                severity: getSeverity(score)
            };
        }

        // Try reverse key if not found
        var reverseKey = type2 + '_' + type1;
        interaction = matrixData && matrixData.interactions && matrixData.interactions[reverseKey];

        if (interaction && interaction.scores && interaction.scores.A) {
            var score = interaction.scores.A.value;
            var note = interaction.scores.A.note || '';

            return {
                score: score,
                note: note,
                hasWarning: score < 50,
                severity: getSeverity(score)
            };
        }

        // Nutze TiageSynthesis.Factors.Archetyp wenn verfügbar
        if (typeof TiageSynthesis !== 'undefined' &&
            TiageSynthesis.Factors &&
            TiageSynthesis.Factors.Archetyp &&
            typeof TiageSynthesis.Factors.Archetyp.calculate === 'function') {
            var result = TiageSynthesis.Factors.Archetyp.calculate(type1, type2, matrixData);
            return {
                score: result.score,
                note: 'Berechnet aus Archetyp-Kompatibilität',
                hasWarning: result.score < 50,
                severity: getSeverity(result.score)
            };
        }

        // Fallback: Nutze lokale Fallback-Matrix
        var fallbackScore = getFallbackScore(type1, type2);
        return {
            score: fallbackScore,
            note: 'Berechnet aus Fallback-Matrix',
            hasWarning: fallbackScore < 50,
            severity: getSeverity(fallbackScore)
        };
    }

    /**
     * Get severity level based on score
     * @param {number} score - Philosophy score (0-100)
     * @returns {string} 'low' | 'medium' | 'high'
     */
    function getSeverity(score) {
        if (score >= 70) return 'low';      // Good compatibility
        if (score >= 40) return 'medium';   // Some differences
        return 'high';                       // Significant differences
    }

    /**
     * Get warning text based on score
     * @param {number} score - Philosophy score (0-100)
     * @returns {object} Warning configuration
     */
    function getWarningConfig(score) {
        if (score >= 50) {
            return {
                show: false,
                title: '',
                text: ''
            };
        }

        if (score < 30) {
            return {
                show: true,
                title: 'Verstandsebene-Warnung: Fundamentale philosophische Unterschiede',
                text: 'Eure Grundüberzeugungen über Beziehungen sind sehr unterschiedlich. Dies erfordert intensive Kommunikation und Kompromissbereitschaft.'
            };
        }

        return {
            show: true,
            title: 'Verstandsebene-Hinweis: Unterschiedliche philosophische Ansätze',
            text: 'Ihr habt verschiedene Vorstellungen von Beziehungen. Offene Kommunikation ist wichtig.'
        };
    }

    /**
     * Get all category scores for an archetype pair
     * Useful for detailed analysis
     *
     * @param {string} type1 - Archetype of person 1
     * @param {string} type2 - Archetype of person 2
     * @param {object} matrixData - The archetype-matrix.json data
     * @returns {object} All category scores (A-F)
     */
    function getAllCategoryScores(type1, type2, matrixData) {
        var key = type1 + '_' + type2;
        var interaction = matrixData && matrixData.interactions && matrixData.interactions[key];

        if (!interaction || !interaction.scores) {
            return null;
        }

        var scores = {};
        var categories = ['A', 'B', 'C', 'D', 'E', 'F'];

        for (var i = 0; i < categories.length; i++) {
            var cat = categories[i];
            if (interaction.scores[cat]) {
                scores[cat] = {
                    value: interaction.scores[cat].value,
                    note: interaction.scores[cat].note || ''
                };
            }
        }

        return scores;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        calculate: calculate,
        getSeverity: getSeverity,
        getWarningConfig: getWarningConfig,
        getAllCategoryScores: getAllCategoryScores
    };

})();
