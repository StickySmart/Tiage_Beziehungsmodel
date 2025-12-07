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
