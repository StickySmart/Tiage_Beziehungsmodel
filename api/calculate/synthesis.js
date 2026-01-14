/**
 * Vercel Serverless Function: /api/calculate/synthesis
 *
 * VOLLSTÄNDIGE SSOT-BERECHNUNG (v2.0)
 *
 * Akzeptiert vollständige Profile mit Bedürfnissen und berechnet:
 * - R-Faktoren (R1-R4) aus Bedürfnis-Kohärenz
 * - Faktor-Scores (O, A, D, G)
 * - Finalen Score OHNE Cap (kann über 100 gehen)
 *
 * Q-Formel: Q = [(O × wO × R1) + (A × wA × R2) + (D × wD × R3) + (G × wG × R4)]
 */

// ═══════════════════════════════════════════════════════════════════════════
// KONSTANTEN (SSOT - gespiegelt von server/logic/constants.js)
// ═══════════════════════════════════════════════════════════════════════════

const DEFAULT_WEIGHTS = {
    orientierung: 0.25,
    archetyp: 0.25,
    dominanz: 0.25,
    geschlecht: 0.25
};

const DOMINANCE_MATRIX = {
    "dominant-submissiv": 100, "submissiv-dominant": 100,
    "ausgeglichen-ausgeglichen": 95,
    "switch-switch": 90,
    "switch-ausgeglichen": 88, "ausgeglichen-switch": 88,
    "dominant-ausgeglichen": 85, "ausgeglichen-dominant": 85,
    "submissiv-ausgeglichen": 85, "ausgeglichen-submissiv": 85,
    "switch-dominant": 80, "dominant-switch": 80,
    "switch-submissiv": 80, "submissiv-switch": 80,
    "dominant-dominant": 55, "submissiv-submissiv": 55
};

const IDENTITY_MATRIX = {
    "cis-cis": 100, "cis-trans": 85, "cis-suchend": 70,
    "trans-cis": 85, "trans-trans": 100, "trans-suchend": 75,
    "nonbinaer-nonbinaer": 100, "nonbinaer-fluid": 90, "nonbinaer-suchend": 80,
    "fluid-nonbinaer": 90, "fluid-fluid": 100, "fluid-suchend": 85,
    "suchend-cis": 70, "suchend-trans": 75, "suchend-nonbinaer": 80,
    "suchend-fluid": 85, "suchend-suchend": 100,
    "cis-nonbinaer": 65, "cis-fluid": 55,
    "trans-nonbinaer": 75, "trans-fluid": 65,
    "nonbinaer-cis": 65, "nonbinaer-trans": 75,
    "fluid-cis": 55, "fluid-trans": 65
};

const IDENTITY_OPENNESS = {
    "cis": 0, "trans": 30, "nonbinaer": 50, "fluid": 80, "suchend": 100
};

const IDENTITY_RESONANCE = {
    SIMILARITY_FACTOR_MATCH: 1.3,
    SIMILARITY_FACTOR_DIFF: 1.0,
    OPENNESS_DIVISOR: 200,
    IDENTITY_WEIGHT: 0.3,
    ORIENTATION_WEIGHT: 0.7
};

const ORIENTATION_OPENNESS = {
    "hetero": 0, "homo": 0,
    "hetero-homo": 25, "homo-hetero": 25,
    "hetero-bi": 50, "homo-bi": 50,
    "bi": 75, "bi-hetero": 90, "bi-homo": 90, "bi-bi": 100
};

const ORIENTATION_OPENNESS_SINGLE = {
    "heterosexuell": 0, "homosexuell": 0, "bisexuell": 75, "pansexuell": 100
};

// ORIENTATION_RESONANCE: P/S-Gewichtung für Orientierungs-Openness (SSOT aus constants.js)
const ORIENTATION_RESONANCE = {
    PRIMARY_WEIGHT: 0.7,   // 70% für primäre Orientierung
    SECONDARY_WEIGHT: 0.3  // 30% für sekundäre Orientierung
};

