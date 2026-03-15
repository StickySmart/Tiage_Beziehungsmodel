/**
 * TIAGE Dimension UI Module
 *
 * Handles UI synchronization for Dominanz and Orientierung dimensions,
 * including desktop, mobile, and modal button states.
 * Extracted from app-main.js as part of Extended Dimensions modularization.
 *
 * @module TiageDimensionUI
 * @version 1.0.0
 */
var TiageDimensionUI = (function() {
    'use strict';

    // Helper: Get current archetype for person
    function _getArchetype(person) {
        if (person === 'ich') {
            return typeof window.getIchArchetype === 'function' ? window.getIchArchetype() : null;
        }
        return typeof window.getPartnerArchetype === 'function' ? window.getPartnerArchetype() : null;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // DIMENSION UI SYNC (Dominanz + Orientierung)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * GEMEINSAME Funktion: Sync UI für Dominanz oder Orientierung
     * Aktualisiert Buttons in Desktop, Mobile und Modal
     */
    function syncDimensionUI(person, dimension) {
        var personDimensions = window.personDimensions;
        var data = personDimensions[person][dimension];
        if (!data) return;

        var primary = data.primary;
        var secondary = data.secondary;

        var selectors = [
            '.' + dimension + '-grid[data-person="' + person + '"] .' + dimension + '-btn',
            '#' + person + '-' + dimension + '-grid .' + dimension + '-btn',
            '#mobile-' + person + '-' + dimension + '-grid .' + dimension + '-btn',
            '#modal-' + person + '-' + dimension + '-grid .' + dimension + '-btn'
        ];

        selectors.forEach(function(selector) {
            document.querySelectorAll(selector).forEach(function(btn) {
                var value = btn.dataset.value;

                btn.classList.remove('primary-selected', 'secondary-selected');

                var existingIndicator = btn.querySelector('.geschlecht-indicator');
                if (existingIndicator) existingIndicator.remove();

                if (value === primary) {
                    btn.classList.add('primary-selected');
                    var indicator = document.createElement('span');
                    indicator.className = 'geschlecht-indicator indicator-primary';
                    indicator.textContent = 'P';
                    indicator.title = 'Primär';
                    btn.appendChild(indicator);
                } else if (value === secondary) {
                    btn.classList.add('secondary-selected');
                    var indicator = document.createElement('span');
                    indicator.className = 'geschlecht-indicator indicator-secondary';
                    indicator.textContent = 'S';
                    indicator.title = 'Sekundär';
                    btn.appendChild(indicator);
                }
            });
        });

        if (dimension === 'dominanz') {
            updateDominanzSummary(person);
        } else if (dimension === 'orientierung') {
            updateOrientierungSummary(person);
        }

        syncMobileStatusButtons(person, dimension);
    }

    function syncDominanzUI(person) {
        syncDimensionUI(person, 'dominanz');
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // DIMENSION SUMMARY
    // ═══════════════════════════════════════════════════════════════════════════

    function getDimensionSummary(person, dimension, showMissing) {
        if (showMissing === undefined) showMissing = true;
        var personDimensions = window.personDimensions;
        var data = personDimensions[person][dimension];
        if (!data) return showMissing ? (dimension + ' fehlt') : '';

        var primary = data.primary;
        var secondary = data.secondary;

        if (!primary) {
            var label = dimension.charAt(0).toUpperCase() + dimension.slice(1);
            return showMissing ? (label + ' fehlt') : '';
        }

        var parts = [primary + ' (P)'];
        if (secondary) {
            parts.push(secondary + ' (S)');
        }

        return '✓ ' + parts.join(', ');
    }

    function getDominanzSummary(person) {
        return getDimensionSummary(person, 'dominanz', true);
    }

    function getDominanzGridSummary(person) {
        return getDimensionSummary(person, 'dominanz', false);
    }

    function updateDominanzSummary(person) {
        var summaryText = getDominanzSummary(person);
        var gridSummaryText = getDominanzGridSummary(person);
        var personDimensions = window.personDimensions;
        var dominanz = personDimensions[person] && personDimensions[person].dominanz;
        var isMissing = !dominanz || !dominanz.primary;

        ['', 'mobile-'].forEach(function(prefix) {
            var headerId = prefix + person + '-header-dominanz';
            var header = document.getElementById(headerId);
            if (header) {
                header.textContent = summaryText;
                header.classList.toggle('missing', isMissing);
            }
        });

        ['', 'mobile-'].forEach(function(prefix) {
            var summaryId = prefix + person + '-dominanz-summary';
            var summary = document.getElementById(summaryId);
            if (summary) {
                summary.textContent = gridSummaryText;
                summary.classList.toggle('has-selection', !isMissing);
            }
        });

        ['', 'mobile-', 'modal-'].forEach(function(prefix) {
            var dim = document.querySelector('[data-dimension="' + prefix + person + '-dominanz-multi"]');
            if (dim) {
                if (!isMissing) dim.classList.remove('needs-selection');
                else dim.classList.add('needs-selection');
            }
        });
    }

    function hasAnyDominanzSelected(person) {
        var personDimensions = window.personDimensions;
        return personDimensions[person] && personDimensions[person].dominanz && personDimensions[person].dominanz.primary !== null;
    }

    function getPrimaryFaktDominanz(person) {
        var personDimensions = window.personDimensions;
        return (personDimensions[person] && personDimensions[person].dominanz && personDimensions[person].dominanz.primary) || null;
    }

    function getPrimaryFaktOrientierung(person) {
        var personDimensions = window.personDimensions;
        return (personDimensions[person] && personDimensions[person].orientierung && personDimensions[person].orientierung.primary) || null;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ORIENTIERUNG CLICK HANDLER (Multi-Select Array)
    // ═══════════════════════════════════════════════════════════════════════════

    function handleOrientierungClick(person, orientierungValue, btn) {
        var personDimensions = window.personDimensions;

        // v4.0: Orientierung als Array (Multi-Select)
        if (!Array.isArray(personDimensions[person].orientierung)) {
            var oldOri = personDimensions[person].orientierung;
            personDimensions[person].orientierung = [];
            if (oldOri) {
                if (typeof oldOri === 'string') {
                    personDimensions[person].orientierung.push(oldOri);
                } else if (oldOri.primary) {
                    personDimensions[person].orientierung.push(oldOri.primary);
                    if (oldOri.secondary) {
                        personDimensions[person].orientierung.push(oldOri.secondary);
                    }
                }
            }
        }

        var orientierungen = personDimensions[person].orientierung;
        var index = orientierungen.indexOf(orientierungValue);

        if (index > -1) {
            orientierungen.splice(index, 1);
            if (typeof TiageToast !== 'undefined') TiageToast.info(orientierungValue + ' entfernt');
        } else {
            var exclusionRules = (typeof TiageConfig !== 'undefined' && TiageConfig.ORIENTIERUNG_EXCLUSION_RULES) || {};

            if (orientierungen.length === 0) {
                orientierungen.push(orientierungValue);
                if (typeof TiageToast !== 'undefined') TiageToast.info(orientierungValue + ' gesetzt');
            } else {
                var primaryOrientation = orientierungen[0];
                var excludedByPrimary = exclusionRules[primaryOrientation] || [];

                if (excludedByPrimary.includes(orientierungValue)) {
                    var primaryLabel = ((typeof TiageConfig !== 'undefined' && TiageConfig.ORIENTIERUNG_LABELS) || {})[primaryOrientation] || primaryOrientation;
                    var newLabel = ((typeof TiageConfig !== 'undefined' && TiageConfig.ORIENTIERUNG_LABELS) || {})[orientierungValue] || orientierungValue;

                    window.showSoftWarning({
                        title: 'Diese Kombination ist nicht möglich',
                        message: '"' + primaryLabel + '" (primär) ist mit "' + newLabel + '" inkompatibel.',
                        detail: 'Nur Hetero und Gay/Lesbisch können nicht kombiniert werden.',
                        examples: [
                            'Hetero (primär) + Pan (sekundär)',
                            'Gay (primär) + Queer (sekundär)'
                        ]
                    });
                    return;
                }

                var excludedByNew = exclusionRules[orientierungValue] || [];
                if (excludedByNew.includes(primaryOrientation)) {
                    var primaryLabel2 = ((typeof TiageConfig !== 'undefined' && TiageConfig.ORIENTIERUNG_LABELS) || {})[primaryOrientation] || primaryOrientation;
                    var newLabel2 = ((typeof TiageConfig !== 'undefined' && TiageConfig.ORIENTIERUNG_LABELS) || {})[orientierungValue] || orientierungValue;

                    window.showSoftWarning({
                        title: 'Diese Kombination ist nicht möglich',
                        message: '"' + newLabel2 + '" ist mit "' + primaryLabel2 + '" (primär) inkompatibel.',
                        detail: 'Wenn Sie "' + newLabel2 + '" als primäre Orientierung setzen möchten, entfernen Sie zuerst "' + primaryLabel2 + '".'
                    });
                    return;
                }

                orientierungen.push(orientierungValue);
                if (typeof TiageToast !== 'undefined') TiageToast.info(orientierungValue + ' (sekundär) hinzugefügt');
            }
        }

        // Sync with mobilePersonDimensions
        if (typeof window.mobilePersonDimensions !== 'undefined') {
            window.mobilePersonDimensions[person].orientierung = orientierungen.slice();
        }

        // Sync with TiageState
        if (typeof TiageState !== 'undefined') {
            TiageState.set('personDimensions.' + person + '.orientierung', orientierungen);
            TiageState.saveToStorage();
        }

        syncOrientierungUI(person);

        var hasOrientierung = orientierungen.length > 0;
        document.querySelectorAll('[data-dimension="' + person + '-orientierung-multi"], [data-dimension="mobile-' + person + '-orientierung"], [data-dimension="' + person + '-orientierung"]').forEach(function(dim) {
            if (hasOrientierung) dim.classList.remove('needs-selection');
            else dim.classList.add('needs-selection');
        });

        // Resonanzfaktoren bei Orientierung-Wechsel neu berechnen
        _updateResonanzAfterOrientierungChange(person);

        if (typeof window.updateComparisonView === 'function') {
            window.updateComparisonView();
        }

        if (typeof window.saveSelectionToStorage === 'function') {
            window.saveSelectionToStorage();
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ORIENTIERUNG STATUS TOGGLE (Primär/Sekundär)
    // ═══════════════════════════════════════════════════════════════════════════

    function handleOrientierungStatusToggle(person, orientierungValue, status, btn) {
        try {
            var personDimensions = window.personDimensions;

            if (!person || !orientierungValue || !status) {
                console.error('[TIAGE] handleOrientierungStatusToggle: Missing parameters', { person: person, orientierungValue: orientierungValue, status: status });
                return;
            }

            if (typeof personDimensions === 'undefined' || !personDimensions) {
                console.error('[TIAGE] handleOrientierungStatusToggle: personDimensions is undefined');
                return;
            }

            if (!personDimensions[person]) {
                console.error('[TIAGE] handleOrientierungStatusToggle: personDimensions[' + person + '] is undefined');
                personDimensions[person] = { orientierung: [] };
            }

            if (typeof personDimensions[person].orientierung === 'undefined') {
                personDimensions[person].orientierung = [];
            }

            if (!Array.isArray(personDimensions[person].orientierung)) {
                var oldOri = personDimensions[person].orientierung;
                personDimensions[person].orientierung = [];
                if (oldOri) {
                    if (typeof oldOri === 'string') {
                        personDimensions[person].orientierung.push(oldOri);
                    } else if (oldOri.primary) {
                        personDimensions[person].orientierung.push(oldOri.primary);
                        if (oldOri.secondary) {
                            personDimensions[person].orientierung.push(oldOri.secondary);
                        }
                    }
                }
            }

            var orientierungen = personDimensions[person].orientierung;
            var currentIndex = orientierungen.indexOf(orientierungValue);
            var exclusionRules = (typeof TiageConfig !== 'undefined' && TiageConfig.ORIENTIERUNG_EXCLUSION_RULES) || {};

            if (status === 'primaer') {
                if (currentIndex === 0) {
                    orientierungen.splice(0, 1);
                } else if (currentIndex > 0) {
                    var currentPrimary = orientierungen[0];
                    var excludedByNew = exclusionRules[orientierungValue] || [];

                    if (excludedByNew.includes(currentPrimary)) {
                        window.showSoftWarning({
                            title: 'Diese Kombination ist nicht möglich',
                            message: '"' + ((typeof TiageConfig !== 'undefined' && TiageConfig.ORIENTIERUNG_LABELS) || {})[orientierungValue] + '" ist mit "' + ((typeof TiageConfig !== 'undefined' && TiageConfig.ORIENTIERUNG_LABELS) || {})[currentPrimary] + '" inkompatibel.',
                            detail: 'Nur Hetero und Gay/Lesbisch können nicht kombiniert werden.'
                        });
                        return;
                    }

                    orientierungen.splice(currentIndex, 1);
                    orientierungen.unshift(orientierungValue);
                } else {
                    if (orientierungen.length > 0) {
                        var excludedByNew2 = exclusionRules[orientierungValue] || [];
                        for (var i = 0; i < orientierungen.length; i++) {
                            if (excludedByNew2.includes(orientierungen[i])) {
                                window.showSoftWarning({
                                    title: 'Diese Kombination ist nicht möglich',
                                    message: '"' + ((typeof TiageConfig !== 'undefined' && TiageConfig.ORIENTIERUNG_LABELS) || {})[orientierungValue] + '" ist mit "' + ((typeof TiageConfig !== 'undefined' && TiageConfig.ORIENTIERUNG_LABELS) || {})[orientierungen[i]] + '" inkompatibel.',
                                    detail: 'Nur Hetero und Gay/Lesbisch können nicht kombiniert werden.'
                                });
                                return;
                            }
                        }
                    }
                    orientierungen.unshift(orientierungValue);
                }
            } else if (status === 'sekundaer') {
                if (currentIndex > 0) {
                    orientierungen.splice(currentIndex, 1);
                } else if (currentIndex === 0) {
                    if (orientierungen.length === 1) {
                        window.showSoftWarning({
                            title: 'Primär erforderlich',
                            message: 'Bitte wähle zuerst eine andere Orientierung als Primär.',
                            detail: 'Mindestens eine Primäre Orientierung muss ausgewählt sein.'
                        });
                        return;
                    }
                    orientierungen.shift();
                    orientierungen.push(orientierungValue);
                } else {
                    if (orientierungen.length === 0) {
                        window.showSoftWarning({
                            title: 'Primär erforderlich',
                            message: 'Bitte wähle zuerst eine Primäre Orientierung.',
                            detail: 'Sekundäre Orientierungen ergänzen die Primäre.'
                        });
                        return;
                    }

                    var primary = orientierungen[0];
                    var excludedByPrimary = exclusionRules[primary] || [];
                    var excludedByNew3 = exclusionRules[orientierungValue] || [];

                    if (excludedByPrimary.includes(orientierungValue) || excludedByNew3.includes(primary)) {
                        window.showSoftWarning({
                            title: 'Diese Kombination ist nicht möglich',
                            message: '"' + ((typeof TiageConfig !== 'undefined' && TiageConfig.ORIENTIERUNG_LABELS) || {})[primary] + '" (primär) ist mit "' + ((typeof TiageConfig !== 'undefined' && TiageConfig.ORIENTIERUNG_LABELS) || {})[orientierungValue] + '" inkompatibel.',
                            detail: 'Nur Hetero und Gay/Lesbisch können nicht kombiniert werden.'
                        });
                        return;
                    }

                    orientierungen.push(orientierungValue);
                }
            }

            // Sync with mobilePersonDimensions
            if (typeof window.mobilePersonDimensions !== 'undefined') {
                window.mobilePersonDimensions[person].orientierung = orientierungen.slice();
            }

            // Sync with TiageState
            if (typeof TiageState !== 'undefined') {
                TiageState.set('personDimensions.' + person + '.orientierung', orientierungen);
                TiageState.saveToStorage();
            }

            syncOrientierungUI(person);

            var hasOrientierung = orientierungen.length > 0;
            document.querySelectorAll('[data-dimension="' + person + '-orientierung-multi"], [data-dimension="mobile-' + person + '-orientierung"], [data-dimension="' + person + '-orientierung"]').forEach(function(dim) {
                if (hasOrientierung) dim.classList.remove('needs-selection');
                else dim.classList.add('needs-selection');
            });

            _updateResonanzAfterOrientierungChange(person);

            if (typeof window.updateComparisonView === 'function') {
                window.updateComparisonView();
            }

            if (typeof window.saveSelectionToStorage === 'function') {
                window.saveSelectionToStorage();
            }
        } catch (error) {
            console.error('[TIAGE] handleOrientierungStatusToggle ERROR:', error);
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // ORIENTIERUNG UI SYNC
    // ═══════════════════════════════════════════════════════════════════════════

    function syncOrientierungUI(person) {
        var personDimensions = window.personDimensions;
        var orientierungen = personDimensions[person].orientierung;

        if (!Array.isArray(orientierungen)) {
            syncDimensionUI(person, 'orientierung');
            return;
        }

        // Desktop/Modal Button-Selektoren
        var selectors = [
            '.orientierung-grid[data-person="' + person + '"] .orientierung-btn',
            '#' + person + '-orientierung-grid .orientierung-btn',
            '#modal-' + person + '-orientierung-grid .orientierung-btn'
        ];

        selectors.forEach(function(selector) {
            document.querySelectorAll(selector).forEach(function(btn) {
                var value = btn.dataset.value;

                btn.classList.remove('primary-selected', 'secondary-selected', 'selected');

                var existingIndicator = btn.querySelector('.geschlecht-indicator');
                if (existingIndicator) existingIndicator.remove();

                var index = orientierungen.indexOf(value);
                if (index > -1) {
                    if (index === 0) {
                        btn.classList.add('selected', 'primary-selected');
                        var indicator = document.createElement('span');
                        indicator.className = 'geschlecht-indicator';
                        indicator.textContent = 'P';
                        btn.appendChild(indicator);
                    } else {
                        btn.classList.add('selected', 'secondary-selected');
                        var indicator = document.createElement('span');
                        indicator.className = 'geschlecht-indicator';
                        indicator.textContent = 'S';
                        btn.appendChild(indicator);
                    }
                }
            });
        });

        // Mobile List-Style UI
        var mobileGrid = document.querySelector('#mobile-' + person + '-orientierung-grid.orientierung-multi-select');
        if (mobileGrid) {
            mobileGrid.querySelectorAll('.orientierung-option-row').forEach(function(row) {
                var value = row.dataset.value;
                var index = orientierungen.indexOf(value);

                row.classList.remove('has-primary', 'has-secondary');

                row.querySelectorAll('.status-toggle-btn').forEach(function(btn) {
                    btn.classList.remove('active-primaer', 'active-sekundaer');
                });

                if (index > -1) {
                    if (index === 0) {
                        row.classList.add('has-primary');
                        var primaerBtn = row.querySelector('.status-toggle-btn[data-status="primaer"]');
                        if (primaerBtn) primaerBtn.classList.add('active-primaer');
                    } else {
                        row.classList.add('has-secondary');
                        var sekundaerBtn = row.querySelector('.status-toggle-btn[data-status="sekundaer"]');
                        if (sekundaerBtn) sekundaerBtn.classList.add('active-sekundaer');
                    }
                }
            });
        }

        updateOrientierungSummary(person);
    }

    function getOrientierungSummary(person) {
        return getDimensionSummary(person, 'orientierung', true);
    }

    function getOrientierungGridSummary(person) {
        return getDimensionSummary(person, 'orientierung', false);
    }

    function updateOrientierungSummary(person) {
        var personDimensions = window.personDimensions;
        var orientierungen = personDimensions[person].orientierung;

        var isMissing = !Array.isArray(orientierungen) || orientierungen.length === 0;

        var summaryText = 'Orientierung fehlt';
        var gridSummaryText = '';
        if (Array.isArray(orientierungen) && orientierungen.length > 0) {
            var labels = {
                'heterosexuell': 'hetero',
                'homosexuell': 'homo',
                'bisexuell': 'bi',
                'pansexuell': 'pan',
                'queer': 'queer',
                'gay_lesbisch': 'homo',
                'pansexuell_queer': 'pan',
                'bihomo': 'bi'
            };
            var labelList = orientierungen.map(function(o, index) {
                var label = labels[o] || o;
                if (index === 0) {
                    return label + ' (P)';
                } else {
                    return label + ' (S)';
                }
            });
            summaryText = '✓ ' + labelList.join(', ');
            gridSummaryText = labelList.join(', ');
        }

        ['', 'mobile-'].forEach(function(prefix) {
            var headerId = prefix + person + '-header-orientierung';
            var header = document.getElementById(headerId);
            if (header) {
                header.textContent = summaryText;
                header.classList.toggle('missing', isMissing);
            }
        });

        ['', 'mobile-'].forEach(function(prefix) {
            var summaryId = prefix + person + '-orientierung-summary';
            var summary = document.getElementById(summaryId);
            if (summary) {
                summary.textContent = gridSummaryText;
                summary.classList.toggle('has-selection', !isMissing);
            }
        });

        ['', 'mobile-', 'modal-'].forEach(function(prefix) {
            var dim = document.querySelector('[data-dimension="' + prefix + person + '-orientierung-multi"]');
            if (dim) {
                if (!isMissing) dim.classList.remove('needs-selection');
                else dim.classList.add('needs-selection');
            }
        });
    }

    function hasAnyOrientierungSelected(person) {
        var personDimensions = window.personDimensions;
        var ori = personDimensions[person].orientierung;
        if (Array.isArray(ori)) return ori.length > 0;
        return ori && ori.primary !== null;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // MOBILE STATUS TOGGLE HANDLERS
    // ═══════════════════════════════════════════════════════════════════════════

    function handleStatusToggle(person, dimension, type, status) {
        var personDimensions = window.personDimensions;

        if (!personDimensions[person][dimension] ||
            !('primary' in personDimensions[person][dimension])) {
            personDimensions[person][dimension] = { primary: null, secondary: null };
        }

        var data = personDimensions[person][dimension];
        var currentPrimary = data.primary;
        var currentSecondary = data.secondary;

        if (status === 'gelebt') {
            if (currentPrimary === type) {
                data.primary = null;
                if (currentSecondary === type) data.secondary = null;
            } else {
                data.primary = type;
                if (currentSecondary === type) data.secondary = null;
            }
        } else if (status === 'interessiert') {
            if (currentSecondary === type) {
                data.secondary = null;
            } else {
                if (currentPrimary !== type) data.secondary = type;
            }
        }

        if (typeof window.mobilePersonDimensions !== 'undefined' &&
            window.mobilePersonDimensions[person] && window.mobilePersonDimensions[person][dimension]) {
            window.mobilePersonDimensions[person][dimension].primary = data.primary;
            window.mobilePersonDimensions[person][dimension].secondary = data.secondary;
        }

        if (typeof TiageState !== 'undefined') {
            TiageState.set('personDimensions.' + person + '.' + dimension, data);
        }

        if (dimension === 'dominanz') {
            syncDominanzUI(person);
            syncMobileDominanzStatusButtons(person);
        } else if (dimension === 'orientierung') {
            syncOrientierungUI(person);
            syncMobileOrientierungStatusButtons(person);
        }

        var hasPrimary = data.primary !== null;
        document.querySelectorAll('[data-dimension*="' + person + '-' + dimension + '"]').forEach(function(dim) {
            dim.classList.toggle('needs-selection', !hasPrimary);
        });

        if (typeof window.updateComparisonView === 'function') {
            window.updateComparisonView();
        }

        if (typeof window.saveSelectionToStorage === 'function') {
            window.saveSelectionToStorage();
        }
    }

    function handleDominanzStatusToggle(person, dominanzType, status, btn) {
        handleStatusToggle(person, 'dominanz', dominanzType, status);
    }

    function syncMobileStatusButtons(person, dimension) {
        var personDimensions = window.personDimensions;
        var data = personDimensions[person][dimension];
        if (!data) return;

        var primary = data.primary;
        var secondary = data.secondary;

        var config = {
            dominanz: {
                types: ['dominant', 'submissiv', 'switch', 'ausgeglichen'],
                abbrevs: ['dom', 'sub', 'sw', 'aus'],
                letter: 'd'
            },
            orientierung: {
                types: ['heterosexuell', 'homosexuell', 'bisexuell', 'pansexuell', 'queer'],
                abbrevs: ['het', 'hom', 'bi', 'pan', 'queer'],
                letter: 'o'
            }
        };

        var dimConfig = config[dimension];
        if (!dimConfig) return;

        var types = dimConfig.types;
        var abbrevs = dimConfig.abbrevs;
        var letter = dimConfig.letter;
        var prefix = person === 'ich' ? 'm-ich' : 'm-partner';

        types.forEach(function(type, i) {
            var statusGroup = document.getElementById(prefix + '-' + letter + '-' + abbrevs[i] + '-status');
            if (!statusGroup) return;

            var gelebtBtn = statusGroup.querySelector('[data-status="gelebt"]');
            var interessiertBtn = statusGroup.querySelector('[data-status="interessiert"]');

            if (gelebtBtn) {
                gelebtBtn.classList.toggle('active-gelebt', primary === type);
            }
            if (interessiertBtn) {
                interessiertBtn.classList.toggle('active-interessiert', secondary === type);
            }
        });
    }

    function syncMobileDominanzStatusButtons(person) {
        syncMobileStatusButtons(person, 'dominanz');
    }

    function syncMobileOrientierungStatusButtons(person) {
        syncMobileStatusButtons(person, 'orientierung');
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PRIVATE HELPERS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Update Resonanzfaktoren after Orientierung change
     * Used by both handleOrientierungClick and handleOrientierungStatusToggle
     */
    function _updateResonanzAfterOrientierungChange(person) {
        var personDimensions = window.personDimensions;

        if (typeof ResonanzCard !== 'undefined' && typeof ResonanzCard.loadCalculatedValues === 'function') {
            var personArchetyp = _getArchetype(person);
            var needs = null;

            var flatNeeds = window.LoadedArchetypProfile && window.LoadedArchetypProfile[person] &&
                window.LoadedArchetypProfile[person].profileReview &&
                window.LoadedArchetypProfile[person].profileReview.flatNeeds;
            if (flatNeeds) {
                needs = {};
                if (Array.isArray(flatNeeds)) {
                    flatNeeds.forEach(function(n) {
                        if (n.id) needs[n.id] = n.value;
                        if (n.stringKey) needs[n.stringKey] = n.value;
                    });
                } else {
                    for (var key in flatNeeds) {
                        if (flatNeeds.hasOwnProperty(key)) {
                            var entry = flatNeeds[key];
                            needs[key] = (typeof entry === 'object' && entry.value !== undefined) ? entry.value : entry;
                        }
                    }
                }
            }

            if (!needs || Object.keys(needs).length === 0) {
                if (typeof GfkBeduerfnisse !== 'undefined' &&
                    GfkBeduerfnisse.archetypProfile && GfkBeduerfnisse.archetypProfile[personArchetyp]) {
                    needs = GfkBeduerfnisse.archetypProfile[personArchetyp].umfrageWerte || {};
                }
            }

            var resonanzProfileContext = {
                archetyp: personArchetyp,
                needs: needs,
                dominanz: (personDimensions[person] && personDimensions[person].dominanz) || null,
                orientierung: (personDimensions[person] && personDimensions[person].orientierung) || null,
                geschlecht: (personDimensions[person] && personDimensions[person].geschlecht) || null
            };

            if (resonanzProfileContext.needs && Object.keys(resonanzProfileContext.needs).length > 0) {
                ResonanzCard.loadCalculatedValues(resonanzProfileContext, person);
            }
        }
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        syncDimensionUI: syncDimensionUI,
        syncDominanzUI: syncDominanzUI,
        getDimensionSummary: getDimensionSummary,
        getDominanzSummary: getDominanzSummary,
        getDominanzGridSummary: getDominanzGridSummary,
        updateDominanzSummary: updateDominanzSummary,
        hasAnyDominanzSelected: hasAnyDominanzSelected,
        getPrimaryFaktDominanz: getPrimaryFaktDominanz,
        getPrimaryFaktOrientierung: getPrimaryFaktOrientierung,
        handleOrientierungClick: handleOrientierungClick,
        handleOrientierungStatusToggle: handleOrientierungStatusToggle,
        syncOrientierungUI: syncOrientierungUI,
        getOrientierungSummary: getOrientierungSummary,
        getOrientierungGridSummary: getOrientierungGridSummary,
        updateOrientierungSummary: updateOrientierungSummary,
        hasAnyOrientierungSelected: hasAnyOrientierungSelected,
        handleStatusToggle: handleStatusToggle,
        handleDominanzStatusToggle: handleDominanzStatusToggle,
        syncMobileStatusButtons: syncMobileStatusButtons,
        syncMobileDominanzStatusButtons: syncMobileDominanzStatusButtons,
        syncMobileOrientierungStatusButtons: syncMobileOrientierungStatusButtons
    };
})();

// Global exports for backward compatibility
if (typeof window !== 'undefined') {
    window.TiageDimensionUI = TiageDimensionUI;
    window.syncDimensionUI = TiageDimensionUI.syncDimensionUI;
    window.syncDominanzUI = TiageDimensionUI.syncDominanzUI;
    window.getDimensionSummary = TiageDimensionUI.getDimensionSummary;
    window.updateDominanzSummary = TiageDimensionUI.updateDominanzSummary;
    window.hasAnyDominanzSelected = TiageDimensionUI.hasAnyDominanzSelected;
    window.getPrimaryFaktDominanz = TiageDimensionUI.getPrimaryFaktDominanz;
    window.getPrimaryFaktOrientierung = TiageDimensionUI.getPrimaryFaktOrientierung;
    window.handleOrientierungClick = TiageDimensionUI.handleOrientierungClick;
    window.handleOrientierungStatusToggle = TiageDimensionUI.handleOrientierungStatusToggle;
    window.syncOrientierungUI = TiageDimensionUI.syncOrientierungUI;
    window.updateOrientierungSummary = TiageDimensionUI.updateOrientierungSummary;
    window.hasAnyOrientierungSelected = TiageDimensionUI.hasAnyOrientierungSelected;
    window.handleStatusToggle = TiageDimensionUI.handleStatusToggle;
    window.handleDominanzStatusToggle = TiageDimensionUI.handleDominanzStatusToggle;
    window.syncMobileStatusButtons = TiageDimensionUI.syncMobileStatusButtons;
    window.syncMobileDominanzStatusButtons = TiageDimensionUI.syncMobileDominanzStatusButtons;
    window.syncMobileOrientierungStatusButtons = TiageDimensionUI.syncMobileOrientierungStatusButtons;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageDimensionUI;
}
