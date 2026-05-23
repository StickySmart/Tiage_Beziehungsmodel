/**
 * FFH MODIFIER: Fit
 *
 * Modifikator für körperlich aktive, gesundheitsbewusste Persönlichkeit.
 * Teil des FFH-Systems (Fit, Fucked up, Horny).
 *
 * @module TiageModifiers.FFH.Fit
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.FFH = TiageModifiers.FFH || {};

TiageModifiers.FFH.Fit = {

    id: "fit",
    label: "Fit 💪",
    category: "ffh",

    // ═══════════════════════════════════════════════════════════════════════
    // BESCHREIBUNG
    // ═══════════════════════════════════════════════════════════════════════

    description: "Körperlich aktiv, gesundheitsbewusst, sportlich, energiegeladen",

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Bedürfnis-Berechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        '#B1':  +8,   // Wohlbefinden — körperliche Gesundheit und Fitness
        '#B5':  +8,   // Wirksamkeit — Energie und Leistungsfähigkeit
        '#B3':  +5,   // Leichtigkeit — Erholung und Regeneration
        '#B8':  +5    // Entwicklung — ständiges Wachstum und Herausforderung
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.75,
        koerperlichkeit: 0.85,
        energie: 0.80,
        dataQuality: "medium",
        methodology: "behavioral observation and self-report"
    }
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.FFH.Fit;
}
