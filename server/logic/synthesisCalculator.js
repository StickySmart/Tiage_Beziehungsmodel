/**
 * TIAGE Server - Synthesis Calculator (ES Module)
 *
 * Migriert von: js/synthesis/synthesisCalculator.js
 * Q-Formel: Q = [(O × wO × r1) + (A × wA × r2) + (D × wD × r3) + (G × wG × r4)]
 */

import * as Constants from './constants.js';
import * as NeedsIntegration from './needsIntegration.js';

// ═══════════════════════════════════════════════════════════════════════════
// MAIN CALCULATION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Hauptberechnung der Beziehungsqualität
 *
 * @param {object} person1 - Profil Person 1 (ich)
 * @param {object} person2 - Profil Person 2 (partner)
 * @param {object} options - Optionen (weights, gfk, etc.)
 * @returns {object} Vollständiges Ergebnis
 */
export function calculate(person1, person2, options = {}) {
    console.log('[SynthesisCalculator] calculate() - Server-Version');

    // Gewichtungen
    const weights = options.weights
        ? Constants.getWeights(options.weights)
        : Constants.DEFAULT_WEIGHTS;

    // ═══════════════════════════════════════════════════════════════════
    // SCHRITT 1: R-Faktoren berechnen (dimensionale Resonanz)
    // ═══════════════════════════════════════════════════════════════════

    const resonanz1 = NeedsIntegration.calculateDimensionalResonance('ich', person1);
    const resonanz2 = NeedsIntegration.calculateDimensionalResonance('partner', person2);

    // Kombiniere R-Faktoren via Produkt
    const R1 = (resonanz1.R1 || 1.0) * (resonanz2.R1 || 1.0);
    const R2 = (resonanz1.R2 || 1.0) * (resonanz2.R2 || 1.0);
    const R3 = (resonanz1.R3 || 1.0) * (resonanz2.R3 || 1.0);
    let R4 = (resonanz1.R4 || 1.0) * (resonanz2.R4 || 1.0);

    // ═══════════════════════════════════════════════════════════════════
    // CIS+CIS KORREKTUR: Bei beiden Cis ist R4 (Identität) neutral
    // ═══════════════════════════════════════════════════════════════════
    // Rationale: R4 misst die "Offenheit für nicht-cis Identitäten"
    // (basierend auf GESCHLECHT_NEEDS: Authentizität, Akzeptanz, etc.)
    // Bei Cis+Cis ist diese Offenheit irrelevant - beide sind cis.
    const secondary1 = person1.geschlecht?.secondary || null;
    const secondary2 = person2.geschlecht?.secondary || null;
    let cisCisNeutral = false;

    if (secondary1 === 'cis' && secondary2 === 'cis') {
        R4 = 1.0;
        cisCisNeutral = true;
        console.log('[SynthesisCalculator] CIS+CIS erkannt: R4 auf 1.0 (neutral) gesetzt');
    }

    // ═══════════════════════════════════════════════════════════════════
    // SCHRITT 2: Faktor-Scores berechnen
    // ═══════════════════════════════════════════════════════════════════

    const archetypScore = calculateArchetypScore(person1.archetyp, person2.archetyp);
    const orientierungScore = calculateOrientierungScore(person1, person2);
    const dominanzScore = calculateDominanzScore(person1.dominanz, person2.dominanz);
    const geschlechtScore = calculateGeschlechtScore(person1, person2);

    // ═══════════════════════════════════════════════════════════════════
    // SCHRITT 3: Bedürfnis-Match berechnen
    // ═══════════════════════════════════════════════════════════════════

    const beduerfnisResult = calculateNeedsMatch(person1, person2);

    // ═══════════════════════════════════════════════════════════════════
    // SCHRITT 4: Scores kombinieren (Matrix + Needs)
    // ═══════════════════════════════════════════════════════════════════

    const factorWeights = Constants.NEEDS_INTEGRATION.FACTOR_WEIGHTS;

    const scores = {
        archetyp: combineScore(archetypScore, beduerfnisResult.archetyp, factorWeights.archetyp),
        orientierung: combineScore(orientierungScore, beduerfnisResult.orientierung, factorWeights.orientierung),
        dominanz: combineScore(dominanzScore, beduerfnisResult.dominanz, factorWeights.dominanz),
        geschlecht: combineScore(geschlechtScore, beduerfnisResult.geschlecht, factorWeights.geschlecht)
    };

    // ═══════════════════════════════════════════════════════════════════
    // SCHRITT 5: Logos/Pathos berechnen
    // ═══════════════════════════════════════════════════════════════════

    const logos = scores.archetyp;
    const pathos = (scores.orientierung + scores.dominanz + scores.geschlecht) / 3;

    // ═══════════════════════════════════════════════════════════════════
    // SCHRITT 6: Finale Berechnung mit R-Faktoren
    // ═══════════════════════════════════════════════════════════════════

    const baseScore =
        (scores.archetyp * weights.archetyp) +
        (scores.orientierung * weights.orientierung) +
        (scores.dominanz * weights.dominanz) +
        (scores.geschlecht * weights.geschlecht);

    // v3.1: Dimensionale Multiplikation
    const finalScore = Math.round(
        (scores.archetyp * weights.archetyp * R2) +      // Philosophie
        (scores.orientierung * weights.orientierung * R1) + // Leben
        (scores.dominanz * weights.dominanz * R3) +       // Dynamik
        (scores.geschlecht * weights.geschlecht * R4)     // Identität
    );

    // Gesamt-Resonanz-Koeffizient
    const resonanzCoefficient = (R1 + R2 + R3 + R4) / 4;

    // ═══════════════════════════════════════════════════════════════════
    // ERGEBNIS
    // ═══════════════════════════════════════════════════════════════════

    return {
        score: Math.max(0, Math.min(100, finalScore)),
        baseScore: Math.round(baseScore),

        resonanz: {
            coefficient: Math.round(resonanzCoefficient * 1000) / 1000,
            cisCisNeutral: cisCisNeutral, // true wenn beide Cis → R4 wurde auf 1.0 gesetzt
            dimensional: {
                leben:       { rValue: Math.round(R1 * 1000) / 1000, status: getStatus(R1) },
                philosophie: { rValue: Math.round(R2 * 1000) / 1000, status: getStatus(R2) },
                dynamik:     { rValue: Math.round(R3 * 1000) / 1000, status: getStatus(R3) },
                identitaet:  { rValue: Math.round(R4 * 1000) / 1000, status: getStatus(R4), cisCisNeutral: cisCisNeutral }
            }
        },

        logos: {
            score: Math.round(logos),
            weight: weights.archetyp,
            contribution: Math.round(scores.archetyp * weights.archetyp)
        },
        pathos: {
            score: Math.round(pathos),
            weight: 1 - weights.archetyp,
            contribution: Math.round(
                (scores.orientierung * weights.orientierung) +
                (scores.dominanz * weights.dominanz) +
                (scores.geschlecht * weights.geschlecht)
            )
        },

        breakdown: {
            archetyp:     { score: Math.round(scores.archetyp), weight: weights.archetyp, category: 'logos' },
            orientierung: { score: Math.round(scores.orientierung), weight: weights.orientierung, category: 'pathos' },
            dominanz:     { score: Math.round(scores.dominanz), weight: weights.dominanz, category: 'pathos' },
            geschlecht:   { score: Math.round(scores.geschlecht), weight: weights.geschlecht, category: 'pathos' }
        },

        beduerfnisse: {
            score: beduerfnisResult.totalScore,
            gemeinsam: beduerfnisResult.gemeinsam,
            unterschiedlich: beduerfnisResult.unterschiedlich
        },

        meta: {
            isHardKO: false,  // TODO: Implementieren
            isSoftKO: checkSoftKO(beduerfnisResult),
            v31Resonanz: {
                person1: resonanz1,
                person2: resonanz2,
                enabled: true
            }
        }
    };
}

