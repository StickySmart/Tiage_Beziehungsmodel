/**
 * TIAGE Visitor Tracking & Rate Limiting Module
 *
 * Handles visitor identification, page view tracking, and comment rate limiting.
 * Extracted from app-main.js for better modularity.
 *
 * Dependencies:
 * - GOOGLE_SCRIPT_URL (global constant, optional)
 * - localStorage
 * - DOM elements: #visitorIdDisplay, #headerVisitorId
 *
 * @namespace TiageVisitorTracking
 * @version 1.0.0
 * @since 2026-02-02
 */
var TiageVisitorTracking = (function() {
    'use strict';

    // ========================================
    // CONSTANTS
    // ========================================
    var COMMENT_COOLDOWN_MS = 60000; // 60 seconds

    // ========================================
    // BROWSER FINGERPRINTING
    // ========================================

    /**
     * Generate a browser fingerprint for additional security
     * @returns {string} Fingerprint hash
     */
    function generateBrowserFingerprint() {
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('TIAGE', 2, 2);
        var canvasHash = canvas.toDataURL().slice(-50);

        var fingerprint = {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            screenResolution: screen.width + 'x' + screen.height,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            canvasHash: canvasHash
        };

        var fpString = JSON.stringify(fingerprint);
        var hash = 0;
        for (var i = 0; i < fpString.length; i++) {
            var char = fpString.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return 'FP' + Math.abs(hash).toString(36);
    }

    /**
     * Get or create visitor ID from localStorage
     * @returns {string|null} Visitor ID or null
     */
    function getOrCreateVisitorId() {
        return localStorage.getItem('tiage_visitor_id') || null;
    }

    /**
     * Get browser fingerprint (cached in localStorage)
     * @returns {string} Fingerprint
     */
    function getBrowserFingerprint() {
        var fingerprint = localStorage.getItem('tiage_fingerprint');
        if (!fingerprint) {
            fingerprint = generateBrowserFingerprint();
            localStorage.setItem('tiage_fingerprint', fingerprint);
        }
        return fingerprint;
    }

    // ========================================
    // VISITOR CACHING
    // ========================================

    /**
     * Get cached total visitors count
     * @returns {number|null} Total visitors or null if expired
     */
    function getCachedTotalVisitors() {
        var cached = localStorage.getItem('tiage_total_visitors');
        var timestamp = localStorage.getItem('tiage_total_visitors_timestamp');
        var maxAge = 5 * 60 * 1000; // 5 minutes

        if (cached && timestamp && (Date.now() - parseInt(timestamp)) < maxAge) {
            return parseInt(cached);
        }
        return null;
    }

    /**
     * Set cached total visitors count
     * @param {number} total - Total visitors count
     */
    function setCachedTotalVisitors(total) {
        if (total !== null && total !== undefined) {
            localStorage.setItem('tiage_total_visitors', total.toString());
            localStorage.setItem('tiage_total_visitors_timestamp', Date.now().toString());
        }
    }

    // ========================================
    // FETCH WITH RETRY
    // ========================================

    /**
     * Fetch with retry logic and exponential backoff
     * @param {string} url - URL to fetch
     * @param {Object} options - Fetch options
     * @param {number} maxRetries - Maximum retry attempts
     * @returns {Promise<Object>} Response data
     */
    function fetchWithRetry(url, options, maxRetries) {
        options = options || {};
        maxRetries = maxRetries || 3;

        return new Promise(function(resolve, reject) {
            var attempt = 0;

            function tryFetch() {
                var controller = new AbortController();
                var timeout = setTimeout(function() { controller.abort(); }, 10000);

                fetch(url, Object.assign({}, options, { signal: controller.signal }))
                    .then(function(response) {
                        clearTimeout(timeout);
                        if (!response.ok) {
                            throw new Error('HTTP ' + response.status);
                        }
                        return response.json();
                    })
                    .then(resolve)
                    .catch(function(e) {
                        var isLastAttempt = attempt === maxRetries - 1;

                        if (isLastAttempt) {
                            console.log('Fetch failed after ' + maxRetries + ' attempts:', e.message);
                            reject(e);
                            return;
                        }

                        // Exponential backoff: 1s, 2s, 4s
                        var delay = Math.pow(2, attempt) * 1000;
                        console.log('Retry attempt ' + (attempt + 1) + ' after ' + delay + 'ms');
                        attempt++;
                        setTimeout(tryFetch, delay);
                    });
            }

            tryFetch();
        });
    }

    // ========================================
    // VISITOR ID FETCHING
    // ========================================

    /**
     * Fetch total visitors count from server
     * @returns {Promise<number|null>} Total visitors
     */
    function fetchTotalVisitors() {
        return new Promise(function(resolve) {
            var cached = getCachedTotalVisitors();

            if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL) {
                var fingerprint = getBrowserFingerprint();
                fetchWithRetry(
                    GOOGLE_SCRIPT_URL + '?action=getStats&fp=' + encodeURIComponent(fingerprint),
                    { method: 'GET' }
                )
                .then(function(data) {
                    if (data.totalVisitors !== null && data.totalVisitors !== undefined) {
                        setCachedTotalVisitors(data.totalVisitors);
                        resolve(data.totalVisitors);
                    } else {
                        resolve(cached);
                    }
                })
                .catch(function() {
                    console.log('Could not fetch stats, using backup');
                    resolve(cached);
                });
            } else {
                resolve(cached);
            }
        });
    }

    /**
     * Fetch or create visitor ID
     * @returns {Promise<Object>} { visitorId, totalVisitors, fingerprint }
     */
    function fetchOrCreateVisitorId() {
        return new Promise(function(resolve) {
            var visitorId = localStorage.getItem('tiage_visitor_id');
            var fingerprint = getBrowserFingerprint();

            // Existing visitor - just fetch stats
            if (visitorId) {
                fetchTotalVisitors().then(function(total) {
                    resolve({ visitorId: visitorId, totalVisitors: total, fingerprint: fingerprint });
                });
                return;
            }

            // Try to get new ID from server
            if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL) {
                fetchWithRetry(
                    GOOGLE_SCRIPT_URL + '?action=getVisitorId&fp=' + encodeURIComponent(fingerprint),
                    { method: 'GET' }
                )
                .then(function(data) {
                    if (data.visitorId) {
                        visitorId = data.visitorId;
                        localStorage.setItem('tiage_visitor_id', visitorId);

                        if (data.totalVisitors !== null && data.totalVisitors !== undefined) {
                            setCachedTotalVisitors(data.totalVisitors);
                        }

                        resolve({ visitorId: visitorId, totalVisitors: data.totalVisitors || null, fingerprint: fingerprint });
                    } else {
                        createLocalFallback();
                    }
                })
                .catch(function() {
                    console.log('Server not available, using local ID');
                    createLocalFallback();
                });
            } else {
                createLocalFallback();
            }

            function createLocalFallback() {
                var timestamp = Date.now().toString().slice(-4);
                var random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
                visitorId = 'L' + timestamp + random; // L prefix = local
                localStorage.setItem('tiage_visitor_id', visitorId);

                var cachedTotal = getCachedTotalVisitors();
                resolve({ visitorId: visitorId, totalVisitors: cachedTotal, fingerprint: fingerprint });
            }
        });
    }

    // ========================================
    // DISPLAY FORMATTING
    // ========================================

    /**
     * Format visitor display text
     * @param {string} visitorId - Visitor ID
     * @param {number} totalVisitors - Total visitors
     * @param {number} pageViews - Page view count
     * @returns {string} Formatted display text
     */
    function formatVisitorDisplay(visitorId, totalVisitors, pageViews) {
        var text = '#' + visitorId;
        if (totalVisitors && !visitorId.startsWith('L')) {
            text += ' von ' + totalVisitors;
        }
        if (pageViews) {
            text += ' (' + pageViews + ')';
        }
        return text;
    }

    // ========================================
    // PAGE VIEW TRACKING
    // ========================================

    /**
     * Track page view
     * @returns {Promise<number|null>} Page view count
     */
    function trackPageView() {
        return new Promise(function(resolve) {
            if (typeof GOOGLE_SCRIPT_URL !== 'undefined' && GOOGLE_SCRIPT_URL) {
                var fingerprint = getBrowserFingerprint();
                fetch(
                    GOOGLE_SCRIPT_URL + '?action=trackPageView&fp=' + encodeURIComponent(fingerprint),
                    { method: 'GET' }
                )
                .then(function(response) { return response.json(); })
                .then(function(data) {
                    resolve(data.pageViews || null);
                })
                .catch(function(e) {
                    console.log('PageView tracking failed:', e.message);
                    resolve(null);
                });
            } else {
                resolve(null);
            }
        });
    }

    // ========================================
    // INITIALIZATION
    // ========================================

    /**
     * Initialize visitor ID display
     * @returns {Promise<void>}
     */
    function initVisitorId() {
        return fetchOrCreateVisitorId().then(function(result) {
            var visitorId = result.visitorId;
            var totalVisitors = result.totalVisitors;

            return trackPageView().then(function(pageViews) {
                var displayText = formatVisitorDisplay(visitorId, totalVisitors, pageViews);

                // Update comment form display
                var display = document.getElementById('visitorIdDisplay');
                if (display) {
                    display.textContent = displayText;
                }
                // Update header display
                var headerDisplay = document.getElementById('headerVisitorId');
                if (headerDisplay) {
                    headerDisplay.textContent = displayText;
                }
            });
        });
    }

    // ========================================
    // RATE LIMITING
    // ========================================

    /**
     * Check if comment submission is allowed
     * @returns {Object} { allowed: boolean, secondsRemaining?: number }
     */
    function canSubmitComment() {
        var lastSubmit = localStorage.getItem('tiage_last_comment_time');
        if (!lastSubmit) return { allowed: true };

        var elapsed = Date.now() - parseInt(lastSubmit);
        if (elapsed >= COMMENT_COOLDOWN_MS) {
            return { allowed: true };
        }

        var remaining = Math.ceil((COMMENT_COOLDOWN_MS - elapsed) / 1000);
        return { allowed: false, secondsRemaining: remaining };
    }

    /**
     * Record comment submission time
     */
    function recordCommentSubmission() {
        localStorage.setItem('tiage_last_comment_time', Date.now().toString());
    }

    // ========================================
    // PUBLIC API
    // ========================================

    return {
        // Fingerprinting
        generateBrowserFingerprint: generateBrowserFingerprint,
        getBrowserFingerprint: getBrowserFingerprint,

        // Visitor ID
        getOrCreateVisitorId: getOrCreateVisitorId,
        fetchOrCreateVisitorId: fetchOrCreateVisitorId,
        fetchTotalVisitors: fetchTotalVisitors,

        // Caching
        getCachedTotalVisitors: getCachedTotalVisitors,
        setCachedTotalVisitors: setCachedTotalVisitors,

        // Utilities
        fetchWithRetry: fetchWithRetry,
        formatVisitorDisplay: formatVisitorDisplay,

        // Tracking
        trackPageView: trackPageView,
        initVisitorId: initVisitorId,

        // Rate limiting
        canSubmitComment: canSubmitComment,
        recordCommentSubmission: recordCommentSubmission
    };
})();

