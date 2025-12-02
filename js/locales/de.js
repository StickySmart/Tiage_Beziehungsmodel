/**
 * DEUTSCHE ÜBERSETZUNGEN
 *
 * Alle UI-Texte für die deutsche Sprachversion.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const TiageLocale_DE = {
    code: 'de',
    name: 'Deutsch',

    // ═══════════════════════════════════════════════════════════════════════
    // ALLGEMEINE UI-TEXTE
    // ═══════════════════════════════════════════════════════════════════════

    ui: {
        title: 'Das anarchische Ti-Age Prinzip der Paarung',
        subtitle: 'Swipe',
        help: 'Hilfe',
        close: 'Schließen',
        save: 'Speichern',
        cancel: 'Abbrechen',
        send: 'Senden',
        back: 'Zurück',
        next: 'Weiter',
        loading: 'Lädt...',
        error: 'Fehler',
        success: 'Erfolgreich',

        // Person Labels
        ich: 'ICH',
        partner: 'PARTNER',

        // Status
        gelebt: 'Gelebt',
        interessiert: 'Interessiert',

        // Navigation
        page: 'Seite',
        of: 'von'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KATEGORIEN
    // ═══════════════════════════════════════════════════════════════════════

    categories: {
        A: 'Beziehungsphilosophie',
        B: 'Werte-Alignment',
        C: 'Nähe-Distanz',
        D: 'Autonomie',
        E: 'Kommunikation',
        F: 'Soziale Kompatibilität'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // DOMINANZ
    // ═══════════════════════════════════════════════════════════════════════

    dominanz: {
        label: 'Dominanz-Präferenz',
        types: {
            dominant: 'Dominant',
            submissiv: 'Submissiv',
            switch: 'Switch',
            ausgeglichen: 'Ausgeglichen'
        },
        short: {
            dominant: 'Dom',
            submissiv: 'Sub',
            switch: 'Swi',
            ausgeglichen: 'Aus'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ORIENTIERUNG
    // ═══════════════════════════════════════════════════════════════════════

    orientierung: {
        label: 'Sexuelle Orientierung',
        types: {
            heterosexuell: 'Heterosexuell',
            homosexuell: 'Homosexuell',
            bisexuell: 'Bi-/Pansexuell'
        },
        short: {
            heterosexuell: 'Hetero',
            homosexuell: 'Homo',
            bisexuell: 'Bi/Pan'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GFK-KOMPETENZ (Gewaltfreie Kommunikation)
    // ═══════════════════════════════════════════════════════════════════════

    gfk: {
        label: 'GFK-Kompetenz',
        levels: {
            niedrig: 'niedrig',
            mittel: 'mittel',
            hoch: 'hoch'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GESCHLECHT (Zwei-Dimensionales System)
    // ═══════════════════════════════════════════════════════════════════════

    geschlecht: {
        label: 'Geschlecht',
        primaryLabel: 'Körper',
        secondaryLabel: 'Identität',
        primaryHint: 'Biologisch / bei Geburt',
        secondaryHint: 'Wie du dich fühlst',
        // Primär (Körper)
        primary: {
            mann: 'Mann',
            frau: 'Frau',
            inter: 'Inter'
        },
        primaryShort: {
            mann: 'M',
            frau: 'F',
            inter: 'I'
        },
        // Sekundär (Identität)
        secondary: {
            mann: 'Mann',
            frau: 'Frau',
            nonbinaer: 'Nonbinär',
            fluid: 'Fluid',
            unsicher: 'Unsicher'
        },
        secondaryShort: {
            mann: 'M',
            frau: 'F',
            nonbinaer: 'NB',
            fluid: 'FL',
            unsicher: '?'
        },
        // Legacy (deprecated)
        types: {
            mann: 'Mann',
            frau: 'Frau',
            inter: 'Inter'
        },
        short: {
            mann: 'M',
            frau: 'F',
            inter: 'I'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // TOOLTIPS
    // ═══════════════════════════════════════════════════════════════════════

    tooltips: {
        geschlecht: {
            title: 'Geschlecht',
            text: 'Zwei Dimensionen: Körper (biologisch) und Identität (wie du dich fühlst). Dies beeinflusst die Kompatibilität zusammen mit der sexuellen Orientierung.'
        },
        geschlecht_primary: {
            title: 'Körper (Primär)',
            text: 'Dein biologisches/bei Geburt zugewiesenes Geschlecht.'
        },
        geschlecht_secondary: {
            title: 'Identität (Sekundär)',
            text: 'Wie du dich innerlich fühlst und identifizierst.'
        },
        primary_mann: {
            title: 'Mann (Körper)',
            text: 'Bei Geburt männlich zugewiesen.'
        },
        primary_frau: {
            title: 'Frau (Körper)',
            text: 'Bei Geburt weiblich zugewiesen.'
        },
        primary_inter: {
            title: 'Inter (Körper)',
            text: 'Angeborene körperliche Geschlechtsmerkmale, die nicht eindeutig männlich oder weiblich sind.'
        },
        secondary_mann: {
            title: 'Mann (Identität)',
            text: 'Du identifizierst dich als Mann.'
        },
        secondary_frau: {
            title: 'Frau (Identität)',
            text: 'Du identifizierst dich als Frau.'
        },
        secondary_nonbinaer: {
            title: 'Nonbinär (Identität)',
            text: 'Du identifizierst dich weder ausschließlich als Mann noch als Frau.'
        },
        secondary_fluid: {
            title: 'Fluid (Identität)',
            text: 'Deine Geschlechtsidentität verändert sich über Zeit oder wechselt zwischen verschiedenen Identitäten.'
        },
        secondary_unsicher: {
            title: 'Unsicher (Identität)',
            text: 'Du bist dir über deine Geschlechtsidentität noch nicht sicher oder befindest dich in einer Explorationsphase.'
        },
        dominanz: {
            title: 'Dominanz-Präferenz',
            text: 'Welche Rolle bevorzugst du in der emotionalen und praktischen Beziehungsdynamik?'
        },
        orientierung: {
            title: 'Sexuelle Orientierung',
            text: 'Zu welchem Geschlecht fühlst du dich romantisch und/oder sexuell hingezogen?'
        },
        status: {
            title: 'Orientierungs-Status',
            text: 'Gelebt: Du lebst diese Orientierung und bist dir sicher.\n\nInteressiert: Du bist neugierig oder in einer Explorationsphase.'
        },
        dominanzStatus: {
            title: 'Dominanz-Status',
            text: 'Gelebt: Du kennst deine Dominanz-Präferenz und lebst sie aktiv.\n\nInteressiert: Du bist noch am Erkunden.'
        },
        dominant: {
            title: 'Dominant',
            text: 'Der Führende - Du übernimmst gerne Führung und Verantwortung in Beziehungen.'
        },
        submissiv: {
            title: 'Submissiv',
            text: 'Der Folgende - Du lässt dich gerne führen und vertraust auf deinen Partner.'
        },
        switch: {
            title: 'Switch',
            text: 'Der Flexible - Du genießt beide Rollen je nach Situation und Partner.'
        },
        ausgeglichen: {
            title: 'Ausgeglichen',
            text: 'Der Zentrierte - Du bevorzugst eine gleichberechtigte Dynamik ohne feste Rollen.'
        },
        heterosexuell: {
            title: 'Heterosexuell',
            text: 'Anziehung zum anderen Geschlecht.'
        },
        homosexuell: {
            title: 'Homosexuell',
            text: 'Anziehung zum gleichen Geschlecht.'
        },
        bisexuell: {
            title: 'Bi-/Pansexuell',
            text: 'Anziehung zu mehreren oder allen Geschlechtern, unabhängig von Geschlechtsidentität.'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ARCHETYPEN
    // ═══════════════════════════════════════════════════════════════════════

    archetypes: {
        single: {
            name: 'Single',
            shortDef: 'Bewusste Entscheidung für ein autonomes Leben ohne Primärbeziehung als dauerhafte Lebensform.',
            keyPrinciples: [
                'Selbstgenügsamkeit als Wert, nicht als Mangel',
                'Persönliche Autonomie über Verbindlichkeit',
                'Beziehungen als Option, nicht als Notwendigkeit',
                'Erfüllung durch Selbst, Freunde, Projekte'
            ]
        },
        duo: {
            name: 'Duo',
            shortDef: 'Traditionelle monogame Zweierbeziehung mit Exklusivität und gemeinsamer Lebensgestaltung.',
            keyPrinciples: [
                "Exklusivität als Ausdruck von Verbindlichkeit",
                "'Wir' als zentrale Einheit über 'Ich'",
                'Tiefe durch Fokussierung auf eine Person',
                'Gemeinsame Lebensgestaltung und Zukunftsplanung'
            ]
        },
        duo_flex: {
            name: 'Duo-Flex',
            shortDef: 'Primäre Zweierbeziehung mit vereinbarten Öffnungen für zusätzliche Kontakte.',
            keyPrinciples: [
                'Primärbeziehung als Anker und Priorität',
                'Sexuelle/romantische Vielfalt ohne Hierarchie-Aufgabe',
                'Ehrlichkeit und Transparenz über alle Kontakte',
                'Freiheit innerhalb vereinbarter Grenzen'
            ]
        },
        solopoly: {
            name: 'Solopoly',
            shortDef: 'Mehrere gleichwertige Beziehungen bei bewusster Bewahrung der eigenen Autonomie.',
            keyPrinciples: [
                'Autonomie als höchster Wert - auch in Beziehungen',
                'Mehrere gleichwertige Beziehungen ohne Hierarchie',
                'Keine Verschmelzung oder gemeinsame Haushalte',
                "'Ich bin mein eigener Primärpartner'"
            ]
        },
        polyamor: {
            name: 'Polyamor',
            shortDef: 'Mehrere gleichzeitige, ethisch geführte Liebesbeziehungen mit Transparenz.',
            keyPrinciples: [
                'Liebe ist nicht begrenzt oder exklusiv',
                'Ehrlichkeit und Transparenz gegenüber allen',
                'Konsens und Einvernehmlichkeit als Basis',
                'Kommunikation als zentrale Kompetenz'
            ]
        },
        ra: {
            name: 'RA',
            shortDef: 'RA - Ablehnung aller Beziehungs-Hierarchien und Labels.',
            keyPrinciples: [
                'Jede Beziehung wird individuell definiert',
                'Keine vorgegebenen Kategorien oder Labels',
                'Gleichwertigkeit aller Verbindungen',
                'Radikale Autonomie und Freiheit'
            ]
        },
        lat: {
            name: 'LAT',
            shortDef: 'Living Apart Together - Feste Partnerschaft ohne Zusammenleben.',
            keyPrinciples: [
                'Verbindlichkeit ohne Zusammenleben',
                'Eigener Raum als Wert',
                'Qualitätszeit statt Quantität',
                'Bewusste Nähe durch gewählte Distanz'
            ]
        },
        aromantisch: {
            name: 'Aromantisch',
            shortDef: 'Fokus auf platonische Verbindungen ohne romantische Komponente.',
            keyPrinciples: [
                'Tiefe Verbindungen ohne Romantik',
                'Freundschaft als gleichwertiges Beziehungsmodell',
                'Authentizität jenseits romantischer Normen',
                'Platonische Liebe als vollwertige Verbindung'
            ]
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // HILFE-MODAL
    // ═══════════════════════════════════════════════════════════════════════

    help: {
        title: 'Hilfe & Dokumentation',
        quickGuide: 'Schnellanleitung',
        quickGuideSteps: [
            'Wähle deinen Beziehungs-Archetyp (ICH)',
            'Wähle den Archetyp deines Partners',
            'Klicke auf Kategorien für Details',
            'Nutze die Filter für spezifische Analysen'
        ],
        sections: {
            archetypes: 'Archetypen verstehen',
            categories: 'Kategorien erklärt',
            compatibility: 'Kompatibilität',
            tips: 'Tipps'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // KOMMENTAR-BEREICH
    // ═══════════════════════════════════════════════════════════════════════

    comments: {
        title: 'Kommentare',
        send: 'Kommentar senden',
        viewAll: 'Alle Kommentare anzeigen',
        placeholder: 'Dein Kommentar...',
        author: 'Name (optional)',
        type: 'Typ',
        types: {
            feedback: 'Feedback',
            fehler: 'Fehler melden',
            frage: 'Frage',
            verbesserung: 'Verbesserungsvorschlag',
            doku: 'Dokumentation'
        },
        search: 'Kommentare durchsuchen...',
        noComments: 'Noch keine Kommentare vorhanden.',
        reply: 'Antworten'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // VALIDIERUNG / FEHLERMELDUNGEN
    // ═══════════════════════════════════════════════════════════════════════

    validation: {
        missingDimensions: 'Bitte fülle alle erforderlichen Felder aus:',
        missingGeschlecht: 'Geschlecht',
        missingDominanz: 'Dominanz',
        missingOrientierung: 'Orientierung'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ALTERSVERIFIKATION
    // ═══════════════════════════════════════════════════════════════════════

    ageVerification: {
        title: 'Altersverifikation',
        description: 'Diese Seite enthält Inhalte über Beziehungsmodelle und ist nur für Personen ab 18 Jahren bestimmt.',
        question: 'Bist du mindestens 18 Jahre alt?',
        confirm: 'Ja, ich bin 18+',
        deny: 'Nein, ich bin unter 18',
        required: 'Diese Seite ist nur für Erwachsene (18+) zugänglich.',
        termsIntro: 'Mit dem Klick auf "Ja" bestätigst du, dass du:',
        termsAge: 'volljährig bist (mindestens 18 Jahre alt)',
        termsAccept: 'die',
        termsLinkText: 'Nutzungsbedingungen und Datenschutzerklärung',
        termsCopyright: 'zur Kenntnis nimmst, dass alle Inhalte urheberrechtlich geschützt sind',
        termsPersonal: 'die Inhalte nur für persönliche, nicht-kommerzielle Zwecke nutzt'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ARCHETYP-INFO-MODAL
    // ═══════════════════════════════════════════════════════════════════════

    archetypeModal: {
        swipeHint: '← Wischen zum Navigieren →',
        keyPrinciples: 'Kernprinzipien',
        notTheSameAs: 'Das ist NICHT',
        variants: 'Varianten',
        pathosLogos: 'Pathos & Logos',
        pathosLabel: 'Pathos (Emotionale Ebene)',
        logosLabel: 'Logos (Rationale Ebene)',
        confirmSelection: 'Auswahl übernehmen',
        definition: 'Definition'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SYNTHESE / ERGEBNISSE
    // ═══════════════════════════════════════════════════════════════════════

    synthesis: {
        title: 'Beziehungs-Synthese',
        compatibility: 'Kompatibilität',
        strengths: 'Stärken',
        challenges: 'Herausforderungen',
        recommendations: 'Empfehlungen',
        overall: 'Gesamtbewertung',
        details: 'Details anzeigen'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // HARD-KO TEXTE (Freundlich, nicht aggressiv)
    // ═══════════════════════════════════════════════════════════════════════

    hardKO: {
        title: 'Passt nicht zusammen',
        subtitle: 'Diese Kombination hat keine romantische Basis',

        // Freundliche Erklärungen je nach Grund
        reasons: {
            hetero_same_gender: 'Beide suchen jemand vom anderen Geschlecht',
            homo_different_gender: 'Beide suchen jemand vom gleichen Geschlecht',
            hetero_male_lesbian_female: 'Er sucht Frauen, sie sucht Frauen',
            lesbian_female_hetero_male: 'Sie sucht Frauen, er sucht Frauen',
            hetero_female_homo_male: 'Sie sucht Männer, er sucht Männer',
            homo_male_hetero_female: 'Er sucht Männer, sie sucht Männer'
        },

        // Positive Alternative
        friendship: 'Aber eine tiefe Freundschaft ist möglich!',

        // Philosophischer Hinweis
        philosophy: 'Körperliche Anziehung braucht eine gemeinsame Richtung.'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SOFT-KO TEXTE (Bedürfnis-Konflikte)
    // ═══════════════════════════════════════════════════════════════════════

    softKO: {
        title: 'Herausfordernde Kombination',
        subtitle: 'Starke Unterschiede in Kernbedürfnissen',

        // Erklärungen
        reasons: {
            needs_conflict: 'Eure Kernbedürfnisse unterscheiden sich deutlich',
            dynamic_mismatch: 'Die Dynamik-Präferenzen passen nicht optimal',
            values_gap: 'Unterschiedliche Prioritäten bei wichtigen Werten'
        },

        // Konstruktiver Hinweis
        growth: 'Mit bewusster Kommunikation kann das funktionieren.',

        // Bedürfnis-spezifisch
        conflictLabel: 'Konfliktpotenzial',
        needsLabel: 'Unterschiedliche Bedürfnisse'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // P↔S VALIDIERUNG (Primär-Sekundär)
    // ═══════════════════════════════════════════════════════════════════════

    psValidation: {
        complementary: 'Primär und Sekundär ergänzen sich gut',
        conflicting: 'Primär und Sekundär stehen in Spannung',
        bonusApplied: 'Bonus für komplementäre P↔S Kombination'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // DIMENSION-LABELS
    // ═══════════════════════════════════════════════════════════════════════

    dimensions: {
        geschlechtLabel: 'Geschlechtsidentität',
        dominanzLabel: 'Dominanz',
        orientierungLabel: 'Orientierung',
        gfkLabel: 'GFK-Kompetenz',
        multiSelect: '(Mehrfachauswahl)',
        legend: {
            primary: 'P',
            secondary: 'S',
            primaryFull: 'Primär',
            secondaryFull: 'Sekundär'
        },
        gfkLevels: {
            niedrig: 'niedrig',
            mittel: 'mittel',
            hoch: 'hoch'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // BEDÜRFNISSE - siehe unten bei GFK-BEDÜRFNISSE für vollständige Liste
    // ═══════════════════════════════════════════════════════════════════════

    // ═══════════════════════════════════════════════════════════════════════
    // COLUMN HEADERS
    // ═══════════════════════════════════════════════════════════════════════

    columns: {
        you: 'DU',
        partner: 'PARTNER',
        previousArchetype: 'Vorheriger Archetyp',
        nextArchetype: 'Nächster Archetyp',
        info: 'INFO',
        archetypeInfo: 'Info zum Archetyp'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ANALYSIS OVERVIEW
    // ═══════════════════════════════════════════════════════════════════════

    analysisOverview: {
        youA: 'Du:'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // FOLD/UNFOLD
    // ═══════════════════════════════════════════════════════════════════════

    foldUnfold: {
        fold: 'Einklappen',
        unfold: 'Ausklappen',
        foldAll: 'Alle einklappen',
        unfoldAll: 'Alle ausklappen'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // IMPRESSUM
    // ═══════════════════════════════════════════════════════════════════════

    impressum: {
        title: 'Impressum',
        operator: 'Betreiber',
        project: 'Projekt',
        contact: 'Kontakt'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GESCHLECHTS-INFO-MODAL
    // ═══════════════════════════════════════════════════════════════════════

    genderInfoModal: {
        title: 'Geschlecht',
        howItWorks: 'Zwei-Dimensionales System:',
        bodyLabel: 'Körper',
        bodyHint: 'Biologisches Geschlecht / bei Geburt zugewiesen',
        identityLabel: 'Identität',
        identityHint: 'Wie du dich innerlich fühlst',
        examples: 'Beispiele:',
        exampleCis: 'Mann + Mann = Cis Mann',
        exampleTrans: 'Mann + Frau = Trans Frau',
        exampleNonbinary: 'Frau + Nonbinär = Nonbinär (AFAB)',
        exampleUnsicher: 'Mann + Unsicher = In Exploration',
        understood: 'Verstanden'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // HILFE-MODAL ERWEITERT
    // ═══════════════════════════════════════════════════════════════════════

    helpModal: {
        title: 'Hilfe & Dokumentation',
        quickGuideTitle: 'Kurzanleitung',
        quickGuideItems: [
            '<strong>Mein Typ</strong> = Dein Archetyp + Eigenschaften (Orientierung, Dominanz, Geschlecht)',
            '<strong>Beziehungsqualität</strong> = Partner-Archetyp + Eigenschaften und Kompatibilitätsberechnung',
            '<strong>Gelebt</strong> = Was du aktiv lebst / <strong>Interessiert</strong> = Wofür du offen bist',
            '<strong>INFO</strong>-Button = Details zum gewählten Archetyp',
            '<strong>Ergebnis</strong> = Automatische Berechnung der Kompatibilität (4 Faktoren)',
            '<strong>Prozentwerte</strong> anklicken = Detaillierte Erklärung pro Faktor'
        ],
        newInVersion: 'Neu in Version 1.4',
        newFeatures: [
            '<strong>Gelebt/Interessiert:</strong> Wähle für jede Eigenschaft, ob du sie aktiv lebst oder nur Interesse hast',
            '<strong>Auto-Collapse:</strong> Orientierung und Dominanz Sektionen schließen automatisch nach Auswahl',
            '<strong>Verbesserte Fehlermeldungen:</strong> Fehlende Felder werden übersichtlich aufgelistet',
            '<strong>Mobile Navigation:</strong> Neue Navigationstasten in Modals für bessere Bedienung',
            '<strong>Kreisförmige Score-Anzeige:</strong> Kompatibilitätswerte werden visuell ansprechender dargestellt'
        ],
        feedbackPrompt: 'Fragen, Feedback oder Verbesserungsvorschläge?',
        sendComment: 'Kommentar senden',
        viewAllComments: 'Alle Kommentare',
        documentation: 'Dokumentation'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // SYNTHESE-BEREICH
    // ═══════════════════════════════════════════════════════════════════════

    synthesisSection: {
        creativity: 'CREATIVITY',
        dynamik: 'DYNAMIK',
        bringtMit: 'BRINGT MIT',
        darausEntsteht: 'DARAUS ENTSTEHT',
        gemeinsameBeduerfnisse: 'Gemeinsame Bedürfnisse',
        philosophischeGrundlagen: 'Philosophische Grundlagen',
        pathos: 'Pathos',
        logos: 'Logos',
        staerken: 'Stärken',
        herausforderungen: 'Herausforderungen',
        wachstumspotential: 'Wachstumspotential',
        beduerfnisUebereinstimmung: 'Bedürfnis-Übereinstimmung',
        unterschiedlichePrioritaeten: 'Unterschiedliche Prioritäten'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // FOOTER
    // ═══════════════════════════════════════════════════════════════════════

    footer: {
        datenschutz: 'Datenschutz',
        nutzungsbedingungen: 'Nutzungsbedingungen',
        impressum: 'Impressum',
        copyright: 'Alle Rechte vorbehalten',
        rechtliches: 'Rechtliches'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GFK-BEDÜRFNISSE (Gewaltfreie Kommunikation)
    // ═══════════════════════════════════════════════════════════════════════

    needs: {
        // Basis-Labels
        matchLabel: 'Bedürfnis-Übereinstimmung',
        sharedTitle: 'GEMEINSAME BEDÜRFNISSE',
        differentTitle: 'UNTERSCHIEDLICHE PRIORITÄTEN',
        valuesTitle: 'GEMEINSAME WERTE',

        // Kategorien
        categories: {
            existenz: 'Existenz',
            sicherheit: 'Sicherheit',
            zuneigung: 'Zuneigung',
            verstaendnis: 'Verständnis',
            freiheit: 'Freiheit',
            teilnahme: 'Teilnahme',
            musse: 'Muße',
            identitaet: 'Identität & Bedeutung',
            erschaffen: 'Etwas erschaffen',
            verbundenheit: 'Verbunden sein'
        },

        // Einzelne Bedürfnisse
        items: {
            // EXISTENZ
            luft: 'Luft',
            wasser: 'Wasser',
            nahrung: 'Nahrung',
            bewegung: 'Bewegung/Betätigung',
            beruehrung: 'Berührung/Körperkontakt',
            erholung: 'Erholung/Schlaf',
            sexueller_ausdruck: 'Sexueller Ausdruck',
            sicherheit_physisch: 'Physische Sicherheit',
            unterschlupf: 'Unterschlupf',

            // SICHERHEIT
            bestaendigkeit: 'Beständigkeit',
            sich_sicher_fuehlen: 'Sich sicher fühlen',
            schutz: 'Schutz',
            stabilitaet: 'Stabilität',
            leichtigkeit: 'Leichtigkeit',
            geborgenheit: 'Geborgenheit',

            // ZUNEIGUNG
            waerme: 'Wärme',
            wertschaetzung: 'Wertschätzung',
            naehe: 'Nähe',
            gesellschaft: 'Gesellschaft',
            intimitaet: 'Intimität',
            liebe: 'Liebe',
            fuersorge: 'Fürsorge',
            unterstuetzung: 'Unterstützung',
            fuereinander_da_sein: 'Füreinander da sein',

            // VERSTÄNDNIS
            akzeptanz: 'Akzeptanz',
            mitgefuehl: 'Mitgefühl',
            beruecksichtigung: 'Berücksichtigung',
            empathie: 'Empathie',
            vertrauen: 'Vertrauen',
            beachtung: 'Beachtung',
            gesehen_werden: 'Gesehen werden',
            verstanden_werden: 'Verstanden werden',
            harmonie: 'Harmonie',

            // FREIHEIT
            selbstbestimmung: 'Selbstbestimmung',
            waehlen_koennen: 'Wählen können',
            unabhaengigkeit: 'Unabhängigkeit',
            raum_haben: 'Raum haben',
            spontaneitaet: 'Spontaneität',

            // TEILNAHME
            zusammenarbeit: 'Zusammenarbeit',
            kommunikation: 'Kommunikation',
            gemeinschaft: 'Gemeinschaft',
            zugehoerigkeit: 'Zugehörigkeit',
            gegenseitigkeit: 'Gegenseitigkeit',
            respekt: 'Respekt',
            bedeutung_haben: 'Bedeutung haben',

            // MUSSE
            schoenheit: 'Schönheit',
            freizeit: 'Freizeit',
            freude: 'Freude',
            humor: 'Humor',

            // IDENTITÄT
            authentizitaet: 'Authentizität',
            echtheit: 'Echtheit',
            integritaet: 'Integrität',
            praesenz: 'Präsenz',
            ordnung: 'Ordnung',
            bewusstheit: 'Bewusstheit',
            herausforderung: 'Herausforderung',
            klarheit: 'Klarheit',
            kompetenz: 'Kompetenz',
            effizienz: 'Effizienz',
            wirksamkeit: 'Wirksamkeit',
            wachstum: 'Wachstum',
            sinn: 'Sinn',
            beitrag_leisten: 'Einen Beitrag leisten',

            // ERSCHAFFEN
            kreativitaet: 'Kreativität',
            entdecken: 'Entdecken',
            lernen: 'Lernen',
            selbst_ausdruck: 'Selbst-Ausdruck',
            anreize_bekommen: 'Anreize bekommen',

            // VERBUNDENHEIT
            leben_feiern: 'Das Leben feiern',
            inspiration: 'Inspiration',
            trauer_ausdruecken: 'Trauer ausdrücken',
            einsehen: 'Einsehen',
            anfang_ende: 'Anfang & Ende'
        }
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageLocale_DE;
}
