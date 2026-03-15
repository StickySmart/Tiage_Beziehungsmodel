/**
 * SYNTHESE PAGE SHARED MODULE
 * ============================
 * Gemeinsamer Code für alle 5 Synthese-Standalone-Seiten.
 * Extrahiert: Archetyp-Navigation, State-Init, i18n-Tab-Tooltips.
 *
 * Verwendung:
 *   SynthesePageShared.init({
 *       renderContent: function() { ... },
 *       extraSubscriptions: ['resonanzFaktoren.ich', 'resonanzFaktoren.partner']
 *   });
 */

var SynthesePageShared = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // CONSTANTS
    // ═══════════════════════════════════════════════════════════════════════════

    var archetypeOrder = ['single', 'duo', 'duo_flex', 'solopoly', 'polyamor', 'ra', 'lat', 'aromantisch'];
    var archetypeNames = {
        'single': 'Single',
        'duo': 'Duo',
        'duo_flex': 'Duo-Flex',
        'duoflex': 'Duo-Flex',   // Legacy-Alias
        'solopoly': 'Solopoly',
        'polyamor': 'Polyamor',
        'ra': 'RA',
        'lat': 'LAT',
        'aromantisch': 'Aromantisch'
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════════════

    var currentIchArchetype = 'duo';
    var currentPartnerArchetype = null;
    var hasPartner = false;
    var _renderContent = null; // Page-specific render callback

    // ═══════════════════════════════════════════════════════════════════════════
    // HELPERS
    // ═══════════════════════════════════════════════════════════════════════════

    function t(key, fallback) {
        if (typeof TiageI18n !== 'undefined' && TiageI18n.t) {
            return TiageI18n.t(key, fallback);
        }
        return fallback || key;
    }

    function isValidArchetype(key) {
        return archetypeOrder.includes(key) || key === 'duoflex';
    }

    function normalizeArchetype(key) {
        if (!key) return null;
        var normalized = key.toLowerCase().trim();
        if (normalized === 'duoflex' || normalized === 'duo-flex') return 'duo_flex';
        return normalized;
    }

    function findArchetypeKey(name) {
        for (var key in archetypeNames) {
            if (archetypeNames[key].toLowerCase() === name.toLowerCase()) return key;
        }
        return name.toLowerCase().replace(/[^a-z_]/g, '');
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ARCHETYP-DISPLAY
    // ═══════════════════════════════════════════════════════════════════════════

    function updateArchetypeDisplay() {
        var ichEl = document.getElementById('ichArchetypeName');
        var partnerEl = document.getElementById('partnerArchetypeName');
        if (ichEl) ichEl.textContent = archetypeNames[currentIchArchetype] || currentIchArchetype;
        if (partnerEl) partnerEl.textContent = hasPartner ? (archetypeNames[currentPartnerArchetype] || currentPartnerArchetype) : '-';
    }

    function updatePartnerNavVisibility() {
        var selectors = document.querySelectorAll('.synthese-archetype-nav .archetype-selector');
        var separator = document.querySelector('.synthese-archetype-nav .archetype-separator');
        if (selectors[1]) selectors[1].style.display = hasPartner ? '' : 'none';
        if (separator) separator.style.display = hasPartner ? '' : 'none';
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // NAVIGATION
    // ═══════════════════════════════════════════════════════════════════════════

    function navigateArchetype(person, direction) {
        if (person === 'partner' && !hasPartner) return;
        var current = person === 'ich' ? currentIchArchetype : currentPartnerArchetype;
        var currentIndex = archetypeOrder.indexOf(current);
        var newIndex = currentIndex + direction;

        if (newIndex < 0) newIndex = archetypeOrder.length - 1;
        if (newIndex >= archetypeOrder.length) newIndex = 0;

        if (person === 'ich') {
            currentIchArchetype = archetypeOrder[newIndex];
            if (typeof TiageState !== 'undefined') {
                TiageState.setArchetype('ich', currentIchArchetype);
            }
        } else {
            currentPartnerArchetype = archetypeOrder[newIndex];
            if (typeof TiageState !== 'undefined') {
                TiageState.setArchetype('partner', currentPartnerArchetype);
            }
        }

        if (typeof TiageState !== 'undefined' && TiageState.saveToStorage) {
            TiageState.saveToStorage();
        }

        updateArchetypeDisplay();
        if (_renderContent) _renderContent();
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // I18N HELPERS
    // ═══════════════════════════════════════════════════════════════════════════

    var tabI18nKeys = {
        'tiagesyntheseUebersicht.html': 'synthese.tabScore',
        'tiagesyntheseResonanz.html': 'synthese.tabResonanz',
        'tiagesyntheseStatistik.html': 'synthese.tabNuancen',
        'tiagesyntheseProContra.html': 'synthese.tabProContra',
        'tiagesyntheseRTI.html': 'synthese.tabRTI',
        'relationship-menu.html': 'synthese.tabMenu'
    };

    function initI18n() {
        // Tab-Tooltips
        var tabs = document.querySelectorAll('.synthese-tabs .synthese-tab');
        tabs.forEach(function(tab) {
            var href = tab.getAttribute('href');
            if (!href) return;
            var fileName = href.split('/').pop();
            var key = tabI18nKeys[fileName];
            if (key) {
                tab.setAttribute('title', t(key, tab.getAttribute('title')));
                tab.setAttribute('data-i18n-title', key);
            }
        });

        // Header title
        var titleEl = document.querySelector('.synthese-title');
        if (titleEl) {
            titleEl.textContent = t('synthese.title', 'Ti-Age Synthese');
            titleEl.setAttribute('data-i18n', 'synthese.title');
        }

        // ICH / PARTNER labels
        var ichLabel = document.querySelector('.archetype-label.ich');
        var partnerLabel = document.querySelector('.archetype-label.partner');
        if (ichLabel) {
            ichLabel.textContent = t('synthese.labelIch', 'ICH');
            ichLabel.setAttribute('data-i18n', 'synthese.labelIch');
        }
        if (partnerLabel) {
            partnerLabel.textContent = t('synthese.labelPartner', 'PARTNER');
            partnerLabel.setAttribute('data-i18n', 'synthese.labelPartner');
        }

        // Loading text (if still visible)
        var loadingText = document.querySelector('.synthese-loading p');
        if (loadingText && loadingText.hasAttribute('data-i18n')) {
            loadingText.textContent = t(loadingText.getAttribute('data-i18n'), loadingText.textContent);
        }
    }

    function updateI18n() {
        // Called on language change — refresh data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            el.textContent = t(el.getAttribute('data-i18n'), el.textContent);
        });
        document.querySelectorAll('[data-i18n-title]').forEach(function(el) {
            el.setAttribute('title', t(el.getAttribute('data-i18n-title'), el.getAttribute('title')));
        });
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // INIT
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Initialisiert die Synthese-Seite
     * @param {Object} options
     * @param {Function} options.renderContent - Page-specific render function
     * @param {string} [options.pageTitle] - i18n key for page title
     * @param {string[]} [options.extraSubscriptions] - Additional TiageState paths to subscribe to
     */
    async function init(options) {
        _renderContent = options.renderContent;

        // Set page title
        if (options.pageTitle) {
            document.title = t(options.pageTitle, document.title);
        }

        // i18n for shared elements
        initI18n();

        // Subscribe to language changes
        if (typeof TiageI18n !== 'undefined' && TiageI18n.subscribe) {
            TiageI18n.subscribe(function() {
                updateI18n();
                if (options.pageTitle) {
                    document.title = t(options.pageTitle, document.title);
                }
                if (_renderContent) _renderContent();
            });
        }

        // Load archetypes from TiageState
        if (typeof TiageState !== 'undefined') {
            await TiageState.init();

            var ichFromState = normalizeArchetype(TiageState.get('archetypes.ich.primary'));
            var partnerFromState = normalizeArchetype(TiageState.get('archetypes.partner.primary'));

            if (ichFromState && isValidArchetype(ichFromState)) {
                currentIchArchetype = ichFromState;
            }
            hasPartner = partnerFromState != null && isValidArchetype(partnerFromState);
            if (hasPartner) {
                currentPartnerArchetype = partnerFromState;
            }

            // Standard subscriptions
            TiageState.subscribe('flatNeeds.ich', function() {
                updateArchetypeDisplay();
                if (_renderContent) _renderContent();
            });
            TiageState.subscribe('flatNeeds.partner', function() {
                updateArchetypeDisplay();
                if (_renderContent) _renderContent();
            });
            TiageState.subscribe('archetypes.partner', function() {
                var raw = normalizeArchetype(TiageState.get('archetypes.partner.primary'));
                hasPartner = raw != null && isValidArchetype(raw);
                if (hasPartner) currentPartnerArchetype = raw;
                updatePartnerNavVisibility();
                updateArchetypeDisplay();
                if (_renderContent) _renderContent();
            });

            // Extra subscriptions (page-specific)
            if (options.extraSubscriptions) {
                options.extraSubscriptions.forEach(function(path) {
                    TiageState.subscribe(path, function() {
                        if (_renderContent) _renderContent();
                    });
                });
            }
        }

        // sessionStorage fallback (if TiageState has no data)
        var tiageStateHasIch = typeof TiageState !== 'undefined' &&
            TiageState.get('archetypes.ich.primary');

        if (!tiageStateHasIch) {
            var stored = sessionStorage.getItem('tiageSyntheseData');
            if (stored) {
                try {
                    var data = JSON.parse(stored);
                    if (data.ichName) {
                        var ichKey = findArchetypeKey(data.ichName);
                        if (isValidArchetype(ichKey)) currentIchArchetype = ichKey;
                    }
                    if (data.partnerName) {
                        var partnerKey = findArchetypeKey(data.partnerName);
                        if (isValidArchetype(partnerKey)) {
                            currentPartnerArchetype = partnerKey;
                            hasPartner = true;
                        }
                    }
                } catch (e) {}
            }
        }

        updateArchetypeDisplay();
        updatePartnerNavVisibility();
        if (_renderContent) _renderContent();
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        archetypeOrder: archetypeOrder,
        archetypeNames: archetypeNames,
        init: init,
        navigateArchetype: navigateArchetype,
        findArchetypeKey: findArchetypeKey,
        updateArchetypeDisplay: updateArchetypeDisplay,
        updatePartnerNavVisibility: updatePartnerNavVisibility,
        t: t,
        getCurrentState: function() {
            return {
                ichArchetype: currentIchArchetype,
                partnerArchetype: currentPartnerArchetype,
                hasPartner: hasPartner
            };
        }
    };
})();

// Global shortcut for onclick handlers in HTML
function navigateArchetype(person, direction) {
    SynthesePageShared.navigateArchetype(person, direction);
}
