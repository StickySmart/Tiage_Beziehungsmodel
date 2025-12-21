/**
 * SSOT-Validierungs-Tests
 *
 * Prüft die Konsistenz zwischen:
 * - beduerfnis-katalog.js (Wrapper für beduerfnis-katalog.json)
 * - taxonomie.js (SSOT für Kategorien #K1-#K18)
 *
 * Ausführung: node tests/ssot-validation.test.js
 */

// Load modules
var TiageTaxonomie = require('../profiles/definitions/taxonomie.js');
var BeduerfnisIds = require('../profiles/definitions/beduerfnis-katalog.js');

// Simple test framework
var tests = [];
var passed = 0;
var failed = 0;

function test(name, fn) {
    tests.push({ name: name, fn: fn });
}

function assertEqual(actual, expected, msg) {
    if (actual !== expected) {
        throw new Error(msg + ': Expected ' + expected + ', got ' + actual);
    }
}

function assertTrue(condition, msg) {
    if (!condition) {
        throw new Error(msg);
    }
}

// ═══════════════════════════════════════════════════════════════════
// SSOT TESTS
// ═══════════════════════════════════════════════════════════════════

test('TiageTaxonomie lädt korrekt', function() {
    assertTrue(TiageTaxonomie !== undefined, 'TiageTaxonomie sollte geladen sein');
    assertTrue(TiageTaxonomie.kategorien !== undefined, 'kategorien sollte existieren');
    assertEqual(Object.keys(TiageTaxonomie.kategorien).length, 18, 'Es sollten 18 Kategorien existieren');
});

test('BeduerfnisIds lädt korrekt', function() {
    assertTrue(BeduerfnisIds !== undefined, 'BeduerfnisIds sollte geladen sein');
    assertTrue(BeduerfnisIds.beduerfnisse !== undefined, 'beduerfnisse sollte existieren');
    var count = Object.keys(BeduerfnisIds.beduerfnisse).length;
    assertTrue(count >= 200, 'Es sollten mindestens 200 Bedürfnisse existieren (gefunden: ' + count + ')');
});

