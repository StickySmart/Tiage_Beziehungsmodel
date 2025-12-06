/**
 * PROFILE CARD COMPONENT
 *
 * Wrapper-Komponente für einzelne Attribut-Karten im Profile-Review.
 * Unterstützt verschiedene Content-Typen (triple, toggle, custom).
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const ProfileCard = (function() {
    'use strict';

    /**
     * Erstellt HTML für eine Profile-Card
     * @param {Object} config - Konfiguration
     * @param {string} [config.id] - Optionale Card-ID
     * @param {string} [config.label] - Optionales Label
     * @param {string} [config.hint] - Optionaler Hinweis
     * @param {string} config.content - Innerer HTML-Content
     * @param {string} [config.style] - Optionale Inline-Styles
     * @returns {string} HTML-String
     */
    function render(config) {
        const { id, label, hint, content, style } = config;

        const idAttr = id ? ` id="${id}"` : '';
        const styleAttr = style ? ` style="${style}"` : '';
        const hintHtml = hint ? ` <span class="dimension-hint">(${hint})</span>` : '';
        const labelHtml = label ? `<div class="compact-dimension-label">${label}${hintHtml}</div>` : '';

        return `
                    <div class="profile-review-card"${idAttr}${styleAttr}>
                        ${labelHtml}
                        ${content}
                    </div>`;
    }

    /**
     * Erstellt eine Card mit Triple-Button-Gruppe
     * @param {Object} config - Konfiguration
     * @param {string} config.attrId - Attribut-ID
     * @param {string} config.label - Label
     * @param {string} [config.hint] - Optionaler Hinweis
     * @param {Array<string>} config.options - Button-Labels
     * @param {number} [config.defaultValue=50] - Standard-Wert
     * @returns {string} HTML-String
     */
    function renderWithTripleButtons(config) {
        const { attrId, label, hint, options, defaultValue = 50 } = config;

        const values = [25, 50, 75];
        const hintHtml = hint ? ` <span class="dimension-hint">(${hint})</span>` : '';

        const buttonsHtml = options.map((optLabel, i) => {
            const isActive = values[i] === defaultValue ? ' active' : '';
            return `<button class="profile-review-triple-btn${isActive}" data-value="${values[i]}" onclick="selectTripleBtn(this)">${optLabel}</button>`;
        }).join('\n                            ');

        return `
                    <div class="profile-review-card">
                        <div class="compact-dimension-label">${label}${hintHtml}</div>
                        <div class="profile-review-triple-buttons" data-attr="${attrId}">
                            ${buttonsHtml}
                        </div>
                    </div>`;
    }

    /**
     * Erstellt eine Card mit Toggle-Button (2 Optionen)
     * @param {Object} config - Konfiguration
     * @param {string} config.attrId - Attribut-ID
     * @param {string} config.label - Label
     * @param {Array<string>} config.options - [leftLabel, rightLabel]
     * @param {boolean} [config.activeRight=false] - Ob rechter Button aktiv ist
     * @returns {string} HTML-String
     */
    function renderWithToggleButtons(config) {
        const { attrId, label, options, activeRight = false } = config;

        const leftActive = activeRight ? '' : ' active';
        const rightActive = activeRight ? ' active' : '';

        return `
                    <div class="profile-review-card">
                        <div class="compact-dimension-label">${label}</div>
                        <div class="profile-review-toggle-buttons" data-attr="${attrId}">
                            <button class="profile-review-toggle-btn${leftActive}" data-value="egal" onclick="selectToggleBtn(this)">${options[0]}</button>
                            <button class="profile-review-toggle-btn${rightActive}" data-value="wichtig" onclick="selectToggleBtn(this)">${options[1]}</button>
                        </div>
                    </div>`;
    }

    return {
        render,
        renderWithTripleButtons,
        renderWithToggleButtons
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProfileCard;
}
