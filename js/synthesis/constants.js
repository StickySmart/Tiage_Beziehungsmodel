/**
 * TIAGE SYNTHESE - Konstanten
 *
 * SSOT (Single Source of Truth) für alle Gewichte, Matrizen, Formeln
 * und Konfigurationen der Beziehungsqualitäts-Berechnung.
 *
 * Hauptformel (v3.1): Q = [(O × wO × r1) + (A × wA × r2) + (D × wD × r3) + (G × wG × r4)]
 */

var TiageSynthesis = TiageSynthesis || {};

TiageSynthesis.Constants = {

    // ═══════════════════════════════════════════════════════════════════════
    // FORMELN (SSOT für Dokumentation und UI)
    // ═══════════════════════════════════════════════════════════════════════
    // Alle Formeln zentral definiert - help-texts.js referenziert diese Werte

    FORMULAS: {
        // Hauptformel v3.1 mit dimensionalen Resonanzfaktoren
        main: {
            text: 'Q = [(O × wO × r1) + (A × wA × r2) + (D × wD × r3) + (G × wG × r4)]',
            html: 'Q = (O×w<sub>O</sub>×r₁) + (A×w<sub>A</sub>×r₂) + (D×w<sub>D</sub>×r₃) + (G×w<sub>G</sub>×r₄)',
            description: 'Beziehungsqualitäts-Score mit dimensionalen Resonanzfaktoren (v3.1)',
            version: '3.1'
        },

        // R-Faktor Formel (dimensional)
        r_factor: {
            text: 'R = 0.5 + (Übereinstimmung × 1.0)',
            html: 'R = 0.5 + (Übereinstimmung × 1.0)',
            description: 'Dimensionaler Resonanzfaktor',
            params: {
                base: 0.5,
                multiplier: 1.0,
                min: 0.5,
                max: 1.5
            },
            thresholds: {
                resonance: 1.05,    // R ≥ 1.05 = verstärkt Score
                dissonance: 0.97,   // R ≤ 0.97 = schwächt Score
                neutral: [0.97, 1.05]  // Dazwischen = neutral
            }
        },

        // Legacy Resonanzformel (Fallback, wird nicht mehr aktiv genutzt)
        r_legacy: {
            text: 'R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2',
            html: 'R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2',
            description: 'Legacy Resonanzformel (v2.x, nicht mehr aktiv)',
            params: {
                base: 0.9,
                max_boost: 0.2,
                profile_weight: 0.35,
                balance_weight: 0.35,
                gfk_weight: 0.30
            }
        },

        // Bedürfnis-Matching Formeln
        needs_matching: {
            similarity: {
                text: 'Ähnlichkeit = 100 - |Wert₁ - Wert₂|',
                html: 'Ähnlichkeit = 100 - |Wert<sub>1</sub> - Wert<sub>2</sub>|',
                description: 'Ähnlichkeit zwischen zwei Bedürfniswerten'
            },
            weight: {
                text: 'Gewicht = (Wert₁ + Wert₂) / 2',
                html: 'Gewicht = (Wert<sub>1</sub> + Wert<sub>2</sub>) / 2',
                description: 'Gewichtung basiert auf durchschnittlicher Wichtigkeit'
            },
            contribution: {
                text: 'Beitrag = Ähnlichkeit × Gewicht',
                html: 'Beitrag = Ähnlichkeit × Gewicht',
                description: 'Gewichteter Beitrag eines Bedürfnisses zum Gesamtscore'
            },
            total: {
                text: 'Gesamt-Score = Σ(Beitrag) / Σ(Gewicht)',
                html: 'Gesamt-Score = Σ(Beitrag) / Σ(Gewicht)',
                description: 'Gesamtscore über alle Bedürfnisse'
            }
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // FAKTOR-GEWICHTE
    // ═══════════════════════════════════════════════════════════════════════
    // Jeder Faktor hat eine Logos/Pathos-Mischung:
    // - Archetyp:     80% Logos / 20% Pathos (Beziehungsphilosophie)
    // - Orientierung: 20% Logos / 80% Pathos (Körperliche Polarität)
    // - Dominanz:     20% Logos / 80% Pathos (Energetische Dynamik)
    // - Geschlecht:   Primär = Logos, Sekundär = Pathos

    // WEIGHTS werden dynamisch aus UI geladen (Standard: 25/25/25/25)
    // Getter-Funktion für aktuelle Gewichtungen
    getWeights: function() {
        // PRIORITÄT 1: AGOD-Gewichtungen aus sessionStorage (Synthese-Eingabefelder)
        // Diese werden bei jedem Seitenladen auf 4x 25% zurückgesetzt
        try {
            var agodStored = sessionStorage.getItem('tiageAgodWeights');
            if (agodStored) {
                var agod = JSON.parse(agodStored);
                var sum = (agod.O || 0) + (agod.A || 0) + (agod.D || 0) + (agod.G || 0);
                var divisor = sum > 0 ? sum : 100;
                return {
                    orientierung: (agod.O || 25) / divisor,
                    archetyp: (agod.A || 25) / divisor,
                    dominanz: (agod.D || 25) / divisor,
                    geschlecht: (agod.G || 25) / divisor
                };
            }
        } catch (e) {
            console.warn('[TiageSynthesis] Could not load AGOD weights from sessionStorage:', e);
        }

        // PRIORITÄT 2: UI-Gewichtungen (GewichtungCard)
        if (typeof getGewichtungen === 'function') {
            var gew = getGewichtungen();
            return {
                orientierung: (gew.O || 25) / 100,
                archetyp: (gew.A || 25) / 100,
                dominanz: (gew.D || 25) / 100,
                geschlecht: (gew.G || 25) / 100
            };
        }
        // Fallback: Standard-Gewichtungen
        return this.DEFAULT_WEIGHTS;
    },

    // Standard-Gewichtungen (UI-Defaults, gleichverteilt)
    DEFAULT_WEIGHTS: {
        orientierung: 0.25,  // 25% - Sexuelle Orientierung
        archetyp: 0.25,      // 25% - Beziehungsphilosophie
        dominanz: 0.25,      // 25% - Dom/Sub/Switch Dynamik
        geschlecht: 0.25     // 25% - Gender-Attraktion
    },

    // Legacy: Für Abwärtskompatibilität (wird von getWeights() überschrieben)
    WEIGHTS: {
        orientierung: 0.25,  // 25% - Sexuelle Orientierung
        archetyp: 0.25,      // 25% - Beziehungsphilosophie
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
    // Formel pro Dimension: R_dim = 0.5 + (Übereinstimmung × 1.0)
    // Range: 0.5 (keine Übereinstimmung) bis 1.5 (perfekte Übereinstimmung)
    //
    // Schwellenwerte:
    //   R ≥ 1.25 → Resonanz ⬆️
    //   R ≤ 0.75 → Dissonanz ⬇️
    //   R 0.75-1.25 → Neutral ➡️
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
    // Definiert die archetyp-typischen Bedürfnis-Ausprägungen.
    // R_dim = Übereinstimmung zwischen tatsächlichen und archetyp-typischen Werten.
    //
    // Werte: 0-100 (archetyp-typische Ausprägung für kohärentes Profil)
    // null = Bedürfnis ist für diesen Archetyp nicht relevant
    //
    ARCHETYP_KOHAERENZ: {
        // ═══════════════════════════════════════════════════════════════════
        // R_Leben (Orientierungs-Bedürfnisse) - für R1
        // Alle 4 Bedürfnisse haben nun #B-IDs: #B221, #B222, #B204, #B20
        // ═══════════════════════════════════════════════════════════════════
        leben: {
            single: {
                sexuelle_experimentierfreude: { value: 50, id: '#B221', label: 'Sexuelle Experimentierfreude' },
                sexuelle_verbindung:          { value: 30, id: '#B222', label: 'Sexuelle Verbindung' },
                koerpernaehe:                 { value: 40, id: '#B204', label: 'Körpernähe' },
                intimitaet:                   { value: 30, id: '#B20', label: 'Intimität' }
            },
            duo: {
                sexuelle_experimentierfreude: { value: 40, id: '#B221', label: 'Sexuelle Experimentierfreude' },
                sexuelle_verbindung:          { value: 90, id: '#B222', label: 'Sexuelle Verbindung' },
                koerpernaehe:                 { value: 85, id: '#B204', label: 'Körpernähe' },
                intimitaet:                   { value: 90, id: '#B20', label: 'Intimität' }
            },
            duo_flex: {
                sexuelle_experimentierfreude: { value: 70, id: '#B221', label: 'Sexuelle Experimentierfreude' },
                sexuelle_verbindung:          { value: 75, id: '#B222', label: 'Sexuelle Verbindung' },
                koerpernaehe:                 { value: 75, id: '#B204', label: 'Körpernähe' },
                intimitaet:                   { value: 80, id: '#B20', label: 'Intimität' }
            },
            solopoly: {
                sexuelle_experimentierfreude: { value: 85, id: '#B221', label: 'Sexuelle Experimentierfreude' },
                sexuelle_verbindung:          { value: 60, id: '#B222', label: 'Sexuelle Verbindung' },
                koerpernaehe:                 { value: 60, id: '#B204', label: 'Körpernähe' },
                intimitaet:                   { value: 50, id: '#B20', label: 'Intimität' }
            },
            polyamor: {
                sexuelle_experimentierfreude: { value: 80, id: '#B221', label: 'Sexuelle Experimentierfreude' },
                sexuelle_verbindung:          { value: 85, id: '#B222', label: 'Sexuelle Verbindung' },
                koerpernaehe:                 { value: 75, id: '#B204', label: 'Körpernähe' },
                intimitaet:                   { value: 85, id: '#B20', label: 'Intimität' }
            },
            ra: {
                sexuelle_experimentierfreude: { value: 75, id: '#B221', label: 'Sexuelle Experimentierfreude' },
                sexuelle_verbindung:          { value: 60, id: '#B222', label: 'Sexuelle Verbindung' },
                koerpernaehe:                 { value: 50, id: '#B204', label: 'Körpernähe' },
                intimitaet:                   { value: 60, id: '#B20', label: 'Intimität' }
            },
            lat: {
                sexuelle_experimentierfreude: { value: 50, id: '#B221', label: 'Sexuelle Experimentierfreude' },
                sexuelle_verbindung:          { value: 80, id: '#B222', label: 'Sexuelle Verbindung' },
                koerpernaehe:                 { value: 60, id: '#B204', label: 'Körpernähe' },
                intimitaet:                   { value: 75, id: '#B20', label: 'Intimität' }
            },
            aromantisch: {
                sexuelle_experimentierfreude: { value: 40, id: '#B221', label: 'Sexuelle Experimentierfreude' },
                sexuelle_verbindung:          { value: 20, id: '#B222', label: 'Sexuelle Verbindung' },
                koerpernaehe:                 { value: 30, id: '#B204', label: 'Körpernähe' },
                intimitaet:                   { value: 25, id: '#B20', label: 'Intimität' }
            }
        },

        // ═══════════════════════════════════════════════════════════════════
        // R_Dynamik (Dominanz-Bedürfnisse) - für R3
        // HINWEIS: autonomie → verwende unabhaengigkeit #B36
        // ═══════════════════════════════════════════════════════════════════
        dynamik: {
            single: {
                kontrolle_ausueben: { value: 50, id: '#B74', label: 'Kontrolle ausüben' },
                hingabe:            { value: 30, id: '#B75', label: 'Hingabe' },
                fuehrung_geben:     { value: 50, id: '#B76', label: 'Führung geben' },
                gefuehrt_werden:    { value: 30, id: '#B77', label: 'Geführt werden' },
                unabhaengigkeit:    { value: 90, id: '#B36', label: 'Unabhängigkeit' }
            },
            duo: {
                kontrolle_ausueben: { value: 50, id: '#B74', label: 'Kontrolle ausüben' },
                hingabe:            { value: 60, id: '#B75', label: 'Hingabe' },
                fuehrung_geben:     { value: 50, id: '#B76', label: 'Führung geben' },
                gefuehrt_werden:    { value: 50, id: '#B77', label: 'Geführt werden' },
                unabhaengigkeit:    { value: 50, id: '#B36', label: 'Unabhängigkeit' }
            },
            duo_flex: {
                kontrolle_ausueben: { value: 55, id: '#B74', label: 'Kontrolle ausüben' },
                hingabe:            { value: 55, id: '#B75', label: 'Hingabe' },
                fuehrung_geben:     { value: 55, id: '#B76', label: 'Führung geben' },
                gefuehrt_werden:    { value: 50, id: '#B77', label: 'Geführt werden' },
                unabhaengigkeit:    { value: 65, id: '#B36', label: 'Unabhängigkeit' }
            },
            solopoly: {
                kontrolle_ausueben: { value: 40, id: '#B74', label: 'Kontrolle ausüben' },
                hingabe:            { value: 40, id: '#B75', label: 'Hingabe' },
                fuehrung_geben:     { value: 45, id: '#B76', label: 'Führung geben' },
                gefuehrt_werden:    { value: 40, id: '#B77', label: 'Geführt werden' },
                unabhaengigkeit:    { value: 95, id: '#B36', label: 'Unabhängigkeit' }
            },
            polyamor: {
                kontrolle_ausueben: { value: 45, id: '#B74', label: 'Kontrolle ausüben' },
                hingabe:            { value: 60, id: '#B75', label: 'Hingabe' },
                fuehrung_geben:     { value: 50, id: '#B76', label: 'Führung geben' },
                gefuehrt_werden:    { value: 55, id: '#B77', label: 'Geführt werden' },
                unabhaengigkeit:    { value: 70, id: '#B36', label: 'Unabhängigkeit' }
            },
            ra: {
                kontrolle_ausueben: { value: 30, id: '#B74', label: 'Kontrolle ausüben' },
                hingabe:            { value: 50, id: '#B75', label: 'Hingabe' },
                fuehrung_geben:     { value: 30, id: '#B76', label: 'Führung geben' },
                gefuehrt_werden:    { value: 30, id: '#B77', label: 'Geführt werden' },
                unabhaengigkeit:    { value: 90, id: '#B36', label: 'Unabhängigkeit' }
            },
            lat: {
                kontrolle_ausueben: { value: 40, id: '#B74', label: 'Kontrolle ausüben' },
                hingabe:            { value: 55, id: '#B75', label: 'Hingabe' },
                fuehrung_geben:     { value: 45, id: '#B76', label: 'Führung geben' },
                gefuehrt_werden:    { value: 50, id: '#B77', label: 'Geführt werden' },
                unabhaengigkeit:    { value: 80, id: '#B36', label: 'Unabhängigkeit' }
            },
            aromantisch: {
                kontrolle_ausueben: { value: 40, id: '#B74', label: 'Kontrolle ausüben' },
                hingabe:            { value: 25, id: '#B75', label: 'Hingabe' },
                fuehrung_geben:     { value: 40, id: '#B76', label: 'Führung geben' },
                gefuehrt_werden:    { value: 30, id: '#B77', label: 'Geführt werden' },
                unabhaengigkeit:    { value: 85, id: '#B36', label: 'Unabhängigkeit' }
            }
        },

        // ═══════════════════════════════════════════════════════════════════
        // R_Identität (Geschlechts-Bedürfnisse) - für R4
        // ═══════════════════════════════════════════════════════════════════
        identitaet: {
            single: {
                authentizitaet:  { value: 85, id: '#B50', label: 'Authentizität' },
                selbst_ausdruck: { value: 80, id: '#B67', label: 'Selbst-Ausdruck' },
                akzeptanz:       { value: 70, id: '#B25', label: 'Akzeptanz' },
                gesehen_werden:  { value: 60, id: '#B31', label: 'Gesehen werden' }
            },
            duo: {
                authentizitaet:  { value: 75, id: '#B50', label: 'Authentizität' },
                selbst_ausdruck: { value: 70, id: '#B67', label: 'Selbst-Ausdruck' },
                akzeptanz:       { value: 85, id: '#B25', label: 'Akzeptanz' },
                gesehen_werden:  { value: 90, id: '#B31', label: 'Gesehen werden' }
            },
            duo_flex: {
                authentizitaet:  { value: 80, id: '#B50', label: 'Authentizität' },
                selbst_ausdruck: { value: 75, id: '#B67', label: 'Selbst-Ausdruck' },
                akzeptanz:       { value: 80, id: '#B25', label: 'Akzeptanz' },
                gesehen_werden:  { value: 80, id: '#B31', label: 'Gesehen werden' }
            },
            solopoly: {
                authentizitaet:  { value: 95, id: '#B50', label: 'Authentizität' },
                selbst_ausdruck: { value: 90, id: '#B67', label: 'Selbst-Ausdruck' },
                akzeptanz:       { value: 75, id: '#B25', label: 'Akzeptanz' },
                gesehen_werden:  { value: 70, id: '#B31', label: 'Gesehen werden' }
            },
            polyamor: {
                authentizitaet:  { value: 85, id: '#B50', label: 'Authentizität' },
                selbst_ausdruck: { value: 85, id: '#B67', label: 'Selbst-Ausdruck' },
                akzeptanz:       { value: 85, id: '#B25', label: 'Akzeptanz' },
                gesehen_werden:  { value: 85, id: '#B31', label: 'Gesehen werden' }
            },
            ra: {
                authentizitaet:  { value: 95, id: '#B50', label: 'Authentizität' },
                selbst_ausdruck: { value: 95, id: '#B67', label: 'Selbst-Ausdruck' },
                akzeptanz:       { value: 80, id: '#B25', label: 'Akzeptanz' },
                gesehen_werden:  { value: 70, id: '#B31', label: 'Gesehen werden' }
            },
            lat: {
                authentizitaet:  { value: 85, id: '#B50', label: 'Authentizität' },
                selbst_ausdruck: { value: 80, id: '#B67', label: 'Selbst-Ausdruck' },
                akzeptanz:       { value: 80, id: '#B25', label: 'Akzeptanz' },
                gesehen_werden:  { value: 80, id: '#B31', label: 'Gesehen werden' }
            },
            aromantisch: {
                authentizitaet:  { value: 90, id: '#B50', label: 'Authentizität' },
                selbst_ausdruck: { value: 85, id: '#B67', label: 'Selbst-Ausdruck' },
                akzeptanz:       { value: 90, id: '#B25', label: 'Akzeptanz' },
                gesehen_werden:  { value: 75, id: '#B31', label: 'Gesehen werden' }
            }
        },

        // ═══════════════════════════════════════════════════════════════════
        // R_Philosophie (Archetyp-Bedürfnisse) - für R2
        // ═══════════════════════════════════════════════════════════════════
        philosophie: {
            single: {
                kinderwunsch:         { value: 20, id: '#B90', label: 'Kinderwunsch' },
                langfristige_bindung: { value: 15, id: '#B96', label: 'Langfristige Bindung' },
                verbindlichkeit:      { value: 20, id: '#B95', label: 'Verbindlichkeit' },
                gemeinsamer_wohnraum: { value: 10, id: '#B99', label: 'Gemeinsamer Wohnraum' },
                eigener_raum:         { value: 95, id: '#B103', label: 'Eigener Raum' },
                alltag_teilen:        { value: 20, id: '#B102', label: 'Alltag teilen' },
                unabhaengigkeit:      { value: 95, id: '#B36', label: 'Unabhängigkeit' },
                selbstbestimmung:     { value: 95, id: '#B34', label: 'Selbstbestimmung' },
                zugehoerigkeit:       { value: 40, id: '#B42', label: 'Zugehörigkeit' },
                gemeinschaft:         { value: 50, id: '#B41', label: 'Gemeinschaft' }
            },
            duo: {
                kinderwunsch:         { value: 75, id: '#B90', label: 'Kinderwunsch' },
                langfristige_bindung: { value: 95, id: '#B96', label: 'Langfristige Bindung' },
                verbindlichkeit:      { value: 95, id: '#B95', label: 'Verbindlichkeit' },
                gemeinsamer_wohnraum: { value: 90, id: '#B99', label: 'Gemeinsamer Wohnraum' },
                eigener_raum:         { value: 30, id: '#B103', label: 'Eigener Raum' },
                alltag_teilen:        { value: 90, id: '#B102', label: 'Alltag teilen' },
                unabhaengigkeit:      { value: 40, id: '#B36', label: 'Unabhängigkeit' },
                selbstbestimmung:     { value: 50, id: '#B34', label: 'Selbstbestimmung' },
                zugehoerigkeit:       { value: 90, id: '#B42', label: 'Zugehörigkeit' },
                gemeinschaft:         { value: 70, id: '#B41', label: 'Gemeinschaft' }
            },
            duo_flex: {
                kinderwunsch:         { value: 60, id: '#B90', label: 'Kinderwunsch' },
                langfristige_bindung: { value: 85, id: '#B96', label: 'Langfristige Bindung' },
                verbindlichkeit:      { value: 80, id: '#B95', label: 'Verbindlichkeit' },
                gemeinsamer_wohnraum: { value: 75, id: '#B99', label: 'Gemeinsamer Wohnraum' },
                eigener_raum:         { value: 50, id: '#B103', label: 'Eigener Raum' },
                alltag_teilen:        { value: 75, id: '#B102', label: 'Alltag teilen' },
                unabhaengigkeit:      { value: 60, id: '#B36', label: 'Unabhängigkeit' },
                selbstbestimmung:     { value: 65, id: '#B34', label: 'Selbstbestimmung' },
                zugehoerigkeit:       { value: 80, id: '#B42', label: 'Zugehörigkeit' },
                gemeinschaft:         { value: 75, id: '#B41', label: 'Gemeinschaft' }
            },
            solopoly: {
                kinderwunsch:         { value: 30, id: '#B90', label: 'Kinderwunsch' },
                langfristige_bindung: { value: 50, id: '#B96', label: 'Langfristige Bindung' },
                verbindlichkeit:      { value: 45, id: '#B95', label: 'Verbindlichkeit' },
                gemeinsamer_wohnraum: { value: 20, id: '#B99', label: 'Gemeinsamer Wohnraum' },
                eigener_raum:         { value: 90, id: '#B103', label: 'Eigener Raum' },
                alltag_teilen:        { value: 35, id: '#B102', label: 'Alltag teilen' },
                unabhaengigkeit:      { value: 95, id: '#B36', label: 'Unabhängigkeit' },
                selbstbestimmung:     { value: 95, id: '#B34', label: 'Selbstbestimmung' },
                zugehoerigkeit:       { value: 60, id: '#B42', label: 'Zugehörigkeit' },
                gemeinschaft:         { value: 70, id: '#B41', label: 'Gemeinschaft' }
            },
            polyamor: {
                kinderwunsch:         { value: 50, id: '#B90', label: 'Kinderwunsch' },
                langfristige_bindung: { value: 75, id: '#B96', label: 'Langfristige Bindung' },
                verbindlichkeit:      { value: 70, id: '#B95', label: 'Verbindlichkeit' },
                gemeinsamer_wohnraum: { value: 60, id: '#B99', label: 'Gemeinsamer Wohnraum' },
                eigener_raum:         { value: 60, id: '#B103', label: 'Eigener Raum' },
                alltag_teilen:        { value: 65, id: '#B102', label: 'Alltag teilen' },
                unabhaengigkeit:      { value: 70, id: '#B36', label: 'Unabhängigkeit' },
                selbstbestimmung:     { value: 75, id: '#B34', label: 'Selbstbestimmung' },
                zugehoerigkeit:       { value: 85, id: '#B42', label: 'Zugehörigkeit' },
                gemeinschaft:         { value: 90, id: '#B41', label: 'Gemeinschaft' }
            },
            ra: {
                kinderwunsch:         { value: 35, id: '#B90', label: 'Kinderwunsch' },
                langfristige_bindung: { value: 40, id: '#B96', label: 'Langfristige Bindung' },
                verbindlichkeit:      { value: 30, id: '#B95', label: 'Verbindlichkeit' },
                gemeinsamer_wohnraum: { value: 35, id: '#B99', label: 'Gemeinsamer Wohnraum' },
                eigener_raum:         { value: 80, id: '#B103', label: 'Eigener Raum' },
                alltag_teilen:        { value: 40, id: '#B102', label: 'Alltag teilen' },
                unabhaengigkeit:      { value: 90, id: '#B36', label: 'Unabhängigkeit' },
                selbstbestimmung:     { value: 95, id: '#B34', label: 'Selbstbestimmung' },
                zugehoerigkeit:       { value: 70, id: '#B42', label: 'Zugehörigkeit' },
                gemeinschaft:         { value: 85, id: '#B41', label: 'Gemeinschaft' }
            },
            lat: {
                kinderwunsch:         { value: 55, id: '#B90', label: 'Kinderwunsch' },
                langfristige_bindung: { value: 80, id: '#B96', label: 'Langfristige Bindung' },
                verbindlichkeit:      { value: 80, id: '#B95', label: 'Verbindlichkeit' },
                gemeinsamer_wohnraum: { value: 25, id: '#B99', label: 'Gemeinsamer Wohnraum' },
                eigener_raum:         { value: 85, id: '#B103', label: 'Eigener Raum' },
                alltag_teilen:        { value: 45, id: '#B102', label: 'Alltag teilen' },
                unabhaengigkeit:      { value: 75, id: '#B36', label: 'Unabhängigkeit' },
                selbstbestimmung:     { value: 80, id: '#B34', label: 'Selbstbestimmung' },
                zugehoerigkeit:       { value: 75, id: '#B42', label: 'Zugehörigkeit' },
                gemeinschaft:         { value: 60, id: '#B41', label: 'Gemeinschaft' }
            },
            aromantisch: {
                kinderwunsch:         { value: 25, id: '#B90', label: 'Kinderwunsch' },
                langfristige_bindung: { value: 30, id: '#B96', label: 'Langfristige Bindung' },
                verbindlichkeit:      { value: 35, id: '#B95', label: 'Verbindlichkeit' },
                gemeinsamer_wohnraum: { value: 30, id: '#B99', label: 'Gemeinsamer Wohnraum' },
                eigener_raum:         { value: 80, id: '#B103', label: 'Eigener Raum' },
                alltag_teilen:        { value: 40, id: '#B102', label: 'Alltag teilen' },
                unabhaengigkeit:      { value: 85, id: '#B36', label: 'Unabhängigkeit' },
                selbstbestimmung:     { value: 90, id: '#B34', label: 'Selbstbestimmung' },
                zugehoerigkeit:       { value: 65, id: '#B42', label: 'Zugehörigkeit' },
                gemeinschaft:         { value: 75, id: '#B41', label: 'Gemeinschaft' }
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
    // ORIENTIERUNGS-OFFENHEIT (für R1 Leben)
    // ═══════════════════════════════════════════════════════════════════════
    //
    // Basiert auf Similarity-Attraction Theorie:
    //   - Ähnlichkeit in sexueller Offenheit → höhere Resonanz
    //   - Mixed-Orientation kann funktionieren, braucht aber mehr Commitment
    //
    // Wissenschaftliche Grundlage:
    //   - Within-couple Similarity in Sexuality → Sexual Satisfaction (PMC)
    //   - Bi-Identity Anerkennung kritisch für Zufriedenheit (Journal of Bisexuality)
    //   - Sexual Openness hat 5 Subdimensionen (PMC 2017)
    //
    // Formel: R1 = Basis_R1 + Openness_Bonus
    //   Basis_R1 = 0.5 + (Ähnlichkeit × 0.5)
    //   Openness_Bonus = (O1 + O2) / 400
    //
    // Die Openness-Werte werden aus Primary + Secondary Orientierung berechnet:

    ORIENTATION_OPENNESS: {
        // Monosexuell (nur ein Geschlecht)
        "hetero": 0,
        "homo": 0,
        // Mit Neugier auf anderes Spektrum
        "hetero-homo": 25,
        "homo-hetero": 25,
        // Aktive Erweiterung Richtung Bi
        "hetero-bi": 50,
        "homo-bi": 50,
        // Bisexuell gelebt
        "bi": 75,
        // Bi mit bewusster Präferenz
        "bi-hetero": 90,
        "bi-homo": 90,
        // Voll offen
        "bi-bi": 100
    },

    ORIENTATION_RESONANCE: {
        MAX_BONUS: 10,      // Maximaler Offenheits-Bonus (wie bei Identity)
        WEIGHT: 0.25        // Gewichtung im Gesamt-Score (bereits bei WEIGHTS.orientierung)
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
