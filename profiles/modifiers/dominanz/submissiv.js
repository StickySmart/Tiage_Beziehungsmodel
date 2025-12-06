/**
 * DOMINANZ MODIFIER: Submissiv
 *
 * Modifikator für submissive Persönlichkeitsausprägung in Beziehungen.
 * Basiert auf Forschung zu BDSM-Dynamiken und Persönlichkeitspsychologie.
 *
 * @module TiageModifiers.Dominanz.Submissiv
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Dominanz = TiageModifiers.Dominanz || {};

TiageModifiers.Dominanz.Submissiv = {

    id: "submissiv",
    label: "Submissiv",
    category: "dominanz",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Hébert, A. & Weaver, A.",
            year: 2015,
            title: "Perks, problems, and the people who play: A qualitative exploration of dominant and submissive BDSM roles",
            journal: "Canadian Journal of Human Sexuality",
            url: "https://utppublishing.com/doi/abs/10.3138/cjhs.2467",
            finding: "Submissive charakterisiert als bereit, Kontrolle abzugeben und mit Wunsch zu gefallen"
        },
        {
            authors: "Brown, L. et al.",
            year: 2025,
            title: "The Link Between Sexual Dominance Preference and Social Behavior",
            journal: "Deviant Behavior",
            url: "https://www.tandfonline.com/doi/full/10.1080/01639625.2025.2557498",
            finding: "Submission im Alltag korreliert mit niedrigerem sozialen Status und weniger Bildung"
        },
        {
            authors: "De Neef, N. et al.",
            year: 2024,
            title: "An Evolutionary Psychological Approach Toward BDSM Interest and Behavior",
            journal: "Archives of Sexual Behavior",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11176219/",
            finding: "75.6% der SM-praktizierenden Frauen bevorzugen submissive Rolle"
        },
        {
            authors: "Wismeijer, A. & van Assen, M.",
            year: 2013,
            title: "Psychological Characteristics of BDSM Practitioners",
            journal: "Journal of Sexual Medicine",
            finding: "Submissive zeigen normale bis positive psychische Gesundheit"
        },
        {
            authors: "Richters, J. et al.",
            year: 2008,
            title: "Demographic and Psychosocial Features of Participants in Bondage and Discipline",
            journal: "Journal of Sexual Medicine",
            finding: "Kein Zusammenhang zwischen BDSM und psychischen Störungen"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren
        hingabe: 5,                         // Kernmerkmal
        vertrauen: 5,                       // Notwendig für Submission
        loslassenKoennen: 5,                // Psychologische Erleichterung
        dienstbereitschaft: 4,              // Wunsch zu gefallen
        anpassungsfaehigkeit: 4,            // Flexibilität

        // Beziehungsdynamik
        komplementaritaetMitDominant: 8,    // Optimale Ergänzung
        komplementaritaetMitSubmissiv: -5,  // Führungsvakuum
        komplementaritaetMitSwitch: 2,      // Flexibel
        komplementaritaetMitAusgeglichen: 2,// Flexibel

        // Herausforderungen
        selbstbehauptung: -2,               // Kann schwieriger sein
        initiativeErgreifen: -2             // Erwartet eher Führung
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.80,                      // Gut erforscht
        hingabe: 0.85,
        vertrauen: 0.80,
        komplementaritaet: 0.90,
        dataQuality: "high",
        sampleSize: "large",
        methodology: "quantitative surveys and qualitative interviews"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Submission ist keine Schwäche, sondern eine Form höchster Qualität - die Qualität des Vertrauens. Der submissive Partner hat den Mut, Kontrolle abzugeben, was paradoxerweise eine enorme innere Stärke erfordert. Es ist die aktive Entscheidung, dem anderen zu vertrauen, nicht die passive Akzeptanz von Machtlosigkeit.",

    osho: "Hingabe ist die höchste Form der Stärke. Nur wer wirklich stark ist, kann sich hingeben. Der Schwache klammert sich an Kontrolle aus Angst; der Starke kann loslassen aus Vertrauen. In der bewussten Submission liegt eine Freiheit, die der Kontrollierende nie kennen wird - die Freiheit vom Ego, die Freiheit des Fließens."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Dominanz.Submissiv;
}
