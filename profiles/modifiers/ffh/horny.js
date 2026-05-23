/**
 * FFH MODIFIER: Horny
 *
 * Modifikator für hohe Libido und sexuelle Offenheit.
 * Teil des FFH-Systems (Fit, Fucked up, Horny).
 *
 * @module TiageModifiers.FFH.Horny
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.FFH = TiageModifiers.FFH || {};

TiageModifiers.FFH.Horny = {

    id: "horny",
    label: "Horny 😈",
    category: "ffh",

    // ═══════════════════════════════════════════════════════════════════════
    // BESCHREIBUNG
    // ═══════════════════════════════════════════════════════════════════════

    description: "Hohe Libido, sexuell offen, körperlich expressiv, leidenschaftlich",

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Bedürfnis-Berechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        '#B7':  +12,  // Intensität — körperlich-sinnliche Erfahrungstiefe
        '#B12': +8,   // Verbundenheit — körperliche Nähe und Intimität
        '#B1':  +3    // Wohlbefinden — Körperbewusstsein erhöht
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.80,
        sexualitaet: 0.85,
        intimität: 0.80,
        dataQuality: "medium-high",
        methodology: "sexuality research and self-report scales"
    }
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.FFH.Horny;
}
