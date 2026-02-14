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
        // Stark verstärkte Bedürfnisse (R1 ORIENTIERUNG - wirken auf R-Faktoren!)
        sexuelle_experimentierfreude: 6,  // #B175 (R1) Experimentierfreude
        sexuelle_verbindung: 5,           // #B176 (R1) Sexuelle Verbindung
        koerperliche_naehe: 6,            // #B160 (R1) Körperkontakt
        intimitaet: 5,                    // #B20  (R1) Nähe & Intimität
        koerperliche_lust: 5,             // #B174 (R1) Körperliche Lust
        koerperliche_resonanz: 4,         // #B227 (R1) Körperliche Resonanz

        // Weitere verstärkte Bedürfnisse
        sexualitaet: 8,                   // #B172 Sexuelle Erfüllung (Kern!)
        sexuelle_intimitaet: 4,           // #B173 Sexuelle Intimität
        offenheit_fuer_neues: 4,          // #B189 Experimentierfreude
        intensitaet: 3,                   // #B82  Tiefe Gefühle

        // Leicht reduzierte Bedürfnisse
        physische_distanz: -3,            // #B162 Weniger Bedürfnis nach Abstand
        emotionale_zurueckhaltung: -2     // #B135 Weniger reserviert
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
