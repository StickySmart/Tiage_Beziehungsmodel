/**
 * AROMANTISCH - Der Romantik-Unabhängige
 *
 * Vollständiges Bedürfnis-Profil mit allen 88 Werten (0-100)
 *
 * WISSENSCHAFTLICHE GRUNDLAGEN:
 * ─────────────────────────────────────────────────────────────────────────────
 * - Aromantic Spectrum Research (Antonsen et al., 2020)
 * - Amatonormativity Critique (Brake, 2012): Challenging romantic love centrality
 * - Friendship Studies (Rawlins, 2009): Non-romantic intimacy
 * - Identity-First Relationships: Self as primary
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * CHARAKTERISTIK:
 * - Wenig oder keine romantische Anziehung
 * - Freundschaften und andere Beziehungen erfüllend
 * - Hinterfragt Amatonormativität (Romantik als Norm)
 * - Erfülltes Leben ohne romantische Beziehung
 */

const AromantischProfil = {
    id: "aromantisch",
    name: "Aromantisch",
    beschreibung: "Erfülltes Leben jenseits romantischer Liebe. Tiefe Freundschaften und Selbstbeziehung statt Romantik.",

    quellen: [
        "Aromantic Spectrum Research (Antonsen et al., 2020)",
        "Amatonormativity (Brake, 2012)",
        "Friendship and Intimacy (Rawlins, 2009)",
        "AVEN Community Research (2021)"
    ],

    beduerfnisse: {

        // ═══════════════════════════════════════════════════════════════════════
        // EXISTENZ (9)
        // ═══════════════════════════════════════════════════════════════════════
        existenz: {
            luft: 50,
            wasser: 50,
            nahrung: 50,
            bewegung: 70,                // Hoch
            beruehrung: 45,              // Niedrig-mittel - nicht romantisch
            erholung: 75,                // Hoch
            sexueller_ausdruck: 40,      // Niedrig-mittel - variabel (aro ≠ ace)
            sicherheit_physisch: 65,     // Mittel-hoch
            unterschlupf: 70             // Hoch - eigener Raum
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SICHERHEIT (6)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Innere Sicherheit, nicht durch Romantik
        sicherheit: {
            bestaendigkeit: 60,          // Mittel - durch Freundschaften
            sich_sicher_fuehlen: 70,     // Hoch - in sich selbst
            schutz: 50,                  // Mittel
            stabilitaet: 65,             // Mittel-hoch - eigene Stabilität
            leichtigkeit: 80,            // Hoch - frei von romantischem Druck
            geborgenheit: 50             // Mittel - durch Freunde
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ZUNEIGUNG (9)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Platonische Zuneigung, keine romantische
        zuneigung: {
            waerme: 60,                  // Mittel - platonisch
            wertschaetzung: 70,          // Hoch - Freunde wertschätzen
            naehe: 50,                   // Mittel - emotional, nicht romantisch
            gesellschaft: 70,            // Hoch - Freundeskreis wichtig
            intimitaet: 35,              // Niedrig - keine romantische Intimität
            liebe: 30,                   // Niedrig - romantische Liebe nicht gefühlt
            fuersorge: 65,               // Mittel-hoch - für Freunde
            unterstuetzung: 70,          // Hoch - Freundschaftsnetzwerk
            fuereinander_da_sein: 65     // Mittel-hoch - für Freunde
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERSTÄNDNIS (9)
        // ═══════════════════════════════════════════════════════════════════════
        verstaendnis: {
            akzeptanz: 85,               // Sehr hoch - Selbstakzeptanz wichtig
            mitgefuehl: 65,              // Mittel-hoch
            beruecksichtigung: 70,       // Hoch
            empathie: 65,                // Mittel-hoch
            vertrauen: 70,               // Hoch - in Freundschaften
            beachtung: 65,               // Mittel-hoch
            gesehen_werden: 80,          // Hoch - als vollständig ohne Romantik
            verstanden_werden: 85,       // Sehr hoch - oft missverstanden
            harmonie: 60                 // Mittel
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FREIHEIT (5)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Hohe Autonomie
        freiheit: {
            selbstbestimmung: 90,        // Sehr hoch
            waehlen_koennen: 85,         // Sehr hoch - eigenen Weg wählen
            unabhaengigkeit: 90,         // Sehr hoch - von romantischen Normen
            raum_haben: 85,              // Sehr hoch
            spontaneitaet: 80            // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // TEILNAHME (7)
        // ═══════════════════════════════════════════════════════════════════════
        teilnahme: {
            zusammenarbeit: 65,          // Mittel-hoch
            kommunikation: 75,           // Hoch - Identität erklären
            gemeinschaft: 75,            // Hoch - Aro/Ace Community
            zugehoerigkeit: 70,          // Hoch - zu Freunden, Community
            gegenseitigkeit: 70,         // Hoch - in Freundschaften
            respekt: 85,                 // Sehr hoch - für alle Lebensformen
            bedeutung_haben: 75          // Hoch - durch andere Beiträge
        },

        // ═══════════════════════════════════════════════════════════════════════
        // MUSSE (4)
        // ═══════════════════════════════════════════════════════════════════════
        musse: {
            schoenheit: 70,              // Hoch
            freizeit: 85,                // Sehr hoch - eigene Zeit
            freude: 80,                  // Hoch - nicht von Romantik abhängig
            humor: 75                    // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // IDENTITÄT (14)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Starke Selbstidentität
        identitaet: {
            authentizitaet: 95,          // Sehr hoch - eigene Identität leben
            echtheit: 95,                // Sehr hoch
            integritaet: 90,             // Sehr hoch - zu sich stehen
            praesenz: 75,                // Hoch
            ordnung: 65,                 // Mittel-hoch
            bewusstheit: 90,             // Sehr hoch - Selbstreflexion
            herausforderung: 70,         // Hoch - Normen hinterfragen
            klarheit: 85,                // Sehr hoch - eigene Identität
            kompetenz: 80,               // Hoch
            effizienz: 70,               // Hoch
            wirksamkeit: 80,             // Hoch
            wachstum: 80,                // Hoch
            sinn: 85,                    // Sehr hoch - Sinn jenseits Romantik
            beitrag_leisten: 75          // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ERSCHAFFEN (5)
        // ═══════════════════════════════════════════════════════════════════════
        erschaffen: {
            kreativitaet: 80,            // Hoch
            entdecken: 80,               // Hoch
            lernen: 80,                  // Hoch
            selbst_ausdruck: 85,         // Sehr hoch
            anreize_bekommen: 75         // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERBUNDENHEIT (5)
        // ═══════════════════════════════════════════════════════════════════════
        verbundenheit: {
            leben_feiern: 80,            // Hoch
            inspiration: 80,             // Hoch
            trauer_ausdruecken: 55,      // Mittel - individuell
            einsehen: 75,                // Hoch
            anfang_ende: 65              // Mittel-hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // DYNAMIK (15)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Meist autonom, Dynamik in Freundschaften möglich
        dynamik: {
            kontrolle_ausueben: 55,      // Mittel
            hingabe: 35,                 // Niedrig - keine romantische Hingabe
            fuehrung_geben: 50,          // Mittel
            gefuehrt_werden: 35,         // Niedrig
            ritual: 50,                  // Mittel - Freundschafts-Rituale
            nachsorge: 55,               // Mittel
            grenzen_setzen: 90,          // Sehr hoch - wichtig
            grenzen_respektieren: 90,    // Sehr hoch
            intensitaet: 50,             // Mittel - anders als romantisch
            vertrauen_schenken: 60,      // Mittel - in Freundschaften
            verantwortung_uebernehmen: 75, // Hoch - für sich selbst
            sich_fallenlassen: 35,       // Niedrig
            machtaustausch: 35,          // Niedrig
            dienend_sein: 40,            // Niedrig-mittel
            beschuetzen: 55              // Mittel
        },

        // ═══════════════════════════════════════════════════════════════════════
        // LEBENSPLANUNG (15) - Kinder, Ehe, Wohnen, Familie
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Kein romantischer Rahmen für Lebensplanung
        lebensplanung: {
            kinderwunsch: 30,            // Niedrig - nicht durch Partnerschaft
            elternschaft: 25,            // Niedrig - selten priorisiert
            fortpflanzung: 20,           // Niedrig
            fuersorge: 55,               // Mittel - für Freunde
            familie_gruenden: 15,        // Sehr niedrig - nicht das Ziel
            generativitaet: 50,          // Mittel - anders ausgelebt
            erziehung_werte: 30,         // Niedrig-mittel
            verbindlichkeit: 30,         // Niedrig - keine romantische Bindung
            langfristige_bindung: 35,    // Niedrig - nicht romantisch
            rechtliche_sicherheit: 25,   // Niedrig - nicht relevant
            tradition_ehe: 5,            // Minimum - kein Interesse
            oeffentliches_bekenntnis: 15, // Sehr niedrig - nicht nötig
            gemeinsamer_wohnraum: 25,    // Niedrig - eventuell mit Freunden
            eigener_rueckzugsort: 90,    // Sehr hoch - wichtig
            haeuslichkeit: 60,           // Mittel-hoch - eigenes Zuhause
            // Pirsig & Osho - Lebensplanung
            biologisches_muster: 20,     // Niedrig
            soziales_muster: 20,         // Niedrig - Normen abgelehnt
            statische_stabilitaet: 45,   // Mittel
            qualitaet_der_fuersorge: 60, // Mittel
            familien_rebellion: 80,      // Hoch
            zorba_das_kind: 65,          // Mittel-hoch
            nicht_anhaften_an_familie: 85, // Sehr hoch
            bewusste_elternschaft: 35,   // Niedrig
            commune_statt_kernfamilie: 55 // Mittel
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FINANZEN & KARRIERE (10) - Geld, Arbeit, berufliche Entwicklung
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Vollständige Eigenständigkeit
        finanzen_karriere: {
            finanzielle_unabhaengigkeit: 95, // Sehr hoch - essentiell
            gemeinsame_finanzen: 10,     // Sehr niedrig - nur evtl. mit Freunden
            versorger_rolle: 15,         // Sehr niedrig - nur für sich
            materielle_sicherheit: 70,   // Hoch - eigene Absicherung
            karriere_entwicklung: 80,    // Hoch - Erfüllung durch Arbeit
            berufliche_anerkennung: 75,  // Hoch
            work_life_balance: 80,       // Hoch
            gemeinsame_ziele: 30,        // Niedrig - eigene Ziele
            erfolg: 80,                  // Hoch
            leistung: 75,                // Hoch
            // Pirsig & Osho - Finanzen & Karriere
            gumption: 80,                // Hoch
            qualitaet_der_arbeit: 80,    // Hoch
            intellektuelles_muster: 80,  // Hoch
            dynamische_evolution: 75,    // Hoch
            klassisches_verstehen: 70,   // Hoch
            arbeit_als_meditation: 65,   // Mittel-hoch
            nicht_karriere: 35,          // Niedrig
            zorba_der_unternehmer: 65,   // Mittel-hoch
            nicht_anhaften_an_geld: 60,  // Mittel
            kreative_selbstverwirklichung: 85 // Sehr hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // KOMMUNIKATION & STIL (12) - Art des Austauschs
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Kommunikation über Identität wichtig
        kommunikation_stil: {
            emotionale_offenheit: 55,    // Mittel - mit Freunden
            tiefe_gespraeche: 70,        // Hoch - intellektuell/philosophisch
            small_talk: 55,              // Mittel
            konfliktbereitschaft: 65,    // Mittel-hoch
            konstruktive_kritik: 70,     // Hoch
            aktives_zuhoeren: 70,        // Hoch - für Freunde
            nonverbale_kommunikation: 50, // Mittel
            humor_ironie: 80,            // Hoch - oft selbstironisch
            intellektueller_austausch: 85, // Sehr hoch
            digitale_kommunikation: 75,  // Hoch - Community online
            verbale_anerkennung: 55,     // Mittel
            schweigen_aushalten: 85,     // Sehr hoch - allein sein können
            // Pirsig & Osho - Kommunikation
            romantisches_verstehen: 30,  // Niedrig - nicht romantisch
            klassische_klarheit: 80,     // Hoch
            dialektik: 75,               // Hoch
            qualitaets_ausdruck: 70,     // Hoch
            care_im_gespraech: 60,       // Mittel
            schweigen_statt_worte: 80,   // Hoch
            radikale_ehrlichkeit: 85,    // Sehr hoch
            humorvolle_leichtigkeit: 80, // Hoch
            paradoxe_weisheit: 60,       // Mittel
            herz_statt_kopf: 35,         // Niedrig - rational
            authentischer_ausdruck: 95   // Sehr hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN (12) - Freunde, Familie, Gesellschaft
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Freundschaften statt romantische Beziehungen
        soziales_leben: {
            freundeskreis_pflege: 90,    // Sehr hoch - zentral
            gemeinsame_freunde: 70,      // Hoch - Freundeskreis
            familieneinbindung: 45,      // Mittel - kann Erklärung brauchen
            gesellschaftliches_engagement: 60, // Mittel-hoch - Aktivismus
            networking: 65,              // Mittel-hoch
            gemeinsame_hobbys: 60,       // Mittel-hoch - mit Freunden
            individuelle_hobbys: 90,     // Sehr hoch - wichtig
            gemeinsame_zeit: 55,         // Mittel - mit Freunden
            zeit_fuer_sich: 90,          // Sehr hoch - Kernbedürfnis
            soziale_unterstuetzung: 70,  // Hoch - Freundesnetzwerk
            gemeinsame_erlebnisse: 65,   // Mittel-hoch - mit Freunden
            alltagsteilung: 20,          // Niedrig - eigener Alltag
            // Pirsig & Osho - Soziales Leben
            soziale_qualitaet: 85,       // Sehr hoch - tiefe Freundschaften
            tribe_muster: 60,            // Mittel - Freundeskreis
            intellektuelle_gemeinschaft: 85, // Sehr hoch
            statische_sozialstrukturen: 30, // Niedrig
            sannyas_gemeinschaft: 45,    // Mittel
            rebellion_gegen_gesellschaft: 75, // Hoch - gegen Amatonormativität
            einsamkeit_in_menge: 75,     // Hoch
            celebration_mit_anderen: 70, // Hoch
            keine_freundschaft_besitz: 65, // Mittel-hoch
            tantra_gruppe: 20            // Niedrig
        },

        // ═══════════════════════════════════════════════════════════════════════
        // INTIMITÄT & BEZIEHUNG (12) - Nähe, Sexualität, Bindung
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Keine romantische Intimität, platonische Nähe möglich
        intimitaet_beziehung: {
            koerpernaehe: 35,            // Niedrig - platonisch ok
            kuscheln: 35,                // Niedrig - mit Freunden evtl.
            sexuelle_exklusivitaet: 30,  // Niedrig - nicht romantisch definiert
            sexuelle_offenheit: 50,      // Mittel - variabel (aro ≠ ace)
            leidenschaft: 25,            // Niedrig - keine romantische
            zaertlichkeit: 35,           // Niedrig-mittel - platonisch
            emotionale_tiefe: 50,        // Mittel - mit Freunden
            romantik: 10,                // Sehr niedrig - nicht gefühlt
            flirten: 25,                 // Niedrig - meist nicht
            eifersucht_als_signal: 25,   // Niedrig - kein Thema
            treue_werte: 30,             // Niedrig - nicht romantisch definiert
            bindungsbereitschaft: 25,    // Niedrig - keine romantische
            // Pirsig & Osho - Intimität
            biologische_anziehung: 35,   // Niedrig
            intellektuelle_verbindung: 80, // Hoch - Freundschaftsbasis
            qualitaet_der_beruehrung: 40, // Niedrig-mittel
            dynamische_liebe: 35,        // Niedrig
            care_in_intimitaet: 45,      // Mittel
            sex_als_meditation: 40,      // Niedrig-mittel
            liebe_ohne_beziehung: 85,    // Sehr hoch - keine romantische
            orgastisches_leben: 40,      // Niedrig-mittel
            nicht_anhaften_an_partner: 95, // Sehr hoch
            hier_und_jetzt_intimitaet: 50, // Mittel
            polyamore_energie: 25,       // Niedrig
            wildheit_und_zartheit: 35,   // Niedrig
            meditation_zu_zweit: 30      // Niedrig
        },

        // ═══════════════════════════════════════════════════════════════════════
        // WERTE & HALTUNG (10) - Überzeugungen, Religion, Politik
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Progressive, hinterfragt gesellschaftliche Normen
        werte_haltung: {
            spiritualitaet: 55,          // Mittel - individuell
            religioese_praxis: 25,       // Niedrig - oft kritisch
            politisches_engagement: 65,  // Mittel-hoch - Aktivismus
            umweltbewusstsein: 65,       // Mittel-hoch
            traditionelle_werte: 10,     // Sehr niedrig - hinterfragt
            moderne_werte: 90,           // Sehr hoch - progressiv
            toleranz: 95,                // Sehr hoch - Vielfalt
            offenheit_neues: 85,         // Sehr hoch
            kulturelle_identitaet: 50,   // Mittel
            wertekongruenz: 90,          // Sehr hoch - lebt authentisch
            // Pirsig & Osho - Werte
            qualitaet_als_gott: 75,      // Hoch
            rationaler_mystizismus: 65,  // Mittel-hoch
            aristotelische_vernunft: 70, // Hoch
            platonische_ideen: 55,       // Mittel
            buddhistische_achtsamkeit: 70, // Hoch
            religionslosigkeit: 75,      // Hoch
            eigene_wahrheit: 95,         // Sehr hoch
            zen_paradox: 55,             // Mittel
            tantra_als_weg: 30,          // Niedrig
            politische_rebellion: 65,    // Mittel-hoch
            individueller_anarchismus: 75, // Hoch
            leben_als_kunst: 85,         // Sehr hoch
            celebration_statt_gebet: 70  // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // PRAKTISCHES LEBEN (10) - Alltag, Organisation, Gesundheit
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Eigenständiges Leben
        praktisches_leben: {
            haushaltsaufteilung: 15,     // Sehr niedrig - alleine
            alltagsorganisation: 75,     // Hoch - für sich selbst
            gesundheitsbewusstsein: 75,  // Hoch - Selbstfürsorge
            ernaehrungsstil: 60,         // Mittel-hoch
            ordnung_sauberkeit: 60,      // Mittel
            mobilitaet: 80,              // Hoch - flexibel
            wohnort_flexibilitaet: 80,   // Hoch - ungebunden
            heimatverbundenheit: 45,     // Mittel
            reisen_abenteuer: 80,        // Hoch - Freiheit nutzen
            routine_struktur: 60,        // Mittel - eigene Routinen
            // Pirsig & Osho - Praktisches Leben
            motorrad_pflege: 60,         // Mittel
            gumption_im_alltag: 75,      // Hoch
            stuck_vermeiden: 70,         // Hoch
            klassische_ordnung: 55,      // Mittel
            romantisches_chaos: 55,      // Mittel
            qualitaets_werkzeug: 65,     // Mittel-hoch
            achtsamkeit_im_detail: 65,   // Mittel-hoch
            meditation_im_alltag: 60,    // Mittel
            gesundheit_durch_bewusstsein: 75, // Hoch
            dynamische_meditation: 60,   // Mittel
            vipassana_im_leben: 55,      // Mittel
            natuerliches_leben: 65,      // Mittel-hoch
            lachen_therapie: 75,         // Hoch
            no_mind: 55,                 // Mittel
            zorba_der_geniesser: 75      // Hoch
        }
    },

    kernwerte: ["Authentizität", "Freundschaft", "Selbstgenügsamkeit", "Anti-Amatonormativität", "Autonomie"],
    vermeidet: ["Romantischer Druck", "Amatonormativität", "Romantische Erwartungen", "Paar-Zentrierung"]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AromantischProfil;
}
if (typeof window !== 'undefined') {
    window.AromantischProfil = AromantischProfil;
}
