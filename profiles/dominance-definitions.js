/**
 * DOMINANZ-DEFINITIONEN
 *
 * Basis-Definitionen der 4 Dominanz-Präferenzen basierend auf
 * psychologischer Forschung zu BDSM, Persönlichkeit und interpersoneller Dynamik.
 *
 * Quellen:
 * - SMSNA (2023): Personality Type Associated With BDSM Role
 * - Wismeijer & van Assen (2013): BDSM practitioners and psychological characteristics
 * - PAI Dominance Scale Research
 * - Big Five Personality Model (McCrae & Costa)
 */

const dominanceDefinitions = {

  // ════════════════════════════════════════════════════════════════════════════
  // DOMINANT - Der Führende
  // ════════════════════════════════════════════════════════════════════════════
  dominant: {
    id: "dominant",
    name: "Dominant",

    traits: [
      "Assertiv",
      "Führend",
      "Selbstsicher",
      "Konkurrierend",
      "Bestimmend",
      "Direktiv",
      "Proaktiv",
      "Entschlossen"
    ],

    communication: {
      style: "direkt",
      konflikt: "konfrontativ",
      feedback: "unverblümt",
      streit: "laut-energetisch",
      description: "Dominant kommuniziert direkt und unverblümt. " +
        "Konflikte werden aktiv angegangen, nicht vermieden. " +
        "Feedback ist klar und ohne Umschweife."
    },

    energy: {
      level: "hoch",
      spontaneity: "hoch",
      intensity: "leidenschaftlich",
      recovery: "schnell",
      description: "Hohe Energie, spontane Aktionen, leidenschaftliche " +
        "Auseinandersetzungen. Erholt sich schnell von Konflikten."
    },

    // Pirsig-Interpretation
    pirsig: {
      staticDynamic: "dynamic-leaning",
      interpretation: "Dominanz als dynamische Kraft, die statische Muster " +
        "durchbricht und neu formt. Der Dominante ist ein Agent der Veränderung, " +
        "der Qualität durch aktives Gestalten schafft."
    },

    // Osho-Interpretation
    osho: {
      polarity: "yang",
      naturalness: "natürlich-wenn-bewusst",
      interpretation: "Yang-Energie in reiner Form. Osho betonte, dass " +
        "Dominanz natürlich ist, wenn sie aus Bewusstsein kommt, nicht aus Ego. " +
        "Der bewusste Dominante führt, ohne zu unterdrücken."
    },

    // Psychologische Forschung
    research: {
      sources: [
        "SMSNA (2023): Higher PAI-DOM scores in dominant individuals",
        "Big Five Research: Lower agreeableness, higher extraversion",
        "Psychology Today (2022): Sensation-seeking, assertiveness"
      ],
      bigFive: {
        extraversion: "hoch",
        agreeableness: "niedriger",
        conscientiousness: "mittel-hoch",
        neuroticism: "niedriger",
        openness: "mittel-hoch"
      },
      prevalence: {
        male: 0.45,    // 45% der Männer tendieren zu dominant
        female: 0.25,   // 25% der Frauen tendieren zu dominant
        nonbinary: 0.35 // 35% der Non-binären tendieren zu dominant
      }
    },

    // Inferenz-Regeln für Profilattribute
    inferenceModifiers: {
      kommunikationsstil: +2,        // Sehr direkt
      konfliktverhalten: +2,          // Konfrontativ
      emotionaleOffenheit: -1,        // Etwas zurückhaltender
      entschuldigungen: -1,           // Fällt schwerer
      kritikAnnehmen: -1,             // Ego-Herausforderung
      introExtro: +1,                 // Tendenz zu extrovertiert
      events: +1,                     // Sozial aktiver
      wochenende: +1                  // Aktiver
    }
  },

  // ════════════════════════════════════════════════════════════════════════════
  // SUBMISSIV - Der Folgende
  // ════════════════════════════════════════════════════════════════════════════
  submissiv: {
    id: "submissiv",
    name: "Submissiv",

    traits: [
      "Anpassungsfähig",
      "Folgend",
      "Zurückhaltend",
      "Vermeidend",
      "Empathisch",
      "Dienend",
      "Harmonieorientiert",
      "Geduldig"
    ],

    communication: {
      style: "indirekt",
      konflikt: "vermeidend",
      feedback: "diplomatisch",
      streit: "leise-zurückziehend",
      description: "Submissiv kommuniziert indirekt und diplomatisch. " +
        "Konflikte werden eher vermieden oder sanft angesprochen. " +
        "Feedback wird verpackt und behutsam gegeben."
    },

    energy: {
      level: "mittel",
      spontaneity: "niedrig",
      intensity: "ausgeglichen",
      recovery: "langsamer",
      description: "Mittlere bis niedrige Energie, präferiert Planung. " +
        "Ausgeglichene Intensität, braucht Zeit zur Erholung nach Konflikten."
    },

    pirsig: {
      staticDynamic: "static-leaning",
      interpretation: "Submissivität als statisches Muster, das Stabilität " +
        "schafft. Der Submissive erhält die Qualität durch Bewahrung und " +
        "Anpassung an bestehende Strukturen."
    },

    osho: {
      polarity: "yin",
      naturalness: "natürlich-wenn-gewählt",
      interpretation: "Yin-Energie in ihrer empfangenden Form. Osho betonte: " +
        "Empfangen ist genauso wertvoll wie Geben. Submissivität aus freier " +
        "Wahl ist Stärke, nicht Schwäche."
    },

    research: {
      sources: [
        "SMSNA (2023): Lower PAI-DOM scores, higher agreeableness",
        "APA (2021): Conflict avoidance, lower assertiveness",
        "BDSM Research: 38% identify as submissive"
      ],
      bigFive: {
        extraversion: "niedriger",
        agreeableness: "hoch",
        conscientiousness: "mittel-hoch",
        neuroticism: "mittel",
        openness: "mittel"
      },
      prevalence: {
        male: 0.33,    // 33% der Männer tendieren zu submissiv
        female: 0.75,   // 75% der Frauen tendieren zu submissiv (Netherlands study)
        nonbinary: 0.40 // 40% der Non-binären tendieren zu submissiv
      }
    },

    inferenceModifiers: {
      kommunikationsstil: -2,        // Indirekt
      konfliktverhalten: -2,          // Vermeidend
      emotionaleOffenheit: +1,        // Offener (besonders bei Frauen)
      entschuldigungen: +1,           // Fällt leichter
      kritikAnnehmen: +1,             // Besser darin
      introExtro: -1,                 // Tendenz zu introvertiert
      events: -1,                     // Weniger sozial aktiv
      wochenende: -1                  // Ruhiger
    }
  },

  // ════════════════════════════════════════════════════════════════════════════
  // SWITCH - Der Flexible
  // ════════════════════════════════════════════════════════════════════════════
  switch: {
    id: "switch",
    name: "Switch",

    traits: [
      "Flexibel",
      "Wandelbar",
      "Anpassend",
      "Vielseitig",
      "Situativ",
      "Empathisch",
      "Kommunikativ",
      "Experimentierfreudig"
    ],

    communication: {
      style: "situativ",
      konflikt: "lösungsorientiert",
      feedback: "angepasst",
      streit: "variabel",
      description: "Switch kommuniziert situativ angepasst. " +
        "Kann sowohl direkt als auch diplomatisch sein, je nach Bedarf. " +
        "Konflikte werden lösungsorientiert angegangen."
    },

    energy: {
      level: "hoch",
      spontaneity: "hoch",
      intensity: "dynamisch",
      recovery: "schnell",
      description: "Hohe, flexible Energie. Kann sich schnell an " +
        "verschiedene Situationen anpassen. Dynamische Intensität."
    },

    pirsig: {
      staticDynamic: "balanced-dynamic",
      interpretation: "Switch verkörpert die Balance zwischen statisch und " +
        "dynamisch. Kann beide Qualitäten annehmen und wechseln. " +
        "Höchste Adaptivität in Pirsigs Framework."
    },

    osho: {
      polarity: "yin-yang-balance",
      naturalness: "hoch-natürlich",
      interpretation: "Die Vereinigung von Yin und Yang. Osho lehrte, dass " +
        "der erleuchtete Mensch beide Polaritäten in sich trägt. " +
        "Switch ist die gelebte Balance."
    },

    research: {
      sources: [
        "Personality Research (2020): High flexibility, low neuroticism",
        "BDSM Studies: 37% identify as switch",
        "Role-Taking Research: High openness to experience"
      ],
      bigFive: {
        extraversion: "mittel-hoch",
        agreeableness: "mittel",
        conscientiousness: "mittel",
        neuroticism: "niedriger",
        openness: "sehr-hoch"
      },
      prevalence: {
        male: 0.22,    // 22% der Männer tendieren zu switch
        female: 0.25,   // 25% (abgeleitet: 100% - 75% sub)
        nonbinary: 0.25 // 25% der Non-binären tendieren zu switch
      }
    },

    inferenceModifiers: {
      kommunikationsstil: 0,          // Neutral/Flexibel
      konfliktverhalten: +1,          // Lösungsorientiert
      emotionaleOffenheit: +1,        // Offen
      entschuldigungen: 0,            // Situativ
      kritikAnnehmen: +1,             // Gut darin
      introExtro: 0,                  // Flexibel
      events: +1,                     // Sozial aktiv
      wochenende: 0                   // Variabel
    }
  },

  // ════════════════════════════════════════════════════════════════════════════
  // AUSGEGLICHEN - Der Zentrierte
  // ════════════════════════════════════════════════════════════════════════════
  ausgeglichen: {
    id: "ausgeglichen",
    name: "Ausgeglichen",

    traits: [
      "Balanciert",
      "Zentral",
      "Harmonisch",
      "Stabil",
      "Ruhig",
      "Gleichmäßig",
      "Besonnen",
      "Gemäßigt"
    ],

    communication: {
      style: "ausgeglichen",
      konflikt: "diplomatisch",
      feedback: "konstruktiv",
      streit: "ruhig",
      description: "Ausgeglichen kommuniziert ruhig und konstruktiv. " +
        "Konflikte werden diplomatisch gelöst. Feedback ist ausgewogen " +
        "zwischen direkt und diplomatisch."
    },

    energy: {
      level: "mittel",
      spontaneity: "mittel",
      intensity: "stabil",
      recovery: "normal",
      description: "Mittlere, stabile Energie ohne Extreme. " +
        "Weder übermäßig spontan noch übermäßig planend. Gleichmäßig."
    },

    pirsig: {
      staticDynamic: "true-balance",
      interpretation: "Wahre Balance zwischen statisch und dynamisch. " +
        "Weder dominant verändernd noch passiv bewahrend. " +
        "Der Gauss-Mittelwert der Qualität."
    },

    osho: {
      polarity: "transcended",
      naturalness: "natürlich-durch-bewusstsein",
      interpretation: "Jenseits von Yin und Yang - die transzendierte Mitte. " +
        "Osho: 'Der Meditierende ist weder aktiv noch passiv, " +
        "er ist einfach bewusst.' Ausgeglichen ist diese Bewusstheit."
    },

    research: {
      sources: [
        "Big Five Research (2019): Moderate traits, high emotional stability",
        "Personality Psychology: Balanced individuals show adaptability",
        "Gauss Distribution: Middle 68% of population"
      ],
      bigFive: {
        extraversion: "mittel",
        agreeableness: "mittel",
        conscientiousness: "mittel",
        neuroticism: "niedriger",
        openness: "mittel"
      },
      prevalence: {
        male: 0.30,    // Abgeleitet: verbleibende Prozente
        female: 0.30,
        nonbinary: 0.30
      }
    },

    inferenceModifiers: {
      kommunikationsstil: 0,          // Mittig
      konfliktverhalten: 0,           // Diplomatisch
      emotionaleOffenheit: 0,         // Mittig
      entschuldigungen: 0,            // Normal
      kritikAnnehmen: 0,              // Normal
      introExtro: 0,                  // Mittig
      events: 0,                      // Durchschnittlich
      wochenende: 0                   // Durchschnittlich
    }
  }
};

