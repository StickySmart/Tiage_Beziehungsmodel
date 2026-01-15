/**
 * PROFILE MODIFIERS INDEX
 *
 * Lädt alle Modifier (Gender, Dominanz, Orientierung) und stellt sie als einheitliches Objekt bereit.
 * Ermöglicht die Berechnung von Bedürfnis-Deltas basierend auf Profil-Faktoren.
 */

(function() {
    'use strict';

    // TiageModifiers-Namespace initialisieren
    window.TiageModifiers = window.TiageModifiers || {};
    window.TiageModifiers.Gender = window.TiageModifiers.Gender || {};
    window.TiageModifiers.Dominanz = window.TiageModifiers.Dominanz || {};
    window.TiageModifiers.Orientierung = window.TiageModifiers.Orientierung || {};

    /**
     * Mapper von Profil-Werten zu Modifier-Keys
     * v4.0: Vereinfacht - Geschlecht ist jetzt ein String
     */
    const GENDER_MAP_V4 = {
        'mann': 'Mann',
        'frau': 'Frau',
        'nonbinaer': 'Nonbinaer'
    };

    // LEGACY: Alte Map für Rückwärtskompatibilität mit altem Format
    const GENDER_IDENTITY_MAP = {
        // Mann + Identität (Cis, Trans, Nonbinär)
        'mann-cis': 'Mann',           // v4.0: → Mann
        'mann-trans': 'Frau',         // v4.0: Trans-Mann → Frau (Identität)
        'mann-nonbinaer': 'Nonbinaer',
        // Frau + Identität (Cis, Trans, Nonbinär)
        'frau-cis': 'Frau',           // v4.0: → Frau
        'frau-trans': 'Mann',         // v4.0: Trans-Frau → Mann (Identität)
        'frau-nonbinaer': 'Nonbinaer',
        // Inter + Identität (Nonbinär, Fluid, Suchend)
        'inter-nonbinaer': 'Nonbinaer',
        'inter-fluid': 'Nonbinaer',
        'inter-suchend': 'Nonbinaer'
    };

    const DOMINANZ_MAP = {
        'dominant': 'Dominant',
        'submissiv': 'Submissiv',
        'switch': 'Switch',
        'vanilla': 'Ausgeglichen',
        'ausgeglichen': 'Ausgeglichen'
    };

    // v4.0: Orientierung ist jetzt Multi-Select Array
    const ORIENTIERUNG_MAP_V4 = {
        'heterosexuell': 'Heterosexuell',
        'gay_lesbisch': 'Bisexuell',      // Mapped to Bisexuell (keine eigene Modifier-Datei)
        'bisexuell': 'Bisexuell',
        'pansexuell_queer': 'Bisexuell'   // Mapped to Bisexuell (TODO: eigener Modifier)
    };

    // LEGACY: Alte Map für Rückwärtskompatibilität
    const ORIENTIERUNG_MAP = {
        'heterosexuell': 'Heterosexuell',
        'homosexuell': 'Bisexuell',       // v4.0: → Bisexuell
        'bisexuell': 'Bisexuell',
        'bihomo': 'Bisexuell',
        'pansexuell': 'Bisexuell'
    };

    /**
     * Holt einen Gender-Modifier (v4.0)
     *
     * v4.0: Akzeptiert einen String ('mann', 'frau', 'nonbinaer')
     * LEGACY: Akzeptiert auch primary+secondary für Rückwärtskompatibilität
     *
     * @param {string} geschlechtOrPrimary - v4.0: 'mann'/'frau'/'nonbinaer' | LEGACY: Körper
     * @param {string} [secondary] - LEGACY: Identität (cis, trans, nonbinaer, fluid)
     * @returns {Object|null} Modifier-Objekt mit deltas
     */
    function getGenderModifier(geschlechtOrPrimary, secondary) {
        if (!geschlechtOrPrimary || typeof geschlechtOrPrimary !== 'string') return null;

        let modifierKey;

        // v4.0: Einfacher String (kein secondary übergeben)
        if (!secondary) {
            const key = geschlechtOrPrimary.toLowerCase();
            modifierKey = GENDER_MAP_V4[key];
        } else {
            // LEGACY: primary + secondary Format
            const key = (geschlechtOrPrimary + '-' + secondary).toLowerCase();
            modifierKey = GENDER_IDENTITY_MAP[key];
        }

        if (modifierKey && TiageModifiers.Gender[modifierKey]) {
            return TiageModifiers.Gender[modifierKey];
        }

        console.warn('[ModifierLoader] Gender-Modifier nicht gefunden:', geschlechtOrPrimary, secondary || '');
        return null;
    }

    /**
     * Holt einen Dominanz-Modifier
     * @param {string} dominanz - dominant, submissiv, switch, vanilla
     * @returns {Object|null} Modifier-Objekt mit deltas
     */
    function getDominanzModifier(dominanz) {
        if (!dominanz || typeof dominanz !== 'string') return null;

        const key = dominanz.toLowerCase();
        const modifierKey = DOMINANZ_MAP[key];

        if (modifierKey && TiageModifiers.Dominanz[modifierKey]) {
            return TiageModifiers.Dominanz[modifierKey];
        }

        return null;
    }

    /**
     * Holt einen Orientierungs-Modifier (v4.0)
     * @param {string} orientierung - v4.0: heterosexuell, gay_lesbisch, bisexuell, pansexuell_queer
     * @returns {Object|null} Modifier-Objekt mit deltas
     */
    function getOrientierungModifier(orientierung) {
        if (!orientierung || typeof orientierung !== 'string') return null;

        const key = orientierung.toLowerCase();
        // v4.0 zuerst versuchen, dann Legacy
        const modifierKey = ORIENTIERUNG_MAP_V4[key] || ORIENTIERUNG_MAP[key];

        if (modifierKey && TiageModifiers.Orientierung[modifierKey]) {
            return TiageModifiers.Orientierung[modifierKey];
        }

        return null;
    }

    /**
     * Berechnet alle Deltas für ein Profil (v4.0)
     *
     * v4.0: geschlecht ist String, orientierung ist Array
     * LEGACY: Unterstützt auch alte Formate
     *
     * @param {Object} profile - Profil mit geschlecht, dominanz, orientierung
     * @returns {Object} Kombinierte Deltas aus allen Modifiern
     */
    function calculateProfileDeltas(profile) {
        const deltas = {};

        // Gender-Modifier (v4.0: String, LEGACY: { primary, secondary })
        if (profile.geschlecht) {
            let genderMod;

            if (typeof profile.geschlecht === 'string') {
                // v4.0: Einfacher String
                genderMod = getGenderModifier(profile.geschlecht);
            } else if (typeof profile.geschlecht === 'object') {
                // LEGACY: { primary, secondary } Format
                const primary = profile.geschlecht.primary;
                const secondary = profile.geschlecht.secondary || 'cis';
                genderMod = getGenderModifier(primary, secondary);
            }

            if (genderMod && genderMod.deltas) {
                Object.keys(genderMod.deltas).forEach(key => {
                    deltas[key] = (deltas[key] || 0) + genderMod.deltas[key];
                });
            }
        }

        // Dominanz-Modifier
        if (profile.dominanz) {
            const dominanzVal = typeof profile.dominanz === 'object'
                ? profile.dominanz.primary
                : profile.dominanz;
            const dominanzMod = getDominanzModifier(dominanzVal);
            if (dominanzMod && dominanzMod.deltas) {
                Object.keys(dominanzMod.deltas).forEach(key => {
                    deltas[key] = (deltas[key] || 0) + dominanzMod.deltas[key];
                });
            }
        }

        // Orientierungs-Modifier (v4.0: Array, LEGACY: String oder Object)
        if (profile.orientierung) {
            let orientierungen = [];

            if (Array.isArray(profile.orientierung)) {
                // v4.0: Array
                orientierungen = profile.orientierung;
            } else if (typeof profile.orientierung === 'string') {
                // String
                orientierungen = [profile.orientierung];
            } else if (typeof profile.orientierung === 'object') {
                // LEGACY: { primary, secondary } oder { heterosexuell: 'gelebt', ... }
                if (profile.orientierung.primary) {
                    orientierungen.push(profile.orientierung.primary);
                    if (profile.orientierung.secondary) {
                        orientierungen.push(profile.orientierung.secondary);
                    }
                } else {
                    // Legacy object format
                    if (profile.orientierung.heterosexuell) orientierungen.push('heterosexuell');
                    if (profile.orientierung.homosexuell) orientierungen.push('gay_lesbisch');
                    if (profile.orientierung.bisexuell) orientierungen.push('bisexuell');
                }
            }

            // v4.0: Wende alle Orientierungs-Modifier an (Multi-Select)
            orientierungen.forEach(ori => {
                const oriMod = getOrientierungModifier(ori);
                if (oriMod && oriMod.deltas) {
                    Object.keys(oriMod.deltas).forEach(key => {
                        deltas[key] = (deltas[key] || 0) + oriMod.deltas[key];
                    });
                }
            });
        }

        return deltas;
    }

    /**
     * Wendet Deltas auf Bedürfniswerte an
     * @param {Object} baseNeeds - Basis-Bedürfniswerte
     * @param {Object} deltas - Zu applizierende Deltas
     * @returns {Object} Modifizierte Bedürfniswerte
     */
    function applyDeltas(baseNeeds, deltas) {
        const result = { ...baseNeeds };

        Object.keys(deltas).forEach(key => {
            if (result[key] !== undefined) {
                // Wert modifizieren und auf 0-100 begrenzen
                result[key] = Math.min(100, Math.max(0, result[key] + deltas[key]));
            }
        });

        return result;
    }

    /**
     * Prüft ob alle Modifier geladen sind
     * @returns {Object} Status-Objekt mit Lade-Infos
     */
    function getLoadStatus() {
        return {
            gender: Object.keys(TiageModifiers.Gender).length,
            dominanz: Object.keys(TiageModifiers.Dominanz).length,
            orientierung: Object.keys(TiageModifiers.Orientierung).length,
            total: Object.keys(TiageModifiers.Gender).length +
                   Object.keys(TiageModifiers.Dominanz).length +
                   Object.keys(TiageModifiers.Orientierung).length
        };
    }

    // API exportieren
    window.ProfileModifiers = {
        getGenderModifier: getGenderModifier,
        getDominanzModifier: getDominanzModifier,
        getOrientierungModifier: getOrientierungModifier,
        calculateProfileDeltas: calculateProfileDeltas,
        applyDeltas: applyDeltas,
        getLoadStatus: getLoadStatus,
        // v4.0 Maps
        GENDER_MAP_V4: GENDER_MAP_V4,
        ORIENTIERUNG_MAP_V4: ORIENTIERUNG_MAP_V4,
        // LEGACY Maps für externe Nutzung
        GENDER_IDENTITY_MAP: GENDER_IDENTITY_MAP,
        DOMINANZ_MAP: DOMINANZ_MAP,
        ORIENTIERUNG_MAP: ORIENTIERUNG_MAP
    };

    console.log('[ProfileModifiers] Modifier-Index initialisiert');

})();
