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
        // Mann + Identität (Cis, Trans, Nonbinär)
        'mann-cis': 'MannCis',
        'mann-trans': 'MannTrans',
        'mann-nonbinaer': 'MannNonbinaer',
        // Frau + Identität (Cis, Trans, Nonbinär)
        'frau-cis': 'FrauCis',
        'frau-trans': 'FrauTrans',
        'frau-nonbinaer': 'FrauNonbinaer',
        // Inter + Identität (Nonbinär, Fluid, Suchend)
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
        'homosexuell': 'Bisexuell',      // Legacy → mapped to Bisexuell
        'bisexuell': 'Bisexuell',         // Legacy → mapped to Bisexuell
        'bihomo': 'Bisexuell',            // NEU: Bi-/Homosexuell → Bisexuell-Modifier
        'pansexuell': 'Bisexuell'         // NEU: Pansexuell → Bisexuell-Modifier (TODO: eigener Modifier)
    };

    /**
     * Holt einen Gender-Modifier basierend auf Körper + Identität
     * @param {string} primary - Körper: mann, frau, inter
     * @param {string} secondary - Identität: cis, trans, suchend, nonbinaer, fluid
     * @returns {Object|null} Modifier-Objekt mit deltas
     */
    function getGenderModifier(primary, secondary) {
        if (!primary || !secondary || typeof primary !== 'string' || typeof secondary !== 'string') return null;

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
        if (!dominanz || typeof dominanz !== 'string') return null;

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
        if (!orientierung || typeof orientierung !== 'string') return null;

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

        // Orientierungs-Modifier (SSOT v3.10: P/S mit Gewichtung)
        if (profile.orientierung) {
            const PRIMARY_WEIGHT = 0.70;
            const SECONDARY_WEIGHT = 0.30;

            let primaryOri = null;
            let secondaryOri = null;

            // Extrahiere P/S aus verschiedenen Formaten
            if (typeof profile.orientierung === 'object') {
                if (profile.orientierung.primary) {
                    // Neues Format: { primary: 'hetero', secondary: 'pan' }
                    primaryOri = profile.orientierung.primary;
                    secondaryOri = profile.orientierung.secondary || null;
                } else {
                    // Legacy Format: { heterosexuell: true, ... }
                    if (profile.orientierung.heterosexuell) primaryOri = 'heterosexuell';
                    else if (profile.orientierung.homosexuell) primaryOri = 'homosexuell';
                    else if (profile.orientierung.bisexuell) primaryOri = 'bisexuell';
                    else if (profile.orientierung.bihomo) primaryOri = 'bihomo';
                    else if (profile.orientierung.pansexuell) primaryOri = 'pansexuell';
                }
            } else if (typeof profile.orientierung === 'string') {
                primaryOri = profile.orientierung;
            }

            // Primary-Modifier anwenden (70% oder 100% wenn kein Secondary)
            if (primaryOri) {
                const primaryMod = getOrientierungModifier(primaryOri);
                if (primaryMod && primaryMod.deltas) {
                    const weight = secondaryOri ? PRIMARY_WEIGHT : 1.0;
                    Object.keys(primaryMod.deltas).forEach(key => {
                        deltas[key] = (deltas[key] || 0) + (primaryMod.deltas[key] * weight);
                    });
                }
            }

            // Secondary-Modifier anwenden (30%)
            if (secondaryOri) {
                const secondaryMod = getOrientierungModifier(secondaryOri);
                if (secondaryMod && secondaryMod.deltas) {
                    Object.keys(secondaryMod.deltas).forEach(key => {
                        deltas[key] = (deltas[key] || 0) + (secondaryMod.deltas[key] * SECONDARY_WEIGHT);
                    });
                }
            }

            console.log('[ProfileModifiers] Orientierung P/S Deltas:', {
                primary: primaryOri,
                secondary: secondaryOri,
                hasSecondaryDeltas: !!secondaryOri
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
        // Maps für externe Nutzung
        GENDER_IDENTITY_MAP: GENDER_IDENTITY_MAP,
        DOMINANZ_MAP: DOMINANZ_MAP,
        ORIENTIERUNG_MAP: ORIENTIERUNG_MAP
    };

    console.log('[ProfileModifiers] Modifier-Index initialisiert');

})();
