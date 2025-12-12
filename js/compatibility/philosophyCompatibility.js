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

    // Fallback-Kompatibilitätsmatrix (identisch mit archetypeFactor.js)
    var FALLBACK_MATRIX = {
        'single': { 'single': 85, 'duo': 25, 'duo_flex': 45, 'ra': 75, 'lat': 70, 'aromantisch': 80, 'solopoly': 75, 'polyamor': 50 },
        'duo': { 'single': 25, 'duo': 95, 'duo_flex': 65, 'ra': 15, 'lat': 55, 'aromantisch': 20, 'solopoly': 20, 'polyamor': 35 },
        'duo_flex': { 'single': 45, 'duo': 65, 'duo_flex': 85, 'ra': 55, 'lat': 70, 'aromantisch': 45, 'solopoly': 60, 'polyamor': 75 },
        'ra': { 'single': 75, 'duo': 15, 'duo_flex': 55, 'ra': 90, 'lat': 70, 'aromantisch': 75, 'solopoly': 85, 'polyamor': 70 },
        'lat': { 'single': 70, 'duo': 55, 'duo_flex': 70, 'ra': 70, 'lat': 90, 'aromantisch': 75, 'solopoly': 65, 'polyamor': 60 },
        'aromantisch': { 'single': 80, 'duo': 20, 'duo_flex': 45, 'ra': 75, 'lat': 75, 'aromantisch': 95, 'solopoly': 65, 'polyamor': 55 },
        'solopoly': { 'single': 75, 'duo': 20, 'duo_flex': 60, 'ra': 85, 'lat': 65, 'aromantisch': 65, 'solopoly': 90, 'polyamor': 80 },
        'polyamor': { 'single': 50, 'duo': 35, 'duo_flex': 75, 'ra': 70, 'lat': 60, 'aromantisch': 55, 'solopoly': 80, 'polyamor': 90 }
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
