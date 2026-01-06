/**
 * TIAGE Server - Logos Text Generator (ES Module)
 *
 * Migriert von: js/synthesis/logosTextGenerator.js
 * Analytische, strukturierte Textgenerierung für Beziehungs-Synthese
 *
 * Philosophische Grundlage:
 * - LOGOS (Pirsigs "klassische Qualität"): Analytisch, strukturiert, rational
 * - Der "Kopf" nach Osho - GFK-Kompetenz wird gemessen, Werte kategorisiert
 */

// ═══════════════════════════════════════════════════════════════════════════
// ÜBERGANGSPHRASEN
// ═══════════════════════════════════════════════════════════════════════════

const transitions = {
    additive: ["Darüber hinaus", "Ergänzend dazu", "Zudem", "Ferner"],
    causal: ["Somit", "Daher", "Entsprechend", "Folglich"],
    contrast: ["Andererseits", "Dennoch", "Gleichwohl", "Allerdings"],
    structuring: ["Strukturell betrachtet", "Insgesamt", "Grundsätzlich"]
};

// ═══════════════════════════════════════════════════════════════════════════
// PHRASEN-BIBLIOTHEK: PERSON
// ═══════════════════════════════════════════════════════════════════════════

const personPhrases = {
    staticHigh: [
        "{name} operiert mit klaren Strukturen – Verlässlichkeit bildet das Fundament.",
        "Die Beziehungsphilosophie von {name} basiert auf etablierten Mustern."
    ],
    staticMid: [
        "{name} balanciert zwischen Strukturbedürfnis und Anpassungsfähigkeit.",
        "Pragmatismus prägt den Ansatz: Struktur wo nötig, Offenheit wo möglich."
    ],
    staticLow: [
        "{name} bevorzugt adaptive Strukturen gegenüber fixen Regelwerken.",
        "Flexibilität ist für {name} Grundprinzip."
    ],
    coreValuesIntro: [
        "Zentrale Werte sind {values} – diese bilden den Kompass.",
        "Die Kernwerte {values} definieren, was {name} priorisiert."
    ],
    dominance: {
        dominant: ["{name} übernimmt strukturell die führende Rolle."],
        submissiv: ["{name} präferiert eine empfangende Position."],
        switch: ["{name} wechselt flexibel zwischen führender und folgender Rolle."],
        ausgeglichen: ["{name} strebt nach symmetrischer Rollenverteilung."]
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// SYNTHESE PHRASEN
// ═══════════════════════════════════════════════════════════════════════════

const synthesePhrases = {
    openings: {
        positiv: [
            "Die strukturelle Kompatibilität bildet eine tragfähige Basis.",
            "Die Analyse zeigt hohe Übereinstimmung in den Grundparametern."
        ],
        neutral: [
            "Die strukturelle Analyse zeigt sowohl Potenziale als auch Herausforderungen.",
            "Die Kompatibilität erfordert bewusste Arbeit an den Unterschieden."
        ],
        negativ: [
            "Die strukturelle Analyse zeigt fundamentale Unterschiede.",
            "Die Kompatibilität erfordert erhebliche Anpassungsleistung."
        ]
    },
    staticInteraction: {
        similar: ["Beide teilen ein ähnliches Strukturbedürfnis."],
        complementary: ["Die unterschiedlichen Strukturbedürfnisse können sich ausbalancieren."],
        challenging: ["Die verschiedenen Vorstellungen erfordern explizite Kommunikation."]
    },
    valueAnalysis: {
        shared: ["Geteilte Werte wie {values} bilden ein stabiles Fundament."],
        conflict: ["Potenzieller Wertekonflikt bei '{value1}'."]
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// RESONANZ PHRASEN
// ═══════════════════════════════════════════════════════════════════════════

const resonanzPhrases = {
    harmonie: ["Resonanz-Koeffizient R={r}: Hohe Übereinstimmung zwischen rationaler und emotionaler Ebene."],
    resonanz: ["Resonanz-Koeffizient R={r}: Gute Abstimmung der Parameter."],
    neutral: ["Resonanz-Koeffizient R={r}: Neutraler Bereich – weder starke Anziehung noch Abstoßung."],
    spannung: ["Resonanz-Koeffizient R={r}: Leichte Diskrepanz zwischen rationaler und emotionaler Bewertung."],
    dissonanz: ["Resonanz-Koeffizient R={r}: Deutliche Diskrepanz zwischen den Parametern."]
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
    const str = `logos_${arch1}_${arch2}_${dom1}_${dom2}_${Math.floor(score / 10)}`;
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
 * Generiert analytischen Text für eine Person
 */
export function generatePersonText(archetype, dimensions, name, seed) {
    const parts = [];
    const vars = { name };

    // Statische Qualität
    if (archetype?.pirsig?.staticQuality !== undefined) {
        const statQual = archetype.pirsig.staticQuality;
        let phrases;
        if (statQual >= 0.7) phrases = personPhrases.staticHigh;
        else if (statQual >= 0.4) phrases = personPhrases.staticMid;
        else phrases = personPhrases.staticLow;
        parts.push(fillVariables(selectPhrase(phrases, seed), vars));
    }

    // Kernwerte
    if (archetype?.coreValues?.length >= 2) {
        const values = archetype.coreValues.slice(0, 3).join(', ');
        vars.values = values;
        parts.push(fillVariables(selectPhrase(personPhrases.coreValuesIntro, seed + 3), vars));
    }

    // Dominanz
    const dom = typeof dimensions?.dominanz === 'object'
        ? dimensions.dominanz?.primary
        : dimensions?.dominanz;
    if (dom && personPhrases.dominance[dom]) {
        parts.push(fillVariables(selectPhrase(personPhrases.dominance[dom], seed + 7), vars));
    }

    return parts.join(' ');
}

/**
 * Generiert analytischen Synthese-Text
 */
export function generateSyntheseText(config) {
    const { ichArch, partnerArch, ichName, partnerName, overallScore, seed } = config;

    const tonality = getTonality(overallScore);
    const vars = { ich: ichName, partner: partnerName };

    const opening = fillVariables(
        selectPhrase(synthesePhrases.openings[tonality], seed),
        vars
    );

    // Statische Qualitäts-Interaktion
    const ichStat = ichArch?.pirsig?.staticQuality || 0.5;
    const partnerStat = partnerArch?.pirsig?.staticQuality || 0.5;
    const statDiff = Math.abs(ichStat - partnerStat);

    let statPhrases;
    if (statDiff < 0.2) statPhrases = synthesePhrases.staticInteraction.similar;
    else if (statDiff > 0.4) statPhrases = synthesePhrases.staticInteraction.challenging;
    else statPhrases = synthesePhrases.staticInteraction.complementary;

    const statText = selectPhrase(statPhrases, seed + 13);

    // Werte-Analyse
    let valueText = '';
    if (ichArch?.coreValues && partnerArch?.coreValues) {
        const shared = ichArch.coreValues.filter(v => partnerArch.coreValues.includes(v));
        if (shared.length > 0) {
            vars.values = shared.slice(0, 2).join(' und ');
            valueText = ' ' + fillVariables(selectPhrase(synthesePhrases.valueAnalysis.shared, seed + 17), vars);
        }
    }

    return `${opening} ${statText}${valueText}`;
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

/**
 * Haupt-Generierungsfunktion
 */
export function generate(synthesisResult, options = {}) {
    console.log('[LogosTextGenerator] generate() aufgerufen');

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

    // Analyse-Daten
    const analysis = {
        tonality,
        breakdown: synthesisResult?.breakdown || {},
        resonanz: synthesisResult?.resonanz || {}
    };

    return {
        text: opening + (resonanzText ? ' ' + resonanzText : ''),
        analysis,
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
