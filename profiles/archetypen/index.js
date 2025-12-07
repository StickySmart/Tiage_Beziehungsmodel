/**
 * ARCHETYPEN PROFILE INDEX
 *
 * Lädt alle Archetyp-Profile und stellt sie als einheitliches Objekt bereit.
 * Konvertiert die kategorisierte Struktur in flache kernbeduerfnisse für Kompatibilität.
 */

(function() {
    'use strict';

    /**
     * Konvertiert ein kategorisiertes Profil in flache kernbeduerfnisse
     * @param {Object} profil - Profil mit beduerfnisse.kategorie.bedürfnis Struktur
     * @returns {Object} Flaches Objekt mit allen Bedürfnissen
     */
    function flattenBeduerfnisse(profil) {
        if (!profil || !profil.beduerfnisse) return {};

        const flat = {};
        const kategorien = profil.beduerfnisse;

        // Alle Kategorien durchgehen
        Object.keys(kategorien).forEach(kategorie => {
            const beduerfnisse = kategorien[kategorie];
            if (typeof beduerfnisse === 'object') {
                // Alle Bedürfnisse der Kategorie zum flachen Objekt hinzufügen
                Object.keys(beduerfnisse).forEach(bed => {
                    flat[bed] = beduerfnisse[bed];
                });
            }
        });

        return flat;
    }

    /**
     * Konvertiert ein neues Profil-Format ins alte archetypProfile Format
     * @param {Object} profil - Neues Profil
     * @returns {Object} Altes Format für Kompatibilität
     */
    function convertToLegacyFormat(profil) {
        return {
            name: profil.name,
            beschreibung: profil.beschreibung,
            kernbeduerfnisse: flattenBeduerfnisse(profil),
            // Zusätzliche Metadaten
            quellen: profil.quellen || [],
            kernwerte: profil.kernwerte || [],
            vermeidet: profil.vermeidet || [],
            // Originale kategorisierte Struktur behalten
            beduerfnisseKategorisiert: profil.beduerfnisse
        };
    }

    /**
     * Wartet auf alle Profile und baut das archetypProfile Objekt
     */
    function initArchetypProfile() {
        const profile = {};

        // Profile aus globalen Variablen laden (werden durch separate Script-Tags geladen)
        const profilQuellen = {
            'single': window.SingleProfil,
            'duo': window.DuoProfil,
            'duo-flex': window.DuoFlexProfil,
            'solopoly': window.SolopolyProfil,
            'polyamor': window.PolyamorProfil,
            'ra': window.RAProfil,
            'lat': window.LATProfil,
            'aromantisch': window.AromantischProfil
        };

        // Alle verfügbaren Profile konvertieren
        Object.keys(profilQuellen).forEach(key => {
            const profil = profilQuellen[key];
            if (profil) {
                profile[key] = convertToLegacyFormat(profil);
                console.log(`Archetyp-Profil geladen: ${key} (${Object.keys(profile[key].kernbeduerfnisse).length} Bedürfnisse)`);
            } else {
                console.warn(`Archetyp-Profil nicht gefunden: ${key}`);
            }
        });

        return profile;
    }

    // Globale Hilfsfunktionen exportieren
    window.ArchetypProfileLoader = {
        flattenBeduerfnisse: flattenBeduerfnisse,
        convertToLegacyFormat: convertToLegacyFormat,
        initArchetypProfile: initArchetypProfile
    };

    // Sofort initialisieren (Profile-Scripts wurden bereits synchron geladen)
    window.LoadedArchetypProfile = initArchetypProfile();

    console.log('ArchetypProfile geladen:', Object.keys(window.LoadedArchetypProfile).length, 'Profile');

})();
