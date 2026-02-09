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
 * - flatNeeds = BaseArchetypProfile[archetyp].umfrageWerte + ProfileModifiers.calculateProfileDeltas()
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
            // Statistische Umfragewerte für alle ~220 Bedürfnisse
            umfrageWerte: profil.beduerfnisse,
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
     * Default-Gewichtungen - NEW 3-way format (0=Egal, 1=Normal, 2=Wichtig)
     * @returns {Object} Default-Werte für O, A, D, G
     */
    function getDefaultGewichtungen() {
        return {
            O: 1,  // Orientierung: 1 = Normal
            A: 1,  // Archetyp: 1 = Normal
            D: 1,  // Dominanz: 1 = Normal
            G: 1   // Geschlecht: 1 = Normal
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
    // Event feuern wenn alle 8 Profile geladen sind
    // Andere Module (z.B. ArchetypeMatrixCalculator) können darauf warten
    // ═══════════════════════════════════════════════════════════════════════════
    if (loadedCount === 8) {
        window.dispatchEvent(new CustomEvent('base-archetype-profiles-ready', {
            detail: { count: loadedCount, profiles: Object.keys(window.BaseArchetypProfile) }
        }));
        console.log('[BaseArchetypProfile] Event "base-archetype-profiles-ready" gefeuert');
    } else {
        console.warn('[BaseArchetypProfile] Nicht alle Profile geladen! Erwartet: 8, Geladen:', loadedCount);
        // Trotzdem Event feuern damit andere Module nicht ewig warten
        window.dispatchEvent(new CustomEvent('base-archetype-profiles-ready', {
            detail: { count: loadedCount, profiles: Object.keys(window.BaseArchetypProfile), incomplete: true }
        }));
    }

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
                // v3.2: Mit Clamping (0.5-1.5 → 0-1)
                if (typeof TiageState !== 'undefined') {
                    TiageState.setResonanzFaktoren(person, value);
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
                if (value.resonanzFaktoren) TiageState.setResonanzFaktoren('ich', value.resonanzFaktoren);
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
                if (value.resonanzFaktoren) TiageState.setResonanzFaktoren('partner', value.resonanzFaktoren);
            }
        }
    };

    console.log('[LoadedArchetypProfile] View auf TiageState aktiviert (SSOT)');

    // ═══════════════════════════════════════════════════════════════════════════
    // 3. PROFILE CALCULATOR - Berechnet und lädt Profile
    // ═══════════════════════════════════════════════════════════════════════════

    // Flag um doppelte Neuberechnungs-Trigger zu vermeiden (BeduerfnisIds race condition)
    let beduerfnisIdsLoadCallbackScheduled = false;

    // FIX v1.8.868: Flag um Endlosschleife bei Subscriber-Kaskade zu verhindern
    // Wenn recalculateFlatNeedsForPerson läuft, darf es nicht erneut aufgerufen werden
    let isRecalculating = false;

    /**
     * Wendet Deltas auf flatNeeds an (interne Hilfsfunktion)
     * Erwartet dass BeduerfnisIds bereits geladen ist!
     *
     * @param {Object} flatNeeds - Die zu modifizierenden flatNeeds
     * @param {Object} deltas - Die anzuwendenden Deltas { stringKey: deltaValue }
     * @returns {void}
     */
    function applyDeltasToFlatNeeds(flatNeeds, deltas) {
        let appliedCount = 0;
        const appliedDeltas = [];

        Object.keys(deltas).forEach(stringKey => {
            // Convert string key to #ID for lookup in flatNeeds (which uses #ID keys)
            const hashId = (typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.toId)
                ? BeduerfnisIds.toId(stringKey)
                : stringKey;

            if (flatNeeds[hashId] !== undefined) {
                const oldVal = flatNeeds[hashId];
                // Wert modifizieren (keine Obergrenze, nur >= 0)
                flatNeeds[hashId] = Math.max(0, flatNeeds[hashId] + deltas[stringKey]);
                appliedDeltas.push(`${stringKey} (${hashId}): ${oldVal} → ${flatNeeds[hashId]}`);
                appliedCount++;
            } else if (flatNeeds[stringKey] !== undefined) {
                const oldVal = flatNeeds[stringKey];
                // Fallback: try direct string key lookup
                flatNeeds[stringKey] = Math.max(0, flatNeeds[stringKey] + deltas[stringKey]);
                appliedDeltas.push(`${stringKey}: ${oldVal} → ${flatNeeds[stringKey]}`);
                appliedCount++;
            } else {
                // Nur beim ersten Mal loggen um Spam zu vermeiden
                if (!window._deltaKeyWarningsShown) window._deltaKeyWarningsShown = new Set();
                if (!window._deltaKeyWarningsShown.has(stringKey)) {
                    window._deltaKeyWarningsShown.add(stringKey);
                    console.info(`[ProfileCalculator] Delta-Key nicht in Basis-Profil: ${stringKey}`);
                }
            }
        });

        // DEBUG DISABLED v1.8.871: Zu viel Spam bei Best-Match (Hunderte Kombinationen)
        // console.log('[ProfileCalculator] Modifier angewendet:', appliedCount, 'von', Object.keys(deltas).length, 'Deltas');
        // if (appliedDeltas.length > 0) {
        //     console.log('[ProfileCalculator] Angewendete Deltas:', appliedDeltas);
        // }
    }

    /**
     * Berechnet flatNeeds aus Basis + Modifier
     *
     * @param {string} archetyp - Archetyp-Key (z.B. 'single')
     * @param {Object} geschlecht - { primary, secondary }
     * @param {Object} dominanz - { primary, secondary }
     * @param {Object} orientierung - { primary, secondary }
     * @param {Object} geschlecht_extras - { fit: bool, fuckedup: bool, horny: bool } (v4.2 FFH)
     * @returns {Object} Berechnete flatNeeds { '#B1': value, ... }
     */
    function calculateFlatNeeds(archetyp, geschlecht, dominanz, orientierung, geschlecht_extras) {
        // 1. Basis-Bedürfnisse holen
        const baseProfil = window.BaseArchetypProfile[archetyp];
        if (!baseProfil || !baseProfil.umfrageWerte) {
            console.warn('[ProfileCalculator] Basis-Profil nicht gefunden:', archetyp);
            return {};
        }

        // Kopie der Umfragewerte (SSOT für statistische Basis-Werte)
        const flatNeeds = { ...baseProfil.umfrageWerte };

        // 2. Modifier berechnen und anwenden
        if (window.ProfileModifiers) {
            // SSOT v3.10: Vollständige Orientierung übergeben (P+S)
            // ProfileModifiers.calculateProfileDeltas() verarbeitet P/S mit Gewichtung
            // v4.2: FFH (Fit, Fucked up, Horny) hinzugefügt
            const profileContext = {
                geschlecht: geschlecht,
                dominanz: dominanz?.primary || dominanz,
                orientierung: orientierung,  // Vollständiges Objekt: { primary, secondary }
                geschlecht_extras: geschlecht_extras || {}  // v4.2: FFH Modifier
            };

            const deltas = window.ProfileModifiers.calculateProfileDeltas(profileContext);

            // DEBUG: Log berechnete Deltas (DISABLED v1.8.868: Message overflow)
            // console.log('[ProfileCalculator] GOD-Deltas berechnet:', {
            //     profileContext: profileContext,
            //     deltasCount: deltas ? Object.keys(deltas).length : 0,
            //     deltas: deltas
            // });

            if (deltas && Object.keys(deltas).length > 0) {
                // Prüfe ob BeduerfnisIds geladen ist (async loading race condition fix)
                const beduerfnisIdsReady = typeof BeduerfnisIds !== 'undefined' &&
                                           BeduerfnisIds._loaded === true;

                if (beduerfnisIdsReady) {
                    // BeduerfnisIds ist geladen - Deltas sofort anwenden
                    applyDeltasToFlatNeeds(flatNeeds, deltas);
                } else if (typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds._loadPromise) {
                    // BeduerfnisIds lädt noch - warte auf Laden und triggere Neuberechnung
                    // Aber nur einmal pro Seitenladung (verhindere mehrfache Callbacks)
                    if (!beduerfnisIdsLoadCallbackScheduled) {
                        beduerfnisIdsLoadCallbackScheduled = true;
                        console.log('[ProfileCalculator] BeduerfnisIds lädt noch - Neuberechnung wird nach Laden ausgeführt');

                        // Nach dem Laden von BeduerfnisIds: Neuberechnung für alle Personen triggern
                        BeduerfnisIds._loadPromise.then(() => {
                            console.log('[ProfileCalculator] BeduerfnisIds geladen - triggere Neuberechnung');

                            // Verwende recalculateFlatNeeds um korrekt mit TiageState zu arbeiten
                            // Das stellt sicher dass Locks respektiert werden und UI aktualisiert wird
                            if (typeof TiageState !== 'undefined') {
                                ['ich', 'partner'].forEach(person => {
                                    const personArchetyp = TiageState.get(`archetypes.${person}.primary`);
                                    if (personArchetyp) {
                                        recalculateFlatNeedsForPerson(person);
                                    }
                                });
                            }
                        }).catch(err => {
                            console.error('[ProfileCalculator] Fehler beim Laden von BeduerfnisIds:', err);
                        });
                    } else {
                        console.log('[ProfileCalculator] BeduerfnisIds lädt noch - Neuberechnung bereits geplant');
                    }
                } else {
                    // BeduerfnisIds nicht verfügbar - Warnung ausgeben
                    console.warn('[ProfileCalculator] BeduerfnisIds nicht verfügbar - Deltas können nicht angewendet werden');
                }
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
            // DEBUG DISABLED v1.8.871: Spam bei Best-Match
            // console.log('[ProfileCalculator] TiageSynthesis nicht verfügbar, verwende Defaults');
            return defaults;
        }

        if (!profileContext || !profileContext.archetyp || !profileContext.needs) {
            // DEBUG DISABLED v1.8.871: Spam bei Best-Match
            // console.log('[ProfileCalculator] Unvollständiger Profil-Kontext, verwende Defaults');
            return defaults;
        }

        // Berechne dimensionale Resonanzen (DEBUG DISABLED v1.8.868: Message overflow)
        // console.log('[ProfileCalculator] calculateDimensionalResonance aufgerufen mit:', {
        //     archetyp: profileContext.archetyp,
        //     needsCount: profileContext.needs ? Object.keys(profileContext.needs).length : 0,
        //     sampleNeeds: profileContext.needs ? Object.keys(profileContext.needs).slice(0, 5) : []
        // });
        const resonanz = TiageSynthesis.NeedsIntegration.calculateDimensionalResonance(profileContext);

        if (!resonanz || !resonanz.enabled) {
            // DEBUG DISABLED v1.8.871: Spam bei Best-Match
            // console.log('[ProfileCalculator] Resonanz-Berechnung nicht aktiviert, verwende Defaults', {
            //     resonanz: resonanz,
            //     enabled: resonanz?.enabled
            // });
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
        // v4.2: FFH (Fit, Fucked up, Horny)
        const geschlecht_extras = storageData.geschlecht_extras || {};

        // 3.1 flatNeeds berechnen (Basis + Modifikatoren, v4.2: mit FFH)
        const flatNeeds = calculateFlatNeeds(archetyp, geschlecht, dominanz, orientierung, geschlecht_extras);

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
        // SSOT v3.10: Vollständige Orientierung übergeben (P+S)
        const profileContext = {
            archetyp: archetyp,
            needs: flatNeeds,
            dominanz: dominanz?.primary || dominanz,
            orientierung: orientierung,  // Vollständiges Objekt: { primary, secondary }
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

            // flatNeeds setzen (NUR gelockte Werte behalten, Rest neu berechnen)
            // FIX v1.8.837: Bei Archetyp-Wechsel werden gelockte Werte aus profileReview geholt
            // Auto-Lock bei manueller Änderung sorgt dafür, dass User-Werte erhalten bleiben
            if (calculatedProfile.profileReview?.flatNeeds) {
                const calculatedNeeds = calculatedProfile.profileReview.flatNeeds;
                const lockedNeeds = TiageState.get(`profileReview.${person}.lockedNeeds`) || {};
                const lockedCount = Object.keys(lockedNeeds).length;

                // Neue flatNeeds: Berechnete Werte + gelockte Werte überschreiben
                const newFlatNeeds = { ...calculatedNeeds };

                // Gelockte Needs überschreiben die berechneten
                Object.keys(lockedNeeds).forEach(needId => {
                    newFlatNeeds[needId] = lockedNeeds[needId];
                });

                TiageState.set(`flatNeeds.${person}`, newFlatNeeds);
                console.log(`[ProfileCalculator] flatNeeds für ${person}: ${Object.keys(calculatedNeeds).length} berechnet, ${lockedCount} locked beibehalten`);
            }

            // gewichtungen: NUR setzen wenn noch keine vorhanden (NEW 3-way format)
            // AGOD-Modul verwaltet gewichtungen.ich - ProfileCalculator setzt nur Defaults
            const currentGewichtungen = TiageState.get(`gewichtungen.${person}`);
            const isNewFormat = currentGewichtungen &&
                typeof currentGewichtungen.O === 'number' &&
                currentGewichtungen.O >= 0 && currentGewichtungen.O <= 2;

            if (!isNewFormat) {
                // Keine gültigen gewichtungen vorhanden - setze Defaults
                const defaults = getDefaultGewichtungen();
                TiageState.set(`gewichtungen.${person}`, defaults);
                console.log(`[ProfileCalculator] gewichtungen.${person} auf Defaults gesetzt:`, defaults);
            }
            // Wenn bereits im NEW format: NICHT überschreiben!

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
                // v3.2: Mit Clamping (0.5-1.5 → 0-1)
                TiageState.setResonanzFaktoren(person, newResonanz);
                console.log(`[ProfileCalculator] resonanzFaktoren gesetzt für ${person} (clamped):`, JSON.stringify(newResonanz));
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

        // Subscriber-Registrierung (für expliziten Aufruf vor loadFromStorage)
        registerSubscribers: registerFlatNeedsSubscribers,

        // Defaults
        getDefaultGewichtungen: getDefaultGewichtungen,
        getDefaultResonanzFaktoren: getDefaultResonanzFaktoren,

        // Helper
        createEmptyProfile: createEmptyProfile
    };

    console.log('ProfileCalculator bereit');

    // ═══════════════════════════════════════════════════════════════════════════
    // 5. SSOT REACTIVE SUBSCRIBERS - Automatische flatNeeds-Aktualisierung
    // ═══════════════════════════════════════════════════════════════════════════
    //
    // Diese Subscriber stellen sicher, dass flatNeeds automatisch neu berechnet
    // werden, wenn sich der Archetyp oder die personDimensions ändern.
    // Das ist die korrekte SSOT-Architektur: Eine zentrale Stelle reagiert auf
    // State-Änderungen, statt manuelle Patches in der gesamten Anwendung.
    //
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Berechnet und aktualisiert flatNeeds für eine Person basierend auf aktuellem State
     * @param {string} person - 'ich' oder 'partner'
     */
    function recalculateFlatNeedsForPerson(person) {
        // FIX v1.8.868: Verhindere Endlosschleife durch Subscriber-Kaskade
        if (isRecalculating) return;

        if (typeof TiageState === 'undefined') return;

        // Hole aktuellen Archetyp
        const archetyp = TiageState.get(`archetypes.${person}.primary`);
        if (!archetyp) return;

        // Hole aktuelle Dimensionen
        const geschlecht = TiageState.get(`personDimensions.${person}.geschlecht`) || null;
        const dominanz = TiageState.get(`personDimensions.${person}.dominanz`) || null;
        const orientierung = TiageState.get(`personDimensions.${person}.orientierung`) || null;
        // v4.2: FFH (Fit, Fucked up, Horny)
        const geschlecht_extras = TiageState.get(`personDimensions.${person}.geschlecht_extras`) || {};

        // FIX v1.8.868: Flag setzen um Rekursion zu verhindern
        isRecalculating = true;

        try {
            // Berechne neue flatNeeds (v4.2: mit FFH)
            const calculatedFlatNeeds = calculateFlatNeeds(archetyp, geschlecht, dominanz, orientierung, geschlecht_extras);

            if (calculatedFlatNeeds && Object.keys(calculatedFlatNeeds).length > 0) {
                // FIX v1.8.837: NUR gelockte Werte behalten, Rest neu berechnen
                // Auto-Lock bei manueller Änderung sorgt für Persistenz
                const lockedNeeds = TiageState.getLockedNeeds?.(person) || {};

                // Berechnete Werte + gelockte Werte überschreiben
                const newFlatNeeds = { ...calculatedFlatNeeds };

                Object.keys(lockedNeeds).forEach(needId => {
                    newFlatNeeds[needId] = lockedNeeds[needId];
                });

                const currentFlatNeeds = TiageState.get(`flatNeeds.${person}`) || {};
                const needsChanged = JSON.stringify(newFlatNeeds) !== JSON.stringify(currentFlatNeeds);

                if (needsChanged) {
                    TiageState.set(`flatNeeds.${person}`, newFlatNeeds);
                }
            }
        } finally {
            // FIX v1.8.868: Flag zurücksetzen
            isRecalculating = false;
        }
    }

    /**
     * Berechnet und aktualisiert Resonanzfaktoren für eine Person basierend auf aktuellem State
     * SSOT: Wird reaktiv aufgerufen wenn sich Archetyp, Dimensionen oder flatNeeds ändern
     * @param {string} person - 'ich' oder 'partner'
     */
    function recalculateResonanzForPerson(person) {
        if (typeof TiageState === 'undefined') return;

        // Hole aktuellen Archetyp
        const archetyp = TiageState.get(`archetypes.${person}.primary`);
        if (!archetyp) return;

        // Hole aktuelle flatNeeds (werden für Resonanz-Berechnung benötigt)
        const flatNeeds = TiageState.get(`flatNeeds.${person}`) || {};

        // Hole aktuelle Dimensionen
        const geschlecht = TiageState.get(`personDimensions.${person}.geschlecht`) || null;
        const dominanz = TiageState.get(`personDimensions.${person}.dominanz`) || null;
        const orientierung = TiageState.get(`personDimensions.${person}.orientierung`) || null;

        // console.log(`[ProfileCalculator] recalculateResonanz für ${person.toUpperCase()}:`, { archetyp, needsCount: Object.keys(flatNeeds).length }); // DISABLED: Message overflow

        // Berechne Resonanzfaktoren
        const profileContext = {
            archetyp: archetyp,
            needs: flatNeeds,
            geschlecht: geschlecht,
            dominanz: dominanz,
            orientierung: orientierung
        };

        const calculatedResonanz = calculateResonanzFaktoren(profileContext);

        if (calculatedResonanz) {
            // Respektiere Locks: Nur nicht-gelockte R-Faktoren überschreiben
            const currentResonanz = TiageState.get(`resonanzFaktoren.${person}`) || {};
            const newResonanz = {};

            ['R1', 'R2', 'R3', 'R4'].forEach(key => {
                const current = currentResonanz[key];
                const calculated = calculatedResonanz[key];

                // Nur überschreiben wenn nicht locked
                if (!current?.locked) {
                    newResonanz[key] = calculated;
                } else {
                    newResonanz[key] = current;
                }
            });

            // Prüfe ob sich die Werte tatsächlich geändert haben
            const resonanzChanged = !currentResonanz.R1 ||
                JSON.stringify(newResonanz) !== JSON.stringify(currentResonanz);

            if (resonanzChanged) {
                TiageState.setResonanzFaktoren(person, newResonanz);
                // console.log(`[ProfileCalculator] Resonanzfaktoren reaktiv aktualisiert für ${person}:`, JSON.stringify(newResonanz)); // DISABLED: Message overflow
            }
        }
    }

    // Flag um doppelte Subscriber-Registrierung zu vermeiden
    let subscribersRegistered = false;

    /**
     * Registriert die Subscriber für automatische flatNeeds- und Resonanz-Aktualisierung
     * SSOT: Zentrale reaktive Updates bei State-Änderungen
     */
    function registerFlatNeedsSubscribers() {
        // Verhindere doppelte Registrierung
        if (subscribersRegistered) {
            return;
        }

        if (typeof TiageState === 'undefined' || typeof TiageState.subscribe !== 'function') {
            console.warn('[ProfileCalculator] TiageState.subscribe nicht verfügbar - reaktive Updates deaktiviert');
            return;
        }

        subscribersRegistered = true;

        // Subscriber für Archetyp-Änderungen
        // SSOT: Bei Archetyp-Wechsel werden flatNeeds UND Resonanzfaktoren neu berechnet
        // FIX v1.8.835: Überspringe während loadFromStorage() um gespeicherte User-Werte zu erhalten
        TiageState.subscribe('archetypes.ich', (event) => {
            if (TiageState.isLoading && TiageState.isLoading()) {
                console.log('[ProfileCalculator] Subscriber übersprungen während loadFromStorage (archetypes.ich)');
                return;
            }
            if (event.path === 'archetypes.ich.primary' || event.path === 'archetypes.ich') {
                recalculateFlatNeedsForPerson('ich');
                // Resonanz nach flatNeeds berechnen (braucht flatNeeds als Input)
                recalculateResonanzForPerson('ich');
            }
        });

        TiageState.subscribe('archetypes.partner', (event) => {
            if (TiageState.isLoading && TiageState.isLoading()) {
                console.log('[ProfileCalculator] Subscriber übersprungen während loadFromStorage (archetypes.partner)');
                return;
            }
            if (event.path === 'archetypes.partner.primary' || event.path === 'archetypes.partner') {
                recalculateFlatNeedsForPerson('partner');
                // Resonanz nach flatNeeds berechnen (braucht flatNeeds als Input)
                recalculateResonanzForPerson('partner');
            }
        });

        // Subscriber für Dimensions-Änderungen (geschlecht, dominanz, orientierung)
        // SSOT: Bei Dimensions-Änderung werden flatNeeds UND Resonanzfaktoren neu berechnet
        // FIX v1.8.835: Überspringe während loadFromStorage() um gespeicherte User-Werte zu erhalten
        TiageState.subscribe('personDimensions.ich', (event) => {
            if (TiageState.isLoading && TiageState.isLoading()) {
                console.log('[ProfileCalculator] Subscriber übersprungen während loadFromStorage (personDimensions.ich)');
                return;
            }
            recalculateFlatNeedsForPerson('ich');
            recalculateResonanzForPerson('ich');
        });

        TiageState.subscribe('personDimensions.partner', (event) => {
            if (TiageState.isLoading && TiageState.isLoading()) {
                console.log('[ProfileCalculator] Subscriber übersprungen während loadFromStorage (personDimensions.partner)');
                return;
            }
            recalculateFlatNeedsForPerson('partner');
            recalculateResonanzForPerson('partner');
        });

        console.log('[ProfileCalculator] SSOT Subscriber für reaktive flatNeeds- und Resonanz-Updates registriert');
    }

    // Subscriber nach kurzer Verzögerung registrieren (TiageState muss bereit sein)
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(registerFlatNeedsSubscribers, 50);
        });
    } else {
        setTimeout(registerFlatNeedsSubscribers, 50);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 6. AUTO-INITIALISIERUNG - Lade Profile aus TiageState nach DOM-Ready
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
