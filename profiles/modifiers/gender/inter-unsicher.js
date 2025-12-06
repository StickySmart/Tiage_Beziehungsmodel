/**
 * GENDER MODIFIER: Inter (Unsicher/Questioning)
 *
 * Modifikator für intergeschlechtliche Personen, die ihre Gender-Identität hinterfragen.
 * Basiert auf Forschung zu Intersex-Identität und Identitätsexploration.
 *
 * @module TiageModifiers.Gender.InterUnsicher
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.InterUnsicher = {

    id: "inter-unsicher",
    label: "Inter (Unsicher/Questioning)",
    category: "gender",

    // ═══════════════════════════════════════════════════════════════════════
    // WISSENSCHAFTLICHE QUELLEN
    // ═══════════════════════════════════════════════════════════════════════

    sources: [
        {
            authors: "Meyer-Bahlburg, H. et al.",
            year: 1998,
            title: "Long-term psychological evaluation of intersex children",
            journal: "Pediatrics",
            url: "https://pubmed.ncbi.nlm.nih.gov/9562897/",
            finding: "8.5-20% der intersex Personen erleben Gender-Dysphorie"
        },
        {
            authors: "Kreukels, B. et al.",
            year: 2024,
            title: "A Life Course Perspective on the Sexual Development of Young Intersex People",
            journal: "Archives of Sexual Behavior",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10815015/",
            finding: "Unsicherheit über Gender während der Adoleszenz besonders verbreitet"
        },
        {
            authors: "Rosenwohl-Mack, A. et al.",
            year: 2020,
            title: "A national study on the physical and mental health of intersex adults in the U.S.",
            journal: "PLoS ONE",
            url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC7546494/",
            finding: "Höhere Raten von Suizidversuchen (vergleichbar mit Transgender-Population)"
        },
        {
            authors: "Mental Health America",
            year: 2021,
            title: "Intersex identities and mental health",
            journal: "MHA",
            url: "https://mhanational.org/resources/intersex-identities-and-mental-health/",
            finding: "Nicht-konsensuelle Chirurgie erhöht psychische Belastung"
        },
        {
            authors: "The Trevor Project",
            year: 2021,
            title: "Experiences and Mental Health Outcomes among Intersex LGBTQ+ Young People",
            journal: "The Trevor Project",
            url: "https://www.thetrevorproject.org/research-briefs/experiences-and-mental-health-outcomes-among-intersex-lgbtq-young-people/",
            finding: "Operationen zur 'Normalisierung' erhöhen Suizidversuche"
        }
    ],

    // ═══════════════════════════════════════════════════════════════════════
    // DELTA-WERTE (Modifikatoren für Kompatibilitätsberechnung)
    // ═══════════════════════════════════════════════════════════════════════

    deltas: {
        // Positive Modifikatoren
        selbstreflexion: 5,                 // Intensive Auseinandersetzung
        koerperlicheEinzigartigkeit: 5,     // Biologische Gegebenheit
        offenheitFuerWachstum: 4,           // Bereitschaft zur Entwicklung
        ehrlichkeit: 4,                     // Anerkennung der Komplexität

        // Herausforderungen (verstärkt durch Intersex-Status)
        identitaetsStabilitaet: -5,         // Doppelte Unsicherheit
        medizinischeTraumata: -4,           // Häufige Eingriffe
        psychischeBelastung: -4,            // Erhöhtes Risiko
        gesellschaftlicherDruck: -4,        // Binäre Zuweisungen

        // Beziehungsdynamik
        unterstuetzungsbedarf: 5,           // Kritisch wichtig
        kommunikationsbedarf: 5,            // Sehr hoch
        partnerGeduld: -3,                  // Erfordert sehr geduldigen Partner
        entwicklungspotential: 5            // Großer Raum für Wachstum
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KONFIDENZ-WERTE
    // ═══════════════════════════════════════════════════════════════════════

    confidence: {
        overall: 0.55,                      // Begrenzte Forschung zu dieser Kombination
        koerperlicheEinzigartigkeit: 0.90,
        psychischeBelastung: 0.85,
        medizinischeTraumata: 0.90,
        entwicklungspotential: 0.45,        // Sehr individuell
        dataQuality: "medium",
        sampleSize: "small",
        methodology: "clinical studies and qualitative research",
        note: "Questioning-Phase bei intersex Personen oft durch externe Faktoren beeinflusst"
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHILOSOPHISCHE PERSPEKTIVEN
    // ═══════════════════════════════════════════════════════════════════════

    pirsig: "Die Unsicherheit über die eigene Identität, wenn der Körper selbst keine eindeutige Antwort gibt, ist keine Schwäche - sie ist die ehrlichste Reaktion auf eine komplexe Realität. Hier zeigt sich, dass die Suche nach Qualität manchmal bedeutet, mit offenen Fragen zu leben, anstatt vorschnelle Antworten zu akzeptieren.",

    osho: "Die Gesellschaft hat versucht, deinen Körper in eine Kategorie zu zwingen, und nun fragst du, welche Kategorie dein Geist bewohnen soll. Aber vielleicht ist die wichtigste Erkenntnis: Du brauchst keine Kategorie. Du bist ein Mysterium, das gelebt werden will, nicht ein Rätsel, das gelöst werden muss. Die Unsicherheit ist der Anfang der Weisheit."
};

// Export für verschiedene Modulsysteme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Gender.InterUnsicher;
}
