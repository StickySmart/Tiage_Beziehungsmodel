/**
 * ARCHETYP-DEFINITIONEN
 *
 * Basis-Definitionen der 8 Beziehungs-Archetypen nach Pirsig (Metaphysics of Quality)
 * und Osho (Tantra/Polarität).
 *
 * Quellen:
 * - Pirsig, Robert M. (1991): Lila: An Inquiry into Morals
 * - Osho (1975-1990): Various discourses on love, freedom, and relationships
 * - DePaulo, Bella (2017): Singled Out: How Singles Are Stereotyped
 * - Moors et al. (2021): Polyamory Research Meta-analysis
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * NAMING CONVENTION - Drei getrennte Konzepte (siehe docs/NAMING_CONVENTION.md)
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * 1. BASE ATTRIBUTES (baseAttributes)
 *    Die 30 Profil-Parameter die beschreiben "Wie jemand Beziehung führt":
 *    - Lebensplanung: kinderWunsch, eheWunsch, wohnform, familieWichtigkeit...
 *    - Kommunikation: gespraechsBeduernis, konfliktverhalten, emotionaleOffenheit...
 *    - Soziales: introExtro, freundeskreis, alleinZeitBeduernis...
 *    - Intimität: koerperlicheNaehe, sexFrequenz, romantikBeduernis...
 *    - Werte: religiositaet, politischeAktivitaet, traditionVsModern...
 *    - Praktisches: ordnung, haushaltsAufteilung, reiseFrequenz
 *    - Emotionale Dynamik: eifersuchtNeigung, vertrauensbasis, emotionaleStabilitaet
 *
 * 2. CORE VALUES (coreValues) & AVOIDS (avoids)
 *    Philosophische Werte basierend auf Pirsig/Osho - NICHT für Matching verwendet,
 *    sondern für die konzeptuelle Beschreibung des Archetyps.
 *
 * 3. DEFAULT INFERENCES (defaultInferences)
 *    Kategorische Ableitungen - Legacy, teilweise redundant mit baseAttributes.
 *    Wird bei Profil-Komposition verwendet.
 *
 * NICHT HIER DEFINIERT (aber wichtig zu unterscheiden):
 * - personDimensions (js/state.js): Meta-Eigenschaften wie geschlecht, dominanz, orientierung
 * - needs/Bedürfnisse (gfk-beduerfnisse.js): 88 GFK-Bedürfnisse nach Marshall Rosenberg
 * ═══════════════════════════════════════════════════════════════════════════════
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
    },

    // Numerische Basis-Attribute für Matching (0.0 - 1.0 Skala)
    baseAttributes: {
      // LEBENSPLANUNG
      kinderWunsch: "nein",
      eheWunsch: "nein",
      wohnform: "getrennt",
      familieWichtigkeit: 0.40,
      haustiere: "ja-eigene",
      karrierePrioritaet: 0.70,
      finanzen: "getrennt",

      // KOMMUNIKATION
      gespraechsBeduernis: 0.40,
      konfliktverhalten: 0.35,
      emotionaleOffenheit: 0.45,
      kommunikationsstil: 0.30,
      feedbackBeduernis: 0.40,

      // SOZIALES
      introExtro: 0.50,
      freundeskreis: "getrennt",
      sozialeBedürfnisse: 0.50,
      alleinZeitBeduernis: 0.70,

      // INTIMITÄT
      koerperlicheNaehe: 0.40,
      sexFrequenz: 0.40,
      romantikBeduernis: 0.35,
      koerperKontakt: 0.40,

      // WERTE
      religiositaet: 0.35,
      politischeAktivitaet: 0.50,
      umweltbewusstsein: 0.55,
      traditionVsModern: 0.65,

      // PRAKTISCHES
      ordnung: 0.50,
      haushaltsAufteilung: "flexibel",
      reiseFrequenz: 0.60,

      // EMOTIONALE DYNAMIK
      eifersuchtNeigung: 0.30,
      vertrauensbasis: 0.60,
      emotionaleStabilitaet: 0.70
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
    },

    // Numerische Basis-Attribute für Matching (0.0 - 1.0 Skala)
    baseAttributes: {
      // LEBENSPLANUNG
      kinderWunsch: "ja",
      eheWunsch: "ja",
      wohnform: "zusammen",
      familieWichtigkeit: 0.70,
      haustiere: "vielleicht",
      karrierePrioritaet: 0.50,
      finanzen: "hybrid",

      // KOMMUNIKATION
      gespraechsBeduernis: 0.65,
      konfliktverhalten: 0.50,
      emotionaleOffenheit: 0.55,
      kommunikationsstil: 0.40,
      feedbackBeduernis: 0.60,

      // SOZIALES
      introExtro: 0.35,
      freundeskreis: "gemischt",
      sozialeBedürfnisse: 0.60,
      alleinZeitBeduernis: 0.40,

      // INTIMITÄT
      koerperlicheNaehe: 0.70,
      sexFrequenz: 0.60,
      romantikBeduernis: 0.65,
      koerperKontakt: 0.70,

      // WERTE
      religiositaet: 0.45,
      politischeAktivitaet: 0.40,
      umweltbewusstsein: 0.55,
      traditionVsModern: 0.35,

      // PRAKTISCHES
      ordnung: 0.55,
      haushaltsAufteilung: "gleichberechtigt",
      reiseFrequenz: 0.50,

      // EMOTIONALE DYNAMIK
      eifersuchtNeigung: 0.50,
      vertrauensbasis: 0.70,
      emotionaleStabilitaet: 0.65
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
    },

    // Numerische Basis-Attribute für Matching (0.0 - 1.0 Skala)
    baseAttributes: {
      // LEBENSPLANUNG
      kinderWunsch: "vielleicht",
      eheWunsch: "vielleicht",
      wohnform: "zusammen",
      familieWichtigkeit: 0.60,
      haustiere: "vielleicht",
      karrierePrioritaet: 0.55,
      finanzen: "hybrid",

      // KOMMUNIKATION
      gespraechsBeduernis: 0.70,
      konfliktverhalten: 0.55,
      emotionaleOffenheit: 0.65,
      kommunikationsstil: 0.45,
      feedbackBeduernis: 0.70,

      // SOZIALES
      introExtro: 0.40,
      freundeskreis: "gemischt",
      sozialeBedürfnisse: 0.65,
      alleinZeitBeduernis: 0.45,

      // INTIMITÄT
      koerperlicheNaehe: 0.65,
      sexFrequenz: 0.65,
      romantikBeduernis: 0.60,
      koerperKontakt: 0.65,

      // WERTE
      religiositaet: 0.35,
      politischeAktivitaet: 0.50,
      umweltbewusstsein: 0.60,
      traditionVsModern: 0.55,

      // PRAKTISCHES
      ordnung: 0.50,
      haushaltsAufteilung: "gleichberechtigt",
      reiseFrequenz: 0.55,

      // EMOTIONALE DYNAMIK
      eifersuchtNeigung: 0.45,
      vertrauensbasis: 0.75,
      emotionaleStabilitaet: 0.65
    }
  },

  // ════════════════════════════════════════════════════════════════════════════
  // RA
  // ════════════════════════════════════════════════════════════════════════════
  ra: {
    id: "ra",
    name: "RA",

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
    },

    // Numerische Basis-Attribute für Matching (0.0 - 1.0 Skala)
    baseAttributes: {
      // LEBENSPLANUNG
      kinderWunsch: "unsicher",
      eheWunsch: "nein",
      wohnform: "flexibel",
      familieWichtigkeit: 0.40,
      haustiere: "egal",
      karrierePrioritaet: 0.60,
      finanzen: "getrennt",

      // KOMMUNIKATION
      gespraechsBeduernis: 0.75,
      konfliktverhalten: 0.55,
      emotionaleOffenheit: 0.80,
      kommunikationsstil: 0.30,
      feedbackBeduernis: 0.80,

      // SOZIALES
      introExtro: 0.40,
      freundeskreis: "getrennt",
      sozialeBedürfnisse: 0.70,
      alleinZeitBeduernis: 0.60,

      // INTIMITÄT
      koerperlicheNaehe: 0.60,
      sexFrequenz: 0.65,
      romantikBeduernis: 0.50,
      koerperKontakt: 0.60,

      // WERTE
      religiositaet: 0.15,
      politischeAktivitaet: 0.75,
      umweltbewusstsein: 0.70,
      traditionVsModern: 0.90,

      // PRAKTISCHES
      ordnung: 0.40,
      haushaltsAufteilung: "flexibel",
      reiseFrequenz: 0.70,

      // EMOTIONALE DYNAMIK
      eifersuchtNeigung: 0.20,
      vertrauensbasis: 0.75,
      emotionaleStabilitaet: 0.75
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
    },

    // Numerische Basis-Attribute für Matching (0.0 - 1.0 Skala)
    baseAttributes: {
      // LEBENSPLANUNG
      kinderWunsch: "vielleicht",
      eheWunsch: "vielleicht",
      wohnform: "lat",
      familieWichtigkeit: 0.55,
      haustiere: "ja-eigene",
      karrierePrioritaet: 0.60,
      finanzen: "getrennt",

      // KOMMUNIKATION
      gespraechsBeduernis: 0.60,
      konfliktverhalten: 0.55,
      emotionaleOffenheit: 0.60,
      kommunikationsstil: 0.40,
      feedbackBeduernis: 0.65,

      // SOZIALES
      introExtro: 0.50,
      freundeskreis: "getrennt",
      sozialeBedürfnisse: 0.55,
      alleinZeitBeduernis: 0.70,

      // INTIMITÄT
      koerperlicheNaehe: 0.60,
      sexFrequenz: 0.55,
      romantikBeduernis: 0.60,
      koerperKontakt: 0.60,

      // WERTE
      religiositaet: 0.35,
      politischeAktivitaet: 0.50,
      umweltbewusstsein: 0.60,
      traditionVsModern: 0.60,

      // PRAKTISCHES
      ordnung: 0.60,
      haushaltsAufteilung: "flexibel",
      reiseFrequenz: 0.55,

      // EMOTIONALE DYNAMIK
      eifersuchtNeigung: 0.40,
      vertrauensbasis: 0.75,
      emotionaleStabilitaet: 0.70
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
    },

    // Numerische Basis-Attribute für Matching (0.0 - 1.0 Skala)
    baseAttributes: {
      // LEBENSPLANUNG
      kinderWunsch: "nein",
      eheWunsch: "nein",
      wohnform: "getrennt",
      familieWichtigkeit: 0.50,
      haustiere: "egal",
      karrierePrioritaet: 0.65,
      finanzen: "getrennt",

      // KOMMUNIKATION
      gespraechsBeduernis: 0.50,
      konfliktverhalten: 0.45,
      emotionaleOffenheit: 0.50,
      kommunikationsstil: 0.35,
      feedbackBeduernis: 0.50,

      // SOZIALES
      introExtro: 0.55,
      freundeskreis: "getrennt",
      sozialeBedürfnisse: 0.55,
      alleinZeitBeduernis: 0.65,

      // INTIMITÄT
      koerperlicheNaehe: 0.30,
      sexFrequenz: 0.30,
      romantikBeduernis: 0.10,
      koerperKontakt: 0.35,

      // WERTE
      religiositaet: 0.40,
      politischeAktivitaet: 0.55,
      umweltbewusstsein: 0.60,
      traditionVsModern: 0.70,

      // PRAKTISCHES
      ordnung: 0.55,
      haushaltsAufteilung: "flexibel",
      reiseFrequenz: 0.50,

      // EMOTIONALE DYNAMIK
      eifersuchtNeigung: 0.20,
      vertrauensbasis: 0.65,
      emotionaleStabilitaet: 0.70
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
    },

    // Numerische Basis-Attribute für Matching (0.0 - 1.0 Skala)
    baseAttributes: {
      // LEBENSPLANUNG
      kinderWunsch: "nein",
      eheWunsch: "nein",
      wohnform: "getrennt",
      familieWichtigkeit: 0.45,
      haustiere: "ja-eigene",
      karrierePrioritaet: 0.65,
      finanzen: "getrennt",

      // KOMMUNIKATION
      gespraechsBeduernis: 0.75,
      konfliktverhalten: 0.60,
      emotionaleOffenheit: 0.70,
      kommunikationsstil: 0.35,
      feedbackBeduernis: 0.75,

      // SOZIALES
      introExtro: 0.35,
      freundeskreis: "gemischt",
      sozialeBedürfnisse: 0.70,
      alleinZeitBeduernis: 0.60,

      // INTIMITÄT
      koerperlicheNaehe: 0.65,
      sexFrequenz: 0.70,
      romantikBeduernis: 0.60,
      koerperKontakt: 0.65,

      // WERTE
      religiositaet: 0.25,
      politischeAktivitaet: 0.60,
      umweltbewusstsein: 0.65,
      traditionVsModern: 0.75,

      // PRAKTISCHES
      ordnung: 0.45,
      haushaltsAufteilung: "flexibel",
      reiseFrequenz: 0.65,

      // EMOTIONALE DYNAMIK
      eifersuchtNeigung: 0.30,
      vertrauensbasis: 0.75,
      emotionaleStabilitaet: 0.70
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
    },

    // Numerische Basis-Attribute für Matching (0.0 - 1.0 Skala)
    baseAttributes: {
      // LEBENSPLANUNG
      kinderWunsch: "vielleicht",
      eheWunsch: "nein",
      wohnform: "flexibel",
      familieWichtigkeit: 0.55,
      haustiere: "ja-gemeinsam",
      karrierePrioritaet: 0.55,
      finanzen: "hybrid",

      // KOMMUNIKATION
      gespraechsBeduernis: 0.80,
      konfliktverhalten: 0.65,
      emotionaleOffenheit: 0.75,
      kommunikationsstil: 0.40,
      feedbackBeduernis: 0.80,

      // SOZIALES
      introExtro: 0.30,
      freundeskreis: "gemischt",
      sozialeBedürfnisse: 0.75,
      alleinZeitBeduernis: 0.50,

      // INTIMITÄT
      koerperlicheNaehe: 0.70,
      sexFrequenz: 0.75,
      romantikBeduernis: 0.70,
      koerperKontakt: 0.70,

      // WERTE
      religiositaet: 0.20,
      politischeAktivitaet: 0.65,
      umweltbewusstsein: 0.65,
      traditionVsModern: 0.80,

      // PRAKTISCHES
      ordnung: 0.45,
      haushaltsAufteilung: "gleichberechtigt",
      reiseFrequenz: 0.60,

      // EMOTIONALE DYNAMIK
      eifersuchtNeigung: 0.25,
      vertrauensbasis: 0.80,
      emotionaleStabilitaet: 0.70
    }
  }
};

// ════════════════════════════════════════════════════════════════════════════
// EXPORT
// ════════════════════════════════════════════════════════════════════════════
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { archetypeDefinitions };
}
