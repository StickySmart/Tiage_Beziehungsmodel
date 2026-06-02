/**
 * Tiage API Server
 *
 * Node.js + Express + SQLite
 * @see docs/ARCHITECTURE_CLIENT_SERVER.md
 */

import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createRequire } from 'module';

// Routes
import calculateRoutes from './routes/calculate.js';
import sortRoutes from './routes/sort.js';
import filterRoutes from './routes/filter.js';
import generateRoutes from './routes/generate.js';
import profileRoutes from './routes/profile.js';
import syncRoutes from './routes/sync.js';
import dataRoutes from './routes/data.js';

// Logic (für Profile-Injection)
import * as MatrixCalculator from './logic/archetypeMatrixCalculator.js';
import * as NeedsIntegration from './logic/needsIntegration.js';

// Database
import { initDatabase } from './db/init.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

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

function loadArchetypeProfiles() {
    const profiles = {};
    const profilesPath = join(__dirname, '..', 'profiles', 'archetypen');

    for (const [key, filename] of Object.entries(ARCHETYPE_FILES)) {
        try {
            const profil = require(join(profilesPath, `${filename}.js`));
            profiles[key] = profil;
        } catch (e) {
            console.warn(`[Profiles] Konnte nicht laden: ${filename}.js —`, e.message);
        }
    }

    const loaded = Object.keys(profiles).length;
    console.log(`[Profiles] ${loaded}/${Object.keys(ARCHETYPE_FILES).length} Archetyp-Profile geladen`);
    return profiles;
}

const app = express();
const PORT = process.env.PORT || 3000;

// ═══════════════════════════════════════════════════════════════════════════
// MIDDLEWARE
// ═══════════════════════════════════════════════════════════════════════════

app.use(cors());
app.use(express.json());

// Static Files — serve project root for local testing (HTML, JS, CSS, JSON)
app.use(express.static(join(__dirname, '..'), {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
            res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        }
    }
}));

// Request-Logging (Debug)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
});

// ═══════════════════════════════════════════════════════════════════════════
// ROUTES
// ═══════════════════════════════════════════════════════════════════════════

// Health-Check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

// API-Routes (19 Endpoints)
app.use('/api/calculate', calculateRoutes);   // 4 Endpoints
app.use('/api/sort', sortRoutes);             // 2 Endpoints
app.use('/api/filter', filterRoutes);         // 2 Endpoints
app.use('/api/generate', generateRoutes);     // 3 Endpoints
app.use('/api/profile', profileRoutes);       // 4 Endpoints
app.use('/api/sync', syncRoutes);             // 2 Endpoints
app.use('/api/data', dataRoutes);             // 4 Endpoints

// ═══════════════════════════════════════════════════════════════════════════
// ERROR HANDLING
// ═══════════════════════════════════════════════════════════════════════════

// 404 Handler
app.use((req, res) => {
    res.status(404).json({
        error: 'Not Found',
        path: req.path
    });
});

// Error Handler
app.use((err, req, res, next) => {
    console.error('[ERROR]', err);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

// ═══════════════════════════════════════════════════════════════════════════
// START SERVER
// ═══════════════════════════════════════════════════════════════════════════

async function start() {
    try {
        // Datenbank initialisieren
        await initDatabase();
        console.log('[DB] SQLite initialisiert');

        // Archetyp-Profile laden und in Berechnungs-Module injizieren
        const archetypeProfiles = loadArchetypeProfiles();
        MatrixCalculator.setProfiles(archetypeProfiles);
        NeedsIntegration.setBaseArchetypProfile(archetypeProfiles);
        MatrixCalculator.generateArchetypeMatrix(archetypeProfiles);
        console.log('[Matrix] 8×8 Archetyp-Matrix vorberechnet');

        // Server starten
        app.listen(PORT, () => {
            console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                    TIAGE API SERVER                           ║
╠═══════════════════════════════════════════════════════════════╣
║  Status:    RUNNING                                           ║
║  Port:      ${PORT}                                              ║
║  Endpoints: 19 + 1 (health)                                   ║
║  Database:  SQLite                                            ║
╚═══════════════════════════════════════════════════════════════╝
            `);
        });
    } catch (error) {
        console.error('[FATAL] Server konnte nicht gestartet werden:', error);
        process.exit(1);
    }
}

start();
