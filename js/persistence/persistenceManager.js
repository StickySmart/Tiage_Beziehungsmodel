/**
 * persistenceManager.js — LocalStorage / Session Persistence
 * Extracted from app-main.js v1.8.1025
 *
 * Dependencies (via window.*):
 *   window.getIchArchetype(), window.setIchArchetype()
 *   window.getPartnerArchetype(), window.setPartnerArchetype()
 *   window.personDimensions, window.mobilePersonDimensions
 *   window.geschlechtExtrasCache
 *   window.syncGeschlechtUI, window.syncGeschlechtExtrasUI
 *   window.syncDominanzUI, window.syncOrientierungUI
 *   window.updateComparisonView, window.updateArchetypeGrid
 *   window.updateRFactorDisplay, window.mobileGoToPage
 *   TiageState, TiageI18n, TiageToast
 */
(function() {
    'use strict';

function saveSelectionToStorage() {
    const selection = {
        ich: {
            archetyp: window.getIchArchetype(),
            geschlecht: window.personDimensions.ich.geschlecht,
            dominanz: window.personDimensions.ich.dominanz, // Multi-select object
            orientierung: window.personDimensions.ich.orientierung, // Multi-select object
            geschlecht_extras: window.geschlechtExtrasCache.ich // From local cache (SSOT-sync)
        },
        partner: {
            archetyp: window.getPartnerArchetype(),
            geschlecht: window.personDimensions.partner.geschlecht,
            dominanz: window.personDimensions.partner.dominanz, // Multi-select object
            orientierung: window.personDimensions.partner.orientierung, // Multi-select object
            geschlecht_extras: window.geschlechtExtrasCache.partner // From local cache (SSOT-sync)
        }
    };

    try {
        // TiageState als SSOT - selection und window.personDimensions speichern
        if (typeof TiageState !== 'undefined') {
            TiageState.set('ui.selection', selection);
            TiageState.set('personDimensions.ich', window.personDimensions.ich);
            TiageState.set('personDimensions.partner', window.personDimensions.partner);
            TiageState.saveToStorage();
        }
    } catch (e) {
        console.warn('TiageState not available:', e);
    }
}

function loadSelectionFromStorage() {
    try {
        // Lade von TiageState (SSOT) mit localStorage Fallback
        let selection = null;
        if (typeof TiageState !== 'undefined') {
            selection = TiageState.get('ui.selection');
        }
        // Fallback: alte localStorage-Daten (werden bei loadFromStorage migriert)
        if (!selection) {
            const saved = localStorage.getItem('tiage-selection');
            if (!saved) return false;
            selection = JSON.parse(saved);
        }
        if (!selection) return false;

        // Mapping von alten #A1-#A8 Keys zu neuen String-Keys
        const archetypeIdToKey = {
            '#A1': 'single',
            '#A2': 'duo',
            '#A3': 'duo_flex',
            '#A4': 'solopoly',
            '#A5': 'polyamor',
            '#A6': 'ra',
            '#A7': 'lat',
            '#A8': 'aromantisch'
        };
        const convertArchetypeId = (id) => {
            if (!id) return id;
            return archetypeIdToKey[id] || id;
        };

        // Restore ICH
        if (selection.ich) {
            const ichArchetyp = convertArchetypeId(selection.ich.archetyp);
            window.setIchArchetype(ichArchetyp);
            window.setIchArchetype(ichArchetyp);
            document.getElementById('mobileIchSelect').value = ichArchetyp;
            const ichSelect = document.getElementById('ichSelect');
            if (ichSelect) ichSelect.value = ichArchetyp;

            if (selection.ich.geschlecht) {
                // Handle new primary/secondary format
                if (typeof selection.ich.geschlecht === 'object' && 'primary' in selection.ich.geschlecht) {
                    // New format: { primary: 'cis-mann', secondary: null }
                    window.personDimensions.ich.geschlecht = selection.ich.geschlecht;
                    if (typeof window.mobilePersonDimensions !== 'undefined') {
                        window.mobilePersonDimensions.ich.geschlecht = selection.ich.geschlecht;
                    }
                } else {
                    // Old format: string like "cis-mann" - convert to new format
                    window.personDimensions.ich.geschlecht = { primary: selection.ich.geschlecht, secondary: null };
                    if (typeof window.mobilePersonDimensions !== 'undefined') {
                        window.mobilePersonDimensions.ich.geschlecht = { primary: selection.ich.geschlecht, secondary: null };
                    }
                }
                // Sync UI
                if (typeof window.syncGeschlechtUI === 'function') {
                    window.syncGeschlechtUI('ich');
                }
                if (window.personDimensions.ich.geschlecht.primary) {
                    const dimension = document.querySelector('[data-dimension="ich-geschlecht-new"]');
                    if (dimension) dimension.classList.remove('needs-selection');
                }
            }

            if (selection.ich.dominanz) {
                // Handle new primary/secondary format
                if (typeof selection.ich.dominanz === 'object' && 'primary' in selection.ich.dominanz) {
                    // New format: { primary: 'dominant', secondary: null }
                    window.personDimensions.ich.dominanz = selection.ich.dominanz;
                    if (typeof window.mobilePersonDimensions !== 'undefined') {
                        window.mobilePersonDimensions.ich.dominanz = selection.ich.dominanz;
                    }
                    // Sync UI
                    if (typeof window.syncDominanzUI === 'function') {
                        window.syncDominanzUI('ich');
                    }
                    if (selection.ich.dominanz.primary) {
                        const dimension = document.querySelector('[data-dimension="ich-dominanz-multi"]');
                        if (dimension) dimension.classList.remove('needs-selection');
                    }
                } else if (typeof selection.ich.dominanz === 'object') {
                    // Old format: { dominant: 'gelebt', submissiv: null, ... }
                    // Convert to new format
                    let primary = null;
                    let secondary = null;
                    for (const [type, status] of Object.entries(selection.ich.dominanz)) {
                        if (status === 'gelebt' && !primary) {
                            primary = type;
                        } else if (status === 'interessiert' && !secondary) {
                            secondary = type;
                        }
                    }
                    window.personDimensions.ich.dominanz = { primary, secondary };
                    if (typeof window.mobilePersonDimensions !== 'undefined') {
                        window.mobilePersonDimensions.ich.dominanz = { primary, secondary };
                    }
                    // Sync UI
                    if (typeof window.syncDominanzUI === 'function') {
                        window.syncDominanzUI('ich');
                    }
                    if (primary) {
                        const dimension = document.querySelector('[data-dimension="ich-dominanz-multi"]');
                        if (dimension) dimension.classList.remove('needs-selection');
                    }
                } else {
                    // Legacy: string format - convert to new primary/secondary format
                    window.personDimensions.ich.dominanz = { primary: selection.ich.dominanz, secondary: null };
                    if (typeof window.mobilePersonDimensions !== 'undefined') {
                        window.mobilePersonDimensions.ich.dominanz = { primary: selection.ich.dominanz, secondary: null };
                    }
                    // Sync UI
                    if (typeof window.syncDominanzUI === 'function') {
                        window.syncDominanzUI('ich');
                    }
                    const dimension = document.querySelector('[data-dimension="ich-dominanz-multi"]');
                    if (dimension) dimension.classList.remove('needs-selection');
                }
            }

            if (selection.ich.orientierung) {
                // Handle new primary/secondary format
                if (typeof selection.ich.orientierung === 'object' && 'primary' in selection.ich.orientierung) {
                    // New format: { primary: 'heterosexuell', secondary: null }
                    window.personDimensions.ich.orientierung = selection.ich.orientierung;
                    if (typeof window.mobilePersonDimensions !== 'undefined') {
                        window.mobilePersonDimensions.ich.orientierung = selection.ich.orientierung;
                    }
                    // Sync UI
                    if (typeof window.syncOrientierungUI === 'function') {
                        window.syncOrientierungUI('ich');
                    }
                    if (selection.ich.orientierung.primary) {
                        const dimension = document.querySelector('[data-dimension="ich-orientierung-multi"]');
                        if (dimension) dimension.classList.remove('needs-selection');
                    }
                } else if (typeof selection.ich.orientierung === 'object') {
                    // Old format: { heterosexuell: 'gelebt', homosexuell: null, ... }
                    // Convert to new format
                    let primary = null;
                    let secondary = null;
                    for (const [type, status] of Object.entries(selection.ich.orientierung)) {
                        if (status === 'gelebt' && !primary) {
                            primary = type;
                        } else if (status === 'interessiert' && !secondary) {
                            secondary = type;
                        }
                    }
                    window.personDimensions.ich.orientierung = { primary, secondary };
                    if (typeof window.mobilePersonDimensions !== 'undefined') {
                        window.mobilePersonDimensions.ich.orientierung = { primary, secondary };
                    }
                    // Sync UI
                    if (typeof window.syncOrientierungUI === 'function') {
                        window.syncOrientierungUI('ich');
                    }
                    if (primary) {
                        const dimension = document.querySelector('[data-dimension="ich-orientierung-multi"]');
                        if (dimension) dimension.classList.remove('needs-selection');
                    }
                } else {
                    // Legacy: string format - convert to new primary/secondary format
                    window.personDimensions.ich.orientierung = { primary: selection.ich.orientierung, secondary: null };
                    if (typeof window.mobilePersonDimensions !== 'undefined') {
                        window.mobilePersonDimensions.ich.orientierung = { primary: selection.ich.orientierung, secondary: null };
                    }
                    // Sync UI
                    if (typeof window.syncOrientierungUI === 'function') {
                        window.syncOrientierungUI('ich');
                    }
                    const dimension = document.querySelector('[data-dimension="ich-orientierung-multi"]');
                    if (dimension) dimension.classList.remove('needs-selection');
                }
            }

            // Restore geschlecht_extras (Fit/Fucked up/Horny)
            if (selection.ich.geschlecht_extras) {
                const extras = selection.ich.geschlecht_extras;
                // Sync to local cache (SSOT → Cache)
                window.geschlechtExtrasCache.ich = {
                    fit: !!extras.fit,
                    fuckedup: !!extras.fuckedup,
                    horny: !!extras.horny
                };
                // Sync to TiageState
                if (typeof TiageState !== 'undefined') {
                    TiageState.set('personDimensions.ich.geschlecht_extras', window.geschlechtExtrasCache.ich);
                }
                // Sync UI
                if (typeof window.syncGeschlechtExtrasUI === 'function') {
                    window.syncGeschlechtExtrasUI('ich');
                }
            }
        }

        // Restore PARTNER
        if (selection.partner) {
            const partnerArchetyp = convertArchetypeId(selection.partner.archetyp);
            window.setPartnerArchetype(partnerArchetyp);
            selectedPartner = partnerArchetyp;
            document.getElementById('mobilePartnerSelect').value = partnerArchetyp;
            const partnerSelect = document.getElementById('partnerSelect');
            if (partnerSelect) partnerSelect.value = partnerArchetyp;

            if (selection.partner.geschlecht) {
                // Handle new primary/secondary format
                if (typeof selection.partner.geschlecht === 'object' && 'primary' in selection.partner.geschlecht) {
                    // New format: { primary: 'cis-mann', secondary: null }
                    window.personDimensions.partner.geschlecht = selection.partner.geschlecht;
                    if (typeof window.mobilePersonDimensions !== 'undefined') {
                        window.mobilePersonDimensions.partner.geschlecht = selection.partner.geschlecht;
                    }
                } else {
                    // Old format: string like "cis-mann" - convert to new format
                    window.personDimensions.partner.geschlecht = { primary: selection.partner.geschlecht, secondary: null };
                    if (typeof window.mobilePersonDimensions !== 'undefined') {
                        window.mobilePersonDimensions.partner.geschlecht = { primary: selection.partner.geschlecht, secondary: null };
                    }
                }
                // Sync UI
                if (typeof window.syncGeschlechtUI === 'function') {
                    window.syncGeschlechtUI('partner');
                }
                if (window.personDimensions.partner.geschlecht.primary) {
                    const dimension = document.querySelector('[data-dimension="partner-geschlecht-new"]');
                    if (dimension) dimension.classList.remove('needs-selection');
                }
            }

            if (selection.partner.dominanz) {
                // Handle new primary/secondary format
                if (typeof selection.partner.dominanz === 'object' && 'primary' in selection.partner.dominanz) {
                    // New format: { primary: 'dominant', secondary: null }
                    window.personDimensions.partner.dominanz = selection.partner.dominanz;
                    if (typeof window.mobilePersonDimensions !== 'undefined') {
                        window.mobilePersonDimensions.partner.dominanz = selection.partner.dominanz;
                    }
                    // Sync UI
                    if (typeof window.syncDominanzUI === 'function') {
                        window.syncDominanzUI('partner');
                    }
                    if (selection.partner.dominanz.primary) {
                        const dimension = document.querySelector('[data-dimension="partner-dominanz-multi"]');
                        if (dimension) dimension.classList.remove('needs-selection');
                    }
                } else if (typeof selection.partner.dominanz === 'object') {
                    // Old format: { dominant: 'gelebt', submissiv: null, ... }
                    // Convert to new format
                    let primary = null;
                    let secondary = null;
                    for (const [type, status] of Object.entries(selection.partner.dominanz)) {
                        if (status === 'gelebt' && !primary) {
                            primary = type;
                        } else if (status === 'interessiert' && !secondary) {
                            secondary = type;
                        }
                    }
                    window.personDimensions.partner.dominanz = { primary, secondary };
                    if (typeof window.mobilePersonDimensions !== 'undefined') {
                        window.mobilePersonDimensions.partner.dominanz = { primary, secondary };
                    }
                    // Sync UI
                    if (typeof window.syncDominanzUI === 'function') {
                        window.syncDominanzUI('partner');
                    }
                    if (primary) {
                        const dimension = document.querySelector('[data-dimension="partner-dominanz-multi"]');
                        if (dimension) dimension.classList.remove('needs-selection');
                    }
                } else {
                    // Legacy: string format - convert to new primary/secondary format
                    window.personDimensions.partner.dominanz = { primary: selection.partner.dominanz, secondary: null };
                    if (typeof window.mobilePersonDimensions !== 'undefined') {
                        window.mobilePersonDimensions.partner.dominanz = { primary: selection.partner.dominanz, secondary: null };
                    }
                    // Sync UI
                    if (typeof window.syncDominanzUI === 'function') {
                        window.syncDominanzUI('partner');
                    }
                    const dimension = document.querySelector('[data-dimension="partner-dominanz-multi"]');
                    if (dimension) dimension.classList.remove('needs-selection');
                }
            }

            if (selection.partner.orientierung) {
                // Handle new primary/secondary format
                if (typeof selection.partner.orientierung === 'object' && 'primary' in selection.partner.orientierung) {
                    // New format: { primary: 'heterosexuell', secondary: null }
                    window.personDimensions.partner.orientierung = selection.partner.orientierung;
                    if (typeof window.mobilePersonDimensions !== 'undefined') {
                        window.mobilePersonDimensions.partner.orientierung = selection.partner.orientierung;
                    }
                    // Sync UI
                    if (typeof window.syncOrientierungUI === 'function') {
                        window.syncOrientierungUI('partner');
                    }
                    if (selection.partner.orientierung.primary) {
                        const dimension = document.querySelector('[data-dimension="partner-orientierung-multi"]');
                        if (dimension) dimension.classList.remove('needs-selection');
                    }
                } else if (typeof selection.partner.orientierung === 'object') {
                    // Old format: { heterosexuell: 'gelebt', homosexuell: null, ... }
                    // Convert to new format
                    let primary = null;
                    let secondary = null;
                    for (const [type, status] of Object.entries(selection.partner.orientierung)) {
                        if (status === 'gelebt' && !primary) {
                            primary = type;
                        } else if (status === 'interessiert' && !secondary) {
                            secondary = type;
                        }
                    }
                    window.personDimensions.partner.orientierung = { primary, secondary };
                    if (typeof window.mobilePersonDimensions !== 'undefined') {
                        window.mobilePersonDimensions.partner.orientierung = { primary, secondary };
                    }
                    // Sync UI
                    if (typeof window.syncOrientierungUI === 'function') {
                        window.syncOrientierungUI('partner');
                    }
                    if (primary) {
                        const dimension = document.querySelector('[data-dimension="partner-orientierung-multi"]');
                        if (dimension) dimension.classList.remove('needs-selection');
                    }
                } else {
                    // Legacy: string format - convert to new primary/secondary format
                    window.personDimensions.partner.orientierung = { primary: selection.partner.orientierung, secondary: null };
                    if (typeof window.mobilePersonDimensions !== 'undefined') {
                        window.mobilePersonDimensions.partner.orientierung = { primary: selection.partner.orientierung, secondary: null };
                    }
                    // Sync UI
                    if (typeof window.syncOrientierungUI === 'function') {
                        window.syncOrientierungUI('partner');
                    }
                    const dimension = document.querySelector('[data-dimension="partner-orientierung-multi"]');
                    if (dimension) dimension.classList.remove('needs-selection');
                }
            }

            // Restore geschlecht_extras (Fit/Fucked up/Horny)
            if (selection.partner.geschlecht_extras) {
                const extras = selection.partner.geschlecht_extras;
                // Sync to local cache (SSOT → Cache)
                window.geschlechtExtrasCache.partner = {
                    fit: !!extras.fit,
                    fuckedup: !!extras.fuckedup,
                    horny: !!extras.horny
                };
                // Sync to TiageState
                if (typeof TiageState !== 'undefined') {
                    TiageState.set('personDimensions.partner.geschlecht_extras', window.geschlechtExtrasCache.partner);
                }
                // Sync UI
                if (typeof window.syncGeschlechtExtrasUI === 'function') {
                    window.syncGeschlechtExtrasUI('partner');
                }
            }
        }

        // Sync window.mobilePersonDimensions to window.personDimensions for desktop view
        window.personDimensions.ich = { ...window.mobilePersonDimensions.ich };
        window.personDimensions.partner = { ...window.mobilePersonDimensions.partner };

        // Sync all UIs (Desktop, Mobile, Modal) for dominanz
        if (typeof window.syncDominanzUI === 'function') {
            window.syncDominanzUI('ich');
            window.syncDominanzUI('partner');
        }

        // Sync all UIs (Desktop, Mobile, Modal) for orientierung
        if (typeof window.syncOrientierungUI === 'function') {
            window.syncOrientierungUI('ich');
            window.syncOrientierungUI('partner');
        }

        // Update comparison view with loaded data
        if (typeof window.updateComparisonView === 'function') {
            window.updateComparisonView();
        }

        // Sync archetype grid highlighting with loaded selections
        if (typeof window.updateArchetypeGrid === 'function') {
            if (selection.ich && selection.ich.archetyp) {
                window.updateArchetypeGrid('ich', convertArchetypeId(selection.ich.archetyp));
            }
            if (selection.partner && selection.partner.archetyp) {
                window.updateArchetypeGrid('partner', convertArchetypeId(selection.partner.archetyp));
            }
        }

        return true;
    } catch (e) {
        console.warn('Failed to load from LocalStorage:', e);
        return false;
    }
}

function resetAll() {
    if (!confirm('Möchtest du wirklich alle Eingaben zurücksetzen?')) {
        return;
    }

    // Clear TiageState selection (SSOT)
    try {
        if (typeof TiageState !== 'undefined') {
            TiageState.set('ui.selection', null);
        }
    } catch (e) {
        console.warn('TiageState not available:', e);
    }

    // Reset mobile selections
    window.setIchArchetype(null);
    window.setPartnerArchetype(null);

    // ═══════════════════════════════════════════════════════════════════════════
    // PHASE 1: PROXY-LAYER MIGRATION
    // ═══════════════════════════════════════════════════════════════════════════
    // Verwende TiageState.reset() statt direkter Zuweisung
    // GOD-Auswahl (window.personDimensions) bleibt erhalten!
    // ═══════════════════════════════════════════════════════════════════════════
    if (typeof TiageState !== 'undefined' && TiageState.reset) {
        TiageState.reset();
        TiageToast.info('Alles zurückgesetzt 🔄');
        console.log('[resetAll] TiageState reset durchgeführt');

        // Legacy-Variablen synchronisieren (TiageState.reset() setzt auf null)
        window.setIchArchetype(null);
        window.setPartnerArchetype(null);
    }

    // Reset dropdowns
    const mobileIchSel = document.getElementById('mobileIchSelect');
    const mobilePartnerSel = document.getElementById('mobilePartnerSelect');
    const ichSel = document.getElementById('ichSelect');
    const partnerSel = document.getElementById('partnerSelect');
    if (mobileIchSel) mobileIchSel.value = '';
    if (mobilePartnerSel) mobilePartnerSel.value = '';
    if (ichSel) ichSel.value = '';
    if (partnerSel) partnerSel.value = '';

    // Reset archetype grids (remove active from all)
    if (typeof window.updateArchetypeGrid === 'function') {
        window.updateArchetypeGrid('ich', null);
        window.updateArchetypeGrid('partner', null);
    }

    // Reset R-Faktor-Anzeige
    if (typeof window.updateRFactorDisplay === 'function') {
        window.updateRFactorDisplay();
    }

    // Reset all radio buttons
    document.querySelectorAll('.mobile-page input[type="radio"]').forEach(radio => {
        radio.checked = false;
        const dimension = radio.closest('.compact-dimension');
        if (dimension) {
            dimension.classList.add('needs-selection');
        }
    });

    // Reset Desktop, Mobile and Modal multi-select checkboxes and status dropdowns
    const shortIds = ['dom', 'sub', 'sw', 'aus'];
    ['ich', 'partner'].forEach(person => {
        shortIds.forEach(shortId => {
            // Desktop
            const checkbox = document.getElementById(person + '-d-' + shortId);
            if (checkbox) checkbox.checked = false;
            const statusSelect = document.getElementById(person + '-d-' + shortId + '-status');
            if (statusSelect) {
                statusSelect.style.display = 'none';
                statusSelect.value = 'gelebt';
            }
            // Mobile
            const mobileCheckbox = document.getElementById('m-' + person + '-d-' + shortId);
            if (mobileCheckbox) mobileCheckbox.checked = false;
            const mobileStatusSelect = document.getElementById('m-' + person + '-d-' + shortId + '-status');
            if (mobileStatusSelect) {
                mobileStatusSelect.style.display = 'none';
                mobileStatusSelect.value = 'gelebt';
            }
            // Modal
            const modalCheckbox = document.getElementById('modal-' + person + '-d-' + shortId);
            if (modalCheckbox) modalCheckbox.checked = false;
            const modalStatusSelect = document.getElementById('modal-' + person + '-d-' + shortId + '-status');
            if (modalStatusSelect) {
                modalStatusSelect.style.display = 'none';
                modalStatusSelect.value = 'gelebt';
            }
        });
        // Mark dominanz as needing selection (Desktop, Mobile & Modal)
        const dimension = document.querySelector('[data-dimension="' + person + '-dominanz-multi"]');
        if (dimension) dimension.classList.add('needs-selection');
        const mobileDimension = document.querySelector('[data-dimension="mobile-' + person + '-dominanz-multi"]');
        if (mobileDimension) mobileDimension.classList.add('needs-selection');
        const modalDimension = document.querySelector('[data-dimension="modal-' + person + '-dominanz-multi"]');
        if (modalDimension) modalDimension.classList.add('needs-selection');

        // Mark orientierung as needing selection (Desktop, Mobile & Modal)
        const orientDimension = document.querySelector('[data-dimension="' + person + '-orientierung-multi"]');
        if (orientDimension) orientDimension.classList.add('needs-selection');
        const mobileOrientDimension = document.querySelector('[data-dimension="mobile-' + person + '-orientierung-multi"]');
        if (mobileOrientDimension) mobileOrientDimension.classList.add('needs-selection');
        const modalOrientDimension = document.querySelector('[data-dimension="modal-' + person + '-orientierung-multi"]');
        if (modalOrientDimension) modalOrientDimension.classList.add('needs-selection');
    });

    // Reset Geschlecht-Extras (Fit/Fucked up/Horny)
    ['ich', 'partner'].forEach(person => {
        // Reset local cache
        window.geschlechtExtrasCache[person] = { fit: false, fuckedup: false, horny: false };
        // Reset TiageState
        if (typeof TiageState !== 'undefined') {
            TiageState.set(`personDimensions.${person}.geschlecht_extras`, { fit: false, fuckedup: false, horny: false });
        }
        // Update UI
        window.syncGeschlechtExtrasUI(person);
    });
    console.log('[resetAll] Geschlecht-Extras zurückgesetzt');

    // Go to page 1
    window.mobileGoToPage(1);

    // Show confirmation
    const warning = document.createElement('div');
    warning.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: rgba(46, 204, 113, 0.95);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        font-size: 14px;
        font-weight: 600;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    warning.textContent = '✓ Alle Eingaben wurden zurückgesetzt';
    document.body.appendChild(warning);

    setTimeout(() => warning.remove(), 3000);
}

/**
 * Löscht die aktuelle Auswahl und setzt die UI zurück.
 * WICHTIG: Die gespeicherten Profile (Memory-Slots) bleiben erhalten!
 */
function clearAllStorage() {
    const confirmMsg = TiageI18n && TiageI18n.currentLang === 'en'
        ? 'Reset current selection and UI?\n\nThis will remove:\n• Current archetype selections\n• Current dimension settings\n• Current preferences\n\nSaved profiles (memory slots) will be PRESERVED!'
        : 'Aktuelle Auswahl und UI zurücksetzen?\n\nDies entfernt:\n• Aktuelle Archetyp-Auswahlen\n• Aktuelle Dimensions-Einstellungen\n• Aktuelle Präferenzen\n\nGespeicherte Profile (Speicherplätze) bleiben ERHALTEN!';

    if (!confirm(confirmMsg)) {
        return;
    }

    try {
        // Besucher-ID und Memory-Slots vor dem Löschen sichern
        const visitorId = localStorage.getItem('tiage_visitor_id');

        // Memory-Slots sichern (tiage_memory_ME001-004 und tiage_memory_PART001-004)
        const memorySlots = {};
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('tiage_memory_')) {
                memorySlots[key] = localStorage.getItem(key);
            }
        }

        // Lösche alle tiage_* Einträge AUSSER Memory-Slots
        const keysToDelete = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key && key.startsWith('tiage') && !key.startsWith('tiage_memory_')) {
                keysToDelete.push(key);
            }
        }
        keysToDelete.forEach(key => localStorage.removeItem(key));

        // Besucher-ID wiederherstellen
        if (visitorId) {
            localStorage.setItem('tiage_visitor_id', visitorId);
        }

        // Memory-Slots wiederherstellen
        Object.entries(memorySlots).forEach(([key, value]) => {
            if (value) {
                localStorage.setItem(key, value);
            }
        });

        // Legacy Keys löschen (Migration zu TiageState)
        localStorage.removeItem('tiage-selection');
        localStorage.removeItem('matchModalView');
        localStorage.removeItem('tiageSyntheseType');
        localStorage.removeItem('pathosLogosType');

        // TiageState UI-Settings zurücksetzen
        if (typeof TiageState !== 'undefined') {
            TiageState.set('ui.selection', null);
            TiageState.set('ui.matchModalView', 'pathos');
            TiageState.set('ui.syntheseType', 'score');
        }

        // Kurze Bestätigung anzeigen
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #10B981, #059669);
            color: white;
            padding: 20px 30px;
            border-radius: 12px;
            font-size: 16px;
            font-weight: 600;
            z-index: 99999;
            box-shadow: 0 8px 24px rgba(0,0,0,0.4);
            text-align: center;
        `;
        toast.innerHTML = TiageI18n && TiageI18n.currentLang === 'en'
            ? '✓ Selection cleared!<br><small>Saved profiles preserved. Reloading...</small>'
            : '✓ Auswahl gelöscht!<br><small>Profile erhalten. Lade neu...</small>';
        document.body.appendChild(toast);

        // Service Worker + Browser-Cache leeren
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.getRegistrations().then(function(regs) {
                regs.forEach(function(r) { r.unregister(); });
            });
        }
        if ('caches' in window) {
            caches.keys().then(function(names) {
                names.forEach(function(n) { caches.delete(n); });
            });
        }

        // Seite nach kurzer Verzögerung neu laden
        setTimeout(() => {
            window.location.reload();
        }, 1000);

    } catch (e) {
        console.error('[clearAllStorage] Fehler:', e);
        alert(TiageI18n.t('ui.errorClearing', 'Fehler beim Zurücksetzen: ') + e.message);
    }
}

// Auto-save on changes
function initAutoSave() {
    // Save on archetype change
    document.getElementById('mobileIchSelect')?.addEventListener('change', saveSelectionToStorage);
    document.getElementById('mobilePartnerSelect')?.addEventListener('change', saveSelectionToStorage);

    // Save on dimension change
    document.querySelectorAll('.mobile-page input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', saveSelectionToStorage);
    });
}

// Initialize window.geschlechtExtrasCache from TiageState (SSOT → Cache sync)
// v1.8.902: Enhanced logging for FFH persistence debugging
function initGeschlechtExtrasCacheFromState() {
    if (typeof TiageState === 'undefined') {
        console.warn('[FFH] TiageState not available');
        return;
    }

    console.log('[FFH] initGeschlechtExtrasCacheFromState called');

    ['ich', 'partner'].forEach(person => {
        const extras = TiageState.get(`personDimensions.${person}.geschlecht_extras`);
        console.log(`[FFH] ${person} geschlecht_extras from TiageState:`, JSON.stringify(extras));

        if (extras) {
            window.geschlechtExtrasCache[person] = {
                fit: !!extras.fit,
                fuckedup: !!extras.fuckedup,
                horny: !!extras.horny
            };
            console.log(`[FFH] ${person} cache updated:`, JSON.stringify(window.geschlechtExtrasCache[person]));

            // Sync UI
            if (typeof window.syncGeschlechtExtrasUI === 'function') {
                window.syncGeschlechtExtrasUI(person);
            }
        } else {
            console.log(`[FFH] ${person} no extras found, keeping defaults`);
        }
    });
}

// Load saved data on startup - fallback for legacy data
// TiageState is now loaded in DOMContentLoaded, so we only need
// to check for legacy 'tiage-selection' data if TiageState is empty
setTimeout(() => {
    // Check if TiageState already has data (loaded in DOMContentLoaded)
    // v4.0: geschlecht is a direct string, not an object with .primary
    const hasStateData = typeof TiageState !== 'undefined' &&
        (TiageState.get('personDimensions.ich.geschlecht') ||
         TiageState.get('personDimensions.partner.geschlecht') ||
         TiageState.get('personDimensions.ich.dominanz.primary') ||
         TiageState.get('personDimensions.partner.dominanz.primary'));

    // Only load from legacy storage if TiageState is empty
    if (!hasStateData) {
        loadSelectionFromStorage();
    } else {
        // TiageState has data - sync geschlecht_extras cache from it
        initGeschlechtExtrasCacheFromState();
    }
    initAutoSave();
}, 100); // Reduced timeout since DOMContentLoaded already loads TiageState


    // ── Exports ─────────────────────────────────────────────────────────────
    window.saveSelectionToStorage = saveSelectionToStorage;
    window.loadSelectionFromStorage = loadSelectionFromStorage;
    window.resetAll = resetAll;
    window.clearAllStorage = clearAllStorage;
    window.initAutoSave = initAutoSave;
    window.initGeschlechtExtrasCacheFromState = initGeschlechtExtrasCacheFromState;

})();
