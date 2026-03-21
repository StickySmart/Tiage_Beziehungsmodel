/**
 * mobileUI.js — Mobile Multi-Page UI Functions
 * Extracted from app-main.js v1.8.1028
 *
 * Dependencies (via window.*):
 *   window.getIchArchetype()             – current ICH archetype
 *   window.getPartnerArchetype()         – current PARTNER archetype
 *   window.mobilePersonDimensions        – mobile dimensions proxy
 *   window.personDimensions              – desktop dimensions proxy
 *   window.tiageData                     – tiage data
 *   window.mobileGoToPage()             – mobile navigation
 *   window.initMobileSwipe()            – swipe init (app-main.js)
 *   window.initMobileDimensionListeners() – dimension listeners (app-main.js)
 *   window.calculateRelationshipQuality()  – calculationEngine.js
 *   window.calculateOverallWithModifiers() – calculationEngine.js
 *   window.checkPhysicalCompatibility()   – scoringEngine.js
 *   window.calculatePhilosophyCompatibility() – scoringEngine.js
 *   window.generateDynamicProContra()    – categoryDetailsModal.js
 *   window.generateCombinedPathos/Logos() – pathosLogosGenerator.js
 *   window.drawRadarChart(), getScoreColor(), getBarClass() – chartUtils.js
 *   window.updateSyntheseScoreCycle()   – app-main.js
 *   window.closeCommentModal()          – commentModal.js
 *   TiageState, TiageI18n               – global modules
 */
