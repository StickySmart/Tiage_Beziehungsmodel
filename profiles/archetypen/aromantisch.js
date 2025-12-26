/**
 * AROMANTISCH - Der Romantik-Unabhängige
 *
 * Bedürfnis-Profil mit #ID-basiertem SSOT-System (220 Bedürfnisse)
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
        // EXISTENZ (#B1-#B9)
        // ═══════════════════════════════════════════════════════════════════════
        '#B1': 50,   // luft
        '#B2': 50,   // wasser
        '#B3': 50,   // nahrung
        '#B4': 70,   // bewegung - Hoch
        '#B5': 45,   // beruehrung - Niedrig-mittel - nicht romantisch
        '#B6': 75,   // erholung - Hoch
        '#B7': 40,   // sexueller_ausdruck - Niedrig-mittel - variabel (aro ≠ ace)
        '#B8': 65,   // sicherheit_physisch - Mittel-hoch
        '#B9': 70,   // unterschlupf - Hoch - eigener Raum

        // ═══════════════════════════════════════════════════════════════════════
        // SICHERHEIT (#B10-#B15)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Innere Sicherheit, nicht durch Romantik
        '#B10': 60,  // bestaendigkeit - Mittel - durch Freundschaften
        '#B11': 70,  // sich_sicher_fuehlen - Hoch - in sich selbst
        '#B12': 50,  // schutz - Mittel
        '#B13': 65,  // stabilitaet - Mittel-hoch - eigene Stabilität
        '#B14': 80,  // leichtigkeit - Hoch - frei von romantischem Druck
        '#B15': 50,  // geborgenheit - Mittel - durch Freunde

        // ═══════════════════════════════════════════════════════════════════════
        // ZUNEIGUNG (#B16-#B24)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Platonische Zuneigung, keine romantische
        '#B16': 60,  // waerme - Mittel - platonisch
        '#B17': 70,  // wertschaetzung - Hoch - Freunde wertschätzen
        '#B18': 50,  // naehe - Mittel - emotional, nicht romantisch
        '#B19': 70,  // gesellschaft - Hoch - Freundeskreis wichtig
        '#B20': 35,  // intimitaet - Niedrig - keine romantische Intimität
        '#B21': 30,  // liebe - Niedrig - romantische Liebe nicht gefühlt
        '#B22': 65,  // fuersorge - Mittel-hoch - für Freunde
        '#B23': 70,  // unterstuetzung - Hoch - Freundschaftsnetzwerk
        '#B24': 65,  // fuereinander_da_sein - Mittel-hoch - für Freunde

        // ═══════════════════════════════════════════════════════════════════════
        // VERSTÄNDNIS (#B25-#B33)
        // ═══════════════════════════════════════════════════════════════════════
        '#B25': 85,  // akzeptanz - Sehr hoch - Selbstakzeptanz wichtig
        '#B26': 65,  // mitgefuehl - Mittel-hoch
        '#B27': 70,  // beruecksichtigung - Hoch
        '#B28': 65,  // empathie - Mittel-hoch
        '#B29': 70,  // vertrauen - Hoch - in Freundschaften
        '#B30': 65,  // beachtung - Mittel-hoch
        '#B31': 80,  // gesehen_werden - Hoch - als vollständig ohne Romantik
        '#B32': 85,  // verstanden_werden - Sehr hoch - oft missverstanden
        '#B33': 60,  // harmonie - Mittel

        // ═══════════════════════════════════════════════════════════════════════
        // FREIHEIT (#B34-#B38)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Hohe Autonomie
        '#B34': 90,  // selbstbestimmung - Sehr hoch
        '#B35': 85,  // waehlen_koennen - Sehr hoch - eigenen Weg wählen
        '#B36': 90,  // unabhaengigkeit - Sehr hoch - von romantischen Normen
        '#B37': 85,  // raum_haben - Sehr hoch
        '#B38': 80,  // spontaneitaet - Hoch

        // ═══════════════════════════════════════════════════════════════════════
        // TEILNAHME (#B39-#B45)
        // ═══════════════════════════════════════════════════════════════════════
        '#B39': 65,  // zusammenarbeit - Mittel-hoch
        '#B40': 75,  // kommunikation - Hoch - Identität erklären
        '#B41': 75,  // gemeinschaft - Hoch - Aro/Ace Community
        '#B42': 70,  // zugehoerigkeit - Hoch - zu Freunden, Community
        '#B43': 70,  // gegenseitigkeit - Hoch - in Freundschaften
        '#B44': 85,  // respekt - Sehr hoch - für alle Lebensformen
        '#B45': 75,  // bedeutung_haben - Hoch - durch andere Beiträge

        // ═══════════════════════════════════════════════════════════════════════
        // MUSSE (#B46-#B49)
        // ═══════════════════════════════════════════════════════════════════════
        '#B46': 70,  // schoenheit - Hoch
        '#B47': 85,  // freizeit - Sehr hoch - eigene Zeit
        '#B48': 80,  // freude - Hoch - nicht von Romantik abhängig
        '#B49': 75,  // humor - Hoch

        // ═══════════════════════════════════════════════════════════════════════
        // IDENTITÄT (#B50-#B63)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Starke Selbstidentität
        '#B50': 95,  // authentizitaet - Sehr hoch - eigene Identität leben
        '#B51': 95,  // echtheit - Sehr hoch
        '#B52': 90,  // integritaet - Sehr hoch - zu sich stehen
        '#B53': 75,  // praesenz - Hoch
        '#B54': 65,  // ordnung - Mittel-hoch
        '#B55': 90,  // bewusstheit - Sehr hoch - Selbstreflexion
        '#B56': 70,  // herausforderung - Hoch - Normen hinterfragen
        '#B57': 85,  // klarheit - Sehr hoch - eigene Identität
        '#B58': 80,  // kompetenz - Hoch
        '#B59': 70,  // effizienz - Hoch
        '#B60': 80,  // wirksamkeit - Hoch
        '#B61': 80,  // wachstum - Hoch
        '#B62': 85,  // sinn - Sehr hoch - Sinn jenseits Romantik
        '#B63': 75,  // beitrag_leisten - Hoch

        // ═══════════════════════════════════════════════════════════════════════
        // ERSCHAFFEN (#B64-#B68)
        // ═══════════════════════════════════════════════════════════════════════
        '#B64': 80,  // kreativitaet - Hoch
        '#B65': 80,  // entdecken - Hoch
        '#B66': 80,  // lernen - Hoch
        '#B67': 85,  // selbst_ausdruck - Sehr hoch
        '#B68': 75,  // anreize_bekommen - Hoch

        // ═══════════════════════════════════════════════════════════════════════
        // VERBUNDENHEIT (#B69-#B73)
        // ═══════════════════════════════════════════════════════════════════════
        '#B69': 80,  // leben_feiern - Hoch
        '#B70': 80,  // inspiration - Hoch
        '#B71': 55,  // trauer_ausdruecken - Mittel - individuell
        '#B72': 75,  // einsehen - Hoch
        '#B73': 65,  // anfang_ende - Mittel-hoch

        // ═══════════════════════════════════════════════════════════════════════
        // DYNAMIK (#B74-#B88)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Meist autonom, Dynamik in Freundschaften möglich
        '#B74': 55,  // kontrolle_ausueben - Mittel
        '#B75': 35,  // hingabe - Niedrig - keine romantische Hingabe
        '#B76': 50,  // fuehrung_geben - Mittel
        '#B77': 35,  // gefuehrt_werden - Niedrig
        '#B78': 50,  // ritual - Mittel - Freundschafts-Rituale
        '#B79': 55,  // nachsorge - Mittel
        '#B80': 90,  // grenzen_setzen - Sehr hoch - wichtig
        '#B81': 90,  // grenzen_respektieren - Sehr hoch
        '#B82': 50,  // intensitaet - Mittel - anders als romantisch
        '#B83': 60,  // vertrauen_schenken - Mittel - in Freundschaften
        '#B84': 75,  // verantwortung_uebernehmen - Hoch - für sich selbst
        '#B85': 35,  // sich_fallenlassen - Niedrig
        '#B86': 35,  // machtaustausch - Niedrig
        '#B87': 40,  // dienend_sein - Niedrig-mittel
        '#B88': 55,  // beschuetzen - Mittel

        // ═══════════════════════════════════════════════════════════════════════
        // LEBENSPLANUNG (#B90-#B126)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Kein romantischer Rahmen für Lebensplanung
        '#B90': 30,  // kinderwunsch - Niedrig - nicht durch Partnerschaft
        '#B91': 25,  // elternschaft - Niedrig - selten priorisiert
        '#B92': 20,  // fortpflanzung - Niedrig
        '#B93': 15,  // familie_gruenden - Sehr niedrig - nicht das Ziel
        '#B94': 50,  // generativitaet - Mittel - anders ausgelebt
        '#B95': 30,  // verbindlichkeit - Niedrig - keine romantische Bindung
        '#B96': 35,  // langfristige_bindung - Niedrig - nicht romantisch
        '#B97': 25,  // rechtliche_sicherheit - Niedrig - nicht relevant
        '#B98': 10,  // treueversprechen - Sehr niedrig - keine romantische Exklusivität
        '#B99': 25,  // gemeinsamer_wohnraum - Niedrig - eventuell mit Freunden
        '#B100': 60, // haeuslichkeit - Mittel-hoch - eigenes Zuhause
        '#B101': 40, // nest_bauen - Niedrig-mittel - für sich oder mit Freunden
        '#B102': 30, // alltag_teilen - Niedrig - eventuell mit Freunden
        '#B103': 85, // eigener_raum - Sehr hoch - wichtig
        '#B104': 90, // rueckzugsort - Sehr hoch - wichtig
        '#B105': 50, // tierliebe - Mittel - Haustiere als Begleiter
        '#B106': 50, // fuersorge_tiere - Mittel
        '#B107': 60, // begleiter - Mittel-hoch - Tier als Begleiter
        '#B108': 50, // verantwortung_tier - Mittel
        '#B109': 45, // sesshaftigkeit - Mittel
        '#B110': 50, // verwurzelung - Mittel
        '#B111': 70, // mobilitaet - Hoch - flexibel
        '#B112': 55, // heimat - Mittel - eigenes Zuhause
        '#B113': 70, // neue_orte - Hoch - Entdeckungslust
        '#B114': 40, // familienbindung - Niedrig-mittel - eigene Definition
        '#B115': 35, // herkunftsfamilie - Niedrig - auf Distanz
        '#B116': 35, // familientreffen - Niedrig
        '#B117': 30, // generationenverbund - Niedrig
        '#B118': 20, // biologisches_muster - Niedrig
        '#B119': 20, // soziales_muster - Niedrig - Normen abgelehnt
        '#B120': 45, // statische_stabilitaet - Mittel
        '#B121': 60, // qualitaet_der_fuersorge - Mittel
        '#B122': 80, // familien_rebellion - Hoch
        '#B123': 65, // zorba_das_kind - Mittel-hoch
        '#B124': 85, // nicht_anhaften_an_familie - Sehr hoch
        '#B125': 35, // bewusste_elternschaft - Niedrig
        '#B126': 55, // commune_statt_kernfamilie - Mittel

        // ═══════════════════════════════════════════════════════════════════════
        // FINANZEN & KARRIERE (#B127-#B148)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Vollständige Eigenständigkeit
        '#B127': 95, // finanzielle_unabhaengigkeit - Sehr hoch - essentiell
        '#B128': 10, // gemeinsame_finanzen - Sehr niedrig - nur evtl. mit Freunden
        '#B129': 50, // finanzielle_transparenz - Mittel - für sich relevant
        '#B130': 70, // finanzielle_sicherheit - Hoch - eigene Absicherung
        '#B131': 55, // sparsamkeit - Mittel
        '#B132': 55, // grosszuegigkeit - Mittel - für Freunde
        '#B133': 80, // berufliche_erfuellung - Hoch - Karriere wichtig
        '#B134': 70, // karriereambition - Hoch - persönlicher Erfolg
        '#B135': 80, // work_life_balance - Hoch
        '#B137': 20, // zeit_fuer_beziehung - Niedrig - keine romantische Beziehung
        '#B138': 75, // berufliche_flexibilitaet - Hoch
        '#B136': 75, // berufliche_anerkennung - Hoch
        '#B139': 80, // gumption - Hoch
        '#B140': 80, // qualitaet_der_arbeit - Hoch
        '#B141': 80, // intellektuelles_muster - Hoch
        '#B142': 75, // dynamische_evolution - Hoch
        '#B143': 70, // klassisches_verstehen - Hoch
        '#B144': 65, // arbeit_als_meditation - Mittel-hoch
        '#B145': 35, // nicht_karriere - Niedrig
        '#B146': 65, // zorba_der_unternehmer - Mittel-hoch
        '#B147': 60, // nicht_anhaften_an_geld - Mittel
        '#B148': 85, // kreative_selbstverwirklichung - Sehr hoch

        // ═══════════════════════════════════════════════════════════════════════
        // KOMMUNIKATIONSSTIL (#B149-#B176)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Kommunikation über Identität wichtig
        '#B149': 50, // taeglicher_austausch - Mittel - mit Freunden
        '#B150': 70, // tiefgehende_gespraeche - Hoch - intellektuell/philosophisch
        '#B151': 55, // small_talk - Mittel
        '#B152': 80, // stille_gemeinsam - Hoch - Stille schätzen
        '#B153': 60, // verbale_verbindung - Mittel - mit Freunden
        '#B154': 70, // zuhoeren - Hoch - für Freunde
        '#B155': 55, // emotionale_offenheit - Mittel - mit Freunden
        '#B156': 50, // gefuehle_zeigen - Mittel - selektiv
        '#B157': 45, // verletzlichkeit - Mittel - mit engen Freunden
        '#B158': 60, // emotionale_zurueckhaltung - Mittel-hoch - nicht romantisch
        '#B159': 65, // emotionale_sicherheit - Mittel-hoch - in sich selbst
        '#B160': 50, // gefuehle_teilen - Mittel - mit Freunden
        '#B161': 70, // konfliktklaerung - Hoch - kann Konflikte klären
        '#B162': 65, // aussprache - Mittel-hoch
        '#B163': 45, // konflikt_vermeiden - Mittel
        '#B164': 65, // streitkultur - Mittel-hoch - sachlich
        '#B165': 60, // versoehnlichkeit - Mittel - in Freundschaften
        '#B166': 30, // romantisches_verstehen - Niedrig - nicht romantisch
        '#B167': 80, // klassische_klarheit - Hoch
        '#B168': 75, // dialektik - Hoch
        '#B169': 70, // qualitaets_ausdruck - Hoch
        '#B170': 60, // care_im_gespraech - Mittel
        '#B171': 80, // schweigen_statt_worte - Hoch
        '#B172': 85, // radikale_ehrlichkeit - Sehr hoch
        '#B173': 80, // humorvolle_leichtigkeit - Hoch
        '#B174': 60, // paradoxe_weisheit - Mittel
        '#B175': 35, // herz_statt_kopf - Niedrig - rational
        '#B176': 95, // authentischer_ausdruck - Sehr hoch

        // ═══════════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN (#B177-#B203)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Freundschaften statt romantische Beziehungen
        '#B177': 65, // soziale_energie - Mittel-hoch - für Freunde
        '#B178': 60, // geselligkeit - Mittel - mit Freunden
        '#B179': 70, // ruhe_von_menschen - Hoch - braucht auch Ruhe
        '#B180': 75, // allein_aufladen - Hoch
        '#B181': 60, // menschen_treffen - Mittel - selektiv
        '#B182': 70, // kleine_gruppen - Hoch - bevorzugt
        '#B183': 90, // zeit_fuer_sich - Sehr hoch - Kernbedürfnis
        '#B184': 90, // eigene_hobbys - Sehr hoch - wichtig
        '#B185': 55, // gemeinsame_zeit - Mittel - mit Freunden
        '#B186': 15, // partnerzeit - Sehr niedrig - keine romantische Beziehung
        '#B187': 90, // eigene_interessen - Sehr hoch - Kernbedürfnis
        '#B188': 80, // eigene_freunde - Hoch - Freundeskreis wichtig
        '#B189': 70, // gemeinsame_freunde - Hoch - Freundeskreis
        '#B190': 55, // freundeskreis_teilen - Mittel
        '#B191': 75, // soziales_netz - Hoch - Freundschaftsnetzwerk
        '#B192': 70, // freunde_pflegen - Hoch - wichtig
        '#B193': 60, // neue_freundschaften - Mittel - offen für neue Freunde
        '#B194': 85, // soziale_qualitaet - Sehr hoch - tiefe Freundschaften
        '#B195': 60, // tribe_muster - Mittel - Freundeskreis
        '#B196': 85, // intellektuelle_gemeinschaft - Sehr hoch
        '#B197': 30, // statische_sozialstrukturen - Niedrig
        '#B198': 45, // sannyas_gemeinschaft - Mittel
        '#B199': 75, // rebellion_gegen_gesellschaft - Hoch - gegen Amatonormativität
        '#B200': 75, // einsamkeit_in_menge - Hoch
        '#B201': 70, // celebration_mit_anderen - Hoch
        '#B202': 65, // keine_freundschaft_besitz - Mittel-hoch
        '#B203': 20, // tantra_gruppe - Niedrig

        // ═══════════════════════════════════════════════════════════════════════
        // INTIMITÄT & ROMANTIK (#B204-#B208)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Keine romantische Intimität, platonische Nähe möglich
        '#B204': 35, // koerpernaehe - Niedrig - platonisch ok
        '#B205': 35, // kuscheln - Niedrig - mit Freunden evtl.
        '#B206': 70, // physische_distanz - Hoch - Distanz bevorzugt
        '#B207': 35, // koerperkontakt - Niedrig - platonisch ok
        '#B208': 40, // umarmungen - Niedrig-mittel - mit Freunden
        // NEU: Sexuelle Bedürfnisse für R1-Berechnung
        '#B221': 40, // sexuelle_experimentierfreude - Niedrig-mittel - möglich
        '#B222': 20, // sexuelle_verbindung - Niedrig - keine romantische

        // ═══════════════════════════════════════════════════════════════════════
        // ERWEITERTE DYNAMIK (#B209-#B220) - Kink/BDSM
        // ═══════════════════════════════════════════════════════════════════════
        '#B209': 30, // schmerzerleben - Niedrig
        '#B210': 25, // schmerz_geben - Niedrig
        '#B211': 30, // bondage_erleben - Niedrig
        '#B224': 40, // Zucker - Niedrig-mittel
        '#B212': 30, // bondage_geben - Niedrig
        '#B213': 25, // devotion - Niedrig - keine romantische Hingabe
        '#B214': 20, // anbetung - Niedrig
        '#B215': 25, // demuetig_sein - Niedrig
        '#B216': 35, // dominieren - Niedrig
        '#B217': 20, // bestrafung_erhalten - Niedrig
        '#B218': 20, // bestrafen - Niedrig
        '#B219': 35, // service_orientierung - Niedrig - für Freunde
        '#B220': 35  // service_empfangen - Niedrig
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
