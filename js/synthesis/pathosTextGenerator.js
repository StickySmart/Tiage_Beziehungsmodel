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
            en: ["At the same time", "Likewise", "And so", "In addition", "Beyond that", "Furthermore", "Equally"],
            fr: ["En même temps", "De même", "Et ainsi", "De plus", "Par ailleurs", "En outre", "Également"],
            it: ["Allo stesso tempo", "Similmente", "E così", "Inoltre", "Oltre a ciò", "Altresì", "Ugualmente"]
        },
        contrast: {
            de: ["Gleichzeitig", "Doch auch", "Dennoch", "Andererseits", "Jedoch"],
            en: ["Simultaneously", "Yet also", "Nevertheless", "On the other hand", "However"],
            fr: ["Simultanément", "Mais aussi", "Néanmoins", "D'un autre côté", "Cependant"],
            it: ["Simultaneamente", "Ma anche", "Tuttavia", "D'altra parte", "Però"]
        },
        resulting: {
            de: ["Damit", "Dadurch", "Folglich", "Entsprechend", "Letztlich"],
            en: ["With this", "Through this", "Consequently", "Accordingly", "Ultimately"],
            fr: ["Ainsi", "De ce fait", "Par conséquent", "En conséquence", "Finalement"],
            it: ["Con questo", "Di conseguenza", "Conseguentemente", "Di conseguenza", "In definitiva"]
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
            ],
            fr: [
                "Quand ces énergies se rencontrent,",
                "Dans l'interaction de ces qualités",
                "Là où les deux se rejoignent,",
                "Dans la rencontre de ces mondes"
            ],
            it: [
                "Quando queste energie si incontrano,",
                "Nell'interazione di queste qualità",
                "Dove i due si incontrano,",
                "Nell'incontro di questi mondi"
            ]
        }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // METAPHERN-BIBLIOTHEK
    // ═══════════════════════════════════════════════════════════════════════════

    const metaphors = {
        resonance: {
            de: ["auf derselben Wellenlänge schwingen", "in harmonischer Frequenz vibrieren", "eine gemeinsame Melodie finden", "im selben Rhythmus atmen", "auf ähnlichen Frequenzen senden"],
            en: ["vibrate on the same wavelength", "resonate in harmonic frequency", "find a shared melody", "breathe in the same rhythm", "transmit on similar frequencies"],
            fr: ["vibrer sur la même longueur d'onde", "résonner en harmonie fréquentielle", "trouver une mélodie commune", "respirer au même rythme", "émettre sur des fréquences similaires"],
            it: ["vibrare sulla stessa lunghezza d'onda", "risuonare in frequenza armonica", "trovare una melodia condivisa", "respirare nello stesso ritmo", "trasmettere su frequenze simili"]
        },
        energy: {
            de: ["wie ein warmer Strom fließen", "als lebendige Kraft pulsieren", "wie ein inneres Feuer leuchten", "als sanfte Welle wirken", "wie ein stetiger Wind wehen"],
            en: ["flow like a warm current", "pulse as a living force", "glow like an inner fire", "act as a gentle wave", "blow like a steady wind"],
            fr: ["couler comme un courant chaud", "pulser comme une force vivante", "briller comme un feu intérieur", "agir comme une vague douce", "souffler comme un vent constant"],
            it: ["scorrere come una corrente calda", "pulsare come una forza viva", "brillare come un fuoco interiore", "agire come un'onda dolce", "soffiare come un vento costante"]
        },
        connection: {
            de: ["einen gemeinsamen Tanz beginnen", "Brücken zwischen den Welten bauen", "ein unsichtbares Band weben", "sich wie Puzzle-Teile ergänzen", "einen Dialog der Seelen führen"],
            en: ["begin a shared dance", "build bridges between worlds", "weave an invisible bond", "complement like puzzle pieces", "carry on a dialogue of souls"],
            fr: ["commencer une danse commune", "construire des ponts entre les mondes", "tisser un lien invisible", "se compléter comme des pièces de puzzle", "mener un dialogue des âmes"],
            it: ["iniziare una danza condivisa", "costruire ponti tra mondi", "tessere un legame invisibile", "completarsi come pezzi di puzzle", "condurre un dialogo delle anime"]
        },
        polarity: {
            de: ["wie Pole eines Magneten wirken", "die Spannung zwischen Nähe und Weite halten", "im Spiel von Yin und Yang tanzen", "zwischen Anziehung und Freiraum pendeln", "das elektrische Feld der Gegensätze spüren"],
            en: ["act like poles of a magnet", "hold the tension between closeness and distance", "dance in the play of Yin and Yang", "oscillate between attraction and freedom", "sense the electric field of opposites"],
            fr: ["agir comme les pôles d'un aimant", "tenir la tension entre proximité et distance", "danser dans le jeu du Yin et Yang", "osciller entre attraction et liberté", "ressentir le champ électrique des opposés"],
            it: ["agire come poli di un magnete", "mantenere la tensione tra vicinanza e distanza", "danzare nel gioco di Yin e Yang", "oscillare tra attrazione e libertà", "percepire il campo elettrico degli opposti"]
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
            ],
            fr: [
                "{name} porte en lui une énergie vivante et fluide – ouvert à l'inattendu, prêt à la transformation.",
                "En {name} pulse une haute qualité dynamique : le changement n'est pas une menace, mais une invitation.",
                "{name} se meut comme l'eau – adaptable, spontané, toujours en mouvement.",
                "L'âme de {name} cherche le mouvement : l'immobilité lui est étrangère, le changement sa langue."
            ],
            it: [
                "{name} porta in sé un'energia vivace e fluente – aperta all'inaspettato, pronta alla trasformazione.",
                "In {name} pulsa un'alta qualità dinamica: il cambiamento non è una minaccia, ma un invito.",
                "{name} si muove come l'acqua – adattabile, spontaneo, sempre in flusso.",
                "L'anima di {name} cerca il movimento: la quiete le è estranea, il cambiamento il suo linguaggio."
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
            ],
            fr: [
                "{name} équilibre habilement le familier et le nouveau.",
                "En {name} se rejoignent racines et ailes – la stabilité rencontre le goût discret de l'aventure.",
                "{name} sait quand il est temps de se reposer et quand il est temps de s'envoler.",
                "Le monde émotionnel de {name} connaît à la fois les ports sûrs et les mers ouvertes."
            ],
            it: [
                "{name} bilancia abilmente il familiare e il nuovo.",
                "In {name} si uniscono radici e ali – la stabilità incontra un senso discreto di avventura.",
                "{name} sa quando è il momento di riposarsi e quando spiccare il volo.",
                "Il mondo emotivo di {name} conosce sia i porti sicuri che i mari aperti."
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
            ],
            fr: [
                "{name} trouve la profondeur dans la constance – comme un vieil arbre aux racines solides.",
                "La force de {name} réside dans l'ancrage : les schémas familiers ne sont pas une contrainte, mais un foyer.",
                "{name} crée une profondeur émotionnelle par la continuité et une présence fiable.",
                "En {name} repose une force tranquille – non dans le changement, mais dans la fidélité à l'essentiel."
            ],
            it: [
                "{name} trova profondità nella costanza – come un albero antico con radici forti.",
                "La forza di {name} risiede nell'ancoraggio: i schemi familiari non sono restrizioni, ma casa.",
                "{name} crea profondità emotiva attraverso la continuità e una presenza affidabile.",
                "In {name} riposa una forza silenziosa – non nel cambiamento, ma nella fedeltà all'essenziale."
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
            ],
            fr: [
                "L'authenticité n'est pas un effort pour {name} – les émotions coulent comme elles viennent, sans filtre ni masque.",
                "{name} vit depuis le cœur : ce qui est ressenti peut simplement être, sans censure.",
                "L'honnêteté émotionnelle de {name} agit comme un ruisseau de montagne clair – transparente et rafraîchissante.",
                "{name} suit la boussole intérieure – les masques sociaux n'ont ici aucune place."
            ],
            it: [
                "L'autenticità non richiede sforzo a {name} – le emozioni fluiscono come vengono, non filtrate e genuine.",
                "{name} vive dal cuore: ciò che si sente può semplicemente essere, senza censura.",
                "L'onestà emotiva di {name} funziona come un chiaro ruscello di montagna – trasparente e rinfrescante.",
                "{name} segue la bussola interiore – le maschere sociali non hanno posto qui."
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
            ],
            fr: [
                "{name} combine l'intuition émotionnelle et la réflexion consciente – une danse entre sentiment et pensée.",
                "En {name} se rencontrent spontanéité et prudence.",
                "{name} examine ses propres émotions sans les réprimer."
            ],
            it: [
                "{name} combina intuizione emotiva e riflessione consapevole – una danza tra sentimento e pensiero.",
                "In {name} si incontrano spontaneità e ponderatezza.",
                "{name} esamina i propri sentimenti senza reprimerli."
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
                ],
                fr: [
                    "{name} apporte une énergie directrice – non du contrôle, mais d'une présence naturelle.",
                    "En {name} vit la force de créer : des espaces s'ouvrent, des directions se donnent.",
                    "L'énergie active de {name} crée structure et clarté dans le champ émotionnel."
                ],
                it: [
                    "{name} porta un'energia guida – non dal controllo, ma dalla presenza naturale.",
                    "In {name} vive il potere di creare: gli spazi si aprono, le direzioni si danno.",
                    "L'energia attiva di {name} crea struttura e chiarezza nel campo emotivo."
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
                ],
                fr: [
                    "{name} porte la qualité de l'accueil – une profonde capacité d'abandon qui crée de l'espace pour les autres.",
                    "En {name} réside une force tranquille : l'art de se laisser guider sans se perdre.",
                    "L'énergie réceptive de {name} permet la profondeur et la confiance."
                ],
                it: [
                    "{name} porta la qualità del ricevere – una profonda capacità di abbandono che crea spazio per gli altri.",
                    "In {name} risiede una forza silenziosa: l'arte di lasciarsi guidare senza perdersi.",
                    "L'energia ricettiva di {name} permette profondità e fiducia."
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
                ],
                fr: [
                    "{name} danse entre les pôles – tantôt guide, tantôt suiveur, toujours en équilibre.",
                    "La flexibilité de {name} se révèle dans l'interaction : chaque rôle est vécu authentiquement.",
                    "En {name} s'unissent les deux courants – comme l'inspiration et l'expiration."
                ],
                it: [
                    "{name} danza tra i poli – a volte guidando, a volte seguendo, sempre in equilibrio.",
                    "La flessibilità di {name} si rivela nell'interazione: ogni ruolo è vissuto autenticamente.",
                    "In {name} si uniscono entrambe le correnti – come inspirazione ed espirazione."
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
                ],
                fr: [
                    "{name} repose au centre – ni insistant ni en retrait.",
                    "L'équilibre émotionnel caractérise {name} : pas d'extrêmes, mais un équilibre harmonieux.",
                    "En {name} règne un centre paisible – ouvert aux deux directions."
                ],
                it: [
                    "{name} riposa al centro – né spingendo né ritraendosi.",
                    "L'equilibrio emotivo caratterizza {name}: nessun estremo, ma equilibrio armonioso.",
                    "In {name} c'è un centro pacifico – aperto in entrambe le direzioni."
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
            ],
            fr: [
                "Au cœur de {name}, {values} pulsent comme de profondes étoiles directrices.",
                "{values} – ces valeurs ne sont pas un concept pour {name}, mais une vérité vécue.",
                "Ce qui anime {name} peut se résumer en deux mots : {values}.",
                "L'âme de {name} est nourrie par {values}."
            ],
            it: [
                "Nel cuore di {name}, {values} pulsano come profonde stelle guida.",
                "{values} – questi valori per {name} non sono un concetto, ma una verità vissuta.",
                "Ciò che spinge {name} si può riassumere in due parole: {values}.",
                "L'anima di {name} è nutrita da {values}."
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
                ],
                fr: [
                    "{name} parle couramment la langue du cœur – l'écoute empathique et l'expression claire des besoins sont naturelles.",
                    "Les conflits sont compris par {name} comme des invitations à approfondir la connexion, non comme des menaces.",
                    "La maturité communicative de {name} crée un espace sûr pour les vérités vulnérables."
                ],
                it: [
                    "{name} parla correntemente la lingua del cuore – l'ascolto empatico e l'espressione chiara dei bisogni vengono naturalmente.",
                    "I conflitti sono intesi da {name} come inviti ad approfondire la connessione, non come minacce.",
                    "La maturità comunicativa di {name} crea uno spazio sicuro per le verità vulnerabili."
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
                ],
                fr: [
                    "{name} connaît les principes de la communication non-violente, mais sous pression, d'anciens schémas ressurgissent parfois.",
                    "Le cœur de {name} est ouvert, même si les mots ne trouvent pas toujours leur chemin.",
                    "Dans les moments calmes, {name} communique avec clarté – le stress émotionnel peut obscurcir cela."
                ],
                it: [
                    "{name} conosce i principi della comunicazione nonviolenta, ma sotto pressione a volte prevalgono vecchi schemi.",
                    "Il cuore di {name} è aperto, anche se le parole non trovano sempre la loro strada.",
                    "Nei momenti calmi {name} comunica con chiarezza – lo stress emotivo può offuscare questo."
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
                ],
                fr: [
                    "{name} communique encore à partir de schémas de réaction et de défense.",
                    "Ici réside un potentiel de croissance : {name} peut apprendre à exprimer des besoins plutôt que des jugements.",
                    "Les mots de {name} peuvent couper plus profond que le cœur ne le souhaite."
                ],
                it: [
                    "{name} comunica ancora da schemi di reazione e difesa.",
                    "Qui risiede un potenziale di crescita: {name} può imparare a esprimere bisogni invece di giudizi.",
                    "Le parole di {name} possono ferire più di quanto il cuore intenda."
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
            ],
            fr: [
                "L'âme de {name} se nourrit particulièrement de",
                "Ce dont {name} a vraiment besoin se révèle dans",
                "Au fond, {name} aspire à"
            ],
            it: [
                "L'anima di {name} si nutre particolarmente di",
                "Ciò di cui {name} ha veramente bisogno si rivela in",
                "Nel profondo, {name} anela a"
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
                ],
                fr: [
                    "Une résonance prometteuse se déploie entre ces deux âmes.",
                    "Ici se rencontrent deux personnes dont les fréquences s'amplifient naturellement.",
                    "La chimie de cette connexion a le potentiel d'enrichir les deux.",
                    "Entre {ich} et {partner} émerge un champ qui invite à la croissance.",
                    "Cette rencontre porte en elle la graine d'une profonde connexion."
                ],
                it: [
                    "Una risonanza promettente si dispiega tra queste due anime.",
                    "Qui si incontrano due persone le cui frequenze si amplificano naturalmente.",
                    "La chimica di questa connessione ha il potenziale di arricchire entrambi.",
                    "Tra {ich} e {partner} emerge un campo che invita alla crescita.",
                    "Questo incontro porta in sé il seme di una profonda connessione."
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
                ],
                fr: [
                    "Une tension intéressante se déploie entre ces deux mondes.",
                    "Ici se rencontrent des fréquences différentes – ce qu'elles deviennent dépend de vous.",
                    "La dynamique entre {ich} et {partner} offre à la fois des opportunités et des défis.",
                    "Cette connexion est comme une page blanche – le potentiel attend d'être façonné.",
                    "Deux mélodies différentes se rencontrent – si une harmonie ou une dissonance émerge, le temps le dira."
                ],
                it: [
                    "Una tensione interessante si dispiega tra questi due mondi.",
                    "Qui si incontrano frequenze diverse – cosa ne diventa dipende da voi.",
                    "La dinamica tra {ich} e {partner} offre sia opportunità che sfide.",
                    "Questa connessione è come una pagina bianca – il potenziale aspetta di essere plasmato.",
                    "Due melodie diverse si incontrano – se emerga armonia o dissonanza, lo dirà il tempo."
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
                ],
                fr: [
                    "Ici se rencontrent des mondes qui parlent des langues différentes.",
                    "Les fréquences de cette connexion nécessitent un travail d'harmonisation conscient.",
                    "Entre {ich} et {partner} réside une distance qui veut être comblée.",
                    "Cette rencontre est une invitation au travail – sur soi-même et l'un avec l'autre.",
                    "La vibration naturelle de cette connexion cherche encore son ton commun."
                ],
                it: [
                    "Qui si incontrano mondi che parlano lingue diverse.",
                    "Le frequenze di questa connessione richiedono un lavoro di accordatura consapevole.",
                    "Tra {ich} e {partner} c'è una distanza che vuole essere colmata.",
                    "Questo incontro è un invito al lavoro – su se stessi e l'uno con l'altro.",
                    "La vibrazione naturale di questa connessione cerca ancora il suo tono comune."
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
                ],
                fr: [
                    "Tous deux vibrent sur une fréquence émotionnelle similaire – cela crée une résonance naturelle et une compréhension sans effort.",
                    "Vos qualités dynamiques sont sœurs – vous comprenez sans mots ce dont l'autre a besoin.",
                    "Comme deux instruments dans le même tempo, vous jouez sur la même longueur d'onde émotionnelle.",
                    "La similarité de vos rythmes intérieurs permet une danse sans beaucoup de mots."
                ],
                it: [
                    "Entrambi vibrano su una frequenza emotiva simile – questo crea risonanza naturale e comprensione senza sforzo.",
                    "Le vostre qualità dinamiche sono sorelle – vi capite senza parole di ciò di cui l'altro ha bisogno.",
                    "Come due strumenti nello stesso ritmo, suonate sulla stessa lunghezza d'onda emotiva.",
                    "La somiglianza dei vostri ritmi interiori permette una danza senza molte parole."
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
                ],
                fr: [
                    "Vos tempos émotionnels différents peuvent se compléter merveilleusement – l'un offre ancrage, l'autre des ailes.",
                    "Là où l'un se repose, l'autre apporte du mouvement – cette polarité peut enrichir.",
                    "Les différentes fréquences invitent à une danse intéressante : immobilité et mouvement en alternance.",
                    "Comme le soleil et la lune, vous apportez des qualités différentes – ensemble, une image complète émerge."
                ],
                it: [
                    "I vostri diversi ritmi emotivi possono completarsi meravigliosamente – uno offre radicamento, l'altro ali.",
                    "Dove uno riposa, l'altro porta movimento – questa polarità può arricchire.",
                    "Le diverse frequenze invitano a una danza interessante: immobilità e movimento in alternanza.",
                    "Come il sole e la luna portate qualità diverse – insieme emerge un quadro completo."
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
                ],
                fr: [
                    "Les différents tempos émotionnels nécessitent une coordination consciente et de la patience.",
                    "Ici se rencontrent des vitesses différentes – cela demande de la pleine conscience et de la communication.",
                    "L'un cherche le changement, l'autre la constance – cet arc de tension doit être maintenu.",
                    "Le défi réside dans le fait de ne pas vivre le rythme de l'autre comme une menace."
                ],
                it: [
                    "I diversi ritmi emotivi richiedono coordinamento consapevole e pazienza.",
                    "Qui si incontrano velocità diverse – questo richiede consapevolezza e comunicazione.",
                    "Uno cerca il cambiamento, l'altro la costanza – questo arco di tensione deve essere mantenuto.",
                    "La sfida risiede nel non vivere il ritmo dell'altro come una minaccia."
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
                ],
                fr: [
                    "La dynamique de dominance entre vous est complémentaire – un flux naturel de conduire et de suivre.",
                    "Comme deux pièces de puzzle, vos rôles énergétiques s'assemblent.",
                    "Ici émerge une polarité naturelle qui crée attraction et clarté."
                ],
                it: [
                    "La dinamica di dominanza tra voi è complementare – un flusso naturale di guidare e seguire.",
                    "Come due pezzi di puzzle, i vostri ruoli energetici si incastrano.",
                    "Qui emerge una polarità naturale che crea attrazione e chiarezza."
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
                ],
                fr: [
                    "Tous deux apportent des qualités énergétiques similaires – cela crée de la compréhension, mais moins de tension.",
                    "La similarité de votre énergie de dominance nécessite une négociation consciente des rôles.",
                    "Sans polarité naturelle, la danse devient chorégraphie – belle, mais planifiée."
                ],
                it: [
                    "Entrambi portano qualità energetiche simili – questo crea comprensione, ma meno tensione.",
                    "La somiglianza della vostra energia di dominanza richiede una negoziazione consapevole dei ruoli.",
                    "Senza polarità naturale, la danza diventa coreografia – bella, ma pianificata."
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
                ],
                fr: [
                    "La flexibilité dans la dynamique de dominance ouvre de nombreuses possibilités.",
                    "Ici, la danse peut être renégociée encore et encore – liberté dans la forme.",
                    "Les rôles ne sont pas figés – cela permet la croissance, mais exige de la communication."
                ],
                it: [
                    "La flessibilità nella dinamica di dominanza apre molte possibilità.",
                    "Qui la danza può essere rinegoziata ancora e ancora – libertà nella forma.",
                    "I ruoli non sono fissi – questo permette la crescita, ma richiede comunicazione."
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
                ],
                fr: [
                    "Votre maturité communicative crée un espace sûr pour tout ce qui est – y compris le difficile.",
                    "Les conflits deviennent ici des portes, non des murs.",
                    "La capacité à nommer clairement les besoins rend cette connexion résiliente."
                ],
                it: [
                    "La vostra maturità comunicativa crea uno spazio sicuro per tutto ciò che è – incluso il difficile.",
                    "I conflitti diventano qui porte, non muri.",
                    "La capacità di nominare chiaramente i bisogni rende questa connessione resiliente."
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
                ],
                fr: [
                    "Le partenaire communicativement plus mature peut construire des ponts ici – avec patience et sans condescendance.",
                    "Les différentes compétences CNV peuvent devenir un champ de croissance.",
                    "Ici réside une invitation : apprendre l'un de l'autre comment le cœur et la bouche se trouvent."
                ],
                it: [
                    "Il partner comunicativamente più maturo può costruire ponti qui – con pazienza e senza condiscendenza.",
                    "Le diverse competenze CNV possono diventare un campo di crescita.",
                    "Qui risiede un invito: imparare l'uno dall'altro come cuore e bocca si trovano."
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
                ],
                fr: [
                    "Le niveau communicatif est le plus grand domaine de croissance de cette connexion.",
                    "Tous deux peuvent apprendre à exprimer des besoins plutôt que des accusations – c'est le travail.",
                    "Sans travail de communication conscient, le quotidien peut devenir un champ de bataille."
                ],
                it: [
                    "Il livello comunicativo è la più grande area di crescita di questa connessione.",
                    "Entrambi possono imparare a esprimere bisogni invece di accuse – questo è il lavoro.",
                    "Senza lavoro comunicativo consapevole, il quotidiano può diventare un campo di battaglia."
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
                ],
                fr: [
                    "Le potentiel de conflit repose tranquillement – les différences deviennent conversation plutôt que combat.",
                    "Les tempêtes sont rares dans cette connexion – et quand elles viennent, elles sont brèves."
                ],
                it: [
                    "Il potenziale di conflitto riposa tranquillamente – le differenze diventano conversazione piuttosto che combattimento.",
                    "Le tempeste sono rare in questa connessione – e quando vengono, sono brevi."
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
                ],
                fr: [
                    "Les conflits viendront – mais ils sont des invitations à comprendre plus profondément.",
                    "La friction entre vous peut réchauffer, mais aussi brûler – une gestion consciente est nécessaire."
                ],
                it: [
                    "I conflitti verranno – ma sono inviti a capire più profondamente.",
                    "L'attrito tra voi può scaldare, ma anche bruciare – è necessaria una gestione consapevole."
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
                ],
                fr: [
                    "Ici réside le potentiel pour des confrontations intenses – matière à croissance ou à échec.",
                    "La tension entre vos mondes peut devenir explosive – cela nécessite des outils matures."
                ],
                it: [
                    "Qui c'è il potenziale per confronti intensi – materiale per la crescita o per il fallimento.",
                    "La tensione tra i vostri mondi può diventare esplosiva – questo richiede strumenti maturi."
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
            ],
            fr: [
                "Votre résonance vibre haut ({r}) – la tête et le cœur parlent la même langue. Logos et Pathos s'amplifient mutuellement comme deux voix en canon.",
                "Un son rare : à R={r} vos fréquences rationnelles et émotionnelles s'harmonisent comme un orchestre bien accordé.",
                "La résonance de {r} montre un profond alignement – la confiance peut y croître presque d'elle-même.",
                "Avec une résonance de {r} vous êtes comme deux diapasons qui se font vibrer mutuellement."
            ],
            it: [
                "La vostra risonanza vibra alta ({r}) – testa e cuore parlano la stessa lingua. Logos e Pathos si amplificano a vicenda come due voci in canone.",
                "Un suono raro: a R={r} le vostre frequenze razionali ed emotive si armonizzano come un'orchestra ben accordata.",
                "La risonanza di {r} mostra un profondo allineamento – la fiducia può crescere qui quasi da sola.",
                "Con una risonanza di {r} siete come due diapason che si fanno vibrare a vicenda."
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
            ],
            fr: [
                "Une bonne vibration à R={r} – vos longueurs d'onde sont assez proches pour se trouver, assez différentes pour rester intéressantes.",
                "À R={r} un champ harmonieux émerge entre vous – ici la tête et le cœur peuvent danser ensemble.",
                "La résonance de {r} indique une connexion vivante – pas parfaite, mais authentique.",
                "Avec R={r} vous trouvez un rythme commun, même si les mélodies sont différentes."
            ],
            it: [
                "Una buona vibrazione a R={r} – le vostre lunghezze d'onda sono abbastanza vicine da trovarsi, abbastanza diverse da rimanere interessanti.",
                "A R={r} emerge un campo armonioso tra voi – qui testa e cuore possono danzare insieme.",
                "La risonanza di {r} indica una connessione vivace – non perfetta, ma autentica.",
                "Con R={r} trovate un ritmo comune, anche se le melodie sono diverse."
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
            ],
            fr: [
                "À R={r} la connexion repose sur un terrain neutre – ni une forte attraction ni une répulsion ne définit le champ.",
                "Une résonance de {r} est comme une toile vierge – ce qu'elle devient, vous le peignez vous-mêmes.",
                "Avec R={r} vous n'êtes ni des aimants ni des étoiles distantes – la direction est déterminée par votre action consciente.",
                "La vibration neutre à R={r} laisse tout ouvert – ici le travail décide, pas la chimie."
            ],
            it: [
                "A R={r} la connessione si trova su terreno neutro – né una forte attrazione né una repulsione definisce il campo.",
                "Una risonanza di {r} è come una tela bianca – cosa diventa, lo dipingete voi stessi.",
                "Con R={r} non siete né magneti né stelle distanti – la direzione è determinata dalla vostra azione consapevole.",
                "La vibrazione neutra a R={r} lascia tutto aperto – qui il lavoro decide, non la chimica."
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
            ],
            fr: [
                "À R={r} une légère dissonance apparaît entre pensée et sentiment – cela demande un travail de pont conscient.",
                "Une résonance de {r} indique des tonalités fondamentales différentes – l'harmonie doit être activement recherchée ici.",
                "Avec R={r} la tête et le cœur parlent des dialectes différents – un travail de traduction est nécessaire.",
                "La tension à R={r} peut devenir fructueuse si les deux sont prêts à entendre l'autre ton."
            ],
            it: [
                "A R={r} appare una leggera dissonanza tra pensiero e sentimento – questo richiede un lavoro di costruzione di ponti consapevole.",
                "Una risonanza di {r} indica tonalità fondamentali diverse – l'armonia deve essere attivamente ricercata qui.",
                "Con R={r} testa e cuore parlano dialetti diversi – è necessario un lavoro di traduzione.",
                "La tensione a R={r} può diventare fruttuosa se entrambi sono disposti ad ascoltare l'altro tono."
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
            ],
            fr: [
                "À R={r} les fréquences sont en tension manifeste – Logos et Pathos semblent chanter des chansons différentes.",
                "Une résonance de {r} montre : des mondes différents se rencontrent ici. La connexion est possible, mais elle coûte du travail.",
                "Avec R={r} la vibration naturelle est plus friction que résonance – cela peut user ou étinceler.",
                "La dissonance à R={r} n'est pas un jugement, mais un indicateur : un travail de pont conscient est nécessaire ici."
            ],
            it: [
                "A R={r} le frequenze sono in chiara tensione – Logos e Pathos sembrano cantare canzoni diverse.",
                "Una risonanza di {r} mostra: qui si incontrano mondi diversi. La connessione è possibile, ma costa lavoro.",
                "Con R={r} la vibrazione naturale è più attrito che risonanza – può consumare o scintillare.",
                "La dissonanza a R={r} non è un giudizio, ma un indicatore: qui è necessaria una costruzione di ponti consapevole."
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
            ],
            fr: [
                "Au fond, vous partagez le désir de {needs} – ici vous trouvez votre terrain commun.",
                "Ce qui vous unit est profond : le besoin de {needs} pulse dans les deux cœurs.",
                "{needs} – ces besoins parlent la même langue en vous deux.",
                "Vos âmes se rencontrent dans {needs} – ici vous vous comprenez sans mots.",
                "Le dénominateur commun de vos cœurs : {needs}. Ici vous pouvez ancrer."
            ],
            it: [
                "Nel profondo condividete il desiderio di {needs} – qui trovate il vostro terreno comune.",
                "Ciò che vi unisce è profondo: il bisogno di {needs} pulsa in entrambi i cuori.",
                "{needs} – questi bisogni parlano la stessa lingua in entrambi voi.",
                "Le vostre anime si incontrano in {needs} – qui vi capite senza parole.",
                "Il denominatore comune dei vostri cuori: {needs}. Qui potete ancorare."
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
            ],
            fr: [
                "Ce champ commun peut être à la fois ancre et source.",
                "Sur ce fondement, il est possible de construire.",
                "Cette intersection est votre port sûr.",
                "Ici réside le pont entre vos mondes."
            ],
            it: [
                "Questo campo condiviso può essere sia ancora che fonte.",
                "Su questo fondamento, è possibile costruire.",
                "Questa intersezione è il vostro porto sicuro.",
                "Qui risiede il ponte tra i vostri mondi."
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

        if (archetype?.osho?.naturalness !== undefined) {
            const nat = archetype.osho.naturalness;
            if (nat >= 0.7) {
                parts.push(fillVariables(selectPhrase(getLocalizedPhrases(personPhrases.naturalnessHigh), seed + 3), vars));
            } else if (nat >= 0.4) {
                parts.push(fillVariables(selectPhrase(getLocalizedPhrases(personPhrases.naturalnessMid), seed + 3), vars));
            }
        }

        const domRaw = dimensions?.dominanz;
        const dom = typeof domRaw === 'object' ? (domRaw?.primary || null) : domRaw;
        if (dom && personPhrases.dominance[dom]) {
            parts.push(fillVariables(selectPhrase(getLocalizedPhrases(personPhrases.dominance[dom]), seed + 5), vars));
        }

        if (archetype?.coreValues?.length >= 2) {
            const values = archetype.coreValues.slice(0, 2).join(' und ');
            vars.values = values;
            parts.push(fillVariables(selectPhrase(getLocalizedPhrases(personPhrases.coreValuesIntro), seed + 7), vars));
        }

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

        const tonality = getTonality(overallScore);
        const opening = fillVariables(
            selectPhrase(getLocalizedPhrases(synthesePhrases.openings[tonality]), seed),
            vars
        );
        parts.push(opening);

        if (archStatements?.pathos) {
            const gemeinsam = archStatements.pathos.gemeinsam || [];
            const spannung = archStatements.pathos.spannung || [];
            const all = [...gemeinsam, ...spannung];
            const archStatement = selectPhrase(all, seed + 7);
            if (archStatement) parts.push(archStatement);
        }

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
