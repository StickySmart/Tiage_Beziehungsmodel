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
    const MAX_ICH_SLOTS = 8;
    const STORAGE_PREFIX_ICH = 'tiage_ich_';         // per-archetype auto-save (GODFUFH)
    const STORAGE_PREFIX_ICH_SLOT = 'tiage_ich_slot_'; // user manual snapshots (all archetypes)
    const STORAGE_PREFIX_PARTNER = 'tiage_partner_slot_';
    const ACTIVE_ICH_SLOT_KEY = 'tiage_active_ich_save_slot'; // last-used numbered slot

    function _getActiveIchSaveSlot() {
        try { const n = parseInt(localStorage.getItem(ACTIVE_ICH_SLOT_KEY), 10); return (n >= 1 && n <= MAX_ICH_SLOTS) ? n : null; } catch(e) { return null; }
    }
    function _setActiveIchSaveSlot(n) {
        try { if (n) localStorage.setItem(ACTIVE_ICH_SLOT_KEY, String(n)); else localStorage.removeItem(ACTIVE_ICH_SLOT_KEY); } catch(e) {}
    }

    // Data version tags — bump when the stored shape changes
    // v6.0: beduerfnisse = { '#B1': 50, ... }  (single archetype)  — used by GODFUFH auto-save
    // v7.0: beduerfnisse = { single: {...}, duo: {...}, ... }        — used by user manual slots
    const DATA_VERSION_GODFUFH = '6.0';
    const DATA_VERSION_COMPLETE = '7.0';

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

    function getIchSlotStorageKey(slotNumber) {
        return STORAGE_PREFIX_ICH_SLOT + String(slotNumber).padStart(3, '0');
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

    // Alle 16 Bedürfnisse als kompaktes Grid inkl. Schloss-Status
    const SLOT_STUFEN_COLORS = { 1: '#10B981', 2: '#3B82F6', 3: '#8B5CF6', 4: '#F59E0B' };

    function formatAllNeeds16(beduerfnisse, lockedNeeds) {
        if (!beduerfnisse) return '<span style="opacity:0.3;font-size:10px;">Keine Bedürfnisse</span>';
        const catalog = (typeof window !== 'undefined' && window.BeduerfnisIds && window.BeduerfnisIds.beduerfnisse)
            ? window.BeduerfnisIds.beduerfnisse : null;
        const locked = lockedNeeds || {};
        const NEEDS16_LABELS = { '#B1':'Wohlbefinden','#B2':'Sicherheit','#B3':'Leichtigkeit','#B4':'Orientierung','#B5':'Wirksamkeit','#B6':'Freiheit','#B7':'Intensität','#B8':'Entwicklung','#B9':'Gemeinschaft','#B10':'Anerkennung','#B11':'Gerechtigkeit','#B12':'Verbundenheit','#B13':'Selbsterkenntnis','#B14':'Sinn','#B15':'Integrität','#B16':'Selbstentfaltung' };
        const NEEDS16_STUFE = { '#B1':1,'#B2':1,'#B3':1,'#B4':1,'#B5':2,'#B6':2,'#B7':2,'#B8':2,'#B9':3,'#B10':3,'#B11':3,'#B12':3,'#B13':4,'#B14':4,'#B15':4,'#B16':4 };
        const entries = Object.entries(beduerfnisse)
            .filter(([id]) => NEEDS16_LABELS[id])
            .sort((a, b) => {
                const sA = NEEDS16_STUFE[a[0]] || 9;
                const sB = NEEDS16_STUFE[b[0]] || 9;
                return sA !== sB ? sA - sB : b[1] - a[1];
            });

        const rows = entries.map(([id, val]) => {
            const stufe = NEEDS16_STUFE[id] || 1;
            const color = SLOT_STUFEN_COLORS[stufe] || '#888';
            const label = (catalog && catalog[id] && catalog[id].label) ? catalog[id].label : (NEEDS16_LABELS[id] || id);
            const isLocked = Object.prototype.hasOwnProperty.call(locked, id);
            const lockHtml = isLocked
                ? `<span style="font-size:9px;margin-left:2px;opacity:0.9;">🔒</span>`
                : `<span style="font-size:9px;margin-left:2px;opacity:0.25;">○</span>`;
            const valColor = val >= 80 ? '#fff' : val >= 60 ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.45)';
            return `<div style="display:flex;align-items:center;gap:4px;padding:2px 0;border-bottom:1px solid rgba(255,255,255,0.04);">
                <span style="width:5px;height:5px;border-radius:50%;background:${color};flex-shrink:0;"></span>
                <span style="flex:1;font-size:10px;color:rgba(255,255,255,0.75);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${label}</span>
                <span style="font-size:11px;font-weight:700;color:${valColor};min-width:24px;text-align:right;">${val}</span>
                ${lockHtml}
            </div>`;
        }).join('');

        return rows;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // ICH DATA COLLECTION (per Archetyp)
    // ═══════════════════════════════════════════════════════════════════════

    // ─────────────────────────────────────────────────────────────────────────
    // TWO DISTINCT COLLECTION FUNCTIONS — never mix their outputs
    //
    //  collectIchDataForArchetyp(arch)  →  DATA_VERSION_GODFUFH (v6.0)
    //    beduerfnisse = { '#B1': 50, ... }   ← flat, ONE archetype's needs
    //    stored under STORAGE_PREFIX_ICH + arch  (tiage_ich_single etc.)
    //    read by restoreSettingsForArchetyp / loadIchFromArchetyp
    //
    //  collectCompleteIchData()         →  DATA_VERSION_COMPLETE (v7.0)
    //    beduerfnisse = { single: {...}, duo: {...}, ... }  ← ALL archetypes
    //    stored under STORAGE_PREFIX_ICH_SLOT + n  (tiage_ich_slot_001 etc.)
    //    read by loadIchFromSlot
    // ─────────────────────────────────────────────────────────────────────────

    /**
     * GODFUFH auto-save — stores ONE specific archetype's needs.
     * Called on archetype switch to snapshot the outgoing slot.
     * Format v6.0: beduerfnisse = { '#B1': 50, ... }
     */
    function collectIchDataForArchetyp(archetyp) {
        const data = {
            timestamp: Date.now(),
            dataVersion: DATA_VERSION_GODFUFH,
            archetyp: archetyp,
            beduerfnisse: null,
            lockedNeeds: null
        };

        if (typeof TiageState !== 'undefined') {
            // Direct path — bypasses smart-getter which always returns primary slot
            const archNeeds = TiageState.get(`flatNeeds.ich.${archetyp}`);
            if (archNeeds && Object.keys(archNeeds).length > 0) {
                data.beduerfnisse = archNeeds;
            }
            const locked = TiageState.get ? (TiageState.get('profileReview.ich.lockedNeeds') || {}) : {};
            if (locked && Object.keys(locked).length > 0) {
                data.lockedNeeds = locked;
            }
        }

        return data;
    }

    /**
     * User manual snapshot — stores ALL archetypes' needs in one blob.
     * Called on explicit user save to a numbered ICH slot.
     * Format v7.0: beduerfnisse = { single: {...}, duo: {...}, ... }
     */
    function collectCompleteIchData() {
        const data = {
            timestamp: Date.now(),
            dataVersion: DATA_VERSION_COMPLETE,
            archetyp: null,
            beduerfnisse: null,
            lockedNeeds: null
        };

        if (typeof TiageState !== 'undefined') {
            const archetypes = TiageState.getArchetypes ? TiageState.getArchetypes('ich') : null;
            data.archetyp = (archetypes && archetypes.primary) ? archetypes.primary
                : (typeof archetypes === 'string' ? archetypes : 'single');

            // Direct per-arch reads — bypasses smart-getter which returns only primary
            const allFlatNeeds = {};
            ARCHETYPES.forEach(arch => {
                const archNeeds = TiageState.get(`flatNeeds.ich.${arch}`);
                if (archNeeds && Object.keys(archNeeds).length > 0) {
                    allFlatNeeds[arch] = archNeeds;
                }
            });
            if (Object.keys(allFlatNeeds).length > 0) data.beduerfnisse = allFlatNeeds;

            const locked = TiageState.get ? (TiageState.get('profileReview.ich.lockedNeeds') || {}) : {};
            data.lockedNeeds = locked;
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
            dataVersion: '5.0',
            archetyp: null,
            beduerfnisse: null,  // flatNeeds des Partners
            score: null,         // Synthese-Score
            ichArchetyp: null    // Mit welchem ICH-Archetyp wurde der Score berechnet
        };

        if (typeof TiageState !== 'undefined') {
            const archetypes = TiageState.getArchetypes('partner');
            data.archetyp = archetypes?.primary || archetypes;

            const partnerNeeds = TiageState.getFlatNeeds
                ? TiageState.getFlatNeeds('partner')
                : (TiageState.get('flatNeeds.partner') || {});
            if (partnerNeeds && Object.keys(partnerNeeds).length > 0) {
                data.beduerfnisse = partnerNeeds;
            }

            const scoreEl = document.getElementById('resultPercentage');
            if (scoreEl && scoreEl.textContent !== '–') {
                data.score = parseFloat(scoreEl.textContent) || null;
            }

            const ichArchetypes = TiageState.getArchetypes('ich');
            data.ichArchetyp = ichArchetypes?.primary || ichArchetypes;
        }

        return data;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // DU-PROFIL TEILEN (WhatsApp-Export + URL-Import)
    // ═══════════════════════════════════════════════════════════════════════

    function buildShareToken() {
        let archetyp = null;
        let geschlecht = null;
        let dominanz = null;
        let orientierung = null;
        let geschlecht_extras = null;

        if (typeof TiageState !== 'undefined') {
            const archetypes = TiageState.getArchetypes('ich');
            archetyp = archetypes?.primary || archetypes;
            geschlecht = TiageState.get('personDimensions.ich.geschlecht');
            dominanz = TiageState.get('personDimensions.ich.dominanz');
            orientierung = TiageState.get('personDimensions.ich.orientierung');
            geschlecht_extras = TiageState.get('personDimensions.ich.geschlecht_extras');
        }
        if (!geschlecht_extras && typeof window.geschlechtExtrasCache !== 'undefined') {
            geschlecht_extras = { ...window.geschlechtExtrasCache.ich };
        }

        // lockedNeeds: manually pinned values (small payload)
        const lockedNeeds = (typeof TiageState !== 'undefined') ? (TiageState.getLockedNeeds('ich') || {}) : {};

        const primaryArch = archetyp || 'single';
        const ichSlots = (typeof TiageState !== 'undefined' && TiageState.getIchSlots)
            ? TiageState.getIchSlots() : null;
        const allSlots = ichSlots && ichSlots.length > 0 ? ichSlots : [primaryArch];

        // s = all active ICH slots (multi-slot support); a = primary for backward compat
        const payload = { a: archetyp, s: allSlots.length > 1 ? allSlots : undefined, g: geschlecht, d: dominanz, o: orientierung, f: geschlecht_extras, n: lockedNeeds };
        return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    }

    async function shareViaWhatsApp() {
        const token = buildShareToken();
        const base = window.location.origin + window.location.pathname;
        const shareUrl = base + '?du=' + encodeURIComponent(token);

        const finalUrl = shareUrl;

        // Always copy to clipboard
        if (navigator.clipboard) {
            navigator.clipboard.writeText(finalUrl).catch(function() {});
        }

        // Use native share dialog if available (mobile OS share sheet)
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Ti-Age Pairing',
                    text: 'Mein Ti-Age Profil',
                    url: finalUrl
                });
                return;
            } catch (e) {
                if (e.name === 'AbortError') return; // user cancelled
                // other error → fall through to WhatsApp
            }
        }

        // Fallback: open WhatsApp directly
        const message = encodeURIComponent('Ti-Age Pairing\n' + finalUrl);
        window.open('https://wa.me/?text=' + message, '_blank');
    }

    function checkImportFromURL() {
        const params = new URLSearchParams(window.location.search);
        const token = params.get('du');
        if (!token) return false;

        let payload;
        try {
            payload = JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(token)))));
        } catch (e) {
            console.warn('[MemoryManagerV2] Ungültiger Import-Token:', e);
            return false;
        }

        if (!payload || !payload.a) return false;

        if (typeof TiageState !== 'undefined') {
            TiageState.setArchetype('partner', payload.a);
            // Multi-slot: wenn Sender mehrere ICH-Archetypen hatte, als Partner-Slots speichern
            if (payload.s && payload.s.length > 1 && TiageState.setPartnerSlots) {
                TiageState.setPartnerSlots(payload.s);
            } else if (TiageState.setPartnerSlots) {
                TiageState.setPartnerSlots([payload.a]);
            }
            if (payload.g) TiageState.set('personDimensions.partner.geschlecht', payload.g);
            if (payload.d) TiageState.set('personDimensions.partner.dominanz', payload.d);
            if (payload.o) TiageState.set('personDimensions.partner.orientierung', payload.o);

            const extras = payload.f || { fit: false, fuckedup: false, horny: false, fresh: false };
            TiageState.set('personDimensions.partner.geschlecht_extras', extras);
            if (typeof window.geschlechtExtrasCache !== 'undefined') {
                window.geschlechtExtrasCache.partner = {
                    fit: !!extras.fit,
                    fuckedup: !!extras.fuckedup,
                    horny: !!extras.horny
                };
            }
            // Load base profile for partner
            if (typeof ProfileCalculator !== 'undefined') {
                ProfileCalculator.loadProfile('partner', {
                    archetyp: payload.a,
                    geschlecht: payload.g,
                    dominanz: payload.d,
                    orientierung: payload.o
                });
            }
            // Apply manually locked need overrides on top of base profile
            if (payload.n && Object.keys(payload.n).length > 0) {
                const baseNeeds = TiageState.get('flatNeeds.partner') || {};
                TiageState.set('flatNeeds.partner', Object.assign({}, baseNeeds, payload.n));
            }

            TiageState.saveToStorage();

            // Apply eigenschaft toggle states async (requires fetching JSON)
            // Runs after saveToStorage and saves again once applied
            if (payload.e && payload.e[payload.a] && typeof window.applyEigenschaftenToPartner === 'function') {
                window.applyEigenschaftenToPartner(payload.a, payload.e[payload.a]).then(function() {
                    TiageState.saveToStorage();
                });
            }
        }

        // Dropdowns
        const partnerSelect = document.getElementById('partnerSelect');
        const mobilePartnerSelect = document.getElementById('mobilePartnerSelect');
        if (partnerSelect) partnerSelect.value = payload.a;
        if (mobilePartnerSelect) mobilePartnerSelect.value = payload.a;

        if (typeof window.updateArchetypeGrid === 'function') window.updateArchetypeGrid('partner', payload.a);
        if (typeof window.syncGeschlechtUI === 'function') window.syncGeschlechtUI('partner');
        if (typeof window.syncDominanzUI === 'function') window.syncDominanzUI('partner');
        if (typeof window.syncOrientierungUI === 'function') window.syncOrientierungUI('partner');
        if (typeof window.syncGeschlechtExtrasUI === 'function') window.syncGeschlechtExtrasUI('partner');
        if (typeof window.updateComparisonView === 'function') window.updateComparisonView();

        window.history.replaceState(null, '', window.location.pathname + window.location.hash);

        const label = (payload.s && payload.s.length > 1)
            ? payload.s.map(function(s) { return ARCHETYPE_LABELS[s] || s; }).join(' · ')
            : (ARCHETYPE_LABELS[payload.a] || payload.a);
        if (typeof TiageToast !== 'undefined') {
            TiageToast.success('Partner-Profil importiert: ' + label + ' ✓');
        }

        console.log('[MemoryManagerV2] URL-Import Partner:', payload.a);
        return true;
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
                TiageState.subscribe('personDimensions.ich.geschlecht_extras', triggerAutoSave); // FFH explicit
                TiageState.subscribe('gewichtungen.ich', triggerAutoSave);
                TiageState.subscribe('rtiPriorities.ich', triggerAutoSave);
                TiageState.subscribe('archetypes.ich', triggerAutoSave);
                // FlatNeeds immer komplett für alle Archetypen speichern (wie Partner-Save)
                TiageState.subscribe('flatNeeds.ich', triggerAutoSaveAll);

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
                    allNeeds: data ? formatAllNeeds16(data.beduerfnisse, data.lockedNeeds) : '',
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
                    allNeeds: data ? formatAllNeeds16(data.beduerfnisse, data.lockedNeeds) : '',
                    score: data?.score || null,
                    ichArchetyp: data?.ichArchetyp || null,
                    ichArchetypLabel: data?.ichArchetyp ? ARCHETYPE_LABELS[data.ichArchetyp] : null,
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
                const data = raw ? JSON.parse(raw) : null;

                // Archetyp IMMER wechseln (auch ohne gespeicherte GOD-Daten)
                if (typeof TiageState !== 'undefined') {
                    TiageState.setArchetype('ich', archetyp);

                    // Bedürfnisse laden (umfrageWert + manuelle Anpassungen)
                    if (data && data.beduerfnisse) {
                        if (TiageState.setFlatNeeds) {
                            TiageState.setFlatNeeds('ich', data.beduerfnisse);
                        } else {
                            TiageState.set('flatNeeds.ich', data.beduerfnisse);
                        }
                    }

                    TiageState.saveToStorage();
                }

                // Dropdowns synchronisieren
                const ichSelect = document.getElementById('ichSelect');
                const mobileIchSelect = document.getElementById('mobileIchSelect');
                const archetypeSelect = document.getElementById('archetypeSelect');
                if (ichSelect) ichSelect.value = archetyp;
                if (mobileIchSelect) mobileIchSelect.value = archetyp;
                if (archetypeSelect) archetypeSelect.value = archetyp;

                // Archetyp-Grid Highlight aktualisieren
                if (typeof window.updateArchetypeGrid === 'function') {
                    window.updateArchetypeGrid('ich', archetyp);
                }

                // UI komplett aktualisieren
                if (typeof window.syncGeschlechtUI === 'function') window.syncGeschlechtUI('ich');
                if (typeof window.syncDominanzUI === 'function') window.syncDominanzUI('ich');
                if (typeof window.syncOrientierungUI === 'function') window.syncOrientierungUI('ich');
                if (typeof window.syncGeschlechtExtrasUI === 'function') window.syncGeschlechtExtrasUI('ich');
                if (typeof window.updateAll === 'function') window.updateAll();

                // AGOD UI aktualisieren
                if (typeof TiageWeights !== 'undefined' && TiageWeights.AGOD && TiageWeights.AGOD.init) {
                    TiageWeights.AGOD.init();
                }

                console.log(`[MemoryManagerV2] ICH geladen für ${archetyp}${data ? ' (mit GOD-Daten)' : ' (nur Archetyp)'}`);
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
                        var partnerDefault = { fit: false, fuckedup: false, horny: false, fresh: false };
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
        // ICH NUMBERED SLOTS (manuell, wie Partner)
        // ═══════════════════════════════════════════════════════════════════════

        getIchSaveSlots() {
            const slots = [];
            for (let i = 1; i <= MAX_ICH_SLOTS; i++) {
                const key = getIchSlotStorageKey(i);
                let data = null;
                try {
                    const raw = localStorage.getItem(key);
                    if (raw) data = JSON.parse(raw);
                } catch (e) {
                    console.warn('[MemoryManagerV2] Fehler beim Lesen ICH-Slot:', i, e);
                }

                // v7.0: beduerfnisse = { single: {...}, duo: {...} } → primären Slot für Anzeige extrahieren
                let displayNeeds = null;
                if (data && data.beduerfnisse) {
                    const isMultiArch = ARCHETYPES.some(a => data.beduerfnisse[a] !== undefined);
                    displayNeeds = isMultiArch
                        ? (data.beduerfnisse[data.archetyp] || data.beduerfnisse[ARCHETYPES.find(a => data.beduerfnisse[a])] || null)
                        : data.beduerfnisse;
                }

                slots.push({
                    slot: i,
                    isEmpty: !data,
                    data: data,
                    archetyp: data ? data.archetyp : null,
                    archetypLabel: data && data.archetyp ? (ARCHETYPE_LABELS[data.archetyp] || data.archetyp) : '-',
                    archetypIcon: data && data.archetyp ? (ARCHETYPE_ICONS[data.archetyp] || '👤') : null,
                    allNeeds: data ? formatAllNeeds16(displayNeeds, data.lockedNeeds) : '',
                    dateTime: data ? formatDateTime(data.timestamp) : '-'
                });
            }
            return slots;
        },

        saveIchToSlot(slotNumber) {
            if (slotNumber < 1 || slotNumber > MAX_ICH_SLOTS) return false;
            const data = collectCompleteIchData();
            const key = getIchSlotStorageKey(slotNumber);
            try {
                localStorage.setItem(key, JSON.stringify(data));
                console.log(`[MemoryManagerV2] ICH gespeichert in Slot ${slotNumber}`);
                return true;
            } catch (e) {
                console.error('[MemoryManagerV2] Fehler beim Speichern ICH-Slot:', e);
                return false;
            }
        },

        loadIchFromSlot(slotNumber) {
            if (slotNumber < 1 || slotNumber > MAX_ICH_SLOTS) return false;
            const key = getIchSlotStorageKey(slotNumber);
            try {
                const raw = localStorage.getItem(key);
                if (!raw) return false;
                const data = JSON.parse(raw);

                if (typeof TiageState !== 'undefined') {
                    if (data.archetyp) TiageState.setArchetype('ich', data.archetyp);

                    // beduerfnisse: v7.0 speichert alle Archetypen { single: {...}, duo: {...}, ... }
                    if (data.beduerfnisse) {
                        const isMultiArch = ARCHETYPES.some(a => data.beduerfnisse[a] !== undefined);
                        if (isMultiArch) {
                            ARCHETYPES.forEach(arch => {
                                if (data.beduerfnisse[arch]) {
                                    TiageState.set(`flatNeeds.ich.${arch}`, data.beduerfnisse[arch]);
                                }
                            });
                        } else {
                            // Altes Format (nur primary-Archetype-Daten)
                            if (TiageState.setFlatNeeds) {
                                TiageState.setFlatNeeds('ich', data.beduerfnisse);
                            }
                        }
                    }

                    // Locks wiederherstellen (auch leeres Objekt setzen um alte Locks zu löschen)
                    TiageState.set('profileReview.ich.global.lockedNeeds', data.lockedNeeds || {});

                    TiageState.saveToStorage();
                }

                const archetyp = data.archetyp;
                if (archetyp) {
                    const ichSelect = document.getElementById('ichSelect');
                    const mobileIchSelect = document.getElementById('mobileIchSelect');
                    const archetypeSelect = document.getElementById('archetypeSelect');
                    if (ichSelect) ichSelect.value = archetyp;
                    if (mobileIchSelect) mobileIchSelect.value = archetyp;
                    if (archetypeSelect) archetypeSelect.value = archetyp;
                    if (typeof window.updateArchetypeGrid === 'function') window.updateArchetypeGrid('ich', archetyp);
                }

                if (typeof window.syncGeschlechtUI === 'function') window.syncGeschlechtUI('ich');
                if (typeof window.syncDominanzUI === 'function') window.syncDominanzUI('ich');
                if (typeof window.syncOrientierungUI === 'function') window.syncOrientierungUI('ich');
                if (typeof window.syncGeschlechtExtrasUI === 'function') window.syncGeschlechtExtrasUI('ich');
                if (typeof window.updateAll === 'function') window.updateAll();
                // Lock-Zustand UI aktualisieren (archetype-interaction center needs display)
                if (typeof window._renderCenterNeeds16 === 'function') window._renderCenterNeeds16();
                document.dispatchEvent(new CustomEvent('flatNeedLockChange', { detail: { person: 'ich', bulk: true } }));
                if (typeof TiageWeights !== 'undefined' && TiageWeights.AGOD && TiageWeights.AGOD.init) {
                    TiageWeights.AGOD.init();
                }

                console.log(`[MemoryManagerV2] ICH geladen aus Slot ${slotNumber}`);
                return true;
            } catch (e) {
                console.error('[MemoryManagerV2] Fehler beim Laden ICH-Slot:', e);
                return false;
            }
        },

        deleteIchSlot(slotNumber) {
            if (slotNumber < 1 || slotNumber > MAX_ICH_SLOTS) return false;
            const key = getIchSlotStorageKey(slotNumber);
            try {
                localStorage.removeItem(key);
                console.log(`[MemoryManagerV2] ICH Slot ${slotNumber} gelöscht`);
                return true;
            } catch (e) {
                console.error('[MemoryManagerV2] Fehler beim Löschen ICH-Slot:', e);
                return false;
            }
        },

        getUsedIchSlotCount() {
            let count = 0;
            for (let i = 1; i <= MAX_ICH_SLOTS; i++) {
                if (localStorage.getItem(getIchSlotStorageKey(i))) count++;
            }
            return count;
        },

        getActiveIchSlot: _getActiveIchSaveSlot,
        setActiveIchSlot: _setActiveIchSaveSlot,

        // Auto-save zum aktiven Slot (falls einer ausgewählt ist)
        autoSaveIchToActiveSlot() {
            const slot = _getActiveIchSaveSlot();
            if (!slot) return false;
            const data = collectCompleteIchData();
            const key = getIchSlotStorageKey(slot);
            try {
                localStorage.setItem(key, JSON.stringify(data));
                console.log(`[MemoryManagerV2] Auto-Save ICH → Slot ${slot}`);
                return true;
            } catch(e) {
                console.error('[MemoryManagerV2] Auto-Save Fehler:', e);
                return false;
            }
        },

        MAX_ICH_SLOTS,

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
                if (!raw) return false;

                const data = JSON.parse(raw);

                if (typeof TiageState !== 'undefined' && data.beduerfnisse) {
                    // Guard: reject v7.0 complete-snapshots (multi-arch format) — wrong function
                    if (data.dataVersion === DATA_VERSION_COMPLETE) {
                        console.error('[MemoryManagerV2] restoreSettingsForArchetyp erwartet v6.0 (single-arch), nicht v7.0 (complete). Falscher Slot?');
                        return false;
                    }
                    if (TiageState.setFlatNeeds) {
                        TiageState.setFlatNeeds('ich', data.beduerfnisse);
                    } else {
                        TiageState.set('flatNeeds.ich', data.beduerfnisse);
                    }
                }

                console.log(`[MemoryManagerV2] Bedürfnisse wiederhergestellt für ${archetyp}:`,
                    Object.keys(data.beduerfnisse || {}).length + ' Bedürfnisse'
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
        formatAGOD: formatAGOD,

        // Du-Profil Teilen
        shareViaWhatsApp: shareViaWhatsApp,
        checkImportFromURL: checkImportFromURL
    };
})();

