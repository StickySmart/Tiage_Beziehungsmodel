/**
 * DUO-FLEX - Der Flexible Ankernde
 *
 * Vollständiges Bedürfnis-Profil mit allen 88 Werten (0-100)
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
    id: "duo-flex",
    name: "Duo-Flex",
    beschreibung: "Sichere Basis mit Raum für Individualität. Balance zwischen Wir und Ich.",

    quellen: [
        "Secure Attachment (Main & Hesse, 1990)",
        "Optimal Distinctiveness Theory (Brewer, 1991)",
        "Differentiation of Self (Bowen, 1978)",
        "Relational Dialectics (Baxter & Montgomery, 1996)"
    ],

    beduerfnisse: {

        // ═══════════════════════════════════════════════════════════════════════
        // EXISTENZ (9)
        // ═══════════════════════════════════════════════════════════════════════
        existenz: {
            luft: 50,
            wasser: 50,
            nahrung: 50,
            bewegung: 65,                // Mittel-hoch - eigene & gemeinsame
            beruehrung: 75,              // Hoch - aber nicht übermäßig
            erholung: 70,                // Hoch
            sexueller_ausdruck: 75,      // Hoch - wichtig aber nicht dominant
            sicherheit_physisch: 65,     // Mittel-hoch
            unterschlupf: 70             // Hoch - gemeinsames Zuhause
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SICHERHEIT (6)
        // ═══════════════════════════════════════════════════════════════════════
        // Duo-Flex: Sichere Basis, aber flexibel
        sicherheit: {
            bestaendigkeit: 75,          // Hoch - aber nicht rigide
            sich_sicher_fuehlen: 80,     // Hoch - innere + äußere Sicherheit
            schutz: 65,                  // Mittel-hoch
            stabilitaet: 75,             // Hoch - flexible Stabilität
            leichtigkeit: 70,            // Hoch - Leichtigkeit wichtig
            geborgenheit: 75             // Hoch - aber nicht abhängig davon
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ZUNEIGUNG (9)
        // ═══════════════════════════════════════════════════════════════════════
        // Duo-Flex: Tiefe Zuneigung mit gesunden Grenzen
        zuneigung: {
            waerme: 80,                  // Hoch
            wertschaetzung: 85,          // Sehr hoch - gegenseitig
            naehe: 80,                   // Hoch - aber nicht verschmelzend
            gesellschaft: 75,            // Hoch
            intimitaet: 85,              // Sehr hoch
            liebe: 85,                   // Sehr hoch - reife Liebe
            fuersorge: 80,               // Hoch - ausgewogen
            unterstuetzung: 85,          // Sehr hoch
            fuereinander_da_sein: 85     // Sehr hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERSTÄNDNIS (9)
        // ═══════════════════════════════════════════════════════════════════════
        verstaendnis: {
            akzeptanz: 85,               // Sehr hoch - gegenseitig
            mitgefuehl: 80,              // Hoch
            beruecksichtigung: 85,       // Sehr hoch
            empathie: 80,                // Hoch
            vertrauen: 90,               // Sehr hoch - Basis der Flexibilität
            beachtung: 75,               // Hoch
            gesehen_werden: 80,          // Hoch
            verstanden_werden: 85,       // Sehr hoch
            harmonie: 70                 // Hoch - aber kann Konflikte aushalten
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FREIHEIT (5)
        // ═══════════════════════════════════════════════════════════════════════
        // Duo-Flex: Moderate Autonomie - Balance
        freiheit: {
            selbstbestimmung: 70,        // Hoch - individuelle Entscheidungen ok
            waehlen_koennen: 75,         // Hoch - Optionen wichtig
            unabhaengigkeit: 60,         // Mittel - verbundene Autonomie
            raum_haben: 75,              // Hoch - eigener Raum akzeptiert
            spontaneitaet: 65            // Mittel-hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // TEILNAHME (7)
        // ═══════════════════════════════════════════════════════════════════════
        teilnahme: {
            zusammenarbeit: 85,          // Sehr hoch
            kommunikation: 90,           // Sehr hoch - Schlüssel zur Flexibilität
            gemeinschaft: 70,            // Hoch - Paar + Freunde
            zugehoerigkeit: 80,          // Hoch - mehrfache Zugehörigkeiten
            gegenseitigkeit: 85,         // Sehr hoch
            respekt: 90,                 // Sehr hoch - für Grenzen
            bedeutung_haben: 75          // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // MUSSE (4)
        // ═══════════════════════════════════════════════════════════════════════
        musse: {
            schoenheit: 65,              // Mittel-hoch
            freizeit: 75,                // Hoch - alleine & zusammen
            freude: 80,                  // Hoch
            humor: 80                    // Hoch - Leichtigkeit
        },

        // ═══════════════════════════════════════════════════════════════════════
        // IDENTITÄT (14)
        // ═══════════════════════════════════════════════════════════════════════
        // Duo-Flex: Starke individuelle Identität innerhalb der Beziehung
        identitaet: {
            authentizitaet: 85,          // Sehr hoch - bleib du selbst
            echtheit: 85,                // Sehr hoch
            integritaet: 85,             // Sehr hoch
            praesenz: 75,                // Hoch
            ordnung: 65,                 // Mittel-hoch
            bewusstheit: 80,             // Hoch - Selbstreflexion
            herausforderung: 65,         // Mittel-hoch
            klarheit: 80,                // Hoch - klare Kommunikation
            kompetenz: 75,               // Hoch
            effizienz: 65,               // Mittel-hoch
            wirksamkeit: 75,             // Hoch
            wachstum: 80,                // Hoch - individuell & gemeinsam
            sinn: 80,                    // Hoch
            beitrag_leisten: 80          // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ERSCHAFFEN (5)
        // ═══════════════════════════════════════════════════════════════════════
        erschaffen: {
            kreativitaet: 70,            // Hoch
            entdecken: 75,               // Hoch - gemeinsam & alleine
            lernen: 75,                  // Hoch
            selbst_ausdruck: 75,         // Hoch - individuell erlaubt
            anreize_bekommen: 65         // Mittel-hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERBUNDENHEIT (5)
        // ═══════════════════════════════════════════════════════════════════════
        verbundenheit: {
            leben_feiern: 80,            // Hoch
            inspiration: 75,             // Hoch
            trauer_ausdruecken: 70,      // Hoch - gemeinsam verarbeiten
            einsehen: 70,                // Hoch
            anfang_ende: 70              // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // DYNAMIK (15)
        // ═══════════════════════════════════════════════════════════════════════
        // Duo-Flex: Ausgewogen, kann beides
        dynamik: {
            kontrolle_ausueben: 55,      // Mittel - situativ
            hingabe: 60,                 // Mittel - kann sich hingeben
            fuehrung_geben: 55,          // Mittel - wechselnd
            gefuehrt_werden: 55,         // Mittel - wechselnd
            ritual: 70,                  // Hoch - gemeinsame Rituale
            nachsorge: 80,               // Hoch - wichtig
            grenzen_setzen: 80,          // Hoch - gesunde Grenzen
            grenzen_respektieren: 90,    // Sehr hoch
            intensitaet: 70,             // Hoch - dosiert
            vertrauen_schenken: 85,      // Sehr hoch
            verantwortung_uebernehmen: 80, // Hoch - geteilte Verantwortung
            sich_fallenlassen: 65,       // Mittel-hoch
            machtaustausch: 55,          // Mittel - wenn gewünscht
            dienend_sein: 55,            // Mittel - gegenseitig
            beschuetzen: 75              // Hoch - gegenseitig
        },

        // ═══════════════════════════════════════════════════════════════════════
        // LEBENSPLANUNG (15) - Kinder, Ehe, Wohnen, Familie
        // ═══════════════════════════════════════════════════════════════════════
        // Duo-Flex: Offen für beides, individuelle Entscheidung
        lebensplanung: {
            kinderwunsch: 60,            // Mittel-hoch - offen
            elternschaft: 60,            // Mittel-hoch - wenn gewünscht
            fortpflanzung: 55,           // Mittel - nicht zwingend
            fuersorge: 75,               // Hoch - fürsorglich aber nicht aufopfernd
            familie_gruenden: 55,        // Mittel - offen
            generativitaet: 65,          // Mittel-hoch
            erziehung_werte: 60,         // Mittel-hoch - wenn relevant
            verbindlichkeit: 75,         // Hoch - aber flexibel
            langfristige_bindung: 75,    // Hoch - mit Entwicklungsraum
            rechtliche_sicherheit: 55,   // Mittel - nicht zwingend
            tradition_ehe: 45,           // Mittel - offen aber nicht priorisiert
            oeffentliches_bekenntnis: 60, // Mittel - schön aber nicht nötig
            gemeinsamer_wohnraum: 70,    // Hoch - aber mit eigenen Bereichen
            eigener_rueckzugsort: 80,    // Hoch - wichtig für Balance
            haeuslichkeit: 65            // Mittel-hoch - Zuhause wichtig
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FINANZEN & KARRIERE (10) - Geld, Arbeit, berufliche Entwicklung
        // ═══════════════════════════════════════════════════════════════════════
        // Duo-Flex: Geteilte und individuelle Finanzen
        finanzen_karriere: {
            finanzielle_unabhaengigkeit: 70, // Hoch - eigenes Einkommen wichtig
            gemeinsame_finanzen: 60,     // Mittel - teilweise gemeinsam
            versorger_rolle: 45,         // Mittel - gegenseitig
            materielle_sicherheit: 70,   // Hoch
            karriere_entwicklung: 75,    // Hoch - beide können Karriere machen
            berufliche_anerkennung: 70,  // Hoch
            work_life_balance: 80,       // Hoch - wichtig
            gemeinsame_ziele: 75,        // Hoch - aber nicht identisch
            erfolg: 70,                  // Hoch - individuell definiert
            leistung: 70                 // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // KOMMUNIKATION & STIL (12) - Art des Austauschs
        // ═══════════════════════════════════════════════════════════════════════
        // Duo-Flex: Offene, tiefe Kommunikation - Schlüssel zur Flexibilität
        kommunikation_stil: {
            emotionale_offenheit: 85,    // Sehr hoch - Kern der Flexibilität
            tiefe_gespraeche: 85,        // Sehr hoch - regelmäßig
            small_talk: 60,              // Mittel - auch ok
            konfliktbereitschaft: 80,    // Hoch - Konflikte ansprechen
            konstruktive_kritik: 85,     // Sehr hoch - offen dafür
            aktives_zuhoeren: 85,        // Sehr hoch - wichtig
            nonverbale_kommunikation: 75, // Hoch - achtsam
            humor_ironie: 75,            // Hoch - Leichtigkeit
            intellektueller_austausch: 75, // Hoch - stimulierend
            digitale_kommunikation: 65,  // Mittel-hoch
            verbale_anerkennung: 80,     // Hoch - wichtig
            schweigen_aushalten: 70      // Hoch - kann auch still sein
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SOZIALES LEBEN (12) - Freunde, Familie, Gesellschaft
        // ═══════════════════════════════════════════════════════════════════════
        // Duo-Flex: Eigene und gemeinsame Freunde, Balance
        soziales_leben: {
            freundeskreis_pflege: 80,    // Hoch - wichtig
            gemeinsame_freunde: 70,      // Hoch - schön aber nicht exklusiv
            familieneinbindung: 65,      // Mittel-hoch - in Balance
            gesellschaftliches_engagement: 60, // Mittel-hoch
            networking: 60,              // Mittel-hoch
            gemeinsame_hobbys: 65,       // Mittel-hoch - einige
            individuelle_hobbys: 80,     // Hoch - wichtig für Identität
            gemeinsame_zeit: 75,         // Hoch - qualitativ
            zeit_fuer_sich: 80,          // Hoch - ebenso wichtig
            soziale_unterstuetzung: 75,  // Hoch - gegenseitig
            gemeinsame_erlebnisse: 80,   // Hoch - verbindend
            alltagsteilung: 70           // Hoch - aber nicht verschmolzen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // INTIMITÄT & BEZIEHUNG (12) - Nähe, Sexualität, Bindung
        // ═══════════════════════════════════════════════════════════════════════
        // Duo-Flex: Tiefe Intimität mit individueller Freiheit
        intimitaet_beziehung: {
            koerpernaehe: 80,            // Hoch - wichtig
            kuscheln: 80,                // Hoch
            sexuelle_exklusivitaet: 70,  // Hoch - meist exklusiv, offen verhandelbar
            sexuelle_offenheit: 70,      // Hoch - kann Wünsche äußern
            leidenschaft: 80,            // Hoch - lebendig halten
            zaertlichkeit: 80,           // Hoch
            emotionale_tiefe: 85,        // Sehr hoch - Kern
            romantik: 70,                // Hoch - schätzt es
            flirten: 55,                 // Mittel - spielerisch ok
            eifersucht_als_signal: 50,   // Mittel - reflektiert damit umgehen
            treue_werte: 80,             // Hoch - nach eigener Definition
            bindungsbereitschaft: 80     // Hoch - bewusst gewählt
        },

        // ═══════════════════════════════════════════════════════════════════════
        // WERTE & HALTUNG (10) - Überzeugungen, Religion, Politik
        // ═══════════════════════════════════════════════════════════════════════
        // Duo-Flex: Progressive, respektiert Unterschiede
        werte_haltung: {
            spiritualitaet: 55,          // Mittel - individuell
            religioese_praxis: 40,       // Mittel-niedrig - offen
            politisches_engagement: 55,  // Mittel
            umweltbewusstsein: 65,       // Mittel-hoch
            traditionelle_werte: 45,     // Mittel - selektiv
            moderne_werte: 75,           // Hoch - offen für Neues
            toleranz: 85,                // Sehr hoch - akzeptiert Unterschiede
            offenheit_neues: 80,         // Hoch
            kulturelle_identitaet: 60,   // Mittel-hoch
            wertekongruenz: 75           // Hoch - aber respektiert Unterschiede
        },

        // ═══════════════════════════════════════════════════════════════════════
        // PRAKTISCHES LEBEN (10) - Alltag, Organisation, Gesundheit
        // ═══════════════════════════════════════════════════════════════════════
        // Duo-Flex: Geteilte Verantwortung mit Flexibilität
        praktisches_leben: {
            haushaltsaufteilung: 80,     // Hoch - fair geteilt
            alltagsorganisation: 75,     // Hoch - koordiniert
            gesundheitsbewusstsein: 70,  // Hoch
            ernaehrungsstil: 60,         // Mittel-hoch - Kompromisse
            ordnung_sauberkeit: 65,      // Mittel-hoch
            mobilitaet: 70,              // Hoch - flexibel
            wohnort_flexibilitaet: 65,   // Mittel-hoch - verhandelbar
            heimatverbundenheit: 60,     // Mittel-hoch
            reisen_abenteuer: 75,        // Hoch - gemeinsam & alleine
            routine_struktur: 65         // Mittel-hoch - flexible Routinen
        }
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
