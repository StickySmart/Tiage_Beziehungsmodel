/**
 * TIAGE Server - Needs Integration (ES Module)
 *
 * Migriert von: js/synthesis/needsIntegration.js
 * R-Faktoren Berechnung (Kohärenz Archetyp ↔ Bedürfnisse)
 *
 * v3.3: SSOT - Referenz-Werte werden direkt aus BaseArchetypProfile extrahiert
 *       statt aus hartcodierter ARCHETYP_KOHAERENZ
 */

import * as Constants from './constants.js';

// ═══════════════════════════════════════════════════════════════════════════
// R-FAKTOR KOMBINATION (v3.6: Summe × Similarity)
// ═══════════════════════════════════════════════════════════════════════════
function combineRFactors(R_ich, R_partner) {
    const a = R_ich || 1.0;
    const b = R_partner || 1.0;
    const summe = a + b;
    const similarity = Math.min(a, b) / Math.max(a, b);
    return Math.round(summe * similarity * 1000) / 1000;
}

// ═══════════════════════════════════════════════════════════════════════════
// SSOT: DIMENSION → NEED-IDs MAPPING
// ═══════════════════════════════════════════════════════════════════════════
// Definiert welche #B-IDs zu welcher R-Dimension gehören
// Dies ist die EINZIGE Stelle wo dieses Mapping definiert ist (SSOT)

const DIMENSION_NEED_IDS = {
    // R1: Leben (Orientierung) - Intimität & Körperlichkeit
    leben: ['#B221', '#B222', '#B204', '#B20'],
    // #B221 = sexuelle_experimentierfreude
    // #B222 = sexuelle_verbindung
    // #B204 = koerpernaehe
    // #B20  = intimitaet

    // R2: Philosophie (Archetyp) - Lebensplanung & Bindung
    philosophie: ['#B89', '#B96', '#B95', '#B36', '#B34'],
    // #B89  = kinderwunsch / kinder_und_elternschaft
    // #B96  = langfristige_bindung
    // #B95  = verbindlichkeit
    // #B36  = unabhaengigkeit
    // #B34  = selbstbestimmung

    // R3: Dynamik (Dominanz) - Machtdynamik
    dynamik: ['#B74', '#B75', '#B76', '#B77', '#B86', '#B85'],
    // #B74 = kontrolle_ausueben
    // #B75 = hingabe
    // #B76 = fuehrung_geben
    // #B77 = gefuehrt_werden
    // #B86 = machtaustausch
    // #B85 = sich_fallenlassen

    // R4: Identität (Geschlecht) - Selbstausdruck
    identitaet: ['#B50', '#B67', '#B25', '#B31']
    // #B50 = authentizitaet
    // #B67 = selbst_ausdruck
    // #B25 = akzeptanz
    // #B31 = gesehen_werden
};

// Cache für BaseArchetypProfile (wird beim ersten Zugriff gesetzt)
let _baseArchetypProfileCache = null;

/**
 * Setzt das BaseArchetypProfile für SSOT-Zugriff
 * Muss beim Server-Start aufgerufen werden
 *
 * @param {object} profiles - Das BaseArchetypProfile Objekt
 */
export function setBaseArchetypProfile(profiles) {
    _baseArchetypProfileCache = profiles;
    console.log('[NeedsIntegration] BaseArchetypProfile gesetzt für SSOT');
}

/**
 * Extrahiert die Referenz-Werte für eine Dimension aus dem BaseArchetypProfile
 * SSOT: Keine hartcodierten Werte mehr!
 *
 * @param {string} archetyp - z.B. 'duo', 'single', etc.
 * @param {string} dimension - 'leben', 'philosophie', 'dynamik', 'identitaet'
 * @returns {object} Die Referenz-Werte als { needId: value }
 */
