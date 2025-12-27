/**
 * TIAGE Server - Lifestyle Filter (ES Module)
 *
 * Migriert von: js/synthesis/lifestyleFilter.js
 * Prüft baseAttributes auf K.O.-Kriterien und Warnungen
 *
 * Kein Score - nur: K.O. / Warnung / OK
 */

// ═══════════════════════════════════════════════════════════════════════════
// K.O.-REGELN (Deal-Breaker)
// ═══════════════════════════════════════════════════════════════════════════

export const koRules = {
    kinderWunsch: {
        incompatible: [['ja', 'nein']],
        message: 'Kinderwunsch unvereinbar'
    },
    wohnform: {
        incompatible: [['zusammen', 'getrennt'], ['zusammen', 'alleine']],
        message: 'Wohnvorstellungen unvereinbar'
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// WARNUNGS-REGELN
// ═══════════════════════════════════════════════════════════════════════════

export const warningRules = {
    categorical: {
        kinderWunsch: {
            pairs: [['ja', 'vielleicht'], ['nein', 'vielleicht']],
            message: 'Kinderwunsch unterschiedlich'
        },
        eheWunsch: {
            pairs: [['ja', 'nein']],
            message: 'Ehewunsch unterschiedlich'
        },
        finanzen: {
            pairs: [['gemeinsam', 'getrennt']],
            message: 'Finanzvorstellungen unterschiedlich'
        }
    },
    numeric: {
        religiositaet: { threshold: 0.40, message: 'Religiöse Einstellung unterschiedlich' },
        traditionVsModern: { threshold: 0.45, message: 'Tradition/Moderne-Einstellung unterschiedlich' },
        eifersuchtNeigung: { threshold: 0.35, message: 'Eifersuchtsniveau unterschiedlich' },
        alleinZeitBeduernis: { threshold: 0.35, message: 'Bedürfnis nach Alleinzeit unterschiedlich' },
        koerperlicheNaehe: { threshold: 0.35, message: 'Bedürfnis nach körperlicher Nähe unterschiedlich' },
        sexFrequenz: { threshold: 0.35, message: 'Erwartungen an Intimität unterschiedlich' }
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function isPairMatch(val1, val2, pair) {
    return (val1 === pair[0] && val2 === pair[1]) ||
           (val1 === pair[1] && val2 === pair[0]);
}

function checkKOs(attrs1, attrs2, result) {
    for (const attr of Object.keys(koRules)) {
        const rule = koRules[attr];
        const val1 = attrs1[attr];
        const val2 = attrs2[attr];

        if (!val1 || !val2) continue;

        for (const pair of rule.incompatible) {
            if (isPairMatch(val1, val2, pair)) {
                result.isHardKO = true;
                result.conflicts.push({
                    attribute: attr,
                    value1: val1,
                    value2: val2,
                    message: rule.message
                });
            }
        }
    }
}

function checkWarnings(attrs1, attrs2, result) {
    // Kategorische Warnungen
    for (const attr of Object.keys(warningRules.categorical)) {
        const rule = warningRules.categorical[attr];
        const val1 = attrs1[attr];
        const val2 = attrs2[attr];

        if (!val1 || !val2) continue;

        for (const pair of rule.pairs) {
            if (isPairMatch(val1, val2, pair)) {
                result.warnings.push({
                    attribute: attr,
                    value1: val1,
                    value2: val2,
                    message: rule.message,
                    type: 'categorical'
                });
            }
        }
    }

    // Numerische Warnungen
    for (const attr of Object.keys(warningRules.numeric)) {
        const rule = warningRules.numeric[attr];
        const val1 = attrs1[attr];
        const val2 = attrs2[attr];

        if (typeof val1 !== 'number' || typeof val2 !== 'number') continue;

        const diff = Math.abs(val1 - val2);
        if (diff > rule.threshold) {
            result.warnings.push({
                attribute: attr,
                value1: val1,
                value2: val2,
                diff: Math.round(diff * 100) / 100,
                threshold: rule.threshold,
                message: rule.message,
                type: 'numeric'
            });
        }
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// HAUPTFUNKTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Prüft K.O.-Kriterien zwischen zwei Personen
 *
 * @param {object} ichLifestyle - Lifestyle-Attribute Person 1
 * @param {object} partnerLifestyle - Lifestyle-Attribute Person 2
 * @returns {object} { compatible, isHardKO, isSoftKO, conflicts, warnings }
 */
export function check(ichLifestyle, partnerLifestyle) {
    console.log('[LifestyleFilter] check() aufgerufen');

    const result = {
        compatible: true,
        isHardKO: false,
        isSoftKO: false,
        conflicts: [],
        warnings: []
    };

    if (!ichLifestyle || !partnerLifestyle) {
        return result;
    }

    checkKOs(ichLifestyle, partnerLifestyle, result);

    if (!result.isHardKO) {
        checkWarnings(ichLifestyle, partnerLifestyle, result);
    }

    result.compatible = !result.isHardKO;
    result.isSoftKO = result.warnings.length >= 3;

    return result;
}

/**
 * Formatiert das Ergebnis für die UI
 */
export function formatForUI(result) {
    if (result.isHardKO) {
        return {
            status: 'ko',
            icon: '🚫',
            title: 'Nicht kompatibel',
            messages: result.conflicts.map(c => c.message)
        };
    }

    if (result.warnings.length > 0) {
        return {
            status: 'warning',
            icon: '⚠️',
            title: 'Gesprächsbedarf',
            messages: result.warnings.map(w => w.message)
        };
    }

    return {
        status: 'ok',
        icon: '✓',
        title: 'Kompatibel',
        messages: []
    };
}

// Default export
export default {
    koRules,
    warningRules,
    check,
    formatForUI
};
