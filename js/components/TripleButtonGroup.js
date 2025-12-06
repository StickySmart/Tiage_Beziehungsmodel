/**
 * TRIPLE BUTTON GROUP COMPONENT
 *
 * Wiederverwendbare Button-Gruppe für Profile-Review.
 * Unterstützt 3 oder 5 Optionen mit automatischem Layout.
 * Ersetzt repetitive HTML-Strukturen mit data-driven Rendering.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const TripleButtonGroup = (function() {
    'use strict';

    /**
     * Generiert Werte für die Buttons basierend auf Anzahl der Optionen
     * @param {number} count - Anzahl der Optionen
     * @returns {Array<number>} Array mit Werten
     */
    function generateValues(count) {
        if (count === 3) return [25, 50, 75];
        if (count === 5) return [0, 25, 50, 75, 100];
        // Fallback: gleichmäßig verteilen
        return Array.from({ length: count }, (_, i) => Math.round((i / (count - 1)) * 100));
    }

    /**
     * Erstellt HTML für eine Button-Gruppe (3 oder 5 Optionen)
     * @param {Object} config - Konfiguration
     * @param {string} config.attrId - Attribut-ID (z.B. 'pr-kinder')
     * @param {string} config.label - Anzeige-Label
     * @param {string} [config.hint] - Optionaler Hinweis in Klammern
     * @param {Array<string>} config.options - Array mit Button-Labels (3 oder 5)
     * @param {number} [config.defaultValue=50] - Standard-Wert
     * @param {string} [config.cardId] - Optionale Card-ID
     * @param {string} [config.description] - Optionale Beschreibung für Tooltip
     * @returns {string} HTML-String
     */
    function render(config) {
        const { attrId, label, hint, options, defaultValue = 50, cardId, description } = config;

        const values = generateValues(options.length);
        const cardIdAttr = cardId ? ` id="${cardId}"` : '';
        const hintHtml = hint ? ` <span class="dimension-hint">(${hint})</span>` : '';
        const infoIconHtml = description
            ? ` <span class="attr-info-icon" onclick="event.stopPropagation(); openAttributeDefinitionModal('${attrId}')" title="Info anzeigen">ℹ</span>`
            : '';

        // CSS-Klasse für 5-Button-Layout
        const multiClass = options.length === 5 ? ' five-options' : '';

        const buttonsHtml = options.map((optLabel, i) => {
            const isActive = values[i] === defaultValue ? ' active' : '';
            return `<button class="profile-review-triple-btn${isActive}" data-value="${values[i]}" onclick="selectTripleBtn(this)">${optLabel}</button>`;
        }).join('\n                            ');

        return `
                    <div class="profile-review-card"${cardIdAttr}>
                        <div class="compact-dimension-label">${label}${hintHtml}${infoIconHtml}</div>
                        <div class="profile-review-triple-buttons${multiClass}" data-attr="${attrId}">
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
