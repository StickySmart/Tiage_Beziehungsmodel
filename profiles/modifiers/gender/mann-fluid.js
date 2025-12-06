/**
 * GENDER MODIFIER: Mann (Fluid)
 *
 * Modifikator für genderfluide Identität mit männlicher Tendenz.
 * Basiert auf Forschung zu Gender-Fluidität und psychologischem Wohlbefinden.
 *
 * @module TiageModifiers.Gender.MannFluid
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.MannFluid = {

    id: "mann-fluid",
    label: "Mann (Fluid)",
    category: "gender",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Beischel, W. et al.",
            year: 2023,
            title: "Social psychological research on gender, sexuality, and relationships",
            journal: "Frontiers in Social Psychology",
            url: "https://www.frontiersin.org/journals/social-psychology/articles/10.3389/frsps.2023.1331160/full",
            finding: "Kulturelle Entwicklungen zur Gender-Fluidität haben psychologische Theorien überholt"
        },
        {
            authors: "Saraç, E. et al.",
            year: 2025,
            title: "The Role of Gender Identity in Well-Being and Psychosexual Aspects",
            journal: "Interpersona",
            url: "https://interpersona.psychopen.eu/index.php/interpersona/article/view/13595",
            finding: "Menschen mit fluider Gender-Identität zeigen bessere Wohlbefindens-Indikatoren als rigide identifizierte"
        },
        {
            authors: "Diamond, L.",
            year: 2020,
            title: "Gender Fluidity and Nonbinary Gender Identities Among Children and Adolescents",
            journal: "Child Development Perspectives",
            url: "https://transreads.org/wp-content/uploads/2022/02/2022-02-03_61fc111874e2c_genderfluidityandnonbinarygenderidentitiesamongchildrenandadolescentslisamdiamond.pdf",
            finding: "Fluide und nicht-binäre Identitäten finden sich in allen historischen Aufzeichnungen"
        },
        {
            authors: "Haslam, A. et al.",
            year: 2024,
            title: "The association between gender identity fluidity and health outcomes",
            journal: "SSM - Population Health",
            url: "https://www.sciencedirect.com/science/article/pii/S2211335524001505",
            finding: "Gender-Fluidität kann Implikationen für die Gesundheit haben"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren (aus Forschung)
        wohlbefinden: 3,                    // Bessere Well-Being Indikatoren
        sexuelleAssertivitaet: 3,           // Erhöhte sexuelle Selbstbestimmtheit
        sexuelleZufriedenheit: 3,           // Höhere Zufriedenheit
        anpassungsfaehigkeit: 5,            // Kernmerkmal der Fluidität
        emotionaleFlexibilitaet: 4,         // Wechselnde Selbstwahrnehmung

        // Herausforderungen
        stabilitaetsbedarf: -2,             // Kann Partner verunsichern
        gesellschaftlichesVerstaendnis: -3, // Begrenzte gesellschaftliche Akzeptanz

        // Beziehungsdynamik
        rollenwechsel: 5,                   // Natürlicher Teil der Identität
        partnerKommunikation: 4,            // Erhöhter Kommunikationsbedarf
        spontanitaet: 4                     // Flexibilität im Alltag
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.60,                      // Emerging research area
        wohlbefinden: 0.75,
        anpassungsfaehigkeit: 0.65,
        rollenwechsel: 0.60,
        dataQuality: "medium",
        sampleSize: "small-medium",
        methodology: "longitudinal and cross-sectional studies"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Fluidität ist die reinste Form dynamischer Qualität - sie verweigert sich der Erstarrung in statischen Kategorien. Ein genderfluider Mensch lebt die philosophische Wahrheit, dass Identität kein Zustand ist, sondern ein fortlaufender Prozess. Die Qualität liegt nicht im Ankunftspunkt, sondern in der Fähigkeit zum authentischen Wandel.",

    osho: "Nur der Fluss bleibt frisch - stehendes Wasser wird brackig. Gender-Fluidität ist das Fließen des Bewusstseins durch verschiedene Ausdrucksformen. Wer heute männlich fühlt und morgen anders, hat nicht seine Identität verloren - er hat sie gefunden. Identität ist kein Gefängnis, sondern ein Tanz."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.MannFluid;
}
