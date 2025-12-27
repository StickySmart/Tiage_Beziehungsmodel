/**
 * ACTIVE FILTER CARD COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Zeigt den aktuell aktiven Filter (R1-R4, P1-P4) als Card an.
 * Enthält eine Anzeige des aktiven Filters und einen Reset-Button.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const ActiveFilterCard = (function() {
    'use strict';

    let containerId = null;

    /**
     * Rendert die Filter-Card
     * @returns {string} HTML-String
     */
    function render() {
        const filterInfo = getActiveFilterInfo();

        if (!filterInfo) {
            // Keine aktive Filter - Card ausblenden
            return '';
        }

        const typeLabel = filterInfo.type === 'dimension' ? 'Resonanz' : 'Perspektive';

        return `
        <div class="active-filter-card">
            <div class="active-filter-card-header">
                <span class="active-filter-card-icon">🔍</span>
                <span class="active-filter-card-title">Aktiver Filter</span>
            </div>
            <div class="active-filter-card-content">
                <div class="active-filter-badge" style="--filter-color: ${filterInfo.color};">
                    <span class="active-filter-icon">${filterInfo.icon}</span>
                    <span class="active-filter-id">${filterInfo.id}</span>
                    <span class="active-filter-label">${filterInfo.label}</span>
                    <span class="active-filter-type">${typeLabel}</span>
                </div>
                <button class="active-filter-reset-btn"
                        onclick="ActiveFilterCard.resetFilter()"
                        title="Filter zurücksetzen">
                    <span class="reset-icon">✕</span>
                    <span class="reset-text">Zurücksetzen</span>
                </button>
            </div>
        </div>
        `;
    }

    /**
     * Holt Info zum aktiven Filter
     * @returns {object|null} {id, label, icon, color, type}
     */
    function getActiveFilterInfo() {
        if (typeof DimensionKategorieFilter !== 'undefined' && DimensionKategorieFilter.getActiveQuickFilterInfo) {
            return DimensionKategorieFilter.getActiveQuickFilterInfo();
        }
        return null;
    }

    /**
     * Initialisiert die Card und fügt sie dem DOM hinzu
     * @param {string} targetSelector - CSS-Selektor für den Container
     */
    function init(targetSelector) {
        containerId = targetSelector;
        update();

        // Lausche auf Filter-Änderungen
        document.addEventListener('dimensionKategorieFilterChange', update);

        console.log('[ActiveFilterCard] Initialisiert');
    }

    /**
     * Aktualisiert die Card
     */
    function update() {
        if (!containerId) return;

        const container = document.querySelector(containerId);
        if (!container) return;

        // Entferne alte Card
        const oldCard = container.querySelector('.active-filter-card');
        if (oldCard) {
            oldCard.remove();
        }

        // Rendere neue Card
        const html = render();
        if (html) {
            container.insertAdjacentHTML('afterbegin', html);
        }
    }

    /**
     * Setzt den Filter zurück
     */
    function resetFilter() {
        if (typeof DimensionKategorieFilter !== 'undefined') {
            DimensionKategorieFilter.clearQuickFilter();
        }
    }

    /**
     * Zeigt ob ein Filter aktiv ist
     * @returns {boolean}
     */
    function hasActiveFilter() {
        return getActiveFilterInfo() !== null;
    }

    return {
        render,
        init,
        update,
        resetFilter,
        hasActiveFilter
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ActiveFilterCard;
}
if (typeof window !== 'undefined') {
    window.ActiveFilterCard = ActiveFilterCard;
}
