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
             * Temporärer Reset: Partner FFH + AGOD nur im RAM löschen.
             * TiageState wird NICHT verändert → beim nächsten Reload
             * kommen die gespeicherten Werte aus localStorage zurück.
             *
             * WICHTIG: syncGeschlechtExtrasUI() NICHT aufrufen, da die
             * den Cache aus TiageState überschreibt. UI direkt setzen.
             */
            'temp-reset-partner': function(el, event) {
                console.log('[TEMP-RESET] Partner FFH + AGOD (RAM only, TiageState unverändert)');

                // 1. FFH nur im Runtime-Cache leeren (TiageState bleibt unberührt!)
                if (typeof window.geschlechtExtrasCache !== 'undefined') {
                    window.geschlechtExtrasCache.partner = { fit: false, fuckedup: false, horny: false };
                }

                // 2. FFH UI Buttons direkt deaktivieren
                //    (OHNE syncGeschlechtExtrasUI - die liest TiageState und überschreibt Cache)
                ['#partner-geschlecht-extras-grid .geschlecht-btn',
                 '#mobile-partner-geschlecht-extras-grid .geschlecht-btn'
                ].forEach(function(selector) {
                    document.querySelectorAll(selector).forEach(function(btn) {
                        btn.classList.remove('active');
                        btn.style.background = '';
                        btn.style.borderColor = '';
                        btn.style.color = '';
                        btn.style.opacity = '';
                    });
                });

                // 3. AGOD nur im RAM zurücksetzen (kein TiageState.save)
                if (typeof TiageWeights !== 'undefined' && TiageWeights.AGOD &&
                    typeof TiageWeights.AGOD.tempReset === 'function') {
                    TiageWeights.AGOD.tempReset();
                }

                // 4. Synthese neu berechnen
                if (typeof window.updateComparisonView === 'function') {
                    window.updateComparisonView();
                }

                console.log('[TEMP-RESET] Done - TiageState/localStorage unverändert');
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