const ARCHETYP_MATRIX = {
    'duo-duo': 95, 'duo-duo_flex': 85, 'duo-lat': 70, 'duo-single': 40,
    'duo-polyamor': 50, 'duo-solopoly': 35, 'duo-ra': 45, 'duo-aromantisch': 25,
    'duo_flex-duo_flex': 90, 'duo_flex-lat': 80, 'duo_flex-polyamor': 75, 'duo_flex-solopoly': 60,
    'polyamor-polyamor': 95, 'polyamor-solopoly': 80, 'polyamor-ra': 85,
    'solopoly-solopoly': 90, 'solopoly-ra': 85,
    'ra-ra': 95, 'lat-lat': 85,
    'single-single': 70, 'single-aromantisch': 80,
    'aromantisch-aromantisch': 90
};

// Archetyp-Kohärenz für R-Faktoren (Referenzwerte)
const ARCHETYP_KOHAERENZ = {
    leben: {
        single:     { sexuelle_experimentierfreude: 50, sexuelle_verbindung: 30, koerpernaehe: 40, intimitaet: 30 },
        duo:        { sexuelle_experimentierfreude: 40, sexuelle_verbindung: 90, koerpernaehe: 85, intimitaet: 90 },
        duo_flex:   { sexuelle_experimentierfreude: 70, sexuelle_verbindung: 75, koerpernaehe: 75, intimitaet: 80 },
        solopoly:   { sexuelle_experimentierfreude: 85, sexuelle_verbindung: 60, koerpernaehe: 60, intimitaet: 50 },
        polyamor:   { sexuelle_experimentierfreude: 80, sexuelle_verbindung: 85, koerpernaehe: 75, intimitaet: 85 },
        ra:         { sexuelle_experimentierfreude: 75, sexuelle_verbindung: 60, koerpernaehe: 50, intimitaet: 60 },
        lat:        { sexuelle_experimentierfreude: 50, sexuelle_verbindung: 80, koerpernaehe: 60, intimitaet: 75 },
        aromantisch:{ sexuelle_experimentierfreude: 40, sexuelle_verbindung: 20, koerpernaehe: 30, intimitaet: 25 }
    },
    dynamik: {
        single:     { kontrolle_ausueben: 50, hingabe: 30, unabhaengigkeit: 90 },
        duo:        { kontrolle_ausueben: 50, hingabe: 60, unabhaengigkeit: 50 },
        duo_flex:   { kontrolle_ausueben: 55, hingabe: 55, unabhaengigkeit: 65 },
        solopoly:   { kontrolle_ausueben: 40, hingabe: 40, unabhaengigkeit: 95 },
        polyamor:   { kontrolle_ausueben: 45, hingabe: 60, unabhaengigkeit: 70 },
        ra:         { kontrolle_ausueben: 30, hingabe: 50, unabhaengigkeit: 90 },
        lat:        { kontrolle_ausueben: 40, hingabe: 55, unabhaengigkeit: 80 },
        aromantisch:{ kontrolle_ausueben: 40, hingabe: 25, unabhaengigkeit: 85 }
    },
    philosophie: {
        single:     { kinderwunsch: 20, langfristige_bindung: 15, unabhaengigkeit: 95, selbstbestimmung: 95 },
        duo:        { kinderwunsch: 75, langfristige_bindung: 95, unabhaengigkeit: 40, selbstbestimmung: 50 },
        duo_flex:   { kinderwunsch: 60, langfristige_bindung: 85, unabhaengigkeit: 60, selbstbestimmung: 65 },
        solopoly:   { kinderwunsch: 30, langfristige_bindung: 50, unabhaengigkeit: 95, selbstbestimmung: 95 },
        polyamor:   { kinderwunsch: 50, langfristige_bindung: 75, unabhaengigkeit: 70, selbstbestimmung: 75 },
        ra:         { kinderwunsch: 35, langfristige_bindung: 40, unabhaengigkeit: 90, selbstbestimmung: 95 },
        lat:        { kinderwunsch: 55, langfristige_bindung: 80, unabhaengigkeit: 75, selbstbestimmung: 80 },
        aromantisch:{ kinderwunsch: 25, langfristige_bindung: 30, unabhaengigkeit: 85, selbstbestimmung: 90 }
    },
    identitaet: {
        single:     { authentizitaet: 85, selbst_ausdruck: 80, akzeptanz: 70, gesehen_werden: 60 },
        duo:        { authentizitaet: 75, selbst_ausdruck: 70, akzeptanz: 85, gesehen_werden: 90 },
        duo_flex:   { authentizitaet: 80, selbst_ausdruck: 75, akzeptanz: 80, gesehen_werden: 80 },
        solopoly:   { authentizitaet: 95, selbst_ausdruck: 90, akzeptanz: 75, gesehen_werden: 70 },
        polyamor:   { authentizitaet: 85, selbst_ausdruck: 85, akzeptanz: 85, gesehen_werden: 85 },
        ra:         { authentizitaet: 95, selbst_ausdruck: 95, akzeptanz: 80, gesehen_werden: 70 },
        lat:        { authentizitaet: 85, selbst_ausdruck: 80, akzeptanz: 80, gesehen_werden: 80 },
        aromantisch:{ authentizitaet: 90, selbst_ausdruck: 85, akzeptanz: 90, gesehen_werden: 75 }
    }
};

