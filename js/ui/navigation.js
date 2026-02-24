/**
 * NAVIGATION UI MODULE
 *
 * Handles scrolling between cards and navigation dots/indicators.
 * Part of Refactoring Plan Phase 3 - Low-Risk UI Module extraction.
 *
 * @version 1.0.0
 * @since 2026-02-24
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */
var TiageNavigation = (function() {
    'use strict';

    /**
     * Scrolls to a specific card index
     * @param {number} index - Card index to scroll to
     */
    function scrollToCard(index) {
        const cards = document.querySelectorAll('.profile-card, .comparison-card');
        if (cards[index]) {
            cards[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
            updateNavDots();
        }
    }

    /**
     * Updates navigation dots to reflect current scroll position
     */
    function updateNavDots() {
        const cards = document.querySelectorAll('.profile-card, .comparison-card');
        const dots = document.querySelectorAll('.nav-dot');

        if (cards.length === 0 || dots.length === 0) return;

        // Find which card is currently in view
        let currentIndex = 0;
        const viewportMiddle = window.scrollY + (window.innerHeight / 2);

        cards.forEach((card, index) => {
            const cardTop = card.offsetTop;
            const cardBottom = cardTop + card.offsetHeight;

            if (viewportMiddle >= cardTop && viewportMiddle < cardBottom) {
                currentIndex = index;
            }
        });

        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    /**
     * Scroll to top of page
     */
    function scrollToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    /**
     * Scroll to specific element by ID or selector
     * @param {string} selector - CSS selector or element ID
     */
    function scrollToElement(selector) {
        const element = document.querySelector(selector) || document.getElementById(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /**
     * Initialize navigation
     * Sets up scroll listeners and nav dot click handlers
     */
    function init() {
        // Update nav dots on scroll
        window.addEventListener('scroll', updateNavDots);

        // Initial update
        updateNavDots();

        // Attach click handlers to nav dots
        document.querySelectorAll('.nav-dot').forEach((dot, index) => {
            dot.addEventListener('click', function() {
                scrollToCard(index);
            });
        });

        console.log('[TiageNavigation] Initialized');
    }

    // Public API
    return {
        init: init,
        scrollToCard: scrollToCard,
        scrollToTop: scrollToTop,
        scrollToElement: scrollToElement,
        updateNavDots: updateNavDots
    };
})();

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', TiageNavigation.init);
} else {
    TiageNavigation.init();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageNavigation;
}
