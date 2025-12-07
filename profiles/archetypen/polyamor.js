/**
 * POLYAMOR - Der Netzwerk-Liebende
 *
 * Vollständiges Bedürfnis-Profil mit allen 88 Werten (0-100)
 *
 * WISSENSCHAFTLICHE GRUNDLAGEN:
 * ─────────────────────────────────────────────────────────────────────────────
 * - Polyamory Research (Moors et al., 2017): Higher openness, lower jealousy
 * - Attachment: Secure with multiple figures (Fraley, 2019)
 * - Compersion Studies: Joy from partner's other relationships
 * - Communal Orientation Scale (Clark et al.): High communal sharing
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * CHARAKTERISTIK:
 * - Mehrere gleichwertige romantische Beziehungen
 * - Hohe emotionale Kapazität
 * - Kommunikation und Transparenz essentiell
 * - Compersion (Mitfreude) statt Eifersucht
 */

const PolyamorProfil = {
    id: "polyamor",
    name: "Polyamor",
    beschreibung: "Liebe multipliziert sich. Mehrere tiefe, gleichwertige Verbindungen mit Transparenz und Compersion.",

    quellen: [
        "Consensual Non-Monogamy Research (Moors et al., 2017)",
        "Attachment in Polyamory (Fraley, 2019)",
        "Compersion Studies (Mogilski et al., 2019)",
        "Communal Orientation (Clark et al., 1987)"
    ],

    beduerfnisse: {

        // ═══════════════════════════════════════════════════════════════════════
        // EXISTENZ (9)
        // ═══════════════════════════════════════════════════════════════════════
        existenz: {
            luft: 50,
            wasser: 50,
            nahrung: 50,
            bewegung: 60,                // Mittel
            beruehrung: 80,              // Hoch - mehrere Quellen
            erholung: 70,                // Hoch - wichtig bei komplexem Leben
            sexueller_ausdruck: 80,      // Hoch - wichtig, vielfältig
            sicherheit_physisch: 65,     // Mittel-hoch
            unterschlupf: 70             // Hoch - kann variieren
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SICHERHEIT (6)
        // ═══════════════════════════════════════════════════════════════════════
        // Polyamor: Sicherheit durch Netzwerk, nicht durch Exklusivität
        sicherheit: {
            bestaendigkeit: 70,          // Hoch - verlässliche Verbindungen
            sich_sicher_fuehlen: 75,     // Hoch - durch Transparenz
            schutz: 60,                  // Mittel - Netzwerk schützt
            stabilitaet: 65,             // Mittel-hoch - flexible Stabilität
            leichtigkeit: 70,            // Hoch
            geborgenheit: 70             // Hoch - multiple Quellen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ZUNEIGUNG (9)
        // ═══════════════════════════════════════════════════════════════════════
        // Polyamor: KERN-KATEGORIE - hohe emotionale Kapazität
        zuneigung: {
            waerme: 85,                  // Sehr hoch - viel zu geben
            wertschaetzung: 85,          // Sehr hoch - alle Partner wertschätzen
            naehe: 85,                   // Sehr hoch - zu mehreren
            gesellschaft: 85,            // Sehr hoch - reiches Sozialleben
            intimitaet: 90,              // Sehr hoch - tiefe Verbindungen
            liebe: 95,                   // Sehr hoch - Kern des Lebensmodells
            fuersorge: 85,               // Sehr hoch - für alle Partner
            unterstuetzung: 85,          // Sehr hoch - Netzwerk
            fuereinander_da_sein: 85     // Sehr hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERSTÄNDNIS (9)
        // ═══════════════════════════════════════════════════════════════════════
        verstaendnis: {
            akzeptanz: 90,               // Sehr hoch - akzeptiert andere
            mitgefuehl: 85,              // Sehr hoch - Compersion
            beruecksichtigung: 90,       // Sehr hoch - alle berücksichtigen
            empathie: 90,                // Sehr hoch - für alle Partner
            vertrauen: 90,               // Sehr hoch - Basis von Poly
            beachtung: 75,               // Hoch
            gesehen_werden: 80,          // Hoch
            verstanden_werden: 85,       // Sehr hoch
            harmonie: 75                 // Hoch - zwischen allen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FREIHEIT (5)
        // ═══════════════════════════════════════════════════════════════════════
        // Polyamor: Hohe Freiheit innerhalb von Vereinbarungen
        freiheit: {
            selbstbestimmung: 80,        // Hoch - eigene Entscheidungen
            waehlen_koennen: 85,         // Sehr hoch - keine Exklusivität
            unabhaengigkeit: 65,         // Mittel-hoch - verbunden, nicht abhängig
            raum_haben: 70,              // Hoch - eigener Raum wichtig
            spontaneitaet: 70            // Hoch - innerhalb von Kommunikation
        },

        // ═══════════════════════════════════════════════════════════════════════
        // TEILNAHME (7)
        // ═══════════════════════════════════════════════════════════════════════
        // Polyamor: Starke Gemeinschaftsorientierung
        teilnahme: {
            zusammenarbeit: 85,          // Sehr hoch - Polykül koordinieren
            kommunikation: 95,           // Sehr hoch - essentiell
            gemeinschaft: 90,            // Sehr hoch - Poly-Community
            zugehoerigkeit: 85,          // Sehr hoch - zu mehreren
            gegenseitigkeit: 90,         // Sehr hoch
            respekt: 90,                 // Sehr hoch - für alle Beziehungen
            bedeutung_haben: 80          // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // MUSSE (4)
        // ═══════════════════════════════════════════════════════════════════════
        musse: {
            schoenheit: 70,              // Hoch
            freizeit: 65,                // Mittel-hoch - Zeit ist limitiert
            freude: 85,                  // Sehr hoch - geteilte Freude
            humor: 80                    // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // IDENTITÄT (14)
        // ═══════════════════════════════════════════════════════════════════════
        identitaet: {
            authentizitaet: 85,          // Sehr hoch
            echtheit: 85,                // Sehr hoch
            integritaet: 90,             // Sehr hoch - Ehrlichkeit zentral
            praesenz: 80,                // Hoch - präsent für alle
            ordnung: 75,                 // Hoch - Kalender-Management
            bewusstheit: 85,             // Sehr hoch - Selbstreflexion
            herausforderung: 70,         // Hoch
            klarheit: 85,                // Sehr hoch - klare Kommunikation
            kompetenz: 75,               // Hoch
            effizienz: 75,               // Hoch - Zeit-Management
            wirksamkeit: 75,             // Hoch
            wachstum: 85,                // Sehr hoch - durch Beziehungen
            sinn: 85,                    // Sehr hoch - Liebe als Sinn
            beitrag_leisten: 85          // Sehr hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ERSCHAFFEN (5)
        // ═══════════════════════════════════════════════════════════════════════
        erschaffen: {
            kreativitaet: 75,            // Hoch - kreative Beziehungsformen
            entdecken: 80,               // Hoch - neue Dynamiken
            lernen: 85,                  // Sehr hoch - von allen Partnern
            selbst_ausdruck: 80,         // Hoch
            anreize_bekommen: 80         // Hoch - vielfältige Stimulation
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERBUNDENHEIT (5)
        // ═══════════════════════════════════════════════════════════════════════
        verbundenheit: {
            leben_feiern: 90,            // Sehr hoch - mit allen
            inspiration: 85,             // Sehr hoch
            trauer_ausdruecken: 75,      // Hoch - Netzwerk unterstützt
            einsehen: 75,                // Hoch
            anfang_ende: 75              // Hoch - viele Übergänge
        },

        // ═══════════════════════════════════════════════════════════════════════
        // DYNAMIK (15)
        // ═══════════════════════════════════════════════════════════════════════
        // Polyamor: Flexibel, kann verschiedene Rollen
        dynamik: {
            kontrolle_ausueben: 50,      // Mittel - situativ
            hingabe: 65,                 // Mittel-hoch - kann sich hingeben
            fuehrung_geben: 55,          // Mittel
            gefuehrt_werden: 55,         // Mittel
            ritual: 75,                  // Hoch - verschiedene Rituale
            nachsorge: 85,               // Sehr hoch - wichtig
            grenzen_setzen: 85,          // Sehr hoch - essentiell
            grenzen_respektieren: 95,    // Sehr hoch - absolut zentral
            intensitaet: 80,             // Hoch - tiefe Verbindungen
            vertrauen_schenken: 85,      // Sehr hoch
            verantwortung_uebernehmen: 85, // Sehr hoch - für alle
            sich_fallenlassen: 65,       // Mittel-hoch
            machtaustausch: 60,          // Mittel - offen
            dienend_sein: 60,            // Mittel
            beschuetzen: 75              // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // LEBENSPLANUNG (15) - Kinder, Ehe, Wohnen, Familie
        // ═══════════════════════════════════════════════════════════════════════
        // Polyamor: Offen für verschiedene Konstellationen
        lebensplanung: {
            kinderwunsch: 55,            // Mittel - kann, muss nicht
            elternschaft: 55,            // Mittel - Co-Parenting möglich
            fortpflanzung: 45,           // Mittel - nicht zentral
            fuersorge: 80,               // Hoch - für alle Partner
            familie_gruenden: 50,        // Mittel - nicht-traditionell möglich
            generativitaet: 60,          // Mittel-hoch - anders gelebt
            erziehung_werte: 55,         // Mittel - wenn relevant
            verbindlichkeit: 70,         // Hoch - zu allen Partnern
            langfristige_bindung: 75,    // Hoch - mehrfach
            rechtliche_sicherheit: 40,   // Niedrig-mittel - nicht Standard
            tradition_ehe: 25,           // Niedrig - nicht priorisiert
            oeffentliches_bekenntnis: 55, // Mittel - zu allen
            gemeinsamer_wohnraum: 55,    // Mittel - kann, muss nicht
            eigener_rueckzugsort: 75,    // Hoch - wichtig für Balance
            haeuslichkeit: 60,           // Mittel-hoch - flexibel
            // Pirsig & Osho - Lebensplanung
            biologisches_muster: 45,     // Mittel
            soziales_muster: 35,         // Niedrig-mittel - anders
            statische_stabilitaet: 40,   // Niedrig-mittel
            qualitaet_der_fuersorge: 80, // Hoch - für alle
            familien_rebellion: 65,      // Mittel-hoch
            zorba_das_kind: 75,          // Hoch
            nicht_anhaften_an_familie: 60, // Mittel
            bewusste_elternschaft: 70,   // Hoch - reflektiert
            commune_statt_kernfamilie: 70 // Hoch - Polykül
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FINANZEN & KARRIERE (10) - Geld, Arbeit, berufliche Entwicklung
        // ═══════════════════════════════════════════════════════════════════════
        // Polyamor: Flexible Finanzen, Netzwerk-basiert
        finanzen_karriere: {
            finanzielle_unabhaengigkeit: 70, // Hoch - eigene Basis
            gemeinsame_finanzen: 45,     // Mittel - mit einigen Partnern
            versorger_rolle: 40,         // Niedrig-mittel - gegenseitig
            materielle_sicherheit: 65,   // Mittel-hoch
            karriere_entwicklung: 70,    // Hoch
            berufliche_anerkennung: 65,  // Mittel-hoch
            work_life_balance: 75,       // Hoch - Zeit-Management wichtig
            gemeinsame_ziele: 65,        // Mittel-hoch - mit verschiedenen Partnern
            erfolg: 65,                  // Mittel-hoch
            leistung: 65,                // Mittel-hoch
            // Pirsig & Osho - Finanzen & Karriere
            gumption: 70,                // Hoch
            qualitaet_der_arbeit: 70,    // Hoch
            intellektuelles_muster: 65,  // Mittel-hoch
            dynamische_evolution: 70,    // Hoch
            klassisches_verstehen: 55,   // Mittel
            arbeit_als_meditation: 55,   // Mittel
            nicht_karriere: 45,          // Mittel
            zorba_der_unternehmer: 60,   // Mittel
            nicht_anhaften_an_geld: 55,  // Mittel
            kreative_selbstverwirklichung: 75 // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // KOMMUNIKATION & STIL (12) - Art des Austauschs
        // ═══════════════════════════════════════════════════════════════════════
        // Polyamor: KERN-KATEGORIE - höchste Kommunikationswerte
        kommunikation_stil: {
            emotionale_offenheit: 95,    // Sehr hoch - absolut zentral
            tiefe_gespraeche: 90,        // Sehr hoch - mit allen Partnern
            small_talk: 60,              // Mittel
            konfliktbereitschaft: 85,    // Sehr hoch - konstruktiv
            konstruktive_kritik: 85,     // Sehr hoch - offen dafür
            aktives_zuhoeren: 90,        // Sehr hoch - für alle
            nonverbale_kommunikation: 80, // Hoch - achtsam
            humor_ironie: 75,            // Hoch
            intellektueller_austausch: 75, // Hoch
            digitale_kommunikation: 80,  // Hoch - Koordination
            verbale_anerkennung: 85,     // Sehr hoch - alle wertschätzen
            schweigen_aushalten: 60,     // Mittel-hoch - verträgt auch Stille
            // Pirsig & Osho - Kommunikation
            romantisches_verstehen: 80,  // Hoch - intuitiv
            klassische_klarheit: 75,     // Hoch - klar
            dialektik: 70,               // Hoch
            qualitaets_ausdruck: 75,     // Hoch
            care_im_gespraech: 85,       // Sehr hoch - für alle
            schweigen_statt_worte: 55,   // Mittel
            radikale_ehrlichkeit: 90,    // Sehr hoch
            humorvolle_leichtigkeit: 75, // Hoch
            paradoxe_weisheit: 50,       // Mittel
            herz_statt_kopf: 70,         // Hoch
            authentischer_ausdruck: 85   // Sehr hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN (12) - Freunde, Familie, Gesellschaft
        // ═══════════════════════════════════════════════════════════════════════
        // Polyamor: Reiches Netzwerk, Community wichtig
        soziales_leben: {
            freundeskreis_pflege: 85,    // Sehr hoch - großes Netzwerk
            gemeinsame_freunde: 80,      // Hoch - Polykül & Metamours
            familieneinbindung: 50,      // Mittel - kann kompliziert sein
            gesellschaftliches_engagement: 70, // Hoch - Poly-Community
            networking: 80,              // Hoch - Verbindungen
            gemeinsame_hobbys: 70,       // Hoch - mit verschiedenen
            individuelle_hobbys: 70,     // Hoch - auch eigene Zeit
            gemeinsame_zeit: 80,         // Hoch - mit allen Partnern
            zeit_fuer_sich: 70,          // Hoch - Balance wichtig
            soziale_unterstuetzung: 90,  // Sehr hoch - Netzwerk
            gemeinsame_erlebnisse: 85,   // Sehr hoch - mit verschiedenen
            alltagsteilung: 60,          // Mittel-hoch - flexibel
            // Pirsig & Osho - Soziales Leben
            soziale_qualitaet: 85,       // Sehr hoch
            tribe_muster: 70,            // Hoch - Polykül
            intellektuelle_gemeinschaft: 70, // Hoch
            statische_sozialstrukturen: 30, // Niedrig
            sannyas_gemeinschaft: 55,    // Mittel
            rebellion_gegen_gesellschaft: 55, // Mittel
            einsamkeit_in_menge: 45,     // Mittel
            celebration_mit_anderen: 85, // Sehr hoch
            keine_freundschaft_besitz: 55, // Mittel
            tantra_gruppe: 60            // Mittel-hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // INTIMITÄT & BEZIEHUNG (12) - Nähe, Sexualität, Bindung
        // ═══════════════════════════════════════════════════════════════════════
        // Polyamor: Tiefe Intimität mit mehreren, keine Exklusivität
        intimitaet_beziehung: {
            koerpernaehe: 85,            // Sehr hoch - zu mehreren
            kuscheln: 85,                // Sehr hoch
            sexuelle_exklusivitaet: 10,  // Sehr niedrig - nicht exklusiv
            sexuelle_offenheit: 95,      // Sehr hoch - offen
            leidenschaft: 85,            // Sehr hoch - mit mehreren
            zaertlichkeit: 85,           // Sehr hoch
            emotionale_tiefe: 90,        // Sehr hoch - Kern
            romantik: 80,                // Hoch - mit mehreren
            flirten: 80,                 // Hoch - Offenheit
            eifersucht_als_signal: 40,   // Niedrig-mittel - Compersion statt
            treue_werte: 50,             // Mittel - eigene Definition
            bindungsbereitschaft: 85,    // Sehr hoch - zu mehreren
            // Pirsig & Osho - Intimität
            biologische_anziehung: 80,   // Hoch
            intellektuelle_verbindung: 80, // Hoch
            qualitaet_der_beruehrung: 85, // Sehr hoch
            dynamische_liebe: 85,        // Sehr hoch
            care_in_intimitaet: 85,      // Sehr hoch
            sex_als_meditation: 65,      // Mittel-hoch
            liebe_ohne_beziehung: 50,    // Mittel
            orgastisches_leben: 75,      // Hoch
            nicht_anhaften_an_partner: 55, // Mittel
            hier_und_jetzt_intimitaet: 80, // Hoch
            polyamore_energie: 95,       // Sehr hoch - Kernwert
            wildheit_und_zartheit: 75,   // Hoch
            meditation_zu_zweit: 65      // Mittel-hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // WERTE & HALTUNG (10) - Überzeugungen, Religion, Politik
        // ═══════════════════════════════════════════════════════════════════════
        // Polyamor: Progressive, offene Werte
        werte_haltung: {
            spiritualitaet: 55,          // Mittel - individuell
            religioese_praxis: 25,       // Niedrig - meist nicht institutionell
            politisches_engagement: 65,  // Mittel-hoch - progressive Werte
            umweltbewusstsein: 65,       // Mittel-hoch
            traditionelle_werte: 20,     // Niedrig - nicht-traditionell
            moderne_werte: 90,           // Sehr hoch - progressiv
            toleranz: 95,                // Sehr hoch - akzeptiert Vielfalt
            offenheit_neues: 90,         // Sehr hoch
            kulturelle_identitaet: 55,   // Mittel
            wertekongruenz: 75,          // Hoch - lebt nach Werten
            // Pirsig & Osho - Werte
            qualitaet_als_gott: 70,      // Hoch
            rationaler_mystizismus: 55,  // Mittel
            aristotelische_vernunft: 55, // Mittel
            platonische_ideen: 50,       // Mittel
            buddhistische_achtsamkeit: 65, // Mittel-hoch
            religionslosigkeit: 60,      // Mittel
            eigene_wahrheit: 80,         // Hoch
            zen_paradox: 50,             // Mittel
            tantra_als_weg: 65,          // Mittel-hoch
            politische_rebellion: 50,    // Mittel
            individueller_anarchismus: 50, // Mittel
            leben_als_kunst: 80,         // Hoch
            celebration_statt_gebet: 75  // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // PRAKTISCHES LEBEN (10) - Alltag, Organisation, Gesundheit
        // ═══════════════════════════════════════════════════════════════════════
        // Polyamor: Hohe Organisation nötig, flexible Wohnsituation
        praktisches_leben: {
            haushaltsaufteilung: 55,     // Mittel - situationsabhängig
            alltagsorganisation: 85,     // Sehr hoch - Kalender-Management essentiell
            gesundheitsbewusstsein: 80,  // Hoch - STI-Tests wichtig
            ernaehrungsstil: 55,         // Mittel
            ordnung_sauberkeit: 60,      // Mittel
            mobilitaet: 75,              // Hoch - flexibel zwischen Orten
            wohnort_flexibilitaet: 65,   // Mittel-hoch - kann variieren
            heimatverbundenheit: 50,     // Mittel
            reisen_abenteuer: 75,        // Hoch - gemeinsam mit verschiedenen
            routine_struktur: 70,        // Hoch - Struktur hilft
            // Pirsig & Osho - Praktisches Leben
            motorrad_pflege: 50,         // Mittel
            gumption_im_alltag: 70,      // Hoch
            stuck_vermeiden: 65,         // Mittel-hoch
            klassische_ordnung: 60,      // Mittel
            romantisches_chaos: 55,      // Mittel
            qualitaets_werkzeug: 55,     // Mittel
            achtsamkeit_im_detail: 65,   // Mittel-hoch
            meditation_im_alltag: 55,    // Mittel
            gesundheit_durch_bewusstsein: 75, // Hoch
            dynamische_meditation: 55,   // Mittel
            vipassana_im_leben: 55,      // Mittel
            natuerliches_leben: 60,      // Mittel
            lachen_therapie: 75,         // Hoch
            no_mind: 45,                 // Mittel
            zorba_der_geniesser: 80      // Hoch
        }
    },

    kernwerte: ["Liebe", "Transparenz", "Kommunikation", "Compersion", "Vielfalt"],
    vermeidet: ["Besitzdenken", "Eifersucht", "Exklusivität", "Heimlichkeit", "Hierarchie-Zwang"]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PolyamorProfil;
}
if (typeof window !== 'undefined') {
    window.PolyamorProfil = PolyamorProfil;
}