(function() {
    'use strict';

function updateMobileResultPage() {
    if (!window.tiageData) return;

    const ichArch = window.tiageData.archetypes[window.getIchArchetype()];
    const partnerArch = window.tiageData.archetypes[window.getPartnerArchetype()];

    // Update type names
    document.getElementById('mobileResultIch').textContent = ichArch?.name || window.getIchArchetype();
    document.getElementById('mobileResultPartner').textContent = partnerArch?.name || window.getPartnerArchetype();

    // Calculate scores - use window.mobilePersonDimensions for consistency with tooltips
    const dims = window.mobilePersonDimensions;
    const person1 = { archetyp: window.getIchArchetype(), ...dims.ich };
    const person2 = { archetyp: window.getPartnerArchetype(), ...dims.partner };

    // Check if both genders are selected before calculating
    // Support both string format ('cis_mann') and object format ({ primary: 'cis_mann' })
    const g1Raw = dims.ich.geschlecht;
    const g2Raw = dims.partner.geschlecht;
    const g1 = (typeof g1Raw === 'string') ? g1Raw : (g1Raw && g1Raw.primary);
    const g2 = (typeof g2Raw === 'string') ? g2Raw : (g2Raw && g2Raw.primary);

    // Check if any orientierung is selected for both (Primary/Secondary structure)
    const hasOri1 = dims.ich.orientierung && dims.ich.orientierung.primary;
    const hasOri2 = dims.partner.orientierung && dims.partner.orientierung.primary;

    // Check if any dominanz is selected for both (Primary/Secondary structure)
    const hasDom1 = dims.ich.dominanz && dims.ich.dominanz.primary;
    const hasDom2 = dims.partner.dominanz && dims.partner.dominanz.primary;

    const isIncomplete = !g1 || !g2 || !hasOri1 || !hasOri2 || !hasDom1 || !hasDom2;

    const qualityResult = isIncomplete ?
        { score: 0, blocked: false, incomplete: true, breakdown: { archetyp: 0, dominanz: 0, orientierung: 0, geschlecht: 0 } } :
        window.calculateRelationshipQuality(person1, person2);

    // Update score circle
    const scoreCircle = document.getElementById('mobileScoreCircle');

    // Set score circle color and content
    // Kein harter K.O. mehr - sanfte Abstufung durch Resonanz
    if (qualityResult.incomplete) {
        scoreCircle.textContent = '–';
    } else {
        scoreCircle.textContent = qualityResult.score.toFixed(1);
    }
    scoreCircle.style.background = 'transparent';

    // Sync score to resultPercentage for Tiage's Synthese modal
    const resultPercentageEl = document.getElementById('resultPercentage');
    if (resultPercentageEl) {
        resultPercentageEl.textContent = qualityResult.incomplete ? '–' : qualityResult.score.toFixed(1);
    }

    // Update Mobile Score Note (direkt beim Kreis)
    const mobileScoreNote = document.getElementById('mobileScoreNote');
    if (mobileScoreNote) {
        let noteText = '';
        let quoteText = '';
        let quoteSource = '';
        const score = qualityResult.score;

        // ═══════════════════════════════════════════════════════════════
        // K.O.-WARNUNG: Prüfe auf harte Ausschlusskriterien
        // ═══════════════════════════════════════════════════════════════
        let koWarning = null;

        // 1. Orientierungs-K.O. (keine körperliche Anziehung möglich)
        if (qualityResult.blocked && qualityResult.reason) {
            koWarning = {
                type: 'orientation',
                message: qualityResult.reason
            };
        }

        // 2. Lifestyle-K.O. prüfen (Kinderwunsch, Wohnform etc.)
        if (!koWarning && typeof TiageSynthesis !== 'undefined' && TiageSynthesis.LifestyleFilter) {
            const attrs1 = window.personDimensions.ich?.baseAttributes || {};
            const attrs2 = window.personDimensions.partner?.baseAttributes || {};
            const lifestyleCheck = TiageSynthesis.LifestyleFilter.check(attrs1, attrs2);

            if (lifestyleCheck.isKO && lifestyleCheck.koReasons.length > 0) {
                koWarning = {
                    type: 'lifestyle',
                    message: lifestyleCheck.koReasons.map(r => r.message).join(' | '),
                    details: lifestyleCheck.koReasons
                };
            }
        }

        if (qualityResult.incomplete) {
            noteText = TiageI18n.t('ui.selectAllDimensions', 'Bitte alle Dimensionen auswählen.');
            mobileScoreNote.textContent = noteText;
            mobileScoreNote.style.display = 'block';
        } else if (koWarning) {
            // K.O.-Warnung anzeigen
            mobileScoreNote.innerHTML = '<div class="ko-warning-message" style="color: #e74c3c; background: rgba(231, 76, 60, 0.15); border: 1px solid #e74c3c; border-radius: 8px; padding: 10px 12px; margin-top: 8px; text-align: center;"><strong style="display: block; margin-bottom: 4px;">⚠️ K.O.-Kriterium</strong><span style="font-size: 0.9em; opacity: 0.95;">' + koWarning.message + '</span></div>';
            mobileScoreNote.style.display = 'block';
        } else if (qualityResult.noRealNeeds) {
            // Warnung: Keine echten Needs verfügbar - R1-R3 sind neutral (1.0)
            mobileScoreNote.innerHTML = '<div class="needs-warning-message" style="color: #f39c12; background: rgba(243, 156, 18, 0.15); border: 1px solid #f39c12; border-radius: 8px; padding: 10px 12px; margin-top: 8px; text-align: center;"><strong style="display: block; margin-bottom: 4px;">⚠️ ' + TiageI18n.t('warnings.noNeedsData', 'Keine Bedürfnis-Daten') + '</strong><span style="font-size: 0.9em; opacity: 0.95;">' + TiageI18n.t('warnings.noNeedsDataDesc', 'R1-R3 Resonanz-Faktoren können nicht berechnet werden. Bitte Bedürfnis-Werte im Profil anpassen.') + '</span></div>';
            mobileScoreNote.style.display = 'block';
        } else {
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
                    quoteSource = result.quoteSource ? ` — ${result.quoteSource}` : '';
                }
            }

            // Fallback zu hardcoded Texten wenn ResonanceQuotesTable nicht verfügbar
            if (!quoteText) {
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
            }

            mobileScoreNote.innerHTML = '<strong>' + noteText + '</strong><br><span style="font-style: italic; opacity: 0.85; font-size: 0.9em;">"' + quoteText + '"' + quoteSource + '</span>';
            mobileScoreNote.style.display = 'block';
        }
    }
}

