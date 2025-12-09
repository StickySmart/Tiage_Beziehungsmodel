/**
 * SINGLE - Der Autonome
 *
 * Bedürfnis-Profil mit #ID-basiertem SSOT-System (220 Bedürfnisse)
 *
 * WISSENSCHAFTLICHE GRUNDLAGEN:
 * ─────────────────────────────────────────────────────────────────────────────
 * - Self-Determination Theory (Deci & Ryan, 2000): Hohe Autonomie-Orientierung
 * - Attachment Theory (Bartholomew, 1990): Dismissive-Avoidant Stil
 * - Identity Development (Erikson): Starke Ich-Identität vor Intimität
 * - Maslow's Hierarchy: Selbstverwirklichung priorisiert
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * CHARAKTERISTIK:
 * - Maximale Autonomie und Selbstverwirklichung
 * - Freiheit steht über Bindung
 * - Hohe Selbstgenügsamkeit
 * - Vermeidet emotionale Abhängigkeit
 */

const SingleProfil = {
    id: "single",
    name: "Single",
    beschreibung: "Maximale Autonomie und Selbstverwirklichung. Freiheit steht über Bindung.",

    quellen: [
        "Self-Determination Theory (Deci & Ryan, 2000)",
        "Attachment Theory - Dismissive-Avoidant (Bartholomew & Horowitz, 1991)",
        "Identity vs. Intimacy (Erikson, 1968)",
        "Need for Uniqueness (Snyder & Fromkin, 1980)"
    ],

    beduerfnisse: {
        // ═══════════════════════════════════════════════════════════════════════
        // EXISTENZ (#B1-#B9)
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Selbstversorgung wichtig, körperliche Autonomie hoch
        '#B1': 50,   // luft - Universal, neutral
        '#B2': 50,   // wasser - Universal, neutral
        '#B3': 50,   // nahrung - Universal, neutral
        '#B4': 75,   // bewegung - Hoch - körperliche Aktivität für Selbstwirksamkeit
        '#B5': 45,   // beruehrung - Reduziert - weniger Bedürfnis nach körperlicher Nähe
        '#B6': 70,   // erholung - Mittel-hoch - Selbstfürsorge wichtig
        '#B7': 65,   // sexueller_ausdruck - Mittel - unabhängig von Beziehung
        '#B8': 60,   // sicherheit_physisch - Mittel - Selbstschutz
        '#B9': 55,   // unterschlupf - Mittel - eigener Raum wichtig

        // ═══════════════════════════════════════════════════════════════════════
        // SICHERHEIT (#B10-#B15)
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Innere Sicherheit > externe Sicherheit durch andere
        '#B10': 40,  // bestaendigkeit - Niedrig - Flexibilität bevorzugt
        '#B11': 55,  // sich_sicher_fuehlen - Mittel - innere Sicherheit
        '#B12': 35,  // schutz - Niedrig - braucht keinen Beschützer
        '#B13': 40,  // stabilitaet - Niedrig - kann mit Unsicherheit umgehen
        '#B14': 70,  // leichtigkeit - Hoch - Unbeschwertheit wichtig
        '#B15': 30,  // geborgenheit - Niedrig - vermeidet emotionale Abhängigkeit

        // ═══════════════════════════════════════════════════════════════════════
        // ZUNEIGUNG (#B16-#B24)
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Selektive Zuneigung, vermeidet Verschmelzung
        '#B16': 50,  // waerme - Mittel - kann geben, aber dosiert
        '#B17': 60,  // wertschaetzung - Mittel-hoch - möchte anerkannt werden
        '#B18': 35,  // naehe - Niedrig - bevorzugt Distanz
        '#B19': 55,  // gesellschaft - Mittel - selektiv sozial
        '#B20': 40,  // intimitaet - Niedrig - vermeidet tiefe Verschmelzung
        '#B21': 45,  // liebe - Mittel-niedrig - rational, nicht überwältigend
        '#B22': 45,  // fuersorge - Mittel - kann fürsorglich sein, aber begrenzt
        '#B23': 50,  // unterstuetzung - Mittel - gegenseitig, nicht einseitig
        '#B24': 40,  // fuereinander_da_sein - Niedrig - Unabhängigkeit wichtiger

        // ═══════════════════════════════════════════════════════════════════════
        // VERSTÄNDNIS (#B25-#B33)
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Respekt > emotionales Verständnis
        '#B25': 65,  // akzeptanz - Mittel-hoch - will akzeptiert werden wie man ist
        '#B26': 45,  // mitgefuehl - Mittel - rational, weniger emotional
        '#B27': 55,  // beruecksichtigung - Mittel - will berücksichtigt werden
        '#B28': 50,  // empathie - Mittel - kann empathisch sein
        '#B29': 55,  // vertrauen - Mittel - vorsichtig mit Vertrauen
        '#B30': 60,  // beachtung - Mittel-hoch - Anerkennung wichtig
        '#B31': 65,  // gesehen_werden - Mittel-hoch - als Individuum
        '#B32': 55,  // verstanden_werden - Mittel - nicht übermäßig wichtig
        '#B33': 45,  // harmonie - Niedrig-mittel - kann Konflikte aushalten

        // ═══════════════════════════════════════════════════════════════════════
        // FREIHEIT (#B34-#B38) - KERN-KATEGORIE
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: höchste Werte
        '#B34': 95,  // selbstbestimmung - Sehr hoch - Kernbedürfnis
        '#B35': 90,  // waehlen_koennen - Sehr hoch - Optionen offen halten
        '#B36': 95,  // unabhaengigkeit - Sehr hoch - emotionale & praktische
        '#B37': 90,  // raum_haben - Sehr hoch - eigener Raum essentiell
        '#B38': 85,  // spontaneitaet - Hoch - Flexibilität wichtig

        // ═══════════════════════════════════════════════════════════════════════
        // TEILNAHME (#B39-#B45)
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Selektive Teilnahme, vermeidet Verpflichtungen
        '#B39': 55,  // zusammenarbeit - Mittel - wenn nötig
        '#B40': 60,  // kommunikation - Mittel - klar, aber nicht übermäßig
        '#B41': 50,  // gemeinschaft - Mittel - lose Netzwerke bevorzugt
        '#B42': 45,  // zugehoerigkeit - Niedrig-mittel - nicht essentiell
        '#B43': 55,  // gegenseitigkeit - Mittel - fairness wichtig
        '#B44': 75,  // respekt - Hoch - Respekt für Grenzen wichtig
        '#B45': 70,  // bedeutung_haben - Hoch - will bedeutsam sein

        // ═══════════════════════════════════════════════════════════════════════
        // MUSSE (#B46-#B49)
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Genussfähigkeit alleine hoch
        '#B46': 65,  // schoenheit - Mittel-hoch - ästhetisch orientiert
        '#B47': 85,  // freizeit - Sehr hoch - eigene Zeit wertvoll
        '#B48': 80,  // freude - Hoch - Lebensfreude alleine
        '#B49': 70,  // humor - Hoch - Leichtigkeit

        // ═══════════════════════════════════════════════════════════════════════
        // IDENTITÄT (#B50-#B63) - KERN-KATEGORIE
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: starke Selbstdefinition
        '#B50': 90,  // authentizitaet - Sehr hoch - true self wichtig
        '#B51': 85,  // echtheit - Sehr hoch - keine Maske
        '#B52': 85,  // integritaet - Sehr hoch - Werte leben
        '#B53': 70,  // praesenz - Hoch - im Moment sein
        '#B54': 55,  // ordnung - Mittel - eigene Ordnung
        '#B55': 75,  // bewusstheit - Hoch - Selbstreflexion
        '#B56': 80,  // herausforderung - Hoch - Wachstum durch Challenge
        '#B57': 75,  // klarheit - Hoch - klare Grenzen
        '#B58': 85,  // kompetenz - Sehr hoch - Meisterschaft wichtig
        '#B59': 70,  // effizienz - Hoch - Selbstwirksamkeit
        '#B60': 80,  // wirksamkeit - Sehr hoch - Einfluss haben
        '#B61': 85,  // wachstum - Sehr hoch - persönliche Entwicklung
        '#B62': 75,  // sinn - Hoch - eigener Lebenssinn
        '#B63': 65,  // beitrag_leisten - Mittel-hoch - aber individuell

        // ═══════════════════════════════════════════════════════════════════════
        // ERSCHAFFEN (#B64-#B68)
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Kreative Selbstentfaltung wichtig
        '#B64': 80,  // kreativitaet - Sehr hoch - kreativer Ausdruck
        '#B65': 85,  // entdecken - Sehr hoch - Neugier
        '#B66': 80,  // lernen - Sehr hoch - lebenslanges Lernen
        '#B67': 85,  // selbst_ausdruck - Sehr hoch - Individualität zeigen
        '#B68': 70,  // anreize_bekommen - Hoch - Stimulation suchen

        // ═══════════════════════════════════════════════════════════════════════
        // VERBUNDENHEIT (#B69-#B73)
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Spirituelle Verbundenheit ohne menschliche Abhängigkeit
        '#B69': 70,  // leben_feiern - Hoch - Lebensfreude
        '#B70': 75,  // inspiration - Hoch - von Ideen inspiriert
        '#B71': 45,  // trauer_ausdruecken - Mittel - privat verarbeitet
        '#B72': 65,  // einsehen - Mittel-hoch - Selbsterkenntnis
        '#B73': 55,  // anfang_ende - Mittel - philosophisch akzeptiert

        // ═══════════════════════════════════════════════════════════════════════
        // DYNAMIK (#B74-#B88)
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Tendenz zu Autonomie, vermeidet Abhängigkeit
        '#B74': 55,  // kontrolle_ausueben - Mittel - über eigenes Leben
        '#B75': 30,  // hingabe - Niedrig - vermeidet Kontrollverlust
        '#B76': 55,  // fuehrung_geben - Mittel - wenn situativ nötig
        '#B77': 25,  // gefuehrt_werden - Niedrig - bevorzugt Autonomie
        '#B78': 40,  // ritual - Niedrig-mittel - eigene Rituale
        '#B79': 45,  // nachsorge - Mittel - Selbstfürsorge
        '#B80': 85,  // grenzen_setzen - Sehr hoch - klare Grenzen
        '#B81': 75,  // grenzen_respektieren - Hoch - respektiert andere
        '#B82': 60,  // intensitaet - Mittel - dosiert
        '#B83': 40,  // vertrauen_schenken - Niedrig-mittel - vorsichtig
        '#B84': 70,  // verantwortung_uebernehmen - Hoch - für sich selbst
        '#B85': 25,  // sich_fallenlassen - Niedrig - behält Kontrolle
        '#B86': 35,  // machtaustausch - Niedrig - vermeidet
        '#B87': 25,  // dienend_sein - Niedrig - nicht unterwürfig
        '#B88': 50,  // beschuetzen - Mittel - kann beschützen

        // ═══════════════════════════════════════════════════════════════════════
        // LEBENSPLANUNG (#B90-#B126)
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Niedrig - Freiheit und Flexibilität priorisiert
        '#B90': 25,  // kinderwunsch - Niedrig - oft kein aktiver Wunsch
        '#B91': 20,  // elternschaft - Niedrig - Verantwortung einschränkt
        '#B92': 20,  // fortpflanzung - Niedrig - nicht priorisiert
        '#B93': 15,  // familie_gruenden - Sehr niedrig - nicht das Ziel
        '#B94': 40,  // generativitaet - Mittel - anders ausgelebt
        '#B95': 25,  // verbindlichkeit - Niedrig - vermeidet langfristige Bindung
        '#B96': 20,  // langfristige_bindung - Niedrig - Flexibilität wichtiger
        '#B97': 30,  // rechtliche_sicherheit - Niedrig - braucht keine Absicherung
        '#B99': 15,  // gemeinsamer_wohnraum - Sehr niedrig - eigener Raum essentiell
        '#B100': 50, // haeuslichkeit - Mittel - eigenes Zuhause wichtig
        '#B104': 95, // rueckzugsort - Sehr hoch - Kernbedürfnis
        '#B118': 25, // biologisches_muster - Niedrig - nicht priorisiert
        '#B119': 20, // soziales_muster - Niedrig - Normen abgelehnt
        '#B120': 30, // statische_stabilitaet - Niedrig - Flexibilität bevorzugt
        '#B121': 55, // qualitaet_der_fuersorge - Mittel - Selbstfürsorge
        '#B122': 80, // familien_rebellion - Hoch - gegen Normen
        '#B123': 70, // zorba_das_kind - Hoch - Lebensfreude
        '#B124': 85, // nicht_anhaften_an_familie - Sehr hoch - unabhängig
        '#B125': 40, // bewusste_elternschaft - Niedrig - nicht priorisiert
        '#B126': 45, // commune_statt_kernfamilie - Mittel - offen

        // ═══════════════════════════════════════════════════════════════════════
        // FINANZEN & KARRIERE (#B127-#B148)
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Hohe finanzielle Unabhängigkeit, Karriere wichtig
        '#B127': 95, // finanzielle_unabhaengigkeit - Sehr hoch - Kernbedürfnis
        '#B128': 10, // gemeinsame_finanzen - Sehr niedrig - alles getrennt
        '#B135': 75, // work_life_balance - Hoch - Balance für sich
        '#B136': 80, // berufliche_anerkennung - Hoch - Erfolg wichtig
        '#B139': 85, // gumption - Sehr hoch - innere Motivation
        '#B140': 80, // qualitaet_der_arbeit - Hoch - Meisterschaft
        '#B141': 75, // intellektuelles_muster - Hoch - analytisch
        '#B142': 80, // dynamische_evolution - Hoch - Wachstum
        '#B143': 70, // klassisches_verstehen - Hoch - analytisch
        '#B144': 65, // arbeit_als_meditation - Mittel-hoch - Flow
        '#B145': 25, // nicht_karriere - Niedrig - Karriere wichtig
        '#B146': 70, // zorba_der_unternehmer - Hoch - Erfolg & Erfüllung
        '#B147': 55, // nicht_anhaften_an_geld - Mittel - unabhängig
        '#B148': 85, // kreative_selbstverwirklichung - Sehr hoch

        // ═══════════════════════════════════════════════════════════════════════
        // KOMMUNIKATIONSSTIL (#B149-#B176)
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Direkte Kommunikation, emotionale Distanz
        '#B150': 55, // tiefgehende_gespraeche - Mittel - mit Ausgewählten
        '#B151': 60, // small_talk - Mittel - oberflächlich ok
        '#B155': 40, // emotionale_offenheit - Niedrig-mittel - selektiv offen
        '#B166': 50, // romantisches_verstehen - Mittel - ganzheitlich
        '#B167': 80, // klassische_klarheit - Hoch - präzise
        '#B168': 75, // dialektik - Hoch - philosophisch
        '#B169': 70, // qualitaets_ausdruck - Hoch
        '#B170': 50, // care_im_gespraech - Mittel
        '#B171': 75, // schweigen_statt_worte - Hoch - Stille schätzen
        '#B172': 80, // radikale_ehrlichkeit - Hoch - direkt
        '#B173': 75, // humorvolle_leichtigkeit - Hoch
        '#B174': 55, // paradoxe_weisheit - Mittel
        '#B175': 40, // herz_statt_kopf - Niedrig - rational
        '#B176': 90, // authentischer_ausdruck - Sehr hoch - echt

        // ═══════════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN (#B177-#B203)
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Lose Netzwerke, selektive Kontakte
        '#B183': 95, // zeit_fuer_sich - Sehr hoch - Kernbedürfnis
        '#B184': 95, // eigene_hobbys - Sehr hoch - Kernbedürfnis
        '#B185': 25, // gemeinsame_zeit - Niedrig - Zeit für sich
        '#B189': 35, // gemeinsame_freunde - Niedrig - eigene Freunde
        '#B194': 70, // soziale_qualitaet - Hoch - wenige aber tiefe
        '#B195': 40, // tribe_muster - Niedrig - nicht gebunden
        '#B196': 80, // intellektuelle_gemeinschaft - Hoch - Gleichgesinnte
        '#B197': 25, // statische_sozialstrukturen - Niedrig - flexibel
        '#B198': 35, // sannyas_gemeinschaft - Niedrig-mittel
        '#B199': 75, // rebellion_gegen_gesellschaft - Hoch - Normen hinterfragen
        '#B200': 85, // einsamkeit_in_menge - Sehr hoch - allein unter Menschen
        '#B201': 60, // celebration_mit_anderen - Mittel
        '#B202': 70, // keine_freundschaft_besitz - Hoch - lose Bindungen
        '#B203': 30, // tantra_gruppe - Niedrig

        // ═══════════════════════════════════════════════════════════════════════
        // INTIMITÄT & ROMANTIK (#B204-#B208)
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Körperliche Intimität ohne emotionale Bindung
        '#B204': 45, // koerpernaehe - Mittel - dosiert
        '#B205': 35  // kuscheln - Niedrig - nicht so wichtig
    },

    // Erweiterte Bedürfnisse (ohne #ID im SSOT)
    erweitert: {
        lebensplanung: {
            fuersorge: 45,                   // Mittel - kann fürsorglich sein
            erziehung_werte: 30,             // Niedrig - keine Kinder geplant
            tradition_ehe: 15,               // Sehr niedrig - traditionelle Werte unwichtig
            oeffentliches_bekenntnis: 20     // Niedrig - braucht keine Bestätigung
        },
        finanzen_karriere: {
            versorger_rolle: 20,             // Niedrig - nur Selbstversorgung
            materielle_sicherheit: 65,       // Mittel-hoch - eigene Absicherung
            karriere_entwicklung: 85,        // Sehr hoch - berufliche Erfüllung
            gemeinsame_ziele: 25,            // Niedrig - eigene Ziele
            erfolg: 85,                      // Sehr hoch - persönlicher Erfolg
            leistung: 80                     // Hoch - Selbstwirksamkeit durch Leistung
        },
        kommunikation_stil: {
            konfliktbereitschaft: 70,        // Hoch - kann Konflikte austragen
            konstruktive_kritik: 75,         // Hoch - direkt und sachlich
            aktives_zuhoeren: 55,            // Mittel - wenn interessiert
            nonverbale_kommunikation: 50,    // Mittel - weniger Fokus
            humor_ironie: 75,                // Hoch - Leichtigkeit
            intellektueller_austausch: 80,   // Hoch - geistige Stimulation
            digitale_kommunikation: 70,      // Hoch - praktisch und distanziert
            verbale_anerkennung: 55,         // Mittel - braucht weniger externe
            schweigen_aushalten: 85          // Sehr hoch - allein sein können
        },
        soziales_leben: {
            freundeskreis_pflege: 60,        // Mittel - wichtig aber nicht zentral
            familieneinbindung: 40,          // Niedrig-mittel - auf Distanz
            gesellschaftliches_engagement: 50, // Mittel - individuell
            networking: 70,                  // Hoch - beruflich nützlich
            gemeinsame_hobbys: 25,           // Niedrig - eigene Interessen
            soziale_unterstuetzung: 45,      // Mittel - braucht weniger
            gemeinsame_erlebnisse: 40,       // Niedrig-mittel - selektiv
            alltagsteilung: 15               // Sehr niedrig - eigener Alltag
        },
        intimitaet_romantik: {
            sexuelle_exklusivitaet: 30,      // Niedrig - offen für Optionen
            sexuelle_offenheit: 75,          // Hoch - experimentierfreudig
            leidenschaft: 60,                // Mittel - wenn vorhanden
            zaertlichkeit: 40,               // Niedrig-mittel - distanziert
            emotionale_tiefe: 45,            // Mittel - vorsichtig
            romantik: 35,                    // Niedrig - nüchtern
            flirten: 70,                     // Hoch - unverbindlich
            eifersucht_als_signal: 25,       // Niedrig - keine Besitzansprüche
            treue_werte: 40,                 // Niedrig-mittel - flexible Definition
            bindungsbereitschaft: 20,        // Niedrig - Autonomie wichtiger
            // Pirsig & Osho
            biologische_anziehung: 60,
            intellektuelle_verbindung: 75,
            qualitaet_der_beruehrung: 55,
            dynamische_liebe: 45,
            care_in_intimitaet: 45,
            sex_als_meditation: 50,
            liebe_ohne_beziehung: 80,        // Hoch - Freiheit
            orgastisches_leben: 55,
            nicht_anhaften_an_partner: 90,   // Sehr hoch - Kernwert
            hier_und_jetzt_intimitaet: 65,
            polyamore_energie: 50,
            wildheit_und_zartheit: 50,
            meditation_zu_zweit: 35
        },
        werte_haltung: {
            spiritualitaet: 55,              // Mittel - individuelle Spiritualität
            religioese_praxis: 25,           // Niedrig - nicht institutionell
            politisches_engagement: 55,      // Mittel - wenn persönlich relevant
            umweltbewusstsein: 60,           // Mittel-hoch - individuell gelebt
            traditionelle_werte: 20,         // Niedrig - progressiv
            moderne_werte: 85,               // Sehr hoch - individualistisch
            toleranz: 80,                    // Hoch - akzeptiert Diversität
            offenheit_neues: 85,             // Sehr hoch - Neugier
            kulturelle_identitaet: 55,       // Mittel - eigene Definition
            wertekongruenz: 70,              // Hoch - lebt nach eigenen Werten
            // Pirsig & Osho
            qualitaet_als_gott: 75,
            rationaler_mystizismus: 60,
            aristotelische_vernunft: 75,
            platonische_ideen: 55,
            buddhistische_achtsamkeit: 60,
            religionslosigkeit: 70,
            eigene_wahrheit: 90,
            zen_paradox: 50,
            tantra_als_weg: 40,
            politische_rebellion: 55,
            individueller_anarchismus: 70,
            leben_als_kunst: 80,
            celebration_statt_gebet: 65
        },
        praktisches_leben: {
            haushaltsaufteilung: 10,         // Sehr niedrig - alles alleine
            alltagsorganisation: 70,         // Hoch - strukturiert für sich
            gesundheitsbewusstsein: 75,      // Hoch - Selbstfürsorge
            ernaehrungsstil: 65,             // Mittel-hoch - eigene Wahl
            ordnung_sauberkeit: 60,          // Mittel - eigener Standard
            mobilitaet: 90,                  // Sehr hoch - flexibel und mobil
            wohnort_flexibilitaet: 90,       // Sehr hoch - ortsungebunden
            heimatverbundenheit: 35,         // Niedrig - nicht verwurzelt
            reisen_abenteuer: 85,            // Sehr hoch - Entdeckungslust
            routine_struktur: 55,            // Mittel - eigene Routinen
            // Pirsig & Osho
            motorrad_pflege: 65,
            gumption_im_alltag: 80,
            stuck_vermeiden: 75,
            klassische_ordnung: 55,
            romantisches_chaos: 60,
            qualitaets_werkzeug: 70,
            achtsamkeit_im_detail: 65,
            meditation_im_alltag: 55,
            gesundheit_durch_bewusstsein: 70,
            dynamische_meditation: 60,
            vipassana_im_leben: 55,
            natuerliches_leben: 60,
            lachen_therapie: 70,
            no_mind: 50,
            zorba_der_geniesser: 75
        }
    },

    kernwerte: ["Freiheit", "Authentizität", "Wachstum", "Kompetenz", "Unabhängigkeit"],
    vermeidet: ["Abhängigkeit", "Verschmelzung", "Kontrolle durch andere", "Verpflichtung"]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SingleProfil;
}
if (typeof window !== 'undefined') {
    window.SingleProfil = SingleProfil;
}
