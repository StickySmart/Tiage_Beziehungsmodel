/**
 * ICH WIZARD — Schrittweiser Aufbau des Du-Profils (Mobile only)
 *
 * 6 Screens mit expliziten Weiter/Zurück-Buttons:
 *  1. Beziehungstyp     — Archetyp-Grid
 *  2. Geschlecht        — Geschlechtsidentität + Mehr-Info
 *  3. Attraktion        — Orientierung + Mehr-Info
 *  4. Dominanz          — Dominanz-Dynamik + Mehr-Info
 *  5. Best Match        — Partner finden + Score
 *  6. Synthese          — Ergebnis → weiter zu Bedürfnissen
 *
 * © 2026 Ti-age.de Alle Rechte vorbehalten.
 */
var IchWizard = (function() {
    'use strict';

    var _screen = 1;

    var SCREENS = [
        {
            icon: '🧬', label: 'Beziehungstyp', sub: 'Wähle deinen Archetypen',
            info: null
        },
        {
            icon: '⚤', label: 'Geschlechtsidentität', sub: 'Körper & Identität',
            info: 'Deine Geschlechtsidentität beeinflusst, wie das Ti-Age-Modell deine Bedürfnisse gewichtet. Wähle was zu dir passt — Körper, Seele oder beides.',
            infoAction: 'show-body-soul-modal'
        },
        {
            icon: '🧲', label: 'Attraktion', sub: 'Wen begehrst du?',
            info: 'Deine Anziehung bestimmt, welche Partner-Profile für dich relevant sind. Mehrfachauswahl möglich — Primär hat mehr Gewicht.',
            infoAction: null
        },
        {
            icon: '⚡', label: 'Dominanz', sub: 'Deine Rolle in der Dynamik',
            info: 'Dominanz beschreibt deine bevorzugte Energie in Beziehungen. Du kannst mehrere Rollen wählen — Gelebt = aktiv, Interessiert = offen dafür.',
            infoAction: null
        },
        {
            icon: '🎰', label: 'Best Match', sub: 'Finde deinen Typ',
            info: null
        },
        {
            icon: '💡', label: 'Synthese', sub: 'Dein Ergebnis',
            info: null
        }
    ];

    var DIM_KEYS = {
        2: 'mobile-ich-geschlecht-multi',
        3: 'mobile-ich-orientierung-multi',
        4: 'mobile-ich-dominanz-multi'
    };

    // ── Completion check ─────────────────────────────────────────────────────

    function getArchetyp() {
        var el = document.querySelector('#mobile-ich-archetype-grid .archetype-symbol-item.active');
        return el ? el.dataset.archetype : null;
    }

    function canAdvanceFromScreen(n) {
        var dims = (window.mobilePersonDimensions || window.personDimensions || {}).ich || {};
        if (n === 1) return !!getArchetyp();
        if (n === 2) return !!(dims.geschlecht && dims.geschlecht.primary);
        if (n === 3) {
            var ori = dims.orientierung;
            return !!(ori && (Array.isArray(ori) ? ori.length > 0 : ori.primary));
        }
        if (n === 4) {
            var dom = dims.dominanz;
            return !!(dom && (typeof dom === 'string' ? dom : dom.primary));
        }
        if (n === 5) {
            return !!(typeof window.getPartnerArchetype === 'function' && window.getPartnerArchetype());
        }
        return true;
    }

    // ── DOM helpers ──────────────────────────────────────────────────────────

    function show(el) { if (el) el.classList.remove('wizard-hidden'); }
    function hide(el) { if (el) el.classList.add('wizard-hidden'); }

    function showDimOnly(key) {
        [2, 3, 4].forEach(function(n) {
            var el = document.querySelector('[data-dimension="' + DIM_KEYS[n] + '"]');
            if (!el) return;
            if (DIM_KEYS[n] === key) show(el);
            else hide(el);
        });
    }

    // ── Screen application ───────────────────────────────────────────────────

    function applyScreen(n) {
        _screen = n;
        var page1       = document.getElementById('mobilePage1');
        if (!page1) return;

        page1.classList.add('wizard-mode');

        var archGrid    = document.getElementById('mobile-ich-archetype-grid');
        var headerInfo  = page1.querySelector('.mobile-header-info-container');
        var ichCard     = document.getElementById('mobileIchCard');
        var ichDims     = document.getElementById('mobileIchDimensions');
        var gfkDim      = page1.querySelector('[data-dimension="mobile-ich-gfk"]');
        var resetRow    = page1.querySelector('.free-reset-btn') ? page1.querySelector('.free-reset-btn').closest('div') : null;
        var selectRow   = document.getElementById('mobile-ich-select-row');
        var partnerCard = document.getElementById('mobilePartnerCard');
        var bmSect      = page1.querySelector('.mobile-bestmatch-section');
        var synthSect   = page1.querySelector('.mobile-synthese-section');
        var resetAllBtn = page1.querySelector('[data-action="reset-all"]');

        // Always hidden in wizard
        hide(selectRow);
        hide(resetAllBtn);
        hide(gfkDim);

        if (n === 1) {
            // ── Archetyp ──
            show(ichCard);
            show(archGrid);
            if (headerInfo) headerInfo.style.display = '';
            hide(ichDims);
            hide(resetRow);
            hide(partnerCard);
            hide(bmSect);
            hide(synthSect);

        } else if (n >= 2 && n <= 4) {
            // ── Geschlecht / Attraktion / Dominanz ──
            show(ichCard);
            hide(archGrid);
            if (headerInfo) headerInfo.style.display = 'none';
            show(ichDims);
            show(resetRow);
            hide(partnerCard);
            hide(bmSect);
            hide(synthSect);
            showDimOnly(DIM_KEYS[n]);

        } else if (n === 5) {
            // ── Best Match ── (kein DU/PARTNER-Card nötig)
            hide(ichCard);
            hide(archGrid);
            if (headerInfo) headerInfo.style.display = 'none';
            hide(ichDims);
            hide(resetRow);
            hide(partnerCard);
            show(bmSect);
            show(synthSect);

        } else if (n === 6) {
            // ── Synthese ──
            hide(ichCard);
            hide(archGrid);
            if (headerInfo) headerInfo.style.display = 'none';
            hide(ichDims);
            hide(resetRow);
            hide(partnerCard);
            hide(bmSect);
            show(synthSect);
        }

        _updateUI();
        window.scrollTo(0, 0);
    }

    // ── UI update ────────────────────────────────────────────────────────────

    function _updateUI() {
        var progressEl = document.getElementById('ichWizardProgress');
        var promptEl   = document.getElementById('ichWizardPrompt');
        if (!progressEl || !promptEl) return;

        // Progress dots
        progressEl.style.display = 'flex';
        var dots = progressEl.querySelectorAll('.wz-dot');
        dots.forEach(function(dot, i) {
            var sn = i + 1;
            dot.className = 'wz-dot ' + (sn < _screen ? 'done' : sn === _screen ? 'active' : 'pending');
            dot.textContent = sn < _screen ? '✓' : String(sn);
        });

        // Prompt content
        promptEl.style.display = 'block';
        var sc     = SCREENS[_screen - 1];
        var numEl  = promptEl.querySelector('.wz-num');
        var lblEl  = promptEl.querySelector('.wz-label');
        var subEl  = promptEl.querySelector('.wz-sublabel');
        var infoBox = promptEl.querySelector('.wz-infobox');
        var infoContent = promptEl.querySelector('.wz-infobox-content');
        var infoToggle  = promptEl.querySelector('.wz-infobox-toggle');
        var nextBtn = promptEl.querySelector('.wz-next');
        var backBtn = promptEl.querySelector('.wz-back');
        var needsBtn = promptEl.querySelector('.wz-needs-btn');

        if (numEl) numEl.textContent = 'Schritt ' + _screen + ' von ' + SCREENS.length;
        if (lblEl) lblEl.textContent = sc.icon + ' ' + sc.label;
        if (subEl) subEl.textContent = sc.sub;

        // Info box (screens 2-4)
        if (infoBox) {
            if (sc.info) {
                infoBox.style.display = '';
                if (infoContent) infoContent.textContent = sc.info;
                // Collapse by default on screen change
                infoBox.classList.remove('wz-infobox--open');
            } else {
                infoBox.style.display = 'none';
            }
        }

        // Back button
        if (backBtn) backBtn.style.display = _screen > 1 ? 'inline-flex' : 'none';

        // "Zu den Bedürfnissen" button — only on last screen
        if (needsBtn) needsBtn.style.display = _screen === SCREENS.length ? 'flex' : 'none';

        // Next button
        if (nextBtn) {
            if (_screen >= SCREENS.length) {
                nextBtn.style.display = 'none';
            } else {
                nextBtn.style.display = 'inline-flex';
                var canAdvance = canAdvanceFromScreen(_screen);
                nextBtn.disabled = !canAdvance;
                nextBtn.classList.toggle('wz-next--ready', canAdvance);
            }
        }
    }

    // ── Public navigation ────────────────────────────────────────────────────

    function goTo(n) {
        n = Math.max(1, Math.min(SCREENS.length, n));
        applyScreen(n);
    }

    function getScreen() { return _screen; }

    // ── Init ─────────────────────────────────────────────────────────────────

    function init() {
        var dims = document.getElementById('mobileIchDimensions');
        if (!dims || document.getElementById('ichWizardUI')) return;

        // Force ICH card open
        var ichCard = document.getElementById('mobileIchCard');
        var ichBody = document.getElementById('mobileIchBody');
        if (ichCard) ichCard.classList.remove('is-collapsed');
        if (ichBody) ichBody.style.display = 'block';

        // Insert wizard UI above the ICH card
        var insertBefore = ichCard || dims;
        var insertParent = insertBefore.parentNode;

        var dots = SCREENS.map(function(s, i) {
            return '<span class="wz-dot pending" data-wf-go="' + (i + 1) + '">' + (i + 1) + '</span>' +
                   (i < SCREENS.length - 1 ? '<span class="wz-line"></span>' : '');
        }).join('');

        var ui = document.createElement('div');
        ui.id = 'ichWizardUI';
        ui.innerHTML =
            '<div id="ichWizardProgress" class="wz-progress" style="display:none;">' + dots + '</div>' +
            '<div id="ichWizardPrompt" class="wz-prompt" style="display:none;">' +
                '<span class="wz-num"></span>' +
                '<span class="wz-label"></span>' +
                '<span class="wz-sublabel"></span>' +
                '<div class="wz-infobox" style="display:none;">' +
                    '<button type="button" class="wz-infobox-toggle">ℹ Mehr Info</button>' +
                    '<div class="wz-infobox-content"></div>' +
                '</div>' +
                '<div class="wz-nav">' +
                    '<button type="button" class="wz-back" style="display:none;">← Zurück</button>' +
                    '<button type="button" class="wz-next" disabled>Weiter →</button>' +
                '</div>' +
                '<a href="needs-editor.html?person=ich" class="wz-needs-btn" style="display:none;">' +
                    '⚙️ Bedürfnisse anpassen →' +
                '</a>' +
            '</div>';

        insertParent.insertBefore(ui, insertBefore);

        // Event listeners
        var progressEl  = document.getElementById('ichWizardProgress');
        var promptEl    = document.getElementById('ichWizardPrompt');

        progressEl.addEventListener('click', function(e) {
            var dot = e.target.closest('[data-wf-go]');
            if (dot) goTo(parseInt(dot.dataset.wfGo, 10));
        });

        promptEl.querySelector('.wz-back').addEventListener('click', function() {
            goTo(_screen - 1);
        });
        promptEl.querySelector('.wz-next').addEventListener('click', function() {
            goTo(_screen + 1);
        });
        promptEl.querySelector('.wz-infobox-toggle').addEventListener('click', function() {
            this.closest('.wz-infobox').classList.toggle('wz-infobox--open');
        });

        // Watch archetype grid — enables Weiter on screen 1
        var grid = document.getElementById('mobile-ich-archetype-grid');
        if (grid) {
            new MutationObserver(function() {
                if (_screen === 1) _updateUI();
            }).observe(grid, { attributes: true, subtree: true, attributeFilter: ['class'] });
        }

        // Watch dimension grids — enables Weiter on screens 2-4
        ['mobile-ich-geschlecht-multi', 'mobile-ich-orientierung-multi', 'mobile-ich-dominanz-multi'].forEach(function(key) {
            var dimEl = document.querySelector('[data-dimension="' + key + '"]');
            if (dimEl) {
                new MutationObserver(function() {
                    if (_screen >= 2 && _screen <= 4) _updateUI();
                }).observe(dimEl, { attributes: true, subtree: true, attributeFilter: ['class'] });
            }
        });

        // Watch partner archetype grid — enables Weiter on screen 5
        var partnerGrid = document.getElementById('mobile-partner-archetype-grid');
        if (partnerGrid) {
            new MutationObserver(function() {
                if (_screen === 5) _updateUI();
            }).observe(partnerGrid, { attributes: true, subtree: true, attributeFilter: ['class'] });
        }

        applyScreen(1);

        // Re-enforce screen state after other components may have reset visibility
        setTimeout(function() { applyScreen(_screen); }, 700);
    }

    return { init: init, goTo: goTo, getScreen: getScreen, update: _updateUI };
})();

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(IchWizard.init, 350); });
} else {
    setTimeout(IchWizard.init, 350);
}
