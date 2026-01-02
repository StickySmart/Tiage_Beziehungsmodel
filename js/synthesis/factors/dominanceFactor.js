/**
 * TIAGE SYNTHESE - Dominanz-Faktor
 *
 * PATHOS (Gefühl) - 20% Gewichtung
 *
 * Philosophische Grundlage: OSHO + Pirsig's "Dynamische Qualität"
 *
 * OSHO: "Nur Extreme können sich wirklich verlieben. Nur Extreme ziehen
 *        sich an. Je weiter sie voneinander entfernt sind, desto tiefer
 *        wird die Anziehung."
 *
 * OSHO: "Es gibt nur eine Energie - Tao. Sie funktioniert auf zwei Arten.
 *        In der Frau wird dieselbe Energie rezeptiv. Im Mann wird dieselbe
 *        Energie aggressiv."
 */

var TiageSynthesis = TiageSynthesis || {};
TiageSynthesis.Factors = TiageSynthesis.Factors || {};

TiageSynthesis.Factors.Dominanz = {

    /**
     * Berechnet die Dominanz-Harmonie zwischen zwei Personen
     *
     * @param {object} domObj1 - Dominanz-Objekt Person 1 { dominant: 'gelebt'|'interessiert', ... }
     * @param {object} domObj2 - Dominanz-Objekt Person 2
     * @returns {object} { score: 0-100, details: {...} }
     */
    calculate: function(domObj1, domObj2) {
        var constants = TiageSynthesis.Constants;
        var matrix = constants.DOMINANCE_MATRIX;
        var explorationMod = constants.EXPLORATION.MODIFIER;

        // Sammle ausgewählte Präferenzen
        var list1 = this._extractPreferences(domObj1);
        var list2 = this._extractPreferences(domObj2);

        // Default wenn keine Auswahl
        if (list1.length === 0 || list2.length === 0) {
            return {
                score: 75,
                details: {
                    reason: 'Unvollständige Dominanz-Daten',
                    bestCombination: null
                }
            };
        }

        // Finde beste Kombination
        var bestScore = 0;
        var bestCombination = null;
        var hasExploration = false;

        // NEU: Tracking für Sekundär-Bonus
        var hasPrimaryMatch = false;      // Primäre Dominanzen passen
        var hasSecondaryMatch = false;    // Sekundäre Dominanzen passen auch
        var secondaryComplementary = false; // Sekundäre sind komplementär (dom ↔ sub)

        for (var i = 0; i < list1.length; i++) {
            for (var j = 0; j < list2.length; j++) {
                var d1 = list1[i];
                var d2 = list2[j];

                var result = this._calculateSingleHarmony(d1, d2, matrix, explorationMod);

                if (result.score > bestScore) {
                    bestScore = result.score;
                    bestCombination = {
                        person1: d1,
                        person2: d2,
                        harmonyType: result.harmonyType
                    };
                    hasExploration = result.hasExploration;
                }

                // NEU: Tracking für Sekundär-Bonus
                if (result.score >= 80) {  // Gute Kompatibilität
                    if (d1.status === 'gelebt' && d2.status === 'gelebt') {
                        hasPrimaryMatch = true;
                    } else if (d1.status === 'sekundaer' || d2.status === 'sekundaer') {
                        hasSecondaryMatch = true;
                        // Prüfe ob komplementär (dom ↔ sub)
                        if (result.harmonyType === 'komplementaer') {
                            secondaryComplementary = true;
                        }
                    }
                }
            }
        }

        // Sekundär-Bonus nur wenn primäre UND sekundäre passen
        var hasSecondaryBonus = hasPrimaryMatch && hasSecondaryMatch;

        return {
            score: bestScore,
            details: {
                bestCombination: bestCombination,
                hasExploration: hasExploration,
                allOptions1: list1,
                allOptions2: list2,
                harmonyLevel: this._getHarmonyLevel(bestScore),
                // NEU: Sekundär-Bonus-Informationen
                hasSecondaryBonus: hasSecondaryBonus,
                secondaryComplementary: secondaryComplementary,
                hasPrimaryMatch: hasPrimaryMatch,
                hasSecondaryMatch: hasSecondaryMatch
            }
        };
    },

    /**
     * Extrahiert Präferenzen aus Dominanz-Objekt
     *
     * Unterstützt drei Formate:
     * 1. String: 'dominant' → [{ type: 'dominant', status: 'gelebt' }]
     * 2. NEU P/S-Format: { primary: 'dominant', secondary: 'submissiv' }
     * 3. Altes Multi-Select: { dominant: 'gelebt', submissiv: 'interessiert' }
     */
    _extractPreferences: function(domObj) {
        var list = [];

        if (!domObj) return list;

        // Handle altes String-Format (Rückwärtskompatibilität)
        if (typeof domObj === 'string') {
            list.push({ type: domObj, status: 'gelebt' });
            return list;
        }

        // NEU: Handle Primary/Secondary Format aus UI
        // SSOT-FIX: Secondary ist NICHT 'interessiert' (Exploration),
        // sondern 'sekundaer' (auch gelebt, nur nicht primär)
        if ('primary' in domObj) {
            if (domObj.primary) {
                list.push({ type: domObj.primary, status: 'gelebt' });
            }
            if (domObj.secondary) {
                list.push({ type: domObj.secondary, status: 'sekundaer' });
            }
            return list;
        }

        // Altes Multi-Select Format: { dominant: 'gelebt', submissiv: 'interessiert' }
        var types = ['dominant', 'submissiv', 'switch', 'ausgeglichen'];
        for (var i = 0; i < types.length; i++) {
            var type = types[i];
            if (domObj[type]) {
                list.push({ type: type, status: domObj[type] });
            }
        }

        return list;
    },

    /**
     * Berechnet Harmonie für eine einzelne Kombination
     *
     * SSOT-FIX: 'sekundaer' wird wie 'gelebt' behandelt (keine Exploration)
     * Nur 'interessiert' führt zu hasExploration = true
     */
    _calculateSingleHarmony: function(d1, d2, matrix, explorationMod) {
        var key = d1.type + '-' + d2.type;
        var reverseKey = d2.type + '-' + d1.type;

        var baseScore = matrix[key] || matrix[reverseKey] || 75;

        // SSOT-FIX: Nur echte 'interessiert' zählt als Exploration
        // 'sekundaer' ist eine gelebte Dominanz, keine Unsicherheit
        var hasExploration = (d1.status === 'interessiert' || d2.status === 'interessiert');

        // Exploration-Modifier nur bei echter Exploration anwenden
        if (hasExploration) {
            baseScore = Math.round(baseScore * explorationMod);
        }

        return {
            score: baseScore,
            harmonyType: this._getHarmonyType(d1.type, d2.type),
            hasExploration: hasExploration
        };
    },

    /**
     * Bestimmt den Typ der Harmonie
     */
    _getHarmonyType: function(type1, type2) {
        // Komplementäre Polarität
        if ((type1 === 'dominant' && type2 === 'submissiv') ||
            (type1 === 'submissiv' && type2 === 'dominant')) {
            return 'komplementaer';
        }

        // Tao-Balance
        if ((type1 === 'ausgeglichen' && type2 === 'ausgeglichen') ||
            (type1 === 'switch' && type2 === 'switch') ||
            (type1 === 'switch' && type2 === 'ausgeglichen') ||
            (type1 === 'ausgeglichen' && type2 === 'switch')) {
            return 'tao-balance';
        }

        // Gleiche Pole (Spannung)
        if ((type1 === 'dominant' && type2 === 'dominant') ||
            (type1 === 'submissiv' && type2 === 'submissiv')) {
            return 'gleiche-pole';
        }

        return 'gemischt';
    },

    /**
     * Gibt das Harmonie-Level als Text zurück
     */
    _getHarmonyLevel: function(score) {
        if (score >= 95) return 'perfekt';
        if (score >= 85) return 'sehr-gut';
        if (score >= 70) return 'gut';
        if (score >= 55) return 'herausfordernd';
        return 'schwierig';
    }
};
