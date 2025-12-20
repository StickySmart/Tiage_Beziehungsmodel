/**
 * TIAGE BEDÜRFNIS-ID-KATALOG v3.0
 *
 * AUTOMATISCH GENERIERT aus beduerfnis-katalog.json (SSOT)
 * Letzte Generierung: 2025-12-20
 *
 * WICHTIG: Diese Datei wird aus beduerfnis-katalog.json generiert!
 *          Änderungen hier werden bei der nächsten Generierung überschrieben.
 *          Zum Ändern: beduerfnis-katalog.json bearbeiten und Generator ausführen.
 *
 * Generierung: node scripts/generate-beduerfnis-ids.js
 *
 * Struktur:
 * #P1-#P4   → 4 Perspektiven    (siehe taxonomie.js)
 * #D1-#D6   → 6 Dimensionen     (siehe taxonomie.js, Kurzform A-F)
 * #K1-#K18  → 18 Kategorien     (siehe taxonomie.js)
 * #B1-#B223  → 223 Bedürfnisse
 *
 * TOTAL: 223 Bedürfnisse
 */

const BeduerfnisIds = {

    version: '3.0.0',
    generatedFrom: 'beduerfnis-katalog.json',
    generatedAt: '2025-12-20T10:46:43.004Z',

    // ═══════════════════════════════════════════════════════════════════════════
    // TAXONOMIE-REFERENZ (SSOT)
    // ═══════════════════════════════════════════════════════════════════════════

    _taxonomie: null,

    _getTaxonomie: function() {
        if (this._taxonomie) return this._taxonomie;

        if (typeof window !== 'undefined' && window.TiageTaxonomie) {
            this._taxonomie = window.TiageTaxonomie;
        } else if (typeof TiageTaxonomie !== 'undefined') {
            this._taxonomie = TiageTaxonomie;
        } else if (typeof require !== 'undefined') {
            try {
                this._taxonomie = require('./taxonomie.js');
            } catch (e) {
                console.warn('TiageTaxonomie nicht verfügbar:', e.message);
            }
        }
        return this._taxonomie;
    },

    get perspektiven() {
        var tax = this._getTaxonomie();
        return tax ? tax.perspektiven : {};
    },

    get dimensionen() {
        var tax = this._getTaxonomie();
        return tax ? tax.dimensionen : {};
    },

    get kategorien() {
        var tax = this._getTaxonomie();
        return tax ? tax.kategorien : {};
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // BEDÜRFNISSE (generiert aus beduerfnis-katalog.json)
    // ═══════════════════════════════════════════════════════════════════════════

    beduerfnisse: {
        // ─────────────────────────────────────────────────────────────────────────
        // EXISTENZ (#B1-#B9) - Kategorie #K1
        // ─────────────────────────────────────────────────────────────────────────
        '#B1': { key: 'koerperliche_grundbeduerfnisse', kategorie: '#K1', label: 'Körperliche-Grundbedürfnisse' },
        '#B2': { key: 'wasser', kategorie: '#K1', label: 'Wasser' },
        '#B3': { key: 'nahrung', kategorie: '#K1', label: 'Nahrung' },
        '#B4': { key: 'bewegung', kategorie: '#K1', label: 'Bewegung' },
        '#B5': { key: 'beruehrung_und_koerperkontakt', kategorie: '#K1', label: 'Berührung-&-Körperkontakt' },
        '#B6': { key: 'erholung', kategorie: '#K1', label: 'Erholung' },
        '#B7': { key: 'sexueller_ausdruck', kategorie: '#K1', label: 'Sexueller-Ausdruck' },
        '#B8': { key: 'physische_sicherheit', kategorie: '#K1', label: 'Physische-Sicherheit' },
        '#B9': { key: 'unterschlupf', kategorie: '#K1', label: 'Unterschlupf' },

        // ─────────────────────────────────────────────────────────────────────────
        // SICHERHEIT (#B10-#B15) - Kategorie #K2
        // ─────────────────────────────────────────────────────────────────────────
        '#B10': { key: 'bestaendigkeit', kategorie: '#K2', label: 'Beständigkeit' },
        '#B11': { key: 'stabilitaet_und_sicherheit', kategorie: '#K2', label: 'Stabilität-&-Sicherheit' },
        '#B12': { key: 'schutz', kategorie: '#K2', label: 'Schutz' },
        '#B13': { key: 'stabilitaet', kategorie: '#K2', label: 'Stabilität' },
        '#B14': { key: 'leichtigkeit', kategorie: '#K2', label: 'Leichtigkeit' },
        '#B15': { key: 'geborgenheit', kategorie: '#K2', label: 'Geborgenheit' },

        // ─────────────────────────────────────────────────────────────────────────
        // ZUNEIGUNG (#B16-#B24) - Kategorie #K3
        // ─────────────────────────────────────────────────────────────────────────
        '#B16': { key: 'waerme', kategorie: '#K3', label: 'Wärme' },
        '#B17': { key: 'wertschaetzung', kategorie: '#K3', label: 'Wertschätzung' },
        '#B18': { key: 'emotionale_naehe', kategorie: '#K3', label: 'Emotionale-Nähe' },
        '#B19': { key: 'gesellschaft', kategorie: '#K3', label: 'Gesellschaft' },
        '#B20': { key: 'intimitaet', kategorie: '#K3', label: 'Intimität' },
        '#B21': { key: 'liebe', kategorie: '#K3', label: 'Liebe' },
        '#B22': { key: 'fuersorge_und_unterstuetzung', kategorie: '#K3', label: 'Fürsorge-&-Unterstützung' },
        '#B23': { key: 'unterstuetzung', kategorie: '#K3', label: 'Unterstützung' },
        '#B24': { key: 'fuereinander_da_sein', kategorie: '#K3', label: 'Füreinander-da-sein' },

        // ─────────────────────────────────────────────────────────────────────────
        // VERSTÄNDNIS (#B25-#B33) - Kategorie #K4
        // ─────────────────────────────────────────────────────────────────────────
        '#B25': { key: 'akzeptanz_und_empathie', kategorie: '#K4', label: 'Akzeptanz-&-Empathie' },
        '#B26': { key: 'mitgefuehl', kategorie: '#K4', label: 'Mitgefühl' },
        '#B27': { key: 'beruecksichtigung', kategorie: '#K4', label: 'Berücksichtigung' },
        '#B28': { key: 'empathie', kategorie: '#K4', label: 'Empathie' },
        '#B29': { key: 'vertrauen', kategorie: '#K4', label: 'Vertrauen' },
        '#B30': { key: 'beachtung', kategorie: '#K4', label: 'Beachtung' },
        '#B31': { key: 'gesehen_und_verstanden_werden', kategorie: '#K4', label: 'Gesehen-&-Verstanden-werden' },
        '#B32': { key: 'verstanden_werden', kategorie: '#K4', label: 'Verstanden-werden' },
        '#B33': { key: 'harmonie', kategorie: '#K4', label: 'Harmonie' },

        // ─────────────────────────────────────────────────────────────────────────
        // FREIHEIT (#B34-#B38) - Kategorie #K5
        // ─────────────────────────────────────────────────────────────────────────
        '#B34': { key: 'selbstbestimmung_und_unabhaengigkeit', kategorie: '#K5', label: 'Selbstbestimmung-&-Unabhängigkeit' },
        '#B35': { key: 'waehlen_koennen', kategorie: '#K5', label: 'Wählen-können' },
        '#B36': { key: 'unabhaengigkeit', kategorie: '#K5', label: 'Unabhängigkeit' },
        '#B37': { key: 'raum_haben', kategorie: '#K5', label: 'Raum-haben' },
        '#B38': { key: 'spontaneitaet', kategorie: '#K5', label: 'Spontaneität' },

        // ─────────────────────────────────────────────────────────────────────────
        // TEILNAHME (#B39-#B45) - Kategorie #K6
        // ─────────────────────────────────────────────────────────────────────────
        '#B39': { key: 'zusammenarbeit', kategorie: '#K6', label: 'Zusammenarbeit' },
        '#B40': { key: 'kommunikation', kategorie: '#K6', label: 'Kommunikation' },
        '#B41': { key: 'gemeinschaft', kategorie: '#K6', label: 'Gemeinschaft' },
        '#B42': { key: 'zugehoerigkeit', kategorie: '#K6', label: 'Zugehörigkeit' },
        '#B43': { key: 'gegenseitigkeit', kategorie: '#K6', label: 'Gegenseitigkeit' },
        '#B44': { key: 'respekt', kategorie: '#K6', label: 'Respekt' },
        '#B45': { key: 'bedeutung_haben', kategorie: '#K6', label: 'Bedeutung-haben' },

        // ─────────────────────────────────────────────────────────────────────────
        // MUSSE (#B46-#B211) - Kategorie #K7
        // ─────────────────────────────────────────────────────────────────────────
        '#B46': { key: 'schoenheit', kategorie: '#K7', label: 'Schönheit' },
        '#B47': { key: 'freizeit', kategorie: '#K7', label: 'Freizeit' },
        '#B48': { key: 'freude_und_lebensgenuss', kategorie: '#K7', label: 'Freude-&-Lebensgenuss' },
        '#B49': { key: 'humor', kategorie: '#K7', label: 'Humor' },

        // ─────────────────────────────────────────────────────────────────────────
        // IDENTITÄT (#B50-#B63) - Kategorie #K8
        // ─────────────────────────────────────────────────────────────────────────
        '#B50': { key: 'authentizitaet', kategorie: '#K8', label: 'Authentizität' },
        '#B51': { key: 'echtheit', kategorie: '#K8', label: 'Echtheit' },
        '#B52': { key: 'integritaet', kategorie: '#K8', label: 'Integrität' },
        '#B53': { key: 'praesenz', kategorie: '#K8', label: 'Präsenz' },
        '#B54': { key: 'ordnung', kategorie: '#K8', label: 'Ordnung' },
        '#B55': { key: 'bewusstheit_und_klarheit', kategorie: '#K8', label: 'Bewusstheit-&-Klarheit' },
        '#B56': { key: 'herausforderung', kategorie: '#K8', label: 'Herausforderung' },
        '#B57': { key: 'klarheit', kategorie: '#K8', label: 'Klarheit' },
        '#B58': { key: 'kompetenz_und_wirksamkeit', kategorie: '#K8', label: 'Kompetenz-&-Wirksamkeit' },
        '#B59': { key: 'effizienz', kategorie: '#K8', label: 'Effizienz' },
        '#B60': { key: 'wirksamkeit', kategorie: '#K8', label: 'Wirksamkeit' },
        '#B61': { key: 'wachstum_und_sinn', kategorie: '#K8', label: 'Wachstum-&-Sinn' },
        '#B62': { key: 'sinn', kategorie: '#K8', label: 'Sinn' },
        '#B63': { key: 'beitrag_leisten', kategorie: '#K8', label: 'Beitrag-leisten' },

        // ─────────────────────────────────────────────────────────────────────────
        // ERSCHAFFEN (#B64-#B68) - Kategorie #K9
        // ─────────────────────────────────────────────────────────────────────────
        '#B64': { key: 'kreativitaet_und_selbstausdruck', kategorie: '#K9', label: 'Kreativität-&-Selbstausdruck' },
        '#B65': { key: 'entdecken_und_lernen', kategorie: '#K9', label: 'Entdecken-&-Lernen' },
        '#B66': { key: 'lernen', kategorie: '#K9', label: 'Lernen' },
        '#B67': { key: 'selbst_ausdruck', kategorie: '#K9', label: 'Selbst-Ausdruck' },
        '#B68': { key: 'anreize_bekommen', kategorie: '#K9', label: 'Anreize-bekommen' },

        // ─────────────────────────────────────────────────────────────────────────
        // VERBUNDENHEIT (#B69-#B73) - Kategorie #K10
        // ─────────────────────────────────────────────────────────────────────────
        '#B69': { key: 'lebensfreude', kategorie: '#K10', label: 'Lebensfreude' },
        '#B70': { key: 'inspiration', kategorie: '#K10', label: 'Inspiration' },
        '#B71': { key: 'emotionale_tiefe', kategorie: '#K10', label: 'Emotionale-Tiefe' },
        '#B72': { key: 'einsehen', kategorie: '#K10', label: 'Einsehen' },
        '#B73': { key: 'anfang_ende', kategorie: '#K10', label: 'Anfang-Ende' },

        // ─────────────────────────────────────────────────────────────────────────
        // DYNAMIK (#B74-#B223) - Kategorie #K11
        // ─────────────────────────────────────────────────────────────────────────
        '#B74': { key: 'kontrolle_ausueben', kategorie: '#K11', label: 'Kontrolle-ausüben' },
        '#B75': { key: 'hingabe', kategorie: '#K11', label: 'Hingabe' },
        '#B76': { key: 'fuehrung_geben', kategorie: '#K11', label: 'Führung-geben' },
        '#B77': { key: 'gefuehrt_werden', kategorie: '#K11', label: 'Geführt-werden' },
        '#B78': { key: 'ritual', kategorie: '#K11', label: 'Ritual' },
        '#B79': { key: 'nachsorge', kategorie: '#K11', label: 'Nachsorge' },
        '#B80': { key: 'grenzen_setzen', kategorie: '#K11', label: 'Grenzen-setzen' },
        '#B81': { key: 'grenzen_respektieren', kategorie: '#K11', label: 'Grenzen-respektieren' },
        '#B82': { key: 'intensitaet', kategorie: '#K11', label: 'Intensität' },
        '#B83': { key: 'vertrauen_schenken', kategorie: '#K11', label: 'Vertrauen-schenken' },
        '#B84': { key: 'verantwortung_uebernehmen', kategorie: '#K11', label: 'Verantwortung-übernehmen' },
        '#B85': { key: 'sich_fallenlassen', kategorie: '#K11', label: 'Sich-fallenlassen' },
        '#B86': { key: 'machtdynamik', kategorie: '#K11', label: 'Machtdynamik' },
        '#B87': { key: 'rollenausdruck', kategorie: '#K11', label: 'Rollenausdruck' },
        '#B88': { key: 'beschuetzen', kategorie: '#K11', label: 'Beschützen' },

        // ─────────────────────────────────────────────────────────────────────────
        // LEBENSPLANUNG (#B89-#B113) - Kategorie #K12
        // ─────────────────────────────────────────────────────────────────────────
        '#B89': { key: 'kinder_und_elternschaft', kategorie: '#K12', label: 'Kinder-&-Elternschaft' },
        '#B90': { key: 'elternschaft', kategorie: '#K12', label: 'Elternschaft' },
        '#B91': { key: 'fortpflanzung', kategorie: '#K12', label: 'Fortpflanzung' },
        '#B92': { key: 'familie_gruenden', kategorie: '#K12', label: 'Familie-gründen' },
        '#B93': { key: 'generativitaet', kategorie: '#K12', label: 'Generativität' },
        '#B94': { key: 'verbindlichkeit', kategorie: '#K12', label: 'Verbindlichkeit' },
        '#B95': { key: 'langfristige_bindung', kategorie: '#K12', label: 'Langfristige-Bindung' },
        '#B96': { key: 'rechtliche_sicherheit', kategorie: '#K12', label: 'Rechtliche-Sicherheit' },
        '#B97': { key: 'treueversprechen', kategorie: '#K12', label: 'Treueversprechen' },
        '#B98': { key: 'zusammenleben', kategorie: '#K12', label: 'Zusammenleben' },
        '#B99': { key: 'haeuslichkeit', kategorie: '#K12', label: 'Häuslichkeit' },
        '#B100': { key: 'nest_bauen', kategorie: '#K12', label: 'Nest-bauen' },
        '#B101': { key: 'alltag_teilen', kategorie: '#K12', label: 'Alltag-teilen' },
        '#B102': { key: 'eigener_raum', kategorie: '#K12', label: 'Eigener-Raum' },
        '#B103': { key: 'rueckzugsort', kategorie: '#K12', label: 'Rückzugsort' },
        '#B104': { key: 'haustiere', kategorie: '#K12', label: 'Haustiere' },
        '#B105': { key: 'fuersorge_tiere', kategorie: '#K12', label: 'Fürsorge-Tiere' },
        '#B106': { key: 'sesshaftigkeit', kategorie: '#K12', label: 'Sesshaftigkeit' },
        '#B107': { key: 'verwurzelung', kategorie: '#K12', label: 'Verwurzelung' },
        '#B108': { key: 'mobilitaet', kategorie: '#K12', label: 'Mobilität' },
        '#B109': { key: 'heimat', kategorie: '#K12', label: 'Heimat' },
        '#B110': { key: 'neue_orte', kategorie: '#K12', label: 'Neue-Orte' },
        '#B111': { key: 'herkunftsfamilie', kategorie: '#K12', label: 'Herkunftsfamilie' },
        '#B112': { key: 'herkunftsfamilie', kategorie: '#K12', label: 'Herkunftsfamilie' },
        '#B113': { key: 'generationenverbund', kategorie: '#K12', label: 'Generationenverbund' },

        // ─────────────────────────────────────────────────────────────────────────
        // FINANZEN & KARRIERE (#B114-#B125) - Kategorie #K13
        // ─────────────────────────────────────────────────────────────────────────
        '#B114': { key: 'finanzielle_unabhaengigkeit', kategorie: '#K13', label: 'Finanzielle-Unabhängigkeit' },
        '#B115': { key: 'gemeinsame_finanzen', kategorie: '#K13', label: 'Gemeinsame-Finanzen' },
        '#B116': { key: 'finanzielle_transparenz', kategorie: '#K13', label: 'Finanzielle-Transparenz' },
        '#B117': { key: 'finanzen_und_geld', kategorie: '#K13', label: 'Finanzen-&-Geld' },
        '#B118': { key: 'sparsamkeit', kategorie: '#K13', label: 'Sparsamkeit' },
        '#B119': { key: 'grosszuegigkeit', kategorie: '#K13', label: 'Großzügigkeit' },
        '#B120': { key: 'berufliche_erfuellung', kategorie: '#K13', label: 'Berufliche-Erfüllung' },
        '#B121': { key: 'karriereambition', kategorie: '#K13', label: 'Karriereambition' },
        '#B122': { key: 'work_life_balance', kategorie: '#K13', label: 'Work-Life-Balance' },
        '#B123': { key: 'berufliche_anerkennung', kategorie: '#K13', label: 'Berufliche-Anerkennung' },
        '#B124': { key: 'zeit_fuer_beziehung', kategorie: '#K13', label: 'Zeit-für-Beziehung' },
        '#B125': { key: 'berufliche_flexibilitaet', kategorie: '#K13', label: 'Berufliche-Flexibilität' },

        // ─────────────────────────────────────────────────────────────────────────
        // KOMMUNIKATIONSSTIL (#B126-#B142) - Kategorie #K14
        // ─────────────────────────────────────────────────────────────────────────
        '#B126': { key: 'gespraechstiefe', kategorie: '#K14', label: 'Gesprächstiefe' },
        '#B127': { key: 'tiefgehende_gespraeche', kategorie: '#K14', label: 'Tiefgehende-Gespräche' },
        '#B128': { key: 'small_talk', kategorie: '#K14', label: 'Small-Talk' },
        '#B129': { key: 'stille_gemeinsam', kategorie: '#K14', label: 'Stille-gemeinsam' },
        '#B130': { key: 'verbale_verbindung', kategorie: '#K14', label: 'Verbale-Verbindung' },
        '#B131': { key: 'zuhoeren', kategorie: '#K14', label: 'Zuhören' },
        '#B132': { key: 'emotionaler_ausdruck', kategorie: '#K14', label: 'Emotionaler-Ausdruck' },
        '#B133': { key: 'gefuehle_zeigen', kategorie: '#K14', label: 'Gefühle-zeigen' },
        '#B134': { key: 'verletzlichkeit', kategorie: '#K14', label: 'Verletzlichkeit' },
        '#B135': { key: 'emotionale_zurueckhaltung', kategorie: '#K14', label: 'Emotionale-Zurückhaltung' },
        '#B136': { key: 'emotionale_sicherheit', kategorie: '#K14', label: 'Emotionale-Sicherheit' },
        '#B137': { key: 'gefuehle_teilen', kategorie: '#K14', label: 'Gefühle-teilen' },
        '#B138': { key: 'konfliktverhalten', kategorie: '#K14', label: 'Konfliktverhalten' },
        '#B139': { key: 'aussprache', kategorie: '#K14', label: 'Aussprache' },
        '#B140': { key: 'konflikt_vermeiden', kategorie: '#K14', label: 'Konflikt-vermeiden' },
        '#B141': { key: 'streitkultur', kategorie: '#K14', label: 'Streitkultur' },
        '#B142': { key: 'versoehnlichkeit', kategorie: '#K14', label: 'Versöhnlichkeit' },

        // ─────────────────────────────────────────────────────────────────────────
        // SOZIALES LEBEN (#B143-#B159) - Kategorie #K15
        // ─────────────────────────────────────────────────────────────────────────
        '#B143': { key: 'soziale_energie', kategorie: '#K15', label: 'Soziale-Energie' },
        '#B144': { key: 'geselligkeit', kategorie: '#K15', label: 'Geselligkeit' },
        '#B145': { key: 'ruhe_von_menschen', kategorie: '#K15', label: 'Ruhe-von-Menschen' },
        '#B146': { key: 'allein_aufladen', kategorie: '#K15', label: 'Allein-aufladen' },
        '#B147': { key: 'menschen_treffen', kategorie: '#K15', label: 'Menschen-treffen' },
        '#B148': { key: 'kleine_gruppen', kategorie: '#K15', label: 'Kleine-Gruppen' },
        '#B149': { key: 'zeit_fuer_sich', kategorie: '#K15', label: 'Zeit-für-sich' },
        '#B150': { key: 'eigene_hobbys', kategorie: '#K15', label: 'Eigene-Hobbys' },
        '#B151': { key: 'zeit_mit_anderen', kategorie: '#K15', label: 'Zeit-mit-Anderen' },
        '#B152': { key: 'partnerzeit', kategorie: '#K15', label: 'Partnerzeit' },
        '#B153': { key: 'eigene_interessen', kategorie: '#K15', label: 'Eigene-Interessen' },
        '#B154': { key: 'freundeskreis', kategorie: '#K15', label: 'Freundeskreis' },
        '#B155': { key: 'gemeinsame_freunde', kategorie: '#K15', label: 'Gemeinsame-Freunde' },
        '#B156': { key: 'freundeskreis_teilen', kategorie: '#K15', label: 'Freundeskreis-teilen' },
        '#B157': { key: 'soziales_netz', kategorie: '#K15', label: 'Soziales-Netz' },
        '#B158': { key: 'freunde_pflegen', kategorie: '#K15', label: 'Freunde-pflegen' },
        '#B159': { key: 'neue_freundschaften', kategorie: '#K15', label: 'Neue-Freundschaften' },

        // ─────────────────────────────────────────────────────────────────────────
        // INTIMITÄT & ROMANTIK (#B160-#B177) - Kategorie #K16
        // ─────────────────────────────────────────────────────────────────────────
        '#B160': { key: 'koerperliche_naehe', kategorie: '#K16', label: 'Körperliche-Nähe' },
        '#B161': { key: 'kuscheln', kategorie: '#K16', label: 'Kuscheln' },
        '#B162': { key: 'physische_distanz', kategorie: '#K16', label: 'Physische-Distanz' },
        '#B163': { key: 'koerperkontakt', kategorie: '#K16', label: 'Körperkontakt' },
        '#B164': { key: 'umarmungen', kategorie: '#K16', label: 'Umarmungen' },
        '#B165': { key: 'hand_halten', kategorie: '#K16', label: 'Hand-halten' },
        '#B166': { key: 'romantik', kategorie: '#K16', label: 'Romantik' },
        '#B167': { key: 'ueberraschungen', kategorie: '#K16', label: 'Überraschungen' },
        '#B168': { key: 'dates', kategorie: '#K16', label: 'Dates' },
        '#B169': { key: 'alltags_romantik', kategorie: '#K16', label: 'Alltags-Romantik' },
        '#B170': { key: 'aufmerksamkeiten', kategorie: '#K16', label: 'Aufmerksamkeiten' },
        '#B171': { key: 'liebesbekundungen', kategorie: '#K16', label: 'Liebesbekundungen' },
        '#B172': { key: 'sexualitaet', kategorie: '#K16', label: 'Sexualität' },
        '#B173': { key: 'sexuelle_intimitaet', kategorie: '#K16', label: 'Sexuelle-Intimität' },
        '#B174': { key: 'koerperliche_lust', kategorie: '#K16', label: 'Körperliche-Lust' },
        '#B175': { key: 'sexuelle_experimentierfreude', kategorie: '#K16', label: 'Sexuelle-Experimentierfreude' },
        '#B176': { key: 'sexuelle_verbindung', kategorie: '#K16', label: 'Sexuelle-Verbindung' },
        '#B177': { key: 'sexuelle_zufriedenheit', kategorie: '#K16', label: 'Sexuelle-Zufriedenheit' },

        // ─────────────────────────────────────────────────────────────────────────
        // WERTE & HALTUNGEN (#B178-#B195) - Kategorie #K17
        // ─────────────────────────────────────────────────────────────────────────
        '#B178': { key: 'spiritualitaet', kategorie: '#K17', label: 'Spiritualität' },
        '#B179': { key: 'glaubenspraxis', kategorie: '#K17', label: 'Glaubenspraxis' },
        '#B180': { key: 'religioese_gemeinschaft', kategorie: '#K17', label: 'Religiöse-Gemeinschaft' },
        '#B181': { key: 'saekularitaet', kategorie: '#K17', label: 'Säkularität' },
        '#B182': { key: 'sinnsuche', kategorie: '#K17', label: 'Sinnsuche' },
        '#B183': { key: 'transzendenz', kategorie: '#K17', label: 'Transzendenz' },
        '#B184': { key: 'tradition_und_moderne', kategorie: '#K17', label: 'Tradition-&-Moderne' },
        '#B185': { key: 'moderne_lebensweise', kategorie: '#K17', label: 'Moderne-Lebensweise' },
        '#B186': { key: 'konservative_werte', kategorie: '#K17', label: 'Konservative-Werte' },
        '#B187': { key: 'progressive_werte', kategorie: '#K17', label: 'Progressive-Werte' },
        '#B188': { key: 'kulturelle_tradition', kategorie: '#K17', label: 'Kulturelle-Tradition' },
        '#B189': { key: 'offenheit_fuer_neues', kategorie: '#K17', label: 'Offenheit-für-Neues' },
        '#B190': { key: 'umweltbewusstsein', kategorie: '#K17', label: 'Umweltbewusstsein' },
        '#B191': { key: 'nachhaltigkeit', kategorie: '#K17', label: 'Nachhaltigkeit' },
        '#B192': { key: 'oekologisches_bewusstsein', kategorie: '#K17', label: 'Ökologisches-Bewusstsein' },
        '#B193': { key: 'pragmatismus', kategorie: '#K17', label: 'Pragmatismus' },
        '#B194': { key: 'klimaschutz', kategorie: '#K17', label: 'Klimaschutz' },
        '#B195': { key: 'ressourcenschonung', kategorie: '#K17', label: 'Ressourcenschonung' },

        // ─────────────────────────────────────────────────────────────────────────
        // PRAKTISCHES LEBEN (#B196-#B208) - Kategorie #K18
        // ─────────────────────────────────────────────────────────────────────────
        '#B196': { key: 'ordnung_und_struktur', kategorie: '#K18', label: 'Ordnung-&-Struktur' },
        '#B197': { key: 'sauberkeit', kategorie: '#K18', label: 'Sauberkeit' },
        '#B198': { key: 'struktur', kategorie: '#K18', label: 'Struktur' },
        '#B199': { key: 'chaos_toleranz', kategorie: '#K18', label: 'Chaos-Toleranz' },
        '#B200': { key: 'organisiert_sein', kategorie: '#K18', label: 'Organisiert-sein' },
        '#B201': { key: 'flexibilitaet_haushalt', kategorie: '#K18', label: 'Flexibilität-Haushalt' },
        '#B202': { key: 'reisen_und_abenteuer', kategorie: '#K18', label: 'Reisen-&-Abenteuer' },
        '#B203': { key: 'abenteuer', kategorie: '#K18', label: 'Abenteuer' },
        '#B204': { key: 'neue_orte_entdecken', kategorie: '#K18', label: 'Neue-Orte-entdecken' },
        '#B205': { key: 'heimatverbundenheit', kategorie: '#K18', label: 'Heimatverbundenheit' },
        '#B206': { key: 'urlaub', kategorie: '#K18', label: 'Urlaub' },
        '#B207': { key: 'fernweh', kategorie: '#K18', label: 'Fernweh' },
        '#B208': { key: 'heimatverbundenheit', kategorie: '#K18', label: 'Heimatverbundenheit' },

        // ─────────────────────────────────────────────────────────────────────────
        // MUSSE (#B46-#B211) - Kategorie #K7
        // ─────────────────────────────────────────────────────────────────────────
        '#B209': { key: 'genussmittel', kategorie: '#K7', label: 'Genussmittel' },
        '#B210': { key: 'alkohol', kategorie: '#K7', label: 'Alkohol' },
        '#B211': { key: 'cannabis', kategorie: '#K7', label: 'Cannabis' },

        // ─────────────────────────────────────────────────────────────────────────
        // DYNAMIK (#B74-#B223) - Kategorie #K11
        // ─────────────────────────────────────────────────────────────────────────
        '#B212': { key: 'bondage_geben', kategorie: '#K11', label: 'Bondage-geben' },
        '#B213': { key: 'devotion', kategorie: '#K11', label: 'Devotion' },
        '#B214': { key: 'anbetung', kategorie: '#K11', label: 'Anbetung' },
        '#B215': { key: 'demuetig_sein', kategorie: '#K11', label: 'Demütig-sein' },
        '#B216': { key: 'dominieren', kategorie: '#K11', label: 'Dominieren' },
        '#B217': { key: 'bestrafung_erhalten', kategorie: '#K11', label: 'Bestrafung-erhalten' },
        '#B218': { key: 'bestrafen', kategorie: '#K11', label: 'Bestrafen' },
        '#B219': { key: 'service_orientierung', kategorie: '#K11', label: 'Service-Orientierung' },
        '#B220': { key: 'service_empfangen', kategorie: '#K11', label: 'Service-empfangen' },
        '#B221': { key: 'schmerzerleben', kategorie: '#K11', label: 'Schmerzerleben' },
        '#B222': { key: 'schmerz_geben', kategorie: '#K11', label: 'Schmerz-geben' },
        '#B223': { key: 'bondage_erleben', kategorie: '#K11', label: 'Bondage-erleben' }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // LOOKUP-TABELLEN (generiert)
    // ═══════════════════════════════════════════════════════════════════════════

    _keyToId: null,
    _idToKey: null,

    init: function() {
        if (this._keyToId) return this;

        this._keyToId = {};
        this._idToKey = {};

        for (var id in this.beduerfnisse) {
            var need = this.beduerfnisse[id];
            this._keyToId[need.key] = id;
            this._idToKey[id] = need.key;
        }

        return this;
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // API FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    getId: function(key) {
        this.init();
        return this._keyToId[key] || null;
    },

    getKey: function(id) {
        this.init();
        return this._idToKey[id] || null;
    },

    get: function(idOrKey) {
        this.init();
        if (idOrKey.startsWith('#')) {
            return this.beduerfnisse[idOrKey] || null;
        }
        var id = this._keyToId[idOrKey];
        return id ? this.beduerfnisse[id] : null;
    },

    getLabel: function(idOrKey) {
        this.init();
        var id = idOrKey.startsWith('#') ? idOrKey : this._keyToId[idOrKey];
        return this.beduerfnisse[id] ? this.beduerfnisse[id].label : idOrKey;
    },

    exists: function(idOrKey) {
        this.init();
        if (idOrKey.startsWith('#')) {
            return !!this.beduerfnisse[idOrKey];
        }
        return !!this._keyToId[idOrKey];
    },

    getAllIds: function() {
        return Object.keys(this.beduerfnisse);
    },

    getAllKeys: function() {
        this.init();
        return Object.keys(this._keyToId);
    },

    getByKategorie: function(kategorieId) {
        var result = [];
        for (var id in this.beduerfnisse) {
            if (this.beduerfnisse[id].kategorie === kategorieId) {
                result.push(id);
            }
        }
        return result;
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // SSOT VALIDIERUNG
    // ═══════════════════════════════════════════════════════════════════════════

    validateKategorien: function(options) {
        options = options || {};
        var throwOnError = options.throwOnError || false;
        var logWarnings = options.logWarnings !== false;

        var result = {
            valid: true,
            errors: [],
            warnings: [],
            checked: 0,
            kategorienFound: {}
        };

        var taxonomie = this._getTaxonomie();
        if (!taxonomie) {
            result.warnings.push('TiageTaxonomie nicht verfügbar - Validierung übersprungen');
            if (logWarnings) console.warn('[BeduerfnisIds] ' + result.warnings[0]);
            return result;
        }

        taxonomie.init();
        var validKategorien = taxonomie.kategorien;

        for (var id in this.beduerfnisse) {
            var need = this.beduerfnisse[id];
            result.checked++;

            if (!need.kategorie) {
                result.warnings.push(id + ' (' + need.label + '): Keine Kategorie definiert');
                continue;
            }

            if (!validKategorien[need.kategorie]) {
                var error = id + ' (' + need.label + '): Ungültige Kategorie "' + need.kategorie + '"';
                result.errors.push(error);
                result.valid = false;
                continue;
            }

            if (!result.kategorienFound[need.kategorie]) {
                result.kategorienFound[need.kategorie] = [];
            }
            result.kategorienFound[need.kategorie].push(id);
        }

        if (logWarnings && result.errors.length > 0) {
            console.error('[BeduerfnisIds] SSOT-Validierung fehlgeschlagen:');
            result.errors.forEach(function(e) { console.error('  ❌ ' + e); });
        }
        if (logWarnings && result.valid) {
            console.log('[BeduerfnisIds] ✅ SSOT-Validierung erfolgreich: ' + result.checked + ' Bedürfnisse');
        }

        if (throwOnError && !result.valid) {
            throw new Error('SSOT-Validierung fehlgeschlagen: ' + result.errors.join('; '));
        }

        return result;
    }
};

// Export für Node.js und Browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BeduerfnisIds;
}
if (typeof window !== 'undefined') {
    window.BeduerfnisIds = BeduerfnisIds;
}
