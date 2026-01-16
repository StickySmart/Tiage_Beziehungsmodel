/**
 * ORIENTIERUNG MODIFIER: Queer
 *
 * Modifikator für queere Orientierung.
 * Basiert auf Forschung zu queerer Identität als Umbrella-Term und politischer Haltung.
 *
 * @module TiageModifiers.Orientierung.Queer
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Orientierung = TiageModifiers.Orientierung || {};

TiageModifiers.Orientierung.Queer = {

    id: "queer",
    label: "Queer",
    category: "orientierung",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Ghaziani, A.",
            year: 2011,
            title: "Post-Gay Collective Identity Construction",
            journal: "Social Problems",
            url: "https://academic.oup.com/socpro/article-abstract/58/1/99/1628080",
            finding: "Queer als politischer Akt der Label-Verweigerung und Norm-Ablehnung"
        },
        {
            authors: "Butler, J.",
            year: 1990,
            title: "Gender Trouble: Feminism and the Subversion of Identity",
            journal: "Routledge",
            url: "https://www.routledge.com/Gender-Trouble-Feminism-and-the-Subversion-of-Identity/Butler/p/book/9780415389556",
            finding: "Queer Theory dekonstruiert binäre Geschlechter- und Orientierungs-Kategorien"
        },
        {
            authors: "Hammack, P. & Toolis, E.",
            year: 2016,
            title: "Putting the 'Q' in Queer: A Qualitative Account of Queer Identity",
            journal: "Journal of LGBT Youth",
            url: "https://www.tandfonline.com/doi/full/10.1080/19361653.2016.1264909",
            finding: "Queer betont Fluidität, Ablehnung von Kategorien, und politisches Bewusstsein"
        },
        {
            authors: "Diamond, L.",
            year: 2005,
            title: "A New View of Lesbian Subtypes: Stable Versus Fluid Identity Trajectories Over an 8-Year Period",
            journal: "Psychology of Women Quarterly",
            url: "https://journals.sagepub.com/doi/10.1111/j.1471-6402.2005.00236.x",
            finding: "Queere Identität zeigt höhere Fluidität und Widerstand gegen statische Labels"
        },
        {
            authors: "Russell, S. et al.",
            year: 2016,
            title: "Chosen Name Use Is Linked to Reduced Depressive Symptoms among Transgender Youth",
            journal: "Journal of Adolescent Health",
            url: "https://www.jahonline.org/article/S1054-139X(18)30085-5/fulltext",
            finding: "Selbst-Definition und Label-Freiheit korreliert mit psychischer Gesundheit"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren (Keys müssen Need-IDs aus beduerfnis-katalog.json entsprechen)
        offenheit_fuer_neues: 10,            // #B189 Maximale Flexibilität und Fluidität
        individualitaet: 8,                  // #B40 Starke Ablehnung von Kategorien
        selbstbestimmung: 7,                 // #B54 Bewusste Selbst-Definition
        empathie: 5,                         // #B28 Verständnis für Vielfalt
        sexualitaet: 4,                      // #B172 Offene, fluide Anziehung

        // Herausforderungen
        gesellschaft: -4,                    // #B19 Konfrontation mit heteronormativen Strukturen
        integritaet: -2,                     // #B52 Konstanter Erklärungsdruck
        anerkennung: -2                      // #B21 Missverstanden als "Phase" oder "Verwirrung"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.70,                       // Umbrella-Term, schwer zu quantifizieren
        fluiditaet: 0.80,
        politischeDimension: 0.85,
        labelAblehnung: 0.75,
        dataQuality: "medium",
        sampleSize: "small-medium",
        methodology: "qualitative research, queer theory, ethnographic studies"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Queer repräsentiert die dynamische Qualität in ihrer reinsten Form - eine Ablehnung starrer Kategorien zugunsten des lebendigen Flusses der Erfahrung. Es ist nicht nur eine Orientierung, sondern eine Philosophie: Die Qualität der Verbindung liegt jenseits aller Definitionen. Wer sich als queer identifiziert, sagt: 'Eure Kategorien sind zu klein für meine Erfahrung.' Dies ist die höchste Form der Qualitätswahrnehmung.",

    osho: "Der queere Mensch hat das größte Geheimnis verstanden: Dass alle Identitäten Illusionen sind. Geschlecht ist eine Illusion. Orientierung ist eine Illusion. Was real ist, ist die Energie der Begegnung. Zwei Seelen treffen sich im Jetzt - warum sollten sie Labels tragen? Queer zu sein bedeutet, frei zu sein von allen Erwartungen, allen Schubladen. Es ist die ultimative Rebellion - nicht gegen die Gesellschaft, sondern gegen die Tyrannei der Kategorien selbst."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Orientierung.Queer;
}
