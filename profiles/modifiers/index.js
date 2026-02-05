/**
 * PROFILE MODIFIERS INDEX
 *
 * Lädt alle Modifier (Gender, Orientierung, Dominanz, FFH) und stellt sie als einheitliches Objekt bereit.
 * Ermöglicht die Berechnung von Bedürfnis-Deltas basierend auf Profil-Faktoren.
 *
 * v4.2: FFH-Modifier (Fit, Fucked up, Horny) hinzugefügt
 */

(function() {
    'use strict';

    // TiageModifiers-Namespace initialisieren
    window.TiageModifiers = window.TiageModifiers || {};
    window.TiageModifiers.Gender = window.TiageModifiers.Gender || {};
    window.TiageModifiers.Dominanz = window.TiageModifiers.Dominanz || {};
    window.TiageModifiers.Orientierung = window.TiageModifiers.Orientierung || {};
    window.TiageModifiers.FFH = window.TiageModifiers.FFH || {};

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

    // v4.1: Orientierung mit 5 separaten Optionen
    const ORIENTIERUNG_MAP_V4 = {
        'heterosexuell': 'Heterosexuell',
        'gay_lesbisch': 'Homosexuell',    // v4.1: Nutzt existierenden Homosexuell-Modifier
        'bisexuell': 'Bisexuell',
        'pansexuell': 'Pansexuell',       // v4.1: Neue Modifier-Datei
        'queer': 'Queer',                 // v4.1: Neue Modifier-Datei
        // Legacy v4.0
        'pansexuell_queer': 'Pansexuell'  // v4.0→v4.1: Mapped zu Pansexuell
    };

    // LEGACY: Alte Map für Rückwärtskompatibilität
    const ORIENTIERUNG_MAP = {
        'heterosexuell': 'Heterosexuell',
        'homosexuell': 'Bisexuell',       // v4.0: → Bisexuell
        'bisexuell': 'Bisexuell',
        'bihomo': 'Bisexuell',            // Legacy: Bi-/Homosexuell → Bisexuell
        'pansexuell': 'Bisexuell'         // Legacy: Pansexuell → Bisexuell
    };

    // v4.2: FFH-Map (Fit, Fucked up, Horny)
    const FFH_MAP = {
        'fit': 'Fit',
        'fuckedup': 'Fuckedup',
        'fucked_up': 'Fuckedup',
        'horny': 'Horny'
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
     * Holt einen FFH-Modifier (v4.2)
     * @param {string} ffhKey - 'fit', 'fuckedup', oder 'horny'
     * @returns {Object|null} Modifier-Objekt mit deltas
     */
    function getFFHModifier(ffhKey) {
        if (!ffhKey || typeof ffhKey !== 'string') return null;

        const key = ffhKey.toLowerCase();
        const modifierKey = FFH_MAP[key];

        if (modifierKey && TiageModifiers.FFH[modifierKey]) {
            return TiageModifiers.FFH[modifierKey];
        }

        return null;
    }

    // ═══════════════════════════════════════════════════════════════════════
    // RTI-SÄULEN BASIERTE SKALIERUNG (v4.1)
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * RTI-Säulen Mapping für Modifier-Kategorien
     * Jeder Modifier-Typ wird einer oder mehreren RTI-Säulen zugeordnet
     * Die RTI-Priorität (0, 1, 2) wird als Multiplikator für die Deltas verwendet
     *
     * v4.2: FFH-Modifier hinzugefügt
     */
    const RTI_MODIFIER_MAPPING = {
        gender: ['S1'],            // Geschlecht → S1 Leiblichkeit
        dominanz: ['S3'],          // Dominanz → S3 Autonomie & Leistung
        orientierung: ['S1', 'S2'], // Orientierung → S1 Leiblichkeit + S2 Soziales Netzwerk
        // v4.2: FFH (Fit, Fucked up, Horny)
        fit: ['S1', 'S4'],         // Fit → S1 Leiblichkeit + S4 Sicherheit (Gesundheit)
        fuckedup: ['S5'],          // Fucked up → S5 Werte & Sinn (emotionale Tiefe)
        horny: ['S1']              // Horny → S1 Leiblichkeit (Sexualität)
    };

    /**
     * Holt die RTI-Prioritäten aus TiageState oder TiageWeights
     * @returns {Object} { S1, S2, S3, S4, S5 } mit Werten 0, 1, oder 2
     */
    function getRtiPriorities() {
        // Zuerst aus TiageWeights.RTI versuchen (aktuellster Wert)
        if (typeof TiageWeights !== 'undefined' && TiageWeights.RTI && typeof TiageWeights.RTI.get === 'function') {
            return TiageWeights.RTI.get();
        }
        // Fallback: Aus TiageState laden
        if (typeof TiageState !== 'undefined' && typeof TiageState.get === 'function') {
            const stored = TiageState.get('rtiPriorities');
            if (stored && typeof stored.S1 === 'number') {
                return stored;
            }
        }
        // Default: Alle auf 1 (Normal)
        return { S1: 1, S2: 1, S3: 1, S4: 1, S5: 1 };
    }

    /**
     * Berechnet den RTI-Multiplikator für eine Modifier-Kategorie
     * Wenn mehrere Säulen zugeordnet sind, wird der Durchschnitt verwendet
     *
     * @param {string} category - 'gender', 'dominanz', oder 'orientierung'
     * @returns {number} Multiplikator (0, 1, oder 2)
     */
    function getRtiMultiplier(category) {
        const priorities = getRtiPriorities();
        const pillars = RTI_MODIFIER_MAPPING[category];

        if (!pillars || pillars.length === 0) return 1;

        // Berechne Durchschnitt der zugeordneten Säulen-Prioritäten
        const sum = pillars.reduce((acc, pillar) => acc + (priorities[pillar] || 1), 0);
        return sum / pillars.length;
    }

    /**
     * Berechnet alle Deltas für ein Profil (v4.0)
     *
     * v4.0: geschlecht ist String, orientierung ist Array
     * v4.1: RTI-Prioritäten als Multiplikator für Modifier-Deltas
     * v4.2: FFH-Modifier (Fit, Fucked up, Horny) hinzugefügt
     * LEGACY: Unterstützt auch alte Formate
     *
     * @param {Object} profile - Profil mit geschlecht, dominanz, orientierung, geschlecht_extras
     * @returns {Object} Kombinierte Deltas aus allen Modifiern (skaliert nach RTI-Prioritäten)
     */
    function calculateProfileDeltas(profile) {
        const deltas = {};

        // Gender-Modifier (v4.0: String, LEGACY: { primary, secondary })
        if (profile.geschlecht) {
            let genderMod;
            const genderMultiplier = getRtiMultiplier('gender');

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
                    // v4.1: Delta × RTI-Multiplikator
                    deltas[key] = (deltas[key] || 0) + (genderMod.deltas[key] * genderMultiplier);
                });
            }
        }

        // Dominanz-Modifier
        if (profile.dominanz) {
            const dominanzMultiplier = getRtiMultiplier('dominanz');
            const dominanzVal = typeof profile.dominanz === 'object'
                ? profile.dominanz.primary
                : profile.dominanz;
            const dominanzMod = getDominanzModifier(dominanzVal);
            if (dominanzMod && dominanzMod.deltas) {
                Object.keys(dominanzMod.deltas).forEach(key => {
                    // v4.1: Delta × RTI-Multiplikator
                    deltas[key] = (deltas[key] || 0) + (dominanzMod.deltas[key] * dominanzMultiplier);
                });
            }
        }

        // Orientierungs-Modifier (v4.0: Array, LEGACY: String oder Object)
        if (profile.orientierung) {
            let orientierungen = [];
            const orientierungMultiplier = getRtiMultiplier('orientierung');

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
                    if (profile.orientierung.bihomo) orientierungen.push('bihomo');
                    if (profile.orientierung.pansexuell) orientierungen.push('pansexuell');
                }
            }

            // v4.0: Wende alle Orientierungs-Modifier an (Multi-Select)
            orientierungen.forEach(ori => {
                const oriMod = getOrientierungModifier(ori);
                if (oriMod && oriMod.deltas) {
                    Object.keys(oriMod.deltas).forEach(key => {
                        // v4.1: Delta × RTI-Multiplikator
                        deltas[key] = (deltas[key] || 0) + (oriMod.deltas[key] * orientierungMultiplier);
                    });
                }
            });
        }

        // v4.2: FFH-Modifier (Fit, Fucked up, Horny)
        // geschlecht_extras ist { fit: bool, fuckedup: bool, horny: bool }
        const extras = profile.geschlecht_extras || profile.extras || {};

        if (extras.fit) {
            const fitMultiplier = getRtiMultiplier('fit');
            const fitMod = getFFHModifier('fit');
            if (fitMod && fitMod.deltas) {
                Object.keys(fitMod.deltas).forEach(key => {
                    deltas[key] = (deltas[key] || 0) + (fitMod.deltas[key] * fitMultiplier);
                });
            }
        }

        if (extras.fuckedup) {
            const fuckedupMultiplier = getRtiMultiplier('fuckedup');
            const fuckedupMod = getFFHModifier('fuckedup');
            if (fuckedupMod && fuckedupMod.deltas) {
                Object.keys(fuckedupMod.deltas).forEach(key => {
                    deltas[key] = (deltas[key] || 0) + (fuckedupMod.deltas[key] * fuckedupMultiplier);
                });
            }
        }

        if (extras.horny) {
            const hornyMultiplier = getRtiMultiplier('horny');
            const hornyMod = getFFHModifier('horny');
            if (hornyMod && hornyMod.deltas) {
                Object.keys(hornyMod.deltas).forEach(key => {
                    deltas[key] = (deltas[key] || 0) + (hornyMod.deltas[key] * hornyMultiplier);
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
            ffh: Object.keys(TiageModifiers.FFH).length,
            total: Object.keys(TiageModifiers.Gender).length +
                   Object.keys(TiageModifiers.Dominanz).length +
                   Object.keys(TiageModifiers.Orientierung).length +
                   Object.keys(TiageModifiers.FFH).length
        };
    }

    // API exportieren
    window.ProfileModifiers = {
        getGenderModifier: getGenderModifier,
        getDominanzModifier: getDominanzModifier,
        getOrientierungModifier: getOrientierungModifier,
        getFFHModifier: getFFHModifier,           // v4.2
        calculateProfileDeltas: calculateProfileDeltas,
        applyDeltas: applyDeltas,
        getLoadStatus: getLoadStatus,
        // v4.1: RTI-Skalierung
        getRtiPriorities: getRtiPriorities,
        getRtiMultiplier: getRtiMultiplier,
        RTI_MODIFIER_MAPPING: RTI_MODIFIER_MAPPING,
        // v4.0 Maps
        GENDER_MAP_V4: GENDER_MAP_V4,
        ORIENTIERUNG_MAP_V4: ORIENTIERUNG_MAP_V4,
        // v4.2: FFH Map
        FFH_MAP: FFH_MAP,
        // LEGACY Maps für externe Nutzung
        GENDER_IDENTITY_MAP: GENDER_IDENTITY_MAP,
        DOMINANZ_MAP: DOMINANZ_MAP,
        ORIENTIERUNG_MAP: ORIENTIERUNG_MAP
    };

    console.log('[ProfileModifiers] Modifier-Index initialisiert');

})();
