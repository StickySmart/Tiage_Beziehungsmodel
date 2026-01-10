/**
 * TIAGE SYNTHESE - Archetyp-Faktor
 *
 * LOGOS (Verstand) - 25% Gewichtung
 *
 * Philosophische Grundlage: Pirsig's "Statische Qualität"
 * - Strukturelle Fundamente der Beziehungsphilosophie
 * - Wie wollen beide Partner zusammenleben?
 * - Die Archetyp-Frage stellt sich NACH den initialen Pathos-Faktoren
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * SSOT: Nutzt ArchetypeMatrixCalculator.getScore() für Live-Berechnung
 * KEINE Fallback-Matrix - Werte werden aus Bedürfnis-Profilen berechnet
 * ═══════════════════════════════════════════════════════════════════════════
 */

var TiageSynthesis = TiageSynthesis || {};
TiageSynthesis.Factors = TiageSynthesis.Factors || {};

TiageSynthesis.Factors.Archetyp = {

    /**
     * Berechnet den Archetyp-Kompatibilitätsscore
     *
     * @param {string} type1 - Archetyp Person 1 (single, duo, duoflex, poly, solopoly, polyamor)
     * @param {string} type2 - Archetyp Person 2
     * @param {object} matrixData - Die geladenen archetype-matrix.json Daten
     * @returns {object} { score: 0-100, details: {...} }
     */
    calculate: function(type1, type2, matrixData) {
        if (!type1 || !type2) {
            return {
                score: 50,
                details: {
                    reason: 'Unvollständige Daten',
                    combination: null
                }
            };
        }

        var key = type1 + '_' + type2;
        var interaction = matrixData?.interactions?.[key];

        if (!interaction) {
            // Fallback: Versuche umgekehrte Kombination
            var reverseKey = type2 + '_' + type1;
            var reverseInteraction = matrixData?.interactions?.[reverseKey];

            if (reverseInteraction) {
                interaction = reverseInteraction;
                key = reverseKey;
            }
        }

        // Wenn Interaction vorhanden, berechne Score
        if (interaction) {
            // Wenn overall vorhanden, nutze es
            if (typeof interaction.overall === 'number') {
                return {
                    score: interaction.overall,
                    details: {
                        combination: key,
                        source: 'matrix-overall'
                    }
                };
            }

            // Wenn nur pro/contra vorhanden, berechne Score daraus
            if (interaction.pro || interaction.contra) {
                var score = this._calculateFromProContra(interaction, type1, type2);
                return {
                    score: score,
                    details: {
                        combination: key,
                        source: 'matrix-procontra',
                        proCount: (interaction.pro || []).length,
                        contraCount: (interaction.contra || []).length
                    }
                };
            }
        }

        // Fallback: Nutze die eingebaute Kompatibilitätsmatrix
        var fallbackScore = this._getFallbackScore(type1, type2);
        return {
            score: fallbackScore,
            details: {
                combination: key,
                source: 'fallback-matrix',
                reason: 'Keine Matrix-Daten vorhanden'
            }
        };
    },

    /**
     * Berechnet Score aus Pro/Contra Listen
     * Berücksichtigt auch die Fallback-Matrix für Basis-Kompatibilität
     */
    _calculateFromProContra: function(interaction, type1, type2) {
        var proCount = (interaction.pro || []).length;
        var contraCount = (interaction.contra || []).length;

        // Hole Basis-Score aus Fallback-Matrix
        var baseScore = this._getFallbackScore(type1, type2);

        // Pro/Contra modifizieren den Score leicht (±5 pro Punkt, max ±15)
        var modifier = Math.min(15, Math.max(-15, (proCount - contraCount) * 5));

        // Keine Obergrenze - nur Untergrenze bei 0
        var finalScore = Math.max(0, baseScore + modifier);
        return finalScore;
    },

    /**
     * Holt Score aus ArchetypeMatrixCalculator (SSOT)
     * Live-Berechnung aus Bedürfnis-Profilen - KEINE Fallback-Matrix!
     */
    _getFallbackScore: function(type1, type2) {
        // SSOT: Nutze ArchetypeMatrixCalculator.getScore()
        if (typeof TiageSynthesis !== 'undefined' &&
            TiageSynthesis.ArchetypeMatrixCalculator &&
            typeof TiageSynthesis.ArchetypeMatrixCalculator.getScore === 'function') {
            return TiageSynthesis.ArchetypeMatrixCalculator.getScore(type1, type2);
        }

        // Warnung wenn SSOT nicht verfügbar
        console.warn('[Archetyp Factor] ArchetypeMatrixCalculator nicht verfügbar!');
        return 50; // Neutraler Default
    },

    /**
     * Gibt das Kompatibilitätslevel als Text zurück
     */
    _getCompatibilityLevel: function(score) {
        if (score >= 90) return 'sehr-hoch';
        if (score >= 70) return 'hoch';
        if (score >= 50) return 'mittel';
        if (score >= 30) return 'niedrig';
        return 'sehr-niedrig';
    },

    /**
     * Prüft ob Archetypen fundamental inkompatibel sind
     * (Kein K.O., aber wichtige Info für Resonanz)
     */
    hasFundamentalConflict: function(type1, type2) {
        var conflictPairs = [
            ['single', 'polyamor'],
            ['duo', 'polyamor'],
            ['solopoly', 'duo']
        ];

        for (var i = 0; i < conflictPairs.length; i++) {
            var pair = conflictPairs[i];
            if ((type1 === pair[0] && type2 === pair[1]) ||
                (type1 === pair[1] && type2 === pair[0])) {
                return true;
            }
        }
        return false;
    }
};
