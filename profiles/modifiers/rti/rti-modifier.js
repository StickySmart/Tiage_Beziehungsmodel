/**
 * RTI-SÄULEN MODIFIKATOR
 *
 * Modifiziert Bedürfnisse basierend auf den 5 RTI-Säulen-Prioritäten.
 * Integriert sich in die Berechnung ähnlich wie GOD-Modifikatoren.
 *
 * Säulen → Dimensionen Mapping:
 *   S1 (Leiblichkeit)     = D3 (C) × 1.0
 *   S2 (Soziales Netzwerk)= D1 (A) × 0.6 + D6 (F) × 0.4
 *   S3 (Autonomie)        = D4 (D) × 1.0
 *   S4 (Sicherheit)       = D1 (A) × 0.4 + D6 (F) × 0.6
 *   S5 (Werte & Sinn)     = D2 (B) × 0.4 + D5 (E) × 0.6
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
    // DIMENSION → SÄULEN MAPPING (umgekehrt)
    // Zeigt für jede Dimension, zu welchen Säulen sie beiträgt
    // ═══════════════════════════════════════════════════════════════════════

    dimensionToSaeulen: {
        '#D1': { S2: 0.6, S4: 0.4 },  // A: Beziehungsphilosophie
        '#D2': { S5: 0.4 },            // B: Werte-Alignment
        '#D3': { S1: 1.0 },            // C: Nähe-Distanz
        '#D4': { S3: 1.0 },            // D: Autonomie
        '#D5': { S5: 0.6 },            // E: Kommunikation
        '#D6': { S2: 0.4, S4: 0.6 }   // F: Soziale-Kompatibilität
    },

    // Kurzform-Mapping für einfacheren Zugriff
    kurzformToDimension: {
        'A': '#D1', 'B': '#D2', 'C': '#D3',
        'D': '#D4', 'E': '#D5', 'F': '#D6'
    },

    // ═══════════════════════════════════════════════════════════════════════
    // MODIFIKATOR-BERECHNUNG
    // ═══════════════════════════════════════════════════════════════════════

    /**
     * Berechnet den RTI-Modifikator für ein Bedürfnis
     *
     * @param {string} needId - Die Bedürfnis-ID (z.B. '#B34')
     * @param {Object} rtiPriorities - Die Säulen-Prioritäten {S1: 0-2, S2: 0-2, ...}
     * @returns {number} - Der Modifikator (-10 bis +20)
     */
    calculateModifier: function(needId, rtiPriorities) {
        if (!needId || !rtiPriorities) return 0;

        // Hole Kategorie und Dimension für das Bedürfnis
        var def = null;
        if (typeof TiageBeduerfnisse !== 'undefined' && TiageBeduerfnisse.getDefinition) {
            def = TiageBeduerfnisse.getDefinition(needId);
        } else if (typeof BeduerfnisIds !== 'undefined' && BeduerfnisIds.beduerfnisse) {
            def = BeduerfnisIds.beduerfnisse[needId];
        }

        if (!def || !def.kategorie) return 0;

        // Hole Dimension für die Kategorie
        var dimensionId = null;
        if (typeof TiageTaxonomie !== 'undefined') {
            var kat = TiageTaxonomie.getKategorie(def.kategorie);
            if (kat) dimensionId = kat.dimension;
        }

        if (!dimensionId) return 0;

        // Hole Säulen-Gewichte für diese Dimension
        var saeulenGewichte = this.dimensionToSaeulen[dimensionId];
        if (!saeulenGewichte) return 0;

        // Berechne gewichteten Modifikator
        var totalModifier = 0;
        var totalWeight = 0;

        for (var sKey in saeulenGewichte) {
            var dimWeight = saeulenGewichte[sKey]; // Wie stark diese Dimension zur Säule beiträgt
            var priority = rtiPriorities[sKey];    // User-Priorität (0, 1, 2)

            if (priority === undefined) priority = 1; // Default: Normal

            // Modifikator-Logik:
            // Priority 0: -5 (Bedürfnis wird abgeschwächt)
            // Priority 1: 0 (kein Effekt)
            // Priority 2: +10 (Bedürfnis wird verstärkt)
            var priorityModifier = 0;
            if (priority === 0) {
                priorityModifier = -5;
            } else if (priority === 2) {
                priorityModifier = 10;
            }

            totalModifier += priorityModifier * dimWeight;
            totalWeight += dimWeight;
        }

        // Normalisiere wenn mehrere Säulen beteiligt sind
        if (totalWeight > 0 && totalWeight !== 1) {
            totalModifier = totalModifier / totalWeight;
        }

        return Math.round(totalModifier);
    },

    /**
     * Wendet RTI-Modifikatoren auf alle Bedürfnisse an
     *
     * @param {Object} flatNeeds - Object mit {needId: value, ...}
     * @param {Object} rtiPriorities - Die Säulen-Prioritäten {S1: 0-2, ...}
     * @returns {Object} - Modifizierte flatNeeds
     */
    applyToAllNeeds: function(flatNeeds, rtiPriorities) {
        if (!flatNeeds || !rtiPriorities) return flatNeeds;

        var self = this;
        var modifiedNeeds = {};

        for (var needId in flatNeeds) {
            var baseValue = flatNeeds[needId];
            var modifier = self.calculateModifier(needId, rtiPriorities);

            // Wert anpassen (0-100 Bereich halten)
            var newValue = Math.max(0, Math.min(100, baseValue + modifier));
            modifiedNeeds[needId] = newValue;
        }

        return modifiedNeeds;
    },

    /**
     * Gibt Debug-Info für ein Bedürfnis zurück
     */
    getDebugInfo: function(needId, rtiPriorities) {
        var def = null;
        if (typeof TiageBeduerfnisse !== 'undefined' && TiageBeduerfnisse.getDefinition) {
            def = TiageBeduerfnisse.getDefinition(needId);
        }

        var dimensionId = null;
        if (def && def.kategorie && typeof TiageTaxonomie !== 'undefined') {
            var kat = TiageTaxonomie.getKategorie(def.kategorie);
            if (kat) dimensionId = kat.dimension;
        }

        var saeulenGewichte = dimensionId ? this.dimensionToSaeulen[dimensionId] : null;
        var modifier = this.calculateModifier(needId, rtiPriorities);

        return {
            needId: needId,
            label: def ? def.label : 'Unknown',
            kategorie: def ? def.kategorie : null,
            dimension: dimensionId,
            saeulenGewichte: saeulenGewichte,
            rtiPriorities: rtiPriorities,
            modifier: modifier
        };
    }
};

// ═══════════════════════════════════════════════════════════════════════════
// EXPORT
// ═══════════════════════════════════════════════════════════════════════════

// Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageModifiers.RTI.Modifier;
}

// Browser
if (typeof window !== 'undefined') {
    window.TiageRtiModifier = TiageModifiers.RTI.Modifier;
}
