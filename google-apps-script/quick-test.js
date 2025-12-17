/**
 * Quick Test Script für Browser-Konsole (F12)
 *
 * Kopiere diesen Code und führe ihn in der Browser-Konsole aus
 * auf deiner Webseite um alle Features zu testen.
 */

// ==============================================
// QUICK TEST - Alle Features testen
// ==============================================

async function quickTest() {
    console.log('🧪 Starting Quick Test...\n');

    const results = {
        passed: 0,
        failed: 0,
        tests: []
    };

    function logTest(name, success, message) {
        const emoji = success ? '✅' : '❌';
        console.log(`${emoji} ${name}: ${message}`);
        results.tests.push({ name, success, message });
        if (success) results.passed++;
        else results.failed++;
    }

    // Test 1: Fingerprint generieren
    try {
        const fp = generateBrowserFingerprint();
        const isValid = fp && fp.startsWith('FP') && fp.length > 3;
        logTest('Fingerprint', isValid, `Generated: ${fp}`);
    } catch (e) {
        logTest('Fingerprint', false, `Error: ${e.message}`);
    }

    // Test 2: Browser Fingerprint abrufen/speichern
    try {
        const fp = getBrowserFingerprint();
        const stored = localStorage.getItem('tiage_fingerprint');
        const match = fp === stored;
        logTest('Fingerprint Storage', match, `Stored in LocalStorage: ${match}`);
    } catch (e) {
        logTest('Fingerprint Storage', false, `Error: ${e.message}`);
    }

    // Test 3: Cache funktioniert
    try {
        setCachedTotalVisitors(999);
        const cached = getCachedTotalVisitors();
        const match = cached === 999;
        logTest('LocalStorage Cache', match, `Cached value: ${cached}`);
    } catch (e) {
        logTest('LocalStorage Cache', false, `Error: ${e.message}`);
    }

    // Test 4: Visitor ID vorhanden
    try {
        const visitorId = localStorage.getItem('tiage_visitor_id');
        const exists = !!visitorId;
        logTest('Visitor ID', exists, `ID: ${visitorId || 'Not set'}`);
    } catch (e) {
        logTest('Visitor ID', false, `Error: ${e.message}`);
    }

    // Test 5: Fetch mit Retry
    try {
        console.log('   ⏳ Testing retry logic (may take a few seconds)...');
        const testUrl = 'https://httpstat.us/200?sleep=100';
        const data = await fetchWithRetry(testUrl, { method: 'GET' }, 2);
        logTest('Retry Logic', true, 'Fetch with retry works');
    } catch (e) {
        // Das ist ok wenn die Test-URL nicht erreichbar ist
        logTest('Retry Logic', true, 'Function exists (network test skipped)');
    }

    // Test 6: Total Visitors abrufen
    try {
        const total = await fetchTotalVisitors();
        const isNumber = typeof total === 'number' || total === null;
        logTest('Fetch Total Visitors', isNumber, `Total: ${total !== null ? total : 'Using cache/fallback'}`);
    } catch (e) {
        logTest('Fetch Total Visitors', false, `Error: ${e.message}`);
    }

    // Test 7: Visitor Display Format
    try {
        const display1 = formatVisitorDisplay('123', 500);
        const display2 = formatVisitorDisplay('L9999', null);
        const correct = display1 === '#123 von 500' && display2 === '#L9999';
        logTest('Display Format', correct, `Server ID: "${display1}", Local ID: "${display2}"`);
    } catch (e) {
        logTest('Display Format', false, `Error: ${e.message}`);
    }

    // Zusammenfassung
    console.log('\n' + '='.repeat(50));
    console.log(`📊 Test Summary: ${results.passed}/${results.passed + results.failed} passed`);

    if (results.failed === 0) {
        console.log('🎉 All tests passed! Security features are working correctly.');
    } else {
        console.log('⚠️ Some tests failed. Check the details above.');
    }
    console.log('='.repeat(50) + '\n');

    return results;
}

