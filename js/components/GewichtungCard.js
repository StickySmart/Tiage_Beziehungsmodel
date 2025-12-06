/**
 * GEWICHTUNG CARD COMPONENT
 *
 * Komponente für Faktor-Gewichtungs-Karten mit Input, Lock-Status
 * und automatischer Summen-Berechnung.
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const GewichtungCard = (function() {
    'use strict';

    /**
     * Standard-Gewichtungen
     */
    const DEFAULT_WEIGHTS = {
        orientierung: 40,
        archetyp: 25,
        dominanz: 20,
        geschlecht: 15
    };

    /**
     * Erstellt HTML für eine Gewichtungs-Card
     * @param {Object} config - Konfiguration
     * @param {string} config.factor - Faktor-Name (orientierung, archetyp, dominanz, geschlecht)
     * @param {string} config.label - Anzeige-Label
     * @param {number} [config.value] - Initial-Wert (Standard aus DEFAULT_WEIGHTS)
     * @returns {string} HTML-String
     */
    function render(config) {
        const { factor, label, value } = config;
        const initialValue = value !== undefined ? value : DEFAULT_WEIGHTS[factor] || 25;

        return `
                    <div class="profile-review-card gewichtung-card" data-factor="${factor}">
                        <div class="gewichtung-card-content">
                            <span class="gewichtung-card-label">${label}</span>
                            <div class="gewichtung-card-input-group">
                                <input type="text" class="gewichtung-input" id="gewicht-${factor}" value="${initialValue}" maxlength="3">
                                <span class="gewichtung-percent">%</span>
                                <span class="gewichtung-lock-indicator"></span>
                            </div>
                        </div>
                    </div>`;
    }

    /**
     * Erstellt alle Gewichtungs-Cards
     * @param {Object} [weights] - Optionale benutzerdefinierte Gewichtungen
     * @returns {string} HTML-String
     */
    function renderAll(weights = {}) {
        const factors = [
            { factor: 'orientierung', label: 'Orientierung' },
            { factor: 'archetyp', label: 'Archetyp' },
            { factor: 'dominanz', label: 'Dominanz' },
            { factor: 'geschlecht', label: 'Geschlecht' }
        ];

        return factors.map(f => render({
            ...f,
            value: weights[f.factor]
        })).join('\n');
    }

    /**
     * Erstellt die Footer-Bar mit Summe und Reset
     * @returns {string} HTML-String
     */
    function renderFooter() {
        return `
                    <div class="gewichtung-footer-bar">
                        <span class="gewichtung-hint">Doppelklick = Wert fixieren</span>
                        <span class="gewichtung-summe-text">Summe: <span class="gewichtung-summe-value" id="gewicht-summe">100%</span></span>
                        <button class="profile-review-triple-btn" onclick="resetGewichtungen()" style="padding: 6px 12px; font-size: 11px;">
                            🔄 Standard
                        </button>
                    </div>`;
    }

    /**
     * Holt den Wert einer Gewichtung
     * @param {string} factor - Faktor-Name
     * @returns {number} Gewichtungs-Wert
     */
    function getValue(factor) {
        const input = document.getElementById(`gewicht-${factor}`);
        return input ? parseInt(input.value, 10) || 0 : DEFAULT_WEIGHTS[factor] || 0;
    }

    /**
     * Setzt den Wert einer Gewichtung
     * @param {string} factor - Faktor-Name
     * @param {number} value - Neuer Wert
     */
    function setValue(factor, value) {
        const input = document.getElementById(`gewicht-${factor}`);
        if (input) {
            input.value = value;
        }
    }

    /**
     * Holt alle Gewichtungen
     * @returns {Object} Gewichtungs-Objekt
     */
    function getAllValues() {
        return {
            orientierung: getValue('orientierung'),
            archetyp: getValue('archetyp'),
            dominanz: getValue('dominanz'),
            geschlecht: getValue('geschlecht')
        };
    }

    /**
     * Berechnet und aktualisiert die Summe
     * @returns {number} Aktuelle Summe
     */
    function updateSum() {
        const values = getAllValues();
        const sum = Object.values(values).reduce((a, b) => a + b, 0);
        const sumElement = document.getElementById('gewicht-summe');
        if (sumElement) {
            sumElement.textContent = `${sum}%`;
            sumElement.classList.toggle('gewichtung-summe-error', sum !== 100);
        }
        return sum;
    }

    /**
     * Setzt alle Gewichtungen auf Standard zurück
     */
    function reset() {
        Object.entries(DEFAULT_WEIGHTS).forEach(([factor, value]) => {
            setValue(factor, value);
            // Entferne Lock-Status
            const card = document.querySelector(`[data-factor="${factor}"]`);
            if (card) {
                card.classList.remove('locked', 'readonly');
            }
        });
        updateSum();
    }

    /**
     * Toggle Lock-Status einer Gewichtung
     * @param {string} factor - Faktor-Name
     * @returns {boolean} Neuer Lock-Status
     */
    function toggleLock(factor) {
        const card = document.querySelector(`[data-factor="${factor}"]`);
        if (!card) return false;

        const isLocked = card.classList.toggle('locked');
        return isLocked;
    }

    return {
        render,
        renderAll,
        renderFooter,
        getValue,
        setValue,
        getAllValues,
        updateSum,
        reset,
        toggleLock,
        DEFAULT_WEIGHTS
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GewichtungCard;
}
