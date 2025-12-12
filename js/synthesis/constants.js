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
        // R_Leben (Orientierungs-Bedürfnisse) - für R1
        // Bedürfnisse: (kein #BID), (kein #BID), #B204, #B20
        // HINWEIS: sexuelle_experimentierfreude, sexuelle_verbindung fehlen in beduerfnis-ids.js
        // ═══════════════════════════════════════════════════════════════════
        leben: {
            single: {
                sexuelle_experimentierfreude: 50,  // (kein #BID) - Offen, aber nicht zentral
                sexuelle_verbindung: 30,           // (kein #BID) - Gering - Fokus auf Selbst
                koerpernaehe: 40,                  // #B204
                intimitaet: 30                     // #B20
            },
            duo: {
                sexuelle_experimentierfreude: 40,  // (kein #BID) - Eher konservativ
                sexuelle_verbindung: 90,           // (kein #BID) - Sehr wichtig - exklusiv
                koerpernaehe: 85,                  // #B204
                intimitaet: 90                     // #B20
            },
            duo_flex: {
                sexuelle_experimentierfreude: 70,  // (kein #BID) - Offen für Neues
                sexuelle_verbindung: 75,           // (kein #BID)
                koerpernaehe: 75,                  // #B204
                intimitaet: 80                     // #B20
            },
            solopoly: {
                sexuelle_experimentierfreude: 85,  // (kein #BID) - Hoch - viel Exploration
                sexuelle_verbindung: 60,           // (kein #BID) - Moderat - Autonomie wichtiger
                koerpernaehe: 60,                  // #B204
                intimitaet: 50                     // #B20
            },
            polyamor: {
                sexuelle_experimentierfreude: 80,  // (kein #BID)
                sexuelle_verbindung: 85,           // (kein #BID) - Hoch - tiefe Verbindungen
                koerpernaehe: 75,                  // #B204
                intimitaet: 85                     // #B20
            },
            ra: {
                sexuelle_experimentierfreude: 75,  // (kein #BID) - Keine Regeln
                sexuelle_verbindung: 60,           // (kein #BID) - Variabel
                koerpernaehe: 50,                  // #B204
                intimitaet: 60                     // #B20
            },
            lat: {
                sexuelle_experimentierfreude: 50,  // (kein #BID)
                sexuelle_verbindung: 80,           // (kein #BID) - Wichtig trotz Distanz
                koerpernaehe: 60,                  // #B204
                intimitaet: 75                     // #B20
            },
            aromantisch: {
                sexuelle_experimentierfreude: 40,  // (kein #BID) - Kann variieren
                sexuelle_verbindung: 20,           // (kein #BID) - Gering - keine Romantik
                koerpernaehe: 30,                  // #B204
                intimitaet: 25                     // #B20
            }
        },

        // ═══════════════════════════════════════════════════════════════════
        // R_Dynamik (Dominanz-Bedürfnisse) - für R3
        // Bedürfnisse: #B74, #B75, #B76, #B77, #B36
        // HINWEIS: autonomie → verwende unabhaengigkeit #B36
        // ═══════════════════════════════════════════════════════════════════
        dynamik: {
            single: {
                kontrolle_ausueben: 50,            // #B74 - Selbstbestimmt
                hingabe: 30,                       // #B75
                fuehrung_geben: 50,                // #B76
                gefuehrt_werden: 30,               // #B77
                autonomie: 90                       // → #B36 unabhaengigkeit - Sehr hoch
            },
            duo: {
                kontrolle_ausueben: 50,            // #B74
                hingabe: 60,                        // #B75 - Bereitschaft zur Hingabe
                fuehrung_geben: 50,                // #B76
                gefuehrt_werden: 50,               // #B77
                autonomie: 50                       // → #B36 unabhaengigkeit - Balance
            },
            duo_flex: {
                kontrolle_ausueben: 55,            // #B74
                hingabe: 55,                       // #B75
                fuehrung_geben: 55,                // #B76
                gefuehrt_werden: 50,               // #B77
                autonomie: 65                      // → #B36 unabhaengigkeit
            },
            solopoly: {
                kontrolle_ausueben: 40,            // #B74
                hingabe: 40,                       // #B75
                fuehrung_geben: 45,                // #B76
                gefuehrt_werden: 40,               // #B77
                autonomie: 95                       // → #B36 unabhaengigkeit - Maximum
            },
            polyamor: {
                kontrolle_ausueben: 45,            // #B74
                hingabe: 60,                       // #B75
                fuehrung_geben: 50,                // #B76
                gefuehrt_werden: 55,               // #B77
                autonomie: 70                      // → #B36 unabhaengigkeit
            },
            ra: {
                kontrolle_ausueben: 30,             // #B74 - Keine Hierarchien
                hingabe: 50,                       // #B75
                fuehrung_geben: 30,                // #B76
                gefuehrt_werden: 30,               // #B77
                autonomie: 90                      // → #B36 unabhaengigkeit
            },
            lat: {
                kontrolle_ausueben: 40,            // #B74
                hingabe: 55,                       // #B75
                fuehrung_geben: 45,                // #B76
                gefuehrt_werden: 50,               // #B77
                autonomie: 80                       // → #B36 unabhaengigkeit - Wichtig für LAT
            },
            aromantisch: {
                kontrolle_ausueben: 40,            // #B74
                hingabe: 25,                        // #B75 - Gering - keine romantische Hingabe
                fuehrung_geben: 40,                // #B76
                gefuehrt_werden: 30,               // #B77
                autonomie: 85                      // → #B36 unabhaengigkeit
            }
        },

        // ═══════════════════════════════════════════════════════════════════
        // R_Identität (Geschlechts-Bedürfnisse) - für R4
        // Bedürfnisse: #B50, #B67, #B25, #B31
        // ═══════════════════════════════════════════════════════════════════
        identitaet: {
            single: {
                authentizitaet: 85,                 // #B50 - Hoch - Selbstfokus
                selbst_ausdruck: 80,               // #B67
                akzeptanz: 70,                     // #B25
                gesehen_werden: 60                 // #B31
            },
            duo: {
                authentizitaet: 75,                // #B50
                selbst_ausdruck: 70,               // #B67
                akzeptanz: 85,                      // #B25 - Wichtig - vom Partner
                gesehen_werden: 90                 // #B31
            },
            duo_flex: {
                authentizitaet: 80,                // #B50
                selbst_ausdruck: 75,               // #B67
                akzeptanz: 80,                     // #B25
                gesehen_werden: 80                 // #B31
            },
            solopoly: {
                authentizitaet: 95,                 // #B50 - Maximum - eigene Wahrheit
                selbst_ausdruck: 90,               // #B67
                akzeptanz: 75,                     // #B25
                gesehen_werden: 70                 // #B31
            },
            polyamor: {
                authentizitaet: 85,                // #B50
                selbst_ausdruck: 85,               // #B67
                akzeptanz: 85,                     // #B25
                gesehen_werden: 85                 // #B31
            },
            ra: {
                authentizitaet: 95,                 // #B50 - Keine Labels
                selbst_ausdruck: 95,               // #B67
                akzeptanz: 80,                     // #B25
                gesehen_werden: 70                 // #B31
            },
            lat: {
                authentizitaet: 85,                // #B50
                selbst_ausdruck: 80,               // #B67
                akzeptanz: 80,                     // #B25
                gesehen_werden: 80                 // #B31
            },
            aromantisch: {
                authentizitaet: 90,                 // #B50 - Hoch - gegen Normen
                selbst_ausdruck: 85,               // #B67
                akzeptanz: 90,                      // #B25 - Braucht Akzeptanz
                gesehen_werden: 75                 // #B31
            }
        },

        // ═══════════════════════════════════════════════════════════════════
        // R_Philosophie (Archetyp-Bedürfnisse) - für R2
        // Bedürfnisse: #B90, #B96, #B95, #B99, #B103, #B102, #B36, #B34, #B42, #B41
        // ═══════════════════════════════════════════════════════════════════
        philosophie: {
            single: {
                kinderwunsch: 20,                   // #B90 - Gering - kein Partner
                langfristige_bindung: 15,          // #B96 - Minimal
                verbindlichkeit: 20,               // #B95
                gemeinsamer_wohnraum: 10,          // #B99
                eigener_raum: 95,                   // #B103 - Maximum
                alltag_teilen: 20,                 // #B102
                unabhaengigkeit: 95,               // #B36
                selbstbestimmung: 95,              // #B34
                zugehoerigkeit: 40,                // #B42
                gemeinschaft: 50                   // #B41
            },
            duo: {
                kinderwunsch: 75,                   // #B90 - Hoch - traditionell
                langfristige_bindung: 95,          // #B96 - Maximum - Lebenspartner
                verbindlichkeit: 95,               // #B95
                gemeinsamer_wohnraum: 90,          // #B99
                eigener_raum: 30,                  // #B103
                alltag_teilen: 90,                 // #B102
                unabhaengigkeit: 40,               // #B36
                selbstbestimmung: 50,              // #B34
                zugehoerigkeit: 90,                // #B42
                gemeinschaft: 70                   // #B41
            },
            duo_flex: {
                kinderwunsch: 60,                  // #B90
                langfristige_bindung: 85,          // #B96
                verbindlichkeit: 80,               // #B95
                gemeinsamer_wohnraum: 75,          // #B99
                eigener_raum: 50,                  // #B103
                alltag_teilen: 75,                 // #B102
                unabhaengigkeit: 60,               // #B36
                selbstbestimmung: 65,              // #B34
                zugehoerigkeit: 80,                // #B42
                gemeinschaft: 75                   // #B41
            },
            solopoly: {
                kinderwunsch: 30,                  // #B90
                langfristige_bindung: 50,          // #B96
                verbindlichkeit: 45,               // #B95
                gemeinsamer_wohnraum: 20,          // #B99
                eigener_raum: 90,                   // #B103 - Sehr hoch
                alltag_teilen: 35,                 // #B102
                unabhaengigkeit: 95,               // #B36
                selbstbestimmung: 95,              // #B34
                zugehoerigkeit: 60,                // #B42
                gemeinschaft: 70                   // #B41
            },
            polyamor: {
                kinderwunsch: 50,                  // #B90
                langfristige_bindung: 75,          // #B96
                verbindlichkeit: 70,               // #B95
                gemeinsamer_wohnraum: 60,          // #B99
                eigener_raum: 60,                  // #B103
                alltag_teilen: 65,                 // #B102
                unabhaengigkeit: 70,               // #B36
                selbstbestimmung: 75,              // #B34
                zugehoerigkeit: 85,                // #B42
                gemeinschaft: 90                    // #B41 - Polycule
            },
            ra: {
                kinderwunsch: 35,                  // #B90
                langfristige_bindung: 40,          // #B96
                verbindlichkeit: 30,                // #B95 - Keine Hierarchien
                gemeinsamer_wohnraum: 35,          // #B99
                eigener_raum: 80,                  // #B103
                alltag_teilen: 40,                 // #B102
                unabhaengigkeit: 90,               // #B36
                selbstbestimmung: 95,              // #B34
                zugehoerigkeit: 70,                // #B42
                gemeinschaft: 85                   // #B41
            },
            lat: {
                kinderwunsch: 55,                  // #B90
                langfristige_bindung: 80,          // #B96
                verbindlichkeit: 80,               // #B95
                gemeinsamer_wohnraum: 25,           // #B99 - Getrennt wohnen!
                eigener_raum: 85,                  // #B103
                alltag_teilen: 45,                 // #B102
                unabhaengigkeit: 75,               // #B36
                selbstbestimmung: 80,              // #B34
                zugehoerigkeit: 75,                // #B42
                gemeinschaft: 60                   // #B41
            },
            aromantisch: {
                kinderwunsch: 25,                  // #B90
                langfristige_bindung: 30,          // #B96
                verbindlichkeit: 35,               // #B95
                gemeinsamer_wohnraum: 30,          // #B99
                eigener_raum: 80,                  // #B103
                alltag_teilen: 40,                 // #B102
                unabhaengigkeit: 85,               // #B36
                selbstbestimmung: 90,              // #B34
                zugehoerigkeit: 65,                 // #B42 - Freundschaften wichtig
                gemeinschaft: 75                   // #B41
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
