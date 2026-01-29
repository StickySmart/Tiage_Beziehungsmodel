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
        gelebt: 'Primär',
        interessiert: 'Sekundär',

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

    // v2.0: Neue Orientierungs-Struktur
    orientierung: {
        label: 'Sexuelle Orientierung',
        types: {
            heterosexuell: 'Heterosexuell',
            bihomo: 'Bi-/Homosexuell',
            pansexuell: 'Pansexuell',
            // LEGACY
            homosexuell: 'Bi-/Homosexuell',
            bisexuell: 'Bi-/Homosexuell'
        },
        short: {
            heterosexuell: 'Hetero',
            bihomo: 'Bi/Homo',
            pansexuell: 'Pan',
            // LEGACY
            homosexuell: 'Bi/Homo',
            bisexuell: 'Bi/Homo'
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
        secondaryLabel: 'Identität / Psychologische Seele',
        primaryHint: 'Biologisch / bei Geburt',
        secondaryHint: 'Wie du dich fühlst',
        // Primär (Körper) - v4.0: nonbinaer als direkter Wert
        primary: {
            mann: 'Mann',
            frau: 'Frau',
            inter: 'Inter',
            nonbinaer: 'Nonbinär'
        },
        primaryShort: {
            mann: 'M',
            frau: 'F',
            inter: 'I',
            nonbinaer: 'NB'
        },
        // Sekundär (Identität) - kontextabhängig von Primär
        secondary: {
            // Für P = Mann/Frau
            cis: 'Cis',
            trans: 'Trans',
            // Für P = Inter
            nonbinaer: 'Nonbinär',
            fluid: 'Fluid',
            // Gemeinsam
            unsicher: 'Unsicher',
            suchend: 'Suchend',
            // Legacy
            mann: 'Mann',
            frau: 'Frau'
        },
        secondaryShort: {
            cis: 'C',
            trans: 'T',
            nonbinaer: 'NB',
            fluid: 'FL',
            unsicher: '?',
            suchend: 'S',
            mann: 'M',
            frau: 'F'
        },
        // Experten-Modus: Detaillierte Optionen
        detailed: {
            cis_mann: 'Cis Mann',
            cis_frau: 'Cis Frau',
            trans_mann: 'Trans Mann',
            trans_frau: 'Trans Frau',
            nonbinaer: 'Nonbinär',
            genderfluid: 'Genderfluid',
            agender: 'Agender',
            intersex: 'Intersex',
            divers: 'Divers'
        },
        detailedShort: {
            cis_mann: 'CM',
            cis_frau: 'CF',
            trans_mann: 'TM',
            trans_frau: 'TF',
            nonbinaer: 'NB',
            genderfluid: 'GF',
            agender: 'AG',
            intersex: 'IX',
            divers: 'DI'
        },
        // Legacy (deprecated)
        types: {
            mann: 'Mann',
            frau: 'Frau',
            inter: 'Inter',
            // Sekundär-Typen (für zwei-dimensionales System)
            cis: 'Cis',
            trans: 'Trans',
            nonbinaer: 'Nonbinär',
            fluid: 'Fluid',
            suchend: 'Suchend',
            unsicher: 'Unsicher'
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
            text: 'Zwei Dimensionen: Körper (biologisch) und Identität / Psychologische Seele (wie du dich fühlst). Dies beeinflusst die Kompatibilität zusammen mit der sexuellen Orientierung.'
        },
        geschlecht_primary: {
            title: 'Körper (Primär)',
            text: 'Dein biologisches/bei Geburt zugewiesenes Geschlecht.'
        },
        geschlecht_secondary: {
            title: 'Identität / Psychologische Seele (Sekundär)',
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
            text: 'Primär: Du lebst diese Orientierung und bist dir sicher.\n\nSekundär: Du bist neugierig oder in einer Explorationsphase.'
        },
        dominanzStatus: {
            title: 'Dominanz-Status',
            text: 'Primär: Du kennst deine Dominanz-Präferenz und lebst sie aktiv.\n\nSekundär: Du bist noch am Erkunden.'
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
        },
        // Geschlechtsidentitäten (Legacy-Modus)
        cis_mann: {
            title: 'Cis Mann',
            text: 'Person, die bei Geburt als männlich zugewiesen wurde und sich als Mann identifiziert.'
        },
        cis_frau: {
            title: 'Cis Frau',
            text: 'Person, die bei Geburt als weiblich zugewiesen wurde und sich als Frau identifiziert.'
        },
        trans_mann: {
            title: 'Trans Mann',
            text: 'Person, die bei Geburt als weiblich zugewiesen wurde, sich aber als Mann identifiziert.'
        },
        trans_frau: {
            title: 'Trans Frau',
            text: 'Person, die bei Geburt als männlich zugewiesen wurde, sich aber als Frau identifiziert.'
        },
        nonbinaer: {
            title: 'Nonbinär',
            text: 'Person, deren Geschlechtsidentität weder ausschließlich männlich noch weiblich ist.'
        },
        genderfluid: {
            title: 'Genderfluid',
            text: 'Person, deren Geschlechtsidentität sich über Zeit verändert oder zwischen verschiedenen Identitäten wechselt.'
        },
        agender: {
            title: 'Agender',
            text: 'Person, die sich keiner Geschlechtsidentität zugehörig fühlt oder Geschlecht als Konzept ablehnt.'
        },
        intersex: {
            title: 'Intersex',
            text: 'Person mit angeborenen körperlichen Geschlechtsmerkmalen, die nicht eindeutig männlich oder weiblich sind.'
        },
        divers: {
            title: 'Divers',
            text: 'Sammelbegriff für Geschlechtsidentitäten außerhalb des binären Mann/Frau-Systems.'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // ARCHETYPEN
    // ═══════════════════════════════════════════════════════════════════════

    archetypes: {
        single: {
            name: 'Single',
            shortDef: 'Bewusste Entscheidung für ein autonomes Leben ohne Primärbeziehung als dauerhafte Lebensform.',
            longDef: 'Single-orientierte Menschen haben sich aktiv für ein Leben ohne dauerhafte romantische Partnerschaft entschieden. Dies ist keine Übergangsphase ("zwischen Beziehungen"), sondern ein bewusster Lebensstil, der Selbstgenügsamkeit und persönliche Autonomie als zentrale Werte sieht. Soziale Kontakte, Freundschaften und gelegentliche romantische/sexuelle Begegnungen sind möglich, aber keine dauerhafte Partnerschaft wird angestrebt.',
            keyPrinciples: [
                'Selbstgenügsamkeit als Wert, nicht als Mangel',
                'Persönliche Autonomie über Verbindlichkeit',
                'Beziehungen als Option, nicht als Notwendigkeit',
                'Erfüllung durch Selbst, Freunde, Projekte'
            ],
            notTheSameAs: [
                '"Zwischen Beziehungen"',
                '"Noch nicht den Richtigen gefunden"',
                'Bindungsunfähig oder Bindungsangst',
                'Einsam oder unglücklich'
            ],
            variants: [
                'Aromantisch-Single: Keine romantischen Gefühle, kein Bedürfnis danach',
                'Bewusst-autonom: Positive Entscheidung für Freiheit',
                'Beziehungskritisch: Bevorzugt Unabhängigkeit'
            ]
        },
        duo: {
            name: 'Duo',
            shortDef: 'Traditionelle monogame Zweierbeziehung mit Exklusivität und gemeinsamer Lebensgestaltung.',
            longDef: 'Duo-orientierte Menschen leben in oder suchen eine klassische Zweierbeziehung mit romantischer und sexueller Exklusivität. Die Partnerschaft steht im Zentrum der Lebensgestaltung und wird als primäre emotionale und soziale Einheit verstanden. Gemeinsame Ziele, Alltag und Zukunftsplanung werden als Paar gestaltet.',
            keyPrinciples: [
                "Exklusivität als Ausdruck von Verbindlichkeit",
                "'Wir' als zentrale Einheit über 'Ich'",
                'Tiefe durch Fokussierung auf eine Person',
                'Gemeinsame Lebensgestaltung und Zukunftsplanung',
                'Treue als emotionale und sexuelle Exklusivität'
            ],
            notTheSameAs: [
                'Besitzdenken oder Kontrolle',
                'Verlust der eigenen Identität',
                '"Alte" oder "überholte" Beziehungsform',
                'Langweilig oder unerfüllt'
            ],
            variants: [
                'Traditionell-Duo: Klassisches Ehe-Modell',
                'Modern-Duo: Ohne Trauschein, flexiblere Rollen',
                'Intensiv-Duo: Sehr enge emotionale Verschmelzung'
            ]
        },
        duo_flex: {
            name: 'Duo-Flex',
            shortDef: 'Primäre Zweierbeziehung mit vereinbarten Öffnungen für zusätzliche Kontakte.',
            longDef: 'Duo-Flex-orientierte Menschen leben in einer Hauptbeziehung mit einem Primärpartner, öffnen diese aber bewusst und einvernehmlich für zusätzliche Kontakte. Die Primärbeziehung bleibt zentral und privilegiert. Alle Öffnungen sind transparent und nach gemeinsam vereinbarten Regeln.',
            keyPrinciples: [
                'Primärbeziehung als Anker und Priorität',
                'Sexuelle/romantische Vielfalt ohne Hierarchie-Aufgabe',
                'Ehrlichkeit und Transparenz über alle Kontakte',
                'Regeln schützen die Hauptbeziehung',
                'Freiheit innerhalb vereinbarter Grenzen'
            ],
            notTheSameAs: [
                'Fremdgehen oder Betrug (alles ist abgesprochen!)',
                '"Beziehung retten" durch Öffnung',
                'Mangelnde Verbindlichkeit',
                'Übergangsphase zu Polyamorie'
            ],
            variants: [
                'Swinging/Lifestyle: Gemeinsame sexuelle Erfahrungen',
                'Offene Beziehung: Individuelle sexuelle Freiheit',
                'Hierarchische Poly: Primärpartner + Sekundärbeziehungen'
            ]
        },
        solopoly: {
            name: 'Solopoly',
            shortDef: 'Mehrere gleichwertige Beziehungen bei bewusster Bewahrung der eigenen Autonomie.',
            longDef: 'Solopoly-orientierte Menschen haben mehrere romantische und/oder sexuelle Beziehungen parallel, ohne eine davon als "Hauptbeziehung" zu priorisieren. Die persönliche Autonomie steht im Zentrum: Kein Zusammenziehen, keine gemeinsame Haushaltsführung. "Ich bin mein eigener Primärpartner".',
            keyPrinciples: [
                'Autonomie als höchster Wert - auch in Beziehungen',
                'Mehrere gleichwertige Beziehungen ohne Hierarchie',
                'Keine Verschmelzung oder gemeinsame Haushalte',
                "'Ich bin mein eigener Primärpartner'",
                'Liebe ohne Aufgabe der Unabhängigkeit'
            ],
            notTheSameAs: [
                'Bindungsangst oder Bindungsprobleme',
                '"Light-Version" von Polyamorie',
                'Egoistisch oder beziehungsunfähig',
                'Zwischenstufe zu "echter" Partnerschaft'
            ],
            variants: [
                'Stark-autonom: Sehr klare Grenzen',
                'Beziehungs-balanciert: Tiefe Beziehungen, getrennte Wohnungen',
                'Netzwerk-orientiert: Viele gleichwertige Verbindungen'
            ]
        },
        polyamor: {
            name: 'Polyamor',
            shortDef: 'Mehrere gleichzeitige, ethisch geführte Liebesbeziehungen mit Transparenz.',
            longDef: 'Polyamore Menschen leben mehrere romantische Beziehungen gleichzeitig, alle mit dem Wissen und Einverständnis aller Beteiligten. Anders als bei Duo-Flex gibt es oft keine klare Hierarchie - alle Beziehungen können gleich wichtig sein.',
            keyPrinciples: [
                'Liebe ist nicht begrenzt oder exklusiv',
                'Ehrlichkeit und Transparenz gegenüber allen',
                'Konsens und Einvernehmlichkeit als Basis',
                'Kommunikation als zentrale Kompetenz',
                'Jede Beziehung hat ihren eigenen Wert'
            ],
            notTheSameAs: [
                'Fremdgehen oder Geheimniskrämerei',
                '"Alles haben wollen"',
                'Bindungsunfähig',
                'Nur auf Sex ausgerichtet'
            ],
            variants: [
                'Kitchen-Table-Poly: Alle Partner kennen und mögen sich',
                'Parallel-Poly: Beziehungen existieren getrennt',
                'Polycule: Netzwerk aus verbundenen Beziehungen'
            ]
        },
        ra: {
            name: 'RA',
            shortDef: 'RA - Ablehnung aller Beziehungs-Hierarchien und Labels.',
            longDef: 'RAs hinterfragen radikal alle gesellschaftlichen Beziehungsnormen. Keine Beziehung ist "höher" als eine andere - Freundschaften können genauso wichtig sein wie romantische Beziehungen. Jede Verbindung wird individuell definiert, ohne externe Vorlagen.',
            keyPrinciples: [
                'Keine Hierarchien zwischen Beziehungstypen',
                'Jede Beziehung wird individuell definiert',
                'Ablehnung gesellschaftlicher Beziehungsnormen',
                'Autonomie als höchster Wert',
                'Keine Besitzansprüche auf andere Menschen'
            ],
            notTheSameAs: [
                'Beziehungsunfähig oder Bindungsangst',
                'Chaotisch oder ohne Regeln',
                'Verantwortungslos',
                'Gegen Verbindlichkeit generell'
            ],
            variants: [
                'Anarchisch-vernetzt: Viele gleichwertige Verbindungen',
                'Philosophisch-RA: Tiefe Reflexion über Normen',
                'Pragmatisch-RA: Flexible Anwendung der Prinzipien'
            ]
        },
        lat: {
            name: 'LAT',
            shortDef: 'Living Apart Together - Feste Partnerschaft ohne Zusammenleben.',
            longDef: 'LAT-orientierte Menschen wünschen sich tiefe, verbindliche Beziehungen, aber mit klarer räumlicher und alltäglicher Autonomie. Die eigenen vier Wände sind kein Zeichen von Distanz, sondern von gesunder Selbstfürsorge.',
            keyPrinciples: [
                'Liebe braucht kein gemeinsames Dach',
                'Eigener Rückzugsraum ist essentiell',
                'Qualitätszeit statt Quantität',
                'Autonomie im Alltag',
                'Bewusste Entscheidung für Nähe'
            ],
            notTheSameAs: [
                'Fernbeziehung (ungewollte Distanz)',
                'Übergangsphase vor dem Zusammenziehen',
                'Bindungsangst',
                '"Die Beziehung nicht ernst nehmen"'
            ],
            variants: [
                'Nahbereichs-LAT: Nah beieinander, aber getrennt wohnen',
                'Wochenend-LAT: Am Wochenende zusammen, unter der Woche getrennt',
                'Flexibles-LAT: Wechselnde Zeitanteile zusammen'
            ]
        },
        aromantisch: {
            name: 'Aromantisch',
            shortDef: 'Fokus auf platonische Verbindungen ohne romantische Komponente.',
            longDef: 'Aromantische Menschen empfinden wenig oder keine romantische Anziehung. Sie können trotzdem tiefe, bedeutungsvolle Beziehungen haben - nur ohne romantische Komponente. Freundschaft, Familie und andere Verbindungen sind genauso wertvoll.',
            keyPrinciples: [
                'Tiefe Verbindungen ohne Romantik',
                'Freundschaft als gleichwertiges Beziehungsmodell',
                'Authentizität jenseits romantischer Normen',
                'Platonische Liebe als vollwertige Verbindung',
                'Selbstwert unabhängig von romantischen Beziehungen'
            ],
            notTheSameAs: [
                'Kalt oder gefühllos',
                'Unfähig zu lieben',
                'Asexuell (das ist ein anderes Spektrum)',
                'Einfach noch nicht die richtige Person gefunden'
            ],
            variants: [
                'Voll-Aromantisch: Gar keine romantische Anziehung',
                'Grauromantisch: Selten romantische Anziehung',
                'Queerplatonisch: Tiefe, verbindliche nicht-romantische Partnerschaften'
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
        cookieConsent: 'Ich akzeptiere die Verwendung von Cookies und LocalStorage zur Speicherung meiner Eingaben und Präferenzen. Diese Daten werden nur lokal in meinem Browser gespeichert.',
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
    // REIBUNGS-TEXTE v4.0 (ersetzt K.O.-Texte)
    // ═══════════════════════════════════════════════════════════════════════
    // Philosophie: Nichts ist unmöglich, nur unterschiedlich herausfordernd.
    // Score 0% = 100% Reibung = maximale Herausforderung (nicht "unmöglich")

    hardKO: {  // Legacy-Key für Abwärtskompatibilität
        title: 'Hohe Reibung',
        subtitle: 'Diese Kombination erfordert besondere Bewusstheit',

        // Reibungs-Hinweise statt "Gründe"
        reasons: {
            hetero_same_gender: 'Unterschiedliche Orientierungsrichtungen',
            homo_different_gender: 'Orientierungen zeigen in verschiedene Richtungen',
            hetero_male_lesbian_female: 'Unterschiedliche Anziehungsmuster',
            lesbian_female_hetero_male: 'Verschiedene Anziehungsrichtungen',
            hetero_female_homo_male: 'Orientierungen sind nicht aufeinander gerichtet',
            homo_male_hetero_female: 'Verschiedene Anziehungsrichtungen'
        },

        // RTI-Hinweis (Säule S1 - Leiblichkeit)
        friendship: 'Andere Beziehungsformen sind möglich!',

        // Multi-Perspektiven-Hinweis
        philosophy: 'Hohe Reibung bedeutet Wachstumspotenzial, nicht Unmöglichkeit.'
    },

    // Reibungs-Stufen (ersetzt softKO)
    softKO: {  // Legacy-Key für Abwärtskompatibilität
        title: 'Mittlere Reibung',
        subtitle: 'Unterschiede in wichtigen Bereichen',

        // Reibungs-Hinweise
        reasons: {
            needs_conflict: 'Eure Bedürfnisse haben unterschiedliche Ausprägungen',
            dynamic_mismatch: 'Die Dynamik-Stile unterscheiden sich',
            values_gap: 'Verschiedene Prioritäten bei Werten'
        },

        // GFK-Hinweis
        growth: 'Reibung ist Wachstumspotenzial - mit Bewusstheit wird daraus Entwicklung.',

        // Reibungs-spezifisch
        conflictLabel: 'Reibungspotenzial',
        needsLabel: 'Unterschiedliche Bedürfnisausprägungen'
    },

    // Neue Reibungs-Stufen
    reibung: {
        stufen: {
            keine: { label: 'Keine Reibung', emoji: '✨', range: '90-100%' },
            leicht: { label: 'Leichte Reibung', emoji: '🌱', range: '70-89%' },
            mittel: { label: 'Mittlere Reibung', emoji: '🔧', range: '40-69%' },
            hoch: { label: 'Hohe Reibung', emoji: '⚡', range: '10-39%' },
            maximal: { label: 'Maximale Reibung', emoji: '🔥', range: '0-9%' }
        },
        // Perspektiven-Hinweise
        hinweise: {
            pirsig: 'Qualität entsteht durch Integration von Unterschieden',
            osho: 'Jede Konditionierung kann bewusst überwunden werden',
            gfk: 'Hinter jeder Reibung stehen erfüllbare Bedürfnisse',
            rti: 'Die 5 Säulen der Identität zeigen Entwicklungspotenziale'
        }
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
        intro: 'Wähle dein Geschlecht:',
        optionMann: 'Mann',
        optionMannDesc: 'Du identifizierst dich als Mann.',
        optionFrau: 'Frau',
        optionFrauDesc: 'Du identifizierst dich als Frau.',
        optionNonbinaer: 'Nonbinär',
        optionNonbinaerDesc: 'Du identifizierst dich weder ausschließlich als Mann noch als Frau.',
        note: 'Hinweis: Untergruppen wie Cis/Trans existieren, werden aber in dieser App nicht unterschieden, da sie für die Kompatibilitätsberechnung keine Rolle spielen.',
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
            '<strong>Primär</strong> = Was du aktiv lebst / <strong>Sekundär</strong> = Wofür du offen bist',
            '<strong>INFO</strong>-Button = Details zum gewählten Archetyp',
            '<strong>Ergebnis</strong> = Automatische Berechnung der Kompatibilität (4 Faktoren)',
            '<strong>Prozentwerte</strong> anklicken = Detaillierte Erklärung pro Faktor'
        ],
        newInVersion: 'Neu in Version 1.4',
        newFeatures: [
            '<strong>Primär/Sekundär:</strong> Wähle für jede Eigenschaft, ob du sie aktiv lebst oder nur Interesse hast',
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

    // ═══════════════════════════════════════════════════════════════════════
    // TEXT-TO-SPEECH
    // ═══════════════════════════════════════════════════════════════════════

    tts: {
        play: 'Vorlesen',
        pause: 'Pausieren',
        stop: 'Stoppen',
        resume: 'Fortsetzen',
        notSupported: 'Vorlesen wird in diesem Browser nicht unterstützt'
    },

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
            verbundenheit: 'Verbunden sein',
            dynamik: 'Dynamik & Austausch'
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
            anfang_ende: 'Anfang & Ende',

            // DYNAMIK & AUSTAUSCH
            kontrolle_ausueben: 'Kontrolle ausüben',
            hingabe: 'Hingabe',
            fuehrung_geben: 'Führung geben',
            gefuehrt_werden: 'Geführt werden',
            ritual: 'Rituale & Struktur',
            nachsorge: 'Nachsorge/Aftercare',
            grenzen_setzen: 'Grenzen setzen',
            grenzen_respektieren: 'Grenzen respektieren',
            intensitaet: 'Intensität erleben',
            vertrauen_schenken: 'Vertrauen schenken',
            verantwortung_uebernehmen: 'Verantwortung übernehmen',
            sich_fallenlassen: 'Sich fallenlassen',
            machtaustausch: 'Machtaustausch',
            dienend_sein: 'Dienend sein',
            beschuetzen: 'Beschützen'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════════
    // PROFILE REVIEW (v1.8)
    // ═══════════════════════════════════════════════════════════════════════════════

    profileReview: {
        title: 'Alle vorausgefüllten Attribute',

        // Quellen-Erklärung für die Attribut-Herkunft
        sourceExplanation: {
            title: 'Woher kommen diese Werte?',
            intro: 'Diese Attribute wurden automatisch berechnet basierend auf:',
            note: 'Tiage nutzt 864 psychologische Profile aus Beziehungsforschung (Gottman, Esther Perel, u.a.). Die Werte basieren auf der Gaußschen Normalverteilung der Bevölkerung (Europa, Amerika, Asien): 80% bewerten die Wichtigkeit eines Bedürfnisses zwischen 30-70 von 100 Punkten.',
            helpLink: 'Mehr in der Hilfe'
        },

        categories: {
            geschlechtsidentitaet: 'GESCHLECHTSIDENTITÄT',
            lebensplanung: 'LEBENSPLANUNG',
            finanzen: 'FINANZEN & KARRIERE',
            kommunikation: 'KOMMUNIKATION',
            soziales: 'SOZIALES',
            intimitaet: 'INTIMITÄT',
            werte: 'WERTE',
            praktisches: 'PRAKTISCHES'
        },

        attributes: {
            // ═══════════════════════════════════════════════════════════════════════
            // GESCHLECHTSIDENTITÄT
            // ═══════════════════════════════════════════════════════════════════════
            geschlechtSekundaer: {
                label: 'Geschlechtsidentität',
                description: 'Geschlechtsidentität: Cis (Identität = Körper), Trans (Identität ≠ Körper), Suchend (in Exploration). Bei Inter: Nonbinär, Fluid, Suchend.',
                info: {
                    stats: 'Ca. 0,5-1% der Bevölkerung identifizieren sich als trans oder nonbinär (Williams Institute, 2022). Tendenz steigend durch höhere Akzeptanz.',
                    research: 'Identitätskongruenz korreliert mit 40% höherem Wohlbefinden (American Psychological Association). Partner-Akzeptanz ist stärkster Prädiktor für Beziehungszufriedenheit.',
                    pirsig: 'Die Suche nach authentischer Identität ist dynamische Qualität. Cis bedeutet nicht automatisch weniger Bewusstsein - die bewusste Bestätigung der eigenen Identität ist ebenso wertvoll.',
                    osho: 'Du bist nicht der Körper, du bist nicht der Geist. Finde heraus, wer du wirklich bist - jenseits aller Labels und Zuschreibungen.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // LEBENSPLANUNG
            // ═══════════════════════════════════════════════════════════════════════
            kinder: {
                label: 'Kinderwunsch',
                description: 'Wunsch nach eigenen Kindern oder Offenheit dafür in der Zukunft.',
                info: {
                    stats: 'Frage: "Wünschen Sie sich Kinder?" – 79% der Frauen und 72% der Männer (21-25 J.) äußern Kinderwunsch (BZgA 2023). 56% bewerten übereinstimmende Familienplanung als wichtig für die Partnersuche (Parship).',
                    research: '9% haben schon eine Trennung wegen unterschiedlicher Kinderwünsche erlebt (ElitePartner). Gottman-Institut: 94% der Paare mit Kinderwunsch-Differenz trennen sich langfristig ohne Kompromiss.',
                    pirsig: 'Ein Kind ist weder Projekt noch Pflicht. Die Frage ist nicht "soll ich?", sondern "warum will ich?" - und ob beide Antworten harmonieren.',
                    osho: 'Kinder sind keine Fortsetzung deines Egos. Sie sind eigenständige Seelen, die durch dich kommen, aber nicht dir gehören.'
                }
            },
            ehe: {
                label: 'Ehe-Wunsch',
                description: 'Bedeutung einer formellen Eheschließung für die Beziehung.',
                info: {
                    stats: '60% der Deutschen sehen Ehe als wichtig (Allensbach 2023). Bei unter 30-Jährigen nur noch 42%.',
                    research: 'Studien zeigen keinen signifikanten Unterschied in Beziehungszufriedenheit zwischen verheirateten und unverheirateten Langzeitpaaren.',
                    pirsig: 'Die Ehe ist ein statisches Muster. Ihre Qualität liegt nicht im Vertrag, sondern in der täglichen Entscheidung füreinander.',
                    osho: 'Ehe kann ein Gefängnis oder ein Tempel sein. Es hängt davon ab, ob sie aus Angst oder aus Liebe geschlossen wird.'
                }
            },
            zusammen: {
                label: 'Zusammen wohnen',
                description: 'Präferenz für gemeinsames Wohnen oder getrennte Haushalte.',
                info: {
                    stats: '8% der deutschen Paare leben in LAT-Beziehungen (getrennte Haushalte). Bei über 60-Jährigen sind es 15%.',
                    research: 'LAT-Paare berichten 12% höhere Beziehungsqualität bei gleichbleibender emotionaler Nähe (University of Missouri).',
                    pirsig: 'Räumliche Nähe ist nicht gleich emotionale Nähe. Qualität entsteht durch bewusste Präsenz, nicht durch physische Dauernähe.',
                    osho: 'Zwei Menschen können im selben Raum allein sein - oder in verschiedenen Städten verbunden. Wahre Intimität braucht keinen gemeinsamen Schlüssel.'
                }
            },
            haustiere: {
                label: 'Haustiere',
                description: 'Einstellung zu Haustieren im gemeinsamen Haushalt.',
                info: {
                    stats: '47% der deutschen Haushalte haben Haustiere. 78% der Tierhalter sehen ihr Tier als Familienmitglied.',
                    research: 'Haustierbesitzer zeigen 20% niedrigere Cortisol-Werte. Gemeinsame Tierpflege stärkt die Paarbindung.',
                    pirsig: 'Ein Tier lehrt uns etwas, das in Beziehungen essentiell ist: bedingungslose Präsenz ohne Erwartung an Veränderung.',
                    osho: 'Tiere leben im Jetzt. Sie erinnern uns daran, dass Liebe kein Denken braucht - nur Sein.'
                }
            },
            umzug: {
                label: 'Umzugsbereitschaft',
                description: 'Bereitschaft, für die Beziehung den Wohnort zu wechseln.',
                info: {
                    stats: '35% der Deutschen würden für die Liebe umziehen. Bei unter 30-Jährigen sind es 58%.',
                    research: 'Fernbeziehungen haben gleiche Erfolgsrate wie Nahbeziehungen - sofern ein gemeinsames Ziel existiert.',
                    pirsig: 'Flexibilität ist dynamische Qualität. Die Frage ist nicht, wer umzieht, sondern: Wächst die Beziehung durch diese Entscheidung?',
                    osho: 'Wurzeln und Flügel - wer nur Wurzeln hat, kann nicht fliegen. Wer nur Flügel hat, findet keine Ruhe. Die Kunst ist beides.'
                }
            },
            familie: {
                label: 'Familie-Wichtigkeit',
                description: 'Stellenwert der Herkunftsfamilie und regelmäßiger Kontakt.',
                info: {
                    stats: '67% der Deutschen sehen ihre Herkunftsfamilie mindestens monatlich. 12% haben keinen Kontakt.',
                    research: 'In-Law-Konflikte sind in 40% der Scheidungen ein Hauptfaktor (Terling-Watt Studie).',
                    pirsig: 'Familie ist ein statisches Muster aus der Vergangenheit. Die Kunst ist, es zu ehren ohne sich davon definieren zu lassen.',
                    osho: 'Du kannst deine Eltern lieben, ohne ihren Wünschen zu folgen. Respekt bedeutet nicht Gehorsam.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // FINANZEN & KARRIERE
            // ═══════════════════════════════════════════════════════════════════════
            finanzen: {
                label: 'Finanzen',
                description: 'Umgang mit Geld: getrennte Konten, Mischform oder gemeinsame Kasse.',
                info: {
                    stats: '42% der Paare haben komplett getrennte Finanzen. 31% ein Drei-Konten-Modell. 27% gemeinsame Kasse.',
                    research: 'Geld ist Streitthema Nr. 1 bei Paaren. Transparenz reduziert Konflikte um 70% (Kansas State University).',
                    pirsig: 'Geld ist ein Werkzeug, kein Maßstab für Wert. Die Frage ist nicht wieviel, sondern: Dient es eurer gemeinsamen Qualität?',
                    osho: 'Geld ist wie Wasser - es muss fließen. Wer es festhält, erstickt. Wer es teilen kann, wird reich an Vertrauen.'
                }
            },
            karriere: {
                label: 'Karriere-Priorität',
                description: 'Gewichtung zwischen beruflichem Erfolg und Familienleben.',
                info: {
                    stats: '58% der Deutschen priorisieren Work-Life-Balance über Karriere (Gallup 2023).',
                    research: 'Dual-Career-Paare haben höhere Scheidungsraten - aber nur wenn traditionelle Rollenerwartungen bestehen.',
                    pirsig: 'Karriere ohne Sinn ist Hamsterrad. Sinn ohne Handeln ist Träumerei. Qualität liegt in der Integration beider.',
                    osho: 'Arbeit kann Meditation sein - wenn du nicht für Anerkennung arbeitest, sondern weil die Arbeit selbst Freude ist.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // KOMMUNIKATION
            // ═══════════════════════════════════════════════════════════════════════
            gespraech: {
                label: 'Gesprächsbedürfnis',
                description: 'Bedürfnis nach täglichem Austausch und Gesprächen.',
                info: {
                    stats: 'Glückliche Paare sprechen durchschnittlich 5+ Stunden pro Woche miteinander (exkl. Alltagslogistik).',
                    research: 'Gottman: "Bid-Response-Ratio" über 85% = stabile Beziehung. Unter 33% = hohes Trennungsrisiko.',
                    pirsig: 'Worte können Brücken oder Mauern sein. Qualität entsteht nicht durch Menge, sondern durch echtes Hinhören.',
                    osho: 'Wahre Kommunikation geschieht in der Stille zwischen den Worten. Wer zuhören kann, muss nicht viel reden.'
                }
            },
            emotional: {
                label: 'Emotionale Offenheit',
                description: 'Bereitschaft, Gefühle und Emotionen zu teilen.',
                info: {
                    stats: 'Männer teilen Gefühle durchschnittlich 60% seltener als Frauen (Meta-Analyse, 2021).',
                    research: 'Emotionale Selbstoffenbarung erhöht Intimität um 45% - aber nur bei reziproker Offenheit.',
                    pirsig: 'Gefühle zu zeigen erfordert Mut zur Verletzlichkeit. Das ist keine Schwäche, sondern höchste Qualität des Menschseins.',
                    osho: 'Wenn du deine Tränen versteckst, versteckst du auch dein Lachen. Authentizität kennt keine Halbheiten.'
                }
            },
            konflikt: {
                label: 'Konfliktverhalten',
                description: 'Art der Konfliktbewältigung: ausweichen oder direkt ansprechen.',
                info: {
                    stats: '44% der Paare vermeiden Konflikte. 23% eskalieren regelmäßig. 33% lösen konstruktiv.',
                    research: 'Gottman: Konflikt-Vermeidung ist schädlicher als Streit. Entscheidend ist das Verhältnis: 5:1 positiv zu negativ.',
                    pirsig: 'Konflikt ist nicht das Problem - Stillstand ist es. Dynamische Qualität entsteht durch Reibung, nicht durch Vermeidung.',
                    osho: 'Streit kann reinigend sein wie ein Gewitter. Nicht der Streit zerstört, sondern das Unausgesprochene.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // SOZIALES
            // ═══════════════════════════════════════════════════════════════════════
            introextro: {
                label: 'Intro-/Extrovertiert',
                description: 'Energie durch Alleinsein (Intro) oder soziale Kontakte (Extro).',
                info: {
                    stats: '25-40% der Bevölkerung sind introvertiert. Ambivertierte bilden die größte Gruppe.',
                    research: 'Intro-Extro-Paare können gut funktionieren, wenn beide ihre Unterschiede respektieren statt ändern zu wollen.',
                    pirsig: 'Introversion ist keine Schüchternheit, Extroversion keine Oberflächlichkeit. Beides sind legitime Wege zur Qualität.',
                    osho: 'Der Introvertierte sucht die Tiefe, der Extrovertierte die Weite. Beide suchen das Gleiche auf unterschiedlichen Wegen.'
                }
            },
            alleinzeit: {
                label: 'Alleinzeit-Bedürfnis',
                description: 'Bedürfnis nach Zeit für sich alleine ohne Partner.',
                info: {
                    stats: '72% der Menschen brauchen regelmäßig Alleinzeit. 28% fühlen sich dabei einsam.',
                    research: 'Partner, die individuelle Zeit respektieren, berichten 30% höhere Beziehungszufriedenheit.',
                    pirsig: 'Alleinzeit ist nicht Abwesenheit von Liebe - sie ist Anwesenheit bei sich selbst. Nur wer sich selbst kennt, kann sich geben.',
                    osho: 'Einsamkeit und Alleinsein sind grundverschieden. Alleinsein ist voller Freude - Einsamkeit ist Armut trotz Gesellschaft.'
                }
            },
            freunde: {
                label: 'Freundeskreis',
                description: 'Präferenz für eigene Freunde oder gemeinsamen Freundeskreis.',
                info: {
                    stats: '61% der Paare teilen größtenteils den Freundeskreis. 15% haben komplett getrennte Freunde.',
                    research: 'Gemeinsame Freunde stabilisieren Beziehungen - erhöhen aber auch den sozialen Druck bei Trennungen.',
                    pirsig: 'Freundschaften außerhalb der Beziehung sind keine Bedrohung - sie sind Nahrung für die Individualität.',
                    osho: 'Eine Beziehung, die keine anderen Beziehungen erlaubt, ist ein Gefängnis, keine Liebe.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // INTIMITÄT
            // ═══════════════════════════════════════════════════════════════════════
            naehe: {
                label: 'Körperliche Nähe',
                description: 'Bedürfnis nach Berührungen, Umarmungen und körperlicher Nähe.',
                info: {
                    stats: 'Menschen brauchen 4-12 Umarmungen täglich für emotionales Wohlbefinden (Virginia Satir).',
                    research: '20-Sekunden-Umarmungen setzen Oxytocin frei und senken Blutdruck und Cortisol signifikant.',
                    pirsig: 'Körperliche Berührung ist nonverbale Kommunikation höchster Qualität. Sie braucht keine Interpretation.',
                    osho: 'Der Körper ist der Tempel. Eine Berührung kann mehr sagen als tausend Worte - wenn sie bewusst geschieht.'
                }
            },
            romantik: {
                label: 'Romantik-Bedürfnis',
                description: 'Wunsch nach romantischen Gesten, Überraschungen und Dates.',
                info: {
                    stats: '67% der Frauen und 51% der Männer wünschen sich mehr Romantik in der Beziehung.',
                    research: 'Regelmäßige Date-Nights erhöhen die Beziehungszufriedenheit um 36% (National Marriage Project).',
                    pirsig: 'Romantik ist kein Kitsch - es ist bewusste Aufmerksamkeit für die Außergewöhnlichkeit des Gewöhnlichen.',
                    osho: 'Romantik stirbt, wenn Liebe zur Gewohnheit wird. Halte die Augen des Anfangs offen.'
                }
            },
            sex: {
                label: 'Sexuelle Frequenz',
                description: 'Gewünschte Häufigkeit von Intimität in der Beziehung.',
                info: {
                    stats: 'Deutsche Paare haben durchschnittlich 1,5x pro Woche Sex. 15% sind in "sexless marriages" (<10x/Jahr).',
                    research: 'Frequenz korreliert wenig mit Zufriedenheit. Entscheidend ist, ob beide sich verstanden fühlen.',
                    pirsig: 'Sexualität ist nicht quantifizierbar. Die Qualität liegt im Präsentsein, nicht in der Statistik.',
                    osho: 'Sex kann Meditation sein - wenn er aus Präsenz entsteht statt aus Verlangen. Dann ist einmal wie tausendmal.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // WERTE
            // ═══════════════════════════════════════════════════════════════════════
            religion: {
                label: 'Religiosität',
                description: 'Bedeutung von Religion und Spiritualität im Alltag.',
                info: {
                    stats: '52% der Deutschen glauben an Gott. 27% praktizieren aktiv. Interreligiöse Ehen bei 24%.',
                    research: 'Religiöse Homogamie (gleicher Glaube) korreliert mit längeren Ehen - aber Atheisten haben ähnliche Stabilität.',
                    pirsig: 'Religion ist ein Versuch, statische Qualität zu greifen. Spiritualität lebt in der dynamischen Suche selbst.',
                    osho: 'Religion sollte kein Glaubensbekenntnis sein, sondern eine Erfahrung. Was du nicht selbst erlebt hast, ist nur Information.'
                }
            },
            tradition: {
                label: 'Tradition vs. Modern',
                description: 'Orientierung an traditionellen Werten oder modernen Lebensweisen.',
                info: {
                    stats: '38% der Deutschen bevorzugen traditionelle Werte. Generationenunterschied: 60+ vs. 18-30 = 52% vs. 21%.',
                    research: 'Wertekongruenz ist wichtiger als die Richtung. Gemischte Paare (trad+modern) berichten mehr Konflikte.',
                    pirsig: 'Tradition ist statische Qualität - wertvoll, wenn sie trägt, hinderlich, wenn sie fesselt. Die Kunst ist die Unterscheidung.',
                    osho: 'Tradition ist die Asche des Feuers vergangener Generationen. Suche das Feuer, nicht die Asche.'
                }
            },
            umwelt: {
                label: 'Umweltbewusstsein',
                description: 'Wichtigkeit von Nachhaltigkeit und umweltbewusstem Leben.',
                info: {
                    stats: '68% der Deutschen halten Klimaschutz für wichtig. 23% ändern aktiv ihr Verhalten.',
                    research: 'Werte-Diskrepanz bei Nachhaltigkeit führt zu täglichen Mikrokonflikten (Einkauf, Mobilität, Konsum).',
                    pirsig: 'Umweltbewusstsein ist die Erkenntnis, dass wir nicht getrennt von der Natur sind. Jede Handlung hat Konsequenzen.',
                    osho: 'Die Erde ist nicht dein Besitz - du bist ihr Gast. Gäste hinterlassen das Haus schöner als sie es vorgefunden haben.'
                }
            },

            // ═══════════════════════════════════════════════════════════════════════
            // PRAKTISCHES
            // ═══════════════════════════════════════════════════════════════════════
            ordnung: {
                label: 'Ordnung',
                description: 'Präferenz für Ordnung und Sauberkeit im Wohnbereich.',
                info: {
                    stats: 'Haushaltsführung ist Top-5 Streitthema bei Paaren. 62% der Frauen tragen Hauptlast - mit sinkender Tendenz.',
                    research: 'Ungleiche Haushaltsverteilung reduziert sexuelle Zufriedenheit bei Frauen um 50%.',
                    pirsig: 'Ordnung ist nicht Kontrolle - es ist Klarheit des Raumes für Klarheit des Geistes.',
                    osho: 'Äußere Ordnung reflektiert innere Ordnung. Aber zwanghaftes Aufräumen kann auch Flucht vor dem inneren Chaos sein.'
                }
            },
            reise: {
                label: 'Reise-Frequenz',
                description: 'Wunsch nach Reisen und gemeinsamen Urlauben.',
                info: {
                    stats: 'Deutsche verreisen durchschnittlich 2,4x pro Jahr. 18% nie. Reiseunterschiede sind häufiger Konflikt.',
                    research: 'Gemeinsame Erlebnisse (nicht materielle Geschenke) stärken die Paarbindung langfristig am stärksten.',
                    pirsig: 'Reisen erweitert die statischen Muster des Alltags. Neue Erfahrungen sind dynamische Qualität in Reinform.',
                    osho: 'Die wichtigste Reise ist die nach Innen. Aber manchmal braucht es äußere Bewegung, um inneren Stillstand zu lösen.'
                }
            }
        },

        slider: {
            niedrig: 'Niedrig',
            mittel: 'Mittel',
            hoch: 'Hoch',
            getrennt: 'Getrennt',
            hybrid: 'Hybrid',
            gemeinsam: 'Gemeinsam',
            familie: 'Familie',
            balance: 'Balance',
            karriere: 'Karriere',
            unwichtig: 'Unwichtig',
            wichtig: 'Wichtig',
            sehrWichtig: 'Sehr wichtig'
        },

        actions: {
            reset: 'Zurücksetzen',
            save: 'Weiter',
            close: 'Schließen'
        },

        infoModal: {
            statistik: 'STATISTIK',
            forschung: 'FORSCHUNG',
            pirsig: 'PIRSIG',
            osho: 'OSHO',
            verstanden: 'Verstanden'
        }
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageLocale_DE;
}
