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

        // Fallback if not found
        return {
            score: 50,
            note: 'Keine spezifischen Daten verfügbar',
            hasWarning: false,
            severity: 'medium'
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
