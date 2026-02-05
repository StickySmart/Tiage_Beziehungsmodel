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
        // Stark verstärkte Bedürfnisse
        sexualitaet: 8,                   // #B189 Sexuelle Erfüllung (Kern!)
        koerperliche_naehe: 6,            // #B47 Körperkontakt
        leidenschaft: 6,                  // #B75 Intensität
        anziehung: 5,                     // #B76 Körperliche Anziehung

        // Verstärkte Bedürfnisse
        intimität: 5,                     // #B47 Nähe
        begehren: 5,                      // #B76 Gewollt werden
        spielfreude: 4,                   // #B14 Spielerischer Umgang
        offenheit_fuer_neues: 4,          // #B189 Experimentierfreude

        // Leicht reduzierte Bedürfnisse
        distanz: -3,                      // Weniger Bedürfnis nach Abstand
        zurueckhaltung: -2                // Weniger reserviert
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
