/**
 * CATEGORY BARS UI MODULE
 *
 * Renders horizontal category bars (A-F) with color-coded progress indicators.
 * Part of Refactoring Plan Phase 3 - Low-Risk UI Module extraction.
 *
 * Dependencies:
 * - TiageTooltips.categoryNames (category labels)
 * - TiageChartUtils.getBarClass (color classification)
 * - EventBus (for modal actions)
 *
 * @version 1.0.0
 * @since 2026-02-24
 * © 2025-2026 Ti-age.de Alle Rechte vorbehalten.
 */
var CategoryBars = (function() {
    'use strict';

    /**
     * Updates the category bars display with given scores
     * @param {Object} scores - Category scores object { A: {value: 75}, B: {value: 50}, ... }
     */
    function update(scores) {
        const container = document.getElementById('categoryBars');
        if (!container) {
            console.warn('[CategoryBars] Container #categoryBars not found');
            return;
        }

        const categories = ['A', 'B', 'C', 'D', 'E', 'F'];

        // Dependencies: TiageTooltips for names, TiageChartUtils for bar classes
        const categoryNames = (typeof TiageTooltips !== 'undefined')
            ? TiageTooltips.categoryNames
            : {};
        const getBarClass = (typeof TiageChartUtils !== 'undefined')
            ? TiageChartUtils.getBarClass
            : function() { return ''; };

        container.innerHTML = categories.map(cat => {
            const value = scores[cat]?.value || 0;
            const barClass = getBarClass(value);
            const name = categoryNames[cat] || cat;

            return `
                <div class="category-row" data-action="open-category-modal" data-category="${cat}">
                    <span class="category-label">${cat}</span>
                    <div class="category-bar-wrap">
                        <div class="category-bar-container">
                            <div class="category-bar ${barClass}" style="width: ${value}%">
                                <span class="category-bar-value">${value}%</span>
                            </div>
                        </div>
                        <div class="category-name">${name}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Attach event listeners for data-action attributes
        attachEventListeners(container);
    }

    /**
     * Attaches event listeners to category rows
     * @private
     */
    function attachEventListeners(container) {
        container.querySelectorAll('[data-action="open-category-modal"]').forEach(row => {
            row.addEventListener('click', function() {
                const category = this.dataset.category;
                if (typeof EventBus !== 'undefined') {
                    EventBus.emit('category:open-modal', { category: category });
                } else if (typeof openSingleCategoryModal === 'function') {
                    // Fallback: Direct function call (legacy)
                    openSingleCategoryModal(category);
                }
            });
        });
    }

    /**
     * Initialize the module
     * Subscribes to relevant events
     */
    function init() {
        // Subscribe to score updates if EventBus is available
        if (typeof EventBus !== 'undefined') {
            EventBus.on('scores:updated', function(data) {
                if (data && data.categories) {
                    update(data.categories);
                }
            });
        }

        console.log('[CategoryBars] Initialized');
    }

    // Public API
    return {
        init: init,
        update: update
    };
})();

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', CategoryBars.init);
} else {
    CategoryBars.init();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CategoryBars;
}
