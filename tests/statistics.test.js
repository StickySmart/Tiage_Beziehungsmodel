/**
 * Tests für TiageStatistics
 *
 * Ausführung: node tests/statistics.test.js
 */

// Mock GfkBeduerfnisse für Tests
global.GfkBeduerfnisse = {
    kategorien: {
        sicherheit: { name: "Sicherheit", sigma: 11, beduerfnisse: ["geborgenheit", "schutz"] },
        zuneigung: { name: "Zuneigung", sigma: 12, beduerfnisse: ["naehe", "liebe"] },
        dynamik: { name: "Dynamik", sigma: 17, beduerfnisse: ["kontrolle_ausueben", "hingabe"] }
    }
};

// Load the module
var TiageStatistics = require('../js/utils/statistics.js');

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

function assertClose(actual, expected, tolerance, msg) {
    if (Math.abs(actual - expected) > tolerance) {
        throw new Error(msg + ': Expected ~' + expected + ', got ' + actual);
    }
}

// ═══════════════════════════════════════════════════════════════════
// TESTS
// ═══════════════════════════════════════════════════════════════════

test('Z_VALUES enthält die korrekten z-Werte', function() {
    assertEqual(TiageStatistics.Z_VALUES[80], 1.28, 'z für 80%');
    assertEqual(TiageStatistics.Z_VALUES[95], 1.96, 'z für 95%');
    assertEqual(TiageStatistics.Z_VALUES[99], 2.576, 'z für 99%');
});

test('calculateConfidenceInterval berechnet korrekt für μ=75, σ=12', function() {
    var result = TiageStatistics.calculateConfidenceInterval(75, 12, 80);

    assertEqual(result.mu, 75, 'mu');
    assertEqual(result.sigma, 12, 'sigma');
    assertEqual(result.confidence, 80, 'confidence');
    assertClose(result.margin, 15.4, 0.1, 'margin (1.28 * 12)');
    assertClose(result.lower, 59.6, 0.1, 'lower bound');
    assertClose(result.upper, 90.4, 0.1, 'upper bound');
});

test('calculateConfidenceInterval clippt bei 0 und 100', function() {
    // Hoher μ → upper clippt bei 100
    var high = TiageStatistics.calculateConfidenceInterval(95, 12, 80);
    assertEqual(high.upper, 100, 'upper clipped at 100');

    // Niedriger μ → lower clippt bei 0
    var low = TiageStatistics.calculateConfidenceInterval(5, 12, 80);
    assertEqual(low.lower, 0, 'lower clipped at 0');
});

test('getSigmaForKategorie gibt korrekten σ-Wert zurück', function() {
    var sigma = TiageStatistics.getSigmaForKategorie('sicherheit');
    assertEqual(sigma, 11, 'σ für Sicherheit');

    var sigma2 = TiageStatistics.getSigmaForKategorie('dynamik');
    assertEqual(sigma2, 17, 'σ für Dynamik');
});

test('getSigmaForKategorie gibt DEFAULT_SIGMA für unbekannte Kategorie', function() {
    var sigma = TiageStatistics.getSigmaForKategorie('unbekannt');
    assertEqual(sigma, TiageStatistics.DEFAULT_SIGMA, 'Default σ');
});

test('findKategorieForBeduerfnis findet korrekte Kategorie', function() {
    var kat = TiageStatistics.findKategorieForBeduerfnis('naehe');
    assertEqual(kat.key, 'zuneigung', 'Kategorie-Key');
    assertEqual(kat.sigma, 12, 'Kategorie-Sigma');
});

test('findKategorieForBeduerfnis gibt null für unbekanntes Bedürfnis', function() {
    var kat = TiageStatistics.findKategorieForBeduerfnis('unbekannt');
    assertEqual(kat, null, 'null für unbekanntes Bedürfnis');
});

test('calculateScoreUncertainty berechnet kombinierte Unsicherheit', function() {
    var kategorien = [
        { sigma: 11 },
        { sigma: 12 },
        { sigma: 17 }
    ];
    var result = TiageStatistics.calculateScoreUncertainty(78, kategorien, 80);

    assertEqual(result.score, 78, 'score');
    assertEqual(result.confidence, 80, 'confidence');
    // Durchschnittliche Varianz: (11² + 12² + 17²) / 3 = (121 + 144 + 289) / 3 = 184.67
    // σ_combined = sqrt(184.67) ≈ 13.6
    // margin = 1.28 * 13.6 ≈ 17.4
    assertClose(result.sigma, 13.6, 0.5, 'combined sigma');
    assertClose(result.margin, 17.4, 1, 'margin');
});

test('formatScoreWithUncertainty formatiert korrekt', function() {
    var formatted = TiageStatistics.formatScoreWithUncertainty(78, 12.5);
    assertEqual(formatted, '78% ± 13', 'formatiert mit Rundung');
});

test('formatInterval formatiert korrekt', function() {
    var interval = { lower: 65.4, upper: 90.6 };
    var formatted = TiageStatistics.formatInterval(interval);
    assertEqual(formatted, '[65, 91]', 'formatiert mit Rundung');
});

// ═══════════════════════════════════════════════════════════════════
// RUN TESTS
// ═══════════════════════════════════════════════════════════════════

console.log('\n=== TiageStatistics Tests ===\n');

for (var i = 0; i < tests.length; i++) {
    try {
        tests[i].fn();
        console.log('✓ ' + tests[i].name);
        passed++;
    } catch (e) {
        console.log('✗ ' + tests[i].name);
        console.log('  Error: ' + e.message);
        failed++;
    }
}

console.log('\n---');
console.log('Passed: ' + passed + '/' + tests.length);
console.log('Failed: ' + failed + '/' + tests.length);
console.log('');

if (failed > 0) {
    process.exit(1);
}
