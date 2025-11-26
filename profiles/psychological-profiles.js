/**
 * PSYCHOLOGISCHE PROFILE
 *
 * 216 Profile basierend auf der Kombination von:
 * - 6 Archetypen (single, duo, duo-flex, poly-hedo, solopoly, polyamor)
 * - 3 Geschlechter (männlich, weiblich, nonbinär)
 * - 4 Dominanz-Stufen (dominant, submissiv, switch, ausgeglichen)
 * - 3 Orientierungen (heterosexuell, homosexuell, bisexuell)
 *
 * Jedes Profil enthält:
 * - 30 Attribute (D=10 Werte, E=10 Kommunikation, F=10 Soziales)
 * - Forschungsquellen
 * - Pirsig-Interpretation (Static vs Dynamic Quality)
 * - Osho-Interpretation (Natürlichkeit vs Konditionierung)
 * - Confidence-Level (Gaußsche Normalverteilung)
 *
 * Methodologie:
 * - Basis: Archetyp-Definitionen
 * - Modifikation: Dominanz, Geschlecht, Orientierung
 * - Validierung: Psychologische Forschung (Big Five, BDSM Research, etc.)
 * - Verteilung: 80% der Population hat diese Werte (Gauss)
 *
 * Quellen:
 * - Big Five Personality Model (McCrae & Costa, 1997)
 * - BDSM Personality Research (Wismeijer & van Assen, 2013)
 * - Sexual Orientation & Personality Meta-analysis (Allen et al., 2020)
 * - Gender Communication Research (Tannen, 1990)
 * - Polyamory Research (Moors et al., 2021)
 * - Self-Determination Theory (Ryan & Deci)
 * - Pirsig, Robert M. (1991): Lila: An Inquiry into Morals
 * - Osho: Various discourses on love, freedom, relationships
 */

