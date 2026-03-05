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
            rtiPrioritaeten: null,    // RTI-Säulen (0/1/2)
            beduerfnisse: null        // FlatNeeds für diesen Archetyp
        };

        if (typeof TiageState !== 'undefined') {
            // GOD-Einstellungen aus TiageState
            data.geschlecht = TiageState.get('personDimensions.ich.geschlecht');
            data.dominanz = TiageState.get('personDimensions.ich.dominanz');
            data.orientierung = TiageState.get('personDimensions.ich.orientierung');

            // FFH (Fit/Fuckedup/Horny)
            data.geschlecht_extras = TiageState.get('personDimensions.ich.geschlecht_extras');

            // Fallback: Try to get from global personDimensions if TiageState is empty
            if (typeof personDimensions !== 'undefined' && personDimensions.ich) {
                if (!data.geschlecht && personDimensions.ich.geschlecht) {
                    data.geschlecht = personDimensions.ich.geschlecht;
                }
                if (!data.dominanz && personDimensions.ich.dominanz) {
                    data.dominanz = personDimensions.ich.dominanz;
                }
                if (!data.orientierung && personDimensions.ich.orientierung) {
                    data.orientierung = personDimensions.ich.orientierung;
                }
                if (!data.geschlecht_extras && personDimensions.ich.geschlecht_extras) {
                    data.geschlecht_extras = personDimensions.ich.geschlecht_extras;
                }
            }

            // Fallback for FFH: Try geschlechtExtrasCache (exposed via window from app-main.js)
            if (!data.geschlecht_extras && typeof window.geschlechtExtrasCache !== 'undefined' && window.geschlechtExtrasCache.ich) {
                data.geschlecht_extras = { ...window.geschlechtExtrasCache.ich };
            }

            // AGOD-Gewichtung (neues Format: 0/1/2)
            // Check if it's the correct NEW 3-way format
            const isNew3WayFormat = (obj) => {
                if (!obj) return false;
                // New format: { O: 2, A: 0, D: 2, G: 2 } - plain numbers 0-2, NO summeLock
                return typeof obj.O === 'number' && obj.O >= 0 && obj.O <= 2 &&
                       typeof obj.A === 'number' && obj.A >= 0 && obj.A <= 2 &&
                       typeof obj.D === 'number' && obj.D >= 0 && obj.D <= 2 &&
                       typeof obj.G === 'number' && obj.G >= 0 && obj.G <= 2 &&
                       !obj.summeLock;  // Old format always has summeLock
            };

            const storedGewichtung = TiageState.get('gewichtungen.ich');

            // Primary: TiageState (persistiert, übersteht tempReset)
            if (isNew3WayFormat(storedGewichtung)) {
                data.agodGewichtung = storedGewichtung;
                console.log('[MemoryManagerV2] AGOD from TiageState (persistent):', data.agodGewichtung);
            }
            // Fallback: Runtime (nur wenn TiageState leer)
            else if (typeof TiageWeights !== 'undefined' && TiageWeights.AGOD && TiageWeights.AGOD.get) {
                data.agodGewichtung = TiageWeights.AGOD.get();
                console.log('[MemoryManagerV2] AGOD from Runtime (fallback):', data.agodGewichtung);
            }
            // Last resort: defaults
            else {
                data.agodGewichtung = { O: 1, A: 1, D: 1, G: 1 };
                console.log('[MemoryManagerV2] AGOD using defaults');
            }

            // RTI-Prioritäten
            data.rtiPrioritaeten = TiageState.get('rtiPriorities.ich');

            // Bedürfnisse (flatNeeds) für diesen spezifischen Archetyp
            const flatNeeds = TiageState.get(`flatNeeds.ich.${archetyp}`);
            if (flatNeeds && Object.keys(flatNeeds).length > 0) {
                data.beduerfnisse = flatNeeds;
            }

            // Debug: Log collected data
            console.log('[MemoryManagerV2] collectIchData:', {
                archetyp,
                geschlecht: data.geschlecht,
                dominanz: data.dominanz,
                orientierung: data.orientierung,
                geschlecht_extras: data.geschlecht_extras,
                agodGewichtung: data.agodGewichtung,
                hasBeduerfnisse: !!data.beduerfnisse
            });
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
     * Speichert ICH-Daten für ALLE Archetypen
     * Wird bei Lock-Änderungen verwendet, da Locks global für alle Archetypen gelten
     */
    function saveIchForAllArchetypes() {
        let savedCount = 0;
        for (const archetyp of ARCHETYPES) {
            const data = collectIchDataForArchetyp(archetyp);
            const key = getIchStorageKey(archetyp);
            try {
                localStorage.setItem(key, JSON.stringify(data));
                savedCount++;
            } catch (e) {
                console.error('[MemoryManagerV2] Fehler beim Speichern für:', archetyp, e);
            }
        }
        console.log(`[MemoryManagerV2] Auto-Save für ALLE ${savedCount} Archetypen`);
        return savedCount;
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

    /**
     * Throttled Auto-Save für ALLE Archetypen - bei Lock-Änderungen
     */
    let autoSaveAllTimeout = null;
    function triggerAutoSaveAll() {
        if (autoSaveAllTimeout) {
            clearTimeout(autoSaveAllTimeout);
        }
        autoSaveAllTimeout = setTimeout(() => {
            saveIchForAllArchetypes();
            autoSaveAllTimeout = null;
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

            // FIX v1.8.947: Fallback für geschlecht_extras (wie bei ICH)
            // Fallback 1: personDimensions global object
            if (!data.geschlecht_extras && typeof personDimensions !== 'undefined' && personDimensions.partner) {
                if (personDimensions.partner.geschlecht_extras) {
                    data.geschlecht_extras = personDimensions.partner.geschlecht_extras;
                    console.log('[MemoryManagerV2] Partner geschlecht_extras from personDimensions fallback');
                }
            }
            // Fallback 2: geschlechtExtrasCache (local cache in app-main.js)
            if (!data.geschlecht_extras && typeof geschlechtExtrasCache !== 'undefined' && geschlechtExtrasCache.partner) {
                const cache = geschlechtExtrasCache.partner;
                if (cache.fit || cache.fuckedup || cache.horny) {
                    data.geschlecht_extras = { ...cache };
                    console.log('[MemoryManagerV2] Partner geschlecht_extras from cache fallback:', JSON.stringify(cache));
                }
            }

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
                // Subscribe to relevant state changes - speichert für AKTUELLEN Archetyp
                TiageState.subscribe('personDimensions.ich', triggerAutoSave);
                TiageState.subscribe('personDimensions.ich.geschlecht_extras', triggerAutoSave); // FFH explicit
                TiageState.subscribe('gewichtungen.ich', triggerAutoSave);
                TiageState.subscribe('rtiPriorities.ich', triggerAutoSave);
                TiageState.subscribe('archetypes.ich', triggerAutoSave);
                TiageState.subscribe('flatNeeds.ich', triggerAutoSave); // FlatNeeds-Änderungen

                // profileReview enthält locked needs - diese gelten für ALLE Archetypen
                TiageState.subscribe('profileReview.ich', triggerAutoSaveAll);

                console.log('[MemoryManagerV2] Auto-Save initialisiert (inkl. FFH, FlatNeeds, Locks)');
            } else {
                console.warn('[MemoryManagerV2] TiageState.subscribe nicht verfügbar');
            }
        },

        /**
         * Manueller Trigger für Auto-Save (z.B. nach UI-Änderungen)
         */
        triggerAutoSave: triggerAutoSave,

        /**
         * Trigger für Save ALLE Archetypen (bei Lock-Änderungen)
         */
        triggerAutoSaveAll: triggerAutoSaveAll,

        /**
         * Sofortiges Speichern des aktuellen ICH-Zustands (ohne Throttle)
         * Wird beim Öffnen des Memory Modals aufgerufen
         */
        saveCurrentIchNow: function() {
            console.log('[MemoryManagerV2] Force-Save aktueller ICH-Zustand');
            saveIchForCurrentArchetyp();
        },

        /**
         * Sofortiges Speichern für ALLE Archetypen (z.B. nach Lock)
         */
        saveAllArchetypesNow: function() {
            console.log('[MemoryManagerV2] Force-Save für ALLE Archetypen');
            return saveIchForAllArchetypes();
        },

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
                    formattedFFH: data ? formatFFH(data.geschlecht_extras) : '',  // v1.8.943: FFH für Partner
                    score: data?.score || null,
                    ichArchetyp: data?.ichArchetyp || null,
                    ichArchetypLabel: data?.ichArchetyp ? ARCHETYPE_LABELS[data.ichArchetyp] : null,  // v1.8.943
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
                    // WICHTIG: Archetyp ZUERST setzen!
                    // Der archetypes.ich Subscriber sichert automatisch GODFUFH des alten
                    // Archetyps und restored aus localStorage für den neuen.
                    // Danach setzen wir die Werte nochmal explizit (gleiche Daten, kein Konflikt).
                    TiageState.setArchetype('ich', archetyp);

                    // GOD+FFH+AGOD explizit setzen (verstärkt den Subscriber-Restore)
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
                        if (typeof window.geschlechtExtrasCache !== 'undefined') {
                            window.geschlechtExtrasCache.ich = {
                                fit: !!data.geschlecht_extras.fit,
                                fuckedup: !!data.geschlecht_extras.fuckedup,
                                horny: !!data.geschlecht_extras.horny
                            };
                        }
                    } else {
                        var defaultExtras = { fit: false, fuckedup: false, horny: false };
                        TiageState.set('personDimensions.ich.geschlecht_extras', defaultExtras);
                        if (typeof window.geschlechtExtrasCache !== 'undefined') {
                            window.geschlechtExtrasCache.ich = defaultExtras;
                        }
                    }
                    if (data.agodGewichtung) {
                        TiageState.set('gewichtungen.ich', data.agodGewichtung);
                    }
                    if (data.rtiPrioritaeten) {
                        TiageState.set('rtiPriorities.ich', data.rtiPrioritaeten);
                    }

                    TiageState.saveToStorage();
                }

                // UI aktualisieren
                if (typeof window.syncGeschlechtUI === 'function') window.syncGeschlechtUI('ich');
                if (typeof window.syncDominanzUI === 'function') window.syncDominanzUI('ich');
                if (typeof window.syncOrientierungUI === 'function') window.syncOrientierungUI('ich');
                if (typeof window.syncGeschlechtExtrasUI === 'function') window.syncGeschlechtExtrasUI('ich');
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
                        if (typeof window.geschlechtExtrasCache !== 'undefined') {
                            window.geschlechtExtrasCache.partner = {
                                fit: !!data.geschlecht_extras.fit,
                                fuckedup: !!data.geschlecht_extras.fuckedup,
                                horny: !!data.geschlecht_extras.horny
                            };
                        }
                    } else {
                        var partnerDefault = { fit: false, fuckedup: false, horny: false };
                        TiageState.set('personDimensions.partner.geschlecht_extras', partnerDefault);
                        if (typeof window.geschlechtExtrasCache !== 'undefined') {
                            window.geschlechtExtrasCache.partner = partnerDefault;
                        }
                    }
                    TiageState.saveToStorage();
                }

                // UI aktualisieren
                if (typeof window.syncGeschlechtUI === 'function') window.syncGeschlechtUI('partner');
                if (typeof window.syncDominanzUI === 'function') window.syncDominanzUI('partner');
                if (typeof window.syncOrientierungUI === 'function') window.syncOrientierungUI('partner');
                if (typeof window.syncGeschlechtExtrasUI === 'function') window.syncGeschlechtExtrasUI('partner');
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

        // ═══════════════════════════════════════════════════════════════════════
        // PRO-ARCHETYP GODFUFH PERSISTENZ
        // Speichert/Lädt GOD+FFH+AGOD beim Archetyp-Wechsel
        // ═══════════════════════════════════════════════════════════════════════

        /**
         * Speichert ICH-Daten für einen bestimmten Archetyp (nicht den aktuellen).
         * Wird beim Archetyp-Wechsel aufgerufen, um den ALTEN Archetyp zu sichern,
         * bevor TiageState die neuen Werte bekommt.
         *
         * @param {string} archetyp - Der Archetyp für den gespeichert werden soll
         * @returns {boolean} Erfolg
         */
        saveIchForSpecificArchetyp: function(archetyp) {
            if (!ARCHETYPES.includes(archetyp)) {
                console.warn('[MemoryManagerV2] saveIchForSpecific: Unbekannter Archetyp:', archetyp);
                return false;
            }

            const data = collectIchDataForArchetyp(archetyp);
            const key = getIchStorageKey(archetyp);

            try {
                localStorage.setItem(key, JSON.stringify(data));
                console.log(`[MemoryManagerV2] GODFUFH explizit gespeichert für ${archetyp}`);
                return true;
            } catch (e) {
                console.error('[MemoryManagerV2] Fehler beim Speichern für', archetyp, ':', e);
                return false;
            }
        },

        /**
         * Stellt GOD+FFH+AGOD Einstellungen für einen Archetyp wieder her,
         * OHNE den Archetyp selbst zu setzen (verhindert Rekursion).
         *
         * Wird automatisch beim Archetyp-Wechsel aufgerufen.
         * Setzt personDimensions, geschlecht_extras, gewichtungen, rtiPriorities
         * und synchronisiert die UI.
         *
         * @param {string} archetyp - Der Archetyp dessen Einstellungen geladen werden
         * @returns {boolean} true wenn Daten gefunden und restored, false wenn leer
         */
        restoreSettingsForArchetyp: function(archetyp) {
            if (!ARCHETYPES.includes(archetyp)) {
                console.warn('[MemoryManagerV2] restoreSettings: Unbekannter Archetyp:', archetyp);
                return false;
            }

            const key = getIchStorageKey(archetyp);
            try {
                const raw = localStorage.getItem(key);
                if (!raw) {
                    console.log(`[MemoryManagerV2] Keine gespeicherten GODFUFH-Daten für: ${archetyp} - setze GOD+FFH zurück`);
                    // FIX: Bei fehlendem Slot alle GOD+FFH-Werte zurücksetzen
                    // (sonst werden Werte vom vorherigen Archetyp übernommen)
                    if (typeof TiageState !== 'undefined') {
                        TiageState.set('personDimensions.ich.geschlecht', null);
                        TiageState.set('personDimensions.ich.orientierung', null);
                        TiageState.set('personDimensions.ich.dominanz', null);
                        var defaultExtras = { fit: false, fuckedup: false, horny: false };
                        TiageState.set('personDimensions.ich.geschlecht_extras', defaultExtras);
                        if (typeof window.geschlechtExtrasCache !== 'undefined') {
                            window.geschlechtExtrasCache.ich = defaultExtras;
                        }
                    }
                    // UI synchronisieren
                    if (typeof window.syncGeschlechtUI === 'function') window.syncGeschlechtUI('ich');
                    if (typeof window.syncDominanzUI === 'function') window.syncDominanzUI('ich');
                    if (typeof window.syncOrientierungUI === 'function') window.syncOrientierungUI('ich');
                    if (typeof window.syncGeschlechtExtrasUI === 'function') window.syncGeschlechtExtrasUI('ich');
                    return false;
                }

                const data = JSON.parse(raw);

                // Daten in TiageState laden (OHNE Archetyp zu setzen!)
                if (typeof TiageState !== 'undefined') {
                    // G - Geschlecht (null wenn nicht gespeichert → alten Wert nicht übernehmen)
                    TiageState.set('personDimensions.ich.geschlecht', data.geschlecht || null);

                    // O - Orientierung
                    TiageState.set('personDimensions.ich.orientierung', data.orientierung || null);

                    // D - Dominanz
                    TiageState.set('personDimensions.ich.dominanz', data.dominanz || null);

                    // F - Fit, U - Fucked-up, H - Horny (FFH/geschlecht_extras)
                    if (data.geschlecht_extras) {
                        TiageState.set('personDimensions.ich.geschlecht_extras', data.geschlecht_extras);
                        // Cache synchronisieren (syncGeschlechtExtrasUI liest aus Cache)
                        if (typeof window.geschlechtExtrasCache !== 'undefined') {
                            window.geschlechtExtrasCache.ich = {
                                fit: !!data.geschlecht_extras.fit,
                                fuckedup: !!data.geschlecht_extras.fuckedup,
                                horny: !!data.geschlecht_extras.horny
                            };
                        }
                    } else {
                        // Kein gespeicherter FFH-Zustand → zurücksetzen
                        var defaultExtras = { fit: false, fuckedup: false, horny: false };
                        TiageState.set('personDimensions.ich.geschlecht_extras', defaultExtras);
                        if (typeof window.geschlechtExtrasCache !== 'undefined') {
                            window.geschlechtExtrasCache.ich = defaultExtras;
                        }
                    }

                    // AGOD-Gewichtung (3-Wege: 0/1/2)
                    if (data.agodGewichtung) {
                        TiageState.set('gewichtungen.ich', data.agodGewichtung);
                    }

                    // RTI-Prioritäten
                    if (data.rtiPrioritaeten) {
                        TiageState.set('rtiPriorities.ich', data.rtiPrioritaeten);
                    }
                }

                // UI synchronisieren
                if (typeof window.syncGeschlechtUI === 'function') {
                    window.syncGeschlechtUI('ich');
                }
                if (typeof window.syncDominanzUI === 'function') {
                    window.syncDominanzUI('ich');
                }
                if (typeof window.syncOrientierungUI === 'function') {
                    window.syncOrientierungUI('ich');
                }
                if (typeof window.syncGeschlechtExtrasUI === 'function') {
                    window.syncGeschlechtExtrasUI('ich');
                }

                // AGOD UI aktualisieren
                if (typeof TiageWeights !== 'undefined' && TiageWeights.AGOD && TiageWeights.AGOD.init) {
                    TiageWeights.AGOD.init();
                }

                console.log(`[MemoryManagerV2] GODFUFH wiederhergestellt für ${archetyp}:`,
                    'G=' + (data.geschlecht || '-'),
                    'O=' + (Array.isArray(data.orientierung) ? data.orientierung.join(',') : data.orientierung || '-'),
                    'D=' + (data.dominanz?.primary || data.dominanz || '-'),
                    'FFH=' + formatFFH(data.geschlecht_extras),
                    'AGOD=' + formatAGOD(data.agodGewichtung)
                );
                return true;
            } catch (e) {
                console.error('[MemoryManagerV2] Fehler beim Restore für', archetyp, ':', e);
                return false;
            }
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

    // Force save current state before showing modal
    // This ensures the displayed data is always current
    MemoryManagerV2.saveCurrentIchNow();

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
                <div class="memory-slot-date" title="Gespeichert: ${slot.dateTime}">${slot.dateTime}</div>
                <div class="memory-slot-actions">
                    <button class="memory-display-btn" onclick="handleDisplayIchV2('${slot.archetyp}')" title="Anzeigen">👁️</button>
                    <button class="memory-load-btn" onclick="handleLoadIchV2('${slot.archetyp}')" title="Laden">📥</button>
                    <button class="memory-delete-btn" onclick="handleDeleteIchV2('${slot.archetyp}')" title="ICH-Slot löschen"${isActive ? ' disabled style="opacity:0.3"' : ''}>🗑️</button>
                </div>
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
                <div class="memory-slot-god">${slot.formattedGOD}${slot.formattedFFH ? ' ' + slot.formattedFFH : ''}</div>
                <div class="memory-slot-date" title="Gespeichert: ${slot.dateTime}">${slot.dateTime}</div>
                <div class="memory-slot-actions">
                    <button class="memory-display-btn" onclick="handleDisplayPartnerV2(${slot.slot})" title="Anzeigen">👁️</button>
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

function handleDeleteIchV2(archetyp) {
    // Aktuellen ICH-Archetyp ermitteln
    var currentIchArchetyp = null;
    if (typeof TiageState !== 'undefined') {
        var archetypes = TiageState.getArchetypes('ich');
        currentIchArchetyp = archetypes?.primary || archetypes;
    }

    // Aktiver Archetyp kann nicht gelöscht werden
    if (archetyp === currentIchArchetyp) {
        showMemoryToast('Aktiver Archetyp kann nicht gelöscht werden', 'error');
        return;
    }

    var label = MemoryManagerV2.ARCHETYPE_LABELS[archetyp] || archetyp;
    if (confirm('ICH-Daten für "' + label + '" wirklich löschen?')) {
        var key = 'tiage_ich_' + archetyp;
        localStorage.removeItem(key);
        updateMemoryModalV2Content();
        showMemoryToast(label + ' gelöscht');
    }
}

/**
 * Zeigt Details eines ICH-Slots an
 */
function handleDisplayIchV2(archetyp) {
    const slots = MemoryManagerV2.getIchSlots();
    const slot = slots.find(s => s.archetyp === archetyp);
    if (!slot || slot.isEmpty) {
        showMemoryToast('Keine Daten vorhanden', 'error');
        return;
    }

    const data = slot.data;
    const rawJson = JSON.stringify(data, null, 2);
    const uniqueId = 'ich_' + archetyp + '_' + Date.now();

    const detailHtml = `
        <div class="memory-detail-section">
            <div class="memory-detail-section-title">ICH: ${slot.label} ${slot.icon}</div>
            <div class="memory-detail-grid">
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Geschlecht</span>
                    <span class="memory-detail-value">${data.geschlecht || '-'}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Orientierung</span>
                    <span class="memory-detail-value">${formatOrientierungDetail(data.orientierung)}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Dominanz</span>
                    <span class="memory-detail-value">${formatDominanzDetail(data.dominanz)}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">FFH</span>
                    <span class="memory-detail-value">${slot.formattedFFH || '-'}</span>
                </div>
            </div>
        </div>
        <div class="memory-detail-section">
            <div class="memory-detail-section-title">AGOD-Gewichtung</div>
            <div class="memory-detail-grid">
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Archetyp (A)</span>
                    <span class="memory-detail-value">${formatWeight(data.agodGewichtung?.A)}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Geschlecht (G)</span>
                    <span class="memory-detail-value">${formatWeight(data.agodGewichtung?.G)}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Orientierung (O)</span>
                    <span class="memory-detail-value">${formatWeight(data.agodGewichtung?.O)}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Dominanz (D)</span>
                    <span class="memory-detail-value">${formatWeight(data.agodGewichtung?.D)}</span>
                </div>
            </div>
        </div>
        ${data.rtiPrioritaeten ? `
        <div class="memory-detail-section">
            <div class="memory-detail-section-title">RTI-Prioritäten</div>
            <div class="memory-detail-grid">
                <div class="memory-detail-item"><span class="memory-detail-label">S1 Leiblichkeit</span><span class="memory-detail-value">${formatWeight(data.rtiPrioritaeten?.S1)}</span></div>
                <div class="memory-detail-item"><span class="memory-detail-label">S2 Soziales</span><span class="memory-detail-value">${formatWeight(data.rtiPrioritaeten?.S2)}</span></div>
                <div class="memory-detail-item"><span class="memory-detail-label">S3 Autonomie</span><span class="memory-detail-value">${formatWeight(data.rtiPrioritaeten?.S3)}</span></div>
                <div class="memory-detail-item"><span class="memory-detail-label">S4 Sicherheit</span><span class="memory-detail-value">${formatWeight(data.rtiPrioritaeten?.S4)}</span></div>
                <div class="memory-detail-item"><span class="memory-detail-label">S5 Werte & Sinn</span><span class="memory-detail-value">${formatWeight(data.rtiPrioritaeten?.S5)}</span></div>
            </div>
        </div>
        ` : ''}
        ${generateNeedsBreakdownV2(data, uniqueId + '_needs')}
        <div class="memory-detail-section">
            <div class="memory-detail-section-title">Metadaten</div>
            <div class="memory-detail-grid">
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Gespeichert</span>
                    <span class="memory-detail-value">${slot.dateTime}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Version</span>
                    <span class="memory-detail-value">${data.dataVersion || '-'}</span>
                </div>
            </div>
        </div>
        <div class="memory-detail-section">
            <div class="memory-detail-section-title" style="cursor: pointer;" onclick="toggleRawJson('${uniqueId}')">
                ROHDATEN (JSON) <span id="rawIcon_${uniqueId}" style="float: right;">+</span>
            </div>
            <div id="rawJson_${uniqueId}" class="memory-detail-raw-json" style="display: none;">
                <pre>${escapeHtml(rawJson)}</pre>
            </div>
        </div>
    `;

    showDetailModal(`ICH: ${slot.label}`, detailHtml);
}

/**
 * Zeigt Details eines Partner-Slots an
 */
function handleDisplayPartnerV2(slotNumber) {
    const slots = MemoryManagerV2.getPartnerSlots();
    const slot = slots.find(s => s.slot === slotNumber);
    if (!slot || slot.isEmpty) {
        showMemoryToast('Keine Daten vorhanden', 'error');
        return;
    }

    const data = slot.data;
    const rawJson = JSON.stringify(data, null, 2);
    const uniqueId = 'partner_' + slotNumber + '_' + Date.now();

    const detailHtml = `
        <div class="memory-detail-section">
            <div class="memory-detail-section-title">Partner Slot ${slotNumber}: ${slot.archetypLabel}</div>
            <div class="memory-detail-grid">
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Archetyp</span>
                    <span class="memory-detail-value">${slot.archetypLabel}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Score</span>
                    <span class="memory-detail-value" style="color: #10B981; font-weight: bold;">${slot.score ? slot.score.toFixed(1) + '%' : '-'}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Mit ICH-Archetyp</span>
                    <span class="memory-detail-value">${data.ichArchetyp || '-'}</span>
                </div>
            </div>
        </div>
        <div class="memory-detail-section">
            <div class="memory-detail-section-title">GOD-Einstellungen</div>
            <div class="memory-detail-grid">
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Geschlecht</span>
                    <span class="memory-detail-value">${data.geschlecht || '-'}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Orientierung</span>
                    <span class="memory-detail-value">${formatOrientierungDetail(data.orientierung)}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Dominanz</span>
                    <span class="memory-detail-value">${formatDominanzDetail(data.dominanz)}</span>
                </div>
            </div>
        </div>
        <div class="memory-detail-section">
            <div class="memory-detail-section-title">Metadaten</div>
            <div class="memory-detail-grid">
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Gespeichert</span>
                    <span class="memory-detail-value">${slot.dateTime}</span>
                </div>
                <div class="memory-detail-item">
                    <span class="memory-detail-label">Version</span>
                    <span class="memory-detail-value">${data.dataVersion || '-'}</span>
                </div>
            </div>
        </div>
        <div class="memory-detail-section">
            <div class="memory-detail-section-title" style="cursor: pointer;" onclick="toggleRawJson('${uniqueId}')">
                ROHDATEN (JSON) <span id="rawIcon_${uniqueId}" style="float: right;">+</span>
            </div>
            <div id="rawJson_${uniqueId}" class="memory-detail-raw-json" style="display: none;">
                <pre>${escapeHtml(rawJson)}</pre>
            </div>
        </div>
    `;

    showDetailModal(`Partner Slot ${slotNumber}`, detailHtml);
}

// Hilfsfunktionen für Detail-Anzeige
function formatOrientierungDetail(ori) {
    if (!ori) return '-';
    if (typeof ori === 'string') return ori;
    if (ori.primary) {
        let str = ori.primary;
        if (ori.secondary) str += ` + ${ori.secondary}`;
        return str;
    }
    if (Array.isArray(ori)) return ori.join(', ');
    return '-';
}

function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#039;');
}

