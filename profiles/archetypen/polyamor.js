/**
 * POLYAMOR - Der Netzwerk-Liebende
 *
 * Vollständiges Bedürfnis-Profil mit 220 Werten (0-100)
 * Verwendet #ID-System aus beduerfnis-ids.js
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

    // ═══════════════════════════════════════════════════════════════════════════
    // BEDÜRFNISSE MIT #IDs (220 Werte)
    // ═══════════════════════════════════════════════════════════════════════════

    beduerfnisse: {

        // ─────────────────────────────────────────────────────────────────────────
        // EXISTENZ (#B1-#B9)
        // ─────────────────────────────────────────────────────────────────────────
        '#B1': 50,   // luft
        '#B2': 50,   // wasser
        '#B3': 50,   // nahrung
        '#B4': 60,   // bewegung - Mittel
        '#B5': 80,   // beruehrung - Hoch - mehrere Quellen
        '#B6': 70,   // erholung - Hoch - wichtig bei komplexem Leben
        '#B7': 80,   // sexueller_ausdruck - Hoch - wichtig, vielfältig
        '#B8': 65,   // sicherheit_physisch - Mittel-hoch
        '#B9': 70,   // unterschlupf - Hoch - kann variieren

        // ─────────────────────────────────────────────────────────────────────────
        // SICHERHEIT (#B10-#B15) - Sicherheit durch Netzwerk, nicht durch Exklusivität
        // ─────────────────────────────────────────────────────────────────────────
        '#B10': 70,  // bestaendigkeit - Hoch - verlässliche Verbindungen
        '#B11': 75,  // sich_sicher_fuehlen - Hoch - durch Transparenz
        '#B12': 60,  // schutz - Mittel - Netzwerk schützt
        '#B13': 65,  // stabilitaet - Mittel-hoch - flexible Stabilität
        '#B14': 70,  // leichtigkeit - Hoch
        '#B15': 70,  // geborgenheit - Hoch - multiple Quellen

        // ─────────────────────────────────────────────────────────────────────────
        // ZUNEIGUNG (#B16-#B24) - KERN-KATEGORIE - hohe emotionale Kapazität
        // ─────────────────────────────────────────────────────────────────────────
        '#B16': 85,  // waerme - Sehr hoch - viel zu geben
        '#B17': 85,  // wertschaetzung - Sehr hoch - alle Partner wertschätzen
        '#B18': 85,  // naehe - Sehr hoch - zu mehreren
        '#B19': 85,  // gesellschaft - Sehr hoch - reiches Sozialleben
        '#B20': 90,  // intimitaet - Sehr hoch - tiefe Verbindungen
        '#B21': 95,  // liebe - Sehr hoch - Kern des Lebensmodells
        '#B22': 85,  // fuersorge - Sehr hoch - für alle Partner
        '#B23': 85,  // unterstuetzung - Sehr hoch - Netzwerk
        '#B24': 85,  // fuereinander_da_sein - Sehr hoch

        // ─────────────────────────────────────────────────────────────────────────
        // VERSTÄNDNIS (#B25-#B33)
        // ─────────────────────────────────────────────────────────────────────────
        '#B25': 90,  // akzeptanz - Sehr hoch - akzeptiert andere
        '#B26': 85,  // mitgefuehl - Sehr hoch - Compersion
        '#B27': 90,  // beruecksichtigung - Sehr hoch - alle berücksichtigen
        '#B28': 90,  // empathie - Sehr hoch - für alle Partner
        '#B29': 90,  // vertrauen - Sehr hoch - Basis von Poly
        '#B30': 75,  // beachtung - Hoch
        '#B31': 80,  // gesehen_werden - Hoch
        '#B32': 85,  // verstanden_werden - Sehr hoch
        '#B33': 75,  // harmonie - Hoch - zwischen allen

        // ─────────────────────────────────────────────────────────────────────────
        // FREIHEIT (#B34-#B38) - Hohe Freiheit innerhalb von Vereinbarungen
        // ─────────────────────────────────────────────────────────────────────────
        '#B34': 80,  // selbstbestimmung - Hoch - eigene Entscheidungen
        '#B35': 85,  // waehlen_koennen - Sehr hoch - keine Exklusivität
        '#B36': 65,  // unabhaengigkeit - Mittel-hoch - verbunden, nicht abhängig
        '#B37': 70,  // raum_haben - Hoch - eigener Raum wichtig
        '#B38': 70,  // spontaneitaet - Hoch - innerhalb von Kommunikation

        // ─────────────────────────────────────────────────────────────────────────
        // TEILNAHME (#B39-#B45) - Starke Gemeinschaftsorientierung
        // ─────────────────────────────────────────────────────────────────────────
        '#B39': 85,  // zusammenarbeit - Sehr hoch - Polykül koordinieren
        '#B40': 95,  // kommunikation - Sehr hoch - essentiell
        '#B41': 90,  // gemeinschaft - Sehr hoch - Poly-Community
        '#B42': 85,  // zugehoerigkeit - Sehr hoch - zu mehreren
        '#B43': 90,  // gegenseitigkeit - Sehr hoch
        '#B44': 90,  // respekt - Sehr hoch - für alle Beziehungen
        '#B45': 80,  // bedeutung_haben - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // MUSSE (#B46-#B49)
        // ─────────────────────────────────────────────────────────────────────────
        '#B46': 70,  // schoenheit - Hoch
        '#B47': 65,  // freizeit - Mittel-hoch - Zeit ist limitiert
        '#B48': 85,  // freude - Sehr hoch - geteilte Freude
        '#B49': 80,  // humor - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // IDENTITÄT (#B50-#B63)
        // ─────────────────────────────────────────────────────────────────────────
        '#B50': 85,  // authentizitaet - Sehr hoch
        '#B51': 85,  // echtheit - Sehr hoch
        '#B52': 90,  // integritaet - Sehr hoch - Ehrlichkeit zentral
        '#B53': 80,  // praesenz - Hoch - präsent für alle
        '#B54': 75,  // ordnung - Hoch - Kalender-Management
        '#B55': 85,  // bewusstheit - Sehr hoch - Selbstreflexion
        '#B56': 70,  // herausforderung - Hoch
        '#B57': 85,  // klarheit - Sehr hoch - klare Kommunikation
        '#B58': 75,  // kompetenz - Hoch
        '#B59': 75,  // effizienz - Hoch - Zeit-Management
        '#B60': 75,  // wirksamkeit - Hoch
        '#B61': 85,  // wachstum - Sehr hoch - durch Beziehungen
        '#B62': 85,  // sinn - Sehr hoch - Liebe als Sinn
        '#B63': 85,  // beitrag_leisten - Sehr hoch

        // ─────────────────────────────────────────────────────────────────────────
        // ERSCHAFFEN (#B64-#B68)
        // ─────────────────────────────────────────────────────────────────────────
        '#B64': 75,  // kreativitaet - Hoch - kreative Beziehungsformen
        '#B65': 80,  // entdecken - Hoch - neue Dynamiken
        '#B66': 85,  // lernen - Sehr hoch - von allen Partnern
        '#B67': 80,  // selbst_ausdruck - Hoch
        '#B68': 80,  // anreize_bekommen - Hoch - vielfältige Stimulation

        // ─────────────────────────────────────────────────────────────────────────
        // VERBUNDENHEIT (#B69-#B73)
        // ─────────────────────────────────────────────────────────────────────────
        '#B69': 90,  // leben_feiern - Sehr hoch - mit allen
        '#B70': 85,  // inspiration - Sehr hoch
        '#B71': 75,  // trauer_ausdruecken - Hoch - Netzwerk unterstützt
        '#B72': 75,  // einsehen - Hoch
        '#B73': 75,  // anfang_ende - Hoch - viele Übergänge

        // ─────────────────────────────────────────────────────────────────────────
        // DYNAMIK (#B74-#B88) - Flexibel, kann verschiedene Rollen
        // ─────────────────────────────────────────────────────────────────────────
        '#B74': 50,  // kontrolle_ausueben - Mittel - situativ
        '#B75': 65,  // hingabe - Mittel-hoch - kann sich hingeben
        '#B76': 55,  // fuehrung_geben - Mittel
        '#B77': 55,  // gefuehrt_werden - Mittel
        '#B78': 75,  // ritual - Hoch - verschiedene Rituale
        '#B79': 85,  // nachsorge - Sehr hoch - wichtig
        '#B80': 85,  // grenzen_setzen - Sehr hoch - essentiell
        '#B81': 95,  // grenzen_respektieren - Sehr hoch - absolut zentral
        '#B82': 80,  // intensitaet - Hoch - tiefe Verbindungen
        '#B83': 85,  // vertrauen_schenken - Sehr hoch
        '#B84': 85,  // verantwortung_uebernehmen - Sehr hoch - für alle
        '#B85': 65,  // sich_fallenlassen - Mittel-hoch
        '#B86': 60,  // machtaustausch - Mittel - offen
        '#B87': 60,  // dienend_sein - Mittel
        '#B88': 75,  // beschuetzen - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // LEBENSPLANUNG (#B90-#B126) - Offen für verschiedene Konstellationen
        // ─────────────────────────────────────────────────────────────────────────
        '#B90': 55,   // kinderwunsch - Mittel - kann, muss nicht
        '#B91': 55,   // elternschaft - Mittel - Co-Parenting möglich
        '#B92': 45,   // fortpflanzung - Mittel - nicht zentral
        '#B93': 50,   // familie_gruenden - Mittel - nicht-traditionell möglich
        '#B94': 60,   // generativitaet - Mittel-hoch - anders gelebt
        '#B95': 70,   // verbindlichkeit - Hoch - zu allen Partnern
        '#B96': 75,   // langfristige_bindung - Hoch - mehrfach
        '#B97': 40,   // rechtliche_sicherheit - Niedrig-mittel - nicht Standard
        '#B98': 50,   // treueversprechen - Mittel - eigene Definition
        '#B99': 55,   // gemeinsamer_wohnraum - Mittel - kann, muss nicht
        '#B100': 60,  // haeuslichkeit - Mittel-hoch - flexibel
        '#B101': 55,  // nest_bauen - Mittel
        '#B102': 60,  // alltag_teilen - Mittel-hoch - mit einigen
        '#B103': 75,  // eigener_raum - Hoch - wichtig für Balance
        '#B104': 75,  // rueckzugsort - Hoch - wichtig für Balance
        '#B105': 55,  // tierliebe - Mittel
        '#B106': 55,  // fuersorge_tiere - Mittel
        '#B107': 55,  // begleiter - Mittel
        '#B108': 55,  // verantwortung_tier - Mittel
        '#B109': 45,  // sesshaftigkeit - Mittel
        '#B110': 50,  // verwurzelung - Mittel
        '#B111': 75,  // mobilitaet - Hoch - flexibel
        '#B112': 50,  // heimat - Mittel
        '#B113': 75,  // neue_orte - Hoch - mit verschiedenen
        '#B114': 50,  // familienbindung - Mittel
        '#B115': 45,  // herkunftsfamilie - Mittel
        '#B116': 45,  // familientreffen - Mittel
        '#B117': 45,  // generationenverbund - Mittel
        // Pirsig & Osho - Lebensplanung
        '#B118': 45,  // biologisches_muster - Mittel
        '#B119': 35,  // soziales_muster - Niedrig-mittel - anders
        '#B120': 40,  // statische_stabilitaet - Niedrig-mittel
        '#B121': 80,  // qualitaet_der_fuersorge - Hoch - für alle
        '#B122': 65,  // familien_rebellion - Mittel-hoch
        '#B123': 75,  // zorba_das_kind - Hoch
        '#B124': 60,  // nicht_anhaften_an_familie - Mittel
        '#B125': 70,  // bewusste_elternschaft - Hoch - reflektiert
        '#B126': 70,  // commune_statt_kernfamilie - Hoch - Polykül

        // ─────────────────────────────────────────────────────────────────────────
        // FINANZEN & KARRIERE (#B127-#B148) - Flexible Finanzen, Netzwerk-basiert
        // ─────────────────────────────────────────────────────────────────────────
        '#B127': 70,  // finanzielle_unabhaengigkeit - Hoch - eigene Basis
        '#B128': 45,  // gemeinsame_finanzen - Mittel - mit einigen Partnern
        '#B129': 75,  // finanzielle_transparenz - Hoch
        '#B130': 65,  // finanzielle_sicherheit - Mittel-hoch
        '#B131': 50,  // sparsamkeit - Mittel
        '#B132': 65,  // grosszuegigkeit - Mittel-hoch - für alle
        '#B133': 70,  // berufliche_erfuellung - Hoch
        '#B134': 65,  // karriereambition - Mittel-hoch
        '#B135': 75,  // work_life_balance - Hoch - Zeit-Management wichtig
        '#B136': 65,  // berufliche_anerkennung - Mittel-hoch
        '#B137': 65,  // zeit_fuer_beziehung - Mittel-hoch - mit verschiedenen Partnern
        '#B138': 70,  // berufliche_flexibilitaet - Hoch
        // Pirsig & Osho - Finanzen & Karriere
        '#B139': 70,  // gumption - Hoch
        '#B140': 70,  // qualitaet_der_arbeit - Hoch
        '#B141': 65,  // intellektuelles_muster - Mittel-hoch
        '#B142': 70,  // dynamische_evolution - Hoch
        '#B143': 55,  // klassisches_verstehen - Mittel
        '#B144': 55,  // arbeit_als_meditation - Mittel
        '#B145': 45,  // nicht_karriere - Mittel
        '#B146': 60,  // zorba_der_unternehmer - Mittel
        '#B147': 55,  // nicht_anhaften_an_geld - Mittel
        '#B148': 75,  // kreative_selbstverwirklichung - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // KOMMUNIKATIONSSTIL (#B149-#B176) - KERN-KATEGORIE - höchste Kommunikationswerte
        // ─────────────────────────────────────────────────────────────────────────
        '#B149': 90,  // taeglicher_austausch - Sehr hoch
        '#B150': 90,  // tiefgehende_gespraeche - Sehr hoch - mit allen Partnern
        '#B151': 60,  // small_talk - Mittel
        '#B152': 60,  // stille_gemeinsam - Mittel-hoch - verträgt auch Stille
        '#B153': 85,  // verbale_verbindung - Sehr hoch
        '#B154': 90,  // zuhoeren - Sehr hoch - für alle
        '#B155': 95,  // emotionale_offenheit - Sehr hoch - absolut zentral
        '#B156': 85,  // gefuehle_zeigen - Sehr hoch
        '#B157': 80,  // verletzlichkeit - Hoch
        '#B158': 25,  // emotionale_zurueckhaltung - Niedrig
        '#B159': 85,  // emotionale_sicherheit - Sehr hoch
        '#B160': 90,  // gefuehle_teilen - Sehr hoch
        '#B161': 85,  // konfliktklaerung - Sehr hoch - konstruktiv
        '#B162': 85,  // aussprache - Sehr hoch
        '#B163': 35,  // konflikt_vermeiden - Niedrig - offen
        '#B164': 80,  // streitkultur - Hoch
        '#B165': 85,  // versoehnlichkeit - Sehr hoch
        // Pirsig & Osho - Kommunikation
        '#B166': 80,  // romantisches_verstehen - Hoch - intuitiv
        '#B167': 75,  // klassische_klarheit - Hoch - klar
        '#B168': 70,  // dialektik - Hoch
        '#B169': 75,  // qualitaets_ausdruck - Hoch
        '#B170': 85,  // care_im_gespraech - Sehr hoch - für alle
        '#B171': 55,  // schweigen_statt_worte - Mittel
        '#B172': 90,  // radikale_ehrlichkeit - Sehr hoch
        '#B173': 75,  // humorvolle_leichtigkeit - Hoch
        '#B174': 50,  // paradoxe_weisheit - Mittel
        '#B175': 70,  // herz_statt_kopf - Hoch
        '#B176': 85,  // authentischer_ausdruck - Sehr hoch

        // ─────────────────────────────────────────────────────────────────────────
        // SOZIALES LEBEN (#B177-#B203) - Reiches Netzwerk, Community wichtig
        // ─────────────────────────────────────────────────────────────────────────
        '#B177': 80,  // soziale_energie - Hoch
        '#B178': 80,  // geselligkeit - Hoch
        '#B179': 45,  // ruhe_von_menschen - Mittel
        '#B180': 55,  // allein_aufladen - Mittel
        '#B181': 80,  // menschen_treffen - Hoch
        '#B182': 75,  // kleine_gruppen - Hoch
        '#B183': 70,  // zeit_fuer_sich - Hoch - Balance wichtig
        '#B184': 70,  // eigene_hobbys - Hoch - auch eigene Zeit
        '#B185': 80,  // gemeinsame_zeit - Hoch - mit allen Partnern
        '#B186': 80,  // partnerzeit - Hoch
        '#B187': 70,  // eigene_interessen - Hoch
        '#B188': 85,  // eigene_freunde - Sehr hoch - großes Netzwerk
        '#B189': 80,  // gemeinsame_freunde - Hoch - Polykül & Metamours
        '#B190': 80,  // freundeskreis_teilen - Hoch
        '#B191': 90,  // soziales_netz - Sehr hoch - Netzwerk
        '#B192': 80,  // freunde_pflegen - Hoch
        '#B193': 75,  // neue_freundschaften - Hoch
        // Pirsig & Osho - Soziales Leben
        '#B194': 85,  // soziale_qualitaet - Sehr hoch
        '#B195': 70,  // tribe_muster - Hoch - Polykül
        '#B196': 70,  // intellektuelle_gemeinschaft - Hoch
        '#B197': 30,  // statische_sozialstrukturen - Niedrig
        '#B198': 55,  // sannyas_gemeinschaft - Mittel
        '#B199': 55,  // rebellion_gegen_gesellschaft - Mittel
        '#B200': 45,  // einsamkeit_in_menge - Mittel
        '#B201': 85,  // celebration_mit_anderen - Sehr hoch
        '#B202': 55,  // keine_freundschaft_besitz - Mittel
        '#B203': 60,  // tantra_gruppe - Mittel-hoch

        // ─────────────────────────────────────────────────────────────────────────
        // INTIMITÄT & ROMANTIK (#B204-#B208) - Tiefe Intimität mit mehreren
        // ─────────────────────────────────────────────────────────────────────────
        '#B204': 85,  // koerpernaehe - Sehr hoch - zu mehreren
        '#B205': 85,  // kuscheln - Sehr hoch
        '#B206': 30,  // physische_distanz - Niedrig - offen für Nähe
        '#B207': 85,  // koerperkontakt - Sehr hoch
        '#B208': 85,  // umarmungen - Sehr hoch

        // ─────────────────────────────────────────────────────────────────────────
        // ERWEITERTE DYNAMIK (#B209-#B220) - Kink/BDSM
        // ─────────────────────────────────────────────────────────────────────────
        '#B209': 45,  // schmerzerleben - Mittel
        '#B210': 45,  // schmerz_geben - Mittel
        '#B211': 50,  // bondage_erleben - Mittel
        '#B212': 50,  // bondage_geben - Mittel
        '#B213': 55,  // devotion - Mittel
        '#B214': 50,  // anbetung - Mittel
        '#B215': 45,  // demuetig_sein - Mittel
        '#B216': 50,  // dominieren - Mittel
        '#B217': 40,  // bestrafung_erhalten - Niedrig-mittel
        '#B218': 40,  // bestrafen - Niedrig-mittel
        '#B219': 55,  // service_orientierung - Mittel
        '#B220': 55   // service_empfangen - Mittel
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ERWEITERTE BEDÜRFNISSE (noch ohne #IDs)
    // ═══════════════════════════════════════════════════════════════════════════

    erweitert: {
        // Intimität & Romantik - Erweitert
        intimitaet_romantik: {
            sexuelle_exklusivitaet: 10,
            sexuelle_offenheit: 95,
            leidenschaft: 85,
            zaertlichkeit: 85,
            emotionale_tiefe: 90,
            romantik: 80,
            flirten: 80,
            eifersucht_als_signal: 40,
            treue_werte: 50,
            bindungsbereitschaft: 85,
            // Pirsig & Osho
            biologische_anziehung: 80,
            intellektuelle_verbindung: 80,
            qualitaet_der_beruehrung: 85,
            dynamische_liebe: 85,
            care_in_intimitaet: 85,
            sex_als_meditation: 65,
            liebe_ohne_beziehung: 50,
            orgastisches_leben: 75,
            nicht_anhaften_an_partner: 55,
            hier_und_jetzt_intimitaet: 80,
            polyamore_energie: 95,
            wildheit_und_zartheit: 75,
            meditation_zu_zweit: 65
        },

        // Werte & Haltungen
        werte_haltung: {
            spiritualitaet: 55,
            religioese_praxis: 25,
            politisches_engagement: 65,
            umweltbewusstsein: 65,
            traditionelle_werte: 20,
            moderne_werte: 90,
            toleranz: 95,
            offenheit_neues: 90,
            kulturelle_identitaet: 55,
            wertekongruenz: 75,
            // Pirsig & Osho
            qualitaet_als_gott: 70,
            rationaler_mystizismus: 55,
            aristotelische_vernunft: 55,
            platonische_ideen: 50,
            buddhistische_achtsamkeit: 65,
            religionslosigkeit: 60,
            eigene_wahrheit: 80,
            zen_paradox: 50,
            tantra_als_weg: 65,
            politische_rebellion: 50,
            individueller_anarchismus: 50,
            leben_als_kunst: 80,
            celebration_statt_gebet: 75
        },

        // Praktisches Leben
        praktisches_leben: {
            haushaltsaufteilung: 55,
            alltagsorganisation: 85,
            gesundheitsbewusstsein: 80,
            ernaehrungsstil: 55,
            ordnung_sauberkeit: 60,
            wohnort_flexibilitaet: 65,
            heimatverbundenheit: 50,
            reisen_abenteuer: 75,
            routine_struktur: 70,
            // Pirsig & Osho
            motorrad_pflege: 50,
            gumption_im_alltag: 70,
            stuck_vermeiden: 65,
            klassische_ordnung: 60,
            romantisches_chaos: 55,
            qualitaets_werkzeug: 55,
            achtsamkeit_im_detail: 65,
            meditation_im_alltag: 55,
            gesundheit_durch_bewusstsein: 75,
            dynamische_meditation: 55,
            vipassana_im_leben: 55,
            natuerliches_leben: 60,
            lachen_therapie: 75,
            no_mind: 45,
            zorba_der_geniesser: 80
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
