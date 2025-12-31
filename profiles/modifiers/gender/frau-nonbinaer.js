/**
 * GENDER MODIFIER: Frau (Nonbinär)
 *
 * Modifikator für Personen mit weiblichem Körper und nonbinärer Identität.
 * Basiert auf Forschung zu nonbinärer Identität bei AFAB-Personen.
 *
 * @module TiageModifiers.Gender.FrauNonbinaer
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.FrauNonbinaer = {

    id: "frau-nonbinaer",
    label: "Frau (Nonbinär)",
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
            finding: "65% der non-binary Personen sind AFAB (assigned female at birth)"
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
            authors: "Losty, M. & O'Connor, J.",
            year: 2018,
            title: "Falling outside of the 'Nice Little Binary Box': a Psychoanalytic Exploration of the Non-Binary Gender Identity",
            journal: "Psychoanalytic Psychotherapy",
            url: "https://www.tandfonline.com/doi/abs/10.1080/02668734.2017.1384933",
            finding: "AFAB nonbinäre Personen navigieren zwischen weiblicher Sozialisation und nonbinärer Identität"
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
            authors: "Twist, J. & de Graaf, N.",
            year: 2019,
            title: "Gender Diversity and Non-Binary Presentations in Young People",
            journal: "Archives of Sexual Behavior",
            finding: "AFAB nonbinäre Personen haben oft höhere Sichtbarkeit in queeren Communities"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren (Keys müssen Need-IDs aus beduerfnis-katalog.json entsprechen)
        authentizitaet: 5,                  // #B50 Eigener Weg jenseits binärer Normen
        wachstum_und_sinn: 4,               // #B61 Persönliche Entwicklung
        gemeinschaft: 4,                    // #B41 Oft stärkere Community-Anbindung
        kommunikation: 4,                   // #B40 Bedarf an Kommunikation über Identität

        // Herausforderungen
        gesellschaft: -2,                   // #B19 Gesellschaftliche Herausforderungen (oft besser als AMAB-NB)
        stabilitaet_und_sicherheit: -2,     // #B11 Zusätzliche psychische Belastung
        rollenausdruck: -2                  // #B55 Navigation zwischen Sozialisation und Identität
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.60,                      // Mehr Forschung zu AFAB-NB als AMAB-NB
        authentizitaet: 0.80,
        gemeinschaftsanbindung: 0.75,
        gesellschaftlicheHerausforderungen: 0.70,
        beziehungsdynamik: 0.65,
        dataQuality: "medium",
        sampleSize: "moderate",
        methodology: "survey research and qualitative studies"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Der weibliche Körper wurde von der Gesellschaft mit Erwartungen beladen, doch die Seele erkennt: Diese Kategorien sind menschengemacht, nicht naturgemacht. Wahre Qualität liegt nicht in der Konformität mit dem Zugewiesenen, sondern im authentischen Ausdruck dessen, was jenseits aller Zuschreibungen existiert. Dies ist der Weg der dynamischen Qualität.",

    osho: "Du hast einen weiblichen Körper, aber deine Seele weigert sich, in der Box zu bleiben, die die Gesellschaft 'Frau' nennt. Das ist kein Defekt - das ist Erwachen. Die Seele kennt keine Geschlechter, sie kennt nur Sein. Du bist der Beweis, dass Bewusstsein freier ist als jede Körperlichkeit."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.FrauNonbinaer;
}
