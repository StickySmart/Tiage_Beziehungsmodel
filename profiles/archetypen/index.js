/**
 * ARCHETYPEN PROFILE INDEX v5.1
 *
 * Zwei separate Objekte:
 * 1. BaseArchetypProfile - Die 8 unveränderlichen Basis-Definitionen
 * 2. LoadedArchetypProfile - Die geladenen Benutzer-Profile (ich + partner)
 *
 * BaseArchetypProfile Struktur:
 * {
 *   single: { id, key, label, name, beschreibung, beduerfnisse, quellen, kernwerte, vermeidet },
 *   duo: { ... },
 *   ...
 * }
 *
 * LoadedArchetypProfile Struktur (v3.0):
 * {
 *   ich: { archetyp, geschlecht, dominanz, orientierung, profileReview: { flatNeeds }, gewichtungen, resonanzFaktoren },
 *   partner: { ... }
 * }
 *
 * Berechnung:
 * - flatNeeds = BaseArchetypProfile[archetyp].beduerfnisse (Umfragewerte) + ProfileModifiers.calculateProfileDeltas()
 * - gewichtungen = Defaults { O: 25, A: 25, D: 25, G: 25 } oder aus Storage
 * - resonanzFaktoren = TiageSynthesis.NeedsIntegration.calculateDimensionalResonance()
 */

