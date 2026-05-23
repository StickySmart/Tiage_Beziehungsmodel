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

// 16 Grundbedürfnisse → Osho Zen Tarot Karten (v4.0)
const needsToCards = {
    '#B1':  { karte: 'Going With the Flow', label: 'Wohlbefinden',
              text: 'Der Körper als Tempel – Wohlbefinden entsteht, wenn du im Einklang mit deiner Natur lebst.' },
    '#B2':  { karte: 'Trust',               label: 'Sicherheit',
              text: 'Vertrauen ist die unsichtbare Basis, auf der Sicherheit und Stabilität gedeihen.' },
    '#B3':  { karte: 'Laziness',            label: 'Leichtigkeit',
              text: 'Echte Leichtigkeit kommt nicht aus Vermeidung, sondern aus dem Loslassen von Anstrengung.' },
    '#B4':  { karte: 'Clarity',             label: 'Orientierung',
              text: 'Klarheit ist kein starres System – sie ist ein Licht, das den nächsten Schritt zeigt.' },
    '#B5':  { karte: 'The Creator',         label: 'Wirksamkeit',
              text: 'Schöpferische Kraft entfaltet sich, wenn Handeln aus innerer Fülle kommt.' },
    '#B6':  { karte: 'The Rebel',           label: 'Freiheit',
              text: 'Wahre Freiheit ist nicht Rebellion gegen äußeres – sie ist die Befreiung des inneren Menschen.' },
    '#B7':  { karte: 'Passion',             label: 'Intensität',
              text: 'Leidenschaft ist das Feuer, das Leben bedeutungsvoll macht – lebe sie bewusst.' },
    '#B8':  { karte: 'Transformation',      label: 'Entwicklung',
              text: 'Jede echte Entwicklung erfordert das Sterben des Alten und die Geburt des Neuen.' },
    '#B9':  { karte: 'Harmony',             label: 'Gemeinschaft',
              text: 'Harmonie in der Gemeinschaft entsteht nicht durch Gleichheit, sondern durch gegenseitige Achtung.' },
    '#B10': { karte: 'Appreciation',        label: 'Anerkennung',
              text: 'Wertschätzung ist das Wasser, das den Garten der Beziehung nährt.' },
    '#B11': { karte: 'Courage',             label: 'Gerechtigkeit',
              text: 'Den Mut aufzubringen, für Fairness einzustehen, ist eine Form spiritueller Reife.' },
    '#B12': { karte: 'Intimacy',            label: 'Verbundenheit',
              text: 'Wahre Intimität beginnt dort, wo Masken fallen und das echte Selbst sich zeigt.' },
    '#B13': { karte: 'Awareness',           label: 'Selbsterkenntnis',
              text: 'Selbst-Bewusstsein ist der erste und tiefste Schritt jeder inneren Reise.' },
    '#B14': { karte: 'The Source',          label: 'Sinn',
              text: 'Sinn entsteht, wenn das persönliche Leben den universellen Fluss berührt.' },
    '#B15': { karte: 'Integration',         label: 'Integrität',
              text: 'Integrität ist die Kunst, das zu sein was man ist – vollständig und ohne Maske.' },
    '#B16': { karte: 'The Flowering',       label: 'Selbstentfaltung',
              text: 'Wie eine Blume, die sich zur Sonne dreht: Selbstentfaltung geschieht wenn du aufhörst, dich zu beschränken.' }
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
                label: cardData.label || needId.replace('#', 'Bedürfnis '),
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
    const parts = [
        `Die Karte "${topMatch.karte}" (${topMatch.label}) spricht zu eurer Verbindung: ${topMatch.text}`
    ];

    if (topMatches.length >= 2) {
        const second = topMatches[1];
        parts.push(`Auch "${second.karte}" (${second.label}) zeigt sich: ${second.text}`);
    }

    return parts.join(' ');
}

/**
 * Haupt-Generierungsfunktion
 *
 * Verwendet beduerfnisse.gemeinsam aus dem Synthesis-Result (keine Raw-Needs nötig).
 * Fallback: options.ich.needs + options.partner.needs falls vorhanden.
 */
export function generate(synthesisResult, options = {}) {
    console.log('[OshoZenTextGenerator] generate() aufgerufen');

    const score        = synthesisResult?.score || 50;
    const beduerfnisse = synthesisResult?.beduerfnisse || {};

    // Top-Matches aus gemeinsamen Bedürfnissen ableiten
    let topMatches = [];

    if (options.ich?.needs && options.partner?.needs) {
        // Vollständige Needs übergeben → direkte Berechnung
        topMatches = calculateTopMatches(options.ich.needs, options.partner.needs, options.topN || 5);
    } else {
        // Fallback: gemeinsame Bedürfnisse aus Synthesis-Result verwenden
        const gemeinsam = beduerfnisse.gemeinsam || [];
        topMatches = gemeinsam
            .filter(n => n.key && needsToCards[n.key])
            .slice(0, options.topN || 5)
            .map(n => {
                const card = needsToCards[n.key];
                const avg = ((n.val1 || 50) + (n.val2 || 50)) / 2;
                return {
                    id: n.key,
                    label: card.label,
                    score1: Math.round(n.val1 || 50),
                    score2: Math.round(n.val2 || 50),
                    matchScore: Math.round(avg * (1 - (n.diff || 0) / 100)),
                    karte: card.karte,
                    text: card.text
                };
            });

        // Falls keine gemeinsamen: Top-B-IDs nach Score aus beduerfnisse auswählen
        if (topMatches.length === 0) {
            const allNeedIds = Object.keys(needsToCards);
            topMatches = allNeedIds.slice(0, 3).map(id => {
                const card = needsToCards[id];
                return { id, label: card.label, score1: 50, score2: 50, matchScore: 50, karte: card.karte, text: card.text };
            });
        }
    }

    const spiritualText = generateSpiritualText(topMatches);

    let interpretation;
    if (score >= 70) {
        interpretation = 'Eure Verbindung trägt das Potenzial tiefer Harmonie.';
    } else if (score >= 40) {
        interpretation = 'Die Reise zueinander erfordert Achtsamkeit und Geduld.';
    } else {
        interpretation = 'Große Unterschiede laden zur inneren Arbeit ein.';
    }

    return {
        text: spiritualText + ' ' + interpretation,
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
