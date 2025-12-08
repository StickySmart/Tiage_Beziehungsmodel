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
     */
    const GENDER_IDENTITY_MAP = {
        // Mann + Identität
        'mann-cis': 'MannCis',
        'mann-trans': 'MannTrans',
        'mann-suchend': 'MannSuchend',
        // Frau + Identität
        'frau-cis': 'FrauCis',
        'frau-trans': 'FrauTrans',
        'frau-suchend': 'FrauSuchend',
        // Inter + Identität
        'inter-nonbinaer': 'InterNonbinaer',
        'inter-fluid': 'InterFluid',
        'inter-suchend': 'InterSuchend'
    };

    const DOMINANZ_MAP = {
        'dominant': 'Dominant',
        'submissiv': 'Submissiv',
        'switch': 'Switch',
        'vanilla': 'Ausgeglichen',
        'ausgeglichen': 'Ausgeglichen'
    };

    const ORIENTIERUNG_MAP = {
        'heterosexuell': 'Heterosexuell',
        'homosexuell': 'Homosexuell',
        'bisexuell': 'Bisexuell'
    };

    /**
     * Holt einen Gender-Modifier basierend auf Körper + Identität
     * @param {string} primary - Körper: mann, frau, inter
     * @param {string} secondary - Identität: cis, trans, suchend, nonbinaer, fluid
     * @returns {Object|null} Modifier-Objekt mit deltas
     */
    function getGenderModifier(primary, secondary) {
        if (!primary || !secondary) return null;

        const key = (primary + '-' + secondary).toLowerCase();
        const modifierKey = GENDER_IDENTITY_MAP[key];

        if (modifierKey && TiageModifiers.Gender[modifierKey]) {
            return TiageModifiers.Gender[modifierKey];
        }

        console.warn('[ModifierLoader] Gender-Modifier nicht gefunden:', key);
        return null;
    }

    /**
     * Holt einen Dominanz-Modifier
     * @param {string} dominanz - dominant, submissiv, switch, vanilla
     * @returns {Object|null} Modifier-Objekt mit deltas
     */
    function getDominanzModifier(dominanz) {
        if (!dominanz) return null;

        const key = dominanz.toLowerCase();
        const modifierKey = DOMINANZ_MAP[key];

        if (modifierKey && TiageModifiers.Dominanz[modifierKey]) {
            return TiageModifiers.Dominanz[modifierKey];
        }

        return null;
    }

    /**
     * Holt einen Orientierungs-Modifier
     * @param {string} orientierung - heterosexuell, homosexuell, bisexuell
     * @returns {Object|null} Modifier-Objekt mit deltas
     */
    function getOrientierungModifier(orientierung) {
        if (!orientierung) return null;

        const key = orientierung.toLowerCase();
        const modifierKey = ORIENTIERUNG_MAP[key];

        if (modifierKey && TiageModifiers.Orientierung[modifierKey]) {
            return TiageModifiers.Orientierung[modifierKey];
        }

        return null;
    }

    /**
     * Berechnet alle Deltas für ein Profil
     * @param {Object} profile - Profil mit geschlecht, dominanz, orientierung
     * @returns {Object} Kombinierte Deltas aus allen Modifiern
     */
    function calculateProfileDeltas(profile) {
        const deltas = {};

        // Gender-Modifier (Körper + Identität)
        if (profile.geschlecht) {
            const primary = profile.geschlecht.primary || profile.geschlecht;
            const secondary = profile.geschlecht.secondary || 'cis';
            const genderMod = getGenderModifier(primary, secondary);

            if (genderMod && genderMod.deltas) {
                Object.keys(genderMod.deltas).forEach(key => {
                    deltas[key] = (deltas[key] || 0) + genderMod.deltas[key];
                });
            }
        }

        // Dominanz-Modifier
        if (profile.dominanz) {
            const dominanzMod = getDominanzModifier(profile.dominanz);
            if (dominanzMod && dominanzMod.deltas) {
                Object.keys(dominanzMod.deltas).forEach(key => {
                    deltas[key] = (deltas[key] || 0) + dominanzMod.deltas[key];
                });
            }
        }

        // Orientierungs-Modifier
        if (profile.orientierung) {
            // Kann einzelner String oder Objekt sein
            let ori = profile.orientierung;
            if (typeof ori === 'object') {
                // Nimm erste aktive Orientierung
                if (ori.heterosexuell) ori = 'heterosexuell';
                else if (ori.homosexuell) ori = 'homosexuell';
                else if (ori.bisexuell) ori = 'bisexuell';
            }

            const oriMod = getOrientierungModifier(ori);
            if (oriMod && oriMod.deltas) {
                Object.keys(oriMod.deltas).forEach(key => {
                    deltas[key] = (deltas[key] || 0) + oriMod.deltas[key];
                });
            }
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
        // Maps für externe Nutzung
        GENDER_IDENTITY_MAP: GENDER_IDENTITY_MAP,
        DOMINANZ_MAP: DOMINANZ_MAP,
        ORIENTIERUNG_MAP: ORIENTIERUNG_MAP
    };

    console.log('[ProfileModifiers] Modifier-Index initialisiert');

})();
