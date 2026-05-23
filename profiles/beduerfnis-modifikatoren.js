/**
 * BEDÜRFNIS-MODIFIKATOREN v3.0
 *
 * v3.0: Vollständig auf 16 Volker-Bedürfnisse (#B1–#B16) umgestellt.
 * Direktes ID-basiertes System — keine String-Key-Konvertierung mehr nötig.
 *
 * Modifiziert die Basis-Bedürfnisse der 8 Archetypen basierend auf:
 * - Dominanz (dominant / submissiv / switch / ausgeglichen)
 * - Geschlecht (frau / mann / nonbinaer / trans / ...)
 * - Orientierung (heterosexuell / homosexuell / bisexuell)
 * - Geschlechtsidentität (cis / trans / nonbinaer / fluid / suchend)
 *
 * Formel: finalerWert = basisWert + domMod + geschlechtMod + oriMod + identMod
 * Ergebnis wird auf 0–100 begrenzt.
 *
 * 16 Bedürfnisse (Volker-Modell):
 *   Stufe 1 (passiv):    #B1 Wohlbefinden, #B2 Sicherheit, #B3 Leichtigkeit, #B4 Orientierung
 *   Stufe 2 (Handlung):  #B5 Wirksamkeit,  #B6 Freiheit,   #B7 Intensität,   #B8 Entwicklung
 *   Stufe 3 (sozial):    #B9 Gemeinschaft, #B10 Anerkennung,#B11 Gerechtigkeit,#B12 Verbundenheit
 *   Stufe 4 (Identität): #B13 Selbsterkenntnis, #B14 Sinn, #B15 Integrität, #B16 Selbstentfaltung
 */

