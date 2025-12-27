/**
 * TIAGE Server - OshoZen Text Generator (ES Module)
 *
 * Migriert von: js/synthesis/oshoZenTextGenerator.js
 * Generiert Texte basierend auf Osho Zen Tarot Karten
 *
 * Philosophische Grundlage:
 * - Osho Zen Tarot: Bewusstsein, Konditionierung, Flow, Meditation
 * - GFK (Rosenberg): Universelle menschliche Bedürfnisse
 */

// ═══════════════════════════════════════════════════════════════════════════
// DATEN (werden normalerweise aus JSON geladen)
// ═══════════════════════════════════════════════════════════════════════════

// Vereinfachte Bedürfnis-Karten-Mapping
const needsToCards = {
    '#B1': { karte: 'The Fool', text: 'Der Narr symbolisiert den Anfang, Unschuld und Vertrauen ins Unbekannte.' },
    '#B2': { karte: 'Awareness', text: 'Bewusstsein ist der erste Schritt zur Transformation.' },
    '#B3': { karte: 'Courage', text: 'Mut bedeutet, dem Herzen zu folgen trotz Angst.' },
    '#B4': { karte: 'Trust', text: 'Vertrauen ist die Basis jeder tiefen Verbindung.' },
    '#B5': { karte: 'Sharing', text: 'Teilen vermehrt, was geteilt wird.' }
};

// ═══════════════════════════════════════════════════════════════════════════
// BERECHNUNG
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Berechnet die Top N Bedürfnisse mit der besten Übereinstimmung
 */
export function calculateTopMatches(needs1, needs2, topN = 5) {
    if (!needs1 || !needs2) return [];

    const matches = [];

    for (const needId in needs1) {
        if (!needs2[needId]) continue;

        const score1 = parseFloat(needs1[needId]) || 0;
        const score2 = parseFloat(needs2[needId]) || 0;

        // Nur Bedürfnisse berücksichtigen, die beiden wichtig sind (> 30)
        if (score1 > 30 && score2 > 30) {
            const average = (score1 + score2) / 2;
            const difference = Math.abs(score1 - score2);
            const similarity = 1 - (difference / 100);
            const matchScore = average * similarity;

            const cardData = needsToCards[needId] || {
                karte: 'Unknown',
                text: 'Dieses Bedürfnis verbindet euch.'
            };

            matches.push({
                id: needId,
                label: needId.replace('#', 'Bedürfnis '),
                score1: Math.round(score1),
                score2: Math.round(score2),
                matchScore: Math.round(matchScore),
                karte: cardData.karte,
                text: cardData.text
            });
        }
    }

    matches.sort((a, b) => b.matchScore - a.matchScore);
    return matches.slice(0, topN);
}

/**
 * Generiert spirituellen Text basierend auf den Top-Matches
 */
export function generateSpiritualText(topMatches) {
    if (!topMatches || topMatches.length === 0) {
        return 'Eure Bedürfnisse warten darauf, entdeckt zu werden.';
    }

    const topMatch = topMatches[0];
    const card = topMatch.karte;
    const text = topMatch.text;

    return `Die Karte "${card}" spricht zu euren gemeinsamen Bedürfnissen: ${text}`;
}

/**
 * Haupt-Generierungsfunktion
 */
export function generate(synthesisResult, options = {}) {
    console.log('[OshoZenTextGenerator] generate() aufgerufen');

    const needs1 = synthesisResult?.ich?.needs || {};
    const needs2 = synthesisResult?.partner?.needs || {};

    const topMatches = calculateTopMatches(needs1, needs2, options.topN || 5);
    const spiritualText = generateSpiritualText(topMatches);

    // Generiere Interpretation basierend auf Score
    const score = synthesisResult?.score || 50;
    let interpretation;

    if (score >= 70) {
        interpretation = 'Eure Verbindung trägt das Potenzial tiefer Harmonie.';
    } else if (score >= 40) {
        interpretation = 'Die Reise zueinander erfordert Achtsamkeit und Geduld.';
    } else {
        interpretation = 'Große Unterschiede laden zur inneren Arbeit ein.';
    }

    return {
        text: spiritualText,
        card: topMatches[0]?.karte || null,
        interpretation,
        topMatches,
        meta: {
            topN: topMatches.length,
            hasData: topMatches.length > 0
        }
    };
}

// ═══════════════════════════════════════════════════════════════════════════
// HILFSFUNKTIONEN
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Extrahiert den ersten Satz aus einem Text
 */
export function extractFirstSentence(text) {
    if (!text) return { firstSentence: '', rest: '' };
    const match = text.match(/^([^.!?]+[.!?])\s*(.*)/s);
    if (match) {
        return { firstSentence: match[1].trim(), rest: match[2].trim() };
    }
    return { firstSentence: text, rest: '' };
}

// Default export
export default {
    generate,
    calculateTopMatches,
    generateSpiritualText,
    extractFirstSentence,
    needsToCards
};