const NEEDS_FACTOR_WEIGHTS = {
    archetyp:     { matrix: 0.60, needs: 0.40 },
    orientierung: { matrix: 0.50, needs: 0.50 },
    dominanz:     { matrix: 0.50, needs: 0.50 },
    geschlecht:   { matrix: 0.60, needs: 0.40 }
};

// ═══════════════════════════════════════════════════════════════════════════
// HILFSFUNKTIONEN
// ═══════════════════════════════════════════════════════════════════════════

function getWeights(customWeights) {
    if (customWeights) {
        const O = customWeights.O || 25;
        const A = customWeights.A || 25;
        const D = customWeights.D || 25;
        const G = customWeights.G || 25;
        const sum = O + A + D + G;
        return {
            orientierung: O / sum,
            archetyp: A / sum,
            dominanz: D / sum,
            geschlecht: G / sum
        };
    }
    return DEFAULT_WEIGHTS;
}

function combineRFactors(R_ich, R_partner) {
    const a = R_ich || 1.0;
    const b = R_partner || 1.0;
    const summe = a + b;
    const similarity = Math.min(a, b) / Math.max(a, b);
    const combined = (summe * similarity) / 2;
    return Math.round(combined * 1000) / 1000;
}

function getStatus(rValue) {
    if (rValue >= 1.05) return 'resonanz';
    if (rValue <= 0.95) return 'dissonanz';
    return 'neutral';
}

function normalizeOrientation(ori) {
    if (!ori) return 'hetero';
    ori = ori.toLowerCase();
    if (ori === 'heterosexuell' || ori === 'hetero') return 'hetero';
    if (ori === 'homosexuell' || ori === 'homo') return 'homo';
    if (ori === 'bisexuell' || ori === 'bi-/pansexuell' || ori === 'bi' || ori === 'pansexuell') return 'bi';
    return 'hetero';
}

function getOrientationOpennessKey(orientierung) {
    if (!orientierung) return 'hetero';
    const primary = typeof orientierung === 'string' ? orientierung : (orientierung.primary || 'heterosexuell');
    const secondary = typeof orientierung === 'object' ? (orientierung.secondary || null) : null;
    const prim = normalizeOrientation(primary);
    const sec = normalizeOrientation(secondary);
    if (!sec || sec === prim) return prim;
    return prim + '-' + sec;
}

/**
 * Berechnet gewichtete Orientierungs-Openness basierend auf P/S (v3.6)
 * SSOT: Gleiche Formel wie in server/logic/synthesisCalculator.js
 *
 * Formel:
 * - Wenn nur Primary: 100% des Primary-Wertes
 * - Wenn Primary + Secondary: Primary × 0.7 + Secondary × 0.3
 */
