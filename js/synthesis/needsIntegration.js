/**
 * TIAGE SYNTHESE - Bedürfnis-Integration
 *
 * Integriert Bedürfnisse in die Faktor-Berechnung (A, O, D, G).
 *
 * Philosophische Grundlage:
 * - Pirsig: Statische vs. Dynamische Qualität in Bedürfnissen
 * - Osho: Nicht-Anhaften und authentischer Ausdruck
 * - GFK (Rosenberg): Universelle menschliche Bedürfnisse
 *
 * Formel pro Faktor:
 *   Faktor = (Matrix × matrixWeight) + (BedürfnisMatch × needsWeight)
 */

var TiageSynthesis = TiageSynthesis || {};

TiageSynthesis.NeedsIntegration = {

    /**
     * Berechnet den Bedürfnis-Match für eine bestimmte Faktor-Gruppe
     *
     * @param {object} person1 - Profil mit needs-Objekt
     * @param {object} person2 - Profil mit needs-Objekt
     * @param {string} faktor - "archetyp", "orientierung", "dominanz", "geschlecht"
     * @returns {object} { score: 0-100, details: {...} }
     */
    calculateFactorNeedsMatch: function(person1, person2, faktor) {
        var constants = TiageSynthesis.Constants;

        // Prüfe ob Integration aktiviert
        if (!constants.NEEDS_INTEGRATION || !constants.NEEDS_INTEGRATION.ENABLED) {
            return { score: null, enabled: false };
        }

        // Prüfe ob beide Profile needs haben
        if (!person1.needs || !person2.needs) {
            return { score: null, reason: 'needs_nicht_verfuegbar' };
        }

        // Hole relevante Bedürfnisse für den Faktor
        var needsList = this._getNeedsListForFactor(faktor);
        if (!needsList || needsList.length === 0) {
            return { score: null, reason: 'keine_beduerfnisse_definiert' };
        }

        // Berechne Match für diese Bedürfnisgruppe
        var result = this._calculateGroupMatch(person1.needs, person2.needs, needsList);

        return {
            score: result.score,
            faktor: faktor,
            needsCount: needsList.length,
            matchedCount: result.matchedCount,
            gemeinsam: result.gemeinsam,
            unterschiedlich: result.unterschiedlich,
            komplementaer: result.komplementaer,
            details: result.details
        };
    },

    /**
     * Kombiniert Matrix-Score mit Bedürfnis-Score für einen Faktor
     *
     * @param {number} matrixScore - Score aus der klassischen Matrix-Berechnung (0-100)
     * @param {number} needsScore - Score aus der Bedürfnis-Berechnung (0-100)
     * @param {string} faktor - "archetyp", "orientierung", "dominanz", "geschlecht"
     * @returns {object} { combinedScore, matrixContribution, needsContribution }
     */
    combineScores: function(matrixScore, needsScore, faktor) {
        var constants = TiageSynthesis.Constants;

        // Fallback wenn Integration deaktiviert oder needsScore null
        if (!constants.NEEDS_INTEGRATION || !constants.NEEDS_INTEGRATION.ENABLED) {
            return {
                combinedScore: matrixScore,
                matrixContribution: matrixScore,
                needsContribution: 0,
                needsIntegrated: false
            };
        }

        if (needsScore === null || needsScore === undefined) {
            return {
                combinedScore: matrixScore,
                matrixContribution: matrixScore,
                needsContribution: 0,
                needsIntegrated: false,
                reason: 'needs_score_nicht_verfuegbar'
            };
        }

        // Hole Gewichtung für diesen Faktor
        var weights = constants.NEEDS_INTEGRATION.FACTOR_WEIGHTS[faktor];
        if (!weights) {
            // Fallback: 50/50
            weights = { matrix: 0.5, needs: 0.5 };
        }

        var matrixContribution = matrixScore * weights.matrix;
        var needsContribution = needsScore * weights.needs;
        var combinedScore = Math.round(matrixContribution + needsContribution);

        // Clamp auf 0-100
        combinedScore = Math.max(0, Math.min(100, combinedScore));

        return {
            combinedScore: combinedScore,
            matrixScore: matrixScore,
            needsScore: needsScore,
            matrixWeight: weights.matrix,
            needsWeight: weights.needs,
            matrixContribution: Math.round(matrixContribution),
            needsContribution: Math.round(needsContribution),
            needsIntegrated: true
        };
    },

    /**
     * Berechnet den Match für eine Gruppe von Bedürfnissen
     *
     * @private
     */
    _calculateGroupMatch: function(needs1, needs2, needsList) {
        var sumScore = 0;
        var sumWeight = 0;
        var matchedCount = 0;
        var details = [];
        var gemeinsam = [];
        var unterschiedlich = [];
        var komplementaer = [];

        for (var i = 0; i < needsList.length; i++) {
            var needId = needsList[i];
            var val1 = needs1[needId];
            var val2 = needs2[needId];

            // Nur berechnen wenn beide Werte vorhanden
            if (val1 !== undefined && val2 !== undefined) {
                matchedCount++;

                var diff = Math.abs(val1 - val2);
                var similarity = 100 - diff;
                var avgValue = (val1 + val2) / 2;

                // Gewichtung basierend auf Wichtigkeit (Durchschnittswert)
                var weight = avgValue / 100;
                sumScore += similarity * weight;
                sumWeight += weight;

                var detail = {
                    id: needId,
                    person1: val1,
                    person2: val2,
                    diff: diff,
                    similarity: similarity,
                    weight: weight
                };
                details.push(detail);

                // Kategorisierung
                if (val1 >= 70 && val2 >= 70 && diff < 15) {
                    gemeinsam.push(detail);
                } else if (diff > 30) {
                    unterschiedlich.push(detail);
                } else if ((val1 >= 70 && val2 < 50) || (val2 >= 70 && val1 < 50)) {
                    komplementaer.push(detail);
                }
            }
        }

        var score = sumWeight > 0 ? Math.round(sumScore / sumWeight) : 50;

        // Sortiere nach Differenz (größte zuerst bei unterschiedlich)
        unterschiedlich.sort(function(a, b) { return b.diff - a.diff; });
        gemeinsam.sort(function(a, b) { return b.similarity - a.similarity; });

        return {
            score: score,
            matchedCount: matchedCount,
            gemeinsam: gemeinsam.slice(0, 5),      // Top 5
            unterschiedlich: unterschiedlich.slice(0, 5),
            komplementaer: komplementaer.slice(0, 5),
            details: details
        };
    },

    /**
     * Gibt die Bedürfnis-Liste für einen Faktor zurück
     *
     * @private
     */
    _getNeedsListForFactor: function(faktor) {
        var constants = TiageSynthesis.Constants;
        if (!constants.NEEDS_INTEGRATION) return [];

        switch (faktor) {
            case 'archetyp':
                return constants.NEEDS_INTEGRATION.ARCHETYP_NEEDS || [];
            case 'orientierung':
                return constants.NEEDS_INTEGRATION.ORIENTIERUNG_NEEDS || [];
            case 'dominanz':
                return constants.NEEDS_INTEGRATION.DOMINANZ_NEEDS || [];
            case 'geschlecht':
                return constants.NEEDS_INTEGRATION.GESCHLECHT_NEEDS || [];
            default:
                return [];
        }
    },

    /**
     * Berechnet alle Faktor-Bedürfnis-Matches auf einmal
     *
     * @param {object} person1 - Profil mit needs
     * @param {object} person2 - Profil mit needs
     * @returns {object} { archetyp, orientierung, dominanz, geschlecht }
     */
    calculateAllFactorMatches: function(person1, person2) {
        return {
            archetyp: this.calculateFactorNeedsMatch(person1, person2, 'archetyp'),
            orientierung: this.calculateFactorNeedsMatch(person1, person2, 'orientierung'),
            dominanz: this.calculateFactorNeedsMatch(person1, person2, 'dominanz'),
            geschlecht: this.calculateFactorNeedsMatch(person1, person2, 'geschlecht')
        };
    },

    /**
     * Debug: Zeigt welche Bedürfnisse für welchen Faktor verwendet werden
     */
    getFactorNeedsSummary: function() {
        var constants = TiageSynthesis.Constants;
        if (!constants.NEEDS_INTEGRATION) {
            return { enabled: false };
        }

        return {
            enabled: constants.NEEDS_INTEGRATION.ENABLED,
            weights: constants.NEEDS_INTEGRATION.FACTOR_WEIGHTS,
            counts: {
                archetyp: (constants.NEEDS_INTEGRATION.ARCHETYP_NEEDS || []).length,
                orientierung: (constants.NEEDS_INTEGRATION.ORIENTIERUNG_NEEDS || []).length,
                dominanz: (constants.NEEDS_INTEGRATION.DOMINANZ_NEEDS || []).length,
                geschlecht: (constants.NEEDS_INTEGRATION.GESCHLECHT_NEEDS || []).length
            }
        };
    },

    // ═══════════════════════════════════════════════════════════════════════
    // v3.1: DIMENSIONALE RESONANZ BERECHNUNG
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Hilfsfunktion: Sucht einen Bedürfniswert in verschiedenen Formaten
     *
     * Unterstützt:
     * - Array von {id, stringKey, value}
     * - Objekt mit key → value
     * - Objekt mit key → {value}
     *
     * @param {Array|Object} needs - Bedürfnisse in beliebigem Format
     * @param {string} id - Bedürfnis-ID (z.B. '#B74')
     * @param {string} stringKey - Bedürfnis-Key (z.B. 'kontrolle_ausueben')
     * @returns {number|undefined} Gefundener Wert oder undefined
     * @private
     */
    _getNeedValue: function(needs, id, stringKey) {
        if (!needs) return undefined;

        if (Array.isArray(needs)) {
            // Format: Array von {id, stringKey, value}
            for (var i = 0; i < needs.length; i++) {
                var n = needs[i];
                if ((id && (n.id === id || n.stringKey === id)) ||
                    (stringKey && (n.id === stringKey || n.stringKey === stringKey))) {
                    return n.value;
                }
            }
            return undefined;
        }

        // Format: Objekt mit key → value oder key → {value}
        var value = undefined;

        // Versuche id
        if (id && needs[id] !== undefined) {
            value = needs[id];
        }

        // Fallback: versuche stringKey
        if (value === undefined && stringKey && needs[stringKey] !== undefined) {
            value = needs[stringKey];
        }

        // Falls Wert ein Objekt mit .value ist
        if (value !== undefined && typeof value === 'object' && value.value !== undefined) {
            return value.value;
        }

        return value;
    },

    /**
     * ═══════════════════════════════════════════════════════════════════════════
     * PAARUNGS-RESONANZ: Misst die Ähnlichkeit zwischen ICH und PARTNER
     * ═══════════════════════════════════════════════════════════════════════════
     *
     * Diese Funktion berechnet R-Werte basierend auf der direkten Ähnlichkeit
     * zwischen den Bedürfnissen von ICH und PARTNER.
     *
     * Bei identischen Werten: R = 1.5 (Maximum)
     * Bei komplett unterschiedlichen Werten: R = 0.5 (Minimum)
     *
     * @param {object} ichNeeds - Bedürfnisse von ICH { needKey: value }
     * @param {object} partnerNeeds - Bedürfnisse von PARTNER { needKey: value }
     * @returns {object} { R1, R2, R3, R4, leben, philosophie, dynamik, identitaet, enabled }
     */
    calculatePaarungsResonance: function(ichNeeds, partnerNeeds) {
        var self = this;
        var constants = TiageSynthesis.Constants;

        if (!ichNeeds || !partnerNeeds) {
            console.warn('[NeedsIntegration.calculatePaarungsResonance] Fehlende Needs-Daten');
            return {
                R1: 1.0, R2: 1.0, R3: 1.0, R4: 1.0,
                leben: 1.0, philosophie: 1.0, dynamik: 1.0, identitaet: 1.0,
                enabled: false
            };
        }

        // Hole relevante Bedürfnisse pro Dimension aus NEEDS_INTEGRATION
        var needsGroups = {
            leben: constants.NEEDS_INTEGRATION?.ORIENTIERUNG_NEEDS || [],
            philosophie: constants.NEEDS_INTEGRATION?.ARCHETYP_NEEDS || [],
            dynamik: constants.NEEDS_INTEGRATION?.DOMINANZ_NEEDS || [],
            identitaet: constants.NEEDS_INTEGRATION?.GESCHLECHT_NEEDS || []
        };

        // Berechne Ähnlichkeit pro Dimension
        var result = {
            leben: this._calculatePaarungsSingleResonance(ichNeeds, partnerNeeds, needsGroups.leben),
            philosophie: this._calculatePaarungsSingleResonance(ichNeeds, partnerNeeds, needsGroups.philosophie),
            dynamik: this._calculatePaarungsSingleResonance(ichNeeds, partnerNeeds, needsGroups.dynamik),
            identitaet: this._calculatePaarungsSingleResonance(ichNeeds, partnerNeeds, needsGroups.identitaet),
            enabled: true
        };

        // Mapping zu R1-R4
        result.R1 = result.leben;
        result.R2 = result.philosophie;
        result.R3 = result.dynamik;
        result.R4 = result.identitaet;

        console.log('[NeedsIntegration.calculatePaarungsResonance] PAARUNG Ergebnis:', {
            R1_leben: result.R1,
            R2_philosophie: result.R2,
            R3_dynamik: result.R3,
            R4_identitaet: result.R4
        });

        return result;
    },

    /**
     * Berechnet R für eine einzelne Dimension basierend auf ICH vs PARTNER Ähnlichkeit
     *
     * NEU v3.2: R = similarity² (quadratisch, mit Komplementär-Mapping)
     * - Komplementäre Bedürfnisse werden KREUZ-verglichen (ICH.geben ↔ PARTNER.empfangen)
     * - Keine künstlichen Grenzen (0-1 statt 0.5-1.5)
     *
     * @private
     */
    _calculatePaarungsSingleResonance: function(ichNeeds, partnerNeeds, needsList) {
        var self = this;
        var constants = TiageSynthesis.Constants;
        var complementaryPairs = constants.NEEDS_INTEGRATION && constants.NEEDS_INTEGRATION.COMPLEMENTARY_PAIRS || {};

        if (!needsList || needsList.length === 0) {
            // Fallback: Vergleiche ALLE gemeinsamen Needs
            return this._calculateAllNeedsSimilarity(ichNeeds, partnerNeeds);
        }

        var totalDiff = 0;
        var count = 0;

        for (var i = 0; i < needsList.length; i++) {
            var needKey = needsList[i];
            var ichVal = this._getNeedValue(ichNeeds, null, needKey);

            // Komplementär-Mapping: Wenn needKey komplementär ist, vergleiche mit Partner-Gegenstück
            var partnerNeedKey = complementaryPairs[needKey] || needKey;
            var partnerVal = this._getNeedValue(partnerNeeds, null, partnerNeedKey);

            if (ichVal !== undefined && partnerVal !== undefined) {
                var diff = Math.abs(ichVal - partnerVal);
                totalDiff += diff;
                count++;
            }
        }

        if (count === 0) {
            return 1.0; // Neutral wenn keine vergleichbaren Bedürfnisse
        }

        var avgDiff = totalDiff / count;
        var similarity = 1 - (avgDiff / 100);

        // NEU v3.2: R = similarity² (quadratisch)
        // Bei avgDiff=0 (identisch): similarity=1.0 → R = 1.0
        // Bei avgDiff=30: similarity=0.7 → R = 0.49
        // Bei avgDiff=50: similarity=0.5 → R = 0.25
        // Bei avgDiff=100 (gegensätzlich): similarity=0.0 → R = 0.0
        var rValue = similarity * similarity;

        return Math.round(rValue * 1000) / 1000;
    },

    /**
     * Fallback: Berechnet Ähnlichkeit über ALLE gemeinsamen Needs
     * NEU v3.2: Mit Komplementär-Mapping und quadratischer Formel
     * @private
     */
    _calculateAllNeedsSimilarity: function(ichNeeds, partnerNeeds) {
        var constants = TiageSynthesis.Constants;
        var complementaryPairs = constants.NEEDS_INTEGRATION && constants.NEEDS_INTEGRATION.COMPLEMENTARY_PAIRS || {};
        var totalDiff = 0;
        var count = 0;

        for (var key in ichNeeds) {
            if (ichNeeds.hasOwnProperty(key)) {
                var ichVal = this._getNeedValue(ichNeeds, null, key);

                // Komplementär-Mapping anwenden
                var partnerKey = complementaryPairs[key] || key;
                var partnerVal = this._getNeedValue(partnerNeeds, null, partnerKey);

                if (ichVal !== undefined && partnerVal !== undefined) {
                    totalDiff += Math.abs(ichVal - partnerVal);
                    count++;
                }
            }
        }

        if (count === 0) return 1.0;

        var avgDiff = totalDiff / count;
        var similarity = 1 - (avgDiff / 100);

        // NEU v3.2: R = similarity² (quadratisch, keine Clamps)
        var rValue = similarity * similarity;

        return Math.round(rValue * 1000) / 1000;
    },

    /**
     * Berechnet die dimensionalen Resonanzen R_Leben, R_Dynamik, R_Identität, R_Philosophie
     * basierend auf der Kohärenz zwischen Archetyp und Bedürfnissen.
     *
     * HINWEIS: Diese Funktion berechnet INDIVIDUELLE R-Werte (Person vs Archetyp).
     * Für PAARUNGS-R-Werte (ICH vs PARTNER) verwende calculatePaarungsResonance().
     *
     * @param {object} person - Profil mit archetyp und needs
     * @returns {object} { leben: R, dynamik: R, identitaet: R, philosophie: R }
     */
    calculateDimensionalResonance: function(person) {
        var constants = TiageSynthesis.Constants;
        var kohaerenz = constants.ARCHETYP_KOHAERENZ;

        // Needs können in person.needs oder person.profileReview.flatNeeds sein
        var needs = person.needs || (person.profileReview && person.profileReview.flatNeeds);

        // Debug-Logging für Diagnose
        console.log('[NeedsIntegration.calculateDimensionalResonance] Input:', {
            hasKohaerenz: !!kohaerenz,
            archetyp: person.archetyp,
            needsType: needs ? (Array.isArray(needs) ? 'array' : 'object') : 'null',
            needsCount: needs ? Object.keys(needs).length : 0,
            sampleNeeds: needs ? Object.keys(needs).slice(0, 5) : []
        });

        if (!kohaerenz || !person.archetyp || !needs) {
            console.warn('[NeedsIntegration.calculateDimensionalResonance] ABBRUCH - Fehlende Daten:', {
                kohaerenz: !!kohaerenz,
                archetyp: person.archetyp,
                needs: !!needs
            });
            return {
                leben: 1.0,
                dynamik: 1.0,
                identitaet: 1.0,
                philosophie: 1.0,
                enabled: false
            };
        }

        var archetyp = person.archetyp.key || person.archetyp;

        var result = {
            leben: this._calculateSingleResonance(needs, kohaerenz.leben, archetyp),
            dynamik: this._calculateSingleResonance(needs, kohaerenz.dynamik, archetyp),
            identitaet: this._calculateSingleResonance(needs, kohaerenz.identitaet, archetyp),
            philosophie: this._calculateSingleResonance(needs, kohaerenz.philosophie, archetyp),
            enabled: true,
            archetyp: archetyp
        };

        // Log das Ergebnis für Diagnose
        console.log('[NeedsIntegration.calculateDimensionalResonance] Ergebnis für', archetyp + ':', {
            R1_leben: result.leben,
            R2_philosophie: result.philosophie,
            R3_dynamik: result.dynamik,
            R4_identitaet: result.identitaet
        });

        return result;
    },

    /**
     * Berechnet R für eine einzelne Dimension
     *
     * NEUE FORMEL (Intensitäts-basiert):
     * R_dim = 0.5 + (Durchschnitt der Bedürfniswerte / 100)
     *
     * Der R-Faktor repräsentiert jetzt die WICHTIGKEIT/INTENSITÄT
     * dieser Dimension für den Benutzer, nicht die Abweichung vom Archetyp.
     *
     * - Hohe Bedürfniswerte → hoher R-Faktor → mehr Gewicht
     * - Niedrige Bedürfniswerte → niedriger R-Faktor → weniger Gewicht
     *
     * v3.2: Range: 0 (alle auf 0) bis 1 (alle auf 100), R = (avgValue/100)²
     *
     * Unterstützt zwei Formate:
     * - Altes Format: { needKey: 50 }
     * - Neues Format: { needKey: { value: 50, id: '#B50', label: 'Label' } }
     *
     * @private
     */
    _calculateSingleResonance: function(needs, dimensionKohaerenz, archetyp) {
        if (!dimensionKohaerenz || !dimensionKohaerenz[archetyp]) {
            console.warn('[NeedsIntegration._calculateSingleResonance] Keine Kohärenz-Daten für Archetyp:', archetyp);
            return 1.0; // Neutral wenn keine Daten
        }

        var archetypTypisch = dimensionKohaerenz[archetyp];
        var totalValue = 0;
        var count = 0;
        var debugMatches = [];

        for (var needKey in archetypTypisch) {
            if (archetypTypisch.hasOwnProperty(needKey) && archetypTypisch[needKey] !== null) {
                var typischEntry = archetypTypisch[needKey];

                // Hole Bedürfnis-ID wenn vorhanden
                var needId = (typeof typischEntry === 'object' && typischEntry.id)
                    ? typischEntry.id
                    : null;

                // Verwende Hilfsfunktion für konsistente Lookup-Logik
                var actualValue = this._getNeedValue(needs, needId, needKey);

                if (actualValue !== undefined) {
                    totalValue += actualValue;
                    count++;
                    debugMatches.push({ key: needKey, id: needId, value: actualValue });
                }
            }
        }

        if (count === 0) {
            console.warn('[NeedsIntegration._calculateSingleResonance] Keine Bedürfnisse gefunden für:', archetyp, '- Needs-Keys:', Object.keys(needs || {}).slice(0, 5));
            return 1.0; // Neutral wenn keine Bedürfnisse gefunden
        }

        // Debug-Output für Diagnose
        if (debugMatches.length > 0) {
            var avgValue = totalValue / count;
            console.log('[NeedsIntegration._calculateSingleResonance] Intensitäts-Berechnung:', {
                archetyp: archetyp,
                avgValue: avgValue.toFixed(1),
                count: count,
                matches: debugMatches
            });
        }

        // NEU v3.2: R = (Durchschnitt / 100)² (rein quadratisch, keine Offsets/Clamps)
        // Durchschnitt 0 → R = 0.00 (eliminiert)
        // Durchschnitt 50 → R = 0.25
        // Durchschnitt 70 → R = 0.49
        // Durchschnitt 85 → R = 0.72
        // Durchschnitt 100 → R = 1.00 (neutral)
        var avgValue = totalValue / count;
        var normalizedValue = avgValue / 100;
        var rValue = normalizedValue * normalizedValue; // Quadratisch, keine Clamps!

        return Math.round(rValue * 1000) / 1000;
    },

    /**
     * Wendet die dimensionalen Resonanzen als Vorab-Multiplikator auf
     * die Bedürfniswerte an.
     *
     * @param {object} needs - Original-Bedürfnisse
     * @param {object} resonanz - { leben, dynamik, identitaet }
     * @returns {object} Modifizierte Bedürfnisse
     */
    applyResonanceToNeeds: function(needs, resonanz) {
        if (!resonanz || !resonanz.enabled) {
            return needs;
        }

        var constants = TiageSynthesis.Constants;
        var modified = {};

        // Kopiere alle Bedürfnisse
        for (var key in needs) {
            if (needs.hasOwnProperty(key)) {
                modified[key] = needs[key];
            }
        }

        // Wende R_Leben auf Orientierungs-Bedürfnisse an
        var orientierungNeeds = constants.NEEDS_INTEGRATION.ORIENTIERUNG_NEEDS || [];
        for (var i = 0; i < orientierungNeeds.length; i++) {
            var needId = orientierungNeeds[i];
            if (modified[needId] !== undefined) {
                modified[needId] = Math.round(modified[needId] * resonanz.leben);
                modified[needId] = Math.min(100, Math.max(0, modified[needId]));
            }
        }

        // Wende R_Dynamik auf Dominanz-Bedürfnisse an
        var dominanzNeeds = constants.NEEDS_INTEGRATION.DOMINANZ_NEEDS || [];
        for (var j = 0; j < dominanzNeeds.length; j++) {
            var needId2 = dominanzNeeds[j];
            if (modified[needId2] !== undefined) {
                modified[needId2] = Math.round(modified[needId2] * resonanz.dynamik);
                modified[needId2] = Math.min(100, Math.max(0, modified[needId2]));
            }
        }

        // Wende R_Identität auf Geschlechts-Bedürfnisse an
        var geschlechtNeeds = constants.NEEDS_INTEGRATION.GESCHLECHT_NEEDS || [];
        for (var k = 0; k < geschlechtNeeds.length; k++) {
            var needId3 = geschlechtNeeds[k];
            if (modified[needId3] !== undefined) {
                modified[needId3] = Math.round(modified[needId3] * resonanz.identitaet);
                modified[needId3] = Math.min(100, Math.max(0, modified[needId3]));
            }
        }

        return modified;
    },

    // ═══════════════════════════════════════════════════════════════════════
    // PERSPEKTIVEN-BASIERTE RESONANZ (v3.2)
    // ═══════════════════════════════════════════════════════════════════════
    //
    // INDIVIDUELL: Jede Person hat eigene R-Werte basierend auf Kohärenz
    //   Person.needs vs. archetyp-typische Needs → Person.R-Matrix
    //
    // RELATIONAL: Kombination via Produkt
    //   R_kombiniert = R_Person1 × R_Person2
    //
    // Datenfluss:
    //   1. Berechne individuelle Matrix pro Person
    //   2. Kombiniere via Produkt
    //   3. Ø pro Faktor = Durchschnitt der 4 Perspektiven
    //   4. R = 1 + Ø/100
    //   5. Q = O×wO×R1 + A×wA×R2 + D×wD×R3 + G×wG×R4 (Gewichte aus UI)
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Ermittelt die Perspektive für ein Bedürfnis
     */
    _getPerspectiveForNeed: function(needKey) {
        if (typeof PerspektivenModal !== 'undefined' && PerspektivenModal.beduerfnisPerspektiven) {
            if (PerspektivenModal.beduerfnisPerspektiven[needKey]) {
                return PerspektivenModal.beduerfnisPerspektiven[needKey];
            }
        }

        var perspektivenMap = {
            // Osho (#P2)
            'sex_als_meditation': '#P2', 'nicht_anhaften_an_partner': '#P2',
            'hier_und_jetzt_intimitaet': '#P2', 'polyamore_energie': '#P2',
            'wildheit_und_zartheit': '#P2', 'meditation_zu_zweit': '#P2',
            'liebe_ohne_beziehung': '#P2', 'nicht_anhaften_an_familie': '#P2',
            'commune_statt_kernfamilie': '#P2', 'orgastisches_leben': '#P2',
            'radikale_ehrlichkeit': '#P2', 'authentischer_ausdruck': '#P2',
            // Pirsig (#P3)
            'biologische_anziehung': '#P3', 'qualitaet_der_beruehrung': '#P3',
            'dynamische_liebe': '#P3', 'statische_stabilitaet': '#P3',
            'dynamische_evolution': '#P3', 'intellektuelle_verbindung': '#P3',
            // Kink (#P4)
            'kontrolle_ausueben': '#P4', 'hingabe': '#P4',
            'fuehrung_geben': '#P4', 'gefuehrt_werden': '#P4',
            'machtaustausch': '#P4', 'sich_fallenlassen': '#P4',
            'nachsorge': '#P4', 'grenzen_setzen': '#P4',
            'grenzen_respektieren': '#P4', 'intensitaet': '#P4',
            'vertrauen_schenken': '#P4', 'ritual': '#P4'
        };

        return perspektivenMap[needKey] || '#P1';
    },

    /**
     * Berechnet INDIVIDUELLE Matrix für eine Person
     * Vergleicht Person.needs mit archetyp-typischen Werten
     *
     * @param {object} needs - Bedürfnisse der Person
     * @param {string} archetyp - Gewählter Archetyp (z.B. 'lat', 'duo')
     * @returns {object} { matrix, averages, rValues }
     */
    calculateIndividualMatrix: function(needs, archetyp) {
        var constants = TiageSynthesis.Constants;
        var self = this;
        var kohaerenz = constants.ARCHETYP_KOHAERENZ || {};

        var faktoren = {
            orientierung: { needs: constants.NEEDS_INTEGRATION.ORIENTIERUNG_NEEDS || [], kohaerenzKey: 'leben' },
            archetyp: { needs: constants.NEEDS_INTEGRATION.ARCHETYP_NEEDS || [], kohaerenzKey: 'philosophie' },
            dominanz: { needs: constants.NEEDS_INTEGRATION.DOMINANZ_NEEDS || [], kohaerenzKey: 'dynamik' },
            geschlecht: { needs: constants.NEEDS_INTEGRATION.GESCHLECHT_NEEDS || [], kohaerenzKey: 'identitaet' }
        };

        var perspektiven = ['#P1', '#P2', '#P3', '#P4'];
        var matrix = {};
        var averages = {};
        var rValues = {};

        for (var faktorKey in faktoren) {
            var faktor = faktoren[faktorKey];
            var archetypTypisch = kohaerenz[faktor.kohaerenzKey] ? kohaerenz[faktor.kohaerenzKey][archetyp] : null;

            matrix[faktorKey] = {};
            var sumMatch = 0;
            var countPerspektiven = 0;

            for (var p = 0; p < perspektiven.length; p++) {
                var perspektive = perspektiven[p];

                // Finde Bedürfnisse für diesen Faktor + Perspektive
                var relevantNeeds = [];
                for (var n = 0; n < faktor.needs.length; n++) {
                    var needKey = faktor.needs[n];
                    if (self._getPerspectiveForNeed(needKey) === perspektive) {
                        relevantNeeds.push(needKey);
                    }
                }

                // Berechne Kohärenz für diese Zelle
                var matchPercent = self._calculateCoherenceMatch(needs, archetypTypisch, relevantNeeds);
                matrix[faktorKey][perspektive] = matchPercent;

                if (matchPercent !== null) {
                    sumMatch += matchPercent;
                    countPerspektiven++;
                }
            }

            var avg = countPerspektiven > 0 ? sumMatch / countPerspektiven : 0;
            averages[faktorKey] = Math.round(avg * 10) / 10;
            rValues[faktorKey] = Math.round((1 + avg / 100) * 1000) / 1000;
        }

        return { matrix: matrix, averages: averages, rValues: rValues, archetyp: archetyp };
    },

    /**
     * Berechnet Kohärenz-Match: Person.needs vs archetyp-typisch
     */
    _calculateCoherenceMatch: function(needs, archetypTypisch, relevantNeeds) {
        if (!needs || !archetypTypisch || !relevantNeeds || relevantNeeds.length === 0) {
            return null;
        }

        var sumScore = 0;
        var sumWeight = 0;

        for (var i = 0; i < relevantNeeds.length; i++) {
            var needKey = relevantNeeds[i];

            var typischEntry = archetypTypisch[needKey];
            var typischValue = (typeof typischEntry === 'object' && typischEntry.value !== undefined)
                ? typischEntry.value : typischEntry;

            // Hole Bedürfnis-ID wenn vorhanden
            var needId = (typeof typischEntry === 'object' && typischEntry.id)
                ? typischEntry.id
                : null;

            // Verwende Hilfsfunktion für konsistente Lookup-Logik
            var actualValue = this._getNeedValue(needs, needId, needKey);

            if (actualValue !== undefined && typischValue !== undefined && typeof typischValue === 'number') {
                var diff = Math.abs(actualValue - typischValue);
                var similarity = 100 - diff;
                var weight = (actualValue + typischValue) / 2 / 100;

                sumScore += similarity * weight;
                sumWeight += weight;
            }
        }

        if (sumWeight === 0) return null;

        var rawMatch = sumScore / sumWeight;
        var matchPercent = (rawMatch - 50) * 0.2;
        return Math.round(matchPercent * 10) / 10;
    },

    /**
     * Berechnet KOMBINIERTE Matrix via Produkt
     *
     * @param {object} needs1 - Bedürfnisse Person 1
     * @param {string} archetyp1 - Archetyp Person 1
     * @param {object} needs2 - Bedürfnisse Person 2
     * @param {string} archetyp2 - Archetyp Person 2
     * @returns {object} { matrix, averages, rValues, individual }
     */
    calculateCombinedMatrix: function(needs1, archetyp1, needs2, archetyp2) {
        var self = this;

        // Individuelle Matrizen berechnen
        var individual1 = self.calculateIndividualMatrix(needs1, archetyp1);
        var individual2 = self.calculateIndividualMatrix(needs2, archetyp2);

        var perspektiven = ['#P1', '#P2', '#P3', '#P4'];
        var faktorKeys = ['orientierung', 'archetyp', 'dominanz', 'geschlecht'];

        var combinedMatrix = {};
        var combinedAverages = {};
        var combinedRValues = {};

        for (var f = 0; f < faktorKeys.length; f++) {
            var faktorKey = faktorKeys[f];
            combinedMatrix[faktorKey] = {};
            var sumMatch = 0;
            var countPerspektiven = 0;

            for (var p = 0; p < perspektiven.length; p++) {
                var perspektive = perspektiven[p];

                var val1 = individual1.matrix[faktorKey][perspektive];
                var val2 = individual2.matrix[faktorKey][perspektive];

                // Produkt-Kombination: (1 + val1/100) × (1 + val2/100)
                if (val1 !== null && val2 !== null) {
                    var r1 = 1 + val1 / 100;
                    var r2 = 1 + val2 / 100;
                    var rCombined = r1 * r2;
                    var combinedPercent = (rCombined - 1) * 100;
                    combinedPercent = Math.round(combinedPercent * 10) / 10;

                    combinedMatrix[faktorKey][perspektive] = combinedPercent;
                    sumMatch += combinedPercent;
                    countPerspektiven++;
                } else {
                    combinedMatrix[faktorKey][perspektive] = null;
                }
            }

            var avg = countPerspektiven > 0 ? sumMatch / countPerspektiven : 0;
            combinedAverages[faktorKey] = Math.round(avg * 10) / 10;
            combinedRValues[faktorKey] = Math.round((1 + avg / 100) * 1000) / 1000;
        }

        return {
            matrix: combinedMatrix,
            averages: combinedAverages,
            rValues: combinedRValues,
            individual: {
                person1: individual1,
                person2: individual2
            },
            perspektivenLabels: { '#P1': 'Statistik', '#P2': 'Konditionierung', '#P3': 'Qualität', '#P4': 'SexPositiv' }
        };
    },

    /**
     * Hauptfunktion: Berechnet R-Werte für die Synthese-Formel
     */
    calculateResonanceFromPerspectives: function(needs1, archetyp1, needs2, archetyp2) {
        var result = this.calculateCombinedMatrix(needs1, archetyp1, needs2, archetyp2);

        return {
            R1: result.rValues.orientierung,
            R2: result.rValues.archetyp,
            R3: result.rValues.dominanz,
            R4: result.rValues.geschlecht,
            matrix: result.matrix,
            averages: result.averages,
            individual: result.individual,
            perspektivenLabels: result.perspektivenLabels
        };
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SEKUNDÄR-KATEGORIEN BERECHNUNG (v3.3)
    // ═══════════════════════════════════════════════════════════════════════
    //
    // Berücksichtigt sekundäre Kategorien bei der Aggregation:
    // - Primäre Kategorie: 100% Gewichtung
    // - Sekundäre Kategorien: SECONDARY_WEIGHT (default 30%)
    //
    // Beispiel: Berührung (primär: existenz, sekundär: [zuneigung, dynamik, sicherheit])
    // Bei Wert 80: existenz +80, zuneigung +24, dynamik +24, sicherheit +24
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Gewichtung für sekundäre Kategorien (0.0 - 1.0)
     * 0.3 = 30% des Wertes fließt auch in sekundäre Kategorien
     */
    SECONDARY_WEIGHT: 0.3,

    /**
     * Mapping: Kategorie-Keys → Resonanzfaktoren
     * Alle 18 Kategorien (#K1-#K18)
     */
    KATEGORIE_TO_RESONANZ: {
        // R1 - Leben (Nähe-Distanz #D3)
        existenz: 'R1',
        zuneigung: 'R1',
        musse: 'R1',
        intimitaet_romantik: 'R1',      // #K16
        // R2 - Philosophie (Beziehungsphilosophie #D1, Werte #D2, Sozial #D6)
        freiheit: 'R2',
        teilnahme: 'R2',
        identitaet: 'R2',
        lebensplanung: 'R2',            // #K12
        finanzen_karriere: 'R2',        // #K13
        werte_haltungen: 'R2',          // #K17
        soziales_leben: 'R2',           // #K15
        praktisches_leben: 'R2',        // #K18
        // R3 - Kink (Dynamik, Sicherheit)
        dynamik: 'R3',
        sicherheit: 'R3',
        // R4 - Identität (Kommunikation #D5, Erschaffen, Verbundenheit)
        verstaendnis: 'R4',
        erschaffen: 'R4',
        verbundenheit: 'R4',
        kommunikation_stil: 'R4'        // #K14
    },

    /**
     * Lädt Bedürfnis-Definitionen mit sekundären Kategorien
     * @returns {Object|null} Mapping von needKey → { kategorie, sekundaer[] }
     */
    _getBeduerfnisDefinitionen: function() {
        // Versuche GfkBeduerfnisse zu laden
        var gfk = null;
        if (typeof window !== 'undefined' && window.GfkBeduerfnisse) {
            gfk = window.GfkBeduerfnisse;
        } else if (typeof GfkBeduerfnisse !== 'undefined') {
            gfk = GfkBeduerfnisse;
        }

        if (gfk && gfk.definitionen) {
            return gfk.definitionen;
        }

        // Fallback: Versuche aus beduerfnis-katalog.json (wenn geladen)
        if (typeof window !== 'undefined' && window.BeduerfnisKatalog) {
            return window.BeduerfnisKatalog.beduerfnisse || null;
        }

        console.warn('[NeedsIntegration] Keine Bedürfnis-Definitionen gefunden');
        return null;
    },

    /**
     * Berechnet Kategorie-Scores unter Berücksichtigung sekundärer Zuordnungen
     *
     * @param {Object} needs - Bedürfniswerte { needKey: value, ... }
     * @param {number} secondaryWeight - Gewichtung für sekundäre Kategorien (optional, default: SECONDARY_WEIGHT)
     * @returns {Object} { kategorieScores: {}, resonanzScores: {}, details: [] }
     */
    calculateCategoryScoresWithSecondary: function(needs, secondaryWeight) {
        var self = this;
        var weight = (secondaryWeight !== undefined) ? secondaryWeight : self.SECONDARY_WEIGHT;
        var definitionen = self._getBeduerfnisDefinitionen();

        if (!needs || !definitionen) {
            return {
                kategorieScores: {},
                resonanzScores: { R1: 50, R2: 50, R3: 50, R4: 50 },
                details: [],
                error: 'Keine Daten verfügbar'
            };
        }

        // Initialisiere Kategorie-Akkumulatoren
        var kategorien = {};
        var kategorieWeights = {};
        var details = [];

        // Iteriere über alle Bedürfnisse im Profil
        for (var needKey in needs) {
            if (!needs.hasOwnProperty(needKey)) continue;

            var value = needs[needKey];
            if (value === undefined || value === null || typeof value !== 'number') continue;

            // Finde Definition für dieses Bedürfnis
            var def = definitionen[needKey];
            if (!def) continue;

            var primaerKategorie = def.kategorie;
            var sekundaerKategorien = def.sekundaer || [];

            // Detail für Debugging
            var detail = {
                needKey: needKey,
                value: value,
                primaer: primaerKategorie,
                sekundaer: sekundaerKategorien,
                contributions: {}
            };

            // Primäre Kategorie: 100% Gewichtung
            if (primaerKategorie) {
                if (!kategorien[primaerKategorie]) {
                    kategorien[primaerKategorie] = 0;
                    kategorieWeights[primaerKategorie] = 0;
                }
                kategorien[primaerKategorie] += value * 1.0;
                kategorieWeights[primaerKategorie] += 1.0;
                detail.contributions[primaerKategorie] = value;
            }

            // Sekundäre Kategorien: weight% Gewichtung
            for (var i = 0; i < sekundaerKategorien.length; i++) {
                var sekKat = sekundaerKategorien[i];
                if (!kategorien[sekKat]) {
                    kategorien[sekKat] = 0;
                    kategorieWeights[sekKat] = 0;
                }
                var sekValue = value * weight;
                kategorien[sekKat] += sekValue;
                kategorieWeights[sekKat] += weight;
                detail.contributions[sekKat] = Math.round(sekValue * 10) / 10;
            }

            details.push(detail);
        }

        // Berechne Durchschnitte pro Kategorie
        var kategorieScores = {};
        for (var kat in kategorien) {
            if (kategorien.hasOwnProperty(kat) && kategorieWeights[kat] > 0) {
                kategorieScores[kat] = Math.round(kategorien[kat] / kategorieWeights[kat] * 10) / 10;
            }
        }

        // Aggregiere zu Resonanzfaktoren
        var resonanzSums = { R1: 0, R2: 0, R3: 0, R4: 0 };
        var resonanzCounts = { R1: 0, R2: 0, R3: 0, R4: 0 };

        for (var katKey in kategorieScores) {
            if (kategorieScores.hasOwnProperty(katKey)) {
                var rFaktor = self.KATEGORIE_TO_RESONANZ[katKey];
                if (rFaktor) {
                    resonanzSums[rFaktor] += kategorieScores[katKey];
                    resonanzCounts[rFaktor]++;
                }
            }
        }

        var resonanzScores = {};
        for (var r in resonanzSums) {
            if (resonanzCounts[r] > 0) {
                resonanzScores[r] = Math.round(resonanzSums[r] / resonanzCounts[r] * 10) / 10;
            } else {
                resonanzScores[r] = 50; // Neutral
            }
        }

        return {
            kategorieScores: kategorieScores,
            resonanzScores: resonanzScores,
            details: details,
            secondaryWeight: weight
        };
    },

    /**
     * Berechnet R-Werte (0-1) aus Kategorie-Scores mit sekundärer Gewichtung
     *
     * NEU v3.2: R = (Score / 100)² (quadratisch, keine Clamps)
     * Score 0 → R = 0.0, Score 50 → R = 0.25, Score 100 → R = 1.0
     *
     * @param {Object} needs - Bedürfniswerte
     * @param {number} secondaryWeight - Gewichtung für sekundäre Kategorien (optional)
     * @returns {Object} { R1, R2, R3, R4, kategorieScores, details }
     */
    calculateResonanzWithSecondary: function(needs, secondaryWeight) {
        var result = this.calculateCategoryScoresWithSecondary(needs, secondaryWeight);

        // NEU v3.2: Konvertiere Scores (0-100) zu R-Werten (0-1) quadratisch
        var rValues = {};
        for (var r in result.resonanzScores) {
            var score = result.resonanzScores[r];
            var normalized = score / 100;
            // R = normalized² (quadratisch, keine Clamps)
            rValues[r] = Math.round((normalized * normalized) * 1000) / 1000;
        }

        return {
            R1: rValues.R1 || 1.0,
            R2: rValues.R2 || 1.0,
            R3: rValues.R3 || 1.0,
            R4: rValues.R4 || 1.0,
            kategorieScores: result.kategorieScores,
            resonanzScores: result.resonanzScores,
            details: result.details,
            secondaryWeight: result.secondaryWeight
        };
    },

    /**
     * Debug-Funktion: Zeigt wie ein einzelnes Bedürfnis in Kategorien fließt
     *
     * @param {string} needKey - Bedürfnis-Schlüssel (z.B. 'beruehrung')
     * @param {number} value - Wert (0-100)
     * @returns {Object} Detaillierte Aufschlüsselung
     */
    debugNeedContribution: function(needKey, value) {
        var self = this;
        var definitionen = self._getBeduerfnisDefinitionen();

        if (!definitionen || !definitionen[needKey]) {
            return { error: 'Bedürfnis nicht gefunden: ' + needKey };
        }

        var def = definitionen[needKey];
        var contributions = {};
        var resonanzContributions = {};

        // Primär
        if (def.kategorie) {
            contributions[def.kategorie] = {
                type: 'primär',
                weight: 1.0,
                contribution: value
            };
            var rFaktor = self.KATEGORIE_TO_RESONANZ[def.kategorie];
            if (rFaktor) {
                resonanzContributions[rFaktor] = (resonanzContributions[rFaktor] || 0) + value;
            }
        }

        // Sekundär
        var sekundaer = def.sekundaer || [];
        for (var i = 0; i < sekundaer.length; i++) {
            var sekKat = sekundaer[i];
            var sekValue = value * self.SECONDARY_WEIGHT;
            contributions[sekKat] = {
                type: 'sekundär',
                weight: self.SECONDARY_WEIGHT,
                contribution: Math.round(sekValue * 10) / 10
            };
            var rFaktorSek = self.KATEGORIE_TO_RESONANZ[sekKat];
            if (rFaktorSek) {
                resonanzContributions[rFaktorSek] = (resonanzContributions[rFaktorSek] || 0) + sekValue;
            }
        }

        return {
            needKey: needKey,
            label: def.label || needKey,
            value: value,
            primaerKategorie: def.kategorie,
            sekundaerKategorien: sekundaer,
            kategorieContributions: contributions,
            resonanzContributions: resonanzContributions,
            secondaryWeight: self.SECONDARY_WEIGHT
        };
    }
};
