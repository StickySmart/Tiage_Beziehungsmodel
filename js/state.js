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
        // Data Structure v3.0:
        // - geschlecht: { primary, secondary }
        // - dominanz: { primary, secondary }
        // - orientierung: { primary, secondary }
        personDimensions: {
            ich: {
                geschlecht: {
                    primary: null,    // Körper: 'mann', 'frau', 'inter'
                    secondary: null   // Identität: 'cis', 'trans', 'suchend', 'nonbinaer', 'fluid'
                },
                dominanz: {
                    primary: null,    // 'dominant', 'submissiv', 'switch', 'ausgeglichen'
                    secondary: null   // Optional zweite Präferenz
                },
                orientierung: {
                    primary: null,    // 'heterosexuell', 'homosexuell', 'bisexuell'
                    secondary: null   // Optional zweite Präferenz
                }
            },
            partner: {
                geschlecht: {
                    primary: null,
                    secondary: null
                },
                dominanz: {
                    primary: null,
                    secondary: null
                },
                orientierung: {
                    primary: null,
                    secondary: null
                }
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
            selectedCategory: null,
            // Match Modal Settings
            matchModalView: 'pathos',    // 'pathos' oder 'logos'
            syntheseType: 'score',       // 'score', 'pathos', oder 'logos'
            // Profil-Auswahl für Matching
            selection: null,             // { ich: {...}, partner: {...} } oder null
            // Sprach-Einstellung
            language: 'de'               // 'de' oder 'en'
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
        },

        // ═══════════════════════════════════════════════════════════════════════
        // GEWICHTUNGEN - Faktor-Gewichte (O, A, D, G)
        // ═══════════════════════════════════════════════════════════════════════
        // Diese beeinflussen wie stark die 4 Dimensionen ins Matching einfließen.
        // Summe sollte 100 ergeben. User kann diese manuell anpassen.
        gewichtungen: {
            ich: {
                O: { value: 25, locked: false },  // Orientierung
                A: { value: 25, locked: false },  // Archetyp
                D: { value: 25, locked: false },  // Dominanz
                G: { value: 25, locked: false },  // Geschlecht
                summeLock: { enabled: true, target: 100 }  // Summen-Lock
            },
            partner: {
                O: { value: 25, locked: false },
                A: { value: 25, locked: false },
                D: { value: 25, locked: false },
                G: { value: 25, locked: false },
                summeLock: { enabled: true, target: 100 }
            }
        },

        // ═══════════════════════════════════════════════════════════════════════
        // RESONANZFAKTOREN - R1, R2, R3, R4
        // ═══════════════════════════════════════════════════════════════════════
        // Multiplier für die 4 Bedürfnis-Dimensionen (Leben, Philosophie, Kink, Identität).
        // Werden aus dem Profil berechnet, aber User kann sie manuell überschreiben.
        // v3.2: Wertebereich 0 - 1 (R = similarity², quadratisch)
        resonanzFaktoren: {
            ich: {
                R1: { value: 1.0, locked: false },  // Leben (existenz, zuneigung, musse)
                R2: { value: 1.0, locked: false },  // Philosophie (freiheit, teilnahme, identitaet)
                R3: { value: 1.0, locked: false },  // Kink (dynamik, sicherheit)
                R4: { value: 1.0, locked: false }   // Identität (verstaendnis, erschaffen, verbundenheit)
            },
            partner: {
                R1: { value: 1.0, locked: false },
                R2: { value: 1.0, locked: false },
                R3: { value: 1.0, locked: false },
                R4: { value: 1.0, locked: false }
            }
        },

        // ═══════════════════════════════════════════════════════════════════════
        // FLAT NEEDS - Die 220 Bedürfniswerte
        // ═══════════════════════════════════════════════════════════════════════
        // Werden aus Archetyp + Modifiern berechnet.
        // Keys sind Bedürfnis-IDs wie '#B1', '#B2', etc.
        // Werte: 0-100
        flatNeeds: {
            ich: {},    // z.B. { '#B1': 75, '#B2': 60, ... }
            partner: {}
        },

        // ═══════════════════════════════════════════════════════════════════════
        // PROFILE REVIEW - Survey-Overrides für einzelne Bedürfnisse
        // ═══════════════════════════════════════════════════════════════════════
        // Wenn User im Survey einzelne Bedürfnisse manuell setzt, werden sie hier gespeichert.
        // Diese überschreiben die berechneten flatNeeds.
        profileReview: {
            ich: {
                lockedNeeds: {}  // z.B. { '#B15': 90, '#B42': 30 } - manuell gesetzte Werte
            },
            partner: {
                lockedNeeds: {}
            }
        },

        // ═══════════════════════════════════════════════════════════════════════
        // BINDUNGSMUSTER (Attachment Styles) - für Tie-Breaker bei Match-Suche
        // ═══════════════════════════════════════════════════════════════════════
        // Nach Bowlby/Ainsworth:
        // - 'sicher': Kann Nähe und Autonomie balancieren, vertraut
        // - 'aengstlich': Angst vor Verlassenwerden, klammert, braucht Bestätigung
        // - 'vermeidend': Hält Distanz, zeigt wenig Gefühle, "braucht niemanden"
        // - 'desorganisiert': Chaotisch, will Nähe und flüchtet gleichzeitig
        bindungsmuster: {
            ich: {
                primary: null,    // 'sicher', 'aengstlich', 'vermeidend', 'desorganisiert'
                secondary: null   // Zweites Muster für Tie-Breaker (30% Gewichtung)
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
        'ui.matchModalView': [],
        'ui.syntheseType': [],
        'ui.selection': [],
        'ui.language': [],
        'profileStatus': [],
        'profileStatus.ich': [],
        'profileStatus.partner': [],
        // Neue Subscriber für erweiterten State
        'gewichtungen': [],
        'gewichtungen.ich': [],
        'gewichtungen.partner': [],
        'resonanzFaktoren': [],
        'resonanzFaktoren.ich': [],
        'resonanzFaktoren.partner': [],
        'flatNeeds': [],
        'flatNeeds.ich': [],
        'flatNeeds.partner': [],
        'profileReview': [],
        'profileReview.ich': [],
        'profileReview.partner': [],
        'bindungsmuster': [],
        'bindungsmuster.ich': [],
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
    // GESCHLECHT NORMALISIERUNG
    // ═══════════════════════════════════════════════════════════════════════
    //
    // Stellt sicher, dass Geschlechts-Werte konsistent mit ProfileModifiers sind.
    // Konvertiert alte/alternative Werte zu den erwarteten Keys.
    //
    // MAPPING:
    //   primary:   'divers' → 'inter'
    //   secondary: 'nb' → 'nonbinaer'
    // ═══════════════════════════════════════════════════════════════════════

    const GESCHLECHT_PRIMARY_MAP = {
        'divers': 'inter',
        'diverse': 'inter',
        'd': 'inter'
    };

    const GESCHLECHT_SECONDARY_MAP = {
        'nb': 'nonbinaer',
        'non-binary': 'nonbinaer',
        'non-binär': 'nonbinaer',
        'unsicher': 'suchend'
    };

    /**
     * Normalisiert Geschlechts-Werte für Konsistenz mit ProfileModifiers
     * @param {string} path - Der State-Pfad
     * @param {*} value - Der zu setzende Wert
     * @returns {*} Der normalisierte Wert
     */
    function normalizeGeschlechtValue(path, value) {
        if (value === null || value === undefined) return value;

        // Prüfe ob es ein Geschlechts-Pfad ist
        if (path.includes('.geschlecht.primary')) {
            const normalized = GESCHLECHT_PRIMARY_MAP[value.toLowerCase?.()];
            if (normalized) {
                console.log(`[TiageState] Geschlecht primary normalisiert: '${value}' → '${normalized}'`);
                return normalized;
            }
        }

        if (path.includes('.geschlecht.secondary')) {
            const normalized = GESCHLECHT_SECONDARY_MAP[value.toLowerCase?.()];
            if (normalized) {
                console.log(`[TiageState] Geschlecht secondary normalisiert: '${value}' → '${normalized}'`);
                return normalized;
            }
        }

        // Wenn ein ganzes Geschlechts-Objekt gesetzt wird
        if (path.includes('.geschlecht') && typeof value === 'object' && value !== null) {
            const result = { ...value };
            if (result.primary && GESCHLECHT_PRIMARY_MAP[result.primary.toLowerCase?.()]) {
                const old = result.primary;
                result.primary = GESCHLECHT_PRIMARY_MAP[result.primary.toLowerCase()];
                console.log(`[TiageState] Geschlecht primary normalisiert: '${old}' → '${result.primary}'`);
            }
            if (result.secondary && GESCHLECHT_SECONDARY_MAP[result.secondary.toLowerCase?.()]) {
                const old = result.secondary;
                result.secondary = GESCHLECHT_SECONDARY_MAP[result.secondary.toLowerCase()];
                console.log(`[TiageState] Geschlecht secondary normalisiert: '${old}' → '${result.secondary}'`);
            }
            return result;
        }

        return value;
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
            // Normalisiere Geschlechts-Werte für Konsistenz mit ProfileModifiers
            const normalizedValue = normalizeGeschlechtValue(path, value);

            const oldValue = deepClone(getByPath(state, path));
            setByPath(state, path, deepClone(normalizedValue));
            notify(path, normalizedValue, oldValue);
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
         * Set primary dominanz
         * @param {string} person - 'ich' or 'partner'
         * @param {string|null} value - 'dominant', 'submissiv', 'switch', 'ausgeglichen' or null
         */
        setDominanz(person, value) {
            this.set(`personDimensions.${person}.dominanz.primary`, value);
        },

        /**
         * Set secondary dominanz
         * @param {string} person - 'ich' or 'partner'
         * @param {string|null} value - 'dominant', 'submissiv', 'switch', 'ausgeglichen' or null
         */
        setSecondaryDominanz(person, value) {
            const primary = this.get(`personDimensions.${person}.dominanz.primary`);
            if (value === primary) {
                console.warn('[TiageState] Secondary dominanz cannot be same as primary');
                return;
            }
            this.set(`personDimensions.${person}.dominanz.secondary`, value);
        },

        /**
         * Set primary orientierung
         * @param {string} person - 'ich' or 'partner'
         * @param {string|null} value - 'heterosexuell', 'homosexuell', 'bisexuell' or null
         */
        setOrientierung(person, value) {
            this.set(`personDimensions.${person}.orientierung.primary`, value);
        },

        /**
         * Set secondary orientierung
         * @param {string} person - 'ich' or 'partner'
         * @param {string|null} value - 'heterosexuell', 'homosexuell', 'bisexuell' or null
         */
        setSecondaryOrientierung(person, value) {
            const primary = this.get(`personDimensions.${person}.orientierung.primary`);
            if (value === primary) {
                console.warn('[TiageState] Secondary orientierung cannot be same as primary');
                return;
            }
            this.set(`personDimensions.${person}.orientierung.secondary`, value);
        },

        /**
         * Get the primary dominanz
         */
        getPrimaryDominanz(person) {
            return this.get(`personDimensions.${person}.dominanz.primary`);
        },

        /**
         * Get the secondary dominanz
         */
        getSecondaryDominanz(person) {
            return this.get(`personDimensions.${person}.dominanz.secondary`);
        },

        /**
         * Get the primary orientierung
         */
        getPrimaryOrientierung(person) {
            return this.get(`personDimensions.${person}.orientierung.primary`);
        },

        /**
         * Get the secondary orientierung
         */
        getSecondaryOrientierung(person) {
            return this.get(`personDimensions.${person}.orientierung.secondary`);
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
        // GEWICHTUNGEN METHODS
        // ═══════════════════════════════════════════════════════════════════

        /**
         * Get all Gewichtungen for a person
         * @param {string} person - 'ich' or 'partner'
         * @returns {Object} { O, A, D, G } mit value und locked
         */
        getGewichtungen(person) {
            return this.get(`gewichtungen.${person}`);
        },

        /**
         * Set a single Gewichtung
         * @param {string} person - 'ich' or 'partner'
         * @param {string} key - 'O', 'A', 'D', or 'G'
         * @param {number} value - 0-100
         * @param {boolean} locked - Whether the value is locked
         */
        setGewichtung(person, key, value, locked = false) {
            this.set(`gewichtungen.${person}.${key}`, { value, locked });
        },

        /**
         * Set all Gewichtungen at once
         * @param {string} person - 'ich' or 'partner'
         * @param {Object} gewichtungen - { O, A, D, G }
         */
        setGewichtungen(person, gewichtungen) {
            this.set(`gewichtungen.${person}`, gewichtungen);
        },

        // ═══════════════════════════════════════════════════════════════════
        // RESONANZFAKTOREN METHODS
        // ═══════════════════════════════════════════════════════════════════

        /**
         * Get all Resonanzfaktoren for a person
         * @param {string} person - 'ich' or 'partner'
         * @returns {Object} { R1, R2, R3, R4 } mit value und locked
         */
        getResonanzFaktoren(person) {
            return this.get(`resonanzFaktoren.${person}`);
        },

        /**
         * Set a single Resonanzfaktor
         * @param {string} person - 'ich' or 'partner'
         * @param {string} key - 'R1', 'R2', 'R3', or 'R4'
         * @param {number} value - 0-1 (v3.2: quadratisch, keine künstlichen Grenzen)
         * @param {boolean} locked - Whether the value is locked
         */
        setResonanzFaktor(person, key, value, locked = false) {
            // v3.2: Clamp auf 0-1 (R = similarity²)
            const clampedValue = Math.min(1, Math.max(0, value));
            this.set(`resonanzFaktoren.${person}.${key}`, { value: clampedValue, locked });
        },

        /**
         * Set all Resonanzfaktoren at once
         * v3.2: Clamps all values to 0-1 range
         * @param {string} person - 'ich' or 'partner'
         * @param {Object} faktoren - { R1, R2, R3, R4 }
         */
        setResonanzFaktoren(person, faktoren) {
            // v3.2: Clamp alle Werte auf 0-1
            const clamped = this._clampResonanzFaktoren(faktoren);
            this.set(`resonanzFaktoren.${person}`, clamped);
        },

        /**
         * Clamps Resonanzfaktoren values to 0-1 range
         * v3.2: Migration von 0.5-1.5 zu 0-1 Range
         * @private
         * @param {Object} faktoren - { R1, R2, R3, R4 } oder { ich: {...}, partner: {...} }
         * @returns {Object} Clamped faktoren
         */
        _clampResonanzFaktoren(faktoren) {
            if (!faktoren) return faktoren;

            const clampValue = (v) => Math.min(1, Math.max(0, v));

            // Prüfe ob es ein verschachteltes Objekt ist (ich/partner)
            if (faktoren.ich || faktoren.partner) {
                const result = {};
                for (const person of ['ich', 'partner']) {
                    if (faktoren[person]) {
                        result[person] = {};
                        for (const key of ['R1', 'R2', 'R3', 'R4']) {
                            if (faktoren[person][key]) {
                                const entry = faktoren[person][key];
                                result[person][key] = {
                                    value: clampValue(entry.value ?? entry ?? 1.0),
                                    locked: entry.locked ?? false
                                };
                            }
                        }
                    }
                }
                return result;
            }

            // Einfaches Objekt { R1, R2, R3, R4 }
            const result = {};
            for (const key of ['R1', 'R2', 'R3', 'R4']) {
                if (faktoren[key] !== undefined) {
                    const entry = faktoren[key];
                    if (typeof entry === 'object' && entry !== null) {
                        result[key] = {
                            value: clampValue(entry.value ?? 1.0),
                            locked: entry.locked ?? false
                        };
                    } else {
                        result[key] = {
                            value: clampValue(entry ?? 1.0),
                            locked: false
                        };
                    }
                }
            }
            return result;
        },

        // ═══════════════════════════════════════════════════════════════════
        // FLAT NEEDS METHODS
        // ═══════════════════════════════════════════════════════════════════

        /**
         * Get all flatNeeds for a person
         * @param {string} person - 'ich' or 'partner'
         * @returns {Object} { '#B1': value, '#B2': value, ... }
         */
        getFlatNeeds(person) {
            return this.get(`flatNeeds.${person}`);
        },

        /**
         * Set all flatNeeds for a person
         * @param {string} person - 'ich' or 'partner'
         * @param {Object} needs - { '#B1': value, ... }
         */
        setFlatNeeds(person, needs) {
            this.set(`flatNeeds.${person}`, needs);
        },

        /**
         * Get a single need value
         * @param {string} person - 'ich' or 'partner'
         * @param {string} needId - e.g. '#B1'
         * @returns {number} 0-100
         */
        getNeed(person, needId) {
            return this.get(`flatNeeds.${person}.${needId}`);
        },

        /**
         * Set a single need value
         * @param {string} person - 'ich' or 'partner'
         * @param {string} needId - e.g. '#B1'
         * @param {number} value - 0-100
         */
        setNeed(person, needId, value) {
            const clampedValue = Math.min(100, Math.max(0, value));
            this.set(`flatNeeds.${person}.${needId}`, clampedValue);
        },

        // ═══════════════════════════════════════════════════════════════════
        // PROFILE REVIEW METHODS (Survey Overrides)
        // ═══════════════════════════════════════════════════════════════════

        /**
         * Get all locked (survey-overridden) needs for a person
         * @param {string} person - 'ich' or 'partner'
         * @returns {Object} { '#B15': value, ... }
         */
        getLockedNeeds(person) {
            return this.get(`profileReview.${person}.lockedNeeds`);
        },

        /**
         * Lock a need value (from survey)
         * @param {string} person - 'ich' or 'partner'
         * @param {string} needId - e.g. '#B15'
         * @param {number} value - 0-100
         */
        lockNeed(person, needId, value) {
            const clampedValue = Math.min(100, Math.max(0, value));
            this.set(`profileReview.${person}.lockedNeeds.${needId}`, clampedValue);
        },

        /**
         * Unlock a need (remove survey override)
         * @param {string} person - 'ich' or 'partner'
         * @param {string} needId - e.g. '#B15'
         */
        unlockNeed(person, needId) {
            const current = this.get(`profileReview.${person}.lockedNeeds`) || {};
            delete current[needId];
            this.set(`profileReview.${person}.lockedNeeds`, current);
        },

        /**
         * Check if a need is locked
         * @param {string} person - 'ich' or 'partner'
         * @param {string} needId - e.g. '#B15'
         * @returns {boolean}
         */
        isNeedLocked(person, needId) {
            const locked = this.get(`profileReview.${person}.lockedNeeds.${needId}`);
            return locked !== undefined && locked !== null;
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
                    dominanz: { primary: null, secondary: null },
                    orientierung: { primary: null, secondary: null }
                },
                partner: {
                    geschlecht: { primary: null, secondary: null },
                    dominanz: { primary: null, secondary: null },
                    orientierung: { primary: null, secondary: null }
                }
            });
            this.set('archetypes', {
                ich: { primary: 'single', secondary: null },
                partner: { primary: 'duo', secondary: null }
            });
            this.set('ui', {
                currentView: 'desktop',
                currentMobilePage: 1,
                activeModal: null,
                selectedCategory: null,
                matchModalView: 'pathos',
                syntheseType: 'score',
                selection: null,
                language: 'de'
            });
            this.set('profileStatus', {
                ich: { loadedSlot: null, isDirty: false },
                partner: { loadedSlot: null, isDirty: false }
            });
            // Reset neue Felder
            this.set('gewichtungen', {
                ich: {
                    O: { value: 25, locked: false },
                    A: { value: 25, locked: false },
                    D: { value: 25, locked: false },
                    G: { value: 25, locked: false },
                    summeLock: { enabled: true, target: 100 }
                },
                partner: {
                    O: { value: 25, locked: false },
                    A: { value: 25, locked: false },
                    D: { value: 25, locked: false },
                    G: { value: 25, locked: false },
                    summeLock: { enabled: true, target: 100 }
                }
            });
            this.set('resonanzFaktoren', {
                ich: {
                    R1: { value: 1.0, locked: false },
                    R2: { value: 1.0, locked: false },
                    R3: { value: 1.0, locked: false },
                    R4: { value: 1.0, locked: false }
                },
                partner: {
                    R1: { value: 1.0, locked: false },
                    R2: { value: 1.0, locked: false },
                    R3: { value: 1.0, locked: false },
                    R4: { value: 1.0, locked: false }
                }
            });
            this.set('flatNeeds', { ich: {}, partner: {} });
            this.set('profileReview', {
                ich: { lockedNeeds: {} },
                partner: { lockedNeeds: {} }
            });
        },

        /**
         * Initialize TiageState - loads from storage
         * Returns a Promise for async compatibility
         * @returns {Promise<void>}
         */
        async init() {
            this.loadFromStorage();
            return Promise.resolve();
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
                        // FIX: Setze Archetypen einzeln, damit Child-Subscriber (archetypes.ich, archetypes.partner)
                        // getriggert werden und flatNeeds neu berechnet werden
                        if (parsed.archetypes.ich?.primary) {
                            this.set('archetypes.ich.primary', parsed.archetypes.ich.primary);
                        }
                        if (parsed.archetypes.ich?.secondary) {
                            this.set('archetypes.ich.secondary', parsed.archetypes.ich.secondary);
                        }
                        if (parsed.archetypes.partner?.primary) {
                            this.set('archetypes.partner.primary', parsed.archetypes.partner.primary);
                        }
                        if (parsed.archetypes.partner?.secondary) {
                            this.set('archetypes.partner.secondary', parsed.archetypes.partner.secondary);
                        }
                    }
                    // Neue Felder laden
                    if (parsed.gewichtungen) {
                        console.log('[TiageState] loadFromStorage - gewichtungen gefunden:', JSON.stringify(parsed.gewichtungen));
                        this.set('gewichtungen', parsed.gewichtungen);
                    } else {
                        console.log('[TiageState] loadFromStorage - KEINE gewichtungen in localStorage!');
                    }
                    if (parsed.resonanzFaktoren) {
                        // v3.2: Clamp alte 0.5-1.5 Werte auf neuen 0-1 Range
                        const clamped = this._clampResonanzFaktoren(parsed.resonanzFaktoren);
                        console.log('[TiageState] loadFromStorage - resonanzFaktoren gefunden (clamped):', JSON.stringify(clamped));
                        this.set('resonanzFaktoren', clamped);
                    } else {
                        console.log('[TiageState] loadFromStorage - KEINE resonanzFaktoren in localStorage!');
                    }
                    if (parsed.profileReview) {
                        this.set('profileReview', parsed.profileReview);
                    }
                    // Bindungsmuster laden
                    if (parsed.bindungsmuster) {
                        this.set('bindungsmuster', parsed.bindungsmuster);
                        console.log('[TiageState] loadFromStorage - bindungsmuster geladen:', JSON.stringify(parsed.bindungsmuster));
                    }
                    // UI Settings laden
                    if (parsed.ui) {
                        if (parsed.ui.matchModalView) {
                            this.set('ui.matchModalView', parsed.ui.matchModalView);
                        }
                        if (parsed.ui.syntheseType) {
                            this.set('ui.syntheseType', parsed.ui.syntheseType);
                        }
                        if (parsed.ui.selection) {
                            this.set('ui.selection', parsed.ui.selection);
                        }
                        if (parsed.ui.language) {
                            this.set('ui.language', parsed.ui.language);
                        }
                    }
                    console.log('[TiageState] State aus localStorage geladen');
                }

                // Migration: Alte localStorage-Keys zu TiageState
                const oldMatchView = localStorage.getItem('matchModalView');
                if (oldMatchView && !this.get('ui.matchModalView')) {
                    this.set('ui.matchModalView', oldMatchView);
                    localStorage.removeItem('matchModalView');
                    console.log('[TiageState] Migriert: matchModalView');
                }
                const oldSyntheseType = localStorage.getItem('tiageSyntheseType');
                if (oldSyntheseType && !this.get('ui.syntheseType')) {
                    this.set('ui.syntheseType', oldSyntheseType);
                    localStorage.removeItem('tiageSyntheseType');
                    localStorage.removeItem('pathosLogosType'); // Legacy key
                    console.log('[TiageState] Migriert: tiageSyntheseType');
                }
                const oldSelection = localStorage.getItem('tiage-selection');
                if (oldSelection) {
                    try {
                        const parsed = JSON.parse(oldSelection);
                        if (!this.get('ui.selection')) {
                            this.set('ui.selection', parsed);
                        }
                        localStorage.removeItem('tiage-selection');
                        console.log('[TiageState] Migriert: tiage-selection');
                    } catch (e) { /* ignore */ }
                }
                // Migriere Sprach-Einstellung
                const oldLanguage = localStorage.getItem('tiage_language');
                if (oldLanguage && ['de', 'en'].includes(oldLanguage)) {
                    if (this.get('ui.language') === 'de') { // Nur wenn noch default
                        this.set('ui.language', oldLanguage);
                    }
                    localStorage.removeItem('tiage_language');
                    console.log('[TiageState] Migriert: tiage_language');
                }
            } catch (e) {
                console.warn('[TiageState] Failed to load from storage:', e);
            }
        },

        /**
         * Save state to localStorage
         * Speichert alle persistenten Daten zentral
         */
        saveToStorage() {
            try {
                const gewichtungen = this.get('gewichtungen');
                console.log('[TiageState] saveToStorage - gewichtungen:', JSON.stringify(gewichtungen));

                const toSave = {
                    personDimensions: this.get('personDimensions'),
                    archetypes: this.get('archetypes'),
                    // Neue Felder - zentral speichern
                    gewichtungen: gewichtungen,
                    resonanzFaktoren: this.get('resonanzFaktoren'),
                    profileReview: this.get('profileReview'),
                    // Bindungsmuster für Slot Machine Tie-Breaker
                    bindungsmuster: this.get('bindungsmuster'),
                    // UI Settings - persistente Einstellungen
                    ui: {
                        matchModalView: this.get('ui.matchModalView'),
                        syntheseType: this.get('ui.syntheseType'),
                        selection: this.get('ui.selection'),
                        language: this.get('ui.language')
                    }
                    // flatNeeds werden NICHT gespeichert - sie werden aus Inputs berechnet
                };
                localStorage.setItem('tiage_state', JSON.stringify(toSave));
                console.log('[TiageState] State gespeichert - tiage_state key');
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

// ═══════════════════════════════════════════════════════════════════════════
// PROXY-LAYER: Legacy-Kompatibilität für window.personDimensions
// ═══════════════════════════════════════════════════════════════════════════
//
// Dieser Proxy leitet alle Zugriffe auf window.personDimensions an TiageState weiter.
// Legacy-Code funktioniert weiter, aber nutzt automatisch TiageState als Single Source of Truth.
//
// Beispiel:
//   window.personDimensions.ich.geschlecht.primary = 'mann'
//   → TiageState.set('personDimensions.ich.geschlecht.primary', 'mann')
//
// © 2025 Ti-age.de - Phase 1: Proxy-Layer Migration
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Erstellt einen rekursiven Proxy für verschachtelte Objekte
 * @param {string} basePath - Der Pfad im TiageState (z.B. 'personDimensions.ich')
 * @returns {Proxy} Ein Proxy-Objekt das auf TiageState mappt
 */
function createTiageStateProxy(basePath) {
    return new Proxy({}, {
        get(target, prop) {
            // Symbol-Properties und interne Props ignorieren
            if (typeof prop === 'symbol' || prop === 'toJSON' || prop === 'valueOf' || prop === 'toString') {
                return undefined;
            }

            const fullPath = basePath ? `${basePath}.${prop}` : prop;
            const value = TiageState.get(fullPath);

            // Wenn der Wert ein Objekt ist, erstelle einen verschachtelten Proxy
            if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
                return createTiageStateProxy(fullPath);
            }

            return value;
        },

        set(target, prop, value) {
            const fullPath = basePath ? `${basePath}.${prop}` : prop;
            TiageState.set(fullPath, value);
            return true;
        },

        // Ermöglicht "key in obj" Checks
        has(target, prop) {
            const fullPath = basePath ? `${basePath}.${prop}` : prop;
            return TiageState.get(fullPath) !== undefined;
        },

        // Ermöglicht Object.keys() und for...in
        ownKeys(target) {
            const value = TiageState.get(basePath);
            if (value && typeof value === 'object') {
                return Object.keys(value);
            }
            return [];
        },

        // Notwendig für Object.keys() - muss konfigurierbar und aufzählbar sein
        getOwnPropertyDescriptor(target, prop) {
            const fullPath = basePath ? `${basePath}.${prop}` : prop;
            const value = TiageState.get(fullPath);
            if (value !== undefined) {
                return {
                    value: value,
                    writable: true,
                    enumerable: true,
                    configurable: true
                };
            }
            return undefined;
        }
    });
}

// Erstelle den globalen Proxy für window.personDimensions
if (typeof window !== 'undefined') {
    /**
     * window.personDimensions - Proxy zu TiageState
     *
     * LEGACY-KOMPATIBILITÄT:
     * Dieser Proxy ersetzt die alte personDimensions Variable.
     * Alle Lese- und Schreibzugriffe werden an TiageState weitergeleitet.
     *
     * VERWENDUNG (unverändert):
     *   window.personDimensions.ich.geschlecht.primary = 'mann';
     *   const geschlecht = window.personDimensions.ich.geschlecht.primary;
     *
     * INTERN wird das zu:
     *   TiageState.set('personDimensions.ich.geschlecht.primary', 'mann');
     *   TiageState.get('personDimensions.ich.geschlecht.primary');
     */
    window.personDimensions = createTiageStateProxy('personDimensions');

    /**
     * window.mobilePersonDimensions - Verweist auf denselben Proxy
     *
     * HINWEIS: Mobile und Desktop teilen sich jetzt denselben State.
     * Das ist korrekt, da TiageState die Single Source of Truth ist.
     */
    window.mobilePersonDimensions = window.personDimensions;

    console.log('[TiageState] Proxy-Layer aktiviert: window.personDimensions → TiageState');
}

// ═══════════════════════════════════════════════════════════════════════════
// AUTO-SYNC: Automatische Server-Synchronisation bei State-Änderungen
// ═══════════════════════════════════════════════════════════════════════════
//
// Strategie: Debounced Sync (500ms) bei jeder State-Änderung
// Bei Server-Fehler: Toast "Kein Kontakt zum Server"
// Last-Write-Wins: Neuerer Timestamp gewinnt
//
// © 2025 Ti-age.de Alle Rechte vorbehalten.
// ═══════════════════════════════════════════════════════════════════════════

const TiageAutoSync = (function() {
    'use strict';

    // Konfiguration
    const DEBOUNCE_MS = 500;  // 500ms Debounce
    const STORAGE_KEY_LAST_SYNC = 'tiage_last_sync';

    // State
    let debounceTimer = null;
    let isInitialized = false;
    let isSyncing = false;

    /**
     * Zeigt eine Toast-Benachrichtigung an
     * @param {string} message - Nachricht
     * @param {string} type - 'success', 'error', 'warning'
     */
    function showToast(message, type = 'info') {
        // Nutze existierende Toast-Funktion falls vorhanden
        if (typeof showMemoryToast === 'function') {
            showMemoryToast(message, type);
            return;
        }

        // Fallback: Eigene Toast-Implementierung
        const existing = document.querySelector('.tiage-sync-toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = `tiage-sync-toast ${type}`;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 12px 20px;
            border-radius: 8px;
            color: white;
            font-size: 14px;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            background: ${type === 'error' ? '#e74c3c' : type === 'warning' ? '#f39c12' : '#27ae60'};
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.style.opacity = '1';
        });

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    /**
     * Holt den letzten Sync-Zeitpunkt aus localStorage
     * @returns {string|null} ISO-Timestamp oder null
     */
    function getLastSyncAt() {
        try {
            return localStorage.getItem(STORAGE_KEY_LAST_SYNC);
        } catch (e) {
            return null;
        }
    }

    /**
     * Speichert den letzten Sync-Zeitpunkt in localStorage
     * @param {string} timestamp - ISO-Timestamp
     */
    function setLastSyncAt(timestamp) {
        try {
            localStorage.setItem(STORAGE_KEY_LAST_SYNC, timestamp);
        } catch (e) {
            console.warn('[TiageAutoSync] Konnte lastSyncAt nicht speichern:', e);
        }
    }

    /**
     * Wendet Server-Änderungen auf den lokalen State an
     * @param {Object} changes - { ich: {...}, partner: {...} }
     */
    function applyServerChanges(changes) {
        if (!changes) return;

        console.log('[TiageAutoSync] Wende Server-Änderungen an:', Object.keys(changes));

        ['ich', 'partner'].forEach(person => {
            const profile = changes[person];
            if (!profile) return;

            // Archetyp
            if (profile.archetyp) {
                TiageState.set(`archetypes.${person}.primary`, profile.archetyp);
            }

            // PersonDimensions
            if (profile.geschlecht) {
                TiageState.set(`personDimensions.${person}.geschlecht`, profile.geschlecht);
            }
            if (profile.dominanz) {
                TiageState.set(`personDimensions.${person}.dominanz`, profile.dominanz);
            }
            if (profile.orientierung) {
                TiageState.set(`personDimensions.${person}.orientierung`, profile.orientierung);
            }

            // Gewichtungen
            if (profile.gewichtungen) {
                // Ensure summeLock is preserved or set to default
                if (!profile.gewichtungen.summeLock) {
                    profile.gewichtungen.summeLock = { enabled: true, target: 100 };
                }
                TiageState.set(`gewichtungen.${person}`, profile.gewichtungen);
            }

            // Resonanzfaktoren (v3.2: mit Clamping)
            if (profile.resonanzFaktoren) {
                TiageState.setResonanzFaktoren(person, profile.resonanzFaktoren);
            }

            // FlatNeeds
            if (profile.needs && Object.keys(profile.needs).length > 0) {
                TiageState.set(`flatNeeds.${person}`, profile.needs);
            }

            // LockedNeeds
            if (profile.lockedNeeds && Object.keys(profile.lockedNeeds).length > 0) {
                TiageState.set(`profileReview.${person}.lockedNeeds`, profile.lockedNeeds);
            }
        });

        // UI aktualisieren
        if (typeof window.updateAll === 'function') {
            window.updateAll();
        }

        // GewichtungCard UI aktualisieren falls vorhanden
        if (typeof GewichtungCard !== 'undefined' && GewichtungCard.loadIntoUI) {
            GewichtungCard.loadIntoUI();
            console.log('[TiageAutoSync] GewichtungCard UI aktualisiert');
        }

        // ResonanzCard UI aktualisieren falls vorhanden
        if (typeof ResonanzCard !== 'undefined' && ResonanzCard.initializeUI) {
            const currentPerson = typeof currentProfileReviewContext !== 'undefined'
                ? currentProfileReviewContext.person
                : 'ich';
            ResonanzCard.initializeUI(currentPerson);
            console.log('[TiageAutoSync] ResonanzCard UI aktualisiert');
        }

        showToast('Server-Daten synchronisiert', 'success');
    }

    /**
     * Führt die Synchronisation mit dem Server durch
     */
    async function performSync() {
        if (isSyncing) {
            console.log('[TiageAutoSync] Sync bereits aktiv, überspringe');
            return;
        }

        if (typeof TiageAPIClient === 'undefined') {
            console.debug('[TiageAutoSync] TiageAPIClient nicht verfügbar');
            return;
        }

        isSyncing = true;

        try {
            const state = TiageState.get();
            const lastSyncAt = getLastSyncAt();
            const clientTimestamp = new Date().toISOString();

            console.log('[TiageAutoSync] Starte Sync...', { lastSyncAt });

            const response = await TiageAPIClient.syncState({
                state,
                lastSyncAt,
                clientTimestamp
            });

            if (response && response.success !== false) {
                const result = response.result || response;

                // Speichere neuen Sync-Zeitpunkt
                if (result.serverTime) {
                    setLastSyncAt(result.serverTime);
                }

                // Prüfe auf Server-Änderungen
                if (result.action === 'server_wins' && result.changes) {
                    console.log('[TiageAutoSync] Server hat neuere Daten');
                    applyServerChanges(result.changes);
                } else if (result.action === 'client_wins') {
                    console.log('[TiageAutoSync] Client-Daten gespeichert');
                } else if (result.action === 'no_server_data') {
                    console.log('[TiageAutoSync] Erste Synchronisation');
                }
            }
        } catch (error) {
            console.error('[TiageAutoSync] Sync fehlgeschlagen:', error);
            showToast('Kein Kontakt zum Server', 'error');
        } finally {
            isSyncing = false;
        }
    }

    /**
     * Debounced Sync-Trigger
     * Wird bei jeder State-Änderung aufgerufen
     */
    function triggerSync() {
        // Vorherigen Timer abbrechen
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }

        // Neuen Timer starten
        debounceTimer = setTimeout(() => {
            performSync();
        }, DEBOUNCE_MS);
    }

    /**
     * Initialisiert den Auto-Sync
     * Registriert Wildcard-Subscriber auf TiageState
     */
    function init() {
        if (isInitialized) {
            console.log('[TiageAutoSync] Bereits initialisiert');
            return;
        }

        if (typeof TiageState === 'undefined') {
            console.warn('[TiageAutoSync] TiageState nicht verfügbar');
            return;
        }

        // Ohne API-Client keinen Sync starten
        if (typeof TiageAPIClient === 'undefined') {
            console.debug('[TiageAutoSync] Kein API-Client - Sync deaktiviert');
            return;
        }

        // Wildcard-Subscriber: Wird bei JEDER State-Änderung aufgerufen
        TiageState.subscribe('*', (event) => {
            // UI-Änderungen nicht synchronisieren (nur Daten-State)
            if (event.path.startsWith('ui.')) {
                return;
            }

            // Debounced Sync triggern
            triggerSync();
        });

        // Initialen Sync beim App-Start
        setTimeout(() => {
            console.log('[TiageAutoSync] Initialer Sync...');
            performSync();
        }, 1000);  // 1 Sekunde warten bis App geladen

        isInitialized = true;
        console.log('[TiageAutoSync] Initialisiert mit Debounce:', DEBOUNCE_MS, 'ms');
    }

    // Public API
    return {
        init,
        triggerSync,
        performSync,
        getLastSyncAt,
        isInitialized: () => isInitialized,
        isSyncing: () => isSyncing
    };
})();

// Auto-Init wenn DOM geladen
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            TiageAutoSync.init();
        });
    } else {
        // DOM bereits geladen
        TiageAutoSync.init();
    }
}

// Export for ES6 modules (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TiageState, TiageAutoSync };
}
