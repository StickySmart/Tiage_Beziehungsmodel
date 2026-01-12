/**
 * TIAGE Server - Synthesis Calculator (ES Module)
 *
 * Migriert von: js/synthesis/synthesisCalculator.js
 * Q-Formel: Q = [(O × wO × r1) + (A × wA × r2) + (D × wD × r3) + (G × wG × r4)]
 */

import * as Constants from './constants.js';
import * as NeedsIntegration from './needsIntegration.js';
import * as OrientationFactor from './orientationFactor.js';  // SSOT: Client-Logik

// ═══════════════════════════════════════════════════════════════════════════
// R-FAKTOR KOMBINATION (v3.6: Summe × Similarity)
// ═══════════════════════════════════════════════════════════════════════════
//
// Neue Formel: R_kombiniert = (R_ich + R_partner) × similarity
// wobei: similarity = min(R_ich, R_partner) / max(R_ich, R_partner)
//
// Vorteile gegenüber Multiplikation:
// - Belohnt wenn beide HOCH UND ÄHNLICH sind
// - Bestraft wenn einer hoch, einer niedrig (Mismatch)
// - Neutral bei 2.0 (1.0 + 1.0 × 1.0)
//
function combineRFactors(R_ich, R_partner) {
    const a = R_ich || 1.0;
    const b = R_partner || 1.0;
    const summe = a + b;
    const similarity = Math.min(a, b) / Math.max(a, b);
    // v3.7: Division durch 2 für korrekte Normalisierung (wie Client)
    const combined = (summe * similarity) / 2;
    return Math.round(combined * 1000) / 1000;
}

/**
 * Berechnet gewichtete Orientierungs-Openness basierend auf P/S (v3.6)
 *
 * Formel:
 * - Wenn nur Primary: 100% des Primary-Wertes
 * - Wenn Primary + Secondary: Primary × 0.7 + Secondary × 0.3
 *
 * @param {object} orientierung - { primary: 'heterosexuell', secondary: 'bisexuell' }
 * @returns {object} { openness, details }
 */
