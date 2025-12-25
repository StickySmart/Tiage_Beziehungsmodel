/**
 * GENDER MODIFIER: Mann (Trans)
 *
 * Modifikator für transgender männliche Identität.
 * Basiert auf Forschung zu Trans-Maskulinität und Transition.
 *
 * @module TiageModifiers.Gender.MannTrans
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.MannTrans = {

    id: "mann-trans",
    label: "Mann (Trans)",
    category: "gender",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Reigeluth, C. & Addis, M.",
            year: 2021,
            title: "Trans Masculinity: Comparing Trans Masculine Individuals' and Cisgender Men's Conformity to Hegemonic Masculinity",
            journal: "Sexuality Research and Social Policy",
            url: "https://link.springer.com/article/10.1007/s13178-021-00677-5",
            finding: "Trans-maskuline Personen zeigen höhere Werte bei emotionaler Kontrolle und Selbstständigkeit als cis-Männer"
        },
        {
            authors: "Motter, B. & Softas-Nall, L.",
            year: 2021,
            title: "Experiences of Transgender Couples Navigating One Partner's Transition: Love Is Gender Blind",
            journal: "Family Process",
            url: "https://journals.sagepub.com/doi/10.1177/1066480720978537",
            finding: "Beziehungswachstum kann aus gemeinsamer Transition entstehen"
        },
        {
            authors: "Lewis, E. et al.",
            year: 2023,
            title: "Stigma, identity and support in social relationships of transgender people throughout transition",
            journal: "Journal of Social Issues",
            url: "https://spssi.onlinelibrary.wiley.com/doi/10.1111/josi.12521",
            finding: "Unterstützende soziale Beziehungen sind vital für Gesundheit und Wohlbefinden"
        },
        {
            authors: "Iantaffi, A. & Bockting, W.",
            year: 2011,
            title: "Views from both sides of the bridge? Gender, sexual legitimacy, and transgender people's experiences of relationships",
            journal: "Culture, Health & Sexuality",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC3076785/",
            finding: "Transgender-Personen zeigen verbesserte Kommunikationsfähigkeiten und Neuverteilung von Macht in Beziehungen"
        },
        {
            authors: "Treharne, G. et al.",
            year: 2022,
            title: "The quality and satisfaction of romantic relationships in transgender people",
            journal: "Journal of Sex & Marital Therapy",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8726697/",
            finding: "Beziehungs-Commitment reduziert interpersonelles Stigma und psychologischen Distress"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren (Keys müssen Need-IDs aus beduerfnis-katalog.json entsprechen)
        emotionale_sicherheit: 3,           // #B136 Emotionale Kontrolle
        selbstbestimmung_und_unabhaengigkeit: 4, // #B34 Selbstständigkeit
        authentizitaet: 5,                  // #B50 Durch Transition erreicht
        kommunikation: 3,                   // #B40 Verbessert durch Transition
        wachstum_und_sinn: 4,               // #B61 Resilienz durch Herausforderungen
        emotionale_tiefe: 3,                // #B71 Beziehungstiefe

        // Herausforderungen
        gesellschaft: -2,                   // #B19 Gesellschaftlicher Druck
        akzeptanz_und_empathie: 2           // #B25 Unterstützungsbedarf
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.75,                      // Wachsende Forschungsbasis
        emotionaleKontrolle: 0.80,
        selbststaendigkeit: 0.80,
        selbstreflexion: 0.70,
        kommunikationsfaehigkeit: 0.75,
        resilienz: 0.85,
        dataQuality: "medium-high",
        sampleSize: "medium",
        methodology: "comparative studies and qualitative research"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Die Reise zur authentischen Identität ist der ultimative Ausdruck dynamischer Qualität. Ein trans Mann, der durch die Transition geht, löst sich von statischen gesellschaftlichen Mustern und erschafft eine neue, höhere Form der Qualität - eine, die weder im ursprünglichen noch im Zielzustand existierte, sondern im Prozess des Werdens selbst liegt.",

    osho: "Transformation ist das Wesen des Lebens. Wer den Mut hat, sein äußeres Sein mit seinem inneren Wissen in Einklang zu bringen, lebt wahrhaftiger als jene, die in der Illusion der Unveränderlichkeit gefangen bleiben. Der trans Mann zeigt uns: Authentizität erfordert manchmal die radikalste aller Veränderungen - die Veränderung dessen, was die Welt über uns zu wissen glaubte."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.MannTrans;
}
