/**
 * TIAGE SYNTHESE - Geschlechts-Faktor
 *
 * PATHOS (Gefühl) - 15% Gewichtung
 *
 * Feinjustierung der Gender-Chemie als Ergänzung zum Orientierungs-Faktor.
 * Berücksichtigt die spezifische Geschlechterkombination im Kontext
 * der sexuellen Orientierungen.
 */

var TiageSynthesis = TiageSynthesis || {};
TiageSynthesis.Factors = TiageSynthesis.Factors || {};

TiageSynthesis.Factors.Geschlecht = {

    /**
     * Berechnet die Gender-Attraktion
     *
     * @param {object} person1 - { geschlecht, orientierung }
     * @param {object} person2 - { geschlecht, orientierung }
     * @returns {object} { score: 0-100, details: {...} }
     */
    calculate: function(person1, person2) {
        var constants = TiageSynthesis.Constants;
        var g1 = person1.geschlecht;
        var g2 = person2.geschlecht;

        // Orientierungen extrahieren
        var oriList1 = this._extractOrientations(person1);
        var oriList2 = this._extractOrientations(person2);

        // Unvollständige Daten
        if (!g1 || !g2 || oriList1.length === 0 || oriList2.length === 0) {
            return {
                score: 75,
                details: {
                    reason: 'Unvollständige Daten',
                    genderCombo: null
                }
            };
        }

        // Finde beste Kombination
        var bestScore = 0;
        var bestCombination = null;

        for (var i = 0; i < oriList1.length; i++) {
            for (var j = 0; j < oriList2.length; j++) {
                var result = this._calculateSingleAttraction(g1, oriList1[i], g2, oriList2[j], constants);

                if (result.score > bestScore) {
                    bestScore = result.score;
                    bestCombination = {
                        gender1: g1,
                        gender2: g2,
                        ori1: oriList1[i],
                        ori2: oriList2[j],
                        matchType: result.matchType
                    };
                }
            }
        }

        return {
            score: bestScore,
            details: {
                bestCombination: bestCombination,
                genderCombo: g1 + '-' + g2,
                attractionLevel: this._getAttractionLevel(bestScore)
            }
        };
    },

    /**
     * Extrahiert Orientierungen als String-Array
     */
    _extractOrientations: function(person) {
        var list = [];
        var ori = person.orientierung;

        if (!ori) return list;

        if (typeof ori === 'object') {
            if (ori.heterosexuell) list.push('heterosexuell');
            if (ori.homosexuell) list.push('homosexuell');
            if (ori.bisexuell) list.push('bisexuell');
        } else if (typeof ori === 'string') {
            list.push(ori);
        }

        return list;
    },

    /**
     * Berechnet Attraktion für einzelne Kombination
     */
    _calculateSingleAttraction: function(g1, o1, g2, o2, constants) {
        var gender = constants.GENDER;

        // Bisexuell = immer volle Kompatibilität
        if (o1 === 'bisexuell' || o2 === 'bisexuell') {
            return { score: gender.FULL_MATCH, matchType: 'bisexuell' };
        }

        // Heterosexuell + Heterosexuell
        if (o1 === 'heterosexuell' && o2 === 'heterosexuell') {
            // Mann ↔ Frau = perfekt
            if ((g1 === 'männlich' && g2 === 'weiblich') ||
                (g1 === 'weiblich' && g2 === 'männlich')) {
                return { score: gender.FULL_MATCH, matchType: 'hetero-klassisch' };
            }
            // Non-binär beteiligt
            if (g1 === 'non-binär' || g2 === 'non-binär') {
                return { score: gender.NON_BINARY_INVOLVED, matchType: 'hetero-nonbinary' };
            }
            // Gleiches Geschlecht, beide hetero → niedrig aber nicht 0
            return { score: 20, matchType: 'hetero-mismatch' };
        }

        // Homosexuell + Homosexuell
        if (o1 === 'homosexuell' && o2 === 'homosexuell') {
            // Gleiches binäres Geschlecht = perfekt
            if (g1 === g2 && g1 !== 'non-binär') {
                return { score: gender.FULL_MATCH, matchType: 'homo-klassisch' };
            }
            // Non-binär beteiligt
            if (g1 === 'non-binär' || g2 === 'non-binär') {
                return { score: gender.NON_BINARY_INVOLVED, matchType: 'homo-nonbinary' };
            }
            // Verschiedenes Geschlecht, beide homo → niedrig
            return { score: 20, matchType: 'homo-mismatch' };
        }

        // Gemischte Orientierungen
        return { score: gender.MIXED_ORIENTATION, matchType: 'gemischt' };
    },

    /**
     * Gibt das Attraktions-Level als Text zurück
     */
    _getAttractionLevel: function(score) {
        if (score >= 95) return 'maximal';
        if (score >= 75) return 'hoch';
        if (score >= 50) return 'mittel';
        if (score >= 25) return 'niedrig';
        return 'minimal';
    }
};
