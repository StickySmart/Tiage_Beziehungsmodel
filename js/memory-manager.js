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
     * Collect ProfileReview state - ALL 22 Attributes + Flat Needs
     * Dynamisch aus ProfileReviewConfig laden wenn verfügbar
     * NEU: Sammelt auch die echten Bedürfniswerte aus AttributeSummaryCard
     */
    function collectProfileReviewState(person) {
        const state = {
            attributes: {},
            flatNeeds: null,
            flatLockedNeeds: null
        };

        // NEU: Sammle echte Bedürfniswerte aus AttributeSummaryCard (Primary Source)
        if (typeof AttributeSummaryCard !== 'undefined' && AttributeSummaryCard.getFlatNeedsValues) {
            state.flatNeeds = AttributeSummaryCard.getFlatNeedsValues();
            state.flatLockedNeeds = AttributeSummaryCard.getFlatLockedNeeds ?
                AttributeSummaryCard.getFlatLockedNeeds() : null;
        }

        // Sammle Attribut-Werte (Secondary, für Kompatibilität)
        // Wenn ProfileReviewConfig verfügbar, dynamisch alle Attribute holen
        if (typeof ProfileReviewConfig !== 'undefined') {
            const allAttrs = ProfileReviewConfig.getAllAttributes();
            allAttrs.forEach(attr => {
                const attrId = attr.attrId;
                const key = attrId.replace('pr-', '').replace(/-/g, '_');
                state.attributes[key] = getTripleBtnValue(attrId);
            });
        } else {
            // Fallback: Alle bekannten Attribute manuell
            // Kategorie: Geschlechtsidentität
            state.attributes.geschlecht_sekundaer = getTripleBtnValue('pr-geschlecht-sekundaer');

            // Kategorie: Lebensplanung (6)
            state.attributes.kinder = getTripleBtnValue('pr-kinder');
            state.attributes.ehe = getTripleBtnValue('pr-ehe');
            state.attributes.zusammen = getTripleBtnValue('pr-zusammen');
            state.attributes.haustiere = getTripleBtnValue('pr-haustiere');
            state.attributes.umzug = getTripleBtnValue('pr-umzug');
            state.attributes.familie = getTripleBtnValue('pr-familie');

            // Kategorie: Finanzen (2)
            state.attributes.finanzen = getTripleBtnValue('pr-finanzen');
            state.attributes.karriere = getTripleBtnValue('pr-karriere');

            // Kategorie: Kommunikation (3)
            state.attributes.gespraech = getTripleBtnValue('pr-gespraech');
            state.attributes.emotional = getTripleBtnValue('pr-emotional');
            state.attributes.konflikt = getTripleBtnValue('pr-konflikt');

            // Kategorie: Soziales (3)
            state.attributes.introextro = getTripleBtnValue('pr-introextro');
            state.attributes.alleinzeit = getTripleBtnValue('pr-alleinzeit');
            state.attributes.freunde = getTripleBtnValue('pr-freunde');

            // Kategorie: Intimität (3)
            state.attributes.naehe = getTripleBtnValue('pr-naehe');
            state.attributes.romantik = getTripleBtnValue('pr-romantik');
            state.attributes.sex = getTripleBtnValue('pr-sex');

            // Kategorie: Werte (3)
            state.attributes.religion = getTripleBtnValue('pr-religion');
            state.attributes.tradition = getTripleBtnValue('pr-tradition');
            state.attributes.umwelt = getTripleBtnValue('pr-umwelt');

            // Kategorie: Praktisches (2)
            state.attributes.ordnung = getTripleBtnValue('pr-ordnung');
            state.attributes.reise = getTripleBtnValue('pr-reise');
        }

        return state;
    }

    /**
     * Collect Gewichtungen (factor weights)
     */
    function collectGewichtungen() {
        try {
            const stored = localStorage.getItem('tiage_faktor_gewichtungen');
            return stored ? JSON.parse(stored) : null;
        } catch (e) {
            return null;
        }
    }

    /**
     * Collect Gewichtung Locks
     */
    function collectGewichtungLocks() {
        try {
            const stored = localStorage.getItem('tiage_faktor_locks');
            return stored ? JSON.parse(stored) : null;
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
     */
    function collectMeData() {
        const data = {
            timestamp: Date.now(),
            dataVersion: '2.0',
            appVersion: getAppVersion(),
            archetyp: null,
            geschlecht: null,
            dominanz: null,
            orientierung: null,
            profileReview: null,
            gewichtungen: null,
            gewichtungLocks: null
        };

        // Get from TiageState if available
        if (typeof TiageState !== 'undefined') {
            data.archetyp = TiageState.getArchetypes('ich');
            data.geschlecht = TiageState.get('personDimensions.ich.geschlecht');
            data.dominanz = TiageState.get('personDimensions.ich.dominanz');
            data.orientierung = TiageState.get('personDimensions.ich.orientierung');
        } else if (typeof personDimensions !== 'undefined') {
            // Fallback to global personDimensions
            data.geschlecht = personDimensions.ich?.geschlecht;
            data.dominanz = personDimensions.ich?.dominanz;
            data.orientierung = personDimensions.ich?.orientierung;
            if (typeof mobileIchArchetype !== 'undefined') {
                data.archetyp = { primary: mobileIchArchetype, secondary: null };
            }
        }

        // Collect ProfileReview state (Bedürfnisse)
        data.profileReview = collectProfileReviewState('ich');

        // Collect Gewichtungen
        data.gewichtungen = collectGewichtungen();
        data.gewichtungLocks = collectGewichtungLocks();

        return data;
    }

    /**
     * Collect current PARTNER data from state (COMPLETE PROFILE)
     */
    function collectPartnerData() {
        const data = {
            timestamp: Date.now(),
            dataVersion: '2.0',
            appVersion: getAppVersion(),
            archetyp: null,
            geschlecht: null,
            dominanz: null,
            orientierung: null,
            profileReview: null,
            gewichtungen: null,
            gewichtungLocks: null
        };

        // Get from TiageState if available
        if (typeof TiageState !== 'undefined') {
            data.archetyp = TiageState.getArchetypes('partner');
            data.geschlecht = TiageState.get('personDimensions.partner.geschlecht');
            data.dominanz = TiageState.get('personDimensions.partner.dominanz');
            data.orientierung = TiageState.get('personDimensions.partner.orientierung');
        } else if (typeof personDimensions !== 'undefined') {
            // Fallback to global personDimensions
            data.geschlecht = personDimensions.partner?.geschlecht;
            data.dominanz = personDimensions.partner?.dominanz;
            data.orientierung = personDimensions.partner?.orientierung;
            if (typeof mobilePartnerArchetype !== 'undefined') {
                data.archetyp = { primary: mobilePartnerArchetype, secondary: null };
            }
        }

        // Collect ProfileReview state (Bedürfnisse)
        data.profileReview = collectProfileReviewState('partner');

        // Collect Gewichtungen (same as ME since they're global)
        data.gewichtungen = collectGewichtungen();
        data.gewichtungLocks = collectGewichtungLocks();

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
     * Apply ProfileReview state - ALL 22 Attributes + Flat Needs
     * Dynamisch aus ProfileReviewConfig laden wenn verfügbar
     * NEU: Unterstützt neue Struktur mit flatNeeds + attributes
     */
    function applyProfileReviewState(profileReview) {
        if (!profileReview) return;

        // NEU: Lade flatNeeds in AttributeSummaryCard (Primary Source)
        if (profileReview.flatNeeds && typeof AttributeSummaryCard !== 'undefined') {
            if (AttributeSummaryCard.setFlatNeedsValues) {
                AttributeSummaryCard.setFlatNeedsValues(profileReview.flatNeeds);
                console.log('[MemoryManager] FlatNeeds geladen:', Object.keys(profileReview.flatNeeds).length, 'Werte');
            }
            if (profileReview.flatLockedNeeds && AttributeSummaryCard.setFlatLockedNeeds) {
                AttributeSummaryCard.setFlatLockedNeeds(profileReview.flatLockedNeeds);
            }
        }

        // Extrahiere attributes aus neuer oder alter Struktur
        const attributes = profileReview.attributes || profileReview;

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
     * Apply Gewichtungen (factor weights)
     */
    function applyGewichtungen(gewichtungen) {
        if (!gewichtungen) return;
        try {
            localStorage.setItem('tiage_faktor_gewichtungen', JSON.stringify(gewichtungen));
        } catch (e) {
            console.warn('[MemoryManager] Could not save Gewichtungen:', e);
        }
    }

    /**
     * Apply Gewichtung Locks
     */
    function applyGewichtungLocks(locks) {
        if (!locks) return;
        try {
            localStorage.setItem('tiage_faktor_locks', JSON.stringify(locks));
        } catch (e) {
            console.warn('[MemoryManager] Could not save Gewichtung Locks:', e);
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
     */
    function applyMeData(data) {
        if (!data) return false;

        try {
            // Check version compatibility
            const versionInfo = checkVersionCompatibility(data);
            if (versionInfo.isOlder) {
                showVersionWarning(versionInfo.savedVersion, versionInfo.currentVersion, 'ME');
            }

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
                if (data.archetyp) {
                    TiageState.set('archetypes.ich', data.archetyp);
                }
                TiageState.saveToStorage();
            }

            // Also update global variables and UI
            if (typeof personDimensions !== 'undefined') {
                if (data.geschlecht) personDimensions.ich.geschlecht = data.geschlecht;
                if (data.dominanz) personDimensions.ich.dominanz = data.dominanz;
                if (data.orientierung) personDimensions.ich.orientierung = data.orientierung;
            }

            if (typeof mobilePersonDimensions !== 'undefined') {
                if (data.geschlecht) mobilePersonDimensions.ich.geschlecht = data.geschlecht;
                if (data.dominanz) mobilePersonDimensions.ich.dominanz = data.dominanz;
                if (data.orientierung) mobilePersonDimensions.ich.orientierung = data.orientierung;
            }

            // Update archetype selects
            if (data.archetyp) {
                const archetypValue = data.archetyp.primary || data.archetyp;
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
            }

            // Apply ProfileReview state (Bedürfnisse)
            if (data.profileReview) {
                applyProfileReviewState(data.profileReview);
            }

            // Apply Gewichtungen
            if (data.gewichtungen) {
                applyGewichtungen(data.gewichtungen);
            }
            if (data.gewichtungLocks) {
                applyGewichtungLocks(data.gewichtungLocks);
            }

            // Sync UI functions (use window.* as they're exposed globally in app-main.js)
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
     * Apply loaded data to PARTNER
     */
    function applyPartnerData(data) {
        if (!data) return false;

        try {
            // Check version compatibility
            const versionInfo = checkVersionCompatibility(data);
            if (versionInfo.isOlder) {
                showVersionWarning(versionInfo.savedVersion, versionInfo.currentVersion, 'PARTNER');
            }

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
                if (data.archetyp) {
                    TiageState.set('archetypes.partner', data.archetyp);
                }
                TiageState.saveToStorage();
            }

            // Also update global variables and UI
            if (typeof personDimensions !== 'undefined') {
                if (data.geschlecht) personDimensions.partner.geschlecht = data.geschlecht;
                if (data.dominanz) personDimensions.partner.dominanz = data.dominanz;
                if (data.orientierung) personDimensions.partner.orientierung = data.orientierung;
            }

            if (typeof mobilePersonDimensions !== 'undefined') {
                if (data.geschlecht) mobilePersonDimensions.partner.geschlecht = data.geschlecht;
                if (data.dominanz) mobilePersonDimensions.partner.dominanz = data.dominanz;
                if (data.orientierung) mobilePersonDimensions.partner.orientierung = data.orientierung;
            }

            // Update archetype selects
            if (data.archetyp) {
                const archetypValue = data.archetyp.primary || data.archetyp;
                if (typeof mobilePartnerArchetype !== 'undefined') {
                    window.mobilePartnerArchetype = archetypValue;
                }
                if (typeof partnerArchetype !== 'undefined') {
                    window.partnerArchetype = archetypValue;
                }
                const partnerSelect = document.getElementById('partnerSelect');
                if (partnerSelect) partnerSelect.value = archetypValue;
                const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
                if (mobilePartnerSelect) mobilePartnerSelect.value = archetypValue;
            }

            // Apply ProfileReview state (Bedürfnisse)
            if (data.profileReview) {
                applyProfileReviewState(data.profileReview);
            }

            // Apply Gewichtungen
            if (data.gewichtungen) {
                applyGewichtungen(data.gewichtungen);
            }
            if (data.gewichtungLocks) {
                applyGewichtungLocks(data.gewichtungLocks);
            }

            // Sync UI functions (use window.* as they're exposed globally in app-main.js)
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

    // Helper to format any value (handles objects, arrays, primitives)
    const formatValue = (val) => {
        if (val === null || val === undefined) return '-';
        if (typeof val === 'object') return JSON.stringify(val, null, 2);
        return String(val);
    };

    // Helper to format value for inline display
    const formatInline = (val) => {
        if (val === null || val === undefined) return '-';
        if (typeof val === 'object') return JSON.stringify(val);
        return String(val);
    };

    let html = '';

    // Grunddaten Section
    html += `
        <div class="memory-detail-section">
            <div class="memory-detail-section-title">Grunddaten</div>
            <div class="memory-detail-grid">
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Archetyp</span>
                    <span class="memory-detail-value">${formatInline(data.archetyp)}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Geschlecht</span>
                    <span class="memory-detail-value">${formatInline(data.geschlecht)}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Dominanz</span>
                    <span class="memory-detail-value">${formatInline(data.dominanz)}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Orientierung</span>
                    <span class="memory-detail-value">${formatInline(data.orientierung)}</span>
                </div>
            </div>
        </div>
    `;

    // ProfileReview Section (Bedürfnisse) - NEU: Unterstützt flatNeeds + attributes
    if (data.profileReview && Object.keys(data.profileReview).length > 0) {
        // NEU: Prüfe ob flatNeeds vorhanden (echte 220 Bedürfnisse aus Archetyp-Profil)
        if (data.profileReview.flatNeeds && Object.keys(data.profileReview.flatNeeds).length > 0) {
            const needsCount = Object.keys(data.profileReview.flatNeeds).length;
            const lockedCount = data.profileReview.flatLockedNeeds
                ? Object.keys(data.profileReview.flatLockedNeeds).filter(k => data.profileReview.flatLockedNeeds[k]).length
                : 0;
            html += `
                <div class="memory-detail-section">
                    <div class="memory-detail-section-title">Bedürfnisse (${needsCount} Werte${lockedCount > 0 ? `, ${lockedCount} gesperrt` : ''})</div>
                    <div class="memory-detail-raw-data">${formatValue(data.profileReview.flatNeeds)}</div>
                </div>
            `;
        }

        // Attribute-Werte (Sekundär, für Kompatibilität)
        const attributes = data.profileReview.attributes || data.profileReview;
        if (attributes && Object.keys(attributes).length > 0 && !data.profileReview.flatNeeds) {
            // Nur anzeigen wenn keine flatNeeds vorhanden (Legacy-Daten)
            html += `
                <div class="memory-detail-section">
                    <div class="memory-detail-section-title">Attribute (Legacy)</div>
                    <div class="memory-detail-raw-data">${formatValue(attributes)}</div>
                </div>
            `;
        }
    }

    // Gewichtungen Section
    if (data.gewichtungen && Object.keys(data.gewichtungen).length > 0) {
        html += `
            <div class="memory-detail-section">
                <div class="memory-detail-section-title">Gewichtungen (Faktoren)</div>
                <div class="memory-detail-raw-data">${formatValue(data.gewichtungen)}</div>
            </div>
        `;
    }

    // Gewichtung Locks Section
    if (data.gewichtungLocks && Object.keys(data.gewichtungLocks).length > 0) {
        html += `
            <div class="memory-detail-section">
                <div class="memory-detail-section-title">Gewichtung Locks</div>
                <div class="memory-detail-raw-data">${formatValue(data.gewichtungLocks)}</div>
            </div>
        `;
    }

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
