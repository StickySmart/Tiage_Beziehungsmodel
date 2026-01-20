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

        // v4.1.1: Sekundär-Bonus anwenden
        // Wenn beide eine kompatible sekundäre Orientierung haben → Bonus
        var secondaryBonus = 0;
        if (bestResult.hasSecondaryBonus && bestResult.result === 'moeglich') {
            // Basis-Bonus: 5% zusätzlich (relativ zum Score)
            secondaryBonus = score * constants.ORIENTATION.SECONDARY_BONUS_BASE;
            score = Math.min(100, score + secondaryBonus);  // Cap bei 100
        }

        return {
            score: score,
            details: {
                result: bestResult.result,
                confidence: bestResult.confidence,
                hasExploration: bestResult.hasExploration,
                isHardKO: bestResult.isHardKO || false,
                hardKOReason: bestResult.hardKOReason || null,
                bestCombination: bestResult.bestCombination,
                hasSecondaryBonus: bestResult.hasSecondaryBonus || false,  // v4.1.1
                secondaryBonus: secondaryBonus,  // v4.1.1
                allOptions1: oriList1,
                allOptions2: oriList2
            }
        };
    },

    /**
     * Extrahiert Geschlecht aus P/S-Format oder String
     * Für Orientierungslogik wird die effektive Identität berechnet
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
     * - P=Inter + S=Suchend → suchend (in Exploration)
     */
    _extractGeschlecht: function(geschlecht) {
        if (!geschlecht) return null;
        // Neues P/S-Format: { primary, secondary }
        if (typeof geschlecht === 'object') {
            var primary = geschlecht.primary;   // Körper: mann, frau, inter
            var secondary = geschlecht.secondary; // Identität: cis, trans, suchend, nonbinaer, fluid

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
     * Extrahiert Orientierungen aus Person-Objekt
     * v5.0 SSOT: Verwendet TiageSynthesis.Constants.ORIENTIERUNG_OPTIONS
     * Alle 5 Orientierungen werden separat behandelt: heterosexuell, homosexuell, bisexuell, pansexuell, queer
     */
    _extractOrientations: function(person) {
        var list = [];
        var ori = person.orientierung;

        if (!ori) return list;

        // v5.0 SSOT: Migration-Helper aus Constants
        var migrateType = function(type) {
            // Hole Legacy-Migration aus SSOT
            var constants = TiageSynthesis.Constants;
            if (constants && constants.ORIENTIERUNG_OPTIONS && constants.ORIENTIERUNG_OPTIONS.LEGACY_MIGRATION) {
                var migrated = constants.ORIENTIERUNG_OPTIONS.LEGACY_MIGRATION[type];
                if (migrated) return migrated;
            }
            // Fallback-Migration für bekannte Legacy-Keys
            // bihomo → bisexuell (v2.0 Legacy)
            if (type === 'bihomo') return 'bisexuell';
            // gay_lesbisch → homosexuell (v4.0 Alternative)
            if (type === 'gay_lesbisch') return 'homosexuell';
            // pansexuell_queer → pansexuell (v4.0 Alternative)
            if (type === 'pansexuell_queer') return 'pansexuell';
            return type;
        };

        // v5.0 SSOT: Hole alle gültigen Orientierungen aus Constants
        var getAllOrientationTypes = function() {
            var constants = TiageSynthesis.Constants;
            if (constants && constants.ORIENTIERUNG_OPTIONS && constants.ORIENTIERUNG_OPTIONS.ALL) {
                // Kombiniere aktuelle + Legacy-Keys für Rückwärtskompatibilität
                var all = constants.ORIENTIERUNG_OPTIONS.ALL.slice(); // Kopie
                var legacy = constants.ORIENTIERUNG_OPTIONS.LEGACY_MIGRATION;
                if (legacy) {
                    for (var key in legacy) {
                        if (legacy.hasOwnProperty(key) && all.indexOf(key) === -1) {
                            all.push(key);
                        }
                    }
                }
                return all;
            }
            // Fallback
            return ['heterosexuell', 'homosexuell', 'bisexuell', 'pansexuell', 'queer', 'bihomo', 'gay_lesbisch', 'pansexuell_queer'];
        };

        // v5.0: Array-Format (Multi-Select): ['heterosexuell', 'bisexuell', 'pansexuell']
        if (Array.isArray(ori)) {
            for (var i = 0; i < ori.length; i++) {
                if (ori[i]) {
                    // Erstes Element = primary (gelebt), weitere = sekundär
                    var status = (i === 0) ? 'gelebt' : 'sekundaer';
                    list.push({ type: migrateType(ori[i]), status: status });
                }
            }
        }
        // Object-Formate
        else if (typeof ori === 'object') {
            // Neues P/S-Format: { primary: 'heterosexuell', secondary: 'bisexuell' }
            if ('primary' in ori) {
                if (ori.primary) {
                    list.push({ type: migrateType(ori.primary), status: 'gelebt' });
                }
                if (ori.secondary) {
                    // SSOT-FIX: Sekundäre Orientierung ist NICHT 'interessiert' (Exploration),
                    // sondern 'sekundaer' (auch gelebt, aber nicht primär).
                    // 'interessiert' bleibt für echte Exploration (unsicher/suchend).
                    list.push({ type: migrateType(ori.secondary), status: 'sekundaer' });
                }
            }
            // Altes Multi-Select Format: { heterosexuell: 'gelebt', ... }
            else {
                // v5.0 SSOT: Hole alle gültigen Typen aus Constants
                var types = getAllOrientationTypes();
                for (var i = 0; i < types.length; i++) {
                    var type = types[i];
                    if (ori[type]) {
                        list.push({ type: migrateType(type), status: ori[type] });
                    }
                }
            }
        }
        // Altes String-Format (Rückwärtskompatibilität)
        else if (typeof ori === 'string') {
            list.push({
                type: migrateType(ori),
                status: person.orientierungStatus || 'gelebt'
            });
        }

        return list;
    },

    /**
     * Findet beste Kompatibilität aus allen Kombinationen
     *
     * SSOT-FIX: Unterscheidung zwischen 'sekundaer' und 'interessiert':
     * - 'sekundaer': Auch gelebte Orientierung, nur nicht primär → erhöht Flexibilität
     * - 'interessiert': Echte Exploration/Unsicherheit → führt zu 'unsicher' Ergebnis
     */
    _findBestCompatibility: function(oriList1, oriList2, g1, g2) {
        var hasMoeglich = false;
        var hasMoeglichPrimaer = false;  // Primäre Orientierungen passen
        var hasMoeglichSekundaer = false; // Sekundäre Orientierungen passen auch
        var hasUnsicher = false;
        var hasInteressiert = false;  // Nur echte 'interessiert', nicht 'sekundaer'
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
                    // Track ob es primäre oder sekundäre Kompatibilität ist
                    if (o1.status === 'gelebt' && o2.status === 'gelebt') {
                        hasMoeglichPrimaer = true;
                        bestCombination = { ori1: o1, ori2: o2 };
                    } else if (o1.status === 'sekundaer' || o2.status === 'sekundaer') {
                        hasMoeglichSekundaer = true;
                        if (!bestCombination) {
                            bestCombination = { ori1: o1, ori2: o2 };
                        }
                    }
                } else if (result === 'unsicher') {
                    hasUnsicher = true;
                    if (!bestCombination) {
                        bestCombination = { ori1: o1, ori2: o2 };
                    }
                } else if (checkResult.isHardKO) {
                    hasHardKO = true;
                    hardKOReason = checkResult.reason;
                }

                // SSOT-FIX: Nur echte 'interessiert' zählt als Exploration
                // 'sekundaer' ist eine gelebte Orientierung, keine Unsicherheit
                if (o1.status === 'interessiert' || o2.status === 'interessiert') {
                    hasInteressiert = true;
                }
            }
        }

        // Bestes Ergebnis bestimmen

        // SSOT-FIX: Primäre Orientierungen passen → 'moeglich' (100 Punkte)
        // Sekundäre Orientierungen passen AUCH → Bonus für Flexibilität
        if (hasMoeglichPrimaer) {
            return {
                result: 'moeglich',
                confidence: hasMoeglichSekundaer ? 'sehr-hoch' : 'hoch',
                hasExploration: false,
                isHardKO: false,
                hasSecondaryBonus: hasMoeglichSekundaer,  // NEU: Bonus-Flag
                bestCombination: bestCombination
            };
        }

        // Sekundäre Orientierungen passen, primäre nicht explizit geprüft
        // → Trotzdem 'moeglich', da sekundäre auch gelebt sind
        // FIX: hasSecondaryBonus auch hier setzen wenn sekundäre Orientierungen matchen
        if (hasMoeglich && !hasInteressiert) {
            return {
                result: 'moeglich',
                confidence: hasMoeglichSekundaer ? 'hoch' : 'mittel',
                hasExploration: false,
                isHardKO: false,
                hasSecondaryBonus: hasMoeglichSekundaer,  // FIX: Bonus auch bei sekundär-basiertem Match
                bestCombination: bestCombination
            };
        }

        // Nur wenn echte 'interessiert' (Exploration) dabei ist → 'unsicher'
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
     * v5.0 SSOT: Neue Orientierungs-Struktur (5 Optionen):
     * - heterosexuell: Nur anderes binäres Geschlecht
     * - homosexuell: Nur gleiches Geschlecht
     * - bisexuell: Beide binären Geschlechter (Mann + Frau)
     * - pansexuell: ALLE Geschlechter (inkl. nonbinär)
     * - queer: Flexibel, wie pansexuell behandelt
     *
     * SSOT-FIX: 'sekundaer' wird wie 'gelebt' behandelt (keine Exploration)
     * Nur 'interessiert' führt zu isExploring = true
     *
     * Returns: { result: string, isHardKO: boolean }
     */
    _checkSinglePair: function(type1, status1, type2, status2, g1, g2) {
        // SSOT-FIX: Nur echte 'interessiert' zählt als Exploration
        // 'sekundaer' ist eine gelebte Orientierung, keine Unsicherheit
        var isExploring = (status1 === 'interessiert' || status2 === 'interessiert');

        // v5.0 SSOT: Migration - Legacy-Keys zu aktuellen Keys
        var normalizeType = function(t) {
            // Hole Legacy-Migration aus SSOT
            var constants = TiageSynthesis.Constants;
            if (constants && constants.ORIENTIERUNG_OPTIONS && constants.ORIENTIERUNG_OPTIONS.LEGACY_MIGRATION) {
                var migrated = constants.ORIENTIERUNG_OPTIONS.LEGACY_MIGRATION[t];
                if (migrated) return migrated;
            }
            // Fallback-Migration
            if (t === 'bihomo') return 'bisexuell';
            if (t === 'gay_lesbisch') return 'homosexuell';
            if (t === 'pansexuell_queer') return 'pansexuell';
            return t;
        };
        type1 = normalizeType(type1);
        type2 = normalizeType(type2);

        // Helper: Prüft ob Orientierung zu nonbinären Geschlechtern angezogen sein kann
        var canAttractNonbinary = function(type) {
            return type === 'pansexuell' || type === 'queer';
        };

        // Helper: Prüft ob Orientierung zu beiden binären Geschlechtern angezogen sein kann
        var canAttractBothBinary = function(type) {
            return type === 'bisexuell' || type === 'pansexuell' || type === 'queer';
        };

        // ═══════════════════════════════════════════════════════════════════════
        // PANSEXUELL / QUEER: Zu ALLEN Geschlechtern angezogen (inkl. nonbinär)
        // ═══════════════════════════════════════════════════════════════════════
        if (canAttractNonbinary(type1) || canAttractNonbinary(type2)) {
            return {
                result: isExploring ? 'unsicher' : 'moeglich',
                isHardKO: false
            };
        }

        // ═══════════════════════════════════════════════════════════════════════
        // BISEXUELL: Zu beiden BINÄREN Geschlechtern angezogen
        // ═══════════════════════════════════════════════════════════════════════
        // Bisexuell + Bisexuell: Immer möglich (bei binären Geschlechtern)
        if (type1 === 'bisexuell' && type2 === 'bisexuell') {
            return {
                result: isExploring ? 'unsicher' : 'moeglich',
                isHardKO: false
            };
        }

        // Bisexuell + Heterosexuell: Immer möglich (bei verschiedenen Geschlechtern)
        if ((type1 === 'bisexuell' && type2 === 'heterosexuell') ||
            (type1 === 'heterosexuell' && type2 === 'bisexuell')) {
            if (this._isDifferentBinaryGender(g1, g2)) {
                return {
                    result: isExploring ? 'unsicher' : 'moeglich',
                    isHardKO: false
                };
            }
        }

        // Bisexuell + Homosexuell: Möglich wenn gleiches Geschlecht
        if ((type1 === 'bisexuell' && type2 === 'homosexuell') ||
            (type1 === 'homosexuell' && type2 === 'bisexuell')) {
            if (this._isSameBinaryGender(g1, g2)) {
                return {
                    result: isExploring ? 'unsicher' : 'moeglich',
                    isHardKO: false
                };
            }
        }

        // ═══════════════════════════════════════════════════════════════════════
        // HOMOSEXUELL: Nur gleiches Geschlecht
        // ═══════════════════════════════════════════════════════════════════════
        if (type1 === 'homosexuell' && type2 === 'homosexuell') {
            // Gleiches binäres Geschlecht: möglich
            if (this._isSameBinaryGender(g1, g2)) {
                return {
                    result: isExploring ? 'unsicher' : 'moeglich',
                    isHardKO: false
                };
            }
            // HARD-KO: Verschiedene Geschlechter, beide homosexuell
            return {
                result: 'hardKO',
                isHardKO: true,
                reason: 'homo_different_gender'
            };
        }

        // ═══════════════════════════════════════════════════════════════════════
        // HETEROSEXUELL: Nur anderes binäres Geschlecht
        // ═══════════════════════════════════════════════════════════════════════
        if (type1 === 'heterosexuell' && type2 === 'heterosexuell') {
            // Verschiedene binäre Geschlechter: möglich
            if (this._isDifferentBinaryGender(g1, g2)) {
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

        // Fallback: Soft-KO
        if (isExploring) {
            return { result: 'unsicher', isHardKO: false };
        }
        return { result: 'unmoeglich', isHardKO: false };
    },

    /**
     * Prüft ob Geschlechter verschiedene binäre Kategorien sind
     */
    _isDifferentBinaryGender: function(g1, g2) {
        return (this._isMaleGender(g1) && this._isFemaleGender(g2)) ||
               (this._isFemaleGender(g1) && this._isMaleGender(g2));
    },

    /**
     * Prüft ob Geschlechter gleiche binäre Kategorie sind
     * v5.0: Für Homosexuell-Logik (beide müssen gleiches Geschlecht haben)
     */
    _isSameBinaryGender: function(g1, g2) {
        return (this._isMaleGender(g1) && this._isMaleGender(g2)) ||
               (this._isFemaleGender(g1) && this._isFemaleGender(g2));
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
     * Inkl. mann_nonbinaer und frau_nonbinaer (männlicher/weiblicher Körper mit nonbinärer Seele)
     */
    _isNonBinaryGender: function(gender) {
        if (!gender) return false;
        if (typeof gender !== 'string') return false;
        var g = gender.toLowerCase();
        return g === 'nonbinaer' || g === 'nonbinär' || g === 'non-binär' ||
               g === 'inter' || g === 'intersex' || g === 'fluid' ||
               g === 'genderfluid' || g === 'divers' || g === 'agender' ||
               g === 'unsicher' ||
               g === 'mann_nonbinaer' || g === 'frau_nonbinaer';
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
