/**
 * TIAGE SYNTHESE - Konstanten
 *
 * Zentrale Definition aller Gewichte, Matrizen und Konfigurationen
 * für die Beziehungsqualitäts-Berechnung.
 *
 * Formel: Q = [(A × wₐ) + (O × wₒ) + (D × wᵈ) + (G × wᵍ)] × R
 */

var TiageSynthesis = TiageSynthesis || {};

TiageSynthesis.Constants = {

    // ═══════════════════════════════════════════════════════════════════════
    // FAKTOR-GEWICHTE
    // ═══════════════════════════════════════════════════════════════════════
    // Jeder Faktor hat eine Logos/Pathos-Mischung:
    // - Archetyp:     80% Logos / 20% Pathos (Beziehungsphilosophie)
    // - Orientierung: 20% Logos / 80% Pathos (Körperliche Polarität)
    // - Dominanz:     20% Logos / 80% Pathos (Energetische Dynamik)
    // - Geschlecht:   Primär = Logos, Sekundär = Pathos

    WEIGHTS: {
        archetyp: 0.25,      // 25% - Beziehungsphilosophie
        orientierung: 0.25,  // 25% - Sexuelle Orientierung
        dominanz: 0.25,      // 25% - Dom/Sub/Switch Dynamik
        geschlecht: 0.25     // 25% - Gender-Attraktion
    },

    FACTOR_COMPOSITION: {
        archetyp:     { logos: 0.80, pathos: 0.20 },
        orientierung: { logos: 0.20, pathos: 0.80 },
        dominanz:     { logos: 0.20, pathos: 0.80 },
        geschlecht:   { primaer: 'logos', sekundaer: 'pathos' }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // RESONANZ-KONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════
    // R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
    // K = GFK-Kommunikationsfaktor (Gewaltfreie Kommunikation)

    RESONANCE: {
        BASE: 0.9,           // Minimum Resonanz
        MAX_BOOST: 0.2,      // Maximum zusätzliche Resonanz
        PROFILE_WEIGHT: 0.35, // Gewicht Profil-Match (M)
        BALANCE_WEIGHT: 0.35, // Gewicht Logos-Pathos-Balance (B)
        GFK_WEIGHT: 0.30,     // Gewicht GFK-Kommunikationsfaktor (K)

        // Platzhalter bis Profil-Attribute implementiert
        DEFAULT_PROFILE_MATCH: 50
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MULTI-DIMENSIONALE RESONANZ (v3.1)
    // ═══════════════════════════════════════════════════════════════════════
    //
    // Formel pro Dimension: R_dim = 0.9 + (Match × 0.2)
    // Gesamt: R = (R_beduerfnisse + R_philosophie + R_leben + R_dynamik) / 4
    //
    // Schwellenwerte:
    //   R ≥ 1.05 → Resonanz ⬆️
    //   R ≤ 0.97 → Dissonanz ⬇️
    //   R 0.97-1.05 → Neutral ➡️
    //
    RESONANCE_DIMENSIONAL: {
        ENABLED: true,       // Multi-Dimensional aktivieren

        // Die 4 Dimensionen und ihre Quell-Needs (disjunkt!)
        DIMENSIONS: {
            identitaet: {
                name: 'Identität',
                emoji: '💚',
                source: 'GESCHLECHT_NEEDS',  // Authentizität, Selbstausdruck
                weight: 0.25                 // 25% Gewicht im Durchschnitt
            },
            philosophie: {
                name: 'Philosophie',
                emoji: '🧠',
                source: 'ARCHETYP_NEEDS', // Aus NEEDS_INTEGRATION
                weight: 0.25
            },
            leben: {
                name: 'Leben',
                emoji: '🔥',
                source: 'ORIENTIERUNG_NEEDS',
                weight: 0.25
            },
            dynamik: {
                name: 'Dynamik',
                emoji: '⚡',
                source: 'DOMINANZ_NEEDS',
                weight: 0.25
            }
        },

        // Interpretation pro Dimension
        THRESHOLDS: {
            resonanz: 1.05,   // R ≥ 1.05 = Resonanz ⬆️
            dissonanz: 0.97   // R ≤ 0.97 = Dissonanz ⬇️
                              // Dazwischen = Neutral ➡️
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ARCHETYP-BEDÜRFNIS-KOHÄRENZ (v3.1)
    // ═══════════════════════════════════════════════════════════════════════
    // Definiert die erwarteten Bedürfnis-Ausprägungen pro Archetyp.
    // R_dim = Übereinstimmung zwischen tatsächlichen und erwarteten Werten.
    //
    // Werte: 0-100 (erwartete Ausprägung für kohärentes Profil)
    // null = Bedürfnis ist für diesen Archetyp nicht relevant
    //
    ARCHETYP_KOHAERENZ: {
        // ═══════════════════════════════════════════════════════════════════
        // R_Leben (Orientierungs-Bedürfnisse)
        // ═══════════════════════════════════════════════════════════════════
        leben: {
            single: {
                sexuelle_experimentierfreude: 50,  // Offen, aber nicht zentral
                sexuelle_verbindung: 30,           // Gering - Fokus auf Selbst
                koerpernaehe: 40,
                intimitaet: 30
            },
            duo: {
                sexuelle_experimentierfreude: 40,  // Eher konservativ
                sexuelle_verbindung: 90,           // Sehr wichtig - exklusiv
                koerpernaehe: 85,
                intimitaet: 90
            },
            duo_flex: {
                sexuelle_experimentierfreude: 70,  // Offen für Neues
                sexuelle_verbindung: 75,
                koerpernaehe: 75,
                intimitaet: 80
            },
            solopoly: {
                sexuelle_experimentierfreude: 85,  // Hoch - viel Exploration
                sexuelle_verbindung: 60,           // Moderat - Autonomie wichtiger
                koerpernaehe: 60,
                intimitaet: 50
            },
            polyamor: {
                sexuelle_experimentierfreude: 80,
                sexuelle_verbindung: 85,           // Hoch - tiefe Verbindungen
                koerpernaehe: 75,
                intimitaet: 85
            },
            ra: {
                sexuelle_experimentierfreude: 75,  // Keine Regeln
                sexuelle_verbindung: 60,           // Variabel
                koerpernaehe: 50,
                intimitaet: 60
            },
            lat: {
                sexuelle_experimentierfreude: 50,
                sexuelle_verbindung: 80,           // Wichtig trotz Distanz
                koerpernaehe: 60,
                intimitaet: 75
            },
            aromantisch: {
                sexuelle_experimentierfreude: 40,  // Kann variieren
                sexuelle_verbindung: 20,           // Gering - keine Romantik
                koerpernaehe: 30,
                intimitaet: 25
            }
        },

        // ═══════════════════════════════════════════════════════════════════
        // R_Dynamik (Dominanz-Bedürfnisse)
        // ═══════════════════════════════════════════════════════════════════
        dynamik: {
            single: {
                kontrolle_ausueben: 50,            // Selbstbestimmt
                hingabe: 30,
                fuehrung_geben: 50,
                gefuehrt_werden: 30,
                autonomie: 90                       // Sehr hoch
            },
            duo: {
                kontrolle_ausueben: 50,
                hingabe: 60,                        // Bereitschaft zur Hingabe
                fuehrung_geben: 50,
                gefuehrt_werden: 50,
                autonomie: 50                       // Balance
            },
            duo_flex: {
                kontrolle_ausueben: 55,
                hingabe: 55,
                fuehrung_geben: 55,
                gefuehrt_werden: 50,
                autonomie: 65
            },
            solopoly: {
                kontrolle_ausueben: 40,
                hingabe: 40,
                fuehrung_geben: 45,
                gefuehrt_werden: 40,
                autonomie: 95                       // Maximum
            },
            polyamor: {
                kontrolle_ausueben: 45,
                hingabe: 60,
                fuehrung_geben: 50,
                gefuehrt_werden: 55,
                autonomie: 70
            },
            ra: {
                kontrolle_ausueben: 30,             // Keine Hierarchien
                hingabe: 50,
                fuehrung_geben: 30,
                gefuehrt_werden: 30,
                autonomie: 90
            },
            lat: {
                kontrolle_ausueben: 40,
                hingabe: 55,
                fuehrung_geben: 45,
                gefuehrt_werden: 50,
                autonomie: 80                       // Wichtig für LAT
            },
            aromantisch: {
                kontrolle_ausueben: 40,
                hingabe: 25,                        // Gering - keine romantische Hingabe
                fuehrung_geben: 40,
                gefuehrt_werden: 30,
                autonomie: 85
            }
        },

        // ═══════════════════════════════════════════════════════════════════
        // R_Identität (Geschlechts-Bedürfnisse)
        // ═══════════════════════════════════════════════════════════════════
        identitaet: {
            single: {
                authentizitaet: 85,                 // Hoch - Selbstfokus
                selbst_ausdruck: 80,
                akzeptanz: 70,
                gesehen_werden: 60
            },
            duo: {
                authentizitaet: 75,
                selbst_ausdruck: 70,
                akzeptanz: 85,                      // Wichtig - vom Partner
                gesehen_werden: 90
            },
            duo_flex: {
                authentizitaet: 80,
                selbst_ausdruck: 75,
                akzeptanz: 80,
                gesehen_werden: 80
            },
            solopoly: {
                authentizitaet: 95,                 // Maximum - eigene Wahrheit
                selbst_ausdruck: 90,
                akzeptanz: 75,
                gesehen_werden: 70
            },
            polyamor: {
                authentizitaet: 85,
                selbst_ausdruck: 85,
                akzeptanz: 85,
                gesehen_werden: 85
            },
            ra: {
                authentizitaet: 95,                 // Keine Labels
                selbst_ausdruck: 95,
                akzeptanz: 80,
                gesehen_werden: 70
            },
            lat: {
                authentizitaet: 85,
                selbst_ausdruck: 80,
                akzeptanz: 80,
                gesehen_werden: 80
            },
            aromantisch: {
                authentizitaet: 90,                 // Hoch - gegen Normen
                selbst_ausdruck: 85,
                akzeptanz: 90,                      // Braucht Akzeptanz
                gesehen_werden: 75
            }
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GFK-KOMPETENZ-MATRIX (Gewaltfreie Kommunikation)
    // ═══════════════════════════════════════════════════════════════════════
    // Marshall Rosenberg's 4-Schritte: Beobachtung, Gefühl, Bedürfnis, Bitte
    //
    // Matrix-Werte (ICH × Partner):
    //                ICH / Partner | hoch | mittel | niedrig
    // ──────────────────────────────────────────────────────────
    // hoch            (K = 1.0)    | 1.0  | 0.75   | 0.35
    // mittel          (K = 0.75)   | 0.75 | 0.5    | 0.2
    // niedrig         (K = 0.35)   | 0.35 | 0.2    | 0.0

    GFK_MATRIX: {
        // Beide hohe GFK-Kompetenz: Optimale Kommunikation
        "hoch-hoch": 1.0,

        // Asymmetrie hoch-mittel: Erfahrener Partner als Brücke
        "hoch-mittel": 0.75,
        "mittel-hoch": 0.75,

        // Starke Asymmetrie hoch-niedrig: Herausforderung
        "hoch-niedrig": 0.35,
        "niedrig-hoch": 0.35,

        // Beide mittlere Kompetenz: Gute Basis
        "mittel-mittel": 0.5,

        // Asymmetrie mittel-niedrig: Schwierig
        "mittel-niedrig": 0.2,
        "niedrig-mittel": 0.2,

        // Beide niedrig: Destruktive Muster wahrscheinlich
        "niedrig-niedrig": 0.0
    },

    // GFK-Level zu nummerischen Werten (für Berechnung wenn nur ein Level bekannt)
    GFK_LEVELS: {
        "hoch": 1.0,
        "mittel": 0.75,
        "niedrig": 0.35
    },

    // ═══════════════════════════════════════════════════════════════════════
    // DOMINANZ-HARMONIE-MATRIX
    // ═══════════════════════════════════════════════════════════════════════
    // Basiert auf OSHO's Tao-Prinzip: Komplementäre Polarität = höchste Harmonie

    DOMINANCE_MATRIX: {
        // KOMPLEMENTÄRE POLARITÄT (100%)
        "dominant-submissiv": 100,
        "submissiv-dominant": 100,

        // TAO-BALANCE (90-95%)
        "ausgeglichen-ausgeglichen": 95,
        "switch-switch": 90,
        "switch-ausgeglichen": 88,
        "ausgeglichen-switch": 88,

        // POL + BALANCE (85%)
        "dominant-ausgeglichen": 85,
        "ausgeglichen-dominant": 85,
        "submissiv-ausgeglichen": 85,
        "ausgeglichen-submissiv": 85,

        // SWITCH + POL (80%)
        "switch-dominant": 80,
        "dominant-switch": 80,
        "switch-submissiv": 80,
        "submissiv-switch": 80,

        // GLEICHE POLE (55%) - Spannung
        "dominant-dominant": 55,
        "submissiv-submissiv": 55
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ORIENTIERUNGS-KOMPATIBILITÄT
    // ═══════════════════════════════════════════════════════════════════════
    // Hard-KO bei geometrisch unmöglichen Kombinationen

    ORIENTATION: {
        COMPATIBLE: 100,     // Volle Kompatibilität
        EXPLORING: 70,       // Exploration-Phase (interessiert)
        UNLIKELY: 30,        // Unwahrscheinlich aber nicht unmöglich
        INCOMPATIBLE: 10,    // Sehr unwahrscheinlich (soft K.O.)
        HARD_KO: 0           // Geometrisch unmöglich (echtes K.O.)
    },

    // ═══════════════════════════════════════════════════════════════════════
    // HARD-KO KRITERIEN (Geometrische Unmöglichkeiten)
    // ═══════════════════════════════════════════════════════════════════════
    // Diese Kombinationen sind logisch unmöglich, nicht nur kulturell bedingt.
    // Resonanz kann hier NICHT überschreiben - es fehlt die neurologische Basis.

    HARD_KO: {
        // Aktiviert Hard-KO Logik
        ENABLED: true,

        // Hard-KO Fälle:
        // 1. Hetero + Hetero + gleiches Geschlecht = beide suchen jemand anderen
        // 2. Homo + Homo + verschiedenes Geschlecht = beide suchen jemand anderen
        // 3. Hetero + Homo (bestimmte Konstellationen) = keine gegenseitige Anziehung

        // Freundlicher Text (kein aggressives "WARNUNG!")
        MESSAGE_KEY: 'hardKO'  // Referenz auf Locale-Texte
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SOFT-KO KRITERIEN (Bedürfnis-basiert)
    // ═══════════════════════════════════════════════════════════════════════
    // Nicht unmöglich, aber sehr unwahrscheinlich aufgrund starker Bedürfnis-Differenzen

    SOFT_KO: {
        ENABLED: true,

        // Schwellenwerte für Bedürfnis-Differenzen
        THRESHOLDS: {
            CRITICAL: 50,      // Differenz > 50 = kritischer Konflikt
            HIGH: 35,          // Differenz > 35 = hoher Konflikt
            MODERATE: 20       // Differenz > 20 = moderater Konflikt
        },

        // Anzahl kritischer Konflikte für Soft-KO
        MIN_CRITICAL_CONFLICTS: 3,  // Mind. 3 Bedürfnisse mit Diff > 50

        // Score-Reduktion bei Soft-KO
        SCORE_PENALTY: 0.3,   // Reduziert Score auf 30%

        MESSAGE_KEY: 'softKO'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // P↔S VALIDIERUNG (Primär-Sekundär Konsistenz)
    // ═══════════════════════════════════════════════════════════════════════
    // Prüft ob P und S einer Person sinnvoll kombinierbar sind

    PS_VALIDATION: {
        ENABLED: true,

        // Bonus wenn S die Lücke von P füllt
        COMPLEMENTARY_BONUS: 10,

        // Gewichtung von S relativ zu P
        SECONDARY_WEIGHT: 0.5,  // S hat 50% Einfluss von P

        MESSAGE_KEY: 'psValidation'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GESCHLECHTS-ATTRAKTION
    // ═══════════════════════════════════════════════════════════════════════

    GENDER: {
        FULL_MATCH: 100,
        NON_BINARY_INVOLVED: 80,
        MIXED_ORIENTATION: 75
    },

    // ═══════════════════════════════════════════════════════════════════════
    // IDENTITÄTS-RESONANZ-MATRIX
    // ═══════════════════════════════════════════════════════════════════════
    // Pirsig: "Qualität entsteht, wenn Muster resonieren"
    // Ähnliche Identitäten verstehen sich intuitiv.
    //
    // Kontextabhängig:
    // - Binär (Mann/Frau): Cis, Trans, Suchend
    // - Divers (Inter): Nonbinär, Fluid, Suchend

    IDENTITY_MATRIX: {
        // ─── BINÄR-KONTEXT (Cis, Trans, Suchend) ───
        // Cis: Form = Körper, klare statische Qualität
        "cis-cis": 100,
        "cis-trans": 85,
        "cis-suchend": 70,

        // Trans: Wandel durchlebt, neue Klarheit gefunden
        "trans-cis": 85,
        "trans-trans": 100,
        "trans-suchend": 75,

        // ─── DIVERS-KONTEXT (Nonbinär, Fluid, Suchend) ───
        // Nonbinär: Jenseits der Dualität, bewusste Position
        "nonbinaer-nonbinaer": 100,
        "nonbinaer-fluid": 90,
        "nonbinaer-suchend": 80,

        // Fluid: Der Fluss, dynamische Qualität
        "fluid-nonbinaer": 90,
        "fluid-fluid": 100,
        "fluid-suchend": 85,

        // ─── SUCHEND (universell) ───
        "suchend-cis": 70,
        "suchend-trans": 75,
        "suchend-nonbinaer": 80,
        "suchend-fluid": 85,
        "suchend-suchend": 100,

        // ─── CROSS-KONTEXT (Binär ↔ Divers) ───
        // Cis/Trans trifft auf Nonbinär/Fluid
        "cis-nonbinaer": 65,
        "cis-fluid": 55,
        "trans-nonbinaer": 75,
        "trans-fluid": 65,
        "nonbinaer-cis": 65,
        "nonbinaer-trans": 75,
        "fluid-cis": 55,
        "fluid-trans": 65
    },

    // ═══════════════════════════════════════════════════════════════════════
    // OFFENHEITS-WERTE (für Resonanz-Bonus)
    // ═══════════════════════════════════════════════════════════════════════
    // Osho: "Je offener zwei Flüsse, desto leichter münden sie ineinander"
    //
    // Formel: Bonus = (Offenheit_A + Offenheit_B) / 200 × MAX_BONUS

    IDENTITY_OPENNESS: {
        "cis": 0,           // Statische Qualität - Form ist klar
        "trans": 30,        // Wandel durchlebt - jetzt gefestigt
        "nonbinaer": 50,    // Transzendenz der Dualität
        "fluid": 80,        // Dynamische Qualität - ständige Bewegung
        "suchend": 100      // Reine Potentialität - Anfängergeist
    },

    IDENTITY_RESONANCE: {
        MAX_BONUS: 10,      // Maximaler Offenheits-Bonus
        WEIGHT: 0.15        // Gewichtung im Gesamt-Score (bereits bei WEIGHTS.geschlecht)
    },

    // ═══════════════════════════════════════════════════════════════════════
    // EXPLORATION-MODIFIER
    // ═══════════════════════════════════════════════════════════════════════
    // Reduziert Konfidenz wenn jemand "interessiert" ist

    EXPLORATION: {
        MODIFIER: 0.70  // 30% Reduktion bei Exploration
    },

    // ═══════════════════════════════════════════════════════════════════════
    // BEDÜRFNIS-INTEGRATION PRO FAKTOR
    // ═══════════════════════════════════════════════════════════════════════
    // Jeder Faktor (A, O, D, G) hat relevante Bedürfnisse die in die
    // Berechnung einfließen. Die Gewichtung bestimmt das Verhältnis
    // zwischen Matrix-Score und Bedürfnis-Match.
    //
    // Formel: Faktor = (Matrix × matrixWeight) + (BedürfnisMatch × needsWeight)

    NEEDS_INTEGRATION: {
        ENABLED: true,

        // Gewichtung: Matrix vs. Bedürfnisse pro Faktor
        FACTOR_WEIGHTS: {
            archetyp:     { matrix: 0.60, needs: 0.40 },
            orientierung: { matrix: 0.50, needs: 0.50 },
            dominanz:     { matrix: 0.50, needs: 0.50 },
            geschlecht:   { matrix: 0.60, needs: 0.40 }
        },

        // ─────────────────────────────────────────────────────────────────────
        // ARCHETYP-RELEVANTE BEDÜRFNISSE
        // ─────────────────────────────────────────────────────────────────────
        // Beziehungsphilosophie: Wie will ich Beziehung leben?
        ARCHETYP_NEEDS: [
            // Lebensplanung - Kernthemen
            "kinderwunsch",
            "langfristige_bindung",
            "verbindlichkeit",
            "gemeinsamer_wohnraum",
            "eigener_raum",
            "alltag_teilen",
            "treueversprechen",

            // Autonomie vs. Bindung
            "unabhaengigkeit",
            "selbstbestimmung",
            "zugehoerigkeit",
            "gemeinschaft",

            // Pirsig - Statisch/Dynamisch
            "statische_stabilitaet",
            "dynamische_evolution",

            // Osho - Nicht-Anhaften
            "nicht_anhaften_an_partner",
            "nicht_anhaften_an_familie",
            "liebe_ohne_beziehung",
            "commune_statt_kernfamilie",
            "polyamore_energie"
        ],

        // ─────────────────────────────────────────────────────────────────────
        // ORIENTIERUNG-RELEVANTE BEDÜRFNISSE
        // ─────────────────────────────────────────────────────────────────────
        // Sexuelle/romantische Anziehung: Was zieht mich an?
        ORIENTIERUNG_NEEDS: [
            // Sexualität - Kern
            "sexuelle_haeufigkeit",
            "sexuelle_experimentierfreude",
            "sexuelle_verbindung",
            "sexueller_ausdruck",
            "koerpernaehe",
            "koerperkontakt",

            // Intimität
            "intimitaet",
            "romantische_gesten",
            "koerperliche_lust",

            // Pirsig
            "biologische_anziehung",
            "qualitaet_der_beruehrung",
            "dynamische_liebe",

            // Osho - Tantra
            "sex_als_meditation",
            "hier_und_jetzt_intimitaet",
            "wildheit_und_zartheit",
            "orgastisches_leben",
            "meditation_zu_zweit",
            "polyamore_energie"
        ],

        // ─────────────────────────────────────────────────────────────────────
        // DOMINANZ-RELEVANTE BEDÜRFNISSE
        // ─────────────────────────────────────────────────────────────────────
        // Machtdynamik: Wer führt, wer folgt?
        DOMINANZ_NEEDS: [
            // Dynamik-Kategorie (GFK-Erweiterung)
            "kontrolle_ausueben",
            "hingabe",
            "fuehrung_geben",
            "gefuehrt_werden",
            "machtaustausch",
            "sich_fallenlassen",
            "verantwortung_uebernehmen",
            "dienend_sein",
            "beschuetzen",
            "nachsorge",
            "grenzen_setzen",
            "grenzen_respektieren",
            "intensitaet",
            "vertrauen_schenken",
            "ritual",

            // Pirsig - Statisch (Sub) vs. Dynamisch (Dom)
            "statische_stabilitaet",
            "dynamische_evolution",

            // Osho
            "nicht_anhaften_an_partner"
        ],

        // ─────────────────────────────────────────────────────────────────────
        // GESCHLECHT-RELEVANTE BEDÜRFNISSE
        // ─────────────────────────────────────────────────────────────────────
        // Identität & Ausdruck: Wer bin ich, wie zeige ich mich?
        GESCHLECHT_NEEDS: [
            // Identität
            "authentizitaet",
            "selbst_ausdruck",
            "echtheit",
            "integritaet",

            // Verständnis
            "akzeptanz",
            "gesehen_werden",
            "verstanden_werden",

            // Osho - Authentizität
            "eigene_wahrheit",
            "authentischer_ausdruck",
            "radikale_ehrlichkeit"
        ]
    }
};
