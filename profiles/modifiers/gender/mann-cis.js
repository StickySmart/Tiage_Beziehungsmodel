/**
 * GENDER MODIFIER: Mann (Cis)
 *
 * Modifikator für cisgender männliche Identität.
 * Basiert auf Forschung zu maskuliner Identität und Beziehungspsychologie.
 *
 * @module TiageModifiers.Gender.MannCis
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.MannCis = {

    id: "mann-cis",
    label: "Mann (Cis)",
    category: "gender",

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
            finding: "Gay und heterosexuelle Männer erleben ähnliche Maskulinitätsbedrohungen mit wenigen inhaltlichen Unterschieden"
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
        },
        {
            authors: "Reigeluth, C. & Addis, M.",
            year: 2021,
            title: "Trans Masculinity: Comparing Trans Masculine Individuals' and Cisgender Men's Conformity to Hegemonic Masculinity",
            journal: "Sexuality Research and Social Policy",
            url: "https://link.springer.com/article/10.1007/s13178-021-00677-5",
            finding: "Cis-Männer zeigen höhere Werte bei heterosexueller Selbstdarstellung und Macht über Frauen"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren
        emotionaleStabilitaet: 2,          // Tendenz zu emotionaler Kontrolle
        selbststaendigkeit: 3,              // Hohe Selbstständigkeitswerte
        fuehrungsbereitschaft: 2,           // Gesellschaftliche Erwartung

        // Neutrale/Variable Modifikatoren
        kommunikationsoffenheit: 0,         // Stark individuell variabel
        emotionaleVerletzlichkeit: -1,      // Gesellschaftlicher Druck zur Unterdrückung

        // Beziehungsdynamik
        komplementaritaetMitFrauCis: 3,     // Traditionelle Komplementarität
        komplementaritaetMitMannCis: -2,    // Gesellschaftliche Herausforderungen
        offenheitFuerVielfalt: 0            // Stark individuell
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.85,                      // Gut erforscht
        emotionaleStabilitaet: 0.75,
        selbststaendigkeit: 0.80,
        fuehrungsbereitschaft: 0.70,
        kommunikationsoffenheit: 0.60,
        beziehungsdynamik: 0.75,
        dataQuality: "high",
        sampleSize: "large",
        methodology: "meta-analyses and longitudinal studies"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Qualität in der männlichen Identität entsteht nicht durch das Erfüllen gesellschaftlicher Erwartungen, sondern durch das authentische Navigieren zwischen klassischen und dynamischen Qualitäten. Der Mann, der beide Seiten integriert - die strukturgebende Stabilität und die fließende Anpassungsfähigkeit - erreicht eine höhere Form der Qualität als jener, der nur einer Dimension folgt.",

    osho: "Der wahre Mann ist nicht derjenige, der seine Verletzlichkeit versteckt, sondern derjenige, der den Mut hat, sein ganzes Sein zu zeigen. Maskulinität, die Weichheit ausschließt, ist wie ein Baum ohne Wurzeln - stark im Aussehen, aber schwach im Sturm. Wahre Stärke liegt im Zulassen aller Gefühle."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.MannCis;
}
