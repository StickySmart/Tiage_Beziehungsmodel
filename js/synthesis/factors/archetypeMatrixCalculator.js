/**
 * ARCHETYP-MATRIX CALCULATOR - SINGLE SOURCE OF TRUTH (SSOT)
 *
 * Berechnet die Archetyp-zu-Archetyp Kompatibilitätsmatrix DYNAMISCH
 * aus den tatsächlichen Bedürfnis-Profilen (220 Bedürfnisse je Archetyp).
 *
 * ═══════════════════════════════════════════════════════════════════════════
 * SSOT: KEINE FALLBACK-MATRIZEN - NUR LIVE-BERECHNUNG!
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * QUELLE: Jeder Archetyp hat ein vollständiges Bedürfnis-Profil mit 220 Werten
 *         (siehe profiles/archetypen/*.js)
 *
 * BERECHNUNG:
 *   - Für jedes Bedürfnis: Ähnlichkeit = 100 - |Wert1 - Wert2|
 *   - Gewicht = (Wert1 + Wert2) / 2
 *   - Gesamt-Score = Σ(Ähnlichkeit × Gewicht) / Σ(Gewicht)
 *
 * API:
 *   - getScore(type1, type2): Gibt Score zurück (berechnet live wenn nötig)
 *   - onReady(callback): Callback wenn Matrix bereit ist
 *   - isReady(): Boolean ob Matrix initialisiert ist
 *   - recalculate(): Neu berechnen wenn Bedürfnisse geändert wurden
 *
 * EVENTS:
 *   - 'archetype-matrix-ready': Gefeuert wenn Matrix initialisiert ist
 *   - 'archetype-matrix-updated': Gefeuert wenn Matrix neu berechnet wurde
 *
 * DATUM: 2025-12-23
 */

var TiageSynthesis = TiageSynthesis || {};
TiageSynthesis.ArchetypeMatrixCalculator = (function() {
    'use strict';

    // Status-Tracking
    var _isReady = false;
    var _readyCallbacks = [];

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
        if (typeof window.BaseArchetypProfile === 'undefined' ||
            Object.keys(window.BaseArchetypProfile).length < 8) {
            console.log('[ArchetypeMatrixCalculator] Warte auf BaseArchetypProfile...');
            // Retry nach kurzer Verzögerung
            setTimeout(initialize, 100);
            return;
        }

        var matrix = generateArchetypeMatrix();

        if (matrix) {
            // Speichere die berechnete Matrix
            TiageSynthesis.ArchetypeMatrixCalculator._cachedMatrix = matrix;
            _isReady = true;
            console.log('[ArchetypeMatrixCalculator] Matrix erfolgreich initialisiert und gecached');

            // Rufe alle wartenden Callbacks auf
            _readyCallbacks.forEach(function(cb) {
                try { cb(matrix); } catch (e) { console.error('[ArchetypeMatrixCalculator] Callback Error:', e); }
            });
            _readyCallbacks = [];

            // Feuere Event
            window.dispatchEvent(new CustomEvent('archetype-matrix-ready', { detail: { matrix: matrix } }));
        } else {
            console.error('[ArchetypeMatrixCalculator] Matrix-Initialisierung fehlgeschlagen');
        }
    }

    /**
     * SSOT: Gibt Score für ein Archetyp-Paar zurück
     * Berechnet live wenn Matrix noch nicht gecached ist
     *
     * @param {string} type1 - Archetyp 1 (z.B. 'polyamor')
     * @param {string} type2 - Archetyp 2 (z.B. 'duo')
     * @returns {number} Score 0-100
     */
    function getScore(type1, type2) {
        // Normalisiere Archetyp-Namen
        type1 = normalizeArchetypeName(type1);
        type2 = normalizeArchetypeName(type2);

        // 1. Versuche aus Cache
        var cachedMatrix = TiageSynthesis.ArchetypeMatrixCalculator._cachedMatrix;
        if (cachedMatrix && cachedMatrix[type1] && typeof cachedMatrix[type1][type2] === 'number') {
            return cachedMatrix[type1][type2];
        }

        // 2. Live-Berechnung aus BaseArchetypProfile (SSOT)
        if (typeof window.BaseArchetypProfile !== 'undefined') {
            var profile1 = window.BaseArchetypProfile[type1];
            var profile2 = window.BaseArchetypProfile[type2];

            if (profile1 && profile1.umfrageWerte && profile2 && profile2.umfrageWerte) {
                var score = calculateArchetypeMatch(profile1.umfrageWerte, profile2.umfrageWerte);
                console.log('[ArchetypeMatrixCalculator] Live-Berechnung:', type1, '+', type2, '=', score);
                return score;
            }
        }

        // 3. Fallback nur wenn nichts geladen ist
        console.warn('[ArchetypeMatrixCalculator] Keine Daten verfügbar für:', type1, type2);
        return 50; // Neutraler Wert
    }

    /**
     * Normalisiert Archetyp-Namen (z.B. 'duo-flex' → 'duo_flex')
     */
    function normalizeArchetypeName(name) {
        if (!name) return '';
        return name.toLowerCase().replace(/-/g, '_');
    }

    /**
     * Registriert Callback für wenn Matrix bereit ist
     * Callback wird sofort aufgerufen wenn Matrix bereits bereit
     */
    function onReady(callback) {
        if (_isReady && TiageSynthesis.ArchetypeMatrixCalculator._cachedMatrix) {
            callback(TiageSynthesis.ArchetypeMatrixCalculator._cachedMatrix);
        } else {
            _readyCallbacks.push(callback);
        }
    }

    /**
     * Prüft ob Matrix bereit ist
     */
    function isReady() {
        return _isReady;
    }

    /**
     * Berechnet Matrix neu (z.B. nach Änderung von Bedürfnis-Profilen)
     */
    function recalculate() {
        console.log('[ArchetypeMatrixCalculator] Neuberechnung...');
        var matrix = generateArchetypeMatrix();

        if (matrix) {
            TiageSynthesis.ArchetypeMatrixCalculator._cachedMatrix = matrix;
            _isReady = true;
            console.log('[ArchetypeMatrixCalculator] Matrix neu berechnet');

            // Feuere Update-Event
            window.dispatchEvent(new CustomEvent('archetype-matrix-updated', { detail: { matrix: matrix } }));
        }

        return matrix;
    }

    // Auto-Initialisierung bei DOM-Ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(initialize, 100);
        });
    } else {
        setTimeout(initialize, 100);
    }

    // Lausche auf Profil-Änderungen um Matrix neu zu berechnen
    window.addEventListener('archetype-profile-updated', function() {
        console.log('[ArchetypeMatrixCalculator] Profil-Änderung erkannt, berechne neu...');
        recalculate();
    });

    // PUBLIC API
    return {
        // SSOT Hauptfunktion
        getScore: getScore,

        // Status
        isReady: isReady,
        onReady: onReady,

        // Verwaltung
        initialize: initialize,
        recalculate: recalculate,

        // Interne Funktionen (für Tests/Debug)
        calculateArchetypeMatch: calculateArchetypeMatch,
        generateArchetypeMatrix: generateArchetypeMatrix,

        // Cache (wird intern verwaltet)
        _cachedMatrix: null
    };

})();
