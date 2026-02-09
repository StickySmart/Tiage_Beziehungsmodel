/**
 * STATE MANAGEMENT - Single Source of Truth (SSOT v2.0)
 *
 * Zentraler State-Store mit Pub/Sub Pattern für reaktive Updates.
 * Ersetzt die doppelte personDimensions/mobilePersonDimensions Struktur.
 *
 * SSOT v2.0 ARCHITEKTUR:
 * - ICH-Bedürfnisse: Pro Archetyp gespeichert (8 Slots), User-editierbar
 * - Partner-Bedürfnisse: Ein Slot, dynamisch berechnet aus Archetyp + AGOD, NICHT editierbar
 * - Reibungs-Logik: Keine harten K.O.-Kriterien, nur graduelle Reibung (0-100%)
 * - RTI 5 Säulen: Dimensionen werden auf Identitäts-Säulen gemappt (S1-S5)
 *
 * NAMING CONVENTION (siehe docs/NAMING_CONVENTION.md):
 * - personDimensions: Meta-Eigenschaften die beschreiben "Wer ich bin"
 *   • geschlecht: 'mann', 'frau', 'nonbinaer'
 *   • dominanz: dominant/submissiv/switch/ausgeglichen
 *   • orientierung: Multi-Select Array ['heterosexuell', 'bisexuell', ...]
 * - Diese modifizieren die baseAttributes (30 Profil-Parameter)
 * - NICHT VERWECHSELN mit: baseAttributes (Matching), needs (GFK)
 *
 * © 2025-2026 Ti-age.de Alle Rechte vorbehalten.
 */