// ═══════════════════════════════════════════════════════════════════════════
// FAKTOR-BERECHNUNGEN
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Berechnet Archetyp-Kompatibilität aus Matrix
 */
function calculateArchetypScore(arch1, arch2) {
    // Einfache Archetyp-Kompatibilitäts-Matrix
    const ARCHETYP_MATRIX = {
        'duo-duo': 95,
        'duo-duo_flex': 85,
        'duo-lat': 70,
        'duo-single': 40,
        'duo-polyamor': 50,
        'duo-solopoly': 35,
        'duo-ra': 45,
        'duo-aromantisch': 25,

        'duo_flex-duo_flex': 90,
        'duo_flex-lat': 80,
        'duo_flex-polyamor': 75,
        'duo_flex-solopoly': 60,

        'polyamor-polyamor': 95,
        'polyamor-solopoly': 80,
        'polyamor-ra': 85,

        'solopoly-solopoly': 90,
        'solopoly-ra': 85,

        'ra-ra': 95,

        'lat-lat': 85,

        'single-single': 70,
        'single-aromantisch': 80,

        'aromantisch-aromantisch': 90
    };

    const key1 = `${arch1}-${arch2}`;
    const key2 = `${arch2}-${arch1}`;

    return ARCHETYP_MATRIX[key1] || ARCHETYP_MATRIX[key2] || 50;
}

