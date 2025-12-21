#!/usr/bin/env node
/**
 * ARCHETYPEN-PROFIL ID-VALIDATOR & KORREKTOR
 * ==========================================
 *
 * Validiert alle Archetypen-Profile gegen die SSOT (beduerfnis-ids.js)
 * und kann automatisch Korrekturen durchführen.
 *
 * Usage:
 *   node scripts/validate-profile-ids.js              # Nur validieren
 *   node scripts/validate-profile-ids.js --fix        # Validieren und korrigieren
 *   node scripts/validate-profile-ids.js --report     # Detaillierten Report erstellen
 *
 * © 2025 Ti-age.de
 */

const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════════════════════════════
// KONFIGURATION
// ═══════════════════════════════════════════════════════════════════════════

const SSOT_PATH = path.join(__dirname, '../profiles/definitions/beduerfnis-ids.js');
const PROFILES_DIR = path.join(__dirname, '../profiles/archetypen');
const ARCHETYPEN = ['single', 'duo', 'duo-flex', 'solopoly', 'polyamor', 'ra', 'lat', 'aromantisch'];

// ═══════════════════════════════════════════════════════════════════════════
// SSOT LADEN
// ═══════════════════════════════════════════════════════════════════════════

function loadSSOT() {
    console.log('📚 Lade SSOT (beduerfnis-ids.js)...');
    const content = fs.readFileSync(SSOT_PATH, 'utf8');

    // Extrahiere das beduerfnisse-Objekt
    const ssot = {};
    const regex = /'(#B\d+)':\s*\{\s*key:\s*'([^']+)',\s*kategorie:\s*'([^']+)',\s*label:\s*'([^']+)'/g;
    let match;

    while ((match = regex.exec(content)) !== null) {
        ssot[match[1]] = {
            id: match[1],
            key: match[2],
            kategorie: match[3],
            label: match[4]
        };
    }

    console.log(`   ✓ ${Object.keys(ssot).length} Bedürfnisse geladen\n`);
    return ssot;
}

// ═══════════════════════════════════════════════════════════════════════════
// PROFIL LADEN UND PARSEN
// ═══════════════════════════════════════════════════════════════════════════

function loadProfile(archetype) {
    const filePath = path.join(PROFILES_DIR, `${archetype}.js`);
    if (!fs.existsSync(filePath)) {
        console.warn(`   ⚠ Profil nicht gefunden: ${filePath}`);
        return null;
    }

    const content = fs.readFileSync(filePath, 'utf8');
    const profile = {
        archetype,
        filePath,
        content,
        beduerfnisse: {},
        lines: content.split('\n')
    };

    // Extrahiere alle Bedürfnis-Einträge mit Zeilennummer
    const regex = /'(#B\d+)':\s*(\d+),?\s*\/\/\s*(.+?)(?:\s*-|$)/g;
    let match;
    let lineNum = 0;

    for (const line of profile.lines) {
        lineNum++;
        const lineMatch = line.match(/'(#B\d+)':\s*(\d+),?\s*\/\/\s*(.+?)(?:\s*-|$)/);
        if (lineMatch) {
            profile.beduerfnisse[lineMatch[1]] = {
                id: lineMatch[1],
                value: parseInt(lineMatch[2]),
                comment: lineMatch[3].trim(),
                lineNumber: lineNum,
                originalLine: line
            };
        }
    }

    return profile;
}

// ═══════════════════════════════════════════════════════════════════════════
// VALIDIERUNG
// ═══════════════════════════════════════════════════════════════════════════

function validateProfile(profile, ssot) {
    const results = {
        archetype: profile.archetype,
        total: 0,
        correct: 0,
        incorrect: 0,
        missing: 0,
        extra: 0,
        discrepancies: [],
        missingIds: [],
        extraIds: []
    };

    // Prüfe alle SSOT-Einträge gegen das Profil
    for (const [id, ssotEntry] of Object.entries(ssot)) {
        results.total++;
        const profileEntry = profile.beduerfnisse[id];

        if (!profileEntry) {
            results.missing++;
            results.missingIds.push({
                id,
                ssotKey: ssotEntry.key,
                ssotLabel: ssotEntry.label,
                kategorie: ssotEntry.kategorie
            });
            continue;
        }

        // Vergleiche Kommentar mit SSOT-Key
        const commentKey = profileEntry.comment.toLowerCase()
            .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
            .replace(/[^a-z0-9_]/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '');

        const ssotKey = ssotEntry.key.toLowerCase();

        // Prüfe ob Kommentar mit SSOT-Key übereinstimmt (auch teilweise)
        const isMatch = commentKey === ssotKey ||
                        ssotKey.includes(commentKey) ||
                        commentKey.includes(ssotKey) ||
                        ssotKey.startsWith(commentKey) ||
                        commentKey.startsWith(ssotKey);

        if (isMatch) {
            results.correct++;
        } else {
            results.incorrect++;
            results.discrepancies.push({
                id,
                ssotKey: ssotEntry.key,
                ssotLabel: ssotEntry.label,
                profileComment: profileEntry.comment,
                profileValue: profileEntry.value,
                lineNumber: profileEntry.lineNumber,
                kategorie: ssotEntry.kategorie
            });
        }
    }

    // Prüfe auf extra IDs im Profil (nicht in SSOT)
    for (const [id, profileEntry] of Object.entries(profile.beduerfnisse)) {
        if (!ssot[id]) {
            results.extra++;
            results.extraIds.push({
                id,
                profileComment: profileEntry.comment,
                profileValue: profileEntry.value,
                lineNumber: profileEntry.lineNumber
            });
        }
    }

    return results;
}

