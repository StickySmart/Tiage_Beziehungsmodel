/**
 * ARCHETYP-DEFINITIONEN
 *
 * Basis-Definitionen der 6 Beziehungs-Archetypen nach Pirsig (Metaphysics of Quality)
 * und Osho (Tantra/Polarität).
 *
 * Quellen:
 * - Pirsig, Robert M. (1991): Lila: An Inquiry into Morals
 * - Osho (1975-1990): Various discourses on love, freedom, and relationships
 * - DePaulo, Bella (2017): Singled Out: How Singles Are Stereotyped
 * - Moors et al. (2021): Polyamory Research Meta-analysis
 */

const archetypeDefinitions = {

  // ════════════════════════════════════════════════════════════════════════════
  // SINGLE - Der Autonome
  // ════════════════════════════════════════════════════════════════════════════
  single: {
    id: "single",
    name: "Single",

    coreValues: [
      "Autonomie",
      "Freiheit",
      "Selbstverwirklichung",
      "Unabhängigkeit",
      "Selbstbestimmung"
    ],

    avoids: [
      "Bindung",
      "Verpflichtung",
      "Einschränkung",
      "Abhängigkeit",
      "Kompromisse"
    ],

    // Pirsig: Static vs Dynamic Quality
    pirsig: {
      staticQuality: 0.2,  // Niedrig - wenig feste Muster
      dynamicQuality: 0.8, // Hoch - maximale Beweglichkeit
      interpretation: "Reine dynamische Qualität ohne statische Bindungsmuster. " +
        "Der Single-Archetyp repräsentiert den Zustand maximaler Beweglichkeit - " +
        "keine festen Beziehungsmuster schränken die dynamische Lebensqualität ein."
    },

    // Osho: Natürlichkeit vs Konditionierung
    osho: {
      naturalness: 0.9,      // Sehr hoch - am nächsten am natürlichen Zustand
      conditioning: 0.1,      // Sehr niedrig - wenig gesellschaftliche Prägung
      interpretation: "Der natürliche Zustand des Menschen - frei wie der Wind. " +
        "Osho betonte, dass Bindung eine gesellschaftliche Konditionierung ist. " +
        "Der Single lebt seine ursprüngliche Natur ohne aufgezwungene Zwänge."
    },

    // Psychologische Forschungsbasis
    research: {
      sources: [
        "DePaulo (2017): Singles are flourishing, leading psychologically rich lives",
        "Stern et al. (2024): Singles report highest levels of autonomy",
        "Self-Determination Theory: Autonomy as hallmark of healthy functioning"
      ],
      traits: {
        autonomy: "sehr-hoch",
        extraversion: "variabel",
        conscientiousness: "niedriger",
        openness: "höher",
        neuroticism: "variabel"
      }
    },

    // Standardwerte für abgeleitete Attribute
    defaultInferences: {
      kinderWunsch: "nein",
      eheWunsch: "nein",
      wohnform: "alleine",
      exklusivitaet: "nicht-relevant",
      zukunftsplanung: "spontan",
      umzugsbereitschaft: "sehr-flexibel"
    }
  },

  // ════════════════════════════════════════════════════════════════════════════
  // DUO - Der Verschmelzende
  // ════════════════════════════════════════════════════════════════════════════
  duo: {
    id: "duo",
    name: "Duo",

    coreValues: [
      "Verschmelzung",
      "Exklusivität",
      "Tiefe",
      "Treue",
      "Sicherheit"
    ],

    avoids: [
      "Öffnung",
      "Polygamie",
      "Unbeständigkeit",
      "Untreue",
      "Unsicherheit"
    ],

    pirsig: {
      staticQuality: 0.8,  // Hoch - starke feste Muster
      dynamicQuality: 0.2, // Niedrig - wenig Beweglichkeit
      interpretation: "Starkes statisches Muster - zwei werden eins. " +
        "Der Duo-Archetyp verkörpert die höchste statische Qualität in " +
        "Beziehungen: klare Grenzen, feste Regeln, vorhersagbare Strukturen."
    },

    osho: {
      naturalness: 0.3,      // Niedrig - gesellschaftlich konditioniert
      conditioning: 0.7,      // Hoch - starke kulturelle Prägung
      interpretation: "Gesellschaftliche Konditionierung par excellence. " +
        "Osho sah Monogamie als kulturelles Konstrukt, nicht als natürlichen Zustand. " +
        "Jedoch: Kann bei bewusster Wahl tiefe Qualität entwickeln."
    },

    research: {
      sources: [
        "Attachment Theory: Secure attachment fosters exclusive bonds",
        "Evolutionary Psychology: Pair-bonding in human evolution",
        "Relationship Research: Commitment correlates with satisfaction"
      ],
      traits: {
        autonomy: "niedrig",
        extraversion: "variabel",
        conscientiousness: "höher",
        openness: "niedriger",
        neuroticism: "niedriger-in-beziehung"
      }
    },

    defaultInferences: {
      kinderWunsch: "ja",
      eheWunsch: "ja",
      wohnform: "zusammen",
      exklusivitaet: "strikt",
      zukunftsplanung: "gemeinsam-langfristig",
      umzugsbereitschaft: "nur-gemeinsam"
    }
  },

  // ════════════════════════════════════════════════════════════════════════════
  // DUO-FLEX - Der Flexible Ankernde
  // ════════════════════════════════════════════════════════════════════════════
  "duo-flex": {
    id: "duo-flex",
    name: "Duo-Flex",

    coreValues: [
      "Anker",
      "Flexibilität",
      "Transparenz",
      "Vertrauen",
      "Wachstum"
    ],

    avoids: [
      "Chaos",
      "Unehrlichkeit",
      "Unsicherheit",
      "Starrheit",
      "Geheimnisse"
    ],

    pirsig: {
      staticQuality: 0.5,  // Mittel - Balance
      dynamicQuality: 0.5, // Mittel - Balance
      interpretation: "Balance zwischen statisch (Anker) und dynamisch (Öffnung). " +
        "Der Duo-Flex-Archetyp sucht den Mittelweg: Sicherheit ohne Einengung, " +
        "Freiheit ohne Chaos. Pirsigs 'Dynamic Good' in strukturierter Form."
    },

    osho: {
      naturalness: 0.6,      // Mittel-hoch
      conditioning: 0.4,      // Mittel-niedrig
      interpretation: "Der Versuch, Freiheit IN Bindung zu finden. " +
        "Ein Kompromiss zwischen natürlichem Begehren und gesellschaftlicher " +
        "Realität. Osho würde sagen: Ein Schritt in die richtige Richtung."
    },

    research: {
      sources: [
        "CNM Research (2021): Open relationships require high communication",
        "Attachment Security: Secure base enables exploration",
        "Relationship Flexibility Studies: Trust correlates with openness"
      ],
      traits: {
        autonomy: "mittel",
        extraversion: "höher",
        conscientiousness: "mittel",
        openness: "hoch",
        neuroticism: "niedriger"
      }
    },

    defaultInferences: {
      kinderWunsch: "vielleicht",
      eheWunsch: "offen",
      wohnform: "zusammen",
      exklusivitaet: "flexibel",
      zukunftsplanung: "gemeinsam-mit-raum",
      umzugsbereitschaft: "verhandelbar"
    }
  },

  // ════════════════════════════════════════════════════════════════════════════
  // RA - Relationship Anarchist
  // ════════════════════════════════════════════════════════════════════════════
  ra: {
    id: "ra",
    name: "Relationship Anarchist",

    coreValues: [
      "Autonomie",
      "Gleichwertigkeit aller Beziehungen",
      "Ablehnung von Labels",
      "Individuelle Vereinbarungen",
      "Radikale Freiheit"
    ],

    avoids: [
      "Hierarchien",
      "Gesellschaftliche Beziehungsnormen",
      "Kategorisierung",
      "Besitzdenken",
      "Vorgegebene Regeln"
    ],

    pirsig: {
      staticQuality: 0.1,  // Sehr niedrig - lehnt feste Muster ab
      dynamicQuality: 0.9, // Sehr hoch - maximale Beweglichkeit
      interpretation: "Radikale dynamische Qualität - RA lehnt alle statischen " +
        "Beziehungsmuster ab. Jede Verbindung ist einzigartig und wird individuell " +
        "definiert. Pirsig würde die totale Freiheit von vorgegebenen Mustern schätzen."
    },

    osho: {
      naturalness: 0.95,     // Sehr hoch - am nächsten am natürlichen Zustand
      conditioning: 0.05,     // Sehr niedrig - lehnt alle Konditionierung ab
      interpretation: "Die radikalste Form der Befreiung von gesellschaftlicher " +
        "Konditionierung. Osho: 'Liebe ist ein Verb, kein Substantiv.' RA lebt " +
        "dies konsequent - keine festen Kategorien, nur gelebte Verbindungen."
    },

    research: {
      sources: [
        "Nordgren (2006): The Short Instructional Manifesto for Relationship Anarchy",
        "Anarchist relationship theory: Rejection of hierarchies",
        "Autonomy-focused relationship research"
      ],
      traits: {
        autonomy: "maximal",
        extraversion: "variabel",
        conscientiousness: "niedriger",
        openness: "sehr-hoch",
        neuroticism: "niedriger"
      }
    },

    defaultInferences: {
      kinderWunsch: "individuell",
      eheWunsch: "nein",
      wohnform: "variabel",
      exklusivitaet: "nicht-definiert",
      zukunftsplanung: "emergent",
      umzugsbereitschaft: "sehr-flexibel"
    }
  },

  // ════════════════════════════════════════════════════════════════════════════
  // LAT - Living Apart Together
  // ════════════════════════════════════════════════════════════════════════════
  lat: {
    id: "lat",
    name: "LAT",

    coreValues: [
      "Verbundenheit mit Distanz",
      "Eigener Raum",
      "Bewusste Nähe",
      "Unabhängigkeit im Alltag",
      "Qualitätszeit"
    ],

    avoids: [
      "Zusammenleben",
      "Verschmelzung",
      "Alltags-Routine zu zweit",
      "Verlust des eigenen Raums",
      "Ständige Präsenz"
    ],

    pirsig: {
      staticQuality: 0.5,  // Mittel - klare Beziehung, aber räumlich getrennt
      dynamicQuality: 0.5, // Mittel - Balance zwischen Struktur und Freiheit
      interpretation: "Balance zwischen statischer Bindung und dynamischer " +
        "Unabhängigkeit. LAT wahrt die Qualität der Beziehung durch bewusste " +
        "Distanz. Pirsig: Qualität entsteht durch die richtige Balance."
    },

    osho: {
      naturalness: 0.7,      // Hoch - respektiert individuelle Bedürfnisse
      conditioning: 0.3,      // Niedrig - widerspricht der Zusammenlebens-Norm
      interpretation: "LAT ehrt die Individualität innerhalb der Beziehung. " +
        "Osho: 'Zwei Menschen sollten wie zwei Säulen sein, die das gleiche Dach " +
        "tragen, aber getrennt stehen.' LAT lebt dieses Prinzip wörtlich."
    },

    research: {
      sources: [
        "Levin (2004): Living Apart Together - A New Family Form",
        "LAT Research: Increasing trend in Western societies",
        "Relationship satisfaction studies: LAT reports high satisfaction"
      ],
      traits: {
        autonomy: "hoch",
        extraversion: "variabel",
        conscientiousness: "mittel",
        openness: "mittel-hoch",
        neuroticism: "niedriger"
      }
    },

    defaultInferences: {
      kinderWunsch: "vielleicht",
      eheWunsch: "offen",
      wohnform: "getrennt",
      exklusivitaet: "variabel",
      zukunftsplanung: "gemeinsam-aber-getrennt",
      umzugsbereitschaft: "flexibel"
    }
  },

  // ════════════════════════════════════════════════════════════════════════════
  // AROMANTISCH - Der Platonische
  // ════════════════════════════════════════════════════════════════════════════
  aromantisch: {
    id: "aromantisch",
    name: "Aromantisch",

    coreValues: [
      "Platonische Verbindungen",
      "Freundschaft als Fundament",
      "Authentizität",
      "Emotionale Tiefe ohne Romantik",
      "Selbstakzeptanz"
    ],

    avoids: [
      "Romantische Erwartungen",
      "Traditionelle Beziehungsskripte",
      "Gesellschaftlicher Druck zu Romantik",
      "Amatonormativität",
      "Romantische Gesten"
    ],

    pirsig: {
      staticQuality: 0.4,  // Mittel-niedrig - eigene Definition von Beziehung
      dynamicQuality: 0.6, // Mittel-hoch - befreit von romantischen Normen
      interpretation: "Befreiung von der statischen Qualität romantischer Normen. " +
        "Aromantische Menschen definieren Beziehungsqualität jenseits der " +
        "gesellschaftlich vorgegebenen romantischen Muster."
    },

    osho: {
      naturalness: 0.75,     // Hoch - lebt eigene Natur
      conditioning: 0.25,     // Niedrig - hat romantische Konditionierung überwunden
      interpretation: "Authentisches Leben jenseits romantischer Konditionierung. " +
        "Nicht jeder Mensch ist für Romantik gemacht, und das ist vollkommen " +
        "natürlich. Aromantische Menschen leben ihre wahre Natur."
    },

    research: {
      sources: [
        "AVEN & Aromantic Spectrum Research",
        "Bogaert (2015): Asexuality and Aromanticism Research",
        "Amatonormativity Studies: Brake (2012)"
      ],
      traits: {
        autonomy: "hoch",
        extraversion: "variabel",
        conscientiousness: "variabel",
        openness: "mittel-hoch",
        neuroticism: "variabel"
      }
    },

    defaultInferences: {
      kinderWunsch: "variabel",
      eheWunsch: "nein-oder-qpr",
      wohnform: "variabel",
      exklusivitaet: "nicht-romantisch-relevant",
      zukunftsplanung: "individuell",
      umzugsbereitschaft: "flexibel"
    }
  },

  // ════════════════════════════════════════════════════════════════════════════
  // SOLOPOLY - Der Autonome Vielfältige
  // ════════════════════════════════════════════════════════════════════════════
  solopoly: {
    id: "solopoly",
    name: "Solopoly",

    coreValues: [
      "Autonomie",
      "Vielfalt",
      "Selbstbestimmung",
      "Ehrlichkeit",
      "Gleichwertigkeit"
    ],

    avoids: [
      "Primärpartner",
      "Hierarchie",
      "Abhängigkeit",
      "Verschmelzung",
      "Besitzdenken"
    ],

    pirsig: {
      staticQuality: 0.3,  // Niedrig - wenig feste Strukturen
      dynamicQuality: 0.7, // Hoch - viel Beweglichkeit
      interpretation: "Dynamische Qualität mit multiplen statischen Mustern. " +
        "Solopoly behält die Autonomie des Singles, erweitert aber die " +
        "dynamische Qualität durch multiple Verbindungen ohne Hierarchie."
    },

    osho: {
      naturalness: 0.8,      // Hoch - nah am natürlichen Zustand
      conditioning: 0.2,      // Niedrig - wenig konditioniert
      interpretation: "Freiheit im Ausdruck - näher an natürlicher Polygamie. " +
        "Osho: 'Liebe kennt keinen Besitz.' Solopoly lebt diese Philosophie " +
        "praktisch: Liebe ohne Einschränkung, ohne Hierarchie, ohne Exklusivität."
    },

    research: {
      sources: [
        "Solo Polyamory Research: Autonomy as core value",
        "Non-Hierarchical Relationship Studies",
        "Attachment Independence Research"
      ],
      traits: {
        autonomy: "sehr-hoch",
        extraversion: "höher",
        conscientiousness: "mittel",
        openness: "sehr-hoch",
        neuroticism: "niedriger"
      }
    },

    defaultInferences: {
      kinderWunsch: "nein",
      eheWunsch: "nein",
      wohnform: "alleine",
      exklusivitaet: "offen",
      zukunftsplanung: "flexibel",
      umzugsbereitschaft: "sehr-flexibel"
    }
  },

  // ════════════════════════════════════════════════════════════════════════════
  // POLYAMOR - Der Liebende Viele
  // ════════════════════════════════════════════════════════════════════════════
  polyamor: {
    id: "polyamor",
    name: "Polyamor",

    coreValues: [
      "Gleichwertigkeit",
      "Offenheit",
      "Fülle",
      "Kommunikation",
      "Compersion"
    ],

    avoids: [
      "Exklusivität",
      "Eifersucht",
      "Besitzdenken",
      "Geheimnisse",
      "Hierarchie"
    ],

    pirsig: {
      staticQuality: 0.4,  // Mittel-niedrig - strukturierte Freiheit
      dynamicQuality: 0.6, // Mittel-hoch - viel Beweglichkeit
      interpretation: "Maximale dynamische Qualität in strukturierter Form. " +
        "Polyamor ist der Versuch, das Beste beider Welten zu vereinen: " +
        "Die Tiefe der Verbindung mit der Freiheit der Vielfalt."
    },

    osho: {
      naturalness: 0.85,     // Sehr hoch - am nächsten an natürlicher Liebe
      conditioning: 0.15,     // Sehr niedrig
      interpretation: "Am nächsten an natürlicher Liebe - frei und offen. " +
        "Osho: 'Liebe ist wie Sonnenschein - sie scheint auf alle.' Polyamor " +
        "versucht, diese bedingungslose Liebe in der Praxis zu leben."
    },

    research: {
      sources: [
        "Polyamory Research (Moors et al.): High communication, low jealousy",
        "Consensual Non-Monogamy Studies: Similar well-being to monogamy",
        "Compersion Research: Joy in partner's happiness"
      ],
      traits: {
        autonomy: "hoch",
        extraversion: "höher",
        conscientiousness: "mittel",
        openness: "sehr-hoch",
        neuroticism: "niedriger"
      }
    },

    defaultInferences: {
      kinderWunsch: "vielleicht",
      eheWunsch: "offen",
      wohnform: "variabel",
      exklusivitaet: "offen",
      zukunftsplanung: "flexibel-gemeinsam",
      umzugsbereitschaft: "verhandelbar"
    }
  }
};

// ════════════════════════════════════════════════════════════════════════════
// EXPORT
// ════════════════════════════════════════════════════════════════════════════
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { archetypeDefinitions };
}