/**
 * Berechnet Orientierungs-Kompatibilität
 */
function calculateOrientierungScore(person1, person2) {
    const ori1 = extractOrientation(person1.orientierung);
    const ori2 = extractOrientation(person2.orientierung);
    const g1 = extractGender(person1.geschlecht);
    const g2 = extractGender(person2.geschlecht);

    // Bisexuell ist immer kompatibel
    if (ori1 === 'bisexuell' || ori2 === 'bisexuell') {
        return Constants.ORIENTATION.COMPATIBLE;
    }

    // Pansexuell auch
    if (ori1 === 'pansexuell' || ori2 === 'pansexuell') {
        return Constants.ORIENTATION.COMPATIBLE;
    }

    // Hetero + gleiches Geschlecht = Hard-KO
    if (ori1 === 'heterosexuell' && ori2 === 'heterosexuell' && g1 === g2) {
        return Constants.ORIENTATION.HARD_KO;
    }

    // Homo + verschiedenes Geschlecht = Hard-KO
    if (ori1 === 'homosexuell' && ori2 === 'homosexuell' && g1 !== g2) {
        return Constants.ORIENTATION.HARD_KO;
    }

    // Standard-Kompatibilität
    return Constants.ORIENTATION.COMPATIBLE;
}

/**
 * Berechnet Dominanz-Kompatibilität
 */
function calculateDominanzScore(dom1, dom2) {
    const d1 = extractDominance(dom1);
    const d2 = extractDominance(dom2);

    const key = `${d1}-${d2}`;
    return Constants.DOMINANCE_MATRIX[key] || 75;
}

/**
 * Berechnet Geschlechts-Kompatibilität
 */
function calculateGeschlechtScore(person1, person2) {
    const g1 = extractGender(person1.geschlecht);
    const g2 = extractGender(person2.geschlecht);
    const ori1 = extractOrientation(person1.orientierung);
    const ori2 = extractOrientation(person2.orientierung);

    // Identitäts-Resonanz
    const id1 = extractIdentity(person1.geschlecht);
    const id2 = extractIdentity(person2.geschlecht);
    const idKey = `${id1}-${id2}`;
    const identityScore = Constants.IDENTITY_MATRIX[idKey] || 70;

    // Basis-Attraktion (vereinfacht)
    let attractionScore = 80;

    if (g1 === 'divers' || g2 === 'divers') {
        attractionScore = Constants.GENDER.NON_BINARY_INVOLVED;
    }

    return Math.round((identityScore + attractionScore) / 2);
}

