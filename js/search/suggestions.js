/**
 * SEARCH SUGGESTIONS MODULE
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Verwaltet das intelligente Such-System mit Autocomplete für:
 * - Bedürfnisse (Needs)
 * - Kategorien
 * - Dimensionen
 * - Resonanzfaktoren (R1-R4)
 * - Perspektiven
 *
 * Features:
 * - Fuzzy matching mit Levenshtein-Distanz
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Gruppierte Anzeige nach Typ
 * - Integration mit DimensionKategorieFilter
 * - Textsuche-Modus für spezifische Begriffe
 *
 * Extrahiert aus app-main.js (Zeilen 20648-21417)
 *
 * Dependencies:
 * - TiageFuzzySearch (fuzzySearch.js)
 * - TiageTaxonomie (taxonomie.js)
 * - BeduerfnisKatalog (beduerfnisse.js)
 * - PerspektivenModal (optional)
 * - DimensionKategorieFilter (optional)
 * - filterProfileReviewByNeed (app-main.js) - for filtering
 *
 * @module TiageSearch.Suggestions
 */
var TiageSearch = TiageSearch || {};

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // STATE
    // ═══════════════════════════════════════════════════════════════════════

    var suggestionState = {
        selectedIndex: -1,
        suggestions: [],
        activeSuggestion: null  // Stores the selected suggestion
    };

    // ═══════════════════════════════════════════════════════════════════════
    // HELPERS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Get perspective information for a category
     * @param {string} categoryKey - Category key (e.g., 'A', 'B')
     * @returns {Object|null} Perspective object or null
     */
    function getPerspectiveForCategory(categoryKey) {
        if (window.PerspektivenModal && window.PerspektivenModal.kategoriePerspektiven) {
            var perspId = window.PerspektivenModal.kategoriePerspektiven[categoryKey];
            if (perspId && window.PerspektivenModal.perspektiven[perspId]) {
                return window.PerspektivenModal.perspektiven[perspId];
            }
        }
        return null;
    }

    /**
     * Get perspective information for a need
     * @param {string} needId - Need ID
     * @returns {Object|null} Perspective object or null
     */
    function getPerspectiveForNeed(needId) {
        if (!window.BeduerfnisKatalog || !window.BeduerfnisKatalog.beduerfnisse) return null;

        var need = window.BeduerfnisKatalog.beduerfnisse[needId];
        if (!need || !need.kategorie) return null;

        var categoryId = need.kategorie;
        if (!window.TiageTaxonomie || !window.TiageTaxonomie.kategorien) return null;

        var category = window.TiageTaxonomie.kategorien[categoryId];
        if (!category || !category.key) return null;

        return getPerspectiveForCategory(category.key);
    }

    /**
     * Check if a string starts with the query (case-insensitive)
     * @param {string} text - Text to check
     * @param {string} query - Query to match against
     * @returns {boolean} True if text starts with query
     */
    function startsWithQuery(text, query) {
        if (!text || !query) return false;
        return text.toLowerCase().startsWith(query.toLowerCase());
    }

    // Fuzzy matching functions from TiageFuzzySearch
    var levenshteinDistance = (typeof TiageFuzzySearch !== 'undefined')
        ? TiageFuzzySearch.levenshteinDistance
        : function() { return 999; };

    var fuzzyMatchScore = (typeof TiageFuzzySearch !== 'undefined')
        ? TiageFuzzySearch.fuzzyMatchScore
        : function() { return 0; };

    // ═══════════════════════════════════════════════════════════════════════
    // SUGGESTION GENERATION
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Generate search suggestions based on query
     * For comma-separated queries, only suggest for the last criterion
     * @param {string} query - Search query
     * @returns {Array} Array of suggestion objects
     */
    function generateSuggestions(query) {
        var suggestions = [];

        // For comma-separated queries, only use the last criterion for suggestions
        var parts = query.split(',');
        var lastPart = parts[parts.length - 1].trim();
        var lowerQuery = lastPart.toLowerCase();

        // If last part is empty, show all items for browsing
        // But only if this is the FIRST part (no previous criteria exist)
        if (!lowerQuery) {
            // Trailing comma with existing criteria - don't show all items, just return empty
            if (parts.length > 1) {
                return suggestions;
            }

            // Show all categories (18 total)
            if (window.TiageTaxonomie && window.TiageTaxonomie.kategorien) {
                Object.values(window.TiageTaxonomie.kategorien).forEach(function(kat) {
                    var persp = getPerspectiveForCategory(kat.key);
                    suggestions.push({
                        type: 'category',
                        id: kat.id,
                        label: kat.label,
                        description: kat.beschreibung,
                        perspective: persp
                    });
                });
            }

            // Show all dimensions (6 total)
            if (window.TiageTaxonomie && window.TiageTaxonomie.dimensionen) {
                Object.values(window.TiageTaxonomie.dimensionen).forEach(function(dim) {
                    suggestions.push({
                        type: 'dimension',
                        id: dim.id,
                        label: dim.label,
                        description: dim.beschreibung,
                        perspective: null
                    });
                });
            }

            // Show all resonance factors (4 total)
            var resonanzfaktoren = {
                'R1': { id: 'R1', label: 'Leben', icon: '🔥', beschreibung: 'Orientierung - Existenz, Zuneigung, Muße, Intimität' },
                'R2': { id: 'R2', label: 'Philosophie', icon: '🧠', beschreibung: 'Archetyp - Lebensplanung, Werte, Finanzen' },
                'R3': { id: 'R3', label: 'Dynamik', icon: '⚡', beschreibung: 'Dominanz - Machtdynamik, BDSM, Sicherheit' },
                'R4': { id: 'R4', label: 'Identität', icon: '💚', beschreibung: 'Geschlecht - Authentizität, Kommunikation, Selbstausdruck' }
            };
            Object.values(resonanzfaktoren).forEach(function(resonanz) {
                suggestions.push({
                    type: 'resonanz',
                    id: resonanz.id,
                    label: resonanz.label,
                    icon: resonanz.icon,
                    description: resonanz.beschreibung,
                    perspective: null
                });
            });

            // Show all perspectives (4 total)
            if (window.TiageTaxonomie && window.TiageTaxonomie.perspektiven) {
                Object.values(window.TiageTaxonomie.perspektiven).forEach(function(persp) {
                    suggestions.push({
                        type: 'perspective',
                        id: persp.id,
                        label: persp.label,
                        description: persp.beschreibung,
                        source: persp.quelle,
                        perspective: null
                    });
                });
            }

            return suggestions; // Return all (18+6+4+4 = 32 items)
        }

        // Search in needs (Bedürfnisse)
        var needsSource = null;
        if (window.BeduerfnisKatalog && window.BeduerfnisKatalog.beduerfnisse) {
            needsSource = window.BeduerfnisKatalog.beduerfnisse;
        } else if (typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.beduerfnisse) {
            needsSource = BeduerfnisIds.beduerfnisse;
        }

        if (needsSource) {
            Object.entries(needsSource).forEach(function(entry) {
                var needId = entry[0];
                var need = entry[1];
                var needLabel = need.name || need.label || needId;
                var score = fuzzyMatchScore(needLabel, lowerQuery);

                if (score > 0.4 || startsWithQuery(needLabel, lowerQuery)) {
                    var persp = getPerspectiveForNeed(needId);
                    suggestions.push({
                        type: 'need',
                        id: needId,
                        label: needLabel,
                        description: need.beschreibung || need.description,
                        perspective: persp,
                        score: startsWithQuery(needLabel, lowerQuery) ? 1000 + score : score
                    });
                }
            });
        }

        // Search in categories
        if (window.TiageTaxonomie && window.TiageTaxonomie.kategorien) {
            Object.values(window.TiageTaxonomie.kategorien).forEach(function(kat) {
                var katLabel = kat.label || kat.id;
                var score = fuzzyMatchScore(katLabel, lowerQuery);

                if (score > 0.4 || startsWithQuery(katLabel, lowerQuery)) {
                    var persp = getPerspectiveForCategory(kat.key);
                    suggestions.push({
                        type: 'category',
                        id: kat.id,
                        label: katLabel,
                        description: kat.beschreibung,
                        perspective: persp,
                        score: startsWithQuery(katLabel, lowerQuery) ? 1000 + score : score
                    });
                }
            });
        }

        // Search in dimensions
        if (window.TiageTaxonomie && window.TiageTaxonomie.dimensionen) {
            Object.values(window.TiageTaxonomie.dimensionen).forEach(function(dim) {
                var dimLabel = dim.label || dim.id;
                var score = fuzzyMatchScore(dimLabel, lowerQuery);

                if (score > 0.4 || startsWithQuery(dimLabel, lowerQuery)) {
                    suggestions.push({
                        type: 'dimension',
                        id: dim.id,
                        label: dimLabel,
                        description: dim.beschreibung,
                        perspective: null,
                        score: startsWithQuery(dimLabel, lowerQuery) ? 1000 + score : score
                    });
                }
            });
        }

        // Search in resonance factors
        var resonanzfaktoren = {
            'R1': { id: 'R1', label: 'Leben', icon: '🔥', beschreibung: 'Orientierung - Existenz, Zuneigung, Muße, Intimität' },
            'R2': { id: 'R2', label: 'Philosophie', icon: '🧠', beschreibung: 'Archetyp - Lebensplanung, Werte, Finanzen' },
            'R3': { id: 'R3', label: 'Dynamik', icon: '⚡', beschreibung: 'Dominanz - Machtdynamik, BDSM, Sicherheit' },
            'R4': { id: 'R4', label: 'Identität', icon: '💚', beschreibung: 'Geschlecht - Authentizität, Kommunikation, Selbstausdruck' }
        };
        Object.values(resonanzfaktoren).forEach(function(resonanz) {
            var resonanzLabel = resonanz.label;
            var score = fuzzyMatchScore(resonanzLabel, lowerQuery);

            if (score > 0.4 || startsWithQuery(resonanzLabel, lowerQuery) || startsWithQuery(resonanz.id, lowerQuery)) {
                suggestions.push({
                    type: 'resonanz',
                    id: resonanz.id,
                    label: resonanzLabel,
                    icon: resonanz.icon,
                    description: resonanz.beschreibung,
                    perspective: null,
                    score: startsWithQuery(resonanzLabel, lowerQuery) ? 1000 + score : score
                });
            }
        });

        // Search in perspectives
        if (window.TiageTaxonomie && window.TiageTaxonomie.perspektiven) {
            Object.values(window.TiageTaxonomie.perspektiven).forEach(function(persp) {
                var perspLabel = persp.label || persp.id;
                var score = fuzzyMatchScore(perspLabel, lowerQuery);

                if (score > 0.4 || startsWithQuery(perspLabel, lowerQuery)) {
                    suggestions.push({
                        type: 'perspective',
                        id: persp.id,
                        label: perspLabel,
                        description: persp.beschreibung,
                        source: persp.quelle,
                        perspective: null,
                        score: startsWithQuery(perspLabel, lowerQuery) ? 1000 + score : score
                    });
                }
            });
        }

        // Sort by score and limit results
        suggestions.sort(function(a, b) {
            return (b.score || 0) - (a.score || 0);
        });

        return suggestions.slice(0, 15);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // RENDERING
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Render suggestion item HTML
     * @param {Object} suggestion - Suggestion object
     * @param {number} index - Item index
     * @returns {string} HTML string
     */
    function renderSuggestionItem(suggestion, index) {
        var typeLabel = {
            'need': 'Bedürfnis',
            'category': 'Kategorie',
            'dimension': 'Dimension',
            'resonanz': 'Resonanzfaktor',
            'perspective': 'Perspektive'
        }[suggestion.type] || suggestion.type;

        var perspectiveHTML = '';
        if (suggestion.perspective) {
            var icon = suggestion.perspective.icon || '📊';
            var label = suggestion.perspective.label || '';
            perspectiveHTML = '<div class="suggestion-item-perspective">' +
                '<span class="suggestion-item-perspective-icon">' + icon + '</span>' +
                '<span>Perspektive: ' + label + '</span>' +
                '</div>';
        }

        var descriptionHTML = '';
        if (suggestion.description) {
            var desc = suggestion.description;
            if (desc.length > 120) {
                desc = desc.substring(0, 120) + '...';
            }
            descriptionHTML = '<div class="suggestion-item-description">' + desc + '</div>';
        }

        // Add icon for resonanz type
        var iconPrefix = suggestion.icon ? suggestion.icon + ' ' : '';

        return '<div class="suggestion-item' + (index === suggestionState.selectedIndex ? ' active' : '') + '" ' +
               'data-index="' + index + '" ' +
               'data-value="' + suggestion.label + '">' +
               '<div class="suggestion-item-header">' +
               '<span class="suggestion-item-type type-' + suggestion.type + '">' + typeLabel + '</span>' +
               '<span class="suggestion-item-label">' + iconPrefix + suggestion.label + '</span>' +
               '<span class="suggestion-item-id">' + suggestion.id + '</span>' +
               '</div>' +
               descriptionHTML +
               perspectiveHTML +
               '</div>';
    }

    /**
     * Display search suggestions
     * @param {Array} suggestions - Array of suggestions
     */
    function displaySuggestions(suggestions) {
        var dropdown = document.getElementById('searchSuggestionsDropdown');
        var content = dropdown ? dropdown.querySelector('.search-suggestions-content') : null;

        if (!dropdown || !content) {
            return;
        }

        suggestionState.suggestions = suggestions;
        suggestionState.selectedIndex = -1;

        if (suggestions.length === 0) {
            var searchInput = document.getElementById('profileReviewSearchInput');
            var currentQuery = searchInput ? searchInput.value : '';
            var parts = currentQuery.split(',');
            var lastPart = parts[parts.length - 1].trim();

            var helpMessage = '<div class="search-suggestions-empty">' +
                '<div style="font-weight: bold; margin-bottom: 8px;">Keine Vorschläge für "' + lastPart + '"</div>' +
                '<div style="font-size: 0.85em; color: #888;">' +
                'Tipps:' +
                '<ul style="margin: 4px 0; padding-left: 16px;">' +
                '<li>Verwende längere Suchbegriffe (mind. 3 Zeichen)</li>' +
                '<li>Prüfe die Schreibweise</li>' +
                '<li>Nutze * als Wildcard (z.B. "lieb*")</li>' +
                '</ul></div></div>';
            content.innerHTML = helpMessage;
            dropdown.style.display = 'block';
            return;
        }

        // Group suggestions by type
        var grouped = {
            'need': [],
            'category': [],
            'dimension': [],
            'resonanz': [],
            'perspective': []
        };

        suggestions.forEach(function(suggestion, index) {
            if (grouped[suggestion.type]) {
                grouped[suggestion.type].push({suggestion: suggestion, index: index});
            }
        });

        var html = '';

        // Render in order: needs, categories, dimensions, resonanz, perspectives
        var order = ['need', 'category', 'dimension', 'resonanz', 'perspective'];
        var headers = {
            'need': 'Bedürfnisse',
            'category': 'Kategorien',
            'dimension': 'Dimensionen',
            'resonanz': 'Resonanzfaktoren',
            'perspective': 'Perspektiven'
        };

        order.forEach(function(type) {
            if (grouped[type].length > 0) {
                html += '<div class="suggestion-section-header">' + headers[type] + '</div>';
                grouped[type].forEach(function(item) {
                    html += renderSuggestionItem(item.suggestion, item.index);
                });
            }
        });

        content.innerHTML = html;
        dropdown.style.display = 'block';

        // Add click handlers
        content.querySelectorAll('.suggestion-item').forEach(function(item) {
            item.addEventListener('click', function() {
                selectSuggestion(parseInt(item.getAttribute('data-index')));
            });
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SUGGESTION SELECTION
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Select a suggestion
     * @param {number} index - Suggestion index
     */
    function selectSuggestion(index) {
        if (index < 0 || index >= suggestionState.suggestions.length) return;

        var suggestion = suggestionState.suggestions[index];
        var input = document.getElementById('profileReviewSearchInput');

        // Store the selected suggestion
        suggestionState.activeSuggestion = suggestion;

        // Remove active state from all resonance profile cards
        var resonanzProfileCards = document.querySelectorAll('#resonanzProfileModalValues .resonanz-profile-value-item');
        resonanzProfileCards.forEach(function(card) {
            card.classList.remove('active');
        });

        // If suggestion is a resonance factor, set active state on corresponding card
        if (suggestion.type === 'resonanz' && suggestion.id) {
            resonanzProfileCards.forEach(function(card) {
                var idElement = card.querySelector('.resonanz-profile-value-id');
                if (idElement && idElement.textContent.trim() === suggestion.id) {
                    card.classList.add('active');
                }
            });
        }

        // Activate corresponding categories in DimensionKategorieFilter
        if (typeof DimensionKategorieFilter !== 'undefined') {
            // First reset all existing filters
            DimensionKategorieFilter.reset();

            if (suggestion.type === 'dimension' && suggestion.id) {
                // For dimension: Activate all categories belonging to this dimension
                if (typeof TiageTaxonomie !== 'undefined') {
                    var kategorien = TiageTaxonomie.getKategorienFuerDimension
                        ? TiageTaxonomie.getKategorienFuerDimension(suggestion.id)
                        : [];
                    kategorien.forEach(function(kat) {
                        DimensionKategorieFilter.toggleKategorie(kat.id);
                    });
                    console.log('[selectSuggestion] Dimension aktiviert:', suggestion.id, '- Kategorien:', kategorien.map(function(k) { return k.id; }));
                }
            } else if (suggestion.type === 'category' && suggestion.id) {
                // For category: Activate this category
                DimensionKategorieFilter.toggleKategorie(suggestion.id);
                console.log('[selectSuggestion] Kategorie aktiviert:', suggestion.id);
            } else if (suggestion.type === 'resonanz' && suggestion.id) {
                // For resonance factor: Activate all associated categories
                var resonanzKategorien = DimensionKategorieFilter.KATEGORIEN_PRO_DIMENSION[suggestion.id];
                if (resonanzKategorien && resonanzKategorien.length > 0) {
                    resonanzKategorien.forEach(function(kat) {
                        DimensionKategorieFilter.toggleKategorie(kat.id);
                    });
                    console.log('[selectSuggestion] Resonanzfaktor aktiviert:', suggestion.id, '- Kategorien:', resonanzKategorien.map(function(k) { return k.id; }));
                }
            } else if (suggestion.type === 'need' && suggestion.id) {
                // For need: Use text filter only
                console.log('[selectSuggestion] Bedürfnis als Textsuche:', suggestion.label);
            }
        }

        if (input) {
            // Preserve previous criteria (before last comma) and replace last part
            var currentValue = input.value;
            var parts = currentValue.split(',');
            parts[parts.length - 1] = suggestion.label;
            var newValue = parts.join(',');

            input.value = newValue;
            // Call only filterProfileReviewByNeed, not handleIntelligentSearch
            // to avoid reopening the dropdown
            if (typeof filterProfileReviewByNeed === 'function') {
                filterProfileReviewByNeed(newValue);
            }
        }

        hide();

        // Show the selected suggestion
        displayActive();
    }

    /**
     * Display the active/selected suggestion as a tag
     */
    function displayActive() {
        var hint = document.getElementById('profileReviewSearchHint');
        if (!hint) return;

        var suggestion = suggestionState.activeSuggestion;
        if (!suggestion) {
            return;
        }

        // For need selection: Show text search tag
        if (suggestion.type === 'need') {
            hint.innerHTML = '<span class="search-active-selection">' +
                '<span class="search-active-type type-textsearch">🔍 Textsuche</span>' +
                '<span class="search-active-label">"' + suggestion.label + '"</span>' +
                '<button class="search-active-clear" onclick="TiageSearch.Suggestions.clearActive()" title="Suche entfernen">×</button>' +
                '</span>';
            hint.classList.add('has-active-selection');
            hint.classList.remove('has-results', 'no-results');
            return;
        }

        var typeLabel = {
            'category': 'Kategorie',
            'dimension': 'Dimension',
            'resonanz': 'Resonanzfaktor',
            'perspective': 'Perspektive'
        }[suggestion.type] || suggestion.type;

        var iconPrefix = suggestion.icon ? suggestion.icon + ' ' : '';

        hint.innerHTML = '<span class="search-active-selection">' +
            '<span class="search-active-type type-' + suggestion.type + '">' + typeLabel + '</span>' +
            '<span class="search-active-label">' + iconPrefix + suggestion.label + '</span>' +
            '<span class="search-active-id">' + suggestion.id + '</span>' +
            '<button class="search-active-clear" onclick="TiageSearch.Suggestions.clearActive()" title="Auswahl entfernen">×</button>' +
            '</span>';
        hint.classList.add('has-active-selection');
        hint.classList.remove('has-results', 'no-results');
    }

    /**
     * Clear the active suggestion and reset search filter
     */
    function clearActive() {
        suggestionState.activeSuggestion = null;
        var hint = document.getElementById('profileReviewSearchHint');
        if (hint) {
            hint.innerHTML = '';
            hint.classList.remove('has-active-selection');
        }
        // Clear the search input and reset filter
        var input = document.getElementById('profileReviewSearchInput');
        if (input) {
            input.value = '';
        }
        // Reset filter to show all items
        if (typeof filterProfileReviewByNeed === 'function') {
            filterProfileReviewByNeed('');
        }
        // Reset DimensionKategorieFilter
        if (typeof DimensionKategorieFilter !== 'undefined') {
            DimensionKategorieFilter.reset();
        }
        // Hide suggestions dropdown
        hide();
    }

    // ═══════════════════════════════════════════════════════════════════════
    // VISIBILITY
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Hide search suggestions
     */
    function hide() {
        var dropdown = document.getElementById('searchSuggestionsDropdown');
        if (dropdown) {
            dropdown.style.display = 'none';
        }
        suggestionState.selectedIndex = -1;
    }

    /**
     * Show search suggestions on focus
     */
    function show() {
        var input = document.getElementById('profileReviewSearchInput');
        if (!input) return;

        var query = input.value || '';
        var suggestions = generateSuggestions(query);
        displaySuggestions(suggestions);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // KEYBOARD NAVIGATION
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Handle keyboard navigation in search
     * @param {Event} event - Keyboard event
     */
    function handleKeydown(event) {
        var dropdown = document.getElementById('searchSuggestionsDropdown');
        var dropdownVisible = dropdown && dropdown.style.display !== 'none';
        var suggestions = suggestionState.suggestions || [];

        // Enter works even without visible dropdown (for text search)
        if (event.key === 'Enter') {
            event.preventDefault();
            if (dropdownVisible && suggestionState.selectedIndex >= 0) {
                selectSuggestion(suggestionState.selectedIndex);
            } else {
                // On Enter without suggestion selection -> activate text search
                var input = document.getElementById('profileReviewSearchInput');
                var query = input ? input.value.trim() : '';
                if (query.length > 0) {
                    // Create a manual text search suggestion
                    suggestionState.activeSuggestion = {
                        type: 'need',
                        id: null,
                        label: query
                    };
                    // Show the text search tag
                    displayActive();
                    // Close the dropdown
                    hide();
                    console.log('[handleSearchKeydown] Textsuche aktiviert für:', query);
                }
            }
            return;
        }

        // For other keys: Dropdown must be visible
        if (!dropdownVisible) return;
        if (suggestions.length === 0) return;

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                suggestionState.selectedIndex = Math.min(
                    suggestionState.selectedIndex + 1,
                    suggestions.length - 1
                );
                updateSelection();
                break;

            case 'ArrowUp':
                event.preventDefault();
                suggestionState.selectedIndex = Math.max(
                    suggestionState.selectedIndex - 1,
                    -1
                );
                updateSelection();
                break;

            case 'Escape':
                event.preventDefault();
                hide();
                break;
        }
    }

    /**
     * Update suggestion selection visual state
     */
    function updateSelection() {
        var content = document.querySelector('.search-suggestions-content');
        if (!content) return;

        var items = content.querySelectorAll('.suggestion-item');
        items.forEach(function(item, index) {
            if (index === suggestionState.selectedIndex) {
                item.classList.add('active');
                item.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
            } else {
                item.classList.remove('active');
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Handle intelligent search input
     * @param {string} query - Search query
     */
    function handleSearch(query) {
        // Call original filter function
        if (typeof filterProfileReviewByNeed === 'function') {
            filterProfileReviewByNeed(query);
        }

        // Generate and display suggestions
        var suggestions = generateSuggestions(query);
        displaySuggestions(suggestions);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // MODULE EXPORT
    // ═══════════════════════════════════════════════════════════════════════

    TiageSearch.Suggestions = {
        // Core Functions
        generateSuggestions: generateSuggestions,
        handleSearch: handleSearch,

        // Display
        show: show,
        hide: hide,
        displayActive: displayActive,
        clearActive: clearActive,

        // Selection
        selectSuggestion: selectSuggestion,

        // Keyboard
        handleKeydown: handleKeydown,

        // State (for debugging)
        getState: function() { return suggestionState; }
    };

    // ═══════════════════════════════════════════════════════════════════════
    // BACKWARDS COMPATIBILITY - Global function aliases
    // ═══════════════════════════════════════════════════════════════════════

    if (typeof window !== 'undefined') {
        window.TiageSearch = TiageSearch;

        // Legacy function names
        window.handleIntelligentSearch = handleSearch;
        window.showSearchSuggestions = show;
        window.hideSearchSuggestions = hide;
        window.displayActiveSuggestion = displayActive;
        window.clearActiveSuggestion = clearActive;
        window.handleSearchKeydown = handleKeydown;
    }

})();

// Node.js export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageSearch.Suggestions;
}
