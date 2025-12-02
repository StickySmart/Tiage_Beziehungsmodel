/**
 * TIAGE SYNTHESE - Orientierungs-Faktor
 *
 * PATHOS (Gefühl) - 40% Gewichtung
 *
 * Philosophische Grundlage: OSHO's Polarität + Pirsig's Dynamische Qualität
 *
 * OSHO: "Polarität ist Voraussetzung für Anziehung"
 *
 * HARD-KO vs SOFT-KO:
 * - Hard-KO (0%): Geometrisch unmöglich - beide suchen jemand anderen
 *   → Hetero♂ + Hetero♂, Hetero♀ + Hetero♀, Homo♂ + Lesbe♀
 *   → Resonanz kann das NICHT überschreiben (neurologische Realität)
 * - Soft-KO (10%): Unwahrscheinlich aber nicht unmöglich
 *   → Hetero + Homo gemischt (einer könnte sich angezogen fühlen)
 */

var TiageSynthesis = TiageSynthesis || {};
TiageSynthesis.Factors = TiageSynthesis.Factors || {};

TiageSynthesis.Factors.Orientierung = {

    /**
     * Berechnet die Orientierungs-Kompatibilität
     *
     * @param {object} person1 - { geschlecht, orientierung: { heterosexuell, homosexuell, bisexuell } }
     * @param {object} person2 - { geschlecht, orientierung: { ... } }
     * @returns {object} { score: 0-100, details: {...} }
     */
    calculate: function(person1, person2) {
        var constants = TiageSynthesis.Constants;
        var g1 = this._extractGeschlecht(person1.geschlecht);
        var g2 = this._extractGeschlecht(person2.geschlecht);

        // Orientierungen extrahieren
        var oriList1 = this._extractOrientations(person1);
        var oriList2 = this._extractOrientations(person2);

        // Unvollständige Daten
        if (!g1 || !g2 || oriList1.length === 0 || oriList2.length === 0) {
            return {
                score: 50,
                details: {
                    result: 'unvollstaendig',
                    reason: 'Fehlende Daten für Orientierungs-Berechnung'
                }
            };
        }

        // Prüfe alle Kombinationen
        var bestResult = this._findBestCompatibility(oriList1, oriList2, g1, g2);

        // Score basierend auf Ergebnis
        var score = this._resultToScore(bestResult.result, constants);

        return {
            score: score,
            details: {
                result: bestResult.result,
                confidence: bestResult.confidence,
                hasExploration: bestResult.hasExploration,
                isHardKO: bestResult.isHardKO || false,
                hardKOReason: bestResult.hardKOReason || null,
                bestCombination: bestResult.bestCombination,
                allOptions1: oriList1,
                allOptions2: oriList2
            }
        };
    },

    /**
     * Extrahiert Geschlecht aus P/S-Format oder String
     * Für Orientierungslogik wird sekundär (Identität) bevorzugt
     */
    _extractGeschlecht: function(geschlecht) {
        if (!geschlecht) return null;
        // Neues P/S-Format: { primary, secondary }
        if (typeof geschlecht === 'object') {
            // Sekundär (Identität) hat Vorrang für Orientierungslogik
            if (geschlecht.secondary !== undefined && geschlecht.secondary !== null) {
                return geschlecht.secondary;
            }
            // Fallback auf Primär (Körper)
            if (geschlecht.primary !== undefined) {
                return geschlecht.primary;
            }
        }
        // Altes Format: String direkt
        if (typeof geschlecht === 'string') {
            return geschlecht;
        }
        return null;
    },

    /**
     * Extrahiert Orientierungen aus Person-Objekt
     */
    _extractOrientations: function(person) {
        var list = [];
        var ori = person.orientierung;

        if (!ori) return list;

        if (typeof ori === 'object') {
            // Neues P/S-Format: { primary: 'heterosexuell', secondary: 'bisexuell' }
            if ('primary' in ori) {
                if (ori.primary) {
                    list.push({ type: ori.primary, status: 'gelebt' });
                }
                if (ori.secondary) {
                    list.push({ type: ori.secondary, status: 'interessiert' });
                }
            }
            // Altes Multi-Select Format: { heterosexuell: 'gelebt', ... }
            else {
                var types = ['heterosexuell', 'homosexuell', 'bisexuell'];
                for (var i = 0; i < types.length; i++) {
                    var type = types[i];
                    if (ori[type]) {
                        list.push({ type: type, status: ori[type] });
                    }
                }
            }
        }
        // Altes String-Format (Rückwärtskompatibilität)
        else if (typeof ori === 'string') {
            list.push({
                type: ori,
                status: person.orientierungStatus || 'gelebt'
            });
        }

        return list;
    },

    /**
     * Findet beste Kompatibilität aus allen Kombinationen
     */
    _findBestCompatibility: function(oriList1, oriList2, g1, g2) {
        var hasMoeglich = false;
        var hasUnsicher = false;
        var hasInteressiert = false;
        var hasHardKO = false;
        var hardKOReason = null;
        var bestCombination = null;

        for (var i = 0; i < oriList1.length; i++) {
            for (var j = 0; j < oriList2.length; j++) {
                var o1 = oriList1[i];
                var o2 = oriList2[j];

                var checkResult = this._checkSinglePair(o1.type, o1.status, o2.type, o2.status, g1, g2);
                var result = checkResult.result;

                if (result === 'moeglich') {
                    hasMoeglich = true;
                    bestCombination = { ori1: o1, ori2: o2 };
                } else if (result === 'unsicher') {
                    hasUnsicher = true;
                    if (!bestCombination) {
                        bestCombination = { ori1: o1, ori2: o2 };
                    }
                } else if (checkResult.isHardKO) {
                    hasHardKO = true;
                    hardKOReason = checkResult.reason;
                }

                if (o1.status === 'interessiert' || o2.status === 'interessiert') {
                    hasInteressiert = true;
                }
            }
        }

        // Bestes Ergebnis bestimmen
        if (hasMoeglich && !hasInteressiert) {
            return {
                result: 'moeglich',
                confidence: 'hoch',
                hasExploration: false,
                isHardKO: false,
                bestCombination: bestCombination
            };
        }

        if (hasMoeglich && hasInteressiert) {
            return {
                result: 'unsicher',
                confidence: 'mittel',
                hasExploration: true,
                isHardKO: false,
                bestCombination: bestCombination
            };
        }

        if (hasUnsicher) {
            return {
                result: 'unsicher',
                confidence: 'niedrig',
                hasExploration: true,
                isHardKO: false,
                bestCombination: bestCombination
            };
        }

        // Hard-KO: Geometrisch unmöglich
        if (hasHardKO) {
            return {
                result: 'hardKO',
                confidence: 'sicher',
                hasExploration: false,
                isHardKO: true,
                hardKOReason: hardKOReason,
                bestCombination: null
            };
        }

        // Soft-KO: Unwahrscheinlich aber nicht unmöglich
        return {
            result: 'unwahrscheinlich',
            confidence: 'sehr-niedrig',
            hasExploration: false,
            isHardKO: false,
            bestCombination: null
        };
    },

    /**
     * Prüft einzelnes Orientierungs-Paar
     *
     * Returns: { result: string, isHardKO: boolean }
     */
    _checkSinglePair: function(type1, status1, type2, status2, g1, g2) {
        var isExploring = (status1 === 'interessiert' || status2 === 'interessiert');

        // Bisexuell ist immer kompatibel
        if (type1 === 'bisexuell' || type2 === 'bisexuell') {
            return {
                result: isExploring ? 'unsicher' : 'moeglich',
                isHardKO: false
            };
        }

        // Beide heterosexuell
        if (type1 === 'heterosexuell' && type2 === 'heterosexuell') {
            if (g1 !== g2) {
                return {
                    result: isExploring ? 'unsicher' : 'moeglich',
                    isHardKO: false
                };
            }
            // HARD-KO: Gleiches Geschlecht, beide hetero → beide suchen jemand anderen
            return {
                result: 'hardKO',
                isHardKO: true,
                reason: 'hetero_same_gender'
            };
        }

        // Beide homosexuell
        if (type1 === 'homosexuell' && type2 === 'homosexuell') {
            if (g1 === g2) {
                return {
                    result: isExploring ? 'unsicher' : 'moeglich',
                    isHardKO: false
                };
            }
            // HARD-KO: Verschiedenes Geschlecht, beide homo → beide suchen jemand anderen
            return {
                result: 'hardKO',
                isHardKO: true,
                reason: 'homo_different_gender'
            };
        }

        // Gemischt: hetero + homo
        // Prüfe ob es ein Hard-KO ist (BEIDE suchen jemand anderen)
        var hardKOCheck = this._checkHeteroHomoHardKO(type1, type2, g1, g2);
        if (hardKOCheck.isHardKO) {
            return hardKOCheck;
        }

        // Soft-KO: Mindestens einer könnte sich angezogen fühlen
        if (isExploring) {
            return { result: 'unsicher', isHardKO: false };
        }
        return { result: 'unmoeglich', isHardKO: false };
    },

    /**
     * Prüft Hetero+Homo Kombinationen auf Hard-KO
     *
     * Hard-KO wenn BEIDE jemand anderen suchen:
     * - Hetero♂ + Homo♂ = Er sucht ♀, der andere sucht andere ♂ → Soft-KO (einer sucht ihn)
     * - Hetero♀ + Lesbe = Sie sucht ♂, die andere sucht ♀ → Soft-KO (eine sucht sie)
     * - Homo♂ + Hetero♀ = Er sucht ♂, sie sucht ♂ (aber nicht ihn) → Soft-KO
     * - Lesbe + Hetero♂ = Sie sucht ♀, er sucht ♀ (aber nicht sie) → Soft-KO
     */
    _checkHeteroHomoHardKO: function(type1, type2, g1, g2) {
        // Bei Hetero+Homo Kombinationen ist es technisch ein Soft-KO,
        // weil zumindest einer den anderen attraktiv finden KÖNNTE
        // (auch wenn es nicht gegenseitig ist)

        // Echtes Hard-KO nur wenn BEIDE definitiv jemand komplett anderen suchen
        // Das passiert nur bei:
        // - Hetero♂ + Lesbe♀ → Er sucht Frauen (sie nicht), sie sucht Frauen (nicht ihn)
        // - Hetero♀ + Homo♂ → Sie sucht Männer (er nicht), er sucht Männer (nicht sie)

        var isHetero1 = (type1 === 'heterosexuell');
        var isHomo1 = (type1 === 'homosexuell');
        var isHetero2 = (type2 === 'heterosexuell');
        var isHomo2 = (type2 === 'homosexuell');

        // Normalisiere Geschlecht für Vergleich
        var isMale1 = this._isMaleGender(g1);
        var isFemale1 = this._isFemaleGender(g1);
        var isMale2 = this._isMaleGender(g2);
        var isFemale2 = this._isFemaleGender(g2);

        // Fall 1: Hetero♂ + Lesbe♀
        // Er sucht Frauen, aber nicht Lesben (die ihn nicht wollen)
        // Sie sucht Frauen, nicht Männer
        // → KEINE gegenseitige Anziehung möglich
        if (isHetero1 && isMale1 && isHomo2 && isFemale2) {
            return {
                result: 'hardKO',
                isHardKO: true,
                reason: 'hetero_male_lesbian_female'
            };
        }

        // Fall 2: Lesbe♀ + Hetero♂ (umgekehrt)
        if (isHomo1 && isFemale1 && isHetero2 && isMale2) {
            return {
                result: 'hardKO',
                isHardKO: true,
                reason: 'lesbian_female_hetero_male'
            };
        }

        // Fall 3: Hetero♀ + Homo♂
        // Sie sucht Männer, aber nicht schwule (die sie nicht wollen)
        // Er sucht Männer, nicht Frauen
        // → KEINE gegenseitige Anziehung möglich
        if (isHetero1 && isFemale1 && isHomo2 && isMale2) {
            return {
                result: 'hardKO',
                isHardKO: true,
                reason: 'hetero_female_homo_male'
            };
        }

        // Fall 4: Homo♂ + Hetero♀ (umgekehrt)
        if (isHomo1 && isMale1 && isHetero2 && isFemale2) {
            return {
                result: 'hardKO',
                isHardKO: true,
                reason: 'homo_male_hetero_female'
            };
        }

        // Alle anderen Hetero+Homo Kombinationen: Soft-KO
        return { result: 'unmoeglich', isHardKO: false };
    },

    /**
     * Prüft ob Geschlecht männlich ist (inkl. Trans)
     */
    _isMaleGender: function(gender) {
        if (!gender) return false;
        if (typeof gender !== 'string') return false;
        var g = gender.toLowerCase();
        return g === 'männlich' || g === 'cis_mann' || g === 'trans_mann' ||
               g === 'mann' || g === 'male' || g === 'm' || g === 'maennlich';
    },

    /**
     * Prüft ob Geschlecht weiblich ist (inkl. Trans)
     */
    _isFemaleGender: function(gender) {
        if (!gender) return false;
        if (typeof gender !== 'string') return false;
        var g = gender.toLowerCase();
        return g === 'weiblich' || g === 'cis_frau' || g === 'trans_frau' ||
               g === 'frau' || g === 'female' || g === 'w' || g === 'f';
    },

    /**
     * Prüft ob Geschlecht nonbinär/inter/fluid ist
     */
    _isNonBinaryGender: function(gender) {
        if (!gender) return false;
        if (typeof gender !== 'string') return false;
        var g = gender.toLowerCase();
        return g === 'nonbinaer' || g === 'nonbinär' || g === 'non-binär' ||
               g === 'inter' || g === 'intersex' || g === 'fluid' ||
               g === 'genderfluid' || g === 'divers' || g === 'agender' ||
               g === 'unsicher';
    },

    /**
     * Wandelt Ergebnis in Score um
     *
     * HARD-KO: 0% (geometrisch unmöglich)
     * SOFT-KO: 10% (unwahrscheinlich aber nicht unmöglich)
     */
    _resultToScore: function(result, constants) {
        var scores = constants.ORIENTATION;

        switch (result) {
            case 'moeglich':
                return scores.COMPATIBLE;      // 100
            case 'unsicher':
                return scores.EXPLORING;       // 70
            case 'unwahrscheinlich':
                return scores.UNLIKELY;        // 30
            case 'unmoeglich':
                return scores.INCOMPATIBLE;    // 10 (Soft-KO)
            case 'hardKO':
                return scores.HARD_KO;         // 0 (Hard-KO)
            default:
                return 50;
        }
    }
};
