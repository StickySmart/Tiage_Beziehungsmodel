/**
 * js/utils/fuzzySearch.js
 * Fuzzy search utilities - pure algorithms without dependencies
 *
 * Exports: TiageFuzzySearch
 */
const TiageFuzzySearch = (function() {
    'use strict';

    /**
     * Calculate Levenshtein distance (edit distance) between two strings
     * @param {string} a - First string
     * @param {string} b - Second string
     * @returns {number} Edit distance between strings
     */
    function levenshteinDistance(a, b) {
        if (!a || !b) return Math.max((a || '').length, (b || '').length);
        a = a.toLowerCase();
        b = b.toLowerCase();

        if (a.length === 0) return b.length;
        if (b.length === 0) return a.length;

        var matrix = [];
        for (var i = 0; i <= b.length; i++) {
            matrix[i] = [i];
        }
        for (var j = 0; j <= a.length; j++) {
            matrix[0][j] = j;
        }

        for (i = 1; i <= b.length; i++) {
            for (j = 1; j <= a.length; j++) {
                if (b.charAt(i - 1) === a.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[b.length][a.length];
    }

    /**
     * Check if query fuzzy-matches text (allows for typos)
     * @param {string} text - Text to check
     * @param {string} query - Query to match against
     * @param {number} maxDistance - Maximum allowed edit distance (default: 2)
     * @returns {number} Match score (0 = no match, higher = better match)
     */
    function fuzzyMatchScore(text, query, maxDistance) {
        if (!text || !query) return 0;
        maxDistance = maxDistance || 2;

        var lowerText = text.toLowerCase();
        var lowerQuery = query.toLowerCase();

        // Exact match = highest score
        if (lowerText === lowerQuery) return 100;

        // Starts with = very high score
        if (lowerText.startsWith(lowerQuery)) return 90;

        // Contains = high score
        if (lowerText.includes(lowerQuery)) return 80;

        // For short queries (< 3 chars), only do prefix matching
        if (query.length < 3) return 0;

        // Check fuzzy match on each word
        var words = lowerText.split(/\s+/);
        for (var i = 0; i < words.length; i++) {
            var word = words[i];
            // Check if the query is close to the start of any word
            var compareLength = Math.min(query.length, word.length);
            var wordPrefix = word.substring(0, compareLength);
            var distance = levenshteinDistance(lowerQuery, wordPrefix);

            if (distance <= maxDistance) {
                return 70 - (distance * 10); // 70 for distance 0, 60 for 1, 50 for 2
            }
        }

        return 0;
    }

    /**
     * Find best matches in a list of items
     * @param {Array} items - Array of items to search
     * @param {string} query - Search query
     * @param {Function} getText - Function to extract searchable text from item
     * @param {number} limit - Maximum number of results (default: 10)
     * @returns {Array} Sorted array of { item, score } objects
     */
    function findMatches(items, query, getText, limit) {
        if (!items || !query) return [];
        limit = limit || 10;

        var results = [];
        for (var i = 0; i < items.length; i++) {
            var text = getText(items[i]);
            var score = fuzzyMatchScore(text, query, 2);
            if (score > 0) {
                results.push({ item: items[i], score: score });
            }
        }

        // Sort by score descending
        results.sort(function(a, b) {
            return b.score - a.score;
        });

        return results.slice(0, limit);
    }

    // Public API
    return {
        levenshteinDistance: levenshteinDistance,
        fuzzyMatchScore: fuzzyMatchScore,
        findMatches: findMatches
    };
})();

// Export for other modules
if (typeof window !== 'undefined') {
    window.TiageFuzzySearch = TiageFuzzySearch;
}
