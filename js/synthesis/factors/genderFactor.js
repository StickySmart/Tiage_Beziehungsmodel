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
     * Konvertiert Geschlecht zu Kategorie für Orientierungslogik
     * Unterstützt 9 Geschlechter: cis_mann, cis_frau, trans_mann, trans_frau, nonbinaer, genderfluid, agender, intersex, divers
     */
    _getGeschlechtCategory: function(geschlecht) {
        var categoryMap = {
            // Neue Geschlechter
            'cis_mann': 'maennlich',
            'cis_frau': 'weiblich',
            'trans_mann': 'maennlich',
            'trans_frau': 'weiblich',
            'nonbinaer': 'nonbinaer',
            'genderfluid': 'fluid',
            'agender': 'agender',
            'intersex': 'inter',
            'divers': 'nonbinaer',
            // Legacy-Support
            'männlich': 'maennlich',
            'weiblich': 'weiblich',
            'non-binär': 'nonbinaer',
            'nonbinär': 'nonbinaer'
        };
        return categoryMap[geschlecht] || 'andere';
    },

    /**
     * Berechnet Attraktion für einzelne Kombination
     * Nutzt Geschlechts-Kategorien für erweiterte Gender-Unterstützung
     */
    _calculateSingleAttraction: function(g1, o1, g2, o2, constants) {
        var gender = constants.GENDER;

        // Konvertiere zu Kategorien
        var cat1 = this._getGeschlechtCategory(g1);
        var cat2 = this._getGeschlechtCategory(g2);

        // Bisexuell = immer volle Kompatibilität
        if (o1 === 'bisexuell' || o2 === 'bisexuell') {
            return { score: gender.FULL_MATCH, matchType: 'bisexuell' };
        }

        // Heterosexuell + Heterosexuell
        if (o1 === 'heterosexuell' && o2 === 'heterosexuell') {
            // männlich ↔ weiblich = perfekt
            if ((cat1 === 'maennlich' && cat2 === 'weiblich') ||
                (cat1 === 'weiblich' && cat2 === 'maennlich')) {
                return { score: gender.FULL_MATCH, matchType: 'hetero-klassisch' };
            }
            // Nonbinär/Fluid/Inter beteiligt
            if (cat1 === 'nonbinaer' || cat2 === 'nonbinaer' ||
                cat1 === 'fluid' || cat2 === 'fluid' ||
                cat1 === 'inter' || cat2 === 'inter') {
                return { score: gender.NON_BINARY_INVOLVED, matchType: 'hetero-nonbinary' };
            }
            // Agender beteiligt
            if (cat1 === 'agender' || cat2 === 'agender') {
                return { score: 60, matchType: 'hetero-agender' };
            }
            // Gleiches Geschlecht, beide hetero → niedrig aber nicht 0
            return { score: 20, matchType: 'hetero-mismatch' };
        }

        // Homosexuell + Homosexuell
        if (o1 === 'homosexuell' && o2 === 'homosexuell') {
            // Gleiche binäre Kategorie = perfekt
            if (cat1 === cat2 && cat1 !== 'nonbinaer' && cat1 !== 'fluid' && cat1 !== 'agender' && cat1 !== 'inter') {
                return { score: gender.FULL_MATCH, matchType: 'homo-klassisch' };
            }
            // Nonbinär/Inter mit Nonbinär/Inter
            if ((cat1 === 'nonbinaer' && cat2 === 'nonbinaer') ||
                (cat1 === 'fluid' && cat2 === 'fluid') ||
                (cat1 === 'inter' && cat2 === 'inter')) {
                return { score: 90, matchType: 'homo-nonbinary-match' };
            }
            // Nonbinär/Fluid/Inter beteiligt
            if (cat1 === 'nonbinaer' || cat2 === 'nonbinaer' ||
                cat1 === 'fluid' || cat2 === 'fluid' ||
                cat1 === 'inter' || cat2 === 'inter') {
                return { score: gender.NON_BINARY_INVOLVED, matchType: 'homo-nonbinary' };
            }
            // Agender beteiligt
            if (cat1 === 'agender' || cat2 === 'agender') {
                return { score: 60, matchType: 'homo-agender' };
            }
            // Verschiedene binäre Kategorien, beide homo → niedrig
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
