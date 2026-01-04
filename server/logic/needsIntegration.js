/**
 * TIAGE Server - Needs Integration (ES Module)
 *
 * Migriert von: js/synthesis/needsIntegration.js
 * R-Faktoren Berechnung (Kohärenz Archetyp ↔ Bedürfnisse)
 */

import * as Constants from './constants.js';

// ═══════════════════════════════════════════════════════════════════════════
// R-FAKTOREN BERECHNUNG
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Berechnet R-Faktoren (R1-R4) für eine Person
 *
 * v3.2: R = similarity² (quadratisch, mit Komplementär-Mapping)
 * Range: 0 - 1
 *
 * @param {string} person - 'ich' oder 'partner'
 * @param {object} profile - Profil mit archetyp und needs
 * @returns {object} { R1, R2, R3, R4, enabled }
 */
export function calculateDimensionalResonance(person, profile) {
    console.log(`[NeedsIntegration] calculateDimensionalResonance(${person})`);

    if (!profile || !profile.archetyp) {
        console.warn('[NeedsIntegration] Kein Archetyp im Profil');
        return { R1: 1.0, R2: 1.0, R3: 1.0, R4: 1.0, enabled: false };
    }

    const archetyp = profile.archetyp;
    const needs = profile.needs || {};

    // Hole archetyp-typische Werte aus ARCHETYP_KOHAERENZ
    const kohaerenz = Constants.ARCHETYP_KOHAERENZ;

    // R1: Leben (Orientierung)
    const R1 = calculateDimensionR(needs, kohaerenz.leben?.[archetyp] || {});

    // R2: Philosophie (Archetyp)
    const R2 = calculateDimensionR(needs, kohaerenz.philosophie?.[archetyp] || {});

    // R3: Dynamik (Dominanz)
    const R3 = calculateDimensionR(needs, kohaerenz.dynamik?.[archetyp] || {});

    // R4: Identität (Geschlecht)
    const R4 = calculateDimensionR(needs, kohaerenz.identitaet?.[archetyp] || {});

    return {
        R1: Math.round(R1 * 1000) / 1000,
        R2: Math.round(R2 * 1000) / 1000,
        R3: Math.round(R3 * 1000) / 1000,
        R4: Math.round(R4 * 1000) / 1000,
        enabled: true,
        archetyp
    };
}

/**
 * Berechnet R-Wert für eine Dimension
 * v3.2: R = similarity² (quadratisch)
 *
 * @param {object} actualNeeds - Tatsächliche Bedürfniswerte
 * @param {object} expectedNeeds - Archetyp-typische Werte
 * @returns {number} R-Wert (0 - 1)
 */
function calculateDimensionR(actualNeeds, expectedNeeds) {
    const keys = Object.keys(expectedNeeds);
    if (keys.length === 0) return 1.0;

    let totalMatch = 0;
    let count = 0;

    for (const key of keys) {
        const expected = expectedNeeds[key];
        const actual = actualNeeds[key];

        if (actual !== undefined && expected !== undefined) {
            // Differenz normalisieren (0-100 -> 0-1)
            const diff = Math.abs(actual - expected) / 100;
            const match = 1 - diff;  // 1 = perfekt, 0 = maximal verschieden
            totalMatch += match;
            count++;
        }
    }

    if (count === 0) return 1.0;

    // Durchschnittliche Übereinstimmung
    const avgMatch = totalMatch / count;

    // v3.2: R = avgMatch² (quadratisch)
    // Bei avgMatch = 0 → R = 0 (eliminiert)
    // Bei avgMatch = 0.7 → R = 0.49
    // Bei avgMatch = 1 → R = 1 (neutral)
    return avgMatch * avgMatch;
}

// ═══════════════════════════════════════════════════════════════════════════
// RESONANZ AUF BEDÜRFNISSE ANWENDEN
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Wendet Resonanz-Faktoren auf Bedürfnisse an
 *
 * @param {object} needs - Bedürfniswerte
 * @param {object} resonanz - { R1, R2, R3, R4 }
 * @returns {object} Modifizierte Bedürfnisse
 */
