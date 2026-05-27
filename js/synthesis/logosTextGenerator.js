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
            en: ["Furthermore", "In addition", "Moreover", "Additionally", "Beyond this"],
            fr: ["De plus", "En outre", "Aussi", "Qui plus est", "Au-delà de cela"],
            it: ["Inoltre", "Altresì", "Anche", "Oltretutto", "Al di là di ciò"]
        },
        causal: {
            de: ["Somit", "Daher", "Entsprechend", "Folglich", "Dementsprechend"],
            en: ["Thus", "Therefore", "Accordingly", "Consequently", "In line with this"],
            fr: ["Ainsi", "Par conséquent", "En conséquence", "Il s'ensuit que", "Conformément à cela"],
            it: ["Quindi", "Pertanto", "Di conseguenza", "Ne consegue che", "Conformemente a ciò"]
        },
        contrast: {
            de: ["Andererseits", "Dennoch", "Gleichwohl", "Dessen ungeachtet", "Allerdings"],
            en: ["On the other hand", "Nevertheless", "Nonetheless", "Despite this", "However"],
            fr: ["D'un autre côté", "Néanmoins", "Toutefois", "Malgré cela", "Cependant"],
            it: ["D'altra parte", "Tuttavia", "Nondimeno", "Nonostante ciò", "Però"]
        },
        structuring: {
            de: ["Strukturell betrachtet", "Insgesamt", "Grundsätzlich", "Aus analytischer Sicht"],
            en: ["Structurally considered", "Overall", "Fundamentally", "From an analytical perspective"],
            fr: ["D'un point de vue structurel", "Dans l'ensemble", "Fondamentalement", "D'une perspective analytique"],
            it: ["Da un punto di vista strutturale", "Nel complesso", "Fondamentalmente", "Da una prospettiva analitica"]
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
            ],
            fr: [
                "{name} opère avec des structures claires et des valeurs définies – la fiabilité constitue le fondement.",
                "La philosophie relationnelle de {name} se base sur des schémas établis et des principes éprouvés.",
                "{name} priorise la stabilité et la continuité dans la conception des relations.",
                "Pour {name}, des cadres clairs et des accords contraignants sont essentiels."
            ],
            it: [
                "{name} opera con strutture chiare e valori definiti – l'affidabilità costituisce il fondamento.",
                "La filosofia relazionale di {name} si basa su schemi consolidati e principi collaudati.",
                "{name} dà priorità alla stabilità e alla continuità nella progettazione delle relazioni.",
                "Per {name} sono essenziali quadri chiari e accordi vincolanti."
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
            ],
            fr: [
                "{name} équilibre le besoin de structure et la capacité d'adaptation.",
                "La logique relationnelle de {name} combine des principes fixes avec une flexibilité situationnelle.",
                "{name} valorise la fiabilité sans rejeter fondamentalement le changement.",
                "Le pragmatisme caractérise l'approche de {name} : structure où nécessaire, ouverture où possible."
            ],
            it: [
                "{name} bilancia il bisogno di struttura e la capacità di adattamento.",
                "La logica relazionale di {name} combina principi fissi con flessibilità situazionale.",
                "{name} apprezza l'affidabilità senza rifiutare fondamentalmente il cambiamento.",
                "Il pragmatismo caratterizza l'approccio di {name}: struttura dove necessario, apertura dove possibile."
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
            ],
            fr: [
                "{name} préfère des structures adaptatives aux ensembles de règles fixes.",
                "La flexibilité n'est pas un compromis pour {name}, mais un principe fondamental.",
                "La logique relationnelle de {name} s'adapte au contexte – sans normes préétablies.",
                "{name} redéfinit les règles relationnelles de manière situationnelle, plutôt que de les fixer à l'avance."
            ],
            it: [
                "{name} preferisce strutture adattive ai sistemi di regole fissi.",
                "La flessibilità per {name} non è un compromesso, ma un principio fondamentale.",
                "La logica relazionale di {name} si adatta al contesto – senza norme prestabilite.",
                "{name} ridefinisce le regole relazionali in modo situazionale, piuttosto che stabilirle in anticipo."
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
            ],
            fr: [
                "La philosophie relationnelle peut se résumer ainsi : {philosophy}",
                "Fondamentalement pour {name} : {philosophy}",
                "Le principe sous-jacent : {philosophy}"
            ],
            it: [
                "La filosofia relazionale può essere riassunta così: {philosophy}",
                "Fondamentalmente per {name}: {philosophy}",
                "Il principio sottostante: {philosophy}"
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
            ],
            fr: [
                "Les valeurs centrales sont {values} – elles forment la boussole pour les décisions relationnelles.",
                "Les valeurs fondamentales {values} définissent ce que {name} priorise dans les relations.",
                "{name} s'oriente selon les valeurs directrices {values}."
            ],
            it: [
                "I valori centrali sono {values} – questi formano la bussola per le decisioni relazionali.",
                "I valori fondamentali {values} definiscono ciò che {name} prioritizza nelle relazioni.",
                "{name} si orienta secondo i valori guida {values}."
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
            ],
            fr: [
                "Explicitement évité : {avoids}.",
                "Classifié comme problématique : {avoids}.",
                "{name} se délimite clairement de : {avoids}."
            ],
            it: [
                "Esplicitamente evitato: {avoids}.",
                "Classificato come problematico: {avoids}.",
                "{name} si delimita chiaramente da: {avoids}."
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
            ],
            fr: [
                "Les préférences structurelles comprennent : {prefs}.",
                "Paramètres de cadre concrets : {prefs}.",
                "La configuration préférée : {prefs}."
            ],
            it: [
                "Le preferenze strutturali includono: {prefs}.",
                "Parametri di quadro concreti: {prefs}.",
                "La configurazione preferita: {prefs}."
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
                ],
                fr: [
                    "{name} a une haute compétence CNV : les quatre étapes (observation, sentiment, besoin, demande) sont appliquées de manière cohérente.",
                    "Structure de communication de {name} : niveau CNV élevé – séparation claire entre observation et jugement.",
                    "{name} communique selon les normes CNV : les besoins sont exprimés, non formulés comme des accusations."
                ],
                it: [
                    "{name} ha un'alta competenza CNV: i quattro passi (osservazione, sentimento, bisogno, richiesta) vengono applicati in modo coerente.",
                    "Struttura comunicativa di {name}: livello CNV alto – chiara separazione tra osservazione e giudizio.",
                    "{name} comunica secondo gli standard CNV: i bisogni vengono espressi, non formulati come accuse."
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
                ],
                fr: [
                    "{name} a des connaissances de base en CNV, qui ne sont pas toujours accessibles sous le stress.",
                    "Structure de communication de {name} : niveau CNV moyen – théorie connue, pratique variable.",
                    "La compétence CNV de {name} fluctue selon la situation."
                ],
                it: [
                    "{name} ha conoscenze di base CNV, che non sono sempre accessibili sotto stress.",
                    "Struttura comunicativa di {name}: livello CNV medio – teoria nota, pratica variabile.",
                    "La competenza CNV di {name} varia a seconda della situazione."
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
                ],
                fr: [
                    "{name} montre un potentiel de développement dans la structure de communication – les schémas réactifs prédominent.",
                    "Structure de communication de {name} : niveau CNV faible – les jugements et accusations dominent.",
                    "La résolution des conflits chez {name} suit des schémas réactifs plutôt que structurés."
                ],
                it: [
                    "{name} mostra un potenziale di sviluppo nella struttura comunicativa – i pattern reattivi predominano.",
                    "Struttura comunicativa di {name}: livello CNV basso – giudizi e accuse dominano.",
                    "La risoluzione dei conflitti di {name} segue pattern reattivi piuttosto che strutturati."
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
                ],
                fr: [
                    "{name} assume structurellement le rôle principal – l'initiative de décision repose principalement ici.",
                    "La dynamique relationnelle est activement façonnée et dirigée par {name}.",
                    "{name} agit comme structurateur dans l'architecture relationnelle."
                ],
                it: [
                    "{name} assume strutturalmente il ruolo principale – l'iniziativa decisionale risiede principalmente qui.",
                    "La dinamica relazionale è attivamente plasmata e diretta da {name}.",
                    "{name} agisce come strutturatore nell'architettura relazionale."
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
                ],
                fr: [
                    "{name} préfère une position réceptive et responsive dans la structure relationnelle.",
                    "Le rôle de {name} est complémentaire : soutien plutôt que contrôle.",
                    "{name} apporte la capacité de lâcher-prise comme contribution structurelle."
                ],
                it: [
                    "{name} preferisce una posizione ricettiva e responsiva nella struttura relazionale.",
                    "Il ruolo di {name} è complementare: supporto piuttosto che controllo.",
                    "{name} contribuisce la capacità di abbandono come contributo strutturale."
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
                ],
                fr: [
                    "{name} alterne flexiblement entre les rôles de leader et de suiveur.",
                    "La flexibilité des rôles caractérise {name} : positionnement contextuel.",
                    "La structure relationnelle permet à {name} les deux positions – selon la situation."
                ],
                it: [
                    "{name} alterna flessibilmente tra ruoli di guida e di seguace.",
                    "La flessibilità di ruolo caratterizza {name}: posizionamento dipendente dal contesto.",
                    "La struttura relazionale permette a {name} entrambe le posizioni – a seconda della situazione."
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
                ],
                fr: [
                    "{name} aspire à une distribution symétrique des rôles.",
                    "L'équivalence est le principe directeur structurel pour {name}.",
                    "{name} se positionne au centre du spectre de dominance."
                ],
                it: [
                    "{name} aspira a una distribuzione simmetrica dei ruoli.",
                    "L'equivalenza è il principio guida strutturale per {name}.",
                    "{name} si posiziona al centro dello spettro di dominanza."
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
                ],
                fr: [
                    "La compatibilité structurelle de cette constellation forme une base viable.",
                    "L'analyse montre une forte concordance dans les paramètres fondamentaux.",
                    "D'une perspective rationnelle, {ich} et {partner} se complètent de manière constructive.",
                    "Les philosophies relationnelles des deux côtés montrent des intersections significatives.",
                    "La structure fondamentale de ce lien peut être évaluée comme stable."
                ],
                it: [
                    "La compatibilità strutturale di questa costellazione forma una base solida.",
                    "L'analisi mostra un'alta concordanza nei parametri fondamentali.",
                    "Da una prospettiva razionale, {ich} e {partner} si completano in modo costruttivo.",
                    "Le filosofie relazionali di entrambe le parti mostrano intersezioni significative.",
                    "La struttura fondamentale di questo legame può essere valutata come stabile."
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
                ],
                fr: [
                    "L'analyse structurelle montre à la fois des potentiels et des défis.",
                    "La compatibilité exige un travail conscient sur les différences.",
                    "{ich} et {partner} apportent des structures différentes mais combinables.",
                    "Les paramètres relationnels se situent dans la plage de compatibilité moyenne.",
                    "Le résultat dépend substantiellement de la qualité de communication."
                ],
                it: [
                    "L'analisi strutturale mostra sia potenziali che sfide.",
                    "La compatibilità richiede un lavoro consapevole sulle differenze.",
                    "{ich} e {partner} portano strutture diverse ma combinabili.",
                    "I parametri relazionali si trovano nell'intervallo di compatibilità media.",
                    "Il risultato dipende sostanzialmente dalla qualità della comunicazione."
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
                ],
                fr: [
                    "L'analyse structurelle révèle des différences fondamentales dans les paramètres de base.",
                    "La compatibilité exige un effort d'adaptation considérable des deux côtés.",
                    "Les philosophies relationnelles de {ich} et {partner} divergent fondamentalement.",
                    "Sans négociation active, des conflits structurels sont probables.",
                    "La constellation de base nécessite des conversations clarificatrices sur les attentes."
                ],
                it: [
                    "L'analisi strutturale rivela differenze fondamentali nei parametri di base.",
                    "La compatibilità richiede uno sforzo di adattamento considerevole da entrambe le parti.",
                    "Le filosofie relazionali di {ich} e {partner} divergono fondamentalmente.",
                    "Senza negoziazione attiva, i conflitti strutturali sono probabili.",
                    "La costellazione di base richiede conversazioni chiarificatrici sulle aspettative."
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
                ],
                fr: [
                    "Les deux partagent un besoin similaire de structure – cela facilite la coordination des paramètres de cadre.",
                    "La compatibilité des préférences de stabilité est élevée.",
                    "Structurellement, les deux opèrent à un niveau comparable.",
                    "La compréhension commune de l'ordre et de la fiabilité est une force."
                ],
                it: [
                    "Entrambi condividono un simile bisogno di struttura – questo facilita il coordinamento dei parametri di quadro.",
                    "La compatibilità delle preferenze di stabilità è alta.",
                    "Strutturalmente, entrambi operano a un livello comparabile.",
                    "La comprensione condivisa di ordine e affidabilità è un punto di forza."
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
                ],
                fr: [
                    "Les différents besoins de structure peuvent s'équilibrer mutuellement.",
                    "Là où l'un apporte la stabilité, l'autre permet la flexibilité.",
                    "La différence dans les préférences d'ordre peut devenir un enrichissement.",
                    "Besoins structurels complémentaires : l'un ancre, l'autre explore."
                ],
                it: [
                    "I diversi bisogni di struttura possono bilanciarsi reciprocamente.",
                    "Dove uno contribuisce stabilità, l'altro consente flessibilità.",
                    "La differenza nelle preferenze di ordine può diventare un arricchimento.",
                    "Bisogni strutturali complementari: uno ancora, l'altro esplora."
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
                ],
                fr: [
                    "Les différentes conceptions de la structure exigent une communication explicite.",
                    "Des préférences de stabilité différentes peuvent entraîner des frictions.",
                    "L'écart dans les besoins d'ordre est un champ de développement.",
                    "Des conflits structurels sont probables sans négociation claire."
                ],
                it: [
                    "Le diverse idee sulla struttura richiedono una comunicazione esplicita.",
                    "Diverse preferenze di stabilità possono portare ad attrito.",
                    "La discrepanza nei bisogni di ordine è un campo di sviluppo.",
                    "I conflitti strutturali sono probabili senza una chiara negoziazione."
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
                ],
                fr: [
                    "Des valeurs partagées telles que {values} forment une base stable pour la compréhension.",
                    "L'intersection de valeurs ({values}) permet une orientation commune.",
                    "L'accord sur {values} crée un terrain commun structurel."
                ],
                it: [
                    "Valori condivisi come {values} formano una base stabile per la comprensione.",
                    "L'intersezione di valori ({values}) consente un orientamento comune.",
                    "L'accordo su {values} crea un terreno comune strutturale."
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
                ],
                fr: [
                    "Conflit de valeurs potentiel : {ich} priorise '{value1}', que {partner} tend à éviter.",
                    "Une tension structurelle due à différentes hiérarchies de valeurs est à prévoir.",
                    "La constellation de valeurs montre un potentiel de conflit concernant '{value1}'."
                ],
                it: [
                    "Potenziale conflitto di valori: {ich} prioritizza '{value1}', che {partner} tende ad evitare.",
                    "Una tensione strutturale dovuta a diverse gerarchie di valori è da aspettarsi.",
                    "La costellazione di valori mostra potenziale di conflitto riguardo a '{value1}'."
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
                ],
                fr: [
                    "Les systèmes de valeurs se chevauchent peu – cela nécessite une construction active de ponts.",
                    "Une priorisation de valeurs différente rend la négociation explicite nécessaire."
                ],
                it: [
                    "I sistemi di valori si sovrappongono poco – ciò richiede una costruzione attiva di ponti.",
                    "Una diversa prioritizzazione dei valori rende necessaria una negoziazione esplicita."
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
                ],
                fr: [
                    "La structure de dominance est complémentaire – une distribution claire des rôles facilite la navigation.",
                    "La configuration de rôles asymétrique permet des responsabilités claires.",
                    "Structurellement, les positions de leader et de suiveur se complètent de manière optimale."
                ],
                it: [
                    "La struttura di dominanza è complementare – una chiara distribuzione dei ruoli facilita la navigazione.",
                    "La configurazione di ruoli asimmetrica consente responsabilità chiare.",
                    "Strutturalmente, le posizioni di guida e di seguace si completano in modo ottimale."
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
                ],
                fr: [
                    "Des positions de dominance similaires exigent une négociation consciente des rôles.",
                    "Sans différenciation naturelle des rôles, des chevauchements de compétences sont possibles.",
                    "La structure de dominance symétrique a besoin d'une répartition explicite des tâches."
                ],
                it: [
                    "Posizioni di dominanza simili richiedono una negoziazione consapevole dei ruoli.",
                    "Senza differenziazione naturale dei ruoli, sono possibili sovrapposizioni di competenze.",
                    "La struttura di dominanza simmetrica necessita di una divisione esplicita dei compiti."
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
                ],
                fr: [
                    "La flexibilité des rôles permet une adaptation situationnelle.",
                    "Au moins une composante switch augmente l'adaptabilité structurelle.",
                    "La dynamique de dominance peut être configurée selon le contexte."
                ],
                it: [
                    "La flessibilità di ruolo consente un adattamento situazionale.",
                    "Almeno una componente switch aumenta l'adattabilità strutturale.",
                    "La dinamica di dominanza può essere configurata a seconda del contesto."
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
                ],
                fr: [
                    "La haute compétence CNV mutuelle permet une résolution structurée des conflits.",
                    "Structure de communication : les deux peuvent articuler clairement leurs besoins – bon pronostic.",
                    "Les outils communicatifs sont présents des deux côtés."
                ],
                it: [
                    "L'alta competenza CNV reciproca consente una risoluzione strutturata dei conflitti.",
                    "Struttura comunicativa: entrambi possono articolare chiaramente i propri bisogni – buona prognosi.",
                    "Gli strumenti comunicativi sono presenti su entrambi i lati."
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
                ],
                fr: [
                    "Les différents niveaux de CNV exigent la patience du partenaire le plus compétent.",
                    "Asymétrie de communication : le partenaire versé en CNV peut construire des ponts.",
                    "L'écart dans la structure de communication est un champ d'apprentissage."
                ],
                it: [
                    "I diversi livelli CNV richiedono pazienza dal partner più competente.",
                    "Asimmetria comunicativa: il partner esperto di CNV può costruire ponti.",
                    "Il divario nella struttura comunicativa è un campo di apprendimento."
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
                ],
                fr: [
                    "Une faible compétence CNV mutuelle augmente le risque d'escalade.",
                    "Structure de communication : un champ de développement pour les deux côtés.",
                    "Sans investissement dans les compétences de communication, les conflits sont difficiles à résoudre."
                ],
                it: [
                    "La bassa competenza CNV reciproca aumenta il rischio di escalation.",
                    "Struttura comunicativa: un campo di sviluppo per entrambe le parti.",
                    "Senza investimento nelle competenze comunicative, i conflitti sono difficili da risolvere."
                ]
            }
        },
        categories: {
            A: {
                positiv: {
                    de: "Die Beziehungsphilosophien sind kompatibel.",
                    en: "The relationship philosophies are compatible.",
                    fr: "Les philosophies relationnelles sont compatibles.",
                    it: "Le filosofie relazionali sono compatibili."
                },
                negativ: {
                    de: "Fundamentale Unterschiede in der Beziehungsphilosophie erfordern Klärung.",
                    en: "Fundamental differences in relationship philosophy require clarification.",
                    fr: "Des différences fondamentales dans la philosophie relationnelle nécessitent une clarification.",
                    it: "Le differenze fondamentali nella filosofia relazionale richiedono chiarimento."
                }
            },
            B: {
                positiv: {
                    de: "Die Lebensstil-Kompatibilität ist gegeben.",
                    en: "Lifestyle compatibility is present.",
                    fr: "La compatibilité du mode de vie est présente.",
                    it: "La compatibilità dello stile di vita è presente."
                },
                negativ: {
                    de: "Unterschiedliche Lebensstil-Vorstellungen können zu Reibung führen.",
                    en: "Different lifestyle expectations can lead to friction.",
                    fr: "Différentes conceptions du mode de vie peuvent entraîner des frictions.",
                    it: "Diverse aspettative sullo stile di vita possono portare ad attrito."
                }
            },
            C: {
                positiv: {
                    de: "Die Kommunikationskompatibilität unterstützt die Verbindung.",
                    en: "Communication compatibility supports the connection.",
                    fr: "La compatibilité de communication soutient la connexion.",
                    it: "La compatibilità comunicativa sostiene la connessione."
                },
                negativ: {
                    de: "Kommunikationsmuster divergieren – hier liegt Entwicklungsbedarf.",
                    en: "Communication patterns diverge – development potential lies here.",
                    fr: "Les schémas de communication divergent – c'est ici que se trouve le potentiel de développement.",
                    it: "I pattern comunicativi divergono – qui si trova il potenziale di sviluppo."
                }
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
            ],
            fr: [
                "Coefficient de résonance R={r} : Forte concordance entre les niveaux rationnel et émotionnel. La structure tient.",
                "À R={r}, l'analyse montre : Logos et Pathos sont synchronisés – une configuration stable.",
                "La valeur de résonance de {r} indique une haute cohérence entre pensée et sentiment.",
                "R={r} signifie : La connexion est fondée sur plusieurs niveaux."
            ],
            it: [
                "Coefficiente di risonanza R={r}: Alta concordanza tra livelli razionale ed emotivo. La struttura regge.",
                "A R={r} l'analisi mostra: Logos e Pathos sono sincronizzati – una configurazione stabile.",
                "Il valore di risonanza di {r} indica alta coerenza tra pensiero e sentimento.",
                "R={r} significa: La connessione è fondata su più livelli."
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
            ],
            fr: [
                "Coefficient de résonance R={r} : Bonne concordance des paramètres rationnels et émotionnels.",
                "À R={r}, la structure fondamentale est solide – tête et cœur parlent des langages similaires.",
                "La valeur de résonance {r} montre un équilibre fonctionnel.",
                "R={r} : La compatibilité est présente sur les deux niveaux."
            ],
            it: [
                "Coefficiente di risonanza R={r}: Buona concordanza dei parametri razionali ed emotivi.",
                "A R={r} la struttura fondamentale è solida – testa e cuore parlano linguaggi simili.",
                "Il valore di risonanza {r} mostra un equilibrio funzionale.",
                "R={r}: La compatibilità è presente su entrambi i livelli."
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
            ],
            fr: [
                "Coefficient de résonance R={r} : Zone neutre – ni forte attraction ni répulsion.",
                "À R={r}, le résultat est ouvert – la qualité est déterminée par une mise en forme consciente.",
                "La valeur de résonance {r} montre : ici, c'est le travail sur la relation qui décide.",
                "R={r} : La constellation de base est neutre – le potentiel doit être activement développé."
            ],
            it: [
                "Coefficiente di risonanza R={r}: Zona neutra – né forte attrazione né repulsione.",
                "A R={r} il risultato è aperto – la qualità è determinata da una modellazione consapevole.",
                "Il valore di risonanza {r} mostra: qui decide il lavoro sulla relazione.",
                "R={r}: La costellazione di base è neutra – il potenziale deve essere attivamente sviluppato."
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
            ],
            fr: [
                "Coefficient de résonance R={r} : Légère divergence entre l'évaluation rationnelle et émotionnelle.",
                "À R={r}, des différences apparaissent – une communication consciente est requise.",
                "La valeur de résonance {r} indique un champ de tension entre Logos et Pathos.",
                "R={r} : Les différents niveaux exigent un travail de construction de ponts."
            ],
            it: [
                "Coefficiente di risonanza R={r}: Leggera discrepanza tra valutazione razionale ed emotiva.",
                "A R={r} emergono differenze – è richiesta una comunicazione consapevole.",
                "Il valore di risonanza {r} indica un campo di tensione tra Logos e Pathos.",
                "R={r}: I diversi livelli richiedono un lavoro di costruzione di ponti."
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
            ],
            fr: [
                "Coefficient de résonance R={r} : Divergence significative entre les paramètres rationnels et émotionnels.",
                "À R={r}, la structure fondamentale est difficile – une adaptation considérable est requise.",
                "La valeur de résonance {r} montre : tête et cœur évaluent cette connexion différemment.",
                "R={r} : Sans travail actif sur les différences, le pronostic est prudent."
            ],
            it: [
                "Coefficiente di risonanza R={r}: Discrepanza significativa tra parametri razionali ed emotivi.",
                "A R={r} la struttura fondamentale è impegnativa – è richiesto un adattamento considerevole.",
                "Il valore di risonanza {r} mostra: testa e cuore valutano questo legame diversamente.",
                "R={r}: Senza lavoro attivo sulle differenze, la prognosi è cauta."
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
            ],
            fr: [
                "La base de valeurs partagées comprend : {values}. Cela crée des points d'ancrage structurels.",
                "L'accord sur les valeurs {values} forme une base stable.",
                "Les valeurs directrices partagées ({values}) permettent une orientation commune.",
                "Terrain commun structurel grâce aux valeurs partagées : {values}."
            ],
            it: [
                "La base di valori condivisi include: {values}. Questo crea punti di connessione strutturali.",
                "L'accordo sui valori {values} forma una base stabile.",
                "I valori guida condivisi ({values}) consentono un orientamento comune.",
                "Terreno comune strutturale attraverso valori condivisi: {values}."
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
            ],
            fr: [
                "Cette intersection est viable.",
                "Ici se trouve la base pour la compréhension.",
                "On peut s'appuyer sur cela."
            ],
            it: [
                "Questa intersezione è solida.",
                "Qui si trova la base per la comprensione.",
                "Su questo si può costruire."
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
