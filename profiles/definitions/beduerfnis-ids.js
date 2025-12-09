/**
 * TIAGE BEDÜRFNIS-ID-KATALOG v2.0
 *
 * Zentrales Mapping: String-Keys <-> #IDs für Bedürfnisse
 *
 * WICHTIG: Perspektiven, Dimensionen und Kategorien werden aus
 *          taxonomie.js referenziert (SSOT - Single Source of Truth)
 *
 * Struktur:
 * #P1-#P4   → 4 Perspektiven    (siehe taxonomie.js)
 * #D1-#D6   → 6 Dimensionen     (siehe taxonomie.js, Kurzform A-F)
 * #K1-#K18  → 18 Kategorien     (siehe taxonomie.js)
 * #B1-#B88  → 88 Kern-Bedürfnisse (GFK + Dynamik)
 * #B89      → Spezial (Geduld)
 * #B90-#B208 → 119 Lebensthemen-Bedürfnisse
 * #B209-#B220 → 12 Erweiterte Kink/BDSM-Bedürfnisse
 *
 * Kategorien-Zuordnung:
 * #K11 Dynamik (Basis):      #B74-#B88  (15) - Kontrolle, Hingabe, Führung...
 * #K11 Dynamik (Erweitert):  #B209-#B220 (12) - Schmerz, Bondage, Devotion...
 * #K12 Lebensplanung:        #B90-#B126  (37)
 * #K13 Finanzen/Karriere:    #B127-#B148 (22)
 * #K14 Kommunikationsstil:   #B149-#B176 (28)
 * #K15 Soziales Leben:       #B177-#B203 (27)
 * #K16 Intimität/Romantik:   #B204-#B208 (5)
 *
 * TOTAL: 220 Bedürfnisse
 */

