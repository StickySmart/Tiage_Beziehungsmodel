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
        '#B89': 30,  // kinder_und_elternschaft - Niedrig

        // ─────────────────────────────────────────────────────────────────────────
        // LEBENSPLANUNG (#B89-#B126) - Keine Lebensplanung mit anderen
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

        // ═══════════════════════════════════════════════════════════════════
        // KOMMUNIKATIONSSTIL (#B126-#B142) - K14
        // ═══════════════════════════════════════════════════════════════════
        '#B126': 75, // Gesprächstiefe
        '#B127': 70, // Tiefgehende-Gespräche
        '#B128': 50, // Small-Talk
        '#B129': 65, // Stille-gemeinsam
        '#B130': 65, // Verbale-Verbindung
        '#B131': 80, // Zuhören
        '#B132': 60, // Emotionaler-Ausdruck
        '#B133': 55, // Gefühle-zeigen
        '#B134': 55, // Verletzlichkeit
        '#B135': 60, // Emotionale-Zurückhaltung
        '#B136': 60, // Emotionale-Sicherheit
        '#B137': 60, // Gefühle-teilen
        '#B138': 75, // Konfliktverhalten
        '#B139': 75, // Aussprache
        '#B140': 45, // Konflikt-vermeiden
        '#B141': 70, // Streitkultur
        '#B142': 70, // Versöhnlichkeit
        // ═══════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN (#B143-#B159) - K15
        // ═══════════════════════════════════════════════════════════════════
        '#B143': 75, // Soziale-Energie
        '#B144': 80, // Geselligkeit
        '#B145': 55, // Ruhe-von-Menschen
        '#B146': 80, // Allein-aufladen
        '#B147': 80, // Menschen-treffen
        '#B148': 70, // Kleine-Gruppen
        '#B149': 90, // Zeit-für-sich
        '#B150': 90, // Eigene-Hobbys
        '#B151': 70, // Zeit-mit-Anderen
        '#B152': 55, // Partnerzeit
        '#B153': 95, // Eigene-Interessen
        '#B154': 85, // Freundeskreis
        '#B155': 60, // Gemeinsame-Freunde
        '#B156': 55, // Freundeskreis-teilen
        '#B157': 85, // Soziales-Netz
        '#B158': 85, // Freunde-pflegen
        '#B159': 80, // Neue-Freundschaften
        // ═══════════════════════════════════════════════════════════════════
        // INTIMITÄT & ROMANTIK (#B160-#B177) - K16
        // ═══════════════════════════════════════════════════════════════════
        '#B160': 60, // Körperliche-Nähe
        '#B161': 55, // Kuscheln
        '#B162': 60, // Physische-Distanz
        '#B163': 60, // Körperkontakt
        '#B164': 60, // Umarmungen
        '#B165': 45, // Hand-halten
        '#B166': 45, // Romantik
        '#B167': 50, // Überraschungen
        '#B168': 65, // Dates
        '#B169': 40, // Alltags-Romantik
        '#B170': 50, // Aufmerksamkeiten
        '#B171': 45, // Liebesbekundungen
        '#B172': 80, // Sexualität
        '#B173': 75, // Sexuelle-Intimität
        '#B174': 80, // Körperliche-Lust
        '#B175': 85, // Sexuelle-Experimentierfreude
        '#B176': 70, // Sexuelle-Verbindung
        '#B177': 80, // Sexuelle-Zufriedenheit
        // ═══════════════════════════════════════════════════════════════════
        // WERTE & HALTUNGEN (#B178-#B195) - K17
        // ═══════════════════════════════════════════════════════════════════
        '#B178': 65, // Spiritualität
        '#B179': 45, // Glaubenspraxis
        '#B180': 40, // Religiöse-Gemeinschaft
        '#B181': 70, // Säkularität
        '#B182': 80, // Sinnsuche
        '#B183': 65, // Transzendenz
        '#B184': 50, // Tradition-&-Moderne
        '#B185': 80, // Moderne-Lebensweise
        '#B186': 25, // Konservative-Werte
        '#B187': 85, // Progressive-Werte
        '#B188': 45, // Kulturelle-Tradition
        '#B189': 90, // Offenheit-für-Neues
        '#B190': 75, // Umweltbewusstsein
        '#B191': 75, // Nachhaltigkeit
        '#B192': 75, // Ökologisches-Bewusstsein
        '#B193': 60, // Pragmatismus
        '#B194': 75, // Klimaschutz
        '#B195': 70, // Ressourcenschonung
        // ═══════════════════════════════════════════════════════════════════
        // PRAKTISCHES LEBEN (#B196-#B208) - K18
        // ═══════════════════════════════════════════════════════════════════
        '#B196': 55, // Ordnung-&-Struktur
        '#B197': 60, // Sauberkeit
        '#B198': 50, // Struktur
        '#B199': 65, // Chaos-Toleranz
        '#B200': 55, // Organisiert-sein
        '#B201': 80, // Flexibilität-Haushalt
        '#B202': 85, // Reisen-&-Abenteuer
        '#B203': 85, // Abenteuer
        '#B204': 85, // Neue-Orte-entdecken
        '#B205': 45, // Heimatverbundenheit
        '#B206': 75, // Urlaub
        '#B207': 85, // Fernweh
        '#B208': 45, // Heimatverbundenheit-2
        '#B221': 85,  // sexuelle_experimentierfreude - Sehr hoch - offen für alles
        '#B222': 60,  // sexuelle_verbindung - Mittel - ohne Bindung
        '#B223': 40,  // bondage_erleben - Niedrig-mittel

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
        '#B219': 35,  // service_geben - Niedrig
        '#B220': 45,  // service_empfangen - Mittel
        '#B225': 40,  // beschuetzt_werden - Niedrig-mittel - Autonomie wichtiger
        '#B226': 50, // vertrauen_empfangen - Mittel

        // ═══════════════════════════════════════════════════════════════════
        // KÖRPERLICHE RESONANZ (#B227) - K16
        // ═══════════════════════════════════════════════════════════════════
        '#B227': 70, // Körperliche-Resonanz

        // ═══════════════════════════════════════════════════════════════════
        // BEZIEHUNGSFORM & LEBENSPLANUNG (#B228-#B240) - K12
        // ═══════════════════════════════════════════════════════════════════
        '#B228': 80, // Beziehungsmodell
        '#B229': 20, // Exklusivität
        '#B230': 25, // Beziehungs-Hierarchie
        '#B231': 35, // Kinderwunsch
        '#B232': 30, // Kinderzeitpunkt
        '#B233': 50, // Erziehungsstil
        '#B234': 25, // Zusammenleben
        '#B235': 65, // Wohnform
        '#B236': 50, // Verbindlichkeit
        '#B237': 20, // Ehe-Wunsch
        '#B238': 50, // Langfristplanung
        '#B239': 30, // Familiengründung
        '#B240': 85, // Patchwork-Offenheit

        // ═══════════════════════════════════════════════════════════════════
        // SPIRITUALITÄT & WELTANSCHAUUNG (#B241-#B253) - K13
        // ═══════════════════════════════════════════════════════════════════
        '#B241': 60, // Spirituelle-Praxis
        '#B242': 70, // Meditation-&-Achtsamkeit
        '#B243': 35, // Religiöse-Übereinstimmung
        '#B244': 80, // Ethische-Grundhaltung
        '#B245': 65, // Moralische-Werte
        '#B246': 75, // Verantwortungsbewusstsein
        '#B247': 60, // Politische-Ausrichtung
        '#B248': 70, // Gesellschaftliches-Engagement
        '#B249': 80, // Lebensphilosophie
        '#B250': 75, // Existenzielle-Fragen
        '#B251': 90, // Wachstums-Orientierung
        '#B252': 75, // Naturverbundenheit
        '#B253': 75 // Nachhaltigkeit-2
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
