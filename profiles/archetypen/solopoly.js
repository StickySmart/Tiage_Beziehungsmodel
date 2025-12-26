/**
 * SOLOPOLY - Der Autonome Liebende
 *
 * Vollständiges Bedürfnis-Profil mit 220 Werten (0-100)
 * Verwendet #ID-System aus beduerfnis-ids.js
 *
 * WISSENSCHAFTLICHE GRUNDLAGEN:
 * ─────────────────────────────────────────────────────────────────────────────
 * - Solo Polyamory Research (Gahran, 2017): Primär-Partner = Selbst
 * - Self-Determination Theory: Höchste Autonomie-Orientierung
 * - Attachment: Secure + High Avoidance (Dismissive-Secure Hybrid)
 * - Relationship Anarchy Light: Keine Hierarchien, aber emotional verbunden
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * CHARAKTERISTIK:
 * - Eigener primärer Partner ist man selbst
 * - Liebesfähig ohne Abhängigkeit
 * - Mehrere bedeutsame Verbindungen möglich
 * - Kein Zusammenwohnen, keine Lebensplanung mit anderen
 */

const SolopolyProfil = {
    id: "solopoly",
    name: "Solopoly",
    beschreibung: "Autonomie als Fundament. Liebesfähig ohne Abhängigkeit. Ich bin mein eigener primärer Partner.",

    quellen: [
        "Solo Polyamory (Gahran, 2017)",
        "Self-Determination Theory (Deci & Ryan, 2000)",
        "CNM Research (Moors et al., 2017)",
        "Singlehood Studies (DePaulo, 2006)"
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
        '#B4': 75,   // bewegung - Hoch - körperliche Autonomie
        '#B5': 60,   // beruehrung - Mittel - dosiert, nicht abhängig
        '#B6': 75,   // erholung - Hoch - Selbstfürsorge
        '#B7': 75,   // sexueller_ausdruck - Hoch - frei, aber nicht zentral
        '#B8': 65,   // sicherheit_physisch - Mittel-hoch - Selbstschutz
        '#B9': 85,   // unterschlupf - Sehr hoch - eigenes Zuhause essentiell

        // ─────────────────────────────────────────────────────────────────────────
        // SICHERHEIT (#B10-#B15) - Innere Sicherheit, wenig externe Abhängigkeit
        // ─────────────────────────────────────────────────────────────────────────
        '#B10': 55,  // bestaendigkeit - Mittel - flexibel
        '#B11': 70,  // sich_sicher_fuehlen - Hoch - in sich selbst
        '#B12': 40,  // schutz - Niedrig-mittel - braucht keinen Beschützer
        '#B13': 60,  // stabilitaet - Mittel - eigene Stabilität
        '#B14': 80,  // leichtigkeit - Hoch - Unbeschwertheit wichtig
        '#B15': 45,  // geborgenheit - Niedrig-mittel - in sich selbst

        // ─────────────────────────────────────────────────────────────────────────
        // ZUNEIGUNG (#B16-#B24) - Liebesfähig aber nicht bedürftig
        // ─────────────────────────────────────────────────────────────────────────
        '#B16': 65,  // waerme - Mittel-hoch - kann geben
        '#B17': 70,  // wertschaetzung - Hoch - gegenseitig
        '#B18': 55,  // naehe - Mittel - dosiert
        '#B19': 65,  // gesellschaft - Mittel-hoch - selektiv
        '#B20': 65,  // intimitaet - Mittel-hoch - situativ
        '#B21': 70,  // liebe - Hoch - aber nicht exklusiv
        '#B22': 60,  // fuersorge - Mittel - gegenseitig
        '#B23': 60,  // unterstuetzung - Mittel - ohne Verpflichtung
        '#B24': 55,  // fuereinander_da_sein - Mittel - aber mit Grenzen

        // ─────────────────────────────────────────────────────────────────────────
        // VERSTÄNDNIS (#B25-#B33)
        // ─────────────────────────────────────────────────────────────────────────
        '#B25': 80,  // akzeptanz - Hoch - Lebensmodell akzeptiert
        '#B26': 65,  // mitgefuehl - Mittel-hoch
        '#B27': 70,  // beruecksichtigung - Hoch
        '#B28': 65,  // empathie - Mittel-hoch
        '#B29': 70,  // vertrauen - Hoch - aber vorsichtig
        '#B30': 65,  // beachtung - Mittel-hoch
        '#B31': 75,  // gesehen_werden - Hoch - als Individuum
        '#B32': 70,  // verstanden_werden - Hoch
        '#B33': 55,  // harmonie - Mittel - kann Konflikte

        // ─────────────────────────────────────────────────────────────────────────
        // FREIHEIT (#B34-#B38) - KERN-KATEGORIE - höchste Werte
        // ─────────────────────────────────────────────────────────────────────────
        '#B34': 95,  // selbstbestimmung - Sehr hoch - Kernwert
        '#B35': 95,  // waehlen_koennen - Sehr hoch - alle Optionen offen
        '#B36': 95,  // unabhaengigkeit - Sehr hoch - emotional & praktisch
        '#B37': 95,  // raum_haben - Sehr hoch - eigener Raum unverhandelbar
        '#B38': 85,  // spontaneitaet - Sehr hoch

        // ─────────────────────────────────────────────────────────────────────────
        // TEILNAHME (#B39-#B45)
        // ─────────────────────────────────────────────────────────────────────────
        '#B39': 60,  // zusammenarbeit - Mittel - situativ
        '#B40': 80,  // kommunikation - Hoch - ehrlich, klar
        '#B41': 65,  // gemeinschaft - Mittel-hoch - Netzwerk wichtig
        '#B42': 55,  // zugehoerigkeit - Mittel - ohne Verpflichtung
        '#B43': 70,  // gegenseitigkeit - Hoch - fair
        '#B44': 85,  // respekt - Sehr hoch - für alle Grenzen
        '#B45': 70,  // bedeutung_haben - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // MUSSE (#B46-#B49)
        // ─────────────────────────────────────────────────────────────────────────
        '#B46': 70,  // schoenheit - Hoch
        '#B47': 90,  // freizeit - Sehr hoch - eigene Zeit wertvoll
        '#B48': 85,  // freude - Sehr hoch
        '#B49': 75,  // humor - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // IDENTITÄT (#B50-#B63)
        // ─────────────────────────────────────────────────────────────────────────
        '#B50': 90,  // authentizitaet - Sehr hoch
        '#B51': 90,  // echtheit - Sehr hoch
        '#B52': 85,  // integritaet - Sehr hoch
        '#B53': 75,  // praesenz - Hoch
        '#B54': 60,  // ordnung - Mittel - eigene Ordnung
        '#B55': 85,  // bewusstheit - Sehr hoch - Selbstreflexion
        '#B56': 75,  // herausforderung - Hoch
        '#B57': 85,  // klarheit - Sehr hoch - klare Grenzen
        '#B58': 85,  // kompetenz - Sehr hoch
        '#B59': 70,  // effizienz - Hoch
        '#B60': 85,  // wirksamkeit - Sehr hoch
        '#B61': 85,  // wachstum - Sehr hoch
        '#B62': 80,  // sinn - Hoch - eigener Sinn
        '#B63': 70,  // beitrag_leisten - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // ERSCHAFFEN (#B64-#B68)
        // ─────────────────────────────────────────────────────────────────────────
        '#B64': 80,  // kreativitaet - Hoch
        '#B65': 85,  // entdecken - Sehr hoch
        '#B66': 80,  // lernen - Hoch
        '#B67': 90,  // selbst_ausdruck - Sehr hoch
        '#B68': 75,  // anreize_bekommen - Hoch

        // ─────────────────────────────────────────────────────────────────────────
        // VERBUNDENHEIT (#B69-#B73)
        // ─────────────────────────────────────────────────────────────────────────
        '#B69': 80,  // leben_feiern - Hoch
        '#B70': 80,  // inspiration - Hoch
        '#B71': 55,  // trauer_ausdruecken - Mittel - privat
        '#B72': 70,  // einsehen - Hoch
        '#B73': 65,  // anfang_ende - Mittel-hoch

        // ─────────────────────────────────────────────────────────────────────────
        // DYNAMIK (#B74-#B88) - Eher autonom, kann beides situativ
        // ─────────────────────────────────────────────────────────────────────────
        '#B74': 60,  // kontrolle_ausueben - Mittel - über eigenes Leben
        '#B75': 40,  // hingabe - Niedrig-mittel - temporär ok
        '#B76': 55,  // fuehrung_geben - Mittel
        '#B77': 35,  // gefuehrt_werden - Niedrig - bevorzugt Autonomie
        '#B78': 50,  // ritual - Mittel - eigene Rituale
        '#B79': 60,  // nachsorge - Mittel - wichtig
        '#B80': 90,  // grenzen_setzen - Sehr hoch - essentiell
        '#B81': 85,  // grenzen_respektieren - Sehr hoch
        '#B82': 65,  // intensitaet - Mittel-hoch - dosiert
        '#B83': 55,  // vertrauen_schenken - Mittel - vorsichtig
        '#B84': 80,  // verantwortung_uebernehmen - Hoch - für sich selbst
        '#B85': 40,  // sich_fallenlassen - Niedrig-mittel
        '#B86': 45,  // machtaustausch - Mittel - situativ
        '#B87': 35,  // dienend_sein - Niedrig
        '#B88': 55,  // beschuetzen - Mittel

        // ─────────────────────────────────────────────────────────────────────────
        // LEBENSPLANUNG (#B90-#B126) - Keine Lebensplanung mit anderen
        // ─────────────────────────────────────────────────────────────────────────
        '#B90': 30,   // kinderwunsch - Niedrig - nicht priorisiert
        '#B91': 25,   // elternschaft - Niedrig - würde Autonomie einschränken
        '#B92': 25,   // fortpflanzung - Niedrig
        '#B93': 15,   // familie_gruenden - Sehr niedrig - nicht das Ziel
        '#B94': 45,   // generativitaet - Mittel - anders ausgelebt
        '#B95': 35,   // verbindlichkeit - Niedrig - keine festen Verpflichtungen
        '#B96': 40,   // langfristige_bindung - Niedrig-mittel - flexibel
        '#B97': 25,   // rechtliche_sicherheit - Niedrig - braucht keine
        '#B98': 30,   // treueversprechen - Niedrig - eigene Definition
        '#B99': 10,   // gemeinsamer_wohnraum - Sehr niedrig - eigenes Zuhause unverhandelbar
        '#B100': 60,  // haeuslichkeit - Mittel-hoch - eigenes Zuhause wichtig
        '#B101': 40,  // nest_bauen - Niedrig-mittel - für sich
        '#B102': 10,  // alltag_teilen - Sehr niedrig - eigener Alltag
        '#B103': 100, // eigener_raum - Maximum - Kernbedürfnis
        '#B104': 100, // rueckzugsort - Maximum - Kernbedürfnis
        '#B105': 45,  // tierliebe - Mittel
        '#B106': 45,  // fuersorge_tiere - Mittel
        '#B107': 50,  // begleiter - Mittel - eventuell Haustier
        '#B108': 45,  // verantwortung_tier - Mittel
        '#B109': 30,  // sesshaftigkeit - Niedrig
        '#B110': 30,  // verwurzelung - Niedrig - nicht verwurzelt
        '#B111': 95,  // mobilitaet - Sehr hoch - flexibel und mobil
        '#B112': 35,  // heimat - Niedrig
        '#B113': 90,  // neue_orte - Sehr hoch - Entdeckungslust
        '#B114': 40,  // familienbindung - Niedrig-mittel - auf Distanz
        '#B115': 35,  // herkunftsfamilie - Niedrig
        '#B116': 35,  // familientreffen - Niedrig
        '#B117': 30,  // generationenverbund - Niedrig
        // Pirsig & Osho - Lebensplanung
        '#B118': 25,  // biologisches_muster - Niedrig
        '#B119': 20,  // soziales_muster - Niedrig - Normen abgelehnt
        '#B120': 30,  // statische_stabilitaet - Niedrig - Flexibilität
        '#B121': 55,  // qualitaet_der_fuersorge - Mittel
        '#B122': 85,  // familien_rebellion - Sehr hoch - gegen Normen
        '#B123': 75,  // zorba_das_kind - Hoch - Lebensfreude
        '#B124': 90,  // nicht_anhaften_an_familie - Sehr hoch
        '#B125': 45,  // bewusste_elternschaft - Mittel
        '#B126': 50,  // commune_statt_kernfamilie - Mittel

        // ─────────────────────────────────────────────────────────────────────────
        // FINANZEN & KARRIERE (#B127-#B148) - Vollständige finanzielle Unabhängigkeit
        // ─────────────────────────────────────────────────────────────────────────
        '#B127': 100, // finanzielle_unabhaengigkeit - Maximum - essentiell
        '#B128': 5,   // gemeinsame_finanzen - Sehr niedrig - niemals
        '#B129': 60,  // finanzielle_transparenz - Mittel
        '#B130': 70,  // finanzielle_sicherheit - Hoch - eigene Absicherung
        '#B131': 55,  // sparsamkeit - Mittel
        '#B132': 50,  // grosszuegigkeit - Mittel
        '#B133': 80,  // berufliche_erfuellung - Hoch - Erfüllung durch Arbeit
        '#B134': 75,  // karriereambition - Hoch - persönlicher Erfolg
        '#B135': 80,  // work_life_balance - Hoch - Zeit für sich
        '#B136': 75,  // berufliche_anerkennung - Hoch
        '#B137': 30,  // zeit_fuer_beziehung - Niedrig - eigene Ziele
        '#B138': 80,  // berufliche_flexibilitaet - Hoch
        // Pirsig & Osho - Finanzen & Karriere
        '#B139': 85,  // gumption - Sehr hoch
        '#B140': 80,  // qualitaet_der_arbeit - Hoch
        '#B141': 75,  // intellektuelles_muster - Hoch
        '#B142': 80,  // dynamische_evolution - Hoch
        '#B143': 65,  // klassisches_verstehen - Mittel-hoch
        '#B144': 70,  // arbeit_als_meditation - Hoch
        '#B145': 40,  // nicht_karriere - Niedrig-mittel
        '#B146': 70,  // zorba_der_unternehmer - Hoch
        '#B147': 65,  // nicht_anhaften_an_geld - Mittel-hoch
        '#B148': 85,  // kreative_selbstverwirklichung - Sehr hoch

        // ─────────────────────────────────────────────────────────────────────────
        // KOMMUNIKATIONSSTIL (#B149-#B176) - Ehrliche, direkte Kommunikation
        // ─────────────────────────────────────────────────────────────────────────
        '#B149': 55,  // taeglicher_austausch - Mittel
        '#B150': 65,  // tiefgehende_gespraeche - Mittel-hoch - mit Ausgewählten
        '#B151': 55,  // small_talk - Mittel
        '#B152': 85,  // stille_gemeinsam - Sehr hoch - allein sein können
        '#B153': 60,  // verbale_verbindung - Mittel
        '#B154': 65,  // zuhoeren - Mittel-hoch
        '#B155': 60,  // emotionale_offenheit - Mittel-hoch - selektiv
        '#B156': 55,  // gefuehle_zeigen - Mittel
        '#B157': 55,  // verletzlichkeit - Mittel
        '#B158': 55,  // emotionale_zurueckhaltung - Mittel
        '#B159': 60,  // emotionale_sicherheit - Mittel
        '#B160': 55,  // gefuehle_teilen - Mittel
        '#B161': 75,  // konfliktklaerung - Hoch - kann Konflikte
        '#B162': 70,  // aussprache - Hoch
        '#B163': 40,  // konflikt_vermeiden - Niedrig-mittel
        '#B164': 70,  // streitkultur - Hoch
        '#B165': 60,  // versoehnlichkeit - Mittel
        // Pirsig & Osho - Kommunikation
        '#B166': 55,  // romantisches_verstehen - Mittel
        '#B167': 75,  // klassische_klarheit - Hoch
        '#B168': 70,  // dialektik - Hoch
        '#B169': 70,  // qualitaets_ausdruck - Hoch
        '#B170': 55,  // care_im_gespraech - Mittel
        '#B171': 80,  // schweigen_statt_worte - Hoch
        '#B172': 85,  // radikale_ehrlichkeit - Sehr hoch
        '#B173': 75,  // humorvolle_leichtigkeit - Hoch
        '#B174': 55,  // paradoxe_weisheit - Mittel
        '#B175': 45,  // herz_statt_kopf - Niedrig-mittel
        '#B176': 90,  // authentischer_ausdruck - Sehr hoch

        // ─────────────────────────────────────────────────────────────────────────
        // SOZIALES LEBEN (#B177-#B203) - Netzwerk statt Partner
        // ─────────────────────────────────────────────────────────────────────────
        '#B177': 55,  // soziale_energie - Mittel
        '#B178': 50,  // geselligkeit - Mittel
        '#B179': 75,  // ruhe_von_menschen - Hoch
        '#B180': 90,  // allein_aufladen - Sehr hoch
        '#B181': 55,  // menschen_treffen - Mittel
        '#B182': 60,  // kleine_gruppen - Mittel
        '#B183': 95,  // zeit_fuer_sich - Sehr hoch - Kernbedürfnis
        '#B184': 95,  // eigene_hobbys - Sehr hoch
        '#B185': 40,  // gemeinsame_zeit - Niedrig-mittel - dosiert
        '#B186': 45,  // partnerzeit - Mittel
        '#B187': 95,  // eigene_interessen - Sehr hoch
        '#B188': 75,  // eigene_freunde - Hoch - Netzwerk wichtig
        '#B189': 40,  // gemeinsame_freunde - Niedrig-mittel - getrennte Kreise ok
        '#B190': 35,  // freundeskreis_teilen - Niedrig
        '#B191': 50,  // soziales_netz - Mittel - Netzwerk statt Partner
        '#B192': 60,  // freunde_pflegen - Mittel
        '#B193': 60,  // neue_freundschaften - Mittel
        // Pirsig & Osho - Soziales Leben
        '#B194': 75,  // soziale_qualitaet - Hoch
        '#B195': 45,  // tribe_muster - Mittel
        '#B196': 80,  // intellektuelle_gemeinschaft - Hoch
        '#B197': 20,  // statische_sozialstrukturen - Niedrig
        '#B198': 50,  // sannyas_gemeinschaft - Mittel - offen
        '#B199': 70,  // rebellion_gegen_gesellschaft - Hoch
        '#B200': 85,  // einsamkeit_in_menge - Sehr hoch
        '#B201': 65,  // celebration_mit_anderen - Mittel-hoch
        '#B202': 80,  // keine_freundschaft_besitz - Hoch
        '#B203': 45,  // tantra_gruppe - Mittel

        // ─────────────────────────────────────────────────────────────────────────
        // INTIMITÄT & ROMANTIK (#B204-#B208) - Liebesfähig ohne Exklusivität
        // ─────────────────────────────────────────────────────────────────────────
        '#B204': 55,  // koerpernaehe - Mittel - dosiert
        '#B205': 50,  // kuscheln - Mittel - nicht so zentral
        '#B206': 60,  // physische_distanz - Mittel - ok mit Distanz
        '#B207': 55,  // koerperkontakt - Mittel
        '#B208': 50,  // umarmungen - Mittel
        // NEU: Sexuelle Bedürfnisse für R1-Berechnung
        '#B221': 85,  // sexuelle_experimentierfreude - Sehr hoch - offen für alles
        '#B222': 60,  // sexuelle_verbindung - Mittel - ohne Bindung

        // ─────────────────────────────────────────────────────────────────────────
        // ERWEITERTE DYNAMIK (#B209-#B220) - Kink/BDSM
        // ─────────────────────────────────────────────────────────────────────────
        '#B209': 40,  // schmerzerleben - Niedrig-mittel
        '#B210': 40,  // schmerz_geben - Niedrig-mittel
        '#B211': 40,  // bondage_erleben - Niedrig-mittel
        '#B224': 50,  // Zucker - Mittel
        '#B212': 45,  // bondage_geben - Mittel
        '#B213': 35,  // devotion - Niedrig
        '#B214': 40,  // anbetung - Niedrig-mittel
        '#B215': 30,  // demuetig_sein - Niedrig
        '#B216': 50,  // dominieren - Mittel
        '#B217': 30,  // bestrafung_erhalten - Niedrig
        '#B218': 35,  // bestrafen - Niedrig
        '#B219': 35,  // service_orientierung - Niedrig
        '#B220': 45   // service_empfangen - Mittel
    },

    kernwerte: ["Autonomie", "Authentizität", "Freiheit", "Selbstliebe", "Ehrlichkeit"],
    vermeidet: ["Abhängigkeit", "Verpflichtung", "Zusammenleben", "Verschmelzung", "Hierarchien"]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SolopolyProfil;
}
if (typeof window !== 'undefined') {
    window.SolopolyProfil = SolopolyProfil;
}
