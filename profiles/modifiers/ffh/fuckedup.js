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
        // R4 GESCHLECHT/IDENTITÄT - wirken auf R-Faktoren!
        authentizitaet: 5,                // #B50  (R4) Echtsein, keine Fassade
        selbst_ausdruck: 4,              // #B67  (R4) Sich zeigen können
        akzeptanz_und_empathie: 5,        // #B25  (R4) Annahme trotz Fehlern
        gesehen_und_verstanden_werden: 4, // #B31  (R4) Verstanden werden

        // R3 DOMINANZ - Machtdynamik
        kontrolle_ausueben: -3,           // #B74  (R3) Kontrolle ist schwieriger
        hingabe: 3,                       // #B75  (R3) Sich fallen lassen können

        // Emotionale Intensität
        emotionale_tiefe: 5,              // #B71  Tiefgang in Gesprächen
        verletzlichkeit: 4,              // #B134 Offenheit für Verletzlichkeit
        intensitaet: 4,                   // #B82  Tiefe Gefühle
        wachstum_und_sinn: 4,             // #B61  Persönliche Entwicklung
        gespraechstiefe: 3,              // #B126 Tiefgehende Gespräche

        // Reduzierte Bedürfnisse
        stabilitaet: -3,                  // #B13  Weniger Bedürfnis nach Routine
        small_talk: -4,                   // #B128 Smalltalk ist anstrengend
        ordnung_und_struktur: -2          // #B196 Weniger Struktur
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
