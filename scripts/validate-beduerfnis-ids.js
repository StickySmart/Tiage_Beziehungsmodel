#!/usr/bin/env node
/**
 * BEDÜRFNIS-IDS KONSISTENZ-VALIDIERUNG
 *
 * Prüft, dass beduerfnis-katalog.json und beduerfnis-ids.js konsistent sind.
 * Die beduerfnis-ids.js ist die Single Source of Truth (SSOT) für ID-Zuordnungen.
 *
 * Geprüft wird:
 * 1. Alle #B-IDs in beduerfnis-katalog.json existieren auch in beduerfnis-ids.js
 * 2. Die Labels stimmen überein (mit Toleranz für Formatierung)
 */

const fs = require('fs');
const path = require('path');

// Pfade
const KATALOG_PATH = path.join(__dirname, '../profiles/data/beduerfnis-katalog.json');
const IDS_PATH = path.join(__dirname, '../profiles/definitions/beduerfnis-ids.js');

// Farben für Konsolenausgabe
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

function log(color, msg) {
    console.log(`${color}${msg}${RESET}`);
}

function normalizeLabel(label) {
    // Normalisiere Labels für Vergleich (Bindestriche, Groß-/Kleinschreibung)
    return label
        .toLowerCase()
        .replace(/-/g, ' ')
        .replace(/_/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function extractBeduerfnisIds() {
    const content = fs.readFileSync(IDS_PATH, 'utf8');
    const ids = {};

    // Regex für: '#B123': { key: '...', kategorie: '...', label: '...' }
    const regex = /'(#B\d+)':\s*\{\s*key:\s*'([^']+)',\s*kategorie:\s*'([^']+)',\s*label:\s*'([^']+)'/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        ids[match[1]] = {
            key: match[2],
            kategorie: match[3],
            label: match[4]
        };
    }

    return ids;
}

function extractKatalogIds() {
    const content = fs.readFileSync(KATALOG_PATH, 'utf8');
    const katalog = JSON.parse(content);
    const ids = {};

    if (katalog.beduerfnisse) {
        Object.entries(katalog.beduerfnisse).forEach(([id, data]) => {
            if (id.startsWith('#B')) {
                ids[id] = {
                    label: data.label,
                    kategorie: data.kategorie
                };
            }
        });
    }

    return ids;
}

function validate() {
    console.log('🔍 Validiere Bedürfnis-IDs Konsistenz...\n');

    let errors = [];
    let warnings = [];

    // Lade beide Quellen
    const ssotIds = extractBeduerfnisIds();
    const katalogIds = extractKatalogIds();

    console.log(`📚 beduerfnis-ids.js (SSOT): ${Object.keys(ssotIds).length} Einträge`);
    console.log(`📖 beduerfnis-katalog.json: ${Object.keys(katalogIds).length} Einträge\n`);

    // Prüfung 1: Alle Katalog-IDs müssen in SSOT existieren
    console.log('--- Prüfung 1: Katalog-IDs in SSOT vorhanden ---');
    Object.keys(katalogIds).forEach(id => {
        if (!ssotIds[id]) {
            errors.push(`${id} existiert im Katalog, aber nicht in beduerfnis-ids.js`);
        }
    });

    // Prüfung 2: Alle SSOT-IDs sollten im Katalog existieren
    console.log('--- Prüfung 2: SSOT-IDs im Katalog vorhanden ---');
    Object.keys(ssotIds).forEach(id => {
        if (!katalogIds[id]) {
            warnings.push(`${id} (${ssotIds[id].label}) existiert in SSOT, fehlt aber im Katalog`);
        }
    });

    // Prüfung 3: Label-Konsistenz (mit Toleranz)
    console.log('--- Prüfung 3: Label-Konsistenz ---');
    Object.keys(katalogIds).forEach(id => {
        if (ssotIds[id]) {
            const ssotLabel = normalizeLabel(ssotIds[id].label);
            const katalogLabel = normalizeLabel(katalogIds[id].label);

            if (ssotLabel !== katalogLabel) {
                warnings.push(`${id}: Label unterschiedlich - SSOT: "${ssotIds[id].label}" vs Katalog: "${katalogIds[id].label}"`);
            }
        }
    });

    // Ausgabe
    console.log('');

    if (errors.length > 0) {
        log(RED, `❌ ${errors.length} FEHLER gefunden:`);
        errors.forEach(e => log(RED, `   • ${e}`));
        console.log('');
    }

    if (warnings.length > 0) {
        log(YELLOW, `⚠️  ${warnings.length} Warnungen:`);
        warnings.forEach(w => log(YELLOW, `   • ${w}`));
        console.log('');
    }

    if (errors.length === 0 && warnings.length === 0) {
        log(GREEN, '✅ Alle Prüfungen bestanden! Keine Inkonsistenzen gefunden.');
    } else if (errors.length === 0) {
        log(GREEN, '✅ Keine kritischen Fehler. Warnungen können optional behoben werden.');
    }

    // Exit-Code
    if (errors.length > 0) {
        process.exit(1);
    }

    process.exit(0);
}

// Run
validate();
