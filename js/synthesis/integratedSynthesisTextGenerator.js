/**
 * INTEGRATED SYNTHESIS TEXT GENERATOR
 * ====================================
 * Kombinierte Pathos + Logos Textgenerierung mit psychologischer Tiefe
 *
 * Features:
 * - Integration von emotionaler (Pathos) und rationaler (Logos) Perspektive
 * - Psychologische Tiefenerklärungen (Pirsig, Osho, GFK, Attachment Theory)
 * - Innere Konflikte (intrapsychische Spannungen)
 * - Paarkonflikte (interpersonelle Herausforderungen)
 * - Top 10 Ranking-Unterstützung
 *
 * Philosophische Grundlage:
 * - PATHOS (Herz): Emotionen, Bedürfnisse, Resonanz, Intuition
 * - LOGOS (Kopf): Struktur, Werte, Analyse, Kommunikation
 * - INTEGRATION: Beide Perspektiven für ganzheitliches Verständnis
 */

const IntegratedSynthesisTextGenerator = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // INNERE KONFLIKTE (INTRAPSYCHISCHE SPANNUNGEN)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Innere Konflikte entstehen, wenn ein Archetyp widersprüchliche
     * Bedürfnisse oder Werte in sich trägt
     */
    const innerConflicts = {
        single: {
            core: "Autonomie vs. Zugehörigkeit",
            description: "Der Single lebt Freiheit als höchsten Wert, doch das menschliche Grundbedürfnis nach Zugehörigkeit und Intimität kann im Verborgenen nagen.",
            psychological: "Evolutionsbiologisch sind wir als soziale Wesen verdrahtet. Der Single muss aktiv Wege finden, Bindungsbedürfnisse außerhalb romantischer Beziehungen zu stillen – durch tiefe Freundschaften, Familie oder Community.",
            shadow: "Im Schatten liegt die Angst vor Verletzlichkeit. Die demonstrierte Unabhängigkeit kann ein Schutzmechanismus sein – wer nicht bindet, kann nicht verlassen werden.",
            growth: "Wahre Freiheit entsteht, wenn Alleinsein eine bewusste Wahl ist, nicht eine Vermeidungsstrategie. Der reife Single kann Nähe zulassen, ohne Autonomie aufzugeben."
        },
        duo: {
            core: "Verschmelzung vs. Individuation",
            description: "Das Duo sehnt sich nach dem Eins-Werden mit dem Partner, riskiert dabei aber den Verlust der eigenen Identität.",
            psychological: "Die Psychoanalyse spricht von 'symbiotischer Beziehung' – ein Rückfall in frühkindliche Verschmelzungswünsche. Gesunde Liebe braucht jedoch zwei vollständige Individuen.",
            shadow: "Im Schatten liegt Verlustangst. Die Exklusivität kann zur Kontrolle werden, die Treue zur Eifersucht, die Nähe zur Erstickung.",
            growth: "Reifung bedeutet: Den Partner lieben, ohne ihn zu besitzen. Verbundenheit ohne Abhängigkeit. Zwei bleiben, während man Eines wird."
        },
        "duo-flex": {
            core: "Sicherheit vs. Erkundung",
            description: "Duo-Flex will beides: Den sicheren Hafen UND das offene Meer. Diese Spannung erfordert ständige Balance.",
            psychological: "Attachment-Theorie nennt dies 'secure base exploration' – nur wer sich sicher fühlt, kann explorieren. Doch was, wenn die Exploration den sicheren Hafen gefährdet?",
            shadow: "Im Schatten liegt die Angst, sich entscheiden zu müssen. Und das Risiko, dass 'Flexibilität' zur Ausrede wird, keine echte Verbindlichkeit einzugehen.",
            growth: "Reifung bedeutet: Transparenz statt Ausweichen. Die Spannung als kreative Kraft nutzen, statt sie zu leugnen."
        },
        ra: {
            core: "Radikale Freiheit vs. Tiefe Verbindung",
            description: "Relationship Anarchy lehnt alle Normen ab – aber kann man tiefe Verbindung ohne gemeinsame Vereinbarungen aufbauen?",
            psychological: "Die Ablehnung aller Strukturen kann Ausdruck von Angst vor Verbindlichkeit sein. Wahre Anarchie ist nicht Chaos, sondern bewusste Gestaltung ohne fremde Regeln.",
            shadow: "Im Schatten liegt die Bindungsangst, getarnt als Philosophie. Die Gleichwertigkeit aller Beziehungen kann dazu führen, dass keine Beziehung wirklich vertieft wird.",
            growth: "Reifung bedeutet: Eigene Regeln aufstellen können, nicht nur fremde ablehnen. Tiefe ermöglichen, auch wenn sie einschränkt."
        },
        lat: {
            core: "Nähe vs. Eigener Raum",
            description: "LAT lebt den Kompromiss – Beziehung ja, Zusammenleben nein. Doch wo liegt die Grenze zwischen gesundem Raum und emotionaler Distanz?",
            psychological: "Die räumliche Trennung schützt vor Alltags-Konfliktfeldern, kann aber auch verhindern, dass wichtige Auseinandersetzungen stattfinden.",
            shadow: "Im Schatten liegt die Vermeidung von Intimität im Alltäglichen. Qualitätszeit ist schön, aber echte Partnerschaft zeigt sich auch im Unspektakulären.",
            growth: "Reifung bedeutet: Raum als Quelle, nicht als Flucht. Die Fähigkeit entwickeln, auch in Nähe bei sich zu bleiben."
        },
        aromantisch: {
            core: "Authentizität vs. Gesellschaftliche Erwartungen",
            description: "Aromantische Menschen leben gegen den Strom der Amatonormativität. Der innere Konflikt ist oft extern induziert.",
            psychological: "Die ständige Konfrontation mit 'wann heiratest du?' und 'du findest noch jemanden' kann zu Selbstzweifeln führen – auch wenn die eigene Identität klar ist.",
            shadow: "Im Schatten liegt die Gefahr, in Reaktion gegen gesellschaftliche Erwartungen alle emotionale Tiefe abzulehnen.",
            growth: "Reifung bedeutet: Die eigene Identität aus innerem Wissen leben, nicht aus Trotz gegen äußere Erwartungen."
        },
        solopoly: {
            core: "Vielfalt vs. Tiefe",
            description: "Solopoly liebt die Freiheit multipler Verbindungen, riskiert aber, keine wirklich tief werden zu lassen.",
            psychological: "Ohne Primärpartner fehlt der 'sichere Hafen'. Kann man Attachment-Bedürfnisse auf multiple Beziehungen verteilen, oder fragmentiert sich die Seele?",
            shadow: "Im Schatten liegt die Angst vor totaler Hingabe an einen Menschen. Die Vielfalt kann zur Flucht vor Tiefe werden.",
            growth: "Reifung bedeutet: Tiefe auch ohne Exklusivität ermöglichen. Qualität statt Quantität – auch bei multiplen Beziehungen."
        },
        polyamor: {
            core: "Offenheit vs. Kapazität",
            description: "Polyamor liebt die Idee unbegrenzter Liebe – aber Zeit und emotionale Energie sind endlich.",
            psychological: "Die Herausforderung: Jede Beziehung braucht Pflege. Mehr Partner bedeutet mehr Kommunikation, mehr Aushandlung, mehr potenzielle Konflikte.",
            shadow: "Im Schatten liegt die Gefahr, sich zu verzetteln. 'Neue Beziehungsenergie' kann süchtig machen – auf Kosten bestehender Verbindungen.",
            growth: "Reifung bedeutet: Grenzen setzen können. Nicht jede mögliche Verbindung muss gelebt werden. Qualität über Quantität."
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PAARKONFLIKTE (INTERPERSONELLE HERAUSFORDERUNGEN)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Paarkonflikte entstehen aus der Interaktion unterschiedlicher Archetypen
     * Strukturiert nach Konfliktfeld und Lösungsansätzen
     */
    const partnerConflicts = {
        // Autonomie-Verschmelzung Konfliktfeld
        "autonomie-verschmelzung": {
            archetypes: ["single-duo", "ra-duo", "solopoly-duo"],
            title: "Der Nähe-Distanz-Kampf",
            dynamics: {
                pattern: "Der eine zieht näher, der andere weiter weg. Je mehr Verschmelzung gesucht wird, desto mehr Flucht wird ausgelöst.",
                escalation: "Vorwürfe wie 'Du bist nie da!' treffen auf 'Du erstickst mich!' – ein toxischer Kreislauf.",
                core_wound: "Beide Seiten aktivieren ihre tiefsten Ängste: Verlustangst vs. Einengungsangst."
            },
            resolution: {
                understanding: "Beide Bedürfnisse sind legitim. Keiner ist 'zu viel' oder 'zu wenig' – die Frequenzen passen nur nicht automatisch.",
                practical: "Explizite Vereinbarungen über Nähe-Rhythmen. Gemeinsame Zeit fest planen, aber auch Alleinzeit respektieren.",
                growth: "Der Verschmelzende lernt: Nähe entsteht nicht durch Klammern. Der Autonome lernt: Nähe zuzulassen macht nicht schwach."
            }
        },

        // Struktur-Freiheit Konfliktfeld
        "struktur-freiheit": {
            archetypes: ["duo-ra", "duo-flex-ra", "lat-duo"],
            title: "Das Regel-Chaos-Spannungsfeld",
            dynamics: {
                pattern: "Der eine will klare Absprachen, der andere erlebt jede Regel als Käfig.",
                escalation: "Regeln werden aufgestellt und gebrochen. Vertrauen erodiert.",
                core_wound: "Der Strukturierte fühlt sich unsicher. Der Freie fühlt sich kontrolliert."
            },
            resolution: {
                understanding: "Regeln müssen nicht einengen – sie können Freiheit IN Sicherheit ermöglichen.",
                practical: "Wenige, aber heilige Vereinbarungen. Co-Creation statt Diktat.",
                growth: "Der Strukturierte lernt: Kontrolle ist nicht Sicherheit. Der Freie lernt: Verbindlichkeit ist nicht Gefängnis."
            }
        },

        // Exklusivität-Offenheit Konfliktfeld
        "exklusivitaet-offenheit": {
            archetypes: ["duo-polyamor", "duo-solopoly", "duo-duo-flex"],
            title: "Der Treue-Definitions-Konflikt",
            dynamics: {
                pattern: "Was für den einen Treue bedeutet (Exklusivität), ist für den anderen Einschränkung (Monogamiezwang).",
                escalation: "Eifersucht trifft auf Unverständnis. 'Liebst du mich nicht genug?' vs. 'Warum bin ich nicht genug?'",
                core_wound: "Angst, nicht der/die Einzige zu sein vs. Angst, nicht ganz lieben zu dürfen."
            },
            resolution: {
                understanding: "Liebe ist nicht teilbar – aber Zeit und Aufmerksamkeit sind es. Mehr zu lieben bedeutet nicht, weniger zu lieben.",
                practical: "Wenn Öffnung, dann mit extremer Behutsamkeit. Veto-Rechte. Tempo des Langsamereren.",
                growth: "Der Exklusive lernt: Sicherheit kommt von innen, nicht von Kontrolle. Der Offene lernt: Die Bedürfnisse des Partners sind keine Schwäche."
            }
        },

        // Tiefe-Vielfalt Konfliktfeld
        "tiefe-vielfalt": {
            archetypes: ["duo-solopoly", "polyamor-duo-flex", "lat-polyamor"],
            title: "Das Qualität-Quantität-Dilemma",
            dynamics: {
                pattern: "Der eine will tiefe Exklusivzeit, der andere teilt Aufmerksamkeit auf multiple Verbindungen.",
                escalation: "Gefühl, nicht wichtig genug zu sein vs. Gefühl, zu viel zu fordern.",
                core_wound: "Sehnsucht nach 'der einen Person, für die ich die Welt bin' vs. 'Warum soll Liebe Grenzen haben?'"
            },
            resolution: {
                understanding: "Tiefe und Vielfalt schließen sich nicht aus, aber sie erfordern explizite Priorisierung.",
                practical: "Feste 'heilige Zeiten' für die Primärbeziehung. Kalender-Management als Liebesakt.",
                growth: "Der Tiefensuchende lernt: Qualität ist wichtiger als Quantität der Zeit. Der Vielfältige lernt: Echte Priorisierung zeigt sich in Taten, nicht Worten."
            }
        },

        // Kommunikationsstil-Konflikt
        "kommunikationsstil": {
            archetypes: ["alle"],
            title: "Der Dialog der Missverständnisse",
            dynamics: {
                pattern: "Unterschiedliche GFK-Kompetenzen führen zu Eskalationsspiralen. Einer spricht Gefühle, der andere hört Vorwürfe.",
                escalation: "Bedürfnisäußerung wird als Kritik interpretiert. Rückzug wird als Desinteresse gelesen.",
                core_wound: "Nicht gehört werden – das Gefühl, die eigene Wahrheit nicht vermitteln zu können."
            },
            resolution: {
                understanding: "Kommunikation ist Übersetzungsarbeit. Beide sprechen verschiedene emotionale Sprachen.",
                practical: "GFK-Grundregeln gemeinsam lernen. 'Ich'-Aussagen. Bedürfnisse statt Vorwürfe.",
                growth: "Beide lernen: Zuhören ist wichtiger als verstanden werden. Empathie vor Rechtfertigung."
            }
        },

        // Dominanz-Dynamik-Konflikt
        "dominanz-dynamik": {
            archetypes: ["dom-dom", "sub-sub", "alle-unbalanced"],
            title: "Das Macht-Balance-Spiel",
            dynamics: {
                pattern: "Zwei Dominante kämpfen um Führung. Zwei Submissive warten, dass der andere führt.",
                escalation: "Machtkämpfe oder Stillstand. Keiner will nachgeben oder keiner will den ersten Schritt machen.",
                core_wound: "Kontrollverlust-Angst (dominant) oder Überforderungs-Angst (submissiv)."
            },
            resolution: {
                understanding: "Dominanz und Submission sind kontextabhängig. Niemand muss in jeder Situation führen oder folgen.",
                practical: "Domains aufteilen: Wer führt wo? Bewusste Rollenwechsel vereinbaren.",
                growth: "Beide lernen: Stärke zeigt sich auch im Nachgeben. Führen heißt nicht Kontrollieren, Folgen heißt nicht Schwachsein."
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PSYCHOLOGISCHE TIEFENERKLÄRUNGEN
    // ═══════════════════════════════════════════════════════════════════════════

    const psychologicalDepth = {
        // Pirsig-basierte Erklärungen
        pirsig: {
            staticDynamic: {
                title: "Statische vs. Dynamische Qualität",
                explanation: "Pirsigs 'Metaphysics of Quality' unterscheidet zwischen statischer Qualität (bewährte Muster, Stabilität, Tradition) und dynamischer Qualität (Veränderung, Evolution, das Neue). Beziehungen brauchen beides: Genug statische Muster für Sicherheit, genug dynamische Qualität für Wachstum.",
                application: "Wenn zwei Menschen mit sehr unterschiedlichen Qualitätspräferenzen zusammenkommen, prallen Welten aufeinander: Der Statische erlebt den Dynamischen als chaotisch und unzuverlässig. Der Dynamische erlebt den Statischen als erstarrt und langweilig.",
                resolution: "Die Kunst liegt in der Balance: Nicht statisch ODER dynamisch, sondern ein Tanz zwischen beiden. Vereinbarungen schaffen (statisch), die Raum für Überraschungen lassen (dynamisch)."
            },
            qualityEvent: {
                title: "Der 'Quality Event' in Beziehungen",
                explanation: "Pirsig beschreibt 'Quality Events' als Momente, in denen etwas 'stimmt' – vor jeder rationalen Analyse. In Beziehungen sind das Momente echter Verbindung.",
                application: "Wenn Quality Events fehlen, wird die Beziehung zur rationalen Konstruktion ohne Seele. Wenn sie da sind, können sie über viele Unterschiede hinwegtragen.",
                indicator: "Achte darauf: Gibt es Momente, in denen ihr beide spürt 'das ist richtig' – ohne erklären zu können warum?"
            }
        },

        // Osho-basierte Erklärungen
        osho: {
            polarity: {
                title: "Das Polaritätsprinzip",
                explanation: "Osho betonte: Anziehung entsteht durch Gegensätze. Yin zieht Yang an. Ohne Polarität keine Spannung, ohne Spannung keine Leidenschaft.",
                application: "Gleich und gleich gesellt sich gern – aber zündet keine Funken. Gegensätze ziehen sich an – aber können auch kollidieren.",
                balance: "Die Herausforderung: Genug Unterschied für Anziehung, genug Gemeinsamkeit für Verständnis. Der 'Sweet Spot' liegt in der Mitte."
            },
            naturalness: {
                title: "Natürlichkeit vs. Konditionierung",
                explanation: "Osho unterschied zwischen natürlichen Impulsen und gesellschaftlicher Konditionierung. Viele unserer Beziehungserwartungen sind antrainiert, nicht authentisch.",
                application: "Fragen für Selbstreflexion: Will ICH Monogamie – oder wurde mir beigebracht, sie zu wollen? Will ICH heiraten – oder ist das Erwartungsdruck?",
                liberation: "Wahre Freiheit kommt nicht vom Rebellieren gegen alle Normen, sondern vom bewussten Wählen: Was passt zu MIR – unabhängig von 'normal' oder 'alternativ'?"
            },
            love_freedom: {
                title: "Liebe und Freiheit",
                explanation: "Oshos berühmtes Zitat: 'Wenn du jemanden liebst, gib ihm Freiheit – das ist ein Test. Wenn er zurückkommt, ist er dein. Wenn nicht, war er es nie.'",
                application: "Echte Liebe klammert nicht. Sie hält fest UND lässt los. Dieses Paradox ist der Kern jeder reifen Beziehung.",
                practice: "Liebe zeigt sich nicht in Kontrolle, sondern in Vertrauen. Nicht in Besitz, sondern in Freilassen."
            }
        },

        // GFK-basierte Erklärungen
        gfk: {
            needs: {
                title: "Universelle Bedürfnisse",
                explanation: "Rosenbergs GFK basiert auf der Annahme: Hinter jedem Verhalten steckt ein unerfülltes Bedürfnis. Konflikte entstehen nicht aus 'schlechtem Charakter', sondern aus ungehörten Bedürfnissen.",
                application: "Wenn dein Partner etwas tut, das dich verletzt, frage: Welches Bedürfnis versucht er/sie zu erfüllen? Diese Frage verändert alles.",
                practice: "Anstatt: 'Du bist so egoistisch!' → 'Ich habe das Bedürfnis nach Zugehörigkeit. Wie können wir das gemeinsam erfüllen?'"
            },
            empathy: {
                title: "Empathie vor Lösung",
                explanation: "GFK lehrt: Die meisten Menschen brauchen zunächst Empathie, nicht Lösungen. Gehört werden ist oft wichtiger als Recht haben.",
                application: "Bevor du versuchst, den Konflikt zu lösen, stelle sicher, dass beide sich gehört fühlen. Das allein löst oft schon viel.",
                practice: "Wiederhole, was du gehört hast, bevor du antwortest: 'Ich höre, dass du...' Diese simple Technik verändert Gespräche fundamental."
            },
            conflict_transformation: {
                title: "Konflikt als Transformation",
                explanation: "GFK sieht Konflikte nicht als Probleme, sondern als Chancen zur Vertiefung. Jeder Konflikt zeigt unerfüllte Bedürfnisse auf.",
                application: "Die tiefsten Beziehungen sind nicht konfliktfrei, sondern konfliktfähig. Sie wissen, wie man durch Stürme navigiert.",
                growth: "Frage bei jedem Konflikt: Was will hier wachsen? Welches Bedürfnis will gehört werden?"
            }
        },

        // Attachment-basierte Erklärungen
        attachment: {
            styles: {
                title: "Bindungsstile in Beziehungen",
                explanation: "Die Attachment-Theorie (Bowlby, Ainsworth) identifiziert Bindungsmuster: Sicher, Ängstlich, Vermeidend, Desorganisiert. Diese Muster entstehen in der Kindheit und prägen unser Beziehungsverhalten.",
                application: {
                    secure: "Sicher Gebundene können Nähe und Autonomie balancieren. Sie sind der 'sichere Hafen' für Partner.",
                    anxious: "Ängstlich Gebundene suchen viel Bestätigung und reagieren stark auf Distanz. Sie brauchen extra Reassurance.",
                    avoidant: "Vermeidend Gebundene ziehen sich bei Nähe zurück. Sie brauchen Raum, nicht Verfolgung.",
                    disorganized: "Desorganisiert Gebundene schwanken zwischen Annäherung und Flucht. Sie brauchen Konsistenz und Geduld."
                },
                healing: "Gute Nachricht: Bindungsstile können sich ändern. 'Earned Security' entsteht durch bewusste Arbeit und heilsame Beziehungserfahrungen."
            },
            repair: {
                title: "Rupture & Repair",
                explanation: "Forschung zeigt: Nicht die Abwesenheit von Konflikten macht Beziehungen stark, sondern die Fähigkeit zur Reparatur nach Brüchen.",
                application: "Jeder Konflikt ist ein 'Rupture'. Die Stärke einer Beziehung zeigt sich im 'Repair' – wie schnell und vollständig man zurückfindet.",
                practice: "Nach jedem Streit: Aktive Reparatur. 'Ich sehe, dass dich verletzt hat. Das war nicht meine Absicht. Wie können wir das heilen?'"
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // TOP 10 RANKING PHRASEN
    // ═══════════════════════════════════════════════════════════════════════════

    const top10Phrases = {
        rankings: {
            1: {
                title: "Außergewöhnlich hohe Kompatibilität",
                description: "Eine seltene Konstellation: Diese Verbindung vereint tiefe emotionale Resonanz mit struktureller Passung. Hier können beide Partner auf natürliche Weise wachsen.",
                potential: "Höchstes Potenzial"
            },
            2: {
                title: "Sehr hohe Kompatibilität",
                description: "Starke Grundlagen auf emotionaler und rationaler Ebene. Die wenigen Unterschiede sind eher bereichernd als belastend.",
                potential: "Sehr hohes Potenzial"
            },
            3: {
                title: "Hohe Kompatibilität",
                description: "Eine vielversprechende Konstellation mit solider Basis. Kleinere Differenzen bieten Raum für gegenseitiges Lernen.",
                potential: "Hohes Potenzial"
            },
            4: {
                title: "Überdurchschnittliche Kompatibilität",
                description: "Mehr verbindet als trennt. Mit bewusster Kommunikation kann diese Verbindung sehr erfüllend werden.",
                potential: "Gutes Potenzial"
            },
            5: {
                title: "Gute Kompatibilität",
                description: "Eine stabile Grundlage mit Entwicklungsfeldern. Beide Partner bringen wertvolle Qualitäten ein.",
                potential: "Solides Potenzial"
            },
            6: {
                title: "Solide Kompatibilität",
                description: "Die Basis ist tragfähig. Einige Bereiche erfordern aktive Aushandlung und Kompromissbereitschaft.",
                potential: "Moderates Potenzial"
            },
            7: {
                title: "Moderate Kompatibilität",
                description: "Chancen und Herausforderungen halten sich die Waage. Erfolg hängt von der Bereitschaft ab, an Unterschieden zu arbeiten.",
                potential: "Mittleres Potenzial"
            },
            8: {
                title: "Entwicklungsbedürftige Kompatibilität",
                description: "Signifikante Unterschiede erfordern bewusste Arbeit. Erfolg ist möglich, aber nicht garantiert.",
                potential: "Herausforderndes Potenzial"
            },
            9: {
                title: "Herausfordernde Kompatibilität",
                description: "Die Grundkonstellationen divergieren deutlich. Nur mit hoher Bereitschaft zur Entwicklung auf beiden Seiten tragfähig.",
                potential: "Anspruchsvolles Potenzial"
            },
            10: {
                title: "Komplexe Kompatibilität",
                description: "Fundamentale Unterschiede prägen diese Konstellation. Kann funktionieren, erfordert aber außerordentliches Commitment.",
                potential: "Schwieriges Potenzial"
            }
        },

        intro: {
            single: [
                "Im Vergleich mit allen Archetypen zeigt sich:",
                "Die Ranking-Analyse offenbart:",
                "Betrachtet man alle möglichen Konstellationen:"
            ],
            comparison: [
                "Im direkten Vergleich:",
                "Die Gegenüberstellung zeigt:",
                "Analysiert man die Top 10:"
            ]
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // INTEGRIERTE SYNTHESE-PHRASEN
    // ═══════════════════════════════════════════════════════════════════════════

    const integrationPhrases = {
        opening: {
            harmony: [
                "Kopf und Herz sprechen hier dieselbe Sprache. Diese Verbindung ist sowohl emotional resonant als auch strukturell tragfähig.",
                "Selten stimmen Gefühl und Verstand so überein wie in dieser Konstellation.",
                "Hier begegnen sich zwei Menschen, die auf beiden Ebenen – emotional und rational – zueinander finden."
            ],
            tension: [
                "Kopf und Herz bewerten diese Verbindung unterschiedlich. Das schafft Spannung, aber auch Entwicklungspotenzial.",
                "Was sich emotional richtig anfühlt, wirft rational Fragen auf – oder umgekehrt.",
                "Die Diskrepanz zwischen Gefühl und Analyse ist hier Teil der Dynamik."
            ],
            balanced: [
                "Eine ausgewogene Konstellation: Weder euphorisch noch problematisch, aber mit Potenzial.",
                "Pathos und Logos halten sich die Waage – hier entscheidet die bewusste Gestaltung.",
                "Die emotionale und rationale Ebene sind beide neutral – was ihr daraus macht, liegt bei euch."
            ]
        },

        synthesis: {
            strong: [
                "Die Integration zeigt: Dies ist eine Verbindung mit Tiefenpotenzial. Emotionale Resonanz trifft auf wertebasierte Übereinstimmung.",
                "Beide Perspektiven – das Fühlen und das Denken – unterstützen diese Verbindung.",
                "Das Zusammenspiel von Pathos und Logos ist hier konstruktiv: Gefühl und Struktur verstärken sich gegenseitig."
            ],
            moderate: [
                "Die integrierte Betrachtung zeigt Licht und Schatten. Stärken in einem Bereich kompensieren Schwächen im anderen.",
                "Weder emotionale Euphorie noch rationale Begeisterung – aber beides zusammen ergibt ein tragfähiges Bild.",
                "Das Zusammenspiel ist komplex: Was emotional passt, fordert strukturell – und umgekehrt."
            ],
            challenging: [
                "Sowohl emotional als auch rational zeigen sich Herausforderungen. Das ist keine Absage, aber eine Warnung.",
                "Die integrierte Analyse ist ehrlich: Diese Verbindung erfordert erhebliche Bewusstseinsarbeit.",
                "Weder Herz noch Kopf sind spontan begeistert – das bedeutet: Hier muss aktiv gebaut werden."
            ]
        },

        conclusion: {
            positive: [
                "Fazit: Eine Konstellation mit echtem Potenzial. Die Basis ist da – nun gilt es, sie zu nutzen.",
                "Zusammengefasst: Gute Voraussetzungen für eine erfüllende Verbindung. Der Rest ist Arbeit und Commitment.",
                "Das Gesamtbild ist ermutigend: Hier kann etwas Bedeutsames entstehen."
            ],
            neutral: [
                "Fazit: Nicht automatisch einfach, nicht automatisch schwer. Diese Verbindung ist, was ihr daraus macht.",
                "Zusammengefasst: Potential und Herausforderung in Balance. Bewusste Kommunikation ist der Schlüssel.",
                "Das Gesamtbild ist offen: Weder garantierter Erfolg noch vorprogrammiertes Scheitern."
            ],
            challenging: [
                "Fazit: Diese Verbindung ist möglich, aber nicht wahrscheinlich. Sie erfordert außerordentliche Bereitschaft zur Entwicklung.",
                "Zusammengefasst: Die Analyse zeigt fundamentale Unterschiede. Das ist keine Unmöglichkeit, aber eine ernste Herausforderung.",
                "Das Gesamtbild mahnt zur Vorsicht: Wenn beide bereit sind, kann es funktionieren – aber es wird Arbeit kosten."
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

    function generateHash(arch1, arch2, dom1, dom2, score) {
        const str = `integrated_${arch1}_${arch2}_${dom1}_${dom2}_${Math.floor(score / 10)}`;
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }

    function getTonality(score) {
        if (score >= 70) return 'positiv';
        if (score >= 40) return 'neutral';
        return 'negativ';
    }

    function getIntegrationLevel(pathos, logos) {
        const diff = Math.abs(pathos - logos);
        const avg = (pathos + logos) / 2;

        if (diff < 15 && avg >= 65) return 'harmony';
        if (diff < 15 && avg >= 40) return 'balanced';
        if (diff >= 15) return 'tension';
        return 'balanced';
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // HAUPTFUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Generiert Text zu inneren Konflikten eines Archetyps
     * @param {string} archetypeId - ID des Archetyps
     * @param {number} seed - Hash für Varianz
     * @returns {Object} Innere Konflikte Texte
     */
    function generateInnerConflictText(archetypeId, seed) {
        const conflict = innerConflicts[archetypeId];
        if (!conflict) {
            return {
                core: "Keine spezifischen inneren Konflikte identifiziert.",
                description: "",
                psychological: "",
                shadow: "",
                growth: ""
            };
        }
        return conflict;
    }

    /**
     * Identifiziert relevante Paarkonflikte basierend auf Archetyp-Kombination
     * @param {string} arch1Id - Archetyp 1 ID
     * @param {string} arch2Id - Archetyp 2 ID
     * @param {Object} dimensions1 - Dimensionen Person 1
     * @param {Object} dimensions2 - Dimensionen Person 2
     * @returns {Array} Relevante Paarkonflikte
     */
    function identifyPartnerConflicts(arch1Id, arch2Id, dimensions1, dimensions2) {
        const conflicts = [];
        const key = `${arch1Id}-${arch2Id}`;
        const reverseKey = `${arch2Id}-${arch1Id}`;

        // Autonomie-Verschmelzung Check
        const autonomyTypes = ['single', 'ra', 'solopoly'];
        const fusionTypes = ['duo'];
        if ((autonomyTypes.includes(arch1Id) && fusionTypes.includes(arch2Id)) ||
            (fusionTypes.includes(arch1Id) && autonomyTypes.includes(arch2Id))) {
            conflicts.push(partnerConflicts["autonomie-verschmelzung"]);
        }

        // Struktur-Freiheit Check
        const structureTypes = ['duo', 'duo-flex'];
        const freedomTypes = ['ra', 'solopoly'];
        if ((structureTypes.includes(arch1Id) && freedomTypes.includes(arch2Id)) ||
            (freedomTypes.includes(arch1Id) && structureTypes.includes(arch2Id))) {
            conflicts.push(partnerConflicts["struktur-freiheit"]);
        }

        // Exklusivität-Offenheit Check
        const exclusiveTypes = ['duo'];
        const openTypes = ['polyamor', 'solopoly', 'duo-flex'];
        if ((exclusiveTypes.includes(arch1Id) && openTypes.includes(arch2Id)) ||
            (openTypes.includes(arch1Id) && exclusiveTypes.includes(arch2Id))) {
            conflicts.push(partnerConflicts["exklusivitaet-offenheit"]);
        }

        // Dominanz-Dynamik Check
        const dom1 = dimensions1?.dominanz;
        const dom2 = dimensions2?.dominanz;
        if (dom1 && dom2) {
            if ((dom1 === 'dominant' && dom2 === 'dominant') ||
                (dom1 === 'submissiv' && dom2 === 'submissiv')) {
                conflicts.push(partnerConflicts["dominanz-dynamik"]);
            }
        }

        // Kommunikationsstil Check (bei unterschiedlichen GFK-Levels)
        const gfk1 = dimensions1?.gfk;
        const gfk2 = dimensions2?.gfk;
        if (gfk1 && gfk2 && gfk1 !== gfk2) {
            if ((gfk1 === 'hoch' && gfk2 === 'niedrig') ||
                (gfk1 === 'niedrig' && gfk2 === 'hoch')) {
                conflicts.push(partnerConflicts["kommunikationsstil"]);
            }
        }

        return conflicts;
    }

    /**
     * Generiert integrierten Synthese-Text (Pathos + Logos)
     * @param {Object} config - Konfiguration mit allen Daten
     * @returns {Object} Strukturierter integrierter Text
     */
    function generateIntegratedSynthesis(config) {
        const {
            ichArch, partnerArch,
            ichName, partnerName,
            ichDimensions, partnerDimensions,
            pathosScore, logosScore, overallScore,
            resonance, seed
        } = config;

        const vars = { ich: ichName, partner: partnerName };
        const integrationLevel = getIntegrationLevel(pathosScore, logosScore);
        const tonality = getTonality(overallScore);

        // Opening basierend auf Integration Level
        const opening = fillVariables(
            selectPhrase(integrationPhrases.opening[integrationLevel], seed),
            vars
        );

        // Synthesis basierend auf Tonality
        let synthesisType = 'moderate';
        if (tonality === 'positiv') synthesisType = 'strong';
        if (tonality === 'negativ') synthesisType = 'challenging';
        const synthesis = fillVariables(
            selectPhrase(integrationPhrases.synthesis[synthesisType], seed + 7),
            vars
        );

        // Innere Konflikte beider Partner
        const ichInnerConflict = generateInnerConflictText(ichArch?.id || ichName.toLowerCase(), seed);
        const partnerInnerConflict = generateInnerConflictText(partnerArch?.id || partnerName.toLowerCase(), seed + 3);

        // Paarkonflikte
        const partnerConflictsList = identifyPartnerConflicts(
            ichArch?.id || ichName.toLowerCase(),
            partnerArch?.id || partnerName.toLowerCase(),
            ichDimensions,
            partnerDimensions
        );

        // Psychologische Tiefe hinzufügen
        const psychDepth = generatePsychologicalDepthText(ichArch, partnerArch, ichDimensions, partnerDimensions, seed);

        // Conclusion
        let conclusionType = 'neutral';
        if (tonality === 'positiv') conclusionType = 'positive';
        if (tonality === 'negativ') conclusionType = 'challenging';
        const conclusion = selectPhrase(integrationPhrases.conclusion[conclusionType], seed + 13);

        return {
            opening,
            synthesis,
            innerConflicts: {
                ich: ichInnerConflict,
                partner: partnerInnerConflict
            },
            partnerConflicts: partnerConflictsList,
            psychologicalDepth: psychDepth,
            conclusion,
            scores: {
                pathos: pathosScore,
                logos: logosScore,
                overall: overallScore,
                resonance
            },
            integrationLevel,
            tonality
        };
    }

    /**
     * Generiert psychologische Tiefenerklärung
     */
    function generatePsychologicalDepthText(ichArch, partnerArch, ichDim, partnerDim, seed) {
        const texts = [];

        // Pirsig-Analyse
        if (ichArch?.pirsig && partnerArch?.pirsig) {
            const ichStatic = ichArch.pirsig.staticQuality || 0.5;
            const partnerStatic = partnerArch.pirsig.staticQuality || 0.5;
            const diff = Math.abs(ichStatic - partnerStatic);

            if (diff > 0.3) {
                texts.push({
                    source: "Pirsig",
                    title: psychologicalDepth.pirsig.staticDynamic.title,
                    content: `Die unterschiedlichen Qualitätspräferenzen (${ichArch.name}: ${ichStatic.toFixed(1)} statisch, ${partnerArch.name}: ${partnerStatic.toFixed(1)} statisch) erzeugen eine Grundspannung. ` + psychologicalDepth.pirsig.staticDynamic.resolution
                });
            }
        }

        // Osho-Analyse
        if (ichArch?.osho && partnerArch?.osho) {
            const ichNat = ichArch.osho.naturalness || 0.5;
            const partnerNat = partnerArch.osho.naturalness || 0.5;

            if (Math.abs(ichNat - partnerNat) > 0.3) {
                texts.push({
                    source: "Osho",
                    title: psychologicalDepth.osho.naturalness.title,
                    content: `${ichArch.name} lebt mit ${(ichNat * 100).toFixed(0)}% Natürlichkeit, ${partnerArch.name} mit ${(partnerNat * 100).toFixed(0)}%. ` + psychologicalDepth.osho.naturalness.application
                });
            }
        }

        // GFK-Analyse
        const ichGfk = ichDim?.gfk;
        const partnerGfk = partnerDim?.gfk;
        if (ichGfk && partnerGfk && ichGfk !== partnerGfk) {
            texts.push({
                source: "GFK",
                title: psychologicalDepth.gfk.needs.title,
                content: psychologicalDepth.gfk.empathy.application + " " + psychologicalDepth.gfk.empathy.practice
            });
        }

        // Attachment-Analyse (bei sehr unterschiedlichen Autonomie-Bedürfnissen)
        const ichAuto = ichArch?.research?.traits?.autonomy;
        const partnerAuto = partnerArch?.research?.traits?.autonomy;
        if (ichAuto && partnerAuto && ichAuto !== partnerAuto) {
            texts.push({
                source: "Attachment Theory",
                title: psychologicalDepth.attachment.repair.title,
                content: psychologicalDepth.attachment.repair.application + " " + psychologicalDepth.attachment.repair.practice
            });
        }

        return texts;
    }

    /**
     * Generiert Top 10 Ranking Text für einen Archetyp
     * @param {string} archetypeId - Archetyp ID
     * @param {Array} rankings - Array von {archetype, score} sortiert nach Score
     * @param {number} seed - Hash für Varianz
     * @returns {Object} Top 10 Ranking Texte
     */
    function generateTop10RankingText(archetypeId, rankings, seed) {
        const intro = selectPhrase(top10Phrases.intro.single, seed);

        const rankedItems = rankings.slice(0, 10).map((item, index) => {
            const rank = index + 1;
            const rankInfo = top10Phrases.rankings[rank] || top10Phrases.rankings[10];

            return {
                rank,
                archetype: item.archetype,
                score: item.score,
                title: rankInfo.title,
                description: rankInfo.description,
                potential: rankInfo.potential
            };
        });

        return {
            intro,
            baseArchetype: archetypeId,
            rankings: rankedItems,
            summary: `Von den ${rankings.length} möglichen Kombinationen sind hier die Top 10 für ${archetypeId}.`
        };
    }

    /**
     * Generiert vollständigen psychologischen Analysetext
     */
    function generateFullPsychologicalAnalysis(config) {
        const {
            ichArch, partnerArch,
            ichName, partnerName,
            ichDimensions, partnerDimensions,
            pathosScore, logosScore, overallScore,
            resonance, seed
        } = config;

        const sections = [];

        // 1. Integrierte Eröffnung
        const integrated = generateIntegratedSynthesis(config);
        sections.push({
            type: "synthesis",
            title: "Integrierte Synthese",
            content: integrated.opening + " " + integrated.synthesis
        });

        // 2. Innere Konflikte - ICH
        sections.push({
            type: "inner_conflict",
            title: `Innerer Konflikt: ${ichName}`,
            subtitle: integrated.innerConflicts.ich.core,
            content: integrated.innerConflicts.ich.description,
            psychological: integrated.innerConflicts.ich.psychological,
            shadow: integrated.innerConflicts.ich.shadow,
            growth: integrated.innerConflicts.ich.growth
        });

        // 3. Innere Konflikte - PARTNER
        sections.push({
            type: "inner_conflict",
            title: `Innerer Konflikt: ${partnerName}`,
            subtitle: integrated.innerConflicts.partner.core,
            content: integrated.innerConflicts.partner.description,
            psychological: integrated.innerConflicts.partner.psychological,
            shadow: integrated.innerConflicts.partner.shadow,
            growth: integrated.innerConflicts.partner.growth
        });

        // 4. Paarkonflikte
        integrated.partnerConflicts.forEach((conflict, idx) => {
            sections.push({
                type: "partner_conflict",
                title: conflict.title,
                dynamics: conflict.dynamics,
                resolution: conflict.resolution
            });
        });

        // 5. Psychologische Tiefe
        integrated.psychologicalDepth.forEach(depth => {
            sections.push({
                type: "psychological_depth",
                source: depth.source,
                title: depth.title,
                content: depth.content
            });
        });

        // 6. Fazit
        sections.push({
            type: "conclusion",
            title: "Fazit",
            content: integrated.conclusion
        });

        return {
            sections,
            meta: {
                scores: integrated.scores,
                integrationLevel: integrated.integrationLevel,
                tonality: integrated.tonality
            }
        };
    }

    /**
     * Formatiert die Analyse als lesbaren Text
     */
    function formatAnalysisAsText(analysis) {
        const lines = [];

        analysis.sections.forEach(section => {
            lines.push("");
            lines.push(`═══ ${section.title.toUpperCase()} ═══`);

            if (section.subtitle) {
                lines.push(`» ${section.subtitle}`);
            }

            if (section.content) {
                lines.push(section.content);
            }

            if (section.psychological) {
                lines.push("");
                lines.push(`Psychologisch: ${section.psychological}`);
            }

            if (section.shadow) {
                lines.push("");
                lines.push(`Schatten: ${section.shadow}`);
            }

            if (section.growth) {
                lines.push("");
                lines.push(`Wachstum: ${section.growth}`);
            }

            if (section.dynamics) {
                lines.push("");
                lines.push(`Muster: ${section.dynamics.pattern}`);
                lines.push(`Eskalation: ${section.dynamics.escalation}`);
                lines.push(`Kernwunde: ${section.dynamics.core_wound}`);
            }

            if (section.resolution) {
                lines.push("");
                lines.push(`Verständnis: ${section.resolution.understanding}`);
                lines.push(`Praktisch: ${section.resolution.practical}`);
                lines.push(`Wachstum: ${section.resolution.growth}`);
            }
        });

        lines.push("");
        lines.push("═══════════════════════════════════════");
        lines.push(`Pathos-Score: ${analysis.meta.scores.pathos} | Logos-Score: ${analysis.meta.scores.logos}`);
        lines.push(`Gesamtscore: ${analysis.meta.scores.overall} | Resonanz: ${analysis.meta.scores.resonance?.toFixed(2) || 'N/A'}`);
        lines.push(`Integration: ${analysis.meta.integrationLevel} | Tonalität: ${analysis.meta.tonality}`);

        return lines.join('\n');
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Hauptfunktionen
        generateIntegratedSynthesis,
        generateInnerConflictText,
        identifyPartnerConflicts,
        generateTop10RankingText,
        generateFullPsychologicalAnalysis,
        formatAnalysisAsText,
        generatePsychologicalDepthText,

        // Hilfsfunktionen
        generateHash,
        selectPhrase,
        fillVariables,
        getIntegrationLevel,
        getTonality,

        // Daten-Export für erweiterte Nutzung
        data: {
            innerConflicts,
            partnerConflicts,
            psychologicalDepth,
            top10Phrases,
            integrationPhrases
        }
    };
})();

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = IntegratedSynthesisTextGenerator;
}
