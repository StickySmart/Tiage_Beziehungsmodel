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
        title: 'Archetypen-Beziehungsqualität',
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
            bisexuell: 'Bisexuell'
        },
        short: {
            heterosexuell: 'Hetero',
            homosexuell: 'Homo',
            bisexuell: 'Bi'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // GESCHLECHT
    // ═══════════════════════════════════════════════════════════════════════

    geschlecht: {
        label: 'Geschlechtsidentität',
        types: {
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
        short: {
            cis_mann: 'CM',
            cis_frau: 'CF',
            trans_mann: 'TM',
            trans_frau: 'TF',
            nonbinaer: 'NB',
            genderfluid: 'GF',
            agender: 'AG',
            intersex: 'IS',
            divers: 'DI'
        }
    },

    // ═══════════════════════════════════════════════════════════════════════
    // TOOLTIPS
    // ═══════════════════════════════════════════════════════════════════════

    tooltips: {
        geschlecht: {
            title: 'Geschlechtsidentität',
            text: 'Deine Geschlechtsidentität. Dies beeinflusst die Kompatibilität zusammen mit der sexuellen Orientierung.'
        },
        cis_mann: {
            title: 'Cis Mann',
            text: 'Person, die bei Geburt männlich zugewiesen wurde und sich als Mann identifiziert.'
        },
        cis_frau: {
            title: 'Cis Frau',
            text: 'Person, die bei Geburt weiblich zugewiesen wurde und sich als Frau identifiziert.'
        },
        trans_mann: {
            title: 'Trans Mann',
            text: 'Person, die sich als Mann identifiziert, aber bei Geburt nicht männlich zugewiesen wurde.'
        },
        trans_frau: {
            title: 'Trans Frau',
            text: 'Person, die sich als Frau identifiziert, aber bei Geburt nicht weiblich zugewiesen wurde.'
        },
        nonbinaer: {
            title: 'Nonbinär',
            text: 'Person, die sich weder ausschließlich als Mann noch als Frau identifiziert.'
        },
        genderfluid: {
            title: 'Genderfluid',
            text: 'Person, deren Geschlechtsidentität sich über Zeit verändert oder zwischen verschiedenen Identitäten wechselt.'
        },
        agender: {
            title: 'Agender',
            text: 'Person, die sich mit keinem Geschlecht identifiziert oder geschlechtslos fühlt.'
        },
        intersex: {
            title: 'Intersex',
            text: 'Person mit angeborenen körperlichen Geschlechtsmerkmalen, die nicht eindeutig männlich oder weiblich sind.'
        },
        divers: {
            title: 'Divers',
            text: 'Offizieller dritter Geschlechtseintrag in Deutschland für Menschen, die sich nicht als männlich oder weiblich identifizieren.'
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
            title: 'Bisexuell',
            text: 'Anziehung zu beiden Geschlechtern.'
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
            shortDef: 'Relationship Anarchist - Ablehnung aller Beziehungs-Hierarchien und Labels.',
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
        question: 'Bist du mindestens 18 Jahre alt?',
        confirm: 'Ja, ich bin 18+',
        deny: 'Nein',
        required: 'Diese Seite ist nur für Erwachsene (18+) zugänglich.'
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
    }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageLocale_DE;
}
