/**
 * TIAGE BEDÜRFNIS-KATALOG WRAPPER v4.0
 *
 * SSOT: Lädt beduerfnis-katalog.json direkt - KEINE separate IDS-Datei mehr!
 *
 * Dieser Wrapper:
 * - Lädt die JSON-Datei einmalig
 * - Generiert Lookup-Tabellen zur Laufzeit
 * - Stellt dieselbe API wie das alte BeduerfnisIds bereit
 * - Ist vollständig abwärtskompatibel
 *
 * Struktur:
 * #P1-#P4   → 4 Perspektiven    (siehe taxonomie.js)
 * #D1-#D6   → 6 Dimensionen     (siehe taxonomie.js, Kurzform A-F)
 * #K1-#K18  → 18 Kategorien     (siehe taxonomie.js)
 * #B1-#B224 → 224 Bedürfnisse   (SSOT: beduerfnis-katalog.json)
 */

const BeduerfnisIds = {

    version: '4.0.0',
    source: 'beduerfnis-katalog.json',

    // Status
    _loaded: false,
    _loading: false,
    _loadPromise: null,
    _katalog: null,

    // Generierte Daten
    beduerfnisse: {},

    // Lookup-Tabellen
    _keyToId: null,
    _idToKey: null,

    // Taxonomie-Referenz
    _taxonomie: null,

    // ═══════════════════════════════════════════════════════════════════════════
    // LADEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Lädt den Katalog. Wird automatisch aufgerufen bei Bedarf.
     * @returns {Promise} Resolves wenn geladen
     */
    load: function() {
        if (this._loaded) {
            return Promise.resolve(this);
        }

        if (this._loading) {
            return this._loadPromise;
        }

        this._loading = true;

        // Pfad ermitteln (Browser vs Node.js)
        var katalogPath = 'profiles/data/beduerfnis-katalog.json';

        // Im Browser: Relativer Pfad vom HTML
        if (typeof window !== 'undefined') {
            // Prüfe ob wir im Root oder Unterordner sind
            var scripts = document.getElementsByTagName('script');
            for (var i = 0; i < scripts.length; i++) {
                var src = scripts[i].src || '';
                if (src.includes('beduerfnis-katalog.js')) {
                    // Script gefunden, berechne relativen Pfad
                    var scriptPath = src.substring(0, src.lastIndexOf('/'));
                    katalogPath = scriptPath.replace('/definitions', '/data') + '/beduerfnis-katalog.json';
                    break;
                }
            }
        }

        var self = this;

        this._loadPromise = new Promise(function(resolve, reject) {
            // Node.js
            if (typeof require !== 'undefined' && typeof window === 'undefined') {
                try {
                    var fs = require('fs');
                    var path = require('path');
                    var jsonPath = path.join(__dirname, '../data/beduerfnis-katalog.json');
                    var data = fs.readFileSync(jsonPath, 'utf8');
                    self._processKatalog(JSON.parse(data));
                    resolve(self);
                } catch (e) {
                    reject(e);
                }
                return;
            }

            // Browser
            fetch(katalogPath)
                .then(function(response) {
                    if (!response.ok) {
                        throw new Error('HTTP error! status: ' + response.status);
                    }
                    return response.json();
                })
                .then(function(katalog) {
                    self._processKatalog(katalog);
                    resolve(self);
                })
                .catch(function(error) {
                    console.error('[BeduerfnisIds] Fehler beim Laden:', error);
                    reject(error);
                });
        });

        return this._loadPromise;
    },

    /**
     * Verarbeitet den geladenen Katalog
     */
    _processKatalog: function(katalog) {
        this._katalog = katalog;

        // Generiere beduerfnisse aus Katalog
        var beduerfnisse = katalog.beduerfnisse || {};
        var self = this;

        Object.keys(beduerfnisse).forEach(function(id) {
            // Ignoriere Kommentar-Einträge
            if (id.startsWith('_')) return;

            var need = beduerfnisse[id];

            // Nur gültige Bedürfnisse mit Label verarbeiten
            if (!need.label) return;

            self.beduerfnisse[id] = {
                key: self._labelToKey(need.label),
                kategorie: need.kategorie,
                label: need.label,
                // Zusätzliche Felder aus dem Katalog
                frageTyp: need.frageTyp,
                frage: need.frage,
                nuancen: need.nuancen,
                hauptbeduerfnis: need.hauptbeduerfnis,
                kontext: need.kontext,
                dimension: need.dimension,
                sekundaer: need.sekundaer,
                skala: need.skala
            };
        });

        // Lookup-Tabellen initialisieren
        this._initLookups();

        this._loaded = true;
        this._loading = false;

        console.log('[BeduerfnisIds] v' + katalog.version + ' geladen - ' +
                    Object.keys(this.beduerfnisse).length + ' Bedürfnisse');

        // Event dispatchen für wartenden Code
        if (typeof document !== 'undefined') {
            document.dispatchEvent(new CustomEvent('beduerfnisIdsLoaded', {
                detail: { version: katalog.version, count: Object.keys(this.beduerfnisse).length }
            }));

            // Auch das alte Event für Kompatibilität
            document.dispatchEvent(new CustomEvent('beduerfnisKatalogLoaded', {
                detail: { version: katalog.version, katalog: katalog }
            }));
        }
    },

    /**
     * Konvertiert Label zu Key
     */
    _labelToKey: function(label) {
        return label
            .toLowerCase()
            .replace(/ä/g, 'ae')
            .replace(/ö/g, 'oe')
            .replace(/ü/g, 'ue')
            .replace(/ß/g, 'ss')
            .replace(/&/g, '_und_')
            .replace(/-/g, '_')
            .replace(/\s+/g, '_')
            .replace(/[^a-z0-9_]/g, '')
            .replace(/_+/g, '_')
            .replace(/^_|_$/g, '');
    },

    /**
     * Initialisiert Lookup-Tabellen
     */
    _initLookups: function() {
        this._keyToId = {};
        this._idToKey = {};

        for (var id in this.beduerfnisse) {
            var need = this.beduerfnisse[id];
            this._keyToId[need.key] = id;
            this._idToKey[id] = need.key;
        }
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // SYNCHRONE INITIALISIERUNG (für Kompatibilität)
    // ═══════════════════════════════════════════════════════════════════════════

    init: function() {
        if (!this._keyToId && this._loaded) {
            this._initLookups();
        }
        return this;
    },

    // ═══════════════════════════════════════════════════════════════════════════
    // TAXONOMIE-REFERENZ (SSOT)
    // ═══════════════════════════════════════════════════════════════════════════

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
    // API FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    getId: function(key) {
        this.init();
        return this._keyToId ? (this._keyToId[key] || null) : null;
    },

    // Alias für Kompatibilität
    toId: function(key) {
        return this.getId(key);
    },

    getKey: function(id) {
        this.init();
        return this._idToKey ? (this._idToKey[id] || null) : null;
    },

    // Alias für Kompatibilität
    toKey: function(id) {
        return this.getKey(id);
    },

    get: function(idOrKey) {
        this.init();
        if (!idOrKey) return null;
        if (idOrKey.startsWith('#')) {
            return this.beduerfnisse[idOrKey] || null;
        }
        var id = this._keyToId ? this._keyToId[idOrKey] : null;
        return id ? this.beduerfnisse[id] : null;
    },

    getLabel: function(idOrKey) {
        this.init();
        if (!idOrKey) return idOrKey;
        var id = idOrKey.startsWith('#') ? idOrKey : (this._keyToId ? this._keyToId[idOrKey] : null);
        return this.beduerfnisse[id] ? this.beduerfnisse[id].label : idOrKey;
    },

    exists: function(idOrKey) {
        this.init();
        if (!idOrKey) return false;
        if (idOrKey.startsWith('#')) {
            return !!this.beduerfnisse[idOrKey];
        }
        return this._keyToId ? !!this._keyToId[idOrKey] : false;
    },

    getAllIds: function() {
        return Object.keys(this.beduerfnisse);
    },

    getAllKeys: function() {
        this.init();
        return this._keyToId ? Object.keys(this._keyToId) : [];
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

    /**
     * Gibt den vollen Katalog zurück (für Zugriff auf alle Metadaten)
     */
    getKatalog: function() {
        return this._katalog;
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

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT & AUTO-LOAD
// ═══════════════════════════════════════════════════════════════════════════

// Export für Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BeduerfnisIds;
    // In Node.js direkt laden
    BeduerfnisIds.load().catch(function(e) {
        console.error('[BeduerfnisIds] Node.js load error:', e);
    });
}

// Export für Browser
if (typeof window !== 'undefined') {
    window.BeduerfnisIds = BeduerfnisIds;

    // Auch als BeduerfnisKatalog für Kompatibilität
    window.BeduerfnisKatalog = {
        get beduerfnisse() { return BeduerfnisIds._katalog ? BeduerfnisIds._katalog.beduerfnisse : {}; },
        get kategorien() { return BeduerfnisIds._katalog ? BeduerfnisIds._katalog.kategorien : {}; },
        get dimensionen() { return BeduerfnisIds._katalog ? BeduerfnisIds._katalog.dimensionen : {}; },
        get perspektiven() { return BeduerfnisIds._katalog ? BeduerfnisIds._katalog.perspektiven : {}; },
        get version() { return BeduerfnisIds._katalog ? BeduerfnisIds._katalog.version : null; }
    };

    // Auto-load im Browser
    BeduerfnisIds.load().catch(function(e) {
        console.error('[BeduerfnisIds] Browser load error:', e);
    });
}
