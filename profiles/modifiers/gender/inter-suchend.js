/**
 * GENDER MODIFIER: Inter (Suchend/Questioning)
 *
 * Modifikator für intergeschlechtliche Personen, die ihre Gender-Identität hinterfragen.
 * Basiert auf Forschung zu Intersex-Identität und Identitätsexploration.
 *
 * @module TiageModifiers.Gender.InterSuchend
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Gender = TiageModifiers.Gender || {};

TiageModifiers.Gender.InterSuchend = {

    id: "inter-suchend",
    label: "Inter (Suchend/Questioning)",
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
        // Positive Modifikatoren (Keys müssen Need-IDs aus beduerfnis-katalog.json entsprechen)
        authentizitaet: 5,                  // #B50 Selbstreflexion
        wachstum_und_sinn: 5,               // #B61 Offenheit für Wachstum & Entwicklungspotential
        integritaet: 4,                     // #B52 Ehrlichkeit

        // Herausforderungen (verstärkt durch Intersex-Status)
        stabilitaet: -5,                    // #B13 Identitätsstabilität - doppelte Unsicherheit
        stabilitaet_und_sicherheit: -4,     // #B11 Psychische Belastung
        gesellschaft: -4,                   // #B19 Gesellschaftlicher Druck

        // Support
        akzeptanz_und_empathie: 5,          // #B25 Unterstützungsbedarf kritisch wichtig
        kommunikation: 5                    // #B40 Kommunikationsbedarf sehr hoch
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
    module.exports = TiageModifiers.Gender.InterSuchend;
}
