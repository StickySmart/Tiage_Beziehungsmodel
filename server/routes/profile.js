/**
 * Profile Routes
 *
 * POST   /api/profile/save              → Profil speichern
 * GET    /api/profile/load/:slot/:person → Profil laden
 * GET    /api/profile/list              → Alle Profile
 * DELETE /api/profile/:slot/:person     → Profil löschen
 */

import { Router } from 'express';
import { getDb } from '../db/init.js';

const router = Router();

/**
 * POST /api/profile/save
 * Speichert ein Profil in Slot 1-4
 */
router.post('/save', async (req, res, next) => {
    try {
        const { person, slot, profile } = req.body;

        // Validierung
        if (!person || !slot || !profile) {
            return res.status(400).json({
                error: 'Missing required fields: person, slot, profile'
            });
        }

        if (!['ich', 'partner'].includes(person)) {
            return res.status(400).json({
                error: 'person must be "ich" or "partner"'
            });
        }

        if (slot < 1 || slot > 4) {
            return res.status(400).json({
                error: 'slot must be between 1 and 4'
            });
        }

        const db = getDb();

        // Upsert (Insert or Replace)
        const stmt = db.prepare(`
            INSERT INTO profiles (
                person, slot, archetyp,
                geschlecht_primary, geschlecht_secondary,
                dominanz_primary, dominanz_secondary,
                orientierung_primary, orientierung_secondary,
                needs, locked_needs, gewichtungen, resonanz_faktoren,
                updated_at
            ) VALUES (
                @person, @slot, @archetyp,
                @geschlecht_primary, @geschlecht_secondary,
                @dominanz_primary, @dominanz_secondary,
                @orientierung_primary, @orientierung_secondary,
                @needs, @locked_needs, @gewichtungen, @resonanz_faktoren,
                CURRENT_TIMESTAMP
            )
            ON CONFLICT(person, slot) DO UPDATE SET
                archetyp = @archetyp,
                geschlecht_primary = @geschlecht_primary,
                geschlecht_secondary = @geschlecht_secondary,
                dominanz_primary = @dominanz_primary,
                dominanz_secondary = @dominanz_secondary,
                orientierung_primary = @orientierung_primary,
                orientierung_secondary = @orientierung_secondary,
                needs = @needs,
                locked_needs = @locked_needs,
                gewichtungen = @gewichtungen,
                resonanz_faktoren = @resonanz_faktoren,
                updated_at = CURRENT_TIMESTAMP
        `);

        const result = stmt.run({
            person,
            slot,
            archetyp: profile.archetyp || null,
            geschlecht_primary: profile.geschlecht?.primary || null,
            geschlecht_secondary: profile.geschlecht?.secondary || null,
            dominanz_primary: profile.dominanz?.primary || null,
            dominanz_secondary: profile.dominanz?.secondary || null,
            orientierung_primary: profile.orientierung?.primary || null,
            orientierung_secondary: profile.orientierung?.secondary || null,
            needs: JSON.stringify(profile.needs || {}),
            locked_needs: JSON.stringify(profile.lockedNeeds || {}),
            gewichtungen: JSON.stringify(profile.gewichtungen || {}),
            resonanz_faktoren: JSON.stringify(profile.resonanzFaktoren || {})
        });

        res.json({
            success: true,
            result: {
                person,
                slot,
                savedAt: new Date().toISOString()
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/profile/load/:slot/:person
 * Lädt ein Profil aus Slot 1-4
 */
router.get('/load/:slot/:person', async (req, res, next) => {
    try {
        const { slot, person } = req.params;

        if (!['ich', 'partner'].includes(person)) {
            return res.status(400).json({
                error: 'person must be "ich" or "partner"'
            });
        }

        const db = getDb();

        const row = db.prepare(`
            SELECT * FROM profiles WHERE person = ? AND slot = ?
        `).get(person, parseInt(slot));

        if (!row) {
            return res.status(404).json({
                error: 'Profile not found',
                person,
                slot: parseInt(slot)
            });
        }

        // JSON-Felder parsen
        const profile = {
            archetyp: row.archetyp,
            geschlecht: {
                primary: row.geschlecht_primary,
                secondary: row.geschlecht_secondary
            },
            dominanz: {
                primary: row.dominanz_primary,
                secondary: row.dominanz_secondary
            },
            orientierung: {
                primary: row.orientierung_primary,
                secondary: row.orientierung_secondary
            },
            needs: JSON.parse(row.needs || '{}'),
            lockedNeeds: JSON.parse(row.locked_needs || '{}'),
            gewichtungen: JSON.parse(row.gewichtungen || '{}'),
            resonanzFaktoren: JSON.parse(row.resonanz_faktoren || '{}')
        };

        res.json({
            success: true,
            result: {
                profile,
                savedAt: row.updated_at
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/profile/list
 * Listet alle gespeicherten Profile auf
 */
router.get('/list', async (req, res, next) => {
    try {
        const db = getDb();

        const rows = db.prepare(`
            SELECT person, slot, archetyp, updated_at
            FROM profiles
            ORDER BY person, slot
        `).all();

        const profiles = rows.map(row => ({
            person: row.person,
            slot: row.slot,
            archetyp: row.archetyp,
            savedAt: row.updated_at
        }));

        res.json({
            success: true,
            result: {
                profiles,
                count: profiles.length
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * DELETE /api/profile/:slot/:person
 * Löscht ein Profil
 */
router.delete('/:slot/:person', async (req, res, next) => {
    try {
        const { slot, person } = req.params;

        if (!['ich', 'partner'].includes(person)) {
            return res.status(400).json({
                error: 'person must be "ich" or "partner"'
            });
        }

        const db = getDb();

        const result = db.prepare(`
            DELETE FROM profiles WHERE person = ? AND slot = ?
        `).run(person, parseInt(slot));

        if (result.changes === 0) {
            return res.status(404).json({
                error: 'Profile not found',
                person,
                slot: parseInt(slot)
            });
        }

        res.json({
            success: true,
            result: {
                deleted: true,
                person,
                slot: parseInt(slot)
            }
        });
    } catch (error) {
        next(error);
    }
});

export default router;
