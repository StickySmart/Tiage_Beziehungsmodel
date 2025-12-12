/**
 * STATUS MICRO-STATEMENTS DATABASE
 * =================================
 * ~60 philosophische Micro-Statements für Status-Kombinationen (gelebt vs. interessiert)
 *
 * Philosophische Grundlage:
 * - Pirsig (MOQ): Qualität entsteht durch Klarheit und Selbstkenntnis
 * - OSHO: "Nur wer sich selbst kennt, kann einen anderen wirklich kennen"
 *
 * Status-Typen:
 * - gelebt: Feste, erprobte Identität in dieser Dimension
 * - interessiert: Exploration, Neugier, Offenheit für Entwicklung
 *
 * Kombinationen beeinflussen die Konfidenz der Gesamtbewertung:
 * - gelebt + gelebt: Hohe Konfidenz (1.0)
 * - gelebt + interessiert: Mittlere Konfidenz (0.85)
 * - interessiert + interessiert: Niedrigere Konfidenz (0.7)
 */

const statusStatements = {

    // ═══════════════════════════════════════════════════════════════════════
    // BEIDE GEFESTIGT (Höchste Konfidenz: 1.0)
    // ═══════════════════════════════════════════════════════════════════════

    "gelebt_gelebt": {
        pathos: [
            "Zwei gefestigte Seelen begegnen sich – die emotionale Klarheit beider schafft Tiefe.",
            "Die Sicherheit in der eigenen Identität ermöglicht authentische Begegnung.",
            "Beide wissen, wer sie sind – ein stabiles Fundament für Verbindung.",
            "Klarheit trifft auf Klarheit – keine Nebel, keine Unsicherheit.",
            "Das Selbstverständnis beider Partner ist gefestigt.",
            "Authentizität kann fließen, wenn die Identität geklärt ist."
        ],
        logos: [
            "Hohe Qualität durch klare Selbstkenntnis beider Partner (Pirsig).",
            "Beide wissen, was sie wollen – eine solide Basis für rationale Entscheidungen.",
            "Die Vorhersagegenauigkeit des Modells ist maximal.",
            "Stabile Ausgangslage für langfristige Kompatibilitätsbewertung.",
            "Keine Varianz durch Explorationsphasen zu erwarten."
        ],
        pro: [
            "Maximale Vorhersagegenauigkeit",
            "Stabile Identitäten als Fundament",
            "Klare Kommunikation über Bedürfnisse möglich",
            "Authentische Begegnung wahrscheinlich",
            "Keine Identitätskrisen zu erwarten"
        ],
        contra: [
            "Gefahr von Starrheit, wenn Wachstum aufhört",
            "Veränderung könnte als Bedrohung empfunden werden"
        ],
        modifier: 1.0  // Volle Konfidenz
    },

    // ═══════════════════════════════════════════════════════════════════════
    // EINER GEFESTIGT, EINER EXPLORIERT (Mittlere Konfidenz: 0.85)
    // ═══════════════════════════════════════════════════════════════════════

    "gelebt_interessiert": {
        pathos: [
            "Klarheit trifft auf Offenheit – Raum für gemeinsames Wachstum entsteht.",
            "Der eine bietet emotionalen Anker, der andere bringt Neugier mit.",
            "Stabilität und Exploration in Balance – eine reiche Dynamik.",
            "Der gefestigte Partner kann dem Suchenden Orientierung bieten.",
            "Neugier trifft auf Erfahrung – potentiell bereichernd.",
            "Die Reise des einen wird vom anderen begleitet."
        ],
        logos: [
            "Qualität im Werden: Der gefestigte Partner kann Orientierung bieten.",
            "Asymmetrie in der Selbstkenntnis – erfordert Geduld und Kommunikation.",
            "Reduzierte Vorhersagegenauigkeit durch Explorations-Varianz.",
            "Der explorative Partner könnte sich weiterentwickeln.",
            "Das Modell berücksichtigt die Unsicherheit mit 85% Konfidenz."
        ],
        pro: [
            "Potenzial für gemeinsames Wachstum",
            "Der gefestigte Partner bietet Stabilität",
            "Neugier kann die Beziehung bereichern",
            "Exploration als Chance, nicht als Problem"
        ],
        contra: [
            "Der Explorative könnte sich in andere Richtung entwickeln",
            "Asymmetrie kann zu Ungeduld führen",
            "Unterschiedliche Geschwindigkeiten der Entwicklung",
            "Der Gefestigte muss Flexibilität zeigen"
        ],
        modifier: 0.85  // Reduzierte Konfidenz
    },

    "interessiert_gelebt": {
        pathos: [
            "Offenheit begegnet Klarheit – der Anker ist da, wenn gesucht wird.",
            "Die Neugier des Suchenden trifft auf die Erfahrung des Gefestigten.",
            "Exploration wird sicherer, wenn ein Partner Stabilität bietet.",
            "Das Unbekannte wird erkundbar durch die Sicherheit des anderen."
        ],
        logos: [
            "Der gefestigte Partner bietet strukturelle Stabilität.",
            "Die Entwicklung des Explorierenden bleibt offen.",
            "Reduzierte Vorhersagegenauigkeit: 85% Konfidenz."
        ],
        pro: [
            "Stabilität als Ankerpunkt",
            "Raum für Entwicklung gegeben",
            "Der Gefestigte kann Mentor sein"
        ],
        contra: [
            "Entwicklung könnte in unerwartete Richtung gehen",
            "Gefahr von Abhängigkeit",
            "Asymmetrie der Selbstkenntnis"
        ],
        modifier: 0.85  // Reduzierte Konfidenz
    },

    // ═══════════════════════════════════════════════════════════════════════
    // BEIDE EXPLORIEREN (Niedrigere Konfidenz: 0.7)
    // ═══════════════════════════════════════════════════════════════════════

    "interessiert_interessiert": {
        pathos: [
            "Zwei Suchende auf gemeinsamer Reise – Verbundenheit durch geteilte Unsicherheit.",
            "Die Offenheit beider kann befreiend sein, aber auch destabilisierend.",
            "Gemeinsame Exploration – aufregend, aber unvorhersehbar.",
            "Beide sind auf einer Entdeckungsreise – wohin sie führt, ist offen.",
            "Die Neugier beider schafft einen Raum der Möglichkeiten.",
            "Zwei offene Bücher – die Geschichte wird gerade geschrieben."
        ],
        logos: [
            "Qualität noch im Fluss – viel Potential, aber unklare Grundlagen.",
            "Beide explorieren noch – Beziehungsbasis kann sich stark verändern.",
            "Höchste Varianz: Beide könnten sich in verschiedene Richtungen entwickeln.",
            "Das Modell arbeitet mit 70% Konfidenz – hohe Unsicherheit.",
            "Wissenschaftlich: Explorationsphasen zeigen erhöhte Verhaltensvarianzen."
        ],
        pro: [
            "Gemeinsame Entdeckungsreise",
            "Keine starren Erwartungen",
            "Maximale Offenheit für Wachstum",
            "Gegenseitiges Verständnis für Unsicherheit",
            "Flexibilität auf beiden Seiten"
        ],
        contra: [
            "Hohe Unsicherheit über Entwicklungsrichtung",
            "Beide könnten sich in verschiedene Richtungen entwickeln",
            "Fehlende Stabilität als Anker",
            "Beziehungsbasis kann sich stark verändern",
            "Niedrige Vorhersagegenauigkeit",
            "Orientierungslosigkeit möglich"
        ],
        modifier: 0.7  // Deutlich reduzierte Konfidenz
    },

    // ═══════════════════════════════════════════════════════════════════════
    // FALLBACK für unvollständige Auswahl
    // ═══════════════════════════════════════════════════════════════════════

    "default": {
        pathos: [
            "Der Sicherheitsgrad der Selbstkenntnis ist noch nicht vollständig erkennbar.",
            "Ohne Status-Information bleibt die emotionale Tiefe unbestimmt."
        ],
        logos: [
            "Standardwert wird verwendet bis der Status ausgewählt ist.",
            "Die Konfidenz der Bewertung ist eingeschränkt."
        ],
        pro: [
            "Neutrale Ausgangssituation"
        ],
        contra: [
            "Unvollständige Information für präzise Bewertung"
        ],
        modifier: 0.8  // Standard-Konfidenz bei fehlenden Daten
    }
};

