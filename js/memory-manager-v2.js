/**
 * MEMORY MANAGER V2 - Archetyp-basiertes Speichermanagement
 *
 * v2.0: Neues Konzept mit 8 Archetyp-Slots
 *
 * ICH-Slots (Auto-Save):
 * - 8 Slots, einer pro Archetyp (Single, Duo, Duo-Flex, RA, LAT, Aromantisch, Solopoly, Polyamor)
 * - Automatisches Speichern bei jeder Änderung
 * - Speichert: AGOD-Gewichtung, FFH, GOD-Einstellungen, RTI-Prioritäten
 *
 * PARTNER-Slots (Manuell):
 * - 8 unabhängige Slots
 * - Manuelles Speichern/Löschen
 * - Zeigt Score und Key-Infos
 *
 * © 2026 Ti-age.de Alle Rechte vorbehalten.
 */

const MemoryManagerV2 = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // CONSTANTS
    // ═══════════════════════════════════════════════════════════════════════

    const ARCHETYPES = ['single', 'duo', 'duo_flex', 'ra', 'lat', 'aromantisch', 'solopoly', 'polyamor'];
    const ARCHETYPE_LABELS = {
        'single': 'Single',
        'duo': 'Duo',
        'duo_flex': 'Duo-Flex',
        'ra': 'RA',
        'lat': 'LAT',
        'aromantisch': 'Aromantisch',
        'solopoly': 'Solopoly',
        'polyamor': 'Polyamor'
    };
    const ARCHETYPE_ICONS = {
        'single': '⭐',
        'duo': '♥',
        'duo_flex': '⚡',
        'ra': '∞',
        'lat': '△',
        'aromantisch': '◇',
        'solopoly': '♠',
        'polyamor': '♣'
    };

    const MAX_PARTNER_SLOTS = 8;
    const STORAGE_PREFIX_ICH = 'tiage_ich_';
    const STORAGE_PREFIX_PARTNER = 'tiage_partner_slot_';

    // Auto-Save-Throttle (ms)
    let autoSaveTimeout = null;
    const AUTO_SAVE_DELAY = 500;

    // ═══════════════════════════════════════════════════════════════════════
    // HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════

    function getIchStorageKey(archetyp) {
        return STORAGE_PREFIX_ICH + archetyp.replace('-', '_');
    }

    function getPartnerStorageKey(slotNumber) {
        return STORAGE_PREFIX_PARTNER + String(slotNumber).padStart(3, '0');
    }

    function formatDateTime(timestamp) {
        if (!timestamp) return '-';
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${day}.${month}. ${hours}:${minutes}`;
    }

    function formatGOD(data) {
        if (!data) return '-';
        const parts = [];

        // Geschlecht
        if (data.geschlecht) {
            const g = typeof data.geschlecht === 'string' ? data.geschlecht : data.geschlecht.primary;
            if (g) parts.push(g.charAt(0).toUpperCase());
        }

        // Orientierung
        if (data.orientierung) {
            const o = typeof data.orientierung === 'string' ? data.orientierung :
                (Array.isArray(data.orientierung) ? data.orientierung[0] : data.orientierung.primary);
            if (o) {
                const oriMap = { 'heterosexuell': 'Het', 'homosexuell': 'Homo', 'bisexuell': 'Bi', 'pansexuell': 'Pan', 'queer': 'Q' };
                parts.push(oriMap[o] || o.substring(0, 3));
            }
        }

        // Dominanz
        if (data.dominanz) {
            const d = typeof data.dominanz === 'string' ? data.dominanz : data.dominanz.primary;
            if (d) {
                const domMap = { 'dominant': 'Dom', 'submissiv': 'Sub', 'switch': 'Sw', 'ausgeglichen': 'Ausg' };
                parts.push(domMap[d] || d.substring(0, 3));
            }
        }

        return parts.length > 0 ? parts.join(' ') : '-';
    }

    function formatFFH(extras) {
        if (!extras) return '';
        const parts = [];
        if (extras.fit) parts.push('💪');
        if (extras.fuckedup) parts.push('🔥');
        if (extras.horny) parts.push('😈');
        return parts.join('');
    }

    function formatAGOD(gewichtungen) {
        if (!gewichtungen) return '-';
        // Support both new format { O: 1, A: 2, ... } and old format { O: { value: 25, locked: false }, ... }
        const getValue = (key) => {
            const v = gewichtungen[key];
            if (typeof v === 'number') return v;
            if (v && typeof v === 'object' && 'value' in v) return Math.round(v.value / 25);
            return 1;
        };
        return `A${getValue('A')} G${getValue('G')} O${getValue('O')} D${getValue('D')}`;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // ICH DATA COLLECTION (per Archetyp)
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Sammelt die aktuellen ICH-Daten für einen bestimmten Archetyp
     * Wird bei jeder Änderung automatisch gespeichert
     */
    function collectIchDataForArchetyp(archetyp) {
        const data = {
            timestamp: Date.now(),
            dataVersion: '4.0',
            archetyp: archetyp,
            geschlecht: null,
            dominanz: null,
            orientierung: null,
            geschlecht_extras: null,  // FFH
            agodGewichtung: null,     // 3-Wege AGOD (0/1/2)
            rtiPrioritaeten: null     // RTI-Säulen (0/1/2)
        };

        if (typeof TiageState !== 'undefined') {
            // GOD-Einstellungen
            data.geschlecht = TiageState.get('personDimensions.ich.geschlecht');
            data.dominanz = TiageState.get('personDimensions.ich.dominanz');
            data.orientierung = TiageState.get('personDimensions.ich.orientierung');

            // FFH (Fit/Fuckedup/Horny)
            data.geschlecht_extras = TiageState.get('personDimensions.ich.geschlecht_extras');

            // AGOD-Gewichtung (neues Format: 0/1/2)
            data.agodGewichtung = TiageState.get('gewichtungen.ich');

            // RTI-Prioritäten
            data.rtiPrioritaeten = TiageState.get('rtiPriorities.ich');
        }

        return data;
    }

    /**
     * Speichert ICH-Daten für den aktuellen Archetyp
     */
    function saveIchForCurrentArchetyp() {
        let currentArchetyp = null;

        if (typeof TiageState !== 'undefined') {
            const archetypes = TiageState.getArchetypes('ich');
            currentArchetyp = archetypes?.primary || archetypes;
        }

        if (!currentArchetyp) {
            currentArchetyp = window.currentArchetype || window.mobileIchArchetype || 'single';
        }

        if (!ARCHETYPES.includes(currentArchetyp)) {
            console.warn('[MemoryManagerV2] Unbekannter Archetyp:', currentArchetyp);
            return false;
        }

        const data = collectIchDataForArchetyp(currentArchetyp);
        const key = getIchStorageKey(currentArchetyp);

        try {
            localStorage.setItem(key, JSON.stringify(data));
            console.log(`[MemoryManagerV2] Auto-Save ICH für ${currentArchetyp}`);
            return true;
        } catch (e) {
            console.error('[MemoryManagerV2] Fehler beim Speichern:', e);
            return false;
        }
    }

    /**
     * Throttled Auto-Save - wird bei jeder Änderung aufgerufen
     */
    function triggerAutoSave() {
        if (autoSaveTimeout) {
            clearTimeout(autoSaveTimeout);
        }
        autoSaveTimeout = setTimeout(() => {
            saveIchForCurrentArchetyp();
            autoSaveTimeout = null;
        }, AUTO_SAVE_DELAY);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PARTNER DATA COLLECTION
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Sammelt die aktuellen Partner-Daten inkl. Score
     */
    function collectPartnerData() {
        const data = {
            timestamp: Date.now(),
            dataVersion: '4.0',
            archetyp: null,
            geschlecht: null,
            dominanz: null,
            orientierung: null,
            geschlecht_extras: null,
            score: null,            // Synthese-Score
            ichArchetyp: null       // Mit welchem ICH-Archetyp wurde der Score berechnet
        };

        if (typeof TiageState !== 'undefined') {
            // Partner-Archetyp
            const archetypes = TiageState.getArchetypes('partner');
            data.archetyp = archetypes?.primary || archetypes;

            // GOD-Einstellungen
            data.geschlecht = TiageState.get('personDimensions.partner.geschlecht');
            data.dominanz = TiageState.get('personDimensions.partner.dominanz');
            data.orientierung = TiageState.get('personDimensions.partner.orientierung');
            data.geschlecht_extras = TiageState.get('personDimensions.partner.geschlecht_extras');

            // Aktueller Score aus der UI
            const scoreEl = document.getElementById('resultPercentage');
            if (scoreEl && scoreEl.textContent !== '–') {
                data.score = parseFloat(scoreEl.textContent) || null;
            }

            // ICH-Archetyp für Referenz
            const ichArchetypes = TiageState.getArchetypes('ich');
            data.ichArchetyp = ichArchetypes?.primary || ichArchetypes;
        }

        return data;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        // Constants
        ARCHETYPES: ARCHETYPES,
        ARCHETYPE_LABELS: ARCHETYPE_LABELS,
        ARCHETYPE_ICONS: ARCHETYPE_ICONS,
        MAX_PARTNER_SLOTS: MAX_PARTNER_SLOTS,

        /**
         * Initialisiert Auto-Save für ICH
         * Sollte beim App-Start aufgerufen werden
         */
        initAutoSave() {
            if (typeof TiageState !== 'undefined' && TiageState.subscribe) {
                // Subscribe to relevant state changes
                TiageState.subscribe('personDimensions.ich', triggerAutoSave);
                TiageState.subscribe('gewichtungen.ich', triggerAutoSave);
                TiageState.subscribe('rtiPriorities.ich', triggerAutoSave);
                TiageState.subscribe('archetypes.ich', triggerAutoSave);
                console.log('[MemoryManagerV2] Auto-Save initialisiert');
            } else {
                console.warn('[MemoryManagerV2] TiageState.subscribe nicht verfügbar');
            }
        },

        /**
         * Manueller Trigger für Auto-Save (z.B. nach UI-Änderungen)
         */
        triggerAutoSave: triggerAutoSave,

        /**
         * Holt alle ICH-Slots (8 Archetypen)
         */
        getIchSlots() {
            return ARCHETYPES.map(archetyp => {
                const key = getIchStorageKey(archetyp);
                let data = null;

                try {
                    const raw = localStorage.getItem(key);
                    if (raw) {
                        data = JSON.parse(raw);
                    }
                } catch (e) {
                    console.warn('[MemoryManagerV2] Fehler beim Lesen:', key, e);
                }

                return {
                    archetyp: archetyp,
                    label: ARCHETYPE_LABELS[archetyp],
                    icon: ARCHETYPE_ICONS[archetyp],
                    isEmpty: !data,
                    data: data,
                    formattedGOD: data ? formatGOD(data) : '-',
                    formattedFFH: data ? formatFFH(data.geschlecht_extras) : '',
                    formattedAGOD: data ? formatAGOD(data.agodGewichtung) : '-',
                    dateTime: data ? formatDateTime(data.timestamp) : '-'
                };
            });
        },

        /**
         * Holt alle Partner-Slots (8 unabhängige)
         */
        getPartnerSlots() {
            const slots = [];
            for (let i = 1; i <= MAX_PARTNER_SLOTS; i++) {
                const key = getPartnerStorageKey(i);
                let data = null;

                try {
                    const raw = localStorage.getItem(key);
                    if (raw) {
                        data = JSON.parse(raw);
                    }
                } catch (e) {
                    console.warn('[MemoryManagerV2] Fehler beim Lesen:', key, e);
                }

                slots.push({
                    slot: i,
                    isEmpty: !data,
                    data: data,
                    archetyp: data?.archetyp || null,
                    archetypLabel: data?.archetyp ? ARCHETYPE_LABELS[data.archetyp] : '-',
                    formattedGOD: data ? formatGOD(data) : '-',
                    score: data?.score || null,
                    ichArchetyp: data?.ichArchetyp || null,
                    dateTime: data ? formatDateTime(data.timestamp) : '-'
                });
            }
            return slots;
        },

        /**
         * Lädt ICH-Daten für einen Archetyp
         */
        loadIchFromArchetyp(archetyp) {
            const key = getIchStorageKey(archetyp);
            try {
                const raw = localStorage.getItem(key);
                if (!raw) {
                    console.warn('[MemoryManagerV2] Keine Daten für:', archetyp);
                    return false;
                }

                const data = JSON.parse(raw);

                // Daten in TiageState laden
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
                    if (data.geschlecht_extras) {
                        TiageState.set('personDimensions.ich.geschlecht_extras', data.geschlecht_extras);
                    }
                    if (data.agodGewichtung) {
                        TiageState.set('gewichtungen.ich', data.agodGewichtung);
                    }
                    if (data.rtiPrioritaeten) {
                        TiageState.set('rtiPriorities.ich', data.rtiPrioritaeten);
                    }

                    // Archetyp setzen
                    TiageState.setArchetype('ich', archetyp);
                    TiageState.saveToStorage();
                }

                // UI aktualisieren
                if (typeof window.syncGeschlechtUI === 'function') window.syncGeschlechtUI('ich');
                if (typeof window.syncDominanzUI === 'function') window.syncDominanzUI('ich');
                if (typeof window.syncOrientierungUI === 'function') window.syncOrientierungUI('ich');
                if (typeof window.updateAll === 'function') window.updateAll();

                // AGOD UI aktualisieren
                if (typeof TiageWeights !== 'undefined' && TiageWeights.AGOD && TiageWeights.AGOD.init) {
                    TiageWeights.AGOD.init();
                }

                console.log(`[MemoryManagerV2] ICH geladen für ${archetyp}`);
                return true;
            } catch (e) {
                console.error('[MemoryManagerV2] Fehler beim Laden:', e);
                return false;
            }
        },

        /**
         * Speichert Partner in einen Slot
         */
        savePartnerToSlot(slotNumber) {
            if (slotNumber < 1 || slotNumber > MAX_PARTNER_SLOTS) {
                console.error('[MemoryManagerV2] Ungültige Slot-Nummer:', slotNumber);
                return false;
            }

            const data = collectPartnerData();
            const key = getPartnerStorageKey(slotNumber);

            try {
                localStorage.setItem(key, JSON.stringify(data));
                console.log(`[MemoryManagerV2] Partner gespeichert in Slot ${slotNumber}`);
                return true;
            } catch (e) {
                console.error('[MemoryManagerV2] Fehler beim Speichern:', e);
                return false;
            }
        },

        /**
         * Lädt Partner aus einem Slot
         */
        loadPartnerFromSlot(slotNumber) {
            if (slotNumber < 1 || slotNumber > MAX_PARTNER_SLOTS) {
                console.error('[MemoryManagerV2] Ungültige Slot-Nummer:', slotNumber);
                return false;
            }

            const key = getPartnerStorageKey(slotNumber);
            try {
                const raw = localStorage.getItem(key);
                if (!raw) {
                    console.warn('[MemoryManagerV2] Slot ist leer:', slotNumber);
                    return false;
                }

                const data = JSON.parse(raw);

                // Daten in TiageState laden
                if (typeof TiageState !== 'undefined') {
                    if (data.archetyp) {
                        TiageState.setArchetype('partner', data.archetyp);
                    }
                    if (data.geschlecht) {
                        TiageState.set('personDimensions.partner.geschlecht', data.geschlecht);
                    }
                    if (data.dominanz) {
                        TiageState.set('personDimensions.partner.dominanz', data.dominanz);
                    }
                    if (data.orientierung) {
                        TiageState.set('personDimensions.partner.orientierung', data.orientierung);
                    }
                    if (data.geschlecht_extras) {
                        TiageState.set('personDimensions.partner.geschlecht_extras', data.geschlecht_extras);
                    }
                    TiageState.saveToStorage();
                }

                // UI aktualisieren
                if (typeof window.syncGeschlechtUI === 'function') window.syncGeschlechtUI('partner');
                if (typeof window.syncDominanzUI === 'function') window.syncDominanzUI('partner');
                if (typeof window.syncOrientierungUI === 'function') window.syncOrientierungUI('partner');
                if (typeof window.updateAll === 'function') window.updateAll();

                console.log(`[MemoryManagerV2] Partner geladen aus Slot ${slotNumber}`);
                return true;
            } catch (e) {
                console.error('[MemoryManagerV2] Fehler beim Laden:', e);
                return false;
            }
        },

        /**
         * Löscht einen Partner-Slot
         */
        deletePartnerSlot(slotNumber) {
            if (slotNumber < 1 || slotNumber > MAX_PARTNER_SLOTS) {
                console.error('[MemoryManagerV2] Ungültige Slot-Nummer:', slotNumber);
                return false;
            }

            const key = getPartnerStorageKey(slotNumber);
            try {
                localStorage.removeItem(key);
                console.log(`[MemoryManagerV2] Partner Slot ${slotNumber} gelöscht`);
                return true;
            } catch (e) {
                console.error('[MemoryManagerV2] Fehler beim Löschen:', e);
                return false;
            }
        },

        /**
         * Findet ersten leeren Partner-Slot
         */
        findEmptyPartnerSlot() {
            for (let i = 1; i <= MAX_PARTNER_SLOTS; i++) {
                const key = getPartnerStorageKey(i);
                if (!localStorage.getItem(key)) {
                    return i;
                }
            }
            return null;
        },

        /**
         * Zählt verwendete Partner-Slots
         */
        getUsedPartnerSlotCount() {
            let count = 0;
            for (let i = 1; i <= MAX_PARTNER_SLOTS; i++) {
                const key = getPartnerStorageKey(i);
                if (localStorage.getItem(key)) {
                    count++;
                }
            }
            return count;
        },

        // Helper exports
        formatDateTime: formatDateTime,
        formatGOD: formatGOD,
        formatFFH: formatFFH,
        formatAGOD: formatAGOD
    };
})();

// ═══════════════════════════════════════════════════════════════════════════
// MODAL UI FUNCTIONS V2
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Öffnet das neue Memory Modal V2
 */
function openMemoryModalV2() {
    const modal = document.getElementById('memoryModalV2');
    if (!modal) {
        console.error('[MemoryManagerV2] Modal nicht gefunden');
        return;
    }

    updateMemoryModalV2Content();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Schließt das Memory Modal V2
 */
function closeMemoryModalV2(event) {
    if (event && event.target !== event.currentTarget) return;

    const modal = document.getElementById('memoryModalV2');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Aktualisiert den Modal-Inhalt
 */
function updateMemoryModalV2Content() {
    const ichContainer = document.getElementById('memoryIchSlotsList');
    const partnerContainer = document.getElementById('memoryPartnerSlotsList');

    if (!ichContainer || !partnerContainer) return;

    // ICH-Slots (Auto-Save pro Archetyp)
    const ichSlots = MemoryManagerV2.getIchSlots();
    let ichHtml = '';

    // Aktueller ICH-Archetyp für Highlighting
    let currentIchArchetyp = null;
    if (typeof TiageState !== 'undefined') {
        const archetypes = TiageState.getArchetypes('ich');
        currentIchArchetyp = archetypes?.primary || archetypes;
    }

    for (const slot of ichSlots) {
        const isActive = slot.archetyp === currentIchArchetyp;
        ichHtml += `
        <div class="memory-ich-slot ${slot.isEmpty ? 'empty' : 'filled'} ${isActive ? 'active' : ''}" data-archetyp="${slot.archetyp}">
            <div class="memory-slot-icon">${slot.icon}</div>
            <div class="memory-slot-label">${slot.label}</div>
            <div class="memory-slot-god">${slot.formattedGOD} ${slot.formattedFFH}</div>
            ${!slot.isEmpty ? `
                <div class="memory-slot-agod">${slot.formattedAGOD}</div>
                <button class="memory-load-btn" onclick="handleLoadIchV2('${slot.archetyp}')" title="Laden">
                    📥
                </button>
            ` : '<div class="memory-slot-empty">-</div>'}
        </div>
        `;
    }
    ichContainer.innerHTML = ichHtml;

    // Partner-Slots (8 unabhängige)
    const partnerSlots = MemoryManagerV2.getPartnerSlots();
    let partnerHtml = '';

    for (const slot of partnerSlots) {
        partnerHtml += `
        <div class="memory-partner-slot ${slot.isEmpty ? 'empty' : 'filled'}" data-slot="${slot.slot}">
            <div class="memory-slot-number">${slot.slot}</div>
            ${slot.isEmpty ? `
                <div class="memory-slot-empty">Leer</div>
                <button class="memory-save-btn" onclick="handleSavePartnerV2(${slot.slot})" title="Partner hier speichern">
                    💾
                </button>
            ` : `
                <div class="memory-slot-archetyp">${slot.archetypLabel}</div>
                <div class="memory-slot-score">${slot.score ? slot.score.toFixed(1) + '%' : '-'}</div>
                <div class="memory-slot-god">${slot.formattedGOD}</div>
                <div class="memory-slot-actions">
                    <button class="memory-load-btn" onclick="handleLoadPartnerV2(${slot.slot})" title="Laden">📥</button>
                    <button class="memory-delete-btn" onclick="handleDeletePartnerV2(${slot.slot})" title="Löschen">🗑️</button>
                </div>
            `}
        </div>
        `;
    }
    partnerContainer.innerHTML = partnerHtml;

    // Update Slot-Counts
    const ichCountEl = document.getElementById('memoryIchSlotCount');
    const partnerCountEl = document.getElementById('memoryPartnerSlotCount');
    if (ichCountEl) {
        const filledIch = ichSlots.filter(s => !s.isEmpty).length;
        ichCountEl.textContent = `${filledIch}/8`;
    }
    if (partnerCountEl) {
        partnerCountEl.textContent = `${MemoryManagerV2.getUsedPartnerSlotCount()}/8`;
    }
}

// Handler-Funktionen
function handleLoadIchV2(archetyp) {
    if (MemoryManagerV2.loadIchFromArchetyp(archetyp)) {
        showMemoryToast(`ICH (${MemoryManagerV2.ARCHETYPE_LABELS[archetyp]}) geladen`);
        closeMemoryModalV2();
    } else {
        showMemoryToast('Fehler beim Laden', 'error');
    }
}

function handleSavePartnerV2(slotNumber) {
    if (MemoryManagerV2.savePartnerToSlot(slotNumber)) {
        updateMemoryModalV2Content();
        showMemoryToast(`Partner in Slot ${slotNumber} gespeichert`);
    } else {
        showMemoryToast('Fehler beim Speichern', 'error');
    }
}

function handleLoadPartnerV2(slotNumber) {
    if (MemoryManagerV2.loadPartnerFromSlot(slotNumber)) {
        showMemoryToast(`Partner aus Slot ${slotNumber} geladen`);
        closeMemoryModalV2();
    } else {
        showMemoryToast('Fehler beim Laden', 'error');
    }
}

function handleDeletePartnerV2(slotNumber) {
    if (confirm(`Partner aus Slot ${slotNumber} wirklich löschen?`)) {
        if (MemoryManagerV2.deletePartnerSlot(slotNumber)) {
            updateMemoryModalV2Content();
            showMemoryToast(`Slot ${slotNumber} gelöscht`);
        } else {
            showMemoryToast('Fehler beim Löschen', 'error');
        }
    }
}

// Toast-Funktion (falls nicht vorhanden)
function showMemoryToast(message, type = 'success') {
    // Versuche existierende Toast-Funktion
    if (typeof window.showMemoryToast === 'function' && window.showMemoryToast !== showMemoryToast) {
        window.showMemoryToast(message, type);
        return;
    }

    // Fallback: Einfacher Toast
    const toast = document.createElement('div');
    toast.className = `memory-toast memory-toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        border-radius: 8px;
        background: ${type === 'error' ? '#ef4444' : '#22c55e'};
        color: white;
        font-weight: 500;
        z-index: 10000;
        animation: fadeInUp 0.3s ease;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Global exportieren
window.MemoryManagerV2 = MemoryManagerV2;
window.openMemoryModalV2 = openMemoryModalV2;
window.closeMemoryModalV2 = closeMemoryModalV2;
window.handleLoadIchV2 = handleLoadIchV2;
window.handleSavePartnerV2 = handleSavePartnerV2;
window.handleLoadPartnerV2 = handleLoadPartnerV2;
window.handleDeletePartnerV2 = handleDeletePartnerV2;

// Auto-Save initialisieren wenn DOM bereit
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        MemoryManagerV2.initAutoSave();
    });
} else {
    MemoryManagerV2.initAutoSave();
}

console.log('[MemoryManagerV2] Modul geladen');