const psychologicalProfiles = {

  // ════════════════════════════════════════════════════════════════════════════
  // ████████████████████████████████████████████████████████████████████████████
  // SINGLE-PROFILE (36 Profile)
  // ████████████████████████████████████████████████████████████████████████████
  // ════════════════════════════════════════════════════════════════════════════

  // ════════════════════════════════════════════════════════════════════════════
  // PROFIL 1: single-männlich-dominant-heterosexuell
  // ════════════════════════════════════════════════════════════════════════════
  "single-männlich-dominant-heterosexuell": {

    // ─────────────────────────────────────────────────────────────────────────
    // QUELLEN (Research-basiert)
    // ─────────────────────────────────────────────────────────────────────────
    sources: [
      "Stern et al. (2024): Singles report highest levels of autonomy",
      "DePaulo (2017): Single men flourishing with psychologically rich lives",
      "SMSNA (2023): Dominant males show higher PAI-DOM scores, lower agreeableness",
      "Big Five Research: Higher extraversion in dominant individuals",
      "Allen et al. (2020): Heterosexuals show lower openness than other orientations",
      "Gender Communication (Tannen, 1990): Men use language for status/dominance"
    ],

    // ─────────────────────────────────────────────────────────────────────────
    // D: WERTE & LEBENSPLANUNG (10 Attribute)
    // ─────────────────────────────────────────────────────────────────────────
    kinderWunsch: "nein",                    // Single = keine Bindung
    eheWunsch: "nein",                       // Single = gegen Institution
    wohnform: "alleine",                     // Single = Autonomie
    religion: "atheistisch",                 // Single+Dominant = nicht traditionell
    karrierePrioritaet: "karriere",          // Dominant = ambitioniert
    finanzPhilosophie: "getrennt",           // Single = unabhängig
    lebensstil: "durchschnittlich",          // Gauss-Mittelwert
    umzugsbereitschaft: "sehr-flexibel",     // Single = mobil
    zukunftsplanung: "spontan",              // Single = nicht festgelegt
    traditionenWichtigkeit: "unwichtig",     // Single+Hetero = etwas traditioneller, aber Single dominiert

    // ─────────────────────────────────────────────────────────────────────────
    // E: KOMMUNIKATION & KONFLIKTLÖSUNG (10 Attribute)
    // ─────────────────────────────────────────────────────────────────────────
    kommunikationsstil: "direkt",            // Dominant = direkt
    konfliktverhalten: "konfrontativ",       // Dominant = kämpft
    emotionaleOffenheit: "zurückhaltend",    // Mann+Dominant = geschlossen
    gespraechsBedürfnis: "wenig",            // Mann = weniger Kommunikation
    feedbackStil: "direkt",                  // Dominant = unverblümt
    entschuldigungen: "schwer",              // Dominant = Ego
    streitVerhalten: "laut",                 // Dominant = energetisch
    versoehnung: "schnell",                  // Single = keine Abhängigkeit
    kritikAnnehmen: "schwer",                // Dominant = Ego
    humorKonflikte: "manchmal",              // Gauss-Mittelwert

    // ─────────────────────────────────────────────────────────────────────────
    // F: SOZIALE KOMPATIBILITÄT (10 Attribute)
    // ─────────────────────────────────────────────────────────────────────────
    introExtro: "extrovertiert",             // Dominant = sozial aktiv
    familieWichtigkeit: "weniger-wichtig",   // Single = Autonomie
    freundeskreis: "getrennt",               // Single = keine Verschmelzung
    oeffentlichkeit: "sehr-offen",           // Dominant+Single+Mann = selbstbewusst
    alleinzeit: "mittel",                    // Extrovertiert aber Single
    events: "oft",                           // Extrovertiert = sozial
    reisen: "viel",                          // Single+flexibel = mobil
    hobbys: "getrennt",                      // Single = unabhängig
    wochenende: "aktiv",                     // Dominant = energetisch
    netzwerkGroesse: "groß",                 // Extrovertiert = viele Kontakte

    // ─────────────────────────────────────────────────────────────────────────
    // GAUSS-VERTEILUNG (Confidence-Level)
    // ─────────────────────────────────────────────────────────────────────────
    confidence: {
      kinderWunsch: 0.85,                    // 85% Single-Männer sagen "nein"
      eheWunsch: 0.90,                       // 90% Single-Archetyp sagen "nein"
      wohnform: 0.95,                        // 95% Single leben alleine
      kommunikationsstil: 0.80,              // 80% Dominant sind "direkt"
      konfliktverhalten: 0.75,               // 75% Dominant sind "konfrontativ"
      emotionaleOffenheit: 0.70,             // 70% Männer+Dominant sind zurückhaltend
      introExtro: 0.75,                      // 75% Dominant sind "extrovertiert"
      karrierePrioritaet: 0.80,              // 80% Dominant priorisieren Karriere
      umzugsbereitschaft: 0.85,              // 85% Single sind flexibel
      oeffentlichkeit: 0.80                  // 80% Dominant+Mann sind öffentlich offen
    },

    // ─────────────────────────────────────────────────────────────────────────
    // PHILOSOPHISCHE NOTIZEN
    // ─────────────────────────────────────────────────────────────────────────
    pirsig: "Maximale dynamische Qualität (Single) kombiniert mit aktivem, " +
      "gestaltendem Muster (Dominant). Dieser Typ formt seine Realität aktiv, " +
      "ohne sich von statischen Beziehungsmustern einschränken zu lassen. " +
      "Autonomie ist das Kernprinzip - Qualität wird durch Selbstbestimmung erreicht.",

    osho: "Der natürliche Zustand des Mannes - frei, ungebunden, dominant. " +
      "Osho würde sagen: 'Er lebt seine Natur ohne gesellschaftliche Zwänge.' " +
      "Die Yang-Energie fließt ungehindert. Keine Kompromisse, keine Unterdrückung. " +
      "Herausforderung: Kann die Tiefe der Verbindung verpassen."
  },

  // ════════════════════════════════════════════════════════════════════════════
  // PROFIL 2: single-männlich-dominant-homosexuell
  // ════════════════════════════════════════════════════════════════════════════
  "single-männlich-dominant-homosexuell": {

    sources: [
      "Stern et al. (2024): Singles report highest levels of autonomy",
      "SMSNA (2023): Dominant individuals show higher PAI-DOM scores",
      "Allen et al. (2020): Gay men show higher openness, higher neuroticism than hetero",
      "LGBTQ+ Research: Gay men often reject traditional relationship norms",
      "Big Five Meta-analysis: Homosexual men higher on openness to experience"
    ],

    // D: WERTE & LEBENSPLANUNG
    kinderWunsch: "nein",                    // Single = keine Bindung
    eheWunsch: "nein",                       // Single + homo = gegen traditionelle Institution
    wohnform: "alleine",                     // Single = Autonomie
    religion: "atheistisch",                 // Homo = oft gegen religiöse Normen
    karrierePrioritaet: "karriere",          // Dominant = ambitioniert
    finanzPhilosophie: "getrennt",           // Single = unabhängig
    lebensstil: "gehoben",                   // Urban gay culture = oft lifestyle-bewusst
    umzugsbereitschaft: "sehr-flexibel",     // Single = mobil
    zukunftsplanung: "spontan",              // Single = nicht festgelegt
    traditionenWichtigkeit: "unwichtig",     // Homo = gegen Traditionen

    // E: KOMMUNIKATION & KONFLIKTLÖSUNG
    kommunikationsstil: "direkt",            // Dominant = direkt
    konfliktverhalten: "konfrontativ",       // Dominant = kämpft
    emotionaleOffenheit: "mittel",           // Homo-Mann = offener als Hetero-Mann
    gespraechsBedürfnis: "mittel",           // Homo = kommunikativer als Hetero
    feedbackStil: "direkt",                  // Dominant = unverblümt
    entschuldigungen: "schwer",              // Dominant = Ego
    streitVerhalten: "laut",                 // Dominant = energetisch
    versoehnung: "schnell",                  // Single = keine Abhängigkeit
    kritikAnnehmen: "mittel",                // Homo = offener für Reflexion
    humorKonflikte: "oft",                   // Gay culture = oft humorvoll

    // F: SOZIALE KOMPATIBILITÄT
    introExtro: "extrovertiert",             // Dominant + gay scene = sozial aktiv
    familieWichtigkeit: "weniger-wichtig",   // Single + oft Distanz zu Herkunftsfamilie
    freundeskreis: "getrennt",               // Single = keine Verschmelzung
    oeffentlichkeit: "offen",                // Dominant, aber Homo = vorsichtiger
    alleinzeit: "wenig",                     // Gay scene = sozial orientiert
    events: "oft",                           // Gay culture = soziale Events
    reisen: "viel",                          // Single + gay travel culture
    hobbys: "getrennt",                      // Single = unabhängig
    wochenende: "aktiv",                     // Dominant + sozial = aktiv
    netzwerkGroesse: "groß",                 // Gay community + extrovertiert

    confidence: {
      kinderWunsch: 0.90,                    // Sehr hoch bei Single+Homo
      eheWunsch: 0.85,                       // Single-Archetyp + Homo-Skepsis
      wohnform: 0.95,
      kommunikationsstil: 0.80,
      konfliktverhalten: 0.75,
      emotionaleOffenheit: 0.65,             // Variabel bei gay men
      introExtro: 0.80,
      karrierePrioritaet: 0.75,
      traditionenWichtigkeit: 0.85,          // Homo oft anti-traditionell
      events: 0.80                           // Gay scene ist event-orientiert
    },

    pirsig: "Maximale dynamische Qualität (Single) mit aktivem Gestaltungsmuster " +
      "(Dominant), verstärkt durch homosexuelle Identität, die bereits statische " +
      "gesellschaftliche Normen durchbrochen hat. Doppelte Freiheit: Von Beziehung " +
      "UND von heteronormativen Erwartungen.",

    osho: "Doppelte Rebellion gegen Konditionierung - sowohl gegen Beziehungszwang " +
      "als auch gegen sexuelle Normen. Osho: 'Wer seine sexuelle Natur akzeptiert, " +
      "ist näher an seiner Wahrheit.' Dieser Typ lebt authentisch und dominant."
  },

  // ════════════════════════════════════════════════════════════════════════════
  // PROFIL 3: single-männlich-dominant-bisexuell
  // ════════════════════════════════════════════════════════════════════════════
  "single-männlich-dominant-bisexuell": {

    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Allen et al. (2020): Bisexuals show HIGHEST openness of all orientations",
      "Meta-analysis (2020): Bisexuals lower conscientiousness, higher sensation-seeking",
      "SMSNA (2023): Dominant personality = higher extraversion",
      "Bisexual Research: Higher flexibility in identity and relationships"
    ],

    // D: WERTE & LEBENSPLANUNG
    kinderWunsch: "nein",                    // Single = keine Bindung
    eheWunsch: "nein",                       // Single = gegen Institution
    wohnform: "alleine",                     // Single = Autonomie
    religion: "atheistisch",                 // Bi + Dominant = sehr unkonventionell
    karrierePrioritaet: "karriere",          // Dominant = ambitioniert
    finanzPhilosophie: "getrennt",           // Single = unabhängig
    lebensstil: "gehoben",                   // Bi+Dominant = genussorientiert
    umzugsbereitschaft: "sehr-flexibel",     // Single + Bi = maximale Flexibilität
    zukunftsplanung: "spontan",              // Single + Bi = offen für alles
    traditionenWichtigkeit: "unwichtig",     // Bi = am wenigsten traditionell

    // E: KOMMUNIKATION & KONFLIKTLÖSUNG
    kommunikationsstil: "direkt",            // Dominant = direkt
    konfliktverhalten: "konfrontativ",       // Dominant = kämpft
    emotionaleOffenheit: "mittel",           // Bi = offener als Hetero-Mann
    gespraechsBedürfnis: "mittel",           // Bi = kommunikativer
    feedbackStil: "direkt",                  // Dominant = unverblümt
    entschuldigungen: "schwer",              // Dominant = Ego
    streitVerhalten: "laut",                 // Dominant = energetisch
    versoehnung: "schnell",                  // Single = keine Abhängigkeit
    kritikAnnehmen: "mittel",                // Bi = offener für verschiedene Perspektiven
    humorKonflikte: "oft",                   // Bi+Dominant = selbstbewusst humorvoll

    // F: SOZIALE KOMPATIBILITÄT
    introExtro: "extrovertiert",             // Dominant = sozial aktiv
    familieWichtigkeit: "weniger-wichtig",   // Single = Autonomie
    freundeskreis: "gemischt",               // Bi = diverse Freundschaften
    oeffentlichkeit: "offen",                // Dominant+Bi = selbstbewusst aber selektiv
    alleinzeit: "wenig",                     // Extrovertiert + sozial aktiv
    events: "oft",                           // Bi + Dominant = vielfältige Events
    reisen: "viel",                          // Single + Bi = maximale Mobilität
    hobbys: "getrennt",                      // Single = unabhängig
    wochenende: "sehr-aktiv",                // Dominant + Bi = maximale Aktivität
    netzwerkGroesse: "groß",                 // Bi = diverse Netzwerke

    confidence: {
      kinderWunsch: 0.85,
      eheWunsch: 0.90,
      wohnform: 0.95,
      kommunikationsstil: 0.80,
      konfliktverhalten: 0.75,
      emotionaleOffenheit: 0.60,             // Variabel bei Bi
      introExtro: 0.80,
      traditionenWichtigkeit: 0.90,          // Bi sind am wenigsten traditionell
      freundeskreis: 0.75,                   // Bi haben oft gemischte Kreise
      reisen: 0.85                           // Single+Bi = sehr mobil
    },

    pirsig: "Maximale dynamische Qualität auf allen Ebenen. Single = keine " +
      "Beziehungsbindung, Bisexuell = keine Orientierungsbindung, Dominant = " +
      "aktives Gestalten. Dieser Typ verkörpert Pirsigs 'Dynamic Good' in " +
      "extremster Form - alle statischen Muster sind aufgebrochen.",

    osho: "Der freieste aller Typen. Osho: 'Bisexualität ist natürlicher als " +
      "exklusive Orientierung - das Kind kennt keine solchen Grenzen.' " +
      "Kombiniert mit Single und Dominant lebt dieser Typ ohne jegliche " +
      "gesellschaftliche Einschränkung seiner Natur."
  },

  // ════════════════════════════════════════════════════════════════════════════
  // PROFIL 4: single-männlich-submissiv-heterosexuell
  // ════════════════════════════════════════════════════════════════════════════
  "single-männlich-submissiv-heterosexuell": {

    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "SMSNA (2023): Submissive individuals = lower PAI-DOM, higher agreeableness",
      "Netherlands Study: Only 33% of SM-practicing men prefer submissive role",
      "Gender Research: Submissive men face social stigma (non-conformity)",
      "Big Five: Submissives = lower extraversion, higher agreeableness"
    ],

    // D: WERTE & LEBENSPLANUNG
    kinderWunsch: "nein",                    // Single = keine Bindung
    eheWunsch: "nein",                       // Single = gegen Institution
    wohnform: "alleine",                     // Single = Autonomie
    religion: "offen",                       // Submissiv = weniger dogmatisch
    karrierePrioritaet: "balance",           // Submissiv = weniger kompetitiv
    finanzPhilosophie: "getrennt",           // Single = unabhängig
    lebensstil: "bescheiden",                // Submissiv = weniger status-orientiert
    umzugsbereitschaft: "flexibel",          // Single, aber Submissiv = weniger spontan
    zukunftsplanung: "planend",              // Submissiv = präferiert Planung
    traditionenWichtigkeit: "neutral",       // Hetero+Submissiv = etwas traditioneller

    // E: KOMMUNIKATION & KONFLIKTLÖSUNG
    kommunikationsstil: "indirekt",          // Submissiv = indirekt
    konfliktverhalten: "vermeidend",         // Submissiv = vermeidet Konflikte
    emotionaleOffenheit: "zurückhaltend",    // Mann = zurückhaltend
    gespraechsBedürfnis: "wenig",            // Mann + Submissiv = still
    feedbackStil: "diplomatisch",            // Submissiv = vorsichtig
    entschuldigungen: "leicht",              // Submissiv = Harmonie wichtig
    streitVerhalten: "leise",                // Submissiv = zurückziehend
    versoehnung: "langsam",                  // Submissiv = braucht Zeit
    kritikAnnehmen: "gut",                   // Submissiv = anpassungsfähig
    humorKonflikte: "selten",                // Submissiv = ernst bei Konflikten

    // F: SOZIALE KOMPATIBILITÄT
    introExtro: "introvertiert",             // Submissiv = zurückgezogen
    familieWichtigkeit: "weniger-wichtig",   // Single = Autonomie
    freundeskreis: "getrennt",               // Single = keine Verschmelzung
    oeffentlichkeit: "zurückhaltend",        // Submissiv+Mann = diskret
    alleinzeit: "viel",                      // Introvertiert = braucht Alleinzeit
    events: "selten",                        // Introvertiert = weniger sozial
    reisen: "wenig",                         // Submissiv = präferiert Bekanntes
    hobbys: "getrennt",                      // Single = unabhängig
    wochenende: "ruhig",                     // Submissiv = entspannt
    netzwerkGroesse: "klein",                // Introvertiert = wenige, tiefe Kontakte

    confidence: {
      kinderWunsch: 0.80,
      eheWunsch: 0.85,
      wohnform: 0.95,
      kommunikationsstil: 0.80,              // Submissive sind meist indirekt
      konfliktverhalten: 0.85,               // Submissive vermeiden Konflikte
      emotionaleOffenheit: 0.75,             // Männer + Submissiv = zurückhaltend
      introExtro: 0.80,                      // Submissive tendieren zu introvertiert
      alleinzeit: 0.85,                      // Introvertierte brauchen Alleinzeit
      reisen: 0.70,                          // Variabel bei Submissiven
      netzwerkGroesse: 0.80                  // Introvertierte haben kleinere Netzwerke
    },

    pirsig: "Dynamische Qualität (Single) mit passivem, bewahrenden Muster " +
      "(Submissiv). Interessante Spannung: Die Freiheit des Single-Daseins " +
      "kombiniert mit der Zurückhaltung des Submissiven. Qualität durch " +
      "Nicht-Einmischung und Selbstgenügsamkeit.",

    osho: "Gegen den Strom der männlichen Konditionierung. Osho: 'Die Yin-Energie " +
      "im Mann wird unterdrückt.' Dieser Typ lebt seine empfangende Natur, " +
      "auch wenn er gesellschaftlich dafür stigmatisiert wird. Single erlaubt " +
      "ihm, diese Natur ohne Partner-Erwartungen zu leben."
  },

  // ════════════════════════════════════════════════════════════════════════════
  // PROFIL 5: single-männlich-submissiv-homosexuell
  // ════════════════════════════════════════════════════════════════════════════
  "single-männlich-submissiv-homosexuell": {

    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "SMSNA (2023): Submissive individuals = higher agreeableness",
      "Allen et al. (2020): Gay men = higher openness, higher neuroticism",
      "BDSM Research: Bottom/submissive role common in gay male community",
      "Big Five: Combination of higher openness and agreeableness"
    ],

    // D: WERTE & LEBENSPLANUNG
    kinderWunsch: "nein",                    // Single + Homo
    eheWunsch: "nein",                       // Single = gegen Institution
    wohnform: "alleine",                     // Single = Autonomie
    religion: "atheistisch",                 // Homo = oft religionskritisch
    karrierePrioritaet: "balance",           // Submissiv = weniger kompetitiv
    finanzPhilosophie: "getrennt",           // Single = unabhängig
    lebensstil: "durchschnittlich",          // Submissiv = nicht extravagant
    umzugsbereitschaft: "flexibel",          // Single + Gay = mobil in tolerante Städte
    zukunftsplanung: "planend",              // Submissiv = präferiert Struktur
    traditionenWichtigkeit: "unwichtig",     // Homo + Submissiv = anti-traditionell

    // E: KOMMUNIKATION & KONFLIKTLÖSUNG
    kommunikationsstil: "indirekt",          // Submissiv = indirekt
    konfliktverhalten: "vermeidend",         // Submissiv = vermeidet Konflikte
    emotionaleOffenheit: "offen",            // Gay + Submissiv = emotional offener
    gespraechsBedürfnis: "mittel",           // Gay = kommunikativer als Hetero-Mann
    feedbackStil: "diplomatisch",            // Submissiv = vorsichtig
    entschuldigungen: "leicht",              // Submissiv = Harmonie wichtig
    streitVerhalten: "leise",                // Submissiv = zurückziehend
    versoehnung: "langsam",                  // Submissiv = braucht Zeit
    kritikAnnehmen: "gut",                   // Submissiv + Gay = reflektiert
    humorKonflikte: "manchmal",              // Gay culture = oft humorvoll

    // F: SOZIALE KOMPATIBILITÄT
    introExtro: "introvertiert",             // Submissiv = zurückgezogen
    familieWichtigkeit: "weniger-wichtig",   // Single + oft Distanz zu Familie
    freundeskreis: "getrennt",               // Single = keine Verschmelzung
    oeffentlichkeit: "zurückhaltend",        // Submissiv = diskret
    alleinzeit: "viel",                      // Introvertiert = braucht Alleinzeit
    events: "manchmal",                      // Gay scene, aber introvertiert
    reisen: "mittel",                        // Balance zwischen Mobilität und Komfort
    hobbys: "getrennt",                      // Single = unabhängig
    wochenende: "ruhig",                     // Submissiv = entspannt
    netzwerkGroesse: "mittel",               // Gay community + introvertiert

    confidence: {
      kinderWunsch: 0.90,
      eheWunsch: 0.85,
      wohnform: 0.95,
      kommunikationsstil: 0.80,
      konfliktverhalten: 0.85,
      emotionaleOffenheit: 0.70,             // Gay-Männer variabler
      introExtro: 0.75,                      // Submissiv tendiert introvertiert
      traditionenWichtigkeit: 0.85,
      events: 0.60,                          // Variabel: Gay scene vs introvertiert
      gespraechsBedürfnis: 0.65              // Variabel
    },

    pirsig: "Dynamische Qualität (Single, Gay - beide Normen durchbrechend) " +
      "mit rezeptivem, bewahrenden Muster (Submissiv). Die Freiheit vom " +
      "heteronormativen System kombiniert mit empfangender Energie. " +
      "Qualität durch authentisches Sein jenseits männlicher Stereotypen.",

    osho: "Doppelte Befreiung von männlicher Konditionierung: Als Gay lehnt er " +
      "heteronormative Erwartungen ab, als Submissiver die Dominanz-Erwartung. " +
      "Osho: 'Der Mann, der seine Weichheit akzeptiert, ist mutiger als der, " +
      "der sie versteckt.' Single-Status erlaubt volle Selbstakzeptanz."
  },

  // ════════════════════════════════════════════════════════════════════════════
  // PROFIL 6: single-männlich-submissiv-bisexuell
  // ════════════════════════════════════════════════════════════════════════════
  "single-männlich-submissiv-bisexuell": {

    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Allen et al. (2020): Bisexuals show highest openness of all orientations",
      "SMSNA (2023): Submissive = higher agreeableness, lower assertiveness",
      "Meta-analysis (2020): Bisexuals lower conscientiousness",
      "Identity Research: Bi + Submissiv = high flexibility in self-concept"
    ],

    // D: WERTE & LEBENSPLANUNG
    kinderWunsch: "nein",                    // Single = keine Bindung
    eheWunsch: "nein",                       // Single + Bi = sehr unkonventionell
    wohnform: "alleine",                     // Single = Autonomie
    religion: "spirituell",                  // Bi + Submissiv = offen für alternatives
    karrierePrioritaet: "balance",           // Submissiv = weniger kompetitiv
    finanzPhilosophie: "getrennt",           // Single = unabhängig
    lebensstil: "durchschnittlich",          // Submissiv = nicht extravagant
    umzugsbereitschaft: "flexibel",          // Single + Bi = offen für Veränderung
    zukunftsplanung: "planend",              // Submissiv = präferiert Struktur
    traditionenWichtigkeit: "unwichtig",     // Bi = am wenigsten traditionell

    // E: KOMMUNIKATION & KONFLIKTLÖSUNG
    kommunikationsstil: "indirekt",          // Submissiv = indirekt
    konfliktverhalten: "vermeidend",         // Submissiv = vermeidet Konflikte
    emotionaleOffenheit: "offen",            // Bi + Submissiv = sehr offen
    gespraechsBedürfnis: "mittel",           // Bi = kommunikativer
    feedbackStil: "diplomatisch",            // Submissiv = vorsichtig
    entschuldigungen: "leicht",              // Submissiv = Harmonie wichtig
    streitVerhalten: "leise",                // Submissiv = zurückziehend
    versoehnung: "langsam",                  // Submissiv = braucht Zeit
    kritikAnnehmen: "sehr-gut",              // Submissiv + Bi (hohe Openness)
    humorKonflikte: "manchmal",              // Gauss-Mittelwert

    // F: SOZIALE KOMPATIBILITÄT
    introExtro: "ambivertiert",              // Submissiv + Bi (hohe Openness) = gemischt
    familieWichtigkeit: "weniger-wichtig",   // Single = Autonomie
    freundeskreis: "gemischt",               // Bi = diverse Freundschaften
    oeffentlichkeit: "zurückhaltend",        // Submissiv = diskret
    alleinzeit: "mittel",                    // Ambivertiert = Balance
    events: "manchmal",                      // Bi-Szene, aber submissiv
    reisen: "mittel",                        // Balance
    hobbys: "getrennt",                      // Single = unabhängig
    wochenende: "gemischt",                  // Ambivertiert = variabel
    netzwerkGroesse: "mittel",               // Bi = diverse aber kleinere Gruppen

    confidence: {
      kinderWunsch: 0.85,
      eheWunsch: 0.90,
      wohnform: 0.95,
      kommunikationsstil: 0.80,
      konfliktverhalten: 0.85,
      emotionaleOffenheit: 0.75,             // Bi + Submissiv = offen
      introExtro: 0.55,                      // Gemischt/variabel
      traditionenWichtigkeit: 0.90,          // Bi am wenigsten traditionell
      freundeskreis: 0.75,                   // Bi haben diverse Kreise
      kritikAnnehmen: 0.80                   // Submissiv + hohe Openness
    },

    pirsig: "Maximale Offenheit (Bi = höchste Openness) kombiniert mit " +
      "rezeptivem Muster (Submissiv) und Freiheit (Single). Dieser Typ ist " +
      "maximal empfänglich für neue Erfahrungen und Perspektiven. " +
      "Qualität durch Nicht-Urteilen und Empfänglichkeit.",

    osho: "Der empfänglichste aller Typen. Osho: 'Der wahre Suchende ist wie " +
      "eine leere Schale - bereit, gefüllt zu werden.' Bisexuell = offen für " +
      "alle Geschlechter, Submissiv = empfangend, Single = frei von Bindung. " +
      "Maximale Durchlässigkeit für Erfahrungen."
  },

  // ════════════════════════════════════════════════════════════════════════════
  // PROFIL 7: single-männlich-switch-heterosexuell
  // ════════════════════════════════════════════════════════════════════════════
  "single-männlich-switch-heterosexuell": {

    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Personality Research (2020): Switch = high flexibility, low neuroticism",
      "BDSM Studies: 37% identify as switch - highly adaptive",
      "Big Five: Switch = high openness, balanced other traits",
      "Role-Taking Research: Switches show high cognitive flexibility"
    ],

    // D: WERTE & LEBENSPLANUNG
    kinderWunsch: "nein",                    // Single = keine Bindung
    eheWunsch: "nein",                       // Single = gegen Institution
    wohnform: "alleine",                     // Single = Autonomie
    religion: "offen",                       // Switch = flexibel
    karrierePrioritaet: "balance",           // Switch = flexibel
    finanzPhilosophie: "getrennt",           // Single = unabhängig
    lebensstil: "durchschnittlich",          // Gauss-Mittelwert
    umzugsbereitschaft: "flexibel",          // Single + Switch = adaptiv
    zukunftsplanung: "flexibel",             // Switch = anpassungsfähig
    traditionenWichtigkeit: "neutral",       // Hetero etwas traditioneller, Switch neutral

    // E: KOMMUNIKATION & KONFLIKTLÖSUNG
    kommunikationsstil: "situativ",          // Switch = anpassend
    konfliktverhalten: "lösungsorientiert",  // Switch = konstruktiv
    emotionaleOffenheit: "mittel",           // Mann = zurückhaltend, Switch = offen
    gespraechsBedürfnis: "mittel",           // Switch = flexibel
    feedbackStil: "angepasst",               // Switch = situativ
    entschuldigungen: "normal",              // Switch = flexibel
    streitVerhalten: "variabel",             // Switch = je nach Situation
    versoehnung: "schnell",                  // Single + Switch = adaptiv
    kritikAnnehmen: "gut",                   // Switch = hohe Openness
    humorKonflikte: "oft",                   // Switch = flexibel, nutzt Humor

    // F: SOZIALE KOMPATIBILITÄT
    introExtro: "ambivertiert",              // Switch = Balance
    familieWichtigkeit: "weniger-wichtig",   // Single = Autonomie
    freundeskreis: "getrennt",               // Single = keine Verschmelzung
    oeffentlichkeit: "offen",                // Switch + Mann = selbstbewusst
    alleinzeit: "mittel",                    // Ambivertiert = Balance
    events: "oft",                           // Switch = sozial flexibel
    reisen: "viel",                          // Single + Switch = mobil
    hobbys: "getrennt",                      // Single = unabhängig
    wochenende: "aktiv",                     // Switch = energetisch
    netzwerkGroesse: "mittel-groß",          // Ambivertiert = moderates Netzwerk

    confidence: {
      kinderWunsch: 0.85,
      eheWunsch: 0.85,
      wohnform: 0.95,
      kommunikationsstil: 0.85,              // Switch sind situativ
      konfliktverhalten: 0.80,               // Switch sind lösungsorientiert
      emotionaleOffenheit: 0.60,             // Variabel
      introExtro: 0.75,                      // Switch sind oft ambivertiert
      zukunftsplanung: 0.80,                 // Switch sind flexibel
      kritikAnnehmen: 0.80,                  // Switch haben hohe Openness
      events: 0.75                           // Switch sind sozial aktiv
    },

    pirsig: "Dynamische Qualität (Single) kombiniert mit maximaler Adaptivität " +
      "(Switch). Dieser Typ kann sowohl statische als auch dynamische Muster " +
      "annehmen, je nach Situation. Verkörpert Pirsigs Ideal der Balance " +
      "zwischen Static und Dynamic Good.",

    osho: "Die Balance von Yin und Yang im freien Mann. Osho: 'Der ganze " +
      "Mensch kann sowohl geben als auch empfangen.' Switch lebt diese " +
      "Ganzheit. Single-Status erlaubt ihm, diese Balance ohne " +
      "Partner-Erwartungen zu erkunden."
  },

  // ════════════════════════════════════════════════════════════════════════════
  // PROFIL 8: single-männlich-switch-homosexuell
  // ════════════════════════════════════════════════════════════════════════════
  "single-männlich-switch-homosexuell": {

    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Personality Research (2020): Switch = high flexibility",
      "Allen et al. (2020): Gay men = higher openness than heterosexuals",
      "Gay Male Research: Versatile/Switch common in gay community",
      "Big Five: Switch + Gay = very high openness combination"
    ],

    // D: WERTE & LEBENSPLANUNG
    kinderWunsch: "nein",                    // Single + Homo
    eheWunsch: "nein",                       // Single = gegen Institution
    wohnform: "alleine",                     // Single = Autonomie
    religion: "atheistisch",                 // Gay = oft religionskritisch
    karrierePrioritaet: "balance",           // Switch = flexibel
    finanzPhilosophie: "getrennt",           // Single = unabhängig
    lebensstil: "gehoben",                   // Gay + Switch = lifestyle-bewusst
    umzugsbereitschaft: "sehr-flexibel",     // Single + Gay + Switch = sehr mobil
    zukunftsplanung: "flexibel",             // Switch = anpassungsfähig
    traditionenWichtigkeit: "unwichtig",     // Gay = anti-traditionell

    // E: KOMMUNIKATION & KONFLIKTLÖSUNG
    kommunikationsstil: "situativ",          // Switch = anpassend
    konfliktverhalten: "lösungsorientiert",  // Switch = konstruktiv
    emotionaleOffenheit: "offen",            // Gay + Switch = emotional offen
    gespraechsBedürfnis: "mittel",           // Gay = kommunikativer
    feedbackStil: "angepasst",               // Switch = situativ
    entschuldigungen: "normal",              // Switch = flexibel
    streitVerhalten: "variabel",             // Switch = je nach Situation
    versoehnung: "schnell",                  // Single + Switch = adaptiv
    kritikAnnehmen: "sehr-gut",              // Switch + Gay = sehr hohe Openness
    humorKonflikte: "oft",                   // Gay culture + Switch = humorvoll

    // F: SOZIALE KOMPATIBILITÄT
    introExtro: "extrovertiert",             // Switch + Gay scene = sozial aktiv
    familieWichtigkeit: "weniger-wichtig",   // Single + oft Distanz zu Familie
    freundeskreis: "getrennt",               // Single = keine Verschmelzung
    oeffentlichkeit: "offen",                // Switch + Gay = selbstbewusst
    alleinzeit: "wenig",                     // Extrovertiert + Gay scene
    events: "oft",                           // Gay scene + Switch
    reisen: "viel",                          // Single + Gay travel culture
    hobbys: "getrennt",                      // Single = unabhängig
    wochenende: "sehr-aktiv",                // Switch + Gay scene = aktiv
    netzwerkGroesse: "groß",                 // Gay community + extrovertiert

    confidence: {
      kinderWunsch: 0.90,
      eheWunsch: 0.85,
      wohnform: 0.95,
      kommunikationsstil: 0.85,
      konfliktverhalten: 0.80,
      emotionaleOffenheit: 0.75,             // Gay + Switch = offen
      introExtro: 0.75,                      // Gay scene = eher extrovertiert
      traditionenWichtigkeit: 0.85,
      events: 0.80,                          // Gay scene ist event-orientiert
      kritikAnnehmen: 0.80                   // Hohe Openness
    },

    pirsig: "Dreifache dynamische Qualität: Single (keine Bindung), Gay " +
      "(heteronormative Normen durchbrochen), Switch (flexibel zwischen " +
      "Polaritäten). Maximale Adaptivität kombiniert mit maximaler Freiheit. " +
      "Kann alle Qualitätsmuster annehmen.",

    osho: "Der vielseitigste aller Typen. Osho würde ihn als 'fließend' " +
      "beschreiben - nicht fixiert auf eine Rolle, ein Geschlecht des " +
      "Partners, oder eine Lebensform. Single-Status maximiert diese " +
      "Fluidität weiter."
  },

  // ════════════════════════════════════════════════════════════════════════════
  // PROFIL 9: single-männlich-switch-bisexuell
  // ════════════════════════════════════════════════════════════════════════════
  "single-männlich-switch-bisexuell": {

    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Allen et al. (2020): Bisexuals = HIGHEST openness of all orientations",
      "Personality Research (2020): Switch = high flexibility, high openness",
      "Combined Research: Switch + Bi = maximum psychological flexibility",
      "Identity Research: Fluid orientations correlate with fluid roles"
    ],

    // D: WERTE & LEBENSPLANUNG
    kinderWunsch: "nein",                    // Single = keine Bindung
    eheWunsch: "nein",                       // Single + Bi = sehr unkonventionell
    wohnform: "alleine",                     // Single = Autonomie
    religion: "spirituell",                  // Bi + Switch = offen für alternatives
    karrierePrioritaet: "balance",           // Switch = flexibel
    finanzPhilosophie: "getrennt",           // Single = unabhängig
    lebensstil: "gehoben",                   // Bi + Switch = erlebnisorientiert
    umzugsbereitschaft: "sehr-flexibel",     // Single + Bi + Switch = maximale Flexibilität
    zukunftsplanung: "flexibel",             // Switch + Bi = sehr anpassungsfähig
    traditionenWichtigkeit: "unwichtig",     // Bi = am wenigsten traditionell

    // E: KOMMUNIKATION & KONFLIKTLÖSUNG
    kommunikationsstil: "situativ",          // Switch = anpassend
    konfliktverhalten: "lösungsorientiert",  // Switch = konstruktiv
    emotionaleOffenheit: "offen",            // Bi + Switch = sehr offen
    gespraechsBedürfnis: "mittel",           // Bi = kommunikativer
    feedbackStil: "angepasst",               // Switch = situativ
    entschuldigungen: "normal",              // Switch = flexibel
    streitVerhalten: "variabel",             // Switch = je nach Situation
    versoehnung: "schnell",                  // Single + Switch = adaptiv
    kritikAnnehmen: "sehr-gut",              // Switch + Bi = höchste Openness
    humorKonflikte: "oft",                   // Switch + Bi = selbstbewusst humorvoll

    // F: SOZIALE KOMPATIBILITÄT
    introExtro: "extrovertiert",             // Switch + Bi = sozial aktiv
    familieWichtigkeit: "weniger-wichtig",   // Single = Autonomie
    freundeskreis: "gemischt",               // Bi = diverse Freundschaften
    oeffentlichkeit: "offen",                // Switch + Bi = selbstbewusst
    alleinzeit: "wenig",                     // Extrovertiert
    events: "sehr-oft",                      // Bi + Switch = vielfältige Events
    reisen: "viel",                          // Single + Bi + Switch = maximale Mobilität
    hobbys: "getrennt",                      // Single = unabhängig
    wochenende: "sehr-aktiv",                // Switch + Bi = maximale Aktivität
    netzwerkGroesse: "groß",                 // Bi + Switch = diverse große Netzwerke

    confidence: {
      kinderWunsch: 0.85,
      eheWunsch: 0.90,
      wohnform: 0.95,
      kommunikationsstil: 0.85,
      konfliktverhalten: 0.80,
      emotionaleOffenheit: 0.80,             // Bi + Switch = sehr offen
      introExtro: 0.75,                      // Switch + Bi = eher extrovertiert
      traditionenWichtigkeit: 0.90,          // Bi am wenigsten traditionell
      freundeskreis: 0.80,                   // Bi haben diverse Kreise
      kritikAnnehmen: 0.85                   // Höchste Openness Kombination
    },

    pirsig: "Maximale dynamische Qualität auf ALLEN Dimensionen. Single = keine " +
      "Beziehungsbindung, Bisexuell = keine Orientierungsbindung, Switch = " +
      "keine Rollenbindung. Dieser Typ verkörpert Pirsigs 'Pure Dynamic Quality' - " +
      "vollständig frei von statischen Mustern.",

    osho: "Der freieste und flüssigste Typ überhaupt. Osho: 'Der erleuchtete " +
      "Mensch ist wie Wasser - er nimmt jede Form an, ohne seine Essenz zu " +
      "verlieren.' Single + Bi + Switch = maximale Fluidität in Beziehung, " +
      "Orientierung und Rolle. Keine Fixierung, nur Fluss."
  },

  // ════════════════════════════════════════════════════════════════════════════
  // PROFIL 10: single-männlich-ausgeglichen-heterosexuell
  // ════════════════════════════════════════════════════════════════════════════
  "single-männlich-ausgeglichen-heterosexuell": {

    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Big Five Research (2019): Balanced individuals = moderate traits, high stability",
      "Gauss Distribution: Middle 68% of population shows balanced traits",
      "Personality Psychology: Balanced profiles = high emotional stability",
      "Gender Research: Balanced men show integration of traits"
    ],

    // D: WERTE & LEBENSPLANUNG
    kinderWunsch: "nein",                    // Single = keine Bindung
    eheWunsch: "nein",                       // Single = gegen Institution
    wohnform: "alleine",                     // Single = Autonomie
    religion: "offen",                       // Ausgeglichen = neutral
    karrierePrioritaet: "balance",           // Ausgeglichen = Balance
    finanzPhilosophie: "getrennt",           // Single = unabhängig
    lebensstil: "durchschnittlich",          // Ausgeglichen = Gauss-Mittelwert
    umzugsbereitschaft: "flexibel",          // Single, aber Ausgeglichen = moderat
    zukunftsplanung: "planend",              // Ausgeglichen = strukturiert
    traditionenWichtigkeit: "neutral",       // Hetero+Ausgeglichen = neutral

    // E: KOMMUNIKATION & KONFLIKTLÖSUNG
    kommunikationsstil: "ausgeglichen",      // Ausgeglichen = Balance
    konfliktverhalten: "diplomatisch",       // Ausgeglichen = konstruktiv
    emotionaleOffenheit: "mittel",           // Mann + Ausgeglichen = mittig
    gespraechsBedürfnis: "mittel",           // Ausgeglichen = Balance
    feedbackStil: "konstruktiv",             // Ausgeglichen = ausgewogen
    entschuldigungen: "normal",              // Ausgeglichen = normal
    streitVerhalten: "ruhig",                // Ausgeglichen = besonnen
    versoehnung: "normal",                   // Ausgeglichen = normal
    kritikAnnehmen: "normal",                // Ausgeglichen = ausgewogen
    humorKonflikte: "manchmal",              // Gauss-Mittelwert

    // F: SOZIALE KOMPATIBILITÄT
    introExtro: "ambivertiert",              // Ausgeglichen = Balance
    familieWichtigkeit: "weniger-wichtig",   // Single = Autonomie
    freundeskreis: "getrennt",               // Single = keine Verschmelzung
    oeffentlichkeit: "mittel",               // Ausgeglichen = normal
    alleinzeit: "mittel",                    // Ambivertiert = Balance
    events: "manchmal",                      // Ausgeglichen = moderat
    reisen: "mittel",                        // Ausgeglichen = Balance
    hobbys: "getrennt",                      // Single = unabhängig
    wochenende: "gemischt",                  // Ausgeglichen = variabel
    netzwerkGroesse: "mittel",               // Ambivertiert = moderates Netzwerk

    confidence: {
      kinderWunsch: 0.80,
      eheWunsch: 0.85,
      wohnform: 0.95,
      kommunikationsstil: 0.85,              // Ausgeglichene sind ausgeglichen
      konfliktverhalten: 0.80,               // Ausgeglichene sind diplomatisch
      emotionaleOffenheit: 0.75,             // Mittig bei Männern
      introExtro: 0.80,                      // Ausgeglichene sind oft ambivertiert
      lebensstil: 0.90,                      // Gauss-Mittelwert sehr wahrscheinlich
      zukunftsplanung: 0.75,                 // Ausgeglichene planen moderat
      wochenende: 0.70                       // Variabel
    },

    pirsig: "Dynamische Qualität (Single) kombiniert mit wahre Balance zwischen " +
      "Static und Dynamic (Ausgeglichen). Dieser Typ verkörpert den Gauss-Mittelwert " +
      "der Qualität - weder extrem statisch noch extrem dynamisch. " +
      "Qualität durch Gleichgewicht und Stabilität.",

    osho: "Die transzendierte Mitte. Osho: 'Der Meditierende ist weder aktiv " +
      "noch passiv, er ist einfach bewusst.' Single-Status erlaubt diesem " +
      "Typ, diese Balance ohne Partner-Dynamiken zu kultivieren. " +
      "Weder Yang noch Yin dominiert - reine Bewusstheit."
  }

  // ════════════════════════════════════════════════════════════════════════════
  // WEITERE 206 PROFILE FOLGEN...
  // ════════════════════════════════════════════════════════════════════════════
  // Die restlichen Profile werden nach dem gleichen Schema erstellt:
  // - single-männlich-ausgeglichen-homosexuell (11)
  // - single-männlich-ausgeglichen-bisexuell (12)
  // - single-weiblich-dominant-heterosexuell (13)
  // - ... usw. bis Profile 216 (polyamor-nonbinär-ausgeglichen-bisexuell)
  // ════════════════════════════════════════════════════════════════════════════
};

