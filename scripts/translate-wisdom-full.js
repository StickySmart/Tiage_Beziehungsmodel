/**
 * TRANSLATE WISDOM TEXTS - FULL (Traditions + Tarot)
 *
 * Phase 2: Adds traditionen texts to existing wisdom files
 *          and creates tarot-karten RU + ES files.
 *
 * Usage:
 *   node scripts/translate-wisdom-full.js YOUR_DEEPL_API_KEY
 *
 * What this does:
 *   1. Translates v.traditionen.{christentum,buddhismus,islam,osho,moderne,pirsig}
 *      into EN/FR/IT/RU/ES and merges into existing osho-zen-beduerfnisse-{lang}.json
 *   2. Creates osho-zen-tarot-karten-ru.json and osho-zen-tarot-karten-es.json
 *
 * Does NOT re-translate tiage/reflexion (already done in phase 1).
 */

'use strict';

const https = require('https');
const fs    = require('fs');
const path  = require('path');

// ─── CONFIG ────────────────────────────────────────────────────────────────

const API_KEY = process.argv[2];
if (!API_KEY) {
    console.error('Usage: node scripts/translate-wisdom-full.js YOUR_DEEPL_API_KEY');
    process.exit(1);
}

const IS_FREE   = API_KEY.endsWith(':fx');
const API_HOST  = IS_FREE ? 'api-free.deepl.com' : 'api.deepl.com';
console.log(`Using DeepL ${IS_FREE ? 'Free' : 'Pro'} API at ${API_HOST}\n`);

const WISDOM_LANGS = [
    { code: 'en', deepl: 'EN-US' },
    { code: 'fr', deepl: 'FR'    },
    { code: 'it', deepl: 'IT'    },
    { code: 'ru', deepl: 'RU'    },
    { code: 'es', deepl: 'ES'    }
];

const TAROT_LANGS = [
    { code: 'ru', deepl: 'RU' },
    { code: 'es', deepl: 'ES' }
];

const TRAD_KEYS     = ['christentum','buddhismus','islam','osho','moderne','pirsig'];
const TAROT_FIELDS  = ['bild','bedeutung','weisheit','osho','schatten'];
const TAROT_SECS    = ['major_arcana','minor_arcana','zusaetzliche_karten'];

const BASE      = path.join(__dirname, '..');
const DATA_DIR  = path.join(BASE, 'profiles/data');

// ─── DEEPL ─────────────────────────────────────────────────────────────────

let _usedChars = 0;

function translateBatch(texts, targetLang) {
    // Filter empties, remember positions
    const nonEmpty = [];
    const indices  = [];
    texts.forEach((t, i) => { if (t && t.trim()) { nonEmpty.push(t); indices.push(i); } });
    if (!nonEmpty.length) return Promise.resolve(texts.map(() => ''));

    return new Promise((resolve, reject) => {
        const params = nonEmpty
            .map(t => 'text=' + encodeURIComponent(t))
            .join('&')
            + `&source_lang=DE&target_lang=${targetLang}&preserve_formatting=1`;

        const body = Buffer.from(params);
        const options = {
            hostname: API_HOST,
            path: '/v2/translate',
            method: 'POST',
            headers: {
                'Authorization': `DeepL-Auth-Key ${API_KEY}`,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': body.length
            }
        };

        const req = https.request(options, res => {
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    reject(new Error(`DeepL HTTP ${res.statusCode}: ${data}`));
                    return;
                }
                try {
                    const json = JSON.parse(data);
                    _usedChars += nonEmpty.reduce((s, t) => s + t.length, 0);
                    const result = texts.map(() => '');
                    json.translations.forEach((t, i) => { result[indices[i]] = t.text; });
                    resolve(result);
                } catch (e) { reject(e); }
            });
        });
        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

// ─── STEP 1: TRADITION TEXTS ───────────────────────────────────────────────

