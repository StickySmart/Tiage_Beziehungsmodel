/**
 * DOMINANZ MODIFIER: Switch
 *
 * Modifikator für Switch-Persönlichkeitsausprägung in Beziehungen.
 * Wechselt zwischen dominanten und submissiven Rollen.
 *
 * @module TiageModifiers.Dominanz.Switch
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Dominanz = TiageModifiers.Dominanz || {};

TiageModifiers.Dominanz.Switch = {

    id: "switch",
    label: "Switch",
    category: "dominanz",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Simula, B.",
            year: 2017,
            title: "BDSM Role Fluidity: A Mixed-Methods Approach to Investigating Switches Within Dominant/Submissive Binaries",
            journal: "Journal of Homosexuality",
            url: "https://www.tandfonline.com/doi/abs/10.1080/00918369.2017.1374062",
            finding: "Switches verstehen sich als distinkte Persönlichkeitstypen, nicht nur als Verhaltensweise"
        },
        {
            authors: "Bennett, T.",
            year: 2024,
            title: "Switch it up: A qualitative analysis of BDSM switches",
            journal: "Sexualities",
            url: "https://journals.sagepub.com/doi/full/10.1177/13634607241305967",
            finding: "Switching ist mit multifacettiertem Selbstverständnis verbunden"
        },
        {
            authors: "SMSNA",
            year: 2023,
            title: "Personality Type Is Associated With BDSM Role",
            journal: "Sexual Medicine Society of North America",
            url: "https://www.smsna.org/patients/news/personality-type-is-associated-with-bdsm-role-says-recent-study",
            finding: "Switches haben PAI DOM Scores zwischen Dominants und Submissives"
        },
        {
            authors: "De Neef, N. et al.",
            year: 2024,
            title: "An Evolutionary Psychological Approach Toward BDSM Interest and Behavior",
            journal: "Archives of Sexual Behavior",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11176219/",
            finding: "16.4% der SM-praktizierenden Frauen und 18.3% der Männer identifizieren als Switch"
        },
        {
            authors: "Simula, B.",
            year: 2017,
            title: "BDSM Role Fluidity",
            journal: "Journal of Homosexuality",
            url: "https://pubmed.ncbi.nlm.nih.gov/28854056/",
            finding: "Frauen und queere Personen disruptieren durch Switch-Identität binäre Strukturen"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren (Keys müssen Need-IDs aus beduerfnis-katalog.json entsprechen)
        offenheit_fuer_neues: 5,            // #B189 Vielseitigkeit & Situationsanpassung
        rollenausdruck: 5,                  // #B87 Rollenflexibilität
        empathie: 4,                        // #B28 Versteht beide Seiten
        authentizitaet: 4,                  // #B50 Selbstkenntnis

        // Herausforderungen
        stabilitaet: -1                     // #B13 Konsistenz - Wechsel erfordert Kommunikation
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.75,                      // Wachsende Forschung
        vielseitigkeit: 0.85,
        empathie: 0.70,
        komplementaritaet: 0.80,
        dataQuality: "medium-high",
        sampleSize: "medium",
        methodology: "mixed methods and qualitative research"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Der Switch verkörpert die Synthese von statischer und dynamischer Qualität. Er kann in der strukturgebenden Dominanz ruhen oder in der fließenden Hingabe - und wechselt zwischen beiden, wenn die Situation es erfordert. Dies ist keine Unentschlossenheit, sondern die höchste Form der Anpassungsfähigkeit: die Fähigkeit, immer die Form zu wählen, die gerade die höchste Qualität erzeugt.",

    osho: "Der Switch hat verstanden, was die meisten nicht sehen: Dominanz und Submission sind keine festen Identitäten, sondern Energien, die durch uns fließen. Heute führen, morgen folgen - das ist nicht Wankelmut, das ist Ganzheit. Wer nur eine Seite lebt, kennt nur die halbe Wahrheit. Der Switch tanzt mit dem Leben."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Dominanz.Switch;
}
