/**
 * Vercel Serverless Function: /api/health
 * Health-Check Endpoint
 */

export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    return res.status(200).json({
        status: 'ok',
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        runtime: 'vercel-serverless'
    });
}