function updateMobileProContraPage() {
    if (!window.tiageData) return;

    const ichArch = window.tiageData.archetypes[window.getIchArchetype()];
    const partnerArch = window.tiageData.archetypes[window.getPartnerArchetype()];

    // Update title
    const title = document.getElementById('mobileProContraTitle');
    if (title) {
        title.textContent = `${ichArch?.name || 'ICH'} × ${partnerArch?.name || 'PARTNER'}`;
    }

    // Get interaction window.tiageData
    const interactionKey = `${window.getIchArchetype()}_${window.getPartnerArchetype()}`;
    const interaction = window.tiageData.interactions?.[interactionKey];

    const proList = document.getElementById('mobileProList');
    const contraList = document.getElementById('mobileContraList');

    if (interaction) {
        // Pro list
        if (proList && interaction.pros?.length) {
            proList.innerHTML = interaction.pros.map(p => `<li>${p}</li>`).join('');
        } else if (proList) {
            proList.innerHTML = `<li>${TiageI18n.t('ui.noSpecificAdvantages', 'Keine spezifischen Vorteile bekannt')}</li>`;
        }

        // Contra list
        if (contraList && interaction.contras?.length) {
            contraList.innerHTML = interaction.contras.map(c => `<li>${c}</li>`).join('');
        } else if (contraList) {
            contraList.innerHTML = `<li>${TiageI18n.t('ui.noSpecificChallenges', 'Keine spezifischen Herausforderungen bekannt')}</li>`;
        }
    } else {
        if (proList) proList.innerHTML = `<li>${TiageI18n.t('ui.noDataAvailable', 'Keine Daten verfügbar.')}</li>`;
        if (contraList) contraList.innerHTML = `<li>${TiageI18n.t('ui.noDataAvailable', 'Keine Daten verfügbar.')}</li>`;
    }
}

