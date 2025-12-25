/**
 * GENDER MODIFIER: Frau (Cis)
 *
 * Modifikator für cisgender weibliche Identität.
 * Basiert auf Forschung zu femininer Identität und Beziehungspsychologie.
 *
 * @module TiageModifiers.Gender.FrauCis
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.FrauCis = {

    id: "frau-cis",
    label: "Frau (Cis)",
    category: "gender",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Brown, L. et al.",
            year: 2024,
            title: "The Relationship between Gender Identity and Gender Centrality among Transgender, Cisgender, Nonbinary, and Intersex Individuals",
            journal: "Journal of Homosexuality",
            url: "https://www.tandfonline.com/doi/full/10.1080/00918369.2024.2378737",
            finding: "Cis-Frauen zeigen niedrigere Gender-Zentralitätswerte als trans Frauen"
        },
        {
            authors: "Saraç, E. et al.",
            year: 2025,
            title: "The Role of Gender Identity in Well-Being and Psychosexual Aspects",
            journal: "Interpersona",
            url: "https://interpersona.psychopen.eu/index.php/interpersona/article/view/13595",
            finding: "Personen mit rigider 'Frau'-Identifikation zeigen niedrigste Wohlbefindens-Indikatoren"
        },
        {
            authors: "Pulice-Farrow, L. et al.",
            year: 2013,
            title: "Experiences of female partners of masculine identifying trans persons",
            journal: "Culture, Health & Sexuality",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3696033/",
            finding: "Weibliche Partner zeigen hohe Anpassungsfähigkeit in diversen Beziehungen"
        },
        {
            authors: "Diamond, L.",
            year: 2020,
            title: "Sexual Fluidity in Males and Females",
            journal: "Current Sexual Health Reports",
            url: "https://psych.utah.edu/_resources/documents/people/diamond/Sexual%20Fluidity%20in%20Males%20and%20Females.pdf",
            finding: "Frauen zeigen tendenziell höhere sexuelle Fluidität als Männer"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren (Keys müssen Need-IDs aus beduerfnis-katalog.json entsprechen)
        emotionale_naehe: 3,                // #B18 Emotionale Intelligenz
        kommunikation: 3,                   // #B40 Höhere verbale Fähigkeiten
        langfristige_bindung: 3,            // #B95 Beziehungsorientierung
        empathie: 3,                        // #B28 Gesellschaftlich entwickelt
        sexualitaet: 2,                     // #B172 Sexuelle Flexibilität
        offenheit_fuer_neues: 3,            // #B189 Anpassungsfähigkeit

        // Herausforderungen
        gesellschaft: -2                    // #B19 Gesellschaftlicher Druck
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.85,                      // Sehr gut erforscht
        emotionaleIntelligenz: 0.80,
        kommunikationsfaehigkeit: 0.75,
        beziehungsorientierung: 0.80,
        sexuelleFluiditaet: 0.85,
        dataQuality: "high",
        sampleSize: "very large",
        methodology: "meta-analyses and longitudinal studies"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Die weibliche Qualität wurde historisch oft als die empfangende, nährende Kraft verstanden - aber dies greift zu kurz. Wahre Qualität in der weiblichen Identität liegt in der Integration von Stärke und Sensibilität, von Autonomie und Verbundenheit. Die cis Frau, die beide Pole in sich vereint, transzendiert die ihr zugeschriebenen Begrenzungen.",

    osho: "Die Frau ist näher am Leben selbst - sie trägt das Potential neuen Lebens in sich. Diese Verbundenheit mit der Schöpfung gibt ihr eine intuitive Weisheit, die der analytische Verstand nicht erreichen kann. Doch die wahre Befreiung liegt nicht in der Betonung des Weiblichen gegen das Männliche, sondern in der Integration beider Energien."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.FrauCis;
}