// ═══════════════════════════════════════════════════════════════════════════
// KORREKTUR
// ═══════════════════════════════════════════════════════════════════════════

function fixProfile(profile, ssot, validationResults) {
    let content = profile.content;
    let fixCount = 0;

    // 1. Korrigiere falsche Kommentare
    for (const disc of validationResults.discrepancies) {
        const oldLine = profile.beduerfnisse[disc.id].originalLine;
        const newComment = `${disc.ssotKey} - ${disc.ssotLabel}`;
        const newLine = oldLine.replace(
            /\/\/\s*.+$/,
            `// ${newComment}`
        );

        if (oldLine !== newLine) {
            content = content.replace(oldLine, newLine);
            fixCount++;
        }
    }

    // 2. Füge fehlende IDs hinzu (am Ende des beduerfnisse-Objekts)
    if (validationResults.missingIds.length > 0) {
        // Gruppiere nach Kategorie für bessere Organisation
        const byKategorie = {};
        for (const missing of validationResults.missingIds) {
            if (!byKategorie[missing.kategorie]) {
                byKategorie[missing.kategorie] = [];
            }
            byKategorie[missing.kategorie].push(missing);
        }

        // Finde die Position vor dem schließenden } des beduerfnisse-Objekts
        // Suche nach dem letzten Bedürfnis-Eintrag
        const lastEntryMatch = content.match(/'#B\d+':\s*\d+\s*\/\/[^\n]+\n(\s*)\}/);

        if (lastEntryMatch) {
            let insertText = '';
            const indent = '        '; // 8 Spaces

            for (const [kategorie, entries] of Object.entries(byKategorie)) {
                insertText += `\n${indent}// FEHLENDE EINTRÄGE (${kategorie}) - automatisch hinzugefügt\n`;
                for (const entry of entries.sort((a, b) => {
                    const numA = parseInt(a.id.replace('#B', ''));
                    const numB = parseInt(b.id.replace('#B', ''));
                    return numA - numB;
                })) {
                    // Bestimme einen sinnvollen Default-Wert basierend auf dem Archetyp
                    const defaultValue = getDefaultValue(profile.archetype, entry.kategorie);
                    insertText += `${indent}'${entry.id}': ${defaultValue},  // ${entry.ssotKey} - ${entry.ssotLabel}\n`;
                    fixCount++;
                }
            }

            // Füge vor dem letzten } ein
            const insertPos = content.lastIndexOf("'#B");
            const endOfLastEntry = content.indexOf('\n', content.indexOf('//', insertPos)) + 1;
            content = content.slice(0, endOfLastEntry) + insertText + content.slice(endOfLastEntry);
        }
    }

    return { content, fixCount };
}

// Default-Werte basierend auf Archetyp und Kategorie
function getDefaultValue(archetype, kategorie) {
    const defaults = {
        'single': { '#K11': 40, '#K12': 25, '#K13': 50, default: 50 },
        'duo': { '#K11': 35, '#K12': 85, '#K13': 70, default: 70 },
        'duo-flex': { '#K11': 50, '#K12': 60, '#K13': 60, default: 60 },
        'solopoly': { '#K11': 55, '#K12': 30, '#K13': 55, default: 55 },
        'polyamor': { '#K11': 60, '#K12': 55, '#K13': 55, default: 55 },
        'ra': { '#K11': 65, '#K12': 35, '#K13': 50, default: 50 },
        'lat': { '#K11': 45, '#K12': 50, '#K13': 55, default: 55 },
        'aromantisch': { '#K11': 35, '#K12': 30, '#K13': 55, default: 45 }
    };

    const archetypeDefaults = defaults[archetype] || defaults['duo'];
    return archetypeDefaults[kategorie] || archetypeDefaults.default;
}

// ═══════════════════════════════════════════════════════════════════════════
// REPORT GENERIERUNG
// ═══════════════════════════════════════════════════════════════════════════