const BeduerfnisIds = {

    version: '2.0.0',

    // ═══════════════════════════════════════════════════════════════════════════
    // TAXONOMIE-REFERENZ (SSOT)
    // ═══════════════════════════════════════════════════════════════════════════
    // Perspektiven, Dimensionen und Kategorien kommen aus taxonomie.js
    // Diese Getter sorgen für Kompatibilität mit bestehendem Code

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

    // Kompatibilitäts-Getter für direkten Zugriff
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
    // KERN-BEDÜRFNISSE (#B1-#B88) - GFK + Dynamik
    // ═══════════════════════════════════════════════════════════════════════════

    beduerfnisse: {
        // ─────────────────────────────────────────────────────────────────────────
        // EXISTENZ (#B1-#B9) - Kategorie #K1
        // ─────────────────────────────────────────────────────────────────────────
        '#B1': { key: 'luft', kategorie: '#K1', label: 'Luft' },
        '#B2': { key: 'wasser', kategorie: '#K1', label: 'Wasser' },
        '#B3': { key: 'nahrung', kategorie: '#K1', label: 'Nahrung' },
        '#B4': { key: 'bewegung', kategorie: '#K1', label: 'Bewegung' },
        '#B5': { key: 'beruehrung', kategorie: '#K1', label: 'Berührung' },
        '#B6': { key: 'erholung', kategorie: '#K1', label: 'Erholung' },
        '#B7': { key: 'sexueller_ausdruck', kategorie: '#K1', label: 'Sexueller Ausdruck' },
        '#B8': { key: 'sicherheit_physisch', kategorie: '#K1', label: 'Physische Sicherheit' },
        '#B9': { key: 'unterschlupf', kategorie: '#K1', label: 'Unterschlupf' },

        // ─────────────────────────────────────────────────────────────────────────
        // SICHERHEIT (#B10-#B15) - Kategorie #K2
        // ─────────────────────────────────────────────────────────────────────────
        '#B10': { key: 'bestaendigkeit', kategorie: '#K2', label: 'Beständigkeit' },
        '#B11': { key: 'sich_sicher_fuehlen', kategorie: '#K2', label: 'Sich sicher fühlen' },
        '#B12': { key: 'schutz', kategorie: '#K2', label: 'Schutz' },
        '#B13': { key: 'stabilitaet', kategorie: '#K2', label: 'Stabilität' },
        '#B14': { key: 'leichtigkeit', kategorie: '#K2', label: 'Leichtigkeit' },
        '#B15': { key: 'geborgenheit', kategorie: '#K2', label: 'Geborgenheit' },

        // ─────────────────────────────────────────────────────────────────────────
        // ZUNEIGUNG (#B16-#B24) - Kategorie #K3
        // ─────────────────────────────────────────────────────────────────────────
        '#B16': { key: 'waerme', kategorie: '#K3', label: 'Wärme' },
        '#B17': { key: 'wertschaetzung', kategorie: '#K3', label: 'Wertschätzung' },
        '#B18': { key: 'naehe', kategorie: '#K3', label: 'Nähe' },
        '#B19': { key: 'gesellschaft', kategorie: '#K3', label: 'Gesellschaft' },
        '#B20': { key: 'intimitaet', kategorie: '#K3', label: 'Intimität' },
        '#B21': { key: 'liebe', kategorie: '#K3', label: 'Liebe' },
        '#B22': { key: 'fuersorge', kategorie: '#K3', label: 'Fürsorge' },
        '#B23': { key: 'unterstuetzung', kategorie: '#K3', label: 'Unterstützung' },
        '#B24': { key: 'fuereinander_da_sein', kategorie: '#K3', label: 'Füreinander da sein' },

        // ─────────────────────────────────────────────────────────────────────────
        // VERSTÄNDNIS (#B25-#B33) - Kategorie #K4
        // ─────────────────────────────────────────────────────────────────────────
        '#B25': { key: 'akzeptanz', kategorie: '#K4', label: 'Akzeptanz' },
        '#B26': { key: 'mitgefuehl', kategorie: '#K4', label: 'Mitgefühl' },
        '#B27': { key: 'beruecksichtigung', kategorie: '#K4', label: 'Berücksichtigung' },
        '#B28': { key: 'empathie', kategorie: '#K4', label: 'Empathie' },
        '#B29': { key: 'vertrauen', kategorie: '#K4', label: 'Vertrauen' },
        '#B30': { key: 'beachtung', kategorie: '#K4', label: 'Beachtung' },
        '#B31': { key: 'gesehen_werden', kategorie: '#K4', label: 'Gesehen werden' },
        '#B32': { key: 'verstanden_werden', kategorie: '#K4', label: 'Verstanden werden' },
        '#B33': { key: 'harmonie', kategorie: '#K4', label: 'Harmonie' },

        // ─────────────────────────────────────────────────────────────────────────
        // FREIHEIT (#B34-#B38) - Kategorie #K6
        // ─────────────────────────────────────────────────────────────────────────
        '#B34': { key: 'selbstbestimmung', kategorie: '#K6', label: 'Selbstbestimmung' },
        '#B35': { key: 'waehlen_koennen', kategorie: '#K6', label: 'Wählen können' },
        '#B36': { key: 'unabhaengigkeit', kategorie: '#K6', label: 'Unabhängigkeit' },
        '#B37': { key: 'raum_haben', kategorie: '#K6', label: 'Raum haben' },
        '#B38': { key: 'spontaneitaet', kategorie: '#K6', label: 'Spontaneität' },

        // ─────────────────────────────────────────────────────────────────────────
        // TEILNAHME (#B39-#B45) - Kategorie #K5
        // ─────────────────────────────────────────────────────────────────────────
        '#B39': { key: 'zusammenarbeit', kategorie: '#K5', label: 'Zusammenarbeit' },
        '#B40': { key: 'kommunikation', kategorie: '#K5', label: 'Kommunikation' },
        '#B41': { key: 'gemeinschaft', kategorie: '#K5', label: 'Gemeinschaft' },
        '#B42': { key: 'zugehoerigkeit', kategorie: '#K5', label: 'Zugehörigkeit' },
        '#B43': { key: 'gegenseitigkeit', kategorie: '#K5', label: 'Gegenseitigkeit' },
        '#B44': { key: 'respekt', kategorie: '#K5', label: 'Respekt' },
        '#B45': { key: 'bedeutung_haben', kategorie: '#K5', label: 'Bedeutung haben' },

        // ─────────────────────────────────────────────────────────────────────────
        // MUSSE (#B46-#B49) - Kategorie #K8
        // ─────────────────────────────────────────────────────────────────────────
        '#B46': { key: 'schoenheit', kategorie: '#K8', label: 'Schönheit' },
        '#B47': { key: 'freizeit', kategorie: '#K8', label: 'Freizeit' },
        '#B48': { key: 'freude', kategorie: '#K8', label: 'Freude' },
        '#B49': { key: 'humor', kategorie: '#K8', label: 'Humor' },

        // ─────────────────────────────────────────────────────────────────────────
        // IDENTITÄT (#B50-#B63) - Kategorie #K7
        // ─────────────────────────────────────────────────────────────────────────
        '#B50': { key: 'authentizitaet', kategorie: '#K7', label: 'Authentizität' },
        '#B51': { key: 'echtheit', kategorie: '#K7', label: 'Echtheit' },
        '#B52': { key: 'integritaet', kategorie: '#K7', label: 'Integrität' },
        '#B53': { key: 'praesenz', kategorie: '#K7', label: 'Präsenz' },
        '#B54': { key: 'ordnung', kategorie: '#K7', label: 'Ordnung' },
        '#B55': { key: 'bewusstheit', kategorie: '#K7', label: 'Bewusstheit' },
        '#B56': { key: 'herausforderung', kategorie: '#K7', label: 'Herausforderung' },
        '#B57': { key: 'klarheit', kategorie: '#K7', label: 'Klarheit' },
        '#B58': { key: 'kompetenz', kategorie: '#K7', label: 'Kompetenz' },
        '#B59': { key: 'effizienz', kategorie: '#K7', label: 'Effizienz' },
        '#B60': { key: 'wirksamkeit', kategorie: '#K7', label: 'Wirksamkeit' },
        '#B61': { key: 'wachstum', kategorie: '#K7', label: 'Wachstum' },
        '#B62': { key: 'sinn', kategorie: '#K7', label: 'Sinn' },
        '#B63': { key: 'beitrag_leisten', kategorie: '#K7', label: 'Einen Beitrag leisten' },

        // ─────────────────────────────────────────────────────────────────────────
        // ERSCHAFFEN (#B64-#B68) - Kategorie #K9
        // ─────────────────────────────────────────────────────────────────────────
        '#B64': { key: 'kreativitaet', kategorie: '#K9', label: 'Kreativität' },
        '#B65': { key: 'entdecken', kategorie: '#K9', label: 'Entdecken' },
        '#B66': { key: 'lernen', kategorie: '#K9', label: 'Lernen' },
        '#B67': { key: 'selbst_ausdruck', kategorie: '#K9', label: 'Selbst-Ausdruck' },
        '#B68': { key: 'anreize_bekommen', kategorie: '#K9', label: 'Anreize bekommen' },

        // ─────────────────────────────────────────────────────────────────────────
        // VERBUNDENHEIT (#B69-#B73) - Kategorie #K10
        // ─────────────────────────────────────────────────────────────────────────
        '#B69': { key: 'leben_feiern', kategorie: '#K10', label: 'Das Leben feiern' },
        '#B70': { key: 'inspiration', kategorie: '#K10', label: 'Inspiration' },
        '#B71': { key: 'trauer_ausdruecken', kategorie: '#K10', label: 'Trauer ausdrücken' },
        '#B72': { key: 'einsehen', kategorie: '#K10', label: 'Einsehen' },
        '#B73': { key: 'anfang_ende', kategorie: '#K10', label: 'Anfang & Ende' },

        // ─────────────────────────────────────────────────────────────────────────
        // DYNAMIK (#B74-#B88) - Kategorie #K11
        // ─────────────────────────────────────────────────────────────────────────
        '#B74': { key: 'kontrolle_ausueben', kategorie: '#K11', label: 'Kontrolle ausüben' },
        '#B75': { key: 'hingabe', kategorie: '#K11', label: 'Hingabe' },
        '#B76': { key: 'fuehrung_geben', kategorie: '#K11', label: 'Führung geben' },
        '#B77': { key: 'gefuehrt_werden', kategorie: '#K11', label: 'Geführt werden' },
        '#B78': { key: 'ritual', kategorie: '#K11', label: 'Rituale & Struktur' },
        '#B79': { key: 'nachsorge', kategorie: '#K11', label: 'Nachsorge/Aftercare' },
        '#B80': { key: 'grenzen_setzen', kategorie: '#K11', label: 'Grenzen setzen' },
        '#B81': { key: 'grenzen_respektieren', kategorie: '#K11', label: 'Grenzen respektieren' },
        '#B82': { key: 'intensitaet', kategorie: '#K11', label: 'Intensität erleben' },
        '#B83': { key: 'vertrauen_schenken', kategorie: '#K11', label: 'Vertrauen schenken' },
        '#B84': { key: 'verantwortung_uebernehmen', kategorie: '#K11', label: 'Verantwortung übernehmen' },
        '#B85': { key: 'sich_fallenlassen', kategorie: '#K11', label: 'Sich fallenlassen' },
        '#B86': { key: 'machtaustausch', kategorie: '#K11', label: 'Machtaustausch' },
        '#B87': { key: 'dienend_sein', kategorie: '#K11', label: 'Dienend sein' },
        '#B88': { key: 'beschuetzen', kategorie: '#K11', label: 'Beschützen' },

        // ─────────────────────────────────────────────────────────────────────────
        // SPEZIAL: Geduld (verwendet in geschlechtsidentitaet.suchend)
        // ─────────────────────────────────────────────────────────────────────────
        '#B89': { key: 'geduld', kategorie: '#K4', label: 'Geduld' },

        // ═══════════════════════════════════════════════════════════════════════════
        // LEBENSTHEMEN-BEDÜRFNISSE (#B90-#B208)
        // ═══════════════════════════════════════════════════════════════════════════

        // ─────────────────────────────────────────────────────────────────────────
        // LEBENSPLANUNG (#B90-#B126) - Kategorie #K12
        // ─────────────────────────────────────────────────────────────────────────
        '#B90': { key: 'kinderwunsch', kategorie: '#K12', label: 'Kinderwunsch' },
        '#B91': { key: 'elternschaft', kategorie: '#K12', label: 'Elternschaft' },
        '#B92': { key: 'fortpflanzung', kategorie: '#K12', label: 'Fortpflanzung' },
        '#B93': { key: 'familie_gruenden', kategorie: '#K12', label: 'Familie gründen' },
        '#B94': { key: 'generativitaet', kategorie: '#K12', label: 'Generativität' },
        '#B95': { key: 'verbindlichkeit', kategorie: '#K12', label: 'Verbindlichkeit' },
        '#B96': { key: 'langfristige_bindung', kategorie: '#K12', label: 'Langfristige Bindung' },
        '#B97': { key: 'rechtliche_sicherheit', kategorie: '#K12', label: 'Rechtliche Sicherheit' },
        '#B98': { key: 'treueversprechen', kategorie: '#K12', label: 'Treueversprechen' },
        '#B99': { key: 'gemeinsamer_wohnraum', kategorie: '#K12', label: 'Gemeinsamer Wohnraum' },
        '#B100': { key: 'haeuslichkeit', kategorie: '#K12', label: 'Häuslichkeit' },
        '#B101': { key: 'nest_bauen', kategorie: '#K12', label: 'Nest bauen' },
        '#B102': { key: 'alltag_teilen', kategorie: '#K12', label: 'Alltag teilen' },
        '#B103': { key: 'eigener_raum', kategorie: '#K12', label: 'Eigener Raum' },
        '#B104': { key: 'rueckzugsort', kategorie: '#K12', label: 'Rückzugsort' },
        '#B105': { key: 'tierliebe', kategorie: '#K12', label: 'Tierliebe' },
        '#B106': { key: 'fuersorge_tiere', kategorie: '#K12', label: 'Fürsorge für Tiere' },
        '#B107': { key: 'begleiter', kategorie: '#K12', label: 'Begleiter' },
        '#B108': { key: 'verantwortung_tier', kategorie: '#K12', label: 'Verantwortung für Tier' },
        '#B109': { key: 'sesshaftigkeit', kategorie: '#K12', label: 'Sesshaftigkeit' },
        '#B110': { key: 'verwurzelung', kategorie: '#K12', label: 'Verwurzelung' },
        '#B111': { key: 'mobilitaet', kategorie: '#K12', label: 'Mobilität' },
        '#B112': { key: 'heimat', kategorie: '#K12', label: 'Heimat' },
        '#B113': { key: 'neue_orte', kategorie: '#K12', label: 'Neue Orte' },
        '#B114': { key: 'familienbindung', kategorie: '#K12', label: 'Familienbindung' },
        '#B115': { key: 'herkunftsfamilie', kategorie: '#K12', label: 'Herkunftsfamilie' },
        '#B116': { key: 'familientreffen', kategorie: '#K12', label: 'Familientreffen' },
        '#B117': { key: 'generationenverbund', kategorie: '#K12', label: 'Generationenverbund' },
        // Pirsig & Osho - Lebensplanung
        '#B118': { key: 'biologisches_muster', kategorie: '#K12', label: 'Biologisches Muster' },
        '#B119': { key: 'soziales_muster', kategorie: '#K12', label: 'Soziales Muster' },
        '#B120': { key: 'statische_stabilitaet', kategorie: '#K12', label: 'Statische Stabilität' },
        '#B121': { key: 'qualitaet_der_fuersorge', kategorie: '#K12', label: 'Qualität der Fürsorge' },
        '#B122': { key: 'familien_rebellion', kategorie: '#K12', label: 'Familien-Rebellion' },
        '#B123': { key: 'zorba_das_kind', kategorie: '#K12', label: 'Zorba das Kind' },
        '#B124': { key: 'nicht_anhaften_an_familie', kategorie: '#K12', label: 'Nicht-Anhaften an Familie' },
        '#B125': { key: 'bewusste_elternschaft', kategorie: '#K12', label: 'Bewusste Elternschaft' },
        '#B126': { key: 'commune_statt_kernfamilie', kategorie: '#K12', label: 'Kommune statt Kernfamilie' },

        // ─────────────────────────────────────────────────────────────────────────
        // FINANZEN & KARRIERE (#B127-#B148) - Kategorie #K13
        // ─────────────────────────────────────────────────────────────────────────
        '#B127': { key: 'finanzielle_unabhaengigkeit', kategorie: '#K13', label: 'Finanzielle Unabhängigkeit' },
        '#B128': { key: 'gemeinsame_finanzen', kategorie: '#K13', label: 'Gemeinsame Finanzen' },
        '#B129': { key: 'finanzielle_transparenz', kategorie: '#K13', label: 'Finanzielle Transparenz' },
        '#B130': { key: 'finanzielle_sicherheit', kategorie: '#K13', label: 'Finanzielle Sicherheit' },
        '#B131': { key: 'sparsamkeit', kategorie: '#K13', label: 'Sparsamkeit' },
        '#B132': { key: 'grosszuegigkeit', kategorie: '#K13', label: 'Großzügigkeit' },
        '#B133': { key: 'berufliche_erfuellung', kategorie: '#K13', label: 'Berufliche Erfüllung' },
        '#B134': { key: 'karriereambition', kategorie: '#K13', label: 'Karriereambition' },
        '#B135': { key: 'work_life_balance', kategorie: '#K13', label: 'Work-Life-Balance' },
        '#B136': { key: 'berufliche_anerkennung', kategorie: '#K13', label: 'Berufliche Anerkennung' },
        '#B137': { key: 'zeit_fuer_beziehung', kategorie: '#K13', label: 'Zeit für Beziehung' },
        '#B138': { key: 'berufliche_flexibilitaet', kategorie: '#K13', label: 'Berufliche Flexibilität' },
        // Pirsig & Osho - Finanzen
        '#B139': { key: 'gumption', kategorie: '#K13', label: 'Gumption (innere Motivation)' },
        '#B140': { key: 'qualitaet_der_arbeit', kategorie: '#K13', label: 'Qualität der Arbeit' },
        '#B141': { key: 'intellektuelles_muster', kategorie: '#K13', label: 'Intellektuelles Muster' },
        '#B142': { key: 'dynamische_evolution', kategorie: '#K13', label: 'Dynamische Evolution' },
        '#B143': { key: 'klassisches_verstehen', kategorie: '#K13', label: 'Klassisches Verstehen' },
        '#B144': { key: 'arbeit_als_meditation', kategorie: '#K13', label: 'Arbeit als Meditation' },
        '#B145': { key: 'nicht_karriere', kategorie: '#K13', label: 'Nicht-Karriere' },
        '#B146': { key: 'zorba_der_unternehmer', kategorie: '#K13', label: 'Zorba der Unternehmer' },
        '#B147': { key: 'nicht_anhaften_an_geld', kategorie: '#K13', label: 'Nicht-Anhaften an Geld' },
        '#B148': { key: 'kreative_selbstverwirklichung', kategorie: '#K13', label: 'Kreative Selbstverwirklichung' },

        // ─────────────────────────────────────────────────────────────────────────
        // KOMMUNIKATIONSSTIL (#B149-#B176) - Kategorie #K15
        // ─────────────────────────────────────────────────────────────────────────
        '#B149': { key: 'taeglicher_austausch', kategorie: '#K15', label: 'Täglicher Austausch' },
        '#B150': { key: 'tiefgehende_gespraeche', kategorie: '#K15', label: 'Tiefgehende Gespräche' },
        '#B151': { key: 'small_talk', kategorie: '#K15', label: 'Small Talk' },
        '#B152': { key: 'stille_gemeinsam', kategorie: '#K15', label: 'Stille gemeinsam' },
        '#B153': { key: 'verbale_verbindung', kategorie: '#K15', label: 'Verbale Verbindung' },
        '#B154': { key: 'zuhoeren', kategorie: '#K15', label: 'Zuhören' },
        '#B155': { key: 'emotionale_offenheit', kategorie: '#K15', label: 'Emotionale Offenheit' },
        '#B156': { key: 'gefuehle_zeigen', kategorie: '#K15', label: 'Gefühle zeigen' },
        '#B157': { key: 'verletzlichkeit', kategorie: '#K15', label: 'Verletzlichkeit' },
        '#B158': { key: 'emotionale_zurueckhaltung', kategorie: '#K15', label: 'Emotionale Zurückhaltung' },
        '#B159': { key: 'emotionale_sicherheit', kategorie: '#K15', label: 'Emotionale Sicherheit' },
        '#B160': { key: 'gefuehle_teilen', kategorie: '#K15', label: 'Gefühle teilen' },
        '#B161': { key: 'konfliktklaerung', kategorie: '#K15', label: 'Konfliktklärung' },
        '#B162': { key: 'aussprache', kategorie: '#K15', label: 'Aussprache' },
        '#B163': { key: 'konflikt_vermeiden', kategorie: '#K15', label: 'Konflikt vermeiden' },
        '#B164': { key: 'streitkultur', kategorie: '#K15', label: 'Streitkultur' },
        '#B165': { key: 'versoehnlichkeit', kategorie: '#K15', label: 'Versöhnlichkeit' },
        // Pirsig & Osho - Kommunikation
        '#B166': { key: 'romantisches_verstehen', kategorie: '#K15', label: 'Romantisches Verstehen' },
        '#B167': { key: 'klassische_klarheit', kategorie: '#K15', label: 'Klassische Klarheit' },
        '#B168': { key: 'dialektik', kategorie: '#K15', label: 'Dialektik' },
        '#B169': { key: 'qualitaets_ausdruck', kategorie: '#K15', label: 'Qualitäts-Ausdruck' },
        '#B170': { key: 'care_im_gespraech', kategorie: '#K15', label: 'Care im Gespräch' },
        '#B171': { key: 'schweigen_statt_worte', kategorie: '#K15', label: 'Schweigen statt Worte' },
        '#B172': { key: 'radikale_ehrlichkeit', kategorie: '#K15', label: 'Radikale Ehrlichkeit' },
        '#B173': { key: 'humorvolle_leichtigkeit', kategorie: '#K15', label: 'Humorvolle Leichtigkeit' },
        '#B174': { key: 'paradoxe_weisheit', kategorie: '#K15', label: 'Paradoxe Weisheit' },
        '#B175': { key: 'herz_statt_kopf', kategorie: '#K15', label: 'Herz statt Kopf' },
        '#B176': { key: 'authentischer_ausdruck', kategorie: '#K15', label: 'Authentischer Ausdruck' },

        // ─────────────────────────────────────────────────────────────────────────
        // SOZIALES LEBEN (#B177-#B203) - Kategorie #K16
        // ─────────────────────────────────────────────────────────────────────────
        '#B177': { key: 'soziale_energie', kategorie: '#K16', label: 'Soziale Energie' },
        '#B178': { key: 'geselligkeit', kategorie: '#K16', label: 'Geselligkeit' },
        '#B179': { key: 'ruhe_von_menschen', kategorie: '#K16', label: 'Ruhe von Menschen' },
        '#B180': { key: 'allein_aufladen', kategorie: '#K16', label: 'Allein aufladen' },
        '#B181': { key: 'menschen_treffen', kategorie: '#K16', label: 'Menschen treffen' },
        '#B182': { key: 'kleine_gruppen', kategorie: '#K16', label: 'Kleine Gruppen' },
        '#B183': { key: 'zeit_fuer_sich', kategorie: '#K16', label: 'Zeit für sich' },
        '#B184': { key: 'eigene_hobbys', kategorie: '#K16', label: 'Eigene Hobbys' },
        '#B185': { key: 'gemeinsame_zeit', kategorie: '#K16', label: 'Gemeinsame Zeit' },
        '#B186': { key: 'partnerzeit', kategorie: '#K16', label: 'Partnerzeit' },
        '#B187': { key: 'eigene_interessen', kategorie: '#K16', label: 'Eigene Interessen' },
        '#B188': { key: 'eigene_freunde', kategorie: '#K16', label: 'Eigene Freunde' },
        '#B189': { key: 'gemeinsame_freunde', kategorie: '#K16', label: 'Gemeinsame Freunde' },
        '#B190': { key: 'freundeskreis_teilen', kategorie: '#K16', label: 'Freundeskreis teilen' },
        '#B191': { key: 'soziales_netz', kategorie: '#K16', label: 'Soziales Netz' },
        '#B192': { key: 'freunde_pflegen', kategorie: '#K16', label: 'Freunde pflegen' },
        '#B193': { key: 'neue_freundschaften', kategorie: '#K16', label: 'Neue Freundschaften' },
        // Pirsig & Osho - Soziales
        '#B194': { key: 'soziale_qualitaet', kategorie: '#K16', label: 'Soziale Qualität' },
        '#B195': { key: 'tribe_muster', kategorie: '#K16', label: 'Tribe-Muster' },
        '#B196': { key: 'intellektuelle_gemeinschaft', kategorie: '#K16', label: 'Intellektuelle Gemeinschaft' },
        '#B197': { key: 'statische_sozialstrukturen', kategorie: '#K16', label: 'Statische Sozialstrukturen' },
        '#B198': { key: 'sannyas_gemeinschaft', kategorie: '#K16', label: 'Sannyas-Gemeinschaft' },
        '#B199': { key: 'rebellion_gegen_gesellschaft', kategorie: '#K16', label: 'Rebellion gegen Gesellschaft' },
        '#B200': { key: 'einsamkeit_in_menge', kategorie: '#K16', label: 'Einsamkeit in der Menge' },
        '#B201': { key: 'celebration_mit_anderen', kategorie: '#K16', label: 'Celebration mit anderen' },
        '#B202': { key: 'keine_freundschaft_besitz', kategorie: '#K16', label: 'Keine Freundschaft als Besitz' },
        '#B203': { key: 'tantra_gruppe', kategorie: '#K16', label: 'Tantra-Gruppe' },

        // ─────────────────────────────────────────────────────────────────────────
        // INTIMITÄT & ROMANTIK (#B204-#B234) - Kategorie #K17
        // ─────────────────────────────────────────────────────────────────────────
        '#B204': { key: 'koerpernaehe', kategorie: '#K17', label: 'Körpernähe' },
        '#B205': { key: 'kuscheln', kategorie: '#K17', label: 'Kuscheln' },
        '#B206': { key: 'physische_distanz', kategorie: '#K17', label: 'Physische Distanz' },
        '#B207': { key: 'koerperkontakt', kategorie: '#K17', label: 'Körperkontakt' },
        '#B208': { key: 'umarmungen', kategorie: '#K17', label: 'Umarmungen' },

        // ─────────────────────────────────────────────────────────────────────────
        // ERWEITERTE KINK/DYNAMIK (#B209-#B220) - Kategorie #K11
        // ─────────────────────────────────────────────────────────────────────────
        // Spezifische BDSM/Kink-Bedürfnisse (Erweiterung zu #B74-#B88)
        '#B209': { key: 'schmerzerleben', kategorie: '#K11', label: 'Schmerz erleben (Masochismus)' },
        '#B210': { key: 'schmerz_geben', kategorie: '#K11', label: 'Schmerz geben (Sadismus)' },
        '#B211': { key: 'bondage_erleben', kategorie: '#K11', label: 'Bondage erleben (gefesselt werden)' },
        '#B212': { key: 'bondage_geben', kategorie: '#K11', label: 'Bondage geben (fesseln)' },
        '#B213': { key: 'devotion', kategorie: '#K11', label: 'Devotion (Hingabe/Verehrung geben)' },
        '#B214': { key: 'anbetung', kategorie: '#K11', label: 'Anbetung (Verehrung empfangen)' },
        '#B215': { key: 'demuetig_sein', kategorie: '#K11', label: 'Demütig sein (Demut zeigen)' },
        '#B216': { key: 'dominieren', kategorie: '#K11', label: 'Dominieren (Dominanz ausüben)' },
        '#B217': { key: 'bestrafung_erhalten', kategorie: '#K11', label: 'Bestrafung erhalten' },
        '#B218': { key: 'bestrafen', kategorie: '#K11', label: 'Bestrafen (Disziplin geben)' },
        '#B219': { key: 'service_orientierung', kategorie: '#K11', label: 'Service-Orientierung (dienen wollen)' },
        '#B220': { key: 'service_empfangen', kategorie: '#K11', label: 'Service empfangen (bedient werden)' }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // LOOKUP-TABELLEN (generiert)
    // ═══════════════════════════════════════════════════════════════════════════

    _keyToId: null,
    _idToKey: null,

    /**
     * Initialisiert die Lookup-Tabellen
     */
    init: function() {
        if (this._keyToId) return this;

        this._keyToId = {};
        this._idToKey = {};

        for (var id in this.beduerfnisse) {
            var bed = this.beduerfnisse[id];
            this._keyToId[bed.key] = id;
            this._idToKey[id] = bed.key;
        }

        return this;
    },

    /**
     * Konvertiert String-Key zu #ID
     * @param {string} key - z.B. 'selbstbestimmung'
     * @returns {string} - z.B. '#B34'
     */
    toId: function(key) {
        this.init();
        return this._keyToId[key] || key;
    },

    /**
     * Konvertiert #ID zu String-Key
     * @param {string} id - z.B. '#B34'
     * @returns {string} - z.B. 'selbstbestimmung'
     */
    toKey: function(id) {
        this.init();
        return this._idToKey[id] || id;
    },

    /**
     * Konvertiert ein Objekt mit String-Keys zu #IDs
     * @param {object} obj - { selbstbestimmung: +20, ... }
     * @returns {object} - { '#B34': +20, ... }
     */
    convertObjToIds: function(obj) {
        this.init();
        var result = {};
        for (var key in obj) {
            var id = this._keyToId[key] || key;
            result[id] = obj[key];
        }
        return result;
    },

    /**
     * Konvertiert ein Objekt mit #IDs zu String-Keys
     * @param {object} obj - { '#B34': +20, ... }
     * @returns {object} - { selbstbestimmung: +20, ... }
     */
    convertObjToKeys: function(obj) {
        this.init();
        var result = {};
        for (var id in obj) {
            var key = this._idToKey[id] || id;
            result[key] = obj[id];
        }
        return result;
    },

    /**
     * Gibt das Label für eine ID oder einen Key zurück
     * @param {string} idOrKey - z.B. '#B34' oder 'selbstbestimmung'
     * @returns {string} - z.B. 'Selbstbestimmung'
     */
    getLabel: function(idOrKey) {
        this.init();
        var id = idOrKey.startsWith('#') ? idOrKey : this._keyToId[idOrKey];
        return this.beduerfnisse[id] ? this.beduerfnisse[id].label : idOrKey;
    },

    /**
     * Prüft ob ein Key/ID existiert
     * @param {string} idOrKey
     * @returns {boolean}
     */
    exists: function(idOrKey) {
        this.init();
        if (idOrKey.startsWith('#')) {
            return !!this.beduerfnisse[idOrKey];
        }
        return !!this._keyToId[idOrKey];
    },

    // Aliase für Kompatibilität
    objectToIds: function(obj) { return this.convertObjToIds(obj); },
    objectToKeys: function(obj) { return this.convertObjToKeys(obj); }
};

// Export für Node.js und Browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BeduerfnisIds;
}
