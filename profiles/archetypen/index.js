/**
 * ARCHETYPEN PROFILE INDEX v5.0
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
 *   ich: { archetyp, geschlecht, dominanz, orientierung, profileReview: { flatNeeds }, gewichtungen, resonanzFaktoren, ... },
 *   partner: { ... }
 * }
 */

(function() {
    'use strict';

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

    window.LoadedArchetypProfile = {
        ich: createEmptyProfile(),
        partner: createEmptyProfile()
    };

    console.log('LoadedArchetypProfile initialisiert: ich + partner (leer, wird vom MemoryManager befüllt)');

})();