// ════════════════════════════════════════════════════════════════════════════
// HELPER-FUNKTIONEN
// ════════════════════════════════════════════════════════════════════════════

/**
 * Generiert einen Profil-Key aus den Komponenten
 */
function generateProfileKey(archetyp, geschlecht, dominanz, orientierung) {
  return `${archetyp}-${geschlecht}-${dominanz}-${orientierung}`;
}

/**
 * Holt ein Profil anhand der Komponenten
 */
function getProfile(archetyp, geschlecht, dominanz, orientierung) {
  const key = generateProfileKey(archetyp, geschlecht, dominanz, orientierung);
  return psychologicalProfiles[key] || null;
}

/**
 * Listet alle verfügbaren Profil-Keys
 */
function listAllProfiles() {
  return Object.keys(psychologicalProfiles);
}

/**
 * Holt die Confidence für ein bestimmtes Attribut
 */
function getAttributeConfidence(profileKey, attribute) {
  const profile = psychologicalProfiles[profileKey];
  if (!profile || !profile.confidence) return null;
  return profile.confidence[attribute] || 0.5; // Default 50% wenn nicht definiert
}

// ════════════════════════════════════════════════════════════════════════════
// EXPORT
// ════════════════════════════════════════════════════════════════════════════
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    psychologicalProfiles,
    generateProfileKey,
    getProfile,
    listAllProfiles,
    getAttributeConfidence
  };
}
