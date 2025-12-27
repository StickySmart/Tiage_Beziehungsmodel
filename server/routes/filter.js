/**
 * Filter Routes
 *
 * POST /api/filter/lifestyle  → K.O.-Kriterien
 * POST /api/filter/needs      → Bedürfnisse nach Schwellwert
 */

import { Router } from 'express';
import * as LifestyleFilter from '../logic/lifestyleFilter.js';

const router = Router();

/**
 * POST /api/filter/lifestyle
 * Prüft K.O.-Kriterien zwischen zwei Personen
 */
router.post('/lifestyle', async (req, res, next) => {
    try {
        const { ich, partner } = req.body;

        if (!ich || !partner) {
            return res.status(400).json({
                error: 'Missing required fields: ich, partner'
            });
        }

        const result = LifestyleFilter.check(ich, partner);

        res.json({
            success: true,
            result
        });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/filter/needs
 * Filtert Bedürfnisse nach Schwellwert
 */
router.post('/needs', async (req, res, next) => {
    try {
        const { needs, threshold, dimension, category } = req.body;

        if (!needs || threshold === undefined) {
            return res.status(400).json({
                error: 'Missing required fields: needs, threshold'
            });
        }

        // Filtern nach Schwellwert
        let filtered = Object.entries(needs)
            .filter(([id, value]) => value >= threshold);

        // Optional: Nach Dimension filtern
        if (dimension) {
            // TODO: Mit Taxonomie filtern
        }

        // Optional: Nach Kategorie filtern
        if (category) {
            // TODO: Mit Taxonomie filtern
        }

        const result = filtered.reduce((acc, [id, value]) => {
            acc[id] = value;
            return acc;
        }, {});

        res.json({
            success: true,
            result: {
                filtered: result,
                count: Object.keys(result).length,
                threshold
            }
        });
    } catch (error) {
        next(error);
    }
});

export default router;
