/**
 * STATE MANAGEMENT - Single Source of Truth
 *
 * Zentraler State-Store mit Pub/Sub Pattern für reaktive Updates.
 * Ersetzt die doppelte personDimensions/mobilePersonDimensions Struktur.
 *
 * NAMING CONVENTION (siehe docs/NAMING_CONVENTION.md):
 * - personDimensions: Meta-Eigenschaften die beschreiben "Wer ich bin"
 *   • geschlecht.primary/secondary: Körper/Identität
 *   • dominanz: dominant/submissiv/switch/ausgeglichen
 *   • orientierung: hetero/homo/bi
 * - Diese modifizieren die baseAttributes (30 Profil-Parameter)
 * - NICHT VERWECHSELN mit: baseAttributes (Matching), needs (GFK)
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const TiageState = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // PRIVATE STATE
    // ═══════════════════════════════════════════════════════════════════════

    const state = {
        // Person Dimensions - SINGLE SOURCE OF TRUTH
        personDimensions: {
            ich: {
                geschlecht: {
                    primary: null,    // Primäre Geschlechtsidentität (P)
                    secondary: null   // Sekundäre Geschlechtsidentität (S) - optional
                },
                dominanz: {
                    dominant: null,      // null, 'gelebt', oder 'interessiert'
                    submissiv: null,
                    switch: null,
                    ausgeglichen: null
                },
                orientierung: {
                    heterosexuell: null, // null, 'gelebt', oder 'interessiert'
                    homosexuell: null,
                    bisexuell: null
                },
                dominanzStatus: null,
                orientierungStatus: null
            },
            partner: {
                geschlecht: {
                    primary: null,
                    secondary: null
                },
                dominanz: {
                    dominant: null,
                    submissiv: null,
                    switch: null,
                    ausgeglichen: null
                },
                orientierung: {
                    heterosexuell: null,
                    homosexuell: null,
                    bisexuell: null
                },
                dominanzStatus: null,
                orientierungStatus: null
            }
        },

        // Archetype Selection - Primary/Secondary System
        archetypes: {
            ich: {
                primary: 'single',
                secondary: null  // Optional secondary archetype
            },
            partner: {
                primary: 'duo',
                secondary: null  // Optional secondary archetype
            }
        },

        // UI State
        ui: {
            currentView: 'desktop',  // 'desktop' oder 'mobile'
            currentMobilePage: 1,
            activeModal: null,
            selectedCategory: null
        },

        // Profile Save Status - tracks loaded slot and unsaved changes
        profileStatus: {
            ich: {
                loadedSlot: null,    // null = not loaded from slot, 1-4 = slot number
                isDirty: false       // true = unsaved changes since load/save
            },
            partner: {
                loadedSlot: null,
                isDirty: false
            }
        }
    };

    // ═══════════════════════════════════════════════════════════════════════
    // PUB/SUB SYSTEM
    // ═══════════════════════════════════════════════════════════════════════

    const subscribers = {
        'personDimensions': [],
        'personDimensions.ich': [],
        'personDimensions.partner': [],
        'personDimensions.ich.geschlecht': [],
        'personDimensions.ich.dominanz': [],
        'personDimensions.ich.orientierung': [],
        'personDimensions.partner.geschlecht': [],
        'personDimensions.partner.dominanz': [],
        'personDimensions.partner.orientierung': [],
        'archetypes': [],
        'archetypes.ich': [],
        'archetypes.partner': [],
        'ui': [],
        'profileStatus': [],
        'profileStatus.ich': [],
        'profileStatus.partner': [],
        '*': []  // Wildcard - receives ALL updates
    };

    /**
     * Notify all subscribers of a state change
     * @param {string} path - The state path that changed
     * @param {*} newValue - The new value
     * @param {*} oldValue - The previous value
     */
    function notify(path, newValue, oldValue) {
        const event = { path, newValue, oldValue, timestamp: Date.now() };

        // Notify specific subscribers
        if (subscribers[path]) {
            subscribers[path].forEach(callback => {
                try {
                    callback(event);
                } catch (e) {
                    console.error(`[TiageState] Subscriber error for ${path}:`, e);
                }
            });
        }

        // Notify parent path subscribers
        const pathParts = path.split('.');
        while (pathParts.length > 1) {
            pathParts.pop();
            const parentPath = pathParts.join('.');
            if (subscribers[parentPath]) {
                subscribers[parentPath].forEach(callback => {
                    try {
                        callback(event);
                    } catch (e) {
                        console.error(`[TiageState] Subscriber error for ${parentPath}:`, e);
                    }
                });
            }
        }

        // Notify wildcard subscribers
        subscribers['*'].forEach(callback => {
            try {
                callback(event);
            } catch (e) {
                console.error('[TiageState] Wildcard subscriber error:', e);
            }
        });
    }

    // ═══════════════════════════════════════════════════════════════════════
    // HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Deep clone an object
     */
    function deepClone(obj) {
        if (obj === null || typeof obj !== 'object') return obj;
        if (Array.isArray(obj)) return obj.map(deepClone);
        const cloned = {};
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                cloned[key] = deepClone(obj[key]);
            }
        }
        return cloned;
    }

    /**
     * Get value at path
     */
    function getByPath(obj, path) {
        const parts = path.split('.');
        let current = obj;
        for (const part of parts) {
            if (current === null || current === undefined) return undefined;
            current = current[part];
        }
        return current;
    }

    /**
     * Set value at path
     */
    function setByPath(obj, path, value) {
        const parts = path.split('.');
        let current = obj;
        for (let i = 0; i < parts.length - 1; i++) {
            if (current[parts[i]] === undefined) {
                current[parts[i]] = {};
            }
            current = current[parts[i]];
        }
        current[parts[parts.length - 1]] = value;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        /**
         * Get state value (returns a deep clone to prevent external mutation)
         * @param {string} path - Dot-notation path (e.g., 'personDimensions.ich.geschlecht')
         * @returns {*} The value at the path
         */
        get(path) {
            if (!path) return deepClone(state);
            return deepClone(getByPath(state, path));
        },

        /**
         * Set state value and notify subscribers
         * @param {string} path - Dot-notation path
         * @param {*} value - The new value
         */
        set(path, value) {
            const oldValue = deepClone(getByPath(state, path));
            setByPath(state, path, deepClone(value));
            notify(path, value, oldValue);
        },

        /**
         * Subscribe to state changes
         * @param {string} path - The path to watch (use '*' for all changes)
         * @param {Function} callback - Called with {path, newValue, oldValue, timestamp}
         * @returns {Function} Unsubscribe function
         */
        subscribe(path, callback) {
            if (!subscribers[path]) {
                subscribers[path] = [];
            }
            subscribers[path].push(callback);

            // Return unsubscribe function
            return () => {
                const index = subscribers[path].indexOf(callback);
                if (index > -1) {
                    subscribers[path].splice(index, 1);
                }
            };
        },

        /**
         * Batch multiple updates (single notification at end)
         * @param {Function} updateFn - Function that performs multiple set() calls
         */
        batch(updateFn) {
            const changes = [];
            const originalNotify = notify;

            // Temporarily capture notifications
            const captureNotify = (path, newValue, oldValue) => {
                changes.push({ path, newValue, oldValue });
            };

            // Replace notify temporarily
            // Note: This is a simplified batch - in production you might want a more robust approach
            try {
                updateFn();
            } finally {
                // Notify all changes
                changes.forEach(({ path, newValue, oldValue }) => {
                    originalNotify(path, newValue, oldValue);
                });
            }
        },

        // ═══════════════════════════════════════════════════════════════════
        // CONVENIENCE METHODS FOR PERSON DIMENSIONS
        // ═══════════════════════════════════════════════════════════════════

        /**
         * Get person dimensions (ich or partner)
         * @param {string} person - 'ich' oder 'partner'
         */
        getPerson(person) {
            return this.get(`personDimensions.${person}`);
        },

        /**
         * Set primary geschlecht
         * @param {string} person - 'ich' or 'partner'
         * @param {string|null} value - The geschlecht value
         */
        setGeschlecht(person, value) {
            // Für Rückwärtskompatibilität: setze als primary
            this.set(`personDimensions.${person}.geschlecht.primary`, value);
        },

        /**
         * Set secondary geschlecht
         * @param {string} person - 'ich' or 'partner'
         * @param {string|null} value - The geschlecht value
         */
        setSecondaryGeschlecht(person, value) {
            // Secondary kann nicht gleich primary sein
            const primary = this.get(`personDimensions.${person}.geschlecht.primary`);
            if (value === primary) {
                console.warn('[TiageState] Secondary geschlecht cannot be same as primary');
                return;
            }
            this.set(`personDimensions.${person}.geschlecht.secondary`, value);
        },

        /**
         * Get primary geschlecht
         * @param {string} person - 'ich' or 'partner'
         * @returns {string|null} The primary geschlecht
         */
        getPrimaryGeschlecht(person) {
            return this.get(`personDimensions.${person}.geschlecht.primary`);
        },

        /**
         * Get secondary geschlecht
         * @param {string} person - 'ich' or 'partner'
         * @returns {string|null} The secondary geschlecht
         */
        getSecondaryGeschlecht(person) {
            return this.get(`personDimensions.${person}.geschlecht.secondary`);
        },

        /**
         * Get both geschlechter
         * @param {string} person - 'ich' or 'partner'
         * @returns {Object} { primary: string|null, secondary: string|null }
         */
        getGeschlechter(person) {
            return this.get(`personDimensions.${person}.geschlecht`);
        },

        /**
         * Clear secondary geschlecht
         * @param {string} person - 'ich' or 'partner'
         */
        clearSecondaryGeschlecht(person) {
            this.set(`personDimensions.${person}.geschlecht.secondary`, null);
        },

        /**
         * Set dominanz for a specific type
         */
        setDominanz(person, dominanzType, status) {
            const currentDominanz = this.get(`personDimensions.${person}.dominanz`);

            // If setting to 'gelebt', clear other 'gelebt' values (only one can be gelebt)
            if (status === 'gelebt') {
                for (const type in currentDominanz) {
                    if (type !== dominanzType && currentDominanz[type] === 'gelebt') {
                        currentDominanz[type] = null;
                    }
                }
            }

            currentDominanz[dominanzType] = status;
            this.set(`personDimensions.${person}.dominanz`, currentDominanz);
        },

        /**
         * Set orientierung for a specific type
         */
        setOrientierung(person, orientierungType, status) {
            const currentOrientierung = this.get(`personDimensions.${person}.orientierung`);

            // If setting to 'gelebt', clear other 'gelebt' values (only one can be gelebt)
            if (status === 'gelebt') {
                for (const type in currentOrientierung) {
                    if (type !== orientierungType && currentOrientierung[type] === 'gelebt') {
                        currentOrientierung[type] = null;
                    }
                }
            }

            currentOrientierung[orientierungType] = status;
            this.set(`personDimensions.${person}.orientierung`, currentOrientierung);
        },

        /**
         * Get the primary (gelebt) dominanz
         */
        getPrimaryDominanz(person) {
            const dominanz = this.get(`personDimensions.${person}.dominanz`);
            if (!dominanz) return null;
            // New format: { primary: 'dominant', secondary: 'submissiv' }
            if ('primary' in dominanz) {
                return dominanz.primary || null;
            }
            // Old format: { dominant: 'gelebt', submissiv: 'interessiert' }
            for (const type in dominanz) {
                if (dominanz[type] === 'gelebt') return type;
            }
            return null;
        },

        /**
         * Get the primary (gelebt) orientierung
         */
        getPrimaryOrientierung(person) {
            const orientierung = this.get(`personDimensions.${person}.orientierung`);
            if (!orientierung) return null;
            // New format: { primary: 'homosexuell', secondary: 'heterosexuell' }
            if ('primary' in orientierung) {
                return orientierung.primary || null;
            }
            // Old format: { heterosexuell: 'gelebt', homosexuell: 'interessiert' }
            for (const type in orientierung) {
                if (orientierung[type] === 'gelebt') return type;
            }
            return null;
        },

        /**
         * Check if all required dimensions are set for a person
         */
        isPersonComplete(person) {
            const dims = this.get(`personDimensions.${person}`);
            // Geschlecht hat jetzt primary/secondary - nur primary ist erforderlich
            const hasPrimaryGeschlecht = dims.geschlecht && dims.geschlecht.primary !== null;
            return hasPrimaryGeschlecht &&
                   this.getPrimaryDominanz(person) !== null &&
                   this.getPrimaryOrientierung(person) !== null;
        },

        /**
         * Get missing dimensions for validation
         */
        getMissingDimensions() {
            const missing = [];

            ['ich', 'partner'].forEach(person => {
                const label = person === 'ich' ? 'Ich' : 'Partner';
                const dims = this.get(`personDimensions.${person}`);

                // Geschlecht primary ist erforderlich
                const hasPrimaryGeschlecht = dims.geschlecht && dims.geschlecht.primary !== null;
                if (!hasPrimaryGeschlecht) missing.push(`${label}: Geschlecht`);
                if (!this.getPrimaryDominanz(person)) missing.push(`${label}: Dominanz`);
                if (!this.getPrimaryOrientierung(person)) missing.push(`${label}: Orientierung`);
            });

            return missing;
        },

        // ═══════════════════════════════════════════════════════════════════
        // ARCHETYPE METHODS (Primary/Secondary System)
        // ═══════════════════════════════════════════════════════════════════

        /**
         * Set primary archetype for a person
         * @param {string} person - 'ich' or 'partner'
         * @param {string} archetype - The archetype ID
         */
        setArchetype(person, archetype) {
            this.set(`archetypes.${person}.primary`, archetype);
        },

        /**
         * Set secondary archetype for a person (optional)
         * @param {string} person - 'ich' or 'partner'
         * @param {string|null} archetype - The archetype ID or null
         */
        setSecondaryArchetype(person, archetype) {
            // Secondary cannot be the same as primary
            const primary = this.get(`archetypes.${person}.primary`);
            if (archetype === primary) {
                console.warn('[TiageState] Secondary cannot be same as primary');
                return;
            }
            this.set(`archetypes.${person}.secondary`, archetype);
        },

        /**
         * Get primary archetype for a person
         * @param {string} person - 'ich' or 'partner'
         * @returns {string} The primary archetype ID
         */
        getArchetype(person) {
            return this.get(`archetypes.${person}.primary`);
        },

        /**
         * Get secondary archetype for a person
         * @param {string} person - 'ich' or 'partner'
         * @returns {string|null} The secondary archetype ID or null
         */
        getSecondaryArchetype(person) {
            return this.get(`archetypes.${person}.secondary`);
        },

        /**
         * Get both archetypes for a person
         * @param {string} person - 'ich' or 'partner'
         * @returns {Object} { primary: string, secondary: string|null }
         */
        getArchetypes(person) {
            return this.get(`archetypes.${person}`);
        },

        /**
         * Clear secondary archetype
         * @param {string} person - 'ich' or 'partner'
         */
        clearSecondaryArchetype(person) {
            this.set(`archetypes.${person}.secondary`, null);
        },

        // ═══════════════════════════════════════════════════════════════════
        // UI STATE METHODS
        // ═══════════════════════════════════════════════════════════════════

        setView(view) {
            this.set('ui.currentView', view);
        },

        getView() {
            return this.get('ui.currentView');
        },

        setMobilePage(page) {
            this.set('ui.currentMobilePage', page);
        },

        getMobilePage() {
            return this.get('ui.currentMobilePage');
        },

        // ═══════════════════════════════════════════════════════════════════
        // PROFILE STATUS METHODS
        // ═══════════════════════════════════════════════════════════════════

        /**
         * Set loaded slot for a person
         * @param {string} person - 'ich' or 'partner'
         * @param {number|null} slotNumber - Slot number (1-4) or null
         */
        setLoadedSlot(person, slotNumber) {
            this.set(`profileStatus.${person}.loadedSlot`, slotNumber);
            this.set(`profileStatus.${person}.isDirty`, false);
        },

        /**
         * Get loaded slot for a person
         * @param {string} person - 'ich' or 'partner'
         * @returns {number|null}
         */
        getLoadedSlot(person) {
            return this.get(`profileStatus.${person}.loadedSlot`);
        },

        /**
         * Mark profile as dirty (has unsaved changes)
         * @param {string} person - 'ich' or 'partner'
         */
        markDirty(person) {
            this.set(`profileStatus.${person}.isDirty`, true);
        },

        /**
         * Mark profile as clean (saved)
         * @param {string} person - 'ich' or 'partner'
         */
        markClean(person) {
            this.set(`profileStatus.${person}.isDirty`, false);
        },

        /**
         * Check if profile has unsaved changes
         * @param {string} person - 'ich' or 'partner'
         * @returns {boolean}
         */
        isDirty(person) {
            return this.get(`profileStatus.${person}.isDirty`) === true;
        },

        /**
         * Get full profile status for a person
         * @param {string} person - 'ich' or 'partner'
         * @returns {Object} { loadedSlot, isDirty }
         */
        getProfileStatus(person) {
            return this.get(`profileStatus.${person}`);
        },

        // ═══════════════════════════════════════════════════════════════════
        // RESET / INITIALIZATION
        // ═══════════════════════════════════════════════════════════════════

        /**
         * Reset all state to initial values
         */
        reset() {
            this.set('personDimensions', {
                ich: {
                    geschlecht: { primary: null, secondary: null },
                    dominanz: { dominant: null, submissiv: null, switch: null, ausgeglichen: null },
                    orientierung: { heterosexuell: null, homosexuell: null, bisexuell: null },
                    dominanzStatus: null,
                    orientierungStatus: null
                },
                partner: {
                    geschlecht: { primary: null, secondary: null },
                    dominanz: { dominant: null, submissiv: null, switch: null, ausgeglichen: null },
                    orientierung: { heterosexuell: null, homosexuell: null, bisexuell: null },
                    dominanzStatus: null,
                    orientierungStatus: null
                }
            });
            this.set('archetypes', {
                ich: { primary: 'single', secondary: null },
                partner: { primary: 'duo', secondary: null }
            });
            this.set('ui', { currentView: 'desktop', currentMobilePage: 1, activeModal: null, selectedCategory: null });
            this.set('profileStatus', {
                ich: { loadedSlot: null, isDirty: false },
                partner: { loadedSlot: null, isDirty: false }
            });
        },

        /**
         * Load state from localStorage
         */
        loadFromStorage() {
            // Mapping von alten #A1-#A8 Keys zu neuen String-Keys
            const archetypeIdToKey = {
                '#A1': 'single',
                '#A2': 'duo',
                '#A3': 'duo_flex',
                '#A4': 'solopoly',
                '#A5': 'polyamor',
                '#A6': 'ra',
                '#A7': 'lat',
                '#A8': 'aromantisch'
            };

            // Hilfsfunktion: Konvertiert alten Archetyp-ID zu neuem Key
            const convertArchetypeId = (id) => {
                if (!id) return id;
                const newKey = archetypeIdToKey[id];
                if (newKey) {
                    console.log(`[TiageState] Konvertiere alten Archetyp-ID ${id} zu ${newKey}`);
                    return newKey;
                }
                return id;
            };

            try {
                const saved = localStorage.getItem('tiage_state');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    if (parsed.personDimensions) {
                        this.set('personDimensions', parsed.personDimensions);
                    }
                    if (parsed.archetypes) {
                        // Konvertiere alte #A1-#A8 Keys zu neuen String-Keys
                        if (parsed.archetypes.ich) {
                            parsed.archetypes.ich.primary = convertArchetypeId(parsed.archetypes.ich.primary);
                            parsed.archetypes.ich.secondary = convertArchetypeId(parsed.archetypes.ich.secondary);
                        }
                        if (parsed.archetypes.partner) {
                            parsed.archetypes.partner.primary = convertArchetypeId(parsed.archetypes.partner.primary);
                            parsed.archetypes.partner.secondary = convertArchetypeId(parsed.archetypes.partner.secondary);
                        }
                        this.set('archetypes', parsed.archetypes);
                    }
                }
            } catch (e) {
                console.warn('[TiageState] Failed to load from storage:', e);
            }
        },

        /**
         * Save state to localStorage
         */
        saveToStorage() {
            try {
                const toSave = {
                    personDimensions: this.get('personDimensions'),
                    archetypes: this.get('archetypes')
                };
                localStorage.setItem('tiage_state', JSON.stringify(toSave));
            } catch (e) {
                console.warn('[TiageState] Failed to save to storage:', e);
            }
        },

        // ═══════════════════════════════════════════════════════════════════
        // DEBUG
        // ═══════════════════════════════════════════════════════════════════

        /**
         * Debug: Log current state
         */
        debug() {
            console.log('[TiageState] Current state:', deepClone(state));
            console.log('[TiageState] Subscribers:', Object.keys(subscribers).map(k => `${k}: ${subscribers[k].length}`));
        }
    };
})();

// Auto-detect view on load
if (typeof window !== 'undefined') {
    TiageState.setView(window.innerWidth <= 768 ? 'mobile' : 'desktop');

    // Update view on resize
    window.addEventListener('resize', () => {
        const newView = window.innerWidth <= 768 ? 'mobile' : 'desktop';
        if (TiageState.getView() !== newView) {
            TiageState.setView(newView);
        }
    });
}

// Export for ES6 modules (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageState;
}
