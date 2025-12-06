/**
 * GENDER MODIFIER: Mann (Nicht-binär)
 *
 * Modifikator für männlich-orientierte nicht-binäre Identität.
 * Basiert auf Forschung zu non-binary Gender-Identitäten.
 *
 * @module TiageModifiers.Gender.MannNonbinaer
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.MannNonbinaer = {

    id: "mann-nonbinaer",
    label: "Mann (Nicht-binär)",
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
            finding: "Nicht-binäre Identitätsentwicklung folgt individuellen, nicht-linearen Pfaden"
        },
        {
            authors: "Thorne, N. et al.",
            year: 2021,
            title: "Psychological Functioning in Non-binary Identifying Adolescents and Adults",
            journal: "Journal of Sex & Marital Therapy",
            url: "https://www.tandfonline.com/doi/full/10.1080/0092623X.2021.1950087",
            finding: "Non-binary Personen berichten höhere Raten von Depressionen und Angststörungen"
        },
        {
            authors: "Pulice-Farrow, L. et al.",
            year: 2022,
            title: "Non-Binary Clients' Experiences of Psychotherapy",
            journal: "Psychotherapy",
            url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9690436/",
            finding: "Nicht-binäre Menschen erreichen psychologische Resilienz durch das Herausfordern des binären Systems"
        },
        {
            authors: "Burgwal, A. et al.",
            year: 2025,
            title: "Non-Binary People's Sexuality, Sexual Health, and Relationship Satisfaction",
            journal: "Archives of Sexual Behavior",
            url: "https://link.springer.com/article/10.1007/s10508-025-03224-0",
            finding: "12 Jahre quantitative Forschung zu Sexualität und Beziehungszufriedenheit non-binärer Menschen"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren
        genderFlexibilitaet: 5,             // Kernmerkmal
        selbstreflexion: 4,                 // Intensive Identitätsarbeit
        authentizitaet: 4,                  // Eigener Weg trotz gesellschaftlichem Druck
        offenheitFuerNeues: 4,              // Überschreitung traditioneller Grenzen

        // Herausforderungen
        gesellschaftlicheAnerkennung: -3,   // Fehlende rechtliche/soziale Anerkennung
        psychischesBelastungsrisiko: -2,    // Höhere Raten psychischer Belastung

        // Beziehungsdynamik
        rollenvariabilitaet: 5,             // Flexibilität in Beziehungsrollen
        kommunikationsbedarf: 3,            // Erhöhter Erklärungsbedarf
        gemeinschaftsverbundenheit: 3       // Wichtigkeit von Community
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.65,                      // Wachsende aber noch begrenzte Forschung
        genderFlexibilitaet: 0.80,
        selbstreflexion: 0.70,
        psychischesBelastungsrisiko: 0.85,
        rollenvariabilitaet: 0.60,
        dataQuality: "medium",
        sampleSize: "small-medium",
        methodology: "qualitative studies and emerging quantitative research"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Nicht-binäre Identität repräsentiert eine fundamentale Herausforderung an die statische Qualität gesellschaftlicher Kategorien. Sie ist der lebende Beweis, dass dynamische Qualität - das Fließende, Werdende - nicht in starre Formen gezwungen werden kann. Der männlich-orientierte nicht-binäre Mensch bewohnt den kreativen Raum zwischen den Kategorien, wo neue Qualitäten entstehen.",

    osho: "Die Natur kennt keine Kategorien - nur der Verstand erschafft Käfige. Wer sich weigert, in einen dieser Käfige zu steigen, lebt näher an der Wahrheit des Lebens. Männlich und weiblich sind wie Wellen - sie erscheinen getrennt, aber sie sind Teil desselben Ozeans. Der nicht-binäre Mensch erinnert uns an diesen Ozean."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.MannNonbinaer;
}
