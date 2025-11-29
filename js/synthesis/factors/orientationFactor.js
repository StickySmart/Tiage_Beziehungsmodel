/**
 * TIAGE SYNTHESE - Orientierungs-Faktor
 *
 * PATHOS (Gefühl) - 25% Gewichtung
 *
 * Philosophische Grundlage: OSHO's Polarität + Pirsig's Dynamische Qualität
 *
 * OSHO: "Polarität ist Voraussetzung für Anziehung"
 *
 * WICHTIG: Kein harter K.O. mehr!
 * - "unmöglich" → niedriger Score (10%), nicht 0
 * - Dies ermöglicht Resonanz-Berechnung auch bei schwieriger Kompatibilität
 */

var TiageSynthesis = TiageSynthesis || {};
TiageSynthesis.Factors = TiageSynthesis.Factors || {};

TiageSynthesis.Factors.Orientierung = {

    /**
     * Berechnet die Orientierungs-Kompatibilität
     *
     * @param {object} person1 - { geschlecht, orientierung: { heterosexuell, homosexuell, bisexuell } }
     * @param {object} person2 - { geschlecht, orientierung: { ... } }
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
                score: 50,
                details: {
                    result: 'unvollstaendig',
                    reason: 'Fehlende Daten für Orientierungs-Berechnung'
                }
            };
        }

        // Prüfe alle Kombinationen
        var bestResult = this._findBestCompatibility(oriList1, oriList2, g1, g2);

        // Score basierend auf Ergebnis (sanft, kein K.O.)
        var score = this._resultToScore(bestResult.result, constants);

        return {
            score: score,
            details: {
                result: bestResult.result,
                confidence: bestResult.confidence,
                hasExploration: bestResult.hasExploration,
                bestCombination: bestResult.bestCombination,
                allOptions1: oriList1,
                allOptions2: oriList2
            }
        };
    },

    /**
     * Extrahiert Orientierungen aus Person-Objekt
     */
    _extractOrientations: function(person) {
        var list = [];
        var ori = person.orientierung;

        if (!ori) return list;

        // Multi-Select Format
        if (typeof ori === 'object') {
            var types = ['heterosexuell', 'homosexuell', 'bisexuell'];
            for (var i = 0; i < types.length; i++) {
                var type = types[i];
                if (ori[type]) {
                    list.push({ type: type, status: ori[type] });
                }
            }
        }
        // Altes String-Format (Rückwärtskompatibilität)
        else if (typeof ori === 'string') {
            list.push({
                type: ori,
                status: person.orientierungStatus || 'gelebt'
            });
        }

        return list;
    },

    /**
     * Findet beste Kompatibilität aus allen Kombinationen
     */
    _findBestCompatibility: function(oriList1, oriList2, g1, g2) {
        var hasMoeglich = false;
        var hasUnsicher = false;
        var hasInteressiert = false;
        var bestCombination = null;

        for (var i = 0; i < oriList1.length; i++) {
            for (var j = 0; j < oriList2.length; j++) {
                var o1 = oriList1[i];
                var o2 = oriList2[j];

                var result = this._checkSinglePair(o1.type, o1.status, o2.type, o2.status, g1, g2);

                if (result === 'moeglich') {
                    hasMoeglich = true;
                    bestCombination = { ori1: o1, ori2: o2 };
                } else if (result === 'unsicher') {
                    hasUnsicher = true;
                    if (!bestCombination) {
                        bestCombination = { ori1: o1, ori2: o2 };
                    }
                }

                if (o1.status === 'interessiert' || o2.status === 'interessiert') {
                    hasInteressiert = true;
                }
            }
        }

        // Bestes Ergebnis bestimmen
        if (hasMoeglich && !hasInteressiert) {
            return {
                result: 'moeglich',
                confidence: 'hoch',
                hasExploration: false,
                bestCombination: bestCombination
            };
        }

        if (hasMoeglich && hasInteressiert) {
            return {
                result: 'unsicher',
                confidence: 'mittel',
                hasExploration: true,
                bestCombination: bestCombination
            };
        }

        if (hasUnsicher) {
            return {
                result: 'unsicher',
                confidence: 'niedrig',
                hasExploration: true,
                bestCombination: bestCombination
            };
        }

        return {
            result: 'unwahrscheinlich',
            confidence: 'sehr-niedrig',
            hasExploration: false,
            bestCombination: null
        };
    },

    /**
     * Prüft einzelnes Orientierungs-Paar
     */
    _checkSinglePair: function(type1, status1, type2, status2, g1, g2) {
        var isExploring = (status1 === 'interessiert' || status2 === 'interessiert');

        // Bisexuell ist immer kompatibel
        if (type1 === 'bisexuell' || type2 === 'bisexuell') {
            return isExploring ? 'unsicher' : 'moeglich';
        }

        // Beide heterosexuell
        if (type1 === 'heterosexuell' && type2 === 'heterosexuell') {
            if (g1 !== g2) {
                return isExploring ? 'unsicher' : 'moeglich';
            }
            return 'unmoeglich'; // Gleiches Geschlecht, beide hetero
        }

        // Beide homosexuell
        if (type1 === 'homosexuell' && type2 === 'homosexuell') {
            if (g1 === g2) {
                return isExploring ? 'unsicher' : 'moeglich';
            }
            return 'unmoeglich'; // Verschiedenes Geschlecht, beide homo
        }

        // Gemischt: hetero + homo
        if (isExploring) {
            return 'unsicher'; // Exploration könnte Dinge ändern
        }
        return 'unmoeglich';
    },

    /**
     * Wandelt Ergebnis in Score um (SANFT, kein K.O.!)
     */
    _resultToScore: function(result, constants) {
        var scores = constants.ORIENTATION;

        switch (result) {
            case 'moeglich':
                return scores.COMPATIBLE;      // 100
            case 'unsicher':
                return scores.EXPLORING;       // 70
            case 'unwahrscheinlich':
                return scores.UNLIKELY;        // 30
            case 'unmoeglich':
                return scores.INCOMPATIBLE;    // 10 (nicht 0!)
            default:
                return 50;
        }
    }
};
