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
     * Lädt das BeduerfnisIds-Modul (lazy loading)
     */
    let _beduerfnisIds = null;
    function getBeduerfnisIds() {
        if (_beduerfnisIds) return _beduerfnisIds;

        if (typeof window !== 'undefined' && window.BeduerfnisIds) {
            _beduerfnisIds = window.BeduerfnisIds;
        } else if (typeof BeduerfnisIds !== 'undefined') {
            _beduerfnisIds = BeduerfnisIds;
        }
        return _beduerfnisIds;
    }

    /**
     * Konvertiert ein Profil in flache kernbeduerfnisse (String-Keys)
     * Unterstützt zwei Formate:
     * 1. Flaches #ID-Format: { '#B1': 50, '#B2': 60, ... }
     * 2. Verschachteltes Kategorie-Format: { kategorie: { bed1: 50, bed2: 60 }, ... }
     *
     * @param {Object} profil - Profil mit beduerfnisse
     * @returns {Object} Flaches Objekt mit String-Keys
     */
    function flattenBeduerfnisse(profil) {
        if (!profil || !profil.beduerfnisse) return {};

        const beduerfnisse = profil.beduerfnisse;
        const keys = Object.keys(beduerfnisse);

        // Erkennung: Flaches #ID-Format wenn erster Key mit '#' beginnt
        if (keys.length > 0 && keys[0].startsWith('#')) {
            // Neues flaches #ID-Format -> zu String-Keys konvertieren
            const ids = getBeduerfnisIds();
            if (ids && ids.convertObjToKeys) {
                return ids.convertObjToKeys(beduerfnisse);
            }
            // Fallback: IDs direkt zurückgeben wenn keine Konvertierung möglich
            return beduerfnisse;
        }

        // Altes verschachteltes Kategorie-Format
        const flat = {};
        keys.forEach(kategorie => {
            const katBeduerfnisse = beduerfnisse[kategorie];
            if (typeof katBeduerfnisse === 'object' && katBeduerfnisse !== null) {
                // Alle Bedürfnisse der Kategorie zum flachen Objekt hinzufügen
                Object.keys(katBeduerfnisse).forEach(bed => {
                    flat[bed] = katBeduerfnisse[bed];
                });
            }
        });

        return flat;
    }

    /**
     * Konvertiert flache Bedürfnisse zu #IDs
     * @param {Object} flat - Flaches Bedürfnis-Objekt mit String-Keys
     * @returns {Object} Objekt mit #IDs als Keys
     */
    function flattenZuIds(flat) {
        if (!flat) return {};
        const ids = getBeduerfnisIds();
        if (ids && ids.objectToIds) {
            return ids.objectToIds(flat);
        }
        return flat; // Fallback: String-Keys
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
            kernbeduerfnisseIds: flattenZuIds(profil.kernbeduerfnisse), // Alias für Kompatibilität
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
