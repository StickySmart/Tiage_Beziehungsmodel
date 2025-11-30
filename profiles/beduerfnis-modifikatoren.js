/**
 * BEDÜRFNIS-MODIFIKATOREN v2.1
 *
 * Modifiziert die Basis-Bedürfnisse der 8 Archetypen basierend auf:
 * - Dominanz (4 Stufen)
 * - Geschlecht (9 Optionen)
 *
 * Formel: finalerWert = basisWert + dominanzMod + geschlechtMod
 * Ergebnis wird auf 0-100 begrenzt
 *
 * NUR bestehende GFK-Bedürfnisse werden verwendet!
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 * PHILOSOPHISCHE GRUNDLAGEN
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * PIRSIG (Metaphysics of Quality):
 * - Statische Qualität: Stabilität, Bewahrung, feste Muster
 * - Dynamische Qualität: Beweglichkeit, Veränderung, Wachstum
 * - Dominanz = dynamic-leaning (gestaltet, verändert)
 * - Submissivität = static-leaning (bewahrt, stabilisiert)
 *
 * OSHO (Tantra/Polarität):
 * - Yang: Aktiv, gebend, führend (Dominant)
 * - Yin: Rezeptiv, empfangend, folgend (Submissiv)
 * - Natürlichkeit: Authentischer Ausdruck ohne Konditionierung
 * - Polarität erzeugt Anziehung: Dom+Sub = 100% Kompatibilität
 *
 * BEDÜRFNIS-MAPPING nach Pirsig/Osho:
 * - Dynamisch (Yang): entdecken, wachstum, herausforderung, kreativitaet
 * - Statisch (Yin): stabilitaet, bestaendigkeit, geborgenheit, harmonie
 * - Polaritäts-Anziehung: gegenseitige Bedürfnisse ergänzen sich
 */

