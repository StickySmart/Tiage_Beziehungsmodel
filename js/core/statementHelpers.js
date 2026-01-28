/**
 * js/core/statementHelpers.js
 * Helper functions for looking up micro-statement combinations.
 * Depends on: orientationStatements, archetypeStatements, dominanceStatements, statusStatements (globals)
 * Exports: TiageStatementHelpers
 */
const TiageStatementHelpers = (function() {
    'use strict';

    // Hilfsfunktion: Hole Statements für Archetyp-Kombination
    // Verwendet je nach Sprache die deutsche oder englische Version
    function getArchetypeStatements(type1, type2) {
        const key = `${type1}_${type2}`;
        const lang = typeof TiageI18n !== 'undefined' ? TiageI18n.getLanguage() : 'de';

        // Wähle die richtige Statement-Quelle basierend auf der Sprache
        if (lang === 'en' && typeof archetypeStatements_EN !== 'undefined') {
            return archetypeStatements_EN[key] || archetypeStatements[key] || null;
        }
        return archetypeStatements[key] || null;
    }

    // Hilfsfunktion: Hole Statements für Dominanz-Kombination
    function getDominanceStatements(dom1, dom2) {
        // Extrahiere primäre Dominanz aus Multi-Select-Objekt
        const getPrimaryDominance = (dom) => {
            if (typeof dom === 'string') return dom;
            if (typeof dom === 'object' && dom !== null) {
                // New format: { primary: 'dominant', secondary: 'submissiv' }
                if ('primary' in dom) {
                    return dom.primary || null;
                }
                // Old format: { dominant: 'gelebt', submissiv: 'interessiert' }
                // Priorität: gelebt > interessiert
                for (const key of ['dominant', 'submissiv', 'switch', 'ausgeglichen']) {
                    if (dom[key] === 'gelebt') return key;
                }
                for (const key of ['dominant', 'submissiv', 'switch', 'ausgeglichen']) {
                    if (dom[key] === 'interessiert') return key;
                }
            }
            return null;
        };

        const d1 = getPrimaryDominance(dom1);
        const d2 = getPrimaryDominance(dom2);

        if (!d1 || !d2) return window.dominanceStatements.default;
        const key = `${d1}_${d2}`;
        return window.dominanceStatements[key] || window.dominanceStatements.default;
    }

    // Hilfsfunktion: Hole Statements für Orientierungs-Kombination
    // Berücksichtigt Orientierung UND Geschlecht für korrekte Kompatibilitätsbewertung
    function getOrientierungStatements(orient1, orient2, geschlecht1, geschlecht2) {
        // Default wenn Daten fehlen
        if (!orient1 || !orient2 || !geschlecht1 || !geschlecht2) {
            return window.orientationStatements.default;
        }

        // Extract effective gender identity (handles Trans transformation)
        const extractEffectiveGender = (geschlecht) => {
            if (!geschlecht) return null;
            if (typeof geschlecht === 'object' && 'primary' in geschlecht) {
                const primary = geschlecht.primary;
                const secondary = geschlecht.secondary;
                if (secondary) {
                    if (secondary === 'cis') return primary;
                    if (secondary === 'trans') {
                        if (primary === 'mann') return 'frau';
                        if (primary === 'frau') return 'mann';
                        return primary;
                    }
                    if (['nonbinaer', 'fluid', 'suchend'].includes(secondary)) return secondary;
                    return secondary;
                }
                return primary || null;
            }
            if (typeof geschlecht === 'string') return geschlecht;
            return null;
        };

        let g1 = extractEffectiveGender(geschlecht1);
        let g2 = extractEffectiveGender(geschlecht2);

        // Extrahiere primäre Orientierung aus Multi-Select-Objekt
        const getPrimaryOrientation = (orient) => {
            if (typeof orient === 'string') return orient;
            if (typeof orient === 'object') {
                // New format: { primary: 'homosexuell', secondary: 'heterosexuell' }
                if ('primary' in orient) {
                    return orient.primary;
                }
                // Old format: { heterosexuell: 'gelebt', homosexuell: 'interessiert' }
                // Priorität: gelebt > interessiert
                for (const key of ['heterosexuell', 'homosexuell', 'bisexuell']) {
                    if (orient[key] === 'gelebt') return key;
                }
                for (const key of ['heterosexuell', 'homosexuell', 'bisexuell']) {
                    if (orient[key] === 'interessiert') return key;
                }
            }
            return null;
        };

        const o1 = getPrimaryOrientation(orient1);
        const o2 = getPrimaryOrientation(orient2);

        if (!o1 || !o2) return window.orientationStatements.default;

        // Use category comparison instead of direct string comparison
        // cis_mann and trans_mann are both male, cis_frau and trans_frau are both female
        const isMaleG = (g) => {
            if (!g) return false;
            const gl = g.toLowerCase();
            return gl === 'männlich' || gl === 'cis_mann' || gl === 'trans_mann' || gl === 'mann' || gl === 'male' || gl === 'm';
        };
        const isFemaleG = (g) => {
            if (!g) return false;
            const gl = g.toLowerCase();
            return gl === 'weiblich' || gl === 'cis_frau' || gl === 'trans_frau' || gl === 'frau' || gl === 'female' || gl === 'w' || gl === 'f';
        };
        const gleichesGeschlecht = (isMaleG(g1) && isMaleG(g2)) || (isFemaleG(g1) && isFemaleG(g2)) || (g1 === g2);

        // Bisexuell ist immer grundsätzlich kompatibel
        if (o1 === 'bisexuell' && o2 === 'bisexuell') {
            return window.orientationStatements.kompatibel_bi_bi;
        }
        if (o1 === 'bisexuell' || o2 === 'bisexuell') {
            const andereOrient = o1 === 'bisexuell' ? o2 : o1;
            // Prüfe ob der andere zur bi-Person passt
            if (andereOrient === 'heterosexuell') {
                // Hetero + Bi: kompatibel wenn unterschiedliche Geschlechter
                if (!gleichesGeschlecht) {
                    return window.orientationStatements.kompatibel_bi_hetero;
                } else {
                    return window.orientationStatements.teilweise_bi_inkompatibel;
                }
            }
            if (andereOrient === 'homosexuell') {
                // Homo + Bi: kompatibel wenn gleiche Geschlechter
                if (gleichesGeschlecht) {
                    return window.orientationStatements.kompatibel_bi_homo;
                } else {
                    return window.orientationStatements.teilweise_bi_inkompatibel;
                }
            }
        }

        // Beide heterosexuell
        if (o1 === 'heterosexuell' && o2 === 'heterosexuell') {
            if (!gleichesGeschlecht) {
                return window.orientationStatements.kompatibel_hetero_hetero;
            } else {
                return window.orientationStatements.inkompatibel_hetero_hetero;
            }
        }

        // Beide homosexuell
        if (o1 === 'homosexuell' && o2 === 'homosexuell') {
            if (gleichesGeschlecht) {
                return window.orientationStatements.kompatibel_homo_homo;
            } else {
                return window.orientationStatements.inkompatibel_homo_homo;
            }
        }

        // Hetero + Homo
        if ((o1 === 'heterosexuell' && o2 === 'homosexuell') ||
            (o1 === 'homosexuell' && o2 === 'heterosexuell')) {
            return window.orientationStatements.inkompatibel_hetero_homo;
        }

        return window.orientationStatements.default;
    }

    // Hilfsfunktion: Hole Statements für Status-Kombination (fakt/interessiert)
    // Bewertet den kombinierten Sicherheitsgrad beider Personen über alle Dimensionen
    function getStatusStatements(personDims1, personDims2) {
        if (!personDims1 || !personDims2) {
            return window.statusStatements.default;
        }

        // Ermittle den dominanten Status für jede Person
        // Eine Person gilt als "fakt" wenn mindestens eine Dimension als fakt markiert ist
        // und keine als interessiert
        const getPersonStatus = (dims) => {
            let hasFakt = false;
            let hasInteressiert = false;

            // Prüfe Dominanz
            if (dims.dominanz && typeof dims.dominanz === 'object') {
                // New format: { primary: 'dominant', secondary: 'submissiv' }
                if ('primary' in dims.dominanz) {
                    if (dims.dominanz.primary) hasFakt = true;
                    if (dims.dominanz.secondary) hasInteressiert = true;
                } else {
                    // Old format: { dominant: 'gelebt', submissiv: 'interessiert' }
                    for (const key of Object.keys(dims.dominanz)) {
                        if (dims.dominanz[key] === 'gelebt') hasFakt = true;
                        if (dims.dominanz[key] === 'interessiert') hasInteressiert = true;
                    }
                }
            }

            // Prüfe Orientierung
            if (dims.orientierung && typeof dims.orientierung === 'object') {
                // New format: { primary: 'homosexuell', secondary: 'heterosexuell' }
                if ('primary' in dims.orientierung) {
                    if (dims.orientierung.primary) hasFakt = true;
                    if (dims.orientierung.secondary) hasInteressiert = true;
                } else {
                    // Old format: { heterosexuell: 'gelebt', homosexuell: 'interessiert' }
                    for (const key of Object.keys(dims.orientierung)) {
                        if (dims.orientierung[key] === 'gelebt') hasFakt = true;
                        if (dims.orientierung[key] === 'interessiert') hasInteressiert = true;
                    }
                }
            }

            // Wenn sowohl gelebt als auch interessiert: interessiert dominiert (Unsicherheit)
            if (hasInteressiert) return 'interessiert';
            if (hasFakt) return 'gelebt';
            return null;
        };

        const status1 = getPersonStatus(personDims1);
        const status2 = getPersonStatus(personDims2);

        if (!status1 || !status2) return window.statusStatements.default;

        // Symmetrische Kombinationen
        if (status1 === 'gelebt' && status2 === 'gelebt') {
            return window.statusStatements.gelebt_gelebt;
        }
        if (status1 === 'interessiert' && status2 === 'interessiert') {
            return window.statusStatements.interessiert_interessiert;
        }
        // Asymmetrische Kombination (egal welche Reihenfolge)
        return window.statusStatements.gelebt_interessiert;
    }

    return {
        getArchetypeStatements: getArchetypeStatements,
        getDominanceStatements: getDominanceStatements,
        getOrientierungStatements: getOrientierungStatements,
        getStatusStatements: getStatusStatements
    };
})();
if (typeof window !== 'undefined') {
    window.TiageStatementHelpers = TiageStatementHelpers;
}
