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
     * Standard-Gewichtungen (gleichverteilt)
     */
    const DEFAULT_WEIGHTS = {
        orientierung: 25,
        archetyp: 25,
        dominanz: 25,
        geschlecht: 25
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
                            <div class="gewichtung-slider-row">
                                <input type="range" class="gewichtung-slider" id="gewicht-slider-${factor}"
                                       min="0" max="100" value="${initialValue}"
                                       oninput="GewichtungCard.onSliderInput('${factor}', this.value)"
                                       onclick="event.stopPropagation()">
                            </div>
                            <div class="gewichtung-card-input-group">
                                <input type="text" class="gewichtung-input" id="gewicht-${factor}" value="${initialValue}" maxlength="3"
                                       oninput="GewichtungCard.onInputChange('${factor}', this.value)"
                                       onclick="event.stopPropagation()">
                                <span class="gewichtung-percent">%</span>
                                <span class="gewichtung-lock-indicator"
                                      onclick="event.stopPropagation(); if(typeof handleLockToggle === 'function') handleLockToggle('${factor}');"
                                      title="Klicken zum Sperren/Entsperren"></span>
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
                        <span class="gewichtung-hint">Klick auf 🔓 = Wert fixieren</span>
                        <span class="gewichtung-summe-text">
                            Summe: <span class="gewichtung-summe-value" id="gewicht-summe">100%</span>
                            <span class="gewichtung-summe-lock" id="gewicht-summe-lock"
                                  onclick="if(typeof toggleSummeLock === 'function') toggleSummeLock();"
                                  title="Summe auf 100% fixieren">🔓</span>
                        </span>
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
     * Setzt den Wert einer Gewichtung (Input und Slider)
     * @param {string} factor - Faktor-Name
     * @param {number} value - Neuer Wert
     */
    function setValue(factor, value) {
        const input = document.getElementById(`gewicht-${factor}`);
        const slider = document.getElementById(`gewicht-slider-${factor}`);
        if (input) {
            input.value = value;
        }
        if (slider) {
            slider.value = value;
        }
    }

    /**
     * Handler für Slider-Input
     * @param {string} factor - Faktor-Name
     * @param {string|number} value - Neuer Wert vom Slider
     */
    function onSliderInput(factor, value) {
        const card = document.querySelector(`[data-factor="${factor}"]`);
        if (card && card.classList.contains('locked')) {
            // Wenn gesperrt, Slider zurücksetzen
            const input = document.getElementById(`gewicht-${factor}`);
            const slider = document.getElementById(`gewicht-slider-${factor}`);
            if (input && slider) {
                slider.value = input.value;
            }
            return;
        }

        const numValue = parseInt(value, 10) || 0;

        // Verwende normalizeGewichtungen aus app-main.js wenn verfügbar (für Summen-Lock)
        if (typeof window.normalizeGewichtungen === 'function') {
            window.normalizeGewichtungen(factor, numValue);
        } else {
            // Fallback ohne Normalisierung
            const input = document.getElementById(`gewicht-${factor}`);
            if (input) {
                input.value = value;
            }
            updateSum();
        }
    }

    /**
     * Handler für Text-Input-Änderungen
     * @param {string} factor - Faktor-Name
     * @param {string|number} value - Neuer Wert vom Input
     */
    function onInputChange(factor, value) {
        const card = document.querySelector(`[data-factor="${factor}"]`);
        if (card && card.classList.contains('locked')) {
            return;
        }

        const numValue = parseInt(value, 10) || 0;
        const clampedValue = Math.max(0, Math.min(100, numValue));

        // Verwende normalizeGewichtungen aus app-main.js wenn verfügbar (für Summen-Lock)
        if (typeof window.normalizeGewichtungen === 'function') {
            window.normalizeGewichtungen(factor, clampedValue);
        } else {
            // Fallback ohne Normalisierung
            const slider = document.getElementById(`gewicht-slider-${factor}`);
            if (slider) {
                slider.value = clampedValue;
            }
            updateSum();
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
        onSliderInput,
        onInputChange,
        DEFAULT_WEIGHTS
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GewichtungCard;
}
