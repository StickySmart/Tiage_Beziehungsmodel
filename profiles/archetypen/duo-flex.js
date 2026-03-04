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

        // ═══════════════════════════════════════════════════════════════════
        // KOMMUNIKATIONSSTIL (#B126-#B142) - K14
        // ═══════════════════════════════════════════════════════════════════
        '#B126': 90, // Gesprächstiefe
        '#B127': 85, // Tiefgehende-Gespräche
        '#B128': 55, // Small-Talk
        '#B129': 75, // Stille-gemeinsam
        '#B130': 85, // Verbale-Verbindung
        '#B131': 90, // Zuhören
        '#B132': 80, // Emotionaler-Ausdruck
        '#B133': 80, // Gefühle-zeigen
        '#B134': 80, // Verletzlichkeit
        '#B135': 40, // Emotionale-Zurückhaltung
        '#B136': 85, // Emotionale-Sicherheit
        '#B137': 85, // Gefühle-teilen
        '#B138': 90, // Konfliktverhalten
        '#B139': 90, // Aussprache
        '#B140': 30, // Konflikt-vermeiden
        '#B141': 85, // Streitkultur
        '#B142': 85, // Versöhnlichkeit
        // ═══════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN (#B143-#B159) - K15
        // ═══════════════════════════════════════════════════════════════════
        '#B143': 70, // Soziale-Energie
        '#B144': 75, // Geselligkeit
        '#B145': 55, // Ruhe-von-Menschen
        '#B146': 65, // Allein-aufladen
        '#B147': 75, // Menschen-treffen
        '#B148': 70, // Kleine-Gruppen
        '#B149': 70, // Zeit-für-sich
        '#B150': 75, // Eigene-Hobbys
        '#B151': 75, // Zeit-mit-Anderen
        '#B152': 80, // Partnerzeit
        '#B153': 75, // Eigene-Interessen
        '#B154': 80, // Freundeskreis
        '#B155': 75, // Gemeinsame-Freunde
        '#B156': 70, // Freundeskreis-teilen
        '#B157': 80, // Soziales-Netz
        '#B158': 80, // Freunde-pflegen
        '#B159': 75, // Neue-Freundschaften
        // ═══════════════════════════════════════════════════════════════════
        // INTIMITÄT & ROMANTIK (#B160-#B177) - K16
        // ═══════════════════════════════════════════════════════════════════
        '#B160': 85, // Körperliche-Nähe
        '#B161': 85, // Kuscheln
        '#B162': 40, // Physische-Distanz
        '#B163': 85, // Körperkontakt
        '#B164': 85, // Umarmungen
        '#B165': 75, // Hand-halten
        '#B166': 75, // Romantik
        '#B167': 70, // Überraschungen
        '#B168': 80, // Dates
        '#B169': 70, // Alltags-Romantik
        '#B170': 75, // Aufmerksamkeiten
        '#B171': 75, // Liebesbekundungen
        '#B172': 90, // Sexualität
        '#B173': 85, // Sexuelle-Intimität
        '#B174': 85, // Körperliche-Lust
        '#B175': 90, // Sexuelle-Experimentierfreude
        '#B176': 85, // Sexuelle-Verbindung
        '#B177': 90, // Sexuelle-Zufriedenheit
        // ═══════════════════════════════════════════════════════════════════
        // WERTE & HALTUNGEN (#B178-#B195) - K17
        // ═══════════════════════════════════════════════════════════════════
        '#B178': 60, // Spiritualität
        '#B179': 45, // Glaubenspraxis
        '#B180': 45, // Religiöse-Gemeinschaft
        '#B181': 65, // Säkularität
        '#B182': 75, // Sinnsuche
        '#B183': 60, // Transzendenz
        '#B184': 55, // Tradition-&-Moderne
        '#B185': 75, // Moderne-Lebensweise
        '#B186': 35, // Konservative-Werte
        '#B187': 80, // Progressive-Werte
        '#B188': 50, // Kulturelle-Tradition
        '#B189': 85, // Offenheit-für-Neues
        '#B190': 70, // Umweltbewusstsein
        '#B191': 70, // Nachhaltigkeit
        '#B192': 70, // Ökologisches-Bewusstsein
        '#B193': 60, // Pragmatismus
        '#B194': 70, // Klimaschutz
        '#B195': 65, // Ressourcenschonung
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
        '#B219': 50,  // service_geben - Mittel
        '#B220': 50,  // service_empfangen - Mittel
        '#B225': 55,  // beschuetzt_werden - Mittel
        '#B226': 60, // vertrauen_empfangen - Mittel-hoch

        // ═══════════════════════════════════════════════════════════════════
        // KÖRPERLICHE RESONANZ (#B227) - K16
        // ═══════════════════════════════════════════════════════════════════
        '#B227': 85, // Körperliche-Resonanz

        // ═══════════════════════════════════════════════════════════════════
        // BEZIEHUNGSFORM & LEBENSPLANUNG (#B228-#B240) - K12
        // ═══════════════════════════════════════════════════════════════════
        '#B228': 85, // Beziehungsmodell
        '#B229': 40, // Exklusivität
        '#B230': 60, // Beziehungs-Hierarchie
        '#B231': 50, // Kinderwunsch
        '#B232': 45, // Kinderzeitpunkt
        '#B233': 60, // Erziehungsstil
        '#B234': 70, // Zusammenleben
        '#B235': 70, // Wohnform
        '#B236': 75, // Verbindlichkeit
        '#B237': 45, // Ehe-Wunsch
        '#B238': 70, // Langfristplanung
        '#B239': 50, // Familiengründung
        '#B240': 80, // Patchwork-Offenheit

        // ═══════════════════════════════════════════════════════════════════
        // SPIRITUALITÄT & WELTANSCHAUUNG (#B241-#B253) - K13
        // ═══════════════════════════════════════════════════════════════════
        '#B241': 55, // Spirituelle-Praxis
        '#B242': 65, // Meditation-&-Achtsamkeit
        '#B243': 45, // Religiöse-Übereinstimmung
        '#B244': 80, // Ethische-Grundhaltung
        '#B245': 70, // Moralische-Werte
        '#B246': 75, // Verantwortungsbewusstsein
        '#B247': 60, // Politische-Ausrichtung
        '#B248': 65, // Gesellschaftliches-Engagement
        '#B249': 75, // Lebensphilosophie
        '#B250': 70, // Existenzielle-Fragen
        '#B251': 85, // Wachstums-Orientierung
        '#B252': 70, // Naturverbundenheit
        '#B253': 70 // Nachhaltigkeit-2
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
