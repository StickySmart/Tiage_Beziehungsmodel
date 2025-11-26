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
  // POLY-HEDO - Der Innere Polygame
  // ════════════════════════════════════════════════════════════════════════════
  "poly-hedo": {
    id: "poly-hedo",
    name: "Poly-Hedo",

    coreValues: [
      "Innere Freiheit",
      "Loyalität",
      "Fantasie",
      "Authentizität",
      "Selbstakzeptanz"
    ],

    avoids: [
      "Äußere Umsetzung",
      "Schuldgefühle",
      "Gesellschaftliches Urteil",
      "Selbstverleugnung",
      "Konflikte"
    ],

    pirsig: {
      staticQuality: 0.6,  // Mittel-hoch - äußere Konformität
      dynamicQuality: 0.4, // Mittel - innere Freiheit
      interpretation: "Dynamische Qualität gefangen in statischer Form. " +
        "Der Poly-Hedo lebt die Spannung zwischen innerem Begehren und " +
        "äußerer Konformität. Pirsig: 'Static patterns can trap Dynamic Quality.'"
    },

    osho: {
      naturalness: 0.5,      // Mittel - halb unterdrückt
      conditioning: 0.5,      // Mittel - im Konflikt
      interpretation: "Der Tänzer, der nur in Gedanken tanzt - innerer Konflikt. " +
        "Osho: 'Ein unterdrücktes Begehren wird zum Gift.' Poly-Hedo erkennt " +
        "seine Natur, lebt sie aber nicht aus gesellschaftlichen Gründen."
    },

    research: {
      sources: [
        "Sexual Fantasy Research: Fantasy ≠ Behavior",
        "Cognitive Dissonance Theory: Inner conflict creates stress",
        "Self-Concept Studies: Authentic vs. Presented Self"
      ],
      traits: {
        autonomy: "mittel-niedrig",
        extraversion: "variabel",
        conscientiousness: "höher",
        openness: "hoch-intern",
        neuroticism: "höher"
      }
    },

    defaultInferences: {
      kinderWunsch: "vielleicht",
      eheWunsch: "ja",
      wohnform: "zusammen",
      exklusivitaet: "offiziell-monogam",
      zukunftsplanung: "konventionell",
      umzugsbereitschaft: "nur-gemeinsam"
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
