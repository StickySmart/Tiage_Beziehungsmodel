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
        archetyp: 0.15,      // 80% Logos / 20% Pathos
        orientierung: 0.40,  // 20% Logos / 80% Pathos
        dominanz: 0.20,      // 20% Logos / 80% Pathos
        geschlecht: 0.25     // Primär: Logos, Sekundär: Pathos
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