async function translateTraditions() {
    console.log('════ STEP 1: Tradition Texts ════\n');

    const de = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'osho-zen-beduerfnisse.json'), 'utf8'));
    const needs = de.beduerfnisse;

    // Build flat list: [{needId, vk, tradKey, text}]
    const items = [];
    Object.keys(needs).forEach(needId => {
        const n = needs[needId];
        if (!n.varianten) return;
        Object.keys(n.varianten).forEach(vk => {
            const v = n.varianten[vk];
            if (!v.traditionen) return;
            TRAD_KEYS.forEach(tk => {
                if (v.traditionen[tk]) {
                    items.push({ needId, vk, tradKey: tk, text: v.traditionen[tk] });
                }
            });
        });
    });

    const totalChars = items.reduce((s, i) => s + i.text.length, 0);
    console.log(`  ${items.length} tradition texts, ${totalChars} chars per language\n`);

    for (const target of WISDOM_LANGS) {
        console.log(`  → ${target.code.toUpperCase()} ...`);

        // Translate all tradition texts
        const translated = await translateBatch(items.map(i => i.text), target.deepl);

        // Build lookup: needId → vk → tradKey → translated
        const lookup = {};
        items.forEach((item, idx) => {
            if (!lookup[item.needId]) lookup[item.needId] = {};
            if (!lookup[item.needId][item.vk]) lookup[item.needId][item.vk] = {};
            lookup[item.needId][item.vk][item.tradKey] = translated[idx];
        });

        // Load existing file and merge
        const outPath = path.join(DATA_DIR, `osho-zen-beduerfnisse-${target.code}.json`);
        const existing = JSON.parse(fs.readFileSync(outPath, 'utf8'));

        Object.keys(needs).forEach(needId => {
            const n = needs[needId];
            if (!n.varianten) return;
            if (!existing.beduerfnisse[needId]) return;

            Object.keys(n.varianten).forEach(vk => {
                const v = n.varianten[vk];
                if (!v.traditionen) return;
                if (!existing.beduerfnisse[needId].varianten[vk]) return;

                const tradTranslated = lookup[needId] && lookup[needId][vk];
                if (!tradTranslated) return;

                existing.beduerfnisse[needId].varianten[vk].traditionen = tradTranslated;
            });
        });

        fs.writeFileSync(outPath, JSON.stringify(existing, null, 2), 'utf8');
        const sizeKB = Math.round(fs.statSync(outPath).size / 1024);
        console.log(`    ✓ Updated ${path.basename(outPath)} (${sizeKB}KB)`);

        await new Promise(r => setTimeout(r, 300));
    }
    console.log('');
}

// ─── STEP 2: TAROT KARTEN ──────────────────────────────────────────────────

async function translateTarot() {
    console.log('════ STEP 2: Tarot Karten (RU + ES) ════\n');

    const de = JSON.parse(fs.readFileSync(path.join(DATA_DIR, 'osho-zen-tarot-karten.json'), 'utf8'));

    for (const target of TAROT_LANGS) {
        console.log(`  → ${target.code.toUpperCase()} ...`);

        // Collect all text fields in order
        const items = []; // [{sec, key, field, text}]
        TAROT_SECS.forEach(sec => {
            if (!de[sec]) return;
            Object.keys(de[sec]).forEach(k => {
                const card = de[sec][k];
                TAROT_FIELDS.forEach(f => {
                    if (card[f]) items.push({ sec, key: k, field: f, text: card[f] });
                });
            });
        });

        // Translate all in one batch
        const translated = await translateBatch(items.map(i => i.text), target.deepl);

        // Build output — copy DE structure, replace text fields
        const out = {
            version:     de.version,
            sprache:     target.code,
            beschreibung: de.beschreibung,
            quelle:      de.quelle,
            kuenstlerin: de.kuenstlerin,
            copyright:   de.copyright
        };

        TAROT_SECS.forEach(sec => {
            if (!de[sec]) return;
            out[sec] = {};
            Object.keys(de[sec]).forEach(k => {
                const card = de[sec][k];
                out[sec][k] = {};
                // Copy non-translated fields
                Object.keys(card).forEach(f => {
                    if (!TAROT_FIELDS.includes(f)) out[sec][k][f] = card[f];
                });
            });
        });

        // Fill in translations
        items.forEach((item, idx) => {
            out[item.sec][item.key][item.field] = translated[idx];
        });

        const outPath = path.join(DATA_DIR, `osho-zen-tarot-karten-${target.code}.json`);
        fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
        const sizeKB = Math.round(fs.statSync(outPath).size / 1024);
        console.log(`    ✓ Written ${path.basename(outPath)} (${sizeKB}KB)`);

        await new Promise(r => setTimeout(r, 300));
    }
    console.log('');
}

// ─── MAIN ──────────────────────────────────────────────────────────────────

async function main() {
    console.log('=== Ti-age Full Wisdom Translator (Phase 2) ===\n');

    await translateTraditions();
    await translateTarot();

    console.log(`=== Done! Used ~${_usedChars} chars this run ===`);
}

main().catch(err => {
    console.error('\n❌ Error:', err.message);
    process.exit(1);
});
