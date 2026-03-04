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
        '#B89': 35,  // kinder_und_elternschaft - Niedrig-mittel

        // ═══════════════════════════════════════════════════════════════════════
        // LEBENSPLANUNG (#B89-#B126)
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

        // ═══════════════════════════════════════════════════════════════════
        // KOMMUNIKATIONSSTIL (#B126-#B142) - K14
        // ═══════════════════════════════════════════════════════════════════
        '#B126': 80, // Gesprächstiefe
        '#B127': 75, // Tiefgehende-Gespräche
        '#B128': 45, // Small-Talk
        '#B129': 75, // Stille-gemeinsam
        '#B130': 70, // Verbale-Verbindung
        '#B131': 85, // Zuhören
        '#B132': 70, // Emotionaler-Ausdruck
        '#B133': 65, // Gefühle-zeigen
        '#B134': 70, // Verletzlichkeit
        '#B135': 50, // Emotionale-Zurückhaltung
        '#B136': 65, // Emotionale-Sicherheit
        '#B137': 70, // Gefühle-teilen
        '#B138': 80, // Konfliktverhalten
        '#B139': 85, // Aussprache
        '#B140': 35, // Konflikt-vermeiden
        '#B141': 80, // Streitkultur
        '#B142': 75, // Versöhnlichkeit
        // ═══════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN (#B143-#B159) - K15
        // ═══════════════════════════════════════════════════════════════════
        '#B143': 70, // Soziale-Energie
        '#B144': 75, // Geselligkeit
        '#B145': 60, // Ruhe-von-Menschen
        '#B146': 75, // Allein-aufladen
        '#B147': 75, // Menschen-treffen
        '#B148': 65, // Kleine-Gruppen
        '#B149': 85, // Zeit-für-sich
        '#B150': 90, // Eigene-Hobbys
        '#B151': 65, // Zeit-mit-Anderen
        '#B152': 50, // Partnerzeit
        '#B153': 95, // Eigene-Interessen
        '#B154': 80, // Freundeskreis
        '#B155': 55, // Gemeinsame-Freunde
        '#B156': 50, // Freundeskreis-teilen
        '#B157': 75, // Soziales-Netz
        '#B158': 80, // Freunde-pflegen
        '#B159': 80, // Neue-Freundschaften
        // ═══════════════════════════════════════════════════════════════════
        // INTIMITÄT & ROMANTIK (#B160-#B177) - K16
        // ═══════════════════════════════════════════════════════════════════
        '#B160': 60, // Körperliche-Nähe
        '#B161': 55, // Kuscheln
        '#B162': 55, // Physische-Distanz
        '#B163': 60, // Körperkontakt
        '#B164': 60, // Umarmungen
        '#B165': 45, // Hand-halten
        '#B166': 40, // Romantik
        '#B167': 45, // Überraschungen
        '#B168': 55, // Dates
        '#B169': 35, // Alltags-Romantik
        '#B170': 45, // Aufmerksamkeiten
        '#B171': 40, // Liebesbekundungen
        '#B172': 75, // Sexualität
        '#B173': 70, // Sexuelle-Intimität
        '#B174': 75, // Körperliche-Lust
        '#B175': 85, // Sexuelle-Experimentierfreude
        '#B176': 65, // Sexuelle-Verbindung
        '#B177': 80, // Sexuelle-Zufriedenheit
        // ═══════════════════════════════════════════════════════════════════
        // WERTE & HALTUNGEN (#B178-#B195) - K17
        // ═══════════════════════════════════════════════════════════════════
        '#B178': 65, // Spiritualität
        '#B179': 40, // Glaubenspraxis
        '#B180': 35, // Religiöse-Gemeinschaft
        '#B181': 75, // Säkularität
        '#B182': 85, // Sinnsuche
        '#B183': 70, // Transzendenz
        '#B184': 45, // Tradition-&-Moderne
        '#B185': 85, // Moderne-Lebensweise
        '#B186': 20, // Konservative-Werte
        '#B187': 90, // Progressive-Werte
        '#B188': 40, // Kulturelle-Tradition
        '#B189': 95, // Offenheit-für-Neues
        '#B190': 75, // Umweltbewusstsein
        '#B191': 75, // Nachhaltigkeit
        '#B192': 75, // Ökologisches-Bewusstsein
        '#B193': 55, // Pragmatismus
        '#B194': 75, // Klimaschutz
        '#B195': 70, // Ressourcenschonung
        // ═══════════════════════════════════════════════════════════════════
        // PRAKTISCHES LEBEN (#B196-#B208) - K18
        // ═══════════════════════════════════════════════════════════════════
        '#B196': 50, // Ordnung-&-Struktur
        '#B197': 55, // Sauberkeit
        '#B198': 45, // Struktur
        '#B199': 70, // Chaos-Toleranz
        '#B200': 50, // Organisiert-sein
        '#B201': 85, // Flexibilität-Haushalt
        '#B202': 85, // Reisen-&-Abenteuer
        '#B203': 90, // Abenteuer
        '#B204': 85, // Neue-Orte-entdecken
        '#B205': 40, // Heimatverbundenheit
        '#B206': 75, // Urlaub
        '#B207': 85, // Fernweh
        '#B208': 40, // Heimatverbundenheit-2
        '#B221': 75, // sexuelle_experimentierfreude - Hoch - Freiheit im Ausdruck
        '#B222': 60, // sexuelle_verbindung - Mittel - nicht hierarchisiert
        '#B223': 40, // bondage_erleben - Niedrig-mittel

        // ═══════════════════════════════════════════════════════════════════════
        // ERWEITERTE DYNAMIK (#B209-#B220) - Kink/BDSM
        // ═══════════════════════════════════════════════════════════════════════
        '#B209': 40, // schmerzerleben - Niedrig-mittel - individuell
        '#B210': 35, // schmerz_geben - Niedrig
        '#B211': 40, // bondage_erleben - Niedrig-mittel - situativ
        '#B224': 45, // Zucker - Mittel
        '#B212': 40, // bondage_geben - Niedrig-mittel
        '#B213': 30, // devotion - Niedrig - vermeidet Hierarchie
        '#B214': 30, // anbetung - Niedrig - keine Hierarchie
        '#B215': 25, // demuetig_sein - Niedrig - Autonomie wichtiger
        '#B216': 40, // dominieren - Niedrig-mittel - situativ
        '#B217': 25, // bestrafung_erhalten - Niedrig
        '#B218': 25, // bestrafen - Niedrig
        '#B219': 30, // service_geben - Niedrig - freiwillig
        '#B220': 35, // service_empfangen - Niedrig - freiwillig
        '#B225': 35, // beschuetzt_werden - Niedrig - Selbstbestimmung
        '#B226': 45, // vertrauen_empfangen - Mittel

        // ═══════════════════════════════════════════════════════════════════
        // KÖRPERLICHE RESONANZ (#B227) - K16
        // ═══════════════════════════════════════════════════════════════════
        '#B227': 70, // Körperliche-Resonanz

        // ═══════════════════════════════════════════════════════════════════
        // BEZIEHUNGSFORM & LEBENSPLANUNG (#B228-#B240) - K12
        // ═══════════════════════════════════════════════════════════════════
        '#B228': 75, // Beziehungsmodell
        '#B229': 15, // Exklusivität
        '#B230': 15, // Beziehungs-Hierarchie
        '#B231': 30, // Kinderwunsch
        '#B232': 25, // Kinderzeitpunkt
        '#B233': 45, // Erziehungsstil
        '#B234': 20, // Zusammenleben
        '#B235': 55, // Wohnform
        '#B236': 40, // Verbindlichkeit
        '#B237': 10, // Ehe-Wunsch
        '#B238': 40, // Langfristplanung
        '#B239': 25, // Familiengründung
        '#B240': 85, // Patchwork-Offenheit

        // ═══════════════════════════════════════════════════════════════════
        // SPIRITUALITÄT & WELTANSCHAUUNG (#B241-#B253) - K13
        // ═══════════════════════════════════════════════════════════════════
        '#B241': 60, // Spirituelle-Praxis
        '#B242': 75, // Meditation-&-Achtsamkeit
        '#B243': 30, // Religiöse-Übereinstimmung
        '#B244': 85, // Ethische-Grundhaltung
        '#B245': 65, // Moralische-Werte
        '#B246': 75, // Verantwortungsbewusstsein
        '#B247': 65, // Politische-Ausrichtung
        '#B248': 70, // Gesellschaftliches-Engagement
        '#B249': 85, // Lebensphilosophie
        '#B250': 80, // Existenzielle-Fragen
        '#B251': 95, // Wachstums-Orientierung
        '#B252': 75, // Naturverbundenheit
        '#B253': 75 // Nachhaltigkeit-2
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
