/**
 * MEMORY MANAGER - Speichermanagement für Profile
 *
 * Verwaltet bis zu 4 Speicherslot-Paare (ME + PART).
 * - Speichern: Immer beide zusammen (ME + PART)
 * - Laden: Einzeln möglich (nur ME oder nur PART)
 * - Jeder Slot speichert Datum/Uhrzeit
 *
 * Speicherformat:
 * - tiage_memory_ME001 bis tiage_memory_ME004
 * - tiage_memory_PART001 bis tiage_memory_PART004
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const MemoryManager = (function() {
    'use strict';

    const MAX_SLOTS = 4;
    const STORAGE_PREFIX = 'tiage_memory_';

    // ═══════════════════════════════════════════════════════════════════════
    // HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Get slot key for storage
     */
    function getSlotKey(type, slotNumber) {
        const paddedNum = String(slotNumber).padStart(3, '0');
        return `${STORAGE_PREFIX}${type}${paddedNum}`;
    }

    /**
     * Format date for display
     */
    function formatDateTime(timestamp) {
        if (!timestamp) return '-';
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }

    /**
     * Get value from triple button group
     */
    function getTripleBtnValue(attrId) {
        const container = document.getElementById(attrId);
        if (!container) return 50;
        const activeBtn = container.querySelector('.profile-review-triple-btn.active');
        if (!activeBtn) return 50;
        return parseInt(activeBtn.dataset.value, 10) || 50;
    }

    /**
     * Collect ProfileReview state - Flat Needs with integrated lock status
     *
     * STRUKTUR (v1.8.128): flatNeeds ist jetzt ein Array:
     * [{ id, key, stringKey, label, value, locked }, ...]
     *
     * MIGRATION v1.8.84: attributes werden nicht mehr gespeichert, da sie redundant sind.
     * Die Kategorie-Werte können aus flatNeeds berechnet werden.
     * Beim Laden werden Legacy-Dateien (alle Formate) weiterhin unterstützt.
     *
     * FIX v1.8.89: Wenn flatNeeds leer ist, lade Bedürfnisse aus dem Archetyp-Profil
     */
    function collectProfileReviewState(person) {
        const state = {
            flatNeeds: null
            // flatLockedNeeds entfernt - jetzt integriert in flatNeeds
        };

        // NEU (v1.8.128): Sammle Array-Struktur aus AttributeSummaryCard
        if (typeof AttributeSummaryCard !== 'undefined') {
            if (AttributeSummaryCard.getFlatNeeds) {
                // Neue API (v1.8.128): Array-Struktur [{ id, key, stringKey, label, value, locked }]
                state.flatNeeds = AttributeSummaryCard.getFlatNeeds();
            } else if (AttributeSummaryCard.getFlatNeedsValues) {
                // Fallback: Alte API (sollte nicht mehr vorkommen)
                state.flatNeeds = AttributeSummaryCard.getFlatNeedsValues();
                // Legacy: flatLockedNeeds separat hinzufügen für alte Konsumenten
                if (AttributeSummaryCard.getFlatLockedNeeds) {
                    state.flatLockedNeeds = AttributeSummaryCard.getFlatLockedNeeds();
                }
            }
        }

        // FIX v1.8.89: Fallback - wenn flatNeeds leer ist, lade aus Archetyp-Profil
        const isFlatNeedsEmpty = !state.flatNeeds ||
            (Array.isArray(state.flatNeeds) ? state.flatNeeds.length === 0 : Object.keys(state.flatNeeds).length === 0);
        if (isFlatNeedsEmpty) {
            // Hole aktuellen Archetyp für diese Person
            let archetyp = null;
            if (typeof TiageState !== 'undefined') {
                const archetypData = TiageState.getArchetypes(person);
                archetyp = archetypData?.primary;
            } else if (person === 'ich' && typeof window.mobileIchArchetype !== 'undefined') {
                archetyp = window.mobileIchArchetype;
            } else if (person === 'partner' && typeof window.mobilePartnerArchetype !== 'undefined') {
                archetyp = window.mobilePartnerArchetype;
            }

            // Lade Bedürfnisse aus Archetyp-Profil
            if (archetyp && typeof GfkBeduerfnisse !== 'undefined' && GfkBeduerfnisse.archetypProfile) {
                const profil = GfkBeduerfnisse.archetypProfile[archetyp];
                if (profil && profil.kernbeduerfnisse) {
                    state.flatNeeds = { ...profil.kernbeduerfnisse };
                    console.log('[MemoryManager] flatNeeds aus Archetyp-Profil geladen:', archetyp, 'Anzahl:', Object.keys(state.flatNeeds).length);
                }
            }
        }

        // REMOVED: attributes werden nicht mehr gespeichert (v1.8.84)
        // Die Kategorie-Werte können beim Laden aus flatNeeds berechnet werden

        return state;
    }

    /**
     * Collect Gewichtungen (combined: value + locked) for a specific person
     * Returns new format: { O: { value, locked }, A: { value, locked }, ... }
     * @param {string} person - 'ich' oder 'partner'
     */
    function collectGewichtungen(person) {
        // Verwende neuen person-spezifischen Storage Key
        const storageKey = person === 'partner'
            ? 'tiage_faktor_gewichtungen_partner'
            : 'tiage_faktor_gewichtungen_ich';

        try {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                const parsed = JSON.parse(stored);
                // Check if combined format
                if (parsed.O && typeof parsed.O === 'object' && 'value' in parsed.O) {
                    return parsed;
                }
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    /**
     * Collect Gewichtung Locks (derived from combined structure)
     * @param {string} person - 'ich' oder 'partner'
     */
    function collectGewichtungLocks(person) {
        const combined = collectGewichtungen(person);
        if (!combined) return null;
        return {
            orientierung: combined.O?.locked ?? false,
            archetyp: combined.A?.locked ?? false,
            dominanz: combined.D?.locked ?? false,
            geschlecht: combined.G?.locked ?? false
        };
    }

    /**
     * Collect Resonanzfaktoren for a specific person
     * @param {string} person - 'ich' oder 'partner'
     */
    function collectResonanzfaktoren(person) {
        const storageKey = person === 'partner'
            ? 'tiage_resonanz_faktoren_partner'
            : 'tiage_resonanz_faktoren_ich';

        try {
            const stored = localStorage.getItem(storageKey);
            if (stored) {
                return JSON.parse(stored);
            }
            return null;
        } catch (e) {
            return null;
        }
    }

    /**
     * Get current app version
     */
    function getAppVersion() {
        if (typeof TiageVersion !== 'undefined') {
            return TiageVersion.version;
        }
        return '0.0.000';
    }

    /**
     * Compare versions (returns -1 if v1 < v2, 0 if equal, 1 if v1 > v2)
     */
    function compareVersions(v1, v2) {
        if (!v1) return -1;
        if (!v2) return 1;

        const parts1 = v1.split('.').map(Number);
        const parts2 = v2.split('.').map(Number);

        for (let i = 0; i < 3; i++) {
            const p1 = parts1[i] || 0;
            const p2 = parts2[i] || 0;
            if (p1 < p2) return -1;
            if (p1 > p2) return 1;
        }
        return 0;
    }

    /**
     * Collect current ME data from state (COMPLETE PROFILE)
     *
     * Data Structure v3.0:
     * - archetyp: string (nur primary, kein Object)
     * - geschlecht: { primary, secondary }
     * - dominanz: { primary, secondary }
     * - orientierung: { primary, secondary }
     * - profileReview: { flatNeeds: [...] } (220 Bedürfnisse)
     * - gewichtungen: { O, A, D, G } mit value + locked
     * - resonanzfaktoren: { R1, R2, R3, R4 } mit value + locked
     */
    function collectMeData() {
        const data = {
            timestamp: Date.now(),
            dataVersion: '3.0',
            appVersion: getAppVersion(),
            archetyp: null,
            geschlecht: null,
            dominanz: null,
            orientierung: null,
            profileReview: null,
            gewichtungen: null,
            resonanzfaktoren: null
        };

        // Get from TiageState if available
        if (typeof TiageState !== 'undefined') {
            // Archetyp: nur primary (kein secondary)
            const archetypes = TiageState.getArchetypes('ich');
            data.archetyp = archetypes?.primary || archetypes || null;

            // Geschlecht: { primary, secondary }
            data.geschlecht = TiageState.get('personDimensions.ich.geschlecht');

            // Dominanz: { primary, secondary }
            data.dominanz = TiageState.get('personDimensions.ich.dominanz');

            // Orientierung: { primary, secondary }
            data.orientierung = TiageState.get('personDimensions.ich.orientierung');
        } else if (typeof window.personDimensions !== 'undefined') {
            // Fallback to global personDimensions
            data.geschlecht = window.personDimensions.ich?.geschlecht;
            data.dominanz = window.personDimensions.ich?.dominanz;
            data.orientierung = window.personDimensions.ich?.orientierung;
            if (typeof window.mobileIchArchetype !== 'undefined') {
                data.archetyp = window.mobileIchArchetype;
            }
        }

        // Collect ProfileReview state (220 Bedürfnisse)
        data.profileReview = collectProfileReviewState('ich');

        // Collect Gewichtungen für ICH (person-spezifisch)
        data.gewichtungen = collectGewichtungen('ich');

        // Collect Resonanzfaktoren für ICH (person-spezifisch)
        data.resonanzfaktoren = collectResonanzfaktoren('ich');

        return data;
    }

    /**
     * Collect current PARTNER data from state (COMPLETE PROFILE)
     *
     * Data Structure v3.0 (same as ME):
     * - archetyp: string (nur primary, kein Object)
     * - geschlecht: { primary, secondary }
     * - dominanz: { primary, secondary }
     * - orientierung: { primary, secondary }
     * - profileReview: { flatNeeds: [...] } (220 Bedürfnisse)
     * - gewichtungen: { O, A, D, G } mit value + locked
     * - resonanzfaktoren: { R1, R2, R3, R4 } mit value + locked
     */
    function collectPartnerData() {
        const data = {
            timestamp: Date.now(),
            dataVersion: '3.0',
            appVersion: getAppVersion(),
            archetyp: null,
            geschlecht: null,
            dominanz: null,
            orientierung: null,
            profileReview: null,
            gewichtungen: null,
            resonanzfaktoren: null
        };

        // Get from TiageState if available
        if (typeof TiageState !== 'undefined') {
            // Archetyp: nur primary (kein secondary)
            const archetypes = TiageState.getArchetypes('partner');
            data.archetyp = archetypes?.primary || archetypes || null;

            // Geschlecht: { primary, secondary }
            data.geschlecht = TiageState.get('personDimensions.partner.geschlecht');

            // Dominanz: { primary, secondary }
            data.dominanz = TiageState.get('personDimensions.partner.dominanz');

            // Orientierung: { primary, secondary }
            data.orientierung = TiageState.get('personDimensions.partner.orientierung');
        } else if (typeof window.personDimensions !== 'undefined') {
            // Fallback to global personDimensions
            data.geschlecht = window.personDimensions.partner?.geschlecht;
            data.dominanz = window.personDimensions.partner?.dominanz;
            data.orientierung = window.personDimensions.partner?.orientierung;
            if (typeof window.mobilePartnerArchetype !== 'undefined') {
                data.archetyp = window.mobilePartnerArchetype;
            }
        }

        // Collect ProfileReview state (220 Bedürfnisse)
        data.profileReview = collectProfileReviewState('partner');

        // Collect Gewichtungen für PARTNER (person-spezifisch)
        data.gewichtungen = collectGewichtungen('partner');

        // Collect Resonanzfaktoren für PARTNER (person-spezifisch)
        data.resonanzfaktoren = collectResonanzfaktoren('partner');

        return data;
    }

    /**
     * Set value for triple button group
     */
    function setTripleBtnValue(attrId, value) {
        const container = document.getElementById(attrId);
        if (!container) return;

        // Remove active from all buttons
        container.querySelectorAll('.profile-review-triple-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Set active on matching button
        const targetBtn = container.querySelector(`.profile-review-triple-btn[data-value="${value}"]`);
        if (targetBtn) {
            targetBtn.classList.add('active');
        }
    }

    /**
     * Berechnet Kategorie-Werte (0/50/100) aus flatNeeds
     * Verwendet ATTRIBUTE_NEEDS_MAPPING aus AttributeSummaryCard
     *
     * MIGRATION (v1.8.128): Unterstützt drei Strukturen:
     * - v1.8.128+: Array [{ id, key, stringKey, label, value, locked }, ...]
     * - v1.8.89-127: Object { needId: { value, locked } }
     * - Legacy: Object { needId: value }
     *
     * @param {Array|Object} flatNeeds - Die flachen Bedürfnisse (alle Formate unterstützt)
     * @returns {Object} Berechnete Kategorie-Werte { key: 0|50|100 }
     */
    function calculateAttributesFromFlatNeeds(flatNeeds) {
        if (!flatNeeds || typeof AttributeSummaryCard === 'undefined' ||
            !AttributeSummaryCard.ATTRIBUTE_NEEDS_MAPPING) {
            return {};
        }

        const mapping = AttributeSummaryCard.ATTRIBUTE_NEEDS_MAPPING;
        const attributes = {};

        // Hilfsfunktion: Finde Bedürfnis nach ID (unterstützt alle Formate)
        const findNeedValue = (needId) => {
            // Format 1: Array (v1.8.128+)
            if (Array.isArray(flatNeeds)) {
                const need = flatNeeds.find(n => n.id === needId || n.stringKey === needId);
                return need ? need.value : undefined;
            }
            // Format 2 & 3: Object
            const entry = flatNeeds[needId];
            if (entry === undefined) return undefined;
            if (typeof entry === 'object' && entry !== null && 'value' in entry) {
                return entry.value; // v1.8.89-127 Struktur
            }
            return entry; // Legacy Struktur (Zahl direkt)
        };

        Object.keys(mapping).forEach(attrId => {
            const config = mapping[attrId];
            const key = attrId.replace('pr-', '').replace(/-/g, '_');

            // Berechne Durchschnitt der zugehörigen Needs
            let sum = 0;
            let count = 0;
            config.needs.forEach(needId => {
                const value = findNeedValue(needId);
                if (value !== undefined) {
                    sum += value;
                    count++;
                }
            });

            if (count > 0) {
                const avg = sum / count;
                // Konvertiere zu Triple-Button-Wert: 0, 50, oder 100
                if (avg < 33) {
                    attributes[key] = 0;
                } else if (avg > 66) {
                    attributes[key] = 100;
                } else {
                    attributes[key] = 50;
                }
            }
        });

        return attributes;
    }

    /**
     * Apply ProfileReview state - Flat Needs + berechnete Kategorien
     *
     * MIGRATION: Unterstützt mehrere Datenformate:
     * 1. v1.8.128+: flatNeeds als Array [{ id, key, stringKey, label, value, locked }]
     * 2. v1.8.89-127: flatNeeds als { needId: { value, locked } }
     * 3. v1.8.84-88: flatNeeds als { needId: value } + flatLockedNeeds separat
     * 4. Legacy: Nur attributes → Direkt für Triple-Buttons verwenden
     */
    function applyProfileReviewState(profileReview) {
        if (!profileReview) return;

        // Lade flatNeeds in AttributeSummaryCard (Primary Source)
        if (profileReview.flatNeeds && typeof AttributeSummaryCard !== 'undefined') {
            // setFlatNeeds() erkennt automatisch das Format (Array, Object v1.8.89+, Legacy)
            if (AttributeSummaryCard.setFlatNeeds) {
                AttributeSummaryCard.setFlatNeeds(profileReview.flatNeeds);
                const count = Array.isArray(profileReview.flatNeeds)
                    ? profileReview.flatNeeds.length
                    : Object.keys(profileReview.flatNeeds).length;
                console.log('[MemoryManager] FlatNeeds geladen:', count, 'Einträge');
            }

            // Lade separate Locks falls vorhanden (Legacy v1.8.84-88)
            if (profileReview.flatLockedNeeds && AttributeSummaryCard.setFlatLockedNeeds) {
                AttributeSummaryCard.setFlatLockedNeeds(profileReview.flatLockedNeeds);
                console.log('[MemoryManager] FlatLockedNeeds geladen (Legacy):', Object.keys(profileReview.flatLockedNeeds).length, 'Locks');
            }
        }

        // Bestimme attributes: berechnet aus flatNeeds ODER Legacy-attributes
        let attributes;
        const hasFlatNeeds = profileReview.flatNeeds &&
            (Array.isArray(profileReview.flatNeeds) ? profileReview.flatNeeds.length > 0 : Object.keys(profileReview.flatNeeds).length > 0);

        if (hasFlatNeeds) {
            // Neue Struktur: Berechne Kategorien aus flatNeeds
            attributes = calculateAttributesFromFlatNeeds(profileReview.flatNeeds);
            console.log('[MemoryManager] Kategorien aus flatNeeds berechnet:', Object.keys(attributes).length, 'Kategorien');
        } else {
            // Legacy: Verwende gespeicherte attributes
            attributes = profileReview.attributes || profileReview;
            console.log('[MemoryManager] Legacy-Attributes geladen');
        }

        // Wenn ProfileReviewConfig verfügbar, dynamisch alle Attribute setzen
        if (typeof ProfileReviewConfig !== 'undefined') {
            const allAttrs = ProfileReviewConfig.getAllAttributes();
            allAttrs.forEach(attr => {
                const attrId = attr.attrId;
                const key = attrId.replace('pr-', '').replace(/-/g, '_');
                if (attributes[key] !== undefined) {
                    setTripleBtnValue(attrId, attributes[key]);
                }
            });
        } else {
            // Fallback: Alle bekannten Attribute manuell setzen
            // Geschlechtsidentität
            if (attributes.geschlecht_sekundaer !== undefined) {
                setTripleBtnValue('pr-geschlecht-sekundaer', attributes.geschlecht_sekundaer);
            }
            // Legacy-Support für alte Speicherformate
            if (attributes.geschlechtsidentitaet !== undefined) {
                setTripleBtnValue('pr-geschlecht-sekundaer', attributes.geschlechtsidentitaet);
            }

            // Lebensplanung
            if (attributes.kinder !== undefined) setTripleBtnValue('pr-kinder', attributes.kinder);
            if (attributes.ehe !== undefined) setTripleBtnValue('pr-ehe', attributes.ehe);
            if (attributes.zusammen !== undefined) setTripleBtnValue('pr-zusammen', attributes.zusammen);
            if (attributes.haustiere !== undefined) setTripleBtnValue('pr-haustiere', attributes.haustiere);
            if (attributes.umzug !== undefined) setTripleBtnValue('pr-umzug', attributes.umzug);
            if (attributes.familie !== undefined) setTripleBtnValue('pr-familie', attributes.familie);

            // Finanzen
            if (attributes.finanzen !== undefined) setTripleBtnValue('pr-finanzen', attributes.finanzen);
            if (attributes.karriere !== undefined) setTripleBtnValue('pr-karriere', attributes.karriere);

            // Kommunikation
            if (attributes.gespraech !== undefined) setTripleBtnValue('pr-gespraech', attributes.gespraech);
            if (attributes.emotional !== undefined) setTripleBtnValue('pr-emotional', attributes.emotional);
            if (attributes.konflikt !== undefined) setTripleBtnValue('pr-konflikt', attributes.konflikt);

            // Soziales
            if (attributes.introextro !== undefined) setTripleBtnValue('pr-introextro', attributes.introextro);
            if (attributes.alleinzeit !== undefined) setTripleBtnValue('pr-alleinzeit', attributes.alleinzeit);
            if (attributes.freunde !== undefined) setTripleBtnValue('pr-freunde', attributes.freunde);

            // Intimität
            if (attributes.naehe !== undefined) setTripleBtnValue('pr-naehe', attributes.naehe);
            if (attributes.romantik !== undefined) setTripleBtnValue('pr-romantik', attributes.romantik);
            if (attributes.sex !== undefined) setTripleBtnValue('pr-sex', attributes.sex);

            // Werte
            if (attributes.religion !== undefined) setTripleBtnValue('pr-religion', attributes.religion);
            if (attributes.tradition !== undefined) setTripleBtnValue('pr-tradition', attributes.tradition);
            if (attributes.umwelt !== undefined) setTripleBtnValue('pr-umwelt', attributes.umwelt);

            // Praktisches
            if (attributes.ordnung !== undefined) setTripleBtnValue('pr-ordnung', attributes.ordnung);
            if (attributes.reise !== undefined) setTripleBtnValue('pr-reise', attributes.reise);
        }
    }

    /**
     * Apply Gewichtungen (factor weights) - supports both old and new format
     * New format: { O: { value, locked }, A: { value, locked }, ... }
     * Old format: { O: number, A: number, ... }
     */
    function applyGewichtungen(gewichtungen, person) {
        if (!gewichtungen) return;
        // Verwende person-spezifischen Storage Key
        const storageKey = person === 'partner'
            ? 'tiage_faktor_gewichtungen_partner'
            : 'tiage_faktor_gewichtungen_ich';

        try {
            // Check if already new format
            if (gewichtungen.O && typeof gewichtungen.O === 'object' && 'value' in gewichtungen.O) {
                localStorage.setItem(storageKey, JSON.stringify(gewichtungen));
            } else {
                // Old format - convert to new combined format
                const currentLocks = collectGewichtungLocks(person) || {
                    orientierung: false, archetyp: false, dominanz: false, geschlecht: false
                };
                const combined = {
                    O: { value: gewichtungen.O ?? 40, locked: currentLocks.orientierung ?? false },
                    A: { value: gewichtungen.A ?? 25, locked: currentLocks.archetyp ?? false },
                    D: { value: gewichtungen.D ?? 20, locked: currentLocks.dominanz ?? false },
                    G: { value: gewichtungen.G ?? 15, locked: currentLocks.geschlecht ?? false }
                };
                localStorage.setItem(storageKey, JSON.stringify(combined));
            }
        } catch (e) {
            console.warn('[MemoryManager] Could not save Gewichtungen:', e);
        }
    }

    /**
     * Apply Gewichtung Locks - updates combined structure
     * @param {Object} locks - Lock status
     * @param {string} person - 'ich' oder 'partner'
     */
    function applyGewichtungLocks(locks, person) {
        if (!locks) return;
        const storageKey = person === 'partner'
            ? 'tiage_faktor_gewichtungen_partner'
            : 'tiage_faktor_gewichtungen_ich';

        try {
            // Get current combined or create new
            let combined = collectGewichtungen(person) || {
                O: { value: 40, locked: false },
                A: { value: 25, locked: false },
                D: { value: 20, locked: false },
                G: { value: 15, locked: false }
            };
            // Update locks in combined structure
            combined.O.locked = locks.orientierung ?? false;
            combined.A.locked = locks.archetyp ?? false;
            combined.D.locked = locks.dominanz ?? false;
            combined.G.locked = locks.geschlecht ?? false;
            localStorage.setItem(storageKey, JSON.stringify(combined));
        } catch (e) {
            console.warn('[MemoryManager] Could not save Gewichtung Locks:', e);
        }
    }

    /**
     * Apply Resonanzfaktoren for a specific person
     * @param {Object} resonanz - Resonanzfaktoren { R1: { value, locked }, ... }
     * @param {string} person - 'ich' oder 'partner'
     */
    function applyResonanzfaktoren(resonanz, person) {
        if (!resonanz) return;
        const storageKey = person === 'partner'
            ? 'tiage_resonanz_faktoren_partner'
            : 'tiage_resonanz_faktoren_ich';

        try {
            localStorage.setItem(storageKey, JSON.stringify(resonanz));
        } catch (e) {
            console.warn('[MemoryManager] Could not save Resonanzfaktoren:', e);
        }
    }

    /**
     * Check version and show warning if older
     * @returns {Object} { isOlder: boolean, savedVersion: string, currentVersion: string }
     */
    function checkVersionCompatibility(data) {
        const currentVersion = getAppVersion();
        const savedVersion = data.appVersion || data.version || '0.0.000';

        const comparison = compareVersions(savedVersion, currentVersion);

        return {
            isOlder: comparison < 0,
            isNewer: comparison > 0,
            savedVersion: savedVersion,
            currentVersion: currentVersion
        };
    }

    /**
     * Show version warning toast
     */
    function showVersionWarning(savedVersion, currentVersion, person) {
        const message = `Ältere Version geladen (v${savedVersion})\nAktuelle App: v${currentVersion}\nFehlende Felder bleiben auf Standard.`;
        showMemoryToast(message, 'warning');
        console.warn(`[MemoryManager] Loading ${person} from older version:`, savedVersion, '→', currentVersion);
    }

    /**
     * Apply loaded data to ME (COMPLETE PROFILE)
     *
     * Data Structure v3.0:
     * - archetyp: string
     * - geschlecht: { primary, secondary }
     * - dominanz: { primary, secondary }
     * - orientierung: { primary, secondary }
     */
    function applyMeData(data) {
        if (!data) return false;

        try {
            // ═══════════════════════════════════════════════════════════════════════════
            // 1. Profil berechnen und in LoadedArchetypProfile laden
            // ═══════════════════════════════════════════════════════════════════════════
            if (typeof ProfileCalculator !== 'undefined' && ProfileCalculator.loadProfile) {
                ProfileCalculator.loadProfile('ich', data);
                console.log('[MemoryManager] Profil über ProfileCalculator geladen');
            }

            // Archetyp: string (v3.0) oder { primary, secondary } (v2.0)
            const archetypValue = typeof data.archetyp === 'string'
                ? data.archetyp
                : data.archetyp?.primary || data.archetyp;

            if (typeof TiageState !== 'undefined') {
                if (data.geschlecht) {
                    TiageState.set('personDimensions.ich.geschlecht', data.geschlecht);
                }
                if (data.dominanz) {
                    TiageState.set('personDimensions.ich.dominanz', data.dominanz);
                }
                if (data.orientierung) {
                    TiageState.set('personDimensions.ich.orientierung', data.orientierung);
                }
                if (archetypValue) {
                    TiageState.set('archetypes.ich', { primary: archetypValue, secondary: null });
                }
                TiageState.saveToStorage();
            }

            // Also update global variables and UI
            if (typeof window.personDimensions !== 'undefined') {
                if (data.geschlecht) window.personDimensions.ich.geschlecht = data.geschlecht;
                if (data.dominanz) window.personDimensions.ich.dominanz = data.dominanz;
                if (data.orientierung) window.personDimensions.ich.orientierung = data.orientierung;
            }

            if (typeof window.mobilePersonDimensions !== 'undefined') {
                if (data.geschlecht) window.mobilePersonDimensions.ich.geschlecht = data.geschlecht;
                if (data.dominanz) window.mobilePersonDimensions.ich.dominanz = data.dominanz;
                if (data.orientierung) window.mobilePersonDimensions.ich.orientierung = data.orientierung;
            }

            // Update archetype selects
            if (archetypValue) {
                if (typeof mobileIchArchetype !== 'undefined') {
                    window.mobileIchArchetype = archetypValue;
                }
                if (typeof currentArchetype !== 'undefined') {
                    window.currentArchetype = archetypValue;
                }
                const ichSelect = document.getElementById('ichSelect');
                if (ichSelect) ichSelect.value = archetypValue;
                const mobileIchSelect = document.getElementById('mobileIchSelect');
                if (mobileIchSelect) mobileIchSelect.value = archetypValue;

                // Update archetype grid buttons to match loaded profile
                if (typeof window.updateArchetypeGrid === 'function') {
                    window.updateArchetypeGrid('ich', archetypValue);
                }
            }

            // Apply ProfileReview state (220 Bedürfnisse)
            if (data.profileReview) {
                applyProfileReviewState(data.profileReview);
            }

            // ═══════════════════════════════════════════════════════════════════════════
            // 2. Berechnete Werte aus LoadedArchetypProfile an UI weitergeben
            // ═══════════════════════════════════════════════════════════════════════════
            const loadedProfile = window.LoadedArchetypProfile?.ich;

            // Apply Gewichtungen für ICH (aus Storage oder berechnet)
            const gewichtungen = data.gewichtungen || loadedProfile?.gewichtungen;
            if (gewichtungen) {
                applyGewichtungen(gewichtungen, 'ich');
            }

            // Apply Resonanzfaktoren für ICH (aus Storage oder berechnet)
            const resonanzFaktoren = data.resonanzfaktoren || loadedProfile?.resonanzFaktoren;
            if (resonanzFaktoren) {
                applyResonanzfaktoren(resonanzFaktoren, 'ich');
                // Auch ResonanzCard UI aktualisieren
                if (typeof ResonanzCard !== 'undefined' && ResonanzCard.setCalculatedValues) {
                    const resonanzValues = {
                        R1: resonanzFaktoren.R1?.value || resonanzFaktoren.R1 || 1.0,
                        R2: resonanzFaktoren.R2?.value || resonanzFaktoren.R2 || 1.0,
                        R3: resonanzFaktoren.R3?.value || resonanzFaktoren.R3 || 1.0,
                        R4: resonanzFaktoren.R4?.value || resonanzFaktoren.R4 || 1.0
                    };
                    ResonanzCard.setCalculatedValues(resonanzValues, false, 'ich');
                    console.log('[MemoryManager] ResonanzCard UI (Ich) aktualisiert mit berechneten Werten');
                }
            }

            // Sync UI functions
            if (typeof window.syncGeschlechtUI === 'function') window.syncGeschlechtUI('ich');
            if (typeof window.syncDominanzUI === 'function') window.syncDominanzUI('ich');
            if (typeof window.syncOrientierungUI === 'function') window.syncOrientierungUI('ich');
            if (typeof window.saveSelectionToStorage === 'function') window.saveSelectionToStorage();
            if (typeof window.updateAll === 'function') window.updateAll();

            return true;
        } catch (e) {
            console.error('[MemoryManager] Error applying ME data:', e);
            return false;
        }
    }

    /**
     * Apply loaded data to PARTNER (COMPLETE PROFILE)
     *
     * Data Structure v3.0:
     * - archetyp: string
     * - geschlecht: { primary, secondary }
     * - dominanz: { primary, secondary }
     * - orientierung: { primary, secondary }
     */
    function applyPartnerData(data) {
        if (!data) return false;

        try {
            // ═══════════════════════════════════════════════════════════════════════════
            // 1. Profil berechnen und in LoadedArchetypProfile laden
            // ═══════════════════════════════════════════════════════════════════════════
            if (typeof ProfileCalculator !== 'undefined' && ProfileCalculator.loadProfile) {
                ProfileCalculator.loadProfile('partner', data);
                console.log('[MemoryManager] Partner-Profil über ProfileCalculator geladen');
            }

            // Archetyp: string (v3.0) oder { primary, secondary } (v2.0)
            const archetypValue = typeof data.archetyp === 'string'
                ? data.archetyp
                : data.archetyp?.primary || data.archetyp;

            if (typeof TiageState !== 'undefined') {
                if (data.geschlecht) {
                    TiageState.set('personDimensions.partner.geschlecht', data.geschlecht);
                }
                if (data.dominanz) {
                    TiageState.set('personDimensions.partner.dominanz', data.dominanz);
                }
                if (data.orientierung) {
                    TiageState.set('personDimensions.partner.orientierung', data.orientierung);
                }
                if (archetypValue) {
                    TiageState.set('archetypes.partner', { primary: archetypValue, secondary: null });
                }
                TiageState.saveToStorage();
            }

            // Also update global variables and UI
            if (typeof window.personDimensions !== 'undefined') {
                if (data.geschlecht) window.personDimensions.partner.geschlecht = data.geschlecht;
                if (data.dominanz) window.personDimensions.partner.dominanz = data.dominanz;
                if (data.orientierung) window.personDimensions.partner.orientierung = data.orientierung;
            }

            if (typeof window.mobilePersonDimensions !== 'undefined') {
                if (data.geschlecht) window.mobilePersonDimensions.partner.geschlecht = data.geschlecht;
                if (data.dominanz) window.mobilePersonDimensions.partner.dominanz = data.dominanz;
                if (data.orientierung) window.mobilePersonDimensions.partner.orientierung = data.orientierung;
            }

            // Update archetype selects
            if (archetypValue) {
                if (typeof mobilePartnerArchetype !== 'undefined') {
                    window.mobilePartnerArchetype = archetypValue;
                }
                if (typeof partnerArchetype !== 'undefined') {
                    window.partnerArchetype = archetypValue;
                }
                if (typeof selectedPartner !== 'undefined') {
                    window.selectedPartner = archetypValue;
                }
                const partnerSelect = document.getElementById('partnerSelect');
                if (partnerSelect) partnerSelect.value = archetypValue;
                const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
                if (mobilePartnerSelect) mobilePartnerSelect.value = archetypValue;

                // Update archetype grid buttons to match loaded profile
                if (typeof window.updateArchetypeGrid === 'function') {
                    window.updateArchetypeGrid('partner', archetypValue);
                }
            }

            // Apply ProfileReview state (220 Bedürfnisse)
            if (data.profileReview) {
                applyProfileReviewState(data.profileReview);
            }

            // ═══════════════════════════════════════════════════════════════════════════
            // 2. Berechnete Werte aus LoadedArchetypProfile an UI weitergeben
            // ═══════════════════════════════════════════════════════════════════════════
            const loadedProfile = window.LoadedArchetypProfile?.partner;

            // Apply Gewichtungen für PARTNER (aus Storage oder berechnet)
            const gewichtungen = data.gewichtungen || loadedProfile?.gewichtungen;
            if (gewichtungen) {
                applyGewichtungen(gewichtungen, 'partner');
            }

            // Apply Resonanzfaktoren für PARTNER (aus Storage oder berechnet)
            const resonanzFaktoren = data.resonanzfaktoren || loadedProfile?.resonanzFaktoren;
            if (resonanzFaktoren) {
                applyResonanzfaktoren(resonanzFaktoren, 'partner');
                // Auch ResonanzCard Storage aktualisieren für Partner
                if (typeof ResonanzCard !== 'undefined' && ResonanzCard.setCalculatedValues) {
                    const resonanzValues = {
                        R1: resonanzFaktoren.R1?.value || resonanzFaktoren.R1 || 1.0,
                        R2: resonanzFaktoren.R2?.value || resonanzFaktoren.R2 || 1.0,
                        R3: resonanzFaktoren.R3?.value || resonanzFaktoren.R3 || 1.0,
                        R4: resonanzFaktoren.R4?.value || resonanzFaktoren.R4 || 1.0
                    };
                    // Partner-Werte immer in Storage speichern, UI wird nur aktualisiert wenn Partner-Kontext aktiv
                    ResonanzCard.setCalculatedValues(resonanzValues, false, 'partner');
                    console.log('[MemoryManager] ResonanzCard Storage (Partner) aktualisiert');
                }
            }

            // Sync UI functions
            if (typeof window.syncGeschlechtUI === 'function') window.syncGeschlechtUI('partner');
            if (typeof window.syncDominanzUI === 'function') window.syncDominanzUI('partner');
            if (typeof window.syncOrientierungUI === 'function') window.syncOrientierungUI('partner');
            if (typeof window.saveSelectionToStorage === 'function') window.saveSelectionToStorage();
            if (typeof window.updateAll === 'function') window.updateAll();

            return true;
        } catch (e) {
            console.error('[MemoryManager] Error applying PARTNER data:', e);
            return false;
        }
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        MAX_SLOTS: MAX_SLOTS,

        /**
         * Get all slots info for display
         * @returns {Array} Array of slot info objects
         */
        getSlots() {
            const slots = [];
            for (let i = 1; i <= MAX_SLOTS; i++) {
                const meKey = getSlotKey('ME', i);
                const partKey = getSlotKey('PART', i);

                let meData = null;
                let partData = null;

                try {
                    const meRaw = localStorage.getItem(meKey);
                    const partRaw = localStorage.getItem(partKey);
                    if (meRaw) meData = JSON.parse(meRaw);
                    if (partRaw) partData = JSON.parse(partRaw);
                } catch (e) {
                    console.warn(`[MemoryManager] Error reading slot ${i}:`, e);
                }

                slots.push({
                    slot: i,
                    isEmpty: !meData && !partData,
                    me: meData ? {
                        timestamp: meData.timestamp,
                        dateTime: formatDateTime(meData.timestamp),
                        archetyp: meData.archetyp?.primary || meData.archetyp || '-',
                        appVersion: meData.appVersion || meData.version || '-'
                    } : null,
                    partner: partData ? {
                        timestamp: partData.timestamp,
                        dateTime: formatDateTime(partData.timestamp),
                        archetyp: partData.archetyp?.primary || partData.archetyp || '-',
                        appVersion: partData.appVersion || partData.version || '-'
                    } : null
                });
            }
            return slots;
        },

        /**
         * Save current ME + PARTNER data to a slot
         * @param {number} slotNumber - Slot number (1-4)
         * @returns {boolean} Success
         */
        saveToSlot(slotNumber) {
            if (slotNumber < 1 || slotNumber > MAX_SLOTS) {
                console.error('[MemoryManager] Invalid slot number:', slotNumber);
                return false;
            }

            try {
                const meData = collectMeData();
                const partData = collectPartnerData();

                const meKey = getSlotKey('ME', slotNumber);
                const partKey = getSlotKey('PART', slotNumber);

                localStorage.setItem(meKey, JSON.stringify(meData));
                localStorage.setItem(partKey, JSON.stringify(partData));

                console.log(`[MemoryManager] Saved to slot ${slotNumber}`);
                return true;
            } catch (e) {
                console.error('[MemoryManager] Save error:', e);
                return false;
            }
        },

        /**
         * Load ME data from a slot
         * @param {number} slotNumber - Slot number (1-4)
         * @returns {boolean} Success
         */
        loadMeFromSlot(slotNumber) {
            if (slotNumber < 1 || slotNumber > MAX_SLOTS) {
                console.error('[MemoryManager] Invalid slot number:', slotNumber);
                return false;
            }

            try {
                const meKey = getSlotKey('ME', slotNumber);
                const raw = localStorage.getItem(meKey);
                if (!raw) {
                    console.warn('[MemoryManager] Slot ME is empty:', slotNumber);
                    return false;
                }

                const data = JSON.parse(raw);
                const success = applyMeData(data);

                if (success) {
                    console.log(`[MemoryManager] Loaded ME from slot ${slotNumber}`);
                }
                return success;
            } catch (e) {
                console.error('[MemoryManager] Load ME error:', e);
                return false;
            }
        },

        /**
         * Load PARTNER data from a slot
         * @param {number} slotNumber - Slot number (1-4)
         * @returns {boolean} Success
         */
        loadPartnerFromSlot(slotNumber) {
            if (slotNumber < 1 || slotNumber > MAX_SLOTS) {
                console.error('[MemoryManager] Invalid slot number:', slotNumber);
                return false;
            }

            try {
                const partKey = getSlotKey('PART', slotNumber);
                const raw = localStorage.getItem(partKey);
                if (!raw) {
                    console.warn('[MemoryManager] Slot PART is empty:', slotNumber);
                    return false;
                }

                const data = JSON.parse(raw);
                const success = applyPartnerData(data);

                if (success) {
                    console.log(`[MemoryManager] Loaded PARTNER from slot ${slotNumber}`);
                }
                return success;
            } catch (e) {
                console.error('[MemoryManager] Load PARTNER error:', e);
                return false;
            }
        },

        /**
         * Load both ME and PARTNER from a slot
         * @param {number} slotNumber - Slot number (1-4)
         * @returns {boolean} Success
         */
        loadBothFromSlot(slotNumber) {
            const meSuccess = this.loadMeFromSlot(slotNumber);
            const partSuccess = this.loadPartnerFromSlot(slotNumber);
            return meSuccess || partSuccess;
        },

        /**
         * Delete a slot (both ME and PARTNER)
         * @param {number} slotNumber - Slot number (1-4)
         * @returns {boolean} Success
         */
        deleteSlot(slotNumber) {
            if (slotNumber < 1 || slotNumber > MAX_SLOTS) {
                console.error('[MemoryManager] Invalid slot number:', slotNumber);
                return false;
            }

            try {
                const meKey = getSlotKey('ME', slotNumber);
                const partKey = getSlotKey('PART', slotNumber);

                localStorage.removeItem(meKey);
                localStorage.removeItem(partKey);

                console.log(`[MemoryManager] Deleted slot ${slotNumber}`);
                return true;
            } catch (e) {
                console.error('[MemoryManager] Delete error:', e);
                return false;
            }
        },

        /**
         * Find first empty slot
         * @returns {number|null} Slot number (1-4) or null if all full
         */
        findEmptySlot() {
            const slots = this.getSlots();
            for (const slot of slots) {
                if (slot.isEmpty) {
                    return slot.slot;
                }
            }
            return null;
        },

        /**
         * Check if any slot is available
         * @returns {boolean}
         */
        hasEmptySlot() {
            return this.findEmptySlot() !== null;
        },

        /**
         * Get count of used slots
         * @returns {number}
         */
        getUsedSlotCount() {
            return this.getSlots().filter(s => !s.isEmpty).length;
        },

        /**
         * Format date/time for display
         */
        formatDateTime: formatDateTime,

        /**
         * Get raw data from a slot for display
         * @param {number} slotNumber - Slot number (1-4)
         * @param {string} type - 'ME' or 'PART'
         * @returns {Object|null} Raw slot data or null
         */
        getSlotRawData(slotNumber, type) {
            if (slotNumber < 1 || slotNumber > MAX_SLOTS) {
                return null;
            }
            try {
                const key = getSlotKey(type, slotNumber);
                const raw = localStorage.getItem(key);
                return raw ? JSON.parse(raw) : null;
            } catch (e) {
                console.warn('[MemoryManager] Error reading slot data:', e);
                return null;
            }
        },

        /**
         * Format profile review value to readable text
         * @param {number} value - 0, 50, or 100
         * @returns {string}
         */
        formatProfileReviewValue(value) {
            if (value === 0) return 'Links';
            if (value === 100) return 'Rechts';
            return 'Neutral';
        }
    };
})();

// ═══════════════════════════════════════════════════════════════════════════
// MODAL UI FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Open the Memory Management Modal
 */
function openMemoryModal() {
    const modal = document.getElementById('memoryModal');
    if (!modal) {
        console.error('[MemoryManager] Modal not found');
        return;
    }

    updateMemoryModalContent();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close the Memory Management Modal
 */
function closeMemoryModal(event) {
    if (event && event.target !== event.currentTarget) return;

    const modal = document.getElementById('memoryModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Update the modal content with current slots
 */
function updateMemoryModalContent() {
    const container = document.getElementById('memorySlotsList');
    if (!container) return;

    const slots = MemoryManager.getSlots();
    let html = '';

    for (const slot of slots) {
        const slotNum = slot.slot;
        const isEmpty = slot.isEmpty;

        html += `
        <div class="memory-slot ${isEmpty ? 'empty' : 'filled'}" data-slot="${slotNum}">
            <div class="memory-slot-header">
                <span class="memory-slot-number">Slot ${slotNum}</span>
                ${isEmpty ? '<span class="memory-slot-empty-badge">Leer</span>' : ''}
            </div>

            <div class="memory-slot-content">
                <!-- ME Info -->
                <div class="memory-slot-person">
                    <div class="memory-person-label">ME</div>
                    ${slot.me ? `
                        <div class="memory-person-info">
                            <span class="memory-timestamp">${slot.me.dateTime}</span>
                            <span class="memory-archetyp">${slot.me.archetyp}</span>
                            <span class="memory-version">v${slot.me.appVersion}</span>
                        </div>
                        <div class="memory-person-buttons">
                            <button class="memory-display-btn" onclick="handleDisplayPerson(${slotNum}, 'ME')" title="ME anzeigen">
                                <span>Anzeigen</span>
                            </button>
                            <button class="memory-load-btn" onclick="handleLoadMe(${slotNum})" title="ME laden">
                                <span>Laden</span>
                            </button>
                        </div>
                    ` : '<div class="memory-person-info empty">-</div>'}
                </div>

                <!-- PARTNER Info -->
                <div class="memory-slot-person">
                    <div class="memory-person-label">PARTNER</div>
                    ${slot.partner ? `
                        <div class="memory-person-info">
                            <span class="memory-timestamp">${slot.partner.dateTime}</span>
                            <span class="memory-archetyp">${slot.partner.archetyp}</span>
                            <span class="memory-version">v${slot.partner.appVersion}</span>
                        </div>
                        <div class="memory-person-buttons">
                            <button class="memory-display-btn" onclick="handleDisplayPerson(${slotNum}, 'PARTNER')" title="PARTNER anzeigen">
                                <span>Anzeigen</span>
                            </button>
                            <button class="memory-load-btn" onclick="handleLoadPartner(${slotNum})" title="PARTNER laden">
                                <span>Laden</span>
                            </button>
                        </div>
                    ` : '<div class="memory-person-info empty">-</div>'}
                </div>
            </div>

            <div class="memory-slot-actions">
                <button class="memory-save-btn" onclick="handleSaveToSlot(${slotNum})" title="In diesen Slot speichern">
                    Speichern
                </button>
                ${!isEmpty ? `
                    <button class="memory-load-both-btn" onclick="handleLoadBoth(${slotNum})" title="Beide laden">
                        Beide laden
                    </button>
                    <button class="memory-delete-btn" onclick="handleDeleteSlot(${slotNum})" title="Slot löschen">
                        Löschen
                    </button>
                ` : ''}
            </div>
        </div>
        `;
    }

    container.innerHTML = html;

    // Update slot count
    const countEl = document.getElementById('memorySlotCount');
    if (countEl) {
        const used = MemoryManager.getUsedSlotCount();
        countEl.textContent = `${used}/${MemoryManager.MAX_SLOTS}`;
    }
}

/**
 * Handle save to slot
 */
function handleSaveToSlot(slotNumber) {
    const success = MemoryManager.saveToSlot(slotNumber);
    if (success) {
        updateMemoryModalContent();
        showMemoryToast('Gespeichert in Slot ' + slotNumber);
    } else {
        showMemoryToast('Fehler beim Speichern', 'error');
    }
}

/**
 * Handle load ME
 */
function handleLoadMe(slotNumber) {
    const success = MemoryManager.loadMeFromSlot(slotNumber);
    if (success) {
        showMemoryToast('ME geladen aus Slot ' + slotNumber);
        closeMemoryModal();
    } else {
        showMemoryToast('Fehler beim Laden', 'error');
    }
}

/**
 * Handle load PARTNER
 */
function handleLoadPartner(slotNumber) {
    const success = MemoryManager.loadPartnerFromSlot(slotNumber);
    if (success) {
        showMemoryToast('PARTNER geladen aus Slot ' + slotNumber);
        closeMemoryModal();
    } else {
        showMemoryToast('Fehler beim Laden', 'error');
    }
}

/**
 * Handle load both
 */
function handleLoadBoth(slotNumber) {
    const success = MemoryManager.loadBothFromSlot(slotNumber);
    if (success) {
        showMemoryToast('Beide geladen aus Slot ' + slotNumber);
        closeMemoryModal();
    } else {
        showMemoryToast('Fehler beim Laden', 'error');
    }
}

/**
 * Handle delete slot
 */
function handleDeleteSlot(slotNumber) {
    if (!confirm(`Slot ${slotNumber} wirklich löschen?`)) {
        return;
    }

    const success = MemoryManager.deleteSlot(slotNumber);
    if (success) {
        updateMemoryModalContent();
        showMemoryToast('Slot ' + slotNumber + ' gelöscht');
    } else {
        showMemoryToast('Fehler beim Löschen', 'error');
    }
}

/**
 * Handle display slot data for a person (ME or PARTNER)
 */
function handleDisplayPerson(slotNumber, personType) {
    const type = personType === 'ME' ? 'ME' : 'PART';
    const data = MemoryManager.getSlotRawData(slotNumber, type);

    if (!data) {
        showMemoryToast('Keine Daten in diesem Slot', 'error');
        return;
    }

    openMemoryDetailModal(slotNumber, personType, data);
}

/**
 * Generate needs breakdown HTML showing base value + modifiers = final value
 * @param {Object} data - The saved profile data containing archetyp, geschlecht, dominanz, orientierung, and flatNeeds
 * @returns {string} HTML string with the breakdown table
 */
function generateNeedsBreakdown(data) {
    // Get profile context - handle both string and object formats
    const archetyp = data.archetyp?.primary || data.archetyp;

    // Extract geschlecht key (e.g., "mann-cis" from { primary: "mann", secondary: "cis" })
    let geschlechtKey = null;
    let geschlechtDisplay = '-';
    if (data.geschlecht) {
        if (typeof data.geschlecht === 'string') {
            geschlechtKey = data.geschlecht;
            geschlechtDisplay = data.geschlecht;
        } else if (data.geschlecht.primary && data.geschlecht.secondary) {
            geschlechtKey = `${data.geschlecht.primary}-${data.geschlecht.secondary}`;
            geschlechtDisplay = geschlechtKey;
        }
    }

    // Extract dominanz key
    let dominanzKey = null;
    let dominanzDisplay = '-';
    if (data.dominanz) {
        if (typeof data.dominanz === 'string') {
            dominanzKey = data.dominanz;
            dominanzDisplay = data.dominanz;
        } else if (data.dominanz.primary) {
            dominanzKey = data.dominanz.primary;
            dominanzDisplay = data.dominanz.primary;
        }
    }

    // Extract orientierung key
    let orientierungKey = null;
    let orientierungDisplay = '-';
    if (data.orientierung) {
        if (typeof data.orientierung === 'string') {
            orientierungKey = data.orientierung;
            orientierungDisplay = data.orientierung;
        } else if (data.orientierung.primary) {
            orientierungKey = data.orientierung.primary;
            orientierungDisplay = data.orientierung.primary;
        }
    }

    const flatNeeds = data.profileReview?.flatNeeds;

    // Check if we have all required data
    if (!archetyp || !flatNeeds) {
        return '<div class="memory-breakdown-info">Keine Aufschlüsselung verfügbar (fehlende Profildaten)</div>';
    }

    // Get base values from archetype profile
    let baseNeeds = {};
    if (typeof GfkBeduerfnisse !== 'undefined' && GfkBeduerfnisse.archetypProfile) {
        const profil = GfkBeduerfnisse.archetypProfile[archetyp];
        if (profil && profil.kernbeduerfnisse) {
            baseNeeds = profil.kernbeduerfnisse;
        }
    }

    // Get modifiers from TiageProfileStore
    let genderMods = {};
    let dominanceMods = {};
    let orientationMods = {};

    if (typeof TiageProfileStore !== 'undefined' && TiageProfileStore.getNeedsModifiers) {
        const allMods = TiageProfileStore.getNeedsModifiers();
        if (allMods) {
            genderMods = allMods.gender?.[geschlechtKey] || {};
            dominanceMods = allMods.dominance?.[dominanzKey] || {};
            orientationMods = allMods.orientation?.[orientierungKey] || {};
        }
    }

    // Build breakdown table
    let html = '<div class="memory-breakdown-table">';

    // Header with profile context
    html += `<div class="memory-breakdown-header">
        <span><strong>Archetyp:</strong> ${archetyp}</span>
        <span><strong>Geschlecht:</strong> ${geschlechtDisplay}</span>
        <span><strong>Dominanz:</strong> ${dominanzDisplay}</span>
        <span><strong>Orientierung:</strong> ${orientierungDisplay}</span>
    </div>`;

    // Convert flatNeeds to array if it's an object
    const needsArray = Array.isArray(flatNeeds) ? flatNeeds :
        Object.entries(flatNeeds).map(([key, val]) => ({
            stringKey: key,
            value: typeof val === 'object' ? val.value : val
        }));

    // Filter to show only needs with modifiers or significant differences
    const needsWithBreakdown = needsArray
        .filter(need => {
            const stringKey = need.stringKey;
            const hasModifier = genderMods[stringKey] || dominanceMods[stringKey] || orientationMods[stringKey];
            return hasModifier; // Only show needs that have modifiers applied
        })
        .slice(0, 30); // Limit to 30 entries for readability

    if (needsWithBreakdown.length === 0) {
        html += '<div class="memory-breakdown-info">Keine Modifikatoren für dieses Profil aktiv</div>';
    } else {
        html += '<table class="memory-breakdown-entries">';
        html += `<thead><tr>
            <th>Bedürfnis</th>
            <th>Basis</th>
            <th>Gender</th>
            <th>Dominanz</th>
            <th>Orient.</th>
            <th>=</th>
            <th>Final</th>
        </tr></thead><tbody>`;

        needsWithBreakdown.forEach(need => {
            const stringKey = need.stringKey;
            const finalValue = need.value;
            // Convert string key to #ID for lookup in kernbeduerfnisse (which uses #ID keys)
            const hashId = (typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.toId)
                ? BeduerfnisIds.toId(stringKey)
                : stringKey;
            const baseValue = baseNeeds[hashId] ?? baseNeeds[stringKey] ?? 50;
            const genderMod = genderMods[stringKey] || 0;
            const dominanceMod = dominanceMods[stringKey] || 0;
            const orientationMod = orientationMods[stringKey] || 0;
            const calculatedValue = Math.max(0, Math.min(100, baseValue + genderMod + dominanceMod + orientationMod));

            // Format modifiers with + or - sign
            const formatMod = (val) => val === 0 ? '-' : (val > 0 ? `+${val}` : `${val}`);

            html += `<tr>
                <td class="breakdown-need-name">${stringKey}</td>
                <td class="breakdown-base">${baseValue}</td>
                <td class="breakdown-mod ${genderMod !== 0 ? (genderMod > 0 ? 'positive' : 'negative') : ''}">${formatMod(genderMod)}</td>
                <td class="breakdown-mod ${dominanceMod !== 0 ? (dominanceMod > 0 ? 'positive' : 'negative') : ''}">${formatMod(dominanceMod)}</td>
                <td class="breakdown-mod ${orientationMod !== 0 ? (orientationMod > 0 ? 'positive' : 'negative') : ''}">${formatMod(orientationMod)}</td>
                <td class="breakdown-equals">=</td>
                <td class="breakdown-final">${calculatedValue}</td>
            </tr>`;
        });

        html += '</tbody></table>';
    }

    html += '</div>';
    return html;
}

/**
 * Open the detail modal to display slot data
 */
function openMemoryDetailModal(slotNumber, personType, data) {
    const modal = document.getElementById('memoryDetailModal');
    if (!modal) {
        console.error('[MemoryManager] Detail modal not found');
        return;
    }

    // Update title
    const titleEl = modal.querySelector('.memory-detail-title');
    if (titleEl) {
        titleEl.textContent = `Slot ${slotNumber} - ${personType}`;
    }

    // Build content
    const contentEl = document.getElementById('memoryDetailContent');
    if (!contentEl) return;

    let html = '';

    // Metadata Section
    html += `
        <div class="memory-detail-section">
            <div class="memory-detail-section-title">Metadaten</div>
            <div class="memory-detail-grid">
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Gespeichert</span>
                    <span class="memory-detail-value">${MemoryManager.formatDateTime(data.timestamp)}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">App-Version</span>
                    <span class="memory-detail-value">v${data.appVersion || data.version || '-'}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Daten-Version</span>
                    <span class="memory-detail-value">${data.dataVersion || '1.0'}</span>
                </div>
            </div>
        </div>
    `;

    // Needs Breakdown Section (collapsible)
    html += `
        <div class="memory-detail-section">
            <div class="memory-detail-section-title" onclick="this.parentElement.classList.toggle('expanded')" style="cursor: pointer;">
                Bedürfnis-Aufschlüsselung <span class="memory-detail-expand-icon">+</span>
            </div>
            <div class="memory-detail-breakdown">
                ${generateNeedsBreakdown(data)}
            </div>
        </div>
    `;

    // Raw JSON Section (collapsible)
    html += `
        <div class="memory-detail-section">
            <div class="memory-detail-section-title" onclick="this.parentElement.classList.toggle('expanded')" style="cursor: pointer;">
                Rohdaten (JSON) <span class="memory-detail-expand-icon">+</span>
            </div>
            <div class="memory-detail-raw-json">
                <pre>${JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    `;

    contentEl.innerHTML = html;

    // Show modal
    modal.classList.add('active');
}

/**
 * Close the detail modal
 */
function closeMemoryDetailModal(event) {
    if (event && event.target !== event.currentTarget) return;

    const modal = document.getElementById('memoryDetailModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

/**
 * Show a toast notification
 */
function showMemoryToast(message, type = 'success') {
    // Remove existing toast
    const existing = document.querySelector('.memory-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `memory-toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.classList.add('show');
    });

    // Remove after delay
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

// Export for ES6 modules (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = MemoryManager;
}
