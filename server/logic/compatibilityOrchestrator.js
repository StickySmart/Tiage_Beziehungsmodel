/**
 * TIAGE Server - Compatibility Orchestrator (ES Module)
 *
 * Kombiniert alle Berechnungen zu einem Gesamtergebnis
 * Orchestriert Pathos + Logos + Lifestyle-Filter + Resonanz
 *
 * Für Debugging in der Browser-Konsole verfügbar (ohne UI)
 */

import * as SynthesisCalculator from './synthesisCalculator.js';
import * as LifestyleFilter from './lifestyleFilter.js';
import * as PathosTextGenerator from './pathosTextGenerator.js';
import * as LogosTextGenerator from './logosTextGenerator.js';

// ═══════════════════════════════════════════════════════════════════════════
// HAUPTFUNKTION
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Berechnet Gesamtkompatibilität (Pathos + Logos + Lifestyle)
 *
 * @param {object} ich - Profil "Ich"
 * @param {object} partner - Profil "Partner"
 * @param {object} options - Zusätzliche Optionen
 * @returns {object} Vollständiges Kompatibilitäts-Ergebnis
 */
export function calculate(ich, partner, options = {}) {
    console.log('[CompatibilityOrchestrator] calculate() aufgerufen');

    // ═══════════════════════════════════════════════════════════════════
    // 1. LIFESTYLE-FILTER (K.O.-Kriterien)
    // ═══════════════════════════════════════════════════════════════════

    const lifestyleResult = LifestyleFilter.check(
        ich.lifestyle || {},
        partner.lifestyle || {}
    );

    // Hard-K.O. → Score = 0
    if (lifestyleResult.isHardKO) {
        return {
            gesamtkompatibilitaet: 0,
            isHardKO: true,
            koReasons: lifestyleResult.conflicts,
            pathos: { score: 0, resonanz: 'dissonanz', text: '' },
            logos: { score: 0, dimensionen: {}, text: '' },
            staerken: [],
            spannungsfelder: lifestyleResult.conflicts.map(c => c.message),
            lifestyle: lifestyleResult
        };
    }

    // ═══════════════════════════════════════════════════════════════════
    // 2. SYNTHESE-BERECHNUNG (Q-Formel mit R-Faktoren)
    // ═══════════════════════════════════════════════════════════════════

    const synthesisResult = SynthesisCalculator.calculate(ich, partner, options);

    // ═══════════════════════════════════════════════════════════════════
    // 3. PATHOS-SCORE (Emotionale Dimension)
    // ═══════════════════════════════════════════════════════════════════

    const pathosScore = synthesisResult.pathos?.score || 50;
    const pathosText = PathosTextGenerator.generate({
        ich,
        partner,
        score: synthesisResult.score,
        resonanz: synthesisResult.resonanz
    });

    // ═══════════════════════════════════════════════════════════════════
    // 4. LOGOS-SCORE (Rationale Dimension)
    // ═══════════════════════════════════════════════════════════════════

    const logosScore = synthesisResult.logos?.score || 50;
    const logosText = LogosTextGenerator.generate({
        ich,
        partner,
        score: synthesisResult.score,
        breakdown: synthesisResult.breakdown
    });

    // ═══════════════════════════════════════════════════════════════════
    // 5. STÄRKEN & SPANNUNGSFELDER
    // ═══════════════════════════════════════════════════════════════════

    const staerken = [];
    const spannungsfelder = [];

    // Aus Breakdown analysieren
    const breakdown = synthesisResult.breakdown || {};

    for (const [faktor, data] of Object.entries(breakdown)) {
        const score = data.score || 50;
        if (score >= 75) {
            staerken.push({
                faktor,
                score,
                text: getStrengthText(faktor, score)
            });
        } else if (score <= 40) {
            spannungsfelder.push({
                faktor,
                score,
                text: getTensionText(faktor, score)
            });
        }
    }

    // Lifestyle-Warnungen als Spannungsfelder
    if (lifestyleResult.warnings.length > 0) {
        lifestyleResult.warnings.forEach(w => {
            spannungsfelder.push({
                faktor: 'lifestyle',
                score: 50,
                text: w.message
            });
        });
    }

    // ═══════════════════════════════════════════════════════════════════
    // 6. RESONANZ-STATUS
    // ═══════════════════════════════════════════════════════════════════

    // v3.4: Richtungsbasiert um 1.0 zentriert
    const resonanzCoefficient = synthesisResult.resonanz?.coefficient || 1.0;
    let resonanzStatus;
    if (resonanzCoefficient >= 1.08) resonanzStatus = 'harmonie';
    else if (resonanzCoefficient >= 1.02) resonanzStatus = 'resonanz';
    else if (resonanzCoefficient >= 0.98) resonanzStatus = 'neutral';
    else resonanzStatus = 'dissonanz';

    // ═══════════════════════════════════════════════════════════════════
    // 7. ERGEBNIS ZUSAMMENSTELLEN
    // ═══════════════════════════════════════════════════════════════════

    return {
        gesamtkompatibilitaet: synthesisResult.score,
        baseScore: synthesisResult.baseScore,
        isHardKO: false,
        isSoftKO: synthesisResult.meta?.isSoftKO || false,

        pathos: {
            score: pathosScore,
            contribution: synthesisResult.pathos?.contribution || 0,
            resonanz: resonanzStatus,
            text: pathosText.text || ''
        },

        logos: {
            score: logosScore,
            contribution: synthesisResult.logos?.contribution || 0,
            dimensionen: synthesisResult.breakdown || {},
            text: logosText.text || ''
        },

        resonanz: {
            coefficient: resonanzCoefficient,
            status: resonanzStatus,
            dimensional: synthesisResult.resonanz?.dimensional || {},
            v31: synthesisResult.meta?.v31Resonanz || {}
        },

        beduerfnisse: synthesisResult.beduerfnisse || {},

        staerken,
        spannungsfelder,

        lifestyle: lifestyleResult,

        meta: {
            calculatedAt: new Date().toISOString(),
            version: '3.1',
            formula: 'Q = [(O×wO×r1) + (A×wA×r2) + (D×wD×r3) + (G×wG×r4)]'
        }
    };
}

