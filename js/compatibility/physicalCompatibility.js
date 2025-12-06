/**
 * PHYSICAL COMPATIBILITY - Pathos Check
 *
 * Prüft die physische Kompatibilität (Geschlecht + Orientierung)
 * zwischen zwei Personen.
 *
 * Extrahiert aus app-main.js für bessere Wartbarkeit und Testbarkeit.
 *
 * @module TiageCompatibility.Physical
 */

var TiageCompatibility = TiageCompatibility || {};

TiageCompatibility.Physical = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // GENDER HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Check if gender is male category (includes cis and trans)
     * @param {string} gender - Gender value
     * @returns {boolean}
     */
    function isMaleGender(gender) {
        if (!gender) return false;
        var g = gender.toLowerCase();
        return g === 'männlich' || g === 'cis_mann' || g === 'trans_mann' ||
               g === 'mann' || g === 'male' || g === 'm';
    }

    /**
     * Check if gender is female category (includes cis and trans)
     * @param {string} gender - Gender value
     * @returns {boolean}
     */
    function isFemaleGender(gender) {
        if (!gender) return false;
        var g = gender.toLowerCase();
        return g === 'weiblich' || g === 'cis_frau' || g === 'trans_frau' ||
               g === 'frau' || g === 'female' || g === 'w' || g === 'f';
    }

    /**
     * Check if two genders are in the same category
     * @param {string} g1 - Gender 1
     * @param {string} g2 - Gender 2
     * @returns {boolean}
     */
    function isSameGenderCategory(g1, g2) {
        if (isMaleGender(g1) && isMaleGender(g2)) return true;
        if (isFemaleGender(g1) && isFemaleGender(g2)) return true;
        // Non-binary/other: compare directly
        return g1 === g2;
    }

    /**
     * Check if two genders are in different binary categories (male vs female)
     * @param {string} g1 - Gender 1
     * @param {string} g2 - Gender 2
     * @returns {boolean}
     */
    function isDifferentBinaryGender(g1, g2) {
        return (isMaleGender(g1) && isFemaleGender(g2)) ||
               (isFemaleGender(g1) && isMaleGender(g2));
    }

    // ═══════════════════════════════════════════════════════════════════════
    // ORIENTATION PAIR CHECK
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Check single pair of orientations
     * @param {string} type1 - Orientation type person 1
     * @param {string} status1 - Status person 1 ('gelebt' | 'interessiert')
     * @param {string} type2 - Orientation type person 2
     * @param {string} status2 - Status person 2 ('gelebt' | 'interessiert')
     * @param {string} g1 - Gender person 1
     * @param {string} g2 - Gender person 2
     * @returns {string} 'möglich' | 'unsicher' | 'unmöglich'
     */
    function checkSingleOrientationPair(type1, status1, type2, status2, g1, g2) {
        // Bisexuell is always compatible
        if (type1 === 'bisexuell' || type2 === 'bisexuell') {
            return (status1 === 'interessiert' || status2 === 'interessiert') ? 'unsicher' : 'möglich';
        }

        // Both heterosexuell - need different gender categories (male + female)
        if (type1 === 'heterosexuell' && type2 === 'heterosexuell') {
            if (isDifferentBinaryGender(g1, g2)) {
                return (status1 === 'interessiert' || status2 === 'interessiert') ? 'unsicher' : 'möglich';
            } else {
                return 'unmöglich'; // Same gender category, both hetero
            }
        }

        // Both homosexuell - need same gender category
        if (type1 === 'homosexuell' && type2 === 'homosexuell') {
            if (isSameGenderCategory(g1, g2)) {
                return (status1 === 'interessiert' || status2 === 'interessiert') ? 'unsicher' : 'möglich';
            } else {
                return 'unmöglich'; // Different gender category, both homo
            }
        }

        // Mixed: hetero + homo - check if exploring
        if (status1 === 'interessiert' || status2 === 'interessiert') {
            return 'unsicher'; // Exploration could change things
        }
        return 'unmöglich';
    }

    // ═══════════════════════════════════════════════════════════════════════
    // MAIN COMPATIBILITY CHECK
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Check physical compatibility between two persons
     *
     * @param {object} person1 - Person 1 data
     * @param {object} person2 - Person 2 data
     * @returns {object} Result with:
     *   - result: 'möglich' | 'unsicher' | 'unmöglich' | 'unvollständig'
     *   - confidence: 'hoch' | 'mittel' | 'niedrig' (optional)
     *   - reason: string (optional)
     *   - explanation: string (optional)
     *   - missingItems: array (optional)
     */
    function check(person1, person2) {
        // Extract primary gender from object format { primary: 'cis_mann', secondary: null }
        var g1 = person1.geschlecht;
        var g2 = person2.geschlecht;

        if (g1 && typeof g1 === 'object' && 'primary' in g1) {
            g1 = g1.primary;
        }
        if (g2 && typeof g2 === 'object' && 'primary' in g2) {
            g2 = g2.primary;
        }

        // Get orientierung as multi-select object
        var ori1 = person1.orientierung;
        var ori2 = person2.orientierung;

        // Collect all missing items
        var missingItems = [];

        if (!g1) missingItems.push('Ich: Geschlecht');
        if (!g2) missingItems.push('Partner: Geschlecht');

        // Handle multi-select orientierung
        var oriList1 = [];
        var oriList2 = [];

        if (ori1 && typeof ori1 === 'object') {
            // New format: { primary: 'homosexuell', secondary: 'heterosexuell' }
            if ('primary' in ori1) {
                if (ori1.primary) oriList1.push({ type: ori1.primary, status: 'gelebt' });
                if (ori1.secondary) oriList1.push({ type: ori1.secondary, status: 'interessiert' });
            } else {
                // Old format: { heterosexuell: 'gelebt', homosexuell: 'interessiert' }
                if (ori1.heterosexuell) oriList1.push({ type: 'heterosexuell', status: ori1.heterosexuell });
                if (ori1.homosexuell) oriList1.push({ type: 'homosexuell', status: ori1.homosexuell });
                if (ori1.bisexuell) oriList1.push({ type: 'bisexuell', status: ori1.bisexuell });
            }
        } else if (ori1 && typeof ori1 === 'string') {
            // Backwards compatibility for old single-value format
            oriList1.push({ type: ori1, status: person1.orientierungStatus || 'gelebt' });
        }

        if (ori2 && typeof ori2 === 'object') {
            // New format: { primary: 'homosexuell', secondary: 'heterosexuell' }
            if ('primary' in ori2) {
                if (ori2.primary) oriList2.push({ type: ori2.primary, status: 'gelebt' });
                if (ori2.secondary) oriList2.push({ type: ori2.secondary, status: 'interessiert' });
            } else {
                // Old format: { heterosexuell: 'gelebt', homosexuell: 'interessiert' }
                if (ori2.heterosexuell) oriList2.push({ type: 'heterosexuell', status: ori2.heterosexuell });
                if (ori2.homosexuell) oriList2.push({ type: 'homosexuell', status: ori2.homosexuell });
                if (ori2.bisexuell) oriList2.push({ type: 'bisexuell', status: ori2.bisexuell });
            }
        } else if (ori2 && typeof ori2 === 'string') {
            // Backwards compatibility for old single-value format
            oriList2.push({ type: ori2, status: person2.orientierungStatus || 'gelebt' });
        }

        // Check if orientierung is missing
        if (oriList1.length === 0) missingItems.push('Ich: Orientierung');
        if (oriList2.length === 0) missingItems.push('Partner: Orientierung');

        // Return incomplete if any items are missing
        if (missingItems.length > 0) {
            return {
                result: 'unvollständig',
                reason: 'Dimensionen unvollständig',
                explanation: 'Es fehlt noch: ' + missingItems.join(', '),
                missingItems: missingItems
            };
        }

        // Check all combinations
        var hasPossible = false;
        var hasUnsicher = false;
        var hasInteressiert = false;

        for (var i = 0; i < oriList1.length; i++) {
            var o1 = oriList1[i];
            for (var j = 0; j < oriList2.length; j++) {
                var o2 = oriList2[j];
                var result = checkSingleOrientationPair(o1.type, o1.status, o2.type, o2.status, g1, g2);

                if (result === 'möglich') {
                    hasPossible = true;
                } else if (result === 'unsicher') {
                    hasUnsicher = true;
                }

                if (o1.status === 'interessiert' || o2.status === 'interessiert') {
                    hasInteressiert = true;
                }
            }
        }

        // Return best result
        if (hasPossible && !hasInteressiert) {
            return { result: 'möglich', confidence: 'hoch' };
        }

        if (hasPossible && hasInteressiert) {
            return {
                result: 'unsicher',
                confidence: 'mittel',
                explanation: 'Anziehung möglich, aber mindestens eine Person ist in der Explorationsphase.',
                note: 'Status "Interessiert" bedeutet Exploration'
            };
        }

        if (hasUnsicher) {
            return {
                result: 'unsicher',
                confidence: 'niedrig',
                explanation: 'Anziehung ist theoretisch möglich, aber unsicher.',
                note: 'Exploration-Phase'
            };
        }

        return {
            result: 'unmöglich',
            reason: 'Inkompatible Orientierungen',
            explanation: 'Die sexuellen Orientierungen schließen gegenseitige Anziehung aus.'
        };
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        // Main function
        check: check,

        // Helper functions (exposed for testing and reuse)
        isMaleGender: isMaleGender,
        isFemaleGender: isFemaleGender,
        isSameGenderCategory: isSameGenderCategory,
        isDifferentBinaryGender: isDifferentBinaryGender,
        checkSingleOrientationPair: checkSingleOrientationPair
    };

})();
