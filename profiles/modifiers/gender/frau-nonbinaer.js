/**
 * GENDER MODIFIER: Frau (Nicht-binär)
 *
 * Modifikator für weiblich-orientierte nicht-binäre Identität.
 * Basiert auf Forschung zu non-binary Gender-Identitäten.
 *
 * @module TiageModifiers.Gender.FrauNonbinaer
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.FrauNonbinaer = {

    id: "frau-nonbinaer",
    label: "Frau (Nicht-binär)",
    category: "gender",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Darwin, H.",
            year: 2020,
            title: "Non-Binary Gender Identity Development: A Qualitative Study",
            journal: "University of North Dakota",
            url: "https://commons.und.edu/cgi/viewcontent.cgi?article=5385&context=theses",
            finding: "Nicht-binäre Identitätsentwicklung ist ein individueller, nicht-linearer Prozess"
        },
        {
            authors: "Thorne, N. et al.",
            year: 2021,
            title: "Psychological Functioning in Non-binary Identifying Adolescents and Adults",
            journal: "Journal of Sex & Marital Therapy",
            url: "https://www.tandfonline.com/doi/full/10.1080/0092623X.2021.1950087",
            finding: "Non-binary Menschen erreichen Resilienz durch Community-Building"
        },
        {
            authors: "Pulice-Farrow, L. et al.",
            year: 2022,
            title: "Non-Binary Clients' Experiences of Psychotherapy",
            journal: "Psychotherapy",
            url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9690436/",
            finding: "Therapeuten zeigen oft mangelnde Vorbereitung für non-binary Identitäten"
        },
        {
            authors: "Burgwal, A. et al.",
            year: 2025,
            title: "Non-Binary People's Sexuality, Sexual Health, and Relationship Satisfaction",
            journal: "Archives of Sexual Behavior",
            url: "https://link.springer.com/article/10.1007/s10508-025-03224-0",
            finding: "Umfassende Analyse von Sexualität und Beziehungszufriedenheit"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren
        genderFlexibilitaet: 5,             // Kernmerkmal der Identität
        selbstreflexion: 4,                 // Intensive Auseinandersetzung
        kreativitaet: 3,                    // Überschreitung traditioneller Grenzen
        gemeinschaftsorientierung: 4,       // Wichtigkeit von Community

        // Herausforderungen
        gesellschaftlicheAnerkennung: -3,   // Begrenzte rechtliche Anerkennung
        psychischeBelastung: -2,            // Höhere Raten in Studien
        mikroaggressionen: -2,              // Häufige subtile Diskriminierung

        // Beziehungsdynamik
        rollenvariabilitaet: 5,             // Flexibilität in Beziehungsrollen
        kommunikationsbedarf: 4,            // Erklärungsbedarf nach außen
        authentizitaet: 4,                  // Eigener Weg
        partnerAkzeptanz: 4                 // Wichtigkeit von Verständnis
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.65,                      // Wachsende Forschungsbasis
        genderFlexibilitaet: 0.80,
        selbstreflexion: 0.75,
        psychischeBelastung: 0.85,
        dataQuality: "medium",
        sampleSize: "small-medium",
        methodology: "qualitative studies and emerging quantitative research"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Die weiblich-orientierte nicht-binäre Identität zeigt, dass Qualität sich nicht in Entweder-Oder-Kategorien fassen lässt. Sie bewohnt den Grenzbereich, wo das Weibliche nicht mehr ausschließlich ist, aber noch präsent bleibt. Dieser Raum zwischen den Definitionen ist der fruchtbarste Boden für neue Qualitäten.",

    osho: "Das Weibliche und das Nicht-Binäre - beide sind Wellen desselben Ozeans. Wer sich weigert, nur eine Welle zu sein, erkennt den Ozean in sich. Die Gesellschaft zeichnet scharfe Linien; das Leben kennt nur fließende Übergänge. Diese Identität ehrt das Fließen, während sie eine Richtung behält."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.FrauNonbinaer;
}
