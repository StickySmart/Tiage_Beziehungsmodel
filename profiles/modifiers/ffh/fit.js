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
        // Positive Modifikatoren
        koerperlichkeit: 5,              // #B189 Körperbewusstsein
        energie: 5,                       // #B56 Vitalität
        selbstdisziplin: 4,              // #B67 Struktur und Routine
        gesundheit: 5,                    // #B45 Körperliche Gesundheit
        aktivitaet: 4,                    // #B78 Bewegung und Sport

        // Verstärkte Bedürfnisse
        struktur: 3,                      // #B198 Geregelte Abläufe
        leistung: 3,                      // #B60 Wirksamkeit

        // Leicht reduzierte Bedürfnisse
        genuss: -2,                       // #B14 Genuss kann nachrangig sein
        spontaneitaet: -2                 // #B189 Weniger spontan durch Routinen
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
