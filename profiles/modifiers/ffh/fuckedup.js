/**
 * FFH MODIFIER: Fucked up
 *
 * Modifikator für emotional intensive, komplexe Persönlichkeit.
 * Teil des FFH-Systems (Fit, Fucked up, Horny).
 *
 * @module TiageModifiers.FFH.Fuckedup
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.FFH = TiageModifiers.FFH || {};

TiageModifiers.FFH.Fuckedup = {

    id: "fuckedup",
    label: "Fucked up 🔥",
    category: "ffh",

    // ═══════════════════════════════════════════════════════════════════════
    // BESCHREIBUNG
    // ═══════════════════════════════════════════════════════════════════════

    description: "Emotional intensiv, komplex, chaotisch, tiefgründig, mit Ecken und Kanten",

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Bedürfnis-Berechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        '#B1':  -10,  // Wohlbefinden — beeinträchtigt
        '#B2':  -10,  // Sicherheit — destabilisiert
        '#B3':  -8,   // Leichtigkeit — schwer erreichbar
        '#B13': -5,   // Selbsterkenntnis — Selbstbild verzerrt
        '#B12': -5    // Verbundenheit — Nähe schwierig
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.70,
        emotionaleIntensitaet: 0.75,
        authentizitaet: 0.80,
        dataQuality: "medium",
        methodology: "qualitative research and self-report"
    }
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.FFH.Fuckedup;
}