function getExpectedNeedsFromProfile(archetyp, dimension) {
    const needIds = DIMENSION_NEED_IDS[dimension];
    if (!needIds) {
        console.warn(`[NeedsIntegration] Unbekannte Dimension: ${dimension}`);
        return {};
    }

    // Versuche BaseArchetypProfile zu finden
    let baseProfile = null;

    if (_baseArchetypProfileCache && _baseArchetypProfileCache[archetyp]) {
        baseProfile = _baseArchetypProfileCache[archetyp];
    }

    if (!baseProfile || !baseProfile.beduerfnisse) {
        // Fallback auf ARCHETYP_KOHAERENZ (Legacy)
        console.warn(`[NeedsIntegration] SSOT-Fallback: BaseArchetypProfile nicht verfügbar für ${archetyp}`);
        const kohaerenz = Constants.ARCHETYP_KOHAERENZ;
        return kohaerenz?.[dimension]?.[archetyp] || {};
    }

    // SSOT: Extrahiere Werte direkt aus dem Basis-Profil
    const result = {};
    for (const needId of needIds) {
        const value = baseProfile.beduerfnisse[needId];
        if (value !== undefined) {
            result[needId] = value;
        }
    }

    return result;
}

// ═══════════════════════════════════════════════════════════════════════════
// R-FAKTOREN BERECHNUNG
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Berechnet R-Faktoren (R1-R4) für eine Person
 *
 * v3.3: SSOT - Referenz-Werte aus BaseArchetypProfile
 * v3.2: R = similarity² (quadratisch)
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

    // SSOT: Hole Referenz-Werte direkt aus BaseArchetypProfile
    const expectedLeben = getExpectedNeedsFromProfile(archetyp, 'leben');
    const expectedPhilosophie = getExpectedNeedsFromProfile(archetyp, 'philosophie');
    const expectedDynamik = getExpectedNeedsFromProfile(archetyp, 'dynamik');
    const expectedIdentitaet = getExpectedNeedsFromProfile(archetyp, 'identitaet');

    // R1: Leben (Orientierung)
    const R1 = calculateDimensionR(needs, expectedLeben);

    // R2: Philosophie (Archetyp)
    const R2 = calculateDimensionR(needs, expectedPhilosophie);

    // R3: Dynamik (Dominanz)
    const R3 = calculateDimensionR(needs, expectedDynamik);

    // R4: Identität (Geschlecht)
    const R4 = calculateDimensionR(needs, expectedIdentitaet);

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
 * v3.4: R = avgMatch² mit Richtung
 * - R > 1.0: mehr als Archetyp-typisch
 * - R = 1.0: perfekte Übereinstimmung
 * - R < 1.0: weniger als Archetyp-typisch
 *
 * @param {object} actualNeeds - Tatsächliche Bedürfniswerte
 * @param {object} expectedNeeds - Archetyp-typische Werte
 * @returns {number} R-Wert (kann > 1.0 sein)
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
            // v3.4: Richtungs-basierte Resonanz
            // Positive Abweichung (mehr als erwartet) → match > 1.0 → "mehr Archetyp-typisch"
            // Negative Abweichung (weniger als erwartet) → match < 1.0 → "weniger Archetyp-typisch"
            const abweichung = (actual - expected) / 100;
            const match = 1 + abweichung;
            totalMatch += match;
            count++;
        }
    }

    if (count === 0) return 1.0;

    // Durchschnittliche Übereinstimmung
    const avgMatch = totalMatch / count;

    // v3.4: R = avgMatch² (quadratisch, mit Richtung)
    // avgMatch > 1.0 → R > 1.0 (mehr als Archetyp-typisch)
    // avgMatch = 1.0 → R = 1.0 (perfekte Übereinstimmung)
    // avgMatch < 1.0 → R < 1.0 (weniger als Archetyp-typisch)
    // Beispiele: avgMatch=1.05 → R=1.10, avgMatch=0.9 → R=0.81
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

    // Kombiniere via Summe × Similarity (v3.6)
    return {
        R1: combineRFactors(r1.R1, r2.R1),
        R2: combineRFactors(r1.R2, r2.R2),
        R3: combineRFactors(r1.R3, r2.R3),
        R4: combineRFactors(r1.R4, r2.R4),
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
