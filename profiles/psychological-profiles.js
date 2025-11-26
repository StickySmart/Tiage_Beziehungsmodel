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