function calculateWeightedOrientationOpenness(orientierung) {
    if (!orientierung) {
        return { openness: 0, details: { primary: null, secondary: null } };
    }

    var primary = orientierung.primary || 'heterosexuell';
    var secondary = orientierung.secondary || null;

    var primaryWeight = ORIENTATION_RESONANCE.PRIMARY_WEIGHT || 0.7;
    var secondaryWeight = ORIENTATION_RESONANCE.SECONDARY_WEIGHT || 0.3;

    var primaryOpenness = ORIENTATION_OPENNESS_SINGLE[primary] !== undefined ? ORIENTATION_OPENNESS_SINGLE[primary] : 0;
    var secondaryOpenness = secondary ? (ORIENTATION_OPENNESS_SINGLE[secondary] !== undefined ? ORIENTATION_OPENNESS_SINGLE[secondary] : 0) : 0;

    var openness;
    if (secondary && secondary !== primary) {
        // P/S-gewichtete Berechnung
        openness = (primaryOpenness * primaryWeight) + (secondaryOpenness * secondaryWeight);
    } else {
        // Nur Primary → 100%
        openness = primaryOpenness;
    }

    return {
        openness: Math.round(openness * 100) / 100,
        details: {
            primary: primary,
            secondary: secondary,
            primaryOpenness: primaryOpenness,
            secondaryOpenness: secondaryOpenness,
            primaryWeight: primaryWeight,
            secondaryWeight: secondaryWeight,
            hasSecondary: !!(secondary && secondary !== primary)
        }
    };
}

// ═══════════════════════════════════════════════════════════════════════════
// R-FAKTOR BERECHNUNG (SSOT)
// ═══════════════════════════════════════════════════════════════════════════

function calculateDimensionR(archetyp, needs, dimension) {
    const expected = ARCHETYP_KOHAERENZ[dimension] && ARCHETYP_KOHAERENZ[dimension][archetyp];
    if (!expected || !needs) return 1.0;

    const needKeys = Object.keys(expected);
    if (needKeys.length === 0) return 1.0;

    let totalDiff = 0;
    let count = 0;

    for (var i = 0; i < needKeys.length; i++) {
        var key = needKeys[i];
        var expectedVal = expected[key];
        var actualVal = needs[key];
        if (actualVal !== undefined) {
            totalDiff += Math.abs(expectedVal - actualVal);
            count++;
        }
    }

    if (count === 0) return 1.0;

    var avgDiff = totalDiff / count;
    var similarity = 1 - (avgDiff / 100);

    return Math.round((0.5 + similarity) * 1000) / 1000;
}

function calculatePersonResonance(profile) {
    var archetyp = profile.archetyp || 'duo';
    var needs = profile.needs || {};

    return {
        R1: calculateDimensionR(archetyp, needs, 'leben'),
        R2: calculateDimensionR(archetyp, needs, 'philosophie'),
        R3: calculateDimensionR(archetyp, needs, 'dynamik'),
        R4: calculateDimensionR(archetyp, needs, 'identitaet')
    };
}

function calculateR1(ori1, ori2) {
    var oriKey1 = getOrientationOpennessKey(ori1);
    var oriKey2 = getOrientationOpennessKey(ori2);

    var oriO1 = ORIENTATION_OPENNESS[oriKey1] !== undefined ? ORIENTATION_OPENNESS[oriKey1] : 0;
    var oriO2 = ORIENTATION_OPENNESS[oriKey2] !== undefined ? ORIENTATION_OPENNESS[oriKey2] : 0;

    var differenz = Math.abs(oriO1 - oriO2);
    var aehnlichkeit = 1 - (differenz / 100);
    var basisR1 = 0.5 + (aehnlichkeit * 0.5);
    var opennessBonus = (oriO1 + oriO2) / 400;

    return {
        value: Math.round((basisR1 + opennessBonus) * 1000) / 1000,
        details: { oriKey1: oriKey1, oriKey2: oriKey2, oriO1: oriO1, oriO2: oriO2, differenz: differenz, aehnlichkeit: aehnlichkeit, basisR1: basisR1, opennessBonus: opennessBonus }
    };
}

