#!/usr/bin/env node
/**
 * Version Bump Script für Tiage
 *
 * Aktualisiert package.json, js/version.js und README.md
 * Wird automatisch vom pre-commit Hook bei jedem Commit ausgeführt.
 * Kann auch manuell mit: npm run version:bump
 *
 * © 2025-2026 Ti-age.de Alle Rechte vorbehalten.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Pfade
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const versionJsPath = path.join(__dirname, '..', 'js', 'version.js');
const readmePath = path.join(__dirname, '..', 'README.md');

// Package.json lesen
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const currentVersion = packageJson.version;

// Version parsen
const [major, minor, patch] = currentVersion.split('.').map(Number);

// Patch erhöhen
const newPatch = patch + 1;
const newVersion = `${major}.${minor}.${newPatch}`;

// Aktuelles Datum und Uhrzeit
const now = new Date();
const mergeDate = now.toISOString().split('T')[0]; // YYYY-MM-DD
const mergeTime = now.toTimeString().slice(0, 5);   // HH:MM

// Git Commit-Count ermitteln (+1 weil der aktuelle Commit noch nicht gezählt ist)
let commitCount = 0;
try {
    const count = execSync('git rev-list --count HEAD', { encoding: 'utf8' }).trim();
    commitCount = parseInt(count, 10) + 1; // +1 für den aktuellen Commit
} catch (e) {
    console.warn('Git commit count nicht verfügbar:', e.message);
}

console.log(`Bumping version: ${currentVersion} → ${newVersion}`);
console.log(`Merge date: ${mergeDate} ${mergeTime}`);
console.log(`Commit count: ${commitCount}`);

// 1. Package.json aktualisieren
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
console.log('✓ package.json updated');

// 2. version.js aktualisieren
const versionJsContent = `/**
 * VERSION INFORMATION
 *
 * Bei jedem Commit wird die PATCH-Version (dritte Stelle) hochgezählt.
 * Format: MAJOR.MINOR.PATCH
 *
 * Automatisch generiert von scripts/bump-version.js via pre-commit Hook.
 * NICHT manuell bearbeiten!
 *
 * © 2025-2026 Ti-age.de Alle Rechte vorbehalten.
 */

const TiageVersion = {
    // Semantische Versionierung: MAJOR.MINOR.PATCH
    major: ${major},
    minor: ${minor},
    patch: ${newPatch},

    // Letztes Commit-Datum und -Uhrzeit
    mergeDate: '${mergeDate}',
    mergeTime: '${mergeTime}',

    // Git Commit-Anzahl
    commitCount: ${commitCount},

    // Vollständige Version als String (Patch 3-stellig mit führenden Nullen)
    get version() {
        return \`\${this.major}.\${this.minor}.\${String(this.patch).padStart(3, '0')}\`;
    },

    // Formatiertes Datum (deutsch)
    get formattedDate() {
        const [year, month, day] = this.mergeDate.split('-');
        return \`\${day}.\${month}.\${year}\`;
    },

    // Vollständige Anzeige für die Überschrift
    get displayString() {
        return \`v\${this.version} (\${this.formattedDate} \${this.mergeTime})\`;
    },

    // Kurze Anzeige
    get shortDisplay() {
        return \`v\${this.version}\`;
    }
};

// Initialisierung: Version in UI anzeigen (Header, Footer, Age Verification)
function initVersionDisplay() {
    const versionText = \`Version \${TiageVersion.version}\`;
    const commitText = \`Commit #\${TiageVersion.commitCount} — \${TiageVersion.formattedDate} \${TiageVersion.mergeTime}\`;

    // Header-Version (zwei Zeilen oben rechts)
    const versionLine = document.getElementById('versionLine');
    const mergeLine = document.getElementById('mergeLine');
    if (versionLine) versionLine.textContent = versionText;
    if (mergeLine) mergeLine.textContent = commitText;

    // Footer-Version
    const footerVersion = document.getElementById('footerVersion');
    if (footerVersion) {
        footerVersion.textContent = \`\${versionText} | \${commitText}\`;
    }

    // Age Verification Version (zwei Zeilen)
    const ageVersionLine = document.getElementById('ageVersionLine');
    const ageMergeLine = document.getElementById('ageMergeLine');
    if (ageVersionLine) ageVersionLine.textContent = versionText;
    if (ageMergeLine) ageMergeLine.textContent = commitText;
}

// Bei DOM ready ausführen
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initVersionDisplay);
} else {
    initVersionDisplay();
}

// Export für Node.js (falls benötigt)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageVersion;
}
`;

fs.writeFileSync(versionJsPath, versionJsContent, 'utf8');
console.log('✓ js/version.js updated');

// 3. README.md aktualisieren
let readmeContent = fs.readFileSync(readmePath, 'utf8');
readmeContent = readmeContent.replace(
    /\*\*Version \d+\.\d+\.\d+\*\*/,
    `**Version ${newVersion}**`
);
fs.writeFileSync(readmePath, readmeContent, 'utf8');
console.log('✓ README.md updated');

console.log(`\n✅ Version bump complete: v${newVersion} (Commit #${commitCount})`);
