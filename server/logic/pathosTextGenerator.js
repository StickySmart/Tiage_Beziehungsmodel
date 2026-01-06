/**
 * TIAGE Server - Pathos Text Generator (ES Module)
 *
 * Migriert von: js/synthesis/pathosTextGenerator.js
 * Emotionale, poetische Textgenerierung für Beziehungs-Synthese
 *
 * Philosophische Grundlage:
 * - PATHOS (Pirsigs "romantische Qualität"): Emotional, poetisch, intuitiv
 * - Das "Herz" nach Osho - Bedürfnisse werden gefühlt, Resonanz als Schwingung
 */

// ═══════════════════════════════════════════════════════════════════════════
// ÜBERGANGSPHRASEN
// ═══════════════════════════════════════════════════════════════════════════

const transitions = {
    additive: ["Dabei", "Zugleich", "Und so", "Zudem", "Darüber hinaus"],
    contrast: ["Gleichzeitig", "Doch auch", "Dennoch", "Andererseits"],
    resulting: ["Damit", "Dadurch", "Folglich", "Letztlich"],
    connecting: ["Wenn diese Energien sich begegnen,", "Im Zusammenspiel dieser Qualitäten"]
};

// ═══════════════════════════════════════════════════════════════════════════
// PHRASEN-BIBLIOTHEK: PERSON
// ═══════════════════════════════════════════════════════════════════════════

