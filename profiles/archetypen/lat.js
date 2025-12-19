/**
 * LAT - Living Apart Together
 *
 * Vollständiges Bedürfnis-Profil mit 220 Werten (0-100)
 * Verwendet #ID-System aus beduerfnis-ids.js
 *
 * WISSENSCHAFTLICHE GRUNDLAGEN:
 * ─────────────────────────────────────────────────────────────────────────────
 * - LAT Research (Levin, 2004): "Together but separate"
 * - Commuter Marriage Studies (Gerstel & Gross, 1984)
 * - Autonomy in Committed Relationships (Knee et al., 2002)
 * - Personal Space Research (Hall, 1966): Need for territory
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * CHARAKTERISTIK:
 * - Feste Partnerschaft, getrennte Wohnungen
 * - Nähe durch Qualität, nicht Quantität
 * - Autonomie im Alltag, Verbundenheit im Herzen
 * - Bewusste Wahl gegen Zusammenleben
 */

const LATProfil = {
    id: "lat",
    name: "LAT",
    beschreibung: "Liebe mit Abstand. Feste Partnerschaft, getrennte Wohnungen. Nähe durch Qualität, nicht Quantität.",

    quellen: [
        "Living Apart Together (Levin, 2004)",
        "Commuter Marriages (Gerstel & Gross, 1984)",
        "Autonomy in Relationships (Knee et al., 2002)",
        "Personal Space Theory (Hall, 1966)"
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
        '#B4': 65,   // bewegung - Mittel-hoch
        '#B5': 65,   // beruehrung - Mittel-hoch - wenn zusammen, intensiv
        '#B6': 75,   // erholung - Hoch - eigene Erholung wichtig
        '#B7': 70,   // sexueller_ausdruck - Hoch - wenn zusammen
        '#B8': 65,   // sicherheit_physisch - Mittel-hoch
        '#B9': 90,   // unterschlupf - Sehr hoch - eigenes Zuhause essentiell

        // ─────────────────────────────────────────────────────────────────────────
        // SICHERHEIT (#B10-#B15) - Sicherheit durch Beziehung + eigenen Raum
        // ─────────────────────────────────────────────────────────────────────────
        '#B10': 70,  // bestaendigkeit - Hoch - verlässliche Beziehung
        '#B11': 75,  // sich_sicher_fuehlen - Hoch - durch Struktur
        '#B12': 55,  // schutz - Mittel - Selbstschutz
        '#B13': 70,  // stabilitaet - Hoch - geplante Treffen
        '#B14': 75,  // leichtigkeit - Hoch - keine Alltags-Reibung
        '#B15': 65,  // geborgenheit - Mittel-hoch - bei Treffen

        // ─────────────────────────────────────────────────────────────────────────
        // ZUNEIGUNG (#B16-#B24) - Qualität vor Quantität
        // ─────────────────────────────────────────────────────────────────────────
        '#B16': 75,  // waerme - Hoch - konzentriert
        '#B17': 80,  // wertschaetzung - Hoch
        '#B18': 70,  // naehe - Hoch - wenn zusammen
        '#B19': 70,  // gesellschaft - Hoch - aber nicht ständig
        '#B20': 80,  // intimitaet - Hoch - intensive Treffen
        '#B21': 80,  // liebe - Hoch - feste Bindung
        '#B22': 70,  // fuersorge - Hoch - aus der Distanz
        '#B23': 75,  // unterstuetzung - Hoch
        '#B24': 75,  // fuereinander_da_sein - Hoch - wenn nötig

        // ─────────────────────────────────────────────────────────────────────────
        // VERSTÄNDNIS (#B25-#B33)
        // ─────────────────────────────────────────────────────────────────────────
        '#B25': 80,  // akzeptanz - Hoch - Lebensmodell akzeptiert
        '#B26': 75,  // mitgefuehl - Hoch
        '#B27': 80,  // beruecksichtigung - Hoch
        '#B28': 75,  // empathie - Hoch
        '#B29': 85,  // vertrauen - Sehr hoch - Basis von LAT
        '#B30': 75,  // beachtung - Hoch
        '#B31': 80,  // gesehen_werden - Hoch
        '#B32': 80,  // verstanden_werden - Hoch
        '#B33': 70,  // harmonie - Hoch - weniger Alltags-Konflikte

        // ─────────────────────────────────────────────────────────────────────────
        // FREIHEIT (#B34-#B38) - KERN-KATEGORIE - hohe Autonomie im Alltag
        // ─────────────────────────────────────────────────────────────────────────
        '#B34': 85,  // selbstbestimmung - Sehr hoch - Alltag selbst gestalten
        '#B35': 80,  // waehlen_koennen - Hoch
        '#B36': 85,  // unabhaengigkeit - Sehr hoch - im Alltag
        '#B37': 95,  // raum_haben - Sehr hoch - eigene Wohnung
        '#B38': 75,  // spontaneitaet - Hoch - flexible Treffen

        // ─────────────────────────────────────────────────────────────────────────
        // TEILNAHME (#B39-#B45)
        // ─────────────────────────────────────────────────────────────────────────
        '#B39': 70,  // zusammenarbeit - Hoch - bei Treffen
        '#B40': 85,  // kommunikation - Sehr hoch - essentiell für LAT
        '#B41': 65,  // gemeinschaft - Mittel-hoch - eigene + gemeinsame
        '#B42': 75,  // zugehoerigkeit - Hoch - zum Partner
        '#B43': 80,  // gegenseitigkeit - Hoch
        '#B44': 85,  // respekt - Sehr hoch - für Raumbedürfnis
        '#B45': 75,  // bedeutung_haben - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // MUSSE (#B46-#B49)
        // ─────────────────────────────────────────────────────────────────────────
        '#B46': 70,  // schoenheit - Hoch
        '#B47': 85,  // freizeit - Sehr hoch - eigene Zeit
        '#B48': 80,  // freude - Hoch - gemeinsam & alleine
        '#B49': 75,  // humor - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // IDENTITÄT (#B50-#B63)
        // ─────────────────────────────────────────────────────────────────────────
        '#B50': 85,  // authentizitaet - Sehr hoch - eigene Identität
        '#B51': 85,  // echtheit - Sehr hoch
        '#B52': 85,  // integritaet - Sehr hoch
        '#B53': 75,  // praesenz - Hoch - wenn zusammen
        '#B54': 75,  // ordnung - Hoch - eigene Ordnung
        '#B55': 80,  // bewusstheit - Hoch
        '#B56': 60,  // herausforderung - Mittel
        '#B57': 80,  // klarheit - Hoch - klare Vereinbarungen
        '#B58': 80,  // kompetenz - Hoch
        '#B59': 75,  // effizienz - Hoch - eigener Rhythmus
        '#B60': 80,  // wirksamkeit - Hoch
        '#B61': 75,  // wachstum - Hoch - individuell & gemeinsam
        '#B62': 80,  // sinn - Hoch
        '#B63': 75,  // beitrag_leisten - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // ERSCHAFFEN (#B64-#B68)
        // ─────────────────────────────────────────────────────────────────────────
        '#B64': 75,  // kreativitaet - Hoch - eigene Projekte
        '#B65': 75,  // entdecken - Hoch
        '#B66': 75,  // lernen - Hoch
        '#B67': 80,  // selbst_ausdruck - Hoch
        '#B68': 70,  // anreize_bekommen - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // VERBUNDENHEIT (#B69-#B73)
        // ─────────────────────────────────────────────────────────────────────────
        '#B69': 80,  // leben_feiern - Hoch
        '#B70': 75,  // inspiration - Hoch
        '#B71': 65,  // trauer_ausdruecken - Mittel-hoch
        '#B72': 70,  // einsehen - Hoch
        '#B73': 70,  // anfang_ende - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // DYNAMIK (#B74-#B88) - Ausgewogen, eher autonom
        // ─────────────────────────────────────────────────────────────────────────
        '#B74': 55,  // kontrolle_ausueben - Mittel - über eigenen Alltag
        '#B75': 55,  // hingabe - Mittel - bei Treffen
        '#B76': 50,  // fuehrung_geben - Mittel
        '#B77': 45,  // gefuehrt_werden - Mittel
        '#B78': 70,  // ritual - Hoch - Treffen-Rituale
        '#B79': 70,  // nachsorge - Hoch
        '#B80': 85,  // grenzen_setzen - Sehr hoch - Raum schützen
        '#B81': 90,  // grenzen_respektieren - Sehr hoch
        '#B82': 70,  // intensitaet - Hoch - konzentriert
        '#B83': 80,  // vertrauen_schenken - Hoch
        '#B84': 75,  // verantwortung_uebernehmen - Hoch - geteilte Verantwortung
        '#B85': 55,  // sich_fallenlassen - Mittel
        '#B86': 50,  // machtaustausch - Mittel
        '#B87': 50,  // dienend_sein - Mittel
        '#B88': 65,  // beschuetzen - Mittel-hoch

        // ─────────────────────────────────────────────────────────────────────────
        // LEBENSPLANUNG (#B90-#B126) - Feste Beziehung, aber getrennt wohnen
        // ─────────────────────────────────────────────────────────────────────────
        '#B90': 50,   // kinderwunsch - Mittel - individuell
        '#B91': 45,   // elternschaft - Mittel - kann kompliziert sein mit LAT
        '#B92': 40,   // fortpflanzung - Niedrig-mittel
        '#B93': 40,   // familie_gruenden - Niedrig-mittel - erschwert durch LAT
        '#B94': 55,   // generativitaet - Mittel
        '#B95': 75,   // verbindlichkeit - Hoch - feste Beziehung
        '#B96': 80,   // langfristige_bindung - Hoch - langfristig angelegt
        '#B97': 50,   // rechtliche_sicherheit - Mittel - offen
        '#B98': 70,   // treueversprechen - Hoch - meist treu
        '#B99': 10,   // gemeinsamer_wohnraum - Sehr niedrig - bewusst vermieden
        '#B100': 75,  // haeuslichkeit - Hoch - im eigenen Zuhause
        '#B101': 50,  // nest_bauen - Mittel - eigenes Nest
        '#B102': 25,  // alltag_teilen - Niedrig - getrennte Alltage
        '#B103': 100, // eigener_raum - Maximum - Kernbedürfnis
        '#B104': 100, // rueckzugsort - Maximum - Kernbedürfnis
        '#B105': 50,  // tierliebe - Mittel
        '#B106': 50,  // fuersorge_tiere - Mittel
        '#B107': 50,  // begleiter - Mittel
        '#B108': 50,  // verantwortung_tier - Mittel
        '#B109': 55,  // sesshaftigkeit - Mittel
        '#B110': 65,  // verwurzelung - Mittel-hoch
        '#B111': 80,  // mobilitaet - Hoch - Reisen zum Partner
        '#B112': 65,  // heimat - Mittel-hoch - eigenes Zuhause
        '#B113': 70,  // neue_orte - Hoch - gemeinsame Reisen
        '#B114': 55,  // familienbindung - Mittel - kann Erklärung brauchen
        '#B115': 50,  // herkunftsfamilie - Mittel
        '#B116': 50,  // familientreffen - Mittel
        '#B117': 45,  // generationenverbund - Mittel
        // Pirsig & Osho - Lebensplanung
        '#B118': 45,  // biologisches_muster - Mittel
        '#B119': 45,  // soziales_muster - Mittel
        '#B120': 60,  // statische_stabilitaet - Mittel
        '#B121': 75,  // qualitaet_der_fuersorge - Hoch
        '#B122': 55,  // familien_rebellion - Mittel
        '#B123': 65,  // zorba_das_kind - Mittel-hoch
        '#B124': 65,  // nicht_anhaften_an_familie - Mittel-hoch
        '#B125': 60,  // bewusste_elternschaft - Mittel
        '#B126': 30,  // commune_statt_kernfamilie - Niedrig

        // ─────────────────────────────────────────────────────────────────────────
        // FINANZEN & KARRIERE (#B127-#B148) - Getrennte Finanzen, eigene Karrieren
        // ─────────────────────────────────────────────────────────────────────────
        '#B127': 90,  // finanzielle_unabhaengigkeit - Sehr hoch - jeder zahlt eigene Wohnung
        '#B128': 25,  // gemeinsame_finanzen - Niedrig - meist getrennt
        '#B129': 70,  // finanzielle_transparenz - Hoch
        '#B130': 75,  // finanzielle_sicherheit - Hoch - eigene Absicherung
        '#B131': 60,  // sparsamkeit - Mittel
        '#B132': 55,  // grosszuegigkeit - Mittel
        '#B133': 80,  // berufliche_erfuellung - Hoch - eigene Karriere
        '#B134': 75,  // karriereambition - Hoch
        '#B135': 80,  // work_life_balance - Hoch - eigener Rhythmus
        '#B136': 75,  // berufliche_anerkennung - Hoch
        '#B137': 60,  // zeit_fuer_beziehung - Mittel-hoch - für die Beziehung
        '#B138': 75,  // berufliche_flexibilitaet - Hoch
        // Pirsig & Osho - Finanzen & Karriere
        '#B139': 75,  // gumption - Hoch
        '#B140': 75,  // qualitaet_der_arbeit - Hoch
        '#B141': 70,  // intellektuelles_muster - Hoch
        '#B142': 70,  // dynamische_evolution - Hoch
        '#B143': 65,  // klassisches_verstehen - Mittel-hoch
        '#B144': 55,  // arbeit_als_meditation - Mittel
        '#B145': 35,  // nicht_karriere - Niedrig
        '#B146': 60,  // zorba_der_unternehmer - Mittel
        '#B147': 50,  // nicht_anhaften_an_geld - Mittel
        '#B148': 75,  // kreative_selbstverwirklichung - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // KOMMUNIKATIONSSTIL (#B149-#B176) - Kommunikation über Distanz essentiell
        // ─────────────────────────────────────────────────────────────────────────
        '#B149': 85,  // taeglicher_austausch - Sehr hoch - wichtig für die Distanz
        '#B150': 80,  // tiefgehende_gespraeche - Hoch - bei Treffen
        '#B151': 60,  // small_talk - Mittel
        '#B152': 75,  // stille_gemeinsam - Hoch - Zeit alleine
        '#B153': 80,  // verbale_verbindung - Hoch
        '#B154': 80,  // zuhoeren - Hoch - bei Treffen präsent
        '#B155': 75,  // emotionale_offenheit - Hoch - wichtig für die Distanz
        '#B156': 70,  // gefuehle_zeigen - Hoch
        '#B157': 70,  // verletzlichkeit - Hoch
        '#B158': 40,  // emotionale_zurueckhaltung - Niedrig-mittel
        '#B159': 75,  // emotionale_sicherheit - Hoch
        '#B160': 75,  // gefuehle_teilen - Hoch
        '#B161': 70,  // konfliktklaerung - Hoch - ansprechen statt schwelen
        '#B162': 75,  // aussprache - Hoch
        '#B163': 50,  // konflikt_vermeiden - Mittel
        '#B164': 65,  // streitkultur - Mittel-hoch
        '#B165': 75,  // versoehnlichkeit - Hoch
        // Pirsig & Osho - Kommunikation
        '#B166': 70,  // romantisches_verstehen - Hoch
        '#B167': 75,  // klassische_klarheit - Hoch
        '#B168': 55,  // dialektik - Mittel
        '#B169': 70,  // qualitaets_ausdruck - Hoch
        '#B170': 75,  // care_im_gespraech - Hoch
        '#B171': 70,  // schweigen_statt_worte - Hoch
        '#B172': 75,  // radikale_ehrlichkeit - Hoch
        '#B173': 70,  // humorvolle_leichtigkeit - Hoch
        '#B174': 40,  // paradoxe_weisheit - Niedrig-mittel
        '#B175': 60,  // herz_statt_kopf - Mittel
        '#B176': 80,  // authentischer_ausdruck - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // SOZIALES LEBEN (#B177-#B203) - Eigene und gemeinsame Kreise
        // ─────────────────────────────────────────────────────────────────────────
        '#B177': 65,  // soziale_energie - Mittel-hoch
        '#B178': 60,  // geselligkeit - Mittel
        '#B179': 70,  // ruhe_von_menschen - Hoch
        '#B180': 80,  // allein_aufladen - Hoch
        '#B181': 60,  // menschen_treffen - Mittel
        '#B182': 65,  // kleine_gruppen - Mittel-hoch
        '#B183': 90,  // zeit_fuer_sich - Sehr hoch - viel Eigenzeit
        '#B184': 85,  // eigene_hobbys - Sehr hoch - eigene Zeit
        '#B185': 65,  // gemeinsame_zeit - Mittel-hoch - qualitativ
        '#B186': 70,  // partnerzeit - Hoch
        '#B187': 85,  // eigene_interessen - Sehr hoch
        '#B188': 80,  // eigene_freunde - Hoch - eigene Freunde wichtig
        '#B189': 65,  // gemeinsame_freunde - Mittel-hoch - auch gemeinsam
        '#B190': 60,  // freundeskreis_teilen - Mittel
        '#B191': 70,  // soziales_netz - Hoch
        '#B192': 70,  // freunde_pflegen - Hoch
        '#B193': 55,  // neue_freundschaften - Mittel
        // Pirsig & Osho - Soziales Leben
        '#B194': 80,  // soziale_qualitaet - Hoch
        '#B195': 55,  // tribe_muster - Mittel
        '#B196': 65,  // intellektuelle_gemeinschaft - Mittel-hoch
        '#B197': 50,  // statische_sozialstrukturen - Mittel
        '#B198': 25,  // sannyas_gemeinschaft - Niedrig
        '#B199': 35,  // rebellion_gegen_gesellschaft - Niedrig-mittel
        '#B200': 60,  // einsamkeit_in_menge - Mittel
        '#B201': 70,  // celebration_mit_anderen - Hoch
        '#B202': 50,  // keine_freundschaft_besitz - Mittel
        '#B203': 25,  // tantra_gruppe - Niedrig

        // ─────────────────────────────────────────────────────────────────────────
        // INTIMITÄT & ROMANTIK (#B204-#B208) - Intensive Nähe bei Treffen
        // ─────────────────────────────────────────────────────────────────────────
        '#B204': 75,  // koerpernaehe - Hoch - wenn zusammen intensiv
        '#B205': 75,  // kuscheln - Hoch - bei Treffen
        '#B206': 40,  // physische_distanz - Niedrig-mittel
        '#B207': 75,  // koerperkontakt - Hoch
        '#B208': 75,  // umarmungen - Hoch
        // NEU: Sexuelle Bedürfnisse für R1-Berechnung
        '#B221': 50,  // sexuelle_experimentierfreude - Mittel - bei Treffen
        '#B222': 80,  // sexuelle_verbindung - Hoch - bei Treffen intensiv

        // ─────────────────────────────────────────────────────────────────────────
        // ERWEITERTE DYNAMIK (#B209-#B220) - Kink/BDSM
        // ─────────────────────────────────────────────────────────────────────────
        '#B209': 35,  // schmerzerleben - Niedrig
        '#B210': 30,  // schmerz_geben - Niedrig
        '#B211': 40,  // bondage_erleben - Niedrig-mittel
        '#B212': 35,  // bondage_geben - Niedrig
        '#B213': 45,  // devotion - Mittel
        '#B214': 40,  // anbetung - Niedrig-mittel
        '#B215': 35,  // demuetig_sein - Niedrig
        '#B216': 40,  // dominieren - Niedrig-mittel
        '#B217': 30,  // bestrafung_erhalten - Niedrig
        '#B218': 30,  // bestrafen - Niedrig
        '#B219': 45,  // service_orientierung - Mittel
        '#B220': 45   // service_empfangen - Mittel
    },

    kernwerte: ["Autonomie", "Qualität", "Vertrauen", "Eigener Raum", "Verbundenheit"],
    vermeidet: ["Zusammenleben", "Alltags-Reibung", "Verschmelzung", "Kontrollverlust"]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = LATProfil;
}
if (typeof window !== 'undefined') {
    window.LATProfil = LATProfil;
}
