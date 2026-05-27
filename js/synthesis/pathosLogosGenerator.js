/**
 * pathosLogosGenerator.js — Pathos & Logos Text Generation System
 * Extracted from app-main.js v1.8.1024
 *
 * System A+B+C:
 *   A) Score → Tonality (positiv/neutral/kritisch)
 *   B) Hash from 4 factors → deterministic variation
 *   C) 6 categories + templates → synthesis
 *
 * Dependencies (via window.*):
 *   window.getIchArchetype()             – current ICH archetype key
 *   window.getPartnerArchetype()         – current PARTNER archetype key
 *   window.personDimensions              – dimensions proxy (TiageState)
 *   window.tiageData                     – loaded JSON data
 *   window.calculateRelationshipQuality  – from calculationEngine.js
 *   window.TiageStatementHelpers         – from statementHelpers.js
 *   window.dominanceStatements           – global data (legacy)
 *   window.orientierungStatements        – global data (legacy)
 *   window.statusStatements              – global data (legacy)
 *   PathosTextGenerator                  – global (optional)
 *   LogosTextGenerator                   – global (optional)
 */
(function() {
    'use strict';

// ═══════════════════════════════════════════════════════════════════════
// KOMBINIERTES SYNTHESE-SYSTEM (A+B+C)
// A) Score → Tonalität (positiv/neutral/kritisch)
// B) Hash aus 4 Faktoren → deterministische Variation
// C) 6 Kategorien + Templates → Zusammenführung
// ═══════════════════════════════════════════════════════════════════════

function getLang() {
    if (typeof TiageI18n !== 'undefined' && TiageI18n.getLanguage) {
        return TiageI18n.getLanguage();
    }
    return 'de';
}

function getLocalizedPhrases(phrases) {
    if (Array.isArray(phrases)) return phrases;
    const lang = getLang();
    return phrases[lang] || phrases.de || [];
}

function getLocalizedText(textObj) {
    if (typeof textObj === 'string') return textObj;
    const lang = getLang();
    return textObj[lang] || textObj.de || '';
}

/**
 * Berechnet einen deterministischen Hash aus den 4 Faktoren
 * Gibt einen Index zurück, der für Statement-Auswahl verwendet wird
 */
function getFactorHash(archetypScore, dominanzScore, orientierungScore, geschlechtScore) {
    // Einfacher aber deterministischer Hash basierend auf allen 4 Faktoren
    const combined = (archetypScore * 1000000) + (dominanzScore * 10000) + (orientierungScore * 100) + geschlechtScore;
    // Verwende Modulo um einen Index zu bekommen
    return combined;
}

/**
 * Wählt ein Statement deterministisch aus einem Array basierend auf Hash
 */
function selectStatementByHash(statements, hash) {
    if (!statements || statements.length === 0) return null;
    const index = hash % statements.length;
    return statements[index];
}

/**
 * Bestimmt die Tonalität basierend auf dem Gesamtscore
 * @returns 'positiv' | 'neutral' | 'kritisch'
 */
function getTonality(score) {
    if (score >= 70) return 'positiv';
    if (score >= 50) return 'neutral';
    return 'kritisch';
}

/**
 * Tonalitäts-Templates für die Synthese-Einleitungen
 */
const tonalityTemplates = {
    positiv: {
        pathos: {
            de: [
                "Eine vielversprechende Resonanz entsteht zwischen euch.",
                "Die emotionale Chemie deutet auf tiefes Potenzial hin.",
                "Eure Energien harmonieren auf einer fundamentalen Ebene."
            ],
            en: [
                "A promising resonance arises between you.",
                "The emotional chemistry points to deep potential.",
                "Your energies harmonize on a fundamental level."
            ]
        },
        logos: {
            de: [
                "Die strukturelle Kompatibilität bildet eine solide Basis.",
                "Eure Beziehungsphilosophien ergänzen sich konstruktiv.",
                "Das rationale Fundament ermöglicht fruchtbare Kommunikation."
            ],
            en: [
                "The structural compatibility forms a solid foundation.",
                "Your relationship philosophies complement each other constructively.",
                "The rational foundation enables productive communication."
            ]
        }
    },
    neutral: {
        pathos: {
            de: [
                "Eine interessante Dynamik entfaltet sich zwischen euch.",
                "Die emotionale Landschaft bietet sowohl Chancen als auch Herausforderungen.",
                "Eure Energien begegnen sich – was daraus wird, liegt in euren Händen."
            ],
            en: [
                "An interesting dynamic unfolds between you.",
                "The emotional landscape offers both opportunities and challenges.",
                "Your energies meet – what becomes of them lies in your hands."
            ]
        },
        logos: {
            de: [
                "Die strukturellen Unterschiede erfordern bewusste Navigation.",
                "Eure Beziehungsvorstellungen haben Überschneidungen, aber auch Differenzen.",
                "Dialog und Klärung werden wichtig sein für das gegenseitige Verständnis."
            ],
            en: [
                "The structural differences require conscious navigation.",
                "Your relationship ideas have overlaps, but also differences.",
                "Dialogue and clarification will be important for mutual understanding."
            ]
        }
    },
    kritisch: {
        pathos: {
            de: [
                "Die emotionalen Welten prallen aufeinander.",
                "Spannungen auf der Gefühlsebene sind zu erwarten.",
                "Die unterschiedlichen emotionalen Bedürfnisse erfordern besondere Achtsamkeit."
            ],
            en: [
                "The emotional worlds collide.",
                "Tensions at the emotional level are to be expected.",
                "The different emotional needs require special mindfulness."
            ]
        },
        logos: {
            de: [
                "Fundamentale Unterschiede in den Beziehungsvorstellungen werden sichtbar.",
                "Die strukturellen Differenzen stellen eine erhebliche Herausforderung dar.",
                "Grundlegende Gespräche über Erwartungen sind unerlässlich."
            ],
            en: [
                "Fundamental differences in relationship expectations become visible.",
                "The structural differences present a considerable challenge.",
                "Fundamental conversations about expectations are essential."
            ]
        }
    }
};

/**
 * Kategorie-spezifische Synthese-Bausteine für die 6 Bereiche
 */
const categorySynthesisTemplates = {
    A: {
        name: { de: "Beziehungsphilosophie", en: "Relationship Philosophy" },
        positiv: { de: "Eure Grundhaltungen zu Beziehungen harmonieren.", en: "Your fundamental attitudes toward relationships harmonize." },
        neutral: { de: "Eure Beziehungsphilosophien haben gemeinsame Punkte, aber auch Unterschiede.", en: "Your relationship philosophies have common points, but also differences." },
        kritisch: { de: "Fundamentale Differenzen in der Beziehungsphilosophie erfordern Klärung.", en: "Fundamental differences in relationship philosophy require clarification." }
    },
    B: {
        name: { de: "Werte-Alignment", en: "Value Alignment" },
        positiv: { de: "Geteilte Werte bilden ein stabiles Fundament.", en: "Shared values form a stable foundation." },
        neutral: { de: "Manche Werte teilt ihr, andere unterscheiden sich.", en: "Some values you share, others differ." },
        kritisch: { de: "Unterschiedliche Wertevorstellungen können zu Konflikten führen.", en: "Different value expectations can lead to conflicts." }
    },
    C: {
        name: { de: "Nähe-Distanz", en: "Closeness-Distance" },
        positiv: { de: "Eure Bedürfnisse nach Nähe und Raum passen gut zusammen.", en: "Your needs for closeness and space fit well together." },
        neutral: { de: "Die Balance zwischen Nähe und Distanz wird Kommunikation erfordern.", en: "The balance between closeness and distance will require communication." },
        kritisch: { de: "Unterschiedliche Nähe-Distanz-Bedürfnisse können Spannung erzeugen.", en: "Different closeness-distance needs can create tension." }
    },
    D: {
        name: { de: "Autonomie", en: "Autonomy" },
        positiv: { de: "Ihr respektiert gegenseitig eure Unabhängigkeit.", en: "You mutually respect each other's independence." },
        neutral: { de: "Das Autonomie-Verständnis bedarf weiterer Abstimmung.", en: "The understanding of autonomy requires further coordination." },
        kritisch: { de: "Konfliktpotenzial bei unterschiedlichen Autonomie-Erwartungen.", en: "Conflict potential with differing autonomy expectations." }
    },
    E: {
        name: { de: "Kommunikation", en: "Communication" },
        positiv: { de: "Die Basis für fruchtbaren Dialog ist gegeben.", en: "The foundation for productive dialogue is present." },
        neutral: { de: "Kommunikationsstile unterscheiden sich – Anpassung möglich.", en: "Communication styles differ – adaptation is possible." },
        kritisch: { de: "Unterschiedliche Kommunikationsweisen können Missverständnisse erzeugen.", en: "Different communication styles can generate misunderstandings." }
    },
    F: {
        name: { de: "Soziale Kompatibilität", en: "Social Compatibility" },
        positiv: { de: "Soziale Vorstellungen und Umfelder harmonieren.", en: "Social ideas and environments harmonize." },
        neutral: { de: "Soziale Kompatibilität ist teilweise gegeben.", en: "Social compatibility is partially present." },
        kritisch: { de: "Unterschiedliche soziale Erwartungen können belasten.", en: "Different social expectations can create strain." }
    }
};

/**
 * Generiert detaillierte Pathos-Inhalte mit ICH/Partner/Synthese Struktur
 * Nutzt PathosTextGenerator für fließende, poetische Texte
 * @returns {Object} { ich, partner, synthese, resonanz }
 */
function generateDetailedPathos(ichArch, partnerArch) {
    const ichName = ichArch?.name || 'ICH';
    const partnerName = partnerArch?.name || 'Partner';
    const ichId = ichArch?.id || window.getIchArchetype() || '';
    const partnerId = partnerArch?.id || window.getPartnerArchetype() || '';

    // Berechne die 4 Faktor-Scores
    const person1 = {
        archetyp: ichId,
        dominanz: window.personDimensions.ich?.dominanz,
        orientierung: window.personDimensions.ich?.orientierung,
        geschlecht: window.personDimensions.ich?.geschlecht,
        orientierungStatus: window.personDimensions.ich?.orientierungStatus
    };
    const person2 = {
        archetyp: partnerId,
        dominanz: window.personDimensions.partner?.dominanz,
        orientierung: window.personDimensions.partner?.orientierung,
        geschlecht: window.personDimensions.partner?.geschlecht,
        orientierungStatus: window.personDimensions.partner?.orientierungStatus
    };

    // Hole Score-Breakdown
    const qualityResult = window.calculateRelationshipQuality(person1, person2);
    const breakdown = qualityResult.breakdown || { archetyp: 50, dominanz: 75, orientierung: 100, geschlecht: 100 };
    const overallScore = qualityResult.score || 50;
    const resonanzData = qualityResult.resonanz;
    const tonality = getTonality(overallScore);

    // Hole Statement-Quellen
    const archStatements = window.TiageStatementHelpers.getArchetypeStatements(ichId, partnerId);
    const domStatements = window.TiageStatementHelpers.getDominanceStatements(person1.dominanz, person2.dominanz);
    const orientStatements = window.TiageStatementHelpers.getOrientierungStatements(person1.orientierung, person2.orientierung, person1.geschlecht, person2.geschlecht);

    // ═══════════════════════════════════════════════════════════════
    // NUTZE PATHOS TEXT GENERATOR (wenn verfügbar)
    // ═══════════════════════════════════════════════════════════════
    if (typeof PathosTextGenerator !== 'undefined') {
        // Extrahiere primitive Werte für Hash (dominanz kann Objekt sein)
        const dom1 = typeof person1.dominanz === 'object' ? (person1.dominanz?.primary || 'none') : (person1.dominanz || 'none');
        const dom2 = typeof person2.dominanz === 'object' ? (person2.dominanz?.primary || 'none') : (person2.dominanz || 'none');

        // Generiere deterministischen Hash für Varianz
        const seed = PathosTextGenerator.generateHash(
            ichId, partnerId,
            dom1,
            dom2,
            overallScore
        );

        // ICH BRINGT MIT - Poetischer Fließtext
        const ichText = PathosTextGenerator.generatePersonText(
            ichArch,
            window.personDimensions.ich,
            ichName,
            seed
        );

        // PARTNER BRINGT MIT - Poetischer Fließtext
        const partnerText = PathosTextGenerator.generatePersonText(
            partnerArch,
            window.personDimensions.partner,
            partnerName,
            seed + 100
        );

        // DARAUS ENTSTEHT - Poetische Synthese
        const syntheseText = PathosTextGenerator.generateSyntheseText({
            ichArch,
            partnerArch,
            ichName,
            partnerName,
            ichDimensions: window.personDimensions.ich,
            partnerDimensions: window.personDimensions.partner,
            overallScore,
            archStatements,
            domStatements,
            orientStatements,
            seed
        });

        // RESONANZ - Poetische Interpretation
        let resonanzText = null;
        if (resonanzData && resonanzData.R !== undefined) {
            resonanzText = PathosTextGenerator.generateResonanzText(
                resonanzData.R,
                seed + 200
            );
        }

        return {
            ich: ichText,
            partner: partnerText,
            synthese: syntheseText,
            resonanz: resonanzText,
            score: overallScore,
            tonality: tonality
        };
    }

    // ═══════════════════════════════════════════════════════════════
    // FALLBACK: Original-Logik (wenn PathosTextGenerator nicht geladen)
    // ═══════════════════════════════════════════════════════════════
    const hash = getFactorHash(breakdown.archetyp, breakdown.dominanz, breakdown.orientierung, breakdown.geschlecht);
    const lang = getLang();
    const isEN = lang === 'en';

    // ICH BRINGT MIT
    const ichParts = [];
    if (ichArch?.pirsig?.dynamicQuality !== undefined) {
        const dynQual = ichArch.pirsig.dynamicQuality;
        if (dynQual >= 0.7) {
            ichParts.push(isEN
                ? `${ichName} brings a high dynamic energy – open to change and spontaneous connection.`
                : `${ichName} bringt eine hohe dynamische Energie mit – offen für Veränderung und spontane Verbindung.`);
        } else if (dynQual >= 0.4) {
            ichParts.push(isEN
                ? `${ichName} balances between stability and flexibility in the emotional world.`
                : `${ichName} balanciert zwischen Stabilität und Beweglichkeit in der emotionalen Welt.`);
        } else {
            ichParts.push(isEN
                ? `${ichName} seeks emotional depth through constancy and familiar patterns.`
                : `${ichName} sucht emotionale Tiefe durch Beständigkeit und vertraute Muster.`);
        }
    }
    if (ichArch?.osho?.naturalness >= 0.7) {
        ichParts.push(isEN
            ? `Emotional authenticity is central – ${ichName} follows the natural flow of feelings.`
            : `Emotionale Authentizität steht im Vordergrund – ${ichName} folgt dem natürlichen Fluss der Gefühle.`);
    }
    const ichDom = person1.dominanz;
    if (ichDom) {
        const domText = isEN ? {
            'dominant': `As the guiding partner, ${ichName} carries an active emotional energy.`,
            'submissiv': `${ichName} brings a receptive, surrendering quality.`,
            'switch': `${ichName} is flexible in emotional dynamics – sometimes leading, sometimes following.`,
            'ausgeglichen': `${ichName} strives for emotional balance in the connection.`
        } : {
            'dominant': `Als Führende/r trägt ${ichName} eine aktive emotionale Energie.`,
            'submissiv': `${ichName} bringt eine empfängliche, hingebungsvolle Qualität mit.`,
            'switch': `${ichName} ist flexibel in der emotionalen Dynamik – mal führend, mal folgend.`,
            'ausgeglichen': `${ichName} strebt nach emotionalem Gleichgewicht in der Verbindung.`
        };
        if (domText[ichDom]) ichParts.push(domText[ichDom]);
    }
    if (ichArch?.coreValues?.length) {
        ichParts.push(isEN
            ? `Core values such as ${ichArch.coreValues.slice(0, 2).join(' and ')} shape the emotional experience.`
            : `Kernwerte wie ${ichArch.coreValues.slice(0, 2).join(' und ')} prägen das emotionale Erleben.`);
    }

    // PARTNER BRINGT MIT
    const partnerParts = [];
    if (partnerArch?.pirsig?.dynamicQuality !== undefined) {
        const dynQual = partnerArch.pirsig.dynamicQuality;
        if (dynQual >= 0.7) {
            partnerParts.push(isEN
                ? `${partnerName} brings a high dynamic energy – open to change and spontaneous connection.`
                : `${partnerName} bringt eine hohe dynamische Energie mit – offen für Veränderung und spontane Verbindung.`);
        } else if (dynQual >= 0.4) {
            partnerParts.push(isEN
                ? `${partnerName} balances between stability and flexibility in the emotional world.`
                : `${partnerName} balanciert zwischen Stabilität und Beweglichkeit in der emotionalen Welt.`);
        } else {
            partnerParts.push(isEN
                ? `${partnerName} seeks emotional depth through constancy and familiar patterns.`
                : `${partnerName} sucht emotionale Tiefe durch Beständigkeit und vertraute Muster.`);
        }
    }
    if (partnerArch?.osho?.naturalness >= 0.7) {
        partnerParts.push(isEN
            ? `Emotional authenticity is central – ${partnerName} follows the natural flow of feelings.`
            : `Emotionale Authentizität steht im Vordergrund – ${partnerName} folgt dem natürlichen Fluss der Gefühle.`);
    }
    const partnerDom = person2.dominanz;
    if (partnerDom) {
        const domText = isEN ? {
            'dominant': `As the guiding partner, ${partnerName} carries an active emotional energy.`,
            'submissiv': `${partnerName} brings a receptive, surrendering quality.`,
            'switch': `${partnerName} is flexible in emotional dynamics – sometimes leading, sometimes following.`,
            'ausgeglichen': `${partnerName} strives for emotional balance in the connection.`
        } : {
            'dominant': `Als Führende/r trägt ${partnerName} eine aktive emotionale Energie.`,
            'submissiv': `${partnerName} bringt eine empfängliche, hingebungsvolle Qualität mit.`,
            'switch': `${partnerName} ist flexibel in der emotionalen Dynamik – mal führend, mal folgend.`,
            'ausgeglichen': `${partnerName} strebt nach emotionalem Gleichgewicht in der Verbindung.`
        };
        if (domText[partnerDom]) partnerParts.push(domText[partnerDom]);
    }
    if (partnerArch?.coreValues?.length) {
        partnerParts.push(isEN
            ? `Core values such as ${partnerArch.coreValues.slice(0, 2).join(' and ')} shape the emotional experience.`
            : `Kernwerte wie ${partnerArch.coreValues.slice(0, 2).join(' und ')} prägen das emotionale Erleben.`);
    }

    // SYNTHESE
    const lang = getLang();
    const syntheseParts = [];
    const tonalityIntro = selectStatementByHash(getLocalizedPhrases(tonalityTemplates[tonality].pathos), hash);
    if (tonalityIntro) syntheseParts.push(tonalityIntro);
    if (archStatements?.pathos) {
        const allPathos = [...(archStatements.pathos.gemeinsam || []), ...(archStatements.pathos.spannung || [])];
        const selected = selectStatementByHash(allPathos, hash + 7);
        if (selected) syntheseParts.push(selected);
    }
    if (domStatements?.pathos?.length) {
        syntheseParts.push(selectStatementByHash(domStatements.pathos, hash + 11));
    }
    const ichDyn = ichArch?.pirsig?.dynamicQuality || 0.5;
    const partnerDyn = partnerArch?.pirsig?.dynamicQuality || 0.5;
    if (Math.abs(ichDyn - partnerDyn) < 0.2) {
        syntheseParts.push(lang === 'en'
            ? `Both vibrate on a similar emotional frequency.`
            : `Beide schwingen auf einer ähnlichen emotionalen Frequenz.`);
    }
    if (syntheseParts.length === 0) {
        syntheseParts.push(lang === 'en'
            ? `${ichName} and ${partnerName} can find each other emotionally.`
            : `${ichName} und ${partnerName} können emotional zueinander finden.`);
    }

    // RESONANZ
    let resonanzText = null;
    if (resonanzData?.R !== undefined) {
        const R = resonanzData.R;
        if (lang === 'en') {
            if (R >= 1.05) resonanzText = `High emotional resonance (R=${R.toFixed(2)}): Pathos and Logos harmonize.`;
            else if (R >= 0.95) resonanzText = `Good resonance (R=${R.toFixed(2)}): Emotional and rational levels in balance.`;
            else resonanzText = `Resonance R=${R.toFixed(2)}: The wavelengths are not yet fully aligned.`;
        } else {
            if (R >= 1.05) resonanzText = `Hohe emotionale Resonanz (R=${R.toFixed(2)}): Pathos und Logos harmonieren.`;
            else if (R >= 0.95) resonanzText = `Gute Resonanz (R=${R.toFixed(2)}): Emotionale und rationale Ebene im Gleichgewicht.`;
            else resonanzText = `Resonanz R=${R.toFixed(2)}: Die Wellenlängen sind noch nicht vollständig abgestimmt.`;
        }
    }

    return {
        ich: ichParts.join(' '),
        partner: partnerParts.join(' '),
        synthese: syntheseParts.join(' '),
        resonanz: resonanzText,
        score: overallScore,
        tonality: tonality
    };
}

// Legacy-Wrapper für Kompatibilität
function generateCombinedPathos(ichArch, partnerArch) {
    const detailed = generateDetailedPathos(ichArch, partnerArch);
    return detailed.synthese;
}

/**
 * Generiert detaillierte Logos-Inhalte mit ICH/Partner/Synthese Struktur
 * Nutzt LogosTextGenerator für fließende, analytische Texte
 * @returns {Object} { ich, partner, synthese, resonanz }
 */
function generateDetailedLogos(ichArch, partnerArch) {
    const ichName = ichArch?.name || 'ICH';
    const partnerName = partnerArch?.name || 'Partner';
    const ichId = ichArch?.id || window.getIchArchetype() || '';
    const partnerId = partnerArch?.id || window.getPartnerArchetype() || '';

    // Berechne die 4 Faktor-Scores
    const person1 = {
        archetyp: ichId,
        dominanz: window.personDimensions.ich?.dominanz,
        orientierung: window.personDimensions.ich?.orientierung,
        geschlecht: window.personDimensions.ich?.geschlecht,
        orientierungStatus: window.personDimensions.ich?.orientierungStatus
    };
    const person2 = {
        archetyp: partnerId,
        dominanz: window.personDimensions.partner?.dominanz,
        orientierung: window.personDimensions.partner?.orientierung,
        geschlecht: window.personDimensions.partner?.geschlecht,
        orientierungStatus: window.personDimensions.partner?.orientierungStatus
    };

    // Hole Score-Breakdown
    const qualityResult = window.calculateRelationshipQuality(person1, person2);
    const breakdown = qualityResult.breakdown || { archetyp: 50, dominanz: 75, orientierung: 100, geschlecht: 100 };
    const overallScore = qualityResult.score || 50;
    const resonanzData = qualityResult.resonanz;
    const tonality = getTonality(overallScore);

    // Get category scores
    const key = `${ichId}_${partnerId}`;
    const interaction = window.tiageData?.interactions?.[key];
    const categoryScores = interaction?.scores || {};

    // Hole Statement-Quellen
    const archStatements = window.TiageStatementHelpers.getArchetypeStatements(ichId, partnerId);

    // ═══════════════════════════════════════════════════════════════
    // NUTZE LOGOS TEXT GENERATOR (wenn verfügbar)
    // ═══════════════════════════════════════════════════════════════
    if (typeof LogosTextGenerator !== 'undefined') {
        // Extrahiere primitive Werte für Hash (dominanz kann Objekt sein)
        const dom1 = typeof person1.dominanz === 'object' ? (person1.dominanz?.primary || 'none') : (person1.dominanz || 'none');
        const dom2 = typeof person2.dominanz === 'object' ? (person2.dominanz?.primary || 'none') : (person2.dominanz || 'none');

        // Generiere deterministischen Hash für Varianz
        const seed = LogosTextGenerator.generateHash(
            ichId, partnerId,
            dom1,
            dom2,
            overallScore
        );

        // ICH BRINGT MIT - Analytischer Fließtext
        const ichText = LogosTextGenerator.generatePersonText(
            ichArch,
            window.personDimensions.ich,
            ichName,
            seed
        );

        // PARTNER BRINGT MIT - Analytischer Fließtext
        const partnerText = LogosTextGenerator.generatePersonText(
            partnerArch,
            window.personDimensions.partner,
            partnerName,
            seed + 100
        );

        // DARAUS ENTSTEHT - Analytische Synthese
        const syntheseText = LogosTextGenerator.generateSyntheseText({
            ichArch,
            partnerArch,
            ichName,
            partnerName,
            ichDimensions: window.personDimensions.ich,
            partnerDimensions: window.personDimensions.partner,
            overallScore,
            archStatements,
            categoryScores,
            seed
        });

        // RESONANZ - Analytische Interpretation
        let resonanzText = null;
        if (resonanzData && resonanzData.R !== undefined) {
            resonanzText = LogosTextGenerator.generateResonanzText(
                resonanzData.R,
                seed + 200
            );
        }

        return {
            ich: ichText,
            partner: partnerText,
            synthese: syntheseText,
            resonanz: resonanzText,
            score: overallScore,
            tonality: tonality
        };
    }

    // ═══════════════════════════════════════════════════════════════
    // FALLBACK: Original-Logik (wenn LogosTextGenerator nicht geladen)
    // ═══════════════════════════════════════════════════════════════
    const hash = getFactorHash(breakdown.archetyp, breakdown.dominanz, breakdown.orientierung, breakdown.geschlecht);
    const lang = getLang();
    const isEN = lang === 'en';

    // ICH BRINGT MIT
    const ichParts = [];
    if (ichArch?.pirsig?.staticQuality !== undefined) {
        const statQual = ichArch.pirsig.staticQuality;
        if (statQual >= 0.7) {
            ichParts.push(isEN
                ? `${ichName} brings clear structures and firm values – reliability is a cornerstone.`
                : `${ichName} bringt klare Strukturen und feste Werte mit – Verlässlichkeit ist ein Grundpfeiler.`);
        } else if (statQual >= 0.4) {
            ichParts.push(isEN
                ? `${ichName} balances between firm convictions and openness to new perspectives.`
                : `${ichName} balanciert zwischen festen Überzeugungen und Offenheit für neue Perspektiven.`);
        } else {
            ichParts.push(isEN
                ? `${ichName} prefers flexibility over rigid rules.`
                : `${ichName} bevorzugt Flexibilität über starre Regeln.`);
        }
    }
    if (ichArch?.coreValues?.length) {
        ichParts.push(isEN
            ? `Core values: ${ichArch.coreValues.slice(0, 3).join(', ')}.`
            : `Kernwerte: ${ichArch.coreValues.slice(0, 3).join(', ')}.`);
    }
    if (ichArch?.avoids?.length) {
        ichParts.push(isEN
            ? `Avoids: ${ichArch.avoids.slice(0, 2).join(' and ')}.`
            : `Vermeidet: ${ichArch.avoids.slice(0, 2).join(' und ')}.`);
    }
    const ichGfk = window.personDimensions.ich?.gfk;
    if (ichGfk) {
        const gfkText = isEN
            ? { 'hoch': `NVC competence: high.`, 'mittel': `NVC competence: medium.`, 'niedrig': `NVC competence: low.` }
            : { 'hoch': `GFK-Kompetenz: hoch.`, 'mittel': `GFK-Kompetenz: mittel.`, 'niedrig': `GFK-Kompetenz: niedrig.` };
        if (gfkText[ichGfk]) ichParts.push(gfkText[ichGfk]);
    }

    // PARTNER BRINGT MIT
    const partnerParts = [];
    if (partnerArch?.pirsig?.staticQuality !== undefined) {
        const statQual = partnerArch.pirsig.staticQuality;
        if (statQual >= 0.7) {
            partnerParts.push(isEN
                ? `${partnerName} brings clear structures and firm values.`
                : `${partnerName} bringt klare Strukturen und feste Werte mit.`);
        } else if (statQual >= 0.4) {
            partnerParts.push(isEN
                ? `${partnerName} balances between structure and flexibility.`
                : `${partnerName} balanciert zwischen Struktur und Flexibilität.`);
        } else {
            partnerParts.push(isEN
                ? `${partnerName} prefers adaptive structures.`
                : `${partnerName} bevorzugt adaptive Strukturen.`);
        }
    }
    if (partnerArch?.coreValues?.length) {
        partnerParts.push(isEN
            ? `Core values: ${partnerArch.coreValues.slice(0, 3).join(', ')}.`
            : `Kernwerte: ${partnerArch.coreValues.slice(0, 3).join(', ')}.`);
    }
    if (partnerArch?.avoids?.length) {
        partnerParts.push(isEN
            ? `Avoids: ${partnerArch.avoids.slice(0, 2).join(' and ')}.`
            : `Vermeidet: ${partnerArch.avoids.slice(0, 2).join(' und ')}.`);
    }
    const partnerGfk = window.personDimensions.partner?.gfk;
    if (partnerGfk) {
        const gfkText = isEN
            ? { 'hoch': `NVC competence: high.`, 'mittel': `NVC competence: medium.`, 'niedrig': `NVC competence: low.` }
            : { 'hoch': `GFK-Kompetenz: hoch.`, 'mittel': `GFK-Kompetenz: mittel.`, 'niedrig': `GFK-Kompetenz: niedrig.` };
        if (gfkText[partnerGfk]) partnerParts.push(gfkText[partnerGfk]);
    }

    // SYNTHESE
    const syntheseParts = [];
    const tonalityIntro = selectStatementByHash(getLocalizedPhrases(tonalityTemplates[tonality].logos), hash);
    if (tonalityIntro) syntheseParts.push(tonalityIntro);
    if (archStatements?.logos) {
        const allLogos = [...(archStatements.logos.gemeinsam || []), ...(archStatements.logos.unterschied || [])];
        const selected = selectStatementByHash(allLogos, hash + 7);
        if (selected) syntheseParts.push(selected);
    }
    const ichStat = ichArch?.pirsig?.staticQuality || 0.5;
    const partnerStat = partnerArch?.pirsig?.staticQuality || 0.5;
    if (Math.abs(ichStat - partnerStat) < 0.2) {
        syntheseParts.push(isEN
            ? `Similar need for structure facilitates coordination.`
            : `Ähnliches Strukturbedürfnis erleichtert die Abstimmung.`);
    }
    if (syntheseParts.length === 0) {
        syntheseParts.push(isEN
            ? `${ichName} and ${partnerName} have potential for a viable foundation.`
            : `${ichName} und ${partnerName} haben Potenzial für eine tragfähige Basis.`);
    }

    // RESONANZ
    let resonanzText = null;
    if (resonanzData?.R !== undefined) {
        const R = resonanzData.R;
        if (isEN) {
            if (R >= 1.05) resonanzText = `Resonance R=${R.toFixed(2)}: High structural alignment.`;
            else if (R >= 0.95) resonanzText = `Resonance R=${R.toFixed(2)}: Good compatibility.`;
            else resonanzText = `Resonance R=${R.toFixed(2)}: Requires conscious coordination.`;
        } else {
            if (R >= 1.05) resonanzText = `Resonanz R=${R.toFixed(2)}: Hohe strukturelle Übereinstimmung.`;
            else if (R >= 0.95) resonanzText = `Resonanz R=${R.toFixed(2)}: Gute Kompatibilität.`;
            else resonanzText = `Resonanz R=${R.toFixed(2)}: Erfordert bewusste Abstimmung.`;
        }
    }

    return {
        ich: ichParts.join(' '),
        partner: partnerParts.join(' '),
        synthese: syntheseParts.join(' '),
        resonanz: resonanzText,
        score: overallScore,
        tonality: tonality
    };
}

// Legacy-Wrapper für Kompatibilität
function generateCombinedLogos(ichArch, partnerArch) {
    const detailed = generateDetailedLogos(ichArch, partnerArch);
    return detailed.synthese;
}

// Legacy-Funktion für Kompatibilität (wird nicht mehr verwendet)
function generateCombinedLogos_legacy(ichArch, partnerArch) {
    const ichName = ichArch?.name || 'ICH';
    const partnerName = partnerArch?.name || 'Partner';
    // Use global archetype keys as IDs since archetypeDefinitions doesn't have id property
    const ichId = ichArch?.id || window.getIchArchetype() || '';
    const partnerId = partnerArch?.id || window.getPartnerArchetype() || '';

    // Get philosophy score from compatibility matrix
    const key = `${ichId}_${partnerId}`;
    const interaction = window.tiageData?.interactions?.[key];
    const philScore = interaction?.scores?.A?.value || interaction?.overall || 50;

    // Hole Statements aus der Datenbank
    const archStatements = window.TiageStatementHelpers.getArchetypeStatements(ichId, partnerId);
    const domStatements = window.TiageStatementHelpers.getDominanceStatements(
        window.personDimensions.ich?.dominanz,
        window.personDimensions.partner?.dominanz
    );
    const orientStatements = window.TiageStatementHelpers.getOrientierungStatements(
        window.personDimensions.ich?.orientierung,
        window.personDimensions.partner?.orientierung,
        window.personDimensions.ich?.geschlecht,
        window.personDimensions.partner?.geschlecht
    );
    const statusStmts = window.TiageStatementHelpers.getStatusStatements(
        window.personDimensions.ich,
        window.personDimensions.partner
    );

    const textParts = [];

    // Archetyp-basierte Logos-Statements
    if (archStatements?.logos) {
        if (archStatements.logos.gemeinsam?.length) {
            textParts.push(archStatements.logos.gemeinsam[0]);
        }
        if (archStatements.logos.unterschied?.length && philScore < 70) {
            textParts.push(archStatements.logos.unterschied[0]);
        }
    }

    // Dominanz-basierte Logos-Statements (nur wenn nicht default)
    if (domStatements?.logos?.length && domStatements !== window.dominanceStatements.default) {
        textParts.push(domStatements.logos[0]);
    }

    // Orientierungs-basierte Logos-Statements hinzufügen (nur wenn nicht default)
    if (orientStatements?.logos?.length && orientStatements !== window.orientierungStatements.default) {
        textParts.push(orientStatements.logos[0]);
    }

    // Status-basierte Logos-Statements hinzufügen (Pirsig-Perspektive)
    if (statusStmts?.logos?.length && statusStmts !== window.statusStatements.default) {
        textParts.push(statusStmts.logos[0]);
    }

    // Fallback mit Philosophie-Score
    if (textParts.length === 0) {
        if (philScore >= 80) {
            return `${ichName} und ${partnerName} teilen viele rationale Grundüberzeugungen über Beziehungen (Philosophie-Score: ${philScore}%). Das bildet eine solide Basis für konstruktive Gespräche.`;
        } else if (philScore < 50) {
            return `${ichName} und ${partnerName} haben unterschiedliche rationale Vorstellungen von Beziehungen (Philosophie-Score: ${philScore}%). Grundlegende Gespräche über Erwartungen sind wichtig.`;
        }
        return `${ichName} und ${partnerName} haben einige Überschneidungen in ihren rationalen Beziehungsvorstellungen (Philosophie-Score: ${philScore}%), aber auch Unterschiede, die Kommunikation erfordern.`;
    }

    return textParts.join(' ');
}

    // ── Exports ─────────────────────────────────────────────────────────────
    window.getFactorHash = getFactorHash;
    window.selectStatementByHash = selectStatementByHash;
    window.getTonality = getTonality;
    window.generateDetailedPathos = generateDetailedPathos;
    window.generateCombinedPathos = generateCombinedPathos;
    window.generateDetailedLogos = generateDetailedLogos;
    window.generateCombinedLogos = generateCombinedLogos;
    window.generateCombinedLogos_legacy = generateCombinedLogos_legacy;

})();