function updateMobileCategoriesPage() {
    if (!window.tiageData) return;

    const container = document.getElementById('mobileCategoriesAccordion');
    if (!container) return;

    // SSOT v3.10: Needs aus TiageState laden für R-Faktor-Berechnung
    // FIX v4.3: getFlatNeeds() statt get() — gibt flache Needs für aktuellen Archetyp zurück
    const ichNeeds = typeof TiageState !== 'undefined' && TiageState.getFlatNeeds ? TiageState.getFlatNeeds('ich') : null;
    const partnerNeeds = typeof TiageState !== 'undefined' && TiageState.getFlatNeeds ? TiageState.getFlatNeeds('partner') : null;

    const person1 = { archetyp: window.getIchArchetype(), ...window.personDimensions.ich, needs: ichNeeds };
    const person2 = { archetyp: window.getPartnerArchetype(), ...window.personDimensions.partner, needs: partnerNeeds };

    const pathosCheck = window.checkPhysicalCompatibility(person1, person2);
    const logosCheck = window.calculatePhilosophyCompatibility(person1.archetyp, person2.archetyp);
    // SSOT v3.10: R-Faktoren aus person.needs
    const result = window.calculateOverallWithModifiers(person1, person2, pathosCheck, logosCheck);

    const categoryNamesMap = {
        A: 'Beziehungsphilosophie',
        B: 'Werte-Alignment',
        C: 'Nähe-Distanz',
        D: 'Autonomie',
        E: 'Kommunikation',
        F: 'Soziale Kompatibilität'
    };

    const categoryDescMap = {
        A: 'Übereinstimmung in den grundlegenden Beziehungsvorstellungen und -erwartungen.',
        B: 'Wie gut eure moralischen und ethischen Werte übereinstimmen.',
        C: 'Balance zwischen Bedürfnis nach Nähe und Freiraum.',
        D: 'Respekt für individuelle Unabhängigkeit und Selbstbestimmung.',
        E: 'Fähigkeit zur offenen und ehrlichen Kommunikation.',
        F: 'Kompatibilität im sozialen Umfeld und gesellschaftlicher Akzeptanz.'
    };

    // FEATURE 2: Category explanations
    function getCategoryExplanation(cat, score, ich, partner) {
        const ichName = window.tiageData?.archetypes?.[ich]?.name || ich;
        const partnerName = window.tiageData?.archetypes?.[partner]?.name || partner;

        const explanations = {
            A: () => {
                if (ich === partner) {
                    return `${ichName} und ${partnerName} teilen dieselbe Beziehungsphilosophie (100% Übereinstimmung). Beide haben identische Grundüberzeugungen über Beziehungsstrukturen, was eine solide Basis bietet.`;
                }
                if (score >= 80) {
                    return `${ichName} und ${partnerName} haben sehr ähnliche Beziehungsphilosophien (${score}%). Die Grundüberzeugungen passen gut zusammen und schaffen eine harmonische Basis.`;
                } else if (score >= 60) {
                    return `${ichName} (sucht ${ichName === 'Single' ? 'Freiheit' : ichName === 'Duo' ? 'Exklusivität' : 'Flexibilität'}) und ${partnerName} (sucht ${partnerName === 'Single' ? 'Freiheit' : partnerName === 'Duo' ? 'Exklusivität' : 'Flexibilität'}) haben unterschiedliche, aber vereinbare Beziehungsphilosophien (${score}%). Mit Kommunikation und Verständnis ist eine Brücke möglich.`;
                } else {
                    return `${ichName} und ${partnerName} haben fundamentale philosophische Unterschiede (${score}%). Die Beziehungsvorstellungen weichen stark voneinander ab. Intensive Kommunikation und große Kompromisse sind nötig.`;
                }
            },
            B: () => `Diese Kategorie misst, wie gut eure moralischen Werte übereinstimmen. Ein Score von ${score}% zeigt ${score >= 70 ? 'starke' : score >= 50 ? 'moderate' : 'schwache'} Übereinstimmung in ethischen Grundfragen.`,
            C: () => `Nähe-Distanz bewertet das Gleichgewicht zwischen Zusammensein und Freiraum. Bei ${score}% gibt es ${score >= 70 ? 'eine harmonische Balance' : score >= 50 ? 'moderate Abstimmung nötig' : 'deutliche Unterschiede in den Bedürfnissen'}.`,
            D: () => `Autonomie misst den Respekt für individuelle Freiheit. ${score}% bedeutet ${score >= 70 ? 'hohe gegenseitige Wertschätzung' : score >= 50 ? 'moderate Übereinstimmung' : 'Spannungen durch unterschiedliche Autonomie-Bedürfnisse'}.`,
            E: () => `Kommunikation bewertet Offenheit und Ehrlichkeit. Ein Score von ${score}% zeigt ${score >= 70 ? 'exzellente Kommunikationsbasis' : score >= 50 ? 'solide, aber ausbaufähige Kommunikation' : 'Herausforderungen in der Verständigung'}.`,
            F: () => `Soziale Kompatibilität bewertet gesellschaftliche Akzeptanz und Umfeld-Passung. ${score}% bedeutet ${score >= 70 ? 'sehr gute soziale Harmonie' : score >= 50 ? 'akzeptable soziale Integration' : 'potenzielle soziale Herausforderungen'}.`
        };

        return explanations[cat] ? explanations[cat]() : '';
    }

    let html = '';
    for (const [cat, catData] of Object.entries(result.categories)) {
        const score = catData.score || 0;
        const barClass = score >= 80 ? 'bar-excellent' : score >= 65 ? 'bar-good' : score >= 50 ? 'bar-medium' : 'bar-low';
        const explanation = getCategoryExplanation(cat, score, person1.archetyp, person2.archetyp);

        html += `
            <div class="category-accordion-item">
                <div class="category-accordion-header" onclick="toggleMobileCategory(this)">
                    <span class="category-accordion-letter">${cat}</span>
                    <span class="category-accordion-name">${categoryNamesMap[cat] || cat}</span>
                    <span class="category-accordion-score">${score}%</span>
                    <span class="category-accordion-icon">▼</span>
                </div>
                <div class="category-accordion-content">
                    <div class="category-accordion-inner">
                        <p class="category-accordion-desc">${categoryDescMap[cat] || ''}</p>
                        <div style="margin-top: 10px; height: 8px; background: rgba(255,255,255,0.1); border-radius: 4px; overflow: hidden;">
                            <div class="${barClass}" style="height: 100%; width: ${score}%; border-radius: 4px;"></div>
                        </div>
                        <div style="margin-top: 15px; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid var(--primary);">
                            <h4 style="font-size: var(--font-sm); color: var(--text-primary); margin-bottom: 8px;">Warum ${score}%?</h4>
                            <p style="font-size: var(--font-xs); color: var(--text-secondary); line-height: 1.5; margin: 0;">${explanation}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = html;
}

function toggleMobileCategory(header) {
    const item = header.closest('.category-accordion-item');
    if (item) {
        item.classList.toggle('open');
    }
}

function checkAndShowMobileLayout() {
    const isMobile = window.innerWidth <= 768;
    const desktopView = document.getElementById('comparisonView');
    const mobileView = document.getElementById('mobileMultipage');

    if (isMobile) {
        if (desktopView) desktopView.style.display = 'none';
        if (mobileView) mobileView.style.display = 'block';
    } else {
        if (desktopView) desktopView.style.display = 'block';
        if (mobileView) mobileView.style.display = 'none';
    }
}

// ========================================
// MOBILE GEWICHTUNG FUNCTIONS
// ========================================

function updateMobileGewichtung(factor, value) {
    const numValue = Math.max(0, Math.min(100, parseInt(value, 10) || 0));

    // Update input and slider
    const input = document.getElementById(`mobile-gewicht-${factor}`);
    const slider = document.getElementById(`mobile-gewicht-slider-${factor}`);
    if (input) input.value = numValue;
    if (slider) slider.value = numValue;

    // Sync mit GewichtungCard (nutzt deren normalize-Logik)
    if (typeof GewichtungCard !== 'undefined') {
        GewichtungCard.normalize(factor, numValue);
        // Sync zurück von GewichtungCard zu Mobile UI
        syncMobileGewichtungFromState();
    }

    // Update Summe
    updateMobileGewichtungSumme();

    // Sync mit Desktop AGOD Sticks
    syncDesktopAgodFromMobile();

    // Trigger recalculation
    if (typeof updateDisplay === 'function') updateDisplay();
}

function syncMobileGewichtungFromState() {
    if (typeof GewichtungCard === 'undefined') return;

    const gew = GewichtungCard.getValues();

    // Update Mobile inputs/sliders
    ['orientierung', 'archetyp', 'dominanz', 'geschlecht'].forEach(factor => {
        const key = factor === 'orientierung' ? 'O' :
                   factor === 'archetyp' ? 'A' :
                   factor === 'dominanz' ? 'D' : 'G';
        const val = gew[key];
        const input = document.getElementById(`mobile-gewicht-${factor}`);
        const slider = document.getElementById(`mobile-gewicht-slider-${factor}`);
        if (input) input.value = val;
        if (slider) slider.value = val;
    });

    updateMobileGewichtungSumme();
}

function updateMobileGewichtungSumme() {
    const o = parseInt(document.getElementById('mobile-gewicht-orientierung')?.value) || 0;
    const a = parseInt(document.getElementById('mobile-gewicht-archetyp')?.value) || 0;
    const d = parseInt(document.getElementById('mobile-gewicht-dominanz')?.value) || 0;
    const g = parseInt(document.getElementById('mobile-gewicht-geschlecht')?.value) || 0;
    const summe = o + a + d + g;

    const summeEl = document.getElementById('mobile-gewicht-summe');
    const summeLabelEl = document.getElementById('mobile-gewicht-summe-label');

    if (summeEl) {
        summeEl.textContent = summe + '%';
        summeEl.style.color = summe === 100 ? '#10B981' : '#EF4444';
    }
    if (summeLabelEl) {
        summeLabelEl.textContent = summe + '%';
        summeLabelEl.style.color = summe === 100 ? '' : '#EF4444';
    }
}

function syncDesktopAgodFromMobile() {
    // Sync to Desktop AGOD Weight Sticks
    const gew = typeof GewichtungCard !== 'undefined' ? GewichtungCard.getValues() : null;
    if (!gew) return;

    const agodA = document.getElementById('agodWeightA');
    const agodG = document.getElementById('agodWeightG');
    const agodO = document.getElementById('agodWeightO');
    const agodD = document.getElementById('agodWeightD');

    if (agodA) agodA.value = gew.A;
    if (agodG) agodG.value = gew.G;
    if (agodO) agodO.value = gew.O;
    if (agodD) agodD.value = gew.D;

    // Update AGOD stick visuals if function exists
    if (typeof updateAgodStickVisuals === 'function') {
        updateAgodStickVisuals();
    }
}

function resetMobileGewichtung() {
    if (typeof GewichtungCard !== 'undefined') {
        GewichtungCard.reset();
    }

    // Reset Mobile UI
    ['orientierung', 'archetyp', 'dominanz', 'geschlecht'].forEach(factor => {
        const input = document.getElementById(`mobile-gewicht-${factor}`);
        const slider = document.getElementById(`mobile-gewicht-slider-${factor}`);
        if (input) input.value = 25;
        if (slider) slider.value = 25;
    });

    updateMobileGewichtungSumme();
    syncDesktopAgodFromMobile();

    if (typeof updateDisplay === 'function') updateDisplay();
}

function initMobileGewichtung() {
    // Load initial values from GewichtungCard
    syncMobileGewichtungFromState();
}

// Make functions globally available
window.updateMobileGewichtung = updateMobileGewichtung;
window.resetMobileGewichtung = resetMobileGewichtung;

// ========================================
// MOBILE GESCHLECHT SECONDARY GRIDS
// ========================================

function initMobileGeschlechtGrids() {
    // Mobile geschlecht P-grids are initialized by initDimensionButtons (via pGridSelectors)
    // S-grids are dynamically populated by updateGeschlechtSGrid when P is selected
    // Just trigger S-grid update for any existing P selections
    ['ich', 'partner'].forEach(person => {
        if (window.personDimensions[person].geschlecht?.primary) {
            updateGeschlechtSGrid(person);
        }
    });
}

function initMobileLayout() {
    window.initMobileSwipe();
    window.initMobileDimensionListeners();
    checkAndShowMobileLayout();
    initMobileGewichtung();
    initMobileGeschlechtGrids();

    // Listen for window resize
    window.addEventListener('resize', checkAndShowMobileLayout);

    // Initialize browser history for back button support
    initBrowserHistoryNavigation();
}

function initBrowserHistoryNavigation() {
    // Set initial state without adding to history
    history.replaceState({ mobilePage: 1 }, '', '#seite1');

    // Handle browser back/forward button
    window.addEventListener('popstate', function(event) {
        // First, close any open modals when going back
        const factorModal = document.getElementById('factorModal');
        const helpModal = document.getElementById('helpModal');
        const commentModal = document.getElementById('commentModal');
        const tiageSyntheseModal = document.getElementById('tiageSyntheseModal');

        // Check if we're returning FROM a modal state (current modal should close)
        if (factorModal && factorModal.classList.contains('active')) {
            if (typeof window.closeFactorModal === 'function') window.closeFactorModal(null, true);
        }
        if (helpModal && helpModal.classList.contains('active')) {
            closeHelpModal(null, true);
        }
        if (commentModal && commentModal.classList.contains('active')) {
            window.closeCommentModal(null, true);
        }
        if (tiageSyntheseModal && tiageSyntheseModal.classList.contains('active')) {
            if (typeof closeTiageSyntheseModal === 'function') closeTiageSyntheseModal(null, true);
            else if (typeof window.closeTiageSyntheseModal === 'function') window.closeTiageSyntheseModal(null, true);
        }

        // Navigate to the correct page
        if (event.state && event.state.mobilePage) {
            // Only change page if we're not on a modal state
            if (!event.state.modal) {
                window.mobileGoToPage(event.state.mobilePage, true);
            }
        } else {
            // If no state, go to page 1
            window.mobileGoToPage(1, true);
        }
    });

    // Handle initial load with hash (e.g., direct link to #seite2)
    const hash = window.location.hash;
    if (hash && hash.startsWith('#seite')) {
        const pageNum = parseInt(hash.replace('#seite', ''));
        if (pageNum >= 1 && pageNum <= 3) {
            // Delay to ensure DOM is ready
            setTimeout(() => {
                // For page 2 and 3, we need valid selections - go to page 1 first
                if (pageNum > 1) {
                    window.mobileGoToPage(1, true);
                }
            }, 100);
        }
    }
}

    // ── Exports ─────────────────────────────────────────────────────────────
    window.updateMobileResultPage = updateMobileResultPage;
    window.updateMobileProContraPage = updateMobileProContraPage;
    window.updateMobileCategoriesPage = updateMobileCategoriesPage;
    window.toggleMobileCategory = toggleMobileCategory;
    window.checkAndShowMobileLayout = checkAndShowMobileLayout;
    window.updateMobileGewichtung = updateMobileGewichtung;
    window.syncMobileGewichtungFromState = syncMobileGewichtungFromState;
    window.updateMobileGewichtungSumme = updateMobileGewichtungSumme;
    window.syncDesktopAgodFromMobile = syncDesktopAgodFromMobile;
    window.resetMobileGewichtung = resetMobileGewichtung;
    window.initMobileGewichtung = initMobileGewichtung;
    window.initMobileGeschlechtGrids = initMobileGeschlechtGrids;
    window.initMobileLayout = initMobileLayout;
    window.initBrowserHistoryNavigation = initBrowserHistoryNavigation;

})();
