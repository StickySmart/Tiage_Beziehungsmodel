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
        '#B98': 10,  // treueversprechen - Sehr niedrig - keine Exklusivität
        '#B99': 25,  // gemeinsamer_wohnraum - Niedrig - kann, muss nicht
        '#B100': 50, // haeuslichkeit - Mittel - eigene Definition
        '#B101': 25, // nest_bauen - Niedrig - keine festen Strukturen
        '#B102': 20, // alltag_teilen - Niedrig - individuelle Alltage
        '#B103': 90, // eigener_raum - Sehr hoch - Autonomie wichtig
        '#B104': 90, // rueckzugsort - Sehr hoch - eigener Raum wichtig
        '#B105': 45, // tierliebe - Mittel
        '#B106': 45, // fuersorge_tiere - Mittel
        '#B107': 50, // begleiter - Mittel
        '#B108': 45, // verantwortung_tier - Mittel
        '#B109': 20, // sesshaftigkeit - Niedrig - Wandel akzeptiert
        '#B110': 25, // verwurzelung - Niedrig - nicht verwurzelt
        '#B111': 90, // mobilitaet - Sehr hoch - maximale Flexibilität
        '#B112': 30, // heimat - Niedrig - nicht ortsgebunden
        '#B113': 85, // neue_orte - Sehr hoch - Entdeckungslust
        '#B114': 30, // familienbindung - Niedrig - eigene Definition
        '#B115': 25, // herkunftsfamilie - Niedrig - Distanz zur Tradition
        '#B116': 25, // familientreffen - Niedrig
        '#B117': 20, // generationenverbund - Niedrig
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
        '#B129': 55, // finanzielle_transparenz - Mittel - situativ
        '#B130': 60, // finanzielle_sicherheit - Mittel - aber nicht materialistisch
        '#B131': 45, // sparsamkeit - Mittel
        '#B132': 55, // grosszuegigkeit - Mittel - freiwillig
        '#B133': 75, // berufliche_erfuellung - Hoch - Sinn wichtiger als Karriere
        '#B134': 55, // karriereambition - Mittel - nicht priorisiert
        '#B135': 80, // work_life_balance - Hoch - Freiheit wichtig
        '#B137': 25, // zeit_fuer_beziehung - Niedrig - alle gleich wichtig
        '#B138': 85, // berufliche_flexibilitaet - Sehr hoch - Flexibilität wichtig
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
        '#B149': 45, // taeglicher_austausch - Mittel - keine Verpflichtung
        '#B150': 70, // tiefgehende_gespraeche - Hoch - philosophisch
        '#B151': 50, // small_talk - Mittel
        '#B152': 80, // stille_gemeinsam - Hoch - Stille schätzen
        '#B153': 60, // verbale_verbindung - Mittel - situativ
        '#B154': 70, // zuhoeren - Hoch - respektvoll
        '#B155': 65, // emotionale_offenheit - Mittel-hoch - authentisch
        '#B156': 55, // gefuehle_zeigen - Mittel - authentisch
        '#B157': 50, // verletzlichkeit - Mittel - situativ
        '#B158': 50, // emotionale_zurueckhaltung - Mittel - Balance
        '#B159': 60, // emotionale_sicherheit - Mittel - in sich selbst
        '#B160': 55, // gefuehle_teilen - Mittel - freiwillig
        '#B161': 70, // konfliktklaerung - Hoch - direkt
        '#B162': 70, // aussprache - Hoch - ehrlich
        '#B163': 35, // konflikt_vermeiden - Niedrig - offen für Konflikt
        '#B164': 75, // streitkultur - Hoch - konstruktiv
        '#B165': 55, // versoehnlichkeit - Mittel - keine Verpflichtung
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
        '#B177': 65, // soziale_energie - Mittel-hoch - Netzwerk wichtig
        '#B178': 60, // geselligkeit - Mittel - in eigenen Begriffen
        '#B179': 70, // ruhe_von_menschen - Hoch - braucht Ruhe
        '#B180': 80, // allein_aufladen - Hoch - Autonomie
        '#B181': 60, // menschen_treffen - Mittel - ohne Verpflichtung
        '#B182': 65, // kleine_gruppen - Mittel-hoch - flexibel
        '#B183': 90, // zeit_fuer_sich - Sehr hoch - essentiell
        '#B184': 90, // eigene_hobbys - Sehr hoch - wichtig
        '#B185': 45, // gemeinsame_zeit - Mittel - freiwillig
        '#B186': 40, // partnerzeit - Niedrig-mittel - alle gleich wichtig
        '#B187': 95, // eigene_interessen - Sehr hoch - Kernbedürfnis
        '#B188': 80, // eigene_freunde - Hoch - keine Trennung Freund/Partner
        '#B189': 55, // gemeinsame_freunde - Mittel - keine Trennung
        '#B190': 50, // freundeskreis_teilen - Mittel - organisch
        '#B191': 70, // soziales_netz - Hoch - Netzwerk statt Hierarchie
        '#B192': 60, // freunde_pflegen - Mittel - ohne Verpflichtung
        '#B193': 65, // neue_freundschaften - Mittel-hoch - offen
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
        '#B205': 45, // kuscheln - Mittel - nicht priorisiert
        '#B206': 55, // physische_distanz - Mittel - situativ
        '#B207': 50, // koerperkontakt - Mittel - situativ
        '#B208': 50, // umarmungen - Mittel - situativ

        // ═══════════════════════════════════════════════════════════════════════
        // ERWEITERTE DYNAMIK (#B209-#B220) - Kink/BDSM
        // ═══════════════════════════════════════════════════════════════════════
        '#B209': 40, // schmerzerleben - Niedrig-mittel - individuell
        '#B210': 35, // schmerz_geben - Niedrig
        '#B211': 40, // bondage_erleben - Niedrig-mittel - situativ
        '#B212': 40, // bondage_geben - Niedrig-mittel
        '#B213': 30, // devotion - Niedrig - vermeidet Hierarchie
        '#B214': 30, // anbetung - Niedrig - keine Hierarchie
        '#B215': 25, // demuetig_sein - Niedrig - Autonomie wichtiger
        '#B216': 40, // dominieren - Niedrig-mittel - situativ
        '#B217': 25, // bestrafung_erhalten - Niedrig
        '#B218': 25, // bestrafen - Niedrig
        '#B219': 30, // service_orientierung - Niedrig - freiwillig
        '#B220': 35  // service_empfangen - Niedrig - freiwillig
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