const BeduerfnisModifikatoren = {

    // ═══════════════════════════════════════════════════════════════════════════
    // DOMINANZ-MODIFIKATOREN
    // ═══════════════════════════════════════════════════════════════════════════
    //
    // PIRSIG:  Dominant → Dynamic Quality (gestaltet, verändert)
    //          Submissiv → Static Quality (bewahrt, stabilisiert)
    // OSHO:    Dominant → Yang (aktiv, gebend)
    //          Submissiv → Yin (rezeptiv, empfangend)

    dominanz: {

        // ─────────────────────────────────────────────────────────────────────
        // DOMINANT — Der Führende (Yang, dynamisch)
        // ─────────────────────────────────────────────────────────────────────
        dominant: {
            '#B5':  +15,  // Wirksamkeit — Kern der Dominanz
            '#B6':  +12,  // Freiheit — Selbstbestimmung
            '#B7':  +10,  // Intensität — Spannung und Kraft
            '#B10': +12,  // Anerkennung — braucht Respekt und Bedeutung
            '#B15': +8,   // Integrität — trägt Verantwortung
            '#B2':  -8,   // Sicherheit — gibt Sicherheit, braucht sie weniger
            '#B12': -5,   // Verbundenheit — weniger Nähe-Bedürfnis
            '#B3':  -5    // Leichtigkeit — mehr Spannung als Entspannung
        },

        // ─────────────────────────────────────────────────────────────────────
        // SUBMISSIV — Der Hingebungsvolle (Yin, statisch)
        // ─────────────────────────────────────────────────────────────────────
        submissiv: {
            '#B2':  +15,  // Sicherheit — Kern der Submission
            '#B12': +15,  // Verbundenheit — emotionale Nähe zentral
            '#B7':  +10,  // Intensität — intensive Erfahrungen erleben
            '#B10': +8,   // Anerkennung — Wertschätzung empfangen
            '#B3':  +8,   // Leichtigkeit — sich fallen lassen können
            '#B4':  +8,   // Orientierung — Führung annehmen und folgen
            '#B6':  -15,  // Freiheit — gibt Autonomie bewusst ab
            '#B5':  -10   // Wirksamkeit — übergibt Kontrolle
        },

        // ─────────────────────────────────────────────────────────────────────
        // SWITCH — Der Wandelbare (fließend, beide Polaritäten)
        // ─────────────────────────────────────────────────────────────────────
        switch: {
            '#B7':  +15,  // Intensität — erlebt beide Seiten intensiv
            '#B6':  +5,   // Freiheit — braucht Flexibilität
            '#B2':  +5,   // Sicherheit — kann beide Rollen sicher halten
            '#B5':  +5,   // Wirksamkeit — kann führen UND folgen
            '#B16': +8    // Selbstentfaltung — kreative Rollenerkundung
        },

        // ─────────────────────────────────────────────────────────────────────
        // AUSGEGLICHEN — Der Zentrierte (Tao, balanciert)
        // ─────────────────────────────────────────────────────────────────────
        ausgeglichen: {
            '#B11': +5,   // Gerechtigkeit — Fairness und Gegenseitigkeit
            '#B9':  +5,   // Gemeinschaft — soziale Integration
            '#B13': +5    // Selbsterkenntnis — Reflexionsfähigkeit
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // GESCHLECHTS-MODIFIKATOREN
    // ═══════════════════════════════════════════════════════════════════════════
    //
    // Statistische Tendenzen durch kulturelle Sozialisation — keine Absolutwerte.
    // OSHO: "Die Gesellschaft hat euch zu Männern und Frauen gemacht."
    // PIRSIG: Cis = Statisches Muster; Trans/Nonbinär = Dynamische Qualität

    geschlecht: {

        // ─────────────────────────────────────────────────────────────────────
        // FRAU — weiblich sozialisiert
        // ─────────────────────────────────────────────────────────────────────
        frau: {
            '#B12': +6,   // Verbundenheit — emotionale Nähe
            '#B9':  +5,   // Gemeinschaft — soziale Einbindung
            '#B10': +5,   // Anerkennung — Wertschätzung
            '#B13': +4,   // Selbsterkenntnis — Selbstreflexion
            '#B6':  -2    // Freiheit — tendenziell geringere Autonomieorientierung
        },

        // ─────────────────────────────────────────────────────────────────────
        // MANN — männlich sozialisiert
        // ─────────────────────────────────────────────────────────────────────
        mann: {
            '#B5':  +6,   // Wirksamkeit — Handlungsfähigkeit und Leistung
            '#B6':  +5,   // Freiheit — Autonomie und Unabhängigkeit
            '#B10': +4,   // Anerkennung — Status und Respekt
            '#B9':  -4,   // Gemeinschaft — weniger sozialer Fokus
            '#B12': -3    // Verbundenheit — weniger emotionale Nähe
        },

        // ─────────────────────────────────────────────────────────────────────
        // NONBINÄR — jenseits der Dualität
        // ─────────────────────────────────────────────────────────────────────
        nonbinaer: {
            '#B16': +6,   // Selbstentfaltung — authentischer Ausdruck
            '#B6':  +5,   // Freiheit — Selbstbestimmung
            '#B13': +5,   // Selbsterkenntnis — Identitätsarbeit
            '#B11': +5    // Gerechtigkeit — Fairness und Akzeptanz
        },

        // ─────────────────────────────────────────────────────────────────────
        // TRANS MANN — erkämpfte Freiheit
        // ─────────────────────────────────────────────────────────────────────
        trans_mann: {
            '#B15': +10,  // Integrität — Authentizität
            '#B6':  +10,  // Freiheit — erkämpfte Selbstbestimmung
            '#B13': +8,   // Selbsterkenntnis — Identitätsprozess
            '#B11': +8    // Gerechtigkeit — Respekt und Akzeptanz
        },

        // ─────────────────────────────────────────────────────────────────────
        // TRANS FRAU — erkämpfte Authentizität + höhere Vulnerabilität
        // ─────────────────────────────────────────────────────────────────────
        trans_frau: {
            '#B15': +10,  // Integrität — Authentizität
            '#B2':  +8,   // Sicherheit — erhöhte Vulnerabilität
            '#B13': +8,   // Selbsterkenntnis — Identitätsprozess
            '#B11': +8,   // Gerechtigkeit — Respekt
            '#B12': +5    // Verbundenheit — Wärme und Zugehörigkeit
        },

        // ─────────────────────────────────────────────────────────────────────
        // GENDERFLUID — maximale Flexibilität
        // ─────────────────────────────────────────────────────────────────────
        genderfluid: {
            '#B16': +10,  // Selbstentfaltung — maximale Kreativität
            '#B6':  +12,  // Freiheit — maximale Autonomie
            '#B8':  +8,   // Entwicklung — ständige Veränderung
            '#B7':  +5    // Intensität — reiche innere Erfahrungen
        },

        // ─────────────────────────────────────────────────────────────────────
        // AGENDER — keine Genderidentität
        // ─────────────────────────────────────────────────────────────────────
        agender: {
            '#B6':  +12,  // Freiheit — Selbstbestimmung ohne Norm
            '#B16': +8,   // Selbstentfaltung — eigener Ausdruck
            '#B15': +8    // Integrität — Authentizität
        },

        // ─────────────────────────────────────────────────────────────────────
        // INTERSEX — körperliche Selbstbestimmung
        // ─────────────────────────────────────────────────────────────────────
        intersex: {
            '#B6':  +10,  // Freiheit — körperliche Selbstbestimmung
            '#B2':  +8,   // Sicherheit — erhöhte Vulnerabilität
            '#B15': +10,  // Integrität — Authentizität
            '#B11': +8    // Gerechtigkeit — Gleichwertigkeit
        },

        // ─────────────────────────────────────────────────────────────────────
        // DIVERS — diverse Identität
        // ─────────────────────────────────────────────────────────────────────
        divers: {
            '#B16': +8,   // Selbstentfaltung
            '#B6':  +8,   // Freiheit
            '#B11': +8,   // Gerechtigkeit
            '#B15': +8    // Integrität
        },

        // Legacy-Aliase für Rückwärtskompatibilität
        get cis_frau()   { return BeduerfnisModifikatoren.geschlecht.frau; },
        get cis_mann()   { return BeduerfnisModifikatoren.geschlecht.mann; }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ORIENTIERUNGS-MODIFIKATOREN
    // ═══════════════════════════════════════════════════════════════════════════
    //
    // OSHO: "Alle Orientierungen sind natürlich, wenn authentisch gelebt."
    // PIRSIG: Heterosexualität = Statisches Muster; Andere = Dynamische Qualität

    orientierung: {

        // ─────────────────────────────────────────────────────────────────────
        // HETEROSEXUELL — gesellschaftliche Norm
        // ─────────────────────────────────────────────────────────────────────
        heterosexuell: {
            '#B2':  +3,   // Sicherheit — mehr gesellschaftliche Stabilität
            '#B3':  +3    // Leichtigkeit — weniger Diskriminierungserfahrung
        },

        // ─────────────────────────────────────────────────────────────────────
        // HOMOSEXUELL — authentisch erkämpft
        // ─────────────────────────────────────────────────────────────────────
        homosexuell: {
            '#B11': +8,   // Gerechtigkeit — Fairness und Akzeptanz
            '#B9':  +8,   // Gemeinschaft — Community zentral
            '#B15': +8,   // Integrität — Authentizität erkämpft
            '#B13': +5,   // Selbsterkenntnis — Identitätsarbeit
            '#B6':  +5,   // Freiheit — Selbstbestimmung
            '#B2':  +5    // Sicherheit — in manchen Umfeldern erhöht
        },

        // ─────────────────────────────────────────────────────────────────────
        // BISEXUELL — maximale Offenheit
        // ─────────────────────────────────────────────────────────────────────
        bisexuell: {
            '#B11': +8,   // Gerechtigkeit — oft von beiden Seiten hinterfragt
            '#B6':  +10,  // Freiheit — Offenheit und Selbstbestimmung
            '#B13': +5,   // Selbsterkenntnis — Identitätsreflexion
            '#B8':  +8,   // Entwicklung — Exploration und Entdeckung
            '#B16': +5    // Selbstentfaltung — authentischer Ausdruck
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // GESCHLECHTSIDENTITÄTS-MODIFIKATOREN
    // ═══════════════════════════════════════════════════════════════════════════
    //
    // Skala: Cis → Trans → Nonbinär → Fluid → Suchend
    //        Form    Wandel   Jenseits   Fluss    Entdeckung
    //
    // PIRSIG: Cis = Statisch; Fluid/Suchend = Maximale Dynamische Qualität
    // OSHO:   "Der Fluss weiß nicht wohin, aber er fließt."

    geschlechtsidentitaet: {

        // ─────────────────────────────────────────────────────────────────────
        // CIS — gefestigte Form
        // ─────────────────────────────────────────────────────────────────────
        cis: {
            '#B2':  +5,   // Sicherheit — Identitätsstabilität
            '#B3':  +3    // Leichtigkeit — weniger Identitätsfragen
        },

        // ─────────────────────────────────────────────────────────────────────
        // TRANS — Wandel durchlebt, neue Klarheit
        // ─────────────────────────────────────────────────────────────────────
        trans: {
            '#B15': +10,  // Integrität — Authentizität erkämpft
            '#B13': +8,   // Selbsterkenntnis — tiefer Identitätsprozess
            '#B11': +8,   // Gerechtigkeit — Respekt und Akzeptanz
            '#B6':  +8,   // Freiheit — Selbstbestimmung
            '#B2':  +5    // Sicherheit — erhöhte Vulnerabilität
        },

        // ─────────────────────────────────────────────────────────────────────
        // NONBINÄR — jenseits der Dualität
        // ─────────────────────────────────────────────────────────────────────
        nonbinaer: {
            '#B16': +10,  // Selbstentfaltung — kreativer Ausdruck
            '#B6':  +10,  // Freiheit — Freiheit von Kategorien
            '#B13': +8,   // Selbsterkenntnis — Identitätserkundung
            '#B11': +8,   // Gerechtigkeit — Sichtbarkeit und Akzeptanz
            '#B15': +8    // Integrität — Authentizität
        },

        // ─────────────────────────────────────────────────────────────────────
        // FLUID — maximale Dynamik
        // ─────────────────────────────────────────────────────────────────────
        fluid: {
            '#B8':  +10,  // Entwicklung — Wandel als Lebensform
            '#B6':  +12,  // Freiheit — maximale Offenheit
            '#B16': +10,  // Selbstentfaltung — ständige Neuerschaffung
            '#B7':  +5,   // Intensität — reiche innere Erfahrungen
            '#B2':  -8    // Sicherheit — Stabilität weniger zentral
        },

        // ─────────────────────────────────────────────────────────────────────
        // SUCHEND — Anfängergeist (Shoshin)
        // ─────────────────────────────────────────────────────────────────────
        suchend: {
            '#B8':  +12,  // Entwicklung — Exploration zentral
            '#B6':  +10,  // Freiheit — Raum zum Erkunden
            '#B13': +8,   // Selbsterkenntnis — Identitätssuche
            '#B11': +8,   // Gerechtigkeit — Bedürfnis nach Akzeptanz
            '#B2':  -10   // Sicherheit — noch im Wandel
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // STATUS-FAKTOREN
    // ═══════════════════════════════════════════════════════════════════════════
    //
    // "gelebt" = aktiv praktiziert, integriert in Identität
    // "interessiert" = Exploration, noch nicht gefestigt

    status: {
        gelebt:      1.0,  // Volle Gewichtung
        interessiert: 0.7  // 70% Gewichtung (noch im Wandel)
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // HILFSFUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Berechnet finale Bedürfnisse für ein vollständiges Profil.
     *
     * FORMEL:
     * finalerWert = (basis + domMod×domStatus + geschMod×gStatus
     *               + identMod×identWeight×identStatus + oriMod×oriStatus)
     *
     * @param {object} params
     * @param {object} params.basisBedürfnisse        — Archetyp-Basiswerte {#B1: n, ...}
     * @param {string} params.dominanz                — 'dominant'|'submissiv'|'switch'|'ausgeglichen'
     * @param {string} params.dominanzStatus          — 'gelebt'|'interessiert'
     * @param {string} params.geschlechtPrimary       — z.B. 'frau', 'mann', 'nonbinaer'
     * @param {string} params.geschlechtPrimaryStatus — 'gelebt'|'interessiert'
     * @param {string} params.geschlechtSecondary     — optional, zweite Geschlechtsidentität
     * @param {string} params.geschlechtSecondaryStatus
     * @param {string} params.geschlechtsidentitaet  — 'cis'|'trans'|'nonbinaer'|'fluid'|'suchend'
     * @param {string} params.geschlechtsidentitaetStatus
     * @param {string} params.orientierung            — 'heterosexuell'|'homosexuell'|'bisexuell'
     * @param {string} params.orientierungStatus
     * @returns {object} Modifizierte Bedürfnisse {#B1: n, ...}
     */
    berechneVollständigesBedürfnisProfil: function(params) {
        var ergebnis = {};

        var domMod   = this.dominanz[params.dominanz] || {};
        var gesch1Mod = this.geschlecht[params.geschlechtPrimary] || {};
        var gesch2Mod = params.geschlechtSecondary ?
            (this.geschlecht[params.geschlechtSecondary] || {}) : {};
        var oriMod   = this.orientierung[params.orientierung] || {};
        var identMod = params.geschlechtsidentitaet ?
            (this.geschlechtsidentitaet[params.geschlechtsidentitaet] || {}) : {};

        var domStatus   = this.status[params.dominanzStatus]              || 1.0;
        var g1Status    = this.status[params.geschlechtPrimaryStatus]     || 1.0;
        var g2Status    = this.status[params.geschlechtSecondaryStatus]   || 1.0;
        var identStatus = this.status[params.geschlechtsidentitaetStatus] || 1.0;
        var oriStatus   = this.status[params.orientierungStatus]          || 1.0;

        var g2Weight    = 0.5;   // Sekundäres Geschlecht: 50%
        var identWeight = 0.75;  // Geschlechtsidentität: 75%

        for (var bed in params.basisBedürfnisse) {
            var basis    = params.basisBedürfnisse[bed];
            var domDelta  = (domMod[bed]   || 0) * domStatus;
            var g1Delta   = (gesch1Mod[bed]|| 0) * g1Status;
            var g2Delta   = (gesch2Mod[bed]|| 0) * g2Weight * g2Status;
            var identDelta= (identMod[bed] || 0) * identWeight * identStatus;
            var oriDelta  = (oriMod[bed]   || 0) * oriStatus;

            var final = basis + domDelta + g1Delta + g2Delta + identDelta + oriDelta;
            ergebnis[bed] = Math.round(Math.max(0, Math.min(100, final)));
        }

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
            orientierung: 'heterosexuell',
            orientierungStatus: 'gelebt'
        });
    },

    /**
     * Berechnet Bedürfnis-Übereinstimmung zwischen zwei Profilen.
     *
     * @param {object} profil1 - Bedürfniswerte Person 1 {#B1: n, ...}
     * @param {object} profil2 - Bedürfniswerte Person 2
     * @param {object} options - { identitaet1, identitaet2 }
     * @returns {object} { score, gemeinsam, unterschiedlich, komplementaer, identitaetsResonanz }
     */
    berechneÜbereinstimmung: function(profil1, profil2, options) {
        var gemeinsam      = [];
        var unterschiedlich = [];
        var komplementaer  = [];
        options = options || {};

        var summeÜbereinstimmung = 0;
        var summeGewicht = 0;

        var alleBedürfnisse = new Set([
            ...Object.keys(profil1),
            ...Object.keys(profil2)
        ]);

        alleBedürfnisse.forEach(function(bed) {
            var wert1   = profil1[bed] || 50;
            var wert2   = profil2[bed] || 50;
            var gewicht = (wert1 + wert2) / 2;
            var diff    = Math.abs(wert1 - wert2);

            if (diff <= 15) {
                gemeinsam.push({ bedürfnis: bed, wert1: wert1, wert2: wert2 });
                summeÜbereinstimmung += (100 - diff) * gewicht;
            } else if (diff <= 35) {
                komplementaer.push({ bedürfnis: bed, wert1: wert1, wert2: wert2 });
                summeÜbereinstimmung += (100 - diff) * gewicht * 0.7;
            } else {
                unterschiedlich.push({ bedürfnis: bed, wert1: wert1, wert2: wert2, differenz: diff });
                summeÜbereinstimmung += (100 - diff) * gewicht * 0.3;
            }

            summeGewicht += gewicht;
        });

        var basisScore   = summeGewicht > 0 ? Math.round(summeÜbereinstimmung / summeGewicht) : 50;
        var finalScore   = basisScore;
        var identitaetsResonanz = null;

        if (options.identitaet1 && options.identitaet2) {
            identitaetsResonanz = this.berechneIdentitaetsResonanz(
                options.identitaet1,
                options.identitaet2
            );
            var resonanzMod = (identitaetsResonanz.score - 75) / 5;
            finalScore = Math.round(Math.max(0, Math.min(100, basisScore + resonanzMod)));
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
     * Berechnet Identitäts-Resonanz zwischen zwei Geschlechtsidentitäten.
     *
     * @param {string} id1 — 'cis'|'trans'|'nonbinaer'|'fluid'|'suchend'
     * @param {string} id2
     * @returns {object} { score, matrixScore, opennessBonus, isWarning }
     */
    berechneIdentitaetsResonanz: function(id1, id2) {
        id1 = (id1 || 'cis').toLowerCase();
        id2 = (id2 || 'cis').toLowerCase();

        var matrix = {
            'cis-cis': 100,       'cis-trans': 85,       'cis-nonbinaer': 70,    'cis-fluid': 60,    'cis-suchend': 50,
            'trans-cis': 85,      'trans-trans': 100,    'trans-nonbinaer': 80,  'trans-fluid': 70,  'trans-suchend': 60,
            'nonbinaer-cis': 70,  'nonbinaer-trans': 80, 'nonbinaer-nonbinaer': 95,'nonbinaer-fluid': 85,'nonbinaer-suchend': 80,
            'fluid-cis': 60,      'fluid-trans': 70,     'fluid-nonbinaer': 85,  'fluid-fluid': 95,  'fluid-suchend': 90,
            'suchend-cis': 50,    'suchend-trans': 60,   'suchend-nonbinaer': 80,'suchend-fluid': 90,'suchend-suchend': 100
        };

        var openness = { 'cis': 0, 'trans': 25, 'nonbinaer': 50, 'fluid': 75, 'suchend': 100 };

        var matrixScore  = matrix[id1 + '-' + id2] !== undefined ? matrix[id1 + '-' + id2] : 75;
        var o1           = openness[id1] !== undefined ? openness[id1] : 50;
        var o2           = openness[id2] !== undefined ? openness[id2] : 50;
        var opennessBonus = ((o1 + o2) / 200) * 10;
        var finalScore   = Math.min(100, Math.round(matrixScore + opennessBonus));
        var isWarning    = finalScore < 60;

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
                'Große Unterschiede in der Geschlechtsidentität — kann zusätzliche Kommunikation erfordern' : null
        };
    }
};

// Export für Node.js und Browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BeduerfnisModifikatoren;
}
if (typeof window !== 'undefined') {
    window.BeduerfnisModifikatoren = BeduerfnisModifikatoren;
}