// Hilfsfunktion: Hole Statements für Status-Kombination
function getStatusStatements(status1, status2) {
    if (!status1 || !status2) return statusStatements.default;

    const normalize = (s) => s?.toLowerCase() || null;
    const s1 = normalize(status1);
    const s2 = normalize(status2);

    if (!s1 || !s2) return statusStatements.default;

    const key = `${s1}_${s2}`;
    return statusStatements[key] || statusStatements.default;
}

// Hilfsfunktion: Ermittle den dominanten Status für eine Person über alle Dimensionen
function getPersonOverallStatus(personDims) {
    if (!personDims) return null;

    let hasFakt = false;
    let hasInteressiert = false;

    // Prüfe Dominanz
    if (personDims.dominanz && typeof personDims.dominanz === 'object') {
        if ('primary' in personDims.dominanz) {
            if (personDims.dominanz.primary) hasFakt = true;
            if (personDims.dominanz.secondary) hasInteressiert = true;
        } else {
            for (const key of Object.keys(personDims.dominanz)) {
                if (personDims.dominanz[key] === 'gelebt') hasFakt = true;
                if (personDims.dominanz[key] === 'interessiert') hasInteressiert = true;
            }
        }
    }

    // Prüfe Orientierung
    if (personDims.orientierung && typeof personDims.orientierung === 'object') {
        if ('primary' in personDims.orientierung) {
            if (personDims.orientierung.primary) hasFakt = true;
            if (personDims.orientierung.secondary) hasInteressiert = true;
        } else {
            for (const key of Object.keys(personDims.orientierung)) {
                if (personDims.orientierung[key] === 'gelebt') hasFakt = true;
                if (personDims.orientierung[key] === 'interessiert') hasInteressiert = true;
            }
        }
    }

    // Wenn sowohl gelebt als auch interessiert: interessiert dominiert (Unsicherheit)
    if (hasInteressiert) return 'interessiert';
    if (hasFakt) return 'gelebt';
    return null;
}

// Hilfsfunktion: Hole Status-Statements basierend auf Person-Dimensionen
function getStatusStatementsFromDimensions(personDims1, personDims2) {
    const status1 = getPersonOverallStatus(personDims1);
    const status2 = getPersonOverallStatus(personDims2);
    return getStatusStatements(status1, status2);
}

// Export für Verwendung in anderen Modulen
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { statusStatements, getStatusStatements, getPersonOverallStatus, getStatusStatementsFromDimensions };
}

// Browser-Export
if (typeof window !== 'undefined') {
    window.statusStatements = statusStatements;
    window.getStatusStatements = getStatusStatements;
    window.getPersonOverallStatus = getPersonOverallStatus;
    window.getStatusStatementsFromDimensions = getStatusStatementsFromDimensions;
}
