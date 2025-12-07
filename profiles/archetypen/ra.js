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
