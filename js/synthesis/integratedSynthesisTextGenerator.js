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

    function getLocalizedString(de, en, fr, it) {
        const lang = getLang();
        if (lang === 'en') return en;
        if (lang === 'fr') return fr;
        if (lang === 'it') return it;
        return de;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // INNERE KONFLIKTE (INTRAPSYCHISCHE SPANNUNGEN)
    // ═══════════════════════════════════════════════════════════════════════════

    const innerConflicts = {
        single: {
            core: { de: "Autonomie vs. Zugehörigkeit", en: "Autonomy vs. Belonging", fr: "Autonomie vs. Appartenance", it: "Autonomia vs. Appartenenza" },
            description: { de: "Der Single lebt Freiheit als höchsten Wert, doch das menschliche Grundbedürfnis nach Zugehörigkeit und Intimität kann im Verborgenen nagen.", en: "The Single lives freedom as the highest value, yet the basic human need for belonging and intimacy can gnaw in the background.", fr: "Le Single vit la liberté comme valeur suprême, mais le besoin humain fondamental d'appartenance et d'intimité peut ronger en arrière-plan.", it: "Il Single vive la libertà come valore supremo, ma il bisogno umano fondamentale di appartenenza e intimità può rodere in sottofondo." },
            psychological: { de: "Evolutionsbiologisch sind wir als soziale Wesen verdrahtet. Der Single muss aktiv Wege finden, Bindungsbedürfnisse außerhalb romantischer Beziehungen zu stillen – durch tiefe Freundschaften, Familie oder Community.", en: "Evolutionarily, we are wired as social beings. The Single must actively find ways to meet attachment needs outside of romantic relationships – through deep friendships, family, or community.", fr: "Sur le plan évolutif, nous sommes câblés comme êtres sociaux. Le Single doit trouver activement des moyens de satisfaire les besoins d'attachement en dehors des relations romantiques – à travers des amitiés profondes, la famille ou la communauté.", it: "Evolutivamente, siamo cablati come esseri sociali. Il Single deve trovare attivamente modi per soddisfare i bisogni di attaccamento al di fuori delle relazioni romantiche – attraverso amicizie profonde, la famiglia o la comunità." },
            shadow: { de: "Im Schatten liegt die Angst vor Verletzlichkeit. Die demonstrierte Unabhängigkeit kann ein Schutzmechanismus sein – wer nicht bindet, kann nicht verlassen werden.", en: "In the shadow lies the fear of vulnerability. The demonstrated independence can be a protective mechanism – those who don't attach cannot be left.", fr: "Dans l'ombre se cache la peur de la vulnérabilité. L'indépendance démontrée peut être un mécanisme de protection – celui qui ne s'attache pas ne peut pas être abandonné.", it: "Nell'ombra giace la paura della vulnerabilità. L'indipendenza dimostrata può essere un meccanismo di protezione – chi non si lega non può essere abbandonato." },
            growth: { de: "Wahre Freiheit entsteht, wenn Alleinsein eine bewusste Wahl ist, nicht eine Vermeidungsstrategie. Der reife Single kann Nähe zulassen, ohne Autonomie aufzugeben.", en: "True freedom arises when being alone is a conscious choice, not an avoidance strategy. The mature Single can allow closeness without giving up autonomy.", fr: "La vraie liberté naît quand être seul est un choix conscient, non une stratégie d'évitement. Le Single mature peut accepter la proximité sans abandonner l'autonomie.", it: "La vera libertà nasce quando stare da soli è una scelta consapevole, non una strategia di evitamento. Il Single maturo può accettare la vicinanza senza rinunciare all'autonomia." }
        },
        duo: {
            core: { de: "Verschmelzung vs. Individuation", en: "Merger vs. Individuation", fr: "Fusion vs. Individuation", it: "Fusione vs. Individuazione" },
            description: { de: "Das Duo sehnt sich nach dem Eins-Werden mit dem Partner, riskiert dabei aber den Verlust der eigenen Identität.", en: "The Duo longs to become one with the partner, but risks losing their own identity.", fr: "Le Duo aspire à ne faire qu'un avec le partenaire, mais risque de perdre sa propre identité.", it: "Il Duo anela a fondersi con il partner, ma rischia di perdere la propria identità." },
            psychological: { de: "Die Psychoanalyse spricht von 'symbiotischer Beziehung' – ein Rückfall in frühkindliche Verschmelzungswünsche. Gesunde Liebe braucht jedoch zwei vollständige Individuen.", en: "Psychoanalysis speaks of 'symbiotic relationship' – a regression to early childhood fusion wishes. Healthy love, however, requires two complete individuals.", fr: "La psychanalyse parle de 'relation symbiotique' – une régression aux désirs de fusion de la petite enfance. L'amour sain requiert cependant deux individus complets.", it: "La psicoanalisi parla di 'relazione simbiotica' – una regressione ai desideri di fusione della prima infanzia. L'amore sano, tuttavia, richiede due individui completi." },
            shadow: { de: "Im Schatten liegt Verlustangst. Die Exklusivität kann zur Kontrolle werden, die Treue zur Eifersucht, die Nähe zur Erstickung.", en: "In the shadow lies fear of loss. Exclusivity can become control, loyalty can become jealousy, closeness can become suffocation.", fr: "Dans l'ombre se cache la peur de la perte. L'exclusivité peut devenir contrôle, la fidélité jalousie, la proximité étouffement.", it: "Nell'ombra giace la paura della perdita. L'esclusività può diventare controllo, la fedeltà gelosia, la vicinanza soffocamento." },
            growth: { de: "Reifung bedeutet: Den Partner lieben, ohne ihn zu besitzen. Verbundenheit ohne Abhängigkeit. Zwei bleiben, während man Eines wird.", en: "Maturation means: loving the partner without possessing them. Connection without dependency. Two remaining while becoming one.", fr: "La maturité signifie : aimer le partenaire sans le posséder. Connexion sans dépendance. Rester deux tout en devenant un.", it: "La maturità significa: amare il partner senza possederlo. Connessione senza dipendenza. Rimanere due diventando uno." }
        },
        "duo_flex": {
            core: { de: "Sicherheit vs. Erkundung", en: "Security vs. Exploration", fr: "Sécurité vs. Exploration", it: "Sicurezza vs. Esplorazione" },
            description: { de: "Duo-Flex will beides: Den sicheren Hafen UND das offene Meer. Diese Spannung erfordert ständige Balance.", en: "Duo-Flex wants both: the safe harbor AND the open sea. This tension requires constant balance.", fr: "Duo-Flex veut les deux : le port sûr ET la mer ouverte. Cette tension exige un équilibre constant.", it: "Duo-Flex vuole entrambi: il porto sicuro E il mare aperto. Questa tensione richiede un equilibrio costante." },
            psychological: { de: "Attachment-Theorie nennt dies 'secure base exploration' – nur wer sich sicher fühlt, kann explorieren. Doch was, wenn die Exploration den sicheren Hafen gefährdet?", en: "Attachment theory calls this 'secure base exploration' – only those who feel safe can explore. But what if exploration endangers the safe harbor?", fr: "La théorie de l'attachement appelle cela 'exploration à partir d'une base sécurisée' – seul celui qui se sent en sécurité peut explorer. Mais que faire si l'exploration met en danger le port sûr ?", it: "La teoria dell'attaccamento chiama questo 'esplorazione dalla base sicura' – solo chi si sente al sicuro può esplorare. Ma cosa succede se l'esplorazione mette in pericolo il porto sicuro?" },
            shadow: { de: "Im Schatten liegt die Angst, sich entscheiden zu müssen. Und das Risiko, dass 'Flexibilität' zur Ausrede wird, keine echte Verbindlichkeit einzugehen.", en: "In the shadow lies the fear of having to decide. And the risk that 'flexibility' becomes an excuse not to make a genuine commitment.", fr: "Dans l'ombre se cache la peur de devoir choisir. Et le risque que la 'flexibilité' devienne une excuse pour ne prendre aucun engagement réel.", it: "Nell'ombra giace la paura di dover scegliere. E il rischio che la 'flessibilità' diventi una scusa per non assumere impegni reali." },
            growth: { de: "Reifung bedeutet: Transparenz statt Ausweichen. Die Spannung als kreative Kraft nutzen, statt sie zu leugnen.", en: "Maturation means: transparency instead of evasion. Using the tension as creative force rather than denying it.", fr: "La maturité signifie : transparence plutôt qu'esquive. Utiliser la tension comme force créatrice plutôt que de la nier.", it: "La maturità significa: trasparenza invece di evasione. Usare la tensione come forza creativa invece di negarla." }
        },
        ra: {
            core: { de: "Radikale Freiheit vs. Tiefe Verbindung", en: "Radical Freedom vs. Deep Connection", fr: "Liberté radicale vs. Connexion profonde", it: "Libertà radicale vs. Connessione profonda" },
            description: { de: "Relationship Anarchy lehnt alle Normen ab – aber kann man tiefe Verbindung ohne gemeinsame Vereinbarungen aufbauen?", en: "Relationship Anarchy rejects all norms – but can deep connection be built without shared agreements?", fr: "L'Anarchie relationnelle rejette toutes les normes – mais peut-on construire une connexion profonde sans accords communs ?", it: "L'Anarchia relazionale rifiuta tutte le norme – ma si può costruire una connessione profonda senza accordi condivisi?" },
            psychological: { de: "Die Ablehnung aller Strukturen kann Ausdruck von Angst vor Verbindlichkeit sein. Wahre Anarchie ist nicht Chaos, sondern bewusste Gestaltung ohne fremde Regeln.", en: "The rejection of all structures can be an expression of fear of commitment. True anarchy is not chaos, but conscious shaping without external rules.", fr: "Le rejet de toutes les structures peut être l'expression d'une peur de l'engagement. La vraie anarchie n'est pas le chaos, mais une mise en forme consciente sans règles extérieures.", it: "Il rifiuto di tutte le strutture può essere espressione di paura dell'impegno. La vera anarchia non è il caos, ma una modellazione consapevole senza regole esterne." },
            shadow: { de: "Im Schatten liegt die Bindungsangst, getarnt als Philosophie. Die Gleichwertigkeit aller Beziehungen kann dazu führen, dass keine Beziehung wirklich vertieft wird.", en: "In the shadow lies fear of attachment, disguised as philosophy. The equal valuing of all relationships can lead to no relationship being truly deepened.", fr: "Dans l'ombre se cache la peur de l'attachement, déguisée en philosophie. L'équivalence de toutes les relations peut faire qu'aucune relation n'est vraiment approfondie.", it: "Nell'ombra giace la paura dell'attaccamento, camuffata da filosofia. L'uguale valorizzazione di tutte le relazioni può portare a non approfondire davvero nessuna." },
            growth: { de: "Reifung bedeutet: Eigene Regeln aufstellen können, nicht nur fremde ablehnen. Tiefe ermöglichen, auch wenn sie einschränkt.", en: "Maturation means: being able to set one's own rules, not just rejecting others'. Allowing depth, even when it constrains.", fr: "La maturité signifie : être capable de fixer ses propres règles, pas seulement rejeter celles des autres. Permettre la profondeur, même lorsqu'elle contraint.", it: "La maturità significa: saper stabilire le proprie regole, non solo rifiutare quelle altrui. Permettere la profondità, anche quando limita." }
        },
        lat: {
            core: { de: "Nähe vs. Eigener Raum", en: "Closeness vs. Own Space", fr: "Proximité vs. Espace propre", it: "Vicinanza vs. Spazio proprio" },
            description: { de: "LAT lebt den Kompromiss – Beziehung ja, Zusammenleben nein. Doch wo liegt die Grenze zwischen gesundem Raum und emotionaler Distanz?", en: "LAT lives the compromise – relationship yes, cohabitation no. But where is the line between healthy space and emotional distance?", fr: "LAT vit le compromis – relation oui, cohabitation non. Mais où se trouve la limite entre l'espace sain et la distance émotionnelle ?", it: "LAT vive il compromesso – relazione sì, coabitazione no. Ma dove si trova il confine tra spazio sano e distanza emotiva?" },
            psychological: { de: "Die räumliche Trennung schützt vor Alltags-Konfliktfeldern, kann aber auch verhindern, dass wichtige Auseinandersetzungen stattfinden.", en: "Spatial separation protects from everyday conflict zones, but can also prevent important confrontations from happening.", fr: "La séparation spatiale protège des zones de conflit quotidiennes, mais peut aussi empêcher des confrontations importantes de se produire.", it: "La separazione spaziale protegge dalle zone di conflitto quotidiane, ma può anche impedire che avvengano confronti importanti." },
            shadow: { de: "Im Schatten liegt die Vermeidung von Intimität im Alltäglichen. Qualitätszeit ist schön, aber echte Partnerschaft zeigt sich auch im Unspektakulären.", en: "In the shadow lies the avoidance of intimacy in the everyday. Quality time is wonderful, but true partnership also shows itself in the unremarkable.", fr: "Dans l'ombre se cache l'évitement de l'intimité dans le quotidien. Le temps de qualité est beau, mais le vrai partenariat se révèle aussi dans l'ordinaire.", it: "Nell'ombra giace l'evitamento dell'intimità nel quotidiano. Il tempo di qualità è bello, ma la vera partnership si rivela anche nell'ordinario." },
            growth: { de: "Reifung bedeutet: Raum als Quelle, nicht als Flucht. Die Fähigkeit entwickeln, auch in Nähe bei sich zu bleiben.", en: "Maturation means: space as a source, not an escape. Developing the ability to stay with oneself even in closeness.", fr: "La maturité signifie : l'espace comme source, non comme fuite. Développer la capacité de rester soi-même même dans la proximité.", it: "La maturità significa: lo spazio come fonte, non come fuga. Sviluppare la capacità di restare con se stessi anche nella vicinanza." }
        },
        aromantisch: {
            core: { de: "Authentizität vs. Gesellschaftliche Erwartungen", en: "Authenticity vs. Social Expectations", fr: "Authenticité vs. Attentes sociales", it: "Autenticità vs. Aspettative sociali" },
            description: { de: "Aromantische Menschen leben gegen den Strom der Amatonormativität. Der innere Konflikt ist oft extern induziert.", en: "Aromantic people swim against the current of amatonormativity. The inner conflict is often externally induced.", fr: "Les personnes aromantiques vont à contre-courant de l'amatonormativité. Le conflit intérieur est souvent induit de l'extérieur.", it: "Le persone aromantiche nuotano controcorrente rispetto all'amatonormatività. Il conflitto interiore è spesso indotto dall'esterno." },
            psychological: { de: "Die ständige Konfrontation mit 'wann heiratest du?' und 'du findest noch jemanden' kann zu Selbstzweifeln führen – auch wenn die eigene Identität klar ist.", en: "The constant confrontation with 'when are you getting married?' and 'you'll find someone' can lead to self-doubt – even when one's own identity is clear.", fr: "La confrontation constante avec 'quand te maries-tu ?' et 'tu trouveras quelqu'un' peut mener au doute de soi – même quand sa propre identité est claire.", it: "Il confronto costante con 'quando ti sposi?' e 'troverai qualcuno' può portare al dubbio di sé – anche quando la propria identità è chiara." },
            shadow: { de: "Im Schatten liegt die Gefahr, in Reaktion gegen gesellschaftliche Erwartungen alle emotionale Tiefe abzulehnen.", en: "In the shadow lies the danger of rejecting all emotional depth in reaction to social expectations.", fr: "Dans l'ombre se cache le danger de rejeter toute profondeur émotionnelle en réaction aux attentes sociales.", it: "Nell'ombra giace il pericolo di rifiutare tutta la profondità emotiva in reazione alle aspettative sociali." },
            growth: { de: "Reifung bedeutet: Die eigene Identität aus innerem Wissen leben, nicht aus Trotz gegen äußere Erwartungen.", en: "Maturation means: living one's own identity from inner knowledge, not from defiance against external expectations.", fr: "La maturité signifie : vivre sa propre identité à partir d'une connaissance intérieure, non par défi des attentes extérieures.", it: "La maturità significa: vivere la propria identità dalla conoscenza interiore, non dalla sfida alle aspettative esterne." }
        },
        solopoly: {
            core: { de: "Vielfalt vs. Tiefe", en: "Variety vs. Depth", fr: "Variété vs. Profondeur", it: "Varietà vs. Profondità" },
            description: { de: "Solopoly liebt die Freiheit multipler Verbindungen, riskiert aber, keine wirklich tief werden zu lassen.", en: "Solopoly loves the freedom of multiple connections, but risks not letting any truly deepen.", fr: "Solopoly aime la liberté des connexions multiples, mais risque de ne laisser aucune vraiment s'approfondir.", it: "Solopoly ama la libertà di connessioni multiple, ma rischia di non lasciarne approfondire nessuna davvero." },
            psychological: { de: "Ohne Primärpartner fehlt der 'sichere Hafen'. Kann man Attachment-Bedürfnisse auf multiple Beziehungen verteilen, oder fragmentiert sich die Seele?", en: "Without a primary partner, the 'safe harbor' is missing. Can attachment needs be distributed across multiple relationships, or does the soul fragment?", fr: "Sans partenaire primaire, le 'port sûr' manque. Peut-on répartir les besoins d'attachement sur plusieurs relations, ou l'âme se fragmente-t-elle ?", it: "Senza un partner primario, manca il 'porto sicuro'. Si possono distribuire i bisogni di attaccamento su più relazioni, o l'anima si frammenta?" },
            shadow: { de: "Im Schatten liegt die Angst vor totaler Hingabe an einen Menschen. Die Vielfalt kann zur Flucht vor Tiefe werden.", en: "In the shadow lies the fear of total surrender to one person. Variety can become a flight from depth.", fr: "Dans l'ombre se cache la peur de l'abandon total à une personne. La variété peut devenir une fuite de la profondeur.", it: "Nell'ombra giace la paura della totale resa a una persona. La varietà può diventare una fuga dalla profondità." },
            growth: { de: "Reifung bedeutet: Tiefe auch ohne Exklusivität ermöglichen. Qualität statt Quantität – auch bei multiplen Beziehungen.", en: "Maturation means: enabling depth without exclusivity. Quality over quantity – even with multiple relationships.", fr: "La maturité signifie : permettre la profondeur sans exclusivité. Qualité plutôt que quantité – même avec des relations multiples.", it: "La maturità significa: permettere la profondità senza esclusività. Qualità piuttosto che quantità – anche con relazioni multiple." }
        },
        polyamor: {
            core: { de: "Offenheit vs. Kapazität", en: "Openness vs. Capacity", fr: "Ouverture vs. Capacité", it: "Apertura vs. Capacità" },
            description: { de: "Polyamor liebt die Idee unbegrenzter Liebe – aber Zeit und emotionale Energie sind endlich.", en: "Polyamory loves the idea of unlimited love – but time and emotional energy are finite.", fr: "La polyamorie aime l'idée d'un amour illimité – mais le temps et l'énergie émotionnelle sont finis.", it: "La poliamore ama l'idea di un amore illimitato – ma il tempo e l'energia emotiva sono finiti." },
            psychological: { de: "Die Herausforderung: Jede Beziehung braucht Pflege. Mehr Partner bedeutet mehr Kommunikation, mehr Aushandlung, mehr potenzielle Konflikte.", en: "The challenge: every relationship needs nurturing. More partners means more communication, more negotiation, more potential conflicts.", fr: "Le défi : chaque relation a besoin d'entretien. Plus de partenaires signifie plus de communication, plus de négociation, plus de conflits potentiels.", it: "La sfida: ogni relazione ha bisogno di cura. Più partner significa più comunicazione, più negoziazione, più potenziali conflitti." },
            shadow: { de: "Im Schatten liegt die Gefahr, sich zu verzetteln. 'Neue Beziehungsenergie' kann süchtig machen – auf Kosten bestehender Verbindungen.", en: "In the shadow lies the danger of scattering oneself. 'New relationship energy' can become addictive – at the expense of existing connections.", fr: "Dans l'ombre se cache le danger de se disperser. La 'nouvelle énergie relationnelle' peut devenir addictive – au détriment des connexions existantes.", it: "Nell'ombra giace il pericolo di disperdersi. La 'nuova energia relazionale' può diventare dipendenza – a scapito delle connessioni esistenti." },
            growth: { de: "Reifung bedeutet: Grenzen setzen können. Nicht jede mögliche Verbindung muss gelebt werden. Qualität über Quantität.", en: "Maturation means: being able to set limits. Not every possible connection needs to be lived. Quality over quantity.", fr: "La maturité signifie : être capable de fixer des limites. Toutes les connexions possibles ne doivent pas être vécues. Qualité sur quantité.", it: "La maturità significa: saper porre dei limiti. Non ogni connessione possibile deve essere vissuta. Qualità sulla quantità." }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PAARKONFLIKTE (INTERPERSONELLE HERAUSFORDERUNGEN)
    // ═══════════════════════════════════════════════════════════════════════════

    const partnerConflicts = {
        "autonomie-verschmelzung": {
            archetypes: ["single-duo", "ra-duo", "solopoly-duo"],
            title: { de: "Der Nähe-Distanz-Kampf", en: "The Closeness-Distance Battle", fr: "La Bataille Proximité-Distance", it: "La Battaglia Vicinanza-Distanza" },
            dynamics: {
                pattern: { de: "Der eine zieht näher, der andere weiter weg. Je mehr Verschmelzung gesucht wird, desto mehr Flucht wird ausgelöst.", en: "One moves closer, the other further away. The more merger is sought, the more flight is triggered.", fr: "L'un se rapproche, l'autre s'éloigne. Plus la fusion est recherchée, plus la fuite est déclenchée.", it: "Uno si avvicina, l'altro si allontana. Più si cerca la fusione, più viene innescata la fuga." },
                escalation: { de: "Vorwürfe wie 'Du bist nie da!' treffen auf 'Du erstickst mich!' – ein toxischer Kreislauf.", en: "Accusations like 'You're never there!' meet 'You're suffocating me!' – a toxic cycle.", fr: "Les accusations comme 'Tu n'es jamais là !' rencontrent 'Tu m'étouffes !' – un cercle vicieux toxique.", it: "Accuse come 'Non sei mai qui!' incontrano 'Mi stai soffocando!' – un ciclo tossico." },
                core_wound: { de: "Beide Seiten aktivieren ihre tiefsten Ängste: Verlustangst vs. Einengungsangst.", en: "Both sides activate their deepest fears: fear of loss vs. fear of engulfment.", fr: "Les deux côtés activent leurs peurs les plus profondes : peur de la perte vs. peur de l'enfermement.", it: "Entrambi i lati attivano le loro paure più profonde: paura della perdita vs. paura del soffocamento." }
            },
            resolution: {
                understanding: { de: "Beide Bedürfnisse sind legitim. Keiner ist 'zu viel' oder 'zu wenig' – die Frequenzen passen nur nicht automatisch.", en: "Both needs are legitimate. Neither is 'too much' nor 'too little' – the frequencies just don't automatically match.", fr: "Les deux besoins sont légitimes. Ni l'un n'est 'trop' ni l'autre 'trop peu' – les fréquences ne correspondent pas automatiquement.", it: "Entrambi i bisogni sono legittimi. Nessuno è 'troppo' o 'troppo poco' – le frequenze semplicemente non si corrispondono automaticamente." },
                practical: { de: "Explizite Vereinbarungen über Nähe-Rhythmen. Gemeinsame Zeit fest planen, aber auch Alleinzeit respektieren.", en: "Explicit agreements about closeness rhythms. Schedule shared time, but also respect alone time.", fr: "Accords explicites sur les rythmes de proximité. Planifier du temps ensemble, mais aussi respecter le temps seul.", it: "Accordi espliciti sui ritmi di vicinanza. Pianificare il tempo insieme, ma rispettare anche il tempo da soli." },
                growth: { de: "Der Verschmelzende lernt: Nähe entsteht nicht durch Klammern. Der Autonome lernt: Nähe zuzulassen macht nicht schwach.", en: "The merger-seeker learns: closeness doesn't arise from clinging. The autonomous one learns: allowing closeness doesn't make you weak.", fr: "Celui qui cherche la fusion apprend : la proximité ne naît pas de l'accrochage. Celui qui est autonome apprend : accepter la proximité ne rend pas faible.", it: "Chi cerca la fusione impara: la vicinanza non nasce dall'aggrapparsi. Quello autonomo impara: accettare la vicinanza non rende deboli." }
            }
        },

        "struktur-freiheit": {
            archetypes: ["duo-ra", "duo-flex-ra", "lat-duo"],
            title: { de: "Das Regel-Chaos-Spannungsfeld", en: "The Rules-Chaos Tension Field", fr: "Le Champ de Tension Règles-Chaos", it: "Il Campo di Tensione Regole-Caos" },
            dynamics: {
                pattern: { de: "Der eine will klare Absprachen, der andere erlebt jede Regel als Käfig.", en: "One wants clear agreements, the other experiences every rule as a cage.", fr: "L'un veut des accords clairs, l'autre vit chaque règle comme une cage.", it: "Uno vuole accordi chiari, l'altro vive ogni regola come una gabbia." },
                escalation: { de: "Regeln werden aufgestellt und gebrochen. Vertrauen erodiert.", en: "Rules are established and broken. Trust erodes.", fr: "Les règles sont établies et rompues. La confiance s'érode.", it: "Le regole vengono stabilite e violate. La fiducia si erode." },
                core_wound: { de: "Der Strukturierte fühlt sich unsicher. Der Freie fühlt sich kontrolliert.", en: "The structured one feels insecure. The free one feels controlled.", fr: "Le structuré se sent insécure. Le libre se sent contrôlé.", it: "Il strutturato si sente insicuro. Il libero si sente controllato." }
            },
            resolution: {
                understanding: { de: "Regeln müssen nicht einengen – sie können Freiheit IN Sicherheit ermöglichen.", en: "Rules don't have to confine – they can enable freedom WITHIN security.", fr: "Les règles n'ont pas à contraindre – elles peuvent permettre la liberté DANS la sécurité.", it: "Le regole non devono limitare – possono permettere la libertà NELLA sicurezza." },
                practical: { de: "Wenige, aber heilige Vereinbarungen. Co-Creation statt Diktat.", en: "Few, but sacred agreements. Co-creation instead of dictation.", fr: "Peu d'accords, mais sacrés. Co-création plutôt que diktat.", it: "Pochi accordi, ma sacri. Co-creazione invece di dettatura." },
                growth: { de: "Der Strukturierte lernt: Kontrolle ist nicht Sicherheit. Der Freie lernt: Verbindlichkeit ist nicht Gefängnis.", en: "The structured one learns: control is not security. The free one learns: commitment is not prison.", fr: "Le structuré apprend : le contrôle n'est pas la sécurité. Le libre apprend : l'engagement n'est pas une prison.", it: "Il strutturato impara: il controllo non è sicurezza. Il libero impara: l'impegno non è una prigione." }
            }
        },

        "exklusivitaet-offenheit": {
            archetypes: ["duo-polyamor", "duo-solopoly", "duo-duo-flex"],
            title: { de: "Der Treue-Definitions-Konflikt", en: "The Fidelity Definition Conflict", fr: "Le Conflit de Définition de la Fidélité", it: "Il Conflitto di Definizione della Fedeltà" },
            dynamics: {
                pattern: { de: "Was für den einen Treue bedeutet (Exklusivität), ist für den anderen Einschränkung (Monogamiezwang).", en: "What fidelity means for one (exclusivity) is restriction for the other (coercion into monogamy).", fr: "Ce que la fidélité signifie pour l'un (exclusivité) est une restriction pour l'autre (contrainte à la monogamie).", it: "Ciò che la fedeltà significa per uno (esclusività) è una restrizione per l'altro (coercizione alla monogamia)." },
                escalation: { de: "Eifersucht trifft auf Unverständnis. 'Liebst du mich nicht genug?' vs. 'Warum bin ich nicht genug?'", en: "Jealousy meets incomprehension. 'Don't you love me enough?' vs. 'Why am I not enough?'", fr: "La jalousie rencontre l'incompréhension. 'Tu ne m'aimes pas assez ?' vs. 'Pourquoi ne suis-je pas assez ?'", it: "La gelosia incontra l'incomprensione. 'Non mi ami abbastanza?' vs. 'Perché non sono sufficiente?'" },
                core_wound: { de: "Angst, nicht der/die Einzige zu sein vs. Angst, nicht ganz lieben zu dürfen.", en: "Fear of not being the only one vs. fear of not being allowed to love fully.", fr: "Peur de ne pas être le/la seul(e) vs. peur de ne pas avoir le droit d'aimer pleinement.", it: "Paura di non essere l'unico vs. paura di non poter amare pienamente." }
            },
            resolution: {
                understanding: { de: "Liebe ist nicht teilbar – aber Zeit und Aufmerksamkeit sind es. Mehr zu lieben bedeutet nicht, weniger zu lieben.", en: "Love is not divisible – but time and attention are. Loving more does not mean loving less.", fr: "L'amour n'est pas divisible – mais le temps et l'attention le sont. Aimer davantage ne signifie pas aimer moins.", it: "L'amore non è divisibile – ma il tempo e l'attenzione lo sono. Amare di più non significa amare di meno." },
                practical: { de: "Wenn Öffnung, dann mit extremer Behutsamkeit. Veto-Rechte. Tempo des Langsamereren.", en: "If opening, then with extreme care. Veto rights. Pace of the slower one.", fr: "Si ouverture, alors avec une extrême délicatesse. Droits de veto. Rythme du plus lent.", it: "Se apertura, allora con estrema cautela. Diritti di veto. Ritmo del più lento." },
                growth: { de: "Der Exklusive lernt: Sicherheit kommt von innen, nicht von Kontrolle. Der Offene lernt: Die Bedürfnisse des Partners sind keine Schwäche.", en: "The exclusive one learns: security comes from within, not from control. The open one learns: the partner's needs are not weakness.", fr: "L'exclusif apprend : la sécurité vient de l'intérieur, non du contrôle. L'ouvert apprend : les besoins du partenaire ne sont pas une faiblesse.", it: "L'esclusivo impara: la sicurezza viene dall'interno, non dal controllo. Quello aperto impara: i bisogni del partner non sono debolezza." }
            }
        },

        "tiefe-vielfalt": {
            archetypes: ["duo-solopoly", "polyamor-duo-flex", "lat-polyamor"],
            title: { de: "Das Qualität-Quantität-Dilemma", en: "The Quality-Quantity Dilemma", fr: "Le Dilemme Qualité-Quantité", it: "Il Dilemma Qualità-Quantità" },
            dynamics: {
                pattern: { de: "Der eine will tiefe Exklusivzeit, der andere teilt Aufmerksamkeit auf multiple Verbindungen.", en: "One wants deep exclusive time, the other shares attention across multiple connections.", fr: "L'un veut un temps exclusif en profondeur, l'autre partage son attention sur de multiples connexions.", it: "Uno vuole tempo esclusivo profondo, l'altro distribuisce l'attenzione su connessioni multiple." },
                escalation: { de: "Gefühl, nicht wichtig genug zu sein vs. Gefühl, zu viel zu fordern.", en: "Feeling of not being important enough vs. feeling of asking too much.", fr: "Sentiment de ne pas être assez important vs. sentiment de trop demander.", it: "Sensazione di non essere abbastanza importante vs. sensazione di chiedere troppo." },
                core_wound: { de: "Sehnsucht nach 'der einen Person, für die ich die Welt bin' vs. 'Warum soll Liebe Grenzen haben?'", en: "Longing for 'the one person for whom I am the world' vs. 'Why should love have limits?'", fr: "Désir de 'la personne pour qui je suis le monde' vs. 'Pourquoi l'amour devrait-il avoir des limites ?'", it: "Desiderio di 'la persona per cui sono il mondo' vs. 'Perché l'amore dovrebbe avere limiti?'" }
            },
            resolution: {
                understanding: { de: "Tiefe und Vielfalt schließen sich nicht aus, aber sie erfordern explizite Priorisierung.", en: "Depth and variety are not mutually exclusive, but they require explicit prioritization.", fr: "Profondeur et variété ne s'excluent pas mutuellement, mais elles exigent une priorisation explicite.", it: "Profondità e varietà non si escludono a vicenda, ma richiedono una prioritizzazione esplicita." },
                practical: { de: "Feste 'heilige Zeiten' für die Primärbeziehung. Kalender-Management als Liebesakt.", en: "Fixed 'sacred times' for the primary relationship. Calendar management as an act of love.", fr: "'Temps sacrés' fixes pour la relation primaire. La gestion du calendrier comme acte d'amour.", it: "'Tempi sacri' fissi per la relazione primaria. La gestione del calendario come atto d'amore." },
                growth: { de: "Der Tiefensuchende lernt: Qualität ist wichtiger als Quantität der Zeit. Der Vielfältige lernt: Echte Priorisierung zeigt sich in Taten, nicht Worten.", en: "The depth-seeker learns: quality is more important than quantity of time. The variety-lover learns: real prioritization shows in actions, not words.", fr: "Celui qui cherche la profondeur apprend : la qualité est plus importante que la quantité de temps. Celui qui cherche la variété apprend : la vraie priorisation se montre dans les actes, non les mots.", it: "Chi cerca la profondità impara: la qualità è più importante della quantità di tempo. Chi cerca la varietà impara: la vera prioritizzazione si mostra nei fatti, non nelle parole." }
            }
        },

        "kommunikationsstil": {
            archetypes: ["alle"],
            title: { de: "Der Dialog der Missverständnisse", en: "The Dialogue of Misunderstandings", fr: "Le Dialogue des Malentendus", it: "Il Dialogo dei Malintesi" },
            dynamics: {
                pattern: { de: "Unterschiedliche GFK-Kompetenzen führen zu Eskalationsspiralen. Einer spricht Gefühle, der andere hört Vorwürfe.", en: "Different NVC competencies lead to escalation spirals. One speaks feelings, the other hears accusations.", fr: "Des compétences CNV différentes conduisent à des spirales d'escalade. L'un parle de sentiments, l'autre entend des reproches.", it: "Diverse competenze CNV portano a spirali di escalation. Uno parla di sentimenti, l'altro sente accuse." },
                escalation: { de: "Bedürfnisäußerung wird als Kritik interpretiert. Rückzug wird als Desinteresse gelesen.", en: "Expression of needs is interpreted as criticism. Withdrawal is read as disinterest.", fr: "L'expression d'un besoin est interprétée comme une critique. Le retrait est lu comme du désintérêt.", it: "L'espressione dei bisogni viene interpretata come critica. Il ritiro viene letto come disinteresse." },
                core_wound: { de: "Nicht gehört werden – das Gefühl, die eigene Wahrheit nicht vermitteln zu können.", en: "Not being heard – the feeling of not being able to convey one's own truth.", fr: "Ne pas être entendu – le sentiment de ne pas pouvoir transmettre sa propre vérité.", it: "Non essere ascoltato – la sensazione di non poter trasmettere la propria verità." }
            },
            resolution: {
                understanding: { de: "Kommunikation ist Übersetzungsarbeit. Beide sprechen verschiedene emotionale Sprachen.", en: "Communication is translation work. Both speak different emotional languages.", fr: "La communication est un travail de traduction. Les deux parlent des langues émotionnelles différentes.", it: "La comunicazione è un lavoro di traduzione. Entrambi parlano lingue emotive diverse." },
                practical: { de: "GFK-Grundregeln gemeinsam lernen. 'Ich'-Aussagen. Bedürfnisse statt Vorwürfe.", en: "Learn NVC basics together. 'I'-statements. Needs instead of accusations.", fr: "Apprendre les bases de la CNV ensemble. Phrases en 'je'. Besoins plutôt que reproches.", it: "Imparare insieme le basi della CNV. Affermazioni in 'io'. Bisogni invece di accuse." },
                growth: { de: "Beide lernen: Zuhören ist wichtiger als verstanden werden. Empathie vor Rechtfertigung.", en: "Both learn: Listening is more important than being understood. Empathy before justification.", fr: "Les deux apprennent : écouter est plus important qu'être compris. L'empathie avant la justification.", it: "Entrambi imparano: ascoltare è più importante che essere capiti. Empatia prima della giustificazione." }
            }
        },

        "dominanz-dynamik": {
            archetypes: ["dom-dom", "sub-sub", "alle-unbalanced"],
            title: { de: "Das Macht-Balance-Spiel", en: "The Power Balance Game", fr: "Le Jeu d'Équilibre du Pouvoir", it: "Il Gioco dell'Equilibrio del Potere" },
            dynamics: {
                pattern: { de: "Zwei Dominante kämpfen um Führung. Zwei Submissive warten, dass der andere führt.", en: "Two dominants fight for leadership. Two submissives wait for the other to lead.", fr: "Deux dominants se disputent le leadership. Deux soumis attendent que l'autre prenne les rênes.", it: "Due dominanti si contendono la guida. Due sottomessi aspettano che l'altro guidi." },
                escalation: { de: "Machtkämpfe oder Stillstand. Keiner will nachgeben oder keiner will den ersten Schritt machen.", en: "Power struggles or standstill. No one wants to yield, or no one wants to take the first step.", fr: "Luttes de pouvoir ou impasse. Personne ne veut céder, ou personne ne veut faire le premier pas.", it: "Lotte di potere o stallo. Nessuno vuole cedere, o nessuno vuole fare il primo passo." },
                core_wound: { de: "Kontrollverlust-Angst (dominant) oder Überforderungs-Angst (submissiv).", en: "Fear of losing control (dominant) or fear of being overwhelmed (submissive).", fr: "Peur de perdre le contrôle (dominant) ou peur d'être dépassé (soumis).", it: "Paura di perdere il controllo (dominante) o paura di essere sopraffatti (sottomesso)." }
            },
            resolution: {
                understanding: { de: "Dominanz und Submission sind kontextabhängig. Niemand muss in jeder Situation führen oder folgen.", en: "Dominance and submission are context-dependent. No one must lead or follow in every situation.", fr: "La dominance et la soumission dépendent du contexte. Personne ne doit diriger ou suivre dans chaque situation.", it: "Dominanza e sottomissione dipendono dal contesto. Nessuno deve guidare o seguire in ogni situazione." },
                practical: { de: "Domains aufteilen: Wer führt wo? Bewusste Rollenwechsel vereinbaren.", en: "Divide domains: who leads where? Agree on conscious role changes.", fr: "Répartir les domaines : qui dirige où ? Convenir de changements de rôles conscients.", it: "Dividere i domini: chi guida dove? Concordare cambi di ruolo consapevoli." },
                growth: { de: "Beide lernen: Stärke zeigt sich auch im Nachgeben. Führen heißt nicht Kontrollieren, Folgen heißt nicht Schwachsein.", en: "Both learn: strength also shows in yielding. Leading doesn't mean controlling, following doesn't mean weakness.", fr: "Les deux apprennent : la force se montre aussi dans la cession. Diriger ne signifie pas contrôler, suivre ne signifie pas être faible.", it: "Entrambi imparano: la forza si mostra anche nel cedere. Guidare non significa controllare, seguire non significa essere deboli." }
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // PSYCHOLOGISCHE TIEFENERKLÄRUNGEN
    // ═══════════════════════════════════════════════════════════════════════════

    const psychologicalDepth = {
        pirsig: {
            staticDynamic: {
                title: { de: "Statische vs. Dynamische Qualität", en: "Static vs. Dynamic Quality", fr: "Qualité statique vs. dynamique", it: "Qualità statica vs. dinamica" },
                explanation: { de: "Pirsigs 'Metaphysics of Quality' unterscheidet zwischen statischer Qualität (bewährte Muster, Stabilität, Tradition) und dynamischer Qualität (Veränderung, Evolution, das Neue). Beziehungen brauchen beides: Genug statische Muster für Sicherheit, genug dynamische Qualität für Wachstum.", en: "Pirsig's 'Metaphysics of Quality' distinguishes between static quality (proven patterns, stability, tradition) and dynamic quality (change, evolution, the new). Relationships need both: enough static patterns for security, enough dynamic quality for growth.", fr: "La 'Métaphysique de la Qualité' de Pirsig distingue entre qualité statique (schémas éprouvés, stabilité, tradition) et qualité dynamique (changement, évolution, le nouveau). Les relations ont besoin des deux : suffisamment de schémas statiques pour la sécurité, suffisamment de qualité dynamique pour la croissance.", it: "La 'Metafisica della Qualità' di Pirsig distingue tra qualità statica (schemi collaudati, stabilità, tradizione) e qualità dinamica (cambiamento, evoluzione, il nuovo). Le relazioni hanno bisogno di entrambe: abbastanza schemi statici per la sicurezza, abbastanza qualità dinamica per la crescita." },
                application: { de: "Wenn zwei Menschen mit sehr unterschiedlichen Qualitätspräferenzen zusammenkommen, prallen Welten aufeinander: Der Statische erlebt den Dynamischen als chaotisch und unzuverlässig. Der Dynamische erlebt den Statischen als erstarrt und langweilig.", en: "When two people with very different quality preferences come together, worlds collide: the static one experiences the dynamic one as chaotic and unreliable. The dynamic one experiences the static one as rigid and boring.", fr: "Quand deux personnes aux préférences de qualité très différentes se rencontrent, les mondes s'entrechoquent : le statique vit le dynamique comme chaotique et peu fiable. Le dynamique vit le statique comme figé et ennuyeux.", it: "Quando due persone con preferenze di qualità molto diverse si incontrano, i mondi si scontrano: lo statico vive il dinamico come caotico e inaffidabile. Il dinamico vive lo statico come rigido e noioso." },
                resolution: { de: "Die Kunst liegt in der Balance: Nicht statisch ODER dynamisch, sondern ein Tanz zwischen beiden. Vereinbarungen schaffen (statisch), die Raum für Überraschungen lassen (dynamisch).", en: "The art lies in balance: not static OR dynamic, but a dance between both. Creating agreements (static) that leave room for surprises (dynamic).", fr: "L'art réside dans l'équilibre : non pas statique OU dynamique, mais une danse entre les deux. Créer des accords (statiques) qui laissent de la place aux surprises (dynamiques).", it: "L'arte sta nell'equilibrio: non statico O dinamico, ma una danza tra i due. Creare accordi (statici) che lascino spazio alle sorprese (dinamiche)." }
            },
            qualityEvent: {
                title: { de: "Der 'Quality Event' in Beziehungen", en: "The 'Quality Event' in Relationships", fr: "L''Événement de Qualité' dans les relations", it: "Il 'Quality Event' nelle relazioni" },
                explanation: { de: "Pirsig beschreibt 'Quality Events' als Momente, in denen etwas 'stimmt' – vor jeder rationalen Analyse. In Beziehungen sind das Momente echter Verbindung.", en: "Pirsig describes 'Quality Events' as moments when something 'feels right' – before any rational analysis. In relationships, these are moments of genuine connection.", fr: "Pirsig décrit les 'Quality Events' comme des moments où quelque chose 'est juste' – avant toute analyse rationnelle. Dans les relations, ce sont des moments de connexion authentique.", it: "Pirsig descrive i 'Quality Events' come momenti in cui qualcosa 'va bene' – prima di qualsiasi analisi razionale. Nelle relazioni, sono momenti di connessione autentica." },
                application: { de: "Wenn Quality Events fehlen, wird die Beziehung zur rationalen Konstruktion ohne Seele. Wenn sie da sind, können sie über viele Unterschiede hinwegtragen.", en: "When Quality Events are absent, the relationship becomes a rational construction without soul. When they are present, they can carry over many differences.", fr: "Quand les Quality Events manquent, la relation devient une construction rationnelle sans âme. Quand ils sont là, ils peuvent surmonter beaucoup de différences.", it: "Quando i Quality Events mancano, la relazione diventa una costruzione razionale senza anima. Quando ci sono, possono superare molte differenze." },
                indicator: { de: "Achte darauf: Gibt es Momente, in denen ihr beide spürt 'das ist richtig' – ohne erklären zu können warum?", en: "Pay attention: Are there moments where both feel 'this is right' – without being able to explain why?", fr: "Soyez attentifs : y a-t-il des moments où vous ressentez tous les deux 'c'est juste' – sans pouvoir l'expliquer ?", it: "Prestate attenzione: ci sono momenti in cui entrambi sentite 'questo è giusto' – senza riuscire a spiegare perché?" }
            }
        },

        osho: {
            polarity: {
                title: { de: "Das Polaritätsprinzip", en: "The Polarity Principle", fr: "Le Principe de Polarité", it: "Il Principio di Polarità" },
                explanation: { de: "Osho betonte: Anziehung entsteht durch Gegensätze. Yin zieht Yang an. Ohne Polarität keine Spannung, ohne Spannung keine Leidenschaft.", en: "Osho emphasized: attraction arises through opposites. Yin attracts Yang. Without polarity, no tension; without tension, no passion.", fr: "Osho soulignait : l'attraction naît des contraires. Le yin attire le yang. Sans polarité, pas de tension ; sans tension, pas de passion.", it: "Osho sottolineava: l'attrazione nasce dagli opposti. Lo yin attrae lo yang. Senza polarità non c'è tensione; senza tensione non c'è passione." },
                application: { de: "Gleich und gleich gesellt sich gern – aber zündet keine Funken. Gegensätze ziehen sich an – aber können auch kollidieren.", en: "Like attracts like – but doesn't spark fires. Opposites attract – but can also collide.", fr: "Qui se ressemble s'assemble – mais n'allume pas d'étincelles. Les contraires s'attirent – mais peuvent aussi se heurter.", it: "I simili si attraggono – ma non fanno scintille. Gli opposti si attraggono – ma possono anche scontrarsi." },
                balance: { de: "Die Herausforderung: Genug Unterschied für Anziehung, genug Gemeinsamkeit für Verständnis. Der 'Sweet Spot' liegt in der Mitte.", en: "The challenge: enough difference for attraction, enough common ground for understanding. The 'sweet spot' lies in between.", fr: "Le défi : assez de différences pour l'attraction, assez de points communs pour la compréhension. Le 'sweet spot' est au milieu.", it: "La sfida: abbastanza differenze per l'attrazione, abbastanza punti in comune per la comprensione. Il 'sweet spot' è nel mezzo." }
            },
            naturalness: {
                title: { de: "Natürlichkeit vs. Konditionierung", en: "Naturalness vs. Conditioning", fr: "Naturel vs. Conditionnement", it: "Naturalezza vs. Condizionamento" },
                explanation: { de: "Osho unterschied zwischen natürlichen Impulsen und gesellschaftlicher Konditionierung. Viele unserer Beziehungserwartungen sind antrainiert, nicht authentisch.", en: "Osho distinguished between natural impulses and social conditioning. Many of our relationship expectations are trained in, not authentic.", fr: "Osho distinguait entre les impulsions naturelles et le conditionnement social. Beaucoup de nos attentes relationnelles sont apprises, non authentiques.", it: "Osho distingueva tra impulsi naturali e condizionamento sociale. Molte delle nostre aspettative relazionali sono apprese, non autentiche." },
                application: { de: "Fragen für Selbstreflexion: Will ICH Monogamie – oder wurde mir beigebracht, sie zu wollen? Will ICH heiraten – oder ist das Erwartungsdruck?", en: "Questions for self-reflection: Do I WANT monogamy – or was I taught to want it? Do I WANT to get married – or is that external pressure?", fr: "Questions de réflexion : Est-ce que JE veux la monogamie – ou m'a-t-on appris à la vouloir ? Est-ce que JE veux me marier – ou est-ce une pression externe ?", it: "Domande di auto-riflessione: Voglio IO la monogamia – o mi è stato insegnato a volerla? Voglio IO sposarmi – o è pressione esterna?" },
                liberation: { de: "Wahre Freiheit kommt nicht vom Rebellieren gegen alle Normen, sondern vom bewussten Wählen: Was passt zu MIR – unabhängig von 'normal' oder 'alternativ'?", en: "True freedom comes not from rebelling against all norms, but from conscious choice: What suits ME – regardless of 'normal' or 'alternative'?", fr: "La vraie liberté ne vient pas de la rébellion contre toutes les normes, mais du choix conscient : Qu'est-ce qui ME convient – indépendamment de 'normal' ou 'd'alternatif' ?", it: "La vera libertà non viene dalla ribellione contro tutte le norme, ma dalla scelta consapevole: cosa si adatta a ME – indipendentemente da 'normale' o 'alternativo'?" }
            },
            love_freedom: {
                title: { de: "Liebe und Freiheit", en: "Love and Freedom", fr: "Amour et Liberté", it: "Amore e Libertà" },
                explanation: { de: "Oshos berühmtes Zitat: 'Wenn du jemanden liebst, gib ihm Freiheit – das ist ein Test. Wenn er zurückkommt, ist er dein. Wenn nicht, war er es nie.'", en: "Osho's famous quote: 'If you love someone, give them freedom – it's a test. If they return, they are yours. If not, they never were.'", fr: "La célèbre citation d'Osho : 'Si tu aimes quelqu'un, donne-lui la liberté – c'est un test. S'il revient, il est à toi. Sinon, il ne l'était jamais.'", it: "La famosa citazione di Osho: 'Se ami qualcuno, dagli libertà – è un test. Se torna, è tuo. Se no, non lo era mai.'" },
                application: { de: "Echte Liebe klammert nicht. Sie hält fest UND lässt los. Dieses Paradox ist der Kern jeder reifen Beziehung.", en: "Genuine love doesn't cling. It holds AND lets go. This paradox is the core of every mature relationship.", fr: "L'amour vrai ne s'accroche pas. Il tient ET laisse aller. Ce paradoxe est au cœur de chaque relation mature.", it: "L'amore autentico non si aggrappa. Tiene E lascia andare. Questo paradosso è al cuore di ogni relazione matura." },
                practice: { de: "Liebe zeigt sich nicht in Kontrolle, sondern in Vertrauen. Nicht in Besitz, sondern in Freilassen.", en: "Love shows not in control, but in trust. Not in possession, but in release.", fr: "L'amour se montre non dans le contrôle, mais dans la confiance. Non dans la possession, mais dans la libération.", it: "L'amore si mostra non nel controllo, ma nella fiducia. Non nel possesso, ma nel lasciare andare." }
            }
        },

        gfk: {
            needs: {
                title: { de: "Universelle Bedürfnisse", en: "Universal Needs", fr: "Besoins Universels", it: "Bisogni Universali" },
                explanation: { de: "Rosenbergs GFK basiert auf der Annahme: Hinter jedem Verhalten steckt ein unerfülltes Bedürfnis. Konflikte entstehen nicht aus 'schlechtem Charakter', sondern aus ungehörten Bedürfnissen.", en: "Rosenberg's NVC is based on the assumption: Behind every behavior lies an unmet need. Conflicts don't arise from 'bad character', but from unheard needs.", fr: "La CNV de Rosenberg se base sur le postulat : derrière chaque comportement se cache un besoin non satisfait. Les conflits ne naissent pas d'un 'mauvais caractère', mais de besoins non entendus.", it: "La CNV di Rosenberg si basa sull'assunto: dietro ogni comportamento c'è un bisogno insoddisfatto. I conflitti non nascono dal 'cattivo carattere', ma da bisogni inascoltati." },
                application: { de: "Wenn dein Partner etwas tut, das dich verletzt, frage: Welches Bedürfnis versucht er/sie zu erfüllen? Diese Frage verändert alles.", en: "When your partner does something that hurts you, ask: What need is he/she trying to fulfill? This question changes everything.", fr: "Quand ton partenaire fait quelque chose qui te blesse, demande : Quel besoin essaie-t-il/elle de satisfaire ? Cette question change tout.", it: "Quando il tuo partner fa qualcosa che ti ferisce, chiedi: Quale bisogno sta cercando di soddisfare? Questa domanda cambia tutto." },
                practice: { de: "Anstatt: 'Du bist so egoistisch!' → 'Ich habe das Bedürfnis nach Zugehörigkeit. Wie können wir das gemeinsam erfüllen?'", en: "Instead of: 'You're so selfish!' → 'I have a need for belonging. How can we fulfill this together?'", fr: "Au lieu de : 'Tu es si égoïste !' → 'J'ai le besoin d'appartenance. Comment pouvons-nous le satisfaire ensemble ?'", it: "Invece di: 'Sei così egoista!' → 'Ho il bisogno di appartenenza. Come possiamo soddisfarlo insieme?'" }
            },
            empathy: {
                title: { de: "Empathie vor Lösung", en: "Empathy Before Solutions", fr: "L'Empathie avant les Solutions", it: "L'Empatia prima delle Soluzioni" },
                explanation: { de: "GFK lehrt: Die meisten Menschen brauchen zunächst Empathie, nicht Lösungen. Gehört werden ist oft wichtiger als Recht haben.", en: "NVC teaches: Most people need empathy first, not solutions. Being heard is often more important than being right.", fr: "La CNV enseigne : la plupart des gens ont d'abord besoin d'empathie, non de solutions. Être entendu est souvent plus important qu'avoir raison.", it: "La CNV insegna: la maggior parte delle persone ha prima bisogno di empatia, non di soluzioni. Essere ascoltati è spesso più importante che aver ragione." },
                application: { de: "Bevor du versuchst, den Konflikt zu lösen, stelle sicher, dass beide sich gehört fühlen. Das allein löst oft schon viel.", en: "Before trying to solve the conflict, make sure both feel heard. That alone often resolves much.", fr: "Avant d'essayer de résoudre le conflit, assurez-vous que les deux se sentent entendus. Cela seul résout souvent beaucoup.", it: "Prima di cercare di risolvere il conflitto, assicuratevi che entrambi si sentano ascoltati. Questo da solo spesso risolve molto." },
                practice: { de: "Wiederhole, was du gehört hast, bevor du antwortest: 'Ich höre, dass du...' Diese simple Technik verändert Gespräche fundamental.", en: "Repeat what you heard before responding: 'I hear that you...' This simple technique fundamentally changes conversations.", fr: "Répète ce que tu as entendu avant de répondre : 'J'entends que tu...' Cette simple technique change fondamentalement les conversations.", it: "Ripeti ciò che hai sentito prima di rispondere: 'Sento che tu...' Questa semplice tecnica cambia fondamentalmente le conversazioni." }
            },
            conflict_transformation: {
                title: { de: "Konflikt als Transformation", en: "Conflict as Transformation", fr: "Le Conflit comme Transformation", it: "Il Conflitto come Trasformazione" },
                explanation: { de: "GFK sieht Konflikte nicht als Probleme, sondern als Chancen zur Vertiefung. Jeder Konflikt zeigt unerfüllte Bedürfnisse auf.", en: "NVC sees conflicts not as problems, but as opportunities for deepening. Every conflict reveals unmet needs.", fr: "La CNV ne voit pas les conflits comme des problèmes, mais comme des opportunités d'approfondissement. Chaque conflit révèle des besoins non satisfaits.", it: "La CNV non vede i conflitti come problemi, ma come opportunità di approfondimento. Ogni conflitto rivela bisogni insoddisfatti." },
                application: { de: "Die tiefsten Beziehungen sind nicht konfliktfrei, sondern konfliktfähig. Sie wissen, wie man durch Stürme navigiert.", en: "The deepest relationships are not conflict-free, but conflict-capable. They know how to navigate through storms.", fr: "Les relations les plus profondes ne sont pas sans conflits, mais capables de conflits. Elles savent naviguer à travers les tempêtes.", it: "Le relazioni più profonde non sono prive di conflitti, ma capaci di conflitti. Sanno navigare attraverso le tempeste." },
                growth: { de: "Frage bei jedem Konflikt: Was will hier wachsen? Welches Bedürfnis will gehört werden?", en: "Ask in every conflict: What wants to grow here? What need wants to be heard?", fr: "Demandez à chaque conflit : Qu'est-ce qui veut grandir ici ? Quel besoin veut être entendu ?", it: "Chiedi ad ogni conflitto: Cosa vuole crescere qui? Quale bisogno vuole essere ascoltato?" }
            }
        },

        attachment: {
            styles: {
                title: { de: "Bindungsstile in Beziehungen", en: "Attachment Styles in Relationships", fr: "Les Styles d'Attachement dans les Relations", it: "Gli Stili di Attaccamento nelle Relazioni" },
                explanation: { de: "Die Attachment-Theorie (Bowlby, Ainsworth) identifiziert Bindungsmuster: Sicher, Ängstlich, Vermeidend, Desorganisiert. Diese Muster entstehen in der Kindheit und prägen unser Beziehungsverhalten.", en: "Attachment Theory (Bowlby, Ainsworth) identifies attachment patterns: Secure, Anxious, Avoidant, Disorganized. These patterns develop in childhood and shape all our relationship behavior.", fr: "La Théorie de l'Attachement (Bowlby, Ainsworth) identifie des schémas d'attachement : Sécurisé, Anxieux, Évitant, Désorganisé. Ces schémas se développent dans l'enfance et façonnent tout notre comportement relationnel.", it: "La Teoria dell'Attaccamento (Bowlby, Ainsworth) identifica schemi di attaccamento: Sicuro, Ansioso, Evitante, Disorganizzato. Questi schemi si sviluppano nell'infanzia e plasmano tutto il nostro comportamento relazionale." },
                application: {
                    secure: { de: "Sicher Gebundene können Nähe und Autonomie balancieren. Sie sind der 'sichere Hafen' für Partner.", en: "Securely attached can balance closeness and autonomy. They are the 'secure base' for their partner.", fr: "Les attachés sécurisés peuvent équilibrer proximité et autonomie. Ils sont le 'port sûr' pour leur partenaire.", it: "Gli attaccati sicuri possono bilanciare vicinanza e autonomia. Sono il 'porto sicuro' per il loro partner." },
                    anxious: { de: "Ängstlich Gebundene suchen viel Bestätigung und reagieren stark auf Distanz. Sie brauchen extra Reassurance.", en: "Anxiously attached seek much reassurance and react strongly to distance. They need extra reassurance.", fr: "Les attachés anxieux cherchent beaucoup de réassurance et réagissent fortement à la distance. Ils ont besoin de réassurance supplémentaire.", it: "Gli attaccati ansiosi cercano molta rassicurazione e reagiscono fortemente alla distanza. Hanno bisogno di rassicurazione extra." },
                    avoidant: { de: "Vermeidend Gebundene ziehen sich bei Nähe zurück. Sie brauchen Raum, nicht Verfolgung.", en: "Avoidantly attached withdraw when closeness comes. They need space, not pursuit.", fr: "Les attachés évitants se retirent quand la proximité arrive. Ils ont besoin d'espace, non de poursuite.", it: "Gli attaccati evitanti si ritirano quando arriva la vicinanza. Hanno bisogno di spazio, non di inseguimento." },
                    disorganized: { de: "Desorganisiert Gebundene schwanken zwischen Annäherung und Flucht. Sie brauchen Konsistenz und Geduld.", en: "Disorganizedly attached oscillate between approach and flight. They need consistency and patience.", fr: "Les attachés désorganisés oscillent entre approche et fuite. Ils ont besoin de consistance et de patience.", it: "Gli attaccati disorganizzati oscillano tra avvicinamento e fuga. Hanno bisogno di coerenza e pazienza." }
                },
                healing: { de: "Gute Nachricht: Bindungsstile können sich ändern. 'Earned Security' entsteht durch bewusste Arbeit und heilsame Beziehungserfahrungen.", en: "Good news: Attachment styles can change. 'Earned Security' develops through conscious work and healing relationship experiences.", fr: "Bonne nouvelle : les styles d'attachement peuvent changer. La 'Sécurité Acquise' se développe par un travail conscient et des expériences relationnelles guérissantes.", it: "Buona notizia: gli stili di attaccamento possono cambiare. La 'Sicurezza Acquisita' si sviluppa attraverso il lavoro consapevole e esperienze relazionali curative." }
            },
            repair: {
                title: { de: "Rupture & Repair", en: "Rupture & Repair", fr: "Rupture et Réparation", it: "Rottura e Riparazione" },
                explanation: { de: "Forschung zeigt: Nicht die Abwesenheit von Konflikten macht Beziehungen stark, sondern die Fähigkeit zur Reparatur nach Brüchen.", en: "Research shows: what makes relationships strong is not the absence of conflict, but the capacity to repair after ruptures.", fr: "La recherche montre : ce qui rend les relations fortes n'est pas l'absence de conflits, mais la capacité à se réparer après les ruptures.", it: "La ricerca mostra: ciò che rende le relazioni forti non è l'assenza di conflitti, ma la capacità di ripararsi dopo le rotture." },
                application: { de: "Jeder Konflikt ist ein 'Rupture'. Die Stärke einer Beziehung zeigt sich im 'Repair' – wie schnell und vollständig man zurückfindet.", en: "Every conflict is a 'Rupture'. The strength of a relationship shows in the 'Repair' – how quickly and fully you find your way back.", fr: "Chaque conflit est une 'Rupture'. La force d'une relation se montre dans la 'Réparation' – à quelle vitesse et complètement on se retrouve.", it: "Ogni conflitto è una 'Rottura'. La forza di una relazione si mostra nella 'Riparazione' – quanto velocemente e completamente ci si ritrova." },
                practice: { de: "Nach jedem Streit: Aktive Reparatur. 'Ich sehe, dass dich verletzt hat. Das war nicht meine Absicht. Wie können wir das heilen?'", en: "After every argument: active repair. 'I see that this hurt you. That wasn't my intention. How can we heal this?'", fr: "Après chaque dispute : réparation active. 'Je vois que cela t'a blessé. Ce n'était pas mon intention. Comment pouvons-nous guérir cela ?'", it: "Dopo ogni litigio: riparazione attiva. 'Vedo che questo ti ha ferito. Non era mia intenzione. Come possiamo guarirlo?'" }
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // TOP 10 RANKING PHRASEN
    // ═══════════════════════════════════════════════════════════════════════════

    const top10Phrases = {
        rankings: {
            1: {
                title: { de: "Außergewöhnlich hohe Kompatibilität", en: "Exceptionally high compatibility", fr: "Compatibilité exceptionnellement élevée", it: "Compatibilità eccezionalmente alta" },
                description: { de: "Eine seltene Konstellation: Diese Verbindung vereint tiefe emotionale Resonanz mit struktureller Passung. Hier können beide Partner auf natürliche Weise wachsen.", en: "A rare constellation: this connection combines deep emotional resonance with structural fit. Both partners can grow here naturally.", fr: "Une constellation rare : cette connexion combine une résonance émotionnelle profonde avec une adéquation structurelle. Les deux partenaires peuvent grandir ici naturellement.", it: "Una costellazione rara: questo legame combina una profonda risonanza emotiva con un'adeguatezza strutturale. Entrambi i partner possono crescere qui naturalmente." },
                potential: { de: "Höchstes Potenzial", en: "Highest potential", fr: "Plus haut potentiel", it: "Massimo potenziale" }
            },
            2: {
                title: { de: "Sehr hohe Kompatibilität", en: "Very high compatibility", fr: "Compatibilité très élevée", it: "Compatibilità molto alta" },
                description: { de: "Starke Grundlagen auf emotionaler und rationaler Ebene. Die wenigen Unterschiede sind eher bereichernd als belastend.", en: "Strong foundations on emotional and rational levels. The few differences are enriching rather than burdensome.", fr: "Bases solides sur les plans émotionnel et rationnel. Les quelques différences sont enrichissantes plutôt que contraignantes.", it: "Basi solide sul piano emotivo e razionale. Le poche differenze sono arricchenti piuttosto che gravose." },
                potential: { de: "Sehr hohes Potenzial", en: "Very high potential", fr: "Très haut potentiel", it: "Potenziale molto alto" }
            },
            3: {
                title: { de: "Hohe Kompatibilität", en: "High compatibility", fr: "Compatibilité élevée", it: "Compatibilità alta" },
                description: { de: "Eine vielversprechende Konstellation mit solider Basis. Kleinere Differenzen bieten Raum für gegenseitiges Lernen.", en: "A promising constellation with a solid basis. Minor differences offer room for mutual learning.", fr: "Une constellation prometteuse avec une base solide. Les différences mineures offrent de la place pour un apprentissage mutuel.", it: "Una costellazione promettente con una base solida. Le differenze minori offrono spazio per l'apprendimento reciproco." },
                potential: { de: "Hohes Potenzial", en: "High potential", fr: "Haut potentiel", it: "Alto potenziale" }
            },
            4: {
                title: { de: "Überdurchschnittliche Kompatibilität", en: "Above-average compatibility", fr: "Compatibilité supérieure à la moyenne", it: "Compatibilità superiore alla media" },
                description: { de: "Mehr verbindet als trennt. Mit bewusster Kommunikation kann diese Verbindung sehr erfüllend werden.", en: "More connects than separates. With conscious communication, this connection can become very fulfilling.", fr: "Plus relie que ne sépare. Avec une communication consciente, ce lien peut devenir très épanouissant.", it: "Più collega che separa. Con una comunicazione consapevole, questo legame può diventare molto appagante." },
                potential: { de: "Gutes Potenzial", en: "Good potential", fr: "Bon potentiel", it: "Buon potenziale" }
            },
            5: {
                title: { de: "Gute Kompatibilität", en: "Good compatibility", fr: "Bonne compatibilité", it: "Buona compatibilità" },
                description: { de: "Eine stabile Grundlage mit Entwicklungsfeldern. Beide Partner bringen wertvolle Qualitäten ein.", en: "A stable foundation with areas for development. Both partners bring valuable qualities.", fr: "Une base stable avec des domaines de développement. Les deux partenaires apportent des qualités précieuses.", it: "Una base stabile con aree di sviluppo. Entrambi i partner portano qualità preziose." },
                potential: { de: "Solides Potenzial", en: "Solid potential", fr: "Potentiel solide", it: "Potenziale solido" }
            },
            6: {
                title: { de: "Solide Kompatibilität", en: "Solid compatibility", fr: "Compatibilité solide", it: "Compatibilità solida" },
                description: { de: "Die Basis ist tragfähig. Einige Bereiche erfordern aktive Aushandlung und Kompromissbereitschaft.", en: "The basis is viable. Some areas require active negotiation and willingness to compromise.", fr: "La base est viable. Certains domaines nécessitent une négociation active et une volonté de compromis.", it: "La base è sostenibile. Alcune aree richiedono negoziazione attiva e disponibilità al compromesso." },
                potential: { de: "Moderates Potenzial", en: "Moderate potential", fr: "Potentiel modéré", it: "Potenziale moderato" }
            },
            7: {
                title: { de: "Moderate Kompatibilität", en: "Moderate compatibility", fr: "Compatibilité modérée", it: "Compatibilità moderata" },
                description: { de: "Chancen und Herausforderungen halten sich die Waage. Erfolg hängt von der Bereitschaft ab, an Unterschieden zu arbeiten.", en: "Opportunities and challenges balance each other out. Success depends on willingness to work on differences.", fr: "Les opportunités et les défis s'équilibrent. Le succès dépend de la volonté de travailler sur les différences.", it: "Le opportunità e le sfide si equilibrano. Il successo dipende dalla disponibilità a lavorare sulle differenze." },
                potential: { de: "Mittleres Potenzial", en: "Medium potential", fr: "Potentiel moyen", it: "Potenziale medio" }
            },
            8: {
                title: { de: "Entwicklungsbedürftige Kompatibilität", en: "Compatibility needing development", fr: "Compatibilité nécessitant du développement", it: "Compatibilità che necessita di sviluppo" },
                description: { de: "Signifikante Unterschiede erfordern bewusste Arbeit. Erfolg ist möglich, aber nicht garantiert.", en: "Significant differences require conscious work. Success is possible but not guaranteed.", fr: "Des différences significatives nécessitent un travail conscient. Le succès est possible mais non garanti.", it: "Differenze significative richiedono un lavoro consapevole. Il successo è possibile ma non garantito." },
                potential: { de: "Herausforderndes Potenzial", en: "Challenging potential", fr: "Potentiel difficile", it: "Potenziale difficile" }
            },
            9: {
                title: { de: "Herausfordernde Kompatibilität", en: "Challenging compatibility", fr: "Compatibilité difficile", it: "Compatibilità difficile" },
                description: { de: "Die Grundkonstellationen divergieren deutlich. Nur mit hoher Bereitschaft zur Entwicklung auf beiden Seiten tragfähig.", en: "The basic constellations diverge significantly. Viable only with high readiness for development on both sides.", fr: "Les constellations de base divergent significativement. Viable seulement avec une haute volonté de développement des deux côtés.", it: "Le costellazioni di base divergono significativamente. Sostenibile solo con un'alta disponibilità allo sviluppo da entrambe le parti." },
                potential: { de: "Anspruchsvolles Potenzial", en: "Demanding potential", fr: "Potentiel exigeant", it: "Potenziale esigente" }
            },
            10: {
                title: { de: "Komplexe Kompatibilität", en: "Complex compatibility", fr: "Compatibilité complexe", it: "Compatibilità complessa" },
                description: { de: "Fundamentale Unterschiede prägen diese Konstellation. Kann funktionieren, erfordert aber außerordentliches Commitment.", en: "Fundamental differences characterize this constellation. Can work, but requires extraordinary commitment.", fr: "Des différences fondamentales caractérisent cette constellation. Peut fonctionner, mais nécessite un engagement extraordinaire.", it: "Differenze fondamentali caratterizzano questa costellazione. Può funzionare, ma richiede un impegno straordinario." },
                potential: { de: "Schwieriges Potenzial", en: "Difficult potential", fr: "Potentiel difficile", it: "Potenziale difficile" }
            }
        },

        intro: {
            single: {
                de: ["Im Vergleich mit allen Archetypen zeigt sich:", "Die Ranking-Analyse offenbart:", "Betrachtet man alle möglichen Konstellationen:"],
                en: ["When compared with all archetypes:", "The ranking analysis reveals:", "Looking at all possible constellations:"],
                fr: ["En comparaison avec tous les archétypes:", "L'analyse de classement révèle:", "En examinant toutes les constellations possibles:"],
                it: ["In confronto con tutti gli archetipi:", "L'analisi del ranking rivela:", "Esaminando tutte le possibili costellazioni:"]
            },
            comparison: {
                de: ["Im direkten Vergleich:", "Die Gegenüberstellung zeigt:", "Analysiert man die Top 10:"],
                en: ["In direct comparison:", "The juxtaposition shows:", "Analyzing the top 10:"],
                fr: ["En comparaison directe:", "La confrontation montre:", "En analysant le top 10:"],
                it: ["In confronto diretto:", "Il raffronto mostra:", "Analizzando la top 10:"]
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
                ],
                fr: [
                    "Tête et cœur parlent ici la même langue. Ce lien est à la fois émotionnellement résonnant et structurellement viable.",
                    "Rarement sentiment et raison s'accordent autant que dans cette constellation.",
                    "Ici se rencontrent deux personnes qui se trouvent mutuellement sur les deux niveaux – émotionnel et rationnel."
                ],
                it: [
                    "Testa e cuore parlano qui la stessa lingua. Questo legame è sia emotivamente risonante che strutturalmente sostenibile.",
                    "Raramente sentimento e ragione concordano tanto quanto in questa costellazione.",
                    "Qui si incontrano due persone che si trovano reciprocamente su entrambi i livelli – emotivo e razionale."
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
                ],
                fr: [
                    "Tête et cœur évaluent ce lien différemment. Cela crée de la tension, mais aussi du potentiel de développement.",
                    "Ce qui semble émotionnellement juste soulève des questions rationnelles – ou vice versa.",
                    "L'écart entre sentiment et analyse fait partie de la dynamique ici."
                ],
                it: [
                    "Testa e cuore valutano questo legame diversamente. Ciò crea tensione, ma anche potenziale di sviluppo.",
                    "Ciò che si sente emotivamente giusto solleva domande razionali – o viceversa.",
                    "La discrepanza tra sentimento e analisi è parte della dinamica qui."
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
                ],
                fr: [
                    "Une constellation équilibrée : ni euphorique ni problématique, mais avec du potentiel.",
                    "Pathos et Logos se tiennent en équilibre – ici, c'est la mise en forme consciente qui décide.",
                    "Les niveaux émotionnel et rationnel sont tous deux neutres – ce que vous en faites vous appartient."
                ],
                it: [
                    "Una costellazione equilibrata: né euforica né problematica, ma con potenziale.",
                    "Pathos e Logos si bilanciano – qui decide la modellazione consapevole.",
                    "Il livello emotivo e razionale sono entrambi neutrali – quello che ne fate dipende da voi."
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
                ],
                fr: [
                    "L'intégration montre : c'est un lien avec un potentiel de profondeur. La résonance émotionnelle rencontre l'alignement des valeurs.",
                    "Les deux perspectives – le ressentir et le penser – soutiennent ce lien.",
                    "L'interaction de Pathos et Logos est ici constructive : sentiment et structure se renforcent mutuellement."
                ],
                it: [
                    "L'integrazione mostra: questo è un legame con potenziale di profondità. La risonanza emotiva incontra l'allineamento dei valori.",
                    "Entrambe le prospettive – il sentire e il pensare – sostengono questo legame.",
                    "L'interazione di Pathos e Logos è qui costruttiva: sentimento e struttura si rafforzano reciprocamente."
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
                ],
                fr: [
                    "La vue intégrée montre lumière et ombre. Les forces dans un domaine compensent les faiblesses dans l'autre.",
                    "Ni euphorie émotionnelle ni enthousiasme rationnel – mais les deux ensemble donnent une image viable.",
                    "L'interaction est complexe : ce qui convient émotionnellement exige structurellement – et vice versa."
                ],
                it: [
                    "La visione integrata mostra luci e ombre. I punti di forza in un'area compensano le debolezze nell'altra.",
                    "Né euforia emotiva né entusiasmo razionale – ma entrambi insieme dipingono un quadro sostenibile.",
                    "L'interazione è complessa: ciò che si adatta emotivamente richiede strutturalmente – e viceversa."
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
                ],
                fr: [
                    "Des défis apparaissent tant émotionnellement que rationnellement. Ce n'est pas un refus, mais un avertissement.",
                    "L'analyse intégrée est honnête : ce lien nécessite un travail de conscience considérable.",
                    "Ni le cœur ni la tête ne s'enthousiasment spontanément – ce qui signifie : il faut construire activement ici."
                ],
                it: [
                    "Sia emotivamente che razionalmente emergono sfide. Non è un rifiuto, ma un avvertimento.",
                    "L'analisi integrata è onesta: questo legame richiede un considerevole lavoro di coscienza.",
                    "Né cuore né testa si entusiasmano spontaneamente – il che significa: qui bisogna costruire attivamente."
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
                ],
                fr: [
                    "Conclusion : une constellation avec un réel potentiel. La base est là – il s'agit maintenant de l'utiliser.",
                    "En résumé : de bonnes conditions pour un lien épanouissant. Le reste est travail et engagement.",
                    "Le tableau d'ensemble est encourageant : quelque chose de significatif peut naître ici."
                ],
                it: [
                    "Conclusione: una costellazione con reale potenziale. La base c'è – ora si tratta di usarla.",
                    "In sintesi: buone condizioni per un legame appagante. Il resto è lavoro e impegno.",
                    "Il quadro complessivo è incoraggiante: qui può nascere qualcosa di significativo."
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
                ],
                fr: [
                    "Conclusion : pas automatiquement facile, pas automatiquement difficile. Ce lien est ce que vous en faites.",
                    "En résumé : potentiel et défi en équilibre. La communication consciente est la clé.",
                    "Le tableau d'ensemble est ouvert : ni succès garanti ni échec préprogrammé."
                ],
                it: [
                    "Conclusione: non automaticamente facile, non automaticamente difficile. Questo legame è quello che ne fate.",
                    "In sintesi: potenziale e sfida in equilibrio. La comunicazione consapevole è la chiave.",
                    "Il quadro complessivo è aperto: né successo garantito né fallimento preprogrammato."
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
                ],
                fr: [
                    "Conclusion : ce lien est possible, mais pas probable. Il nécessite une volonté extraordinaire de développement.",
                    "En résumé : l'analyse montre des différences fondamentales. Ce n'est pas une impossibilité, mais un défi sérieux.",
                    "Le tableau d'ensemble invite à la prudence : si les deux sont prêts, ça peut fonctionner – mais ça coûtera des efforts."
                ],
                it: [
                    "Conclusione: questo legame è possibile, ma non probabile. Richiede una straordinaria disponibilità allo sviluppo.",
                    "In sintesi: l'analisi mostra differenze fondamentali. Non è un'impossibilità, ma una sfida seria.",
                    "Il quadro complessivo invita alla cautela: se entrambi sono disponibili, può funzionare – ma costerà fatica."
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
        if (!conflict) {
            return {
                core: getLocalizedString("Keine spezifischen inneren Konflikte identifiziert.", "No specific inner conflicts identified.", "Aucun conflit intérieur spécifique identifié.", "Nessun conflitto interiore specifico identificato."),
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
                source: getLocalizedString("GFK", "NVC", "CNV", "CNV"),
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

        const summaryTemplate = getLocalizedString(
            `Von den ${rankings.length} möglichen Kombinationen sind hier die Top 10 für ${archetypeId}.`,
            `Of the ${rankings.length} possible combinations, here are the top 10 for ${archetypeId}.`,
            `De ${rankings.length} combinaisons possibles, voici le top 10 pour ${archetypeId}.`,
            `Di ${rankings.length} possibili combinazioni, ecco la top 10 per ${archetypeId}.`
        );

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

        const labels = {
            integratedSynthesis: getLocalizedString("Integrierte Synthese", "Integrated Synthesis", "Synthèse intégrée", "Sintesi integrata"),
            innerConflict: getLocalizedString("Innerer Konflikt", "Inner Conflict", "Conflit intérieur", "Conflitto interiore"),
            conclusion: getLocalizedString("Fazit", "Conclusion", "Conclusion", "Conclusione")
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
        const labels = {
            psychological: getLocalizedString("Psychologisch", "Psychological", "Psychologique", "Psicologico"),
            shadow: getLocalizedString("Schatten", "Shadow", "Ombre", "Ombra"),
            growth: getLocalizedString("Wachstum", "Growth", "Croissance", "Crescita"),
            pattern: getLocalizedString("Muster", "Pattern", "Schéma", "Schema"),
            escalation: getLocalizedString("Eskalation", "Escalation", "Escalade", "Escalation"),
            core_wound: getLocalizedString("Kernwunde", "Core wound", "Blessure centrale", "Ferita centrale"),
            understanding: getLocalizedString("Verständnis", "Understanding", "Compréhension", "Comprensione"),
            practical: getLocalizedString("Praktisch", "Practical", "Pratique", "Pratico"),
            pathos: getLocalizedString("Pathos-Score", "Pathos score", "Score Pathos", "Punteggio Pathos"),
            logos: getLocalizedString("Logos-Score", "Logos score", "Score Logos", "Punteggio Logos"),
            total: getLocalizedString("Gesamtscore", "Overall score", "Score total", "Punteggio totale"),
            resonance: getLocalizedString("Resonanz", "Resonance", "Résonance", "Risonanza"),
            integration: getLocalizedString("Integration", "Integration", "Intégration", "Integrazione"),
            tonality: getLocalizedString("Tonalität", "Tonality", "Tonalité", "Tonalità")
        };

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
