/**
 * BEDÜRFNIS-MODIFIKATOREN v2.3
 *
 * NEU: #ID-Konvertierung via BeduerfnisIds-Modul
 * - toIds(obj): Konvertiert String-Keys zu #IDs
 * - getDominanzMitIds(typ): Dominanz-Modifikatoren mit #IDs
 * - getGeschlechtMitIds(typ): Geschlechts-Modifikatoren mit #IDs
 * - getOrientierungMitIds(typ): Orientierungs-Modifikatoren mit #IDs
 * - getGeschlechtsidentitaetMitIds(typ): Identitäts-Modifikatoren mit #IDs
 * - profilZuIds(profil): Berechnetes Profil zu #IDs
 *
 * Modifiziert die Basis-Bedürfnisse der 8 Archetypen basierend auf:
 * - Dominanz (4 Stufen)
 * - Geschlecht (9 Optionen)
 * - Orientierung (3 Optionen)
 *
 * Formel: finalerWert = basisWert + dominanzMod + geschlechtMod + orientierungMod
 * Ergebnis wird auf 0-100 begrenzt
 *
 * Bedürfnis-Katalog: GFK (Rosenberg) + Dynamik/BDSM (Easton/Hardy, Wiseman)
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
            inspiration: +5,

            // DYNAMIK - Stark ausgeprägt für Führende
            kontrolle_ausueben: +35,
            hingabe: -30,
            fuehrung_geben: +35,
            gefuehrt_werden: -30,
            ritual: +15,
            nachsorge: +25,
            grenzen_setzen: +20,
            grenzen_respektieren: +15,
            intensitaet: +20,
            vertrauen_schenken: -10,
            verantwortung_uebernehmen: +30,
            sich_fallenlassen: -25,
            machtaustausch: +25,
            dienend_sein: -25,
            beschuetzen: +30
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
            inspiration: +5,

            // DYNAMIK - Stark ausgeprägt für Hingebungsvolle
            kontrolle_ausueben: -30,
            hingabe: +35,
            fuehrung_geben: -30,
            gefuehrt_werden: +35,
            ritual: +20,
            nachsorge: +30,
            grenzen_setzen: +10,
            grenzen_respektieren: +25,
            intensitaet: +25,
            vertrauen_schenken: +30,
            verantwortung_uebernehmen: -20,
            sich_fallenlassen: +35,
            machtaustausch: +25,
            dienend_sein: +30,
            beschuetzen: -20
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
            inspiration: +10,

            // DYNAMIK - Flexibel, kann beides
            kontrolle_ausueben: +10,
            hingabe: +10,
            fuehrung_geben: +10,
            gefuehrt_werden: +10,
            ritual: +15,
            nachsorge: +20,
            grenzen_setzen: +15,
            grenzen_respektieren: +20,
            intensitaet: +25,
            vertrauen_schenken: +15,
            verantwortung_uebernehmen: +10,
            sich_fallenlassen: +10,
            machtaustausch: +30,
            dienend_sein: +5,
            beschuetzen: +5
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
            inspiration: +5,

            // DYNAMIK - Neutral, offen für alle Formen
            kontrolle_ausueben: 0,
            hingabe: 0,
            fuehrung_geben: 0,
            gefuehrt_werden: 0,
            ritual: +5,
            nachsorge: +10,
            grenzen_setzen: +10,
            grenzen_respektieren: +15,
            intensitaet: 0,
            vertrauen_schenken: +10,
            verantwortung_uebernehmen: +5,
            sich_fallenlassen: 0,
            machtaustausch: 0,
            dienend_sein: 0,
            beschuetzen: +5
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
    // ORIENTIERUNGS-MODIFIKATOREN
    // ═══════════════════════════════════════════════════════════════════════════
    //
    // Basiert auf: LGBTQ+ Forschung zu Identität und psychologischen Bedürfnissen
    // + Allen et al. (2020): Sexual Orientation & Personality Meta-analysis
    //
    // OSHO-PERSPEKTIVE:
    // - Alle Orientierungen sind natürlich, wenn authentisch gelebt
    // - Homosexualität: "Eine natürliche Variation, keine Abweichung"
    // - Bisexualität: "Die Fähigkeit, Schönheit in allen zu sehen"
    //
    // PIRSIG-PERSPEKTIVE:
    // - Heterosexualität: Statisches Muster (gesellschaftlich normiert)
    // - Homosexualität/Bisexualität: Dynamische Qualität (bricht Normen)

    orientierung: {

        // ─────────────────────────────────────────────────────────────────────────
        // HETEROSEXUELL
        // ─────────────────────────────────────────────────────────────────────────
        // PIRSIG: Statisches Muster - gesellschaftlich etablierte Norm
        // OSHO: Kann natürlich sein, oft aber konditioniert
        // ─────────────────────────────────────────────────────────────────────────
        heterosexuell: {
            // Niedrigere Modifikatoren da "Default" in der Gesellschaft
            // Weniger Bedürfnis nach Akzeptanz/Sichtbarkeit (wird vorausgesetzt)
            akzeptanz: -10,
            verstanden_werden: -5,
            gesehen_werden: -5,
            zugehoerigkeit: 0,

            // Traditionellere Muster möglich
            stabilitaet: +5,
            bestaendigkeit: +5,
            geborgenheit: +5,

            // Weniger Bedürfnis nach Selbstausdruck bzgl. Orientierung
            selbst_ausdruck: -5,
            authentizitaet: -5
        },

        // ─────────────────────────────────────────────────────────────────────────
        // HOMOSEXUELL
        // ─────────────────────────────────────────────────────────────────────────
        // PIRSIG: Dynamische Qualität - bricht gesellschaftliche Muster
        // OSHO: Natürlicher Ausdruck, wenn authentisch gewählt
        // ─────────────────────────────────────────────────────────────────────────
        homosexuell: {
            // Erhöhtes Bedürfnis nach Akzeptanz (historische Diskriminierung)
            akzeptanz: +20,
            verstanden_werden: +15,
            gesehen_werden: +15,
            respekt: +10,

            // Community/Zugehörigkeit wichtig
            zugehoerigkeit: +20,
            gemeinschaft: +15,

            // Authentizität hart erkämpft
            authentizitaet: +20,
            integritaet: +15,
            selbst_ausdruck: +15,

            // Selbstbestimmung wichtig
            selbstbestimmung: +10,
            waehlen_koennen: +10,

            // Sicherheitsbedürfnis (je nach Umfeld)
            sich_sicher_fuehlen: +10,
            schutz: +10
        },

        // ─────────────────────────────────────────────────────────────────────────
        // BISEXUELL
        // ─────────────────────────────────────────────────────────────────────────
        // PIRSIG: Maximale Dynamische Qualität - flexibel, offen
        // OSHO: "Die Fähigkeit, Schönheit in allen zu sehen" - höchste Offenheit
        // ─────────────────────────────────────────────────────────────────────────
        bisexuell: {
            // Sehr hohes Bedürfnis nach Akzeptanz (oft von beiden "Seiten" hinterfragt)
            akzeptanz: +25,
            verstanden_werden: +20,
            gesehen_werden: +20,
            respekt: +15,

            // Flexibilität und Offenheit zentral
            waehlen_koennen: +20,
            spontaneitaet: +10,
            selbstbestimmung: +15,

            // Community kann komplizierter sein
            zugehoerigkeit: +15,
            gemeinschaft: +10,

            // Starke Authentizität
            authentizitaet: +25,
            integritaet: +20,
            selbst_ausdruck: +20,

            // Offenheit für Erfahrungen
            entdecken: +15,
            kreativitaet: +10,
            wachstum: +15
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // GESCHLECHTSIDENTITÄT-MODIFIKATOREN
    // ═══════════════════════════════════════════════════════════════════════════
    //
    // Skala: Cis(0) → Trans(25) → Nonbinär(50) → Fluid(75) → Suchend(100)
    //        Form     Wandel      Jenseits       Fluss       Entdeckung
    //
    // PIRSIG:
    // - Cis: Statische Qualität - Form ist klar, gesellschaftlich etabliert
    // - Trans: Dynamische Qualität durchlebt → neue Statik gefunden
    // - Nonbinär: Transzendenz der Dualität
    // - Fluid: Maximale Dynamische Qualität - ständige Bewegung
    // - Suchend: Reine Potentialität - Anfängergeist (Shoshin)
    //
    // OSHO:
    // - "Werde, wer du bist" - Authentizität über Konformität
    // - Fluid/Suchend: "Der Fluss weiß nicht wohin, aber er fließt"

    geschlechtsidentitaet: {

        // ─────────────────────────────────────────────────────────────────────────
        // CIS - Form = Körper
        // ─────────────────────────────────────────────────────────────────────────
        // PIRSIG: Statische Qualität - klare, gefestigte Form
        // OSHO: Kann authentisch sein, aber oft unbewusst übernommen
        // ─────────────────────────────────────────────────────────────────────────
        cis: {
            // Geringeres Bedürfnis nach Identitäts-Akzeptanz (wird vorausgesetzt)
            akzeptanz: -10,
            verstanden_werden: -5,
            gesehen_werden: -5,

            // Höhere Stabilität (weniger Identitäts-Fragen)
            stabilitaet: +10,
            bestaendigkeit: +10,
            sich_sicher_fuehlen: +5,

            // Weniger Selbstausdruck bzgl. Gender
            selbst_ausdruck: -5,
            authentizitaet: -5
        },

        // ─────────────────────────────────────────────────────────────────────────
        // TRANS - Wandel durchlebt
        // ─────────────────────────────────────────────────────────────────────────
        // PIRSIG: Dynamische Qualität durchlebt, neue Klarheit gefunden
        // OSHO: "Mut, sich gegen die Masse zu stellen"
        // ─────────────────────────────────────────────────────────────────────────
        trans: {
            // Erhöhtes Bedürfnis nach Akzeptanz und Respekt
            akzeptanz: +25,
            verstanden_werden: +20,
            gesehen_werden: +20,
            respekt: +15,

            // Authentizität hart erkämpft
            authentizitaet: +25,
            integritaet: +20,
            selbst_ausdruck: +20,

            // Community und Zugehörigkeit wichtig
            zugehoerigkeit: +15,
            gemeinschaft: +10,

            // Sicherheit (je nach Umfeld)
            sich_sicher_fuehlen: +15,
            schutz: +15,

            // Selbstbestimmung zentral
            selbstbestimmung: +20,
            waehlen_koennen: +15
        },

        // ─────────────────────────────────────────────────────────────────────────
        // NONBINÄR - Jenseits der Dualität
        // ─────────────────────────────────────────────────────────────────────────
        // PIRSIG: Transzendenz statischer Kategorien
        // OSHO: "Jenseits von Mann und Frau liegt das Ganze"
        // ─────────────────────────────────────────────────────────────────────────
        nonbinaer: {
            // Sehr hohes Bedürfnis nach Akzeptanz (oft unsichtbar)
            akzeptanz: +30,
            verstanden_werden: +25,
            gesehen_werden: +25,
            respekt: +20,

            // Kreativität und Selbstausdruck zentral
            kreativitaet: +15,
            selbst_ausdruck: +25,
            authentizitaet: +25,

            // Freiheit von Kategorien
            selbstbestimmung: +20,
            waehlen_koennen: +20,
            raum_haben: +15,

            // Wachstum und Entdeckung
            wachstum: +15,
            entdecken: +15
        },

        // ─────────────────────────────────────────────────────────────────────────
        // FLUID - Der Fluss
        // ─────────────────────────────────────────────────────────────────────────
        // PIRSIG: Maximale Dynamische Qualität - ständige Bewegung
        // OSHO: "Das Leben ist ein Fluss, nicht ein gefrorener See"
        // ─────────────────────────────────────────────────────────────────────────
        fluid: {
            // Hohes Bedürfnis nach Akzeptanz (komplexe Identität)
            akzeptanz: +25,
            verstanden_werden: +30,
            gesehen_werden: +20,
            respekt: +15,

            // Flexibilität und Wandel zentral
            spontaneitaet: +20,
            waehlen_koennen: +25,
            raum_haben: +20,

            // Starker Selbstausdruck
            selbst_ausdruck: +25,
            authentizitaet: +20,
            kreativitaet: +20,

            // Offenheit für Veränderung
            wachstum: +20,
            entdecken: +20,
            herausforderung: +10,

            // Weniger Bedürfnis nach Stabilität
            stabilitaet: -15,
            bestaendigkeit: -10
        },

        // ─────────────────────────────────────────────────────────────────────────
        // SUCHEND - Anfängergeist (Shoshin)
        // ─────────────────────────────────────────────────────────────────────────
        // PIRSIG: Reine Potentialität - noch nicht festgelegt
        // OSHO: "Im Nicht-Wissen liegt die Offenheit für alles"
        // ─────────────────────────────────────────────────────────────────────────
        suchend: {
            // Sehr hohes Bedürfnis nach Akzeptanz und Raum
            akzeptanz: +30,
            verstanden_werden: +30,
            gesehen_werden: +20,
            respekt: +15,

            // Exploration zentral
            entdecken: +30,
            wachstum: +25,
            herausforderung: +15,
            kreativitaet: +15,

            // Raum und Freiheit brauchen
            raum_haben: +25,
            selbstbestimmung: +20,
            waehlen_koennen: +25,

            // Unterstützung auf der Reise
            unterstuetzung: +20,
            geduld: +20,
            vertrauen: +15,

            // Weniger Stabilität (noch im Wandel)
            stabilitaet: -20,
            bestaendigkeit: -15,
            sich_sicher_fuehlen: -10
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // STATUS-FAKTOREN
    // ═══════════════════════════════════════════════════════════════════════════
    //
    // "gelebt" = Aktiv praktiziert, integriert in Identität
    // "interessiert" = Exploration, noch nicht gefestigt
    //
    // PIRSIG: "interessiert" = höhere dynamische Qualität (im Wandel)
    // OSHO: Exploration ist natürlich und wertvoll

    status: {
        gelebt: 1.0,        // Volle Gewichtung
        interessiert: 0.7   // 70% Gewichtung (noch im Wandel)
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // HILFSFUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Berechnet finale Bedürfnisse für ein vollständiges Profil
     *
     * FORMEL:
     * finalerWert = (basis + domMod×domStatus + gesch1Mod×g1Status +
     *                gesch2Mod×0.5×g2Status + oriMod×oriStatus)
     *
     * @param {object} params - Alle Parameter
     * @param {object} params.basisBedürfnisse - Archetyp-Basis
     * @param {string} params.dominanz - 'dominant', 'submissiv', 'switch', 'ausgeglichen'
     * @param {string} params.dominanzStatus - 'gelebt' oder 'interessiert'
     * @param {string} params.geschlechtPrimary - Primäres Geschlecht
     * @param {string} params.geschlechtPrimaryStatus - 'gelebt' oder 'interessiert'
     * @param {string} params.geschlechtSecondary - Sekundäres Geschlecht (optional)
     * @param {string} params.geschlechtSecondaryStatus - 'gelebt' oder 'interessiert'
     * @param {string} params.geschlechtsidentitaet - 'cis', 'trans', 'nonbinaer', 'fluid', 'suchend' (NEU)
     * @param {string} params.geschlechtsidentitaetStatus - 'gelebt' oder 'interessiert' (NEU)
     * @param {string} params.orientierung - 'heterosexuell', 'homosexuell', 'bisexuell'
     * @param {string} params.orientierungStatus - 'gelebt' oder 'interessiert'
     * @returns {object} Modifizierte Bedürfnisse
     */
    berechneVollständigesBedürfnisProfil: function(params) {
        var ergebnis = {};
        var self = this;

        // Modifikatoren laden
        var domMod = this.dominanz[params.dominanz] || {};
        var gesch1Mod = this.geschlecht[params.geschlechtPrimary] || {};
        var gesch2Mod = params.geschlechtSecondary ?
            (this.geschlecht[params.geschlechtSecondary] || {}) : {};
        var oriMod = this.orientierung[params.orientierung] || {};

        // NEU: Geschlechtsidentität-Modifikator (cis, trans, nonbinaer, fluid, suchend)
        var identMod = params.geschlechtsidentitaet ?
            (this.geschlechtsidentitaet[params.geschlechtsidentitaet] || {}) : {};

        // Status-Faktoren
        var domStatus = this.status[params.dominanzStatus] || 1.0;
        var g1Status = this.status[params.geschlechtPrimaryStatus] || 1.0;
        var g2Status = this.status[params.geschlechtSecondaryStatus] || 1.0;
        var identStatus = this.status[params.geschlechtsidentitaetStatus] || 1.0;
        var oriStatus = this.status[params.orientierungStatus] || 1.0;

        // Gewichtungen
        var g2Weight = 0.5;      // Sekundäres Geschlecht: 50%
        var identWeight = 0.75;  // Geschlechtsidentität: 75% (wichtig aber nicht dominant)

        // Alle Basis-Bedürfnisse durchgehen
        for (var bed in params.basisBedürfnisse) {
            var basis = params.basisBedürfnisse[bed];

            // Modifikatoren mit Status-Gewichtung anwenden
            var domDelta = (domMod[bed] || 0) * domStatus;
            var g1Delta = (gesch1Mod[bed] || 0) * g1Status;
            var g2Delta = (gesch2Mod[bed] || 0) * g2Weight * g2Status;
            var identDelta = (identMod[bed] || 0) * identWeight * identStatus;
            var oriDelta = (oriMod[bed] || 0) * oriStatus;

            // Berechne finalen Wert (0-100 begrenzt)
            var final = basis + domDelta + g1Delta + g2Delta + identDelta + oriDelta;
            ergebnis[bed] = Math.round(Math.max(0, Math.min(100, final)));
        }

        // Neue Bedürfnisse hinzufügen die nur durch Modifikatoren kommen
        var alleMods = [domMod, gesch1Mod, gesch2Mod, identMod, oriMod];
        var alleKeys = new Set();

        alleMods.forEach(function(mod) {
            Object.keys(mod).forEach(function(key) {
                alleKeys.add(key);
            });
        });

        alleKeys.forEach(function(bed) {
            if (!ergebnis[bed]) {
                // Basis 50 + gewichtete Modifikatoren
                var domDelta = (domMod[bed] || 0) * domStatus;
                var g1Delta = (gesch1Mod[bed] || 0) * g1Status;
                var g2Delta = (gesch2Mod[bed] || 0) * g2Weight * g2Status;
                var identDelta = (identMod[bed] || 0) * identWeight * identStatus;
                var oriDelta = (oriMod[bed] || 0) * oriStatus;

                var neuWert = 50 + domDelta + g1Delta + g2Delta + identDelta + oriDelta;
                if (Math.abs(neuWert - 50) > 5) {  // Nur wenn signifikant modifiziert
                    ergebnis[bed] = Math.round(Math.max(0, Math.min(100, neuWert)));
                }
            }
        });

        return ergebnis;
    },

    /**
     * Vereinfachte Funktion für Basis-Berechnung (Rückwärtskompatibilität)
     */
    berechneProfilBedürfnisse: function(basisBedürfnisse, dominanzTyp, geschlecht) {
        return this.berechneVollständigesBedürfnisProfil({
            basisBedürfnisse: basisBedürfnisse,
            dominanz: dominanzTyp,
            dominanzStatus: 'gelebt',
            geschlechtPrimary: geschlecht,
            geschlechtPrimaryStatus: 'gelebt',
            geschlechtSecondary: null,
            geschlechtSecondaryStatus: null,
            orientierung: 'heterosexuell',  // Default
            orientierungStatus: 'gelebt'
        });
    },

    /**
     * Berechnet Bedürfnis-Übereinstimmung zwischen zwei Profilen
     *
     * @param {object} profil1 - Kernbedürfnisse Person 1
     * @param {object} profil2 - Kernbedürfnisse Person 2
     * @param {object} options - Optionale Parameter für erweiterte Berechnung
     * @param {string} options.identitaet1 - Geschlechtsidentität Person 1
     * @param {string} options.identitaet2 - Geschlechtsidentität Person 2
     * @returns {object} { score, gemeinsam, unterschiedlich, komplementaer, identitaetsResonanz }
     */
    berechneÜbereinstimmung: function(profil1, profil2, options) {
        var gemeinsam = [];
        var unterschiedlich = [];
        var komplementaer = [];
        options = options || {};

        var summeÜbereinstimmung = 0;
        var summeGewicht = 0;

        // Alle Bedürfnisse sammeln
        var alleBedürfnisse = new Set([
            ...Object.keys(profil1),
            ...Object.keys(profil2)
        ]);

        alleBedürfnisse.forEach(function(bed) {
            var wert1 = profil1[bed] || 50;
            var wert2 = profil2[bed] || 50;

            var gewicht = (wert1 + wert2) / 2;
            var diff = Math.abs(wert1 - wert2);

            // Kategorisierung
            if (diff <= 15) {
                // Übereinstimmung: Beide wollen ähnliches
                gemeinsam.push({ bedürfnis: bed, wert1: wert1, wert2: wert2 });
                summeÜbereinstimmung += (100 - diff) * gewicht;
            } else if (diff <= 35) {
                // Komplementär: Können sich ergänzen
                komplementaer.push({ bedürfnis: bed, wert1: wert1, wert2: wert2 });
                summeÜbereinstimmung += (100 - diff) * gewicht * 0.7;
            } else {
                // Unterschiedlich: Potentieller Konflikt
                unterschiedlich.push({ bedürfnis: bed, wert1: wert1, wert2: wert2, differenz: diff });
                summeÜbereinstimmung += (100 - diff) * gewicht * 0.3;
            }

            summeGewicht += gewicht;
        });

        var basisScore = summeGewicht > 0 ? Math.round(summeÜbereinstimmung / summeGewicht) : 50;

        // NEU: Identitäts-Resonanz berechnen und als Bonus/Malus einrechnen
        var identitaetsResonanz = null;
        var finalScore = basisScore;

        if (options.identitaet1 && options.identitaet2) {
            identitaetsResonanz = this.berechneIdentitaetsResonanz(
                options.identitaet1,
                options.identitaet2
            );

            // Resonanz-Bonus/Malus: Abweichung von 75 (neutral) als Modifikator
            // Score 100 → +5 Bonus, Score 50 → -5 Malus
            var resonanzModifikator = (identitaetsResonanz.score - 75) / 5;
            finalScore = Math.round(Math.max(0, Math.min(100, basisScore + resonanzModifikator)));
        }

        return {
            score: finalScore,
            basisScore: basisScore,
            gemeinsam: gemeinsam,
            unterschiedlich: unterschiedlich,
            komplementaer: komplementaer,
            identitaetsResonanz: identitaetsResonanz
        };
    },

    /**
     * Berechnet Identitäts-Resonanz zwischen zwei Geschlechtsidentitäten
     *
     * Philosophie:
     * - Pirsig: "Qualität entsteht, wenn Muster resonieren" → Matrix
     * - Osho: "Je offener zwei Flüsse, desto leichter münden sie ineinander" → Bonus
     *
     * @param {string} id1 - Geschlechtsidentität Person 1 (cis, trans, nonbinaer, fluid, suchend)
     * @param {string} id2 - Geschlechtsidentität Person 2
     * @returns {object} { score, matrixScore, opennessBonus, isWarning }
     */
    berechneIdentitaetsResonanz: function(id1, id2) {
        // Normalisieren
        id1 = (id1 || 'cis').toLowerCase();
        id2 = (id2 || 'cis').toLowerCase();

        // Identitäts-Matrix (Ähnlichkeit)
        var matrix = {
            "cis-cis": 100, "cis-trans": 85, "cis-nonbinaer": 70, "cis-fluid": 60, "cis-suchend": 50,
            "trans-cis": 85, "trans-trans": 100, "trans-nonbinaer": 80, "trans-fluid": 70, "trans-suchend": 60,
            "nonbinaer-cis": 70, "nonbinaer-trans": 80, "nonbinaer-nonbinaer": 95, "nonbinaer-fluid": 85, "nonbinaer-suchend": 80,
            "fluid-cis": 60, "fluid-trans": 70, "fluid-nonbinaer": 85, "fluid-fluid": 95, "fluid-suchend": 90,
            "suchend-cis": 50, "suchend-trans": 60, "suchend-nonbinaer": 80, "suchend-fluid": 90, "suchend-suchend": 100
        };

        // Offenheits-Werte
        var openness = {
            "cis": 0, "trans": 25, "nonbinaer": 50, "fluid": 75, "suchend": 100
        };

        // Matrix-Lookup
        var matrixKey = id1 + '-' + id2;
        var matrixScore = matrix[matrixKey] !== undefined ? matrix[matrixKey] : 75;

        // Offenheits-Bonus: (O1 + O2) / 200 × 10
        var o1 = openness[id1] !== undefined ? openness[id1] : 50;
        var o2 = openness[id2] !== undefined ? openness[id2] : 50;
        var opennessBonus = ((o1 + o2) / 200) * 10;

        var finalScore = Math.min(100, Math.round(matrixScore + opennessBonus));

        // Warnung wenn sehr unterschiedlich (Score < 60)
        var isWarning = finalScore < 60;

        return {
            score: finalScore,
            matrixScore: matrixScore,
            opennessBonus: Math.round(opennessBonus * 10) / 10,
            identity1: id1,
            identity2: id2,
            openness1: o1,
            openness2: o2,
            isWarning: isWarning,
            warningMessage: isWarning ?
                'Große Unterschiede in der Geschlechtsidentität - kann zusätzliche Kommunikation erfordern' : null
        };
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ID-KONVERTIERUNG (NEU v2.3)
    // ═══════════════════════════════════════════════════════════════════════════
    //
    // Konvertiert String-Keys zu #IDs für konsistente Referenzierung
    // Verwendet das zentrale BeduerfnisIds-Mapping

    /**
     * Lädt das BeduerfnisIds-Modul (lazy loading)
     */
    _getBeduerfnisIds: function() {
        if (this._beduerfnisIds) return this._beduerfnisIds;

        if (typeof require !== 'undefined') {
            try {
                this._beduerfnisIds = require('./beduerfnis-ids.js');
            } catch (e) {
                // Fallback: direkt aus window laden (Browser)
                this._beduerfnisIds = typeof BeduerfnisIds !== 'undefined' ? BeduerfnisIds : null;
            }
        } else if (typeof BeduerfnisIds !== 'undefined') {
            this._beduerfnisIds = BeduerfnisIds;
        }

        return this._beduerfnisIds;
    },

    /**
     * Konvertiert ein Modifikator-Objekt von String-Keys zu #IDs
     * @param {object} modObj - { selbstbestimmung: +20, ... }
     * @returns {object} - { '#B34': +20, ... }
     */
    toIds: function(modObj) {
        var ids = this._getBeduerfnisIds();
        if (!ids) return modObj;  // Fallback: unverändert zurückgeben

        return ids.convertObjToIds(modObj);
    },

    /**
     * Gibt die Modifikatoren für einen Dominanz-Typ als #IDs zurück
     * @param {string} typ - 'dominant', 'submissiv', 'switch', 'ausgeglichen'
     * @returns {object} - Modifikatoren mit #IDs
     */
    getDominanzMitIds: function(typ) {
        var mod = this.dominanz[typ];
        return mod ? this.toIds(mod) : {};
    },

    /**
     * Gibt die Modifikatoren für ein Geschlecht als #IDs zurück
     * @param {string} typ - 'cis_mann', 'cis_frau', etc.
     * @returns {object} - Modifikatoren mit #IDs
     */
    getGeschlechtMitIds: function(typ) {
        var mod = this.geschlecht[typ];
        return mod ? this.toIds(mod) : {};
    },

    /**
     * Gibt die Modifikatoren für eine Orientierung als #IDs zurück
     * @param {string} typ - 'heterosexuell', 'homosexuell', 'bisexuell'
     * @returns {object} - Modifikatoren mit #IDs
     */
    getOrientierungMitIds: function(typ) {
        var mod = this.orientierung[typ];
        return mod ? this.toIds(mod) : {};
    },

    /**
     * Gibt die Modifikatoren für eine Geschlechtsidentität als #IDs zurück
     * @param {string} typ - 'cis', 'trans', 'nonbinaer', 'fluid', 'suchend'
     * @returns {object} - Modifikatoren mit #IDs
     */
    getGeschlechtsidentitaetMitIds: function(typ) {
        var mod = this.geschlechtsidentitaet[typ];
        return mod ? this.toIds(mod) : {};
    },

    /**
     * Konvertiert das Ergebnis von berechneVollständigesBedürfnisProfil zu #IDs
     * @param {object} profil - Profil mit String-Keys
     * @returns {object} - Profil mit #IDs
     */
    profilZuIds: function(profil) {
        return this.toIds(profil);
    }
};

// Export für Node.js und Browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BeduerfnisModifikatoren;
}
