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
 * - flatNeeds = BaseArchetypProfile[archetyp].beduerfnisse + ProfileModifiers.calculateProfileDeltas()
 * - gewichtungen = Defaults { O: 40, A: 25, D: 20, G: 15 } oder aus Storage
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
            // Basis-Bedürfnisse (Startwerte)
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
     * Default-Gewichtungen
     * @returns {Object} Default-Werte für O, A, D, G
     */
    function getDefaultGewichtungen() {
        return {
            O: { value: 40, locked: false },  // Orientierung
            A: { value: 25, locked: false },  // Archetyp
            D: { value: 20, locked: false },  // Dominanz
            G: { value: 15, locked: false }   // Geschlecht
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
    // 2. LOADED ARCHETYP PROFILE - Geladene Benutzer-Profile (v3.0 Struktur)
    // ═══════════════════════════════════════════════════════════════════════════

    window.LoadedArchetypProfile = {
        ich: createEmptyProfile(),
        partner: createEmptyProfile()
    };

    console.log('LoadedArchetypProfile initialisiert: ich + partner');

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
                // Deltas anwenden
                Object.keys(deltas).forEach(key => {
                    if (flatNeeds[key] !== undefined) {
                        // Wert modifizieren und auf 0-100 begrenzen
                        flatNeeds[key] = Math.min(100, Math.max(0, flatNeeds[key] + deltas[key]));
                    }
                });
                console.log('[ProfileCalculator] Modifier angewendet:', Object.keys(deltas).length, 'Deltas');
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
        const resonanz = TiageSynthesis.NeedsIntegration.calculateDimensionalResonance(profileContext);

        if (!resonanz || !resonanz.enabled) {
            console.log('[ProfileCalculator] Resonanz-Berechnung nicht aktiviert, verwende Defaults');
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

        // 3.1 flatNeeds berechnen
        const flatNeeds = calculateFlatNeeds(archetyp, geschlecht, dominanz, orientierung);

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
        window.LoadedArchetypProfile[person] = calculatedProfile;

        console.log(`[ProfileCalculator] Profil geladen: ${person}`, {
            archetyp: calculatedProfile.archetyp,
            flatNeedsCount: Object.keys(calculatedProfile.profileReview.flatNeeds).length,
            hasGewichtungen: !!calculatedProfile.gewichtungen,
            hasResonanz: !!calculatedProfile.resonanzFaktoren
        });

        return true;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // 4. EXPORT - API für externe Nutzung
    // ═══════════════════════════════════════════════════════════════════════════

    window.ProfileCalculator = {
        // Berechnung
        calculateFlatNeeds: calculateFlatNeeds,
        calculateResonanzFaktoren: calculateResonanzFaktoren,
        calculateProfile: calculateProfile,

        // Laden
        loadProfile: loadProfile,

        // Defaults
        getDefaultGewichtungen: getDefaultGewichtungen,
        getDefaultResonanzFaktoren: getDefaultResonanzFaktoren,

        // Helper
        createEmptyProfile: createEmptyProfile
    };

    console.log('ProfileCalculator bereit');

})();
