/**
 * ACTIVE FILTER CARD COMPONENT
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Zeigt alle aktiven Filter als Card an.
 * - Mehrere Filter können addiert werden (P1 + Liebe + R2...)
 * - UND/ODER Umschalter für Verknüpfung
 * - Einzelne Filter entfernbar
 * - Zurücksetzen löscht alle
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const ActiveFilterCard = (function() {
    'use strict';

    let containerId = null;

    // Multi-Filter State
    let activeFilters = [];  // [{id: 'P1', label: 'Statistik', type: 'perspektive', color: '#3B82F6'}, {id: 'Liebe', label: 'Liebe', type: 'text', color: '#9CA3AF'}]
    let filterMode = 'AND';  // 'AND' oder 'OR'

    // Filter-Definitionen für R1-R4, P1-P4
    const FILTER_DEFS = {
        'R1': { label: 'Leben', icon: '🔥', color: '#E63946', type: 'dimension', description: 'Resonanzfaktor Leben/Orientierung' },
        'R2': { label: 'Philosophie', icon: '🧠', color: '#2A9D8F', type: 'dimension', description: 'Resonanzfaktor Philosophie/Archetyp' },
        'R3': { label: 'Dynamik', icon: '⚡', color: '#8B5CF6', type: 'dimension', description: 'Resonanzfaktor Dynamik/Dominanz' },
        'R4': { label: 'Identität', icon: '💚', color: '#F4A261', type: 'dimension', description: 'Resonanzfaktor Identität/Geschlecht' },
        'P1': { label: 'Statistik', icon: '📊', color: '#3B82F6', type: 'perspektive', description: 'Empirisch nachgewiesene Grundbedürfnisse' },
        'P2': { label: 'Konditionierung', icon: '🌱', color: '#F59E0B', type: 'perspektive', description: 'Natürliche vs. anerzogene Bedürfnisse' },
        'P3': { label: 'Qualität', icon: '⚖️', color: '#10B981', type: 'perspektive', description: 'Statische vs. dynamische Qualitätsaspekte' },
        'P4': { label: 'SexPositiv', icon: '💜', color: '#8B5CF6', type: 'perspektive', description: 'Bewusste Machtdynamik und Consent' }
    };

    /**
     * Fügt einen Filter hinzu (addiert, ersetzt nicht)
     * @param {string} filterText - Der Filter-Text (R1, P1, Liebe, etc.)
     */
    function addFilter(filterText) {
        if (!filterText || filterText.trim() === '') return;

        const normalizedId = filterText.trim().toUpperCase();

        // Prüfe ob bereits vorhanden
        if (activeFilters.some(f => f.id.toUpperCase() === normalizedId)) {
            console.log('[ActiveFilterCard] Filter bereits aktiv:', filterText);
            return;
        }

        // Erstelle Filter-Objekt
        let filterObj;
        const def = FILTER_DEFS[normalizedId];

        if (def) {
            // Bekannter Filter (R1-R4, P1-P4)
            filterObj = {
                id: normalizedId,
                label: def.label,
                icon: def.icon,
                color: def.color,
                type: def.type
            };
        } else {
            // Text-Filter
            filterObj = {
                id: filterText.trim(),
                label: filterText.trim(),
                icon: '🔍',
                color: '#9CA3AF',
                type: 'text'
            };
        }

        activeFilters.push(filterObj);
        console.log('[ActiveFilterCard] Filter hinzugefügt:', filterObj.id, '- Gesamt:', activeFilters.length);

        update();
        dispatchFilterChange();
    }

    /**
     * Entfernt einen einzelnen Filter
     * @param {string} filterId - Die Filter-ID
     */
    function removeFilter(filterId) {
        const index = activeFilters.findIndex(f => f.id === filterId);
        if (index > -1) {
            activeFilters.splice(index, 1);
            console.log('[ActiveFilterCard] Filter entfernt:', filterId);
            update();
            dispatchFilterChange();
        }
    }

    /**
     * Löscht alle Filter
     */
    function resetFilters() {
        activeFilters = [];
        console.log('[ActiveFilterCard] Alle Filter gelöscht');
        update();
        dispatchFilterChange();

        // Auch Suchfeld leeren
        const searchInput = document.getElementById('profileReviewSearchInput');
        if (searchInput) {
            searchInput.value = '';
        }
    }

    /**
     * Schaltet zwischen UND/ODER um
     */
    function toggleMode() {
        filterMode = filterMode === 'AND' ? 'OR' : 'AND';
        console.log('[ActiveFilterCard] Modus gewechselt zu:', filterMode);
        update();
        dispatchFilterChange();
    }

    /**
     * Feuert Event bei Filter-Änderung
     */
    function dispatchFilterChange() {
        const event = new CustomEvent('activeFilterChange', {
            bubbles: true,
            detail: {
                filters: [...activeFilters],
                mode: filterMode
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * Rendert die Filter-Card
     * @returns {string} HTML-String
     */
    function render() {
        if (activeFilters.length === 0) {
            return '';
        }

        const modeLabel = filterMode === 'AND' ? 'UND' : 'ODER';
        const modeIcon = filterMode === 'AND' ? '∩' : '∪';
        const modeTitle = filterMode === 'AND'
            ? 'Alle Filter müssen zutreffen'
            : 'Mindestens ein Filter muss zutreffen';

        const filterBadges = activeFilters.map(f => `
            <div class="active-filter-badge" style="--filter-color: ${f.color};">
                <span class="active-filter-icon">${f.icon}</span>
                <span class="active-filter-label">${f.label}</span>
                <button class="active-filter-remove"
                        onclick="ActiveFilterCard.removeFilter('${f.id.replace(/'/g, "\\'")}')"
                        title="Filter entfernen">×</button>
            </div>
        `).join(activeFilters.length > 1 ? `<span class="filter-connector">${modeLabel}</span>` : '');

        return `
        <div class="active-filter-card">
            <div class="active-filter-card-header">
                <span class="active-filter-card-icon">🔍</span>
                <span class="active-filter-card-title">Aktive Filter (${activeFilters.length})</span>
                ${activeFilters.length > 1 ? `
                <button class="filter-mode-toggle"
                        onclick="ActiveFilterCard.toggleMode()"
                        title="${modeTitle}">
                    <span class="mode-icon">${modeIcon}</span>
                    <span class="mode-label">${modeLabel}</span>
                </button>
                ` : ''}
            </div>
            <div class="active-filter-card-content">
                <div class="active-filter-badges">
                    ${filterBadges}
                </div>
                <button class="active-filter-reset-btn"
                        onclick="ActiveFilterCard.resetFilters()"
                        title="Alle Filter zurücksetzen">
                    <span class="reset-icon">✕</span>
                    <span class="reset-text">Zurücksetzen</span>
                </button>
            </div>
        </div>
        `;
    }

    /**
     * Initialisiert die Card
     * @param {string} targetSelector - CSS-Selektor für den Container
     */
    function init(targetSelector) {
        containerId = targetSelector;
        update();
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
     * Gibt alle aktiven Filter zurück
     * @returns {Array} Array von Filter-Objekten
     */
    function getFilters() {
        return [...activeFilters];
    }

    /**
     * Gibt den aktuellen Modus zurück
     * @returns {string} 'AND' oder 'OR'
     */
    function getMode() {
        return filterMode;
    }

    /**
     * Prüft ob Filter aktiv sind
     * @returns {boolean}
     */
    function hasActiveFilters() {
        return activeFilters.length > 0;
    }

    /**
     * Prüft ob ein bestimmter Filter aktiv ist
     * @param {string} filterId
     * @returns {boolean}
     */
    function isFilterActive(filterId) {
        return activeFilters.some(f => f.id.toUpperCase() === filterId.toUpperCase());
    }

    return {
        // Haupt-API
        addFilter,
        removeFilter,
        resetFilters,
        toggleMode,

        // State-Abfragen
        getFilters,
        getMode,
        hasActiveFilters,
        isFilterActive,

        // Rendering
        render,
        init,
        update
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ActiveFilterCard;
}
if (typeof window !== 'undefined') {
    window.ActiveFilterCard = ActiveFilterCard;
}
