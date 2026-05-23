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

    // v3.4: Schwellenwerte um 1.0 zentriert (R > 1.0 = verstärkt)
    let phrases;
    if (R >= 1.08) phrases = resonanzPhrases.harmonie;
    else if (R >= 1.02) phrases = resonanzPhrases.resonanz;
    else if (R >= 0.98) phrases = resonanzPhrases.neutral;
    else if (R >= 0.93) phrases = resonanzPhrases.spannung;
    else phrases = resonanzPhrases.dissonanz;

    return fillVariables(selectPhrase(phrases, seed), vars);
}

// Phrases für dimensionale R-Faktoren
const dimensionPhrases = {
    resonanz: {
        leben:       ["Auf der Ebene von Körper und Intimität schwingt etwas Lebendiges zwischen euch.",
                      "Die körperliche Resonanz ist spürbar – Nähe fühlt sich natürlich an."],
        philosophie: ["Eure Lebensphilosophien berühren sich in etwas Wesentlichem.",
                      "Das, wofür ihr lebt und wie ihr Beziehung denkt – da treffen sich eure Seelen."],
        dynamik:     ["Die Machtdynamik fließt – Führen und Folgen ergänzen sich.",
                      "In eurer Energie gibt es einen natürlichen Rhythmus."],
        identitaet:  ["Wer ihr seid, wie ihr euch zeigt – das wird gesehen und gespiegelt.",
                      "In der Identitäts-Dimension erkennt ihr euch gegenseitig."]
    },
    dissonanz: {
        leben:       ["Körperliche Nähe und Intimität wollen achtsam verhandelt werden.",
                      "In der Sinnlichkeit zeigen sich unterschiedliche Bedürfnisse."],
        philosophie: ["Eure Lebensentwürfe ziehen in unterschiedliche Richtungen.",
                      "Was ihr von Beziehung erwartet, klingt unterschiedlich."],
        dynamik:     ["Die Energie zwischen Führen und Folgen braucht bewusste Abstimmung.",
                      "Wo Macht und Freiheit aufeinandertreffen, gibt es Reibung."],
        identitaet:  ["Wer ihr seid, wie ihr euch zeigt – das braucht Raum, gesehen zu werden.",
                      "Die Identitäts-Ebene lädt zur tieferen Begegnung ein."]
    }
};

const needLabels = {
    '#B1': 'Wohlbefinden', '#B2': 'Sicherheit', '#B3': 'Leichtigkeit', '#B4': 'Orientierung',
    '#B5': 'Wirksamkeit', '#B6': 'Freiheit', '#B7': 'Intensität', '#B8': 'Entwicklung',
    '#B9': 'Gemeinschaft', '#B10': 'Anerkennung', '#B11': 'Gerechtigkeit', '#B12': 'Verbundenheit',
    '#B13': 'Selbsterkenntnis', '#B14': 'Sinn', '#B15': 'Integrität', '#B16': 'Selbstentfaltung'
};

/**
 * Haupt-Generierungsfunktion
 */
export function generate(synthesisResult, options = {}) {
    console.log('[PathosTextGenerator] generate() aufgerufen');

    const score        = synthesisResult?.score || 50;
    const resonanz     = synthesisResult?.resonanz || {};
    const dimensional  = resonanz.dimensional || {};
    const beduerfnisse = synthesisResult?.beduerfnisse || {};
    const v31          = synthesisResult?.meta?.v31Resonanz || {};
    const arch1        = v31.person1?.archetyp || synthesisResult?.ich?.archetyp || 'duo';
    const arch2        = v31.person2?.archetyp || synthesisResult?.partner?.archetyp || 'duo';

    const seed     = generateHash(arch1, arch2, 'ausgeglichen', 'ausgeglichen', score);
    const tonality = getTonality(score);

    const parts = [];

    // 1. Eröffnung
    parts.push(selectPhrase(synthesePhrases.openings[tonality], seed));

    // 2. Dimensionale Resonanz — R-Faktoren
    const dimOrder = ['leben', 'philosophie', 'dynamik', 'identitaet'];
    for (let i = 0; i < dimOrder.length; i++) {
        const dim = dimOrder[i];
        const dimData = dimensional[dim];
        if (!dimData) continue;
        const status = dimData.status; // 'resonanz' | 'neutral' | 'dissonanz'
        if (status === 'neutral') continue;
        const dimPhraseSet = dimensionPhrases[status]?.[dim];
        if (dimPhraseSet) {
            parts.push(selectPhrase(dimPhraseSet, seed + i + 7));
        }
    }

    // 3. Geteilte Bedürfnisse
    const gemeinsam = (beduerfnisse.gemeinsam || []).slice(0, 3);
    if (gemeinsam.length > 0) {
        const labels = gemeinsam.map(n => needLabels[n.key] || n.key).join(', ');
        parts.push(`Was euch beide nährt: ${labels}.`);
    }

    // 4. Spannungsfelder
    const unterschiedlich = (beduerfnisse.unterschiedlich || []).slice(0, 2);
    if (unterschiedlich.length > 0) {
        const labels = unterschiedlich.map(n => needLabels[n.key] || n.key).join(' und ');
        if (score >= 60) {
            parts.push(`Bewusst zu verhandeln: ${labels} – hier liegt Wachstumspotenzial.`);
        } else {
            parts.push(`Die größten Unterschiede zeigen sich bei ${labels}.`);
        }
    }

    // 5. Resonanz-Text
    const resonanzText = generateResonanzText(resonanz.coefficient, seed);

    const text = parts.join(' ') + (resonanzText ? ' ' + resonanzText : '');

    return {
        text,
        tonality,
        opening: parts[0] || '',
        resonanz: resonanzText,
        paragraphs: parts,
        meta: {
            score,
            dimensionsAnalyzed: dimOrder.filter(d => dimensional[d]).length,
            gemeinsamCount: gemeinsam.length,
            unterschiedlichCount: unterschiedlich.length
        }
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
