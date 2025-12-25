/**
 * GENDER MODIFIER: Frau (Trans)
 *
 * Modifikator für transgender weibliche Identität.
 * Basiert auf Forschung zu Trans-Feminität und Transition.
 *
 * @module TiageModifiers.Gender.FrauTrans
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.FrauTrans = {

    id: "frau-trans",
    label: "Frau (Trans)",
    category: "gender",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Brown, L. et al.",
            year: 2024,
            title: "The Relationship between Gender Identity and Gender Centrality",
            journal: "Journal of Homosexuality",
            url: "https://www.tandfonline.com/doi/full/10.1080/00918369.2024.2378737",
            finding: "Trans Frauen haben die höchsten durchschnittlichen Gender-Zentralitätswerte"
        },
        {
            authors: "Twist, J. & de Graaf, N.",
            year: 2020,
            title: "The phenomenology of gender dysphoria in adults",
            journal: "Clinical Psychology Review",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7441311/",
            finding: "Verbessertes psychologisches Wohlbefinden nach Transition"
        },
        {
            authors: "Treharne, G. et al.",
            year: 2022,
            title: "The quality and satisfaction of romantic relationships in transgender people",
            journal: "Journal of Sex & Marital Therapy",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8726697/",
            finding: "Transgender-Paare mit Commitment zeigen reduziertes Stigma und Distress"
        },
        {
            authors: "Levitt, H. & Ippolito, M.",
            year: 2022,
            title: "Transgender identity: Development, management and affirmation",
            journal: "Current Opinion in Psychology",
            url: "https://www.sciencedirect.com/science/article/pii/S2352250X22001889",
            finding: "Unterstützende soziale Umgebungen sind entscheidend für Identitätsaffirmation"
        },
        {
            authors: "Jackson, A.",
            year: 2024,
            title: "Conceptualizing transgender experiences in psychology: Do we have a 'true' gender?",
            journal: "British Journal of Psychology",
            url: "https://bpspsychub.onlinelibrary.wiley.com/doi/10.1111/bjop.12722",
            finding: "Gender-Euphorie und soziale Transition sind zentral für psychische Gesundheit"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren (Keys müssen Need-IDs aus beduerfnis-katalog.json entsprechen)
        rollenausdruck: 5,                  // #B87 Genderzentralität
        authentizitaet: 5,                  // #B50 Durch Transition erreicht
        wachstum_und_sinn: 4,               // #B61 Resilienz
        empathie: 4,                        // #B28 Durch eigene Erfahrungen entwickelt
        emotionale_tiefe: 4,                // #B71 Kommunikationstiefe
        langfristige_bindung: 4,            // #B95 Beziehungscommitment

        // Herausforderungen
        gesellschaft: -3,                   // #B19 Gesellschaftlicher Druck
        stabilitaet_und_sicherheit: -2,     // #B11 Mentale Gesundheitsrisiken

        // Support
        akzeptanz_und_empathie: 5           // #B25 Partner-Unterstützung kritisch
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.75,                      // Wachsende Forschungsbasis
        genderZentralitaet: 0.85,
        selbstreflexion: 0.80,
        resilienz: 0.80,
        gesellschaftlicherDruck: 0.90,
        dataQuality: "medium-high",
        sampleSize: "medium",
        methodology: "comparative studies, qualitative research, clinical studies"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Die trans Frau verkörpert den ultimativen Triumph dynamischer Qualität über statische Formen. Sie hat erkannt, dass die ihr bei Geburt zugewiesene Kategorie nicht ihrer inneren Qualität entspricht, und hat den Mut gehabt, diese zu ändern. Dies ist nicht das Verwerfen von Qualität, sondern das Streben nach ihrer höchsten Form - der Übereinstimmung von innerem Wissen und äußerem Ausdruck.",

    osho: "Die Gesellschaft sagt: 'Du bist, was dein Körper zeigt.' Die trans Frau antwortet: 'Ich bin, was meine Seele weiß.' Dieser Akt der Selbstbestimmung ist einer der mutigsten, den ein Mensch vollziehen kann. Sie zeigt uns, dass Identität nicht vom Fleisch diktiert wird, sondern vom Bewusstsein gewählt werden kann."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.FrauTrans;
}
