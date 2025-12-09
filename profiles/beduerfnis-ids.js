/**
 * TIAGE BEDÜRFNIS-ID-KATALOG v1.0
 *
 * Zentrales Mapping: String-Keys <-> #IDs
 *
 * Struktur:
 * #P1-#P4   → 4 Perspektiven (Statistik, Osho, Pirsig, SexPositiv)
 * #D1-#D6   → 6 Dimensionen
 * #K1-#K18  → 18 Kategorien
 * #B1-#B88  → 88 Kern-Bedürfnisse (GFK + Dynamik)
 * #B89-#B208 → 120 Lebensthemen-Bedürfnisse
 */

const BeduerfnisIds = {

    // ═══════════════════════════════════════════════════════════════════════════
    // PERSPEKTIVEN (#P1-#P4)
    // ═══════════════════════════════════════════════════════════════════════════
    perspektiven: {
        '#P1': { key: 'statistik', name: 'Statistik', beschreibung: 'Empirische Forschung' },
        '#P2': { key: 'osho', name: 'Osho', beschreibung: 'Tantra/Polarität' },
        '#P3': { key: 'pirsig', name: 'Pirsig', beschreibung: 'Metaphysics of Quality' },
        '#P4': { key: 'sexpositiv', name: 'SexPositiv', beschreibung: 'BDSM/Kink Dynamik' }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // DIMENSIONEN (#D1-#D6)
    // ═══════════════════════════════════════════════════════════════════════════
    dimensionen: {
        '#D1': { key: 'grundbeduerfnisse', name: 'Grundbedürfnisse' },
        '#D2': { key: 'beziehungsbeduerfnisse', name: 'Beziehungsbedürfnisse' },
        '#D3': { key: 'selbstbeduerfnisse', name: 'Selbstbedürfnisse' },
        '#D4': { key: 'dynamik', name: 'Dynamik & Austausch' },
        '#D5': { key: 'lebensplanung', name: 'Lebensplanung' },
        '#D6': { key: 'werte', name: 'Werte & Haltungen' }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // KATEGORIEN (#K1-#K18)
    // ═══════════════════════════════════════════════════════════════════════════
    kategorien: {
        // Dimension 1: Grundbedürfnisse
        '#K1': { key: 'existenz', dimension: '#D1', name: 'Existenz' },
        '#K2': { key: 'sicherheit', dimension: '#D1', name: 'Sicherheit' },
        // Dimension 2: Beziehungsbedürfnisse
        '#K3': { key: 'zuneigung', dimension: '#D2', name: 'Zuneigung' },
        '#K4': { key: 'verstaendnis', dimension: '#D2', name: 'Verständnis' },
        '#K5': { key: 'teilnahme', dimension: '#D2', name: 'Teilnahme' },
        // Dimension 3: Selbstbedürfnisse
        '#K6': { key: 'freiheit', dimension: '#D3', name: 'Freiheit' },
        '#K7': { key: 'identitaet', dimension: '#D3', name: 'Identität' },
        '#K8': { key: 'musse', dimension: '#D3', name: 'Muße' },
        '#K9': { key: 'erschaffen', dimension: '#D3', name: 'Erschaffen' },
        '#K10': { key: 'verbundenheit', dimension: '#D3', name: 'Verbundenheit' },
        // Dimension 4: Dynamik
        '#K11': { key: 'dynamik', dimension: '#D4', name: 'Dynamik & Austausch' },
        // Dimension 5: Lebensplanung
        '#K12': { key: 'lebensplanung', dimension: '#D5', name: 'Lebensplanung' },
        '#K13': { key: 'finanzen_karriere', dimension: '#D5', name: 'Finanzen & Karriere' },
        '#K14': { key: 'praktisches_leben', dimension: '#D5', name: 'Praktisches Leben' },
        // Dimension 6: Werte & Haltungen
        '#K15': { key: 'kommunikation_stil', dimension: '#D6', name: 'Kommunikationsstil' },
        '#K16': { key: 'soziales_leben', dimension: '#D6', name: 'Soziales Leben' },
        '#K17': { key: 'intimitaet_beziehung', dimension: '#D6', name: 'Intimität & Romantik' },
        '#K18': { key: 'werte_haltung', dimension: '#D6', name: 'Werte & Haltungen' }
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
        '#B89': { key: 'geduld', kategorie: '#K4', label: 'Geduld' }
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
    }
};

// Export für Node.js und Browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BeduerfnisIds;
}
