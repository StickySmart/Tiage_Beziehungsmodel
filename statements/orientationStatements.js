/**
 * ORIENTATION MICRO-STATEMENTS DATABASE
 * ======================================
 * ~120 philosophische Micro-Statements für Orientierungs-/Gender-Kombinationen
 *
 * Philosophische Grundlage:
 * - OSHO: Körperliche Polarität als Basis für Anziehung
 * - Pirsig (MOQ): Physische Chemie als dynamische Qualität
 *
 * Orientierungen:
 * - heterosexuell: Anziehung zum anderen Geschlecht
 * - homosexuell: Anziehung zum gleichen Geschlecht
 * - bisexuell: Anziehung zu allen Geschlechtern
 *
 * Geschlechter:
 * - männlich
 * - weiblich
 * - non-binär
 *
 * Orientierungsstatus:
 * - sicher: Feste Orientierung
 * - interessiert: In Exploration
 */

const orientationStatements = {

    // ═══════════════════════════════════════════════════════════════════════
    // KOMPATIBEL (100%) - Klare körperliche Anziehung
    // ═══════════════════════════════════════════════════════════════════════

    "compatible": {
        score: 100,
        pathos: [
            "Die körperliche Anziehung ist natürlich und gegeben.",
            "Beide Orientierungen harmonieren – die Basis für Intimität ist gelegt.",
            "OSHO's Polarität wirkt: Die Körper sprechen dieselbe Sprache.",
            "Physische Chemie ist die Grundlage für tiefere Verbindung.",
            "Die Anziehung fließt in beide Richtungen.",
            "Körperliche Resonanz schafft die Basis für emotionale Tiefe."
        ],
        logos: [
            "Orientierungs-Kompatibilität ist gegeben – kein K.O.-Kriterium.",
            "Strukturell ist körperliche Anziehung möglich.",
            "Die Basis für eine romantische/sexuelle Beziehung ist vorhanden."
        ],
        pro: [
            "Natürliche körperliche Anziehung",
            "Keine Orientierungsbarrieren",
            "Basis für Intimität gegeben",
            "Beide fühlen sich körperlich angezogen"
        ],
        contra: []
    },

    // ═══════════════════════════════════════════════════════════════════════
    // EXPLORATION (70%) - Unsichere, aber mögliche Anziehung
    // ═══════════════════════════════════════════════════════════════════════

    "exploring": {
        score: 70,
        pathos: [
            "Eine Seite exploriert – Offenheit für neue Erfahrungen.",
            "Die Neugier auf das Unbekannte kann Brücken bauen.",
            "Exploration bedeutet: Der Ausgang ist offen.",
            "Die Chemie ist noch nicht getestet – Potenzial vorhanden.",
            "Interesse ist der erste Schritt zur Entdeckung."
        ],
        logos: [
            "Eine oder beide Seiten sind in der Explorationsphase.",
            "Die körperliche Kompatibilität ist unsicher, aber nicht ausgeschlossen.",
            "Exploration kann zu Entdeckung oder Erkenntnis führen.",
            "Wissenschaftlich: Orientierung kann fluide sein."
        ],
        pro: [
            "Offenheit für neue Erfahrungen",
            "Potenzial für Entdeckung",
            "Keine festen Grenzen",
            "Experimentierfreude als Chance"
        ],
        contra: [
            "Unsicherheit über langfristige Kompatibilität",
            "Exploration kann in beide Richtungen gehen",
            "Emotionale Investition mit ungewissem Ausgang",
            "Einer könnte enttäuscht werden"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // HARD-KO (0%) - Geometrisch unmöglich
    // ═══════════════════════════════════════════════════════════════════════
    // Beide suchen aktiv jemand anderen - keine gegenseitige Anziehung möglich

    "hardKO": {
        score: 0,
        pathos: [
            "Beide suchen jemand anderen – keine gemeinsame Richtung.",
            "Die Orientierungen zeigen in entgegengesetzte Richtungen.",
            "Körperliche Anziehung braucht eine gemeinsame Basis.",
            "Freundschaft ist möglich, romantische Beziehung nicht."
        ],
        logos: [
            "Geometrisch unmöglich: Beide suchen jemand komplett anderen.",
            "Dies ist keine kulturelle Konditionierung, sondern neurologische Realität.",
            "Resonanz kann Interesse nicht ersetzen.",
            "Die Basis für romantische/sexuelle Beziehung fehlt."
        ],
        pro: [
            "Klarheit über die Situation",
            "Potenzial für tiefe Freundschaft",
            "Ehrlichkeit spart Zeit und Energie"
        ],
        contra: [
            "Keine gegenseitige körperliche Anziehung möglich",
            "Romantische Beziehung ausgeschlossen"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SOFT-KO (10%) - Unwahrscheinlich aber nicht unmöglich
    // ═══════════════════════════════════════════════════════════════════════
    // Mindestens einer könnte sich angezogen fühlen

    "incompatible": {
        score: 10,
        pathos: [
            "Die Orientierungen passen nicht optimal zusammen.",
            "Eine Seite könnte Interesse haben, die andere nicht.",
            "OSHO: Ohne beidseitige Polarität fehlt die magnetische Kraft.",
            "Die Körper sprechen verschiedene Sprachen."
        ],
        logos: [
            "Soft-KO: Geringe Wahrscheinlichkeit für beidseitige Anziehung.",
            "Nicht völlig ausgeschlossen, aber sehr unwahrscheinlich.",
            "Tiefe Resonanz könnte theoretisch überbrücken."
        ],
        pro: [
            "Nicht völlig ausgeschlossen",
            "Potenzial für tiefe Freundschaft"
        ],
        contra: [
            "Geringe Wahrscheinlichkeit für beidseitige Anziehung",
            "Romantische Beziehung sehr unwahrscheinlich",
            "Einseitige Gefühle möglich"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GENDER-CHEMIE STATEMENTS
    // ═══════════════════════════════════════════════════════════════════════

    "gender": {
        "m_w": {
            score: 100,
            pathos: [
                "Klassische Polarität: Männlich trifft auf weiblich.",
                "Die traditionelle Konstellation mit natürlicher Chemie.",
                "Gesellschaftlich am meisten unterstützt und verstanden."
            ],
            logos: [
                "Maximale gesellschaftliche Akzeptanz.",
                "Keine zusätzlichen Erklärungen nötig.",
                "Strukturell einfach zu navigieren."
            ]
        },
        "w_m": {
            score: 100,
            pathos: [
                "Weiblich begegnet männlich – klassische Konstellation.",
                "Die Energie der Gegensätze kann Funken erzeugen.",
                "Traditionelle Chemie mit moderner Interpretation."
            ],
            logos: [
                "Gesellschaftlich vollständig akzeptiert.",
                "Rechtliche und institutionelle Unterstützung vorhanden."
            ]
        },
        "m_m": {
            score: 100,
            pathos: [
                "Männlich trifft auf männlich – eine eigene Dynamik.",
                "Die Energie gleicher Pole kann kraftvoll sein.",
                "Gemeinsames Verständnis männlicher Erfahrung."
            ],
            logos: [
                "Gesellschaftlich zunehmend akzeptiert.",
                "Community-Unterstützung verfügbar."
            ]
        },
        "w_w": {
            score: 100,
            pathos: [
                "Weiblich begegnet weiblich – tiefe Resonanz möglich.",
                "Gemeinsames Verständnis weiblicher Erfahrung.",
                "Die Energie der Ähnlichkeit kann Intimität schaffen."
            ],
            logos: [
                "Gesellschaftlich zunehmend akzeptiert.",
                "Community-Unterstützung verfügbar."
            ]
        },
        "m_nb": {
            score: 80,
            pathos: [
                "Männlich trifft auf non-binär – eine neue Dynamik.",
                "Jenseits traditioneller Polarität – Neuland.",
                "Die Chemie muss individuell entdeckt werden."
            ],
            logos: [
                "Weniger gesellschaftliche Vorlagen – mehr eigene Definition nötig.",
                "Die Dynamik muss selbst gestaltet werden."
            ]
        },
        "w_nb": {
            score: 80,
            pathos: [
                "Weiblich begegnet non-binär – Offenheit gefragt.",
                "Jenseits der binären Polarität.",
                "Neue Formen der Anziehung können entstehen."
            ],
            logos: [
                "Die Beziehungsdynamik muss individuell definiert werden.",
                "Weniger gesellschaftliche Vorlagen."
            ]
        },
        "nb_m": {
            score: 80,
            pathos: [
                "Non-binär trifft auf männlich.",
                "Die eigene Identität bringt neue Perspektiven.",
                "Chemie jenseits der Binarität."
            ],
            logos: [
                "Individuelle Definition der Dynamik erforderlich."
            ]
        },
        "nb_w": {
            score: 80,
            pathos: [
                "Non-binär begegnet weiblich.",
                "Neue Formen der Verbindung werden möglich.",
                "Jenseits traditioneller Rollenerwartungen."
            ],
            logos: [
                "Die Beziehung definiert sich selbst."
            ]
        },
        "nb_nb": {
            score: 80,
            pathos: [
                "Non-binär trifft auf non-binär – maximale Offenheit.",
                "Beide verstehen die Erfahrung jenseits der Binarität.",
                "Gemeinsame Erfahrung von Nicht-Konformität."
            ],
            logos: [
                "Gemeinsame Navigation außerhalb binärer Strukturen.",
                "Gegenseitiges Verständnis für non-binäre Identität."
            ]
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // BISEXUALITÄT - Immer kompatibel
    // ═══════════════════════════════════════════════════════════════════════

    "bisexual": {
        score: 100,
        pathos: [
            "Bisexualität öffnet Türen zu allen Geschlechtern.",
            "Die Fähigkeit, Anziehung unabhängig vom Geschlecht zu empfinden.",
            "Maximale Flexibilität in der körperlichen Chemie.",
            "Das Geschlecht ist nicht der bestimmende Faktor."
        ],
        logos: [
            "Bisexuelle Orientierung ist mit allen Geschlechtern kompatibel.",
            "Keine Orientierungsbarrieren vorhanden.",
            "Strukturell maximale Flexibilität."
        ],
        pro: [
            "Kompatibilität mit allen Geschlechtern",
            "Keine Orientierungsbarrieren",
            "Offenheit für verschiedene Dynamiken"
        ],
        contra: [
            "Gesellschaftliche Missverständnisse über Bisexualität möglich",
            "Stereotypen über 'Unentschlossenheit' können auftreten"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // LEGACY GERMAN KEYS (für Rückwärtskompatibilität mit getOrientierungStatements)
    // ═══════════════════════════════════════════════════════════════════════

    "kompatibel_hetero_hetero": {
        score: 95,
        pathos: ["Die heterosexuelle Anziehung ist beidseitig und natürlich.", "Körperliche und emotionale Chemie kann frei fließen."],
        logos: ["Klassische Konstellation mit klarer gegenseitiger Anziehungsbasis."],
        pro: ["Natürliche gegenseitige Anziehung", "Gesellschaftlich etabliert"],
        contra: ["Keine besonderen Herausforderungen durch Orientierung"]
    },
    "kompatibel_homo_homo": {
        score: 95,
        pathos: ["Die homosexuelle Anziehung verbindet auf einer tiefen Ebene.", "Gemeinsames Verständnis der eigenen Identität schafft Nähe."],
        logos: ["Gleiche Orientierung ermöglicht authentische Verbindung."],
        pro: ["Tiefes gegenseitiges Verständnis", "Gemeinsame Erfahrungswelt"],
        contra: ["Gesellschaftliche Herausforderungen möglich"]
    },
    "kompatibel_bi_hetero": {
        score: 85,
        pathos: ["Anziehung ist vorhanden, auch wenn die Spektren unterschiedlich breit sind.", "Der bisexuelle Partner kann sich voll einlassen."],
        logos: ["Funktionale Kompatibilität gegeben, aber unterschiedliche Erfahrungswelten."],
        pro: ["Grundlegende Anziehung vorhanden", "Bisexueller bringt Offenheit mit"],
        contra: ["Heterosexueller versteht bi-Erfahrung nicht vollständig", "Teile der bi-Identität bleiben unausgelebt"]
    },
    "kompatibel_bi_homo": {
        score: 85,
        pathos: ["Anziehung ist da, aber die Wege dorthin waren unterschiedlich.", "Gemeinsame queere Erfahrungen können verbinden."],
        logos: ["Kompatibilität gegeben, unterschiedliche Identitätserfahrungen."],
        pro: ["Gemeinsame queere Perspektive", "Gegenseitiges Verständnis für Nicht-Heteronormativität"],
        contra: ["Bi-Identität wird manchmal in Frage gestellt", "Unterschiedliche Community-Erfahrungen"]
    },
    "kompatibel_bi_bi": {
        score: 95,
        pathos: ["Maximale Flexibilität trifft auf maximales Verständnis.", "Beide kennen die Komplexität fluider Anziehung."],
        logos: ["Tiefes gegenseitiges Verständnis der bi-Erfahrung.", "Keine Teile der Identität müssen versteckt werden."],
        pro: ["Vollständiges Verständnis der bi-Erfahrung", "Maximale Offenheit", "Keine Identitätsaspekte werden unterdrückt"],
        contra: ["Gesellschaftliche Bi-Erasure betrifft beide"]
    },
    "inkompatibel_hetero_hetero": {
        score: 15,
        pathos: ["Keine sexuelle Anziehung möglich – beide orientieren sich zum anderen Geschlecht.", "Freundschaft ja, romantische Verbindung nein."],
        logos: ["Strukturelle Inkompatibilität: Beide suchen das jeweils andere Geschlecht."],
        pro: ["Tiefe Freundschaft möglich"],
        contra: ["Keine romantische/sexuelle Basis", "Fundamentale Orientierungsdiskrepanz"]
    },
    "inkompatibel_homo_homo": {
        score: 15,
        pathos: ["Die Orientierung weist in entgegengesetzte Richtungen.", "Emotionale Nähe möglich, sexuelle Anziehung nicht."],
        logos: ["Strukturelle Inkompatibilität durch gegenläufige Orientierung."],
        pro: ["Verständnis füreinander als queere Menschen"],
        contra: ["Keine romantische/sexuelle Basis", "Orientierung zeigt zu unterschiedlichen Geschlechtern"]
    },
    "inkompatibel_hetero_homo": {
        score: 10,
        pathos: ["Die Anziehungskräfte gehen aneinander vorbei.", "Was der eine sucht, kann der andere nicht bieten."],
        logos: ["Maximale strukturelle Inkompatibilität.", "Keine gemeinsame Anziehungsbasis vorhanden."],
        pro: ["Freundschaft auf anderen Ebenen möglich"],
        contra: ["Keine romantische/sexuelle Kompatibilität", "Fundamentale Orientierungsdiskrepanz"]
    },
    "teilweise_bi_inkompatibel": {
        score: 40,
        pathos: ["Der bisexuelle Partner könnte angezogen sein, aber es ist nicht gegenseitig.", "Einseitige Anziehung schafft Ungleichgewicht."],
        logos: ["Nur einseitige Anziehung möglich – strukturelles Ungleichgewicht."],
        pro: ["Bisexueller zeigt Offenheit"],
        contra: ["Keine gegenseitige Anziehung", "Einseitiges Interesse führt zu Frustration"]
    },
    "default": {
        score: 50,
        pathos: ["Die Orientierungs-Kompatibilität ist noch nicht vollständig erkennbar."],
        logos: ["Standardwert wird verwendet bis Orientierung und Geschlecht ausgewählt sind."],
        pro: ["Neutrale Ausgangssituation"],
        contra: ["Unvollständige Information"]
    }
};

// Hilfsfunktion: Bestimme Orientierungs-Kompatibilität
function getOrientationCompatibility(person1, person2) {
    const o1 = person1.orientierung;
    const o2 = person2.orientierung;
    const g1 = person1.geschlecht;
    const g2 = person2.geschlecht;
    const s1 = person1.orientierungStatus;
    const s2 = person2.orientierungStatus;

    // Bisexuell ist immer kompatibel
    if (o1 === 'bisexuell' || o2 === 'bisexuell') {
        return { type: 'compatible', ...orientationStatements.compatible };
    }

    // Exploration-Status prüfen
    if (s1 === 'interessiert' || s2 === 'interessiert') {
        return { type: 'exploring', ...orientationStatements.exploring };
    }

    // Heterosexuell-Check
    if (o1 === 'heterosexuell' && o2 === 'heterosexuell') {
        // Unterschiedliche Geschlechter = kompatibel
        if (g1 !== g2 && g1 !== 'non-binär' && g2 !== 'non-binär') {
            return { type: 'compatible', ...orientationStatements.compatible };
        }
        // Gleiche Geschlechter oder non-binär beteiligt
        if (g1 === g2) {
            return { type: 'incompatible', ...orientationStatements.incompatible };
        }
        // Non-binär mit Hetero = unsicher
        return { type: 'exploring', ...orientationStatements.exploring };
    }

    // Homosexuell-Check
    if (o1 === 'homosexuell' && o2 === 'homosexuell') {
        // Gleiche Geschlechter = kompatibel
        if (g1 === g2 && g1 !== 'non-binär') {
            return { type: 'compatible', ...orientationStatements.compatible };
        }
        // Unterschiedliche Geschlechter = inkompatibel
        if (g1 !== g2 && g1 !== 'non-binär' && g2 !== 'non-binär') {
            return { type: 'incompatible', ...orientationStatements.incompatible };
        }
        // Non-binär beteiligt = unsicher
        return { type: 'exploring', ...orientationStatements.exploring };
    }

    // Gemischte Orientierungen (hetero/homo)
    if ((o1 === 'heterosexuell' && o2 === 'homosexuell') ||
        (o1 === 'homosexuell' && o2 === 'heterosexuell')) {
        // Komplex: abhängig von Geschlechtern
        // Hetero-Mann + Homo-Frau = beide wollen was anderes = inkompatibel
        // Hetero-Frau + Homo-Mann = beide wollen was anderes = inkompatibel
        return { type: 'incompatible', ...orientationStatements.incompatible };
    }

    // Fallback
    return { type: 'exploring', ...orientationStatements.exploring };
}

// Hilfsfunktion: Hole Gender-Chemie Statements
function getGenderChemistryStatements(g1, g2) {
    const key = `${g1?.charAt(0) || 'm'}_${g2?.charAt(0) || 'w'}`;
    const shortKey = key.replace('männlich', 'm').replace('weiblich', 'w').replace('non-binär', 'nb');

    // Versuche direkten Match
    if (orientationStatements.gender[shortKey]) {
        return orientationStatements.gender[shortKey];
    }

    // Versuche umgekehrten Match
    const reverseKey = `${g2?.charAt(0) || 'w'}_${g1?.charAt(0) || 'm'}`;
    const shortReverseKey = reverseKey.replace('männlich', 'm').replace('weiblich', 'w').replace('non-binär', 'nb');
    if (orientationStatements.gender[shortReverseKey]) {
        return orientationStatements.gender[shortReverseKey];
    }

    // Fallback
    return orientationStatements.compatible;
}

// Export für Verwendung in anderen Modulen
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { orientationStatements, getOrientationCompatibility, getGenderChemistryStatements };
}

// Browser-Export
if (typeof window !== 'undefined') {
    window.orientationStatements = orientationStatements;
    window.getOrientationCompatibility = getOrientationCompatibility;
    window.getGenderChemistryStatements = getGenderChemistryStatements;
}
