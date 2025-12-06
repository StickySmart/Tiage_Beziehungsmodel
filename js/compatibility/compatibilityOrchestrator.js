/**
 * COMPATIBILITY ORCHESTRATOR
 *
 * Koordiniert alle Kompatibilitätsprüfungen (Pathos + Logos) und
 * stellt die Ergebnisse für die UI bereit.
 *
 * Trennt Berechnungslogik von DOM-Manipulation.
 *
 * Extrahiert aus app-main.js für bessere Wartbarkeit und Testbarkeit.
 *
 * @module TiageCompatibility.Orchestrator
 */

var TiageCompatibility = TiageCompatibility || {};

TiageCompatibility.Orchestrator = (function() {
    'use strict';

    /**
     * Run all compatibility checks (pure function - no DOM manipulation)
     *
     * @param {object} person1 - Person 1 data with archetyp and dimensions
     * @param {object} person2 - Person 2 data with archetyp and dimensions
     * @param {object} matrixData - The archetype-matrix.json data
     * @param {object} dimensionModifiers - Optional: Dimension modifiers module
     * @returns {object} Complete compatibility result
     */
    function runChecks(person1, person2, matrixData, dimensionModifiers) {
        // 1. PATHOS CHECK - Physical Compatibility
        var pathosCheck = TiageCompatibility.Physical.check(person1, person2);

        // 2. LOGOS CHECK - Philosophy Compatibility
        var logosCheck = TiageCompatibility.Philosophy.calculate(
            person1.archetyp,
            person2.archetyp,
            matrixData
        );

        // Determine warning flags
        var hasLogosWarning = logosCheck.score < 50;
        var hasPathosUncertain = pathosCheck.result === 'unsicher';
        var hasPathosBlocked = pathosCheck.result === 'unmöglich';
        var hasPathosIncomplete = pathosCheck.result === 'unvollständig';

        // 3. Get modifier summaries if module available
        var modifierSummaries = [];
        if (dimensionModifiers && typeof dimensionModifiers.getModifierSummary === 'function') {
            modifierSummaries = dimensionModifiers.getModifierSummary(person1, person2);
        } else if (typeof TiageDimensions !== 'undefined' && TiageDimensions.Modifiers) {
            modifierSummaries = TiageDimensions.Modifiers.getSummary(person1, person2);
        }

        // 4. Determine combined warning type
        var warningType = determineWarningType(pathosCheck, logosCheck);

        return {
            // Individual check results
            pathosCheck: pathosCheck,
            logosCheck: logosCheck,

            // Warning flags
            warnings: {
                hasLogosWarning: hasLogosWarning,
                hasPathosUncertain: hasPathosUncertain,
                hasPathosBlocked: hasPathosBlocked,
                hasPathosIncomplete: hasPathosIncomplete,
                type: warningType
            },

            // Modifier information
            modifiers: modifierSummaries,

            // Quick access flags
            blocked: false, // No longer blocking, just warning
            showContent: true
        };
    }

    /**
     * Determine the type of warning to show
     * @param {object} pathosCheck - Result from physical compatibility
     * @param {object} logosCheck - Result from philosophy compatibility
     * @returns {string} 'none' | 'pathos' | 'logos' | 'double' | 'incomplete'
     */
    function determineWarningType(pathosCheck, logosCheck) {
        var hasPathosIssue = pathosCheck.result === 'unsicher' || pathosCheck.result === 'unmöglich';
        var hasLogosIssue = logosCheck.score < 50;
        var isIncomplete = pathosCheck.result === 'unvollständig';

        if (isIncomplete) return 'incomplete';
        if (hasPathosIssue && hasLogosIssue) return 'double';
        if (hasPathosIssue) return 'pathos';
        if (hasLogosIssue) return 'logos';
        return 'none';
    }

    /**
     * Format person summary for display
     *
     * @param {object} person - Person data
     * @returns {string} Formatted summary string
     */
    function formatPersonSummary(person) {
        // Extract primary gender from object format { primary: 'cis_mann', secondary: null }
        var geschlecht = person.geschlecht || '?';
        if (geschlecht && typeof geschlecht === 'object' && 'primary' in geschlecht) {
            geschlecht = geschlecht.primary || '?';
        }

        // Handle Primary/Secondary orientierung structure
        var orientierungStr = '?';
        if (person.orientierung && typeof person.orientierung === 'object') {
            var parts = [];
            if (person.orientierung.primary) {
                parts.push(person.orientierung.primary + ' (P)');
            }
            if (person.orientierung.secondary) {
                parts.push(person.orientierung.secondary + ' (S)');
            }
            orientierungStr = parts.length > 0 ? parts.join(', ') : '?';
        } else if (person.orientierung) {
            // Backwards compatibility for old single-value format
            orientierungStr = person.orientierung;
        }

        return geschlecht + ', ' + orientierungStr;
    }

    /**
     * Get UI configuration for pathos/logos info modal
     * @returns {object} Modal content configuration
     */
    function getPathosLogosInfoContent() {
        return {
            title: 'Pathos vs. Logos',
            pathos: {
                title: 'GEFÜHLSEBENE (Emotion/Körper)',
                items: [
                    'Körperliche und emotionale Anziehung',
                    'Sexuelle Orientierung',
                    'Nicht durch Lernen oder Kommunikation veränderbar'
                ],
                conclusion: 'Ohne Gefühlsebene: Keine romantische Beziehung möglich'
            },
            logos: {
                title: 'VERSTANDSEBENE (Philosophie/Überzeugungen)',
                items: [
                    'Beziehungsphilosophie und rationale Überzeugungen',
                    'Überzeugungen und Werte',
                    'Kann durch Kommunikation und Lernen verändert werden'
                ],
                conclusion: 'Ohne Verstandsebene: Schwierige, aber mögliche Beziehung'
            },
            quote: '"Die Gefühlsebene ist das Fundament - ohne körperliche Anziehung kann keine romantische Beziehung entstehen. Die Verstandsebene ist das Dach - es schützt und strukturiert, kann aber umgebaut werden."'
        };
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        runChecks: runChecks,
        determineWarningType: determineWarningType,
        formatPersonSummary: formatPersonSummary,
        getPathosLogosInfoContent: getPathosLogosInfoContent
    };

})();
