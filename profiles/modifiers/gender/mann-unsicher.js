/**
 * GENDER MODIFIER: Mann (Unsicher/Questioning)
 *
 * Modifikator für Menschen mit männlicher Tendenz, die ihre Gender-Identität hinterfragen.
 * Basiert auf Forschung zu Gender-Exploration und Identitätsentwicklung.
 *
 * @module TiageModifiers.Gender.MannUnsicher
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.MannUnsicher = {

    id: "mann-unsicher",
    label: "Mann (Unsicher/Questioning)",
    category: "gender",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Katz-Wise, S. et al.",
            year: 2020,
            title: "Gender identity and sexuality development in transgender and gender diverse young adults",
            journal: "PMC",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC6982571/",
            finding: "Gender-Exploration ist ein normaler Entwicklungsprozess"
        },
        {
            authors: "Twist, J. & de Graaf, N.",
            year: 2020,
            title: "The phenomenology of gender dysphoria in adults",
            journal: "Clinical Psychology Review",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7441311/",
            finding: "Signifikante psychologische Belastung während der Identitätsexploration"
        },
        {
            authors: "Budge, S. et al.",
            year: 2021,
            title: "Experiences and Perceptions of Trans and Gender Non-Binary People",
            journal: "International Journal of Transgender Health",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8036290/",
            finding: "Fehlende Unterstützung wirkt als Barriere für Gender-Exploration"
        },
        {
            authors: "Levitt, H. & Ippolito, M.",
            year: 2022,
            title: "Transgender identity: Development, management and affirmation",
            journal: "Current Opinion in Psychology",
            url: "https://www.sciencedirect.com/science/article/pii/S2352250X22001889",
            finding: "Unterstützende Umgebungen ermöglichen sichere Identitätsexploration"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren
        selbstreflexion: 5,                 // Intensive Selbstbefragung
        offenheitFuerWachstum: 4,           // Bereitschaft zur Entwicklung
        ehrlichkeit: 4,                     // Anerkennung der Unsicherheit

        // Herausforderungen
        identitaetsStabilitaet: -4,         // Per Definition unsicher
        zukunftsplanung: -3,                // Ungewissheit über Entwicklung
        psychischeBelastung: -3,            // Erhöhte Angst und Depression während Exploration

        // Beziehungsdynamik
        partnerGeduld: -2,                  // Erfordert geduldigen Partner
        kommunikationsbedarf: 4,            // Hoher Bedarf an Austausch
        unterstuetzungsbedarf: 5,           // Wichtigkeit von Akzeptanz
        entwicklungspotential: 5            // Raum für Wachstum
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.55,                      // Schwer zu erforschen (Übergangsphase)
        selbstreflexion: 0.80,
        psychischeBelastung: 0.85,
        entwicklungspotential: 0.50,        // Individuell sehr unterschiedlich
        dataQuality: "medium",
        sampleSize: "small",
        methodology: "qualitative studies and clinical observations",
        note: "Questioning-Phase ist temporär - Werte können sich stark ändern"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Die Unsicherheit ist kein Mangel an Qualität, sondern deren Vorbedingung. Bevor neue Qualität entstehen kann, muss die alte in Frage gestellt werden. Der Mensch, der sein Geschlecht hinterfragt, befindet sich in diesem fruchtbaren Zwischenraum - nicht mehr im Alten, noch nicht im Neuen. Dies ist der Ort, an dem echte Erkenntnis möglich wird.",

    osho: "Zweifel ist der Beginn der Weisheit, nicht ihr Ende. Wer seine Identität hinterfragt, zeigt mehr Mut als jene, die nie eine Frage gestellt haben. Die Gesellschaft liebt Gewissheiten, aber das Leben ist ein Mysterium. In der ehrlichen Unsicherheit liegt mehr Wahrheit als in der falschen Sicherheit der Konformität."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.MannUnsicher;
}
