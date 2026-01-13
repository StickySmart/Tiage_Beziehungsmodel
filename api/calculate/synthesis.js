/**
 * Vercel Serverless Function: /api/calculate/synthesis
 *
 * TIAGE Q-Formel Berechnung (Server-Side)
 * Q = [(O × wO × R1) + (A × wA × R2) + (D × wD × R3) + (G × wG × R4)]
 */

// ═══════════════════════════════════════════════════════════════════════════
// KONSTANTEN (SSOT - gespiegelt von js/synthesis/constants.js)
// ═══════════════════════════════════════════════════════════════════════════

const ARCHETYP_MATRIX = {
    'protector':   { 'protector': 60, 'caregiver': 85, 'companion': 75, 'romantic': 70, 'explorer': 55, 'independent': 45, 'networker': 50, 'duo': 65 },
    'caregiver':   { 'protector': 85, 'caregiver': 70, 'companion': 80, 'romantic': 75, 'explorer': 60, 'independent': 50, 'networker': 55, 'duo': 70 },
    'companion':   { 'protector': 75, 'caregiver': 80, 'companion': 85, 'romantic': 80, 'explorer': 70, 'independent': 55, 'networker': 65, 'duo': 75 },
    'romantic':    { 'protector': 70, 'caregiver': 75, 'companion': 80, 'romantic': 90, 'explorer': 65, 'independent': 45, 'networker': 60, 'duo': 80 },
    'explorer':    { 'protector': 55, 'caregiver': 60, 'companion': 70, 'romantic': 65, 'explorer': 80, 'independent': 75, 'networker': 85, 'duo': 70 },
    'independent': { 'protector': 45, 'caregiver': 50, 'companion': 55, 'romantic': 45, 'explorer': 75, 'independent': 70, 'networker': 65, 'duo': 55 },
    'networker':   { 'protector': 50, 'caregiver': 55, 'companion': 65, 'romantic': 60, 'explorer': 85, 'independent': 65, 'networker': 75, 'duo': 70 },
    'duo':         { 'protector': 65, 'caregiver': 70, 'companion': 75, 'romantic': 80, 'explorer': 70, 'independent': 55, 'networker': 70, 'duo': 95 }
};

const DOMINANCE_MATRIX = {
    'dominant':  { 'dominant': 40, 'switch': 75, 'submissiv': 95 },
    'switch':    { 'dominant': 75, 'switch': 85, 'submissiv': 75 },
    'submissiv': { 'dominant': 95, 'switch': 75, 'submissiv': 40 }
};

const ORIENTATION_COMPATIBILITY = {
    'heterosexuell': { 'heterosexuell': 100, 'homosexuell': 0, 'bisexuell': 100, 'pansexuell': 100 },
    'homosexuell':   { 'heterosexuell': 0, 'homosexuell': 100, 'bisexuell': 100, 'pansexuell': 100 },
    'bisexuell':     { 'heterosexuell': 100, 'homosexuell': 100, 'bisexuell': 100, 'pansexuell': 100 },
    'pansexuell':    { 'heterosexuell': 100, 'homosexuell': 100, 'bisexuell': 100, 'pansexuell': 100 }
};

const DEFAULT_WEIGHTS = { O: 25, A: 25, D: 25, G: 25 };

// ═══════════════════════════════════════════════════════════════════════════
// HILFSFUNKTIONEN
// ═══════════════════════════════════════════════════════════════════════════

function combineRFactors(R_ich, R_partner) {
    const a = R_ich || 1.0;
    const b = R_partner || 1.0;
    const summe = a + b;
    const similarity = Math.min(a, b) / Math.max(a, b);
    const combined = (summe * similarity) / 2;
    return Math.round(combined * 1000) / 1000;
}

function getArchetypeScore(arch1, arch2) {
    if (!arch1 || !arch2) return 50;
    const row = ARCHETYP_MATRIX[arch1.toLowerCase()];
    if (!row) return 50;
    return row[arch2.toLowerCase()] || 50;
}

function getDominanceScore(dom1, dom2) {
    const d1 = dom1?.gelebt || dom1 || 'switch';
    const d2 = dom2?.gelebt || dom2 || 'switch';
    const row = DOMINANCE_MATRIX[d1.toLowerCase()];
    if (!row) return 85;
    return row[d2.toLowerCase()] || 85;
}

