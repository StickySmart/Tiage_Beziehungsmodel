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
        '#B89': 30,  // kinder_und_elternschaft - Niedrig

        // ═══════════════════════════════════════════════════════════════════════
        // LEBENSPLANUNG (#B89-#B126)
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

        // ═══════════════════════════════════════════════════════════════════
        // KOMMUNIKATIONSSTIL (#B126-#B142) - K14
        // ═══════════════════════════════════════════════════════════════════
        '#B126': 50, // Gesprächstiefe
        '#B127': 45, // Tiefgehende-Gespräche
        '#B128': 35, // Small-Talk
        '#B129': 85, // Stille-gemeinsam
        '#B130': 35, // Verbale-Verbindung
        '#B131': 65, // Zuhören
        '#B132': 30, // Emotionaler-Ausdruck
        '#B133': 25, // Gefühle-zeigen
        '#B134': 25, // Verletzlichkeit
        '#B135': 80, // Emotionale-Zurückhaltung
        '#B136': 55, // Emotionale-Sicherheit
        '#B137': 25, // Gefühle-teilen
        '#B138': 55, // Konfliktverhalten
        '#B139': 50, // Aussprache
        '#B140': 65, // Konflikt-vermeiden
        '#B141': 45, // Streitkultur
        '#B142': 55, // Versöhnlichkeit
        // ═══════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN (#B143-#B159) - K15
        // ═══════════════════════════════════════════════════════════════════
        '#B143': 35, // Soziale-Energie
        '#B144': 30, // Geselligkeit
        '#B145': 90, // Ruhe-von-Menschen
        '#B146': 95, // Allein-aufladen
        '#B147': 35, // Menschen-treffen
        '#B148': 50, // Kleine-Gruppen
        '#B149': 95, // Zeit-für-sich
        '#B150': 90, // Eigene-Hobbys
        '#B151': 30, // Zeit-mit-Anderen
        '#B152': 20, // Partnerzeit
        '#B153': 95, // Eigene-Interessen
        '#B154': 60, // Freundeskreis
        '#B155': 30, // Gemeinsame-Freunde
        '#B156': 25, // Freundeskreis-teilen
        '#B157': 50, // Soziales-Netz
        '#B158': 60, // Freunde-pflegen
        '#B159': 45, // Neue-Freundschaften
        // ═══════════════════════════════════════════════════════════════════
        // INTIMITÄT & ROMANTIK (#B160-#B177) - K16
        // ═══════════════════════════════════════════════════════════════════
        '#B160': 25, // Körperliche-Nähe
        '#B161': 20, // Kuscheln
        '#B162': 85, // Physische-Distanz
        '#B163': 25, // Körperkontakt
        '#B164': 30, // Umarmungen
        '#B165': 15, // Hand-halten
        '#B166': 10, // Romantik
        '#B167': 20, // Überraschungen
        '#B168': 20, // Dates
        '#B169': 10, // Alltags-Romantik
        '#B170': 25, // Aufmerksamkeiten
        '#B171': 10, // Liebesbekundungen
        '#B172': 40, // Sexualität
        '#B173': 35, // Sexuelle-Intimität
        '#B174': 45, // Körperliche-Lust
        '#B175': 40, // Sexuelle-Experimentierfreude
        '#B176': 30, // Sexuelle-Verbindung
        '#B177': 50, // Sexuelle-Zufriedenheit
        // ═══════════════════════════════════════════════════════════════════
        // WERTE & HALTUNGEN (#B178-#B195) - K17
        // ═══════════════════════════════════════════════════════════════════
        '#B178': 50, // Spiritualität
        '#B179': 40, // Glaubenspraxis
        '#B180': 35, // Religiöse-Gemeinschaft
        '#B181': 65, // Säkularität
        '#B182': 65, // Sinnsuche
        '#B183': 50, // Transzendenz
        '#B184': 50, // Tradition-&-Moderne
        '#B185': 70, // Moderne-Lebensweise
        '#B186': 45, // Konservative-Werte
        '#B187': 65, // Progressive-Werte
        '#B188': 45, // Kulturelle-Tradition
        '#B189': 65, // Offenheit-für-Neues
        '#B190': 60, // Umweltbewusstsein
        '#B191': 60, // Nachhaltigkeit
        '#B192': 55, // Ökologisches-Bewusstsein
        '#B193': 75, // Pragmatismus
        '#B194': 55, // Klimaschutz
        '#B195': 55, // Ressourcenschonung
        // ═══════════════════════════════════════════════════════════════════
        // PRAKTISCHES LEBEN (#B196-#B208) - K18
        // ═══════════════════════════════════════════════════════════════════
        '#B196': 70, // Ordnung-&-Struktur
        '#B197': 70, // Sauberkeit
        '#B198': 65, // Struktur
        '#B199': 50, // Chaos-Toleranz
        '#B200': 70, // Organisiert-sein
        '#B201': 70, // Flexibilität-Haushalt
        '#B202': 65, // Reisen-&-Abenteuer
        '#B203': 60, // Abenteuer
        '#B204': 65, // Neue-Orte-entdecken
        '#B205': 60, // Heimatverbundenheit
        '#B206': 65, // Urlaub
        '#B207': 65, // Fernweh
        '#B208': 60, // Heimatverbundenheit-2
        '#B221': 40, // sexuelle_experimentierfreude - Niedrig-mittel - möglich
        '#B222': 20, // sexuelle_verbindung - Niedrig - keine romantische
        '#B223': 30, // bondage_erleben - Niedrig

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
        '#B219': 35, // service_geben - Niedrig - für Freunde
        '#B220': 35, // service_empfangen - Niedrig
        '#B225': 30, // beschuetzt_werden - Niedrig - Selbstgenügsamkeit
        '#B226': 35, // vertrauen_empfangen - Niedrig - Freundschafts-basiert

        // ═══════════════════════════════════════════════════════════════════
        // KÖRPERLICHE RESONANZ (#B227) - K16
        // ═══════════════════════════════════════════════════════════════════
        '#B227': 35, // Körperliche-Resonanz

        // ═══════════════════════════════════════════════════════════════════
        // BEZIEHUNGSFORM & LEBENSPLANUNG (#B228-#B240) - K12
        // ═══════════════════════════════════════════════════════════════════
        '#B228': 25, // Beziehungsmodell
        '#B229': 30, // Exklusivität
        '#B230': 20, // Beziehungs-Hierarchie
        '#B231': 20, // Kinderwunsch
        '#B232': 15, // Kinderzeitpunkt
        '#B233': 30, // Erziehungsstil
        '#B234': 10, // Zusammenleben
        '#B235': 60, // Wohnform
        '#B236': 20, // Verbindlichkeit
        '#B237': 10, // Ehe-Wunsch
        '#B238': 35, // Langfristplanung
        '#B239': 15, // Familiengründung
        '#B240': 45, // Patchwork-Offenheit

        // ═══════════════════════════════════════════════════════════════════
        // SPIRITUALITÄT & WELTANSCHAUUNG (#B241-#B253) - K13
        // ═══════════════════════════════════════════════════════════════════
        '#B241': 45, // Spirituelle-Praxis
        '#B242': 55, // Meditation-&-Achtsamkeit
        '#B243': 35, // Religiöse-Übereinstimmung
        '#B244': 70, // Ethische-Grundhaltung
        '#B245': 65, // Moralische-Werte
        '#B246': 70, // Verantwortungsbewusstsein
        '#B247': 50, // Politische-Ausrichtung
        '#B248': 45, // Gesellschaftliches-Engagement
        '#B249': 65, // Lebensphilosophie
        '#B250': 60, // Existenzielle-Fragen
        '#B251': 65, // Wachstums-Orientierung
        '#B252': 60, // Naturverbundenheit
        '#B253': 55 // Nachhaltigkeit-2
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
