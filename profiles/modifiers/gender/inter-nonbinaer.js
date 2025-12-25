/**
 * GENDER MODIFIER: Inter (Nicht-binär)
 *
 * Modifikator für intergeschlechtliche Personen mit nicht-binärer Identität.
 * Basiert auf Forschung zu Intersex-Identität und psychologischem Wohlbefinden.
 *
 * @module TiageModifiers.Gender.InterNonbinaer
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.InterNonbinaer = {

    id: "inter-nonbinaer",
    label: "Inter (Nicht-binär)",
    category: "gender",

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
            finding: "63.4% identifizieren sich als intersex, 25%+ als non-binary"
        },
        {
            authors: "Joel, D. et al.",
            year: 2020,
            title: "Gender identity and sexuality in an online sample of intersex-identified individuals",
            journal: "Psychology & Sexuality",
            url: "https://www.tandfonline.com/doi/abs/10.1080/19419899.2019.1711447",
            finding: "Breites Spektrum von Gender-Identitäten bei intersex Personen"
        },
        {
            authors: "Monro, S. et al.",
            year: 2021,
            title: "Intersex: cultural and social perspectives",
            journal: "Culture, Health & Sexuality",
            url: "https://www.tandfonline.com/doi/full/10.1080/13691058.2021.1899529",
            finding: "Soziale Isolation, Scham und Identitätsfragen beeinflussen Lebensqualität"
        },
        {
            authors: "Rosario, V. et al.",
            year: 2023,
            title: "Quality of Life and Psychosocial Well-Being among Intersex-Identifying Individuals",
            journal: "International Journal of Environmental Research and Public Health",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9957316/",
            finding: "Schwierigkeiten bei Partnersuche und Community-Zugehörigkeit beeinflussen QoL"
        },
        {
            authors: "The Trevor Project",
            year: 2021,
            title: "Experiences and Mental Health Outcomes among Intersex LGBTQ+ Young People",
            journal: "The Trevor Project Research Briefs",
            url: "https://www.thetrevorproject.org/research-briefs/experiences-and-mental-health-outcomes-among-intersex-lgbtq-young-people/",
            finding: "Akzeptanz durch Bezugspersonen reduziert Suizidrisiko signifikant"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren (Keys müssen Need-IDs aus beduerfnis-katalog.json entsprechen)
        integritaet: 4,                     // #B52 Identitätsintegration
        wachstum_und_sinn: 4,               // #B61 Resilienz
        authentizitaet: 5,                  // #B50 Eigener Weg jenseits binärer Normen
        gemeinschaft: 4,                    // #B41 Wichtigkeit von Community

        // Herausforderungen
        gesellschaft: -3,                   // #B19 Gesellschaftliche Unsichtbarkeit
        stabilitaet_und_sicherheit: -3,     // #B11 Psychische Belastung
        langfristige_bindung: -2,           // #B95 Partnerschaftliche Herausforderungen

        // Support
        kommunikation: 5,                   // #B40 Kommunikationsbedarf
        akzeptanz_und_empathie: 5           // #B25 Unterstützung kritisch wichtig
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.60,                      // Wachsende aber begrenzte Forschung
        koerperlicheEinzigartigkeit: 0.90,
        medizinischeTraumata: 0.85,
        psychischeBelastung: 0.80,
        partnerschaftlicheHerausforderungen: 0.70,
        dataQuality: "medium",
        sampleSize: "small",
        methodology: "survey research and qualitative studies"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Die intergeschlechtliche nicht-binäre Identität ist der lebende Beweis, dass die Natur selbst keine starren Kategorien kennt. Hier zeigt sich Qualität jenseits aller dualistischen Konzepte - eine Qualität, die die Gesellschaft lange zu unterdrücken versuchte, weil sie ihre binären Systeme in Frage stellt. Dies ist Qualität in ihrer ursprünglichsten Form.",

    osho: "Die Natur hat dir einen Körper gegeben, der die Dualität transzendiert - und die Gesellschaft nannte es ein Problem. Doch du bist kein Problem - du bist die Antwort auf die Frage, die die Gesellschaft nicht zu stellen wagte. In dir vereinigt sich, was andere trennen. Das ist keine Abweichung - das ist Vollständigkeit."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.InterNonbinaer;
}