function calculateR4(person1, person2) {
    var secondary1 = (person1.geschlecht && person1.geschlecht.secondary) || 'cis';
    var secondary2 = (person2.geschlecht && person2.geschlecht.secondary) || 'cis';

    var idO1 = IDENTITY_OPENNESS[secondary1] !== undefined ? IDENTITY_OPENNESS[secondary1] : 0;
    var idO2 = IDENTITY_OPENNESS[secondary2] !== undefined ? IDENTITY_OPENNESS[secondary2] : 0;

    var ori1 = person1.orientierung || {};
    var ori2 = person2.orientierung || {};

    // FIX v3.8: Verwende P/S-gewichtete Orientierungs-Openness (wie Server)
    // statt nur primary Orientierung
    var oriResult1 = calculateWeightedOrientationOpenness(ori1);
    var oriResult2 = calculateWeightedOrientationOpenness(ori2);
    var weightedOriO1 = oriResult1.openness;
    var weightedOriO2 = oriResult2.openness;

    var idWeight = IDENTITY_RESONANCE.IDENTITY_WEIGHT;
    var oriWeight = IDENTITY_RESONANCE.ORIENTATION_WEIGHT;
    var combinedO1 = (idO1 * idWeight) + (weightedOriO1 * oriWeight);
    var combinedO2 = (idO2 * idWeight) + (weightedOriO2 * oriWeight);

    var basisR4 = 1.0;
    var gleicheIdentitaet = (secondary1 === secondary2);
    var aehnlichkeitsFaktor = gleicheIdentitaet
        ? IDENTITY_RESONANCE.SIMILARITY_FACTOR_MATCH
        : IDENTITY_RESONANCE.SIMILARITY_FACTOR_DIFF;
    var opennessBonus = (combinedO1 + combinedO2) / IDENTITY_RESONANCE.OPENNESS_DIVISOR;

    return {
        value: Math.round((basisR4 + (aehnlichkeitsFaktor * opennessBonus)) * 1000) / 1000,
        details: {
            secondary1: secondary1,
            secondary2: secondary2,
            idO1: idO1,
            idO2: idO2,
            // FIX v3.8: P/S-gewichtete Orientierungs-Openness
            orientationOpenness1: weightedOriO1,
            orientationOpenness2: weightedOriO2,
            orientation1: oriResult1.details,
            orientation2: oriResult2.details,
            combinedO1: combinedO1,
            combinedO2: combinedO2,
            gleicheIdentitaet: gleicheIdentitaet,
            aehnlichkeitsFaktor: aehnlichkeitsFaktor,
            opennessBonus: opennessBonus
        }
    };
}

// ═══════════════════════════════════════════════════════════════════════════
// FAKTOR-SCORE BERECHNUNGEN
// ═══════════════════════════════════════════════════════════════════════════

function calculateArchetypScore(arch1, arch2) {
    var key1 = arch1 + '-' + arch2;
    var key2 = arch2 + '-' + arch1;
    return ARCHETYP_MATRIX[key1] || ARCHETYP_MATRIX[key2] || 50;
}

function calculateOrientierungScore(person1, person2) {
    var ori1 = (person1.orientierung && person1.orientierung.primary) || person1.orientierung || 'heterosexuell';
    var ori2 = (person2.orientierung && person2.orientierung.primary) || person2.orientierung || 'heterosexuell';
    var g1 = (person1.geschlecht && person1.geschlecht.primary) || person1.geschlecht || 'divers';
    var g2 = (person2.geschlecht && person2.geschlecht.primary) || person2.geschlecht || 'divers';

    var o1Norm = normalizeOrientation(ori1);
    var o2Norm = normalizeOrientation(ori2);

    if (o1Norm === 'bi' || o2Norm === 'bi') return 100;

    if (o1Norm === 'hetero' && o2Norm === 'hetero') {
        return (g1 !== g2) ? 100 : 0;
    }

    if (o1Norm === 'homo' && o2Norm === 'homo') {
        return (g1 === g2) ? 100 : 0;
    }

    if ((o1Norm === 'hetero' && o2Norm === 'homo') || (o1Norm === 'homo' && o2Norm === 'hetero')) {
        return 10;
    }

    return 75;
}

