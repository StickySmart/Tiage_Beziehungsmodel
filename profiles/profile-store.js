/**
 * TIAGE PROFILE STORE
 *
 * Kompositions-basiertes Profil-System mit LocalForage-Caching.
 * Generiert 648 Profile aus Basis-Komponenten:
 * - 8 Archetypen × 9 P/S-Gender × 4 Dominanz × 3 Orientierung
 *
 * Statt 648 vollständige Profile im DOM zu laden, werden Profile
 * bei Bedarf komponiert und in IndexedDB gecacht.
 */

var TiageProfileStore = (function() {
    'use strict';

    // LocalForage Instanz für Profile
    var profileDB = localforage.createInstance({
        name: 'TiageProfiles',
        storeName: 'profiles'
    });

    // ════════════════════════════════════════════════════════════════════════
    // GENDER-MODIFIKATOREN (9 P/S-Kombinationen)
    // ════════════════════════════════════════════════════════════════════════

    var genderModifiers = {

        // ─────────────────────────────────────────────────────────────────────
        // MANN (P) Kombinationen
        // ─────────────────────────────────────────────────────────────────────

        'mann-cis': {
            key: 'mann-cis',
            label: 'Mann (Cis)',
            effectiveIdentity: 'maennlich',
            body: 'mann',
            identity: 'cis',
            description: 'Cis-Mann: Männlicher Körper, männliche Identität',

            // Attribut-Modifikatoren (relativ zu Basis)
            modifiers: {
                emotionaleOffenheit: -0.1,      // Tendenz zu weniger offen
                kommunikationsstil: 0.05,       // Etwas direkter
                konfliktverhalten: 0.05,        // Etwas konfrontativer
                familieWichtigkeit: 0,          // Neutral
                traditionenWichtigkeit: 0.05    // Etwas traditioneller
            },

            // Pirsig/Osho Interpretation
            pirsig: 'Statische Gender-Identität im Einklang mit biologischem Körper.',
            osho: 'Traditionelle Yang-Energie ohne inneren Konflikt zwischen Körper und Identität.'
        },

        'mann-trans': {
            key: 'mann-trans',
            label: 'Trans-Frau',
            effectiveIdentity: 'weiblich',
            body: 'mann',
            identity: 'trans',
            description: 'Trans-Frau: Männlicher Körper, weibliche Identität',

            modifiers: {
                emotionaleOffenheit: 0.15,      // Oft offener durch Selbstreflexion
                kommunikationsstil: -0.05,      // Tendenz zu indirekter
                konfliktverhalten: -0.1,        // Weniger konfrontativ
                familieWichtigkeit: 0,          // Neutral
                traditionenWichtigkeit: -0.15,  // Weniger traditionell
                openness: 0.2                   // Höhere Offenheit (Big Five)
            },

            pirsig: 'Dynamische Qualität - Überwindung statischer Geschlechternormen.',
            osho: 'Authentizität über Konvention. Die innere Wahrheit transzendiert den Körper.'
        },

        'mann-unsicher': {
            key: 'mann-unsicher',
            label: 'Mann (Unsicher)',
            effectiveIdentity: 'nonbinaer',
            body: 'mann',
            identity: 'unsicher',
            description: 'Männlicher Körper, unsichere/fragende Identität',

            modifiers: {
                emotionaleOffenheit: 0.1,       // Offener durch Selbstreflexion
                kommunikationsstil: -0.05,      // Etwas indirekter
                konfliktverhalten: -0.05,       // Weniger konfrontativ
                familieWichtigkeit: 0,          // Neutral
                traditionenWichtigkeit: -0.1,   // Weniger traditionell
                openness: 0.15,                 // Höhere Offenheit
                neuroticism: 0.1                // Etwas höher (Identitäts-Exploration)
            },

            pirsig: 'Im Übergang zwischen statischer und dynamischer Qualität.',
            osho: 'Ehrliche Selbsterforschung. Der Mut zu sagen "Ich weiß es noch nicht".'
        },

        // ─────────────────────────────────────────────────────────────────────
        // FRAU (P) Kombinationen
        // ─────────────────────────────────────────────────────────────────────

        'frau-cis': {
            key: 'frau-cis',
            label: 'Frau (Cis)',
            effectiveIdentity: 'weiblich',
            body: 'frau',
            identity: 'cis',
            description: 'Cis-Frau: Weiblicher Körper, weibliche Identität',

            modifiers: {
                emotionaleOffenheit: 0.1,       // Tendenz zu offener
                kommunikationsstil: -0.05,      // Etwas indirekter
                konfliktverhalten: -0.05,       // Weniger konfrontativ
                familieWichtigkeit: 0.05,       // Etwas höher
                traditionenWichtigkeit: 0.05    // Etwas traditioneller
            },

            pirsig: 'Statische Gender-Identität im Einklang mit biologischem Körper.',
            osho: 'Traditionelle Yin-Energie ohne inneren Konflikt zwischen Körper und Identität.'
        },

        'frau-trans': {
            key: 'frau-trans',
            label: 'Trans-Mann',
            effectiveIdentity: 'maennlich',
            body: 'frau',
            identity: 'trans',
            description: 'Trans-Mann: Weiblicher Körper, männliche Identität',

            modifiers: {
                emotionaleOffenheit: 0,         // Neutral (Identität vs. Sozialisation)
                kommunikationsstil: 0.05,       // Tendenz zu direkter
                konfliktverhalten: 0.05,        // Etwas konfrontativer
                familieWichtigkeit: 0,          // Neutral
                traditionenWichtigkeit: -0.15,  // Weniger traditionell
                openness: 0.2                   // Höhere Offenheit
            },

            pirsig: 'Dynamische Qualität - Überwindung statischer Geschlechternormen.',
            osho: 'Authentizität über Konvention. Die innere Wahrheit transzendiert den Körper.'
        },

        'frau-unsicher': {
            key: 'frau-unsicher',
            label: 'Frau (Unsicher)',
            effectiveIdentity: 'nonbinaer',
            body: 'frau',
            identity: 'unsicher',
            description: 'Weiblicher Körper, unsichere/fragende Identität',

            modifiers: {
                emotionaleOffenheit: 0.15,      // Offener durch Selbstreflexion
                kommunikationsstil: -0.05,      // Etwas indirekter
                konfliktverhalten: -0.05,       // Weniger konfrontativ
                familieWichtigkeit: 0,          // Neutral
                traditionenWichtigkeit: -0.1,   // Weniger traditionell
                openness: 0.15,                 // Höhere Offenheit
                neuroticism: 0.1                // Etwas höher
            },

            pirsig: 'Im Übergang zwischen statischer und dynamischer Qualität.',
            osho: 'Ehrliche Selbsterforschung. Der Mut zu sagen "Ich weiß es noch nicht".'
        },

        // ─────────────────────────────────────────────────────────────────────
        // INTER (P) Kombinationen
        // ─────────────────────────────────────────────────────────────────────

        'inter-nonbinaer': {
            key: 'inter-nonbinaer',
            label: 'Inter (Nonbinär)',
            effectiveIdentity: 'nonbinaer',
            body: 'inter',
            identity: 'nonbinaer',
            description: 'Intersex-Körper, nonbinäre Identität',

            modifiers: {
                emotionaleOffenheit: 0.1,       // Offener
                kommunikationsstil: 0,          // Neutral
                konfliktverhalten: 0,           // Neutral
                familieWichtigkeit: -0.05,      // Etwas niedriger
                traditionenWichtigkeit: -0.2,   // Weniger traditionell
                openness: 0.25                  // Hohe Offenheit
            },

            pirsig: 'Jenseits binärer statischer Muster - reine dynamische Qualität.',
            osho: 'Die natürliche Vielfalt des Lebens. Keine Kategorie kann die Essenz erfassen.'
        },

        'inter-fluid': {
            key: 'inter-fluid',
            label: 'Inter (Fluid)',
            effectiveIdentity: 'fluid',
            body: 'inter',
            identity: 'fluid',
            description: 'Intersex-Körper, fluide Identität',

            modifiers: {
                emotionaleOffenheit: 0.15,      // Offener
                kommunikationsstil: 0,          // Neutral
                konfliktverhalten: 0,           // Neutral
                familieWichtigkeit: -0.05,      // Etwas niedriger
                traditionenWichtigkeit: -0.25,  // Deutlich weniger traditionell
                openness: 0.3,                  // Sehr hohe Offenheit
                flexibility: 0.2                // Hohe Flexibilität
            },

            pirsig: 'Maximale dynamische Qualität - Identität als Prozess, nicht Zustand.',
            osho: 'Wie der Fluss - nie zweimal dasselbe, immer authentisch.'
        },

        'inter-unsicher': {
            key: 'inter-unsicher',
            label: 'Inter (Unsicher)',
            effectiveIdentity: 'nonbinaer',
            body: 'inter',
            identity: 'unsicher',
            description: 'Intersex-Körper, unsichere/fragende Identität',

            modifiers: {
                emotionaleOffenheit: 0.1,       // Offener
                kommunikationsstil: -0.05,      // Etwas indirekter
                konfliktverhalten: -0.05,       // Weniger konfrontativ
                familieWichtigkeit: 0,          // Neutral
                traditionenWichtigkeit: -0.15,  // Weniger traditionell
                openness: 0.2,                  // Hohe Offenheit
                neuroticism: 0.1                // Etwas höher
            },

            pirsig: 'Offene Frage als Stärke - nicht jede Qualität muss kategorisiert werden.',
            osho: 'Ehrliche Selbsterforschung in einem Körper, der selbst die Binarität transzendiert.'
        }
    };

    // ════════════════════════════════════════════════════════════════════════
    // DOMINANZ-MODIFIKATOREN (aus dominance-definitions.js)
    // ════════════════════════════════════════════════════════════════════════

    var dominanceModifiers = {
        'dominant': {
            key: 'dominant',
            modifiers: {
                kommunikationsstil: 0.15,       // Direkter
                konfliktverhalten: 0.15,        // Konfrontativer
                emotionaleOffenheit: -0.1,      // Weniger offen
                entschuldigungen: -0.1,         // Schwerer
                kritikAnnehmen: -0.1,           // Schwerer
                introExtro: 0.1,                // Extrovertierter
                karrierePrioritaet: 0.1         // Karriere-orientierter
            }
        },
        'submissiv': {
            key: 'submissiv',
            modifiers: {
                kommunikationsstil: -0.15,      // Indirekter
                konfliktverhalten: -0.15,       // Vermeidend
                emotionaleOffenheit: 0.1,       // Offener
                entschuldigungen: 0.1,          // Leichter
                kritikAnnehmen: 0.1,            // Leichter
                introExtro: -0.1,               // Introvertierter
                karrierePrioritaet: -0.1        // Weniger Karriere-fokus
            }
        },
        'switch': {
            key: 'switch',
            modifiers: {
                kommunikationsstil: 0,          // Neutral
                konfliktverhalten: 0,           // Neutral
                emotionaleOffenheit: 0.05,      // Leicht offener
                flexibility: 0.15,              // Flexibler
                openness: 0.1                   // Offener für Erfahrungen
            }
        },
        'ausgeglichen': {
            key: 'ausgeglichen',
            modifiers: {
                kommunikationsstil: 0,          // Neutral
                konfliktverhalten: 0,           // Neutral
                emotionaleOffenheit: 0,         // Neutral
                flexibility: 0,                 // Neutral
                openness: 0                     // Neutral
            }
        }
    };

    // ════════════════════════════════════════════════════════════════════════
    // ORIENTIERUNGS-MODIFIKATOREN
    // ════════════════════════════════════════════════════════════════════════

    var orientationModifiers = {
        'heterosexuell': {
            key: 'heterosexuell',
            modifiers: {
                traditionenWichtigkeit: 0.1,    // Etwas traditioneller
                openness: -0.05                 // Etwas weniger offen (statistisch)
            }
        },
        'homosexuell': {
            key: 'homosexuell',
            modifiers: {
                traditionenWichtigkeit: -0.1,   // Weniger traditionell
                openness: 0.1,                  // Offener
                familieWichtigkeit: -0.05       // Familie etwas weniger wichtig
            }
        },
        'bisexuell': {
            key: 'bisexuell',
            modifiers: {
                traditionenWichtigkeit: -0.1,   // Weniger traditionell
                openness: 0.15,                 // Am offensten
                flexibility: 0.1                // Flexibler
            }
        }
    };

    // ════════════════════════════════════════════════════════════════════════
    // PROFIL-KOMPOSITION
    // ════════════════════════════════════════════════════════════════════════

    /**
     * Komponiert ein vollständiges Profil aus Basis + Modifikatoren
     */
    function composeProfile(archetypeKey, genderKey, dominanceKey, orientationKey) {
        // Basis-Archetyp laden (aus archetypeDefinitions)
        var baseArchetype = typeof archetypeDefinitions !== 'undefined'
            ? archetypeDefinitions[archetypeKey]
            : null;

        if (!baseArchetype) {
            console.warn('Archetyp nicht gefunden:', archetypeKey);
            return null;
        }

        // Modifikatoren holen
        var genderMod = genderModifiers[genderKey] || {};
        var dominanceMod = dominanceModifiers[dominanceKey] || {};
        var orientationMod = orientationModifiers[orientationKey] || {};

        // Profil-Schlüssel
        var profileKey = [archetypeKey, genderKey, dominanceKey, orientationKey].join('-');

        // Basis-Attribute aus Archetyp
        var profile = {
            key: profileKey,
            archetyp: archetypeKey,
            gender: genderKey,
            dominanz: dominanceKey,
            orientierung: orientationKey,

            // Meta-Informationen
            effectiveIdentity: genderMod.effectiveIdentity || 'andere',
            body: genderMod.body || null,
            identity: genderMod.identity || null,

            // Attribute aus Archetyp-Defaults übernehmen
            attributes: Object.assign({}, baseArchetype.defaultInferences || {}),

            // Pirsig/Osho kombiniert
            pirsig: combinePhilosophy(baseArchetype.pirsig, genderMod.pirsig),
            osho: combinePhilosophy(baseArchetype.osho, orientationMod.osho)
        };

        // Modifikatoren anwenden
        applyModifiers(profile.attributes, genderMod.modifiers);
        applyModifiers(profile.attributes, dominanceMod.modifiers);
        applyModifiers(profile.attributes, orientationMod.modifiers);

        return profile;
    }

    /**
     * Wendet Modifikatoren auf Attribute an
     */
    function applyModifiers(attributes, modifiers) {
        if (!modifiers) return;

        for (var key in modifiers) {
            if (modifiers.hasOwnProperty(key)) {
                // Numerische Attribute werden addiert
                if (typeof attributes[key] === 'number') {
                    attributes[key] = Math.max(0, Math.min(1, attributes[key] + modifiers[key]));
                } else {
                    // Für nicht-numerische: nur setzen wenn noch nicht vorhanden
                    if (attributes[key] === undefined) {
                        attributes[key] = modifiers[key];
                    }
                }
            }
        }
    }

    /**
     * Kombiniert philosophische Interpretationen
     */
    function combinePhilosophy(base, addition) {
        if (!base) return addition || '';
        if (!addition) return base;
        return base.interpretation
            ? base.interpretation + ' ' + addition
            : base + ' ' + addition;
    }

    // ════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ════════════════════════════════════════════════════════════════════════

    return {

        /**
         * Holt ein Profil (aus Cache oder neu komponiert)
         *
         * @param {string} archetyp - z.B. 'single', 'duo', 'polyamor'
         * @param {string} pGender - z.B. 'mann', 'frau', 'inter'
         * @param {string} sGender - z.B. 'cis', 'trans', 'nonbinaer', 'fluid', 'unsicher'
         * @param {string} dominanz - z.B. 'dominant', 'submissiv', 'switch', 'ausgeglichen'
         * @param {string} orientierung - z.B. 'heterosexuell', 'homosexuell', 'bisexuell'
         * @returns {Promise<object>} Das komponierte Profil
         */
        getProfile: function(archetyp, pGender, sGender, dominanz, orientierung) {
            var genderKey = pGender + '-' + sGender;
            var profileKey = [archetyp, genderKey, dominanz, orientierung].join('-');

            // Zuerst Cache prüfen
            return profileDB.getItem(profileKey).then(function(cached) {
                if (cached) {
                    return cached;
                }

                // Nicht im Cache: komponieren
                var profile = composeProfile(archetyp, genderKey, dominanz, orientierung);

                if (profile) {
                    // In Cache speichern
                    return profileDB.setItem(profileKey, profile).then(function() {
                        return profile;
                    });
                }

                return null;
            });
        },

        /**
         * Holt ein Profil synchron (nur aus Cache, kein Komponieren)
         */
        getProfileSync: function(archetyp, pGender, sGender, dominanz, orientierung) {
            var genderKey = pGender + '-' + sGender;
            return composeProfile(archetyp, genderKey, dominanz, orientierung);
        },

        /**
         * Gibt alle Gender-Modifikatoren zurück
         */
        getGenderModifiers: function() {
            return genderModifiers;
        },

        /**
         * Gibt einen spezifischen Gender-Modifikator zurück
         */
        getGenderModifier: function(pGender, sGender) {
            return genderModifiers[pGender + '-' + sGender] || null;
        },

        /**
         * Prüft ob eine P/S-Kombination gültig ist
         */
        isValidGenderCombo: function(pGender, sGender) {
            return genderModifiers.hasOwnProperty(pGender + '-' + sGender);
        },

        /**
         * Gibt alle gültigen S-Optionen für ein P zurück
         */
        getSecondaryOptionsForPrimary: function(pGender) {
            if (pGender === 'mann' || pGender === 'frau') {
                return ['cis', 'trans', 'unsicher'];
            }
            if (pGender === 'inter') {
                return ['nonbinaer', 'fluid', 'unsicher'];
            }
            return [];
        },

        /**
         * Löscht den gesamten Profil-Cache
         */
        clearCache: function() {
            return profileDB.clear();
        },

        /**
         * Gibt Cache-Statistiken zurück
         */
        getCacheStats: function() {
            return profileDB.length().then(function(count) {
                return {
                    cachedProfiles: count,
                    maxProfiles: 8 * 9 * 4 * 3  // 864
                };
            });
        }
    };

})();