function calculateWeightedOrientationOpenness(orientierung) {
    if (!orientierung) {
        return { openness: 0, details: { primary: null, secondary: null } };
    }

    const primary = orientierung.primary || 'heterosexuell';
    const secondary = orientierung.secondary || null;

    // Einzelne Openness-Werte
    const singleOpenness = Constants.ORIENTATION_OPENNESS_SINGLE || {
        'heterosexuell': 0,
        'homosexuell': 0,
        'bisexuell': 75,
        'pansexuell': 100
    };

    // P/S-Gewichtungen
    const resonance = Constants.ORIENTATION_RESONANCE || {};
    const primaryWeight = resonance.PRIMARY_WEIGHT || 0.7;
    const secondaryWeight = resonance.SECONDARY_WEIGHT || 0.3;

    const primaryOpenness = singleOpenness[primary] !== undefined ? singleOpenness[primary] : 0;
    const secondaryOpenness = secondary ? (singleOpenness[secondary] !== undefined ? singleOpenness[secondary] : 0) : 0;

    let openness;
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
            primary,
            secondary,
            primaryOpenness,
            secondaryOpenness,
            primaryWeight,
            secondaryWeight,
            hasSecondary: !!(secondary && secondary !== primary)
        }
    };
}

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

    // Kombiniere R-Faktoren via Summe × Similarity (v3.6)
    const R2 = combineRFactors(resonanz1.R2, resonanz2.R2);
    const R3 = combineRFactors(resonanz1.R3, resonanz2.R3);

    // ═══════════════════════════════════════════════════════════════════
    // R1 (LEBEN/ORIENTIERUNG) - UNIVERSELLE BERECHNUNG
    // ═══════════════════════════════════════════════════════════════════
    //
    // Basiert auf ORIENTATION_OPENNESS (Similarity-Attraction Theorie):
    //   hetero/homo=0, hetero-homo=25, hetero-bi=50, bi=75, bi-bi=100
    //
    // Wissenschaftliche Grundlage:
    //   - Within-couple Similarity in Sexuality → Sexual Satisfaction (PMC)
    //   - Bi-Identity Anerkennung kritisch für Zufriedenheit (Journal of Bisexuality)
    //
    const ori1 = person1.orientierung || {};
    const ori2 = person2.orientierung || {};

    const oriKey1 = getOrientationOpennessKey(ori1);
    const oriKey2 = getOrientationOpennessKey(ori2);

    const orientationOpenness = Constants.ORIENTATION_OPENNESS || {
        'hetero': 0, 'homo': 0,
        'hetero-homo': 25, 'homo-hetero': 25,
        'hetero-bi': 50, 'homo-bi': 50,
        'bi': 75, 'bi-hetero': 90, 'bi-homo': 90, 'bi-bi': 100
    };

    const oriO1 = orientationOpenness[oriKey1] !== undefined ? orientationOpenness[oriKey1] : 0;
    const oriO2 = orientationOpenness[oriKey2] !== undefined ? orientationOpenness[oriKey2] : 0;

    const oriDifferenz = Math.abs(oriO1 - oriO2);
    const oriAehnlichkeit = 1 - (oriDifferenz / 100);
    const basisR1 = 0.5 + (oriAehnlichkeit * 0.5);
    const oriOpennessBonus = (oriO1 + oriO2) / 400;
    const R1 = Math.round((basisR1 + oriOpennessBonus) * 1000) / 1000;

    const orientationResonance = {
        key1: oriKey1,
        key2: oriKey2,
        openness1: oriO1,
        openness2: oriO2,
        differenz: oriDifferenz,
        aehnlichkeit: Math.round(oriAehnlichkeit * 1000) / 1000,
        basisR1: Math.round(basisR1 * 1000) / 1000,
        opennessBonus: Math.round(oriOpennessBonus * 1000) / 1000,
        finalR1: R1
    };

    console.log('[SynthesisCalculator] R1 (Leben/Orientierung) berechnet:', orientationResonance);

    // ═══════════════════════════════════════════════════════════════════
    // R4 (IDENTITÄT) - GOD-KOMBINIERTE BERECHNUNG (v3.6)
    // ═══════════════════════════════════════════════════════════════════
    //
    // Kombiniert drei Ansätze:
    //   1. EMPIRISCH: Ähnlichkeits-Bonus bei gleicher Identität (T4T-Effekt)
    //   2. PIRSIG: Openness-Bonus basierend auf "Dynamischer Qualität"
    //   3. NEU: Orientierungs-Openness fließt mit ein (Bi/Pan = höhere Offenheit)
    //
    // IDENTITY_OPENNESS (Pirsig-inspiriert):
    //   cis=0, trans=30, nonbinaer=50, fluid=80, suchend=100
    //
    // ORIENTATION_OPENNESS (aus R1-Berechnung):
    //   hetero=0, homo=0, bi=75, bi-bi=100
    //
    // GOD-kombinierte Formel:
    //   BASIS = 1.0 (Server hat keinen individuellen Archetypen-Vergleich)
    //   Ähnlichkeits-Faktor = 1.3 (wenn gleiche Identität) oder 1.0
    //   Identity-Openness = (idO1 + idO2) × IDENTITY_WEIGHT
    //   Orientation-Openness = (oriO1 + oriO2) × ORIENTATION_WEIGHT
    //   Combined-Openness = (Identity-Openness + Orientation-Openness) / DIVISOR
    //   R4 = BASIS + (Ähnlichkeits-Faktor × Combined-Openness)
    //
    // Wissenschaftliche Grundlage:
    //   - Similarity-Attraction Effect (Byrne, 1971)
    //   - T4T-Beziehungen zeigen höhere Zufriedenheit durch Partner-Affirmation
    //   - Bi/Pan-Personen zeigen höhere Beziehungs-Flexibilität (Journal of Bisexuality)
    //   - Paare mit ähnlich hoher Openness → bessere Beziehungsqualität (Frontiers 2017)
    //
    const secondary1 = person1.geschlecht?.secondary || 'cis';
    const secondary2 = person2.geschlecht?.secondary || 'cis';

    // IDENTITY_OPENNESS aus Constants holen
    const identityOpenness = Constants.IDENTITY_OPENNESS || {
        'cis': 0, 'trans': 30, 'nonbinaer': 50, 'fluid': 80, 'suchend': 100
    };

    // IDENTITY_RESONANCE Konstanten (erweitert mit GOD-Gewichtungen)
    const identityResonanceConst = Constants.IDENTITY_RESONANCE || {
        SIMILARITY_FACTOR_MATCH: 1.3,
        SIMILARITY_FACTOR_DIFF: 1.0,
        OPENNESS_DIVISOR: 200,
        IDENTITY_WEIGHT: 0.5,
        ORIENTATION_WEIGHT: 0.5
    };

    // Identity-Openness berechnen
    const idO1 = identityOpenness[secondary1] !== undefined ? identityOpenness[secondary1] : 0;
    const idO2 = identityOpenness[secondary2] !== undefined ? identityOpenness[secondary2] : 0;

    // Orientation-Openness: Neu gewichtet mit P/S (70%/30%) statt kombinierter Tabelle
    const oriResultR4_1 = calculateWeightedOrientationOpenness(ori1);
    const oriResultR4_2 = calculateWeightedOrientationOpenness(ori2);
    const weightedOriO1 = oriResultR4_1.openness;
    const weightedOriO2 = oriResultR4_2.openness;

    // GOD-kombinierte Openness berechnen
    const identityWeight = identityResonanceConst.IDENTITY_WEIGHT || 0.5;
    const orientationWeightR4 = identityResonanceConst.ORIENTATION_WEIGHT || 0.5;
    const combinedO1 = (idO1 * identityWeight) + (weightedOriO1 * orientationWeightR4);
    const combinedO2 = (idO2 * identityWeight) + (weightedOriO2 * orientationWeightR4);

    // Hybrid-Formel anwenden
    const basisR4 = 1.0; // Server-Seite: Default-Basis

    // Ähnlichkeits-Faktor: Bonus wenn gleiche Identität
    const gleicheIdentitaet = (secondary1 === secondary2);
    const aehnlichkeitsFaktor = gleicheIdentitaet
        ? identityResonanceConst.SIMILARITY_FACTOR_MATCH
        : identityResonanceConst.SIMILARITY_FACTOR_DIFF;

    // Combined-Openness-Bonus: (combinedO1 + combinedO2) / 200 → Range 0-1
    const opennessBonus = (combinedO1 + combinedO2) / identityResonanceConst.OPENNESS_DIVISOR;

    // Finale Formel: R4 = BASIS + (Ähnlichkeits-Faktor × Combined-Openness)
    const R4 = Math.round((basisR4 + (aehnlichkeitsFaktor * opennessBonus)) * 1000) / 1000;

    const identityResonance = {
        // Geschlechts-Identität
        secondary1,
        secondary2,
        identityOpenness1: idO1,
        identityOpenness2: idO2,
        // Orientierung (v3.6: P/S-gewichtet 70%/30%)
        orientation1: oriResultR4_1.details,
        orientation2: oriResultR4_2.details,
        orientationOpenness1: weightedOriO1,
        orientationOpenness2: weightedOriO2,
        // GOD-kombiniert
        combinedOpenness1: Math.round(combinedO1 * 100) / 100,
        combinedOpenness2: Math.round(combinedO2 * 100) / 100,
        // Berechnung
        gleicheIdentitaet,
        aehnlichkeitsFaktor,
        basisR4,
        opennessBonus: Math.round(opennessBonus * 1000) / 1000,
        hybridBonus: Math.round((aehnlichkeitsFaktor * opennessBonus) * 1000) / 1000,
        finalR4: R4
    };

    console.log('[SynthesisCalculator] R4 (Identität) GOD-kombiniert berechnet:', identityResonance);

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
        // v3.8: Keine Obergrenze - Score kann über 100 gehen (wie Client)
        score: Math.max(0, finalScore),
        baseScore: Math.round(baseScore),

        resonanz: {
            coefficient: Math.round(resonanzCoefficient * 1000) / 1000,
            identityResonance: identityResonance, // Details zur R4-Berechnung
            orientationResonance: orientationResonance, // Details zur R1-Berechnung
            dimensional: {
                leben:       { rValue: Math.round(R1 * 1000) / 1000, status: getStatus(R1), orientationResonance: orientationResonance },
                philosophie: { rValue: Math.round(R2 * 1000) / 1000, status: getStatus(R2) },
                dynamik:     { rValue: Math.round(R3 * 1000) / 1000, status: getStatus(R3) },
                identitaet:  { rValue: Math.round(R4 * 1000) / 1000, status: getStatus(R4), identityResonance: identityResonance }
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
 *
 * SSOT: Verwendet die Client-Logik aus js/synthesis/factors/orientationFactor.js
 * über den Wrapper in ./orientationFactor.js
 *
 * Die vollständige Logik inkl. P/S-Handling (Primary/Secondary Orientierung)
 * ist dort implementiert.
 */
function calculateOrientierungScore(person1, person2) {
    // SSOT: Constants für Score-Werte setzen
    OrientationFactor.setConstants(Constants);

    // SSOT: Client-Logik verwenden
    const result = OrientationFactor.calculate(person1, person2);

    console.log('[SynthesisCalculator] SSOT OrientationFactor result:', {
        score: result.score,
        result: result.details?.result,
        hasSecondaryBonus: result.details?.hasSecondaryBonus
    });

    return result.score;
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
    // v3.4: Richtungsbasiert um 1.0 zentriert
    // THRESHOLDS: resonanz >= 1.05, dissonanz <= 0.95
    if (rValue >= 1.05) return 'resonanz';
    if (rValue <= 0.95) return 'dissonanz';
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

/**
 * Erzeugt den ORIENTATION_OPENNESS-Schlüssel aus primärer/sekundärer Orientierung
 *
 * @param {object|string} orientierung - Orientierungs-Objekt oder String
 * @returns {string} Key für ORIENTATION_OPENNESS Lookup
 */
function getOrientationOpennessKey(orientierung) {
    if (!orientierung) return 'hetero';

    const primary = typeof orientierung === 'string'
        ? orientierung
        : (orientierung.primary || 'heterosexuell');
    const secondary = typeof orientierung === 'object'
        ? (orientierung.secondary || null)
        : null;

    // Normalisiere Orientierungswerte
    const normalizeOri = (ori) => {
        if (!ori) return null;
        ori = ori.toLowerCase();
        if (ori === 'heterosexuell' || ori === 'hetero') return 'hetero';
        if (ori === 'homosexuell' || ori === 'homo') return 'homo';
        if (ori === 'bisexuell' || ori === 'bi-/pansexuell' || ori === 'bi' || ori === 'pansexuell') return 'bi';
        return 'hetero';
    };

    const prim = normalizeOri(primary);
    const sec = normalizeOri(secondary);

    // Wenn keine sekundäre oder gleich wie primäre → nur primäre
    if (!sec || sec === prim) {
        return prim;
    } else {
        return prim + '-' + sec;
    }
}

// Default export
export default { calculate };
