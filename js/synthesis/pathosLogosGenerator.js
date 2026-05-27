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

function getLocalizedString(de, en, fr, it) {
    const lang = getLang();
    if (lang === 'en') return en;
    if (lang === 'fr') return fr;
    if (lang === 'it') return it;
    return de;
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
            ],
            fr: [
                "Une résonance prometteuse se crée entre vous.",
                "La chimie émotionnelle indique un profond potentiel.",
                "Vos énergies s'harmonisent à un niveau fondamental."
            ],
            it: [
                "Una risonanza promettente si crea tra voi.",
                "La chimica emotiva indica un profondo potenziale.",
                "Le vostre energie si armonizzano a un livello fondamentale."
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
            ],
            fr: [
                "La compatibilité structurelle forme une base solide.",
                "Vos philosophies relationnelles se complètent de manière constructive.",
                "Le fondement rationnel permet une communication fructueuse."
            ],
            it: [
                "La compatibilità strutturale forma una base solida.",
                "Le vostre filosofie relazionali si completano in modo costruttivo.",
                "Il fondamento razionale permette una comunicazione fruttuosa."
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
            ],
            fr: [
                "Une dynamique intéressante se déploie entre vous.",
                "Le paysage émotionnel offre à la fois des opportunités et des défis.",
                "Vos énergies se rencontrent – ce qui en ressort est entre vos mains."
            ],
            it: [
                "Una dinamica interessante si dispiega tra voi.",
                "Il paesaggio emotivo offre sia opportunità che sfide.",
                "Le vostre energie si incontrano – quello che ne scaturisce è nelle vostre mani."
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
            ],
            fr: [
                "Les différences structurelles exigent une navigation consciente.",
                "Vos conceptions relationnelles ont des points communs, mais aussi des différences.",
                "Le dialogue et la clarification seront importants pour la compréhension mutuelle."
            ],
            it: [
                "Le differenze strutturali richiedono una navigazione consapevole.",
                "Le vostre idee sulle relazioni hanno sovrapposizioni, ma anche differenze.",
                "Il dialogo e la chiarificazione saranno importanti per la comprensione reciproca."
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
            ],
            fr: [
                "Les mondes émotionnels s'affrontent.",
                "Des tensions au niveau émotionnel sont à prévoir.",
                "Les différents besoins émotionnels nécessitent une attention particulière."
            ],
            it: [
                "I mondi emotivi si scontrano.",
                "Le tensioni sul piano emotivo sono da aspettarsi.",
                "I diversi bisogni emotivi richiedono una particolare attenzione."
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
            ],
            fr: [
                "Des différences fondamentales dans les conceptions relationnelles deviennent visibles.",
                "Les différences structurelles représentent un défi considérable.",
                "Des conversations fondamentales sur les attentes sont indispensables."
            ],
            it: [
                "Emergono differenze fondamentali nelle concezioni relazionali.",
                "Le differenze strutturali rappresentano una sfida considerevole.",
                "Conversazioni fondamentali sulle aspettative sono indispensabili."
            ]
        }
    }
};

/**
 * Kategorie-spezifische Synthese-Bausteine für die 6 Bereiche
 */