function toggleRawJson(uniqueId) {
    const jsonDiv = document.getElementById('rawJson_' + uniqueId);
    const iconSpan = document.getElementById('rawIcon_' + uniqueId);
    if (jsonDiv && iconSpan) {
        if (jsonDiv.style.display === 'none') {
            jsonDiv.style.display = 'block';
            iconSpan.textContent = '−';
        } else {
            jsonDiv.style.display = 'none';
            iconSpan.textContent = '+';
        }
    }
}
window.toggleRawJson = toggleRawJson;

function formatDominanzDetail(dom) {
    if (!dom) return '-';
    if (typeof dom === 'string') return dom;
    if (dom.primary) {
        let str = dom.primary;
        if (dom.secondary) str += ` + ${dom.secondary}`;
        return str;
    }
    return '-';
}

/**
 * Generiert Bedürfnis-Aufschlüsselung mit GOD+FFH Modifikatoren
 * Zeigt nur Bedürfnisse die durch Modifikatoren verändert wurden
 */
function generateNeedsBreakdownV2(data, uniqueId) {
    const archetyp = data.archetyp;
    const flatNeeds = data.beduerfnisse;

    // Keine Bedürfnisse gespeichert
    if (!flatNeeds || Object.keys(flatNeeds).length === 0) {
        return `
        <div class="memory-detail-section">
            <div class="memory-detail-section-title">Bedürfnis-Aufschlüsselung</div>
            <div class="memory-detail-value" style="padding: 8px;">Keine Bedürfnisse gespeichert</div>
        </div>
        `;
    }

    // Basis-Werte aus Archetyp-Profil holen (SSOT: BaseArchetypProfile)
    let baseNeeds = {};
    if (typeof GfkBeduerfnisse !== 'undefined' && GfkBeduerfnisse.archetypProfile) {
        const profil = GfkBeduerfnisse.archetypProfile[archetyp];
        if (profil && profil.umfrageWerte) {
            baseNeeds = profil.umfrageWerte;
        }
    }

    // SSOT: Alle Modifier-Breakdowns über zentrale ProfileModifiers-Funktion
    const profile = {
        geschlecht: data.geschlecht,
        dominanz: data.dominanz,
        orientierung: data.orientierung,
        geschlecht_extras: data.geschlecht_extras || {}
    };
    const allBreakdowns = (typeof ProfileModifiers !== 'undefined' && ProfileModifiers.getAllModifierBreakdowns)
        ? ProfileModifiers.getAllModifierBreakdowns(profile)
        : {};

    // ID zu stringKey Mapping
    const getStringKey = (needId) => {
        if (typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.getKey) {
            return BeduerfnisIds.getKey(needId) || needId;
        }
        return needId;
    };

    const formatMod = (val) => {
        if (val === 0 || val === undefined) return '';
        return val > 0 ? `+${val}` : `${val}`;
    };

    const needsWithMods = Object.entries(flatNeeds)
        .filter(([needId]) => needId.startsWith('#B'))
        .map(([needId, finalValue]) => {
            const stringKey = getStringKey(needId);
            const baseValue = baseNeeds[needId] ?? 50;
            const bd = allBreakdowns[stringKey] || { g: 0, d: 0, o: 0, f: 0, fu: 0, h: 0, total: 0 };
            // DU = manuelle User-Anpassung (Differenz zwischen Final und berechneter Summe)
            const duMod = finalValue - baseValue - bd.total;
            return {
                needId, stringKey, baseValue, finalValue,
                gMod: bd.g, dMod: bd.d, oMod: bd.o,
                fMod: bd.f, fuMod: bd.fu, hMod: bd.h,
                totalMod: bd.total,
                duMod: Math.round(duMod)
            };
        })
        .filter(n => n.totalMod !== 0 || n.duMod !== 0)
        .sort((a, b) => Math.abs(b.totalMod) + Math.abs(b.duMod) - Math.abs(a.totalMod) - Math.abs(a.duMod));

    if (needsWithMods.length === 0) {
        return `
        <div class="memory-detail-section">
            <div class="memory-detail-section-title" style="cursor: pointer;" onclick="toggleRawJson('${uniqueId}')">
                Bedürfnis-Aufschlüsselung <span id="rawIcon_${uniqueId}" style="float: right;">+</span>
            </div>
            <div id="rawJson_${uniqueId}" style="display: none; padding: 8px;">
                Keine GOD/FFH Modifikatoren aktiv
            </div>
        </div>
        `;
    }

    // FFH Status (für Info-Text)
    const extras = data.geschlecht_extras || {};
    const hasFFH = extras.fit || extras.fuckedup || extras.horny;

    // Tabelle bauen - F, FU, H immer anzeigen
    let tableHtml = `
    <div class="memory-breakdown-hint" style="
        background: rgba(42, 157, 143, 0.15);
        border-left: 3px solid #2A9D8F;
        padding: 8px 12px;
        margin-bottom: 12px;
        font-size: 11px;
        color: #888;
        border-radius: 0 4px 4px 0;">
        <strong style="color: #2A9D8F;">ℹ️ GOD+FFH Modifikatoren</strong><br>
        ${needsWithMods.length} Bedürfnisse durch G/O/D${hasFFH ? '/FFH' : ''}/DU angepasst
    </div>
    <table class="memory-breakdown-entries" style="width: 100%; font-size: 11px; border-collapse: collapse;">
        <thead><tr style="background: rgba(0,0,0,0.2);">
            <th style="text-align: left; padding: 4px;">Bedürfnis</th>
            <th>Basis</th>
            <th>G</th>
            <th>D</th>
            <th>O</th>
            <th>F</th>
            <th>FU</th>
            <th>H</th>
            <th style="color: #60A5FA;">DU</th>
            <th>=</th>
            <th>Final</th>
        </tr></thead>
        <tbody>`;

    needsWithMods.forEach(n => {
        const modClass = (val) => val > 0 ? 'style="color: #10B981;"' : val < 0 ? 'style="color: #EF4444;"' : '';

        tableHtml += `
        <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
            <td style="padding: 4px; max-width: 100px; overflow: hidden; text-overflow: ellipsis;">${n.stringKey}</td>
            <td style="text-align: center;">${n.baseValue}</td>
            <td style="text-align: center;" ${modClass(n.gMod)}>${formatMod(n.gMod)}</td>
            <td style="text-align: center;" ${modClass(n.dMod)}>${formatMod(n.dMod)}</td>
            <td style="text-align: center;" ${modClass(n.oMod)}>${formatMod(n.oMod)}</td>
            <td style="text-align: center;" ${modClass(n.fMod)}>${formatMod(n.fMod)}</td>
            <td style="text-align: center;" ${modClass(n.fuMod)}>${formatMod(n.fuMod)}</td>
            <td style="text-align: center;" ${modClass(n.hMod)}>${formatMod(n.hMod)}</td>
            <td style="text-align: center;" ${modClass(n.duMod)}>${formatMod(n.duMod)}</td>
            <td style="text-align: center;">=</td>
            <td style="text-align: center; font-weight: bold;">${n.finalValue}</td>
        </tr>`;
    });

    tableHtml += '</tbody></table>';

    return `
    <div class="memory-detail-section">
        <div class="memory-detail-section-title" style="cursor: pointer;" onclick="toggleRawJson('${uniqueId}')">
            Bedürfnis-Aufschlüsselung (${needsWithMods.length} modifiziert) <span id="rawIcon_${uniqueId}" style="float: right;">+</span>
        </div>
        <div id="rawJson_${uniqueId}" style="display: none; padding: 8px; overflow-x: auto;">
            ${tableHtml}
        </div>
    </div>
    `;
}

