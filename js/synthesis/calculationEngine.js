/**
 * CalculationEngine — Tiage Beziehungsqualität Berechnung
 * =========================================================
 * Extracted from app-main.js (lines ~5510-6332)
 *
 * Core calculation functions for relationship quality:
 * - getProfileFromStore, estimateProfilMatch
 * - calculateRelationshipQuality, calculateOverallWithModifiers
 * - calculateLogosPathosBalance, calculateResonanz
 * - calculateKSubfaktor, calculateGfkFactor, calculateRFactorsFromNeeds
 * - getPrimaryDominanz, getPrimaryOrientierung, getModifierSummary
 *
 * Dependencies (all globally available):
 * - TiageState, window.personDimensions, window.geschlechtExtrasCache
 * - window.getIchArchetype(), window.getPartnerArchetype()
 * - GfkBeduerfnisse (global)
 */

(function() {
'use strict';

function getIchArchetype()     { return window.getIchArchetype     ? window.getIchArchetype()     : (window.currentArchetype || 'single'); }
function getPartnerArchetype() { return window.getPartnerArchetype ? window.getPartnerArchetype() : (window.selectedPartner  || null); }

function getProfileFromStore(person) {
    // P/S-Geschlecht extrahieren
    let pGender = null;
    let sGender = null;

    if (person.geschlecht && typeof person.geschlecht === 'object') {
        pGender = person.geschlecht.primary;
        sGender = person.geschlecht.secondary;
    } else if (typeof person.geschlecht === 'string') {
        // Legacy: String direkt als P, kein S
        pGender = person.geschlecht;
    }

    // Fallback für sGender wenn nur pGender gesetzt ist
    // Standard-Werte basierend auf pGender:
    // - mann/frau → cis
    // - inter → nonbinaer
    if (pGender && !sGender) {
        if (pGender === 'inter') {
            sGender = 'nonbinaer';
        } else if (pGender === 'mann' || pGender === 'frau') {
            sGender = 'cis';
        }
    }

    // Dominanz extrahieren
    let dominanz = 'ausgeglichen';
    if (person.dominanz && typeof person.dominanz === 'object') {
        if ('primary' in person.dominanz) {
            dominanz = person.dominanz.primary || 'ausgeglichen';
        }
    } else if (person.dominanz) {
        dominanz = person.dominanz;
    }

    // Orientierung extrahieren
    let orientierung = 'heterosexuell';
    if (person.orientierung && typeof person.orientierung === 'object') {
        if ('primary' in person.orientierung) {
            orientierung = person.orientierung.primary || 'heterosexuell';
        }
    } else if (person.orientierung) {
        orientierung = person.orientierung;
    }

    // Profil aus Store holen (synchron)
    if (pGender && sGender) {
        return TiageProfileStore.getProfileSync(
            person.archetyp,
            pGender,
            sGender,
            dominanz,
            orientierung
        );
    }

    return null;
}

/**
 * Schätzt den Profil-Match wenn keine exakten Profile verfügbar
 * Basiert auf Archetyp-Ähnlichkeit und Dimension-Übereinstimmungen
 */
function estimateProfilMatch(person1, person2) {
    let score = 50; // Basis

    // Gleicher Archetyp = +30
    if (person1.archetyp === person2.archetyp) {
        score += 30;
    } else {
        // Ähnliche Archetypen (aus Matrix ableitbar)
        const archetypeScore = getArchetypeScore(person1.archetyp, person2.archetyp);
        score += Math.round((archetypeScore - 50) * 0.3);
    }

    // Gleiche Dominanz-Orientierung = +10
    const dom1 = getPrimaryDominanz(person1.dominanz);
    const dom2 = getPrimaryDominanz(person2.dominanz);
    if (dom1 === dom2) score += 10;

    // Ähnliche Orientierung = +10
    const ori1 = getPrimaryOrientierung(person1.orientierung);
    const ori2 = getPrimaryOrientierung(person2.orientierung);
    if (ori1 === ori2) score += 10;

    // Keine Obergrenze - nur Untergrenze bei 0
    return Math.max(0, score);
}

/**
 * Prüft ob zwei Attribut-Werte kompatibel sind (partielle Übereinstimmung)
 */
function areAttributesCompatible(attr, val1, val2) {
    // Kompatibilitäts-Gruppen für bestimmte Attribute
    const compatGroups = {
        'wohnform': [['alleine', 'zusammen'], ['getrennt', 'zusammen']],
        'lebensstil': [['durchschnittlich', 'bescheiden'], ['durchschnittlich', 'luxuriös']],
        'kommunikationsstil': [['direkt', 'ausgewogen'], ['indirekt', 'ausgewogen']],
        'introExtro': [['ambivert', 'introvertiert'], ['ambivert', 'extrovertiert']]
    };

    if (compatGroups[attr]) {
        for (const group of compatGroups[attr]) {
            if (group.includes(val1) && group.includes(val2)) {
                return true;
            }
        }
    }

    return false;
}

/**
 * Helper: Primäre Dominanz aus Objekt ermitteln
 */
function getPrimaryDominanz(dominanz) {
    if (!dominanz || typeof dominanz !== 'object') return dominanz || 'ausgeglichen';
    // New format: { primary: 'dominant', secondary: 'submissiv' }
    if ('primary' in dominanz) {
        return dominanz.primary || 'ausgeglichen';
    }
    // Old format: { dominant: 'gelebt', submissiv: 'interessiert' }
    for (const [type, status] of Object.entries(dominanz)) {
        if (status === 'gelebt') return type;
    }
    return 'ausgeglichen';
}

/**
 * Helper: Primäre Orientierung aus Objekt ermitteln
 */
function getPrimaryOrientierung(orientierung) {
    if (!orientierung || typeof orientierung !== 'object') return orientierung || 'heterosexuell';
    // New format: { primary: 'homosexuell', secondary: 'heterosexuell' }
    if ('primary' in orientierung) {
        return orientierung.primary || 'heterosexuell';
    }
    // Old format: { heterosexuell: 'gelebt', homosexuell: 'interessiert' }
    for (const [type, status] of Object.entries(orientierung)) {
        if (status === 'gelebt') return type;
    }
    return 'heterosexuell';
}

/**
 * Berechnet die Logos-Pathos-Balance (B)
 * B = (100 - |Logos - Pathos|) / 100
 * @returns {number} Balance 0.0-1.0
 */
function calculateLogosPathosBalance(archetypeScore, orientationScore, dominanceScore, genderScore) {
    // Logos = Archetyp-Score
    const logos = archetypeScore;

    // Pathos = Durchschnitt der drei Pathos-Faktoren
    const pathos = (orientationScore + dominanceScore + genderScore) / 3;

    // Differenz
    const differenz = Math.abs(logos - pathos);

    // Balance: Je geringer die Differenz, desto höher die Balance
    const balance = (100 - differenz) / 100;

    return Math.max(0, Math.min(1, balance));
}

/**
 * Berechnet den Resonanz-Koeffizienten (R)
 * R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
 *
 * K = GFK-Kommunikationsfaktor (0-1)
 *     - Beide hoch: 1.0
 *     - Hoch+Mittel: 0.75
 *     - Beide mittel: 0.5
 *     - Asymmetrisch: 0.25
 *     - Beide niedrig: 0.0
 *
 * @returns {object} { R: 0.9-1.1, M: 0-100, B: 0-1, K: 0-1, interpretation: string }
 */
function calculateResonanz(person1, person2, archetypeScore, orientationScore, dominanceScore, genderScore) {
    // Komponente 1: Profil-Match (M)
    const M = calculateProfilMatch(person1, person2);

    // Komponente 2: Logos-Pathos-Balance (B)
    const B = calculateLogosPathosBalance(archetypeScore, orientationScore, dominanceScore, genderScore);

    // Komponente 3: GFK-Kommunikationsfaktor (K) mit K1-K4 Subfaktoren
    const kResult = calculateGfkFactor();
    const K = kResult.K;  // Gesamt-K für Formel

    // Gesamtformel: R = 0.9 + [(M/100 × 0.35) + (B × 0.35) + (K × 0.30)] × 0.2
    // GFK bekommt 30% weil Kommunikation fundamental für Resonanz ist
    const R = 0.9 + ((M / 100 * 0.35) + (B * 0.35) + (K * 0.30)) * 0.2;

    // Interpretation
    let interpretation;
    if (R >= 1.08) {
        interpretation = 'Starke Harmonie';
    } else if (R >= 1.03) {
        interpretation = 'Leichte Harmonie';
    } else if (R >= 0.97) {
        interpretation = 'Neutral';
    } else if (R >= 0.93) {
        interpretation = 'Leichte Dissonanz';
    } else {
        interpretation = 'Starke Dissonanz';
    }

    return {
        R: Math.round(R * 100) / 100,
        M: M,
        B: Math.round(B * 100) / 100,
        K: K,
        K1: kResult.K1,  // Orientierung-Bedürfnisse
        K2: kResult.K2,  // Archetyp-Bedürfnisse
        K3: kResult.K3,  // Dominanz-Bedürfnisse
        K4: kResult.K4,  // Geschlecht-Bedürfnisse
        kompetenz: kResult.kompetenz,
        kompetenzLabel: kResult.kompetenzLabel,
        interpretation: interpretation
    };
}

/**
 * K-FAKTOR ZUORDNUNG: GFK-Kategorien zu den 4 Hauptfaktoren
 * ═══════════════════════════════════════════════════════════════════════
 * Basiert auf Tiage-Modell (Pathos/Logos) + GFK (Rosenberg)
 */
const K_FAKTOR_KATEGORIEN = {
    // K1: Orientierung (Pathos) - Körperliche Anziehung, Sexualität
    K1: ['existenz', 'zuneigung', 'musse'],  // 22 Bedürfnisse

    // K2: Archetyp (Logos) - Beziehungsphilosophie
    K2: ['freiheit', 'teilnahme', 'identitaet'],  // 26 Bedürfnisse

    // K3: Dominanz (Pathos) - Energetische Dynamik
    K3: ['dynamik', 'sicherheit'],  // 21 Bedürfnisse

    // K4: Geschlecht (Pathos) - Gender-Chemie, Identität
    K4: ['verstaendnis', 'erschaffen', 'verbundenheit']  // 19 Bedürfnisse
};

/**
 * Berechnet den Bedürfnis-Match für eine K-Kategorie
 * @param {string} kKey - 'K1', 'K2', 'K3' oder 'K4'
 * @param {object} matching - Das Matching-Ergebnis von GfkBeduerfnisse.berechneMatching
 * @returns {number} 0-1, wobei 1 = perfekte Übereinstimmung
 */
function calculateKSubfaktor(kKey, matching) {
    if (!matching || !matching.details) return 0.5;  // Fallback

    const kategorien = K_FAKTOR_KATEGORIEN[kKey];
    if (!kategorien) return 0.5;

    let gemeinsam = 0;
    let total = 0;

    // Zähle gemeinsame und unterschiedliche Bedürfnisse pro Kategorie
    const uebereinstimmend = matching.details.uebereinstimmend || [];
    const konflikt = matching.details.konflikt || [];

    for (const kat of kategorien) {
        const gemeinsamInKat = uebereinstimmend.filter(b => {
            // b.stringKey für definitionen-Lookup verwenden
            const def = GfkBeduerfnisse?.definitionen?.[b.stringKey || b.id];
            return def?.kategorie === kat;
        }).length;

        const konfliktInKat = konflikt.filter(b => {
            // b.stringKey für definitionen-Lookup verwenden
            const def = GfkBeduerfnisse?.definitionen?.[b.stringKey || b.id];
            return def?.kategorie === kat;
        }).length;

        gemeinsam += gemeinsamInKat;
        total += gemeinsamInKat + konfliktInKat;
    }

    // Wenn keine Bedürfnisse in dieser Kategorie: neutral
    if (total === 0) return 0.5;

    return gemeinsam / total;
}

/**
 * Berechnet den GFK-Kommunikationsfaktor (K) mit K1-K4 Subfaktoren
 * K = (K1 + K2 + K3 + K4) / 4
 *
 * Jeder Ki basiert auf dem Bedürfnis-Match der relevanten GFK-Kategorien:
 * - K1 (Orientierung): existenz, zuneigung, musse
 * - K2 (Archetyp): freiheit, teilnahme, identitaet
 * - K3 (Dominanz): dynamik, sicherheit
 * - K4 (Geschlecht): verstaendnis, erschaffen, verbundenheit
 *
 * @returns {object} { K: 0-1, K1, K2, K3, K4, details }
 */
function calculateGfkFactor() {
    const ichGfk = window.personDimensions.ich?.gfk;
    const partnerGfk = window.personDimensions.partner?.gfk;

    // Basis-Kompetenz-Faktor (alte Logik als Fallback/Gewichtung)
    let kompetenzFaktor = 0.5;
    if (ichGfk && partnerGfk) {
        const gfkValues = { 'hoch': 3, 'mittel': 2, 'niedrig': 1 };
        const v1 = gfkValues[ichGfk] || 2;
        const v2 = gfkValues[partnerGfk] || 2;
        const sum = v1 + v2;
        const min = Math.min(v1, v2);

        if (sum === 6) kompetenzFaktor = 1.0;
        else if (sum === 5) kompetenzFaktor = 0.75;
        else if (sum === 4 && min === 2) kompetenzFaktor = 0.5;
        else if (sum === 4 && min === 1) kompetenzFaktor = 0.35;
        else if (sum === 3) kompetenzFaktor = 0.2;
        else kompetenzFaktor = 0.0;
    }

    // Bedürfnis-Matching berechnen - Schlüssel unverändert (duo_flex bleibt duo_flex)
    const ichArchetyp = getIchArchetype() || '';
    const partnerArchetyp = getPartnerArchetype() || '';

    let K1 = 0.5, K2 = 0.5, K3 = 0.5, K4 = 0.5;
    let matching = null;

    if (typeof GfkBeduerfnisse !== 'undefined' && ichArchetyp && partnerArchetyp) {
        matching = GfkBeduerfnisse.berechneMatching(ichArchetyp, partnerArchetyp);

        if (matching && !matching.fehler) {
            K1 = calculateKSubfaktor('K1', matching);
            K2 = calculateKSubfaktor('K2', matching);
            K3 = calculateKSubfaktor('K3', matching);
            K4 = calculateKSubfaktor('K4', matching);
        }
    }

    // Gesamt-K: Durchschnitt der 4 Subfaktoren, gewichtet mit Kompetenz
    // K = Bedürfnis-Match × Kompetenz-Multiplikator
    const beduerfnisMatch = (K1 + K2 + K3 + K4) / 4;
    const K = beduerfnisMatch * (0.5 + kompetenzFaktor * 0.5);  // Kompetenz skaliert 0.5-1.0

    return {
        K: Math.round(K * 100) / 100,
        K1: Math.round(K1 * 100) / 100,
        K2: Math.round(K2 * 100) / 100,
        K3: Math.round(K3 * 100) / 100,
        K4: Math.round(K4 * 100) / 100,
        kompetenz: kompetenzFaktor,
        kompetenzLabel: ichGfk && partnerGfk ? `${ichGfk} + ${partnerGfk}` : 'nicht gesetzt',
        beduerfnisMatch: Math.round(beduerfnisMatch * 100) / 100
    };
}

// ═══════════════════════════════════════════════════════════════════════
// ═══════════════════════════════════════════════════════════════════════
// SSOT v3.9: R-FAKTOREN HILFSFUNKTION
// ═══════════════════════════════════════════════════════════════════════
/**
 * Berechnet R-Faktoren (R1-R4) aus Needs für eine Person
 * SSOT: Diese Funktion ist die einzige Quelle für Needs-basierte R-Faktoren
 *
 * @param {Object} personData - { archetyp, needs }
 * @param {Object} personData.needs - Die 220 Bedürfnis-Werte
 * @param {string} personData.archetyp - Archetyp der Person
 * @returns {Object|null} { R1, R2, R3, R4 } oder null wenn nicht berechenbar
 */
function calculateRFactorsFromNeeds(personData) {
    if (!personData || !personData.needs) {
        return null;
    }

    // Prüfe ob TiageSynthesis verfügbar ist
    if (typeof TiageSynthesis === 'undefined' ||
        !TiageSynthesis.NeedsIntegration ||
        typeof TiageSynthesis.NeedsIntegration.calculateDimensionalResonance !== 'function') {
        console.warn('[calculateRFactorsFromNeeds] TiageSynthesis nicht verfügbar');
        return null;
    }

    try {
        const resonanz = TiageSynthesis.NeedsIntegration.calculateDimensionalResonance({
            archetyp: personData.archetyp,
            needs: personData.needs
        });

        if (!resonanz || !resonanz.enabled) {
            return null;
        }

        // R1-R3 aus Needs, R4 benötigt beide Personen (wird separat berechnet)
        return {
            R1: resonanz.leben || resonanz.R1 || 1.0,
            R2: resonanz.philosophie || resonanz.R2 || 1.0,
            R3: resonanz.dynamik || resonanz.R3 || 1.0,
            R4: 1.0  // R4 wird via calculateR4Hybrid berechnet (benötigt beide Personen)
        };
    } catch (e) {
        console.warn('[calculateRFactorsFromNeeds] Fehler:', e);
        return null;
    }
}

// HAUPTBERECHNUNG: 5-Faktoren Beziehungsqualität (inkl. Resonanz)
// ═══════════════════════════════════════════════════════════════════════
// Philosophische Grundlage: Tiage-Modell + MOQ (Pirsig) + OSHO
//
// GEWICHTUNG LOGOS vs. PATHOS (25:75)
// ────────────────────────────────────
// Pirsig (MOQ): "Qualität ist die Quelle von Subjekt und Objekt."
//               Statische Qualität (Logos) = Fundament, bewahrt Muster
//               Dynamische Qualität (Pathos) = Antrieb, erzeugt Anziehung
//
// OSHO: "Balance zwischen allen Polaritäten ist Gesundheit."
//       "Gefühl ist der Antrieb, Verstand gibt Struktur."
//
// Tiage: Verbindet rationale Reflexion (Logos) mit emotionaler
//        Resonanz (Pathos) zu einem ganzheitlichen Modell.
//
// FAKTOR-BEGRÜNDUNG:
// ────────────────────────────────────
// 1. Orientierung (40% - Pathos/Gefühl):
//    → Körperliche Anziehungsmöglichkeit
//    → Dynamische Qualität: Polarität der Begierde
//    → OSHO: "Extreme ziehen sich an"
//    → Höchste Gewichtung: Menschen erleben Beziehung zuerst körperlich
//
// 2. Archetyp (25% - Logos/Verstand):
//    → Fundamentale Beziehungsphilosophie
//    → Statische Qualität: "Wie wollen wir Beziehung leben?"
//    → Die Archetyp-Frage stellt sich NACH den Pathos-Faktoren
//
// 3. Dominanz (20% - Pathos/Gefühl):
//    → Energetische Dynamik der Interaktion
//    → Dynamische Qualität: Führen/Folgen-Balance
//    → OSHO: "Tao - eine Energie, zwei Ausdrucksformen"
//
// 4. Geschlecht (15% - Pathos/Gefühl):
//    → Gender-Chemie als Feinabstimmung
//    → Ergänzt Orientierung mit Nuancen (z.B. non-binär)
//    → Niedrigste Gewichtung
//
// SUMME: Pathos 75% + Logos 25% = 100%
// → "Pathos vor Logos" - Das Erleben kommt vor der Interpretation
// ═══════════════════════════════════════════════════════════════════════
/**
 * Berechnet die Beziehungsqualität zwischen zwei Personen
 * SSOT v3.10: R-Faktoren werden IMMER aus Needs berechnet
 *
 * @param {Object} person1 - Profil Person 1 (mit .needs)
 * @param {Object} person2 - Profil Person 2 (mit .needs)
 * @param {Object} options - Optionale Einstellungen
 * @param {Object} options.rFaktoren - Explizit übergebene R-Faktoren (nur für Best-Match mit fiktiven Partnern)
 */
function calculateRelationshipQuality(person1, person2, options) {
    options = options || {};
    const explicitRFaktoren = options.rFaktoren || null;

    // ═══════════════════════════════════════════════════════════════════
    // TIAGE RECHENMODELL v3.2 - Quadratische Resonanz mit Komplementär-Mapping
    // ═══════════════════════════════════════════════════════════════════
    // Formel: Score = (O × wO × R1) + (A × wA × R2) + (D × wD × R3) + (G × wG × R4)
    //
    // Ri = similarity² (Range: 0 - 1)
    // → 0% Match  = 0.0 (eliminiert Dimension)
    // → 50% Match = 0.25 (stark reduziert)
    // → 100% Match = 1.0 (neutral)

    const orientationScore = calculateOrientationScore(person1, person2);

    if (orientationScore === 0) {
        return {
            score: 0,
            blocked: true,
            reason: TiageI18n.t('quality.noAttraction', 'Keine körperliche Anziehung möglich'),
            breakdown: {
                archetyp: 0,
                dominanz: 0,
                orientierung: 0,
                geschlecht: 0
            },
            resonanz: { R1: 0, R2: 0, R3: 0, R4: 0, GFK: 0 }
        };
    }

    // ═══════════════════════════════════════
    // SCHRITT 1: Basis-Faktoren (0-100)
    // ═══════════════════════════════════════
    const archetypeScore = getArchetypeScore(person1.archetyp, person2.archetyp);
    const dominanceScore = calculateDominanceHarmony(person1.dominanz, person2.dominanz);
    const genderScore = calculateGenderAttraction(person1, person2);

    // ═══════════════════════════════════════
    // SCHRITT 2: Resonanz-Faktoren R1-R4 (0-1, v3.2 quadratisch)
    // ═══════════════════════════════════════
    // SSOT v3.10: R-Faktoren werden IMMER aus Needs berechnet
    // Basierend auf 220 Bedürfnissen, aufgeteilt nach Faktor

    // Schlüssel unverändert verwenden (duo_flex bleibt duo_flex)
    const ichArchetyp = getIchArchetype() || '';
    const partnerArchetyp = getPartnerArchetype() || '';

    let R1 = 1.0, R2 = 1.0, R3 = 1.0, R4 = 1.0;  // Default: neutral
    let matching = null;
    let rFactorSource = 'default';

    // ═══════════════════════════════════════════════════════════════════
    // v3.6: R-FAKTOREN AUS ECHTEN NEEDS (wenn verfügbar)
    // ═══════════════════════════════════════════════════════════════════
    // Hilfsfunktion: Summe × Similarity Kombination
    // SSOT: Gleiche Formel wie combineRFactors() in synthesisCalculator.js
    // Keine Zwischen-Rundung — Display-Rundung per toFixed(2)
    function combineRFactors(R_ich, R_partner) {
        const a = R_ich || 1.0;
        const b = R_partner || 1.0;
        const summe = a + b;
        const similarity = Math.min(a, b) / Math.max(a, b);
        return (summe * similarity) / 2;
    }

    // Wenn echte Needs vorhanden sind, berechne R-Faktoren daraus
    if (person1.needs && person2.needs &&
        typeof TiageSynthesis !== 'undefined' &&
        TiageSynthesis.NeedsIntegration &&
        typeof TiageSynthesis.NeedsIntegration.calculateDimensionalResonance === 'function') {

        try {
            // Berechne individuelle R-Faktoren
            const resonanzIch = TiageSynthesis.NeedsIntegration.calculateDimensionalResonance({
                archetyp: person1.archetyp,
                needs: person1.needs
            });
            const resonanzPartner = TiageSynthesis.NeedsIntegration.calculateDimensionalResonance({
                archetyp: person2.archetyp,
                needs: person2.needs
            });

            if (resonanzIch && resonanzIch.enabled && resonanzPartner && resonanzPartner.enabled) {
                // Kombiniere mit Summe × Similarity (v3.6)
                R1 = combineRFactors(resonanzIch.leben || resonanzIch.R1, resonanzPartner.leben || resonanzPartner.R1);
                R2 = combineRFactors(resonanzIch.philosophie || resonanzIch.R2, resonanzPartner.philosophie || resonanzPartner.R2);
                R3 = combineRFactors(resonanzIch.dynamik || resonanzIch.R3, resonanzPartner.dynamik || resonanzPartner.R3);
                // R4 wird weiterhin via calculateR4Hybrid berechnet

                rFactorSource = 'realNeeds';
                // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
                // console.log('[calculateRelationshipQuality] R1-R3 aus ECHTEN NEEDS berechnet:', {
                //     R1, R2, R3,
                //     resonanzIch: { R1: resonanzIch.leben || resonanzIch.R1, R2: resonanzIch.philosophie || resonanzIch.R2, R3: resonanzIch.dynamik || resonanzIch.R3 },
                //     resonanzPartner: { R1: resonanzPartner.leben || resonanzPartner.R1, R2: resonanzPartner.philosophie || resonanzPartner.R2, R3: resonanzPartner.dynamik || resonanzPartner.R3 }
                // });

                // ═══════════════════════════════════════════════════════════════════
                // FIX v1.8.785: R-Faktoren zu TiageState speichern für Modal-Konsistenz
                // FIX v4.3: NICHT im Batch-Modus (Slot Machine) — explicitRFaktoren überschreiben sowieso
                // Side-Effect verursachte Nicht-Determinismus: ~800 TiageState-Writes + Events pro Lauf
                // ═══════════════════════════════════════════════════════════════════
                if (!explicitRFaktoren && typeof ResonanzCard !== 'undefined' && ResonanzCard.setCalculatedValues) {
                    const ichR = {
                        R1: resonanzIch.leben || resonanzIch.R1 || 1.0,
                        R2: resonanzIch.philosophie || resonanzIch.R2 || 1.0,
                        R3: resonanzIch.dynamik || resonanzIch.R3 || 1.0,
                        R4: resonanzIch.identitaet || resonanzIch.R4 || 1.0
                    };
                    const partnerR = {
                        R1: resonanzPartner.leben || resonanzPartner.R1 || 1.0,
                        R2: resonanzPartner.philosophie || resonanzPartner.R2 || 1.0,
                        R3: resonanzPartner.dynamik || resonanzPartner.R3 || 1.0,
                        R4: resonanzPartner.identitaet || resonanzPartner.R4 || 1.0
                    };
                    // Speichere individuelle R-Faktoren (respektiert gesperrte Werte)
                    ResonanzCard.setCalculatedValues(ichR, false, 'ich');
                    ResonanzCard.setCalculatedValues(partnerR, false, 'partner');
                    // console.log('[calculateRelationshipQuality] R-Faktoren zu TiageState gespeichert:', { ich: ichR, partner: partnerR }); // DISABLED: verursacht Message-Overflow
                }
            }
        } catch (e) {
            console.warn('[calculateRelationshipQuality] Fehler bei R-Faktor-Berechnung aus Needs:', e);
        }
    }

    // NO FALLBACK: R1-R3 bleiben bei 1.0 wenn keine echten Needs verfügbar
    // Die UI zeigt eine Warnung an, wenn rFactorSource === 'default'

    // ═══════════════════════════════════════
    // R4 HYBRID: Identität + Bidirektionale Attraktion
    // ═══════════════════════════════════════
    // v3.2: R4 = (identity × 0.30 + attraction × 0.70)² / 10000
    // - Identität: Cis↔Cis, Trans↔Trans Resonanz (30%)
    // - Attraktion: Bidirektional mit P/S Gewichtung (70%)
    const r4Result = calculateR4Hybrid(person1, person2);
    R4 = r4Result.R4;
    // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
    // console.log('[calculateRelationshipQuality] R4 HYBRID berechnet:', {
    //     R4,
    //     identityScore: r4Result.identityScore,
    //     attractionScore: r4Result.attractionScore,
    //     attraction1to2: r4Result.attractionDetails?.direction1to2,
    //     attraction2to1: r4Result.attractionDetails?.direction2to1
    // });

    // ═══════════════════════════════════════════════════════════════════
    // SSOT v3.10: R-FAKTOREN NUR AUS NEEDS
    // ═══════════════════════════════════════════════════════════════════
    // Priorität 1: Explizit übergebene rFaktoren (NUR für Best-Match mit fiktiven Partnern)
    // Priorität 2: Aus Needs berechnet (bereits oben geschehen)
    // Priorität 3: Default 1.0 (wenn keine Needs verfügbar)
    //
    // KEIN ResonanzCard-Override mehr! R-Faktoren = f(Needs), immer.

    if (explicitRFaktoren && explicitRFaktoren.ich && explicitRFaktoren.partner) {
        // Best-Match: Explizit übergebene R-Faktoren für fiktive Partner
        const getR = (obj, key) => (obj && obj[key] !== undefined) ? obj[key] : 1.0;

        R1 = combineRFactors(getR(explicitRFaktoren.ich, 'R1'), getR(explicitRFaktoren.partner, 'R1'));
        R2 = combineRFactors(getR(explicitRFaktoren.ich, 'R2'), getR(explicitRFaktoren.partner, 'R2'));
        R3 = combineRFactors(getR(explicitRFaktoren.ich, 'R3'), getR(explicitRFaktoren.partner, 'R3'));
        R4 = combineRFactors(getR(explicitRFaktoren.ich, 'R4'), getR(explicitRFaktoren.partner, 'R4'));

        rFactorSource = 'explicit';
        console.log('[calculateRelationshipQuality] SSOT: R-Faktoren EXPLIZIT für fiktiven Partner:', {
            ich: explicitRFaktoren.ich,
            partner: explicitRFaktoren.partner,
            combined: { R1, R2, R3, R4 }
        });
    }
    // Sonst: R1-R4 bleiben bei den aus Needs berechneten Werten (oder Default 1.0)

    // ═══════════════════════════════════════
    // SCHRITT 3: Score-Berechnung mit Resonanz
    // ═══════════════════════════════════════
    // NEU: 3-Wege-Gewichtung (0 = Egal, 1 = Normal, 2 = Wichtig)
    // Score = (O × wO × R1) + (A × wA × R2) + (D × wD × R3) + (G × wG × R4)
    // wobei wX die normalisierte Gewichtung ist

    // Gewichte aus TiageState laden (SSOT) - neues Format: 0/1/2
    let gew = { O: 1, A: 1, D: 1, G: 1 };
    try {
        if (typeof TiageState !== 'undefined') {
            const stored = TiageState.get('paarung.gewichtungen');
            // Neues Format: { O: 1, A: 2, D: 0, G: 1 }
            if (stored && typeof stored.O === 'number' && stored.O >= 0 && stored.O <= 2) {
                gew = {
                    O: stored.O ?? 1,
                    A: stored.A ?? 1,
                    D: stored.D ?? 1,
                    G: stored.G ?? 1
                };
            }
            // Legacy Format Migration: { O: { value: 25, locked: false }, ... }
            else if (stored && stored.O && typeof stored.O === 'object' && 'value' in stored.O) {
                gew = {
                    O: stored.O.value <= 10 ? 0 : (stored.O.value >= 40 ? 2 : 1),
                    A: stored.A.value <= 10 ? 0 : (stored.A.value >= 40 ? 2 : 1),
                    D: stored.D.value <= 10 ? 0 : (stored.D.value >= 40 ? 2 : 1),
                    G: stored.G.value <= 10 ? 0 : (stored.G.value >= 40 ? 2 : 1)
                };
            }
        }
        // Fallback: agodWeights global
        if (typeof agodWeights !== 'undefined') {
            gew = { ...agodWeights };
        }
    } catch (e) {
        console.warn('[calculateRelationshipQuality] Fehler beim Laden der Gewichte:', e);
    }

    // Normalisiere Gewichte: Summe der aktiven Gewichte = 1.0
    // 0 = ignoriert, 1 = normal, 2 = doppelt
    const gewSum = gew.O + gew.A + gew.D + gew.G;
    const gewDivisor = gewSum > 0 ? gewSum : 4; // Fallback: alle gleich
    const wO = gew.O / gewDivisor;
    const wA = gew.A / gewDivisor;
    const wD = gew.D / gewDivisor;
    const wG = gew.G / gewDivisor;

    const scoreO = orientationScore * wO * R1;
    const scoreA = archetypeScore * wA * R2;
    const scoreD = dominanceScore * wD * R3;
    const scoreG = genderScore * wG * R4;

    let totalScore = scoreO + scoreA + scoreD + scoreG;

    // GFK-Kompetenz = Durchschnitt R1-R4
    const GFK = (R1 + R2 + R3 + R4) / 4;

    // ═══════════════════════════════════════
    // RESONANZ-VERSTÄRKUNG (v1.8.836)
    // ═══════════════════════════════════════
    // Wenn beide Partner hohe Resonanz haben (GFK > 1.0),
    // wird der Score verstärkt und kann über 100% gehen.
    // Formel: boost = (GFK - 1.0) × 0.5 (max +25% bei GFK=1.5)
    let resonanceBoost = 0;
    if (GFK > 1.0 && rFactorSource !== 'default') {
        resonanceBoost = (GFK - 1.0) * 0.5;  // 50% der Über-Resonanz als Bonus
        totalScore = totalScore * (1 + resonanceBoost);
        // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
        // console.log('[Resonanz-Verstärkung] GFK:', GFK.toFixed(2), 'Boost:', (resonanceBoost * 100).toFixed(1) + '%', 'Score:', totalScore.toFixed(1));
    }

    // ═══════════════════════════════════════
    // EXTRAS-MODIFIKATOR (v1.8.837)
    // ═══════════════════════════════════════
    // Fit/Fucked up/Horny Kombinations-Bonus/Malus
    // FIX v4.3: Im Batch-Modus (Slot Machine) FFH aus options.extras verwenden
    // statt globalem window.geschlechtExtrasCache, damit jede Iteration korrekt berechnet wird
    let extrasModifier = 0;
    let extrasDetails = null;
    if (typeof TiageExtrasModifier !== 'undefined') {
        const ichExtras = (options.extras && options.extras.ich) || window.geschlechtExtrasCache.ich;
        const partnerExtras = (options.extras && options.extras.partner) || window.geschlechtExtrasCache.partner;
        const extrasResult = TiageExtrasModifier.calculate(
            ichExtras,
            partnerExtras
        );
        extrasModifier = extrasResult.modifier;
        extrasDetails = extrasResult;
        totalScore = totalScore + extrasModifier;
        // DEBUG DISABLED v1.8.871: Best-Match iteriert hunderte Kombinationen
        // if (extrasModifier !== 0) {
        //     console.log('[Extras-Modifikator]', extrasResult.description, 'Modifier:', extrasModifier, 'Score:', totalScore.toFixed(1));
        // }
    }

    // ═══════════════════════════════════════
    // SCHRITT 4: Meta-Faktoren (für UI)
    // ═══════════════════════════════════════
    const M = calculateProfilMatch(person1, person2);
    const B = calculateLogosPathosBalance(archetypeScore, orientationScore, dominanceScore, genderScore);

    // Logos/Pathos Breakdown für UI
    const logos = archetypeScore;
    const pathos = (orientationScore + dominanceScore + genderScore) / 3;

    // ═══════════════════════════════════════
    // SSOT-VERGLEICH (async, blockiert nicht)
    // ═══════════════════════════════════════
    const result = {
        score: Math.round(totalScore * 10) / 10,  // Eine Dezimalstelle (kann > 100 sein)
        blocked: false,
        resonanceBoost: resonanceBoost > 0 ? Math.round(resonanceBoost * 1000) / 10 : 0,  // Als Prozent
        noRealNeeds: rFactorSource === 'default',  // Flag für UI-Warnung
        breakdown: {
            archetyp: archetypeScore,
            dominanz: dominanceScore,
            orientierung: orientationScore,
            geschlecht: genderScore
        },
        resonanz: {
            R1: Math.round(R1 * 100) / 100,
            R2: Math.round(R2 * 100) / 100,
            R3: Math.round(R3 * 100) / 100,
            R4: Math.round(R4 * 100) / 100,
            GFK: Math.round(GFK * 100) / 100,
            M: M,
            B: Math.round(B * 100) / 100
        },
        scoreDetails: {
            O: Math.round(scoreO * 10) / 10,
            A: Math.round(scoreA * 10) / 10,
            D: Math.round(scoreD * 10) / 10,
            G: Math.round(scoreG * 10) / 10
        },
        gewichtungen: {
            O: gew.O,
            A: gew.A,
            D: gew.D,
            G: gew.G
        },
        logos: logos,
        pathos: pathos,
        extras: extrasDetails ? {
            modifier: extrasModifier,
            description: extrasDetails.description,
            details: extrasDetails.details
        } : null
    };

    // SSOT-Vergleich im Hintergrund (wenn aktiviert)
    if (typeof SSOTComparison !== 'undefined' && SSOTComparison.isEnabled()) {
        SSOTComparison.compare(result, person1, person2, options).catch(function(e) {
            console.warn('[SSOT] Vergleich fehlgeschlagen:', e.message);
        });
    }

    return result;
}

// Calculate overall with 4-factor model + category details for UI
// SSOT v3.10: R-Faktoren werden IMMER aus person.needs berechnet
function calculateOverallWithModifiers(person1, person2, pathosCheck, logosCheck, options) {
    // Use new 4-factor model for overall score
    const qualityResult = calculateRelationshipQuality(person1, person2, options);

    // Calculate category scores for UI display (radar chart, category bars)
    const categories = {};

    // Category A: Philosophy score from matrix
    categories.A = { score: logosCheck.score, modifier: 0, note: "Rein archetyp-basiert" };

    // Other categories with modifiers (for UI display)
    for (const cat of ['B', 'C', 'D', 'E', 'F']) {
        const result = calculateCategoryWithModifiers(cat, person1, person2, pathosCheck);
        categories[cat] = result;
    }

    return {
        overall: qualityResult.score,  // NEW: 4-factor score
        categories,                     // Keep for UI
        breakdown: qualityResult.breakdown  // NEW: factor breakdown
    };
}

// Get modifier summary for UI
function getModifierSummary(person1, person2) {
    const summaries = [];
    const domMod = getDominanzModifier(person1.dominanz, person2.dominanz);
    if (domMod !== 0) {
        summaries.push({
            type: "Dominanz",
            modifier: domMod,
            description: getDominanzDescription(person1.dominanz, person2.dominanz, domMod)
        });
    }
    return summaries;
}


// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════════════════════
window.getProfileFromStore            = getProfileFromStore;
window.estimateProfilMatch            = estimateProfilMatch;
window.areAttributesCompatible        = areAttributesCompatible;
window.calculateLogosPathosBalance    = calculateLogosPathosBalance;
window.calculateResonanz              = calculateResonanz;
window.calculateKSubfaktor            = calculateKSubfaktor;
window.calculateGfkFactor             = calculateGfkFactor;
window.calculateRFactorsFromNeeds     = calculateRFactorsFromNeeds;
window.calculateRelationshipQuality   = calculateRelationshipQuality;
window.calculateOverallWithModifiers  = calculateOverallWithModifiers;
window.getModifierSummary             = getModifierSummary;

})(); // end CalculationEngine IIFE
