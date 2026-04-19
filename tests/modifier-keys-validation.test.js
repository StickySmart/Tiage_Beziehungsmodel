/**
 * MODIFIER DELTA-KEY VALIDIERUNG
 *
 * Prüft ob alle Delta-Keys in FFH- und Orientierungs-Modifiern
 * gültige BeduerfnisIds-Keys sind und ob sie R-Faktor-Needs treffen.
 *
 * Ausführung: node tests/modifier-keys-validation.test.js
 */

var BeduerfnisIds = require('../profiles/definitions/beduerfnis-katalog.js');

// Modifier laden
var horny = require('../profiles/modifiers/ffh/horny.js');
var fit = require('../profiles/modifiers/ffh/fit.js');
var fuckedup = require('../profiles/modifiers/ffh/fuckedup.js');
var fresh = require('../profiles/modifiers/ffh/fresh.js');
var hetero = require('../profiles/modifiers/orientierung/heterosexuell.js');
var homo = require('../profiles/modifiers/orientierung/homosexuell.js');
var bi = require('../profiles/modifiers/orientierung/bisexuell.js');
var pan = require('../profiles/modifiers/orientierung/pansexuell.js');
var queer = require('../profiles/modifiers/orientierung/queer.js');

// R-Faktor Needs aus Katalog sammeln
var rNeeds = { R1: [], R2: [], R3: [], R4: [] };

// Lade Katalog direkt aus JSON
var katalogJson = require('../profiles/data/beduerfnis-katalog.json');
if (katalogJson && katalogJson.beduerfnisse) {
    var beduerfnisse = katalogJson.beduerfnisse;
    Object.keys(beduerfnisse).forEach(function(id) {
        if (id.startsWith('_')) return;
        var b = beduerfnisse[id];
        if (b.kohaerenz && b.kohaerenz.rFaktor) {
            var rf = b.kohaerenz.rFaktor;
            var key = b.label ? b.label.toLowerCase()
                .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
                .replace(/[^a-z0-9]+/g, '_').replace(/^_|_$/g, '') : id;
            // Hole den key aus BeduerfnisIds statt selbst zu berechnen
            var bidKey = BeduerfnisIds.beduerfnisse[id] ? BeduerfnisIds.beduerfnisse[id].key : key;
            if (Array.isArray(rf)) {
                rf.forEach(function(r) { if (rNeeds[r]) rNeeds[r].push(bidKey); });
            } else {
                if (rNeeds[rf]) rNeeds[rf].push(bidKey);
            }
        }
    });
}

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log('  MODIFIER DELTA-KEY VALIDIERUNG');
console.log('═══════════════════════════════════════════════════════════════════\n');

console.log('R-Faktor Needs im Katalog:');
console.log('  R1 (Leben):       ' + rNeeds.R1.length + ' Needs - ' + rNeeds.R1.join(', '));
console.log('  R2 (Philosophie):  ' + rNeeds.R2.length + ' Needs - ' + rNeeds.R2.join(', '));
console.log('  R3 (Dynamik):      ' + rNeeds.R3.length + ' Needs - ' + rNeeds.R3.join(', '));
console.log('  R4 (Identität):    ' + rNeeds.R4.length + ' Needs - ' + rNeeds.R4.join(', '));
console.log('');

var modifiers = [
    { name: 'FFH Horny', mod: horny },
    { name: 'FFH Fit', mod: fit },
    { name: 'FFH Fuckedup', mod: fuckedup },
    { name: 'FFH Fresh', mod: fresh },
    { name: 'Orientierung Hetero', mod: hetero },
    { name: 'Orientierung Homo', mod: homo },
    { name: 'Orientierung Bi', mod: bi },
    { name: 'Orientierung Pan', mod: pan },
    { name: 'Orientierung Queer', mod: queer }
];

var totalOk = 0;
var totalFail = 0;
var totalR = 0;
var allPassed = true;

modifiers.forEach(function(entry) {
    var name = entry.name;
    var mod = entry.mod;
    if (!mod || !mod.deltas) {
        console.log('  SKIP ' + name + ' (keine deltas)');
        return;
    }

    var ok = 0, fail = 0, rHits = 0;
    var failKeys = [];
    var rHitDetails = [];

    var keys = Object.keys(mod.deltas);
    keys.forEach(function(key) {
        var id = BeduerfnisIds.toId(key);
        if (id && id !== key) {
            ok++;
            // Check R-Faktor hit
            ['R1', 'R2', 'R3', 'R4'].forEach(function(r) {
                if (rNeeds[r].indexOf(key) >= 0) {
                    rHits++;
                    rHitDetails.push(key + ' → ' + r + ' (' + id + ')');
                }
            });
        } else {
            fail++;
            failKeys.push(key);
        }
    });

    var icon = fail === 0 ? '✅' : '❌';
    console.log('  ' + icon + ' ' + name + ': ' + ok + '/' + keys.length + ' keys valid, ' + rHits + ' R-Faktor-Treffer');

    if (failKeys.length > 0) {
        console.log('     UNGÜLTIG: ' + failKeys.join(', '));
        allPassed = false;
    }
    if (rHitDetails.length > 0) {
        console.log('     R-TREFFER: ' + rHitDetails.join(', '));
    }

    totalOk += ok;
    totalFail += fail;
    totalR += rHits;
});

console.log('\n───────────────────────────────────────────────────────────────────');
console.log('  Gesamt: ' + totalOk + ' gültig, ' + totalFail + ' ungültig, ' + totalR + ' R-Faktor-Treffer');
if (allPassed) {
    console.log('  ✅ ALLE MODIFIER-KEYS SIND GÜLTIG!');
} else {
    console.log('  ❌ Es gibt ungültige Keys - diese werden als "Delta-Key nicht in Basis-Profil" ignoriert');
}
console.log('───────────────────────────────────────────────────────────────────\n');

process.exit(allPassed ? 0 : 1);