function getOrientationScore(ori1, ori2, gender1, gender2) {
    const o1 = ori1?.primary || ori1 || 'heterosexuell';
    const o2 = ori2?.primary || ori2 || 'heterosexuell';
    const g1 = gender1?.primary || gender1 || 'mann';
    const g2 = gender2?.primary || gender2 || 'frau';

    // Grundkompatibilität
    const row = ORIENTATION_COMPATIBILITY[o1.toLowerCase()];
    if (!row) return 100;
    const baseScore = row[o2.toLowerCase()];
    if (baseScore === 0) return 0;

    // Geschlechter-Check für Hetero/Homo
    if (o1 === 'heterosexuell' && o2 === 'heterosexuell') {
        if (g1 === g2) return 0; // Gleiches Geschlecht bei Hetero
    }
    if (o1 === 'homosexuell' && o2 === 'homosexuell') {
        if (g1 !== g2) return 0; // Unterschiedliches Geschlecht bei Homo
    }

    return baseScore;
}

function getGenderScore(gender1, gender2) {
    // Vereinfachte Gender-Kompatibilität
    return 100;
}

// ═══════════════════════════════════════════════════════════════════════════
// HAUPTBERECHNUNG
// ═══════════════════════════════════════════════════════════════════════════

function calculate(person1, person2, options = {}) {
    const weights = options.weights || DEFAULT_WEIGHTS;
    const gewSum = (weights.O || 0) + (weights.A || 0) + (weights.D || 0) + (weights.G || 0);
    const gewDivisor = gewSum > 0 ? gewSum : 100;

    const wO = (weights.O || 25) / gewDivisor;
    const wA = (weights.A || 25) / gewDivisor;
    const wD = (weights.D || 25) / gewDivisor;
    const wG = (weights.G || 25) / gewDivisor;

    // Basis-Scores
    const orientationScore = getOrientationScore(
        person1.orientierung, person2.orientierung,
        person1.geschlecht, person2.geschlecht
    );

    if (orientationScore === 0) {
        return {
            score: 0,
            blocked: true,
            reason: 'Keine körperliche Anziehung möglich',
            breakdown: { archetyp: 0, dominanz: 0, orientierung: 0, geschlecht: 0 },
            resonanz: { R1: 0, R2: 0, R3: 0, R4: 0 }
        };
    }

    const archetypeScore = getArchetypeScore(person1.archetyp, person2.archetyp);
    const dominanceScore = getDominanceScore(person1.dominanz, person2.dominanz);
    const genderScore = getGenderScore(person1.geschlecht, person2.geschlecht);

    // R-Faktoren (Standard: 1.0)
    const R1 = 1.0, R2 = 1.0, R3 = 1.0, R4 = 1.0;

    // Score-Berechnung
    const scoreO = orientationScore * wO * R1;
    const scoreA = archetypeScore * wA * R2;
    const scoreD = dominanceScore * wD * R3;
    const scoreG = genderScore * wG * R4;

    const totalScore = scoreO + scoreA + scoreD + scoreG;

    return {
        score: Math.round(totalScore * 10) / 10,
        blocked: false,
        breakdown: {
            archetyp: archetypeScore,
            dominanz: dominanceScore,
            orientierung: orientationScore,
            geschlecht: genderScore
        },
        resonanz: {
            R1: Math.round(R1 * 100) / 100,
            R2: Math.round(R2 * 100) / 100,
            R3: Math.round(R3 * 100) / 100,
            R4: Math.round(R4 * 100) / 100
        },
        scoreDetails: {
            O: Math.round(scoreO * 10) / 10,
            A: Math.round(scoreA * 10) / 10,
            D: Math.round(scoreD * 10) / 10,
            G: Math.round(scoreG * 10) / 10
        },
        _source: 'server',
        _version: '1.0.0'
    };
}

// ═══════════════════════════════════════════════════════════════════════════
// VERCEL SERVERLESS HANDLER
// ═══════════════════════════════════════════════════════════════════════════

export default function handler(req, res) {
    // CORS Headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Nur POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { ich, partner, options } = req.body || {};

        if (!ich || !partner) {
            return res.status(400).json({
                error: 'Missing required fields: ich, partner'
            });
        }

        const result = calculate(ich, partner, options);

        return res.status(200).json({
            success: true,
            result: result
        });

    } catch (error) {
        console.error('[API] Synthesis calculation error:', error);
        return res.status(500).json({
            error: 'Calculation failed',
            message: error.message
        });
    }
}
