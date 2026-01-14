/**
 * PHYSICAL COMPATIBILITY - Pathos Check
 *
 * Prüft die physische Kompatibilität (Geschlecht + Orientierung)
 * zwischen zwei Personen.
 *
 * Extrahiert aus app-main.js für bessere Wartbarkeit und Testbarkeit.
 *
 * @module TiageCompatibility.Physical
 */

var TiageCompatibility = TiageCompatibility || {};

TiageCompatibility.Physical = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // GENDER HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Check if gender is male category (includes cis and trans)
     * @param {string} gender - Gender value
     * @returns {boolean}
     */
    function isMaleGender(gender) {
        if (!gender) return false;
        var g = gender.toLowerCase();
        return g === 'männlich' || g === 'cis_mann' || g === 'trans_mann' ||
               g === 'mann' || g === 'male' || g === 'm';
    }

    /**
     * Check if gender is female category (includes cis and trans)
     * @param {string} gender - Gender value
     * @returns {boolean}
     */
    function isFemaleGender(gender) {
        if (!gender) return false;
        var g = gender.toLowerCase();
        return g === 'weiblich' || g === 'cis_frau' || g === 'trans_frau' ||
               g === 'frau' || g === 'female' || g === 'w' || g === 'f';
    }

    /**
     * Check if two genders are in the same category
     * @param {string} g1 - Gender 1
     * @param {string} g2 - Gender 2
     * @returns {boolean}
     */
    function isSameGenderCategory(g1, g2) {
        if (isMaleGender(g1) && isMaleGender(g2)) return true;
        if (isFemaleGender(g1) && isFemaleGender(g2)) return true;
        // Non-binary/other: compare directly
        return g1 === g2;
    }

    /**
     * Check if two genders are in different binary categories (male vs female)
     * @param {string} g1 - Gender 1
     * @param {string} g2 - Gender 2
     * @returns {boolean}
     */
    function isDifferentBinaryGender(g1, g2) {
        return (isMaleGender(g1) && isFemaleGender(g2)) ||
               (isFemaleGender(g1) && isMaleGender(g2));
    }

    /**
     * Check if gender is non-binary category
     * SSOT: Nonbinäre Geschlechter können nur von Bi/Pan angezogen werden
     * @param {string} gender - Gender value
     * @returns {boolean}
     */
    function isNonBinaryGender(gender) {
        if (!gender) return false;
        var g = gender.toLowerCase();
        return g === 'nonbinaer' || g === 'non-binär' || g === 'nonbinary' ||
               g === 'fluid' || g === 'genderfluid' ||
               g === 'inter' || g === 'intersex' ||
               g === 'suchend' || g === 'divers';
    }

    // ═══════════════════════════════════════════════════════════════════════
    // SSOT: Hole Konstanten aus TiageSynthesisConstants
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Holt PHYSICAL_COMPATIBILITY Konstanten aus SSOT
     * @returns {object} Konstanten oder Defaults
     */
    function getConstants() {
        if (typeof TiageSynthesisConstants !== 'undefined' && TiageSynthesisConstants.PHYSICAL_COMPATIBILITY) {
            return TiageSynthesisConstants.PHYSICAL_COMPATIBILITY;
        }
        // Fallback defaults (sollte nie verwendet werden wenn constants.js geladen)
        return {
            SECONDARY_WEIGHT: 0.3,
            RESULT: { POSSIBLE: 'möglich', IMPOSSIBLE: 'unmöglich', INCOMPLETE: 'unvollständig' },
            CONFIDENCE: { HIGH: 'hoch', MEDIUM: 'mittel', LOW: 'niedrig' },
            REQUIRE_MUTUAL_ATTRACTION: true
        };
    }

    // ═══════════════════════════════════════════════════════════════════════
    // ORIENTATION PAIR CHECK
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Check single pair of orientations
     *
     * FIX (SSOT): Sekundäre Orientierung ist KEINE "Exploration", sondern eine
     * vollwertige Orientierung. Die Kompatibilität prüft ob BEIDE Personen
     * gegenseitig angezogen sein können - einseitige Anziehung ist unmöglich.
     *
     * @param {string} type1 - Orientation type person 1
     * @param {boolean} isPrimary1 - Ist dies die primäre Orientierung von Person 1?
     * @param {string} type2 - Orientation type person 2
     * @param {boolean} isPrimary2 - Ist dies die primäre Orientierung von Person 2?
     * @param {string} g1 - Gender person 1
     * @param {string} g2 - Gender person 2
     * @returns {object} { result: 'möglich'|'unmöglich', confidence: 'hoch'|'mittel'|'niedrig' }
     */
    function checkSingleOrientationPair(type1, isPrimary1, type2, isPrimary2, g1, g2) {
        var constants = getConstants();

        // Helper: Can this orientation be attracted to the other person's gender?
        // v2.0: Neue Orientierungs-Struktur: hetero, bihomo, pan
        // - heterosexuell: Nur anderes binäres Geschlecht
        // - bihomo: Alle binären Geschlechter (Mann/Frau) - ersetzt bi+homo
        // - pansexuell: ALLE Geschlechter inkl. non-binär
        var canBeAttractedTo = function(orientation, myGender, theirGender) {
            // MIGRATION: Alte Keys zu neuen mappen
            var normalizedOrientation = orientation;
            if (orientation === 'homosexuell' || orientation === 'bisexuell') {
                normalizedOrientation = 'bihomo';
            }

            // Pansexuell kann zu JEDEM Geschlecht angezogen sein (inkl. nonbinär!)
            if (normalizedOrientation === 'pansexuell') return true;

            // Bihomo kann zu allen BINÄREN Geschlechtern angezogen sein
            if (normalizedOrientation === 'bihomo') {
                // Nonbinäre Geschlechter: nur Pan kann angezogen sein!
                if (isNonBinaryGender(theirGender)) {
                    return false;
                }
                // Binäre Geschlechter: bihomo ist zu beiden angezogen
                return true;
            }

            // SSOT: Nonbinäre Geschlechter (nonbinaer, fluid, inter, suchend, divers)
            // können NUR von Pansexuell angezogen werden!
            if (isNonBinaryGender(theirGender)) {
                return false; // Hetero kann nicht zu Nonbinär angezogen sein
            }

            // Hetero: nur anderes binäres Geschlecht
            if (normalizedOrientation === 'heterosexuell') return isDifferentBinaryGender(myGender, theirGender);

            return false;
        };

        // SSOT: BEIDE Personen müssen zueinander angezogen sein können
        // Einseitige Anziehung ist unmöglich!
        var person1CanBeAttracted = canBeAttractedTo(type1, g1, g2);
        var person2CanBeAttracted = canBeAttractedTo(type2, g2, g1);

        if (person1CanBeAttracted && person2CanBeAttracted) {
            // Beide können angezogen sein - Konfidenz basiert auf Primary/Secondary
            var confidence = constants.CONFIDENCE.HIGH;
            if (!isPrimary1 || !isPrimary2) {
                confidence = constants.CONFIDENCE.MEDIUM; // Über Secondary = mittlere Konfidenz
            }
            return { result: constants.RESULT.POSSIBLE, confidence: confidence };
        }

        // SSOT: Einseitige Anziehung ist NICHT möglich
        // (Alte Logik gab hier fälschlicherweise "unsicher" zurück)
        return { result: constants.RESULT.IMPOSSIBLE, confidence: null };
    }

    // ═══════════════════════════════════════════════════════════════════════
    // MAIN COMPATIBILITY CHECK
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Extract effective gender identity from geschlecht object
     * Handles Trans transformation: P=frau + S=trans → mann (Trans-Mann)
     *
     * @param {string|object} geschlecht - Geschlecht value or { primary, secondary }
     * @returns {string|null} Effective gender identity
     */
    function extractEffectiveGender(geschlecht) {
        if (!geschlecht) return null;

        // New P/S format: { primary, secondary }
        if (typeof geschlecht === 'object' && 'primary' in geschlecht) {
            var primary = geschlecht.primary;   // Body: mann, frau, inter
            var secondary = geschlecht.secondary; // Identity: cis, trans, suchend, nonbinaer, fluid

            if (secondary !== undefined && secondary !== null) {
                // Cis: Identity = Body
                if (secondary === 'cis') {
                    return primary;
                }
                // Trans: Identity = Opposite of body
                if (secondary === 'trans') {
                    if (primary === 'mann') return 'frau';
                    if (primary === 'frau') return 'mann';
                    return primary; // inter stays inter
                }
                // Nonbinär, Fluid, Suchend: use primary (body) for orientation compatibility
                // The body determines physical attraction potential, while identity is respected separately
                if (secondary === 'nonbinaer' || secondary === 'fluid' || secondary === 'suchend') {
                    return primary;
                }
                // Fallback: use secondary value
                return secondary;
            }

            // No secondary set: fallback to primary (body)
            return primary || null;
        }

        // Old format: string directly
        if (typeof geschlecht === 'string') {
            return geschlecht;
        }

        return null;
    }

    /**
     * Check physical compatibility between two persons
     *
     * @param {object} person1 - Person 1 data
     * @param {object} person2 - Person 2 data
     * @returns {object} Result with:
     *   - result: 'möglich' | 'unsicher' | 'unmöglich' | 'unvollständig'
     *   - confidence: 'hoch' | 'mittel' | 'niedrig' (optional)
     *   - reason: string (optional)
     *   - explanation: string (optional)
     *   - missingItems: array (optional)
     */
    function check(person1, person2) {
        // Extract effective gender identity (handles Trans transformation)
        var g1 = extractEffectiveGender(person1.geschlecht);
        var g2 = extractEffectiveGender(person2.geschlecht);

        console.log('[TiageCompatibility.Physical.check] Input:', {
            person1_geschlecht: person1.geschlecht,
            person2_geschlecht: person2.geschlecht,
            person1_orientierung: person1.orientierung,
            person2_orientierung: person2.orientierung,
            g1_extracted: g1,
            g2_extracted: g2
        });

        // Get orientierung as multi-select object
        var ori1 = person1.orientierung;
        var ori2 = person2.orientierung;

        // Collect all missing items
        var missingItems = [];

        if (!g1) missingItems.push('Ich: Geschlecht');
        if (!g2) missingItems.push('Partner: Geschlecht');

        // ═══════════════════════════════════════════════════════════════════════
        // FIX (SSOT): Handle multi-select orientierung
        // Sekundäre Orientierung ist KEINE "Exploration", sondern eine vollwertige
        // Orientierung mit reduziertem Scoring-Einfluss. isPrimary bestimmt die Konfidenz.
        // ═══════════════════════════════════════════════════════════════════════
        var oriList1 = [];
        var oriList2 = [];

        // v2.0: Migration helper für alte Orientierungs-Keys
        var migrateOriType = function(type) {
            if (type === 'homosexuell' || type === 'bisexuell') return 'bihomo';
            return type;
        };

        if (ori1 && typeof ori1 === 'object') {
            // New format: { primary: 'bihomo', secondary: 'heterosexuell' }
            if ('primary' in ori1) {
                if (ori1.primary) oriList1.push({ type: migrateOriType(ori1.primary), isPrimary: true });
                if (ori1.secondary) oriList1.push({ type: migrateOriType(ori1.secondary), isPrimary: false });
            } else {
                // Old format: { heterosexuell: 'gelebt', homosexuell: 'interessiert' }
                if (ori1.heterosexuell) oriList1.push({ type: 'heterosexuell', isPrimary: ori1.heterosexuell === 'gelebt' });
                if (ori1.homosexuell) oriList1.push({ type: 'bihomo', isPrimary: ori1.homosexuell === 'gelebt' });
                if (ori1.bisexuell) oriList1.push({ type: 'bihomo', isPrimary: ori1.bisexuell === 'gelebt' });
                if (ori1.bihomo) oriList1.push({ type: 'bihomo', isPrimary: ori1.bihomo === 'gelebt' });
                if (ori1.pansexuell) oriList1.push({ type: 'pansexuell', isPrimary: ori1.pansexuell === 'gelebt' });
            }
        } else if (ori1 && typeof ori1 === 'string') {
            // Backwards compatibility for old single-value format
            oriList1.push({ type: migrateOriType(ori1), isPrimary: true });
        }

        if (ori2 && typeof ori2 === 'object') {
            // New format: { primary: 'bihomo', secondary: 'heterosexuell' }
            if ('primary' in ori2) {
                if (ori2.primary) oriList2.push({ type: migrateOriType(ori2.primary), isPrimary: true });
                if (ori2.secondary) oriList2.push({ type: migrateOriType(ori2.secondary), isPrimary: false });
            } else {
                // Old format: { heterosexuell: 'gelebt', homosexuell: 'interessiert' }
                if (ori2.heterosexuell) oriList2.push({ type: 'heterosexuell', isPrimary: ori2.heterosexuell === 'gelebt' });
                if (ori2.homosexuell) oriList2.push({ type: 'bihomo', isPrimary: ori2.homosexuell === 'gelebt' });
                if (ori2.bisexuell) oriList2.push({ type: 'bihomo', isPrimary: ori2.bisexuell === 'gelebt' });
                if (ori2.bihomo) oriList2.push({ type: 'bihomo', isPrimary: ori2.bihomo === 'gelebt' });
                if (ori2.pansexuell) oriList2.push({ type: 'pansexuell', isPrimary: ori2.pansexuell === 'gelebt' });
            }
        } else if (ori2 && typeof ori2 === 'string') {
            // Backwards compatibility for old single-value format
            oriList2.push({ type: migrateOriType(ori2), isPrimary: true });
        }

        // Check if orientierung is missing
        if (oriList1.length === 0) missingItems.push('Ich: Orientierung');
        if (oriList2.length === 0) missingItems.push('Partner: Orientierung');

        var constants = getConstants();

        // Return incomplete if any items are missing
        if (missingItems.length > 0) {
            return {
                result: constants.RESULT.INCOMPLETE,
                reason: 'Dimensionen unvollständig',
                explanation: 'Es fehlt noch: ' + missingItems.join(', '),
                missingItems: missingItems
            };
        }

        // ═══════════════════════════════════════════════════════════════════════
        // SSOT: Check all combinations - suche nach GEGENSEITIGER Anziehung
        // Eine Kombination ist nur "möglich" wenn BEIDE angezogen sein können!
        // ═══════════════════════════════════════════════════════════════════════
        var bestResult = null;
        var bestConfidence = null;

        for (var i = 0; i < oriList1.length; i++) {
            var o1 = oriList1[i];
            for (var j = 0; j < oriList2.length; j++) {
                var o2 = oriList2[j];
                var pairResult = checkSingleOrientationPair(o1.type, o1.isPrimary, o2.type, o2.isPrimary, g1, g2);

                if (pairResult.result === constants.RESULT.POSSIBLE) {
                    // Gefunden! Speichere das beste Ergebnis (höchste Konfidenz)
                    if (!bestResult || pairResult.confidence === constants.CONFIDENCE.HIGH) {
                        bestResult = pairResult.result;
                        bestConfidence = pairResult.confidence;
                    }
                    // Bei hoher Konfidenz können wir aufhören zu suchen
                    if (pairResult.confidence === constants.CONFIDENCE.HIGH) {
                        break;
                    }
                }
            }
            if (bestConfidence === constants.CONFIDENCE.HIGH) break;
        }

        // Return best result
        console.log('[TiageCompatibility.Physical.check] Decision:', {
            bestResult: bestResult,
            bestConfidence: bestConfidence,
            oriList1: oriList1,
            oriList2: oriList2
        });

        if (bestResult === constants.RESULT.POSSIBLE) {
            console.log('[TiageCompatibility.Physical.check] Result:', bestResult, 'Confidence:', bestConfidence);
            return { result: bestResult, confidence: bestConfidence };
        }

        // SSOT: Keine gegenseitige Anziehung möglich = unmöglich
        return {
            result: constants.RESULT.IMPOSSIBLE,
            reason: 'Inkompatible Orientierungen',
            explanation: 'Die sexuellen Orientierungen schließen gegenseitige Anziehung aus.'
        };
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        // Main function
        check: check,

        // Helper functions (exposed for testing and reuse)
        extractEffectiveGender: extractEffectiveGender,
        isMaleGender: isMaleGender,
        isFemaleGender: isFemaleGender,
        isNonBinaryGender: isNonBinaryGender,
        isSameGenderCategory: isSameGenderCategory,
        isDifferentBinaryGender: isDifferentBinaryGender,
        checkSingleOrientationPair: checkSingleOrientationPair
    };

})();
