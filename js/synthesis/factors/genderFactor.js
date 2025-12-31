/**
 * TIAGE SYNTHESE - Geschlechts-Faktor
 *
 * PATHOS (Gefühl) - 15% Gewichtung
 *
 * Feinjustierung der Gender-Chemie als Ergänzung zum Orientierungs-Faktor.
 * Berücksichtigt die spezifische Geschlechterkombination im Kontext
 * der sexuellen Orientierungen.
 */

var TiageSynthesis = TiageSynthesis || {};
TiageSynthesis.Factors = TiageSynthesis.Factors || {};

TiageSynthesis.Factors.Geschlecht = {

    /**
     * Berechnet die Gender-Attraktion
     *
     * @param {object} person1 - { geschlecht: { primary, secondary }, orientierung }
     * @param {object} person2 - { geschlecht: { primary, secondary }, orientierung }
     * @returns {object} { score: 0-100, details: {...} }
     */
    calculate: function(person1, person2) {
        var constants = TiageSynthesis.Constants;

        // Extrahiere primäres Geschlecht (unterstützt altes und neues Format)
        var g1 = this._extractPrimaryGeschlecht(person1.geschlecht);
        var g2 = this._extractPrimaryGeschlecht(person2.geschlecht);

        // Sekundäre Geschlechter für zusätzliche Kompatibilitätslogik
        var g1Secondary = this._extractSecondaryGeschlecht(person1.geschlecht);
        var g2Secondary = this._extractSecondaryGeschlecht(person2.geschlecht);

        // Orientierungen extrahieren
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

        // Finde beste Kombination mit Primary-Geschlechtern
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

        // Bonus für kompatible sekundäre Geschlechter (max +5 Punkte)
        var secondaryBonus = this._calculateSecondaryBonus(g1, g1Secondary, g2, g2Secondary, oriList1, oriList2, constants);

        // NEU: Identitäts-Resonanz berechnen (wenn sekundäre Geschlechter vorhanden)
        var identityResonance = null;
        if (g1Secondary && g2Secondary && constants.IDENTITY_MATRIX) {
            identityResonance = this._calculateIdentityResonance(g1Secondary, g2Secondary, constants);
        }

        return {
            score: Math.min(100, bestScore + secondaryBonus),
            details: {
                bestCombination: bestCombination,
                genderCombo: g1 + '-' + g2,
                attractionLevel: this._getAttractionLevel(bestScore),
                hasSecondary: !!(g1Secondary || g2Secondary),
                secondaryBonus: secondaryBonus,
                // NEU: Identitäts-Resonanz-Details
                identityResonance: identityResonance
            }
        };
    },

    /**
     * Extrahiert das Geschlecht für Orientierungslogik
     *
     * NEUES SYSTEM mit P/S (kontextabhängig):
     * - P = Körper (mann, frau, inter)
     * - S = Identität:
     *   - Binär (Mann/Frau): cis, trans, nonbinaer
     *   - Divers (Inter): nonbinaer, fluid, suchend
     *
     * Logik für Orientierung:
     * - P=Mann + S=Cis → mann (identifiziert als Mann)
     * - P=Mann + S=Trans → frau (identifiziert als Frau)
     * - P=Mann + S=Nonbinär → mann_nonbinaer (männlicher Körper, nonbinäre Seele)
     * - P=Frau + S=Cis → frau (identifiziert als Frau)
     * - P=Frau + S=Trans → mann (identifiziert als Mann)
     * - P=Frau + S=Nonbinär → frau_nonbinaer (weiblicher Körper, nonbinäre Seele)
     * - P=Inter + S=Nonbinär → nonbinaer
     * - P=Inter + S=Fluid → fluid
     * - P=Inter + S=Suchend → suchend
     */
    _extractPrimaryGeschlecht: function(geschlecht) {
        if (!geschlecht) return null;

        // Neues Format: { primary, secondary }
        if (typeof geschlecht === 'object') {
            var primary = geschlecht.primary;   // Körper: mann, frau, inter
            var secondary = geschlecht.secondary; // Identität: cis, trans, unsicher, nonbinaer, fluid

            // Wenn S gesetzt ist, berechne effektive Identität
            if (secondary !== undefined && secondary !== null) {
                // Cis: Identität = Körper
                if (secondary === 'cis') {
                    return primary; // mann → mann, frau → frau
                }
                // Trans: Identität = Gegenteil des Körpers
                if (secondary === 'trans') {
                    if (primary === 'mann') return 'frau';
                    if (primary === 'frau') return 'mann';
                    return primary; // inter bleibt inter
                }
                // Nonbinär: Bei Mann/Frau eigene Kategorie, bei Inter direkt
                if (secondary === 'nonbinaer') {
                    if (primary === 'mann') return 'mann_nonbinaer';
                    if (primary === 'frau') return 'frau_nonbinaer';
                    return 'nonbinaer';  // Inter+Nonbinär bleibt 'nonbinaer'
                }
                // Fluid, Suchend: direkt verwenden
                if (secondary === 'fluid' || secondary === 'suchend') {
                    return secondary;
                }
                // Fallback: S-Wert direkt (für Legacy-Kompatibilität)
                return secondary;
            }

            // Kein S gesetzt: Fallback auf P (Körper)
            if (primary !== undefined) {
                return primary;
            }
        }

        // Altes Format: String direkt
        if (typeof geschlecht === 'string') {
            return geschlecht;
        }
        return null;
    },

    /**
     * Extrahiert das biologische/körperliche Geschlecht (Primär)
     */
    _extractBodyGeschlecht: function(geschlecht) {
        if (!geschlecht) return null;
        if (typeof geschlecht === 'object' && geschlecht.primary !== undefined) {
            return geschlecht.primary;
        }
        if (typeof geschlecht === 'string') {
            return geschlecht;
        }
        return null;
    },

    /**
     * Extrahiert sekundäres Geschlecht (Identität)
     */
    _extractSecondaryGeschlecht: function(geschlecht) {
        if (!geschlecht) return null;
        if (typeof geschlecht === 'object' && geschlecht.secondary !== undefined) {
            return geschlecht.secondary;
        }
        return null;
    },

    /**
     * Berechnet Identitäts-Resonanz basierend auf Matrix + Offenheits-Bonus
     *
     * Philosophie:
     * - Pirsig: "Qualität entsteht, wenn Muster resonieren" → Matrix
     * - Osho: "Je offener zwei Flüsse, desto leichter münden sie ineinander" → Bonus
     *
     * @param {string} identity1 - Geschlechtsidentität Person 1 (cis, trans, nonbinaer, fluid, suchend)
     * @param {string} identity2 - Geschlechtsidentität Person 2
     * @param {object} constants - Konstanten-Objekt
     * @returns {object} { score: 0-100, matrixScore, opennessBonus, details }
     */
    _calculateIdentityResonance: function(identity1, identity2, constants) {
        // Normalisiere Identitäten zu Lowercase
        var id1 = (identity1 || 'cis').toLowerCase();
        var id2 = (identity2 || 'cis').toLowerCase();

        // Matrix-Lookup
        var matrixKey = id1 + '-' + id2;
        var matrixScore = constants.IDENTITY_MATRIX[matrixKey];

        // Fallback wenn Kombination nicht in Matrix (z.B. alte Daten)
        if (matrixScore === undefined) {
            matrixScore = 75; // Neutraler Wert
        }

        // Offenheits-Werte holen
        var openness1 = constants.IDENTITY_OPENNESS[id1];
        var openness2 = constants.IDENTITY_OPENNESS[id2];

        // Fallback für unbekannte Identitäten
        if (openness1 === undefined) openness1 = 50;
        if (openness2 === undefined) openness2 = 50;

        // Offenheits-Bonus berechnen: (O1 + O2) / 200 × MAX_BONUS
        var maxBonus = constants.IDENTITY_RESONANCE.MAX_BONUS;
        var opennessBonus = ((openness1 + openness2) / 200) * maxBonus;

        // Finale Score (max 100)
        var finalScore = Math.min(100, Math.round(matrixScore + opennessBonus));

        return {
            score: finalScore,
            matrixScore: matrixScore,
            opennessBonus: Math.round(opennessBonus * 10) / 10,
            identity1: id1,
            identity2: id2,
            openness1: openness1,
            openness2: openness2
        };
    },

    /**
     * Berechnet Bonus wenn sekundäre Geschlechter zusätzliche Kompatibilität bieten
     * ERWEITERT: Nutzt jetzt Identitäts-Resonanz für den Bonus
     */
    _calculateSecondaryBonus: function(g1, g1Sec, g2, g2Sec, oriList1, oriList2, constants) {
        if (!g1Sec && !g2Sec) return 0;

        var bonus = 0;

        // NEU: Identitäts-Resonanz zwischen sekundären Geschlechtern
        if (g1Sec && g2Sec && constants.IDENTITY_MATRIX) {
            var resonance = this._calculateIdentityResonance(g1Sec, g2Sec, constants);
            // Bonus proportional zur Resonanz (max +5 bei Score 100)
            bonus = Math.round((resonance.score / 100) * 5);
        } else {
            // Fallback: Alte Logik wenn Matrix nicht verfügbar
            if (g1Sec) {
                for (var i = 0; i < oriList2.length; i++) {
                    var testResult = this._calculateSingleAttraction(g1Sec, oriList1[0], g2, oriList2[i], constants);
                    if (testResult.score >= 80) {
                        bonus = Math.max(bonus, 3);
                    }
                }
            }

            if (g2Sec) {
                for (var j = 0; j < oriList1.length; j++) {
                    var testResult = this._calculateSingleAttraction(g1, oriList1[j], g2Sec, oriList2[0], constants);
                    if (testResult.score >= 80) {
                        bonus = Math.max(bonus, 3);
                    }
                }
            }

            if (g1Sec && g2Sec) {
                var secResult = this._calculateSingleAttraction(g1Sec, oriList1[0], g2Sec, oriList2[0], constants);
                if (secResult.score >= 80) {
                    bonus = Math.max(bonus, 5);
                }
            }
        }

        return bonus;
    },

    /**
     * Extrahiert Orientierungen als String-Array
     *
     * Unterstützt drei Formate:
     * 1. String: 'heterosexuell' → ['heterosexuell']
     * 2. NEU P/S-Format: { primary: 'heterosexuell', secondary: 'bisexuell' }
     * 3. Altes Multi-Select: { heterosexuell: 'gelebt', bisexuell: 'interessiert' }
     */
    _extractOrientations: function(person) {
        var list = [];
        var ori = person.orientierung;

        if (!ori) return list;

        if (typeof ori === 'object') {
            // NEU: Handle Primary/Secondary Format aus UI
            if ('primary' in ori) {
                if (ori.primary) {
                    list.push(ori.primary);
                }
                if (ori.secondary) {
                    list.push(ori.secondary);
                }
                return list;
            }

            // Altes Multi-Select Format: { heterosexuell: 'gelebt', ... }
            if (ori.heterosexuell) list.push('heterosexuell');
            if (ori.homosexuell) list.push('homosexuell');
            if (ori.bisexuell) list.push('bisexuell');
            if (ori.pansexuell) list.push('pansexuell');
        } else if (typeof ori === 'string') {
            list.push(ori);
        }

        return list;
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
