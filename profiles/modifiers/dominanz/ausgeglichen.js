/**
 * DOMINANZ MODIFIER: Ausgeglichen
 *
 * Modifikator für ausgeglichene/egalitäre Beziehungsdynamik.
 * Keine ausgeprägte Dominanz- oder Submissions-Tendenz.
 *
 * @module TiageModifiers.Dominanz.Ausgeglichen
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Dominanz = TiageModifiers.Dominanz || {};

TiageModifiers.Dominanz.Ausgeglichen = {

    id: "ausgeglichen",
    label: "Ausgeglichen",
    category: "dominanz",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Tiedens, L. & Fragale, A.",
            year: 2003,
            title: "Power Moves: Complementarity in Dominant and Submissive Nonverbal Behavior",
            journal: "Journal of Personality and Social Psychology",
            finding: "Hierarchische Komplementarität erhöht Wohlbefinden, aber Gleichheit funktioniert auch"
        },
        {
            authors: "Sadikaj, G. et al.",
            year: 2017,
            title: "Using Interpersonal Cues to Predict Relationship Quality",
            journal: "European Journal of Personality",
            finding: "Ausgeglichene Machtverteilung korreliert mit Beziehungszufriedenheit"
        },
        {
            authors: "Brown, L. et al.",
            year: 2025,
            title: "The Link Between Sexual Dominance Preference and Social Behavior",
            journal: "Deviant Behavior",
            url: "https://www.tandfonline.com/doi/full/10.1080/01639625.2025.2557498",
            finding: "Nicht jeder hat ausgeprägte Dominanz-Präferenzen"
        },
        {
            authors: "Gottman, J.",
            year: 2011,
            title: "The Science of Trust: Emotional Attunement for Couples",
            journal: "W. W. Norton & Company",
            finding: "Egalitäre Beziehungen zeigen hohe Stabilität und Zufriedenheit"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren (Keys müssen Need-IDs aus beduerfnis-katalog.json entsprechen)
        gegenseitigkeit: 5,                 // #B43 Egalität & Partnerschaftlichkeit
        akzeptanz_und_empathie: 4,          // #B25 Respekt & gegenseitige Wertschätzung
        stabilitaet: 4,                     // #B13 Keine extremen Schwankungen

        // Herausforderungen
        wirksamkeit: -1                     // #B60 Entscheidungsgeschwindigkeit - Konsens braucht Zeit
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.85,                      // Gut erforscht (mainstream)
        egalitaet: 0.90,
        partnerschaftlichkeit: 0.85,
        stabilitaet: 0.80,
        dataQuality: "high",
        sampleSize: "very large",
        methodology: "longitudinal relationship studies"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Die ausgeglichene Beziehungsdynamik repräsentiert eine andere Form von Qualität als die komplementäre: nicht die Qualität der perfekten Ergänzung, sondern die Qualität der gleichwertigen Partnerschaft. Hier entsteht Qualität nicht durch Unterschiede, sondern durch die Harmonie zweier gleichberechtigter Stimmen, die zusammen eine reichere Melodie erschaffen.",

    osho: "Nicht jede Beziehung braucht die Spannung von Führen und Folgen. Manche Seelen begegnen sich auf Augenhöhe - zwei Flammen, die nebeneinander brennen, ohne dass eine die andere überstrahlen muss. Dies ist nicht weniger intensiv, nur anders: die Intensität der Gleichheit, der gemeinsamen Reise, des Seite-an-Seite-Gehens."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Dominanz.Ausgeglichen;
}
