/**
 * RESONANZ CARD COMPONENT
 *
 * Komponente für Resonanzfaktor-Karten (R1-R4) mit Slider, Lock-Status
 * und automatischer Speicherung.
 *
 * Resonanzfaktoren modulieren die Score-Berechnung:
 * - R1: Orientierung (Existenz, Zuneigung, Muße)
 * - R2: Archetyp (Freiheit, Teilnahme, Identität)
 * - R3: Dominanz (Dynamik, Sicherheit)
 * - R4: Geschlecht (Verständnis, Erschaffen, Verbundenheit)
 *
 * Range: 0.5 - 1.5 (0.5 = schwächt ab, 1.0 = neutral, 1.5 = verstärkt)
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const ResonanzCard = (function() {
    'use strict';

    /**
     * Storage Key für localStorage
     */
    const STORAGE_KEY = 'tiage_resonanz_faktoren';

    /**
     * Standard-Resonanzwerte (neutral)
     */
    const DEFAULT_VALUES = {
        R1: { value: 1.0, locked: false },
        R2: { value: 1.0, locked: false },
        R3: { value: 1.0, locked: false },
        R4: { value: 1.0, locked: false }
    };

    /**
     * Faktor-Beschreibungen
     */
    const FAKTOR_INFO = {
        R1: {
            label: 'Orientierung',
            beschreibung: 'Existenz, Zuneigung, Muße',
            color: '#E63946'
        },
        R2: {
            label: 'Archetyp',
            beschreibung: 'Freiheit, Teilnahme, Identität',
            color: '#2A9D8F'
        },
        R3: {
            label: 'Dominanz',
            beschreibung: 'Dynamik, Sicherheit',
            color: '#8B5CF6'
        },
        R4: {
            label: 'Geschlecht',
            beschreibung: 'Verständnis, Erschaffen, Verbundenheit',
            color: '#F4A261'
        }
    };

    /**
     * Lädt Resonanzwerte aus localStorage
     * @returns {Object} Resonanzwerte mit Lock-Status
     */
    function load() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Validiere und merge mit Defaults
                return {
                    R1: {
                        value: clampValue(parsed.R1?.value ?? DEFAULT_VALUES.R1.value),
                        locked: parsed.R1?.locked ?? false
                    },
                    R2: {
                        value: clampValue(parsed.R2?.value ?? DEFAULT_VALUES.R2.value),
                        locked: parsed.R2?.locked ?? false
                    },
                    R3: {
                        value: clampValue(parsed.R3?.value ?? DEFAULT_VALUES.R3.value),
                        locked: parsed.R3?.locked ?? false
                    },
                    R4: {
                        value: clampValue(parsed.R4?.value ?? DEFAULT_VALUES.R4.value),
                        locked: parsed.R4?.locked ?? false
                    }
                };
            }
        } catch (e) {
            console.warn('Fehler beim Laden der Resonanzfaktoren:', e);
        }
        return JSON.parse(JSON.stringify(DEFAULT_VALUES));
    }

    /**
     * Speichert Resonanzwerte in localStorage
     * @param {Object} values - Resonanzwerte
     */
    function save(values) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
        } catch (e) {
            console.warn('Fehler beim Speichern der Resonanzfaktoren:', e);
        }
    }

    /**
     * Begrenzt Wert auf gültigen Bereich (0.5-1.5)
     * @param {number} value - Eingabewert
     * @returns {number} Begrenzter Wert
     */
    function clampValue(value) {
        return Math.max(0.5, Math.min(1.5, parseFloat(value) || 1.0));
    }

    /**
     * Konvertiert Slider-Wert (50-150) zu Resonanzwert (0.5-1.5)
     * @param {number} sliderValue - Slider-Wert
     * @returns {number} Resonanzwert
     */
    function sliderToValue(sliderValue) {
        return parseInt(sliderValue, 10) / 100;
    }

    /**
     * Konvertiert Resonanzwert (0.5-1.5) zu Slider-Wert (50-150)
     * @param {number} value - Resonanzwert
     * @returns {number} Slider-Wert
     */
    function valueToSlider(value) {
        return Math.round(value * 100);
    }

    /**
     * Erstellt HTML für eine Resonanz-Card
     * @param {string} faktor - Faktor-Name (R1, R2, R3, R4)
     * @param {number} value - Aktueller Wert
     * @param {boolean} locked - Lock-Status
     * @returns {string} HTML-String
     */
    function renderCard(faktor, value, locked) {
        const info = FAKTOR_INFO[faktor];
        const sliderValue = valueToSlider(value);
        const displayValue = value.toFixed(2);
        const lockedClass = locked ? ' locked' : '';

        return `
            <div class="profile-review-card resonanz-card${lockedClass}" data-resonanz="${faktor}">
                <div class="resonanz-card-content">
                    <div class="resonanz-card-header">
                        <span class="resonanz-card-label">${info.label}</span>
                        <span class="resonanz-card-beschreibung">${info.beschreibung}</span>
                    </div>
                    <div class="resonanz-slider-row">
                        <span class="resonanz-range-label">0.5</span>
                        <input type="range" class="resonanz-slider" id="resonanz-slider-${faktor}"
                               min="50" max="150" value="${sliderValue}"
                               oninput="ResonanzCard.onSliderInput('${faktor}', this.value)"
                               onclick="event.stopPropagation()"
                               ${locked ? 'disabled' : ''}>
                        <span class="resonanz-range-label">1.5</span>
                    </div>
                    <div class="resonanz-card-input-group">
                        <input type="text" class="resonanz-input" id="resonanz-${faktor}"
                               value="${displayValue}" maxlength="4"
                               oninput="ResonanzCard.onInputChange('${faktor}', this.value)"
                               onclick="event.stopPropagation()"
                               ${locked ? 'readonly' : ''}>
                        <span class="resonanz-lock-indicator"
                              onclick="event.stopPropagation(); ResonanzCard.toggleLock('${faktor}');"
                              title="Klicken zum Sperren/Entsperren"></span>
                    </div>
                </div>
            </div>`;
    }

    /**
     * Erstellt alle Resonanz-Cards
     * @returns {string} HTML-String
     */
    function renderAll() {
        const values = load();
        return ['R1', 'R2', 'R3', 'R4']
            .map(f => renderCard(f, values[f].value, values[f].locked))
            .join('\n');
    }

    /**
     * Erstellt die Footer-Bar mit GFK-Info und Reset
     * @returns {string} HTML-String
     */
    function renderFooter() {
        const values = load();
        const gfk = ((values.R1.value + values.R2.value + values.R3.value + values.R4.value) / 4).toFixed(2);

        return `
            <div class="resonanz-footer-bar">
                <span class="resonanz-hint">GFK-Kompetenz: <span id="resonanz-gfk">${gfk}</span></span>
                <button class="profile-review-triple-btn" onclick="ResonanzCard.reset()" style="padding: 6px 12px; font-size: 11px;">
                    🔄 Standard
                </button>
            </div>`;
    }

    /**
     * Handler für Slider-Input
     * @param {string} faktor - Faktor-Name
     * @param {string|number} sliderValue - Neuer Slider-Wert
     */
    function onSliderInput(faktor, sliderValue) {
        const card = document.querySelector(`[data-resonanz="${faktor}"]`);
        if (card && card.classList.contains('locked')) {
            // Wenn gesperrt, Slider zurücksetzen
            const values = load();
            const slider = document.getElementById(`resonanz-slider-${faktor}`);
            if (slider) {
                slider.value = valueToSlider(values[faktor].value);
            }
            return;
        }

        const value = sliderToValue(sliderValue);
        updateValue(faktor, value);
    }

    /**
     * Handler für Text-Input-Änderungen
     * @param {string} faktor - Faktor-Name
     * @param {string|number} inputValue - Neuer Input-Wert
     */
    function onInputChange(faktor, inputValue) {
        const card = document.querySelector(`[data-resonanz="${faktor}"]`);
        if (card && card.classList.contains('locked')) {
            return;
        }

        const value = clampValue(parseFloat(inputValue) || 1.0);
        updateValue(faktor, value);
    }

    /**
     * Aktualisiert einen Resonanzwert
     * @param {string} faktor - Faktor-Name
     * @param {number} value - Neuer Wert
     */
    function updateValue(faktor, value) {
        const clampedValue = clampValue(value);

        // Update UI
        const input = document.getElementById(`resonanz-${faktor}`);
        const slider = document.getElementById(`resonanz-slider-${faktor}`);

        if (input) input.value = clampedValue.toFixed(2);
        if (slider) slider.value = valueToSlider(clampedValue);

        // Speichern
        const values = load();
        values[faktor].value = clampedValue;
        save(values);

        // GFK-Anzeige aktualisieren
        updateGfkDisplay();

        // Score neu berechnen wenn verfügbar
        if (typeof updateDisplay === 'function') {
            updateDisplay();
        }
    }

    /**
     * Aktualisiert die GFK-Anzeige
     */
    function updateGfkDisplay() {
        const values = load();
        const gfk = (values.R1.value + values.R2.value + values.R3.value + values.R4.value) / 4;
        const gfkEl = document.getElementById('resonanz-gfk');
        if (gfkEl) {
            gfkEl.textContent = gfk.toFixed(2);
        }
    }

    /**
     * Toggle Lock-Status eines Faktors
     * @param {string} faktor - Faktor-Name
     */
    function toggleLock(faktor) {
        const card = document.querySelector(`[data-resonanz="${faktor}"]`);
        const slider = document.getElementById(`resonanz-slider-${faktor}`);
        const input = document.getElementById(`resonanz-${faktor}`);

        if (!card) return;

        const isLocked = card.classList.toggle('locked');

        if (slider) slider.disabled = isLocked;
        if (input) input.readOnly = isLocked;

        // Speichern
        const values = load();
        values[faktor].locked = isLocked;
        save(values);
    }

    /**
     * Setzt alle Resonanzwerte auf Standard zurück
     */
    function reset() {
        const defaults = JSON.parse(JSON.stringify(DEFAULT_VALUES));
        save(defaults);

        // UI aktualisieren
        ['R1', 'R2', 'R3', 'R4'].forEach(faktor => {
            const card = document.querySelector(`[data-resonanz="${faktor}"]`);
            const input = document.getElementById(`resonanz-${faktor}`);
            const slider = document.getElementById(`resonanz-slider-${faktor}`);

            if (card) card.classList.remove('locked');
            if (input) {
                input.value = defaults[faktor].value.toFixed(2);
                input.readOnly = false;
            }
            if (slider) {
                slider.value = valueToSlider(defaults[faktor].value);
                slider.disabled = false;
            }
        });

        updateGfkDisplay();

        // Score neu berechnen
        if (typeof updateDisplay === 'function') {
            updateDisplay();
        }
    }

    /**
     * Holt nur die Resonanzwerte (für Berechnungen)
     * @returns {Object} { R1, R2, R3, R4 }
     */
    function getValues() {
        const stored = load();
        return {
            R1: stored.R1.value,
            R2: stored.R2.value,
            R3: stored.R3.value,
            R4: stored.R4.value
        };
    }

    /**
     * Initialisiert die UI mit gespeicherten Werten
     */
    function initializeUI() {
        const values = load();
        ['R1', 'R2', 'R3', 'R4'].forEach(faktor => {
            const card = document.querySelector(`[data-resonanz="${faktor}"]`);
            const input = document.getElementById(`resonanz-${faktor}`);
            const slider = document.getElementById(`resonanz-slider-${faktor}`);

            if (values[faktor].locked) {
                if (card) card.classList.add('locked');
                if (slider) slider.disabled = true;
                if (input) input.readOnly = true;
            }

            if (input) input.value = values[faktor].value.toFixed(2);
            if (slider) slider.value = valueToSlider(values[faktor].value);
        });
        updateGfkDisplay();
    }

    return {
        renderCard,
        renderAll,
        renderFooter,
        onSliderInput,
        onInputChange,
        toggleLock,
        reset,
        load,
        save,
        getValues,
        initializeUI,
        DEFAULT_VALUES,
        FAKTOR_INFO,
        STORAGE_KEY
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResonanzCard;
}
