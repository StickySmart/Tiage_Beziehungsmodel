/**
 * SINGLE - Der Autonome
 *
 * Vollständiges Bedürfnis-Profil mit allen 88 Werten (0-100)
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
        // EXISTENZ (9) - Grundlegende physische Bedürfnisse
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Selbstversorgung wichtig, körperliche Autonomie hoch
        existenz: {
            luft: 50,                    // Universal, neutral
            wasser: 50,                  // Universal, neutral
            nahrung: 50,                 // Universal, neutral
            bewegung: 75,                // Hoch - körperliche Aktivität für Selbstwirksamkeit
            beruehrung: 45,              // Reduziert - weniger Bedürfnis nach körperlicher Nähe
            erholung: 70,                // Mittel-hoch - Selbstfürsorge wichtig
            sexueller_ausdruck: 65,      // Mittel - unabhängig von Beziehung
            sicherheit_physisch: 60,     // Mittel - Selbstschutz
            unterschlupf: 55             // Mittel - eigener Raum wichtig
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SICHERHEIT (6) - Emotionale und psychische Sicherheit
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Innere Sicherheit > externe Sicherheit durch andere
        // Quelle: Attachment Theory - Dismissive style shows low anxiety
        sicherheit: {
            bestaendigkeit: 40,          // Niedrig - Flexibilität bevorzugt
            sich_sicher_fuehlen: 55,     // Mittel - innere Sicherheit
            schutz: 35,                  // Niedrig - braucht keinen Beschützer
            stabilitaet: 40,             // Niedrig - kann mit Unsicherheit umgehen
            leichtigkeit: 70,            // Hoch - Unbeschwertheit wichtig
            geborgenheit: 30             // Niedrig - vermeidet emotionale Abhängigkeit
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ZUNEIGUNG (9) - Liebe, Nähe und emotionale Verbindung
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Selektive Zuneigung, vermeidet Verschmelzung
        // Quelle: Avoidant attachment shows discomfort with closeness
        zuneigung: {
            waerme: 50,                  // Mittel - kann geben, aber dosiert
            wertschaetzung: 60,          // Mittel-hoch - möchte anerkannt werden
            naehe: 35,                   // Niedrig - bevorzugt Distanz
            gesellschaft: 55,            // Mittel - selektiv sozial
            intimitaet: 40,              // Niedrig - vermeidet tiefe Verschmelzung
            liebe: 45,                   // Mittel-niedrig - rational, nicht überwältigend
            fuersorge: 45,               // Mittel - kann fürsorglich sein, aber begrenzt
            unterstuetzung: 50,          // Mittel - gegenseitig, nicht einseitig
            fuereinander_da_sein: 40     // Niedrig - Unabhängigkeit wichtiger
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERSTÄNDNIS (9) - Gesehen und verstanden werden
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Respekt > emotionales Verständnis
        // Quelle: High self-reliance, less need for external validation
        verstaendnis: {
            akzeptanz: 65,               // Mittel-hoch - will akzeptiert werden wie man ist
            mitgefuehl: 45,              // Mittel - rational, weniger emotional
            beruecksichtigung: 55,       // Mittel - will berücksichtigt werden
            empathie: 50,                // Mittel - kann empathisch sein
            vertrauen: 55,               // Mittel - vorsichtig mit Vertrauen
            beachtung: 60,               // Mittel-hoch - Anerkennung wichtig
            gesehen_werden: 65,          // Mittel-hoch - als Individuum
            verstanden_werden: 55,       // Mittel - nicht übermäßig wichtig
            harmonie: 45                 // Niedrig-mittel - kann Konflikte aushalten
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FREIHEIT (5) - Autonomie und Selbstbestimmung
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: KERN-KATEGORIE - höchste Werte
        // Quelle: Self-Determination Theory - Autonomy as core need
        freiheit: {
            selbstbestimmung: 95,        // Sehr hoch - Kernbedürfnis
            waehlen_koennen: 90,         // Sehr hoch - Optionen offen halten
            unabhaengigkeit: 95,         // Sehr hoch - emotionale & praktische
            raum_haben: 90,              // Sehr hoch - eigener Raum essentiell
            spontaneitaet: 85            // Hoch - Flexibilität wichtig
        },

        // ═══════════════════════════════════════════════════════════════════════
        // TEILNAHME (7) - Gemeinschaft und Zugehörigkeit
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Selektive Teilnahme, vermeidet Verpflichtungen
        teilnahme: {
            zusammenarbeit: 55,          // Mittel - wenn nötig
            kommunikation: 60,           // Mittel - klar, aber nicht übermäßig
            gemeinschaft: 50,            // Mittel - lose Netzwerke bevorzugt
            zugehoerigkeit: 45,          // Niedrig-mittel - nicht essentiell
            gegenseitigkeit: 55,         // Mittel - fairness wichtig
            respekt: 75,                 // Hoch - Respekt für Grenzen wichtig
            bedeutung_haben: 70          // Hoch - will bedeutsam sein
        },

        // ═══════════════════════════════════════════════════════════════════════
        // MUSSE (4) - Erholung, Freude und Genuss
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Genussfähigkeit alleine hoch
        musse: {
            schoenheit: 65,              // Mittel-hoch - ästhetisch orientiert
            freizeit: 85,                // Sehr hoch - eigene Zeit wertvoll
            freude: 80,                  // Hoch - Lebensfreude alleine
            humor: 70                    // Hoch - Leichtigkeit
        },

        // ═══════════════════════════════════════════════════════════════════════
        // IDENTITÄT (14) - Selbstverwirklichung und Sinn
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: KERN-KATEGORIE - starke Selbstdefinition
        // Quelle: Erikson - Identity before Intimacy
        identitaet: {
            authentizitaet: 90,          // Sehr hoch - true self wichtig
            echtheit: 85,                // Sehr hoch - keine Maske
            integritaet: 85,             // Sehr hoch - Werte leben
            praesenz: 70,                // Hoch - im Moment sein
            ordnung: 55,                 // Mittel - eigene Ordnung
            bewusstheit: 75,             // Hoch - Selbstreflexion
            herausforderung: 80,         // Hoch - Wachstum durch Challenge
            klarheit: 75,                // Hoch - klare Grenzen
            kompetenz: 85,               // Sehr hoch - Meisterschaft wichtig
            effizienz: 70,               // Hoch - Selbstwirksamkeit
            wirksamkeit: 80,             // Sehr hoch - Einfluss haben
            wachstum: 85,                // Sehr hoch - persönliche Entwicklung
            sinn: 75,                    // Hoch - eigener Lebenssinn
            beitrag_leisten: 65          // Mittel-hoch - aber individuell
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ERSCHAFFEN (5) - Kreativität und Lernen
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Kreative Selbstentfaltung wichtig
        erschaffen: {
            kreativitaet: 80,            // Sehr hoch - kreativer Ausdruck
            entdecken: 85,               // Sehr hoch - Neugier
            lernen: 80,                  // Sehr hoch - lebenslanges Lernen
            selbst_ausdruck: 85,         // Sehr hoch - Individualität zeigen
            anreize_bekommen: 70         // Hoch - Stimulation suchen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERBUNDENHEIT (5) - Tiefe existenzielle Verbindung
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Spirituelle Verbundenheit ohne menschliche Abhängigkeit
        verbundenheit: {
            leben_feiern: 70,            // Hoch - Lebensfreude
            inspiration: 75,             // Hoch - von Ideen inspiriert
            trauer_ausdruecken: 45,      // Mittel - privat verarbeitet
            einsehen: 65,                // Mittel-hoch - Selbsterkenntnis
            anfang_ende: 55              // Mittel - philosophisch akzeptiert
        },

        // ═══════════════════════════════════════════════════════════════════════
        // DYNAMIK (15) - Machtdynamik und bewusster Austausch
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Tendenz zu Autonomie, vermeidet Abhängigkeit in beide Richtungen
        // Quelle: BDSM Research - Singles often Switch or no preference
        dynamik: {
            kontrolle_ausueben: 55,      // Mittel - über eigenes Leben
            hingabe: 30,                 // Niedrig - vermeidet Kontrollverlust
            fuehrung_geben: 55,          // Mittel - wenn situativ nötig
            gefuehrt_werden: 25,         // Niedrig - bevorzugt Autonomie
            ritual: 40,                  // Niedrig-mittel - eigene Rituale
            nachsorge: 45,               // Mittel - Selbstfürsorge
            grenzen_setzen: 85,          // Sehr hoch - klare Grenzen
            grenzen_respektieren: 75,    // Hoch - respektiert andere
            intensitaet: 60,             // Mittel - dosiert
            vertrauen_schenken: 40,      // Niedrig-mittel - vorsichtig
            verantwortung_uebernehmen: 70, // Hoch - für sich selbst
            sich_fallenlassen: 25,       // Niedrig - behält Kontrolle
            machtaustausch: 35,          // Niedrig - vermeidet
            dienend_sein: 25,            // Niedrig - nicht unterwürfig
            beschuetzen: 50              // Mittel - kann beschützen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // LEBENSPLANUNG (15) - Kinder, Ehe, Wohnen, Familie
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Niedrig - Freiheit und Flexibilität priorisiert
        lebensplanung: {
            kinderwunsch: 25,            // Niedrig - oft kein aktiver Wunsch
            elternschaft: 20,            // Niedrig - Verantwortung einschränkt
            fortpflanzung: 20,           // Niedrig - nicht priorisiert
            fuersorge: 45,               // Mittel - kann fürsorglich sein
            familie_gruenden: 15,        // Sehr niedrig - nicht das Ziel
            generativitaet: 40,          // Mittel - anders ausgelebt
            erziehung_werte: 30,         // Niedrig - keine Kinder geplant
            verbindlichkeit: 25,         // Niedrig - vermeidet langfristige Bindung
            langfristige_bindung: 20,    // Niedrig - Flexibilität wichtiger
            rechtliche_sicherheit: 30,   // Niedrig - braucht keine Absicherung
            tradition_ehe: 15,           // Sehr niedrig - traditionelle Werte unwichtig
            oeffentliches_bekenntnis: 20, // Niedrig - braucht keine Bestätigung
            gemeinsamer_wohnraum: 15,    // Sehr niedrig - eigener Raum essentiell
            eigener_rueckzugsort: 95,    // Sehr hoch - Kernbedürfnis
            haeuslichkeit: 50            // Mittel - eigenes Zuhause wichtig
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FINANZEN & KARRIERE (10) - Geld, Arbeit, berufliche Entwicklung
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Hohe finanzielle Unabhängigkeit, Karriere wichtig
        finanzen_karriere: {
            finanzielle_unabhaengigkeit: 95, // Sehr hoch - Kernbedürfnis
            gemeinsame_finanzen: 10,     // Sehr niedrig - alles getrennt
            versorger_rolle: 20,         // Niedrig - nur Selbstversorgung
            materielle_sicherheit: 65,   // Mittel-hoch - eigene Absicherung
            karriere_entwicklung: 85,    // Sehr hoch - berufliche Erfüllung
            berufliche_anerkennung: 80,  // Hoch - Erfolg wichtig
            work_life_balance: 75,       // Hoch - Balance für sich
            gemeinsame_ziele: 25,        // Niedrig - eigene Ziele
            erfolg: 85,                  // Sehr hoch - persönlicher Erfolg
            leistung: 80                 // Hoch - Selbstwirksamkeit durch Leistung
        },

        // ═══════════════════════════════════════════════════════════════════════
        // KOMMUNIKATION & STIL (12) - Art des Austauschs
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Direkte Kommunikation, emotionale Distanz
        kommunikation_stil: {
            emotionale_offenheit: 40,    // Niedrig-mittel - selektiv offen
            tiefe_gespraeche: 55,        // Mittel - mit Ausgewählten
            small_talk: 60,              // Mittel - oberflächlich ok
            konfliktbereitschaft: 70,    // Hoch - kann Konflikte austragen
            konstruktive_kritik: 75,     // Hoch - direkt und sachlich
            aktives_zuhoeren: 55,        // Mittel - wenn interessiert
            nonverbale_kommunikation: 50, // Mittel - weniger Fokus
            humor_ironie: 75,            // Hoch - Leichtigkeit
            intellektueller_austausch: 80, // Hoch - geistige Stimulation
            digitale_kommunikation: 70,  // Hoch - praktisch und distanziert
            verbale_anerkennung: 55,     // Mittel - braucht weniger externe
            schweigen_aushalten: 85      // Sehr hoch - allein sein können
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN (12) - Freunde, Familie, Gesellschaft
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Lose Netzwerke, selektive Kontakte
        soziales_leben: {
            freundeskreis_pflege: 60,    // Mittel - wichtig aber nicht zentral
            gemeinsame_freunde: 35,      // Niedrig - eigene Freunde
            familieneinbindung: 40,      // Niedrig-mittel - auf Distanz
            gesellschaftliches_engagement: 50, // Mittel - individuell
            networking: 70,              // Hoch - beruflich nützlich
            gemeinsame_hobbys: 25,       // Niedrig - eigene Interessen
            individuelle_hobbys: 95,     // Sehr hoch - Kernbedürfnis
            gemeinsame_zeit: 25,         // Niedrig - Zeit für sich
            zeit_fuer_sich: 95,          // Sehr hoch - Kernbedürfnis
            soziale_unterstuetzung: 45,  // Mittel - braucht weniger
            gemeinsame_erlebnisse: 40,   // Niedrig-mittel - selektiv
            alltagsteilung: 15           // Sehr niedrig - eigener Alltag
        },

        // ═══════════════════════════════════════════════════════════════════════
        // INTIMITÄT & BEZIEHUNG (12) - Nähe, Sexualität, Bindung
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Körperliche Intimität ohne emotionale Bindung
        intimitaet_beziehung: {
            koerpernaehe: 45,            // Mittel - dosiert
            kuscheln: 35,                // Niedrig - nicht so wichtig
            sexuelle_exklusivitaet: 30,  // Niedrig - offen für Optionen
            sexuelle_offenheit: 75,      // Hoch - experimentierfreudig
            leidenschaft: 60,            // Mittel - wenn vorhanden
            zaertlichkeit: 40,           // Niedrig-mittel - distanziert
            emotionale_tiefe: 45,        // Mittel - vorsichtig
            romantik: 35,                // Niedrig - nüchtern
            flirten: 70,                 // Hoch - unverbindlich
            eifersucht_als_signal: 25,   // Niedrig - keine Besitzansprüche
            treue_werte: 40,             // Niedrig-mittel - flexible Definition
            bindungsbereitschaft: 20     // Niedrig - Autonomie wichtiger
        },

        // ═══════════════════════════════════════════════════════════════════════
        // WERTE & HALTUNG (10) - Überzeugungen, Religion, Politik
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Progressive, individuelle Werte
        werte_haltung: {
            spiritualitaet: 55,          // Mittel - individuelle Spiritualität
            religioese_praxis: 25,       // Niedrig - nicht institutionell
            politisches_engagement: 55,  // Mittel - wenn persönlich relevant
            umweltbewusstsein: 60,       // Mittel-hoch - individuell gelebt
            traditionelle_werte: 20,     // Niedrig - progressiv
            moderne_werte: 85,           // Sehr hoch - individualistisch
            toleranz: 80,                // Hoch - akzeptiert Diversität
            offenheit_neues: 85,         // Sehr hoch - Neugier
            kulturelle_identitaet: 55,   // Mittel - eigene Definition
            wertekongruenz: 70           // Hoch - lebt nach eigenen Werten
        },

        // ═══════════════════════════════════════════════════════════════════════
        // PRAKTISCHES LEBEN (10) - Alltag, Organisation, Gesundheit
        // ═══════════════════════════════════════════════════════════════════════
        // Singles: Hohe Eigenständigkeit, flexible Lebensgestaltung
        praktisches_leben: {
            haushaltsaufteilung: 10,     // Sehr niedrig - alles alleine
            alltagsorganisation: 70,     // Hoch - strukturiert für sich
            gesundheitsbewusstsein: 75,  // Hoch - Selbstfürsorge
            ernaehrungsstil: 65,         // Mittel-hoch - eigene Wahl
            ordnung_sauberkeit: 60,      // Mittel - eigener Standard
            mobilitaet: 90,              // Sehr hoch - flexibel und mobil
            wohnort_flexibilitaet: 90,   // Sehr hoch - ortsungebunden
            heimatverbundenheit: 35,     // Niedrig - nicht verwurzelt
            reisen_abenteuer: 85,        // Sehr hoch - Entdeckungslust
            routine_struktur: 55         // Mittel - eigene Routinen
        }
    },

    // Zusammenfassung der Kernwerte
    kernwerte: ["Freiheit", "Authentizität", "Wachstum", "Kompetenz", "Unabhängigkeit"],
    vermeidet: ["Abhängigkeit", "Verschmelzung", "Kontrolle durch andere", "Verpflichtung"]
};

// Export für verschiedene Module-Systeme
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SingleProfil;
}
if (typeof window !== 'undefined') {
    window.SingleProfil = SingleProfil;
}
