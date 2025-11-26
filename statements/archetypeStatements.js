/**
 * ARCHETYPE MICRO-STATEMENTS DATABASE
 * ====================================
 * ~650 philosophische Micro-Statements für Archetyp-Kombinationen
 *
 * Philosophische Grundlage:
 * - Robert Pirsig: Metaphysik der Qualität (MOQ) - Statische vs. Dynamische Qualität
 * - OSHO: Polarität und Gegensätze als Quelle der Anziehung
 *
 * Struktur:
 * - Jede Kombination hat pathos (Gefühlsebene) und logos (Verstandsebene) Statements
 * - Pro/Contra basieren auf der Kombination der Archetypen
 * - Gewichtung: Logos 40%, Pathos 60%
 */

const archetypeStatements = {
    // ═══════════════════════════════════════════════════════════════════════
    // SINGLE (von) - 6 Kombinationen
    // ═══════════════════════════════════════════════════════════════════════

    "single_single": {
        pathos: {
            gemeinsam: [
                "Zwei Seelen, die dieselbe Sprache der Freiheit sprechen.",
                "Die gegenseitige Anerkennung der Unabhängigkeit schafft Respekt, aber keine natürliche Anziehung.",
                "Beide verstehen das Bedürfnis nach Raum – vielleicht zu gut.",
                "Die Leere zwischen ihnen ist nicht Distanz, sondern geteiltes Verständnis."
            ],
            spannung: [
                "Ohne Polarität fehlt die magnetische Kraft der Anziehung.",
                "Zwei Gleiche können sich achten, aber selten wirklich sehnen.",
                "Die Freiheit wird zum Gefängnis, wenn niemand da ist, der sie herausfordert."
            ]
        },
        logos: {
            gemeinsam: [
                "Strukturell identisch: Beide priorisieren Autonomie über Bindung.",
                "Keine fundamentalen Konflikte, da keine fundamentalen Erwartungen.",
                "Rationalität trifft auf Rationalität – wenig Reibung, wenig Feuer.",
                "Die Beziehungsphilosophien sind deckungsgleich."
            ],
            unterschied: [
                "Individuelle Unterschiede in Lebensphasen können variieren.",
                "Einzelne Bedürfnisse bestimmen, ob Nähe gesucht oder vermieden wird."
            ]
        },
        pro: [
            "Identische Beziehungsphilosophie – kein Erklärungsbedarf",
            "Gegenseitiger Respekt für Autonomie selbstverständlich",
            "Keine unerfüllbaren Erwartungen aneinander",
            "Freiheit für spontane Entscheidungen bleibt erhalten",
            "Kein Druck zur Eskalation der Beziehung",
            "Beide verstehen das Bedürfnis nach Rückzug"
        ],
        contra: [
            "Fehlende Polarität kann zu mangelnder Anziehung führen",
            "Keiner gibt den Impuls zur Vertiefung",
            "Gesellschaftlich keine gegenseitige Unterstützung",
            "Risiko der ewigen Unverbindlichkeit",
            "Beide warten, dass der andere den ersten Schritt macht",
            "Keine gemeinsame Vision für die Zukunft"
        ]
    },

    "single_duo": {
        pathos: {
            gemeinsam: [
                "Der Single spürt die Wärme der Geborgenheit, die das Duo bietet.",
                "Eine tiefe Sehnsucht kann entstehen – nach dem, was man bewusst meidet.",
                "Das Duo verkörpert das, was der Single manchmal vermisst: Ankommen."
            ],
            spannung: [
                "Die Angst vor Vereinnahmung trifft auf das Bedürfnis nach Verschmelzung.",
                "Der Single fühlt sich eingeengt, wo das Duo Nähe sucht.",
                "Freiheitsdrang kollidiert mit Exklusivitätserwartung.",
                "Was für einen Schutz ist, ist für den anderen Mauer."
            ]
        },
        logos: {
            gemeinsam: [
                "Beide kennen klare Beziehungsmodelle – auch wenn sie gegensätzlich sind.",
                "Struktur trifft auf Struktur, nur mit anderem Inhalt."
            ],
            unterschied: [
                "Fundamentaler Konflikt: Unabhängigkeit vs. Exklusivität",
                "Single sieht Beziehung als Option, Duo als Notwendigkeit",
                "Zeit-Allokation ist radikal unterschiedlich konzipiert",
                "Zukunftsplanung divergiert grundlegend"
            ]
        },
        pro: [
            "Duo bietet Stabilität, die der Single manchmal vermisst",
            "Single kann von der Bindungsfähigkeit des Duos lernen",
            "Klare Erwartungen auf Duo-Seite verhindern Missverständnisse",
            "Potenzial für transformative Beziehungserfahrung"
        ],
        contra: [
            "Fundamentaler Konflikt: Freiheit vs. Exklusivität",
            "Single fühlt sich schnell eingeengt",
            "Duo fühlt sich nicht priorisiert",
            "Unterschiedliche Erwartungen an Zeit und Präsenz",
            "Gesellschaftlicher Druck durch Duo-Umfeld",
            "Single kann als 'Projekt' wahrgenommen werden",
            "Duo kann als 'klammernd' erlebt werden",
            "Keine gemeinsame Beziehungsvision möglich"
        ]
    },

    "single_duo_flex": {
        pathos: {
            gemeinsam: [
                "Duo-Flex versteht die Sehnsucht nach Freiheit – zumindest teilweise.",
                "Der Single erkennt im Duo-Flex einen Kompromiss, der Brücken bauen könnte.",
                "Beide teilen das Gefühl, dass Beziehungen nicht alles sein müssen."
            ],
            spannung: [
                "Die 'Flex'-Komponente reicht dem Single oft nicht aus.",
                "Single kann sich als 'der Außenseiter' der Primärbeziehung fühlen.",
                "Die implizite Hierarchie verletzt das Gleichheitsempfinden."
            ]
        },
        logos: {
            gemeinsam: [
                "Duo-Flex zeigt Offenheit für alternative Modelle.",
                "Strukturell gibt es Anknüpfungspunkte durch die Flexibilität."
            ],
            unterschied: [
                "Single will keine Hierarchie, Duo-Flex hat eine eingebaute.",
                "Die 'Primärbeziehung' des Duo-Flex steht immer an erster Stelle.",
                "Single ist Gast, nicht gleichwertiger Partner."
            ]
        },
        pro: [
            "Duo-Flex kann dem Single situative Nähe bieten",
            "Offenheit für alternative Begegnungen vorhanden",
            "Keine Erwartung an vollständige Bindung",
            "Potenzial für erfüllende Teilbeziehung",
            "Gemeinsame Akzeptanz von Flexibilität"
        ],
        contra: [
            "Single ist strukturell 'zweite Wahl'",
            "Primärbeziehung hat immer Vorrang",
            "Single könnte sich 'benutzt' fühlen",
            "Keine Entwicklung zur Gleichwertigkeit möglich",
            "Duo-Flex-Regeln können den Single einschränken",
            "Emotionale Asymmetrie ist strukturell verankert"
        ]
    },

    "single_solopoly": {
        pathos: {
            gemeinsam: [
                "Eine tiefe Resonanz auf der Ebene der Autonomie.",
                "Beide schätzen Freiheit als höchsten Wert – das verbindet.",
                "Der Single erkennt im Solopoly einen Seelenverwandten der Unabhängigkeit.",
                "Respekt vor dem eigenen Raum ist selbstverständlich."
            ],
            spannung: [
                "Solopoly ist aktiv verbunden, Single ist es oft nicht.",
                "Die Aktivität des Solopoly kann den Single überfordern.",
                "Single kann sich in der Nicht-Exklusivität verlieren."
            ]
        },
        logos: {
            gemeinsam: [
                "Beide lehnen traditionelle Beziehungsmodelle ab.",
                "Autonomie ist das gemeinsame Fundament.",
                "Keine Erwartung an Verschmelzung oder Zusammenleben."
            ],
            unterschied: [
                "Solopoly hat multiple Beziehungen, Single oft keine.",
                "Die Kapazität für Beziehungsarbeit unterscheidet sich.",
                "Solopoly erwartet Beziehung, Single nicht unbedingt."
            ]
        },
        pro: [
            "Maximale Übereinstimmung in Autonomie-Bedürfnissen",
            "Gegenseitiger Respekt für Unabhängigkeit",
            "Keine Hierarchie-Problematik",
            "Beziehung als Bereicherung, nicht Verpflichtung",
            "Solopoly kann den Single inspirieren",
            "Ehrliche Kommunikation über Bedürfnisse"
        ],
        contra: [
            "Single könnte von Solopoly's Aktivität überfordert sein",
            "Solopoly erwartet Beziehungsarbeit, die Single vermeiden will",
            "Die vielen Kontakte des Solopoly können einschüchtern",
            "Single könnte sich als 'einer von vielen' fühlen"
        ]
    },

    "single_poly_hedo": {
        pathos: {
            gemeinsam: [
                "Beide feiern den Moment, nicht die Ewigkeit.",
                "Freiheit und Spontaneität verbinden sie.",
                "Keine schweren Verpflichtungen belasten die Begegnung."
            ],
            spannung: [
                "Poly Hedo's Intensität kann den Single überfordern.",
                "Der hedonistische Fokus kollidiert mit Single's Ruhe-Bedürfnis.",
                "Zu viel Stimulation für den, der Stille sucht."
            ]
        },
        logos: {
            gemeinsam: [
                "Beide lehnen starre Strukturen ab.",
                "Spontaneität als gemeinsamer Wert."
            ],
            unterschied: [
                "Poly Hedo ist aktiv suchend, Single oft passiv wartend.",
                "Unterschiedliche Energielevel in sozialen Situationen."
            ]
        },
        pro: [
            "Gemeinsame Wertschätzung von Freiheit und Spontaneität",
            "Keine schweren Erwartungen",
            "Potenzial für intensive, unverbindliche Begegnungen",
            "Beiderseits geringe Eifersucht-Problematik",
            "Lebensfreude kann ansteckend sein"
        ],
        contra: [
            "Unterschiedliche Energielevel können erschöpfen",
            "Single sucht oft Ruhe, Poly Hedo sucht Stimulation",
            "Langfristige Tiefe ist für Poly Hedo weniger relevant",
            "Single könnte als 'langweilig' wahrgenommen werden",
            "Poly Hedo's Lifestyle kann überfordernd sein"
        ]
    },

    "single_polyamor": {
        pathos: {
            gemeinsam: [
                "Single spürt die Wärme der polyamoren Community.",
                "Die Offenheit des Polyamor kann einladend wirken."
            ],
            spannung: [
                "Die strukturierte Komplexität überfordert den Single.",
                "Polyamor erwartet aktive Teilnahme, Single will Ruhe.",
                "Der Kalender-Marathon des Polyamor widerspricht Single's Rhythmus."
            ]
        },
        logos: {
            gemeinsam: [
                "Beide reflektieren über Beziehungsmodelle."
            ],
            unterschied: [
                "Polyamor ist hochstrukturiert, Single sucht Einfachheit.",
                "Kommunikationsintensität radikal unterschiedlich.",
                "Polyamor braucht aktive Beziehungsarbeit, Single meidet sie."
            ]
        },
        pro: [
            "Polyamor kann dem Single Struktur bieten ohne Exklusivität",
            "Keine '100% Erwartung' an den Single",
            "Community-Aspekt kann bereichernd sein",
            "Ehrliche Kommunikation wird praktiziert"
        ],
        contra: [
            "Hoher Kommunikationsaufwand überfordert den Single",
            "Polyamor's Strukturiertheit widerspricht Single's Einfachheit",
            "Single fühlt sich in der Komplexität verloren",
            "Kalendermanagement ist für Single unattraktiv",
            "Hierarchien können den Single frustrieren"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // DUO (von) - 6 Kombinationen
    // ═══════════════════════════════════════════════════════════════════════

    "duo_single": {
        pathos: {
            gemeinsam: [
                "Das Duo sehnt sich nach der Freiheit, die der Single verkörpert.",
                "Eine geheime Faszination für das Ungezähmte."
            ],
            spannung: [
                "Die Angst, nicht genug zu sein für jemanden, der alles haben kann.",
                "Duo fühlt sich minderwertig gegenüber der Single-Freiheit.",
                "Der Wunsch nach Exklusivität trifft auf Mauern.",
                "Liebeserklärungen fallen ins Leere der Unverbindlichkeit."
            ]
        },
        logos: {
            unterschied: [
                "Fundamentale Inkompatibilität der Beziehungsmodelle.",
                "Duo braucht Commitment, Single meidet es.",
                "Zukunftsplanung ist einseitig – das Duo plant, der Single ausweicht."
            ]
        },
        pro: [
            "Single kann die Intensität des Duos inspirierend finden",
            "Potenzial für transformative Erfahrung auf beiden Seiten",
            "Duo kann lernen, weniger zu klammern"
        ],
        contra: [
            "Duo investiert emotional mehr als zurückkommt",
            "Single erwidert die Exklusivität nicht",
            "Duo fühlt sich nicht gewählt, nur toleriert",
            "Einseitige emotionale Arbeit",
            "Duo trägt die Last der Beziehungsarbeit allein",
            "Single kann Duo als 'zu viel' empfinden",
            "Herzschmerz für das Duo vorprogrammiert"
        ]
    },

    "duo_duo": {
        pathos: {
            gemeinsam: [
                "Zwei Seelen, die dasselbe suchen: Ankommen, Verschmelzen, Heimat.",
                "Die gegenseitige Hingabe schafft tiefe Resonanz.",
                "Exklusivität als gemeinsame Sprache der Liebe.",
                "Das Gefühl: 'Du bist mein Zuhause' – beidseitig."
            ],
            spannung: [
                "Hohe Erwartungen können zu hohem Druck führen.",
                "Wenn beide alles voneinander erwarten, kann einer nie genug sein."
            ]
        },
        logos: {
            gemeinsam: [
                "Strukturell perfekt abgestimmt: Klare Rollen, klare Erwartungen.",
                "Gesellschaftlich maximal unterstützt.",
                "Rechtliche und institutionelle Absicherung möglich.",
                "Gemeinsame Lebensplanung ist selbstverständlich."
            ],
            unterschied: [
                "Individuelle Unterschiede in Nähe-Distanz können variieren."
            ]
        },
        pro: [
            "Identische Beziehungsphilosophie – tiefe Resonanz",
            "Maximale gesellschaftliche Akzeptanz",
            "Klare, geteilte Erwartungen an Treue und Exklusivität",
            "Gemeinsame Lebensplanung möglich",
            "Gegenseitige volle emotionale Verfügbarkeit",
            "Rechtliche Absicherung (Ehe etc.) möglich",
            "Familie und Freunde verstehen die Beziehung"
        ],
        contra: [
            "Hohe Erwartungen können zu hohem Druck führen",
            "Gefahr der Verschmelzung und Identitätsverlust",
            "Eine Person muss alle Bedürfnisse erfüllen",
            "Wenig Raum für individuelle Entwicklung",
            "Trennung wird als Scheitern erlebt"
        ]
    },

    "duo_duo_flex": {
        pathos: {
            gemeinsam: [
                "Das Duo erkennt im Duo-Flex einen nahen Verwandten.",
                "Die Grundwerte von Stabilität und Primärbeziehung sind ähnlich."
            ],
            spannung: [
                "Die 'Flex'-Komponente verunsichert das Duo.",
                "Duo fürchtet: 'Bin ich nicht genug?'",
                "Die Öffnung wird als Bedrohung empfunden.",
                "Eifersucht ist vorprogrammiert."
            ]
        },
        logos: {
            gemeinsam: [
                "Beide priorisieren eine Primärbeziehung.",
                "Struktur und Stabilität sind gemeinsame Werte."
            ],
            unterschied: [
                "Die 'Flex'-Option ist für das Duo ein No-Go.",
                "Definition von Treue unterscheidet sich fundamental."
            ]
        },
        pro: [
            "Grundverständnis für Primärbeziehungs-Priorität",
            "Ähnliche Vorstellungen von Stabilität",
            "Duo-Flex könnte zur Monogamie zurückkehren"
        ],
        contra: [
            "Duo erlebt die 'Flex'-Öffnung als Vertrauensbruch",
            "Unterschiedliche Treue-Definitionen",
            "Eifersucht und Unsicherheit auf Duo-Seite",
            "Duo fürchtet, nicht zu genügen",
            "Die Öffnung ist für Duo untragbar",
            "Fundamentaler Konflikt bei der Exklusivität"
        ]
    },

    "duo_solopoly": {
        pathos: {
            spannung: [
                "Das Duo fühlt sich als Option, nicht als Priorität.",
                "Die Nicht-Hierarchie verletzt das Bedürfnis nach Sonderstellung.",
                "Duo versteht nicht, warum es nicht 'die Eine' sein kann.",
                "Tiefe Verunsicherung durch die Gleichwertigkeit anderer Beziehungen."
            ]
        },
        logos: {
            unterschied: [
                "Fundamentale Inkompatibilität: Exklusivität vs. Gleichwertigkeit.",
                "Duo will verschmelzen, Solopoly will Distanz wahren.",
                "Zusammenleben ist für Solopoly ausgeschlossen – für Duo essentiell."
            ]
        },
        pro: [
            "Solopoly bietet klare Kommunikation",
            "Beide können viel übereinander lernen"
        ],
        contra: [
            "Duo fühlt sich als 'einer von vielen'",
            "Keine Sonderstellung für das Duo möglich",
            "Solopoly lehnt Verschmelzung ab, Duo braucht sie",
            "Kein Zusammenleben möglich",
            "Duo erlebt Solopoly's Autonomie als Ablehnung",
            "Fundamentaler Wertkonflikt",
            "Duo wird immer mehr wollen als Solopoly geben kann"
        ]
    },

    "duo_poly_hedo": {
        pathos: {
            spannung: [
                "Das Duo fühlt sich unsichtbar im hedonistischen Wirbel.",
                "Keine emotionale Tiefe dort, wo das Duo sie sucht.",
                "Die Spontaneität des Poly Hedo wirkt auf das Duo chaotisch und beängstigend."
            ]
        },
        logos: {
            unterschied: [
                "Maximal unterschiedliche Beziehungsphilosophien.",
                "Duo sucht Struktur, Poly Hedo flieht sie.",
                "Langfristigkeit vs. Momentorientierung."
            ]
        },
        pro: [
            "Potenzial für gegenseitige Horizonterweiterung"
        ],
        contra: [
            "Fundamentale Unvereinbarkeit",
            "Duo sucht Tiefe, Poly Hedo sucht Breite",
            "Keine gemeinsame Basis für langfristige Planung",
            "Duo fühlt sich nicht ernst genommen",
            "Poly Hedo's Spontaneität ist für Duo Chaos",
            "Gesellschaftlich inkompatible Umfelder",
            "Völlig unterschiedliche Lebensrhythmen"
        ]
    },

    "duo_polyamor": {
        pathos: {
            gemeinsam: [
                "Beide schätzen tiefe emotionale Verbindungen."
            ],
            spannung: [
                "Das Duo kann die geteilte Aufmerksamkeit nicht ertragen.",
                "Eifersucht ist unvermeidlich.",
                "Das Gefühl, nie genug zu sein, ist dominant."
            ]
        },
        logos: {
            gemeinsam: [
                "Beide schätzen Kommunikation und Verbindlichkeit."
            ],
            unterschied: [
                "Exklusivität vs. ethische Nicht-Exklusivität.",
                "Duo will eine Beziehung, Polyamor hat mehrere."
            ]
        },
        pro: [
            "Beide schätzen emotionale Tiefe",
            "Kommunikation ist beiden wichtig",
            "Polyamor könnte dem Duo Sicherheit bieten als Primary"
        ],
        contra: [
            "Duo erlebt geteilte Aufmerksamkeit als Verrat",
            "Eifersucht ist für Duo unvermeidlich",
            "Die Hierarchie tröstet das Duo nicht genug",
            "Duo versteht Polyamor's Kapazität für mehrere nicht",
            "Fundamentaler Konflikt bei der Exklusivität"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // DUO-FLEX (von) - 6 Kombinationen
    // ═══════════════════════════════════════════════════════════════════════

    "duo_flex_single": {
        pathos: {
            gemeinsam: [
                "Duo-Flex erkennt im Single den Freiheitsdrang, den es selbst kennt.",
                "Die situative Öffnung schafft Anknüpfungspunkte."
            ],
            spannung: [
                "Single könnte die Primärbeziehung des Duo-Flex bedrohen.",
                "Unsicherheit: Ist der Single 'nur' für den Flex-Anteil interessant?"
            ]
        },
        logos: {
            gemeinsam: [
                "Beide haben ein gewisses Maß an Flexibilität."
            ],
            unterschied: [
                "Single will keine zweite Wahl sein.",
                "Duo-Flex muss Grenzen navigieren, die der Single nicht versteht."
            ]
        },
        pro: [
            "Gemeinsames Verständnis für Flexibilität",
            "Single kann bereichernde Begegnungen bieten",
            "Keine Bedrohung für die Primärbeziehung durch Single"
        ],
        contra: [
            "Single könnte mehr wollen als Duo-Flex geben kann",
            "Hierarchie-Problem bleibt",
            "Single fühlt sich als 'Spielzeug'",
            "Duo-Flex's Regeln können den Single frustrieren"
        ]
    },

    "duo_flex_duo": {
        pathos: {
            gemeinsam: [
                "Grundverständnis für die Wichtigkeit einer Primärbeziehung.",
                "Beide kennen den Wert von Stabilität."
            ],
            spannung: [
                "Duo kann die Flex-Öffnung nicht akzeptieren.",
                "Die Öffnung wird als Untreue empfunden."
            ]
        },
        logos: {
            gemeinsam: [
                "Ähnliche Strukturen mit einer Hauptbeziehung."
            ],
            unterschied: [
                "Definition von Treue ist verschieden.",
                "Was für Duo-Flex 'Flexibilität' ist, ist für Duo 'Betrug'."
            ]
        },
        pro: [
            "Gemeinsame Wertschätzung von Primärbeziehungen",
            "Duo-Flex könnte exklusiver werden für das Duo"
        ],
        contra: [
            "Duo erlebt Flex-Anteil als Vertrauensbruch",
            "Unterschiedliche Treue-Definitionen",
            "Duo-Flex's Öffnungen sind für Duo inakzeptabel",
            "Konstantes Konfliktpotenzial"
        ]
    },

    "duo_flex_duo_flex": {
        pathos: {
            gemeinsam: [
                "Perfekte Resonanz: Beide verstehen den Balanceakt.",
                "Die Suche nach dem Besten aus beiden Welten verbindet.",
                "Gegenseitiges Verständnis für die Komplexität des Modells.",
                "Beide kennen das Gefühl: 'Genug? Zu viel?'"
            ],
            spannung: [
                "Konkurrenz um die Flex-Partner kann entstehen.",
                "Die eigene Öffnung akzeptieren ist leichter als die des Partners."
            ]
        },
        logos: {
            gemeinsam: [
                "Identische Struktur: Primärbeziehung + situative Öffnung.",
                "Gemeinsames Regelwerk ist verhandelbar.",
                "Beide verstehen das Konzept von Primary und Flex."
            ]
        },
        pro: [
            "Identische Beziehungsphilosophie",
            "Gegenseitiges Verständnis für Öffnungen",
            "Gemeinsame Regeln können ausgehandelt werden",
            "Symmetrische Freiheiten schaffen Balance",
            "Beide kennen die Herausforderungen"
        ],
        contra: [
            "Eifersucht kann trotz Verständnis auftreten",
            "Flex-Regeln müssen ständig neu verhandelt werden",
            "Asymmetrie in der Nutzung der Öffnung kann verletzen",
            "Komplexität der doppelten Flexibilität"
        ]
    },

    "duo_flex_solopoly": {
        pathos: {
            gemeinsam: [
                "Beide schätzen Flexibilität und Offenheit.",
                "Die Nicht-Exklusivität ist beiden vertraut."
            ],
            spannung: [
                "Solopoly lehnt Hierarchien ab, Duo-Flex basiert darauf.",
                "Duo-Flex will Primärstatus, Solopoly vergibt ihn nicht."
            ]
        },
        logos: {
            unterschied: [
                "Hierarchie vs. Gleichwertigkeit ist der Kernkonflikt.",
                "Duo-Flex's Primärbeziehung hat keine Entsprechung im Solopoly-Modell."
            ]
        },
        pro: [
            "Gemeinsame Offenheit für nicht-exklusive Beziehungen",
            "Beide praktizieren aktiv Mehrfachbeziehungen",
            "Kommunikation über Grenzen ist beiden vertraut"
        ],
        contra: [
            "Solopoly gibt keinen Primary-Status",
            "Duo-Flex erwartet Hierarchie, die Solopoly ablehnt",
            "Unterschiedliche Vorstellungen von Verbindlichkeit",
            "Duo-Flex will mehr Sicherheit als Solopoly bietet"
        ]
    },

    "duo_flex_poly_hedo": {
        pathos: {
            gemeinsam: [
                "Beide genießen Vielfalt in Beziehungen.",
                "Spontaneität und Offenheit sind Gemeinsamkeiten."
            ],
            spannung: [
                "Poly Hedo's Spontaneität überfordert Duo-Flex's Regelwerk.",
                "Die Struktur des Duo-Flex wirkt auf Poly Hedo einengend."
            ]
        },
        logos: {
            unterschied: [
                "Strukturierte Öffnung vs. spontane Freiheit.",
                "Duo-Flex braucht Absprachen, Poly Hedo flieht sie."
            ]
        },
        pro: [
            "Gemeinsame Wertschätzung von Vielfalt",
            "Potenzial für intensive Erlebnisse",
            "Beide sind offen für Experimente"
        ],
        contra: [
            "Poly Hedo's Spontaneität passt nicht zu Duo-Flex's Regeln",
            "Strukturkonflikt ist fundamental",
            "Duo-Flex braucht Planung, Poly Hedo hasst sie",
            "Unterschiedliche Erwartungen an Verbindlichkeit"
        ]
    },

    "duo_flex_polyamor": {
        pathos: {
            gemeinsam: [
                "Beide kennen die Komplexität von Mehrfachbeziehungen.",
                "Kommunikation und Grenzen sind beiden wichtig."
            ],
            spannung: [
                "Polyamor's multiple tiefe Beziehungen vs. Duo-Flex's situative Öffnung.",
                "Unterschiedliche Tiefe der Nicht-Primär-Beziehungen."
            ]
        },
        logos: {
            gemeinsam: [
                "Beide arbeiten mit Regeln und Absprachen.",
                "Struktur ist beiden wichtig."
            ],
            unterschied: [
                "Polyamor's Secondary-Beziehungen sind tiefer als Duo-Flex's Flex-Kontakte.",
                "Unterschiedliche Erwartungen an nicht-primäre Verbindungen."
            ]
        },
        pro: [
            "Gemeinsame Wertschätzung von Kommunikation und Struktur",
            "Beide verstehen nicht-exklusive Beziehungen",
            "Regeln und Grenzen sind beiden vertraut"
        ],
        contra: [
            "Unterschiedliche Tiefe der Nebenbeziehungen",
            "Polyamor's Secondaries erwarten mehr als Duo-Flex gibt",
            "Komplexität kann überwältigen",
            "Zeitmanagement ist herausfordernd"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SOLOPOLY (von) - 6 Kombinationen
    // ═══════════════════════════════════════════════════════════════════════

    "solopoly_single": {
        pathos: {
            gemeinsam: [
                "Tiefe Verwandtschaft im Autonomie-Bedürfnis.",
                "Beide verstehen: 'Ich gehöre mir selbst.'",
                "Respekt für Grenzen ist selbstverständlich.",
                "Die Freiheit des anderen wird nicht hinterfragt."
            ],
            spannung: [
                "Solopoly ist verbindungsorientiert, Single oft nicht.",
                "Solopoly erwartet Beziehungsarbeit, die der Single meidet."
            ]
        },
        logos: {
            gemeinsam: [
                "Beide priorisieren Selbstständigkeit über Verschmelzung.",
                "Keine Erwartung an Zusammenleben."
            ],
            unterschied: [
                "Solopoly führt aktiv Beziehungen, Single nicht unbedingt.",
                "Aktivitätslevel unterscheidet sich."
            ]
        },
        pro: [
            "Maximale Übereinstimmung bei Autonomie",
            "Gegenseitiger Respekt für Unabhängigkeit",
            "Keine Verschmelzungserwartung",
            "Beziehung als Wahl, nicht als Pflicht",
            "Solopoly kann dem Single zeigen, wie Verbindung ohne Verlust von Freiheit geht"
        ],
        contra: [
            "Single könnte Solopoly's Aktivität nicht erwidern",
            "Asymmetrische Beziehungsbereitschaft",
            "Solopoly erwartet mehr Engagement als Single geben will",
            "Frustration auf Solopoly-Seite möglich"
        ]
    },

    "solopoly_duo": {
        pathos: {
            spannung: [
                "Duo's Exklusivitätsbedürfnis kollidiert mit Solopoly's Lebensmodell.",
                "Solopoly kann nicht geben, was Duo braucht: Exklusivität.",
                "Das Duo wird immer mehr wollen – mehr als Solopoly strukturell bieten kann."
            ]
        },
        logos: {
            unterschied: [
                "Fundamentale Inkompatibilität der Beziehungsmodelle.",
                "Solopoly lehnt Hierarchie ab, Duo braucht sie.",
                "Zusammenleben ist für Solopoly ausgeschlossen."
            ]
        },
        pro: [
            "Duo könnte von Solopoly's Klarheit lernen",
            "Potenzial für tiefe Gespräche über Beziehungsmodelle"
        ],
        contra: [
            "Strukturelle Inkompatibilität",
            "Duo erwartet Exklusivität, Solopoly bietet sie nicht",
            "Kein Zusammenleben möglich",
            "Duo wird immer frustriert sein",
            "Keine gemeinsame Zukunftsvision",
            "Herzschmerz für das Duo wahrscheinlich"
        ]
    },

    "solopoly_duo_flex": {
        pathos: {
            gemeinsam: [
                "Beide kennen nicht-exklusive Beziehungen.",
                "Offenheit verbindet."
            ],
            spannung: [
                "Duo-Flex erwartet Hierarchie, Solopoly gibt keine.",
                "Die Primärbeziehung des Duo-Flex hat im Solopoly kein Äquivalent."
            ]
        },
        logos: {
            unterschied: [
                "Hierarchie vs. Gleichwertigkeit.",
                "Solopoly's Egalitarismus vs. Duo-Flex's Primärfokus."
            ]
        },
        pro: [
            "Gemeinsame Erfahrung mit nicht-exklusiven Beziehungen",
            "Offenheit für Gespräche über Grenzen",
            "Potenzial für bereichernde Verbindung"
        ],
        contra: [
            "Duo-Flex erwartet Sonderstellung, die Solopoly nicht gibt",
            "Unterschiedliche Hierarchie-Verständnisse",
            "Solopoly kann Duo-Flex's Primärbedürfnis nicht erfüllen"
        ]
    },

    "solopoly_solopoly": {
        pathos: {
            gemeinsam: [
                "Perfekte Spiegelung: Beide verstehen zutiefst, was der andere braucht.",
                "Freiheit als höchster Wert – geteilt und respektiert.",
                "Liebe als Geschenk, nicht als Forderung.",
                "Tiefe Verbindung ohne Verschmelzungsdruck."
            ],
            spannung: [
                "Beide sind so autonom, dass manchmal niemand die Initiative ergreift.",
                "Die Balance zwischen Verbindung und Distanz muss bewusst gehalten werden."
            ]
        },
        logos: {
            gemeinsam: [
                "Identische Beziehungsphilosophie.",
                "Beide leben in eigenen Wohnungen – kein Konflikt.",
                "Keine Hierarchie-Diskussionen nötig.",
                "Zeitmanagement ist beiden vertraut."
            ]
        },
        pro: [
            "Maximale philosophische Übereinstimmung",
            "Gegenseitiger Respekt für Autonomie ist tief verankert",
            "Keine Hierarchie-Konflikte",
            "Beziehung aus reiner Wahl, nicht aus Abhängigkeit",
            "Beide verstehen die Herausforderungen des Modells",
            "Kein Zusammenlebens-Druck"
        ],
        contra: [
            "Manchmal fehlt Initiative für Vertiefung",
            "Zu viel Distanz möglich",
            "Koordination mit anderen Partnern beider Seiten kann komplex sein",
            "Gefahr des 'Nebeneinander-her-Lebens'"
        ]
    },

    "solopoly_poly_hedo": {
        pathos: {
            gemeinsam: [
                "Beide feiern Vielfalt und Freiheit.",
                "Keine Exklusivitätserwartungen belasten die Verbindung."
            ],
            spannung: [
                "Solopoly's bewusste Struktur vs. Poly Hedo's Spontaneität.",
                "Solopoly plant, Poly Hedo lebt im Moment."
            ]
        },
        logos: {
            unterschied: [
                "Unterschiedliche Tiefe der Reflexion über Beziehungsmodelle.",
                "Solopoly ist philosophisch fundiert, Poly Hedo ist intuitiv."
            ]
        },
        pro: [
            "Gemeinsame Wertschätzung von Freiheit und Vielfalt",
            "Keine Eifersuchtsprobleme erwartet",
            "Beide sind offen für multiple Verbindungen"
        ],
        contra: [
            "Unterschiedliche Tiefe der Beziehungen",
            "Poly Hedo's Spontaneität passt nicht zu Solopoly's Planung",
            "Solopoly könnte Poly Hedo als oberflächlich empfinden",
            "Unterschiedliche Erwartungen an Kommunikation"
        ]
    },

    "solopoly_polyamor": {
        pathos: {
            gemeinsam: [
                "Beide teilen polyamore Werte: Ehrlichkeit, Kommunikation, Consent.",
                "Tiefe Verbindungen mit Mehreren sind beiden vertraut."
            ],
            spannung: [
                "Solopoly lehnt Verschmelzung ab, Polyamor praktiziert sie manchmal.",
                "Die Intensität von Polyamor's Primärbeziehungen kann Solopoly irritieren."
            ]
        },
        logos: {
            gemeinsam: [
                "Beide reflektieren bewusst über ihre Beziehungsform.",
                "Kommunikation ist zentral."
            ],
            unterschied: [
                "Solopoly lehnt Hierarchien ab, Polyamor hat oft Primary/Secondary.",
                "Unterschiedliche Strukturen trotz ähnlicher Werte."
            ]
        },
        pro: [
            "Gemeinsame polyamore Grundwerte",
            "Hohe Kommunikationskompetenz auf beiden Seiten",
            "Gegenseitiges Verständnis für nicht-monogame Lebensweisen",
            "Potenzial für tiefe, ethische Verbindung"
        ],
        contra: [
            "Hierarchie-Differenzen können Konflikte schaffen",
            "Solopoly will keine Primary-Position sein oder vergeben",
            "Unterschiedliche Erwartungen an Struktur",
            "Polyamor's Kalendermanagement kann Solopoly's Spontaneität einschränken"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // POLY HEDO (von) - 6 Kombinationen
    // ═══════════════════════════════════════════════════════════════════════

    "poly_hedo_single": {
        pathos: {
            gemeinsam: [
                "Beide feiern die Freiheit des Moments.",
                "Keine schweren Erwartungen belasten die Begegnung."
            ],
            spannung: [
                "Single sucht oft Ruhe, Poly Hedo sucht Stimulation.",
                "Die Intensität von Poly Hedo kann überwältigen."
            ]
        },
        logos: {
            gemeinsam: [
                "Beide lehnen starre Strukturen ab."
            ],
            unterschied: [
                "Unterschiedliche Energielevel und Aktivität."
            ]
        },
        pro: [
            "Gemeinsame Wertschätzung von Freiheit",
            "Potenzial für unverbindliche, intensive Begegnungen",
            "Keine Erwartungen an Langfristigkeit"
        ],
        contra: [
            "Energielevel-Unterschiede können ermüden",
            "Single könnte als 'langweilig' wahrgenommen werden",
            "Keine tiefe Verbindung erwartet"
        ]
    },

    "poly_hedo_duo": {
        pathos: {
            spannung: [
                "Duo's Erwartungen an Tiefe und Exklusivität sind für Poly Hedo einengend.",
                "Die Struktur des Duos widerspricht Poly Hedo's Spontaneität.",
                "Duo wird als 'zu ernst' empfunden."
            ]
        },
        logos: {
            unterschied: [
                "Fundamentale Inkompatibilität.",
                "Poly Hedo flieht Struktur, Duo braucht sie."
            ]
        },
        pro: [
            "Potenzial für Horizonterweiterung auf beiden Seiten"
        ],
        contra: [
            "Fundamentale Lebensphilosophie-Konflikte",
            "Duo's Exklusivität ist für Poly Hedo ein Käfig",
            "Poly Hedo kann Duo's Tiefenwunsch nicht erfüllen",
            "Keine gemeinsame Basis",
            "Gesellschaftlich völlig unterschiedliche Welten"
        ]
    },

    "poly_hedo_duo_flex": {
        pathos: {
            gemeinsam: [
                "Gemeinsame Offenheit für Vielfalt."
            ],
            spannung: [
                "Duo-Flex's Regeln sind für Poly Hedo einengend.",
                "Die Primärbeziehung des Duo-Flex wird als Einschränkung erlebt."
            ]
        },
        logos: {
            unterschied: [
                "Struktur vs. Spontaneität.",
                "Duo-Flex's Regeln vs. Poly Hedo's Freiheit."
            ]
        },
        pro: [
            "Gemeinsame Offenheit für nicht-exklusive Begegnungen",
            "Potenzial für bereichernde Erlebnisse"
        ],
        contra: [
            "Poly Hedo hasst Duo-Flex's Regelwerk",
            "Spontaneität wird durch Absprachen gebremst",
            "Unterschiedliche Erwartungen an Verbindlichkeit"
        ]
    },

    "poly_hedo_solopoly": {
        pathos: {
            gemeinsam: [
                "Beide feiern Freiheit und Vielfalt.",
                "Keine Exklusivitätskonflikte."
            ],
            spannung: [
                "Solopoly's reflektierte Planung vs. Poly Hedo's intuitive Spontaneität."
            ]
        },
        logos: {
            unterschied: [
                "Unterschiedliche Reflexionstiefe.",
                "Solopoly ist strukturierter als Poly Hedo."
            ]
        },
        pro: [
            "Gemeinsame Wertschätzung von Freiheit",
            "Beide sind offen für multiple Verbindungen",
            "Potenzial für lebendige Verbindung"
        ],
        contra: [
            "Tiefe der Beziehung kann unterschiedlich sein",
            "Solopoly's Kommunikationsbedürfnis kann Poly Hedo überfordern",
            "Unterschiedliche Erwartungen an Planung"
        ]
    },

    "poly_hedo_poly_hedo": {
        pathos: {
            gemeinsam: [
                "Perfekte Resonanz: Beide leben im Moment.",
                "Spontaneität trifft auf Spontaneität.",
                "Ekstase und Lebensfreude werden geteilt.",
                "Keine schweren Erwartungen – nur der Augenblick zählt."
            ],
            spannung: [
                "Manchmal fehlt die Tiefe für langfristige Bindung.",
                "Im Rausch der Erfahrungen kann die Richtung verloren gehen."
            ]
        },
        logos: {
            gemeinsam: [
                "Identische Lebensphilosophie: Genuss und Freiheit.",
                "Beide lehnen starre Strukturen ab."
            ]
        },
        pro: [
            "Maximale philosophische Übereinstimmung",
            "Gemeinsame Lebensfreude",
            "Keine Struktur-Konflikte",
            "Spontane, intensive Erlebnisse",
            "Gegenseitige Bereicherung durch Vielfalt"
        ],
        contra: [
            "Langfristige Tiefe kann fehlen",
            "Keine Anker in der Spontaneität",
            "Potenzial für Oberflächlichkeit",
            "Gesellschaftlich gemeinsam stigmatisiert"
        ]
    },

    "poly_hedo_polyamor": {
        pathos: {
            gemeinsam: [
                "Beide teilen die Offenheit für multiple Verbindungen."
            ],
            spannung: [
                "Polyamor's Struktur wirkt auf Poly Hedo wie ein Gefängnis.",
                "Die Kalenderverwaltung ist für Poly Hedo unerträglich.",
                "Polyamor's Tiefe vs. Poly Hedo's Breite."
            ]
        },
        logos: {
            unterschied: [
                "Strukturiert vs. spontan.",
                "Polyamor braucht Regeln, Poly Hedo flieht sie."
            ]
        },
        pro: [
            "Gemeinsame Offenheit für Polyamorie",
            "Beide sind gewohnt, mehrere Verbindungen zu haben"
        ],
        contra: [
            "Strukturkonflikt ist fundamental",
            "Poly Hedo erlebt Polyamor als zu ernst",
            "Polyamor erlebt Poly Hedo als zu oberflächlich",
            "Kalendermanagement ist für Poly Hedo unmöglich",
            "Unterschiedliche Erwartungen an emotionale Tiefe"
        ]
    },

    // ═══════════════════════════════════════════════════════════════════════
    // POLYAMOR (von) - 6 Kombinationen
    // ═══════════════════════════════════════════════════════════════════════

    "polyamor_single": {
        pathos: {
            gemeinsam: [
                "Polyamor kann dem Single Wärme bieten ohne Exklusivitätsdruck."
            ],
            spannung: [
                "Single meidet die Komplexität, die Polyamor mitbringt.",
                "Die vielen Beziehungen des Polyamor können einschüchtern."
            ]
        },
        logos: {
            unterschied: [
                "Polyamor ist hochstrukturiert, Single sucht Einfachheit.",
                "Kommunikationsintensität ist radikal unterschiedlich."
            ]
        },
        pro: [
            "Keine Exklusivitätserwartung an den Single",
            "Potenzial für bereichernde Verbindung ohne Vollzeit-Commitment",
            "Community kann unterstützend sein"
        ],
        contra: [
            "Single wird von Kommunikationsintensität überfordert",
            "Polyamor's Struktur ist für Single zu viel",
            "Single fühlt sich in der Komplexität verloren",
            "Unterschiedliche Erwartungen an Engagement"
        ]
    },

    "polyamor_duo": {
        pathos: {
            gemeinsam: [
                "Beide schätzen tiefe emotionale Verbindungen."
            ],
            spannung: [
                "Duo's Eifersucht ist für Polyamor frustrierend.",
                "Die Nicht-Exklusivität ist für Duo unerträglich."
            ]
        },
        logos: {
            unterschied: [
                "Exklusivität vs. ethische Mehrfachbeziehungen.",
                "Fundamentaler Modellkonflikt."
            ]
        },
        pro: [
            "Beide schätzen emotionale Tiefe",
            "Kommunikation ist beiden wichtig",
            "Duo könnte als Primary Sicherheit finden"
        ],
        contra: [
            "Duo kann Nicht-Exklusivität nicht akzeptieren",
            "Eifersucht ist unvermeidlich",
            "Fundamentaler Wertkonflikt",
            "Duo wird immer mehr Exklusivität wollen"
        ]
    },

    "polyamor_duo_flex": {
        pathos: {
            gemeinsam: [
                "Beide kennen die Komplexität von Mehrfachbeziehungen.",
                "Kommunikation ist beiden wichtig."
            ],
            spannung: [
                "Tiefe der Nebenbeziehungen unterscheidet sich.",
                "Polyamor's Secondaries sind tiefer als Duo-Flex's Flex-Kontakte."
            ]
        },
        logos: {
            gemeinsam: [
                "Beide arbeiten mit Regeln und Strukturen."
            ],
            unterschied: [
                "Unterschiedliche Erwartungen an nicht-primäre Verbindungen."
            ]
        },
        pro: [
            "Gemeinsames Verständnis für strukturierte Offenheit",
            "Regeln und Grenzen sind beiden vertraut",
            "Potenzial für komplementäre Verbindung"
        ],
        contra: [
            "Tiefe-Unterschiede der Nebenbeziehungen",
            "Duo-Flex erwartet weniger von Secondaries als Polyamor",
            "Unterschiedliche Zeit-Investments erwartet"
        ]
    },

    "polyamor_solopoly": {
        pathos: {
            gemeinsam: [
                "Tiefe Verwandtschaft in polyamoren Werten.",
                "Ehrlichkeit, Kommunikation, Consent verbinden."
            ],
            spannung: [
                "Hierarchie-Differenzen können belasten.",
                "Solopoly lehnt ab, was Polyamor praktiziert: Primary/Secondary."
            ]
        },
        logos: {
            gemeinsam: [
                "Beide reflektieren bewusst über Beziehungsformen.",
                "Kommunikation ist zentral."
            ],
            unterschied: [
                "Hierarchie vs. Gleichwertigkeit."
            ]
        },
        pro: [
            "Gemeinsame polyamore Grundwerte",
            "Hohe Kommunikationskompetenz beiderseits",
            "Ethische Grundlage ist identisch"
        ],
        contra: [
            "Hierarchie-Diskussionen sind unvermeidlich",
            "Solopoly will keine Hierarchie akzeptieren",
            "Strukturkonflikte möglich"
        ]
    },

    "polyamor_poly_hedo": {
        pathos: {
            spannung: [
                "Polyamor erlebt Poly Hedo als zu oberflächlich.",
                "Die fehlende Struktur von Poly Hedo ist für Polyamor chaotisch.",
                "Polyamor braucht Tiefe, Poly Hedo flieht sie."
            ]
        },
        logos: {
            unterschied: [
                "Maximaler Strukturkonflikt.",
                "Polyamor ist hochorganisiert, Poly Hedo ist spontan."
            ]
        },
        pro: [
            "Gemeinsame Offenheit für multiple Verbindungen"
        ],
        contra: [
            "Fundamentaler Strukturkonflikt",
            "Polyamor braucht Planung und Kommunikation, Poly Hedo meidet beides",
            "Unterschiedliche Erwartungen an Tiefe",
            "Polyamor erlebt Poly Hedo als verantwortungslos",
            "Poly Hedo erlebt Polyamor als zu ernst"
        ]
    },

    "polyamor_polyamor": {
        pathos: {
            gemeinsam: [
                "Perfekte Resonanz: Beide sprechen dieselbe Sprache der Liebe.",
                "Tiefe Liebe zu Mehreren ist natürlich und verstanden.",
                "'Das Herz wird größer, nicht geteilt' – geteilt und gelebt.",
                "Compersion ist beidseitig möglich.",
                "Die Komplexität wird als Bereicherung erlebt."
            ],
            spannung: [
                "Manchmal Überforderung durch die vielen emotionalen Fäden.",
                "Kalendermanagement kann stressig werden."
            ]
        },
        logos: {
            gemeinsam: [
                "Identische Beziehungsphilosophie.",
                "Beide verstehen Hierarchien, Agreements, Kommunikationsstrukturen.",
                "Regeln sind verhandelbar und verstanden.",
                "Community-Unterstützung ist gegenseitig."
            ]
        },
        pro: [
            "Maximale philosophische Übereinstimmung",
            "Identisches Beziehungsmodell",
            "Gegenseitiges Verständnis für Komplexität",
            "Compersion ist beiderseits möglich",
            "Kommunikation ist Kernkompetenz beider",
            "Community-Unterstützung beidseitig",
            "Keine Erklärungen nötig"
        ],
        contra: [
            "Hoher Koordinationsaufwand",
            "Kalenderkomplexität verdoppelt sich",
            "Zeitmanagement wird zur Herausforderung",
            "Viele emotionale Fäden können überfordern",
            "Eifersucht kann trotz Erfahrung auftreten"
        ]
    }
};

// Export für Verwendung in anderen Modulen
if (typeof module !== 'undefined' && module.exports) {
    module.exports = archetypeStatements;
}
