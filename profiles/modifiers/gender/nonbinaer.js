/**
 * GENDER MODIFIER: Nonbinär (v4.0)
 *
 * Modifikator für nicht-binäre Geschlechtsidentität.
 * v4.0: Vereinfacht - umfasst alle nicht-binären Identitäten
 *       (früher: inter-nonbinaer, inter-fluid, inter-suchend, mann-nonbinaer, frau-nonbinaer)
 *
 * @module TiageModifiers.Gender.Nonbinaer
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.Nonbinaer = {

    id: "nonbinaer",
    label: "Nonbinär",
    category: "gender",
    version: "4.0",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Rosenwohl-Mack, A. et al.",
            year: 2020,
            title: "A national study on the physical and mental health of intersex adults in the U.S.",
            journal: "PLoS ONE",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7546494/",
            finding: "25%+ der intersex Personen identifizieren sich als non-binary"
        },
        {
            authors: "Joel, D. et al.",
            year: 2020,
            title: "Gender identity and sexuality in an online sample of intersex-identified individuals",
            journal: "Psychology & Sexuality",
            finding: "Breites Spektrum von Gender-Identitäten jenseits des Binären"
        },
        {
            authors: "Monro, S. et al.",
            year: 2021,
            title: "Intersex: cultural and social perspectives",
            journal: "Culture, Health & Sexuality",
            finding: "Community-Zugehörigkeit und Akzeptanz sind entscheidend für Lebensqualität"
        },
        {
            authors: "The Trevor Project",
            year: 2021,
            title: "Experiences and Mental Health Outcomes among LGBTQ+ Young People",
            finding: "Akzeptanz durch Bezugspersonen reduziert psychische Belastung signifikant"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren
        integritaet: 4,
        wachstum_und_sinn: 4,
        authentizitaet: 5,
        gemeinschaft: 4,
        kommunikation: 5,
        akzeptanz_und_empathie: 5,
        offenheit_fuer_neues: 4,

        // Herausforderungen
        gesellschaft: -3,
        stabilitaet_und_sicherheit: -2
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.65,
        identitaetsFlexibilitaet: 0.85,
        communityBedarf: 0.80,
        kommunikationsBedarf: 0.85,
        psychischeBelastung: 0.75,
        dataQuality: "medium-high",
        sampleSize: "growing",
        methodology: "survey research and qualitative studies"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Die nicht-binäre Identität ist der lebende Beweis, dass die Natur selbst keine starren Kategorien kennt. Hier zeigt sich Qualität jenseits aller dualistischen Konzepte - eine Qualität, die die Gesellschaft lange zu unterdrücken versuchte.",

    osho: "Du bist kein Problem - du bist die Antwort auf die Frage, die die Gesellschaft nicht zu stellen wagte. In dir vereinigt sich, was andere trennen. Das ist keine Abweichung - das ist Vollständigkeit."
};

// LEGACY: Aliase für Rückwärtskompatibilität
TiageModifiers.Gender.InterNonbinaer = TiageModifiers.Gender.Nonbinaer;
TiageModifiers.Gender.InterFluid = TiageModifiers.Gender.Nonbinaer;
TiageModifiers.Gender.InterSuchend = TiageModifiers.Gender.Nonbinaer;
TiageModifiers.Gender.MannNonbinaer = TiageModifiers.Gender.Nonbinaer;
TiageModifiers.Gender.FrauNonbinaer = TiageModifiers.Gender.Nonbinaer;

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.Nonbinaer;
}
