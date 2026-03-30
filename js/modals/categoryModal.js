/**
 * CategoryModal — Kategorie-Navigation & Tag-Tooltips
 * =====================================================
 * Refactored: Definition logic → definitionModal.js
 *             Match logic     → matchModal.js
 *
 * Contains:
 * - openCategoryModal, openSingleCategoryModal, navigateCategory*
 * - getCategoryModalContent, renderTagWithTooltip, switchTooltipType
 * - openTagTooltip, closeTagTooltip, closeCategoryModal
 *
 * Dependencies (all globally available):
 * - window.tiageData, window.archetypeOrder
 * - window.categoryDescriptions, window.categoryNames
 * - window.getIchArchetype(), window.getPartnerArchetype()
 * - getScoreColor, getBarClass, getTagTooltip (global)
 * - TiageMatching.MatchModal.getModalContextPartner() (from matchModal.js)
 * - window.updateArchetypeGrid, updateTheme, updateMyType, etc.
 */

(function() {
'use strict';

function getIchArchetype()     { return window.getIchArchetype     ? window.getIchArchetype()     : (window.currentArchetype || 'single'); }
function getPartnerArchetype() { return window.getPartnerArchetype ? window.getPartnerArchetype() : (window.selectedPartner  || null); }

// ========================================
// Category Modal
// ========================================
let currentModalCategory = 'A';

function openCategoryModal() {
    TiageMatching.MatchModal.setModalContextPartner(null);
    const categories = ['A', 'B', 'C', 'D', 'E', 'F'];
    document.getElementById('modalTitle').textContent = 'Alle Kategorien';
    document.getElementById('modalBody').innerHTML = categories.map(cat => getCategoryModalContent(cat)).join('');
    document.getElementById('categoryModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function openSingleCategoryModal(category) {
    currentModalCategory = category;
    const catData = window.categoryDescriptions[category] || {};
    const name = catData.name || window.categoryNames[category] || category;
    document.getElementById('modalTitle').textContent = `Kategorie ${category}`;
    document.getElementById('modalBody').innerHTML = getCategoryModalContent(category);
    document.getElementById('categoryModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function navigateCategoryPrev() {
    const categories = ['A', 'B', 'C', 'D', 'E', 'F'];
    const currentIndex = categories.indexOf(currentModalCategory);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : categories.length - 1;
    openSingleCategoryModal(categories[prevIndex]);
}

function navigateCategoryNext() {
    const categories = ['A', 'B', 'C', 'D', 'E', 'F'];
    const currentIndex = categories.indexOf(currentModalCategory);
    const nextIndex = currentIndex < categories.length - 1 ? currentIndex + 1 : 0;
    openSingleCategoryModal(categories[nextIndex]);
}

function getCategoryModalContent(cat) {
    const catData = window.categoryDescriptions[cat] || {};
    const name = catData.name || window.categoryNames[cat] || cat;
    const desc = catData.description || 'Beschreibung nicht verfügbar';
    const subDims = catData.subDimensions || [];

    const partnerId = TiageMatching.MatchModal.getModalContextPartner() || getPartnerArchetype();
    const interactionKey = `${getIchArchetype()}_${partnerId}`;
    const interaction = window.tiageData.interactions[interactionKey] || {};
    const scores = interaction.scores || {};
    const value = scores[cat]?.value || 0;
    const scoreColor = getScoreColor(value);
    const barClass = getBarClass(value);

    const myArch = window.tiageData.archetypes[getIchArchetype()];
    const partnerArch = window.tiageData.archetypes[partnerId];
    const comboText = `${myArch?.name || '?'} + ${partnerArch?.name || '?'}`;

    const categories = ['A', 'B', 'C', 'D', 'E', 'F'];
    const catIndex = categories.indexOf(cat);
    const prevCat = categories[catIndex > 0 ? catIndex - 1 : categories.length - 1];
    const nextCat = categories[catIndex < categories.length - 1 ? catIndex + 1 : 0];

    return `
        <div class="category-nav-row">
            <button class="category-nav-btn" onclick="navigateCategoryPrev()">
                ‹ ${prevCat}
            </button>
            <span class="category-nav-indicator">${catIndex + 1} / 6</span>
            <button class="category-nav-btn" onclick="navigateCategoryNext()">
                ${nextCat} ›
            </button>
        </div>

        <div class="modal-category">
            <div class="modal-category-header">
                <div class="modal-category-letter">${cat}</div>
                <div class="modal-category-name">${name}</div>
            </div>
            <div class="match-modal-score" style="margin: 12px 0;">
                <span class="match-modal-score-label">${comboText}</span>
                <span class="match-modal-score-value" style="color: ${scoreColor}">${value}</span>
            </div>
            <div class="modal-category-desc">${desc}</div>
            ${subDims.length > 0 ? `
                <div class="modal-subdimensions">
                    ${subDims.map(sd => renderTagWithTooltip(sd, cat, getIchArchetype(), partnerId)).join('')}
                </div>
            ` : ''}
        </div>
    `;
}

// ========================================
// Tag Tooltips
// ========================================
function renderTagWithTooltip(tagName, category, type1Id, type2Id) {
    const tooltip = getTagTooltip(type1Id, type2Id, category, tagName);
    const type1 = window.tiageData.archetypes[type1Id];
    const type2 = window.tiageData.archetypes[type2Id];
    const color1 = type1?.color || 'var(--primary)';
    const color2 = type2?.color || 'var(--primary)';

    const allTypes = window.archetypeOrder.map(id => {
        const arch = window.tiageData.archetypes[id];
        return `
            <button class="type-switch-btn ${id === type1Id ? 'active' : ''}"
                    style="color: ${arch?.color || 'var(--text-secondary)'}"
                    onclick="event.stopPropagation(); switchTooltipType('${id}', 'ich', '${category}')">
                <span class="dot" style="background: ${arch?.color}"></span>
                ${arch?.name || id}
            </button>
        `;
    }).join('');

    const partnerTypes = window.archetypeOrder.map(id => {
        const arch = window.tiageData.archetypes[id];
        return `
            <button class="type-switch-btn ${id === type2Id ? 'active' : ''}"
                    style="color: ${arch?.color || 'var(--text-secondary)'}"
                    onclick="event.stopPropagation(); switchTooltipType('${id}', 'partner', '${category}')">
                <span class="dot" style="background: ${arch?.color}"></span>
                ${arch?.name || id}
            </button>
        `;
    }).join('');

    return `
        <span class="tag-tooltip-container">
            <span class="modal-subdim-tag" onclick="openTagTooltip(this.parentElement, '${category}')">${tagName}</span>
            <div class="tag-tooltip">
                <button class="tag-tooltip-close" onclick="closeTagTooltip()">&times;</button>
                <div class="tag-tooltip-header">${tagName}</div>

                <div class="tag-tooltip-type-switcher">
                    <span class="type-switch-label">Ich:</span>
                    ${allTypes}
                </div>
                <div class="tag-tooltip-type-switcher">
                    <span class="type-switch-label">Partner:</span>
                    ${partnerTypes}
                </div>

                <div class="tag-tooltip-body">
                    <div class="tag-tooltip-perspective">
                        <span class="tag-tooltip-type-name" style="color: ${color1}">${tooltip.type1Name}:</span>
                        <span class="tag-tooltip-type-text">${tooltip.type1Perspective}</span>
                    </div>
                    <div class="tag-tooltip-perspective">
                        <span class="tag-tooltip-type-name" style="color: ${color2}">${tooltip.type2Name}:</span>
                        <span class="tag-tooltip-type-text">${tooltip.type2Perspective}</span>
                    </div>
                    <div class="tag-tooltip-dynamic">${tooltip.dynamic}</div>
                </div>
            </div>
        </span>
    `;
}

// ========================================
// Tooltip Type Switching
// ========================================
function switchTooltipType(typeId, role, category) {
    if (role === 'ich') {
        if (typeof TiageState !== 'undefined') {
            TiageState.setArchetype('ich', typeId);
        }

        document.getElementById('archetypeSelect').value = typeId;
        const ichSelect = document.getElementById('ichSelect');
        const mobileIchSelect = document.getElementById('mobileIchSelect');
        if (ichSelect) ichSelect.value = typeId;
        if (mobileIchSelect) mobileIchSelect.value = typeId;

        updateArchetypeGrid('ich', typeId);
        updateTheme();
        updateMyType();
        updatePartnerSelector();
        updateTopAndChallenge();
        updatePartnerView();
    } else {
        TiageMatching.MatchModal.setModalContextPartner(typeId);

        if (typeof TiageState !== 'undefined') {
            TiageState.setArchetype('partner', typeId);
        }

        const partnerSelect = document.getElementById('partnerSelect');
        const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
        if (partnerSelect) partnerSelect.value = typeId;
        if (mobilePartnerSelect) mobilePartnerSelect.value = typeId;

        updateArchetypeGrid('partner', typeId);

        document.querySelectorAll('.partner-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.id === typeId);
        });
        updatePartnerView();
    }

    updateComparisonView();
    openSingleCategoryModal(category);
}

// ========================================
// Tooltip Open / Close
// ========================================
let activeTooltipElement = null;
let activeTagElement = null;

function openTagTooltip(container, category) {
    const tooltip = container.querySelector('.tag-tooltip');
    const tag = container.querySelector('.modal-subdim-tag');
    if (!tooltip || !tag) return;

    if (activeTooltipElement === tooltip) {
        closeTagTooltip();
        return;
    }

    closeTagTooltip();

    activeTooltipElement = tooltip;
    activeTagElement = tag;
    tooltip.classList.add('active');
    tag.classList.add('active');

    const tooltipWidth = Math.min(360, window.innerWidth * 0.92);
    const left = (window.innerWidth - tooltipWidth) / 2;
    const top = 60;

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    tooltip.style.width = tooltipWidth + 'px';
}

function closeTagTooltip() {
    if (activeTooltipElement) {
        activeTooltipElement.classList.remove('active');
        activeTooltipElement = null;
    }
    if (activeTagElement) {
        activeTagElement.classList.remove('active');
        activeTagElement = null;
    }
    document.querySelectorAll('.tag-tooltip.active').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.modal-subdim-tag.active').forEach(t => t.classList.remove('active'));
}

function closeCategoryModal(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('categoryModal').classList.remove('active');
    document.body.style.overflow = '';
    TiageMatching.MatchModal.setModalContextPartner(null);
}

// ========================================
// Keyboard
// ========================================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCategoryModal();
    }
});

// ========================================
// Feedback Stubs (deprecated)
// ========================================
function openFeedbackModal() { console.log('feedbackModal entfernt - bitte commentModal verwenden'); }
function openFeedbackModalWithContext(ctx) { console.log('feedbackModal entfernt - bitte commentModal verwenden'); }
function closeFeedbackModal(event) { }

// ========================================
// Exports
// ========================================
window.openCategoryModal           = openCategoryModal;
window.openSingleCategoryModal     = openSingleCategoryModal;
window.navigateCategoryPrev        = navigateCategoryPrev;
window.navigateCategoryNext        = navigateCategoryNext;
window.getCategoryModalContent     = getCategoryModalContent;
window.renderTagWithTooltip        = renderTagWithTooltip;
window.switchTooltipType           = switchTooltipType;
window.openTagTooltip              = openTagTooltip;
window.closeTagTooltip             = closeTagTooltip;
window.closeCategoryModal          = closeCategoryModal;
window.openFeedbackModal           = openFeedbackModal;
window.openFeedbackModalWithContext = openFeedbackModalWithContext;
window.closeFeedbackModal          = closeFeedbackModal;

})();
