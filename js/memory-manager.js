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
     * Collect ProfileReview state - ALL 22 Attributes
     * Dynamisch aus ProfileReviewConfig laden wenn verfügbar
     */
    function collectProfileReviewState(person) {
        const state = {};

        // Wenn ProfileReviewConfig verfügbar, dynamisch alle Attribute holen
        if (typeof ProfileReviewConfig !== 'undefined') {
            const allAttrs = ProfileReviewConfig.getAllAttributes();
            allAttrs.forEach(attr => {
                const attrId = attr.attrId;
                const key = attrId.replace('pr-', '').replace(/-/g, '_');
                state[key] = getTripleBtnValue(attrId);
            });
        } else {
            // Fallback: Alle bekannten Attribute manuell
            // Kategorie: Geschlechtsidentität
            state.geschlecht_sekundaer = getTripleBtnValue('pr-geschlecht-sekundaer');

            // Kategorie: Lebensplanung (6)
            state.kinder = getTripleBtnValue('pr-kinder');
            state.ehe = getTripleBtnValue('pr-ehe');
            state.zusammen = getTripleBtnValue('pr-zusammen');
            state.haustiere = getTripleBtnValue('pr-haustiere');
            state.umzug = getTripleBtnValue('pr-umzug');
            state.familie = getTripleBtnValue('pr-familie');

            // Kategorie: Finanzen (2)
            state.finanzen = getTripleBtnValue('pr-finanzen');
            state.karriere = getTripleBtnValue('pr-karriere');

            // Kategorie: Kommunikation (3)
            state.gespraech = getTripleBtnValue('pr-gespraech');
            state.emotional = getTripleBtnValue('pr-emotional');
            state.konflikt = getTripleBtnValue('pr-konflikt');

            // Kategorie: Soziales (3)
            state.introextro = getTripleBtnValue('pr-introextro');
            state.alleinzeit = getTripleBtnValue('pr-alleinzeit');
            state.freunde = getTripleBtnValue('pr-freunde');

            // Kategorie: Intimität (3)
            state.naehe = getTripleBtnValue('pr-naehe');
            state.romantik = getTripleBtnValue('pr-romantik');
            state.sex = getTripleBtnValue('pr-sex');

            // Kategorie: Werte (3)
            state.religion = getTripleBtnValue('pr-religion');
            state.tradition = getTripleBtnValue('pr-tradition');
            state.umwelt = getTripleBtnValue('pr-umwelt');

            // Kategorie: Praktisches (2)
            state.ordnung = getTripleBtnValue('pr-ordnung');
            state.reise = getTripleBtnValue('pr-reise');
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
     * Apply ProfileReview state - ALL 22 Attributes
     * Dynamisch aus ProfileReviewConfig laden wenn verfügbar
     */
    function applyProfileReviewState(profileReview) {
        if (!profileReview) return;

        // Wenn ProfileReviewConfig verfügbar, dynamisch alle Attribute setzen
        if (typeof ProfileReviewConfig !== 'undefined') {
            const allAttrs = ProfileReviewConfig.getAllAttributes();
            allAttrs.forEach(attr => {
                const attrId = attr.attrId;
                const key = attrId.replace('pr-', '').replace(/-/g, '_');
                if (profileReview[key] !== undefined) {
                    setTripleBtnValue(attrId, profileReview[key]);
                }
            });
        } else {
            // Fallback: Alle bekannten Attribute manuell setzen
            // Geschlechtsidentität
            if (profileReview.geschlecht_sekundaer !== undefined) {
                setTripleBtnValue('pr-geschlecht-sekundaer', profileReview.geschlecht_sekundaer);
            }
            // Legacy-Support für alte Speicherformate
            if (profileReview.geschlechtsidentitaet !== undefined) {
                setTripleBtnValue('pr-geschlecht-sekundaer', profileReview.geschlechtsidentitaet);
            }

            // Lebensplanung
            if (profileReview.kinder !== undefined) setTripleBtnValue('pr-kinder', profileReview.kinder);
            if (profileReview.ehe !== undefined) setTripleBtnValue('pr-ehe', profileReview.ehe);
            if (profileReview.zusammen !== undefined) setTripleBtnValue('pr-zusammen', profileReview.zusammen);
            if (profileReview.haustiere !== undefined) setTripleBtnValue('pr-haustiere', profileReview.haustiere);
            if (profileReview.umzug !== undefined) setTripleBtnValue('pr-umzug', profileReview.umzug);
            if (profileReview.familie !== undefined) setTripleBtnValue('pr-familie', profileReview.familie);

            // Finanzen
            if (profileReview.finanzen !== undefined) setTripleBtnValue('pr-finanzen', profileReview.finanzen);
            if (profileReview.karriere !== undefined) setTripleBtnValue('pr-karriere', profileReview.karriere);

            // Kommunikation
            if (profileReview.gespraech !== undefined) setTripleBtnValue('pr-gespraech', profileReview.gespraech);
            if (profileReview.emotional !== undefined) setTripleBtnValue('pr-emotional', profileReview.emotional);
            if (profileReview.konflikt !== undefined) setTripleBtnValue('pr-konflikt', profileReview.konflikt);

            // Soziales
            if (profileReview.introextro !== undefined) setTripleBtnValue('pr-introextro', profileReview.introextro);
            if (profileReview.alleinzeit !== undefined) setTripleBtnValue('pr-alleinzeit', profileReview.alleinzeit);
            if (profileReview.freunde !== undefined) setTripleBtnValue('pr-freunde', profileReview.freunde);

            // Intimität
            if (profileReview.naehe !== undefined) setTripleBtnValue('pr-naehe', profileReview.naehe);
            if (profileReview.romantik !== undefined) setTripleBtnValue('pr-romantik', profileReview.romantik);
            if (profileReview.sex !== undefined) setTripleBtnValue('pr-sex', profileReview.sex);

            // Werte
            if (profileReview.religion !== undefined) setTripleBtnValue('pr-religion', profileReview.religion);
            if (profileReview.tradition !== undefined) setTripleBtnValue('pr-tradition', profileReview.tradition);
            if (profileReview.umwelt !== undefined) setTripleBtnValue('pr-umwelt', profileReview.umwelt);

            // Praktisches
            if (profileReview.ordnung !== undefined) setTripleBtnValue('pr-ordnung', profileReview.ordnung);
            if (profileReview.reise !== undefined) setTripleBtnValue('pr-reise', profileReview.reise);
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
// PROFILE STATUS UI FUNCTIONS
// Updates the status badges next to DU/PARTNER headers
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Update the profile status badge for a person
 * @param {string} person - 'ich' or 'partner'
 */
function updateProfileStatusBadge(person) {
    if (typeof TiageState === 'undefined') return;

    const status = TiageState.getProfileStatus(person);
    const slot = status?.loadedSlot;
    const isDirty = status?.isDirty;

    // Get all badge elements (desktop and mobile)
    const badgeIds = person === 'ich'
        ? ['ich-profile-status', 'mobile-ich-profile-status']
        : ['partner-profile-status', 'mobile-partner-profile-status'];

    badgeIds.forEach(id => {
        const badge = document.getElementById(id);
        if (!badge) return;

        if (slot === null) {
            // No slot loaded - hide badge
            badge.textContent = '';
            badge.className = 'profile-status-badge';
        } else {
            // Show slot number with status
            badge.textContent = `Slot ${slot}`;
            badge.className = isDirty
                ? 'profile-status-badge unsaved'
                : 'profile-status-badge saved';
        }
    });
}

/**
 * Update all profile status badges
 */
function updateAllProfileStatusBadges() {
    updateProfileStatusBadge('ich');
    updateProfileStatusBadge('partner');
}

/**
 * Initialize profile status tracking
 * Subscribe to TiageState changes to update badges
 */
function initProfileStatusTracking() {
    if (typeof TiageState === 'undefined') {
        console.warn('[MemoryManager] TiageState not available for status tracking');
        return;
    }

    // Subscribe to profileStatus changes
    TiageState.subscribe('profileStatus', () => {
        updateAllProfileStatusBadges();
    });

    // Subscribe to relevant state changes to mark as dirty
    TiageState.subscribe('personDimensions.ich', () => {
        const slot = TiageState.getLoadedSlot('ich');
        if (slot !== null) {
            TiageState.markDirty('ich');
        }
    });

    TiageState.subscribe('personDimensions.partner', () => {
        const slot = TiageState.getLoadedSlot('partner');
        if (slot !== null) {
            TiageState.markDirty('partner');
        }
    });

    TiageState.subscribe('archetypes.ich', () => {
        const slot = TiageState.getLoadedSlot('ich');
        if (slot !== null) {
            TiageState.markDirty('ich');
        }
    });

    TiageState.subscribe('archetypes.partner', () => {
        const slot = TiageState.getLoadedSlot('partner');
        if (slot !== null) {
            TiageState.markDirty('partner');
        }
    });

    // Initial update
    updateAllProfileStatusBadges();
    console.log('[MemoryManager] Profile status tracking initialized');
}

// Initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initProfileStatusTracking);
    } else {
        // DOM already loaded
        setTimeout(initProfileStatusTracking, 100);
    }
}

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
        // Update profile status - both profiles saved to this slot
        if (typeof TiageState !== 'undefined') {
            TiageState.setLoadedSlot('ich', slotNumber);
            TiageState.setLoadedSlot('partner', slotNumber);
        }
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
        // Update profile status for ME
        if (typeof TiageState !== 'undefined') {
            TiageState.setLoadedSlot('ich', slotNumber);
        }
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
        // Update profile status for PARTNER
        if (typeof TiageState !== 'undefined') {
            TiageState.setLoadedSlot('partner', slotNumber);
        }
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
        // Update profile status for both
        if (typeof TiageState !== 'undefined') {
            TiageState.setLoadedSlot('ich', slotNumber);
            TiageState.setLoadedSlot('partner', slotNumber);
        }
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
        // Clear profile status if this was the loaded slot
        if (typeof TiageState !== 'undefined') {
            if (TiageState.getLoadedSlot('ich') === slotNumber) {
                TiageState.setLoadedSlot('ich', null);
            }
            if (TiageState.getLoadedSlot('partner') === slotNumber) {
                TiageState.setLoadedSlot('partner', null);
            }
        }
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

    let html = '';

    // Basic Info Section
    html += `
        <div class="memory-detail-section">
            <div class="memory-detail-section-title">Grunddaten</div>
            <div class="memory-detail-grid">
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Archetyp</span>
                    <span class="memory-detail-value">${data.archetyp?.primary || data.archetyp || '-'}</span>
                </div>
                ${data.archetyp?.secondary ? `
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Sekundär-Archetyp</span>
                    <span class="memory-detail-value">${data.archetyp.secondary}</span>
                </div>
                ` : ''}
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Geschlecht</span>
                    <span class="memory-detail-value">${data.geschlecht || '-'}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Dominanz</span>
                    <span class="memory-detail-value">${data.dominanz ?? '-'}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Orientierung</span>
                    <span class="memory-detail-value">${data.orientierung || '-'}</span>
                </div>
            </div>
        </div>
    `;

    // Profile Review Section (Bedürfnisse)
    if (data.profileReview) {
        const categories = [
            { name: 'Lebensplanung', keys: ['kinder', 'ehe', 'zusammen', 'haustiere', 'umzug', 'familie'] },
            { name: 'Finanzen', keys: ['finanzen', 'karriere'] },
            { name: 'Kommunikation', keys: ['gespraech', 'emotional', 'konflikt'] },
            { name: 'Soziales', keys: ['introextro', 'alleinzeit', 'freunde'] },
            { name: 'Intimität', keys: ['naehe', 'romantik', 'sex'] },
            { name: 'Werte', keys: ['religion', 'tradition', 'umwelt'] },
            { name: 'Praktisches', keys: ['ordnung', 'reise'] }
        ];

        // Mapping für lesbare Namen
        const labelMap = {
            kinder: 'Kinder',
            ehe: 'Ehe',
            zusammen: 'Zusammenwohnen',
            haustiere: 'Haustiere',
            umzug: 'Umzugsbereitschaft',
            familie: 'Familienorientierung',
            finanzen: 'Finanzen',
            karriere: 'Karriere',
            gespraech: 'Gesprächsstil',
            emotional: 'Emotionalität',
            konflikt: 'Konfliktstil',
            introextro: 'Intro/Extrovertiert',
            alleinzeit: 'Alleinzeit',
            freunde: 'Freunde',
            naehe: 'Nähe',
            romantik: 'Romantik',
            sex: 'Intimität',
            religion: 'Religion',
            tradition: 'Tradition',
            umwelt: 'Umwelt',
            ordnung: 'Ordnung',
            reise: 'Reisen'
        };

        html += `<div class="memory-detail-section">
            <div class="memory-detail-section-title">Bedürfnisse (ProfileReview)</div>`;

        for (const cat of categories) {
            const items = cat.keys
                .filter(k => data.profileReview[k] !== undefined)
                .map(k => `
                    <div class="memory-detail-need-item">
                        <span class="memory-detail-need-label">${labelMap[k] || k}</span>
                        <span class="memory-detail-need-value ${data.profileReview[k] === 50 ? 'neutral' : ''}">${data.profileReview[k]}</span>
                    </div>
                `).join('');

            if (items) {
                html += `
                    <div class="memory-detail-category">
                        <div class="memory-detail-category-name">${cat.name}</div>
                        <div class="memory-detail-needs-grid">${items}</div>
                    </div>
                `;
            }
        }

        html += `</div>`;
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
