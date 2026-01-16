/**
 * ORIENTIERUNG MODIFIER: Pansexuell
 *
 * Modifikator für pansexuelle Orientierung.
 * Basiert auf Forschung zu Pansexualität und geschlechtsunabhängiger Anziehung.
 *
 * @module TiageModifiers.Orientierung.Pansexuell
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Orientierung = TiageModifiers.Orientierung || {};

TiageModifiers.Orientierung.Pansexuell = {

    id: "pansexuell",
    label: "Pansexuell",
    category: "orientierung",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Flanders, C. et al.",
            year: 2017,
            title: "Defining Bisexuality: Young People's Voices and Hypothetical 'Bisexual Behaviors'",
            journal: "Journal of Bisexuality",
            url: "https://www.tandfonline.com/doi/full/10.1080/15299716.2017.1342214",
            finding: "Pansexualität betont geschlechtsunabhängige Anziehung - Person vor Geschlecht"
        },
        {
            authors: "Belous, C. & Bauman, M.",
            year: 2017,
            title: "What's in a Name? Exploring Pansexuality Online",
            journal: "Journal of Bisexuality",
            url: "https://www.tandfonline.com/doi/full/10.1080/15299716.2017.1400186",
            finding: "Pansexuelle betonen Offenheit gegenüber allen Geschlechtern und Gender-Identitäten"
        },
        {
            authors: "Morandini, J. et al.",
            year: 2017,
            title: "Bisexuals' and pansexuals' attraction to different gender groups",
            journal: "Archives of Sexual Behavior",
            url: "https://link.springer.com/article/10.1007/s10508-017-0975-0",
            finding: "Pansexuelle zeigen stärkere Anziehung zu nonbinären Personen als Bisexuelle"
        },
        {
            authors: "Rice, C. et al.",
            year: 2015,
            title: "A Mixed-Methods Exploration of Signs, Symbols, and Significances of Sexual Orientation and Gender Identity",
            journal: "Journal of Homosexuality",
            url: "https://www.tandfonline.com/doi/full/10.1080/00918369.2015.1091811",
            finding: "Pansexualität wird als politisch progressiver und inklusiver wahrgenommen"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren (Keys müssen Need-IDs aus beduerfnis-katalog.json entsprechen)
        offenheit_fuer_neues: 8,             // #B189 Maximale Anziehungsflexibilität
        sexualitaet: 6,                      // #B172 Geschlechtsunabhängige Anziehung
        empathie: 6,                         // #B28 Tiefes Verständnis für Vielfalt
        individualitaet: 5,                  // #B40 Person vor Kategorie

        // Herausforderungen (geringer als bei Bisexuellen)
        gesellschaft: -2,                    // #B19 Weniger Bi-Erasure, aber Erklärungsbedarf
        integritaet: -1                      // #B52 Selbst-Definition außerhalb binärer Normen
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.75,                       // Neuere Forschung, kleinere Samples
        geschlechtsunabhaengigkeit: 0.85,
        inklusivitaet: 0.80,
        politischeBedeutung: 0.75,
        dataQuality: "medium",
        sampleSize: "small-medium",
        methodology: "survey research, qualitative interviews, online studies"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Pansexualität repräsentiert eine Form der Qualität, die jenseits von Kategorien existiert. Sie sieht nicht Mann oder Frau, sondern die Qualität des Seins selbst. Dies ist nicht Gleichgültigkeit gegenüber Geschlecht, sondern die Erkenntnis, dass Qualität nicht durch Geschlechtergrenzen eingeschränkt wird. Die tiefste Form der Verbindung entsteht aus Resonanz, nicht aus Kategorien.",

    osho: "Der pansexuelle Mensch hat die ultimative Wahrheit über Anziehung erkannt: Es gibt keine Grenzen in der Liebe. Geschlecht ist eine gesellschaftliche Erfindung - Energie ist geschlechtslos. Wenn du eine Seele triffst, die mit deiner resoniert, warum solltest du nach ihrem Körper fragen? Die Liebe kennt nur eine Frage: Schwingt deine Seele mit meiner? Alles andere ist irrelevant."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Orientierung.Pansexuell;
}
