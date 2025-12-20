/**
 * SSOT-Vergleichsskript
 * Vergleicht beduerfnis-katalog.json (SSOT) mit beduerfnis-ids.js
 */

const katalog = require('../profiles/data/beduerfnis-katalog.json');
const ids = require('../profiles/definitions/beduerfnis-ids.js');

// Extrahiere Bedürfnisse aus katalog.beduerfnisse
const katalogNeeds = katalog.beduerfnisse || {};
console.log('Anzahl Bedürfnisse in katalog.json:', Object.keys(katalogNeeds).length);
console.log('Anzahl Bedürfnisse in ids.js:', Object.keys(ids.beduerfnisse).length);

// Vergleiche
const conflicts = [];
const missingInIds = [];
const extraInIds = [];

for (const id in katalogNeeds) {
    if (!id.startsWith('#B')) continue;

    const kat = katalogNeeds[id];
    const idsNeed = ids.beduerfnisse[id];

    if (!idsNeed) {
        missingInIds.push({ id, label: kat.label, kategorie: kat.kategorie });
    } else if (idsNeed.kategorie !== kat.kategorie) {
        conflicts.push({
            id: id,
            katalogLabel: kat.label,
            katalogKat: kat.kategorie,
            idsLabel: idsNeed.label,
            idsKat: idsNeed.kategorie
        });
    }
}

for (const id in ids.beduerfnisse) {
    if (!katalogNeeds[id]) {
        extraInIds.push({ id, label: ids.beduerfnisse[id].label, kategorie: ids.beduerfnisse[id].kategorie });
    }
}

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log('  SSOT-VERGLEICH: beduerfnis-katalog.json vs beduerfnis-ids.js');
console.log('═══════════════════════════════════════════════════════════════════');

console.log('\n=== KONFLIKTE (gleiche ID, unterschiedliche Kategorien) ===');
console.log('Total:', conflicts.length);
conflicts.forEach(c => {
    console.log('  ' + c.id + ':');
    console.log('    katalog: "' + c.katalogLabel + '" (' + c.katalogKat + ')');
    console.log('    ids.js:  "' + c.idsLabel + '" (' + c.idsKat + ')');
});

console.log('\n=== FEHLEND in ids.js (existiert in katalog) ===');
console.log('Total:', missingInIds.length);
missingInIds.forEach(m => console.log('  ' + m.id + ': ' + m.label + ' (' + m.kategorie + ')'));

console.log('\n=== EXTRA in ids.js (nicht in katalog) ===');
console.log('Total:', extraInIds.length);
extraInIds.slice(0, 20).forEach(e => console.log('  ' + e.id + ': ' + e.label + ' (' + e.kategorie + ')'));
if (extraInIds.length > 20) console.log('  ... und ' + (extraInIds.length - 20) + ' weitere');

console.log('\n───────────────────────────────────────────────────────────────────');
