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
        // Offenheit & Neugier (Kern)
        offenheit_fuer_neues: 5,          // #B189 Experimentierfreude
        leichtigkeit: 5,                  // #B14  Genuss, Leichtigkeit
        spontaneitaet: 4,                 // #B38  Spontane Impulse
        wachstum_und_sinn: 3,             // #B61  Neugier auf Entwicklung
        herausforderung: 3,               // #B56  Lust auf Neues

        // Koerperliche & emotionale Frische
        koerperliche_resonanz: 3,         // #B227 Ausgeruht, klar im Koerper
        erholung: 3,                      // #B6   Regeneriert
        intensitaet: 3,                   // #B82  Frische Gefuehle intensiv

        // Verbindung ohne Altlasten
        intimitaet: 3,                    // #B20  Neue Naehe moeglich
        vertrauen: 3,                     //       Noch unverbraucht
        koerperliche_naehe: 3,            // #B160 Frische Koerperlichkeit

        // Reduziert: weniger Beduerfnis nach Altbekanntem
        stabilitaet: -3,                  // #B13  Routine weniger wichtig
        ordnung_und_struktur: -2,         // #B196 Struktur nachrangig
        emotionale_tiefe: -2,             // #B71  Noch nicht in der Tiefe
        gespraechstiefe: -2               // #B126 Leichtere Gespraeche
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
