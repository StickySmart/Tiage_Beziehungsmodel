/**
 * Generate Routes (Text-Generierung)
 *
 * POST /api/generate/pathos   → Emotionale Texte
 * POST /api/generate/logos    → Rationale Texte
 * POST /api/generate/oshozen  → Spirituelle Texte
 */

import { Router } from 'express';
import * as PathosGenerator from '../logic/pathosTextGenerator.js';
import * as LogosGenerator from '../logic/logosTextGenerator.js';
import * as OshoZenGenerator from '../logic/oshoZenTextGenerator.js';

const router = Router();

/**
 * POST /api/generate/pathos
 * Generiert emotionale Beziehungstexte
 */
router.post('/pathos', async (req, res, next) => {
    try {
        const { synthesisResult, options } = req.body;

        if (!synthesisResult) {
            return res.status(400).json({
                error: 'Missing required field: synthesisResult'
            });
        }

        const result = PathosGenerator.generate(synthesisResult, options);

        res.json({
            success: true,
            result
        });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/generate/logos
 * Generiert rationale Analyse-Texte
 */
router.post('/logos', async (req, res, next) => {
    try {
        const { synthesisResult, options } = req.body;

        if (!synthesisResult) {
            return res.status(400).json({
                error: 'Missing required field: synthesisResult'
            });
        }

        const result = LogosGenerator.generate(synthesisResult, options);

        res.json({
            success: true,
            result
        });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/generate/oshozen
 * Generiert spirituelle Interpretationen
 */
router.post('/oshozen', async (req, res, next) => {
    try {
        const { synthesisResult, options } = req.body;

        if (!synthesisResult) {
            return res.status(400).json({
                error: 'Missing required field: synthesisResult'
            });
        }

        const result = OshoZenGenerator.generate(synthesisResult, options);

        res.json({
            success: true,
            result
        });
    } catch (error) {
        next(error);
    }
});

export default router;