export function applyResonanceToNeeds(needs, resonanz) {
    if (!needs || !resonanz || !resonanz.enabled) {
        return needs;
    }

    const modified = { ...needs };

    // Wende R-Faktoren auf relevante Bedürfnisse an
    const needsMapping = {
        leben: Constants.NEEDS_INTEGRATION.ORIENTIERUNG_NEEDS,
        philosophie: Constants.NEEDS_INTEGRATION.ARCHETYP_NEEDS,
        dynamik: Constants.NEEDS_INTEGRATION.DOMINANZ_NEEDS,
        identitaet: Constants.NEEDS_INTEGRATION.GESCHLECHT_NEEDS
    };

    const rMapping = {
        leben: resonanz.R1,
        philosophie: resonanz.R2,
        dynamik: resonanz.R3,
        identitaet: resonanz.R4
    };

    for (const [dimension, needsList] of Object.entries(needsMapping)) {
        const rValue = rMapping[dimension] || 1.0;

        for (const needKey of needsList) {
            if (modified[needKey] !== undefined) {
                // Modifiziere nur wenn R != 1.0
                if (rValue !== 1.0) {
                    // Skaliere um den Mittelpunkt (50)
                    const original = modified[needKey];
                    const deviation = original - 50;
                    const scaledDeviation = deviation * rValue;
                    modified[needKey] = Math.max(0, Math.min(100, 50 + scaledDeviation));
                }
            }
        }
    }

    return modified;
}

// ═══════════════════════════════════════════════════════════════════════════
// FAKTOR-MATCHING
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Berechnet Bedürfnis-Match für alle Faktoren
 *
 * @param {object} person1 - Profil Person 1
 * @param {object} person2 - Profil Person 2
 * @returns {object} { archetyp, orientierung, dominanz, geschlecht }
 */
export function calculateAllFactorMatches(person1, person2) {
    const needs1 = person1.needs || {};
    const needs2 = person2.needs || {};

    return {
        archetyp: calculateFactorMatch(needs1, needs2, Constants.NEEDS_INTEGRATION.ARCHETYP_NEEDS),
        orientierung: calculateFactorMatch(needs1, needs2, Constants.NEEDS_INTEGRATION.ORIENTIERUNG_NEEDS),
        dominanz: calculateFactorMatch(needs1, needs2, Constants.NEEDS_INTEGRATION.DOMINANZ_NEEDS),
        geschlecht: calculateFactorMatch(needs1, needs2, Constants.NEEDS_INTEGRATION.GESCHLECHT_NEEDS)
    };
}

/**
 * Berechnet Bedürfnis-Match für einen Faktor
 */
function calculateFactorMatch(needs1, needs2, relevantNeeds) {
    const gemeinsam = [];
    const unterschiedlich = [];
    let totalMatch = 0;
    let count = 0;

    for (const key of relevantNeeds) {
        const val1 = needs1[key];
        const val2 = needs2[key];

        if (val1 !== undefined && val2 !== undefined) {
            const diff = Math.abs(val1 - val2);
            const match = 100 - diff;
            totalMatch += match;
            count++;

            if (diff <= 15) {
                gemeinsam.push({ key, val1, val2, diff });
            } else if (diff >= 30) {
                unterschiedlich.push({ key, val1, val2, diff });
            }
        }
    }

    const score = count > 0 ? Math.round(totalMatch / count) : 50;

    return {
        score,
        gemeinsam,
        unterschiedlich
    };
}

// ═══════════════════════════════════════════════════════════════════════════
// SCORE-KOMBINATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Kombiniert Matrix-Score mit Bedürfnis-Score
 *
 * @param {number} matrixScore - Score aus Kompatibilitäts-Matrix
 * @param {number} needsScore - Score aus Bedürfnis-Matching
 * @param {string} faktor - 'archetyp', 'orientierung', 'dominanz', 'geschlecht'
 * @returns {object} { combinedScore, needsIntegrated }
 */
export function combineScores(matrixScore, needsScore, faktor) {
    const weights = Constants.NEEDS_INTEGRATION.FACTOR_WEIGHTS[faktor] || { matrix: 0.5, needs: 0.5 };

    const combinedScore = Math.round(
        (matrixScore * weights.matrix) + (needsScore * weights.needs)
    );

    return {
        combinedScore,
        needsIntegrated: weights.needs,
        matrixWeight: weights.matrix,
        needsWeight: weights.needs
    };
}

// ═══════════════════════════════════════════════════════════════════════════
// PERSPEKTIVEN-BASIERTE RESONANZ
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Berechnet Resonanz aus Perspektiven-Vergleich
 * (Alternative zu gespeicherten R-Werten)
 */
export function calculateResonanceFromPerspectives(needs1, archetyp1, needs2, archetyp2) {
    // Berechne individuelle R-Werte
    const r1 = calculateDimensionalResonance('ich', { archetyp: archetyp1, needs: needs1 });
    const r2 = calculateDimensionalResonance('partner', { archetyp: archetyp2, needs: needs2 });

    // Kombiniere via Produkt
    return {
        R1: r1.R1 * r2.R1,
        R2: r1.R2 * r2.R2,
        R3: r1.R3 * r2.R3,
        R4: r1.R4 * r2.R4,
        source: 'calculated',
        individual: { ich: r1, partner: r2 }
    };
}

// Default export
export default {
    calculateDimensionalResonance,
    applyResonanceToNeeds,
    calculateAllFactorMatches,
    combineScores,
    calculateResonanceFromPerspectives
};
