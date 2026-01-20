/**
 * TIAGE SYNTHESE - Geschlechts-Faktor (v4.0)
 *
 * PATHOS (Gefühl) - 25% Gewichtung
 *
 * v4.0: Vereinfacht - Geschlecht ist jetzt ein String, Orientierung ein Array (Multi-Select).
 * R4 (Identitäts-Resonanz) basiert auf Orientierung statt Cis/Trans.
 */

var TiageSynthesis = TiageSynthesis || {};
TiageSynthesis.Factors = TiageSynthesis.Factors || {};

TiageSynthesis.Factors.Geschlecht = {

    /**
     * Berechnet die Gender-Attraktion (v4.0)
     *
     * @param {object} person1 - { geschlecht: string, orientierung: string[] }
     * @param {object} person2 - { geschlecht: string, orientierung: string[] }
     * @returns {object} { score: 0-100, details: {...} }
     */
    calculate: function(person1, person2) {
        var constants = TiageSynthesis.Constants;

        // v4.0: Geschlecht ist jetzt ein String
        var g1 = this._extractGeschlecht(person1.geschlecht);
        var g2 = this._extractGeschlecht(person2.geschlecht);

        // v4.0: Orientierung ist jetzt ein Array
        var oriList1 = this._extractOrientations(person1);
        var oriList2 = this._extractOrientations(person2);

        // Unvollständige Daten
        if (!g1 || !g2 || oriList1.length === 0 || oriList2.length === 0) {
            return {
                score: 75,
                details: {
                    reason: 'Unvollständige Daten',
                    genderCombo: null
                }
            };
        }

        // Finde beste Kombination
        var bestScore = 0;
        var bestCombination = null;

        for (var i = 0; i < oriList1.length; i++) {
            for (var j = 0; j < oriList2.length; j++) {
                var result = this._calculateSingleAttraction(g1, oriList1[i], g2, oriList2[j], constants);

                if (result.score > bestScore) {
                    bestScore = result.score;
                    bestCombination = {
                        gender1: g1,
                        gender2: g2,
                        ori1: oriList1[i],
                        ori2: oriList2[j],
                        matchType: result.matchType
                    };
                }
            }
        }

        // v4.0: Orientierungs-Resonanz (ersetzt Identity-Resonanz)
        var orientierungResonance = this._calculateOrientierungResonance(oriList1, oriList2, constants);
        var resonanceBonus = Math.round((orientierungResonance.score / 100) * 5);

        return {
            score: bestScore + resonanceBonus,
            details: {
                bestCombination: bestCombination,
                genderCombo: g1 + '-' + g2,
                attractionLevel: this._getAttractionLevel(bestScore),
                resonanceBonus: resonanceBonus,
                // v4.0: Orientierungs-Resonanz statt Identitäts-Resonanz
                orientierungResonance: orientierungResonance
            }
        };
    },

    /**
     * Extrahiert das Geschlecht (v4.0: vereinfacht)
     * v4.0: Geschlecht ist ein String ('mann', 'frau', 'nonbinaer')
     */
    _extractGeschlecht: function(geschlecht) {
        if (!geschlecht) return null;

        // v4.0: String direkt
        if (typeof geschlecht === 'string') {
            return geschlecht;
        }

        // LEGACY: Altes Format { primary, secondary } - migrieren
        if (typeof geschlecht === 'object') {
            var primary = geschlecht.primary;
            var secondary = geschlecht.secondary;

            // Trans: Identität umkehren
            if (secondary === 'trans') {
                if (primary === 'mann') return 'frau';
                if (primary === 'frau') return 'mann';
            }
            // Nonbinär/Fluid: zu nonbinaer
            if (secondary === 'nonbinaer' || secondary === 'fluid') {
                return 'nonbinaer';
            }
            // Inter → nonbinaer in v4.0
            if (primary === 'inter') return 'nonbinaer';
            // Cis oder default: primary
            return primary;
        }

        return null;
    },

    // LEGACY: Aliase für Rückwärtskompatibilität
    _extractPrimaryGeschlecht: function(geschlecht) {
        return this._extractGeschlecht(geschlecht);
    },
    _extractSecondaryGeschlecht: function(geschlecht) {
        return null; // v4.0: Kein Secondary mehr
    },
    _extractBodyGeschlecht: function(geschlecht) {
        return this._extractGeschlecht(geschlecht);
    },

    /**
     * Berechnet Orientierungs-Resonanz (v4.0: ersetzt Identity-Resonanz)
     *
     * R4 basiert jetzt auf der Offenheit der sexuellen Orientierung.
     * Multi-Select: Höchster Openness-Wert wird verwendet.
     *
     * @param {string[]} oriList1 - Orientierungen Person 1
     * @param {string[]} oriList2 - Orientierungen Person 2
     * @param {object} constants - Konstanten-Objekt
     * @returns {object} { score: 0-100, openness1, openness2, details }
     */
    _calculateOrientierungResonance: function(oriList1, oriList2, constants) {
        // v5.0 SSOT: Openness-Werte aus TiageSynthesis.Constants.ORIENTIERUNG_OPTIONS.OPENNESS
        var opennessMap = (function() {
            // Versuche SSOT zu verwenden
            if (typeof TiageSynthesis !== 'undefined' &&
                TiageSynthesis.Constants &&
                TiageSynthesis.Constants.ORIENTIERUNG_OPTIONS &&
                TiageSynthesis.Constants.ORIENTIERUNG_OPTIONS.OPENNESS) {
                return TiageSynthesis.Constants.ORIENTIERUNG_OPTIONS.OPENNESS;
            }
            // Fallback mit allen 5 aktuellen + Legacy-Optionen
            return {
                // v5.0 SSOT: Aktuelle Optionen
                'heterosexuell': 0,
                'homosexuell': 0,
                'bisexuell': 70,
                'pansexuell': 100,
                'queer': 100,
                // Legacy-Keys (für Rückwärtskompatibilität)
                'gay_lesbisch': 0,
                'bihomo': 70,
                'pansexuell_queer': 100
            };
        })();

        // Höchsten Openness-Wert für jede Person ermitteln (Multi-Select)
        var openness1 = 0;
        for (var i = 0; i < oriList1.length; i++) {
            var val = opennessMap[oriList1[i]] || 0;
            if (val > openness1) openness1 = val;
        }

        var openness2 = 0;
        for (var j = 0; j < oriList2.length; j++) {
            var val2 = opennessMap[oriList2[j]] || 0;
            if (val2 > openness2) openness2 = val2;
        }

        // Matrix-Score: Beste Übereinstimmung zwischen Orientierungen
        var matrixMap = (constants.ORIENTIERUNG_MATRIX_V4 || {});
        var bestMatrixScore = 75; // Default

        for (var a = 0; a < oriList1.length; a++) {
            for (var b = 0; b < oriList2.length; b++) {
                var key = oriList1[a] + '-' + oriList2[b];
                var score = matrixMap[key];
                if (score !== undefined && score > bestMatrixScore) {
                    bestMatrixScore = score;
                }
                // Gleiche Orientierung = 100
                if (oriList1[a] === oriList2[b]) {
                    bestMatrixScore = Math.max(bestMatrixScore, 100);
                }
            }
        }

        // Openness-Bonus berechnen: (O1 + O2) / 200 × MAX_BONUS
        var maxBonus = (constants.IDENTITY_RESONANCE && constants.IDENTITY_RESONANCE.MAX_BONUS) || 10;
        var opennessBonus = ((openness1 + openness2) / 200) * maxBonus;

        var finalScore = Math.round(bestMatrixScore + opennessBonus);

        return {
            score: finalScore,
            matrixScore: bestMatrixScore,
            opennessBonus: Math.round(opennessBonus * 10) / 10,
            openness1: openness1,
            openness2: openness2,
            orientations1: oriList1,
            orientations2: oriList2
        };
    },

    // LEGACY: Alte Identity-Resonanz für Rückwärtskompatibilität
    _calculateIdentityResonance: function(identity1, identity2, constants) {
        // v4.0: Leitet an Orientierungs-Resonanz weiter mit Dummy-Werten
        console.warn('[GenderFactor] _calculateIdentityResonance is deprecated in v4.0');
        return { score: 75, matrixScore: 75, opennessBonus: 0 };
    },
    _calculateSecondaryBonus: function() {
        return 0; // v4.0: Kein Secondary mehr
    },

    /**
     * Extrahiert Orientierungen als String-Array
     * v5.0 SSOT: Alle 5 Orientierungen: heterosexuell, homosexuell, bisexuell, pansexuell, queer
     */
    _extractOrientations: function(person) {
        var ori = person.orientierung;
        if (!ori) return [];

        // v5.0 SSOT: Migration-Helper
        var migrateType = function(type) {
            // Hole Legacy-Migration aus SSOT
            var constants = TiageSynthesis.Constants;
            if (constants && constants.ORIENTIERUNG_OPTIONS && constants.ORIENTIERUNG_OPTIONS.LEGACY_MIGRATION) {
                var migrated = constants.ORIENTIERUNG_OPTIONS.LEGACY_MIGRATION[type];
                if (migrated) return migrated;
            }
            // Fallback-Migration
            if (type === 'bihomo') return 'bisexuell';
            if (type === 'gay_lesbisch') return 'homosexuell';
            if (type === 'pansexuell_queer') return 'pansexuell';
            return type;
        };

        // v5.0: Array direkt (mit Migration)
        if (Array.isArray(ori)) {
            return ori.map(function(o) { return migrateType(o); });
        }

        // String zu Array (mit Migration)
        if (typeof ori === 'string') {
            return [migrateType(ori)];
        }

        // LEGACY: { primary, secondary } Format
        if (typeof ori === 'object' && 'primary' in ori) {
            var list = [];
            if (ori.primary) list.push(migrateType(ori.primary));
            if (ori.secondary && ori.secondary !== ori.primary) list.push(migrateType(ori.secondary));
            return list;
        }

        // LEGACY: { heterosexuell: 'gelebt', ... } Format
        // v5.0 SSOT: Alle 5 aktuellen + Legacy-Keys
        if (typeof ori === 'object') {
            var list2 = [];
            if (ori.heterosexuell) list2.push('heterosexuell');
            if (ori.homosexuell) list2.push('homosexuell');
            if (ori.bisexuell) list2.push('bisexuell');
            if (ori.pansexuell) list2.push('pansexuell');
            if (ori.queer) list2.push('queer');
            // Legacy-Keys (migrieren)
            if (ori.gay_lesbisch) list2.push('homosexuell');
            if (ori.pansexuell_queer) list2.push('pansexuell');
            if (ori.bihomo) list2.push('bisexuell');
            return list2;
        }

        return [];
    },

    /**
     * Konvertiert extrahiertes Geschlecht zu Kategorie für Orientierungslogik
     *
     * Die Werte kommen aus _extractPrimaryGeschlecht, das bereits
     * die P/S-Logik (cis/trans) aufgelöst hat.
     *
     * Ergebnis-Werte: maennlich, weiblich, nonbinaer, fluid, inter, mann_nonbinaer, frau_nonbinaer, andere
     */
    _getGeschlechtCategory: function(geschlecht) {
        var categoryMap = {
            // Aufgelöste Identitäts-Werte
            'mann': 'maennlich',
            'frau': 'weiblich',
            'nonbinaer': 'nonbinaer',
            'fluid': 'fluid',
            'suchend': 'suchend',  // Suchend = eigene Kategorie (Exploration)
            'inter': 'inter',
            // NEU: Mann/Frau + Nonbinär als eigene Kategorien
            'mann_nonbinaer': 'mann_nonbinaer',
            'frau_nonbinaer': 'frau_nonbinaer',
            // Legacy-Support für alte Daten
            'cis_mann': 'maennlich',
            'cis_frau': 'weiblich',
            'trans_mann': 'maennlich',
            'trans_frau': 'weiblich',
            'genderfluid': 'fluid',
            'agender': 'nonbinaer',
            'intersex': 'inter',
            'divers': 'nonbinaer',
            'männlich': 'maennlich',
            'weiblich': 'weiblich',
            'non-binär': 'nonbinaer',
            'nonbinär': 'nonbinaer'
        };
        return categoryMap[geschlecht] || 'andere';
    },

    /**
     * Berechnet Attraktion für einzelne Kombination
     * Nutzt Geschlechts-Kategorien für erweiterte Gender-Unterstützung
     */
    _calculateSingleAttraction: function(g1, o1, g2, o2, constants) {
        var gender = constants.GENDER;

        // Konvertiere zu Kategorien
        var cat1 = this._getGeschlechtCategory(g1);
        var cat2 = this._getGeschlechtCategory(g2);

        // Bisexuell = immer volle Kompatibilität
        if (o1 === 'bisexuell' || o2 === 'bisexuell') {
            return { score: gender.FULL_MATCH, matchType: 'bisexuell' };
        }

        // Heterosexuell + Heterosexuell
        if (o1 === 'heterosexuell' && o2 === 'heterosexuell') {
            // männlich ↔ weiblich = perfekt
            if ((cat1 === 'maennlich' && cat2 === 'weiblich') ||
                (cat1 === 'weiblich' && cat2 === 'maennlich')) {
                return { score: gender.FULL_MATCH, matchType: 'hetero-klassisch' };
            }
            // Nonbinär/Fluid/Inter beteiligt
            if (cat1 === 'nonbinaer' || cat2 === 'nonbinaer' ||
                cat1 === 'fluid' || cat2 === 'fluid' ||
                cat1 === 'inter' || cat2 === 'inter') {
                return { score: gender.NON_BINARY_INVOLVED, matchType: 'hetero-nonbinary' };
            }
            // Agender beteiligt
            if (cat1 === 'agender' || cat2 === 'agender') {
                return { score: 60, matchType: 'hetero-agender' };
            }
            // Gleiches Geschlecht, beide hetero → niedrig aber nicht 0
            return { score: 20, matchType: 'hetero-mismatch' };
        }

        // Homosexuell + Homosexuell
        if (o1 === 'homosexuell' && o2 === 'homosexuell') {
            // Gleiche binäre Kategorie = perfekt
            if (cat1 === cat2 && cat1 !== 'nonbinaer' && cat1 !== 'fluid' && cat1 !== 'agender' && cat1 !== 'inter') {
                return { score: gender.FULL_MATCH, matchType: 'homo-klassisch' };
            }
            // Nonbinär/Inter mit Nonbinär/Inter
            if ((cat1 === 'nonbinaer' && cat2 === 'nonbinaer') ||
                (cat1 === 'fluid' && cat2 === 'fluid') ||
                (cat1 === 'inter' && cat2 === 'inter')) {
                return { score: 90, matchType: 'homo-nonbinary-match' };
            }
            // Nonbinär/Fluid/Inter beteiligt
            if (cat1 === 'nonbinaer' || cat2 === 'nonbinaer' ||
                cat1 === 'fluid' || cat2 === 'fluid' ||
                cat1 === 'inter' || cat2 === 'inter') {
                return { score: gender.NON_BINARY_INVOLVED, matchType: 'homo-nonbinary' };
            }
            // Agender beteiligt
            if (cat1 === 'agender' || cat2 === 'agender') {
                return { score: 60, matchType: 'homo-agender' };
            }
            // Verschiedene binäre Kategorien, beide homo → niedrig
            return { score: 20, matchType: 'homo-mismatch' };
        }

        // Gemischte Orientierungen
        return { score: gender.MIXED_ORIENTATION, matchType: 'gemischt' };
    },

    /**
     * Gibt das Attraktions-Level als Text zurück
     */
    _getAttractionLevel: function(score) {
        if (score >= 95) return 'maximal';
        if (score >= 75) return 'hoch';
        if (score >= 50) return 'mittel';
        if (score >= 25) return 'niedrig';
        return 'minimal';
    }
};
