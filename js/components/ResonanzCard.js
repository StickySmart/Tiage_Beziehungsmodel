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
            beschreibung: 'Existenz, Zuneigung, Muße, Intimität & Romantik',
            kategorien: ['existenz', 'zuneigung', 'musse', 'intimitaet_romantik'],
            color: '#E63946'
        },
        R2: {
            label: 'Philosophie',
            beschreibung: 'Freiheit, Teilnahme, Identität, Lebensplanung, Finanzen, Werte, Soziales, Praktisches',
            kategorien: ['freiheit', 'teilnahme', 'identitaet', 'lebensplanung', 'finanzen_karriere', 'werte_haltungen', 'soziales_leben', 'praktisches_leben'],
            color: '#2A9D8F'
        },
        R3: {
            label: 'Dynamik',
            beschreibung: 'Dynamik, Sicherheit',
            kategorien: ['dynamik', 'sicherheit'],
            color: '#8B5CF6'
        },
        R4: {
            label: 'Identität',
            beschreibung: 'Verständnis, Erschaffen, Verbundenheit, Kommunikation',
            kategorien: ['verstaendnis', 'erschaffen', 'verbundenheit', 'kommunikation_stil'],
            color: '#F4A261'
        }
    };

    /**
     * Lädt Resonanzwerte aus localStorage
     * @param {string} person - 'ich' oder 'partner' (optional, default ist aktueller Kontext)
     * @returns {Object} Resonanzwerte mit Lock-Status
     */
    function load(person) {
        person = person || getCurrentPerson();
        const storageKey = getStorageKey(person);

        try {
            const stored = localStorage.getItem(storageKey);
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
     * @param {string} person - 'ich' oder 'partner' (optional, default ist aktueller Kontext)
     */
    function save(values, person) {
        person = person || getCurrentPerson();
        const storageKey = getStorageKey(person);

        try {
            localStorage.setItem(storageKey, JSON.stringify(values));
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

        const person = getCurrentPerson();
        const personLabel = person === 'partner' ? '👤 Partner' : '👤 Ich';

        return `
            <div class="resonanz-footer-bar">
                <span class="resonanz-hint">GFK-Kompetenz: <span id="resonanz-gfk">${gfk}</span> | ${personLabel}</span>
                <div style="display: flex; gap: 8px;">
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

        ['R1', 'R2', 'R3', 'R4'].forEach(faktor => {
            const newValue = calculatedValues[faktor];

            // Nur setzen wenn:
            // 1. Wert vorhanden ist
            // 2. Nicht gelockt ODER forceOverwrite
            if (newValue !== undefined && newValue !== null) {
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
     * Diese Funktion verwendet die korrekten Datenquellen je nach Person:
     * - ICH: TiageState → AttributeSummaryCard → Archetyp-Standard
     * - PARTNER: LoadedArchetypProfile → Archetyp-Standard
     *
     * @param {string} person - 'ich' oder 'partner'
     * @param {string} archetypKey - Der Archetyp-Schlüssel (z.B. 'duo', 'polyamor')
     * @returns {Object|null} Normalisierte Needs { needKey: value } oder null
     */
    function getPersonNeeds(person, archetypKey) {
        person = person || getCurrentPerson();
        let needs = null;

        // ═══════════════════════════════════════════════════════════════════
        // PARTNER: Zuerst LoadedArchetypProfile prüfen (Partner-spezifisch!)
        // ═══════════════════════════════════════════════════════════════════
        if (person === 'partner') {
            const partnerFlatNeeds = window.LoadedArchetypProfile?.partner?.profileReview?.flatNeeds;
            if (partnerFlatNeeds) {
                needs = _normalizeNeeds(partnerFlatNeeds);
                if (needs && Object.keys(needs).length > 0) {
                    console.log('[ResonanzCard.getPersonNeeds] Partner-Needs aus LoadedArchetypProfile geladen');
                    return needs;
                }
            }
        }

        // ═══════════════════════════════════════════════════════════════════
        // ICH: TiageState zuerst (enthält aktuelle User-Eingaben)
        // ═══════════════════════════════════════════════════════════════════
        if (person === 'ich') {
            if (typeof TiageState !== 'undefined' && TiageState.get) {
                const savedNeeds = TiageState.get('tiage_needs_integrated');
                if (savedNeeds && Object.keys(savedNeeds).length > 0) {
                    needs = _normalizeNeeds(savedNeeds);
                    if (needs && Object.keys(needs).length > 0) {
                        console.log('[ResonanzCard.getPersonNeeds] ICH-Needs aus TiageState geladen');
                        return needs;
                    }
                }
            }

            // Fallback für ICH: AttributeSummaryCard
            if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.getFlatNeeds) {
                const cardNeeds = AttributeSummaryCard.getFlatNeeds();
                if (cardNeeds) {
                    needs = _normalizeNeeds(cardNeeds);
                    if (needs && Object.keys(needs).length > 0) {
                        console.log('[ResonanzCard.getPersonNeeds] ICH-Needs aus AttributeSummaryCard geladen');
                        return needs;
                    }
                }
            }
        }

        // ═══════════════════════════════════════════════════════════════════
        // FALLBACK: Standard-Werte des Archetyps
        // ═══════════════════════════════════════════════════════════════════
        if (archetypKey) {
            if (typeof GfkBeduerfnisse !== 'undefined' &&
                GfkBeduerfnisse.archetypProfile && GfkBeduerfnisse.archetypProfile[archetypKey]) {
                needs = GfkBeduerfnisse.archetypProfile[archetypKey].kernbeduerfnisse || {};
                if (Object.keys(needs).length > 0) {
                    console.log('[ResonanzCard.getPersonNeeds] Fallback: Archetyp-Standard für', archetypKey);
                    return needs;
                }
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
