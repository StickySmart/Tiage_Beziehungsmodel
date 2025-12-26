/**
 * HAUPTFRAGE-AGGREGATION
 * ══════════════════════════════════════════════════════════════════════════════
 *
 * Berechnet aggregierte Werte für Hauptfragen basierend auf deren Nuancen.
 *
 * WICHTIG: Diese Logik ist NUR für UI-Anzeige gedacht.
 * Die Ti-Age Synthese und das SSOT bleiben unverändert.
 *
 * Verwendung:
 *   const aggregated = HauptfrageAggregation.aggregateAllHauptfragen(profile.needs);
 *   const simple = HauptfrageAggregation.getAggregatedNeedsSimple(profile.needs);
 *   const comparison = HauptfrageAggregation.compareHauptfragen(needs1, needs2);
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

const HauptfrageAggregation = (function() {
    'use strict';

    // ═══════════════════════════════════════════════════════════════════════════
    // KONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════════

    const CONFIG = {
        // Aggregationsmethode: 'average' | 'weighted' | 'median'
        method: 'average',

        // Default-Wert wenn Nuance nicht beantwortet (null = ignorieren)
        defaultNuanceValue: null,

        // Minimum Nuancen für valide Aggregation (%)
        minNuancenAnsweredPercent: 50
    };

    // ═══════════════════════════════════════════════════════════════════════════
    // CACHE
    // ═══════════════════════════════════════════════════════════════════════════

    let hauptfragenCache = null;

    // ═══════════════════════════════════════════════════════════════════════════
    // HAUPTFRAGEN EXTRAHIEREN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Extrahiert alle Hauptfragen aus dem Bedürfnis-Katalog
     * @returns {Object} Map von hauptfrageId → { id, label, nuancen[], kategorie, ... }
     */
    function getHauptfragen() {
        if (hauptfragenCache) return hauptfragenCache;

        // SSOT: BeduerfnisKatalog oder BeduerfnisIds
        const katalog = window.BeduerfnisKatalog?.beduerfnisse
            || (typeof BeduerfnisIds !== 'undefined' ? BeduerfnisIds.beduerfnisse : null)
            || {};

        hauptfragenCache = {};

        for (const [id, beduerfnis] of Object.entries(katalog)) {
            if (beduerfnis.frageTyp === 'haupt') {
                hauptfragenCache[id] = {
                    id: id,
                    label: beduerfnis.label,
                    frage: beduerfnis.frage,
                    kategorie: beduerfnis.kategorie,
                    dimension: beduerfnis.dimension,
                    nuancen: beduerfnis.nuancen || [],
                    nuancenCount: (beduerfnis.nuancen || []).length
                };
            }
        }

        console.log(`[HauptfrageAggregation] ${Object.keys(hauptfragenCache).length} Hauptfragen geladen`);
        return hauptfragenCache;
    }

    /**
     * Gibt die Anzahl der Hauptfragen zurück
     * @returns {number}
     */
    function getHauptfragenCount() {
        return Object.keys(getHauptfragen()).length;
    }

    /**
     * Prüft ob eine Bedürfnis-ID eine Hauptfrage ist
     * @param {string} beduerfnisId - z.B. "#B1"
     * @returns {boolean}
     */
    function isHauptfrage(beduerfnisId) {
        return getHauptfragen().hasOwnProperty(beduerfnisId);
    }

    /**
     * Holt die Hauptfrage zu einer Nuance
     * @param {string} nuanceId - z.B. "#B2"
     * @returns {Object|null} Die Hauptfrage oder null
     */
    function getHauptfrageForNuance(nuanceId) {
        const katalog = window.BeduerfnisKatalog?.beduerfnisse
            || (typeof BeduerfnisIds !== 'undefined' ? BeduerfnisIds.beduerfnisse : null)
            || {};

        const nuance = katalog[nuanceId];
        if (!nuance || !nuance.hauptbeduerfnis) return null;

        return getHauptfragen()[nuance.hauptbeduerfnis] || null;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // AGGREGATION - EINZELNE HAUPTFRAGE
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Berechnet den aggregierten Wert einer Hauptfrage aus ihren Nuancen
     *
     * @param {string} hauptfrageId - z.B. "#B1"
     * @param {Object} profileNeeds - Das needs-Objekt eines Profils { "#B2": 75, "#B3": 80, ... }
     * @returns {Object} { value, nuancenUsed, nuancenTotal, isValid, details }
     */
    function aggregateHauptfrage(hauptfrageId, profileNeeds) {
        const hauptfragen = getHauptfragen();
        const hauptfrage = hauptfragen[hauptfrageId];

        if (!hauptfrage) {
            return { value: null, isValid: false, reason: 'hauptfrage_nicht_gefunden' };
        }

        if (!profileNeeds) {
            return { value: null, isValid: false, reason: 'keine_profile_needs' };
        }

        const nuancenIds = hauptfrage.nuancen;

        // Keine Nuancen → direkt den Hauptfrage-Wert nutzen (falls vorhanden)
        if (!nuancenIds || nuancenIds.length === 0) {
            const directValue = profileNeeds[hauptfrageId];
            return {
                value: directValue ?? null,
                nuancenUsed: 0,
                nuancenTotal: 0,
                isValid: directValue !== undefined,
                isDirect: true,
                reason: 'keine_nuancen_definiert'
            };
        }

        // Nuancen-Werte sammeln
        const nuancenValues = [];
        const details = [];

        for (const nuanceId of nuancenIds) {
            const value = profileNeeds[nuanceId];

            if (value !== undefined && value !== null) {
                nuancenValues.push(value);
                details.push({ id: nuanceId, value: value, used: true });
            } else if (CONFIG.defaultNuanceValue !== null) {
                nuancenValues.push(CONFIG.defaultNuanceValue);
                details.push({ id: nuanceId, value: CONFIG.defaultNuanceValue, used: true, isDefault: true });
            } else {
                details.push({ id: nuanceId, value: null, used: false });
            }
        }

        // Validitätsprüfung
        const answeredPercent = (nuancenValues.length / nuancenIds.length) * 100;
        const isValid = answeredPercent >= CONFIG.minNuancenAnsweredPercent;

        if (nuancenValues.length === 0) {
            return {
                value: null,
                nuancenUsed: 0,
                nuancenTotal: nuancenIds.length,
                isValid: false,
                reason: 'keine_nuancen_beantwortet',
                details
            };
        }

        // Aggregation durchführen
        let aggregatedValue;

        switch (CONFIG.method) {
            case 'median':
                aggregatedValue = calculateMedian(nuancenValues);
                break;
            case 'weighted':
                // Gewichtung: höhere Werte haben mehr Gewicht
                aggregatedValue = calculateWeightedAverage(nuancenValues);
                break;
            case 'average':
            default:
                aggregatedValue = calculateAverage(nuancenValues);
        }

        return {
            value: Math.round(aggregatedValue),
            nuancenUsed: nuancenValues.length,
            nuancenTotal: nuancenIds.length,
            answeredPercent: Math.round(answeredPercent),
            isValid,
            method: CONFIG.method,
            details
        };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // AGGREGATION - ALLE HAUPTFRAGEN
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Berechnet aggregierte Werte für ALLE Hauptfragen eines Profils
     *
     * @param {Object} profileNeeds - Das needs-Objekt eines Profils
     * @returns {Object} Map von hauptfrageId → aggregierter Wert mit Details
     */
    function aggregateAllHauptfragen(profileNeeds) {
        const hauptfragen = getHauptfragen();
        const results = {};

        for (const hauptfrageId of Object.keys(hauptfragen)) {
            const aggregation = aggregateHauptfrage(hauptfrageId, profileNeeds);
            results[hauptfrageId] = {
                ...hauptfragen[hauptfrageId],
                aggregatedValue: aggregation.value,
                aggregation: aggregation
            };
        }

        return results;
    }

    /**
     * Gibt ein vereinfachtes needs-Objekt zurück mit nur Hauptfragen-Werten
     *
     * @param {Object} profileNeeds - Das vollständige needs-Objekt
     * @returns {Object} { "#B1": 78, "#B5": 65, ... } - nur Hauptfragen
     */
    function getAggregatedNeedsSimple(profileNeeds) {
        const aggregated = aggregateAllHauptfragen(profileNeeds);
        const simple = {};

        for (const [id, data] of Object.entries(aggregated)) {
            if (data.aggregatedValue !== null) {
                simple[id] = data.aggregatedValue;
            }
        }

        return simple;
    }

    /**
     * Gibt eine sortierte Liste aller Hauptfragen mit aggregierten Werten zurück
     *
     * @param {Object} profileNeeds - Das needs-Objekt eines Profils
     * @param {string} sortBy - 'value' | 'label' | 'kategorie' (default: 'value')
     * @param {boolean} descending - Absteigend sortieren (default: true)
     * @returns {Array} Sortierte Liste von Hauptfragen
     */
    function getAggregatedHauptfragenList(profileNeeds, sortBy = 'value', descending = true) {
        const aggregated = aggregateAllHauptfragen(profileNeeds);

        const list = Object.values(aggregated).filter(item => item.aggregatedValue !== null);

        list.sort((a, b) => {
            let comparison = 0;
            switch (sortBy) {
                case 'label':
                    comparison = a.label.localeCompare(b.label);
                    break;
                case 'kategorie':
                    comparison = (a.kategorie || '').localeCompare(b.kategorie || '');
                    break;
                case 'value':
                default:
                    comparison = (a.aggregatedValue || 0) - (b.aggregatedValue || 0);
            }
            return descending ? -comparison : comparison;
        });

        return list;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // VERGLEICH ZWEIER PROFILE (für Resonanz-Anzeige)
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Berechnet Hauptfragen-basierte Übereinstimmung zwischen zwei Profilen
     *
     * @param {Object} needs1 - Needs des ersten Profils
     * @param {Object} needs2 - Needs des zweiten Profils
     * @param {string} sortBy - 'differenz' | 'uebereinstimmung' | 'label' (default: 'differenz')
     * @returns {Array} Sortierte Liste von Hauptfragen mit Differenzen
     */
    function compareHauptfragen(needs1, needs2, sortBy = 'differenz') {
        const agg1 = aggregateAllHauptfragen(needs1);
        const agg2 = aggregateAllHauptfragen(needs2);

        const comparisons = [];

        for (const hauptfrageId of Object.keys(agg1)) {
            const val1 = agg1[hauptfrageId].aggregatedValue;
            const val2 = agg2[hauptfrageId]?.aggregatedValue;

            if (val1 !== null && val2 !== null) {
                const diff = Math.abs(val1 - val2);
                comparisons.push({
                    id: hauptfrageId,
                    label: agg1[hauptfrageId].label,
                    kategorie: agg1[hauptfrageId].kategorie,
                    frage: agg1[hauptfrageId].frage,
                    value1: val1,
                    value2: val2,
                    differenz: diff,
                    uebereinstimmung: 100 - diff,
                    nuancenCount: agg1[hauptfrageId].nuancenCount,
                    // Details für Drill-Down
                    nuancen1: agg1[hauptfrageId].aggregation.details,
                    nuancen2: agg2[hauptfrageId]?.aggregation.details
                });
            }
        }

        // Sortieren
        switch (sortBy) {
            case 'uebereinstimmung':
                comparisons.sort((a, b) => b.uebereinstimmung - a.uebereinstimmung);
                break;
            case 'label':
                comparisons.sort((a, b) => a.label.localeCompare(b.label));
                break;
            case 'differenz':
            default:
                comparisons.sort((a, b) => b.differenz - a.differenz);
        }

        return comparisons;
    }

    /**
     * Berechnet die Gesamt-Übereinstimmung basierend auf Hauptfragen
     *
     * @param {Object} needs1 - Needs des ersten Profils
     * @param {Object} needs2 - Needs des zweiten Profils
     * @returns {Object} { score, matchedCount, details }
     */
    function calculateOverallMatch(needs1, needs2) {
        const comparisons = compareHauptfragen(needs1, needs2);

        if (comparisons.length === 0) {
            return { score: null, matchedCount: 0, reason: 'keine_vergleichbaren_hauptfragen' };
        }

        const totalUebereinstimmung = comparisons.reduce((sum, c) => sum + c.uebereinstimmung, 0);
        const avgScore = Math.round(totalUebereinstimmung / comparisons.length);

        return {
            score: avgScore,
            matchedCount: comparisons.length,
            totalHauptfragen: getHauptfragenCount(),
            hoechsteDifferenzen: comparisons.slice(0, 5),
            besteUebereinstimmungen: [...comparisons].sort((a, b) => b.uebereinstimmung - a.uebereinstimmung).slice(0, 5)
        };
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // KATEGORIE-BASIERTE AGGREGATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Gruppiert Hauptfragen nach Kategorie und berechnet Kategorie-Durchschnitte
     *
     * @param {Object} profileNeeds - Das needs-Objekt eines Profils
     * @returns {Object} Map von kategorieId → { label, hauptfragen[], avgValue }
     */
    function aggregateByKategorie(profileNeeds) {
        const aggregated = aggregateAllHauptfragen(profileNeeds);
        const byKategorie = {};

        // Taxonomie für Kategorie-Labels
        const taxonomie = typeof TiageTaxonomie !== 'undefined' ? TiageTaxonomie : null;
        if (taxonomie) taxonomie.init();

        for (const [id, data] of Object.entries(aggregated)) {
            if (data.aggregatedValue === null) continue;

            const katId = data.kategorie;
            if (!katId) continue;

            if (!byKategorie[katId]) {
                const katInfo = taxonomie?.getKategorie(katId);
                byKategorie[katId] = {
                    id: katId,
                    label: katInfo?.label || katId,
                    color: katInfo?.color,
                    hauptfragen: [],
                    values: []
                };
            }

            byKategorie[katId].hauptfragen.push(data);
            byKategorie[katId].values.push(data.aggregatedValue);
        }

        // Durchschnitte berechnen
        for (const kat of Object.values(byKategorie)) {
            kat.avgValue = Math.round(calculateAverage(kat.values));
            kat.count = kat.hauptfragen.length;
        }

        return byKategorie;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // HILFSFUNKTIONEN
    // ═══════════════════════════════════════════════════════════════════════════

    function calculateAverage(values) {
        if (!values || values.length === 0) return 0;
        return values.reduce((sum, v) => sum + v, 0) / values.length;
    }

    function calculateMedian(values) {
        if (!values || values.length === 0) return 0;
        const sorted = [...values].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return sorted.length % 2 !== 0
            ? sorted[mid]
            : (sorted[mid - 1] + sorted[mid]) / 2;
    }

    function calculateWeightedAverage(values) {
        if (!values || values.length === 0) return 0;
        // Werte über 50 bekommen mehr Gewicht (wichtiger für den User)
        const weightedSum = values.reduce((sum, v) => sum + v * (v / 100), 0);
        const totalWeight = values.reduce((sum, v) => sum + (v / 100), 0);
        return totalWeight > 0 ? weightedSum / totalWeight : calculateAverage(values);
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // KONFIGURATION
    // ═══════════════════════════════════════════════════════════════════════════

    /**
     * Konfiguration anpassen
     * @param {Object} newConfig - { method, defaultNuanceValue, minNuancenAnsweredPercent }
     */
    function setConfig(newConfig) {
        Object.assign(CONFIG, newConfig);
    }

    /**
     * Aktuelle Konfiguration abrufen
     * @returns {Object}
     */
    function getConfig() {
        return { ...CONFIG };
    }

    /**
     * Cache leeren (z.B. bei Katalog-Update)
     */
    function clearCache() {
        hauptfragenCache = null;
    }

    // ═══════════════════════════════════════════════════════════════════════════
    // PUBLIC API
    // ═══════════════════════════════════════════════════════════════════════════

    return {
        // Hauptfragen abrufen
        getHauptfragen,
        getHauptfragenCount,
        isHauptfrage,
        getHauptfrageForNuance,

        // Aggregation - Einzeln
        aggregateHauptfrage,

        // Aggregation - Alle
        aggregateAllHauptfragen,
        getAggregatedNeedsSimple,
        getAggregatedHauptfragenList,

        // Vergleich zweier Profile
        compareHauptfragen,
        calculateOverallMatch,

        // Kategorie-basiert
        aggregateByKategorie,

        // Konfiguration
        setConfig,
        getConfig,
        clearCache
    };

})();

// Export für Module-System
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HauptfrageAggregation;
}