function calculateDominanzScore(dom1, dom2) {
    var d1 = typeof dom1 === 'object' ? (dom1.primary || 'ausgeglichen') : (dom1 || 'ausgeglichen');
    var d2 = typeof dom2 === 'object' ? (dom2.primary || 'ausgeglichen') : (dom2 || 'ausgeglichen');
    var key = d1 + '-' + d2;
    return DOMINANCE_MATRIX[key] || 75;
}

function calculateGeschlechtScore(person1, person2) {
    var id1 = (person1.geschlecht && person1.geschlecht.secondary) || 'cis';
    var id2 = (person2.geschlecht && person2.geschlecht.secondary) || 'cis';
    var idKey = id1 + '-' + id2;
    return IDENTITY_MATRIX[idKey] || 70;
}

// ═══════════════════════════════════════════════════════════════════════════
// BEDÜRFNIS-MATCHING
// ═══════════════════════════════════════════════════════════════════════════

function calculateNeedsMatch(needs1, needs2) {
    if (!needs1 || !needs2) return { totalScore: 50, gemeinsam: [], unterschiedlich: [] };

    var gemeinsam = [];
    var unterschiedlich = [];
    var totalDiff = 0;
    var count = 0;

    var keys1 = Object.keys(needs1);
    var keys2 = Object.keys(needs2);
    var allKeysSet = {};
    var i, key;

    for (i = 0; i < keys1.length; i++) {
        allKeysSet[keys1[i]] = true;
    }
    for (i = 0; i < keys2.length; i++) {
        allKeysSet[keys2[i]] = true;
    }

    var allKeys = Object.keys(allKeysSet);

    for (i = 0; i < allKeys.length; i++) {
        key = allKeys[i];
        var val1 = needs1[key] !== undefined ? needs1[key] : 50;
        var val2 = needs2[key] !== undefined ? needs2[key] : 50;
        var diff = Math.abs(val1 - val2);

        totalDiff += diff;
        count++;

        if (diff <= 15) {
            gemeinsam.push({ key: key, val1: val1, val2: val2, diff: diff });
        } else if (diff >= 30) {
            unterschiedlich.push({ key: key, val1: val1, val2: val2, diff: diff });
        }
    }

    var avgDiff = count > 0 ? totalDiff / count : 0;

    gemeinsam.sort(function(a, b) { return a.diff - b.diff; });
    unterschiedlich.sort(function(a, b) { return b.diff - a.diff; });

    return {
        totalScore: Math.round(100 - avgDiff),
        gemeinsam: gemeinsam.slice(0, 10),
        unterschiedlich: unterschiedlich.slice(0, 10)
    };
}

// ═══════════════════════════════════════════════════════════════════════════
// HAUPTBERECHNUNG
// ═══════════════════════════════════════════════════════════════════════════

