/**
 * SQLite Datenbank-Initialisierung
 *
 * Schema für Profile-Speicherung
 */

import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DB_PATH = join(__dirname, '..', 'data', 'tiage.db');

let db = null;

/**
 * Datenbank initialisieren
 */
export async function initDatabase() {
    db = new Database(DB_PATH);

    // WAL-Modus für bessere Performance
    db.pragma('journal_mode = WAL');

    // Schema erstellen
    db.exec(`
        -- Profile-Tabelle
        CREATE TABLE IF NOT EXISTS profiles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            person TEXT NOT NULL CHECK(person IN ('ich', 'partner')),
            slot INTEGER NOT NULL CHECK(slot BETWEEN 1 AND 4),
            archetyp TEXT,
            geschlecht_primary TEXT,
            geschlecht_secondary TEXT,
            dominanz_primary TEXT,
            dominanz_secondary TEXT,
            orientierung_primary TEXT,
            orientierung_secondary TEXT,
            needs JSON,
            locked_needs JSON,
            gewichtungen JSON,
            resonanz_faktoren JSON,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(person, slot)
        );

        -- Index für schnelles Laden
        CREATE INDEX IF NOT EXISTS idx_profiles_person_slot
        ON profiles(person, slot);

        -- Sync-Log für Client-Server Synchronisation
        CREATE TABLE IF NOT EXISTS sync_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            action TEXT NOT NULL,
            entity TEXT NOT NULL,
            entity_id INTEGER,
            data JSON,
            synced_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    console.log('[DB] Schema erstellt/verifiziert');
    return db;
}

/**
 * Datenbank-Instanz abrufen
 */
export function getDb() {
    if (!db) {
        throw new Error('Datenbank nicht initialisiert. Rufe initDatabase() auf.');
    }
    return db;
}

/**
 * Datenbank schließen
 */
export function closeDatabase() {
    if (db) {
        db.close();
        db = null;
    }
}
