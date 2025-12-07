/**
 * TIAGE BEDÜRFNIS-KATALOG
 *
 * Erweiterte Bedürfnisliste für Beziehungsqualitäts-Matching
 *
 * QUELLEN:
 * ─────────────────────────────────────────────────────────────────────────────
 * 1. GFK (Gewaltfreie Kommunikation)
 *    - Marshall B. Rosenberg: "Gewaltfreie Kommunikation" (2001)
 *    - Kategorien: Existenz, Sicherheit, Zuneigung, Verständnis, Freiheit,
 *      Teilnahme, Muße, Identität, Erschaffen, Verbundenheit
 *
 * 2. BDSM/Kink-Dynamik
 *    - Dossie Easton & Janet Hardy: "The New Topping Book" (2003)
 *    - Dossie Easton & Janet Hardy: "The New Bottoming Book" (2001)
 *    - Jay Wiseman: "SM 101: A Realistic Introduction" (1996)
 *    - Kategorie: Dynamik & Austausch (Kontrolle, Hingabe, Nachsorge, etc.)
 *
 * 3. Philosophische Grundlagen
 *    - Robert M. Pirsig: "Zen und die Kunst ein Motorrad zu warten" (1974)
 *      → Static vs. Dynamic Quality
 *    - Osho: Vorträge über Polarität und Yin-Yang-Dynamik
 *      → Komplementäre Energien in Beziehungen
 * ─────────────────────────────────────────────────────────────────────────────
 */

