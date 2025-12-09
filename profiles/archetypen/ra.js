/**
 * RA - Relationship Anarchy (Der Beziehungs-Anarchist)
 *
 * Bedürfnis-Profil mit #ID-basiertem SSOT-System (220 Bedürfnisse)
 *
 * WISSENSCHAFTLICHE GRUNDLAGEN:
 * ─────────────────────────────────────────────────────────────────────────────
 * - Relationship Anarchy Manifesto (Nordgren, 2006)
 * - Anti-Hierarchical Relationship Research (Klesse, 2011)
 * - Autonomy in Relationships (La Guardia et al., 2000)
 * - Social Network Theory: All connections equally valued
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * CHARAKTERISTIK:
 * - Keine Hierarchien zwischen Beziehungen
 * - Freundschaft = Romantik = gleich wertvoll
 * - Maximale Freiheit, minimale Regeln
 * - Jede Beziehung wird individuell definiert
 */

const RAProfil = {
    id: "ra",
    name: "RA",
    beschreibung: "Keine Hierarchien, keine Regeln. Jede Beziehung ist einzigartig und wird von den Beteiligten selbst definiert.",

    quellen: [
        "Relationship Anarchy Manifesto (Nordgren, 2006)",
        "Anti-Hierarchical Relationships (Klesse, 2011)",
        "Autonomy and Relationships (La Guardia et al., 2000)",
        "Anarchist Philosophy (Bookchin, 1982)"
    ],

    beduerfnisse: {
        // ═══════════════════════════════════════════════════════════════════════
        // EXISTENZ (#B1-#B9)
        // ═══════════════════════════════════════════════════════════════════════
        '#B1': 50,   // luft
        '#B2': 50,   // wasser
        '#B3': 50,   // nahrung
        '#B4': 70,   // bewegung - Hoch - körperliche Freiheit
        '#B5': 55,   // beruehrung - Mittel - situativ
        '#B6': 70,   // erholung - Hoch
        '#B7': 65,   // sexueller_ausdruck - Mittel-hoch - nicht hierarchisiert
        '#B8': 60,   // sicherheit_physisch - Mittel
        '#B9': 70,   // unterschlupf - Hoch - eigener Raum

        // ═══════════════════════════════════════════════════════════════════════
        // SICHERHEIT (#B10-#B15)
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Innere Sicherheit, externe Strukturen unwichtig
        '#B10': 45,  // bestaendigkeit - Niedrig-mittel - Wandel akzeptiert
        '#B11': 65,  // sich_sicher_fuehlen - Mittel-hoch - in sich selbst
        '#B12': 40,  // schutz - Niedrig-mittel
        '#B13': 45,  // stabilitaet - Niedrig-mittel - Flexibilität bevorzugt
        '#B14': 85,  // leichtigkeit - Sehr hoch - keine Regeln = Leichtigkeit
        '#B15': 45,  // geborgenheit - Niedrig-mittel - nicht durch andere

        // ═══════════════════════════════════════════════════════════════════════
        // ZUNEIGUNG (#B16-#B24)
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Liebe nicht hierarchisiert
        '#B16': 65,  // waerme - Mittel-hoch - authentisch
        '#B17': 80,  // wertschaetzung - Hoch - alle gleich wertvoll
        '#B18': 55,  // naehe - Mittel - situativ
        '#B19': 70,  // gesellschaft - Hoch - Netzwerk wichtig
        '#B20': 60,  // intimitaet - Mittel - nicht priorisiert
        '#B21': 70,  // liebe - Hoch - aber nicht hierarchisch
        '#B22': 60,  // fuersorge - Mittel - gegenseitig
        '#B23': 65,  // unterstuetzung - Mittel-hoch
        '#B24': 60,  // fuereinander_da_sein - Mittel - ohne Verpflichtung

        // ═══════════════════════════════════════════════════════════════════════
        // VERSTÄNDNIS (#B25-#B33)
        // ═══════════════════════════════════════════════════════════════════════
        '#B25': 90,  // akzeptanz - Sehr hoch - alle Lebensformen
        '#B26': 70,  // mitgefuehl - Hoch
        '#B27': 75,  // beruecksichtigung - Hoch
        '#B28': 70,  // empathie - Hoch
        '#B29': 75,  // vertrauen - Hoch - durch Freiheit
        '#B30': 65,  // beachtung - Mittel-hoch
        '#B31': 75,  // gesehen_werden - Hoch - als Individuum
        '#B32': 70,  // verstanden_werden - Hoch
        '#B33': 50,  // harmonie - Mittel - Konflikte ok

        // ═══════════════════════════════════════════════════════════════════════
        // FREIHEIT (#B34-#B38) - KERN-KATEGORIE
        // ═══════════════════════════════════════════════════════════════════════
        // RA: absolute Freiheit
        '#B34': 100, // selbstbestimmung - Maximum - Kernwert
        '#B35': 100, // waehlen_koennen - Maximum - keine Einschränkungen
        '#B36': 95,  // unabhaengigkeit - Sehr hoch
        '#B37': 90,  // raum_haben - Sehr hoch
        '#B38': 95,  // spontaneitaet - Sehr hoch - keine Regeln

        // ═══════════════════════════════════════════════════════════════════════
        // TEILNAHME (#B39-#B45)
        // ═══════════════════════════════════════════════════════════════════════
        '#B39': 65,  // zusammenarbeit - Mittel-hoch - freiwillig
        '#B40': 85,  // kommunikation - Sehr hoch - aber ohne Zwang
        '#B41': 75,  // gemeinschaft - Hoch - RA-Community
        '#B42': 55,  // zugehoerigkeit - Mittel - lose
        '#B43': 70,  // gegenseitigkeit - Hoch - freiwillig
        '#B44': 90,  // respekt - Sehr hoch - für alle Wege
        '#B45': 70,  // bedeutung_haben - Hoch

        // ═══════════════════════════════════════════════════════════════════════
        // MUSSE (#B46-#B49)
        // ═══════════════════════════════════════════════════════════════════════
        '#B46': 65,  // schoenheit - Mittel-hoch
        '#B47': 90,  // freizeit - Sehr hoch - keine Verpflichtungen
        '#B48': 85,  // freude - Sehr hoch
        '#B49': 80,  // humor - Hoch - Leichtigkeit

        // ═══════════════════════════════════════════════════════════════════════
        // IDENTITÄT (#B50-#B63)
        // ═══════════════════════════════════════════════════════════════════════
        '#B50': 95,  // authentizitaet - Sehr hoch - keine Kompromisse
        '#B51': 95,  // echtheit - Sehr hoch
        '#B52': 90,  // integritaet - Sehr hoch - eigene Werte
        '#B53': 75,  // praesenz - Hoch
        '#B54': 40,  // ordnung - Niedrig - Anarchie
        '#B55': 85,  // bewusstheit - Sehr hoch
        '#B56': 80,  // herausforderung - Hoch - Normen hinterfragen
        '#B57': 80,  // klarheit - Hoch - eigene Position klar
        '#B58': 80,  // kompetenz - Hoch
        '#B59': 60,  // effizienz - Mittel
        '#B60': 85,  // wirksamkeit - Sehr hoch - eigenes Leben gestalten
        '#B61': 85,  // wachstum - Sehr hoch
        '#B62': 80,  // sinn - Hoch - eigener Sinn
        '#B63': 70,  // beitrag_leisten - Hoch - zur Community

        // ═══════════════════════════════════════════════════════════════════════
        // ERSCHAFFEN (#B64-#B68)
        // ═══════════════════════════════════════════════════════════════════════
        '#B64': 90,  // kreativitaet - Sehr hoch - neue Formen erfinden
        '#B65': 90,  // entdecken - Sehr hoch
        '#B66': 85,  // lernen - Sehr hoch
        '#B67': 95,  // selbst_ausdruck - Sehr hoch
        '#B68': 80,  // anreize_bekommen - Hoch

        // ═══════════════════════════════════════════════════════════════════════
        // VERBUNDENHEIT (#B69-#B73)
        // ═══════════════════════════════════════════════════════════════════════
        '#B69': 85,  // leben_feiern - Sehr hoch
        '#B70': 85,  // inspiration - Sehr hoch
        '#B71': 55,  // trauer_ausdruecken - Mittel - individuell
        '#B72': 75,  // einsehen - Hoch
        '#B73': 70,  // anfang_ende - Hoch - Wandel akzeptieren

        // ═══════════════════════════════════════════════════════════════════════
        // DYNAMIK (#B74-#B88)
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Keine festen Rollen, alles situativ
        '#B74': 55,  // kontrolle_ausueben - Mittel - über eigenes Leben
        '#B75': 40,  // hingabe - Niedrig-mittel - temporär
        '#B76': 50,  // fuehrung_geben - Mittel - situativ
        '#B77': 35,  // gefuehrt_werden - Niedrig - bevorzugt Autonomie
        '#B78': 35,  // ritual - Niedrig - keine festen Strukturen
        '#B79': 60,  // nachsorge - Mittel - wenn nötig
        '#B80': 90,  // grenzen_setzen - Sehr hoch - essentiell
        '#B81': 95,  // grenzen_respektieren - Sehr hoch - höchster Wert
        '#B82': 60,  // intensitaet - Mittel - situativ
        '#B83': 60,  // vertrauen_schenken - Mittel - vorsichtig
        '#B84': 80,  // verantwortung_uebernehmen - Hoch - für sich selbst
        '#B85': 35,  // sich_fallenlassen - Niedrig - behält Autonomie
        '#B86': 40,  // machtaustausch - Niedrig-mittel
        '#B87': 30,  // dienend_sein - Niedrig
        '#B88': 50,  // beschuetzen - Mittel

        // ═══════════════════════════════════════════════════════════════════════
        // LEBENSPLANUNG (#B90-#B126)
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Keine vordefinierten Strukturen, alles individuell verhandelbar
        '#B90': 35,  // kinderwunsch - Niedrig-mittel - individuell
        '#B91': 30,  // elternschaft - Niedrig - nicht priorisiert
        '#B92': 25,  // fortpflanzung - Niedrig
        '#B93': 20,  // familie_gruenden - Niedrig - traditionelle Struktur abgelehnt
        '#B94': 45,  // generativitaet - Mittel
        '#B95': 25,  // verbindlichkeit - Niedrig - keine festen Commitments
        '#B96': 30,  // langfristige_bindung - Niedrig - Wandel akzeptiert
        '#B97': 15,  // rechtliche_sicherheit - Sehr niedrig - institutionell abgelehnt
        '#B99': 25,  // gemeinsamer_wohnraum - Niedrig - kann, muss nicht
        '#B100': 50, // haeuslichkeit - Mittel - eigene Definition
        '#B104': 90, // rueckzugsort - Sehr hoch - eigener Raum wichtig
        '#B118': 20, // biologisches_muster - Niedrig
        '#B119': 15, // soziales_muster - Sehr niedrig - abgelehnt
        '#B120': 20, // statische_stabilitaet - Niedrig
        '#B121': 50, // qualitaet_der_fuersorge - Mittel
        '#B122': 95, // familien_rebellion - Sehr hoch
        '#B123': 80, // zorba_das_kind - Hoch
        '#B124': 95, // nicht_anhaften_an_familie - Sehr hoch
        '#B125': 40, // bewusste_elternschaft - Niedrig-mittel
        '#B126': 65, // commune_statt_kernfamilie - Mittel-hoch

        // ═══════════════════════════════════════════════════════════════════════
        // FINANZEN & KARRIERE (#B127-#B148)
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Vollständige finanzielle Autonomie
        '#B127': 95, // finanzielle_unabhaengigkeit - Sehr hoch - essentiell
        '#B128': 10, // gemeinsame_finanzen - Sehr niedrig - vermeidet
        '#B135': 80, // work_life_balance - Hoch - Freiheit wichtig
        '#B136': 65, // berufliche_anerkennung - Mittel-hoch
        '#B139': 80, // gumption - Hoch
        '#B140': 75, // qualitaet_der_arbeit - Hoch
        '#B141': 80, // intellektuelles_muster - Hoch
        '#B142': 85, // dynamische_evolution - Sehr hoch
        '#B143': 60, // klassisches_verstehen - Mittel
        '#B144': 65, // arbeit_als_meditation - Mittel-hoch
        '#B145': 55, // nicht_karriere - Mittel
        '#B146': 65, // zorba_der_unternehmer - Mittel-hoch
        '#B147': 75, // nicht_anhaften_an_geld - Hoch
        '#B148': 90, // kreative_selbstverwirklichung - Sehr hoch

        // ═══════════════════════════════════════════════════════════════════════
        // KOMMUNIKATIONSSTIL (#B149-#B176)
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Ehrlich, direkt, ohne Zwang
        '#B150': 70, // tiefgehende_gespraeche - Hoch - philosophisch
        '#B151': 50, // small_talk - Mittel
        '#B155': 65, // emotionale_offenheit - Mittel-hoch - authentisch
        '#B166': 50, // romantisches_verstehen - Mittel
        '#B167': 80, // klassische_klarheit - Hoch
        '#B168': 85, // dialektik - Sehr hoch - philosophisch
        '#B169': 75, // qualitaets_ausdruck - Hoch
        '#B170': 50, // care_im_gespraech - Mittel
        '#B171': 80, // schweigen_statt_worte - Hoch
        '#B172': 95, // radikale_ehrlichkeit - Sehr hoch
        '#B173': 80, // humorvolle_leichtigkeit - Hoch
        '#B174': 75, // paradoxe_weisheit - Hoch
        '#B175': 40, // herz_statt_kopf - Niedrig-mittel
        '#B176': 95, // authentischer_ausdruck - Sehr hoch

        // ═══════════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN (#B177-#B203)
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Alle Beziehungen gleichwertig, keine Hierarchie
        '#B183': 90, // zeit_fuer_sich - Sehr hoch - essentiell
        '#B184': 90, // eigene_hobbys - Sehr hoch - wichtig
        '#B185': 45, // gemeinsame_zeit - Mittel - freiwillig
        '#B189': 55, // gemeinsame_freunde - Mittel - keine Trennung
        '#B194': 70, // soziale_qualitaet - Hoch
        '#B195': 40, // tribe_muster - Niedrig-mittel
        '#B196': 85, // intellektuelle_gemeinschaft - Sehr hoch
        '#B197': 10, // statische_sozialstrukturen - Sehr niedrig
        '#B198': 55, // sannyas_gemeinschaft - Mittel
        '#B199': 90, // rebellion_gegen_gesellschaft - Sehr hoch
        '#B200': 80, // einsamkeit_in_menge - Hoch
        '#B201': 70, // celebration_mit_anderen - Hoch
        '#B202': 90, // keine_freundschaft_besitz - Sehr hoch
        '#B203': 45, // tantra_gruppe - Mittel

        // ═══════════════════════════════════════════════════════════════════════
        // INTIMITÄT & ROMANTIK (#B204-#B208)
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Intimität nicht hierarchisiert, situativ
        '#B204': 50, // koerpernaehe - Mittel - situativ
        '#B205': 45  // kuscheln - Mittel - nicht priorisiert
    },

    // Erweiterte Bedürfnisse (ohne #ID im SSOT)
    erweitert: {
        lebensplanung: {
            fuersorge: 50,                   // Mittel - ohne Verpflichtung
            erziehung_werte: 35,             // Niedrig-mittel
            tradition_ehe: 5,                // Minimum - explizit abgelehnt
            oeffentliches_bekenntnis: 15     // Sehr niedrig - nicht nötig
        },
        finanzen_karriere: {
            versorger_rolle: 15,             // Sehr niedrig - lehnt ab
            materielle_sicherheit: 60,       // Mittel-hoch
            karriere_entwicklung: 70,        // Hoch - eigene Erfüllung
            gemeinsame_ziele: 35,            // Niedrig - eigene Ziele
            erfolg: 70,                      // Hoch - selbst definiert
            leistung: 65                     // Mittel-hoch
        },
        kommunikation_stil: {
            konfliktbereitschaft: 80,        // Hoch - hinterfragt
            konstruktive_kritik: 80,         // Hoch
            aktives_zuhoeren: 70,            // Hoch
            nonverbale_kommunikation: 55,    // Mittel
            humor_ironie: 80,                // Hoch - kritisch
            intellektueller_austausch: 85,   // Sehr hoch - Ideen wichtig
            digitale_kommunikation: 70,      // Hoch
            verbale_anerkennung: 55,         // Mittel
            schweigen_aushalten: 80          // Hoch - braucht keine Bestätigung
        },
        soziales_leben: {
            freundeskreis_pflege: 80,        // Hoch - gleichwertig mit Partnern
            familieneinbindung: 35,          // Niedrig-mittel - auf Distanz
            gesellschaftliches_engagement: 65, // Mittel-hoch - politisch
            networking: 70,                  // Hoch - Verbindungen ohne Hierarchie
            gemeinsame_hobbys: 45,           // Mittel - situativ
            soziale_unterstuetzung: 55,      // Mittel - gegenseitig aber frei
            gemeinsame_erlebnisse: 55,       // Mittel - situativ
            alltagsteilung: 20               // Niedrig - vermeidet Verschmelzung
        },
        intimitaet_romantik: {
            sexuelle_exklusivitaet: 5,       // Minimum - explizit abgelehnt
            sexuelle_offenheit: 90,          // Sehr hoch - keine Regeln
            leidenschaft: 55,                // Mittel - situativ
            zaertlichkeit: 50,               // Mittel
            emotionale_tiefe: 55,            // Mittel - mit verschiedenen
            romantik: 40,                    // Niedrig-mittel - nicht hierarchisiert
            flirten: 75,                     // Hoch - Freiheit
            eifersucht_als_signal: 20,       // Niedrig - wird abgelehnt
            treue_werte: 25,                 // Niedrig - eigene Definition
            bindungsbereitschaft: 30,        // Niedrig - flexibel
            // Pirsig & Osho
            biologische_anziehung: 55,
            intellektuelle_verbindung: 80,
            qualitaet_der_beruehrung: 55,
            dynamische_liebe: 60,
            care_in_intimitaet: 50,
            sex_als_meditation: 55,
            liebe_ohne_beziehung: 95,        // Sehr hoch - Kernwert
            orgastisches_leben: 55,
            nicht_anhaften_an_partner: 100,  // Maximum
            hier_und_jetzt_intimitaet: 75,
            polyamore_energie: 70,
            wildheit_und_zartheit: 55,
            meditation_zu_zweit: 40
        },
        werte_haltung: {
            spiritualitaet: 50,              // Mittel - individuell
            religioese_praxis: 15,           // Sehr niedrig - institutionell abgelehnt
            politisches_engagement: 75,      // Hoch - politisch aktiv
            umweltbewusstsein: 70,           // Hoch - progressive Werte
            traditionelle_werte: 5,          // Minimum - explizit abgelehnt
            moderne_werte: 95,               // Sehr hoch - radikal progressiv
            toleranz: 95,                    // Sehr hoch - alle Wege akzeptiert
            offenheit_neues: 95,             // Sehr hoch
            kulturelle_identitaet: 45,       // Mittel - flexibel
            wertekongruenz: 85,              // Sehr hoch - lebt nach Überzeugungen
            // Pirsig & Osho
            qualitaet_als_gott: 80,
            rationaler_mystizismus: 75,
            aristotelische_vernunft: 60,
            platonische_ideen: 55,
            buddhistische_achtsamkeit: 70,
            religionslosigkeit: 90,
            eigene_wahrheit: 100,            // Maximum
            zen_paradox: 75,
            tantra_als_weg: 55,
            politische_rebellion: 85,
            individueller_anarchismus: 95,
            leben_als_kunst: 90,
            celebration_statt_gebet: 80
        },
        praktisches_leben: {
            haushaltsaufteilung: 15,         // Sehr niedrig - eigenständig
            alltagsorganisation: 60,         // Mittel - für sich selbst
            gesundheitsbewusstsein: 70,      // Hoch
            ernaehrungsstil: 60,             // Mittel-hoch - bewusst
            ordnung_sauberkeit: 50,          // Mittel - eigener Standard
            mobilitaet: 95,                  // Sehr hoch - maximal flexibel
            wohnort_flexibilitaet: 95,       // Sehr hoch - ortsungebunden
            heimatverbundenheit: 25,         // Niedrig - nomadisch
            reisen_abenteuer: 90,            // Sehr hoch
            routine_struktur: 35,            // Niedrig - wenig Struktur
            // Pirsig & Osho
            motorrad_pflege: 55,
            gumption_im_alltag: 80,
            stuck_vermeiden: 85,
            klassische_ordnung: 35,
            romantisches_chaos: 75,
            qualitaets_werkzeug: 60,
            achtsamkeit_im_detail: 55,
            meditation_im_alltag: 65,
            gesundheit_durch_bewusstsein: 70,
            dynamische_meditation: 70,
            vipassana_im_leben: 60,
            natuerliches_leben: 70,
            lachen_therapie: 80,
            no_mind: 70,
            zorba_der_geniesser: 85
        }
    },

    kernwerte: ["Freiheit", "Gleichwertigkeit", "Autonomie", "Anti-Hierarchie", "Selbstbestimmung"],
    vermeidet: ["Regeln", "Hierarchien", "Verpflichtungen", "Normen", "Exklusivität"]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = RAProfil;
}
if (typeof window !== 'undefined') {
    window.RAProfil = RAProfil;
}
