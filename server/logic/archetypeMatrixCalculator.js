/**
 * Archetype Matrix Calculator (Server-Version)
 *
 * 8×8 Kompatibilitäts-Matrix
 *
 * TODO: Migriere Code aus js/synthesis/factors/archetypeMatrixCalculator.js
 */

const ARCHETYPES = [
    'single', 'duo', 'duo_flex', 'lat',
    'solopoly', 'polyamor', 'ra', 'aromantisch'
];

/**
 * Berechnet die 8×8 Archetyp-Kompatibilitäts-Matrix
 */
export function calculateMatrix() {
    console.log('[ArchetypeMatrixCalculator] calculateMatrix() aufgerufen');

    // Placeholder - wird mit echtem Code ersetzt
    const matrix = {};

    for (const a1 of ARCHETYPES) {
        matrix[a1] = {};
        for (const a2 of ARCHETYPES) {
            matrix[a1][a2] = 50;  // Neutral-Wert
        }
    }

    return {
        matrix,
        archetypes: ARCHETYPES,
        _placeholder: true
    };
}
