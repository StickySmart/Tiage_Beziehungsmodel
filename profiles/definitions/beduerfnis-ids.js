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
 * #B1-#B220  → 220 Bedürfnisse
 *
 * TOTAL: 220 Bedürfnisse
 */

const BeduerfnisIds = {

    version: '3.0.0',
    generatedFrom: 'beduerfnis-katalog.json',
    generatedAt: '2025-12-20T10:39:53.506Z',

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
        '#B1': { key: 'luft', kategorie: '#K1', label: 'Luft' },
        '#B2': { key: 'wasser', kategorie: '#K1', label: 'Wasser' },
        '#B3': { key: 'nahrung', kategorie: '#K1', label: 'Nahrung' },
        '#B4': { key: 'bewegung', kategorie: '#K1', label: 'Bewegung' },
        '#B5': { key: 'beruehrung', kategorie: '#K1', label: 'Berührung' },
        '#B6': { key: 'erholung', kategorie: '#K1', label: 'Erholung' },
        '#B7': { key: 'sexueller_ausdruck', kategorie: '#K1', label: 'Sexueller-Ausdruck' },
        '#B8': { key: 'physische_sicherheit', kategorie: '#K1', label: 'Physische-Sicherheit' },
        '#B9': { key: 'unterschlupf', kategorie: '#K1', label: 'Unterschlupf' },

        // ─────────────────────────────────────────────────────────────────────────
        // SICHERHEIT (#B10-#B15) - Kategorie #K2
        // ─────────────────────────────────────────────────────────────────────────
        '#B10': { key: 'bestaendigkeit', kategorie: '#K2', label: 'Beständigkeit' },
        '#B11': { key: 'sich_sicher_fuehlen', kategorie: '#K2', label: 'Sich-sicher-fühlen' },
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
        '#B24': { key: 'fuereinander_da_sein', kategorie: '#K3', label: 'Füreinander-da-sein' },

        // ─────────────────────────────────────────────────────────────────────────
        // VERSTÄNDNIS (#B25-#B33) - Kategorie #K4
        // ─────────────────────────────────────────────────────────────────────────
        '#B25': { key: 'akzeptanz', kategorie: '#K4', label: 'Akzeptanz' },
        '#B26': { key: 'mitgefuehl', kategorie: '#K4', label: 'Mitgefühl' },
        '#B27': { key: 'beruecksichtigung', kategorie: '#K4', label: 'Berücksichtigung' },
        '#B28': { key: 'empathie', kategorie: '#K4', label: 'Empathie' },
        '#B29': { key: 'vertrauen', kategorie: '#K4', label: 'Vertrauen' },
        '#B30': { key: 'beachtung', kategorie: '#K4', label: 'Beachtung' },
        '#B31': { key: 'gesehen_werden', kategorie: '#K4', label: 'Gesehen-werden' },
        '#B32': { key: 'verstanden_werden', kategorie: '#K4', label: 'Verstanden-werden' },
        '#B33': { key: 'harmonie', kategorie: '#K4', label: 'Harmonie' },

        // ─────────────────────────────────────────────────────────────────────────
        // FREIHEIT (#B34-#B38) - Kategorie #K5
        // ─────────────────────────────────────────────────────────────────────────
        '#B34': { key: 'selbstbestimmung', kategorie: '#K5', label: 'Selbstbestimmung' },
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
        '#B48': { key: 'freude', kategorie: '#K7', label: 'Freude' },
        '#B49': { key: 'humor', kategorie: '#K7', label: 'Humor' },

        // ─────────────────────────────────────────────────────────────────────────
        // IDENTITÄT (#B50-#B63) - Kategorie #K8
        // ─────────────────────────────────────────────────────────────────────────
        '#B50': { key: 'authentizitaet', kategorie: '#K8', label: 'Authentizität' },
        '#B51': { key: 'echtheit', kategorie: '#K8', label: 'Echtheit' },
        '#B52': { key: 'integritaet', kategorie: '#K8', label: 'Integrität' },
        '#B53': { key: 'praesenz', kategorie: '#K8', label: 'Präsenz' },
        '#B54': { key: 'ordnung', kategorie: '#K8', label: 'Ordnung' },
        '#B55': { key: 'bewusstheit', kategorie: '#K8', label: 'Bewusstheit' },
        '#B56': { key: 'herausforderung', kategorie: '#K8', label: 'Herausforderung' },
        '#B57': { key: 'klarheit', kategorie: '#K8', label: 'Klarheit' },
        '#B58': { key: 'kompetenz', kategorie: '#K8', label: 'Kompetenz' },
        '#B59': { key: 'effizienz', kategorie: '#K8', label: 'Effizienz' },
        '#B60': { key: 'wirksamkeit', kategorie: '#K8', label: 'Wirksamkeit' },
        '#B61': { key: 'wachstum', kategorie: '#K8', label: 'Wachstum' },
        '#B62': { key: 'sinn', kategorie: '#K8', label: 'Sinn' },
        '#B63': { key: 'beitrag_leisten', kategorie: '#K8', label: 'Beitrag-leisten' },

        // ─────────────────────────────────────────────────────────────────────────
        // ERSCHAFFEN (#B64-#B68) - Kategorie #K9
        // ─────────────────────────────────────────────────────────────────────────
        '#B64': { key: 'kreativitaet', kategorie: '#K9', label: 'Kreativität' },
        '#B65': { key: 'entdecken', kategorie: '#K9', label: 'Entdecken' },
        '#B66': { key: 'lernen', kategorie: '#K9', label: 'Lernen' },
        '#B67': { key: 'selbst_ausdruck', kategorie: '#K9', label: 'Selbst-Ausdruck' },
        '#B68': { key: 'anreize_bekommen', kategorie: '#K9', label: 'Anreize-bekommen' },

        // ─────────────────────────────────────────────────────────────────────────
        // VERBUNDENHEIT (#B69-#B73) - Kategorie #K10
        // ─────────────────────────────────────────────────────────────────────────
        '#B69': { key: 'leben_feiern', kategorie: '#K10', label: 'Leben-feiern' },
        '#B70': { key: 'inspiration', kategorie: '#K10', label: 'Inspiration' },
        '#B71': { key: 'trauer_ausdruecken', kategorie: '#K10', label: 'Trauer-ausdrücken' },
        '#B72': { key: 'einsehen', kategorie: '#K10', label: 'Einsehen' },
        '#B73': { key: 'anfang_ende', kategorie: '#K10', label: 'Anfang-Ende' },

        // ─────────────────────────────────────────────────────────────────────────
        // DYNAMIK (#B74-#B220) - Kategorie #K11
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
        '#B86': { key: 'machtaustausch', kategorie: '#K11', label: 'Machtaustausch' },
        '#B87': { key: 'dienend_sein', kategorie: '#K11', label: 'Dienend-sein' },
        '#B88': { key: 'beschuetzen', kategorie: '#K11', label: 'Beschützen' },

        // ─────────────────────────────────────────────────────────────────────────
        // LEBENSPLANUNG (#B89-#B113) - Kategorie #K12
        // ─────────────────────────────────────────────────────────────────────────
        '#B89': { key: 'kinderwunsch', kategorie: '#K12', label: 'Kinderwunsch' },
        '#B90': { key: 'elternschaft', kategorie: '#K12', label: 'Elternschaft' },
        '#B91': { key: 'fortpflanzung', kategorie: '#K12', label: 'Fortpflanzung' },
        '#B92': { key: 'familie_gruenden', kategorie: '#K12', label: 'Familie-gründen' },
        '#B93': { key: 'patchwork_familie', kategorie: '#K12', label: 'Patchwork-Familie' },
        '#B94': { key: 'kinderfreies_leben', kategorie: '#K12', label: 'Kinderfreies-Leben' },
        '#B95': { key: 'adoption', kategorie: '#K12', label: 'Adoption' },
        '#B96': { key: 'pflegekinder', kategorie: '#K12', label: 'Pflegekinder' },
        '#B97': { key: 'zusammenziehen', kategorie: '#K12', label: 'Zusammenziehen' },
        '#B98': { key: 'getrennt_wohnen', kategorie: '#K12', label: 'Getrennt-wohnen' },
        '#B99': { key: 'wg_leben', kategorie: '#K12', label: 'WG-Leben' },
        '#B100': { key: 'eigenes_zimmer', kategorie: '#K12', label: 'Eigenes-Zimmer' },
        '#B101': { key: 'stadt_leben', kategorie: '#K12', label: 'Stadt-Leben' },
        '#B102': { key: 'land_leben', kategorie: '#K12', label: 'Land-Leben' },
        '#B103': { key: 'mobilitaet', kategorie: '#K12', label: 'Mobilität' },
        '#B104': { key: 'sesshaftigkeit', kategorie: '#K12', label: 'Sesshaftigkeit' },
        '#B105': { key: 'heiraten', kategorie: '#K12', label: 'Heiraten' },
        '#B106': { key: 'ohne_trauschein', kategorie: '#K12', label: 'Ohne-Trauschein' },
        '#B107': { key: 'verpartnerung', kategorie: '#K12', label: 'Verpartnerung' },
        '#B108': { key: 'haustiere', kategorie: '#K12', label: 'Haustiere' },
        '#B109': { key: 'keine_haustiere', kategorie: '#K12', label: 'Keine-Haustiere' },
        '#B110': { key: 'gemeinsame_hobbys', kategorie: '#K12', label: 'Gemeinsame-Hobbys' },
        '#B111': { key: 'eigene_hobbys', kategorie: '#K12', label: 'Eigene-Hobbys' },
        '#B112': { key: 'gemeinsamer_urlaub', kategorie: '#K12', label: 'Gemeinsamer-Urlaub' },
        '#B113': { key: 'getrennter_urlaub', kategorie: '#K12', label: 'Getrennter-Urlaub' },

        // ─────────────────────────────────────────────────────────────────────────
        // FINANZEN & KARRIERE (#B114-#B125) - Kategorie #K13
        // ─────────────────────────────────────────────────────────────────────────
        '#B114': { key: 'langzeit_planung', kategorie: '#K13', label: 'Langzeit-Planung' },
        '#B115': { key: 'im_moment_leben', kategorie: '#K13', label: 'Im-Moment-leben' },
        '#B116': { key: 'karriere_fokus', kategorie: '#K13', label: 'Karriere-Fokus' },
        '#B117': { key: 'familie_fokus', kategorie: '#K13', label: 'Familie-Fokus' },
        '#B118': { key: 'balance_arbeit_leben', kategorie: '#K13', label: 'Balance-Arbeit-Leben' },
        '#B119': { key: 'gemeinsame_werte', kategorie: '#K13', label: 'Gemeinsame-Werte' },
        '#B120': { key: 'respekt_unterschiede', kategorie: '#K13', label: 'Respekt-Unterschiede' },
        '#B121': { key: 'traditionen_pflegen', kategorie: '#K13', label: 'Traditionen-pflegen' },
        '#B122': { key: 'neue_wege_gehen', kategorie: '#K13', label: 'Neue-Wege-gehen' },
        '#B123': { key: 'spiritualitaet_teilen', kategorie: '#K13', label: 'Spiritualität-teilen' },
        '#B124': { key: 'saekulares_leben', kategorie: '#K13', label: 'Säkulares-Leben' },
        '#B125': { key: 'gesunde_ernaehrung', kategorie: '#K13', label: 'Gesunde-Ernährung' },

        // ─────────────────────────────────────────────────────────────────────────
        // KOMMUNIKATIONSSTIL (#B126-#B142) - Kategorie #K14
        // ─────────────────────────────────────────────────────────────────────────
        '#B126': { key: 'sport_fitness', kategorie: '#K14', label: 'Sport-Fitness' },
        '#B127': { key: 'finanzielle_unabhaengigkeit', kategorie: '#K14', label: 'Finanzielle-Unabhängigkeit' },
        '#B128': { key: 'gemeinsame_finanzen', kategorie: '#K14', label: 'Gemeinsame-Finanzen' },
        '#B129': { key: 'getrennte_finanzen', kategorie: '#K14', label: 'Getrennte-Finanzen' },
        '#B130': { key: 'sparsamkeit', kategorie: '#K14', label: 'Sparsamkeit' },
        '#B131': { key: 'grosszuegigkeit', kategorie: '#K14', label: 'Großzügigkeit' },
        '#B132': { key: 'vermoegensaufbau', kategorie: '#K14', label: 'Vermögensaufbau' },
        '#B133': { key: 'minimalismus', kategorie: '#K14', label: 'Minimalismus' },
        '#B134': { key: 'berufliche_erfuellung', kategorie: '#K14', label: 'Berufliche-Erfüllung' },
        '#B135': { key: 'arbeit_als_mittel', kategorie: '#K14', label: 'Arbeit-als-Mittel' },
        '#B136': { key: 'selbststaendigkeit', kategorie: '#K14', label: 'Selbstständigkeit' },
        '#B137': { key: 'angestellten_dasein', kategorie: '#K14', label: 'Angestellten-Dasein' },
        '#B138': { key: 'fuehrungsposition', kategorie: '#K14', label: 'Führungsposition' },
        '#B139': { key: 'team_arbeit', kategorie: '#K14', label: 'Team-Arbeit' },
        '#B140': { key: 'home_office', kategorie: '#K14', label: 'Home-Office' },
        '#B141': { key: 'buero_praesenz', kategorie: '#K14', label: 'Büro-Präsenz' },
        '#B142': { key: 'flexible_arbeitszeit', kategorie: '#K14', label: 'Flexible-Arbeitszeit' },

        // ─────────────────────────────────────────────────────────────────────────
        // SOZIALES LEBEN (#B143-#B159) - Kategorie #K15
        // ─────────────────────────────────────────────────────────────────────────
        '#B143': { key: 'feste_strukturen', kategorie: '#K15', label: 'Feste-Strukturen' },
        '#B144': { key: 'weiterbildung', kategorie: '#K15', label: 'Weiterbildung' },
        '#B145': { key: 'ruhestand_planung', kategorie: '#K15', label: 'Ruhestand-Planung' },
        '#B146': { key: 'sabbatical', kategorie: '#K15', label: 'Sabbatical' },
        '#B147': { key: 'risiko_bereitschaft', kategorie: '#K15', label: 'Risiko-Bereitschaft' },
        '#B148': { key: 'sicherheits_orientierung', kategorie: '#K15', label: 'Sicherheits-Orientierung' },
        '#B149': { key: 'taeglicher_austausch', kategorie: '#K15', label: 'Täglicher-Austausch' },
        '#B150': { key: 'qualitaets_zeit', kategorie: '#K15', label: 'Qualitäts-Zeit' },
        '#B151': { key: 'tiefgehende_gespraeche', kategorie: '#K15', label: 'Tiefgehende-Gespräche' },
        '#B152': { key: 'leichte_unterhaltung', kategorie: '#K15', label: 'Leichte-Unterhaltung' },
        '#B153': { key: 'emotionale_offenheit', kategorie: '#K15', label: 'Emotionale-Offenheit' },
        '#B154': { key: 'sachliche_kommunikation', kategorie: '#K15', label: 'Sachliche-Kommunikation' },
        '#B155': { key: 'konflikt_ansprechen', kategorie: '#K15', label: 'Konflikt-Ansprechen' },
        '#B156': { key: 'harmonie_bewahren', kategorie: '#K15', label: 'Harmonie-Bewahren' },
        '#B157': { key: 'direkte_kommunikation', kategorie: '#K15', label: 'Direkte-Kommunikation' },
        '#B158': { key: 'diplomatische_kommunikation', kategorie: '#K15', label: 'Diplomatische-Kommunikation' },
        '#B159': { key: 'feedback_kultur', kategorie: '#K15', label: 'Feedback-Kultur' },

        // ─────────────────────────────────────────────────────────────────────────
        // INTIMITÄT & ROMANTIK (#B160-#B177) - Kategorie #K16
        // ─────────────────────────────────────────────────────────────────────────
        '#B160': { key: 'nonverbale_kommunikation', kategorie: '#K16', label: 'Nonverbale-Kommunikation' },
        '#B161': { key: 'aktives_zuhoeren', kategorie: '#K16', label: 'Aktives-Zuhören' },
        '#B162': { key: 'humor_im_gespraech', kategorie: '#K16', label: 'Humor-im-Gespräch' },
        '#B163': { key: 'ernsthaftigkeit', kategorie: '#K16', label: 'Ernsthaftigkeit' },
        '#B164': { key: 'spontane_gespraeche', kategorie: '#K16', label: 'Spontane-Gespräche' },
        '#B165': { key: 'geplante_gespraeche', kategorie: '#K16', label: 'Geplante-Gespräche' },
        '#B166': { key: 'schriftliche_kommunikation', kategorie: '#K16', label: 'Schriftliche-Kommunikation' },
        '#B167': { key: 'muendliche_kommunikation', kategorie: '#K16', label: 'Mündliche-Kommunikation' },
        '#B168': { key: 'gemeinsam_entscheiden', kategorie: '#K16', label: 'Gemeinsam-Entscheiden' },
        '#B169': { key: 'eigenstaendige_entscheidungen', kategorie: '#K16', label: 'Eigenständige-Entscheidungen' },
        '#B170': { key: 'kompromiss_bereitschaft', kategorie: '#K16', label: 'Kompromiss-Bereitschaft' },
        '#B171': { key: 'klare_standpunkte', kategorie: '#K16', label: 'Klare-Standpunkte' },
        '#B172': { key: 'emotionale_unterstuetzung', kategorie: '#K16', label: 'Emotionale-Unterstützung' },
        '#B173': { key: 'praktische_unterstuetzung', kategorie: '#K16', label: 'Praktische-Unterstützung' },
        '#B174': { key: 'regelmaessige_check_ins', kategorie: '#K16', label: 'Regelmäßige-Check-Ins' },
        '#B175': { key: 'beziehungs_reflexion', kategorie: '#K16', label: 'Beziehungs-Reflexion' },
        '#B176': { key: 'natuerlicher_flow', kategorie: '#K16', label: 'Natürlicher-Flow' },
        '#B177': { key: 'soziale_energie', kategorie: '#K16', label: 'Soziale-Energie' },

        // ─────────────────────────────────────────────────────────────────────────
        // WERTE & HALTUNGEN (#B178-#B195) - Kategorie #K17
        // ─────────────────────────────────────────────────────────────────────────
        '#B178': { key: 'geselligkeit', kategorie: '#K17', label: 'Geselligkeit' },
        '#B179': { key: 'ruhe_von_menschen', kategorie: '#K17', label: 'Ruhe-von-Menschen' },
        '#B180': { key: 'freunde_pflegen', kategorie: '#K17', label: 'Freunde-pflegen' },
        '#B181': { key: 'paar_zeit_fokus', kategorie: '#K17', label: 'Paar-Zeit-Fokus' },
        '#B182': { key: 'gemeinsame_freunde', kategorie: '#K17', label: 'Gemeinsame-Freunde' },
        '#B183': { key: 'eigene_freunde', kategorie: '#K17', label: 'Eigene-Freunde' },
        '#B184': { key: 'familie_treffen', kategorie: '#K17', label: 'Familie-treffen' },
        '#B185': { key: 'familie_distanz', kategorie: '#K17', label: 'Familie-Distanz' },
        '#B186': { key: 'partys_events', kategorie: '#K17', label: 'Partys-Events' },
        '#B187': { key: 'ruhige_abende', kategorie: '#K17', label: 'Ruhige-Abende' },
        '#B188': { key: 'neue_leute_treffen', kategorie: '#K17', label: 'Neue-Leute-treffen' },
        '#B189': { key: 'vertrauter_kreis', kategorie: '#K17', label: 'Vertrauter-Kreis' },
        '#B190': { key: 'allein_zeit', kategorie: '#K17', label: 'Allein-Zeit' },
        '#B191': { key: 'gemeinsam_sein', kategorie: '#K17', label: 'Gemeinsam-sein' },
        '#B192': { key: 'spontane_besuche', kategorie: '#K17', label: 'Spontane-Besuche' },
        '#B193': { key: 'geplante_treffen', kategorie: '#K17', label: 'Geplante-Treffen' },
        '#B194': { key: 'gastgeber_sein', kategorie: '#K17', label: 'Gastgeber-sein' },
        '#B195': { key: 'gast_sein', kategorie: '#K17', label: 'Gast-sein' },

        // ─────────────────────────────────────────────────────────────────────────
        // PRAKTISCHES LEBEN (#B196-#B208) - Kategorie #K18
        // ─────────────────────────────────────────────────────────────────────────
        '#B196': { key: 'online_kontakte', kategorie: '#K18', label: 'Online-Kontakte' },
        '#B197': { key: 'persoenliche_treffen', kategorie: '#K18', label: 'Persönliche-Treffen' },
        '#B198': { key: 'community_engagement', kategorie: '#K18', label: 'Community-Engagement' },
        '#B199': { key: 'privat_leben', kategorie: '#K18', label: 'Privat-Leben' },
        '#B200': { key: 'netzwerken', kategorie: '#K18', label: 'Netzwerken' },
        '#B201': { key: 'wenige_tiefe_beziehungen', kategorie: '#K18', label: 'Wenige-tiefe-Beziehungen' },
        '#B202': { key: 'viele_bekanntschaften', kategorie: '#K18', label: 'Viele-Bekanntschaften' },
        '#B203': { key: 'kulturelle_events', kategorie: '#K18', label: 'Kulturelle-Events' },
        '#B204': { key: 'koerpernaehe', kategorie: '#K18', label: 'Körpernähe' },
        '#B205': { key: 'kuscheln', kategorie: '#K18', label: 'Kuscheln' },
        '#B206': { key: 'physische_distanz', kategorie: '#K18', label: 'Physische-Distanz' },
        '#B207': { key: 'koerperkontakt', kategorie: '#K18', label: 'Körperkontakt' },
        '#B208': { key: 'umarmungen', kategorie: '#K18', label: 'Umarmungen' },

        // ─────────────────────────────────────────────────────────────────────────
        // MUSSE (#B46-#B211) - Kategorie #K7
        // ─────────────────────────────────────────────────────────────────────────
        '#B209': { key: 'schmerzerleben', kategorie: '#K7', label: 'Schmerzerleben' },
        '#B210': { key: 'schmerz_geben', kategorie: '#K7', label: 'Schmerz-geben' },
        '#B211': { key: 'bondage_erleben', kategorie: '#K7', label: 'Bondage-erleben' },

        // ─────────────────────────────────────────────────────────────────────────
        // DYNAMIK (#B74-#B220) - Kategorie #K11
        // ─────────────────────────────────────────────────────────────────────────
        '#B212': { key: 'bondage_geben', kategorie: '#K11', label: 'Bondage-geben' },
        '#B213': { key: 'devotion', kategorie: '#K11', label: 'Devotion' },
        '#B214': { key: 'anbetung', kategorie: '#K11', label: 'Anbetung' },
        '#B215': { key: 'demuetig_sein', kategorie: '#K11', label: 'Demütig-sein' },
        '#B216': { key: 'dominieren', kategorie: '#K11', label: 'Dominieren' },
        '#B217': { key: 'bestrafung_erhalten', kategorie: '#K11', label: 'Bestrafung-erhalten' },
        '#B218': { key: 'bestrafen', kategorie: '#K11', label: 'Bestrafen' },
        '#B219': { key: 'service_orientierung', kategorie: '#K11', label: 'Service-Orientierung' },
        '#B220': { key: 'service_empfangen', kategorie: '#K11', label: 'Service-empfangen' }
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
