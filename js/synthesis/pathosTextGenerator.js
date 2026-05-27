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

    function getLang() {
        if (typeof TiageI18n !== 'undefined' && TiageI18n.getLanguage) {
            return TiageI18n.getLanguage();
        }
        return 'de';
    }

    function getLocalizedPhrases(phrases) {
        if (Array.isArray(phrases)) {
            return phrases;
        }
        const lang = getLang();
        return phrases[lang] || phrases.de || [];
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ÜBERGANGSPHRASEN - Verbinden Sätze organisch
    // ═══════════════════════════════════════════════════════════════════════════

    const transitions = {
        additive: {
            de: ["Dabei", "Zugleich", "Und so", "Zudem", "Darüber hinaus", "Außerdem", "Ebenso"],
            en: ["At the same time", "Likewise", "And so", "In addition", "Beyond that", "Furthermore", "Equally"]
        },
        contrast: {
            de: ["Gleichzeitig", "Doch auch", "Dennoch", "Andererseits", "Jedoch"],
            en: ["Simultaneously", "Yet also", "Nevertheless", "On the other hand", "However"]
        },
        resulting: {
            de: ["Damit", "Dadurch", "Folglich", "Entsprechend", "Letztlich"],
            en: ["With this", "Through this", "Consequently", "Accordingly", "Ultimately"]
        },
        connecting: {
            de: [
                "Wenn diese Energien sich begegnen,",
                "Im Zusammenspiel dieser Qualitäten",
                "Dort, wo sich beide treffen,",
                "In der Begegnung dieser Welten"
            ],
            en: [
                "When these energies meet,",
                "In the interplay of these qualities",
                "Where the two come together,",
                "In the encounter of these worlds"
            ]
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // METAPHERN-BIBLIOTHEK
    // ═══════════════════════════════════════════════════════════════════════════

    const metaphors = {
        resonance: {
            de: [
                "auf derselben Wellenlänge schwingen",
                "in harmonischer Frequenz vibrieren",
                "eine gemeinsame Melodie finden",
                "im selben Rhythmus atmen",
                "auf ähnlichen Frequenzen senden"
            ],
            en: [
                "vibrate on the same wavelength",
                "resonate in harmonic frequency",
                "find a shared melody",
                "breathe in the same rhythm",
                "transmit on similar frequencies"
            ]
        },
        energy: {
            de: [
                "wie ein warmer Strom fließen",
                "als lebendige Kraft pulsieren",
                "wie ein inneres Feuer leuchten",
                "als sanfte Welle wirken",
                "wie ein stetiger Wind wehen"
            ],
            en: [
                "flow like a warm current",
                "pulse as a living force",
                "glow like an inner fire",
                "act as a gentle wave",
                "blow like a steady wind"
            ]
        },
        connection: {
            de: [
                "einen gemeinsamen Tanz beginnen",
                "Brücken zwischen den Welten bauen",
                "ein unsichtbares Band weben",
                "sich wie Puzzle-Teile ergänzen",
                "einen Dialog der Seelen führen"
            ],
            en: [
                "begin a shared dance",
                "build bridges between worlds",
                "weave an invisible bond",
                "complement like puzzle pieces",
                "carry on a dialogue of souls"
            ]
        },
        polarity: {
            de: [
                "wie Pole eines Magneten wirken",
                "die Spannung zwischen Nähe und Weite halten",
                "im Spiel von Yin und Yang tanzen",
                "zwischen Anziehung und Freiraum pendeln",
                "das elektrische Feld der Gegensätze spüren"
            ],
            en: [
                "act like poles of a magnet",
                "hold the tension between closeness and distance",
                "dance in the play of Yin and Yang",
                "oscillate between attraction and freedom",
                "sense the electric field of opposites"
            ]
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PHRASEN-BIBLIOTHEK: ICH/PARTNER BRINGT MIT
    // ═══════════════════════════════════════════════════════════════════════════

    const personPhrases = {
        dynamicHigh: {
            de: [
                "{name} trägt eine lebendige, fließende Energie in sich – offen für das Unerwartete, bereit für Transformation.",
                "In {name} pulsiert eine hohe dynamische Qualität: Veränderung ist keine Bedrohung, sondern Einladung.",
                "{name} bewegt sich wie Wasser – anpassungsfähig, spontan, immer im Fluss.",
                "Die Seele von {name} sucht Bewegung: Stillstand ist ihr fremd, Wandel ihre Sprache."
            ],
            en: [
                "{name} carries a vibrant, flowing energy – open to the unexpected, ready for transformation.",
                "In {name} pulses a high dynamic quality: change is not a threat, but an invitation.",
                "{name} moves like water – adaptable, spontaneous, always in flow.",
                "The soul of {name} seeks movement: stillness is foreign to it, change its language."
            ]
        },
        dynamicMid: {
            de: [
                "{name} balanciert geschickt zwischen dem Vertrauten und dem Neuen.",
                "In {name} verbinden sich Wurzeln und Flügel – Stabilität trifft auf leise Abenteuerlust.",
                "{name} weiß, wann es Zeit ist zu ruhen und wann zu fliegen.",
                "Die emotionale Welt von {name} kennt sowohl sichere Häfen als auch offene Meere."
            ],
            en: [
                "{name} skillfully balances between the familiar and the new.",
                "In {name} roots and wings meet – stability meets a quiet sense of adventure.",
                "{name} knows when it is time to rest and when to soar.",
                "The emotional world of {name} knows both safe harbors and open seas."
            ]
        },
        dynamicLow: {
            de: [
                "{name} findet Tiefe in der Beständigkeit – wie ein alter Baum mit starken Wurzeln.",
                "Die Kraft von {name} liegt im Ankern: Vertraute Muster sind keine Einschränkung, sondern Heimat.",
                "{name} schafft emotionale Tiefe durch Kontinuität und verlässliche Präsenz.",
                "In {name} ruht eine stille Stärke – nicht im Wandel, sondern in der Treue zum Wesentlichen."
            ],
            en: [
                "{name} finds depth in constancy – like an old tree with strong roots.",
                "The strength of {name} lies in anchoring: familiar patterns are not restrictions, but home.",
                "{name} creates emotional depth through continuity and reliable presence.",
                "In {name} rests a quiet strength – not in change, but in loyalty to the essential."
            ]
        },
        naturalnessHigh: {
            de: [
                "Authentizität ist für {name} keine Anstrengung – Gefühle fließen wie sie kommen, ungefiltert und echt.",
                "{name} lebt aus dem Herzen: Was gefühlt wird, darf sein, ohne Zensur.",
                "Die emotionale Wahrhaftigkeit von {name} wirkt wie ein klarer Bergbach – transparent und erfrischend.",
                "{name} folgt dem inneren Kompass – gesellschaftliche Masken haben hier keinen Platz."
            ],
            en: [
                "Authenticity requires no effort from {name} – feelings flow as they come, unfiltered and genuine.",
                "{name} lives from the heart: what is felt may simply be, without censorship.",
                "The emotional honesty of {name} works like a clear mountain stream – transparent and refreshing.",
                "{name} follows the inner compass – social masks have no place here."
            ]
        },
        naturalnessMid: {
            de: [
                "{name} verbindet emotionale Intuition mit bewusster Reflexion – ein Tanz zwischen Fühlen und Denken.",
                "In {name} begegnen sich Spontaneität und Bedachtsamkeit.",
                "{name} prüft die eigenen Gefühle, ohne sie zu unterdrücken."
            ],
            en: [
                "{name} combines emotional intuition with conscious reflection – a dance between feeling and thinking.",
                "In {name} spontaneity and thoughtfulness meet.",
                "{name} examines their own feelings without suppressing them."
            ]
        },
        dominance: {
            dominant: {
                de: [
                    "{name} bringt eine führende Energie mit – nicht aus Kontrolle, sondern aus natürlicher Präsenz.",
                    "In {name} lebt die Kraft des Gestaltens: Räume werden geöffnet, Richtungen gegeben.",
                    "Die aktive Energie von {name} schafft Struktur und Klarheit im emotionalen Feld."
                ],
                en: [
                    "{name} brings a guiding energy – not from control, but from natural presence.",
                    "In {name} lives the power of shaping: spaces are opened, directions given.",
                    "The active energy of {name} creates structure and clarity in the emotional field."
                ]
            },
            submissiv: {
                de: [
                    "{name} trägt die Qualität des Empfangens – eine tiefe Hingabefähigkeit, die Raum für andere schafft.",
                    "In {name} liegt eine stille Stärke: Die Kunst, sich führen zu lassen, ohne sich zu verlieren.",
                    "Die rezeptive Energie von {name} ermöglicht Tiefe und Vertrauen."
                ],
                en: [
                    "{name} carries the quality of receiving – a deep capacity for surrender that creates space for others.",
                    "In {name} lies a quiet strength: the art of being led without losing oneself.",
                    "The receptive energy of {name} enables depth and trust."
                ]
            },
            switch: {
                de: [
                    "{name} tanzt zwischen den Polen – mal führend, mal folgend, immer im Gleichgewicht.",
                    "Die Flexibilität von {name} zeigt sich im Wechselspiel: Jede Rolle wird authentisch gelebt.",
                    "In {name} vereinen sich beide Strömungen – wie Ein- und Ausatmen."
                ],
                en: [
                    "{name} dances between the poles – sometimes leading, sometimes following, always in balance.",
                    "The flexibility of {name} shows in the interplay: each role is lived authentically.",
                    "In {name} both currents unite – like breathing in and out."
                ]
            },
            ausgeglichen: {
                de: [
                    "{name} ruht in der Mitte – weder drängend noch zurückweichend.",
                    "Emotionale Balance prägt {name}: Keine Extreme, sondern harmonisches Gleichgewicht.",
                    "In {name} herrscht ein friedliches Zentrum – offen für beide Richtungen."
                ],
                en: [
                    "{name} rests in the center – neither pushing nor retreating.",
                    "Emotional balance shapes {name}: no extremes, but harmonious equilibrium.",
                    "In {name} there is a peaceful center – open to both directions."
                ]
            }
        },
        coreValuesIntro: {
            de: [
                "Im Herzen von {name} pulsieren {values} als tiefe Leitsterne.",
                "{values} – diese Werte sind für {name} nicht Konzept, sondern gelebte Wahrheit.",
                "Was {name} antreibt, lässt sich in zwei Worten fassen: {values}.",
                "Die Seele von {name} wird genährt von {values}."
            ],
            en: [
                "In the heart of {name}, {values} pulse as deep guiding stars.",
                "{values} – these values are for {name} not a concept, but lived truth.",
                "What drives {name} can be summed up in two words: {values}.",
                "The soul of {name} is nourished by {values}."
            ]
        },
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
        needsIntro: {
            de: [
                "Die Seele von {name} nährt sich besonders von",
                "Was {name} wirklich braucht, zeigt sich in",
                "Im Kern sehnt sich {name} nach"
            ],
            en: [
                "The soul of {name} is particularly nourished by",
                "What {name} truly needs shows itself in",
                "At the core, {name} longs for"
            ]
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PHRASEN-BIBLIOTHEK: DARAUS ENTSTEHT (Synthese)
    // ═══════════════════════════════════════════════════════════════════════════

    const synthesePhrases = {
        openings: {
            positiv: {
                de: [
                    "Eine vielversprechende Resonanz entfaltet sich zwischen diesen beiden Seelen.",
                    "Hier begegnen sich zwei Menschen, deren Frequenzen sich natürlich verstärken.",
                    "Die Chemie dieser Verbindung hat das Potenzial, beide zu bereichern.",
                    "Zwischen {ich} und {partner} entsteht ein Feld, das zum Wachsen einlädt.",
                    "Diese Begegnung trägt den Samen tiefer Verbundenheit in sich."
                ],
                en: [
                    "A promising resonance unfolds between these two souls.",
                    "Here two people meet whose frequencies naturally amplify each other.",
                    "The chemistry of this connection has the potential to enrich both.",
                    "Between {ich} and {partner} a field emerges that invites growth.",
                    "This encounter carries the seed of deep connection within it."
                ]
            },
            neutral: {
                de: [
                    "Eine interessante Spannung entfaltet sich zwischen diesen beiden Welten.",
                    "Hier treffen sich unterschiedliche Frequenzen – was daraus wird, liegt in euren Händen.",
                    "Die Dynamik zwischen {ich} und {partner} bietet Chancen und Herausforderungen zugleich.",
                    "Diese Verbindung ist wie ein unbeschriebenes Blatt – das Potenzial wartet auf Gestaltung.",
                    "Zwei verschiedene Melodien begegnen sich – ob Harmonie oder Dissonanz entsteht, zeigt die Zeit."
                ],
                en: [
                    "An interesting tension unfolds between these two worlds.",
                    "Here different frequencies meet – what becomes of them lies in your hands.",
                    "The dynamic between {ich} and {partner} offers both opportunities and challenges.",
                    "This connection is like a blank page – the potential waits to be shaped.",
                    "Two different melodies meet – whether harmony or dissonance emerges, time will tell."
                ]
            },
            negativ: {
                de: [
                    "Hier treffen Welten aufeinander, die unterschiedliche Sprachen sprechen.",
                    "Die Frequenzen dieser Verbindung erfordern bewusste Abstimmungsarbeit.",
                    "Zwischen {ich} und {partner} liegt eine Distanz, die überbrückt werden will.",
                    "Diese Begegnung ist eine Einladung zur Arbeit – an sich selbst und aneinander.",
                    "Die natürliche Schwingung dieser Verbindung sucht noch ihren gemeinsamen Ton."
                ],
                en: [
                    "Here worlds meet that speak different languages.",
                    "The frequencies of this connection require conscious tuning work.",
                    "Between {ich} and {partner} lies a distance that wants to be bridged.",
                    "This encounter is an invitation to work – on oneself and with each other.",
                    "The natural vibration of this connection is still seeking its common tone."
                ]
            }
        },
        dynamicInteraction: {
            similar: {
                de: [
                    "Beide schwingen auf einer ähnlichen emotionalen Frequenz – das schafft natürliche Resonanz und müheloses Verstehen.",
                    "Eure dynamischen Qualitäten sind Geschwister – ihr versteht ohne Worte, was der andere braucht.",
                    "Wie zwei Instrumente im selben Takt spielt ihr auf derselben emotionalen Wellenlänge.",
                    "Die Ähnlichkeit eurer inneren Rhythmen ermöglicht einen Tanz ohne viele Worte."
                ],
                en: [
                    "Both vibrate on a similar emotional frequency – this creates natural resonance and effortless understanding.",
                    "Your dynamic qualities are siblings – you understand without words what the other needs.",
                    "Like two instruments in the same rhythm, you play on the same emotional wavelength.",
                    "The similarity of your inner rhythms enables a dance without many words."
                ]
            },
            complementary: {
                de: [
                    "Eure unterschiedlichen emotionalen Tempi können sich wunderbar ergänzen – der eine gibt Halt, der andere Flügel.",
                    "Wo der eine ruht, bringt der andere Bewegung – diese Polarität kann bereichern.",
                    "Die verschiedenen Frequenzen laden zu einem interessanten Tanz ein: Stillstand und Bewegung im Wechsel.",
                    "Wie Sonne und Mond bringt ihr verschiedene Qualitäten – zusammen entsteht ein vollständiges Bild."
                ],
                en: [
                    "Your different emotional tempos can complement each other wonderfully – one provides grounding, the other wings.",
                    "Where one rests, the other brings movement – this polarity can enrich.",
                    "The different frequencies invite an interesting dance: stillness and movement in alternation.",
                    "Like sun and moon you bring different qualities – together a complete picture emerges."
                ]
            },
            challenging: {
                de: [
                    "Die verschiedenen emotionalen Tempi erfordern bewusste Abstimmung und Geduld.",
                    "Hier begegnen sich unterschiedliche Geschwindigkeiten – das braucht Achtsamkeit und Kommunikation.",
                    "Der eine sucht Veränderung, der andere Beständigkeit – dieser Spannungsbogen will gehalten werden.",
                    "Die Herausforderung liegt darin, den jeweils anderen Rhythmus nicht als Bedrohung zu erleben."
                ],
                en: [
                    "The different emotional tempos require conscious coordination and patience.",
                    "Here different speeds meet – this requires mindfulness and communication.",
                    "One seeks change, the other constancy – this arc of tension needs to be held.",
                    "The challenge lies in not experiencing the other's rhythm as a threat."
                ]
            }
        },
        dominanceInteraction: {
            komplementaer: {
                de: [
                    "Die Dominanz-Dynamik zwischen euch ist komplementär – ein natürlicher Fluss von Führen und Folgen.",
                    "Wie zwei Puzzleteile fügen sich eure energetischen Rollen zusammen.",
                    "Hier entsteht eine natürliche Polarität, die Anziehung und Klarheit schafft."
                ],
                en: [
                    "The dominance dynamic between you is complementary – a natural flow of leading and following.",
                    "Like two puzzle pieces, your energetic roles fit together.",
                    "Here a natural polarity emerges that creates attraction and clarity."
                ]
            },
            aehnlich: {
                de: [
                    "Beide bringen ähnliche energetische Qualitäten mit – das schafft Verständnis, aber weniger Spannung.",
                    "Die Gleichartigkeit eurer Dominanz-Energie erfordert bewusste Rollenverhandlung.",
                    "Ohne natürliche Polarität wird der Tanz zur Choreographie – schön, aber geplant."
                ],
                en: [
                    "Both bring similar energetic qualities – this creates understanding, but less tension.",
                    "The similarity of your dominance energy requires conscious role negotiation.",
                    "Without natural polarity, the dance becomes choreography – beautiful, but planned."
                ]
            },
            flexibel: {
                de: [
                    "Die Flexibilität in der Dominanz-Dynamik eröffnet viele Möglichkeiten.",
                    "Hier kann der Tanz immer wieder neu verhandelt werden – Freiheit in der Form.",
                    "Die Rollen sind nicht festgeschrieben – das ermöglicht Wachstum, fordert aber Kommunikation."
                ],
                en: [
                    "The flexibility in the dominance dynamic opens up many possibilities.",
                    "Here the dance can be renegotiated again and again – freedom within form.",
                    "The roles are not fixed – this enables growth, but demands communication."
                ]
            }
        },
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
        conflictPotential: {
            niedrig: {
                de: [
                    "Das Konfliktpotenzial ruht still – Differenzen werden eher zum Gespräch als zum Kampf.",
                    "Stürme sind selten in dieser Verbindung – und wenn, dann kurz."
                ],
                en: [
                    "The conflict potential rests quietly – differences become conversation rather than combat.",
                    "Storms are rare in this connection – and when they come, they are brief."
                ]
            },
            mittel: {
                de: [
                    "Konflikte werden kommen – doch sie sind Einladungen, tiefer zu verstehen.",
                    "Die Reibung zwischen euch kann wärmen, aber auch brennen – bewusster Umgang ist gefragt."
                ],
                en: [
                    "Conflicts will come – but they are invitations to understand more deeply.",
                    "The friction between you can warm, but also burn – conscious handling is required."
                ]
            },
            hoch: {
                de: [
                    "Hier ist das Potenzial für intensive Auseinandersetzungen – Stoff zum Wachsen oder zum Scheitern.",
                    "Die Spannung zwischen euren Welten kann explosiv werden – das erfordert reife Werkzeuge."
                ],
                en: [
                    "Here is the potential for intense confrontations – material for growth or for failure.",
                    "The tension between your worlds can become explosive – this requires mature tools."
                ]
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PHRASEN-BIBLIOTHEK: RESONANZ
    // ═══════════════════════════════════════════════════════════════════════════

    const resonanzPhrases = {
        harmonie: {
            de: [
                "Eure Resonanz schwingt hoch ({r}) – Kopf und Herz sprechen dieselbe Sprache. Logos und Pathos verstärken sich gegenseitig wie zwei Stimmen im Kanon.",
                "Ein seltener Klang: Bei R={r} harmonieren eure rationalen und emotionalen Frequenzen wie ein gut gestimmtes Orchester.",
                "Die Resonanz von {r} zeigt eine tiefe Übereinstimmung – hier kann Vertrauen wie von selbst wachsen.",
                "Mit einer Resonanz von {r} seid ihr wie zwei Stimmgabeln, die sich gegenseitig zum Schwingen bringen."
            ],
            en: [
                "Your resonance vibrates high ({r}) – head and heart speak the same language. Logos and Pathos amplify each other like two voices in a canon.",
                "A rare sound: at R={r} your rational and emotional frequencies harmonize like a well-tuned orchestra.",
                "The resonance of {r} shows a deep alignment – trust can grow here almost by itself.",
                "With a resonance of {r} you are like two tuning forks that set each other vibrating."
            ]
        },
        resonanz: {
            de: [
                "Eine gute Schwingung bei R={r} – eure Wellenlängen sind nah genug, um sich zu finden, verschieden genug, um interessant zu bleiben.",
                "Bei R={r} entsteht ein harmonisches Feld zwischen euch – hier können Kopf und Herz gemeinsam tanzen.",
                "Die Resonanz von {r} deutet auf eine lebendige Verbindung hin – nicht perfekt, aber authentisch.",
                "Mit R={r} findet ihr einen gemeinsamen Rhythmus, auch wenn die Melodien verschieden sind."
            ],
            en: [
                "A good vibration at R={r} – your wavelengths are close enough to find each other, different enough to remain interesting.",
                "At R={r} a harmonious field emerges between you – here head and heart can dance together.",
                "The resonance of {r} points to a lively connection – not perfect, but authentic.",
                "With R={r} you find a shared rhythm, even if the melodies are different."
            ]
        },
        neutral: {
            de: [
                "Bei R={r} steht die Verbindung auf neutralem Boden – weder starke Anziehung noch Abstoßung bestimmen das Feld.",
                "Eine Resonanz von {r} ist wie eine leere Leinwand – was daraus wird, malt ihr selbst.",
                "Mit R={r} seid ihr weder Magnete noch fremde Sterne – die Richtung bestimmt euer bewusstes Handeln.",
                "Die neutrale Schwingung bei R={r} lässt alles offen – hier entscheidet die Arbeit, nicht die Chemie."
            ],
            en: [
                "At R={r} the connection stands on neutral ground – neither strong attraction nor repulsion defines the field.",
                "A resonance of {r} is like a blank canvas – what becomes of it, you paint yourselves.",
                "With R={r} you are neither magnets nor distant stars – the direction is determined by your conscious action.",
                "The neutral vibration at R={r} leaves everything open – here work decides, not chemistry."
            ]
        },
        spannung: {
            de: [
                "Bei R={r} zeigt sich eine leichte Dissonanz zwischen Denken und Fühlen – das fordert bewusste Brückenarbeit.",
                "Eine Resonanz von {r} deutet auf unterschiedliche Grundtöne hin – Harmonie muss hier aktiv gesucht werden.",
                "Mit R={r} sprechen Kopf und Herz verschiedene Dialekte – Übersetzungsarbeit ist gefragt.",
                "Die Spannung bei R={r} kann fruchtbar werden, wenn beide bereit sind, den anderen Ton zu hören."
            ],
            en: [
                "At R={r} a slight dissonance shows between thinking and feeling – this calls for conscious bridge-building.",
                "A resonance of {r} points to different fundamental tones – harmony must be actively sought here.",
                "With R={r} head and heart speak different dialects – translation work is needed.",
                "The tension at R={r} can become fruitful if both are willing to hear the other tone."
            ]
        },
        dissonanz: {
            de: [
                "Bei R={r} stehen die Frequenzen in deutlicher Spannung – Logos und Pathos scheinen verschiedene Lieder zu singen.",
                "Eine Resonanz von {r} zeigt: Hier treffen verschiedene Welten aufeinander. Verbindung ist möglich, aber sie kostet Arbeit.",
                "Mit R={r} ist die natürliche Schwingung mehr Reibung als Resonanz – das kann schleifen oder funkeln.",
                "Die Dissonanz bei R={r} ist kein Urteil, sondern ein Hinweis: Hier braucht es bewusstes Brückenbauen."
            ],
            en: [
                "At R={r} the frequencies are in clear tension – Logos and Pathos seem to sing different songs.",
                "A resonance of {r} shows: different worlds meet here. Connection is possible, but it costs work.",
                "With R={r} the natural vibration is more friction than resonance – that can grind or spark.",
                "The dissonance at R={r} is not a judgment, but a pointer: conscious bridge-building is needed here."
            ]
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // GEMEINSAME BEDÜRFNISSE - Phrasen
    // ═══════════════════════════════════════════════════════════════════════════

    const sharedNeedsPhrases = {
        intro: {
            de: [
                "Im Kern teilt ihr die Sehnsucht nach {needs} – hier findet ihr euren gemeinsamen Boden.",
                "Was euch verbindet, liegt tief: Das Bedürfnis nach {needs} pulsiert in beiden Herzen.",
                "{needs} – diese Bedürfnisse sprechen in euch beiden dieselbe Sprache.",
                "Eure Seelen treffen sich bei {needs} – hier versteht ihr euch ohne Worte.",
                "Der gemeinsame Nenner eurer Herzen: {needs}. Hier könnt ihr ankern."
            ],
            en: [
                "At the core you share the longing for {needs} – here you find your common ground.",
                "What connects you lies deep: the need for {needs} pulses in both hearts.",
                "{needs} – these needs speak the same language in both of you.",
                "Your souls meet at {needs} – here you understand each other without words.",
                "The common denominator of your hearts: {needs}. Here you can anchor."
            ]
        },
        connecting: {
            de: [
                "Dieses gemeinsame Feld kann Anker und Quelle zugleich sein.",
                "Auf diesem Fundament lässt sich bauen.",
                "Diese Schnittmenge ist euer sicherer Hafen.",
                "Hier liegt die Brücke zwischen euren Welten."
            ],
            en: [
                "This shared field can be both anchor and source.",
                "On this foundation, building is possible.",
                "This intersection is your safe harbor.",
                "Here lies the bridge between your worlds."
            ]
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // HILFSFUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    function selectPhrase(phrases, seed) {
        if (!phrases || phrases.length === 0) return '';
        const index = Math.abs(seed) % phrases.length;
        return phrases[index];
    }

    function fillVariables(phrase, vars) {
        if (!phrase) return '';
        let result = phrase;
        for (const [key, value] of Object.entries(vars)) {
            result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), value);
        }
        return result;
    }

    function connectSentences(sentences, seed) {
        if (!sentences || sentences.length === 0) return '';
        if (sentences.length === 1) return sentences[0];

        let result = sentences[0];

        for (let i = 1; i < sentences.length; i++) {
            const sentence = sentences[i];
            if (!sentence) continue;

            let transitionType;
            if (i === sentences.length - 1) {
                transitionType = 'resulting';
            } else if (i % 2 === 0) {
                transitionType = 'additive';
            } else {
                transitionType = 'contrast';
            }

            const transitionOptions = getLocalizedPhrases(transitions[transitionType]);
            const transition = selectPhrase(transitionOptions, seed + i * 7);

            if (transition.endsWith(',')) {
                result += ` ${transition} ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
            } else {
                result += ` ${transition} ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
            }
        }

        return result;
    }

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
            parts.push(fillVariables(selectPhrase(getLocalizedPhrases(phrases), seed), vars));
        }

        // 2. Natürlichkeit (Osho)
        if (archetype?.osho?.naturalness !== undefined) {
            const nat = archetype.osho.naturalness;
            if (nat >= 0.7) {
                parts.push(fillVariables(selectPhrase(getLocalizedPhrases(personPhrases.naturalnessHigh), seed + 3), vars));
            } else if (nat >= 0.4) {
                parts.push(fillVariables(selectPhrase(getLocalizedPhrases(personPhrases.naturalnessMid), seed + 3), vars));
            }
        }

        // 3. Dominanz-Energie
        const domRaw = dimensions?.dominanz;
        const dom = typeof domRaw === 'object' ? (domRaw?.primary || null) : domRaw;
        if (dom && personPhrases.dominance[dom]) {
            parts.push(fillVariables(selectPhrase(getLocalizedPhrases(personPhrases.dominance[dom]), seed + 5), vars));
        }

        // 4. Kernwerte (wenn vorhanden)
        if (archetype?.coreValues?.length >= 2) {
            const values = archetype.coreValues.slice(0, 2).join(' und ');
            vars.values = values;
            parts.push(fillVariables(selectPhrase(getLocalizedPhrases(personPhrases.coreValuesIntro), seed + 7), vars));
        }

        // 5. GFK-Kompetenz (NVC)
        const gfk = dimensions?.gfk;
        if (gfk && personPhrases.gfk[gfk]) {
            parts.push(fillVariables(selectPhrase(getLocalizedPhrases(personPhrases.gfk[gfk]), seed + 11), vars));
        }

        const selectedParts = parts.slice(0, 4);
        return connectSentences(selectedParts, seed);
    }

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
            selectPhrase(getLocalizedPhrases(synthesePhrases.openings[tonality]), seed),
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
        parts.push(selectPhrase(getLocalizedPhrases(dynPhrases), seed + 13));

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
            parts.push(selectPhrase(getLocalizedPhrases(domPhrases), seed + 17));
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

        const selectedParts = parts.slice(0, 5);
        return connectSentences(selectedParts, seed);
    }

    function generateSharedNeedsText(sharedNeeds, seed) {
        if (!sharedNeeds || sharedNeeds.length === 0) return '';

        const needLabels = sharedNeeds
            .slice(0, 3)
            .map(n => n.label || n)
            .join(', ');

        const vars = { needs: needLabels };
        const intro = fillVariables(selectPhrase(getLocalizedPhrases(sharedNeedsPhrases.intro), seed), vars);
        const connecting = selectPhrase(getLocalizedPhrases(sharedNeedsPhrases.connecting), seed + 3);

        return `${intro} ${connecting}`;
    }

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

        return fillVariables(selectPhrase(getLocalizedPhrases(phrases), seed), vars);
    }

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
