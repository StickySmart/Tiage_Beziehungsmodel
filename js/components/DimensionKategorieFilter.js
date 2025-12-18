/**
 * DIMENSION-KATEGORIE-FILTER KOMPONENTE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Universeller 2-Ebenen-Filter für Bedürfnisse:
 * - Ebene 1: 6 Dimensionen (A-F) - Beziehung, Werte, Nähe, Freiheit, Kommunikation, Soziales
 * - Ebene 2: 18 Kategorien - Dynamisch basierend auf gewählter Dimension
 *
 * Verwendbar in:
 * - Alle Bedürfnisse (AttributeSummaryCard)
 * - Synthese (GFK-Bedürfnisanalyse)
 * - Bedürfnis-Match mit Differenz
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const DimensionKategorieFilter = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // KONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Resonanz-Dimensionen (R1-R4) für Filter
     */
    const DIMENSIONEN = {
        'R1': {
            id: 'R1',
            key: 'leben',
            kurzform: 'R1',
            label: 'Leben',
            icon: '🔥',
            color: '#E63946',
            beschreibung: 'Orientierung - Existenz, Zuneigung, Muße'
        },
        'R2': {
            id: 'R2',
            key: 'philosophie',
            kurzform: 'R2',
            label: 'Philosophie',
            icon: '🧠',
            color: '#2A9D8F',
            beschreibung: 'Archetyp - Lebensplanung, Finanzen, Werte'
        },
        'R3': {
            id: 'R3',
            key: 'dynamik',
            kurzform: 'R3',
            label: 'Dynamik',
            icon: '⚡',
            color: '#8B5CF6',
            beschreibung: 'Dominanz - Kontrolle, Hingabe, Macht'
        },
        'R4': {
            id: 'R4',
            key: 'identitaet',
            kurzform: 'R4',
            label: 'Identität',
            icon: '💚',
            color: '#F4A261',
            beschreibung: 'Geschlecht - Authentizität, Selbstausdruck'
        }
    };

    /**
     * Kategorien gruppiert nach Resonanz-Dimensionen
     * Mapping: R1-R4 → Kategorien aus Taxonomie
     */
    const KATEGORIEN_PRO_DIMENSION = {
        'R1': [
            { id: '#K1', key: 'existenz', label: 'Existenz', beschreibung: 'Grundbedürfnisse: Atmen, Essen, Schlafen', color: '#E63946' },
            { id: '#K3', key: 'zuneigung', label: 'Zuneigung', beschreibung: 'Liebe, Nähe, emotionale Verbindung', color: '#E84393' },
            { id: '#K7', key: 'musse', label: 'Muße', beschreibung: 'Erholung, Freude und Genuss', color: '#118AB2' },
            { id: '#K16', key: 'intimitaet_romantik', label: 'Intimität & Romantik', beschreibung: 'Körperliche Nähe, Sex, Romantik', color: '#EC4899' }
        ],
        'R2': [
            { id: '#K12', key: 'lebensplanung', label: 'Lebensplanung', beschreibung: 'Kinder, Ehe, Wohnen, Familie', color: '#10B981' },
            { id: '#K13', key: 'finanzen_karriere', label: 'Finanzen & Karriere', beschreibung: 'Geld, Beruf, Work-Life-Balance', color: '#F59E0B' },
            { id: '#K17', key: 'werte_haltungen', label: 'Werte & Haltungen', beschreibung: 'Religion, Tradition, Umwelt', color: '#6366F1' },
            { id: '#K15', key: 'soziales_leben', label: 'Soziales Leben', beschreibung: 'Intro/Extroversion, Freunde', color: '#8B5CF6' },
            { id: '#K18', key: 'praktisches_leben', label: 'Praktisches Leben', beschreibung: 'Ordnung, Reisen, Alltag', color: '#14B8A6' }
        ],
        'R3': [
            { id: '#K11', key: 'dynamik', label: 'Dynamik & Austausch', beschreibung: 'Machtdynamik, BDSM/Kink', color: '#8B5CF6' },
            { id: '#K2', key: 'sicherheit', label: 'Sicherheit', beschreibung: 'Emotionale und psychische Sicherheit', color: '#F4A261' }
        ],
        'R4': [
            { id: '#K4', key: 'verstaendnis', label: 'Verständnis', beschreibung: 'Gesehen und verstanden werden', color: '#9B5DE5' },
            { id: '#K9', key: 'erschaffen', label: 'Kreativität & Erschaffen', beschreibung: 'Kreativität und Lernen', color: '#FF6B6B' },
            { id: '#K10', key: 'verbundenheit', label: 'Verbundenheit', beschreibung: 'Tiefe existenzielle Verbindung', color: '#A8DADC' },
            { id: '#K14', key: 'kommunikation_stil', label: 'Kommunikationsstil', beschreibung: 'Gespräche, Emotionen, Konflikte', color: '#3B82F6' }
        ]
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════════════

    let activeDimension = null;  // Aktuell gewählte Dimension (null = Alle)
    let activeKategorie = null;  // Aktuell gewählte Kategorie (null = Alle)
    let activeKategorien = new Set();  // Mehrfachauswahl: Set der aktiven Kategorien
    let containerId = null;      // Container-ID für Rendering
    let viewMode = 'tree';       // Nur noch 'tree' - Tags-Modus entfernt

    // ═══════════════════════════════════════════════════════════════════════════
    // FILTER-LOGIK
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Prüft ob ein Bedürfnis durch die aktuellen Filter passiert
     * @param {string} needId - Bedürfnis-ID (#B1-#B220)
     * @returns {boolean} true wenn Bedürfnis angezeigt werden soll
     */
    function shouldShowNeed(needId) {
        // Kein Filter aktiv → Alles anzeigen
        if (activeKategorien.size === 0) {
            return true;
        }

        // Hole Bedürfnis-Metadaten
        const need = getNeedMetadata(needId);
        if (!need) {
            // FIX: Bedürfnis NICHT anzeigen wenn keine Metadaten verfügbar
            // (Vorheriges Verhalten: return true - zeigte ALLE Bedürfnisse an)
            return false;
        }

        // Mehrfachauswahl: Prüfe ob Bedürfnis zu einer der aktiven Kategorien gehört
        return activeKategorien.has(need.kategorieId);
    }

    /**
     * Holt Metadaten für ein Bedürfnis (Dimension, Kategorie)
     * @param {string} needId - Bedürfnis-ID (#B1-#B220)
     * @returns {object} {dimensionId, kategorieId, kategorieKey}
     */
    function getNeedMetadata(needId) {
        // Versuche BeduerfnisIds und TiageTaxonomie zu laden
        const beduerfnisIds = typeof BeduerfnisIds !== 'undefined' ? BeduerfnisIds : null;
        const taxonomie = typeof TiageTaxonomie !== 'undefined' ? TiageTaxonomie : null;

        if (!beduerfnisIds || !beduerfnisIds.beduerfnisse || !taxonomie) {
            console.error('[DimensionKategorieFilter] BeduerfnisIds oder TiageTaxonomie nicht geladen');
            return null;
        }

        const need = beduerfnisIds.beduerfnisse[needId];
        if (!need || !need.kategorie) {
            return null;
        }

        // Hole Kategorie-Info
        const kategorie = taxonomie.kategorien?.[need.kategorie];
        if (!kategorie) {
            return null;
        }

        return {
            dimensionId: kategorie.dimension,  // z.B. '#D3'
            kategorieId: need.kategorie,       // z.B. '#K3'
            kategorieKey: kategorie.key        // z.B. 'zuneigung'
        };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // RENDER FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Rendert den kompletten Filter (Ebene 1 + Ebene 2)
     * @param {string} container - Container-Selektor oder ID
     * @returns {string} HTML-String
     */
    function render(container) {
        containerId = container;

        let html = '<div class="dimension-kategorie-filter">';

        // Nur noch Tree-Ansicht (Tags-Modus entfernt)
        html += renderTreeView();

        html += '</div>';

        return html;
    }


    /**
     * Rendert die Tree-Ansicht mit Reset-Button
     */
    function renderTreeView() {
        if (typeof ResonanzTreeView === 'undefined') {
            return '<p style="color: rgba(255,255,255,0.5);">Tree-View nicht geladen</p>';
        }

        // Reset-Button only
        const hasActiveFilters = activeKategorien.size > 0;
        const resetButtonVisible = hasActiveFilters ? '' : ' style="display: none;"';

        return `
        <div class="tree-view-header">
            <button class="tree-reset-btn"
                    onclick="DimensionKategorieFilter.reset()"
                    title="Filter zurücksetzen"${resetButtonVisible}>
                ↺ Zurücksetzen
            </button>
        </div>`;
    }


    /**
     * Re-rendert den Filter (nach State-Änderung)
     */
    function reRender() {
        if (!containerId) return;

        const container = document.querySelector(containerId);
        if (!container) return;

        const newHtml = render(containerId);
        const temp = document.createElement('div');
        temp.innerHTML = newHtml;
        const newFilter = temp.firstElementChild;

        if (newFilter) {
            const oldFilter = container.querySelector('.dimension-kategorie-filter');
            if (oldFilter) {
                oldFilter.replaceWith(newFilter);
            } else {
                container.insertAdjacentElement('afterbegin', newFilter);
            }
        }

        // Tree-View nach Rendering initialisieren
        initTreeView();
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Toggle eine Kategorie in der Mehrfachauswahl
     * @param {string} kategorieId - '#K1' bis '#K18'
     */
    function toggleKategorie(kategorieId) {
        if (activeKategorien.has(kategorieId)) {
            activeKategorien.delete(kategorieId);
        } else {
            activeKategorien.add(kategorieId);
        }

        // Re-render Filter
        reRender();

        // Event feuern
        dispatchFilterChange();
    }

    /**
     * Prüft ob eine Kategorie aktiv ist
     * @param {string} kategorieId - '#K1' bis '#K18'
     * @returns {boolean}
     */
    function isKategorieActive(kategorieId) {
        return activeKategorien.has(kategorieId);
    }

    /**
     * Setzt die aktive Kategorie (deprecated - für Rückwärtskompatibilität)
     * @param {string|null} kategorieId - '#K1' bis '#K18' oder null für Alle
     */
    function setKategorie(kategorieId) {
        if (kategorieId === null) {
            activeKategorien.clear();
        } else {
            activeKategorien.clear();
            activeKategorien.add(kategorieId);
        }

        // Re-render Filter
        reRender();

        // Event feuern
        dispatchFilterChange();
    }

    /**
     * Feuert ein Custom Event bei Filter-Änderung
     */
    function dispatchFilterChange() {
        const event = new CustomEvent('dimensionKategorieFilterChange', {
            bubbles: true,
            detail: {
                kategorien: Array.from(activeKategorien),
                kategorienInfo: Array.from(activeKategorien).map(id => getKategorieInfo(id))
            }
        });
        document.dispatchEvent(event);
    }

    /**
     * Holt Kategorie-Info nach ID
     */
    function getKategorieInfo(kategorieId) {
        for (const dimId in KATEGORIEN_PRO_DIMENSION) {
            const kategorien = KATEGORIEN_PRO_DIMENSION[dimId];
            const kat = kategorien.find(k => k.id === kategorieId);
            if (kat) return kat;
        }
        return null;
    }

    /**
     * Reset Filter (zeige alles)
     */
    function reset() {
        activeKategorien.clear();
        reRender();
        dispatchFilterChange();
    }

    /**
     * Initialisiert den Tree-View nach DOM-Update
     */
    function initTreeView() {
        if (typeof ResonanzTreeView !== 'undefined') {
            setTimeout(() => {
                const treeContainer = document.querySelector('#tree-view-inline-container');
                if (treeContainer) {
                    const treeHtml = ResonanzTreeView.render('#tree-view-inline-container', {
                        onKategorieClick: toggleKategorie,
                        isKategorieActive: isKategorieActive
                    });
                    treeContainer.innerHTML = treeHtml;
                    console.log('[DimensionKategorieFilter] Tree-View initialisiert');
                }
            }, 50);
        }
    }

    /**
     * Holt aktuellen Filter-State
     */
    function getState() {
        return {
            kategorien: Array.from(activeKategorien)
        };
    }

    /**
     * Holt alle Dimensionen
     */
    function getDimensionen() {
        return DIMENSIONEN;
    }

    /**
     * Holt Kategorien für eine Dimension
     */
    function getKategorienFuerDimension(dimensionId) {
        return KATEGORIEN_PRO_DIMENSION[dimensionId] || [];
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // EXPORT
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Rendering
        render,
        reRender,
        initTreeView,

        // Filter setzen (Mehrfachauswahl)
        toggleKategorie,
        isKategorieActive,
        setKategorie,  // Deprecated - für Rückwärtskompatibilität
        reset,

        // Filter prüfen
        shouldShowNeed,
        getNeedMetadata,

        // State abrufen
        getState,
        getDimensionen,
        getKategorienFuerDimension,
        getKategorieInfo,

        // Konstanten (für externe Nutzung)
        DIMENSIONEN,
        KATEGORIEN_PRO_DIMENSION
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DimensionKategorieFilter;
}
