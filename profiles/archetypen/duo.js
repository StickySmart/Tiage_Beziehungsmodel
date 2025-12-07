/**
 * DUO - Der Verschmelzende
 *
 * Vollständiges Bedürfnis-Profil mit allen 88 Werten (0-100)
 *
 * WISSENSCHAFTLICHE GRUNDLAGEN:
 * ─────────────────────────────────────────────────────────────────────────────
 * - Attachment Theory (Hazan & Shaver, 1987): Secure/Anxious-Preoccupied Stil
 * - Interdependence Theory (Kelley & Thibaut, 1978): Hohe Interdependenz
 * - Sternberg's Triangular Theory: Intimacy + Commitment dominant
 * - Self-Expansion Theory (Aron & Aron, 1986): Partner als Teil des Selbst
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * CHARAKTERISTIK:
 * - Tiefe Verschmelzung und exklusive Bindung
 * - Sicherheit und Stabilität priorisiert
 * - "Zwei werden eins" - Identität verschmilzt mit Partner
 * - Hohe emotionale Investition
 */

const DuoProfil = {
    id: "duo",
    name: "Duo",
    beschreibung: "Tiefe Verschmelzung, Sicherheit und exklusive Bindung. Zwei werden eins.",

    quellen: [
        "Attachment Theory - Secure/Anxious (Hazan & Shaver, 1987)",
        "Interdependence Theory (Kelley & Thibaut, 1978)",
        "Self-Expansion Model (Aron & Aron, 1986)",
        "Sternberg's Triangular Theory of Love (1986)"
    ],

    beduerfnisse: {

        // ═══════════════════════════════════════════════════════════════════════
        // EXISTENZ (9) - Grundlegende physische Bedürfnisse
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Körperliche Nähe und gemeinsame Versorgung wichtig
        existenz: {
            luft: 50,                    // Universal, neutral
            wasser: 50,                  // Universal, neutral
            nahrung: 55,                 // Leicht erhöht - gemeinsame Mahlzeiten
            bewegung: 55,                // Mittel - gemeinsame Aktivitäten
            beruehrung: 90,              // Sehr hoch - körperliche Nähe essentiell
            erholung: 75,                // Hoch - gemeinsame Ruhezeiten
            sexueller_ausdruck: 80,      // Hoch - Intimität als Bindung
            sicherheit_physisch: 75,     // Hoch - gegenseitiger Schutz
            unterschlupf: 80             // Hoch - gemeinsames Zuhause wichtig
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SICHERHEIT (6) - Emotionale und psychische Sicherheit
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: KERN-KATEGORIE - Sicherheit durch Beziehung
        // Quelle: Attachment Theory - secure base function
        sicherheit: {
            bestaendigkeit: 90,          // Sehr hoch - Verlässlichkeit wichtig
            sich_sicher_fuehlen: 95,     // Sehr hoch - Kernbedürfnis
            schutz: 85,                  // Sehr hoch - beschützt werden wollen
            stabilitaet: 95,             // Sehr hoch - Beziehung als Anker
            leichtigkeit: 60,            // Mittel - Sicherheit > Leichtigkeit
            geborgenheit: 95             // Sehr hoch - emotionale Heimat
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ZUNEIGUNG (9) - Liebe, Nähe und emotionale Verbindung
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: KERN-KATEGORIE - höchste Werte
        // Quelle: Triangular Theory - High Intimacy
        zuneigung: {
            waerme: 90,                  // Sehr hoch - emotionale Wärme
            wertschaetzung: 85,          // Sehr hoch - gegenseitige Wertschätzung
            naehe: 95,                   // Sehr hoch - maximale Nähe gewünscht
            gesellschaft: 85,            // Sehr hoch - gemeinsam sein
            intimitaet: 95,              // Sehr hoch - tiefe Verbindung
            liebe: 95,                   // Sehr hoch - Kern des Lebens
            fuersorge: 90,               // Sehr hoch - für Partner sorgen
            unterstuetzung: 90,          // Sehr hoch - gegenseitige Stütze
            fuereinander_da_sein: 95     // Sehr hoch - Priorität
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERSTÄNDNIS (9) - Gesehen und verstanden werden
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Tiefes gegenseitiges Verständnis gewünscht
        // Quelle: Self-Expansion - Partner versteht "wahres Selbst"
        verstaendnis: {
            akzeptanz: 90,               // Sehr hoch - bedingungslose Akzeptanz
            mitgefuehl: 85,              // Sehr hoch - emotionale Resonanz
            beruecksichtigung: 85,       // Sehr hoch - Rücksichtnahme
            empathie: 90,                // Sehr hoch - sich einfühlen
            vertrauen: 95,               // Sehr hoch - absolutes Vertrauen
            beachtung: 80,               // Hoch - Aufmerksamkeit
            gesehen_werden: 85,          // Sehr hoch - wirklich gesehen
            verstanden_werden: 90,       // Sehr hoch - tief verstanden
            harmonie: 90                 // Sehr hoch - Konflikt vermeiden
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FREIHEIT (5) - Autonomie und Selbstbestimmung
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Niedrige Autonomie-Bedürfnisse - Wir > Ich
        // Quelle: Interdependence - high mutuality preferred
        freiheit: {
            selbstbestimmung: 45,        // Niedrig-mittel - gemeinsame Entscheidungen
            waehlen_koennen: 50,         // Mittel - mit Partner abstimmen
            unabhaengigkeit: 35,         // Niedrig - Abhängigkeit akzeptiert
            raum_haben: 40,              // Niedrig - wenig Raumbedürfnis
            spontaneitaet: 45            // Niedrig-mittel - Planbarkeit bevorzugt
        },

        // ═══════════════════════════════════════════════════════════════════════
        // TEILNAHME (7) - Gemeinschaft und Zugehörigkeit
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Beziehung als primäre Gemeinschaft
        teilnahme: {
            zusammenarbeit: 85,          // Sehr hoch - Teamwork
            kommunikation: 85,           // Sehr hoch - offene Kommunikation
            gemeinschaft: 70,            // Hoch - aber Paar-zentriert
            zugehoerigkeit: 90,          // Sehr hoch - Zugehörigkeit zum Partner
            gegenseitigkeit: 90,         // Sehr hoch - Geben und Nehmen
            respekt: 85,                 // Sehr hoch - gegenseitiger Respekt
            bedeutung_haben: 80          // Hoch - wichtig für Partner sein
        },

        // ═══════════════════════════════════════════════════════════════════════
        // MUSSE (4) - Erholung, Freude und Genuss
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Gemeinsamer Genuss, weniger alleine
        musse: {
            schoenheit: 70,              // Hoch - gemeinsam genießen
            freizeit: 75,                // Hoch - aber zusammen
            freude: 85,                  // Sehr hoch - geteilte Freude
            humor: 80                    // Hoch - gemeinsames Lachen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // IDENTITÄT (14) - Selbstverwirklichung und Sinn
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Identität durch Beziehung definiert
        // Quelle: Self-Expansion - Partner erweitert Selbst
        identitaet: {
            authentizitaet: 70,          // Hoch - aber angepasst an Partner
            echtheit: 75,                // Hoch - innerhalb der Beziehung
            integritaet: 80,             // Hoch - Treue als Wert
            praesenz: 75,                // Hoch - präsent für Partner
            ordnung: 70,                 // Hoch - gemeinsame Struktur
            bewusstheit: 65,             // Mittel-hoch
            herausforderung: 50,         // Mittel - Stabilität bevorzugt
            klarheit: 70,                // Hoch - klare Erwartungen
            kompetenz: 60,               // Mittel - als Partner kompetent
            effizienz: 55,               // Mittel
            wirksamkeit: 60,             // Mittel - Einfluss in Beziehung
            wachstum: 65,                // Mittel-hoch - gemeinsam wachsen
            sinn: 80,                    // Hoch - Beziehung gibt Sinn
            beitrag_leisten: 75          // Hoch - für Beziehung beitragen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ERSCHAFFEN (5) - Kreativität und Lernen
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Gemeinsames Erschaffen, weniger individuell
        erschaffen: {
            kreativitaet: 55,            // Mittel - wenn gemeinsam
            entdecken: 60,               // Mittel - zusammen entdecken
            lernen: 60,                  // Mittel - voneinander lernen
            selbst_ausdruck: 55,         // Mittel - durch Beziehung
            anreize_bekommen: 55         // Mittel - vom Partner
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERBUNDENHEIT (5) - Tiefe existenzielle Verbindung
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Tiefe Verbundenheit durch Partner
        verbundenheit: {
            leben_feiern: 80,            // Hoch - gemeinsam feiern
            inspiration: 65,             // Mittel-hoch - durch Partner
            trauer_ausdruecken: 75,      // Hoch - gemeinsam trauern
            einsehen: 60,                // Mittel - mit Unterstützung
            anfang_ende: 70              // Hoch - Lebensphasen zusammen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // DYNAMIK (15) - Machtdynamik und bewusster Austausch
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Tendenz zu Hingabe und Geführt-Werden, sucht Schutz
        // Quelle: Attachment - seeking safe haven
        dynamik: {
            kontrolle_ausueben: 35,      // Niedrig - gibt Kontrolle ab
            hingabe: 75,                 // Hoch - kann sich hingeben
            fuehrung_geben: 40,          // Niedrig-mittel - eher folgend
            gefuehrt_werden: 70,         // Hoch - lässt sich führen
            ritual: 80,                  // Hoch - liebt gemeinsame Rituale
            nachsorge: 85,               // Sehr hoch - braucht und gibt
            grenzen_setzen: 50,          // Mittel - schwerer mit Grenzen
            grenzen_respektieren: 85,    // Sehr hoch - respektiert Partner
            intensitaet: 75,             // Hoch - intensive Verbindung
            vertrauen_schenken: 90,      // Sehr hoch - vertraut voll
            verantwortung_uebernehmen: 70, // Hoch - für Beziehung
            sich_fallenlassen: 80,       // Hoch - kann loslassen
            machtaustausch: 65,          // Mittel-hoch - offen dafür
            dienend_sein: 70,            // Hoch - für Partner da sein
            beschuetzen: 80              // Hoch - will beschützen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // LEBENSPLANUNG - Kinder, Ehe, Wohnen, Familie
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Traditionelle Lebensplanung, Familie als Ziel
        lebensplanung: {
            kinderwunsch: 85,            // Sehr hoch - Familie gründen
            elternschaft: 80,            // Hoch - gemeinsam Eltern sein
            fortpflanzung: 75,           // Hoch - biologisches Bedürfnis
            familie_gruenden: 85,        // Sehr hoch - Kernwunsch
            generativitaet: 75,          // Hoch - etwas weitergeben
            verbindlichkeit: 95,         // Sehr hoch - Kern des Duo
            langfristige_bindung: 95,    // Sehr hoch - "für immer"
            rechtliche_sicherheit: 85,   // Sehr hoch - Ehe wichtig
            treueversprechen: 95,        // Sehr hoch - exklusiv
            gemeinsamer_wohnraum: 95,    // Sehr hoch - zusammen leben
            haeuslichkeit: 90,           // Sehr hoch - gemeinsames Zuhause
            nest_bauen: 90,              // Sehr hoch - Heim schaffen
            alltag_teilen: 95,           // Sehr hoch - alles zusammen
            eigener_raum: 35,            // Niedrig - wenig Raumbedürfnis
            rueckzugsort: 40,            // Niedrig - immer zusammen
            tierliebe: 70,               // Hoch - gemeinsame Haustiere
            fuersorge_tiere: 70,         // Hoch
            begleiter: 65,               // Mittel-hoch
            verantwortung_tier: 70,      // Hoch
            sesshaftigkeit: 90,          // Sehr hoch - Stabilität
            verwurzelung: 85,            // Sehr hoch - Heimat
            mobilitaet: 30,              // Niedrig - sesshaft
            heimat: 90,                  // Sehr hoch
            neue_orte: 35,               // Niedrig
            familienbindung: 85,         // Sehr hoch
            herkunftsfamilie: 80,        // Hoch
            familientreffen: 80,         // Hoch
            generationenverbund: 80,     // Hoch
            // Pirsig & Osho - Lebensplanung
            biologisches_muster: 85,     // Sehr hoch - biologische Kontinuität
            soziales_muster: 90,         // Sehr hoch - traditionelle Strukturen
            statische_stabilitaet: 90,   // Sehr hoch - feste Muster gewünscht
            qualitaet_der_fuersorge: 85, // Sehr hoch - sorgfältige Planung
            familien_rebellion: 15,      // Niedrig - traditionell orientiert
            zorba_das_kind: 60,          // Mittel - Freude am Familienleben
            nicht_anhaften_an_familie: 20, // Niedrig - starke Bindung
            bewusste_elternschaft: 65,   // Mittel-hoch - bewusst aber konservativ
            commune_statt_kernfamilie: 15 // Niedrig - Kernfamilie bevorzugt
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FINANZEN & KARRIERE
        // ═══════════════════════════════════════════════════════════════════════
        finanzen_karriere: {
            finanzielle_unabhaengigkeit: 40,  // Niedrig - gemeinsam
            gemeinsame_finanzen: 90,          // Sehr hoch - alles teilen
            finanzielle_transparenz: 85,      // Sehr hoch
            finanzielle_sicherheit: 90,       // Sehr hoch - Stabilität
            sparsamkeit: 70,                  // Hoch - für Familie
            grosszuegigkeit: 75,              // Hoch - für Partner
            berufliche_erfuellung: 55,        // Mittel - Beziehung wichtiger
            karriereambition: 45,             // Niedrig-mittel
            work_life_balance: 85,            // Sehr hoch - Zeit für Beziehung
            berufliche_anerkennung: 50,       // Mittel
            zeit_fuer_beziehung: 95,          // Sehr hoch - Priorität
            berufliche_flexibilitaet: 60,     // Mittel - für Familie
            // Pirsig & Osho - Finanzen & Karriere
            gumption: 55,                     // Mittel - Beziehung wichtiger
            qualitaet_der_arbeit: 60,         // Mittel - solide Arbeit
            intellektuelles_muster: 50,       // Mittel
            dynamische_evolution: 40,         // Niedrig - Stabilität bevorzugt
            klassisches_verstehen: 65,        // Mittel-hoch - analytisch
            arbeit_als_meditation: 40,        // Niedrig-mittel
            nicht_karriere: 35,               // Niedrig - konservativ
            zorba_der_unternehmer: 45,        // Niedrig-mittel
            nicht_anhaften_an_geld: 30,       // Niedrig - Sicherheit wichtig
            kreative_selbstverwirklichung: 45 // Niedrig-mittel
        },

        // ═══════════════════════════════════════════════════════════════════════
        // KOMMUNIKATIONSSTIL
        // ═══════════════════════════════════════════════════════════════════════
        kommunikation_stil: {
            taeglicher_austausch: 90,         // Sehr hoch
            tiefgehende_gespraeche: 85,       // Sehr hoch
            small_talk: 70,                   // Hoch
            stille_gemeinsam: 85,             // Sehr hoch - gemeinsam still
            verbale_verbindung: 85,           // Sehr hoch
            zuhoeren: 85,                     // Sehr hoch
            emotionale_offenheit: 85,         // Sehr hoch
            gefuehle_zeigen: 85,              // Sehr hoch
            verletzlichkeit: 80,              // Hoch - beim Partner sicher
            emotionale_zurueckhaltung: 25,    // Niedrig
            emotionale_sicherheit: 95,        // Sehr hoch - braucht das
            gefuehle_teilen: 90,              // Sehr hoch
            konfliktklaerung: 65,             // Mittel-hoch
            aussprache: 70,                   // Hoch
            konflikt_vermeiden: 80,           // Hoch - Harmonie wichtig
            streitkultur: 55,                 // Mittel
            versoehnlichkeit: 90,             // Sehr hoch
            // Pirsig & Osho - Kommunikation
            romantisches_verstehen: 75,       // Hoch - intuitiv verbunden
            klassische_klarheit: 65,          // Mittel-hoch - klare Worte
            dialektik: 45,                    // Niedrig-mittel
            qualitaets_ausdruck: 60,          // Mittel
            care_im_gespraech: 80,            // Hoch - achtsam kommunizieren
            schweigen_statt_worte: 70,        // Hoch - gemeinsame Stille
            radikale_ehrlichkeit: 50,         // Mittel - Harmonie wichtiger
            humorvolle_leichtigkeit: 65,      // Mittel-hoch
            paradoxe_weisheit: 30,            // Niedrig - Klarheit bevorzugt
            herz_statt_kopf: 75,              // Hoch - emotional
            authentischer_ausdruck: 60        // Mittel - angepasst an Partner
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN
        // ═══════════════════════════════════════════════════════════════════════
        soziales_leben: {
            soziale_energie: 60,              // Mittel - Paar-zentriert
            geselligkeit: 55,                 // Mittel
            ruhe_von_menschen: 60,            // Mittel
            allein_aufladen: 40,              // Niedrig - mit Partner aufladen
            menschen_treffen: 55,             // Mittel
            kleine_gruppen: 65,               // Mittel-hoch
            zeit_fuer_sich: 35,               // Niedrig
            eigene_hobbys: 40,                // Niedrig - gemeinsame Hobbys
            gemeinsame_zeit: 95,              // Sehr hoch - Priorität
            partnerzeit: 95,                  // Sehr hoch
            eigene_interessen: 45,            // Niedrig-mittel
            eigene_freunde: 45,               // Niedrig-mittel
            gemeinsame_freunde: 80,           // Hoch
            freundeskreis_teilen: 80,         // Hoch
            soziales_netz: 70,                // Hoch - als Paar
            freunde_pflegen: 65,              // Mittel-hoch
            neue_freundschaften: 50,          // Mittel
            // Pirsig & Osho - Soziales Leben
            soziale_qualitaet: 75,            // Hoch - wenige, aber tiefe
            tribe_muster: 70,                 // Hoch - Familien-Tribe
            intellektuelle_gemeinschaft: 50,  // Mittel
            statische_sozialstrukturen: 75,   // Hoch - feste Strukturen
            sannyas_gemeinschaft: 20,         // Niedrig - traditionell
            rebellion_gegen_gesellschaft: 15, // Niedrig - angepasst
            einsamkeit_in_menge: 30,          // Niedrig - zusammen sein
            celebration_mit_anderen: 65,      // Mittel-hoch
            keine_freundschaft_besitz: 25,    // Niedrig - feste Freunde
            tantra_gruppe: 15                 // Niedrig - traditionell
        },

        // ═══════════════════════════════════════════════════════════════════════
        // INTIMITÄT & ROMANTIK
        // ═══════════════════════════════════════════════════════════════════════
        intimitaet_beziehung: {
            koerpernaehe: 95,                 // Sehr hoch
            kuscheln: 95,                     // Sehr hoch
            physische_distanz: 20,            // Niedrig - will Nähe
            koerperkontakt: 90,               // Sehr hoch
            umarmungen: 90,                   // Sehr hoch
            hand_halten: 85,                  // Sehr hoch
            romantische_gesten: 85,           // Sehr hoch
            ueberraschungen: 75,              // Hoch
            dates: 80,                        // Hoch
            alltags_romantik: 85,             // Sehr hoch
            aufmerksamkeiten: 85,             // Sehr hoch
            liebesbekundungen: 90,            // Sehr hoch
            sexuelle_haeufigkeit: 80,         // Hoch
            sexuelle_intimiaet: 90,           // Sehr hoch
            koerperliche_lust: 75,            // Hoch
            sexuelle_experimentierfreude: 55, // Mittel
            sexuelle_verbindung: 90,          // Sehr hoch
            sexuelle_zufriedenheit: 85,       // Sehr hoch
            // Pirsig & Osho - Intimität
            biologische_anziehung: 75,        // Hoch - Chemie wichtig
            intellektuelle_verbindung: 70,    // Hoch - Verständnis
            qualitaet_der_beruehrung: 85,     // Sehr hoch - achtsam
            dynamische_liebe: 65,             // Mittel-hoch - wachsen
            care_in_intimitaet: 85,           // Sehr hoch - fürsorglich
            sex_als_meditation: 45,           // Niedrig-mittel
            liebe_ohne_beziehung: 10,         // Niedrig - Beziehung = Liebe
            orgastisches_leben: 50,           // Mittel
            nicht_anhaften_an_partner: 10,    // Niedrig - starke Bindung
            hier_und_jetzt_intimitaet: 60,    // Mittel - präsent
            polyamore_energie: 5,             // Sehr niedrig - exklusiv
            wildheit_und_zartheit: 55,        // Mittel
            meditation_zu_zweit: 50           // Mittel
        },

        // ═══════════════════════════════════════════════════════════════════════
        // WERTE & HALTUNGEN
        // ═══════════════════════════════════════════════════════════════════════
        werte_haltung: {
            spiritualitaet: 55,               // Mittel
            glaubenspraxis: 50,               // Mittel
            religioese_gemeinschaft: 55,      // Mittel
            saekularitaet: 50,                // Mittel
            sinnsuche: 65,                    // Mittel-hoch
            transzendenz: 55,                 // Mittel
            traditionelle_werte: 75,          // Hoch - eher traditionell
            moderne_lebensweise: 45,          // Niedrig-mittel
            konservative_werte: 65,           // Mittel-hoch
            progressive_werte: 45,            // Niedrig-mittel
            kulturelle_tradition: 70,         // Hoch
            offenheit_fuer_neues: 45,         // Niedrig-mittel
            umweltverantwortung: 55,          // Mittel
            nachhaltigkeit: 55,               // Mittel
            oekologisches_bewusstsein: 50,    // Mittel
            pragmatismus: 65,                 // Mittel-hoch
            klimaschutz: 50,                  // Mittel
            ressourcenschonung: 55,           // Mittel
            // Pirsig & Osho - Werte
            qualitaet_als_gott: 60,           // Mittel - Qualität wichtig
            rationaler_mystizismus: 45,       // Niedrig-mittel
            aristotelische_vernunft: 65,      // Mittel-hoch - logisch
            platonische_ideen: 55,            // Mittel
            buddhistische_achtsamkeit: 55,    // Mittel
            religionslosigkeit: 25,           // Niedrig - traditionell
            eigene_wahrheit: 40,              // Niedrig-mittel
            zen_paradox: 25,                  // Niedrig - Klarheit
            tantra_als_weg: 30,               // Niedrig
            politische_rebellion: 20,         // Niedrig - angepasst
            individueller_anarchismus: 15,    // Niedrig - Struktur
            leben_als_kunst: 50,              // Mittel
            celebration_statt_gebet: 45       // Niedrig-mittel
        },

        // ═══════════════════════════════════════════════════════════════════════
        // PRAKTISCHES LEBEN
        // ═══════════════════════════════════════════════════════════════════════
        praktisches_leben: {
            ordnungssinn: 70,                 // Hoch
            sauberkeit: 70,                   // Hoch
            struktur: 75,                     // Hoch - braucht Struktur
            chaos_toleranz: 40,               // Niedrig
            organisiert_sein: 70,             // Hoch
            flexibilitaet_haushalt: 50,       // Mittel
            reisen: 55,                       // Mittel - gemeinsam
            abenteuer: 40,                    // Niedrig - Sicherheit
            neue_orte_entdecken: 50,          // Mittel
            zuhause_bleiben: 80,              // Hoch - Nestwärme
            urlaub: 70,                       // Hoch - gemeinsam
            fernweh: 35,                      // Niedrig
            heimatverbundenheit: 85,          // Sehr hoch
            // Pirsig & Osho - Praktisches Leben
            motorrad_pflege: 50,              // Mittel - handwerklich
            gumption_im_alltag: 60,           // Mittel - motiviert
            stuck_vermeiden: 50,              // Mittel
            klassische_ordnung: 75,           // Hoch - strukturiert
            romantisches_chaos: 35,           // Niedrig - Ordnung
            qualitaets_werkzeug: 60,          // Mittel
            achtsamkeit_im_detail: 70,        // Hoch - sorgfältig
            meditation_im_alltag: 45,         // Niedrig-mittel
            gesundheit_durch_bewusstsein: 50, // Mittel
            dynamische_meditation: 30,        // Niedrig
            vipassana_im_leben: 40,           // Niedrig-mittel
            natuerliches_leben: 55,           // Mittel
            lachen_therapie: 60,              // Mittel
            no_mind: 30,                      // Niedrig - denkt viel
            zorba_der_geniesser: 60           // Mittel - genießt
        }
    },

    // Zusammenfassung der Kernwerte
    kernwerte: ["Sicherheit", "Liebe", "Treue", "Harmonie", "Verschmelzung"],
    vermeidet: ["Trennung", "Alleinsein", "Unsicherheit", "Distanz", "Konflikte"]
};

// Export für verschiedene Module-Systeme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DuoProfil;
}
if (typeof window !== 'undefined') {
    window.DuoProfil = DuoProfil;
}
