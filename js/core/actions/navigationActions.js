/**
 * TIAGE Navigation Actions
 *
 * Registriert Actions für Navigation, Collapsible, Reset und Scroll.
 * Teil des Refactoring-Plans v2.0 - Phase 2.13.
 *
 * @version 1.0.0
 * @since 2026-01-27
 */
(function() {
    'use strict';

    function registerActions() {
        if (typeof ActionHandler === 'undefined') {
            console.warn('[NavigationActions] ActionHandler nicht verfügbar, retry in 100ms');
            setTimeout(registerActions, 100);
            return;
        }

        ActionHandler.registerAll({
            /**
             * Navigate Archetype on Page 2 (Mobile)
             * Ersetzt: onclick="navigateArchetypeOnPage2('ich', -1)"
             * data-person: 'ich' oder 'partner'
             * data-direction: -1 oder 1
             */
            'navigate-archetype-page2': function(el, event) {
                var person = el.dataset.person || 'ich';
                var direction = parseInt(el.dataset.direction, 10) || 1;
                if (typeof navigateArchetypeOnPage2 === 'function') {
                    navigateArchetypeOnPage2(person, direction);
                } else if (typeof window.navigateArchetypeOnPage2 === 'function') {
                    window.navigateArchetypeOnPage2(person, direction);
                }
            },

            /**
             * Navigate Prev (Card Navigation)
             * Ersetzt: onclick="navigatePrev()"
             */
            'navigate-prev': function(el, event) {
                if (typeof navigatePrev === 'function') {
                    navigatePrev();
                } else if (typeof window.navigatePrev === 'function') {
                    window.navigatePrev();
                }
            },

            /**
             * Navigate Next (Card Navigation)
             * Ersetzt: onclick="navigateNext()"
             */
            'navigate-next': function(el, event) {
                if (typeof navigateNext === 'function') {
                    navigateNext();
                } else if (typeof window.navigateNext === 'function') {
                    window.navigateNext();
                }
            },

            /**
             * Scroll to Card
             * Ersetzt: onclick="scrollToCard(0)"
             * data-card: Card-Index
             */
            'scroll-to-card': function(el, event) {
                var cardIndex = parseInt(el.dataset.card, 10) || 0;
                if (typeof scrollToCard === 'function') {
                    scrollToCard(cardIndex);
                } else if (typeof window.scrollToCard === 'function') {
                    window.scrollToCard(cardIndex);
                }
            },

            /**
             * Toggle Collapsible
             * Ersetzt: onclick="toggleCollapsible('proContraCollapse')"
             * data-target: Collapsible-ID
             */
            'toggle-collapsible': function(el, event) {
                var target = el.dataset.target;
                if (typeof toggleCollapsible === 'function') {
                    toggleCollapsible(target);
                } else if (typeof window.toggleCollapsible === 'function') {
                    window.toggleCollapsible(target);
                }
            },

            /**
             * Reset All
             * Ersetzt: onclick="resetAll()"
             */
            'reset-all': function(el, event) {
                if (typeof resetAll === 'function') {
                    resetAll();
                } else if (typeof window.resetAll === 'function') {
                    window.resetAll();
                }
            },

            /**
             * Reset Mobile Gewichtung
             * Ersetzt: onclick="resetMobileGewichtung()"
             */
            'reset-mobile-gewichtung': function(el, event) {
                if (typeof resetMobileGewichtung === 'function') {
                    resetMobileGewichtung();
                } else if (typeof window.resetMobileGewichtung === 'function') {
                    window.resetMobileGewichtung();
                }
            },

            /**
             * Show Pathos Logos Info
             * Ersetzt: onclick="showPathosLogosInfo()"
             */
            'show-pathos-logos-info': function(el, event) {
                if (typeof showPathosLogosInfo === 'function') {
                    showPathosLogosInfo();
                } else if (typeof window.showPathosLogosInfo === 'function') {
                    window.showPathosLogosInfo();
                }
            },

            /**
             * Toggle Logos Warning
             * Ersetzt: onclick="toggleLogosWarning()"
             */
            'toggle-logos-warning': function(el, event) {
                if (typeof toggleLogosWarning === 'function') {
                    toggleLogosWarning();
                } else if (typeof window.toggleLogosWarning === 'function') {
                    window.toggleLogosWarning();
                }
            },

            /**
             * Open Ti-Age Synthese
             * Ersetzt: onclick="if(typeof stopLightbulbBlink!=='undefined')stopLightbulbBlink();if(typeof TiageState!=='undefined')TiageState.saveToStorage();window.location.href='tiagesyntheseResonanz.html'"
             */
            'open-tiage-synthese': function(el, event) {
                if (typeof stopLightbulbBlink !== 'undefined' && typeof stopLightbulbBlink === 'function') {
                    stopLightbulbBlink();
                }
                if (typeof TiageState !== 'undefined' && TiageState.saveToStorage) {
                    TiageState.saveToStorage();
                }
                window.location.href = 'tiagesyntheseResonanz.html';
            }
        });

        console.log('[NavigationActions] Actions registriert');
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', registerActions);
    } else {
        registerActions();
    }
})();
