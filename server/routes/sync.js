/**
 * Sync Routes
 *
 * POST /api/sync/state       → Client ↔ Server synchronisieren
 * POST /api/sync/recalculate → Alle Werte neu berechnen
 */

import { Router } from 'express';
import { getDb } from '../db/init.js';

const router = Router();

/**
 * POST /api/sync/state
 * Synchronisiert Client-State mit Server
 */
router.post('/state', async (req, res, next) => {
    try {
        const { state, lastSyncAt } = req.body;

        if (!state) {
            return res.status(400).json({
                error: 'Missing required field: state'
            });
        }

        const db = getDb();

        // Sync-Log eintragen
        const stmt = db.prepare(`
            INSERT INTO sync_log (action, entity, data)
            VALUES ('sync', 'state', @data)
        `);

        stmt.run({ data: JSON.stringify(state) });

        // TODO: Bidirektionale Sync-Logik implementieren
        // - Vergleiche Timestamps
        // - Merge Konflikte
        // - Sende Updates zurück

        res.json({
            success: true,
            result: {
                synced: true,
                serverTime: new Date().toISOString(),
                changes: []  // Änderungen vom Server
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/sync/recalculate
 * Berechnet alle abgeleiteten Werte neu
 */
router.post('/recalculate', async (req, res, next) => {
    try {
        const { profileIds } = req.body;

        // TODO: Implementierung
        // - Lade Profile aus DB
        // - Berechne R-Faktoren neu
        // - Berechne Matrix neu
        // - Update DB

        res.json({
            success: true,
            result: {
                recalculated: true,
                timestamp: new Date().toISOString()
            }
        });
    } catch (error) {
        next(error);
    }
});

export default router;
