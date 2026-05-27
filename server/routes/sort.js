/**
 * Sort Routes
 *
 * POST /api/sort/needs       → 224 Bedürfnisse sortieren
 * POST /api/sort/categories  → 18 Kategorien sortieren
 */

import { Router } from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

let _catalogCache = null;
function getCatalog() {
    if (!_catalogCache) {
        const path = join(__dirname, '..', '..', 'profiles', 'data', 'beduerfnis-katalog.json');
        _catalogCache = JSON.parse(readFileSync(path, 'utf-8'));
    }
    return _catalogCache;
}

/**
 * POST /api/sort/needs
 * Sortiert 224 Bedürfnisse nach verschiedenen Kriterien
 */
router.post('/needs', async (req, res, next) => {
    try {
        const { ichNeeds, partnerNeeds, sortBy = 'difference', limit } = req.body;

        if (!ichNeeds) {
            return res.status(400).json({
                error: 'Missing required field: ichNeeds'
            });
        }

        // Bedürfnisse als Array mit Differenzen
        const needs = Object.keys(ichNeeds).map(id => ({
            id,
            ichValue: ichNeeds[id],
            partnerValue: partnerNeeds ? (partnerNeeds[id] || 0) : 0,
            difference: partnerNeeds
                ? Math.abs(ichNeeds[id] - (partnerNeeds[id] || 0))
                : 0,
            average: partnerNeeds
                ? (ichNeeds[id] + (partnerNeeds[id] || 0)) / 2
                : ichNeeds[id]
        }));

        // Sortierung
        switch (sortBy) {
            case 'difference':
                needs.sort((a, b) => b.difference - a.difference);
                break;
            case 'similarity':
                needs.sort((a, b) => a.difference - b.difference);
                break;
            case 'importance':
                needs.sort((a, b) => b.average - a.average);
                break;
            case 'ichValue':
                needs.sort((a, b) => b.ichValue - a.ichValue);
                break;
            case 'partnerValue':
                needs.sort((a, b) => b.partnerValue - a.partnerValue);
                break;
            default:
                needs.sort((a, b) => b.difference - a.difference);
        }

        // Limit anwenden
        const sorted = limit ? needs.slice(0, limit) : needs;

        // Statistiken berechnen
        const stats = {
            count: sorted.length,
            avgDifference: needs.reduce((sum, n) => sum + n.difference, 0) / needs.length,
            avgValue: needs.reduce((sum, n) => sum + n.average, 0) / needs.length,
            maxDifference: Math.max(...needs.map(n => n.difference)),
            minDifference: Math.min(...needs.map(n => n.difference))
        };

        res.json({
            success: true,
            result: { sorted, stats }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/sort/categories
 * Gruppiert Bedürfnisse nach Stufe (4 Stufen nach Volker Schmidt) und berechnet Durchschnitte
 *
 * Body: { ichNeeds, partnerNeeds?, sortBy? }
 */
router.post('/categories', async (req, res, next) => {
    try {
        const { ichNeeds, partnerNeeds, sortBy = 'stufe' } = req.body;

        if (!ichNeeds) {
            return res.status(400).json({
                error: 'Missing required field: ichNeeds'
            });
        }

        const catalog = getCatalog();
        const katalog = catalog.beduerfnisse || {};
        const stufen = catalog.stufen || {};

        // Gruppieren nach Stufe
        const stufenMap = {};

        for (const [needId, ichValue] of Object.entries(ichNeeds)) {
            const meta = katalog[needId];
            const stufe = meta?.stufe ?? 0;
            const partnerValue = partnerNeeds?.[needId] ?? null;

            if (!stufenMap[stufe]) {
                stufenMap[stufe] = {
                    stufe,
                    label: stufen[String(stufe)]?.label || `Stufe ${stufe}`,
                    color: stufen[String(stufe)]?.color || '#888888',
                    needs: []
                };
            }

            stufenMap[stufe].needs.push({
                id: needId,
                label: meta?.label || needId,
                icon: meta?.icon || '',
                ichValue,
                partnerValue,
                difference: partnerValue !== null ? Math.abs(ichValue - partnerValue) : null,
                average: partnerValue !== null ? (ichValue + partnerValue) / 2 : ichValue
            });
        }

        // Durchschnitte pro Stufe berechnen
        const categories = Object.values(stufenMap).map(cat => {
            const ichVals = cat.needs.map(n => n.ichValue);
            const ichAvg = ichVals.reduce((s, v) => s + v, 0) / ichVals.length;

            let partnerAvg = null;
            let diffAvg = null;
            if (partnerNeeds) {
                const partVals = cat.needs.filter(n => n.partnerValue !== null).map(n => n.partnerValue);
                partnerAvg = partVals.length > 0
                    ? Math.round(partVals.reduce((s, v) => s + v, 0) / partVals.length)
                    : null;
                const diffs = cat.needs.filter(n => n.difference !== null).map(n => n.difference);
                diffAvg = diffs.length > 0
                    ? Math.round(diffs.reduce((s, v) => s + v, 0) / diffs.length)
                    : null;
            }

            return {
                stufe: cat.stufe,
                label: cat.label,
                color: cat.color,
                count: cat.needs.length,
                ichAverage: Math.round(ichAvg),
                partnerAverage: partnerAvg,
                differenceAverage: diffAvg,
                needs: cat.needs
            };
        });

        categories.sort((a, b) => {
            if (sortBy === 'ichAverage') return b.ichAverage - a.ichAverage;
            if (sortBy === 'difference' && a.differenceAverage !== null) return b.differenceAverage - a.differenceAverage;
            return a.stufe - b.stufe;
        });

        res.json({
            success: true,
            result: { categories, count: categories.length }
        });
    } catch (error) {
        next(error);
    }
});

export default router;
