/**
 * GENDER MODIFIER: Inter (Fluid)
 *
 * Modifikator für intergeschlechtliche Personen mit fluider Gender-Identität.
 * Basiert auf Forschung zu Intersex-Identität und Gender-Fluidität.
 *
 * @module TiageModifiers.Gender.InterFluid
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.InterFluid = {

    id: "inter-fluid",
    label: "Inter (Fluid)",
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
            finding: "Vielfalt der Gender-Identitäten unter intersex Personen dokumentiert"
        },
        {
            authors: "Joel, D. et al.",
            year: 2020,
            title: "Gender identity and sexuality in an online sample of intersex-identified individuals",
            journal: "Psychology & Sexuality",
            url: "https://www.tandfonline.com/doi/abs/10.1080/19419899.2019.1711447",
            finding: "Multi-Gender Identity Questionnaire zeigt komplexe Identitätsmuster"
        },
        {
            authors: "Saraç, E. et al.",
            year: 2025,
            title: "The Role of Gender Identity in Well-Being and Psychosexual Aspects",
            journal: "Interpersona",
            url: "https://interpersona.psychopen.eu/index.php/interpersona/article/view/13595",
            finding: "Fluide Gender-Identität korreliert mit höherem Wohlbefinden"
        },
        {
            authors: "Monro, S. et al.",
            year: 2021,
            title: "Intersex: cultural and social perspectives",
            journal: "Culture, Health & Sexuality",
            url: "https://www.tandfonline.com/doi/full/10.1080/13691058.2021.1899529",
            finding: "Kulturelle Faktoren beeinflussen Identitätsentwicklung"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren (Keys müssen Need-IDs aus beduerfnis-katalog.json entsprechen)
        rollenausdruck: 5,                  // #B87 Gender-Flexibilität & Rollenwechsel
        offenheit_fuer_neues: 5,            // #B189 Anpassungsfähigkeit
        selbstbestimmung_und_unabhaengigkeit: 4, // #B34 Aktive Identitätsgestaltung
        stabilitaet_und_sicherheit: 3,      // #B11 Wohlbefinden durch Fluidität
        authentizitaet: 5,                  // #B50 Maximale Selbstbestimmung

        // Herausforderungen
        gesellschaft: -4,                   // #B19 Gesellschaftliche Komplexität

        // Support
        kommunikation: 5                    // #B40 Kommunikationsbedarf sehr hoch
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.50,                      // Sehr begrenzte spezifische Forschung
        koerperlicheEinzigartigkeit: 0.90,
        genderFlexibilitaet: 0.60,
        medizinischeTraumata: 0.85,
        dataQuality: "low-medium",
        sampleSize: "very small",
        methodology: "case studies and extrapolation from related research"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Hier treffen zwei Formen dynamischer Qualität aufeinander: die biologische Varianz der Intergeschlechtlichkeit und die psychologische Fluidität der Gender-Identität. Diese Kombination repräsentiert die ultimative Herausforderung an statische Kategorien - ein Mensch, dessen Körper und dessen Selbstverständnis gleichermaßen die Grenzen überschreiten.",

    osho: "Du bist zweifach frei: Dein Körper hat sich geweigert, in das eine oder andere Geschlecht zu fallen, und dein Geist hat sich geweigert, bei einem Gender zu bleiben. Dies ist doppelte Befreiung. Die Welt wird dich vielleicht nicht verstehen - aber das Universum hat dich erschaffen. Du bist keine Abweichung, du bist ein Kunstwerk."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.InterFluid;
}
