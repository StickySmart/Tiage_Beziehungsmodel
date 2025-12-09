/**
 * ARCHETYPEN PROFILE INDEX v2.0
 *
 * Lädt alle Archetyp-Profile und stellt sie als einheitliches Objekt bereit.
 * Konvertiert die kategorisierte Struktur in flache kernbeduerfnisse für Kompatibilität.
 *
 * NEU v2.0: #ID-Konvertierung via BeduerfnisIds-Modul
 * - flattenZuIds(profil): Flache Bedürfnisse mit #IDs
 * - getProfilMitIds(key): Komplettes Profil mit #ID-Bedürfnissen
 */

(function() {
    'use strict';

    /**
     * Lädt das BeduerfnisIds-Modul (lazy loading)
     */
    let _beduerfnisIds = null;
    function getBeduerfnisIds() {
        if (_beduerfnisIds) return _beduerfnisIds;

        if (typeof BeduerfnisIds !== 'undefined') {
            _beduerfnisIds = BeduerfnisIds;
        }
        return _beduerfnisIds;
    }

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
     * Konvertiert ein kategorisiertes Profil in flache kernbeduerfnisse mit #IDs
     * @param {Object} profil - Profil mit beduerfnisse.kategorie.bedürfnis Struktur
     * @returns {Object} Flaches Objekt mit #IDs als Keys
     */
    function flattenZuIds(profil) {
        const flat = flattenBeduerfnisse(profil);
        const ids = getBeduerfnisIds();

        if (!ids) return flat; // Fallback: String-Keys

        return ids.convertObjToIds(flat);
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

    /**
     * Gibt ein Profil mit #ID-basierten Bedürfnissen zurück
     * @param {string} key - Archetyp-Key (single, duo, etc.)
     * @returns {Object|null} Profil mit kernbeduerfnisseIds
     */
    function getProfilMitIds(key) {
        const profil = window.LoadedArchetypProfile && window.LoadedArchetypProfile[key];
        if (!profil) return null;

        const ids = getBeduerfnisIds();
        return {
            ...profil,
            kernbeduerfnisseIds: ids ? ids.convertObjToIds(profil.kernbeduerfnisse) : profil.kernbeduerfnisse
        };
    }

    /**
     * Gibt alle Profile mit #ID-basierten Bedürfnissen zurück
     * @returns {Object} Alle Profile mit kernbeduerfnisseIds
     */
    function getAlleProfileMitIds() {
        const result = {};
        const profile = window.LoadedArchetypProfile || {};

        Object.keys(profile).forEach(key => {
            result[key] = getProfilMitIds(key);
        });

        return result;
    }

    // Globale Hilfsfunktionen exportieren
    window.ArchetypProfileLoader = {
        flattenBeduerfnisse: flattenBeduerfnisse,
        flattenZuIds: flattenZuIds,
        convertToLegacyFormat: convertToLegacyFormat,
        initArchetypProfile: initArchetypProfile,
        getProfilMitIds: getProfilMitIds,
        getAlleProfileMitIds: getAlleProfileMitIds
    };

    // Sofort initialisieren (Profile-Scripts wurden bereits synchron geladen)
    window.LoadedArchetypProfile = initArchetypProfile();

    console.log('ArchetypProfile geladen:', Object.keys(window.LoadedArchetypProfile).length, 'Profile');

})();
