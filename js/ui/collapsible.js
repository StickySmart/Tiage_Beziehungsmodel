/**
 * TIAGE Collapsible UI Module
 *
 * Handles collapse/expand functionality for dimensions and factors.
 * Extracted from app-main.js as part of Phase 3 modularization.
 *
 * @version 1.0.0
 * @since 2026-02-05
 */
const TiageCollapsible = (function() {
    'use strict';

    // Track global fold/unfold state
    let allDimensionsCollapsed = false;

    /**
     * Toggle a collapsible element by ID
     * @param {string} id - Element ID to toggle
     */
    function toggleCollapsible(id) {
        const el = document.getElementById(id);
        if (el) {
            el.classList.toggle('open');
        }
    }

    /**
     * Toggle dimension collapse for Dominanz/Orientierung sections
     * @param {HTMLElement} element - The element to toggle
     */
    function toggleDimensionCollapse(element) {
        if (element) {
            element.classList.toggle('collapsed');
        }
    }

    /**
     * Toggle all dimensions AND desktop factors collapse/expand at once
     */
    function toggleAllDimensionsCollapse() {
        const allDimensions = document.querySelectorAll('.collapsible-dimension');
        const allFactors = document.querySelectorAll('.desktop-factor-item');

        // Get both desktop and mobile buttons
        const desktopBtn = document.getElementById('foldUnfoldAllBtn');
        const mobileBtn = document.getElementById('mobileFoldUnfoldBtn');

        allDimensionsCollapsed = !allDimensionsCollapsed;

        // Toggle collapsible dimensions
        allDimensions.forEach(function(dim) {
            if (allDimensionsCollapsed) {
                dim.classList.add('collapsed');
            } else {
                dim.classList.remove('collapsed');
            }
        });

        // Toggle desktop factor items
        allFactors.forEach(function(factor) {
            if (allDimensionsCollapsed) {
                factor.classList.add('collapsed');
            } else {
                factor.classList.remove('collapsed');
            }
        });

        // Update both buttons' appearance
        var buttons = [desktopBtn, mobileBtn].filter(function(btn) { return btn !== null; });
        buttons.forEach(function(btn) {
            var icon = btn.querySelector('.fold-unfold-icon');
            var text = btn.querySelector('.fold-unfold-text');

            if (allDimensionsCollapsed) {
                icon.textContent = '▶';
                text.textContent = 'Unfold';
                btn.classList.add('collapsed-state');
            } else {
                icon.textContent = '▼';
                text.textContent = 'Fold';
                btn.classList.remove('collapsed-state');
            }
        });

        // Update desktop factor content when expanding
        // Note: updateDesktopFactorContent remains in app-main.js due to complex dependencies
        if (!allDimensionsCollapsed && typeof window.updateDesktopFactorContent === 'function') {
            window.updateDesktopFactorContent();
        }
    }

    /**
     * Toggle single desktop factor expand/collapse
     * @param {HTMLElement} element - The factor element to toggle
     */
    function toggleDesktopFactor(element) {
        if (!element) return;

        var wasCollapsed = element.classList.contains('collapsed');
        element.classList.toggle('collapsed');

        // Update the fold/unfold button state based on current state
        updateDesktopFactorFoldButton();

        // Update content when expanding
        if (wasCollapsed && typeof window.updateDesktopFactorContent === 'function') {
            window.updateDesktopFactorContent();
        }
    }

    /**
     * Update fold button based on current state of all collapsible elements
     */
    function updateDesktopFactorFoldButton() {
        var allDimensions = document.querySelectorAll('.collapsible-dimension');
        var allFactors = document.querySelectorAll('.desktop-factor-item');
        var desktopBtn = document.getElementById('foldUnfoldAllBtn');
        var mobileBtn = document.getElementById('mobileFoldUnfoldBtn');

        // Check if all are collapsed (both dimensions and factors)
        var allDimensionsCollapsedCheck = Array.from(allDimensions).every(function(d) {
            return d.classList.contains('collapsed');
        });
        var allFactorsCollapsed = Array.from(allFactors).every(function(f) {
            return f.classList.contains('collapsed');
        });
        var allCollapsed = allDimensionsCollapsedCheck && allFactorsCollapsed;

        allDimensionsCollapsed = allCollapsed;

        // Update both buttons
        var buttons = [desktopBtn, mobileBtn].filter(function(btn) { return btn !== null; });
        buttons.forEach(function(btn) {
            var icon = btn.querySelector('.fold-unfold-icon');
            var text = btn.querySelector('.fold-unfold-text');

            if (allCollapsed) {
                icon.textContent = '▶';
                text.textContent = 'Unfold';
                btn.classList.add('collapsed-state');
            } else {
                icon.textContent = '▼';
                text.textContent = 'Fold';
                btn.classList.remove('collapsed-state');
            }
        });
    }

    /**
     * Get current collapsed state
     * @returns {boolean} Whether all dimensions are collapsed
     */
    function isAllCollapsed() {
        return allDimensionsCollapsed;
    }

    // Public API
    return {
        toggleCollapsible: toggleCollapsible,
        toggleDimensionCollapse: toggleDimensionCollapse,
        toggleAllDimensionsCollapse: toggleAllDimensionsCollapse,
        toggleDesktopFactor: toggleDesktopFactor,
        updateDesktopFactorFoldButton: updateDesktopFactorFoldButton,
        isAllCollapsed: isAllCollapsed
    };
})();

// Export to window for backwards compatibility with action handlers
window.toggleCollapsible = TiageCollapsible.toggleCollapsible;
window.toggleDimensionCollapse = TiageCollapsible.toggleDimensionCollapse;
window.toggleAllDimensionsCollapse = TiageCollapsible.toggleAllDimensionsCollapse;
window.toggleDesktopFactor = TiageCollapsible.toggleDesktopFactor;
window.updateDesktopFactorFoldButton = TiageCollapsible.updateDesktopFactorFoldButton;

// Module export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageCollapsible;
}
