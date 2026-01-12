/**
 * SSOT Vergleichstest - Client vs Server
 *
 * Testet verschiedene Profil-Kombinationen und vergleicht die Ergebnisse.
 * Ausführen: node test-ssot-comparison.js
 */

const http = require('http');

// Test-Profile
const testCases = [
    {
        name: 'Polyamor + Polyamor (komplementär)',
        ich: {
            archetyp: 'polyamor',
            geschlecht: { primary: 'mann', secondary: 'cis' },
            dominanz: { primary: 'dominant', secondary: null },
            orientierung: { primary: 'heterosexuell', secondary: null },
            needs: {}
        },
        partner: {
            archetyp: 'polyamor',
            geschlecht: { primary: 'frau', secondary: 'cis' },
            dominanz: { primary: 'submissiv', secondary: null },
            orientierung: { primary: 'heterosexuell', secondary: null },
            needs: {}
        }
    },
    {
        name: 'Duo + Duo (gleiche Dominanz)',
        ich: {
            archetyp: 'duo',
            geschlecht: { primary: 'mann', secondary: 'cis' },
            dominanz: { primary: 'dominant', secondary: null },
            orientierung: { primary: 'heterosexuell', secondary: null },
            needs: {}
        },
        partner: {
            archetyp: 'duo',
            geschlecht: { primary: 'frau', secondary: 'cis' },
            dominanz: { primary: 'dominant', secondary: null },
            orientierung: { primary: 'heterosexuell', secondary: null },
            needs: {}
        }
    },
    {
        name: 'Single + Polyamor (unterschiedlich)',
        ich: {
            archetyp: 'single',
            geschlecht: { primary: 'mann', secondary: 'cis' },
            dominanz: { primary: 'ausgeglichen', secondary: null },
            orientierung: { primary: 'bisexuell', secondary: null },
            needs: {}
        },
        partner: {
            archetyp: 'polyamor',
            geschlecht: { primary: 'frau', secondary: 'nonbinaer' },
            dominanz: { primary: 'switch', secondary: null },
            orientierung: { primary: 'bisexuell', secondary: null },
            needs: {}
        }
    },
    {
        name: 'RA + LAT (Switch + Switch)',
        ich: {
            archetyp: 'ra',
            geschlecht: { primary: 'inter', secondary: 'fluid' },
            dominanz: { primary: 'switch', secondary: null },
            orientierung: { primary: 'pansexuell', secondary: null },
            needs: {}
        },
        partner: {
            archetyp: 'lat',
            geschlecht: { primary: 'frau', secondary: 'trans' },
            dominanz: { primary: 'switch', secondary: null },
            orientierung: { primary: 'bisexuell', secondary: null },
            needs: {}
        }
    },
    {
        name: 'Aromantisch + Duo-Flex',
        ich: {
            archetyp: 'aromantisch',
            geschlecht: { primary: 'mann', secondary: 'cis' },
            dominanz: { primary: 'submissiv', secondary: null },
            orientierung: { primary: 'homosexuell', secondary: null },
            needs: {}
        },
        partner: {
            archetyp: 'duo_flex',
            geschlecht: { primary: 'mann', secondary: 'cis' },
            dominanz: { primary: 'dominant', secondary: null },
            orientierung: { primary: 'homosexuell', secondary: null },
            needs: {}
        }
    }
];

// Server-Request
function callServer(testCase) {
    return new Promise((resolve, reject) => {
        const data = JSON.stringify({
            ich: testCase.ich,
            partner: testCase.partner,
            options: {}
        });

        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/api/calculate/synthesis',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const json = JSON.parse(body);
                    resolve(json.result || json);
                } catch (e) {
                    reject(e);
                }
            });
        });

        req.on('error', reject);
        req.write(data);
        req.end();
    });
}

// Haupt-Test
async function runTests() {
    console.log('═══════════════════════════════════════════════════════════════');
    console.log('  SSOT VERGLEICHSTEST - SERVER-ERGEBNISSE');
    console.log('═══════════════════════════════════════════════════════════════\n');

    for (const testCase of testCases) {
        try {
            const result = await callServer(testCase);

            console.log(`📊 ${testCase.name}`);
            console.log('─────────────────────────────────────────────────────');
            console.log(`   Score:     ${result.score}`);
            console.log(`   R1 Leben:      ${result.resonanz?.dimensional?.leben?.rValue || 'N/A'}`);
            console.log(`   R2 Philosophie: ${result.resonanz?.dimensional?.philosophie?.rValue || 'N/A'}`);
            console.log(`   R3 Dynamik:     ${result.resonanz?.dimensional?.dynamik?.rValue || 'N/A'}`);
            console.log(`   R4 Identität:   ${result.resonanz?.dimensional?.identitaet?.rValue || 'N/A'}`);

            if (result.breakdown) {
                console.log(`   Breakdown: A=${result.breakdown.archetyp}, O=${result.breakdown.orientierung}, D=${result.breakdown.dominanz}, G=${result.breakdown.geschlecht}`);
            }
            console.log('');

        } catch (error) {
            console.log(`❌ ${testCase.name}: ${error.message}\n`);
        }
    }

    console.log('═══════════════════════════════════════════════════════════════');
    console.log('  Vergleiche diese Werte mit der Browser-Console nach');
    console.log('  Aktivierung von ?ssot=true');
    console.log('═══════════════════════════════════════════════════════════════');
}

runTests().catch(console.error);