function formatWeight(val) {
    if (val === undefined || val === null) return '-';
    // Handle old format { value: 25, locked: false }
    if (typeof val === 'object' && 'value' in val) {
        const v = val.value;
        if (v <= 10) return 'Egal';
        if (v >= 40) return 'Wichtig';
        return 'Normal';
    }
    // New format: 0, 1, 2
    const labels = { 0: 'Egal', 1: 'Normal', 2: 'Wichtig' };
    return labels[val] !== undefined ? labels[val] : String(val);
}

function showDetailModal(title, contentHtml) {
    // Nutze bestehendes Detail-Modal falls vorhanden
    const modal = document.getElementById('memoryDetailModal');
    const titleEl = modal?.querySelector('.memory-detail-title');
    const contentEl = document.getElementById('memoryDetailContent');

    if (modal && contentEl) {
        if (titleEl) titleEl.textContent = title;
        contentEl.innerHTML = contentHtml;
        // FIX v4.3: display zurücksetzen (close-Handler setzt display:none)
        modal.style.display = '';
        modal.classList.add('active');
    } else {
        // Fallback: Alert
        alert(title + '\n\nDetails siehe Konsole');
        console.log(title, contentHtml);
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
window.handleDeleteIchV2 = handleDeleteIchV2;
window.handleDisplayIchV2 = handleDisplayIchV2;
window.handleDisplayPartnerV2 = handleDisplayPartnerV2;

// Auto-Save initialisieren wenn DOM bereit
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        MemoryManagerV2.initAutoSave();
    });
} else {
    MemoryManagerV2.initAutoSave();
}

console.log('[MemoryManagerV2] Modul geladen');
