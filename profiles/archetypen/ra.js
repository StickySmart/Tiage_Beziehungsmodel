/**
 * RA - Relationship Anarchy (Der Beziehungs-Anarchist)
 *
 * Vollständiges Bedürfnis-Profil mit allen 88 Werten (0-100)
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
        // EXISTENZ (9)
        // ═══════════════════════════════════════════════════════════════════════
        existenz: {
            luft: 50,
            wasser: 50,
            nahrung: 50,
            bewegung: 70,                // Hoch - körperliche Freiheit
            beruehrung: 55,              // Mittel - situativ
            erholung: 70,                // Hoch
            sexueller_ausdruck: 65,      // Mittel-hoch - nicht hierarchisiert
            sicherheit_physisch: 60,     // Mittel
            unterschlupf: 70             // Hoch - eigener Raum
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SICHERHEIT (6)
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Innere Sicherheit, externe Strukturen unwichtig
        sicherheit: {
            bestaendigkeit: 45,          // Niedrig-mittel - Wandel akzeptiert
            sich_sicher_fuehlen: 65,     // Mittel-hoch - in sich selbst
            schutz: 40,                  // Niedrig-mittel
            stabilitaet: 45,             // Niedrig-mittel - Flexibilität bevorzugt
            leichtigkeit: 85,            // Sehr hoch - keine Regeln = Leichtigkeit
            geborgenheit: 45             // Niedrig-mittel - nicht durch andere
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ZUNEIGUNG (9)
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Liebe nicht hierarchisiert
        zuneigung: {
            waerme: 65,                  // Mittel-hoch - authentisch
            wertschaetzung: 80,          // Hoch - alle gleich wertvoll
            naehe: 55,                   // Mittel - situativ
            gesellschaft: 70,            // Hoch - Netzwerk wichtig
            intimitaet: 60,              // Mittel - nicht priorisiert
            liebe: 70,                   // Hoch - aber nicht hierarchisch
            fuersorge: 60,               // Mittel - gegenseitig
            unterstuetzung: 65,          // Mittel-hoch
            fuereinander_da_sein: 60     // Mittel - ohne Verpflichtung
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERSTÄNDNIS (9)
        // ═══════════════════════════════════════════════════════════════════════
        verstaendnis: {
            akzeptanz: 90,               // Sehr hoch - alle Lebensformen
            mitgefuehl: 70,              // Hoch
            beruecksichtigung: 75,       // Hoch
            empathie: 70,                // Hoch
            vertrauen: 75,               // Hoch - durch Freiheit
            beachtung: 65,               // Mittel-hoch
            gesehen_werden: 75,          // Hoch - als Individuum
            verstanden_werden: 70,       // Hoch
            harmonie: 50                 // Mittel - Konflikte ok
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FREIHEIT (5)
        // ═══════════════════════════════════════════════════════════════════════
        // RA: KERN-KATEGORIE - absolute Freiheit
        freiheit: {
            selbstbestimmung: 100,       // Maximum - Kernwert
            waehlen_koennen: 100,        // Maximum - keine Einschränkungen
            unabhaengigkeit: 95,         // Sehr hoch
            raum_haben: 90,              // Sehr hoch
            spontaneitaet: 95            // Sehr hoch - keine Regeln
        },

        // ═══════════════════════════════════════════════════════════════════════
        // TEILNAHME (7)
        // ═══════════════════════════════════════════════════════════════════════
        teilnahme: {
            zusammenarbeit: 65,          // Mittel-hoch - freiwillig
            kommunikation: 85,           // Sehr hoch - aber ohne Zwang
            gemeinschaft: 75,            // Hoch - RA-Community
            zugehoerigkeit: 55,          // Mittel - lose
            gegenseitigkeit: 70,         // Hoch - freiwillig
            respekt: 90,                 // Sehr hoch - für alle Wege
            bedeutung_haben: 70          // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // MUSSE (4)
        // ═══════════════════════════════════════════════════════════════════════
        musse: {
            schoenheit: 65,              // Mittel-hoch
            freizeit: 90,                // Sehr hoch - keine Verpflichtungen
            freude: 85,                  // Sehr hoch
            humor: 80                    // Hoch - Leichtigkeit
        },

        // ═══════════════════════════════════════════════════════════════════════
        // IDENTITÄT (14)
        // ═══════════════════════════════════════════════════════════════════════
        identitaet: {
            authentizitaet: 95,          // Sehr hoch - keine Kompromisse
            echtheit: 95,                // Sehr hoch
            integritaet: 90,             // Sehr hoch - eigene Werte
            praesenz: 75,                // Hoch
            ordnung: 40,                 // Niedrig - Anarchie
            bewusstheit: 85,             // Sehr hoch
            herausforderung: 80,         // Hoch - Normen hinterfragen
            klarheit: 80,                // Hoch - eigene Position klar
            kompetenz: 80,               // Hoch
            effizienz: 60,               // Mittel
            wirksamkeit: 85,             // Sehr hoch - eigenes Leben gestalten
            wachstum: 85,                // Sehr hoch
            sinn: 80,                    // Hoch - eigener Sinn
            beitrag_leisten: 70          // Hoch - zur Community
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ERSCHAFFEN (5)
        // ═══════════════════════════════════════════════════════════════════════
        erschaffen: {
            kreativitaet: 90,            // Sehr hoch - neue Formen erfinden
            entdecken: 90,               // Sehr hoch
            lernen: 85,                  // Sehr hoch
            selbst_ausdruck: 95,         // Sehr hoch
            anreize_bekommen: 80         // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERBUNDENHEIT (5)
        // ═══════════════════════════════════════════════════════════════════════
        verbundenheit: {
            leben_feiern: 85,            // Sehr hoch
            inspiration: 85,             // Sehr hoch
            trauer_ausdruecken: 55,      // Mittel - individuell
            einsehen: 75,                // Hoch
            anfang_ende: 70              // Hoch - Wandel akzeptieren
        },

        // ═══════════════════════════════════════════════════════════════════════
        // DYNAMIK (15)
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Keine festen Rollen, alles situativ
        dynamik: {
            kontrolle_ausueben: 55,      // Mittel - über eigenes Leben
            hingabe: 40,                 // Niedrig-mittel - temporär
            fuehrung_geben: 50,          // Mittel - situativ
            gefuehrt_werden: 35,         // Niedrig - bevorzugt Autonomie
            ritual: 35,                  // Niedrig - keine festen Strukturen
            nachsorge: 60,               // Mittel - wenn nötig
            grenzen_setzen: 90,          // Sehr hoch - essentiell
            grenzen_respektieren: 95,    // Sehr hoch - höchster Wert
            intensitaet: 60,             // Mittel - situativ
            vertrauen_schenken: 60,      // Mittel - vorsichtig
            verantwortung_uebernehmen: 80, // Hoch - für sich selbst
            sich_fallenlassen: 35,       // Niedrig - behält Autonomie
            machtaustausch: 40,          // Niedrig-mittel
            dienend_sein: 30,            // Niedrig
            beschuetzen: 50              // Mittel
        },

        // ═══════════════════════════════════════════════════════════════════════
        // LEBENSPLANUNG (15) - Kinder, Ehe, Wohnen, Familie
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Keine vordefinierten Strukturen, alles individuell verhandelbar
        lebensplanung: {
            kinderwunsch: 35,            // Niedrig-mittel - individuell
            elternschaft: 30,            // Niedrig - nicht priorisiert
            fortpflanzung: 25,           // Niedrig
            fuersorge: 50,               // Mittel - ohne Verpflichtung
            familie_gruenden: 20,        // Niedrig - traditionelle Struktur abgelehnt
            generativitaet: 45,          // Mittel
            erziehung_werte: 35,         // Niedrig-mittel
            verbindlichkeit: 25,         // Niedrig - keine festen Commitments
            langfristige_bindung: 30,    // Niedrig - Wandel akzeptiert
            rechtliche_sicherheit: 15,   // Sehr niedrig - institutionell abgelehnt
            tradition_ehe: 5,            // Minimum - explizit abgelehnt
            oeffentliches_bekenntnis: 15, // Sehr niedrig - nicht nötig
            gemeinsamer_wohnraum: 25,    // Niedrig - kann, muss nicht
            eigener_rueckzugsort: 90,    // Sehr hoch - wichtig
            haeuslichkeit: 50            // Mittel - eigene Definition
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FINANZEN & KARRIERE (10) - Geld, Arbeit, berufliche Entwicklung
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Vollständige finanzielle Autonomie
        finanzen_karriere: {
            finanzielle_unabhaengigkeit: 95, // Sehr hoch - essentiell
            gemeinsame_finanzen: 10,     // Sehr niedrig - vermeidet
            versorger_rolle: 15,         // Sehr niedrig - lehnt ab
            materielle_sicherheit: 60,   // Mittel-hoch
            karriere_entwicklung: 70,    // Hoch - eigene Erfüllung
            berufliche_anerkennung: 65,  // Mittel-hoch
            work_life_balance: 80,       // Hoch - Freiheit wichtig
            gemeinsame_ziele: 35,        // Niedrig - eigene Ziele
            erfolg: 70,                  // Hoch - selbst definiert
            leistung: 65                 // Mittel-hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // KOMMUNIKATION & STIL (12) - Art des Austauschs
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Ehrlich, direkt, ohne Zwang
        kommunikation_stil: {
            emotionale_offenheit: 65,    // Mittel-hoch - authentisch
            tiefe_gespraeche: 70,        // Hoch - philosophisch
            small_talk: 50,              // Mittel
            konfliktbereitschaft: 80,    // Hoch - hinterfragt
            konstruktive_kritik: 80,     // Hoch
            aktives_zuhoeren: 70,        // Hoch
            nonverbale_kommunikation: 55, // Mittel
            humor_ironie: 80,            // Hoch - kritisch
            intellektueller_austausch: 85, // Sehr hoch - Ideen wichtig
            digitale_kommunikation: 70,  // Hoch
            verbale_anerkennung: 55,     // Mittel
            schweigen_aushalten: 80      // Hoch - braucht keine Bestätigung
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN (12) - Freunde, Familie, Gesellschaft
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Alle Beziehungen gleichwertig, keine Hierarchie
        soziales_leben: {
            freundeskreis_pflege: 80,    // Hoch - gleichwertig mit Partnern
            gemeinsame_freunde: 55,      // Mittel - keine Trennung
            familieneinbindung: 35,      // Niedrig-mittel - auf Distanz
            gesellschaftliches_engagement: 65, // Mittel-hoch - politisch
            networking: 70,              // Hoch - Verbindungen ohne Hierarchie
            gemeinsame_hobbys: 45,       // Mittel - situativ
            individuelle_hobbys: 90,     // Sehr hoch - wichtig
            gemeinsame_zeit: 45,         // Mittel - freiwillig
            zeit_fuer_sich: 90,          // Sehr hoch - essentiell
            soziale_unterstuetzung: 55,  // Mittel - gegenseitig aber frei
            gemeinsame_erlebnisse: 55,   // Mittel - situativ
            alltagsteilung: 20           // Niedrig - vermeidet Verschmelzung
        },

        // ═══════════════════════════════════════════════════════════════════════
        // INTIMITÄT & BEZIEHUNG (12) - Nähe, Sexualität, Bindung
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Intimität nicht hierarchisiert, situativ
        intimitaet_beziehung: {
            koerpernaehe: 50,            // Mittel - situativ
            kuscheln: 45,                // Mittel - nicht priorisiert
            sexuelle_exklusivitaet: 5,   // Minimum - explizit abgelehnt
            sexuelle_offenheit: 90,      // Sehr hoch - keine Regeln
            leidenschaft: 55,            // Mittel - situativ
            zaertlichkeit: 50,           // Mittel
            emotionale_tiefe: 55,        // Mittel - mit verschiedenen
            romantik: 40,                // Niedrig-mittel - nicht hierarchisiert
            flirten: 75,                 // Hoch - Freiheit
            eifersucht_als_signal: 20,   // Niedrig - wird abgelehnt
            treue_werte: 25,             // Niedrig - eigene Definition
            bindungsbereitschaft: 30     // Niedrig - flexibel
        },

        // ═══════════════════════════════════════════════════════════════════════
        // WERTE & HALTUNG (10) - Überzeugungen, Religion, Politik
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Anarchistische, anti-hierarchische Werte
        werte_haltung: {
            spiritualitaet: 50,          // Mittel - individuell
            religioese_praxis: 15,       // Sehr niedrig - institutionell abgelehnt
            politisches_engagement: 75,  // Hoch - politisch aktiv
            umweltbewusstsein: 70,       // Hoch - progressive Werte
            traditionelle_werte: 5,      // Minimum - explizit abgelehnt
            moderne_werte: 95,           // Sehr hoch - radikal progressiv
            toleranz: 95,                // Sehr hoch - alle Wege akzeptiert
            offenheit_neues: 95,         // Sehr hoch
            kulturelle_identitaet: 45,   // Mittel - flexibel
            wertekongruenz: 85           // Sehr hoch - lebt nach Überzeugungen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // PRAKTISCHES LEBEN (10) - Alltag, Organisation, Gesundheit
        // ═══════════════════════════════════════════════════════════════════════
        // RA: Maximale Flexibilität und Autonomie
        praktisches_leben: {
            haushaltsaufteilung: 15,     // Sehr niedrig - eigenständig
            alltagsorganisation: 60,     // Mittel - für sich selbst
            gesundheitsbewusstsein: 70,  // Hoch
            ernaehrungsstil: 60,         // Mittel-hoch - bewusst
            ordnung_sauberkeit: 50,      // Mittel - eigener Standard
            mobilitaet: 95,              // Sehr hoch - maximal flexibel
            wohnort_flexibilitaet: 95,   // Sehr hoch - ortsungebunden
            heimatverbundenheit: 25,     // Niedrig - nomadisch
            reisen_abenteuer: 90,        // Sehr hoch
            routine_struktur: 35         // Niedrig - wenig Struktur
        }
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
