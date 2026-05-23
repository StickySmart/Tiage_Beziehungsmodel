/**
 * RTI-SÄULEN MODIFIKATOR v2.0
 *
 * v2.0: Direkt auf 16 Volker-Bedürfnisse (#B1–#B16) umgestellt.
 * Kein Umweg mehr über K-Kategorien oder D-Dimensionen.
 *
 * Säulen → Bedürfnisse Mapping:
 *   S1 (Leiblichkeit)       → #B1  Wohlbefinden
 *   S2 (Soziales Netzwerk)  → #B9  Gemeinschaft, #B10 Anerkennung
 *   S3 (Autonomie)          → #B5  Wirksamkeit,  #B6  Freiheit
 *   S4 (Sicherheit)         → #B2  Sicherheit,   #B4  Orientierung
 *   S5 (Werte & Sinn)       → #B14 Sinn,         #B15 Integrität, #B16 Selbstentfaltung
 *
 * Prioritäten:
 *   0 (niedrig)  → -5 delta
 *   1 (normal)   →  0 delta
 *   2 (hoch)     → +10 delta
 *
 * @module TiageModifiers.RTI
 */

var TiageModifiers = TiageModifiers || {};
TiageModifiers.RTI = TiageModifiers.RTI || {};

TiageModifiers.RTI.Modifier = {

    id: "rti-priority",
    label: "RTI-Säulen Prioritäten",
    category: "rti",

    // ═══════════════════════════════════════════════════════════════════════
    // SÄULEN → BEDÜRFNISSE MAPPING (direkt, v2.0)
    // ═══════════════════════════════════════════════════════════════════════

    saeulenToBeduerfnisse: {
        'S1': ['#B1'],                    // Leiblichkeit → Wohlbefinden
        'S2': ['#B9', '#B10'],            // Soziales → Gemeinschaft, Anerkennung
        'S3': ['#B5', '#B6'],             // Autonomie → Wirksamkeit, Freiheit
        'S4': ['#B2', '#B4'],             // Sicherheit → Sicherheit, Orientierung
        'S5': ['#B14', '#B15', '#B16']    // Werte & Sinn → Sinn, Integrität, Selbstentfaltung
    },

    // Prioritäts-Deltas
    priorityDeltas: {
        0: -5,   // Niedrig — Bedürfnis wird abgeschwächt
        1:  0,   // Normal — kein Effekt
        2: +10   // Hoch — Bedürfnis wird verstärkt
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MODIFIKATOR-BERECHNUNG
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Berechnet den RTI-Modifikator für ein einzelnes Bedürfnis.
     *
     * @param {string} needId        — Die Bedürfnis-ID (z.B. '#B5')
     * @param {Object} rtiPriorities — Säulen-Prioritäten {S1: 0-2, S2: 0-2, ...}
     * @returns {number}             — Modifikator (-5 bis +10)
     */
    calculateModifier: function(needId, rtiPriorities) {
        if (!needId || !rtiPriorities) return 0;

        var totalModifier = 0;
        var matchCount    = 0;

        for (var sKey in this.saeulenToBeduerfnisse) {
            var beduerfnisse = this.saeulenToBeduerfnisse[sKey];
            if (beduerfnisse.indexOf(needId) === -1) continue;

            var priority = rtiPriorities[sKey];
            if (priority === undefined) priority = 1;

            var delta = this.priorityDeltas[priority];
            if (delta === undefined) delta = 0;

            totalModifier += delta;
            matchCount++;
        }

        // Bei mehreren Säulen-Zuordnungen: Durchschnitt
        return matchCount > 1 ? Math.round(totalModifier / matchCount) : totalModifier;
    },

    /**
     * Wendet RTI-Modifikatoren auf alle Bedürfnisse an.
     *
     * @param {Object} flatNeeds     — {needId: value, ...}
     * @param {Object} rtiPriorities — {S1: 0-2, S2: 0-2, ...}
     * @returns {Object}             — Modifizierte flatNeeds
     */
    applyToAllNeeds: function(flatNeeds, rtiPriorities) {
        if (!flatNeeds || !rtiPriorities) return flatNeeds;

        var self = this;
        var modifiedNeeds = {};

        for (var needId in flatNeeds) {
            var baseValue = flatNeeds[needId];
            var modifier  = self.calculateModifier(needId, rtiPriorities);
            modifiedNeeds[needId] = Math.max(0, Math.min(100, baseValue + modifier));
        }

        return modifiedNeeds;
    },

    /**
     * Gibt alle Bedürfnis-IDs zurück, die einer Säule zugeordnet sind.
     *
     * @param {string} saeule — z.B. 'S3'
     * @returns {string[]}
     */
    getBeduerfnisseForSaeule: function(saeule) {
        return this.saeulenToBeduerfnisse[saeule] || [];
    },

    /**
     * Gibt alle Säulen zurück, denen ein Bedürfnis zugeordnet ist.
     *
     * @param {string} needId — z.B. '#B6'
     * @returns {string[]}
     */
    getSaeulenForBeduerfnis: function(needId) {
        var result = [];
        for (var sKey in this.saeulenToBeduerfnisse) {
            if (this.saeulenToBeduerfnisse[sKey].indexOf(needId) !== -1) {
                result.push(sKey);
            }
        }
        return result;
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════

if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.RTI.Modifier;
}
if (typeof window !== 'undefined') {
    window.TiageRtiModifier = TiageModifiers.RTI.Modifier;
}
