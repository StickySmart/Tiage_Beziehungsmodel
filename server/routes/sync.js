/**
 * Sync Routes - Bidirektionale Client-Server Synchronisation
 *
 * POST /api/sync/state       → Client ↔ Server synchronisieren (Last-Write-Wins)
 * POST /api/sync/recalculate → Alle Werte neu berechnen
 *
 * Strategie: Last-Write-Wins (neuerer Timestamp gewinnt)
 *
 * © 2025 Ti-age.de Alle Rechte vorbehalten.
 */

import { Router } from 'express';
import { getDb } from '../db/init.js';

const router = Router();

/**
 * Hilfsfunktion: Profile aus State extrahieren und in DB speichern
 * @param {Object} db - Datenbank-Instanz
 * @param {Object} state - Client-State
 * @param {string} person - 'ich' oder 'partner'
 * @param {number} slot - Slot-Nummer (1-4), default 1 für aktiven State
 */
function saveProfileToDb(db, state, person, slot = 1) {
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
            @updated_at
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
            updated_at = @updated_at
    `);

    const personDims = state.personDimensions?.[person] || {};
    const archetypes = state.archetypes?.[person] || {};
    const gewichtungen = state.gewichtungen?.[person] || {};
    const resonanzFaktoren = state.resonanzFaktoren?.[person] || {};
    const flatNeeds = state.flatNeeds?.[person] || {};
    const lockedNeeds = state.profileReview?.[person]?.lockedNeeds || {};

    stmt.run({
        person,
        slot,
        archetyp: archetypes.primary || null,
        geschlecht_primary: personDims.geschlecht?.primary || null,
        geschlecht_secondary: personDims.geschlecht?.secondary || null,
        dominanz_primary: personDims.dominanz?.primary || null,
        dominanz_secondary: personDims.dominanz?.secondary || null,
        orientierung_primary: personDims.orientierung?.primary || null,
        orientierung_secondary: personDims.orientierung?.secondary || null,
        needs: JSON.stringify(flatNeeds),
        locked_needs: JSON.stringify(lockedNeeds),
        gewichtungen: JSON.stringify(gewichtungen),
        resonanz_faktoren: JSON.stringify(resonanzFaktoren),
        updated_at: new Date().toISOString()
    });
}

/**
 * Hilfsfunktion: Profile aus DB laden und in State-Format konvertieren
 * @param {Object} db - Datenbank-Instanz
 * @param {string} person - 'ich' oder 'partner'
 * @param {number} slot - Slot-Nummer (1-4)
 * @returns {Object|null} Profil-Daten oder null
 */
function loadProfileFromDb(db, person, slot = 1) {
    const row = db.prepare(`
        SELECT * FROM profiles WHERE person = ? AND slot = ?
    `).get(person, slot);

    if (!row) return null;

    return {
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
        resonanzFaktoren: JSON.parse(row.resonanz_faktoren || '{}'),
        updatedAt: row.updated_at
    };
}

/**
 * POST /api/sync/state
 * Synchronisiert Client-State mit Server (Last-Write-Wins)
 *
 * Request Body:
 * {
 *   state: { personDimensions, archetypes, gewichtungen, ... },
 *   lastSyncAt: "2025-01-01T12:00:00.000Z",  // Client's letzter Sync-Zeitpunkt
 *   clientTimestamp: "2025-01-01T12:05:00.000Z"  // Aktuelle Client-Zeit
 * }
 *
 * Response:
 * {
 *   success: true,
 *   result: {
 *     synced: true,
 *     serverTime: "2025-01-01T12:05:01.000Z",
 *     action: "client_wins" | "server_wins" | "no_server_data",
 *     changes: { ich: {...}, partner: {...} }  // Nur wenn server_wins
 *   }
 * }
 */
router.post('/state', async (req, res, next) => {
    try {
        const { state, lastSyncAt, clientTimestamp } = req.body;

        if (!state) {
            return res.status(400).json({
                error: 'Missing required field: state'
            });
        }

        const db = getDb();
        const serverTime = new Date().toISOString();
        const clientTime = clientTimestamp ? new Date(clientTimestamp) : new Date();

        // Lade aktuelle Server-Daten für Vergleich (Slot 1 = aktiver State)
        const serverIch = loadProfileFromDb(db, 'ich', 1);
        const serverPartner = loadProfileFromDb(db, 'partner', 1);

        let action = 'no_server_data';
        const changes = {};

        // Prüfe ob Server-Daten existieren
        const hasServerData = serverIch || serverPartner;

        if (!hasServerData) {
            // Keine Server-Daten → Client-Daten speichern
            action = 'client_wins';
            saveProfileToDb(db, state, 'ich', 1);
            saveProfileToDb(db, state, 'partner', 1);
        } else {
            // Last-Write-Wins Logik
            const serverIchTime = serverIch?.updatedAt ? new Date(serverIch.updatedAt) : new Date(0);
            const serverPartnerTime = serverPartner?.updatedAt ? new Date(serverPartner.updatedAt) : new Date(0);
            const lastSync = lastSyncAt ? new Date(lastSyncAt) : new Date(0);

            // Vergleiche: Client-Änderungen nach lastSync vs. Server-Änderungen
            // Wenn Client neuer → Client gewinnt
            // Wenn Server neuer als lastSync → Server gewinnt (Änderungen zurückgeben)

            // ICH-Profil
            if (serverIchTime > lastSync) {
                // Server hat neuere Daten → zurückgeben
                action = 'server_wins';
                changes.ich = serverIch;
            } else {
                // Client ist neuer → speichern
                saveProfileToDb(db, state, 'ich', 1);
            }

            // PARTNER-Profil
            if (serverPartnerTime > lastSync) {
                // Server hat neuere Daten → zurückgeben
                action = 'server_wins';
                changes.partner = serverPartner;
            } else {
                // Client ist neuer → speichern
                saveProfileToDb(db, state, 'partner', 1);
            }

            // Wenn beides Client gewinnt
            if (!changes.ich && !changes.partner) {
                action = 'client_wins';
            }
        }

        // Sync-Log eintragen
        const logStmt = db.prepare(`
            INSERT INTO sync_log (action, entity, data)
            VALUES (@action, 'state', @data)
        `);
        logStmt.run({
            action: `sync_${action}`,
            data: JSON.stringify({
                clientTimestamp: clientTime.toISOString(),
                serverTime,
                hasChanges: Object.keys(changes).length > 0
            })
        });

        res.json({
            success: true,
            result: {
                synced: true,
                serverTime,
                action,
                changes: Object.keys(changes).length > 0 ? changes : null
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * POST /api/sync/recalculate
 * Berechnet alle abgeleiteten Werte neu (R-Faktoren, etc.)
 *
 * Request Body:
 * {
 *   persons: ['ich', 'partner'],  // Optional, default: beide
 *   slot: 1  // Optional, default: 1 (aktiver State)
 * }
 */
router.post('/recalculate', async (req, res, next) => {
    try {
        const { persons = ['ich', 'partner'], slot = 1 } = req.body;

        const db = getDb();
        const results = {};

        for (const person of persons) {
            const profile = loadProfileFromDb(db, person, slot);

            if (!profile) {
                results[person] = { error: 'Profile not found' };
                continue;
            }

            // R-Faktoren basierend auf Bedürfnissen neu berechnen
            // Vereinfachte Berechnung (in Produktion: komplexere Logik via needsIntegration.js)
            const needs = profile.needs || {};
            const needValues = Object.values(needs);

            if (needValues.length > 0) {
                const avgNeed = needValues.reduce((a, b) => a + b, 0) / needValues.length;

                // v3.4: R = avgMatch² - kann über 1.0 gehen wenn mehr als Archetyp-typisch
                // Vereinfachte Berechnung hier, vollständige Logik in needsIntegration.js
                const normalized = avgNeed / 100;
                // v3.4: Range 0-2 (R kann über 1.0 gehen bei richtungsbasierter Berechnung)
                const clampedR = Math.min(2, Math.max(0, normalized * normalized));

                const newResonanzFaktoren = {
                    R1: { value: clampedR, locked: profile.resonanzFaktoren?.R1?.locked || false },
                    R2: { value: clampedR, locked: profile.resonanzFaktoren?.R2?.locked || false },
                    R3: { value: clampedR, locked: profile.resonanzFaktoren?.R3?.locked || false },
                    R4: { value: clampedR, locked: profile.resonanzFaktoren?.R4?.locked || false }
                };

                // Update in DB
                const updateStmt = db.prepare(`
                    UPDATE profiles
                    SET resonanz_faktoren = @resonanz_faktoren,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE person = @person AND slot = @slot
                `);

                updateStmt.run({
                    person,
                    slot,
                    resonanz_faktoren: JSON.stringify(newResonanzFaktoren)
                });

                results[person] = {
                    recalculated: true,
                    resonanzFaktoren: newResonanzFaktoren
                };
            } else {
                results[person] = { recalculated: false, reason: 'No needs data' };
            }
        }

        res.json({
            success: true,
            result: {
                recalculated: true,
                timestamp: new Date().toISOString(),
                results
            }
        });
    } catch (error) {
        next(error);
    }
});

export default router;
