/**
 * TIAGE SYNTHESE - Haupt-Calculator v3.1
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * HAUPT-FORMEL v3.1 (Dynamische Gewichtung + Dimensionale Resonanz)
 * ═══════════════════════════════════════════════════════════════════════════
 *
 *   Q = [(O × wO × r1) + (A × wA × r2) + (D × wD × r3) + (G × wG × r4)]
 *
 * Standard-Gewichtungen (aus UI-Slider, anpassbar):
 *   wO = 0.25 (25%) - Orientierung
 *   wA = 0.25 (25%) - Archetyp
 *   wD = 0.25 (25%) - Dominanz
 *   wG = 0.25 (25%) - Geschlecht
 *
 * Dimensionale Resonanz-Faktoren (0 - 1, v3.2 quadratisch mit Komplementär-Mapping):
 *   r1 = R_Leben       (Orientierung ↔ Anziehung/Intimität)
 *   r2 = R_Philosophie (Archetyp ↔ Beziehungsphilosophie)
 *   r3 = R_Dynamik     (Dominanz ↔ Machtdynamik)
 *   r4 = R_Identität   (Geschlecht ↔ Identität/Ausdruck)
 *
 *   R = similarity² → 0 = eliminiert, 0.5 = mittelmäßig, 1.0 = perfekt
 *
 * Wobei:
 *   O = Orientierungs-Score (PATHOS) - Sexuelle Orientierung
 *   A = Archetyp-Score (LOGOS)       - Beziehungsphilosophie
 *   D = Dominanz-Score (PATHOS)      - Dom/Sub/Switch Dynamik
 *   G = Geschlechts-Score (PATHOS)   - Gender-Attraktion
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * DIMENSIONALE RESONANZ ALS VORAB-MULTIPLIKATOR
 * ═══════════════════════════════════════════════════════════════════════════
 * Die dimensionalen Resonanzen (R_dim) wirken VOR der Berechnung auf die
 * Bedürfniswerte in der JSON:
 *
 *   Bedürfnis_final = Bedürfnis_base × R_dim
 *
 * Anwendung pro Dimension:
 *   - Orientierungs-Bedürfnisse × R_Leben
 *   - Dominanz-Bedürfnisse × R_Dynamik
 *   - Geschlechts-Bedürfnisse × R_Identität
 *
 * Effekt:
 *   - R_dim > 1.0 → Bedürfniswerte werden verstärkt
 *   - R_dim < 1.0 → Bedürfniswerte werden gedämpft
 *   - R_dim = 1.0 → Bedürfniswerte bleiben unverändert
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * BEIDE RESONANZEN WERDEN VERWENDET
 * ═══════════════════════════════════════════════════════════════════════════
 * 1. v3.1 Rs:  Wirken auf Bedürfnisse VORAB (pro Person, pro Dimension)
 * 2. Altes R:  Wirkt auf Gesamt-Score AM ENDE (pro Paarung)
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * BEDÜRFNIS-INTEGRATION PRO FAKTOR
 * ═══════════════════════════════════════════════════════════════════════════
 * Jeder Faktor (A, O, D, G) kombiniert Matrix-Score mit Bedürfnis-Match:
 *
 *   Faktor = (Matrix × matrixWeight) + (BedürfnisMatch × needsWeight)
 *
 * Relevante Bedürfnisse pro Faktor:
 *   - Archetyp: kinderwunsch, langfristige_bindung, nicht_anhaften_an_partner...
 *   - Orientierung: sexuelle_experimentierfreude, biologische_anziehung...
 *   - Dominanz: kontrolle_ausueben, hingabe, dynamische_evolution...
 *   - Geschlecht: authentizitaet, eigene_wahrheit, akzeptanz...
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * RESONANZ-FORMEL (Legacy/Fallback)
 * ═══════════════════════════════════════════════════════════════════════════
 *   R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
 *
 *   M = Bedürfnis-Match (0-100%) - Gesamt-Übereinstimmung
 *   B = Logos-Pathos-Balance = (100 - |Logos - Pathos|) / 100
 *   K = GFK-Kommunikationsfaktor (0-1) - Gewaltfreie Kommunikation
 */

var TiageSynthesis = TiageSynthesis || {};

// Letzte berechnete R-Faktoren (für UI-Display)
var _lastCombinedRFactors = { R1: null, R2: null, R3: null, R4: null };

