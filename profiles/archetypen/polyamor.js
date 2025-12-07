/**
 * POLYAMOR - Der Netzwerk-Liebende
 *
 * Vollständiges Bedürfnis-Profil mit allen 88 Werten (0-100)
 *
 * WISSENSCHAFTLICHE GRUNDLAGEN:
 * ─────────────────────────────────────────────────────────────────────────────
 * - Polyamory Research (Moors et al., 2017): Higher openness, lower jealousy
 * - Attachment: Secure with multiple figures (Fraley, 2019)
 * - Compersion Studies: Joy from partner's other relationships
 * - Communal Orientation Scale (Clark et al.): High communal sharing
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * CHARAKTERISTIK:
 * - Mehrere gleichwertige romantische Beziehungen
 * - Hohe emotionale Kapazität
 * - Kommunikation und Transparenz essentiell
 * - Compersion (Mitfreude) statt Eifersucht
 */

const PolyamorProfil = {
    id: "polyamor",
    name: "Polyamor",
    beschreibung: "Liebe multipliziert sich. Mehrere tiefe, gleichwertige Verbindungen mit Transparenz und Compersion.",

    quellen: [
        "Consensual Non-Monogamy Research (Moors et al., 2017)",
        "Attachment in Polyamory (Fraley, 2019)",
        "Compersion Studies (Mogilski et al., 2019)",
        "Communal Orientation (Clark et al., 1987)"
    ],

    beduerfnisse: {

        // ═══════════════════════════════════════════════════════════════════════
        // EXISTENZ (9)
        // ═══════════════════════════════════════════════════════════════════════
        existenz: {
            luft: 50,
            wasser: 50,
            nahrung: 50,
            bewegung: 60,                // Mittel
            beruehrung: 80,              // Hoch - mehrere Quellen
            erholung: 70,                // Hoch - wichtig bei komplexem Leben
            sexueller_ausdruck: 80,      // Hoch - wichtig, vielfältig
            sicherheit_physisch: 65,     // Mittel-hoch
            unterschlupf: 70             // Hoch - kann variieren
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SICHERHEIT (6)
        // ═══════════════════════════════════════════════════════════════════════
        // Polyamor: Sicherheit durch Netzwerk, nicht durch Exklusivität
        sicherheit: {
            bestaendigkeit: 70,          // Hoch - verlässliche Verbindungen
            sich_sicher_fuehlen: 75,     // Hoch - durch Transparenz
            schutz: 60,                  // Mittel - Netzwerk schützt
            stabilitaet: 65,             // Mittel-hoch - flexible Stabilität
            leichtigkeit: 70,            // Hoch
            geborgenheit: 70             // Hoch - multiple Quellen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ZUNEIGUNG (9)
        // ═══════════════════════════════════════════════════════════════════════
        // Polyamor: KERN-KATEGORIE - hohe emotionale Kapazität
        zuneigung: {
            waerme: 85,                  // Sehr hoch - viel zu geben
            wertschaetzung: 85,          // Sehr hoch - alle Partner wertschätzen
            naehe: 85,                   // Sehr hoch - zu mehreren
            gesellschaft: 85,            // Sehr hoch - reiches Sozialleben
            intimitaet: 90,              // Sehr hoch - tiefe Verbindungen
            liebe: 95,                   // Sehr hoch - Kern des Lebensmodells
            fuersorge: 85,               // Sehr hoch - für alle Partner
            unterstuetzung: 85,          // Sehr hoch - Netzwerk
            fuereinander_da_sein: 85     // Sehr hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERSTÄNDNIS (9)
        // ═══════════════════════════════════════════════════════════════════════
        verstaendnis: {
            akzeptanz: 90,               // Sehr hoch - akzeptiert andere
            mitgefuehl: 85,              // Sehr hoch - Compersion
            beruecksichtigung: 90,       // Sehr hoch - alle berücksichtigen
            empathie: 90,                // Sehr hoch - für alle Partner
            vertrauen: 90,               // Sehr hoch - Basis von Poly
            beachtung: 75,               // Hoch
            gesehen_werden: 80,          // Hoch
            verstanden_werden: 85,       // Sehr hoch
            harmonie: 75                 // Hoch - zwischen allen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FREIHEIT (5)
        // ═══════════════════════════════════════════════════════════════════════
        // Polyamor: Hohe Freiheit innerhalb von Vereinbarungen
        freiheit: {
            selbstbestimmung: 80,        // Hoch - eigene Entscheidungen
            waehlen_koennen: 85,         // Sehr hoch - keine Exklusivität
            unabhaengigkeit: 65,         // Mittel-hoch - verbunden, nicht abhängig
            raum_haben: 70,              // Hoch - eigener Raum wichtig
            spontaneitaet: 70            // Hoch - innerhalb von Kommunikation
        },

        // ═══════════════════════════════════════════════════════════════════════
        // TEILNAHME (7)
        // ═══════════════════════════════════════════════════════════════════════
        // Polyamor: Starke Gemeinschaftsorientierung
        teilnahme: {
            zusammenarbeit: 85,          // Sehr hoch - Polykül koordinieren
            kommunikation: 95,           // Sehr hoch - essentiell
            gemeinschaft: 90,            // Sehr hoch - Poly-Community
            zugehoerigkeit: 85,          // Sehr hoch - zu mehreren
            gegenseitigkeit: 90,         // Sehr hoch
            respekt: 90,                 // Sehr hoch - für alle Beziehungen
            bedeutung_haben: 80          // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // MUSSE (4)
        // ═══════════════════════════════════════════════════════════════════════
        musse: {
            schoenheit: 70,              // Hoch
            freizeit: 65,                // Mittel-hoch - Zeit ist limitiert
            freude: 85,                  // Sehr hoch - geteilte Freude
            humor: 80                    // Hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // IDENTITÄT (14)
        // ═══════════════════════════════════════════════════════════════════════
        identitaet: {
            authentizitaet: 85,          // Sehr hoch
            echtheit: 85,                // Sehr hoch
            integritaet: 90,             // Sehr hoch - Ehrlichkeit zentral
            praesenz: 80,                // Hoch - präsent für alle
            ordnung: 75,                 // Hoch - Kalender-Management
            bewusstheit: 85,             // Sehr hoch - Selbstreflexion
            herausforderung: 70,         // Hoch
            klarheit: 85,                // Sehr hoch - klare Kommunikation
            kompetenz: 75,               // Hoch
            effizienz: 75,               // Hoch - Zeit-Management
            wirksamkeit: 75,             // Hoch
            wachstum: 85,                // Sehr hoch - durch Beziehungen
            sinn: 85,                    // Sehr hoch - Liebe als Sinn
            beitrag_leisten: 85          // Sehr hoch
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ERSCHAFFEN (5)
        // ═══════════════════════════════════════════════════════════════════════
        erschaffen: {
            kreativitaet: 75,            // Hoch - kreative Beziehungsformen
            entdecken: 80,               // Hoch - neue Dynamiken
            lernen: 85,                  // Sehr hoch - von allen Partnern
            selbst_ausdruck: 80,         // Hoch
            anreize_bekommen: 80         // Hoch - vielfältige Stimulation
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERBUNDENHEIT (5)
        // ═══════════════════════════════════════════════════════════════════════
        verbundenheit: {
            leben_feiern: 90,            // Sehr hoch - mit allen
            inspiration: 85,             // Sehr hoch
            trauer_ausdruecken: 75,      // Hoch - Netzwerk unterstützt
            einsehen: 75,                // Hoch
            anfang_ende: 75              // Hoch - viele Übergänge
        },

        // ═══════════════════════════════════════════════════════════════════════
        // DYNAMIK (15)
        // ═══════════════════════════════════════════════════════════════════════
        // Polyamor: Flexibel, kann verschiedene Rollen
        dynamik: {
            kontrolle_ausueben: 50,      // Mittel - situativ
            hingabe: 65,                 // Mittel-hoch - kann sich hingeben
            fuehrung_geben: 55,          // Mittel
            gefuehrt_werden: 55,         // Mittel
            ritual: 75,                  // Hoch - verschiedene Rituale
            nachsorge: 85,               // Sehr hoch - wichtig
            grenzen_setzen: 85,          // Sehr hoch - essentiell
            grenzen_respektieren: 95,    // Sehr hoch - absolut zentral
            intensitaet: 80,             // Hoch - tiefe Verbindungen
            vertrauen_schenken: 85,      // Sehr hoch
            verantwortung_uebernehmen: 85, // Sehr hoch - für alle
            sich_fallenlassen: 65,       // Mittel-hoch
            machtaustausch: 60,          // Mittel - offen
            dienend_sein: 60,            // Mittel
            beschuetzen: 75              // Hoch
        }
    },

    kernwerte: ["Liebe", "Transparenz", "Kommunikation", "Compersion", "Vielfalt"],
    vermeidet: ["Besitzdenken", "Eifersucht", "Exklusivität", "Heimlichkeit", "Hierarchie-Zwang"]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = PolyamorProfil;
}
if (typeof window !== 'undefined') {
    window.PolyamorProfil = PolyamorProfil;
}
