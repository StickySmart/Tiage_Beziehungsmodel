/**
 * TIAGE Server - Constants (ES Module)
 *
 * Migriert von: js/synthesis/constants.js
 * SSOT für alle Gewichte, Matrizen, Formeln
 */

// ═══════════════════════════════════════════════════════════════════════════
// FORMELN (SSOT für Dokumentation)
// ═══════════════════════════════════════════════════════════════════════════

export const FORMULAS = {
    main: {
        text: 'Q = [(O × wO × r1) + (A × wA × r2) + (D × wD × r3) + (G × wG × r4)]',
        description: 'Beziehungsqualitäts-Score mit dimensionalen Resonanzfaktoren (v3.1)',
        version: '3.1'
    },
    r_factor: {
        text: 'R = similarity²',
        description: 'Quadratische R-Formel mit Komplementär-Mapping (v3.2)',
        params: { min: 0, max: 1 },  // Keine künstlichen Grenzen
        thresholds: { resonance: 0.7, dissonance: 0.3 }
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// FAKTOR-GEWICHTE
// ═══════════════════════════════════════════════════════════════════════════

export const DEFAULT_WEIGHTS = {
    orientierung: 0.25,
    archetyp: 0.25,
    dominanz: 0.25,
    geschlecht: 0.25
};

export const WEIGHTS = { ...DEFAULT_WEIGHTS };

export const FACTOR_COMPOSITION = {
    archetyp:     { logos: 0.80, pathos: 0.20 },
    orientierung: { logos: 0.20, pathos: 0.80 },
    dominanz:     { logos: 0.20, pathos: 0.80 },
    geschlecht:   { primaer: 'logos', sekundaer: 'pathos' }
};

// ═══════════════════════════════════════════════════════════════════════════
// RESONANZ-KONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

export const RESONANCE = {
    BASE: 0.9,
    MAX_BOOST: 0.2,
    PROFILE_WEIGHT: 0.35,
    BALANCE_WEIGHT: 0.35,
    GFK_WEIGHT: 0.30,
    DEFAULT_PROFILE_MATCH: 50
};

export const RESONANCE_DIMENSIONAL = {
    ENABLED: true,
    DIMENSIONS: {
        identitaet:  { name: 'Identität', emoji: '💚', source: 'GESCHLECHT_NEEDS', weight: 0.25 },
        philosophie: { name: 'Philosophie', emoji: '🧠', source: 'ARCHETYP_NEEDS', weight: 0.25 },
        leben:       { name: 'Leben', emoji: '🔥', source: 'ORIENTIERUNG_NEEDS', weight: 0.25 },
        dynamik:     { name: 'Dynamik', emoji: '⚡', source: 'DOMINANZ_NEEDS', weight: 0.25 }
    },
    THRESHOLDS: { resonanz: 1.05, dissonanz: 0.95 }  // v3.4: Richtungsbasiert um 1.0
};

// ═══════════════════════════════════════════════════════════════════════════
// GFK-KOMPETENZ-MATRIX
// ═══════════════════════════════════════════════════════════════════════════

export const GFK_MATRIX = {
    "hoch-hoch": 1.0,
    "hoch-mittel": 0.75,
    "mittel-hoch": 0.75,
    "hoch-niedrig": 0.35,
    "niedrig-hoch": 0.35,
    "mittel-mittel": 0.5,
    "mittel-niedrig": 0.2,
    "niedrig-mittel": 0.2,
    "niedrig-niedrig": 0.0
};

export const GFK_LEVELS = {
    "hoch": 1.0,
    "mittel": 0.75,
    "niedrig": 0.35
};

// ═══════════════════════════════════════════════════════════════════════════
// DOMINANZ-HARMONIE-MATRIX
// ═══════════════════════════════════════════════════════════════════════════

export const DOMINANCE_MATRIX = {
    "dominant-submissiv": 100,
    "submissiv-dominant": 100,
    "ausgeglichen-ausgeglichen": 95,
    "switch-switch": 90,
    "switch-ausgeglichen": 88,
    "ausgeglichen-switch": 88,
    "dominant-ausgeglichen": 85,
    "ausgeglichen-dominant": 85,
    "submissiv-ausgeglichen": 85,
    "ausgeglichen-submissiv": 85,
    "switch-dominant": 80,
    "dominant-switch": 80,
    "switch-submissiv": 80,
    "submissiv-switch": 80,
    "dominant-dominant": 55,
    "submissiv-submissiv": 55
};

// ═══════════════════════════════════════════════════════════════════════════
// ORIENTIERUNGS-KOMPATIBILITÄT
// ═══════════════════════════════════════════════════════════════════════════

export const ORIENTATION = {
    COMPATIBLE: 100,
    EXPLORING: 70,
    UNLIKELY: 30,
    INCOMPATIBLE: 10,
    HARD_KO: 0
};

// ═══════════════════════════════════════════════════════════════════════════
// IDENTITÄTS-RESONANZ-MATRIX
// ═══════════════════════════════════════════════════════════════════════════

export const IDENTITY_MATRIX = {
    "cis-cis": 100,
    "cis-trans": 85,
    "cis-suchend": 70,
    "trans-cis": 85,
    "trans-trans": 100,
    "trans-suchend": 75,
    "nonbinaer-nonbinaer": 100,
    "nonbinaer-fluid": 90,
    "nonbinaer-suchend": 80,
    "fluid-nonbinaer": 90,
    "fluid-fluid": 100,
    "fluid-suchend": 85,
    "suchend-cis": 70,
    "suchend-trans": 75,
    "suchend-nonbinaer": 80,
    "suchend-fluid": 85,
    "suchend-suchend": 100,
    "cis-nonbinaer": 65,
    "cis-fluid": 55,
    "trans-nonbinaer": 75,
    "trans-fluid": 65,
    "nonbinaer-cis": 65,
    "nonbinaer-trans": 75,
    "fluid-cis": 55,
    "fluid-trans": 65
};

export const IDENTITY_OPENNESS = {
    "cis": 0,
    "trans": 30,
    "nonbinaer": 50,
    "fluid": 80,
    "suchend": 100
};

// IDENTITY_RESONANCE: Konstanten für R4-Berechnung (v3.6)
export const IDENTITY_RESONANCE = {
    // Hybrid-Formel: R4 = BASIS + (SIMILARITY_FACTOR × Openness-Bonus)
    SIMILARITY_FACTOR_MATCH: 1.3,    // Faktor wenn gleiche Identität
    SIMILARITY_FACTOR_DIFF: 1.0,     // Faktor wenn unterschiedliche Identität
    OPENNESS_DIVISOR: 200,           // Teiler für Openness-Normalisierung (0-1)
    // Legacy
    MAX_BONUS: 10,
    WEIGHT: 0.15,
    // NEU (v3.6): GOD-kombinierte Openness für R4
    // R4 berücksichtigt jetzt sowohl Geschlechts-Identität als auch Orientierung
    IDENTITY_WEIGHT: 0.5,            // 50% Gewichtung für Geschlechts-Identität (cis/trans/nb)
    ORIENTATION_WEIGHT: 0.5          // 50% Gewichtung für Orientierung (hetero/homo/bi)
};

// ORIENTIERUNGS-OFFENHEIT (für R1 Leben)
// Basiert auf Similarity-Attraction Theorie
export const ORIENTATION_OPENNESS = {
    // Monosexuell
    "hetero": 0,
    "homo": 0,
    // Mit Neugier
    "hetero-homo": 25,
    "homo-hetero": 25,
    // Aktive Erweiterung
    "hetero-bi": 50,
    "homo-bi": 50,
    // Bisexuell gelebt
    "bi": 75,
    // Bi mit Präferenz
    "bi-hetero": 90,
    "bi-homo": 90,
    // Voll offen
    "bi-bi": 100
};

// ═══════════════════════════════════════════════════════════════════════════
// SOFT-KO / HARD-KO KRITERIEN
// ═══════════════════════════════════════════════════════════════════════════

export const HARD_KO = {
    ENABLED: true,
    MESSAGE_KEY: 'hardKO'
};

export const SOFT_KO = {
    ENABLED: true,
    THRESHOLDS: { CRITICAL: 50, HIGH: 35, MODERATE: 20 },
    MIN_CRITICAL_CONFLICTS: 3,
    SCORE_PENALTY: 0.3
};

export const PS_VALIDATION = {
    ENABLED: true,
    COMPLEMENTARY_BONUS: 10,
    SECONDARY_WEIGHT: 0.5
};

export const GENDER = {
    FULL_MATCH: 100,
    NON_BINARY_INVOLVED: 80,
    MIXED_ORIENTATION: 75
};

export const EXPLORATION = {
    MODIFIER: 0.70
};

// ═══════════════════════════════════════════════════════════════════════════
// BEDÜRFNIS-INTEGRATION
// ═══════════════════════════════════════════════════════════════════════════

export const NEEDS_INTEGRATION = {
    ENABLED: true,
    // Komplementäre Bedürfnis-Paare (v3.2) - DEPRECATED
    // @deprecated v3.5 - Daten jetzt in beduerfnis-katalog.json (kohaerenz.komplementaer)
    COMPLEMENTARY_PAIRS: {
        '#B74': '#B75',   // Kontrolle-ausüben ↔ Hingabe
        '#B75': '#B74',
        '#B76': '#B77',   // Führung-geben ↔ Geführt-werden
        '#B77': '#B76',
        '#B216': '#B215', // Dominieren ↔ Demütig-sein
        '#B215': '#B216',
        '#B222': '#B221', // Schmerz-geben ↔ Schmerzerleben
        '#B221': '#B222',
        '#B212': '#B223', // Bondage-geben ↔ Bondage-erleben
        '#B223': '#B212',
        '#B218': '#B217', // Bestrafen ↔ Bestrafung-erhalten
        '#B217': '#B218',
        '#B219': '#B220', // Service-geben ↔ Service-empfangen
        '#B220': '#B219',
        '#B88': '#B225',  // Beschützen ↔ Beschützt-werden
        '#B225': '#B88',
        '#B83': '#B226',  // Vertrauen-schenken ↔ Vertrauen-empfangen
        '#B226': '#B83',
        '#B214': '#B213', // Anbetung ↔ Devotion
        '#B213': '#B214'
    },
    FACTOR_WEIGHTS: {
        archetyp:     { matrix: 0.60, needs: 0.40 },
        orientierung: { matrix: 0.50, needs: 0.50 },
        dominanz:     { matrix: 0.50, needs: 0.50 },
        geschlecht:   { matrix: 0.60, needs: 0.40 }
    },
    ARCHETYP_NEEDS: [
        "kinderwunsch", "langfristige_bindung", "verbindlichkeit",
        "gemeinsamer_wohnraum", "eigener_raum", "alltag_teilen",
        "unabhaengigkeit", "selbstbestimmung", "zugehoerigkeit", "gemeinschaft"
    ],
    ORIENTIERUNG_NEEDS: [
        "sexuelle_haeufigkeit", "sexuelle_experimentierfreude", "sexuelle_verbindung",
        "koerpernaehe", "intimitaet", "koerperliche_lust"
    ],
    DOMINANZ_NEEDS: [
        "kontrolle_ausueben", "hingabe", "fuehrung_geben", "gefuehrt_werden",
        "machtaustausch", "sich_fallenlassen"
    ],
    GESCHLECHT_NEEDS: [
        "authentizitaet", "selbst_ausdruck", "akzeptanz", "gesehen_werden"
    ]
};

// ═══════════════════════════════════════════════════════════════════════════
// ARCHETYP-KOHÄRENZ (für R-Faktoren) - DEPRECATED
// ═══════════════════════════════════════════════════════════════════════════
// @deprecated v3.5 - Daten jetzt in beduerfnis-katalog.json (kohaerenz.rFaktor, kohaerenz.typischeWerte)
// Verwende NeedsIntegration.getNeedsByRFaktor() / buildExpectedValuesFromKatalog()

export const ARCHETYP_KOHAERENZ = {
    leben: {
        single:     { sexuelle_experimentierfreude: 50, sexuelle_verbindung: 30, koerpernaehe: 40, intimitaet: 30 },
        duo:        { sexuelle_experimentierfreude: 40, sexuelle_verbindung: 90, koerpernaehe: 85, intimitaet: 90 },
        duo_flex:   { sexuelle_experimentierfreude: 70, sexuelle_verbindung: 75, koerpernaehe: 75, intimitaet: 80 },
        solopoly:   { sexuelle_experimentierfreude: 85, sexuelle_verbindung: 60, koerpernaehe: 60, intimitaet: 50 },
        polyamor:   { sexuelle_experimentierfreude: 80, sexuelle_verbindung: 85, koerpernaehe: 75, intimitaet: 85 },
        ra:         { sexuelle_experimentierfreude: 75, sexuelle_verbindung: 60, koerpernaehe: 50, intimitaet: 60 },
        lat:        { sexuelle_experimentierfreude: 50, sexuelle_verbindung: 80, koerpernaehe: 60, intimitaet: 75 },
        aromantisch:{ sexuelle_experimentierfreude: 40, sexuelle_verbindung: 20, koerpernaehe: 30, intimitaet: 25 }
    },
    dynamik: {
        single:     { kontrolle_ausueben: 50, hingabe: 30, unabhaengigkeit: 90 },
        duo:        { kontrolle_ausueben: 50, hingabe: 60, unabhaengigkeit: 50 },
        duo_flex:   { kontrolle_ausueben: 55, hingabe: 55, unabhaengigkeit: 65 },
        solopoly:   { kontrolle_ausueben: 40, hingabe: 40, unabhaengigkeit: 95 },
        polyamor:   { kontrolle_ausueben: 45, hingabe: 60, unabhaengigkeit: 70 },
        ra:         { kontrolle_ausueben: 30, hingabe: 50, unabhaengigkeit: 90 },
        lat:        { kontrolle_ausueben: 40, hingabe: 55, unabhaengigkeit: 80 },
        aromantisch:{ kontrolle_ausueben: 40, hingabe: 25, unabhaengigkeit: 85 }
    },
    identitaet: {
        single:     { authentizitaet: 85, selbst_ausdruck: 80, akzeptanz: 70, gesehen_werden: 60 },
        duo:        { authentizitaet: 75, selbst_ausdruck: 70, akzeptanz: 85, gesehen_werden: 90 },
        duo_flex:   { authentizitaet: 80, selbst_ausdruck: 75, akzeptanz: 80, gesehen_werden: 80 },
        solopoly:   { authentizitaet: 95, selbst_ausdruck: 90, akzeptanz: 75, gesehen_werden: 70 },
        polyamor:   { authentizitaet: 85, selbst_ausdruck: 85, akzeptanz: 85, gesehen_werden: 85 },
        ra:         { authentizitaet: 95, selbst_ausdruck: 95, akzeptanz: 80, gesehen_werden: 70 },
        lat:        { authentizitaet: 85, selbst_ausdruck: 80, akzeptanz: 80, gesehen_werden: 80 },
        aromantisch:{ authentizitaet: 90, selbst_ausdruck: 85, akzeptanz: 90, gesehen_werden: 75 }
    },
    philosophie: {
        single:     { kinderwunsch: 20, langfristige_bindung: 15, unabhaengigkeit: 95, selbstbestimmung: 95 },
        duo:        { kinderwunsch: 75, langfristige_bindung: 95, unabhaengigkeit: 40, selbstbestimmung: 50 },
        duo_flex:   { kinderwunsch: 60, langfristige_bindung: 85, unabhaengigkeit: 60, selbstbestimmung: 65 },
        solopoly:   { kinderwunsch: 30, langfristige_bindung: 50, unabhaengigkeit: 95, selbstbestimmung: 95 },
        polyamor:   { kinderwunsch: 50, langfristige_bindung: 75, unabhaengigkeit: 70, selbstbestimmung: 75 },
        ra:         { kinderwunsch: 35, langfristige_bindung: 40, unabhaengigkeit: 90, selbstbestimmung: 95 },
        lat:        { kinderwunsch: 55, langfristige_bindung: 80, unabhaengigkeit: 75, selbstbestimmung: 80 },
        aromantisch:{ kinderwunsch: 25, langfristige_bindung: 30, unabhaengigkeit: 85, selbstbestimmung: 90 }
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

export function getWeights(customWeights = null) {
    if (customWeights) {
        // Relative Gewichte: Nutzer gibt beliebige Werte, System normalisiert auf Summe=1.0
        const O = customWeights.O || 25;
        const A = customWeights.A || 25;
        const D = customWeights.D || 25;
        const G = customWeights.G || 25;
        const sum = O + A + D + G;

        return {
            orientierung: O / sum,
            archetyp: A / sum,
            dominanz: D / sum,
            geschlecht: G / sum
        };
    }
    return DEFAULT_WEIGHTS;
}

// Default export für einfachen Import
export default {
    FORMULAS,
    DEFAULT_WEIGHTS,
    WEIGHTS,
    FACTOR_COMPOSITION,
    RESONANCE,
    RESONANCE_DIMENSIONAL,
    GFK_MATRIX,
    GFK_LEVELS,
    DOMINANCE_MATRIX,
    ORIENTATION,
    IDENTITY_MATRIX,
    IDENTITY_OPENNESS,
    IDENTITY_RESONANCE,
    ORIENTATION_OPENNESS,
    HARD_KO,
    SOFT_KO,
    PS_VALIDATION,
    GENDER,
    EXPLORATION,
    NEEDS_INTEGRATION,
    ARCHETYP_KOHAERENZ,
    getWeights
};
