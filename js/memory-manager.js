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
     * Collect current ME data from state
     */
    function collectMeData() {
        const data = {
            timestamp: Date.now(),
            version: '1.0',
            archetyp: null,
            geschlecht: null,
            dominanz: null,
            orientierung: null
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

        return data;
    }

    /**
     * Collect current PARTNER data from state
     */
    function collectPartnerData() {
        const data = {
            timestamp: Date.now(),
            version: '1.0',
            archetyp: null,
            geschlecht: null,
            dominanz: null,
            orientierung: null
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

        return data;
    }

    /**
     * Apply loaded data to ME
     */
    function applyMeData(data) {
        if (!data) return false;

        try {
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
                        archetyp: meData.archetyp?.primary || meData.archetyp || '-'
                    } : null,
                    partner: partData ? {
                        timestamp: partData.timestamp,
                        dateTime: formatDateTime(partData.timestamp),
                        archetyp: partData.archetyp?.primary || partData.archetyp || '-'
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
        formatDateTime: formatDateTime
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
                        </div>
                        <button class="memory-load-btn" onclick="handleLoadMe(${slotNum})" title="ME laden">
                            <span>Laden</span>
                        </button>
                    ` : '<div class="memory-person-info empty">-</div>'}
                </div>

                <!-- PARTNER Info -->
                <div class="memory-slot-person">
                    <div class="memory-person-label">PARTNER</div>
                    ${slot.partner ? `
                        <div class="memory-person-info">
                            <span class="memory-timestamp">${slot.partner.dateTime}</span>
                            <span class="memory-archetyp">${slot.partner.archetyp}</span>
                        </div>
                        <button class="memory-load-btn" onclick="handleLoadPartner(${slotNum})" title="PARTNER laden">
                            <span>Laden</span>
                        </button>
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
