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
     * Berechnet die dimensionalen Resonanzen R_Leben, R_Dynamik, R_Identität, R_Philosophie
     * basierend auf der Kohärenz zwischen Archetyp und Bedürfnissen.
     *
     * @param {object} person - Profil mit archetyp und needs
     * @returns {object} { leben: R, dynamik: R, identitaet: R, philosophie: R }
     */
    calculateDimensionalResonance: function(person) {
        var constants = TiageSynthesis.Constants;
        var kohaerenz = constants.ARCHETYP_KOHAERENZ;

        // Needs können in person.needs oder person.profileReview.flatNeeds sein
        var needs = person.needs || (person.profileReview && person.profileReview.flatNeeds);

        if (!kohaerenz || !person.archetyp || !needs) {
            return {
                leben: 1.0,
                dynamik: 1.0,
                identitaet: 1.0,
                philosophie: 1.0,
                enabled: false
            };
        }

        var archetyp = person.archetyp.key || person.archetyp;

        return {
            leben: this._calculateSingleResonance(needs, kohaerenz.leben, archetyp),
            dynamik: this._calculateSingleResonance(needs, kohaerenz.dynamik, archetyp),
            identitaet: this._calculateSingleResonance(needs, kohaerenz.identitaet, archetyp),
            philosophie: this._calculateSingleResonance(needs, kohaerenz.philosophie, archetyp),
            enabled: true,
            archetyp: archetyp
        };
    },

    /**
     * Berechnet R für eine einzelne Dimension
     *
     * Formel: R_dim = 0.9 + (Übereinstimmung × 0.2)
     * Übereinstimmung = 1 - (durchschnittliche Abweichung / 100)
     *
     * Unterstützt zwei Formate:
     * - Altes Format: { needKey: 50 }
     * - Neues Format: { needKey: { value: 50, id: '#B50', label: 'Label' } }
     *
     * @private
     */
    _calculateSingleResonance: function(needs, dimensionKohaerenz, archetyp) {
        if (!dimensionKohaerenz || !dimensionKohaerenz[archetyp]) {
            return 1.0; // Neutral wenn keine Daten
        }

        var archetypTypisch = dimensionKohaerenz[archetyp];
        var totalDiff = 0;
        var count = 0;

        for (var needKey in archetypTypisch) {
            if (archetypTypisch.hasOwnProperty(needKey) && archetypTypisch[needKey] !== null) {
                var typischEntry = archetypTypisch[needKey];

                // Unterstütze beide Formate: direkte Zahl oder Objekt mit .value
                var typischValue = (typeof typischEntry === 'object' && typischEntry.value !== undefined)
                    ? typischEntry.value
                    : typischEntry;

                // Lookup-Key: verwende ID wenn vorhanden, sonst den Key selbst
                var lookupKey = (typeof typischEntry === 'object' && typischEntry.id)
                    ? typischEntry.id
                    : needKey;

                var actualValue = needs[lookupKey];

                if (actualValue !== undefined && typeof typischValue === 'number') {
                    var diff = Math.abs(actualValue - typischValue);
                    totalDiff += diff;
                    count++;
                }
            }
        }

        if (count === 0) {
            return 1.0; // Neutral wenn keine vergleichbaren Bedürfnisse
        }

        var avgDiff = totalDiff / count;
        var uebereinstimmung = 1 - (avgDiff / 100);

        // R_dim = 0.5 + (Übereinstimmung × 1.0)
        // Range: 0.5 (keine Übereinstimmung) bis 1.5 (perfekte Übereinstimmung)
        // Passend zum UI-Slider Range
        var rValue = 0.5 + (uebereinstimmung * 1.0);

        // Clamp auf 0.5 - 1.5
        return Math.round(Math.max(0.5, Math.min(1.5, rValue)) * 1000) / 1000;
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
    //   5. Q = A×0.25×R1 + O×0.25×R2 + D×0.25×R3 + G×0.25×R4
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
            var actualValue = needs[needKey];

            var typischEntry = archetypTypisch[needKey];
            var typischValue = (typeof typischEntry === 'object' && typischEntry.value !== undefined)
                ? typischEntry.value : typischEntry;

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
            perspektivenLabels: { '#P1': 'GFK', '#P2': 'Osho', '#P3': 'Pirsig', '#P4': 'Kink' }
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
    }
};
