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
    }
};
