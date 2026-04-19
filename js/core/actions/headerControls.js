/**
 * TIAGE Header Controls Actions
 *
 * Registriert Actions für Header-Buttons und allgemeine Steuerung.
 * Teil des Refactoring-Plans v2.0 - Phase 2.10.
 *
 * @version 1.0.0
 * @since 2026-01-27
 */
(function() {
    'use strict';

    /**
     * Sprachwechsel mit Ladeanzeige
     * @param {HTMLElement} langBtn - Der .lang-btn Button
     * @param {string} [targetLang] - Zielsprache, oder null für cycle
     */
    async function switchLanguageWithLoading(langBtn, targetLang) {
        if (typeof TiageI18n === 'undefined') return;

        // Loading-State aktivieren
        if (langBtn) langBtn.classList.add('is-loading');

        try {
            if (targetLang) {
                await TiageI18n.setLanguage(targetLang);
            } else {
                await TiageI18n.cycle();
            }
        } finally {
            // Loading-State deaktivieren
            if (langBtn) langBtn.classList.remove('is-loading');
        }

        // UI aktualisieren
        if (typeof updateAllTranslations === 'function') {
            updateAllTranslations();
        }

        // Dropdown aktive Sprache highlighten
        updateLangDropdownActive();
    }

    /**
     * Markiert die aktive Sprache im Dropdown
     */
    function updateLangDropdownActive() {
        var currentLang = typeof TiageI18n !== 'undefined' ? TiageI18n.getLanguage() : 'de';
        document.querySelectorAll('.lang-dropdown-item').forEach(function(item) {
            item.classList.toggle('active', item.dataset.lang === currentLang);
        });
    }

    // Initiales Highlighting + Subscriber (nach DOMContentLoaded, da i18n.js später lädt)
    function initLangDropdown() {
        updateLangDropdownActive();
        if (typeof TiageI18n !== 'undefined' && typeof TiageI18n.subscribe === 'function') {
            TiageI18n.subscribe(updateLangDropdownActive);
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLangDropdown);
    } else {
        initLangDropdown();
    }

    function registerActions() {
        if (typeof ActionHandler === 'undefined') {
            console.warn('[HeaderControlsActions] ActionHandler nicht verfügbar, retry in 100ms');
            setTimeout(registerActions, 100);
            return;
        }

        ActionHandler.registerAll({
            /**
             * Toggle alle Dimensionen collapse/expand
             * Ersetzt: onclick="toggleAllDimensionsCollapse()"
             */
            'toggle-all-dimensions': function(el, event) {
                if (typeof toggleAllDimensionsCollapse === 'function') {
                    toggleAllDimensionsCollapse();
                } else if (typeof window.toggleAllDimensionsCollapse === 'function') {
                    window.toggleAllDimensionsCollapse();
                }
            },

            /**
             * Sprache durchschalten (DE → EN → FR → IT → DE)
             * Ersetzt: onclick="TiageI18n.toggle(); updateAllTranslations();"
             */
            'toggle-language': async function(el, event) {
                await switchLanguageWithLoading(el);
            },

            /**
             * Sprache durchschalten (mit Age Verification Update)
             */
            'toggle-language-full': async function(el, event) {
                await switchLanguageWithLoading(el);
                if (typeof updateAgeVerificationTexts === 'function') {
                    updateAgeVerificationTexts();
                }
            },

            /**
             * Direkte Sprachauswahl aus Dropdown
             * data-lang: 'de', 'en', 'fr', 'it'
             */
            'set-language': async function(el, event) {
                var lang = el.dataset.lang;
                if (!lang) return;
                var langBtn = el.closest('.lang-switcher')?.querySelector('.lang-btn');
                await switchLanguageWithLoading(langBtn, lang);
                if (typeof updateAgeVerificationTexts === 'function') {
                    updateAgeVerificationTexts();
                }
            },

            /**
             * Öffnet Memory Modal V2 (8 Slots - ICH per Archetyp + 8 Partner)
             * Ersetzt: onclick="openMemoryModal()"
             * v2.0: Neues Konzept mit Auto-Save für ICH pro Archetyp
             */
            'open-memory-modal': function(el, event) {
                // V2 hat Priorität (neues Design mit 8 Slots)
                if (typeof openMemoryModalV2 === 'function') {
                    openMemoryModalV2();
                } else if (typeof window.openMemoryModalV2 === 'function') {
                    window.openMemoryModalV2();
                }
                // Fallback zu V1 falls V2 nicht verfügbar
                else if (typeof openMemoryModal === 'function') {
                    openMemoryModal();
                } else if (typeof window.openMemoryModal === 'function') {
                    window.openMemoryModal();
                }
            },

            /**
             * Löscht allen Storage
             * Ersetzt: onclick="clearAllStorage()"
             */
            'clear-all-storage': function(el, event) {
                if (typeof clearAllStorage === 'function') {
                    clearAllStorage();
                } else if (typeof window.clearAllStorage === 'function') {
                    window.clearAllStorage();
                }
            },

            /**
             * Setzt AGOD-Gewichtung (3-Wege-Toggle)
             * Ersetzt: onclick="setAgodWeight('A', 1)"
             * data-dimension: 'A', 'G', 'O', 'D'
             * data-value: 0, 1, oder 2
             */
            'set-agod-weight': function(el, event) {
                var dimension = el.dataset.dimension;
                var parsed = parseInt(el.dataset.value, 10);
                var value = isNaN(parsed) ? 1 : parsed; // Allow 0 value
                console.log('[set-agod-weight] Clicked:', dimension, value);
                if (typeof window.setAgodWeight === 'function') {
                    window.setAgodWeight(dimension, value);
                    console.log('[set-agod-weight] Called window.setAgodWeight');
                } else if (typeof TiageWeights !== 'undefined' && TiageWeights.AGOD && typeof TiageWeights.AGOD.set === 'function') {
                    TiageWeights.AGOD.set(dimension, value);
                    console.log('[set-agod-weight] Called TiageWeights.AGOD.set');
                } else {
                    console.error('[set-agod-weight] No setAgodWeight function available!', {
                        'window.setAgodWeight': typeof window.setAgodWeight,
                        'TiageWeights': typeof TiageWeights,
                        'TiageWeights.AGOD': typeof TiageWeights !== 'undefined' ? typeof TiageWeights.AGOD : 'N/A'
                    });
                }
            },

            /**
             * Reset AGOD-Gewichtungen auf Standard (alle = 1)
             * Ersetzt: onclick="resetAgodWeights()"
             */
            'reset-agod-weights': function(el, event) {
                if (typeof resetAgodWeights === 'function') {
                    resetAgodWeights();
                } else if (typeof window.resetAgodWeights === 'function') {
                    window.resetAgodWeights();
                }
            },

            /**
             * Schließt Resonanz Help Modal
             * Ersetzt: onclick="closeResonanzHelpModal(event)"
             * HINWEIS: Direktes Schließen ohne Event-Check, da ActionHandler
             * event.target/currentTarget anders behandelt als direktes onclick
             */
            'close-resonanz-help-modal': function(el, event) {
                var modal = document.getElementById('resonanzHelpModal');
                if (modal) {
                    modal.classList.remove('active');
                    modal.style.display = 'none';
                    document.body.style.overflow = '';
                }
            },

            /**
             * Bestätigt Alter (Age Verification)
             * Ersetzt: onclick="window.confirmAge(true)"
             * data-confirm: 'true' oder 'false'
             */
            'confirm-age': function(el, event) {
                var confirm = el.dataset.confirm === 'true';
                if (typeof window.confirmAge === 'function') {
                    window.confirmAge(confirm);
                }
            },

            /**
             * Reset ICH GOD + FFH - wie FREE für Partner, nur für ICH.
             * Setzt Geschlecht, Orientierung, Dominanz + FFH zurück.
             * Speichert permanent (TiageState + per-Archetyp localStorage).
             */
            'reset-ich-ffh-agod': function(el, event) {
                console.log('[RESET-ICH] GOD + FFH zurücksetzen (permanent, wie Partner FREE)');

                if (typeof TiageState === 'undefined') return;

                // 1. GOD in TiageState zurücksetzen
                TiageState.set('personDimensions.ich.geschlecht', null);
                TiageState.set('personDimensions.ich.orientierung', null);
                TiageState.set('personDimensions.ich.dominanz', null);

                // 2. FFH zurücksetzen
                var defaultExtras = { fit: false, fuckedup: false, horny: false, fresh: false };
                TiageState.set('personDimensions.ich.geschlecht_extras', defaultExtras);
                if (typeof window.geschlechtExtrasCache !== 'undefined') {
                    window.geschlechtExtrasCache.ich = defaultExtras;
                }

                // 2b. GFK-Kompetenz zurücksetzen
                TiageState.set('personDimensions.ich.gfk', null);
                if (typeof window.personDimensions !== 'undefined' && window.personDimensions.ich) {
                    window.personDimensions.ich.gfk = null;
                }
                if (typeof window.mobilePersonDimensions !== 'undefined' && window.mobilePersonDimensions.ich) {
                    window.mobilePersonDimensions.ich.gfk = null;
                }

                // 3. Persistent speichern
                TiageState.saveToStorage();

                // 4. Per-Archetyp speichern (wie beim Archetyp-Wechsel)
                if (typeof MemoryManagerV2 !== 'undefined') {
                    var archetypes = TiageState.getArchetypes('ich');
                    var currentArch = archetypes?.primary || archetypes;
                    if (currentArch) {
                        MemoryManagerV2.saveIchForSpecificArchetyp(currentArch);
                    }
                }

                // 5. UI zurücksetzen - alle aktiven States in ICH-Grids leeren
                var allClasses = ['active', 'active-primary', 'active-secondary', 'primary-selected', 'secondary-selected'];

                // Geschlecht P-Grid + S-Grid
                document.querySelectorAll(
                    '#ich-geschlecht-p-grid .geschlecht-btn, #mobile-ich-geschlecht-p-grid .geschlecht-btn, ' +
                    '#ich-geschlecht-s-grid .geschlecht-btn, #mobile-ich-geschlecht-s-grid .geschlecht-btn'
                ).forEach(function(btn) {
                    btn.classList.remove.apply(btn.classList, allClasses);
                    btn.querySelectorAll('.geschlecht-indicator').forEach(function(ind) { ind.remove(); });
                });

                // FFH Extras Buttons
                document.querySelectorAll(
                    '#ich-geschlecht-extras-grid .geschlecht-btn, #mobile-ich-geschlecht-extras-grid .geschlecht-btn'
                ).forEach(function(btn) {
                    btn.classList.remove.apply(btn.classList, allClasses);
                    btn.style.background = '';
                    btn.style.borderColor = '';
                    btn.style.color = '';
                    btn.style.opacity = '';
                });

                // Orientierung
                document.querySelectorAll(
                    '#ich-orientierung-grid .orientierung-btn, #mobile-ich-orientierung-grid .orientierung-btn'
                ).forEach(function(btn) {
                    btn.classList.remove.apply(btn.classList, allClasses);
                    btn.querySelectorAll('.geschlecht-indicator').forEach(function(ind) { ind.remove(); });
                });

                // Dominanz
                document.querySelectorAll(
                    '#ich-dominanz-grid .dominanz-btn, #mobile-ich-dominanz-grid .dominanz-btn'
                ).forEach(function(btn) {
                    btn.classList.remove.apply(btn.classList, allClasses);
                    btn.querySelectorAll('.geschlecht-indicator').forEach(function(ind) { ind.remove(); });
                });

                // GFK-Kompetenz Buttons
                document.querySelectorAll(
                    '#ich-gfk-grid .gfk-btn, #mobile-ich-gfk-grid .gfk-btn, ' +
                    '.gfk-grid[data-person="ich"] .gfk-btn'
                ).forEach(function(btn) {
                    btn.classList.remove.apply(btn.classList, allClasses);
                });

                // Summaries leeren
                ['ich-geschlecht-summary', 'ich-orientierung-summary', 'ich-dominanz-summary',
                 'mobile-ich-geschlecht-summary', 'mobile-ich-orientierung-summary', 'mobile-ich-dominanz-summary'
                ].forEach(function(id) {
                    var el = document.getElementById(id);
                    if (el) el.innerHTML = '';
                });

                // Header-Info leeren
                ['ich-header-geschlecht', 'ich-header-dominanz', 'ich-header-orientierung',
                 'mobile-ich-header-geschlecht', 'mobile-ich-header-dominanz', 'mobile-ich-header-orientierung'
                ].forEach(function(id) {
                    var el = document.getElementById(id);
                    if (el) el.innerHTML = '';
                });

                // needs-selection Klasse zurücksetzen
                document.querySelectorAll('[data-dimension*="ich-geschlecht"], [data-dimension*="ich-orientierung"], [data-dimension*="ich-dominanz"]').forEach(function(el) {
                    el.classList.add('needs-selection');
                });

                // 6. Synthese neu berechnen
                if (typeof window.updateComparisonView === 'function') {
                    window.updateComparisonView();
                }

                console.log('[RESET-ICH] GOD + FFH permanent zurückgesetzt und gespeichert');
            },

            /**
             * Reset Partner GOD (Geschlecht, Orientierung, Dominanz)
             * Setzt alle Partner-Attribute auf "frei" zurück
             */
            'reset-partner-god': function(el, event) {
                console.log('[FREE Button] Clicked - resetting Partner GOD');
                if (typeof window.resetPartnerGOD === 'function') {
                    window.resetPartnerGOD();
                    console.log('[FREE Button] ✓ resetPartnerGOD called successfully');
                } else {
                    console.error('[FREE Button] ✗ window.resetPartnerGOD not found!');
                }
            }
        });

        console.log('[HeaderControlsActions] Actions registriert');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