test('Alle Kategorien in Taxonomie haben korrektes Format (#K1-#K18)', function() {
    for (var id in TiageTaxonomie.kategorien) {
        assertTrue(id.match(/^#K\d+$/), 'Kategorie-ID sollte Format #K[n] haben: ' + id);
        var kat = TiageTaxonomie.kategorien[id];
        assertTrue(kat.key !== undefined, 'Kategorie ' + id + ' sollte einen key haben');
        assertTrue(kat.label !== undefined, 'Kategorie ' + id + ' sollte ein label haben');
        assertTrue(kat.dimension !== undefined, 'Kategorie ' + id + ' sollte eine dimension haben');
    }
});

test('SSOT-Validierung: Alle Bedürfnis-Kategorien existieren in Taxonomie', function() {
    var result = BeduerfnisIds.validateKategorien({ logWarnings: false });

    if (!result.valid) {
        throw new Error('SSOT-Validierung fehlgeschlagen:\n  ' + result.errors.join('\n  '));
    }

    assertTrue(result.valid, 'Validierung sollte erfolgreich sein');
    assertTrue(result.errors.length === 0, 'Es sollten keine Fehler vorhanden sein');
});

test('Kategorie-Mapping: Freiheit (#K5) hat korrekte Bedürfnisse', function() {
    // Diese Bedürfnisse sollten zu #K5 (Freiheit) gehören
    var freiheitNeeds = ['#B34', '#B35', '#B36', '#B37', '#B38'];

    freiheitNeeds.forEach(function(needId) {
        var need = BeduerfnisIds.beduerfnisse[needId];
        assertTrue(need !== undefined, needId + ' sollte existieren');
        assertEqual(need.kategorie, '#K5', needId + ' (' + need.label + ') sollte Kategorie #K5 (Freiheit) haben');
    });
});

test('Kategorie-Mapping: Teilnahme (#K6) hat korrekte Bedürfnisse', function() {
    // Diese Bedürfnisse sollten zu #K6 (Teilnahme) gehören
    var teilnahmeNeeds = ['#B39', '#B40', '#B41', '#B42', '#B43', '#B44', '#B45'];

    teilnahmeNeeds.forEach(function(needId) {
        var need = BeduerfnisIds.beduerfnisse[needId];
        assertTrue(need !== undefined, needId + ' sollte existieren');
        assertEqual(need.kategorie, '#K6', needId + ' (' + need.label + ') sollte Kategorie #K6 (Teilnahme) haben');
    });
});

test('Kategorie-Mapping: Muße (#K7) hat korrekte Bedürfnisse', function() {
    // Diese Bedürfnisse sollten zu #K7 (Muße) gehören
    var musseNeeds = ['#B46', '#B47', '#B48', '#B49'];

    musseNeeds.forEach(function(needId) {
        var need = BeduerfnisIds.beduerfnisse[needId];
        assertTrue(need !== undefined, needId + ' sollte existieren');
        assertEqual(need.kategorie, '#K7', needId + ' (' + need.label + ') sollte Kategorie #K7 (Muße) haben');
    });
});

test('Kategorie-Mapping: Identität (#K8) hat korrekte Bedürfnisse', function() {
    // Diese Bedürfnisse sollten zu #K8 (Identität) gehören
    var identitaetNeeds = ['#B50', '#B51', '#B52', '#B53', '#B54', '#B55'];

    identitaetNeeds.forEach(function(needId) {
        var need = BeduerfnisIds.beduerfnisse[needId];
        assertTrue(need !== undefined, needId + ' sollte existieren');
        assertEqual(need.kategorie, '#K8', needId + ' (' + need.label + ') sollte Kategorie #K8 (Identität) haben');
    });
});

test('Alle 18 Kategorien werden von mindestens einem Bedürfnis verwendet (Warnung bei fehlenden)', function() {
    var result = BeduerfnisIds.validateKategorien({ logWarnings: false });
    var usedKategorien = Object.keys(result.kategorienFound);
    var unusedKategorien = [];

    // Sammle ungenutzte Kategorien
    for (var katId in TiageTaxonomie.kategorien) {
        if (usedKategorien.indexOf(katId) === -1) {
            unusedKategorien.push(katId + ' (' + TiageTaxonomie.kategorien[katId].label + ')');
        }
    }

    // Warnung ausgeben, aber Test nicht fehlschlagen lassen
    if (unusedKategorien.length > 0) {
        console.log('     ⚠️  Ungenutzte Kategorien: ' + unusedKategorien.join(', '));
    }

    // Test besteht, wenn keine kritischen Fehler (z.B. ungültige Kategorien)
    assertTrue(result.valid, 'SSOT-Validierung sollte keine ungültigen Kategorien enthalten');
});

// ═══════════════════════════════════════════════════════════════════
// TEST RUNNER
// ═══════════════════════════════════════════════════════════════════

console.log('\n═══════════════════════════════════════════════════════════════════');
console.log('  SSOT-VALIDIERUNGS-TESTS');
console.log('═══════════════════════════════════════════════════════════════════\n');

tests.forEach(function(t) {
    try {
        t.fn();
        passed++;
        console.log('  ✅ ' + t.name);
    } catch (e) {
        failed++;
        console.log('  ❌ ' + t.name);
        console.log('     → ' + e.message);
    }
});

console.log('\n───────────────────────────────────────────────────────────────────');
console.log('  Ergebnis: ' + passed + ' bestanden, ' + failed + ' fehlgeschlagen');
console.log('───────────────────────────────────────────────────────────────────\n');

// Exit mit Fehlercode wenn Tests fehlschlagen
if (failed > 0) {
    process.exit(1);
}
