/**
 * Calculate Routes
 *
 * POST /api/calculate/synthesis      → Q-Formel
 * POST /api/calculate/resonance      → R-Faktoren
 * POST /api/calculate/matrix         → 8×8 Matrix
 * POST /api/calculate/compatibility  → Orchestrator
 */

import { Router } from 'express';
import * as SynthesisCalculator from '../logic/synthesisCalculator.js';
import * as NeedsIntegration from '../logic/needsIntegration.js';
import * as MatrixCalculator from '../logic/archetypeMatrixCalculator.js';
import * as Orchestrator from '../logic/compatibilityOrchestrator.js';

const router = Router();

/**
 * POST /api/calculate/synthesis
 * Q-Formel: Q = Σ(Faktor × Gewicht × R)
 */
router.post('/synthesis', async (req, res, next) => {
    try {
        const { ich, partner, options } = req.body;

        if (!ich || !partner) {
            return res.status(400).json({
                error: 'Missing required fields: ich, partner'
            });
        }

        const result = SynthesisCalculator.calculate(ich, partner, options);

        res.json({
            success: true,
            result
        });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/calculate/resonance
 * R-Faktoren (R1-R4) aus Profil berechnen
 */
router.post('/resonance', async (req, res, next) => {
    try {
        const { person, profile } = req.body;

        if (!person || !profile) {
            return res.status(400).json({
                error: 'Missing required fields: person, profile'
            });
        }

        const result = NeedsIntegration.calculateDimensionalResonance(person, profile);

        res.json({
            success: true,
            result
        });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/calculate/matrix
 * 8×8 Archetyp-Kompatibilitäts-Matrix
 */
router.post('/matrix', async (req, res, next) => {
    try {
        const result = MatrixCalculator.calculateMatrix();

        res.json({
            success: true,
            result
        });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/calculate/compatibility
 * Pathos + Logos Orchestrator
 */
router.post('/compatibility', async (req, res, next) => {
    try {
        const { ich, partner } = req.body;

        if (!ich || !partner) {
            return res.status(400).json({
                error: 'Missing required fields: ich, partner'
            });
        }

        const result = Orchestrator.calculate(ich, partner);

        res.json({
            success: true,
            result
        });
    } catch (error) {
        next(error);
    }
});

export default router;
