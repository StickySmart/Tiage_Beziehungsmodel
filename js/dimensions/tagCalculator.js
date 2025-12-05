/**
 * TAG CALCULATOR
 *
 * Berechnet Tag- und Kategorie-Scores unter Berücksichtigung
 * von Dimensions-Modifiern (Dominanz, Orientierung, etc.)
 *
 * Extrahiert aus app-main.js für bessere Wartbarkeit und Testbarkeit.
 *
 * @module TiageDimensions.TagCalculator
 */

var TiageDimensions = TiageDimensions || {};

TiageDimensions.TagCalculator = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // TAG SCORE CALCULATION
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Calculate tag score with dimension modifiers
     *
     * @param {string} tagId - The tag identifier
     * @param {object} person1 - Person 1 data
     * @param {object} person2 - Person 2 data
     * @param {object} pathosCheck - Result from physical compatibility check
     * @param {object} matrixData - The archetype-matrix.json data
     * @returns {object} Result with score, baseScore, modifier, dims, desc
     */
    function calculateTagWithModifiers(tagId, person1, person2, pathosCheck, matrixData) {
        // Get base score from archetype interaction
        var interactionKey = person1.archetyp + '_' + person2.archetyp;
        var interaction = matrixData && matrixData.interactions && matrixData.interactions[interactionKey];
        var tagCategory = TiageDimensions.TagRelevance.getTagCategory(tagId);
        var baseScore = (interaction && interaction.scores && interaction.scores[tagCategory])
            ? interaction.scores[tagCategory].value
            : 50;

        // Get relevant dimensions for this tag
        var relevantDims = TiageDimensions.TagRelevance.getRelevantDimensions(tagId);

        if (relevantDims.length === 0) {
            return {
                score: baseScore,
                baseScore: baseScore,
                modifier: 0,
                dims: [],
                desc: "Archetyp-basiert"
            };
        }

        var modifier = 0;
        var descriptions = [];

        // Dominanz modifier
        if (relevantDims.indexOf("dominanz") !== -1) {
            var domMod = TiageDimensions.Dominanz.getModifier(person1.dominanz, person2.dominanz);
            modifier += domMod;
            if (domMod !== 0) {
                descriptions.push(TiageDimensions.Dominanz.getDescription(person1.dominanz, person2.dominanz, domMod));
            }
        }

        // Physical compatibility (Pathos uncertainty)
        var hasPhysicalDims = relevantDims.indexOf("geschlecht") !== -1 ||
                              relevantDims.indexOf("orientierung") !== -1 ||
                              relevantDims.indexOf("orientierungStatus") !== -1;

        if (hasPhysicalDims) {
            if (pathosCheck && pathosCheck.result === "unsicher") {
                modifier -= 10;
                descriptions.push("Unsichere körperliche Anziehung");
            }
        }

        // Orientation status (exploration bonus)
        if (relevantDims.indexOf("orientierungStatus") !== -1) {
            var status1 = extractOrientierungStatus(person1);
            var status2 = extractOrientierungStatus(person2);

            if (status1 === "interessiert" || status2 === "interessiert") {
                if (tagId === "experimentierfreude" || tagId === "sexuelle-offenheit") {
                    modifier += 5;
                    descriptions.push("Explorationsbonus");
                }
            }
        }

        var finalScore = Math.round(baseScore + modifier);

        return {
            score: finalScore,
            baseScore: baseScore,
            modifier: modifier,
            dims: relevantDims,
            desc: descriptions.length > 0 ? descriptions.join("; ") : "Keine Anpassung"
        };
    }

    /**
     * Extract orientation status from person data
     * @param {object} person - Person data
     * @returns {string} 'gelebt' | 'interessiert'
     */
    function extractOrientierungStatus(person) {
        if (!person) return 'gelebt';

        // Direct status field
        if (person.orientierungStatus) {
            return person.orientierungStatus;
        }

        // From orientierung object
        if (person.orientierung && typeof person.orientierung === 'object') {
            // New format with secondary
            if ('secondary' in person.orientierung && person.orientierung.secondary) {
                return 'interessiert';
            }
        }

        return 'gelebt';
    }

    // ═══════════════════════════════════════════════════════════════════════
    // CATEGORY CALCULATION
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Calculate category score with modifiers (average of all tags in category)
     *
     * @param {string} categoryLetter - Category letter (A-F)
     * @param {object} person1 - Person 1 data
     * @param {object} person2 - Person 2 data
     * @param {object} pathosCheck - Result from physical compatibility check
     * @param {object} matrixData - The archetype-matrix.json data
     * @returns {object} Result with score, modifier, tags
     */
    function calculateCategoryWithModifiers(categoryLetter, person1, person2, pathosCheck, matrixData) {
        var categoryTags = TiageDimensions.TagRelevance.getTagsForCategory(categoryLetter);

        if (categoryTags.length === 0) {
            // Fallback to base category score
            var interactionKey = person1.archetyp + '_' + person2.archetyp;
            var interaction = matrixData && matrixData.interactions && matrixData.interactions[interactionKey];
            var baseScore = (interaction && interaction.scores && interaction.scores[categoryLetter])
                ? interaction.scores[categoryLetter].value
                : 50;

            return {
                score: baseScore,
                modifier: 0,
                tags: []
            };
        }

        var totalScore = 0;
        var totalMod = 0;
        var tagDetails = [];

        for (var i = 0; i < categoryTags.length; i++) {
            var tagId = categoryTags[i];
            var result = calculateTagWithModifiers(tagId, person1, person2, pathosCheck, matrixData);

            totalScore += result.score;
            totalMod += result.modifier;

            tagDetails.push({
                id: tagId,
                score: result.score,
                baseScore: result.baseScore,
                modifier: result.modifier,
                dims: result.dims,
                desc: result.desc
            });
        }

        return {
            score: Math.round(totalScore / categoryTags.length),
            modifier: Math.round(totalMod / categoryTags.length),
            tags: tagDetails
        };
    }

    /**
     * Calculate all categories with modifiers
     *
     * @param {object} person1 - Person 1 data
     * @param {object} person2 - Person 2 data
     * @param {object} pathosCheck - Result from physical compatibility check
     * @param {object} matrixData - The archetype-matrix.json data
     * @returns {object} All category results keyed by letter
     */
    function calculateAllCategories(person1, person2, pathosCheck, matrixData) {
        var categories = ['A', 'B', 'C', 'D', 'E', 'F'];
        var results = {};

        for (var i = 0; i < categories.length; i++) {
            var cat = categories[i];
            results[cat] = calculateCategoryWithModifiers(cat, person1, person2, pathosCheck, matrixData);
        }

        return results;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        calculateTagWithModifiers: calculateTagWithModifiers,
        calculateCategoryWithModifiers: calculateCategoryWithModifiers,
        calculateAllCategories: calculateAllCategories
    };

})();
