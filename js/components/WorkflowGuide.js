/**
 * WORKFLOW GUIDE COMPONENT
 *
 * Floating Panel (unten rechts) mit kontextsensitivem Workflow-Guide.
 * Erkennt automatisch den aktuellen Schritt basierend auf TiageState.
 * Zeigt Workflow-Anleitung + philosophisches Zitat (Pirsig/Osho).
 *
 * 6 Schritte (0-5):
 *   0. Begrüßung (neuer User / wiederkehrender User)
 *   1. ICH-Archetyp wählen
 *   2. ICH-Dimensionen (GOD) ausfüllen
 *   3. Partner-Archetyp wählen
 *   4. Partner-Dimensionen (GOD) ausfüllen
 *   5. Ergebnis erkunden
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const WorkflowGuide = (function() {
    'use strict';

    const TOTAL_STEPS = 5;
    const STORAGE_KEY = 'tiage_workflow_minimized';
    const GREETING_DISMISSED_KEY = 'tiage_workflow_greeting_seen';

    let panelEl = null;
    let currentStep = 0;
    let isMinimized = false;
    let isReturningUser = false;
    let greetingDismissed = false;
    let unsubscribes = [];

    /**
     * Sichere i18n-Hilfsfunktion
     */
    function t(key, fallback) {
        return (typeof TiageI18n !== 'undefined' && typeof TiageI18n.t === 'function')
            ? TiageI18n.t(key, fallback)
            : fallback;
    }

    /**
     * Prüft ob der User ein bestehendes Profil hat
     */
    function checkReturningUser() {
        try {
            const savedState = localStorage.getItem('tiage_state');
            if (savedState) {
                const state = JSON.parse(savedState);
                const ichLocked = state.profileReview?.ich?.global || state.profileReview?.ich?.lockedNeeds;
                const hasLockedNeeds = ichLocked && Object.keys(ichLocked).length > 0;
                const hasAGOD = state.personDimensions?.ich?.archetyp?.primary;
                return hasLockedNeeds || hasAGOD;
            }
        } catch (e) { /* ignore */ }
        return false;
    }

    /**
     * Prüft ob die Begrüßung bereits gesehen wurde (in dieser Session)
     */
    function isGreetingDismissed() {
        try {
            return sessionStorage.getItem(GREETING_DISMISSED_KEY) === 'true';
        } catch (e) { return false; }
    }

    /**
     * Markiert die Begrüßung als gesehen
     */
    function dismissGreeting() {
        greetingDismissed = true;
        try {
            sessionStorage.setItem(GREETING_DISMISSED_KEY, 'true');
        } catch (e) { /* ignore */ }
    }

    /**
     * Erkennt den aktuellen Workflow-Schritt (0-5)
     * 0 = Begrüßung (nur wenn noch nicht dismissed)
     */
    function detectStep() {
        // Schritt 0: Begrüßung (nur einmal pro Session)
        if (!greetingDismissed) return 0;

        if (typeof TiageState === 'undefined') return 1;

        const ichArch = TiageState.getArchetype('ich');
        if (!ichArch) return 1;

        const ichComplete = TiageState.isPersonComplete('ich');
        if (!ichComplete) return 2;

        const partnerArch = TiageState.getArchetype('partner');
        if (!partnerArch) return 3;

        const partnerComplete = TiageState.isPersonComplete('partner');
        if (!partnerComplete) return 4;

        return 5;
    }

    /**
     * Gibt die Daten für einen Schritt zurück
     */
    function getStepData(step) {
        if (step === 0) {
            // Begrüßung: unterschiedlich für neue vs. wiederkehrende User
            const key = isReturningUser ? 'workflow.returning' : 'workflow.greeting';
            return {
                title: t(`${key}.title`, 'Willkommen'),
                desc: t(`${key}.desc`, ''),
                philosophy: t(`${key}.philosophy`, '')
            };
        }
        const stepKey = `workflow.step${step}`;
        return {
            title: t(`${stepKey}.title`, `Schritt ${step}`),
            desc: t(`${stepKey}.desc`, ''),
            philosophy: t(`${stepKey}.philosophy`, '')
        };
    }

    /**
     * Erstellt das Panel-HTML
     */
    function render() {
        if (!panelEl) return;

        const step = currentStep;
        const data = getStepData(step);
        const isGreeting = (step === 0);

        // Step Label
        const stepLabel = isGreeting
            ? '👋'
            : t('workflow.stepOf', 'Schritt {current} von {total}')
                .replace('{current}', step)
                .replace('{total}', TOTAL_STEPS);

        // Header
        const header = panelEl.querySelector('.workflow-guide__header');
        if (header) {
            header.querySelector('.workflow-guide__step-icon').textContent = isGreeting ? '👋' : '📋';
            header.querySelector('.workflow-guide__step-label').textContent = isGreeting ? '' : stepLabel;
            header.querySelector('.workflow-guide__step-title-mini').textContent = data.title;
        }

        // Body
        const titleEl = panelEl.querySelector('.workflow-guide__title');
        const descEl = panelEl.querySelector('.workflow-guide__desc');
        const philoEl = panelEl.querySelector('.workflow-guide__philosophy');

        if (titleEl) titleEl.textContent = data.title;
        if (descEl) descEl.textContent = data.desc;
        if (philoEl) philoEl.textContent = data.philosophy;

        // Weiter-Button (nur bei Begrüßung)
        renderGreetingAction(isGreeting);

        // Dots (nicht bei Begrüßung)
        renderDots();
    }

    /**
     * Zeigt/versteckt den "Weiter"-Button bei der Begrüßung
     */
    function renderGreetingAction(isGreeting) {
        if (!panelEl) return;

        let actionEl = panelEl.querySelector('.workflow-guide__greeting-action');

        if (isGreeting) {
            if (!actionEl) {
                actionEl = document.createElement('button');
                actionEl.className = 'workflow-guide__greeting-action';
                actionEl.addEventListener('click', function(e) {
                    e.stopPropagation();
                    dismissGreeting();
                    update();
                });
                const body = panelEl.querySelector('.workflow-guide__body');
                const footer = panelEl.querySelector('.workflow-guide__footer');
                if (body && footer) {
                    body.insertBefore(actionEl, footer);
                }
            }
            actionEl.textContent = t('ui.next', 'Weiter') + ' →';
            actionEl.style.display = '';
        } else if (actionEl) {
            actionEl.style.display = 'none';
        }
    }

    /**
     * Rendert die Fortschritts-Dots
     */
    function renderDots() {
        const dotsEl = panelEl?.querySelector('.workflow-guide__dots');
        if (!dotsEl) return;

        dotsEl.innerHTML = '';

        // Keine Dots bei Begrüßung
        if (currentStep === 0) return;

        for (let i = 1; i <= TOTAL_STEPS; i++) {
            const dot = document.createElement('span');
            dot.className = 'workflow-guide__dot';
            if (i < currentStep) dot.classList.add('workflow-guide__dot--done');
            if (i === currentStep) dot.classList.add('workflow-guide__dot--active');
            dotsEl.appendChild(dot);
        }
    }

    /**
     * Erstellt das Panel-DOM
     */
    function createPanel() {
        const panel = document.createElement('div');
        panel.className = 'workflow-guide workflow-guide--entering';
        panel.id = 'workflowGuide';
        panel.setAttribute('role', 'complementary');
        panel.setAttribute('aria-label', 'Workflow Guide');

        panel.innerHTML = `
            <div class="workflow-guide__header" title="${t('workflow.minimize', 'Minimieren')}">
                <div class="workflow-guide__step-info">
                    <span class="workflow-guide__step-icon">📋</span>
                    <span class="workflow-guide__step-label"></span>
                    <span class="workflow-guide__step-title-mini"></span>
                </div>
                <button class="workflow-guide__toggle-btn" aria-label="${t('workflow.minimize', 'Minimieren')}">▼</button>
            </div>
            <div class="workflow-guide__body">
                <div class="workflow-guide__divider"></div>
                <h3 class="workflow-guide__title"></h3>
                <p class="workflow-guide__desc"></p>
                <p class="workflow-guide__philosophy"></p>
                <div class="workflow-guide__footer">
                    <div class="workflow-guide__dots"></div>
                </div>
            </div>
        `;

        // Toggle-Logik
        const header = panel.querySelector('.workflow-guide__header');
        header.addEventListener('click', function() {
            toggleMinimize();
        });

        return panel;
    }

    /**
     * Minimieren/Maximieren
     */
    function toggleMinimize() {
        isMinimized = !isMinimized;
        applyMinimizedState();
        persistMinimized();
    }

    function applyMinimizedState() {
        if (!panelEl) return;
        panelEl.classList.toggle('workflow-guide--minimized', isMinimized);

        const btn = panelEl.querySelector('.workflow-guide__toggle-btn');
        if (btn) {
            btn.setAttribute('aria-label',
                isMinimized
                    ? t('workflow.maximize', 'Workflow-Guide')
                    : t('workflow.minimize', 'Minimieren')
            );
        }
    }

    function persistMinimized() {
        try {
            localStorage.setItem(STORAGE_KEY, String(isMinimized));
        } catch (e) { /* ignore */ }
    }

    function loadMinimized() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored !== null) {
                isMinimized = stored === 'true';
            }
        } catch (e) { /* ignore */ }
    }

    /**
     * Aktualisiert den Schritt basierend auf State
     */
    function update() {
        const newStep = detectStep();
        if (newStep !== currentStep) {
            currentStep = newStep;
            render();
        }
    }

    /**
     * Sichtbarkeit steuern (für MomentsToggle)
     */
    function setVisible(visible) {
        if (!panelEl) return;
        panelEl.classList.toggle('workflow-guide--hidden', !visible);
    }

    function isVisible() {
        if (!panelEl) return false;
        return !panelEl.classList.contains('workflow-guide--hidden');
    }

    /**
     * Initialisiert den Workflow Guide
     */
    function init() {
        // Lade Minimiert-Status
        loadMinimized();

        // Returning-User erkennen
        isReturningUser = checkReturningUser();
        greetingDismissed = isGreetingDismissed();

        // Panel erstellen
        panelEl = createPanel();
        document.body.appendChild(panelEl);

        // Initialen Schritt erkennen
        currentStep = detectStep();
        render();
        applyMinimizedState();

        // Slide-in Animation
        requestAnimationFrame(function() {
            requestAnimationFrame(function() {
                if (panelEl) {
                    panelEl.classList.remove('workflow-guide--entering');
                }
            });
        });

        // State-Subscriber: auf Änderungen reagieren
        if (typeof TiageState !== 'undefined' && typeof TiageState.subscribe === 'function') {
            unsubscribes.push(
                TiageState.subscribe('archetypes.ich', function() { update(); }),
                TiageState.subscribe('archetypes.partner', function() { update(); }),
                TiageState.subscribe('personDimensions.ich', function() { update(); }),
                TiageState.subscribe('personDimensions.partner', function() { update(); })
            );
        }

        // Sprach-Subscriber: Texte aktualisieren
        if (typeof TiageI18n !== 'undefined' && typeof TiageI18n.subscribe === 'function') {
            unsubscribes.push(
                TiageI18n.subscribe(function() { render(); })
            );
        }

        // MomentsToggle: auf Toggle-Events reagieren
        window.addEventListener('tiage-moments-toggled', function(e) {
            const enabled = e.detail?.enabled;
            setVisible(enabled !== false);
        });

        // Initiale Sichtbarkeit prüfen (falls Momente deaktiviert)
        if (typeof MomentsToggle !== 'undefined' && typeof MomentsToggle.isEnabled === 'function') {
            setVisible(MomentsToggle.isEnabled());
        }

        console.log('[TIAGE] WorkflowGuide initialisiert (Schritt ' + currentStep + ')');
    }

    /**
     * Entfernt den Workflow Guide
     */
    function destroy() {
        unsubscribes.forEach(function(unsub) {
            if (typeof unsub === 'function') unsub();
        });
        unsubscribes = [];

        if (panelEl) {
            panelEl.remove();
            panelEl = null;
        }
    }

    // Public API
    return {
        init: init,
        update: update,
        destroy: destroy,
        setVisible: setVisible,
        isVisible: isVisible,
        detectStep: detectStep,
        get currentStep() { return currentStep; }
    };

})();

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = WorkflowGuide;
}
