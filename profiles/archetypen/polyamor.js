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
        '#B89': 55,  // kinder_und_elternschaft - Mittel

        // ─────────────────────────────────────────────────────────────────────────
        // LEBENSPLANUNG (#B89-#B126) - Offen für verschiedene Konstellationen
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

        // ═══════════════════════════════════════════════════════════════════
        // KOMMUNIKATIONSSTIL (#B126-#B142) - K14
        // ═══════════════════════════════════════════════════════════════════
        '#B126': 85, // Gesprächstiefe
        '#B127': 85, // Tiefgehende-Gespräche
        '#B128': 65, // Small-Talk
        '#B129': 70, // Stille-gemeinsam
        '#B130': 85, // Verbale-Verbindung
        '#B131': 90, // Zuhören
        '#B132': 80, // Emotionaler-Ausdruck
        '#B133': 80, // Gefühle-zeigen
        '#B134': 75, // Verletzlichkeit
        '#B135': 35, // Emotionale-Zurückhaltung
        '#B136': 80, // Emotionale-Sicherheit
        '#B137': 85, // Gefühle-teilen
        '#B138': 85, // Konfliktverhalten
        '#B139': 85, // Aussprache
        '#B140': 35, // Konflikt-vermeiden
        '#B141': 80, // Streitkultur
        '#B142': 85, // Versöhnlichkeit
        // ═══════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN (#B143-#B159) - K15
        // ═══════════════════════════════════════════════════════════════════
        '#B143': 85, // Soziale-Energie
        '#B144': 90, // Geselligkeit
        '#B145': 40, // Ruhe-von-Menschen
        '#B146': 55, // Allein-aufladen
        '#B147': 90, // Menschen-treffen
        '#B148': 75, // Kleine-Gruppen
        '#B149': 65, // Zeit-für-sich
        '#B150': 75, // Eigene-Hobbys
        '#B151': 85, // Zeit-mit-Anderen
        '#B152': 75, // Partnerzeit
        '#B153': 80, // Eigene-Interessen
        '#B154': 90, // Freundeskreis
        '#B155': 80, // Gemeinsame-Freunde
        '#B156': 75, // Freundeskreis-teilen
        '#B157': 90, // Soziales-Netz
        '#B158': 90, // Freunde-pflegen
        '#B159': 85, // Neue-Freundschaften
        // ═══════════════════════════════════════════════════════════════════
        // INTIMITÄT & ROMANTIK (#B160-#B177) - K16
        // ═══════════════════════════════════════════════════════════════════
        '#B160': 80, // Körperliche-Nähe
        '#B161': 80, // Kuscheln
        '#B162': 35, // Physische-Distanz
        '#B163': 80, // Körperkontakt
        '#B164': 80, // Umarmungen
        '#B165': 70, // Hand-halten
        '#B166': 80, // Romantik
        '#B167': 75, // Überraschungen
        '#B168': 80, // Dates
        '#B169': 75, // Alltags-Romantik
        '#B170': 80, // Aufmerksamkeiten
        '#B171': 85, // Liebesbekundungen
        '#B172': 85, // Sexualität
        '#B173': 85, // Sexuelle-Intimität
        '#B174': 85, // Körperliche-Lust
        '#B175': 90, // Sexuelle-Experimentierfreude
        '#B176': 85, // Sexuelle-Verbindung
        '#B177': 85, // Sexuelle-Zufriedenheit
        // ═══════════════════════════════════════════════════════════════════
        // WERTE & HALTUNGEN (#B178-#B195) - K17
        // ═══════════════════════════════════════════════════════════════════
        '#B178': 70, // Spiritualität
        '#B179': 50, // Glaubenspraxis
        '#B180': 50, // Religiöse-Gemeinschaft
        '#B181': 65, // Säkularität
        '#B182': 80, // Sinnsuche
        '#B183': 70, // Transzendenz
        '#B184': 55, // Tradition-&-Moderne
        '#B185': 80, // Moderne-Lebensweise
        '#B186': 25, // Konservative-Werte
        '#B187': 85, // Progressive-Werte
        '#B188': 55, // Kulturelle-Tradition
        '#B189': 90, // Offenheit-für-Neues
        '#B190': 75, // Umweltbewusstsein
        '#B191': 75, // Nachhaltigkeit
        '#B192': 75, // Ökologisches-Bewusstsein
        '#B193': 55, // Pragmatismus
        '#B194': 75, // Klimaschutz
        '#B195': 70, // Ressourcenschonung
        // ═══════════════════════════════════════════════════════════════════
        // PRAKTISCHES LEBEN (#B196-#B208) - K18
        // ═══════════════════════════════════════════════════════════════════
        '#B196': 60, // Ordnung-&-Struktur
        '#B197': 65, // Sauberkeit
        '#B198': 55, // Struktur
        '#B199': 60, // Chaos-Toleranz
        '#B200': 60, // Organisiert-sein
        '#B201': 75, // Flexibilität-Haushalt
        '#B202': 80, // Reisen-&-Abenteuer
        '#B203': 80, // Abenteuer
        '#B204': 80, // Neue-Orte-entdecken
        '#B205': 55, // Heimatverbundenheit
        '#B206': 80, // Urlaub
        '#B207': 75, // Fernweh
        '#B208': 55, // Heimatverbundenheit-2
        '#B221': 80,  // sexuelle_experimentierfreude - Hoch - offen
        '#B222': 85,  // sexuelle_verbindung - Sehr hoch - mit mehreren
        '#B223': 50,  // bondage_erleben - Mittel

        // ─────────────────────────────────────────────────────────────────────────
        // ERWEITERTE DYNAMIK (#B209-#B220) - Kink/BDSM
        // ─────────────────────────────────────────────────────────────────────────
        '#B209': 45,  // schmerzerleben - Mittel
        '#B210': 45,  // schmerz_geben - Mittel
        '#B211': 50,  // bondage_erleben - Mittel
        '#B224': 55,  // Zucker - Mittel
        '#B212': 50,  // bondage_geben - Mittel
        '#B213': 55,  // devotion - Mittel
        '#B214': 50,  // anbetung - Mittel
        '#B215': 45,  // demuetig_sein - Mittel
        '#B216': 50,  // dominieren - Mittel
        '#B217': 40,  // bestrafung_erhalten - Niedrig-mittel
        '#B218': 40,  // bestrafen - Niedrig-mittel
        '#B219': 55,  // service_geben - Mittel
        '#B220': 55,  // service_empfangen - Mittel
        '#B225': 50,  // beschuetzt_werden - Mittel
        '#B226': 60, // vertrauen_empfangen - Mittel-hoch

        // ═══════════════════════════════════════════════════════════════════
        // KÖRPERLICHE RESONANZ (#B227) - K16
        // ═══════════════════════════════════════════════════════════════════
        '#B227': 80, // Körperliche-Resonanz

        // ═══════════════════════════════════════════════════════════════════
        // BEZIEHUNGSFORM & LEBENSPLANUNG (#B228-#B240) - K12
        // ═══════════════════════════════════════════════════════════════════
        '#B228': 90, // Beziehungsmodell
        '#B229': 25, // Exklusivität
        '#B230': 70, // Beziehungs-Hierarchie
        '#B231': 55, // Kinderwunsch
        '#B232': 50, // Kinderzeitpunkt
        '#B233': 65, // Erziehungsstil
        '#B234': 65, // Zusammenleben
        '#B235': 70, // Wohnform
        '#B236': 80, // Verbindlichkeit
        '#B237': 40, // Ehe-Wunsch
        '#B238': 75, // Langfristplanung
        '#B239': 55, // Familiengründung
        '#B240': 90, // Patchwork-Offenheit

        // ═══════════════════════════════════════════════════════════════════
        // SPIRITUALITÄT & WELTANSCHAUUNG (#B241-#B253) - K13
        // ═══════════════════════════════════════════════════════════════════
        '#B241': 65, // Spirituelle-Praxis
        '#B242': 70, // Meditation-&-Achtsamkeit
        '#B243': 45, // Religiöse-Übereinstimmung
        '#B244': 85, // Ethische-Grundhaltung
        '#B245': 70, // Moralische-Werte
        '#B246': 80, // Verantwortungsbewusstsein
        '#B247': 65, // Politische-Ausrichtung
        '#B248': 75, // Gesellschaftliches-Engagement
        '#B249': 80, // Lebensphilosophie
        '#B250': 75, // Existenzielle-Fragen
        '#B251': 90, // Wachstums-Orientierung
        '#B252': 75, // Naturverbundenheit
        '#B253': 75 // Nachhaltigkeit-2
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
