/**
 * GEWICHTUNG CARD COMPONENT
 *
 * Vollständige Komponente für Faktor-Gewichtungen (O, A, D, G) mit:
 * - Slider und Input-Felder
 * - Lock-Status pro Faktor
 * - Summen-Lock (fixierte Gesamtsumme)
 * - Automatische Normalisierung
 * - TiageState Integration (Single Source of Truth)
 * - Person-spezifische Speicherung (ich/partner)
 *
 * Gewichtungen beeinflussen die Score-Berechnung:
 * - O: Orientierung (sexuelle Ausrichtung)
 * - A: Archetyp (Persönlichkeitsprofil)
 * - D: Dominanz (Beziehungsdynamik)
 * - G: Geschlecht (Gender-Modifikatoren)
 *
 * Range: 0-100% (Summe kann fixiert werden)
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const GewichtungCard = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // KONSTANTEN
    // ═══════════════════════════════════════════════════════════════════════════

    const DEFAULTS = {
        O: { value: 25, locked: false },
        A: { value: 25, locked: false },
        D: { value: 25, locked: false },
        G: { value: 25, locked: false }
    };

    // Legacy-kompatible Defaults
    const DEFAULT_WEIGHTS = {
        orientierung: 25,
        archetyp: 25,
        dominanz: 25,
        geschlecht: 25
    };

    // Legacy Storage Keys (für Migration)
    const STORAGE_KEY_ICH = 'tiage_faktor_gewichtungen_ich';
    const STORAGE_KEY_PARTNER = 'tiage_faktor_gewichtungen_partner';
    const STORAGE_KEY_LEGACY = 'tiage_faktor_gewichtungen';
    const LOCK_KEY_LEGACY = 'tiage_faktor_locks';

    // Summen-Lock Keys
    const SUMME_LOCK_KEY_ICH = 'tiage_summe_lock_ich';
    const SUMME_LOCK_KEY_PARTNER = 'tiage_summe_lock_partner';
    const SUMME_TARGET_KEY_ICH = 'tiage_summe_target_ich';
    const SUMME_TARGET_KEY_PARTNER = 'tiage_summe_target_partner';
    const SUMME_LOCK_KEY_LEGACY = 'tiage_summe_lock';
    const SUMME_TARGET_KEY_LEGACY = 'tiage_summe_target';

    // Faktor-Mapping für UI-Elemente
    const FAKTOR_MAP = {
        orientierung: { inputId: 'gewicht-orientierung', key: 'O' },
        archetyp: { inputId: 'gewicht-archetyp', key: 'A' },
        dominanz: { inputId: 'gewicht-dominanz', key: 'D' },
        geschlecht: { inputId: 'gewicht-geschlecht', key: 'G' }
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // INTERNER STATE
    // ═══════════════════════════════════════════════════════════════════════════

    // Lock-Status für Gewichtungen - person-spezifisch
    const locksStore = {
        ich: { orientierung: false, archetyp: false, dominanz: false, geschlecht: false },
        partner: { orientierung: false, archetyp: false, dominanz: false, geschlecht: false }
    };

    // Summen-Lock-Status
    const summeLockedStore = { ich: true, partner: true };
    const summeTargetStore = { ich: 100, partner: 100 };

    // Initialization flag
    let initialized = false;

    // ═══════════════════════════════════════════════════════════════════════════
    // HELPER FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    function getCurrentPerson() {
        if (typeof currentProfileReviewContext !== 'undefined' && currentProfileReviewContext.person) {
            return currentProfileReviewContext.person;
        }
        return 'ich';
    }

    function getStorageKey(person) {
        return person === 'partner' ? STORAGE_KEY_PARTNER : STORAGE_KEY_ICH;
    }

    function getSummeLockKey(person) {
        return person === 'partner' ? SUMME_LOCK_KEY_PARTNER : SUMME_LOCK_KEY_ICH;
    }

    function getSummeTargetKey(person) {
        return person === 'partner' ? SUMME_TARGET_KEY_PARTNER : SUMME_TARGET_KEY_ICH;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // LOCKS STORE ACCESS
    // ═══════════════════════════════════════════════════════════════════════════

    function getLocksByPerson(person) {
        // Lese Lock-Status aus TiageState (SSOT)
        if (typeof TiageState !== 'undefined') {
            const gew = TiageState.get(`gewichtungen.${person}`);
            if (gew && gew.O) {
                return {
                    orientierung: gew.O.locked || false,
                    archetyp: gew.A.locked || false,
                    dominanz: gew.D.locked || false,
                    geschlecht: gew.G.locked || false
                };
            }
        }
        return locksStore[person === 'partner' ? 'partner' : 'ich'];
    }

    function setLocksByPerson(person, locks) {
        locksStore[person === 'partner' ? 'partner' : 'ich'] = locks;
        // Sync zu TiageState (SSOT)
        if (typeof TiageState !== 'undefined') {
            const gew = TiageState.get(`gewichtungen.${person}`);
            if (gew) {
                gew.O.locked = locks.orientierung || false;
                gew.A.locked = locks.archetyp || false;
                gew.D.locked = locks.dominanz || false;
                gew.G.locked = locks.geschlecht || false;
                TiageState.set(`gewichtungen.${person}`, gew);
            }
        }
    }

    function getSummeLockedByPerson(person) {
        // Lese direkt aus TiageState (SSOT)
        if (typeof TiageState !== 'undefined') {
            const summeLock = TiageState.get(`gewichtungen.${person}.summeLock`);
            if (summeLock) return summeLock.enabled !== false;
        }
        return summeLockedStore[person === 'partner' ? 'partner' : 'ich'];
    }

    function setSummeLockedByPerson(person, value) {
        summeLockedStore[person === 'partner' ? 'partner' : 'ich'] = value;
        // Sync zu TiageState (SSOT)
        if (typeof TiageState !== 'undefined') {
            const current = TiageState.get(`gewichtungen.${person}.summeLock`) || { enabled: true, target: 100 };
            TiageState.set(`gewichtungen.${person}.summeLock`, { ...current, enabled: value });
        }
    }

    function getSummeTargetByPerson(person) {
        // Lese direkt aus TiageState (SSOT)
        if (typeof TiageState !== 'undefined') {
            const summeLock = TiageState.get(`gewichtungen.${person}.summeLock`);
            if (summeLock) return summeLock.target || 100;
        }
        return summeTargetStore[person === 'partner' ? 'partner' : 'ich'];
    }

    function setSummeTargetByPerson(person, value) {
        summeTargetStore[person === 'partner' ? 'partner' : 'ich'] = value;
        // Sync zu TiageState (SSOT)
        if (typeof TiageState !== 'undefined') {
            const current = TiageState.get(`gewichtungen.${person}.summeLock`) || { enabled: true, target: 100 };
            TiageState.set(`gewichtungen.${person}.summeLock`, { ...current, target: value });
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // MIGRATION
    // ═══════════════════════════════════════════════════════════════════════════

    function migrateIfNeeded() {
        try {
            const ichExists = localStorage.getItem(STORAGE_KEY_ICH);
            const partnerExists = localStorage.getItem(STORAGE_KEY_PARTNER);

            if (ichExists && partnerExists) return;

            const legacyData = localStorage.getItem(STORAGE_KEY_LEGACY);
            if (!legacyData) return;

            const parsed = JSON.parse(legacyData);
            let combined;

            if (parsed.O && typeof parsed.O === 'object' && 'value' in parsed.O) {
                combined = parsed;
            } else {
                let legacyLocks = { orientierung: false, archetyp: false, dominanz: false, geschlecht: false };
                try {
                    const storedLocks = localStorage.getItem(LOCK_KEY_LEGACY);
                    if (storedLocks) legacyLocks = JSON.parse(storedLocks);
                } catch (e) { /* ignore */ }

                combined = {
                    O: { value: parsed.O ?? DEFAULTS.O.value, locked: legacyLocks.orientierung ?? false },
                    A: { value: parsed.A ?? DEFAULTS.A.value, locked: legacyLocks.archetyp ?? false },
                    D: { value: parsed.D ?? DEFAULTS.D.value, locked: legacyLocks.dominanz ?? false },
                    G: { value: parsed.G ?? DEFAULTS.G.value, locked: legacyLocks.geschlecht ?? false }
                };
            }

            if (!ichExists) {
                localStorage.setItem(STORAGE_KEY_ICH, JSON.stringify(combined));
                console.log('[GewichtungCard] Gewichtungen für ICH migriert');
            }
            if (!partnerExists) {
                localStorage.setItem(STORAGE_KEY_PARTNER, JSON.stringify(combined));
                console.log('[GewichtungCard] Gewichtungen für PARTNER migriert');
            }

            // Migriere Summen-Lock
            const legacySummeLock = localStorage.getItem(SUMME_LOCK_KEY_LEGACY);
            const legacySummeTarget = localStorage.getItem(SUMME_TARGET_KEY_LEGACY);

            if (legacySummeLock !== null) {
                if (!localStorage.getItem(SUMME_LOCK_KEY_ICH)) localStorage.setItem(SUMME_LOCK_KEY_ICH, legacySummeLock);
                if (!localStorage.getItem(SUMME_LOCK_KEY_PARTNER)) localStorage.setItem(SUMME_LOCK_KEY_PARTNER, legacySummeLock);
            }
            if (legacySummeTarget !== null) {
                if (!localStorage.getItem(SUMME_TARGET_KEY_ICH)) localStorage.setItem(SUMME_TARGET_KEY_ICH, legacySummeTarget);
                if (!localStorage.getItem(SUMME_TARGET_KEY_PARTNER)) localStorage.setItem(SUMME_TARGET_KEY_PARTNER, legacySummeTarget);
            }

            // Entferne Legacy-Keys
            localStorage.removeItem(STORAGE_KEY_LEGACY);
            localStorage.removeItem(LOCK_KEY_LEGACY);
            localStorage.removeItem(SUMME_LOCK_KEY_LEGACY);
            localStorage.removeItem(SUMME_TARGET_KEY_LEGACY);
            console.log('[GewichtungCard] Legacy Keys entfernt');
        } catch (e) {
            console.warn('[GewichtungCard] Fehler bei Migration:', e);
        }
    }

    // Führe Migration beim Laden aus
    migrateIfNeeded();

    // ═══════════════════════════════════════════════════════════════════════════
    // LOAD / SAVE FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Lädt kombinierte Gewichtungen (Werte + Lock-Status)
     * @param {string} person - 'ich' oder 'partner'
     * @returns {Object} { O: { value, locked }, ... }
     */
    function load(person) {
        person = person || getCurrentPerson();

        // PHILOSOPHIE B: TiageState ist Single Source of Truth
        if (typeof TiageState !== 'undefined') {
            const fromState = TiageState.get(`gewichtungen.${person}`);
            console.log('[GewichtungCard] load() - TiageState.get:', person, JSON.stringify(fromState));
            if (fromState && fromState.O && typeof fromState.O === 'object' && 'value' in fromState.O) {
                const result = {
                    O: { value: fromState.O.value ?? DEFAULTS.O.value, locked: fromState.O.locked ?? false },
                    A: { value: fromState.A.value ?? DEFAULTS.A.value, locked: fromState.A.locked ?? false },
                    D: { value: fromState.D.value ?? DEFAULTS.D.value, locked: fromState.D.locked ?? false },
                    G: { value: fromState.G.value ?? DEFAULTS.G.value, locked: fromState.G.locked ?? false }
                };
                console.log('[GewichtungCard] load() - Returning from TiageState:', JSON.stringify(result));
                return result;
            }
        }

        // Fallback: Legacy localStorage
        const storageKey = getStorageKey(person);
        try {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed.O && typeof parsed.O === 'object' && 'value' in parsed.O) {
                    const result = {
                        O: { value: parsed.O.value ?? DEFAULTS.O.value, locked: parsed.O.locked ?? false },
                        A: { value: parsed.A.value ?? DEFAULTS.A.value, locked: parsed.A.locked ?? false },
                        D: { value: parsed.D.value ?? DEFAULTS.D.value, locked: parsed.D.locked ?? false },
                        G: { value: parsed.G.value ?? DEFAULTS.G.value, locked: parsed.G.locked ?? false }
                    };
                    if (typeof TiageState !== 'undefined') {
                        TiageState.set(`gewichtungen.${person}`, result);
                        console.log(`[GewichtungCard] Migriert zu TiageState: ${person}`);
                    }
                    return result;
                }
            }
        } catch (e) {
            console.warn('[GewichtungCard] Fehler beim Laden:', e);
        }

        return JSON.parse(JSON.stringify(DEFAULTS));
    }

    /**
     * Lädt nur die Gewichtungs-Werte (ohne Lock-Status)
     * @param {string} person - 'ich' oder 'partner'
     * @returns {Object} { O: number, A: number, D: number, G: number }
     */
    function getValues(person) {
        const combined = load(person);
        return {
            O: combined.O.value,
            A: combined.A.value,
            D: combined.D.value,
            G: combined.G.value
        };
    }

    /**
     * Lädt nur den Lock-Status
     * @param {string} person - 'ich' oder 'partner'
     * @returns {Object} { orientierung, archetyp, dominanz, geschlecht }
     */
    function getLocks(person) {
        const combined = load(person);
        return {
            orientierung: combined.O.locked,
            archetyp: combined.A.locked,
            dominanz: combined.D.locked,
            geschlecht: combined.G.locked
        };
    }

    /**
     * Speichert Gewichtungen aus UI
     * SSOT: TiageState ist Single Source of Truth
     * @param {string} person - 'ich' oder 'partner'
     */
    function save(person) {
        console.log('[GewichtungCard] save called');
        person = person || getCurrentPerson();

        // Check if DOM elements exist - if not, don't save (prevents 0/0/0/0)
        const inputO = document.getElementById('gewicht-orientierung');
        const inputA = document.getElementById('gewicht-archetyp');
        const inputD = document.getElementById('gewicht-dominanz');
        const inputG = document.getElementById('gewicht-geschlecht');

        if (!inputO || !inputA || !inputD || !inputG) {
            console.log('[GewichtungCard] save aborted - DOM elements not found');
            return;
        }

        const combined = load(person);

        combined.O.value = parseInt(inputO.value) || combined.O.value;
        combined.A.value = parseInt(inputA.value) || combined.A.value;
        combined.D.value = parseInt(inputD.value) || combined.D.value;
        combined.G.value = parseInt(inputG.value) || combined.G.value;

        try {
            // SSOT: TiageState speichern + persistieren
            if (typeof TiageState !== 'undefined') {
                TiageState.set(`gewichtungen.${person}`, combined);
                TiageState.saveToStorage();
                console.log('[GewichtungCard] Saved to TiageState:', person, JSON.stringify(combined));
            }
        } catch (e) {
            console.warn('[GewichtungCard] Fehler beim Speichern:', e);
        }

        updateSumme();
        if (typeof updateDisplay === 'function') updateDisplay();
    }

    /**
     * Speichert Lock-Status
     * @param {string} person - 'ich' oder 'partner'
     */
    function saveLocks(person) {
        person = person || getCurrentPerson();
        const combined = load(person);
        const locks = getLocksByPerson(person);

        combined.O.locked = locks.orientierung;
        combined.A.locked = locks.archetyp;
        combined.D.locked = locks.dominanz;
        combined.G.locked = locks.geschlecht;

        try {
            if (typeof TiageState !== 'undefined') {
                TiageState.set(`gewichtungen.${person}`, combined);
                // Persist to localStorage for temp local save
                TiageState.saveToStorage();
            }
        } catch (e) {
            console.warn('[GewichtungCard] Fehler beim Speichern der Locks:', e);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // SUMMEN-LOCK FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    function getSummeLock(person) {
        person = person || getCurrentPerson();
        // TiageState als SSOT
        if (typeof TiageState !== 'undefined') {
            const summeLock = TiageState.get(`gewichtungen.${person}.summeLock`);
            if (summeLock) return summeLock.enabled !== false;
        }
        // Fallback: localStorage (Migration)
        try {
            const key = getSummeLockKey(person);
            const stored = localStorage.getItem(key);
            return stored !== null ? JSON.parse(stored) : true;
        } catch (e) { return true; }
    }

    function getSummeTarget(person) {
        person = person || getCurrentPerson();
        // TiageState als SSOT
        if (typeof TiageState !== 'undefined') {
            const summeLock = TiageState.get(`gewichtungen.${person}.summeLock`);
            if (summeLock) return summeLock.target || 100;
        }
        // Fallback: localStorage (Migration)
        try {
            const key = getSummeTargetKey(person);
            const stored = localStorage.getItem(key);
            return stored !== null ? JSON.parse(stored) : 100;
        } catch (e) { return 100; }
    }

    function saveSummeLock(person) {
        person = person || getCurrentPerson();
        const isLocked = getSummeLockedByPerson(person);
        const target = getSummeTargetByPerson(person);
        try {
            // TiageState als SSOT
            if (typeof TiageState !== 'undefined') {
                TiageState.set(`gewichtungen.${person}.summeLock`, {
                    enabled: isLocked,
                    target: target
                });
                // Persist to localStorage for temp local save
                TiageState.saveToStorage();
            }
        } catch (e) {
            console.warn('[GewichtungCard] Fehler beim Speichern des Summen-Locks:', e);
        }
    }

    function toggleSummeLock() {
        const person = getCurrentPerson();
        const currentLocked = getSummeLockedByPerson(person);
        setSummeLockedByPerson(person, !currentLocked);

        if (!currentLocked) {
            const factors = Object.keys(FAKTOR_MAP);
            let currentSum = 0;
            factors.forEach(factor => {
                const input = document.getElementById(FAKTOR_MAP[factor].inputId);
                currentSum += parseInt(input?.value) || 0;
            });
            setSummeTargetByPerson(person, currentSum);
        }

        saveSummeLock(person);
        updateSummeLockDisplay();
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // UI UPDATE FUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    function updateSumme() {
        const gew = getValues();
        const summe = gew.O + gew.A + gew.D + gew.G;
        const summeEl = document.getElementById('gewicht-summe');
        if (summeEl) {
            summeEl.textContent = summe + '%';
            const person = getCurrentPerson();
            const isLocked = getSummeLockedByPerson(person);
            const target = getSummeTargetByPerson(person);
            const targetValue = isLocked ? target : 100;
            const isOnTarget = summe === targetValue;
            summeEl.classList.toggle('error', !isOnTarget);
            summeEl.style.color = isOnTarget ? '#10B981' : '#EF4444';
        }
    }

    function updateSummeLockDisplay() {
        const person = getCurrentPerson();
        const isLocked = getSummeLockedByPerson(person);
        const target = getSummeTargetByPerson(person);
        const lockElement = document.getElementById('gewicht-summe-lock');
        if (lockElement) {
            lockElement.textContent = isLocked ? '🔒' : '🔓';
            lockElement.classList.toggle('locked', isLocked);
            lockElement.title = isLocked
                ? `Summe ist auf ${target}% fixiert (klicken zum Entsperren)`
                : 'Summe auf aktuellen Wert fixieren';
        }
    }

    function updateRowStates() {
        const factors = Object.keys(FAKTOR_MAP);
        const person = getCurrentPerson();
        const locks = getLocksByPerson(person);
        const unlockedCount = factors.filter(f => !locks[f]).length;

        factors.forEach(factor => {
            const row = document.querySelector(`.gewichtung-card[data-factor="${factor}"]`);
            const input = document.getElementById(FAKTOR_MAP[factor].inputId);
            if (!row || !input) return;

            row.classList.remove('locked', 'readonly');

            if (locks[factor]) {
                row.classList.add('locked');
            } else if (unlockedCount === 1) {
                row.classList.add('readonly');
            }
        });

        updateSummeLockDisplay();
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // NORMALISIERUNG
    // ═══════════════════════════════════════════════════════════════════════════

    function normalize(changedFactor, newValue) {
        console.log('[GewichtungCard] normalize called:', changedFactor, newValue);
        const person = getCurrentPerson();
        const isLocked = getSummeLockedByPerson(person);
        const target = getSummeTargetByPerson(person);
        const locks = getLocksByPerson(person);

        // Wenn Summen-Lock deaktiviert, nur den geänderten Wert setzen
        if (!isLocked) {
            const changedInput = document.getElementById(FAKTOR_MAP[changedFactor].inputId);
            const changedSlider = document.getElementById(`gewicht-slider-${changedFactor}`);
            const clampedValue = Math.min(Math.max(newValue, 0), 100);
            if (changedInput) changedInput.value = clampedValue;
            if (changedSlider) changedSlider.value = clampedValue;
            save();
            updateSumme();
            return;
        }

        const factors = Object.keys(FAKTOR_MAP);
        let lockedSum = 0;
        const unlockedFactors = [];

        factors.forEach(factor => {
            if (factor === changedFactor) return;
            const info = FAKTOR_MAP[factor];
            const input = document.getElementById(info.inputId);
            const currentValue = parseInt(input?.value) || 0;

            if (locks[factor]) {
                lockedSum += currentValue;
            } else {
                unlockedFactors.push({ factor, value: currentValue, input });
            }
        });

        const maxForChanged = Math.max(0, target - lockedSum);
        const clampedValue = Math.min(Math.max(newValue, 0), maxForChanged);

        const changedInput = document.getElementById(FAKTOR_MAP[changedFactor].inputId);
        const changedSlider = document.getElementById(`gewicht-slider-${changedFactor}`);
        if (changedInput) changedInput.value = clampedValue;
        if (changedSlider) changedSlider.value = clampedValue;

        const availableForOthers = Math.max(0, target - lockedSum - clampedValue);

        if (unlockedFactors.length > 0) {
            const currentSum = unlockedFactors.reduce((sum, f) => sum + f.value, 0);
            let distributed = 0;

            unlockedFactors.forEach((f, idx) => {
                let newVal;
                if (idx === unlockedFactors.length - 1) {
                    newVal = availableForOthers - distributed;
                } else if (currentSum > 0) {
                    const proportion = f.value / currentSum;
                    newVal = Math.round(availableForOthers * proportion);
                    distributed += newVal;
                } else {
                    newVal = Math.round(availableForOthers / unlockedFactors.length);
                    distributed += newVal;
                }
                const finalValue = Math.max(0, newVal);
                f.input.value = finalValue;
                const slider = document.getElementById(`gewicht-slider-${f.factor}`);
                if (slider) slider.value = finalValue;
            });
        }

        save();
        updateRowStates();
        updateSumme();
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // LOCK TOGGLE
    // ═══════════════════════════════════════════════════════════════════════════

    function handleLockToggle(factor) {
        const person = getCurrentPerson();
        const locks = getLocksByPerson(person);
        const lockedCount = Object.values(locks).filter(v => v).length;

        if (!locks[factor] && lockedCount >= 3) {
            const row = document.querySelector(`.gewichtung-card[data-factor="${factor}"]`);
            if (row) {
                row.style.animation = 'shake 0.3s ease';
                setTimeout(() => { row.style.animation = ''; }, 300);
            }
            return;
        }

        locks[factor] = !locks[factor];
        setLocksByPerson(person, locks);
        saveLocks();
        updateRowStates();
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // INITIALISIERUNG
    // ═══════════════════════════════════════════════════════════════════════════

    function initInputs() {
        console.log('[GewichtungCard] initInputs called, initialized:', initialized);
        if (initialized) return;

        const factors = Object.keys(FAKTOR_MAP);
        let allFound = true;

        factors.forEach(factor => {
            const row = document.querySelector(`.gewichtung-card[data-factor="${factor}"]`);
            const input = document.getElementById(FAKTOR_MAP[factor].inputId);
            const slider = document.getElementById(`gewicht-slider-${factor}`);

            if (!row || !input) {
                allFound = false;
                return;
            }

            // Nur Zahlen erlauben
            input.addEventListener('keypress', function(e) {
                if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete') {
                    e.preventDefault();
                }
            });

            // Bei Änderung normalisieren
            input.addEventListener('change', function(e) {
                const person = getCurrentPerson();
                const currentLocks = getLocksByPerson(person);

                if (currentLocks[factor]) {
                    const gew = getValues();
                    input.value = gew[FAKTOR_MAP[factor].key];
                    return;
                }

                const unlockedCount = factors.filter(f => !currentLocks[f]).length;
                if (unlockedCount === 1 && !currentLocks[factor]) {
                    const gew = getValues();
                    input.value = gew[FAKTOR_MAP[factor].key];
                    return;
                }

                const newVal = parseInt(e.target.value) || 0;
                normalize(factor, newVal);
            });

            // Bei Blur auch normalisieren
            input.addEventListener('blur', function(e) {
                const person = getCurrentPerson();
                const currentLocks = getLocksByPerson(person);

                if (!currentLocks[factor]) {
                    const unlockedCount = factors.filter(f => !currentLocks[f]).length;
                    if (unlockedCount > 1) {
                        const newVal = parseInt(e.target.value) || 0;
                        normalize(factor, newVal);
                    }
                }
            });

            // Slider-Events
            if (slider) {
                slider.addEventListener('input', function(e) {
                    console.log('[GewichtungCard] slider input event:', factor, e.target.value);
                    const person = getCurrentPerson();
                    const currentLocks = getLocksByPerson(person);

                    if (currentLocks[factor]) {
                        const gew = getValues();
                        slider.value = gew[FAKTOR_MAP[factor].key];
                        return;
                    }
                    input.value = e.target.value;
                    // Also normalize and save during input (not just on change)
                    const newVal = parseInt(e.target.value) || 0;
                    normalize(factor, newVal);
                });

                slider.addEventListener('change', function(e) {
                    const person = getCurrentPerson();
                    const currentLocks = getLocksByPerson(person);

                    if (currentLocks[factor]) {
                        const gew = getValues();
                        slider.value = gew[FAKTOR_MAP[factor].key];
                        return;
                    }

                    const unlockedCount = factors.filter(f => !currentLocks[f]).length;
                    if (unlockedCount === 1 && !currentLocks[factor]) {
                        const gew = getValues();
                        slider.value = gew[FAKTOR_MAP[factor].key];
                        input.value = gew[FAKTOR_MAP[factor].key];
                        return;
                    }

                    const newVal = parseInt(e.target.value) || 0;
                    normalize(factor, newVal);
                });
            }

            // Doppelklick auf Row für Lock
            row.addEventListener('dblclick', function(e) {
                if (e.target.tagName !== 'INPUT' && !e.target.classList.contains('gewichtung-lock-indicator')) {
                    handleLockToggle(factor);
                }
            });
        });

        if (allFound) {
            initialized = true;
            console.log('[GewichtungCard] initInputs: All elements found, event listeners attached');
        } else {
            console.log('[GewichtungCard] initInputs: Some elements not found, will retry later');
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // RESET
    // ═══════════════════════════════════════════════════════════════════════════

    function reset() {
        const person = getCurrentPerson();

        setLocksByPerson(person, { orientierung: false, archetyp: false, dominanz: false, geschlecht: false });
        saveLocks(person);

        setSummeLockedByPerson(person, true);
        setSummeTargetByPerson(person, 100);
        saveSummeLock(person);

        document.getElementById('gewicht-orientierung').value = DEFAULTS.O.value;
        document.getElementById('gewicht-archetyp').value = DEFAULTS.A.value;
        document.getElementById('gewicht-dominanz').value = DEFAULTS.D.value;
        document.getElementById('gewicht-geschlecht').value = DEFAULTS.G.value;

        const sliderO = document.getElementById('gewicht-slider-orientierung');
        const sliderA = document.getElementById('gewicht-slider-archetyp');
        const sliderD = document.getElementById('gewicht-slider-dominanz');
        const sliderG = document.getElementById('gewicht-slider-geschlecht');
        if (sliderO) sliderO.value = DEFAULTS.O.value;
        if (sliderA) sliderA.value = DEFAULTS.A.value;
        if (sliderD) sliderD.value = DEFAULTS.D.value;
        if (sliderG) sliderG.value = DEFAULTS.G.value;

        save();
        updateRowStates();
        updateSumme();
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // LOAD INTO UI
    // ═══════════════════════════════════════════════════════════════════════════

    function loadIntoUI() {
        initInputs();

        const person = getCurrentPerson();
        const gew = getValues(person);

        const locks = getLocks(person);
        setLocksByPerson(person, locks);

        const isLocked = getSummeLock(person);
        const target = getSummeTarget(person);
        setSummeLockedByPerson(person, isLocked);
        setSummeTargetByPerson(person, target);

        const inputO = document.getElementById('gewicht-orientierung');
        const inputA = document.getElementById('gewicht-archetyp');
        const inputD = document.getElementById('gewicht-dominanz');
        const inputG = document.getElementById('gewicht-geschlecht');

        const sliderO = document.getElementById('gewicht-slider-orientierung');
        const sliderA = document.getElementById('gewicht-slider-archetyp');
        const sliderD = document.getElementById('gewicht-slider-dominanz');
        const sliderG = document.getElementById('gewicht-slider-geschlecht');

        if (inputO) inputO.value = gew.O;
        if (inputA) inputA.value = gew.A;
        if (inputD) inputD.value = gew.D;
        if (inputG) inputG.value = gew.G;

        if (sliderO) sliderO.value = gew.O;
        if (sliderA) sliderA.value = gew.A;
        if (sliderD) sliderD.value = gew.D;
        if (sliderG) sliderG.value = gew.G;

        // Renormalisieren falls nötig
        if (isLocked) {
            const currentSum = gew.O + gew.A + gew.D + gew.G;
            if (currentSum !== target && currentSum > 0) {
                const factors = Object.keys(FAKTOR_MAP);
                const currentLocks = getLocksByPerson(person);
                const unlockedFactors = factors.filter(f => !currentLocks[f]);
                const lockedSum = factors.filter(f => currentLocks[f])
                    .reduce((sum, f) => sum + gew[FAKTOR_MAP[f].key], 0);
                const unlockedSum = currentSum - lockedSum;
                const targetForUnlocked = Math.max(0, target - lockedSum);

                if (unlockedSum > 0 && unlockedFactors.length > 0) {
                    let distributed = 0;
                    unlockedFactors.forEach((factor, idx) => {
                        const input = document.getElementById(FAKTOR_MAP[factor].inputId);
                        const slider = document.getElementById(`gewicht-slider-${factor}`);
                        const key = FAKTOR_MAP[factor].key;
                        let newValue;

                        if (idx === unlockedFactors.length - 1) {
                            newValue = targetForUnlocked - distributed;
                        } else {
                            const proportion = gew[key] / unlockedSum;
                            newValue = Math.round(targetForUnlocked * proportion);
                            distributed += newValue;
                        }

                        newValue = Math.max(0, newValue);
                        if (input) input.value = newValue;
                        if (slider) slider.value = newValue;
                    });

                    save();
                }
            }
        }

        updateSumme();
        updateRowStates();
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // RENDER FUNKTIONEN (Legacy-Kompatibilität)
    // ═══════════════════════════════════════════════════════════════════════════

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
                              onclick="event.stopPropagation(); GewichtungCard.handleLockToggle('${factor}');"
                              title="Klicken zum Sperren/Entsperren"></span>
                    </div>
                </div>
            </div>`;
    }

    function renderAll(weights = {}) {
        const factors = [
            { factor: 'orientierung', label: 'Orientierung' },
            { factor: 'archetyp', label: 'Archetyp' },
            { factor: 'dominanz', label: 'Dominanz' },
            { factor: 'geschlecht', label: 'Geschlecht' }
        ];

        const heading = `
            <div class="gewichtung-heading">
                <h3 style="color: #F59E0B; margin: 0 0 4px 0; font-size: 16px; font-weight: 600;">Gewichtung</h3>
                <span style="color: var(--text-muted); font-size: 11px;">Archetyp · Geschlecht · Orientierung · Dominanz</span>
            </div>`;

        return heading + factors.map(f => render({
            ...f,
            value: weights[f.factor]
        })).join('\n');
    }

    function renderFooter() {
        return `
            <div class="gewichtung-footer-bar">
                <span class="gewichtung-hint">Klick auf 🔓 = Wert fixieren</span>
                <span class="gewichtung-summe-text">
                    Summe: <span class="gewichtung-summe-value" id="gewicht-summe">100%</span>
                    <span class="gewichtung-summe-lock" id="gewicht-summe-lock"
                          onclick="GewichtungCard.toggleSummeLock();"
                          title="Summe auf 100% fixieren">🔓</span>
                </span>
                <button class="profile-review-triple-btn" onclick="GewichtungCard.reset()" style="padding: 6px 12px; font-size: 11px;">
                    🔄 Standard
                </button>
            </div>`;
    }

    // Kompatibilitäts-Handler für inline onclick
    function onSliderInput(factor, value) {
        console.log('[GewichtungCard] onSliderInput called:', factor, value);
        const person = getCurrentPerson();
        const locks = getLocksByPerson(person);

        if (locks[factor]) {
            const gew = getValues();
            const slider = document.getElementById(`gewicht-slider-${factor}`);
            if (slider) slider.value = gew[FAKTOR_MAP[factor].key];
            return;
        }

        // Sync input field with slider
        const input = document.getElementById(FAKTOR_MAP[factor].inputId);
        if (input) input.value = value;

        // Use normalize to handle sum-lock and SAVE to TiageState + localStorage
        const numValue = Math.max(0, Math.min(100, parseInt(value, 10) || 0));
        normalize(factor, numValue);
    }

    function onInputChange(factor, value) {
        console.log('[GewichtungCard] onInputChange called:', factor, value);
        const person = getCurrentPerson();
        const locks = getLocksByPerson(person);

        if (locks[factor]) return;

        const numValue = Math.max(0, Math.min(100, parseInt(value, 10) || 0));
        normalize(factor, numValue);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // DOM READY
    // ═══════════════════════════════════════════════════════════════════════════

    document.addEventListener('DOMContentLoaded', function() {
        initInputs();
    });

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Constants
        DEFAULTS: DEFAULTS,
        DEFAULT_WEIGHTS: DEFAULT_WEIGHTS,
        FAKTOR_MAP: FAKTOR_MAP,

        // Data Access
        load: load,
        getValues: getValues,
        getLocks: getLocks,
        save: save,
        saveLocks: saveLocks,

        // Summen-Lock
        getSummeLock: getSummeLock,
        getSummeTarget: getSummeTarget,
        saveSummeLock: saveSummeLock,
        toggleSummeLock: toggleSummeLock,

        // UI
        loadIntoUI: loadIntoUI,
        updateSumme: updateSumme,
        updateRowStates: updateRowStates,
        updateSummeLockDisplay: updateSummeLockDisplay,

        // Actions
        normalize: normalize,
        handleLockToggle: handleLockToggle,
        reset: reset,
        initInputs: initInputs,

        // Render (Legacy)
        render: render,
        renderAll: renderAll,
        renderFooter: renderFooter,
        onSliderInput: onSliderInput,
        onInputChange: onInputChange,

        // Internal Store Access (für Kompatibilität)
        getLocksByPerson: getLocksByPerson,
        setLocksByPerson: setLocksByPerson,
        getSummeLockedByPerson: getSummeLockedByPerson,
        setSummeLockedByPerson: setSummeLockedByPerson,
        getSummeTargetByPerson: getSummeTargetByPerson,
        setSummeTargetByPerson: setSummeTargetByPerson
    };
})();

// Global verfügbar machen
window.GewichtungCard = GewichtungCard;

// ═══════════════════════════════════════════════════════════════════════════
// LEGACY-KOMPATIBILITÄT
// Alte Funktionsnamen aus app-main.js werden auf GewichtungCard gemappt
// ═══════════════════════════════════════════════════════════════════════════
window.getGewichtungen = GewichtungCard.getValues;
window.getGewichtungenCombined = GewichtungCard.load;
window.getGewichtungLocks = GewichtungCard.getLocks;
window.saveGewichtungen = GewichtungCard.save;
window.normalizeGewichtungen = GewichtungCard.normalize;
window.handleLockToggle = GewichtungCard.handleLockToggle;
window.toggleSummeLock = GewichtungCard.toggleSummeLock;
window.resetGewichtungen = GewichtungCard.reset;
window.loadGewichtungenIntoUI = GewichtungCard.loadIntoUI;

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GewichtungCard;
}
