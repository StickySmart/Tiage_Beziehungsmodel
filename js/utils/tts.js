/**
 * TEXT-TO-SPEECH (TTS) MODULE
 *
 * Provides text-to-speech functionality using the Web Speech API.
 * Automatically detects the current language from TiageI18n.
 *
 * © 2025 Ti-age.de All rights reserved.
 */

const TiageTTS = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // PRIVATE STATE
    // ═══════════════════════════════════════════════════════════════════════

    let isSupported = false;
    let isSpeaking = false;
    let isPaused = false;
    let currentUtterance = null;
    let voices = [];
    let preferredVoices = {
        de: null,
        en: null
    };

    const subscribers = [];

    // ═══════════════════════════════════════════════════════════════════════
    // INITIALIZATION
    // ═══════════════════════════════════════════════════════════════════════

    function init() {
        // Check if Web Speech API is supported
        if ('speechSynthesis' in window) {
            isSupported = true;

            // Load voices (may be async in some browsers)
            loadVoices();

            // Chrome loads voices async, so we need to listen for the event
            if (speechSynthesis.onvoiceschanged !== undefined) {
                speechSynthesis.onvoiceschanged = loadVoices;
            }

            console.log('[TiageTTS] Initialized - Web Speech API supported');
        } else {
            console.warn('[TiageTTS] Web Speech API not supported in this browser');
        }
    }

    function loadVoices() {
        voices = speechSynthesis.getVoices();

        // Find preferred voices for each language
        preferredVoices.de = findBestVoice('de');
        preferredVoices.en = findBestVoice('en');

        console.log('[TiageTTS] Voices loaded:', voices.length);
        if (preferredVoices.de) console.log('[TiageTTS] German voice:', preferredVoices.de.name);
        if (preferredVoices.en) console.log('[TiageTTS] English voice:', preferredVoices.en.name);
    }

    function findBestVoice(langCode) {
        if (!voices.length) return null;

        // Priority: 1. Native/local voice, 2. Google voice, 3. Any matching voice
        const matchingVoices = voices.filter(v => v.lang.startsWith(langCode));

        if (matchingVoices.length === 0) return null;

        // Prefer local/native voices (not remote)
        const localVoice = matchingVoices.find(v => v.localService);
        if (localVoice) return localVoice;

        // Fallback to first matching voice
        return matchingVoices[0];
    }

    // ═══════════════════════════════════════════════════════════════════════
    // HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════

    function getCurrentLanguage() {
        // Get language from TiageI18n if available
        if (typeof TiageI18n !== 'undefined' && TiageI18n.getLanguage) {
            return TiageI18n.getLanguage();
        }
        return 'de'; // Default to German
    }

    function getVoiceForLanguage(langCode) {
        return preferredVoices[langCode] || findBestVoice(langCode);
    }

    function stripHtml(html) {
        // Remove HTML tags but preserve text
        const temp = document.createElement('div');
        temp.innerHTML = html;
        return temp.textContent || temp.innerText || '';
    }

    function notifySubscribers(event, data) {
        subscribers.forEach(callback => {
            try {
                callback({ type: event, ...data });
            } catch (e) {
                console.error('[TiageTTS] Subscriber error:', e);
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        /**
         * Initialize TTS (called automatically, but can be re-initialized)
         */
        init() {
            init();
        },

        /**
         * Check if TTS is supported in this browser
         * @returns {boolean}
         */
        isSupported() {
            return isSupported;
        },

        /**
         * Check if currently speaking
         * @returns {boolean}
         */
        isSpeaking() {
            return isSpeaking;
        },

        /**
         * Check if currently paused
         * @returns {boolean}
         */
        isPaused() {
            return isPaused;
        },

        /**
         * Speak the given text
         * @param {string} text - The text to speak (can contain HTML, will be stripped)
         * @param {Object} options - Optional settings
         * @param {string} options.lang - Language code ('de' or 'en'), auto-detected if not provided
         * @param {number} options.rate - Speech rate (0.1 to 10, default 1)
         * @param {number} options.pitch - Pitch (0 to 2, default 1)
         * @param {number} options.volume - Volume (0 to 1, default 1)
         * @returns {boolean} True if speech started successfully
         */
        speak(text, options = {}) {
            if (!isSupported) {
                console.warn('[TiageTTS] Cannot speak - not supported');
                return false;
            }

            // Stop any current speech
            this.stop();

            // Clean up text (strip HTML)
            const cleanText = stripHtml(text);
            if (!cleanText.trim()) {
                console.warn('[TiageTTS] No text to speak');
                return false;
            }

            // Create utterance
            const utterance = new SpeechSynthesisUtterance(cleanText);

            // Set language and voice
            const lang = options.lang || getCurrentLanguage();
            const voice = getVoiceForLanguage(lang);

            if (voice) {
                utterance.voice = voice;
                utterance.lang = voice.lang;
            } else {
                utterance.lang = lang === 'de' ? 'de-DE' : 'en-US';
            }

            // Set other options
            utterance.rate = options.rate || 1;
            utterance.pitch = options.pitch || 1;
            utterance.volume = options.volume || 1;

            // Event handlers
            utterance.onstart = () => {
                isSpeaking = true;
                isPaused = false;
                notifySubscribers('start', { text: cleanText });
            };

            utterance.onend = () => {
                isSpeaking = false;
                isPaused = false;
                currentUtterance = null;
                notifySubscribers('end', { text: cleanText });
            };

            utterance.onerror = (event) => {
                isSpeaking = false;
                isPaused = false;
                currentUtterance = null;
                console.error('[TiageTTS] Speech error:', event.error);
                notifySubscribers('error', { error: event.error });
            };

            utterance.onpause = () => {
                isPaused = true;
                notifySubscribers('pause', {});
            };

            utterance.onresume = () => {
                isPaused = false;
                notifySubscribers('resume', {});
            };

            // Store reference and speak
            currentUtterance = utterance;
            speechSynthesis.speak(utterance);

            return true;
        },

        /**
         * Stop current speech
         */
        stop() {
            if (!isSupported) return;

            speechSynthesis.cancel();
            isSpeaking = false;
            isPaused = false;
            currentUtterance = null;
            notifySubscribers('stop', {});
        },

        /**
         * Pause current speech
         */
        pause() {
            if (!isSupported || !isSpeaking) return;

            speechSynthesis.pause();
            isPaused = true;
        },

        /**
         * Resume paused speech
         */
        resume() {
            if (!isSupported || !isPaused) return;

            speechSynthesis.resume();
            isPaused = false;
        },

        /**
         * Toggle between play/pause/stop
         * @param {string} text - The text to speak (only needed if not currently speaking)
         * @param {Object} options - Speech options
         * @returns {string} The new state: 'playing', 'paused', or 'stopped'
         */
        toggle(text, options = {}) {
            if (isSpeaking && !isPaused) {
                // Currently speaking -> pause
                this.pause();
                return 'paused';
            } else if (isPaused) {
                // Currently paused -> resume
                this.resume();
                return 'playing';
            } else {
                // Not speaking -> start
                if (text) {
                    this.speak(text, options);
                    return 'playing';
                }
                return 'stopped';
            }
        },

        /**
         * Subscribe to TTS events
         * @param {Function} callback - Called with { type, ...data }
         *   Types: 'start', 'end', 'pause', 'resume', 'stop', 'error'
         * @returns {Function} Unsubscribe function
         */
        subscribe(callback) {
            subscribers.push(callback);
            return () => {
                const index = subscribers.indexOf(callback);
                if (index > -1) {
                    subscribers.splice(index, 1);
                }
            };
        },

        /**
         * Get available voices for a language
         * @param {string} langCode - Language code ('de' or 'en')
         * @returns {Array} Array of voice objects
         */
        getVoices(langCode) {
            if (!langCode) return voices;
            return voices.filter(v => v.lang.startsWith(langCode));
        },

        /**
         * Get the preferred voice for a language
         * @param {string} langCode - Language code
         * @returns {Object|null} Voice object or null
         */
        getPreferredVoice(langCode) {
            return preferredVoices[langCode] || null;
        },

        /**
         * Debug: Log current state
         */
        debug() {
            console.log('[TiageTTS] Debug:', {
                isSupported,
                isSpeaking,
                isPaused,
                voiceCount: voices.length,
                currentLanguage: getCurrentLanguage(),
                preferredVoices: {
                    de: preferredVoices.de?.name || 'none',
                    en: preferredVoices.en?.name || 'none'
                }
            });
        }
    };
})();

// Auto-initialize when DOM is ready
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => TiageTTS.init());
    } else {
        TiageTTS.init();
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageTTS;
}
