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
    // Logos (Verstand): 40% | Pathos (Gefühl): 60%

    WEIGHTS: {
        archetyp: 0.40,      // LOGOS - Beziehungsphilosophie
        orientierung: 0.25,  // PATHOS - Körperliche Polarität
        dominanz: 0.20,      // PATHOS - Energetische Dynamik
        geschlecht: 0.15     // PATHOS - Gender-Chemie
    },

    CATEGORIES: {
        logos: ['archetyp'],
        pathos: ['orientierung', 'dominanz', 'geschlecht']
    },

    // ═══════════════════════════════════════════════════════════════════════
    // RESONANZ-KONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════
    // R = 0.9 + [(M/100 × 0.5) + (B × 0.5)] × 0.2

    RESONANCE: {
        BASE: 0.9,           // Minimum Resonanz
        MAX_BOOST: 0.2,      // Maximum zusätzliche Resonanz
        PROFILE_WEIGHT: 0.5, // Gewicht Profil-Match
        BALANCE_WEIGHT: 0.5, // Gewicht Logos-Pathos-Balance

        // Platzhalter bis Profil-Attribute implementiert
        DEFAULT_PROFILE_MATCH: 50
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
    // GESCHLECHTS-ATTRAKTION
    // ═══════════════════════════════════════════════════════════════════════

    GENDER: {
        FULL_MATCH: 100,
        NON_BINARY_INVOLVED: 80,
        MIXED_ORIENTATION: 75
    },

    // ═══════════════════════════════════════════════════════════════════════
    // EXPLORATION-MODIFIER
    // ═══════════════════════════════════════════════════════════════════════
    // Reduziert Konfidenz wenn jemand "interessiert" ist

    EXPLORATION: {
        MODIFIER: 0.70  // 30% Reduktion bei Exploration
    }
};