function calculate(person1, person2, options) {
    options = options || {};
    var weights = getWeights(options.weights);

    // SCHRITT 1: Individuelle R-Faktoren aus Bedürfnis-Kohärenz
    var resonanz1 = calculatePersonResonance(person1);
    var resonanz2 = calculatePersonResonance(person2);

    // R2 (Philosophie) und R3 (Dynamik) aus Bedürfnis-Kohärenz kombinieren
    var R2 = combineRFactors(resonanz1.R2, resonanz2.R2);
    var R3 = combineRFactors(resonanz1.R3, resonanz2.R3);

    // SCHRITT 2: R1 (Leben) aus ORIENTATION_OPENNESS
    var r1Result = calculateR1(person1.orientierung, person2.orientierung);
    var R1 = r1Result.value;

    // SCHRITT 3: R4 (Identität) mit GOD-kombinierter Formel
    var r4Result = calculateR4(person1, person2);
    var R4 = r4Result.value;

    // SCHRITT 4: Faktor-Scores berechnen (Matrix-basiert)
    var archetypScore = calculateArchetypScore(person1.archetyp, person2.archetyp);
    var orientierungScore = calculateOrientierungScore(person1, person2);
    var dominanzScore = calculateDominanzScore(person1.dominanz, person2.dominanz);
    var geschlechtScore = calculateGeschlechtScore(person1, person2);

    // SCHRITT 5: Bedürfnis-Matching
    var needsMatch = calculateNeedsMatch(person1.needs, person2.needs);

    // SCHRITT 6: Scores kombinieren (Matrix + Needs)
    function combineScore(matrixScore, needsScore, factorWeights) {
        return (matrixScore * factorWeights.matrix) + ((needsScore || 50) * factorWeights.needs);
    }

    var scores = {
        archetyp: combineScore(archetypScore, needsMatch.totalScore, NEEDS_FACTOR_WEIGHTS.archetyp),
        orientierung: combineScore(orientierungScore, needsMatch.totalScore, NEEDS_FACTOR_WEIGHTS.orientierung),
        dominanz: combineScore(dominanzScore, needsMatch.totalScore, NEEDS_FACTOR_WEIGHTS.dominanz),
        geschlecht: combineScore(geschlechtScore, needsMatch.totalScore, NEEDS_FACTOR_WEIGHTS.geschlecht)
    };

    // SCHRITT 7: Finale Berechnung mit R-Faktoren - KEIN CAP!
    var baseScore =
        (scores.archetyp * weights.archetyp) +
        (scores.orientierung * weights.orientierung) +
        (scores.dominanz * weights.dominanz) +
        (scores.geschlecht * weights.geschlecht);

    // Q-Formel mit dimensionalen R-Faktoren
    var finalScore =
        (scores.orientierung * weights.orientierung * R1) +
        (scores.archetyp * weights.archetyp * R2) +
        (scores.dominanz * weights.dominanz * R3) +
        (scores.geschlecht * weights.geschlecht * R4);

    // ERGEBNIS - Score kann über 100 gehen!
    return {
        score: Math.round(Math.max(0, finalScore) * 10) / 10,
        baseScore: Math.round(baseScore * 10) / 10,

        resonanz: {
            coefficient: Math.round(((R1 + R2 + R3 + R4) / 4) * 1000) / 1000,
            ich: resonanz1,
            partner: resonanz2,
            dimensional: {
                leben:       { rValue: R1, status: getStatus(R1), emoji: '🔥', details: r1Result.details },
                philosophie: { rValue: R2, status: getStatus(R2), emoji: '🧠' },
                dynamik:     { rValue: R3, status: getStatus(R3), emoji: '⚡' },
                identitaet:  { rValue: R4, status: getStatus(R4), emoji: '💚', details: r4Result.details }
            }
        },

        breakdown: {
            archetyp:     { score: Math.round(scores.archetyp), weight: weights.archetyp, matrixScore: archetypScore },
            orientierung: { score: Math.round(scores.orientierung), weight: weights.orientierung, matrixScore: orientierungScore },
            dominanz:     { score: Math.round(scores.dominanz), weight: weights.dominanz, matrixScore: dominanzScore },
            geschlecht:   { score: Math.round(scores.geschlecht), weight: weights.geschlecht, matrixScore: geschlechtScore }
        },

        beduerfnisse: needsMatch,

        _source: 'server-ssot',
        _version: '2.0.0'
    };
}

// ═══════════════════════════════════════════════════════════════════════════
// VERCEL SERVERLESS HANDLER
// ═══════════════════════════════════════════════════════════════════════════

module.exports = function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Nur POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        var body = req.body || {};
        var ich = body.ich;
        var partner = body.partner;
        var options = body.options;

        if (!ich || !partner) {
            return res.status(400).json({
                error: 'Missing required fields: ich, partner',
                hint: 'Sende vollständige Profile mit archetyp, orientierung, geschlecht, dominanz, needs'
            });
        }

        var result = calculate(ich, partner, options);

        return res.status(200).json({
            success: true,
            result: result
        });

    } catch (error) {
        console.error('[API] SSOT Synthesis calculation error:', error);
        return res.status(500).json({
            error: 'Calculation failed',
            message: error.message
        });
    }
};
