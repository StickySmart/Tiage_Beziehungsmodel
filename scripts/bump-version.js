#!/usr/bin/env node
/**
 * Version Bump Script für Tiage
 *
 * Aktualisiert sowohl package.json als auch js/version.js
 * Wird automatisch von GitHub Actions nach jedem Merge ausgeführt.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const fs = require('fs');
const path = require('path');

// Pfade
const packageJsonPath = path.join(__dirname, '..', 'package.json');
const versionJsPath = path.join(__dirname, '..', 'js', 'version.js');

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

console.log(`Bumping version: ${currentVersion} → ${newVersion}`);
console.log(`Merge date: ${mergeDate} ${mergeTime}`);

// 1. Package.json aktualisieren
packageJson.version = newVersion;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
console.log('✓ package.json updated');

// 2. version.js aktualisieren
const versionJsContent = `/**
 * VERSION INFORMATION
 *
 * Bei jedem Merge wird die PATCH-Version (dritte Stelle) hochgezählt.
 * Format: MAJOR.MINOR.PATCH
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const TiageVersion = {
    // Semantische Versionierung: MAJOR.MINOR.PATCH
    major: ${major},
    minor: ${minor},
    patch: ${newPatch},

    // Letztes Merge-Datum und -Uhrzeit
    mergeDate: '${mergeDate}',
    mergeTime: '${mergeTime}',

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
    const mergeText = \`Merge: \${TiageVersion.formattedDate} um \${TiageVersion.mergeTime} Uhr\`;

    // Header-Version (zwei Zeilen oben rechts)
    const versionLine = document.getElementById('versionLine');
    const mergeLine = document.getElementById('mergeLine');
    if (versionLine) versionLine.textContent = versionText;
    if (mergeLine) mergeLine.textContent = mergeText;

    // Footer-Version
    const footerVersion = document.getElementById('footerVersion');
    if (footerVersion) {
        footerVersion.textContent = versionText;
    }

    // Age Verification Version (zwei Zeilen)
    const ageVersionLine = document.getElementById('ageVersionLine');
    const ageMergeLine = document.getElementById('ageMergeLine');
    if (ageVersionLine) ageVersionLine.textContent = versionText;
    if (ageMergeLine) ageMergeLine.textContent = mergeText;
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

console.log(`\n✅ Version bump complete: v${newVersion}`);
