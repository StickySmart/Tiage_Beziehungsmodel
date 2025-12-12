/**
 * ARCHETYPEN PROFILE INDEX v3.1
 *
 * Lädt alle 8 Archetyp-Profile und stellt sie als window.LoadedArchetypProfile bereit.
 * Profile sind bereits im flachen #ID-Format - keine Konvertierung nötig.
 *
 * Einheitliche Struktur (wie Perspektive, Dimension, Kategorie):
 * { id, key, label, beschreibung, ... }
 */

(function() {
    'use strict';

    /**
     * Formatiert ein Profil für LoadedArchetypProfile
     * Einheitliche Struktur: { id, key, label, beschreibung, ... }
     *
     * @param {Object} profil - Roh-Profil aus window.*Profil
     * @param {string} key - Der Schlüssel (z.B. 'single', 'duo')
     * @returns {Object|null} Formatiertes Profil
     */
    function formatProfile(profil, key) {
        if (!profil) return null;
        return {
            // Einheitliche Struktur
            id: profil.id || key,
            key: key,
            label: profil.name,
            // Abwärtskompatibilität
            name: profil.name,
            // Inhalt
            beschreibung: profil.beschreibung,
            kernbeduerfnisse: profil.beduerfnisse,
            quellen: profil.quellen || [],
            kernwerte: profil.kernwerte || [],
            vermeidet: profil.vermeidet || []
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
