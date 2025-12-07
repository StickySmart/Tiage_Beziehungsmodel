/**
 * GENDER MODIFIER: Frau (Suchend/Questioning)
 *
 * Modifikator für Menschen mit weiblicher Tendenz, die ihre Gender-Identität hinterfragen.
 * Basiert auf Forschung zu Gender-Exploration und Identitätsentwicklung.
 *
 * @module TiageModifiers.Gender.FrauSuchend
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.FrauSuchend = {

    id: "frau-suchend",
    label: "Frau (Suchend/Questioning)",
    category: "gender",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Katz-Wise, S. et al.",
            year: 2020,
            title: "Gender identity and sexuality development among young adult transgender men",
            journal: "PMC",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6982571/",
            finding: "Gender-Exploration ist ein normaler Entwicklungsprozess, der Zeit benötigt"
        },
        {
            authors: "Twist, J. & de Graaf, N.",
            year: 2020,
            title: "The phenomenology of gender dysphoria in adults",
            journal: "Clinical Psychology Review",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7441311/",
            finding: "Psychologische Belastung während der Identitätsexploration ist häufig"
        },
        {
            authors: "Budge, S. et al.",
            year: 2021,
            title: "Experiences and Perceptions of Trans and Gender Non-Binary People",
            journal: "International Journal of Transgender Health",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8036290/",
            finding: "Unterstützung von Familie, Freunden oder Partnern ermöglicht sichere Exploration"
        },
        {
            authors: "Levitt, H. & Ippolito, M.",
            year: 2022,
            title: "Transgender identity: Development, management and affirmation",
            journal: "Current Opinion in Psychology",
            url: "https://www.sciencedirect.com/science/article/pii/S2352250X22001889",
            finding: "Unterstützende Umgebungen sind entscheidend für Identitätsentwicklung"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren
        selbstreflexion: 5,                 // Intensive innere Arbeit
        offenheitFuerWachstum: 5,           // Bereitschaft zur Veränderung
        ehrlichkeit: 4,                     // Anerkennung der Unsicherheit
        vulnerabilitaet: 3,                 // Authentische Verletzlichkeit

        // Herausforderungen
        identitaetsStabilitaet: -4,         // Definitionsgemäß unsicher
        zukunftsplanung: -3,                // Ungewissheit
        psychischeBelastung: -3,            // Erhöhte Angst/Depression

        // Beziehungsdynamik
        unterstuetzungsbedarf: 5,           // Hohe Wichtigkeit
        kommunikationsbedarf: 4,            // Offener Austausch nötig
        partnerGeduld: -2,                  // Erfordert geduldigen Partner
        entwicklungspotential: 5            // Großer Raum für Wachstum
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.55,                      // Übergangsphase schwer zu erforschen
        selbstreflexion: 0.80,
        psychischeBelastung: 0.85,
        entwicklungspotential: 0.50,        // Sehr individuell
        dataQuality: "medium",
        sampleSize: "small",
        methodology: "qualitative studies and clinical observations",
        note: "Questioning-Phase ist temporär - Modifier können sich stark ändern"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Das Hinterfragen ist der erste Schritt zur höheren Qualität. Die Frau, die ihre Identität in Frage stellt, hat erkannt, dass die statische Qualität der gesellschaftlichen Definition möglicherweise nicht mit ihrer dynamischen inneren Erfahrung übereinstimmt. Dieser Zweifel ist kein Defizit, sondern der Beginn eines Qualitätssprungs.",

    osho: "Fragen sind wertvoller als Antworten. Wer die Frage 'Wer bin ich wirklich?' stellt, ist weiter als jene, die glauben, es bereits zu wissen. Die Unsicherheit ist der offene Himmel - die Gewissheit ist das geschlossene Dach. Bleibe im Fragen, bis die Antwort aus der Stille kommt, nicht aus der Gesellschaft."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.FrauUnsicher;
}
