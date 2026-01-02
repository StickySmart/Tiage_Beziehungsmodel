/**
 * TIAGE Server - Orientation Factor (SSOT Wrapper)
 *
 * SSOT (Single Source of Truth):
 * Die Orientierungs-Logik ist in js/synthesis/factors/orientationFactor.js definiert.
 * Dieser Wrapper macht sie für den Server als ES Module verfügbar.
 *
 * KEINE EIGENE LOGIK HIER - nur Re-Export der Client-Logik!
 */

import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import vm from 'vm';

// Pfad zur SSOT-Datei (Client-seitige Orientierungs-Logik)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const SSOT_PATH = join(__dirname, '../../js/synthesis/factors/orientationFactor.js');

// Globale Variablen simulieren für Browser-Code
const TiageSynthesis = {
    Factors: {},
    Constants: {
        ORIENTATION: {
            COMPATIBLE: 100,
            EXPLORING: 70,
            UNLIKELY: 30,
            INCOMPATIBLE: 10,
            HARD_KO: 0
        }
    }
};

// Client-Code laden und ausführen
let orientationFactor = null;

function loadOrientationFactor() {
    if (orientationFactor) return orientationFactor;

    try {
        const code = readFileSync(SSOT_PATH, 'utf-8');

        // Kontext für die Ausführung erstellen
        const context = {
            TiageSynthesis: TiageSynthesis,
            console: console
        };

        // Code im Kontext ausführen
        vm.createContext(context);
        vm.runInContext(code, context);

        // Orientierungs-Faktor extrahieren
        orientationFactor = context.TiageSynthesis.Factors.Orientierung;

        console.log('[SSOT] OrientationFactor geladen von:', SSOT_PATH);
        return orientationFactor;
    } catch (error) {
        console.error('[SSOT] Fehler beim Laden von OrientationFactor:', error);
        throw error;
    }
}

// ═══════════════════════════════════════════════════════════════════════════
// EXPORTS - Gleiche API wie Client-seitige Implementierung
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Berechnet die Orientierungs-Kompatibilität
 *
 * @param {object} person1 - { geschlecht, orientierung }
 * @param {object} person2 - { geschlecht, orientierung }
 * @param {object} constants - Optional: TiageSynthesis.Constants (für Score-Werte)
 * @returns {object} { score: 0-100, details: {...} }
 */
export function calculate(person1, person2, constants = null) {
    const factor = loadOrientationFactor();

    // Constants überschreiben wenn übergeben
    if (constants && constants.ORIENTATION) {
        TiageSynthesis.Constants = constants;
    }

    return factor.calculate(person1, person2);
}

/**
 * Extrahiert Orientierungen aus Person-Objekt
 * (Für Tests und Debugging)
 */
export function extractOrientations(person) {
    const factor = loadOrientationFactor();
    return factor._extractOrientations(person);
}

/**
 * Extrahiert effektives Geschlecht
 * (Für Tests und Debugging)
 */
export function extractGeschlecht(geschlecht) {
    const factor = loadOrientationFactor();
    return factor._extractGeschlecht(geschlecht);
}

/**
 * Prüft einzelnes Orientierungs-Paar
 * (Für Tests und Debugging)
 */
export function checkSinglePair(type1, status1, type2, status2, g1, g2) {
    const factor = loadOrientationFactor();
    return factor._checkSinglePair(type1, status1, type2, status2, g1, g2);
}

/**
 * Setzt Constants für Score-Berechnung
 * (Für Server-Integration)
 */
export function setConstants(constants) {
    if (constants && constants.ORIENTATION) {
        TiageSynthesis.Constants = constants;
    }
}

// Default export für einfache Nutzung
export default {
    calculate,
    extractOrientations,
    extractGeschlecht,
    checkSinglePair,
    setConstants
};
