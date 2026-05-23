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
import { fileURLToPath, URL } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Pfade zu den Datendateien (relativ zum Projekt-Root)
const PROJECT_ROOT = join(__dirname, '..', '..');
const DATA_PATH = join(PROJECT_ROOT, 'profiles', 'data');
const PROFILES_PATH = join(PROJECT_ROOT, 'profiles', 'archetypen');

const ARCHETYPE_FILES = {
    'single':      'single',
    'duo':         'duo',
    'duo_flex':    'duo-flex',
    'lat':         'lat',
    'solopoly':    'solopoly',
    'polyamor':    'polyamor',
    'ra':          'ra',
    'aromantisch': 'aromantisch'
};

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

        // v4.0: Bedürfnisse liegen unter "beduerfnisse" (verschachtelt)
        const needs = needsCache.beduerfnisse || needsCache;

        res.json({
            success: true,
            result: {
                needs,
                count: Object.keys(needs).length,
                version: needsCache.version,
                stufen: needsCache.stufen
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
 * Liefert Stufen und Metadaten aus dem Bedürfnis-Katalog
 */
router.get('/taxonomy', async (req, res, next) => {
    try {
        if (!taxonomyCache) {
            if (!needsCache) {
                needsCache = loadJson(join(DATA_PATH, 'beduerfnis-katalog.json'));
            }
            taxonomyCache = {
                version: needsCache.version,
                modell: needsCache.modell,
                stufen: needsCache.stufen || {}
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

        if (!ARCHETYPE_FILES[name]) {
            return res.status(400).json({
                error: `Invalid archetype: ${name}`,
                valid: Object.keys(ARCHETYPE_FILES)
            });
        }

        if (!archetypeProfilesCache[name]) {
            const filename = ARCHETYPE_FILES[name];
            const profil = require(join(PROFILES_PATH, `${filename}.js`));
            archetypeProfilesCache[name] = {
                name,
                label: profil.name,
                beschreibung: profil.beschreibung,
                needs: profil.umfrageWerte || {}
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
