/**
 * LOGOS TEXT GENERATOR
 * ====================
 * Dynamische, analytische Textgenerierung für die Tiage-Synthese
 *
 * Philosophische Grundlage:
 * - LOGOS (Pirsigs "klassische Qualität"): Analytisch, strukturiert, rational
 * - Der "Kopf" nach Osho - GFK-Kompetenz wird gemessen, Werte kategorisiert
 *
 * Ziel: Klare, präzise Texte mit fließenden Übergängen - sachlich, aber nicht kalt
 */

const LogosTextGenerator = (function() {
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

    function getLocalizedText(textObj) {
        if (typeof textObj === 'string') return textObj;
        const lang = getLang();
        return textObj[lang] || textObj.de || '';
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ÜBERGANGSPHRASEN - Verbinden analytische Aussagen
    // ═══════════════════════════════════════════════════════════════════════════

    const transitions = {
        additive: {
            de: ["Darüber hinaus", "Ergänzend dazu", "Zudem", "Ferner", "Des Weiteren"],
            en: ["Furthermore", "In addition", "Moreover", "Additionally", "Beyond this"]
        },
        causal: {
            de: ["Somit", "Daher", "Entsprechend", "Folglich", "Dementsprechend"],
            en: ["Thus", "Therefore", "Accordingly", "Consequently", "In line with this"]
        },
        contrast: {
            de: ["Andererseits", "Dennoch", "Gleichwohl", "Dessen ungeachtet", "Allerdings"],
            en: ["On the other hand", "Nevertheless", "Nonetheless", "Despite this", "However"]
        },
        structuring: {
            de: ["Strukturell betrachtet", "Insgesamt", "Grundsätzlich", "Aus analytischer Sicht"],
            en: ["Structurally considered", "Overall", "Fundamentally", "From an analytical perspective"]
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PHRASEN-BIBLIOTHEK: ICH/PARTNER BRINGT MIT (Logos-Perspektive)
    // ═══════════════════════════════════════════════════════════════════════════

    const personPhrases = {
        staticHigh: {
            de: [
                "{name} operiert mit klaren Strukturen und definierten Werten – Verlässlichkeit bildet das Fundament.",
                "Die Beziehungsphilosophie von {name} basiert auf etablierten Mustern und bewährten Prinzipien.",
                "{name} priorisiert Stabilität und Kontinuität in der Beziehungsgestaltung.",
                "Für {name} sind klare Rahmenbedingungen und verbindliche Absprachen essenziell."
            ],
            en: [
                "{name} operates with clear structures and defined values – reliability forms the foundation.",
                "The relationship philosophy of {name} is based on established patterns and proven principles.",
                "{name} prioritizes stability and continuity in relationship design.",
                "For {name} clear frameworks and binding agreements are essential."
            ]
        },
        staticMid: {
            de: [
                "{name} balanciert zwischen Strukturbedürfnis und Anpassungsfähigkeit.",
                "Die Beziehungslogik von {name} kombiniert feste Prinzipien mit situativer Flexibilität.",
                "{name} schätzt Verlässlichkeit, ohne Veränderung grundsätzlich abzulehnen.",
                "Pragmatismus prägt den Ansatz von {name}: Struktur wo nötig, Offenheit wo möglich."
            ],
            en: [
                "{name} balances between the need for structure and adaptability.",
                "The relational logic of {name} combines fixed principles with situational flexibility.",
                "{name} values reliability without fundamentally rejecting change.",
                "Pragmatism shapes {name}'s approach: structure where necessary, openness where possible."
            ]
        },
        staticLow: {
            de: [
                "{name} bevorzugt adaptive Strukturen gegenüber fixen Regelwerken.",
                "Flexibilität ist für {name} kein Kompromiss, sondern Grundprinzip.",
                "Die Beziehungslogik von {name} passt sich dem Kontext an – ohne festgeschriebene Normen.",
                "{name} definiert Beziehungsregeln situativ neu, statt sie vorab festzulegen."
            ],
            en: [
                "{name} prefers adaptive structures over fixed rule sets.",
                "Flexibility is for {name} not a compromise, but a fundamental principle.",
                "The relational logic of {name} adapts to the context – without fixed norms.",
                "{name} redefines relationship rules situationally, rather than setting them in advance."
            ]
        },
        philosophyIntro: {
            de: [
                "Die Beziehungsphilosophie lässt sich zusammenfassen: {philosophy}",
                "Grundlegend gilt für {name}: {philosophy}",
                "Das zugrundeliegende Prinzip: {philosophy}"
            ],
            en: [
                "The relationship philosophy can be summarized: {philosophy}",
                "Fundamentally for {name}: {philosophy}",
                "The underlying principle: {philosophy}"
            ]
        },
        coreValuesIntro: {
            de: [
                "Zentrale Werte sind {values} – diese bilden den Kompass für Beziehungsentscheidungen.",
                "Die Kernwerte {values} definieren, was {name} in Beziehungen priorisiert.",
                "{name} orientiert sich an den Leitwerten {values}."
            ],
            en: [
                "Core values are {values} – these form the compass for relationship decisions.",
                "The core values {values} define what {name} prioritizes in relationships.",
                "{name} is guided by the core values {values}."
            ]
        },
        avoidsIntro: {
            de: [
                "Explizit vermieden werden: {avoids}.",
                "Als problematisch eingestuft: {avoids}.",
                "{name} grenzt sich klar ab von: {avoids}."
            ],
            en: [
                "Explicitly avoided: {avoids}.",
                "Classified as problematic: {avoids}.",
                "{name} clearly distances from: {avoids}."
            ]
        },
        preferencesIntro: {
            de: [
                "Strukturelle Präferenzen umfassen: {prefs}.",
                "Konkrete Rahmenparameter: {prefs}.",
                "Die bevorzugte Konfiguration: {prefs}."
            ],
            en: [
                "Structural preferences include: {prefs}.",
                "Concrete framework parameters: {prefs}.",
                "The preferred configuration: {prefs}."
            ]
        },
        gfk: {
            hoch: {
                de: [
                    "{name} verfügt über hohe GFK-Kompetenz: Die vier Schritte (Beobachtung, Gefühl, Bedürfnis, Bitte) werden konsequent angewandt.",
                    "Kommunikationsstruktur bei {name}: GFK-Niveau hoch – klare Trennung von Beobachtung und Bewertung.",
                    "{name} kommuniziert nach GFK-Standard: Bedürfnisse werden benannt, nicht als Vorwürfe formuliert."
                ],
                en: [
                    "{name} has high NVC competence: The four steps (Observation, Feeling, Need, Request) are consistently applied.",
                    "Communication structure of {name}: NVC level high – clear separation of observation and judgment.",
                    "{name} communicates according to NVC standards: Needs are expressed, not formulated as accusations."
                ]
            },
            mittel: {
                de: [
                    "{name} besitzt GFK-Grundkenntnisse, die unter Belastung nicht immer abrufbar sind.",
                    "Kommunikationsstruktur bei {name}: GFK-Niveau mittel – Theorie bekannt, Praxis variabel.",
                    "Die GFK-Kompetenz von {name} schwankt situationsabhängig."
                ],
                en: [
                    "{name} has basic NVC knowledge, which is not always accessible under stress.",
                    "Communication structure of {name}: NVC level medium – theory known, practice variable.",
                    "The NVC competence of {name} fluctuates depending on the situation."
                ]
            },
            niedrig: {
                de: [
                    "{name} zeigt Entwicklungspotenzial in der Kommunikationsstruktur – reaktive Muster überwiegen.",
                    "Kommunikationsstruktur bei {name}: GFK-Niveau niedrig – Urteile und Vorwürfe dominieren.",
                    "Die Konfliktlösung bei {name} folgt eher reaktiven als strukturierten Mustern."
                ],
                en: [
                    "{name} shows development potential in communication structure – reactive patterns predominate.",
                    "Communication structure of {name}: NVC level low – judgments and accusations dominate.",
                    "Conflict resolution by {name} follows reactive rather than structured patterns."
                ]
            }
        },
        dominance: {
            dominant: {
                de: [
                    "{name} übernimmt strukturell die führende Rolle – Entscheidungsinitiative liegt primär hier.",
                    "Die Beziehungsdynamik wird von {name} aktiv gestaltet und gelenkt.",
                    "{name} agiert als Strukturgeber in der Beziehungsarchitektur."
                ],
                en: [
                    "{name} structurally assumes the leading role – decision initiative lies primarily here.",
                    "The relationship dynamic is actively shaped and directed by {name}.",
                    "{name} acts as a structure-giver in the relationship architecture."
                ]
            },
            submissiv: {
                de: [
                    "{name} präferiert eine empfangende, mitgehende Position in der Beziehungsstruktur.",
                    "Die Rolle von {name} ist komplementär: Unterstützung statt Steuerung.",
                    "{name} bringt Hingabefähigkeit als strukturellen Beitrag ein."
                ],
                en: [
                    "{name} prefers a receptive, responsive position in the relationship structure.",
                    "The role of {name} is complementary: support rather than control.",
                    "{name} contributes capacity for surrender as a structural contribution."
                ]
            },
            switch: {
                de: [
                    "{name} wechselt flexibel zwischen führender und folgender Rolle.",
                    "Rollenflexibilität kennzeichnet {name}: Kontextabhängige Positionierung.",
                    "Die Beziehungsstruktur erlaubt {name} beide Positionen – je nach Situation."
                ],
                en: [
                    "{name} flexibly switches between leading and following roles.",
                    "Role flexibility characterizes {name}: context-dependent positioning.",
                    "The relationship structure allows {name} both positions – depending on the situation."
                ]
            },
            ausgeglichen: {
                de: [
                    "{name} strebt nach symmetrischer Rollenverteilung.",
                    "Gleichwertigkeit ist das strukturelle Leitprinzip für {name}.",
                    "{name} positioniert sich in der Mitte des Dominanz-Spektrums."
                ],
                en: [
                    "{name} strives for symmetric role distribution.",
                    "Equivalence is the structural guiding principle for {name}.",
                    "{name} positions in the center of the dominance spectrum."
                ]
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PHRASEN-BIBLIOTHEK: DARAUS ENTSTEHT (Synthese - analytisch)
    // ═══════════════════════════════════════════════════════════════════════════

    const synthesePhrases = {
        openings: {
            positiv: {
                de: [
                    "Die strukturelle Kompatibilität dieser Konstellation bildet eine tragfähige Basis.",
                    "Die Analyse zeigt hohe Übereinstimmung in den Grundparametern.",
                    "Aus rationaler Perspektive ergänzen sich {ich} und {partner} konstruktiv.",
                    "Die Beziehungsphilosophien beider Seiten weisen signifikante Schnittmengen auf.",
                    "Die Grundstruktur dieser Verbindung ist als stabil zu bewerten."
                ],
                en: [
                    "The structural compatibility of this constellation forms a viable foundation.",
                    "The analysis shows high alignment in the fundamental parameters.",
                    "From a rational perspective, {ich} and {partner} complement each other constructively.",
                    "The relationship philosophies of both sides show significant overlaps.",
                    "The fundamental structure of this connection can be assessed as stable."
                ]
            },
            neutral: {
                de: [
                    "Die strukturelle Analyse zeigt sowohl Potenziale als auch Herausforderungen.",
                    "Die Kompatibilität erfordert bewusste Arbeit an den Unterschieden.",
                    "{ich} und {partner} bringen unterschiedliche, aber kombinierbare Strukturen mit.",
                    "Die Beziehungsparameter liegen im mittleren Kompatibilitätsbereich.",
                    "Das Ergebnis hängt wesentlich von der Kommunikationsqualität ab."
                ],
                en: [
                    "The structural analysis shows both potentials and challenges.",
                    "Compatibility requires conscious work on the differences.",
                    "{ich} and {partner} bring different but combinable structures.",
                    "The relationship parameters are in the medium compatibility range.",
                    "The outcome depends substantially on communication quality."
                ]
            },
            negativ: {
                de: [
                    "Die strukturelle Analyse zeigt fundamentale Unterschiede in den Grundparametern.",
                    "Die Kompatibilität erfordert erhebliche Anpassungsleistung beider Seiten.",
                    "Die Beziehungsphilosophien von {ich} und {partner} divergieren grundlegend.",
                    "Ohne aktive Aushandlung sind strukturelle Konflikte wahrscheinlich.",
                    "Die Grundkonstellation erfordert klärende Gespräche über Erwartungen."
                ],
                en: [
                    "The structural analysis reveals fundamental differences in the basic parameters.",
                    "Compatibility requires considerable adaptation effort from both sides.",
                    "The relationship philosophies of {ich} and {partner} diverge fundamentally.",
                    "Without active negotiation, structural conflicts are probable.",
                    "The basic constellation requires clarifying conversations about expectations."
                ]
            }
        },
        staticInteraction: {
            similar: {
                de: [
                    "Beide teilen ein ähnliches Strukturbedürfnis – dies erleichtert die Abstimmung von Rahmenparametern.",
                    "Die Kompatibilität der Stabilitätspräferenzen ist hoch.",
                    "Strukturell operieren beide auf vergleichbarer Ebene.",
                    "Das gemeinsame Verständnis von Ordnung und Verlässlichkeit ist eine Stärke."
                ],
                en: [
                    "Both share a similar need for structure – this facilitates the coordination of framework parameters.",
                    "The compatibility of stability preferences is high.",
                    "Structurally, both operate on a comparable level.",
                    "The shared understanding of order and reliability is a strength."
                ]
            },
            complementary: {
                de: [
                    "Die unterschiedlichen Strukturbedürfnisse können sich gegenseitig ausbalancieren.",
                    "Wo einer Stabilität einbringt, ermöglicht der andere Flexibilität.",
                    "Die Differenz in den Ordnungspräferenzen kann zur Bereicherung werden.",
                    "Komplementäre Strukturbedürfnisse: Einer ankert, einer exploriert."
                ],
                en: [
                    "The different structural needs can mutually balance each other.",
                    "Where one contributes stability, the other enables flexibility.",
                    "The difference in order preferences can become an enrichment.",
                    "Complementary structural needs: one anchors, one explores."
                ]
            },
            challenging: {
                de: [
                    "Die verschiedenen Vorstellungen von Struktur erfordern explizite Kommunikation.",
                    "Unterschiedliche Stabilitätspräferenzen können zu Reibung führen.",
                    "Die Diskrepanz in den Ordnungsbedürfnissen ist ein Entwicklungsfeld.",
                    "Strukturkonflikte sind wahrscheinlich ohne klare Aushandlung."
                ],
                en: [
                    "The different ideas about structure require explicit communication.",
                    "Different stability preferences can lead to friction.",
                    "The discrepancy in order needs is a development field.",
                    "Structural conflicts are likely without clear negotiation."
                ]
            }
        },
        valueAnalysis: {
            shared: {
                de: [
                    "Geteilte Werte wie {values} bilden ein stabiles Fundament für Verständigung.",
                    "Die Werteschnittmenge ({values}) ermöglicht gemeinsame Orientierung.",
                    "Übereinstimmung bei {values} schafft strukturelle Gemeinsamkeit."
                ],
                en: [
                    "Shared values such as {values} form a stable foundation for understanding.",
                    "The value overlap ({values}) enables shared orientation.",
                    "Agreement on {values} creates structural common ground."
                ]
            },
            conflict: {
                de: [
                    "Potenzieller Wertekonflikt: {ich} priorisiert '{value1}', was {partner} tendenziell meidet.",
                    "Strukturelle Spannung durch unterschiedliche Wertehierarchien ist zu erwarten.",
                    "Die Wertekonstellation zeigt Konfliktpotenzial bei '{value1}'."
                ],
                en: [
                    "Potential value conflict: {ich} prioritizes '{value1}', which {partner} tends to avoid.",
                    "Structural tension through different value hierarchies is to be expected.",
                    "The value constellation shows conflict potential regarding '{value1}'."
                ]
            },
            different: {
                de: [
                    "Die Wertesysteme überlappen wenig – dies erfordert aktive Brückenarbeit.",
                    "Unterschiedliche Wertepriorisierung macht explizite Aushandlung notwendig."
                ],
                en: [
                    "The value systems overlap little – this requires active bridge-building.",
                    "Different value prioritization makes explicit negotiation necessary."
                ]
            }
        },
        dominanceInteraction: {
            komplementaer: {
                de: [
                    "Die Dominanz-Struktur ist komplementär – klare Rollenverteilung erleichtert Navigation.",
                    "Die asymmetrische Rollenkonfiguration ermöglicht eindeutige Zuständigkeiten.",
                    "Strukturell ergänzen sich führende und folgende Position optimal."
                ],
                en: [
                    "The dominance structure is complementary – clear role distribution facilitates navigation.",
                    "The asymmetric role configuration enables clear responsibilities.",
                    "Structurally, the leading and following positions complement each other optimally."
                ]
            },
            aehnlich: {
                de: [
                    "Ähnliche Dominanz-Positionen erfordern bewusste Rollenaushandlung.",
                    "Ohne natürliche Rollendifferenzierung sind Kompetenzüberschneidungen möglich.",
                    "Die symmetrische Dominanz-Struktur braucht explizite Aufgabenteilung."
                ],
                en: [
                    "Similar dominance positions require conscious role negotiation.",
                    "Without natural role differentiation, competency overlaps are possible.",
                    "The symmetric dominance structure requires explicit task division."
                ]
            },
            flexibel: {
                de: [
                    "Die Rollenflexibilität ermöglicht situative Anpassung.",
                    "Mindestens ein Switch-Anteil erhöht die strukturelle Adaptivität.",
                    "Die Dominanz-Dynamik kann kontextabhängig konfiguriert werden."
                ],
                en: [
                    "Role flexibility enables situational adaptation.",
                    "At least one switch component increases structural adaptivity.",
                    "The dominance dynamic can be configured depending on context."
                ]
            }
        },
        gfkInteraction: {
            beide_hoch: {
                de: [
                    "Die beidseitig hohe GFK-Kompetenz ermöglicht strukturierte Konfliktlösung.",
                    "Kommunikationsstruktur: Beide können Bedürfnisse klar artikulieren – gute Prognose.",
                    "Das kommunikative Werkzeug ist auf beiden Seiten vorhanden."
                ],
                en: [
                    "The mutually high NVC competence enables structured conflict resolution.",
                    "Communication structure: Both can articulate needs clearly – good prognosis.",
                    "The communicative tools are present on both sides."
                ]
            },
            gemischt: {
                de: [
                    "Die unterschiedlichen GFK-Niveaus erfordern Geduld des kompetenteren Parts.",
                    "Kommunikations-Asymmetrie: Der GFK-Versierte kann Brücken bauen.",
                    "Das Gefälle in der Kommunikationsstruktur ist ein Lernfeld."
                ],
                en: [
                    "The different NVC levels require patience from the more competent partner.",
                    "Communication asymmetry: The NVC-skilled partner can build bridges.",
                    "The gap in communication structure is a learning field."
                ]
            },
            beide_niedrig: {
                de: [
                    "Beidseitig niedrige GFK-Kompetenz erhöht das Eskalationsrisiko.",
                    "Kommunikationsstruktur: Entwicklungsfeld für beide Seiten.",
                    "Ohne Investment in Kommunikationsfähigkeiten sind Konflikte schwer zu lösen."
                ],
                en: [
                    "Mutually low NVC competence increases the risk of escalation.",
                    "Communication structure: A development field for both sides.",
                    "Without investment in communication skills, conflicts are difficult to resolve."
                ]
            }
        },
        categories: {
            A: {
                positiv: { de: "Die Beziehungsphilosophien sind kompatibel.", en: "The relationship philosophies are compatible." },
                negativ: { de: "Fundamentale Unterschiede in der Beziehungsphilosophie erfordern Klärung.", en: "Fundamental differences in relationship philosophy require clarification." }
            },
            B: {
                positiv: { de: "Die Lebensstil-Kompatibilität ist gegeben.", en: "Lifestyle compatibility is present." },
                negativ: { de: "Unterschiedliche Lebensstil-Vorstellungen können zu Reibung führen.", en: "Different lifestyle expectations can lead to friction." }
            },
            C: {
                positiv: { de: "Die Kommunikationskompatibilität unterstützt die Verbindung.", en: "Communication compatibility supports the connection." },
                negativ: { de: "Kommunikationsmuster divergieren – hier liegt Entwicklungsbedarf.", en: "Communication patterns diverge – development potential lies here." }
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PHRASEN-BIBLIOTHEK: RESONANZ (Logos-Perspektive)
    // ═══════════════════════════════════════════════════════════════════════════

    const resonanzPhrases = {
        harmonie: {
            de: [
                "Resonanz-Koeffizient R={r}: Hohe Übereinstimmung zwischen rationaler und emotionaler Ebene. Die Struktur trägt.",
                "Bei R={r} zeigt die Analyse: Logos und Pathos sind synchronisiert – eine stabile Konfiguration.",
                "Der Resonanzwert von {r} indiziert hohe Kohärenz zwischen Denken und Fühlen.",
                "R={r} bedeutet: Die Verbindung ist auf mehreren Ebenen fundiert."
            ],
            en: [
                "Resonance coefficient R={r}: High alignment between rational and emotional levels. The structure holds.",
                "At R={r} the analysis shows: Logos and Pathos are synchronized – a stable configuration.",
                "The resonance value of {r} indicates high coherence between thinking and feeling.",
                "R={r} means: The connection is grounded on multiple levels."
            ]
        },
        resonanz: {
            de: [
                "Resonanz-Koeffizient R={r}: Gute Abstimmung der rationalen und emotionalen Parameter.",
                "Bei R={r} ist die Grundstruktur solide – Kopf und Herz sprechen ähnliche Sprachen.",
                "Der Resonanzwert {r} zeigt eine funktionierende Balance.",
                "R={r}: Die Kompatibilität ist auf beiden Ebenen gegeben."
            ],
            en: [
                "Resonance coefficient R={r}: Good alignment of rational and emotional parameters.",
                "At R={r} the fundamental structure is solid – head and heart speak similar languages.",
                "The resonance value {r} shows a functional balance.",
                "R={r}: Compatibility is present on both levels."
            ]
        },
        neutral: {
            de: [
                "Resonanz-Koeffizient R={r}: Neutraler Bereich – weder starke Anziehung noch Abstoßung.",
                "Bei R={r} ist das Ergebnis offen – die Qualität wird durch bewusste Gestaltung bestimmt.",
                "Der Resonanzwert {r} zeigt: Hier entscheidet die Arbeit an der Beziehung.",
                "R={r}: Die Grundkonstellation ist neutral – Potenzial muss aktiv entwickelt werden."
            ],
            en: [
                "Resonance coefficient R={r}: Neutral range – neither strong attraction nor repulsion.",
                "At R={r} the outcome is open – quality is determined by conscious shaping.",
                "The resonance value {r} shows: here the work on the relationship decides.",
                "R={r}: The basic constellation is neutral – potential must be actively developed."
            ]
        },
        spannung: {
            de: [
                "Resonanz-Koeffizient R={r}: Leichte Diskrepanz zwischen rationaler und emotionaler Bewertung.",
                "Bei R={r} zeigen sich Unterschiede – bewusste Kommunikation ist erforderlich.",
                "Der Resonanzwert {r} indiziert ein Spannungsfeld zwischen Logos und Pathos.",
                "R={r}: Die unterschiedlichen Ebenen erfordern Brückenarbeit."
            ],
            en: [
                "Resonance coefficient R={r}: Slight discrepancy between rational and emotional assessment.",
                "At R={r} differences appear – conscious communication is required.",
                "The resonance value {r} indicates a tension field between Logos and Pathos.",
                "R={r}: The different levels require bridge-building."
            ]
        },
        dissonanz: {
            de: [
                "Resonanz-Koeffizient R={r}: Deutliche Diskrepanz zwischen rationalen und emotionalen Parametern.",
                "Bei R={r} ist die Grundstruktur herausfordernd – erhebliche Anpassungsleistung erforderlich.",
                "Der Resonanzwert {r} zeigt: Kopf und Herz bewerten diese Verbindung unterschiedlich.",
                "R={r}: Ohne aktive Arbeit an den Unterschieden ist die Prognose zurückhaltend."
            ],
            en: [
                "Resonance coefficient R={r}: Significant discrepancy between rational and emotional parameters.",
                "At R={r} the fundamental structure is challenging – considerable adaptation is required.",
                "The resonance value {r} shows: head and heart evaluate this connection differently.",
                "R={r}: Without active work on the differences, the prognosis is cautious."
            ]
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // GEMEINSAME WERTE - Phrasen
    // ═══════════════════════════════════════════════════════════════════════════

    const sharedValuesPhrases = {
        intro: {
            de: [
                "Die gemeinsame Wertebasis umfasst: {values}. Dies schafft strukturelle Anknüpfungspunkte.",
                "Übereinstimmung bei den Werten {values} bildet ein stabiles Fundament.",
                "Die geteilten Leitwerte ({values}) ermöglichen gemeinsame Orientierung.",
                "Strukturelle Gemeinsamkeit durch geteilte Werte: {values}."
            ],
            en: [
                "The shared value base includes: {values}. This creates structural connection points.",
                "Agreement on the values {values} forms a stable foundation.",
                "The shared guiding values ({values}) enable shared orientation.",
                "Structural common ground through shared values: {values}."
            ]
        },
        connecting: {
            de: [
                "Diese Schnittmenge ist tragfähig.",
                "Hier liegt die Basis für Verständigung.",
                "Darauf lässt sich aufbauen."
            ],
            en: [
                "This intersection is viable.",
                "Here lies the basis for understanding.",
                "Building on this is possible."
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
                transitionType = 'causal';
            } else if (i % 3 === 0) {
                transitionType = 'structuring';
            } else if (i % 2 === 0) {
                transitionType = 'additive';
            } else {
                transitionType = 'contrast';
            }

            const transitionOptions = getLocalizedPhrases(transitions[transitionType]);
            const transition = selectPhrase(transitionOptions, seed + i * 7);

            result += ` ${transition} ${sentence.charAt(0).toLowerCase()}${sentence.slice(1)}`;
        }

        return result;
    }

    function generateHash(arch1, arch2, dom1, dom2, score) {
        const str = `logos_${arch1}_${arch2}_${dom1}_${dom2}_${Math.floor(score / 10)}`;
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

        // 1. Statische Qualität (Pirsig)
        if (archetype?.pirsig?.staticQuality !== undefined) {
            const statQual = archetype.pirsig.staticQuality;
            let phrases;
            if (statQual >= 0.7) {
                phrases = personPhrases.staticHigh;
            } else if (statQual >= 0.4) {
                phrases = personPhrases.staticMid;
            } else {
                phrases = personPhrases.staticLow;
            }
            parts.push(fillVariables(selectPhrase(getLocalizedPhrases(phrases), seed), vars));
        }

        // 2. Beziehungsphilosophie (wenn vorhanden und lang genug)
        if (archetype?.pirsig?.interpretation && archetype.pirsig.interpretation.length > 50) {
            const philosophy = archetype.pirsig.interpretation.split('.')[0] + '.';
            vars.philosophy = philosophy;
        }

        // 3. Kernwerte
        if (archetype?.coreValues?.length >= 2) {
            const values = archetype.coreValues.slice(0, 3).join(', ');
            vars.values = values;
            parts.push(fillVariables(selectPhrase(getLocalizedPhrases(personPhrases.coreValuesIntro), seed + 3), vars));
        }

        // 4. Vermeidungsmuster
        if (archetype?.avoids?.length >= 2) {
            const avoids = archetype.avoids.slice(0, 2).join(' und ');
            vars.avoids = avoids;
            parts.push(fillVariables(selectPhrase(getLocalizedPhrases(personPhrases.avoidsIntro), seed + 5), vars));
        }

        // 5. Dominanz-Rolle
        const domRaw = dimensions?.dominanz;
        const dom = typeof domRaw === 'object' ? (domRaw?.primary || null) : domRaw;
        if (dom && personPhrases.dominance[dom]) {
            parts.push(fillVariables(selectPhrase(getLocalizedPhrases(personPhrases.dominance[dom]), seed + 7), vars));
        }

        // 6. GFK-Kompetenz
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
            archStatements,
            categoryScores,
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
        if (archStatements?.logos) {
            const gemeinsam = archStatements.logos.gemeinsam || [];
            const unterschied = archStatements.logos.unterschied || [];
            const all = tonality === 'negativ' ? [...gemeinsam, ...unterschied] : gemeinsam;
            const archStatement = selectPhrase(all.length > 0 ? all : unterschied, seed + 7);
            if (archStatement) parts.push(archStatement);
        }

        // 3. Statische Qualitäts-Interaktion
        const ichStat = ichArch?.pirsig?.staticQuality || 0.5;
        const partnerStat = partnerArch?.pirsig?.staticQuality || 0.5;
        const statDiff = Math.abs(ichStat - partnerStat);

        let statPhrases;
        if (statDiff < 0.2) {
            statPhrases = synthesePhrases.staticInteraction.similar;
        } else if (statDiff > 0.4 && tonality !== 'positiv') {
            statPhrases = synthesePhrases.staticInteraction.challenging;
        } else {
            statPhrases = synthesePhrases.staticInteraction.complementary;
        }
        parts.push(selectPhrase(getLocalizedPhrases(statPhrases), seed + 13));

        // 4. Werte-Analyse
        if (ichArch?.coreValues && partnerArch?.coreValues) {
            const sharedValues = ichArch.coreValues.filter(v => partnerArch.coreValues.includes(v));
            if (sharedValues.length > 0) {
                vars.values = sharedValues.slice(0, 2).join(' und ');
                parts.push(fillVariables(selectPhrase(getLocalizedPhrases(synthesePhrases.valueAnalysis.shared), seed + 17), vars));
            } else {
                const conflicts = ichArch.coreValues.filter(v => partnerArch.avoids?.includes(v));
                if (conflicts.length > 0) {
                    vars.value1 = conflicts[0];
                    parts.push(fillVariables(selectPhrase(getLocalizedPhrases(synthesePhrases.valueAnalysis.conflict), seed + 17), vars));
                }
            }
        }

        // 5. Dominanz-Dynamik
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
            parts.push(selectPhrase(getLocalizedPhrases(domPhrases), seed + 23));
        }

        // 6. GFK-Kommunikationsstruktur
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
            parts.push(selectPhrase(gfkPhrases, seed + 29));
        }

        const selectedParts = parts.slice(0, 5);
        return connectSentences(selectedParts, seed);
    }

    function generateSharedValuesText(sharedValues, seed) {
        if (!sharedValues || sharedValues.length === 0) return '';

        const valueLabels = sharedValues
            .slice(0, 3)
            .map(v => v.label || v)
            .join(', ');

        const vars = { values: valueLabels };
        const intro = fillVariables(selectPhrase(getLocalizedPhrases(sharedValuesPhrases.intro), seed), vars);
        const connecting = selectPhrase(getLocalizedPhrases(sharedValuesPhrases.connecting), seed + 3);

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
        generateSharedValuesText,
        generateResonanzText,
        generateHash,
        selectPhrase,
        fillVariables,
        getLocalizedText,

        phrases: {
            person: personPhrases,
            synthese: synthesePhrases,
            resonanz: resonanzPhrases,
            sharedValues: sharedValuesPhrases,
            transitions
        }
    };
})();

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LogosTextGenerator;
}
