/**
 * DOMINANCE MICRO-STATEMENTS DATABASE
 * ====================================
 * ~130 philosophische Micro-Statements für Dominanz-Kombinationen
 *
 * Philosophische Grundlage:
 * - OSHO: "Nur Extreme können sich wirklich verlieben. Je weiter sie
 *         voneinander entfernt sind, desto tiefer wird die Anziehung."
 * - Tiedens & Fragale (2003): Komplementarität führt zu mehr Sympathie
 * - Sadikaj et al. (2017): Gleiche Dominanz = niedrigere Zufriedenheit
 *
 * Dominanz-Typen:
 * - dominant: Führende Rolle, Initiative, Entscheidungsfreude
 * - submissiv: Folgende Rolle, Hingabe, Vertrauen
 * - switch: Wechselnd, situativ anpassend
 * - ausgeglichen: Balance, weder führend noch folgend
 */

const dominanceStatements = {
    // ═══════════════════════════════════════════════════════════════════════
    // KOMPLEMENTÄRE PAARE (Höchste Harmonie: 100%)
    // ═══════════════════════════════════════════════════════════════════════

    "dominant_submissiv": {
        score: 100,
        pathos: [
            "Die perfekte Polarität: Führung trifft auf Hingabe.",
            "OSHO's Weisheit manifestiert sich hier – Extreme ziehen sich an.",
            "Eine magnetische Kraft entsteht aus der Gegensätzlichkeit.",
            "Der Tanz von Yin und Yang in seiner reinsten Form.",
            "Tiefe Anziehung durch komplementäre Energien.",
            "Das Gefühl von 'Ich ergänze dich vollkommen'."
        ],
        logos: [
            "Forschung bestätigt: Komplementarität führt zu höherer Sympathie (Tiedens & Fragale, 2003).",
            "Klare Rollenverteilung minimiert Entscheidungskonflikte.",
            "Strukturell optimal: Einer führt, einer folgt – keine Reibung.",
            "Dynamische Qualität entsteht durch die Spannung der Pole."
        ],
        pro: [
            "Optimale Rollenverteilung ohne Machtkämpfe",
            "Natürliche Dynamik in Entscheidungsprozessen",
            "Hohe gegenseitige Anziehung durch Polarität",
            "Klare Erwartungen an beide Partner",
            "Wissenschaftlich belegte höhere Zufriedenheit"
        ],
        contra: [
            "Extreme können kippen, wenn nicht bewusst gelebt",
            "Gesellschaftliche Vorurteile möglich",
            "Balance muss bewusst gehalten werden"
        ]
    },

    "submissiv_dominant": {
        score: 100,
        pathos: [
            "Hingabe trifft auf Führung – eine tiefe Resonanz.",
            "Das Vertrauen, sich führen zu lassen, schafft Intimität.",
            "Die Anziehung der Gegensätze in voller Wirkung.",
            "Sich fallen lassen können ist die größte Stärke.",
            "In der Führung des anderen findet sich Geborgenheit."
        ],
        logos: [
            "Komplementäre Dynamik ist strukturell am stabilsten.",
            "Rollenklarheit verhindert Entscheidungspatt.",
            "Wissenschaftliche Evidenz für höhere Beziehungszufriedenheit."
        ],
        pro: [
            "Natürliche Harmonie durch Komplementarität",
            "Klare Rollenverteilung",
            "Tiefes Vertrauen möglich",
            "Hohe Anziehungskraft"
        ],
        contra: [
            "Abhängigkeitsdynamiken müssen bewusst reflektiert werden",
            "Kommunikation über Grenzen ist essentiell"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // BALANCED PAIRS (Hohe Harmonie: 88-95%)
    // ═══════════════════════════════════════════════════════════════════════

    "ausgeglichen_ausgeglichen": {
        score: 95,
        pathos: [
            "Zwei Seelen in Balance – ein stiller Tanz der Gleichheit.",
            "Das Tao manifestiert sich: Weder führen noch folgen, nur sein.",
            "Harmonie durch gemeinsame Mitte.",
            "Die Ruhe von zwei Menschen, die nichts beweisen müssen.",
            "Gleichgewicht als gemeinsame Sprache."
        ],
        logos: [
            "Flexible Dynamik ohne starre Hierarchie.",
            "Entscheidungen werden gemeinsam getroffen.",
            "Keine strukturellen Machtkonflikte zu erwarten.",
            "Beide können situativ führen oder folgen."
        ],
        pro: [
            "Gleichberechtigte Partnerschaft",
            "Flexible Rollenverteilung je nach Situation",
            "Keine Machtkämpfe zu erwarten",
            "Gemeinsame Entscheidungsfindung",
            "Stabile, harmonische Grunddynamik"
        ],
        contra: [
            "Manchmal fehlt klare Führung in Entscheidungen",
            "Potenzial für Unentschlossenheit",
            "Weniger 'Feuer' durch fehlende Polarität"
        ]
    },

    "switch_switch": {
        score: 90,
        pathos: [
            "Spielerische Dynamik – heute führst du, morgen ich.",
            "Die Freude am Rollenwechsel verbindet.",
            "Flexibilität als gemeinsamer Wert.",
            "Abwechslung hält die Energie lebendig.",
            "Beide verstehen das Spiel der Rollen."
        ],
        logos: [
            "Hohe Anpassungsfähigkeit auf beiden Seiten.",
            "Wechselnde Dynamik kann kreativ sein.",
            "Beide haben Erfahrung mit beiden Rollen."
        ],
        pro: [
            "Vielfalt in der Dynamik",
            "Gegenseitiges Verständnis für Rollenwechsel",
            "Hohe Flexibilität",
            "Keine starren Erwartungen",
            "Spielerischer Umgang mit Macht"
        ],
        contra: [
            "Manchmal unklar, wer gerade führt",
            "Koordination des Rollenwechsels nötig",
            "Kann bei Stress zu Verwirrung führen"
        ]
    },

    "switch_ausgeglichen": {
        score: 88,
        pathos: [
            "Flexibilität trifft auf Balance – eine harmonische Mischung.",
            "Der Ausgeglichene gibt dem Switch Stabilität.",
            "Gemeinsame Wertschätzung von Anpassungsfähigkeit."
        ],
        logos: [
            "Switch kann sich an die Balance anpassen.",
            "Ausgeglichener Partner bietet stabilen Anker.",
            "Strukturell kompatibel durch beiderseitige Flexibilität."
        ],
        pro: [
            "Hohe Anpassungsfähigkeit",
            "Ausgeglichener Partner bietet Stabilität",
            "Keine starren Rollenerwartungen",
            "Harmonische Grunddynamik"
        ],
        contra: [
            "Switch könnte manchmal mehr Polarität vermissen",
            "Definition der Dynamik muss kommuniziert werden"
        ]
    },

    "ausgeglichen_switch": {
        score: 88,
        pathos: [
            "Balance begegnet Vielseitigkeit.",
            "Der Ausgeglichene kann dem Switch folgen oder führen.",
            "Gemeinsame Flexibilität als Stärke."
        ],
        logos: [
            "Beide können sich situativ anpassen.",
            "Keine strukturellen Konflikte zu erwarten."
        ],
        pro: [
            "Hohe gegenseitige Anpassungsfähigkeit",
            "Flexible Rollenverteilung",
            "Harmonische Grunddynamik"
        ],
        contra: [
            "Manchmal unklar, wer führt",
            "Kommunikation über Präferenzen wichtig"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // POL + BALANCE (Gute Harmonie: 85%)
    // ═══════════════════════════════════════════════════════════════════════

    "dominant_ausgeglichen": {
        score: 85,
        pathos: [
            "Führung trifft auf Gelassenheit.",
            "Der Ausgeglichene kann der Führung folgen ohne sich zu verlieren.",
            "Eine stabile Verbindung mit klarer Richtung."
        ],
        logos: [
            "Dominanter Partner gibt Richtung, Ausgeglichener stabilisiert.",
            "Strukturell funktional: Führung wird akzeptiert.",
            "Keine Machtkämpfe zu erwarten."
        ],
        pro: [
            "Klare Führung mit stabilem Fundament",
            "Ausgeglichener Partner ist nicht submissiv, aber anpassungsfähig",
            "Harmonische Grunddynamik",
            "Gute Balance zwischen Führung und Partnerschaft"
        ],
        contra: [
            "Dominanter könnte mehr Polarität vermissen",
            "Ausgeglichener muss aktiv Grenzen kommunizieren"
        ]
    },

    "ausgeglichen_dominant": {
        score: 85,
        pathos: [
            "Balance begegnet Stärke.",
            "Der Ausgeglichene kann Führung annehmen ohne Unterwerfung.",
            "Respekt vor der Energie des Dominanten."
        ],
        logos: [
            "Strukturell kompatibel.",
            "Ausgeglichener kann situativ folgen.",
            "Keine Machtkämpfe zu erwarten."
        ],
        pro: [
            "Harmonische Dynamik möglich",
            "Klare Rollenverteilung wenn nötig",
            "Ausgeglichener behält Autonomie"
        ],
        contra: [
            "Dominanter könnte mehr Gegenpol vermissen",
            "Balance zwischen Führung und Gleichheit muss gefunden werden"
        ]
    },

    "submissiv_ausgeglichen": {
        score: 85,
        pathos: [
            "Hingabebereitschaft trifft auf sanfte Führung.",
            "Der Ausgeglichene kann führen ohne zu dominieren.",
            "Eine weiche, unterstützende Dynamik."
        ],
        logos: [
            "Ausgeglichener kann situativ Führung übernehmen.",
            "Submissiver findet genug Struktur.",
            "Sanftere Dynamik als mit Dominantem."
        ],
        pro: [
            "Sanfte Führungsdynamik",
            "Submissiver fühlt sich sicher",
            "Ausgeglichener überfordert nicht mit Dominanz",
            "Harmonische, weiche Verbindung"
        ],
        contra: [
            "Submissiver könnte stärkere Führung vermissen",
            "Ausgeglichener muss aktiv führen können"
        ]
    },

    "ausgeglichen_submissiv": {
        score: 85,
        pathos: [
            "Balance kann sanft führen.",
            "Der Submissive findet Geborgenheit ohne Unterwerfung.",
            "Eine liebevolle, nicht-hierarchische Dynamik."
        ],
        logos: [
            "Ausgeglichener kann Führung übernehmen wenn nötig.",
            "Submissiver bekommt genug Struktur."
        ],
        pro: [
            "Weiche, liebevolle Dynamik",
            "Submissiver fühlt sich nicht überfordert",
            "Ausgeglichener kann situativ führen"
        ],
        contra: [
            "Submissiver könnte klarere Führung wünschen",
            "Dynamik könnte manchmal diffus sein"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SWITCH + POL (Anpassbare Harmonie: 80%)
    // ═══════════════════════════════════════════════════════════════════════

    "switch_dominant": {
        score: 80,
        pathos: [
            "Flexibilität begegnet fester Führung.",
            "Switch kann sich an die Dominanz anpassen.",
            "Der dominante Part gibt Richtung, Switch folgt – manchmal."
        ],
        logos: [
            "Switch kann submissive Rolle übernehmen.",
            "Anpassung ist möglich, aber nicht natürlich.",
            "Potenzial für gelegentliche Rollenkonflikte."
        ],
        pro: [
            "Switch kann sich anpassen",
            "Dominanter bekommt oft Führungsrolle",
            "Dynamik kann funktionieren"
        ],
        contra: [
            "Switch könnte die eigene dominante Seite vermissen",
            "Dominanter akzeptiert möglicherweise keine Rollenwechsel",
            "Potenzial für Frustration auf Switch-Seite"
        ]
    },

    "dominant_switch": {
        score: 80,
        pathos: [
            "Führung trifft auf Vielseitigkeit.",
            "Der Switch kann folgen, aber auch mal führen wollen.",
            "Eine dynamische, aber potenziell spannungsreiche Verbindung."
        ],
        logos: [
            "Switch's dominante Phasen können Konflikte schaffen.",
            "Klare Absprachen über Rollenwechsel nötig."
        ],
        pro: [
            "Grunddynamik kann funktionieren",
            "Switch ist anpassungsfähig",
            "Potenzial für interessante Dynamik"
        ],
        contra: [
            "Machtkonflikte wenn Switch dominant sein will",
            "Dominanter könnte Rollenwechsel ablehnen"
        ]
    },

    "switch_submissiv": {
        score: 80,
        pathos: [
            "Vielseitigkeit begegnet Hingabe.",
            "Switch kann die führende Rolle übernehmen.",
            "Submissiver findet im Switch einen flexiblen Partner."
        ],
        logos: [
            "Switch kann dominant sein wenn nötig.",
            "Submissiver bekommt Führung – manchmal.",
            "Inkonsistenz kann verunsichern."
        ],
        pro: [
            "Switch kann führen",
            "Submissiver bekommt Struktur",
            "Flexibilität kann bereichernd sein"
        ],
        contra: [
            "Inkonsistenz der Führung kann verunsichern",
            "Submissiver wünscht sich möglicherweise beständigere Dominanz",
            "Switch's submissive Phasen können Führungsvakuum schaffen"
        ]
    },

    "submissiv_switch": {
        score: 80,
        pathos: [
            "Hingabe trifft auf Wechselhaftigkeit.",
            "Manchmal führt der Switch, manchmal nicht.",
            "Der Submissive muss sich an wechselnde Dynamik anpassen."
        ],
        logos: [
            "Inkonsistenz kann strukturell herausfordernd sein.",
            "Submissiver braucht klare Führung, Switch gibt sie nur manchmal."
        ],
        pro: [
            "Grunddynamik kann funktionieren",
            "Switch kann führen wenn nötig"
        ],
        contra: [
            "Inkonsistenz kann frustrieren",
            "Submissiver wünscht sich klarere Führung",
            "Führungsvakuum in Switch's submissiven Phasen"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GLEICHE POLE (Herausfordernde Harmonie: 55%)
    // ═══════════════════════════════════════════════════════════════════════

    "dominant_dominant": {
        score: 55,
        pathos: [
            "Zwei Alphas treffen aufeinander – Funken fliegen.",
            "Machtkampf ist unvermeidlich, aber auch aufregend.",
            "Wer führt, wenn beide führen wollen?",
            "Die Energie ist hoch, aber die Reibung auch.",
            "Respekt vor der Stärke des anderen – oder Kollision."
        ],
        logos: [
            "Sadikaj et al. (2017): Gleiche hohe Dominanz korreliert mit niedrigerer Zufriedenheit.",
            "Strukturelles Problem: Zwei Führer, keine Folger.",
            "Entscheidungskonflikte sind vorprogrammiert.",
            "Bewusste Kommunikationsregeln sind essentiell."
        ],
        pro: [
            "Starke Persönlichkeiten können sich gegenseitig inspirieren",
            "Respekt vor der Stärke des anderen möglich",
            "Hohe Energie in der Verbindung"
        ],
        contra: [
            "Machtkämpfe sind unvermeidlich",
            "Wissenschaftlich belegte niedrigere Zufriedenheit",
            "Entscheidungskonflikte vorprogrammiert",
            "Keiner will nachgeben",
            "Hohe Konfliktwahrscheinlichkeit",
            "Bewusste Regeln erforderlich um zu funktionieren"
        ]
    },

    "submissiv_submissiv": {
        score: 55,
        pathos: [
            "Zwei, die auf Führung warten – wer beginnt?",
            "Führungsvakuum kann lähmend wirken.",
            "Gemeinsame Sanftheit, aber fehlende Richtung.",
            "Die Sehnsucht nach Führung bleibt unerfüllt.",
            "Harmonisch, aber manchmal orientierungslos."
        ],
        logos: [
            "Strukturelles Führungsvakuum.",
            "Entscheidungsprozesse können stagnieren.",
            "Externe Struktur oder klare Aufgabenteilung nötig.",
            "Keiner übernimmt natürlich Initiative."
        ],
        pro: [
            "Keine Machtkämpfe",
            "Harmonische, sanfte Grundstimmung",
            "Gegenseitige Empathie und Verständnis",
            "Konfliktarme Verbindung"
        ],
        contra: [
            "Führungsvakuum – wer entscheidet?",
            "Stagnation in Entscheidungsprozessen",
            "Beide warten auf Initiative des anderen",
            "Externe Struktur oft nötig",
            "Fehlende Dynamik und Antrieb",
            "Klare Aufgabenteilung erforderlich"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // FALLBACK für unvollständige Auswahl
    // ═══════════════════════════════════════════════════════════════════════

    "default": {
        score: 75,
        pathos: [
            "Die Dominanz-Dynamik ist noch nicht vollständig erkennbar.",
            "Weitere Informationen werden eine klarere Einschätzung ermöglichen."
        ],
        logos: [
            "Ohne vollständige Dominanz-Informationen ist eine genaue Bewertung nicht möglich.",
            "Standardwert wird verwendet bis alle Dimensionen ausgewählt sind."
        ],
        pro: [
            "Neutrale Ausgangssituation"
        ],
        contra: [
            "Unvollständige Information"
        ]
    }
};

// Hilfsfunktion: Hole Statements für Kombination
function getDominanceStatements(dom1, dom2) {
    if (!dom1 || !dom2) return dominanceStatements.default;

    const key = `${dom1}_${dom2}`;
    return dominanceStatements[key] || dominanceStatements.default;
}

// Export für Verwendung in anderen Modulen
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { dominanceStatements, getDominanceStatements };
}
