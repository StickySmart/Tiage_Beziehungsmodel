/**
 * SyntheseModal — Ti-Age Synthese / Pathos / Logos Modal
 * =======================================================
 * Extracted from app-main.js (lines ~10138-13277)
 *
 * Contains all Synthese Modal functions:
 * - openTiageSyntheseModal / closeTiageSyntheseModal
 * - showTiageSyntheseContent, getScoreContent, getNeedsContent
 * - getPathosContent, getLogosContent, getOshoZenContent
 * - getGfkBeduerfnisAnalyse, generateJungGfkStatement
 * - openResonanzfaktorenModal, updateResonanzfaktorenModalContent
 * - navigateTiageSyntheseArchetype, navigateResonanzArchetype
 * - getRTIContent, getTiageTheoryContent
 * - toggleCreativityTTS, getSyntheseQuoteText
 *
 * Dependencies (all globally available):
 * - TiageState, window.getIchArchetype(), window.setIchArchetype()
 * - window.getPartnerArchetype(), window.setPartnerArchetype()
 * - window.archetypeDescriptions, window.archetypeOrder
 * - window.personDimensions, window.currentMobilePage
 * - window.generateCombinedPathos, window.generateCombinedLogos
 * - window.updateSyntheseScoreCycle, window.saveSelectionToStorage
 * - window.updateComparisonView, window.updateArchetypeGrid
 */

