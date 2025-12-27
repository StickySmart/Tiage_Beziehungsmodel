/**
 * TIAGE Server - Archetyp Matrix Calculator (ES Module)
 *
 * Migriert von: js/synthesis/factors/archetypeMatrixCalculator.js
 * Berechnet 8x8 Archetyp-Kompatibilitätsmatrix dynamisch aus Bedürfnis-Profilen
 *
 * SSOT: Keine Fallback-Matrizen - Live-Berechnung aus Archetyp-Profilen
 */

// ═══════════════════════════════════════════════════════════════════════════
// KONSTANTEN
// ═══════════════════════════════════════════════════════════════════════════

const ALL_ARCHETYPES = [
    'single', 'duo', 'duo_flex', 'ra', 'lat', 'aromantisch', 'solopoly', 'polyamor'
];

// Cache für Matrix und Profile
let archetypeProfiles = null;
let cachedMatrix = null;

// ═══════════════════════════════════════════════════════════════════════════
// BERECHNUNG
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Berechnet die Ähnlichkeit zwischen zwei Archetyp-Profilen
 *
 * @param {Object} needs1 - Bedürfnisse von Archetyp 1
 * @param {Object} needs2 - Bedürfnisse von Archetyp 2
 * @returns {number} Score 0-100
 */
export function calculateArchetypeMatch(needs1, needs2) {
    if (!needs1 || !needs2) {
        console.warn('[ArchetypeMatrixCalculator] Fehlende Bedürfnisse für Berechnung');
        return 50;
    }

    let summeUebereinstimmung = 0;
    let summeGewicht = 0;
    let beduerfnisCount = 0;

    for (const needId in needs1) {
        if (!Object.prototype.hasOwnProperty.call(needs1, needId)) continue;

        const wert1 = needs1[needId];
        const wert2 = needs2[needId];

        if (wert2 === undefined || wert2 === null) continue;

        // Gewicht: Durchschnitt beider Werte
        const gewicht = (wert1 + wert2) / 2;

        // Ähnlichkeit: 100 - absolute Differenz
        const diff = Math.abs(wert1 - wert2);
        const aehnlichkeit = 100 - diff;

        summeUebereinstimmung += aehnlichkeit * gewicht;
        summeGewicht += gewicht;
        beduerfnisCount++;
    }

    if (summeGewicht === 0) {
        return 50;
    }

    return Math.round(summeUebereinstimmung / summeGewicht);
}

/**
 * Generiert die vollständige 8x8 Archetyp-Kompatibilitätsmatrix
 *
 * @param {Object} profiles - Archetyp-Profile mit umfrageWerte
 * @returns {Object} Matrix { 'single': { 'duo': 72, ... }, ... }
 */
export function generateArchetypeMatrix(profiles) {
    if (!profiles || Object.keys(profiles).length === 0) {
        console.error('[ArchetypeMatrixCalculator] Keine Profile für Matrix-Generierung');
        return null;
    }

    const matrix = {};

    console.log('[ArchetypeMatrixCalculator] Starte Matrix-Generierung...');

    for (const archetype1 of ALL_ARCHETYPES) {
        const profile1 = profiles[archetype1];

        if (!profile1?.umfrageWerte) continue;

        matrix[archetype1] = {};

        for (const archetype2 of ALL_ARCHETYPES) {
            const profile2 = profiles[archetype2];

            if (!profile2?.umfrageWerte) continue;

            matrix[archetype1][archetype2] = calculateArchetypeMatch(
                profile1.umfrageWerte,
                profile2.umfrageWerte
            );
        }
    }

    cachedMatrix = matrix;
    return matrix;
}

/**
 * Normalisiert Archetyp-Namen
 */
export function normalizeArchetypeName(name) {
    if (!name) return '';

    let normalized = name.toLowerCase().replace(/-/g, '_');

    const aliases = {
        'duo flex': 'duo_flex',
        'duoflex': 'duo_flex',
        'solo poly': 'solopoly',
        'solo_poly': 'solopoly',
        'relationship anarchy': 'ra',
        'relationship_anarchy': 'ra',
        'aromantic': 'aromantisch'
    };

    return aliases[normalized] || normalized;
}

/**
 * Gibt Score für ein Archetyp-Paar zurück
 */
export function getScore(type1, type2, profiles = null) {
    const n1 = normalizeArchetypeName(type1);
    const n2 = normalizeArchetypeName(type2);

    // Aus Cache
    if (cachedMatrix?.[n1]?.[n2] !== undefined) {
        return cachedMatrix[n1][n2];
    }

    // Live-Berechnung
    if (profiles) {
        const p1 = profiles[n1];
        const p2 = profiles[n2];

        if (p1?.umfrageWerte && p2?.umfrageWerte) {
            const score = calculateArchetypeMatch(p1.umfrageWerte, p2.umfrageWerte);

            if (!cachedMatrix) cachedMatrix = {};
            if (!cachedMatrix[n1]) cachedMatrix[n1] = {};
            cachedMatrix[n1][n2] = score;

            return score;
        }
    }

    return 50; // Fallback
}

/**
 * Berechnet die gesamte Matrix (API-kompatible Funktion)
 */
export function calculateMatrix(profiles = null) {
    console.log('[ArchetypeMatrixCalculator] calculateMatrix() aufgerufen');

    if (profiles) {
        archetypeProfiles = profiles;
        const matrix = generateArchetypeMatrix(profiles);
        return { matrix, archetypes: ALL_ARCHETYPES };
    }

    if (cachedMatrix) {
        return { matrix: cachedMatrix, archetypes: ALL_ARCHETYPES };
    }

    // Leere Matrix wenn keine Profile
    const emptyMatrix = {};
    for (const a1 of ALL_ARCHETYPES) {
        emptyMatrix[a1] = {};
        for (const a2 of ALL_ARCHETYPES) {
            emptyMatrix[a1][a2] = 50;
        }
    }

    return { matrix: emptyMatrix, archetypes: ALL_ARCHETYPES };
}

/**
 * Setzt Profile für spätere Berechnungen
 */
export function setProfiles(profiles) {
    archetypeProfiles = profiles;
}

/**
 * Gibt gecachte Matrix zurück
 */
export function getCachedMatrix() {
    return cachedMatrix;
}

/**
 * Prüft ob Matrix bereit ist
 */
export function isReady() {
    return cachedMatrix !== null;
}

// Default export
export default {
    calculateArchetypeMatch,
    generateArchetypeMatrix,
    normalizeArchetypeName,
    getScore,
    calculateMatrix,
    setProfiles,
    getCachedMatrix,
    isReady,
    ALL_ARCHETYPES
};
