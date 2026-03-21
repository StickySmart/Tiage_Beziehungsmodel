/**
 * bestMatch.js — Best-Match Finder helpers
 *
 * Extracted from app-main.js (was lines 2148-2744).
 * Contains: ensureValid*, getPrimary*, findBestPartnerMatch, findBestIchMatch
 *
 * Dependencies (via window.*): tiageData, getIchArchetype, getPartnerArchetype,
 *   personDimensions, selectArchetypeFromGrid, getConfidenceMultiplier,
 *   checkPhysicalCompatibility, calculatePhilosophyCompatibility,
 *   calculateOverallWithModifiers, TiageState
 */
(function() {
    'use strict';

// Hilfsfunktion: Stellt sicher, dass Geschlechts-Objekt valide Werte hat
// FIX v4.1.2: Unterstützt sowohl String-Format (v4.0) als auch Objekt-Format {primary, secondary}
function ensureValidGeschlecht(geschlechtObj) {
    // v4.0: String-Format (z.B. "frau", "mann", "nonbinaer")
    if (typeof geschlechtObj === 'string' && geschlechtObj) {
        return {
            primary: geschlechtObj,
            secondary: 'cis'    // Default für v4.0 String-Format
        };
    }
    // Legacy/Full: Objekt-Format {primary, secondary}
    const g = geschlechtObj || {};
    return {
        primary: g.primary || 'mann',      // Default: mann
        secondary: g.secondary || 'cis'    // Default: cis
    };
}

// Hilfsfunktion: Stellt sicher, dass Dominanz-Objekt valide Werte hat
// FIX v4.1.2: Unterstützt sowohl String-Format (v4.0) als auch Objekt-Format {primary, secondary}
function ensureValidDominanz(dominanzObj) {
    // v4.0: String-Format (z.B. "dominant", "submissiv", "switch", "ausgeglichen")
    if (typeof dominanzObj === 'string' && dominanzObj) {
        return {
            primary: dominanzObj,
            secondary: null
        };
    }
    // Legacy/Full: Objekt-Format {primary, secondary}
    const d = dominanzObj || {};
    return {
        primary: d.primary || 'ausgeglichen',
        secondary: d.secondary || null
    };
}

// Hilfsfunktion: Stellt sicher, dass Orientierungs-Objekt valide Werte hat
// FIX v4.1.2: Unterstützt String, Array und Objekt-Format
function ensureValidOrientierung(orientierungObj) {
    // v4.0: String-Format (z.B. "heterosexuell", "homosexuell", "bisexuell")
    if (typeof orientierungObj === 'string' && orientierungObj) {
        return {
            primary: orientierungObj,
            secondary: null,
            all: [orientierungObj]
        };
    }
    // v4.1.1: Array-Format (UI speichert als Array)
    if (Array.isArray(orientierungObj) && orientierungObj.length > 0) {
        return {
            primary: orientierungObj[0] || 'heterosexuell',
            secondary: orientierungObj.length > 1 ? orientierungObj[1] : null,
            // Alle weiteren Orientierungen für erweiterte Kompatibilität
            all: orientierungObj
        };
    }
    // Legacy: Objekt-Format {primary, secondary}
    const o = orientierungObj || {};
    return {
        primary: o.primary || 'heterosexuell',
        secondary: o.secondary || null,
        all: o.all || [o.primary || 'heterosexuell'].concat(o.secondary ? [o.secondary] : [])
    };
}

function findBestPartnerMatch() {
    // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
    // console.log('[findBestPartnerMatch] Funktion aufgerufen');
    // console.log('[findBestPartnerMatch] data geladen:', window.tiageData !== null);
    // console.log('[findBestPartnerMatch] window.personDimensions:', JSON.stringify(window.personDimensions));

    // Prüfe, ob data geladen ist
    if (!window.tiageData) {
        console.warn('[findBestPartnerMatch] WARNUNG: data ist nicht geladen! Verwende Fallback-Matrix.');
    }

    const ALL_ARCHETYPES = ['single', 'duo', 'duo_flex', 'ra', 'lat', 'aromantisch', 'solopoly', 'polyamor'];

    // v3.6: Hole echte Needs aus TiageState für R-Faktor-Berechnung
    let ichNeeds = null;
    let partnerNeeds = null;
    if (typeof TiageState !== 'undefined') {
        // FIX v4.3: getFlatNeeds() statt get() — gibt flache Needs für aktuellen Archetyp zurück
        ichNeeds = TiageState.getFlatNeeds ? TiageState.getFlatNeeds('ich') : null;
        partnerNeeds = TiageState.getFlatNeeds ? TiageState.getFlatNeeds('partner') : null;
    }

    // Sammle ICH-Daten (feste Basis)
    const ichArchetype = window.getIchArchetype() || 'single';
    const ichDims = window.personDimensions.ich || {};

    // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
    // console.log('[findBestPartnerMatch] currentArchetype:', currentArchetype, '-> verwendet:', ichArchetype);

    // Sammle Partner-Dimensionen (für die Berechnung)
    const partnerDims = window.personDimensions.partner || {};

    // Validierte Dimensionen mit Defaults für fehlende Werte
    const validIchGeschlecht = ensureValidGeschlecht(ichDims.geschlecht);
    const validIchDominanz = ensureValidDominanz(ichDims.dominanz);
    const validIchOrientierung = ensureValidOrientierung(ichDims.orientierung);

    // BUGFIX: Wenn Partner-Dimensionen fehlen, verwende kompatible Defaults
    // statt feste Defaults die möglicherweise inkompatibel sind
    const partnerHasGeschlecht = partnerDims.geschlecht && partnerDims.geschlecht.primary;
    const partnerHasOrientierung = partnerDims.orientierung && partnerDims.orientierung.primary;

    let validPartnerGeschlecht;
    if (partnerHasGeschlecht) {
        validPartnerGeschlecht = ensureValidGeschlecht(partnerDims.geschlecht);
    } else {
        // Setze kompatibles Geschlecht basierend auf ICH-Orientierung
        const ichOriPrimary = validIchOrientierung.primary;
        const ichGeschPrimary = validIchGeschlecht.primary;
        if (ichOriPrimary === 'heterosexuell') {
            // Heterosexuell: Partner sollte anderes Geschlecht haben
            validPartnerGeschlecht = {
                primary: ichGeschPrimary === 'mann' ? 'frau' : 'mann',
                secondary: 'cis'
            };
        } else {
            // Homosexuell/bi-pansexuell: Gleiches Geschlecht ist kompatibel
            validPartnerGeschlecht = {
                primary: ichGeschPrimary,
                secondary: 'cis'
            };
        }
        // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
        // console.log('[findBestPartnerMatch] Partner-Geschlecht nicht gesetzt, verwende kompatiblen Default:', validPartnerGeschlecht);
    }

    let validPartnerOrientierung;
    if (partnerHasOrientierung) {
        validPartnerOrientierung = ensureValidOrientierung(partnerDims.orientierung);
    } else {
        // Setze kompatible Orientierung basierend auf ICH
        validPartnerOrientierung = {
            primary: validIchOrientierung.primary,
            secondary: validIchOrientierung.secondary
        };
        // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
        // console.log('[findBestPartnerMatch] Partner-Orientierung nicht gesetzt, verwende ICH-Orientierung:', validPartnerOrientierung);
    }

    // FEATURE: Dominanz-Auto-Korrelation - komplementäre Dominanz für beste Kompatibilität
    const partnerHasDominanz = partnerDims.dominanz && partnerDims.dominanz.primary;
    let validPartnerDominanz;
    if (partnerHasDominanz) {
        validPartnerDominanz = ensureValidDominanz(partnerDims.dominanz);
    } else {
        // Setze komplementäre Dominanz basierend auf ICH für maximalen Modifier (+8)
        const ichDomPrimary = validIchDominanz.primary;
        if (ichDomPrimary === 'dominant') {
            // dominant + submissiv = +8 Modifier (beste Kombination)
            validPartnerDominanz = { primary: 'submissiv', secondary: null };
        } else if (ichDomPrimary === 'submissiv') {
            // submissiv + dominant = +8 Modifier (beste Kombination)
            validPartnerDominanz = { primary: 'dominant', secondary: null };
        } else if (ichDomPrimary === 'switch') {
            // switch + switch = +3 Modifier
            validPartnerDominanz = { primary: 'switch', secondary: null };
        } else {
            // ausgeglichen + ausgeglichen = +5 Modifier
            validPartnerDominanz = { primary: 'ausgeglichen', secondary: null };
        }
        // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
        // console.log('[findBestPartnerMatch] Partner-Dominanz nicht gesetzt, verwende komplementären Default:', validPartnerDominanz);
    }

    // FEATURE: GFK-Auto-Korrelation - gleiche oder höhere GFK-Kompetenz
    const partnerHasGfk = partnerDims.gfk && partnerDims.gfk !== '';
    let validPartnerGfk;
    if (partnerHasGfk) {
        validPartnerGfk = partnerDims.gfk;
    } else {
        // Setze GFK basierend auf ICH - gleich oder höher für beste Kompatibilität
        const ichGfk = ichDims.gfk || 'mittel';
        // hoch-hoch = 100, mittel-mittel = 65, niedrig-niedrig = 25
        // Für beste Kompatibilität: Gleiche Stufe oder höher
        if (ichGfk === 'hoch') {
            validPartnerGfk = 'hoch'; // hoch-hoch = 100
        } else if (ichGfk === 'mittel') {
            validPartnerGfk = 'hoch'; // mittel-hoch = 75 (besser als mittel-mittel = 65)
        } else {
            validPartnerGfk = 'mittel'; // niedrig-mittel = 45 (besser als niedrig-niedrig = 25)
        }
        // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
        // console.log('[findBestPartnerMatch] Partner-GFK nicht gesetzt, verwende optimalen Default:', validPartnerGfk);
    }

    // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
    // console.log('[findBestPartnerMatch] Validierte ICH-Dimensionen:', {
    //     geschlecht: validIchGeschlecht,
    //     dominanz: validIchDominanz,
    //     orientierung: validIchOrientierung,
    //     gfk: ichDims.gfk || 'mittel'
    // });
    // console.log('[findBestPartnerMatch] Validierte Partner-Dimensionen:', {
    //     geschlecht: validPartnerGeschlecht,
    //     dominanz: validPartnerDominanz,
    //     orientierung: validPartnerOrientierung,
    //     gfk: validPartnerGfk
    // });

    let bestMatch = null;
    let bestScore = -1;
    const results = [];

    // Berechne Score für jeden möglichen Partner-Archetyp
    for (const partnerArch of ALL_ARCHETYPES) {
        try {
            // Erstelle temporäre Person-Objekte für die Berechnung
            // Person1 = ICH (die festen Einstellungen)
            const person1 = {
                archetyp: ichArchetype,
                dominanz: validIchDominanz,
                geschlecht: validIchGeschlecht,
                orientierung: validIchOrientierung,
                gfk: ichDims.gfk || 'mittel',
                needs: ichNeeds  // v3.6: Echte Needs für R-Faktor-Berechnung
            };

            // Person2 = PARTNER (der Archetyp, der getestet wird)
            const person2 = {
                archetyp: partnerArch,
                dominanz: validPartnerDominanz,
                geschlecht: validPartnerGeschlecht,
                orientierung: validPartnerOrientierung,
                gfk: validPartnerGfk,
                needs: partnerNeeds  // v3.6: Echte Needs für R-Faktor-Berechnung
            };

            let score = 0;

            // WICHTIG: Verwende dieselbe Berechnung wie updateComparisonView()
            // um konsistente Scores zu erhalten

            const pathosCheck = checkPhysicalCompatibility(person1, person2);
            const logosCheck = calculatePhilosophyCompatibility(ichArchetype, partnerArch);

            // v4.0 FIX: 'hohe_reibung' aus physicalCompatibility.js muss auch als inkompatibel behandelt werden
            const isIncompatible = pathosCheck.result === 'unmöglich' || pathosCheck.result === 'hohe_reibung';

            if (!isIncompatible && pathosCheck.result !== 'unvollständig') {
                // SSOT v3.10: R-Faktoren aus person.needs
                const result = calculateOverallWithModifiers(person1, person2, pathosCheck, logosCheck);
                let baseScore = result.overall || 0;

                // SSOT v3.7: Konfidenz-Multiplikator anwenden
                const confidenceMultiplier = window.getConfidenceMultiplier(pathosCheck.confidence);
                score = Math.round(baseScore * confidenceMultiplier * 10) / 10;
            } else if (pathosCheck.result === 'unvollständig') {
                // Bei unvollständigen Dimensionen: Fallback auf Archetyp-Matrix
                const logosScore = logosCheck.score || 50;
                score = logosScore;
            }
            // Bei 'unmöglich' oder 'hohe_reibung': score bleibt 0

            results.push({ archetype: partnerArch, score: score });

            if (score > bestScore) {
                bestScore = score;
                bestMatch = partnerArch;
            }
        } catch (e) {
            console.warn(`[findBestPartnerMatch] Fehler bei der Berechnung für ${partnerArch}:`, e);
        }
    }

    // Sortiere Ergebnisse nach Score
    results.sort((a, b) => b.score - a.score);
    console.log('[findBestPartnerMatch] ICH:', ichArchetype);
    console.log('[findBestPartnerMatch] Ranking:', results);

    // Wähle den besten Match aus, der NICHT derselbe Archetyp wie ICH ist
    // (nächstbester statt identischer Archetyp)
    const bestDifferentMatch = results.find(r => r.archetype !== ichArchetype);
    if (bestDifferentMatch) {
        bestMatch = bestDifferentMatch.archetype;
        bestScore = bestDifferentMatch.score;
    }

    console.log('[findBestPartnerMatch] Bester Match (≠ ICH):', bestMatch, 'mit Score:', bestScore);

    // Wähle den besten Match aus
    if (bestMatch) {
        window.selectArchetypeFromGrid('partner', bestMatch);

        // Zeige kurze Feedback-Animation auf dem Button
        const matchBtns = document.querySelectorAll('.best-match-btn');
        matchBtns.forEach(btn => {
            btn.classList.add('match-found');
            setTimeout(() => btn.classList.remove('match-found'), 1000);
        });
    }

    return { bestMatch, bestScore, results };
}
// ═══════════════════════════════════════════════════════════════════════
// HILFSFUNKTIONEN FÜR DIMENSIONEN
// ═══════════════════════════════════════════════════════════════════════

// Extrahiert primäre Dominanz aus dem Dominanz-Objekt
function getPrimaryDominanz(dominanzObj) {
    if (!dominanzObj) return 'ausgeglichen';
    for (const type of ['dominant', 'submissiv', 'switch', 'ausgeglichen']) {
        if (dominanzObj[type] === 'gelebt') return type;
    }
    return 'ausgeglichen';
}

// Extrahiert primäre Orientierung aus dem Orientierungs-Objekt
function getPrimaryOrientierung(orientierungObj) {
    if (!orientierungObj) return 'heterosexuell';
    for (const type of ['heterosexuell', 'homosexuell', 'bisexuell', 'pansexuell']) {
        if (orientierungObj[type] === 'gelebt') return type;
    }
    return 'heterosexuell';
}

// Extrahiert primäres Geschlecht aus dem Geschlechts-Objekt
function getPrimaryGeschlecht(geschlechtObj) {
    if (!geschlechtObj) return 'mann';
    const primary = geschlechtObj.primary;
    if (primary) return primary.toLowerCase();
    return 'mann';
}

/**
 * findBestIchMatch() - Findet den besten ICH-Archetyp basierend auf den Partner-Einstellungen
 * Umgekehrte Logik zu findBestPartnerMatch(): Hier werden die PARTNER-Einstellungen als Basis genommen
 * und der beste ICH-Archetyp gesucht.
 *
 * ═══════════════════════════════════════════════════════════════════════
 * TIAGE SYNTHESE v3.1 FORMEL (siehe findBestPartnerMatch für Details)
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Q = [(A × 0.15) + (O × 0.40) + (D × 0.20) + (G × 0.25)] × R
 *
 * v3.1: Q = Σ(Faktor × Gewicht × R_Dimension)
 * ═══════════════════════════════════════════════════════════════════════
 */
function findBestIchMatch() {
    console.log('[findBestIchMatch] Funktion aufgerufen');
    console.log('[findBestIchMatch] data geladen:', window.tiageData !== null);
    console.log('[findBestIchMatch] window.personDimensions:', JSON.stringify(window.personDimensions));

    // Prüfe, ob data geladen ist
    if (!window.tiageData) {
        console.warn('[findBestIchMatch] WARNUNG: data ist nicht geladen! Verwende Fallback-Matrix.');
    }

    const ALL_ARCHETYPES = ['single', 'duo', 'duo_flex', 'ra', 'lat', 'aromantisch', 'solopoly', 'polyamor'];

    // v3.6: Hole echte Needs aus TiageState für R-Faktor-Berechnung
    let ichNeeds = null;
    let partnerNeeds = null;
    if (typeof TiageState !== 'undefined') {
        // FIX v4.3: getFlatNeeds() statt get() — gibt flache Needs für aktuellen Archetyp zurück
        ichNeeds = TiageState.getFlatNeeds ? TiageState.getFlatNeeds('ich') : null;
        partnerNeeds = TiageState.getFlatNeeds ? TiageState.getFlatNeeds('partner') : null;
        console.log('[findBestIchMatch] Echte Needs geladen:', {
            ichNeeds: ichNeeds ? Object.keys(ichNeeds).length : 0,
            partnerNeeds: partnerNeeds ? Object.keys(partnerNeeds).length : 0
        });
    }

    // Sammle PARTNER-Daten (DU) als Basis
    const partnerArchetype = window.getPartnerArchetype() || 'duo';
    const partnerDims = window.personDimensions.partner || {};

    // Sammle ICH-Dimensionen (für die Berechnung)
    const ichDims = window.personDimensions.ich || {};

    // Validierte Dimensionen mit Defaults für fehlende Werte
    const validIchGeschlecht = ensureValidGeschlecht(ichDims.geschlecht);
    const validIchDominanz = ensureValidDominanz(ichDims.dominanz);
    const validIchOrientierung = ensureValidOrientierung(ichDims.orientierung);

    // BUGFIX: Wenn Partner-Dimensionen fehlen, verwende kompatible Defaults
    // statt feste Defaults die möglicherweise inkompatibel sind
    const partnerHasGeschlecht = partnerDims.geschlecht && partnerDims.geschlecht.primary;
    const partnerHasOrientierung = partnerDims.orientierung && partnerDims.orientierung.primary;

    let validPartnerGeschlecht;
    if (partnerHasGeschlecht) {
        validPartnerGeschlecht = ensureValidGeschlecht(partnerDims.geschlecht);
    } else {
        // Setze kompatibles Geschlecht basierend auf ICH-Orientierung
        // Für heterosexuell: gegengeschlechtlich, sonst gleiches Geschlecht
        const ichOriPrimary = validIchOrientierung.primary;
        const ichGeschPrimary = validIchGeschlecht.primary;
        if (ichOriPrimary === 'heterosexuell') {
            // Heterosexuell: Partner sollte anderes Geschlecht haben
            validPartnerGeschlecht = {
                primary: ichGeschPrimary === 'mann' ? 'frau' : 'mann',
                secondary: 'cis'
            };
        } else {
            // Homosexuell/bi-pansexuell: Gleiches Geschlecht ist kompatibel
            validPartnerGeschlecht = {
                primary: ichGeschPrimary,
                secondary: 'cis'
            };
        }
        console.log('[findBestIchMatch] Partner-Geschlecht nicht gesetzt, verwende kompatiblen Default:', validPartnerGeschlecht);
    }

    let validPartnerOrientierung;
    if (partnerHasOrientierung) {
        validPartnerOrientierung = ensureValidOrientierung(partnerDims.orientierung);
    } else {
        // Setze kompatible Orientierung basierend auf ICH
        validPartnerOrientierung = {
            primary: validIchOrientierung.primary,
            secondary: validIchOrientierung.secondary
        };
        console.log('[findBestIchMatch] Partner-Orientierung nicht gesetzt, verwende ICH-Orientierung:', validPartnerOrientierung);
    }

    // FEATURE: Dominanz-Auto-Korrelation - komplementäre Dominanz für beste Kompatibilität
    const partnerHasDominanz = partnerDims.dominanz && partnerDims.dominanz.primary;
    let validPartnerDominanz;
    if (partnerHasDominanz) {
        validPartnerDominanz = ensureValidDominanz(partnerDims.dominanz);
    } else {
        // Setze komplementäre Dominanz basierend auf ICH für maximalen Modifier (+8)
        const ichDomPrimary = validIchDominanz.primary;
        if (ichDomPrimary === 'dominant') {
            // dominant + submissiv = +8 Modifier (beste Kombination)
            validPartnerDominanz = { primary: 'submissiv', secondary: null };
        } else if (ichDomPrimary === 'submissiv') {
            // submissiv + dominant = +8 Modifier (beste Kombination)
            validPartnerDominanz = { primary: 'dominant', secondary: null };
        } else if (ichDomPrimary === 'switch') {
            // switch + switch = +3 Modifier
            validPartnerDominanz = { primary: 'switch', secondary: null };
        } else {
            // ausgeglichen + ausgeglichen = +5 Modifier
            validPartnerDominanz = { primary: 'ausgeglichen', secondary: null };
        }
        console.log('[findBestIchMatch] Partner-Dominanz nicht gesetzt, verwende komplementären Default:', validPartnerDominanz);
    }

    // FEATURE: GFK-Auto-Korrelation - gleiche oder höhere GFK-Kompetenz
    const partnerHasGfk = partnerDims.gfk && partnerDims.gfk !== '';
    let validPartnerGfk;
    if (partnerHasGfk) {
        validPartnerGfk = partnerDims.gfk;
    } else {
        // Setze GFK basierend auf ICH - gleich oder höher für beste Kompatibilität
        const ichGfk = ichDims.gfk || 'mittel';
        // hoch-hoch = 100, mittel-mittel = 65, niedrig-niedrig = 25
        // Für beste Kompatibilität: Gleiche Stufe oder höher
        if (ichGfk === 'hoch') {
            validPartnerGfk = 'hoch'; // hoch-hoch = 100
        } else if (ichGfk === 'mittel') {
            validPartnerGfk = 'hoch'; // mittel-hoch = 75 (besser als mittel-mittel = 65)
        } else {
            validPartnerGfk = 'mittel'; // niedrig-mittel = 45 (besser als niedrig-niedrig = 25)
        }
        console.log('[findBestIchMatch] Partner-GFK nicht gesetzt, verwende optimalen Default:', validPartnerGfk);
    }

    console.log('[findBestIchMatch] selectedPartner:', window.getPartnerArchetype(), '-> verwendet:', partnerArchetype);
    console.log('[findBestIchMatch] Validierte Partner-Dimensionen:', {
        geschlecht: validPartnerGeschlecht,
        dominanz: validPartnerDominanz,
        orientierung: validPartnerOrientierung,
        gfk: validPartnerGfk
    });

    let bestMatch = null;
    let bestScore = -1;
    const results = [];

    // Berechne Score für jeden möglichen ICH-Archetyp
    for (const ichArch of ALL_ARCHETYPES) {
        try {
            // Erstelle temporäre Person-Objekte für die Berechnung
            // Person1 = ICH (der Archetyp, der getestet wird)
            const person1 = {
                archetyp: ichArch,
                dominanz: validIchDominanz,
                geschlecht: validIchGeschlecht,
                orientierung: validIchOrientierung,
                gfk: ichDims.gfk || 'mittel',
                needs: ichNeeds  // v3.6: Echte Needs für R-Faktor-Berechnung
            };

            // Person2 = PARTNER (die festen Einstellungen)
            const person2 = {
                archetyp: partnerArchetype,
                dominanz: validPartnerDominanz,
                geschlecht: validPartnerGeschlecht,
                orientierung: validPartnerOrientierung,
                gfk: validPartnerGfk,
                needs: partnerNeeds  // v3.6: Echte Needs für R-Faktor-Berechnung
            };

            let score = 0;

            // WICHTIG: Verwende dieselbe Berechnung wie updateComparisonView()
            // um konsistente Scores zu erhalten

            const pathosCheck = checkPhysicalCompatibility(person1, person2);
            const logosCheck = calculatePhilosophyCompatibility(ichArch, partnerArchetype);

            // v4.0 FIX: 'hohe_reibung' aus physicalCompatibility.js muss auch als inkompatibel behandelt werden
            const isIncompatible = pathosCheck.result === 'unmöglich' || pathosCheck.result === 'hohe_reibung';

            if (!isIncompatible && pathosCheck.result !== 'unvollständig') {
                // SSOT v3.10: R-Faktoren aus person.needs
                const result = calculateOverallWithModifiers(person1, person2, pathosCheck, logosCheck);
                let baseScore = result.overall || 0;

                // SSOT v3.7: Konfidenz-Multiplikator anwenden
                const confidenceMultiplier = window.getConfidenceMultiplier(pathosCheck.confidence);
                score = Math.round(baseScore * confidenceMultiplier * 10) / 10;
            } else if (pathosCheck.result === 'unvollständig') {
                // Bei unvollständigen Dimensionen: Fallback auf Archetyp-Matrix
                const logosScore = logosCheck.score || 50;
                score = logosScore;
            }
            // Bei 'unmöglich' oder 'hohe_reibung': score bleibt 0

            results.push({ archetype: ichArch, score: score });

            if (score > bestScore) {
                bestScore = score;
                bestMatch = ichArch;
            }
        } catch (e) {
            console.warn(`Fehler bei der Berechnung für ${ichArch}:`, e);
        }
    }

    // Sortiere Ergebnisse für Debugging
    results.sort((a, b) => b.score - a.score);
    console.log('[findBestIchMatch] PARTNER:', partnerArchetype);
    console.log('[findBestIchMatch] Ranking:', results);

    // Wähle den besten Match aus, der NICHT derselbe Archetyp wie PARTNER ist
    // (nächstbester statt identischer Archetyp)
    const bestDifferentMatch = results.find(r => r.archetype !== partnerArchetype);
    if (bestDifferentMatch) {
        bestMatch = bestDifferentMatch.archetype;
        bestScore = bestDifferentMatch.score;
    }

    console.log('[findBestIchMatch] Bester ICH-Match (≠ PARTNER):', bestMatch, 'mit Score:', bestScore);

    // Wähle den besten Match aus
    if (bestMatch) {
        window.selectArchetypeFromGrid('ich', bestMatch);

        // Zeige kurze Feedback-Animation auf dem Button
        const matchBtns = document.querySelectorAll('.ich-match-btn');
        matchBtns.forEach(btn => {
            btn.classList.add('match-found');
            setTimeout(() => btn.classList.remove('match-found'), 1000);
        });
    }

    return { bestMatch, bestScore, results };
}

    // ── Exports ─────────────────────────────────────────────────────────────
    window.ensureValidGeschlecht = ensureValidGeschlecht;
    window.ensureValidDominanz = ensureValidDominanz;
    window.ensureValidOrientierung = ensureValidOrientierung;
    window.getPrimaryDominanz = getPrimaryDominanz;
    window.getPrimaryOrientierung = getPrimaryOrientierung;
    window.getPrimaryGeschlecht = getPrimaryGeschlecht;
    window.findBestPartnerMatch = findBestPartnerMatch;
    window.findBestIchMatch = findBestIchMatch;

})();