// ========================================
// BACKWARDS COMPATIBILITY EXPORTS
// ========================================
// Export to window.* for backwards compatibility with existing code
if (typeof window !== 'undefined') {
    window.generateBrowserFingerprint = TiageVisitorTracking.generateBrowserFingerprint;
    window.getBrowserFingerprint = TiageVisitorTracking.getBrowserFingerprint;
    window.getOrCreateVisitorId = TiageVisitorTracking.getOrCreateVisitorId;
    window.fetchOrCreateVisitorId = TiageVisitorTracking.fetchOrCreateVisitorId;
    window.fetchTotalVisitors = TiageVisitorTracking.fetchTotalVisitors;
    window.getCachedTotalVisitors = TiageVisitorTracking.getCachedTotalVisitors;
    window.setCachedTotalVisitors = TiageVisitorTracking.setCachedTotalVisitors;
    window.fetchWithRetry = TiageVisitorTracking.fetchWithRetry;
    window.formatVisitorDisplay = TiageVisitorTracking.formatVisitorDisplay;
    window.trackPageView = TiageVisitorTracking.trackPageView;
    window.initVisitorId = TiageVisitorTracking.initVisitorId;
    window.canSubmitComment = TiageVisitorTracking.canSubmitComment;
    window.recordCommentSubmission = TiageVisitorTracking.recordCommentSubmission;
}
