/**
 * RESONANZ TREE VIEW KOMPONENTE
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * Hierarchische Baumansicht für Resonanz → Kategorien → Nuancen (Bedürfnisse)
 *
 * Struktur:
 * ┌─────────────────────────────────────────────────────────────────────────────┐
 * │  RESONANZ (R1-R4)     → Leben, Philosophie, Dynamik, Identität             │
 * │  └── KATEGORIEN       → #K1-#K18 (z.B. Verständnis, Kreativität)           │
 * │      └── NUANCEN      → #B1-#B220 (einzelne Bedürfnisse)                   │
 * └─────────────────────────────────────────────────────────────────────────────┘
 *
 * Features:
 * - Expandable/Collapsible Ebenen
 * - Zähler für jede Ebene (z.B. "Leben (37)")
 * - Farbcodierung nach Resonanz-Bereich
 * - Such/Filter-Integration
 *
 * © 2025-2026 Ti-age.de Alle Rechte vorbehalten.
 */

const ResonanzTreeView = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // KONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Resonanz-Dimensionen (R1-R4) - Mapping zu Taxonomie-Dimensionen
     *
     * HINWEIS: Nutzt DimensionKategorieFilter.DIMENSIONEN als Single Source of Truth.
     * Falls nicht verfügbar, wird der lokale Fallback verwendet.
     */
    function getResonanzDimensionen() {
        // SSOT: Nutze DimensionKategorieFilter wenn verfügbar
        if (typeof DimensionKategorieFilter !== 'undefined' && DimensionKategorieFilter.DIMENSIONEN) {
            return DimensionKategorieFilter.DIMENSIONEN;
        }

        // Fallback: Lokale Definition
        return {
            'R1': {
                id: 'R1',
                key: 'leben',
                label: 'Leben',
                icon: '🔥',
                color: '#E63946',
                beschreibung: 'Orientierung - Existenz, Zuneigung, Muße',
                taxonomieDimensionen: ['#D3']
            },
            'R2': {
                id: 'R2',
                key: 'philosophie',
                label: 'Philosophie',
                icon: '🧠',
                color: '#2A9D8F',
                beschreibung: 'Archetyp - Lebensplanung, Finanzen, Werte',
                taxonomieDimensionen: ['#D1', '#D2']
            },
            'R3': {
                id: 'R3',
                key: 'dynamik',
                label: 'Dynamik',
                icon: '⚡',
                color: '#8B5CF6',
                beschreibung: 'Dominanz - Kontrolle, Hingabe, Macht',
                taxonomieDimensionen: ['#D4']
            },
            'R4': {
                id: 'R4',
                key: 'identitaet',
                label: 'Identität',
                icon: '💚',
                color: '#F4A261',
                beschreibung: 'Geschlecht - Authentizität, Selbstausdruck',
                taxonomieDimensionen: ['#D5', '#D6']
            }
        };
    }

    // Für Rückwärtskompatibilität
    const RESONANZ_DIMENSIONEN = getResonanzDimensionen();

    /**
     * State
     */
    let expandedNodes = new Set(); // Welche Knoten sind ausgeklappt?
    let treeData = null; // Cache für Baum-Daten
    let containerId = null;
    let onKategorieClickCallback = null; // Callback für Kategorie-Klicks
    let isKategorieActiveCallback = null; // Callback für Kategorie-Aktiv-Status
    let onDimensionClickCallback = null; // Callback für Dimension-Klicks
    let isDimensionActiveCallback = null; // Callback für Dimension-Aktiv-Status
    let isDimensionPartiallyActiveCallback = null; // Callback für teilweise aktive Dimension

    // ═══════════════════════════════════════════════════════════════════════════
    // DATEN-STRUKTUR AUFBAU
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Baut die Baumstruktur aus Taxonomie und Bedürfnissen auf
     * @returns {Object} Baumstruktur mit Resonanz → Kategorien → Bedürfnisse
     */
    function buildTreeData() {
        if (treeData) return treeData;

        const taxonomie = typeof TiageTaxonomie !== 'undefined' ? TiageTaxonomie : null;
        const beduerfnisIds = typeof BeduerfnisIds !== 'undefined' ? BeduerfnisIds : null;

        if (!taxonomie || !beduerfnisIds) {
            console.warn('ResonanzTreeView: TiageTaxonomie oder BeduerfnisIds nicht verfügbar');
            return {};
        }

        taxonomie.init();

        const tree = {};

        // Für jede Resonanz-Dimension
        for (const resId in RESONANZ_DIMENSIONEN) {
            const resonanz = RESONANZ_DIMENSIONEN[resId];
            tree[resId] = {
                ...resonanz,
                kategorien: {},
                count: 0
            };

            // Hole alle Kategorien für diese Resonanz (via Taxonomie-Dimensionen)
            for (const dimId of resonanz.taxonomieDimensionen) {
                const kategorien = taxonomie.getKategorienFuerDimension(dimId);

                for (const kategorie of kategorien) {
                    if (!tree[resId].kategorien[kategorie.id]) {
                        tree[resId].kategorien[kategorie.id] = {
                            ...kategorie,
                            nuancen: [],
                            count: 0
                        };
                    }

                    // Hole alle Bedürfnisse für diese Kategorie
                    for (const needId in beduerfnisIds.beduerfnisse) {
                        const need = beduerfnisIds.beduerfnisse[needId];
                        if (need.kategorie === kategorie.id) {
                            tree[resId].kategorien[kategorie.id].nuancen.push({
                                id: needId,
                                ...need
                            });
                            tree[resId].kategorien[kategorie.id].count++;
                            tree[resId].count++;
                        }
                    }
                }
            }
        }

        treeData = tree;
        return tree;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // RENDER FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Rendert den kompletten Baum
     * @param {string} container - Container-Selektor oder ID
     * @param {Object} options - Optionen {onKategorieClick, isKategorieActive, onDimensionClick, isDimensionActive, isDimensionPartiallyActive}
     * @returns {string} HTML-String
     */
    function render(container, options = {}) {
        containerId = container;
        onKategorieClickCallback = options.onKategorieClick || null;
        isKategorieActiveCallback = options.isKategorieActive || null;
        onDimensionClickCallback = options.onDimensionClick || null;
        isDimensionActiveCallback = options.isDimensionActive || null;
        isDimensionPartiallyActiveCallback = options.isDimensionPartiallyActive || null;

        const tree = buildTreeData();

        let html = '<div class="resonanz-tree-view">';
        html += '<div class="tree-header">';
        html += '<h3>🌳 Resonanz-Hierarchie</h3>';
        html += '<span class="tree-subtitle">Resonanz → Kategorien → Nuancen</span>';
        html += '</div>';

        // Resonanz-Ebenen rendern (standardmäßig eingeklappt)
        for (const resId in tree) {
            html += renderResonanzNode(tree[resId]);
        }

        html += '</div>';
        return html;
    }

    /**
     * Rendert einen Resonanz-Knoten (Ebene 1)
     */
    function renderResonanzNode(resonanz) {
        const isExpanded = expandedNodes.has(resonanz.id);
        const expandIcon = isExpanded ? '▼' : '▶';
        const expandedClass = isExpanded ? ' expanded' : '';

        // Prüfe ob Dimension aktiv ist (für Filter-Visualisierung)
        const isActive = isDimensionActiveCallback ? isDimensionActiveCallback(resonanz.id) : false;
        const isPartiallyActive = isDimensionPartiallyActiveCallback ? isDimensionPartiallyActiveCallback(resonanz.id) : false;
        const activeClass = isActive ? ' active' : (isPartiallyActive ? ' partially-active' : '');

        let html = `
        <div class="tree-node tree-node-resonanz${expandedClass}${activeClass}" data-node-id="${resonanz.id}">
            <div class="tree-node-header"
                 style="--node-color: ${resonanz.color};">
                <span class="tree-expand-icon" onclick="ResonanzTreeView.toggleNode('${resonanz.id}'); event.stopPropagation();">${expandIcon}</span>
                <span class="tree-node-content" onclick="ResonanzTreeView.onDimensionClick('${resonanz.id}'); event.stopPropagation();">
                    <span class="tree-node-icon">${resonanz.icon}</span>
                    <span class="tree-node-label">${resonanz.label}</span>
                    <span class="tree-node-count">(${resonanz.count})</span>
                    <span class="tree-node-description">${resonanz.beschreibung}</span>
                </span>
            </div>`;

        // Kategorien (Ebene 2)
        if (isExpanded) {
            html += '<div class="tree-node-children">';
            for (const katId in resonanz.kategorien) {
                html += renderKategorieNode(resonanz.kategorien[katId], resonanz.id);
            }
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    /**
     * Rendert einen Kategorie-Knoten (Ebene 2)
     */
    function renderKategorieNode(kategorie, parentResId) {
        const nodeId = `${parentResId}-${kategorie.id}`;
        const isExpanded = expandedNodes.has(nodeId);
        const expandIcon = isExpanded ? '▼' : '▶';
        const expandedClass = isExpanded ? ' expanded' : '';

        // Prüfe ob Kategorie aktiv ist (für Mehrfachauswahl-Filter)
        const isActive = isKategorieActiveCallback ? isKategorieActiveCallback(kategorie.id) : false;
        const activeClass = isActive ? ' active' : '';

        let html = `
        <div class="tree-node tree-node-kategorie${expandedClass}${activeClass}" data-node-id="${nodeId}" data-kategorie-id="${kategorie.id}">
            <div class="tree-node-header"
                 style="--node-color: ${kategorie.color};">
                <span class="tree-expand-icon" onclick="ResonanzTreeView.toggleNode('${nodeId}'); event.stopPropagation();">${expandIcon}</span>
                <span class="tree-node-content" onclick="ResonanzTreeView.onKategorieClick('${kategorie.id}'); event.stopPropagation();">
                    <span class="tree-node-label">${kategorie.label}</span>
                    <span class="tree-node-id">${kategorie.id}</span>
                    <span class="tree-node-count">(${kategorie.count})</span>
                </span>
            </div>`;

        // Nuancen/Bedürfnisse (Ebene 3)
        if (isExpanded) {
            html += '<div class="tree-node-children">';
            for (const nuance of kategorie.nuancen) {
                html += renderNuanceNode(nuance);
            }
            html += '</div>';
        }

        html += '</div>';
        return html;
    }

    /**
     * Rendert einen Nuance-Knoten (Ebene 3 - Leaf)
     */
    function renderNuanceNode(nuance) {
        return `
        <div class="tree-node tree-node-nuance" data-node-id="${nuance.id}">
            <div class="tree-node-header">
                <span class="tree-node-bullet">•</span>
                <span class="tree-node-label">${nuance.label}</span>
                <span class="tree-node-id">${nuance.id}</span>
            </div>
        </div>`;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // INTERAKTION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Toggle Expand/Collapse eines Knotens
     */
    function toggleNode(nodeId) {
        if (expandedNodes.has(nodeId)) {
            expandedNodes.delete(nodeId);
        } else {
            expandedNodes.add(nodeId);
        }
        reRender();
    }

    /**
     * Behandelt Klick auf eine Kategorie (für Filter)
     */
    function onKategorieClick(kategorieId) {
        if (onKategorieClickCallback) {
            onKategorieClickCallback(kategorieId);
        }
    }

    /**
     * Behandelt Klick auf eine Dimension (für Filter)
     */
    function onDimensionClick(dimensionId) {
        if (onDimensionClickCallback) {
            onDimensionClickCallback(dimensionId);
        }
    }

    /**
     * Expandiert alle Knoten
     */
    function expandAll() {
        const tree = buildTreeData();

        // Alle Resonanz-Knoten
        for (const resId in tree) {
            expandedNodes.add(resId);

            // Alle Kategorie-Knoten
            for (const katId in tree[resId].kategorien) {
                expandedNodes.add(`${resId}-${katId}`);
            }
        }

        reRender();
    }

    /**
     * Kollabiert alle Knoten
     */
    function collapseAll() {
        expandedNodes.clear();
        reRender();
    }

    /**
     * Re-rendert den Baum
     */
    function reRender() {
        if (!containerId) return;

        const container = document.querySelector(containerId);
        if (!container) return;

        const newHtml = render(containerId);
        container.innerHTML = newHtml;
    }

    /**
     * Setzt den Baum zurück und lädt neu
     */
    function reset() {
        treeData = null;
        expandedNodes.clear();
        reRender();
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Rendering
        render,
        reRender,

        // Interaktion
        toggleNode,
        onKategorieClick,
        onDimensionClick,
        expandAll,
        collapseAll,
        reset,

        // Daten-Zugriff
        getTreeData: buildTreeData,

        // Konstanten
        RESONANZ_DIMENSIONEN
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResonanzTreeView;
}