// URL-Import bei Seitenstart prüfen (nach App-Initialisierung, 600ms Versatz)
setTimeout(function() {
    if (typeof MemoryManagerV2 !== 'undefined') {
        MemoryManagerV2.checkImportFromURL();
    }
}, 600);

// ═══════════════════════════════════════════════════════════════════════════
// MODAL UI FUNCTIONS V2
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Öffnet das neue Memory Modal V2
 */
function _closeMemoryModalV2() {
    const modal = document.getElementById('memoryModalV2');
    if (modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function openMemoryModalV2() {
    const modal = document.getElementById('memoryModalV2');
    if (!modal) {
        console.error('[MemoryManagerV2] Modal nicht gefunden');
        return;
    }

    // Direct listeners — gesetzt nur einmal, unabhängig von ActionHandler/CSP
    if (!modal._closeListenersAdded) {
        modal._closeListenersAdded = true;
        // Overlay-Klick (außerhalb des Modal-Cards)
        modal.addEventListener('click', function(e) {
            if (e.target === modal) _closeMemoryModalV2();
        });
        // X-Button
        const closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                _closeMemoryModalV2();
            });
        }
    }

    // Inline-Style zurücksetzen damit CSS-Klasse greift
    modal.style.display = '';

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
    _closeMemoryModalV2();
}

