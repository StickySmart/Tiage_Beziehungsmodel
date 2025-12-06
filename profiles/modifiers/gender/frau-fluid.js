/**
 * GENDER MODIFIER: Frau (Fluid)
 *
 * Modifikator für genderfluide Identität mit weiblicher Tendenz.
 * Basiert auf Forschung zu Gender-Fluidität und Wohlbefinden.
 *
 * @module TiageModifiers.Gender.FrauFluid
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.FrauFluid = {

    id: "frau-fluid",
    label: "Frau (Fluid)",
    category: "gender",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Saraç, E. et al.",
            year: 2025,
            title: "The Role of Gender Identity in Well-Being and Psychosexual Aspects",
            journal: "Interpersona",
            url: "https://interpersona.psychopen.eu/index.php/interpersona/article/view/13595",
            finding: "Fluide Gender-Identität korreliert mit höherem Wohlbefinden und sexueller Zufriedenheit"
        },
        {
            authors: "Diamond, L.",
            year: 2020,
            title: "Sexual Fluidity in Males and Females",
            journal: "Current Sexual Health Reports",
            url: "https://psych.utah.edu/_resources/documents/people/diamond/Sexual%20Fluidity%20in%20Males%20and%20Females.pdf",
            finding: "Frauen zeigen generell höhere Fluidität als Männer"
        },
        {
            authors: "Beischel, W. et al.",
            year: 2023,
            title: "Social psychological research on gender, sexuality, and relationships",
            journal: "Frontiers in Social Psychology",
            url: "https://www.frontiersin.org/journals/social-psychology/articles/10.3389/frsps.2023.1331160/full",
            finding: "Gender kann fluid und veränderbar sein - entgegen traditioneller Theorien"
        },
        {
            authors: "Haslam, A. et al.",
            year: 2024,
            title: "The association between gender identity fluidity and health outcomes",
            journal: "SSM - Population Health",
            url: "https://www.sciencedirect.com/science/article/pii/S2211335524001505",
            finding: "Gender-Identität kann über Zeit fluktuieren mit gesundheitlichen Implikationen"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren (höher als bei Männern aufgrund Forschung)
        wohlbefinden: 4,                    // Höhere Werte als bei rigider Identität
        sexuelleZufriedenheit: 4,           // Erhöhte Zufriedenheit
        sexuelleAssertivitaet: 3,           // Selbstbestimmtheit
        anpassungsfaehigkeit: 5,            // Kernmerkmal
        emotionaleFlexibilitaet: 5,         // Natürliche Stärke

        // Herausforderungen
        gesellschaftlichesVerstaendnis: -2, // Begrenzte Akzeptanz
        stabilitaetsErwartung: -2,          // Partner-Verunsicherung möglich

        // Beziehungsdynamik
        rollenwechsel: 5,                   // Natürlicher Teil der Identität
        kommunikationsoffenheit: 4,         // Notwendigkeit und Stärke
        spontanitaet: 4,                    // Flexibilität im Alltag
        sexuelleFluiditaet: 5               // Korreliert mit Gender-Fluidität
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.65,                      // Wachsendes Forschungsfeld
        wohlbefinden: 0.80,
        sexuelleZufriedenheit: 0.75,
        anpassungsfaehigkeit: 0.70,
        sexuelleFluiditaet: 0.85,
        dataQuality: "medium",
        sampleSize: "medium",
        methodology: "longitudinal studies and comparative research"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Die genderfluide Frau verkörpert die dynamische Qualität in ihrer reinsten Form. Sie wechselt nicht die Qualität - sie zeigt, dass Qualität selbst nicht fixiert ist. Wie Wasser, das seine Form dem Gefäß anpasst, ohne seine Essenz zu verlieren, behält sie ihre Qualität bei, während sie ihre Ausdrucksform variiert.",

    osho: "Die Frau war schon immer näher am Fließenden, am Lebendigen. Gender-Fluidität ist die natürliche Erweiterung dieser weiblichen Qualität - die Weigerung, sich in eine starre Form pressen zu lassen. Jeden Tag eine neue Nuance zu sein, ist nicht Instabilität - es ist die höchste Form der Lebendigkeit."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.FrauFluid;
}
