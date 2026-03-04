/**
 * DUO - Der Verschmelzende
 *
 * Vollständiges Bedürfnis-Profil mit 220 Werten (0-100)
 * Verwendet #ID-System aus beduerfnis-ids.js
 *
 * WISSENSCHAFTLICHE GRUNDLAGEN:
 * ─────────────────────────────────────────────────────────────────────────────
 * - Attachment Theory (Hazan & Shaver, 1987): Secure/Anxious-Preoccupied Stil
 * - Interdependence Theory (Kelley & Thibaut, 1978): Hohe Interdependenz
 * - Sternberg's Triangular Theory: Intimacy + Commitment dominant
 * - Self-Expansion Theory (Aron & Aron, 1986): Partner als Teil des Selbst
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * CHARAKTERISTIK:
 * - Tiefe Verschmelzung und exklusive Bindung
 * - Sicherheit und Stabilität priorisiert
 * - "Zwei werden eins" - Identität verschmilzt mit Partner
 * - Hohe emotionale Investition
 */

const DuoProfil = {
    id: "duo",
    name: "Duo",
    beschreibung: "Tiefe Verschmelzung, Sicherheit und exklusive Bindung. Zwei werden eins.",

    quellen: [
        "Attachment Theory - Secure/Anxious (Hazan & Shaver, 1987)",
        "Interdependence Theory (Kelley & Thibaut, 1978)",
        "Self-Expansion Model (Aron & Aron, 1986)",
        "Sternberg's Triangular Theory of Love (1986)"
    ],

    // ═══════════════════════════════════════════════════════════════════════════
    // BEDÜRFNISSE MIT #IDs (220 Werte)
    // ═══════════════════════════════════════════════════════════════════════════

    beduerfnisse: {

        // ─────────────────────────────────────────────────────────────────────────
        // EXISTENZ (#B1-#B9) - Grundlegende physische Bedürfnisse
        // ─────────────────────────────────────────────────────────────────────────
        '#B1': 50,   // luft - Universal, neutral
        '#B2': 50,   // wasser - Universal, neutral
        '#B3': 55,   // nahrung - Leicht erhöht - gemeinsame Mahlzeiten
        '#B4': 55,   // bewegung - Mittel - gemeinsame Aktivitäten
        '#B5': 90,   // beruehrung - Sehr hoch - körperliche Nähe essentiell
        '#B6': 75,   // erholung - Hoch - gemeinsame Ruhezeiten
        '#B7': 80,   // sexueller_ausdruck - Hoch - Intimität als Bindung
        '#B8': 75,   // sicherheit_physisch - Hoch - gegenseitiger Schutz
        '#B9': 80,   // unterschlupf - Hoch - gemeinsames Zuhause wichtig

        // ─────────────────────────────────────────────────────────────────────────
        // SICHERHEIT (#B10-#B15) - Emotionale und psychische Sicherheit
        // KERN-KATEGORIE - Sicherheit durch Beziehung
        // ─────────────────────────────────────────────────────────────────────────
        '#B10': 90,  // bestaendigkeit - Sehr hoch - Verlässlichkeit wichtig
        '#B11': 95,  // sich_sicher_fuehlen - Sehr hoch - Kernbedürfnis
        '#B12': 85,  // schutz - Sehr hoch - beschützt werden wollen
        '#B13': 95,  // stabilitaet - Sehr hoch - Beziehung als Anker
        '#B14': 60,  // leichtigkeit - Mittel - Sicherheit > Leichtigkeit
        '#B15': 95,  // geborgenheit - Sehr hoch - emotionale Heimat

        // ─────────────────────────────────────────────────────────────────────────
        // ZUNEIGUNG (#B16-#B24) - Liebe, Nähe und emotionale Verbindung
        // KERN-KATEGORIE - höchste Werte
        // ─────────────────────────────────────────────────────────────────────────
        '#B16': 90,  // waerme - Sehr hoch - emotionale Wärme
        '#B17': 85,  // wertschaetzung - Sehr hoch - gegenseitige Wertschätzung
        '#B18': 95,  // naehe - Sehr hoch - maximale Nähe gewünscht
        '#B19': 85,  // gesellschaft - Sehr hoch - gemeinsam sein
        '#B20': 95,  // intimitaet - Sehr hoch - tiefe Verbindung
        '#B21': 95,  // liebe - Sehr hoch - Kern des Lebens
        '#B22': 90,  // fuersorge - Sehr hoch - für Partner sorgen
        '#B23': 90,  // unterstuetzung - Sehr hoch - gegenseitige Stütze
        '#B24': 95,  // fuereinander_da_sein - Sehr hoch - Priorität

        // ─────────────────────────────────────────────────────────────────────────
        // VERSTÄNDNIS (#B25-#B33) - Gesehen und verstanden werden
        // ─────────────────────────────────────────────────────────────────────────
        '#B25': 90,  // akzeptanz - Sehr hoch - bedingungslose Akzeptanz
        '#B26': 85,  // mitgefuehl - Sehr hoch - emotionale Resonanz
        '#B27': 85,  // beruecksichtigung - Sehr hoch - Rücksichtnahme
        '#B28': 90,  // empathie - Sehr hoch - sich einfühlen
        '#B29': 95,  // vertrauen - Sehr hoch - absolutes Vertrauen
        '#B30': 80,  // beachtung - Hoch - Aufmerksamkeit
        '#B31': 85,  // gesehen_werden - Sehr hoch - wirklich gesehen
        '#B32': 90,  // verstanden_werden - Sehr hoch - tief verstanden
        '#B33': 90,  // harmonie - Sehr hoch - Konflikt vermeiden

        // ─────────────────────────────────────────────────────────────────────────
        // FREIHEIT (#B34-#B38) - Autonomie und Selbstbestimmung
        // Duos: Niedrige Autonomie-Bedürfnisse - Wir > Ich
        // ─────────────────────────────────────────────────────────────────────────
        '#B34': 45,  // selbstbestimmung - Niedrig-mittel - gemeinsame Entscheidungen
        '#B35': 50,  // waehlen_koennen - Mittel - mit Partner abstimmen
        '#B36': 35,  // unabhaengigkeit - Niedrig - Abhängigkeit akzeptiert
        '#B37': 40,  // raum_haben - Niedrig - wenig Raumbedürfnis
        '#B38': 45,  // spontaneitaet - Niedrig-mittel - Planbarkeit bevorzugt

        // ─────────────────────────────────────────────────────────────────────────
        // TEILNAHME (#B39-#B45) - Gemeinschaft und Zugehörigkeit
        // ─────────────────────────────────────────────────────────────────────────
        '#B39': 85,  // zusammenarbeit - Sehr hoch - Teamwork
        '#B40': 85,  // kommunikation - Sehr hoch - offene Kommunikation
        '#B41': 70,  // gemeinschaft - Hoch - aber Paar-zentriert
        '#B42': 90,  // zugehoerigkeit - Sehr hoch - Zugehörigkeit zum Partner
        '#B43': 90,  // gegenseitigkeit - Sehr hoch - Geben und Nehmen
        '#B44': 85,  // respekt - Sehr hoch - gegenseitiger Respekt
        '#B45': 80,  // bedeutung_haben - Hoch - wichtig für Partner sein

        // ─────────────────────────────────────────────────────────────────────────
        // MUSSE (#B46-#B49) - Erholung, Freude und Genuss
        // ─────────────────────────────────────────────────────────────────────────
        '#B46': 70,  // schoenheit - Hoch - gemeinsam genießen
        '#B47': 75,  // freizeit - Hoch - aber zusammen
        '#B48': 85,  // freude - Sehr hoch - geteilte Freude
        '#B49': 80,  // humor - Hoch - gemeinsames Lachen

        // ─────────────────────────────────────────────────────────────────────────
        // IDENTITÄT (#B50-#B63) - Selbstverwirklichung und Sinn
        // Identität durch Beziehung definiert
        // ─────────────────────────────────────────────────────────────────────────
        '#B50': 70,  // authentizitaet - Hoch - aber angepasst an Partner
        '#B51': 75,  // echtheit - Hoch - innerhalb der Beziehung
        '#B52': 80,  // integritaet - Hoch - Treue als Wert
        '#B53': 75,  // praesenz - Hoch - präsent für Partner
        '#B54': 70,  // ordnung - Hoch - gemeinsame Struktur
        '#B55': 65,  // bewusstheit - Mittel-hoch
        '#B56': 50,  // herausforderung - Mittel - Stabilität bevorzugt
        '#B57': 70,  // klarheit - Hoch - klare Erwartungen
        '#B58': 60,  // kompetenz - Mittel - als Partner kompetent
        '#B59': 55,  // effizienz - Mittel
        '#B60': 60,  // wirksamkeit - Mittel - Einfluss in Beziehung
        '#B61': 65,  // wachstum - Mittel-hoch - gemeinsam wachsen
        '#B62': 80,  // sinn - Hoch - Beziehung gibt Sinn
        '#B63': 75,  // beitrag_leisten - Hoch - für Beziehung beitragen

        // ─────────────────────────────────────────────────────────────────────────
        // ERSCHAFFEN (#B64-#B68) - Kreativität und Lernen
        // ─────────────────────────────────────────────────────────────────────────
        '#B64': 55,  // kreativitaet - Mittel - wenn gemeinsam
        '#B65': 60,  // entdecken - Mittel - zusammen entdecken
        '#B66': 60,  // lernen - Mittel - voneinander lernen
        '#B67': 55,  // selbst_ausdruck - Mittel - durch Beziehung
        '#B68': 55,  // anreize_bekommen - Mittel - vom Partner

        // ─────────────────────────────────────────────────────────────────────────
        // VERBUNDENHEIT (#B69-#B73) - Tiefe existenzielle Verbindung
        // ─────────────────────────────────────────────────────────────────────────
        '#B69': 80,  // leben_feiern - Hoch - gemeinsam feiern
        '#B70': 65,  // inspiration - Mittel-hoch - durch Partner
        '#B71': 75,  // trauer_ausdruecken - Hoch - gemeinsam trauern
        '#B72': 60,  // einsehen - Mittel - mit Unterstützung
        '#B73': 70,  // anfang_ende - Hoch - Lebensphasen zusammen

        // ─────────────────────────────────────────────────────────────────────────
        // DYNAMIK (#B74-#B88) - Machtdynamik und bewusster Austausch
        // Tendenz zu Hingabe und Geführt-Werden, sucht Schutz
        // ─────────────────────────────────────────────────────────────────────────
        '#B74': 35,  // kontrolle_ausueben - Niedrig - gibt Kontrolle ab
        '#B75': 75,  // hingabe - Hoch - kann sich hingeben
        '#B76': 40,  // fuehrung_geben - Niedrig-mittel - eher folgend
        '#B77': 70,  // gefuehrt_werden - Hoch - lässt sich führen
        '#B78': 80,  // ritual - Hoch - liebt gemeinsame Rituale
        '#B79': 85,  // nachsorge - Sehr hoch - braucht und gibt
        '#B80': 50,  // grenzen_setzen - Mittel - schwerer mit Grenzen
        '#B81': 85,  // grenzen_respektieren - Sehr hoch - respektiert Partner
        '#B82': 75,  // intensitaet - Hoch - intensive Verbindung
        '#B83': 90,  // vertrauen_schenken - Sehr hoch - vertraut voll
        '#B84': 70,  // verantwortung_uebernehmen - Hoch - für Beziehung
        '#B85': 80,  // sich_fallenlassen - Hoch - kann loslassen
        '#B86': 65,  // machtaustausch - Mittel-hoch - offen dafür
        '#B87': 70,  // dienend_sein - Hoch - für Partner da sein
        '#B88': 80,  // beschuetzen - Hoch - will beschützen

        // ─────────────────────────────────────────────────────────────────────────
        // LEBENSPLANUNG (#B89-#B126) - Kinder, Ehe, Wohnen, Familie
        // Traditionelle Lebensplanung, Familie als Ziel
        // ─────────────────────────────────────────────────────────────────────────
        '#B89': 85,   // kinder_und_elternschaft - Sehr hoch - Familie gründen
        '#B90': 85,   // elternschaft - Sehr hoch - Familie gründen
        '#B91': 80,   // elternschaft - Hoch - gemeinsam Eltern sein
        '#B92': 75,   // fortpflanzung - Hoch - biologisches Bedürfnis
        '#B93': 85,   // familie_gruenden - Sehr hoch - Kernwunsch
        '#B94': 75,   // generativitaet - Hoch - etwas weitergeben
        '#B95': 95,   // verbindlichkeit - Sehr hoch - Kern des Duo
        '#B96': 95,   // langfristige_bindung - Sehr hoch - "für immer"
        '#B97': 85,   // rechtliche_sicherheit - Sehr hoch - Ehe wichtig
        '#B98': 95,   // treueversprechen - Sehr hoch - exklusiv
        '#B99': 95,   // gemeinsamer_wohnraum - Sehr hoch - zusammen leben
        '#B100': 90,  // haeuslichkeit - Sehr hoch - gemeinsames Zuhause
        '#B101': 90,  // nest_bauen - Sehr hoch - Heim schaffen
        '#B102': 95,  // alltag_teilen - Sehr hoch - alles zusammen
        '#B103': 35,  // eigener_raum - Niedrig - wenig Raumbedürfnis
        '#B104': 40,  // rueckzugsort - Niedrig - immer zusammen
        '#B105': 70,  // tierliebe - Hoch - gemeinsame Haustiere
        '#B106': 70,  // fuersorge_tiere - Hoch
        '#B107': 65,  // begleiter - Mittel-hoch
        '#B108': 70,  // verantwortung_tier - Hoch
        '#B109': 90,  // sesshaftigkeit - Sehr hoch - Stabilität
        '#B110': 85,  // verwurzelung - Sehr hoch - Heimat
        '#B111': 30,  // mobilitaet - Niedrig - sesshaft
        '#B112': 90,  // heimat - Sehr hoch
        '#B113': 35,  // neue_orte - Niedrig
        '#B114': 85,  // familienbindung - Sehr hoch
        '#B115': 80,  // herkunftsfamilie - Hoch
        '#B116': 80,  // familientreffen - Hoch
        '#B117': 80,  // generationenverbund - Hoch
        // Pirsig & Osho - Lebensplanung
        '#B118': 85,  // biologisches_muster - Sehr hoch - biologische Kontinuität
        '#B119': 90,  // soziales_muster - Sehr hoch - traditionelle Strukturen
        '#B120': 90,  // statische_stabilitaet - Sehr hoch - feste Muster gewünscht
        '#B121': 85,  // qualitaet_der_fuersorge - Sehr hoch - sorgfältige Planung
        '#B122': 15,  // familien_rebellion - Niedrig - traditionell orientiert
        '#B123': 60,  // zorba_das_kind - Mittel - Freude am Familienleben
        '#B124': 20,  // nicht_anhaften_an_familie - Niedrig - starke Bindung
        '#B125': 65,  // bewusste_elternschaft - Mittel-hoch - bewusst aber konservativ

        // ═══════════════════════════════════════════════════════════════════
        // KOMMUNIKATIONSSTIL (#B126-#B142) - K14
        // ═══════════════════════════════════════════════════════════════════
        '#B126': 85, // Gesprächstiefe
        '#B127': 90, // Tiefgehende-Gespräche
        '#B128': 60, // Small-Talk
        '#B129': 80, // Stille-gemeinsam
        '#B130': 90, // Verbale-Verbindung
        '#B131': 90, // Zuhören
        '#B132': 85, // Emotionaler-Ausdruck
        '#B133': 90, // Gefühle-zeigen
        '#B134': 85, // Verletzlichkeit
        '#B135': 30, // Emotionale-Zurückhaltung
        '#B136': 95, // Emotionale-Sicherheit
        '#B137': 90, // Gefühle-teilen
        '#B138': 80, // Konfliktverhalten
        '#B139': 85, // Aussprache
        '#B140': 40, // Konflikt-vermeiden
        '#B141': 75, // Streitkultur
        '#B142': 90, // Versöhnlichkeit
        // ═══════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN (#B143-#B159) - K15
        // ═══════════════════════════════════════════════════════════════════
        '#B143': 65, // Soziale-Energie
        '#B144': 70, // Geselligkeit
        '#B145': 50, // Ruhe-von-Menschen
        '#B146': 55, // Allein-aufladen
        '#B147': 65, // Menschen-treffen
        '#B148': 75, // Kleine-Gruppen
        '#B149': 55, // Zeit-für-sich
        '#B150': 60, // Eigene-Hobbys
        '#B151': 80, // Zeit-mit-Anderen
        '#B152': 95, // Partnerzeit
        '#B153': 55, // Eigene-Interessen
        '#B154': 70, // Freundeskreis
        '#B155': 85, // Gemeinsame-Freunde
        '#B156': 80, // Freundeskreis-teilen
        '#B157': 75, // Soziales-Netz
        '#B158': 70, // Freunde-pflegen
        '#B159': 60, // Neue-Freundschaften
        // ═══════════════════════════════════════════════════════════════════
        // INTIMITÄT & ROMANTIK (#B160-#B177) - K16
        // ═══════════════════════════════════════════════════════════════════
        '#B160': 95, // Körperliche-Nähe
        '#B161': 95, // Kuscheln
        '#B162': 25, // Physische-Distanz
        '#B163': 90, // Körperkontakt
        '#B164': 90, // Umarmungen
        '#B165': 85, // Hand-halten
        '#B166': 90, // Romantik
        '#B167': 80, // Überraschungen
        '#B168': 85, // Dates
        '#B169': 85, // Alltags-Romantik
        '#B170': 85, // Aufmerksamkeiten
        '#B171': 90, // Liebesbekundungen
        '#B172': 85, // Sexualität
        '#B173': 90, // Sexuelle-Intimität
        '#B174': 80, // Körperliche-Lust
        '#B175': 65, // Sexuelle-Experimentierfreude
        '#B176': 90, // Sexuelle-Verbindung
        '#B177': 90, // Sexuelle-Zufriedenheit
        // ═══════════════════════════════════════════════════════════════════
        // WERTE & HALTUNGEN (#B178-#B195) - K17
        // ═══════════════════════════════════════════════════════════════════
        '#B178': 55, // Spiritualität
        '#B179': 50, // Glaubenspraxis
        '#B180': 55, // Religiöse-Gemeinschaft
        '#B181': 55, // Säkularität
        '#B182': 70, // Sinnsuche
        '#B183': 55, // Transzendenz
        '#B184': 60, // Tradition-&-Moderne
        '#B185': 55, // Moderne-Lebensweise
        '#B186': 60, // Konservative-Werte
        '#B187': 50, // Progressive-Werte
        '#B188': 60, // Kulturelle-Tradition
        '#B189': 60, // Offenheit-für-Neues
        '#B190': 65, // Umweltbewusstsein
        '#B191': 65, // Nachhaltigkeit
        '#B192': 60, // Ökologisches-Bewusstsein
        '#B193': 65, // Pragmatismus
        '#B194': 60, // Klimaschutz
        '#B195': 60, // Ressourcenschonung
        // ═══════════════════════════════════════════════════════════════════
        // PRAKTISCHES LEBEN (#B196-#B208) - K18
        // ═══════════════════════════════════════════════════════════════════
        '#B196': 75, // Ordnung-&-Struktur
        '#B197': 75, // Sauberkeit
        '#B198': 70, // Struktur
        '#B199': 40, // Chaos-Toleranz
        '#B200': 75, // Organisiert-sein
        '#B201': 55, // Flexibilität-Haushalt
        '#B202': 65, // Reisen-&-Abenteuer
        '#B203': 60, // Abenteuer
        '#B204': 70, // Neue-Orte-entdecken
        '#B205': 75, // Heimatverbundenheit
        '#B206': 80, // Urlaub
        '#B207': 60, // Fernweh
        '#B208': 75, // Heimatverbundenheit-2
        '#B221': 40,  // sexuelle_experimentierfreude - Niedrig-mittel - traditionell
        '#B222': 90,  // sexuelle_verbindung - Sehr hoch - mit Partner
        '#B223': 45,  // bondage_erleben - Niedrig-mittel

        // ─────────────────────────────────────────────────────────────────────────
        // ERWEITERTE DYNAMIK (#B209-#B220) - Kink/BDSM
        // ─────────────────────────────────────────────────────────────────────────
        '#B209': 30,  // schmerzerleben - Niedrig
        '#B210': 25,  // schmerz_geben - Niedrig
        '#B211': 45,  // bondage_erleben - Niedrig-mittel
        '#B224': 50,  // Zucker - Mittel
        '#B212': 35,  // bondage_geben - Niedrig
        '#B213': 60,  // devotion - Mittel - Hingabe an Partner
        '#B214': 40,  // anbetung - Niedrig-mittel
        '#B215': 50,  // demuetig_sein - Mittel
        '#B216': 35,  // dominieren - Niedrig
        '#B217': 35,  // bestrafung_erhalten - Niedrig
        '#B218': 30,  // bestrafen - Niedrig
        '#B219': 65,  // service_geben - Mittel-hoch - für Partner
        '#B220': 55,  // service_empfangen - Mittel
        '#B225': 70,  // beschuetzt_werden - Hoch - Geborgenheit im Paar
        '#B226': 75, // vertrauen_empfangen - Hoch - Vertrauen des Partners

        // ═══════════════════════════════════════════════════════════════════
        // KÖRPERLICHE RESONANZ (#B227) - K16
        // ═══════════════════════════════════════════════════════════════════
        '#B227': 85, // Körperliche-Resonanz

        // ═══════════════════════════════════════════════════════════════════
        // BEZIEHUNGSFORM & LEBENSPLANUNG (#B228-#B240) - K12
        // ═══════════════════════════════════════════════════════════════════
        '#B228': 90, // Beziehungsmodell
        '#B229': 95, // Exklusivität
        '#B230': 85, // Beziehungs-Hierarchie
        '#B231': 70, // Kinderwunsch
        '#B232': 65, // Kinderzeitpunkt
        '#B233': 70, // Erziehungsstil
        '#B234': 95, // Zusammenleben
        '#B235': 80, // Wohnform
        '#B236': 95, // Verbindlichkeit
        '#B237': 80, // Ehe-Wunsch
        '#B238': 90, // Langfristplanung
        '#B239': 75, // Familiengründung
        '#B240': 55, // Patchwork-Offenheit

        // ═══════════════════════════════════════════════════════════════════
        // SPIRITUALITÄT & WELTANSCHAUUNG (#B241-#B253) - K13
        // ═══════════════════════════════════════════════════════════════════
        '#B241': 50, // Spirituelle-Praxis
        '#B242': 55, // Meditation-&-Achtsamkeit
        '#B243': 60, // Religiöse-Übereinstimmung
        '#B244': 75, // Ethische-Grundhaltung
        '#B245': 75, // Moralische-Werte
        '#B246': 80, // Verantwortungsbewusstsein
        '#B247': 55, // Politische-Ausrichtung
        '#B248': 55, // Gesellschaftliches-Engagement
        '#B249': 65, // Lebensphilosophie
        '#B250': 60, // Existenzielle-Fragen
        '#B251': 70, // Wachstums-Orientierung
        '#B252': 65, // Naturverbundenheit
        '#B253': 60 // Nachhaltigkeit-2
    },

    // Zusammenfassung der Kernwerte
    kernwerte: ["Sicherheit", "Liebe", "Treue", "Harmonie", "Verschmelzung"],
    vermeidet: ["Trennung", "Alleinsein", "Unsicherheit", "Distanz", "Konflikte"]
};

// Export für verschiedene Module-Systeme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DuoProfil;
}
if (typeof window !== 'undefined') {
    window.DuoProfil = DuoProfil;
}