// ════════════════════════════════════════════════════════════════════════════
// GENDER-MODIFIKATOREN
// ════════════════════════════════════════════════════════════════════════════
const genderModifiers = {

  männlich: {
    id: "männlich",
    name: "Männlich",

    research: {
      sources: [
        "Tannen (1990): Men use language for status, women for connection",
        "Gender Communication Research: Direct style preference",
        "Emotional Expression Studies: Men less emotionally expressive"
      ]
    },

    inferenceModifiers: {
      emotionaleOffenheit: -1,        // Weniger offen
      gespraechsBedürfnis: -1,        // Weniger Kommunikation
      oeffentlichkeit: +1,            // Selbstbewusster öffentlich
      streitVerhalten: +1             // Direkter bei Streit
    },

    defaultTraits: {
      communicationStyle: "sachlich-direkt",
      emotionalExpression: "zurückhaltend",
      conflictApproach: "lösungsorientiert"
    }
  },

  weiblich: {
    id: "weiblich",
    name: "Weiblich",

    research: {
      sources: [
        "Tannen (1990): Women use language for connection",
        "Gender Communication Research: Expressive, collaborative style",
        "Emotional Intelligence Studies: Higher emotional awareness"
      ]
    },

    inferenceModifiers: {
      emotionaleOffenheit: +1,        // Offener
      gespraechsBedürfnis: +1,        // Mehr Kommunikation
      oeffentlichkeit: -1,            // Zurückhaltender öffentlich
      streitVerhalten: -1             // Indirekter bei Streit
    },

    defaultTraits: {
      communicationStyle: "empathisch-verbindend",
      emotionalExpression: "offen",
      conflictApproach: "beziehungsorientiert"
    }
  },

  nonbinär: {
    id: "nonbinär",
    name: "Non-binär",

    research: {
      sources: [
        "Non-binary Research: High openness, high neuroticism",
        "Gender Identity Studies: Unique personality profile",
        "APA Fact Sheet: Growing population segment"
      ],
      bigFive: {
        openness: 3.83,       // Höchster Wert
        neuroticism: 3.60,    // Erhöht
        agreeableness: 3.52,  // Mittel-hoch
        conscientiousness: 2.94, // Mittel
        extraversion: 2.80    // Mittel-niedrig
      }
    },

    inferenceModifiers: {
      emotionaleOffenheit: 0,         // Mittig
      gespraechsBedürfnis: 0,         // Mittig
      oeffentlichkeit: 0,             // Mittig
      streitVerhalten: 0              // Mittig
    },

    defaultTraits: {
      communicationStyle: "authentisch-individuell",
      emotionalExpression: "variabel",
      conflictApproach: "individuell"
    }
  }
};

