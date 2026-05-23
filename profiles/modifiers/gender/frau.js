/**
 * GENDER MODIFIER: Frau (v4.0)
 *
 * Modifikator für weibliche Geschlechtsidentität.
 * v4.0: Vereinfacht - keine Cis/Trans Unterscheidung mehr.
 *
 * @module TiageModifiers.Gender.Frau
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.Frau = {

    id: "frau",
    label: "Frau",
    category: "gender",
    version: "4.0",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Brown, L. et al.",
            year: 2024,
            title: "The Relationship between Gender Identity and Gender Centrality",
            journal: "Journal of Homosexuality",
            url: "https://www.tandfonline.com/doi/full/10.1080/00918369.2024.2378737",
            finding: "Frauen zeigen variable Gender-Zentralitätswerte"
        },
        {
            authors: "Saraç, E. et al.",
            year: 2025,
            title: "The Role of Gender Identity in Well-Being and Psychosexual Aspects",
            journal: "Interpersona",
            finding: "Flexible Geschlechtsidentifikation korreliert mit höherem Wohlbefinden"
        },
        {
            authors: "Diamond, L.",
            year: 2020,
            title: "Sexual Fluidity in Males and Females",
            journal: "Current Sexual Health Reports",
            finding: "Frauen zeigen tendenziell höhere sexuelle Fluidität als Männer"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        '#B12': +6,   // Verbundenheit — emotionale Nähe
        '#B9':  +5,   // Gemeinschaft — soziale Einbindung
        '#B10': +5,   // Anerkennung — Wertschätzung
        '#B13': +4,   // Selbsterkenntnis — Selbstreflexion
        '#B6':  -2    // Freiheit — tendenziell geringere Autonomieorientierung
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.85,
        emotionaleIntelligenz: 0.80,
        kommunikationsfaehigkeit: 0.75,
        beziehungsorientierung: 0.80,
        sexuelleFluiditaet: 0.85,
        dataQuality: "high",
        sampleSize: "very large",
        methodology: "meta-analyses and longitudinal studies"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Wahre Qualität in der weiblichen Identität liegt in der Integration von Stärke und Sensibilität, von Autonomie und Verbundenheit.",

    osho: "Die Frau ist näher am Leben selbst. Diese Verbundenheit mit der Schöpfung gibt ihr eine intuitive Weisheit, die der analytische Verstand nicht erreichen kann."
};

// LEGACY: Alias für Rückwärtskompatibilität
TiageModifiers.Gender.FrauCis = TiageModifiers.Gender.Frau;

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.Frau;
}
