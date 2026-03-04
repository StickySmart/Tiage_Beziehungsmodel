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
        '#B89': 25,  // kinder_und_elternschaft - Niedrig - nicht priorisiert

        // ═══════════════════════════════════════════════════════════════════════
        // LEBENSPLANUNG (#B89-#B126)
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

        // ═══════════════════════════════════════════════════════════════════
        // KOMMUNIKATIONSSTIL (#B126-#B142) - K14
        // ═══════════════════════════════════════════════════════════════════
        '#B126': 55, // Gesprächstiefe
        '#B127': 50, // Tiefgehende-Gespräche
        '#B128': 40, // Small-Talk
        '#B129': 70, // Stille-gemeinsam
        '#B130': 45, // Verbale-Verbindung
        '#B131': 60, // Zuhören
        '#B132': 40, // Emotionaler-Ausdruck
        '#B133': 35, // Gefühle-zeigen
        '#B134': 30, // Verletzlichkeit
        '#B135': 75, // Emotionale-Zurückhaltung
        '#B136': 50, // Emotionale-Sicherheit
        '#B137': 35, // Gefühle-teilen
        '#B138': 50, // Konfliktverhalten
        '#B139': 55, // Aussprache
        '#B140': 60, // Konflikt-vermeiden
        '#B141': 45, // Streitkultur
        '#B142': 55, // Versöhnlichkeit
        // ═══════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN (#B143-#B159) - K15
        // ═══════════════════════════════════════════════════════════════════
        '#B143': 45, // Soziale-Energie
        '#B144': 40, // Geselligkeit
        '#B145': 80, // Ruhe-von-Menschen
        '#B146': 90, // Allein-aufladen
        '#B147': 45, // Menschen-treffen
        '#B148': 55, // Kleine-Gruppen
        '#B149': 95, // Zeit-für-sich
        '#B150': 90, // Eigene-Hobbys
        '#B151': 40, // Zeit-mit-Anderen
        '#B152': 25, // Partnerzeit
        '#B153': 95, // Eigene-Interessen
        '#B154': 65, // Freundeskreis
        '#B155': 35, // Gemeinsame-Freunde
        '#B156': 30, // Freundeskreis-teilen
        '#B157': 55, // Soziales-Netz
        '#B158': 65, // Freunde-pflegen
        '#B159': 50, // Neue-Freundschaften
        // ═══════════════════════════════════════════════════════════════════
        // INTIMITÄT & ROMANTIK (#B160-#B177) - K16
        // ═══════════════════════════════════════════════════════════════════
        '#B160': 35, // Körperliche-Nähe
        '#B161': 30, // Kuscheln
        '#B162': 80, // Physische-Distanz
        '#B163': 35, // Körperkontakt
        '#B164': 40, // Umarmungen
        '#B165': 25, // Hand-halten
        '#B166': 20, // Romantik
        '#B167': 25, // Überraschungen
        '#B168': 30, // Dates
        '#B169': 20, // Alltags-Romantik
        '#B170': 30, // Aufmerksamkeiten
        '#B171': 20, // Liebesbekundungen
        '#B172': 55, // Sexualität
        '#B173': 50, // Sexuelle-Intimität
        '#B174': 55, // Körperliche-Lust
        '#B175': 50, // Sexuelle-Experimentierfreude
        '#B176': 45, // Sexuelle-Verbindung
        '#B177': 60, // Sexuelle-Zufriedenheit
        // ═══════════════════════════════════════════════════════════════════
        // WERTE & HALTUNGEN (#B178-#B195) - K17
        // ═══════════════════════════════════════════════════════════════════
        '#B178': 50, // Spiritualität
        '#B179': 40, // Glaubenspraxis
        '#B180': 35, // Religiöse-Gemeinschaft
        '#B181': 60, // Säkularität
        '#B182': 65, // Sinnsuche
        '#B183': 50, // Transzendenz
        '#B184': 50, // Tradition-&-Moderne
        '#B185': 65, // Moderne-Lebensweise
        '#B186': 40, // Konservative-Werte
        '#B187': 60, // Progressive-Werte
        '#B188': 45, // Kulturelle-Tradition
        '#B189': 65, // Offenheit-für-Neues
        '#B190': 60, // Umweltbewusstsein
        '#B191': 60, // Nachhaltigkeit
        '#B192': 55, // Ökologisches-Bewusstsein
        '#B193': 70, // Pragmatismus
        '#B194': 55, // Klimaschutz
        '#B195': 55, // Ressourcenschonung
        // ═══════════════════════════════════════════════════════════════════
        // PRAKTISCHES LEBEN (#B196-#B208) - K18
        // ═══════════════════════════════════════════════════════════════════
        '#B196': 65, // Ordnung-&-Struktur
        '#B197': 65, // Sauberkeit
        '#B198': 60, // Struktur
        '#B199': 50, // Chaos-Toleranz
        '#B200': 65, // Organisiert-sein
        '#B201': 70, // Flexibilität-Haushalt
        '#B202': 70, // Reisen-&-Abenteuer
        '#B203': 65, // Abenteuer
        '#B204': 70, // Neue-Orte-entdecken
        '#B205': 55, // Heimatverbundenheit
        '#B206': 70, // Urlaub
        '#B207': 70, // Fernweh
        '#B208': 55, // Heimatverbundenheit-2
        '#B221': 50, // sexuelle_experimentierfreude - Mittel - offen für Neues
        '#B222': 30, // sexuelle_verbindung - Niedrig - keine Bindung
        '#B223': 35, // bondage_erleben - Niedrig

        // ═══════════════════════════════════════════════════════════════════════
        // ERWEITERTE DYNAMIK (#B209-#B220) - Kink/BDSM
        // ═══════════════════════════════════════════════════════════════════════
        '#B209': 35, // schmerzerleben - Niedrig
        '#B210': 30, // schmerz_geben - Niedrig
        '#B211': 35, // bondage_erleben - Niedrig
        '#B224': 45, // Zucker - Mittel
        '#B212': 35, // bondage_geben - Niedrig
        '#B213': 25, // devotion - Niedrig - vermeidet Hingabe
        '#B214': 30, // anbetung - Niedrig
        '#B215': 20, // demuetig_sein - Niedrig - Autonomie wichtiger
        '#B216': 45, // dominieren - Mittel - über eigenes Leben
        '#B217': 20, // bestrafung_erhalten - Niedrig
        '#B218': 25, // bestrafen - Niedrig
        '#B219': 25, // service_geben - Niedrig - nicht dienend
        '#B220': 40, // service_empfangen - Niedrig-mittel
        '#B225': 35, // beschuetzt_werden - Niedrig - Selbstschutz bevorzugt
        '#B226': 40, // vertrauen_empfangen - Niedrig-mittel

        // ═══════════════════════════════════════════════════════════════════
        // KÖRPERLICHE RESONANZ (#B227) - K16
        // ═══════════════════════════════════════════════════════════════════
        '#B227': 45, // Körperliche-Resonanz

        // ═══════════════════════════════════════════════════════════════════
        // BEZIEHUNGSFORM & LEBENSPLANUNG (#B228-#B240) - K12
        // ═══════════════════════════════════════════════════════════════════
        '#B228': 30, // Beziehungsmodell
        '#B229': 25, // Exklusivität
        '#B230': 20, // Beziehungs-Hierarchie
        '#B231': 25, // Kinderwunsch
        '#B232': 20, // Kinderzeitpunkt
        '#B233': 30, // Erziehungsstil
        '#B234': 15, // Zusammenleben
        '#B235': 60, // Wohnform
        '#B236': 25, // Verbindlichkeit
        '#B237': 15, // Ehe-Wunsch
        '#B238': 40, // Langfristplanung
        '#B239': 20, // Familiengründung
        '#B240': 40, // Patchwork-Offenheit

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
        '#B248': 50, // Gesellschaftliches-Engagement
        '#B249': 65, // Lebensphilosophie
        '#B250': 60, // Existenzielle-Fragen
        '#B251': 70, // Wachstums-Orientierung
        '#B252': 60, // Naturverbundenheit
        '#B253': 55 // Nachhaltigkeit-2
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
