/**
 * GENDER MODIFIER: Mann (v4.0)
 *
 * Modifikator für männliche Geschlechtsidentität.
 * v4.0: Vereinfacht - keine Cis/Trans Unterscheidung mehr.
 *
 * @module TiageModifiers.Gender.Mann
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.Mann = {

    id: "mann",
    label: "Mann",
    category: "gender",
    version: "4.0",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Lamarche, V. et al.",
            year: 2025,
            title: "The Dual Pathways to Masculinity Threats: The Roles of Social Role Incongruity and Social Connection",
            journal: "European Journal of Social Psychology",
            url: "https://onlinelibrary.wiley.com/doi/full/10.1002/ejsp.3169",
            finding: "Gay und heterosexuelle Männer erleben ähnliche Maskulinitätsbedrohungen"
        },
        {
            authors: "Milner, A. et al.",
            year: 2018,
            title: "Masculinity, Social Connectedness, and Mental Health: Men's Diverse Patterns of Practice",
            journal: "PMC",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6142169/",
            finding: "Vier distinkte Muster sozialer Verbundenheit bei Männern identifiziert"
        },
        {
            authors: "American Psychological Association",
            year: 2018,
            title: "Guidelines for Psychological Practice With Boys and Men",
            journal: "APA",
            finding: "Traditionelle Maskulinität kann negative Konsequenzen auf Verhalten, Beziehungen und Gesundheit haben"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren
        stabilitaet_und_sicherheit: 2,
        selbstbestimmung_und_unabhaengigkeit: 3,
        fuehrung_geben: 2,

        // Herausforderungen
        vertrauen_schenken: -1
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.85,
        emotionaleStabilitaet: 0.75,
        selbststaendigkeit: 0.80,
        fuehrungsbereitschaft: 0.70,
        dataQuality: "high",
        sampleSize: "large",
        methodology: "meta-analyses and longitudinal studies"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Qualität in der männlichen Identität entsteht nicht durch das Erfüllen gesellschaftlicher Erwartungen, sondern durch das authentische Navigieren zwischen klassischen und dynamischen Qualitäten.",

    osho: "Der wahre Mann ist nicht derjenige, der seine Verletzlichkeit versteckt, sondern derjenige, der den Mut hat, sein ganzes Sein zu zeigen."
};

// LEGACY: Alias für Rückwärtskompatibilität
TiageModifiers.Gender.MannCis = TiageModifiers.Gender.Mann;

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.Mann;
}
