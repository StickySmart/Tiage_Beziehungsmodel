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
 *   M = Bedürfnis-Match (0-100%) - JETZT IMPLEMENTIERT via BeduerfnisModifikatoren
 *   B = Logos-Pathos-Balance = (100 - |Logos - Pathos|) / 100
 *   K = GFK-Kommunikationsfaktor (0-1) - Gewaltfreie Kommunikation
 *
 * NEU v2.0: Dynamische Bedürfnis-Berechnung
 * - Bedürfnisse werden pro Person individuell berechnet
 * - Faktoren: Archetyp + Dominanz + Geschlecht + Orientierung + Status
 * - Übereinstimmung kategorisiert: gemeinsam, komplementär, unterschiedlich
 */

var TiageSynthesis = TiageSynthesis || {};

TiageSynthesis.Calculator = {

    /**
     * Hauptberechnung der Beziehungsqualität
     *
     * @param {object} person1 - Profil Person 1
     * @param {object} person2 - Profil Person 2
     * @param {object} matrixData - archetype-matrix.json Daten
     * @param {number} profilMatch - Profil-Match 0-100 (optional, wird automatisch berechnet wenn nicht angegeben)
     * @param {object} options - Zusätzliche Optionen (optional)
     * @param {string} options.gfkPerson1 - GFK-Kompetenz Person 1 ("niedrig"|"mittel"|"hoch")
     * @param {string} options.gfkPerson2 - GFK-Kompetenz Person 2 ("niedrig"|"mittel"|"hoch")
     * @param {object} options.archetypProfile - Archetyp-Basis-Profile (aus gfk-beduerfnisse.js)
     * @returns {object} Vollständiges Ergebnis mit Score, Resonanz und Details
     */
    calculate: function(person1, person2, matrixData, profilMatch, options) {
        var constants = TiageSynthesis.Constants;
        var factors = TiageSynthesis.Factors;

        // Optionen extrahieren
        options = options || {};

        // Bedürfnis-Match berechnen wenn nicht explizit angegeben
        var beduerfnisResult = null;
        if (profilMatch === undefined || profilMatch === null) {
            beduerfnisResult = this._calculateBedürfnisMatch(person1, person2, options.archetypProfile);
            profilMatch = beduerfnisResult ? beduerfnisResult.score : constants.RESONANCE.DEFAULT_PROFILE_MATCH;
        }

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
                profilMatchImplemented: beduerfnisResult !== null,

                // Hard-KO: Geometrisch unmöglich (z.B. Hetero♂ + Hetero♂)
                isHardKO: orientierungResult.details.isHardKO || false,
                hardKOReason: orientierungResult.details.hardKOReason || null
            },

            // NEU: Bedürfnis-Übereinstimmung (wenn berechnet)
            beduerfnisse: beduerfnisResult
        };
    },

    /**
     * Berechnet die Bedürfnis-Übereinstimmung zwischen zwei Personen
     *
     * Verwendet BeduerfnisModifikatoren um individuelle Bedürfnis-Profile
     * zu berechnen und dann die Übereinstimmung zu ermitteln.
     *
     * @param {object} person1 - Profil Person 1
     * @param {object} person2 - Profil Person 2
     * @param {object} archetypProfile - Basis-Archetyp-Profile (optional)
     * @returns {object|null} { score, gemeinsam, unterschiedlich, komplementaer, profile }
     */
    _calculateBedürfnisMatch: function(person1, person2, archetypProfile) {
        // Prüfen ob BeduerfnisModifikatoren verfügbar
        if (typeof BeduerfnisModifikatoren === 'undefined') {
            console.warn('BeduerfnisModifikatoren nicht geladen - verwende Default');
            return null;
        }

        // Prüfen ob Archetyp-Profile verfügbar
        if (!archetypProfile) {
            // Versuche GfkBeduerfnisse zu nutzen
            if (typeof GfkBeduerfnisse !== 'undefined' && GfkBeduerfnisse.archetypProfile) {
                archetypProfile = GfkBeduerfnisse.archetypProfile;
            } else {
                console.warn('Archetyp-Profile nicht verfügbar - verwende Default');
                return null;
            }
        }

        // Basis-Bedürfnisse für beide Personen holen
        var basis1 = archetypProfile[person1.archetyp];
        var basis2 = archetypProfile[person2.archetyp];

        if (!basis1 || !basis1.kernbeduerfnisse || !basis2 || !basis2.kernbeduerfnisse) {
            console.warn('Archetyp nicht gefunden:', person1.archetyp, person2.archetyp);
            return null;
        }

        // Vollständige Bedürfnis-Profile berechnen
        var profil1 = BeduerfnisModifikatoren.berechneVollständigesBedürfnisProfil({
            basisBedürfnisse: basis1.kernbeduerfnisse,
            dominanz: this._extractDominanz(person1.dominanz),
            dominanzStatus: this._extractStatus(person1.dominanz),
            geschlechtPrimary: this._extractGeschlechtPrimary(person1.geschlecht),
            geschlechtPrimaryStatus: this._extractGeschlechtStatus(person1.geschlecht, 'primary'),
            geschlechtSecondary: this._extractGeschlechtSecondary(person1.geschlecht),
            geschlechtSecondaryStatus: this._extractGeschlechtStatus(person1.geschlecht, 'secondary'),
            orientierung: this._extractOrientierung(person1.orientierung),
            orientierungStatus: this._extractOrientierungStatus(person1.orientierung)
        });

        var profil2 = BeduerfnisModifikatoren.berechneVollständigesBedürfnisProfil({
            basisBedürfnisse: basis2.kernbeduerfnisse,
            dominanz: this._extractDominanz(person2.dominanz),
            dominanzStatus: this._extractStatus(person2.dominanz),
            geschlechtPrimary: this._extractGeschlechtPrimary(person2.geschlecht),
            geschlechtPrimaryStatus: this._extractGeschlechtStatus(person2.geschlecht, 'primary'),
            geschlechtSecondary: this._extractGeschlechtSecondary(person2.geschlecht),
            geschlechtSecondaryStatus: this._extractGeschlechtStatus(person2.geschlecht, 'secondary'),
            orientierung: this._extractOrientierung(person2.orientierung),
            orientierungStatus: this._extractOrientierungStatus(person2.orientierung)
        });

        // Übereinstimmung berechnen
        var result = BeduerfnisModifikatoren.berechneÜbereinstimmung(profil1, profil2);

        // Profile zum Ergebnis hinzufügen
        result.profile = {
            person1: profil1,
            person2: profil2
        };

        return result;
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // HELPER-FUNKTIONEN für Daten-Extraktion
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Extrahiert Dominanz-Typ aus verschiedenen Datenformaten
     */
    _extractDominanz: function(dominanz) {
        if (!dominanz) return 'ausgeglichen';
        if (typeof dominanz === 'string') return dominanz;
        if (typeof dominanz === 'object') {
            // New format: { primary: 'dominant', secondary: 'submissiv' }
            if ('primary' in dominanz) {
                return dominanz.primary || 'ausgeglichen';
            }
            // Old format: { dominant: 'gelebt', submissiv: 'interessiert' }
            if (dominanz.dominant) return 'dominant';
            if (dominanz.submissiv) return 'submissiv';
            if (dominanz.switch) return 'switch';
            return 'ausgeglichen';
        }
        return 'ausgeglichen';
    },

    /**
     * Extrahiert Status (gelebt/interessiert) aus Dominanz-Objekt
     */
    _extractStatus: function(dominanz) {
        if (!dominanz) return 'gelebt';
        if (typeof dominanz === 'string') return 'gelebt';
        if (typeof dominanz === 'object') {
            // New format: { primary: 'dominant', secondary: 'submissiv' }
            if ('primary' in dominanz) {
                // If secondary is set, it means 'interessiert' state
                if (dominanz.secondary) return 'interessiert';
                if (dominanz.primary) return 'gelebt';
                return 'gelebt';
            }
            // Old format: { dominant: 'gelebt', submissiv: 'interessiert' }
            var types = ['dominant', 'submissiv', 'switch', 'ausgeglichen'];
            for (var i = 0; i < types.length; i++) {
                if (dominanz[types[i]]) {
                    return dominanz[types[i]]; // 'gelebt' oder 'interessiert'
                }
            }
        }
        return 'gelebt';
    },

    /**
     * Extrahiert primäres Geschlecht
     */
    _extractGeschlechtPrimary: function(geschlecht) {
        if (!geschlecht) return 'divers';
        if (typeof geschlecht === 'string') return geschlecht;
        if (typeof geschlecht === 'object') {
            return geschlecht.primary || 'divers';
        }
        return 'divers';
    },

    /**
     * Extrahiert sekundäres Geschlecht
     */
    _extractGeschlechtSecondary: function(geschlecht) {
        if (!geschlecht || typeof geschlecht !== 'object') return null;
        return geschlecht.secondary || null;
    },

    /**
     * Extrahiert Geschlecht-Status
     */
    _extractGeschlechtStatus: function(geschlecht, which) {
        if (!geschlecht || typeof geschlecht !== 'object') return 'gelebt';
        if (which === 'primary') {
            return geschlecht.primaryStatus || 'gelebt';
        }
        if (which === 'secondary') {
            return geschlecht.secondaryStatus || 'gelebt';
        }
        return 'gelebt';
    },

    /**
     * Extrahiert Orientierung aus verschiedenen Formaten
     */
    _extractOrientierung: function(orientierung) {
        if (!orientierung) return 'heterosexuell';
        if (typeof orientierung === 'string') return orientierung;
        if (typeof orientierung === 'object') {
            // New format: { primary: 'homosexuell', secondary: 'heterosexuell' }
            if ('primary' in orientierung) {
                return orientierung.primary || 'heterosexuell';
            }
            // Old format: { bisexuell: 'gelebt', homosexuell: 'interessiert' }
            if (orientierung.bisexuell) return 'bisexuell';
            if (orientierung.homosexuell) return 'homosexuell';
            if (orientierung.heterosexuell) return 'heterosexuell';
        }
        return 'heterosexuell';
    },

    /**
     * Extrahiert Orientierung-Status
     */
    _extractOrientierungStatus: function(orientierung) {
        if (!orientierung) return 'gelebt';
        if (typeof orientierung === 'string') return 'gelebt';
        if (typeof orientierung === 'object') {
            // New format: { primary: 'homosexuell', secondary: 'heterosexuell' }
            if ('primary' in orientierung) {
                // If secondary is set, it means 'interessiert' state
                if (orientierung.secondary) return 'interessiert';
                if (orientierung.primary) return 'gelebt';
                return 'gelebt';
            }
            // Old format: { bisexuell: 'gelebt', homosexuell: 'interessiert' }
            var types = ['bisexuell', 'homosexuell', 'heterosexuell'];
            for (var i = 0; i < types.length; i++) {
                if (orientierung[types[i]]) {
                    return orientierung[types[i]]; // 'gelebt' oder 'interessiert'
                }
            }
        }
        return 'gelebt';
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
