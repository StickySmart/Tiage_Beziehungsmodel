/**
 * ARCHETYPEN PROFILE INDEX v2.0
 *
 * Lädt alle Archetyp-Profile und stellt sie als einheitliches Objekt bereit.
 * Konvertiert die kategorisierte Struktur in flache kernbeduerfnisse für Kompatibilität.
 *
 * NEU in v2.0:
 * - flattenZuIds(): Konvertiert flache Bedürfnisse zu #IDs
 * - getProfilMitIds(): Holt ein Profil mit #IDs statt String-Keys
 * - Integration mit BeduerfnisIds für #ID-System
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

    /**
     * Konvertiert flache Bedürfnisse zu #IDs
     * @param {Object} flat - Flaches Bedürfnis-Objekt mit String-Keys
     * @returns {Object} Objekt mit #IDs als Keys
     */
    function flattenZuIds(flat) {
        if (!flat) return {};
        if (typeof window !== 'undefined' && window.BeduerfnisIds) {
            return window.BeduerfnisIds.objectToIds(flat);
        }
        return flat;
    }

    /**
     * Holt ein Profil mit #IDs statt String-Keys
     * @param {string} key - Der Archetyp-Key (z.B. 'single', 'duo')
     * @returns {Object|null} Profil mit kernbeduerfnisse als #IDs
     */
    function getProfilMitIds(key) {
        const profil = window.LoadedArchetypProfile && window.LoadedArchetypProfile[key];
        if (!profil) return null;

        return {
            name: profil.name,
            beschreibung: profil.beschreibung,
            kernbeduerfnisse: flattenZuIds(profil.kernbeduerfnisse),
            quellen: profil.quellen || [],
            kernwerte: profil.kernwerte || [],
            vermeidet: profil.vermeidet || [],
            beduerfnisseKategorisiert: profil.beduerfnisseKategorisiert
        };
    }

    /**
     * Holt alle Profile mit #IDs
     * @returns {Object} Alle Profile mit #IDs
     */
    function getAlleProfileMitIds() {
        const result = {};
        if (!window.LoadedArchetypProfile) return result;

        Object.keys(window.LoadedArchetypProfile).forEach(key => {
            result[key] = getProfilMitIds(key);
        });

        return result;
    }

    // Globale Hilfsfunktionen exportieren
    window.ArchetypProfileLoader = {
        flattenBeduerfnisse: flattenBeduerfnisse,
        convertToLegacyFormat: convertToLegacyFormat,
        initArchetypProfile: initArchetypProfile,
        // v2.0 Funktionen
        flattenZuIds: flattenZuIds,
        getProfilMitIds: getProfilMitIds,
        getAlleProfileMitIds: getAlleProfileMitIds
    };

    // Sofort initialisieren (Profile-Scripts wurden bereits synchron geladen)
    window.LoadedArchetypProfile = initArchetypProfile();

    console.log('ArchetypProfile geladen:', Object.keys(window.LoadedArchetypProfile).length, 'Profile');

})();
