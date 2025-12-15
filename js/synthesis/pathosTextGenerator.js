/**
 * PATHOS TEXT GENERATOR
 * =====================
 * Dynamische, poetische Textgenerierung für die Tiage-Synthese
 *
 * Philosophische Grundlage:
 * - PATHOS (Pirsigs "romantische Qualität"): Emotional, poetisch, intuitiv
 * - Das "Herz" nach Osho - Bedürfnisse werden gefühlt, Resonanz als Schwingung
 *
 * Ziel: Fließende, metaphorische Texte statt aufgelisteter Textbausteine
 */

const PathosTextGenerator = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // LANGUAGE HELPER - Ermittelt aktuelle Sprache und wählt lokalisierte Phrasen
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Ermittelt die aktuelle Sprache aus dem i18n-System
     * @returns {string} 'de' oder 'en'
     */
    function getLang() {
        if (typeof TiageI18n !== 'undefined' && TiageI18n.getLanguage) {
            return TiageI18n.getLanguage();
        }
        return 'de'; // Fallback zu Deutsch
    }

    /**
     * Wählt die lokalisierten Phrasen basierend auf der aktuellen Sprache
     * @param {Object|Array} phrases - Objekt mit de/en Arrays oder einfaches Array
     * @returns {Array} Die Phrasen für die aktuelle Sprache
     */
    function getLocalizedPhrases(phrases) {
        if (Array.isArray(phrases)) {
            return phrases; // Bereits ein einfaches Array (alte Struktur)
        }
        const lang = getLang();
        return phrases[lang] || phrases.de || []; // Fallback zu Deutsch
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ÜBERGANGSPHRASEN - Verbinden Sätze organisch
    // ═══════════════════════════════════════════════════════════════════════════

    const transitions = {
        // Verstärkend/Ergänzend (Satzadverbien, die vor vollständigen Sätzen stehen können)
        additive: [
            "Dabei",
            "Zugleich",
            "Und so",
            "Zudem",
            "Darüber hinaus",
            "Außerdem",
            "Ebenso"
        ],
        // Kontrastierend (Satzadverbien für Kontraste)
        contrast: [
            "Gleichzeitig",
            "Doch auch",
            "Dennoch",
            "Andererseits",
            "Jedoch"
        ],
        // Resultierend (Satzadverbien für Schlussfolgerungen)
        resulting: [
            "Damit",
            "Dadurch",
            "Folglich",
            "Entsprechend",
            "Letztlich"
        ],
        // Verbindend (für Synthese-Sektion)
        connecting: [
            "Wenn diese Energien sich begegnen,",
            "Im Zusammenspiel dieser Qualitäten",
            "Dort, wo sich beide treffen,",
            "In der Begegnung dieser Welten"
        ]
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // METAPHERN-BIBLIOTHEK
    // ═══════════════════════════════════════════════════════════════════════════

    const metaphors = {
        // Frequenz & Schwingung
        resonance: [
            "auf derselben Wellenlänge schwingen",
            "in harmonischer Frequenz vibrieren",
            "eine gemeinsame Melodie finden",
            "im selben Rhythmus atmen",
            "auf ähnlichen Frequenzen senden"
        ],
        // Energie & Fluss
        energy: [
            "wie ein warmer Strom fließen",
            "als lebendige Kraft pulsieren",
            "wie ein inneres Feuer leuchten",
            "als sanfte Welle wirken",
            "wie ein stetiger Wind wehen"
        ],
        // Verbindung & Tanz
        connection: [
            "einen gemeinsamen Tanz beginnen",
            "Brücken zwischen den Welten bauen",
            "ein unsichtbares Band weben",
            "sich wie Puzzle-Teile ergänzen",
            "einen Dialog der Seelen führen"
        ],
        // Spannung & Polarität
        polarity: [
            "wie Pole eines Magneten wirken",
            "die Spannung zwischen Nähe und Weite halten",
            "im Spiel von Yin und Yang tanzen",
            "zwischen Anziehung und Freiraum pendeln",
            "das elektrische Feld der Gegensätze spüren"
        ]
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PHRASEN-BIBLIOTHEK: ICH/PARTNER BRINGT MIT
    // ═══════════════════════════════════════════════════════════════════════════

    const personPhrases = {
        // Dynamische Qualität (Pirsig) - Hohe Werte (≥0.7)
        dynamicHigh: [
            "{name} trägt eine lebendige, fließende Energie in sich – offen für das Unerwartete, bereit für Transformation.",
            "In {name} pulsiert eine hohe dynamische Qualität: Veränderung ist keine Bedrohung, sondern Einladung.",
            "{name} bewegt sich wie Wasser – anpassungsfähig, spontan, immer im Fluss.",
            "Die Seele von {name} sucht Bewegung: Stillstand ist ihr fremd, Wandel ihre Sprache."
        ],
        // Dynamische Qualität - Mittlere Werte (0.4-0.69)
        dynamicMid: [
            "{name} balanciert geschickt zwischen dem Vertrauten und dem Neuen.",
            "In {name} verbinden sich Wurzeln und Flügel – Stabilität trifft auf leise Abenteuerlust.",
            "{name} weiß, wann es Zeit ist zu ruhen und wann zu fliegen.",
            "Die emotionale Welt von {name} kennt sowohl sichere Häfen als auch offene Meere."
        ],
        // Dynamische Qualität - Niedrige Werte (<0.4)
        dynamicLow: [
            "{name} findet Tiefe in der Beständigkeit – wie ein alter Baum mit starken Wurzeln.",
            "Die Kraft von {name} liegt im Ankern: Vertraute Muster sind keine Einschränkung, sondern Heimat.",
            "{name} schafft emotionale Tiefe durch Kontinuität und verlässliche Präsenz.",
            "In {name} ruht eine stille Stärke – nicht im Wandel, sondern in der Treue zum Wesentlichen."
        ],

        // Natürlichkeit (Osho) - Hohe Werte (≥0.7)
        naturalnessHigh: [
            "Authentizität ist für {name} keine Anstrengung – Gefühle fließen wie sie kommen, ungefiltert und echt.",
            "{name} lebt aus dem Herzen: Was gefühlt wird, darf sein, ohne Zensur.",
            "Die emotionale Wahrhaftigkeit von {name} wirkt wie ein klarer Bergbach – transparent und erfrischend.",
            "{name} folgt dem inneren Kompass – gesellschaftliche Masken haben hier keinen Platz."
        ],
        // Natürlichkeit - Mittlere Werte (0.4-0.69)
        naturalnessMid: [
            "{name} verbindet emotionale Intuition mit bewusster Reflexion – ein Tanz zwischen Fühlen und Denken.",
            "In {name} begegnen sich Spontaneität und Bedachtsamkeit.",
            "{name} prüft die eigenen Gefühle, ohne sie zu unterdrücken."
        ],

        // Dominanz-Energie
        dominance: {
            dominant: [
                "{name} bringt eine führende Energie mit – nicht aus Kontrolle, sondern aus natürlicher Präsenz.",
                "In {name} lebt die Kraft des Gestaltens: Räume werden geöffnet, Richtungen gegeben.",
                "Die aktive Energie von {name} schafft Struktur und Klarheit im emotionalen Feld."
            ],
            submissiv: [
                "{name} trägt die Qualität des Empfangens – eine tiefe Hingabefähigkeit, die Raum für andere schafft.",
                "In {name} liegt eine stille Stärke: Die Kunst, sich führen zu lassen, ohne sich zu verlieren.",
                "Die rezeptive Energie von {name} ermöglicht Tiefe und Vertrauen."
            ],
            switch: [
                "{name} tanzt zwischen den Polen – mal führend, mal folgend, immer im Gleichgewicht.",
                "Die Flexibilität von {name} zeigt sich im Wechselspiel: Jede Rolle wird authentisch gelebt.",
                "In {name} vereinen sich beide Strömungen – wie Ein- und Ausatmen."
            ],
            ausgeglichen: [
                "{name} ruht in der Mitte – weder drängend noch zurückweichend.",
                "Emotionale Balance prägt {name}: Keine Extreme, sondern harmonisches Gleichgewicht.",
                "In {name} herrscht ein friedliches Zentrum – offen für beide Richtungen."
            ]
        },

        // Kernwerte (emotional gefärbt)
        coreValuesIntro: [
            "Im Herzen von {name} pulsieren {values} als tiefe Leitsterne.",
            "{values} – diese Werte sind für {name} nicht Konzept, sondern gelebte Wahrheit.",
            "Was {name} antreibt, lässt sich in zwei Worten fassen: {values}.",
            "Die Seele von {name} wird genährt von {values}."
        ],

        // GFK-Kompetenz (NVC - Nonviolent Communication)
        gfk: {
            hoch: {
                de: [
                    "{name} spricht die Sprache des Herzens fließend – empathisches Zuhören und klare Bedürfnisäußerung sind selbstverständlich.",
                    "Konflikte werden von {name} als Einladung zur Vertiefung verstanden, nicht als Bedrohung.",
                    "Die kommunikative Reife von {name} schafft einen sicheren Raum für verletzliche Wahrheiten."
                ],
                en: [
                    "{name} speaks the language of the heart fluently – empathic listening and clear expression of needs come naturally.",
                    "Conflicts are understood by {name} as invitations to deepen connection, not as threats.",
                    "The communicative maturity of {name} creates a safe space for vulnerable truths."
                ]
            },
            mittel: {
                de: [
                    "{name} kennt die Prinzipien gewaltfreier Kommunikation, doch unter Druck siegt manchmal alte Prägung.",
                    "Das Herz von {name} ist offen, auch wenn die Worte nicht immer den Weg dorthin finden.",
                    "In ruhigen Momenten kommuniziert {name} mit Klarheit – emotionaler Stress kann dies trüben."
                ],
                en: [
                    "{name} knows the principles of nonviolent communication, but under pressure old patterns sometimes prevail.",
                    "The heart of {name} is open, even if words don't always find their way there.",
                    "In calm moments {name} communicates with clarity – emotional stress can cloud this."
                ]
            },
            niedrig: {
                de: [
                    "{name} kommuniziert noch aus dem Muster von Reaktion und Verteidigung.",
                    "Hier liegt Wachstumspotenzial: {name} darf lernen, Bedürfnisse statt Urteile zu äußern.",
                    "Die Worte von {name} können schärfer wirken als das Herz es meint."
                ],
                en: [
                    "{name} still communicates from patterns of reaction and defense.",
                    "Here lies growth potential: {name} may learn to express needs instead of judgments.",
                    "The words of {name} can cut sharper than the heart intends."
                ]
            }
        },

        // Bedürfnis-Integration (für Tags)
        needsIntro: [
            "Die Seele von {name} nährt sich besonders von",
            "Was {name} wirklich braucht, zeigt sich in",
            "Im Kern sehnt sich {name} nach"
        ]
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PHRASEN-BIBLIOTHEK: DARAUS ENTSTEHT (Synthese)
    // ═══════════════════════════════════════════════════════════════════════════

    const synthesePhrases = {
        // Tonalitäts-Eröffnungen
        openings: {
            positiv: [
                "Eine vielversprechende Resonanz entfaltet sich zwischen diesen beiden Seelen.",
                "Hier begegnen sich zwei Menschen, deren Frequenzen sich natürlich verstärken.",
                "Die Chemie dieser Verbindung hat das Potenzial, beide zu bereichern.",
                "Zwischen {ich} und {partner} entsteht ein Feld, das zum Wachsen einlädt.",
                "Diese Begegnung trägt den Samen tiefer Verbundenheit in sich."
            ],
            neutral: [
                "Eine interessante Spannung entfaltet sich zwischen diesen beiden Welten.",
                "Hier treffen sich unterschiedliche Frequenzen – was daraus wird, liegt in euren Händen.",
                "Die Dynamik zwischen {ich} und {partner} bietet Chancen und Herausforderungen zugleich.",
                "Diese Verbindung ist wie ein unbeschriebenes Blatt – das Potenzial wartet auf Gestaltung.",
                "Zwei verschiedene Melodien begegnen sich – ob Harmonie oder Dissonanz entsteht, zeigt die Zeit."
            ],
            negativ: [
                "Hier treffen Welten aufeinander, die unterschiedliche Sprachen sprechen.",
                "Die Frequenzen dieser Verbindung erfordern bewusste Abstimmungsarbeit.",
                "Zwischen {ich} und {partner} liegt eine Distanz, die überbrückt werden will.",
                "Diese Begegnung ist eine Einladung zur Arbeit – an sich selbst und aneinander.",
                "Die natürliche Schwingung dieser Verbindung sucht noch ihren gemeinsamen Ton."
            ]
        },

        // Dynamik-Interaktionen
        dynamicInteraction: {
            similar: [
                "Beide schwingen auf einer ähnlichen emotionalen Frequenz – das schafft natürliche Resonanz und müheloses Verstehen.",
                "Eure dynamischen Qualitäten sind Geschwister – ihr versteht ohne Worte, was der andere braucht.",
                "Wie zwei Instrumente im selben Takt spielt ihr auf derselben emotionalen Wellenlänge.",
                "Die Ähnlichkeit eurer inneren Rhythmen ermöglicht einen Tanz ohne viele Worte."
            ],
            complementary: [
                "Eure unterschiedlichen emotionalen Tempi können sich wunderbar ergänzen – der eine gibt Halt, der andere Flügel.",
                "Wo der eine ruht, bringt der andere Bewegung – diese Polarität kann bereichern.",
                "Die verschiedenen Frequenzen laden zu einem interessanten Tanz ein: Stillstand und Bewegung im Wechsel.",
                "Wie Sonne und Mond bringt ihr verschiedene Qualitäten – zusammen entsteht ein vollständiges Bild."
            ],
            challenging: [
                "Die verschiedenen emotionalen Tempi erfordern bewusste Abstimmung und Geduld.",
                "Hier begegnen sich unterschiedliche Geschwindigkeiten – das braucht Achtsamkeit und Kommunikation.",
                "Der eine sucht Veränderung, der andere Beständigkeit – dieser Spannungsbogen will gehalten werden.",
                "Die Herausforderung liegt darin, den jeweils anderen Rhythmus nicht als Bedrohung zu erleben."
            ]
        },

        // Dominanz-Dynamik Synthese
        dominanceInteraction: {
            komplementaer: [
                "Die Dominanz-Dynamik zwischen euch ist komplementär – ein natürlicher Fluss von Führen und Folgen.",
                "Wie zwei Puzzleteile fügen sich eure energetischen Rollen zusammen.",
                "Hier entsteht eine natürliche Polarität, die Anziehung und Klarheit schafft."
            ],
            aehnlich: [
                "Beide bringen ähnliche energetische Qualitäten mit – das schafft Verständnis, aber weniger Spannung.",
                "Die Gleichartigkeit eurer Dominanz-Energie erfordert bewusste Rollenverhandlung.",
                "Ohne natürliche Polarität wird der Tanz zur Choreographie – schön, aber geplant."
            ],
            flexibel: [
                "Die Flexibilität in der Dominanz-Dynamik eröffnet viele Möglichkeiten.",
                "Hier kann der Tanz immer wieder neu verhandelt werden – Freiheit in der Form.",
                "Die Rollen sind nicht festgeschrieben – das ermöglicht Wachstum, fordert aber Kommunikation."
            ]
        },

        // GFK-Synthese (Kommunikationsdynamik) / NVC Synthesis
        gfkInteraction: {
            beide_hoch: {
                de: [
                    "Eure kommunikative Reife schafft einen sicheren Raum für alles, was ist – auch das Schwierige.",
                    "Konflikte werden hier zu Türen, nicht zu Mauern.",
                    "Die Fähigkeit, Bedürfnisse klar zu benennen, macht diese Verbindung widerstandsfähig."
                ],
                en: [
                    "Your communicative maturity creates a safe space for everything that is – including the difficult.",
                    "Conflicts become doors here, not walls.",
                    "The ability to clearly name needs makes this connection resilient."
                ]
            },
            gemischt: {
                de: [
                    "Der kommunikativ Reifere darf hier Brücken bauen – mit Geduld und ohne Überheblichkeit.",
                    "Die unterschiedlichen GFK-Kompetenzen können zum Wachstumsfeld werden.",
                    "Hier liegt eine Einladung: voneinander zu lernen, wie Herz und Mund zusammenfinden."
                ],
                en: [
                    "The more communicatively mature partner may build bridges here – with patience and without condescension.",
                    "The different NVC competencies can become a field for growth.",
                    "Here lies an invitation: Learning from each other how heart and mouth find their way together."
                ]
            },
            beide_niedrig: {
                de: [
                    "Die kommunikative Ebene ist das größte Wachstumsfeld dieser Verbindung.",
                    "Beide dürfen lernen, Bedürfnisse statt Vorwürfe zu äußern – das ist die Arbeit.",
                    "Ohne bewusste Kommunikationsarbeit kann der Alltag zur Kampfzone werden."
                ],
                en: [
                    "The communicative level is the greatest growth area of this connection.",
                    "Both may learn to express needs instead of accusations – that is the work.",
                    "Without conscious communication work, everyday life can become a battlefield."
                ]
            }
        },

        // Konfliktpotenzial (poetisch formuliert)
        conflictPotential: {
            niedrig: [
                "Das Konfliktpotenzial ruht still – Differenzen werden eher zum Gespräch als zum Kampf.",
                "Stürme sind selten in dieser Verbindung – und wenn, dann kurz."
            ],
            mittel: [
                "Konflikte werden kommen – doch sie sind Einladungen, tiefer zu verstehen.",
                "Die Reibung zwischen euch kann wärmen, aber auch brennen – bewusster Umgang ist gefragt."
            ],
            hoch: [
                "Hier ist das Potenzial für intensive Auseinandersetzungen – Stoff zum Wachsen oder zum Scheitern.",
                "Die Spannung zwischen euren Welten kann explosiv werden – das erfordert reife Werkzeuge."
            ]
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PHRASEN-BIBLIOTHEK: RESONANZ
    // ═══════════════════════════════════════════════════════════════════════════

    const resonanzPhrases = {
        // Sehr hohe Resonanz (R ≥ 1.08)
        harmonie: [
            "Eure Resonanz schwingt hoch ({r}) – Kopf und Herz sprechen dieselbe Sprache. Logos und Pathos verstärken sich gegenseitig wie zwei Stimmen im Kanon.",
            "Ein seltener Klang: Bei R={r} harmonieren eure rationalen und emotionalen Frequenzen wie ein gut gestimmtes Orchester.",
            "Die Resonanz von {r} zeigt eine tiefe Übereinstimmung – hier kann Vertrauen wie von selbst wachsen.",
            "Mit einer Resonanz von {r} seid ihr wie zwei Stimmgabeln, die sich gegenseitig zum Schwingen bringen."
        ],
        // Gute Resonanz (R 1.02-1.07)
        resonanz: [
            "Eine gute Schwingung bei R={r} – eure Wellenlängen sind nah genug, um sich zu finden, verschieden genug, um interessant zu bleiben.",
            "Bei R={r} entsteht ein harmonisches Feld zwischen euch – hier können Kopf und Herz gemeinsam tanzen.",
            "Die Resonanz von {r} deutet auf eine lebendige Verbindung hin – nicht perfekt, aber authentisch.",
            "Mit R={r} findet ihr einen gemeinsamen Rhythmus, auch wenn die Melodien verschieden sind."
        ],
        // Neutrale Resonanz (R 0.98-1.01)
        neutral: [
            "Bei R={r} steht die Verbindung auf neutralem Boden – weder starke Anziehung noch Abstoßung bestimmen das Feld.",
            "Eine Resonanz von {r} ist wie eine leere Leinwand – was daraus wird, malt ihr selbst.",
            "Mit R={r} seid ihr weder Magnete noch fremde Sterne – die Richtung bestimmt euer bewusstes Handeln.",
            "Die neutrale Schwingung bei R={r} lässt alles offen – hier entscheidet die Arbeit, nicht die Chemie."
        ],
        // Leichte Spannung (R 0.93-0.97)
        spannung: [
            "Bei R={r} zeigt sich eine leichte Dissonanz zwischen Denken und Fühlen – das fordert bewusste Brückenarbeit.",
            "Eine Resonanz von {r} deutet auf unterschiedliche Grundtöne hin – Harmonie muss hier aktiv gesucht werden.",
            "Mit R={r} sprechen Kopf und Herz verschiedene Dialekte – Übersetzungsarbeit ist gefragt.",
            "Die Spannung bei R={r} kann fruchtbar werden, wenn beide bereit sind, den anderen Ton zu hören."
        ],
        // Dissonanz (R < 0.93)
        dissonanz: [
            "Bei R={r} stehen die Frequenzen in deutlicher Spannung – Logos und Pathos scheinen verschiedene Lieder zu singen.",
            "Eine Resonanz von {r} zeigt: Hier treffen verschiedene Welten aufeinander. Verbindung ist möglich, aber sie kostet Arbeit.",
            "Mit R={r} ist die natürliche Schwingung mehr Reibung als Resonanz – das kann schleifen oder funkeln.",
            "Die Dissonanz bei R={r} ist kein Urteil, sondern ein Hinweis: Hier braucht es bewusstes Brückenbauen."
        ]
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // GEMEINSAME BEDÜRFNISSE - Phrasen
    // ═══════════════════════════════════════════════════════════════════════════

    const sharedNeedsPhrases = {
        intro: [
            "Im Kern teilt ihr die Sehnsucht nach {needs} – hier findet ihr euren gemeinsamen Boden.",
            "Was euch verbindet, liegt tief: Das Bedürfnis nach {needs} pulsiert in beiden Herzen.",
            "{needs} – diese Bedürfnisse sprechen in euch beiden dieselbe Sprache.",
            "Eure Seelen treffen sich bei {needs} – hier versteht ihr euch ohne Worte.",
            "Der gemeinsame Nenner eurer Herzen: {needs}. Hier könnt ihr ankern."
        ],
        connecting: [
            "Dieses gemeinsame Feld kann Anker und Quelle zugleich sein.",
            "Auf diesem Fundament lässt sich bauen.",
            "Diese Schnittmenge ist euer sicherer Hafen.",
            "Hier liegt die Brücke zwischen euren Welten."
        ]
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // HILFSFUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Wählt deterministisch aber variabel eine Phrase aus einem Array
     * @param {Array} phrases - Array von Phrasen
     * @param {number} seed - Hash/Seed für deterministische Auswahl
     * @returns {string} Ausgewählte Phrase
     */
    function selectPhrase(phrases, seed) {
        if (!phrases || phrases.length === 0) return '';
        const index = Math.abs(seed) % phrases.length;
        return phrases[index];
    }

    /**
     * Ersetzt Variablen in einer Phrase
     * @param {string} phrase - Phrase mit {variablen}
     * @param {Object} vars - Object mit Variablen-Werten
     * @returns {string} Phrase mit ersetzten Variablen
     */
    function fillVariables(phrase, vars) {
        if (!phrase) return '';
        let result = phrase;
        for (const [key, value] of Object.entries(vars)) {
            result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
        }
        return result;
    }

    /**
     * Verbindet Sätze mit Übergangsphrasen
     * @param {Array} sentences - Array von Sätzen
     * @param {number} seed - Hash für Varianz
     * @returns {string} Fließender Text
     */
    function connectSentences(sentences, seed) {
        if (!sentences || sentences.length === 0) return '';
        if (sentences.length === 1) return sentences[0];

        let result = sentences[0];

        for (let i = 1; i < sentences.length; i++) {
            const sentence = sentences[i];
            if (!sentence) continue;

            // Wähle passende Übergangsphrase basierend auf Position und Seed
            let transitionType;
            if (i === sentences.length - 1) {
                transitionType = 'resulting';
            } else if (i % 2 === 0) {
                transitionType = 'additive';
            } else {
                transitionType = 'contrast';
            }

            const transitionOptions = transitions[transitionType];
            const transition = selectPhrase(transitionOptions, seed + i * 7);

            // Prüfe, ob die Übergangsphrase am Satzende steht (mit Komma)
            if (transition.endsWith(',')) {
                result += ` ${transition} ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
            } else {
                result += ` ${transition} ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
            }
        }

        return result;
    }

    /**
     * Erzeugt einen Hash aus den Faktor-Werten für deterministische Varianz
     */
    function generateHash(arch1, arch2, dom1, dom2, score) {
        const str = `${arch1}_${arch2}_${dom1}_${dom2}_${Math.floor(score / 10)}`;
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // HAUPTFUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Generiert poetischen Text für "ICH/PARTNER BRINGT MIT"
     * @param {Object} archetype - Archetyp-Definition
     * @param {Object} dimensions - Person-Dimensionen (dominanz, gfk, etc.)
     * @param {string} name - Name des Archetyps
     * @param {number} seed - Hash für Varianz
     * @returns {string} Fließender Pathos-Text
     */
    function generatePersonText(archetype, dimensions, name, seed) {
        const parts = [];
        const vars = { name: name };

        // 1. Dynamische Qualität (Pirsig)
        if (archetype?.pirsig?.dynamicQuality !== undefined) {
            const dynQual = archetype.pirsig.dynamicQuality;
            let phrases;
            if (dynQual >= 0.7) {
                phrases = personPhrases.dynamicHigh;
            } else if (dynQual >= 0.4) {
                phrases = personPhrases.dynamicMid;
            } else {
                phrases = personPhrases.dynamicLow;
            }
            parts.push(fillVariables(selectPhrase(phrases, seed), vars));
        }

        // 2. Natürlichkeit (Osho)
        if (archetype?.osho?.naturalness !== undefined) {
            const nat = archetype.osho.naturalness;
            if (nat >= 0.7) {
                parts.push(fillVariables(selectPhrase(personPhrases.naturalnessHigh, seed + 3), vars));
            } else if (nat >= 0.4) {
                parts.push(fillVariables(selectPhrase(personPhrases.naturalnessMid, seed + 3), vars));
            }
        }

        // 3. Dominanz-Energie (dominanz kann Objekt {primary, secondary} oder String sein)
        const domRaw = dimensions?.dominanz;
        const dom = typeof domRaw === 'object' ? (domRaw?.primary || null) : domRaw;
        if (dom && personPhrases.dominance[dom]) {
            parts.push(fillVariables(selectPhrase(personPhrases.dominance[dom], seed + 5), vars));
        }

        // 4. Kernwerte (wenn vorhanden)
        if (archetype?.coreValues?.length >= 2) {
            const values = archetype.coreValues.slice(0, 2).join(' und ');
            vars.values = values;
            parts.push(fillVariables(selectPhrase(personPhrases.coreValuesIntro, seed + 7), vars));
        }

        // 5. GFK-Kompetenz (NVC)
        const gfk = dimensions?.gfk;
        if (gfk && personPhrases.gfk[gfk]) {
            parts.push(fillVariables(selectPhrase(getLocalizedPhrases(personPhrases.gfk[gfk]), seed + 11), vars));
        }

        // Verbinde mit fließenden Übergängen (aber nicht zu viele)
        // Maximal 3-4 Sätze für guten Lesefluss
        const selectedParts = parts.slice(0, 4);
        return connectSentences(selectedParts, seed);
    }

    /**
     * Generiert poetischen Text für "DARAUS ENTSTEHT" (Synthese)
     * @param {Object} config - Alle relevanten Daten
     * @returns {string} Fließender Synthese-Text
     */
    function generateSyntheseText(config) {
        const {
            ichArch, partnerArch,
            ichName, partnerName,
            ichDimensions, partnerDimensions,
            overallScore,
            archStatements, domStatements, orientStatements,
            seed
        } = config;

        const parts = [];
        const vars = { ich: ichName, partner: partnerName };

        // 1. Tonalitäts-Eröffnung
        const tonality = getTonality(overallScore);
        const opening = fillVariables(
            selectPhrase(synthesePhrases.openings[tonality], seed),
            vars
        );
        parts.push(opening);

        // 2. Archetyp-Statement (aus bestehender Bibliothek)
        if (archStatements?.pathos) {
            const gemeinsam = archStatements.pathos.gemeinsam || [];
            const spannung = archStatements.pathos.spannung || [];
            const all = [...gemeinsam, ...spannung];
            const archStatement = selectPhrase(all, seed + 7);
            if (archStatement) parts.push(archStatement);
        }

        // 3. Dynamik-Interaktion
        const ichDyn = ichArch?.pirsig?.dynamicQuality || 0.5;
        const partnerDyn = partnerArch?.pirsig?.dynamicQuality || 0.5;
        const dynDiff = Math.abs(ichDyn - partnerDyn);

        let dynPhrases;
        if (dynDiff < 0.2) {
            dynPhrases = synthesePhrases.dynamicInteraction.similar;
        } else if (dynDiff > 0.4 && tonality !== 'positiv') {
            dynPhrases = synthesePhrases.dynamicInteraction.challenging;
        } else {
            dynPhrases = synthesePhrases.dynamicInteraction.complementary;
        }
        parts.push(selectPhrase(dynPhrases, seed + 13));

        // 4. Dominanz-Dynamik (wenn relevant)
        const ichDom = ichDimensions?.dominanz;
        const partnerDom = partnerDimensions?.dominanz;
        if (ichDom && partnerDom) {
            const isKomplementaer =
                (ichDom === 'dominant' && partnerDom === 'submissiv') ||
                (ichDom === 'submissiv' && partnerDom === 'dominant');
            const isFlexibel = ichDom === 'switch' || partnerDom === 'switch';

            let domPhrases;
            if (isKomplementaer) {
                domPhrases = synthesePhrases.dominanceInteraction.komplementaer;
            } else if (isFlexibel) {
                domPhrases = synthesePhrases.dominanceInteraction.flexibel;
            } else {
                domPhrases = synthesePhrases.dominanceInteraction.aehnlich;
            }
            parts.push(selectPhrase(domPhrases, seed + 17));
        }

        // 5. GFK-Kommunikationsdynamik
        const ichGfk = ichDimensions?.gfk;
        const partnerGfk = partnerDimensions?.gfk;
        if (ichGfk && partnerGfk) {
            let gfkPhrases;
            if (ichGfk === 'hoch' && partnerGfk === 'hoch') {
                gfkPhrases = getLocalizedPhrases(synthesePhrases.gfkInteraction.beide_hoch);
            } else if (ichGfk === 'niedrig' && partnerGfk === 'niedrig') {
                gfkPhrases = getLocalizedPhrases(synthesePhrases.gfkInteraction.beide_niedrig);
            } else {
                gfkPhrases = getLocalizedPhrases(synthesePhrases.gfkInteraction.gemischt);
            }
            parts.push(selectPhrase(gfkPhrases, seed + 23));
        }

        // Begrenze auf 4-5 Sätze für guten Fluss
        const selectedParts = parts.slice(0, 5);
        return connectSentences(selectedParts, seed);
    }

    /**
     * Generiert poetischen Text für "GEMEINSAME BEDÜRFNISSE"
     * @param {Array} sharedNeeds - Array von gemeinsamen Bedürfnissen
     * @param {number} seed - Hash für Varianz
     * @returns {string} Poetischer Text über gemeinsame Bedürfnisse
     */
    function generateSharedNeedsText(sharedNeeds, seed) {
        if (!sharedNeeds || sharedNeeds.length === 0) return '';

        // Extrahiere Labels (max 3 für Lesbarkeit)
        const needLabels = sharedNeeds
            .slice(0, 3)
            .map(n => n.label || n)
            .join(', ');

        const vars = { needs: needLabels };
        const intro = fillVariables(selectPhrase(sharedNeedsPhrases.intro, seed), vars);
        const connecting = selectPhrase(sharedNeedsPhrases.connecting, seed + 3);

        return `${intro} ${connecting}`;
    }

    /**
     * Generiert poetischen Resonanz-Text
     * @param {number} R - Resonanz-Wert (0.9 - 1.1)
     * @param {number} seed - Hash für Varianz
     * @returns {string} Poetischer Resonanz-Text
     */
    function generateResonanzText(R, seed) {
        if (R === undefined || R === null) return '';

        const rFormatted = R.toFixed(2);
        const vars = { r: rFormatted };

        let phrases;
        if (R >= 1.08) {
            phrases = resonanzPhrases.harmonie;
        } else if (R >= 1.02) {
            phrases = resonanzPhrases.resonanz;
        } else if (R >= 0.98) {
            phrases = resonanzPhrases.neutral;
        } else if (R >= 0.93) {
            phrases = resonanzPhrases.spannung;
        } else {
            phrases = resonanzPhrases.dissonanz;
        }

        return fillVariables(selectPhrase(phrases, seed), vars);
    }

    /**
     * Hilfsfunktion: Bestimmt Tonalität basierend auf Score
     */
    function getTonality(score) {
        if (score >= 70) return 'positiv';
        if (score >= 40) return 'neutral';
        return 'negativ';
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        generatePersonText,
        generateSyntheseText,
        generateSharedNeedsText,
        generateResonanzText,
        generateHash,
        selectPhrase,
        fillVariables,

        // Expose für erweiterte Nutzung
        phrases: {
            person: personPhrases,
            synthese: synthesePhrases,
            resonanz: resonanzPhrases,
            sharedNeeds: sharedNeedsPhrases,
            transitions,
            metaphors
        }
    };
})();

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PathosTextGenerator;
}
