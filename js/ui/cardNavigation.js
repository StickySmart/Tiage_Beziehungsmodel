// ═══════════════════════════════════════════════════════════════════════════════
// js/ui/cardNavigation.js
// Extracted from app-main.js
// Contains: scrollToCard, updateNavDots, navigatePrev, navigateNext,
//           updateLegendCategories
// ═══════════════════════════════════════════════════════════════════════════════

(function() {
    'use strict';

function scrollToCard(index) {
    const carousel = document.getElementById('carousel');
    const cardWidth = window.innerWidth;
    carousel.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
}

const TOTAL_PAGES = 4;

function updateNavDots() {
    const carousel = document.getElementById('carousel');
    const cardWidth = window.innerWidth;
    const currentCard = Math.round(carousel.scrollLeft / cardWidth);

    document.querySelectorAll('.nav-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentCard);
    });

    // Update arrow states
    const arrows = document.querySelectorAll('.nav-arrow');
    if (arrows.length >= 2) {
        arrows[0].disabled = currentCard === 0;
        arrows[1].disabled = currentCard === TOTAL_PAGES - 1;
    }

    // Load feedback when on page 4
    if (currentCard === 3) {
        if (typeof window.loadFeedback === 'function') window.loadFeedback();
    }
}

function navigatePrev() {
    const carousel = document.getElementById('carousel');
    const cardWidth = window.innerWidth;
    const currentCard = Math.round(carousel.scrollLeft / cardWidth);
    if (currentCard > 0) {
        scrollToCard(currentCard - 1);
    }
}

function navigateNext() {
    const carousel = document.getElementById('carousel');
    const cardWidth = window.innerWidth;
    const currentCard = Math.round(carousel.scrollLeft / cardWidth);
    if (currentCard < TOTAL_PAGES - 1) {
        scrollToCard(currentCard + 1);
    }
}

// Legend Categories
function updateLegendCategories() {
    const container = document.getElementById('legendCategories');
    const categories = ['A', 'B', 'C', 'D', 'E', 'F'];

    // Get current interaction scores
    const interactionKey = `${window.getIchArchetype()}_${window.getPartnerArchetype()}`;
    const interaction = (window.tiageData.interactions[interactionKey]) || {};
    const scores = interaction.scores || {};

    const myArch = window.tiageData.archetypes[window.getIchArchetype()];
    const partnerArch = window.tiageData.archetypes[window.getPartnerArchetype()];
    const myName = myArch?.name || window.getIchArchetype();
    const partnerName = partnerArch?.name || window.getPartnerArchetype();

    // Show which combination is displayed
    const headerText = window.getIchArchetype() === window.getPartnerArchetype()
        ? `${myName} (Ich) mit ${myName}`
        : `${myName} (Ich) mit ${partnerName}`;

    container.innerHTML = `
        <div style="margin-bottom: 15px; padding: 10px; background: var(--bg-dark); border-radius: 10px; text-align: center;">
            <span style="color: var(--text-muted); font-size: var(--font-sm);">Aktuelle Auswahl:</span>
            <div style="color: var(--primary); font-weight: 600; font-size: var(--font-base);">${headerText}</div>
        </div>
    ` + categories.map(cat => {
        const catData = window.categoryDescriptions[cat] || {};
        const name = catData.name || window.categoryNames[cat] || cat;
        const desc = catData.description || 'Beschreibung nicht verfügbar';
        const value = scores[cat]?.value || 0;
        const scoreColor = TiageChartUtils.getScoreColor(value);

        return `
            <div class="legend-category-item" onclick="openSingleCategoryModal('${cat}')">
                <div class="legend-category-letter">${cat}</div>
                <div class="legend-category-content">
                    <div class="legend-category-name">${name}</div>
                    <div class="legend-category-desc">${desc}</div>
                </div>
                <div style="font-weight: 700; font-size: var(--font-md); color: ${scoreColor}; min-width: 50px; text-align: right;">${value}</div>
            </div>
        `;
    }).join('');
}


    // ── Exports ──────────────────────────────────────────────────────────────
    window.scrollToCard = scrollToCard;
    window.updateNavDots = updateNavDots;
    window.navigatePrev = navigatePrev;
    window.navigateNext = navigateNext;
    window.updateLegendCategories = updateLegendCategories;

})();
