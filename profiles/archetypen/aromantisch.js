/**
 * AROMANTISCH - Der Romantik-Unabhängige
 *
 * Vollständiges Bedürfnis-Profil mit allen 88 Werten (0-100)
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
        // EXISTENZ (9)
        // ═══════════════════════════════════════════════════════════════════════
        existenz: {
            luft: 50,
            wasser: 50,
            nahrung: 50,
            bewegung: 70,                // Hoch
            beruehrung: 45,              // Niedrig-mittel - nicht romantisch
            erholung: 75,                // Hoch
            sexueller_ausdruck: 40,      // Niedrig-mittel - variabel (aro ≠ ace)
            sicherheit_physisch: 65,     // Mittel-hoch
            unterschlupf: 70             // Hoch - eigener Raum
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SICHERHEIT (6)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Innere Sicherheit, nicht durch Romantik
        sicherheit: {
            bestaendigkeit: 60,          // Mittel - durch Freundschaften
            sich_sicher_fuehlen: 70,     // Hoch - in sich selbst
            schutz: 50,                  // Mittel
            stabilitaet: 65,             // Mittel-hoch - eigene Stabilität
            leichtigkeit: 80,            // Hoch - frei von romantischem Druck
            geborgenheit: 50             // Mittel - durch Freunde
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ZUNEIGUNG (9)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Platonische Zuneigung, keine romantische
        zuneigung: {
            waerme: 60,                  // Mittel - platonisch
            wertschaetzung: 70,          // Hoch - Freunde wertschätzen
            naehe: 50,                   // Mittel - emotional, nicht romantisch
            gesellschaft: 70,            // Hoch - Freundeskreis wichtig
            intimitaet: 35,              // Niedrig - keine romantische Intimität
            liebe: 30,                   // Niedrig - romantische Liebe nicht gefühlt
            fuersorge: 65,               // Mittel-hoch - für Freunde
            unterstuetzung: 70,          // Hoch - Freundschaftsnetzwerk
            fuereinander_da_sein: 65     // Mittel-hoch - für Freunde
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERSTÄNDNIS (9)
        // ═══════════════════════════════════════════════════════════════════════
        verstaendnis: {
            akzeptanz: 85,               // Sehr hoch - Selbstakzeptanz wichtig
            mitgefuehl: 65,              // Mittel-hoch
            beruecksichtigung: 70,       // Hoch
            empathie: 65,                // Mittel-hoch
            vertrauen: 70,               // Hoch - in Freundschaften
            beachtung: 65,               // Mittel-hoch
            gesehen_werden: 80,          // Hoch - als vollständig ohne Romantik
            verstanden_werden: 85,       // Sehr hoch - oft missverstanden
            harmonie: 60                 // Mittel
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FREIHEIT (5)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Hohe Autonomie
        freiheit: {
            selbstbestimmung: 90,        // Sehr hoch
            waehlen_koennen: 85,         // Sehr hoch - eigenen Weg wählen
            unabhaengigkeit: 90,         // Sehr hoch - von romantischen Normen
            raum_haben: 85,              // Sehr hoch
            spontaneitaet: 80            // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // TEILNAHME (7)
        // ═══════════════════════════════════════════════════════════════════════
        teilnahme: {
            zusammenarbeit: 65,          // Mittel-hoch
            kommunikation: 75,           // Hoch - Identität erklären
            gemeinschaft: 75,            // Hoch - Aro/Ace Community
            zugehoerigkeit: 70,          // Hoch - zu Freunden, Community
            gegenseitigkeit: 70,         // Hoch - in Freundschaften
            respekt: 85,                 // Sehr hoch - für alle Lebensformen
            bedeutung_haben: 75          // Hoch - durch andere Beiträge
        },

        // ═══════════════════════════════════════════════════════════════════════
        // MUSSE (4)
        // ═══════════════════════════════════════════════════════════════════════
        musse: {
            schoenheit: 70,              // Hoch
            freizeit: 85,                // Sehr hoch - eigene Zeit
            freude: 80,                  // Hoch - nicht von Romantik abhängig
            humor: 75                    // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // IDENTITÄT (14)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Starke Selbstidentität
        identitaet: {
            authentizitaet: 95,          // Sehr hoch - eigene Identität leben
            echtheit: 95,                // Sehr hoch
            integritaet: 90,             // Sehr hoch - zu sich stehen
            praesenz: 75,                // Hoch
            ordnung: 65,                 // Mittel-hoch
            bewusstheit: 90,             // Sehr hoch - Selbstreflexion
            herausforderung: 70,         // Hoch - Normen hinterfragen
            klarheit: 85,                // Sehr hoch - eigene Identität
            kompetenz: 80,               // Hoch
            effizienz: 70,               // Hoch
            wirksamkeit: 80,             // Hoch
            wachstum: 80,                // Hoch
            sinn: 85,                    // Sehr hoch - Sinn jenseits Romantik
            beitrag_leisten: 75          // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ERSCHAFFEN (5)
        // ═══════════════════════════════════════════════════════════════════════
        erschaffen: {
            kreativitaet: 80,            // Hoch
            entdecken: 80,               // Hoch
            lernen: 80,                  // Hoch
            selbst_ausdruck: 85,         // Sehr hoch
            anreize_bekommen: 75         // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERBUNDENHEIT (5)
        // ═══════════════════════════════════════════════════════════════════════
        verbundenheit: {
            leben_feiern: 80,            // Hoch
            inspiration: 80,             // Hoch
            trauer_ausdruecken: 55,      // Mittel - individuell
            einsehen: 75,                // Hoch
            anfang_ende: 65              // Mittel-hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // DYNAMIK (15)
        // ═══════════════════════════════════════════════════════════════════════
        // Aromantisch: Meist autonom, Dynamik in Freundschaften möglich
        dynamik: {
            kontrolle_ausueben: 55,      // Mittel
            hingabe: 35,                 // Niedrig - keine romantische Hingabe
            fuehrung_geben: 50,          // Mittel
            gefuehrt_werden: 35,         // Niedrig
            ritual: 50,                  // Mittel - Freundschafts-Rituale
            nachsorge: 55,               // Mittel
            grenzen_setzen: 90,          // Sehr hoch - wichtig
            grenzen_respektieren: 90,    // Sehr hoch
            intensitaet: 50,             // Mittel - anders als romantisch
            vertrauen_schenken: 60,      // Mittel - in Freundschaften
            verantwortung_uebernehmen: 75, // Hoch - für sich selbst
            sich_fallenlassen: 35,       // Niedrig
            machtaustausch: 35,          // Niedrig
            dienend_sein: 40,            // Niedrig-mittel
            beschuetzen: 55              // Mittel
        }
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
