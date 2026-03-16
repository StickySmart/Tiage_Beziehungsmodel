/**
 * CategoryModal — Kategorie-, Definition- und Match-Modals
 * =========================================================
 * Extracted from app-main.js (lines ~1319-2357)
 *
 * Contains:
 * - openCategoryModal, openSingleCategoryModal, navigateCategory*
 * - getCategoryModalContent, renderTagWithTooltip, switchTooltipType
 * - openTagTooltip, closeTagTooltip, closeCategoryModal
 * - openDefinitionModal, closeDefinitionModal, showArchetypeInfoByType
 * - navigateDefinition*, navigateDefinitionToIndex, confirmDefinitionSelection
 * - openMatchModal, getMatchModalContent, toggleMatchModalView
 * - generateDynamicPro, generateDynamicContra, generateSynthesisSection
 * - getShortDef
 *
 * Dependencies (all globally available):
 * - window.tiageData, window.archetypeOrder, window.archetypeDescriptions
 * - window.categoryDescriptions, window.categoryNames, window.icons
 * - window.getIchArchetype(), window.getPartnerArchetype()
 * - window.setIchArchetype(), window.setPartnerArchetype()
 * - TiageState, TiageI18n, getScoreColor, getBarClass (global)
 */

(function() {
'use strict';

function getIchArchetype()     { return window.getIchArchetype     ? window.getIchArchetype()     : (window.currentArchetype || 'single'); }
function getPartnerArchetype() { return window.getPartnerArchetype ? window.getPartnerArchetype() : (window.selectedPartner  || null); }

// Modal Functions
function openCategoryModal() {
    // Reset modal context when opening directly (uses page 2 selection)
    modalContextPartner = null;
    const categories = ['A', 'B', 'C', 'D', 'E', 'F'];
    document.getElementById('modalTitle').textContent = 'Alle Kategorien';
    document.getElementById('modalBody').innerHTML = categories.map(cat => getCategoryModalContent(cat)).join('');
    document.getElementById('categoryModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

let currentModalCategory = 'A'; // Track current category for navigation

function openSingleCategoryModal(category) {
    currentModalCategory = category;
    // Don't reset modalContextPartner here - it may be set from match modal
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

    // Use modalContextPartner if set (from match modal), otherwise use getPartnerArchetype() (from page 2)
    const partnerId = modalContextPartner || getPartnerArchetype();
    const interactionKey = `${getIchArchetype()}_${partnerId}`;
    const interaction = window.tiageData.interactions[interactionKey] || {};
    const scores = interaction.scores || {};
    const value = scores[cat]?.value || 0;
    const scoreColor = getScoreColor(value);
    const barClass = getBarClass(value);

    const myArch = window.tiageData.archetypes[getIchArchetype()];
    const partnerArch = window.tiageData.archetypes[partnerId];
    const comboText = `${myArch?.name || '?'} + ${partnerArch?.name || '?'}`;
    const contextText = `${comboText} | ${name}`;

    // Get category position for navigation
    const categories = ['A', 'B', 'C', 'D', 'E', 'F'];
    const catIndex = categories.indexOf(cat);
    const prevCat = categories[catIndex > 0 ? catIndex - 1 : categories.length - 1];
    const nextCat = categories[catIndex < categories.length - 1 ? catIndex + 1 : 0];
    const prevName = window.categoryNames[prevCat] || prevCat;
    const nextName = window.categoryNames[nextCat] || nextCat;

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

// Render a tag with tooltip
function renderTagWithTooltip(tagName, category, type1Id, type2Id) {
    const tooltip = getTagTooltip(type1Id, type2Id, category, tagName);
    const type1 = window.tiageData.archetypes[type1Id];
    const type2 = window.tiageData.archetypes[type2Id];
    const color1 = type1?.color || 'var(--primary)';
    const color2 = type2?.color || 'var(--primary)';

    // Build type switcher options
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

// Switch type from tooltip and refresh modal
function switchTooltipType(typeId, role, category) {
    if (role === 'ich') {
        getIchArchetype() = typeId;
        getIchArchetype() = typeId;

        // Sync with TiageState for persistence
        if (typeof TiageState !== 'undefined') {
            TiageState.setArchetype('ich', typeId);
        }

        // Update main UI
        document.getElementById('archetypeSelect').value = typeId;
        const ichSelect = document.getElementById('ichSelect');
        const mobileIchSelect = document.getElementById('mobileIchSelect');
        if (ichSelect) ichSelect.value = typeId;
        if (mobileIchSelect) mobileIchSelect.value = typeId;

        // Sync archetype grid highlighting
        updateArchetypeGrid('ich', typeId);

        updateTheme();
        updateMyType();
        updatePartnerSelector();
        updateTopAndChallenge();
        updatePartnerView();
    } else {
        getPartnerArchetype() = typeId;
        getPartnerArchetype() = typeId;
        modalContextPartner = typeId;

        // Sync with TiageState for persistence
        if (typeof TiageState !== 'undefined') {
            TiageState.setArchetype('partner', typeId);
        }

        // Sync select dropdowns
        const partnerSelect = document.getElementById('partnerSelect');
        const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
        if (partnerSelect) partnerSelect.value = typeId;
        if (mobilePartnerSelect) mobilePartnerSelect.value = typeId;

        // Sync archetype grid highlighting
        updateArchetypeGrid('partner', typeId);

        // Update partner selection buttons
        document.querySelectorAll('.partner-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.id === typeId);
        });
        updatePartnerView();
    }

    // Update score display
    updateComparisonView();

    // Refresh the category modal with new types
    openSingleCategoryModal(category);
}

// Active tooltip tracking
let activeTooltipElement = null;
let activeTagElement = null;

// Toggle tag tooltip on click
function openTagTooltip(container, category) {
    const tooltip = container.querySelector('.tag-tooltip');
    const tag = container.querySelector('.modal-subdim-tag');
    if (!tooltip || !tag) return;

    // If this tooltip is already open, close it
    if (activeTooltipElement === tooltip) {
        closeTagTooltip();
        return;
    }

    // Close any other open tooltip first
    closeTagTooltip();

    // Activate this tooltip and tag
    activeTooltipElement = tooltip;
    activeTagElement = tag;
    tooltip.classList.add('active');
    tag.classList.add('active');

    // Position at top of viewport so it doesn't get cut off
    const tooltipWidth = Math.min(360, window.innerWidth * 0.92);
    const left = (window.innerWidth - tooltipWidth) / 2;
    const top = 60; // Fixed position near top

    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
    tooltip.style.width = tooltipWidth + 'px';
}

// Close tag tooltip
function closeTagTooltip() {
    if (activeTooltipElement) {
        activeTooltipElement.classList.remove('active');
        activeTooltipElement = null;
    }
    if (activeTagElement) {
        activeTagElement.classList.remove('active');
        activeTagElement = null;
    }
    // Also close any other open tooltips and tags
    document.querySelectorAll('.tag-tooltip.active').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.modal-subdim-tag.active').forEach(t => t.classList.remove('active'));
}

function closeCategoryModal(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('categoryModal').classList.remove('active');
    document.body.style.overflow = '';
    // Reset modal context when closing
    modalContextPartner = null;
}

// Definition Modal Functions
function openDefinitionModal(archetypeId) {
    const def = window.archetypeDescriptions[archetypeId];
    if (!def) return;

    const arch = window.tiageData.archetypes[archetypeId];
    const color = arch?.color || 'var(--primary)';
    const icon = window.icons[archetypeId] || '?';

    document.getElementById('definitionModalTitle').innerHTML = `
        <span style="color: ${color}">${icon}</span> ${def.name}
    `;

    document.getElementById('definitionModalBody').innerHTML = `
        <div class="definition-long">${def.longDef}</div>

        <div class="definition-section">
            <div class="definition-section-title">Kernprinzipien</div>
            <ul class="definition-list principles">
                ${def.keyPrinciples.map(p => `<li>${p}</li>`).join('')}
            </ul>
        </div>

        <div class="definition-section">
            <div class="definition-section-title">Das ist NICHT dasselbe wie</div>
            <ul class="definition-list not-same">
                ${def.notTheSameAs.map(n => `<li>${n}</li>`).join('')}
            </ul>
        </div>

        <div class="definition-section">
            <div class="definition-section-title">Varianten</div>
            <ul class="definition-list variants">
                ${def.variants.map(v => `<li>${v}</li>`).join('')}
            </ul>
        </div>
    `;

    document.getElementById('definitionModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDefinitionModal(event) {
    if (event && event.target !== event.currentTarget) return;
    document.getElementById('definitionModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// Definition Modal Swipe Navigation
// ========================================
let currentDefinitionIndex = 0;
let currentDefinitionPerson = 'ich'; // Track whether showing 'ich' or 'partner'
let definitionTouchStartX = 0;

function handleDefinitionTouchStart(e) {
    definitionTouchStartX = e.touches[0].clientX;
}

function handleDefinitionTouchEnd(e) {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = definitionTouchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
        navigateDefinition(diff > 0 ? 1 : -1);
    }
}

function navigateDefinition(direction) {
    currentDefinitionIndex += direction;
    if (currentDefinitionIndex < 0) currentDefinitionIndex = window.archetypeOrder.length - 1;
    if (currentDefinitionIndex >= window.archetypeOrder.length) currentDefinitionIndex = 0;

    const newArchetype = window.archetypeOrder[currentDefinitionIndex];
    showArchetypeInfoByType(newArchetype);

    // Sync dropdown and dispatch change event to trigger UI updates
    if (currentDefinitionPerson === 'ich') {
        const ichSelect = document.getElementById('ichSelect');
        if (ichSelect) {
            ichSelect.value = newArchetype;
            ichSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
    } else if (currentDefinitionPerson === 'partner') {
        const partnerSelect = document.getElementById('partnerSelect');
        if (partnerSelect) {
            partnerSelect.value = newArchetype;
            partnerSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }
}

// Alias for button onclick
function navigateDefinitionModal(direction) {
    navigateDefinition(direction);
}

function showArchetypeInfoByType(archetypeId) {
    if (!window.tiageData || !window.tiageData.archetypes || !window.tiageData.archetypes[archetypeId]) {
        console.error('Data not available for archetype:', archetypeId);
        return;
    }

    const arch = window.tiageData.archetypes[archetypeId];
    const def = window.archetypeDescriptions[archetypeId];

    // Get localized archetype window.tiageData from i18n (with fallback to hardcoded def)
    const localizedArch = {
        name: TiageI18n.t(`archetypes.${archetypeId}.name`, arch.name),
        shortDef: TiageI18n.t(`archetypes.${archetypeId}.shortDef`, def?.shortDef || ''),
        longDef: TiageI18n.t(`archetypes.${archetypeId}.longDef`, def?.longDef || ''),
        keyPrinciples: TiageI18n.t(`archetypes.${archetypeId}.keyPrinciples`, def?.keyPrinciples || []),
        notTheSameAs: TiageI18n.t(`archetypes.${archetypeId}.notTheSameAs`, def?.notTheSameAs || []),
        variants: TiageI18n.t(`archetypes.${archetypeId}.variants`, def?.variants || [])
    };

    // Top navigation dots and swipe hint
    const swipeHint = TiageI18n.t('archetypeModal.swipeHint', '← Wischen zum Navigieren →');
    let topNav = `
        <div class="definition-nav-dots" style="display: flex; justify-content: center; gap: 8px; margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid var(--border);">
            ${window.archetypeOrder.map((id, index) => `
                <span class="definition-dot${index === currentDefinitionIndex ? ' active' : ''}"
                      onclick="navigateDefinitionToIndex(${index})"
                      style="width: 10px; height: 10px; border-radius: 50%; background: ${index === currentDefinitionIndex ? 'var(--primary)' : 'var(--border)'}; cursor: pointer; transition: all 0.2s;"></span>
            `).join('')}
        </div>
        <div style="text-align: center; font-size: 11px; color: var(--text-muted); margin-bottom: 15px;">${swipeHint}</div>
    `;

    let modalContent = topNav + `
        <div class="modal-category">
            <div class="modal-category-header">
                <div class="modal-category-letter" style="background: ${arch.color}; width: 40px; height: 40px; font-size: 20px;">${window.icons[archetypeId]}</div>
                <div class="modal-category-name">${localizedArch.name}</div>
            </div>
            <div class="modal-category-desc">${localizedArch.shortDef || ''}</div>
    `;

    if (def || localizedArch.longDef) {
        modalContent += `
            <div class="definition-long" style="margin-top: 15px;">${localizedArch.longDef || ''}</div>
        `;

        const keyPrinciples = localizedArch.keyPrinciples;
        if (keyPrinciples && keyPrinciples.length > 0) {
            modalContent += `
                <div class="definition-section">
                    <div class="definition-section-title">${TiageI18n.t('archetypeModal.keyPrinciples', 'Kernprinzipien')}</div>
                    <ul class="definition-list principles">
                        ${keyPrinciples.map(p => `<li>${p}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        const notTheSameAs = localizedArch.notTheSameAs;
        if (notTheSameAs && notTheSameAs.length > 0) {
            modalContent += `
                <div class="definition-section">
                    <div class="definition-section-title">${TiageI18n.t('archetypeModal.notTheSameAs', 'Das ist NICHT')}</div>
                    <ul class="definition-list not-same">
                        ${notTheSameAs.map(n => `<li>${n}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        const variants = localizedArch.variants;
        if (variants && variants.length > 0) {
            modalContent += `
                <div class="definition-section">
                    <div class="definition-section-title">${TiageI18n.t('archetypeModal.variants', 'Varianten')}</div>
                    <ul class="definition-list variants">
                        ${variants.map(v => `<li>${v}</li>`).join('')}
                    </ul>
                </div>
            `;
        }
    }

    // Add Pathos & Logos section
    const pathos = arch.pathos || '';
    const logos = arch.logos || '';

    if (pathos || logos) {
        modalContent += `
            <div class="definition-section" style="margin-top: 20px; border-top: 1px solid var(--border); padding-top: 15px;">
                <div class="definition-section-title" style="margin-bottom: 15px;">${TiageI18n.t('archetypeModal.pathosLogos', 'Pathos & Logos')}</div>
        `;

        if (pathos) {
            modalContent += `
                <div style="margin-bottom: 15px; padding: 12px; background: rgba(231,76,60,0.1); border-radius: 10px; border-left: 3px solid #e74c3c;">
                    <div style="color: #e74c3c; font-weight: 600; font-size: 13px; margin-bottom: 6px;">${TiageI18n.t('archetypeModal.pathosLabel', 'Pathos (Emotionale Ebene)')}</div>
                    <p style="color: var(--text-secondary); font-style: italic; line-height: 1.5; font-size: 12px; margin: 0;">${pathos}</p>
                </div>
            `;
        }

        if (logos) {
            modalContent += `
                <div style="padding: 12px; background: rgba(52,152,219,0.1); border-radius: 10px; border-left: 3px solid #3498db;">
                    <div style="color: #3498db; font-weight: 600; font-size: 13px; margin-bottom: 6px;">${TiageI18n.t('archetypeModal.logosLabel', 'Logos (Rationale Ebene)')}</div>
                    <p style="color: var(--text-secondary); font-style: italic; line-height: 1.5; font-size: 12px; margin: 0;">${logos}</p>
                </div>
            `;
        }

        modalContent += `</div>`;
    }

    modalContent += '</div>';

    // Add navigation dots and confirm button
    modalContent += `
        <div class="definition-nav-dots" style="display: flex; justify-content: center; gap: 8px; margin-top: 15px; padding-top: 15px; border-top: 1px solid var(--border);">
            ${window.archetypeOrder.map((id, index) => `
                <span class="definition-dot${index === currentDefinitionIndex ? ' active' : ''}"
                      onclick="navigateDefinitionToIndex(${index})"
                      style="width: 10px; height: 10px; border-radius: 50%; background: ${index === currentDefinitionIndex ? 'var(--primary)' : 'var(--border)'}; cursor: pointer; transition: all 0.2s;"></span>
            `).join('')}
        </div>
        <div style="text-align: center; font-size: 11px; color: var(--text-muted); margin-top: 8px;">${swipeHint}</div>
        <button onclick="confirmDefinitionSelection()" style="
            display: block;
            width: 100%;
            margin-top: 15px;
            padding: 12px 20px;
            background: var(--primary);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s;
        " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
            ${TiageI18n.t('archetypeModal.confirmSelection', 'Auswahl übernehmen')}
        </button>
    `;

    const definitionLabel = TiageI18n.t('archetypeModal.definition', 'Definition');
    document.getElementById('definitionModalTitle').textContent = `${localizedArch.name} - ${definitionLabel}`;
    document.getElementById('definitionModalBody').innerHTML = modalContent;
    document.getElementById('definitionModalBody').scrollTop = 0;
}

function navigateDefinitionToIndex(index) {
    currentDefinitionIndex = index;
    const newArchetype = window.archetypeOrder[index];
    showArchetypeInfoByType(newArchetype);

    // Sync dropdown and dispatch change event to trigger UI updates
    if (currentDefinitionPerson === 'ich') {
        const ichSelect = document.getElementById('ichSelect');
        if (ichSelect) {
            ichSelect.value = newArchetype;
            ichSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
    } else if (currentDefinitionPerson === 'partner') {
        const partnerSelect = document.getElementById('partnerSelect');
        if (partnerSelect) {
            partnerSelect.value = newArchetype;
            partnerSelect.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }
}

function confirmDefinitionSelection() {
    console.log('confirmDefinitionSelection called');
    console.log('currentDefinitionIndex:', currentDefinitionIndex);
    console.log('window.archetypeOrder:', window.archetypeOrder);

    const selectedArchetype = window.archetypeOrder[currentDefinitionIndex];
    console.log('selectedArchetype:', selectedArchetype);
    console.log('currentDefinitionPerson:', currentDefinitionPerson);

    if (currentDefinitionPerson === 'ich') {
        // Update main dropdown
        getIchArchetype() = selectedArchetype;
        const selectElement = document.getElementById('archetypeSelect');
        if (selectElement) {
            selectElement.value = selectedArchetype;
            // Dispatch change event to ensure listeners are notified
            selectElement.dispatchEvent(new Event('change', { bubbles: true }));
        }
        console.log('Updated getIchArchetype() to:', getIchArchetype());
        updateAll();
    } else {
        // Update partner selection
        console.log('Calling selectPartner with:', selectedArchetype);
        selectPartner(selectedArchetype);
    }

    // Close modal
    document.getElementById('definitionModal').classList.remove('active');
    document.body.style.overflow = '';
    console.log('Modal closed, selection complete');
}

// Get short definition for tooltip
function getShortDef(archetypeId) {
    return window.archetypeDescriptions[archetypeId]?.shortDef || '';
}

// Store current match window.tiageData for modal access
let currentTopMatch = { id: null, score: 0 };
let currentChallenge = { id: null, score: 0 };
let modalContextPartner = null; // Track which partner to use in category modal
let currentMatchModalView = TiageState.get('ui.matchModalView') || 'pathos'; // pathos or logos
let currentMatchModalData = null; // Store current modal window.tiageData for toggle refresh

// Match Modal Toggle Function
function toggleMatchModalView(view) {
    currentMatchModalView = view;
    TiageState.set('ui.matchModalView', view);

    // Update toggle button styles
    document.getElementById('matchTogglePathos').classList.toggle('active', view === 'pathos');
    document.getElementById('matchToggleLogos').classList.toggle('active', view === 'logos');

    // Refresh modal content if window.tiageData is available
    if (currentMatchModalData) {
        const content = getMatchModalContent(
            currentMatchModalData.partnerArch,
            currentMatchModalData.interaction,
            currentMatchModalData.scores,
            currentMatchModalData.scoreColor,
            currentMatchModalData.myArch
        );
        document.getElementById('modalBody').innerHTML = content;
    }
}

// Generate dynamic Pro items based on current view (Pathos/Logos)
function generateDynamicPro(myArch, partnerArch, view) {
    const items = [];
    const ichId = myArch.id;
    const partnerId = partnerArch.id;

    if (view === 'pathos') {
        // Emotional/Pathos perspective - use PathosTextGenerator if available
        if (typeof PathosTextGenerator !== 'undefined') {
            const resonance = PathosTextGenerator.calculateResonance?.(myArch, partnerArch) || {};
            if (resonance.emotional > 0.6) items.push('Starke emotionale Resonanz zwischen euren Energien');
            if (resonance.intuitive > 0.5) items.push('Intuitives Verständnis füreinander');
        }
        // Fallback emotional pros
        if (ichId === partnerId) {
            items.push('Tiefes Gefühl des Verstandenwerdens');
            items.push('Geteilte emotionale Sprache');
        }
        if (items.length === 0) {
            items.push('Potenzial für emotionale Verbindung');
            items.push('Raum für gegenseitiges Wachstum');
        }
    } else {
        // Rational/Logos perspective - use LogosTextGenerator if available
        if (typeof LogosTextGenerator !== 'undefined') {
            const analysis = LogosTextGenerator.analyzeCompatibility?.(myArch, partnerArch) || {};
            if (analysis.structuralMatch > 0.6) items.push('Kompatible Beziehungsstrukturen');
            if (analysis.valueAlignment > 0.5) items.push('Übereinstimmende Grundwerte');
        }
        // Fallback structural pros
        if (ichId === partnerId) {
            items.push('Identische Beziehungsphilosophie');
            items.push('Gleiche Erwartungen an Verbindlichkeit');
        }
        if (items.length === 0) {
            items.push('Klare Kommunikationsbasis möglich');
            items.push('Strukturelle Anpassung machbar');
        }
    }
    return items;
}

// Generate dynamic Contra items based on current view (Pathos/Logos)
function generateDynamicContra(myArch, partnerArch, view) {
    const items = [];
    const ichId = myArch.id;
    const partnerId = partnerArch.id;

    // Use IntegratedSynthesisTextGenerator for conflicts if available
    if (typeof IntegratedSynthesisTextGenerator !== 'undefined') {
        const conflicts = IntegratedSynthesisTextGenerator.identifyPartnerConflicts(
            ichId, partnerId, null, null
        );

        if (view === 'pathos') {
            // Emotional perspective on conflicts
            conflicts.forEach(conflict => {
                if (conflict.dynamics?.core_wound) {
                    items.push(conflict.dynamics.core_wound);
                }
            });
            // Inner conflicts
            const innerData = IntegratedSynthesisTextGenerator.window.tiageData?.innerConflicts;
            if (innerData?.[ichId]?.shadow) {
                items.push(`Dein Schatten: ${innerData[ichId].shadow.substring(0, 80)}...`);
            }
        } else {
            // Rational perspective on conflicts
            conflicts.forEach(conflict => {
                items.push(`${conflict.title}: ${conflict.dynamics?.pattern || ''}`);
            });
        }
    }

    // Fallback contras
    if (items.length === 0) {
        if (view === 'pathos') {
            items.push('Emotionale Frequenzen können divergieren');
            items.push('Risiko von Missverständnissen auf Gefühlsebene');
        } else {
            items.push('Unterschiedliche Erwartungen möglich');
            items.push('Kommunikationsarbeit erforderlich');
        }
    }

    return items;
}

// Generate synthesis section with psychological depth
function generateSynthesisSection(myArch, partnerArch) {
    if (typeof IntegratedSynthesisTextGenerator === 'undefined') {
        return '';
    }

    const ichId = myArch.id;
    const partnerId = partnerArch.id;

    // Get inner conflicts
    const innerData = IntegratedSynthesisTextGenerator.window.tiageData?.innerConflicts || {};
    const ichConflict = innerData[ichId];
    const partnerConflict = innerData[partnerId];

    let conflictHtml = '';

    // ═══════════════════════════════════════════════════════════════════
    // DEIN INNERER KONFLIKT - Mit voller Tiefe
    // ═══════════════════════════════════════════════════════════════════
    if (ichConflict) {
        conflictHtml += `
            <div class="match-modal-inner-conflict">
                <div class="match-modal-inner-conflict-title">🔮 Dein innerer Konflikt: ${ichConflict.core}</div>
                <div class="match-modal-inner-conflict-text">${ichConflict.description}</div>
                ${ichConflict.psychological ? `
                    <div style="margin-top: 10px; padding: 8px; background: rgba(255, 193, 7, 0.05); border-radius: 6px;">
                        <div style="font-size: 11px; color: #f39c12; font-weight: 600; margin-bottom: 4px;">🧠 Psychologisch</div>
                        <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${ichConflict.psychological}</div>
                    </div>
                ` : ''}
                ${ichConflict.shadow ? `
                    <div style="margin-top: 8px; padding: 8px; background: rgba(128, 0, 128, 0.08); border-radius: 6px;">
                        <div style="font-size: 11px; color: #9b59b6; font-weight: 600; margin-bottom: 4px;">🌑 Schattenseite</div>
                        <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${ichConflict.shadow}</div>
                    </div>
                ` : ''}
                ${ichConflict.growth ? `
                    <div style="margin-top: 8px; padding: 8px; background: rgba(39, 174, 96, 0.08); border-radius: 6px;">
                        <div style="font-size: 11px; color: #27ae60; font-weight: 600; margin-bottom: 4px;">🌱 Wachstumspotenzial</div>
                        <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${ichConflict.growth}</div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // ═══════════════════════════════════════════════════════════════════
    // PARTNER-KONFLIKT - Mit voller Tiefe
    // ═══════════════════════════════════════════════════════════════════
    if (partnerConflict && ichId !== partnerId) {
        conflictHtml += `
            <div class="match-modal-inner-conflict" style="margin-top: 12px;">
                <div class="match-modal-inner-conflict-title">🔮 Partner-Konflikt: ${partnerConflict.core}</div>
                <div class="match-modal-inner-conflict-text">${partnerConflict.description}</div>
                ${partnerConflict.psychological ? `
                    <div style="margin-top: 10px; padding: 8px; background: rgba(255, 193, 7, 0.05); border-radius: 6px;">
                        <div style="font-size: 11px; color: #f39c12; font-weight: 600; margin-bottom: 4px;">🧠 Psychologisch</div>
                        <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${partnerConflict.psychological}</div>
                    </div>
                ` : ''}
                ${partnerConflict.shadow ? `
                    <div style="margin-top: 8px; padding: 8px; background: rgba(128, 0, 128, 0.08); border-radius: 6px;">
                        <div style="font-size: 11px; color: #9b59b6; font-weight: 600; margin-bottom: 4px;">🌑 Schattenseite</div>
                        <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${partnerConflict.shadow}</div>
                    </div>
                ` : ''}
                ${partnerConflict.growth ? `
                    <div style="margin-top: 8px; padding: 8px; background: rgba(39, 174, 96, 0.08); border-radius: 6px;">
                        <div style="font-size: 11px; color: #27ae60; font-weight: 600; margin-bottom: 4px;">🌱 Wachstumspotenzial</div>
                        <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5;">${partnerConflict.growth}</div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // Get partner conflicts (interpersonelle Spannungen)
    const partnerConflicts = IntegratedSynthesisTextGenerator.identifyPartnerConflicts(
        ichId, partnerId, null, null
    );

    // ═══════════════════════════════════════════════════════════════════
    // HAUPTSPANNUNGSFELD - Mit voller Tiefe
    // ═══════════════════════════════════════════════════════════════════
    let partnerConflictHtml = '';
    if (partnerConflicts.length > 0) {
        const mainConflict = partnerConflicts[0];
        partnerConflictHtml = `
            <div style="margin-top: 16px; padding: 12px; background: rgba(231, 76, 60, 0.08); border-radius: 8px; border: 1px solid rgba(231, 76, 60, 0.2);">
                <div style="font-weight: 600; color: var(--danger); font-size: var(--font-sm); margin-bottom: 8px;">
                    ⚡ Hauptspannungsfeld: ${mainConflict.title}
                </div>

                <!-- Dynamik-Sektion -->
                <div style="margin-bottom: 12px;">
                    <div style="font-size: 11px; color: #e74c3c; font-weight: 600; margin-bottom: 6px;">📊 Dynamik</div>
                    ${mainConflict.dynamics?.pattern ? `
                        <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5; margin-bottom: 6px;">
                            <strong>Muster:</strong> ${mainConflict.dynamics.pattern}
                        </div>
                    ` : ''}
                    ${mainConflict.dynamics?.escalation ? `
                        <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5; margin-bottom: 6px;">
                            <strong>Eskalation:</strong> ${mainConflict.dynamics.escalation}
                        </div>
                    ` : ''}
                    ${mainConflict.dynamics?.core_wound ? `
                        <div style="font-size: var(--font-xs); color: #e74c3c; line-height: 1.5; padding: 6px; background: rgba(231,76,60,0.1); border-radius: 4px;">
                            <strong>💔 Kernwunde:</strong> ${mainConflict.dynamics.core_wound}
                        </div>
                    ` : ''}
                </div>

                <!-- Lösungs-Sektion -->
                <div style="padding-top: 12px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div style="font-size: 11px; color: var(--success); font-weight: 600; margin-bottom: 6px;">💡 Lösungsweg</div>
                    ${mainConflict.resolution?.understanding ? `
                        <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5; margin-bottom: 6px;">
                            <strong>Verständnis:</strong> ${mainConflict.resolution.understanding}
                        </div>
                    ` : ''}
                    ${mainConflict.resolution?.practical ? `
                        <div style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5; margin-bottom: 6px;">
                            <strong>Praktisch:</strong> ${mainConflict.resolution.practical}
                        </div>
                    ` : ''}
                    ${mainConflict.resolution?.growth ? `
                        <div style="font-size: var(--font-xs); color: var(--success); line-height: 1.5; padding: 6px; background: rgba(39,174,96,0.1); border-radius: 4px;">
                            <strong>🌱 Wachstum:</strong> ${mainConflict.resolution.growth}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    return `
        <div class="match-modal-section synthese">
            <div class="match-modal-section-title">🎯 Psychologische Tiefe</div>
            ${conflictHtml}
            ${partnerConflictHtml}
        </div>
    `;
}

// Match Modal Functions
function openMatchModal(type) {
    const matchData = type === 'top' ? currentTopMatch : currentChallenge;
    if (!matchData.id) return;

    // Set the modal context to use this match's partner
    modalContextPartner = matchData.id;

    const myArch = window.tiageData.archetypes[getIchArchetype()];
    const partnerArch = window.tiageData.archetypes[matchData.id];
    const interactionKey = `${getIchArchetype()}_${matchData.id}`;
    const interaction = window.tiageData.interactions[interactionKey] || {};
    const scores = interaction.scores || {};

    const title = type === 'top' ? 'Top Match' : 'Challenge';
    const scoreColor = getScoreColor(matchData.score);

    // Store window.tiageData for toggle refresh
    currentMatchModalData = {
        myArch,
        partnerArch,
        interaction,
        scores,
        scoreColor
    };

    // Initialize toggle buttons to current view state
    setTimeout(() => {
        const pathosBtn = document.getElementById('matchTogglePathos');
        const logosBtn = document.getElementById('matchToggleLogos');
        if (pathosBtn && logosBtn) {
            pathosBtn.classList.toggle('active', currentMatchModalView === 'pathos');
            logosBtn.classList.toggle('active', currentMatchModalView === 'logos');
        }
    }, 0);

    document.getElementById('modalTitle').textContent = `${myArch.name} + ${partnerArch.name}`;
    document.getElementById('modalBody').innerHTML = getMatchModalContent(partnerArch, interaction, scores, scoreColor, myArch);
    document.getElementById('categoryModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function getMatchModalContent(partnerArch, interaction, scores, scoreColor, myArch) {
    const categories = ['A', 'B', 'C', 'D', 'E', 'F'];
    const overall = interaction.overall || 0;
    const isIdenticalType = myArch.id === partnerArch.id;

    const categoryBars = categories.map(cat => {
        const value = scores[cat]?.value || 0;
        const barClass = getBarClass(value);
        const name = window.categoryNames[cat] || cat;

        // Special note for identical types on category A (Beziehungsphilosophie)
        const isPhilosophyCategory = cat === 'A' && isIdenticalType;
        const specialNote = isPhilosophyCategory
            ? '<div style="font-size: 10px; color: var(--success); margin-top: 2px;">Identische Grundüberzeugung</div>'
            : '';

        return `
            <div class="match-modal-bar-row clickable" onclick="openSingleCategoryModal('${cat}')">
                <span class="match-modal-bar-label">${cat}</span>
                <div class="match-modal-bar-container">
                    <div class="match-modal-bar ${barClass}" style="width: ${value}%">
                        <span class="match-modal-bar-value">${value}%</span>
                    </div>
                    ${specialNote}
                </div>
                <span class="match-modal-bar-name">${name}</span>
            </div>
        `;
    }).join('');

    // Generate dynamic Pro/Contra based on current view (Pathos/Logos)
    const dynamicPro = generateDynamicPro(myArch, partnerArch, currentMatchModalView);
    const dynamicContra = generateDynamicContra(myArch, partnerArch, currentMatchModalView);

    // Combine static (from JSON) and dynamic items
    const staticPro = interaction.pro || [];
    const staticContra = interaction.contra || [];

    // Use dynamic items first, then add unique static items
    const combinedPro = [...dynamicPro];
    staticPro.forEach(p => {
        if (!combinedPro.some(dp => dp.toLowerCase().includes(p.toLowerCase().substring(0, 20)))) {
            combinedPro.push(p);
        }
    });

    const combinedContra = [...dynamicContra];
    staticContra.forEach(c => {
        if (!combinedContra.some(dc => dc.toLowerCase().includes(c.toLowerCase().substring(0, 20)))) {
            combinedContra.push(c);
        }
    });

    const proItems = combinedPro.map(p => `<li>${p}</li>`).join('') || `<li>${TiageI18n.t('ui.noData', 'Keine Daten')}</li>`;
    const contraItems = combinedContra.map(c => `<li>${c}</li>`).join('') || `<li>${TiageI18n.t('ui.noData', 'Keine Daten')}</li>`;

    // Perspective indicator
    const perspectiveLabel = currentMatchModalView === 'pathos'
        ? '🔥 Pathos-Perspektive (emotional)'
        : '🧠 Logos-Perspektive (rational)';

    // Generate synthesis section
    const synthesisSection = generateSynthesisSection(myArch, partnerArch);

    // Special banner for identical types
    const identicalTypeBanner = isIdenticalType ? `
        <div style="background: linear-gradient(135deg, rgba(46, 204, 113, 0.15), rgba(46, 204, 113, 0.05));
                    border: 1px solid var(--success); border-radius: 10px; padding: 12px; margin-bottom: 15px; text-align: center;">
            <div style="font-weight: 600; color: var(--success); margin-bottom: 4px;">✓ Identischer Beziehungstyp</div>
            <div style="font-size: var(--font-sm); color: var(--text-secondary);">
                Ihr teilt dieselbe Grundüberzeugung über Beziehungen
            </div>
        </div>
    ` : '';

    const comboText = `${myArch.name} + ${partnerArch.name}`;
    const myDef = window.archetypeDescriptions[myArch.id]?.shortDef || '';
    const partnerDef = window.archetypeDescriptions[partnerArch.id]?.shortDef || '';

    return `
        <div class="modal-feedback-btn" onclick="openFeedbackModalWithContext('${comboText}')">
            💬 Feedback zu ${comboText}
        </div>

        <div class="match-modal-header">
            <div class="match-modal-icon" style="background: ${partnerArch.color}">${window.icons[partnerArch.id]}</div>
            <div class="match-modal-info">
                <h3 style="color: ${partnerArch.color}">
                    ${partnerArch.name}
                    <span class="type-info-icon" onclick="openDefinitionModal('${partnerArch.id}')" title="${TiageI18n.t('ui.showDefinition', 'Definition anzeigen')}">ℹ</span>
                </h3>
                <p>${partnerArch.shortDescription || ''}</p>
            </div>
        </div>

        ${identicalTypeBanner}

        <div class="type-definitions-compact" style="background: var(--bg-dark); border-radius: 10px; padding: 12px; margin-bottom: 15px; font-size: var(--font-sm);">
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <div style="flex: 1; min-width: 200px;">
                    <span style="color: ${myArch.color}; font-weight: 600;">${window.icons[myArch.id]} ${myArch.name}</span>
                    <span class="type-info-icon" onclick="openDefinitionModal('${myArch.id}')" style="margin-left: 4px;">ℹ</span>
                    <div style="color: var(--text-muted); margin-top: 4px; line-height: 1.4;">${myDef}</div>
                </div>
                <div style="flex: 1; min-width: 200px;">
                    <span style="color: ${partnerArch.color}; font-weight: 600;">${window.icons[partnerArch.id]} ${partnerArch.name}</span>
                    <span class="type-info-icon" onclick="openDefinitionModal('${partnerArch.id}')" style="margin-left: 4px;">ℹ</span>
                    <div style="color: var(--text-muted); margin-top: 4px; line-height: 1.4;">${partnerDef}</div>
                </div>
            </div>
        </div>

        <div class="match-modal-score">
            <span class="match-modal-score-label">Beziehungsqualität ${isIdenticalType ? '(gleicher Typ)' : 'mit ' + myArch.name}</span>
            <span class="match-modal-score-value" style="color: ${scoreColor}">${overall}</span>
        </div>

        <div class="match-modal-categories">
            <div class="match-modal-categories-title">Kategorie-Bewertungen</div>
            ${categoryBars}
        </div>

        <div class="match-modal-perspective">${perspectiveLabel}</div>

        <div class="match-modal-section pro">
            <div class="match-modal-section-title">✓ Was funktioniert</div>
            <ul class="match-modal-list">${proItems}</ul>
        </div>

        <div class="match-modal-section contra">
            <div class="match-modal-section-title">✗ Herausforderungen</div>
            <ul class="match-modal-list">${contraItems}</ul>
        </div>

        ${synthesisSection}
    `;
}

// Close modal on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeCategoryModal();
    }
});

// ==========================================
// FEEDBACK SYSTEM (entfernt - commentModal wird verwendet)
// ==========================================
// Leere Stubs um JavaScript-Fehler zu vermeiden
function openFeedbackModal() { console.log('feedbackModal entfernt - bitte commentModal verwenden'); }
function openFeedbackModalWithContext(ctx) { console.log('feedbackModal entfernt - bitte commentModal verwenden'); }
function closeFeedbackModal(event) { }
function initStarRatings() { }
// submitFeedback entfernt - wird nicht mehr verwendet

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════
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
window.openDefinitionModal         = openDefinitionModal;
window.closeDefinitionModal        = closeDefinitionModal;
window.navigateDefinition          = navigateDefinition;
window.navigateDefinitionModal     = navigateDefinitionModal;
window.navigateDefinitionToIndex   = navigateDefinitionToIndex;
window.confirmDefinitionSelection  = confirmDefinitionSelection;
window.showArchetypeInfoByType     = showArchetypeInfoByType;
window.getShortDef                 = getShortDef;
window.openMatchModal              = openMatchModal;
window.getMatchModalContent        = getMatchModalContent;
window.toggleMatchModalView        = toggleMatchModalView;
window.generateDynamicPro         = generateDynamicPro;
window.generateDynamicContra      = generateDynamicContra;
window.generateSynthesisSection   = generateSynthesisSection;
window.openFeedbackModal           = openFeedbackModal;
window.openFeedbackModalWithContext = openFeedbackModalWithContext;
window.closeFeedbackModal          = closeFeedbackModal;

})(); // end CategoryModal IIFE
