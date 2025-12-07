/**
 * TIAGE STATISTIK-UTILITIES
 *
 * Gaußsche Normalverteilung und Konfidenzintervall-Berechnungen
 *
 * Basiert auf der 80%-Regel:
 * > "In personality research, the 80% confidence interval is commonly used
 * >  to describe the 'typical' range for a given trait within a population subgroup."
 * > — McCrae & Costa (1997)
 */

var TiageStatistics = TiageStatistics || {};

/**
 * Z-Werte für verschiedene Konfidenz-Levels
 */
TiageStatistics.Z_VALUES = {
    80: 1.28,    // Standard im Tiage-Modell
    90: 1.645,
    95: 1.96,
    99: 2.576
};

/**
 * Default-Sigma falls Kategorie keinen eigenen Wert hat
 */
TiageStatistics.DEFAULT_SIGMA = 14;

/**
 * Berechnet das Konfidenzintervall für einen Bedürfniswert
 *
 * @param {number} mu - Erwartungswert (μ), der Bedürfniswert 0-100
 * @param {number} sigma - Standardabweichung (σ) der Kategorie
 * @param {number} confidenceLevel - Konfidenz-Level (80, 90, 95, 99), default 80
 * @returns {object} { lower, upper, mu, sigma, confidence, margin }
 */
TiageStatistics.calculateConfidenceInterval = function(mu, sigma, confidenceLevel) {
    confidenceLevel = confidenceLevel || 80;
    sigma = sigma || this.DEFAULT_SIGMA;

    var z = this.Z_VALUES[confidenceLevel] || this.Z_VALUES[80];
    var margin = z * sigma;

    // Clipping auf 0-100
    var lower = Math.max(0, mu - margin);
    var upper = Math.min(100, mu + margin);

    return {
        mu: mu,
        sigma: sigma,
        confidence: confidenceLevel,
        z: z,
        margin: Math.round(margin * 10) / 10,
        lower: Math.round(lower * 10) / 10,
        upper: Math.round(upper * 10) / 10,
        range: Math.round((upper - lower) * 10) / 10
    };
};

/**
 * Berechnet den kombinierten Unsicherheitsbereich für einen Score
 *
 * @param {number} score - Der berechnete Score (0-100)
 * @param {Array} kategorien - Array von Kategorie-Objekten mit sigma
 * @param {number} confidenceLevel - Konfidenz-Level (default 80)
 * @returns {object} { score, margin, lower, upper, confidence }
 */
TiageStatistics.calculateScoreUncertainty = function(score, kategorien, confidenceLevel) {
    confidenceLevel = confidenceLevel || 80;
    var z = this.Z_VALUES[confidenceLevel] || this.Z_VALUES[80];

    // Kombinierte Varianz (Summe der Varianzen)
    var totalVariance = 0;
    var n = 0;

    if (kategorien && kategorien.length > 0) {
        for (var i = 0; i < kategorien.length; i++) {
            var sigma = kategorien[i].sigma || this.DEFAULT_SIGMA;
            totalVariance += sigma * sigma;
            n++;
        }
        // Durchschnittliche Varianz für kombinierten Wert
        var avgVariance = totalVariance / n;
        var combinedSigma = Math.sqrt(avgVariance);
    } else {
        var combinedSigma = this.DEFAULT_SIGMA;
    }

    var margin = z * combinedSigma;

    return {
        score: score,
        sigma: Math.round(combinedSigma * 10) / 10,
        margin: Math.round(margin * 10) / 10,
        lower: Math.round(Math.max(0, score - margin) * 10) / 10,
        upper: Math.round(Math.min(100, score + margin) * 10) / 10,
        confidence: confidenceLevel
    };
};

/**
 * Holt σ für eine Kategorie aus GfkBeduerfnisse
 *
 * @param {string} kategorieKey - Schlüssel der Kategorie (z.B. 'zuneigung')
 * @returns {number} σ-Wert oder DEFAULT_SIGMA
 */
TiageStatistics.getSigmaForKategorie = function(kategorieKey) {
    if (typeof GfkBeduerfnisse !== 'undefined' &&
        GfkBeduerfnisse.kategorien &&
        GfkBeduerfnisse.kategorien[kategorieKey]) {
        return GfkBeduerfnisse.kategorien[kategorieKey].sigma || this.DEFAULT_SIGMA;
    }
    return this.DEFAULT_SIGMA;
};

/**
 * Findet die Kategorie für ein Bedürfnis
 *
 * @param {string} beduerfnisKey - Schlüssel des Bedürfnisses (z.B. 'naehe')
 * @returns {object|null} { key, name, sigma } oder null
 */
TiageStatistics.findKategorieForBeduerfnis = function(beduerfnisKey) {
    if (typeof GfkBeduerfnisse === 'undefined' || !GfkBeduerfnisse.kategorien) {
        return null;
    }

    var kategorien = GfkBeduerfnisse.kategorien;
    for (var key in kategorien) {
        if (kategorien.hasOwnProperty(key)) {
            var kat = kategorien[key];
            if (kat.beduerfnisse && kat.beduerfnisse.indexOf(beduerfnisKey) !== -1) {
                return {
                    key: key,
                    name: kat.name,
                    sigma: kat.sigma || this.DEFAULT_SIGMA
                };
            }
        }
    }
    return null;
};

/**
 * Formatiert einen Score mit Unsicherheit für Anzeige
 *
 * @param {number} score - Der Score (0-100)
 * @param {number} margin - Die Unsicherheit (±)
 * @returns {string} z.B. "78% ± 12"
 */
TiageStatistics.formatScoreWithUncertainty = function(score, margin) {
    return Math.round(score) + '% ± ' + Math.round(margin);
};

/**
 * Formatiert ein Konfidenzintervall für Anzeige
 *
 * @param {object} interval - Ergebnis von calculateConfidenceInterval
 * @returns {string} z.B. "[65, 91]"
 */
TiageStatistics.formatInterval = function(interval) {
    return '[' + Math.round(interval.lower) + ', ' + Math.round(interval.upper) + ']';
};

// Export für Node.js Tests (falls vorhanden)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TiageStatistics;
}