// ═══════════════════════════════════════════════════════════════════════════
// BEDÜRFNIS-MATCHING
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Berechnet Bedürfnis-Übereinstimmung
 */
function calculateNeedsMatch(person1, person2) {
    const needs1 = person1.needs || {};
    const needs2 = person2.needs || {};

    const gemeinsam = [];
    const unterschiedlich = [];

    let totalDiff = 0;
    let count = 0;

    // Alle Bedürfnisse durchgehen
    const allKeys = new Set([...Object.keys(needs1), ...Object.keys(needs2)]);

    for (const key of allKeys) {
        const val1 = needs1[key] ?? 50;
        const val2 = needs2[key] ?? 50;
        const diff = Math.abs(val1 - val2);

        totalDiff += diff;
        count++;

        if (diff <= 15) {
            gemeinsam.push({ key, val1, val2, diff });
        } else if (diff >= 30) {
            unterschiedlich.push({ key, val1, val2, diff });
        }
    }

    const avgDiff = count > 0 ? totalDiff / count : 0;
    const totalScore = Math.round(100 - avgDiff);

    // Faktor-spezifische Scores
    const factorScores = {
        archetyp: calculateFactorNeedsScore(needs1, needs2, Constants.NEEDS_INTEGRATION.ARCHETYP_NEEDS),
        orientierung: calculateFactorNeedsScore(needs1, needs2, Constants.NEEDS_INTEGRATION.ORIENTIERUNG_NEEDS),
        dominanz: calculateFactorNeedsScore(needs1, needs2, Constants.NEEDS_INTEGRATION.DOMINANZ_NEEDS),
        geschlecht: calculateFactorNeedsScore(needs1, needs2, Constants.NEEDS_INTEGRATION.GESCHLECHT_NEEDS)
    };

    return {
        totalScore,
        gemeinsam: gemeinsam.sort((a, b) => a.diff - b.diff).slice(0, 10),
        unterschiedlich: unterschiedlich.sort((a, b) => b.diff - a.diff).slice(0, 10),
        ...factorScores
    };
}

/**
 * Berechnet Bedürfnis-Score für einen Faktor
 */
function calculateFactorNeedsScore(needs1, needs2, relevantNeeds) {
    let totalDiff = 0;
    let count = 0;

    for (const key of relevantNeeds) {
        const val1 = needs1[key];
        const val2 = needs2[key];

        if (val1 !== undefined && val2 !== undefined) {
            totalDiff += Math.abs(val1 - val2);
            count++;
        }
    }

    return count > 0 ? Math.round(100 - (totalDiff / count)) : 50;
}

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

function combineScore(matrixScore, needsScore, weights) {
    return (matrixScore * weights.matrix) + (needsScore * weights.needs);
}

function getStatus(rValue) {
    if (rValue >= 1.05) return 'resonanz';
    if (rValue <= 0.97) return 'dissonanz';
    return 'neutral';
}

function checkSoftKO(beduerfnisResult) {
    const critical = beduerfnisResult.unterschiedlich.filter(n => n.diff >= 50);
    return critical.length >= Constants.SOFT_KO.MIN_CRITICAL_CONFLICTS;
}

function extractOrientation(orientierung) {
    if (!orientierung) return 'heterosexuell';
    if (typeof orientierung === 'string') return orientierung;
    return orientierung.primary || 'heterosexuell';
}

function extractDominance(dominanz) {
    if (!dominanz) return 'ausgeglichen';
    if (typeof dominanz === 'string') return dominanz;
    return dominanz.primary || 'ausgeglichen';
}

function extractGender(geschlecht) {
    if (!geschlecht) return 'divers';
    if (typeof geschlecht === 'string') return geschlecht;
    return geschlecht.primary || 'divers';
}

function extractIdentity(geschlecht) {
    if (!geschlecht) return 'cis';
    if (typeof geschlecht === 'object' && geschlecht.secondary) {
        return geschlecht.secondary;
    }
    return 'cis';
}

// Default export
export default { calculate };
