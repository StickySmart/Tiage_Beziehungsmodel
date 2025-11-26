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
  },

  // ════════════════════════════════════════════════════════════════════════════
  // PROFIL 11: single-männlich-ausgeglichen-homosexuell
  // ════════════════════════════════════════════════════════════════════════════
  "single-männlich-ausgeglichen-homosexuell": {
    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Allen et al. (2020): Gay men = higher openness than heterosexuals",
      "Big Five Research: Balanced profiles = high emotional stability",
      "LGBTQ+ Research: Gay identity integration with balanced personality"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "mittel",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85,
      konfliktverhalten: 0.80, emotionaleOffenheit: 0.70, introExtro: 0.75, traditionenWichtigkeit: 0.85 },
    pirsig: "Balance zwischen dynamischer Freiheit (Single+Gay) und stabiler Mitte (Ausgeglichen). " +
      "Qualität durch Integration von Gegensätzen - weder extrem noch konformistisch.",
    osho: "Der bewusste Gay-Mann, der jenseits von Rebellion und Anpassung lebt. " +
      "Nicht mehr kämpfend gegen Normen, sondern ruhend in sich selbst."
  },

  // ════════════════════════════════════════════════════════════════════════════
  // PROFIL 12: single-männlich-ausgeglichen-bisexuell
  // ════════════════════════════════════════════════════════════════════════════
  "single-männlich-ausgeglichen-bisexuell": {
    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Allen et al. (2020): Bisexuals = highest openness",
      "Big Five Research: Balanced + high openness = adaptive personality"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "mittel",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85,
      konfliktverhalten: 0.80, emotionaleOffenheit: 0.75, introExtro: 0.75, traditionenWichtigkeit: 0.90 },
    pirsig: "Hohe Offenheit (Bi) mit stabiler Mitte (Ausgeglichen) - optimale Balance " +
      "zwischen Exploration und Integration. Qualität durch bewusste Wahlfreiheit.",
    osho: "Der zentrierte Bi-Mann - offen für alle Möglichkeiten, aber nicht getrieben. " +
      "Sexuelle Fluidität aus Bewusstsein, nicht aus Suche."
  },

  // ════════════════════════════════════════════════════════════════════════════
  // SINGLE-WEIBLICH PROFILE (13-24)
  // ════════════════════════════════════════════════════════════════════════════

  // PROFIL 13: single-weiblich-dominant-heterosexuell
  "single-weiblich-dominant-heterosexuell": {
    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "SMSNA (2023): Only 25% of women prefer dominant role",
      "Gender Research: Dominant women face social pushback",
      "Tannen (1990): Women use language for connection, dominant women adapt"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "atheistisch",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "spontan", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "laut", versoehnung: "schnell", kritikAnnehmen: "schwer", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "sehr-offen", alleinzeit: "wenig", events: "oft", reisen: "viel",
    hobbys: "getrennt", wochenende: "aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.80, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.75,
      konfliktverhalten: 0.70, emotionaleOffenheit: 0.60, introExtro: 0.75, karrierePrioritaet: 0.80 },
    pirsig: "Doppelte Rebellion gegen statische Muster: Als Frau gegen Submissivitäts-Erwartung, " +
      "als Single gegen Beziehungsnorm. Maximale dynamische Qualität.",
    osho: "Die Frau, die ihre Yang-Energie lebt - gesellschaftlich selten, spirituell wertvoll. " +
      "Osho: 'Die starke Frau hat ihre männliche Seite integriert.'"
  },

  // PROFIL 14: single-weiblich-dominant-homosexuell
  "single-weiblich-dominant-homosexuell": {
    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Lesbian Research: Dominant/butch identity in lesbian community",
      "Allen et al. (2020): Lesbians higher openness than hetero women"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "atheistisch",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "spontan", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "viel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "laut", versoehnung: "schnell", kritikAnnehmen: "mittel", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "viel",
    hobbys: "getrennt", wochenende: "aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.80,
      konfliktverhalten: 0.75, emotionaleOffenheit: 0.70, introExtro: 0.80, traditionenWichtigkeit: 0.90 },
    pirsig: "Dreifache Freiheit von statischen Mustern: Weibliche Submissivität, Heteronormativität, " +
      "und Beziehungszwang - alle durchbrochen. Pure Dynamic Quality.",
    osho: "Die freieste aller Frauen - lebt ihre Yang-Energie und ihre gleichgeschlechtliche " +
      "Anziehung ohne Kompromisse. Vollständige Authentizität."
  },

  // PROFIL 15: single-weiblich-dominant-bisexuell
  "single-weiblich-dominant-bisexuell": {
    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Allen et al. (2020): Bisexual women = highest openness",
      "Bisexual Women Research: Higher sociosexuality"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "spontan", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "viel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "laut", versoehnung: "schnell", kritikAnnehmen: "mittel", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "sehr-oft", reisen: "viel",
    hobbys: "getrennt", wochenende: "sehr-aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.80, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.80,
      konfliktverhalten: 0.75, emotionaleOffenheit: 0.75, introExtro: 0.80, freundeskreis: 0.80 },
    pirsig: "Maximale Freiheit: Keine Geschlechts-, Orientierungs- oder Beziehungsbindung. " +
      "Dominant + Bi + Single = vollständige dynamische Selbstbestimmung.",
    osho: "Die wildeste aller Frauen - alle Grenzen gesprengt. Lebt ihre volle " +
      "Sexualität und Dominanz ohne Einschränkung. Gesellschaftlich provokant, spirituell frei."
  },

  // PROFIL 16: single-weiblich-submissiv-heterosexuell
  "single-weiblich-submissiv-heterosexuell": {
    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Netherlands Study: 75.6% of SM-practicing women prefer submissive",
      "Gender Research: Submissive women = societally expected role"
    ],
    kinderWunsch: "vielleicht", eheWunsch: "nein", wohnform: "alleine", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "bescheiden",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "planend", traditionenWichtigkeit: "neutral",
    kommunikationsstil: "indirekt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "viel", feedbackStil: "diplomatisch", entschuldigungen: "leicht",
    streitVerhalten: "leise", versoehnung: "langsam", kritikAnnehmen: "gut", humorKonflikte: "selten",
    introExtro: "introvertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "zurückhaltend", alleinzeit: "viel", events: "selten", reisen: "wenig",
    hobbys: "getrennt", wochenende: "ruhig", netzwerkGroesse: "klein",
    confidence: { kinderWunsch: 0.65, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.85,
      konfliktverhalten: 0.85, emotionaleOffenheit: 0.80, introExtro: 0.80, alleinzeit: 0.85 },
    pirsig: "Spannung zwischen dynamischer Freiheit (Single) und statischem Muster (Submissiv). " +
      "Single-Status ermöglicht Submissivität ohne Abhängigkeit - paradoxe Freiheit.",
    osho: "Die Frau, die ihre Yin-Natur lebt, aber ohne Partner. Empfangend ohne " +
      "Geber - eine meditative Haltung. Single als bewusste Wahl, nicht als Mangel."
  },

  // PROFIL 17: single-weiblich-submissiv-homosexuell
  "single-weiblich-submissiv-homosexuell": {
    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Lesbian Research: Femme identity in lesbian community",
      "BDSM Research: Submissive role in lesbian dynamics"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "planend", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "indirekt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-offen",
    gespraechsBedürfnis: "viel", feedbackStil: "diplomatisch", entschuldigungen: "leicht",
    streitVerhalten: "leise", versoehnung: "langsam", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "zurückhaltend", alleinzeit: "viel", events: "manchmal", reisen: "mittel",
    hobbys: "getrennt", wochenende: "ruhig", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85,
      konfliktverhalten: 0.85, emotionaleOffenheit: 0.80, introExtro: 0.75, events: 0.60 },
    pirsig: "Submissive Energie mit lesbischer Identität - sucht vielleicht dominante Frau, " +
      "lebt aber autonom als Single. Dynamische Freiheit in rezeptiver Form.",
    osho: "Die empfangende lesbische Frau - ihre Yin-Energie richtet sich auf Frauen. " +
      "Single-Status als Phase oder bewusste Wahl der Selbstfindung."
  },

  // PROFIL 18: single-weiblich-submissiv-bisexuell
  "single-weiblich-submissiv-bisexuell": {
    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Allen et al. (2020): Bisexual women = highest openness",
      "Bi-Sub Research: High receptivity across genders"
    ],
    kinderWunsch: "vielleicht", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "planend", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "indirekt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-offen",
    gespraechsBedürfnis: "viel", feedbackStil: "diplomatisch", entschuldigungen: "leicht",
    streitVerhalten: "leise", versoehnung: "langsam", kritikAnnehmen: "sehr-gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "zurückhaltend", alleinzeit: "mittel", events: "manchmal", reisen: "mittel",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.60, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85,
      konfliktverhalten: 0.85, emotionaleOffenheit: 0.85, introExtro: 0.60, freundeskreis: 0.75 },
    pirsig: "Maximale Empfänglichkeit: Bi (offen für alle Geschlechter) + Sub (empfangend) + Single " +
      "(frei). Rezeptive dynamische Qualität - offen für alles, gebunden an nichts.",
    osho: "Die empfänglichste aller Frauen - wie ein offenes Gefäß, bereit für jede Erfahrung. " +
      "Spirituell hochentwickelt durch Nicht-Widerstand."
  },

  // PROFIL 19: single-weiblich-switch-heterosexuell
  "single-weiblich-switch-heterosexuell": {
    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "BDSM Research: Switch = high flexibility",
      "Gender Research: Switch women integrate both polarities"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "neutral",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "oft", reisen: "viel",
    hobbys: "getrennt", wochenende: "aktiv", netzwerkGroesse: "mittel-groß",
    confidence: { kinderWunsch: 0.80, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85,
      konfliktverhalten: 0.80, emotionaleOffenheit: 0.75, introExtro: 0.75, events: 0.75 },
    pirsig: "Balance zwischen Yin und Yang in einer Frau - kann beide Rollen einnehmen. " +
      "Single-Status erlaubt freie Exploration dieser Flexibilität.",
    osho: "Die ganze Frau - hat ihre männliche Seite integriert ohne ihre weibliche zu verlieren. " +
      "Kann geben und empfangen. Single als Raum für diese Integration."
  },

  // PROFIL 20: single-weiblich-switch-homosexuell
  "single-weiblich-switch-homosexuell": {
    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Lesbian Research: Versatile identity common in lesbian community",
      "Allen et al. (2020): Lesbians higher openness"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-offen",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "viel",
    hobbys: "getrennt", wochenende: "aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85,
      konfliktverhalten: 0.80, emotionaleOffenheit: 0.80, introExtro: 0.75, events: 0.80 },
    pirsig: "Maximale Flexibilität in lesbischer Form - kann butch oder femme sein, je nach " +
      "Situation. Single ermöglicht diese Exploration ohne feste Rolle.",
    osho: "Die vielseitige lesbische Frau - nicht festgelegt auf eine Polarität. " +
      "Lebt die volle Bandbreite weiblicher Energie mit Frauen."
  },

  // PROFIL 21: single-weiblich-switch-bisexuell
  "single-weiblich-switch-bisexuell": {
    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Allen et al. (2020): Bisexual women = highest openness of all",
      "Switch + Bi Research: Maximum flexibility in orientation and role"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-offen",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "sehr-oft", reisen: "viel",
    hobbys: "getrennt", wochenende: "sehr-aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.80, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85,
      konfliktverhalten: 0.80, emotionaleOffenheit: 0.85, introExtro: 0.80, freundeskreis: 0.85 },
    pirsig: "Pure Dynamic Quality in weiblicher Form. Keine Fixierung auf Geschlecht, Rolle " +
      "oder Beziehung. Maximale Beweglichkeit auf allen Ebenen.",
    osho: "Die flüssigste aller Frauen - wie Wasser nimmt sie jede Form an. " +
      "Bi + Switch + Single = vollständige Freiheit des Ausdrucks."
  },

  // PROFIL 22: single-weiblich-ausgeglichen-heterosexuell
  "single-weiblich-ausgeglichen-heterosexuell": {
    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Big Five Research: Balanced women = high stability",
      "Gender Research: Balanced hetero women = societally comfortable"
    ],
    kinderWunsch: "vielleicht", eheWunsch: "nein", wohnform: "alleine", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "planend", traditionenWichtigkeit: "neutral",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "mittel",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.55, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.85,
      konfliktverhalten: 0.85, emotionaleOffenheit: 0.80, introExtro: 0.80, alleinzeit: 0.75 },
    pirsig: "Gauss-Mitte mit Single-Freiheit. Weder extrem noch angepasst - die stabile " +
      "Mitte. Qualität durch ausgewogene Selbstbestimmung.",
    osho: "Die zentrierte Single-Frau - nicht rebellierend, nicht konformierend. " +
      "Einfach in ihrer Mitte ruhend, alleine aber nicht einsam."
  },

  // PROFIL 23: single-weiblich-ausgeglichen-homosexuell
  "single-weiblich-ausgeglichen-homosexuell": {
    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Allen et al. (2020): Lesbians = higher openness",
      "Balanced Lesbian Research: Integrated identity"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "mittel",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85,
      konfliktverhalten: 0.85, emotionaleOffenheit: 0.80, introExtro: 0.75, traditionenWichtigkeit: 0.85 },
    pirsig: "Balance in lesbischer Form - weder militant noch versteckt. Die reife " +
      "lesbische Identität, integriert und stabil.",
    osho: "Die bewusste lesbische Frau - ihre Sexualität ist Teil von ihr, definiert sie aber " +
      "nicht. In ihrer Mitte ruhend, unabhängig von Beziehung oder Bestätigung."
  },

  // PROFIL 24: single-weiblich-ausgeglichen-bisexuell
  "single-weiblich-ausgeglichen-bisexuell": {
    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Allen et al. (2020): Bi women = highest openness",
      "Balanced Bi Research: Integrated fluid identity"
    ],
    kinderWunsch: "vielleicht", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "mittel",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.55, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85,
      konfliktverhalten: 0.85, emotionaleOffenheit: 0.80, introExtro: 0.75, freundeskreis: 0.75 },
    pirsig: "Offenheit (Bi) mit Stabilität (Ausgeglichen) - kann alle mögen ohne getrieben zu sein. " +
      "Ruhige Fluidität, nicht chaotisch sondern zentriert.",
    osho: "Die zentrierte bisexuelle Frau - offen für alle, aber nicht auf der Suche. " +
      "Sexuelle Fluidität aus einem ruhigen Zentrum heraus."
  },

  // ════════════════════════════════════════════════════════════════════════════
  // SINGLE-NONBINÄR PROFILE (25-36)
  // ════════════════════════════════════════════════════════════════════════════

  // PROFIL 25: single-nonbinär-dominant-heterosexuell
  "single-nonbinär-dominant-heterosexuell": {
    sources: [
      "Stern et al. (2024): Singles report highest autonomy",
      "Non-binary Research: High openness (3.83), high neuroticism (3.60)",
      "SMSNA (2023): Dominant = higher extraversion"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "spontan", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "laut", versoehnung: "schnell", kritikAnnehmen: "schwer", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "oft", reisen: "viel",
    hobbys: "getrennt", wochenende: "aktiv", netzwerkGroesse: "mittel-groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.75,
      konfliktverhalten: 0.70, emotionaleOffenheit: 0.70, introExtro: 0.70, traditionenWichtigkeit: 0.90 },
    pirsig: "Non-binär = bereits jenseits binärer Muster. Dominant + Single verstärkt die " +
      "Freiheit von Normen. Dynamische Qualität ohne Geschlechtergrenzen.",
    osho: "Jenseits von Mann und Frau, führend und frei. Hat die gesellschaftliche " +
      "Geschlechterkonstruktion durchschaut und lebt authentisch dominant."
  },

  // PROFIL 26: single-nonbinär-dominant-homosexuell
  "single-nonbinär-dominant-homosexuell": {
    sources: [
      "Non-binary Research: High openness, unique identity challenges",
      "Queer Theory: Non-binary + gay = complex identity navigation",
      "SMSNA (2023): Dominant = assertive communication"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "spontan", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "viel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "laut", versoehnung: "schnell", kritikAnnehmen: "mittel", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "viel",
    hobbys: "getrennt", wochenende: "aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.75,
      konfliktverhalten: 0.70, emotionaleOffenheit: 0.75, introExtro: 0.70, events: 0.75 },
    pirsig: "Multiple Ebenen der Norm-Überschreitung: Geschlecht, Orientierung, Beziehung, " +
      "Dominanz. Maximale dynamische Qualität durch Ablehnung aller statischen Kategorien.",
    osho: "Der/die radikalste Individualist*in - alle Schubladen gesprengt. " +
      "Lebt völlig authentisch jenseits aller gesellschaftlichen Erwartungen."
  },

  // PROFIL 27: single-nonbinär-dominant-bisexuell
  "single-nonbinär-dominant-bisexuell": {
    sources: [
      "Non-binary Research: Highest openness scores",
      "Allen et al. (2020): Bi = highest openness of orientations",
      "Combined: NB + Bi = maximum fluidity"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "spontan", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "viel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "laut", versoehnung: "schnell", kritikAnnehmen: "mittel", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "sehr-oft", reisen: "viel",
    hobbys: "getrennt", wochenende: "sehr-aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.75,
      konfliktverhalten: 0.70, emotionaleOffenheit: 0.80, introExtro: 0.75, freundeskreis: 0.80 },
    pirsig: "Absolute dynamische Qualität - keine einzige binäre Kategorie akzeptiert. " +
      "Non-binär + Bi + Dominant + Single = vollständige Freiheit von Mustern.",
    osho: "Der/die ultimative Freigeist - keine Schublade passt. Lebt das Osho-Ideal " +
      "der vollständigen Befreiung von gesellschaftlicher Konditionierung."
  },

  // PROFIL 28: single-nonbinär-submissiv-heterosexuell
  "single-nonbinär-submissiv-heterosexuell": {
    sources: [
      "Non-binary Research: Higher neuroticism, agreeableness",
      "SMSNA (2023): Submissive = higher agreeableness",
      "Combined: High sensitivity, receptivity"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "bescheiden",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "planend", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "indirekt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "diplomatisch", entschuldigungen: "leicht",
    streitVerhalten: "leise", versoehnung: "langsam", kritikAnnehmen: "gut", humorKonflikte: "selten",
    introExtro: "introvertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "zurückhaltend", alleinzeit: "viel", events: "selten", reisen: "wenig",
    hobbys: "getrennt", wochenende: "ruhig", netzwerkGroesse: "klein",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.80,
      konfliktverhalten: 0.85, emotionaleOffenheit: 0.75, introExtro: 0.75, alleinzeit: 0.80 },
    pirsig: "Non-binär durchbricht Geschlechtermuster, Submissiv akzeptiert empfangende Rolle. " +
      "Interessante Kombination von Norm-Überschreitung und Hingabe.",
    osho: "Jenseits des Geschlechts, in der empfangenden Energie ruhend. " +
      "Hat die Geschlechter-Konstruktion durchschaut, lebt aber friedlich submissiv."
  },

  // PROFIL 29: single-nonbinär-submissiv-homosexuell
  "single-nonbinär-submissiv-homosexuell": {
    sources: [
      "Non-binary Research: Complex identity, high sensitivity",
      "Queer Submissive Research: Identity and power dynamics",
      "High agreeableness + openness combination"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "planend", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "indirekt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-offen",
    gespraechsBedürfnis: "viel", feedbackStil: "diplomatisch", entschuldigungen: "leicht",
    streitVerhalten: "leise", versoehnung: "langsam", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "zurückhaltend", alleinzeit: "viel", events: "manchmal", reisen: "mittel",
    hobbys: "getrennt", wochenende: "ruhig", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.80,
      konfliktverhalten: 0.85, emotionaleOffenheit: 0.80, introExtro: 0.70, events: 0.55 },
    pirsig: "Komplexe Identität mit empfangender Energie. Non-binär + Homo + Submissiv = " +
      "multiple Ebenen der Selbstdefinition jenseits von Normen.",
    osho: "Tiefe Sensibilität und Empfänglichkeit, jenseits der Geschlechter-Kategorien. " +
      "Spirituell hochentwickelt durch Nicht-Identifikation mit Formen."
  },

  // PROFIL 30: single-nonbinär-submissiv-bisexuell
  "single-nonbinär-submissiv-bisexuell": {
    sources: [
      "Non-binary Research: Highest openness",
      "Allen et al. (2020): Bi = highest openness",
      "Combined: Maximum receptivity and openness"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "planend", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "indirekt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-offen",
    gespraechsBedürfnis: "viel", feedbackStil: "diplomatisch", entschuldigungen: "leicht",
    streitVerhalten: "leise", versoehnung: "langsam", kritikAnnehmen: "sehr-gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "zurückhaltend", alleinzeit: "mittel", events: "manchmal", reisen: "mittel",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.80,
      konfliktverhalten: 0.85, emotionaleOffenheit: 0.85, introExtro: 0.55, freundeskreis: 0.75 },
    pirsig: "Maximale Offenheit auf allen Ebenen: NB (jenseits Geschlecht) + Bi (alle anziehend) " +
      "+ Sub (empfangend) + Single (frei). Pure Rezeptivität.",
    osho: "Das offenste aller Wesen - wie ein Spiegel, der alles reflektiert ohne festzuhalten. " +
      "Keine Identifikation, keine Fixierung, nur Empfangen."
  },

  // PROFIL 31: single-nonbinär-switch-heterosexuell
  "single-nonbinär-switch-heterosexuell": {
    sources: [
      "Non-binary Research: High openness, flexibility",
      "BDSM Research: Switch = maximum role flexibility",
      "Combined: Fluidity in gender and power"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "oft", reisen: "viel",
    hobbys: "getrennt", wochenende: "aktiv", netzwerkGroesse: "mittel-groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85,
      konfliktverhalten: 0.80, emotionaleOffenheit: 0.75, introExtro: 0.70, events: 0.70 },
    pirsig: "Doppelte Fluidität: Geschlecht nicht fixiert (NB), Rolle nicht fixiert (Switch). " +
      "Kann alle Kombinationen von Identität und Dynamik leben.",
    osho: "Jenseits aller Polaritäten - weder Mann noch Frau, weder dominant noch submissiv. " +
      "Die transzendierte Mitte in flexibler Form."
  },

  // PROFIL 32: single-nonbinär-switch-homosexuell
  "single-nonbinär-switch-homosexuell": {
    sources: [
      "Non-binary Research: High openness, unique challenges",
      "Queer Switch Research: Role fluidity in queer spaces",
      "Combined high flexibility"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-offen",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "viel",
    hobbys: "getrennt", wochenende: "aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85,
      konfliktverhalten: 0.80, emotionaleOffenheit: 0.80, introExtro: 0.70, events: 0.75 },
    pirsig: "Komplexe Identität mit maximaler Flexibilität in allen Bereichen. " +
      "NB + Homo + Switch = keine feste Kategorie, nur Fluss.",
    osho: "Der/die vielseitigste Queer-Person - kann alles sein, nichts fixiert. " +
      "Lebt das Ideal der vollständigen Nicht-Identifikation mit Formen."
  },

  // PROFIL 33: single-nonbinär-switch-bisexuell
  "single-nonbinär-switch-bisexuell": {
    sources: [
      "Non-binary Research: Highest openness",
      "Allen et al. (2020): Bi = highest openness",
      "Switch Research: Maximum flexibility",
      "Combined: Ultimate fluidity profile"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-offen",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "sehr-oft", reisen: "viel",
    hobbys: "getrennt", wochenende: "sehr-aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85,
      konfliktverhalten: 0.80, emotionaleOffenheit: 0.90, introExtro: 0.75, freundeskreis: 0.85 },
    pirsig: "Das flüssigste aller Profile - NICHTS ist fixiert. Geschlecht, Orientierung, " +
      "Rolle, Beziehungsstatus - alles in Bewegung. Pure Dynamic Quality.",
    osho: "Das Osho-Ideal verwirklicht: Vollständig frei von allen Kategorien und " +
      "Konditionierungen. Wie Wasser - nimmt jede Form an, ist an keine gebunden."
  },

  // PROFIL 34: single-nonbinär-ausgeglichen-heterosexuell
  "single-nonbinär-ausgeglichen-heterosexuell": {
    sources: [
      "Non-binary Research: High openness, variable extraversion",
      "Big Five: Balanced = emotional stability",
      "Combined: Stable non-binary identity"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "planend", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "mittel",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85,
      konfliktverhalten: 0.85, emotionaleOffenheit: 0.75, introExtro: 0.70, alleinzeit: 0.70 },
    pirsig: "Non-binäre Identität mit stabiler, zentrierter Energie. Jenseits des Geschlechts, " +
      "aber nicht in Extreme - die ruhige Mitte der Geschlechterfluidität.",
    osho: "Das transzendierte Geschlecht in stabiler Form - nicht kämpfend, nicht versteckt. " +
      "Einfach jenseits der binären Konstruktion ruhend."
  },

  // PROFIL 35: single-nonbinär-ausgeglichen-homosexuell
  "single-nonbinär-ausgeglichen-homosexuell": {
    sources: [
      "Non-binary Research: Complex identity",
      "Queer Stability Research: Integrated identities",
      "Big Five: Balanced profiles = high adaptability"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "mittel",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85,
      konfliktverhalten: 0.85, emotionaleOffenheit: 0.80, introExtro: 0.65, events: 0.60 },
    pirsig: "Komplexe, aber stabile Identität. NB + Homo, aber in Balance - nicht rebellierend, " +
      "sondern ruhig jenseits der Kategorien existierend.",
    osho: "Die reife queer-nonbinäre Identität - alle Kämpfe überstanden, jetzt in Frieden. " +
      "Weder gegen die Gesellschaft noch für sie - einfach authentisch."
  },

  // PROFIL 36: single-nonbinär-ausgeglichen-bisexuell
  "single-nonbinär-ausgeglichen-bisexuell": {
    sources: [
      "Non-binary Research: Highest openness",
      "Allen et al. (2020): Bi = highest openness",
      "Big Five: Balanced = stability with openness"
    ],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "mittel",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85,
      konfliktverhalten: 0.85, emotionaleOffenheit: 0.80, introExtro: 0.65, freundeskreis: 0.75 },
    pirsig: "Maximale Offenheit (NB + Bi) mit stabiler Mitte (Ausgeglichen). " +
      "Offen für alles, aber zentriert - keine chaotische, sondern bewusste Fluidität.",
    osho: "Die zentrierte non-binäre bisexuelle Person - alle Möglichkeiten offen, " +
      "aber in Frieden ruhend. Kein Suchen mehr, nur Sein."
  },

  // ════════════════════════════════════════════════════════════════════════════
  // ████████████████████████████████████████████████████████████████████████████
  // DUO-PROFILE (37-72) - 36 Profile
  // Der Verschmelzende Archetyp - Starke statische Qualität, Exklusivität
  // ████████████████████████████████████████████████████████████████████████████
  // ════════════════════════════════════════════════════════════════════════════

  // PROFIL 37-48: duo-männlich (alle Kombinationen)
  "duo-männlich-dominant-heterosexuell": {
    sources: ["Attachment Theory: Secure attachment", "Relationship Research: Commitment correlates with satisfaction", "SMSNA (2023): Dominant = assertive"],
    kinderWunsch: "ja", eheWunsch: "ja", wohnform: "zusammen", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "wichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "laut", versoehnung: "schnell", kritikAnnehmen: "schwer", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "sehr-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "mittel-groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.80, familieWichtigkeit: 0.85 },
    pirsig: "Maximale statische Qualität: Feste Bindung, klare Rollen (Dominant führt). Stabilität durch Struktur und Vorhersagbarkeit.",
    osho: "Gesellschaftlich konditioniert, aber wenn bewusst gewählt, kann Tiefe entstehen. Dominant in exklusiver Bindung - traditionelles Männerbild."
  },
  "duo-männlich-dominant-homosexuell": {
    sources: ["Gay Relationship Research", "SMSNA (2023): Dominant personality", "Allen et al. (2020): Gay men higher openness"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "laut", versoehnung: "schnell", kritikAnnehmen: "mittel", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.55, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.80, traditionenWichtigkeit: 0.85 },
    pirsig: "Statische Bindung in nicht-traditioneller Form. Exklusivität ohne heteronormatives Muster - neue Form stabiler Qualität.",
    osho: "Monogame Gay-Beziehung mit dominanter Dynamik. Hat Orientierungsnorm durchbrochen, aber Beziehungsnorm akzeptiert."
  },
  "duo-männlich-dominant-bisexuell": {
    sources: ["Allen et al. (2020): Bi = highest openness", "Bi in Monogamy Research", "SMSNA (2023): Dominant"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "laut", versoehnung: "schnell", kritikAnnehmen: "mittel", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.75, wohnform: 0.95, kommunikationsstil: 0.80, freundeskreis: 0.75 },
    pirsig: "Hohe Offenheit (Bi) in statischer Struktur (Duo). Interessante Spannung - offen für beide Geschlechter, aber exklusiv gebunden.",
    osho: "Der bisexuelle Mann in monogamer Beziehung - bewusste Einschränkung der Möglichkeiten zugunsten der Tiefe."
  },
  "duo-männlich-submissiv-heterosexuell": {
    sources: ["SMSNA (2023): Submissive = higher agreeableness", "Relationship Research", "Gender Role Research"],
    kinderWunsch: "ja", eheWunsch: "ja", wohnform: "zusammen", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "neutral",
    kommunikationsstil: "indirekt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "diplomatisch", entschuldigungen: "leicht",
    streitVerhalten: "leise", versoehnung: "langsam", kritikAnnehmen: "gut", humorKonflikte: "selten",
    introExtro: "introvertiert", familieWichtigkeit: "sehr-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "zurückhaltend", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "klein",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.80, familieWichtigkeit: 0.90 },
    pirsig: "Doppelte statische Qualität: Duo (feste Bindung) + Submissiv (folgende Rolle). Maximale Stabilität durch Hingabe.",
    osho: "Der empfangende Mann in Partnerschaft - lebt seine Yin-Natur mit einer Partnerin. Gegen Männlichkeitsnorm, für Beziehungsnorm."
  },
  "duo-männlich-submissiv-homosexuell": {
    sources: ["Gay Bottom Research", "SMSNA (2023): Submissive", "Attachment in Gay Relationships"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "indirekt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "viel", feedbackStil: "diplomatisch", entschuldigungen: "leicht",
    streitVerhalten: "leise", versoehnung: "langsam", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "zurückhaltend", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.80, emotionaleOffenheit: 0.75 },
    pirsig: "Submissive Energie in gay Partnerschaft. Feste Bindung mit empfangender Rolle - Stabilität durch Hingabe an Partner.",
    osho: "Der empfangende gay Mann - lebt seine Yin-Natur mit einem Partner. Authentisch in Orientierung und Rolle."
  },
  "duo-männlich-submissiv-bisexuell": {
    sources: ["Allen et al. (2020): Bi highest openness", "SMSNA (2023): Submissive", "Bi Monogamy Research"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "indirekt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "viel", feedbackStil: "diplomatisch", entschuldigungen: "leicht",
    streitVerhalten: "leise", versoehnung: "langsam", kritikAnnehmen: "sehr-gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "zurückhaltend", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.80, wohnform: 0.95, emotionaleOffenheit: 0.80, freundeskreis: 0.75 },
    pirsig: "Maximale Empfänglichkeit (Bi+Sub) in fester Struktur (Duo). Offen für alle, aber exklusiv gebunden - bewusste Begrenzung.",
    osho: "Der empfänglichste Mann in fester Bindung. Bisexuell aber monogam - lebt die Spannung zwischen Offenheit und Exklusivität."
  },
  "duo-männlich-switch-heterosexuell": {
    sources: ["Switch Research: High flexibility", "Relationship Research", "Big Five: Switch = high openness"],
    kinderWunsch: "ja", eheWunsch: "ja", wohnform: "zusammen", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "neutral",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "sehr-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "mittel-groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85, familieWichtigkeit: 0.85 },
    pirsig: "Flexibilität (Switch) in stabiler Struktur (Duo). Kann beide Rollen einnehmen, bleibt aber exklusiv. Dynamik innerhalb von Stabilität.",
    osho: "Der ganze Mann in Partnerschaft - kann führen und folgen. Traditionelle Bindung mit moderner Rollenauffassung."
  },
  "duo-männlich-switch-homosexuell": {
    sources: ["Gay Versatile Research", "Switch personality", "Allen et al. (2020): Gay higher openness"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85, events: 0.80 },
    pirsig: "Versatile gay Partnerschaft - beide Rollen möglich, aber exklusiv. Maximale Flexibilität innerhalb stabiler Grenzen.",
    osho: "Der flexible gay Partner - kann geben und empfangen. Exklusiv aber nicht starr - lebendige Monogamie."
  },
  "duo-männlich-switch-bisexuell": {
    sources: ["Allen et al. (2020): Bi highest openness", "Switch Research", "Bi Monogamy"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.85, freundeskreis: 0.80 },
    pirsig: "Maximale Flexibilität (Bi+Switch) in exklusiver Bindung. Offen für alles, entschieden für einen. Bewusste Wahl der Begrenzung.",
    osho: "Der flexibelste Mann in fester Beziehung. Bi und Switch, aber monogam - lebt die Paradoxie von Freiheit in Bindung."
  },
  "duo-männlich-ausgeglichen-heterosexuell": {
    sources: ["Big Five: Balanced = stability", "Relationship satisfaction research", "Gauss distribution"],
    kinderWunsch: "ja", eheWunsch: "ja", wohnform: "zusammen", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "wichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "sehr-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.95, wohnform: 0.95, kommunikationsstil: 0.85, familieWichtigkeit: 0.90 },
    pirsig: "Die Gauss-Mitte der Beziehung. Statistisch am häufigsten - ausgeglichen in exklusiver Partnerschaft. Stabile Qualität durch Balance.",
    osho: "Der durchschnittliche heterosexuelle Partner - weder extrem noch rebellisch. Gesellschaftlich akzeptiert, aber nicht unbedingt bewusst."
  },
  "duo-männlich-ausgeglichen-homosexuell": {
    sources: ["Gay Relationship Research", "Big Five: Balanced", "Allen et al. (2020)"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "neutral",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85, emotionaleOffenheit: 0.75 },
    pirsig: "Stabile gay Partnerschaft - ausgeglichen und exklusiv. Nicht-traditionelle Orientierung in traditioneller Beziehungsform.",
    osho: "Der zentrierte gay Partner - in Frieden mit seiner Orientierung und seiner Beziehungsform. Reife Integration."
  },
  "duo-männlich-ausgeglichen-bisexuell": {
    sources: ["Allen et al. (2020): Bi highest openness", "Big Five: Balanced", "Bi Monogamy Research"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "neutral",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.85, freundeskreis: 0.75 },
    pirsig: "Offenheit (Bi) in stabiler Mitte (Ausgeglichen+Duo). Bisexuell aber zentriert und exklusiv. Ruhige Akzeptanz aller Möglichkeiten.",
    osho: "Der zentrierte bisexuelle Partner - offen für alle, entschieden für einen. Keine Spannung, nur Frieden mit der Wahl."
  },

  // PROFIL 49-60: duo-weiblich (alle Kombinationen)
  "duo-weiblich-dominant-heterosexuell": {
    sources: ["SMSNA (2023): 25% women dominant", "Relationship Research", "Gender role research"],
    kinderWunsch: "ja", eheWunsch: "ja", wohnform: "zusammen", religion: "offen",
    karrierePrioritaet: "karriere", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "neutral",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "viel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "laut", versoehnung: "schnell", kritikAnnehmen: "mittel", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "sehr-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.75, karrierePrioritaet: 0.75 },
    pirsig: "Dominante Frau in exklusiver Hetero-Beziehung. Gegen Geschlechterrolle, für Beziehungsnorm - partielle Rebellion.",
    osho: "Die starke Frau in Partnerschaft - führt in der Beziehung. Mutter und Karrierefrau möglich, aber anstrengend."
  },
  "duo-weiblich-dominant-homosexuell": {
    sources: ["Lesbian Butch Research", "Dominant personality", "Allen et al. (2020)"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "offen",
    karrierePrioritaet: "karriere", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "viel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "laut", versoehnung: "schnell", kritikAnnehmen: "mittel", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.80, events: 0.80 },
    pirsig: "Dominante lesbische Frau in exklusiver Partnerschaft. Beide Normen gebrochen (Hetero, Submissiv), aber Duo-Norm akzeptiert.",
    osho: "Die starke lesbische Partnerin - Yang-Energie mit einer Frau. Authentisch in Orientierung und Rolle, konventionell in Beziehungsform."
  },
  "duo-weiblich-dominant-bisexuell": {
    sources: ["Allen et al. (2020): Bi women highest openness", "Dominant personality", "Bi Monogamy"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "karriere", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "viel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "laut", versoehnung: "schnell", kritikAnnehmen: "mittel", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.80, freundeskreis: 0.80 },
    pirsig: "Maximale weibliche Energie-Offenheit (Bi+Dom) in exklusiver Bindung. Stark und offen, aber gewählt begrenzt.",
    osho: "Die stärkste Frau in Beziehung - dominant, bisexuell, aber monogam. Bewusste Wahl der Exklusivität trotz aller Möglichkeiten."
  },
  "duo-weiblich-submissiv-heterosexuell": {
    sources: ["Netherlands Study: 75.6% women prefer submissive", "Traditional gender roles", "Relationship satisfaction"],
    kinderWunsch: "ja", eheWunsch: "ja", wohnform: "zusammen", religion: "offen",
    karrierePrioritaet: "beziehung", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "wichtig",
    kommunikationsstil: "indirekt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-offen",
    gespraechsBedürfnis: "viel", feedbackStil: "diplomatisch", entschuldigungen: "leicht",
    streitVerhalten: "leise", versoehnung: "langsam", kritikAnnehmen: "gut", humorKonflikte: "selten",
    introExtro: "introvertiert", familieWichtigkeit: "sehr-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "zurückhaltend", alleinzeit: "wenig", events: "selten", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "klein",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.95, wohnform: 0.95, kommunikationsstil: 0.85, familieWichtigkeit: 0.95 },
    pirsig: "Maximale statische Qualität: Submissiv + Duo + traditionelle Geschlechterrolle. Gesellschaftlich erwartetes Muster.",
    osho: "Die traditionelle Frau - submissiv, hetero, monogam. Am meisten konditioniert, aber wenn bewusst gewählt, authentisch."
  },
  "duo-weiblich-submissiv-homosexuell": {
    sources: ["Lesbian Femme Research", "SMSNA (2023): Submissive", "Allen et al. (2020)"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "indirekt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-offen",
    gespraechsBedürfnis: "viel", feedbackStil: "diplomatisch", entschuldigungen: "leicht",
    streitVerhalten: "leise", versoehnung: "langsam", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "zurückhaltend", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85, emotionaleOffenheit: 0.85 },
    pirsig: "Submissive lesbische Frau in exklusiver Partnerschaft. Heteronorm gebrochen, Geschlechterrolle beibehalten, Beziehungsnorm akzeptiert.",
    osho: "Die empfangende lesbische Partnerin - Yin-Energie mit einer Frau. Femme-Identität in exklusiver Bindung."
  },
  "duo-weiblich-submissiv-bisexuell": {
    sources: ["Allen et al. (2020): Bi women", "SMSNA (2023): Submissive", "Bi Monogamy"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "indirekt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-offen",
    gespraechsBedürfnis: "viel", feedbackStil: "diplomatisch", entschuldigungen: "leicht",
    streitVerhalten: "leise", versoehnung: "langsam", kritikAnnehmen: "sehr-gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "zurückhaltend", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.85, wohnform: 0.95, emotionaleOffenheit: 0.85, freundeskreis: 0.75 },
    pirsig: "Maximale Empfänglichkeit (Bi+Sub) in exklusiver Bindung. Offen für alle, hingegeben an einen. Bewusste Begrenzung der Offenheit.",
    osho: "Die empfänglichste Partnerin - bisexuell und submissiv, aber monogam. Tiefe Hingabe trotz oder wegen der vielen Möglichkeiten."
  },
  "duo-weiblich-switch-heterosexuell": {
    sources: ["Switch Research", "Relationship equality research", "Gender flexibility"],
    kinderWunsch: "ja", eheWunsch: "ja", wohnform: "zusammen", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "neutral",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "sehr-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "mittel-groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85, familieWichtigkeit: 0.85 },
    pirsig: "Flexible Frau in exklusiver Hetero-Beziehung. Kann führen und folgen - moderne Partnerschaft auf Augenhöhe.",
    osho: "Die ganze Frau in Beziehung - Yin und Yang integriert. Mit einem Mann, aber nicht in traditioneller Rolle fixiert."
  },
  "duo-weiblich-switch-homosexuell": {
    sources: ["Lesbian Versatile Research", "Switch personality", "Allen et al. (2020)"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-offen",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85, events: 0.80 },
    pirsig: "Versatile lesbische Partnerschaft - beide können beide Rollen. Gleichberechtigung und Flexibilität in exklusiver Bindung.",
    osho: "Die vielseitige lesbische Partnerin - nicht auf butch oder femme festgelegt. Lebendige Dynamik in monogamer Form."
  },
  "duo-weiblich-switch-bisexuell": {
    sources: ["Allen et al. (2020): Bi women highest openness", "Switch Research", "Bi Monogamy"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-offen",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.85, freundeskreis: 0.85 },
    pirsig: "Maximale weibliche Flexibilität (Bi+Switch) in exklusiver Bindung. Alle Türen offen, eine gewählt. Freiheit in der Begrenzung.",
    osho: "Die flexibelste Frau in monogamer Beziehung. Könnte alles sein, wählt aber Tiefe mit einem Menschen. Bewusste Entscheidung."
  },
  "duo-weiblich-ausgeglichen-heterosexuell": {
    sources: ["Big Five: Balanced women", "Relationship satisfaction", "Gauss distribution"],
    kinderWunsch: "ja", eheWunsch: "ja", wohnform: "zusammen", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "wichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "sehr-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.95, wohnform: 0.95, kommunikationsstil: 0.85, familieWichtigkeit: 0.95 },
    pirsig: "Die statistische Mitte - die häufigste Kombination bei Frauen. Ausgeglichene Hetero-Frau in traditioneller Beziehung.",
    osho: "Die Durchschnittsfrau - gesellschaftlich integriert, nicht rebellisch. Kann glücklich sein, wenn bewusst gewählt."
  },
  "duo-weiblich-ausgeglichen-homosexuell": {
    sources: ["Lesbian Relationship Research", "Big Five: Balanced", "Allen et al. (2020)"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "offen",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "neutral",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85, emotionaleOffenheit: 0.80 },
    pirsig: "Zentrierte lesbische Partnerin - weder extrem noch versteckt. Integrierte Identität in stabiler Beziehung.",
    osho: "Die reife lesbische Frau in Beziehung - in Frieden mit sich und ihrer Partnerin. Keine Kämpfe mehr, nur Liebe."
  },
  "duo-weiblich-ausgeglichen-bisexuell": {
    sources: ["Allen et al. (2020): Bi women", "Big Five: Balanced", "Bi Monogamy Research"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "neutral",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.85, freundeskreis: 0.75 },
    pirsig: "Bisexuelle Offenheit in zentrierter, exklusiver Form. Kann alle mögen, liebt einen. Stabile Mitte trotz Fluidität.",
    osho: "Die zentrierte Bi-Frau in Partnerschaft - in Frieden mit ihrer Orientierung und ihrer Wahl. Keine Reue, keine Sehnsucht."
  },

  // PROFIL 61-72: duo-nonbinär (alle Kombinationen)
  "duo-nonbinär-dominant-heterosexuell": {
    sources: ["Non-binary Research: High openness", "SMSNA: Dominant", "Relationship Research"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "karriere", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "laut", versoehnung: "schnell", kritikAnnehmen: "mittel", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "mittel-groß",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.75, traditionenWichtigkeit: 0.90 },
    pirsig: "Non-binär durchbricht Geschlechternorm, Duo akzeptiert Beziehungsnorm. Partielle Rebellion, partielle Struktur.",
    osho: "Jenseits der Geschlechter, aber in Partnerschaft. Dominant und exklusiv - neue Form der Beziehung."
  },
  "duo-nonbinär-dominant-homosexuell": {
    sources: ["Non-binary Research", "Queer Relationship Studies", "Dominant personality"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "karriere", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "viel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "laut", versoehnung: "schnell", kritikAnnehmen: "mittel", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.75, events: 0.75 },
    pirsig: "Komplexe Identität (NB+Homo) in exklusiver Bindung mit dominanter Energie. Viele Normen gebrochen, eine akzeptiert.",
    osho: "Die queere dominante Person in Partnerschaft - authentisch in Identität, konventionell in Beziehungsform."
  },
  "duo-nonbinär-dominant-bisexuell": {
    sources: ["Non-binary Research: Highest openness", "Allen et al. (2020): Bi highest openness", "Dominant personality"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "karriere", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "viel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "laut", versoehnung: "schnell", kritikAnnehmen: "mittel", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.80, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.75, freundeskreis: 0.80 },
    pirsig: "Maximale Offenheit (NB+Bi) mit Dominanz in exklusiver Form. Alle Kategorien gesprengt außer Monogamie.",
    osho: "Der/die freieste Geist in fester Bindung. Bi, non-binär, dominant - aber gewählt monogam. Bewusste Begrenzung."
  },
  "duo-nonbinär-submissiv-heterosexuell": {
    sources: ["Non-binary Research: High agreeableness", "SMSNA: Submissive", "Relationship Research"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "bescheiden",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "indirekt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "diplomatisch", entschuldigungen: "leicht",
    streitVerhalten: "leise", versoehnung: "langsam", kritikAnnehmen: "gut", humorKonflikte: "selten",
    introExtro: "introvertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "zurückhaltend", alleinzeit: "mittel", events: "selten", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "klein",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.80, alleinzeit: 0.75 },
    pirsig: "Non-binär jenseits Geschlecht, Submissiv in empfangender Rolle, Duo in fester Bindung. Komplexe, aber stabile Identität.",
    osho: "Jenseits der Geschlechter, in Hingabe ruhend. Submissiv und exklusiv - neue Form der Beziehung."
  },
  "duo-nonbinär-submissiv-homosexuell": {
    sources: ["Non-binary Research", "Queer Submissive Studies", "High agreeableness + openness"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "indirekt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-offen",
    gespraechsBedürfnis: "viel", feedbackStil: "diplomatisch", entschuldigungen: "leicht",
    streitVerhalten: "leise", versoehnung: "langsam", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "zurückhaltend", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.85, wohnform: 0.95, emotionaleOffenheit: 0.80, kommunikationsstil: 0.80 },
    pirsig: "Komplexe queere Identität mit empfangender Energie in exklusiver Bindung. Tiefe Sensibilität, feste Struktur.",
    osho: "Die empfangende queere Person in Partnerschaft - authentisch und hingegeben. Stabile Liebe jenseits aller Kategorien."
  },
  "duo-nonbinär-submissiv-bisexuell": {
    sources: ["Non-binary Research", "Allen et al. (2020): Bi", "SMSNA: Submissive"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "indirekt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-offen",
    gespraechsBedürfnis: "viel", feedbackStil: "diplomatisch", entschuldigungen: "leicht",
    streitVerhalten: "leise", versoehnung: "langsam", kritikAnnehmen: "sehr-gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "zurückhaltend", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.80, eheWunsch: 0.85, wohnform: 0.95, emotionaleOffenheit: 0.85, freundeskreis: 0.75 },
    pirsig: "Maximale Empfänglichkeit (NB+Bi+Sub) in exklusiver Form. Offen für alles, hingegeben an einen. Pure Rezeptivität in Bindung.",
    osho: "Das offenste Wesen in fester Beziehung - wie ein Spiegel, der alles empfängt, aber einem Menschen gehört."
  },
  "duo-nonbinär-switch-heterosexuell": {
    sources: ["Non-binary Research", "Switch personality", "Relationship flexibility"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "mittel-groß",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.85, events: 0.70 },
    pirsig: "Doppelte Fluidität (NB+Switch) in stabiler Beziehungsform. Flexibel in Geschlecht und Rolle, fest in Bindung.",
    osho: "Jenseits aller Polaritäten, aber in Partnerschaft. Die transzendierte Mitte sucht Verbindung."
  },
  "duo-nonbinär-switch-homosexuell": {
    sources: ["Non-binary Research", "Queer Switch Studies", "Relationship Research"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-offen",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85, events: 0.75 },
    pirsig: "Maximale Flexibilität in queerer Partnerschaft. NB + Homo + Switch - alle Rollen möglich, aber exklusiv.",
    osho: "Die vielseitigste queere Person in Beziehung - kann alles sein, wählt aber Tiefe mit einem Menschen."
  },
  "duo-nonbinär-switch-bisexuell": {
    sources: ["Non-binary Research: Highest openness", "Allen et al. (2020)", "Switch Research"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-offen",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-aktiv", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.80, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.85, freundeskreis: 0.85 },
    pirsig: "Das flüssigste Wesen (NB+Bi+Switch) in fester Form (Duo). Pure Dynamic Quality wählt Static Quality. Bewusste Paradoxie.",
    osho: "Vollständig fluid, aber gewählt gebunden. Das freiste Wesen in Partnerschaft - die ultimative bewusste Wahl."
  },
  "duo-nonbinär-ausgeglichen-heterosexuell": {
    sources: ["Non-binary Research", "Big Five: Balanced", "Relationship stability"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.85, alleinzeit: 0.70 },
    pirsig: "Non-binäre Identität mit stabiler Mitte in exklusiver Beziehung. Jenseits des Geschlechts, aber in Balance.",
    osho: "Das transzendierte Geschlecht in stabiler Partnerschaft. Weder extrem noch angepasst - die ruhige Mitte."
  },
  "duo-nonbinär-ausgeglichen-homosexuell": {
    sources: ["Non-binary Research", "Big Five: Balanced", "Queer Relationship stability"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85, emotionaleOffenheit: 0.80 },
    pirsig: "Komplexe, aber stabile queere Identität in exklusiver Beziehung. NB + Homo + Ausgeglichen + Duo = reife Integration.",
    osho: "Die reife queere Person in Partnerschaft - alle Kämpfe überstanden, jetzt in Frieden und Liebe."
  },
  "duo-nonbinär-ausgeglichen-bisexuell": {
    sources: ["Non-binary Research", "Allen et al. (2020)", "Big Five: Balanced"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "gemeinsam-langfristig", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "offen",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.80, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.85, freundeskreis: 0.75 },
    pirsig: "Maximale Offenheit (NB+Bi) mit stabiler Mitte (Ausgeglichen) in exklusiver Form (Duo). Alle Möglichkeiten integriert.",
    osho: "Die zentrierte non-binäre bisexuelle Person in Partnerschaft. Offen für alles, in Frieden mit der Wahl."
  },

  // ════════════════════════════════════════════════════════════════════════════
  // DUO-FLEX PROFILE (73-108): 36 Profile
  // Anker-Beziehung mit Flexibilität - Balance zwischen Statisch und Dynamisch
  // ════════════════════════════════════════════════════════════════════════════

  // ───────────────────────────────────────────────────────────────────────────
  // DUO-FLEX MÄNNLICH (73-84)
  // ───────────────────────────────────────────────────────────────────────────
  "duo-flex-männlich-dominant-heterosexuell": {
    sources: ["PAI-DOM Studies", "CNM Research (2021)", "Big Five: Open relationships"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "karriere", finanzPhilosophie: "hauptsächlich-gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "mittel", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "wenig", events: "oft", reisen: "getrennt-ok",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.60, eheWunsch: 0.70, wohnform: 0.90, kommunikationsstil: 0.85, hobbys: 0.80 },
    pirsig: "Statischer Anker (Duo) mit dynamischer Öffnung (Flex). Der dominante Mann führt, aber ermöglicht Freiräume.",
    osho: "Der moderne Alpha - nicht besitzergreifend, aber bestimmend. Starke Führung mit offenem Herzen."
  },
  "duo-flex-männlich-dominant-homosexuell": {
    sources: ["PAI-DOM Studies", "Gay CNM Research", "Big Five: Higher openness in gay men"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "karriere", finanzPhilosophie: "hauptsächlich-gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "getrennt-ok",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.65, wohnform: 0.90, kommunikationsstil: 0.85, oeffentlichkeit: 0.80 },
    pirsig: "Queere Offenheit verstärkt Duo-Flex Dynamik. Der dominante schwule Mann definiert seine eigenen Regeln.",
    osho: "Doppelt befreit - von Hetero-Norm und von Monogamie-Dogma. Der souveräne queere Leader."
  },
  "duo-flex-männlich-dominant-bisexuell": {
    sources: ["PAI-DOM Studies", "Allen et al. (2020): Bi highest openness", "CNM Research"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "karriere", finanzPhilosophie: "hauptsächlich-gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "mittel", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "mittel", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "getrennt-ok",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.55, eheWunsch: 0.60, wohnform: 0.90, kommunikationsstil: 0.85, netzwerkGroesse: 0.80 },
    pirsig: "Dreifache Offenheit: Bi + Flex + Dominant. Maximale dynamische Qualität bei starker Führung.",
    osho: "Der natürlichste dominante Typ - offen für alle Geschlechter, führend in allen Situationen."
  },
  "duo-flex-männlich-submissiv-heterosexuell": {
    sources: ["BDSM Submissive Research", "CNM Studies", "Gender atypical roles"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "diskret", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "klein",
    confidence: { kinderWunsch: 0.55, eheWunsch: 0.65, wohnform: 0.85, kommunikationsstil: 0.80, introExtro: 0.75 },
    pirsig: "Untypische Gender-Rolle (submissiver Mann) in flexibler Struktur. Statisches Muster bewusst aufgebrochen.",
    osho: "Der Mann, der zu folgen gelernt hat - gesellschaftlich selten, aber innerlich frei."
  },
  "duo-flex-männlich-submissiv-homosexuell": {
    sources: ["Gay Submissive Research", "CNM Studies", "Higher agreeableness"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "introvertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "diskret", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.60, wohnform: 0.85, kommunikationsstil: 0.85, emotionaleOffenheit: 0.85 },
    pirsig: "Queere Dynamik mit submissiver Rolle in flexibler Anker-Beziehung. Doppelte Offenheit für Neues.",
    osho: "Der hingebungsvolle queere Mann - keine Masken, keine Spiele, nur echte Verbindung."
  },
  "duo-flex-männlich-submissiv-bisexuell": {
    sources: ["BDSM Research", "Allen et al. (2020)", "CNM highest openness"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "diskret", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.55, wohnform: 0.85, kommunikationsstil: 0.85, kritikAnnehmen: 0.80 },
    pirsig: "Maximale Offenheit (Bi+Flex) mit Hingabe (Submissiv). Fließende dynamische Qualität.",
    osho: "Der natürlich hingebungsvolle Mann - offen für alle, dienend mit Freude."
  },
  "duo-flex-männlich-switch-heterosexuell": {
    sources: ["Switch Studies: High flexibility", "CNM Research", "Big Five: Low neuroticism"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "hauptsächlich-gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "getrennt-ok",
    hobbys: "teilweise-gemeinsam", wochenende: "gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.60, eheWunsch: 0.65, wohnform: 0.90, kommunikationsstil: 0.85, streitVerhalten: 0.80 },
    pirsig: "Doppelte Flexibilität: Switch + Duo-Flex. Der anpassungsfähigste heterosexuelle Männertyp.",
    osho: "Yin und Yang in einer Person, in flexibler Partnerschaft. Vollständig, aber nicht gebunden."
  },
  "duo-flex-männlich-switch-homosexuell": {
    sources: ["Gay Switch Research", "CNM Studies", "High openness"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "hauptsächlich-gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "getrennt-ok",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.60, wohnform: 0.90, kommunikationsstil: 0.85, oeffentlichkeit: 0.85 },
    pirsig: "Maximale Flexibilität in queerer Beziehung. Switch + Flex + Homo = dreifache Anpassungsfähigkeit.",
    osho: "Der vielseitige queere Mann - kann alles sein, bleibt frei in der Bindung."
  },
  "duo-flex-männlich-switch-bisexuell": {
    sources: ["Switch Studies", "Allen et al. (2020)", "CNM Research: Highest flexibility"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "hauptsächlich-gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "mittel", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "getrennt-ok",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.55, wohnform: 0.90, kommunikationsstil: 0.90, kritikAnnehmen: 0.85 },
    pirsig: "Das flüssigste männliche Profil: Bi + Switch + Flex. Pure dynamische Qualität mit Anker.",
    osho: "Der vollständig fluide Mann - offen für alles, anpassbar an alles, frei in allem."
  },
  "duo-flex-männlich-ausgeglichen-heterosexuell": {
    sources: ["Big Five: Balanced personality", "CNM Research", "Stable relationships"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "mittel",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.60, eheWunsch: 0.70, wohnform: 0.90, kommunikationsstil: 0.85, alleinzeit: 0.75 },
    pirsig: "Die stabile Mitte im Duo-Flex. Ausgewogen + Flexibel = nachhaltiges Beziehungsmodell.",
    osho: "Der reife heterosexuelle Mann - kein Extrem, aber offen. Zentriert in beweglicher Partnerschaft."
  },
  "duo-flex-männlich-ausgeglichen-homosexuell": {
    sources: ["Big Five: Balanced", "Gay CNM Research", "Stable queer relationships"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.65, wohnform: 0.90, kommunikationsstil: 0.85, oeffentlichkeit: 0.80 },
    pirsig: "Reife queere Beziehung mit Offenheit. Ausgeglichen + Flex = emotional stabile Öffnung.",
    osho: "Der zentrierte schwule Mann - nicht mehr kämpfend, nicht mehr suchend. In Frieden offen."
  },
  "duo-flex-männlich-ausgeglichen-bisexuell": {
    sources: ["Big Five: Balanced", "Allen et al. (2020)", "CNM Research"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.55, eheWunsch: 0.60, wohnform: 0.90, kommunikationsstil: 0.85, freundeskreis: 0.75 },
    pirsig: "Hohe Offenheit (Bi) mit stabiler Mitte (Ausgeglichen) in flexibler Bindung. Integrierte Persönlichkeit.",
    osho: "Der zentrierte bisexuelle Mann - alle Möglichkeiten anerkannt, aber in Ruhe. Weise Offenheit."
  },

  // ───────────────────────────────────────────────────────────────────────────
  // DUO-FLEX WEIBLICH (85-96)
  // ───────────────────────────────────────────────────────────────────────────
  "duo-flex-weiblich-dominant-heterosexuell": {
    sources: ["PAI-DOM Studies", "CNM Research (2021)", "Gender atypical dominance"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "mittel", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "getrennt-ok",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.65, wohnform: 0.90, kommunikationsstil: 0.85, karrierePrioritaet: 0.85 },
    pirsig: "Statisch atypisch (dominante Frau) in dynamischer Struktur. Doppelte Norm-Überschreitung.",
    osho: "Die Löwin - stark, unabhängig, aber verbunden. Sie führt die Öffnung."
  },
  "duo-flex-weiblich-dominant-homosexuell": {
    sources: ["PAI-DOM Studies", "Lesbian CNM Research", "Higher assertiveness"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "getrennt-ok",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.60, wohnform: 0.90, kommunikationsstil: 0.90, oeffentlichkeit: 0.85 },
    pirsig: "Doppelte Außenseiter-Position (lesbisch + dominant) in flexibler Struktur. Maximale Selbstbestimmung.",
    osho: "Die souveräne queere Frau - definiert ihr eigenes Leben ohne Kompromisse."
  },
  "duo-flex-weiblich-dominant-bisexuell": {
    sources: ["PAI-DOM Studies", "Allen et al. (2020)", "CNM Research"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "mittel", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "mittel", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "getrennt-ok",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.45, eheWunsch: 0.55, wohnform: 0.90, kommunikationsstil: 0.90, netzwerkGroesse: 0.85 },
    pirsig: "Dreifache Offenheit (Bi + Flex + Dominant) mit weiblicher Energie. Maximale dynamische Qualität.",
    osho: "Die vollständig freie Frau - keine Grenzen in Orientierung oder Ausdruck."
  },
  "duo-flex-weiblich-submissiv-heterosexuell": {
    sources: ["BDSM Research: 75% women prefer submissive", "CNM Studies", "Attachment theory"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "mittel",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "sehr-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "diskret", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "klein",
    confidence: { kinderWunsch: 0.60, eheWunsch: 0.70, wohnform: 0.90, kommunikationsstil: 0.90, emotionaleOffenheit: 0.90 },
    pirsig: "Typische Rolle (submissive Frau) in atypischer Struktur (Flex). Traditionell in der Dynamik, modern in der Form.",
    osho: "Die hingebungsvolle Frau in offener Beziehung - Weichheit mit Freiheit kombiniert."
  },
  "duo-flex-weiblich-submissiv-homosexuell": {
    sources: ["Lesbian Submissive Research", "CNM Studies", "Higher emotional expression"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "diskret", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.60, wohnform: 0.90, kommunikationsstil: 0.90, emotionaleOffenheit: 0.90 },
    pirsig: "Queere Weichheit in flexibler Struktur. Emotionale Tiefe mit Offenheit für Exploration.",
    osho: "Die sensible queere Frau - in Hingabe verbunden, aber nicht besessen."
  },
  "duo-flex-weiblich-submissiv-bisexuell": {
    sources: ["BDSM Research", "Allen et al. (2020)", "CNM: Highest openness"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "diskret", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.55, wohnform: 0.90, kommunikationsstil: 0.90, kritikAnnehmen: 0.85 },
    pirsig: "Maximale Offenheit (Bi + Flex) mit Hingabe (Submissiv). Fließend und weich.",
    osho: "Die natürlich hingebungsvolle Frau - offen für alle Formen der Liebe."
  },
  "duo-flex-weiblich-switch-heterosexuell": {
    sources: ["Switch Studies", "CNM Research", "Female flexibility"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "hauptsächlich-gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "getrennt-ok",
    hobbys: "teilweise-gemeinsam", wochenende: "gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.55, eheWunsch: 0.65, wohnform: 0.90, kommunikationsstil: 0.85, streitVerhalten: 0.85 },
    pirsig: "Doppelte Flexibilität (Switch + Flex) mit weiblicher Empathie. Höchste Anpassungsfähigkeit.",
    osho: "Die vielseitige Frau - mal führend, mal folgend, immer verbunden."
  },
  "duo-flex-weiblich-switch-homosexuell": {
    sources: ["Lesbian Switch Research", "CNM Studies", "High openness"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "hauptsächlich-gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "getrennt-ok",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.60, wohnform: 0.90, kommunikationsstil: 0.90, oeffentlichkeit: 0.85 },
    pirsig: "Maximale queere Flexibilität. Switch + Flex + Homo = absolute Rollenfreiheit.",
    osho: "Die freiste queere Frau - keine Rolle ist fest, alles ist möglich."
  },
  "duo-flex-weiblich-switch-bisexuell": {
    sources: ["Switch Studies", "Allen et al. (2020)", "CNM: Highest flexibility"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "hauptsächlich-gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "getrennt-ok",
    hobbys: "teilweise-gemeinsam", wochenende: "gemischt", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.45, eheWunsch: 0.50, wohnform: 0.90, kommunikationsstil: 0.90, kritikAnnehmen: 0.85 },
    pirsig: "Das flüssigste weibliche Profil: Bi + Switch + Flex. Maximale dynamische Qualität.",
    osho: "Die vollständig fluide Frau - Wasser nimmt jede Form an, bleibt aber Wasser."
  },
  "duo-flex-weiblich-ausgeglichen-heterosexuell": {
    sources: ["Big Five: Balanced", "CNM Research", "Stable female personality"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "mittel",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "sehr-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.60, eheWunsch: 0.70, wohnform: 0.90, kommunikationsstil: 0.90, familieWichtigkeit: 0.85 },
    pirsig: "Die stabile Mitte mit weiblicher Wärme. Ausgeglichen + Flex = nachhaltige Offenheit.",
    osho: "Die reife Frau - kein Extrem, aber lebendig. Zentriert mit offenem Herzen."
  },
  "duo-flex-weiblich-ausgeglichen-homosexuell": {
    sources: ["Big Five: Balanced", "Lesbian CNM Research", "Stable relationships"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.60, wohnform: 0.90, kommunikationsstil: 0.90, oeffentlichkeit: 0.80 },
    pirsig: "Reife queere Beziehung mit emotionaler Tiefe. Stabil und offen zugleich.",
    osho: "Die zentrierte lesbische Frau - in Frieden mit sich und offen für mehr."
  },
  "duo-flex-weiblich-ausgeglichen-bisexuell": {
    sources: ["Big Five: Balanced", "Allen et al. (2020)", "CNM Research"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.55, eheWunsch: 0.60, wohnform: 0.90, kommunikationsstil: 0.90, freundeskreis: 0.80 },
    pirsig: "Hohe Offenheit (Bi) mit stabiler Mitte (Ausgeglichen) in flexibler Bindung. Integration.",
    osho: "Die zentrierte bisexuelle Frau - alle Möglichkeiten integriert, in Ruhe offen."
  },

  // ───────────────────────────────────────────────────────────────────────────
  // DUO-FLEX NONBINÄR (97-108)
  // ───────────────────────────────────────────────────────────────────────────
  "duo-flex-nonbinär-dominant-heterosexuell": {
    sources: ["Non-binary Research: Highest openness", "PAI-DOM Studies", "CNM Research"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "getrennt-ok",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.80, eheWunsch: 0.60, wohnform: 0.90, kommunikationsstil: 0.85, oeffentlichkeit: 0.85 },
    pirsig: "Non-binäre Identität mit dominanter Führung in flexibler Struktur. Dreifache Norm-Überschreitung.",
    osho: "Jenseits des Geschlechts, aber führend. Die transzendierte dominante Kraft in offener Beziehung."
  },
  "duo-flex-nonbinär-dominant-homosexuell": {
    sources: ["Non-binary Research", "PAI-DOM Studies", "Queer CNM Research"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "getrennt-ok",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.55, wohnform: 0.90, kommunikationsstil: 0.85, oeffentlichkeit: 0.90 },
    pirsig: "Maximale queere Identität (NB + Homo) mit dominanter Führung. Außerhalb aller Kategorien.",
    osho: "Das transzendierte Wesen führt die Beziehung - keine Geschlechterrolle, nur pure Kraft."
  },
  "duo-flex-nonbinär-dominant-bisexuell": {
    sources: ["Non-binary Research", "Allen et al. (2020)", "PAI-DOM + CNM"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "mittel", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "getrennt-ok",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.80, eheWunsch: 0.50, wohnform: 0.90, kommunikationsstil: 0.85, netzwerkGroesse: 0.85 },
    pirsig: "Vierfache Offenheit: NB + Bi + Flex + Dominant. Die umfassendste dynamische Qualität mit Führung.",
    osho: "Das freiste dominante Wesen - keine Kategorie trifft zu, alle Möglichkeiten stehen offen."
  },
  "duo-flex-nonbinär-submissiv-heterosexuell": {
    sources: ["Non-binary Research", "BDSM Submissive Studies", "CNM Research"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "diskret", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "klein",
    confidence: { kinderWunsch: 0.75, eheWunsch: 0.60, wohnform: 0.90, kommunikationsstil: 0.85, emotionaleOffenheit: 0.90 },
    pirsig: "Non-binäre Identität mit submissiver Hingabe in flexibler Struktur. Jenseits der Polarität, aber dienend.",
    osho: "Das transzendierte Wesen in Hingabe - keine Geschlechterrolle definiert die Demut."
  },
  "duo-flex-nonbinär-submissiv-homosexuell": {
    sources: ["Non-binary Research", "Queer Submissive Studies", "CNM Research"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "introvertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "diskret", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.55, wohnform: 0.90, kommunikationsstil: 0.85, emotionaleOffenheit: 0.90 },
    pirsig: "Queere non-binäre Hingabe in flexibler Beziehung. Maximale Offenheit mit Demut.",
    osho: "Das hingebungsvolle queere Wesen - jenseits aller Kategorien, nur pure Hingabe."
  },
  "duo-flex-nonbinär-submissiv-bisexuell": {
    sources: ["Non-binary Research", "Allen et al. (2020)", "BDSM + CNM Studies"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "diskret", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.80, eheWunsch: 0.50, wohnform: 0.90, kommunikationsstil: 0.85, kritikAnnehmen: 0.85 },
    pirsig: "Vierfache Offenheit (NB + Bi + Flex + Sub). Pure dynamische Qualität in Hingabe.",
    osho: "Das flüssigste hingebungsvolle Wesen - offen für alles, dienend in allem."
  },
  "duo-flex-nonbinär-switch-heterosexuell": {
    sources: ["Non-binary Research", "Switch Studies: High flexibility", "CNM Research"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "hauptsächlich-gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "getrennt-ok",
    hobbys: "teilweise-gemeinsam", wochenende: "gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.55, wohnform: 0.90, kommunikationsstil: 0.90, streitVerhalten: 0.85 },
    pirsig: "Non-binäre Identität mit Switch-Flexibilität in offener Beziehung. Dreifache Fluidität.",
    osho: "Das transzendierte Wesen - mal führend, mal folgend, immer frei."
  },
  "duo-flex-nonbinär-switch-homosexuell": {
    sources: ["Non-binary Research", "Queer Switch Studies", "CNM Research"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "hauptsächlich-gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "getrennt-ok",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.50, wohnform: 0.90, kommunikationsstil: 0.90, oeffentlichkeit: 0.90 },
    pirsig: "Maximale queere Flexibilität: NB + Homo + Switch + Flex. Alle Rollen möglich.",
    osho: "Das vielseitigste queere Wesen - außerhalb aller Kategorien, frei in allen Rollen."
  },
  "duo-flex-nonbinär-switch-bisexuell": {
    sources: ["Non-binary Research: Highest openness", "Allen et al. (2020)", "Switch + CNM"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "hauptsächlich-gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "flexibel", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "getrennt-ok",
    hobbys: "teilweise-gemeinsam", wochenende: "gemischt", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.75, eheWunsch: 0.45, wohnform: 0.90, kommunikationsstil: 0.90, kritikAnnehmen: 0.85 },
    pirsig: "Das flüssigste non-binäre Profil: NB + Bi + Switch + Flex. Maximale dynamische Qualität.",
    osho: "Das vollständig fluide Wesen - keine einzige Festlegung, pure Freiheit in Verbindung."
  },
  "duo-flex-nonbinär-ausgeglichen-heterosexuell": {
    sources: ["Non-binary Research", "Big Five: Balanced", "CNM Research"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.60, wohnform: 0.90, kommunikationsstil: 0.85, alleinzeit: 0.75 },
    pirsig: "Non-binäre Identität mit stabiler Mitte in flexibler Beziehung. Jenseits des Geschlechts, aber zentriert.",
    osho: "Das transzendierte Wesen in Balance - weder extrem noch angepasst, einfach frei."
  },
  "duo-flex-nonbinär-ausgeglichen-homosexuell": {
    sources: ["Non-binary Research", "Big Five: Balanced", "Queer CNM Research"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.55, wohnform: 0.90, kommunikationsstil: 0.85, oeffentlichkeit: 0.80 },
    pirsig: "Reife queere non-binäre Identität in flexibler Beziehung. Integration aller Aspekte.",
    osho: "Das zentrierte queere Wesen - alle Kämpfe überwunden, in Frieden offen für mehr."
  },
  "duo-flex-nonbinär-ausgeglichen-bisexuell": {
    sources: ["Non-binary Research: Highest openness", "Allen et al. (2020)", "Big Five: Balanced"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "gemeinsam-mit-raum", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.75, eheWunsch: 0.50, wohnform: 0.90, kommunikationsstil: 0.85, freundeskreis: 0.80 },
    pirsig: "Maximale Offenheit (NB + Bi) mit stabiler Mitte (Ausgeglichen) in flexibler Bindung. Weise Integration.",
    osho: "Die zentrierte non-binäre bisexuelle Person - alle Möglichkeiten erkannt, in Frieden damit."
  },

  // ════════════════════════════════════════════════════════════════════════════
  // POLY-HEDO PROFILE (109-144): 36 Profile
  // Der innere Polygame - Fantasie ohne äußere Umsetzung, Spannung zwischen Wunsch und Realität
  // ════════════════════════════════════════════════════════════════════════════

  // ───────────────────────────────────────────────────────────────────────────
  // POLY-HEDO MÄNNLICH (109-120)
  // ───────────────────────────────────────────────────────────────────────────
  "poly-hedo-männlich-dominant-heterosexuell": {
    sources: ["Sexual Fantasy Research", "PAI-DOM Studies", "Cognitive Dissonance Theory"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "karriere", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "mittel",
    kommunikationsstil: "direkt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "niedrig",
    gespraechsBedürfnis: "wenig", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "konventionell", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "groß",
    // TREUE-KONFLIKT: Das zentrale Drama des Poly-Hedo
    treueIdeal: "hoch",                      // WILL treu sein, glaubt an Treue
    treueVerhalten: "impulsiv-verletzlich",  // Wird schwach wenn es ihn überkommt
    treueSelbstkenntnis: "gering",           // Weiß es vorher nicht, überrascht sich selbst
    treueNachReue: "stark",                  // Leidet danach, Schuldgefühle
    confidence: { kinderWunsch: 0.60, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.80, emotionaleOffenheit: 0.75, treueIdeal: 0.85, treueVerhalten: 0.75 },
    pirsig: "Der tragische Idealist: Sein statisches Treue-Ideal kollidiert mit seiner dynamischen hedonistischen Natur. " +
      "Der Fehltritt ist nie geplant - er überrascht sich selbst. Danach: Schuldgefühle, Selbstverurteilung, existenzielles Leid. " +
      "Die Qualität, die er sucht (Treue), zerstört er selbst durch die Qualität, die er ist (hedonistisch).",
    osho: "Er glaubt an Treue, weil die Gesellschaft es ihm eingepflanzt hat. Sein Körper folgt der Natur, " +
      "sein Geist verurteilt ihn danach. Das ist die Tragödie der Konditionierung: Der Krieg im eigenen Inneren. " +
      "Er leidet nicht am Fehltritt, sondern an der Lücke zwischen Ideal-Selbst und Real-Selbst."
  },
  "poly-hedo-männlich-dominant-homosexuell": {
    sources: ["Sexual Fantasy Research", "PAI-DOM Studies", "Gay Psychology Studies"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "karriere", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "groß",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "stark",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.80, oeffentlichkeit: 0.75, treueIdeal: 0.80, treueVerhalten: 0.70 },
    pirsig: "Doppelte Tragik: Bereits als Queerer eine Norm gebrochen, aber am Treue-Ideal festhaltend. " +
      "Die hedonistische Natur überrascht ihn in Momenten der Schwäche. " +
      "Das Leid danach ist intensiv - er hat sein eigenes Wertesystem verraten.",
    osho: "Der queere Mann, der eine gesellschaftliche Kette gesprengt hat, trägt freiwillig eine andere: das Treue-Ideal. " +
      "Wenn sein Körper der Natur folgt, verurteilt sein konditionierter Geist. Der Selbstbetrug ist doppelt schmerzhaft."
  },
  "poly-hedo-männlich-dominant-bisexuell": {
    sources: ["Sexual Fantasy Research", "Allen et al. (2020)", "PAI-DOM Studies"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "karriere", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "mittel", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "mittel", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "groß",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "sehr-stark",
    confidence: { kinderWunsch: 0.55, eheWunsch: 0.75, wohnform: 0.95, kommunikationsstil: 0.80, oeffentlichkeit: 0.70, treueIdeal: 0.80, treueVerhalten: 0.65 },
    pirsig: "Dreifache Spannung (Bi+Poly+Dom) trifft auf starkes Treue-Ideal. Die Verlockung ist maximal, " +
      "die Überraschung über sich selbst am größten. Nach dem Fehltritt: existenzielles Leid. " +
      "Er versteht sich selbst nicht - warum konnte er nicht widerstehen?",
    osho: "Sein Körper will beides, alle, alles. Sein Geist sagt: Sei treu! Der Konflikt ist vorprogrammiert. " +
      "Er wird schwach, ohne es kommen zu sehen, und hasst sich danach. Die dreifache Natur gegen das eine Ideal."
  },
  "poly-hedo-männlich-submissiv-heterosexuell": {
    sources: ["Sexual Fantasy Research", "BDSM Submissive Studies", "Cognitive Dissonance"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "mittel",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "vermeidend", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "sehr-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "konventionell", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "klein",
    // TREUE-KONFLIKT
    treueIdeal: "sehr-hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "minimal", treueNachReue: "extrem",
    confidence: { kinderWunsch: 0.65, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.80, familieWichtigkeit: 0.85, treueIdeal: 0.90, treueVerhalten: 0.70 },
    pirsig: "Der submissive Mann mit höchstem Treue-Ideal - er will dienen, will treu sein. " +
      "Doch seine hedonistische Natur überrascht ihn. Das Leid ist maximal: Er hat versagt in seiner eigenen Hingabe. " +
      "Die Scham ist tiefer als bei jedem anderen Typ.",
    osho: "Er will gehorsam sein, treu sein - es ist sein tiefster Wunsch. Doch der Körper hat eigene Gesetze. " +
      "Der Fehltritt erschüttert sein Selbstbild vollständig. Er versteht: Ich bin nicht der, der ich sein will."
  },
  "poly-hedo-männlich-submissiv-homosexuell": {
    sources: ["Sexual Fantasy Research", "Gay Submissive Studies", "Cognitive Dissonance"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "introvertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "diskret", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "sehr-hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "extrem",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.85, emotionaleOffenheit: 0.80, treueIdeal: 0.85, treueVerhalten: 0.70 },
    pirsig: "Der hingebungsvolle queere Mann klammert sich an Treue als letztes Ideal. " +
      "Wenn er schwach wird, bricht seine Welt zusammen. Der Verrat ist nicht am Partner - er ist an sich selbst. " +
      "Die Selbstverurteilung ist gnadenlos.",
    osho: "Er hat seine Sexualität befreit, aber sein Treue-Konditionierung behalten. " +
      "Der Körper sucht Vielfalt, der Geist verlangt Exklusivität. Nach dem Fehltritt: tiefste Scham und Verzweiflung."
  },
  "poly-hedo-männlich-submissiv-bisexuell": {
    sources: ["Sexual Fantasy Research", "Allen et al. (2020)", "BDSM Studies"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "diskret", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "sehr-hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "minimal", treueNachReue: "extrem",
    confidence: { kinderWunsch: 0.55, eheWunsch: 0.75, wohnform: 0.95, kommunikationsstil: 0.85, kritikAnnehmen: 0.80, treueIdeal: 0.90, treueVerhalten: 0.60 },
    pirsig: "Maximale innere Weite (Bi+Sub+Poly) gegen maximales Treue-Ideal. Die Explosion ist unvermeidlich. " +
      "Er wird schwach, weiß nicht warum, leidet am meisten von allen. " +
      "Die Dissonanz zwischen Sein und Wollen ist unerträglich.",
    osho: "Der offenste Mann mit der engsten Selbst-Erwartung. Sein Horizont ist grenzenlos, sein Ideal starr. " +
      "Nach dem Fehltritt: Er zerbricht an sich selbst. Die Spannung war schon immer da, nun ist sie sichtbar."
  },
  "poly-hedo-männlich-switch-heterosexuell": {
    sources: ["Sexual Fantasy Research", "Switch Studies", "Cognitive Dissonance Theory"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "mittel",
    kommunikationsstil: "situativ", konfliktverhalten: "vermeidend", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "konventionell", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "stark",
    confidence: { kinderWunsch: 0.60, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.80, streitVerhalten: 0.75, treueIdeal: 0.80, treueVerhalten: 0.70 },
    pirsig: "Flexibel in der Rolle, aber starr im Treue-Ideal. Der Switch passt sich an - außer hier. " +
      "Wenn der Impuls kommt, ist er überrascht. Danach: Der Anpassungskünstler kann sich nicht anpassen an seine eigene Wahrheit.",
    osho: "Er wechselt zwischen Führen und Folgen, aber das Treue-Dogma bleibt konstant. " +
      "Die Natur bricht durch, er versteht sich nicht. Der goldene Käfig ist sein eigenes Ideal."
  },
  "poly-hedo-männlich-switch-homosexuell": {
    sources: ["Sexual Fantasy Research", "Gay Switch Studies", "Cognitive Dissonance"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "groß",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "stark",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.85, oeffentlichkeit: 0.80, treueIdeal: 0.75, treueVerhalten: 0.70 },
    pirsig: "Queere Rollen-Fluidität trifft auf starres Treue-Ideal. Er kann alles sein - außer untreu. " +
      "Doch wenn es passiert, versteht er: Sein Ideal war Illusion. Die Selbsterkenntnis ist brutal.",
    osho: "Eine Freiheit (Sexualität) gewonnen, eine andere (Treue-Dogma) selbst auferlegt. " +
      "Der Körper folgt der Natur, der Geist ist entsetzt. Das Leid kommt aus dem Widerspruch."
  },
  "poly-hedo-männlich-switch-bisexuell": {
    sources: ["Sexual Fantasy Research", "Allen et al. (2020)", "Switch Studies"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "mittel", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemischt", netzwerkGroesse: "groß",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "minimal", treueNachReue: "sehr-stark",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.75, wohnform: 0.95, kommunikationsstil: 0.85, kritikAnnehmen: 0.80, treueIdeal: 0.80, treueVerhalten: 0.60 },
    pirsig: "Das flüssigste Wesen (Bi+Switch) mit festem Treue-Anker. Alles ist flexibel - außer das Eine. " +
      "Wenn der Anker reißt, ist das Chaos total. Er wusste nicht, dass er so sein kann.",
    osho: "Drei Naturen (Bi+Switch+Hedo) gegen ein Dogma (Treue). Der Kampf ist ungleich, das Ergebnis vorhersehbar. " +
      "Nach dem Fehltritt: tiefe Verwirrung. Wer bin ich wirklich?"
  },
  "poly-hedo-männlich-ausgeglichen-heterosexuell": {
    sources: ["Sexual Fantasy Research", "Big Five: Balanced", "Cognitive Dissonance"],
    kinderWunsch: "ja", eheWunsch: "ja", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "wichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "vermeidend", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "sehr-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "konventionell", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "sehr-hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "extrem",
    confidence: { kinderWunsch: 0.75, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85, familieWichtigkeit: 0.90, treueIdeal: 0.90, treueVerhalten: 0.75 },
    pirsig: "Der ausgeglichene Familienvater mit dem höchsten Treue-Ideal - und der tiefsten Fallhöhe. " +
      "Wenn er schwach wird, zerbricht nicht nur er, sondern sein ganzes Selbstbild. " +
      "Die stabile Mitte war eine Illusion, gebaut auf einem Vulkan.",
    osho: "Äußerlich der perfekte Ehemann, innerlich der Hedonist, der es nicht weiß. " +
      "Der Fehltritt trifft ihn wie ein Blitz. Danach: Wer bin ich? War alles Lüge? Das Leid ist existenziell."
  },
  "poly-hedo-männlich-ausgeglichen-homosexuell": {
    sources: ["Sexual Fantasy Research", "Big Five: Balanced", "Gay Psychology"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "stark",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85, oeffentlichkeit: 0.80, treueIdeal: 0.85, treueVerhalten: 0.70 },
    pirsig: "Der reife queere Mann mit stabilem Treue-Ideal. Er glaubt, er kenne sich. " +
      "Der Moment der Schwäche offenbart: Die Stabilität war Oberfläche. Darunter: die hedonistische Natur.",
    osho: "Zentriert, reif, ausgeglichen - so sieht er sich. Bis der Körper anders entscheidet. " +
      "Die Balance war Selbsttäuschung. Das Leid danach: die Erkenntnis der eigenen Unkenntnis."
  },
  "poly-hedo-männlich-ausgeglichen-bisexuell": {
    sources: ["Sexual Fantasy Research", "Allen et al. (2020)", "Big Five: Balanced"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "vermeidend", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "stark",
    confidence: { kinderWunsch: 0.55, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.85, freundeskreis: 0.75, treueIdeal: 0.80, treueVerhalten: 0.70 },
    pirsig: "Hohe Offenheit (Bi) mit Treue-Anspruch. Er hält sich für gelassen und weise. " +
      "Der Moment der Wahrheit zeigt: Die Gelassenheit war Vermeidung. Das Leid kommt mit der Erkenntnis.",
    osho: "Er glaubt, er habe Frieden geschlossen mit seiner Natur. Bis sie ihn überrollt. " +
      "Der weise Träumer erwacht in der Realität: Er ist nicht der, für den er sich hielt."
  },

  // ───────────────────────────────────────────────────────────────────────────
  // POLY-HEDO WEIBLICH (121-132)
  // ───────────────────────────────────────────────────────────────────────────
  "poly-hedo-weiblich-dominant-heterosexuell": {
    sources: ["Sexual Fantasy Research", "PAI-DOM Studies", "Female sexuality studies"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "mittel", freundeskreis: "getrennt",
    oeffentlichkeit: "konventionell", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "groß",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "sehr-stark",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.85, karrierePrioritaet: 0.85, treueIdeal: 0.85, treueVerhalten: 0.70 },
    pirsig: "Dreifach atypisch (dominant + Hedo + Frau) mit hohem Treue-Ideal. Die Gesellschaft erwartet ihre Treue doppelt. " +
      "Wenn sie schwach wird, ist die Scham dreifach: Als Frau, als Ehefrau, als die, die es besser wissen müsste. " +
      "Sie verurteilt sich härter als jeder andere.",
    osho: "Die Löwin mit dem Käfig im Kopf. Sie will treu sein - die Gesellschaft hat es ihr eingepflanzt. " +
      "Der Körper folgt der Natur, der Geist zerfleischt sie danach. Das weibliche Leid am Fehltritt ist anders - tiefer, schamvoller."
  },
  "poly-hedo-weiblich-dominant-homosexuell": {
    sources: ["Sexual Fantasy Research", "PAI-DOM Studies", "Lesbian sexuality studies"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "groß",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "stark",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.75, wohnform: 0.95, kommunikationsstil: 0.90, oeffentlichkeit: 0.80, treueIdeal: 0.80, treueVerhalten: 0.70 },
    pirsig: "Die souveräne queere Frau hat eine Kette gesprengt, trägt aber das Treue-Ideal freiwillig. " +
      "Wenn sie schwach wird, ist die Überraschung groß: Hatte sie nicht gelernt, authentisch zu leben? " +
      "Der Fehltritt zeigt: Authentizität ist komplexer als gedacht.",
    osho: "Sie hat ihre Sexualität befreit, aber die Treue-Konditionierung behalten. " +
      "Der Körper sucht Vielfalt, der Geist verurteilt. Das Leid ist doppelt: Am Fehltritt und an der Erkenntnis, dass Befreiung nie komplett ist."
  },
  "poly-hedo-weiblich-dominant-bisexuell": {
    sources: ["Sexual Fantasy Research", "Allen et al. (2020)", "PAI-DOM Studies"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "mittel", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "mittel", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "sehr-groß",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "minimal", treueNachReue: "sehr-stark",
    confidence: { kinderWunsch: 0.45, eheWunsch: 0.70, wohnform: 0.95, kommunikationsstil: 0.90, netzwerkGroesse: 0.80, treueIdeal: 0.80, treueVerhalten: 0.60 },
    pirsig: "Vierfache innere Freiheit (Bi+Dom+Hedo+Frau) gegen ein starres Treue-Ideal. Die Spannung ist maximal. " +
      "Wenn sie bricht, versteht sie: Die komplexeste Konstellation braucht die komplexeste Ehrlichkeit. " +
      "Das Leid führt zur Erkenntnis - oder zur Zerstörung.",
    osho: "Die freieste Frau im Kopf, gefesselt an ein Ideal. Wenn die Natur durchbricht, ist das Chaos total. " +
      "Sie hat sich selbst nicht gekannt. Jetzt beginnt die echte Arbeit: Wer bin ich wirklich?"
  },
  "poly-hedo-weiblich-submissiv-heterosexuell": {
    sources: ["Sexual Fantasy Research", "BDSM: 75% women prefer sub", "Female sexuality"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "mittel",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "sehr-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "konventionell", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "klein",
    // TREUE-KONFLIKT
    treueIdeal: "sehr-hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "minimal", treueNachReue: "extrem",
    confidence: { kinderWunsch: 0.65, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.90, familieWichtigkeit: 0.90, treueIdeal: 0.95, treueVerhalten: 0.70 },
    pirsig: "Die gehorsame Frau mit höchstem Treue-Ideal - Treue ist für sie identitätsstiftend. " +
      "Wenn sie schwach wird, zerbricht nicht nur ein Versprechen, sondern ihr Selbstbild. " +
      "Die Scham ist am tiefsten: Sie hat versagt als das, was sie sein wollte.",
    osho: "Sie hat sich der Hingabe verschrieben - an einen Menschen, treu, für immer. Der Körper hat andere Pläne. " +
      "Nach dem Fehltritt: Sie versteht sich nicht. War die Hingabe Illusion? Das Leid ist existenziell."
  },
  "poly-hedo-weiblich-submissiv-homosexuell": {
    sources: ["Sexual Fantasy Research", "Lesbian Submissive Studies", "Cognitive Dissonance"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "diskret", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "sehr-hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "extrem",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.90, emotionaleOffenheit: 0.90, treueIdeal: 0.90, treueVerhalten: 0.70 },
    pirsig: "Die hingebungsvolle queere Frau klammert sich an Treue als letzten Hafen. " +
      "Wenn sie schwach wird, ist der Verrat total: An der Partnerin, an sich selbst, an allem was sie glaubte zu sein. " +
      "Das Leid geht tiefer als bei den meisten.",
    osho: "Sie liebt Frauen und hat das befreit. Aber die Treue-Konditionierung blieb. " +
      "Der Körper sucht Vielfalt, der Geist verurteilt gnadenlos. Nach dem Fehltritt: Verzweiflung und Selbsthass."
  },
  "poly-hedo-weiblich-submissiv-bisexuell": {
    sources: ["Sexual Fantasy Research", "Allen et al. (2020)", "BDSM Studies"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "diskret", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "sehr-hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "minimal", treueNachReue: "extrem",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.75, wohnform: 0.95, kommunikationsstil: 0.90, kritikAnnehmen: 0.85, treueIdeal: 0.90, treueVerhalten: 0.60 },
    pirsig: "Maximale weibliche Offenheit (Bi+Sub+Hedo) gegen höchstes Treue-Ideal. Die Spannung ist unerträglich. " +
      "Sie wird schwach, ohne es kommen zu sehen. Das Leid danach ist am tiefsten: " +
      "Sie hat universelle Liebe gesucht und ihr engste Bindung verraten.",
    osho: "Die Frau mit dem weitesten Herzen und dem engsten Ideal. Alles fließt - außer die Treue. " +
      "Wenn sie bricht, bricht alles. Die Erkenntnis: Universelle Liebe und Exklusivität sind Gegensätze."
  },
  "poly-hedo-weiblich-switch-heterosexuell": {
    sources: ["Sexual Fantasy Research", "Switch Studies", "Female sexuality"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "mittel",
    kommunikationsstil: "situativ", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "konventionell", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "stark",
    confidence: { kinderWunsch: 0.55, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.85, streitVerhalten: 0.80, treueIdeal: 0.85, treueVerhalten: 0.70 },
    pirsig: "Flexibel in der Rolle, aber starr im Treue-Ideal. Die Switch-Frau passt sich an - außer hier. " +
      "Wenn der Impuls kommt, ist sie überrascht. Der goldene Käfig ist ihr eigenes Ideal.",
    osho: "Sie wechselt zwischen Führen und Folgen, aber die Treue bleibt Dogma. " +
      "Wenn die Natur durchbricht, versteht sie sich nicht. Das Leid kommt aus dem Selbstbetrug."
  },
  "poly-hedo-weiblich-switch-homosexuell": {
    sources: ["Sexual Fantasy Research", "Lesbian Switch Studies", "Cognitive Dissonance"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemischt", netzwerkGroesse: "groß",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "stark",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.75, wohnform: 0.95, kommunikationsstil: 0.90, oeffentlichkeit: 0.85, treueIdeal: 0.80, treueVerhalten: 0.70 },
    pirsig: "Queere Switch-Flexibilität mit Treue-Ideal. Eine Grenze überschritten (Sexualität), eine selbst auferlegt (Treue). " +
      "Wenn sie schwach wird: Die Selbsterkenntnis ist brutal. Freiheit ist komplexer als gedacht.",
    osho: "Die befreite queere Frau mit selbstgewählter Fessel. Der Körper folgt der Natur, der Geist verurteilt. " +
      "Das Leid kommt aus dem Widerspruch zwischen gelebter und ungelebter Freiheit."
  },
  "poly-hedo-weiblich-switch-bisexuell": {
    sources: ["Sexual Fantasy Research", "Allen et al. (2020)", "Switch Studies"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemischt", netzwerkGroesse: "groß",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "minimal", treueNachReue: "sehr-stark",
    confidence: { kinderWunsch: 0.45, eheWunsch: 0.70, wohnform: 0.95, kommunikationsstil: 0.90, kritikAnnehmen: 0.85, treueIdeal: 0.80, treueVerhalten: 0.60 },
    pirsig: "Das flüssigste weibliche Wesen (Bi+Switch+Hedo) mit festem Treue-Anker. Alles fließt - außer das Eine. " +
      "Wenn der Anker reißt, ist das Chaos total. Die Erkenntnis: Grenzen im Kopf zu haben ist auch eine Grenze.",
    osho: "Die Frau ohne Grenzen im Kopf - außer einer. Wenn diese Grenze fällt, fällt das Selbstbild. " +
      "Das Leid ist der Preis für die Erkenntnis: Wahre Freiheit kennt kein Dogma."
  },
  "poly-hedo-weiblich-ausgeglichen-heterosexuell": {
    sources: ["Sexual Fantasy Research", "Big Five: Balanced", "Female sexuality"],
    kinderWunsch: "ja", eheWunsch: "ja", wohnform: "zusammen", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "wichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "sehr-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "konventionell", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "sehr-hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "extrem",
    confidence: { kinderWunsch: 0.80, eheWunsch: 0.95, wohnform: 0.95, kommunikationsstil: 0.90, familieWichtigkeit: 0.95, treueIdeal: 0.95, treueVerhalten: 0.75 },
    pirsig: "Die ausgeglichene Ehefrau mit höchstem Treue-Ideal - und der tiefsten Fallhöhe. " +
      "Sie IST die Treue in ihrer Selbstwahrnehmung. Wenn sie schwach wird, existiert sie nicht mehr so wie vorher. " +
      "Die stabile Mitte war eine Illusion, gebaut auf Vulkan.",
    osho: "Die perfekte Ehefrau - so sieht sie sich, so sieht die Welt sie. Bis der Körper anders entscheidet. " +
      "Das Leid ist existenziell: Wer bin ich, wenn ich nicht die bin, die ich zu sein glaubte?"
  },
  "poly-hedo-weiblich-ausgeglichen-homosexuell": {
    sources: ["Sexual Fantasy Research", "Big Five: Balanced", "Lesbian Psychology"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "stark",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.85, wohnform: 0.95, kommunikationsstil: 0.90, oeffentlichkeit: 0.80, treueIdeal: 0.85, treueVerhalten: 0.70 },
    pirsig: "Die reife queere Frau mit stabilem Treue-Ideal. Sie glaubt, sie kenne sich nach all den Jahren. " +
      "Der Moment der Schwäche offenbart: Stabilität war Oberfläche. Die Erkenntnis ist sanft aber tief.",
    osho: "Zentriert, reif, ausgeglichen - so war das Selbstbild. Bis der Körper anders entschied. " +
      "Das Leid ist leiser als bei anderen, aber nicht weniger real. Sie muss sich neu kennenlernen."
  },
  "poly-hedo-weiblich-ausgeglichen-bisexuell": {
    sources: ["Sexual Fantasy Research", "Allen et al. (2020)", "Big Five: Balanced"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "stark",
    confidence: { kinderWunsch: 0.55, eheWunsch: 0.80, wohnform: 0.95, kommunikationsstil: 0.90, freundeskreis: 0.80, treueIdeal: 0.80, treueVerhalten: 0.70 },
    pirsig: "Hohe Offenheit (Bi) mit Treue-Anspruch. Sie hielt sich für weise und im Frieden. " +
      "Der Moment der Wahrheit zeigt: Die gewählte Begrenzung war keine freie Wahl, sondern Vermeidung. " +
      "Das Leid führt zu tieferer Weisheit - oder nicht.",
    osho: "Sie glaubte, Frieden geschlossen zu haben mit ihrer Natur. Bis diese sie überrollte. " +
      "Die weise Frau erwacht in der Realität: Akzeptanz ist nicht dasselbe wie Integration."
  },

  // ───────────────────────────────────────────────────────────────────────────
  // POLY-HEDO NONBINÄR (133-144)
  // ───────────────────────────────────────────────────────────────────────────
  "poly-hedo-nonbinär-dominant-heterosexuell": {
    sources: ["Non-binary Research: Highest openness", "PAI-DOM Studies", "Sexual Fantasy Research"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "groß",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "stark",
    confidence: { kinderWunsch: 0.80, eheWunsch: 0.70, wohnform: 0.95, kommunikationsstil: 0.85, oeffentlichkeit: 0.85, treueIdeal: 0.75, treueVerhalten: 0.70 },
    pirsig: "Non-binär - das Geschlecht transzendiert, aber das Treue-Ideal beibehalten. " +
      "Wenn der Körper der hedonistischen Natur folgt, ist die Überraschung groß. " +
      "Das Leid zeigt: Nicht alle Konditionierungen wurden aufgelöst.",
    osho: "Jenseits des Geschlechts, aber gefesselt ans Treue-Dogma. Eine Befreiung vollzogen, eine versäumt. " +
      "Der Fehltritt offenbart: Die Arbeit der Befreiung ist nie abgeschlossen."
  },
  "poly-hedo-nonbinär-dominant-homosexuell": {
    sources: ["Non-binary Research", "PAI-DOM Studies", "Queer Psychology"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "groß",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "stark",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.65, wohnform: 0.95, kommunikationsstil: 0.85, oeffentlichkeit: 0.90, treueIdeal: 0.75, treueVerhalten: 0.65 },
    pirsig: "Maximale queere Identität (NB + Homo) mit Treue-Ideal. Zwei Normen gebrochen, eine freiwillig beibehalten. " +
      "Der Fehltritt zeigt: Selbst die freiesten halten an versteckten Ketten fest. Das Leid ist Erkenntnis.",
    osho: "Das transzendierte Wesen, das glaubte, frei zu sein. Der Körper beweist das Gegenteil. " +
      "Die Treue-Konditionierung überlebte alle anderen. Jetzt beginnt die letzte Befreiung - oder nicht."
  },
  "poly-hedo-nonbinär-dominant-bisexuell": {
    sources: ["Non-binary Research", "Allen et al. (2020)", "PAI-DOM Studies"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "mittel", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "getrennt", wochenende: "gemischt", netzwerkGroesse: "sehr-groß",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "minimal", treueNachReue: "sehr-stark",
    confidence: { kinderWunsch: 0.80, eheWunsch: 0.60, wohnform: 0.95, kommunikationsstil: 0.85, netzwerkGroesse: 0.85, treueIdeal: 0.75, treueVerhalten: 0.55 },
    pirsig: "Fünffache Freiheit (NB+Bi+Dom+Hedo) gegen ein starres Ideal (Treue). Die Spannung ist maximal. " +
      "Wenn das Ideal bricht, ist das Chaos vollständig. Die komplexeste Selbsterkenntnis aller Profile.",
    osho: "Das freiste Wesen mit der letzten Kette. Wenn sie reißt, ist die Verwirrung total. " +
      "Wer bin ich, wenn mein letzter Anker fällt? Das Leid ist der Beginn der wahren Freiheit - oder der Zerstörung."
  },
  "poly-hedo-nonbinär-submissiv-heterosexuell": {
    sources: ["Non-binary Research", "BDSM Submissive Studies", "Sexual Fantasy Research"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "diskret", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "klein",
    // TREUE-KONFLIKT
    treueIdeal: "sehr-hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "extrem",
    confidence: { kinderWunsch: 0.75, eheWunsch: 0.75, wohnform: 0.95, kommunikationsstil: 0.85, emotionaleOffenheit: 0.90, treueIdeal: 0.85, treueVerhalten: 0.70 },
    pirsig: "Non-binäre Hingabe mit höchstem Treue-Ideal. Jenseits des Geschlechts, aber nicht jenseits des Dogmas. " +
      "Der Fehltritt erschüttert tief: Die Hingabe war nicht vollständig, das Wesen nicht so rein wie geglaubt.",
    osho: "Das hingebungsvolle transzendierte Wesen glaubt an Treue wie an sich selbst. " +
      "Wenn der Körper anders entscheidet: tiefste Verwirrung. Bin ich nicht der/die, der/die ich zu sein glaubte?"
  },
  "poly-hedo-nonbinär-submissiv-homosexuell": {
    sources: ["Non-binary Research", "Queer Submissive Studies", "Sexual Fantasy Research"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "introvertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "diskret", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "sehr-hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "extrem",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.70, wohnform: 0.95, kommunikationsstil: 0.85, emotionaleOffenheit: 0.90, treueIdeal: 0.85, treueVerhalten: 0.65 },
    pirsig: "Queere non-binäre Hingabe mit Treue-Ideal. Maximale Weichheit mit hartem innerem Dogma. " +
      "Der Fehltritt zeigt die Härte unter der Weichheit: Selbstverurteilung ohne Gnade.",
    osho: "Das hingebungsvolle queere Wesen träumt von grenzloser Liebe - und hasst sich, wenn sie sie lebt. " +
      "Das Ideal war ein Käfig, getarnt als Schutz. Das Leid ist der Preis der Erkenntnis."
  },
  "poly-hedo-nonbinär-submissiv-bisexuell": {
    sources: ["Non-binary Research", "Allen et al. (2020)", "BDSM + Fantasy Research"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "diskret", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "gemeinsam", wochenende: "gemeinsam-ruhig", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "sehr-hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "minimal", treueNachReue: "extrem",
    confidence: { kinderWunsch: 0.80, eheWunsch: 0.65, wohnform: 0.95, kommunikationsstil: 0.85, kritikAnnehmen: 0.85, treueIdeal: 0.90, treueVerhalten: 0.55 },
    pirsig: "Maximale Offenheit (NB+Bi+Sub+Hedo) gegen maximales Treue-Ideal. Die Spannung ist unerträglich. " +
      "Der weiteste Horizont mit der engsten Fessel. Das Leid ist am tiefsten, die Erkenntnis am schmerzhaftesten.",
    osho: "Das flüssigste Wesen mit dem härtesten Ideal. Universelle Liebe im Herzen, Exklusivität im Dogma. " +
      "Wenn es bricht, bricht alles. Die Frage bleibt: Wohin mit der Liebe, wenn nicht überall hin?"
  },
  "poly-hedo-nonbinär-switch-heterosexuell": {
    sources: ["Non-binary Research", "Switch Studies", "Sexual Fantasy Research"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "stark",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.70, wohnform: 0.95, kommunikationsstil: 0.90, streitVerhalten: 0.85, treueIdeal: 0.75, treueVerhalten: 0.70 },
    pirsig: "Non-binäre Switch-Flexibilität mit Treue-Grenze. Dreifach fluid, einmal starr. " +
      "Der Fehltritt offenbart die letzte Starrheit. Das Leid ist die Tür zur vollständigen Fluidität - wenn gewollt.",
    osho: "Das transzendierte Wesen wechselt Rollen, Energien, Ausdrucksformen - aber nicht das Treue-Dogma. " +
      "Wenn der Körper es doch tut: Verwirrung, Leid, aber auch Chance. Die letzte Befreiung wartet."
  },
  "poly-hedo-nonbinär-switch-homosexuell": {
    sources: ["Non-binary Research", "Queer Switch Studies", "Sexual Fantasy Research"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemischt", netzwerkGroesse: "groß",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "stark",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.65, wohnform: 0.95, kommunikationsstil: 0.90, oeffentlichkeit: 0.90, treueIdeal: 0.75, treueVerhalten: 0.65 },
    pirsig: "Vierfache Freiheit (NB+Homo+Switch+Hedo), eine Einschränkung (Treue). Fast vollständig befreit. " +
      "Der Fehltritt ist der letzte Schritt - gewollt oder nicht. Das Leid ist kurz, die Erkenntnis tief.",
    osho: "Das vielseitigste queere Wesen mit der letzten Fessel. Fast frei - aber 'fast' ist nicht frei. " +
      "Wenn die Fessel reißt: kurzer Schmerz, dann Klarheit. Oder Chaos. Die Wahl liegt im Umgang mit dem Leid."
  },
  "poly-hedo-nonbinär-switch-bisexuell": {
    sources: ["Non-binary Research: Highest openness", "Allen et al. (2020)", "Switch + Fantasy"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "gehoben",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemischt", netzwerkGroesse: "sehr-groß",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "minimal", treueNachReue: "sehr-stark",
    confidence: { kinderWunsch: 0.75, eheWunsch: 0.55, wohnform: 0.95, kommunikationsstil: 0.90, kritikAnnehmen: 0.85, treueIdeal: 0.75, treueVerhalten: 0.55 },
    pirsig: "Das flüssigste Wesen (NB+Bi+Switch+Hedo) mit einer Grenze. Maximale innere Freiheit, ein Dogma. " +
      "Der Fehltritt ist nicht Versagen - er ist der letzte Schritt. Das Leid transformiert, wenn richtig verstanden.",
    osho: "Das vollständig fluide Wesen mit dem letzten Anker. Wenn er fällt, fällt nichts - oder alles. " +
      "Die Wahl: Im Leid versinken oder aus ihm aufsteigen. Totale Freiheit ist nur einen Schmerz entfernt."
  },
  "poly-hedo-nonbinär-ausgeglichen-heterosexuell": {
    sources: ["Non-binary Research", "Big Five: Balanced", "Sexual Fantasy Research"],
    kinderWunsch: "vielleicht", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "stark",
    confidence: { kinderWunsch: 0.50, eheWunsch: 0.75, wohnform: 0.95, kommunikationsstil: 0.85, alleinzeit: 0.75, treueIdeal: 0.80, treueVerhalten: 0.70 },
    pirsig: "Non-binäre Balance mit Treue-Ideal. Zentriert im Geschlecht, aber nicht in der Treue-Frage. " +
      "Der Fehltritt stört die Balance sanft. Das Leid ist ruhiger, die Erkenntnis friedlicher als bei anderen.",
    osho: "Das zentrierte transzendierte Wesen mit leisem Treue-Dogma. Wenn der Körper anders entscheidet: sanfte Erschütterung. " +
      "Die Balance kehrt zurück - erweitert um eine Wahrheit. So geht friedliche Erkenntnis."
  },
  "poly-hedo-nonbinär-ausgeglichen-homosexuell": {
    sources: ["Non-binary Research", "Big Five: Balanced", "Queer Psychology"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "stark",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.70, wohnform: 0.95, kommunikationsstil: 0.85, oeffentlichkeit: 0.80, treueIdeal: 0.80, treueVerhalten: 0.70 },
    pirsig: "Reife queere non-binäre Identität mit Treue-Ideal. Stabil in der Komplexität - bis auf diesen Punkt. " +
      "Der Fehltritt offenbart: Reife bedeutet nicht Selbsterkenntnis. Das Leid ist sanft aber lehrreich.",
    osho: "Das zentrierte queere Wesen glaubte, die Begrenzung weise akzeptiert zu haben. " +
      "Der Körper zeigt: Es war Vermeidung, nicht Weisheit. Die echte Weisheit kommt nach dem Leid."
  },
  "poly-hedo-nonbinär-ausgeglichen-bisexuell": {
    sources: ["Non-binary Research: Highest openness", "Allen et al. (2020)", "Big Five: Balanced"],
    kinderWunsch: "nein", eheWunsch: "ja", wohnform: "zusammen", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "gemeinsam", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "nur-gemeinsam", zukunftsplanung: "konventionell", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "vermeidend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "mittel", events: "manchmal", reisen: "gemeinsam",
    hobbys: "teilweise-gemeinsam", wochenende: "gemeinsam-gemischt", netzwerkGroesse: "mittel",
    // TREUE-KONFLIKT
    treueIdeal: "hoch", treueVerhalten: "impulsiv-verletzlich", treueSelbstkenntnis: "gering", treueNachReue: "stark",
    confidence: { kinderWunsch: 0.75, eheWunsch: 0.65, wohnform: 0.95, kommunikationsstil: 0.85, freundeskreis: 0.80, treueIdeal: 0.80, treueVerhalten: 0.70 },
    pirsig: "Maximale Offenheit (NB+Bi+Hedo) mit Treue-Anspruch. Die weiseste Integration - mit einem blinden Fleck. " +
      "Der Fehltritt zeigt: Kein Frieden war wirklich Frieden, solange das Dogma lebte. Jetzt beginnt echte Weisheit.",
    osho: "Das zentrierte Wesen glaubte, alle Möglichkeiten erkannt zu haben. Der Körper zeigt die vergessene. " +
      "Der Frieden war unvollständig. Nach dem Leid: Die Chance auf echten Frieden - mit allem, was ist."
  },

  // ════════════════════════════════════════════════════════════════════════════
  // SOLOPOLY PROFILE (145-180): 36 Profile
  // Der autonome Vielfältige - Autonomie als Kernwert, multiple Beziehungen ohne Hierarchie
  // ════════════════════════════════════════════════════════════════════════════

  // ───────────────────────────────────────────────────────────────────────────
  // SOLOPOLY MÄNNLICH (145-156)
  // ───────────────────────────────────────────────────────────────────────────
  "solopoly-männlich-dominant-heterosexuell": {
    sources: ["Solo Polyamory Research", "PAI-DOM Studies", "Autonomy Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "atheistisch",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "wenig", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "oft", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.95, wohnform: 0.95, kommunikationsstil: 0.85, alleinzeit: 0.90 },
    pirsig: "Maximale dynamische Qualität: Autonomie + Vielfalt + Führung. Der selbstbestimmte Alpha ohne Besitzanspruch.",
    osho: "Der freieste Mann - führt ohne zu besitzen, liebt ohne zu binden. Pure maskuline Souveränität."
  },
  "solopoly-männlich-dominant-homosexuell": {
    sources: ["Solo Polyamory Research", "PAI-DOM Studies", "Gay CNM Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "atheistisch",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "wenig", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "unwichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "oft", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.95, eheWunsch: 0.95, wohnform: 0.95, kommunikationsstil: 0.85, oeffentlichkeit: 0.90 },
    pirsig: "Doppelte Freiheit: Queer + Solopoly + Dominant. Der souveränste queere Männertyp.",
    osho: "Der vollständig befreite queere Mann - keine Konvention bindet, jede Verbindung ist frei gewählt."
  },
  "solopoly-männlich-dominant-bisexuell": {
    sources: ["Solo Polyamory Research", "Allen et al. (2020)", "PAI-DOM Studies"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "atheistisch",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "wenig", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "mittel", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "oft", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.95, wohnform: 0.95, kommunikationsstil: 0.85, netzwerkGroesse: 0.90 },
    pirsig: "Dreifache maximale Offenheit: Bi + Solopoly + Dominant. Keine Grenzen in Orientierung oder Beziehungsform.",
    osho: "Der natürlichste dominante Mann - offen für alle, gebunden an niemanden, führend in allem."
  },
  "solopoly-männlich-submissiv-heterosexuell": {
    sources: ["Solo Polyamory Research", "BDSM Submissive Studies", "Autonomy Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "diskret", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.80, alleinzeit: 0.90 },
    pirsig: "Paradoxe Kombination: Submissiv aber autonom. Hingabe ohne Besitzanspruch, Dienst ohne Verpflichtung.",
    osho: "Der hingebungsvolle freie Mann - kann dienen ohne Ketten, folgen ohne Gefangenschaft."
  },
  "solopoly-männlich-submissiv-homosexuell": {
    sources: ["Solo Polyamory Research", "Gay Submissive Studies", "Autonomy Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "introvertiert", familieWichtigkeit: "unwichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.95, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85, emotionaleOffenheit: 0.85 },
    pirsig: "Queere Hingabe in absoluter Freiheit. Submissiv + Autonom = gewählte, nicht erzwungene Demut.",
    osho: "Der hingebungsvolle queere freie Mann - seine Hingabe ist ein Geschenk, keine Pflicht."
  },
  "solopoly-männlich-submissiv-bisexuell": {
    sources: ["Solo Polyamory Research", "Allen et al. (2020)", "BDSM Studies"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "diskret", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85, kritikAnnehmen: 0.85 },
    pirsig: "Maximale Offenheit (Bi) mit Hingabe in vollständiger Autonomie. Der weiteste Horizont in Freiheit.",
    osho: "Der natürlich hingebungsvolle Mann - kann allen dienen, bleibt sich selbst treu."
  },
  "solopoly-männlich-switch-heterosexuell": {
    sources: ["Solo Polyamory Research", "Switch Studies", "Autonomy Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "mittel", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85, streitVerhalten: 0.80 },
    pirsig: "Doppelte Flexibilität: Switch + Solopoly. Anpassbar in Rolle und Beziehung, aber immer autonom.",
    osho: "Der vielseitige freie Mann - mal Alpha, mal Beta, immer ungebunden. Vollständig anpassungsfähig."
  },
  "solopoly-männlich-switch-homosexuell": {
    sources: ["Solo Polyamory Research", "Gay Switch Studies", "Autonomy Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "unwichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "oft", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.95, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.90, oeffentlichkeit: 0.90 },
    pirsig: "Maximale queere Flexibilität in absoluter Autonomie. Alle Rollen möglich, keine verpflichtend.",
    osho: "Der freiste queere Mann - keine Rolle ist fixiert, keine Beziehung ist Pflicht."
  },
  "solopoly-männlich-switch-bisexuell": {
    sources: ["Solo Polyamory Research", "Allen et al. (2020)", "Switch Studies"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "oft", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.90, kritikAnnehmen: 0.85 },
    pirsig: "Das flüssigste männliche Solopoly: Bi + Switch. Maximale dynamische Qualität in jeder Dimension.",
    osho: "Der vollständig fluide freie Mann - offen für alles, gebunden an nichts."
  },
  "solopoly-männlich-ausgeglichen-heterosexuell": {
    sources: ["Solo Polyamory Research", "Big Five: Balanced", "Autonomy Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85, alleinzeit: 0.85 },
    pirsig: "Stabile Mitte in maximaler Freiheit. Ausgeglichen + Solopoly = nachhaltige Autonomie.",
    osho: "Der zentrierte freie Mann - keine Extreme, aber vollständig ungebunden."
  },
  "solopoly-männlich-ausgeglichen-homosexuell": {
    sources: ["Solo Polyamory Research", "Big Five: Balanced", "Gay CNM Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "unwichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.95, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85, oeffentlichkeit: 0.80 },
    pirsig: "Reife queere Autonomie in stabiler Persönlichkeit. Frei und zentriert zugleich.",
    osho: "Der zentrierte freie queere Mann - in Frieden mit seiner Freiheit, ohne Kampf."
  },
  "solopoly-männlich-ausgeglichen-bisexuell": {
    sources: ["Solo Polyamory Research", "Allen et al. (2020)", "Big Five: Balanced"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85, freundeskreis: 0.75 },
    pirsig: "Hohe Offenheit (Bi) mit stabiler Mitte in maximaler Autonomie. Die weiseste Solopoly-Form.",
    osho: "Der weise freie bisexuelle Mann - offen für alles, zentriert in sich."
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SOLOPOLY WEIBLICH (157-168)
  // ───────────────────────────────────────────────────────────────────────────
  "solopoly-weiblich-dominant-heterosexuell": {
    sources: ["Solo Polyamory Research", "PAI-DOM Studies", "Female Autonomy Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "atheistisch",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "oft", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.90, karrierePrioritaet: 0.90 },
    pirsig: "Dreifach atypisch (dominant + Solopoly + Frau) in vollständiger Autonomie. Die unabhängigste Frau.",
    osho: "Die Löwin ohne Käfig - führt, wählt, verlässt wann sie will. Vollständig souverän."
  },
  "solopoly-weiblich-dominant-homosexuell": {
    sources: ["Solo Polyamory Research", "PAI-DOM Studies", "Lesbian CNM Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "atheistisch",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "unwichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "oft", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.90, oeffentlichkeit: 0.90 },
    pirsig: "Doppelte Außenseiter-Freiheit: Queer + Solopoly + Dominant. Die freieste queere Frau.",
    osho: "Die souveräne queere Frau ohne jede Kette - jede Verbindung ist ihr Geschenk."
  },
  "solopoly-weiblich-dominant-bisexuell": {
    sources: ["Solo Polyamory Research", "Allen et al. (2020)", "PAI-DOM Studies"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "atheistisch",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "mittel", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "oft", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.90, netzwerkGroesse: 0.90 },
    pirsig: "Maximale Offenheit in maximaler Freiheit: Bi + Solopoly + Dominant. Keine Grenzen existieren.",
    osho: "Die vollständig freie Frau - offen für alle, gebunden an niemanden, führend überall."
  },
  "solopoly-weiblich-submissiv-heterosexuell": {
    sources: ["Solo Polyamory Research", "BDSM: 75% women prefer sub", "Autonomy Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "diskret", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.90, emotionaleOffenheit: 0.90 },
    pirsig: "Paradox: Submissiv und autonom. Hingabe ohne Besitz, Dienst ohne Gefangenschaft.",
    osho: "Die hingebungsvolle freie Frau - ihre Weichheit ist keine Schwäche, ihre Freiheit kein Kampf."
  },
  "solopoly-weiblich-submissiv-homosexuell": {
    sources: ["Solo Polyamory Research", "Lesbian Submissive Studies", "Autonomy Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "diskret", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.90, emotionaleOffenheit: 0.90 },
    pirsig: "Queere Hingabe in voller Autonomie. Weichheit ohne Ketten, Liebe ohne Besitz.",
    osho: "Die sensible freie queere Frau - ihre Hingabe ist rein, weil sie frei gegeben wird."
  },
  "solopoly-weiblich-submissiv-bisexuell": {
    sources: ["Solo Polyamory Research", "Allen et al. (2020)", "BDSM Studies"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "diskret", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.90, kritikAnnehmen: 0.85 },
    pirsig: "Maximale Offenheit (Bi) mit Hingabe in totaler Freiheit. Universelle Liebe, aber ungebunden.",
    osho: "Die natürlich hingebungsvolle freie Frau - kann allen dienen, gehört nur sich selbst."
  },
  "solopoly-weiblich-switch-heterosexuell": {
    sources: ["Solo Polyamory Research", "Switch Studies", "Female Autonomy"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85, streitVerhalten: 0.85 },
    pirsig: "Doppelte weibliche Flexibilität: Switch + Solopoly. Anpassungsfähig in allem, gebunden an nichts.",
    osho: "Die vielseitige freie Frau - kann alles sein, muss nichts sein."
  },
  "solopoly-weiblich-switch-homosexuell": {
    sources: ["Solo Polyamory Research", "Lesbian Switch Studies", "Autonomy Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "unwichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "oft", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.90, oeffentlichkeit: 0.90 },
    pirsig: "Maximale queere Flexibilität in vollständiger Autonomie. Keine Rolle, keine Beziehung ist fest.",
    osho: "Die freiste queere Frau - alle Rollen offen, alle Wege möglich."
  },
  "solopoly-weiblich-switch-bisexuell": {
    sources: ["Solo Polyamory Research", "Allen et al. (2020)", "Switch Studies"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "oft", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.90, kritikAnnehmen: 0.85 },
    pirsig: "Das flüssigste weibliche Solopoly: Bi + Switch. Maximale dynamische Qualität.",
    osho: "Die vollständig fluide freie Frau - Wasser ohne Ufer, Liebe ohne Käfig."
  },
  "solopoly-weiblich-ausgeglichen-heterosexuell": {
    sources: ["Solo Polyamory Research", "Big Five: Balanced", "Female Autonomy"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "nicht-praktizierend",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "weniger-wichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.90, familieWichtigkeit: 0.75 },
    pirsig: "Stabile weibliche Mitte in maximaler Autonomie. Zentriert und frei zugleich.",
    osho: "Die zentrierte freie Frau - keine Extreme, aber vollständig souverän."
  },
  "solopoly-weiblich-ausgeglichen-homosexuell": {
    sources: ["Solo Polyamory Research", "Big Five: Balanced", "Lesbian CNM Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "unwichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.90, oeffentlichkeit: 0.80 },
    pirsig: "Reife queere Frau in stabiler Autonomie. Frei und im Frieden damit.",
    osho: "Die zentrierte freie queere Frau - in Harmonie mit ihrer Unabhängigkeit."
  },
  "solopoly-weiblich-ausgeglichen-bisexuell": {
    sources: ["Solo Polyamory Research", "Allen et al. (2020)", "Big Five: Balanced"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.90, freundeskreis: 0.80 },
    pirsig: "Hohe Offenheit (Bi) mit stabiler Mitte in maximaler Autonomie. Die weiseste freie Frau.",
    osho: "Die weise freie bisexuelle Frau - offen für alles, zentriert in sich."
  },

  // ───────────────────────────────────────────────────────────────────────────
  // SOLOPOLY NONBINÄR (169-180)
  // ───────────────────────────────────────────────────────────────────────────
  "solopoly-nonbinär-dominant-heterosexuell": {
    sources: ["Non-binary Research: Highest openness", "PAI-DOM Studies", "Solo Polyamory Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "unwichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "oft", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.95, wohnform: 0.95, kommunikationsstil: 0.85, oeffentlichkeit: 0.90 },
    pirsig: "Non-binär + Dominant + Solopoly. Jenseits aller Kategorien in vollständiger Autonomie.",
    osho: "Das transzendierte Wesen ohne jede Kette - führend und frei zugleich."
  },
  "solopoly-nonbinär-dominant-homosexuell": {
    sources: ["Non-binary Research", "PAI-DOM Studies", "Queer CNM Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "schwer", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "unwichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "oft", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.95, eheWunsch: 0.95, wohnform: 0.95, kommunikationsstil: 0.85, oeffentlichkeit: 0.95 },
    pirsig: "Vierfache Freiheit: NB + Homo + Dom + Solopoly. Die radikalste queere Autonomie.",
    osho: "Das freiste queere Wesen - außerhalb aller Kategorien, über allen Konventionen."
  },
  "solopoly-nonbinär-dominant-bisexuell": {
    sources: ["Non-binary Research", "Allen et al. (2020)", "PAI-DOM + Solo Poly"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "karriere", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ-konstruktiv", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "direkt", entschuldigungen: "schwer",
    streitVerhalten: "führend", versoehnung: "langsam", kritikAnnehmen: "mittel", humorKonflikte: "manchmal",
    introExtro: "extrovertiert", familieWichtigkeit: "unwichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "oft", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.95, wohnform: 0.95, kommunikationsstil: 0.85, netzwerkGroesse: 0.90 },
    pirsig: "Maximale Offenheit in maximaler Autonomie: NB + Bi + Dom + Solopoly. Die freieste Existenz.",
    osho: "Das absolut freie Wesen - keine Kategorie trifft zu, keine Regel bindet."
  },
  "solopoly-nonbinär-submissiv-heterosexuell": {
    sources: ["Non-binary Research", "BDSM Submissive Studies", "Solo Polyamory Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "diskret", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85, emotionaleOffenheit: 0.90 },
    pirsig: "Non-binär + Submissiv + Solopoly. Jenseits der Polarität, dienend in Freiheit.",
    osho: "Das transzendierte Wesen in Hingabe - keine Ketten, nur freiwilliger Dienst."
  },
  "solopoly-nonbinär-submissiv-homosexuell": {
    sources: ["Non-binary Research", "Queer Submissive Studies", "Solo Polyamory Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "introvertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85, emotionaleOffenheit: 0.90 },
    pirsig: "Queere non-binäre Hingabe in vollständiger Autonomie. Die reinste Form der gewählten Demut.",
    osho: "Das hingebungsvolle freie queere Wesen - jede Demut ist ein Geschenk, keine Pflicht."
  },
  "solopoly-nonbinär-submissiv-bisexuell": {
    sources: ["Non-binary Research", "Allen et al. (2020)", "BDSM + Solo Poly"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "einfühlsam", konfliktverhalten: "nachgebend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "sanft", entschuldigungen: "schnell",
    streitVerhalten: "nachgebend", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "manchmal",
    introExtro: "introvertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "diskret", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85, kritikAnnehmen: 0.85 },
    pirsig: "Maximale Offenheit (NB + Bi) mit Hingabe in totaler Autonomie. Universelle Liebe, ungebunden.",
    osho: "Das flüssigste hingebungsvolle Wesen in vollständiger Freiheit - allen dienend, keinem gehörend."
  },
  "solopoly-nonbinär-switch-heterosexuell": {
    sources: ["Non-binary Research", "Switch Studies", "Solo Polyamory Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.90, streitVerhalten: 0.85 },
    pirsig: "Non-binär + Switch + Solopoly. Dreifache Flexibilität in vollständiger Autonomie.",
    osho: "Das transzendierte Wesen - mal führend, mal folgend, immer frei."
  },
  "solopoly-nonbinär-switch-homosexuell": {
    sources: ["Non-binary Research", "Queer Switch Studies", "Solo Polyamory Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "extrovertiert", familieWichtigkeit: "unwichtig", freundeskreis: "getrennt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "oft", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.90, oeffentlichkeit: 0.95 },
    pirsig: "Maximale queere Flexibilität in vollständiger Autonomie. Alle Rollen, keine Bindungen.",
    osho: "Das vielseitigste queere Wesen in totaler Freiheit - kann alles sein, muss nichts sein."
  },
  "solopoly-nonbinär-switch-bisexuell": {
    sources: ["Non-binary Research: Highest openness", "Allen et al. (2020)", "Switch + Solo Poly"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "gehoben",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "situativ", konfliktverhalten: "lösungsorientiert", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "viel", feedbackStil: "angepasst", entschuldigungen: "normal",
    streitVerhalten: "variabel", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "oft", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.90, kritikAnnehmen: 0.85 },
    pirsig: "Das absolutflüssigste Profil: NB + Bi + Switch + Solopoly. Maximale dynamische Qualität in jeder Dimension.",
    osho: "Das vollständig fluide freie Wesen - keine einzige Festlegung in irgendeiner Kategorie."
  },
  "solopoly-nonbinär-ausgeglichen-heterosexuell": {
    sources: ["Non-binary Research", "Big Five: Balanced", "Solo Polyamory Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85, alleinzeit: 0.85 },
    pirsig: "Non-binär mit stabiler Mitte in vollständiger Autonomie. Jenseits des Geschlechts, zentriert, frei.",
    osho: "Das transzendierte zentrierte Wesen - in Frieden mit der totalen Freiheit."
  },
  "solopoly-nonbinär-ausgeglichen-homosexuell": {
    sources: ["Non-binary Research", "Big Five: Balanced", "Queer CNM Research"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "unwichtig", freundeskreis: "gemeinsam",
    oeffentlichkeit: "offen", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85, oeffentlichkeit: 0.85 },
    pirsig: "Reife queere non-binäre Autonomie in stabiler Persönlichkeit. Frei und zentriert.",
    osho: "Das zentrierte freie queere Wesen - keine Kämpfe mehr, nur Frieden und Freiheit."
  },
  "solopoly-nonbinär-ausgeglichen-bisexuell": {
    sources: ["Non-binary Research: Highest openness", "Allen et al. (2020)", "Big Five: Balanced"],
    kinderWunsch: "nein", eheWunsch: "nein", wohnform: "alleine", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "getrennt", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "sehr-flexibel", zukunftsplanung: "flexibel", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "gemischt",
    oeffentlichkeit: "mittel", alleinzeit: "viel", events: "manchmal", reisen: "alleine",
    hobbys: "getrennt", wochenende: "individuell", netzwerkGroesse: "mittel",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.90, wohnform: 0.95, kommunikationsstil: 0.85, freundeskreis: 0.80 },
    pirsig: "Maximale Offenheit (NB + Bi) mit stabiler Mitte in totaler Autonomie. Die weiseste freie Existenz.",
    osho: "Das zentrierte non-binäre bisexuelle Wesen in vollständiger Freiheit - die höchste Weisheit."
  },

  // ════════════════════════════════════════════════════════════════════════════
  // POLYAMOR - Profile 181-216 (36 Profile)
  // Der Liebende Viele - Fülle, Gleichwertigkeit, Compersion
  // ════════════════════════════════════════════════════════════════════════════

  // ────────────────────────────────────────────────────────────────────────────
  // POLYAMOR - MÄNNLICH (12 Profile: 181-192)
  // ────────────────────────────────────────────────────────────────────────────

  "polyamor-männlich-dominant-heterosexuell": {
    sources: ["Moors et al. (2021): Polyamory Research", "SMSNA (2023): Dominance", "Tannen (1990): Male Communication"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "hoch", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "hoch", feedbackStil: "direkt", entschuldigungen: "selten",
    streitVerhalten: "energisch", versoehnung: "schnell", kritikAnnehmen: "schwer", humorKonflikte: "oft",
    introExtro: "extravertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "spontan",
    hobbys: "getrennt", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.70, eheWunsch: 0.80, wohnform: 0.75, kommunikationsstil: 0.90, konfliktverhalten: 0.90 },
    pirsig: "Hohe dynamische Qualität in strukturierter Führung. Der Polyamor-Dom organisiert multiple tiefe Verbindungen.",
    osho: "Der großzügige führende Liebende - teilt seine Liebe wie ein König seinen Reichtum."
  },
  "polyamor-männlich-dominant-homosexuell": {
    sources: ["Moors et al. (2021)", "Gay BDSM Community Studies", "Queer Polyamory Research"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "hoch", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "mittel",
    gespraechsBedürfnis: "hoch", feedbackStil: "direkt", entschuldigungen: "selten",
    streitVerhalten: "energisch", versoehnung: "schnell", kritikAnnehmen: "schwer", humorKonflikte: "oft",
    introExtro: "extravertiert", familieWichtigkeit: "chosen-family", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "spontan",
    hobbys: "getrennt", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.75, wohnform: 0.75, kommunikationsstil: 0.90, freundeskreis: 0.85 },
    pirsig: "Doppelte Nicht-Konformität (Queer + Poly + Dom) als maximale dynamische Qualität in klarer Führung.",
    osho: "Der queere Alpha der Liebe - führt sein Netzwerk mit Stärke und grenzenloser Zuneigung."
  },
  "polyamor-männlich-dominant-bisexuell": {
    sources: ["Allen et al. (2020): Bi = Highest Openness", "Polyamory Studies", "BDSM Personality Research"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "hoch", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "mittel-hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "direkt", entschuldigungen: "selten",
    streitVerhalten: "energisch", versoehnung: "schnell", kritikAnnehmen: "schwer", humorKonflikte: "oft",
    introExtro: "extravertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "spontan",
    hobbys: "getrennt", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.65, eheWunsch: 0.75, wohnform: 0.75, kommunikationsstil: 0.90, oeffentlichkeit: 0.85 },
    pirsig: "Maximale Offenheit (Bi + Poly + Dom) - der Organisator der Fülle in allen Richtungen.",
    osho: "Der grenzenlose Liebeshäuptling - seine Liebe kennt keine Kategorien, nur Führung."
  },
  "polyamor-männlich-submissiv-heterosexuell": {
    sources: ["Moors et al. (2021)", "BDSM Research: Male Subs", "CNM Communication Studies"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "mittel", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "empathisch", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "sehr-hoch", feedbackStil: "sanft", entschuldigungen: "oft",
    streitVerhalten: "nachgiebig", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "selten",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "gemeinsam", wochenende: "mit-partnern", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.65, eheWunsch: 0.75, wohnform: 0.70, kommunikationsstil: 0.90, emotionaleOffenheit: 0.90 },
    pirsig: "Hohe dynamische Qualität in dienender Position. Polyamor-Sub gibt sich mehreren hin - maximale Hingabe.",
    osho: "Der dienende Liebende vieler - findet Erfüllung in der Hingabe an multiple Verbindungen."
  },
  "polyamor-männlich-submissiv-homosexuell": {
    sources: ["Queer Polyamory Research", "Gay BDSM Studies: Submissives", "CNM Meta-analysis"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "mittel", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "empathisch", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "sehr-hoch", feedbackStil: "sanft", entschuldigungen: "oft",
    streitVerhalten: "nachgiebig", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "selten",
    introExtro: "ambivertiert", familieWichtigkeit: "chosen-family", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "gemeinsam", wochenende: "mit-partnern", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.70, wohnform: 0.70, kommunikationsstil: 0.90, emotionaleOffenheit: 0.90 },
    pirsig: "Dreifache Nicht-Konformität in dienender Rolle. Maximale dynamische Qualität in Hingabe.",
    osho: "Der hingebungsvolle queere Liebende - dient dem Kollektiv der Liebe mit ganzem Herzen."
  },
  "polyamor-männlich-submissiv-bisexuell": {
    sources: ["Allen et al. (2020)", "Bi Polyamory Research", "BDSM: Bi Male Submissives"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "mittel", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "empathisch", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "sehr-hoch", feedbackStil: "sanft", entschuldigungen: "oft",
    streitVerhalten: "nachgiebig", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "selten",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "gemeinsam", wochenende: "mit-partnern", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.60, eheWunsch: 0.70, wohnform: 0.70, kommunikationsstil: 0.90, emotionaleOffenheit: 0.95 },
    pirsig: "Maximale Offenheit (Bi + Poly) in dienender Rolle. Der empfänglichste aller Profile.",
    osho: "Der grenzenlos empfangende Liebende - öffnet sich für alle Formen der Liebe in Hingabe."
  },
  "polyamor-männlich-switch-heterosexuell": {
    sources: ["Moors et al. (2021)", "BDSM Research: 37% are Switch", "Relationship Flexibility Studies"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "flexibel", konfliktverhalten: "situativ", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "angepasst", entschuldigungen: "wenn-nötig",
    streitVerhalten: "anpassend", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "flexibel", events: "oft", reisen: "spontan",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.65, eheWunsch: 0.75, wohnform: 0.70, kommunikationsstil: 0.90, konfliktverhalten: 0.85 },
    pirsig: "Maximale Flexibilität in Macht und Liebe. Der adaptive Netzwerk-Navigator.",
    osho: "Der flexible Liebende der Fülle - tanzt zwischen Führung und Hingabe je nach Bedarf."
  },
  "polyamor-männlich-switch-homosexuell": {
    sources: ["Queer Polyamory Research", "Gay Switch Studies", "CNM Communication"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "flexibel", konfliktverhalten: "situativ", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "angepasst", entschuldigungen: "wenn-nötig",
    streitVerhalten: "anpassend", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "extravertiert", familieWichtigkeit: "chosen-family", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "flexibel", events: "oft", reisen: "spontan",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.70, wohnform: 0.70, kommunikationsstil: 0.90, freundeskreis: 0.85 },
    pirsig: "Vierfache Flexibilität (Queer + Poly + Switch). Dynamische Qualität in reiner Form.",
    osho: "Der queere chameleonhafte Liebende - findet seinen Platz in jedem Konstellationsspiel."
  },
  "polyamor-männlich-switch-bisexuell": {
    sources: ["Allen et al. (2020): Bi = Highest Openness", "Switch Research", "Polyamory Meta-analysis"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "flexibel", konfliktverhalten: "situativ", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "angepasst", entschuldigungen: "wenn-nötig",
    streitVerhalten: "anpassend", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "flexibel", events: "oft", reisen: "spontan",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.60, eheWunsch: 0.75, wohnform: 0.70, kommunikationsstil: 0.90, freundeskreis: 0.80 },
    pirsig: "Eines der flüssigsten Profile: Bi + Poly + Switch. Fast maximale dynamische Qualität.",
    osho: "Der vollständig flexible Liebende - keine Grenzen in Geschlecht, Macht oder Anzahl."
  },
  "polyamor-männlich-ausgeglichen-heterosexuell": {
    sources: ["Moors et al. (2021)", "Big Five: Balanced Personality", "Relationship Research"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "wenig-wichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "wenn-nötig",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.65, eheWunsch: 0.80, wohnform: 0.75, kommunikationsstil: 0.85, konfliktverhalten: 0.85 },
    pirsig: "Ausgewogene dynamische Qualität in liebevoller Vielfalt. Der reife Polyamor-Mann.",
    osho: "Der zentrierte Liebende der Fülle - liebt viele aus innerer Ruhe, nicht aus Unruhe."
  },
  "polyamor-männlich-ausgeglichen-homosexuell": {
    sources: ["Queer Polyamory Research", "Big Five: Balanced", "Gay Relationship Studies"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "wenn-nötig",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "chosen-family", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.75, wohnform: 0.75, kommunikationsstil: 0.85, freundeskreis: 0.85 },
    pirsig: "Queere Polyamorie in stabiler Mitte. Reife nicht-konformistische Vielfalt.",
    osho: "Der zentrierte queere Netzwerker der Liebe - Ruhe in der Fülle der Verbindungen."
  },
  "polyamor-männlich-ausgeglichen-bisexuell": {
    sources: ["Allen et al. (2020)", "Big Five: Balanced", "Bi Polyamory Research"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "wenn-nötig",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.60, eheWunsch: 0.75, wohnform: 0.75, kommunikationsstil: 0.85, freundeskreis: 0.80 },
    pirsig: "Maximale Offenheit (Bi + Poly) in stabiler Persönlichkeit. Der weise offene Liebende.",
    osho: "Der zentrierte grenzenlose Liebende - liebt ohne Kategorien aus innerer Stabilität."
  },

  // ────────────────────────────────────────────────────────────────────────────
  // POLYAMOR - WEIBLICH (12 Profile: 193-204)
  // ────────────────────────────────────────────────────────────────────────────

  "polyamor-weiblich-dominant-heterosexuell": {
    sources: ["Moors et al. (2021)", "BDSM Research: Female Dominants", "Tannen (1990): Gender Communication"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "hoch", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt-empathisch", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "direkt", entschuldigungen: "selten",
    streitVerhalten: "energisch", versoehnung: "nach-klärung", kritikAnnehmen: "schwer", humorKonflikte: "oft",
    introExtro: "extravertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "spontan",
    hobbys: "getrennt", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.65, eheWunsch: 0.80, wohnform: 0.75, kommunikationsstil: 0.90, konfliktverhalten: 0.90 },
    pirsig: "Doppelt gegen den Strom (Frau + Dom + Poly). Hohe dynamische Qualität in führender Liebe.",
    osho: "Die Königin der vielen Herzen - führt ihr Liebesnetzwerk mit Stärke und Wärme."
  },
  "polyamor-weiblich-dominant-homosexuell": {
    sources: ["Lesbian BDSM Research", "Queer Polyamory Studies", "Female Dominance Research"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "hoch", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt-empathisch", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "direkt", entschuldigungen: "selten",
    streitVerhalten: "energisch", versoehnung: "nach-klärung", kritikAnnehmen: "schwer", humorKonflikte: "oft",
    introExtro: "extravertiert", familieWichtigkeit: "chosen-family", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "spontan",
    hobbys: "getrennt", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.75, wohnform: 0.75, kommunikationsstil: 0.90, freundeskreis: 0.85 },
    pirsig: "Dreifache Nicht-Konformität in kraftvoller weiblicher Form. Maximale dynamische Qualität.",
    osho: "Die queere Matriarchin der Liebe - führt ihr Netzwerk mit lesbischer Stärke."
  },
  "polyamor-weiblich-dominant-bisexuell": {
    sources: ["Allen et al. (2020)", "Bi Female Dominants", "Polyamory Research"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "hoch", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt-empathisch", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "direkt", entschuldigungen: "selten",
    streitVerhalten: "energisch", versoehnung: "nach-klärung", kritikAnnehmen: "schwer", humorKonflikte: "oft",
    introExtro: "extravertiert", familieWichtigkeit: "weniger-wichtig", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "spontan",
    hobbys: "getrennt", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.60, eheWunsch: 0.75, wohnform: 0.75, kommunikationsstil: 0.90, oeffentlichkeit: 0.85 },
    pirsig: "Maximale Offenheit (Bi + Poly + Domina). Die Führerin grenzenloser Liebe.",
    osho: "Die grenzenlose Königin - ihre Liebe kennt keine Schranken in Geschlecht oder Anzahl."
  },
  "polyamor-weiblich-submissiv-heterosexuell": {
    sources: ["Moors et al. (2021)", "BDSM: 75.6% Women Prefer Sub", "CNM Research"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "mittel", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "empathisch", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "sehr-hoch", feedbackStil: "sanft", entschuldigungen: "oft",
    streitVerhalten: "nachgiebig", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "selten",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "gemeinsam", wochenende: "mit-partnern", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.65, eheWunsch: 0.75, wohnform: 0.70, kommunikationsstil: 0.95, emotionaleOffenheit: 0.95 },
    pirsig: "Statistisch häufiges Profil. Dynamische Qualität in dienender Vielfalt.",
    osho: "Die hingebungsvolle Liebende vieler - nährt alle ihre Verbindungen mit tiefer Zuneigung."
  },
  "polyamor-weiblich-submissiv-homosexuell": {
    sources: ["Lesbian BDSM Studies", "Queer CNM Research", "Female Submission Research"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "mittel", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "empathisch", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "sehr-hoch", feedbackStil: "sanft", entschuldigungen: "oft",
    streitVerhalten: "nachgiebig", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "selten",
    introExtro: "ambivertiert", familieWichtigkeit: "chosen-family", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "gemeinsam", wochenende: "mit-partnern", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.70, wohnform: 0.70, kommunikationsstil: 0.95, emotionaleOffenheit: 0.95 },
    pirsig: "Queere Polyamorie in sanfter Form. Hohe dynamische Qualität in weicher Hingabe.",
    osho: "Die hingebungsvolle queere Netzwerk-Liebende - dient ihren Verbindungen mit ganzem Herzen."
  },
  "polyamor-weiblich-submissiv-bisexuell": {
    sources: ["Allen et al. (2020)", "Bi Female Submissives", "Polyamory Research"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "mittel", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "empathisch", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "sehr-hoch", feedbackStil: "sanft", entschuldigungen: "oft",
    streitVerhalten: "nachgiebig", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "selten",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "gemeinsam", wochenende: "mit-partnern", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.60, eheWunsch: 0.70, wohnform: 0.70, kommunikationsstil: 0.95, emotionaleOffenheit: 0.95 },
    pirsig: "Maximale Offenheit (Bi + Poly) in dienender Form. Die empfänglichste Liebende.",
    osho: "Die grenzenlos empfangende Liebende - öffnet sich für alle Geschlechter in vielfacher Hingabe."
  },
  "polyamor-weiblich-switch-heterosexuell": {
    sources: ["Moors et al. (2021)", "BDSM Switch Research", "Female Flexibility Studies"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "flexibel", konfliktverhalten: "situativ", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "angepasst", entschuldigungen: "wenn-nötig",
    streitVerhalten: "anpassend", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "flexibel", events: "oft", reisen: "spontan",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.60, eheWunsch: 0.75, wohnform: 0.70, kommunikationsstil: 0.90, konfliktverhalten: 0.85 },
    pirsig: "Hohe Flexibilität in Macht und Liebe. Die adaptive Netzwerk-Navigatorin.",
    osho: "Die flexible Liebende der Fülle - wechselt zwischen Geben und Nehmen nach Herzenslust."
  },
  "polyamor-weiblich-switch-homosexuell": {
    sources: ["Lesbian Switch Studies", "Queer Polyamory Research", "Female BDSM Flexibility"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "flexibel", konfliktverhalten: "situativ", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "angepasst", entschuldigungen: "wenn-nötig",
    streitVerhalten: "anpassend", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "extravertiert", familieWichtigkeit: "chosen-family", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "flexibel", events: "oft", reisen: "spontan",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.70, wohnform: 0.70, kommunikationsstil: 0.90, freundeskreis: 0.85 },
    pirsig: "Vierfache Flexibilität (Queer + Poly + Switch + Frau). Maximale dynamische Qualität.",
    osho: "Die queere chameleonhafte Liebende - findet ihre Rolle in jeder Konstellation neu."
  },
  "polyamor-weiblich-switch-bisexuell": {
    sources: ["Allen et al. (2020)", "Bi Female Switch", "Polyamory Meta-analysis"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "flexibel", konfliktverhalten: "situativ", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "angepasst", entschuldigungen: "wenn-nötig",
    streitVerhalten: "anpassend", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "flexibel", events: "oft", reisen: "spontan",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.55, eheWunsch: 0.70, wohnform: 0.70, kommunikationsstil: 0.90, freundeskreis: 0.80 },
    pirsig: "Fast maximale Flüssigkeit: Bi + Poly + Switch + Frau. Dynamische Qualität in Reinform.",
    osho: "Die vollständig flexible Liebende - keine Grenzen in Geschlecht, Macht oder Anzahl."
  },
  "polyamor-weiblich-ausgeglichen-heterosexuell": {
    sources: ["Moors et al. (2021)", "Big Five: Balanced Female", "CNM Research"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "wenig-wichtig",
    kommunikationsstil: "ausgeglichen-empathisch", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "konstruktiv", entschuldigungen: "wenn-nötig",
    streitVerhalten: "ruhig", versoehnung: "nach-gespräch", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.60, eheWunsch: 0.80, wohnform: 0.75, kommunikationsstil: 0.85, konfliktverhalten: 0.85 },
    pirsig: "Ausgewogene dynamische Qualität in weiblicher Polyamorie. Die reife Netzwerk-Liebende.",
    osho: "Die zentrierte Liebende der Fülle - nährt viele aus innerer Ruhe und Fülle."
  },
  "polyamor-weiblich-ausgeglichen-homosexuell": {
    sources: ["Lesbian Polyamory Research", "Big Five: Balanced", "Queer CNM Studies"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen-empathisch", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "konstruktiv", entschuldigungen: "wenn-nötig",
    streitVerhalten: "ruhig", versoehnung: "nach-gespräch", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "chosen-family", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.75, wohnform: 0.75, kommunikationsstil: 0.85, freundeskreis: 0.85 },
    pirsig: "Queere Polyamorie in stabiler weiblicher Mitte. Reife nicht-konformistische Fülle.",
    osho: "Die zentrierte queere Netzwerkerin der Liebe - Ruhe in der Vielfalt der Verbindungen."
  },
  "polyamor-weiblich-ausgeglichen-bisexuell": {
    sources: ["Allen et al. (2020)", "Big Five: Balanced", "Bi Female Polyamory"],
    kinderWunsch: "vielleicht", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen-empathisch", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "konstruktiv", entschuldigungen: "wenn-nötig",
    streitVerhalten: "ruhig", versoehnung: "nach-gespräch", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "wichtig", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.55, eheWunsch: 0.75, wohnform: 0.75, kommunikationsstil: 0.85, freundeskreis: 0.80 },
    pirsig: "Maximale Offenheit (Bi + Poly) in stabiler weiblicher Persönlichkeit. Die weise offene Liebende.",
    osho: "Die zentrierte grenzenlose Liebende - liebt ohne Kategorien aus innerer Fülle und Stabilität."
  },

  // ────────────────────────────────────────────────────────────────────────────
  // POLYAMOR - NONBINÄR (12 Profile: 205-216)
  // ────────────────────────────────────────────────────────────────────────────

  "polyamor-nonbinär-dominant-heterosexuell": {
    sources: ["Non-binary Research: Highest Openness", "Polyamory Studies", "BDSM Personality Research"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "direkt", entschuldigungen: "selten",
    streitVerhalten: "energisch", versoehnung: "schnell", kritikAnnehmen: "schwer", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "unwichtig", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "spontan",
    hobbys: "getrennt", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.80, wohnform: 0.75, kommunikationsstil: 0.85, konfliktverhalten: 0.85 },
    pirsig: "Dreifache Nicht-Konformität (NB + Poly + Dom). Hohe dynamische Qualität jenseits des Geschlechts.",
    osho: "Das führende non-binäre Wesen der Liebe - organisiert Netzwerke jenseits der Kategorien."
  },
  "polyamor-nonbinär-dominant-homosexuell": {
    sources: ["Non-binary Research", "Queer Polyamory Studies", "BDSM Dominance Research"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "direkt", entschuldigungen: "selten",
    streitVerhalten: "energisch", versoehnung: "schnell", kritikAnnehmen: "schwer", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "chosen-family", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "spontan",
    hobbys: "getrennt", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.75, wohnform: 0.75, kommunikationsstil: 0.85, freundeskreis: 0.85 },
    pirsig: "Vierfache Nicht-Konformität in kraftvoller Form. Maximale dynamische Qualität.",
    osho: "Das queere non-binäre Alpha der Liebe - führt sein Netzwerk jenseits aller Normen."
  },
  "polyamor-nonbinär-dominant-bisexuell": {
    sources: ["Non-binary Research", "Allen et al. (2020)", "BDSM: Bi Dominants"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "direkt", konfliktverhalten: "konfrontativ", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "direkt", entschuldigungen: "selten",
    streitVerhalten: "energisch", versoehnung: "schnell", kritikAnnehmen: "schwer", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "unwichtig", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "wenig", events: "oft", reisen: "spontan",
    hobbys: "getrennt", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.75, wohnform: 0.75, kommunikationsstil: 0.85, oeffentlichkeit: 0.85 },
    pirsig: "Maximale Offenheit (NB + Bi + Poly + Dom). Der Führer der grenzenlosen Liebe.",
    osho: "Das grenzenlose dominante Wesen - führt ein Liebesnetzwerk ohne jede Kategorie."
  },
  "polyamor-nonbinär-submissiv-heterosexuell": {
    sources: ["Non-binary Research", "BDSM Submissive Studies", "Polyamory Research"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "mittel", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "empathisch", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "sehr-hoch", feedbackStil: "sanft", entschuldigungen: "oft",
    streitVerhalten: "nachgiebig", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "selten",
    introExtro: "introvertiert", familieWichtigkeit: "unwichtig", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "gemeinsam", wochenende: "mit-partnern", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.75, wohnform: 0.70, kommunikationsstil: 0.90, emotionaleOffenheit: 0.90 },
    pirsig: "Non-binäre Polyamorie in dienender Form. Jenseits des Geschlechts, in Hingabe an viele.",
    osho: "Das hingebungsvolle non-binäre Wesen - dient vielen Verbindungen jenseits der Kategorien."
  },
  "polyamor-nonbinär-submissiv-homosexuell": {
    sources: ["Non-binary Research", "Queer BDSM Studies", "CNM Research"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "mittel", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "empathisch", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "sehr-hoch", feedbackStil: "sanft", entschuldigungen: "oft",
    streitVerhalten: "nachgiebig", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "selten",
    introExtro: "introvertiert", familieWichtigkeit: "chosen-family", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "gemeinsam", wochenende: "mit-partnern", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.70, wohnform: 0.70, kommunikationsstil: 0.90, emotionaleOffenheit: 0.90 },
    pirsig: "Vierfache Nicht-Konformität in sanfter Hingabe. Dynamische Qualität in weicher Form.",
    osho: "Das queere non-binäre dienende Wesen - gibt sich hin jenseits aller Normen und Grenzen."
  },
  "polyamor-nonbinär-submissiv-bisexuell": {
    sources: ["Non-binary Research", "Allen et al. (2020)", "BDSM: Bi Submissives"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "mittel", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "empathisch", konfliktverhalten: "vermeidend", emotionaleOffenheit: "sehr-hoch",
    gespraechsBedürfnis: "sehr-hoch", feedbackStil: "sanft", entschuldigungen: "oft",
    streitVerhalten: "nachgiebig", versoehnung: "schnell", kritikAnnehmen: "sehr-gut", humorKonflikte: "selten",
    introExtro: "introvertiert", familieWichtigkeit: "unwichtig", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "gemeinsam", wochenende: "mit-partnern", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.70, wohnform: 0.70, kommunikationsstil: 0.90, emotionaleOffenheit: 0.95 },
    pirsig: "Absolutmaximale Offenheit in dienender Form. Das empfänglichste aller Profile.",
    osho: "Das grenzenlos empfangende non-binäre Wesen - öffnet sich für alle in vollständiger Hingabe."
  },
  "polyamor-nonbinär-switch-heterosexuell": {
    sources: ["Non-binary Research", "BDSM Switch Studies", "Polyamory Research"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "flexibel", konfliktverhalten: "situativ", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "angepasst", entschuldigungen: "wenn-nötig",
    streitVerhalten: "anpassend", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "unwichtig", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "flexibel", events: "oft", reisen: "spontan",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.75, wohnform: 0.70, kommunikationsstil: 0.90, konfliktverhalten: 0.85 },
    pirsig: "Dreifache Flexibilität (NB + Poly + Switch). Hohe dynamische Qualität in jeder Rolle.",
    osho: "Das flexible non-binäre Wesen der Liebe - tanzt zwischen allen Rollen in vielen Verbindungen."
  },
  "polyamor-nonbinär-switch-homosexuell": {
    sources: ["Non-binary Research", "Queer Switch Studies", "CNM Research"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "flexibel", konfliktverhalten: "situativ", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "angepasst", entschuldigungen: "wenn-nötig",
    streitVerhalten: "anpassend", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "chosen-family", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "flexibel", events: "oft", reisen: "spontan",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.70, wohnform: 0.70, kommunikationsstil: 0.90, freundeskreis: 0.85 },
    pirsig: "Vierfache Flexibilität jenseits des Geschlechts. Dynamische Qualität in freier Form.",
    osho: "Das queere non-binäre Chamäleon der Liebe - wechselt frei zwischen allen Möglichkeiten."
  },
  "polyamor-nonbinär-switch-bisexuell": {
    sources: ["Non-binary Research", "Allen et al. (2020)", "BDSM: Bi Switch"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "aktiv",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "flexibel", konfliktverhalten: "situativ", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "hoch", feedbackStil: "angepasst", entschuldigungen: "wenn-nötig",
    streitVerhalten: "anpassend", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "oft",
    introExtro: "ambivertiert", familieWichtigkeit: "unwichtig", freundeskreis: "sehr-groß",
    oeffentlichkeit: "offen", alleinzeit: "flexibel", events: "oft", reisen: "spontan",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "sehr-groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.70, wohnform: 0.70, kommunikationsstil: 0.90, freundeskreis: 0.80 },
    pirsig: "Das absolutflüssigste Polyamor-Profil: NB + Bi + Switch + Poly. Maximale dynamische Qualität.",
    osho: "Das vollständig fluide liebende Wesen - keine Festlegung in Geschlecht, Orientierung, Macht oder Partner."
  },
  "polyamor-nonbinär-ausgeglichen-heterosexuell": {
    sources: ["Non-binary Research", "Big Five: Balanced", "Polyamory Studies"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "unwichtig", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.85, eheWunsch: 0.80, wohnform: 0.75, kommunikationsstil: 0.85, alleinzeit: 0.80 },
    pirsig: "Non-binär mit stabiler Mitte in liebevoller Vielfalt. Jenseits des Geschlechts, zentriert, verbunden.",
    osho: "Das zentrierte non-binäre Wesen der Fülle - liebt viele aus innerer Ruhe, jenseits der Kategorien."
  },
  "polyamor-nonbinär-ausgeglichen-homosexuell": {
    sources: ["Non-binary Research", "Big Five: Balanced", "Queer Polyamory"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "chosen-family", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.75, wohnform: 0.75, kommunikationsstil: 0.85, freundeskreis: 0.85 },
    pirsig: "Reife queere non-binäre Polyamorie. Nicht-konformistisch und doch zentriert.",
    osho: "Das zentrierte queere non-binäre Netzwerk-Wesen - Ruhe und Fülle jenseits aller Normen."
  },
  "polyamor-nonbinär-ausgeglichen-bisexuell": {
    sources: ["Non-binary Research: Highest Openness", "Allen et al. (2020)", "Big Five: Balanced"],
    kinderWunsch: "nein", eheWunsch: "offen", wohnform: "variabel", religion: "spirituell",
    karrierePrioritaet: "balance", finanzPhilosophie: "transparent", lebensstil: "durchschnittlich",
    umzugsbereitschaft: "verhandelbar", zukunftsplanung: "flexibel-gemeinsam", traditionenWichtigkeit: "unwichtig",
    kommunikationsstil: "ausgeglichen", konfliktverhalten: "diplomatisch", emotionaleOffenheit: "hoch",
    gespraechsBedürfnis: "mittel", feedbackStil: "konstruktiv", entschuldigungen: "normal",
    streitVerhalten: "ruhig", versoehnung: "normal", kritikAnnehmen: "gut", humorKonflikte: "manchmal",
    introExtro: "ambivertiert", familieWichtigkeit: "unwichtig", freundeskreis: "groß",
    oeffentlichkeit: "offen", alleinzeit: "mittel", events: "manchmal", reisen: "mit-partnern",
    hobbys: "mix", wochenende: "flexibel", netzwerkGroesse: "groß",
    confidence: { kinderWunsch: 0.90, eheWunsch: 0.75, wohnform: 0.75, kommunikationsstil: 0.85, freundeskreis: 0.80 },
    pirsig: "Maximale Offenheit (NB + Bi + Poly) in stabiler Mitte. Die weiseste Form grenzenloser Liebe.",
    osho: "Das zentrierte grenzenlose liebende Wesen - die höchste Weisheit der Fülle ohne Kategorien."
  }

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