const GfkBeduerfnisse = {

    // ═══════════════════════════════════════════════════════════════════════════
    // BEDÜRFNIS-KATEGORIEN
    // ═══════════════════════════════════════════════════════════════════════════

    kategorien: {
        existenz: {
            name: "Existenz",
            description: "Grundlegende physische Bedürfnisse",
            color: "#E63946",
            beduerfnisse: [
                "luft",
                "wasser",
                "nahrung",
                "bewegung",
                "beruehrung",
                "erholung",
                "sexueller_ausdruck",
                "sicherheit_physisch",
                "unterschlupf"
            ]
        },

        sicherheit: {
            name: "Sicherheit",
            description: "Emotionale und psychische Sicherheit",
            color: "#F4A261",
            beduerfnisse: [
                "bestaendigkeit",
                "sich_sicher_fuehlen",
                "schutz",
                "stabilitaet",
                "leichtigkeit",
                "geborgenheit"
            ]
        },

        zuneigung: {
            name: "Zuneigung",
            description: "Liebe, Nähe und emotionale Verbindung",
            color: "#E84393",
            beduerfnisse: [
                "waerme",
                "wertschaetzung",
                "naehe",
                "gesellschaft",
                "intimitaet",
                "liebe",
                "fuersorge",
                "unterstuetzung",
                "fuereinander_da_sein"
            ]
        },

        verstaendnis: {
            name: "Verständnis",
            description: "Gesehen und verstanden werden",
            color: "#9B5DE5",
            beduerfnisse: [
                "akzeptanz",
                "mitgefuehl",
                "beruecksichtigung",
                "empathie",
                "vertrauen",
                "beachtung",
                "gesehen_werden",
                "verstanden_werden",
                "harmonie"
            ]
        },

        freiheit: {
            name: "Freiheit",
            description: "Autonomie und Selbstbestimmung",
            color: "#2A9D8F",
            beduerfnisse: [
                "selbstbestimmung",
                "waehlen_koennen",
                "unabhaengigkeit",
                "raum_haben",
                "spontaneitaet"
            ]
        },

        teilnahme: {
            name: "Teilnahme",
            description: "Gemeinschaft und Zugehörigkeit",
            color: "#06D6A0",
            beduerfnisse: [
                "zusammenarbeit",
                "kommunikation",
                "gemeinschaft",
                "zugehoerigkeit",
                "gegenseitigkeit",
                "respekt",
                "bedeutung_haben"
            ]
        },

        musse: {
            name: "Muße",
            description: "Erholung, Freude und Genuss",
            color: "#118AB2",
            beduerfnisse: [
                "schoenheit",
                "freizeit",
                "freude",
                "humor"
            ]
        },

        identitaet: {
            name: "Identität & Bedeutung",
            description: "Selbstverwirklichung und Sinn",
            color: "#FFD166",
            beduerfnisse: [
                "authentizitaet",
                "echtheit",
                "integritaet",
                "praesenz",
                "ordnung",
                "bewusstheit",
                "herausforderung",
                "klarheit",
                "kompetenz",
                "effizienz",
                "wirksamkeit",
                "wachstum",
                "sinn",
                "beitrag_leisten"
            ]
        },

        erschaffen: {
            name: "Etwas erschaffen",
            description: "Kreativität und Lernen",
            color: "#FF6B6B",
            beduerfnisse: [
                "kreativitaet",
                "entdecken",
                "lernen",
                "selbst_ausdruck",
                "anreize_bekommen"
            ]
        },

        verbundenheit: {
            name: "Verbunden sein",
            description: "Tiefe existenzielle Verbindung",
            color: "#A8DADC",
            beduerfnisse: [
                "leben_feiern",
                "inspiration",
                "trauer_ausdruecken",
                "einsehen",
                "anfang_ende"
            ]
        },

        dynamik: {
            name: "Dynamik & Austausch",
            description: "Machtdynamik, Kontrolle und bewusster Austausch",
            color: "#8B5CF6",
            beduerfnisse: [
                "kontrolle_ausueben",
                "hingabe",
                "fuehrung_geben",
                "gefuehrt_werden",
                "ritual",
                "nachsorge",
                "grenzen_setzen",
                "grenzen_respektieren",
                "intensitaet",
                "vertrauen_schenken",
                "verantwortung_uebernehmen",
                "sich_fallenlassen",
                "machtaustausch",
                "dienend_sein",
                "beschuetzen"
            ]
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // BEDÜRFNIS-DEFINITIONEN (mit deutschen Labels)
    // ═══════════════════════════════════════════════════════════════════════════

    definitionen: {
        // EXISTENZ
        luft: { label: "Luft", kategorie: "existenz" },
        wasser: { label: "Wasser", kategorie: "existenz" },
        nahrung: { label: "Nahrung", kategorie: "existenz" },
        bewegung: { label: "Bewegung/Betätigung", kategorie: "existenz" },
        beruehrung: { label: "Berührung/Körperkontakt", kategorie: "existenz" },
        erholung: { label: "Erholung/Schlaf", kategorie: "existenz" },
        sexueller_ausdruck: { label: "Sexueller Ausdruck", kategorie: "existenz" },
        sicherheit_physisch: { label: "Physische Sicherheit", kategorie: "existenz" },
        unterschlupf: { label: "Unterschlupf", kategorie: "existenz" },

        // SICHERHEIT
        bestaendigkeit: { label: "Beständigkeit", kategorie: "sicherheit" },
        sich_sicher_fuehlen: { label: "Sich sicher fühlen", kategorie: "sicherheit" },
        schutz: { label: "Schutz", kategorie: "sicherheit" },
        stabilitaet: { label: "Stabilität", kategorie: "sicherheit" },
        leichtigkeit: { label: "Leichtigkeit", kategorie: "sicherheit" },
        geborgenheit: { label: "Geborgenheit", kategorie: "sicherheit" },

        // ZUNEIGUNG
        waerme: { label: "Wärme", kategorie: "zuneigung" },
        wertschaetzung: { label: "Wertschätzung", kategorie: "zuneigung" },
        naehe: { label: "Nähe", kategorie: "zuneigung" },
        gesellschaft: { label: "Gesellschaft", kategorie: "zuneigung" },
        intimitaet: { label: "Intimität", kategorie: "zuneigung" },
        liebe: { label: "Liebe", kategorie: "zuneigung" },
        fuersorge: { label: "Fürsorge", kategorie: "zuneigung" },
        unterstuetzung: { label: "Unterstützung", kategorie: "zuneigung" },
        fuereinander_da_sein: { label: "Füreinander da sein", kategorie: "zuneigung" },

        // VERSTÄNDNIS
        akzeptanz: { label: "Akzeptanz", kategorie: "verstaendnis" },
        mitgefuehl: { label: "Mitgefühl", kategorie: "verstaendnis" },
        beruecksichtigung: { label: "Berücksichtigung", kategorie: "verstaendnis" },
        empathie: { label: "Empathie", kategorie: "verstaendnis" },
        vertrauen: { label: "Vertrauen", kategorie: "verstaendnis" },
        beachtung: { label: "Beachtung", kategorie: "verstaendnis" },
        gesehen_werden: { label: "Gesehen werden", kategorie: "verstaendnis" },
        verstanden_werden: { label: "Verstanden werden", kategorie: "verstaendnis" },
        harmonie: { label: "Harmonie", kategorie: "verstaendnis" },

        // FREIHEIT
        selbstbestimmung: { label: "Selbstbestimmung", kategorie: "freiheit" },
        waehlen_koennen: { label: "Wählen können", kategorie: "freiheit" },
        unabhaengigkeit: { label: "Unabhängigkeit", kategorie: "freiheit" },
        raum_haben: { label: "Raum haben", kategorie: "freiheit" },
        spontaneitaet: { label: "Spontaneität", kategorie: "freiheit" },

        // TEILNAHME
        zusammenarbeit: { label: "Zusammenarbeit", kategorie: "teilnahme" },
        kommunikation: { label: "Kommunikation", kategorie: "teilnahme" },
        gemeinschaft: { label: "Gemeinschaft", kategorie: "teilnahme" },
        zugehoerigkeit: { label: "Zugehörigkeit", kategorie: "teilnahme" },
        gegenseitigkeit: { label: "Gegenseitigkeit", kategorie: "teilnahme" },
        respekt: { label: "Respekt", kategorie: "teilnahme" },
        bedeutung_haben: { label: "Bedeutung haben", kategorie: "teilnahme" },

        // MUSSE
        schoenheit: { label: "Schönheit", kategorie: "musse" },
        freizeit: { label: "Freizeit", kategorie: "musse" },
        freude: { label: "Freude", kategorie: "musse" },
        humor: { label: "Humor", kategorie: "musse" },

        // IDENTITÄT
        authentizitaet: { label: "Authentizität", kategorie: "identitaet" },
        echtheit: { label: "Echtheit", kategorie: "identitaet" },
        integritaet: { label: "Integrität", kategorie: "identitaet" },
        praesenz: { label: "Präsenz", kategorie: "identitaet" },
        ordnung: { label: "Ordnung", kategorie: "identitaet" },
        bewusstheit: { label: "Bewusstheit", kategorie: "identitaet" },
        herausforderung: { label: "Herausforderung", kategorie: "identitaet" },
        klarheit: { label: "Klarheit", kategorie: "identitaet" },
        kompetenz: { label: "Kompetenz", kategorie: "identitaet" },
        effizienz: { label: "Effizienz", kategorie: "identitaet" },
        wirksamkeit: { label: "Wirksamkeit", kategorie: "identitaet" },
        wachstum: { label: "Wachstum", kategorie: "identitaet" },
        sinn: { label: "Sinn", kategorie: "identitaet" },
        beitrag_leisten: { label: "Einen Beitrag leisten", kategorie: "identitaet" },

        // ERSCHAFFEN
        kreativitaet: { label: "Kreativität", kategorie: "erschaffen" },
        entdecken: { label: "Entdecken", kategorie: "erschaffen" },
        lernen: { label: "Lernen", kategorie: "erschaffen" },
        selbst_ausdruck: { label: "Selbst-Ausdruck", kategorie: "erschaffen" },
        anreize_bekommen: { label: "Anreize bekommen", kategorie: "erschaffen" },

        // VERBUNDENHEIT
        leben_feiern: { label: "Das Leben feiern", kategorie: "verbundenheit" },
        inspiration: { label: "Inspiration", kategorie: "verbundenheit" },
        trauer_ausdruecken: { label: "Trauer ausdrücken", kategorie: "verbundenheit" },
        einsehen: { label: "Einsehen", kategorie: "verbundenheit" },
        anfang_ende: { label: "Anfang & Ende", kategorie: "verbundenheit" },

        // DYNAMIK & AUSTAUSCH (BDSM/Kink)
        kontrolle_ausueben: { label: "Kontrolle ausüben", kategorie: "dynamik" },
        hingabe: { label: "Hingabe", kategorie: "dynamik" },
        fuehrung_geben: { label: "Führung geben", kategorie: "dynamik" },
        gefuehrt_werden: { label: "Geführt werden", kategorie: "dynamik" },
        ritual: { label: "Rituale & Struktur", kategorie: "dynamik" },
        nachsorge: { label: "Nachsorge/Aftercare", kategorie: "dynamik" },
        grenzen_setzen: { label: "Grenzen setzen", kategorie: "dynamik" },
        grenzen_respektieren: { label: "Grenzen respektieren", kategorie: "dynamik" },
        intensitaet: { label: "Intensität erleben", kategorie: "dynamik" },
        vertrauen_schenken: { label: "Vertrauen schenken", kategorie: "dynamik" },
        verantwortung_uebernehmen: { label: "Verantwortung übernehmen", kategorie: "dynamik" },
        sich_fallenlassen: { label: "Sich fallenlassen", kategorie: "dynamik" },
        machtaustausch: { label: "Machtaustausch", kategorie: "dynamik" },
        dienend_sein: { label: "Dienend sein", kategorie: "dynamik" },
        beschuetzen: { label: "Beschützen", kategorie: "dynamik" }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // CROSS-CATEGORY BDSM-GFK MAPPING (Rosenberg-Integration)
    // ═══════════════════════════════════════════════════════════════════════════
    // Zeigt, welche universellen GFK-Bedürfnisse durch BDSM/Kink-Praktiken
    // gleichzeitig erfüllt werden. Basiert auf:
    // - Marshall Rosenberg's 9 Bedürfnis-Kategorien (GFK)
    // - Manfred Max-Neef's Human Scale Development
    // - BDSM-Forschung (Wismeijer & van Assen 2013, SMSNA 2023)
    //
    // Jedes BDSM-Bedürfnis erfüllt MEHRERE universelle Kategorien gleichzeitig.
    // Dies erklärt, warum BDSM/Kink tiefe psychologische Bedürfnisse befriedigt.
    // ═══════════════════════════════════════════════════════════════════════════

    bdsmGfkMapping: {

        // ─────────────────────────────────────────────────────────────────────
        // KONTROLLE & FÜHRUNG (Dominant-orientiert)
        // ─────────────────────────────────────────────────────────────────────

        kontrolle_ausueben: {
            label: "Kontrolle ausüben",
            erfuellteKategorien: {
                freiheit: {
                    beduerfnisse: ["selbstbestimmung", "waehlen_koennen"],
                    erklaerung: "Aktive Entscheidungsgewalt und Autonomie"
                },
                identitaet: {
                    beduerfnisse: ["wirksamkeit", "kompetenz", "authentizitaet"],
                    erklaerung: "Selbstwirksamkeit und Kompetenzerleben"
                },
                teilnahme: {
                    beduerfnisse: ["bedeutung_haben"],
                    erklaerung: "Bedeutungsvolle Rolle in der Beziehung"
                }
            },
            rosenbergKategorien: ["Autonomy", "Meaning"]
        },

        fuehrung_geben: {
            label: "Führung geben",
            erfuellteKategorien: {
                freiheit: {
                    beduerfnisse: ["selbstbestimmung"],
                    erklaerung: "Richtung vorgeben und gestalten"
                },
                identitaet: {
                    beduerfnisse: ["wirksamkeit", "kompetenz", "beitrag_leisten"],
                    erklaerung: "Verantwortung und Einfluss"
                },
                teilnahme: {
                    beduerfnisse: ["zusammenarbeit", "bedeutung_haben"],
                    erklaerung: "Gemeinsame Dynamik gestalten"
                },
                zuneigung: {
                    beduerfnisse: ["fuersorge"],
                    erklaerung: "Fürsorge durch Struktur geben"
                }
            },
            rosenbergKategorien: ["Autonomy", "Meaning", "Love"]
        },

        beschuetzen: {
            label: "Beschützen",
            erfuellteKategorien: {
                zuneigung: {
                    beduerfnisse: ["fuersorge", "unterstuetzung", "fuereinander_da_sein"],
                    erklaerung: "Tiefe Fürsorge und Schutz bieten"
                },
                identitaet: {
                    beduerfnisse: ["wirksamkeit", "sinn", "beitrag_leisten"],
                    erklaerung: "Sinnvolle Rolle als Beschützer"
                },
                verstaendnis: {
                    beduerfnisse: ["empathie", "beruecksichtigung"],
                    erklaerung: "Bedürfnisse des Partners erkennen"
                }
            },
            rosenbergKategorien: ["Love", "Meaning", "Understanding"]
        },

        verantwortung_uebernehmen: {
            label: "Verantwortung übernehmen",
            erfuellteKategorien: {
                identitaet: {
                    beduerfnisse: ["kompetenz", "wirksamkeit", "integritaet", "sinn"],
                    erklaerung: "Moralische und praktische Verantwortung"
                },
                teilnahme: {
                    beduerfnisse: ["zusammenarbeit", "bedeutung_haben"],
                    erklaerung: "Aktive Rolle in der Dynamik"
                },
                zuneigung: {
                    beduerfnisse: ["fuersorge"],
                    erklaerung: "Caring durch Verantwortung zeigen"
                }
            },
            rosenbergKategorien: ["Meaning", "Love"]
        },

        // ─────────────────────────────────────────────────────────────────────
        // HINGABE & VERTRAUEN (Submissiv-orientiert)
        // ─────────────────────────────────────────────────────────────────────

        hingabe: {
            label: "Hingabe",
            erfuellteKategorien: {
                verstaendnis: {
                    beduerfnisse: ["vertrauen", "akzeptanz", "gesehen_werden"],
                    erklaerung: "Tiefes Vertrauen und Akzeptanz erfahren"
                },
                zuneigung: {
                    beduerfnisse: ["intimitaet", "naehe", "liebe"],
                    erklaerung: "Maximale emotionale Nähe"
                },
                verbundenheit: {
                    beduerfnisse: ["leben_feiern", "inspiration"],
                    erklaerung: "Transzendente Verbundenheit"
                },
                sicherheit: {
                    beduerfnisse: ["geborgenheit"],
                    erklaerung: "Geborgenheit durch Struktur"
                }
            },
            rosenbergKategorien: ["Love", "Understanding", "Safety"]
        },

        gefuehrt_werden: {
            label: "Geführt werden",
            erfuellteKategorien: {
                sicherheit: {
                    beduerfnisse: ["geborgenheit", "schutz", "stabilitaet"],
                    erklaerung: "Sicherheit durch klare Führung"
                },
                verstaendnis: {
                    beduerfnisse: ["vertrauen", "akzeptanz"],
                    erklaerung: "Vertrauen in den Führenden"
                },
                musse: {
                    beduerfnisse: ["freude", "freizeit"],
                    erklaerung: "Entlastung von Entscheidungslast"
                }
            },
            rosenbergKategorien: ["Safety", "Understanding", "Recreation"]
        },

        sich_fallenlassen: {
            label: "Sich fallenlassen",
            erfuellteKategorien: {
                sicherheit: {
                    beduerfnisse: ["geborgenheit", "sich_sicher_fuehlen"],
                    erklaerung: "Paradox: Kontrolle abgeben = Sicherheit finden"
                },
                verstaendnis: {
                    beduerfnisse: ["vertrauen", "akzeptanz", "gesehen_werden"],
                    erklaerung: "Vollständige Akzeptanz erfahren"
                },
                musse: {
                    beduerfnisse: ["freude"],
                    erklaerung: "Loslassen und Genießen"
                },
                verbundenheit: {
                    beduerfnisse: ["leben_feiern"],
                    erklaerung: "Intensive Präsenz im Moment"
                }
            },
            rosenbergKategorien: ["Safety", "Understanding", "Recreation"]
        },

        dienend_sein: {
            label: "Dienend sein",
            erfuellteKategorien: {
                identitaet: {
                    beduerfnisse: ["sinn", "beitrag_leisten", "authentizitaet"],
                    erklaerung: "Sinn durch Hingabe und Service"
                },
                zuneigung: {
                    beduerfnisse: ["fuersorge", "fuereinander_da_sein"],
                    erklaerung: "Liebe durch Handlung ausdrücken"
                },
                teilnahme: {
                    beduerfnisse: ["bedeutung_haben", "zusammenarbeit"],
                    erklaerung: "Wertvolle Rolle in der Dynamik"
                }
            },
            rosenbergKategorien: ["Meaning", "Love", "Belonging"]
        },

        vertrauen_schenken: {
            label: "Vertrauen schenken",
            erfuellteKategorien: {
                verstaendnis: {
                    beduerfnisse: ["vertrauen", "akzeptanz"],
                    erklaerung: "Aktives Vertrauen als Geschenk"
                },
                zuneigung: {
                    beduerfnisse: ["intimitaet", "naehe", "liebe"],
                    erklaerung: "Tiefste Form der Intimität"
                },
                verbundenheit: {
                    beduerfnisse: ["inspiration"],
                    erklaerung: "Spirituelle Verbindung"
                }
            },
            rosenbergKategorien: ["Understanding", "Love"]
        },

        // ─────────────────────────────────────────────────────────────────────
        // GRENZEN & CONSENT (Universal)
        // ─────────────────────────────────────────────────────────────────────

        grenzen_setzen: {
            label: "Grenzen setzen",
            erfuellteKategorien: {
                freiheit: {
                    beduerfnisse: ["selbstbestimmung", "waehlen_koennen", "raum_haben"],
                    erklaerung: "Kernprinzip von Consent - jederzeit Nein sagen"
                },
                identitaet: {
                    beduerfnisse: ["authentizitaet", "integritaet", "klarheit"],
                    erklaerung: "Eigene Grenzen kennen und kommunizieren"
                },
                sicherheit: {
                    beduerfnisse: ["sich_sicher_fuehlen", "schutz"],
                    erklaerung: "Safewords als Sicherheitsnetz"
                }
            },
            rosenbergKategorien: ["Autonomy", "Safety"]
        },

        grenzen_respektieren: {
            label: "Grenzen respektieren",
            erfuellteKategorien: {
                verstaendnis: {
                    beduerfnisse: ["empathie", "akzeptanz", "beruecksichtigung"],
                    erklaerung: "Aktives Zuhören und Respektieren"
                },
                teilnahme: {
                    beduerfnisse: ["respekt", "gegenseitigkeit"],
                    erklaerung: "Gegenseitiger Respekt als Basis"
                },
                zuneigung: {
                    beduerfnisse: ["fuersorge"],
                    erklaerung: "Caring durch Grenzen achten"
                }
            },
            rosenbergKategorien: ["Understanding", "Belonging", "Love"]
        },

        // ─────────────────────────────────────────────────────────────────────
        // AUSTAUSCH & INTENSITÄT (Bidirektional)
        // ─────────────────────────────────────────────────────────────────────

        machtaustausch: {
            label: "Machtaustausch",
            erfuellteKategorien: {
                verbundenheit: {
                    beduerfnisse: ["leben_feiern", "inspiration", "anfang_ende"],
                    erklaerung: "Tiefste Form der Verbindung - Power Exchange"
                },
                musse: {
                    beduerfnisse: ["freude"],
                    erklaerung: "Spielerische Exploration"
                },
                erschaffen: {
                    beduerfnisse: ["kreativitaet", "entdecken", "selbst_ausdruck"],
                    erklaerung: "Kreative Gestaltung der Dynamik"
                },
                zuneigung: {
                    beduerfnisse: ["intimitaet", "naehe"],
                    erklaerung: "Maximale emotionale Intimität"
                }
            },
            rosenbergKategorien: ["Love", "Recreation", "Creativity"]
        },

        intensitaet: {
            label: "Intensität erleben",
            erfuellteKategorien: {
                musse: {
                    beduerfnisse: ["freude"],
                    erklaerung: "Tiefe Freude und Ekstase"
                },
                existenz: {
                    beduerfnisse: ["beruehrung", "sexueller_ausdruck"],
                    erklaerung: "Körperliche Intensität"
                },
                verbundenheit: {
                    beduerfnisse: ["leben_feiern"],
                    erklaerung: "Lebendigkeit spüren"
                },
                erschaffen: {
                    beduerfnisse: ["anreize_bekommen"],
                    erklaerung: "Stimulation und Neuheit"
                }
            },
            rosenbergKategorien: ["Recreation", "Sustenance"]
        },

        ritual: {
            label: "Rituale & Struktur",
            erfuellteKategorien: {
                sicherheit: {
                    beduerfnisse: ["stabilitaet", "bestaendigkeit"],
                    erklaerung: "Vorhersehbarkeit und Struktur"
                },
                identitaet: {
                    beduerfnisse: ["ordnung", "klarheit", "praesenz"],
                    erklaerung: "Bedeutungsvolle Struktur"
                },
                verbundenheit: {
                    beduerfnisse: ["leben_feiern"],
                    erklaerung: "Rituale als Feier der Verbindung"
                },
                teilnahme: {
                    beduerfnisse: ["zugehoerigkeit"],
                    erklaerung: "Gemeinsame Rituale stärken Bindung"
                }
            },
            rosenbergKategorien: ["Safety", "Meaning", "Belonging"]
        },

        nachsorge: {
            label: "Nachsorge/Aftercare",
            erfuellteKategorien: {
                zuneigung: {
                    beduerfnisse: ["fuersorge", "waerme", "unterstuetzung", "naehe"],
                    erklaerung: "Tiefe Fürsorge nach intensiver Erfahrung"
                },
                sicherheit: {
                    beduerfnisse: ["geborgenheit", "sich_sicher_fuehlen"],
                    erklaerung: "Emotionale Sicherheit wiederherstellen"
                },
                verstaendnis: {
                    beduerfnisse: ["empathie", "gesehen_werden", "verstanden_werden"],
                    erklaerung: "Emotionale Verarbeitung gemeinsam"
                },
                verbundenheit: {
                    beduerfnisse: ["fuereinander_da_sein"],
                    erklaerung: "Tiefe Verbundenheit nach dem Spiel"
                }
            },
            rosenbergKategorien: ["Love", "Safety", "Understanding"]
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ROSENBERG 9-KATEGORIEN MAPPING
    // ═══════════════════════════════════════════════════════════════════════════
    // Explizites Mapping zwischen Rosenbergs 9 Original-Kategorien und TIAGE's 11
    // ═══════════════════════════════════════════════════════════════════════════

    rosenbergMapping: {
        // Rosenberg Original → TIAGE Kategorien
        "Sustenance": ["existenz"],
        "Safety": ["sicherheit"],
        "Love": ["zuneigung"],
        "Understanding": ["verstaendnis"],
        "Creativity": ["erschaffen"],
        "Recreation": ["musse"],
        "Belonging": ["teilnahme"],
        "Autonomy": ["freiheit"],
        "Meaning": ["identitaet", "verbundenheit"],

        // TIAGE-Erweiterung (nicht in Rosenberg's Original)
        "PowerDynamics": ["dynamik"]  // BDSM/Kink-spezifisch
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ARCHETYPEN-BEDÜRFNIS-PROFILE
    // ═══════════════════════════════════════════════════════════════════════════
    // Profile werden aus separaten Dateien geladen (profiles/archetypen/*.js)
    // Jedes Profil enthält alle 88 Bedürfnisse mit Werten 0-100
    // Fallback auf Legacy-Profile falls neue nicht geladen

    // Dynamischer Getter für archetypProfile
    get archetypProfile() {
        // Prüfe ob neue Profile geladen wurden
        if (window.LoadedArchetypProfile && Object.keys(window.LoadedArchetypProfile).length > 0) {
            return window.LoadedArchetypProfile;
        }
        // Fallback auf Legacy-Profile
        return this._legacyArchetypProfile;
    },

    // Legacy-Profile als Fallback (alte ~20 Werte pro Profil)
    _legacyArchetypProfile: {

        // ─────────────────────────────────────────────────────────────────────
        // SINGLE - Der Autonome
        // ─────────────────────────────────────────────────────────────────────
        single: {
            name: "Single",
            kernbeduerfnisse: {
                // FREIHEIT (dominant)
                selbstbestimmung: 95,
                unabhaengigkeit: 95,
                waehlen_koennen: 90,
                raum_haben: 90,
                spontaneitaet: 85,

                // IDENTITÄT
                authentizitaet: 90,
                wachstum: 85,
                selbst_ausdruck: 85,
                kompetenz: 80,
                sinn: 75,

                // ERSCHAFFEN
                kreativitaet: 80,
                entdecken: 80,
                lernen: 75,

                // MUSSE
                freizeit: 85,
                freude: 80,

                // ZUNEIGUNG (niedriger)
                wertschaetzung: 60,
                gesellschaft: 55,

                // SICHERHEIT (niedrig)
                leichtigkeit: 70,
                stabilitaet: 40
            },
            beschreibung: "Maximale Autonomie und Selbstverwirklichung. Freiheit steht über Bindung."
        },

        // ─────────────────────────────────────────────────────────────────────
        // DUO - Der Verschmelzende
        // ─────────────────────────────────────────────────────────────────────
        duo: {
            name: "Duo",
            kernbeduerfnisse: {
                // SICHERHEIT (dominant)
                geborgenheit: 95,
                stabilitaet: 95,
                bestaendigkeit: 90,
                sich_sicher_fuehlen: 90,
                schutz: 85,

                // ZUNEIGUNG (sehr hoch)
                liebe: 95,
                naehe: 95,
                intimitaet: 90,
                fuereinander_da_sein: 90,
                fuersorge: 85,
                waerme: 85,

                // VERSTÄNDNIS
                vertrauen: 95,
                verstanden_werden: 85,
                harmonie: 85,
                empathie: 80,

                // VERBUNDENHEIT
                zugehoerigkeit: 90,
                leben_feiern: 75,

                // TEILNAHME
                gegenseitigkeit: 85,

                // FREIHEIT (niedrig)
                selbstbestimmung: 45,
                unabhaengigkeit: 35,
                raum_haben: 40
            },
            beschreibung: "Tiefe Verschmelzung, Sicherheit und exklusive Bindung. Zwei werden eins."
        },

        // ─────────────────────────────────────────────────────────────────────
        // DUO-FLEX - Der Flexible Ankernde
        // ─────────────────────────────────────────────────────────────────────
        "duo-flex": {
            name: "Duo-Flex",
            kernbeduerfnisse: {
                // SICHERHEIT (hoch, aber flexibler)
                stabilitaet: 80,
                geborgenheit: 75,
                bestaendigkeit: 70,
                sich_sicher_fuehlen: 75,

                // ZUNEIGUNG (hoch)
                liebe: 85,
                naehe: 80,
                intimitaet: 80,
                vertrauen: 90,
                wertschaetzung: 85,

                // FREIHEIT (moderat)
                raum_haben: 75,
                selbstbestimmung: 70,
                waehlen_koennen: 75,
                spontaneitaet: 65,

                // VERSTÄNDNIS
                akzeptanz: 85,
                verstanden_werden: 80,
                kommunikation: 90,

                // IDENTITÄT
                authentizitaet: 80,
                wachstum: 75,

                // TEILNAHME
                gegenseitigkeit: 80,
                respekt: 85
            },
            beschreibung: "Balance zwischen Anker-Beziehung und Flexibilität. Vertrauen ermöglicht Offenheit."
        },

        // ─────────────────────────────────────────────────────────────────────
        // SOLOPOLY - Der Autonome Vielfältige
        // ─────────────────────────────────────────────────────────────────────
        solopoly: {
            name: "Solopoly",
            kernbeduerfnisse: {
                // FREIHEIT (sehr hoch)
                selbstbestimmung: 95,
                unabhaengigkeit: 95,
                raum_haben: 95,
                waehlen_koennen: 90,
                spontaneitaet: 80,

                // ZUNEIGUNG (moderat, verteilt)
                naehe: 70,
                intimitaet: 75,
                wertschaetzung: 80,
                waerme: 70,

                // IDENTITÄT
                authentizitaet: 95,
                integritaet: 90,
                selbst_ausdruck: 85,
                wachstum: 80,

                // VERSTÄNDNIS
                akzeptanz: 85,
                kommunikation: 90,
                respekt: 90,

                // TEILNAHME
                gegenseitigkeit: 75,
                bedeutung_haben: 70,

                // SICHERHEIT (niedrig)
                stabilitaet: 45,
                geborgenheit: 40
            },
            beschreibung: "Autonomie als höchster Wert, multiple Verbindungen ohne Hierarchie."
        },

        // ─────────────────────────────────────────────────────────────────────
        // POLYAMOR - Der Liebende Viele
        // ─────────────────────────────────────────────────────────────────────
        polyamor: {
            name: "Polyamor",
            kernbeduerfnisse: {
                // ZUNEIGUNG (sehr hoch)
                liebe: 95,
                naehe: 85,
                intimitaet: 90,
                waerme: 85,
                fuersorge: 80,

                // VERSTÄNDNIS
                kommunikation: 95,
                empathie: 90,
                vertrauen: 90,
                verstanden_werden: 85,
                akzeptanz: 90,

                // TEILNAHME
                gemeinschaft: 85,
                zugehoerigkeit: 80,
                gegenseitigkeit: 85,
                respekt: 90,

                // FREIHEIT (moderat-hoch)
                waehlen_koennen: 80,
                selbstbestimmung: 75,
                raum_haben: 70,

                // IDENTITÄT
                authentizitaet: 90,
                wachstum: 85,
                integritaet: 85,

                // VERBUNDENHEIT
                leben_feiern: 85,

                // SICHERHEIT (moderat)
                stabilitaet: 65,
                geborgenheit: 60
            },
            beschreibung: "Fülle statt Mangel - Liebe für mehrere Menschen gleichzeitig mit hoher Kommunikation."
        },

        // ─────────────────────────────────────────────────────────────────────
        // RA
        // ─────────────────────────────────────────────────────────────────────
        ra: {
            name: "RA",
            kernbeduerfnisse: {
                // FREIHEIT (maximal)
                selbstbestimmung: 100,
                unabhaengigkeit: 100,
                waehlen_koennen: 95,
                raum_haben: 95,
                spontaneitaet: 90,

                // IDENTITÄT (sehr hoch)
                authentizitaet: 100,
                integritaet: 95,
                echtheit: 95,
                selbst_ausdruck: 90,

                // VERSTÄNDNIS
                akzeptanz: 90,
                respekt: 95,

                // TEILNAHME (auf eigenen Bedingungen)
                gegenseitigkeit: 80,
                kommunikation: 85,

                // ERSCHAFFEN
                kreativitaet: 80,
                entdecken: 85,

                // ZUNEIGUNG (individuell definiert)
                wertschaetzung: 75,
                naehe: 60,

                // SICHERHEIT (sehr niedrig)
                stabilitaet: 25,
                bestaendigkeit: 20,
                geborgenheit: 30
            },
            beschreibung: "Radikale Ablehnung aller Beziehungsnormen. Jede Verbindung wird individuell definiert."
        },

        // ─────────────────────────────────────────────────────────────────────
        // LAT - Living Apart Together
        // ─────────────────────────────────────────────────────────────────────
        lat: {
            name: "LAT",
            kernbeduerfnisse: {
                // FREIHEIT (hoch)
                raum_haben: 95,
                selbstbestimmung: 85,
                unabhaengigkeit: 85,

                // ZUNEIGUNG (hoch, aber mit Distanz)
                liebe: 85,
                naehe: 75,
                intimitaet: 80,
                wertschaetzung: 85,
                fuereinander_da_sein: 80,

                // SICHERHEIT (moderat)
                stabilitaet: 70,
                bestaendigkeit: 75,
                sich_sicher_fuehlen: 70,

                // VERSTÄNDNIS
                vertrauen: 90,
                verstanden_werden: 85,
                akzeptanz: 85,
                respekt: 90,

                // IDENTITÄT
                authentizitaet: 85,
                praesenz: 80,

                // MUSSE
                freizeit: 80,
                freude: 75
            },
            beschreibung: "Verbindlichkeit ohne Verschmelzung. Bewusste Distanz erhält die Qualität."
        },

        // ─────────────────────────────────────────────────────────────────────
        // AROMANTISCH - Der Platonische
        // ─────────────────────────────────────────────────────────────────────
        aromantisch: {
            name: "Aromantisch",
            kernbeduerfnisse: {
                // TEILNAHME (hoch - platonisch)
                gemeinschaft: 85,
                zugehoerigkeit: 80,
                respekt: 90,
                bedeutung_haben: 80,

                // VERSTÄNDNIS
                akzeptanz: 95,
                verstanden_werden: 90,
                gesehen_werden: 90,

                // FREIHEIT (hoch)
                selbstbestimmung: 85,
                authentizitaet: 95,
                raum_haben: 80,

                // ZUNEIGUNG (platonisch)
                wertschaetzung: 85,
                fuersorge: 75,
                gesellschaft: 80,
                unterstuetzung: 80,
                // Romantische Aspekte niedrig
                intimitaet: 40,
                liebe: 45, // platonische Liebe

                // IDENTITÄT
                echtheit: 90,
                integritaet: 85,

                // SICHERHEIT (moderat)
                stabilitaet: 65,
                sich_sicher_fuehlen: 70
            },
            beschreibung: "Tiefe platonische Verbindungen ohne romantische Komponente. Authentisch anders."
        }
    },

    /**
     * Initialisiert die Profile aus den geladenen Archetyp-Dateien
     * Wird automatisch aufgerufen wenn die Profile verfügbar sind
     */
    initFromLoadedProfiles: function() {
        if (window.LoadedArchetypProfile) {
            console.log('GfkBeduerfnisse: Neue Profile geladen mit je 88 Bedürfnissen');
            Object.keys(window.LoadedArchetypProfile).forEach(key => {
                const profil = window.LoadedArchetypProfile[key];
                console.log(`  - ${key}: ${Object.keys(profil.kernbeduerfnisse).length} Bedürfnisse`);
            });
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // MATCHING-FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Berechnet die Bedürfnis-Übereinstimmung zwischen zwei Archetypen
     * @param {string} archetyp1 - ID des ersten Archetyps
     * @param {string} archetyp2 - ID des zweiten Archetyps
     * @returns {Object} Matching-Ergebnis mit Score und Details
     */
    berechneMatching: function(archetyp1, archetyp2) {
        const profil1 = this.archetypProfile[archetyp1];
        const profil2 = this.archetypProfile[archetyp2];

        if (!profil1 || !profil2) {
            return { score: 0, fehler: "Unbekannter Archetyp" };
        }

        const bed1 = profil1.kernbeduerfnisse;
        const bed2 = profil2.kernbeduerfnisse;

        // Alle Bedürfnisse sammeln
        const alleBed = new Set([...Object.keys(bed1), ...Object.keys(bed2)]);

        let summeUebereinstimmung = 0;
        let summeGewicht = 0;
        const details = {
            uebereinstimmend: [],
            komplementaer: [],
            konflikt: []
        };

        alleBed.forEach(bed => {
            const wert1 = bed1[bed] || 0;
            const wert2 = bed2[bed] || 0;

            // Gewicht = Durchschnitt der Wichtigkeit
            const gewicht = (wert1 + wert2) / 2;

            if (gewicht > 30) { // Nur relevante Bedürfnisse
                // Differenz berechnen
                const diff = Math.abs(wert1 - wert2);

                // Übereinstimmung: 100 - Differenz
                const uebereinstimmung = Math.max(0, 100 - diff);

                summeUebereinstimmung += uebereinstimmung * gewicht;
                summeGewicht += gewicht;

                const bedInfo = {
                    id: bed,
                    label: this.definitionen[bed]?.label || bed,
                    wert1: wert1,
                    wert2: wert2,
                    diff: diff
                };

                // Kategorisierung
                if (diff <= 15) {
                    details.uebereinstimmend.push(bedInfo);
                } else if (diff <= 35) {
                    details.komplementaer.push(bedInfo);
                } else {
                    details.konflikt.push(bedInfo);
                }
            }
        });

        // Gesamtscore (0-100)
        const score = summeGewicht > 0
            ? Math.round(summeUebereinstimmung / summeGewicht)
            : 0;

        // Sortieren nach Relevanz
        details.uebereinstimmend.sort((a, b) => (b.wert1 + b.wert2) - (a.wert1 + a.wert2));
        details.konflikt.sort((a, b) => b.diff - a.diff);

        return {
            score: score,
            level: this.scoreToLevel(score),
            archetyp1: profil1.name,
            archetyp2: profil2.name,
            details: details,
            topUebereinstimmungen: details.uebereinstimmend.slice(0, 5),
            topKonflikte: details.konflikt.slice(0, 3)
        };
    },

    /**
     * Konvertiert Score zu GFK-Level
     */
    scoreToLevel: function(score) {
        if (score >= 75) return "hoch";
        if (score >= 55) return "mittel";
        return "niedrig";
    },

    /**
     * Gibt die Top-Bedürfnisse eines Archetyps zurück
     * @param {string} archetyp - ID des Archetyps
     * @param {number} anzahl - Anzahl der Top-Bedürfnisse
     */
    getTopBeduerfnisse: function(archetyp, anzahl = 5) {
        const profil = this.archetypProfile[archetyp];
        if (!profil) return [];

        return Object.entries(profil.kernbeduerfnisse)
            .sort((a, b) => b[1] - a[1])
            .slice(0, anzahl)
            .map(([id, wert]) => ({
                id: id,
                label: this.definitionen[id]?.label || id,
                wert: wert,
                kategorie: this.definitionen[id]?.kategorie
            }));
    },

    /**
     * Berechnet Kategorie-Scores für einen Archetyp
     */
    getKategorieScores: function(archetyp) {
        const profil = this.archetypProfile[archetyp];
        if (!profil) return {};

        const scores = {};

        Object.entries(this.kategorien).forEach(([katId, kat]) => {
            let summe = 0;
            let anzahl = 0;

            kat.beduerfnisse.forEach(bed => {
                if (profil.kernbeduerfnisse[bed]) {
                    summe += profil.kernbeduerfnisse[bed];
                    anzahl++;
                }
            });

            scores[katId] = {
                name: kat.name,
                color: kat.color,
                score: anzahl > 0 ? Math.round(summe / anzahl) : 0
            };
        });

        return scores;
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // PATHOS / LOGOS ZUORDNUNG
    // ═══════════════════════════════════════════════════════════════════════════
    // Logos = Verstand, Philosophie, Werte
    // Pathos = Gefühl, Körper, Energie

    pathosLogosMapping: {
        // LOGOS-Kategorien (Verstand, Philosophie)
        logos: {
            kategorien: ['identitaet', 'erschaffen', 'teilnahme'],
            beschreibung: "Werte, Sinn, Kommunikation"
        },
        // PATHOS-Kategorien (Gefühl, Körper, Energie)
        pathos: {
            kategorien: ['zuneigung', 'sicherheit', 'freiheit', 'verstaendnis', 'verbundenheit', 'musse', 'existenz'],
            beschreibung: "Gefühle, Nähe, Sicherheit"
        }
    },

    /**
     * Gibt zurück, ob ein Bedürfnis zu Pathos oder Logos gehört
     */
    getPathosLogos: function(beduerfnisId) {
        const def = this.definitionen[beduerfnisId];
        if (!def) return null;

        const kategorie = def.kategorie;
        if (this.pathosLogosMapping.logos.kategorien.includes(kategorie)) {
            return 'logos';
        }
        return 'pathos';
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // "WER BRINGT WAS MIT" - ANALYSE
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Analysiert was jeder Partner in die Beziehung einbringt
     * @param {string} archetyp1 - ICH Archetyp
     * @param {string} archetyp2 - Partner Archetyp
     * @returns {Object} Detaillierte Analyse für Pathos/Logos Ansicht
     */
    analysiereWerBringtWasMit: function(archetyp1, archetyp2) {
        const profil1 = this.archetypProfile[archetyp1];
        const profil2 = this.archetypProfile[archetyp2];

        if (!profil1 || !profil2) {
            return { fehler: "Unbekannter Archetyp" };
        }

        const result = {
            ich: {
                name: profil1.name,
                archetyp: archetyp1,
                staerken: { pathos: [], logos: [] },
                beduerfnisse: { pathos: [], logos: [] }
            },
            partner: {
                name: profil2.name,
                archetyp: archetyp2,
                staerken: { pathos: [], logos: [] },
                beduerfnisse: { pathos: [], logos: [] }
            },
            gemeinsam: {
                pathos: [],
                logos: []
            },
            wachstumspotential: {
                pathos: [],
                logos: []
            }
        };

        const bed1 = profil1.kernbeduerfnisse;
        const bed2 = profil2.kernbeduerfnisse;
        const alleBed = new Set([...Object.keys(bed1), ...Object.keys(bed2)]);

        alleBed.forEach(bed => {
            const wert1 = bed1[bed] || 0;
            const wert2 = bed2[bed] || 0;
            const pathosLogos = this.getPathosLogos(bed);

            if (!pathosLogos) return;

            const bedInfo = {
                id: bed,
                label: this.definitionen[bed]?.label || bed,
                kategorie: this.definitionen[bed]?.kategorie,
                wertIch: wert1,
                wertPartner: wert2
            };

            // Stärken: Was jemand stark mitbringt (> 75)
            if (wert1 >= 75) {
                result.ich.staerken[pathosLogos].push({ ...bedInfo, wert: wert1 });
            }
            if (wert2 >= 75) {
                result.partner.staerken[pathosLogos].push({ ...bedInfo, wert: wert2 });
            }

            // Bedürfnisse: Was jemand braucht (> 70)
            if (wert1 >= 70) {
                result.ich.beduerfnisse[pathosLogos].push({ ...bedInfo, wert: wert1 });
            }
            if (wert2 >= 70) {
                result.partner.beduerfnisse[pathosLogos].push({ ...bedInfo, wert: wert2 });
            }

            // Gemeinsam: Beide hoch (beide > 70)
            if (wert1 >= 70 && wert2 >= 70) {
                result.gemeinsam[pathosLogos].push(bedInfo);
            }

            // Wachstumspotential: Einer stark, anderer schwach (Diff > 40)
            const diff = Math.abs(wert1 - wert2);
            if (diff >= 40 && (wert1 >= 70 || wert2 >= 70)) {
                result.wachstumspotential[pathosLogos].push({
                    ...bedInfo,
                    staerkerBei: wert1 > wert2 ? 'ich' : 'partner',
                    diff: diff
                });
            }
        });

        // Sortieren nach Wichtigkeit
        ['ich', 'partner'].forEach(person => {
            ['pathos', 'logos'].forEach(pl => {
                result[person].staerken[pl].sort((a, b) => b.wert - a.wert);
                result[person].beduerfnisse[pl].sort((a, b) => b.wert - a.wert);
            });
        });

        ['pathos', 'logos'].forEach(pl => {
            result.gemeinsam[pl].sort((a, b) => (b.wertIch + b.wertPartner) - (a.wertIch + a.wertPartner));
            result.wachstumspotential[pl].sort((a, b) => b.diff - a.diff);
        });

        // Summary-Texte generieren
        result.summary = this.generiereSummary(result);

        return result;
    },

    /**
     * Generiert lesbare Summary-Texte für die Analyse
     */
    generiereSummary: function(analyse) {
        const summary = {
            ich: { pathos: '', logos: '' },
            partner: { pathos: '', logos: '' }
        };

        // ICH - Pathos
        const ichPathosTop = analyse.ich.staerken.pathos.slice(0, 3).map(b => b.label);
        if (ichPathosTop.length > 0) {
            summary.ich.pathos = `Bringt ${ichPathosTop.join(', ')} mit`;
        }

        // ICH - Logos
        const ichLogosTop = analyse.ich.staerken.logos.slice(0, 3).map(b => b.label);
        if (ichLogosTop.length > 0) {
            summary.ich.logos = `Bringt ${ichLogosTop.join(', ')} mit`;
        }

        // Partner - Pathos
        const partnerPathosTop = analyse.partner.staerken.pathos.slice(0, 3).map(b => b.label);
        if (partnerPathosTop.length > 0) {
            summary.partner.pathos = `Bringt ${partnerPathosTop.join(', ')} mit`;
        }

        // Partner - Logos
        const partnerLogosTop = analyse.partner.staerken.logos.slice(0, 3).map(b => b.label);
        if (partnerLogosTop.length > 0) {
            summary.partner.logos = `Bringt ${partnerLogosTop.join(', ')} mit`;
        }

        return summary;
    },

    /**
     * Berechnet Pathos- und Logos-Scores für ein Archetyp-Paar
     */
    berechnePathosLogosScores: function(archetyp1, archetyp2) {
        const profil1 = this.archetypProfile[archetyp1];
        const profil2 = this.archetypProfile[archetyp2];

        if (!profil1 || !profil2) {
            return { pathos: 0, logos: 0 };
        }

        const bed1 = profil1.kernbeduerfnisse;
        const bed2 = profil2.kernbeduerfnisse;

        let pathosSum = 0, pathosCount = 0;
        let logosSum = 0, logosCount = 0;

        const alleBed = new Set([...Object.keys(bed1), ...Object.keys(bed2)]);

        alleBed.forEach(bed => {
            const wert1 = bed1[bed] || 0;
            const wert2 = bed2[bed] || 0;
            const pathosLogos = this.getPathosLogos(bed);

            if (!pathosLogos) return;

            const gewicht = (wert1 + wert2) / 2;
            if (gewicht < 30) return;

            const diff = Math.abs(wert1 - wert2);
            const uebereinstimmung = Math.max(0, 100 - diff);

            if (pathosLogos === 'pathos') {
                pathosSum += uebereinstimmung * gewicht;
                pathosCount += gewicht;
            } else {
                logosSum += uebereinstimmung * gewicht;
                logosCount += gewicht;
            }
        });

        return {
            pathos: pathosCount > 0 ? Math.round(pathosSum / pathosCount) : 0,
            logos: logosCount > 0 ? Math.round(logosSum / logosCount) : 0
        };
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // BDSM-GFK CROSS-CATEGORY HELPER FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Gibt alle GFK-Kategorien zurück, die ein BDSM-Bedürfnis erfüllt
     * @param {string} bdsmBeduerfnis - ID des BDSM-Bedürfnisses (z.B. "nachsorge")
     * @returns {Object} Erfüllte Kategorien mit Erklärungen
     */
    getBdsmGfkKategorien: function(bdsmBeduerfnis) {
        const mapping = this.bdsmGfkMapping[bdsmBeduerfnis];
        if (!mapping) return null;

        return {
            label: mapping.label,
            erfuellteKategorien: mapping.erfuellteKategorien,
            rosenbergKategorien: mapping.rosenbergKategorien,
            anzahlKategorien: Object.keys(mapping.erfuellteKategorien).length
        };
    },

    /**
     * Findet alle BDSM-Bedürfnisse die eine bestimmte GFK-Kategorie erfüllen
     * @param {string} gfkKategorie - ID der GFK-Kategorie (z.B. "zuneigung")
     * @returns {Array} Liste von BDSM-Bedürfnissen
     */
    findBdsmByGfkKategorie: function(gfkKategorie) {
        const result = [];

        Object.entries(this.bdsmGfkMapping).forEach(([bdsmId, mapping]) => {
            if (mapping.erfuellteKategorien[gfkKategorie]) {
                result.push({
                    id: bdsmId,
                    label: mapping.label,
                    beduerfnisse: mapping.erfuellteKategorien[gfkKategorie].beduerfnisse,
                    erklaerung: mapping.erfuellteKategorien[gfkKategorie].erklaerung
                });
            }
        });

        return result;
    },

    /**
     * Findet alle BDSM-Bedürfnisse die eine Rosenberg-Kategorie erfüllen
     * @param {string} rosenbergKategorie - Rosenberg-Kategorie (z.B. "Autonomy", "Love")
     * @returns {Array} Liste von BDSM-Bedürfnissen
     */
    findBdsmByRosenberg: function(rosenbergKategorie) {
        const result = [];

        Object.entries(this.bdsmGfkMapping).forEach(([bdsmId, mapping]) => {
            if (mapping.rosenbergKategorien.includes(rosenbergKategorie)) {
                result.push({
                    id: bdsmId,
                    label: mapping.label,
                    alleRosenberg: mapping.rosenbergKategorien
                });
            }
        });

        return result;
    },

    /**
     * Berechnet wie viele universelle Bedürfnisse durch BDSM-Praktiken erfüllt werden
     * @returns {Object} Statistik über BDSM-GFK-Verbindungen
     */
    getBdsmGfkStatistik: function() {
        const stats = {
            totalBdsmBeduerfnisse: Object.keys(this.bdsmGfkMapping).length,
            kategorieAbdeckung: {},
            rosenbergAbdeckung: {},
            durchschnittKategorienProBdsm: 0
        };

        let summeKategorien = 0;

        // Zähle Kategorien pro BDSM-Bedürfnis
        Object.values(this.bdsmGfkMapping).forEach(mapping => {
            summeKategorien += Object.keys(mapping.erfuellteKategorien).length;

            // GFK-Kategorien zählen
            Object.keys(mapping.erfuellteKategorien).forEach(kat => {
                stats.kategorieAbdeckung[kat] = (stats.kategorieAbdeckung[kat] || 0) + 1;
            });

            // Rosenberg-Kategorien zählen
            mapping.rosenbergKategorien.forEach(ros => {
                stats.rosenbergAbdeckung[ros] = (stats.rosenbergAbdeckung[ros] || 0) + 1;
            });
        });

        stats.durchschnittKategorienProBdsm = Math.round(
            (summeKategorien / stats.totalBdsmBeduerfnisse) * 10
        ) / 10;

        return stats;
    },

    /**
     * Generiert einen lesbaren Report über BDSM-GFK-Verbindungen
     * @param {string} bdsmBeduerfnis - ID des BDSM-Bedürfnisses
     * @returns {string} Formatierter Report
     */
    generateBdsmGfkReport: function(bdsmBeduerfnis) {
        const mapping = this.bdsmGfkMapping[bdsmBeduerfnis];
        if (!mapping) return `Unbekanntes BDSM-Bedürfnis: ${bdsmBeduerfnis}`;

        let report = `\n═══ ${mapping.label.toUpperCase()} ═══\n\n`;
        report += `Erfüllt ${Object.keys(mapping.erfuellteKategorien).length} GFK-Kategorien:\n\n`;

        Object.entries(mapping.erfuellteKategorien).forEach(([katId, details]) => {
            const kategorie = this.kategorien[katId];
            report += `● ${kategorie?.name || katId}\n`;
            report += `  Bedürfnisse: ${details.beduerfnisse.map(b =>
                this.definitionen[b]?.label || b
            ).join(', ')}\n`;
            report += `  → ${details.erklaerung}\n\n`;
        });

        report += `Rosenberg-Kategorien: ${mapping.rosenbergKategorien.join(', ')}\n`;

        return report;
    },

    /**
     * Analysiert welche BDSM-Praktiken am meisten universelle Bedürfnisse erfüllen
     * @returns {Array} Sortierte Liste nach Anzahl erfüllter Kategorien
     */
    getBdsmByUniversalitaet: function() {
        return Object.entries(this.bdsmGfkMapping)
            .map(([id, mapping]) => ({
                id: id,
                label: mapping.label,
                kategorienAnzahl: Object.keys(mapping.erfuellteKategorien).length,
                rosenbergAnzahl: mapping.rosenbergKategorien.length,
                kategorien: Object.keys(mapping.erfuellteKategorien),
                rosenberg: mapping.rosenbergKategorien
            }))
            .sort((a, b) => b.kategorienAnzahl - a.kategorienAnzahl);
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GfkBeduerfnisse };
}

