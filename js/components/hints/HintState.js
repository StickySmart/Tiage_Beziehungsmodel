/**
 * HINT STATE MANAGER
 *
 * State-Management für Philosophy Hints.
 * Verwaltet Session-State und Persistenz für spezielle Hint-Logik:
 * - First Lock: Nur einmal pro Session zeigen
 * - Conflict Detection: Prüft ob gelockte Werte von Erwartungswerten abweichen
 * - Analytics Tracking: Optional
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const HintState = (function() {
    'use strict';

    // ========================================
    // STORAGE KEYS
    // ========================================

    const STORAGE_KEYS = {
        SESSION: 'tiage_hint_session_state',
        PERSISTENT: 'tiage_hint_persistent_state',
        ANALYTICS: 'tiage_hint_analytics',
        MOMENTS_ENABLED: 'tiage_moments_enabled'
    };

    // ========================================
    // SESSION STATE (resets on page refresh)
    // ========================================

    let sessionState = {
        hasShownFirstLockHint: false,
        hasShownConflictHint: false,
        expandedHints: [],
        currentMoment: null
    };

    // ========================================
    // CONFLICT DETECTION
    // ========================================

    /**
     * Schwellenwert für Konflikt-Erkennung
     * Wenn ein gelockter Wert mehr als dieser Wert vom Erwartungswert abweicht,
     * wird ein Konflikt erkannt.
     */
    const CONFLICT_THRESHOLD = 15; // Prozentpunkte

    /**
     * Prüft ob ein Konflikt zwischen gelockten Werten und neuen Erwartungswerten existiert
     *
     * @param {Array} lockedNeeds - Array von gelockten Bedürfnissen
     *        Format: [{ key: string, lockedValue: number, newExpectedValue: number }]
     * @param {number} [threshold=CONFLICT_THRESHOLD] - Schwellenwert für Abweichung
     * @returns {Object} { hasConflict: boolean, conflicts: Array }
     */
    function detectConflict(lockedNeeds, threshold = CONFLICT_THRESHOLD) {
        if (!Array.isArray(lockedNeeds) || lockedNeeds.length === 0) {
            return { hasConflict: false, conflicts: [] };
        }

        const conflicts = lockedNeeds.filter(need => {
            if (need.lockedValue === undefined || need.newExpectedValue === undefined) {
                return false;
            }
            const deviation = Math.abs(need.lockedValue - need.newExpectedValue);
            return deviation > threshold;
        });

        return {
            hasConflict: conflicts.length > 0,
            conflicts: conflicts.map(c => ({
                key: c.key,
                lockedValue: c.lockedValue,
                expectedValue: c.newExpectedValue,
                deviation: Math.abs(c.lockedValue - c.newExpectedValue)
            }))
        };
    }

    // ========================================
    // FIRST LOCK MANAGEMENT
    // ========================================

    /**
     * Prüft ob der First Lock Hint bereits gezeigt wurde
     * @returns {boolean}
     */
    function hasShownFirstLockHint() {
        return sessionState.hasShownFirstLockHint;
    }

    /**
     * Markiert den First Lock Hint als gezeigt
     */
    function markFirstLockHintShown() {
        sessionState.hasShownFirstLockHint = true;
        console.log('[TIAGE] First Lock Hint als gezeigt markiert');
    }

    /**
     * Handler für Lock-Events
     * Gibt true zurück wenn der First Lock Hint gezeigt werden soll
     *
     * @param {boolean} isFirstLock - Ist dies der erste Lock insgesamt?
     * @returns {boolean} true wenn Hint gezeigt werden soll
     */
    function shouldShowFirstLockHint(isFirstLock) {
        if (!isFirstLock) return false;
        if (sessionState.hasShownFirstLockHint) return false;
        return true;
    }

    // ========================================
    // CONFLICT HINT MANAGEMENT
    // ========================================

    /**
     * Prüft ob der Conflict Hint bereits gezeigt wurde (in dieser Session)
     * @returns {boolean}
     */
    function hasShownConflictHint() {
        return sessionState.hasShownConflictHint;
    }

    /**
     * Markiert den Conflict Hint als gezeigt
     */
    function markConflictHintShown() {
        sessionState.hasShownConflictHint = true;
    }

    /**
     * Handler für AGOD-Änderungen
     * Gibt true zurück wenn der Conflict Hint gezeigt werden soll
     *
     * @param {Array} lockedNeeds - Array von gelockten Bedürfnissen
     * @returns {Object} { shouldShow: boolean, conflicts: Array }
     */
    function shouldShowConflictHint(lockedNeeds) {
        const result = detectConflict(lockedNeeds);

        if (!result.hasConflict) {
            return { shouldShow: false, conflicts: [] };
        }

        // Optional: Nur einmal pro Session zeigen
        // Auskommentieren wenn der Hint bei jeder Änderung erscheinen soll
        // if (sessionState.hasShownConflictHint) {
        //     return { shouldShow: false, conflicts: result.conflicts };
        // }

        return {
            shouldShow: true,
            conflicts: result.conflicts
        };
    }

    // ========================================
    // ANALYTICS (Optional)
    // ========================================

    /**
     * Trackt ein Hint-Event
     * @param {string} eventType - z.B. 'expanded', 'dismissed', 'shown'
     * @param {string} momentId - z.B. 'moment-1-start'
     * @param {Object} [data] - Zusätzliche Daten
     */
    function trackHintEvent(eventType, momentId, data = {}) {
        try {
            // Zur Session hinzufügen
            if (eventType === 'expanded' && !sessionState.expandedHints.includes(momentId)) {
                sessionState.expandedHints.push(momentId);
            }

            // Globales Event (falls vorhanden)
            if (typeof trackEvent === 'function') {
                trackEvent(`hint_${eventType}`, {
                    moment: momentId,
                    ...data
                });
            }

            // In localStorage für spätere Analyse
            const analytics = getAnalytics();
            analytics.events.push({
                type: eventType,
                moment: momentId,
                timestamp: Date.now(),
                ...data
            });

            // Limit auf letzte 100 Events
            if (analytics.events.length > 100) {
                analytics.events = analytics.events.slice(-100);
            }

            localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(analytics));

        } catch (e) {
            console.warn('[TIAGE] Analytics tracking failed:', e);
        }
    }

    /**
     * Gibt Analytics-Daten zurück
     * @returns {Object}
     */
    function getAnalytics() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
            return stored ? JSON.parse(stored) : { events: [] };
        } catch (e) {
            return { events: [] };
        }
    }

    /**
     * Löscht Analytics-Daten
     */
    function clearAnalytics() {
        try {
            localStorage.removeItem(STORAGE_KEYS.ANALYTICS);
        } catch (e) {
            console.warn('[TIAGE] Failed to clear analytics:', e);
        }
    }

    // ========================================
    // GLOBAL MOMENTS TOGGLE
    // ========================================

    /**
     * Prüft ob Momente global aktiviert sind
     * @returns {boolean} true wenn aktiviert (Standard: true)
     */
    function areMomentsEnabled() {
        try {
            const stored = localStorage.getItem(STORAGE_KEYS.MOMENTS_ENABLED);
            // Standard ist aktiviert (true)
            return stored === null ? true : stored === 'true';
        } catch (e) {
            console.warn('[TIAGE] Fehler beim Laden der Moments-Einstellung:', e);
            return true;
        }
    }

    /**
     * Setzt den globalen Moments-Status
     * @param {boolean} enabled - true zum Aktivieren, false zum Deaktivieren
     */
    function setMomentsEnabled(enabled) {
        try {
            localStorage.setItem(STORAGE_KEYS.MOMENTS_ENABLED, String(enabled));
            console.log('[TIAGE] Momente ' + (enabled ? 'aktiviert' : 'deaktiviert'));

            // Custom Event für UI-Updates
            window.dispatchEvent(new CustomEvent('tiage-moments-toggled', {
                detail: { enabled }
            }));
        } catch (e) {
            console.warn('[TIAGE] Fehler beim Speichern der Moments-Einstellung:', e);
        }
    }

    /**
     * Toggle für Momente (wechselt zwischen an/aus)
     * @returns {boolean} Neuer Status
     */
    function toggleMomentsEnabled() {
        const newState = !areMomentsEnabled();
        setMomentsEnabled(newState);
        return newState;
    }

    // ========================================
    // MOMENT TRACKING
    // ========================================

    /**
     * Setzt den aktuellen Moment im Flow
     * @param {string} momentId - z.B. 'moment-1-start'
     */
    function setCurrentMoment(momentId) {
        sessionState.currentMoment = momentId;
    }

    /**
     * Gibt den aktuellen Moment zurück
     * @returns {string|null}
     */
    function getCurrentMoment() {
        return sessionState.currentMoment;
    }

    /**
     * Gibt alle in dieser Session expandierten Hints zurück
     * @returns {Array<string>}
     */
    function getExpandedHints() {
        return [...sessionState.expandedHints];
    }

    // ========================================
    // SESSION RESET
    // ========================================

    /**
     * Setzt den Session-State zurück
     * Nützlich für Tests oder wenn ein neues Profil erstellt wird
     */
    function resetSession() {
        sessionState = {
            hasShownFirstLockHint: false,
            hasShownConflictHint: false,
            expandedHints: [],
            currentMoment: null
        };
        console.log('[TIAGE] Hint Session State zurückgesetzt');
    }

    /**
     * Setzt alles zurück (Session + Persistenz)
     */
    function resetAll() {
        resetSession();
        try {
            localStorage.removeItem(STORAGE_KEYS.SESSION);
            localStorage.removeItem(STORAGE_KEYS.PERSISTENT);
            // Analytics behalten wir
            console.log('[TIAGE] Hint State vollständig zurückgesetzt');
        } catch (e) {
            console.warn('[TIAGE] Reset failed:', e);
        }
    }

    // ========================================
    // PUBLIC API
    // ========================================

    return {
        // Conflict Detection
        detectConflict,
        CONFLICT_THRESHOLD,

        // First Lock
        hasShownFirstLockHint,
        markFirstLockHintShown,
        shouldShowFirstLockHint,

        // Conflict Hint
        hasShownConflictHint,
        markConflictHintShown,
        shouldShowConflictHint,

        // Global Moments Toggle
        areMomentsEnabled,
        setMomentsEnabled,
        toggleMomentsEnabled,

        // Analytics
        trackHintEvent,
        getAnalytics,
        clearAnalytics,

        // Moment Tracking
        setCurrentMoment,
        getCurrentMoment,
        getExpandedHints,

        // Reset
        resetSession,
        resetAll
    };

})();

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HintState;
}
