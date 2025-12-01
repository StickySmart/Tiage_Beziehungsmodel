/**
 * TOP 10 RANKING CALCULATOR
 * =========================
 * Berechnet und rankt alle möglichen Archetyp-Kombinationen
 * für eine gegebene Person
 *
 * Features:
 * - Berechnung aller 8 Archetyp-Kombinationen für einen Basis-Archetyp
 * - Sortierung nach Gesamtscore
 * - Integration mit IntegratedSynthesisTextGenerator für psychologische Texte
 * - Detaillierte Top 10 Analyse mit Pathos + Logos Scores
 */

const Top10RankingCalculator = (function() {
    'use strict';

    // Alle verfügbaren Archetypen
    const ALL_ARCHETYPES = [
        'single', 'duo', 'duo-flex', 'ra', 'lat', 'aromantisch', 'solopoly', 'polyamor'
    ];

    // Archetyp-Namen für Anzeige
    const ARCHETYPE_DISPLAY_NAMES = {
        'single': 'Single',
        'duo': 'Duo',
        'duo-flex': 'Duo-Flex',
        'ra': 'Relationship Anarchist',
        'lat': 'LAT',
        'aromantisch': 'Aromantisch',
        'solopoly': 'Solopoly',
        'polyamor': 'Polyamor'
    };

    // Vereinfachte Kompatibilitätsmatrix (basiert auf archetype-matrix.json Logik)
    // Werte 0-100 für philosophische Grundkompatibilität
    const COMPATIBILITY_MATRIX = {
        'single': {
            'single': 85,      // Verstehen sich, aber keine Beziehung angestrebt
            'duo': 25,         // Fundamentaler Konflikt
            'duo-flex': 45,    // Möglich mit viel Raum
            'ra': 75,          // Ähnliche Autonomie-Werte
            'lat': 70,         // Raum-Bedürfnis passt
            'aromantisch': 80, // Keine romantischen Erwartungen
            'solopoly': 75,    // Autonomie-fokussiert
            'polyamor': 50     // Kann funktionieren
        },
        'duo': {
            'single': 25,
            'duo': 95,         // Perfekte Übereinstimmung
            'duo-flex': 65,    // Mit Verhandlung
            'ra': 15,          // Starker Konflikt
            'lat': 55,         // Raum-Konflikt
            'aromantisch': 20, // Grundlegend inkompatibel
            'solopoly': 20,    // Grundlegend inkompatibel
            'polyamor': 35     // Schwieriger Konflikt
        },
        'duo-flex': {
            'single': 45,
            'duo': 65,
            'duo-flex': 85,    // Gute Passung
            'ra': 55,
            'lat': 70,
            'aromantisch': 45,
            'solopoly': 60,
            'polyamor': 75     // Gute Kompatibilität
        },
        'ra': {
            'single': 75,
            'duo': 15,
            'duo-flex': 55,
            'ra': 90,          // Gleiche Philosophie
            'lat': 70,
            'aromantisch': 75,
            'solopoly': 85,    // Sehr ähnlich
            'polyamor': 70
        },
        'lat': {
            'single': 70,
            'duo': 55,
            'duo-flex': 70,
            'ra': 70,
            'lat': 90,         // Perfekte Übereinstimmung
            'aromantisch': 75,
            'solopoly': 65,
            'polyamor': 60
        },
        'aromantisch': {
            'single': 80,
            'duo': 20,
            'duo-flex': 45,
            'ra': 75,
            'lat': 75,
            'aromantisch': 95, // Verstehen sich
            'solopoly': 65,
            'polyamor': 55
        },
        'solopoly': {
            'single': 75,
            'duo': 20,
            'duo-flex': 60,
            'ra': 85,
            'lat': 65,
            'aromantisch': 65,
            'solopoly': 90,    // Gleiche Philosophie
            'polyamor': 80
        },
        'polyamor': {
            'single': 50,
            'duo': 35,
            'duo-flex': 75,
            'ra': 70,
            'lat': 60,
            'aromantisch': 55,
            'solopoly': 80,
            'polyamor': 90     // Gleiche Philosophie
        }
    };

    // Dominanz-Kompatibilität
    const DOMINANCE_COMPATIBILITY = {
        'dominant-submissiv': 95,
        'submissiv-dominant': 95,
        'dominant-switch': 80,
        'switch-dominant': 80,
        'submissiv-switch': 80,
        'switch-submissiv': 80,
        'switch-switch': 85,
        'dominant-dominant': 55,
        'submissiv-submissiv': 55,
        'ausgeglichen-ausgeglichen': 90,
        'ausgeglichen-dominant': 75,
        'dominant-ausgeglichen': 75,
        'ausgeglichen-submissiv': 75,
        'submissiv-ausgeglichen': 75,
        'ausgeglichen-switch': 85,
        'switch-ausgeglichen': 85
    };

    // GFK-Kompatibilität (aus Constants.GFK_MATRIX)
    const GFK_COMPATIBILITY = {
        'hoch-hoch': 100,
        'hoch-mittel': 75,
        'mittel-hoch': 75,
        'hoch-niedrig': 45,
        'niedrig-hoch': 45,
        'mittel-mittel': 65,
        'mittel-niedrig': 40,
        'niedrig-mittel': 40,
        'niedrig-niedrig': 25
    };

    /**
     * Berechnet den Pathos-Score (emotionale Resonanz)
     * Basiert auf: Dynamische Qualität, Natürlichkeit, Dominanz-Polarität
     */
    function calculatePathosScore(arch1, arch2, dim1, dim2, archDefs) {
        let score = 0;
        let factors = 0;

        // 1. Dynamische Qualität Resonanz (Pirsig)
        const dynQ1 = archDefs?.[arch1]?.pirsig?.dynamicQuality || 0.5;
        const dynQ2 = archDefs?.[arch2]?.pirsig?.dynamicQuality || 0.5;
        const dynDiff = Math.abs(dynQ1 - dynQ2);

        // Ähnliche dynamische Qualität = hohe Resonanz
        // Aber auch Komplementarität kann positiv sein
        if (dynDiff < 0.2) {
            score += 90; // Sehr ähnlich
        } else if (dynDiff < 0.4) {
            score += 70; // Komplementär
        } else {
            score += 50; // Herausfordernd
        }
        factors++;

        // 2. Natürlichkeit (Osho)
        const nat1 = archDefs?.[arch1]?.osho?.naturalness || 0.5;
        const nat2 = archDefs?.[arch2]?.osho?.naturalness || 0.5;
        const avgNat = (nat1 + nat2) / 2;
        score += avgNat * 100;
        factors++;

        // 3. Dominanz-Polarität
        const dom1 = dim1?.dominanz || 'ausgeglichen';
        const dom2 = dim2?.dominanz || 'ausgeglichen';
        const domKey = `${dom1}-${dom2}`;
        const domScore = DOMINANCE_COMPATIBILITY[domKey] || 70;
        score += domScore;
        factors++;

        return Math.round(score / factors);
    }

    /**
     * Berechnet den Logos-Score (rationale Kompatibilität)
     * Basiert auf: Statische Qualität, Werte-Überlappung, GFK-Kompetenz
     */
    function calculateLogosScore(arch1, arch2, dim1, dim2, archDefs) {
        let score = 0;
        let factors = 0;

        // 1. Basis-Kompatibilität aus Matrix
        const baseCompat = COMPATIBILITY_MATRIX[arch1]?.[arch2] || 50;
        score += baseCompat;
        factors++;

        // 2. Statische Qualität Vergleich (Pirsig)
        const statQ1 = archDefs?.[arch1]?.pirsig?.staticQuality || 0.5;
        const statQ2 = archDefs?.[arch2]?.pirsig?.staticQuality || 0.5;
        const statDiff = Math.abs(statQ1 - statQ2);

        if (statDiff < 0.2) {
            score += 85; // Ähnliches Strukturbedürfnis
        } else if (statDiff < 0.4) {
            score += 65; // Komplementär
        } else {
            score += 45; // Herausfordernd
        }
        factors++;

        // 3. Werte-Überlappung
        const values1 = archDefs?.[arch1]?.coreValues || [];
        const values2 = archDefs?.[arch2]?.coreValues || [];
        const sharedValues = values1.filter(v => values2.includes(v));
        const valueScore = Math.min(100, (sharedValues.length / 3) * 100);
        score += valueScore;
        factors++;

        // 4. Wertekonflikt-Check (coreValues vs. avoids)
        const avoids2 = archDefs?.[arch2]?.avoids || [];
        const conflicts = values1.filter(v => avoids2.includes(v));
        if (conflicts.length > 0) {
            score -= conflicts.length * 15; // Malus für Konflikte
        }

        // 5. GFK-Kompatibilität
        const gfk1 = dim1?.gfk || 'mittel';
        const gfk2 = dim2?.gfk || 'mittel';
        const gfkKey = `${gfk1}-${gfk2}`;
        const gfkScore = GFK_COMPATIBILITY[gfkKey] || 50;
        score += gfkScore;
        factors++;

        return Math.round(score / factors);
    }

    /**
     * Berechnet den Resonanz-Koeffizienten
     */
    function calculateResonance(pathosScore, logosScore, gfk1, gfk2) {
        // Basis-Resonanz
        let R = 0.9;

        // Pathos-Logos-Balance
        const balance = (100 - Math.abs(pathosScore - logosScore)) / 100;
        R += balance * 0.1;

        // GFK-Faktor
        const gfkKey = `${gfk1 || 'mittel'}-${gfk2 || 'mittel'}`;
        const gfkFactor = (GFK_COMPATIBILITY[gfkKey] || 50) / 100;
        R += gfkFactor * 0.1;

        return Math.max(0.9, Math.min(1.1, R));
    }

    /**
     * Berechnet den Gesamt-Score
     */
    function calculateOverallScore(pathosScore, logosScore, resonance) {
        // Gewichtete Kombination
        // Logos: 55%, Pathos: 45% (leichte Bevorzugung rationaler Kompatibilität)
        const baseScore = (logosScore * 0.55) + (pathosScore * 0.45);
        return Math.round(baseScore * resonance);
    }

    /**
     * Berechnet alle Kombinationen für einen gegebenen Archetyp
     * @param {string} baseArchetype - Der Basis-Archetyp
     * @param {Object} baseDimensions - Dimensionen der Person (dominanz, gfk, etc.)
     * @param {Object} archDefs - Archetyp-Definitionen
     * @param {Object} partnerDimensions - Optional: Standard-Dimensionen für Partner
     * @returns {Array} Sortiertes Array aller Kombinationen
     */
    function calculateAllCombinations(baseArchetype, baseDimensions, archDefs, partnerDimensions = null) {
        const defaultPartnerDim = partnerDimensions || {
            dominanz: 'ausgeglichen',
            gfk: 'mittel'
        };

        const combinations = ALL_ARCHETYPES.map(targetArch => {
            const pathosScore = calculatePathosScore(
                baseArchetype, targetArch,
                baseDimensions, defaultPartnerDim,
                archDefs
            );

            const logosScore = calculateLogosScore(
                baseArchetype, targetArch,
                baseDimensions, defaultPartnerDim,
                archDefs
            );

            const resonance = calculateResonance(
                pathosScore, logosScore,
                baseDimensions?.gfk, defaultPartnerDim?.gfk
            );

            const overallScore = calculateOverallScore(pathosScore, logosScore, resonance);

            return {
                archetype: targetArch,
                displayName: ARCHETYPE_DISPLAY_NAMES[targetArch],
                pathosScore,
                logosScore,
                resonance,
                overallScore,
                isSelf: baseArchetype === targetArch
            };
        });

        // Sortiere nach Gesamtscore (höchste zuerst)
        combinations.sort((a, b) => b.overallScore - a.overallScore);

        // Füge Rang hinzu
        combinations.forEach((combo, index) => {
            combo.rank = index + 1;
        });

        return combinations;
    }

    /**
     * Generiert Top 10 mit detaillierten psychologischen Texten
     * @param {string} baseArchetype - Der Basis-Archetyp
     * @param {Object} baseDimensions - Dimensionen der Person
     * @param {Object} archDefs - Archetyp-Definitionen
     * @param {Object} IntegratedGenerator - Referenz zum IntegratedSynthesisTextGenerator
     * @returns {Object} Top 10 mit allen Texten
     */
    function generateTop10WithTexts(baseArchetype, baseDimensions, archDefs, IntegratedGenerator) {
        const allCombinations = calculateAllCombinations(baseArchetype, baseDimensions, archDefs);
        const top10 = allCombinations.slice(0, 10);

        const enrichedTop10 = top10.map(combo => {
            const seed = IntegratedGenerator?.generateHash?.(
                baseArchetype, combo.archetype,
                baseDimensions?.dominanz || 'ausgeglichen',
                'ausgeglichen',
                combo.overallScore
            ) || Math.floor(Math.random() * 10000);

            // Generiere integrierte Synthese
            const synthesis = IntegratedGenerator?.generateIntegratedSynthesis?.({
                ichArch: archDefs?.[baseArchetype],
                partnerArch: archDefs?.[combo.archetype],
                ichName: ARCHETYPE_DISPLAY_NAMES[baseArchetype],
                partnerName: combo.displayName,
                ichDimensions: baseDimensions,
                partnerDimensions: { dominanz: 'ausgeglichen', gfk: 'mittel' },
                pathosScore: combo.pathosScore,
                logosScore: combo.logosScore,
                overallScore: combo.overallScore,
                resonance: combo.resonance,
                seed
            });

            // Generiere innere Konflikte
            const ichInnerConflict = IntegratedGenerator?.generateInnerConflictText?.(baseArchetype, seed);
            const partnerInnerConflict = IntegratedGenerator?.generateInnerConflictText?.(combo.archetype, seed + 7);

            // Identifiziere Paarkonflikte
            const partnerConflicts = IntegratedGenerator?.identifyPartnerConflicts?.(
                baseArchetype, combo.archetype,
                baseDimensions,
                { dominanz: 'ausgeglichen', gfk: 'mittel' }
            );

            return {
                ...combo,
                synthesis,
                innerConflicts: {
                    ich: ichInnerConflict,
                    partner: partnerInnerConflict
                },
                partnerConflicts: partnerConflicts || []
            };
        });

        return {
            baseArchetype,
            baseDisplayName: ARCHETYPE_DISPLAY_NAMES[baseArchetype],
            baseDimensions,
            top10: enrichedTop10,
            allCombinations,
            summary: {
                bestMatch: enrichedTop10[0],
                worstMatch: allCombinations[allCombinations.length - 1],
                averageScore: Math.round(
                    allCombinations.reduce((sum, c) => sum + c.overallScore, 0) / allCombinations.length
                )
            }
        };
    }

    /**
     * Formatiert Top 10 als lesbaren Text
     */
    function formatTop10AsText(top10Data) {
        const lines = [];

        lines.push("╔══════════════════════════════════════════════════════════════════╗");
        lines.push(`║  TOP 10 KOMPATIBILITÄT FÜR: ${top10Data.baseDisplayName.toUpperCase().padEnd(34)}║`);
        lines.push("╠══════════════════════════════════════════════════════════════════╣");

        top10Data.top10.forEach((combo, idx) => {
            const rankStr = `#${combo.rank}`.padEnd(3);
            const nameStr = combo.displayName.padEnd(25);
            const scoreStr = `${combo.overallScore}`.padStart(4);
            const selfMarker = combo.isSelf ? ' (SELBST)' : '';

            lines.push(`║ ${rankStr} ${nameStr} │ Score: ${scoreStr}${selfMarker.padEnd(10)}║`);

            if (combo.synthesis?.opening) {
                const shortOpening = combo.synthesis.opening.substring(0, 60) + '...';
                lines.push(`║     ${shortOpening.padEnd(59)}║`);
            }

            lines.push("║" + "─".repeat(66) + "║");
        });

        lines.push("╠══════════════════════════════════════════════════════════════════╣");
        lines.push(`║  Bester Match: ${top10Data.summary.bestMatch.displayName} (${top10Data.summary.bestMatch.overallScore})`.padEnd(67) + "║");
        lines.push(`║  Durchschnitt: ${top10Data.summary.averageScore}`.padEnd(67) + "║");
        lines.push("╚══════════════════════════════════════════════════════════════════╝");

        return lines.join('\n');
    }

    /**
     * Generiert HTML für Top 10 Darstellung
     */
    function formatTop10AsHTML(top10Data) {
        let html = `
<div class="top10-ranking">
    <h2 class="top10-title">Top 10 Kompatibilität für ${top10Data.baseDisplayName}</h2>
    <div class="top10-list">`;

        top10Data.top10.forEach(combo => {
            const selfClass = combo.isSelf ? ' is-self' : '';
            const tonalityClass = combo.synthesis?.tonality || 'neutral';

            html += `
        <div class="top10-item rank-${combo.rank}${selfClass} tonality-${tonalityClass}">
            <div class="rank-badge">#${combo.rank}</div>
            <div class="combo-info">
                <h3 class="archetype-name">${combo.displayName}</h3>
                <div class="scores">
                    <span class="score-overall" title="Gesamtscore">${combo.overallScore}</span>
                    <span class="score-pathos" title="Pathos (Emotional)">❤️ ${combo.pathosScore}</span>
                    <span class="score-logos" title="Logos (Rational)">🧠 ${combo.logosScore}</span>
                    <span class="score-resonance" title="Resonanz">🔗 ${combo.resonance.toFixed(2)}</span>
                </div>
                <p class="synthesis-opening">${combo.synthesis?.opening || ''}</p>
            </div>
            <div class="conflict-indicators">`;

            // Innere Konflikte Icons
            if (combo.innerConflicts?.ich?.core) {
                html += `<span class="conflict-icon inner" title="Innerer Konflikt: ${combo.innerConflicts.ich.core}">⚡</span>`;
            }

            // Partner Konflikte Icons
            if (combo.partnerConflicts && combo.partnerConflicts.length > 0) {
                const conflictTitles = combo.partnerConflicts.map(c => c.title).join(', ');
                html += `<span class="conflict-icon partner" title="Paarkonflikte: ${conflictTitles}">⚔️</span>`;
            }

            html += `
            </div>
        </div>`;
        });

        html += `
    </div>
    <div class="top10-summary">
        <p><strong>Bester Match:</strong> ${top10Data.summary.bestMatch.displayName} (${top10Data.summary.bestMatch.overallScore})</p>
        <p><strong>Durchschnittliche Kompatibilität:</strong> ${top10Data.summary.averageScore}</p>
    </div>
</div>`;

        return html;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Hauptfunktionen
        calculateAllCombinations,
        generateTop10WithTexts,
        formatTop10AsText,
        formatTop10AsHTML,

        // Einzelberechnungen
        calculatePathosScore,
        calculateLogosScore,
        calculateResonance,
        calculateOverallScore,

        // Konstanten
        ALL_ARCHETYPES,
        ARCHETYPE_DISPLAY_NAMES,
        COMPATIBILITY_MATRIX,
        DOMINANCE_COMPATIBILITY,
        GFK_COMPATIBILITY
    };
})();

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Top10RankingCalculator;
}