const personPhrases = {
    dynamicHigh: [
        "{name} trägt eine lebendige, fließende Energie in sich – offen für das Unerwartete.",
        "In {name} pulsiert eine hohe dynamische Qualität: Veränderung ist Einladung."
    ],
    dynamicMid: [
        "{name} balanciert geschickt zwischen dem Vertrauten und dem Neuen.",
        "In {name} verbinden sich Wurzeln und Flügel."
    ],
    dynamicLow: [
        "{name} findet Tiefe in der Beständigkeit – wie ein alter Baum.",
        "Die Kraft von {name} liegt im Ankern."
    ],
    dominance: {
        dominant: ["{name} bringt eine führende Energie mit – aus natürlicher Präsenz."],
        submissiv: ["{name} trägt die Qualität des Empfangens – tiefe Hingabefähigkeit."],
        switch: ["{name} tanzt zwischen den Polen – mal führend, mal folgend."],
        ausgeglichen: ["{name} ruht in der Mitte – weder drängend noch zurückweichend."]
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// SYNTHESE PHRASEN
// ═══════════════════════════════════════════════════════════════════════════

const synthesePhrases = {
    openings: {
        positiv: [
            "Eine vielversprechende Resonanz entfaltet sich zwischen diesen beiden Seelen.",
            "Hier begegnen sich zwei Menschen, deren Frequenzen sich natürlich verstärken."
        ],
        neutral: [
            "Eine interessante Spannung entfaltet sich zwischen diesen beiden Welten.",
            "Die Dynamik bietet Chancen und Herausforderungen zugleich."
        ],
        negativ: [
            "Hier treffen Welten aufeinander, die unterschiedliche Sprachen sprechen.",
            "Die Frequenzen erfordern bewusste Abstimmungsarbeit."
        ]
    },
    dynamicInteraction: {
        similar: ["Beide schwingen auf einer ähnlichen emotionalen Frequenz."],
        complementary: ["Eure unterschiedlichen Tempi können sich wunderbar ergänzen."],
        challenging: ["Die verschiedenen emotionalen Tempi erfordern Abstimmung."]
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// RESONANZ PHRASEN
// ═══════════════════════════════════════════════════════════════════════════

const resonanzPhrases = {
    harmonie: ["Eure Resonanz schwingt hoch ({r}) – Kopf und Herz sprechen dieselbe Sprache."],
    resonanz: ["Eine gute Schwingung bei R={r} – eure Wellenlängen sind nah genug."],
    neutral: ["Bei R={r} steht die Verbindung auf neutralem Boden."],
    spannung: ["Bei R={r} zeigt sich eine leichte Dissonanz – das fordert Brückenarbeit."],
    dissonanz: ["Bei R={r} stehen die Frequenzen in deutlicher Spannung."]
};

// ═══════════════════════════════════════════════════════════════════════════
// HILFSFUNKTIONEN
// ═══════════════════════════════════════════════════════════════════════════

function selectPhrase(phrases, seed) {
    if (!phrases || phrases.length === 0) return '';
    return phrases[Math.abs(seed) % phrases.length];
}

function fillVariables(phrase, vars) {
    if (!phrase) return '';
    let result = phrase;
    for (const [key, value] of Object.entries(vars)) {
        result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
    }
    return result;
}

function generateHash(arch1, arch2, dom1, dom2, score) {
    const str = `${arch1}_${arch2}_${dom1}_${dom2}_${Math.floor(score / 10)}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash);
}

function getTonality(score) {
    if (score >= 70) return 'positiv';
    if (score >= 40) return 'neutral';
    return 'negativ';
}

// ═══════════════════════════════════════════════════════════════════════════
// HAUPTFUNKTIONEN
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Generiert poetischen Text für eine Person
 */
export function generatePersonText(archetype, dimensions, name, seed) {
    const parts = [];
    const vars = { name };

    // Dynamische Qualität
    if (archetype?.pirsig?.dynamicQuality !== undefined) {
        const dynQual = archetype.pirsig.dynamicQuality;
        let phrases;
        if (dynQual >= 0.7) phrases = personPhrases.dynamicHigh;
        else if (dynQual >= 0.4) phrases = personPhrases.dynamicMid;
        else phrases = personPhrases.dynamicLow;
        parts.push(fillVariables(selectPhrase(phrases, seed), vars));
    }

    // Dominanz
    const dom = typeof dimensions?.dominanz === 'object'
        ? dimensions.dominanz?.primary
        : dimensions?.dominanz;
    if (dom && personPhrases.dominance[dom]) {
        parts.push(fillVariables(selectPhrase(personPhrases.dominance[dom], seed + 5), vars));
    }

    return parts.join(' ');
}

/**
 * Generiert poetischen Synthese-Text
 */
export function generateSyntheseText(config) {
    const { ichArch, partnerArch, ichName, partnerName, overallScore, seed } = config;

    const tonality = getTonality(overallScore);
    const vars = { ich: ichName, partner: partnerName };

    const opening = fillVariables(
        selectPhrase(synthesePhrases.openings[tonality], seed),
        vars
    );

    // Dynamik-Interaktion
    const ichDyn = ichArch?.pirsig?.dynamicQuality || 0.5;
    const partnerDyn = partnerArch?.pirsig?.dynamicQuality || 0.5;
    const dynDiff = Math.abs(ichDyn - partnerDyn);

    let dynPhrases;
    if (dynDiff < 0.2) dynPhrases = synthesePhrases.dynamicInteraction.similar;
    else if (dynDiff > 0.4) dynPhrases = synthesePhrases.dynamicInteraction.challenging;
    else dynPhrases = synthesePhrases.dynamicInteraction.complementary;

    const dynText = selectPhrase(dynPhrases, seed + 13);

    return `${opening} ${dynText}`;
}

/**
 * Generiert Resonanz-Text
 */
export function generateResonanzText(R, seed) {
    if (R === undefined || R === null) return '';

    const rFormatted = R.toFixed(2);
    const vars = { r: rFormatted };

    // v3.2: Angepasst an neue R-Skala (0-1, R = similarity²)
    let phrases;
    if (R >= 0.8) phrases = resonanzPhrases.harmonie;
    else if (R >= 0.6) phrases = resonanzPhrases.resonanz;
    else if (R >= 0.4) phrases = resonanzPhrases.neutral;
    else if (R >= 0.25) phrases = resonanzPhrases.spannung;
    else phrases = resonanzPhrases.dissonanz;

    return fillVariables(selectPhrase(phrases, seed), vars);
}

/**
 * Haupt-Generierungsfunktion
 */
export function generate(synthesisResult, options = {}) {
    console.log('[PathosTextGenerator] generate() aufgerufen');

    const seed = generateHash(
        synthesisResult?.ich?.archetyp || 'duo',
        synthesisResult?.partner?.archetyp || 'duo',
        synthesisResult?.ich?.dominanz || 'ausgeglichen',
        synthesisResult?.partner?.dominanz || 'ausgeglichen',
        synthesisResult?.score || 50
    );

    const tonality = getTonality(synthesisResult?.score || 50);

    const opening = fillVariables(
        selectPhrase(synthesePhrases.openings[tonality], seed),
        { ich: 'Ich', partner: 'Partner' }
    );

    const resonanzText = generateResonanzText(
        synthesisResult?.resonanz?.coefficient,
        seed
    );

    return {
        text: opening + (resonanzText ? ' ' + resonanzText : ''),
        tonality,
        opening,
        resonanz: resonanzText
    };
}

// Default export
export default {
    generate,
    generatePersonText,
    generateSyntheseText,
    generateResonanzText,
    generateHash,
    phrases: { person: personPhrases, synthese: synthesePhrases, resonanz: resonanzPhrases }
};