// ═══════════════════════════════════════════════════════════════════════════
// R-FAKTOR KOMBINATION (v3.6: Summe × Similarity)
// ═══════════════════════════════════════════════════════════════════════════
function combineRFactors(R_ich, R_partner) {
    var a = R_ich || 1.0;
    var b = R_partner || 1.0;
    var summe = a + b;
    var similarity = Math.min(a, b) / Math.max(a, b);
    return Math.round(summe * similarity * 1000) / 1000;
}

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
     * @param {object} options.archetypProfile - Archetyp-Basis-Profile (aus tiage-beduerfnisse.js)
     * @param {object} options.archetypeDefinitions - Archetyp-Definitionen mit baseAttributes
     * @returns {object} Vollständiges Ergebnis mit Score, Resonanz und Details
     */
    calculate: function(person1, person2, matrixData, profilMatch, options) {
        var constants = TiageSynthesis.Constants;
        var factors = TiageSynthesis.Factors;

        // Optionen extrahieren
        options = options || {};

        // ═══════════════════════════════════════════════════════════════════
        // SCHRITT 0: Lifestyle-Filter (K.O.-Kriterien)
        // ═══════════════════════════════════════════════════════════════════

        var lifestyleResult = this._checkLifestyleFilter(
            person1.archetyp,
            person2.archetyp,
            options.archetypeDefinitions
        );

        // Bei K.O. früh abbrechen
        if (lifestyleResult && lifestyleResult.isKO) {
            return this._buildKOResult(person1, person2, lifestyleResult, matrixData);
        }

        // ═══════════════════════════════════════════════════════════════════
        // SCHRITT 0.5: v3.1 Dimensionale Resonanz als Vorab-Multiplikator
        // ═══════════════════════════════════════════════════════════════════
        // Berechne Kohärenz zwischen Archetyp und Bedürfnissen pro Person
        // und wende die Resonanzen auf die Bedürfniswerte an

        var needsIntegration = TiageSynthesis.NeedsIntegration;
        var resonanz1 = needsIntegration.calculateDimensionalResonance(person1);
        var resonanz2 = needsIntegration.calculateDimensionalResonance(person2);

        // Erstelle modifizierte Profile mit angepassten Bedürfnissen
        var person1Modified = this._cloneProfile(person1);
        var person2Modified = this._cloneProfile(person2);

        if (person1.needs) {
            person1Modified.needs = needsIntegration.applyResonanceToNeeds(person1.needs, resonanz1);
        }
        if (person2.needs) {
            person2Modified.needs = needsIntegration.applyResonanceToNeeds(person2.needs, resonanz2);
        }

        // Bedürfnis-Match berechnen mit modifizierten Werten
        var beduerfnisResult = null;
        if (profilMatch === undefined || profilMatch === null) {
            beduerfnisResult = this._calculateBedürfnisMatch(person1Modified, person2Modified, options.archetypProfile);
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
        // SCHRITT 1: Alle 4 Faktoren berechnen (mit modifizierten Profilen)
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

        // Scores extrahieren (Matrix-basiert)
        var matrixScores = {
            archetyp: archetypResult.score,
            orientierung: orientierungResult.score,
            dominanz: dominanzResult.score,
            geschlecht: geschlechtResult.score
        };

        // ═══════════════════════════════════════════════════════════════════
        // SCHRITT 1b: BEDÜRFNIS-INTEGRATION PRO FAKTOR (NEU!)
        // ═══════════════════════════════════════════════════════════════════
        // Formel: Faktor = (Matrix × matrixWeight) + (BedürfnisMatch × needsWeight)
        // Pirsig/Osho-Bedürfnisse fließen hier direkt in A, O, D, G ein

        var scores = {};
        var needsIntegrationDetails = null;

        if (TiageSynthesis.NeedsIntegration && constants.NEEDS_INTEGRATION && constants.NEEDS_INTEGRATION.ENABLED) {
            // Berechne Bedürfnis-Match pro Faktor
            var factorNeedsMatches = TiageSynthesis.NeedsIntegration.calculateAllFactorMatches(person1, person2);

            needsIntegrationDetails = {
                enabled: true,
                weights: constants.NEEDS_INTEGRATION.FACTOR_WEIGHTS,
                faktoren: {}
            };

            // Kombiniere Matrix + Bedürfnisse pro Faktor
            var faktorList = ['archetyp', 'orientierung', 'dominanz', 'geschlecht'];
            for (var i = 0; i < faktorList.length; i++) {
                var faktor = faktorList[i];
                var needsMatch = factorNeedsMatches[faktor];
                var combined = TiageSynthesis.NeedsIntegration.combineScores(
                    matrixScores[faktor],
                    needsMatch.score,
                    faktor
                );

                scores[faktor] = combined.combinedScore;
                needsIntegrationDetails.faktoren[faktor] = {
                    matrixScore: matrixScores[faktor],
                    needsScore: needsMatch.score,
                    combinedScore: combined.combinedScore,
                    needsIntegrated: combined.needsIntegrated,
                    gemeinsam: needsMatch.gemeinsam,
                    unterschiedlich: needsMatch.unterschiedlich
                };
            }
        } else {
            // FEHLER: NeedsIntegration MUSS verfügbar sein (v3.1)
            throw new Error(
                '[TIAGE Calculator] KRITISCHER FEHLER: NeedsIntegration nicht verfügbar oder deaktiviert!\n' +
                'Prüfe ob:\n' +
                '1. needsIntegration.js geladen ist\n' +
                '2. NEEDS_INTEGRATION.ENABLED = true in constants.js\n' +
                '3. TiageSynthesis.NeedsIntegration verfügbar ist'
            );
        }

        // ═══════════════════════════════════════════════════════════════════
        // SCHRITT 2: Logos und Pathos berechnen
        // ═══════════════════════════════════════════════════════════════════

        var logos = scores.archetyp;  // Nur Archetyp ist Logos

        var pathos = (scores.orientierung + scores.dominanz + scores.geschlecht) / 3;

        // ═══════════════════════════════════════════════════════════════════
        // SCHRITT 3: Resonanz berechnen (inkl. GFK-Faktor K)
        // ═══════════════════════════════════════════════════════════════════

        // Profile für dimensionale Resonanz extrahieren
        var profile1 = beduerfnisResult && beduerfnisResult.profile ? beduerfnisResult.profile.person1 : null;
        var profile2 = beduerfnisResult && beduerfnisResult.profile ? beduerfnisResult.profile.person2 : null;

        var resonanz = this._calculateResonance(logos, pathos, profilMatch, gfkFaktor, constants, profile1, profile2);

        // ═══════════════════════════════════════════════════════════════════
        // SCHRITT 4: Gewichtete Summe × Dimensionale Resonanz (v3.1)
        // ═══════════════════════════════════════════════════════════════════
        //
        // NEU: Jeder Faktor wird mit seiner zugehörigen R-Dimension multipliziert:
        //   A × R_Philosophie  (Archetyp ↔ Beziehungsphilosophie)
        //   O × R_Leben        (Orientierung ↔ Anziehung/Intimität)
        //   D × R_Dynamik      (Dominanz ↔ Machtdynamik)
        //   G × R_Identität    (Geschlecht ↔ Identität/Ausdruck)

        // UI-Gewichtungen laden (options.weights überschreibt UI/Default)
        var weights = options.weights || (constants.getWeights ? constants.getWeights() : constants.WEIGHTS);
        var dim = resonanz.dimensional;

        // ═══════════════════════════════════════════════════════════════════
        // SCHRITT 4a: SEKUNDÄR-BONI BERECHNEN (NEU!)
        // ═══════════════════════════════════════════════════════════════════
        // Formel: Bonus = BONUS_BASE × (weight / 0.25)
        // Je höher die Gewichtung, desto stärker der Bonus-Effekt

        var secondaryBonuses = this._calculateSecondaryBonuses(
            orientierungResult,
            dominanzResult,
            geschlechtResult,
            weights,
            constants
        );

        var baseScore =
            (scores.archetyp * weights.archetyp) +
            (scores.orientierung * weights.orientierung) +
            (scores.dominanz * weights.dominanz) +
            (scores.geschlecht * weights.geschlecht);

        var finalScore;

        // Prüfe ob dimensionale Resonanz verfügbar ist (mit korrekter Struktur)
        if (dim && dim.dimensions && dim.dimensions.philosophie && dim.dimensions.leben && dim.dimensions.dynamik && dim.dimensions.identitaet) {
            // v3.1: Dimensionale Multiplikation MIT Sekundär-Boni
            finalScore = Math.round(
                (scores.archetyp * weights.archetyp * dim.dimensions.philosophie.rValue) +
                (scores.orientierung * weights.orientierung * dim.dimensions.leben.rValue * secondaryBonuses.orientierung.multiplier) +
                (scores.dominanz * weights.dominanz * dim.dimensions.dynamik.rValue * secondaryBonuses.dominanz.multiplier) +
                (scores.geschlecht * weights.geschlecht * dim.dimensions.identitaet.rValue * secondaryBonuses.geschlecht.multiplier)
            );
        } else {
            // FEHLER: Dimensionale Resonanz MUSS verfügbar sein (v3.1)
            throw new Error(
                '[TIAGE Calculator] KRITISCHER FEHLER: Dimensionale Resonanz nicht verfügbar!\n' +
                'Prüfe ob:\n' +
                '1. RESONANCE_DIMENSIONAL.ENABLED = true in constants.js\n' +
                '2. Profile haben needs-Daten\n' +
                '3. NeedsIntegration.calculateResonanceFromPerspectives() funktioniert\n' +
                'Dimensional: ' + JSON.stringify(dim)
            );
        }

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
                hardKOReason: orientierungResult.details.hardKOReason || null,

                // Soft-KO: Starke Bedürfnis-Konflikte
                isSoftKO: this._checkSoftKO(beduerfnisResult, constants),
                softKODetails: this._getSoftKODetails(beduerfnisResult, constants),

                // Lifestyle-Warnungen (aus baseAttributes)
                lifestyleWarnings: lifestyleResult ? lifestyleResult.warnings : [],
                hasLifestyleWarnings: lifestyleResult && lifestyleResult.warnings.length > 0,

                // P↔S Bonus
                psBonus: this._calculatePSBonus(person1, person2, constants),

                // NEU: Bedürfnis-Integration pro Faktor (Pirsig/Osho)
                needsIntegration: needsIntegrationDetails,

                // v3.1: Dimensionale Resonanzen als Vorab-Multiplikator
                v31Resonanz: {
                    person1: resonanz1,
                    person2: resonanz2,
                    enabled: resonanz1.enabled && resonanz2.enabled
                },

                // NEU: Sekundär-Boni (O, D, G)
                secondaryBonuses: secondaryBonuses
            },

            // Bedürfnis-Übereinstimmung (Gesamt)
            beduerfnisse: beduerfnisResult,

            // NEU: Statistische Unsicherheit (80% Konfidenzintervall)
            uncertainty: this._calculateUncertainty(finalScore, beduerfnisResult)
        };
    },

    /**
     * Berechnet die statistische Unsicherheit des Scores
     *
     * Basiert auf Gaußscher Normalverteilung:
     * - Jedes Bedürfnis hat einen Erwartungswert (μ) und Standardabweichung (σ)
     * - Das 80% Konfidenzintervall nutzt z = 1.28
     *
     * @param {number} score - Der finale Score
     * @param {object} beduerfnisResult - Bedürfnis-Match-Ergebnis
     * @returns {object} { margin, lower, upper, confidence, sigma }
     */
    _calculateUncertainty: function(score, beduerfnisResult) {
        // Falls TiageStatistics nicht geladen
        if (typeof TiageStatistics === 'undefined') {
            console.warn('[TIAGE Calculator] TiageStatistics nicht geladen - verwende Default-Uncertainty (margin=14)');
            return {
                margin: 14,  // Default-Schätzung
                lower: Math.max(0, score - 14),
                upper: Math.min(100, score + 14),
                confidence: 80,
                sigma: 14,
                available: false
            };
        }

        // Sammle relevante Kategorien
        var kategorien = [];
        if (beduerfnisResult && beduerfnisResult.gemeinsam) {
            for (var i = 0; i < beduerfnisResult.gemeinsam.length; i++) {
                var item = beduerfnisResult.gemeinsam[i];
                var kat = TiageStatistics.findKategorieForBeduerfnis(item.key);
                if (kat) kategorien.push(kat);
            }
        }
        if (beduerfnisResult && beduerfnisResult.unterschiedlich) {
            for (var j = 0; j < beduerfnisResult.unterschiedlich.length; j++) {
                var item2 = beduerfnisResult.unterschiedlich[j];
                var kat2 = TiageStatistics.findKategorieForBeduerfnis(item2.key);
                if (kat2) kategorien.push(kat2);
            }
        }

        var result = TiageStatistics.calculateScoreUncertainty(score, kategorien, 80);
        result.available = true;
        result.formatted = TiageStatistics.formatScoreWithUncertainty(score, result.margin);

        return result;
    },

    /**
     * Prüft ob Soft-KO vorliegt (zu viele kritische Bedürfnis-Konflikte)
     */
    _checkSoftKO: function(beduerfnisResult, constants) {
        if (!beduerfnisResult || !constants.SOFT_KO || !constants.SOFT_KO.ENABLED) {
            return false;
        }

        var unterschiedlich = beduerfnisResult.unterschiedlich || [];
        var criticalThreshold = constants.SOFT_KO.THRESHOLDS.CRITICAL;
        var minConflicts = constants.SOFT_KO.MIN_CRITICAL_CONFLICTS;

        // Zähle kritische Konflikte (Differenz > 50)
        var criticalCount = 0;
        for (var i = 0; i < unterschiedlich.length; i++) {
            if (unterschiedlich[i].differenz > criticalThreshold) {
                criticalCount++;
            }
        }

        return criticalCount >= minConflicts;
    },

    /**
     * Gibt Details zu Soft-KO zurück
     */
    _getSoftKODetails: function(beduerfnisResult, constants) {
        if (!beduerfnisResult) return null;

        var unterschiedlich = beduerfnisResult.unterschiedlich || [];
        var thresholds = constants.SOFT_KO ? constants.SOFT_KO.THRESHOLDS : { CRITICAL: 50, HIGH: 35 };

        var criticalConflicts = [];
        var highConflicts = [];

        for (var i = 0; i < unterschiedlich.length; i++) {
            var item = unterschiedlich[i];
            if (item.differenz > thresholds.CRITICAL) {
                criticalConflicts.push(item);
            } else if (item.differenz > thresholds.HIGH) {
                highConflicts.push(item);
            }
        }

        return {
            criticalCount: criticalConflicts.length,
            highCount: highConflicts.length,
            criticalNeeds: criticalConflicts.slice(0, 3), // Top 3
            highNeeds: highConflicts.slice(0, 3)
        };
    },

    /**
     * Berechnet P↔S Bonus wenn Sekundär-Dimensionen komplementär sind
     */
    _calculatePSBonus: function(person1, person2, constants) {
        if (!constants.PS_VALIDATION || !constants.PS_VALIDATION.ENABLED) {
            return { applied: false, value: 0 };
        }

        var bonus = 0;
        var reasons = [];

        // Dominanz P↔S Check
        var dom1 = this._extractDominanz(person1.dominanz);
        var dom2 = this._extractDominanz(person2.dominanz);

        // Wenn P1=dominant und P2=submissiv (oder umgekehrt) = komplementär
        if ((dom1 === 'dominant' && dom2 === 'submissiv') ||
            (dom1 === 'submissiv' && dom2 === 'dominant')) {
            bonus += constants.PS_VALIDATION.COMPLEMENTARY_BONUS;
            reasons.push('dominanz_komplementaer');
        }

        // Switch passt zu allem
        if (dom1 === 'switch' || dom2 === 'switch') {
            bonus += Math.round(constants.PS_VALIDATION.COMPLEMENTARY_BONUS / 2);
            reasons.push('switch_flexibel');
        }

        return {
            applied: bonus > 0,
            value: bonus,
            reasons: reasons
        };
    },

    /**
     * Berechnet die Bedürfnis-Übereinstimmung zwischen zwei Personen
     *
     * NEU: Nutzt profile.needs direkt wenn verfügbar (VEREINFACHT!)
     * Fallback: Alte BeduerfnisModifikatoren-Logik
     *
     * @param {object} person1 - Profil Person 1
     * @param {object} person2 - Profil Person 2
     * @param {object} archetypProfile - Basis-Archetyp-Profile (optional, nur für Fallback)
     * @returns {object|null} { score, gemeinsam, unterschiedlich, komplementaer, profile }
     */
    _calculateBedürfnisMatch: function(person1, person2, archetypProfile) {

        // ════════════════════════════════════════════════════════════════════
        // NEU: VEREINFACHTER WEG - Nutze profile.needs direkt!
        // Wenn beide Profile bereits needs haben, nutze TiageProfileStore
        // ════════════════════════════════════════════════════════════════════

        if (person1.needs && person2.needs && typeof TiageProfileStore !== 'undefined') {
            // NEUER WEG: Direkt aus Profil - EINE QUELLE DER WAHRHEIT!
            var result = TiageProfileStore.calculateNeedsMatch(person1, person2);

            // Format anpassen für Kompatibilität
            return {
                score: result.score,
                gemeinsam: result.gemeinsam,
                unterschiedlich: result.unterschiedlich,
                komplementaer: result.komplementaer,
                profile: {
                    person1: person1.needs,
                    person2: person2.needs
                },
                source: 'profile.needs'  // Markierung: Neuer vereinfachter Weg
            };
        }

        // ════════════════════════════════════════════════════════════════════
        // FALLBACK: Alter Weg mit BeduerfnisModifikatoren
        // Wird verwendet wenn profile.needs nicht verfügbar
        // ════════════════════════════════════════════════════════════════════

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

        if (!basis1 || !basis1.umfrageWerte || !basis2 || !basis2.umfrageWerte) {
            console.warn('Archetyp nicht gefunden:', person1.archetyp, person2.archetyp);
            return null;
        }

        // Vollständige Bedürfnis-Profile berechnen (ALTER WEG)
        var profil1 = BeduerfnisModifikatoren.berechneVollständigesBedürfnisProfil({
            basisBedürfnisse: basis1.umfrageWerte,
            dominanz: this._extractDominanz(person1.dominanz),
            dominanzStatus: this._extractStatus(person1.dominanz),
            geschlechtPrimary: this._extractGeschlechtPrimary(person1.geschlecht),
            geschlechtPrimaryStatus: this._extractGeschlechtStatus(person1.geschlecht, 'primary'),
            geschlechtSecondary: this._extractGeschlechtSecondary(person1.geschlecht),
            geschlechtSecondaryStatus: this._extractGeschlechtStatus(person1.geschlecht, 'secondary'),
            geschlechtsidentitaet: this._extractGeschlechtsidentitaet(person1.geschlecht),
            geschlechtsidentitaetStatus: this._extractGeschlechtStatus(person1.geschlecht, 'secondary'),
            orientierung: this._extractOrientierung(person1.orientierung),
            orientierungStatus: this._extractOrientierungStatus(person1.orientierung)
        });

        var profil2 = BeduerfnisModifikatoren.berechneVollständigesBedürfnisProfil({
            basisBedürfnisse: basis2.umfrageWerte,
            dominanz: this._extractDominanz(person2.dominanz),
            dominanzStatus: this._extractStatus(person2.dominanz),
            geschlechtPrimary: this._extractGeschlechtPrimary(person2.geschlecht),
            geschlechtPrimaryStatus: this._extractGeschlechtStatus(person2.geschlecht, 'primary'),
            geschlechtSecondary: this._extractGeschlechtSecondary(person2.geschlecht),
            geschlechtSecondaryStatus: this._extractGeschlechtStatus(person2.geschlecht, 'secondary'),
            geschlechtsidentitaet: this._extractGeschlechtsidentitaet(person2.geschlecht),
            geschlechtsidentitaetStatus: this._extractGeschlechtStatus(person2.geschlecht, 'secondary'),
            orientierung: this._extractOrientierung(person2.orientierung),
            orientierungStatus: this._extractOrientierungStatus(person2.orientierung)
        });

        // Übereinstimmung berechnen (mit Identitäts-Resonanz)
        var result = BeduerfnisModifikatoren.berechneÜbereinstimmung(profil1, profil2, {
            identitaet1: this._extractGeschlechtsidentitaet(person1.geschlecht),
            identitaet2: this._extractGeschlechtsidentitaet(person2.geschlecht)
        });

        // Profile zum Ergebnis hinzufügen
        result.profile = {
            person1: profil1,
            person2: profil2
        };
        result.source = 'BeduerfnisModifikatoren';  // Markierung: Alter Weg

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
     * Extrahiert Geschlechtsidentität (cis, trans, nonbinaer, fluid, suchend)
     *
     * Mapping von UI-Werten zu internen Werten:
     * - Aus geschlecht.secondary wenn vorhanden
     * - Fallback: Ableitung aus Primary/Secondary Kombination
     */
    _extractGeschlechtsidentitaet: function(geschlecht) {
        if (!geschlecht) return 'cis';

        if (typeof geschlecht === 'object') {
            var secondary = geschlecht.secondary;

            // Direkte Mapping für neue Identitäts-Werte
            if (secondary === 'cis' || secondary === 'trans' ||
                secondary === 'nonbinaer' || secondary === 'fluid' ||
                secondary === 'suchend') {
                return secondary;
            }

            // Legacy-Support: Alte Werte umwandeln
            if (secondary === 'unsicher') return 'suchend';

            // Fallback: Cis wenn kein secondary
            return 'cis';
        }

        return 'cis';
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
            console.warn('[TIAGE Calculator] GFK-Matrix-Key "' + key + '" nicht gefunden - verwende Default 0.5 (mittel-mittel)');
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
     * LEGACY: R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
     * NEU v3.1: Multi-Dimensionale Resonanz wenn Profile verfügbar
     *
     * @param {number} logos - Logos-Score (0-100)
     * @param {number} pathos - Pathos-Durchschnitt (0-100)
     * @param {number} profilMatch - Profil-Match (0-100)
     * @param {object} gfkFaktor - GFK-Faktor Objekt mit .value
     * @param {object} constants - TiageSynthesis.Constants
     * @param {object} profil1 - Bedürfnisse Person 1 (optional, für dimensionale Berechnung)
     * @param {object} profil2 - Bedürfnisse Person 2 (optional, für dimensionale Berechnung)
     * @returns {object} { coefficient, balance, profilMatch, gfk, interpretation, dimensional }
     */
    _calculateResonance: function(logos, pathos, profilMatch, gfkFaktor, constants, profil1, profil2) {
        var cfg = constants.RESONANCE;

        // Logos-Pathos-Balance: B = (100 - |Logos - Pathos|) / 100
        var differenz = Math.abs(logos - pathos);
        var balance = (100 - differenz) / 100;

        // GFK-Wert extrahieren (K)
        var gfkValue = gfkFaktor.value;

        // ═══════════════════════════════════════════════════════════════════
        // Multi-Dimensionale Resonanz (v3.1)
        // ═══════════════════════════════════════════════════════════════════
        var dimensional = null;
        var coefficient;

        if (profil1 && profil2 && constants.RESONANCE_DIMENSIONAL && constants.RESONANCE_DIMENSIONAL.ENABLED) {
            // Neue dimensionale Berechnung
            dimensional = this._calculateDimensionalResonance(profil1, profil2, constants);

            if (dimensional) {
                // Dimensionaler Koeffizient als Basis, moduliert durch GFK
                // R = R_dimensional × (0.85 + K × 0.15)
                var gfkModulator = 0.85 + (gfkValue * 0.15);
                coefficient = dimensional.coefficient * gfkModulator;
                coefficient = Math.round(coefficient * 1000) / 1000;
            }
        }

        // FEHLER wenn dimensional nicht verfügbar
        if (!dimensional) {
            throw new Error(
                '[TIAGE Calculator] KRITISCHER FEHLER: Dimensionale Resonanz-Berechnung fehlgeschlagen!\n' +
                'Prüfe ob:\n' +
                '1. RESONANCE_DIMENSIONAL.ENABLED = true in constants.js\n' +
                '2. profil1 und profil2 haben needs-Daten: ' +
                    'profil1=' + (profil1 ? 'OK' : 'NULL') + ', profil2=' + (profil2 ? 'OK' : 'NULL') + '\n' +
                '3. NeedsIntegration._calculateDimensionalResonance() ist verfügbar\n' +
                '4. Gespeicherte R-Werte in ResonanzCard/TiageState vorhanden'
            );
        }

        return {
            coefficient: coefficient,
            balance: Math.round(balance * 100) / 100,
            differenz: Math.round(differenz),
            profilMatch: profilMatch,
            gfk: gfkFaktor,
            interpretation: this._interpretResonance(coefficient),
            // NEU: Dimensionale Details
            dimensional: dimensional
        };
    },

    /**
     * Interpretiert den Resonanz-Koeffizienten
     * v3.4: Richtungsbasiert um 1.0 zentriert
     *       R > 1.0 = verstärkt, R = 1.0 = neutral, R < 1.0 = geschwächt
     */
    _interpretResonance: function(coefficient) {
        // v3.4: Schwellenwerte um 1.0 zentriert
        if (coefficient >= 1.08) return { level: 'harmonie', text: 'Logos und Pathos verstärken sich' };
        if (coefficient >= 1.02) return { level: 'resonanz', text: 'Gute Schwingung zwischen Kopf und Herz' };
        if (coefficient >= 0.98) return { level: 'neutral', text: 'Ausgewogenes Verhältnis' };
        if (coefficient >= 0.93) return { level: 'spannung', text: 'Leichte Spannung zwischen Logos und Pathos' };
        return { level: 'dissonanz', text: 'Logos und Pathos widersprechen sich' };
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MULTI-DIMENSIONALE RESONANZ (v3.1)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Berechnet Multi-Dimensionale Resonanz
     *
     * NEU (v3.2): Perspektiven-basierte Berechnung mit gespeicherten R-Werten
     *   1. Lese individuelle R-Werte aus gespeicherten Profilen (ResonanzCard/TiageState)
     *   2. Kombiniere via Produkt: R_combined = R_Person1 × R_Person2
     *   3. Q = A×0.25×R1 + O×0.25×R2 + D×0.25×R3 + G×0.25×R4
     *
     * @param {object} profil1 - Bedürfnisse Person 1
     * @param {object} profil2 - Bedürfnisse Person 2
     * @param {object} constants - TiageSynthesis.Constants
     * @returns {object} { coefficient, dimensions, interpretation, perspectiveMatrix }
     */
    _calculateDimensionalResonance: function(profil1, profil2, constants) {
        var cfg = constants.RESONANCE_DIMENSIONAL;

        if (!cfg || !cfg.ENABLED) {
            throw new Error(
                '[TIAGE Calculator] KRITISCHER FEHLER: RESONANCE_DIMENSIONAL nicht konfiguriert oder deaktiviert!\n' +
                'Prüfe ob:\n' +
                '1. RESONANCE_DIMENSIONAL existiert in constants.js\n' +
                '2. RESONANCE_DIMENSIONAL.ENABLED = true\n' +
                'Config: ' + JSON.stringify(cfg)
            );
        }

        // ═══════════════════════════════════════════════════════════════════
        // NEU (v3.2): Gespeicherte R-Werte lesen und via Produkt kombinieren
        // ═══════════════════════════════════════════════════════════════════
        // INDIVIDUELL: Jede Person hat eigene R-Werte (Kohärenz mit Archetyp)
        // RELATIONAL: Kombination via Produkt: R = R_Person1 × R_Person2
        // ═══════════════════════════════════════════════════════════════════
        var perspectiveResult = null;

        // Versuche gespeicherte R-Werte zu lesen
        var r1_ich = null, r1_partner = null;

        // Option 1: ResonanzCard.getValues (bevorzugt)
        if (typeof ResonanzCard !== 'undefined' && ResonanzCard.getValues) {
            r1_ich = ResonanzCard.getValues('ich');
            r1_partner = ResonanzCard.getValues('partner');
        }

        // Option 2: LoadedArchetypProfile
        if (!r1_ich && typeof window !== 'undefined' && window.LoadedArchetypProfile) {
            if (window.LoadedArchetypProfile.ich && window.LoadedArchetypProfile.ich.resonanzFaktoren) {
                var rf = window.LoadedArchetypProfile.ich.resonanzFaktoren;
                // Konvertiere { R1: { value, locked } } → { R1: value }
                r1_ich = {
                    R1: (rf.R1 && typeof rf.R1 === 'object') ? rf.R1.value : rf.R1,
                    R2: (rf.R2 && typeof rf.R2 === 'object') ? rf.R2.value : rf.R2,
                    R3: (rf.R3 && typeof rf.R3 === 'object') ? rf.R3.value : rf.R3,
                    R4: (rf.R4 && typeof rf.R4 === 'object') ? rf.R4.value : rf.R4
                };
            }
            if (window.LoadedArchetypProfile.partner && window.LoadedArchetypProfile.partner.resonanzFaktoren) {
                var rfp = window.LoadedArchetypProfile.partner.resonanzFaktoren;
                // Konvertiere { R1: { value, locked } } → { R1: value }
                r1_partner = {
                    R1: (rfp.R1 && typeof rfp.R1 === 'object') ? rfp.R1.value : rfp.R1,
                    R2: (rfp.R2 && typeof rfp.R2 === 'object') ? rfp.R2.value : rfp.R2,
                    R3: (rfp.R3 && typeof rfp.R3 === 'object') ? rfp.R3.value : rfp.R3,
                    R4: (rfp.R4 && typeof rfp.R4 === 'object') ? rfp.R4.value : rfp.R4
                };
            }
        }

        // Option 3: TiageState direkt (SSOT)
        if (!r1_ich && typeof TiageState !== 'undefined') {
            try {
                var storedIch = TiageState.get('archetypes.ich.resonanzFaktoren');
                var storedPartner = TiageState.get('archetypes.partner.resonanzFaktoren');
                if (storedIch) {
                    // Konvertiere { R1: { value, locked } } → { R1: value }
                    r1_ich = {
                        R1: (storedIch.R1 && typeof storedIch.R1 === 'object') ? storedIch.R1.value : storedIch.R1,
                        R2: (storedIch.R2 && typeof storedIch.R2 === 'object') ? storedIch.R2.value : storedIch.R2,
                        R3: (storedIch.R3 && typeof storedIch.R3 === 'object') ? storedIch.R3.value : storedIch.R3,
                        R4: (storedIch.R4 && typeof storedIch.R4 === 'object') ? storedIch.R4.value : storedIch.R4
                    };
                }
                if (storedPartner) {
                    // Konvertiere { R1: { value, locked } } → { R1: value }
                    r1_partner = {
                        R1: (storedPartner.R1 && typeof storedPartner.R1 === 'object') ? storedPartner.R1.value : storedPartner.R1,
                        R2: (storedPartner.R2 && typeof storedPartner.R2 === 'object') ? storedPartner.R2.value : storedPartner.R2,
                        R3: (storedPartner.R3 && typeof storedPartner.R3 === 'object') ? storedPartner.R3.value : storedPartner.R3,
                        R4: (storedPartner.R4 && typeof storedPartner.R4 === 'object') ? storedPartner.R4.value : storedPartner.R4
                    };
                }
            } catch (e) {
                console.warn('Konnte gespeicherte R-Werte nicht laden:', e);
            }
        }

        // Hilfsfunktion: Extrahiere numerischen Wert aus R-Faktor (number oder { value, locked })
        function extractRValue(rValue) {
            if (rValue === undefined || rValue === null) return 1.0;
            if (typeof rValue === 'number') return rValue;
            if (typeof rValue === 'object' && rValue.value !== undefined) return rValue.value;
            return 1.0;
        }

        // Wenn beide R-Werte verfügbar: Kombiniere via Summe × Similarity (v3.6)
        if (r1_ich && r1_partner && r1_ich.R1 !== undefined && r1_partner.R1 !== undefined) {
            // Kombination via Summe × Similarity: belohnt wenn beide ÄHNLICH sind
            var R1_combined = combineRFactors(extractRValue(r1_ich.R1), extractRValue(r1_partner.R1));
            var R2_combined = combineRFactors(extractRValue(r1_ich.R2), extractRValue(r1_partner.R2));
            var R3_combined = combineRFactors(extractRValue(r1_ich.R3), extractRValue(r1_partner.R3));
            var R4_combined = combineRFactors(extractRValue(r1_ich.R4), extractRValue(r1_partner.R4));

            perspectiveResult = {
                R1: R1_combined,
                R2: R2_combined,
                R3: R3_combined,
                R4: R4_combined,
                source: 'stored_similarity',
                individual: {
                    ich: r1_ich,
                    partner: r1_partner
                }
            };

            // Speichere für UI-Display
            _lastCombinedRFactors = {
                R1: R1_combined,
                R2: R2_combined,
                R3: R3_combined,
                R4: R4_combined
            };
        }

        // Fallback: Berechnung via NeedsIntegration wenn keine gespeicherten Werte
        if (!perspectiveResult && TiageSynthesis.NeedsIntegration && TiageSynthesis.NeedsIntegration.calculateResonanceFromPerspectives) {
            // Hole Archetypen aus den Profilen (falls vorhanden)
            var archetyp1 = profil1.archetyp || 'duo';
            var archetyp2 = profil2.archetyp || 'duo';
            perspectiveResult = TiageSynthesis.NeedsIntegration.calculateResonanceFromPerspectives(
                profil1.needs || profil1,
                archetyp1,
                profil2.needs || profil2,
                archetyp2
            );
        }

        // ═══════════════════════════════════════════════════════════════════
        // R1 (LEBEN/ORIENTIERUNG) - UNIVERSELLE BERECHNUNG
        // ═══════════════════════════════════════════════════════════════════
        //
        // Basiert auf ORIENTATION_OPENNESS (Similarity-Attraction Theorie):
        //   hetero/homo=0, hetero-homo=25, hetero-bi=50, bi=75, bi-bi=100
        //
        // v3.2: Formel (quadratisch mit Komplementär-Mapping):
        //   similarity = 1 - (avgDiff / 100)
        //   R = similarity² (mit Komplementär-Mapping für Geben/Empfangen-Paare)
        //
        // Range: 0 (totaler Mismatch) bis 1 (perfekte Übereinstimmung)
        //
        // Wissenschaftliche Grundlage:
        //   - Within-couple Similarity in Sexuality → Sexual Satisfaction (PMC)
        //   - Bi-Identity Anerkennung kritisch für Zufriedenheit (Journal of Bisexuality)
        //   - Sexual Openness hat 5 Subdimensionen (PMC 2017)
        //
        if (perspectiveResult) {
            // Orientierung aus Profilen extrahieren
            var ori1 = profil1.orientierung || {};
            var ori2 = profil2.orientierung || {};

            // Primary und Secondary zu Openness-Key kombinieren
            var oriKey1 = this._getOrientationOpennessKey(ori1);
            var oriKey2 = this._getOrientationOpennessKey(ori2);

            // ORIENTATION_OPENNESS aus constants holen
            var orientationOpenness = constants.ORIENTATION_OPENNESS || {
                'hetero': 0, 'homo': 0,
                'hetero-homo': 25, 'homo-hetero': 25,
                'hetero-bi': 50, 'homo-bi': 50,
                'bi': 75, 'bi-hetero': 90, 'bi-homo': 90, 'bi-bi': 100
            };

            var oriO1 = orientationOpenness[oriKey1] !== undefined ? orientationOpenness[oriKey1] : 0;
            var oriO2 = orientationOpenness[oriKey2] !== undefined ? orientationOpenness[oriKey2] : 0;

            // Formel anwenden
            var oriDifferenz = Math.abs(oriO1 - oriO2);
            var oriAehnlichkeit = 1 - (oriDifferenz / 100);
            var basisR1 = 0.5 + (oriAehnlichkeit * 0.5);
            var oriOpennessBonus = (oriO1 + oriO2) / 400;
            var calculatedR1 = Math.round((basisR1 + oriOpennessBonus) * 1000) / 1000;

            // R1 überschreiben mit berechneter Orientierungs-Resonanz
            perspectiveResult.R1 = calculatedR1;
            perspectiveResult.orientationResonance = {
                key1: oriKey1,
                key2: oriKey2,
                openness1: oriO1,
                openness2: oriO2,
                differenz: oriDifferenz,
                aehnlichkeit: oriAehnlichkeit,
                basisR1: Math.round(basisR1 * 1000) / 1000,
                opennessBonus: Math.round(oriOpennessBonus * 1000) / 1000,
                finalR1: calculatedR1
            };

            console.log('[TIAGE Calculator] R1 (Leben/Orientierung) berechnet:', perspectiveResult.orientationResonance);
        }

        // ═══════════════════════════════════════════════════════════════════
        // R4 (IDENTITÄT) - GOD-KOMBINIERTE BERECHNUNG (v3.6)
        // ═══════════════════════════════════════════════════════════════════
        //
        // Kombiniert drei Ansätze:
        //   1. EMPIRISCH: Ähnlichkeits-Bonus bei gleicher Identität (T4T-Effekt)
        //   2. PIRSIG: Openness-Bonus basierend auf "Dynamischer Qualität"
        //   3. NEU: Orientierungs-Openness fließt mit ein (Bi/Pan = höhere Offenheit)
        //
        // IDENTITY_OPENNESS (Pirsig-inspiriert):
        //   cis=0, trans=30, nonbinaer=50, fluid=80, suchend=100
        //
        // ORIENTATION_OPENNESS (aus R1-Berechnung):
        //   hetero=0, homo=0, bi=75, bi-bi=100
        //
        // GOD-kombinierte Formel:
        //   BASIS = R4_ich × R4_partner (individueller Archetypen-Vergleich)
        //   Ähnlichkeits-Faktor = 1.3 (wenn gleiche Identität) oder 1.0
        //   Identity-Openness = (idO1 + idO2) × IDENTITY_WEIGHT
        //   Orientation-Openness = (oriO1 + oriO2) × ORIENTATION_WEIGHT
        //   Combined-Openness = (Identity-Openness + Orientation-Openness) / DIVISOR
        //   R4 = BASIS + (Ähnlichkeits-Faktor × Combined-Openness)
        //
        // Wissenschaftliche Grundlage:
        //   - Similarity-Attraction Effect (Byrne, 1971)
        //   - T4T-Beziehungen zeigen höhere Zufriedenheit durch Partner-Affirmation
        //   - Bi/Pan-Personen zeigen höhere Beziehungs-Flexibilität (Journal of Bisexuality)
        //   - Paare mit ähnlich hoher Openness → bessere Beziehungsqualität (Frontiers 2017)
        //
        if (perspectiveResult) {
            var secondary1 = (profil1.geschlecht && profil1.geschlecht.secondary) || 'cis';
            var secondary2 = (profil2.geschlecht && profil2.geschlecht.secondary) || 'cis';

            // IDENTITY_OPENNESS aus constants holen
            var identityOpenness = constants.IDENTITY_OPENNESS || {
                'cis': 0, 'trans': 30, 'nonbinaer': 50, 'fluid': 80, 'suchend': 100
            };

            // ORIENTATION_OPENNESS aus constants holen (auch für R4 verwenden)
            var orientationOpenness = constants.ORIENTATION_OPENNESS || {
                'hetero': 0, 'homo': 0,
                'hetero-homo': 25, 'homo-hetero': 25,
                'hetero-bi': 50, 'homo-bi': 50,
                'bi': 75, 'bi-hetero': 90, 'bi-homo': 90, 'bi-bi': 100
            };

            // IDENTITY_RESONANCE Konstanten (erweitert mit GOD-Gewichtungen)
            // FIX v3.8: Korrekte SSOT-Werte als Fallback (30%/70% statt 50%/50%)
            var identityResonance = constants.IDENTITY_RESONANCE || {
                SIMILARITY_FACTOR_MATCH: 1.3,
                SIMILARITY_FACTOR_DIFF: 1.0,
                OPENNESS_DIVISOR: 200,
                IDENTITY_WEIGHT: 0.3,       // 30% für Geschlechts-Identität
                ORIENTATION_WEIGHT: 0.7    // 70% für Orientierung
            };

            // Identity-Openness berechnen
            var idO1 = identityOpenness[secondary1] !== undefined ? identityOpenness[secondary1] : 0;
            var idO2 = identityOpenness[secondary2] !== undefined ? identityOpenness[secondary2] : 0;

            // Orientation-Openness berechnen (v3.6: P/S-gewichtet mit 70%/30%)
            var ori1 = profil1.orientierung || {};
            var ori2 = profil2.orientierung || {};
            var oriResult1 = this._calculateWeightedOrientationOpenness(ori1, constants);
            var oriResult2 = this._calculateWeightedOrientationOpenness(ori2, constants);
            var oriO1 = oriResult1.openness;
            var oriO2 = oriResult2.openness;

            // GOD-kombinierte Openness berechnen
            // FIX v3.8: Korrekte SSOT-Werte als Fallback (30%/70% statt 50%/50%)
            var identityWeight = identityResonance.IDENTITY_WEIGHT || 0.3;
            var orientationWeight = identityResonance.ORIENTATION_WEIGHT || 0.7;
            var combinedO1 = (idO1 * identityWeight) + (oriO1 * orientationWeight);
            var combinedO2 = (idO2 * identityWeight) + (oriO2 * orientationWeight);

            // Hybrid-Formel anwenden
            // BASIS = perspectiveResult.R4 (bereits aus R4_ich × R4_partner berechnet)
            var basisR4 = perspectiveResult.R4;

            // Ähnlichkeits-Faktor: Bonus wenn gleiche Identität
            var gleicheIdentitaet = (secondary1 === secondary2);
            var aehnlichkeitsFaktor = gleicheIdentitaet
                ? identityResonance.SIMILARITY_FACTOR_MATCH
                : identityResonance.SIMILARITY_FACTOR_DIFF;

            // Combined-Openness-Bonus: (combinedO1 + combinedO2) / 200 → Range 0-1
            var opennessBonus = (combinedO1 + combinedO2) / identityResonance.OPENNESS_DIVISOR;

            // Finale Formel: R4 = BASIS + (Ähnlichkeits-Faktor × Combined-Openness)
            var calculatedR4 = Math.round((basisR4 + (aehnlichkeitsFaktor * opennessBonus)) * 1000) / 1000;

            // R4 mit GOD-kombinierter Berechnung aktualisieren
            perspectiveResult.R4 = calculatedR4;
            perspectiveResult.identityResonance = {
                // Geschlechts-Identität
                secondary1: secondary1,
                secondary2: secondary2,
                identityOpenness1: idO1,
                identityOpenness2: idO2,
                // Orientierung (v3.6: P/S-gewichtet 70%/30%)
                orientation1: oriResult1.details,
                orientation2: oriResult2.details,
                orientationOpenness1: oriO1,
                orientationOpenness2: oriO2,
                // GOD-kombiniert
                combinedOpenness1: Math.round(combinedO1 * 100) / 100,
                combinedOpenness2: Math.round(combinedO2 * 100) / 100,
                // Berechnung
                gleicheIdentitaet: gleicheIdentitaet,
                aehnlichkeitsFaktor: aehnlichkeitsFaktor,
                basisR4: Math.round(basisR4 * 1000) / 1000,
                opennessBonus: Math.round(opennessBonus * 1000) / 1000,
                hybridBonus: Math.round((aehnlichkeitsFaktor * opennessBonus) * 1000) / 1000,
                finalR4: calculatedR4
            };

            console.log('[TIAGE Calculator] R4 (Identität) GOD-kombiniert berechnet:', perspectiveResult.identityResonance);
        }

        if (perspectiveResult) {
            // Schwellenwerte aus RESONANCE_DIMENSIONAL.THRESHOLDS (v3.4: 1.05/0.95)
            var resonanzThreshold = cfg.THRESHOLDS.resonanz;   // 1.05 = verstärkter Match
            var dissonanzThreshold = cfg.THRESHOLDS.dissonanz; // 0.95 = geschwächter Match

            // Konvertiere zu dimensions-Format für Kompatibilität
            var dimensions = {
                leben: {
                    name: 'Leben',
                    emoji: '🔥',
                    match: Math.round(perspectiveResult.R1 * 100),
                    rValue: perspectiveResult.R1,
                    status: perspectiveResult.R1 >= resonanzThreshold ? 'resonanz' : (perspectiveResult.R1 <= dissonanzThreshold ? 'dissonanz' : 'neutral'),
                    statusEmoji: perspectiveResult.R1 >= resonanzThreshold ? '⬆️' : (perspectiveResult.R1 <= dissonanzThreshold ? '⬇️' : '➡️'),
                    weight: 0.25,
                    orientationResonance: perspectiveResult.orientationResonance || null
                },
                philosophie: {
                    name: 'Philosophie',
                    emoji: '🧠',
                    match: Math.round(perspectiveResult.R2 * 100),
                    rValue: perspectiveResult.R2,
                    status: perspectiveResult.R2 >= resonanzThreshold ? 'resonanz' : (perspectiveResult.R2 <= dissonanzThreshold ? 'dissonanz' : 'neutral'),
                    statusEmoji: perspectiveResult.R2 >= resonanzThreshold ? '⬆️' : (perspectiveResult.R2 <= dissonanzThreshold ? '⬇️' : '➡️'),
                    weight: 0.25
                },
                dynamik: {
                    name: 'Dynamik',
                    emoji: '⚡',
                    match: Math.round(perspectiveResult.R3 * 100),
                    rValue: perspectiveResult.R3,
                    status: perspectiveResult.R3 >= resonanzThreshold ? 'resonanz' : (perspectiveResult.R3 <= dissonanzThreshold ? 'dissonanz' : 'neutral'),
                    statusEmoji: perspectiveResult.R3 >= resonanzThreshold ? '⬆️' : (perspectiveResult.R3 <= dissonanzThreshold ? '⬇️' : '➡️'),
                    weight: 0.25
                },
                identitaet: {
                    name: 'Identität',
                    emoji: '💚',
                    match: Math.round(perspectiveResult.R4 * 100),
                    rValue: perspectiveResult.R4,
                    status: perspectiveResult.R4 >= resonanzThreshold ? 'resonanz' : (perspectiveResult.R4 <= dissonanzThreshold ? 'dissonanz' : 'neutral'),
                    statusEmoji: perspectiveResult.R4 >= resonanzThreshold ? '⬆️' : (perspectiveResult.R4 <= dissonanzThreshold ? '⬇️' : '➡️'),
                    weight: 0.25,
                    identityResonance: perspectiveResult.identityResonance || null
                }
            };

            // Gesamt-Koeffizient = Durchschnitt der R-Werte
            var coefficient = (perspectiveResult.R1 + perspectiveResult.R2 + perspectiveResult.R3 + perspectiveResult.R4) / 4;
            coefficient = Math.round(coefficient * 1000) / 1000;

            return {
                coefficient: coefficient,
                orientationResonance: perspectiveResult.orientationResonance || null,
                identityResonance: perspectiveResult.identityResonance || null,
                dimensions: dimensions,
                interpretation: this._interpretDimensionalResonance(coefficient, dimensions, cfg.THRESHOLDS),
                // NEU: Perspektiven-Matrix für Modal-Anzeige
                perspectiveMatrix: perspectiveResult.matrix,
                perspectiveAverages: perspectiveResult.averages,
                perspectiveDetails: perspectiveResult.details,
                perspektivenLabels: perspectiveResult.perspektivenLabels
            };
        }

        // ═══════════════════════════════════════════════════════════════════
        // FEHLER: Perspektivenbasierte Berechnung MUSS verfügbar sein
        // ═══════════════════════════════════════════════════════════════════
        throw new Error(
            '[TIAGE Calculator] KRITISCHER FEHLER: NeedsIntegration.calculateResonanceFromPerspectives nicht verfügbar!\n' +
            'Prüfe ob:\n' +
            '1. needsIntegration.js geladen ist\n' +
            '2. TiageSynthesis.NeedsIntegration.calculateResonanceFromPerspectives() verfügbar ist\n' +
            '3. Keine gespeicherten R-Werte in ResonanzCard/TiageState gefunden\n' +
            'perspectiveResult war null - Berechnung fehlgeschlagen'
        );
    },

    /**
     * Holt die Bedürfnis-Liste für eine Dimension
     */
    _getDimensionNeeds: function(source, needsIntegration) {
        if (source === 'ALL') {
            return null; // null = alle Bedürfnisse
        }
        if (needsIntegration && needsIntegration[source]) {
            return needsIntegration[source];
        }
        return null;
    },

    /**
     * Berechnet partiellen Match für eine Subset von Bedürfnissen
     *
     * @param {object} profil1 - Alle Bedürfnisse Person 1
     * @param {object} profil2 - Alle Bedürfnisse Person 2
     * @param {array|null} needsList - Liste der relevanten Bedürfnisse (null = alle)
     * @returns {number} Match 0.0-1.0
     */
    _calculatePartialMatch: function(profil1, profil2, needsList) {
        if (!profil1 || !profil2) return 0.5;

        var sumMatch = 0;
        var count = 0;

        // Wenn needsList null, alle gemeinsamen Keys verwenden
        var keysToCheck = needsList || Object.keys(profil1);

        for (var i = 0; i < keysToCheck.length; i++) {
            var key = keysToCheck[i];
            var val1 = profil1[key];
            var val2 = profil2[key];

            // Nur wenn beide einen Wert haben
            if (val1 !== undefined && val2 !== undefined) {
                var diff = Math.abs(val1 - val2);
                var match = (100 - diff) / 100;
                sumMatch += match;
                count++;
            }
        }

        return count > 0 ? sumMatch / count : 0.5;
    },

    /**
     * Erstellt den ORIENTATION_OPENNESS Key aus Primary + Secondary Orientierung
     *
     * @param {object} orientierung - { primary: 'heterosexuell', secondary: 'bisexuell' }
     * @returns {string} Key für ORIENTATION_OPENNESS Tabelle
     */
    _getOrientationOpennessKey: function(orientierung) {
        if (!orientierung) return 'hetero';

        var primary = orientierung.primary || 'heterosexuell';
        var secondary = orientierung.secondary || null;

        // Normalisiere zu Kurzform
        var normalizeOri = function(ori) {
            if (!ori) return null;
            ori = ori.toLowerCase();
            if (ori === 'heterosexuell' || ori === 'hetero') return 'hetero';
            if (ori === 'homosexuell' || ori === 'homo') return 'homo';
            if (ori === 'bisexuell' || ori === 'bi-/pansexuell' || ori === 'bi' || ori === 'pansexuell') return 'bi';
            return 'hetero'; // Fallback
        };

        var prim = normalizeOri(primary);
        var sec = normalizeOri(secondary);

        // Key erstellen
        if (!sec || sec === prim) {
            // Nur Primary oder Secondary gleich Primary
            return prim;
        } else {
            // Primary + Secondary kombinieren
            return prim + '-' + sec;
        }
    },

    /**
     * Berechnet gewichtete Orientierungs-Openness basierend auf P/S (v3.6)
     *
     * Formel:
     * - Wenn nur Primary: 100% des Primary-Wertes
     * - Wenn Primary + Secondary: Primary × 0.7 + Secondary × 0.3
     *
     * Beispiele:
     * - hetero (P): 0 × 1.0 = 0
     * - bi (P): 75 × 1.0 = 75
     * - hetero (P) + bi (S): 0 × 0.7 + 75 × 0.3 = 22.5
     * - bi (P) + hetero (S): 75 × 0.7 + 0 × 0.3 = 52.5
     *
     * @param {object} orientierung - { primary: 'heterosexuell', secondary: 'bisexuell' }
     * @param {object} constants - Konstanten-Objekt
     * @returns {object} { openness, details }
     */
    _calculateWeightedOrientationOpenness: function(orientierung, constants) {
        if (!orientierung) {
            return { openness: 0, details: { primary: null, secondary: null } };
        }

        var primary = orientierung.primary || 'heterosexuell';
        var secondary = orientierung.secondary || null;

        // Einzelne Openness-Werte (hetero=0, homo=0, bi=75, pan=100)
        var singleOpenness = constants.ORIENTATION_OPENNESS_SINGLE || {
            'heterosexuell': 0,
            'homosexuell': 0,
            'bisexuell': 75,
            'pansexuell': 100
        };

        // P/S-Gewichtungen aus ORIENTATION_RESONANCE
        var resonance = constants.ORIENTATION_RESONANCE || {};
        var primaryWeight = resonance.PRIMARY_WEIGHT || 0.7;
        var secondaryWeight = resonance.SECONDARY_WEIGHT || 0.3;

        // Openness-Werte für Primary und Secondary
        var primaryOpenness = singleOpenness[primary] !== undefined ? singleOpenness[primary] : 0;
        var secondaryOpenness = secondary ? (singleOpenness[secondary] !== undefined ? singleOpenness[secondary] : 0) : 0;

        var openness;
        if (secondary && secondary !== primary) {
            // P/S-gewichtete Berechnung
            openness = (primaryOpenness * primaryWeight) + (secondaryOpenness * secondaryWeight);
        } else {
            // Nur Primary → 100%
            openness = primaryOpenness;
        }

        return {
            openness: Math.round(openness * 100) / 100,
            details: {
                primary: primary,
                secondary: secondary,
                primaryOpenness: primaryOpenness,
                secondaryOpenness: secondaryOpenness,
                primaryWeight: primaryWeight,
                secondaryWeight: secondaryWeight,
                hasSecondary: !!(secondary && secondary !== primary)
            }
        };
    },

    /**
     * Interpretiert dimensionale Resonanz
     * v3.4: Richtungsbasiert um 1.0 zentriert
     *       thresholds.resonanz = 1.05, thresholds.dissonanz = 0.95
     */
    _interpretDimensionalResonance: function(coefficient, dimensions, thresholds) {
        // Zähle Resonanzen und Dissonanzen
        var resonanzCount = 0;
        var dissonanzCount = 0;

        for (var key in dimensions) {
            if (dimensions[key].status === 'resonanz') resonanzCount++;
            if (dimensions[key].status === 'dissonanz') dissonanzCount++;
        }

        // v3.4: Schwellenwerte um 1.0 zentriert (1.05 = resonanz, 0.95 = dissonanz)
        // Bei 4 Dimensionen ist coefficient = Durchschnitt der R-Werte (um 1.0)
        // coefficient >= 1.08 = sehr gut (deutliche Verstärkung)
        // coefficient >= 1.02 = gut (leichte Verstärkung)
        if (coefficient >= 1.08 || resonanzCount >= 3) {
            return { level: 'harmonie', text: 'Mehrdimensionale Resonanz auf hohem Niveau' };
        }
        if (coefficient >= 1.02 || resonanzCount >= 2) {
            return { level: 'resonanz', text: 'Überwiegend gute Schwingung' };
        }
        if (dissonanzCount >= 2) {
            return { level: 'spannung', text: 'Mehrere Dimensionen mit Dissonanz' };
        }
        if (dissonanzCount >= 3) {
            return { level: 'dissonanz', text: 'Ausgeprägte mehrdimensionale Dissonanz' };
        }
        return { level: 'neutral', text: 'Ausgewogene dimensionale Verteilung' };
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
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // LIFESTYLE-FILTER INTEGRATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Prüft Lifestyle-Kompatibilität über LifestyleFilter
     *
     * @param {string} archetyp1 - Archetyp Person 1
     * @param {string} archetyp2 - Archetyp Person 2
     * @param {object} archetypeDefinitions - Archetyp-Definitionen mit baseAttributes
     * @returns {object|null} LifestyleFilter-Ergebnis oder null
     */
    _checkLifestyleFilter: function(archetyp1, archetyp2, archetypeDefinitions) {
        // Prüfen ob LifestyleFilter verfügbar
        if (!TiageSynthesis.LifestyleFilter) {
            return null;
        }

        // Prüfen ob archetypeDefinitions verfügbar
        if (!archetypeDefinitions) {
            // Versuche globale Variable
            if (typeof archetypeDefinitions !== 'undefined') {
                archetypeDefinitions = window.archetypeDefinitions;
            }
            if (!archetypeDefinitions) {
                return null;
            }
        }

        // NEU: User-Werte aus ProfileReview laden und mit Archetyp-Defaults mergen
        var attrs1 = TiageSynthesis.LifestyleFilter.getBaseAttributes(archetyp1, archetypeDefinitions) || {};
        var attrs2 = TiageSynthesis.LifestyleFilter.getBaseAttributes(archetyp2, archetypeDefinitions) || {};

        // ProfileReview-Werte laden (falls vorhanden)
        var profileReview = null;
        if (typeof TiageState !== 'undefined' && TiageState.get) {
            profileReview = TiageState.get('profileReview');
        }

        // User-Werte mit Archetyp-Defaults mergen (für ICH/Person1)
        if (profileReview) {
            attrs1 = this._mergeProfileReviewWithAttrs(attrs1, profileReview);
        }

        // Mit gemergten Attributen prüfen
        return TiageSynthesis.LifestyleFilter.check(attrs1, attrs2);
    },

    /**
     * Merged ProfileReview-Werte mit Archetyp baseAttributes
     * Konvertiert UI-Werte (0-100 Slider, boolean Buttons) zu Filter-Format
     *
     * @param {object} baseAttrs - baseAttributes vom Archetyp
     * @param {object} review - profileReview vom User
     * @returns {object} Gemergte Attribute
     */
    _mergeProfileReviewWithAttrs: function(baseAttrs, review) {
        var merged = Object.assign({}, baseAttrs);

        // Toggle-Buttons → kategorisch
        if (review.kinder !== undefined) {
            merged.kinderWunsch = review.kinder ? 'ja' : 'nein';
        }
        if (review.ehe !== undefined) {
            merged.eheWunsch = review.ehe ? 'ja' : 'nein';
        }

        // Slider (0-100) → numerisch (0-1)
        if (review.familie !== undefined) {
            merged.familieWichtigkeit = parseInt(review.familie) / 100;
        }
        if (review.finanzen !== undefined) {
            // Finanzen: 0-33 = getrennt, 34-66 = hybrid, 67-100 = gemeinsam
            var finVal = parseInt(review.finanzen);
            merged.finanzen = finVal < 34 ? 'getrennt' : (finVal < 67 ? 'hybrid' : 'gemeinsam');
        }
        if (review.karriere !== undefined) {
            merged.karrierePrioritaet = parseInt(review.karriere) / 100;
        }
        if (review.emotional !== undefined) {
            merged.emotionaleOffenheit = parseInt(review.emotional) / 100;
        }
        if (review.konflikt !== undefined) {
            merged.konfliktverhalten = parseInt(review.konflikt) / 100;
        }
        if (review.introextro !== undefined) {
            merged.introExtro = parseInt(review.introextro) / 100;
        }
        if (review.alleinzeit !== undefined) {
            merged.alleinZeitBeduernis = parseInt(review.alleinzeit) / 100;
        }
        if (review.freunde !== undefined) {
            merged.freundeskreis = parseInt(review.freunde) / 100;
        }
        if (review.naehe !== undefined) {
            merged.koerperlicheNaehe = parseInt(review.naehe) / 100;
        }
        if (review.romantik !== undefined) {
            merged.romantikBeduernis = parseInt(review.romantik) / 100;
        }
        if (review.sex !== undefined) {
            merged.sexFrequenz = parseInt(review.sex) / 100;
        }
        if (review.religion !== undefined) {
            merged.religiositaet = parseInt(review.religion) / 100;
        }
        if (review.tradition !== undefined) {
            merged.traditionVsModern = parseInt(review.tradition) / 100;
        }
        if (review.umwelt !== undefined) {
            merged.umweltbewusstsein = parseInt(review.umwelt) / 100;
        }

        return merged;
    },

    /**
     * Baut ein K.O.-Ergebnis für Lifestyle-Inkompatibilität
     *
     * @param {object} person1 - Profil Person 1
     * @param {object} person2 - Profil Person 2
     * @param {object} lifestyleResult - Ergebnis vom LifestyleFilter
     * @param {object} matrixData - archetype-matrix.json Daten
     * @returns {object} Vollständiges K.O.-Ergebnis
     */
    _buildKOResult: function(person1, person2, lifestyleResult, matrixData) {
        var factors = TiageSynthesis.Factors;

        // Archetyp-Score trotzdem berechnen für Info
        var archetypResult = factors.Archetyp.calculate(
            person1.archetyp,
            person2.archetyp,
            matrixData
        );

        return {
            score: 0,
            baseScore: 0,

            // K.O.-Flag
            isLifestyleKO: true,

            // Resonanz bei K.O. = 0
            resonanz: {
                coefficient: 0,
                balance: 0,
                differenz: 0,
                profilMatch: 0,
                gfk: null,
                interpretation: { level: 'ko', text: 'Lifestyle-K.O.' }
            },

            // Logos/Pathos nicht relevant bei K.O.
            logos: { score: 0, weight: 0, contribution: 0 },
            pathos: { score: 0, weight: 0, contribution: 0 },

            // Breakdown nur Archetyp (für Info)
            breakdown: {
                archetyp: {
                    score: archetypResult.score,
                    weight: 0,
                    category: 'logos',
                    details: archetypResult.details
                }
            },

            // Meta mit K.O.-Details
            meta: {
                isLifestyleKO: true,
                lifestyleKOReasons: lifestyleResult.koReasons,
                lifestyleKOMessages: lifestyleResult.koReasons.map(function(r) {
                    return r.message;
                }),

                // UI-formatierte Version
                lifestyleUI: TiageSynthesis.LifestyleFilter.formatForUI(lifestyleResult),

                // Keine anderen Flags relevant
                isHardKO: false,
                isSoftKO: false,
                hasExploration: false
            },

            // Keine Bedürfnisse berechnet
            beduerfnisse: null
        };
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // R-FAKTOR GETTER (für UI-Display)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Gibt die zuletzt berechneten kombinierten R-Faktoren zurück
     * Aufruf: TiageSynthesis.Calculator.getLastRFactors()
     *
     * @returns {object} { R1, R2, R3, R4 } oder null wenn keine Berechnung erfolgt ist
     */
    getLastRFactors: function() {
        return _lastCombinedRFactors;
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // DEBUG: v3.1 STATUS CHECK
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Prüft ob alle Voraussetzungen für v3.1 erfüllt sind
     * Aufruf: TiageSynthesis.Calculator.checkV31Status()
     *
     * @returns {object} Status mit Details zu jeder Voraussetzung
     */
    checkV31Status: function() {
        var constants = TiageSynthesis.Constants;
        var status = {
            v31Active: false,
            checks: {},
            missing: [],
            recommendation: ''
        };

        // Check 1: RESONANCE_DIMENSIONAL aktiviert?
        status.checks.resonanceDimensionalEnabled = constants.RESONANCE_DIMENSIONAL &&
                                                     constants.RESONANCE_DIMENSIONAL.ENABLED === true;
        if (!status.checks.resonanceDimensionalEnabled) {
            status.missing.push('RESONANCE_DIMENSIONAL.ENABLED ist false oder nicht definiert');
        }

        // Check 2: NEEDS_INTEGRATION aktiviert?
        status.checks.needsIntegrationEnabled = constants.NEEDS_INTEGRATION &&
                                                 constants.NEEDS_INTEGRATION.ENABLED === true;
        if (!status.checks.needsIntegrationEnabled) {
            status.missing.push('NEEDS_INTEGRATION.ENABLED ist false oder nicht definiert');
        }

        // Check 3: TiageBeduerfnisse geladen? (mit Rückwärtskompatibilität für GfkBeduerfnisse)
        status.checks.tiageBeduerfnisseLoaded = (typeof TiageBeduerfnisse !== 'undefined' &&
                                                  TiageBeduerfnisse.archetypProfile !== undefined) ||
                                                 (typeof GfkBeduerfnisse !== 'undefined' &&
                                                  GfkBeduerfnisse.archetypProfile !== undefined);
        if (!status.checks.tiageBeduerfnisseLoaded) {
            status.missing.push('TiageBeduerfnisse nicht geladen (tiage-beduerfnisse.js fehlt)');
        }

        // Check 4: TiageProfileStore verfügbar?
        status.checks.profileStoreAvailable = typeof TiageProfileStore !== 'undefined';
        if (!status.checks.profileStoreAvailable) {
            status.missing.push('TiageProfileStore nicht verfügbar (profile-store.js fehlt)');
        }

        // Check 5: BeduerfnisModifikatoren als Fallback?
        status.checks.beduerfnisModifikatorenAvailable = typeof BeduerfnisModifikatoren !== 'undefined';

        // Check 6: NeedsIntegration Modul?
        status.checks.needsIntegrationModuleLoaded = typeof TiageSynthesis.NeedsIntegration !== 'undefined';
        if (!status.checks.needsIntegrationModuleLoaded) {
            status.missing.push('TiageSynthesis.NeedsIntegration nicht geladen (needsIntegration.js fehlt)');
        }

        // Gesamtstatus bestimmen
        status.v31Active = status.checks.resonanceDimensionalEnabled &&
                           status.checks.gfkBeduerfnisseLoaded &&
                           (status.checks.profileStoreAvailable || status.checks.beduerfnisModifikatorenAvailable);

        // Empfehlung generieren
        if (status.v31Active) {
            status.recommendation = 'v3.1 ist aktiv. Dimensionale Resonanz wird verwendet.';
        } else if (status.missing.length > 0) {
            status.recommendation = 'v3.1 NICHT aktiv! Fehlende Komponenten:\n- ' + status.missing.join('\n- ');
        }

        return status;
    },

    /**
     * Gibt v3.1-Status in der Konsole aus (für schnelles Debugging)
     */
    logV31Status: function() {
        var status = this.checkV31Status();
        console.group('🔍 TIAGE v3.1 Status');
        console.log('v3.1 aktiv:', status.v31Active ? '✅ JA' : '❌ NEIN');
        console.table(status.checks);
        if (status.missing.length > 0) {
            console.warn('Fehlende Komponenten:', status.missing);
        }
        console.log('Empfehlung:', status.recommendation);
        console.groupEnd();
        return status;
    },

    /**
     * Klont ein Profil-Objekt (shallow clone mit deep clone für needs)
     * @private
     */
    _cloneProfile: function(profile) {
        if (!profile) return profile;

        var clone = {};
        for (var key in profile) {
            if (profile.hasOwnProperty(key)) {
                if (key === 'needs' && typeof profile.needs === 'object') {
                    // Deep clone für needs
                    clone.needs = {};
                    for (var needKey in profile.needs) {
                        if (profile.needs.hasOwnProperty(needKey)) {
                            clone.needs[needKey] = profile.needs[needKey];
                        }
                    }
                } else {
                    clone[key] = profile[key];
                }
            }
        }
        return clone;
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // SEKUNDÄR-BONI BERECHNUNG (NEU!)
    // ═══════════════════════════════════════════════════════════════════════════
    //
    // Wenn beide Personen sekundäre Attribute haben, die auch kompatibel sind,
    // gibt es einen Bonus. Der Bonus skaliert mit der jeweiligen Gewichtung.
    //
    // Formel: multiplier = 1 + (BONUS_BASE × (weight / 0.25))
    //
    // Beispiel bei Standard-Gewichtung (25%):
    //   multiplier = 1 + (0.05 × 1.0) = 1.05 (+5%)
    //
    // Beispiel bei doppelter Gewichtung (50%):
    //   multiplier = 1 + (0.05 × 2.0) = 1.10 (+10%)
    //

    /**
     * Berechnet Sekundär-Boni für O, D, G Faktoren
     *
     * @param {object} orientierungResult - Ergebnis von Factors.Orientierung.calculate()
     * @param {object} dominanzResult - Ergebnis von Factors.Dominanz.calculate()
     * @param {object} geschlechtResult - Ergebnis von Factors.Geschlecht.calculate()
     * @param {object} weights - Aktuelle Gewichtungen { orientierung, dominanz, geschlecht, archetyp }
     * @param {object} constants - TiageSynthesis.Constants
     * @returns {object} { orientierung: {...}, dominanz: {...}, geschlecht: {...} }
     */
    _calculateSecondaryBonuses: function(orientierungResult, dominanzResult, geschlechtResult, weights, constants) {
        var result = {
            orientierung: { hasBonus: false, multiplier: 1.0, bonusPercent: 0, reason: null },
            dominanz: { hasBonus: false, multiplier: 1.0, bonusPercent: 0, reason: null },
            geschlecht: { hasBonus: false, multiplier: 1.0, bonusPercent: 0, reason: null }
        };

        // ═══════════════════════════════════════════════════════════════════
        // ORIENTIERUNG (O) - Sekundär-Bonus
        // ═══════════════════════════════════════════════════════════════════
        if (orientierungResult && orientierungResult.details && orientierungResult.details.hasSecondaryBonus) {
            var oBonusBase = constants.ORIENTATION.SECONDARY_BONUS_BASE || 0.05;
            var oWeightFactor = weights.orientierung / 0.25;  // Normalisiert auf Standard
            var oBonus = oBonusBase * oWeightFactor;

            result.orientierung = {
                hasBonus: true,
                multiplier: 1 + oBonus,
                bonusPercent: Math.round(oBonus * 100),
                reason: 'Sekundäre Orientierungen sind auch kompatibel',
                weightFactor: oWeightFactor
            };
        }

        // ═══════════════════════════════════════════════════════════════════
        // DOMINANZ (D) - Sekundär-Bonus
        // ═══════════════════════════════════════════════════════════════════
        if (dominanzResult && dominanzResult.details && dominanzResult.details.hasSecondaryBonus) {
            var dConfig = constants.DOMINANCE_SECONDARY || { BONUS_BASE: 0.05 };
            var dBonusBase = dConfig.BONUS_BASE || 0.05;
            var dWeightFactor = weights.dominanz / 0.25;

            // Prüfe ob sekundäre Dominanzen komplementär sind (höherer Bonus)
            var isComplementary = dominanzResult.details.secondaryComplementary || false;
            var dBonus = dBonusBase * dWeightFactor;
            if (isComplementary) {
                dBonus *= 1.5;  // 50% mehr Bonus bei komplementären Sekundär-Dominanzen
            }

            result.dominanz = {
                hasBonus: true,
                multiplier: 1 + dBonus,
                bonusPercent: Math.round(dBonus * 100),
                reason: isComplementary
                    ? 'Sekundäre Dominanzen sind komplementär'
                    : 'Sekundäre Dominanzen sind kompatibel',
                isComplementary: isComplementary,
                weightFactor: dWeightFactor
            };
        }

        // ═══════════════════════════════════════════════════════════════════
        // GESCHLECHT (G) - Sekundär-Bonus mit Gewichtungs-Skalierung
        // ═══════════════════════════════════════════════════════════════════
        // Der bestehende secondaryBonus (max +5 Punkte) wird jetzt mit der
        // G-Gewichtung skaliert
        if (geschlechtResult && geschlechtResult.details) {
            var gConfig = constants.GENDER_SECONDARY || { SCALING_ENABLED: true, SCALING_BASE: 0.25 };

            if (gConfig.SCALING_ENABLED && geschlechtResult.details.secondaryBonus > 0) {
                var gWeightFactor = weights.geschlecht / (gConfig.SCALING_BASE || 0.25);
                // Der Bonus ist bereits in Punkten (max 5), konvertiere zu Prozent
                var gBonusPoints = geschlechtResult.details.secondaryBonus;
                var gBonusPercent = (gBonusPoints / 100) * gWeightFactor;

                result.geschlecht = {
                    hasBonus: true,
                    multiplier: 1 + gBonusPercent,
                    bonusPercent: Math.round(gBonusPercent * 100),
                    reason: 'Identitäts-Resonanz zwischen sekundären Geschlechtern',
                    originalBonus: gBonusPoints,
                    weightFactor: gWeightFactor
                };
            }
        }

        // Debug-Logging
        if (result.orientierung.hasBonus || result.dominanz.hasBonus || result.geschlecht.hasBonus) {
            console.log('[SynthesisCalculator] Sekundär-Boni berechnet:', {
                O: result.orientierung.hasBonus ? '+' + result.orientierung.bonusPercent + '%' : 'kein',
                D: result.dominanz.hasBonus ? '+' + result.dominanz.bonusPercent + '%' : 'kein',
                G: result.geschlecht.hasBonus ? '+' + result.geschlecht.bonusPercent + '%' : 'kein'
            });
        }

        return result;
    }
};
