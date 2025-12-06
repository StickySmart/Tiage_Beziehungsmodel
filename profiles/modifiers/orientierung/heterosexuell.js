/**
 * ORIENTIERUNG MODIFIER: Heterosexuell
 *
 * Modifikator für heterosexuelle Orientierung.
 * Basiert auf Forschung zu sexueller Orientierung und Beziehungspsychologie.
 *
 * @module TiageModifiers.Orientierung.Heterosexuell
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Orientierung = TiageModifiers.Orientierung || {};

TiageModifiers.Orientierung.Heterosexuell = {

    id: "heterosexuell",
    label: "Heterosexuell",
    category: "orientierung",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "American Psychological Association",
            year: 2015,
            title: "Guidelines for Psychological Practice With Transgender and Gender Nonconforming People",
            journal: "American Psychologist",
            finding: "Heterosexualität ist die statistisch häufigste sexuelle Orientierung"
        },
        {
            authors: "Diamond, L.",
            year: 2020,
            title: "Sexual Fluidity in Males and Females",
            journal: "Current Sexual Health Reports",
            url: "https://psych.utah.edu/_resources/documents/people/diamond/Sexual%20Fluidity%20in%20Males%20and%20Females.pdf",
            finding: "Auch heterosexuelle Identität kann Fluidität aufweisen"
        },
        {
            authors: "Calzo, J. et al.",
            year: 2017,
            title: "Heteronormativity in the Lives of Lesbian, Gay, Bisexual, and Queer Young People",
            journal: "Journal of Adolescent Health",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7035158/",
            finding: "Heteronormativität beeinflusst alle sexuellen Orientierungen"
        },
        {
            authors: "Mereish, E. & Poteat, V.",
            year: 2020,
            title: "Not quite over the rainbow: the unrelenting and insidious nature of heteronormative ideology",
            journal: "Current Opinion in Psychology",
            url: "https://www.sciencedirect.com/science/article/pii/S2352154620300383",
            finding: "Heterosexuelle Identität wird durch soziale Faktoren mitgeprägt"
        },
        {
            authors: "Savin-Williams, R. & Vrangalova, Z.",
            year: 2013,
            title: "Mostly Heterosexual as a Distinct Sexual Orientation Group",
            journal: "Developmental Psychology",
            finding: "'Mostly heterosexuell' ist eine distinkte Orientierungskategorie"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Basis-Kompatibilität
        kompatibilitaetMitHetero: 5,         // Gegenseitige Anziehung gegeben
        kompatibilitaetMitHomo: -5,          // Keine gegenseitige Anziehung
        kompatibilitaetMitBi: 3,             // Einseitige Kompatibilität möglich

        // Gesellschaftliche Faktoren
        gesellschaftlicheAkzeptanz: 5,       // Normative Position
        sichtbarkeit: 5,                     // Dominante Repräsentation
        diskriminierungsrisiko: 0,           // Kein orientierungsbedingtes Risiko

        // Beziehungsdynamik
        rollenerwartungen: 2,                // Traditionelle Erwartungen vorhanden
        beziehungsmodelle: 4,                // Viele Vorbilder verfügbar
        familiengruendung: 4                 // Gesellschaftlich unterstützt
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.95,                       // Sehr gut erforscht
        kompatibilitaet: 0.95,
        gesellschaftlicheAkzeptanz: 0.95,
        dataQuality: "very high",
        sampleSize: "very large",
        methodology: "extensive longitudinal and cross-sectional research"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Heterosexualität als die statistisch häufigste Orientierung trägt keine inhärente Qualität, die sie anderen Orientierungen überlegen macht. Ihre Qualität liegt in der gleichen Fähigkeit zur Liebe, Verbindung und Intimität wie jede andere Orientierung. Die gesellschaftliche Normierung ist keine Qualitätsaussage, sondern eine historische Gegebenheit.",

    osho: "Liebe kennt kein 'normal' und kein 'anders'. Die Anziehung zwischen Mann und Frau ist einer von vielen Wegen, auf denen das Leben sich selbst feiert. Sie ist nicht mehr und nicht weniger heilig als jede andere Form der Liebe. Wer seine Heterosexualität als Überlegenheit betrachtet, hat weder die Liebe noch sich selbst verstanden."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Orientierung.Heterosexuell;
}
