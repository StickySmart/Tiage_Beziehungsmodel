/**
 * DefinitionModal — Archetyp-Info & Definition Modal
 * ====================================================
 * Extracted from categoryModal.js
 *
 * Contains:
 * - openDefinitionModal, closeDefinitionModal
 * - showArchetypeInfo, showArchetypeInfoByType
 * - navigateDefinition, navigateDefinitionModal, navigateDefinitionToIndex
 * - confirmDefinitionSelection
 * - handleDefinitionTouchStart/End (swipe navigation)
 * - getShortDef
 *
 * Dependencies (all globally available):
 * - window.tiageData, window.archetypeOrder, window.archetypeDescriptions
 * - window.icons, TiageI18n
 * - window.getIchArchetype(), window.getPartnerArchetype()
 * - window.updateAll(), window.selectPartner()
 */

(function() {
'use strict';

// ========================================
// State
// ========================================
let currentDefinitionIndex = 0;
let currentDefinitionPerson = 'ich';
let definitionTouchStartX = 0;

// ========================================
// Eigenschaften-Toggle System
// ========================================
let eigenschaftenData = null;
let eigenschaftenStates = {}; // { archetyp: { eigenschaftId: true/false } }

// CSS für Toggle-Switches (einmalig injizieren)
(function injectToggleCSS() {
    if (document.getElementById('eigenschaften-toggle-css')) return;
    const style = document.createElement('style');
    style.id = 'eigenschaften-toggle-css';
    style.textContent = `
        .eigenschaften-section { margin-top: 15px; padding-top: 12px; border-top: 1px solid var(--border); }
        .eigenschaften-title { font-size: 11px; font-weight: 700; color: var(--text-muted); letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 8px; }
        .eigenschaften-liste { display: flex; flex-direction: column; gap: 3px; }
        .eigenschaft-row { display: flex; justify-content: space-between; align-items: center; padding: 7px 10px; border-radius: 6px; cursor: pointer; transition: all 0.2s; user-select: none; }
        .eigenschaft-row:hover { background: rgba(255,255,255,0.05); }
        .eigenschaft-row.aktiv .eigenschaft-label { color: var(--text-primary, #e0e0e0); }
        .eigenschaft-row.inaktiv .eigenschaft-label { color: var(--text-muted, #666); opacity: 0.6; }
        .eigenschaft-label { font-size: 12px; flex: 1; }
        .toggle-switch { width: 36px; height: 20px; background: rgba(255,255,255,0.15); border-radius: 10px; position: relative; transition: background 0.2s; flex-shrink: 0; margin-left: 8px; }
        .toggle-switch.aktiv { background: #8b5cf6; }
        .toggle-switch::after { content: ''; position: absolute; width: 16px; height: 16px; background: white; border-radius: 50%; top: 2px; left: 2px; transition: transform 0.2s; }
        .toggle-switch.aktiv::after { transform: translateX(16px); }
    `;
    document.head.appendChild(style);
})();

async function loadEigenschaftenData() {
    if (eigenschaftenData) return eigenschaftenData;
    try {
        const resp = await fetch('profiles/data/archetyp-eigenschaften.json');
        if (resp.ok) {
            const json = await resp.json();
            eigenschaftenData = json.archetypen || {};
        }
    } catch (e) {
        console.warn('[DefinitionModal] Eigenschaften-Daten nicht geladen:', e);
    }
    return eigenschaftenData || {};
}

function getEigenschaftenState(archetypeId) {
    if (!eigenschaftenStates[archetypeId]) {
        eigenschaftenStates[archetypeId] = {};
        const archData = eigenschaftenData?.[archetypeId];
        if (archData?.eigenschaften) {
            archData.eigenschaften.forEach(e => {
                eigenschaftenStates[archetypeId][e.id] = e.default;
            });
        }
        // Aus TiageState laden (persistiert)
        if (typeof TiageState !== 'undefined') {
            const saved = TiageState.get(`eigenschaften.ich.${archetypeId}`);
            if (saved && typeof saved === 'object') {
                Object.assign(eigenschaftenStates[archetypeId], saved);
            }
        }
    }
    return eigenschaftenStates[archetypeId];
}

function toggleEigenschaft(archetypeId, eigenschaftId) {
    const archData = eigenschaftenData?.[archetypeId];
    if (!archData) return;

    const eigenschaft = archData.eigenschaften.find(e => e.id === eigenschaftId);
    if (!eigenschaft) return;

    const states = getEigenschaftenState(archetypeId);
    const neuerStatus = !states[eigenschaftId];
    states[eigenschaftId] = neuerStatus;

    // Bedürfnisse anpassen (mit Lock-Schutz)
    // Schreibt in den Archetyp-Slot der getoggelt wurde
    if (typeof TiageState !== 'undefined') {
        eigenschaft.beduerfnisse.forEach(needId => {
            // Lock-Check
            const lockPath = `profileReview.ich.global.${needId}`;
            const lockData = TiageState.get(lockPath);
            if (lockData && lockData.locked) return;

            const needPath = `flatNeeds.ich.${archetypeId}.${needId}`;
            const current = TiageState.get(needPath) || 50;
            const delta = neuerStatus ? eigenschaft.delta : -eigenschaft.delta;
            const newVal = Math.max(0, Math.min(100, current + delta));
            TiageState.set(needPath, newVal);
            console.log(`[Eigenschaften] ${needId}: ${current} → ${newVal} (${neuerStatus ? '+' : ''}${neuerStatus ? eigenschaft.delta : -eigenschaft.delta})`);

            // Slider-UI sofort aktualisieren
            const container = document.querySelector(`.flat-need-item[data-need-id="${needId}"]`);
            if (container) {
                const slider = container.querySelector('.need-slider');
                const input = container.querySelector('.flat-need-input');
                if (slider) { slider.value = newVal; slider.style.setProperty('--value', newVal + '%'); }
                if (input) input.value = newVal;
            }
        });

        // Eigenschafts-State persistieren
        TiageState.set(`eigenschaften.ich.${archetypeId}`, { ...states });
        TiageState.saveToStorage();
    }

    // Toggle-UI aktualisieren
    updateEigenschaftenUI(archetypeId);
}

function updateEigenschaftenUI(archetypeId) {
    const states = getEigenschaftenState(archetypeId);
    const container = document.getElementById('eigenschaften-liste-' + archetypeId);
    if (!container) return;

    container.querySelectorAll('.eigenschaft-row').forEach(row => {
        const id = row.dataset.id;
        const aktiv = states[id];
        row.className = 'eigenschaft-row ' + (aktiv ? 'aktiv' : 'inaktiv');
        const toggle = row.querySelector('.toggle-switch');
        if (toggle) toggle.className = 'toggle-switch' + (aktiv ? ' aktiv' : '');
    });
}

function getEigenschaftenHtml(archetypeId) {
    console.log('[Eigenschaften] getEigenschaftenHtml called for:', archetypeId, 'eigenschaftenData loaded:', !!eigenschaftenData, 'keys:', eigenschaftenData ? Object.keys(eigenschaftenData) : 'null');
    const archData = eigenschaftenData?.[archetypeId];
    if (!archData?.eigenschaften) {
        console.warn('[Eigenschaften] Keine Daten für:', archetypeId);
        return '';
    }

    const states = getEigenschaftenState(archetypeId);
    const lang = (typeof TiageI18n !== 'undefined') ? TiageI18n.getLanguage() : 'de';
    const title = lang === 'de' ? 'EIGENSCHAFTEN' : 'PROPERTIES';

    const rows = archData.eigenschaften.map(e => {
        const aktiv = states[e.id] ?? e.default;
        const label = (lang !== 'de' && e.label_en) ? e.label_en : e.label;
        return `
            <div class="eigenschaft-row ${aktiv ? 'aktiv' : 'inaktiv'}" data-id="${e.id}" onclick="window._toggleEigenschaft('${archetypeId}', '${e.id}')">
                <span class="eigenschaft-label">${label}</span>
                <div class="toggle-switch${aktiv ? ' aktiv' : ''}"></div>
            </div>`;
    }).join('');

    return `
        <div class="eigenschaften-section">
            <div class="eigenschaften-title">${title}</div>
            <div class="eigenschaften-liste" id="eigenschaften-liste-${archetypeId}">${rows}</div>
        </div>`;
}

// Global handler für onclick in HTML
window._toggleEigenschaft = toggleEigenschaft;

// ========================================
// Open / Close
// ========================================
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
// Swipe Navigation
// ========================================
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

function navigateDefinitionModal(direction) {
    navigateDefinition(direction);
}

// ========================================
// Show Archetype Info (INFO button entry point)
// ========================================
async function showArchetypeInfo(person) {
    const archetype = person === 'ich' ? window.getIchArchetype() : window.getPartnerArchetype();
    if (!window.tiageData || !window.tiageData.archetypes || !window.tiageData.archetypes[archetype]) {
        console.error('Data not available for archetype:', archetype);
        return;
    }

    // Eigenschaften-Daten laden (einmalig)
    await loadEigenschaftenData();

    currentDefinitionIndex = window.archetypeOrder.indexOf(archetype);
    if (currentDefinitionIndex === -1) currentDefinitionIndex = 0;
    currentDefinitionPerson = person;

    showArchetypeInfoByType(archetype);

    document.getElementById('definitionModal').classList.add('active');
    document.body.style.overflow = 'hidden';

    const modal = document.querySelector('#definitionModal .modal');
    modal.ontouchstart = handleDefinitionTouchStart;
    modal.ontouchend = handleDefinitionTouchEnd;
}

// ========================================
// Archetype Sources & Wikipedia Links
// ========================================
const archetypeSources = {
    single:      { quelle: "Bella DePaulo, 'Singled Out' (2006)", kurz: "DePaulo 2006", wiki_de: null, wiki_en: "https://en.wikipedia.org/wiki/Single_person" },
    duo:         { quelle: "Gottman & Silver, 'The Seven Principles for Making Marriage Work' (1999)", kurz: "Gottman 1999", wiki_de: "https://de.wikipedia.org/wiki/Monogamie", wiki_en: null },
    duo_flex:    { quelle: "Easton & Hardy, 'The Ethical Slut' (1997/2017)", kurz: "Easton & Hardy 1997", wiki_de: "https://de.wikipedia.org/wiki/Offene_Beziehung", wiki_en: null },
    solopoly:    { quelle: "Amy Gahran, 'Stepping Off the Relationship Escalator' (2017)", kurz: "Gahran 2017", wiki_de: null, wiki_en: "https://en.wikipedia.org/wiki/Solo_polyamory" },
    polyamor:    { quelle: "Morning Glory Zell-Ravenheart, 'A Bouquet of Lovers' (1990)", kurz: "Zell-Ravenheart 1990", wiki_de: "https://de.wikipedia.org/wiki/Polyamorie", wiki_en: null },
    ra:          { quelle: "Andie Nordgren, 'Relationsanarki i 8 punkter' (2006)", kurz: "Nordgren 2006", wiki_de: "https://de.wikipedia.org/wiki/Beziehungsanarchie", wiki_en: null },
    lat:         { quelle: "Irene Levin, 'Living Apart Together: A New Family Form' (2004)", kurz: "Levin 2004", wiki_de: "https://de.wikipedia.org/wiki/Fernbeziehung", wiki_en: "https://en.wikipedia.org/wiki/Living_apart_together" },
    aromantisch: { quelle: "AVEN/AUREA Community (2005-2006)", kurz: "AVEN 2005", wiki_de: "https://de.wikipedia.org/wiki/Aromantik", wiki_en: null }
};

function getSourceHtml(archetypeId) {
    const src = archetypeSources[archetypeId];
    if (!src) return '';

    const lang = (typeof TiageI18n !== 'undefined') ? TiageI18n.getLanguage() : 'de';
    const wikiUrl = (lang === 'de' ? src.wiki_de : src.wiki_en) || src.wiki_de || src.wiki_en;
    const wikiLabel = wikiUrl && wikiUrl.includes('de.wikipedia') ? 'Wikipedia (DE)' : 'Wikipedia (EN)';

    return `
        <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid var(--border); font-size: 11px; color: var(--text-muted);">
            <div title="${src.quelle}">📚 ${src.kurz}</div>
            ${wikiUrl ? `<a href="${wikiUrl}" target="_blank" rel="noopener noreferrer" style="display: inline-block; margin-top: 4px; color: #8b5cf6; text-decoration: none; font-size: 11px;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">🔗 ${wikiLabel}</a>` : ''}
        </div>
    `;
}

// ========================================
// Render Archetype Info Content
// ========================================
function showArchetypeInfoByType(archetypeId) {
    if (!window.tiageData || !window.tiageData.archetypes || !window.tiageData.archetypes[archetypeId]) {
        console.error('Data not available for archetype:', archetypeId);
        return;
    }

    const arch = window.tiageData.archetypes[archetypeId];
    const def = window.archetypeDescriptions[archetypeId];

    const localizedArch = {
        name: TiageI18n.t(`archetypes.${archetypeId}.name`, arch.name),
        shortDef: TiageI18n.t(`archetypes.${archetypeId}.shortDef`, def?.shortDef || ''),
        longDef: TiageI18n.t(`archetypes.${archetypeId}.longDef`, def?.longDef || ''),
        keyPrinciples: TiageI18n.t(`archetypes.${archetypeId}.keyPrinciples`, def?.keyPrinciples || []),
        notTheSameAs: TiageI18n.t(`archetypes.${archetypeId}.notTheSameAs`, def?.notTheSameAs || []),
        variants: TiageI18n.t(`archetypes.${archetypeId}.variants`, def?.variants || [])
    };

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

    // Eigenschaften-Toggles → verschoben in "Alle Bedürfnisse" Modal (needsModals.js)

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

    // Pathos & Logos section
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

    // Quellenangabe + Wikipedia-Link
    modalContent += getSourceHtml(archetypeId);

    modalContent += '</div>';

    // Bottom navigation dots and confirm button
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

// ========================================
// Index Navigation & Selection
// ========================================
function navigateDefinitionToIndex(index) {
    currentDefinitionIndex = index;
    const newArchetype = window.archetypeOrder[index];
    showArchetypeInfoByType(newArchetype);

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
    const selectedArchetype = window.archetypeOrder[currentDefinitionIndex];

    if (currentDefinitionPerson === 'ich') {
        const selectElement = document.getElementById('archetypeSelect');
        if (selectElement) {
            selectElement.value = selectedArchetype;
            selectElement.dispatchEvent(new Event('change', { bubbles: true }));
        }
        updateAll();
    } else {
        selectPartner(selectedArchetype);
    }

    document.getElementById('definitionModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ========================================
// Utility
// ========================================
function getShortDef(archetypeId) {
    return window.archetypeDescriptions[archetypeId]?.shortDef || '';
}

// ========================================
// Exports
// ========================================
window.openDefinitionModal         = openDefinitionModal;
window.closeDefinitionModal        = closeDefinitionModal;
window.navigateDefinition          = navigateDefinition;
window.navigateDefinitionModal     = navigateDefinitionModal;
window.navigateDefinitionToIndex   = navigateDefinitionToIndex;
window.confirmDefinitionSelection  = confirmDefinitionSelection;
window.showArchetypeInfoByType     = showArchetypeInfoByType;
window.showArchetypeInfo           = showArchetypeInfo;
window.getShortDef                 = getShortDef;
window.getEigenschaftenHtml        = getEigenschaftenHtml;
window.loadEigenschaftenData       = loadEigenschaftenData;
window.toggleEigenschaft           = toggleEigenschaft;

})();