const TiageState = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // PRIVATE STATE
    // ═══════════════════════════════════════════════════════════════════════

    // FIX v1.8.687: Flag um Race Conditions beim Laden zu verhindern
    // Während loadFromStorage() läuft, sollten Subscriber keine Neuberechnungen triggern
    let isLoadingFromStorage = false;

    // FIX v1.8.691: Flag um doppeltes Laden zu verhindern
    // TiageState.init() wird automatisch beim DOMContentLoaded aufgerufen
    // Weitere Aufrufe sind harmlos (werden ignoriert)
    let isInitialized = false;

    const state = {
        // Person Dimensions - SINGLE SOURCE OF TRUTH
        // Data Structure v4.0:
        // - geschlecht: string ('mann', 'frau', 'nonbinaer') - vereinfacht, kein primary/secondary mehr
        // - dominanz: { primary, secondary } - unverändert
        // - orientierung: string[] (Multi-Select Array) - z.B. ['heterosexuell', 'bisexuell']
        personDimensions: {
            ich: {
                geschlecht: null,     // v4.0: String - 'mann', 'frau', 'nonbinaer'
                dominanz: {
                    primary: null,    // 'dominant', 'submissiv', 'switch', 'ausgeglichen'
                    secondary: null   // Optional zweite Präferenz
                },
                orientierung: []      // v4.0: Multi-Select Array - ['heterosexuell', 'gay_lesbisch', ...]
            },
            partner: {
                geschlecht: null,
                dominanz: {
                    primary: null,
                    secondary: null
                },
                orientierung: []
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
        // v4.5: NEW 3-way format: 0 = Egal, 1 = Normal, 2 = Wichtig
        // Diese beeinflussen wie stark die 4 Dimensionen ins Matching einfließen.
        gewichtungen: {
            ich: {
                O: 1,  // Orientierung: 0=Egal, 1=Normal, 2=Wichtig
                A: 1,  // Archetyp: 0=Egal, 1=Normal, 2=Wichtig
                D: 1,  // Dominanz: 0=Egal, 1=Normal, 2=Wichtig
                G: 1   // Geschlecht: 0=Egal, 1=Normal, 2=Wichtig
            },
            partner: {
                O: 1,
                A: 1,
                D: 1,
                G: 1
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
        // ICH: Pro Archetyp gespeichert (8 Slots) - User kann seine Vorstellung jedes Archetyps abbilden
        // PARTNER: Ein Slot (dynamisch berechnet aus Archetyp + AGOD, nicht manuell editierbar)
        // Keys sind Bedürfnis-IDs wie '#B1', '#B2', etc.
        // Werte: 0-100
        flatNeeds: {
            ich: {
                // 8 Archetyp-Slots für ICH - User-Anpassungen werden pro Archetyp gespeichert
                single: {},
                duo: {},
                'duo-flex': {},
                solopoly: {},
                polyamor: {},
                ra: {},
                lat: {},
                aromantisch: {}
            },
            partner: {}  // Bleibt flach - wird dynamisch berechnet, nicht manuell editierbar
        },

        // ═══════════════════════════════════════════════════════════════════════
        // PROFILE REVIEW - Survey-Overrides für einzelne Bedürfnisse
        // ═══════════════════════════════════════════════════════════════════════
        // Wenn User im Survey einzelne Bedürfnisse manuell setzt, werden sie hier gespeichert.
        // Diese überschreiben die berechneten flatNeeds.
        // ICH: Pro Archetyp gespeichert (8 Slots)
        // PARTNER: Nicht mehr verwendet (keine manuellen Overrides)
        profileReview: {
            ich: {
                // 8 Archetyp-Slots für lockedNeeds
                single: {},
                duo: {},
                'duo-flex': {},
                solopoly: {},
                polyamor: {},
                ra: {},
                lat: {},
                aromantisch: {}
            },
            partner: {
                lockedNeeds: {}  // Legacy - wird nicht mehr verwendet
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
        'flatNeeds.ich.single': [],
        'flatNeeds.ich.duo': [],
        'flatNeeds.ich.duo-flex': [],
        'flatNeeds.ich.solopoly': [],
        'flatNeeds.ich.polyamor': [],
        'flatNeeds.ich.ra': [],
        'flatNeeds.ich.lat': [],
        'flatNeeds.ich.aromantisch': [],
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
    // GESCHLECHT NORMALISIERUNG (v4.0)
    // ═══════════════════════════════════════════════════════════════════════
    //
    // v4.0: Geschlecht ist jetzt ein einfacher String ('mann', 'frau', 'nonbinaer')
    // Konvertiert alte Formate und alternative Werte.
    //
    // MAPPING:
    //   'divers'/'inter' → 'nonbinaer' (v4.0: Inter wird zu Nonbinär)
    //   Altes { primary, secondary } Format → String (primary wird verwendet)
    // ═══════════════════════════════════════════════════════════════════════

    const GESCHLECHT_NORMALIZE_MAP = {
        'divers': 'nonbinaer',
        'diverse': 'nonbinaer',
        'inter': 'nonbinaer',
        'intersex': 'nonbinaer',
        'd': 'nonbinaer',
        'nb': 'nonbinaer',
        'non-binary': 'nonbinaer',
        'non-binär': 'nonbinaer',
        'nonbinär': 'nonbinaer'
    };

    /**
     * Normalisiert Geschlechts-Werte für v4.0
     * @param {string} path - Der State-Pfad
     * @param {*} value - Der zu setzende Wert
     * @returns {*} Der normalisierte Wert
     */
    function normalizeGeschlechtValue(path, value) {
        if (value === null || value === undefined) return value;

        // Prüfe ob es ein Geschlechts-Pfad ist
        if (!path.includes('.geschlecht')) return value;

        // v4.0: Konvertiere altes { primary, secondary } Format zu String
        if (typeof value === 'object' && value !== null) {
            // Extrahiere den effektiven Wert aus dem alten Format
            let effectiveValue = value.primary;

            // Bei Trans: Identität basierend auf primary+secondary berechnen
            if (value.secondary === 'trans') {
                // Trans-Mann (Körper Frau → Identität Mann) oder Trans-Frau (Körper Mann → Identität Frau)
                if (value.primary === 'mann') effectiveValue = 'frau';
                else if (value.primary === 'frau') effectiveValue = 'mann';
            } else if (value.secondary === 'nonbinaer' || value.secondary === 'fluid') {
                effectiveValue = 'nonbinaer';
            }
            // Bei Cis: primary bleibt primary

            console.log(`[TiageState] v4.0 Migration: { primary: '${value.primary}', secondary: '${value.secondary}' } → '${effectiveValue}'`);
            value = effectiveValue;
        }

        // String-Normalisierung
        if (typeof value === 'string') {
            const lower = value.toLowerCase();
            const normalized = GESCHLECHT_NORMALIZE_MAP[lower];
            if (normalized) {
                console.log(`[TiageState] Geschlecht normalisiert: '${value}' → '${normalized}'`);
                return normalized;
            }
        }

        return value;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // ORIENTIERUNG NORMALISIERUNG (v4.0)
    // ═══════════════════════════════════════════════════════════════════════
    //
    // v4.0: Orientierung ist jetzt ein Array (Multi-Select)
    // Konvertiert alte Formate zu Array.
    // ═══════════════════════════════════════════════════════════════════════

    // v5.0 SSOT: Holt Migration-Map aus TiageSynthesis.Constants
    // Fallback auf lokale Map falls SSOT noch nicht geladen
    function getOrientierungMigrateMap() {
        if (typeof TiageSynthesis !== 'undefined' &&
            TiageSynthesis.Constants &&
            TiageSynthesis.Constants.ORIENTIERUNG_OPTIONS &&
            TiageSynthesis.Constants.ORIENTIERUNG_OPTIONS.LEGACY_MIGRATION) {
            return TiageSynthesis.Constants.ORIENTIERUNG_OPTIONS.LEGACY_MIGRATION;
        }
        // Fallback (muss konsistent mit SSOT sein!)
        return {
            'bihomo': 'bisexuell',
            'gay_lesbisch': 'homosexuell',
            'pansexuell_queer': 'pansexuell'
        };
    }

    /**
     * Normalisiert Orientierungs-Werte für v4.0 Multi-Select
     * v5.0 SSOT: Verwendet getOrientierungMigrateMap() für Migration
     * @param {string} path - Der State-Pfad
     * @param {*} value - Der zu setzende Wert
     * @returns {*} Der normalisierte Wert (Array)
     */
    function normalizeOrientierungValue(path, value) {
        if (!path.includes('.orientierung')) return value;
        if (value === null || value === undefined) return [];

        const migrateMap = getOrientierungMigrateMap();

        // Bereits ein Array - Werte migrieren und Duplikate entfernen
        if (Array.isArray(value)) {
            const migrated = value.map(v => migrateMap[v] || v);
            return [...new Set(migrated)];  // Duplikate entfernen
        }

        // v4.0: Konvertiere altes { primary, secondary } Format zu Array
        if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            const result = [];
            if (value.primary) {
                const migrated = migrateMap[value.primary] || value.primary;
                result.push(migrated);
            }
            if (value.secondary && value.secondary !== value.primary) {
                const migrated = migrateMap[value.secondary] || value.secondary;
                if (!result.includes(migrated)) result.push(migrated);
            }
            console.log(`[TiageState] v5.0 Migration: { primary: '${value.primary}', secondary: '${value.secondary}' } → [${result.join(', ')}]`);
            return result;
        }

        // String zu Array konvertieren
        if (typeof value === 'string') {
            const migrated = migrateMap[value] || value;
            return [migrated];
        }

        return [];
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        /**
         * Get state value (returns a deep clone to prevent external mutation)
         * SMART-GETTER: Automatische Umleitung für flatNeeds.ich und profileReview.ich
         * - flatNeeds.ich → flatNeeds.ich.[currentArchetype]
         * - profileReview.ich → profileReview.ich.[currentArchetype]
         * Dies ermöglicht Abwärtskompatibilität mit bestehendem Code.
         * @param {string} path - Dot-notation path (e.g., 'personDimensions.ich.geschlecht')
         * @returns {*} The value at the path
         */
        get(path) {
            if (!path) return deepClone(state);

            // Smart-Getter für flatNeeds.ich - leitet auf aktuellen Archetyp-Slot um
            if (path === 'flatNeeds.ich' || path.startsWith('flatNeeds.ich.#B')) {
                const currentArchetype = getByPath(state, 'archetypes.ich.primary') || 'single';
                if (path === 'flatNeeds.ich') {
                    // flatNeeds.ich → flatNeeds.ich.[archetyp]
                    return deepClone(getByPath(state, `flatNeeds.ich.${currentArchetype}`)) || {};
                } else {
                    // flatNeeds.ich.#Bxx → flatNeeds.ich.[archetyp].#Bxx
                    const needId = path.replace('flatNeeds.ich.', '');
                    return deepClone(getByPath(state, `flatNeeds.ich.${currentArchetype}.${needId}`));
                }
            }

            // Smart-Getter für profileReview.ich.lockedNeeds - leitet auf aktuellen Archetyp-Slot um
            if (path === 'profileReview.ich.lockedNeeds' || path.startsWith('profileReview.ich.lockedNeeds.')) {
                const currentArchetype = getByPath(state, 'archetypes.ich.primary') || 'single';
                if (path === 'profileReview.ich.lockedNeeds') {
                    // profileReview.ich.lockedNeeds → profileReview.ich.[archetyp]
                    return deepClone(getByPath(state, `profileReview.ich.${currentArchetype}`)) || {};
                } else {
                    // profileReview.ich.lockedNeeds.#Bxx → profileReview.ich.[archetyp].#Bxx
                    const needId = path.replace('profileReview.ich.lockedNeeds.', '');
                    return deepClone(getByPath(state, `profileReview.ich.${currentArchetype}.${needId}`));
                }
            }

            return deepClone(getByPath(state, path));
        },

        /**
         * Set state value and notify subscribers
         * SMART-SETTER: Automatische Umleitung für flatNeeds.ich und profileReview.ich
         * - flatNeeds.ich → flatNeeds.ich.[currentArchetype]
         * - profileReview.ich.lockedNeeds → profileReview.ich.[currentArchetype]
         * Dies ermöglicht Abwärtskompatibilität mit bestehendem Code.
         * @param {string} path - Dot-notation path
         * @param {*} value - The new value
         */
        set(path, value) {
            // v4.0: Normalisiere Geschlechts- und Orientierungs-Werte
            let normalizedValue = normalizeGeschlechtValue(path, value);
            normalizedValue = normalizeOrientierungValue(path, normalizedValue);

            // Smart-Setter für flatNeeds.ich - leitet auf aktuellen Archetyp-Slot um
            let actualPath = path;
            if (path === 'flatNeeds.ich' || path.startsWith('flatNeeds.ich.#B')) {
                const currentArchetype = getByPath(state, 'archetypes.ich.primary') || 'single';
                if (path === 'flatNeeds.ich') {
                    actualPath = `flatNeeds.ich.${currentArchetype}`;
                } else {
                    const needId = path.replace('flatNeeds.ich.', '');
                    actualPath = `flatNeeds.ich.${currentArchetype}.${needId}`;
                }
            }

            // Smart-Setter für profileReview.ich.lockedNeeds - leitet auf aktuellen Archetyp-Slot um
            if (path === 'profileReview.ich.lockedNeeds' || path.startsWith('profileReview.ich.lockedNeeds.')) {
                const currentArchetype = getByPath(state, 'archetypes.ich.primary') || 'single';
                if (path === 'profileReview.ich.lockedNeeds') {
                    actualPath = `profileReview.ich.${currentArchetype}`;
                } else {
                    const needId = path.replace('profileReview.ich.lockedNeeds.', '');
                    actualPath = `profileReview.ich.${currentArchetype}.${needId}`;
                }
            }

            const oldValue = deepClone(getByPath(state, actualPath));
            setByPath(state, actualPath, deepClone(normalizedValue));
            // Notify mit originalem Pfad für Subscriber-Kompatibilität
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
         * Set geschlecht (v4.0: vereinfachter String)
         * @param {string} person - 'ich' or 'partner'
         * @param {string|null} value - 'mann', 'frau', 'nonbinaer' or null
         */
        setGeschlecht(person, value) {
            // v4.0: Geschlecht ist jetzt ein einfacher String
            this.set(`personDimensions.${person}.geschlecht`, value);
        },

        /**
         * Get geschlecht (v4.0: vereinfachter String)
         * @param {string} person - 'ich' or 'partner'
         * @returns {string|null} 'mann', 'frau', 'nonbinaer' or null
         */
        getGeschlecht(person) {
            return this.get(`personDimensions.${person}.geschlecht`);
        },

        // LEGACY: Alias für Rückwärtskompatibilität
        // @deprecated v4.0 - Verwende setGeschlecht/getGeschlecht
        setSecondaryGeschlecht(person, value) {
            console.warn('[TiageState] setSecondaryGeschlecht is deprecated in v4.0 - secondary removed');
            // Ignorieren - v4.0 hat kein secondary mehr
        },
        getPrimaryGeschlecht(person) {
            // v4.0: Geschlecht ist jetzt direkt der Wert
            return this.getGeschlecht(person);
        },
        getSecondaryGeschlecht(person) {
            console.warn('[TiageState] getSecondaryGeschlecht is deprecated in v4.0 - secondary removed');
            return null;
        },
        getGeschlechter(person) {
            // v4.0: Rückwärtskompatibilität - gibt altes Format zurück
            const geschlecht = this.getGeschlecht(person);
            return { primary: geschlecht, secondary: null };
        },
        clearSecondaryGeschlecht(person) {
            // v4.0: Keine Operation mehr nötig
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
         * Set orientierung (v4.0: Multi-Select Array)
         * @param {string} person - 'ich' or 'partner'
         * @param {string|string[]} value - Single value or array of orientations
         */
        setOrientierung(person, value) {
            // v4.0: Konvertiere zu Array wenn nötig
            const arrayValue = Array.isArray(value) ? value : (value ? [value] : []);
            this.set(`personDimensions.${person}.orientierung`, arrayValue);
        },

        /**
         * Add orientierung to multi-select (v4.0)
         * @param {string} person - 'ich' or 'partner'
         * @param {string} value - Orientation to add
         */
        addOrientierung(person, value) {
            const current = this.getOrientierungen(person);
            if (!current.includes(value)) {
                this.set(`personDimensions.${person}.orientierung`, [...current, value]);
            }
        },

        /**
         * Remove orientierung from multi-select (v4.0)
         * @param {string} person - 'ich' or 'partner'
         * @param {string} value - Orientation to remove
         */
        removeOrientierung(person, value) {
            const current = this.getOrientierungen(person);
            this.set(`personDimensions.${person}.orientierung`, current.filter(o => o !== value));
        },

        /**
         * Get all orientierungen (v4.0: Multi-Select Array)
         * @param {string} person - 'ich' or 'partner'
         * @returns {string[]} Array of orientations
         */
        getOrientierungen(person) {
            const value = this.get(`personDimensions.${person}.orientierung`);
            return Array.isArray(value) ? value : (value ? [value] : []);
        },

        // LEGACY: Alias für Rückwärtskompatibilität
        // @deprecated v4.0 - Verwende setOrientierung/getOrientierungen
        setSecondaryOrientierung(person, value) {
            // v4.0: Füge als zusätzliche Orientierung hinzu
            if (value) this.addOrientierung(person, value);
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
         * Get the primary orientierung (v4.0: erstes Element des Arrays)
         * @deprecated v4.0 - Verwende getOrientierungen() für Multi-Select
         */
        getPrimaryOrientierung(person) {
            const orientierungen = this.getOrientierungen(person);
            return orientierungen.length > 0 ? orientierungen[0] : null;
        },

        /**
         * Get the secondary orientierung (v4.0: zweites Element des Arrays)
         * @deprecated v4.0 - Verwende getOrientierungen() für Multi-Select
         */
        getSecondaryOrientierung(person) {
            const orientierungen = this.getOrientierungen(person);
            return orientierungen.length > 1 ? orientierungen[1] : null;
        },

        /**
         * Check if all required dimensions are set for a person
         * v4.0: Geschlecht ist String, Orientierung ist Array
         */
        isPersonComplete(person) {
            const geschlecht = this.getGeschlecht(person);
            const orientierungen = this.getOrientierungen(person);
            return geschlecht !== null &&
                   this.getPrimaryDominanz(person) !== null &&
                   orientierungen.length > 0;
        },

        /**
         * Get missing dimensions for validation
         * v4.0: Geschlecht ist String, Orientierung ist Array
         */
        getMissingDimensions() {
            const missing = [];

            ['ich', 'partner'].forEach(person => {
                const label = person === 'ich' ? 'Ich' : 'Partner';

                if (!this.getGeschlecht(person)) missing.push(`${label}: Geschlecht`);
                if (!this.getPrimaryDominanz(person)) missing.push(`${label}: Dominanz`);
                if (this.getOrientierungen(person).length === 0) missing.push(`${label}: Orientierung`);
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

        /**
         * Normalize Gewichtungen to NEW 3-way format
         * v1.8.903: ALWAYS migrates to new format { O: 1, A: 1, D: 1, G: 1 }
         * Handles:
         * - NEW 3-way format: { O: 1, A: 2, D: 0, G: 1 } (values 0-2) → preserve as-is
         * - Old object format: { O: { value: 25, locked: false }, ... } → MIGRATE to new
         * - Old plain format: { O: 25, A: 25, ... } (values 0-100) → MIGRATE to new
         * @private
         * @param {Object} gewichtungen - { ich: {...}, partner: {...} }
         * @returns {Object} Normalized gewichtungen in NEW 3-way format
         */
        _normalizeGewichtungen(gewichtungen) {
            if (!gewichtungen) return gewichtungen;

            // Check if person data is in NEW 3-way format (values are 0, 1, or 2)
            const isNew3WayFormat = (person) => {
                if (!person) return false;
                // If O is a number between 0-2 AND no 'value' property, it's the new format
                if (typeof person.O === 'number' && person.O >= 0 && person.O <= 2 &&
                    typeof person.A === 'number' && person.A >= 0 && person.A <= 2 &&
                    typeof person.D === 'number' && person.D >= 0 && person.D <= 2 &&
                    typeof person.G === 'number' && person.G >= 0 && person.G <= 2 &&
                    !person.summeLock) {  // Old format always has summeLock
                    return true;
                }
                return false;
            };

            // Migrate old 0-100 value to new 0/1/2 format
            const migrateOldWeight = (oldValue) => {
                if (oldValue === undefined || oldValue === null) return 1;
                if (oldValue <= 10) return 0;  // Very low = Egal
                if (oldValue >= 40) return 2;  // High = Wichtig
                return 1;  // Normal
            };

            // Extract numeric value from various old formats
            const extractOldValue = (entry) => {
                if (entry === undefined || entry === null) return 25;
                if (typeof entry === 'number') return entry;
                if (typeof entry === 'object' && entry !== null && 'value' in entry) {
                    return entry.value ?? 25;
                }
                return 25;
            };

            const normalizePerson = (person) => {
                if (!person) return { O: 1, A: 1, D: 1, G: 1 };  // Default to new format

                // NEW: If it's the new 3-way format, preserve it directly
                if (isNew3WayFormat(person)) {
                    console.log('[TiageState] _normalizeGewichtungen: Preserving NEW 3-way format:', JSON.stringify(person));
                    return {
                        O: person.O,
                        A: person.A,
                        D: person.D,
                        G: person.G
                    };
                }

                // Old format: MIGRATE to new 3-way format
                const migrated = {
                    O: migrateOldWeight(extractOldValue(person.O)),
                    A: migrateOldWeight(extractOldValue(person.A)),
                    D: migrateOldWeight(extractOldValue(person.D)),
                    G: migrateOldWeight(extractOldValue(person.G))
                };
                console.log('[TiageState] _normalizeGewichtungen: MIGRATED old format to NEW:', JSON.stringify(migrated));
                return migrated;
            };

            const result = {};
            if (gewichtungen.ich) {
                result.ich = normalizePerson(gewichtungen.ich);
            }
            if (gewichtungen.partner) {
                result.partner = normalizePerson(gewichtungen.partner);
            }
            return result;
        },

        /**
         * Migrate flatNeeds from old format (flat for ich) to new format (per-archetype for ich)
         * Old: { ich: { '#B1': 75, ... }, partner: { '#B1': 70, ... } }
         * New: { ich: { single: {...}, duo: {...}, ... }, partner: { '#B1': 70, ... } }
         * @private
         * @param {Object} flatNeeds - Old format flatNeeds
         * @returns {Object} Migrated flatNeeds
         */
        _migrateFlatNeeds(flatNeeds) {
            if (!flatNeeds) return flatNeeds;

            const archetypes = ['single', 'duo', 'duo-flex', 'solopoly', 'polyamor', 'ra', 'lat', 'aromantisch'];

            // Prüfen ob bereits neues Format (ich hat Archetyp-Keys)
            if (flatNeeds.ich && typeof flatNeeds.ich === 'object') {
                const ichKeys = Object.keys(flatNeeds.ich);
                const hasArchetypeKeys = ichKeys.some(key => archetypes.includes(key));

                if (hasArchetypeKeys) {
                    // Bereits im neuen Format - sicherstellen dass alle Archetypen existieren
                    const migrated = {
                        ich: {},
                        partner: flatNeeds.partner || {}
                    };
                    for (const arch of archetypes) {
                        migrated.ich[arch] = flatNeeds.ich[arch] || {};
                    }
                    console.log('[TiageState] flatNeeds bereits im neuen Format');
                    return migrated;
                }

                // Altes flaches Format - kopiere in alle Archetyp-Slots
                const oldIchNeeds = { ...flatNeeds.ich };
                console.log('[TiageState] Migriere flatNeeds.ich von flachem Format zu Archetyp-Slots');
                console.log('[TiageState] Alte ICH-Needs:', Object.keys(oldIchNeeds).length, 'Werte');

                const migrated = {
                    ich: {},
                    partner: flatNeeds.partner || {}
                };

                // Kopiere alte Werte in alle 8 Archetyp-Slots als Startbasis
                for (const arch of archetypes) {
                    migrated.ich[arch] = { ...oldIchNeeds };
                }

                console.log('[TiageState] flatNeeds migriert - jeder Archetyp hat jetzt eigenen Slot');
                return migrated;
            }

            // Leeres oder unerwartetes Format - initialisiere neu
            return {
                ich: {
                    single: {},
                    duo: {},
                    'duo-flex': {},
                    solopoly: {},
                    polyamor: {},
                    ra: {},
                    lat: {},
                    aromantisch: {}
                },
                partner: flatNeeds?.partner || {}
            };
        },

        /**
         * Migrate profileReview from old format (lockedNeeds) to new format (per-archetype)
         * Old: { ich: { lockedNeeds: {...} }, partner: { lockedNeeds: {...} } }
         * New: { ich: { single: {...}, duo: {...}, ... }, partner: { lockedNeeds: {} } }
         * @private
         * @param {Object} profileReview - Old format profileReview
         * @returns {Object} Migrated profileReview
         */
        _migrateProfileReview(profileReview) {
            if (!profileReview) return profileReview;

            const archetypes = ['single', 'duo', 'duo-flex', 'solopoly', 'polyamor', 'ra', 'lat', 'aromantisch'];

            // Prüfen ob bereits neues Format (ich hat Archetyp-Keys statt lockedNeeds)
            if (profileReview.ich && typeof profileReview.ich === 'object') {
                const ichKeys = Object.keys(profileReview.ich);
                const hasArchetypeKeys = ichKeys.some(key => archetypes.includes(key));

                if (hasArchetypeKeys) {
                    // Bereits im neuen Format - sicherstellen dass alle Archetypen existieren
                    const migrated = {
                        ich: {},
                        partner: { lockedNeeds: {} }  // Partner: Legacy, wird nicht mehr verwendet
                    };
                    for (const arch of archetypes) {
                        migrated.ich[arch] = profileReview.ich[arch] || {};
                    }
                    console.log('[TiageState] profileReview bereits im neuen Format');
                    return migrated;
                }

                // Altes Format mit lockedNeeds - kopiere in alle Archetyp-Slots
                const oldLockedNeeds = profileReview.ich.lockedNeeds || {};
                console.log('[TiageState] Migriere profileReview.ich von lockedNeeds zu Archetyp-Slots');

                const migrated = {
                    ich: {},
                    partner: { lockedNeeds: {} }
                };

                // Kopiere alte lockedNeeds in alle 8 Archetyp-Slots
                for (const arch of archetypes) {
                    migrated.ich[arch] = { ...oldLockedNeeds };
                }

                console.log('[TiageState] profileReview migriert');
                return migrated;
            }

            // Leeres oder unerwartetes Format - initialisiere neu
            return {
                ich: {
                    single: {},
                    duo: {},
                    'duo-flex': {},
                    solopoly: {},
                    polyamor: {},
                    ra: {},
                    lat: {},
                    aromantisch: {}
                },
                partner: { lockedNeeds: {} }
            };
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
         * @param {number} value - v3.4: richtungsbasiert um 1.0 zentriert, R > 1.0 möglich
         * @param {boolean} locked - Whether the value is locked
         */
        setResonanzFaktor(person, key, value, locked = false) {
            // v3.4: Kein Clamping - R-Werte werden direkt aus Berechnung übernommen
            this.set(`resonanzFaktoren.${person}.${key}`, { value, locked });
        },

        /**
         * Set all Resonanzfaktoren at once
         * v3.4: Kein Clamping - R > 1.0 möglich
         * @param {string} person - 'ich' or 'partner'
         * @param {Object} faktoren - { R1, R2, R3, R4 }
         */
        setResonanzFaktoren(person, faktoren) {
            // v3.4: Kein Clamping - Werte direkt übernehmen
            const normalized = this._normalizeResonanzFaktoren(faktoren);
            this.set(`resonanzFaktoren.${person}`, normalized);
        },

        /**
         * Normalisiert Resonanzfaktoren auf einheitliches Format { value, locked }
         * v3.4: Kein Clamping - R-Werte werden direkt übernommen
         * @private
         * @param {Object} faktoren - { R1, R2, R3, R4 } oder { ich: {...}, partner: {...} }
         * @returns {Object} Normalisierte faktoren
         */
        _normalizeResonanzFaktoren(faktoren) {
            if (!faktoren) return faktoren;

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
                                    value: entry.value ?? entry ?? 1.0,
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
                            value: entry.value ?? 1.0,
                            locked: entry.locked ?? false
                        };
                    } else {
                        result[key] = {
                            value: entry ?? 1.0,
                            locked: false
                        };
                    }
                }
            }
            return result;
        },

        /**
         * Legacy-Alias für _normalizeResonanzFaktoren (Rückwärtskompatibilität)
         * @private
         * @deprecated Verwende _normalizeResonanzFaktoren
         */
        _clampResonanzFaktoren(faktoren) {
            return this._normalizeResonanzFaktoren(faktoren);
        },

        // ═══════════════════════════════════════════════════════════════════
        // FLAT NEEDS METHODS
        // ═══════════════════════════════════════════════════════════════════

        /**
         * Get all flatNeeds for a person
         * ICH: Lädt aus dem aktuellen Archetyp-Slot
         * PARTNER: Lädt aus dem flachen Slot
         * @param {string} person - 'ich' or 'partner'
         * @param {string} [archetyp] - Optional: Spezifischer Archetyp (nur für 'ich')
         * @returns {Object} { '#B1': value, '#B2': value, ... }
         */
        getFlatNeeds(person, archetyp = null) {
            if (person === 'ich') {
                const arch = archetyp || this.get('archetypes.ich.primary') || 'single';
                return this.get(`flatNeeds.ich.${arch}`) || {};
            }
            return this.get(`flatNeeds.partner`) || {};
        },

        /**
         * Set all flatNeeds for a person
         * ICH: Speichert in den aktuellen Archetyp-Slot
         * PARTNER: Speichert in den flachen Slot
         * @param {string} person - 'ich' or 'partner'
         * @param {Object} needs - { '#B1': value, ... }
         * @param {string} [archetyp] - Optional: Spezifischer Archetyp (nur für 'ich')
         */
        setFlatNeeds(person, needs, archetyp = null) {
            if (person === 'ich') {
                const arch = archetyp || this.get('archetypes.ich.primary') || 'single';
                this.set(`flatNeeds.ich.${arch}`, needs);
            } else {
                this.set(`flatNeeds.partner`, needs);
            }
        },

        /**
         * Get a single need value
         * ICH: Liest aus dem aktuellen Archetyp-Slot
         * PARTNER: Liest aus dem flachen Slot
         * @param {string} person - 'ich' or 'partner'
         * @param {string} needId - e.g. '#B1'
         * @param {string} [archetyp] - Optional: Spezifischer Archetyp (nur für 'ich')
         * @returns {number} 0-100
         */
        getNeed(person, needId, archetyp = null) {
            if (person === 'ich') {
                const arch = archetyp || this.get('archetypes.ich.primary') || 'single';
                return this.get(`flatNeeds.ich.${arch}.${needId}`);
            }
            return this.get(`flatNeeds.partner.${needId}`);
        },

        /**
         * Set a single need value
         * ICH: Speichert in den aktuellen Archetyp-Slot
         * PARTNER: Speichert in den flachen Slot
         * @param {string} person - 'ich' or 'partner'
         * @param {string} needId - e.g. '#B1'
         * @param {number} value - 0-100
         * @param {string} [archetyp] - Optional: Spezifischer Archetyp (nur für 'ich')
         */
        setNeed(person, needId, value, archetyp = null) {
            const clampedValue = Math.min(100, Math.max(0, value));
            if (person === 'ich') {
                const arch = archetyp || this.get('archetypes.ich.primary') || 'single';
                this.set(`flatNeeds.ich.${arch}.${needId}`, clampedValue);
            } else {
                this.set(`flatNeeds.partner.${needId}`, clampedValue);
            }
        },

        // ═══════════════════════════════════════════════════════════════════
        // PROFILE REVIEW METHODS (Survey Overrides)
        // ═══════════════════════════════════════════════════════════════════
        // ICH: LockedNeeds werden pro Archetyp gespeichert
        // PARTNER: Nicht mehr verwendet (keine manuellen Overrides)

        /**
         * Get all locked (survey-overridden) needs for a person
         * ICH: Liest aus dem aktuellen Archetyp-Slot
         * PARTNER: Gibt leeres Objekt zurück (keine manuellen Overrides)
         * @param {string} person - 'ich' or 'partner'
         * @param {string} [archetyp] - Optional: Spezifischer Archetyp (nur für 'ich')
         * @returns {Object} { '#B15': value, ... }
         */
        getLockedNeeds(person, archetyp = null) {
            if (person === 'ich') {
                const arch = archetyp || this.get('archetypes.ich.primary') || 'single';
                return this.get(`profileReview.ich.${arch}`) || {};
            }
            // Partner: Keine manuellen Overrides mehr
            return {};
        },

        /**
         * Lock a need value (from survey)
         * ICH: Speichert in den aktuellen Archetyp-Slot
         * PARTNER: Wird ignoriert (keine manuellen Overrides)
         * @param {string} person - 'ich' or 'partner'
         * @param {string} needId - e.g. '#B15'
         * @param {number} value - 0-100
         * @param {string} [archetyp] - Optional: Spezifischer Archetyp (nur für 'ich')
         */
        lockNeed(person, needId, value, archetyp = null) {
            if (person === 'partner') {
                console.warn('[TiageState] lockNeed für Partner wird ignoriert - keine manuellen Overrides');
                return;
            }
            const clampedValue = Math.min(100, Math.max(0, value));
            const arch = archetyp || this.get('archetypes.ich.primary') || 'single';
            this.set(`profileReview.ich.${arch}.${needId}`, clampedValue);
        },

        /**
         * Unlock a need (remove survey override)
         * ICH: Entfernt aus dem aktuellen Archetyp-Slot
         * PARTNER: Wird ignoriert (keine manuellen Overrides)
         * @param {string} person - 'ich' or 'partner'
         * @param {string} needId - e.g. '#B15'
         * @param {string} [archetyp] - Optional: Spezifischer Archetyp (nur für 'ich')
         */
        unlockNeed(person, needId, archetyp = null) {
            if (person === 'partner') {
                return;
            }
            const arch = archetyp || this.get('archetypes.ich.primary') || 'single';
            const current = this.get(`profileReview.ich.${arch}`) || {};
            delete current[needId];
            this.set(`profileReview.ich.${arch}`, current);
        },

        /**
         * Check if a need is locked
         * ICH: Prüft im aktuellen Archetyp-Slot
         * PARTNER: Gibt immer false zurück (keine manuellen Overrides)
         * @param {string} person - 'ich' or 'partner'
         * @param {string} needId - e.g. '#B15'
         * @param {string} [archetyp] - Optional: Spezifischer Archetyp (nur für 'ich')
         * @returns {boolean}
         */
        isNeedLocked(person, needId, archetyp = null) {
            if (person === 'partner') {
                return false;
            }
            const arch = archetyp || this.get('archetypes.ich.primary') || 'single';
            const locked = this.get(`profileReview.ich.${arch}.${needId}`);
            return locked !== undefined && locked !== null;
        },

        // ═══════════════════════════════════════════════════════════════════
        // RESET / INITIALIZATION
        // ═══════════════════════════════════════════════════════════════════

        /**
         * Reset all state to initial values
         * FIX: personDimensions (GOD) werden NICHT zurückgesetzt - sie bleiben persistent
         */
        reset() {
            // FIX: personDimensions (GOD-Auswahl) NICHT zurücksetzen!
            // Diese sind jetzt persistent und sollen bei Reset erhalten bleiben.
            // this.set('personDimensions', { ... }); // ENTFERNT

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
            // Reset neue Felder - v4.5: NEW 3-way format
            this.set('gewichtungen', {
                ich: {
                    O: 1,  // 0=Egal, 1=Normal, 2=Wichtig
                    A: 1,
                    D: 1,
                    G: 1
                },
                partner: {
                    O: 1,
                    A: 1,
                    D: 1,
                    G: 1
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
         * FIX v1.8.691: Idempotent - kann mehrfach aufgerufen werden, lädt nur einmal
         * Returns a Promise for async compatibility
         * @returns {Promise<void>}
         */
        async init() {
            if (isInitialized) {
                console.log('[TiageState] init() - bereits initialisiert, überspringe');
                return Promise.resolve();
            }
            console.log('[TiageState] init() - Initialisierung startet...');
            this.loadFromStorage();
            isInitialized = true;
            console.log('[TiageState] init() - Initialisierung abgeschlossen');
            return Promise.resolve();
        },

        /**
         * Prüft ob TiageState bereits initialisiert wurde
         * @returns {boolean}
         */
        isInitialized() {
            return isInitialized;
        },

        /**
         * Load state from localStorage
         * FIX v1.8.687: Setzt isLoadingFromStorage Flag um Race Conditions zu verhindern
         */
        loadFromStorage() {
            // FIX v1.8.687: Flag setzen um Subscriber-Neuberechnungen zu verhindern
            isLoadingFromStorage = true;
            console.log('[TiageState] loadFromStorage - START (isLoadingFromStorage = true)');

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

            // v5.0 SSOT: Migriert Legacy-Orientierungs-Keys zu aktuellen Keys
            // WICHTIG: Greift auf TiageSynthesis.Constants.ORIENTIERUNG_OPTIONS.LEGACY_MIGRATION zu
            // Fallback auf lokale Map falls SSOT noch nicht geladen
            const migrateOrientierung = (orientierung) => {
                if (!orientierung) return orientierung;

                // v5.0 SSOT: Migration-Map aus Constants (falls verfügbar)
                const getMigrationMap = () => {
                    if (typeof TiageSynthesis !== 'undefined' &&
                        TiageSynthesis.Constants &&
                        TiageSynthesis.Constants.ORIENTIERUNG_OPTIONS &&
                        TiageSynthesis.Constants.ORIENTIERUNG_OPTIONS.LEGACY_MIGRATION) {
                        return TiageSynthesis.Constants.ORIENTIERUNG_OPTIONS.LEGACY_MIGRATION;
                    }
                    // Fallback (muss konsistent mit SSOT sein!)
                    return {
                        'bihomo': 'bisexuell',
                        'gay_lesbisch': 'homosexuell',
                        'pansexuell_queer': 'pansexuell'
                    };
                };

                const migrationMap = getMigrationMap();
                const migrateKey = (key) => migrationMap[key] || key;

                if (typeof orientierung === 'object' && 'primary' in orientierung) {
                    const migrated = { ...orientierung };
                    if (migrationMap[migrated.primary]) {
                        console.log(`[TiageState] v5.0 Migriere Orientierung ${migrated.primary} → ${migrateKey(migrated.primary)}`);
                        migrated.primary = migrateKey(migrated.primary);
                    }
                    if (migrationMap[migrated.secondary]) {
                        console.log(`[TiageState] v5.0 Migriere sekundäre Orientierung ${migrated.secondary} → ${migrateKey(migrated.secondary)}`);
                        migrated.secondary = migrateKey(migrated.secondary);
                    }
                    return migrated;
                }
                // String-Format
                if (migrationMap[orientierung]) {
                    console.log(`[TiageState] v5.0 Migriere Orientierung ${orientierung} → ${migrateKey(orientierung)}`);
                    return migrateKey(orientierung);
                }
                return orientierung;
            };

            try {
                const saved = localStorage.getItem('tiage_state');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    // v2.0: Migriere Orientierung in personDimensions
                    if (parsed.personDimensions) {
                        if (parsed.personDimensions.ich?.orientierung) {
                            parsed.personDimensions.ich.orientierung = migrateOrientierung(parsed.personDimensions.ich.orientierung);
                        }
                        if (parsed.personDimensions.partner?.orientierung) {
                            parsed.personDimensions.partner.orientierung = migrateOrientierung(parsed.personDimensions.partner.orientierung);
                        }
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
                        // v4.5: Normalisiere Gewichtungen - erkennt NEW 3-way format (0/1/2) und OLD format
                        console.log('[TiageState] loadFromStorage - gewichtungen RAW from localStorage:', JSON.stringify(parsed.gewichtungen?.ich)); // DEBUG
                        const normalized = this._normalizeGewichtungen(parsed.gewichtungen);
                        console.log('[TiageState] loadFromStorage - gewichtungen NACH Normalisierung:', JSON.stringify(normalized?.ich)); // DEBUG
                        this.set('gewichtungen', normalized);
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
                    // profileReview Migration: Altes Format (lockedNeeds) zu neuem Format (pro Archetyp)
                    if (parsed.profileReview) {
                        const migratedProfileReview = this._migrateProfileReview(parsed.profileReview);
                        this.set('profileReview', migratedProfileReview);
                    }
                    // Bindungsmuster laden
                    if (parsed.bindungsmuster) {
                        this.set('bindungsmuster', parsed.bindungsmuster);
                        console.log('[TiageState] loadFromStorage - bindungsmuster geladen:', JSON.stringify(parsed.bindungsmuster));
                    }
                    // RTI-Säulen Prioritäten laden (S1-S5)
                    if (parsed.rtiPriorities) {
                        this.set('rtiPriorities', parsed.rtiPriorities);
                        console.log('[TiageState] loadFromStorage - rtiPriorities geladen:', JSON.stringify(parsed.rtiPriorities));
                    }
                    // flatNeeds Migration: Altes Format (flach) zu neuem Format (pro Archetyp für ICH)
                    if (parsed.flatNeeds) {
                        const migratedFlatNeeds = this._migrateFlatNeeds(parsed.flatNeeds);
                        this.set('flatNeeds', migratedFlatNeeds);
                        console.log('[TiageState] loadFromStorage - flatNeeds geladen/migriert');
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
            } finally {
                // FIX v1.8.687: Flag zurücksetzen nach dem Laden
                isLoadingFromStorage = false;
                console.log('[TiageState] loadFromStorage - END (isLoadingFromStorage = false)');
                this._ensureFlatNeedsInitialized();
            }
        },

_ensureFlatNeedsInitialized: function() {
    if (this.flatNeeds && Object.keys(this.flatNeeds).length === 0) {
        var dominated = this.profileReview?.dominatedArchetype;
        if (dominated && window.NEED_PROFILES?.[dominated]) {
            this.flatNeeds = JSON.parse(JSON.stringify(window.NEED_PROFILES[dominated]));
            console.log('[State] flatNeeds aus Archetyp-Profil initialisiert:', dominated);
        }
    }
},




        /**
         * Prüft ob gerade aus localStorage geladen wird
         * FIX v1.8.687: Subscriber können dieses Flag prüfen um Race Conditions zu vermeiden
         * @returns {boolean}
         */
        isLoading() {
            return isLoadingFromStorage;
        },

        /**
         * Prüft ob R-Faktor Neuberechnung unterdrückt werden soll
         * FIX v1.8.690: Nur noch während loadFromStorage aktiv - suppressResonanzRecalc entfernt
         * da ProfileCalculator jetzt lockedNeeds respektiert
         * @returns {boolean}
         */
        isSuppressResonanzRecalc() {
            return isLoadingFromStorage;
        },

        /**
         * Save state to localStorage
         * Speichert alle persistenten Daten zentral
         */
        saveToStorage() {
            try {
                const gewichtungen = this.get('gewichtungen');
                console.log('[TiageState] saveToStorage - gewichtungen.ich:', JSON.stringify(gewichtungen?.ich)); // DEBUG: AGOD persistence

                const toSave = {
                    personDimensions: this.get('personDimensions'),
                    archetypes: this.get('archetypes'),
                    // Neue Felder - zentral speichern
                    gewichtungen: gewichtungen,
                    resonanzFaktoren: this.get('resonanzFaktoren'),
                    profileReview: this.get('profileReview'),
                    // Bindungsmuster für Slot Machine Tie-Breaker
                    bindungsmuster: this.get('bindungsmuster'),
                    // RTI-Säulen Prioritäten (S1-S5)
                    rtiPriorities: this.get('rtiPriorities'),
                    // flatNeeds - die 220 Bedürfniswerte MÜSSEN gespeichert werden!
                    // Früher: "werden aus Inputs berechnet" - aber sie wurden NICHT neu berechnet beim Laden
                    flatNeeds: this.get('flatNeeds'),
                    // UI Settings - persistente Einstellungen
                    ui: {
                        matchModalView: this.get('ui.matchModalView'),
                        syntheseType: this.get('ui.syntheseType'),
                        selection: this.get('ui.selection'),
                        language: this.get('ui.language')
                    }
                };
                localStorage.setItem('tiage_state', JSON.stringify(toSave));
                // console.log('[TiageState] State gespeichert - tiage_state key'); // DISABLED: verursacht Message-Overflow
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
// FIX v1.8.691: TiageState.init() wird automatisch aufgerufen
// Das stellt sicher, dass ALLE Seiten den State aus localStorage laden
// REIHENFOLGE WICHTIG: TiageState.init() VOR TiageAutoSync.init()
if (typeof window !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            TiageState.init();      // Lädt State aus localStorage (idempotent)
            TiageAutoSync.init();   // Registriert Sync-Subscriber
        });
    } else {
        // DOM bereits geladen
        TiageState.init();          // Lädt State aus localStorage (idempotent)
        TiageAutoSync.init();       // Registriert Sync-Subscriber
    }
}

// Export for ES6 modules (optional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TiageState, TiageAutoSync };
}
