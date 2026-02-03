/**
 * GESCHLECHT-EXTRAS MODIFIKATOR
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * Berechnet Kompatibilitäts-Modifikatoren basierend auf den Extras:
 * - Fit 💪 (körperlich aktiv, gesundheitsbewusst)
 * - Fucked up 🔥 (intensiv, chaotisch, emotional komplex)
 * - Horny 😈 (hohe Libido, sexuell offen)
 *
 * KOMBINATIONS-LOGIK:
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * MATCH (beide haben gleiche Eigenschaft):
 *   Fit + Fit         = +5  (gemeinsame Fitness-Werte)
 *   Fucked up + F.u.  = +3  (gegenseitiges Verständnis für Chaos)
 *   Horny + Horny     = +8  (matching Libido - wichtig!)
 *
 * MISMATCH (einer hat, anderer nicht):
 *   Fit vs. !Fit      = -2  (leichte Spannung bei Lifestyle)
 *   Fucked up vs. !   = -3  (Stabilität vs. Chaos Konflikt)
 *   Horny vs. !Horny  = -5  (Libido-Mismatch - kritisch!)
 *
 * SPEZIAL-KOMBINATIONEN:
 *   Fit + Horny (beide)     = +3 Bonus (energetisch & leidenschaftlich)
 *   Fucked up + Horny (beide) = +2 Bonus (intensive Verbindung)
 *   Alle 3 Match            = +5 Extra-Bonus (Seelenverwandte)
 *
 * @module TiageModifiers.Extras
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.Extras = TiageModifiers.Extras || {};

TiageModifiers.Extras.Modifier = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════
    // KONSTANTEN - Modifikator-Werte
    // ═══════════════════════════════════════════════════════════════════════

    const MATCH_BONUS = {
        fit: 5,        // Beide fit = gemeinsame Werte
        fuckedup: 3,   // Beide fucked up = Verständnis
        horny: 8       // Beide horny = wichtigster Match!
    };

    const MISMATCH_PENALTY = {
        fit: -2,       // Lifestyle-Unterschied
        fuckedup: -3,  // Stabilität vs. Chaos
        horny: -5      // Libido-Mismatch (kritisch)
    };

    const COMBO_BONUS = {
        fit_horny: 3,           // Fit + Horny bei beiden
        fuckedup_horny: 2,      // Fucked up + Horny bei beiden
        all_three: 5            // Alle 3 matchen = Seelenverwandte
    };

    // ═══════════════════════════════════════════════════════════════════════
    // HAUPTBERECHNUNG
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Berechnet den Gesamt-Modifikator für Geschlecht-Extras
     *
     * @param {Object} extras1 - { fit: bool, fuckedup: bool, horny: bool }
     * @param {Object} extras2 - { fit: bool, fuckedup: bool, horny: bool }
     * @returns {Object} { modifier: number, details: Array, description: string }
     */
    function calculate(extras1, extras2) {
        // Defaults wenn keine Extras gesetzt
        const e1 = extras1 || { fit: false, fuckedup: false, horny: false };
        const e2 = extras2 || { fit: false, fuckedup: false, horny: false };

        let totalModifier = 0;
        const details = [];

        // ─────────────────────────────────────────────────────────────────
        // 1. EINZELNE EIGENSCHAFTEN prüfen (Match/Mismatch)
        // ─────────────────────────────────────────────────────────────────

        // FIT
        if (e1.fit && e2.fit) {
            totalModifier += MATCH_BONUS.fit;
            details.push({ type: 'match', prop: 'fit', value: MATCH_BONUS.fit, text: 'Beide Fit 💪' });
        } else if (e1.fit !== e2.fit) {
            totalModifier += MISMATCH_PENALTY.fit;
            details.push({ type: 'mismatch', prop: 'fit', value: MISMATCH_PENALTY.fit, text: 'Fit-Unterschied' });
        }

        // FUCKED UP
        if (e1.fuckedup && e2.fuckedup) {
            totalModifier += MATCH_BONUS.fuckedup;
            details.push({ type: 'match', prop: 'fuckedup', value: MATCH_BONUS.fuckedup, text: 'Beide Fucked up 🔥' });
        } else if (e1.fuckedup !== e2.fuckedup) {
            totalModifier += MISMATCH_PENALTY.fuckedup;
            details.push({ type: 'mismatch', prop: 'fuckedup', value: MISMATCH_PENALTY.fuckedup, text: 'Chaos vs. Stabilität' });
        }

        // HORNY
        if (e1.horny && e2.horny) {
            totalModifier += MATCH_BONUS.horny;
            details.push({ type: 'match', prop: 'horny', value: MATCH_BONUS.horny, text: 'Beide Horny 😈' });
        } else if (e1.horny !== e2.horny) {
            totalModifier += MISMATCH_PENALTY.horny;
            details.push({ type: 'mismatch', prop: 'horny', value: MISMATCH_PENALTY.horny, text: 'Libido-Mismatch' });
        }

        // ─────────────────────────────────────────────────────────────────
        // 2. SPEZIAL-KOMBINATIONEN prüfen
        // ─────────────────────────────────────────────────────────────────

        // Fit + Horny bei beiden = energetisch & leidenschaftlich
        if (e1.fit && e1.horny && e2.fit && e2.horny) {
            totalModifier += COMBO_BONUS.fit_horny;
            details.push({ type: 'combo', value: COMBO_BONUS.fit_horny, text: 'Fit & Horny Synergie 🔥💪' });
        }

        // Fucked up + Horny bei beiden = intensive Verbindung
        if (e1.fuckedup && e1.horny && e2.fuckedup && e2.horny) {
            totalModifier += COMBO_BONUS.fuckedup_horny;
            details.push({ type: 'combo', value: COMBO_BONUS.fuckedup_horny, text: 'Intensive Verbindung 🔥😈' });
        }

        // Alle 3 matchen = Seelenverwandte
        if (e1.fit && e2.fit && e1.fuckedup && e2.fuckedup && e1.horny && e2.horny) {
            totalModifier += COMBO_BONUS.all_three;
            details.push({ type: 'combo', value: COMBO_BONUS.all_three, text: 'Seelenverwandte! 💪🔥😈' });
        }

        // ─────────────────────────────────────────────────────────────────
        // 3. BESCHREIBUNG generieren
        // ─────────────────────────────────────────────────────────────────

        let description = '';
        if (totalModifier > 10) {
            description = 'Starke Extra-Kompatibilität';
        } else if (totalModifier > 5) {
            description = 'Gute Extra-Kompatibilität';
        } else if (totalModifier > 0) {
            description = 'Leichte Extra-Harmonie';
        } else if (totalModifier === 0) {
            description = 'Neutral';
        } else if (totalModifier > -5) {
            description = 'Leichte Extra-Spannung';
        } else {
            description = 'Extra-Konflikte vorhanden';
        }

        return {
            modifier: totalModifier,
            details: details,
            description: description,
            extras1: e1,
            extras2: e2
        };
    }

    /**
     * Berechnet alle 64 möglichen Kombinationen (für Debug/Analyse)
     * @returns {Array} Alle Kombinationen mit ihren Modifikatoren
     */
    function calculateAllCombinations() {
        const results = [];
        const options = [
            { fit: false, fuckedup: false, horny: false },
            { fit: true, fuckedup: false, horny: false },
            { fit: false, fuckedup: true, horny: false },
            { fit: false, fuckedup: false, horny: true },
            { fit: true, fuckedup: true, horny: false },
            { fit: true, fuckedup: false, horny: true },
            { fit: false, fuckedup: true, horny: true },
            { fit: true, fuckedup: true, horny: true }
        ];

        for (const e1 of options) {
            for (const e2 of options) {
                const result = calculate(e1, e2);
                results.push({
                    ich: formatExtras(e1),
                    partner: formatExtras(e2),
                    modifier: result.modifier,
                    description: result.description
                });
            }
        }

        // Sortiere nach Modifier (beste zuerst)
        results.sort((a, b) => b.modifier - a.modifier);
        return results;
    }

    /**
     * Formatiert Extras für Anzeige
     */
    function formatExtras(extras) {
        const parts = [];
        if (extras.fit) parts.push('Fit');
        if (extras.fuckedup) parts.push('F.up');
        if (extras.horny) parts.push('Horny');
        return parts.length > 0 ? parts.join('+') : '(keine)';
    }

    /**
     * Debug: Gibt alle Kombinationen in der Konsole aus
     */
    function printCombinationTable() {
        const combos = calculateAllCombinations();
        console.log('═══════════════════════════════════════════════════════════════');
        console.log('GESCHLECHT-EXTRAS KOMBINATIONS-TABELLE');
        console.log('═══════════════════════════════════════════════════════════════');
        console.table(combos);
        console.log('Beste Kombination:', combos[0]);
        console.log('Schlechteste Kombination:', combos[combos.length - 1]);
    }

    // ═══════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════

    return {
        // Konstanten
        MATCH_BONUS: MATCH_BONUS,
        MISMATCH_PENALTY: MISMATCH_PENALTY,
        COMBO_BONUS: COMBO_BONUS,

        // Funktionen
        calculate: calculate,
        calculateAllCombinations: calculateAllCombinations,
        formatExtras: formatExtras,
        printCombinationTable: printCombinationTable
    };

})();

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════

// Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.Extras.Modifier;
}

// Browser
if (typeof window !== 'undefined') {
    window.TiageExtrasModifier = TiageModifiers.Extras.Modifier;
}