const BeduerfnisModifikatoren = {

    // ═══════════════════════════════════════════════════════════════════════════
    // DOMINANZ-MODIFIKATOREN
    // ═══════════════════════════════════════════════════════════════════════════
    //
    // Basiert auf: BDSM Personality Research (Wismeijer & van Assen, 2013)
    // + Self-Determination Theory (Ryan & Deci)
    // + OSHO's Polaritäts-Philosophie
    // + Pirsig's Metaphysics of Quality
    //
    // PIRSIG-MAPPING:
    //   Dominant  → dynamisch (verändert, gestaltet, bricht Muster)
    //   Submissiv → statisch (bewahrt, stabilisiert, erhält Muster)
    //   Switch    → oszillierend (wechselt zwischen statisch/dynamisch)
    //   Ausgegl.  → balanciert (Tao-Harmonie zwischen beiden)
    //
    // OSHO-MAPPING:
    //   Dominant  → Yang (aktiv, gebend, Solar)
    //   Submissiv → Yin (rezeptiv, empfangend, Lunar)
    //   Switch    → Yin-Yang-Wechsel (fließend)
    //   Ausgegl.  → Tao (integriert beide Polaritäten)

    dominanz: {

        // ─────────────────────────────────────────────────────────────────────────
        // DOMINANT - Der Führende
        // ─────────────────────────────────────────────────────────────────────────
        // PIRSIG: Dynamic Quality - Agent der Veränderung
        // OSHO: Yang-Energie - aktiv, gebend, führend
        // ─────────────────────────────────────────────────────────────────────────
        dominant: {
            // FREIHEIT - Stark erhöht (will selbst bestimmen)
            selbstbestimmung: +20,
            waehlen_koennen: +15,
            unabhaengigkeit: +15,
            raum_haben: +10,
            spontaneitaet: +5,

            // SICHERHEIT - Reduziert (gibt Sicherheit, braucht sie weniger)
            geborgenheit: -15,
            stabilitaet: +5,
            sich_sicher_fuehlen: -10,
            schutz: -20,
            bestaendigkeit: +5,
            leichtigkeit: -5,

            // ZUNEIGUNG - Differenziert
            naehe: -10,
            intimitaet: +5,
            liebe: 0,
            fuersorge: +15,           // Will für andere sorgen
            waerme: -10,
            wertschaetzung: +15,      // Braucht Anerkennung
            unterstuetzung: -10,
            fuereinander_da_sein: -5,

            // VERSTÄNDNIS
            akzeptanz: -5,
            empathie: -15,
            vertrauen: -10,
            verstanden_werden: -15,
            harmonie: -20,
            gesehen_werden: +10,
            beachtung: +15,
            mitgefuehl: -10,

            // TEILNAHME
            kommunikation: +5,
            respekt: +20,
            gegenseitigkeit: -15,
            bedeutung_haben: +20,
            zusammenarbeit: -10,
            gemeinschaft: -5,
            zugehoerigkeit: 0,

            // IDENTITÄT
            authentizitaet: +10,
            kompetenz: +20,
            wirksamkeit: +25,
            herausforderung: +15,
            sinn: +5,
            wachstum: +5,
            beitrag_leisten: +15,
            integritaet: +10,
            effizienz: +15,

            // MUSSE
            freude: 0,
            freizeit: -5,

            // ERSCHAFFEN
            kreativitaet: +5,
            entdecken: +5,

            // VERBUNDENHEIT
            leben_feiern: -5,
            inspiration: +5
        },

        // ─────────────────────────────────────────────────────────────────────────
        // SUBMISSIV - Der Hingebungsvolle
        // ─────────────────────────────────────────────────────────────────────────
        // PIRSIG: Static Quality - Bewahrt Stabilität und Muster
        // OSHO: Yin-Energie - rezeptiv, empfangend, vertrauend
        // ─────────────────────────────────────────────────────────────────────────
        submissiv: {
            // FREIHEIT - Reduziert
            selbstbestimmung: -20,
            waehlen_koennen: -15,
            unabhaengigkeit: -25,
            raum_haben: -15,
            spontaneitaet: -10,

            // SICHERHEIT - Stark erhöht
            geborgenheit: +30,
            stabilitaet: +20,
            sich_sicher_fuehlen: +25,
            schutz: +30,
            bestaendigkeit: +20,
            leichtigkeit: +10,

            // ZUNEIGUNG - Stark erhöht
            naehe: +20,
            intimitaet: +20,
            liebe: +15,
            fuersorge: -10,
            waerme: +25,
            wertschaetzung: +20,
            unterstuetzung: +20,
            fuereinander_da_sein: +25,

            // VERSTÄNDNIS - Stark erhöht
            akzeptanz: +25,
            empathie: +20,
            vertrauen: +30,
            verstanden_werden: +20,
            harmonie: +25,
            gesehen_werden: +15,
            beachtung: +10,
            mitgefuehl: +15,

            // TEILNAHME
            kommunikation: +10,
            respekt: +5,
            gegenseitigkeit: -10,
            bedeutung_haben: +5,
            zusammenarbeit: +10,
            gemeinschaft: +5,
            zugehoerigkeit: +15,

            // IDENTITÄT
            authentizitaet: +5,
            kompetenz: -10,
            wirksamkeit: -15,
            herausforderung: -15,
            sinn: +5,
            wachstum: 0,
            beitrag_leisten: +10,
            integritaet: +5,
            effizienz: -10,

            // MUSSE
            freude: +10,
            freizeit: +5,

            // ERSCHAFFEN
            kreativitaet: -5,
            entdecken: -5,

            // VERBUNDENHEIT
            leben_feiern: +10,
            inspiration: +5
        },

        // ─────────────────────────────────────────────────────────────────────────
        // SWITCH - Der Wandelbare
        // ─────────────────────────────────────────────────────────────────────────
        // PIRSIG: Oszillierend - wechselt zwischen Static/Dynamic Quality
        // OSHO: Yin-Yang-Wechsel - kann beide Polaritäten authentisch leben
        // ─────────────────────────────────────────────────────────────────────────
        switch: {
            // FREIHEIT - Erhöht (braucht Flexibilität)
            selbstbestimmung: +5,
            waehlen_koennen: +20,
            unabhaengigkeit: 0,
            raum_haben: +5,
            spontaneitaet: +20,

            // SICHERHEIT
            geborgenheit: +5,
            stabilitaet: -5,
            sich_sicher_fuehlen: +5,
            schutz: 0,
            bestaendigkeit: -5,
            leichtigkeit: +10,

            // ZUNEIGUNG
            naehe: +10,
            intimitaet: +15,
            liebe: +5,
            fuersorge: +5,
            waerme: +10,
            wertschaetzung: +10,
            unterstuetzung: +5,
            fuereinander_da_sein: +10,

            // VERSTÄNDNIS - Erhöht (muss Partner lesen)
            akzeptanz: +10,
            empathie: +20,
            vertrauen: +15,
            verstanden_werden: +10,
            harmonie: +5,
            gesehen_werden: +10,
            beachtung: +5,
            mitgefuehl: +10,

            // TEILNAHME
            kommunikation: +20,
            respekt: +10,
            gegenseitigkeit: +15,
            bedeutung_haben: +10,
            zusammenarbeit: +10,
            gemeinschaft: +5,
            zugehoerigkeit: +5,

            // IDENTITÄT
            authentizitaet: +10,
            kompetenz: +5,
            wirksamkeit: +5,
            herausforderung: +10,
            sinn: +5,
            wachstum: +10,
            beitrag_leisten: +5,
            integritaet: +5,
            effizienz: 0,

            // MUSSE
            freude: +10,
            freizeit: +5,

            // ERSCHAFFEN
            kreativitaet: +10,
            entdecken: +10,

            // VERBUNDENHEIT
            leben_feiern: +10,
            inspiration: +10
        },

        // ─────────────────────────────────────────────────────────────────────────
        // AUSGEGLICHEN - Der Zentrierte
        // ─────────────────────────────────────────────────────────────────────────
        // PIRSIG: Balancierte Quality - Harmonie zwischen Static und Dynamic
        // OSHO: Tao - Integration beider Polaritäten, weder Yang noch Yin dominant
        // ─────────────────────────────────────────────────────────────────────────
        ausgeglichen: {
            // FREIHEIT
            selbstbestimmung: +5,
            waehlen_koennen: +5,
            unabhaengigkeit: +5,
            raum_haben: +5,
            spontaneitaet: 0,

            // SICHERHEIT
            geborgenheit: +5,
            stabilitaet: +10,
            sich_sicher_fuehlen: +5,
            schutz: 0,
            bestaendigkeit: +10,
            leichtigkeit: +5,

            // ZUNEIGUNG
            naehe: +10,
            intimitaet: +5,
            liebe: +10,
            fuersorge: +5,
            waerme: +10,
            wertschaetzung: +5,
            unterstuetzung: +5,
            fuereinander_da_sein: +10,

            // VERSTÄNDNIS
            akzeptanz: +10,
            empathie: +10,
            vertrauen: +10,
            verstanden_werden: +10,
            harmonie: +15,
            gesehen_werden: +5,
            beachtung: +5,
            mitgefuehl: +10,

            // TEILNAHME
            kommunikation: +10,
            respekt: +10,
            gegenseitigkeit: +25,
            bedeutung_haben: +5,
            zusammenarbeit: +15,
            gemeinschaft: +10,
            zugehoerigkeit: +10,

            // IDENTITÄT
            authentizitaet: +5,
            kompetenz: 0,
            wirksamkeit: 0,
            herausforderung: 0,
            sinn: +5,
            wachstum: +5,
            beitrag_leisten: +5,
            integritaet: +10,
            effizienz: 0,

            // MUSSE
            freude: +5,
            freizeit: +5,

            // ERSCHAFFEN
            kreativitaet: +5,
            entdecken: +5,

            // VERBUNDENHEIT
            leben_feiern: +5,
            inspiration: +5
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // GESCHLECHTS-MODIFIKATOREN (Kulturelle Prägung)
    // ═══════════════════════════════════════════════════════════════════════════
    //
    // Basiert auf: Gender Communication Research (Tannen, 1990)
    // + Sozialpsychologische Forschung zu Geschlechterrollen
    // + LGBTQ+ Forschung zu Identität und Akzeptanz
    //
    // OSHO-PERSPEKTIVE auf Geschlecht:
    // - Cis-Geschlechter: Höhere Konditionierung durch gesellschaftliche Normen
    // - Trans/Nonbinär: Höhere Natürlichkeit durch Überwindung der Konditionierung
    // - "Die Gesellschaft hat euch zu Männern und Frauen gemacht. Die Natur hat
    //    euch als Menschen erschaffen." - Osho
    //
    // PIRSIG-PERSPEKTIVE:
    // - Cis: Statische Muster (gesellschaftlich etabliert)
    // - Trans/Diverse: Dynamische Qualität (bricht Muster, schafft Neues)
    //
    // WICHTIG: Statistische Tendenzen, keine Absolutwerte!

    geschlecht: {

        // ─────────────────────────────────────────────────────────────────────────
        // CIS MANN - Männlich sozialisiert
        // ─────────────────────────────────────────────────────────────────────────
        cis_mann: {
            // FREIHEIT - Erhöht
            selbstbestimmung: +10,
            unabhaengigkeit: +15,
            raum_haben: +10,
            waehlen_koennen: +5,
            spontaneitaet: 0,

            // SICHERHEIT - Reduziert
            geborgenheit: -20,
            sich_sicher_fuehlen: -15,
            schutz: -25,
            stabilitaet: 0,
            bestaendigkeit: 0,
            leichtigkeit: -5,

            // ZUNEIGUNG - Reduziert
            naehe: -15,
            waerme: -20,
            intimitaet: -5,
            fuersorge: +10,
            liebe: -5,
            wertschaetzung: +10,
            unterstuetzung: -10,
            fuereinander_da_sein: -10,

            // VERSTÄNDNIS - Reduziert
            empathie: -15,
            verstanden_werden: -20,
            harmonie: -15,
            akzeptanz: -5,
            gesehen_werden: +5,
            beachtung: +10,
            vertrauen: -5,
            mitgefuehl: -15,

            // TEILNAHME
            respekt: +15,
            kommunikation: -15,
            bedeutung_haben: +15,
            gegenseitigkeit: -5,
            zusammenarbeit: -5,
            gemeinschaft: -5,
            zugehoerigkeit: -5,

            // IDENTITÄT
            kompetenz: +20,
            wirksamkeit: +20,
            authentizitaet: 0,
            herausforderung: +10,
            effizienz: +15,
            beitrag_leisten: +10,
            sinn: 0,
            wachstum: +5,

            // MUSSE
            freude: -5,
            freizeit: 0,

            // ERSCHAFFEN
            kreativitaet: 0,
            entdecken: +5
        },

        // ─────────────────────────────────────────────────────────────────────────
        // CIS FRAU - Weiblich sozialisiert
        // ─────────────────────────────────────────────────────────────────────────
        cis_frau: {
            // FREIHEIT - Moderat reduziert
            selbstbestimmung: -5,
            unabhaengigkeit: -10,
            raum_haben: -5,
            waehlen_koennen: 0,
            spontaneitaet: 0,

            // SICHERHEIT - Erhöht
            geborgenheit: +20,
            sich_sicher_fuehlen: +15,
            schutz: +15,
            stabilitaet: +10,
            bestaendigkeit: +10,
            leichtigkeit: +5,

            // ZUNEIGUNG - Stark erhöht
            naehe: +20,
            waerme: +20,
            intimitaet: +15,
            fuersorge: +15,
            liebe: +10,
            wertschaetzung: +10,
            unterstuetzung: +10,
            fuereinander_da_sein: +15,

            // VERSTÄNDNIS - Stark erhöht
            empathie: +20,
            verstanden_werden: +20,
            harmonie: +20,
            akzeptanz: +15,
            gesehen_werden: +10,
            beachtung: +5,
            vertrauen: +10,
            mitgefuehl: +15,

            // TEILNAHME
            kommunikation: +20,
            gemeinschaft: +15,
            zugehoerigkeit: +15,
            respekt: +5,
            gegenseitigkeit: +10,
            bedeutung_haben: +5,
            zusammenarbeit: +10,

            // IDENTITÄT
            authentizitaet: +5,
            kompetenz: -5,
            wirksamkeit: -5,
            herausforderung: -5,
            effizienz: -5,
            beitrag_leisten: +5,
            sinn: +5,
            wachstum: +5,

            // MUSSE
            freude: +10,
            freizeit: +5,

            // VERBUNDENHEIT
            leben_feiern: +10,
            inspiration: +10
        },

        // ─────────────────────────────────────────────────────────────────────────
        // TRANS MANN
        // ─────────────────────────────────────────────────────────────────────────
        trans_mann: {
            // FREIHEIT - Stark erhöht (hart erkämpft)
            selbstbestimmung: +25,
            unabhaengigkeit: +15,
            raum_haben: +10,
            waehlen_koennen: +15,
            spontaneitaet: +5,

            // SICHERHEIT - Erhöht
            geborgenheit: +5,
            sich_sicher_fuehlen: +10,
            schutz: +10,
            stabilitaet: +5,
            bestaendigkeit: +5,
            leichtigkeit: +5,

            // ZUNEIGUNG
            naehe: 0,
            waerme: 0,
            intimitaet: +5,
            fuersorge: +5,
            liebe: +5,
            wertschaetzung: +15,
            unterstuetzung: +10,
            fuereinander_da_sein: +5,

            // VERSTÄNDNIS - Stark erhöht
            akzeptanz: +30,
            verstanden_werden: +25,
            empathie: +15,
            gesehen_werden: +25,
            beachtung: +15,
            vertrauen: +10,
            harmonie: +5,
            mitgefuehl: +10,

            // TEILNAHME
            zugehoerigkeit: +20,
            gemeinschaft: +15,
            kommunikation: +5,
            respekt: +15,
            bedeutung_haben: +10,
            gegenseitigkeit: +5,
            zusammenarbeit: +5,

            // IDENTITÄT - Sehr stark
            authentizitaet: +30,
            integritaet: +25,
            wachstum: +20,
            sinn: +15,
            kompetenz: +5,
            wirksamkeit: +5,
            beitrag_leisten: +10,

            // VERBUNDENHEIT
            leben_feiern: +10,
            inspiration: +15
        },

        // ─────────────────────────────────────────────────────────────────────────
        // TRANS FRAU
        // ─────────────────────────────────────────────────────────────────────────
        trans_frau: {
            // FREIHEIT - Erhöht
            selbstbestimmung: +25,
            unabhaengigkeit: +10,
            raum_haben: +5,
            waehlen_koennen: +15,
            spontaneitaet: +5,

            // SICHERHEIT - Stark erhöht (höhere Vulnerabilität)
            geborgenheit: +20,
            sich_sicher_fuehlen: +25,
            schutz: +25,
            stabilitaet: +10,
            bestaendigkeit: +10,
            leichtigkeit: +5,

            // ZUNEIGUNG - Erhöht
            naehe: +15,
            waerme: +20,
            intimitaet: +10,
            fuersorge: +10,
            liebe: +10,
            wertschaetzung: +20,
            unterstuetzung: +15,
            fuereinander_da_sein: +10,

            // VERSTÄNDNIS - Sehr stark
            akzeptanz: +35,
            verstanden_werden: +30,
            empathie: +15,
            gesehen_werden: +30,
            beachtung: +15,
            vertrauen: +15,
            harmonie: +10,
            mitgefuehl: +15,

            // TEILNAHME
            zugehoerigkeit: +25,
            gemeinschaft: +20,
            kommunikation: +10,
            respekt: +15,
            bedeutung_haben: +10,
            gegenseitigkeit: +10,
            zusammenarbeit: +10,

            // IDENTITÄT - Sehr stark
            authentizitaet: +30,
            integritaet: +25,
            wachstum: +20,
            sinn: +15,
            kompetenz: +5,
            wirksamkeit: +5,
            beitrag_leisten: +10,

            // VERBUNDENHEIT
            leben_feiern: +15,
            inspiration: +15
        },

        // ─────────────────────────────────────────────────────────────────────────
        // NONBINÄR
        // ─────────────────────────────────────────────────────────────────────────
        nonbinaer: {
            // FREIHEIT - Sehr stark
            selbstbestimmung: +30,
            waehlen_koennen: +25,
            unabhaengigkeit: +20,
            raum_haben: +20,
            spontaneitaet: +15,

            // SICHERHEIT
            geborgenheit: +10,
            sich_sicher_fuehlen: +15,
            schutz: +10,
            stabilitaet: +5,
            bestaendigkeit: +5,
            leichtigkeit: +10,

            // ZUNEIGUNG
            naehe: +5,
            waerme: +5,
            intimitaet: +10,
            fuersorge: +5,
            liebe: +5,
            wertschaetzung: +15,
            unterstuetzung: +10,
            fuereinander_da_sein: +5,

            // VERSTÄNDNIS - Sehr stark
            akzeptanz: +35,
            verstanden_werden: +30,
            empathie: +15,
            gesehen_werden: +30,
            beachtung: +15,
            vertrauen: +10,
            harmonie: +5,
            mitgefuehl: +10,

            // TEILNAHME
            zugehoerigkeit: +25,
            gemeinschaft: +15,
            kommunikation: +10,
            respekt: +15,
            bedeutung_haben: +15,
            gegenseitigkeit: +10,
            zusammenarbeit: +5,

            // IDENTITÄT - Maximal
            authentizitaet: +35,
            integritaet: +30,
            selbst_ausdruck: +30,
            wachstum: +20,
            sinn: +15,
            kompetenz: +5,
            wirksamkeit: +5,
            beitrag_leisten: +10,

            // ERSCHAFFEN
            kreativitaet: +15,
            entdecken: +15,

            // VERBUNDENHEIT
            leben_feiern: +10,
            inspiration: +15
        },

        // ─────────────────────────────────────────────────────────────────────────
        // GENDERFLUID
        // ─────────────────────────────────────────────────────────────────────────
        genderfluid: {
            // FREIHEIT - Maximal
            selbstbestimmung: +30,
            waehlen_koennen: +30,
            spontaneitaet: +25,
            raum_haben: +20,
            unabhaengigkeit: +15,

            // SICHERHEIT
            geborgenheit: +10,
            sich_sicher_fuehlen: +10,
            schutz: +10,
            stabilitaet: 0,
            bestaendigkeit: -5,
            leichtigkeit: +15,

            // ZUNEIGUNG
            naehe: +10,
            waerme: +10,
            intimitaet: +10,
            fuersorge: +5,
            liebe: +5,
            wertschaetzung: +15,
            unterstuetzung: +10,
            fuereinander_da_sein: +5,

            // VERSTÄNDNIS - Sehr stark
            akzeptanz: +35,
            verstanden_werden: +30,
            empathie: +15,
            gesehen_werden: +25,
            beachtung: +15,
            vertrauen: +10,
            harmonie: +5,
            mitgefuehl: +10,

            // TEILNAHME
            zugehoerigkeit: +20,
            gemeinschaft: +15,
            kommunikation: +10,
            respekt: +15,
            bedeutung_haben: +15,
            gegenseitigkeit: +10,
            zusammenarbeit: +5,

            // IDENTITÄT
            authentizitaet: +30,
            selbst_ausdruck: +35,
            wachstum: +25,
            sinn: +15,
            integritaet: +20,
            kompetenz: +5,
            wirksamkeit: +5,
            beitrag_leisten: +10,

            // ERSCHAFFEN
            kreativitaet: +20,
            entdecken: +20,

            // VERBUNDENHEIT
            leben_feiern: +15,
            inspiration: +20
        },

        // ─────────────────────────────────────────────────────────────────────────
        // AGENDER
        // ─────────────────────────────────────────────────────────────────────────
        agender: {
            // FREIHEIT - Sehr stark
            selbstbestimmung: +30,
            unabhaengigkeit: +30,
            raum_haben: +25,
            waehlen_koennen: +20,
            spontaneitaet: +10,

            // SICHERHEIT
            geborgenheit: +5,
            sich_sicher_fuehlen: +10,
            schutz: +5,
            stabilitaet: +5,
            bestaendigkeit: +5,
            leichtigkeit: +10,

            // ZUNEIGUNG - Neutral
            naehe: 0,
            waerme: 0,
            intimitaet: +5,
            fuersorge: 0,
            liebe: 0,
            wertschaetzung: +10,
            unterstuetzung: +5,
            fuereinander_da_sein: 0,

            // VERSTÄNDNIS - Stark
            akzeptanz: +30,
            verstanden_werden: +25,
            empathie: +10,
            gesehen_werden: +20,
            beachtung: +10,
            vertrauen: +10,
            harmonie: +5,
            mitgefuehl: +5,

            // TEILNAHME
            zugehoerigkeit: +15,
            gemeinschaft: +10,
            kommunikation: +5,
            respekt: +15,
            bedeutung_haben: +10,
            gegenseitigkeit: +5,
            zusammenarbeit: +5,

            // IDENTITÄT - Stark
            authentizitaet: +35,
            integritaet: +30,
            selbst_ausdruck: +20,
            wachstum: +15,
            sinn: +15,
            kompetenz: +5,
            wirksamkeit: +5,
            beitrag_leisten: +5,

            // ERSCHAFFEN
            kreativitaet: +10,
            entdecken: +10,

            // VERBUNDENHEIT
            leben_feiern: +5,
            inspiration: +10
        },

        // ─────────────────────────────────────────────────────────────────────────
        // INTERSEX
        // ─────────────────────────────────────────────────────────────────────────
        intersex: {
            // FREIHEIT - Sehr stark (körperliche Selbstbestimmung)
            selbstbestimmung: +35,
            unabhaengigkeit: +25,
            raum_haben: +20,
            waehlen_koennen: +20,
            spontaneitaet: +10,

            // SICHERHEIT - Erhöht
            geborgenheit: +15,
            sich_sicher_fuehlen: +20,
            schutz: +20,
            stabilitaet: +10,
            bestaendigkeit: +10,
            leichtigkeit: +5,

            // ZUNEIGUNG
            naehe: +10,
            waerme: +10,
            intimitaet: +10,
            fuersorge: +5,
            liebe: +5,
            wertschaetzung: +20,
            unterstuetzung: +15,
            fuereinander_da_sein: +10,

            // VERSTÄNDNIS - Sehr stark
            akzeptanz: +35,
            verstanden_werden: +30,
            empathie: +15,
            gesehen_werden: +25,
            beachtung: +15,
            vertrauen: +15,
            harmonie: +10,
            mitgefuehl: +15,

            // TEILNAHME
            zugehoerigkeit: +20,
            gemeinschaft: +15,
            kommunikation: +10,
            respekt: +20,
            bedeutung_haben: +15,
            gegenseitigkeit: +10,
            zusammenarbeit: +10,

            // IDENTITÄT - Stark
            authentizitaet: +30,
            integritaet: +30,
            wachstum: +20,
            sinn: +15,
            kompetenz: +5,
            wirksamkeit: +5,
            beitrag_leisten: +10,

            // VERBUNDENHEIT
            leben_feiern: +10,
            inspiration: +15
        },

        // ─────────────────────────────────────────────────────────────────────────
        // DIVERS
        // ─────────────────────────────────────────────────────────────────────────
        divers: {
            // FREIHEIT - Stark
            selbstbestimmung: +25,
            waehlen_koennen: +25,
            unabhaengigkeit: +20,
            raum_haben: +20,
            spontaneitaet: +15,

            // SICHERHEIT
            geborgenheit: +10,
            sich_sicher_fuehlen: +15,
            schutz: +10,
            stabilitaet: +5,
            bestaendigkeit: +5,
            leichtigkeit: +10,

            // ZUNEIGUNG
            naehe: +5,
            waerme: +5,
            intimitaet: +10,
            fuersorge: +5,
            liebe: +5,
            wertschaetzung: +15,
            unterstuetzung: +10,
            fuereinander_da_sein: +5,

            // VERSTÄNDNIS - Stark
            akzeptanz: +30,
            verstanden_werden: +25,
            empathie: +15,
            gesehen_werden: +25,
            beachtung: +15,
            vertrauen: +10,
            harmonie: +5,
            mitgefuehl: +10,

            // TEILNAHME
            zugehoerigkeit: +20,
            gemeinschaft: +15,
            kommunikation: +10,
            respekt: +15,
            bedeutung_haben: +15,
            gegenseitigkeit: +10,
            zusammenarbeit: +5,

            // IDENTITÄT - Stark
            authentizitaet: +30,
            selbst_ausdruck: +25,
            wachstum: +20,
            sinn: +15,
            integritaet: +25,
            kompetenz: +5,
            wirksamkeit: +5,
            beitrag_leisten: +10,

            // ERSCHAFFEN
            kreativitaet: +15,
            entdecken: +15,

            // VERBUNDENHEIT
            leben_feiern: +10,
            inspiration: +15
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // HILFSFUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Berechnet finale Bedürfnisse für ein Profil
     *
     * @param {object} basisBedürfnisse - Archetyp-Basis (z.B. single.kernbeduerfnisse)
     * @param {string} dominanzTyp - 'dominant', 'submissiv', 'switch', 'ausgeglichen'
     * @param {string} geschlecht - 'cis_mann', 'cis_frau', etc.
     * @returns {object} Modifizierte Bedürfnisse
     */
    berechneProfilBedürfnisse: function(basisBedürfnisse, dominanzTyp, geschlecht) {
        var ergebnis = {};
        var domMod = this.dominanz[dominanzTyp] || {};
        var geschMod = this.geschlecht[geschlecht] || {};

        // Alle Basis-Bedürfnisse durchgehen
        for (var bed in basisBedürfnisse) {
            var basis = basisBedürfnisse[bed];
            var domDelta = domMod[bed] || 0;
            var geschDelta = geschMod[bed] || 0;

            // Berechne finalen Wert (0-100 begrenzt)
            var final = Math.max(0, Math.min(100, basis + domDelta + geschDelta));
            ergebnis[bed] = Math.round(final);
        }

        return ergebnis;
    },

    /**
     * Generiert alle 288 Profile (8 Archetypen × 9 Geschlechter × 4 Dominanz)
     *
     * @param {object} archetypProfile - Die Basis-Archetyp-Profile aus gfk-beduerfnisse.js
     * @returns {object} Alle 288 Profile mit Schlüssel "archetyp-geschlecht-dominanz"
     */
    generiereAlleProfile: function(archetypProfile) {
        var profile = {};
        var archetypen = ['single', 'duo', 'duo-flex', 'solopoly', 'polyamor', 'ra', 'lat', 'aromantisch'];
        var geschlechter = ['cis_mann', 'cis_frau', 'trans_mann', 'trans_frau',
                           'nonbinaer', 'genderfluid', 'agender', 'intersex', 'divers'];
        var dominanzTypen = ['dominant', 'submissiv', 'switch', 'ausgeglichen'];

        for (var a = 0; a < archetypen.length; a++) {
            var archetyp = archetypen[a];
            var basisProfil = archetypProfile[archetyp];

            if (!basisProfil || !basisProfil.kernbeduerfnisse) {
                console.warn('Fehlendes Archetyp-Profil: ' + archetyp);
                continue;
            }

            for (var g = 0; g < geschlechter.length; g++) {
                for (var d = 0; d < dominanzTypen.length; d++) {
                    var geschlecht = geschlechter[g];
                    var dominanz = dominanzTypen[d];
                    var key = archetyp + '-' + geschlecht + '-' + dominanz;

                    profile[key] = {
                        archetyp: archetyp,
                        geschlecht: geschlecht,
                        dominanz: dominanz,
                        kernbeduerfnisse: this.berechneProfilBedürfnisse(
                            basisProfil.kernbeduerfnisse,
                            dominanz,
                            geschlecht
                        )
                    };
                }
            }
        }

        return profile;
    }
};

// Export für Node.js und Browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BeduerfnisModifikatoren;
}
