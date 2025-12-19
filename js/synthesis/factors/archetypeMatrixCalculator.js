/**
 * ARCHETYP-MATRIX CALCULATOR
 *
 * Berechnet die Archetyp-zu-Archetyp Kompatibilitätsmatrix DYNAMISCH
 * aus den tatsächlichen Bedürfnis-Profilen (220 Bedürfnisse je Archetyp).
 *
 * ERSETZT: Hardcodierte _fallbackMatrix Werte
 *
 * QUELLE: Jeder Archetyp hat ein vollständiges Bedürfnis-Profil mit 220 Werten
 *         (siehe profiles/archetypen/*.js)
 *
 * BERECHNUNG: Nutzt dieselbe Formel wie calculateNeedsMatch() in profile-store.js:
 *   - Für jedes Bedürfnis: Ähnlichkeit = 100 - |Wert1 - Wert2|
 *   - Gewicht = (Wert1 + Wert2) / 2 / 100
 *   - Beitrag = Ähnlichkeit × Gewicht
 *   - Gesamt-Score = Σ(Beitrag) / Σ(Gewicht)
 *
 * VORTEILE:
 * ✅ Basiert auf tatsächlichen Bedürfnis-Profilen, nicht auf Schätzungen
 * ✅ Konsistent mit der individuellen Bedürfnis-Übereinstimmung (220-Werte)
 * ✅ Automatisch aktualisiert wenn Archetyp-Profile angepasst werden
 * ✅ Transparent und nachvollziehbar
 *
 * DATUM: 2025-12-16
 * AUTOR: Claude (based on user request)
 */

var TiageSynthesis = TiageSynthesis || {};
TiageSynthesis.ArchetypeMatrixCalculator = (function() {
    'use strict';

    /**
     * Berechnet die Ähnlichkeit zwischen zwei Archetyp-Profilen
     * Nutzt dieselbe Formel wie profile-store.js calculateNeedsMatch()
     *
     * @param {Object} needs1 - Bedürfnisse von Archetyp 1 (z.B. { '#B1': 50, '#B2': 75, ... })
     * @param {Object} needs2 - Bedürfnisse von Archetyp 2
     * @returns {number} Score 0-100
     */
    function calculateArchetypeMatch(needs1, needs2) {
        if (!needs1 || !needs2) {
            console.warn('[ArchetypeMatrixCalculator] Fehlende Bedürfnisse für Berechnung');
            return 50;
        }

        var summeUebereinstimmung = 0;
        var summeGewicht = 0;
        var beduerfnisCount = 0;

        // Iteriere durch alle Bedürfnisse (verwende needs1 als Referenz)
        for (var needId in needs1) {
            if (!needs1.hasOwnProperty(needId)) continue;

            var wert1 = needs1[needId];
            var wert2 = needs2[needId];

            // Falls Bedürfnis in needs2 fehlt, überspringe
            if (wert2 === undefined || wert2 === null) {
                continue;
            }

            // Gewicht: Durchschnitt beider Werte (0-100 Skala, normiert auf 0-1)
            var gewicht = (wert1 + wert2) / 2;

            // Ähnlichkeit: 100 - absolute Differenz
            var diff = Math.abs(wert1 - wert2);
            var aehnlichkeit = 100 - diff;

            // Gewichteter Beitrag
            summeUebereinstimmung += aehnlichkeit * gewicht;
            summeGewicht += gewicht;
            beduerfnisCount++;
        }

        // Verhindere Division durch 0
        if (summeGewicht === 0) {
            console.warn('[ArchetypeMatrixCalculator] Keine gewichteten Bedürfnisse gefunden');
            return 50;
        }

        // Berechne gewichteten Durchschnitt
        var score = summeUebereinstimmung / summeGewicht;

        // Runde auf ganze Zahl
        score = Math.round(score);

        console.log('[ArchetypeMatrixCalculator] Berechnung abgeschlossen:', {
            beduerfnisCount: beduerfnisCount,
            score: score
        });

        return score;
    }

    /**
     * Generiert die vollständige 8x8 Archetyp-Kompatibilitätsmatrix
     *
     * @returns {Object} Matrix { 'single': { 'duo': 72, ... }, 'duo': { ... }, ... }
     */
    function generateArchetypeMatrix() {
        // Prüfe ob BaseArchetypProfile verfügbar ist
        if (typeof window.BaseArchetypProfile === 'undefined') {
            console.error('[ArchetypeMatrixCalculator] BaseArchetypProfile nicht geladen!');
            return null;
        }

        var archetypes = ['single', 'duo', 'duo_flex', 'ra', 'lat', 'aromantisch', 'solopoly', 'polyamor'];
        var matrix = {};

        console.log('[ArchetypeMatrixCalculator] Starte Matrix-Generierung für 8 Archetypen...');

        // Iteriere durch alle Archetyp-Paare
        for (var i = 0; i < archetypes.length; i++) {
            var archetype1 = archetypes[i];
            var profile1 = window.BaseArchetypProfile[archetype1];

            if (!profile1 || !profile1.umfrageWerte) {
                console.warn('[ArchetypeMatrixCalculator] Profil nicht gefunden:', archetype1);
                continue;
            }

            matrix[archetype1] = {};

            for (var j = 0; j < archetypes.length; j++) {
                var archetype2 = archetypes[j];
                var profile2 = window.BaseArchetypProfile[archetype2];

                if (!profile2 || !profile2.umfrageWerte) {
                    console.warn('[ArchetypeMatrixCalculator] Profil nicht gefunden:', archetype2);
                    continue;
                }

                // Berechne Kompatibilität zwischen den beiden Profilen
                var score = calculateArchetypeMatch(profile1.umfrageWerte, profile2.umfrageWerte);
                matrix[archetype1][archetype2] = score;

                console.log('[ArchetypeMatrixCalculator] ' + archetype1 + ' + ' + archetype2 + ' = ' + score);
            }
        }

        console.log('[ArchetypeMatrixCalculator] Matrix-Generierung abgeschlossen!');
        console.log('[ArchetypeMatrixCalculator] Generierte Matrix:', JSON.stringify(matrix, null, 2));

        return matrix;
    }

    /**
     * Initialisiert die Matrix und speichert sie für spätere Verwendung
     */
    function initialize() {
        console.log('[ArchetypeMatrixCalculator] Initialisierung...');

        // Warte bis BaseArchetypProfile geladen ist
        if (typeof window.BaseArchetypProfile === 'undefined') {
            console.log('[ArchetypeMatrixCalculator] Warte auf BaseArchetypProfile...');
            // Retry nach kurzer Verzögerung
            setTimeout(initialize, 100);
            return;
        }

        var matrix = generateArchetypeMatrix();

        if (matrix) {
            // Speichere die berechnete Matrix global für Zugriff durch archetypeFactor.js
            TiageSynthesis.ArchetypeMatrixCalculator._cachedMatrix = matrix;
            console.log('[ArchetypeMatrixCalculator] Matrix erfolgreich initialisiert und gecached');
        } else {
            console.error('[ArchetypeMatrixCalculator] Matrix-Initialisierung fehlgeschlagen');
        }
    }

    // Auto-Initialisierung bei DOM-Ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initialize, 200); // Verzögerung für BaseArchetypProfile
        });
    } else {
        setTimeout(initialize, 200);
    }

    // PUBLIC API
    return {
        calculateArchetypeMatch: calculateArchetypeMatch,
        generateArchetypeMatrix: generateArchetypeMatrix,
        initialize: initialize,
        _cachedMatrix: null
    };

})();
