/**
 * SSOT-GENERATOR: beduerfnis-ids.js aus beduerfnis-katalog.json
 *
 * Generiert beduerfnis-ids.js automatisch aus beduerfnis-katalog.json (SSOT)
 *
 * Ausführung: node scripts/generate-beduerfnis-ids.js
 */

const fs = require('fs');
const path = require('path');

// Lade SSOT
const katalogPath = path.join(__dirname, '../profiles/data/beduerfnis-katalog.json');
const katalog = JSON.parse(fs.readFileSync(katalogPath, 'utf8'));

// Extrahiere Bedürfnisse
const beduerfnisse = katalog.beduerfnisse || {};

// Sortiere nach ID-Nummer
const sortedIds = Object.keys(beduerfnisse)
    .filter(id => id.startsWith('#B'))
    .sort((a, b) => {
        const numA = parseInt(a.replace('#B', ''));
        const numB = parseInt(b.replace('#B', ''));
        return numA - numB;
    });

console.log('Gefunden:', sortedIds.length, 'Bedürfnisse in katalog.json');

// Gruppiere nach Kategorie für Kommentare
const byKategorie = {};
sortedIds.forEach(id => {
    const need = beduerfnisse[id];
    const kat = need.kategorie;
    if (!byKategorie[kat]) byKategorie[kat] = [];
    byKategorie[kat].push(id);
});

// Generiere key aus label
function labelToKey(label) {
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
}

// Generiere den JS-Code
let output = `/**
 * TIAGE BEDÜRFNIS-ID-KATALOG v3.0
 *
 * AUTOMATISCH GENERIERT aus beduerfnis-katalog.json (SSOT)
 * Letzte Generierung: ${new Date().toISOString().split('T')[0]}
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
 * #B1-#B${sortedIds.length > 0 ? sortedIds[sortedIds.length-1].replace('#B', '') : '???'}  → ${sortedIds.length} Bedürfnisse
 *
 * TOTAL: ${sortedIds.length} Bedürfnisse
 */

const BeduerfnisIds = {

    version: '3.0.0',
    generatedFrom: 'beduerfnis-katalog.json',
    generatedAt: '${new Date().toISOString()}',

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
`;

// Kategorie-Labels aus taxonomie.js (hardcoded für Generator)
const kategorieLabels = {
    '#K1': 'EXISTENZ',
    '#K2': 'SICHERHEIT',
    '#K3': 'ZUNEIGUNG',
    '#K4': 'VERSTÄNDNIS',
    '#K5': 'FREIHEIT',
    '#K6': 'TEILNAHME',
    '#K7': 'MUSSE',
    '#K8': 'IDENTITÄT',
    '#K9': 'ERSCHAFFEN',
    '#K10': 'VERBUNDENHEIT',
    '#K11': 'DYNAMIK',
    '#K12': 'LEBENSPLANUNG',
    '#K13': 'FINANZEN & KARRIERE',
    '#K14': 'KOMMUNIKATIONSSTIL',
    '#K15': 'SOZIALES LEBEN',
    '#K16': 'INTIMITÄT & ROMANTIK',
    '#K17': 'WERTE & HALTUNGEN',
    '#K18': 'PRAKTISCHES LEBEN'
};

// Generiere Einträge gruppiert nach Kategorie
let currentKategorie = null;
sortedIds.forEach((id, index) => {
    const need = beduerfnisse[id];
    const kat = need.kategorie;

    // Kategorie-Kommentar wenn neue Kategorie
    if (kat !== currentKategorie) {
        if (currentKategorie !== null) {
            output += '\n';
        }
        const katLabel = kategorieLabels[kat] || kat;
        const katNeeds = byKategorie[kat] || [];
        const firstId = katNeeds[0] || '?';
        const lastId = katNeeds[katNeeds.length - 1] || '?';
        output += `        // ─────────────────────────────────────────────────────────────────────────
        // ${katLabel} (${firstId}-${lastId}) - Kategorie ${kat}
        // ─────────────────────────────────────────────────────────────────────────\n`;
        currentKategorie = kat;
    }

    const key = labelToKey(need.label);
    const label = need.label.replace(/'/g, "\\'");
    const isLast = index === sortedIds.length - 1;
    const comma = isLast ? '' : ',';

    output += `        '${id}': { key: '${key}', kategorie: '${kat}', label: '${label}' }${comma}\n`;
});

output += `    },

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
`;

// Schreibe Datei
const outputPath = path.join(__dirname, '../profiles/definitions/beduerfnis-ids.js');
fs.writeFileSync(outputPath, output, 'utf8');

console.log('✅ beduerfnis-ids.js generiert mit', sortedIds.length, 'Bedürfnissen');
console.log('   Pfad:', outputPath);

// Zeige Kategorie-Statistik
console.log('\nKategorie-Verteilung:');
Object.keys(byKategorie).sort().forEach(kat => {
    const label = kategorieLabels[kat] || kat;
    console.log('  ' + kat + ' (' + label + '): ' + byKategorie[kat].length + ' Bedürfnisse');
});
