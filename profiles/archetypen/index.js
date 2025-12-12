/**
 * ARCHETYPEN PROFILE INDEX v4.0
 *
 * Lädt alle 8 Archetyp-Profile und stellt sie als window.LoadedArchetypProfile bereit.
 * Profile verwenden die v3.0 Datenstruktur für Konsistenz mit gespeicherten Profilen.
 *
 * Struktur (v3.0 kompatibel):
 * {
 *   archetyp, geschlecht, dominanz, orientierung,
 *   profileReview: { flatNeeds: {...} },
 *   gewichtungen, resonanzFaktoren,
 *   // Meta
 *   id, key, label, name, beschreibung, quellen, kernwerte, vermeidet
 * }
 */

(function() {
    'use strict';

    /**
     * Formatiert ein Profil für LoadedArchetypProfile
     * Verwendet v3.0 Datenstruktur
     *
     * @param {Object} profil - Roh-Profil aus window.*Profil
     * @param {string} key - Der Schlüssel (z.B. 'single', 'duo')
     * @returns {Object|null} Formatiertes Profil
     */
    function formatProfile(profil, key) {
        if (!profil) return null;
        return {
            // v3.0 Datenstruktur
            archetyp: key,
            geschlecht: null,
            dominanz: null,
            orientierung: null,
            profileReview: {
                flatNeeds: profil.beduerfnisse || {}
            },
            gewichtungen: null,
            resonanzFaktoren: null,

            // Meta (für Anzeige & Abwärtskompatibilität)
            id: profil.id || key,
            key: key,
            label: profil.name,
            name: profil.name,
            beschreibung: profil.beschreibung,
            quellen: profil.quellen || [],
            kernwerte: profil.kernwerte || [],
            vermeidet: profil.vermeidet || [],

            // Abwärtskompatibilität (deprecated, use profileReview.flatNeeds)
            kernbeduerfnisse: profil.beduerfnisse
        };
    }

    // Alle 8 Profile sammeln
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

    // LoadedArchetypProfile erstellen
    window.LoadedArchetypProfile = {};
    let loadedCount = 0;

    Object.keys(profilQuellen).forEach(key => {
        const formatted = formatProfile(profilQuellen[key], key);
        if (formatted) {
            window.LoadedArchetypProfile[key] = formatted;
            loadedCount++;
        } else {
            console.warn(`Archetyp-Profil nicht gefunden: ${key}`);
        }
    });

    console.log('ArchetypProfile geladen:', loadedCount, 'Profile');

})();
