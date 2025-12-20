/**
 * VERSION INFORMATION
 *
 * Bei jedem Merge wird die PATCH-Version (dritte Stelle) hochgezählt.
 * Format: MAJOR.MINOR.PATCH
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const TiageVersion = {
    // Semantische Versionierung: MAJOR.MINOR.PATCH
    major: 1,
    minor: 8,
    patch: 386,

    // Letztes Merge-Datum und -Uhrzeit
    mergeDate: '2025-12-20',
    mergeTime: '05:15',

    // Vollständige Version als String (Patch 3-stellig mit führenden Nullen)
    get version() {
        return `${this.major}.${this.minor}.${String(this.patch).padStart(3, '0')}`;
    },

    // Formatiertes Datum (deutsch)
    get formattedDate() {
        const [year, month, day] = this.mergeDate.split('-');
        return `${day}.${month}.${year}`;
    },

    // Vollständige Anzeige für die Überschrift
    get displayString() {
        return `v${this.version} (${this.formattedDate} ${this.mergeTime})`;
    },

    // Kurze Anzeige
    get shortDisplay() {
        return `v${this.version}`;
    }
};

// Initialisierung: Version in UI anzeigen (Header, Footer, Age Verification)
function initVersionDisplay() {
    const versionText = `Version ${TiageVersion.version}`;
    const mergeText = `Merge: ${TiageVersion.formattedDate} um ${TiageVersion.mergeTime} Uhr`;

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
