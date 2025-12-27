/**
 * Sort Routes
 *
 * POST /api/sort/needs       → 224 Bedürfnisse sortieren
 * POST /api/sort/categories  → 18 Kategorien sortieren
 */

import { Router } from 'express';

const router = Router();

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
 * Sortiert 18 Kategorien nach Durchschnittswert
 */
router.post('/categories', async (req, res, next) => {
    try {
        const { needs, taxonomy, sortBy = 'average' } = req.body;

        if (!needs) {
            return res.status(400).json({
                error: 'Missing required field: needs'
            });
        }

        // TODO: Implementierung mit Taxonomie
        // Gruppiere Bedürfnisse nach Kategorie und berechne Durchschnitte

        res.json({
            success: true,
            result: {
                sorted: [],
                message: 'Kategorie-Sortierung wird implementiert'
            }
        });
    } catch (error) {
        next(error);
    }
});

export default router;
