/**
 * RESONANZ CARD COMPONENT
 *
 * Komponente für Resonanzfaktor-Karten (R1-R4) mit Slider, Lock-Status
 * und automatischer Speicherung.
 *
 * Resonanzfaktoren modulieren die Score-Berechnung:
 * - R1: Leben (Existenz, Zuneigung, Muße)
 * - R2: Philosophie (Freiheit, Teilnahme, Identität)
 * - R3: Kink (Dynamik, Sicherheit)
 * - R4: Identität (Verständnis, Erschaffen, Verbundenheit)
 *
 * Range: 0.5 - 1.5 (0.5 = schwächt ab, 1.0 = neutral, 1.5 = verstärkt)
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const ResonanzCard = (function() {
    'use strict';

    /**
     * Person-spezifische Storage Keys für localStorage
     */
    const STORAGE_KEY_ICH = 'tiage_resonanz_faktoren_ich';
    const STORAGE_KEY_PARTNER = 'tiage_resonanz_faktoren_partner';
    const STORAGE_KEY_LEGACY = 'tiage_resonanz_faktoren';

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
     * Ermittelt die aktuelle Person aus dem ProfileReview-Kontext
     * @returns {string} 'ich' oder 'partner'
     */
    function getCurrentPerson() {
        if (typeof currentProfileReviewContext !== 'undefined' && currentProfileReviewContext.person) {
            return currentProfileReviewContext.person;
        }
        return 'ich';
    }

    /**
     * Gibt den Storage-Key für eine Person zurück
     * @param {string} person - 'ich' oder 'partner'
     * @returns {string} Storage-Key
     */
    function getStorageKey(person) {
        return person === 'partner' ? STORAGE_KEY_PARTNER : STORAGE_KEY_ICH;
    }

    /**
     * Migration: Prüft ob alte globale Daten existieren und migriert sie
     */
    function migrateIfNeeded() {
        try {
            // Prüfe ob bereits person-spezifische Daten existieren
            const ichExists = localStorage.getItem(STORAGE_KEY_ICH);
            const partnerExists = localStorage.getItem(STORAGE_KEY_PARTNER);

            if (ichExists && partnerExists) {
                return; // Bereits migriert
            }

            // Lade alte globale Daten
            const legacyData = localStorage.getItem(STORAGE_KEY_LEGACY);
            if (!legacyData) {
                return; // Keine alten Daten vorhanden
            }

            const parsed = JSON.parse(legacyData);

            // Kopiere zu beiden Personen (falls noch nicht vorhanden)
            if (!ichExists) {
                localStorage.setItem(STORAGE_KEY_ICH, JSON.stringify(parsed));
                console.log('[TIAGE] Resonanzfaktoren für ICH migriert');
            }
            if (!partnerExists) {
                localStorage.setItem(STORAGE_KEY_PARTNER, JSON.stringify(parsed));
                console.log('[TIAGE] Resonanzfaktoren für PARTNER migriert');
            }

            // Entferne Legacy-Key
            localStorage.removeItem(STORAGE_KEY_LEGACY);
            console.log('[TIAGE] Legacy Resonanz-Key entfernt');
        } catch (e) {
            console.warn('Fehler bei der Resonanz-Migration:', e);
        }
    }

    // Führe Migration beim Laden aus
    migrateIfNeeded();

    /**
     * Faktor-Beschreibungen (v3.3: 18 Kategorien mit sekundärer Gewichtung)
     *
     * Die 18 GFK-Kategorien werden auf 4 Resonanzfaktoren aggregiert.
     * Sekundäre Kategorien fließen mit 30% Gewichtung ein.
     */
    const FAKTOR_INFO = {
        R1: {
            label: 'Leben',
            sourceLabel: 'Orientierung',
            beschreibung: 'Existenz, Zuneigung, Muße, Intimität & Romantik',
            kategorien: ['existenz', 'zuneigung', 'musse', 'intimitaet_romantik'],
            color: '#E63946'
        },
        R2: {
            label: 'Philosophie',
            sourceLabel: 'Archetyp',
            beschreibung: 'Freiheit, Teilnahme, Identität, Lebensplanung, Finanzen, Werte, Soziales, Praktisches',
            kategorien: ['freiheit', 'teilnahme', 'identitaet', 'lebensplanung', 'finanzen_karriere', 'werte_haltungen', 'soziales_leben', 'praktisches_leben'],
            color: '#2A9D8F'
        },
        R3: {
            label: 'Dynamik',
            sourceLabel: 'Dominanz',
            beschreibung: 'Dynamik, Sicherheit',
            kategorien: ['dynamik', 'sicherheit'],
            color: '#8B5CF6'
        },
        R4: {
            label: 'Identität',
            sourceLabel: 'Geschlecht',
            beschreibung: 'Verständnis, Erschaffen, Verbundenheit, Kommunikation',
            kategorien: ['verstaendnis', 'erschaffen', 'verbundenheit', 'kommunikation_stil'],
            color: '#F4A261'
        }
    };

    /**
     * Lädt Resonanzwerte aus TiageState (Single Source of Truth)
     * @param {string} person - 'ich' oder 'partner' (optional, default ist aktueller Kontext)
     * @returns {Object} Resonanzwerte mit Lock-Status
     */
    function load(person) {
        person = person || getCurrentPerson();

        // PHILOSOPHIE B: TiageState ist Single Source of Truth
        if (typeof TiageState !== 'undefined') {
            const fromState = TiageState.get(`resonanzFaktoren.${person}`);
            if (fromState && fromState.R1) {
                return {
                    R1: {
                        value: clampValue(fromState.R1?.value ?? DEFAULT_VALUES.R1.value),
                        locked: fromState.R1?.locked ?? false
                    },
                    R2: {
                        value: clampValue(fromState.R2?.value ?? DEFAULT_VALUES.R2.value),
                        locked: fromState.R2?.locked ?? false
                    },
                    R3: {
                        value: clampValue(fromState.R3?.value ?? DEFAULT_VALUES.R3.value),
                        locked: fromState.R3?.locked ?? false
                    },
                    R4: {
                        value: clampValue(fromState.R4?.value ?? DEFAULT_VALUES.R4.value),
                        locked: fromState.R4?.locked ?? false
                    }
                };
            }
        }

        // Fallback: Legacy localStorage (für Migration)
        const storageKey = getStorageKey(person);
        try {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                const result = {
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
                // Migriere zu TiageState
                if (typeof TiageState !== 'undefined') {
                    TiageState.set(`resonanzFaktoren.${person}`, result);
                    console.log(`[ResonanzCard] Migriert zu TiageState: ${person}`);
                }
                return result;
            }
        } catch (e) {
            console.warn('Fehler beim Laden der Resonanzfaktoren:', e);
        }
        return JSON.parse(JSON.stringify(DEFAULT_VALUES));
    }

    /**
     * Speichert Resonanzwerte in TiageState (Single Source of Truth)
     * @param {Object} values - Resonanzwerte
     * @param {string} person - 'ich' oder 'partner' (optional, default ist aktueller Kontext)
     */
    function save(values, person) {
        person = person || getCurrentPerson();

        try {
            // PHILOSOPHIE B: TiageState ist Single Source of Truth
            if (typeof TiageState !== 'undefined') {
                TiageState.set(`resonanzFaktoren.${person}`, values);
            }
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
     * Erstellt HTML für eine Resonanz-Card (kompakte Anzeige)
     * @param {string} faktor - Faktor-Name (R1, R2, R3, R4)
     * @param {number} value - Aktueller Wert
     * @param {boolean} locked - Lock-Status
     * @returns {string} HTML-String (nur für Wert-Anzeige)
     */
    function renderCard(faktor, value, locked) {
        const info = FAKTOR_INFO[faktor];
        const displayValue = value.toFixed(2);
        const lockedClass = locked ? ' locked' : '';

        return `
            <div class="resonanz-value-item${lockedClass}" data-resonanz="${faktor}">
                <div class="resonanz-value-label">${faktor}</div>
                <div class="resonanz-value-display" id="resonanz-${faktor}">${displayValue}</div>
            </div>`;
    }

    /**
     * Erstellt alle Resonanz-Cards (kompakte Anzeige als Zeile)
     * @returns {string} HTML-String
     */
    function renderAll() {
        const values = load();
        const cardsHtml = ['R1', 'R2', 'R3', 'R4']
            .map(f => renderCard(f, values[f].value, values[f].locked))
            .join('\n');

        return `
            <div class="profile-review-card resonanz-card-compact">
                <div class="resonanz-values-row">
                    ${cardsHtml}
                </div>
            </div>`;
    }

    /**
     * Erstellt die Footer-Bar mit GFK-Info und Reset
     * @returns {string} HTML-String
     */
    function renderFooter() {
        const values = load();
        const gfk = ((values.R1.value + values.R2.value + values.R3.value + values.R4.value) / 4).toFixed(2);

        const person = getCurrentPerson();
        const personLabel = person === 'partner' ? '👤 Partner' : '👤 Ich';

        return `
            <div class="resonanz-footer-bar">
                <span class="resonanz-hint">GFK-Kompetenz: <span id="resonanz-gfk">${gfk}</span> | ${personLabel}</span>
                <div style="display: flex; gap: 8px;">
                    <button class="profile-review-triple-btn" onclick="openResonanzHelpModal()" style="padding: 6px 12px; font-size: 11px;" title="Wie werden R-Faktoren berechnet?">
                        ℹ Hilfe
                    </button>
                    <button class="profile-review-triple-btn" onclick="ResonanzCard.reset()" style="padding: 6px 12px; font-size: 11px;">
                        🔄 Standard
                    </button>
                </div>
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

        // Alle Listener benachrichtigen (feuert Event + updateDisplay)
        notifyChange(getCurrentPerson(), 'slider');
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
     * Benachrichtigt alle Listener über Änderungen an den Resonanzfaktoren
     * Feuert ein Custom Event und ruft updateDisplay() auf
     * @param {string} person - 'ich' oder 'partner'
     * @param {string} source - Quelle der Änderung (z.B. 'slider', 'calculated', 'reset')
     */
    function notifyChange(person, source) {
        person = person || getCurrentPerson();
        const values = getValues(person);

        // Custom Event für andere Komponenten
        const event = new CustomEvent('resonanzfaktoren-changed', {
            detail: {
                person: person,
                values: values,
                source: source || 'unknown'
            }
        });
        window.dispatchEvent(event);

        // Score neu berechnen wenn verfügbar
        if (typeof updateDisplay === 'function') {
            updateDisplay();
        }

        console.log('[ResonanzCard] Änderung notifiziert für', person, '- Quelle:', source);
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
     * Setzt alle Resonanzwerte auf berechnete Durchschnitte zurück
     * Verwendet zentrale getPersonNeeds() für korrekte Person-spezifische Datenquellen
     */
    function reset() {
        const person = getCurrentPerson();
        let calculatedValues = null;

        // Hole aktuellen Archetyp aus globalen Variablen
        let archetypeKey = 'duo';
        if (typeof window !== 'undefined') {
            if (person === 'ich' && typeof currentArchetype !== 'undefined') {
                archetypeKey = currentArchetype;
            } else if (person === 'partner' && typeof selectedPartner !== 'undefined') {
                archetypeKey = selectedPartner;
            }
        }

        // ═══════════════════════════════════════════════════════════════════
        // ZENTRALE HELPER-FUNKTION für korrekte Person-spezifische Needs
        // ═══════════════════════════════════════════════════════════════════
        const needs = getPersonNeeds(person, archetypeKey);

        // Hole aktuelle Dimensions-Daten
        let dominanz = null, orientierung = null, geschlecht = null;
        if (typeof personDimensions !== 'undefined' && personDimensions[person]) {
            dominanz = personDimensions[person].dominanz;
            orientierung = personDimensions[person].orientierung;
            geschlecht = personDimensions[person].geschlecht;
        }

        // Baue Profil-Kontext für Berechnung
        const profileContext = {
            archetyp: archetypeKey,
            needs: needs,
            dominanz: dominanz,
            orientierung: orientierung,
            geschlecht: geschlecht
        };

        calculatedValues = calculateFromProfile(profileContext);
        if (calculatedValues) {
            console.log('[ResonanzCard] Reset: Neu berechnete Werte für', person, 'mit Archetyp', archetypeKey + ':', calculatedValues);
        }

        // Fallback auf DEFAULT_VALUES wenn keine Berechnung möglich
        const values = calculatedValues
            ? {
                R1: { value: clampValue(calculatedValues.R1), locked: false },
                R2: { value: clampValue(calculatedValues.R2), locked: false },
                R3: { value: clampValue(calculatedValues.R3), locked: false },
                R4: { value: clampValue(calculatedValues.R4), locked: false }
            }
            : JSON.parse(JSON.stringify(DEFAULT_VALUES));

        save(values);

        // UI aktualisieren
        ['R1', 'R2', 'R3', 'R4'].forEach(faktor => {
            const card = document.querySelector(`[data-resonanz="${faktor}"]`);
            const input = document.getElementById(`resonanz-${faktor}`);
            const slider = document.getElementById(`resonanz-slider-${faktor}`);

            if (card) card.classList.remove('locked');
            if (input) {
                input.value = values[faktor].value.toFixed(2);
                input.readOnly = false;
            }
            if (slider) {
                slider.value = valueToSlider(values[faktor].value);
                slider.disabled = false;
            }
        });

        updateGfkDisplay();

        // Alle Listener benachrichtigen
        notifyChange(person, 'reset');
    }

    /**
     * Holt nur die Resonanzwerte (für Berechnungen)
     * @param {string} person - 'ich' oder 'partner' (optional, default ist aktueller Kontext)
     * @returns {Object} { R1, R2, R3, R4 }
     */
    function getValues(person) {
        const stored = load(person);
        return {
            R1: stored.R1.value,
            R2: stored.R2.value,
            R3: stored.R3.value,
            R4: stored.R4.value
        };
    }

    /**
     * Initialisiert die UI mit gespeicherten Werten für die aktuelle Person
     * @param {string} person - 'ich' oder 'partner' (optional, default: getCurrentPerson())
     */
    function initializeUI(person) {
        person = person || getCurrentPerson();
        const values = load(person);
        ['R1', 'R2', 'R3', 'R4'].forEach(faktor => {
            const card = document.querySelector(`[data-resonanz="${faktor}"]`);
            const input = document.getElementById(`resonanz-${faktor}`);
            const slider = document.getElementById(`resonanz-slider-${faktor}`);

            // Zuerst alles zurücksetzen
            if (card) card.classList.remove('locked');
            if (slider) slider.disabled = false;
            if (input) input.readOnly = false;

            // Dann Lock-Status für aktuelle Person anwenden
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

    /**
     * Setzt berechnete Resonanzwerte (aus Synthese-Berechnung)
     * Überschreibt nur nicht-gelockte Werte.
     *
     * @param {Object} calculatedValues - { R1: number, R2: number, R3: number, R4: number }
     *                                    Werte im Bereich 0.5-1.5 (oder 0.9-1.1 aus Synthese)
     * @param {boolean} forceOverwrite - Wenn true, überschreibt auch gelockte Werte
     * @param {string} person - 'ich' oder 'partner' (optional, default: getCurrentPerson())
     */
    function setCalculatedValues(calculatedValues, forceOverwrite, person) {
        if (!calculatedValues) {
            console.warn('[ResonanzCard] Keine berechneten Werte übergeben');
            return;
        }

        person = person || getCurrentPerson();
        const currentValues = load(person);
        let hasChanges = false;
        const lockedDifferences = {}; // Speichere Unterschiede bei gesperrten Werten

        ['R1', 'R2', 'R3', 'R4'].forEach(faktor => {
            const newValue = calculatedValues[faktor];

            // Nur setzen wenn:
            // 1. Wert vorhanden ist
            // 2. Nicht gelockt ODER forceOverwrite
            if (newValue !== undefined && newValue !== null) {
                // Prüfe ob gesperrt und Wert unterschiedlich ist
                if (currentValues[faktor].locked && !forceOverwrite) {
                    const diff = Math.abs(newValue - currentValues[faktor].value);
                    if (diff > 0.01) { // Nur signifikante Unterschiede
                        lockedDifferences[faktor] = {
                            locked: currentValues[faktor].value,
                            calculated: newValue,
                            difference: newValue - currentValues[faktor].value
                        };
                    }
                }

                if (!currentValues[faktor].locked || forceOverwrite) {
                    const clampedValue = clampValue(newValue);
                    currentValues[faktor].value = clampedValue;
                    hasChanges = true;

                    // UI aktualisieren (nur wenn aktuelle Person angezeigt wird)
                    if (person === getCurrentPerson()) {
                        const input = document.getElementById(`resonanz-${faktor}`);
                        const slider = document.getElementById(`resonanz-slider-${faktor}`);

                        if (input) input.value = clampedValue.toFixed(2);
                        if (slider) slider.value = valueToSlider(clampedValue);
                    }
                }
            }
        });

        // Zeige Warnung wenn gesperrte Werte von berechneten Werten abweichen
        if (Object.keys(lockedDifferences).length > 0 && person === getCurrentPerson()) {
            showLockedDifferenceWarning(lockedDifferences);
        }

        if (hasChanges) {
            save(currentValues, person);
            if (person === getCurrentPerson()) {
                updateGfkDisplay();
            }
            // Alle Listener benachrichtigen
            notifyChange(person, 'calculated');
        }
    }

    /**
     * Zeigt eine Warnung an, wenn gesperrte Werte von berechneten Werten abweichen
     * und berechnet die Score-Auswirkung
     *
     * @param {Object} lockedDifferences - { faktor: { locked, calculated, difference } }
     */
    function showLockedDifferenceWarning(lockedDifferences) {
        // Entferne alte Warnungen
        const existingWarning = document.querySelector('.resonanz-locked-warning');
        if (existingWarning) {
            existingWarning.remove();
        }

        // Erstelle Warnung
        const warningDiv = document.createElement('div');
        warningDiv.className = 'resonanz-locked-warning';
        warningDiv.style.cssText = `
            background: linear-gradient(135deg, #fff3cd 0%, #fcf8e3 100%);
            border: 2px solid #ff9800;
            border-radius: 12px;
            padding: 16px;
            margin: 16px 0;
            box-shadow: 0 4px 12px rgba(255, 152, 0, 0.2);
        `;

        let warningHTML = `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <span style="font-size: 24px;">⚠️</span>
                <div>
                    <strong style="color: #e65100; font-size: 16px;">Gesperrte Werte weichen von Berechnung ab</strong>
                    <p style="margin: 4px 0 0 0; color: #f57c00; font-size: 13px;">
                        Die gesperrten Werte unterscheiden sich von den berechneten Werten. Dies beeinflusst Ihr Endergebnis.
                    </p>
                </div>
            </div>
            <div style="background: white; border-radius: 8px; padding: 12px; margin-top: 12px;">
        `;

        // Zeige Details für jeden gesperrten Faktor
        for (const [faktor, diff] of Object.entries(lockedDifferences)) {
            const info = FAKTOR_INFO[faktor];
            const percentChange = ((diff.difference / diff.locked) * 100).toFixed(1);
            const arrow = diff.difference > 0 ? '↑' : '↓';
            const colorClass = diff.difference > 0 ? '#4caf50' : '#f44336';

            warningHTML += `
                <div style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #e0e0e0;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <strong style="color: ${info.color};">${info.label} (${faktor})</strong>
                        <button onclick="ResonanzCard.unlockAndApply('${faktor}')"
                                style="background: #2196f3; color: white; border: none; padding: 4px 12px;
                                       border-radius: 6px; cursor: pointer; font-size: 11px; font-weight: bold;">
                            🔓 Entsperren & Übernehmen
                        </button>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-top: 8px; font-size: 13px;">
                        <div>
                            <div style="color: #666; font-size: 11px;">🔒 Gesperrt:</div>
                            <strong>${diff.locked.toFixed(3)}</strong>
                        </div>
                        <div>
                            <div style="color: #666; font-size: 11px;">📊 Berechnet:</div>
                            <strong style="color: ${colorClass};">${diff.calculated.toFixed(3)}</strong>
                        </div>
                        <div>
                            <div style="color: #666; font-size: 11px;">Δ Unterschied:</div>
                            <strong style="color: ${colorClass};">
                                ${arrow} ${Math.abs(diff.difference).toFixed(3)} (${percentChange}%)
                            </strong>
                        </div>
                    </div>
                </div>
            `;
        }

        warningHTML += `
            </div>
            <div style="margin-top: 12px; display: flex; gap: 8px; justify-content: flex-end;">
                <button onclick="ResonanzCard.compareScores()"
                        style="background: #673ab7; color: white; border: none; padding: 8px 16px;
                               border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 13px;">
                    📊 Score-Vergleich anzeigen
                </button>
                <button onclick="ResonanzCard.unlockAllAndApply()"
                        style="background: #4caf50; color: white; border: none; padding: 8px 16px;
                               border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 13px;">
                    🔓 Alle entsperren & übernehmen
                </button>
            </div>
        `;

        warningDiv.innerHTML = warningHTML;

        // Füge Warnung nach dem ersten Resonanz-Card ein
        const firstCard = document.querySelector('.resonanz-card');
        if (firstCard && firstCard.parentNode) {
            firstCard.parentNode.insertBefore(warningDiv, firstCard);
        }
    }

    /**
     * Entsperrt einen einzelnen Faktor und übernimmt den berechneten Wert
     * @param {string} faktor - Faktor-Name (R1, R2, R3, R4)
     */
    function unlockAndApply(faktor) {
        const person = getCurrentPerson();

        // Berechne Werte neu
        const archetypeKey = person === 'ich'
            ? (typeof currentArchetype !== 'undefined' ? currentArchetype : 'duo')
            : (typeof selectedPartner !== 'undefined' ? selectedPartner : 'duo');

        const needs = getPersonNeeds(person, archetypeKey);
        let dominanz = null, orientierung = null, geschlecht = null;
        if (typeof personDimensions !== 'undefined' && personDimensions[person]) {
            dominanz = personDimensions[person].dominanz;
            orientierung = personDimensions[person].orientierung;
            geschlecht = personDimensions[person].geschlecht;
        }

        const profileContext = {
            archetyp: archetypeKey,
            needs: needs,
            dominanz: dominanz,
            orientierung: orientierung,
            geschlecht: geschlecht
        };

        const calculatedValues = calculateFromProfile(profileContext);
        if (!calculatedValues || !calculatedValues[faktor]) {
            console.warn('[ResonanzCard] Keine berechneten Werte verfügbar für', faktor);
            return;
        }

        // Entsperre und übernimme Wert
        const values = load(person);
        values[faktor].locked = false;
        values[faktor].value = clampValue(calculatedValues[faktor]);
        save(values, person);

        // UI aktualisieren
        const card = document.querySelector(`[data-resonanz="${faktor}"]`);
        const input = document.getElementById(`resonanz-${faktor}`);
        const slider = document.getElementById(`resonanz-slider-${faktor}`);

        if (card) card.classList.remove('locked');
        if (input) {
            input.value = values[faktor].value.toFixed(2);
            input.readOnly = false;
        }
        if (slider) {
            slider.value = valueToSlider(values[faktor].value);
            slider.disabled = false;
        }

        updateGfkDisplay();
        notifyChange(person, 'unlocked');

        // Entferne Warnung wenn keine gesperrten Unterschiede mehr
        setTimeout(() => {
            const warning = document.querySelector('.resonanz-locked-warning');
            if (warning) warning.remove();
        }, 500);
    }

    /**
     * Entsperrt alle Faktoren und übernimmt die berechneten Werte
     */
    function unlockAllAndApply() {
        ['R1', 'R2', 'R3', 'R4'].forEach(faktor => {
            unlockAndApply(faktor);
        });
    }

    /**
     * Zeigt einen detaillierten Vergleich zwischen gesperrten und ungesperrten Scores
     */
    function compareScores() {
        const person = getCurrentPerson();
        const currentValues = load(person);

        // Berechne Werte
        const archetypeKey = person === 'ich'
            ? (typeof currentArchetype !== 'undefined' ? currentArchetype : 'duo')
            : (typeof selectedPartner !== 'undefined' ? selectedPartner : 'duo');

        const needs = getPersonNeeds(person, archetypeKey);
        let dominanz = null, orientierung = null, geschlecht = null;
        if (typeof personDimensions !== 'undefined' && personDimensions[person]) {
            dominanz = personDimensions[person].dominanz;
            orientierung = personDimensions[person].orientierung;
            geschlecht = personDimensions[person].geschlecht;
        }

        const profileContext = {
            archetyp: archetypeKey,
            needs: needs,
            dominanz: dominanz,
            orientierung: orientierung,
            geschlecht: geschlecht
        };

        const calculatedValues = calculateFromProfile(profileContext);
        if (!calculatedValues) {
            alert('Konnte berechnete Werte nicht ermitteln.');
            return;
        }

        // Erstelle Vergleichs-Modal
        showScoreComparisonModal(currentValues, calculatedValues, person);
    }

    /**
     * Zeigt ein detailliertes Modal mit Score-Vergleich
     * @param {Object} currentValues - Aktuelle (gesperrte) Werte
     * @param {Object} calculatedValues - Berechnete (ungesperrte) Werte
     * @param {string} person - Person ('ich' oder 'partner')
     */
    function showScoreComparisonModal(currentValues, calculatedValues, person) {
        // Erstelle Overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.75);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            backdrop-filter: blur(4px);
        `;

        // Erstelle Modal
        const modal = document.createElement('div');
        modal.style.cssText = `
            background: white;
            border-radius: 16px;
            padding: 24px;
            max-width: 900px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        `;

        // Berechne R-Werte für beide Szenarien
        const lockedR = {
            R1: currentValues.R1.value,
            R2: currentValues.R2.value,
            R3: currentValues.R3.value,
            R4: currentValues.R4.value
        };

        const unlockedR = {
            R1: calculatedValues.R1 || currentValues.R1.value,
            R2: calculatedValues.R2 || currentValues.R2.value,
            R3: calculatedValues.R3 || currentValues.R3.value,
            R4: calculatedValues.R4 || currentValues.R4.value
        };

        // Erstelle Vergleichstabelle
        let modalHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 style="margin: 0; color: #1a237e;">📊 Score-Vergleich: Gesperrt vs. Ungesperrt</h2>
                <button onclick="this.closest('div').parentElement.parentElement.remove()"
                        style="background: #f44336; color: white; border: none; padding: 8px 16px;
                               border-radius: 8px; cursor: pointer; font-weight: bold;">
                    ✕ Schließen
                </button>
            </div>

            <div style="background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%); padding: 16px; border-radius: 12px; margin-bottom: 20px;">
                <p style="margin: 0; color: #1565c0; font-weight: bold;">
                    ⚠️ Diese Analyse zeigt, wie sich gesperrte R-Werte auf Ihr Endergebnis auswirken
                </p>
            </div>

            <h3 style="color: #1a237e; margin: 20px 0 12px 0;">🔢 R-Werte Vergleich</h3>
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                    <thead>
                        <tr style="background: linear-gradient(135deg, #5e35b1 0%, #7e57c2 100%); color: white;">
                            <th style="padding: 12px; text-align: left; border-radius: 8px 0 0 0;">Faktor</th>
                            <th style="padding: 12px; text-align: center;">🔒 Gesperrt</th>
                            <th style="padding: 12px; text-align: center;">🔓 Berechnet</th>
                            <th style="padding: 12px; text-align: center;">Δ Unterschied</th>
                            <th style="padding: 12px; text-align: center; border-radius: 0 8px 0 0;">% Änderung</th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        ['R1', 'R2', 'R3', 'R4'].forEach((faktor, index) => {
            const info = FAKTOR_INFO[faktor];
            const locked = lockedR[faktor];
            const unlocked = unlockedR[faktor];
            const diff = unlocked - locked;
            const percentChange = ((diff / locked) * 100).toFixed(1);
            const isLocked = currentValues[faktor].locked;
            const rowBg = index % 2 === 0 ? '#f5f5f5' : 'white';
            const highlightBg = isLocked && Math.abs(diff) > 0.01 ? '#fff3e0' : rowBg;
            const diffColor = diff > 0 ? '#4caf50' : (diff < 0 ? '#f44336' : '#666');

            modalHTML += `
                <tr style="background: ${highlightBg};">
                    <td style="padding: 12px; font-weight: bold; color: ${info.color};">
                        ${isLocked ? '🔒 ' : ''}${info.label} (${faktor})
                    </td>
                    <td style="padding: 12px; text-align: center; font-weight: bold;">
                        ${locked.toFixed(3)}
                    </td>
                    <td style="padding: 12px; text-align: center; font-weight: bold; color: ${diffColor};">
                        ${unlocked.toFixed(3)}
                    </td>
                    <td style="padding: 12px; text-align: center; font-weight: bold; color: ${diffColor};">
                        ${diff > 0 ? '+' : ''}${diff.toFixed(3)}
                    </td>
                    <td style="padding: 12px; text-align: center; font-weight: bold; color: ${diffColor};">
                        ${percentChange > 0 ? '+' : ''}${percentChange}%
                    </td>
                </tr>
            `;
        });

        modalHTML += `
                    </tbody>
                </table>
            </div>

            <h3 style="color: #1a237e; margin: 24px 0 12px 0;">📈 Score-Auswirkung (Beispiel)</h3>
            <div style="background: #f5f5f5; padding: 16px; border-radius: 12px; margin-bottom: 16px;">
                <p style="margin: 0 0 12px 0; color: #666; font-size: 13px;">
                    <strong>Annahme:</strong> Archetyp-Score = 80, Gewicht = 0.25 (typische Werte)
                </p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
        `;

        // Beispiel-Berechnung für R2 (Philosophie)
        const exampleArchetypScore = 80;
        const exampleWeight = 0.25;

        const lockedScore = Math.round(exampleArchetypScore * exampleWeight * lockedR.R2);
        const unlockedScore = Math.round(exampleArchetypScore * exampleWeight * unlockedR.R2);
        const scoreDiff = unlockedScore - lockedScore;

        modalHTML += `
                    <div style="background: white; padding: 16px; border-radius: 8px; border: 2px solid #f44336;">
                        <div style="font-size: 12px; color: #666; margin-bottom: 8px;">🔒 Mit gesperrtem R2 (${lockedR.R2.toFixed(3)})</div>
                        <div style="font-size: 28px; font-weight: bold; color: #f44336;">
                            ${lockedScore} Punkte
                        </div>
                        <div style="font-size: 11px; color: #999; margin-top: 4px;">
                            ${exampleArchetypScore} × ${exampleWeight} × ${lockedR.R2.toFixed(3)}
                        </div>
                    </div>
                    <div style="background: white; padding: 16px; border-radius: 8px; border: 2px solid #4caf50;">
                        <div style="font-size: 12px; color: #666; margin-bottom: 8px;">🔓 Mit berechnetem R2 (${unlockedR.R2.toFixed(3)})</div>
                        <div style="font-size: 28px; font-weight: bold; color: #4caf50;">
                            ${unlockedScore} Punkte
                        </div>
                        <div style="font-size: 11px; color: #999; margin-top: 4px;">
                            ${exampleArchetypScore} × ${exampleWeight} × ${unlockedR.R2.toFixed(3)}
                        </div>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 16px; padding: 12px; background: ${scoreDiff > 0 ? '#e8f5e9' : '#ffebee'}; border-radius: 8px;">
                    <strong style="font-size: 18px; color: ${scoreDiff > 0 ? '#4caf50' : '#f44336'};">
                        Unterschied: ${scoreDiff > 0 ? '+' : ''}${scoreDiff} Punkte
                    </strong>
                    <div style="font-size: 13px; color: #666; margin-top: 8px;">
                        Das sind ${Math.abs(((scoreDiff / exampleArchetypScore) * 100)).toFixed(0)}% vom Archetyp-Score (${Math.abs(scoreDiff)} von ${exampleArchetypScore} Punkten)
                    </div>
                </div>
            </div>

            <h3 style="color: #1a237e; margin: 24px 0 12px 0;">💡 Interpretation</h3>
            <div style="background: linear-gradient(135deg, #fff3e0 0%, #ffe0b2 100%); padding: 16px; border-radius: 12px; margin-bottom: 20px;">
        `;

        // Interpretation basierend auf R2-Wert
        const r2Diff = unlockedR.R2 - lockedR.R2;
        if (r2Diff > 0.5) {
            modalHTML += `
                <p style="margin: 0 0 8px 0; font-weight: bold; color: #e65100;">
                    ⚠️ Stark reduzierter Score durch Sperrung
                </p>
                <p style="margin: 0; color: #f57c00; font-size: 14px;">
                    Ihr gesperrter R2-Wert (${lockedR.R2.toFixed(3)}) liegt <strong>signifikant unter</strong> dem berechneten Wert (${unlockedR.R2.toFixed(3)}).
                    Dies bedeutet, dass Ihre tatsächliche Philosophie-Kohärenz von <strong>${((unlockedR.R2 - 0.5) * 100).toFixed(0)}%</strong> auf nur
                    <strong>${((lockedR.R2 - 0.5) * 100).toFixed(0)}%</strong> reduziert wird.
                </p>
            `;
        } else if (r2Diff < -0.5) {
            modalHTML += `
                <p style="margin: 0 0 8px 0; font-weight: bold; color: #2e7d32;">
                    ⚠️ Künstlich erhöhter Score durch Sperrung
                </p>
                <p style="margin: 0; color: #388e3c; font-size: 14px;">
                    Ihr gesperrter R2-Wert (${lockedR.R2.toFixed(3)}) liegt <strong>deutlich über</strong> dem berechneten Wert (${unlockedR.R2.toFixed(3)}).
                    Der Score wird dadurch künstlich erhöht und spiegelt nicht Ihre tatsächliche Kohärenz wider.
                </p>
            `;
        } else {
            modalHTML += `
                <p style="margin: 0 0 8px 0; font-weight: bold; color: #1976d2;">
                    ✓ Geringe Abweichung
                </p>
                <p style="margin: 0; color: #0288d1; font-size: 14px;">
                    Die Sperrung hat nur minimale Auswirkungen auf Ihr Ergebnis (Differenz: ${Math.abs(r2Diff).toFixed(3)}).
                </p>
            `;
        }

        modalHTML += `
            </div>

            <div style="display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;">
                <button onclick="this.closest('div').parentElement.parentElement.remove()"
                        style="background: #9e9e9e; color: white; border: none; padding: 10px 20px;
                               border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 14px;">
                    Schließen
                </button>
                <button onclick="ResonanzCard.unlockAllAndApply(); this.closest('div').parentElement.parentElement.remove();"
                        style="background: #4caf50; color: white; border: none; padding: 10px 20px;
                               border-radius: 8px; cursor: pointer; font-weight: bold; font-size: 14px;">
                    🔓 Alle entsperren & berechnete Werte übernehmen
                </button>
            </div>
        `;

        modal.innerHTML = modalHTML;
        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Schließen bei Klick auf Overlay
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        });
    }

    /**
     * Berechnet die Resonanzwerte basierend auf Profil-Kontext
     * Nutzt NeedsIntegration.calculateDimensionalResonance wenn verfügbar
     *
     * @param {Object} profileContext - { archetyp, needs, dominanz, orientierung, geschlecht }
     * @returns {Object|null} { R1, R2, R3, R4 } oder null bei Fehler
     */
    function calculateFromProfile(profileContext) {
        // Prüfe ob NeedsIntegration verfügbar ist
        if (typeof TiageSynthesis === 'undefined' ||
            typeof TiageSynthesis.NeedsIntegration === 'undefined') {
            console.warn('[ResonanzCard] TiageSynthesis.NeedsIntegration nicht verfügbar');
            return null;
        }

        if (!profileContext || !profileContext.archetyp) {
            console.warn('[ResonanzCard] Kein gültiger Profil-Kontext');
            return null;
        }

        // Berechne dimensionale Resonanzen
        const resonanz = TiageSynthesis.NeedsIntegration.calculateDimensionalResonance(profileContext);

        if (!resonanz || !resonanz.enabled) {
            console.warn('[ResonanzCard] Resonanz-Berechnung nicht aktiviert oder fehlgeschlagen');
            return null;
        }

        // Mapping von Dimensions-Namen zu R-Faktoren:
        // R1 = Orientierung → leben
        // R2 = Archetyp → philosophie (aus Archetyp-Bedürfnissen)
        // R3 = Dominanz → dynamik
        // R4 = Geschlecht → identitaet
        const result = {
            R1: resonanz.leben || 1.0,
            R2: resonanz.philosophie || 1.0,
            R3: resonanz.dynamik || 1.0,
            R4: resonanz.identitaet || 1.0
        };

        console.log('[ResonanzCard] Berechnete Resonanz aus Profil:', result);
        return result;
    }

    /**
     * Lädt berechnete Werte und aktualisiert UI
     * Kombiniert calculateFromProfile und setCalculatedValues
     *
     * @param {Object} profileContext - Profil-Kontext für Berechnung
     * @param {string} person - 'ich' oder 'partner' (optional, default: getCurrentPerson())
     * @returns {boolean} true wenn erfolgreich
     */
    function loadCalculatedValues(profileContext, person) {
        const calculated = calculateFromProfile(profileContext);
        if (calculated) {
            setCalculatedValues(calculated, false, person);
            return true;
        }
        return false;
    }

    /**
     * Prüft ob bereits Resonanzwerte in localStorage gespeichert sind
     * @param {string} person - 'ich' oder 'partner' (optional, default: getCurrentPerson())
     * @returns {boolean} true wenn gespeicherte Werte existieren
     */
    function hasStoredValues(person) {
        person = person || getCurrentPerson();
        const storageKey = getStorageKey(person);
        try {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Prüfe ob mindestens ein Wert existiert und nicht der Default ist
                return parsed && (
                    parsed.R1?.value !== undefined ||
                    parsed.R2?.value !== undefined ||
                    parsed.R3?.value !== undefined ||
                    parsed.R4?.value !== undefined
                );
            }
        } catch (e) {
            console.warn('Fehler beim Prüfen gespeicherter Resonanzfaktoren:', e);
        }
        return false;
    }

    /**
     * ZENTRALE HELPER-FUNKTION: Lädt Bedürfnisse für eine spezifische Person
     *
     * Einheitliche Datenquelle für ICH und PARTNER:
     * LoadedArchetypProfile[person] → Archetyp-Standard
     *
     * @param {string} person - 'ich' oder 'partner'
     * @param {string} archetypKey - Der Archetyp-Schlüssel (z.B. 'duo', 'polyamor')
     * @returns {Object|null} Normalisierte Needs { needKey: value } oder null
     */
    function getPersonNeeds(person, archetypKey) {
        person = person || getCurrentPerson();

        // ═══════════════════════════════════════════════════════════════════
        // EINHEITLICH: LoadedArchetypProfile für BEIDE Personen
        // ═══════════════════════════════════════════════════════════════════
        const flatNeeds = window.LoadedArchetypProfile?.[person]?.profileReview?.flatNeeds;
        if (flatNeeds) {
            const needs = _normalizeNeeds(flatNeeds);
            if (needs && Object.keys(needs).length > 0) {
                console.log('[ResonanzCard.getPersonNeeds] Needs aus LoadedArchetypProfile für', person);
                return needs;
            }
        }

        // ═══════════════════════════════════════════════════════════════════
        // FALLBACK: Standard-Werte des Archetyps
        // ═══════════════════════════════════════════════════════════════════
        if (archetypKey && typeof GfkBeduerfnisse !== 'undefined' &&
            GfkBeduerfnisse.archetypProfile?.[archetypKey]) {
            const needs = GfkBeduerfnisse.archetypProfile[archetypKey].kernbeduerfnisse || {};
            if (Object.keys(needs).length > 0) {
                console.log('[ResonanzCard.getPersonNeeds] Fallback: Archetyp-Standard für', archetypKey);
                return needs;
            }
        }

        console.warn('[ResonanzCard.getPersonNeeds] Keine Needs gefunden für', person, archetypKey);
        return null;
    }

    /**
     * Normalisiert verschiedene Needs-Formate zu { needKey: value }
     *
     * Unterstützt:
     * - Array: [{ id, stringKey, value }, ...]
     * - Objekt mit value: { needKey: { value: 50 }, ... }
     * - Objekt direkt: { needKey: 50, ... }
     *
     * @private
     */
    function _normalizeNeeds(rawNeeds) {
        if (!rawNeeds) return null;

        const normalized = {};

        if (Array.isArray(rawNeeds)) {
            rawNeeds.forEach(n => {
                const value = (typeof n.value === 'number') ? n.value : null;
                if (value !== null) {
                    if (n.id) normalized[n.id] = value;
                    if (n.stringKey) normalized[n.stringKey] = value;
                }
            });
        } else {
            for (const key in rawNeeds) {
                if (rawNeeds.hasOwnProperty(key)) {
                    const entry = rawNeeds[key];
                    if (typeof entry === 'object' && entry !== null && entry.value !== undefined) {
                        normalized[key] = entry.value;
                    } else if (typeof entry === 'number') {
                        normalized[key] = entry;
                    }
                }
            }
        }

        return Object.keys(normalized).length > 0 ? normalized : null;
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
        setCalculatedValues,
        calculateFromProfile,
        loadCalculatedValues,
        hasStoredValues,
        notifyChange,
        getCurrentPerson,
        getStorageKey,
        getPersonNeeds,
        unlockAndApply,
        unlockAllAndApply,
        compareScores,
        DEFAULT_VALUES,
        FAKTOR_INFO,
        STORAGE_KEY_ICH,
        STORAGE_KEY_PARTNER
    };
})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResonanzCard;
}
