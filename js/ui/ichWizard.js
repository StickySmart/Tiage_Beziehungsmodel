/**
 * ICH WIZARD — Schrittweiser Aufbau des Du-Profils (Mobile only)
 *
 * Zeigt auf Page 1 die Dimensionen nacheinander solange das
 * Profil noch nicht vollständig ausgefüllt ist.
 * Nach Abschluss aller 4 Schritte: normales Layout.
 *
 * © 2026 Ti-age.de Alle Rechte vorbehalten.
 */
var IchWizard = (function() {
    'use strict';

    // ── State helpers ────────────────────────────────────────────────────────

    function getArchetyp() {
        // DOM ist Wahrheit: nur wenn das Grid einen aktiven Button zeigt gilt der Schritt als getan
        var activeItem = document.querySelector('#mobile-ich-archetype-grid .archetype-symbol-item.active');
        return activeItem ? activeItem.dataset.archetype : null;
    }

    function getGeschlecht() {
        if (typeof TiageState === 'undefined') return null;
        var g = TiageState.get('personDimensions.ich.geschlecht');
        if (!g) return null;
        if (typeof g === 'string') return g;
        if (typeof g === 'object') return g.primary || null;
        return null;
    }

    function getOrientierung() {
        if (typeof TiageState === 'undefined') return null;
        var o = TiageState.get('personDimensions.ich.orientierung');
        if (!o) return null;
        if (typeof o === 'string') return o;
        if (typeof o === 'object') return o.primary || null;
        return null;
    }

    function getDominanz() {
        if (typeof TiageState === 'undefined') return null;
        var d = TiageState.get('personDimensions.ich.dominanz');
        if (!d) return null;
        if (typeof d === 'string') return d;
        if (typeof d === 'object') return d.primary || null;
        return null;
    }

    // ── Wizard steps ─────────────────────────────────────────────────────────

    var STEPS = [
        {
            label:     'Was bist du?',
            sublabel:  'Wähle deinen Beziehungstyp',
            dimension: null,                              // archetype grid is always above
            get:       getArchetyp
        },
        {
            label:     'Deine Geschlechtsidentität',
            sublabel:  'Körper & Identität',
            dimension: 'mobile-ich-geschlecht-multi',
            get:       getGeschlecht
        },
        {
            label:     'Deine Orientierung',
            sublabel:  'Wen begehrst du?',
            dimension: 'mobile-ich-orientierung-multi',
            get:       getOrientierung
        },
        {
            label:     'Deine Dominanz',
            sublabel:  'Deine Rolle in der Dynamik',
            dimension: 'mobile-ich-dominanz-multi',
            get:       getDominanz
        }
    ];

    // ── Core logic ───────────────────────────────────────────────────────────

    function getCurrentStep() {
        for (var i = 0; i < STEPS.length; i++) {
            if (!STEPS[i].get()) return i;
        }
        return STEPS.length; // all complete
    }

    function update() {
        var page1 = document.getElementById('mobilePage1');
        if (!page1) return;

        var currentStep = getCurrentStep();
        var wizardActive = currentStep < STEPS.length;

        page1.classList.toggle('wizard-mode', wizardActive);

        // ── Progress dots ────────────────────────────────────────────────────
        var progressEl = document.getElementById('ichWizardProgress');
        if (progressEl) {
            progressEl.style.display = wizardActive ? 'flex' : 'none';
            var dots = progressEl.querySelectorAll('.wz-dot');
            dots.forEach(function(dot, i) {
                dot.className = 'wz-dot ' + (i < currentStep ? 'done' : i === currentStep ? 'active' : 'pending');
                dot.textContent = i < currentStep ? '✓' : String(i + 1);
            });
        }

        // ── Step prompt ──────────────────────────────────────────────────────
        var promptEl = document.getElementById('ichWizardPrompt');
        if (promptEl) {
            if (wizardActive) {
                promptEl.style.display = 'block';
                var numEl = promptEl.querySelector('.wz-num');
                var lblEl = promptEl.querySelector('.wz-label');
                var subEl = promptEl.querySelector('.wz-sublabel');
                if (numEl) numEl.textContent = 'Schritt ' + (currentStep + 1) + ' von ' + STEPS.length;
                if (lblEl) lblEl.textContent = STEPS[currentStep].label;
                if (subEl) subEl.textContent = STEPS[currentStep].sublabel;
            } else {
                promptEl.style.display = 'none';
            }
        }

        // ── Dimension visibility ─────────────────────────────────────────────
        STEPS.forEach(function(step, i) {
            if (!step.dimension) return;
            var el = document.querySelector('[data-dimension="' + step.dimension + '"]');
            if (!el) return;

            el.classList.remove('wizard-hidden', 'wizard-active', 'wizard-done');

            if (!wizardActive) return; // normal mode: show all

            if (i < currentStep) {
                el.classList.add('wizard-done');
            } else if (i === currentStep) {
                el.classList.add('wizard-active');
                // Auto-scroll so the new step is visible
                setTimeout(function() {
                    el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            } else {
                el.classList.add('wizard-hidden');
            }
        });

        // GFK und RESET-Button in wizard mode verstecken
        var gfkEl = document.querySelector('[data-dimension="mobile-ich-gfk"]');
        if (gfkEl) gfkEl.classList.toggle('wizard-hidden', wizardActive);

        var resetBtn = page1.querySelector('.free-reset-btn');
        if (resetBtn) resetBtn.closest('div').classList.toggle('wizard-hidden', wizardActive);

        // In wizard mode force ICH card open so dimensions are accessible
        var ichCard = document.getElementById('mobileIchCard');
        var ichBody = document.getElementById('mobileIchBody');
        if (ichCard && ichBody && wizardActive) {
            ichCard.classList.remove('is-collapsed');
            ichBody.style.display = 'block';
        }
    }

    // ── Init ─────────────────────────────────────────────────────────────────

    function init() {
        var dims = document.getElementById('mobileIchDimensions');
        if (!dims || document.getElementById('ichWizardUI')) return;

        // Insert wizard UI above the ICH card (not inside its body)
        var ichCard = document.getElementById('mobileIchCard');
        var insertBefore = ichCard || dims;
        var insertParent = insertBefore.parentNode;

        var ui = document.createElement('div');
        ui.id = 'ichWizardUI';

        var dots = STEPS.map(function(s, i) {
            return '<span class="wz-dot pending">' + (i + 1) + '</span>' +
                   (i < STEPS.length - 1 ? '<span class="wz-line"></span>' : '');
        }).join('');

        ui.innerHTML =
            '<div id="ichWizardProgress" class="wz-progress" style="display:none;">' + dots + '</div>' +
            '<div id="ichWizardPrompt" class="wz-prompt" style="display:none;">' +
                '<span class="wz-num"></span>' +
                '<span class="wz-label"></span>' +
                '<span class="wz-sublabel"></span>' +
            '</div>';

        insertParent.insertBefore(ui, insertBefore);

        // MutationObserver auf dem Archetype-Grid: reagiert auf .active-Klassen-Änderungen
        var grid = document.getElementById('mobile-ich-archetype-grid');
        if (grid) {
            var observer = new MutationObserver(update);
            observer.observe(grid, { attributes: true, subtree: true, attributeFilter: ['class'] });
        }

        // Subscribe to GOD-Dimensionen (Schritt 2-4)
        if (typeof TiageState !== 'undefined' && TiageState.subscribe) {
            TiageState.subscribe('personDimensions.ich.geschlecht', update);
            TiageState.subscribe('personDimensions.ich.orientierung', update);
            TiageState.subscribe('personDimensions.ich.dominanz', update);
        }

        update();
    }

    return { init: init, update: update };
})();

// Init after app is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() { setTimeout(IchWizard.init, 350); });
} else {
    setTimeout(IchWizard.init, 350);
}
