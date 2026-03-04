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
        '#B89': 50,  // kinder_und_elternschaft - Mittel

        // ─────────────────────────────────────────────────────────────────────────
        // LEBENSPLANUNG (#B89-#B126) - Feste Beziehung, aber getrennt wohnen
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

        // ═══════════════════════════════════════════════════════════════════
        // KOMMUNIKATIONSSTIL (#B126-#B142) - K14
        // ═══════════════════════════════════════════════════════════════════
        '#B126': 75, // Gesprächstiefe
        '#B127': 70, // Tiefgehende-Gespräche
        '#B128': 50, // Small-Talk
        '#B129': 80, // Stille-gemeinsam
        '#B130': 65, // Verbale-Verbindung
        '#B131': 80, // Zuhören
        '#B132': 60, // Emotionaler-Ausdruck
        '#B133': 55, // Gefühle-zeigen
        '#B134': 50, // Verletzlichkeit
        '#B135': 65, // Emotionale-Zurückhaltung
        '#B136': 70, // Emotionale-Sicherheit
        '#B137': 55, // Gefühle-teilen
        '#B138': 70, // Konfliktverhalten
        '#B139': 70, // Aussprache
        '#B140': 50, // Konflikt-vermeiden
        '#B141': 65, // Streitkultur
        '#B142': 70, // Versöhnlichkeit
        // ═══════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN (#B143-#B159) - K15
        // ═══════════════════════════════════════════════════════════════════
        '#B143': 55, // Soziale-Energie
        '#B144': 55, // Geselligkeit
        '#B145': 75, // Ruhe-von-Menschen
        '#B146': 85, // Allein-aufladen
        '#B147': 55, // Menschen-treffen
        '#B148': 65, // Kleine-Gruppen
        '#B149': 90, // Zeit-für-sich
        '#B150': 85, // Eigene-Hobbys
        '#B151': 55, // Zeit-mit-Anderen
        '#B152': 65, // Partnerzeit
        '#B153': 90, // Eigene-Interessen
        '#B154': 75, // Freundeskreis
        '#B155': 50, // Gemeinsame-Freunde
        '#B156': 45, // Freundeskreis-teilen
        '#B157': 65, // Soziales-Netz
        '#B158': 75, // Freunde-pflegen
        '#B159': 60, // Neue-Freundschaften
        // ═══════════════════════════════════════════════════════════════════
        // INTIMITÄT & ROMANTIK (#B160-#B177) - K16
        // ═══════════════════════════════════════════════════════════════════
        '#B160': 65, // Körperliche-Nähe
        '#B161': 60, // Kuscheln
        '#B162': 70, // Physische-Distanz
        '#B163': 60, // Körperkontakt
        '#B164': 65, // Umarmungen
        '#B165': 55, // Hand-halten
        '#B166': 60, // Romantik
        '#B167': 55, // Überraschungen
        '#B168': 70, // Dates
        '#B169': 55, // Alltags-Romantik
        '#B170': 60, // Aufmerksamkeiten
        '#B171': 55, // Liebesbekundungen
        '#B172': 70, // Sexualität
        '#B173': 65, // Sexuelle-Intimität
        '#B174': 70, // Körperliche-Lust
        '#B175': 60, // Sexuelle-Experimentierfreude
        '#B176': 65, // Sexuelle-Verbindung
        '#B177': 75, // Sexuelle-Zufriedenheit
        // ═══════════════════════════════════════════════════════════════════
        // WERTE & HALTUNGEN (#B178-#B195) - K17
        // ═══════════════════════════════════════════════════════════════════
        '#B178': 55, // Spiritualität
        '#B179': 45, // Glaubenspraxis
        '#B180': 40, // Religiöse-Gemeinschaft
        '#B181': 60, // Säkularität
        '#B182': 70, // Sinnsuche
        '#B183': 55, // Transzendenz
        '#B184': 55, // Tradition-&-Moderne
        '#B185': 70, // Moderne-Lebensweise
        '#B186': 45, // Konservative-Werte
        '#B187': 65, // Progressive-Werte
        '#B188': 50, // Kulturelle-Tradition
        '#B189': 70, // Offenheit-für-Neues
        '#B190': 65, // Umweltbewusstsein
        '#B191': 65, // Nachhaltigkeit
        '#B192': 60, // Ökologisches-Bewusstsein
        '#B193': 70, // Pragmatismus
        '#B194': 60, // Klimaschutz
        '#B195': 60, // Ressourcenschonung
        // ═══════════════════════════════════════════════════════════════════
        // PRAKTISCHES LEBEN (#B196-#B208) - K18
        // ═══════════════════════════════════════════════════════════════════
        '#B196': 70, // Ordnung-&-Struktur
        '#B197': 70, // Sauberkeit
        '#B198': 65, // Struktur
        '#B199': 50, // Chaos-Toleranz
        '#B200': 70, // Organisiert-sein
        '#B201': 75, // Flexibilität-Haushalt
        '#B202': 70, // Reisen-&-Abenteuer
        '#B203': 65, // Abenteuer
        '#B204': 70, // Neue-Orte-entdecken
        '#B205': 60, // Heimatverbundenheit
        '#B206': 75, // Urlaub
        '#B207': 70, // Fernweh
        '#B208': 60, // Heimatverbundenheit-2
        '#B221': 50,  // sexuelle_experimentierfreude - Mittel - bei Treffen
        '#B222': 80,  // sexuelle_verbindung - Hoch - bei Treffen intensiv
        '#B223': 40,  // bondage_erleben - Niedrig-mittel

        // ─────────────────────────────────────────────────────────────────────────
        // ERWEITERTE DYNAMIK (#B209-#B220) - Kink/BDSM
        // ─────────────────────────────────────────────────────────────────────────
        '#B209': 35,  // schmerzerleben - Niedrig
        '#B210': 30,  // schmerz_geben - Niedrig
        '#B211': 40,  // bondage_erleben - Niedrig-mittel
        '#B224': 45,  // Zucker - Mittel
        '#B212': 35,  // bondage_geben - Niedrig
        '#B213': 45,  // devotion - Mittel
        '#B214': 40,  // anbetung - Niedrig-mittel
        '#B215': 35,  // demuetig_sein - Niedrig
        '#B216': 40,  // dominieren - Niedrig-mittel
        '#B217': 30,  // bestrafung_erhalten - Niedrig
        '#B218': 30,  // bestrafen - Niedrig
        '#B219': 45,  // service_geben - Mittel
        '#B220': 45,  // service_empfangen - Mittel
        '#B225': 45,  // beschuetzt_werden - Mittel
        '#B226': 55, // vertrauen_empfangen - Mittel

        // ═══════════════════════════════════════════════════════════════════
        // KÖRPERLICHE RESONANZ (#B227) - K16
        // ═══════════════════════════════════════════════════════════════════
        '#B227': 65, // Körperliche-Resonanz

        // ═══════════════════════════════════════════════════════════════════
        // BEZIEHUNGSFORM & LEBENSPLANUNG (#B228-#B240) - K12
        // ═══════════════════════════════════════════════════════════════════
        '#B228': 70, // Beziehungsmodell
        '#B229': 60, // Exklusivität
        '#B230': 50, // Beziehungs-Hierarchie
        '#B231': 40, // Kinderwunsch
        '#B232': 35, // Kinderzeitpunkt
        '#B233': 50, // Erziehungsstil
        '#B234': 20, // Zusammenleben
        '#B235': 75, // Wohnform
        '#B236': 60, // Verbindlichkeit
        '#B237': 35, // Ehe-Wunsch
        '#B238': 60, // Langfristplanung
        '#B239': 40, // Familiengründung
        '#B240': 60, // Patchwork-Offenheit

        // ═══════════════════════════════════════════════════════════════════
        // SPIRITUALITÄT & WELTANSCHAUUNG (#B241-#B253) - K13
        // ═══════════════════════════════════════════════════════════════════
        '#B241': 50, // Spirituelle-Praxis
        '#B242': 60, // Meditation-&-Achtsamkeit
        '#B243': 45, // Religiöse-Übereinstimmung
        '#B244': 75, // Ethische-Grundhaltung
        '#B245': 70, // Moralische-Werte
        '#B246': 75, // Verantwortungsbewusstsein
        '#B247': 55, // Politische-Ausrichtung
        '#B248': 55, // Gesellschaftliches-Engagement
        '#B249': 70, // Lebensphilosophie
        '#B250': 65, // Existenzielle-Fragen
        '#B251': 75, // Wachstums-Orientierung
        '#B252': 65, // Naturverbundenheit
        '#B253': 60 // Nachhaltigkeit-2
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
