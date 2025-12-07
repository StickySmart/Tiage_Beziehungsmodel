/**
 * DUO - Der Verschmelzende
 *
 * Vollständiges Bedürfnis-Profil mit allen 88 Werten (0-100)
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

    beduerfnisse: {

        // ═══════════════════════════════════════════════════════════════════════
        // EXISTENZ (9) - Grundlegende physische Bedürfnisse
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Körperliche Nähe und gemeinsame Versorgung wichtig
        existenz: {
            luft: 50,                    // Universal, neutral
            wasser: 50,                  // Universal, neutral
            nahrung: 55,                 // Leicht erhöht - gemeinsame Mahlzeiten
            bewegung: 55,                // Mittel - gemeinsame Aktivitäten
            beruehrung: 90,              // Sehr hoch - körperliche Nähe essentiell
            erholung: 75,                // Hoch - gemeinsame Ruhezeiten
            sexueller_ausdruck: 80,      // Hoch - Intimität als Bindung
            sicherheit_physisch: 75,     // Hoch - gegenseitiger Schutz
            unterschlupf: 80             // Hoch - gemeinsames Zuhause wichtig
        },

        // ═══════════════════════════════════════════════════════════════════════
        // SICHERHEIT (6) - Emotionale und psychische Sicherheit
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: KERN-KATEGORIE - Sicherheit durch Beziehung
        // Quelle: Attachment Theory - secure base function
        sicherheit: {
            bestaendigkeit: 90,          // Sehr hoch - Verlässlichkeit wichtig
            sich_sicher_fuehlen: 95,     // Sehr hoch - Kernbedürfnis
            schutz: 85,                  // Sehr hoch - beschützt werden wollen
            stabilitaet: 95,             // Sehr hoch - Beziehung als Anker
            leichtigkeit: 60,            // Mittel - Sicherheit > Leichtigkeit
            geborgenheit: 95             // Sehr hoch - emotionale Heimat
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ZUNEIGUNG (9) - Liebe, Nähe und emotionale Verbindung
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: KERN-KATEGORIE - höchste Werte
        // Quelle: Triangular Theory - High Intimacy
        zuneigung: {
            waerme: 90,                  // Sehr hoch - emotionale Wärme
            wertschaetzung: 85,          // Sehr hoch - gegenseitige Wertschätzung
            naehe: 95,                   // Sehr hoch - maximale Nähe gewünscht
            gesellschaft: 85,            // Sehr hoch - gemeinsam sein
            intimitaet: 95,              // Sehr hoch - tiefe Verbindung
            liebe: 95,                   // Sehr hoch - Kern des Lebens
            fuersorge: 90,               // Sehr hoch - für Partner sorgen
            unterstuetzung: 90,          // Sehr hoch - gegenseitige Stütze
            fuereinander_da_sein: 95     // Sehr hoch - Priorität
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERSTÄNDNIS (9) - Gesehen und verstanden werden
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Tiefes gegenseitiges Verständnis gewünscht
        // Quelle: Self-Expansion - Partner versteht "wahres Selbst"
        verstaendnis: {
            akzeptanz: 90,               // Sehr hoch - bedingungslose Akzeptanz
            mitgefuehl: 85,              // Sehr hoch - emotionale Resonanz
            beruecksichtigung: 85,       // Sehr hoch - Rücksichtnahme
            empathie: 90,                // Sehr hoch - sich einfühlen
            vertrauen: 95,               // Sehr hoch - absolutes Vertrauen
            beachtung: 80,               // Hoch - Aufmerksamkeit
            gesehen_werden: 85,          // Sehr hoch - wirklich gesehen
            verstanden_werden: 90,       // Sehr hoch - tief verstanden
            harmonie: 90                 // Sehr hoch - Konflikt vermeiden
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FREIHEIT (5) - Autonomie und Selbstbestimmung
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Niedrige Autonomie-Bedürfnisse - Wir > Ich
        // Quelle: Interdependence - high mutuality preferred
        freiheit: {
            selbstbestimmung: 45,        // Niedrig-mittel - gemeinsame Entscheidungen
            waehlen_koennen: 50,         // Mittel - mit Partner abstimmen
            unabhaengigkeit: 35,         // Niedrig - Abhängigkeit akzeptiert
            raum_haben: 40,              // Niedrig - wenig Raumbedürfnis
            spontaneitaet: 45            // Niedrig-mittel - Planbarkeit bevorzugt
        },

        // ═══════════════════════════════════════════════════════════════════════
        // TEILNAHME (7) - Gemeinschaft und Zugehörigkeit
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Beziehung als primäre Gemeinschaft
        teilnahme: {
            zusammenarbeit: 85,          // Sehr hoch - Teamwork
            kommunikation: 85,           // Sehr hoch - offene Kommunikation
            gemeinschaft: 70,            // Hoch - aber Paar-zentriert
            zugehoerigkeit: 90,          // Sehr hoch - Zugehörigkeit zum Partner
            gegenseitigkeit: 90,         // Sehr hoch - Geben und Nehmen
            respekt: 85,                 // Sehr hoch - gegenseitiger Respekt
            bedeutung_haben: 80          // Hoch - wichtig für Partner sein
        },

        // ═══════════════════════════════════════════════════════════════════════
        // MUSSE (4) - Erholung, Freude und Genuss
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Gemeinsamer Genuss, weniger alleine
        musse: {
            schoenheit: 70,              // Hoch - gemeinsam genießen
            freizeit: 75,                // Hoch - aber zusammen
            freude: 85,                  // Sehr hoch - geteilte Freude
            humor: 80                    // Hoch - gemeinsames Lachen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // IDENTITÄT (14) - Selbstverwirklichung und Sinn
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Identität durch Beziehung definiert
        // Quelle: Self-Expansion - Partner erweitert Selbst
        identitaet: {
            authentizitaet: 70,          // Hoch - aber angepasst an Partner
            echtheit: 75,                // Hoch - innerhalb der Beziehung
            integritaet: 80,             // Hoch - Treue als Wert
            praesenz: 75,                // Hoch - präsent für Partner
            ordnung: 70,                 // Hoch - gemeinsame Struktur
            bewusstheit: 65,             // Mittel-hoch
            herausforderung: 50,         // Mittel - Stabilität bevorzugt
            klarheit: 70,                // Hoch - klare Erwartungen
            kompetenz: 60,               // Mittel - als Partner kompetent
            effizienz: 55,               // Mittel
            wirksamkeit: 60,             // Mittel - Einfluss in Beziehung
            wachstum: 65,                // Mittel-hoch - gemeinsam wachsen
            sinn: 80,                    // Hoch - Beziehung gibt Sinn
            beitrag_leisten: 75          // Hoch - für Beziehung beitragen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // ERSCHAFFEN (5) - Kreativität und Lernen
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Gemeinsames Erschaffen, weniger individuell
        erschaffen: {
            kreativitaet: 55,            // Mittel - wenn gemeinsam
            entdecken: 60,               // Mittel - zusammen entdecken
            lernen: 60,                  // Mittel - voneinander lernen
            selbst_ausdruck: 55,         // Mittel - durch Beziehung
            anreize_bekommen: 55         // Mittel - vom Partner
        },

        // ═══════════════════════════════════════════════════════════════════════
        // VERBUNDENHEIT (5) - Tiefe existenzielle Verbindung
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Tiefe Verbundenheit durch Partner
        verbundenheit: {
            leben_feiern: 80,            // Hoch - gemeinsam feiern
            inspiration: 65,             // Mittel-hoch - durch Partner
            trauer_ausdruecken: 75,      // Hoch - gemeinsam trauern
            einsehen: 60,                // Mittel - mit Unterstützung
            anfang_ende: 70              // Hoch - Lebensphasen zusammen
        },

        // ═══════════════════════════════════════════════════════════════════════
        // DYNAMIK (15) - Machtdynamik und bewusster Austausch
        // ═══════════════════════════════════════════════════════════════════════
        // Duos: Tendenz zu Hingabe und Geführt-Werden, sucht Schutz
        // Quelle: Attachment - seeking safe haven
        dynamik: {
            kontrolle_ausueben: 35,      // Niedrig - gibt Kontrolle ab
            hingabe: 75,                 // Hoch - kann sich hingeben
            fuehrung_geben: 40,          // Niedrig-mittel - eher folgend
            gefuehrt_werden: 70,         // Hoch - lässt sich führen
            ritual: 80,                  // Hoch - liebt gemeinsame Rituale
            nachsorge: 85,               // Sehr hoch - braucht und gibt
            grenzen_setzen: 50,          // Mittel - schwerer mit Grenzen
            grenzen_respektieren: 85,    // Sehr hoch - respektiert Partner
            intensitaet: 75,             // Hoch - intensive Verbindung
            vertrauen_schenken: 90,      // Sehr hoch - vertraut voll
            verantwortung_uebernehmen: 70, // Hoch - für Beziehung
            sich_fallenlassen: 80,       // Hoch - kann loslassen
            machtaustausch: 65,          // Mittel-hoch - offen dafür
            dienend_sein: 70,            // Hoch - für Partner da sein
            beschuetzen: 80              // Hoch - will beschützen
        }
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
