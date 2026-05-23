/**
 * FFH MODIFIER: Fresh
 *
 * Modifikator fuer frisch verliebt, unverbraucht, ausgeruht — neue Energie ohne Ballast.
 * Teil des FFH-Systems (Fit, Fucked up, Horny, Fresh).
 *
 * @module TiageModifiers.FFH.Fresh
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.FFH = TiageModifiers.FFH || {};

TiageModifiers.FFH.Fresh = {

    id: "fresh",
    label: "Fresh 🌱",
    category: "ffh",

    // ═══════════════════════════════════════════════════════════════════════
    // BESCHREIBUNG
    // ═══════════════════════════════════════════════════════════════════════

    description: "Frisch, unverbraucht, offen, ausgeruht — neue Energie, ohne Ballast, neugierig auf das was kommt",

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren fuer Beduerfnis-Berechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        '#B3':  +8,   // Leichtigkeit — frisch, unbeschwert
        '#B8':  +6,   // Entwicklung — Neugier und Offenheit
        '#B7':  +5,   // Intensität — frische intensive Gefühle
        '#B1':  +5    // Wohlbefinden — ausgeruht und regeneriert
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.70,
        frische: 0.80,
        offenheit: 0.75,
        dataQuality: "medium",
        methodology: "developmental psychology and self-report"
    }
};

// Export fuer verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.FFH.Fresh;
}