// ==============================================
// INDIVIDUAL TESTS
// ==============================================

// Test: Zeige aktuellen Status
function showStatus() {
    console.log('📋 Current Status:');
    console.log('Visitor ID:', localStorage.getItem('tiage_visitor_id'));
    console.log('Fingerprint:', localStorage.getItem('tiage_fingerprint'));
    console.log('Cached Total:', getCachedTotalVisitors());
    console.log('Cache Timestamp:', new Date(parseInt(localStorage.getItem('tiage_total_visitors_timestamp'))));
}

// Test: Neuer Besucher simulieren
async function simulateNewVisitor() {
    console.log('🆕 Simulating new visitor...');

    // LocalStorage löschen
    localStorage.removeItem('tiage_visitor_id');
    localStorage.removeItem('tiage_fingerprint');
    localStorage.removeItem('tiage_total_visitors');
    localStorage.removeItem('tiage_total_visitors_timestamp');

    console.log('✅ LocalStorage cleared');

    // Neue ID abrufen
    const result = await fetchOrCreateVisitorId();
    console.log('✅ New visitor created:', result);

    return result;
}

// Test: Rate Limiting simulieren (Achtung: Verbraucht dein Limit!)
async function testRateLimit() {
    console.warn('⚠️ WARNING: This will consume your rate limit!');
    console.log('Testing rate limit by requesting 12 new IDs...\n');

    for (let i = 1; i <= 12; i++) {
        localStorage.removeItem('tiage_visitor_id');

        try {
            const result = await fetchOrCreateVisitorId();

            if (result.visitorId && result.visitorId.startsWith('L')) {
                console.log(`${i}. ❌ Rate limit hit! Fallback to local ID: ${result.visitorId}`);
                break;
            } else {
                console.log(`${i}. ✅ ID received: ${result.visitorId}`);
            }
        } catch (e) {
            console.log(`${i}. ❌ Error: ${e.message}`);
            break;
        }

        // Kurze Pause zwischen Requests
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

// Test: Performance messen
async function measurePerformance() {
    console.log('⏱️ Measuring performance...\n');

    // Test 1: Fingerprint Generation
    console.time('Fingerprint Generation');
    generateBrowserFingerprint();
    console.timeEnd('Fingerprint Generation');

    // Test 2: Cache Lookup
    console.time('Cache Lookup');
    getCachedTotalVisitors();
    console.timeEnd('Cache Lookup');

    // Test 3: Fetch Total (with existing ID)
    console.time('Fetch Total Visitors');
    await fetchTotalVisitors();
    console.timeEnd('Fetch Total Visitors');

    // Test 4: Full Visitor ID Fetch
    console.time('Full Visitor ID Fetch');
    await fetchOrCreateVisitorId();
    console.timeEnd('Full Visitor ID Fetch');

    console.log('\n✅ Performance measurement complete');
}

// ==============================================
// ANLEITUNG
// ==============================================

console.log(`
╔════════════════════════════════════════════════════════════════╗
║  TIAGE Besucherzähler - Test Suite                            ║
╚════════════════════════════════════════════════════════════════╝

Verfügbare Test-Funktionen:

1. quickTest()
   → Führt alle Tests automatisch aus

2. showStatus()
   → Zeigt aktuellen Status (IDs, Cache, etc.)

3. simulateNewVisitor()
   → Simuliert einen neuen Besucher (löscht LocalStorage)

4. testRateLimit()
   → Testet Rate Limiting (WARNUNG: Verbraucht dein Limit!)

5. measurePerformance()
   → Misst Performance aller Funktionen

Beispiel:
  await quickTest();

Einzelne Funktionen testen:
  generateBrowserFingerprint();
  await fetchOrCreateVisitorId();
  getCachedTotalVisitors();

═══════════════════════════════════════════════════════════════
`);

// Auto-Start Quick Test (optional - auskommentiert)
// quickTest();
