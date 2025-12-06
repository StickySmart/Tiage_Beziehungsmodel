/**
 * TIAGE PROFILE STORE
 *
 * Kompositions-basiertes Profil-System mit LocalForage-Caching.
 * Generiert 864 einzigartige Profile aus Basis-Komponenten:
 * - 8 Archetypen × 9 P/S-Gender × 4 Dominanz × 3 Orientierung
 *
 * P/S-Gender Kombinationen (9) - KONTEXTABHÄNGIG:
 * - Mann (binär): cis, trans, suchend (3)
 * - Frau (binär): cis, trans, suchend (3)
 * - Inter (divers): nonbinaer, fluid, suchend (3)
 *
 * Statt 864 vollständige Profile im DOM zu laden, werden Profile
 * bei Bedarf komponiert und in IndexedDB gecacht.
 *
 * KOMPOSITION beinhaltet:
 * - Basis-Attribute (defaultInferences aus Archetyp)
 * - Attribut-Modifikatoren (Gender + Dominanz + Orientierung)
 * - Kategorie-Scores A-F (Basis + categoryModifiers)
 *   A: Beziehungsphilosophie, B: Werte-Alignment, C: Nähe-Distanz
 *   D: Autonomie, E: Kommunikation, F: Soziale Kompatibilität
 */

