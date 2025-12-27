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

// Routes
import calculateRoutes from './routes/calculate.js';
import sortRoutes from './routes/sort.js';
import filterRoutes from './routes/filter.js';
import generateRoutes from './routes/generate.js';
import profileRoutes from './routes/profile.js';
import syncRoutes from './routes/sync.js';
import dataRoutes from './routes/data.js';

// Database
import { initDatabase } from './db/init.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ═══════════════════════════════════════════════════════════════════════════
// MIDDLEWARE
// ═══════════════════════════════════════════════════════════════════════════

app.use(cors());
app.use(express.json());

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
