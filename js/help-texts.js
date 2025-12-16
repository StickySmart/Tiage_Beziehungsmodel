/**
 * TIAGE HELP TEXTS - Zentrale Dokumentation
 *
 * Single Source of Truth für alle Erklärungstexte und Formeln.
 * Separation of Concerns: Dokumentation getrennt von UI-Rendering.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

var TiageHelpTexts = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // FORMELN (SSOT - referenziert aus constants.js)
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Holt die Hauptformel aus constants.js (SSOT)
     * Fallback wenn constants.js nicht geladen
     */
    function getMainFormula() {
        // SSOT: constants.js Zeile 7
        return {
            text: 'Q = [(A × wₐ × R₂) + (O × wₒ × R₁) + (D × wᵈ × R₃) + (G × wᵍ × R₄)]',
            html: 'Q = (A×w<sub>A</sub>×R₂) + (O×w<sub>O</sub>×R₁) + (D×w<sub>D</sub>×R₃) + (G×w<sub>G</sub>×R₄)',
            description: 'Beziehungsqualitäts-Score mit Resonanzfaktoren'
        };
    }

    /**
     * Holt die R-Faktor-Formel aus constants.js (SSOT)
     */
    function getRFactorFormula() {
        // SSOT: constants.js Zeile 84
        return {
            text: 'R = 0.5 + (Übereinstimmung × 1.0)',
            description: 'Resonanzfaktor pro Dimension',
            range: { min: 0.5, max: 1.5 },
            interpretation: {
                weak: { threshold: 0.97, label: 'schwächt Score' },
                neutral: { range: [0.97, 1.05], label: 'neutral' },
                strong: { threshold: 1.05, label: 'verstärkt Score' }
            }
        };
    }

    /**
     * Holt die Bedürfnis-Matching-Formel (SSOT aus needsIntegration.js)
     */
    function getNeedsMatchingFormula() {
        return {
            similarity: 'Ähnlichkeit = 100 - |Wert₁ - Wert₂|',
            weight: 'Gewicht = (Wert₁ + Wert₂) / 2',
            contribution: 'Beitrag = Ähnlichkeit × Gewicht',
            total: 'Gesamt-Score = Σ(Beitrag) / Σ(Gewicht)'
        };
    }

    // ═══════════════════════════════════════════════════════════════════════
    // DOKUMENTATIONS-INHALTE
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * R-Faktor Einfluss-Erklärung
     * Wiederverwendbar für alle R1-R4 Faktoren
     */
    function getRFactorInfluenceExplanation(rKey) {
        const formula = getRFactorFormula();
        const mainFormula = getMainFormula();

        const factorMapping = {
            'R1': { name: 'Orientierungs', variable: 'O' },
            'R2': { name: 'Archetyp', variable: 'A' },
            'R3': { name: 'Dominanz', variable: 'D' },
            'R4': { name: 'Geschlechts', variable: 'G' }
        };

        const factor = factorMapping[rKey] || { name: 'Faktor', variable: '?' };

        return {
            title: 'Einfluss auf Endscore',
            description: `Der ${rKey}-Faktor wird direkt mit dem ${factor.name}-Score multipliziert.`,
            formula: mainFormula.html,
            highlightedFactor: rKey,
            interpretation: [
                `R < 1.0: schwächt den ${factor.name}-Score`,
                `R = 1.0: neutraler Einfluss`,
                `R > 1.0: verstärkt den ${factor.name}-Score`
            ],
            range: `Range: ${formula.range.min} - ${formula.range.max}`
        };
    }

    /**
     * Bedürfnis-Score Erklärung (für 72% Modal)
     */
    function getNeedsScoreExplanation() {
        const formula = getNeedsMatchingFormula();

        return {
            title: 'Bedürfnis-Übereinstimmung',
            subtitle: 'Gewichtete Übereinstimmung über alle 220 Bedürfnisse',
            formula: {
                similarity: formula.similarity,
                weight: formula.weight,
                contribution: formula.contribution,
                total: formula.total
            },
            example: {
                need: '#B90 Kinderwunsch',
                person1: 85,
                person2: 40,
                calculation: {
                    similarity: '100 - |85 - 40| = 55',
                    weight: '(85 + 40) / 2 = 62.5',
                    contribution: '55 × 62.5 = 3437.5'
                }
            },
            categories: [
                { label: '#B1-#B88: GFK-Kern', count: 88 },
                { label: '#B90-#B126: Lebensplanung', count: 37 },
                { label: '#B127-#B148: Finanzen & Karriere', count: 22 },
                { label: '#B149-#B176: Kommunikationsstil', count: 28 },
                { label: '#B177-#B203: Soziales Leben', count: 27 },
                { label: '#B204-#B208: Intimität & Romantik', count: 5 },
                { label: '#B209-#B220: Dynamik erweitert', count: 12 }
            ],
            total: 220
        };
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        // Formeln
        getMainFormula: getMainFormula,
        getRFactorFormula: getRFactorFormula,
        getNeedsMatchingFormula: getNeedsMatchingFormula,

        // Erklärungen
        getRFactorInfluenceExplanation: getRFactorInfluenceExplanation,
        getNeedsScoreExplanation: getNeedsScoreExplanation
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageHelpTexts;
}