function generateReport(allResults) {
    let report = `
╔═══════════════════════════════════════════════════════════════════════════════╗
║                    ARCHETYPEN-PROFIL VALIDIERUNGS-REPORT                      ║
║                              ${new Date().toISOString().split('T')[0]}                                    ║
╚═══════════════════════════════════════════════════════════════════════════════╝

`;

    // Zusammenfassung
    report += `═══ ZUSAMMENFASSUNG ═══\n\n`;
    report += `| Archetyp    | Total | Korrekt | Falsch | Fehlend | Extra |\n`;
    report += `|-------------|-------|---------|--------|---------|-------|\n`;

    let totalDiscrepancies = 0;
    let totalMissing = 0;

    for (const result of allResults) {
        report += `| ${result.archetype.padEnd(11)} | ${String(result.total).padStart(5)} | ${String(result.correct).padStart(7)} | ${String(result.incorrect).padStart(6)} | ${String(result.missing).padStart(7)} | ${String(result.extra).padStart(5)} |\n`;
        totalDiscrepancies += result.incorrect;
        totalMissing += result.missing;
    }

    report += `\n📊 GESAMT: ${totalDiscrepancies} Diskrepanzen, ${totalMissing} fehlende IDs\n\n`;

    // Details pro Archetyp
    for (const result of allResults) {
        if (result.discrepancies.length > 0 || result.missingIds.length > 0) {
            report += `\n═══ ${result.archetype.toUpperCase()} ═══\n`;

            if (result.discrepancies.length > 0) {
                report += `\n🔴 DISKREPANZEN (${result.discrepancies.length}):\n`;
                for (const d of result.discrepancies.slice(0, 20)) {
                    report += `   ${d.id}: SSOT="${d.ssotKey}" vs Profil="${d.profileComment}" (Zeile ${d.lineNumber})\n`;
                }
                if (result.discrepancies.length > 20) {
                    report += `   ... und ${result.discrepancies.length - 20} weitere\n`;
                }
            }

            if (result.missingIds.length > 0) {
                report += `\n🟡 FEHLEND (${result.missingIds.length}):\n`;
                for (const m of result.missingIds.slice(0, 10)) {
                    report += `   ${m.id}: ${m.ssotKey} (${m.ssotLabel})\n`;
                }
                if (result.missingIds.length > 10) {
                    report += `   ... und ${result.missingIds.length - 10} weitere\n`;
                }
            }
        }
    }

    return report;
}

// ═══════════════════════════════════════════════════════════════════════════
// HAUPTPROGRAMM
// ═══════════════════════════════════════════════════════════════════════════

function main() {
    const args = process.argv.slice(2);
    const shouldFix = args.includes('--fix');
    const shouldReport = args.includes('--report');

    console.log('╔═══════════════════════════════════════════════════════════════╗');
    console.log('║       ARCHETYPEN-PROFIL ID-VALIDATOR                          ║');
    console.log('╚═══════════════════════════════════════════════════════════════╝\n');

    // 1. SSOT laden
    const ssot = loadSSOT();

    // 2. Alle Profile validieren
    const allResults = [];

    for (const archetype of ARCHETYPEN) {
        console.log(`🔍 Validiere ${archetype}...`);
        const profile = loadProfile(archetype);

        if (!profile) continue;

        const results = validateProfile(profile, ssot);
        allResults.push(results);

        const status = results.incorrect === 0 && results.missing === 0 ? '✅' : '❌';
        console.log(`   ${status} ${results.correct}/${results.total} korrekt, ${results.incorrect} falsch, ${results.missing} fehlend\n`);

        // 3. Optional: Korrigieren
        if (shouldFix && (results.incorrect > 0 || results.missing > 0)) {
            console.log(`   🔧 Korrigiere ${archetype}...`);
            const { content, fixCount } = fixProfile(profile, ssot, results);
            fs.writeFileSync(profile.filePath, content, 'utf8');
            console.log(`   ✅ ${fixCount} Korrekturen durchgeführt\n`);
        }
    }

    // 4. Report generieren
    if (shouldReport) {
        const report = generateReport(allResults);
        const reportPath = path.join(__dirname, '../profile-validation-report.txt');
        fs.writeFileSync(reportPath, report, 'utf8');
        console.log(`\n📄 Report gespeichert: ${reportPath}`);
        console.log(report);
    }

    // 5. Zusammenfassung
    const totalIssues = allResults.reduce((sum, r) => sum + r.incorrect + r.missing, 0);

    console.log('\n═══════════════════════════════════════════════════════════════');
    if (totalIssues === 0) {
        console.log('✅ Alle Profile sind synchron mit der SSOT!');
    } else {
        console.log(`⚠️  ${totalIssues} Probleme gefunden.`);
        if (!shouldFix) {
            console.log('   Führe "node scripts/validate-profile-ids.js --fix" aus, um zu korrigieren.');
        }
    }
    console.log('═══════════════════════════════════════════════════════════════\n');

    return totalIssues === 0 ? 0 : 1;
}

// Export für Tests
module.exports = { loadSSOT, loadProfile, validateProfile, fixProfile };

// Ausführen wenn direkt aufgerufen
if (require.main === module) {
    process.exit(main());
}
