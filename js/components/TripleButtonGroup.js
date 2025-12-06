/**
 * TRIPLE BUTTON GROUP COMPONENT
 *
 * Wiederverwendbare 3-Option-Button-Gruppe für Profile-Review.
 * Ersetzt repetitive HTML-Strukturen mit data-driven Rendering.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const TripleButtonGroup = (function() {
    'use strict';

    /**
     * Erstellt HTML für eine Triple-Button-Gruppe
     * @param {Object} config - Konfiguration
     * @param {string} config.attrId - Attribut-ID (z.B. 'pr-kinder')
     * @param {string} config.label - Anzeige-Label
     * @param {string} [config.hint] - Optionaler Hinweis in Klammern
     * @param {Array<string>} config.options - Array mit 3 Button-Labels [links, mitte, rechts]
     * @param {number} [config.defaultValue=50] - Standard-Wert (25, 50, oder 75)
     * @param {string} [config.cardId] - Optionale Card-ID
     * @param {string} [config.description] - Optionale Beschreibung für Tooltip
     * @returns {string} HTML-String
     */
    function render(config) {
        const { attrId, label, hint, options, defaultValue = 50, cardId, description } = config;

        const values = [25, 50, 75];
        const cardIdAttr = cardId ? ` id="${cardId}"` : '';
        const hintHtml = hint ? ` <span class="dimension-hint">(${hint})</span>` : '';
        const infoIconHtml = description
            ? ` <span class="attr-info-icon" title="${description}">&#9432;</span>`
            : '';

        const buttonsHtml = options.map((optLabel, i) => {
            const isActive = values[i] === defaultValue ? ' active' : '';
            return `<button class="profile-review-triple-btn${isActive}" data-value="${values[i]}" onclick="selectTripleBtn(this)">${optLabel}</button>`;
        }).join('\n                            ');

        return `
                    <div class="profile-review-card"${cardIdAttr}>
                        <div class="compact-dimension-label">${label}${hintHtml}${infoIconHtml}</div>
                        <div class="profile-review-triple-buttons" data-attr="${attrId}">
                            ${buttonsHtml}
                        </div>
                    </div>`;
    }

    /**
     * Erstellt mehrere Triple-Button-Gruppen aus einem Array
     * @param {Array<Object>} configs - Array von Konfigurationsobjekten
     * @returns {string} HTML-String
     */
    function renderMany(configs) {
        return configs.map(render).join('\n');
    }

    /**
     * Holt den aktuellen Wert einer Triple-Button-Gruppe
     * @param {string} attrId - Attribut-ID
     * @returns {string} Wert ('25', '50', oder '75')
     */
    function getValue(attrId) {
        const group = document.querySelector(`[data-attr="${attrId}"]`);
        if (!group) return '50';
        const activeBtn = group.querySelector('.profile-review-triple-btn.active');
        return activeBtn ? activeBtn.getAttribute('data-value') : '50';
    }

    /**
     * Setzt den Wert einer Triple-Button-Gruppe
     * @param {string} attrId - Attribut-ID
     * @param {number|string} value - Wert (25, 50, oder 75)
     */
    function setValue(attrId, value) {
        const group = document.querySelector(`[data-attr="${attrId}"]`);
        if (!group) return;

        const numValue = parseInt(value, 10);
        group.querySelectorAll('.profile-review-triple-btn').forEach(btn => {
            const btnValue = parseInt(btn.getAttribute('data-value'), 10);
            btn.classList.toggle('active', btnValue === numValue);
        });
    }

    /**
     * Event-Handler für Button-Klicks
     * @param {HTMLElement} btn - Geklickter Button
     */
    function handleClick(btn) {
        const group = btn.parentElement;
        group.querySelectorAll('.profile-review-triple-btn').forEach(b => {
            b.classList.remove('active');
        });
        btn.classList.add('active');

        // Dispatch custom event für Change-Tracking
        const event = new CustomEvent('tripleButtonChange', {
            bubbles: true,
            detail: {
                attrId: group.getAttribute('data-attr'),
                value: btn.getAttribute('data-value')
            }
        });
        btn.dispatchEvent(event);
    }

    return {
        render,
        renderMany,
        getValue,
        setValue,
        handleClick
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TripleButtonGroup;
}