(function() {
'use strict';

// Local aliases for global getters (called frequently)
function getIchArchetype() { return window.getIchArchetype ? window.getIchArchetype() : (window.currentArchetype || 'single'); }
function getPartnerArchetype() { return window.getPartnerArchetype ? window.getPartnerArchetype() : (window.selectedPartner || null); }

// Ti-Age Synthese Modal Functions (unified Score/Pathos/Logos)
let currentTiageSyntheseType = TiageState.get('ui.syntheseType') || 'score'; // Sticky: 'score', 'pathos' or 'logos'
let currentTiageSyntheseContent = { score: '', pathos: '', logos: '' };

// Legacy aliases for backwards compatibility
let currentPathosLogosType = currentTiageSyntheseType;
let currentPathosLogosContent = currentTiageSyntheseContent;

function openTiageSyntheseModal(type = null) {
    console.log('[TIAGE] openTiageSyntheseModal called with type:', type);
    const modal = document.getElementById('tiageSyntheseModal');
    console.log('[TIAGE] Modal element found:', !!modal);
    if (!modal) {
        console.error('[TIAGE] tiageSyntheseModal NOT FOUND in DOM!');
        return;
    }

    // Use sticky type if no type specified
    if (type === null) {
        type = currentTiageSyntheseType;
    }
    currentTiageSyntheseType = type;
    currentPathosLogosType = type; // Keep legacy in sync

    // Get current archetypes
    const ichArch = window.archetypeDescriptions[getIchArchetype()];
    const partnerArch = window.archetypeDescriptions[getPartnerArchetype()];
    console.log('[TIAGE] Archetypes:', getIchArchetype(), getPartnerArchetype(), !!ichArch, !!partnerArch);

    // Update archetype display
    const ichDisplay = document.getElementById('tiageSyntheseModalIch');
    const partnerDisplay = document.getElementById('tiageSyntheseModalPartner');
    if (ichDisplay) ichDisplay.textContent = ichArch?.name || getIchArchetype();
    if (partnerDisplay) partnerDisplay.textContent = partnerArch?.name || getPartnerArchetype();

    // Generate content for all types
    try {
        console.log('[TIAGE] Generating pathos content...');
        currentTiageSyntheseContent.pathos = generateCombinedPathos(ichArch, partnerArch);
        console.log('[TIAGE] Generating logos content...');
        currentTiageSyntheseContent.logos = generateCombinedLogos(ichArch, partnerArch);
        console.log('[TIAGE] Content generated successfully');
    } catch (e) {
        console.error('[TIAGE] Error generating content:', e);
    }

    // Show the selected type
    try {
        console.log('[TIAGE] Showing content type:', type);
        showTiageSyntheseContent(type);
    } catch (e) {
        console.error('[TIAGE] Error in showTiageSyntheseContent:', e);
    }

    // Update Score Cycle
    try {
        updateSyntheseScoreCycle();
    } catch (e) {
        console.error('[TIAGE] Error in updateSyntheseScoreCycle:', e);
    }

    console.log('[TIAGE] Adding active class to modal');
    modal.classList.add('active');
    history.pushState({ mobilePage: window.currentMobilePage, modal: 'tiagesynthese' }, '', `#seite${window.currentMobilePage}-tiagesynthese`);
    console.log('[TIAGE] Modal should now be visible');
}

// Legacy alias
function openPathosLogosModal(type = null) {
    openTiageSyntheseModal(type);
}

// Legacy alias for Pro/Contra modal
function openProContraModal() {
    openTiageSyntheseModal('score');
}

function closeTiageSyntheseModal(event, skipHistoryBack = false) {
    if (event && event.target !== event.currentTarget) return;
    // Stop TTS when modal is closed
    stopTTSOnModalClose();
    const modal = document.getElementById('tiageSyntheseModal');
    if (modal) modal.classList.remove('active');
    if (!skipHistoryBack && history.state && (history.state.modal === 'tiagesynthese' || history.state.modal === 'pathoslogos' || history.state.modal === 'procontra')) {
        history.back();
    }
}

// Legacy aliases
function closePathosLogosModal(event, skipHistoryBack = false) {
    closeTiageSyntheseModal(event, skipHistoryBack);
}
function closeProContraModal(event, skipHistoryBack = false) {
    closeTiageSyntheseModal(event, skipHistoryBack);
}

function navigateProContraArchetype(person, direction) {
    navigateTiageSyntheseArchetype(person, direction);
}

function showTiageSyntheseContent(type) {
    currentTiageSyntheseType = type;
    currentPathosLogosType = type; // Keep legacy in sync
    // Stop TTS when switching content
    stopTTSOnModalClose();
    // Save to TiageState for sticky behavior (SSOT)
    TiageState.set('ui.syntheseType', type);

    const titleEl = document.getElementById('tiageSyntheseModalTitle');
    const iconEl = document.getElementById('tiageSyntheseIcon');
    const categoryEl = document.getElementById('tiageSyntheseCategory');
    const subtitleEl = document.getElementById('tiageSyntheseSubtitle');
    const contentEl = document.getElementById('tiageSyntheseModalContent');
    const typeIndicatorEl = document.getElementById('tiageSyntheseTypeIndicator');

    // Sticky side buttons
    const scoreBtn = document.getElementById('tiageSyntheseToggleScore');
    const oshoZenBtn = document.getElementById('tiageSyntheseToggleOshoZen');
    const needsBtn = document.getElementById('tiageSyntheseToggleNeeds');
    const rtiBtn = document.getElementById('tiageSyntheseToggleRTI');

    // Modal header buttons
    const modalScoreBtn = document.getElementById('modalScoreBtn');
    const modalOshoZenBtn = document.getElementById('modalOshoZenBtn');
    const modalNeedsBtn = document.getElementById('modalNeedsBtn');
    const modalRTIBtn = document.getElementById('modalRTIBtn');

    // Reset all sticky side button styles
    [scoreBtn, oshoZenBtn, needsBtn, rtiBtn].forEach(btn => {
        if (btn) {
            btn.style.background = 'rgba(30,30,35,0.95)';
            btn.style.color = 'var(--text-muted)';
            btn.style.border = '1px solid var(--border)';
        }
    });

    // Reset modal header button styles
    [modalScoreBtn, modalOshoZenBtn, modalNeedsBtn, modalRTIBtn].forEach(btn => {
        if (btn) btn.classList.remove('active');
    });

    if (type === 'score') {
        titleEl.textContent = TiageI18n.t('synthese.title', 'Ti-Age Synthese');
        iconEl.textContent = '📊';
        categoryEl.textContent = TiageI18n.t('synthese.compatibilityAnalysis', 'Kompatibilitäts-Analyse');
        subtitleEl.textContent = TiageI18n.t('synthese.scoreProContra', 'Score – Pro & Contra');
        typeIndicatorEl.style.display = 'flex';
        contentEl.innerHTML = getScoreContent();
        if (scoreBtn) {
            scoreBtn.style.background = 'rgba(139, 92, 246, 0.3)';
            scoreBtn.style.color = 'var(--text-primary)';
            scoreBtn.style.border = '1px solid #8B5CF6';
        }
        if (modalScoreBtn) modalScoreBtn.classList.add('active');
    } else if (type === 'oshozen') {
        titleEl.textContent = TiageI18n.t('synthese.title', 'Ti-Age Synthese');
        iconEl.textContent = '🔥';
        categoryEl.textContent = TiageI18n.t('synthese.oshoZenTarot', 'Osho Zen Tarot');
        subtitleEl.textContent = TiageI18n.t('synthese.sharedNeeds', 'Gemeinsame Bedürfnisse');
        typeIndicatorEl.style.display = 'flex';
        contentEl.innerHTML = getOshoZenContent();
        if (oshoZenBtn) {
            oshoZenBtn.style.background = 'rgba(236, 72, 153, 0.3)';
            oshoZenBtn.style.color = 'var(--text-primary)';
            oshoZenBtn.style.border = '1px solid #EC4899';
        }
        if (modalOshoZenBtn) modalOshoZenBtn.classList.add('active');
    } else if (type === 'pathos' || type === 'logos') {
        // Legacy support - redirect to oshozen
        showTiageSyntheseContent('oshozen');
        return;
    } else if (type === 'needs') {
        titleEl.textContent = TiageI18n.t('synthese.title', 'Ti-Age Synthese');
        iconEl.textContent = '💚';
        categoryEl.textContent = TiageI18n.t('synthese.gfkAnalysis', 'GFK-Bedürfnisanalyse');
        subtitleEl.textContent = TiageI18n.t('synthese.needsMatchWithDiff', 'Bedürfnis-Match mit Differenz');
        typeIndicatorEl.style.display = 'flex';
        contentEl.innerHTML = getNeedsContent();
        if (needsBtn) {
            needsBtn.style.background = 'rgba(34, 197, 94, 0.3)';
            needsBtn.style.color = 'var(--text-primary)';
            needsBtn.style.border = '1px solid #22c55e';
        }
        if (modalNeedsBtn) modalNeedsBtn.classList.add('active');
    } else if (type === 'rti') {
        titleEl.textContent = TiageI18n.t('synthese.title', 'Ti-Age Synthese');
        iconEl.textContent = '🏛️';
        categoryEl.textContent = TiageI18n.t('synthese.fivePillars', '5 Säulen der Identität');
        subtitleEl.textContent = TiageI18n.t('synthese.rtiSubtitle', 'RTI nach Petzold – Reibungs-Analyse');
        typeIndicatorEl.style.display = 'flex';
        contentEl.innerHTML = getRTIContent();
        if (rtiBtn) {
            rtiBtn.style.background = 'rgba(244, 162, 97, 0.3)';
            rtiBtn.style.color = 'var(--text-primary)';
            rtiBtn.style.border = '1px solid #F4A261';
        }
        if (modalRTIBtn) modalRTIBtn.classList.add('active');
    }
}

// Legacy alias
function showPathosLogosContent(type) {
    showTiageSyntheseContent(type);
}

/**
 * Generate Score content (formerly Pro & Contra)
 */
function getScoreContent() {
    // Get current score
    const percentage = document.getElementById('resultPercentage');
    const currentScore = percentage ? percentage.textContent : '0%';
    const scoreValue = parseInt(currentScore) || 0;

    // Set color based on score
    let scoreColor = 'var(--danger)';
    if (scoreValue >= 80) {
        scoreColor = 'var(--success)';
    } else if (scoreValue >= 65) {
        scoreColor = 'var(--primary)';
    } else if (scoreValue >= 50) {
        scoreColor = 'var(--warning)';
    }

    // Generate Pro/Contra
    const dynamicProContra = generateDynamicProContra(
        getIchArchetype(),
        getPartnerArchetype(),
        window.personDimensions.ich,
        window.personDimensions.partner
    );

    let proListHtml = '';
    if (dynamicProContra.pro && dynamicProContra.pro.length > 0) {
        proListHtml = dynamicProContra.pro.slice(0, 5).map(s => `<li style="margin-bottom: 8px; padding-left: 8px; border-left: 2px solid var(--success);">${s}</li>`).join('');
    } else {
        proListHtml = '<li style="color: var(--text-muted);">Keine Daten verfügbar</li>';
    }

    let contraListHtml = '';
    if (dynamicProContra.contra && dynamicProContra.contra.length > 0) {
        contraListHtml = dynamicProContra.contra.slice(0, 5).map(c => `<li style="margin-bottom: 8px; padding-left: 8px; border-left: 2px solid var(--danger);">${c}</li>`).join('');
    } else {
        contraListHtml = '<li style="color: var(--text-muted);">Keine Daten verfügbar</li>';
    }

    // Use overall needs matching score (all 224 needs) instead of matrix fallback
    let baseArchetypeScore = null;
    let scoreLabel = 'Theoretischer Wert';

    // Try to get actual needs matching score
    const matching = lastGfkMatchingResult;
    if (matching && matching.score !== undefined) {
        baseArchetypeScore = matching.score;
        scoreLabel = 'Bedürfnis-Übereinstimmung';
    }

    // Fallback: Matrix-Score if needs not available
    if (baseArchetypeScore === null) {
        baseArchetypeScore = getArchetypeScore(getIchArchetype(), getPartnerArchetype());
        scoreLabel = 'Theoretischer Wert';
    }

    return `
        <!-- Score Display -->
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 3rem; font-weight: 700; color: ${scoreColor};">${currentScore}</div>
            <div style="margin-top: 12px; padding: 12px; background: rgba(100,100,110,0.15); border-radius: 8px; font-size: 13px; color: var(--text-muted);">
                <div style="display: flex; justify-content: center; align-items: center; gap: 20px; flex-wrap: wrap;">
                    <div>
                        <span style="font-weight: 600; color: var(--text-secondary);">${TiageI18n.t('synthese.baseArchetype', 'Basis-Archetyp:')}</span>
                        <span style="margin-left: 6px; font-weight: 700; color: var(--primary);">${baseArchetypeScore}%</span>
                        <span style="margin-left: 4px; font-size: 11px;">(${scoreLabel})</span>
                    </div>
                    <div style="color: var(--border);">→</div>
                    <div>
                        <span style="font-weight: 600; color: var(--text-secondary);">${TiageI18n.t('synthese.totalScore', 'Gesamt-Score:')}</span>
                        <span style="margin-left: 6px; font-weight: 700; color: ${scoreColor};">${scoreValue}%</span>
                        <span style="margin-left: 4px; font-size: 11px;">(mit Modifikatoren)</span>
                    </div>
                </div>
                <div style="margin-top: 8px; font-size: 11px; text-align: center; opacity: 0.8;">
                    ${scoreValue > baseArchetypeScore ?
                        TiageI18n.t('synthese.modifiersIncrease', 'Modifikatoren erhöhen den Score um +{diff} Prozentpunkte').replace('{diff}', scoreValue - baseArchetypeScore) :
                        scoreValue < baseArchetypeScore ?
                        TiageI18n.t('synthese.modifiersDecrease', 'Modifikatoren senken den Score um {diff} Prozentpunkte').replace('{diff}', baseArchetypeScore - scoreValue) :
                        TiageI18n.t('quality.noModifiers', 'Keine Modifikatoren aktiv')}
                </div>
            </div>
        </div>
        <!-- Pro/Contra Lists -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px;">
            <div>
                <h4 style="color: var(--success); margin-bottom: 12px; font-size: 14px;">${TiageI18n.t('synthese.whatWorks', '✓ Was funktioniert')}</h4>
                <ul style="list-style: none; padding: 0; margin: 0;">${proListHtml}</ul>
            </div>
            <div>
                <h4 style="color: var(--danger); margin-bottom: 12px; font-size: 14px;">${TiageI18n.t('synthese.challengesLabel', '✗ Herausforderungen')}</h4>
                <ul style="list-style: none; padding: 0; margin: 0;">${contraListHtml}</ul>
            </div>
        </div>
    `;
}

/**
 * Generate Needs Matching content for Score view
 */
function getScoreNeedsContent() {
    // Use cached matching result (same as displayed on main page)
    const matching = lastGfkMatchingResult;
    if (!matching || matching.score === undefined) {
        return '';
    }

    // Score-Farbe basierend auf Level
    const scoreColor = matching.level === 'hoch' ? '#22c55e' :
                      matching.level === 'mittel' ? '#eab308' : '#ef4444';

    // Vollständige Daten holen - entweder aus dynamischer Berechnung oder aus GfkBeduerfnisse.details
    let gemeinsam = matching.alleGemeinsam || [];
    let unterschiedlich = matching.alleUnterschiedlich || [];
    let isFallback = false;

    // Fallback: Wenn keine vollständigen Daten, aus TiageState holen
    if (gemeinsam.length === 0 && unterschiedlich.length === 0) {
        const ichArchetyp = getIchArchetype() || '';
        const partnerArchetyp = getPartnerArchetype() || '';

        // NEU: Direkt aus TiageState.flatNeeds lesen
        // Primär: Direkt aus TiageState.flatNeeds
        const result = calculateNeedsMatchFromFlatNeeds();
        if (result) {
            // Format-Konvertierung: need → { label, id, wert1, wert2, stringKey }
            const formatNeed = (item) => {
                const stringKey = item.need.startsWith('#B') && typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.toKey
                    ? BeduerfnisIds.toKey(item.need)
                    : item.need;
                return {
                    label: formatBeduerfnisLabel(item.need),
                    id: item.need,
                    key: item.need,
                    stringKey: stringKey,
                    wert1: item.wert1,
                    wert2: item.wert2,
                    diff: Math.abs(item.wert1 - item.wert2)
                };
            };

            const uebereinstimmend = result.gemeinsam.map(formatNeed);
            const komplementaer = result.komplementaer.map(formatNeed);
            gemeinsam = [...uebereinstimmend, ...komplementaer].sort((a, b) =>
                ((b.wert1 + b.wert2) / 2) - ((a.wert1 + a.wert2) / 2)
            );
            unterschiedlich = result.unterschiedlich.map(formatNeed);
            console.log('[getScoreNeedsContent] ✓ Verwende individualisierte Werte aus TiageState.flatNeeds');
        }

        // Fallback: Alte Methode (nur Archetyp - falls flatNeeds leer)
        if (gemeinsam.length === 0 && typeof GfkBeduerfnisse !== 'undefined') {
            isFallback = true;
            const fullMatching = GfkBeduerfnisse.berechneMatching(ichArchetyp, partnerArchetyp);
            if (fullMatching && fullMatching.details) {
                const uebereinstimmend = (fullMatching.details.uebereinstimmend || []).map(b => ({
                    label: b.label,
                    id: b.id,
                    key: b.key,
                    stringKey: b.stringKey,
                    wert1: b.wert1,
                    wert2: b.wert2,
                    diff: b.diff
                }));
                const komplementaer = (fullMatching.details.komplementaer || []).map(b => ({
                    label: b.label,
                    id: b.id,
                    key: b.key,
                    stringKey: b.stringKey,
                    wert1: b.wert1,
                    wert2: b.wert2,
                    diff: b.diff
                }));
                gemeinsam = [...uebereinstimmend, ...komplementaer].sort((a, b) =>
                    ((b.wert1 + b.wert2) / 2) - ((a.wert1 + a.wert2) / 2)
                );
                unterschiedlich = (fullMatching.details.konflikt || []).map(b => ({
                    label: b.label,
                    id: b.id,
                    key: b.key,
                    stringKey: b.stringKey,
                    wert1: b.wert1,
                    wert2: b.wert2
                }));
                console.log('[getScoreNeedsContent] ⚠ Fallback: Verwende Archetyp-basierte Bedürfniswerte');
            }
        }
    }

    // Weitere Fallback: Top-Listen verwenden
    if (gemeinsam.length === 0) gemeinsam = matching.topGemeinsam || [];
    if (unterschiedlich.length === 0) unterschiedlich = matching.topUnterschiedlich || [];

    // Tag-Style - clickable with hover effect
    const tagBaseStyle = `display: inline-block; padding: 4px 10px; margin: 3px; border-radius: 12px; font-size: 12px; font-weight: 500; cursor: pointer; transition: transform 0.15s, box-shadow 0.15s;`;
    const greenTagStyle = `${tagBaseStyle} background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.4); color: #22c55e;`;
    const redTagStyle = `${tagBaseStyle} background: rgba(239,68,68,0.15); border: 1px solid rgba(239,68,68,0.4); color: #ef4444;`;

    // Gemeinsame Bedürfnisse Tags (max 8) - clickable
    // b.id ist jetzt #B-ID (z.B. "#B34"), b.key ist numerisch (34), b.label ist Display-Name
    const gemeinsamTags = gemeinsam.slice(0, 8).map(b => {
        const bidDisplay = b.id && b.id.startsWith('#B') ? `<span style="opacity: 0.6; font-size: 0.85em; margin-right: 4px;">${b.id}</span>` : '';
        return `<span style="${greenTagStyle}" onclick="openNeedWithResonance('${b.id}')" title="${TiageI18n.t('ui.clickForDefinition', 'Klicken für Definition')}" onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 2px 8px rgba(34,197,94,0.3)'" onmouseout="this.style.transform='';this.style.boxShadow=''">${bidDisplay}${b.label}</span>`;
    }).join('');

    // Unterschiedliche Bedürfnisse Tags (max 5) - clickable
    const unterschiedlichTags = unterschiedlich.slice(0, 5).map(b => {
        const bidDisplay = b.id && b.id.startsWith('#B') ? `<span style="opacity: 0.6; font-size: 0.85em; margin-right: 4px;">${b.id}</span>` : '';
        return `<span style="${redTagStyle}" onclick="openNeedWithResonance('${b.id}')" title="${TiageI18n.t('ui.clickForDefinition', 'Klicken für Definition')}" onmouseover="this.style.transform='translateY(-1px)';this.style.boxShadow='0 2px 8px rgba(239,68,68,0.3)'" onmouseout="this.style.transform='';this.style.boxShadow=''">${bidDisplay}${b.label}</span>`;
    }).join('');

    return `
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border);">
            ${isFallback ? `
                <div style="
                    background: rgba(234, 179, 8, 0.1);
                    border: 1px solid rgba(234, 179, 8, 0.3);
                    border-radius: 6px;
                    padding: 8px 12px;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                ">
                    <span style="font-size: 14px;">ℹ️</span>
                    <div style="flex: 1;">
                        <div style="font-size: 11px; font-weight: 600; color: #eab308; margin-bottom: 2px;">${TiageI18n.t('ui.archetypeBaseValues', 'Archetyp-Basis-Werte')}</div>
                        <div style="font-size: 10px; color: var(--text-muted); line-height: 1.4;">
                            ${TiageI18n.t('ui.archetypeBaseValuesDesc', 'Individualisierte Werte nicht verfügbar. Es werden Standard-Archetyp-Werte angezeigt.')}
                        </div>
                    </div>
                </div>
            ` : ''}
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 15px;">
                <span style="font-size: 16px;">🤝</span>
                <span style="font-size: 13px; color: var(--text-muted);">Bedürfnis-Übereinstimmung:</span>
                <span style="font-size: 18px; font-weight: 700; color: ${scoreColor};">${matching.score}%</span>
            </div>
            ${gemeinsamTags ? `
                <div style="margin-bottom: 12px;">
                    <div style="font-size: 11px; color: var(--success); font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Gemeinsame Bedürfnisse</div>
                    <div>${gemeinsamTags}</div>
                </div>
            ` : ''}
            ${unterschiedlichTags ? `
                <div>
                    <div style="font-size: 11px; color: var(--danger); font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">Herausfordernde Unterschiede</div>
                    <div>${unterschiedlichTags}</div>
                </div>
            ` : ''}
        </div>
    `;
}

/**
 * Generiert HTML für GFK-Bedürfnis-Tags im Pathos/Logos Modal
 * VEREINHEITLICHT: Nutzt berechneMatching (diff <= 15) statt analysiereWerBringtWasMit
 * @param {string} type - 'pathos' oder 'logos'
 * @returns {Object} HTML-Strings für gemeinsamSection, dynamikSection
 */
function getGfkBeduerfnisAnalyse(type) {
    const result = {
        ichTags: '',
        partnerTags: '',
        gemeinsamSection: '',
        wachstumSection: '',
        dynamikSection: ''
    };

    // Schlüssel unverändert verwenden (duo_flex bleibt duo_flex)
    const ichArchetyp = getIchArchetype() || '';
    const partnerArchetyp = getPartnerArchetype() || '';

    if (!ichArchetyp || !partnerArchetyp) return result;

    // NEU: Direkt aus TiageState.flatNeeds lesen
    let matching = null;
    let isFallback = false;

    // Primär: Direkt aus TiageState.flatNeeds
    const matchResult = calculateNeedsMatchFromFlatNeeds();
    if (matchResult) {
        // Format-Konvertierung: need → { label, id, wert1, wert2, stringKey }
        const formatNeed = (item) => {
            const stringKey = item.need.startsWith('#B') && typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.toKey
                ? BeduerfnisIds.toKey(item.need)
                : item.need;
            return {
                label: formatBeduerfnisLabel(item.need),
                id: item.need,
                stringKey: stringKey,
                wert1: item.wert1,
                wert2: item.wert2,
                diff: Math.abs(item.wert1 - item.wert2)
            };
        };

        // Top 10 Übereinstimmungen (gemeinsam + komplementär)
        const allGemeinsam = [...matchResult.gemeinsam, ...matchResult.komplementaer].map(formatNeed);
        allGemeinsam.sort((a, b) => ((b.wert1 + b.wert2) / 2) - ((a.wert1 + a.wert2) / 2));

        matching = {
            topUebereinstimmungen: allGemeinsam.slice(0, 10)
        };
        console.log('[getGfkBeduerfnisAnalyse] ✓ Verwende individualisierte Werte aus TiageState.flatNeeds');
    }

    // Fallback: Alte Methode (nur Archetyp - falls flatNeeds leer)
    if (!matching && typeof GfkBeduerfnisse !== 'undefined') {
        matching = GfkBeduerfnisse.berechneMatching(ichArchetyp, partnerArchetyp);
        isFallback = true;
        console.log('[getGfkBeduerfnisAnalyse] ⚠ Fallback: Verwende Archetyp-basierte Bedürfniswerte');
    }

    if (!matching || matching.fehler) return result;

    // Tag-Style
    const tagStyle = `display: inline-block; padding: 3px 8px; margin: 2px; border-radius: 10px; font-size: 11px; font-weight: 500;`;
    const tagStyleMatch = `${tagStyle} background: rgba(34,197,94,0.15); border: 1px solid rgba(34,197,94,0.5); color: #22c55e;`;

    // Gemeinsame Bedürfnisse Section - gefiltert nach pathos/logos
    const gemeinsam = (matching.topUebereinstimmungen || []).filter(b => {
        // b.stringKey für getPathosLogos verwenden (braucht string-key für definitionen-Lookup)
        const pl = GfkBeduerfnisse.getPathosLogos ? GfkBeduerfnisse.getPathosLogos(b.stringKey || b.id) : null;
        return !pl || pl === type; // Wenn keine Zuordnung, zeige in beiden
    });

    // HIDDEN: Direct needs comparison hidden per user request
    /*
    if (gemeinsam.length > 0) {
        const tags = gemeinsam.slice(0, 5).map(b => {
            // b.label ist bereits der Display-Name
            return `<span style="${tagStyleMatch}">${b.label}</span>`;
        }).join('');
        const sectionTitle = type === 'pathos'
            ? TiageI18n.t('needs.sharedTitle', 'GEMEINSAME & KOMPATIBLE BEDÜRFNISSE')
            : TiageI18n.t('needs.valuesTitle', 'GEMEINSAME & KOMPATIBLE WERTE');

        // Fallback Banner
        let fallbackBanner = '';
        if (isFallback) {
            fallbackBanner = `
                <div style="
                    background: rgba(234, 179, 8, 0.1);
                    border: 1px solid rgba(234, 179, 8, 0.3);
                    border-radius: 6px;
                    padding: 8px 12px;
                    margin-bottom: 16px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                ">
                    <span style="font-size: 14px;">ℹ️</span>
                    <div style="flex: 1;">
                        <div style="font-size: 11px; font-weight: 600; color: #eab308; margin-bottom: 2px;">${TiageI18n.t('ui.archetypeBaseValues', 'Archetyp-Basis-Werte')}</div>
                        <div style="font-size: 10px; color: var(--text-muted); line-height: 1.4;">
                            ${TiageI18n.t('ui.archetypeBaseValuesDesc', 'Individualisierte Werte nicht verfügbar. Es werden Standard-Archetyp-Werte angezeigt.')}
                        </div>
                    </div>
                </div>
            `;
        }

        result.gemeinsamSection = fallbackBanner + `
        <div style="margin-bottom: 16px;">
            <div style="padding: 12px; background: rgba(34,197,94,0.08); border-radius: 10px; border: 1px solid rgba(34,197,94,0.25);">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="font-size: 14px;">🤝</span>
                    <span style="font-size: 11px; color: #22c55e; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">${sectionTitle}</span>
                </div>
                <div>${tags}</div>
            </div>
        </div>`;
    }
    */

    // Dynamik + Wachstum als kombinierter Fließtext
    // Dynamik: Aus gemeinsam mit Kategorie 'dynamik'
    const dynamikNeeds = (matching.details?.uebereinstimmend || []).filter(b => {
        // b.stringKey für definitionen-Lookup verwenden
        const def = GfkBeduerfnisse.definitionen?.[b.stringKey || b.id];
        return def?.kategorie === 'dynamik';
    });

    // Wachstum: Aus Konflikten (einer stark, anderer schwach)
    const wachstum = (matching.topKonflikte || []).slice(0, 3);

    if (dynamikNeeds.length > 0 || wachstum.length > 0) {
        const dynamikNames = dynamikNeeds.slice(0, 2).map(b => {
            // b.label ist bereits der Display-Name
            return `<span style="color: #8B5CF6; font-weight: 500;">${b.label}</span>`;
        });

        const wachstumNames = wachstum.slice(0, 2).map(b => {
            // b.label ist bereits der Display-Name
            return `<span style="color: #a855f7; font-weight: 500;">${b.label}</span>`;
        });

        let sentence = '';
        if (dynamikNames.length > 0 && wachstumNames.length > 0) {
            const dynamikPart = dynamikNames.length > 1 ? `${dynamikNames[0]} und ${dynamikNames[1]}` : dynamikNames[0];
            const wachstumPart = wachstumNames.length > 1 ? `${wachstumNames[0]} und ${wachstumNames[1]}` : wachstumNames[0];
            sentence = `Eure Dynamik lebt von ${dynamikPart} – hier liegt Wachstumspotential in ${wachstumPart}.`;
        } else if (dynamikNames.length > 0) {
            const dynamikPart = dynamikNames.length > 1 ? `${dynamikNames[0]} und ${dynamikNames[1]}` : dynamikNames[0];
            sentence = `Eure Dynamik entfaltet sich durch ${dynamikPart}.`;
        } else if (wachstumNames.length > 0) {
            const wachstumPart = wachstumNames.length > 1 ? `${wachstumNames[0]} und ${wachstumNames[1]}` : wachstumNames[0];
            sentence = `Wachstumspotential zeigt sich in ${wachstumPart}.`;
        }

        if (sentence) {
            result.dynamikSection = `<p style="margin-top: 12px; font-size: 13px; line-height: 1.6; color: var(--text-secondary);">${sentence}</p>`;
        }
    }

    return result;
}

/**
 * Generiert das Jung+GFK kombinierte Statement für die psychologische Einordnung
 * C.G. Jung: Logos → "Denken", Pathos → "Fühlen"
 * GFK (Rosenberg): Logos → Klarheit, Ordnung, Kompetenz; Pathos → Harmonie, Empathie, Verbundenheit
 */
function generateJungGfkStatement() {
    // Prüfen ob GfkBeduerfnisse verfügbar ist
    if (typeof GfkBeduerfnisse === 'undefined') {
        return '';
    }

    // Schlüssel unverändert verwenden (duo_flex bleibt duo_flex)
    const ichArchetyp = getIchArchetype() || '';
    const partnerArchetyp = getPartnerArchetype() || '';
    const ichArch = window.archetypeDescriptions[getIchArchetype()];
    const partnerArch = window.archetypeDescriptions[getPartnerArchetype()];
    const ichName = ichArch?.name || 'ICH';
    const partnerName = partnerArch?.name || 'Partner';

    if (!ichArchetyp || !partnerArchetyp) return '';

    // Pathos/Logos Scores berechnen
    const scores = GfkBeduerfnisse.berechnePathosLogosScores(ichArchetyp, partnerArchetyp);
    const pathosScore = scores.pathos || 50;
    const logosScore = scores.logos || 50;

    // Jung-Funktion ableiten (wer tendiert wohin?)
    // Person A: Vergleiche individuelle Stärken
    const analyseA = GfkBeduerfnisse.analysiereWerBringtWasMit(ichArchetyp, ichArchetyp);
    const analyseB = GfkBeduerfnisse.analysiereWerBringtWasMit(partnerArchetyp, partnerArchetyp);

    // Logos-Stärke = Anzahl starker Logos-Bedürfnisse
    const ichLogosStaerke = (analyseA.ich?.staerken?.logos?.length || 0);
    const ichPathosStaerke = (analyseA.ich?.staerken?.pathos?.length || 0);
    const partnerLogosStaerke = (analyseB.ich?.staerken?.logos?.length || 0);
    const partnerPathosStaerke = (analyseB.ich?.staerken?.pathos?.length || 0);

    // Jung-Funktion bestimmen
    const jungFunktionA = ichLogosStaerke >= ichPathosStaerke ? 'Denken' : 'Fühlen';
    const jungFunktionB = partnerLogosStaerke >= partnerPathosStaerke ? 'Denken' : 'Fühlen';

    // GFK-Bedürfnisse sammeln
    const gfkAnalyse = GfkBeduerfnisse.analysiereWerBringtWasMit(ichArchetyp, partnerArchetyp);
    if (gfkAnalyse.fehler) return '';

    // Top-Bedürfnisse für die Liste (kombiniert Pathos + Logos)
    const gemeinsamPathos = (gfkAnalyse.gemeinsam?.pathos || []).slice(0, 2);
    const gemeinsamLogos = (gfkAnalyse.gemeinsam?.logos || []).slice(0, 2);
    const allGemeinsam = [...gemeinsamPathos, ...gemeinsamLogos];
    const beduerfnisListe = allGemeinsam.map(b => b.label).join(', ') || 'Wertschätzung, Vertrauen';

    // Jung-Dynamik-Text generieren
    let jungDynamikText = '';
    if (jungFunktionA === jungFunktionB) {
        if (jungFunktionA === 'Denken') {
            jungDynamikText = 'Beide operieren primär aus der rationalen Funktion – eine analytische Partnerschaft mit klarem Fokus auf Struktur und Werte.';
        } else {
            jungDynamikText = 'Beide operieren primär aus der Gefühlsfunktion – eine empathische Verbindung mit starkem emotionalem Fundament.';
        }
    } else {
        jungDynamikText = 'Diese komplementäre Konstellation vereint Ratio und Emotion – eine fruchtbare Spannung, die beide Seiten bereichern kann.';
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // RESONANZFAKTOREN aus State lesen (werden bei Archetyp-Wechsel berechnet)
    // ═══════════════════════════════════════════════════════════════════════════
    let resonanzWerte = { R1: 1.0, R2: 1.0, R3: 1.0, R4: 1.0 };

    // Aus LoadedArchetypProfile.ich.resonanzFaktoren lesen
    const loadedIch = window.LoadedArchetypProfile?.ich?.resonanzFaktoren;
    if (loadedIch) {
        resonanzWerte = {
            R1: loadedIch.R1?.value ?? loadedIch.R1 ?? 1.0,
            R2: loadedIch.R2?.value ?? loadedIch.R2 ?? 1.0,
            R3: loadedIch.R3?.value ?? loadedIch.R3 ?? 1.0,
            R4: loadedIch.R4?.value ?? loadedIch.R4 ?? 1.0
        };
    }
    // Fallback: Aus ResonanzCard
    else if (typeof ResonanzCard !== 'undefined') {
        const cardValues = ResonanzCard.getValues('ich');
        resonanzWerte = {
            R1: cardValues.R1 || 1.0,
            R2: cardValues.R2 || 1.0,
            R3: cardValues.R3 || 1.0,
            R4: cardValues.R4 || 1.0
        };
    }

    // ═══════════════════════════════════════════════════════════════════
    // FAKTOR-PERSPEKTIVEN-GEWICHTUNGSMATRIX
    // ═══════════════════════════════════════════════════════════════════
    // Definiert wie stark jeder Resonanzfaktor (R1-R4) jede Perspektive
    // (P1-P4) beeinflusst. Die Gewichte pro Faktor summieren sich zu 1.0.
    //
    // Theoretische Begründung:
    //
    // R1 ORIENTIERUNG (Anziehung/Sexualität)
    //   → GFK (40%):  Rosenbergs Grundbedürfnisse umfassen Intimität,
    //                 körperliche Nähe - Orientierung ist fundamental
    //   → Osho (30%): Tantra, sexuelle Energie, Polarität sind zentral
    //   → Pirsig (15%): Qualitätsphilosophie fokussiert nicht auf Sexualität
    //   → Kink (15%):  Kink fokussiert auf Dynamik, nicht Orientierung
    //
    // R2 ARCHETYP (Beziehungsphilosophie)
    //   → GFK (25%):  Bedürfnisse variieren leicht nach Beziehungsform
    //   → Osho (15%): Nicht-Anhaften, aber kein Fokus auf Struktur
    //   → Pirsig (45%): "Wie" einer Beziehung = Qualität = Pirsigs Kern
    //   → Kink (15%):  Kink ist dynamik-, nicht strukturbezogen
    //
    // R3 DOMINANZ (Machtdynamik)
    //   → GFK (10%):  GFK behandelt Macht nicht explizit
    //   → Osho (25%): Polarität, maskulin/feminin, Energie-Austausch
    //   → Pirsig (15%): Qualität unabhängig von Machtverteilung
    //   → Kink (50%):  BDSM = konsensueller Machtaustausch per Definition
    //
    // R4 GESCHLECHT (Identität)
    //   → Alle (25%): Geschlechtsidentität ist querschnittlich relevant,
    //                 beeinflusst alle Perspektiven gleichermaßen
    //
    // Dokumentation: docs/theory/faktor-perspektiven-matrix.md
    // ═══════════════════════════════════════════════════════════════════
    const gewichtMatrix = {
        R1: { P1: 0.40, P2: 0.30, P3: 0.15, P4: 0.15 },  // Orientierung
        R2: { P1: 0.25, P2: 0.15, P3: 0.45, P4: 0.15 },  // Archetyp
        R3: { P1: 0.10, P2: 0.25, P3: 0.15, P4: 0.50 },  // Dominanz
        R4: { P1: 0.25, P2: 0.25, P3: 0.25, P4: 0.25 }   // Geschlecht
    };

    // Perspektiven-Konfiguration
    const perspektiven = {
        P1: { icon: '📊', label: 'Statistik', color: '#3B82F6', description: 'Empirisch nachgewiesene Grundbedürfnisse' },
        P2: { icon: '🌱', label: 'Konditionierung', color: '#F59E0B', description: 'Natürliche vs. anerzogene Bedürfnisse' },
        P3: { icon: '⚖️', label: 'Qualität', color: '#10B981', description: 'Statische vs. dynamische Qualitätsaspekte' },
        P4: { icon: '💜', label: 'SexPositiv', color: '#8B5CF6', description: 'Bewusste Machtdynamik und Consent' }
    };

    // Resonanzfaktor-Konfiguration
    const faktoren = {
        R1: { label: 'Orientierung', color: '#E63946' },
        R2: { label: 'Archetyp', color: '#2A9D8F' },
        R3: { label: 'Dominanz', color: '#8B5CF6' },
        R4: { label: 'Geschlecht', color: '#F4A261' }
    };

    // Berechne effektiven Einfluss: (R-Wert - 1.0) * Gewicht * 100 = Prozentuale Änderung
    function berechneEinfluss(rWert, gewicht) {
        const abweichung = rWert - 1.0; // -0.5 bis +0.5
        const einfluss = abweichung * gewicht * 100; // Prozentuale Änderung
        return einfluss;
    }

    // Einfluss-Anzeige mit Farbcodierung
    function getEinflussDisplay(einfluss, perspColor) {
        let color = 'var(--text-muted)'; // neutral
        let prefix = '';
        if (einfluss > 0.5) {
            color = '#22c55e'; // positiv
            prefix = '+';
        } else if (einfluss < -0.5) {
            color = '#ef4444'; // negativ
        }
        const displayVal = einfluss.toFixed(1);
        return `<span style="color: ${color}; font-weight: 500; font-size: 11px;">${prefix}${displayVal}%</span>`;
    }

    // Wert-Anzeige mit Farbcodierung
    function getWertDisplay(wert) {
        let color = '#eab308'; // neutral
        if (wert >= 1.1) color = '#22c55e'; // verstärkend
        else if (wert <= 0.9) color = '#ef4444'; // abschwächend
        return `<span style="color: ${color}; font-weight: 600;">${wert.toFixed(2)}</span>`;
    }

    // Tabellen-Zeilen für jeden Resonanzfaktor
    let tableRows = '';
    const perspektivenSummen = { P1: 0, P2: 0, P3: 0, P4: 0 };

    ['R1', 'R2', 'R3', 'R4'].forEach(rf => {
        const faktor = faktoren[rf];
        const wert = resonanzWerte[rf] || 1.0;
        const gewichte = gewichtMatrix[rf];

        const einflussP1 = berechneEinfluss(wert, gewichte.P1);
        const einflussP2 = berechneEinfluss(wert, gewichte.P2);
        const einflussP3 = berechneEinfluss(wert, gewichte.P3);
        const einflussP4 = berechneEinfluss(wert, gewichte.P4);

        perspektivenSummen.P1 += einflussP1;
        perspektivenSummen.P2 += einflussP2;
        perspektivenSummen.P3 += einflussP3;
        perspektivenSummen.P4 += einflussP4;

        tableRows += `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
                <td style="padding: 8px 10px; font-size: 11px;">
                    <span style="color: ${faktor.color}; font-weight: 600;">${rf}</span>
                    <span style="color: var(--text-secondary); margin-left: 6px;">${faktor.label}</span>
                </td>
                <td style="padding: 8px 6px; text-align: center; font-size: 12px;">${getWertDisplay(wert)}</td>
                <td style="padding: 8px 6px; text-align: center;">${getEinflussDisplay(einflussP1, perspektiven.P1.color)}</td>
                <td style="padding: 8px 6px; text-align: center;">${getEinflussDisplay(einflussP2, perspektiven.P2.color)}</td>
                <td style="padding: 8px 6px; text-align: center;">${getEinflussDisplay(einflussP3, perspektiven.P3.color)}</td>
                <td style="padding: 8px 6px; text-align: center;">${getEinflussDisplay(einflussP4, perspektiven.P4.color)}</td>
            </tr>`;
    });

    // Summen-Zeile
    const summenRow = `
        <tr style="border-top: 2px solid rgba(139,92,246,0.3); background: rgba(139,92,246,0.05);">
            <td style="padding: 10px 10px; font-size: 11px; font-weight: 600; color: var(--text-primary);" colspan="2">Σ Gesamt</td>
            <td style="padding: 10px 6px; text-align: center;">${getEinflussDisplay(perspektivenSummen.P1, perspektiven.P1.color)}</td>
            <td style="padding: 10px 6px; text-align: center;">${getEinflussDisplay(perspektivenSummen.P2, perspektiven.P2.color)}</td>
            <td style="padding: 10px 6px; text-align: center;">${getEinflussDisplay(perspektivenSummen.P3, perspektiven.P3.color)}</td>
            <td style="padding: 10px 6px; text-align: center;">${getEinflussDisplay(perspektivenSummen.P4, perspektiven.P4.color)}</td>
        </tr>`;

    // HTML generieren
    return `
    <div style="margin-top: 20px; padding: 16px; background: linear-gradient(135deg, rgba(139,92,246,0.08), rgba(59,130,246,0.05)); border-radius: 12px; border: 1px solid rgba(139,92,246,0.25);">
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 14px;">
            <span style="font-size: 16px;">🎛️</span>
            <span style="font-size: 12px; color: #8B5CF6; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">RESONANZFAKTOREN × PERSPEKTIVEN</span>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
            <thead>
                <tr style="border-bottom: 2px solid rgba(139,92,246,0.3);">
                    <th style="padding: 8px 10px; text-align: left; color: var(--text-muted); font-weight: 500;">Faktor</th>
                    <th style="padding: 8px 6px; text-align: center; color: var(--text-muted); font-weight: 500;">R</th>
                    <th style="padding: 8px 6px; text-align: center;" title="${perspektiven.P1.description}"><span style="color: ${perspektiven.P1.color}; font-size: 10px;">${perspektiven.P1.icon} ${perspektiven.P1.label}</span></th>
                    <th style="padding: 8px 6px; text-align: center;" title="${perspektiven.P2.description}"><span style="color: ${perspektiven.P2.color}; font-size: 10px;">${perspektiven.P2.icon} ${perspektiven.P2.label}</span></th>
                    <th style="padding: 8px 6px; text-align: center;" title="${perspektiven.P3.description}"><span style="color: ${perspektiven.P3.color}; font-size: 10px;">${perspektiven.P3.icon} ${perspektiven.P3.label}</span></th>
                    <th style="padding: 8px 6px; text-align: center;" title="${perspektiven.P4.description}"><span style="color: ${perspektiven.P4.color}; font-size: 10px;">${perspektiven.P4.icon} ${perspektiven.P4.label}</span></th>
                </tr>
            </thead>
            <tbody>
                ${tableRows}
                ${summenRow}
            </tbody>
        </table>
        <div style="display: flex; gap: 12px; margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.05); flex-wrap: wrap; align-items: center;">
            <span style="font-size: 10px; color: var(--text-muted); font-family: monospace;">(Resonanzwert − 1) × Gewicht × 100 = %</span>
            <span style="font-size: 10px; color: var(--text-muted);">R = similarity² (0–1)</span>
            <span style="font-size: 10px; color: #22c55e;">+% verstärkt</span>
            <span style="font-size: 10px; color: #ef4444;">−% schwächt</span>
        </div>
    </div>`;
}

// ═══════════════════════════════════════════════════════════════════════
// RESONANZFAKTOREN MODAL (Separates Modal mit Archetyp-Wechsel)
// ═══════════════════════════════════════════════════════════════════════

// State für Resonanzfaktoren Modal
let resonanzModalArchetyp = 'ich'; // 'ich' oder 'partner'

/**
 * Öffnet das separate Resonanzfaktoren Modal
 * @param {string} initialArchetyp - 'ich' oder 'partner'
 */
function openResonanzfaktorenModal(initialArchetyp = 'ich') {
    resonanzModalArchetyp = initialArchetyp;

    // Modal erstellen falls nicht vorhanden
    let modal = document.getElementById('resonanzfaktorenModal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'resonanzfaktorenModal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        document.body.appendChild(modal);
    }

    // Modal Content rendern
    updateResonanzfaktorenModalContent();

    // Modal anzeigen
    modal.style.display = 'flex';
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
    });

    // Click außerhalb schließt Modal
    modal.onclick = (e) => {
        if (e.target === modal) {
            closeResonanzfaktorenModal();
        }
    };

    // ESC-Taste schließt Modal
    document.addEventListener('keydown', handleResonanzModalEsc);
}
window.openResonanzfaktorenModal = openResonanzfaktorenModal;

function handleResonanzModalEsc(e) {
    if (e.key === 'Escape') {
        closeResonanzfaktorenModal();
    }
}

function closeResonanzfaktorenModal() {
    const modal = document.getElementById('resonanzfaktorenModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
    document.removeEventListener('keydown', handleResonanzModalEsc);
}
window.closeResonanzfaktorenModal = closeResonanzfaktorenModal;

function switchResonanzArchetyp(archetyp) {
    resonanzModalArchetyp = archetyp;
    updateResonanzfaktorenModalContent();
}
window.switchResonanzArchetyp = switchResonanzArchetyp;

/**
 * Navigiert zum nächsten/vorherigen Archetyp im Resonanzfaktoren Modal
 * @param {string} person - 'ich' oder 'partner'
 * @param {number} direction - -1 für zurück, 1 für vor
 */
function navigateResonanzArchetype(person, direction) {
    const archetypeKeys = Object.keys(window.archetypeDescriptions);
    const currentKey = person === 'ich' ? getIchArchetype() : getPartnerArchetype();
    const currentIndex = archetypeKeys.indexOf(currentKey);

    let newIndex = currentIndex + direction;
    if (newIndex < 0) newIndex = archetypeKeys.length - 1;
    if (newIndex >= archetypeKeys.length) newIndex = 0;

    const newArchetype = archetypeKeys[newIndex];
    const personKey = person === 'ich' ? 'ich' : 'partner';

    if (person === 'ich') {
        window.setIchArchetype(newArchetype);

        // Sync select dropdowns
        const ichSelect = document.getElementById('ichSelect');
        const mobileIchSelect = document.getElementById('mobileIchSelect');
        if (ichSelect) ichSelect.value = newArchetype;
        if (mobileIchSelect) mobileIchSelect.value = newArchetype;

        // Sync archetype grid highlighting
        if (typeof updateArchetypeGrid === 'function') {
            updateArchetypeGrid('ich', getIchArchetype());
        }
    } else {
        window.setPartnerArchetype(newArchetype);

        // Sync select dropdowns
        const partnerSelect = document.getElementById('partnerSelect');
        const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
        if (partnerSelect) partnerSelect.value = newArchetype;
        if (mobilePartnerSelect) mobilePartnerSelect.value = newArchetype;

        // Sync archetype grid highlighting
        if (typeof updateArchetypeGrid === 'function') {
            updateArchetypeGrid('partner', getPartnerArchetype());
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // FIX v4.3: ProfileCalculator.loadProfile() aufrufen wie selectArchetypeFromGrid()
    // MUSS VOR R-Faktor-Berechnung stehen, damit flatNeeds aktuell sind!
    // ═══════════════════════════════════════════════════════════════════════════
    if (newArchetype && typeof ProfileCalculator !== 'undefined' && typeof TiageState !== 'undefined') {
        const profileData = {
            archetyp: newArchetype,
            geschlecht: TiageState.get(`window.personDimensions.${personKey}.geschlecht`),
            dominanz: TiageState.get(`window.personDimensions.${personKey}.dominanz`),
            orientierung: TiageState.get(`window.personDimensions.${personKey}.orientierung`)
        };
        ProfileCalculator.loadProfile(personKey, profileData);
        console.log(`[navigateResonanzArchetype] Profil für ${personKey.toUpperCase()} neu berechnet:`, newArchetype);
    }

    // Update main displays
    saveSelectionToStorage();
    if (typeof updateComparisonView === 'function') updateComparisonView();
    if (typeof updateMobileCardsContent === 'function') updateMobileCardsContent();

    // Update Resonanzfaktoren Modal
    updateResonanzfaktorenModalContent();

    // FIX v4.3: ResonanzProfileHeaderCard über Änderung informieren
    // Ohne dieses Event bleiben die R-Faktor-Werte in der Header-Karte unverändert
    if (typeof ResonanzCard !== 'undefined' && ResonanzCard.notifyChange) {
        ResonanzCard.notifyChange(personKey, 'archetype-switch');
    } else {
        // Fallback: Event direkt feuern
        window.dispatchEvent(new CustomEvent('resonanzfaktoren-changed', {
            detail: { person: personKey, source: 'archetype-switch' }
        }));
    }
}
window.navigateResonanzArchetype = navigateResonanzArchetype;

/**
 * Zeigt die vollständige Herleitung eines R-Faktors an
 * @param {string} rKey - 'R1', 'R2', 'R3' oder 'R4'
 * @param {string} person - 'ich' oder 'partner'
 * @param {number} wert - Der angezeigte R-Wert
 */
function showValueDerivation(rKey, person, wert) {
    // Mapping R-Key zu Kohärenz-Dimension
    const rToDimension = {
        R1: { key: 'leben', name: 'Leben', emoji: '🔥' },
        R2: { key: 'philosophie', name: 'Philosophie', emoji: '🧠' },
        R3: { key: 'dynamik', name: 'Dynamik', emoji: '⚡' },
        R4: { key: 'identitaet', name: 'Identität', emoji: '💚' }
    };

    const dimension = rToDimension[rKey];
    if (!dimension) return;

    // Archetyp bestimmen
    const archetyp = person === 'ich' ? getIchArchetype() : getPartnerArchetype();
    const archetypName = window.archetypeDescriptions[archetyp]?.name || archetyp;

    // Kohärenz-Daten laden (für Bedürfnis-Liste dieser Dimension)
    const kohaerenz = TiageSynthesis?.Constants?.ARCHETYP_KOHAERENZ?.[dimension.key]?.[archetyp];
    if (!kohaerenz) {
        console.warn('[showValueDerivation] Keine Kohärenzdaten für', dimension.key, archetyp);
        return;
    }

    // Archetyp-Profil laden für KORREKTE typische Werte (Single Source of Truth)
    const archetypProfil = GfkBeduerfnisse?.archetypProfile?.[archetyp]?.umfrageWerte || {};

    // ═══════════════════════════════════════════════════════════════════
    // PROFIL-ATTRIBUTE LADEN für Modifikator-Aufschlüsselung
    // ═══════════════════════════════════════════════════════════════════
    let profilDominanz = null;
    let profilGeschlecht = null;
    let profilOrientierung = null;

    if (typeof TiageState !== 'undefined') {
        profilDominanz = TiageState.getPrimaryDominanz(person);
        profilGeschlecht = TiageState.getPrimaryGeschlecht(person);
        profilOrientierung = TiageState.getPrimaryOrientierung(person);
    }

    // Modifikatoren-Objekte laden
    const modDominanz = (typeof BeduerfnisModifikatoren !== 'undefined' && profilDominanz)
        ? BeduerfnisModifikatoren.dominanz?.[profilDominanz] || {}
        : {};
    const modGeschlecht = (typeof BeduerfnisModifikatoren !== 'undefined' && profilGeschlecht)
        ? BeduerfnisModifikatoren.geschlecht?.[profilGeschlecht] || {}
        : {};
    const modOrientierung = (typeof BeduerfnisModifikatoren !== 'undefined' && profilOrientierung)
        ? BeduerfnisModifikatoren.orientierung?.[profilOrientierung] || {}
        : {};

    // Helper: Modifikator-Aufschlüsselung für ein Bedürfnis berechnen
    const getModifikatorDetails = (needKey) => {
        const domMod = modDominanz[needKey] || 0;
        const geschMod = modGeschlecht[needKey] || 0;
        const oriMod = modOrientierung[needKey] || 0;
        const total = domMod + geschMod + oriMod;

        return {
            dominanz: domMod,
            geschlecht: geschMod,
            orientierung: oriMod,
            total: total,
            hasModifiers: domMod !== 0 || geschMod !== 0 || oriMod !== 0
        };
    };

    // ═══════════════════════════════════════════════════════════════════
    // ZENTRALE HELPER-FUNKTION für korrekte Person-spezifische Needs
    // Verwendet ResonanzCard.getPersonNeeds() für konsistente Datenquellen
    // ═══════════════════════════════════════════════════════════════════
    const needs = (typeof ResonanzCard !== 'undefined' && ResonanzCard.getPersonNeeds)
        ? ResonanzCard.getPersonNeeds(person, archetyp)
        : null;

    // Lade flatNeeds mit Lock-Status für Anzeige
    const flatNeedsRaw = window.LoadedArchetypProfile?.[person]?.profileReview?.flatNeeds || [];
    const lockedNeedsMap = {};
    if (Array.isArray(flatNeedsRaw)) {
        flatNeedsRaw.forEach(n => {
            if (n.locked && n.id) {
                lockedNeedsMap[n.id] = true;
            }
            if (n.locked && n.stringKey) {
                lockedNeedsMap[n.stringKey] = true;
            }
        });
    }

    // Helper: Prüft ob ein Bedürfnis gesperrt ist
    const isNeedLocked = (needId, stringKey) => {
        return lockedNeedsMap[needId] || lockedNeedsMap[stringKey] || false;
    };

    // Helper: Wert aus needs extrahieren (unterstützt id und stringKey lookup)
    const getNeedValue = (needId, stringKey) => {
        if (!needs) return null;
        // Versuche zuerst id
        if (needId && needs[needId] !== undefined) {
            const entry = needs[needId];
            return (typeof entry === 'object' && entry.value !== undefined) ? entry.value : entry;
        }
        // Fallback: stringKey
        if (stringKey && needs[stringKey] !== undefined) {
            const entry = needs[stringKey];
            return (typeof entry === 'object' && entry.value !== undefined) ? entry.value : entry;
        }
        return null;
    };

    // Berechnung durchführen
    let rows = [];
    let totalDiff = 0;
    let totalDiffTypisch = 0;  // Berechnung NUR mit typischen Werten (ohne gesperrte Überschreibungen)
    let count = 0;
    let lockedNeedsCount = 0;

    for (const needKey in kohaerenz) {
        if (!kohaerenz.hasOwnProperty(needKey)) continue;

        const kohaerenzEntry = kohaerenz[needKey];
        const needId = (typeof kohaerenzEntry === 'object' && kohaerenzEntry.id)
            ? kohaerenzEntry.id
            : null;
        const needLabel = (typeof kohaerenzEntry === 'object' && kohaerenzEntry.label)
            ? kohaerenzEntry.label
            : needKey;

        // Typischer Wert aus Archetyp-Profil (Single Source of Truth)
        // Versuche zuerst über needId (#B34), dann über needKey (selbstbestimmung)
        let typischValue = null;
        if (needId && archetypProfil[needId] !== undefined) {
            typischValue = archetypProfil[needId];
        } else if (archetypProfil[needKey] !== undefined) {
            typischValue = archetypProfil[needKey];
        }

        // Verwende id UND stringKey für robustes Lookup (wie in NeedsIntegration._getNeedValue)
        const actualValue = getNeedValue(needId, needKey);

        // Prüfe ob dieses Bedürfnis gesperrt ist
        const needIsLocked = isNeedLocked(needId, needKey);
        if (needIsLocked) lockedNeedsCount++;

        if (actualValue !== null && typeof typischValue === 'number') {
            // Modifikator-Details ZUERST berechnen (für korrekte Abweichung)
            const modDetails = getModifikatorDetails(needKey);

            // Modifizierten typischen Wert berechnen: Typ + D + G + O
            const modifiedTypisch = typischValue +
                (modDetails.dominanz || 0) +
                (modDetails.geschlecht || 0) +
                (modDetails.orientierung || 0);

            // Abweichung gegen den MODIFIZIERTEN typischen Wert berechnen
            const diff = Math.abs(actualValue - modifiedTypisch);
            totalDiff += diff;

            // Für typische Berechnung: Wenn gesperrt, verwende 0 (= typischer Wert)
            // sonst die normale Abweichung
            totalDiffTypisch += needIsLocked ? 0 : diff;

            count++;

            // Farbcodierung für Abweichung
            let diffColor = '#22c55e'; // grün
            if (diff > 30) diffColor = '#ef4444'; // rot
            else if (diff > 15) diffColor = '#eab308'; // gelb

            rows.push({
                id: needId || needKey,  // Zeige id oder stringKey
                label: needLabel,
                typisch: typischValue,
                modifiedTypisch: modifiedTypisch,  // NEU: Für Anzeige
                actual: actualValue,
                diff: diff,
                diffColor: diffColor,
                modifiers: modDetails,
                isLocked: needIsLocked  // NEU: Lock-Status
            });
        }
    }

    const avgDiff = count > 0 ? totalDiff / count : 0;
    const uebereinstimmung = 1 - (avgDiff / 100);
    const calculatedR = Math.round((0.5 + (uebereinstimmung * 1.0)) * 1000) / 1000;

    // Berechne auch den "typischen" R-Wert (wenn gesperrte Bedürfnisse auf typische Werte gesetzt wären)
    const avgDiffTypisch = count > 0 ? totalDiffTypisch / count : 0;
    const uebereinstimmungTypisch = 1 - (avgDiffTypisch / 100);
    const calculatedRTypisch = Math.round((0.5 + (uebereinstimmungTypisch * 1.0)) * 1000) / 1000;

    // Lade gespeicherte Werte für Lock-Status Anzeige
    let storedValue = 1.0;
    let isLocked = false;

    // Prüfe ob der gespeicherte Wert vom berechneten abweicht und aktualisiere ihn
    // Nur wenn nicht gelockt und Differenz > 0.01
    if (typeof ResonanzCard !== 'undefined') {
        const storedData = ResonanzCard.load(person);
        storedValue = storedData[rKey]?.value || 1.0;
        isLocked = storedData[rKey]?.locked || false;
        const diff = Math.abs(storedValue - calculatedR);

        if (!isLocked && diff > 0.01) {
            console.log(`[showValueDerivation] ${rKey} für ${person}: Gespeichert=${storedValue.toFixed(3)}, Berechnet=${calculatedR.toFixed(3)} - Aktualisiere...`);

            // Aktualisiere den Wert
            const newValues = {};
            newValues[rKey] = calculatedR;
            ResonanzCard.setCalculatedValues(newValues, false, person);

            // Aktualisiere auch das Modal im Hintergrund falls offen
            if (typeof updateResonanzfaktorenModalContent === 'function') {
                setTimeout(() => updateResonanzfaktorenModalContent(), 100);
            }
        }
    }

    // Sortiere nach Abweichung (größte zuerst)
    rows.sort((a, b) => b.diff - a.diff);

    // Sammle alle Modifikatorwerte für die Zusammenfassung
    const modSummary = {
        dominanz: { sum: 0, count: 0 },
        geschlecht: { sum: 0, count: 0 },
        orientierung: { sum: 0, count: 0 }
    };
    rows.forEach(r => {
        if (r.modifiers) {
            modSummary.dominanz.sum += r.modifiers.dominanz || 0;
            modSummary.geschlecht.sum += r.modifiers.geschlecht || 0;
            modSummary.orientierung.sum += r.modifiers.orientierung || 0;
            modSummary.dominanz.count++;
            modSummary.geschlecht.count++;
            modSummary.orientierung.count++;
        }
    });

    // Helper: Modifikator-Summe formatieren
    const formatModSum = (sum) => {
        const sign = sum > 0 ? '+' : '';
        return `${sign}${sum}`;
    };

    // HTML generieren mit Modifikator-Spalten
    const formatModValue = (val) => {
        if (val === 0) return '<span style="color: var(--text-muted); opacity: 0.4;">—</span>';
        const sign = val > 0 ? '+' : '';
        return `${sign}${val}`;
    };

    let tableHtml = rows.map(r => {
        const modD = r.modifiers?.dominanz || 0;
        const modG = r.modifiers?.geschlecht || 0;
        const modO = r.modifiers?.orientierung || 0;

        // Wenn nicht gelockt: Zeige modifizierten Wert (Typ + D + G + O)
        // Wenn gelockt: Zeige den tatsächlichen (manuell gesetzten) Wert
        const displayValue = r.locked ? r.actual : r.modifiedTypisch;

        // Status-Symbol: 🔒 nur wenn locked
        const statusSymbol = r.locked
            ? `<span style="color: #f97316; margin-left: 2px;" title="${TiageI18n.t('ui.fixedOnSwitch', 'Fixiert - bleibt bei Archetyp-Wechsel erhalten')}">🔒</span>`
            : '';

        // Row background (empty for now, can be used for highlighting)
        const rowBg = '';

        // Lock icon for need ID (show if locked)
        const needLockIcon = '';

        return `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.06); ${rowBg}">
            <td style="padding: 6px 8px; font-size: 11px; color: var(--text-secondary);">
                <span style="color: var(--text-muted); font-size: 9px;">${r.id}${needLockIcon}</span><br>
                ${r.label}
            </td>
            <td style="padding: 6px 4px; text-align: center; font-size: 12px; color: var(--text-muted);">${r.typisch}</td>
            <td style="padding: 6px 4px; text-align: center; font-size: 12px; color: #a78bfa; font-weight: ${modD !== 0 ? '600' : '400'};">${formatModValue(modD)}</td>
            <td style="padding: 6px 4px; text-align: center; font-size: 12px; color: #60a5fa; font-weight: ${modG !== 0 ? '600' : '400'};">${formatModValue(modG)}</td>
            <td style="padding: 6px 4px; text-align: center; font-size: 12px; color: #f472b6; font-weight: ${modO !== 0 ? '600' : '400'};">${formatModValue(modO)}</td>
            <td style="padding: 6px 4px; text-align: center; font-size: 12px; font-weight: 600;">${displayValue}${statusSymbol}</td>

        </tr>
    `}).join('');

    // Popup erstellen
    let popup = document.getElementById('valueDerivationPopup');
    if (!popup) {
        popup = document.createElement('div');
        popup.id = 'valueDerivationPopup';
        popup.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.85);
            z-index: 10001;
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.2s ease;
        `;
        document.body.appendChild(popup);
    }

    const personLabel = person === 'ich' ? 'ICH' : 'PARTNER';
    const personColor = person === 'ich' ? 'var(--success)' : 'var(--danger)';

    popup.innerHTML = `
        <div style="background: var(--bg-primary); border-radius: 16px; max-width: 500px; width: 95%; max-height: 85vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.6); border: 1px solid rgba(139,92,246,0.4);">
            <!-- Header -->
            <div style="padding: 16px 20px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: space-between; background: linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.08));">
                <div>
                    <h3 style="margin: 0; font-size: 16px; color: var(--text-primary);">
                        ${dimension.emoji} ${rKey} Herleitung
                    </h3>
                    <p style="margin: 4px 0 0 0; font-size: 12px; color: var(--text-muted);">
                        <span style="color: ${personColor}; font-weight: 600;">${personLabel}</span> • ${archetypName}
                    </p>
                </div>
                <button onclick="closeValueDerivationPopup()" style="background: rgba(255,255,255,0.1); border: none; border-radius: 8px; width: 32px; height: 32px; cursor: pointer; font-size: 16px; color: var(--text-secondary);">×</button>
            </div>

            <!-- Ergebnis -->
            <div style="padding: 16px 20px; background: rgba(0,0,0,0.2); border-bottom: 1px solid rgba(255,255,255,0.05);">
                ${lockedNeedsCount > 0 ? `
                <!-- Zwei Berechnungen: Typisch vs. Mit gesperrten Werten -->
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;">
                    <!-- Typisch berechnet (wenn alle Bedürfnisse auf Archetyp-Werten wären) -->
                    <div style="background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.3); border-radius: 8px; padding: 10px; text-align: center;">
                        <div style="font-size: 10px; color: var(--text-muted); margin-bottom: 4px;">Typisch berechnet</div>
                        <div style="font-size: 18px; font-weight: 700; color: ${calculatedRTypisch >= 1.1 ? '#22c55e' : calculatedRTypisch <= 0.9 ? '#ef4444' : '#eab308'};">${calculatedRTypisch.toFixed(3)}</div>
                        <div style="font-size: 9px; color: var(--text-muted); margin-top: 2px;">ohne ${lockedNeedsCount} gesperrte</div>
                    </div>
                    <!-- Mit gesperrten Werten berechnet -->
                    <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 8px; padding: 10px; text-align: center;">
                        <div style="font-size: 10px; color: var(--text-muted); margin-bottom: 4px;">Mit gesperrten Werten</div>
                        <div style="font-size: 18px; font-weight: 700; color: ${calculatedR >= 1.1 ? '#22c55e' : calculatedR <= 0.9 ? '#ef4444' : '#eab308'};">${calculatedR.toFixed(3)}</div>
                        <div style="font-size: 9px; color: var(--text-muted); margin-top: 2px;">inkl. ${lockedNeedsCount} gesperrte</div>
                    </div>
                </div>
                <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 12px; padding: 8px; background: rgba(139,92,246,0.08); border-radius: 6px;">
                    <strong>Δ</strong> = ${Math.abs(calculatedRTypisch - calculatedR).toFixed(3)} Differenz durch ${lockedNeedsCount} gesperrte Bedürfnisse
                </div>
                ` : `
                <!-- Normale Anzeige ohne gesperrte Bedürfnisse -->
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="font-size: 13px; color: var(--text-secondary);">Berechneter Wert:</span>
                    <span style="font-size: 20px; font-weight: 700; color: ${calculatedR >= 1.1 ? '#22c55e' : calculatedR <= 0.9 ? '#ef4444' : '#eab308'};">${calculatedR.toFixed(3)}</span>
                </div>
                `}

                ${isLocked ? `
                <!-- Locked Status Anzeige für R-Faktor selbst -->
                <div style="background: linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(245, 158, 11, 0.05)); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 8px; padding: 12px; margin-bottom: 12px;">
                    <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                        <span style="font-size: 16px;">🔒</span>
                        <span style="font-size: 13px; font-weight: 600; color: #f59e0b;">${rKey} manuell gesperrt</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-size: 12px; color: var(--text-secondary);">Verwendeter Wert:</span>
                        <span style="font-size: 18px; font-weight: 700; color: #f59e0b;">${storedValue.toFixed(2)}</span>
                    </div>
                    <div style="font-size: 11px; color: var(--text-muted); line-height: 1.4;">
                        <strong style="color: #f59e0b;">Konsequenz:</strong> Der berechnete Wert (${calculatedR.toFixed(3)}) wird ignoriert.
                        Stattdessen wird der manuell gesetzte Wert (${storedValue.toFixed(2)}) für alle Score-Berechnungen verwendet.
                    </div>
                    ${(function() {
                        // SSOT: Use centralized help text from help-texts.js
                        if (typeof TiageHelpTexts !== 'undefined') {
                            const helpInfo = TiageHelpTexts.getRFactorInfluenceExplanation(rKey);
                            return `
                            <div style="margin-top: 10px; padding: 10px; background: rgba(139, 92, 246, 0.12); border-left: 3px solid #8B5CF6; border-radius: 4px; font-size: 11px; line-height: 1.5;">
                                <strong style="color: #a78bfa;">${helpInfo.title}:</strong><br>
                                ${helpInfo.description}<br>
                                <span style="color: var(--text-muted); font-size: 10px;">
                                Formel: ${helpInfo.formula.replace(rKey, '<strong style="color: #f59e0b;">' + rKey + '</strong>')}<br>
                                ${helpInfo.interpretation.join(', ')}
                                </span>
                            </div>`;
                        }
                        // Fallback if help-texts.js not loaded
                        return `
                        <div style="margin-top: 10px; padding: 10px; background: rgba(139, 92, 246, 0.12); border-left: 3px solid #8B5CF6; border-radius: 4px; font-size: 11px; line-height: 1.5;">
                            <strong style="color: #a78bfa;">Einfluss auf Endscore:</strong><br>
                            Der ${rKey}-Faktor wird direkt mit dem Score multipliziert.
                        </div>`;
                    })()}
                    <div style="margin-top: 8px; font-size: 10px; color: var(--text-muted); opacity: 0.8;">
                        Ändern: Attribute → Resonanzfaktoren → Schloss-Symbol klicken
                    </div>
                </div>
                ` : ''}

                <!-- Formel -->
                <div style="background: rgba(139,92,246,0.1); border-radius: 8px; padding: 12px; font-family: monospace; font-size: 11px; color: var(--text-secondary); line-height: 1.8;">
                    <div><strong>Formel:</strong> R = 0.5 + (Übereinstimmung × 1.0)</div>
                    <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1);">
                        <div>Summe Abweichungen: <strong>${totalDiff.toFixed(0)}</strong>${lockedNeedsCount > 0 ? ` <span style="color: var(--text-muted);">(${totalDiffTypisch.toFixed(0)} ohne gesperrte)</span>` : ''}</div>
                        <div>Anzahl Bedürfnisse: <strong>${count}</strong>${lockedNeedsCount > 0 ? ` <span style="color: #f59e0b;">(${lockedNeedsCount} gesperrt)</span>` : ''}</div>
                        <div>Ø Abweichung: <strong>${avgDiff.toFixed(1)}</strong>${lockedNeedsCount > 0 ? ` <span style="color: var(--text-muted);">(${avgDiffTypisch.toFixed(1)} ohne gesperrte)</span>` : ''}</div>
                        <div>Übereinstimmung: <strong>${(uebereinstimmung * 100).toFixed(1)}%</strong></div>
                        <div style="margin-top: 4px;">R = 0.5 + (${uebereinstimmung.toFixed(3)} × 1.0) = <strong>${calculatedR.toFixed(3)}</strong></div>
                    </div>
                </div>
            </div>

            <!-- Modifikator-Farblegende -->
            ${(profilDominanz || profilGeschlecht || profilOrientierung) ? `
            <div style="padding: 12px 20px; background: rgba(139,92,246,0.08); border-bottom: 1px solid rgba(255,255,255,0.05);">
                <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 8px;">
                    <strong>Modifikator-Formel:</strong> Erwartet = Typ + D + G + O &nbsp;→&nbsp; |Δ| = |Dein Wert − Erwartet|
                </div>
                <div style="display: flex; flex-wrap: wrap; gap: 16px; font-size: 11px;">
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span style="display: inline-block; width: 12px; height: 12px; border-radius: 3px; background: #a78bfa;"></span>
                        <span style="color: var(--text-secondary);">D = Dominanz</span>
                        ${profilDominanz ? `<span style="color: var(--text-muted); font-size: 10px;">(${profilDominanz})</span>` : ''}
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span style="display: inline-block; width: 12px; height: 12px; border-radius: 3px; background: #60a5fa;"></span>
                        <span style="color: var(--text-secondary);">G = Geschlecht</span>
                        ${profilGeschlecht ? `<span style="color: var(--text-muted); font-size: 10px;">(${profilGeschlecht.replace(/_/g, ' ')})</span>` : ''}
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px;">
                        <span style="display: inline-block; width: 12px; height: 12px; border-radius: 3px; background: #f472b6;"></span>
                        <span style="color: var(--text-secondary);">O = Orientierung</span>
                        ${profilOrientierung ? `<span style="color: var(--text-muted); font-size: 10px;">(${profilOrientierung})</span>` : ''}
                    </div>
                </div>
            </div>
            ` : ''}

            <!-- Bedürfnis-Tabelle -->
            <div style="padding: 16px 20px;">
                <div style="font-size: 12px; color: var(--text-muted); margin-bottom: 10px;">
                    ${count} Bedürfnisse verglichen (sortiert nach Abweichung)${rows.some(r => r.actual !== r.modifiedTypisch) ? ' · <span style="color: #eab308;">*</span> = überschrieben' : ''}${lockedNeedsCount > 0 ? ` · <span style="color: #f59e0b;">🔒</span> = gesperrt (${lockedNeedsCount})` : ''}:
                </div>
                <div style="background: rgba(0,0,0,0.15); border-radius: 8px; overflow: hidden; border: 1px solid rgba(255,255,255,0.08);">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: rgba(0,0,0,0.3);">
                                <th style="padding: 10px; text-align: left; font-size: 11px; color: var(--text-muted); font-weight: 500;">${TiageI18n.t('synthese.need', 'Bedürfnis')}</th>
                                <th style="padding: 10px 4px; text-align: center; font-size: 11px; color: var(--text-muted); font-weight: 500;">Typ.</th>
                                <th style="padding: 10px 4px; text-align: center; font-size: 11px; color: #a78bfa; font-weight: 500;" title="${TiageI18n.t('dimensionLabels.dominanz', 'Dominanz')}">D</th>
                                <th style="padding: 10px 4px; text-align: center; font-size: 11px; color: #60a5fa; font-weight: 500;" title="${TiageI18n.t('dimensionLabels.geschlecht', 'Geschlecht')}">G</th>
                                <th style="padding: 10px 4px; text-align: center; font-size: 11px; color: #f472b6; font-weight: 500;" title="${TiageI18n.t('dimensionLabels.orientierung', 'Orientierung')}">O</th>
                                <th style="padding: 10px 4px; text-align: center; font-size: 11px; color: ${personColor}; font-weight: 500;">${person === 'ich' ? 'Wert' : 'P.Wert'}</th>
                                <th style="padding: 10px 4px; text-align: center; font-size: 11px; color: var(--text-muted); font-weight: 500;">|Δ|</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableHtml}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;

    popup.style.display = 'flex';
    requestAnimationFrame(() => popup.style.opacity = '1');

    popup.onclick = (e) => {
        if (e.target === popup) closeValueDerivationPopup();
    };
}
window.showValueDerivation = showValueDerivation;

function closeValueDerivationPopup() {
    const popup = document.getElementById('valueDerivationPopup');
    if (popup) {
        popup.style.opacity = '0';
        setTimeout(() => popup.style.display = 'none', 200);
    }
}
window.closeValueDerivationPopup = closeValueDerivationPopup;

function updateResonanzfaktorenModalContent() {
    const modal = document.getElementById('resonanzfaktorenModal');
    if (!modal) return;

    // ═══════════════════════════════════════════════════════════════════════════
    // FIX v1.8.785: Resonanzwerte DIREKT aus Needs berechnen (SSOT)
    // Vorher: Werte aus ResonanzCard.load() → oft Default-Werte (1.0)
    // Jetzt: Dieselbe Berechnung wie calculateRelationshipQuality()
    // ═══════════════════════════════════════════════════════════════════════════

    // ICH Resonanzwerte - DIREKT aus Needs berechnen
    let resonanzIch = { R1: 1.0, R2: 1.0, R3: 1.0, R4: 1.0 };
    let lockStatusIch = { R1: false, R2: false, R3: false, R4: false };

    // PARTNER Resonanzwerte - DIREKT aus Needs berechnen
    let resonanzPartner = { R1: 1.0, R2: 1.0, R3: 1.0, R4: 1.0 };
    let lockStatusPartner = { R1: false, R2: false, R3: false, R4: false };

    // Hole Needs für beide Personen aus TiageState
    const needsIch = typeof TiageState !== 'undefined' ? TiageState.getFlatNeeds?.('ich') : null;
    const needsPartner = typeof TiageState !== 'undefined' ? TiageState.getFlatNeeds?.('partner') : null;

    // Berechne R-Faktoren aus Needs (wie in calculateRelationshipQuality)
    if (needsIch && Object.keys(needsIch).length > 0 &&
        typeof TiageSynthesis !== 'undefined' &&
        TiageSynthesis.NeedsIntegration &&
        typeof TiageSynthesis.NeedsIntegration.calculateDimensionalResonance === 'function') {

        try {
            const calcResultIch = TiageSynthesis.NeedsIntegration.calculateDimensionalResonance({
                archetyp: getIchArchetype() || 'duo',
                needs: needsIch
            });

            if (calcResultIch && calcResultIch.enabled) {
                resonanzIch = {
                    R1: calcResultIch.leben || calcResultIch.R1 || 1.0,
                    R2: calcResultIch.philosophie || calcResultIch.R2 || 1.0,
                    R3: calcResultIch.dynamik || calcResultIch.R3 || 1.0,
                    R4: calcResultIch.identitaet || calcResultIch.R4 || 1.0
                };
                console.log('[ResonanzModal] ICH R-Faktoren aus Needs berechnet:', resonanzIch);
            }
        } catch (e) {
            console.warn('[ResonanzModal] Fehler bei ICH R-Faktor-Berechnung:', e);
        }
    }

    if (needsPartner && Object.keys(needsPartner).length > 0 &&
        typeof TiageSynthesis !== 'undefined' &&
        TiageSynthesis.NeedsIntegration &&
        typeof TiageSynthesis.NeedsIntegration.calculateDimensionalResonance === 'function') {

        try {
            const calcResultPartner = TiageSynthesis.NeedsIntegration.calculateDimensionalResonance({
                archetyp: getPartnerArchetype() || 'duo',
                needs: needsPartner
            });

            if (calcResultPartner && calcResultPartner.enabled) {
                resonanzPartner = {
                    R1: calcResultPartner.leben || calcResultPartner.R1 || 1.0,
                    R2: calcResultPartner.philosophie || calcResultPartner.R2 || 1.0,
                    R3: calcResultPartner.dynamik || calcResultPartner.R3 || 1.0,
                    R4: calcResultPartner.identitaet || calcResultPartner.R4 || 1.0
                };
                console.log('[ResonanzModal] PARTNER R-Faktoren aus Needs berechnet:', resonanzPartner);
            }
        } catch (e) {
            console.warn('[ResonanzModal] Fehler bei PARTNER R-Faktor-Berechnung:', e);
        }
    }

    // Fallback: Falls keine Needs vorhanden, lade aus TiageState (SSOT), dann ResonanzCard (Legacy)
    if (resonanzIch.R1 === 1.0 && resonanzIch.R2 === 1.0 && resonanzIch.R3 === 1.0 && resonanzIch.R4 === 1.0) {
        // v1.8.908: Erst TiageState prüfen (SSOT)
        if (typeof TiageState !== 'undefined') {
            // FIX: Per-Archetyp-Pfad lesen
            const ichArch = getIchArchetype() || TiageState.get('archetypes.ich.primary');
            const stateIch = TiageState.getResonanzFaktoren('ich');
            if (stateIch) {
                const extractR = (rf, key) => {
                    if (!rf || rf[key] === undefined) return 1.0;
                    if (typeof rf[key] === 'object' && rf[key].value !== undefined) return rf[key].value;
                    return rf[key];
                };
                const r1 = extractR(stateIch, 'R1');
                const r2 = extractR(stateIch, 'R2');
                const r3 = extractR(stateIch, 'R3');
                const r4 = extractR(stateIch, 'R4');
                // Nur übernehmen wenn mindestens ein Wert != 1.0
                if (r1 !== 1.0 || r2 !== 1.0 || r3 !== 1.0 || r4 !== 1.0) {
                    resonanzIch = { R1: r1, R2: r2, R3: r3, R4: r4 };
                    lockStatusIch = {
                        R1: stateIch.R1?.locked || false,
                        R2: stateIch.R2?.locked || false,
                        R3: stateIch.R3?.locked || false,
                        R4: stateIch.R4?.locked || false
                    };
                    console.log('[ResonanzModal] ICH R-Faktoren aus TiageState geladen:', resonanzIch);
                }
            }
        }
        // Fallback: ResonanzCard (Legacy)
        if (resonanzIch.R1 === 1.0 && resonanzIch.R2 === 1.0 && resonanzIch.R3 === 1.0 && resonanzIch.R4 === 1.0) {
            if (typeof ResonanzCard !== 'undefined') {
                const fullDataIch = ResonanzCard.load('ich');
                resonanzIch = {
                    R1: fullDataIch.R1?.value || 1.0,
                    R2: fullDataIch.R2?.value || 1.0,
                    R3: fullDataIch.R3?.value || 1.0,
                    R4: fullDataIch.R4?.value || 1.0
                };
                lockStatusIch = {
                    R1: fullDataIch.R1?.locked || false,
                    R2: fullDataIch.R2?.locked || false,
                    R3: fullDataIch.R3?.locked || false,
                    R4: fullDataIch.R4?.locked || false
                };
            }
        }
    }

    if (resonanzPartner.R1 === 1.0 && resonanzPartner.R2 === 1.0 && resonanzPartner.R3 === 1.0 && resonanzPartner.R4 === 1.0) {
        // v1.8.908: Erst TiageState prüfen (SSOT), dann ResonanzCard als Fallback
        if (typeof TiageState !== 'undefined') {
            const statePartner = TiageState.getResonanzFaktoren('partner');
            if (statePartner) {
                const extractR = (rf, key) => {
                    if (!rf || rf[key] === undefined) return 1.0;
                    if (typeof rf[key] === 'object' && rf[key].value !== undefined) return rf[key].value;
                    return rf[key];
                };
                const r1 = extractR(statePartner, 'R1');
                const r2 = extractR(statePartner, 'R2');
                const r3 = extractR(statePartner, 'R3');
                const r4 = extractR(statePartner, 'R4');
                // Nur übernehmen wenn mindestens ein Wert != 1.0
                if (r1 !== 1.0 || r2 !== 1.0 || r3 !== 1.0 || r4 !== 1.0) {
                    resonanzPartner = { R1: r1, R2: r2, R3: r3, R4: r4 };
                    lockStatusPartner = {
                        R1: statePartner.R1?.locked || false,
                        R2: statePartner.R2?.locked || false,
                        R3: statePartner.R3?.locked || false,
                        R4: statePartner.R4?.locked || false
                    };
                    console.log('[ResonanzModal] PARTNER R-Faktoren aus TiageState geladen:', resonanzPartner);
                }
            }
        }
        // Fallback: ResonanzCard (Legacy)
        if (resonanzPartner.R1 === 1.0 && resonanzPartner.R2 === 1.0 && resonanzPartner.R3 === 1.0 && resonanzPartner.R4 === 1.0) {
            if (typeof ResonanzCard !== 'undefined') {
                const fullDataPartner = ResonanzCard.load('partner');
                resonanzPartner = {
                    R1: fullDataPartner.R1?.value || 1.0,
                    R2: fullDataPartner.R2?.value || 1.0,
                    R3: fullDataPartner.R3?.value || 1.0,
                    R4: fullDataPartner.R4?.value || 1.0
                };
                lockStatusPartner = {
                    R1: fullDataPartner.R1?.locked || false,
                    R2: fullDataPartner.R2?.locked || false,
                    R3: fullDataPartner.R3?.locked || false,
                    R4: fullDataPartner.R4?.locked || false
                };
            }
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PAARUNGS-Resonanz berechnen: R_PAARUNG = Summe × Similarity (v3.6)
    // Formel: (R_ich + R_partner) × (min/max) - belohnt Ähnlichkeit
    // ═══════════════════════════════════════════════════════════════════════════
    // SSOT: Gleiche Formel wie combineRFactors() in synthesisCalculator.js
    // Keine Zwischen-Rundung — Display-Rundung per toFixed(2)
    const combineR = (a, b) => {
        const summe = a + b;
        const similarity = Math.min(a, b) / Math.max(a, b);
        return (summe * similarity) / 2;
    };

    const resonanzWerte = {
        R1: combineR(resonanzIch.R1, resonanzPartner.R1),
        R2: combineR(resonanzIch.R2, resonanzPartner.R2),
        R3: combineR(resonanzIch.R3, resonanzPartner.R3),
        R4: combineR(resonanzIch.R4, resonanzPartner.R4)
    };

    console.log('[ResonanzModal] ICH:', resonanzIch, 'PARTNER:', resonanzPartner, 'PAARUNG (Summe×Similarity):', resonanzWerte);

    // R-Faktoren Konfiguration mit AGOD-Zuordnung (v3.3: 18 Kategorien)
    // Die 18 GFK-Kategorien werden auf 4 Resonanzfaktoren aggregiert.
    // Sekundäre Kategorien fließen mit 30% Gewichtung ein.
    const rFaktoren = {
        R1: {
            label: 'Leben',
            icon: '🔥',
            color: '#E63946',
            agod: 'Orientierung',
            agodIcon: 'O',
            beschreibung: 'Existenz, Zuneigung, Muße, Intimität & Romantik',
            kategorien: 4
        },
        R2: {
            label: 'Philosophie',
            icon: '🧠',
            color: '#2A9D8F',
            agod: 'Archetyp',
            agodIcon: 'A',
            beschreibung: 'Freiheit, Teilnahme, Identität, Lebensplanung, Finanzen, Werte, Soziales, Praktisches',
            kategorien: 8
        },
        R3: {
            label: 'Dynamik',
            icon: '⚡',
            color: '#8B5CF6',
            agod: 'Dominanz',
            agodIcon: 'D',
            beschreibung: 'Dynamik, Sicherheit',
            kategorien: 2
        },
        R4: {
            label: 'Identität',
            icon: '💚',
            color: '#F4A261',
            agod: 'Geschlecht',
            agodIcon: 'G',
            beschreibung: 'Verständnis, Erschaffen, Verbundenheit, Kommunikation',
            kategorien: 4
        }
    };

    // Wert-Anzeige mit Farbcodierung und Lock-Status (nur Anzeige, nicht änderbar)
    function getWertDisplay(wert, isLocked, showLock) {
        let color = '#eab308';
        if (wert >= 1.1) color = '#22c55e';
        else if (wert <= 0.9) color = '#ef4444';

        const lockIcon = showLock
            ? (isLocked
                ? `<span style="margin-left: 4px; opacity: 0.9;" title="${TiageI18n.t('ui.manuallyLocked', 'Manuell gesperrt (ändern in Attribute)')}">🔒</span>`
                : `<span style="margin-left: 4px; opacity: 0.3;" title="${TiageI18n.t('ui.autoCalculated', 'Automatisch berechnet')}">🔓</span>`)
            : '';

        return `<span style="color: ${color}; font-weight: 600;">${wert.toFixed(2)}</span>${lockIcon}`;
    }

    // Tabellen-Zeilen für R-Faktoren
    let tableRows = '';

    ['R1', 'R2', 'R3', 'R4'].forEach(rk => {
        const rf = rFaktoren[rk];
        const wertIch = resonanzIch[rk] || 1.0;
        const wertPartner = resonanzPartner[rk] || 1.0;
        const wertKombi = resonanzWerte[rk] || 1.0;
        const lockedIch = lockStatusIch[rk];
        const lockedPartner = lockStatusPartner[rk];

        // Klickbare Zellen für Herleitung
        const clickStyleIch = 'cursor: pointer; transition: background 0.15s;';
        const clickStylePartner = 'cursor: pointer; transition: background 0.15s;';
        const hoverTitle = TiageI18n.t('ui.clickForDerivation', 'Klick für Herleitung');

        tableRows += `
            <tr style="border-bottom: 1px solid rgba(255,255,255,0.08);">
                <td style="padding: 12px 14px; font-size: 13px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="color: ${rf.color}; font-weight: 600;">${rf.icon} ${rk}</span>
                        <span style="color: var(--text-secondary);">${rf.label}</span>
                    </div>
                    <div style="font-size: 10px; color: var(--text-muted); margin-top: 2px;">
                        → multipliziert <strong>${rf.agodIcon}</strong> (${rf.agod})
                    </div>
                </td>
                <td style="padding: 12px 10px; text-align: center; font-size: 14px; ${clickStyleIch}"
                    onclick="showValueDerivation('${rk}', 'ich', ${wertIch})"
                    title="${hoverTitle}"
                    onmouseover="this.style.background='rgba(34,197,94,0.15)'"
                    onmouseout="this.style.background=''">${getWertDisplay(wertIch, lockedIch, true)}</td>
                <td style="padding: 12px 10px; text-align: center; font-size: 14px; ${clickStylePartner}"
                    onclick="showValueDerivation('${rk}', 'partner', ${wertPartner})"
                    title="${hoverTitle}"
                    onmouseover="this.style.background='rgba(239,68,68,0.15)'"
                    onmouseout="this.style.background=''">${getWertDisplay(wertPartner, lockedPartner, true)}</td>
                <td style="padding: 12px 10px; text-align: center; font-size: 14px; background: rgba(139,92,246,0.1);">${getWertDisplay(wertKombi, false, false)}</td>
            </tr>`;
    });

    // Archetyp-Buttons
    const ichArch = window.archetypeDescriptions[getIchArchetype()];
    const partnerArch = window.archetypeDescriptions[getPartnerArchetype()];
    const ichName = ichArch?.name || 'ICH';
    const partnerName = partnerArch?.name || 'Partner';
    const ichIcon = ichArch?.icon || '👤';
    const partnerIcon = partnerArch?.icon || '👤';

    modal.innerHTML = `
        <div style="background: var(--bg-primary); border-radius: 16px; max-width: 600px; width: 95%; max-height: 90vh; overflow-y: auto; box-shadow: 0 20px 60px rgba(0,0,0,0.5); border: 1px solid rgba(139,92,246,0.3);">
            <!-- Header -->
            <div style="padding: 20px 24px; border-bottom: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="font-size: 24px;">🎛️</span>
                    <div>
                        <h2 style="margin: 0; font-size: 18px; color: var(--text-primary);">${TiageI18n.t('modals.resonanzHeading', 'Resonanzfaktoren (R1-R4)')}</h2>
                        <p style="margin: 4px 0 0 0; font-size: 12px; color: var(--text-muted);">${TiageI18n.t('modals.resonanzCoherence', 'Kohärenz zwischen Bedürfnissen und Archetyp')}</p>
                    </div>
                </div>
                <button onclick="closeResonanzfaktorenModal()" style="background: rgba(255,255,255,0.1); border: none; border-radius: 8px; width: 36px; height: 36px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 18px; color: var(--text-secondary); transition: all 0.2s;">×</button>
            </div>

            <!-- Archetyp-Switcher (gleicher Stil wie Ti-Age Synthese) -->
            <div style="display: flex; justify-content: center; align-items: center; gap: 20px; padding: 16px 24px; background: rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.05);">
                <!-- ICH Navigation -->
                <div style="display: flex; align-items: center; gap: 6px;">
                    <button class="archetype-nav-btn" onclick="navigateResonanzArchetype('ich', -1)" title="${TiageI18n.t('modals.prevArchetype', 'Vorheriger Archetyp')}" style="width: 28px; height: 28px; font-size: 1.2rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; cursor: pointer; color: var(--text-secondary);">‹</button>
                    <div style="text-align: center; min-width: 120px;">
                        <div style="font-size: 10px; color: var(--success); font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">ICH</div>
                        <div style="font-size: 13px; color: var(--text-primary); font-weight: 600;">${ichName}</div>
                    </div>
                    <button class="archetype-nav-btn" onclick="navigateResonanzArchetype('ich', 1)" title="${TiageI18n.t('modals.nextArchetype', 'Nächster Archetyp')}" style="width: 28px; height: 28px; font-size: 1.2rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; cursor: pointer; color: var(--text-secondary);">›</button>
                </div>
                <div style="font-size: 18px; color: var(--text-muted);">×</div>
                <!-- PARTNER Navigation -->
                <div style="display: flex; align-items: center; gap: 6px;">
                    <button class="archetype-nav-btn" onclick="navigateResonanzArchetype('partner', -1)" title="${TiageI18n.t('modals.prevArchetype', 'Vorheriger Archetyp')}" style="width: 28px; height: 28px; font-size: 1.2rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; cursor: pointer; color: var(--text-secondary);">‹</button>
                    <div style="text-align: center; min-width: 120px;">
                        <div style="font-size: 10px; color: var(--danger); font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: 0.5px;">PARTNER</div>
                        <div style="font-size: 13px; color: var(--text-primary); font-weight: 600;">${partnerName}</div>
                    </div>
                    <button class="archetype-nav-btn" onclick="navigateResonanzArchetype('partner', 1)" title="${TiageI18n.t('modals.nextArchetype', 'Nächster Archetyp')}" style="width: 28px; height: 28px; font-size: 1.2rem; background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); border-radius: 6px; cursor: pointer; color: var(--text-secondary);">›</button>
                </div>
            </div>

            <!-- Tabelle -->
            <div style="padding: 20px 24px;">
                <div style="background: linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.06)); border-radius: 12px; border: 1px solid rgba(139,92,246,0.25); overflow: hidden;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="border-bottom: 2px solid rgba(139,92,246,0.3); background: rgba(0,0,0,0.2);">
                                <th style="padding: 12px 14px; text-align: left; color: var(--text-muted); font-weight: 500; font-size: 12px;">${TiageI18n.t('modals.rFactorAgod', 'R-Faktor → AGOD')}</th>
                                <th style="padding: 12px 10px; text-align: center; color: var(--success); font-weight: 500; font-size: 12px;">${TiageI18n.t('ui.ich', 'ICH')}</th>
                                <th style="padding: 12px 10px; text-align: center; color: var(--danger); font-weight: 500; font-size: 12px;">${TiageI18n.t('ui.partner', 'PARTNER')}</th>
                                <th style="padding: 12px 10px; text-align: center; color: #8B5CF6; font-weight: 600; font-size: 12px; background: rgba(139,92,246,0.1);">${TiageI18n.t('modals.paarung', 'PAARUNG')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>

                <!-- Erläuterung -->
                <div style="margin-top: 16px; padding: 12px; background: rgba(0,0,0,0.2); border-radius: 8px; font-size: 11px; color: var(--text-muted); line-height: 1.6;">
                    <div style="margin-bottom: 8px;">
                        <strong style="color: var(--text-secondary);">${TiageI18n.t('modals.tableWhat', 'Was zeigt diese Tabelle?')}</strong>
                    </div>
                    <div>
                        <strong style="color: #22c55e;">${TiageI18n.t('ui.ich', 'ICH')}</strong> / <strong style="color: #ef4444;">${TiageI18n.t('ui.partner', 'PARTNER')}</strong>:
                        ${TiageI18n.t('modals.tableIchPartner', 'Kohärenz zwischen Bedürfnissen und gewähltem Archetyp.')}<br>
                        <strong style="color: #8B5CF6;">${TiageI18n.t('modals.paarung', 'PAARUNG')}</strong>:
                        ${TiageI18n.t('modals.tablePaarung', 'R_ICH × R_PARTNER (Produkt der individuellen Kohärenz-Werte).')}<br>
                        ${TiageI18n.t('modals.tablePaarungMultiplies', 'Der PAARUNGS-Wert multipliziert den jeweiligen AGOD-Score:')}
                    </div>
                    <div style="margin-top: 8px; font-family: monospace; font-size: 10px;">
                        Q = (O × wO × R₁) + (A × wA × R₂) + (D × wD × R₃) + (G × wG × R₄)
                    </div>
                    <div style="margin-top: 8px; display: flex; gap: 12px; flex-wrap: wrap;">
                        <span style="color: #22c55e;">${TiageI18n.t('modals.legendBoost', '● >1.0 = verstärkt Score')}</span>
                        <span style="color: #eab308;">${TiageI18n.t('modals.legendNeutral', '● =1.0 = neutral')}</span>
                        <span style="color: #ef4444;">${TiageI18n.t('modals.legendWeaken', '● <1.0 = schwächt Score')}</span>
                    </div>
                    <div style="margin-top: 10px; padding-top: 8px; border-top: 1px solid rgba(255,255,255,0.1);">
                        <span>${TiageI18n.t('modals.lockManual', '🔒 = manuell gesperrt (ändert sich nicht bei Archetyp-Wechsel)')}</span><br>
                        <span>${TiageI18n.t('modals.lockAuto', '🔓 = automatisch (wird bei Archetyp-Wechsel neu berechnet)')}</span>
                    </div>
                    <div style="margin-top: 10px; padding: 8px; background: rgba(139,92,246,0.15); border-radius: 6px; border: 1px solid rgba(139,92,246,0.3);">
                        <span style="color: var(--text-secondary);">${TiageI18n.t('modals.tipClickValue', '💡 Tipp: Klicke auf einen ICH- oder PARTNER-Wert, um die vollständige Herleitung zu sehen!')}</span>
                    </div>
                </div>
            </div>
        </div>`;
}

/**
 * Generiert den Synthese-Quote-Text basierend auf dem aktuellen Score
 * Wird im CREATIVITY-Abschnitt des Modals angezeigt
 * Verwendet die ResonanceQuotesTable für Pirsig/Osho/Sprichwörter-Zitate
 */
function getSyntheseQuoteText() {
    // Hole den aktuellen Score aus dem Display
    const scoreEl = document.getElementById('mainScoreValue') || document.getElementById('mobileScoreCircle');
    const scoreText = scoreEl?.textContent || '0';
    const score = parseInt(scoreText, 10) || 0;

    let noteText = '';
    let quoteText = '';
    let quoteSource = '';

    // Bestimme Resonanzlevel basierend auf Score
    let resonanceLevel = 'niedrig';
    if (score >= 80) resonanceLevel = 'hoch';
    else if (score >= 50) resonanceLevel = 'mittel';

    // Versuche Zitat aus ResonanceQuotesTable zu holen
    if (typeof ResonanceQuotesTable !== 'undefined') {
        const category = score >= 65 ? 'RESONANCE' : score >= 50 ? 'GROWTH' : 'AWARENESS';
        const result = ResonanceQuotesTable.generateResonanceText(resonanceLevel, category, 'de');

        if (result && result.quote) {
            noteText = result.title;
            quoteText = result.quote;
            quoteSource = result.quoteSource;
            return { noteText, quoteText, quoteSource };
        }
    }

    // Fallback zu hardcoded Texten
    if (score < 30) {
        noteText = 'Sehr niedrige Resonanz – große Unterschiede.';
        quoteText = 'Hier begegnen sich zwei Menschen, deren Frequenzen sich deutlich unterscheiden. Diese Beziehung erfordert besondere Achtsamkeit und die Bereitschaft, die Andersartigkeit des anderen als Bereicherung zu sehen.';
    } else if (score >= 80) {
        noteText = 'Hohe Resonanz – Muster ergänzen sich.';
        quoteText = 'Hier begegnen sich zwei Menschen, deren Frequenzen sich natürlich ergänzen. Diese Verbindung trägt die Qualität tiefer Resonanz – ein Zusammenspiel, das beide bereichert und wachsen lässt.';
    } else if (score >= 65) {
        noteText = 'Solide Balance mit Potenzial.';
        quoteText = 'Hier begegnen sich zwei Menschen mit guter Grundresonanz. Diese Verbindung bietet eine solide Balance und echtes Potenzial für gemeinsames Wachstum.';
    } else if (score >= 50) {
        noteText = 'Basis vorhanden, Arbeit erforderlich.';
        quoteText = 'Hier begegnen sich zwei Menschen mit einer tragfähigen Basis. Diese Verbindung hat Qualität, die durch bewusste Kommunikation und gegenseitiges Verständnis vertieft werden kann.';
    } else {
        noteText = 'Bewusste Reflexion erforderlich.';
        quoteText = 'Hier begegnen sich zwei Menschen mit unterschiedlichen Mustern. Diese Verbindung lädt zur bewussten Reflexion ein – ein Weg, der Offenheit und ehrliche Kommunikation erfordert.';
    }

    return { noteText, quoteText, quoteSource: '' };
}

// ═══════════════════════════════════════════════════════════════════════
// TEXT-TO-SPEECH (TTS) für CREATIVITY-Bereich
// ═══════════════════════════════════════════════════════════════════════

// Track which section is currently being read
let currentTTSSection = null;

/**
 * Toggle Text-to-Speech for the CREATIVITY section
 * @param {string} section - 'pathos' or 'logos'
 */
function toggleCreativityTTS(section) {
    // Check if TTS is supported
    if (!TiageTTS || !TiageTTS.isSupported()) {
        const notSupportedMsg = TiageI18n.t('tts.notSupported', 'Vorlesen wird in diesem Browser nicht unterstützt');
        alert(notSupportedMsg);
        return;
    }

    const iconEl = document.getElementById(`ttsIcon${section.charAt(0).toUpperCase() + section.slice(1)}`);
    const buttonEl = document.getElementById(`ttsButton${section.charAt(0).toUpperCase() + section.slice(1)}`);
    const textEl = document.getElementById(`creativityText${section.charAt(0).toUpperCase() + section.slice(1)}`);

    if (!textEl || !iconEl) return;

    // If currently speaking the same section
    if (currentTTSSection === section && TiageTTS.isSpeaking()) {
        if (TiageTTS.isPaused()) {
            // Resume
            TiageTTS.resume();
            iconEl.textContent = '⏸️';
            buttonEl.title = TiageI18n.t('tts.pause', 'Pausieren');
        } else {
            // Pause
            TiageTTS.pause();
            iconEl.textContent = '▶️';
            buttonEl.title = TiageI18n.t('tts.resume', 'Fortsetzen');
        }
        return;
    }

    // If speaking a different section, stop first
    if (TiageTTS.isSpeaking()) {
        TiageTTS.stop();
        resetTTSButtons();
    }

    // Get text content and start speaking
    const text = textEl.textContent || textEl.innerText;
    if (!text.trim()) return;

    currentTTSSection = section;
    TiageTTS.speak(text);

    // Update button
    iconEl.textContent = '⏸️';
    buttonEl.title = TiageI18n.t('tts.pause', 'Pausieren');

    // Subscribe to TTS events for this speech
    const unsubscribe = TiageTTS.subscribe((event) => {
        if (event.type === 'end' || event.type === 'stop' || event.type === 'error') {
            resetTTSButtons();
            currentTTSSection = null;
            unsubscribe();
        }
    });
}

/**
 * Reset all TTS buttons to their default state
 */
function resetTTSButtons() {
    const playLabel = TiageI18n.t('tts.play', 'Vorlesen');

    ['Pathos', 'Logos'].forEach(section => {
        const iconEl = document.getElementById(`ttsIcon${section}`);
        const buttonEl = document.getElementById(`ttsButton${section}`);
        if (iconEl) iconEl.textContent = '🔊';
        if (buttonEl) buttonEl.title = playLabel;
    });
}

/**
 * Stop TTS when modal is closed
 */
function stopTTSOnModalClose() {
    if (TiageTTS && TiageTTS.isSpeaking()) {
        TiageTTS.stop();
        resetTTSButtons();
        currentTTSSection = null;
    }
}

/**
 * Generate Osho Zen content - Top 5 gemeinsame Bedürfnisse mit Osho Zen Tarot Texten
 */
function getOshoZenContent() {
    // Hole die Profile
    const profile1 = window.LoadedArchetypProfile?.ich || {};
    const profile2 = window.LoadedArchetypProfile?.partner || {};

    // Namen ermitteln
    const ichName = profile1.name || window.archetypeDescriptions[getIchArchetype()]?.name || 'Ich';
    const partnerName = profile2.name || window.archetypeDescriptions[getPartnerArchetype()]?.name || 'Partner';

    // Prüfe ob OshoZenTextGenerator verfügbar ist
    if (typeof OshoZenTextGenerator === 'undefined') {
        return `
            <div style="padding: 20px; text-align: center; color: var(--text-muted);">
                <p>${TiageI18n.t('synthese.oshoLoading', 'Osho Zen Modul wird geladen...')}</p>
                <p style="font-size: 0.85rem; margin-top: 10px;">
                    ${TiageI18n.t('synthese.oshoEnsureLoaded', 'Bitte stelle sicher, dass oshoZenTextGenerator.js geladen ist.')}
                </p>
            </div>
        `;
    }

    // Prüfe ob Daten geladen sind
    if (!OshoZenTextGenerator.isDataLoaded()) {
        // Asynchron laden und dann Content aktualisieren
        OshoZenTextGenerator.loadData().then(() => {
            const contentEl = document.getElementById('tiageSyntheseModalContent');
            if (contentEl && currentTiageSyntheseType === 'oshozen') {
                contentEl.innerHTML = getOshoZenContent();
            }
        }).catch(err => {
            console.error('Fehler beim Laden der Osho Zen Daten:', err);
        });

        return `
            <div style="padding: 20px; text-align: center; color: var(--text-muted);">
                <div style="font-size: 2rem; margin-bottom: 10px;">🔥</div>
                <p>${TiageI18n.t('synthese.oshoLoadingTexts', 'Lade Osho Zen Texte...')}</p>
            </div>
        `;
    }

    // Sprach-Toggle für Osho-Texte
    const currentLang = TiageI18n.getLanguage();
    const langs = [
        { code: 'de', flag: '🇩🇪', label: 'DE' },
        { code: 'en', flag: '🇬🇧', label: 'EN' },
        { code: 'fr', flag: '🇫🇷', label: 'FR' },
        { code: 'it', flag: '🇮🇹', label: 'IT' }
    ];
    const langButtons = langs.map(l =>
        `<button onclick="TiageI18n.setLanguage('${l.code}'); setTimeout(function(){ var el=document.getElementById('tiageSyntheseModalContent'); if(el) el.innerHTML=getOshoZenContent(); }, 300);" style="padding:4px 10px;border:1px solid ${l.code === currentLang ? 'var(--primary)' : 'rgba(255,255,255,0.15)'};border-radius:6px;background:${l.code === currentLang ? 'var(--primary)' : 'transparent'};color:${l.code === currentLang ? 'white' : 'var(--text-muted)'};cursor:pointer;font-size:12px;font-weight:600;transition:all 0.2s;">${l.flag} ${l.label}</button>`
    ).join('');
    const langToggleHtml = `<div style="display:flex;justify-content:center;gap:6px;margin-bottom:16px;">${langButtons}</div>`;

    // Generiere den Content
    return langToggleHtml + OshoZenTextGenerator.generateSync({
        profile1: profile1,
        profile2: profile2,
        name1: ichName,
        name2: partnerName,
        topN: 5
    });
}

function getPathosContent() {
    const ichArch = window.archetypeDescriptions[getIchArchetype()];
    const partnerArch = window.archetypeDescriptions[getPartnerArchetype()];
    const detailed = generateDetailedPathos(ichArch, partnerArch);
    const ichName = ichArch?.name || 'ICH';
    const partnerName = partnerArch?.name || 'Partner';

    // GFK-Bedürfnis-Analyse holen
    const gfkAnalyse = getGfkBeduerfnisAnalyse('pathos');

    const creativityLabel = TiageI18n.t('synthesisSection.creativity', 'CREATIVITY');

    // Dynamik+Wachstum kombiniert als Fließtext
    const dynamikWachstumText = gfkAnalyse.dynamikSection || '';

    // Synthese-Quote-Text für CREATIVITY-Abschnitt
    const syntheseQuote = getSyntheseQuoteText();

    // TTS Button Label
    const ttsPlayLabel = TiageI18n.t('tts.play', 'Vorlesen');

    let html = `
        <!-- GEMEINSAME BEDÜRFNISSE -->
        ${gfkAnalyse.gemeinsamSection}

        <!-- CREATIVITY -->
        <div style="margin-bottom: 16px;">
            <div style="padding: 14px; background: linear-gradient(135deg, rgba(255,215,0,0.1), rgba(231,111,81,0.08)); border-radius: 10px; border: 1px solid rgba(231,111,81,0.3);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 14px;">🔥</span>
                        <span style="font-size: 11px; color: #FFD700; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">${creativityLabel}</span>
                    </div>
                    <button id="ttsButtonPathos" onclick="toggleCreativityTTS('pathos')" title="${ttsPlayLabel}" style="background: rgba(255,215,0,0.2); border: 1px solid rgba(255,215,0,0.4); border-radius: 6px; padding: 4px 8px; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: all 0.2s ease;">
                        <span id="ttsIconPathos" style="font-size: 14px;">🔊</span>
                    </button>
                </div>
                <div id="creativityTextPathos">
                    <p style="font-size: 13px; margin: 0 0 10px 0; line-height: 1.5;"><strong style="color: var(--text-primary);">${syntheseQuote.noteText}</strong></p>
                    <p style="font-size: 13px; margin: 0 0 12px 0; line-height: 1.5; font-style: italic; color: var(--text-secondary); opacity: 0.9;">"${syntheseQuote.quoteText}"</p>
                    <p style="font-size: 14px; margin: 0; line-height: 1.6; font-style: italic;">${detailed.synthese}</p>
                </div>
                ${dynamikWachstumText}
            </div>
        </div>`;

    return html;
}

function getLogosContent() {
    const ichArch = window.archetypeDescriptions[getIchArchetype()];
    const partnerArch = window.archetypeDescriptions[getPartnerArchetype()];
    const detailed = generateDetailedLogos(ichArch, partnerArch);
    const ichName = ichArch?.name || 'ICH';
    const partnerName = partnerArch?.name || 'Partner';

    // GFK-Bedürfnis-Analyse holen
    const gfkAnalyse = getGfkBeduerfnisAnalyse('logos');

    const creativityLabel = TiageI18n.t('synthesisSection.creativity', 'CREATIVITY');

    // Dynamik+Wachstum kombiniert als Fließtext
    const dynamikWachstumText = gfkAnalyse.dynamikSection || '';

    // Synthese-Quote-Text für CREATIVITY-Abschnitt
    const syntheseQuote = getSyntheseQuoteText();

    // TTS Button Label
    const ttsPlayLabel = TiageI18n.t('tts.play', 'Vorlesen');

    let html = `
        <!-- GEMEINSAME WERTE -->
        ${gfkAnalyse.gemeinsamSection}

        <!-- CREATIVITY -->
        <div style="margin-bottom: 16px;">
            <div style="padding: 14px; background: linear-gradient(135deg, rgba(100,149,237,0.1), rgba(69,123,157,0.08)); border-radius: 10px; border: 1px solid rgba(69,123,157,0.3);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 14px;">🧠</span>
                        <span style="font-size: 11px; color: #6495ED; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">${creativityLabel}</span>
                    </div>
                    <button id="ttsButtonLogos" onclick="toggleCreativityTTS('logos')" title="${ttsPlayLabel}" style="background: rgba(100,149,237,0.2); border: 1px solid rgba(100,149,237,0.4); border-radius: 6px; padding: 4px 8px; cursor: pointer; display: flex; align-items: center; gap: 4px; transition: all 0.2s ease;">
                        <span id="ttsIconLogos" style="font-size: 14px;">🔊</span>
                    </button>
                </div>
                <div id="creativityTextLogos">
                    <p style="font-size: 13px; margin: 0 0 10px 0; line-height: 1.5;"><strong style="color: var(--text-primary);">${syntheseQuote.noteText}</strong></p>
                    <p style="font-size: 13px; margin: 0 0 12px 0; line-height: 1.5; font-style: italic; color: var(--text-secondary); opacity: 0.9;">"${syntheseQuote.quoteText}"</p>
                    <p style="font-size: 14px; margin: 0; line-height: 1.6; font-style: italic;">${detailed.synthese}</p>
                </div>
                ${dynamikWachstumText}
            </div>
        </div>`;

    return html;
}

/**
 * Generate Needs content (Bedürfnis-Match mit Differenz)
 * Shows the full needs comparison with difference values
 */
// Sortierung State für Needs Synthese
let needsSyntheseSortBy = null; // 'ich', 'diff', 'partner'
let needsSyntheseSortDir = 'desc';

function sortNeedsSyntheseContent(column) {
    if (needsSyntheseSortBy === column) {
        needsSyntheseSortDir = needsSyntheseSortDir === 'desc' ? 'asc' : 'desc';
    } else {
        needsSyntheseSortBy = column;
        needsSyntheseSortDir = 'desc';
    }
    // Re-render content
    const contentEl = document.getElementById('tiageSyntheseModalContent');
    if (contentEl) {
        contentEl.innerHTML = getNeedsContent();
    }
}
window.sortNeedsSyntheseContent = sortNeedsSyntheseContent;

/**
 * Helper function to get actual need value from TiageState
 * @param {string} person - 'ich' or 'partner'
 * @param {string} needId - Need ID like '#B1', '#B2', etc.
 * @returns {number|null} - The actual value or null if not found
 */
function getActualNeedValue(person, needId) {
    if (typeof TiageState === 'undefined') {
        return null;
    }

    // Get locked and flat needs
    const lockedNeeds = TiageState.getLockedNeeds(person) || {};
    const flatNeeds = TiageState.getFlatNeeds(person) || {};

    // lockedNeeds have priority
    if (lockedNeeds[needId] !== undefined && lockedNeeds[needId] !== null) {
        return lockedNeeds[needId];
    }
    if (flatNeeds[needId] !== undefined && flatNeeds[needId] !== null) {
        return flatNeeds[needId];
    }
    return null;
}

/**
 * Helper function to check if a need is locked
 * @param {string} person - 'ich' or 'partner'
 * @param {string} needId - Need ID like '#B1', '#B2', etc.
 * @returns {boolean} - True if the need is locked
 */
function isNeedLocked(person, needId) {
    if (typeof TiageState === 'undefined') {
        return false;
    }

    const lockedNeeds = TiageState.getLockedNeeds(person) || {};
    return lockedNeeds[needId] !== undefined && lockedNeeds[needId] !== null;
}

function getNeedsContent() {
    // Matching-Daten holen - Schlüssel unverändert (duo_flex bleibt duo_flex)
    const ichArchetyp = getIchArchetype() || '';
    const partnerArchetyp = getPartnerArchetype() || '';

    if (!ichArchetyp || !partnerArchetyp) {
        return '<p style="color: var(--text-muted);">' + TiageI18n.t('synthese.noDataAvailable', 'Keine Daten verfügbar.') + '</p>';
    }

    const ichName = window.archetypeDescriptions[getIchArchetype()]?.name || TiageI18n.t('ui.ich', 'ICH');
    const partnerName = window.archetypeDescriptions[getPartnerArchetype()]?.name || TiageI18n.t('ui.partner', 'Partner');

    // NEU: Direkt aus TiageState.flatNeeds lesen (inkl. lockedNeeds)
    let matching = null;
    let isFallback = false;

    // Primär: Direkt aus TiageState.flatNeeds
    const result = calculateNeedsMatchFromFlatNeeds();
    if (result) {
        // Format-Konvertierung: need → { label, id, wert1, wert2, diff }
        const formatNeed = (item) => ({
            label: formatBeduerfnisLabel(item.need),
            id: item.need,
            wert1: item.wert1,
            wert2: item.wert2,
            diff: Math.abs(item.wert1 - item.wert2)
        });

        matching = {
            score: result.score,
            details: {
                uebereinstimmend: result.gemeinsam.map(formatNeed),
                komplementaer: result.komplementaer.map(formatNeed),
                konflikt: result.unterschiedlich.map(formatNeed)
            }
        };
        console.log('[getNeedsContent] ✓ Verwende individualisierte Werte aus TiageState.flatNeeds');
    }

    // Fallback: Alte Methode (nur Archetyp - falls flatNeeds leer)
    if (!matching && typeof GfkBeduerfnisse !== 'undefined') {
        matching = GfkBeduerfnisse.berechneMatching(ichArchetyp, partnerArchetyp);
        isFallback = true;
        console.log('[getNeedsContent] ⚠ Fallback: Verwende Archetyp-basierte Bedürfniswerte');
    }

    if (!matching) {
        return `<p style="color: var(--text-muted);">${TiageI18n.t('ui.noDataAvailable', 'Keine Daten verfügbar.')}</p>`;
    }

    // Lock-Icons helper für Anzeige
    const ichLockedNeeds = typeof TiageState !== 'undefined' ? (TiageState.getLockedNeeds('ich') || {}) : {};
    const partnerLockedNeeds = typeof TiageState !== 'undefined' ? (TiageState.getLockedNeeds('partner') || {}) : {};

    const isNeedLocked = (person, needId) => {
        const lockedNeeds = person === 'ich' ? ichLockedNeeds : partnerLockedNeeds;
        return lockedNeeds[needId] !== undefined && lockedNeeds[needId] !== null;
    };

    // Score-Anzeige
    const scoreValue = matching.score || 0;
    let scoreColor = '#ef4444';
    if (scoreValue >= 80) {
        scoreColor = '#22c55e';
    } else if (scoreValue >= 60) {
        scoreColor = '#eab308';
    }

    // Score Header
    let html = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 48px; font-weight: 700; color: ${scoreColor};">${scoreValue}%</div>
            <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">
                ${TiageI18n.t('synthese.needsMatchLabel', 'Bedürfnis-Übereinstimmung:')}
                <span onclick="openNeedsScoreExplanation();" style="cursor: help; margin-left: 6px; opacity: 0.8; font-size: 14px;" title="ℹ️">ℹ️</span>
            </div>
        </div>
    `;

    // Fallback-Hinweis (nur wenn Archetyp-basierte Werte verwendet werden)
    if (isFallback) {
        html += `
            <div style="
                background: rgba(234, 179, 8, 0.1);
                border: 1px solid rgba(234, 179, 8, 0.3);
                border-radius: 6px;
                padding: 8px 12px;
                margin-bottom: 16px;
                display: flex;
                align-items: center;
                gap: 8px;
            ">
                <span style="font-size: 14px;">ℹ️</span>
                <div style="flex: 1;">
                    <div style="font-size: 11px; font-weight: 600; color: #eab308; margin-bottom: 2px;">${TiageI18n.t('synthese.archetypeBaseValues', 'Archetyp-Basis-Werte')}</div>
                    <div style="font-size: 10px; color: var(--text-muted); line-height: 1.4;">
                        ${TiageI18n.t('synthese.archetypeBaseValuesDesc', 'Individualisierte Werte nicht verfügbar. Es werden Standard-Archetyp-Werte angezeigt.')}
                    </div>
                </div>
            </div>
        `;
    }

    // Gemeinsame & Kompatible Bedürfnisse
    const uebereinstimmend = matching.details?.uebereinstimmend || [];
    const komplementaer = matching.details?.komplementaer || [];

    // v4.4: Filter: Nur Hauptfragen anzeigen, entfernte Bedürfnisse ausblenden
    // Bedürfnisse B95-B125 wurden aus dem Katalog entfernt (v3.4.0)
    const shouldShowNeed = (item) => {
        if (typeof BeduerfnisIds === 'undefined' || !BeduerfnisIds.beduerfnisse) return true;
        const need = BeduerfnisIds.beduerfnisse[item.id];
        // Bedürfnis existiert nicht im Katalog → nicht anzeigen
        if (!need) return false;
        // Nuancen nicht anzeigen (nur für Feuer-Synthese)
        if (need.frageTyp === 'nuance') return false;
        // Hauptfragen oder alte Daten ohne frageTyp → anzeigen
        return true;
    };

    let gemeinsam = [...uebereinstimmend, ...komplementaer].filter(shouldShowNeed);

    // Unterschiedliche Prioritäten
    let konflikt = [...(matching.details?.konflikt || [])].filter(shouldShowNeed);

    // Sortierung anwenden
    const sortItems = (items) => {
        if (!needsSyntheseSortBy) {
            // Default: nach Durchschnitt sortieren
            return items.sort((a, b) => ((b.wert1 + b.wert2) / 2) - ((a.wert1 + a.wert2) / 2));
        }
        return items.sort((a, b) => {
            let valA, valB;
            if (needsSyntheseSortBy === 'ich') {
                valA = a.wert1 || 0;
                valB = b.wert1 || 0;
            } else if (needsSyntheseSortBy === 'diff') {
                valA = Math.abs((a.wert1 || 0) - (a.wert2 || 0));
                valB = Math.abs((b.wert1 || 0) - (b.wert2 || 0));
            } else {
                valA = a.wert2 || 0;
                valB = b.wert2 || 0;
            }
            return needsSyntheseSortDir === 'desc' ? valB - valA : valA - valB;
        });
    };

    gemeinsam = sortItems(gemeinsam);
    konflikt = sortItems(konflikt);

    // Sort-Icons
    const ichSortIcon = needsSyntheseSortBy === 'ich'
        ? (needsSyntheseSortDir === 'desc' ? '▼' : '▲')
        : '⇅';
    const diffSortIcon = needsSyntheseSortBy === 'diff'
        ? (needsSyntheseSortDir === 'desc' ? '▼' : '▲')
        : '⇅';
    const partnerSortIcon = needsSyntheseSortBy === 'partner'
        ? (needsSyntheseSortDir === 'desc' ? '▼' : '▲')
        : '⇅';
    const ichActive = needsSyntheseSortBy === 'ich';
    const diffActive = needsSyntheseSortBy === 'diff';
    const partnerActive = needsSyntheseSortBy === 'partner';

    // Header mit Archetyp-Namen und Sortier-Buttons
    html += `
        <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 10px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid rgba(255,255,255,0.1);">
            <button onclick="sortNeedsSyntheseContent('ich')" style="display: flex; align-items: center; justify-content: center; gap: 6px; background: ${ichActive ? 'rgba(34, 197, 94, 0.15)' : 'transparent'}; border: 1px solid ${ichActive ? 'rgba(34, 197, 94, 0.4)' : 'transparent'}; border-radius: 6px; padding: 6px 8px; cursor: pointer; transition: all 0.2s;">
                <span style="font-weight: 600; color: var(--success); font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">${ichName}</span>
                <span style="color: ${ichActive ? 'var(--success)' : 'var(--text-muted)'}; font-size: 10px;">${ichSortIcon}</span>
            </button>
            <button onclick="sortNeedsSyntheseContent('diff')" style="display: flex; align-items: center; justify-content: center; gap: 4px; background: ${diffActive ? 'rgba(234, 179, 8, 0.15)' : 'transparent'}; border: 1px solid ${diffActive ? 'rgba(234, 179, 8, 0.4)' : 'transparent'}; border-radius: 6px; padding: 6px 8px; cursor: pointer; transition: all 0.2s; min-width: 60px;">
                <span style="font-weight: 600; color: var(--warning, #eab308); font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px;">Diff</span>
                <span style="color: ${diffActive ? 'var(--warning, #eab308)' : 'var(--text-muted)'}; font-size: 10px;">${diffSortIcon}</span>
            </button>
            <button onclick="sortNeedsSyntheseContent('partner')" style="display: flex; align-items: center; justify-content: center; gap: 6px; background: ${partnerActive ? 'rgba(239, 68, 68, 0.15)' : 'transparent'}; border: 1px solid ${partnerActive ? 'rgba(239, 68, 68, 0.4)' : 'transparent'}; border-radius: 6px; padding: 6px 8px; cursor: pointer; transition: all 0.2s;">
                <span style="font-weight: 600; color: var(--danger); font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">${partnerName}</span>
                <span style="color: ${partnerActive ? 'var(--danger)' : 'var(--text-muted)'}; font-size: 10px;">${partnerSortIcon}</span>
            </button>
        </div>
    `;

    // Gemeinsame Bedürfnisse Section
    if (gemeinsam.length > 0) {
        html += `
            <div style="margin-bottom: 20px;">
                <div style="font-size: 11px; color: #22c55e; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
                    <span style="font-size: 14px;">✓</span> ${TiageI18n.t('synthese.sharedCompatible', '✓ Gemeinsame & Kompatible Bedürfnisse').replace('✓ ', '')}
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px; max-height: 200px; overflow-y: auto;">
        `;

        gemeinsam.forEach(item => {
            // item.label ist bereits der Display-Name
            const label = item.label;

            // Use actual values from TiageState if available, otherwise fallback to archetyp values
            const actualWert1 = getActualNeedValue('ich', item.id);
            const actualWert2 = getActualNeedValue('partner', item.id);
            const wert1 = actualWert1 !== null ? actualWert1 : (item.wert1 || 0);
            const wert2 = actualWert2 !== null ? actualWert2 : (item.wert2 || 0);

            // Check if needs are locked
            const ichLocked = isNeedLocked('ich', item.id);
            const partnerLocked = isNeedLocked('partner', item.id);

            const diff = Math.abs(wert1 - wert2);

            let statusColor = '#22c55e';
            if (diff > 35) statusColor = '#ef4444';
            else if (diff > 15) statusColor = '#eab308';

            // Escape Namen für sichere JSON-Übergabe
            const safeIchName = (ichName || 'Du').replace(/'/g, "\\'");
            const safePartnerName = (partnerName || 'Partner').replace(/'/g, "\\'");

            html += `
                <div style="background: rgba(255,255,255,0.03); border-radius: 6px; padding: 10px 12px; border-left: 3px solid ${statusColor};">
                    <div onclick="openNeedWithResonance('${item.id}', 'resonance', {wert1: ${wert1}, wert2: ${wert2}, ichName: '${safeIchName}', partnerName: '${safePartnerName}'})" style="font-weight: 500; color: var(--text-primary); font-size: 13px; margin-bottom: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: color 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-primary)'">
                        ${label}
                        <span style="font-size: 10px; opacity: 0.5;">ⓘ</span>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 6px;">
                            ${ichLocked ? `<span style="font-size: 10px; color: #eab308;" title="${TiageI18n.t('ui.locked', 'Verschlossen')}">🔒</span>` : ''}
                            <div style="flex: 1; height: 5px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                <div style="width: ${wert1}%; height: 100%; background: var(--success); border-radius: 3px;"></div>
                            </div>
                            <span style="font-size: 11px; color: var(--text-muted); min-width: 32px; text-align: right;">${wert1}</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: center; min-width: 50px;">
                            <span style="font-size: 11px; font-weight: 600; color: ${statusColor}; background: ${statusColor}22; padding: 2px 6px; border-radius: 4px;">${diff}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            ${partnerLocked ? `<span style="font-size: 10px; color: #eab308;" title="${TiageI18n.t('ui.locked', 'Verschlossen')}">🔒</span>` : ''}
                            <div style="flex: 1; height: 5px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                <div style="width: ${wert2}%; height: 100%; background: var(--danger); border-radius: 3px;"></div>
                            </div>
                            <span style="font-size: 11px; color: var(--text-muted); min-width: 32px; text-align: right;">${wert2}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
                <div style="text-align: center; font-size: 11px; color: var(--text-muted); margin-top: 8px;">
                    ${TiageI18n.t('synthese.sharedCount', '{count} gemeinsame & kompatible Bedürfnisse').replace('{count}', gemeinsam.length)}
                </div>
            </div>
        `;
    }

    // Unterschiedliche Prioritäten Section
    if (konflikt.length > 0) {
        html += `
            <div style="margin-bottom: 10px;">
                <div style="font-size: 11px; color: #ef4444; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; display: flex; align-items: center; gap: 6px;">
                    <span style="font-size: 14px;">✗</span> ${TiageI18n.t('synthese.challengingDiffs', '✗ Herausfordernde Unterschiede').replace('✗ ', '')}
                </div>
                <div style="display: flex; flex-direction: column; gap: 6px; max-height: 200px; overflow-y: auto;">
        `;

        konflikt.forEach(item => {
            // item.label ist bereits der Display-Name
            const label = item.label;

            // Use actual values from TiageState if available, otherwise fallback to archetyp values
            const actualWert1 = getActualNeedValue('ich', item.id);
            const actualWert2 = getActualNeedValue('partner', item.id);
            const wert1 = actualWert1 !== null ? actualWert1 : (item.wert1 || 0);
            const wert2 = actualWert2 !== null ? actualWert2 : (item.wert2 || 0);

            // Check if needs are locked
            const ichLocked = isNeedLocked('ich', item.id);
            const partnerLocked = isNeedLocked('partner', item.id);

            const diff = Math.abs(wert1 - wert2);

            let statusColor = '#22c55e';
            if (diff > 35) statusColor = '#ef4444';
            else if (diff > 15) statusColor = '#eab308';

            // Escape Namen für sichere JSON-Übergabe
            const safeIchName = (ichName || 'Du').replace(/'/g, "\\'");
            const safePartnerName = (partnerName || 'Partner').replace(/'/g, "\\'");

            html += `
                <div style="background: rgba(255,255,255,0.03); border-radius: 6px; padding: 10px 12px; border-left: 3px solid ${statusColor};">
                    <div onclick="openNeedWithResonance('${item.id}', 'resonance', {wert1: ${wert1}, wert2: ${wert2}, ichName: '${safeIchName}', partnerName: '${safePartnerName}'})" style="font-weight: 500; color: var(--text-primary); font-size: 13px; margin-bottom: 6px; cursor: pointer; display: flex; align-items: center; gap: 6px; transition: color 0.2s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-primary)'">
                        ${label}
                        <span style="font-size: 10px; opacity: 0.5;">ⓘ</span>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr auto 1fr; gap: 8px; align-items: center;">
                        <div style="display: flex; align-items: center; gap: 6px;">
                            ${ichLocked ? `<span style="font-size: 10px; color: #eab308;" title="${TiageI18n.t('ui.locked', 'Verschlossen')}">🔒</span>` : ''}
                            <div style="flex: 1; height: 5px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                <div style="width: ${wert1}%; height: 100%; background: var(--success); border-radius: 3px;"></div>
                            </div>
                            <span style="font-size: 11px; color: var(--text-muted); min-width: 32px; text-align: right;">${wert1}</span>
                        </div>
                        <div style="display: flex; align-items: center; justify-content: center; min-width: 50px;">
                            <span style="font-size: 11px; font-weight: 600; color: ${statusColor}; background: ${statusColor}22; padding: 2px 6px; border-radius: 4px;">${diff}</span>
                        </div>
                        <div style="display: flex; align-items: center; gap: 6px;">
                            ${partnerLocked ? `<span style="font-size: 10px; color: #eab308;" title="${TiageI18n.t('ui.locked', 'Verschlossen')}">🔒</span>` : ''}
                            <div style="flex: 1; height: 5px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                                <div style="width: ${wert2}%; height: 100%; background: var(--danger); border-radius: 3px;"></div>
                            </div>
                            <span style="font-size: 11px; color: var(--text-muted); min-width: 32px; text-align: right;">${wert2}</span>
                        </div>
                    </div>
                </div>
            `;
        });

        html += `
                </div>
                <div style="text-align: center; font-size: 11px; color: var(--text-muted); margin-top: 8px;">
                    ${TiageI18n.t('synthese.diffCount', '{count} unterschiedliche Prioritäten').replace('{count}', konflikt.length)}
                </div>
            </div>
        `;
    }

    return html;
}

/**
 * RTI-Säulen Content (5 Säulen der Identität nach Petzold)
 * Zeigt Reibungs-Analyse pro Säule basierend auf Dimensions-Matching
 */
function getRTIContent() {
    // Archetyp-Namen holen
    const ichName = window.archetypeDescriptions[getIchArchetype()]?.name || 'ICH';
    const partnerName = window.archetypeDescriptions[getPartnerArchetype()]?.name || 'Partner';

    // Prüfe ob TiageTaxonomie und TiageBeduerfnisse verfügbar
    if (typeof TiageTaxonomie === 'undefined' || typeof TiageBeduerfnisse === 'undefined') {
        return '<p style="color: var(--text-muted);">' + TiageI18n.t('synthese.rtiNotAvailable', 'RTI-Berechnung nicht verfügbar (Module fehlen).') + '</p>';
    }

    // FlatNeeds holen
    const ichFlatNeeds = typeof TiageState !== 'undefined' ? (TiageState.getFlatNeeds('ich') || {}) : {};
    const partnerFlatNeeds = typeof TiageState !== 'undefined' ? (TiageState.getFlatNeeds('partner') || {}) : {};

    if (Object.keys(ichFlatNeeds).length === 0 || Object.keys(partnerFlatNeeds).length === 0) {
        return '<p style="color: var(--text-muted);">' + TiageI18n.t('toast.noNeedsData', 'Keine Bedürfnis-Daten verfügbar') + '</p>';
    }

    // Kategorie → Dimension Mapping aufbauen (aus TiageTaxonomie)
    const kategorieToDimension = {};
    Object.values(TiageTaxonomie.kategorien || {}).forEach(kat => {
        if (kat.key && kat.dimension) {
            kategorieToDimension[kat.key] = kat.dimension;
        }
    });

    // Dimension-Scores berechnen (Matching-Qualität pro Dimension A-F)
    const dimensionMatches = { A: [], B: [], C: [], D: [], E: [], F: [] };

    // Alle gemeinsamen Needs durchgehen
    const allNeedIds = new Set([...Object.keys(ichFlatNeeds), ...Object.keys(partnerFlatNeeds)]);

    allNeedIds.forEach(needId => {
        const wert1 = ichFlatNeeds[needId];
        const wert2 = partnerFlatNeeds[needId];
        if (wert1 === undefined || wert2 === undefined) return;

        // Kategorie für dieses Need finden
        const def = TiageBeduerfnisse.getDefinition ? TiageBeduerfnisse.getDefinition(needId) : null;
        if (!def || !def.kategorie) return;

        // Dimension für diese Kategorie
        const dimensionId = kategorieToDimension[def.kategorie];
        if (!dimensionId) return;

        // Kurzform (A-F) aus Dimension
        const dim = TiageTaxonomie.getDimension ? TiageTaxonomie.getDimension(dimensionId) : null;
        const kurzform = dim?.kurzform;
        if (!kurzform || !dimensionMatches[kurzform]) return;

        // Match-Qualität berechnen (100 = perfekt, 0 = maximal unterschiedlich)
        const diff = Math.abs(wert1 - wert2);
        const matchQuality = Math.max(0, 100 - diff);

        dimensionMatches[kurzform].push(matchQuality);
    });

    // Durchschnittliche Dimension-Scores berechnen
    const dimensionScores = {};
    ['A', 'B', 'C', 'D', 'E', 'F'].forEach(d => {
        const matches = dimensionMatches[d];
        dimensionScores[d] = matches.length > 0
            ? Math.round(matches.reduce((a, b) => a + b, 0) / matches.length)
            : 50; // Neutral wenn keine Daten
    });

    // RTI-Säulen berechnen
    const saeulenReibung = TiageTaxonomie.berechneSaeulenReibung(dimensionScores);

    // Gesamt-Reibung berechnen
    let gesamtReibung = 0;
    let saeulenCount = 0;
    Object.values(saeulenReibung).forEach(s => {
        gesamtReibung += s.reibung;
        saeulenCount++;
    });
    const avgReibung = saeulenCount > 0 ? Math.round(gesamtReibung / saeulenCount) : 0;
    const avgHarmonie = 100 - avgReibung;

    // Farbe für Gesamt-Score
    let scoreColor = '#22c55e';
    if (avgHarmonie < 50) scoreColor = '#ef4444';
    else if (avgHarmonie < 70) scoreColor = '#eab308';

    // HTML generieren
    let html = `
        <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 48px; font-weight: 700; color: ${scoreColor};">${avgHarmonie}%</div>
            <div style="font-size: 12px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px;">
                ${TiageI18n.t('synthese.identityHarmony', 'Identitäts-Harmonie')}
            </div>
            <div style="font-size: 11px; color: var(--text-muted); margin-top: 4px;">
                ${ichName} ↔ ${partnerName}
            </div>
        </div>

        <div style="
            background: rgba(255,255,255,0.03);
            border-radius: 8px;
            padding: 12px;
            margin-bottom: 16px;
            border-left: 3px solid var(--primary);
        ">
            <div style="font-size: 11px; color: var(--text-muted); margin-bottom: 8px;">
                <strong>RTI nach Petzold</strong> – ${TiageI18n.t('synthese.fivePillars', '5 Säulen der Identität')}
            </div>
            <div style="font-size: 10px; color: var(--text-muted); line-height: 1.5;">
                ${TiageI18n.t('synthese.rtiExplanation', 'Jede Säule repräsentiert einen fundamentalen Aspekt menschlicher Identität. Reibung entsteht, wenn Bedürfnisse in einer Säule unterschiedlich ausgeprägt sind.')}
            </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 12px;">
    `;

    // Säulen-Icons und Beschreibungen
    const saeulenMeta = {
        S1: { icon: '🫀', kurz: TiageI18n.t('synthese.pillarDesc.S1', 'Körper, Gesundheit, Sexualität') },
        S2: { icon: '👥', kurz: TiageI18n.t('synthese.pillarDesc.S2', 'Beziehungsform, Freunde, Familie') },
        S3: { icon: '🎯', kurz: TiageI18n.t('synthese.pillarDesc.S3', 'Selbstbestimmung, Arbeit, Leistung') },
        S4: { icon: '🏠', kurz: TiageI18n.t('synthese.pillarDesc.S4', 'Stabilität, Finanzen, Wohnen') },
        S5: { icon: '💫', kurz: TiageI18n.t('synthese.pillarDesc.S5', 'Spiritualität, Ethik, Sinn') }
    };

    // PerspektivenHinweise für S1 und S2 (aus beduerfnis-katalog.json)
    const perspektivenHinweise = {
        S1: { // #B227 - Körperliche Resonanz
            pirsig: {
                niedrig: "Körperliche Resonanz ist vorhanden - biologische Qualitätsmuster harmonieren.",
                mittel: "Teilweise Resonanz möglich - dynamische Qualität kann statische Muster erweitern.",
                hoch: "Orientierungen zeigen in verschiedene Richtungen. Das bedeutet nicht Unmöglichkeit, sondern: Hier ist Wachstum nötig, wenn körperliche Verbindung gewünscht ist."
            },
            osho: {
                niedrig: "Der Körper sagt Ja - folge dieser Weisheit ohne Kopf-Zensur.",
                mittel: "Anziehung ist nicht binär. Frage dich: Was ist Konditionierung, was echtes Fühlen?",
                hoch: "Die Gesellschaft hat dir gesagt, wen du begehren darfst. Aber der Körper ist freier als das Ego. Vielleicht ist hier eine Einladung, Grenzen zu hinterfragen."
            },
            gfk: {
                niedrig: "Das Bedürfnis nach körperlicher Resonanz kann erfüllt werden.",
                mittel: "Das Bedürfnis ist teilweise erfüllbar. Welche anderen Strategien könnten dieses Bedürfnis nähren?",
                hoch: "Körperliche Resonanz ist ein gültiges Bedürfnis. Die aktuelle Konstellation macht die gewohnte Strategie schwierig. Gibt es andere Wege?"
            }
        },
        S2: { // #B228 - Beziehungsform-Passung
            pirsig: {
                niedrig: "Eure Beziehungsformen sind kompatibel - statische Qualitätsmuster passen zusammen.",
                mittel: "Unterschiedliche Muster treffen aufeinander. Dynamische Qualität entsteht, wenn beide bereit sind, ihre Muster zu hinterfragen.",
                hoch: "Mono und Poly sind verschiedene Betriebssysteme. Keines ist besser. Die Frage ist: Wer ist bereit, sich zu bewegen?"
            },
            osho: {
                niedrig: "Eure Formen harmonieren - genießt diese Leichtigkeit.",
                mittel: "Besitz ist Angst, aber Struktur ist nicht immer Gefängnis. Frage dich ehrlich: Warum willst du, was du willst?",
                hoch: "Der Mono-Mensch klammert vielleicht aus Angst. Der Poly-Mensch flieht vielleicht vor Tiefe. Beide leben vielleicht authentisch. Könnt ihr gemeinsam wachsen?"
            },
            gfk: {
                niedrig: "Eure Bedürfnisse nach Beziehungsstruktur sind ähnlich.",
                mittel: "Unterschiedliche Strategien für ähnliche Bedürfnisse. Mono: Sicherheit. Poly: Autonomie. Welche Strategie nährt BEIDE?",
                hoch: "Fundamentale Bedürfnisse scheinen zu kollidieren: Sicherheit vs. Freiheit. Was wäre ein dritter Weg, der beide Kerne ehrt?"
            }
        },
        S3: { // Autonomie & Leistung (Dimension D)
            pirsig: {
                niedrig: "Eure Vorstellungen von Kreativität und Selbstverwirklichung harmonieren - ihr teilt ähnliche Qualitätsmuster.",
                mittel: "Unterschiedliche Ansätze zur Selbstentfaltung treffen aufeinander. Dynamische Qualität entsteht, wenn beide ihre Definitionen von 'Erfolg' hinterfragen.",
                hoch: "Autonomie-Konzepte prallen aufeinander. Wer definiert Qualität? Wenn einer Handwerk liebt und einer Revolution - beide Wege können Qualität sein."
            },
            osho: {
                niedrig: "Ihr habt ähnliche Vorstellungen von Freiheit und Leistung - genießt diese Resonanz.",
                mittel: "Achte darauf: Ist dein Leistungsdrang authentisch oder anerzogen? Die Gesellschaft hat uns alle mit Erfolgsbegriffen konditioniert.",
                hoch: "Der Workaholic flieht vielleicht vor sich selbst. Der Verweigerer flieht vielleicht vor der Welt. Wo liegt eure authentische Mitte?"
            },
            gfk: {
                niedrig: "Eure Bedürfnisse nach Autonomie und Beitrag sind ähnlich erfüllt.",
                mittel: "Verschiedene Strategien für das gleiche Bedürfnis nach Kompetenz und Sinn. Welche Strategie ehrt beide?",
                hoch: "Fundamentale Bedürfnisse kollidieren: Unabhängigkeit vs. Zusammengehörigkeit. Was wäre ein Weg, der beide Kerne nährt?"
            }
        },
        S4: { // Sicherheit & Stabilität (A×0.4 + F×0.6)
            pirsig: {
                niedrig: "Eure Vorstellungen von Sicherheit und Alltag harmonieren - statische Qualitätsmuster ergänzen sich.",
                mittel: "Unterschiedliche Stabilitätsbedürfnisse. Der eine braucht feste Routinen, der andere Spontaneität. Beide sind Qualitäts-Muster.",
                hoch: "Strukturierte Planung trifft auf Improvisations-Talent. Weder ist besser - aber wie findet ihr ein gemeinsames Qualitäts-Gleichgewicht?"
            },
            osho: {
                niedrig: "Eure materiellen Vorstellungen harmonieren - keine Reibung im Alltäglichen.",
                mittel: "Sicherheitsbedürfnis kann Angst sein - oder weise Vorsorge. Schau genau hin, was davon bei euch gerade spielt.",
                hoch: "Der Planer klammert vielleicht aus Kontroll-Angst. Der Spontane vermeidet vielleicht Verantwortung. Wo ist eure authentische Balance?"
            },
            gfk: {
                niedrig: "Eure Bedürfnisse nach Sicherheit und Ordnung sind ähnlich.",
                mittel: "Das Bedürfnis nach Stabilität trifft auf das Bedürfnis nach Spontaneität. Beide sind gültig - welche gemeinsame Strategie?",
                hoch: "Fundamentale Bedürfnisse: Vorhersehbarkeit vs. Abenteuer. Hier braucht es kreative Lösungen, die beide Kerne ehren."
            }
        },
        S5: { // Werte & Sinn (B×0.4 + E×0.6)
            pirsig: {
                niedrig: "Eure Weltanschauungen harmonieren - ihr teilt ähnliche Qualitäts-Definitionen auf der höchsten Ebene.",
                mittel: "Verschiedene Werte-Systeme begegnen sich. Dynamische Qualität entsteht, wenn beide bereit sind, ihre Wahrheiten zu erweitern.",
                hoch: "Unterschiedliche Sinn-Quellen. Der eine findet Qualität in Tradition, der andere in Revolution. Beide können recht haben - gleichzeitig."
            },
            osho: {
                niedrig: "Eure spirituellen und ethischen Vorstellungen resonieren - tiefe Verbindung möglich.",
                mittel: "Werte sind oft von Eltern und Gesellschaft übernommen, nicht selbst gewählt. Fragt euch: Was davon ist wirklich eures?",
                hoch: "Der Gläubige klammert vielleicht an Sicherheit. Der Skeptiker flieht vielleicht vor Tiefe. Wo liegt eure authentische Spiritualität?"
            },
            gfk: {
                niedrig: "Eure Bedürfnisse nach Sinn und Verstanden-werden sind ähnlich.",
                mittel: "Unterschiedliche Kommunikations-Stile für das gleiche Bedürfnis nach Verbindung. Welche Sprache versteht ihr beide?",
                hoch: "Fundamentale Bedürfnisse kollidieren: Integrität vs. Zugehörigkeit. Können beide Werte-Systeme nebeneinander existieren?"
            }
        }
    };

    // Perspektiven-Icons
    const perspektivenIcons = {
        pirsig: { icon: '🔧', label: 'Pirsig (MOQ)' },
        osho: { icon: '🧘', label: 'Osho' },
        gfk: { icon: '💚', label: 'GFK' }
    };

    // Säulen sortiert nach Reibung (höchste zuerst)
    const sortedSaeulen = Object.entries(saeulenReibung)
        .sort((a, b) => b[1].reibung - a[1].reibung);

    sortedSaeulen.forEach(([key, saeule]) => {
        const meta = saeulenMeta[key] || { icon: '📊', kurz: '' };
        const harmonie = 100 - saeule.reibung;

        // Farbe basierend auf Harmonie
        let barColor = '#22c55e';
        if (harmonie < 50) barColor = '#ef4444';
        else if (harmonie < 70) barColor = '#eab308';

        // Level-Badge
        let levelBadge = '';
        if (saeule.level === 'hoch') {
            levelBadge = `<span style="font-size: 9px; background: rgba(239,68,68,0.2); color: #ef4444; padding: 2px 6px; border-radius: 4px; margin-left: 8px;">${TiageI18n.t('synthese.highFriction', 'Hohe Reibung')}</span>`;
        } else if (saeule.level === 'mittel') {
            levelBadge = `<span style="font-size: 9px; background: rgba(234,179,8,0.2); color: #eab308; padding: 2px 6px; border-radius: 4px; margin-left: 8px;">${TiageI18n.t('synthese.mediumFriction', 'Mittlere Reibung')}</span>`;
        }

        // PerspektivenHinweise für diese Säule holen
        const hinweise = perspektivenHinweise[key];
        let hinweiseHtml = '';

        // Nur bei mittlerer oder hoher Reibung anzeigen
        if (hinweise && (saeule.level === 'mittel' || saeule.level === 'hoch')) {
            const level = saeule.level;
            hinweiseHtml = `
                <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div style="font-size: 10px; color: var(--text-muted); margin-bottom: 8px; font-weight: 600;">
                        ${TiageI18n.t('synthese.perspectiveHints', 'Perspektiven-Hinweise:')}
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 6px;">
                        ${Object.entries(hinweise).map(([perspKey, texts]) => {
                            const persp = perspektivenIcons[perspKey];
                            const text = texts[level] || '';
                            if (!text) return '';
                            return `
                                <div style="
                                    background: rgba(255,255,255,0.02);
                                    border-radius: 6px;
                                    padding: 8px 10px;
                                    font-size: 10px;
                                    line-height: 1.5;
                                ">
                                    <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; color: var(--text-secondary);">
                                        <span>${persp?.icon || '📖'}</span>
                                        <span style="font-weight: 600;">${persp?.label || perspKey}</span>
                                    </div>
                                    <div style="color: var(--text-muted);">${text}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        }

        html += `
            <div style="
                background: rgba(255,255,255,0.03);
                border-radius: 8px;
                padding: 12px;
                border-left: 4px solid ${saeule.color};
            ">
                <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                    <span style="font-size: 18px;">${meta.icon}</span>
                    <div style="flex: 1;">
                        <div style="font-weight: 600; color: var(--text-primary); font-size: 13px;">
                            ${saeule.label}
                            ${levelBadge}
                        </div>
                        <div style="font-size: 10px; color: var(--text-muted);">${meta.kurz}</div>
                    </div>
                    <div style="text-align: right;">
                        <div style="font-size: 16px; font-weight: 700; color: ${barColor};">${Math.round(harmonie)}%</div>
                        <div style="font-size: 9px; color: var(--text-muted);">Harmonie</div>
                    </div>
                </div>
                <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                    <div style="width: ${harmonie}%; height: 100%; background: ${barColor}; border-radius: 3px; transition: width 0.3s;"></div>
                </div>
                <div style="font-size: 9px; color: var(--text-muted); margin-top: 6px; opacity: 0.8;">
                    Formel: ${saeule.formel}
                </div>
                ${hinweiseHtml}
            </div>
        `;
    });

    html += `
        </div>

        <div style="
            margin-top: 16px;
            padding: 12px;
            background: rgba(255,255,255,0.02);
            border-radius: 8px;
            font-size: 10px;
            color: var(--text-muted);
            text-align: center;
        ">
            <div style="margin-bottom: 4px; opacity: 0.8;">Dimensions-Scores (A-F)</div>
            <div style="display: flex; justify-content: center; gap: 12px; flex-wrap: wrap;">
                ${['A', 'B', 'C', 'D', 'E', 'F'].map(d => {
                    const dim = TiageTaxonomie.getDimension ? TiageTaxonomie.getDimension(d) : null;
                    return `<span style="color: ${dim?.color || 'var(--text-muted)'};">${d}: ${dimensionScores[d]}%</span>`;
                }).join('')}
            </div>
        </div>
    `;

    return html;
}

// Navigate archetypes within Ti-Age Synthese Modal
function navigateTiageSyntheseArchetype(person, direction) {
    const archetypes = window.archetypeOrder;
    let currentIndex;

    if (person === 'ich') {
        currentIndex = archetypes.indexOf(getIchArchetype());
        currentIndex = (currentIndex + direction + archetypes.length) % archetypes.length;
        window.setIchArchetype(archetypes[currentIndex]);

        // Sync dropdowns
        const ichSelect = document.getElementById('ichSelect');
        const mobileIchSelect = document.getElementById('mobileIchSelect');
        if (ichSelect) ichSelect.value = getIchArchetype();
        if (mobileIchSelect) mobileIchSelect.value = getIchArchetype();

        // Sync archetype grid highlighting
        updateArchetypeGrid('ich', getIchArchetype());
    } else {
        currentIndex = archetypes.indexOf(getPartnerArchetype());
        currentIndex = (currentIndex + direction + archetypes.length) % archetypes.length;
        window.setPartnerArchetype(archetypes[currentIndex]);

        // Sync dropdowns
        const partnerSelect = document.getElementById('partnerSelect');
        const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
        if (partnerSelect) partnerSelect.value = getPartnerArchetype();
        if (mobilePartnerSelect) mobilePartnerSelect.value = getPartnerArchetype();

        // Sync archetype grid highlighting
        updateArchetypeGrid('partner', getPartnerArchetype());
    }

    // Update the modal display
    const ichArch = window.archetypeDescriptions[getIchArchetype()];
    const partnerArch = window.archetypeDescriptions[getPartnerArchetype()];

    const ichDisplay = document.getElementById('tiageSyntheseModalIch');
    const partnerDisplay = document.getElementById('tiageSyntheseModalPartner');
    if (ichDisplay) ichDisplay.textContent = ichArch?.name || getIchArchetype();
    if (partnerDisplay) partnerDisplay.textContent = partnerArch?.name || getPartnerArchetype();

    // Regenerate content with new archetypes
    currentTiageSyntheseContent.pathos = generateCombinedPathos(ichArch, partnerArch);
    currentTiageSyntheseContent.logos = generateCombinedLogos(ichArch, partnerArch);

    // ═══════════════════════════════════════════════════════════════════════════
    // RESONANZFAKTOREN neu berechnen und in State speichern (VOR Content-Anzeige!)
    // Die Tabelle in getScoreContent() liest dann die gespeicherten Werte
    // ═══════════════════════════════════════════════════════════════════════════
    if (typeof ResonanzCard !== 'undefined' && typeof ResonanzCard.loadCalculatedValues === 'function') {
        const personKey = person === 'ich' ? 'ich' : 'partner';
        const newArchetype = person === 'ich' ? getIchArchetype() : getPartnerArchetype();

        // Sammle Profil-Kontext für Resonanz-Berechnung
        let needs = null;

        // 1. Aus LoadedArchetypProfile.profileReview.flatNeeds (User-Eingaben!)
        const flatNeeds = window.LoadedArchetypProfile?.[personKey]?.profileReview?.flatNeeds;
        if (flatNeeds) {
            needs = {};
            if (Array.isArray(flatNeeds)) {
                flatNeeds.forEach(n => {
                    if (n.id) needs[n.id] = n.value;
                    if (n.stringKey) needs[n.stringKey] = n.value;
                });
            } else {
                for (const key in flatNeeds) {
                    if (flatNeeds.hasOwnProperty(key)) {
                        const entry = flatNeeds[key];
                        needs[key] = (typeof entry === 'object' && entry.value !== undefined) ? entry.value : entry;
                    }
                }
            }
        }

        // 2. Fallback: Aus AttributeSummaryCard
        if ((!needs || Object.keys(needs).length === 0) &&
            typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.getFlatNeeds) {
            const cardNeeds = AttributeSummaryCard.getFlatNeeds();
            if (cardNeeds) {
                needs = {};
                if (Array.isArray(cardNeeds)) {
                    cardNeeds.forEach(n => {
                        if (n.id) needs[n.id] = n.value;
                        if (n.stringKey) needs[n.stringKey] = n.value;
                    });
                }
            }
        }

        // 3. Fallback: Standard-Werte des Archetyps
        if (!needs || Object.keys(needs).length === 0) {
            if (typeof GfkBeduerfnisse !== 'undefined' &&
                GfkBeduerfnisse.archetypProfile && GfkBeduerfnisse.archetypProfile[newArchetype]) {
                needs = GfkBeduerfnisse.archetypProfile[newArchetype].umfrageWerte || {};
            }
        }

        const resonanzProfileContext = {
            archetyp: newArchetype,
            needs: needs,
            dominanz: window.personDimensions[personKey]?.dominanz || null,
            orientierung: window.personDimensions[personKey]?.orientierung || null,
            geschlecht: window.personDimensions[personKey]?.geschlecht || null
        };

        // Berechne und aktualisiere Resonanzfaktoren
        if (resonanzProfileContext.needs && Object.keys(resonanzProfileContext.needs).length > 0) {
            const resonanzLoaded = ResonanzCard.loadCalculatedValues(resonanzProfileContext, personKey);
            if (resonanzLoaded) {
                // NOTE: LoadedArchetypProfile ist ein View auf TiageState.
                // Nicht separat setzen - save() in setCalculatedValues hat TiageState bereits aktualisiert.
                // Das würde sonst die Lock-Struktur {value, locked} mit nur Werten überschreiben.
                // console.log('[TIAGE] Resonanzfaktoren nach Archetyp-Wechsel aktualisiert für', personKey + ':', newArchetype);
            }
        }
    }

    // Refresh the displayed content (NACH Resonanzfaktoren-Update!)
    showTiageSyntheseContent(currentTiageSyntheseType);

    // Save to localStorage and update main view
    saveSelectionToStorage();
    if (typeof updateComparisonView === 'function') updateComparisonView();
    if (typeof updateMobileCardsContent === 'function') updateMobileCardsContent();

    // Update Score Cycle with new score
    updateSyntheseScoreCycle();
}

// Legacy alias
function navigatePathosLogosArchetype(person, direction) {
    navigateTiageSyntheseArchetype(person, direction);
}

function getTiageTheoryContent() {
    return `
        <div style="space-y: 20px;">
            <div style="margin-bottom: 20px;">
                <h4 style="color: var(--primary); margin-bottom: 10px; font-size: 14px;">Die Synthese</h4>
                <p style="margin-bottom: 10px;">Das Tiage-Beziehungsmodell verbindet zwei philosophische Traditionen zu einem praktischen Analyse-Tool:</p>
                <ul style="padding-left: 20px; margin-bottom: 15px;">
                    <li style="margin-bottom: 6px;"><strong>Robert M. Pirsig (MOQ):</strong> Metaphysik der Qualität – statische vs. dynamische Qualität als Grundstruktur</li>
                    <li style="margin-bottom: 6px;"><strong>OSHO:</strong> Bewusstsein durch Meditation – Polarität, Balance, Schwingung</li>
                </ul>
            </div>

            <div style="margin-bottom: 20px; padding: 15px; background: rgba(255,255,255,0.03); border-radius: 8px; border-left: 3px solid var(--primary);">
                <h4 style="color: var(--text-primary); margin-bottom: 10px; font-size: 14px;">Logos vs. Pathos (25:75)</h4>
                <p style="margin-bottom: 8px;"><strong style="color: var(--text-muted);">Logos (25%):</strong> Die rationale, strukturgebende Dimension. Pirsig nennt dies "statische Qualität" – bewährte Muster, die Stabilität schaffen.</p>
                <p><strong style="color: var(--text-muted);">Pathos (75%):</strong> Die emotionale, anziehende Dimension. "Pathos vor Logos" – Das Leben/Erleben kommt vor der Interpretation.</p>
            </div>

            <div style="margin-bottom: 20px;">
                <h4 style="color: var(--primary); margin-bottom: 10px; font-size: 14px;">Tiage's Widerspruch zu Pirsig</h4>
                <p style="margin-bottom: 10px;">Pirsig argumentierte, dass Definitionen die unmittelbare Qualität des Erlebens zerstören.</p>
                <p style="margin-bottom: 10px;"><strong>Diese App basiert auf der gegenteiligen Erfahrung:</strong></p>
                <p style="font-style: italic; padding: 10px; background: rgba(255,255,255,0.03); border-radius: 6px;">"Definition und Erleben sind nicht getrennt. Sie entstehen gleichzeitig – im Dialog, in Resonanz, in extremer Kürze."</p>
            </div>

            <div style="margin-bottom: 20px;">
                <h4 style="color: var(--primary); margin-bottom: 10px; font-size: 14px;">OSHO & Dialog als Meditation</h4>
                <p style="margin-bottom: 10px;">OSHOs Philosophie verbindet sich mit Tiages Widerspruch:</p>
                <ul style="padding-left: 20px;">
                    <li style="margin-bottom: 6px;"><strong>OSHO:</strong> "Worte können lebendig sein, wenn Bewusstheit dahinter steht."</li>
                    <li style="margin-bottom: 6px;"><strong>Tiage:</strong> Im bewussten Dialog <em>ist</em> die Definition das Erleben.</li>
                </ul>
                <p style="margin-top: 10px; font-style: italic; color: var(--text-muted);">Die Qualität entsteht nicht trotz der Sprache, sondern durch sie – wenn zwei Menschen auf derselben Wellenlänge schwingen.</p>
            </div>

            <div style="text-align: center; padding-top: 10px; border-top: 1px solid var(--border);">
                <p style="font-size: 12px; color: var(--text-muted);">Tiage's Beitrag: Die Verbindung beider Philosophien zu einem konkreten Beziehungs-Rechner mit eigener Gewichtung (25:75 Logos:Pathos) und 6 Archetypen.</p>
            </div>
        </div>
    `;
}


// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════
window.openTiageSyntheseModal = openTiageSyntheseModal;
window.closeTiageSyntheseModal = closeTiageSyntheseModal;
window.showTiageSyntheseContent = showTiageSyntheseContent;
window.showPathosLogosContent = showPathosLogosContent;
window.openPathosLogosModal = openPathosLogosModal;
window.closePathosLogosModal = closePathosLogosModal;
window.openProContraModal = openProContraModal;
window.closeProContraModal = closeProContraModal;
window.navigateProContraArchetype = navigateProContraArchetype;
window.navigateTiageSyntheseArchetype = navigateTiageSyntheseArchetype;
window.navigatePathosLogosArchetype = navigatePathosLogosArchetype;
window.getTiageTheoryContent = getTiageTheoryContent;
window.getScoreContent = getScoreContent;
window.getScoreNeedsContent = getScoreNeedsContent;
window.getNeedsContent = getNeedsContent;
window.getRTIContent = getRTIContent;
window.getPathosContent = getPathosContent;
window.getLogosContent = getLogosContent;
window.getOshoZenContent = getOshoZenContent;
window.getGfkBeduerfnisAnalyse = getGfkBeduerfnisAnalyse;
window.generateJungGfkStatement = generateJungGfkStatement;
window.getSyntheseQuoteText = getSyntheseQuoteText;
window.toggleCreativityTTS = toggleCreativityTTS;
window.resetTTSButtons = resetTTSButtons;
window.stopTTSOnModalClose = stopTTSOnModalClose;
window.updateResonanzfaktorenModalContent = updateResonanzfaktorenModalContent;
window.handleResonanzModalEsc = handleResonanzModalEsc;
window.getActualNeedValue = getActualNeedValue;
window.isNeedLocked = isNeedLocked;

})(); // end SyntheseModal IIFE
