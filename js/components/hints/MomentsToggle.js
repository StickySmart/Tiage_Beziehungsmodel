/**
 * MOMENTS TOGGLE COMPONENT
 *
 * Globaler Toggle-Button zum Ein-/Ausschalten der Philosophie-Momente.
 * Kann im Header oder an anderer Stelle platziert werden.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const MomentsToggle = (function() {
    'use strict';

    let toggleButton = null;

    /**
     * Erstellt den Toggle-Button
     * @returns {HTMLElement} Der Toggle-Button
     */
    function create() {
        const button = document.createElement('button');
        button.className = 'moments-toggle-btn';
        button.id = 'momentsToggleBtn';
        button.title = 'Philosophie-Momente ein/aus';

        updateButtonState(button);

        button.addEventListener('click', function() {
            toggle();
        });

        // Auf externe Änderungen reagieren
        window.addEventListener('tiage-moments-toggled', function() {
            updateButtonState(button);
        });

        toggleButton = button;
        return button;
    }

    /**
     * Aktualisiert den Button-Zustand basierend auf dem aktuellen Status
     * @param {HTMLElement} button - Der Button
     */
    function updateButtonState(button) {
        const enabled = isEnabled();

        button.innerHTML = `
            <span class="moments-toggle-icon">${enabled ? '💭' : '🚫'}</span>
            <span class="moments-toggle-text">${enabled ? 'Momente' : 'Momente aus'}</span>
        `;

        button.classList.toggle('moments-toggle-btn--disabled', !enabled);
        button.setAttribute('aria-pressed', String(enabled));
        button.title = enabled ? 'Philosophie-Momente ausschalten' : 'Philosophie-Momente einschalten';
    }

    /**
     * Toggle-Funktion
     * @returns {boolean} Neuer Status
     */
    function toggle() {
        let newState;

        if (typeof HintState !== 'undefined' && typeof HintState.toggleMomentsEnabled === 'function') {
            newState = HintState.toggleMomentsEnabled();
        } else {
            // Fallback: direkt localStorage ändern
            const currentState = isEnabled();
            newState = !currentState;
            localStorage.setItem('tiage_moments_enabled', String(newState));

            // Event manuell auslösen
            window.dispatchEvent(new CustomEvent('tiage-moments-toggled', {
                detail: { enabled: newState }
            }));
        }

        // Alle existierenden Momente ein-/ausblenden
        updateExistingMoments(newState);

        if (toggleButton) {
            updateButtonState(toggleButton);
        }

        return newState;
    }

    /**
     * Prüft ob Momente aktiviert sind
     * @returns {boolean}
     */
    function isEnabled() {
        if (typeof HintState !== 'undefined' && typeof HintState.areMomentsEnabled === 'function') {
            return HintState.areMomentsEnabled();
        }
        // Fallback
        try {
            const stored = localStorage.getItem('tiage_moments_enabled');
            return stored === null ? true : stored === 'true';
        } catch (e) {
            return true;
        }
    }

    /**
     * Aktualisiert alle existierenden Moment-Elemente auf der Seite
     * @param {boolean} enabled - Neuer Status
     */
    function updateExistingMoments(enabled) {
        // Alle Philosophy-Hint Elemente finden
        const hints = document.querySelectorAll('.philosophy-hint');

        hints.forEach(hint => {
            if (enabled) {
                hint.style.display = '';
                hint.classList.remove('philosophy-hint--hidden');
            } else {
                hint.style.display = 'none';
                hint.classList.add('philosophy-hint--hidden');
            }
        });

        console.log(`[TIAGE] ${hints.length} Momente ${enabled ? 'eingeblendet' : 'ausgeblendet'}`);
    }

    /**
     * Initialisiert den Toggle im Header
     * Sucht nach dem Element mit der Klasse 'header-buttons' und fügt den Toggle hinzu
     */
    function init() {
        const headerButtons = document.querySelector('.header-buttons');
        if (headerButtons) {
            const button = create();
            // Vor dem Fold/Unfold Button einfügen
            const firstButton = headerButtons.firstElementChild;
            if (firstButton) {
                headerButtons.insertBefore(button, firstButton);
            } else {
                headerButtons.appendChild(button);
            }
            console.log('[TIAGE] MomentsToggle initialisiert');
        } else {
            console.warn('[TIAGE] Header-Buttons nicht gefunden - MomentsToggle nicht eingefügt');
        }
    }

    // Public API
    return {
        create,
        toggle,
        isEnabled,
        init,
        updateExistingMoments
    };

})();

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MomentsToggle;
}
