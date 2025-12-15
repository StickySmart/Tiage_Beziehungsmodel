/**
 * PHILOSOPHY HINT COMPONENT
 *
 * Ausklappbare Philosophie-Hinweise für das Tiage-Beziehungsmodell.
 * Macht philosophische Konzepte (Pirsig, Osho) erlebbar, ohne sie zu erklären.
 *
 * Design-Prinzip: Die Philosophie wird im Workflow erlebt.
 * Hinweise sind optional ausklappbar – für Nutzer, die verstehen wollen.
 *
 * Ton: Mischung aus direkt/konfrontierend und sanft/einladend.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const PhilosophyHint = (function() {
    'use strict';

    /**
     * Storage Key für dismissed hints
     */
    const STORAGE_KEY = 'tiage_dismissed_hints';

    /**
     * Generiert eine eindeutige ID
     * @returns {string} Unique ID
     */
    function generateId() {
        return 'hint-' + Math.random().toString(36).substr(2, 9);
    }

    /**
     * Lädt dismissed hints aus localStorage
     * @returns {Array} Array von dismissed hint IDs
     */
    function getDismissedHints() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch (e) {
            console.warn('[TIAGE] Fehler beim Laden der dismissed hints:', e);
            return [];
        }
    }

    /**
     * Speichert einen dismissed hint
     * @param {string} hintId - Die ID des hints
     */
    function dismissHint(hintId) {
        try {
            const dismissed = getDismissedHints();
            if (!dismissed.includes(hintId)) {
                dismissed.push(hintId);
                localStorage.setItem(STORAGE_KEY, JSON.stringify(dismissed));
            }
        } catch (e) {
            console.warn('[TIAGE] Fehler beim Speichern des dismissed hint:', e);
        }
    }

    /**
     * Prüft ob ein Hint dismissed wurde
     * @param {string} hintId - Die ID des hints
     * @returns {boolean} true wenn dismissed
     */
    function isHintDismissed(hintId) {
        return getDismissedHints().includes(hintId);
    }

    /**
     * Erstellt die PhilosophyHint Komponente
     *
     * @param {Object} options - Konfiguration
     * @param {string} options.visible - Der immer sichtbare kurze Text
     * @param {string} options.linkText - Text für den Ausklapp-Link
     * @param {string|HTMLElement} options.expandedContent - Der ausklappbare Inhalt
     * @param {string} [options.variant='default'] - 'default' oder 'highlight'
     * @param {string} [options.id] - Optionale ID für Analytics/Dismissal
     * @param {Function} [options.onExpand] - Callback wenn expanded
     * @param {Function} [options.onCollapse] - Callback wenn collapsed
     * @param {boolean} [options.dismissable=false] - Kann permanent ausgeblendet werden
     * @param {boolean} [options.startExpanded=false] - Startet expanded
     * @returns {HTMLElement} Die Hint-Komponente
     */
    function create(options) {
        const {
            visible,
            linkText,
            expandedContent,
            variant = 'default',
            id = generateId(),
            onExpand = null,
            onCollapse = null,
            dismissable = false,
            startExpanded = false
        } = options;

        // Prüfe ob dismissed
        if (dismissable && isHintDismissed(id)) {
            const placeholder = document.createElement('div');
            placeholder.className = 'philosophy-hint-dismissed';
            return placeholder;
        }

        // Container
        const container = document.createElement('div');
        container.className = `philosophy-hint philosophy-hint--${variant}`;
        container.setAttribute('role', 'region');
        container.setAttribute('aria-label', 'Philosophischer Hinweis');
        container.dataset.hintId = id;

        // Sichtbarer Text
        const visibleEl = document.createElement('p');
        visibleEl.className = 'philosophy-hint__visible';
        visibleEl.textContent = visible;

        // Link zum Ausklappen
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'philosophy-hint__toggle';
        toggleBtn.setAttribute('aria-expanded', startExpanded ? 'true' : 'false');
        toggleBtn.textContent = linkText;

        // Expanded Content Container
        const expandedEl = document.createElement('div');
        expandedEl.className = 'philosophy-hint__expanded';
        expandedEl.setAttribute('aria-hidden', startExpanded ? 'false' : 'true');

        if (startExpanded) {
            expandedEl.classList.add('philosophy-hint__expanded--open');
        }

        // Content einfügen (String oder Element)
        if (typeof expandedContent === 'string') {
            // Paragraphen aus String erstellen
            const paragraphs = expandedContent.split('\n\n').filter(p => p.trim());
            paragraphs.forEach(text => {
                const p = document.createElement('p');
                p.textContent = text.trim();
                expandedEl.appendChild(p);
            });
        } else if (expandedContent instanceof HTMLElement) {
            expandedEl.appendChild(expandedContent);
        }

        // Dismiss Button (optional)
        let dismissBtn = null;
        if (dismissable) {
            dismissBtn = document.createElement('button');
            dismissBtn.className = 'philosophy-hint__dismiss';
            dismissBtn.textContent = 'Nicht mehr zeigen';
            dismissBtn.setAttribute('aria-label', 'Diesen Hinweis nicht mehr anzeigen');
            expandedEl.appendChild(dismissBtn);
        }

        // Toggle-Logik
        let isExpanded = startExpanded;

        toggleBtn.addEventListener('click', () => {
            isExpanded = !isExpanded;

            toggleBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
            expandedEl.setAttribute('aria-hidden', isExpanded ? 'false' : 'true');

            if (isExpanded) {
                expandedEl.classList.add('philosophy-hint__expanded--open');
                if (typeof onExpand === 'function') {
                    onExpand(id);
                }
                // Analytics Event
                if (typeof trackEvent === 'function') {
                    trackEvent('philosophy_hint_expanded', { moment: id });
                }
            } else {
                expandedEl.classList.remove('philosophy-hint__expanded--open');
                if (typeof onCollapse === 'function') {
                    onCollapse(id);
                }
            }
        });

        // Dismiss-Logik
        if (dismissBtn) {
            dismissBtn.addEventListener('click', () => {
                dismissHint(id);
                container.classList.add('philosophy-hint--dismissing');
                setTimeout(() => {
                    container.remove();
                }, 300);
            });
        }

        // Zusammenbauen
        container.appendChild(visibleEl);
        container.appendChild(toggleBtn);
        container.appendChild(expandedEl);

        return container;
    }

    /**
     * Animiert das Einblenden einer Hint-Komponente
     * @param {HTMLElement} hint - Die Hint-Komponente
     * @param {HTMLElement} target - Das Ziel-Element
     * @param {string} [position='beforeend'] - insertAdjacentElement Position
     */
    function show(hint, target, position = 'beforeend') {
        if (!hint || !target) return;

        hint.classList.add('philosophy-hint--entering');
        target.insertAdjacentElement(position, hint);

        // Animation triggern
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                hint.classList.remove('philosophy-hint--entering');
            });
        });
    }

    /**
     * Entfernt eine Hint-Komponente mit Animation
     * @param {HTMLElement} hint - Die Hint-Komponente
     */
    function hide(hint) {
        if (!hint) return;

        hint.classList.add('philosophy-hint--leaving');
        setTimeout(() => {
            hint.remove();
        }, 300);
    }

    /**
     * Aktuelle Modal-Referenz
     */
    let currentModal = null;

    /**
     * Zeigt einen Hint als zentriertes Popup-Modal
     * @param {HTMLElement} hint - Die Hint-Komponente
     * @param {Object} [options] - Optionen
     * @param {Function} [options.onClose] - Callback beim Schließen
     * @returns {HTMLElement} Das Modal-Overlay Element
     */
    function showModal(hint, options = {}) {
        if (!hint) return null;

        // Falls bereits ein Modal offen ist, schließen
        if (currentModal) {
            closeModal();
        }

        // Modal-Overlay erstellen
        const overlay = document.createElement('div');
        overlay.className = 'moments-modal-overlay';
        overlay.setAttribute('role', 'dialog');
        overlay.setAttribute('aria-modal', 'true');
        overlay.setAttribute('aria-label', 'Philosophischer Moment');

        // Modal-Container
        const modal = document.createElement('div');
        modal.className = 'moments-modal';

        // Close Button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'moments-modal__close';
        closeBtn.innerHTML = '&times;';
        closeBtn.setAttribute('aria-label', 'Schließen');
        closeBtn.setAttribute('title', 'Schließen');

        // Content Container
        const content = document.createElement('div');
        content.className = 'moments-modal__content';
        content.appendChild(hint);

        // Modal zusammenbauen
        modal.appendChild(closeBtn);
        modal.appendChild(content);
        overlay.appendChild(modal);

        // Zum Body hinzufügen
        document.body.appendChild(overlay);
        currentModal = overlay;

        // Animation triggern
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                overlay.classList.add('moments-modal-overlay--visible');
            });
        });

        // Close-Handler
        function handleClose() {
            overlay.classList.remove('moments-modal-overlay--visible');
            setTimeout(() => {
                overlay.remove();
                currentModal = null;
                if (typeof options.onClose === 'function') {
                    options.onClose();
                }
            }, 300);
        }

        // Event-Listener
        closeBtn.addEventListener('click', handleClose);

        // Overlay-Klick schließt Modal
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                handleClose();
            }
        });

        // Escape-Taste schließt Modal
        function handleEscape(e) {
            if (e.key === 'Escape' && currentModal === overlay) {
                handleClose();
                document.removeEventListener('keydown', handleEscape);
            }
        }
        document.addEventListener('keydown', handleEscape);

        // Focus auf Close-Button setzen
        closeBtn.focus();

        return overlay;
    }

    /**
     * Schließt das aktuelle Modal
     */
    function closeModal() {
        if (currentModal) {
            currentModal.classList.remove('moments-modal-overlay--visible');
            setTimeout(() => {
                if (currentModal) {
                    currentModal.remove();
                    currentModal = null;
                }
            }, 300);
        }
    }

    /**
     * Prüft ob ein Modal geöffnet ist
     * @returns {boolean}
     */
    function isModalOpen() {
        return currentModal !== null;
    }

    /**
     * Setzt alle dismissed hints zurück
     */
    function resetDismissed() {
        try {
            localStorage.removeItem(STORAGE_KEY);
            console.log('[TIAGE] Dismissed hints zurückgesetzt');
        } catch (e) {
            console.warn('[TIAGE] Fehler beim Zurücksetzen:', e);
        }
    }

    // Public API
    return {
        create,
        show,
        hide,
        showModal,
        closeModal,
        isModalOpen,
        dismissHint,
        isHintDismissed,
        resetDismissed,
        getDismissedHints
    };

})();

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhilosophyHint;
}
