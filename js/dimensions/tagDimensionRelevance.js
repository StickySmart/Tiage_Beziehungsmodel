/**
 * TAG DIMENSION RELEVANCE
 *
 * Definiert welche Tags von welchen Dimensionen beeinflusst werden.
 * Ermöglicht dynamische Anpassung der Scores basierend auf
 * Geschlecht, Dominanz und Orientierung.
 *
 * Extrahiert aus app-main.js für bessere Wartbarkeit und Testbarkeit.
 *
 * @module TiageDimensions.TagRelevance
 */

var TiageDimensions = TiageDimensions || {};

TiageDimensions.TagRelevance = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // TAG DIMENSION RELEVANCE MAPPING
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Maps each tag to the dimensions that influence it.
     * Empty array means the tag is purely archetype-based.
     */
    var tagDimensionRelevance = {
        // KATEGORIE A: Beziehungsphilosophie - KEINE Dimensions-Einflüsse!
        "exklusivitaets-erwartung": [],
        "offenheit-fuer-alternative-modelle": [],
        "beziehung-als-lebensinhalt": [],
        "primaerbeziehung-konzept": [],
        "commitment-tiefe": [],

        // KATEGORIE B: Werte-Alignment
        "fuehrung-und-initiative": ["dominanz"],
        "macht-balance": ["dominanz"],
        "emotionale-reziprozitaet": [],
        "eifersucht-umgang": [],
        "konfliktloesung": ["dominanz"],
        "emotionale-tiefe": [],

        // KATEGORIE C: Nähe-Distanz
        "entscheidungsfindung": ["dominanz"],
        "alltags-organisation": ["dominanz"],
        "autonomie-vs-gemeinsame-zeit": [],
        "finanzielle-organisation": ["dominanz"],
        "wohnform-flexibilitaet": [],
        "zeitmanagement": ["dominanz"],

        // KATEGORIE D: Autonomie / Intimität
        "koerperliche-anziehung": ["geschlecht", "orientierung", "orientierungStatus"],
        "sexuelle-dominanz-dynamik": ["dominanz"],
        "experimentierfreude": ["orientierungStatus"],
        "intimitaets-frequenz": [],
        "koerperliche-naehe": [],
        "sexuelle-offenheit": ["orientierungStatus"],

        // KATEGORIE E: Kommunikation
        "kommunikations-stil": ["dominanz"],
        "konflikt-kommunikation": ["dominanz"],
        "beduerfnis-artikulation": [],
        "feedback-kultur": [],

        // KATEGORIE F: Soziale Kompatibilität
        "philosophische-entwicklung": [],
        "anpassungsfaehigkeit": ["dominanz"],
        "krisenresilienz": ["dominanz"],
        "gemeinsame-vision": [],
        "soziales-umfeld": [],
        "gesellschaftliche-akzeptanz": []
    };

    // ═══════════════════════════════════════════════════════════════════════
    // TAG TO CATEGORY MAPPING
    // ═══════════════════════════════════════════════════════════════════════

    var tagCategoryMapping = {
        "exklusivitaets-erwartung": "A",
        "offenheit-fuer-alternative-modelle": "A",
        "beziehung-als-lebensinhalt": "A",
        "primaerbeziehung-konzept": "A",
        "commitment-tiefe": "A",

        "fuehrung-und-initiative": "B",
        "macht-balance": "B",
        "emotionale-reziprozitaet": "B",
        "eifersucht-umgang": "B",
        "konfliktloesung": "B",
        "emotionale-tiefe": "B",

        "entscheidungsfindung": "C",
        "alltags-organisation": "C",
        "autonomie-vs-gemeinsame-zeit": "C",
        "finanzielle-organisation": "C",
        "wohnform-flexibilitaet": "C",
        "zeitmanagement": "C",

        "koerperliche-anziehung": "D",
        "sexuelle-dominanz-dynamik": "D",
        "experimentierfreude": "D",
        "intimitaets-frequenz": "D",
        "koerperliche-naehe": "D",
        "sexuelle-offenheit": "D",

        "kommunikations-stil": "E",
        "konflikt-kommunikation": "E",
        "beduerfnis-artikulation": "E",
        "feedback-kultur": "E",

        "philosophische-entwicklung": "F",
        "anpassungsfaehigkeit": "F",
        "krisenresilienz": "F",
        "gemeinsame-vision": "F",
        "soziales-umfeld": "F",
        "gesellschaftliche-akzeptanz": "F"
    };

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Get relevant dimensions for a tag
     * @param {string} tagId - The tag identifier
     * @returns {array} Array of dimension names that influence this tag
     */
    function getRelevantDimensions(tagId) {
        return tagDimensionRelevance[tagId] || [];
    }

    /**
     * Get the category letter for a tag
     * @param {string} tagId - The tag identifier
     * @returns {string|null} Category letter (A-F) or null
     */
    function getTagCategory(tagId) {
        return tagCategoryMapping[tagId] || null;
    }

    /**
     * Get all tags for a specific category
     * @param {string} categoryLetter - Category letter (A-F)
     * @returns {array} Array of tag IDs in that category
     */
    function getTagsForCategory(categoryLetter) {
        var tags = [];
        for (var tagId in tagCategoryMapping) {
            if (tagCategoryMapping[tagId] === categoryLetter) {
                tags.push(tagId);
            }
        }
        return tags;
    }

    /**
     * Check if a tag is influenced by a specific dimension
     * @param {string} tagId - The tag identifier
     * @param {string} dimension - The dimension name
     * @returns {boolean}
     */
    function isInfluencedBy(tagId, dimension) {
        var dims = tagDimensionRelevance[tagId];
        return dims && dims.indexOf(dimension) !== -1;
    }

    /**
     * Get all tags influenced by a specific dimension
     * @param {string} dimension - The dimension name (e.g., 'dominanz', 'geschlecht')
     * @returns {array} Array of tag IDs influenced by this dimension
     */
    function getTagsInfluencedBy(dimension) {
        var tags = [];
        for (var tagId in tagDimensionRelevance) {
            var dims = tagDimensionRelevance[tagId];
            if (dims && dims.indexOf(dimension) !== -1) {
                tags.push(tagId);
            }
        }
        return tags;
    }

    /**
     * Get all available tags
     * @returns {array} Array of all tag IDs
     */
    function getAllTags() {
        return Object.keys(tagDimensionRelevance);
    }

    /**
     * Get the raw mapping (for debugging/inspection)
     * @returns {object} The tagDimensionRelevance mapping
     */
    function getRawMapping() {
        return tagDimensionRelevance;
    }

    return {
        getRelevantDimensions: getRelevantDimensions,
        getTagCategory: getTagCategory,
        getTagsForCategory: getTagsForCategory,
        isInfluencedBy: isInfluencedBy,
        getTagsInfluencedBy: getTagsInfluencedBy,
        getAllTags: getAllTags,
        getRawMapping: getRawMapping
    };

})();