/**
 * Aktualisiert den Modal-Inhalt
 */
function updateMemoryModalV2Content() {
    const ichContainer = document.getElementById('memoryIchSlotsList');
    const partnerContainer = document.getElementById('memoryPartnerSlotsList');

    if (!ichContainer || !partnerContainer) return;

    // ICH-Slots (manuell, wie Partner)
    const ichSaveSlots = MemoryManagerV2.getIchSaveSlots();
    const activeIchSlot = MemoryManagerV2.getActiveIchSlot();
    let ichHtml = '';

    for (const slot of ichSaveSlots) {
        const isActive = slot.slot === activeIchSlot;
        const activeLabel = isActive ? ' <span style="font-size:9px;color:#818CF8;font-weight:700;margin-left:4px;">AUTO</span>' : '';
        ichHtml += `
        <div class="memory-partner-slot ${slot.isEmpty ? 'empty' : 'filled'}${isActive ? ' active-save-slot' : ''}" data-slot="${slot.slot}" style="${isActive ? 'border-color:#818CF8;box-shadow:0 0 6px rgba(129,140,248,0.35);' : ''}">
            <div class="memory-slot-number">${slot.slot}${activeLabel}</div>
            ${slot.isEmpty ? `
                <div class="memory-slot-empty">Leer</div>
                <button class="memory-save-btn" data-action-save-ich="${slot.slot}" title="ICH hier speichern">
                    💾
                </button>
            ` : `
                <div class="memory-slot-archetyp">${slot.archetypIcon ? slot.archetypIcon + ' ' : ''}${slot.archetypLabel}</div>
                <div class="memory-slot-needs-grid">${slot.allNeeds}</div>
                <div class="memory-slot-date" title="Gespeichert: ${slot.dateTime}">${slot.dateTime}</div>
                <div class="memory-slot-actions">
                    <button class="memory-display-btn" data-action-display-ich-slot="${slot.slot}" title="Anzeigen">👁️</button>
                    <button class="memory-load-btn" data-action-load-ich-slot="${slot.slot}" title="Laden">📥</button>
                    <button class="memory-save-btn" data-action-save-ich="${slot.slot}" title="Aktuellen Zustand hier speichern" style="padding:2px 6px;font-size:11px;">💾</button>
                    <button class="memory-delete-btn" data-action-delete-ich-slot="${slot.slot}" title="Löschen">🗑️</button>
                </div>
            `}
        </div>
        `;
    }
    ichContainer.innerHTML = ichHtml;

    // Event-Delegation für ICH-Slots — einmalig setzen (Container ist statisch)
    if (!ichContainer._delegationActive) {
        ichContainer._delegationActive = true;
        ichContainer.addEventListener('click', function(e) {
            const saveBtn    = e.target.closest('[data-action-save-ich]');
            const displayBtn = e.target.closest('[data-action-display-ich-slot]');
            const loadBtn    = e.target.closest('[data-action-load-ich-slot]');
            const deleteBtn  = e.target.closest('[data-action-delete-ich-slot]');
            if (saveBtn)    { handleSaveIchSlotV2(parseInt(saveBtn.dataset.actionSaveIch)); return; }
            if (displayBtn) { e.stopPropagation(); handleDisplayIchSlotV2(parseInt(displayBtn.dataset.actionDisplayIchSlot)); return; }
            if (loadBtn)    { handleLoadIchSlotV2(parseInt(loadBtn.dataset.actionLoadIchSlot)); return; }
            if (deleteBtn)  { e.stopPropagation(); handleDeleteIchSlotV2(parseInt(deleteBtn.dataset.actionDeleteIchSlot)); }
        });
    }

    // Partner-Slots (8 unabhängige)
    const partnerSlots = MemoryManagerV2.getPartnerSlots();
    let partnerHtml = '';

    for (const slot of partnerSlots) {
        partnerHtml += `
        <div class="memory-partner-slot ${slot.isEmpty ? 'empty' : 'filled'}" data-slot="${slot.slot}">
            <div class="memory-slot-number">${slot.slot}</div>
            ${slot.isEmpty ? `
                <div class="memory-slot-empty">Leer</div>
                <button class="memory-save-btn" data-action-save-partner="${slot.slot}" title="Partner hier speichern">
                    💾
                </button>
            ` : `
                <div class="memory-slot-archetyp">${slot.archetypLabel}</div>
                <div class="memory-slot-needs-grid">${slot.allNeeds}</div>
                <div class="memory-slot-date" title="Gespeichert: ${slot.dateTime}">${slot.dateTime}</div>
                <div class="memory-slot-actions">
                    <button class="memory-display-btn" data-action-display-partner="${slot.slot}" title="Anzeigen">👁️</button>
                    <button class="memory-load-btn" data-action-load-partner="${slot.slot}" title="Laden">📥</button>
                    <button class="memory-delete-btn" data-action-delete-partner="${slot.slot}" title="Löschen">🗑️</button>
                </div>
            `}
        </div>
        `;
    }
    partnerContainer.innerHTML = partnerHtml;

    // Event-Delegation für Partner-Slots — einmalig setzen (Container ist statisch)
    if (!partnerContainer._delegationActive) {
        partnerContainer._delegationActive = true;
        partnerContainer.addEventListener('click', function(e) {
            const saveBtn    = e.target.closest('[data-action-save-partner]');
            const displayBtn = e.target.closest('[data-action-display-partner]');
            const loadBtn    = e.target.closest('[data-action-load-partner]');
            const deleteBtn  = e.target.closest('[data-action-delete-partner]');
            if (saveBtn)    { handleSavePartnerV2(parseInt(saveBtn.dataset.actionSavePartner)); return; }
            if (displayBtn) { handleDisplayPartnerV2(parseInt(displayBtn.dataset.actionDisplayPartner)); return; }
            if (loadBtn)    { handleLoadPartnerV2(parseInt(loadBtn.dataset.actionLoadPartner)); return; }
            if (deleteBtn)  { handleDeletePartnerV2(parseInt(deleteBtn.dataset.actionDeletePartner)); }
        });
    }

    // Update Slot-Counts
    const ichCountEl = document.getElementById('memoryIchSlotCount');
    const partnerCountEl = document.getElementById('memoryPartnerSlotCount');
    if (ichCountEl) {
        ichCountEl.textContent = `${MemoryManagerV2.getUsedIchSlotCount()}/8`;
    }
    if (partnerCountEl) {
        partnerCountEl.textContent = `${MemoryManagerV2.getUsedPartnerSlotCount()}/8`;
    }

    // Export/Import-Footer
    const footer = document.getElementById('memoryModalV2Footer');
    if (footer) {
        footer.innerHTML = '';
        const exportBtn = document.createElement('button');
        exportBtn.textContent = '📤 Export';
        exportBtn.title = 'Alle Daten als JSON-Datei herunterladen (z.B. für Transfer nach Discord)';
        exportBtn.style.cssText = 'padding:6px 12px;border-radius:6px;border:1px solid rgba(255,255,255,0.2);background:rgba(255,255,255,0.08);color:#94a3b8;cursor:pointer;font-size:12px;';
        exportBtn.addEventListener('click', exportMemoryData);
        const importBtn = document.createElement('button');
        importBtn.textContent = '📥 Import';
        importBtn.title = 'JSON-Backup importieren';
        importBtn.style.cssText = exportBtn.style.cssText;
        importBtn.addEventListener('click', importMemoryData);
        footer.appendChild(importBtn);
        footer.appendChild(exportBtn);
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
            <div class="memory-detail-section-title" style="cursor: pointer;" data-toggle-raw="${uniqueId}">
                ROHDATEN (JSON) <span id="rawIcon_${uniqueId}" style="float: right;">+</span>
            </div>
            <div id="rawJson_${uniqueId}" class="memory-detail-raw-json" style="display: none;">
                <pre>${escapeHtml(rawJson)}</pre>
            </div>
        </div>
    `;

    showDetailModal(`ICH: ${slot.label}`, detailHtml);
}

// ═══ ICH NUMBERED SLOT HANDLERS ═══

function handleSaveIchSlotV2(slotNumber) {
    if (MemoryManagerV2.saveIchToSlot(slotNumber)) {
        MemoryManagerV2.setActiveIchSlot(slotNumber); // → auto-save target
        updateMemoryModalV2Content();
        showMemoryToast(`ICH in Slot ${slotNumber} gespeichert ✓ (aktiver Slot)`);
    } else {
        showMemoryToast('Fehler beim Speichern', 'error');
    }
}

function handleLoadIchSlotV2(slotNumber) {
    if (MemoryManagerV2.loadIchFromSlot(slotNumber)) {
        MemoryManagerV2.setActiveIchSlot(slotNumber); // → auto-save target
        showMemoryToast(`ICH aus Slot ${slotNumber} geladen ✓ (aktiver Slot)`);
        closeMemoryModalV2();
    } else {
        showMemoryToast('Fehler beim Laden', 'error');
    }
}

function handleDeleteIchSlotV2(slotNumber) {
    if (MemoryManagerV2.deleteIchSlot(slotNumber)) {
        updateMemoryModalV2Content();
        showMemoryToast(`ICH Slot ${slotNumber} gelöscht`);
    } else {
        showMemoryToast('Fehler beim Löschen', 'error');
    }
}

function handleDisplayIchSlotV2(slotNumber) {
    const slots = MemoryManagerV2.getIchSaveSlots();
    const slot = slots.find(s => s.slot === slotNumber);
    if (!slot || slot.isEmpty) {
        showMemoryToast('Keine Daten vorhanden', 'error');
        return;
    }
    const data = slot.data;
    const rawJson = JSON.stringify(data, null, 2);
    const uniqueId = 'ich_slot_' + slotNumber + '_' + Date.now();
    const detailHtml = `
        <div class="memory-detail-section">
            <div class="memory-detail-section-title">ICH Slot ${slotNumber}: ${slot.archetypIcon || '👤'} ${slot.archetypLabel}</div>
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
        ${generateNeedsBreakdownV2(data, uniqueId + '_needs')}
        <div class="memory-detail-section">
            <div class="memory-detail-section-title" style="cursor: pointer;" data-toggle-raw="${uniqueId}">
                ROHDATEN (JSON) <span id="rawIcon_${uniqueId}" style="float: right;">+</span>
            </div>
            <div id="rawJson_${uniqueId}" class="memory-detail-raw-json" style="display: none;">
                <pre>${escapeHtml(rawJson)}</pre>
            </div>
        </div>
    `;
    showDetailModal(`ICH Slot ${slotNumber}`, detailHtml);
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
            <div class="memory-detail-section-title" style="cursor: pointer;" data-toggle-raw="${uniqueId}">
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
            <div class="memory-detail-section-title" style="cursor: pointer;" data-toggle-raw="${uniqueId}">
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
        <div class="memory-detail-section-title" style="cursor: pointer;" data-toggle-raw="${uniqueId}">
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
        if (!contentEl._toggleRawDelegated) {
            contentEl._toggleRawDelegated = true;
            contentEl.addEventListener('click', function(e) {
                const el = e.target.closest('[data-toggle-raw]');
                if (el) toggleRawJson(el.dataset.toggleRaw);
            });
        }
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

/**
 * Exportiert alle tiage-*  localStorage-Einträge als JSON-Datei (für Cross-Context Transfer)
 */
function exportMemoryData() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('tiage')) {
            data[key] = localStorage.getItem(key);
        }
    }
    const count = Object.keys(data).length;
    if (count === 0) {
        showMemoryToast('Keine Daten vorhanden', 'error');
        return;
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tiage-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showMemoryToast(`${count} Einträge exportiert`);
}

/**
 * Importiert tiage-* Einträge aus einer JSON-Datei in localStorage
 */
function importMemoryData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json,application/json';
    input.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.addEventListener('load', function(ev) {
            try {
                const data = JSON.parse(ev.target.result);
                let count = 0;
                for (const [key, value] of Object.entries(data)) {
                    if (typeof key === 'string' && key.startsWith('tiage') && typeof value === 'string') {
                        localStorage.setItem(key, value);
                        count++;
                    }
                }
                showMemoryToast(`${count} Einträge importiert — Seite wird neu geladen`);
                setTimeout(() => window.location.reload(), 1200);
            } catch (err) {
                showMemoryToast('Import-Fehler: ungültige Datei', 'error');
            }
        });
        reader.readAsText(file);
    });
    input.click();
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
window.exportMemoryData = exportMemoryData;
window.importMemoryData = importMemoryData;

// Auto-Save initialisieren wenn DOM bereit
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        MemoryManagerV2.initAutoSave();
    });
} else {
    MemoryManagerV2.initAutoSave();
}

console.log('[MemoryManagerV2] Modul geladen');