var TiageProfileStore = (function() {
    'use strict';

    // LocalForage Instanz für Profile (lazy initialization)
    var profileDB = null;

    function getProfileDB() {
        if (!profileDB && typeof localforage !== 'undefined') {
            profileDB = localforage.createInstance({
                name: 'TiageProfiles',
                storeName: 'profiles'
            });
        }
        return profileDB;
    }

    // ════════════════════════════════════════════════════════════════════════
    // GENDER-MODIFIKATOREN (9 P/S-Kombinationen)
    // Kontextabhängig: Binär (Cis/Trans/Suchend) vs. Divers (NB/Fluid/Suchend)
    // ════════════════════════════════════════════════════════════════════════

    var genderModifiers = {

        // ─────────────────────────────────────────────────────────────────────
        // MANN (P) Kombinationen - BINÄR: Cis, Trans, Suchend
        // ─────────────────────────────────────────────────────────────────────

        'mann-cis': {
            key: 'mann-cis',
            label: 'Cis-Mann',
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

            // Kategorie-Score-Modifikatoren (A-F, Werte 0-100)
            // A: Beziehungsphilosophie, B: Werte-Alignment, C: Nähe-Distanz
            // D: Autonomie, E: Kommunikation, F: Soziale Kompatibilität
            categoryModifiers: {
                A: 0,       // Neutral
                B: +2,      // Etwas traditioneller in Werten
                C: -2,      // Tendenz zu mehr Distanz
                D: +3,      // Höhere Autonomie (sozialisiert)
                E: -4,      // Weniger emotionale Offenheit
                F: +3       // Gesellschaftlich normativ
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

            categoryModifiers: {
                A: +2,      // Reflektierter über Beziehungsformen
                B: -3,      // Weniger traditionelle Werte
                C: +2,      // Offener für Nähe
                D: +5,      // Hohe Autonomie durch Transition
                E: +6,      // Hohe emotionale Intelligenz durch Selbstreflexion
                F: -5       // Gesellschaftlich komplexer
            },

            pirsig: 'Dynamische Qualität - Überwindung statischer Geschlechternormen.',
            osho: 'Authentizität über Konvention. Die innere Wahrheit transzendiert den Körper.'
        },

        'mann-suchend': {
            key: 'mann-suchend',
            label: 'Mann (Suchend)',
            effectiveIdentity: 'suchend',
            body: 'mann',
            identity: 'suchend',
            description: 'Männlicher Körper, suchende/fragende Identität',

            modifiers: {
                emotionaleOffenheit: 0.1,       // Offener durch Selbstreflexion
                kommunikationsstil: -0.05,      // Etwas indirekter
                konfliktverhalten: -0.05,       // Weniger konfrontativ
                familieWichtigkeit: 0,          // Neutral
                traditionenWichtigkeit: -0.1,   // Weniger traditionell
                openness: 0.15,                 // Höhere Offenheit
                neuroticism: 0.1                // Etwas höher (Identitäts-Exploration)
            },

            categoryModifiers: {
                A: +1,      // In Exploration
                B: -2,      // Weniger sicher in Werten
                C: 0,       // Variabel
                D: +2,      // Entwickelt Autonomie
                E: +3,      // Reflektiert
                F: -2       // Unsicher im sozialen Kontext
            },

            pirsig: 'Im Übergang zwischen statischer und dynamischer Qualität.',
            osho: 'Ehrliche Selbsterforschung. Der Mut zu sagen "Ich weiß es noch nicht".'
        },

        // ─────────────────────────────────────────────────────────────────────
        // FRAU (P) Kombinationen - BINÄR: Cis, Trans, Suchend
        // ─────────────────────────────────────────────────────────────────────

        'frau-cis': {
            key: 'frau-cis',
            label: 'Cis-Frau',
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

            categoryModifiers: {
                A: 0,       // Neutral
                B: +2,      // Etwas traditioneller in Werten
                C: +3,      // Näher/beziehungsorientierter
                D: -2,      // Oft weniger autonomie-sozialisiert
                E: +4,      // Emotionaler, kommunikativer
                F: +3       // Gesellschaftlich normativ
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

            categoryModifiers: {
                A: +2,      // Reflektierter über Beziehungsformen
                B: -3,      // Weniger traditionelle Werte
                C: -1,      // Etwas distanzierter
                D: +5,      // Hohe Autonomie durch Transition
                E: +3,      // Durch Selbstreflexion
                F: -5       // Gesellschaftlich komplexer
            },

            pirsig: 'Dynamische Qualität - Überwindung statischer Geschlechternormen.',
            osho: 'Authentizität über Konvention. Die innere Wahrheit transzendiert den Körper.'
        },

        'frau-suchend': {
            key: 'frau-suchend',
            label: 'Frau (Suchend)',
            effectiveIdentity: 'suchend',
            body: 'frau',
            identity: 'suchend',
            description: 'Weiblicher Körper, suchende/fragende Identität',

            modifiers: {
                emotionaleOffenheit: 0.15,      // Offener durch Selbstreflexion
                kommunikationsstil: -0.05,      // Etwas indirekter
                konfliktverhalten: -0.05,       // Weniger konfrontativ
                familieWichtigkeit: 0,          // Neutral
                traditionenWichtigkeit: -0.1,   // Weniger traditionell
                openness: 0.15,                 // Höhere Offenheit
                neuroticism: 0.1                // Etwas höher
            },

            categoryModifiers: {
                A: +1,      // In Exploration
                B: -2,      // Weniger sicher in Werten
                C: +1,      // Tendiert zu Nähe
                D: +2,      // Entwickelt Autonomie
                E: +4,      // Reflektiert, kommunikativ
                F: -2       // Unsicher im sozialen Kontext
            },

            pirsig: 'Im Übergang zwischen statischer und dynamischer Qualität.',
            osho: 'Ehrliche Selbsterforschung. Der Mut zu sagen "Ich weiß es noch nicht".'
        },

        // ─────────────────────────────────────────────────────────────────────
        // INTER (P) Kombinationen - DIVERS: Nonbinär, Fluid, Suchend
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

            categoryModifiers: {
                A: +4,      // Sehr offen für alternative Modelle
                B: -5,      // Außerhalb traditioneller Normen
                C: 0,       // Neutral
                D: +5,      // Hohe Selbstbestimmung nötig
                E: +4,      // Reflektiert
                F: -6       // Gesellschaftlich am komplexesten
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

            categoryModifiers: {
                A: +5,      // Maximale Offenheit
                B: -6,      // Maximale Distanz zu Traditionen
                C: +1,      // Flexibel
                D: +6,      // Höchste Autonomie
                E: +5,      // Sehr reflektiert
                F: -7       // Gesellschaftlich am komplexesten
            },

            pirsig: 'Maximale dynamische Qualität - Identität als Prozess, nicht Zustand.',
            osho: 'Wie der Fluss - nie zweimal dasselbe, immer authentisch.'
        },

        'inter-suchend': {
            key: 'inter-suchend',
            label: 'Inter (Suchend)',
            effectiveIdentity: 'suchend',
            body: 'inter',
            identity: 'suchend',
            description: 'Intersex-Körper, suchende/fragende Identität',

            modifiers: {
                emotionaleOffenheit: 0.1,       // Offener
                kommunikationsstil: -0.05,      // Etwas indirekter
                konfliktverhalten: -0.05,       // Weniger konfrontativ
                familieWichtigkeit: 0,          // Neutral
                traditionenWichtigkeit: -0.15,  // Weniger traditionell
                openness: 0.2,                  // Hohe Offenheit
                neuroticism: 0.1                // Etwas höher
            },

            categoryModifiers: {
                A: +3,      // In Exploration
                B: -4,      // Wenig traditionell
                C: 0,       // Neutral
                D: +4,      // Entwickelt Autonomie
                E: +3,      // Reflektiert
                F: -5       // Gesellschaftlich komplex
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
            },
            categoryModifiers: {
                A: +1,      // Tendenziell klarer in Beziehungsphilosophie
                B: +2,      // Wertebewusster
                C: -2,      // Mehr Distanz/Kontrolle
                D: +5,      // Höhere Autonomie
                E: -3,      // Direkter, weniger empathisch
                F: +2       // Sozial oft erfolgreicher
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
            },
            categoryModifiers: {
                A: -1,      // Anpassungsfähiger
                B: -2,      // Flexibler bei Werten
                C: +3,      // Mehr Nähe suchend
                D: -5,      // Niedrigere Autonomie
                E: +4,      // Empathischer, offener
                F: +1       // Sozial angepasster
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
            },
            categoryModifiers: {
                A: +2,      // Flexibel in Beziehungsform
                B: 0,       // Neutral
                C: 0,       // Neutral
                D: +2,      // Moderate Autonomie
                E: +3,      // Kommunikativ über Rollenwechsel
                F: +1       // Sozial flexibel
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
            },
            categoryModifiers: {
                A: 0,       // Neutral
                B: 0,       // Neutral
                C: 0,       // Neutral
                D: 0,       // Neutral
                E: 0,       // Neutral
                F: 0        // Neutral
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
            },
            categoryModifiers: {
                A: -2,      // Traditioneller in Beziehungsphilosophie
                B: +3,      // Traditionellere Werte
                C: 0,       // Neutral
                D: -2,      // Weniger Selbstfindung nötig
                E: -1,      // Weniger reflektiert
                F: +4       // Gesellschaftlich normativ
            }
        },
        'homosexuell': {
            key: 'homosexuell',
            modifiers: {
                traditionenWichtigkeit: -0.1,   // Weniger traditionell
                openness: 0.1,                  // Offener
                familieWichtigkeit: -0.05       // Familie etwas weniger wichtig
            },
            categoryModifiers: {
                A: +3,      // Offener für alternative Modelle
                B: -3,      // Weniger traditionelle Werte
                C: +1,      // Oft näher/community-orientiert
                D: +4,      // Coming-out erfordert Autonomie
                E: +3,      // Reflektierter
                F: -3       // Gesellschaftlich komplexer
            }
        },
        'bisexuell': {
            key: 'bisexuell',
            modifiers: {
                traditionenWichtigkeit: -0.1,   // Weniger traditionell
                openness: 0.15,                 // Am offensten
                flexibility: 0.1                // Flexibler
            },
            categoryModifiers: {
                A: +4,      // Am offensten für Beziehungsformen
                B: -4,      // Am wenigsten traditionelle Werte
                C: 0,       // Neutral
                D: +5,      // Höchste Selbstfindung
                E: +4,      // Sehr reflektiert
                F: -2       // Gesellschaftlich etwas komplex
            }
        }
    };

    // ════════════════════════════════════════════════════════════════════════
    // BASIS-KATEGORIE-SCORES (aus kategorien.json)
    // A: Beziehungsphilosophie, B: Werte-Alignment, C: Nähe-Distanz
    // D: Autonomie, E: Kommunikation, F: Soziale Kompatibilität
    // ════════════════════════════════════════════════════════════════════════

    var baseScores = {
        'single': { A: 66.7, B: 66.8, C: 62.2, D: 77.5, E: 68.0, F: 63.8 },
        'duo': { A: 55.0, B: 64.3, C: 68.7, D: 49.7, E: 66.3, F: 62.2 },
        'duo_flex': { A: 73.7, B: 73.8, C: 69.5, D: 71.5, E: 72.7, F: 66.5 },
        'solopoly': { A: 67.5, B: 69.0, C: 58.7, D: 74.5, E: 73.3, F: 50.0 },
        'polyamor': { A: 68.3, B: 72.0, C: 65.5, D: 70.3, E: 78.7, F: 50.7 },
        'ra': { A: 72.0, B: 68.0, C: 62.0, D: 85.0, E: 72.0, F: 42.0 },
        'lat': { A: 68.0, B: 72.0, C: 65.0, D: 78.0, E: 72.0, F: 68.0 },
        'aromantisch': { A: 65.0, B: 68.0, C: 62.0, D: 78.0, E: 68.0, F: 48.0 }
    };

    // ════════════════════════════════════════════════════════════════════════
    // PROFIL-KOMPOSITION
    // ════════════════════════════════════════════════════════════════════════

    /**
     * Wendet Kategorie-Score-Modifikatoren auf Basis-Scores an
     * @param {object} scores - Die Basis-Scores { A, B, C, D, E, F }
     * @param {object} categoryMods - Die Modifikatoren { A, B, C, D, E, F }
     */
    function applyScoreModifiers(scores, categoryMods) {
        if (!categoryMods) return;

        var categories = ['A', 'B', 'C', 'D', 'E', 'F'];
        for (var i = 0; i < categories.length; i++) {
            var cat = categories[i];
            if (typeof categoryMods[cat] === 'number') {
                // Scores auf 0-100 begrenzen
                scores[cat] = Math.max(0, Math.min(100, scores[cat] + categoryMods[cat]));
            }
        }
    }

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

        // Kategorie-Scores komponieren (A-F)
        var archetypeScores = baseScores[archetypeKey];
        var composedScores = null;

        if (archetypeScores) {
            // Basis-Scores kopieren
            composedScores = {
                A: archetypeScores.A,
                B: archetypeScores.B,
                C: archetypeScores.C,
                D: archetypeScores.D,
                E: archetypeScores.E,
                F: archetypeScores.F
            };

            // Score-Modifikatoren anwenden (Gender + Dominanz + Orientierung)
            applyScoreModifiers(composedScores, genderMod.categoryModifiers);
            applyScoreModifiers(composedScores, dominanceMod.categoryModifiers);
            applyScoreModifiers(composedScores, orientationMod.categoryModifiers);

            // Auf eine Dezimalstelle runden
            var cats = ['A', 'B', 'C', 'D', 'E', 'F'];
            for (var i = 0; i < cats.length; i++) {
                composedScores[cats[i]] = Math.round(composedScores[cats[i]] * 10) / 10;
            }
        }

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

            // Komponierte Kategorie-Scores (A-F)
            scores: composedScores,

            // Attribute aus Archetyp-Defaults übernehmen
            attributes: Object.assign({}, baseArchetype.defaultInferences || {}),

            // Pirsig/Osho kombiniert
            pirsig: combinePhilosophy(baseArchetype.pirsig, genderMod.pirsig),
            osho: combinePhilosophy(baseArchetype.osho, orientationMod.osho)
        };

        // Attribut-Modifikatoren anwenden
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
            var db = getProfileDB();

            // Fallback wenn LocalForage nicht verfügbar
            if (!db) {
                var profile = composeProfile(archetyp, genderKey, dominanz, orientierung);
                return Promise.resolve(profile);
            }

            // Zuerst Cache prüfen
            return db.getItem(profileKey).then(function(cached) {
                if (cached) {
                    return cached;
                }

                // Nicht im Cache: komponieren
                var profile = composeProfile(archetyp, genderKey, dominanz, orientierung);

                if (profile) {
                    // In Cache speichern
                    return db.setItem(profileKey, profile).then(function() {
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
         * Kontextabhängig: Binär (Cis/Trans/Suchend) vs. Divers (NB/Fluid/Suchend)
         */
        getSecondaryOptionsForPrimary: function(pGender) {
            if (pGender === 'mann' || pGender === 'frau') {
                return ['cis', 'trans', 'suchend'];  // Binär
            }
            if (pGender === 'inter') {
                return ['nonbinaer', 'fluid', 'suchend'];  // Divers
            }
            return [];
        },

        /**
         * Löscht den gesamten Profil-Cache
         */
        clearCache: function() {
            var db = getProfileDB();
            if (!db) return Promise.resolve();
            return db.clear();
        },

        /**
         * Gibt Cache-Statistiken zurück
         */
        getCacheStats: function() {
            var db = getProfileDB();
            if (!db) {
                return Promise.resolve({
                    cachedProfiles: 0,
                    maxProfiles: 8 * 9 * 4 * 3,  // 864
                    localforageAvailable: false
                });
            }
            return db.length().then(function(count) {
                return {
                    cachedProfiles: count,
                    maxProfiles: 8 * 9 * 4 * 3,  // 864
                    localforageAvailable: true
                };
            });
        },

        /**
         * Gibt die Basis-Kategorie-Scores für einen Archetyp zurück
         * @param {string} archetypeKey - z.B. 'single', 'duo'
         * @returns {object|null} Die Basis-Scores { A, B, C, D, E, F }
         */
        getBaseScores: function(archetypeKey) {
            return baseScores[archetypeKey] || null;
        },

        /**
         * Gibt alle Basis-Scores für alle Archetypen zurück
         * @returns {object} Alle Basis-Scores
         */
        getAllBaseScores: function() {
            return baseScores;
        },

        /**
         * Gibt alle Modifikatoren für Debugging/Inspection zurück
         * @returns {object} { gender, dominance, orientation }
         */
        getAllModifiers: function() {
            return {
                gender: genderModifiers,
                dominance: dominanceModifiers,
                orientation: orientationModifiers
            };
        }
    };

})();
