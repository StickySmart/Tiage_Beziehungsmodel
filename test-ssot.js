/**
 * SSOT-System Test
 * Verifiziert dass help-texts.js wirklich aus constants.js liest
 */

// Setup global scope für Browser-Code
global.TiageSynthesis = {};
global.TiageHelpTexts = {};

// Load beide Dateien
require('./js/synthesis/constants.js');
require('./js/help-texts.js');

console.log('═══════════════════════════════════════════════════════════');
console.log('SSOT-SYSTEM TEST');
console.log('═══════════════════════════════════════════════════════════\n');

// Test 1: Prüfe ob constants.js geladen ist
console.log('✓ Test 1: TiageSynthesis.Constants geladen?');
if (typeof TiageSynthesis !== 'undefined' && TiageSynthesis.Constants) {
    console.log('  ✓ JA - TiageSynthesis.Constants existiert\n');
} else {
    console.error('  ✗ FEHLER - TiageSynthesis.Constants nicht gefunden!\n');
    process.exit(1);
}

// Test 2: Prüfe ob FORMULAS-Sektion existiert
console.log('✓ Test 2: TiageSynthesis.Constants.FORMULAS existiert?');
if (TiageSynthesis.Constants.FORMULAS) {
    console.log('  ✓ JA - FORMULAS-Sektion existiert\n');
} else {
    console.error('  ✗ FEHLER - FORMULAS-Sektion nicht gefunden!\n');
    process.exit(1);
}

// Test 3: Prüfe Hauptformel in constants.js
console.log('✓ Test 3: Hauptformel in constants.js:');
const constantsMainFormula = TiageSynthesis.Constants.FORMULAS.main;
console.log('  Text:', constantsMainFormula.text);
console.log('  HTML:', constantsMainFormula.html);
console.log('  Version:', constantsMainFormula.version);
console.log('');

// Test 4: Prüfe ob help-texts.js die Formel liest
console.log('✓ Test 4: help-texts.js liest aus constants.js?');
const helpTextsMainFormula = TiageHelpTexts.getMainFormula();
console.log('  Text:', helpTextsMainFormula.text);
console.log('  HTML:', helpTextsMainFormula.html);
console.log('');

// Test 5: Vergleiche - sind sie identisch?
console.log('✓ Test 5: Sind die Formeln identisch (SSOT erfüllt)?');
if (constantsMainFormula.text === helpTextsMainFormula.text &&
    constantsMainFormula.html === helpTextsMainFormula.html) {
    console.log('  ✓ JA - help-texts.js liest WIRKLICH aus constants.js!\n');
} else {
    console.error('  ✗ FEHLER - Formeln sind unterschiedlich!\n');
    console.error('  constants.js:', constantsMainFormula.text);
    console.error('  help-texts.js:', helpTextsMainFormula.text);
    process.exit(1);
}

// Test 6: R-Faktor Formel
console.log('✓ Test 6: R-Faktor Formel:');
const rFactorFormula = TiageHelpTexts.getRFactorFormula();
console.log('  Text:', rFactorFormula.text);
console.log('  Range:', rFactorFormula.range.min, '-', rFactorFormula.range.max);
console.log('  Threshold Resonanz:', rFactorFormula.interpretation.strong.threshold);
console.log('  Threshold Dissonanz:', rFactorFormula.interpretation.weak.threshold);
console.log('');

// Test 7: Vergleiche R-Faktor mit constants
console.log('✓ Test 7: R-Faktor aus constants.js?');
const constantsRFactor = TiageSynthesis.Constants.FORMULAS.r_factor;
if (constantsRFactor.text === rFactorFormula.text &&
    constantsRFactor.params.min === rFactorFormula.range.min &&
    constantsRFactor.params.max === rFactorFormula.range.max) {
    console.log('  ✓ JA - R-Faktor wird korrekt aus constants.js gelesen!\n');
} else {
    console.error('  ✗ FEHLER - R-Faktor Werte stimmen nicht überein!\n');
    process.exit(1);
}

// Test 8: Bedürfnis-Matching Formeln
console.log('✓ Test 8: Bedürfnis-Matching Formeln:');
const needsFormulas = TiageHelpTexts.getNeedsMatchingFormula();
console.log('  Similarity:', needsFormulas.similarity);
console.log('  Weight:', needsFormulas.weight);
console.log('  Contribution:', needsFormulas.contribution);
console.log('  Total:', needsFormulas.total);
console.log('');

// Test 9: Vergleiche mit constants
console.log('✓ Test 9: Needs-Formeln aus constants.js?');
const constantsNeeds = TiageSynthesis.Constants.FORMULAS.needs_matching;
if (constantsNeeds.similarity.text === needsFormulas.similarity &&
    constantsNeeds.weight.text === needsFormulas.weight) {
    console.log('  ✓ JA - Needs-Formeln werden korrekt aus constants.js gelesen!\n');
} else {
    console.error('  ✗ FEHLER - Needs-Formeln stimmen nicht überein!\n');
    process.exit(1);
}

console.log('═══════════════════════════════════════════════════════════');
console.log('✓✓✓ ALLE TESTS ERFOLGREICH - SSOT FUNKTIONIERT! ✓✓✓');
console.log('═══════════════════════════════════════════════════════════');
console.log('\nZusammenfassung:');
console.log('- constants.js enthält FORMULAS-Sektion mit allen Formeln');
console.log('- help-texts.js liest WIRKLICH aus constants.js (kein Hardcoding!)');
console.log('- Änderungen müssen nur noch in constants.js gemacht werden');
console.log('- SSOT-Prinzip ist erfüllt ✓\n');