const categorySynthesisTemplates = {
    A: {
        name: { de: "Beziehungsphilosophie", en: "Relationship Philosophy", fr: "Philosophie relationnelle", it: "Filosofia relazionale" },
        positiv: { de: "Eure Grundhaltungen zu Beziehungen harmonieren.", en: "Your fundamental attitudes toward relationships harmonize.", fr: "Vos attitudes fondamentales envers les relations s'harmonisent.", it: "I vostri atteggiamenti fondamentali verso le relazioni si armonizzano." },
        neutral: { de: "Eure Beziehungsphilosophien haben gemeinsame Punkte, aber auch Unterschiede.", en: "Your relationship philosophies have common points, but also differences.", fr: "Vos philosophies relationnelles ont des points communs, mais aussi des différences.", it: "Le vostre filosofie relazionali hanno punti in comune, ma anche differenze." },
        kritisch: { de: "Fundamentale Differenzen in der Beziehungsphilosophie erfordern Klärung.", en: "Fundamental differences in relationship philosophy require clarification.", fr: "Des différences fondamentales dans la philosophie relationnelle nécessitent une clarification.", it: "Le differenze fondamentali nella filosofia relazionale richiedono chiarimento." }
    },
    B: {
        name: { de: "Werte-Alignment", en: "Value Alignment", fr: "Alignement des valeurs", it: "Allineamento dei valori" },
        positiv: { de: "Geteilte Werte bilden ein stabiles Fundament.", en: "Shared values form a stable foundation.", fr: "Des valeurs partagées forment une base stable.", it: "Valori condivisi formano una base stabile." },
        neutral: { de: "Manche Werte teilt ihr, andere unterscheiden sich.", en: "Some values you share, others differ.", fr: "Certaines valeurs vous sont communes, d'autres diffèrent.", it: "Alcune valori le condividete, altre differiscono." },
        kritisch: { de: "Unterschiedliche Wertevorstellungen können zu Konflikten führen.", en: "Different value expectations can lead to conflicts.", fr: "Des conceptions de valeurs différentes peuvent conduire à des conflits.", it: "Diverse concezioni di valori possono portare a conflitti." }
    },
    C: {
        name: { de: "Nähe-Distanz", en: "Closeness-Distance", fr: "Proximité-Distance", it: "Vicinanza-Distanza" },
        positiv: { de: "Eure Bedürfnisse nach Nähe und Raum passen gut zusammen.", en: "Your needs for closeness and space fit well together.", fr: "Vos besoins de proximité et d'espace s'accordent bien.", it: "I vostri bisogni di vicinanza e spazio si accordano bene." },
        neutral: { de: "Die Balance zwischen Nähe und Distanz wird Kommunikation erfordern.", en: "The balance between closeness and distance will require communication.", fr: "L'équilibre entre proximité et distance nécessitera de la communication.", it: "L'equilibrio tra vicinanza e distanza richiederà comunicazione." },
        kritisch: { de: "Unterschiedliche Nähe-Distanz-Bedürfnisse können Spannung erzeugen.", en: "Different closeness-distance needs can create tension.", fr: "Des besoins de proximité-distance différents peuvent créer des tensions.", it: "Diversi bisogni di vicinanza-distanza possono creare tensione." }
    },
    D: {
        name: { de: "Autonomie", en: "Autonomy", fr: "Autonomie", it: "Autonomia" },
        positiv: { de: "Ihr respektiert gegenseitig eure Unabhängigkeit.", en: "You mutually respect each other's independence.", fr: "Vous vous respectez mutuellement dans votre indépendance.", it: "Vi rispettate reciprocamente nella vostra indipendenza." },
        neutral: { de: "Das Autonomie-Verständnis bedarf weiterer Abstimmung.", en: "The understanding of autonomy requires further coordination.", fr: "La compréhension de l'autonomie nécessite plus de coordination.", it: "La comprensione dell'autonomia richiede ulteriore coordinamento." },
        kritisch: { de: "Konfliktpotenzial bei unterschiedlichen Autonomie-Erwartungen.", en: "Conflict potential with differing autonomy expectations.", fr: "Potentiel de conflit avec des attentes d'autonomie différentes.", it: "Potenziale di conflitto con diverse aspettative di autonomia." }
    },
    E: {
        name: { de: "Kommunikation", en: "Communication", fr: "Communication", it: "Comunicazione" },
        positiv: { de: "Die Basis für fruchtbaren Dialog ist gegeben.", en: "The foundation for productive dialogue is present.", fr: "La base pour un dialogue fructueux est présente.", it: "La base per un dialogo fruttuoso è presente." },
        neutral: { de: "Kommunikationsstile unterscheiden sich – Anpassung möglich.", en: "Communication styles differ – adaptation is possible.", fr: "Les styles de communication diffèrent – adaptation possible.", it: "Gli stili comunicativi differiscono – adattamento possibile." },
        kritisch: { de: "Unterschiedliche Kommunikationsweisen können Missverständnisse erzeugen.", en: "Different communication styles can generate misunderstandings.", fr: "Des modes de communication différents peuvent générer des malentendus.", it: "Diversi stili comunicativi possono generare malintesi." }
    },
    F: {
        name: { de: "Soziale Kompatibilität", en: "Social Compatibility", fr: "Compatibilité sociale", it: "Compatibilità sociale" },
        positiv: { de: "Soziale Vorstellungen und Umfelder harmonieren.", en: "Social ideas and environments harmonize.", fr: "Les idées et environnements sociaux s'harmonisent.", it: "Le idee e gli ambienti sociali si armonizzano." },
        neutral: { de: "Soziale Kompatibilität ist teilweise gegeben.", en: "Social compatibility is partially present.", fr: "La compatibilité sociale est partiellement présente.", it: "La compatibilità sociale è parzialmente presente." },
        kritisch: { de: "Unterschiedliche soziale Erwartungen können belasten.", en: "Different social expectations can create strain.", fr: "Des attentes sociales différentes peuvent peser.", it: "Diverse aspettative sociali possono gravare sulla relazione." }
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

    // ICH BRINGT MIT
    const ichParts = [];
    if (ichArch?.pirsig?.dynamicQuality !== undefined) {
        const dynQual = ichArch.pirsig.dynamicQuality;
        if (dynQual >= 0.7) {
            ichParts.push(getLocalizedString(
                `${ichName} bringt eine hohe dynamische Energie mit – offen für Veränderung und spontane Verbindung.`,
                `${ichName} brings a high dynamic energy – open to change and spontaneous connection.`,
                `${ichName} apporte une haute énergie dynamique – ouvert au changement et à la connexion spontanée.`,
                `${ichName} porta un'alta energia dinamica – aperto al cambiamento e alla connessione spontanea.`
            ));
        } else if (dynQual >= 0.4) {
            ichParts.push(getLocalizedString(
                `${ichName} balanciert zwischen Stabilität und Beweglichkeit in der emotionalen Welt.`,
                `${ichName} balances between stability and flexibility in the emotional world.`,
                `${ichName} équilibre entre stabilité et souplesse dans le monde émotionnel.`,
                `${ichName} bilancia tra stabilità e flessibilità nel mondo emotivo.`
            ));
        } else {
            ichParts.push(getLocalizedString(
                `${ichName} sucht emotionale Tiefe durch Beständigkeit und vertraute Muster.`,
                `${ichName} seeks emotional depth through constancy and familiar patterns.`,
                `${ichName} recherche la profondeur émotionnelle à travers la constance et des schémas familiers.`,
                `${ichName} cerca la profondità emotiva attraverso la costanza e schemi familiari.`
            ));
        }
    }
    if (ichArch?.osho?.naturalness >= 0.7) {
        ichParts.push(getLocalizedString(
            `Emotionale Authentizität steht im Vordergrund – ${ichName} folgt dem natürlichen Fluss der Gefühle.`,
            `Emotional authenticity is central – ${ichName} follows the natural flow of feelings.`,
            `L'authenticité émotionnelle est au premier plan – ${ichName} suit le flux naturel des sentiments.`,
            `L'autenticità emotiva è al primo piano – ${ichName} segue il flusso naturale dei sentimenti.`
        ));
    }
    const ichDom = person1.dominanz;
    if (ichDom) {
        const domText = {
            'dominant': getLocalizedString(`Als Führende/r trägt ${ichName} eine aktive emotionale Energie.`, `As the guiding partner, ${ichName} carries an active emotional energy.`, `En tant que partenaire guide, ${ichName} porte une énergie émotionnelle active.`, `Come partner guida, ${ichName} porta un'energia emotiva attiva.`),
            'submissiv': getLocalizedString(`${ichName} bringt eine empfängliche, hingebungsvolle Qualität mit.`, `${ichName} brings a receptive, surrendering quality.`, `${ichName} apporte une qualité réceptive et dédiée.`, `${ichName} porta una qualità ricettiva e dedita.`),
            'switch': getLocalizedString(`${ichName} ist flexibel in der emotionalen Dynamik – mal führend, mal folgend.`, `${ichName} is flexible in emotional dynamics – sometimes leading, sometimes following.`, `${ichName} est flexible dans la dynamique émotionnelle – tantôt guide, tantôt suiveur.`, `${ichName} è flessibile nella dinamica emotiva – a volte guida, a volte segue.`),
            'ausgeglichen': getLocalizedString(`${ichName} strebt nach emotionalem Gleichgewicht in der Verbindung.`, `${ichName} strives for emotional balance in the connection.`, `${ichName} aspire à l'équilibre émotionnel dans la connexion.`, `${ichName} aspira all'equilibrio emotivo nella connessione.`)
        };
        if (domText[ichDom]) ichParts.push(domText[ichDom]);
    }
    if (ichArch?.coreValues?.length) {
        const vals = ichArch.coreValues.slice(0, 2);
        ichParts.push(getLocalizedString(
            `Kernwerte wie ${vals.join(' und ')} prägen das emotionale Erleben.`,
            `Core values such as ${vals.join(' and ')} shape the emotional experience.`,
            `Des valeurs fondamentales comme ${vals.join(' et ')} façonnent l'expérience émotionnelle.`,
            `Valori fondamentali come ${vals.join(' e ')} plasmano l'esperienza emotiva.`
        ));
    }

    // PARTNER BRINGT MIT
    const partnerParts = [];
    if (partnerArch?.pirsig?.dynamicQuality !== undefined) {
        const dynQual = partnerArch.pirsig.dynamicQuality;
        if (dynQual >= 0.7) {
            partnerParts.push(getLocalizedString(
                `${partnerName} bringt eine hohe dynamische Energie mit – offen für Veränderung und spontane Verbindung.`,
                `${partnerName} brings a high dynamic energy – open to change and spontaneous connection.`,
                `${partnerName} apporte une haute énergie dynamique – ouvert au changement et à la connexion spontanée.`,
                `${partnerName} porta un'alta energia dinamica – aperto al cambiamento e alla connessione spontanea.`
            ));
        } else if (dynQual >= 0.4) {
            partnerParts.push(getLocalizedString(
                `${partnerName} balanciert zwischen Stabilität und Beweglichkeit in der emotionalen Welt.`,
                `${partnerName} balances between stability and flexibility in the emotional world.`,
                `${partnerName} équilibre entre stabilité et souplesse dans le monde émotionnel.`,
                `${partnerName} bilancia tra stabilità e flessibilità nel mondo emotivo.`
            ));
        } else {
            partnerParts.push(getLocalizedString(
                `${partnerName} sucht emotionale Tiefe durch Beständigkeit und vertraute Muster.`,
                `${partnerName} seeks emotional depth through constancy and familiar patterns.`,
                `${partnerName} recherche la profondeur émotionnelle à travers la constance et des schémas familiers.`,
                `${partnerName} cerca la profondità emotiva attraverso la costanza e schemi familiari.`
            ));
        }
    }
    if (partnerArch?.osho?.naturalness >= 0.7) {
        partnerParts.push(getLocalizedString(
            `Emotionale Authentizität steht im Vordergrund – ${partnerName} folgt dem natürlichen Fluss der Gefühle.`,
            `Emotional authenticity is central – ${partnerName} follows the natural flow of feelings.`,
            `L'authenticité émotionnelle est au premier plan – ${partnerName} suit le flux naturel des sentiments.`,
            `L'autenticità emotiva è al primo piano – ${partnerName} segue il flusso naturale dei sentimenti.`
        ));
    }
    const partnerDom = person2.dominanz;
    if (partnerDom) {
        const domText = {
            'dominant': getLocalizedString(`Als Führende/r trägt ${partnerName} eine aktive emotionale Energie.`, `As the guiding partner, ${partnerName} carries an active emotional energy.`, `En tant que partenaire guide, ${partnerName} porte une énergie émotionnelle active.`, `Come partner guida, ${partnerName} porta un'energia emotiva attiva.`),
            'submissiv': getLocalizedString(`${partnerName} bringt eine empfängliche, hingebungsvolle Qualität mit.`, `${partnerName} brings a receptive, surrendering quality.`, `${partnerName} apporte une qualité réceptive et dédiée.`, `${partnerName} porta una qualità ricettiva e dedita.`),
            'switch': getLocalizedString(`${partnerName} ist flexibel in der emotionalen Dynamik – mal führend, mal folgend.`, `${partnerName} is flexible in emotional dynamics – sometimes leading, sometimes following.`, `${partnerName} est flexible dans la dynamique émotionnelle – tantôt guide, tantôt suiveur.`, `${partnerName} è flessibile nella dinamica emotiva – a volte guida, a volte segue.`),
            'ausgeglichen': getLocalizedString(`${partnerName} strebt nach emotionalem Gleichgewicht in der Verbindung.`, `${partnerName} strives for emotional balance in the connection.`, `${partnerName} aspire à l'équilibre émotionnel dans la connexion.`, `${partnerName} aspira all'equilibrio emotivo nella connessione.`)
        };
        if (domText[partnerDom]) partnerParts.push(domText[partnerDom]);
    }
    if (partnerArch?.coreValues?.length) {
        const vals = partnerArch.coreValues.slice(0, 2);
        partnerParts.push(getLocalizedString(
            `Kernwerte wie ${vals.join(' und ')} prägen das emotionale Erleben.`,
            `Core values such as ${vals.join(' and ')} shape the emotional experience.`,
            `Des valeurs fondamentales comme ${vals.join(' et ')} façonnent l'expérience émotionnelle.`,
            `Valori fondamentali come ${vals.join(' e ')} plasmano l'esperienza emotiva.`
        ));
    }

    // SYNTHESE
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
        syntheseParts.push(getLocalizedString(
            `Beide schwingen auf einer ähnlichen emotionalen Frequenz.`,
            `Both vibrate on a similar emotional frequency.`,
            `Les deux vibrent sur une fréquence émotionnelle similaire.`,
            `Entrambi vibrano sulla stessa frequenza emotiva.`
        ));
    }
    if (syntheseParts.length === 0) {
        syntheseParts.push(getLocalizedString(
            `${ichName} und ${partnerName} können emotional zueinander finden.`,
            `${ichName} and ${partnerName} can find each other emotionally.`,
            `${ichName} et ${partnerName} peuvent se trouver émotionnellement.`,
            `${ichName} e ${partnerName} possono trovare l'uno nell'altro sul piano emotivo.`
        ));
    }

    // RESONANZ
    let resonanzText = null;
    if (resonanzData?.R !== undefined) {
        const R = resonanzData.R;
        if (R >= 1.05) resonanzText = getLocalizedString(
            `Hohe emotionale Resonanz (R=${R.toFixed(2)}): Pathos und Logos harmonieren.`,
            `High emotional resonance (R=${R.toFixed(2)}): Pathos and Logos harmonize.`,
            `Haute résonance émotionnelle (R=${R.toFixed(2)}) : Pathos et Logos s'harmonisent.`,
            `Alta risonanza emotiva (R=${R.toFixed(2)}): Pathos e Logos si armonizzano.`
        );
        else if (R >= 0.95) resonanzText = getLocalizedString(
            `Gute Resonanz (R=${R.toFixed(2)}): Emotionale und rationale Ebene im Gleichgewicht.`,
            `Good resonance (R=${R.toFixed(2)}): Emotional and rational levels in balance.`,
            `Bonne résonance (R=${R.toFixed(2)}) : niveaux émotionnel et rationnel en équilibre.`,
            `Buona risonanza (R=${R.toFixed(2)}): livelli emotivo e razionale in equilibrio.`
        );
        else resonanzText = getLocalizedString(
            `Resonanz R=${R.toFixed(2)}: Die Wellenlängen sind noch nicht vollständig abgestimmt.`,
            `Resonance R=${R.toFixed(2)}: The wavelengths are not yet fully aligned.`,
            `Résonance R=${R.toFixed(2)} : les longueurs d'onde ne sont pas encore complètement alignées.`,
            `Risonanza R=${R.toFixed(2)}: le lunghezze d'onda non sono ancora completamente allineate.`
        );
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

    // ICH BRINGT MIT
    const ichParts = [];
    if (ichArch?.pirsig?.staticQuality !== undefined) {
        const statQual = ichArch.pirsig.staticQuality;
        if (statQual >= 0.7) {
            ichParts.push(getLocalizedString(
                `${ichName} bringt klare Strukturen und feste Werte mit – Verlässlichkeit ist ein Grundpfeiler.`,
                `${ichName} brings clear structures and firm values – reliability is a cornerstone.`,
                `${ichName} apporte des structures claires et des valeurs fermes – la fiabilité est un pilier fondamental.`,
                `${ichName} porta strutture chiare e valori saldi – l'affidabilità è un pilastro fondamentale.`
            ));
        } else if (statQual >= 0.4) {
            ichParts.push(getLocalizedString(
                `${ichName} balanciert zwischen festen Überzeugungen und Offenheit für neue Perspektiven.`,
                `${ichName} balances between firm convictions and openness to new perspectives.`,
                `${ichName} équilibre entre des convictions fermes et l'ouverture à de nouvelles perspectives.`,
                `${ichName} bilancia tra convinzioni ferme e apertura a nuove prospettive.`
            ));
        } else {
            ichParts.push(getLocalizedString(
                `${ichName} bevorzugt Flexibilität über starre Regeln.`,
                `${ichName} prefers flexibility over rigid rules.`,
                `${ichName} préfère la flexibilité aux règles rigides.`,
                `${ichName} preferisce la flessibilità alle regole rigide.`
            ));
        }
    }
    if (ichArch?.coreValues?.length) {
        const vals = ichArch.coreValues.slice(0, 3).join(', ');
        ichParts.push(getLocalizedString(
            `Kernwerte: ${vals}.`, `Core values: ${vals}.`,
            `Valeurs fondamentales : ${vals}.`, `Valori fondamentali: ${vals}.`
        ));
    }
    if (ichArch?.avoids?.length) {
        const avs = ichArch.avoids.slice(0, 2);
        ichParts.push(getLocalizedString(
            `Vermeidet: ${avs.join(' und ')}.`, `Avoids: ${avs.join(' and ')}.`,
            `Évite : ${avs.join(' et ')}.`, `Evita: ${avs.join(' e ')}.`
        ));
    }
    const ichGfk = window.personDimensions.ich?.gfk;
    if (ichGfk) {
        const gfkText = {
            'hoch': getLocalizedString('GFK-Kompetenz: hoch.', 'NVC competence: high.', 'Compétence CNV : haute.', 'Competenza CNV: alta.'),
            'mittel': getLocalizedString('GFK-Kompetenz: mittel.', 'NVC competence: medium.', 'Compétence CNV : moyenne.', 'Competenza CNV: media.'),
            'niedrig': getLocalizedString('GFK-Kompetenz: niedrig.', 'NVC competence: low.', 'Compétence CNV : faible.', 'Competenza CNV: bassa.')
        };
        if (gfkText[ichGfk]) ichParts.push(gfkText[ichGfk]);
    }

    // PARTNER BRINGT MIT
    const partnerParts = [];
    if (partnerArch?.pirsig?.staticQuality !== undefined) {
        const statQual = partnerArch.pirsig.staticQuality;
        if (statQual >= 0.7) {
            partnerParts.push(getLocalizedString(
                `${partnerName} bringt klare Strukturen und feste Werte mit.`,
                `${partnerName} brings clear structures and firm values.`,
                `${partnerName} apporte des structures claires et des valeurs fermes.`,
                `${partnerName} porta strutture chiare e valori saldi.`
            ));
        } else if (statQual >= 0.4) {
            partnerParts.push(getLocalizedString(
                `${partnerName} balanciert zwischen Struktur und Flexibilität.`,
                `${partnerName} balances between structure and flexibility.`,
                `${partnerName} équilibre entre structure et flexibilité.`,
                `${partnerName} bilancia tra struttura e flessibilità.`
            ));
        } else {
            partnerParts.push(getLocalizedString(
                `${partnerName} bevorzugt adaptive Strukturen.`,
                `${partnerName} prefers adaptive structures.`,
                `${partnerName} préfère des structures adaptatives.`,
                `${partnerName} preferisce strutture adattive.`
            ));
        }
    }
    if (partnerArch?.coreValues?.length) {
        const vals = partnerArch.coreValues.slice(0, 3).join(', ');
        partnerParts.push(getLocalizedString(
            `Kernwerte: ${vals}.`, `Core values: ${vals}.`,
            `Valeurs fondamentales : ${vals}.`, `Valori fondamentali: ${vals}.`
        ));
    }
    if (partnerArch?.avoids?.length) {
        const avs = partnerArch.avoids.slice(0, 2);
        partnerParts.push(getLocalizedString(
            `Vermeidet: ${avs.join(' und ')}.`, `Avoids: ${avs.join(' and ')}.`,
            `Évite : ${avs.join(' et ')}.`, `Evita: ${avs.join(' e ')}.`
        ));
    }
    const partnerGfk = window.personDimensions.partner?.gfk;
    if (partnerGfk) {
        const gfkText = {
            'hoch': getLocalizedString('GFK-Kompetenz: hoch.', 'NVC competence: high.', 'Compétence CNV : haute.', 'Competenza CNV: alta.'),
            'mittel': getLocalizedString('GFK-Kompetenz: mittel.', 'NVC competence: medium.', 'Compétence CNV : moyenne.', 'Competenza CNV: media.'),
            'niedrig': getLocalizedString('GFK-Kompetenz: niedrig.', 'NVC competence: low.', 'Compétence CNV : faible.', 'Competenza CNV: bassa.')
        };
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
        syntheseParts.push(getLocalizedString(
            `Ähnliches Strukturbedürfnis erleichtert die Abstimmung.`,
            `Similar need for structure facilitates coordination.`,
            `Un besoin similaire de structure facilite la coordination.`,
            `Un simile bisogno di struttura facilita il coordinamento.`
        ));
    }
    if (syntheseParts.length === 0) {
        syntheseParts.push(getLocalizedString(
            `${ichName} und ${partnerName} haben Potenzial für eine tragfähige Basis.`,
            `${ichName} and ${partnerName} have potential for a viable foundation.`,
            `${ichName} et ${partnerName} ont le potentiel pour une base viable.`,
            `${ichName} e ${partnerName} hanno il potenziale per una base solida.`
        ));
    }

    // RESONANZ
    let resonanzText = null;
    if (resonanzData?.R !== undefined) {
        const R = resonanzData.R;
        if (R >= 1.05) resonanzText = getLocalizedString(
            `Resonanz R=${R.toFixed(2)}: Hohe strukturelle Übereinstimmung.`,
            `Resonance R=${R.toFixed(2)}: High structural alignment.`,
            `Résonance R=${R.toFixed(2)} : Forte concordance structurelle.`,
            `Risonanza R=${R.toFixed(2)}: Alta concordanza strutturale.`
        );
        else if (R >= 0.95) resonanzText = getLocalizedString(
            `Resonanz R=${R.toFixed(2)}: Gute Kompatibilität.`,
            `Resonance R=${R.toFixed(2)}: Good compatibility.`,
            `Résonance R=${R.toFixed(2)} : Bonne compatibilité.`,
            `Risonanza R=${R.toFixed(2)}: Buona compatibilità.`
        );
        else resonanzText = getLocalizedString(
            `Resonanz R=${R.toFixed(2)}: Erfordert bewusste Abstimmung.`,
            `Resonance R=${R.toFixed(2)}: Requires conscious coordination.`,
            `Résonance R=${R.toFixed(2)} : Nécessite une coordination consciente.`,
            `Risonanza R=${R.toFixed(2)}: Richiede un coordinamento consapevole.`
        );
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
