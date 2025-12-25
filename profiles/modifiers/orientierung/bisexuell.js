/**
 * ORIENTIERUNG MODIFIER: Bisexuell
 *
 * Modifikator für bisexuelle Orientierung.
 * Basiert auf Forschung zu Bisexualität und Beziehungspsychologie.
 *
 * @module TiageModifiers.Orientierung.Bisexuell
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Orientierung = TiageModifiers.Orientierung || {};

TiageModifiers.Orientierung.Bisexuell = {

    id: "bisexuell",
    label: "Bisexuell",
    category: "orientierung",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Morgenroth, T. & Ryan, M.",
            year: 2022,
            title: "Bisexual erasure: Perceived attraction patterns of bisexual women and men",
            journal: "European Journal of Social Psychology",
            url: "https://onlinelibrary.wiley.com/doi/10.1002/ejsp.2773",
            finding: "Bisexuelle erleben Identitätsleugnung - Männer als 'eigentlich schwul', Frauen anders"
        },
        {
            authors: "Feinstein, B. et al.",
            year: 2018,
            title: "Bisexual desires for more than one gender as a challenge to normative relationship ideals",
            journal: "Psychology & Sexuality",
            url: "https://www.tandfonline.com/doi/full/10.1080/19419899.2018.1441896",
            finding: "Bisexualität stellt monogame Normen explizit in Frage"
        },
        {
            authors: "Savin-Williams, R.",
            year: 2023,
            title: "Decades-long study illustrates bisexuality boom",
            journal: "British Psychological Society",
            url: "https://www.bps.org.uk/research-digest/decades-long-study-illustrates-bisexuality-boom",
            finding: "Dreifacher Anstieg bisexueller Identifikation zwischen 1989-2018"
        },
        {
            authors: "Rodriguez-Rust, P.",
            year: 2017,
            title: "How Do Bisexual People See Themselves?",
            journal: "Society for Personality and Social Psychology",
            url: "https://spsp.org/news-center/character-context-blog/how-do-bisexual-people-see-themselves",
            finding: "Implizite Identität Bisexueller liegt zwischen heterosexuell und homosexuell"
        },
        {
            authors: "The Trevor Project",
            year: 2022,
            title: "Understanding Bisexuality",
            journal: "The Trevor Project",
            url: "https://www.thetrevorproject.org/resources/article/understanding-bisexuality/",
            finding: "Nur 28% der Bisexuellen sind offen, verglichen mit 77% der schwulen Männer"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren (Keys müssen Need-IDs aus beduerfnis-katalog.json entsprechen)
        offenheit_fuer_neues: 5,             // #B189 Anziehungsflexibilität & Vielfalt
        sexualitaet: 5,                      // #B172 Breiteres Spektrum
        empathie: 4,                         // #B28 Verständnis für verschiedene Orientierungen

        // Herausforderungen
        gesellschaft: -3,                    // #B19 Bi-Erasure & Außenseiterrolle
        integritaet: -2                      // #B52 Identitätsdruck durch Umfeld
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.80,                       // Wachsende Forschung
        anziehungsflexibilitaet: 0.90,
        biErasure: 0.85,
        doppelteAussenseiterrolle: 0.80,
        dataQuality: "medium-high",
        sampleSize: "medium-large",
        methodology: "survey research, longitudinal studies, qualitative interviews"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Bisexualität repräsentiert eine Form der Qualität, die sich der binären Kategorisierung widersetzt. Sie zeigt, dass sexuelle Anziehung ein Spektrum ist, nicht zwei getrennte Pole. Die Qualität der Verbindung hängt nicht vom Geschlecht des Partners ab, sondern von der Tiefe der Beziehung selbst. Dies ist keine Unentschlossenheit, sondern eine reichere Form der Qualitätswahrnehmung.",

    osho: "Der bisexuelle Mensch hat verstanden, was die meisten übersehen: Anziehung ist Energie, und Energie kennt keine Geschlechter. Sie fließt dorthin, wo Resonanz entsteht. Sich auf beide Geschlechter einlassen zu können, ist nicht Promiskuität - es ist die Fähigkeit, die Seele zu sehen, bevor man das Geschlecht sieht."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Orientierung.Bisexuell;
}
