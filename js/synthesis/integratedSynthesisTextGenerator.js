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
    // LANGUAGE HELPER - Ermittelt aktuelle Sprache und wählt lokalisierte Texte
    // ═══════════════════════════════════════════════════════════════════════════

    function getLang() {
        if (typeof TiageI18n !== 'undefined' && TiageI18n.getLanguage) {
            return TiageI18n.getLanguage();
        }
        return 'de';
    }

    function getLocalizedText(text) {
        if (typeof text === 'string') return text;
        const lang = getLang();
        return text[lang] || text.de || '';
    }

    function getLocalizedPhrases(phrases) {
        if (Array.isArray(phrases)) return phrases;
        const lang = getLang();
        return phrases[lang] || phrases.de || [];
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // INNERE KONFLIKTE (INTRAPSYCHISCHE SPANNUNGEN)
    // ═══════════════════════════════════════════════════════════════════════════

    const innerConflicts = {
        single: {
            core: { de: "Autonomie vs. Zugehörigkeit", en: "Autonomy vs. Belonging" },
            description: { de: "Der Single lebt Freiheit als höchsten Wert, doch das menschliche Grundbedürfnis nach Zugehörigkeit und Intimität kann im Verborgenen nagen.", en: "The Single lives freedom as the highest value, yet the basic human need for belonging and intimacy can gnaw in the background." },
            psychological: { de: "Evolutionsbiologisch sind wir als soziale Wesen verdrahtet. Der Single muss aktiv Wege finden, Bindungsbedürfnisse außerhalb romantischer Beziehungen zu stillen – durch tiefe Freundschaften, Familie oder Community.", en: "Evolutionarily, we are wired as social beings. The Single must actively find ways to meet attachment needs outside of romantic relationships – through deep friendships, family, or community." },
            shadow: { de: "Im Schatten liegt die Angst vor Verletzlichkeit. Die demonstrierte Unabhängigkeit kann ein Schutzmechanismus sein – wer nicht bindet, kann nicht verlassen werden.", en: "In the shadow lies the fear of vulnerability. The demonstrated independence can be a protective mechanism – those who don't attach cannot be left." },
            growth: { de: "Wahre Freiheit entsteht, wenn Alleinsein eine bewusste Wahl ist, nicht eine Vermeidungsstrategie. Der reife Single kann Nähe zulassen, ohne Autonomie aufzugeben.", en: "True freedom arises when being alone is a conscious choice, not an avoidance strategy. The mature Single can allow closeness without giving up autonomy." }
        },
        duo: {
            core: { de: "Verschmelzung vs. Individuation", en: "Merger vs. Individuation" },
            description: { de: "Das Duo sehnt sich nach dem Eins-Werden mit dem Partner, riskiert dabei aber den Verlust der eigenen Identität.", en: "The Duo longs to become one with the partner, but risks losing their own identity." },
            psychological: { de: "Die Psychoanalyse spricht von 'symbiotischer Beziehung' – ein Rückfall in frühkindliche Verschmelzungswünsche. Gesunde Liebe braucht jedoch zwei vollständige Individuen.", en: "Psychoanalysis speaks of 'symbiotic relationship' – a regression to early childhood fusion wishes. Healthy love, however, requires two complete individuals." },
            shadow: { de: "Im Schatten liegt Verlustangst. Die Exklusivität kann zur Kontrolle werden, die Treue zur Eifersucht, die Nähe zur Erstickung.", en: "In the shadow lies fear of loss. Exclusivity can become control, loyalty can become jealousy, closeness can become suffocation." },
            growth: { de: "Reifung bedeutet: Den Partner lieben, ohne ihn zu besitzen. Verbundenheit ohne Abhängigkeit. Zwei bleiben, während man Eines wird.", en: "Maturation means: loving the partner without possessing them. Connection without dependency. Two remaining while becoming one." }
        },
        "duo_flex": {
            core: { de: "Sicherheit vs. Erkundung", en: "Security vs. Exploration" },
            description: { de: "Duo-Flex will beides: Den sicheren Hafen UND das offene Meer. Diese Spannung erfordert ständige Balance.", en: "Duo-Flex wants both: the safe harbor AND the open sea. This tension requires constant balance." },
            psychological: { de: "Attachment-Theorie nennt dies 'secure base exploration' – nur wer sich sicher fühlt, kann explorieren. Doch was, wenn die Exploration den sicheren Hafen gefährdet?", en: "Attachment theory calls this 'secure base exploration' – only those who feel safe can explore. But what if exploration endangers the safe harbor?" },
            shadow: { de: "Im Schatten liegt die Angst, sich entscheiden zu müssen. Und das Risiko, dass 'Flexibilität' zur Ausrede wird, keine echte Verbindlichkeit einzugehen.", en: "In the shadow lies the fear of having to decide. And the risk that 'flexibility' becomes an excuse not to make a genuine commitment." },
            growth: { de: "Reifung bedeutet: Transparenz statt Ausweichen. Die Spannung als kreative Kraft nutzen, statt sie zu leugnen.", en: "Maturation means: transparency instead of evasion. Using the tension as creative force rather than denying it." }
        },
        ra: {
            core: { de: "Radikale Freiheit vs. Tiefe Verbindung", en: "Radical Freedom vs. Deep Connection" },
            description: { de: "Relationship Anarchy lehnt alle Normen ab – aber kann man tiefe Verbindung ohne gemeinsame Vereinbarungen aufbauen?", en: "Relationship Anarchy rejects all norms – but can deep connection be built without shared agreements?" },
            psychological: { de: "Die Ablehnung aller Strukturen kann Ausdruck von Angst vor Verbindlichkeit sein. Wahre Anarchie ist nicht Chaos, sondern bewusste Gestaltung ohne fremde Regeln.", en: "The rejection of all structures can be an expression of fear of commitment. True anarchy is not chaos, but conscious shaping without external rules." },
            shadow: { de: "Im Schatten liegt die Bindungsangst, getarnt als Philosophie. Die Gleichwertigkeit aller Beziehungen kann dazu führen, dass keine Beziehung wirklich vertieft wird.", en: "In the shadow lies fear of attachment, disguised as philosophy. The equal valuing of all relationships can lead to no relationship being truly deepened." },
            growth: { de: "Reifung bedeutet: Eigene Regeln aufstellen können, nicht nur fremde ablehnen. Tiefe ermöglichen, auch wenn sie einschränkt.", en: "Maturation means: being able to set one's own rules, not just rejecting others'. Allowing depth, even when it constrains." }
        },
        lat: {
            core: { de: "Nähe vs. Eigener Raum", en: "Closeness vs. Own Space" },
            description: { de: "LAT lebt den Kompromiss – Beziehung ja, Zusammenleben nein. Doch wo liegt die Grenze zwischen gesundem Raum und emotionaler Distanz?", en: "LAT lives the compromise – relationship yes, cohabitation no. But where is the line between healthy space and emotional distance?" },
            psychological: { de: "Die räumliche Trennung schützt vor Alltags-Konfliktfeldern, kann aber auch verhindern, dass wichtige Auseinandersetzungen stattfinden.", en: "Spatial separation protects from everyday conflict zones, but can also prevent important confrontations from happening." },
            shadow: { de: "Im Schatten liegt die Vermeidung von Intimität im Alltäglichen. Qualitätszeit ist schön, aber echte Partnerschaft zeigt sich auch im Unspektakulären.", en: "In the shadow lies the avoidance of intimacy in the everyday. Quality time is wonderful, but true partnership also shows itself in the unremarkable." },
            growth: { de: "Reifung bedeutet: Raum als Quelle, nicht als Flucht. Die Fähigkeit entwickeln, auch in Nähe bei sich zu bleiben.", en: "Maturation means: space as a source, not an escape. Developing the ability to stay with oneself even in closeness." }
        },
        aromantisch: {
            core: { de: "Authentizität vs. Gesellschaftliche Erwartungen", en: "Authenticity vs. Social Expectations" },
            description: { de: "Aromantische Menschen leben gegen den Strom der Amatonormativität. Der innere Konflikt ist oft extern induziert.", en: "Aromantic people swim against the current of amatonormativity. The inner conflict is often externally induced." },
            psychological: { de: "Die ständige Konfrontation mit 'wann heiratest du?' und 'du findest noch jemanden' kann zu Selbstzweifeln führen – auch wenn die eigene Identität klar ist.", en: "The constant confrontation with 'when are you getting married?' and 'you'll find someone' can lead to self-doubt – even when one's own identity is clear." },
            shadow: { de: "Im Schatten liegt die Gefahr, in Reaktion gegen gesellschaftliche Erwartungen alle emotionale Tiefe abzulehnen.", en: "In the shadow lies the danger of rejecting all emotional depth in reaction to social expectations." },
            growth: { de: "Reifung bedeutet: Die eigene Identität aus innerem Wissen leben, nicht aus Trotz gegen äußere Erwartungen.", en: "Maturation means: living one's own identity from inner knowledge, not from defiance against external expectations." }
        },
        solopoly: {
            core: { de: "Vielfalt vs. Tiefe", en: "Variety vs. Depth" },
            description: { de: "Solopoly liebt die Freiheit multipler Verbindungen, riskiert aber, keine wirklich tief werden zu lassen.", en: "Solopoly loves the freedom of multiple connections, but risks not letting any truly deepen." },
            psychological: { de: "Ohne Primärpartner fehlt der 'sichere Hafen'. Kann man Attachment-Bedürfnisse auf multiple Beziehungen verteilen, oder fragmentiert sich die Seele?", en: "Without a primary partner, the 'safe harbor' is missing. Can attachment needs be distributed across multiple relationships, or does the soul fragment?" },
            shadow: { de: "Im Schatten liegt die Angst vor totaler Hingabe an einen Menschen. Die Vielfalt kann zur Flucht vor Tiefe werden.", en: "In the shadow lies the fear of total surrender to one person. Variety can become a flight from depth." },
            growth: { de: "Reifung bedeutet: Tiefe auch ohne Exklusivität ermöglichen. Qualität statt Quantität – auch bei multiplen Beziehungen.", en: "Maturation means: enabling depth without exclusivity. Quality over quantity – even with multiple relationships." }
        },
        polyamor: {
            core: { de: "Offenheit vs. Kapazität", en: "Openness vs. Capacity" },
            description: { de: "Polyamor liebt die Idee unbegrenzter Liebe – aber Zeit und emotionale Energie sind endlich.", en: "Polyamory loves the idea of unlimited love – but time and emotional energy are finite." },
            psychological: { de: "Die Herausforderung: Jede Beziehung braucht Pflege. Mehr Partner bedeutet mehr Kommunikation, mehr Aushandlung, mehr potenzielle Konflikte.", en: "The challenge: every relationship needs nurturing. More partners means more communication, more negotiation, more potential conflicts." },
            shadow: { de: "Im Schatten liegt die Gefahr, sich zu verzetteln. 'Neue Beziehungsenergie' kann süchtig machen – auf Kosten bestehender Verbindungen.", en: "In the shadow lies the danger of scattering oneself. 'New relationship energy' can become addictive – at the expense of existing connections." },
            growth: { de: "Reifung bedeutet: Grenzen setzen können. Nicht jede mögliche Verbindung muss gelebt werden. Qualität über Quantität.", en: "Maturation means: being able to set limits. Not every possible connection needs to be lived. Quality over quantity." }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PAARKONFLIKTE (INTERPERSONELLE HERAUSFORDERUNGEN)
    // ═══════════════════════════════════════════════════════════════════════════

    const partnerConflicts = {
        "autonomie-verschmelzung": {
            archetypes: ["single-duo", "ra-duo", "solopoly-duo"],
            title: { de: "Der Nähe-Distanz-Kampf", en: "The Closeness-Distance Battle" },
            dynamics: {
                pattern: { de: "Der eine zieht näher, der andere weiter weg. Je mehr Verschmelzung gesucht wird, desto mehr Flucht wird ausgelöst.", en: "One moves closer, the other further away. The more merger is sought, the more flight is triggered." },
                escalation: { de: "Vorwürfe wie 'Du bist nie da!' treffen auf 'Du erstickst mich!' – ein toxischer Kreislauf.", en: "Accusations like 'You're never there!' meet 'You're suffocating me!' – a toxic cycle." },
                core_wound: { de: "Beide Seiten aktivieren ihre tiefsten Ängste: Verlustangst vs. Einengungsangst.", en: "Both sides activate their deepest fears: fear of loss vs. fear of engulfment." }
            },
            resolution: {
                understanding: { de: "Beide Bedürfnisse sind legitim. Keiner ist 'zu viel' oder 'zu wenig' – die Frequenzen passen nur nicht automatisch.", en: "Both needs are legitimate. Neither is 'too much' nor 'too little' – the frequencies just don't automatically match." },
                practical: { de: "Explizite Vereinbarungen über Nähe-Rhythmen. Gemeinsame Zeit fest planen, aber auch Alleinzeit respektieren.", en: "Explicit agreements about closeness rhythms. Schedule shared time, but also respect alone time." },
                growth: { de: "Der Verschmelzende lernt: Nähe entsteht nicht durch Klammern. Der Autonome lernt: Nähe zuzulassen macht nicht schwach.", en: "The merger-seeker learns: closeness doesn't arise from clinging. The autonomous one learns: allowing closeness doesn't make you weak." }
            }
        },

        "struktur-freiheit": {
            archetypes: ["duo-ra", "duo-flex-ra", "lat-duo"],
            title: { de: "Das Regel-Chaos-Spannungsfeld", en: "The Rules-Chaos Tension Field" },
            dynamics: {
                pattern: { de: "Der eine will klare Absprachen, der andere erlebt jede Regel als Käfig.", en: "One wants clear agreements, the other experiences every rule as a cage." },
                escalation: { de: "Regeln werden aufgestellt und gebrochen. Vertrauen erodiert.", en: "Rules are established and broken. Trust erodes." },
                core_wound: { de: "Der Strukturierte fühlt sich unsicher. Der Freie fühlt sich kontrolliert.", en: "The structured one feels insecure. The free one feels controlled." }
            },
            resolution: {
                understanding: { de: "Regeln müssen nicht einengen – sie können Freiheit IN Sicherheit ermöglichen.", en: "Rules don't have to confine – they can enable freedom WITHIN security." },
                practical: { de: "Wenige, aber heilige Vereinbarungen. Co-Creation statt Diktat.", en: "Few, but sacred agreements. Co-creation instead of dictation." },
                growth: { de: "Der Strukturierte lernt: Kontrolle ist nicht Sicherheit. Der Freie lernt: Verbindlichkeit ist nicht Gefängnis.", en: "The structured one learns: control is not security. The free one learns: commitment is not prison." }
            }
        },

        "exklusivitaet-offenheit": {
            archetypes: ["duo-polyamor", "duo-solopoly", "duo-duo-flex"],
            title: { de: "Der Treue-Definitions-Konflikt", en: "The Fidelity Definition Conflict" },
            dynamics: {
                pattern: { de: "Was für den einen Treue bedeutet (Exklusivität), ist für den anderen Einschränkung (Monogamiezwang).", en: "What fidelity means for one (exclusivity) is restriction for the other (coercion into monogamy)." },
                escalation: { de: "Eifersucht trifft auf Unverständnis. 'Liebst du mich nicht genug?' vs. 'Warum bin ich nicht genug?'", en: "Jealousy meets incomprehension. 'Don't you love me enough?' vs. 'Why am I not enough?'" },
                core_wound: { de: "Angst, nicht der/die Einzige zu sein vs. Angst, nicht ganz lieben zu dürfen.", en: "Fear of not being the only one vs. fear of not being allowed to love fully." }
            },
            resolution: {
                understanding: { de: "Liebe ist nicht teilbar – aber Zeit und Aufmerksamkeit sind es. Mehr zu lieben bedeutet nicht, weniger zu lieben.", en: "Love is not divisible – but time and attention are. Loving more does not mean loving less." },
                practical: { de: "Wenn Öffnung, dann mit extremer Behutsamkeit. Veto-Rechte. Tempo des Langsamereren.", en: "If opening, then with extreme care. Veto rights. Pace of the slower one." },
                growth: { de: "Der Exklusive lernt: Sicherheit kommt von innen, nicht von Kontrolle. Der Offene lernt: Die Bedürfnisse des Partners sind keine Schwäche.", en: "The exclusive one learns: security comes from within, not from control. The open one learns: the partner's needs are not weakness." }
            }
        },

        "tiefe-vielfalt": {
            archetypes: ["duo-solopoly", "polyamor-duo-flex", "lat-polyamor"],
            title: { de: "Das Qualität-Quantität-Dilemma", en: "The Quality-Quantity Dilemma" },
            dynamics: {
                pattern: { de: "Der eine will tiefe Exklusivzeit, der andere teilt Aufmerksamkeit auf multiple Verbindungen.", en: "One wants deep exclusive time, the other shares attention across multiple connections." },
                escalation: { de: "Gefühl, nicht wichtig genug zu sein vs. Gefühl, zu viel zu fordern.", en: "Feeling of not being important enough vs. feeling of asking too much." },
                core_wound: { de: "Sehnsucht nach 'der einen Person, für die ich die Welt bin' vs. 'Warum soll Liebe Grenzen haben?'", en: "Longing for 'the one person for whom I am the world' vs. 'Why should love have limits?'" }
            },
            resolution: {
                understanding: { de: "Tiefe und Vielfalt schließen sich nicht aus, aber sie erfordern explizite Priorisierung.", en: "Depth and variety are not mutually exclusive, but they require explicit prioritization." },
                practical: { de: "Feste 'heilige Zeiten' für die Primärbeziehung. Kalender-Management als Liebesakt.", en: "Fixed 'sacred times' for the primary relationship. Calendar management as an act of love." },
                growth: { de: "Der Tiefensuchende lernt: Qualität ist wichtiger als Quantität der Zeit. Der Vielfältige lernt: Echte Priorisierung zeigt sich in Taten, nicht Worten.", en: "The depth-seeker learns: quality is more important than quantity of time. The variety-lover learns: real prioritization shows in actions, not words." }
            }
        },

        "kommunikationsstil": {
            archetypes: ["alle"],
            title: { de: "Der Dialog der Missverständnisse", en: "The Dialogue of Misunderstandings" },
            dynamics: {
                pattern: { de: "Unterschiedliche GFK-Kompetenzen führen zu Eskalationsspiralen. Einer spricht Gefühle, der andere hört Vorwürfe.", en: "Different NVC competencies lead to escalation spirals. One speaks feelings, the other hears accusations." },
                escalation: { de: "Bedürfnisäußerung wird als Kritik interpretiert. Rückzug wird als Desinteresse gelesen.", en: "Expression of needs is interpreted as criticism. Withdrawal is read as disinterest." },
                core_wound: { de: "Nicht gehört werden – das Gefühl, die eigene Wahrheit nicht vermitteln zu können.", en: "Not being heard – the feeling of not being able to convey one's own truth." }
            },
            resolution: {
                understanding: { de: "Kommunikation ist Übersetzungsarbeit. Beide sprechen verschiedene emotionale Sprachen.", en: "Communication is translation work. Both speak different emotional languages." },
                practical: { de: "GFK-Grundregeln gemeinsam lernen. 'Ich'-Aussagen. Bedürfnisse statt Vorwürfe.", en: "Learn NVC basics together. 'I'-statements. Needs instead of accusations." },
                growth: { de: "Beide lernen: Zuhören ist wichtiger als verstanden werden. Empathie vor Rechtfertigung.", en: "Both learn: Listening is more important than being understood. Empathy before justification." }
            }
        },

        "dominanz-dynamik": {
            archetypes: ["dom-dom", "sub-sub", "alle-unbalanced"],
            title: { de: "Das Macht-Balance-Spiel", en: "The Power Balance Game" },
            dynamics: {
                pattern: { de: "Zwei Dominante kämpfen um Führung. Zwei Submissive warten, dass der andere führt.", en: "Two dominants fight for leadership. Two submissives wait for the other to lead." },
                escalation: { de: "Machtkämpfe oder Stillstand. Keiner will nachgeben oder keiner will den ersten Schritt machen.", en: "Power struggles or standstill. No one wants to yield, or no one wants to take the first step." },
                core_wound: { de: "Kontrollverlust-Angst (dominant) oder Überforderungs-Angst (submissiv).", en: "Fear of losing control (dominant) or fear of being overwhelmed (submissive)." }
            },
            resolution: {
                understanding: { de: "Dominanz und Submission sind kontextabhängig. Niemand muss in jeder Situation führen oder folgen.", en: "Dominance and submission are context-dependent. No one must lead or follow in every situation." },
                practical: { de: "Domains aufteilen: Wer führt wo? Bewusste Rollenwechsel vereinbaren.", en: "Divide domains: who leads where? Agree on conscious role changes." },
                growth: { de: "Beide lernen: Stärke zeigt sich auch im Nachgeben. Führen heißt nicht Kontrollieren, Folgen heißt nicht Schwachsein.", en: "Both learn: strength also shows in yielding. Leading doesn't mean controlling, following doesn't mean weakness." }
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PSYCHOLOGISCHE TIEFENERKLÄRUNGEN
    // ═══════════════════════════════════════════════════════════════════════════

    const psychologicalDepth = {
        pirsig: {
            staticDynamic: {
                title: { de: "Statische vs. Dynamische Qualität", en: "Static vs. Dynamic Quality" },
                explanation: { de: "Pirsigs 'Metaphysics of Quality' unterscheidet zwischen statischer Qualität (bewährte Muster, Stabilität, Tradition) und dynamischer Qualität (Veränderung, Evolution, das Neue). Beziehungen brauchen beides: Genug statische Muster für Sicherheit, genug dynamische Qualität für Wachstum.", en: "Pirsig's 'Metaphysics of Quality' distinguishes between static quality (proven patterns, stability, tradition) and dynamic quality (change, evolution, the new). Relationships need both: enough static patterns for security, enough dynamic quality for growth." },
                application: { de: "Wenn zwei Menschen mit sehr unterschiedlichen Qualitätspräferenzen zusammenkommen, prallen Welten aufeinander: Der Statische erlebt den Dynamischen als chaotisch und unzuverlässig. Der Dynamische erlebt den Statischen als erstarrt und langweilig.", en: "When two people with very different quality preferences come together, worlds collide: the static one experiences the dynamic one as chaotic and unreliable. The dynamic one experiences the static one as rigid and boring." },
                resolution: { de: "Die Kunst liegt in der Balance: Nicht statisch ODER dynamisch, sondern ein Tanz zwischen beiden. Vereinbarungen schaffen (statisch), die Raum für Überraschungen lassen (dynamisch).", en: "The art lies in balance: not static OR dynamic, but a dance between both. Creating agreements (static) that leave room for surprises (dynamic)." }
            },
            qualityEvent: {
                title: { de: "Der 'Quality Event' in Beziehungen", en: "The 'Quality Event' in Relationships" },
                explanation: { de: "Pirsig beschreibt 'Quality Events' als Momente, in denen etwas 'stimmt' – vor jeder rationalen Analyse. In Beziehungen sind das Momente echter Verbindung.", en: "Pirsig describes 'Quality Events' as moments when something 'feels right' – before any rational analysis. In relationships, these are moments of genuine connection." },
                application: { de: "Wenn Quality Events fehlen, wird die Beziehung zur rationalen Konstruktion ohne Seele. Wenn sie da sind, können sie über viele Unterschiede hinwegtragen.", en: "When Quality Events are absent, the relationship becomes a rational construction without soul. When they are present, they can carry over many differences." },
                indicator: { de: "Achte darauf: Gibt es Momente, in denen ihr beide spürt 'das ist richtig' – ohne erklären zu können warum?", en: "Pay attention: Are there moments where both feel 'this is right' – without being able to explain why?" }
            }
        },

        osho: {
            polarity: {
                title: { de: "Das Polaritätsprinzip", en: "The Polarity Principle" },
                explanation: { de: "Osho betonte: Anziehung entsteht durch Gegensätze. Yin zieht Yang an. Ohne Polarität keine Spannung, ohne Spannung keine Leidenschaft.", en: "Osho emphasized: attraction arises through opposites. Yin attracts Yang. Without polarity, no tension; without tension, no passion." },
                application: { de: "Gleich und gleich gesellt sich gern – aber zündet keine Funken. Gegensätze ziehen sich an – aber können auch kollidieren.", en: "Like attracts like – but doesn't spark fires. Opposites attract – but can also collide." },
                balance: { de: "Die Herausforderung: Genug Unterschied für Anziehung, genug Gemeinsamkeit für Verständnis. Der 'Sweet Spot' liegt in der Mitte.", en: "The challenge: enough difference for attraction, enough common ground for understanding. The 'sweet spot' lies in between." }
            },
            naturalness: {
                title: { de: "Natürlichkeit vs. Konditionierung", en: "Naturalness vs. Conditioning" },
                explanation: { de: "Osho unterschied zwischen natürlichen Impulsen und gesellschaftlicher Konditionierung. Viele unserer Beziehungserwartungen sind antrainiert, nicht authentisch.", en: "Osho distinguished between natural impulses and social conditioning. Many of our relationship expectations are trained in, not authentic." },
                application: { de: "Fragen für Selbstreflexion: Will ICH Monogamie – oder wurde mir beigebracht, sie zu wollen? Will ICH heiraten – oder ist das Erwartungsdruck?", en: "Questions for self-reflection: Do I WANT monogamy – or was I taught to want it? Do I WANT to get married – or is that external pressure?" },
                liberation: { de: "Wahre Freiheit kommt nicht vom Rebellieren gegen alle Normen, sondern vom bewussten Wählen: Was passt zu MIR – unabhängig von 'normal' oder 'alternativ'?", en: "True freedom comes not from rebelling against all norms, but from conscious choice: What suits ME – regardless of 'normal' or 'alternative'?" }
            },
            love_freedom: {
                title: { de: "Liebe und Freiheit", en: "Love and Freedom" },
                explanation: { de: "Oshos berühmtes Zitat: 'Wenn du jemanden liebst, gib ihm Freiheit – das ist ein Test. Wenn er zurückkommt, ist er dein. Wenn nicht, war er es nie.'", en: "Osho's famous quote: 'If you love someone, give them freedom – it's a test. If they return, they are yours. If not, they never were.'" },
                application: { de: "Echte Liebe klammert nicht. Sie hält fest UND lässt los. Dieses Paradox ist der Kern jeder reifen Beziehung.", en: "Genuine love doesn't cling. It holds AND lets go. This paradox is the core of every mature relationship." },
                practice: { de: "Liebe zeigt sich nicht in Kontrolle, sondern in Vertrauen. Nicht in Besitz, sondern in Freilassen.", en: "Love shows not in control, but in trust. Not in possession, but in release." }
            }
        },

        gfk: {
            needs: {
                title: { de: "Universelle Bedürfnisse", en: "Universal Needs" },
                explanation: { de: "Rosenbergs GFK basiert auf der Annahme: Hinter jedem Verhalten steckt ein unerfülltes Bedürfnis. Konflikte entstehen nicht aus 'schlechtem Charakter', sondern aus ungehörten Bedürfnissen.", en: "Rosenberg's NVC is based on the assumption: Behind every behavior lies an unmet need. Conflicts don't arise from 'bad character', but from unheard needs." },
                application: { de: "Wenn dein Partner etwas tut, das dich verletzt, frage: Welches Bedürfnis versucht er/sie zu erfüllen? Diese Frage verändert alles.", en: "When your partner does something that hurts you, ask: What need is he/she trying to fulfill? This question changes everything." },
                practice: { de: "Anstatt: 'Du bist so egoistisch!' → 'Ich habe das Bedürfnis nach Zugehörigkeit. Wie können wir das gemeinsam erfüllen?'", en: "Instead of: 'You're so selfish!' → 'I have a need for belonging. How can we fulfill this together?'" }
            },
            empathy: {
                title: { de: "Empathie vor Lösung", en: "Empathy Before Solutions" },
                explanation: { de: "GFK lehrt: Die meisten Menschen brauchen zunächst Empathie, nicht Lösungen. Gehört werden ist oft wichtiger als Recht haben.", en: "NVC teaches: Most people need empathy first, not solutions. Being heard is often more important than being right." },
                application: { de: "Bevor du versuchst, den Konflikt zu lösen, stelle sicher, dass beide sich gehört fühlen. Das allein löst oft schon viel.", en: "Before trying to solve the conflict, make sure both feel heard. That alone often resolves much." },
                practice: { de: "Wiederhole, was du gehört hast, bevor du antwortest: 'Ich höre, dass du...' Diese simple Technik verändert Gespräche fundamental.", en: "Repeat what you heard before responding: 'I hear that you...' This simple technique fundamentally changes conversations." }
            },
            conflict_transformation: {
                title: { de: "Konflikt als Transformation", en: "Conflict as Transformation" },
                explanation: { de: "GFK sieht Konflikte nicht als Probleme, sondern als Chancen zur Vertiefung. Jeder Konflikt zeigt unerfüllte Bedürfnisse auf.", en: "NVC sees conflicts not as problems, but as opportunities for deepening. Every conflict reveals unmet needs." },
                application: { de: "Die tiefsten Beziehungen sind nicht konfliktfrei, sondern konfliktfähig. Sie wissen, wie man durch Stürme navigiert.", en: "The deepest relationships are not conflict-free, but conflict-capable. They know how to navigate through storms." },
                growth: { de: "Frage bei jedem Konflikt: Was will hier wachsen? Welches Bedürfnis will gehört werden?", en: "Ask in every conflict: What wants to grow here? What need wants to be heard?" }
            }
        },

        attachment: {
            styles: {
                title: { de: "Bindungsstile in Beziehungen", en: "Attachment Styles in Relationships" },
                explanation: { de: "Die Attachment-Theorie (Bowlby, Ainsworth) identifiziert Bindungsmuster: Sicher, Ängstlich, Vermeidend, Desorganisiert. Diese Muster entstehen in der Kindheit und prägen unser Beziehungsverhalten.", en: "Attachment Theory (Bowlby, Ainsworth) identifies attachment patterns: Secure, Anxious, Avoidant, Disorganized. These patterns develop in childhood and shape all our relationship behavior." },
                application: {
                    secure: { de: "Sicher Gebundene können Nähe und Autonomie balancieren. Sie sind der 'sichere Hafen' für Partner.", en: "Securely attached can balance closeness and autonomy. They are the 'secure base' for their partner." },
                    anxious: { de: "Ängstlich Gebundene suchen viel Bestätigung und reagieren stark auf Distanz. Sie brauchen extra Reassurance.", en: "Anxiously attached seek much reassurance and react strongly to distance. They need extra reassurance." },
                    avoidant: { de: "Vermeidend Gebundene ziehen sich bei Nähe zurück. Sie brauchen Raum, nicht Verfolgung.", en: "Avoidantly attached withdraw when closeness comes. They need space, not pursuit." },
                    disorganized: { de: "Desorganisiert Gebundene schwanken zwischen Annäherung und Flucht. Sie brauchen Konsistenz und Geduld.", en: "Disorganizedly attached oscillate between approach and flight. They need consistency and patience." }
                },
                healing: { de: "Gute Nachricht: Bindungsstile können sich ändern. 'Earned Security' entsteht durch bewusste Arbeit und heilsame Beziehungserfahrungen.", en: "Good news: Attachment styles can change. 'Earned Security' develops through conscious work and healing relationship experiences." }
            },
            repair: {
                title: { de: "Rupture & Repair", en: "Rupture & Repair" },
                explanation: { de: "Forschung zeigt: Nicht die Abwesenheit von Konflikten macht Beziehungen stark, sondern die Fähigkeit zur Reparatur nach Brüchen.", en: "Research shows: what makes relationships strong is not the absence of conflict, but the capacity to repair after ruptures." },
                application: { de: "Jeder Konflikt ist ein 'Rupture'. Die Stärke einer Beziehung zeigt sich im 'Repair' – wie schnell und vollständig man zurückfindet.", en: "Every conflict is a 'Rupture'. The strength of a relationship shows in the 'Repair' – how quickly and fully you find your way back." },
                practice: { de: "Nach jedem Streit: Aktive Reparatur. 'Ich sehe, dass dich verletzt hat. Das war nicht meine Absicht. Wie können wir das heilen?'", en: "After every argument: active repair. 'I see that this hurt you. That wasn't my intention. How can we heal this?'" }
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // TOP 10 RANKING PHRASEN
    // ═══════════════════════════════════════════════════════════════════════════

    const top10Phrases = {
        rankings: {
            1: {
                title: { de: "Außergewöhnlich hohe Kompatibilität", en: "Exceptionally high compatibility" },
                description: { de: "Eine seltene Konstellation: Diese Verbindung vereint tiefe emotionale Resonanz mit struktureller Passung. Hier können beide Partner auf natürliche Weise wachsen.", en: "A rare constellation: this connection combines deep emotional resonance with structural fit. Both partners can grow here naturally." },
                potential: { de: "Höchstes Potenzial", en: "Highest potential" }
            },
            2: {
                title: { de: "Sehr hohe Kompatibilität", en: "Very high compatibility" },
                description: { de: "Starke Grundlagen auf emotionaler und rationaler Ebene. Die wenigen Unterschiede sind eher bereichernd als belastend.", en: "Strong foundations on emotional and rational levels. The few differences are enriching rather than burdensome." },
                potential: { de: "Sehr hohes Potenzial", en: "Very high potential" }
            },
            3: {
                title: { de: "Hohe Kompatibilität", en: "High compatibility" },
                description: { de: "Eine vielversprechende Konstellation mit solider Basis. Kleinere Differenzen bieten Raum für gegenseitiges Lernen.", en: "A promising constellation with a solid basis. Minor differences offer room for mutual learning." },
                potential: { de: "Hohes Potenzial", en: "High potential" }
            },
            4: {
                title: { de: "Überdurchschnittliche Kompatibilität", en: "Above-average compatibility" },
                description: { de: "Mehr verbindet als trennt. Mit bewusster Kommunikation kann diese Verbindung sehr erfüllend werden.", en: "More connects than separates. With conscious communication, this connection can become very fulfilling." },
                potential: { de: "Gutes Potenzial", en: "Good potential" }
            },
            5: {
                title: { de: "Gute Kompatibilität", en: "Good compatibility" },
                description: { de: "Eine stabile Grundlage mit Entwicklungsfeldern. Beide Partner bringen wertvolle Qualitäten ein.", en: "A stable foundation with areas for development. Both partners bring valuable qualities." },
                potential: { de: "Solides Potenzial", en: "Solid potential" }
            },
            6: {
                title: { de: "Solide Kompatibilität", en: "Solid compatibility" },
                description: { de: "Die Basis ist tragfähig. Einige Bereiche erfordern aktive Aushandlung und Kompromissbereitschaft.", en: "The basis is viable. Some areas require active negotiation and willingness to compromise." },
                potential: { de: "Moderates Potenzial", en: "Moderate potential" }
            },
            7: {
                title: { de: "Moderate Kompatibilität", en: "Moderate compatibility" },
                description: { de: "Chancen und Herausforderungen halten sich die Waage. Erfolg hängt von der Bereitschaft ab, an Unterschieden zu arbeiten.", en: "Opportunities and challenges balance each other out. Success depends on willingness to work on differences." },
                potential: { de: "Mittleres Potenzial", en: "Medium potential" }
            },
            8: {
                title: { de: "Entwicklungsbedürftige Kompatibilität", en: "Compatibility needing development" },
                description: { de: "Signifikante Unterschiede erfordern bewusste Arbeit. Erfolg ist möglich, aber nicht garantiert.", en: "Significant differences require conscious work. Success is possible but not guaranteed." },
                potential: { de: "Herausforderndes Potenzial", en: "Challenging potential" }
            },
            9: {
                title: { de: "Herausfordernde Kompatibilität", en: "Challenging compatibility" },
                description: { de: "Die Grundkonstellationen divergieren deutlich. Nur mit hoher Bereitschaft zur Entwicklung auf beiden Seiten tragfähig.", en: "The basic constellations diverge significantly. Viable only with high readiness for development on both sides." },
                potential: { de: "Anspruchsvolles Potenzial", en: "Demanding potential" }
            },
            10: {
                title: { de: "Komplexe Kompatibilität", en: "Complex compatibility" },
                description: { de: "Fundamentale Unterschiede prägen diese Konstellation. Kann funktionieren, erfordert aber außerordentliches Commitment.", en: "Fundamental differences characterize this constellation. Can work, but requires extraordinary commitment." },
                potential: { de: "Schwieriges Potenzial", en: "Difficult potential" }
            }
        },

        intro: {
            single: {
                de: ["Im Vergleich mit allen Archetypen zeigt sich:", "Die Ranking-Analyse offenbart:", "Betrachtet man alle möglichen Konstellationen:"],
                en: ["When compared with all archetypes:", "The ranking analysis reveals:", "Looking at all possible constellations:"]
            },
            comparison: {
                de: ["Im direkten Vergleich:", "Die Gegenüberstellung zeigt:", "Analysiert man die Top 10:"],
                en: ["In direct comparison:", "The juxtaposition shows:", "Analyzing the top 10:"]
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // INTEGRIERTE SYNTHESE-PHRASEN
    // ═══════════════════════════════════════════════════════════════════════════

    const integrationPhrases = {
        opening: {
            harmony: {
                de: [
                    "Kopf und Herz sprechen hier dieselbe Sprache. Diese Verbindung ist sowohl emotional resonant als auch strukturell tragfähig.",
                    "Selten stimmen Gefühl und Verstand so überein wie in dieser Konstellation.",
                    "Hier begegnen sich zwei Menschen, die auf beiden Ebenen – emotional und rational – zueinander finden."
                ],
                en: [
                    "Head and heart speak the same language here. This connection is both emotionally resonant and structurally viable.",
                    "Rarely do feeling and reason agree as much as in this constellation.",
                    "Here two people meet who find their way to each other on both levels – emotional and rational."
                ]
            },
            tension: {
                de: [
                    "Kopf und Herz bewerten diese Verbindung unterschiedlich. Das schafft Spannung, aber auch Entwicklungspotenzial.",
                    "Was sich emotional richtig anfühlt, wirft rational Fragen auf – oder umgekehrt.",
                    "Die Diskrepanz zwischen Gefühl und Analyse ist hier Teil der Dynamik."
                ],
                en: [
                    "Head and heart evaluate this connection differently. That creates tension, but also development potential.",
                    "What feels emotionally right raises rational questions – or vice versa.",
                    "The discrepancy between feeling and analysis is part of the dynamic here."
                ]
            },
            balanced: {
                de: [
                    "Eine ausgewogene Konstellation: Weder euphorisch noch problematisch, aber mit Potenzial.",
                    "Pathos und Logos halten sich die Waage – hier entscheidet die bewusste Gestaltung.",
                    "Die emotionale und rationale Ebene sind beide neutral – was ihr daraus macht, liegt bei euch."
                ],
                en: [
                    "A balanced constellation: neither euphoric nor problematic, but with potential.",
                    "Pathos and Logos hold each other in balance – here, conscious shaping decides.",
                    "The emotional and rational levels are both neutral – what you make of it is up to you."
                ]
            }
        },

        synthesis: {
            strong: {
                de: [
                    "Die Integration zeigt: Dies ist eine Verbindung mit Tiefenpotenzial. Emotionale Resonanz trifft auf wertebasierte Übereinstimmung.",
                    "Beide Perspektiven – das Fühlen und das Denken – unterstützen diese Verbindung.",
                    "Das Zusammenspiel von Pathos und Logos ist hier konstruktiv: Gefühl und Struktur verstärken sich gegenseitig."
                ],
                en: [
                    "The integration shows: this is a connection with depth potential. Emotional resonance meets value-based alignment.",
                    "Both perspectives – feeling and thinking – support this connection.",
                    "The interplay of Pathos and Logos is constructive here: feeling and structure reinforce each other."
                ]
            },
            moderate: {
                de: [
                    "Die integrierte Betrachtung zeigt Licht und Schatten. Stärken in einem Bereich kompensieren Schwächen im anderen.",
                    "Weder emotionale Euphorie noch rationale Begeisterung – aber beides zusammen ergibt ein tragfähiges Bild.",
                    "Das Zusammenspiel ist komplex: Was emotional passt, fordert strukturell – und umgekehrt."
                ],
                en: [
                    "The integrated view shows light and shadow. Strengths in one area compensate for weaknesses in another.",
                    "Neither emotional euphoria nor rational enthusiasm – but both together paint a viable picture.",
                    "The interplay is complex: what fits emotionally demands structurally – and vice versa."
                ]
            },
            challenging: {
                de: [
                    "Sowohl emotional als auch rational zeigen sich Herausforderungen. Das ist keine Absage, aber eine Warnung.",
                    "Die integrierte Analyse ist ehrlich: Diese Verbindung erfordert erhebliche Bewusstseinsarbeit.",
                    "Weder Herz noch Kopf sind spontan begeistert – das bedeutet: Hier muss aktiv gebaut werden."
                ],
                en: [
                    "Both emotionally and rationally, challenges emerge. This is not a rejection, but a warning.",
                    "The integrated analysis is honest: this connection requires considerable consciousness work.",
                    "Neither heart nor head are spontaneously enthusiastic – meaning: here one must actively build."
                ]
            }
        },

        conclusion: {
            positive: {
                de: [
                    "Fazit: Eine Konstellation mit echtem Potenzial. Die Basis ist da – nun gilt es, sie zu nutzen.",
                    "Zusammengefasst: Gute Voraussetzungen für eine erfüllende Verbindung. Der Rest ist Arbeit und Commitment.",
                    "Das Gesamtbild ist ermutigend: Hier kann etwas Bedeutsames entstehen."
                ],
                en: [
                    "Conclusion: A constellation with real potential. The foundation is there – now it's about using it.",
                    "In summary: good conditions for a fulfilling connection. The rest is work and commitment.",
                    "The overall picture is encouraging: something meaningful can arise here."
                ]
            },
            neutral: {
                de: [
                    "Fazit: Nicht automatisch einfach, nicht automatisch schwer. Diese Verbindung ist, was ihr daraus macht.",
                    "Zusammengefasst: Potential und Herausforderung in Balance. Bewusste Kommunikation ist der Schlüssel.",
                    "Das Gesamtbild ist offen: Weder garantierter Erfolg noch vorprogrammiertes Scheitern."
                ],
                en: [
                    "Conclusion: Not automatically easy, not automatically hard. This connection is what you make of it.",
                    "In summary: potential and challenge in balance. Conscious communication is the key.",
                    "The overall picture is open: neither guaranteed success nor pre-programmed failure."
                ]
            },
            challenging: {
                de: [
                    "Fazit: Diese Verbindung ist möglich, aber nicht wahrscheinlich. Sie erfordert außerordentliche Bereitschaft zur Entwicklung.",
                    "Zusammengefasst: Die Analyse zeigt fundamentale Unterschiede. Das ist keine Unmöglichkeit, aber eine ernste Herausforderung.",
                    "Das Gesamtbild mahnt zur Vorsicht: Wenn beide bereit sind, kann es funktionieren – aber es wird Arbeit kosten."
                ],
                en: [
                    "Conclusion: This connection is possible, but not probable. It requires extraordinary willingness to develop.",
                    "In summary: the analysis shows fundamental differences. This is not an impossibility, but a serious challenge.",
                    "The overall picture urges caution: if both are willing, it can work – but it will cost effort."
                ]
            }
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

    // Localizes a partnerConflict object so all string fields become plain strings
    function localizeConflict(conflict) {
        if (!conflict) return null;
        return {
            archetypes: conflict.archetypes,
            title: getLocalizedText(conflict.title),
            dynamics: {
                pattern: getLocalizedText(conflict.dynamics.pattern),
                escalation: getLocalizedText(conflict.dynamics.escalation),
                core_wound: getLocalizedText(conflict.dynamics.core_wound)
            },
            resolution: {
                understanding: getLocalizedText(conflict.resolution.understanding),
                practical: getLocalizedText(conflict.resolution.practical),
                growth: getLocalizedText(conflict.resolution.growth)
            }
        };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // HAUPTFUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    function generateInnerConflictText(archetypeId, seed) {
        const conflict = innerConflicts[archetypeId];
        const lang = getLang();
        if (!conflict) {
            return {
                core: lang === 'en' ? "No specific inner conflicts identified." : "Keine spezifischen inneren Konflikte identifiziert.",
                description: "", psychological: "", shadow: "", growth: ""
            };
        }
        return {
            core: getLocalizedText(conflict.core),
            description: getLocalizedText(conflict.description),
            psychological: getLocalizedText(conflict.psychological),
            shadow: getLocalizedText(conflict.shadow),
            growth: getLocalizedText(conflict.growth)
        };
    }

    function identifyPartnerConflicts(arch1Id, arch2Id, dimensions1, dimensions2) {
        const conflicts = [];

        const autonomyTypes = ['single', 'ra', 'solopoly'];
        const fusionTypes = ['duo'];
        if ((autonomyTypes.includes(arch1Id) && fusionTypes.includes(arch2Id)) ||
            (fusionTypes.includes(arch1Id) && autonomyTypes.includes(arch2Id))) {
            conflicts.push(localizeConflict(partnerConflicts["autonomie-verschmelzung"]));
        }

        const structureTypes = ['duo', 'duo_flex'];
        const freedomTypes = ['ra', 'solopoly'];
        if ((structureTypes.includes(arch1Id) && freedomTypes.includes(arch2Id)) ||
            (freedomTypes.includes(arch1Id) && structureTypes.includes(arch2Id))) {
            conflicts.push(localizeConflict(partnerConflicts["struktur-freiheit"]));
        }

        const exclusiveTypes = ['duo'];
        const openTypes = ['polyamor', 'solopoly', 'duo_flex'];
        if ((exclusiveTypes.includes(arch1Id) && openTypes.includes(arch2Id)) ||
            (openTypes.includes(arch1Id) && exclusiveTypes.includes(arch2Id))) {
            conflicts.push(localizeConflict(partnerConflicts["exklusivitaet-offenheit"]));
        }

        const dom1 = dimensions1?.dominanz;
        const dom2 = dimensions2?.dominanz;
        if (dom1 && dom2) {
            if ((dom1 === 'dominant' && dom2 === 'dominant') ||
                (dom1 === 'submissiv' && dom2 === 'submissiv')) {
                conflicts.push(localizeConflict(partnerConflicts["dominanz-dynamik"]));
            }
        }

        const gfk1 = dimensions1?.gfk;
        const gfk2 = dimensions2?.gfk;
        if (gfk1 && gfk2 && gfk1 !== gfk2) {
            if ((gfk1 === 'hoch' && gfk2 === 'niedrig') ||
                (gfk1 === 'niedrig' && gfk2 === 'hoch')) {
                conflicts.push(localizeConflict(partnerConflicts["kommunikationsstil"]));
            }
        }

        return conflicts;
    }

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

        const opening = fillVariables(
            selectPhrase(getLocalizedPhrases(integrationPhrases.opening[integrationLevel]), seed),
            vars
        );

        let synthesisType = 'moderate';
        if (tonality === 'positiv') synthesisType = 'strong';
        if (tonality === 'negativ') synthesisType = 'challenging';
        const synthesis = fillVariables(
            selectPhrase(getLocalizedPhrases(integrationPhrases.synthesis[synthesisType]), seed + 7),
            vars
        );

        const ichInnerConflict = generateInnerConflictText(ichArch?.id || ichName.toLowerCase(), seed);
        const partnerInnerConflict = generateInnerConflictText(partnerArch?.id || partnerName.toLowerCase(), seed + 3);

        const partnerConflictsList = identifyPartnerConflicts(
            ichArch?.id || ichName.toLowerCase(),
            partnerArch?.id || partnerName.toLowerCase(),
            ichDimensions,
            partnerDimensions
        );

        const psychDepth = generatePsychologicalDepthText(ichArch, partnerArch, ichDimensions, partnerDimensions, seed);

        let conclusionType = 'neutral';
        if (tonality === 'positiv') conclusionType = 'positive';
        if (tonality === 'negativ') conclusionType = 'challenging';
        const conclusion = selectPhrase(getLocalizedPhrases(integrationPhrases.conclusion[conclusionType]), seed + 13);

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

    function generatePsychologicalDepthText(ichArch, partnerArch, ichDim, partnerDim, seed) {
        const texts = [];
        const lang = getLang();

        if (ichArch?.pirsig && partnerArch?.pirsig) {
            const ichStatic = ichArch.pirsig.staticQuality || 0.5;
            const partnerStatic = partnerArch.pirsig.staticQuality || 0.5;
            const diff = Math.abs(ichStatic - partnerStatic);

            if (diff > 0.3) {
                texts.push({
                    source: "Pirsig",
                    title: getLocalizedText(psychologicalDepth.pirsig.staticDynamic.title),
                    content: `${getLocalizedText(psychologicalDepth.pirsig.staticDynamic.application)} ${getLocalizedText(psychologicalDepth.pirsig.staticDynamic.resolution)}`
                });
            }
        }

        if (ichArch?.osho && partnerArch?.osho) {
            const ichNat = ichArch.osho.naturalness || 0.5;
            const partnerNat = partnerArch.osho.naturalness || 0.5;

            if (Math.abs(ichNat - partnerNat) > 0.3) {
                texts.push({
                    source: "Osho",
                    title: getLocalizedText(psychologicalDepth.osho.naturalness.title),
                    content: getLocalizedText(psychologicalDepth.osho.naturalness.application)
                });
            }
        }

        const ichGfk = ichDim?.gfk;
        const partnerGfk = partnerDim?.gfk;
        if (ichGfk && partnerGfk && ichGfk !== partnerGfk) {
            texts.push({
                source: lang === 'en' ? "NVC" : "GFK",
                title: getLocalizedText(psychologicalDepth.gfk.needs.title),
                content: getLocalizedText(psychologicalDepth.gfk.empathy.application) + " " + getLocalizedText(psychologicalDepth.gfk.empathy.practice)
            });
        }

        const ichAuto = ichArch?.research?.traits?.autonomy;
        const partnerAuto = partnerArch?.research?.traits?.autonomy;
        if (ichAuto && partnerAuto && ichAuto !== partnerAuto) {
            texts.push({
                source: "Attachment Theory",
                title: getLocalizedText(psychologicalDepth.attachment.repair.title),
                content: getLocalizedText(psychologicalDepth.attachment.repair.application) + " " + getLocalizedText(psychologicalDepth.attachment.repair.practice)
            });
        }

        return texts;
    }

    function generateTop10RankingText(archetypeId, rankings, seed) {
        const intro = selectPhrase(getLocalizedPhrases(top10Phrases.intro.single), seed);

        const rankedItems = rankings.slice(0, 10).map((item, index) => {
            const rank = index + 1;
            const rankInfo = top10Phrases.rankings[rank] || top10Phrases.rankings[10];

            return {
                rank,
                archetype: item.archetype,
                score: item.score,
                title: getLocalizedText(rankInfo.title),
                description: getLocalizedText(rankInfo.description),
                potential: getLocalizedText(rankInfo.potential)
            };
        });

        const lang = getLang();
        const summaryTemplate = lang === 'en'
            ? `Of the ${rankings.length} possible combinations, here are the top 10 for ${archetypeId}.`
            : `Von den ${rankings.length} möglichen Kombinationen sind hier die Top 10 für ${archetypeId}.`;

        return {
            intro,
            baseArchetype: archetypeId,
            rankings: rankedItems,
            summary: summaryTemplate
        };
    }

    function generateFullPsychologicalAnalysis(config) {
        const {
            ichArch, partnerArch,
            ichName, partnerName,
            ichDimensions, partnerDimensions,
            pathosScore, logosScore, overallScore,
            resonance, seed
        } = config;

        const lang = getLang();
        const labels = {
            integratedSynthesis: lang === 'en' ? "Integrated Synthesis" : "Integrierte Synthese",
            innerConflict: lang === 'en' ? "Inner Conflict" : "Innerer Konflikt",
            conclusion: lang === 'en' ? "Conclusion" : "Fazit"
        };

        const sections = [];

        const integrated = generateIntegratedSynthesis(config);
        sections.push({
            type: "synthesis",
            title: labels.integratedSynthesis,
            content: integrated.opening + " " + integrated.synthesis
        });

        sections.push({
            type: "inner_conflict",
            title: `${labels.innerConflict}: ${ichName}`,
            subtitle: integrated.innerConflicts.ich.core,
            content: integrated.innerConflicts.ich.description,
            psychological: integrated.innerConflicts.ich.psychological,
            shadow: integrated.innerConflicts.ich.shadow,
            growth: integrated.innerConflicts.ich.growth
        });

        sections.push({
            type: "inner_conflict",
            title: `${labels.innerConflict}: ${partnerName}`,
            subtitle: integrated.innerConflicts.partner.core,
            content: integrated.innerConflicts.partner.description,
            psychological: integrated.innerConflicts.partner.psychological,
            shadow: integrated.innerConflicts.partner.shadow,
            growth: integrated.innerConflicts.partner.growth
        });

        integrated.partnerConflicts.forEach((conflict, idx) => {
            sections.push({
                type: "partner_conflict",
                title: conflict.title,
                dynamics: conflict.dynamics,
                resolution: conflict.resolution
            });
        });

        integrated.psychologicalDepth.forEach(depth => {
            sections.push({
                type: "psychological_depth",
                source: depth.source,
                title: depth.title,
                content: depth.content
            });
        });

        sections.push({
            type: "conclusion",
            title: labels.conclusion,
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

    function formatAnalysisAsText(analysis) {
        const lang = getLang();
        const labels = lang === 'en'
            ? { psychological: "Psychological", shadow: "Shadow", growth: "Growth", pattern: "Pattern", escalation: "Escalation", core_wound: "Core wound", understanding: "Understanding", practical: "Practical", pathos: "Pathos score", logos: "Logos score", total: "Overall score", resonance: "Resonance", integration: "Integration", tonality: "Tonality" }
            : { psychological: "Psychologisch", shadow: "Schatten", growth: "Wachstum", pattern: "Muster", escalation: "Eskalation", core_wound: "Kernwunde", understanding: "Verständnis", practical: "Praktisch", pathos: "Pathos-Score", logos: "Logos-Score", total: "Gesamtscore", resonance: "Resonanz", integration: "Integration", tonality: "Tonalität" };

        const lines = [];

        analysis.sections.forEach(section => {
            lines.push("");
            lines.push(`═══ ${section.title.toUpperCase()} ═══`);

            if (section.subtitle) lines.push(`» ${section.subtitle}`);
            if (section.content) lines.push(section.content);

            if (section.psychological) {
                lines.push("");
                lines.push(`${labels.psychological}: ${section.psychological}`);
            }
            if (section.shadow) {
                lines.push("");
                lines.push(`${labels.shadow}: ${section.shadow}`);
            }
            if (section.growth) {
                lines.push("");
                lines.push(`${labels.growth}: ${section.growth}`);
            }
            if (section.dynamics) {
                lines.push("");
                lines.push(`${labels.pattern}: ${section.dynamics.pattern}`);
                lines.push(`${labels.escalation}: ${section.dynamics.escalation}`);
                lines.push(`${labels.core_wound}: ${section.dynamics.core_wound}`);
            }
            if (section.resolution) {
                lines.push("");
                lines.push(`${labels.understanding}: ${section.resolution.understanding}`);
                lines.push(`${labels.practical}: ${section.resolution.practical}`);
                lines.push(`${labels.growth}: ${section.resolution.growth}`);
            }
        });

        lines.push("");
        lines.push("═══════════════════════════════════════");
        lines.push(`${labels.pathos}: ${analysis.meta.scores.pathos} | ${labels.logos}: ${analysis.meta.scores.logos}`);
        lines.push(`${labels.total}: ${analysis.meta.scores.overall} | ${labels.resonance}: ${analysis.meta.scores.resonance?.toFixed(2) || 'N/A'}`);
        lines.push(`${labels.integration}: ${analysis.meta.integrationLevel} | ${labels.tonality}: ${analysis.meta.tonality}`);

        return lines.join('\n');
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        generateIntegratedSynthesis,
        generateInnerConflictText,
        identifyPartnerConflicts,
        generateTop10RankingText,
        generateFullPsychologicalAnalysis,
        formatAnalysisAsText,
        generatePsychologicalDepthText,

        generateHash,
        selectPhrase,
        fillVariables,
        getIntegrationLevel,
        getTonality,

        data: {
            innerConflicts,
            partnerConflicts,
            psychologicalDepth,
            top10Phrases,
            integrationPhrases
        }
    };
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = IntegratedSynthesisTextGenerator;
}