// ═══════════════════════════════════════════════════════════════════════════
// HILFSFUNKTIONEN
// ═══════════════════════════════════════════════════════════════════════════

function getStrengthText(faktor, score) {
    const texts = {
        archetyp: 'Eure Beziehungsphilosophien harmonieren.',
        orientierung: 'Die sexuelle Orientierung passt gut zusammen.',
        dominanz: 'Die Dominanz-Dynamik ergänzt sich ideal.',
        geschlecht: 'Die Geschlechtsidentitäten sind kompatibel.'
    };
    return texts[faktor] || `${faktor}: Hohe Übereinstimmung`;
}

function getTensionText(faktor, score) {
    const texts = {
        archetyp: 'Unterschiedliche Beziehungsphilosophien erfordern Kommunikation.',
        orientierung: 'Die sexuelle Orientierung könnte Herausforderungen bergen.',
        dominanz: 'Die Dominanz-Dynamik braucht bewusste Gestaltung.',
        geschlecht: 'Unterschiede bei der Geschlechtsidentität beachten.'
    };
    return texts[faktor] || `${faktor}: Hier liegt Entwicklungspotenzial`;
}

/**
 * Schnell-Check: Nur Lifestyle-Filter ohne vollständige Berechnung
 */
export function quickCheck(ich, partner) {
    return LifestyleFilter.check(ich.lifestyle || {}, partner.lifestyle || {});
}

/**
 * Debug-Ausgabe für Browser-Konsole
 */
export function debug(ich, partner, options = {}) {
    const result = calculate(ich, partner, options);

    console.log('═══════════════════════════════════════════════════════════');
    console.log('TIAGE COMPATIBILITY ORCHESTRATOR - DEBUG');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(`Gesamtscore: ${result.gesamtkompatibilitaet}`);
    console.log(`Pathos: ${result.pathos.score} | Logos: ${result.logos.score}`);
    console.log(`Resonanz: ${result.resonanz.coefficient.toFixed(3)} (${result.resonanz.status})`);
    console.log('─────────────────────────────────────────────────────────────');
    console.log('Stärken:', result.staerken.map(s => s.faktor));
    console.log('Spannungsfelder:', result.spannungsfelder.map(s => s.faktor));
    console.log('═══════════════════════════════════════════════════════════');

    return result;
}

// Default export
export default {
    calculate,
    quickCheck,
    debug
};
