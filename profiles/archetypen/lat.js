/**
 * LAT - Living Apart Together
 *
 * Vollständiges Bedürfnis-Profil mit allen 88 Werten (0-100)
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

    beduerfnisse: {

        // ═══════════════════════════════════════════════════════════════════════
        // EXISTENZ (9)
        // ═══════════════════════════════════════════════════════════════════════
        existenz: {
            luft: 50,
            wasser: 50,
            nahrung: 50,
            bewegung: 65,                // Mittel-hoch
            beruehrung: 65,              // Mittel-hoch - wenn zusammen, intensiv
            erholung: 75,                // Hoch - eigene Erholung wichtig
            sexueller_ausdruck: 70,      // Hoch - wenn zusammen
            sicherheit_physisch: 65,     // Mittel-hoch
            unterschlupf: 90             // Sehr hoch - eigenes Zuhause essentiell
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SICHERHEIT (6)
        // ═══════════════════════════════════════════════════════════════════════
        // LAT: Sicherheit durch Beziehung + eigenen Raum
        sicherheit: {
            bestaendigkeit: 70,          // Hoch - verlässliche Beziehung
            sich_sicher_fuehlen: 75,     // Hoch - durch Struktur
            schutz: 55,                  // Mittel - Selbstschutz
            stabilitaet: 70,             // Hoch - geplante Treffen
            leichtigkeit: 75,            // Hoch - keine Alltags-Reibung
            geborgenheit: 65             // Mittel-hoch - bei Treffen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ZUNEIGUNG (9)
        // ═══════════════════════════════════════════════════════════════════════
        // LAT: Qualität vor Quantität
        zuneigung: {
            waerme: 75,                  // Hoch - konzentriert
            wertschaetzung: 80,          // Hoch
            naehe: 70,                   // Hoch - wenn zusammen
            gesellschaft: 70,            // Hoch - aber nicht ständig
            intimitaet: 80,              // Hoch - intensive Treffen
            liebe: 80,                   // Hoch - feste Bindung
            fuersorge: 70,               // Hoch - aus der Distanz
            unterstuetzung: 75,          // Hoch
            fuereinander_da_sein: 75     // Hoch - wenn nötig
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERSTÄNDNIS (9)
        // ═══════════════════════════════════════════════════════════════════════
        verstaendnis: {
            akzeptanz: 80,               // Hoch - Lebensmodell akzeptiert
            mitgefuehl: 75,              // Hoch
            beruecksichtigung: 80,       // Hoch
            empathie: 75,                // Hoch
            vertrauen: 85,               // Sehr hoch - Basis von LAT
            beachtung: 75,               // Hoch
            gesehen_werden: 80,          // Hoch
            verstanden_werden: 80,       // Hoch
            harmonie: 70                 // Hoch - weniger Alltags-Konflikte
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FREIHEIT (5)
        // ═══════════════════════════════════════════════════════════════════════
        // LAT: KERN-KATEGORIE - hohe Autonomie im Alltag
        freiheit: {
            selbstbestimmung: 85,        // Sehr hoch - Alltag selbst gestalten
            waehlen_koennen: 80,         // Hoch
            unabhaengigkeit: 85,         // Sehr hoch - im Alltag
            raum_haben: 95,              // Sehr hoch - eigene Wohnung
            spontaneitaet: 75            // Hoch - flexible Treffen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // TEILNAHME (7)
        // ═══════════════════════════════════════════════════════════════════════
        teilnahme: {
            zusammenarbeit: 70,          // Hoch - bei Treffen
            kommunikation: 85,           // Sehr hoch - essentiell für LAT
            gemeinschaft: 65,            // Mittel-hoch - eigene + gemeinsame
            zugehoerigkeit: 75,          // Hoch - zum Partner
            gegenseitigkeit: 80,         // Hoch
            respekt: 85,                 // Sehr hoch - für Raumbedürfnis
            bedeutung_haben: 75          // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // MUSSE (4)
        // ═══════════════════════════════════════════════════════════════════════
        musse: {
            schoenheit: 70,              // Hoch
            freizeit: 85,                // Sehr hoch - eigene Zeit
            freude: 80,                  // Hoch - gemeinsam & alleine
            humor: 75                    // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // IDENTITÄT (14)
        // ═══════════════════════════════════════════════════════════════════════
        identitaet: {
            authentizitaet: 85,          // Sehr hoch - eigene Identität
            echtheit: 85,                // Sehr hoch
            integritaet: 85,             // Sehr hoch
            praesenz: 75,                // Hoch - wenn zusammen
            ordnung: 75,                 // Hoch - eigene Ordnung
            bewusstheit: 80,             // Hoch
            herausforderung: 60,         // Mittel
            klarheit: 80,                // Hoch - klare Vereinbarungen
            kompetenz: 80,               // Hoch
            effizienz: 75,               // Hoch - eigener Rhythmus
            wirksamkeit: 80,             // Hoch
            wachstum: 75,                // Hoch - individuell & gemeinsam
            sinn: 80,                    // Hoch
            beitrag_leisten: 75          // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ERSCHAFFEN (5)
        // ═══════════════════════════════════════════════════════════════════════
        erschaffen: {
            kreativitaet: 75,            // Hoch - eigene Projekte
            entdecken: 75,               // Hoch
            lernen: 75,                  // Hoch
            selbst_ausdruck: 80,         // Hoch
            anreize_bekommen: 70         // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERBUNDENHEIT (5)
        // ═══════════════════════════════════════════════════════════════════════
        verbundenheit: {
            leben_feiern: 80,            // Hoch
            inspiration: 75,             // Hoch
            trauer_ausdruecken: 65,      // Mittel-hoch
            einsehen: 70,                // Hoch
            anfang_ende: 70              // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // DYNAMIK (15)
        // ═══════════════════════════════════════════════════════════════════════
        // LAT: Ausgewogen, eher autonom
        dynamik: {
            kontrolle_ausueben: 55,      // Mittel - über eigenen Alltag
            hingabe: 55,                 // Mittel - bei Treffen
            fuehrung_geben: 50,          // Mittel
            gefuehrt_werden: 45,         // Mittel
            ritual: 70,                  // Hoch - Treffen-Rituale
            nachsorge: 70,               // Hoch
            grenzen_setzen: 85,          // Sehr hoch - Raum schützen
            grenzen_respektieren: 90,    // Sehr hoch
            intensitaet: 70,             // Hoch - konzentriert
            vertrauen_schenken: 80,      // Hoch
            verantwortung_uebernehmen: 75, // Hoch - geteilte Verantwortung
            sich_fallenlassen: 55,       // Mittel
            machtaustausch: 50,          // Mittel
            dienend_sein: 50,            // Mittel
            beschuetzen: 65              // Mittel-hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // LEBENSPLANUNG (15) - Kinder, Ehe, Wohnen, Familie
        // ═══════════════════════════════════════════════════════════════════════
        // LAT: Feste Beziehung, aber getrennt wohnen
        lebensplanung: {
            kinderwunsch: 50,            // Mittel - individuell
            elternschaft: 45,            // Mittel - kann kompliziert sein mit LAT
            fortpflanzung: 40,           // Niedrig-mittel
            fuersorge: 70,               // Hoch - aus der Distanz
            familie_gruenden: 40,        // Niedrig-mittel - erschwert durch LAT
            generativitaet: 55,          // Mittel
            erziehung_werte: 50,         // Mittel - wenn relevant
            verbindlichkeit: 75,         // Hoch - feste Beziehung
            langfristige_bindung: 80,    // Hoch - langfristig angelegt
            rechtliche_sicherheit: 50,   // Mittel - offen
            tradition_ehe: 40,           // Niedrig-mittel - nicht priorisiert
            oeffentliches_bekenntnis: 60, // Mittel - Beziehung anerkannt
            gemeinsamer_wohnraum: 10,    // Sehr niedrig - bewusst vermieden
            eigener_rueckzugsort: 100,   // Maximum - Kernbedürfnis
            haeuslichkeit: 75            // Hoch - im eigenen Zuhause
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FINANZEN & KARRIERE (10) - Geld, Arbeit, berufliche Entwicklung
        // ═══════════════════════════════════════════════════════════════════════
        // LAT: Getrennte Finanzen, eigene Karrieren
        finanzen_karriere: {
            finanzielle_unabhaengigkeit: 90, // Sehr hoch - jeder zahlt eigene Wohnung
            gemeinsame_finanzen: 25,     // Niedrig - meist getrennt
            versorger_rolle: 25,         // Niedrig - jeder für sich
            materielle_sicherheit: 75,   // Hoch - eigene Absicherung
            karriere_entwicklung: 80,    // Hoch - eigene Karriere
            berufliche_anerkennung: 75,  // Hoch
            work_life_balance: 80,       // Hoch - eigener Rhythmus
            gemeinsame_ziele: 60,        // Mittel-hoch - für die Beziehung
            erfolg: 75,                  // Hoch
            leistung: 70                 // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // KOMMUNIKATION & STIL (12) - Art des Austauschs
        // ═══════════════════════════════════════════════════════════════════════
        // LAT: Kommunikation über Distanz essentiell
        kommunikation_stil: {
            emotionale_offenheit: 75,    // Hoch - wichtig für die Distanz
            tiefe_gespraeche: 80,        // Hoch - bei Treffen
            small_talk: 60,              // Mittel
            konfliktbereitschaft: 70,    // Hoch - ansprechen statt schwelen
            konstruktive_kritik: 75,     // Hoch
            aktives_zuhoeren: 80,        // Hoch - bei Treffen präsent
            nonverbale_kommunikation: 70, // Hoch - wenn zusammen
            humor_ironie: 75,            // Hoch
            intellektueller_austausch: 75, // Hoch
            digitale_kommunikation: 90,  // Sehr hoch - wichtig für die Distanz
            verbale_anerkennung: 80,     // Hoch - Wertschätzung zeigen
            schweigen_aushalten: 75      // Hoch - Zeit alleine
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN (12) - Freunde, Familie, Gesellschaft
        // ═══════════════════════════════════════════════════════════════════════
        // LAT: Eigene und gemeinsame Kreise
        soziales_leben: {
            freundeskreis_pflege: 80,    // Hoch - eigene Freunde wichtig
            gemeinsame_freunde: 65,      // Mittel-hoch - auch gemeinsam
            familieneinbindung: 55,      // Mittel - kann Erklärung brauchen
            gesellschaftliches_engagement: 55, // Mittel
            networking: 65,              // Mittel-hoch
            gemeinsame_hobbys: 55,       // Mittel - bei Treffen
            individuelle_hobbys: 85,     // Sehr hoch - eigene Zeit
            gemeinsame_zeit: 65,         // Mittel-hoch - qualitativ
            zeit_fuer_sich: 90,          // Sehr hoch - viel Eigenzeit
            soziale_unterstuetzung: 70,  // Hoch - gegenseitig
            gemeinsame_erlebnisse: 75,   // Hoch - bewusst geplant
            alltagsteilung: 25           // Niedrig - getrennte Alltage
        },

        // ═══════════════════════════════════════════════════════════════════════
        // INTIMITÄT & BEZIEHUNG (12) - Nähe, Sexualität, Bindung
        // ═══════════════════════════════════════════════════════════════════════
        // LAT: Intensive Nähe bei Treffen, meist exklusiv
        intimitaet_beziehung: {
            koerpernaehe: 75,            // Hoch - wenn zusammen intensiv
            kuscheln: 75,                // Hoch - bei Treffen
            sexuelle_exklusivitaet: 75,  // Hoch - meist monogam
            sexuelle_offenheit: 60,      // Mittel-hoch
            leidenschaft: 80,            // Hoch - Wiedersehensfreude
            zaertlichkeit: 75,           // Hoch
            emotionale_tiefe: 80,        // Hoch - feste Bindung
            romantik: 80,                // Hoch - Dates bleiben besonders
            flirten: 45,                 // Mittel - meist mit Partner
            eifersucht_als_signal: 50,   // Mittel - Vertrauen wichtiger
            treue_werte: 75,             // Hoch - meist treu
            bindungsbereitschaft: 80     // Hoch - feste Beziehung
        },

        // ═══════════════════════════════════════════════════════════════════════
        // WERTE & HALTUNG (10) - Überzeugungen, Religion, Politik
        // ═══════════════════════════════════════════════════════════════════════
        // LAT: Moderat progressive Werte
        werte_haltung: {
            spiritualitaet: 55,          // Mittel
            religioese_praxis: 35,       // Niedrig-mittel
            politisches_engagement: 50,  // Mittel
            umweltbewusstsein: 60,       // Mittel-hoch
            traditionelle_werte: 35,     // Niedrig-mittel - bewusst anders
            moderne_werte: 75,           // Hoch - offenes Modell
            toleranz: 80,                // Hoch - akzeptiert verschiedene Wege
            offenheit_neues: 75,         // Hoch
            kulturelle_identitaet: 60,   // Mittel-hoch
            wertekongruenz: 70           // Hoch - lebt nach Überzeugung
        },

        // ═══════════════════════════════════════════════════════════════════════
        // PRAKTISCHES LEBEN (10) - Alltag, Organisation, Gesundheit
        // ═══════════════════════════════════════════════════════════════════════
        // LAT: Eigenständiger Alltag, Treffen planen
        praktisches_leben: {
            haushaltsaufteilung: 15,     // Sehr niedrig - jeder eigene Wohnung
            alltagsorganisation: 80,     // Hoch - gut organisiert
            gesundheitsbewusstsein: 70,  // Hoch
            ernaehrungsstil: 60,         // Mittel-hoch
            ordnung_sauberkeit: 70,      // Hoch - eigener Standard
            mobilitaet: 80,              // Hoch - Reisen zum Partner
            wohnort_flexibilitaet: 55,   // Mittel - je nach Distanz
            heimatverbundenheit: 65,     // Mittel-hoch - eigenes Zuhause
            reisen_abenteuer: 70,        // Hoch - gemeinsame Reisen
            routine_struktur: 75         // Hoch - geplante Abläufe
        }
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
