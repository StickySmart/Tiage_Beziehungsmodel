/**
 * SOLOPOLY - Der Autonome Liebende
 *
 * Vollständiges Bedürfnis-Profil mit allen 88 Werten (0-100)
 *
 * WISSENSCHAFTLICHE GRUNDLAGEN:
 * ─────────────────────────────────────────────────────────────────────────────
 * - Solo Polyamory Research (Gahran, 2017): Primär-Partner = Selbst
 * - Self-Determination Theory: Höchste Autonomie-Orientierung
 * - Attachment: Secure + High Avoidance (Dismissive-Secure Hybrid)
 * - Relationship Anarchy Light: Keine Hierarchien, aber emotional verbunden
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * CHARAKTERISTIK:
 * - Eigener primärer Partner ist man selbst
 * - Liebesfähig ohne Abhängigkeit
 * - Mehrere bedeutsame Verbindungen möglich
 * - Kein Zusammenwohnen, keine Lebensplanung mit anderen
 */

const SolopolyProfil = {
    id: "solopoly",
    name: "Solopoly",
    beschreibung: "Autonomie als Fundament. Liebesfähig ohne Abhängigkeit. Ich bin mein eigener primärer Partner.",

    quellen: [
        "Solo Polyamory (Gahran, 2017)",
        "Self-Determination Theory (Deci & Ryan, 2000)",
        "CNM Research (Moors et al., 2017)",
        "Singlehood Studies (DePaulo, 2006)"
    ],

    beduerfnisse: {

        // ═══════════════════════════════════════════════════════════════════════
        // EXISTENZ (9)
        // ═══════════════════════════════════════════════════════════════════════
        existenz: {
            luft: 50,
            wasser: 50,
            nahrung: 50,
            bewegung: 75,                // Hoch - körperliche Autonomie
            beruehrung: 60,              // Mittel - dosiert, nicht abhängig
            erholung: 75,                // Hoch - Selbstfürsorge
            sexueller_ausdruck: 75,      // Hoch - frei, aber nicht zentral
            sicherheit_physisch: 65,     // Mittel-hoch - Selbstschutz
            unterschlupf: 85             // Sehr hoch - eigenes Zuhause essentiell
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SICHERHEIT (6)
        // ═══════════════════════════════════════════════════════════════════════
        // Solopoly: Innere Sicherheit, wenig externe Abhängigkeit
        sicherheit: {
            bestaendigkeit: 55,          // Mittel - flexibel
            sich_sicher_fuehlen: 70,     // Hoch - in sich selbst
            schutz: 40,                  // Niedrig-mittel - braucht keinen Beschützer
            stabilitaet: 60,             // Mittel - eigene Stabilität
            leichtigkeit: 80,            // Hoch - Unbeschwertheit wichtig
            geborgenheit: 45             // Niedrig-mittel - in sich selbst
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ZUNEIGUNG (9)
        // ═══════════════════════════════════════════════════════════════════════
        // Solopoly: Liebesfähig aber nicht bedürftig
        zuneigung: {
            waerme: 65,                  // Mittel-hoch - kann geben
            wertschaetzung: 70,          // Hoch - gegenseitig
            naehe: 55,                   // Mittel - dosiert
            gesellschaft: 65,            // Mittel-hoch - selektiv
            intimitaet: 65,              // Mittel-hoch - situativ
            liebe: 70,                   // Hoch - aber nicht exklusiv
            fuersorge: 60,               // Mittel - gegenseitig
            unterstuetzung: 60,          // Mittel - ohne Verpflichtung
            fuereinander_da_sein: 55     // Mittel - aber mit Grenzen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERSTÄNDNIS (9)
        // ═══════════════════════════════════════════════════════════════════════
        verstaendnis: {
            akzeptanz: 80,               // Hoch - Lebensmodell akzeptiert
            mitgefuehl: 65,              // Mittel-hoch
            beruecksichtigung: 70,       // Hoch
            empathie: 65,                // Mittel-hoch
            vertrauen: 70,               // Hoch - aber vorsichtig
            beachtung: 65,               // Mittel-hoch
            gesehen_werden: 75,          // Hoch - als Individuum
            verstanden_werden: 70,       // Hoch
            harmonie: 55                 // Mittel - kann Konflikte
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FREIHEIT (5)
        // ═══════════════════════════════════════════════════════════════════════
        // Solopoly: KERN-KATEGORIE - höchste Werte
        freiheit: {
            selbstbestimmung: 95,        // Sehr hoch - Kernwert
            waehlen_koennen: 95,         // Sehr hoch - alle Optionen offen
            unabhaengigkeit: 95,         // Sehr hoch - emotional & praktisch
            raum_haben: 95,              // Sehr hoch - eigener Raum unverhandelbar
            spontaneitaet: 85            // Sehr hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // TEILNAHME (7)
        // ═══════════════════════════════════════════════════════════════════════
        teilnahme: {
            zusammenarbeit: 60,          // Mittel - situativ
            kommunikation: 80,           // Hoch - ehrlich, klar
            gemeinschaft: 65,            // Mittel-hoch - Netzwerk wichtig
            zugehoerigkeit: 55,          // Mittel - ohne Verpflichtung
            gegenseitigkeit: 70,         // Hoch - fair
            respekt: 85,                 // Sehr hoch - für alle Grenzen
            bedeutung_haben: 70          // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // MUSSE (4)
        // ═══════════════════════════════════════════════════════════════════════
        musse: {
            schoenheit: 70,              // Hoch
            freizeit: 90,                // Sehr hoch - eigene Zeit wertvoll
            freude: 85,                  // Sehr hoch
            humor: 75                    // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // IDENTITÄT (14)
        // ═══════════════════════════════════════════════════════════════════════
        identitaet: {
            authentizitaet: 90,          // Sehr hoch
            echtheit: 90,                // Sehr hoch
            integritaet: 85,             // Sehr hoch
            praesenz: 75,                // Hoch
            ordnung: 60,                 // Mittel - eigene Ordnung
            bewusstheit: 85,             // Sehr hoch - Selbstreflexion
            herausforderung: 75,         // Hoch
            klarheit: 85,                // Sehr hoch - klare Grenzen
            kompetenz: 85,               // Sehr hoch
            effizienz: 70,               // Hoch
            wirksamkeit: 85,             // Sehr hoch
            wachstum: 85,                // Sehr hoch
            sinn: 80,                    // Hoch - eigener Sinn
            beitrag_leisten: 70          // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ERSCHAFFEN (5)
        // ═══════════════════════════════════════════════════════════════════════
        erschaffen: {
            kreativitaet: 80,            // Hoch
            entdecken: 85,               // Sehr hoch
            lernen: 80,                  // Hoch
            selbst_ausdruck: 90,         // Sehr hoch
            anreize_bekommen: 75         // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERBUNDENHEIT (5)
        // ═══════════════════════════════════════════════════════════════════════
        verbundenheit: {
            leben_feiern: 80,            // Hoch
            inspiration: 80,             // Hoch
            trauer_ausdruecken: 55,      // Mittel - privat
            einsehen: 70,                // Hoch
            anfang_ende: 65              // Mittel-hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // DYNAMIK (15)
        // ═══════════════════════════════════════════════════════════════════════
        // Solopoly: Eher autonom, kann beides situativ
        dynamik: {
            kontrolle_ausueben: 60,      // Mittel - über eigenes Leben
            hingabe: 40,                 // Niedrig-mittel - temporär ok
            fuehrung_geben: 55,          // Mittel
            gefuehrt_werden: 35,         // Niedrig - bevorzugt Autonomie
            ritual: 50,                  // Mittel - eigene Rituale
            nachsorge: 60,               // Mittel - wichtig
            grenzen_setzen: 90,          // Sehr hoch - essentiell
            grenzen_respektieren: 85,    // Sehr hoch
            intensitaet: 65,             // Mittel-hoch - dosiert
            vertrauen_schenken: 55,      // Mittel - vorsichtig
            verantwortung_uebernehmen: 80, // Hoch - für sich selbst
            sich_fallenlassen: 40,       // Niedrig-mittel
            machtaustausch: 45,          // Mittel - situativ
            dienend_sein: 35,            // Niedrig
            beschuetzen: 55              // Mittel
        }
    },

    kernwerte: ["Autonomie", "Authentizität", "Freiheit", "Selbstliebe", "Ehrlichkeit"],
    vermeidet: ["Abhängigkeit", "Verpflichtung", "Zusammenleben", "Verschmelzung", "Hierarchien"]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = SolopolyProfil;
}
if (typeof window !== 'undefined') {
    window.SolopolyProfil = SolopolyProfil;
}
