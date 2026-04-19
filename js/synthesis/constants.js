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

        // R-Faktor Formel (dimensional) - v3.4 mit richtungsbasierter Berechnung
        r_factor: {
            text: 'R = avgMatch²',
            html: 'R = avgMatch²',
            description: 'Dimensionaler Resonanzfaktor mit richtungsbasierter Skalierung',
            params: {
                // v3.4: Richtungsbasierte R-Werte um 1.0 zentriert
                // R > 1.0 = mehr als Archetyp-typisch (verstärkt Score)
                // R = 1.0 = perfekte Übereinstimmung mit Archetyp
                // R < 1.0 = weniger als Archetyp-typisch (schwächt Score)
                min: 0,    // Theoretisches Minimum
                max: 2     // Theoretisches Maximum (praktisch ca. 0.8 - 1.3)
            },
            thresholds: {
                resonance: 1.05,    // R ≥ 1.05 = verstärkter Match ⬆️
                dissonance: 0.95,   // R ≤ 0.95 = geschwächter Match ⬇️
                neutral: [0.95, 1.05] // Dazwischen = neutral ➡️
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

    // WEIGHTS werden dynamisch aus TiageState geladen (SSOT)
    // Getter-Funktion für aktuelle Gewichtungen
    getWeights: function(person) {
        person = person || 'ich';

        // PRIORITÄT 1: TiageState (Single Source of Truth - persistent)
        try {
            if (typeof TiageState !== 'undefined') {
                var stored = TiageState.get('gewichtungen.' + person);

                // NEUES 3-Wege-Format: { O: 1, A: 2, D: 0, G: 1 } (0=Egal, 1=Normal, 2=Wichtig)
                if (stored && typeof stored.O === 'number' && stored.O >= 0 && stored.O <= 2) {
                    // Konvertiere 0/1/2 zu Gewichten: 0=0, 1=25, 2=50
                    var oVal = stored.O === 0 ? 0 : (stored.O === 2 ? 50 : 25);
                    var aVal = stored.A === 0 ? 0 : (stored.A === 2 ? 50 : 25);
                    var dVal = stored.D === 0 ? 0 : (stored.D === 2 ? 50 : 25);
                    var gVal = stored.G === 0 ? 0 : (stored.G === 2 ? 50 : 25);
                    var sum = oVal + aVal + dVal + gVal;
                    var divisor = sum > 0 ? sum : 100;
                    // DEBUG DISABLED v1.8.871: Feuert bei jeder Score-Berechnung
                    // console.log('[TiageSynthesis.getWeights] New format detected:', stored, '→', { oVal, aVal, dVal, gVal, sum });
                    return {
                        orientierung: oVal / divisor,
                        archetyp: aVal / divisor,
                        dominanz: dVal / divisor,
                        geschlecht: gVal / divisor
                    };
                }

                // ALTES Format: { O: { value: 25, locked: false }, ... }
                if (stored && stored.O && typeof stored.O.value === 'number') {
                    var oVal = stored.O.value;
                    var aVal = stored.A.value;
                    var dVal = stored.D.value;
                    var gVal = stored.G.value;
                    var sum = oVal + aVal + dVal + gVal;
                    var divisor = sum > 0 ? sum : 100;
                    return {
                        orientierung: oVal / divisor,
                        archetyp: aVal / divisor,
                        dominanz: dVal / divisor,
                        geschlecht: gVal / divisor
                    };
                }
            }
        } catch (e) {
            console.warn('[TiageSynthesis] Could not load weights from TiageState:', e);
        }

        // PRIORITÄT 2: UI-Gewichtungen (GewichtungCard) als Fallback
        if (typeof getGewichtungen === 'function') {
            var gew = getGewichtungen();
            // FIX: typeof check statt || operator, damit 0 korrekt als 0 behandelt wird
            var oValUI = typeof gew.O === 'number' ? gew.O : 25;
            var aValUI = typeof gew.A === 'number' ? gew.A : 25;
            var dValUI = typeof gew.D === 'number' ? gew.D : 25;
            var gValUI = typeof gew.G === 'number' ? gew.G : 25;
            // Relative Gewichte: Nutzer gibt beliebige Werte, System normalisiert auf Summe=1.0
            var sum2 = oValUI + aValUI + dValUI + gValUI;
            var divisor2 = sum2 > 0 ? sum2 : 100;
            return {
                orientierung: oValUI / divisor2,
                archetyp: aValUI / divisor2,
                dominanz: dValUI / divisor2,
                geschlecht: gValUI / divisor2
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
    // v3.2: Range: 0 (totaler Mismatch) bis 1 (perfekte Übereinstimmung), R = similarity²
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

        // Interpretation pro Dimension (v3.4: richtungsbasiert um 1.0 zentriert)
        THRESHOLDS: {
            resonanz: 1.05,   // R ≥ 1.05 = Verstärkter Match ⬆️ (mehr als Archetyp-typisch)
            dissonanz: 0.95   // R ≤ 0.95 = Geschwächter Match ⬇️ (weniger als Archetyp-typisch)
                              // Dazwischen = Neutral ➡️
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ARCHETYP-BEDÜRFNIS-KOHÄRENZ (v3.1) - DEPRECATED
    // ═══════════════════════════════════════════════════════════════════════
    //
    // @deprecated v3.5 - Diese Daten sind jetzt in beduerfnis-katalog.json
    // im kohaerenz-Feld jedes Bedürfnisses definiert (SSOT).
    // Verwende TiageSynthesis.NeedsIntegration.getNeedsByRFaktor() /
    // buildExpectedValuesFromKatalog() statt direktem Zugriff.
    //
    // Wird noch als Legacy-Fallback verwendet, sollte aber nicht für neue
    // Entwicklungen genutzt werden.
    //
    // Definiert die archetyp-typischen Bedürfnis-Ausprägungen.
    // R_dim = Übereinstimmung zwischen tatsächlichen und archetyp-typischen Werten.
    //
    // Werte: 0-100 (archetyp-typische Ausprägung für kohärentes Profil)
    // null = Bedürfnis ist für diesen Archetyp nicht relevant
    //
    ARCHETYP_KOHAERENZ: {
        // ═══════════════════════════════════════════════════════════════════
        // R_Leben (Orientierungs-Bedürfnisse) - für R1
        // Alle 4 Bedürfnisse haben nun #B-IDs: #B175, #B176, #B204, #B20
        // FIX: #B221/#B222 waren falsch (sind Schmerz-Needs), korrigiert zu #B175/#B176
        // ═══════════════════════════════════════════════════════════════════
        leben: {
            single: {
                sexuelle_experimentierfreude: { value: 50, id: '#B175', label: 'Sexuelle Experimentierfreude' },
                sexuelle_verbindung:          { value: 30, id: '#B176', label: 'Sexuelle Verbindung' },
                koerpernaehe:                 { value: 40, id: '#B204', label: 'Körpernähe' },
                intimitaet:                   { value: 30, id: '#B20', label: 'Intimität' }
            },
            duo: {
                sexuelle_experimentierfreude: { value: 40, id: '#B175', label: 'Sexuelle Experimentierfreude' },
                sexuelle_verbindung:          { value: 90, id: '#B176', label: 'Sexuelle Verbindung' },
                koerpernaehe:                 { value: 85, id: '#B204', label: 'Körpernähe' },
                intimitaet:                   { value: 90, id: '#B20', label: 'Intimität' }
            },
            duo_flex: {
                sexuelle_experimentierfreude: { value: 70, id: '#B175', label: 'Sexuelle Experimentierfreude' },
                sexuelle_verbindung:          { value: 75, id: '#B176', label: 'Sexuelle Verbindung' },
                koerpernaehe:                 { value: 75, id: '#B204', label: 'Körpernähe' },
                intimitaet:                   { value: 80, id: '#B20', label: 'Intimität' }
            },
            solopoly: {
                sexuelle_experimentierfreude: { value: 85, id: '#B175', label: 'Sexuelle Experimentierfreude' },
                sexuelle_verbindung:          { value: 60, id: '#B176', label: 'Sexuelle Verbindung' },
                koerpernaehe:                 { value: 60, id: '#B204', label: 'Körpernähe' },
                intimitaet:                   { value: 50, id: '#B20', label: 'Intimität' }
            },
            polyamor: {
                sexuelle_experimentierfreude: { value: 80, id: '#B175', label: 'Sexuelle Experimentierfreude' },
                sexuelle_verbindung:          { value: 85, id: '#B176', label: 'Sexuelle Verbindung' },
                koerpernaehe:                 { value: 75, id: '#B204', label: 'Körpernähe' },
                intimitaet:                   { value: 85, id: '#B20', label: 'Intimität' }
            },
            ra: {
                sexuelle_experimentierfreude: { value: 75, id: '#B175', label: 'Sexuelle Experimentierfreude' },
                sexuelle_verbindung:          { value: 60, id: '#B176', label: 'Sexuelle Verbindung' },
                koerpernaehe:                 { value: 50, id: '#B204', label: 'Körpernähe' },
                intimitaet:                   { value: 60, id: '#B20', label: 'Intimität' }
            },
            lat: {
                sexuelle_experimentierfreude: { value: 50, id: '#B175', label: 'Sexuelle Experimentierfreude' },
                sexuelle_verbindung:          { value: 80, id: '#B176', label: 'Sexuelle Verbindung' },
                koerpernaehe:                 { value: 60, id: '#B204', label: 'Körpernähe' },
                intimitaet:                   { value: 75, id: '#B20', label: 'Intimität' }
            },
            aromantisch: {
                sexuelle_experimentierfreude: { value: 40, id: '#B175', label: 'Sexuelle Experimentierfreude' },
                sexuelle_verbindung:          { value: 20, id: '#B176', label: 'Sexuelle Verbindung' },
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
    // v3.8: Tao-Balance gleichwertig zu Komplementärer Polarität
    // Philosophie: Yin-Yang-Balance ist ebenso wertvoll wie Pol-Gegenpol

    DOMINANCE_MATRIX: {
        // KOMPLEMENTÄRE POLARITÄT (100%)
        "dominant-submissiv": 100,
        "submissiv-dominant": 100,

        // TAO-BALANCE (100%) - v3.8: gleichwertig zu Komplementär
        "ausgeglichen-ausgeglichen": 100,
        "switch-switch": 100,
        "switch-ausgeglichen": 100,
        "ausgeglichen-switch": 100,

        // FLEXIBEL + POL (93%) - v3.8: angehoben von 85/80
        "dominant-ausgeglichen": 93,
        "ausgeglichen-dominant": 93,
        "submissiv-ausgeglichen": 93,
        "ausgeglichen-submissiv": 93,
        "switch-dominant": 93,
        "dominant-switch": 93,
        "switch-submissiv": 93,
        "submissiv-switch": 93,

        // GLEICHE POLE (55%) - Spannung (unverändert)
        "dominant-dominant": 55,
        "submissiv-submissiv": 55
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SSOT: ORIENTIERUNGS-OPTIONEN (v5.0)
    // ═══════════════════════════════════════════════════════════════════════
    // SINGLE SOURCE OF TRUTH für alle Orientierungs-Varianten.
    // Alle anderen Dateien MÜSSEN diese Definition verwenden!
    //
    // Aktuelle Optionen (5 Varianten):
    // - heterosexuell: Anziehung zum anderen binären Geschlecht
    // - homosexuell: Anziehung zum gleichen Geschlecht (gay/lesbisch)
    // - bisexuell: Anziehung zu beiden binären Geschlechtern
    // - pansexuell: Anziehung zu allen Geschlechtern (inkl. nonbinär)
    // - queer: Umbrella-Term, flexibel, meist wie pansexuell behandelt

    ORIENTIERUNG_OPTIONS: {
        // Alle verfügbaren Orientierungen (für Iteration in Best Match etc.)
        ALL: ['heterosexuell', 'homosexuell', 'bisexuell', 'pansexuell', 'queer'],

        // Kategorien für Kompatibilitäts-Logik
        CATEGORIES: {
            // Monosexuell: Nur ein Geschlecht
            MONO: ['heterosexuell', 'homosexuell'],
            // Multisexuell: Mehrere Geschlechter
            MULTI: ['bisexuell', 'pansexuell', 'queer'],
            // Kann zu Nonbinär angezogen sein
            ATTRACTS_NONBINARY: ['pansexuell', 'queer'],
            // Kann zu beiden binären Geschlechtern angezogen sein
            ATTRACTS_BINARY_BOTH: ['bisexuell', 'pansexuell', 'queer']
        },

        // Labels für UI-Anzeige
        LABELS: {
            'heterosexuell': 'Hetero',
            'homosexuell': 'Homo',
            'bisexuell': 'Bi',
            'pansexuell': 'Pan',
            'queer': 'Queer'
        },

        // Openness-Werte für Resonanz-Berechnung (0-100)
        // Höherer Wert = offener für verschiedene Partner
        OPENNESS: {
            'heterosexuell': 0,
            'homosexuell': 0,
            'bisexuell': 70,
            'pansexuell': 100,
            'queer': 100
        },

        // Legacy-Migration: Alte Keys zu neuen Keys
        // WICHTIG: Wird für Rückwärtskompatibilität verwendet
        LEGACY_MIGRATION: {
            'bihomo': 'bisexuell',           // v2.0 Legacy
            'gay_lesbisch': 'homosexuell',   // v4.0 Alternative
            'pansexuell_queer': 'pansexuell' // v4.0 Alternative
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SSOT: GESCHLECHTS-OPTIONEN (v6.0)
    // ═══════════════════════════════════════════════════════════════════════
    // SINGLE SOURCE OF TRUTH für Geschlechtsidentität.
    // v6.0: Vereinfachte Struktur - Primary + optionale Extras (Multi-Select)

    GESCHLECHT_OPTIONS: {
        // Geschlechtsidentität (Single-Select)
        PRIMARY: ['mann', 'frau', 'nonbinaer'],

        // Extras (Multi-Select, optional)
        EXTRAS: ['fit', 'fuckedup', 'horny', 'fresh'],

        // Labels für UI-Anzeige
        LABELS: {
            PRIMARY: {
                'mann': 'Mann',
                'frau': 'Frau',
                'nonbinaer': 'Nonbinär'
            },
            EXTRAS: {
                'fit': 'Fit 💪',
                'fuckedup': 'Fucked up 🔥',
                'horny': 'Horny 😈',
                'fresh': 'Fresh 🌱'
            }
        },

        // Kategorien für Kompatibilitäts-Logik
        CATEGORIES: {
            BINARY_MALE: ['mann'],
            BINARY_FEMALE: ['frau'],
            NONBINARY: ['nonbinaer']
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ORIENTIERUNGS-KOMPATIBILITÄT - v4.0 Reibungs-Skala
    // ═══════════════════════════════════════════════════════════════════════
    // Keine K.O.-Kriterien mehr - alles wird als Reibungs-Spektrum dargestellt.
    // 0% Score = 100% Reibung (maximale Herausforderung, nicht "unmöglich")

    ORIENTATION: {
        COMPATIBLE: 100,     // Volle Kompatibilität = keine Reibung
        EXPLORING: 70,       // Exploration-Phase = leichte Reibung
        UNLIKELY: 30,        // Herausfordernd = mittlere Reibung
        INCOMPATIBLE: 10,    // Sehr herausfordernd = hohe Reibung
        MAXIMUM_REIBUNG: 0,  // Maximale Reibung (ersetzt HARD_KO)
        // Legacy-Alias für Abwärtskompatibilität
        HARD_KO: 0,          // @deprecated - verwende MAXIMUM_REIBUNG

        // Sekundär-Orientierungs-Bonus
        // Wenn beide sekundäre Orientierungen auch kompatibel sind
        // Formel: Bonus = SECONDARY_BONUS_BASE × (wO / 0.25)
        // Bei Standard-Gewichtung (25%): 5% Bonus
        // Bei doppelter Gewichtung (50%): 10% Bonus
        SECONDARY_BONUS_BASE: 0.05
    },

    // ═══════════════════════════════════════════════════════════════════════
    // DOMINANZ-SEKUNDÄR-BONUS
    // ═══════════════════════════════════════════════════════════════════════
    // Wenn beide sekundäre Dominanzen komplementär oder kompatibel sind
    // Formel: Bonus = SECONDARY_BONUS_BASE × (wD / 0.25)

    DOMINANCE_SECONDARY: {
        BONUS_BASE: 0.05,    // 5% Basis-Verstärkung bei Standard-Gewichtung

        // Komplementäre Sekundär-Kombinationen (höchster Bonus)
        COMPLEMENTARY_PAIRS: [
            ['dominant', 'submissiv'],
            ['submissiv', 'dominant']
        ],

        // Kompatible Sekundär-Kombinationen (mittlerer Bonus)
        COMPATIBLE_PAIRS: [
            ['switch', 'switch'],
            ['ausgeglichen', 'ausgeglichen'],
            ['switch', 'ausgeglichen'],
            ['dominant', 'switch'],
            ['submissiv', 'switch'],
            ['dominant', 'ausgeglichen'],
            ['submissiv', 'ausgeglichen']
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GESCHLECHT-SEKUNDÄR-BONUS-SKALIERUNG
    // ═══════════════════════════════════════════════════════════════════════
    // Der bestehende Identitäts-Resonanz-Bonus wird mit der G-Gewichtung skaliert

    GENDER_SECONDARY: {
        // Basis-Bonus bleibt max 5 Punkte (aus _calculateSecondaryBonus)
        // Skalierung: Bonus × (wG / 0.25)
        SCALING_ENABLED: true,
        SCALING_BASE: 0.25   // Standard-Gewichtung für Normalisierung
    },

    // ═══════════════════════════════════════════════════════════════════════
    // REIBUNGS-LOGIK (ersetzt K.O.-Kriterien) - v4.0
    // ═══════════════════════════════════════════════════════════════════════
    // Nichts ist "unmöglich" - nur unterschiedlich schwierig.
    // Score 0% = 100% Reibung (maximale Herausforderung, aber nicht unmöglich)
    //
    // Philosophische Grundlage:
    // - PIRSIG: Qualität ist ein Spektrum, keine binäre Entscheidung
    // - OSHO: Jede Konditionierung kann überwunden werden
    // - GFK: Jedes Bedürfnis kann erfüllt werden, Strategien sind verhandelbar
    // - RTI: Die 5 Säulen der Identität ermöglichen graduelle Bewertung

    HARD_KO: {
        // DEAKTIVIERT: K.O.-Logik durch Reibungs-Logik ersetzt
        ENABLED: false,

        // Legacy-Fälle werden jetzt als "maximale Reibung" (0%) interpretiert:
        // 1. Hetero + Hetero + gleiches Geschlecht = 0% Score = 100% Reibung
        // 2. Homo + Homo + verschiedenes Geschlecht = 0% Score = 100% Reibung
        // 3. Hetero + Homo Konstellationen = niedriger Score = hohe Reibung

        // Message wird durch perspektivenHinweise in beduerfnis-katalog.json ersetzt
        MESSAGE_KEY: 'reibungHoch'  // Neue Referenz auf Reibungs-Texte
    },

    // ═══════════════════════════════════════════════════════════════════════
    // REIBUNGS-SCHWELLENWERTE (ersetzt Soft-K.O.) - v4.0
    // ═══════════════════════════════════════════════════════════════════════
    // Bedürfnis-Differenzen erzeugen Reibung, keine K.O.-Entscheidung.
    // Die Reibung wird als graduelle Herausforderung kommuniziert.

    SOFT_KO: {
        // DEAKTIVIERT: Durch graduelle Reibungs-Berechnung ersetzt
        ENABLED: false,

        // Schwellenwerte für Reibungs-Level (statt K.O.)
        THRESHOLDS: {
            CRITICAL: 50,      // Differenz > 50 = hohe Reibung (nicht "kritisch")
            HIGH: 35,          // Differenz > 35 = mittlere Reibung
            MODERATE: 20       // Differenz > 20 = leichte Reibung
        },

        // Reibungs-Akkumulation (statt K.O.-Auslösung)
        MIN_CRITICAL_CONFLICTS: 3,  // 3+ hohe Reibungen = sehr hohe Gesamt-Reibung

        // KEINE Score-Penalty mehr - Score bleibt, Reibung wird kommuniziert
        SCORE_PENALTY: 1.0,   // Keine Reduktion - Score = 100% - Reibung%

        MESSAGE_KEY: 'reibungStufen'  // Neue Referenz auf Reibungs-Texte
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
    // - Binär (Mann/Frau): Cis, Trans, Nonbinär
    // - Divers (Inter): Nonbinär, Fluid

    IDENTITY_MATRIX: {
        // ─── BINÄR-KONTEXT (Cis, Trans, Nonbinär) ───
        // Cis: Form = Körper, klare statische Qualität
        "cis-cis": 100,
        "cis-trans": 85,
        "cis-suchend": 70,

        // Trans: Wandel durchlebt, neue Klarheit gefunden
        "trans-cis": 85,
        "trans-trans": 100,
        "trans-suchend": 75,

        // ─── DIVERS-KONTEXT (Nonbinär, Fluid) ───
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
        // Hybrid-Formel: R4 = BASIS + (SIMILARITY_FACTOR × Openness-Bonus)
        // Openness-Bonus = (O1 + O2) / 200
        SIMILARITY_FACTOR_MATCH: 1.3,    // Faktor wenn gleiche Identität
        SIMILARITY_FACTOR_DIFF: 1.0,     // Faktor wenn unterschiedliche Identität
        OPENNESS_DIVISOR: 200,           // Teiler für Openness-Normalisierung (0-1)
        // Legacy (für Score-Berechnung)
        MAX_BONUS: 10,
        WEIGHT: 0.15,
        // NEU (v3.6): GOD-kombinierte Openness für R4
        // R4 berücksichtigt jetzt sowohl Geschlechts-Identität als auch Orientierung
        // Formel: combinedOpenness = (identityO × IDENTITY_WEIGHT) + (orientationO × ORIENTATION_WEIGHT)
        // v3.6.1: 30/70 Gewichtung - Orientierung zählt mehr als Identität
        // Damit Cis+Bi (52.5) > NB+Hetero (15)
        IDENTITY_WEIGHT: 0.3,            // 30% Gewichtung für Geschlechts-Identität (cis/trans/nb)
        ORIENTATION_WEIGHT: 0.7          // 70% Gewichtung für Orientierung (hetero/homo/bi)
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
        WEIGHT: 0.25,       // Gewichtung im Gesamt-Score (bereits bei WEIGHTS.orientierung)
        // NEU (v3.6): P/S-Gewichtung für Orientierungs-Openness
        // Primäre Orientierung hat stärkeren Einfluss als sekundäre
        PRIMARY_WEIGHT: 0.7,   // 70% für primäre Orientierung
        SECONDARY_WEIGHT: 0.3  // 30% für sekundäre Orientierung
    },

    // Einzelne Orientierungs-Openness-Werte (für gewichtete P/S-Berechnung)
    ORIENTATION_OPENNESS_SINGLE: {
        "heterosexuell": 0,
        "homosexuell": 0,
        "bisexuell": 75,
        "pansexuell": 100
    },

    // ═══════════════════════════════════════════════════════════════════════
    // EXPLORATION-MODIFIER
    // ═══════════════════════════════════════════════════════════════════════
    // Reduziert Konfidenz wenn jemand "interessiert" ist

    EXPLORATION: {
        MODIFIER: 0.70  // 30% Reduktion bei Exploration
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PHYSICAL COMPATIBILITY (Pathos-Check) - v4.0 Reibungs-Logik
    // ═══════════════════════════════════════════════════════════════════════
    // Definiert wie Orientierungen in der Kompatibilitätsprüfung behandelt werden.
    //
    // v4.0 REIBUNGS-LOGIK:
    // - "unmöglich" gibt es nicht mehr
    // - Score 0% = 100% Reibung = maximale Herausforderung
    // - Einseitige Anziehung = hohe Reibung (nicht "unmöglich")
    //
    // Philosophie: Nichts ist unmöglich, nur unterschiedlich schwierig.
    // Die perspektivenHinweise in beduerfnis-katalog.json liefern Kontext.

    PHYSICAL_COMPATIBILITY: {
        // Sekundäre Orientierung: Gewichtung im Scoring
        SECONDARY_WEIGHT: 0.3,  // 30% Einfluss auf Score

        // Ergebnis-Typen (v4.0: IMPOSSIBLE → HOHE_REIBUNG)
        RESULT: {
            POSSIBLE: 'möglich',              // Gegenseitige Anziehung = niedrige Reibung
            HOHE_REIBUNG: 'hohe_reibung',     // Score 0-20% = maximale Herausforderung
            INCOMPLETE: 'unvollständig',      // Fehlende Daten
            // Legacy-Alias für Abwärtskompatibilität
            IMPOSSIBLE: 'hohe_reibung'        // @deprecated - wird als hohe_reibung behandelt
        },

        // Konfidenz-Stufen
        CONFIDENCE: {
            HIGH: 'hoch',      // Beide Primary-Orientierungen kompatibel
            MEDIUM: 'mittel',  // Kompatibel über Secondary-Orientierung
            LOW: 'niedrig'     // Grenzfall
        },

        // ═══════════════════════════════════════════════════════════════════════
        // KONFIDENZ-MULTIPLIKATOR (v3.7)
        // ═══════════════════════════════════════════════════════════════════════
        // Matches über sekundäre Orientierungen werden im Score reduziert.
        // Dies stellt sicher, dass primäre Matches höher gerankt werden.
        //
        // Beispiel: Hetero (P) + Bi (S) Person
        // - Match mit Frau über Hetero (P) → confidence: 'hoch' → 100% Score
        // - Match mit Mann über Bi (S) → confidence: 'mittel' → 85% Score
        //
        // Der Multiplikator wird auf den Gesamt-Score angewandt:
        // finalScore = baseScore × CONFIDENCE_MULTIPLIER[confidence]
        CONFIDENCE_MULTIPLIER: {
            'hoch': 1.0,       // 100% - Primäre Orientierungen kompatibel
            'mittel': 0.85,    // 85% - Über sekundäre Orientierung kompatibel
            'niedrig': 0.70    // 70% - Grenzfall (z.B. Exploration)
        },

        // Für gegenseitige Anziehung müssen BEIDE Personen angezogen sein können
        REQUIRE_MUTUAL_ATTRACTION: true
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

        // ─────────────────────────────────────────────────────────────────────
        // KOMPLEMENTÄRE BEDÜRFNIS-PAARE (v3.2) - DEPRECATED
        // ─────────────────────────────────────────────────────────────────────
        //
        // @deprecated v3.5 - Diese Daten sind jetzt in beduerfnis-katalog.json
        // im kohaerenz.komplementaer Feld jedes Bedürfnisses definiert (SSOT).
        // Verwende TiageSynthesis.NeedsIntegration.buildComplementaryPairsFromKatalog()
        // oder getKomplementaerFromKatalog() statt direktem Zugriff.
        //
        // Diese Paare werden KREUZ-verglichen statt direkt:
        // ICH.geben ↔ PARTNER.empfangen (und umgekehrt)
        // Für R-Berechnung: similarity = 1 - |ICH.geben - PARTNER.empfangen| / 100
        COMPLEMENTARY_PAIRS: {
            // Kontrolle & Hingabe
            '#B74': '#B75',   // Kontrolle-ausüben ↔ Hingabe
            '#B75': '#B74',   // Hingabe ↔ Kontrolle-ausüben

            // Führung
            '#B76': '#B77',   // Führung-geben ↔ Geführt-werden
            '#B77': '#B76',   // Geführt-werden ↔ Führung-geben

            // Dominanz/Demut
            '#B216': '#B215', // Dominieren ↔ Demütig-sein
            '#B215': '#B216', // Demütig-sein ↔ Dominieren

            // Schmerz (S/M)
            '#B222': '#B221', // Schmerz-geben ↔ Schmerzerleben
            '#B221': '#B222', // Schmerzerleben ↔ Schmerz-geben

            // Bondage
            '#B212': '#B223', // Bondage-geben ↔ Bondage-erleben
            '#B223': '#B212', // Bondage-erleben ↔ Bondage-geben

            // Bestrafung
            '#B218': '#B217', // Bestrafen ↔ Bestrafung-erhalten
            '#B217': '#B218', // Bestrafung-erhalten ↔ Bestrafen

            // Service
            '#B219': '#B220', // Service-geben ↔ Service-empfangen
            '#B220': '#B219', // Service-empfangen ↔ Service-geben

            // Beschützen
            '#B88': '#B225',  // Beschützen ↔ Beschützt-werden
            '#B225': '#B88',  // Beschützt-werden ↔ Beschützen

            // Vertrauen
            '#B83': '#B226',  // Vertrauen-schenken ↔ Vertrauen-empfangen
            '#B226': '#B83',  // Vertrauen-empfangen ↔ Vertrauen-schenken

            // Anbetung/Devotion
            '#B214': '#B213', // Anbetung (verehren) ↔ Devotion (verehrt werden)
            '#B213': '#B214'  // Devotion ↔ Anbetung
        },

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
