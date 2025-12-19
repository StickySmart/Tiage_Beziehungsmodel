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
        '#B98': 15,  // treueversprechen - Sehr niedrig - keine Exklusivität gewünscht
        '#B99': 15,  // gemeinsamer_wohnraum - Sehr niedrig - eigener Raum essentiell
        '#B100': 50, // haeuslichkeit - Mittel - eigenes Zuhause wichtig
        '#B101': 30, // nest_bauen - Niedrig - für sich selbst
        '#B102': 10, // alltag_teilen - Sehr niedrig - eigener Alltag
        '#B103': 95, // eigener_raum - Sehr hoch - Kernbedürfnis
        '#B104': 95, // rueckzugsort - Sehr hoch - Kernbedürfnis
        '#B105': 45, // tierliebe - Mittel - Haustier als Begleiter möglich
        '#B106': 45, // fuersorge_tiere - Mittel
        '#B107': 55, // begleiter - Mittel - Tier als unabhängiger Begleiter
        '#B108': 50, // verantwortung_tier - Mittel
        '#B109': 30, // sesshaftigkeit - Niedrig - Flexibilität bevorzugt
        '#B110': 35, // verwurzelung - Niedrig - nicht verwurzelt
        '#B111': 85, // mobilitaet - Sehr hoch - flexibel und mobil
        '#B112': 40, // heimat - Niedrig-mittel - nicht ortsgebunden
        '#B113': 80, // neue_orte - Hoch - Entdeckungslust
        '#B114': 35, // familienbindung - Niedrig - auf Distanz
        '#B115': 30, // herkunftsfamilie - Niedrig
        '#B116': 30, // familientreffen - Niedrig
        '#B117': 25, // generationenverbund - Niedrig
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
        '#B129': 50, // finanzielle_transparenz - Mittel - nur für sich relevant
        '#B130': 70, // finanzielle_sicherheit - Hoch - eigene Absicherung
        '#B131': 55, // sparsamkeit - Mittel - für eigene Ziele
        '#B132': 45, // grosszuegigkeit - Mittel - selektiv
        '#B133': 85, // berufliche_erfuellung - Sehr hoch - Karriere wichtig
        '#B134': 80, // karriereambition - Hoch - persönlicher Erfolg
        '#B135': 75, // work_life_balance - Hoch - Balance für sich
        '#B137': 15, // zeit_fuer_beziehung - Sehr niedrig - eigene Zeit
        '#B138': 80, // berufliche_flexibilitaet - Hoch - Flexibilität wichtig
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
        '#B149': 35, // taeglicher_austausch - Niedrig - kein Bedürfnis nach täglichem Kontakt
        '#B150': 55, // tiefgehende_gespraeche - Mittel - mit Ausgewählten
        '#B151': 60, // small_talk - Mittel - oberflächlich ok
        '#B152': 85, // stille_gemeinsam - Sehr hoch - Stille schätzen
        '#B153': 50, // verbale_verbindung - Mittel - nicht zentral
        '#B154': 60, // zuhoeren - Mittel - kann zuhören
        '#B155': 40, // emotionale_offenheit - Niedrig-mittel - selektiv offen
        '#B156': 40, // gefuehle_zeigen - Niedrig-mittel - zurückhaltend
        '#B157': 35, // verletzlichkeit - Niedrig - vermeidet Verletzlichkeit
        '#B158': 70, // emotionale_zurueckhaltung - Hoch - bevorzugt Distanz
        '#B159': 55, // emotionale_sicherheit - Mittel - innere Sicherheit
        '#B160': 40, // gefuehle_teilen - Niedrig-mittel - selektiv
        '#B161': 65, // konfliktklaerung - Mittel-hoch - kann Konflikte klären
        '#B162': 60, // aussprache - Mittel - wenn nötig
        '#B163': 45, // konflikt_vermeiden - Mittel - kann Konflikte aushalten
        '#B164': 65, // streitkultur - Mittel-hoch - sachlich
        '#B165': 50, // versoehnlichkeit - Mittel
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
        '#B177': 55, // soziale_energie - Mittel - selektiv sozial
        '#B178': 50, // geselligkeit - Mittel - in kleinen Dosen
        '#B179': 80, // ruhe_von_menschen - Hoch - braucht Ruhe
        '#B180': 90, // allein_aufladen - Sehr hoch - introvertiert
        '#B181': 50, // menschen_treffen - Mittel - selektiv
        '#B182': 55, // kleine_gruppen - Mittel - bevorzugt
        '#B183': 95, // zeit_fuer_sich - Sehr hoch - Kernbedürfnis
        '#B184': 95, // eigene_hobbys - Sehr hoch - Kernbedürfnis
        '#B185': 25, // gemeinsame_zeit - Niedrig - Zeit für sich
        '#B186': 20, // partnerzeit - Niedrig - keine Priorität
        '#B187': 95, // eigene_interessen - Sehr hoch - Kernbedürfnis
        '#B188': 70, // eigene_freunde - Hoch - eigenes Netzwerk
        '#B189': 35, // gemeinsame_freunde - Niedrig - eigene Freunde
        '#B190': 30, // freundeskreis_teilen - Niedrig - getrennte Kreise
        '#B191': 60, // soziales_netz - Mittel - loses Netzwerk
        '#B192': 55, // freunde_pflegen - Mittel - selektiv
        '#B193': 50, // neue_freundschaften - Mittel - offen aber selektiv
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
        '#B205': 35, // kuscheln - Niedrig - nicht so wichtig
        '#B206': 70, // physische_distanz - Hoch - Distanz bevorzugt
        '#B207': 40, // koerperkontakt - Niedrig-mittel - dosiert
        '#B208': 40, // umarmungen - Niedrig-mittel - selektiv
        // NEU: Sexuelle Bedürfnisse für R1-Berechnung
        '#B221': 50, // sexuelle_experimentierfreude - Mittel - offen für Neues
        '#B222': 30, // sexuelle_verbindung - Niedrig - keine Bindung

        // ═══════════════════════════════════════════════════════════════════════
        // ERWEITERTE DYNAMIK (#B209-#B220) - Kink/BDSM
        // ═══════════════════════════════════════════════════════════════════════
        '#B209': 35, // schmerzerleben - Niedrig
        '#B210': 30, // schmerz_geben - Niedrig
        '#B211': 35, // bondage_erleben - Niedrig
        '#B212': 35, // bondage_geben - Niedrig
        '#B213': 25, // devotion - Niedrig - vermeidet Hingabe
        '#B214': 30, // anbetung - Niedrig
        '#B215': 20, // demuetig_sein - Niedrig - Autonomie wichtiger
        '#B216': 45, // dominieren - Mittel - über eigenes Leben
        '#B217': 20, // bestrafung_erhalten - Niedrig
        '#B218': 25, // bestrafen - Niedrig
        '#B219': 25, // service_orientierung - Niedrig - nicht dienend
        '#B220': 40  // service_empfangen - Niedrig-mittel
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
