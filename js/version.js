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
    minor: 6,
    patch: 1,

    // Letztes Merge-Datum und -Uhrzeit
    mergeDate: '2025-12-02',
    mergeTime: '20:39',

    // Vollständige Version als String
    get version() {
        return `${this.major}.${this.minor}.${this.patch}`;
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

// Initialisierung: Version in UI anzeigen
function initVersionDisplay() {
    const versionElement = document.getElementById('appVersion');
    if (versionElement) {
        versionElement.textContent = TiageVersion.displayString;
        versionElement.title = `Version ${TiageVersion.version}\nMerge: ${TiageVersion.formattedDate} um ${TiageVersion.mergeTime} Uhr`;
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
