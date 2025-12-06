/**
 * DOMINANZ MODIFIER: Dominant
 *
 * Modifikator für dominante Persönlichkeitsausprägung in Beziehungen.
 * Basiert auf Forschung zu BDSM-Dynamiken und Persönlichkeitspsychologie.
 *
 * @module TiageModifiers.Dominanz.Dominant
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Dominanz = TiageModifiers.Dominanz || {};

TiageModifiers.Dominanz.Dominant = {

    id: "dominant",
    label: "Dominant",
    category: "dominanz",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Wismeijer, A. & van Assen, M.",
            year: 2013,
            title: "Psychological Characteristics of BDSM Practitioners",
            journal: "Journal of Sexual Medicine",
            finding: "BDSM-Praktizierende zeigen höhere psychische Gesundheit als Kontrollgruppe"
        },
        {
            authors: "Hébert, A. & Weaver, A.",
            year: 2015,
            title: "Perks, problems, and the people who play: A qualitative exploration of dominant and submissive BDSM roles",
            journal: "Canadian Journal of Human Sexuality",
            url: "https://utppublishing.com/doi/abs/10.3138/cjhs.2467",
            finding: "Dominante werden als empathisch, fürsorglich und verantwortungsvoll beschrieben"
        },
        {
            authors: "Brown, L. et al.",
            year: 2025,
            title: "The Link Between Sexual Dominance Preference and Social Behavior in BDSM Sex Practitioners",
            journal: "Deviant Behavior",
            url: "https://www.tandfonline.com/doi/full/10.1080/01639625.2025.2557498",
            finding: "55% der Doms erleben bevorzugte Polarität auch außerhalb von Sex"
        },
        {
            authors: "De Neef, N. et al.",
            year: 2024,
            title: "An Evolutionary Psychological Approach Toward BDSM Interest and Behavior",
            journal: "Archives of Sexual Behavior",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11176219/",
            finding: "Geschlechtsspezifische Rollenverteilung: 48.3% der SM-praktizierenden Männer bevorzugen dominant"
        },
        {
            authors: "Connolly, P.",
            year: 2006,
            title: "Psychological Functioning of Bondage/Domination/Sado-Masochism Practitioners",
            journal: "Journal of Psychology & Human Sexuality",
            finding: "BDSM-Praktizierende zeigen normale bis überdurchschnittliche psychische Funktionsfähigkeit"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren
        fuehrungskompetenz: 5,              // Kernmerkmal
        verantwortungsbewusstsein: 4,       // Für Partner sorgen
        entscheidungsfreude: 5,             // Klare Entscheidungen
        empathie: 3,                        // Wider Erwarten hoch (Forschung)
        strukturgebung: 4,                  // Klare Rahmen setzen

        // Beziehungsdynamik
        komplementaritaetMitSubmissiv: 8,   // Optimale Ergänzung
        komplementaritaetMitDominant: -5,   // Machtkampf-Risiko
        komplementaritaetMitSwitch: 2,      // Flexibel
        komplementaritaetMitAusgeglichen: 2,// Flexibel

        // Herausforderungen
        kontrollbedarf: -2,                 // Kann zu rigide werden
        kompromissbereitschaft: -1          // Schwieriger bei Gleichrangigen
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.80,                      // Gut erforscht
        fuehrungskompetenz: 0.85,
        empathie: 0.75,
        komplementaritaet: 0.90,
        dataQuality: "high",
        sampleSize: "large",
        methodology: "quantitative surveys and qualitative interviews"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Wahre Dominanz ist nicht die Ausübung von Macht über andere, sondern die Übernahme von Verantwortung für das Ganze. Der dominante Partner in einer Beziehung trägt die Last der Entscheidungen - nicht weil er überlegen ist, sondern weil diese Rollenverteilung für beide Seiten Qualität erzeugt. Die höchste Form der Dominanz ist die des Dienens durch Führen.",

    osho: "Dominanz und Unterwerfung sind ein Tanz, kein Kampf. Der wahre Dom ist nicht derjenige, der nimmt, sondern derjenige, der hält. Er schafft den Raum, in dem der andere loslassen kann. Das ist keine Macht über jemanden - es ist die Macht, einen sicheren Raum zu erschaffen. Echte Stärke zeigt sich in der Fähigkeit, sanft zu sein."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Dominanz.Dominant;
}
