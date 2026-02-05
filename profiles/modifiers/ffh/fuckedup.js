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
        // Positive Modifikatoren - Verstärkte Bedürfnisse
        tiefe: 5,                         // #B61 Tiefgang in Gesprächen
        authentizitaet: 5,                // #B52 Echtsein, keine Fassade
        akzeptanz: 5,                     // #B28 Annahme trotz Fehlern
        verstaendnis: 4,                  // #B29 Verstanden werden
        selbst_ausdruck: 4,               // #B67 Sich zeigen können

        // Emotionale Intensität
        intensitaet: 4,                   // #B75 Tiefe Gefühle
        wachstum_und_sinn: 4,             // #B61 Persönliche Entwicklung

        // Reduzierte Bedürfnisse
        stabilitaet: -3,                  // #B198 Weniger Bedürfnis nach Routine
        oberflaeche: -4,                  // Smalltalk ist anstrengend
        kontrolle_ausueben: -3            // #B74 Kontrolle ist schwieriger
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
