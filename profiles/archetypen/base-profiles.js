/**
 * BASE ARCHETYP PROFILES – minimale Initialisierung
 *
 * Erstellt window.BaseArchetypProfile aus den 8 geladenen Profil-Globals.
 * Nur für Seiten gedacht, die NICHT profiles/archetypen/index.js laden
 * (z.B. Synthese-Seiten, die TiageState als SSOT nutzen und den
 * ProfileCalculator bewusst weglassen).
 *
 * Seiten mit index.js müssen diese Datei NICHT laden – index.js erstellt
 * BaseArchetypProfile selbst.
 */

(function() {
    'use strict';

    if (window.BaseArchetypProfile && Object.keys(window.BaseArchetypProfile).length > 0) {
        return; // Bereits durch index.js erstellt
    }

    var quellen = {
        'single':      window.SingleProfil,
        'duo':         window.DuoProfil,
        'duo_flex':    window.DuoFlexProfil,
        'solopoly':    window.SolopolyProfil,
        'polyamor':    window.PolyamorProfil,
        'ra':          window.RAProfil,
        'lat':         window.LATProfil,
        'aromantisch': window.AromantischProfil
    };

    window.BaseArchetypProfile = {};
    var geladen = 0;

    Object.keys(quellen).forEach(function(key) {
        var profil = quellen[key];
        if (!profil || !profil.umfrageWerte) {
            console.warn('[BaseProfiles] Profil fehlt oder hat kein umfrageWerte:', key);
            return;
        }
        window.BaseArchetypProfile[key] = {
            id:           profil.id || key,
            key:          key,
            label:        profil.name,
            name:         profil.name,
            beschreibung: profil.beschreibung,
            umfrageWerte: profil.umfrageWerte,
            quellen:      profil.quellen      || [],
            kernwerte:    profil.kernwerte     || [],
            vermeidet:    profil.vermeidet     || []
        };
        geladen++;
    });

    console.log('[BaseProfiles] BaseArchetypProfile erstellt:', geladen, 'Profile');
})();
