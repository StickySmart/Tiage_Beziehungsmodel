/**
 * BEDÜRFNIS-IDS v1.0
 *
 * Zentrales Mapping zwischen String-Keys und #IDs für das Bedürfnis-System.
 * Basiert auf beduerfnis-katalog.json als Single Source of Truth.
 *
 * ID-Struktur:
 * - #B1-#B88:   GFK-Kernbedürfnisse (Rosenberg)
 * - #B89-#B113: Lebensplanung (#K12)
 * - #B114-#B125: Finanzen & Karriere (#K13)
 * - #B126-#B142: Kommunikationsstil (#K14)
 * - #B143-#B159: Soziales Leben (#K15)
 * - #B160-#B177: Intimität & Romantik (#K16)
 * - #B178-#B195: Werte & Haltungen (#K17)
 * - #B196-#B208: Praktisches Leben (#K18)
 * - #B209-#B220: Kink/BDSM Extended (#K11)
 *
 * Total: 220 Bedürfnisse
 */

const BeduerfnisIds = {

    version: '1.0.0',

    // ═══════════════════════════════════════════════════════════════════════════
    // KEY → ID MAPPING
    // ═══════════════════════════════════════════════════════════════════════════

    keyToId: {
        // ─────────────────────────────────────────────────────────────────────
        // GFK-KERN: EXISTENZ (#K1) - #B1-#B9
        // ─────────────────────────────────────────────────────────────────────
        "luft": "#B1",
        "wasser": "#B2",
        "nahrung": "#B3",
        "bewegung": "#B4",
        "beruehrung": "#B5",
        "erholung": "#B6",
        "sexueller_ausdruck": "#B7",
        "sicherheit_physisch": "#B8",
        "unterschlupf": "#B9",

        // ─────────────────────────────────────────────────────────────────────
        // GFK-KERN: SICHERHEIT (#K2) - #B10-#B15
        // ─────────────────────────────────────────────────────────────────────
        "bestaendigkeit": "#B10",
        "sich_sicher_fuehlen": "#B11",
        "schutz": "#B12",
        "stabilitaet": "#B13",
        "leichtigkeit": "#B14",
        "geborgenheit": "#B15",

        // ─────────────────────────────────────────────────────────────────────
        // GFK-KERN: ZUNEIGUNG (#K3) - #B16-#B24
        // ─────────────────────────────────────────────────────────────────────
        "waerme": "#B16",
        "wertschaetzung": "#B17",
        "naehe": "#B18",
        "gesellschaft": "#B19",
        "intimitaet": "#B20",
        "liebe": "#B21",
        "fuersorge": "#B22",
        "unterstuetzung": "#B23",
        "fuereinander_da_sein": "#B24",

        // ─────────────────────────────────────────────────────────────────────
        // GFK-KERN: VERSTÄNDNIS (#K4) - #B25-#B33
        // ─────────────────────────────────────────────────────────────────────
        "akzeptanz": "#B25",
        "mitgefuehl": "#B26",
        "beruecksichtigung": "#B27",
        "empathie": "#B28",
        "vertrauen": "#B29",
        "beachtung": "#B30",
        "gesehen_werden": "#B31",
        "verstanden_werden": "#B32",
        "harmonie": "#B33",

        // ─────────────────────────────────────────────────────────────────────
        // GFK-KERN: FREIHEIT (#K5) - #B34-#B38
        // ─────────────────────────────────────────────────────────────────────
        "selbstbestimmung": "#B34",
        "waehlen_koennen": "#B35",
        "unabhaengigkeit": "#B36",
        "raum_haben": "#B37",
        "spontaneitaet": "#B38",

        // ─────────────────────────────────────────────────────────────────────
        // GFK-KERN: TEILNAHME (#K6) - #B39-#B45
        // ─────────────────────────────────────────────────────────────────────
        "zusammenarbeit": "#B39",
        "kommunikation": "#B40",
        "gemeinschaft": "#B41",
        "zugehoerigkeit": "#B42",
        "gegenseitigkeit": "#B43",
        "respekt": "#B44",
        "bedeutung_haben": "#B45",

        // ─────────────────────────────────────────────────────────────────────
        // GFK-KERN: MUSSE (#K7) - #B46-#B49
        // ─────────────────────────────────────────────────────────────────────
        "schoenheit": "#B46",
        "freizeit": "#B47",
        "freude": "#B48",
        "humor": "#B49",

        // ─────────────────────────────────────────────────────────────────────
        // GFK-KERN: IDENTITÄT (#K8) - #B50-#B63
        // ─────────────────────────────────────────────────────────────────────
        "authentizitaet": "#B50",
        "echtheit": "#B51",
        "integritaet": "#B52",
        "praesenz": "#B53",
        "ordnung": "#B54",
        "bewusstheit": "#B55",
        "herausforderung": "#B56",
        "klarheit": "#B57",
        "kompetenz": "#B58",
        "effizienz": "#B59",
        "wirksamkeit": "#B60",
        "wachstum": "#B61",
        "sinn": "#B62",
        "beitrag_leisten": "#B63",

        // ─────────────────────────────────────────────────────────────────────
        // GFK-KERN: ERSCHAFFEN (#K9) - #B64-#B68
        // ─────────────────────────────────────────────────────────────────────
        "kreativitaet": "#B64",
        "entdecken": "#B65",
        "lernen": "#B66",
        "selbst_ausdruck": "#B67",
        "anreize_bekommen": "#B68",

        // ─────────────────────────────────────────────────────────────────────
        // GFK-KERN: VERBUNDENHEIT (#K10) - #B69-#B73
        // ─────────────────────────────────────────────────────────────────────
        "leben_feiern": "#B69",
        "inspiration": "#B70",
        "trauer_ausdruecken": "#B71",
        "einsehen": "#B72",
        "anfang_ende": "#B73",

        // ─────────────────────────────────────────────────────────────────────
        // GFK-KERN: DYNAMIK (#K11) - #B74-#B88
        // ─────────────────────────────────────────────────────────────────────
        "kontrolle_ausueben": "#B74",
        "hingabe": "#B75",
        "fuehrung_geben": "#B76",
        "gefuehrt_werden": "#B77",
        "ritual": "#B78",
        "nachsorge": "#B79",
        "grenzen_setzen": "#B80",
        "grenzen_respektieren": "#B81",
        "intensitaet": "#B82",
        "vertrauen_schenken": "#B83",
        "verantwortung_uebernehmen": "#B84",
        "sich_fallenlassen": "#B85",
        "machtaustausch": "#B86",
        "dienend_sein": "#B87",
        "beschuetzen": "#B88",

        // ─────────────────────────────────────────────────────────────────────
        // LEBENSPLANUNG (#K12) - #B89-#B113
        // ─────────────────────────────────────────────────────────────────────
        "kinderwunsch": "#B89",
        "elternschaft": "#B90",
        "fortpflanzung": "#B91",
        "familie_gruenden": "#B92",
        "generativitaet": "#B93",
        "verbindlichkeit": "#B94",
        "langfristige_bindung": "#B95",
        "rechtliche_sicherheit": "#B96",
        "treueversprechen": "#B97",
        "gemeinsamer_wohnraum": "#B98",
        "haeuslichkeit": "#B99",
        "nest_bauen": "#B100",
        "alltag_teilen": "#B101",
        "eigener_raum": "#B102",
        "rueckzugsort": "#B103",
        "tierliebe": "#B104",
        "fuersorge_tiere": "#B105",
        "sesshaftigkeit": "#B106",
        "verwurzelung": "#B107",
        "mobilitaet": "#B108",
        "heimat": "#B109",
        "neue_orte": "#B110",
        "familienbindung": "#B111",
        "herkunftsfamilie": "#B112",
        "generationenverbund": "#B113",

        // ─────────────────────────────────────────────────────────────────────
        // FINANZEN & KARRIERE (#K13) - #B114-#B125
        // ─────────────────────────────────────────────────────────────────────
        "finanzielle_unabhaengigkeit": "#B114",
        "gemeinsame_finanzen": "#B115",
        "finanzielle_transparenz": "#B116",
        "finanzielle_sicherheit": "#B117",
        "sparsamkeit": "#B118",
        "grosszuegigkeit": "#B119",
        "berufliche_erfuellung": "#B120",
        "karriereambition": "#B121",
        "work_life_balance": "#B122",
        "berufliche_anerkennung": "#B123",
        "zeit_fuer_beziehung": "#B124",
        "berufliche_flexibilitaet": "#B125",

        // ─────────────────────────────────────────────────────────────────────
        // KOMMUNIKATIONSSTIL (#K14) - #B126-#B142
        // ─────────────────────────────────────────────────────────────────────
        "taeglicher_austausch": "#B126",
        "tiefgehende_gespraeche": "#B127",
        "small_talk": "#B128",
        "stille_gemeinsam": "#B129",
        "verbale_verbindung": "#B130",
        "zuhoeren": "#B131",
        "emotionale_offenheit": "#B132",
        "gefuehle_zeigen": "#B133",
        "verletzlichkeit": "#B134",
        "emotionale_zurueckhaltung": "#B135",
        "emotionale_sicherheit": "#B136",
        "gefuehle_teilen": "#B137",
        "konfliktklaerung": "#B138",
        "aussprache": "#B139",
        "konflikt_vermeiden": "#B140",
        "streitkultur": "#B141",
        "versoehnlichkeit": "#B142",

        // ─────────────────────────────────────────────────────────────────────
        // SOZIALES LEBEN (#K15) - #B143-#B159
        // ─────────────────────────────────────────────────────────────────────
        "soziale_energie": "#B143",
        "geselligkeit": "#B144",
        "ruhe_von_menschen": "#B145",
        "allein_aufladen": "#B146",
        "menschen_treffen": "#B147",
        "kleine_gruppen": "#B148",
        "zeit_fuer_sich": "#B149",
        "eigene_hobbys": "#B150",
        "gemeinsame_zeit": "#B151",
        "partnerzeit": "#B152",
        "eigene_interessen": "#B153",
        "eigene_freunde": "#B154",
        "gemeinsame_freunde": "#B155",
        "freundeskreis_teilen": "#B156",
        "soziales_netz": "#B157",
        "freunde_pflegen": "#B158",
        "neue_freundschaften": "#B159",

        // ─────────────────────────────────────────────────────────────────────
        // INTIMITÄT & ROMANTIK (#K16) - #B160-#B177
        // ─────────────────────────────────────────────────────────────────────
        "koerpernaehe": "#B160",
        "kuscheln": "#B161",
        "physische_distanz": "#B162",
        "koerperkontakt": "#B163",
        "umarmungen": "#B164",
        "hand_halten": "#B165",
        "romantische_gesten": "#B166",
        "ueberraschungen": "#B167",
        "dates": "#B168",
        "alltags_romantik": "#B169",
        "aufmerksamkeiten": "#B170",
        "liebesbekundungen": "#B171",
        "sexuelle_haeufigkeit": "#B172",
        "sexuelle_intimiaet": "#B173",
        "koerperliche_lust": "#B174",
        "sexuelle_experimentierfreude": "#B175",
        "sexuelle_verbindung": "#B176",
        "sexuelle_zufriedenheit": "#B177",

        // ─────────────────────────────────────────────────────────────────────
        // WERTE & HALTUNGEN (#K17) - #B178-#B195
        // ─────────────────────────────────────────────────────────────────────
        "spiritualitaet": "#B178",
        "glaubenspraxis": "#B179",
        "religioese_gemeinschaft": "#B180",
        "saekularitaet": "#B181",
        "sinnsuche": "#B182",
        "transzendenz": "#B183",
        "traditionelle_werte": "#B184",
        "moderne_lebensweise": "#B185",
        "konservative_werte": "#B186",
        "progressive_werte": "#B187",
        "kulturelle_tradition": "#B188",
        "offenheit_fuer_neues": "#B189",
        "umweltverantwortung": "#B190",
        "nachhaltigkeit": "#B191",
        "oekologisches_bewusstsein": "#B192",
        "pragmatismus": "#B193",
        "klimaschutz": "#B194",
        "ressourcenschonung": "#B195",

        // ─────────────────────────────────────────────────────────────────────
        // PRAKTISCHES LEBEN (#K18) - #B196-#B208
        // ─────────────────────────────────────────────────────────────────────
        "ordnungssinn": "#B196",
        "sauberkeit": "#B197",
        "struktur": "#B198",
        "chaos_toleranz": "#B199",
        "organisiert_sein": "#B200",
        "flexibilitaet_haushalt": "#B201",
        "reisen": "#B202",
        "abenteuer": "#B203",
        "neue_orte_entdecken": "#B204",
        "zuhause_bleiben": "#B205",
        "urlaub": "#B206",
        "fernweh": "#B207",
        "heimatverbundenheit": "#B208",

        // ─────────────────────────────────────────────────────────────────────
        // KINK/BDSM EXTENDED (#K11) - #B209-#B220
        // ─────────────────────────────────────────────────────────────────────
        "schmerzerleben": "#B209",
        "schmerz_geben": "#B210",
        "bondage_erleben": "#B211",
        "bondage_geben": "#B212",
        "devotion": "#B213",
        "anbetung": "#B214",
        "demuetig_sein": "#B215",
        "dominieren": "#B216",
        "bestrafung_erhalten": "#B217",
        "bestrafen": "#B218",
        "service_orientierung": "#B219",
        "service_empfangen": "#B220"
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // ID → KEY MAPPING (auto-generated reverse)
    // ═══════════════════════════════════════════════════════════════════════════

    idToKey: null, // Wird in init() generiert

    // ═══════════════════════════════════════════════════════════════════════════
    // KATEGORIE-MAPPING
    // ═══════════════════════════════════════════════════════════════════════════

    kategorien: {
        "#K1": { label: "Existenz", range: ["#B1", "#B9"] },
        "#K2": { label: "Sicherheit", range: ["#B10", "#B15"] },
        "#K3": { label: "Zuneigung", range: ["#B16", "#B24"] },
        "#K4": { label: "Verständnis", range: ["#B25", "#B33"] },
        "#K5": { label: "Freiheit", range: ["#B34", "#B38"] },
        "#K6": { label: "Teilnahme", range: ["#B39", "#B45"] },
        "#K7": { label: "Muße", range: ["#B46", "#B49"] },
        "#K8": { label: "Identität", range: ["#B50", "#B63"] },
        "#K9": { label: "Erschaffen", range: ["#B64", "#B68"] },
        "#K10": { label: "Verbundenheit", range: ["#B69", "#B73"] },
        "#K11": { label: "Dynamik", range: ["#B74", "#B88"], extended: ["#B209", "#B220"] },
        "#K12": { label: "Lebensplanung", range: ["#B89", "#B113"] },
        "#K13": { label: "Finanzen-Karriere", range: ["#B114", "#B125"] },
        "#K14": { label: "Kommunikationsstil", range: ["#B126", "#B142"] },
        "#K15": { label: "Soziales-Leben", range: ["#B143", "#B159"] },
        "#K16": { label: "Intimität-Romantik", range: ["#B160", "#B177"] },
        "#K17": { label: "Werte-Haltungen", range: ["#B178", "#B195"] },
        "#K18": { label: "Praktisches-Leben", range: ["#B196", "#B208"] }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // KONVERTIERUNGSFUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Konvertiert einen String-Key zu einer #ID
     * @param {string} key - Der String-Key (z.B. "naehe")
     * @returns {string|null} Die #ID (z.B. "#B18") oder null wenn nicht gefunden
     */
    toId: function(key) {
        if (!key) return null;
        // Bereits eine ID?
        if (key.startsWith('#B')) return key;
        return this.keyToId[key] || null;
    },

    /**
     * Konvertiert eine #ID zu einem String-Key
     * @param {string} id - Die #ID (z.B. "#B18")
     * @returns {string|null} Der String-Key (z.B. "naehe") oder null wenn nicht gefunden
     */
    toKey: function(id) {
        if (!id) return null;
        // Bereits ein Key?
        if (!id.startsWith('#B')) return id;
        this._ensureIdToKey();
        return this.idToKey[id] || null;
    },

    /**
     * Konvertiert ein Objekt mit String-Keys zu einem Objekt mit #IDs
     * @param {Object} obj - Objekt mit String-Keys als Properties
     * @returns {Object} Neues Objekt mit #IDs als Properties
     */
    objectToIds: function(obj) {
        if (!obj) return {};
        const result = {};
        for (const key in obj) {
            const id = this.toId(key);
            if (id) {
                result[id] = obj[key];
            } else {
                // Key nicht im Mapping - behalten (könnte Meta-Info sein)
                result[key] = obj[key];
            }
        }
        return result;
    },

    /**
     * Konvertiert ein Objekt mit #IDs zu einem Objekt mit String-Keys
     * @param {Object} obj - Objekt mit #IDs als Properties
     * @returns {Object} Neues Objekt mit String-Keys als Properties
     */
    objectToKeys: function(obj) {
        if (!obj) return {};
        this._ensureIdToKey();
        const result = {};
        for (const id in obj) {
            const key = this.toKey(id);
            if (key) {
                result[key] = obj[id];
            } else {
                result[id] = obj[id];
            }
        }
        return result;
    },

    /**
     * Holt alle IDs einer Kategorie
     * @param {string} kategorieId - Die Kategorie-ID (z.B. "#K3")
     * @returns {string[]} Array von #IDs in dieser Kategorie
     */
    getIdsByKategorie: function(kategorieId) {
        const kat = this.kategorien[kategorieId];
        if (!kat) return [];

        const result = [];
        const startNum = parseInt(kat.range[0].substring(2));
        const endNum = parseInt(kat.range[1].substring(2));

        for (let i = startNum; i <= endNum; i++) {
            result.push("#B" + i);
        }

        // Extended range (für #K11 Dynamik)
        if (kat.extended) {
            const extStartNum = parseInt(kat.extended[0].substring(2));
            const extEndNum = parseInt(kat.extended[1].substring(2));
            for (let i = extStartNum; i <= extEndNum; i++) {
                result.push("#B" + i);
            }
        }

        return result;
    },

    /**
     * Holt die Kategorie einer #ID
     * @param {string} id - Die Bedürfnis-#ID
     * @returns {string|null} Die Kategorie-ID oder null
     */
    getKategorieForId: function(id) {
        if (!id || !id.startsWith('#B')) return null;

        const num = parseInt(id.substring(2));

        for (const katId in this.kategorien) {
            const kat = this.kategorien[katId];
            const startNum = parseInt(kat.range[0].substring(2));
            const endNum = parseInt(kat.range[1].substring(2));

            if (num >= startNum && num <= endNum) {
                return katId;
            }

            // Extended range
            if (kat.extended) {
                const extStartNum = parseInt(kat.extended[0].substring(2));
                const extEndNum = parseInt(kat.extended[1].substring(2));
                if (num >= extStartNum && num <= extEndNum) {
                    return katId;
                }
            }
        }

        return null;
    },

    /**
     * Validiert ob eine ID existiert
     * @param {string} id - Die zu prüfende ID
     * @returns {boolean} true wenn ID im Mapping existiert
     */
    isValidId: function(id) {
        if (!id || !id.startsWith('#B')) return false;
        this._ensureIdToKey();
        return this.idToKey.hasOwnProperty(id);
    },

    /**
     * Validiert ob ein Key existiert
     * @param {string} key - Der zu prüfende Key
     * @returns {boolean} true wenn Key im Mapping existiert
     */
    isValidKey: function(key) {
        if (!key) return false;
        return this.keyToId.hasOwnProperty(key);
    },

    /**
     * Holt alle verfügbaren Keys
     * @returns {string[]} Array aller String-Keys
     */
    getAllKeys: function() {
        return Object.keys(this.keyToId);
    },

    /**
     * Holt alle verfügbaren IDs
     * @returns {string[]} Array aller #IDs
     */
    getAllIds: function() {
        this._ensureIdToKey();
        return Object.keys(this.idToKey);
    },

    /**
     * Statistik-Funktion
     * @returns {Object} Statistiken über das ID-System
     */
    getStats: function() {
        this._ensureIdToKey();
        return {
            totalIds: Object.keys(this.idToKey).length,
            totalKeys: Object.keys(this.keyToId).length,
            kategorien: Object.keys(this.kategorien).length,
            version: this.version
        };
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // INTERNE HILFSFUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Stellt sicher dass idToKey generiert ist
     * @private
     */
    _ensureIdToKey: function() {
        if (this.idToKey === null) {
            this.idToKey = {};
            for (const key in this.keyToId) {
                this.idToKey[this.keyToId[key]] = key;
            }
        }
    },

    /**
     * Initialisiert das Modul
     */
    init: function() {
        this._ensureIdToKey();
        console.log('BeduerfnisIds initialisiert:', this.getStats());
        return this;
    }
};

// Auto-Initialisierung
BeduerfnisIds.init();

// Export für Node.js und Browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BeduerfnisIds;
}
if (typeof window !== 'undefined') {
    window.BeduerfnisIds = BeduerfnisIds;
}
