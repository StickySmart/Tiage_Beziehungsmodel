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

    updateMobileReadinessUI();

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

// Helper: prüft ob eine Person vollständig konfiguriert ist (Archetyp + GOD)
function _isPersonComplete(arch, dims) {
    if (!arch || !dims) return false;
    var g = dims.geschlecht;
    var gOk = !!(g && (typeof g === 'string' ? g : g.primary));
    var dOk = !!(dims.dominanz && (dims.dominanz.primary || typeof dims.dominanz === 'string'));
    var ori = dims.orientierung;
    // orientierung can be array (v4.0 multi-select) or {primary} object or string
    var oOk = !!(ori && (Array.isArray(ori) ? ori.length > 0 : (ori.primary || typeof ori === 'string')));
    return gOk && dOk && oOk;
}

// Readiness-UI für mobile UND desktop — Lightbulb / Score / Best Match
function updateReadinessUI() {
    var dims = window.personDimensions || {};
    var ichArch = window.getIchArchetype ? window.getIchArchetype() : null;
    var partnerArch = window.getPartnerArchetype ? window.getPartnerArchetype() : null;

    var ichComplete    = _isPersonComplete(ichArch, dims.ich);
    var partnerComplete = _isPersonComplete(partnerArch, dims.partner);

    // ── MOBILE ───────────────────────────────────────────────────────────────
    // Score-Kreis + Lightbulb: nur wenn PARTNER vollständig
    var scoreContainer = document.querySelector('.mobile-synthese-section .score-circle-container');
    if (scoreContainer) scoreContainer.style.display = partnerComplete ? '' : 'none';

    // Hint unter Score-Bereich wenn Partner unvollständig
    var mobileScoreHint = document.getElementById('mobileScoreReadinessHint');
    if (!mobileScoreHint) {
        mobileScoreHint = document.createElement('div');
        mobileScoreHint.id = 'mobileScoreReadinessHint';
        mobileScoreHint.style.cssText = 'font-size:11px;color:var(--text-muted);text-align:center;padding:6px 12px;';
        var syntheseSection = document.querySelector('.mobile-synthese-section');
        if (syntheseSection) syntheseSection.appendChild(mobileScoreHint);
    }
    if (mobileScoreHint) {
        if (!partnerArch) {
            mobileScoreHint.textContent = 'Wähle einen Partner-Archetyp für den Score';
            mobileScoreHint.style.display = '';
        } else if (!partnerComplete) {
            mobileScoreHint.textContent = 'Vervollständige das Partner-Profil (Geschlecht, Orientierung, Dominanz)';
            mobileScoreHint.style.display = '';
        } else {
            mobileScoreHint.style.display = 'none';
        }
    }

    // Best Match: nur wenn ICH vollständig
    var bestMatchSection = document.querySelector('.mobile-bestmatch-section');
    if (bestMatchSection) bestMatchSection.style.display = ichComplete ? '' : 'none';

    // Hint für Best Match wenn ICH unvollständig
    var mobileBestMatchHint = document.getElementById('mobileBestMatchReadinessHint');
    if (!mobileBestMatchHint) {
        mobileBestMatchHint = document.createElement('div');
        mobileBestMatchHint.id = 'mobileBestMatchReadinessHint';
        mobileBestMatchHint.style.cssText = 'font-size:11px;color:var(--text-muted);text-align:center;padding:6px 12px;';
        var bestSection = document.querySelector('.mobile-bestmatch-section');
        if (bestSection && bestSection.parentNode) bestSection.parentNode.insertBefore(mobileBestMatchHint, bestSection.nextSibling);
    }
    if (mobileBestMatchHint) {
        if (!ichArch) {
            mobileBestMatchHint.textContent = 'Wähle deinen Archetyp für den Best-Match-Finder';
            mobileBestMatchHint.style.display = '';
        } else if (!ichComplete) {
            mobileBestMatchHint.textContent = 'Vervollständige dein Profil (Geschlecht, Orientierung, Dominanz) für den Best-Match-Finder';
            mobileBestMatchHint.style.display = '';
        } else {
            mobileBestMatchHint.style.display = 'none';
        }
    }

    // ── DESKTOP ──────────────────────────────────────────────────────────────
    // Center-column lightbulb: keep dimmed/enabled as secondary access
    var desktopLightbulb = document.querySelector('.lightbulb-button:not(.mobile-lightbulb-button)');
    if (desktopLightbulb) {
        desktopLightbulb.style.opacity = partnerComplete ? '1' : '0.35';
        desktopLightbulb.style.pointerEvents = partnerComplete ? '' : 'none';
        desktopLightbulb.title = partnerComplete
            ? 'Ti-Age Synthese öffnen'
            : 'Partner-Profil muss vollständig sein (Geschlecht, Orientierung, Dominanz)';
    }

    // Center-column Best Match: keep dimmed/enabled as secondary access
    var desktopBestMatch = document.querySelector('.best-match-btn.slot-machine-center-btn');
    if (desktopBestMatch) {
        desktopBestMatch.style.opacity = ichComplete ? '1' : '0.35';
        desktopBestMatch.style.pointerEvents = ichComplete ? '' : 'none';
        desktopBestMatch.title = ichComplete
            ? 'Finde den besten Partner – testet alle 864 Kombinationen'
            : 'Dein Profil muss vollständig sein (Geschlecht, Orientierung, Dominanz)';
    }

    // ── FLOATING ACTION BAR (Desktop only) ──────────────────────────────────
    // Best Match FAB: erscheint wenn ICH vollständig
    // Synthese FAB: erscheint wenn PARTNER vollständig
    var fabBestMatch = document.getElementById('floatBestMatch');
    var fabSynthese  = document.getElementById('floatSynthese');
    var fabBar       = document.getElementById('desktopFloatingBar');

    if (fabBestMatch) {
        fabBestMatch.classList.toggle('fab-active', ichComplete);
    }
    if (fabSynthese) {
        fabSynthese.classList.toggle('fab-active', partnerComplete);
    }
    if (fabBar) {
        fabBar.style.pointerEvents = (ichComplete || partnerComplete) ? 'auto' : 'none';
    }
}
window.updateReadinessUI = updateReadinessUI;