(function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Formatiert ein Basis-Profil
     * @param {Object} profil - Roh-Profil aus window.*Profil
     * @param {string} key - Der Schlüssel (z.B. 'single', 'duo')
     * @returns {Object|null} Formatiertes Profil
     */
    function formatBaseProfile(profil, key) {
        if (!profil) return null;
        return {
            // Meta
            id: profil.id || key,
            key: key,
            label: profil.name,
            name: profil.name,
            beschreibung: profil.beschreibung,
            // Basis-Bedürfnisse (Umfragewerte)
            beduerfnisse: profil.beduerfnisse,
            // Abwärtskompatibilität
            kernbeduerfnisse: profil.beduerfnisse,
            // Zusätzliche Infos
            quellen: profil.quellen || [],
            kernwerte: profil.kernwerte || [],
            vermeidet: profil.vermeidet || []
        };
    }

    /**
     * Erstellt ein leeres Profil mit v3.0 Struktur
     * @returns {Object} Leeres Profil
     */
    function createEmptyProfile() {
        return {
            archetyp: null,
            geschlecht: null,
            dominanz: null,
            orientierung: null,
            profileReview: {
                flatNeeds: {}
            },
            gewichtungen: null,
            resonanzFaktoren: null
        };
    }

    /**
     * Default-Gewichtungen (je 25%)
     * @returns {Object} Default-Werte für O, A, D, G
     */
    function getDefaultGewichtungen() {
        return {
            O: { value: 25, locked: false },  // Orientierung
            A: { value: 25, locked: false },  // Archetyp
            D: { value: 25, locked: false },  // Dominanz
            G: { value: 25, locked: false }   // Geschlecht
        };
    }

    /**
     * Default-Resonanzfaktoren
     * @returns {Object} Default-Werte für R1-R4
     */
    function getDefaultResonanzFaktoren() {
        return {
            R1: { value: 1.0, locked: false },  // Leben
            R2: { value: 1.0, locked: false },  // Philosophie
            R3: { value: 1.0, locked: false },  // Dynamik
            R4: { value: 1.0, locked: false }   // Identität
        };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 1. BASE ARCHETYP PROFILE - Die 8 Basis-Definitionen
    // ═══════════════════════════════════════════════════════════════════════════

    const profilQuellen = {
        'single': window.SingleProfil,
        'duo': window.DuoProfil,
        'duo_flex': window.DuoFlexProfil,
        'solopoly': window.SolopolyProfil,
        'polyamor': window.PolyamorProfil,
        'ra': window.RAProfil,
        'lat': window.LATProfil,
        'aromantisch': window.AromantischProfil
    };

    window.BaseArchetypProfile = {};
    let loadedCount = 0;

    Object.keys(profilQuellen).forEach(key => {
        const formatted = formatBaseProfile(profilQuellen[key], key);
        if (formatted) {
            window.BaseArchetypProfile[key] = formatted;
            loadedCount++;
        } else {
            console.warn(`Archetyp-Profil nicht gefunden: ${key}`);
        }
    });

    console.log('BaseArchetypProfile geladen:', loadedCount, 'Basis-Definitionen');

    // ═══════════════════════════════════════════════════════════════════════════
    // 2. LOADED ARCHETYP PROFILE - View auf TiageState (Single Source of Truth)
    // ═══════════════════════════════════════════════════════════════════════════
    // LoadedArchetypProfile ist jetzt ein "View" der direkt aus TiageState liest.
    // Alle Schreibzugriffe gehen ebenfalls an TiageState.
    // Bestehender Code funktioniert weiterhin ohne Änderung.
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Erstellt einen Profil-View für eine Person (ich/partner)
     * Liest und schreibt direkt von/zu TiageState
     */
    function createProfileView(person) {
        return {
            // Archetyp: TiageState.archetypes.{person}.primary
            get archetyp() {
                if (typeof TiageState !== 'undefined') {
                    return TiageState.get(`archetypes.${person}.primary`);
                }
                return null;
            },
            set archetyp(value) {
                if (typeof TiageState !== 'undefined') {
                    TiageState.set(`archetypes.${person}.primary`, value);
                }
            },

            // Geschlecht: TiageState.personDimensions.{person}.geschlecht
            get geschlecht() {
                if (typeof TiageState !== 'undefined') {
                    return TiageState.get(`personDimensions.${person}.geschlecht`);
                }
                return null;
            },
            set geschlecht(value) {
                if (typeof TiageState !== 'undefined') {
                    TiageState.set(`personDimensions.${person}.geschlecht`, value);
                }
            },

            // Dominanz: TiageState.personDimensions.{person}.dominanz
            get dominanz() {
                if (typeof TiageState !== 'undefined') {
                    return TiageState.get(`personDimensions.${person}.dominanz`);
                }
                return null;
            },
            set dominanz(value) {
                if (typeof TiageState !== 'undefined') {
                    TiageState.set(`personDimensions.${person}.dominanz`, value);
                }
            },

            // Orientierung: TiageState.personDimensions.{person}.orientierung
            get orientierung() {
                if (typeof TiageState !== 'undefined') {
                    return TiageState.get(`personDimensions.${person}.orientierung`);
                }
                return null;
            },
            set orientierung(value) {
                if (typeof TiageState !== 'undefined') {
                    TiageState.set(`personDimensions.${person}.orientierung`, value);
                }
            },

            // ProfileReview mit flatNeeds
            get profileReview() {
                const self = this;
                return {
                    get flatNeeds() {
                        if (typeof TiageState !== 'undefined') {
                            return TiageState.get(`flatNeeds.${person}`) || {};
                        }
                        return {};
                    },
                    set flatNeeds(value) {
                        if (typeof TiageState !== 'undefined') {
                            TiageState.set(`flatNeeds.${person}`, value);
                        }
                    }
                };
            },
            set profileReview(value) {
                if (typeof TiageState !== 'undefined' && value && value.flatNeeds) {
                    TiageState.set(`flatNeeds.${person}`, value.flatNeeds);
                }
            },

            // Gewichtungen: TiageState.gewichtungen.{person}
            get gewichtungen() {
                if (typeof TiageState !== 'undefined') {
                    return TiageState.get(`gewichtungen.${person}`);
                }
                return null;
            },
            set gewichtungen(value) {
                if (typeof TiageState !== 'undefined') {
                    TiageState.set(`gewichtungen.${person}`, value);
                }
            },

            // ResonanzFaktoren: TiageState.resonanzFaktoren.{person}
            get resonanzFaktoren() {
                if (typeof TiageState !== 'undefined') {
                    return TiageState.get(`resonanzFaktoren.${person}`);
                }
                return null;
            },
            set resonanzFaktoren(value) {
                if (typeof TiageState !== 'undefined') {
                    TiageState.set(`resonanzFaktoren.${person}`, value);
                }
            }
        };
    }

    // LoadedArchetypProfile als View auf TiageState
    window.LoadedArchetypProfile = {
        get ich() { return createProfileView('ich'); },
        set ich(value) {
            // Vollständiges Profil setzen
            if (typeof TiageState !== 'undefined' && value) {
                if (value.archetyp) TiageState.set('archetypes.ich.primary', value.archetyp);
                if (value.geschlecht) TiageState.set('personDimensions.ich.geschlecht', value.geschlecht);
                if (value.dominanz) TiageState.set('personDimensions.ich.dominanz', value.dominanz);
                if (value.orientierung) TiageState.set('personDimensions.ich.orientierung', value.orientierung);
                if (value.profileReview?.flatNeeds) TiageState.set('flatNeeds.ich', value.profileReview.flatNeeds);
                if (value.gewichtungen) TiageState.set('gewichtungen.ich', value.gewichtungen);
                if (value.resonanzFaktoren) TiageState.set('resonanzFaktoren.ich', value.resonanzFaktoren);
            }
        },
        get partner() { return createProfileView('partner'); },
        set partner(value) {
            // Vollständiges Profil setzen
            if (typeof TiageState !== 'undefined' && value) {
                if (value.archetyp) TiageState.set('archetypes.partner.primary', value.archetyp);
                if (value.geschlecht) TiageState.set('personDimensions.partner.geschlecht', value.geschlecht);
                if (value.dominanz) TiageState.set('personDimensions.partner.dominanz', value.dominanz);
                if (value.orientierung) TiageState.set('personDimensions.partner.orientierung', value.orientierung);
                if (value.profileReview?.flatNeeds) TiageState.set('flatNeeds.partner', value.profileReview.flatNeeds);
                if (value.gewichtungen) TiageState.set('gewichtungen.partner', value.gewichtungen);
                if (value.resonanzFaktoren) TiageState.set('resonanzFaktoren.partner', value.resonanzFaktoren);
            }
        }
    };

    console.log('[LoadedArchetypProfile] View auf TiageState aktiviert (SSOT)');

    // ═══════════════════════════════════════════════════════════════════════════
    // 3. PROFILE CALCULATOR - Berechnet und lädt Profile
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Berechnet flatNeeds aus Basis + Modifier
     *
     * @param {string} archetyp - Archetyp-Key (z.B. 'single')
     * @param {Object} geschlecht - { primary, secondary }
     * @param {Object} dominanz - { primary, secondary }
     * @param {Object} orientierung - { primary, secondary }
     * @returns {Object} Berechnete flatNeeds { '#B1': value, ... }
     */
    function calculateFlatNeeds(archetyp, geschlecht, dominanz, orientierung) {
        // 1. Basis-Bedürfnisse holen
        const baseProfil = window.BaseArchetypProfile[archetyp];
        if (!baseProfil || !baseProfil.beduerfnisse) {
            console.warn('[ProfileCalculator] Basis-Profil nicht gefunden:', archetyp);
            return {};
        }

        // Kopie der Basis-Bedürfnisse
        const flatNeeds = { ...baseProfil.beduerfnisse };

        // 2. Modifier berechnen und anwenden
        if (window.ProfileModifiers) {
            const profileContext = {
                geschlecht: geschlecht,
                dominanz: dominanz?.primary || dominanz,
                orientierung: orientierung?.primary || orientierung
            };

            const deltas = window.ProfileModifiers.calculateProfileDeltas(profileContext);

            if (deltas && Object.keys(deltas).length > 0) {
                // Deltas anwenden - convert string keys to #IDs for lookup
                let appliedCount = 0;
                Object.keys(deltas).forEach(stringKey => {
                    // Convert string key to #ID for lookup in flatNeeds (which uses #ID keys)
                    const hashId = (typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.toId)
                        ? BeduerfnisIds.toId(stringKey)
                        : stringKey;

                    if (flatNeeds[hashId] !== undefined) {
                        // Wert modifizieren und auf 0-100 begrenzen
                        flatNeeds[hashId] = Math.min(100, Math.max(0, flatNeeds[hashId] + deltas[stringKey]));
                        appliedCount++;
                    } else if (flatNeeds[stringKey] !== undefined) {
                        // Fallback: try direct string key lookup
                        flatNeeds[stringKey] = Math.min(100, Math.max(0, flatNeeds[stringKey] + deltas[stringKey]));
                        appliedCount++;
                    }
                });
                console.log('[ProfileCalculator] Modifier angewendet:', appliedCount, 'von', Object.keys(deltas).length, 'Deltas');
            }
        }

        return flatNeeds;
    }

    /**
     * Berechnet Resonanzfaktoren aus Profil-Kontext
     *
     * @param {Object} profileContext - { archetyp, needs, dominanz, orientierung, geschlecht }
     * @returns {Object} { R1, R2, R3, R4 } mit value und locked
     */
    function calculateResonanzFaktoren(profileContext) {
        const defaults = getDefaultResonanzFaktoren();

        // Prüfe ob TiageSynthesis verfügbar
        if (typeof TiageSynthesis === 'undefined' ||
            typeof TiageSynthesis.NeedsIntegration === 'undefined' ||
            typeof TiageSynthesis.NeedsIntegration.calculateDimensionalResonance !== 'function') {
            console.log('[ProfileCalculator] TiageSynthesis nicht verfügbar, verwende Defaults');
            return defaults;
        }

        if (!profileContext || !profileContext.archetyp || !profileContext.needs) {
            console.log('[ProfileCalculator] Unvollständiger Profil-Kontext, verwende Defaults');
            return defaults;
        }

        // Berechne dimensionale Resonanzen
        console.log('[ProfileCalculator] calculateDimensionalResonance aufgerufen mit:', {
            archetyp: profileContext.archetyp,
            needsCount: profileContext.needs ? Object.keys(profileContext.needs).length : 0,
            sampleNeeds: profileContext.needs ? Object.keys(profileContext.needs).slice(0, 5) : []
        });
        const resonanz = TiageSynthesis.NeedsIntegration.calculateDimensionalResonance(profileContext);

        if (!resonanz || !resonanz.enabled) {
            console.log('[ProfileCalculator] Resonanz-Berechnung nicht aktiviert, verwende Defaults', {
                resonanz: resonanz,
                enabled: resonanz?.enabled
            });
            return defaults;
        }

        // Mapping: R1=leben, R2=philosophie, R3=dynamik, R4=identitaet
        return {
            R1: { value: resonanz.leben || 1.0, locked: false },
            R2: { value: resonanz.philosophie || 1.0, locked: false },
            R3: { value: resonanz.dynamik || 1.0, locked: false },
            R4: { value: resonanz.identitaet || 1.0, locked: false }
        };
    }

    /**
     * Berechnet ein vollständiges Profil aus Storage-Daten
     *
     * @param {Object} storageData - Daten aus Storage { archetyp, geschlecht, dominanz, orientierung, gewichtungen?, resonanzfaktoren? }
     * @returns {Object} Vollständiges Profil mit berechneten Werten
     */
    function calculateProfile(storageData) {
        if (!storageData || !storageData.archetyp) {
            console.warn('[ProfileCalculator] Keine gültigen Storage-Daten');
            return createEmptyProfile();
        }

        const archetyp = storageData.archetyp;
        const geschlecht = storageData.geschlecht || null;
        const dominanz = storageData.dominanz || null;
        const orientierung = storageData.orientierung || null;

        // 3.1 flatNeeds berechnen (Basis + Modifikatoren)
        const flatNeeds = calculateFlatNeeds(archetyp, geschlecht, dominanz, orientierung);

        // 3.1.1 Survey-Antworten integrieren - NUR wenn locked (vom User manuell geändert)
        if (storageData.profileReview && storageData.profileReview.flatNeeds) {
            const surveyNeeds = storageData.profileReview.flatNeeds;
            let overrideCount = 0;

            // Neue Array-Struktur: [{ id, value, locked }, ...]
            if (Array.isArray(surveyNeeds)) {
                surveyNeeds.forEach(need => {
                    // Nur übernehmen wenn locked (User hat Wert manuell fixiert)
                    if (need.locked && need.id && need.value !== undefined) {
                        flatNeeds[need.id] = need.value;
                        overrideCount++;
                    }
                });
            } else {
                // Legacy Objekt-Format: { needId: value } - alle übernehmen (Rückwärtskompatibilität)
                Object.keys(surveyNeeds).forEach(needId => {
                    if (surveyNeeds[needId] !== undefined && surveyNeeds[needId] !== null) {
                        flatNeeds[needId] = surveyNeeds[needId];
                        overrideCount++;
                    }
                });
            }

            if (overrideCount > 0) {
                console.log('[ProfileCalculator] Locked Survey-Werte integriert:', overrideCount, 'von',
                    Array.isArray(surveyNeeds) ? surveyNeeds.length : Object.keys(surveyNeeds).length);
            }
        }

        // 3.2 Gewichtungen (aus Storage oder Defaults)
        const gewichtungen = storageData.gewichtungen || getDefaultGewichtungen();

        // 3.3 Resonanzfaktoren berechnen
        const profileContext = {
            archetyp: archetyp,
            needs: flatNeeds,
            dominanz: dominanz?.primary || dominanz,
            orientierung: orientierung?.primary || orientierung,
            geschlecht: geschlecht
        };
        const resonanzFaktoren = storageData.resonanzfaktoren || calculateResonanzFaktoren(profileContext);

        return {
            archetyp: archetyp,
            geschlecht: geschlecht,
            dominanz: dominanz,
            orientierung: orientierung,
            profileReview: {
                flatNeeds: flatNeeds
            },
            gewichtungen: gewichtungen,
            resonanzFaktoren: resonanzFaktoren
        };
    }

    /**
     * Lädt ein berechnetes Profil in LoadedArchetypProfile
     *
     * @param {string} person - 'ich' oder 'partner'
     * @param {Object} storageData - Daten aus Storage
     * @returns {boolean} Erfolg
     */
    function loadProfile(person, storageData) {
        if (person !== 'ich' && person !== 'partner') {
            console.error('[ProfileCalculator] Ungültige Person:', person);
            return false;
        }

        const calculatedProfile = calculateProfile(storageData);

        // ═══════════════════════════════════════════════════════════════════════════
        // Direkt zu TiageState schreiben (Single Source of Truth)
        // LoadedArchetypProfile ist jetzt ein View auf TiageState
        // ═══════════════════════════════════════════════════════════════════════════
        if (typeof TiageState !== 'undefined') {
            // Archetyp setzen
            if (calculatedProfile.archetyp) {
                TiageState.set(`archetypes.${person}.primary`, calculatedProfile.archetyp);
            }

            // Dimensionen setzen (geschlecht, dominanz, orientierung)
            if (calculatedProfile.geschlecht) {
                TiageState.set(`personDimensions.${person}.geschlecht`, calculatedProfile.geschlecht);
            }
            if (calculatedProfile.dominanz) {
                TiageState.set(`personDimensions.${person}.dominanz`, calculatedProfile.dominanz);
            }
            if (calculatedProfile.orientierung) {
                TiageState.set(`personDimensions.${person}.orientierung`, calculatedProfile.orientierung);
            }

            // flatNeeds setzen
            if (calculatedProfile.profileReview?.flatNeeds) {
                TiageState.set(`flatNeeds.${person}`, calculatedProfile.profileReview.flatNeeds);
            }

            // gewichtungen setzen (respektiere Locks!)
            if (calculatedProfile.gewichtungen) {
                const currentGewichtungen = TiageState.get(`gewichtungen.${person}`);
                const newGewichtungen = {};
                ['O', 'A', 'D', 'G'].forEach(key => {
                    const current = currentGewichtungen?.[key];
                    const calculated = calculatedProfile.gewichtungen[key];
                    // Nur überschreiben wenn nicht locked
                    if (!current?.locked) {
                        newGewichtungen[key] = calculated;
                    } else {
                        newGewichtungen[key] = current;
                    }
                });
                TiageState.set(`gewichtungen.${person}`, newGewichtungen);
            }

            // resonanzFaktoren setzen (respektiere Locks!)
            if (calculatedProfile.resonanzFaktoren) {
                const currentResonanz = TiageState.get(`resonanzFaktoren.${person}`);
                const newResonanz = {};
                ['R1', 'R2', 'R3', 'R4'].forEach(key => {
                    const current = currentResonanz?.[key];
                    const calculated = calculatedProfile.resonanzFaktoren[key];
                    // Nur überschreiben wenn nicht locked
                    if (!current?.locked) {
                        newResonanz[key] = calculated;
                    } else {
                        newResonanz[key] = current;
                    }
                });
                TiageState.set(`resonanzFaktoren.${person}`, newResonanz);
                console.log(`[ProfileCalculator] resonanzFaktoren gesetzt für ${person}:`, JSON.stringify(newResonanz));
            }
        }

        console.log(`[ProfileCalculator] Profil geladen: ${person}`, {
            archetyp: calculatedProfile.archetyp,
            flatNeedsCount: Object.keys(calculatedProfile.profileReview.flatNeeds).length,
            hasGewichtungen: !!calculatedProfile.gewichtungen,
            hasResonanz: !!calculatedProfile.resonanzFaktoren,
            resonanzFaktoren: calculatedProfile.resonanzFaktoren
        });

        return true;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 4. EXPORT - API für externe Nutzung
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Initialisiert LoadedArchetypProfile aus TiageState
     * Sollte nach App-Start aufgerufen werden
     */
    function initFromState() {
        if (typeof TiageState === 'undefined') {
            console.log('[ProfileCalculator] TiageState nicht verfügbar, überspringe Initialisierung');
            return false;
        }

        let loaded = 0;

        // ICH-Profil laden
        const ichArchetyp = TiageState.getArchetypes?.('ich');
        if (ichArchetyp?.primary) {
            const ichData = {
                archetyp: ichArchetyp.primary,
                geschlecht: TiageState.get?.('personDimensions.ich.geschlecht') || null,
                dominanz: TiageState.get?.('personDimensions.ich.dominanz') || null,
                orientierung: TiageState.get?.('personDimensions.ich.orientierung') || null
            };
            loadProfile('ich', ichData);
            loaded++;
        }

        // PARTNER-Profil laden
        const partnerArchetyp = TiageState.getArchetypes?.('partner');
        if (partnerArchetyp?.primary) {
            const partnerData = {
                archetyp: partnerArchetyp.primary,
                geschlecht: TiageState.get?.('personDimensions.partner.geschlecht') || null,
                dominanz: TiageState.get?.('personDimensions.partner.dominanz') || null,
                orientierung: TiageState.get?.('personDimensions.partner.orientierung') || null
            };
            loadProfile('partner', partnerData);
            loaded++;
        }

        console.log('[ProfileCalculator] Initialisierung aus TiageState:', loaded, 'Profile geladen');
        return loaded > 0;
    }

    window.ProfileCalculator = {
        // Berechnung
        calculateFlatNeeds: calculateFlatNeeds,
        calculateResonanzFaktoren: calculateResonanzFaktoren,
        calculateProfile: calculateProfile,

        // Laden
        loadProfile: loadProfile,
        initFromState: initFromState,

        // Defaults
        getDefaultGewichtungen: getDefaultGewichtungen,
        getDefaultResonanzFaktoren: getDefaultResonanzFaktoren,

        // Helper
        createEmptyProfile: createEmptyProfile
    };

    console.log('ProfileCalculator bereit');

    // ═══════════════════════════════════════════════════════════════════════════
    // 5. AUTO-INITIALISIERUNG - Lade Profile aus TiageState nach DOM-Ready
    // ═══════════════════════════════════════════════════════════════════════════

    // Verzögerte Initialisierung, damit TiageState Zeit hat zu laden
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            // Kurze Verzögerung für TiageState
            setTimeout(initFromState, 100);
        });
    } else {
        // DOM bereits geladen
        setTimeout(initFromState, 100);
    }

})();
