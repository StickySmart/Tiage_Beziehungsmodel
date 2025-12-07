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
    patch: 1,

    // Letztes Merge-Datum und -Uhrzeit
    mergeDate: '2025-12-07',
    mergeTime: '04:27',

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

// Initialisierung: Version in UI anzeigen (Header und Footer)
function initVersionDisplay() {
    // Header-Version
    const versionElement = document.getElementById('appVersion');
    if (versionElement) {
        versionElement.textContent = TiageVersion.displayString;
        versionElement.title = `Version ${TiageVersion.version}\nMerge: ${TiageVersion.formattedDate} um ${TiageVersion.mergeTime} Uhr`;
    }

    // Footer-Version
    const footerVersion = document.getElementById('footerVersion');
    if (footerVersion) {
        footerVersion.textContent = `Version ${TiageVersion.version}`;
    }

    // Age Verification Version
    const ageVerificationVersion = document.getElementById('ageVerificationVersion');
    if (ageVerificationVersion) {
        ageVerificationVersion.textContent = TiageVersion.displayString;
    }
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
