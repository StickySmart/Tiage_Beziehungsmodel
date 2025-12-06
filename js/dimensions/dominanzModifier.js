/**
 * DOMINANZ MODIFIER
 *
 * Berechnet Modifikatoren basierend auf der Dominanz-Dynamik
 * zwischen zwei Personen. Basiert auf Forschung von
 * Sadikaj et al. (2017) und Tiedens & Fragale (2003).
 *
 * Extrahiert aus app-main.js für bessere Wartbarkeit und Testbarkeit.
 *
 * @module TiageDimensions.Dominanz
 */

var TiageDimensions = TiageDimensions || {};

TiageDimensions.Dominanz = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // MODIFIER VALUES
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Modifier values for different dominance combinations.
     * Positive = bonus, Negative = penalty
     */
    var modifierValues = {
        complementary: 8,      // dominant + submissiv
        bothBalanced: 5,       // ausgeglichen + ausgeglichen
        bothSwitch: 3,         // switch + switch
        sameExtreme: -5,       // dominant + dominant OR submissiv + submissiv
        oneFlexible: 2         // switch/ausgeglichen with anything else
    };

    // ═══════════════════════════════════════════════════════════════════════
    // CORE FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Calculate dominanz modifier between two persons
     *
     * @param {string|object} dom1 - Dominance value/object for person 1
     * @param {string|object} dom2 - Dominance value/object for person 2
     * @returns {number} Modifier value (-5 to +8)
     */
    function getModifier(dom1, dom2) {
        // Extract primary dominance if object format
        var d1 = extractDominance(dom1);
        var d2 = extractDominance(dom2);

        // Return 0 if either is null/undefined
        if (!d1 || !d2) return 0;

        // KOMPLEMENTÄR
        if ((d1 === "dominant" && d2 === "submissiv") ||
            (d1 === "submissiv" && d2 === "dominant")) {
            return modifierValues.complementary;
        }

        // BEIDE GLEICH
        if (d1 === d2) {
            if (d1 === "ausgeglichen") return modifierValues.bothBalanced;
            if (d1 === "switch") return modifierValues.bothSwitch;
            if (d1 === "dominant") return modifierValues.sameExtreme;
            if (d1 === "submissiv") return modifierValues.sameExtreme;
        }

        // EINER FLEXIBEL
        if (d1 === "switch" || d2 === "switch" ||
            d1 === "ausgeglichen" || d2 === "ausgeglichen") {
            return modifierValues.oneFlexible;
        }

        return 0;
    }

    /**
     * Get description for dominanz modifier (German)
     * Based on research: Sadikaj et al. (2017), Tiedens & Fragale (2003)
     *
     * @param {string|object} dom1 - Dominance value/object for person 1
     * @param {string|object} dom2 - Dominance value/object for person 2
     * @param {number} modifier - The calculated modifier value
     * @returns {string} German description text
     */
    function getDescription(dom1, dom2, modifier) {
        var d1 = extractDominance(dom1);
        var d2 = extractDominance(dom2);

        if (modifier === modifierValues.complementary) {
            return 'Komplementär (' + d1 + ' × ' + d2 + '): Optimale Rollenverteilung - Forschung zeigt höhere Sympathie und Komfort';
        }
        if (modifier === modifierValues.bothBalanced) {
            return 'Beide ausgeglichen: Flexible Dynamik ohne starre Hierarchie';
        }
        if (modifier === modifierValues.bothSwitch) {
            return 'Beide switch: Wechselnde Dynamik mit situativer Anpassung';
        }
        if (modifier === modifierValues.sameExtreme && d1 === "dominant") {
            return 'Beide dominant: Machtkampf-Risiko - bewusste Kommunikationsregeln empfohlen';
        }
        if (modifier === modifierValues.sameExtreme && d1 === "submissiv") {
            return 'Beide submissiv: Führungsvakuum - klare Aufgabenteilung empfohlen';
        }
        if (modifier === modifierValues.oneFlexible) {
            return 'Flexibilität: Ein Partner passt sich situativ an';
        }
        return "Neutral";
    }

    /**
     * Extract dominance type from various formats
     *
     * @param {string|object} dominanz - Dominance value or object
     * @returns {string|null} Normalized dominance type
     */
    function extractDominance(dominanz) {
        if (!dominanz) return null;

        // Simple string
        if (typeof dominanz === 'string') return dominanz;

        // Object format
        if (typeof dominanz === 'object') {
            // New format: { primary: 'dominant', secondary: 'submissiv' }
            if ('primary' in dominanz) {
                return dominanz.primary || null;
            }
            // Old format: { dominant: 'gelebt', submissiv: 'interessiert' }
            if (dominanz.dominant) return 'dominant';
            if (dominanz.submissiv) return 'submissiv';
            if (dominanz.switch) return 'switch';
            if (dominanz.ausgeglichen) return 'ausgeglichen';
        }

        return null;
    }

    /**
     * Get modifier summary for display
     *
     * @param {object} person1 - Person 1 data
     * @param {object} person2 - Person 2 data
     * @returns {array} Array of modifier summary objects
     */
    function getSummary(person1, person2) {
        var summaries = [];
        var modifier = getModifier(person1.dominanz, person2.dominanz);

        if (modifier !== 0) {
            summaries.push({
                type: "Dominanz",
                modifier: modifier,
                description: getDescription(person1.dominanz, person2.dominanz, modifier)
            });
        }

        return summaries;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        getModifier: getModifier,
        getDescription: getDescription,
        extractDominance: extractDominance,
        getSummary: getSummary,
        modifierValues: modifierValues
    };

})();

// Also expose as TiageDimensions.Modifiers for backward compatibility
TiageDimensions.Modifiers = TiageDimensions.Modifiers || {};
TiageDimensions.Modifiers.getSummary = function(person1, person2) {
    return TiageDimensions.Dominanz.getSummary(person1, person2);
};
TiageDimensions.Modifiers.getDominanzModifier = TiageDimensions.Dominanz.getModifier;
TiageDimensions.Modifiers.getDominanzDescription = TiageDimensions.Dominanz.getDescription;
