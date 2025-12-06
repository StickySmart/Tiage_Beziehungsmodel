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
        // Positive Modifikatoren
        egalitaet: 5,                       // Kernmerkmal
        partnerschaftlichkeit: 5,           // Gleichberechtigte Zusammenarbeit
        kompromissbereitschaft: 4,          // Notwendig für Balance
        respekt: 4,                         // Gegenseitige Wertschätzung
        stabilitaet: 4,                     // Keine extremen Schwankungen

        // Beziehungsdynamik
        komplementaritaetMitDominant: 2,    // Kann sich anpassen
        komplementaritaetMitSubmissiv: 2,   // Kann sich anpassen
        komplementaritaetMitSwitch: 3,      // Beide flexibel
        komplementaritaetMitAusgeglichen: 5,// Optimale Passung

        // Herausforderungen
        entscheidungsgeschwindigkeit: -1,   // Konsens braucht Zeit
        rollenKlarheit: 0                   // Neutral - situationsabhängig
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
