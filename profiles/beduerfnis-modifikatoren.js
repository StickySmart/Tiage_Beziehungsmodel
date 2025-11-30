/**
 * BEDÜRFNIS-MODIFIKATOREN
 *
 * Modifiziert die Basis-Bedürfnisse der 8 Archetypen basierend auf:
 * - Dominanz (4 Stufen)
 * - Geschlecht (9 Optionen)
 *
 * Formel: finalerWert = basisWert + dominanzMod + geschlechtMod
 * Ergebnis wird auf 0-100 begrenzt
 *
 * ENTWURF v1.0 - Zur Diskussion
 */

const BeduerfnisModifikatoren = {

    // ═══════════════════════════════════════════════════════════════════════════
    // DOMINANZ-MODIFIKATOREN
    // ═══════════════════════════════════════════════════════════════════════════
    //
    // Basiert auf: BDSM Personality Research (Wismeijer & van Assen, 2013)
    // + Self-Determination Theory (Ryan & Deci)
    // + OSHO's Polaritäts-Philosophie
    //
    // Werte: Positive = erhöht das Bedürfnis, Negative = reduziert es

    dominanz: {

        // ─────────────────────────────────────────────────────────────────────────
        // DOMINANT - Der Führende
        // ─────────────────────────────────────────────────────────────────────────
        // Charakteristik: Assertiv, kontrollierend, verantwortungsbewusst
        // Forschung: Höhere Extraversion, niedrigere Verträglichkeit (Big Five)

        dominant: {
            // FREIHEIT - Stark erhöht (will selbst bestimmen)
            selbstbestimmung: +15,
            waehlen_koennen: +15,
            unabhaengigkeit: +10,
            raum_haben: +5,
            spontaneitaet: +5,

            // SICHERHEIT - Moderat (gibt Sicherheit, braucht sie weniger)
            geborgenheit: -10,
            stabilitaet: +5,          // Will stabile Strukturen die er/sie führt
            sich_sicher_fuehlen: -5,
            schutz: -15,              // Bietet Schutz, braucht ihn nicht

            // ZUNEIGUNG - Differenziert
            naehe: -5,
            intimitaet: +5,           // Intime Kontrolle
            liebe: 0,
            fuersorge: +10,           // Will für andere sorgen
            waerme: -5,
            wertschaetzung: +10,      // Braucht Anerkennung

            // VERSTÄNDNIS - Niedrig (weniger Bedürfnis verstanden zu werden)
            akzeptanz: -5,
            empathie: -10,            // Weniger empathisch orientiert
            vertrauen: -5,            // Vertraut auf sich selbst
            verstanden_werden: -10,
            harmonie: -15,            // Nimmt Konflikte in Kauf

            // TEILNAHME - Führungsrolle
            kommunikation: +5,
            respekt: +15,             // Braucht Respekt
            gegenseitigkeit: -10,     // Asymmetrische Dynamik bevorzugt
            bedeutung_haben: +15,

            // IDENTITÄT - Stark
            authentizitaet: +10,
            kompetenz: +15,
            wirksamkeit: +20,         // Will wirksam sein
            herausforderung: +15,

            // NEUE BEDÜRFNISSE (spezifisch für Dominanz)
            fuehrung: +40,            // NEU: Bedürfnis zu führen
            kontrolle: +35,           // NEU: Bedürfnis nach Kontrolle
            verantwortung: +25,       // NEU: Verantwortung übernehmen
            hingabe: -30,             // NEU: Kein Bedürfnis sich hinzugeben
            dienen: -35              // NEU: Kein Bedürfnis zu dienen
        },

        // ─────────────────────────────────────────────────────────────────────────
        // SUBMISSIV - Der Hingebungsvolle
        // ─────────────────────────────────────────────────────────────────────────
        // Charakteristik: Anpassungsfähig, harmonieorientiert, vertrauensvoll
        // Forschung: Höhere Verträglichkeit, emotionale Stabilität (Big Five)

        submissiv: {
            // FREIHEIT - Reduziert (gibt Kontrolle gerne ab)
            selbstbestimmung: -15,
            waehlen_koennen: -10,
            unabhaengigkeit: -20,
            raum_haben: -10,
            spontaneitaet: -5,

            // SICHERHEIT - Stark erhöht (braucht sichere Führung)
            geborgenheit: +25,
            stabilitaet: +15,
            sich_sicher_fuehlen: +20,
            schutz: +25,              // Sucht Schutz

            // ZUNEIGUNG - Stark erhöht
            naehe: +15,
            intimitaet: +15,
            liebe: +10,
            fuersorge: -5,            // Wird umsorgt
            waerme: +20,
            wertschaetzung: +15,

            // VERSTÄNDNIS - Stark erhöht
            akzeptanz: +20,
            empathie: +15,
            vertrauen: +25,           // Muss dem Dom vertrauen
            verstanden_werden: +15,
            harmonie: +20,            // Harmonie ist wichtig

            // TEILNAHME - Dienend
            kommunikation: +10,
            respekt: +5,
            gegenseitigkeit: -5,      // Asymmetrie akzeptiert
            bedeutung_haben: +5,

            // IDENTITÄT - Anders orientiert
            authentizitaet: +5,
            kompetenz: -5,
            wirksamkeit: -10,
            herausforderung: -10,

            // NEUE BEDÜRFNISSE
            fuehrung: -30,            // Will nicht führen
            kontrolle: -35,           // Gibt Kontrolle ab
            verantwortung: -20,       // Weniger Verantwortungslast
            hingabe: +40,             // NEU: Starkes Bedürfnis sich hinzugeben
            dienen: +35              // NEU: Bedürfnis zu dienen
        },

        // ─────────────────────────────────────────────────────────────────────────
        // SWITCH - Der Wandelbare
        // ─────────────────────────────────────────────────────────────────────────
        // Charakteristik: Flexibel, situativ, erfahrungsorientiert
        // Beide Seiten werden geschätzt und gelebt

        switch: {
            // FREIHEIT - Erhöht (braucht Flexibilität)
            selbstbestimmung: +5,
            waehlen_koennen: +15,     // Wichtig: Kann wählen welche Rolle
            unabhaengigkeit: 0,
            raum_haben: +5,
            spontaneitaet: +15,       // Situativ reagieren

            // SICHERHEIT - Moderat
            geborgenheit: +5,
            stabilitaet: -5,          // Weniger statisch
            sich_sicher_fuehlen: +5,
            schutz: 0,

            // ZUNEIGUNG - Erhöht
            naehe: +10,
            intimitaet: +15,          // Beide Intimitäts-Formen
            liebe: +5,
            fuersorge: +5,
            waerme: +10,
            wertschaetzung: +10,

            // VERSTÄNDNIS - Erhöht (muss Partner lesen können)
            akzeptanz: +10,
            empathie: +15,            // Muss empathisch sein für Rollenwechsel
            vertrauen: +15,
            verstanden_werden: +10,
            harmonie: +5,

            // TEILNAHME - Flexibel
            kommunikation: +15,       // Wichtig für Aushandlung
            respekt: +10,
            gegenseitigkeit: +10,     // Wechselseitigkeit
            bedeutung_haben: +10,

            // IDENTITÄT - Vielfältig
            authentizitaet: +10,
            kompetenz: +5,
            wirksamkeit: +5,
            herausforderung: +10,

            // NEUE BEDÜRFNISSE
            fuehrung: +10,
            kontrolle: +5,
            verantwortung: +5,
            hingabe: +15,
            dienen: +10
        },

        // ─────────────────────────────────────────────────────────────────────────
        // AUSGEGLICHEN - Der Zentrierte
        // ─────────────────────────────────────────────────────────────────────────
        // Charakteristik: Balanciert, partnerschaftlich, egalitär
        // Weder führen noch folgen - gleichberechtigt

        ausgeglichen: {
            // FREIHEIT - Moderat
            selbstbestimmung: +5,
            waehlen_koennen: +5,
            unabhaengigkeit: +5,
            raum_haben: +5,
            spontaneitaet: 0,

            // SICHERHEIT - Moderat
            geborgenheit: +5,
            stabilitaet: +10,
            sich_sicher_fuehlen: +5,
            schutz: 0,

            // ZUNEIGUNG - Erhöht
            naehe: +10,
            intimitaet: +5,
            liebe: +10,
            fuersorge: +5,
            waerme: +10,
            wertschaetzung: +5,

            // VERSTÄNDNIS - Stark (Basis für Gleichberechtigung)
            akzeptanz: +10,
            empathie: +10,
            vertrauen: +10,
            verstanden_werden: +10,
            harmonie: +15,            // Harmonie wichtig

            // TEILNAHME - Partnerschaftlich
            kommunikation: +10,
            respekt: +10,
            gegenseitigkeit: +20,     // Stark: Gleichberechtigung
            bedeutung_haben: +5,

            // IDENTITÄT - Balanciert
            authentizitaet: +5,
            kompetenz: 0,
            wirksamkeit: 0,
            herausforderung: 0,

            // NEUE BEDÜRFNISSE
            fuehrung: 0,
            kontrolle: 0,
            verantwortung: +5,
            hingabe: 0,
            dienen: 0
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // GESCHLECHTS-MODIFIKATOREN
    // ═══════════════════════════════════════════════════════════════════════════
    //
    // Basiert auf: Gender Communication Research (Tannen, 1990)
    // + Sozialpsychologische Forschung zu Geschlechterrollen
    // + LGBTQ+ Forschung zu Identität und Akzeptanz
    //
    // WICHTIG: Dies sind statistische Tendenzen, keine Absolutwerte!
    // Kulturelle Prägung ≠ biologischer Determinismus

    geschlecht: {

        // ─────────────────────────────────────────────────────────────────────────
        // CIS MANN - Männlich sozialisiert
        // ─────────────────────────────────────────────────────────────────────────
        // Kulturelle Prägung: Stärke zeigen, Versorger-Rolle, emotionale Zurückhaltung

        cis_mann: {
            // FREIHEIT - Erhöht (Autonomie-Fokus)
            selbstbestimmung: +10,
            unabhaengigkeit: +15,
            raum_haben: +10,

            // SICHERHEIT - Reduziert (soll keine Schwäche zeigen)
            geborgenheit: -15,
            sich_sicher_fuehlen: -10,
            schutz: -20,              // Soll Schutz geben, nicht brauchen

            // ZUNEIGUNG - Reduziert (emotionale Distanz kultiviert)
            naehe: -10,
            waerme: -15,
            fuersorge: +5,            // Versorger-Rolle

            // VERSTÄNDNIS - Reduziert
            empathie: -10,
            verstanden_werden: -15,
            harmonie: -10,

            // TEILNAHME
            respekt: +15,             // Status wichtig
            kommunikation: -10,

            // IDENTITÄT
            kompetenz: +15,
            wirksamkeit: +15,

            // NEUE BEDÜRFNISSE
            anerkennung: +20,         // Braucht Anerkennung für Leistung
            status: +15               // Status in Gruppe wichtig
        },

        // ─────────────────────────────────────────────────────────────────────────
        // CIS FRAU - Weiblich sozialisiert
        // ─────────────────────────────────────────────────────────────────────────
        // Kulturelle Prägung: Beziehungsorientiert, emotional offen, fürsorglich

        cis_frau: {
            // FREIHEIT - Moderat reduziert
            selbstbestimmung: -5,
            unabhaengigkeit: -10,
            raum_haben: -5,

            // SICHERHEIT - Erhöht
            geborgenheit: +15,
            sich_sicher_fuehlen: +15,
            schutz: +10,

            // ZUNEIGUNG - Stark erhöht
            naehe: +15,
            waerme: +15,
            intimitaet: +10,
            fuersorge: +10,

            // VERSTÄNDNIS - Stark erhöht
            empathie: +15,
            verstanden_werden: +15,
            harmonie: +15,
            akzeptanz: +10,

            // TEILNAHME
            kommunikation: +15,
            gemeinschaft: +10,
            zugehoerigkeit: +10,

            // IDENTITÄT
            authentizitaet: +5,

            // NEUE BEDÜRFNISSE
            anerkennung: +10,
            verbindung: +20           // Emotionale Verbindung wichtiger
        },

        // ─────────────────────────────────────────────────────────────────────────
        // TRANS MANN - Männliche Identität, einzigartige Erfahrung
        // ─────────────────────────────────────────────────────────────────────────
        // Erfahrung: Selbstfindung, Akzeptanz-Kämpfe, Authentizitäts-Fokus

        trans_mann: {
            // FREIHEIT - Stark erhöht (hart erkämpfte Autonomie)
            selbstbestimmung: +20,
            unabhaengigkeit: +15,
            raum_haben: +10,

            // SICHERHEIT - Erhöht (Vulnerabilität erfahren)
            geborgenheit: +5,
            sich_sicher_fuehlen: +10,
            schutz: +5,

            // ZUNEIGUNG
            naehe: 0,
            waerme: 0,

            // VERSTÄNDNIS - Stark erhöht
            akzeptanz: +25,           // Akzeptanz ist zentral
            verstanden_werden: +20,
            empathie: +15,

            // IDENTITÄT - Sehr stark
            authentizitaet: +25,      // Authentizität hart erkämpft
            integritaet: +20,
            wachstum: +15,

            // TEILNAHME
            zugehoerigkeit: +15,
            gemeinschaft: +10,

            // NEUE BEDÜRFNISSE
            anerkennung: +20,         // Als Mann anerkannt werden
            sichtbarkeit: +15         // Gesehen werden wie man ist
        },

        // ─────────────────────────────────────────────────────────────────────────
        // TRANS FRAU - Weibliche Identität, einzigartige Erfahrung
        // ─────────────────────────────────────────────────────────────────────────

        trans_frau: {
            // FREIHEIT - Erhöht
            selbstbestimmung: +20,
            unabhaengigkeit: +10,
            raum_haben: +5,

            // SICHERHEIT - Stark erhöht (höhere Vulnerabilität)
            geborgenheit: +15,
            sich_sicher_fuehlen: +20,
            schutz: +20,              // Sicherheitsbedenken real

            // ZUNEIGUNG - Erhöht
            naehe: +10,
            waerme: +15,
            fuersorge: +5,

            // VERSTÄNDNIS - Sehr stark
            akzeptanz: +30,           // Noch höher wegen mehr Diskriminierung
            verstanden_werden: +25,
            empathie: +15,

            // IDENTITÄT - Sehr stark
            authentizitaet: +25,
            integritaet: +20,
            wachstum: +15,

            // TEILNAHME
            zugehoerigkeit: +20,
            gemeinschaft: +15,

            // NEUE BEDÜRFNISSE
            anerkennung: +25,
            sichtbarkeit: +20
        },

        // ─────────────────────────────────────────────────────────────────────────
        // NONBINÄR - Jenseits des Binären
        // ─────────────────────────────────────────────────────────────────────────

        nonbinaer: {
            // FREIHEIT - Sehr stark (Befreiung von Normen)
            selbstbestimmung: +25,
            waehlen_koennen: +20,
            unabhaengigkeit: +15,
            raum_haben: +15,

            // SICHERHEIT - Erhöht
            geborgenheit: +10,
            sich_sicher_fuehlen: +15,

            // ZUNEIGUNG
            naehe: +5,
            waerme: +5,

            // VERSTÄNDNIS - Sehr stark
            akzeptanz: +30,
            verstanden_werden: +25,
            empathie: +15,

            // IDENTITÄT - Maximal
            authentizitaet: +30,
            integritaet: +25,
            selbst_ausdruck: +25,

            // TEILNAHME
            zugehoerigkeit: +20,

            // NEUE BEDÜRFNISSE
            anerkennung: +20,
            sichtbarkeit: +25,
            flexibilitaet: +20        // Nicht in Schubladen gesteckt werden
        },

        // ─────────────────────────────────────────────────────────────────────────
        // GENDERFLUID - Fließende Identität
        // ─────────────────────────────────────────────────────────────────────────

        genderfluid: {
            // FREIHEIT - Maximal
            selbstbestimmung: +25,
            waehlen_koennen: +25,
            spontaneitaet: +20,
            raum_haben: +15,

            // SICHERHEIT - Moderat
            geborgenheit: +10,
            sich_sicher_fuehlen: +10,

            // VERSTÄNDNIS - Sehr stark
            akzeptanz: +30,
            verstanden_werden: +25,
            empathie: +15,

            // IDENTITÄT - Stark, aber flexibel
            authentizitaet: +25,
            selbst_ausdruck: +30,
            wachstum: +15,

            // NEUE BEDÜRFNISSE
            flexibilitaet: +30,       // Zentral für Genderfluid
            wandel: +25               // Veränderung ist Teil der Identität
        },

        // ─────────────────────────────────────────────────────────────────────────
        // AGENDER - Ohne Geschlechtsidentität
        // ─────────────────────────────────────────────────────────────────────────

        agender: {
            // FREIHEIT - Sehr stark
            selbstbestimmung: +25,
            unabhaengigkeit: +25,
            raum_haben: +20,

            // SICHERHEIT - Moderat
            geborgenheit: +5,
            sich_sicher_fuehlen: +10,

            // ZUNEIGUNG - Individuell (nicht geschlechtlich geprägt)
            naehe: 0,
            waerme: 0,

            // VERSTÄNDNIS - Stark
            akzeptanz: +25,
            verstanden_werden: +20,

            // IDENTITÄT - Stark
            authentizitaet: +30,
            integritaet: +25,

            // NEUE BEDÜRFNISSE
            neutralitaet: +30,        // Nicht geschlechtlich kategorisiert werden
            anerkennung: +15
        },

        // ─────────────────────────────────────────────────────────────────────────
        // INTERSEX - Biologische Vielfalt
        // ─────────────────────────────────────────────────────────────────────────

        intersex: {
            // FREIHEIT - Sehr stark (körperliche Selbstbestimmung)
            selbstbestimmung: +30,    // Besonders wichtig wegen medizinischer Geschichte
            unabhaengigkeit: +20,
            raum_haben: +15,

            // SICHERHEIT - Erhöht
            geborgenheit: +15,
            sich_sicher_fuehlen: +20,
            schutz: +15,

            // VERSTÄNDNIS - Sehr stark
            akzeptanz: +30,
            verstanden_werden: +25,
            empathie: +15,

            // IDENTITÄT - Stark
            authentizitaet: +25,
            integritaet: +25,

            // NEUE BEDÜRFNISSE
            koerperliche_autonomie: +35,  // Sehr wichtig
            anerkennung: +25,
            sichtbarkeit: +20
        },

        // ─────────────────────────────────────────────────────────────────────────
        // DIVERS - Andere/Vielfältig
        // ─────────────────────────────────────────────────────────────────────────

        divers: {
            // FREIHEIT - Stark
            selbstbestimmung: +20,
            waehlen_koennen: +20,
            unabhaengigkeit: +15,
            raum_haben: +15,

            // SICHERHEIT
            geborgenheit: +10,
            sich_sicher_fuehlen: +15,

            // VERSTÄNDNIS - Stark
            akzeptanz: +25,
            verstanden_werden: +20,
            empathie: +15,

            // IDENTITÄT - Stark
            authentizitaet: +25,
            selbst_ausdruck: +20,

            // NEUE BEDÜRFNISSE
            anerkennung: +20,
            sichtbarkeit: +20,
            flexibilitaet: +20
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // NEUE BEDÜRFNISSE (Ergänzung zum GFK-Katalog)
    // ═══════════════════════════════════════════════════════════════════════════
    // Diese Bedürfnisse sind spezifisch für Dominanz/Geschlecht relevant
    // und sollten zum Haupt-Katalog hinzugefügt werden

    neueBedürfnisse: {
        // Dominanz-spezifisch
        fuehrung: {
            name: "Führung",
            description: "Das Bedürfnis, zu führen und Richtung zu geben",
            kategorie: "identitaet"
        },
        kontrolle: {
            name: "Kontrolle",
            description: "Das Bedürfnis nach Kontrolle über Situationen",
            kategorie: "sicherheit"
        },
        hingabe: {
            name: "Hingabe",
            description: "Das Bedürfnis, sich hinzugeben und loszulassen",
            kategorie: "verbundenheit"
        },
        dienen: {
            name: "Dienen",
            description: "Das Bedürfnis, anderen zu dienen und zu gefallen",
            kategorie: "zuneigung"
        },
        verantwortung: {
            name: "Verantwortung",
            description: "Das Bedürfnis, Verantwortung zu übernehmen",
            kategorie: "identitaet"
        },

        // Geschlecht-spezifisch
        anerkennung: {
            name: "Anerkennung",
            description: "Das Bedürfnis, für die eigene Identität anerkannt zu werden",
            kategorie: "verstaendnis"
        },
        sichtbarkeit: {
            name: "Sichtbarkeit",
            description: "Das Bedürfnis, gesehen zu werden wie man ist",
            kategorie: "verstaendnis"
        },
        status: {
            name: "Status",
            description: "Das Bedürfnis nach sozialem Status und Position",
            kategorie: "teilnahme"
        },
        verbindung: {
            name: "Tiefe Verbindung",
            description: "Das Bedürfnis nach emotionaler Tiefe in Beziehungen",
            kategorie: "verbundenheit"
        },
        flexibilitaet: {
            name: "Flexibilität",
            description: "Das Bedürfnis, nicht kategorisiert zu werden",
            kategorie: "freiheit"
        },
        wandel: {
            name: "Wandel",
            description: "Das Bedürfnis nach Veränderung und Entwicklung",
            kategorie: "erschaffen"
        },
        neutralitaet: {
            name: "Neutralität",
            description: "Das Bedürfnis, geschlechtsneutral wahrgenommen zu werden",
            kategorie: "freiheit"
        },
        koerperliche_autonomie: {
            name: "Körperliche Autonomie",
            description: "Das Bedürfnis nach Selbstbestimmung über den eigenen Körper",
            kategorie: "freiheit"
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

        // Neue Bedürfnisse hinzufügen (die nur durch Modifikatoren kommen)
        var alleMods = Object.assign({}, domMod, geschMod);
        for (var neuBed in alleMods) {
            if (!ergebnis[neuBed] && alleMods[neuBed] !== 0) {
                // Basis 50 + Modifikatoren
                var domVal = domMod[neuBed] || 0;
                var geschVal = geschMod[neuBed] || 0;
                var neuWert = Math.max(0, Math.min(100, 50 + domVal + geschVal));
                if (neuWert !== 50) {  // Nur wenn tatsächlich modifiziert
                    ergebnis[neuBed] = Math.round(neuWert);
                }
            }
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