// Legacy-Alias (wird von updateSyntheseScoreCycle aufgerufen)
function updateMobileReadinessUI() { updateReadinessUI(); }
window.updateMobileReadinessUI = updateMobileReadinessUI;

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

// Update Entwicklungsstufen Display (ersetzt R-Faktoren, zeigt absolute Ø-Bedürfniswerte)
function updateRFactorDisplay() {
    const rDisplay = document.getElementById('rFactorDisplay');
    if (!rDisplay) return;

    // Stufen-Zuordnung: Bedürfnis-Kategorie → Stufen-Nr (1-4)
    const STUFEN_MAP = {
        '#K1':1,'#K2':1,'#K7':1,'#K18':1,
        '#K5':2,'#K9':2,'#K11':2,'#K14':2,
        '#K3':3,'#K6':3,'#K10':3,'#K15':3,'#K16':3,'#K17':3,
        '#K4':4,'#K8':4,'#K12':4,'#K13':4
    };

    // Berechne Ø-Wert (0-100) pro Stufe — fällt auf Archetyp-Baseline zurück wenn keine manuellen Werte
    function calcStufeAverages(flatNeeds, archetype) {
        var beduerfnisse = (window.BeduerfnisKatalog && window.BeduerfnisKatalog.beduerfnisse) || {};
        if (Object.keys(beduerfnisse).length === 0) return null;
        var sums = {1:0,2:0,3:0,4:0};
        var counts = {1:0,2:0,3:0,4:0};
        for (var needId in beduerfnisse) {
            if (!Object.prototype.hasOwnProperty.call(beduerfnisse, needId)) continue;
            var bed = beduerfnisse[needId];
            if (!bed || !bed.kategorie) continue;
            var stufe = STUFEN_MAP[bed.kategorie];
            if (!stufe) continue;
            var val = (flatNeeds && flatNeeds[needId] !== undefined) ? flatNeeds[needId]
                    : (archetype && window.BaseArchetypProfile && window.BaseArchetypProfile[archetype]
                       ? window.BaseArchetypProfile[archetype].umfrageWerte[needId] : undefined);
            if (val !== undefined) {
                sums[stufe] += val;
                counts[stufe]++;
            }
        }
        if (counts[1] + counts[2] + counts[3] + counts[4] === 0) return null;
        return {
            R1: counts[1] > 0 ? Math.round(sums[1]/counts[1]) : null,
            R2: counts[2] > 0 ? Math.round(sums[2]/counts[2]) : null,
            R3: counts[3] > 0 ? Math.round(sums[3]/counts[3]) : null,
            R4: counts[4] > 0 ? Math.round(sums[4]/counts[4]) : null
        };
    }

    const partnerArchetype = window.getPartnerArchetype() || null;
    const ichArchetype = window.getIchArchetype
        ? window.getIchArchetype()
        : (typeof TiageState !== 'undefined' ? TiageState.get('archetypes.ich.primary') : null);
    const subtitle = document.getElementById('rFactorSubtitle');

    let stufen = { R1: null, R2: null, R3: null, R4: null };

    try {
        const ichNeeds = (typeof TiageState !== 'undefined' && TiageState.getFlatNeeds)
            ? TiageState.getFlatNeeds('ich') : null;

        if (!partnerArchetype) {
            if (subtitle) subtitle.textContent = 'ICH';
            const ichStufen = calcStufeAverages(ichNeeds, ichArchetype);
            if (ichStufen) stufen = ichStufen;
        } else {
            if (subtitle) subtitle.textContent = 'ICH × PARTNER';
            const partnerNeeds = (typeof TiageState !== 'undefined' && TiageState.getFlatNeeds)
                ? TiageState.getFlatNeeds('partner') : null;
            const ichStufen = calcStufeAverages(ichNeeds, ichArchetype);
            const partnerStufen = calcStufeAverages(partnerNeeds, partnerArchetype);
            if (ichStufen && partnerStufen) {
                ['R1','R2','R3','R4'].forEach(function(k) {
                    const a = ichStufen[k], b = partnerStufen[k];
                    stufen[k] = (a !== null && b !== null) ? Math.round((a + b) / 2)
                               : (a !== null ? a : b);
                });
            } else if (ichStufen) {
                stufen = ichStufen;
            }
        }
    } catch (e) {
        console.warn('[TIAGE] updateRFactorDisplay error:', e);
    }

    // Update UI — Werte 0-100
    ['R1', 'R2', 'R3', 'R4'].forEach(key => {
        const valueEl = document.getElementById('rValue' + key);
        const boxEl = document.getElementById('rFactor' + key);
        if (!valueEl || !boxEl) return;

        const val = stufen[key];
        if (val === null || val === undefined) {
            valueEl.textContent = '-';
            boxEl.classList.remove('high', 'medium', 'low');
        } else {
            valueEl.textContent = val;
            boxEl.classList.remove('high', 'medium', 'low');
            if (val >= 70) {
                boxEl.classList.add('high');
            } else if (val >= 45) {
                boxEl.classList.add('medium');
            } else {
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
    window.updateMobileReadinessUI = updateMobileReadinessUI;

    // Initial run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() { setTimeout(updateMobileReadinessUI, 400); });
    } else {
        setTimeout(updateMobileReadinessUI, 400);
    }

})();
