/**
 * Data Routes (Stammdaten - READ-ONLY)
 *
 * GET /api/data/needs                    → 224 Bedürfnisse
 * GET /api/data/archetypes               → 8 Archetypen
 * GET /api/data/taxonomy                 → Perspektiven, Dimensionen, Kategorien
 * GET /api/data/archetype-profile/:name  → 224 Gewichtungen für Archetyp
 */

import { Router } from 'express';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Pfade zu den Datendateien (relativ zum Projekt-Root)
const PROJECT_ROOT = join(__dirname, '..', '..');
const DATA_PATH = join(PROJECT_ROOT, 'profiles', 'data');
const PROFILES_PATH = join(PROJECT_ROOT, 'profiles', 'archetypen');
const DEFINITIONS_PATH = join(PROJECT_ROOT, 'profiles', 'definitions');

const router = Router();

// Cache für Stammdaten (wird beim Start geladen)
let needsCache = null;
let archetypesCache = null;
let taxonomyCache = null;
const archetypeProfilesCache = {};

/**
 * Lädt JSON-Datei
 */
function loadJson(path) {
    const content = readFileSync(path, 'utf-8');
    return JSON.parse(content);
}

/**
 * GET /api/data/needs
 * Liefert alle 224 Bedürfnisse (Katalog/Definition)
 */
router.get('/needs', async (req, res, next) => {
    try {
        if (!needsCache) {
            needsCache = loadJson(join(DATA_PATH, 'beduerfnis-katalog.json'));
        }

        // Nur Bedürfnisse (B-Prefix), keine Metadaten
        const needs = {};
        for (const [key, value] of Object.entries(needsCache)) {
            if (key.startsWith('B') || key.startsWith('#B')) {
                needs[key] = value;
            }
        }

        res.json({
            success: true,
            result: {
                needs,
                count: Object.keys(needs).length  // 224
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/data/archetypes
 * Liefert alle 8 Archetypen-Definitionen
 */
router.get('/archetypes', async (req, res, next) => {
    try {
        if (!archetypesCache) {
            archetypesCache = loadJson(join(PROJECT_ROOT, 'archetype-matrix.json'));
        }

        res.json({
            success: true,
            result: {
                archetypes: archetypesCache.archetypes || archetypesCache,
                count: 8
            }
        });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/data/taxonomy
 * Liefert Perspektiven, Dimensionen, Kategorien
 */
router.get('/taxonomy', async (req, res, next) => {
    try {
        if (!taxonomyCache) {
            // taxonomie.js ist ein ES-Modul, wir müssen es anders laden
            // Für jetzt: Statische Daten basierend auf SSOT
            taxonomyCache = {
                perspektiven: [
                    { id: 'P1', name: 'Selbst' },
                    { id: 'P2', name: 'Beziehung' },
                    { id: 'P3', name: 'Gesellschaft' },
                    { id: 'P4', name: 'Transzendenz' }
                ],
                dimensionen: [
                    { id: 'D1', kurzform: 'A', name: 'Autonomie' },
                    { id: 'D2', kurzform: 'B', name: 'Bindung' },
                    { id: 'D3', kurzform: 'C', name: 'Kontrolle' },
                    { id: 'D4', kurzform: 'D', name: 'Dynamik' },
                    { id: 'D5', kurzform: 'E', name: 'Emotion' },
                    { id: 'D6', kurzform: 'F', name: 'Freiheit' }
                ],
                kategorien: Array.from({ length: 18 }, (_, i) => ({
                    id: `K${i + 1}`,
                    name: `Kategorie ${i + 1}`
                }))
            };
        }

        res.json({
            success: true,
            result: taxonomyCache
        });
    } catch (error) {
        next(error);
    }
});

/**
 * GET /api/data/archetype-profile/:name
 * Liefert 224 Gewichtungen für einen Archetyp
 */
router.get('/archetype-profile/:name', async (req, res, next) => {
    try {
        const { name } = req.params;

        // Validiere Archetyp-Name
        const validArchetypes = [
            'single', 'duo', 'duo_flex', 'lat',
            'solopoly', 'polyamor', 'ra', 'aromantisch'
        ];

        if (!validArchetypes.includes(name)) {
            return res.status(400).json({
                error: `Invalid archetype: ${name}`,
                valid: validArchetypes
            });
        }

        if (!archetypeProfilesCache[name]) {
            // JS-Dateien können nicht direkt geladen werden
            // TODO: Migration zu JSON oder dynamischer Import
            // Für jetzt: Placeholder
            archetypeProfilesCache[name] = {
                name,
                needs: {},  // Wird später implementiert
                message: 'Archetyp-Profile werden migriert'
            };
        }

        res.json({
            success: true,
            result: archetypeProfilesCache[name]
        });
    } catch (error) {
        next(error);
    }
});

export default router;
