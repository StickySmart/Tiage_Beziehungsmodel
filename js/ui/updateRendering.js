// ═══════════════════════════════════════════════════════════════════════════════
// js/ui/updateRendering.js
// Extracted from app-main.js
// Contains: updateAll, updateTheme, updateMyType, updatePartnerSelector,
//           selectPartner, updateTopAndChallenge, updatePartnerView,
//           updateCategoryBars, resetPartnerGOD
// ═══════════════════════════════════════════════════════════════════════════════

(function() {
    'use strict';

    // Aliases for chart utilities
    var drawRadarChart = TiageChartUtils.drawRadarChart;
    var getScoreColor = TiageChartUtils.getScoreColor;
    var getScoreGradientColor = TiageChartUtils.getScoreGradientColor;

    // Module-level state
    let currentTopMatch = { id: null, score: 0 };
    let currentChallenge = { id: null, score: 0 };

function updateAll() {
    // Guard: Don't update UI if data not loaded yet
    if (!data || !window.tiageData.archetypes) {
        console.warn('[TIAGE] updateAll called before data loaded - skipping');
        return;
    }
    updateTheme();
    updateMyType();
    updatePartnerSelector();
    updateTopAndChallenge();
    updatePartnerView();
    window.updateLegendCategories();
    window.updateAnalysisOverview();
    window.updateComparisonView(); // Trigger score calculation and UI update
    // GFK automatisch aus Archetypen-Matching ableiten
    if (typeof window.updateGfkFromArchetypes === 'function') {
    window.updateGfkFromArchetypes();
    }
}

function updateTheme() {
    document.body.className = `theme-${window.getIchArchetype()}`;
}

function updateMyType() {
    // Guard against data not being loaded yet
    if (!data || !window.tiageData.archetypes) {
        console.warn('[TIAGE] updateMyType called before data loaded');
        return;
    }
    const arch = window.tiageData.archetypes[window.getIchArchetype()];
    if (!arch) return;

    const myTypeIcon = document.getElementById('myTypeIcon');
    if (myTypeIcon) {
        myTypeIcon.textContent = window.window.icons[window.getIchArchetype()];
        myTypeIcon.style.background = arch.color;
    }

    const myTypeName = document.getElementById('myTypeName');
    if (myTypeName) {
        myTypeName.textContent = arch.name;
        myTypeName.style.color = arch.color;
    }

    const myTypeDesc = document.getElementById('myTypeDesc');
    if (myTypeDesc) myTypeDesc.textContent = arch.shortDescription || '';

    const myTypeTooltip = document.getElementById('myTypeTooltip');
    if (myTypeTooltip) myTypeTooltip.textContent = window.getShortDef(window.getIchArchetype());

    const proList = document.getElementById('myTypePro');
    if (proList) proList.innerHTML = (arch.pro || []).slice(0, 4).map(p => `<li>${p}</li>`).join('');

    const contraList = document.getElementById('myTypeContra');
    if (contraList) contraList.innerHTML = (arch.contra || []).slice(0, 4).map(c => `<li>${c}</li>`).join('');

    const myTypePathos = document.getElementById('myTypePathos');
    if (myTypePathos) myTypePathos.textContent = arch.pathos || '';

    const myTypeLogos = document.getElementById('myTypeLogos');
    if (myTypeLogos) myTypeLogos.textContent = arch.logos || '';
}

// Fixed archetype order to ensure all types are shown
const archetypeOrder = ['single', 'duo', 'duo_flex', 'solopoly', 'polyamor', 'ra', 'lat', 'aromantisch'];
window.archetypeOrder = archetypeOrder;

function updatePartnerSelector() {
    const container = document.getElementById('partnerSelector');
    // Show ALL archetypes as partner options (including own type for self-matching)
    const allPartners = window.archetypeOrder
        .map(id => window.tiageData.archetypes[id])
        .filter(arch => arch); // Remove any undefined

    // Nur Default setzen wenn selectedPartner einen Wert hat aber ungültig ist
    // Bei null (kein Partner gewählt) → null lassen
    if (window.getPartnerArchetype() && !allPartners.find(o => o.id === window.getPartnerArchetype())) {
        window.setPartnerArchetype(allPartners[0]?.id || null);
    }

    container.innerHTML = allPartners.map(arch => `
        <button class="partner-btn ${arch.id === window.getPartnerArchetype() ? 'active' : ''}"
                onclick="selectPartner('${arch.id}')"
                data-id="${arch.id}">
            <span class="dot" style="background: ${arch.color}"></span>
            ${arch.name}
        </button>
    `).join('');
}

function selectPartner(partnerId) {
    window.setPartnerArchetype(partnerId);

    // Sync select dropdowns
    const partnerSelect = document.getElementById('partnerSelect');
    const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
    if (partnerSelect) partnerSelect.value = partnerId;
    if (mobilePartnerSelect) mobilePartnerSelect.value = partnerId;

    // Sync archetype grid highlighting
    window.updateArchetypeGrid('partner', partnerId);

    document.querySelectorAll('.partner-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.id === partnerId);
    });
    updatePartnerView();
    window.updateAnalysisOverview();
    window.updateComparisonView(); // Trigger score calculation and UI update
}

function updateTopAndChallenge() {
    // Include all types (including self) for top match and challenge
    const others = window.archetypeOrder;
    let topMatch = { id: null, score: 0 };
    let challenge = { id: null, score: 100 };

    others.forEach(otherId => {
        const key = `${window.getIchArchetype()}_${otherId}`;
        const interaction = window.tiageData.interactions[key];
        const score = interaction?.overall || 0;

        if (score > topMatch.score) {
            topMatch = { id: otherId, score };
        }
        if (score < challenge.score) {
            challenge = { id: otherId, score };
        }
    });

    // Store for modal access
    currentTopMatch = topMatch;
    currentChallenge = challenge;

    const myArch = window.tiageData.archetypes[window.getIchArchetype()];

    if (topMatch.id) {
        const arch = window.tiageData.archetypes[topMatch.id];
        if (arch) {
            document.getElementById('topMatchDot').style.background = arch.color;
            document.getElementById('topMatchName').textContent = `${myArch?.name || 'Ich'} (Ich) mit ${arch.name}`;
            document.getElementById('topMatchScore').textContent = topMatch.score;
        }
    }

    if (challenge.id) {
        const arch = window.tiageData.archetypes[challenge.id];
        if (arch) {
            document.getElementById('challengeDot').style.background = arch.color;
            document.getElementById('challengeName').textContent = `${myArch?.name || 'Ich'} (Ich) mit ${arch.name}`;
            document.getElementById('challengeScore').textContent = challenge.score;
        }
    }
}

function updatePartnerView() {
    const myArch = window.tiageData.archetypes[window.getIchArchetype()];
    const partnerArch = window.tiageData.archetypes[window.getPartnerArchetype()];
    const interactionKey = `${window.getIchArchetype()}_${window.getPartnerArchetype()}`;
    const interaction = window.tiageData.interactions[interactionKey] || {};

    // Run Pathos/Logos checks (keine Blockierung mehr - zeigt nur Warnungen)
    window.runCompatibilityChecks();

    // NEU: GFK-Bedürfnis-Matching mit allen Dimensionen neu berechnen
    window.updateGfkFromArchetypes();

    document.getElementById('myTypeNameDisplay').textContent = myArch?.name || '...';
    document.getElementById('partnerNameDisplay').textContent = partnerArch?.name || '...';
    document.getElementById('myTypeTooltipPage3').textContent = window.getShortDef(window.getIchArchetype());
    document.getElementById('partnerTooltipPage3').textContent = window.getShortDef(window.getPartnerArchetype());

    const score = interaction.overall || 0;
    const scoreEl = document.getElementById('overallScore');
    scoreEl.textContent = score;
    scoreEl.style.color = getScoreColor(score);

    drawRadarChart(interaction.scores || {}, partnerArch?.color || '#457B9D');
    updateCategoryBars(interaction.scores || {});

    const proList = document.getElementById('partnerPro');
    proList.innerHTML = (interaction.pro || []).map(p => `<li>${p}</li>`).join('') || `<li>${TiageI18n.t('ui.noData', 'Keine Daten')}</li>`;

    const contraList = document.getElementById('partnerContra');
    contraList.innerHTML = (interaction.contra || []).map(c => `<li>${c}</li>`).join('') || `<li>${TiageI18n.t('ui.noData', 'Keine Daten')}</li>`;
}

// Radar chart: delegated to js/ui/chartUtils.js (TiageChartUtils module)
var drawRadarChart = TiageChartUtils.drawRadarChart;

function updateCategoryBars(scores) {
    const container = document.getElementById('categoryBars');
    const categories = ['A', 'B', 'C', 'D', 'E', 'F'];

    container.innerHTML = categories.map(cat => {
        const value = scores[cat]?.value || 0;
        const barClass = TiageChartUtils.getBarClass(value);
        const name = window.categoryNames[cat] || cat;

        return `
            <div class="category-row" onclick="openSingleCategoryModal('${cat}')">
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
}

// Score color utilities: delegated to js/ui/chartUtils.js (TiageChartUtils module)
var getScoreColor = TiageChartUtils.getScoreColor;
var getScoreGradientColor = TiageChartUtils.getScoreGradientColor;

// ═══════════════════════════════════════════════════════════════════════════
// AGOD WEIGHT TOGGLES - Ausgelagert nach js/weights/agodWeights.js
// Die Funktionen werden vom Modul über window.* exportiert:
// - initAgodWeightInputs(), setAgodWeight(), resetAgodWeights()
// - getAgodWeights(), getAgodWeightSum(), saveAgodWeights()
// - updateAgodToggleUI(), getAgodWeightsFromSession()
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Reset Partner GOD (Geschlecht, Orientierung, Dominanz) selection
 * Makes all partner options "free" again
 * NOTE: Bleibt in app-main.js weil es personDimensions/mobilePersonDimensions nutzt
 */
function resetPartnerGOD() {
    // ═══════════════════════════════════════════════════════════════
    // v1.8.908: FREE-Button setzt jetzt auch Archetyp + R-Faktoren zurück
    // Reset: G, O, D, A (Archetyp), R1-R4 (Resonanzfaktoren)
    // ═══════════════════════════════════════════════════════════════

    // Reset personDimensions for partner (G, O, D, GFK)
    if (typeof window.personDimensions !== 'undefined' && window.personDimensions.partner) {
        window.personDimensions.partner.geschlecht = null;
        window.personDimensions.partner.orientierung = null;
        window.personDimensions.partner.dominanz = null;
        window.personDimensions.partner.gfk = null;
    }
    // v4.4: GFK für ICH auch zurücksetzen (GFK ist paarabhängig)
    if (typeof window.personDimensions !== 'undefined' && window.personDimensions.ich) {
        window.personDimensions.ich.gfk = null;
    }

    // Reset mobilePersonDimensions for partner
    if (typeof window.mobilePersonDimensions !== 'undefined' && window.mobilePersonDimensions.partner) {
        window.mobilePersonDimensions.partner.geschlecht = null;
        window.mobilePersonDimensions.partner.orientierung = null;
        window.mobilePersonDimensions.partner.dominanz = null;
        window.mobilePersonDimensions.partner.gfk = null;
    }
    if (typeof window.mobilePersonDimensions !== 'undefined' && window.mobilePersonDimensions.ich) {
        window.mobilePersonDimensions.ich.gfk = null;
    }

    // Reset partner archetype global variables
    window.setPartnerArchetype(null);

    // Reset TiageState (G, O, D, A, R-Faktoren, flatNeeds)
    if (typeof TiageState !== 'undefined') {
        // GOD
        TiageState.set('personDimensions.partner.geschlecht', null);
        TiageState.set('personDimensions.partner.orientierung', null);
        TiageState.set('personDimensions.partner.dominanz', null);

        // Archetyp (A)
        TiageState.set('archetypes.partner', { primary: null, secondary: null });

        // R-Faktoren auf Default (1.0, unlocked)
        const defaultRFaktoren = {
            R1: { value: 1.0, locked: false },
            R2: { value: 1.0, locked: false },
            R3: { value: 1.0, locked: false },
            R4: { value: 1.0, locked: false }
        };
        TiageState.setResonanzFaktoren('partner', defaultRFaktoren);

        // flatNeeds für Partner leeren
        TiageState.set('flatNeeds.partner', {});

        TiageState.saveToStorage();
    }

    // Reset UI - clear all active states in partner grids
    // FIX: Entferne ALLE möglichen Klassen (active, primary-selected, secondary-selected)
    const allClasses = ['active', 'active-primary', 'active-secondary', 'primary-selected', 'secondary-selected'];

    // Geschlecht P-Grid
    document.querySelectorAll('#partner-geschlecht-p-grid .geschlecht-btn, #mobile-partner-geschlecht-p-grid .geschlecht-btn, #modal-partner-geschlecht-grid .geschlecht-btn').forEach(btn => {
        btn.classList.remove(...allClasses);
        btn.querySelectorAll('.geschlecht-indicator').forEach(ind => ind.remove());
    });

    // Geschlecht Extras (Fit/Fucked up/Horny) - AUCH Inline-Styles entfernen!
    document.querySelectorAll('#partner-geschlecht-extras-grid .geschlecht-btn, #mobile-partner-geschlecht-extras-grid .geschlecht-btn').forEach(btn => {
        btn.classList.remove(...allClasses);
        // Inline-Styles entfernen (syncGeschlechtExtrasUI setzt diese)
        btn.style.background = '';
        btn.style.borderColor = '';
        btn.style.color = '';
        btn.style.opacity = '';
    });

    // Reset geschlechtExtrasCache für Partner
    if (typeof window.geschlechtExtrasCache !== 'undefined' && window.geschlechtExtrasCache.partner) {
        window.geschlechtExtrasCache.partner = { fit: false, fuckedup: false, horny: false };
    }

    // Reset TiageState geschlecht extras für Partner
    // FIX v4.3: geschlecht_extras als Objekt setzen (nicht einzelne Felder)
    if (typeof TiageState !== 'undefined') {
        TiageState.set('personDimensions.partner.geschlecht_extras', { fit: false, fuckedup: false, horny: false });
    }

    // Reset in-memory personDimensions
    if (typeof window.personDimensions !== 'undefined' && window.personDimensions.partner) {
        window.personDimensions.partner.geschlecht_extras = { fit: false, fuckedup: false, horny: false };
    }
    if (typeof window.mobilePersonDimensions !== 'undefined' && window.mobilePersonDimensions.partner) {
        window.mobilePersonDimensions.partner.geschlecht_extras = { fit: false, fuckedup: false, horny: false };
    }
    document.querySelectorAll('#partner-geschlecht-s-grid .geschlecht-btn, #mobile-partner-geschlecht-s-grid .geschlecht-btn').forEach(btn => {
        btn.classList.remove(...allClasses);
        btn.querySelectorAll('.geschlecht-indicator').forEach(ind => ind.remove());
    });

    // Orientierung
    document.querySelectorAll('#partner-orientierung-grid .orientierung-btn, #mobile-partner-orientierung-grid .orientierung-btn, #modal-partner-orientierung-grid .orientierung-btn').forEach(btn => {
        btn.classList.remove(...allClasses);
        btn.querySelectorAll('.geschlecht-indicator').forEach(ind => ind.remove());
    });

    // Dominanz
    document.querySelectorAll('#partner-dominanz-grid .dominanz-btn, #mobile-partner-dominanz-grid .dominanz-btn, #modal-partner-dominanz-grid .dominanz-btn').forEach(btn => {
        btn.classList.remove(...allClasses);
        btn.querySelectorAll('.geschlecht-indicator').forEach(ind => ind.remove());
    });

    // v1.8.908: Archetyp-Grid reset (A)
    document.querySelectorAll('#partner-archetype-grid .archetype-symbol-item, #mobile-partner-archetype-grid .archetype-symbol-item').forEach(item => {
        item.classList.remove('active');
    });

    // Reset partner archetype select dropdowns
    const partnerSelect = document.getElementById('partnerSelect');
    const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
    if (partnerSelect) partnerSelect.selectedIndex = 0;
    if (mobilePartnerSelect) mobilePartnerSelect.selectedIndex = 0;

    // Clear summaries
    ['partner-geschlecht-summary', 'partner-orientierung-summary', 'partner-dominanz-summary',
     'mobile-partner-geschlecht-summary', 'mobile-partner-orientierung-summary', 'mobile-partner-dominanz-summary'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });

    // Clear header info
    ['partner-header-geschlecht', 'partner-header-dominanz', 'partner-header-orientierung',
     'mobile-partner-header-geschlecht', 'mobile-partner-header-dominanz', 'mobile-partner-header-orientierung'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = '';
    });

    // Add needs-selection class back
    document.querySelectorAll('[data-dimension*="partner-geschlecht"], [data-dimension*="partner-orientierung"], [data-dimension*="partner-dominanz"]').forEach(el => {
        el.classList.add('needs-selection');
    });

    // v4.4: GFK-UI sofort zurücksetzen (BEIDE Seiten)
    if (typeof window.syncGfkUI === 'function') {
        window.syncGfkUI('ich');
        window.syncGfkUI('partner');
    }

    // v4.4: Lightbulb-Blink deaktivieren (kein Score ohne Partner)
    if (typeof window.stopLightbulbBlink === 'function') {
        window.stopLightbulbBlink();
    }

    // Trigger recalculation
    if (typeof updateComparisonView === 'function') {
        window.updateComparisonView();
    }

    // v1.8.908: ResonanzCard UI aktualisieren
    if (typeof ResonanzCard !== 'undefined' && typeof ResonanzCard.updateDisplay === 'function') {
        ResonanzCard.updateDisplay('partner');
    }

    // v4.3: R-Faktor-Anzeige auf Hauptseite aktualisieren (zeigt jetzt ICH statt "-")
    if (typeof window.updateRFactorDisplay === 'function') {
        window.updateRFactorDisplay();
    }

    TiageToast.info('Partner zurückgesetzt 🔄');
    console.log('[Partner FREE] Reset complete - G, O, D, A, GFK und R-Faktoren zurückgesetzt');
}

// Expose globally


    // ── Exports ──────────────────────────────────────────────────────────────
    window.updateAll = updateAll;
    window.updateTheme = updateTheme;
    window.updateMyType = updateMyType;
    window.updatePartnerSelector = updatePartnerSelector;
    window.selectPartner = selectPartner;
    window.updateTopAndChallenge = updateTopAndChallenge;
    window.updatePartnerView = updatePartnerView;
    window.updateCategoryBars = updateCategoryBars;
    window.resetPartnerGOD = resetPartnerGOD;

})();
