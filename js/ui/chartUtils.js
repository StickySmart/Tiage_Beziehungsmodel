/**
 * js/ui/chartUtils.js
 * Chart rendering and score color utilities.
 * No dependencies beyond DOM.
 *
 * Exports: TiageChartUtils
 */
const TiageChartUtils = (function() {
    'use strict';

    /**
     * Draw radar chart for archetype category scores
     * @param {Object} scores - Category scores { A: { value: 80 }, B: { value: 60 }, ... }
     * @param {string} color - CSS color for the chart polygon
     */
    function drawRadarChart(scores, color) {
        var svg = document.getElementById('radarChart');
        var cx = 140, cy = 120, maxR = 90;
        var categories = ['A', 'B', 'C', 'D', 'E', 'F'];
        var n = categories.length;

        var html = '';

        for (var r = 18; r <= maxR; r += 18) {
            html += '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>';
        }

        categories.forEach(function(cat, i) {
            var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
            var x = cx + Math.cos(angle) * maxR;
            var y = cy + Math.sin(angle) * maxR;
            var labelX = cx + Math.cos(angle) * (maxR + 18);
            var labelY = cy + Math.sin(angle) * (maxR + 18);

            html += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x + '" y2="' + y + '" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>';
            html += '<text x="' + labelX + '" y="' + labelY + '" fill="var(--text-muted)" font-size="10" text-anchor="middle" dominant-baseline="middle">' + cat + '</text>';
        });

        var points = categories.map(function(cat, i) {
            var value = (scores[cat] && scores[cat].value) || 0;
            var r2 = (value / 100) * maxR;
            var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
            return (cx + Math.cos(angle) * r2) + ',' + (cy + Math.sin(angle) * r2);
        }).join(' ');

        html += '<polygon points="' + points + '" fill="' + color + '33" stroke="' + color + '" stroke-width="2"/>';

        categories.forEach(function(cat, i) {
            var value = (scores[cat] && scores[cat].value) || 0;
            var r2 = (value / 100) * maxR;
            var angle = (Math.PI * 2 * i / n) - Math.PI / 2;
            var x = cx + Math.cos(angle) * r2;
            var y = cy + Math.sin(angle) * r2;
            html += '<circle cx="' + x + '" cy="' + y + '" r="4" fill="' + color + '"/>';
        });

        if (svg) svg.innerHTML = html;

        // Also draw on expandRadarChart (smaller version)
        var expandSvg = document.getElementById('expandRadarChart');
        if (expandSvg) expandSvg.innerHTML = html;
    }

    /**
     * Get color class for score value
     */
    function getScoreColor(score) {
        if (score >= 70) return '#457B9D';  // Blau - Gut
        if (score >= 50) return '#f39c12';  // Orange - Mittel
        return '#e74c3c';                   // Rot - Herausfordernd
    }

    /**
     * Gradient color for score: rot (0%) -> gelb (50%) -> gruen (100%)
     */
    function getScoreGradientColor(score) {
        score = Math.max(0, Math.min(100, score));

        var r, g, b;

        if (score <= 50) {
            var t = score / 50;
            r = Math.round(231 + (241 - 231) * t);
            g = Math.round(76 + (196 - 76) * t);
            b = Math.round(60 + (15 - 60) * t);
        } else {
            var t2 = (score - 50) / 50;
            r = Math.round(241 + (46 - 241) * t2);
            g = Math.round(196 + (204 - 196) * t2);
            b = Math.round(15 + (113 - 15) * t2);
        }

        return 'rgb(' + r + ', ' + g + ', ' + b + ')';
    }

    /**
     * Get CSS class for category bar value
     */
    function getBarClass(value) {
        if (value >= 70) return 'bar-good';
        if (value >= 50) return 'bar-medium';
        return 'bar-low';
    }

    // Public API
    return {
        drawRadarChart: drawRadarChart,
        getScoreColor: getScoreColor,
        getScoreGradientColor: getScoreGradientColor,
        getBarClass: getBarClass
    };
})();

// Export for other modules
if (typeof window !== 'undefined') {
    window.TiageChartUtils = TiageChartUtils;
}
