/**
 * ORIENTIERUNG MODIFIER: Homosexuell
 *
 * Modifikator für homosexuelle Orientierung (schwul/lesbisch).
 * Basiert auf Forschung zu LGB-Identität und Beziehungspsychologie.
 *
 * @module TiageModifiers.Orientierung.Homosexuell
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Orientierung = TiageModifiers.Orientierung || {};

TiageModifiers.Orientierung.Homosexuell = {

    id: "homosexuell",
    label: "Homosexuell",
    category: "orientierung",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Hooker, E.",
            year: 1957,
            title: "The Adjustment of the Male Overt Homosexual",
            journal: "Journal of Projective Techniques",
            finding: "Homosexualität ist nicht inhärent psychopathologisch"
        },
        {
            authors: "Baiocco, R. et al.",
            year: 2021,
            title: "Sexual Orientation Identity Development Milestones Among Lesbian, Gay, Bisexual, and Queer People",
            journal: "Frontiers in Psychology",
            url: "https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2021.753954/full",
            finding: "Coming-Out fördert Wohlbefinden und mentale Gesundheit"
        },
        {
            authors: "Frost, D. & Meyer, I.",
            year: 2010,
            title: "Internalized Homophobia and Relationship Quality among Lesbians, Gay Men, and Bisexuals",
            journal: "Journal of Counseling Psychology",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2678796/",
            finding: "Internalisierte Homophobie beeinträchtigt Beziehungsqualität"
        },
        {
            authors: "American Psychological Association",
            year: 2008,
            title: "Understanding sexual orientation and homosexuality",
            journal: "APA",
            url: "https://www.apa.org/topics/lgbtq/orientation",
            finding: "Integration der sexuellen Orientierung fördert Wohlbefinden"
        },
        {
            authors: "Meyer, I.",
            year: 2003,
            title: "Social and Psychological Well-being in Lesbians, Gay Men, and Bisexuals",
            journal: "Journal of Consulting and Clinical Psychology",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC2853758/",
            finding: "Minority Stress beeinflusst psychische Gesundheit"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Basis-Kompatibilität
        kompatibilitaetMitHomo: 5,           // Gegenseitige Anziehung
        kompatibilitaetMitHetero: -5,        // Keine gegenseitige Anziehung
        kompatibilitaetMitBi: 3,             // Teilweise Kompatibilität

        // Identitätsfaktoren
        identitaetsstaerke: 4,               // Nach Coming-Out oft stark
        communityVerbundenheit: 4,           // LGBTQ+ Community
        resilienz: 4,                        // Durch Überwindung von Herausforderungen

        // Gesellschaftliche Faktoren
        gesellschaftlicheAkzeptanz: 2,       // Wachsend aber nicht vollständig
        diskriminierungsrisiko: -3,          // Minority Stress
        sichtbarkeit: 3,                     // Zunehmende Repräsentation

        // Beziehungsdynamik
        beziehungsZufriedenheit: 4,          // Hohe Zufriedenheit bei offenen Paaren
        rollenflexibilitaet: 4               // Weniger starre Geschlechterrollen
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.90,                       // Gut erforscht
        identitaetsstaerke: 0.85,
        communityVerbundenheit: 0.85,
        diskriminierungsrisiko: 0.90,
        beziehungsZufriedenheit: 0.85,
        dataQuality: "high",
        sampleSize: "large",
        methodology: "longitudinal studies and meta-analyses"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Die Qualität homosexueller Liebe ist identisch mit der Qualität jeder anderen Liebe - sie liegt in der Tiefe der Verbindung, der Authentizität des Ausdrucks, der Fürsorge füreinander. Die gesellschaftliche Ablehnung hat nichts mit der inhärenten Qualität zu tun, sondern mit den Begrenzungen derjenigen, die sie nicht verstehen können.",

    osho: "Liebe fragt nicht nach dem Geschlecht des anderen - sie fragt nach der Seele. Wenn zwei Männer oder zwei Frauen sich lieben, ist das derselbe Fluss der Energie, der durch alle Liebenden fließt. Die Gesellschaft hat Regeln gemacht; die Liebe hat sie nie anerkannt. Folge der Liebe, nicht den Regeln."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Orientierung.Homosexuell;
}
