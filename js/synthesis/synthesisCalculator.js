/**
 * TIAGE SYNTHESE - Haupt-Calculator
 *
 * Zentrale Berechnung der Beziehungsqualität nach der Formel:
 *
 *   Q = [(A × wₐ) + (O × wₒ) + (D × wᵈ) + (G × wᵍ)] × R
 *
 * Wobei:
 *   A = Archetyp-Score (40% - LOGOS)
 *   O = Orientierungs-Score (25% - PATHOS)
 *   D = Dominanz-Score (20% - PATHOS)
 *   G = Geschlechts-Score (15% - PATHOS)
 *   R = Resonanz-Koeffizient (0.9 - 1.1)
 *
 * Resonanz-Formel:
 *   R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
 *
 *   M = Profil-Match (0-100%) - Platzhalter bis implementiert
 *   B = Logos-Pathos-Balance = (100 - |Logos - Pathos|) / 100
 *   K = GFK-Kommunikationsfaktor (0-1) - Gewaltfreie Kommunikation
 */

var TiageSynthesis = TiageSynthesis || {};

TiageSynthesis.Calculator = {

    /**
     * Hauptberechnung der Beziehungsqualität
     *
     * @param {object} person1 - Profil Person 1
     * @param {object} person2 - Profil Person 2
     * @param {object} matrixData - archetype-matrix.json Daten
     * @param {number} profilMatch - Profil-Match 0-100 (optional, default 50)
     * @param {object} options - Zusätzliche Optionen (optional)
     * @param {string} options.gfkPerson1 - GFK-Kompetenz Person 1 ("niedrig"|"mittel"|"hoch")
     * @param {string} options.gfkPerson2 - GFK-Kompetenz Person 2 ("niedrig"|"mittel"|"hoch")
     * @returns {object} Vollständiges Ergebnis mit Score, Resonanz und Details
     */
    calculate: function(person1, person2, matrixData, profilMatch, options) {
        var constants = TiageSynthesis.Constants;
        var factors = TiageSynthesis.Factors;

        // Profil-Match (Platzhalter bis Kategorien D,E,F implementiert)
        profilMatch = profilMatch || constants.RESONANCE.DEFAULT_PROFILE_MATCH;

        // GFK-Kompetenz aus Optionen extrahieren
        options = options || {};
        var gfkFaktor = this._calculateGfkFactor(
            options.gfkPerson1 || 'mittel',
            options.gfkPerson2 || 'mittel',
            constants
        );

        // ═══════════════════════════════════════════════════════════════════
        // SCHRITT 1: Alle 4 Faktoren berechnen
        // ═══════════════════════════════════════════════════════════════════

        var archetypResult = factors.Archetyp.calculate(
            person1.archetyp,
            person2.archetyp,
            matrixData
        );

        var orientierungResult = factors.Orientierung.calculate(person1, person2);

        var dominanzResult = factors.Dominanz.calculate(
            person1.dominanz,
            person2.dominanz
        );

        var geschlechtResult = factors.Geschlecht.calculate(person1, person2);

        // Scores extrahieren
        var scores = {
            archetyp: archetypResult.score,
            orientierung: orientierungResult.score,
            dominanz: dominanzResult.score,
            geschlecht: geschlechtResult.score
        };

        // ═══════════════════════════════════════════════════════════════════
        // SCHRITT 2: Logos und Pathos berechnen
        // ═══════════════════════════════════════════════════════════════════

        var logos = scores.archetyp;  // Nur Archetyp ist Logos

        var pathos = (scores.orientierung + scores.dominanz + scores.geschlecht) / 3;

        // ═══════════════════════════════════════════════════════════════════
        // SCHRITT 3: Resonanz berechnen (inkl. GFK-Faktor K)
        // ═══════════════════════════════════════════════════════════════════

        var resonanz = this._calculateResonance(logos, pathos, profilMatch, gfkFaktor, constants);

        // ═══════════════════════════════════════════════════════════════════
        // SCHRITT 4: Gewichtete Summe × Resonanz
        // ═══════════════════════════════════════════════════════════════════

        var weights = constants.WEIGHTS;

        var baseScore =
            (scores.archetyp * weights.archetyp) +
            (scores.orientierung * weights.orientierung) +
            (scores.dominanz * weights.dominanz) +
            (scores.geschlecht * weights.geschlecht);

        var finalScore = Math.round(baseScore * resonanz.coefficient);

        // Score begrenzen auf 0-100
        finalScore = Math.max(0, Math.min(100, finalScore));

        // ═══════════════════════════════════════════════════════════════════
        // ERGEBNIS
        // ═══════════════════════════════════════════════════════════════════

        return {
            score: finalScore,
            baseScore: Math.round(baseScore),

            // Resonanz-Details
            resonanz: resonanz,

            // Logos/Pathos Aufteilung
            logos: {
                score: Math.round(logos),
                weight: weights.archetyp,
                contribution: Math.round(scores.archetyp * weights.archetyp)
            },
            pathos: {
                score: Math.round(pathos),
                weight: 1 - weights.archetyp,
                contribution: Math.round(
                    (scores.orientierung * weights.orientierung) +
                    (scores.dominanz * weights.dominanz) +
                    (scores.geschlecht * weights.geschlecht)
                )
            },

            // Einzelne Faktoren
            breakdown: {
                archetyp: {
                    score: scores.archetyp,
                    weight: weights.archetyp,
                    category: 'logos',
                    details: archetypResult.details
                },
                orientierung: {
                    score: scores.orientierung,
                    weight: weights.orientierung,
                    category: 'pathos',
                    details: orientierungResult.details
                },
                dominanz: {
                    score: scores.dominanz,
                    weight: weights.dominanz,
                    category: 'pathos',
                    details: dominanzResult.details
                },
                geschlecht: {
                    score: scores.geschlecht,
                    weight: weights.geschlecht,
                    category: 'pathos',
                    details: geschlechtResult.details
                }
            },

            // Meta-Infos
            meta: {
                hasExploration: orientierungResult.details.hasExploration ||
                                dominanzResult.details.hasExploration,
                profilMatchUsed: profilMatch,
                profilMatchImplemented: profilMatch !== constants.RESONANCE.DEFAULT_PROFILE_MATCH,

                // Hard-KO: Geometrisch unmöglich (z.B. Hetero♂ + Hetero♂)
                isHardKO: orientierungResult.details.isHardKO || false,
                hardKOReason: orientierungResult.details.hardKOReason || null
            }
        };
    },

    /**
     * Berechnet den GFK-Faktor (K) aus der Matrix
     *
     * @param {string} gfk1 - GFK-Kompetenz Person 1 ("niedrig"|"mittel"|"hoch")
     * @param {string} gfk2 - GFK-Kompetenz Person 2 ("niedrig"|"mittel"|"hoch")
     * @param {object} constants - TiageSynthesis.Constants
     * @returns {object} { value, level1, level2, interpretation }
     */
    _calculateGfkFactor: function(gfk1, gfk2, constants) {
        // Normalisieren (lowercase)
        gfk1 = (gfk1 || 'mittel').toLowerCase();
        gfk2 = (gfk2 || 'mittel').toLowerCase();

        // Matrix-Key erstellen
        var key = gfk1 + '-' + gfk2;

        // Wert aus Matrix holen (oder Default)
        var value = constants.GFK_MATRIX[key];
        if (value === undefined) {
            value = 0.5; // Default: mittel-mittel
        }

        // Interpretation bestimmen
        var interpretation;
        if (value >= 0.9) {
            interpretation = { level: 'optimal', text: 'Exzellente Kommunikationsbasis' };
        } else if (value >= 0.6) {
            interpretation = { level: 'gut', text: 'Solide Kommunikationsgrundlage' };
        } else if (value >= 0.4) {
            interpretation = { level: 'mittel', text: 'Entwicklungspotenzial vorhanden' };
        } else if (value >= 0.2) {
            interpretation = { level: 'schwach', text: 'Kommunikationsarbeit nötig' };
        } else {
            interpretation = { level: 'kritisch', text: 'Destruktive Muster wahrscheinlich' };
        }

        return {
            value: value,
            level1: gfk1,
            level2: gfk2,
            matrixKey: key,
            interpretation: interpretation
        };
    },

    /**
     * Berechnet den Resonanz-Koeffizienten
     *
     * R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
     *
     * @param {number} logos - Logos-Score (0-100)
     * @param {number} pathos - Pathos-Durchschnitt (0-100)
     * @param {number} profilMatch - Profil-Match (0-100)
     * @param {object} gfkFaktor - GFK-Faktor Objekt mit .value
     * @param {object} constants - TiageSynthesis.Constants
     * @returns {object} { coefficient, balance, profilMatch, gfk, interpretation }
     */
    _calculateResonance: function(logos, pathos, profilMatch, gfkFaktor, constants) {
        var cfg = constants.RESONANCE;

        // Logos-Pathos-Balance: B = (100 - |Logos - Pathos|) / 100
        var differenz = Math.abs(logos - pathos);
        var balance = (100 - differenz) / 100;

        // GFK-Wert extrahieren (K)
        var gfkValue = gfkFaktor.value;

        // R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
        var coefficient = cfg.BASE +
            (
                ((profilMatch / 100) * cfg.PROFILE_WEIGHT) +
                (balance * cfg.BALANCE_WEIGHT) +
                (gfkValue * cfg.GFK_WEIGHT)
            ) * cfg.MAX_BOOST;

        // Auf 3 Dezimalstellen runden
        coefficient = Math.round(coefficient * 1000) / 1000;

        return {
            coefficient: coefficient,
            balance: Math.round(balance * 100) / 100,
            differenz: Math.round(differenz),
            profilMatch: profilMatch,
            gfk: gfkFaktor,
            interpretation: this._interpretResonance(coefficient)
        };
    },

    /**
     * Interpretiert den Resonanz-Koeffizienten
     */
    _interpretResonance: function(coefficient) {
        if (coefficient >= 1.08) return { level: 'harmonie', text: 'Logos und Pathos verstärken sich' };
        if (coefficient >= 1.02) return { level: 'resonanz', text: 'Gute Schwingung zwischen Kopf und Herz' };
        if (coefficient >= 0.98) return { level: 'neutral', text: 'Ausgewogenes Verhältnis' };
        if (coefficient >= 0.93) return { level: 'spannung', text: 'Leichte Spannung zwischen Logos und Pathos' };
        return { level: 'dissonanz', text: 'Logos und Pathos widersprechen sich' };
    },

    /**
     * Schnellberechnung ohne Details (für Performance)
     */
    calculateQuick: function(person1, person2, matrixData) {
        var result = this.calculate(person1, person2, matrixData);
        return {
            score: result.score,
            resonanz: result.resonanz.coefficient,
            logos: result.logos.score,
            pathos: result.pathos.score
        };
    },

    /**
     * Berechnet nur die Resonanz (für UI-Updates)
     *
     * @param {number} logos - Logos-Score (0-100)
     * @param {number} pathos - Pathos-Durchschnitt (0-100)
     * @param {number} profilMatch - Profil-Match (0-100, optional)
     * @param {string} gfk1 - GFK-Kompetenz Person 1 (optional)
     * @param {string} gfk2 - GFK-Kompetenz Person 2 (optional)
     */
    calculateResonanceOnly: function(logos, pathos, profilMatch, gfk1, gfk2) {
        var constants = TiageSynthesis.Constants;
        var gfkFaktor = this._calculateGfkFactor(gfk1 || 'mittel', gfk2 || 'mittel', constants);
        return this._calculateResonance(logos, pathos, profilMatch || 50, gfkFaktor, constants);
    },

    /**
     * Berechnet nur den GFK-Faktor (für UI-Anzeige)
     *
     * @param {string} gfk1 - GFK-Kompetenz Person 1 ("niedrig"|"mittel"|"hoch")
     * @param {string} gfk2 - GFK-Kompetenz Person 2 ("niedrig"|"mittel"|"hoch")
     * @returns {object} GFK-Faktor mit Wert und Interpretation
     */
    calculateGfkOnly: function(gfk1, gfk2) {
        var constants = TiageSynthesis.Constants;
        return this._calculateGfkFactor(gfk1, gfk2, constants);
    }
};
