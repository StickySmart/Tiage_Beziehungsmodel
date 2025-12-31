/**
 * GENDER MODIFIER: Mann (Nonbinär)
 *
 * Modifikator für Personen mit männlichem Körper und nonbinärer Identität.
 * Basiert auf Forschung zu nonbinärer Identität bei AMAB-Personen.
 *
 * @module TiageModifiers.Gender.MannNonbinaer
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.MannNonbinaer = {

    id: "mann-nonbinaer",
    label: "Mann (Nonbinär)",
    category: "gender",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "James, S. E. et al.",
            year: 2016,
            title: "The Report of the 2015 U.S. Transgender Survey",
            journal: "National Center for Transgender Equality",
            url: "https://transequality.org/sites/default/files/docs/usts/USTS-Full-Report-Dec17.pdf",
            finding: "35% der non-binary Personen sind AMAB (assigned male at birth)"
        },
        {
            authors: "Richards, C. et al.",
            year: 2016,
            title: "Non-binary or genderqueer genders",
            journal: "International Review of Psychiatry",
            url: "https://www.tandfonline.com/doi/full/10.3109/09540261.2015.1106446",
            finding: "Nonbinäre Identitäten sind eigenständig und nicht pathologisch"
        },
        {
            authors: "Darwin, H.",
            year: 2020,
            title: "Challenging the Cisgender/Transgender Binary: Nonbinary People and the Transgender Label",
            journal: "Gender & Society",
            url: "https://journals.sagepub.com/doi/full/10.1177/0891243220912256",
            finding: "AMAB nonbinäre Personen erleben spezifische Herausforderungen bei gesellschaftlicher Akzeptanz"
        },
        {
            authors: "Matsuno, E. & Budge, S.",
            year: 2017,
            title: "Non-binary/Genderqueer Identities: a Critical Review of the Literature",
            journal: "Current Sexual Health Reports",
            url: "https://link.springer.com/article/10.1007/s11930-017-0111-8",
            finding: "Authentizität und Selbstakzeptanz sind zentral für psychisches Wohlbefinden"
        },
        {
            authors: "Vincent, B.",
            year: 2019,
            title: "Breaking Down Barriers: Non-Binary People and Healthcare",
            journal: "Policy Press",
            finding: "Nonbinäre Personen mit männlichem Körper erleben oft doppelte Stigmatisierung"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren (Keys müssen Need-IDs aus beduerfnis-katalog.json entsprechen)
        authentizitaet: 5,                  // #B50 Eigener Weg jenseits binärer Normen
        wachstum_und_sinn: 4,               // #B61 Persönliche Entwicklung
        selbstbestimmung_und_unabhaengigkeit: 4, // #B34 Autonomie in Identitätsausdruck
        kommunikation: 4,                   // #B40 Bedarf an Kommunikation über Identität

        // Herausforderungen
        gesellschaft: -3,                   // #B19 Gesellschaftliche Sichtbarkeit als AMAB-NB
        stabilitaet_und_sicherheit: -2,     // #B11 Zusätzliche psychische Belastung
        vertrauen_schenken: -2              // #B83 Erfahrungen mit Ablehnung können Vertrauen beeinflussen
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.55,                      // Wachsende aber begrenzte Forschung spezifisch zu AMAB-NB
        authentizitaet: 0.80,
        gesellschaftlicheHerausforderungen: 0.75,
        psychischeBelastung: 0.70,
        beziehungsdynamik: 0.60,
        dataQuality: "medium",
        sampleSize: "small",
        methodology: "survey research and qualitative studies"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Hier zeigt sich dynamische Qualität in ihrer reinsten Form: Der Körper folgt einer biologischen Linie, doch die Seele transzendiert die vorgegebenen Kategorien. Dies ist kein Widerspruch, sondern eine höhere Synthese - die Erkenntnis, dass wahre Qualität nicht in Entweder-Oder-Kategorien gefangen ist, sondern im Sowohl-Als-Auch erblüht.",

    osho: "Die Gesellschaft hat dir einen männlichen Körper gegeben und erwartet, dass deine Seele diesem Körper gehorcht. Doch die Seele kennt keine solchen Grenzen. Du bist der lebende Beweis, dass Bewusstsein größer ist als jede Kategorie. In dir vereinigt sich, was die Gesellschaft zu trennen versucht - und genau das macht dich ganz."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.MannNonbinaer;
}
