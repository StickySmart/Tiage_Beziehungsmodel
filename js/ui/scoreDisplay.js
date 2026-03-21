// ═══════════════════════════════════════════════════════════════════════════════
// js/ui/scoreDisplay.js
// Extracted from app-main.js
// Contains: updateSyntheseScoreCycle, triggerLightbulbBlink, stopLightbulbBlink,
//           updateDesktopFactorContent, updateRFactorDisplay
// ═══════════════════════════════════════════════════════════════════════════════

(function() {
    'use strict';

    // Aliases for chart utilities
    var getScoreGradientColor = TiageChartUtils.getScoreGradientColor;
    var getBarClass = TiageChartUtils.getBarClass;

function updateSyntheseScoreCycle() {
    const scoreValueEl = document.getElementById('syntheseScoreValue');
    const scoreProgressEl = document.getElementById('syntheseScoreProgress');
    const mainScoreValueEl = document.getElementById('mainScoreValue');
    const mainScoreProgressEl = document.getElementById('mainScoreProgress');

    // Get current score from resultPercentage
    const percentage = document.getElementById('resultPercentage');
    const percentageText = percentage ? percentage.textContent : '–';

    // FIX: Handle incomplete state (when percentage shows "–")
    const isIncomplete = percentageText === '–' || percentageText.trim() === '';
    const currentScore = isIncomplete ? 0 : (parseFloat(percentageText) || 0);
    const displayScore = isIncomplete ? '–' : currentScore.toFixed(1);

    // console.log('[TIAGE] updateSyntheseScoreCycle - score:', currentScore, 'mainScoreValueEl:', !!mainScoreValueEl); // DISABLED: verursacht Message-Overflow

    // Update circle progress (circumference = 2 * PI * r = 2 * 3.14159 * 42 ≈ 264)
    const circumference = 264;
    // Kreisanzeige auf 100% begrenzen, aber Score-Zahl kann höher sein
    const visualProgress = Math.min(currentScore, 100);
    const offset = isIncomplete ? circumference : (circumference - (visualProgress / 100) * circumference);

    // Update color based on score (rot → gelb → grün → gold bei >100%)
    // FIX: Use muted color for incomplete state
    const color = isIncomplete ? 'var(--text-muted, #888)' : getScoreGradientColor(currentScore);

    // Update Modal Score Circle
    if (scoreValueEl && scoreProgressEl) {
        scoreValueEl.textContent = displayScore;
        scoreProgressEl.style.strokeDashoffset = offset;
        scoreProgressEl.style.stroke = color;
        scoreValueEl.style.color = color;
    }

    // Update Main Page Score Circle
    if (mainScoreValueEl && mainScoreProgressEl) {
        mainScoreValueEl.textContent = displayScore;
        mainScoreProgressEl.style.strokeDashoffset = offset;
        mainScoreProgressEl.style.stroke = color;
        mainScoreValueEl.style.color = color;
    }

    // Update Mobile Score Circle
    const mobileScoreEl = document.getElementById('mobileScoreCircle');
    const mobileScoreProgressEl = document.getElementById('mobileScoreProgress');

    if (mobileScoreEl) {
        mobileScoreEl.textContent = displayScore;
        mobileScoreEl.style.color = color;
    }

    if (mobileScoreProgressEl) {
        mobileScoreProgressEl.style.strokeDashoffset = offset;
        mobileScoreProgressEl.style.stroke = color;
    }

    // Trigger lightbulb blink animation when score is calculated
    // v4.4: Blink deaktivieren wenn Score incomplete/0
    if (currentScore > 0) {
        triggerLightbulbBlink();
    } else {
        stopLightbulbBlink();
    }

    // Update Score Summary Line in Synthese Modal
    const scoreSummaryValueEl = document.getElementById('syntheseScoreSummaryValue');
    const needsSummaryValueEl = document.getElementById('syntheseNeedsSummaryValue');

    if (scoreSummaryValueEl) {
        scoreSummaryValueEl.textContent = displayScore;
        scoreSummaryValueEl.style.color = color;
    }

    if (needsSummaryValueEl) {
        // Get Bedürfnis-Übereinstimmung from lastGfkMatchingResult
        // FIX: Show "–" for incomplete state
        if (isIncomplete) {
            needsSummaryValueEl.textContent = '–';
            needsSummaryValueEl.style.color = 'var(--text-muted, #888)';
        } else {
            const matching2 = (window.TiageGfkMatching && window.TiageGfkMatching.getLastMatchingResult) ? window.TiageGfkMatching.getLastMatchingResult() : null;
                    const needsScore = matching2 ? matching2.score : 0;
            needsSummaryValueEl.textContent = needsScore;
            // Color based on needs score
            const needsColor = getScoreGradientColor(needsScore);
            needsSummaryValueEl.style.color = needsColor;
        }
    }
}
window.updateSyntheseScoreCycle = updateSyntheseScoreCycle;

// Trigger lightbulb blink animation to encourage clicking
function triggerLightbulbBlink() {
    const lightbulbIcons = document.querySelectorAll('.lightbulb-icon');
    lightbulbIcons.forEach(icon => {
        // Add blink-active class if not already present
        if (!icon.classList.contains('blink-active')) {
            icon.classList.add('blink-active');
            console.log('[TIAGE] Lightbulb blink animation activated');
        }
    });
}

// Stop lightbulb blink animation (can be called when user clicks the lightbulb)
function stopLightbulbBlink() {
    const lightbulbIcons = document.querySelectorAll('.lightbulb-icon');
    lightbulbIcons.forEach(icon => {
        icon.classList.remove('blink-active');
    });
}

// Bar class utility: delegated to js/ui/chartUtils.js
var getBarClass = TiageChartUtils.getBarClass;

// Collapsible functions: delegated to js/ui/collapsible.js (TiageCollapsible module)
// - toggleCollapsible, toggleDimensionCollapse, toggleAllDimensionsCollapse
// - toggleDesktopFactor, updateDesktopFactorFoldButton

// Update all desktop factor expandable content
function updateDesktopFactorContent() {
    // Check if factorExplanations is defined (it's defined later in the file)
    if (typeof window.factorExplanations === 'undefined') return;

    const ich = window.getIchArchetype();
    const partner = window.getPartnerArchetype();
    const dimensions = window.personDimensions;

    const factorTypes = ['archetyp', 'dominanz', 'orientierung', 'geschlecht'];

    factorTypes.forEach(factorType => {
        const factor = window.factorExplanations[factorType];
        if (!factor) return;

        // Get score
        const prefix = 'desktopFactor';
        let score = 0;
        const scoreEl = document.getElementById(prefix + factorType.charAt(0).toUpperCase() + factorType.slice(1));
        if (scoreEl) {
            score = parseInt(scoreEl.textContent) || 0;
        }

        // Update explanation
        const explanationId = prefix + factorType.charAt(0).toUpperCase() + factorType.slice(1) + 'Explanation';
        const explanationEl = document.getElementById(explanationId);
        if (explanationEl) {
            explanationEl.textContent = factor.getExplanation(ich, partner, score, dimensions);
        }

        // Update meaning list
        const meaningId = prefix + factorType.charAt(0).toUpperCase() + factorType.slice(1) + 'Meaning';
        const meaningList = document.getElementById(meaningId);
        if (meaningList) {
            meaningList.innerHTML = '';
            factor.getMeaning(score, ich, partner).forEach(item => {
                const li = document.createElement('li');
                if (typeof item === 'object' && item.title) {
                    li.innerHTML = `<strong>${item.title}</strong>${item.desc ? ` – ${item.desc}` : ''}`;
                } else {
                    li.textContent = item;
                }
                meaningList.appendChild(li);
            });
        }
    });
}

// Update R-Factor Display (Resonanz der Paarung R1-R4)
function updateRFactorDisplay() {
    const rDisplay = document.getElementById('rFactorDisplay');
    if (!rDisplay) return;

    // Extrahiere R-Wert (Format kann { R1: value } oder { R1: { value, locked } } sein)
    const extractR = (rf, key) => {
        if (!rf || rf[key] === undefined) return 1.0;
        if (typeof rf[key] === 'object' && rf[key].value !== undefined) return rf[key].value;
        return rf[key];
    };

    // FIX v4.3: Nur selectedPartner verwenden, nicht auf TiageState zurückfallen
    // (TiageState kann alte Werte aus localStorage haben obwohl kein Partner aktiv ist)
    const partnerArchetype = window.getPartnerArchetype() || null;
    const ichArchetype = window.getIchArchetype() || (typeof TiageState !== 'undefined' ? TiageState.get('archetypes.ich.primary') : null);
    const subtitle = document.getElementById('rFactorSubtitle');

    let rFactors = { R1: null, R2: null, R3: null, R4: null };

    try {
        if (!ichArchetype) {
            // Kein ICH-Archetyp → zeige "-"
            if (subtitle) subtitle.textContent = 'ICH × PARTNER';
        } else if (!partnerArchetype) {
            // v4.3: Kein Partner gewählt → zeige ICH-R-Faktoren (statt "-")
            if (subtitle) subtitle.textContent = 'ICH';
            if (typeof TiageState !== 'undefined') {
                // FIX: Per-Archetyp-Pfad lesen (resonanzFaktoren.ich.{archetyp})
                const rfIch = TiageState.getResonanzFaktoren('ich');
                if (rfIch) {
                    rFactors = {
                        R1: extractR(rfIch, 'R1'),
                        R2: extractR(rfIch, 'R2'),
                        R3: extractR(rfIch, 'R3'),
                        R4: extractR(rfIch, 'R4')
                    };
                }
            }
        } else {
            // Partner gewählt → kombinierte R-Faktoren (ICH × PARTNER)
            if (subtitle) subtitle.textContent = 'ICH × PARTNER';

            if (typeof TiageSynthesis !== 'undefined' && TiageSynthesis.Calculator && TiageSynthesis.Calculator.getLastRFactors) {
                rFactors = TiageSynthesis.Calculator.getLastRFactors() || rFactors;
            }

            if (rFactors.R1 === null && typeof TiageState !== 'undefined') {
                // FIX v1.8.1001: getResonanzFaktoren löst per-Archetyp-Pfad korrekt auf
                const rfIch = TiageState.getResonanzFaktoren('ich');
                const rfPartner = TiageState.getResonanzFaktoren('partner');

                if (rfIch && rfPartner) {
                    // FIX v4.3: combineRFactors statt einfacher Multiplikation
                    // Vorher: R_ich * R_partner → 3.02 * 3.02 = 9.12 (falsch!)
                    // Jetzt:  (summe * similarity) / 2 → (6.04 * 1.0) / 2 = 3.02
                    // SSOT: Gleiche Formel wie combineRFactors() in synthesisCalculator.js
                    // Keine Zwischen-Rundung — Display-Rundung per toFixed(2)
                    const combine = (a, b) => {
                        const va = a || 1.0, vb = b || 1.0;
                        const summe = va + vb;
                        const similarity = Math.min(va, vb) / Math.max(va, vb);
                        return (summe * similarity) / 2;
                    };
                    rFactors = {
                        R1: combine(extractR(rfIch, 'R1'), extractR(rfPartner, 'R1')),
                        R2: combine(extractR(rfIch, 'R2'), extractR(rfPartner, 'R2')),
                        R3: combine(extractR(rfIch, 'R3'), extractR(rfPartner, 'R3')),
                        R4: combine(extractR(rfIch, 'R4'), extractR(rfPartner, 'R4'))
                    };
                }
            }
        }
    } catch (e) {
        console.warn('[TIAGE] updateRFactorDisplay error:', e);
    }

    // Update UI
    ['R1', 'R2', 'R3', 'R4'].forEach(key => {
        const valueEl = document.getElementById('rValue' + key);
        const boxEl = document.getElementById('rFactor' + key);
        if (!valueEl || !boxEl) return;

        const val = rFactors[key];
        if (val === null || val === undefined) {
            valueEl.textContent = '-';
            boxEl.classList.remove('high', 'medium', 'low');
        } else {
            // FIX v4.3: R-Faktoren können mit v4.0 Sensitivität > 1.0 sein
            valueEl.textContent = val.toFixed(2);

            // Farb-Klasse: v4.0 Skala (R=1.0 = Neutral, >1.2 = Gut, >1.8 = Stark)
            boxEl.classList.remove('high', 'medium', 'low');
            if (val >= 1.8) {
                boxEl.classList.add('high');
            } else if (val >= 1.2) {
                boxEl.classList.add('medium');
            } else if (val < 0.6) {
                boxEl.classList.add('low');
            }
        }
    });
}


    // ── Exports ──────────────────────────────────────────────────────────────
    window.updateSyntheseScoreCycle = updateSyntheseScoreCycle;
    window.triggerLightbulbBlink = triggerLightbulbBlink;
    window.stopLightbulbBlink = stopLightbulbBlink;
    window.updateDesktopFactorContent = updateDesktopFactorContent;
    window.updateRFactorDisplay = updateRFactorDisplay;

})();
