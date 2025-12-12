/**
 * CATEGORY SECTION COMPONENT
 *
 * Container-Komponente für Kategorien im Profile-Review.
 * Gruppiert mehrere ProfileCards unter einem gemeinsamen Header.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const CategorySection = (function() {
    'use strict';

    /**
     * Kategorie-Icons und Labels
     */
    const CATEGORIES = {
        gewichtung: { icon: '⚖️', label: 'FAKTOR-GEWICHTUNG (Score-Formel)' },
        resonanz: { icon: '🎵', label: 'RESONANZFAKTOREN (R1-R4)' },
        lebensplanung: { icon: '📋', label: 'LEBENSPLANUNG' },
        finanzen: { icon: '💰', label: 'FINANZEN & KARRIERE' },
        kommunikation: { icon: '💬', label: 'KOMMUNIKATION' },
        soziales: { icon: '👥', label: 'SOZIALES' },
        intimitaet: { icon: '💕', label: 'INTIMITÄT' },
        werte: { icon: '⚖️', label: 'WERTE' },
        praktisches: { icon: '🏠', label: 'PRAKTISCHES' },
        geschlechtsidentitaet: { icon: '⚧', label: 'GESCHLECHTSIDENTITÄT' }
    };

    /**
     * Speicher für Lock-Status pro Kategorie
     */
    const lockedCategories = {};

    /**
     * Erstellt HTML für eine Kategorie-Section
     * @param {Object} config - Konfiguration
     * @param {string} config.category - Kategorie-Key
     * @param {string} [config.icon] - Überschreibt Standard-Icon
     * @param {string} [config.label] - Überschreibt Standard-Label
     * @param {string} config.content - Innerer HTML-Content (Cards)
     * @param {boolean} [config.isGewichtung=false] - Spezielle Gewichtungs-Styles
     * @param {boolean} [config.isResonanz=false] - Spezielle Resonanz-Styles
     * @param {number} [config.itemCount] - Anzahl der Unterelemente
     * @returns {string} HTML-String
     */
    function render(config) {
        const { category, icon, label, content, isGewichtung = false, isResonanz = false, itemCount } = config;

        const categoryInfo = CATEGORIES[category] || { icon: '📌', label: category.toUpperCase() };
        const displayIcon = icon || categoryInfo.icon;
        const displayLabel = label || categoryInfo.label;

        // Spezielle Klassen für Gewichtung oder Resonanz
        let categoryClass = 'profile-review-category';
        let headerClass = 'profile-review-category-header';

        if (isGewichtung) {
            categoryClass += ' profile-review-category-gewichtung';
            headerClass += ' profile-review-category-header-gewichtung';
        } else if (isResonanz) {
            categoryClass += ' profile-review-category-resonanz';
            headerClass += ' profile-review-category-header-resonanz';
        }

        // Zähler-Anzeige wenn itemCount vorhanden
        const countHtml = typeof itemCount === 'number'
            ? `<span class="profile-review-category-count">(${itemCount})</span>`
            : '';

        // Lock-Symbol für Kategorie (nicht für Gewichtung oder Resonanz)
        const lockHtml = (!isGewichtung && !isResonanz)
            ? `<span class="profile-review-category-lock" onclick="event.stopPropagation(); CategorySection.toggleCategoryLock('${category}', this)"></span>`
            : '';

        return `
                <div class="${categoryClass}" data-category="${category}">
                    <div class="${headerClass}">
                        <span class="profile-review-category-icon">${displayIcon}</span>
                        <span>${displayLabel}</span>
                        ${countHtml}
                        <span style="flex: 1;"></span>
                        ${lockHtml}
                    </div>
                    ${content}
                </div>`;
    }

    /**
     * Erstellt eine Kategorie mit Triple-Button-Cards aus Konfiguration
     * @param {Object} config - Kategorie-Konfiguration
     * @param {string} config.category - Kategorie-Key
     * @param {Array<Object>} config.attributes - Array von Attribut-Konfigurationen
     * @returns {string} HTML-String
     */
    function renderWithAttributes(config) {
        const { category, attributes } = config;

        const cardsHtml = attributes.map(attr => {
            const values = [25, 50, 75];
            const defaultValue = attr.defaultValue || 50;
            const questionHtml = attr.question ? `<div class="dimension-question">${attr.question}</div>` : '';
            const cardIdAttr = attr.cardId ? ` id="${attr.cardId}"` : '';

            const buttonsHtml = attr.options.map((optLabel, i) => {
                const isActive = values[i] === defaultValue ? ' active' : '';
                return `<button class="profile-review-triple-btn${isActive}" data-value="${values[i]}" onclick="selectTripleBtn(this)">${optLabel}</button>`;
            }).join('\n                            ');

            return `
                    <div class="profile-review-card"${cardIdAttr}>
                        <div class="compact-dimension-label">${attr.label}</div>
                        ${questionHtml}
                        <div class="profile-review-triple-buttons" data-attr="${attr.attrId}">
                            ${buttonsHtml}
                        </div>
                    </div>`;
        }).join('\n');

        return render({ category, content: cardsHtml });
    }

    /**
     * Holt alle Werte einer Kategorie
     * @param {string} category - Kategorie-Key
     * @returns {Object} Objekt mit attrId: value Paaren
     */
    function getCategoryValues(category) {
        const section = document.querySelector(`[data-category="${category}"]`);
        if (!section) return {};

        const values = {};
        section.querySelectorAll('[data-attr]').forEach(group => {
            const attrId = group.getAttribute('data-attr');
            const activeBtn = group.querySelector('.profile-review-triple-btn.active');
            values[attrId] = activeBtn ? activeBtn.getAttribute('data-value') : '50';
        });

        return values;
    }

    /**
     * Prüft ob eine Kategorie sichtbar ist
     * @param {string} category - Kategorie-Key
     * @returns {boolean} Sichtbarkeitsstatus
     */
    function isVisible(category) {
        const section = document.querySelector(`[data-category="${category}"]`);
        return section ? section.style.display !== 'none' : false;
    }

    /**
     * Zeigt oder versteckt eine Kategorie
     * @param {string} category - Kategorie-Key
     * @param {boolean} visible - Sichtbarkeit
     */
    function setVisible(category, visible) {
        const section = document.querySelector(`[data-category="${category}"]`);
        if (section) {
            section.style.display = visible ? '' : 'none';
        }
    }

    /**
     * Togglet den Lock-Status einer Kategorie
     * @param {string} category - Kategorie-Key
     * @param {HTMLElement} [lockElement] - Das Lock-Element (optional)
     */
    function toggleCategoryLock(category, lockElement) {
        lockedCategories[category] = !lockedCategories[category];
        const isLocked = lockedCategories[category];

        const section = document.querySelector(`[data-category="${category}"]`);
        if (section) {
            section.classList.toggle('category-locked', isLocked);

            // Alle Attribute in dieser Kategorie sperren/entsperren
            const attrCards = section.querySelectorAll('.attribute-summary-card');
            attrCards.forEach(card => {
                const attrId = card.getAttribute('data-attr');
                if (attrId && typeof AttributeSummaryCard !== 'undefined') {
                    // Setze Lock-Status für das Attribut
                    if (isLocked) {
                        card.classList.add('category-parent-locked');
                    } else {
                        card.classList.remove('category-parent-locked');
                    }
                }
            });
        }

        // Custom Event für Tracking
        const event = new CustomEvent('categoryLockChange', {
            bubbles: true,
            detail: { category, locked: isLocked }
        });
        document.dispatchEvent(event);
    }

    /**
     * Prüft ob eine Kategorie gesperrt ist
     * @param {string} category - Kategorie-Key
     * @returns {boolean} Lock-Status
     */
    function isCategoryLocked(category) {
        return lockedCategories[category] || false;
    }

    /**
     * Setzt den Lock-Status einer Kategorie
     * @param {string} category - Kategorie-Key
     * @param {boolean} locked - Lock-Status
     */
    function setCategoryLock(category, locked) {
        if (lockedCategories[category] !== locked) {
            toggleCategoryLock(category);
        }
    }

    /**
     * Holt alle Lock-Status
     * @returns {Object} Lock-Status pro Kategorie
     */
    function getAllLockStatus() {
        return { ...lockedCategories };
    }

    return {
        render,
        renderWithAttributes,
        getCategoryValues,
        isVisible,
        setVisible,
        toggleCategoryLock,
        isCategoryLocked,
        setCategoryLock,
        getAllLockStatus,
        CATEGORIES
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CategorySection;
}
