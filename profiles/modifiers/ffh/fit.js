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
        // Körperliche Bedürfnisse (R1 ORIENTIERUNG - wirken auf R-Faktoren!)
        koerperliche_naehe: 3,            // #B160 (R1) Körperbewusstsein → mehr Körperkontakt
        koerperliche_resonanz: 3,         // #B227 (R1) Bessere Körperwahrnehmung

        // R2 ARCHETYP - Selbstbestimmung
        selbstbestimmung_und_unabhaengigkeit: 3, // #B34 (R2) Eigenverantwortung

        // Weitere verstärkte Bedürfnisse
        bewegung: 5,                      // #B4   Bewegung und Sport
        koerperliche_grundbeduerfnisse: 4, // #B1  Körperliche Gesundheit
        herausforderung: 4,               // #B56  Vitalität & Herausforderung
        struktur: 3,                      // #B198 Geregelte Abläufe
        ordnung_und_struktur: 3,          // #B196 Disziplin
        kompetenz_und_wirksamkeit: 3,     // #B58  Wirksamkeit
        erholung: 3,                      // #B6   Regeneration

        // Leicht reduzierte Bedürfnisse
        leichtigkeit: -2,                 // #B14  Genuss kann nachrangig sein
        spontaneitaet: -2                 // #B38  Weniger spontan durch Routinen
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