// ════════════════════════════════════════════════════════════════════════════
// ORIENTIERUNGS-MODIFIKATOREN
// ════════════════════════════════════════════════════════════════════════════
const orientationModifiers = {

  heterosexuell: {
    id: "heterosexuell",
    name: "Heterosexuell",

    research: {
      sources: [
        "Sexual Orientation & Personality Meta-analysis (2020)",
        "Allen et al.: Heterosexuals lowest on openness"
      ]
    },

    inferenceModifiers: {
      traditionenWichtigkeit: +1,     // Traditioneller
      openness: -1,                   // Etwas weniger offen
      experimentierfreude: -1         // Weniger experimentierfreudig
    }
  },

  homosexuell: {
    id: "homosexuell",
    name: "Homosexuell",

    research: {
      sources: [
        "Allen et al. (2020): Higher openness than heterosexuals",
        "Sexual Orientation Research: Higher neuroticism in men",
        "LGBTQ+ Personality Studies"
      ]
    },

    inferenceModifiers: {
      traditionenWichtigkeit: -1,     // Weniger traditionell
      openness: +1,                   // Offener
      experimentierfreude: +1         // Experimentierfreudiger
    }
  },

  bisexuell: {
    id: "bisexuell",
    name: "Bisexuell",

    research: {
      sources: [
        "Allen et al. (2020): Highest openness of all orientations",
        "Meta-analysis: Lower conscientiousness",
        "Curvilinear Openness Pattern Research"
      ]
    },

    inferenceModifiers: {
      traditionenWichtigkeit: -2,     // Am wenigsten traditionell
      openness: +2,                   // Am offensten
      experimentierfreude: +2         // Am experimentierfreudigsten
    }
  }
};

// ════════════════════════════════════════════════════════════════════════════
// EXPORT
// ════════════════════════════════════════════════════════════════════════════
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    dominanceDefinitions,
    genderModifiers,
    orientationModifiers
  };
}
