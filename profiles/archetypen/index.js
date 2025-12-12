/**
 * ARCHETYPEN PROFILE INDEX v3.0 (Simplified)
 *
 * Lädt alle 8 Archetyp-Profile und stellt sie als window.LoadedArchetypProfile bereit.
 * Profile sind bereits im flachen #ID-Format - keine Konvertierung nötig.
 */

(function() {
    'use strict';

    /**
     * Formatiert ein Profil für LoadedArchetypProfile
     * @param {Object} profil - Roh-Profil aus window.*Profil
     * @returns {Object|null} Formatiertes Profil
     */
    function formatProfile(profil) {
        if (!profil) return null;
        return {
            name: profil.name,
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
        const formatted = formatProfile(profilQuellen[key]);
        if (formatted) {
            window.LoadedArchetypProfile[key] = formatted;
            loadedCount++;
        } else {
            console.warn(`Archetyp-Profil nicht gefunden: ${key}`);
        }
    });

    console.log('ArchetypProfile geladen:', loadedCount, 'Profile');

})();
