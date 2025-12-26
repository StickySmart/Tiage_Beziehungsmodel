/**
 * DUO-FLEX - Der Flexible Ankernde
 *
 * Vollständiges Bedürfnis-Profil mit 220 Werten (0-100)
 * Verwendet #ID-System aus beduerfnis-ids.js
 *
 * WISSENSCHAFTLICHE GRUNDLAGEN:
 * ─────────────────────────────────────────────────────────────────────────────
 * - Attachment Theory (Main & Hesse): Secure-Autonomous Stil
 * - Optimal Distinctiveness Theory (Brewer, 1991): Balance Zugehörigkeit/Einzigartigkeit
 * - Dialectical Tensions (Baxter & Montgomery): Autonomie-Connection Balance
 * - Differentiation of Self (Bowen, 1978): Hohe Selbstdifferenzierung
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * CHARAKTERISTIK:
 * - Sichere Basis mit flexiblen Grenzen
 * - Balance zwischen Nähe und Autonomie
 * - Kommunikation als Schlüssel
 * - Anpassungsfähig ohne Selbstverlust
 */

const DuoFlexProfil = {
    id: "duo_flex",
    name: "Duo-Flex",
    beschreibung: "Sichere Basis mit Raum für Individualität. Balance zwischen Wir und Ich.",

    quellen: [
        "Secure Attachment (Main & Hesse, 1990)",
        "Optimal Distinctiveness Theory (Brewer, 1991)",
        "Differentiation of Self (Bowen, 1978)",
        "Relational Dialectics (Baxter & Montgomery, 1996)"
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
        '#B4': 65,   // bewegung - Mittel-hoch - eigene & gemeinsame
        '#B5': 75,   // beruehrung - Hoch - aber nicht übermäßig
        '#B6': 70,   // erholung - Hoch
        '#B7': 75,   // sexueller_ausdruck - Hoch - wichtig aber nicht dominant
        '#B8': 65,   // sicherheit_physisch - Mittel-hoch
        '#B9': 70,   // unterschlupf - Hoch - gemeinsames Zuhause

        // ─────────────────────────────────────────────────────────────────────────
        // SICHERHEIT (#B10-#B15) - Sichere Basis, aber flexibel
        // ─────────────────────────────────────────────────────────────────────────
        '#B10': 75,  // bestaendigkeit - Hoch - aber nicht rigide
        '#B11': 80,  // sich_sicher_fuehlen - Hoch - innere + äußere Sicherheit
        '#B12': 65,  // schutz - Mittel-hoch
        '#B13': 75,  // stabilitaet - Hoch - flexible Stabilität
        '#B14': 70,  // leichtigkeit - Hoch - Leichtigkeit wichtig
        '#B15': 75,  // geborgenheit - Hoch - aber nicht abhängig davon

        // ─────────────────────────────────────────────────────────────────────────
        // ZUNEIGUNG (#B16-#B24) - Tiefe Zuneigung mit gesunden Grenzen
        // ─────────────────────────────────────────────────────────────────────────
        '#B16': 80,  // waerme - Hoch
        '#B17': 85,  // wertschaetzung - Sehr hoch - gegenseitig
        '#B18': 80,  // naehe - Hoch - aber nicht verschmelzend
        '#B19': 75,  // gesellschaft - Hoch
        '#B20': 85,  // intimitaet - Sehr hoch
        '#B21': 85,  // liebe - Sehr hoch - reife Liebe
        '#B22': 80,  // fuersorge - Hoch - ausgewogen
        '#B23': 85,  // unterstuetzung - Sehr hoch
        '#B24': 85,  // fuereinander_da_sein - Sehr hoch

        // ─────────────────────────────────────────────────────────────────────────
        // VERSTÄNDNIS (#B25-#B33)
        // ─────────────────────────────────────────────────────────────────────────
        '#B25': 85,  // akzeptanz - Sehr hoch - gegenseitig
        '#B26': 80,  // mitgefuehl - Hoch
        '#B27': 85,  // beruecksichtigung - Sehr hoch
        '#B28': 80,  // empathie - Hoch
        '#B29': 90,  // vertrauen - Sehr hoch - Basis der Flexibilität
        '#B30': 75,  // beachtung - Hoch
        '#B31': 80,  // gesehen_werden - Hoch
        '#B32': 85,  // verstanden_werden - Sehr hoch
        '#B33': 70,  // harmonie - Hoch - aber kann Konflikte aushalten

        // ─────────────────────────────────────────────────────────────────────────
        // FREIHEIT (#B34-#B38) - Moderate Autonomie - Balance
        // ─────────────────────────────────────────────────────────────────────────
        '#B34': 70,  // selbstbestimmung - Hoch - individuelle Entscheidungen ok
        '#B35': 75,  // waehlen_koennen - Hoch - Optionen wichtig
        '#B36': 60,  // unabhaengigkeit - Mittel - verbundene Autonomie
        '#B37': 75,  // raum_haben - Hoch - eigener Raum akzeptiert
        '#B38': 65,  // spontaneitaet - Mittel-hoch

        // ─────────────────────────────────────────────────────────────────────────
        // TEILNAHME (#B39-#B45)
        // ─────────────────────────────────────────────────────────────────────────
        '#B39': 85,  // zusammenarbeit - Sehr hoch
        '#B40': 90,  // kommunikation - Sehr hoch - Schlüssel zur Flexibilität
        '#B41': 70,  // gemeinschaft - Hoch - Paar + Freunde
        '#B42': 80,  // zugehoerigkeit - Hoch - mehrfache Zugehörigkeiten
        '#B43': 85,  // gegenseitigkeit - Sehr hoch
        '#B44': 90,  // respekt - Sehr hoch - für Grenzen
        '#B45': 75,  // bedeutung_haben - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // MUSSE (#B46-#B49)
        // ─────────────────────────────────────────────────────────────────────────
        '#B46': 65,  // schoenheit - Mittel-hoch
        '#B47': 75,  // freizeit - Hoch - alleine & zusammen
        '#B48': 80,  // freude - Hoch
        '#B49': 80,  // humor - Hoch - Leichtigkeit

        // ─────────────────────────────────────────────────────────────────────────
        // IDENTITÄT (#B50-#B63) - Starke individuelle Identität
        // ─────────────────────────────────────────────────────────────────────────
        '#B50': 85,  // authentizitaet - Sehr hoch - bleib du selbst
        '#B51': 85,  // echtheit - Sehr hoch
        '#B52': 85,  // integritaet - Sehr hoch
        '#B53': 75,  // praesenz - Hoch
        '#B54': 65,  // ordnung - Mittel-hoch
        '#B55': 80,  // bewusstheit - Hoch - Selbstreflexion
        '#B56': 65,  // herausforderung - Mittel-hoch
        '#B57': 80,  // klarheit - Hoch - klare Kommunikation
        '#B58': 75,  // kompetenz - Hoch
        '#B59': 65,  // effizienz - Mittel-hoch
        '#B60': 75,  // wirksamkeit - Hoch
        '#B61': 80,  // wachstum - Hoch - individuell & gemeinsam
        '#B62': 80,  // sinn - Hoch
        '#B63': 80,  // beitrag_leisten - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // ERSCHAFFEN (#B64-#B68)
        // ─────────────────────────────────────────────────────────────────────────
        '#B64': 70,  // kreativitaet - Hoch
        '#B65': 75,  // entdecken - Hoch - gemeinsam & alleine
        '#B66': 75,  // lernen - Hoch
        '#B67': 75,  // selbst_ausdruck - Hoch - individuell erlaubt
        '#B68': 65,  // anreize_bekommen - Mittel-hoch

        // ─────────────────────────────────────────────────────────────────────────
        // VERBUNDENHEIT (#B69-#B73)
        // ─────────────────────────────────────────────────────────────────────────
        '#B69': 80,  // leben_feiern - Hoch
        '#B70': 75,  // inspiration - Hoch
        '#B71': 70,  // trauer_ausdruecken - Hoch - gemeinsam verarbeiten
        '#B72': 70,  // einsehen - Hoch
        '#B73': 70,  // anfang_ende - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // DYNAMIK (#B74-#B88) - Ausgewogen, kann beides
        // ─────────────────────────────────────────────────────────────────────────
        '#B74': 55,  // kontrolle_ausueben - Mittel - situativ
        '#B75': 60,  // hingabe - Mittel - kann sich hingeben
        '#B76': 55,  // fuehrung_geben - Mittel - wechselnd
        '#B77': 55,  // gefuehrt_werden - Mittel - wechselnd
        '#B78': 70,  // ritual - Hoch - gemeinsame Rituale
        '#B79': 80,  // nachsorge - Hoch - wichtig
        '#B80': 80,  // grenzen_setzen - Hoch - gesunde Grenzen
        '#B81': 90,  // grenzen_respektieren - Sehr hoch
        '#B82': 70,  // intensitaet - Hoch - dosiert
        '#B83': 85,  // vertrauen_schenken - Sehr hoch
        '#B84': 80,  // verantwortung_uebernehmen - Hoch - geteilte Verantwortung
        '#B85': 65,  // sich_fallenlassen - Mittel-hoch
        '#B86': 55,  // machtaustausch - Mittel - wenn gewünscht
        '#B87': 55,  // dienend_sein - Mittel - gegenseitig
        '#B88': 75,  // beschuetzen - Hoch - gegenseitig
        '#B89': 60,  // kinder_und_elternschaft - Mittel-hoch

        // ─────────────────────────────────────────────────────────────────────────
        // LEBENSPLANUNG (#B89-#B126) - Offen für beides, individuelle Entscheidung
        // ─────────────────────────────────────────────────────────────────────────
        '#B90': 60,   // kinderwunsch - Mittel-hoch - offen
        '#B91': 60,   // elternschaft - Mittel-hoch - wenn gewünscht
        '#B92': 55,   // fortpflanzung - Mittel - nicht zwingend
        '#B93': 55,   // familie_gruenden - Mittel - offen
        '#B94': 65,   // generativitaet - Mittel-hoch
        '#B95': 75,   // verbindlichkeit - Hoch - aber flexibel
        '#B96': 75,   // langfristige_bindung - Hoch - mit Entwicklungsraum
        '#B97': 55,   // rechtliche_sicherheit - Mittel - nicht zwingend
        '#B98': 70,   // treueversprechen - Hoch - offen definiert
        '#B99': 70,   // gemeinsamer_wohnraum - Hoch - aber mit eigenen Bereichen
        '#B100': 65,  // haeuslichkeit - Mittel-hoch - Zuhause wichtig
        '#B101': 65,  // nest_bauen - Mittel-hoch
        '#B102': 70,  // alltag_teilen - Hoch - aber nicht verschmolzen
        '#B103': 80,  // eigener_raum - Hoch - wichtig für Balance
        '#B104': 80,  // rueckzugsort - Hoch - wichtig für Balance
        '#B105': 55,  // tierliebe - Mittel
        '#B106': 55,  // fuersorge_tiere - Mittel
        '#B107': 55,  // begleiter - Mittel
        '#B108': 55,  // verantwortung_tier - Mittel
        '#B109': 55,  // sesshaftigkeit - Mittel
        '#B110': 60,  // verwurzelung - Mittel-hoch
        '#B111': 65,  // mobilitaet - Mittel-hoch - verhandelbar
        '#B112': 60,  // heimat - Mittel-hoch
        '#B113': 70,  // neue_orte - Hoch - offen
        '#B114': 65,  // familienbindung - Mittel-hoch - in Balance
        '#B115': 60,  // herkunftsfamilie - Mittel-hoch
        '#B116': 60,  // familientreffen - Mittel
        '#B117': 55,  // generationenverbund - Mittel
        // Pirsig & Osho - Lebensplanung
        '#B118': 55,  // biologisches_muster - Mittel - offen
        '#B119': 55,  // soziales_muster - Mittel - flexibel
        '#B120': 55,  // statische_stabilitaet - Mittel - Balance
        '#B121': 75,  // qualitaet_der_fuersorge - Hoch - bewusst
        '#B122': 45,  // familien_rebellion - Mittel - offen für beides
        '#B123': 70,  // zorba_das_kind - Hoch - Lebensfreude
        '#B124': 50,  // nicht_anhaften_an_familie - Mittel - Balance
        '#B125': 75,  // bewusste_elternschaft - Hoch - reflektiert
        '#B126': 40,  // commune_statt_kernfamilie - Niedrig-mittel

        // ─────────────────────────────────────────────────────────────────────────
        // FINANZEN & KARRIERE (#B127-#B148) - Geteilte und individuelle Finanzen
        // ─────────────────────────────────────────────────────────────────────────
        '#B127': 70,  // finanzielle_unabhaengigkeit - Hoch - eigenes Einkommen wichtig
        '#B128': 60,  // gemeinsame_finanzen - Mittel - teilweise gemeinsam
        '#B129': 75,  // finanzielle_transparenz - Hoch
        '#B130': 70,  // finanzielle_sicherheit - Hoch - materielle Sicherheit
        '#B131': 55,  // sparsamkeit - Mittel
        '#B132': 65,  // grosszuegigkeit - Mittel-hoch
        '#B133': 75,  // berufliche_erfuellung - Hoch - beide können Karriere machen
        '#B134': 70,  // karriereambition - Hoch
        '#B135': 80,  // work_life_balance - Hoch - wichtig
        '#B136': 70,  // berufliche_anerkennung - Hoch
        '#B137': 75,  // zeit_fuer_beziehung - Hoch
        '#B138': 70,  // berufliche_flexibilitaet - Hoch
        // Pirsig & Osho - Finanzen & Karriere
        '#B139': 75,  // gumption - Hoch - motiviert
        '#B140': 75,  // qualitaet_der_arbeit - Hoch
        '#B141': 65,  // intellektuelles_muster - Mittel-hoch
        '#B142': 70,  // dynamische_evolution - Hoch - Wachstum
        '#B143': 65,  // klassisches_verstehen - Mittel-hoch
        '#B144': 55,  // arbeit_als_meditation - Mittel
        '#B145': 40,  // nicht_karriere - Niedrig-mittel
        '#B146': 60,  // zorba_der_unternehmer - Mittel
        '#B147': 45,  // nicht_anhaften_an_geld - Mittel
        '#B148': 70,  // kreative_selbstverwirklichung - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // KOMMUNIKATIONSSTIL (#B149-#B176) - Offene, tiefe Kommunikation
        // ─────────────────────────────────────────────────────────────────────────
        '#B149': 80,  // taeglicher_austausch - Hoch
        '#B150': 85,  // tiefgehende_gespraeche - Sehr hoch - regelmäßig
        '#B151': 60,  // small_talk - Mittel - auch ok
        '#B152': 70,  // stille_gemeinsam - Hoch - kann auch still sein
        '#B153': 80,  // verbale_verbindung - Hoch
        '#B154': 85,  // zuhoeren - Sehr hoch - aktives Zuhören
        '#B155': 85,  // emotionale_offenheit - Sehr hoch - Kern der Flexibilität
        '#B156': 80,  // gefuehle_zeigen - Hoch
        '#B157': 75,  // verletzlichkeit - Hoch
        '#B158': 35,  // emotionale_zurueckhaltung - Niedrig
        '#B159': 80,  // emotionale_sicherheit - Hoch
        '#B160': 85,  // gefuehle_teilen - Sehr hoch
        '#B161': 80,  // konfliktklaerung - Hoch - Konflikte ansprechen
        '#B162': 80,  // aussprache - Hoch
        '#B163': 40,  // konflikt_vermeiden - Niedrig-mittel - offen
        '#B164': 75,  // streitkultur - Hoch - konstruktiv
        '#B165': 80,  // versoehnlichkeit - Hoch
        // Pirsig & Osho - Kommunikation
        '#B166': 70,  // romantisches_verstehen - Hoch - intuitiv
        '#B167': 75,  // klassische_klarheit - Hoch - klar
        '#B168': 65,  // dialektik - Mittel-hoch
        '#B169': 70,  // qualitaets_ausdruck - Hoch
        '#B170': 80,  // care_im_gespraech - Hoch - achtsam
        '#B171': 65,  // schweigen_statt_worte - Mittel-hoch
        '#B172': 75,  // radikale_ehrlichkeit - Hoch - offen
        '#B173': 75,  // humorvolle_leichtigkeit - Hoch
        '#B174': 45,  // paradoxe_weisheit - Mittel
        '#B175': 60,  // herz_statt_kopf - Mittel - Balance
        '#B176': 80,  // authentischer_ausdruck - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // SOZIALES LEBEN (#B177-#B203) - Eigene und gemeinsame Freunde
        // ─────────────────────────────────────────────────────────────────────────
        '#B177': 70,  // soziale_energie - Hoch
        '#B178': 70,  // geselligkeit - Hoch
        '#B179': 60,  // ruhe_von_menschen - Mittel
        '#B180': 65,  // allein_aufladen - Mittel-hoch
        '#B181': 70,  // menschen_treffen - Hoch
        '#B182': 70,  // kleine_gruppen - Hoch
        '#B183': 80,  // zeit_fuer_sich - Hoch - ebenso wichtig
        '#B184': 80,  // eigene_hobbys - Hoch - wichtig für Identität
        '#B185': 75,  // gemeinsame_zeit - Hoch - qualitativ
        '#B186': 75,  // partnerzeit - Hoch
        '#B187': 80,  // eigene_interessen - Hoch
        '#B188': 80,  // eigene_freunde - Hoch - Freundeskreis pflege
        '#B189': 70,  // gemeinsame_freunde - Hoch - schön aber nicht exklusiv
        '#B190': 70,  // freundeskreis_teilen - Hoch
        '#B191': 75,  // soziales_netz - Hoch
        '#B192': 80,  // freunde_pflegen - Hoch
        '#B193': 65,  // neue_freundschaften - Mittel-hoch
        // Pirsig & Osho - Soziales Leben
        '#B194': 80,  // soziale_qualitaet - Hoch - tiefe Verbindungen
        '#B195': 60,  // tribe_muster - Mittel - flexibel
        '#B196': 65,  // intellektuelle_gemeinschaft - Mittel-hoch
        '#B197': 45,  // statische_sozialstrukturen - Mittel - flexibel
        '#B198': 30,  // sannyas_gemeinschaft - Niedrig
        '#B199': 35,  // rebellion_gegen_gesellschaft - Niedrig-mittel
        '#B200': 50,  // einsamkeit_in_menge - Mittel
        '#B201': 75,  // celebration_mit_anderen - Hoch
        '#B202': 45,  // keine_freundschaft_besitz - Mittel
        '#B203': 30,  // tantra_gruppe - Niedrig

        // ─────────────────────────────────────────────────────────────────────────
        // INTIMITÄT & ROMANTIK (#B204-#B208) - Tiefe Intimität
        // ─────────────────────────────────────────────────────────────────────────
        '#B204': 80,  // koerpernaehe - Hoch - wichtig
        '#B205': 80,  // kuscheln - Hoch
        '#B206': 35,  // physische_distanz - Niedrig - will Nähe
        '#B207': 80,  // koerperkontakt - Hoch
        '#B208': 80,  // umarmungen - Hoch
        // NEU: Sexuelle Bedürfnisse für R1-Berechnung
        '#B221': 70,  // sexuelle_experimentierfreude - Hoch - offen
        '#B222': 75,  // sexuelle_verbindung - Hoch - mit Flexibilität
        '#B223': 40,  // bondage_erleben - Niedrig-mittel

        // ─────────────────────────────────────────────────────────────────────────
        // ERWEITERTE DYNAMIK (#B209-#B220) - Kink/BDSM
        // ─────────────────────────────────────────────────────────────────────────
        '#B209': 35,  // schmerzerleben - Niedrig
        '#B210': 35,  // schmerz_geben - Niedrig
        '#B211': 40,  // bondage_erleben - Niedrig-mittel
        '#B224': 50,  // Zucker - Mittel
        '#B212': 40,  // bondage_geben - Niedrig-mittel
        '#B213': 45,  // devotion - Mittel
        '#B214': 45,  // anbetung - Mittel
        '#B215': 40,  // demuetig_sein - Niedrig-mittel
        '#B216': 45,  // dominieren - Mittel
        '#B217': 30,  // bestrafung_erhalten - Niedrig
        '#B218': 30,  // bestrafen - Niedrig
        '#B219': 50,  // service_orientierung - Mittel
        '#B220': 50   // service_empfangen - Mittel
    },

    kernwerte: ["Kommunikation", "Vertrauen", "Balance", "Authentizität", "Flexibilität"],
    vermeidet: ["Verschmelzung", "Isolation", "Starrheit", "Kontrollverlust"]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = DuoFlexProfil;
}
if (typeof window !== 'undefined') {
    window.DuoFlexProfil = DuoFlexProfil;
}
