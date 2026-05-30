/**
 * TRANSLATE WISDOM TEXTS VIA DEEPL API
 *
 * Translates tiage + reflexion texts from osho-zen-beduerfnisse.json
 * and strategie texts from beduerfnis-katalog.json into EN, FR, IT, RU, ES.
 *
 * Usage:
 *   node scripts/translate-wisdom.js YOUR_DEEPL_API_KEY
 *
 * Output:
 *   profiles/data/osho-zen-beduerfnisse-en.json  (v4 format)
 *   profiles/data/osho-zen-beduerfnisse-fr.json  (v4 format)
 *   profiles/data/osho-zen-beduerfnisse-it.json  (v4 format)
 *   profiles/data/osho-zen-beduerfnisse-ru.json  (new)
 *   profiles/data/osho-zen-beduerfnisse-es.json  (new)
 *   profiles/data/beduerfnis-katalog-translations.json  (strategie strings)
 */

'use strict';

const https  = require('https');
const fs     = require('fs');
const path   = require('path');

// ─── CONFIG ────────────────────────────────────────────────────────────────

const API_KEY = process.argv[2];
if (!API_KEY) {
    console.error('Usage: node scripts/translate-wisdom.js YOUR_DEEPL_API_KEY');
    process.exit(1);
}

// Free-tier keys end with :fx → use api-free.deepl.com
const IS_FREE = API_KEY.endsWith(':fx');
const API_HOST = IS_FREE ? 'api-free.deepl.com' : 'api.deepl.com';
console.log(`Using DeepL ${IS_FREE ? 'Free' : 'Pro'} API at ${API_HOST}`);

const TARGETS = [
    { lang: 'EN', code: 'en', deepl: 'EN-US' },
    { lang: 'FR', code: 'fr', deepl: 'FR'    },
    { lang: 'IT', code: 'it', deepl: 'IT'    },
    { lang: 'RU', code: 'ru', deepl: 'RU'    },
    { lang: 'ES', code: 'es', deepl: 'ES'    }
];

const BASE   = path.join(__dirname, '..');
const DE_FILE   = path.join(BASE, 'profiles/data/osho-zen-beduerfnisse.json');
const CAT_FILE  = path.join(BASE, 'profiles/data/beduerfnis-katalog.json');
const OUT_DIR   = path.join(BASE, 'profiles/data');

// ─── DEEPL CALL ────────────────────────────────────────────────────────────

let _usedChars = 0;

/**
 * Translates an array of strings in one batch call.
 * Returns array of translated strings in same order.
 */
function translateBatch(texts, targetLang) {
    return new Promise((resolve, reject) => {
        // Build POST body: text[]=...&text[]=...
        const params = texts
            .map(t => `text=${encodeURIComponent(t)}`)
            .join('&')
            + `&source_lang=DE`
            + `&target_lang=${targetLang}`
            + `&preserve_formatting=1`
            + `&tag_handling=xml`;

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
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    reject(new Error(`DeepL HTTP ${res.statusCode}: ${data}`));
                    return;
                }
                try {
                    const json = JSON.parse(data);
                    const translated = json.translations.map(t => t.text);
                    _usedChars += texts.reduce((sum, t) => sum + t.length, 0);
                    resolve(translated);
                } catch (e) {
                    reject(new Error('DeepL parse error: ' + e.message));
                }
            });
        });

        req.on('error', reject);
        req.write(body);
        req.end();
    });
}

// ─── EXTRACT TEXTS ─────────────────────────────────────────────────────────

function extractWisdomTexts(deData) {
    const needs = deData.beduerfnisse;
    // Returns flat list of {needId, variantKey, field, text}
    const items = [];

    Object.keys(needs).forEach(needId => {
        const need = needs[needId];
        if (!need.varianten) return;

        Object.keys(need.varianten).forEach(vk => {
            const v = need.varianten[vk];
            if (v.tiage)     items.push({ needId, vk, field: 'tiage',     text: v.tiage });
            if (v.reflexion) items.push({ needId, vk, field: 'reflexion', text: v.reflexion });
        });
    });

    return items;
}

function extractStrategien(catData) {
    return Object.keys(catData.beduerfnisse)
        .filter(id => catData.beduerfnisse[id].strategie)
        .map(id => ({
            needId: id,
            key: catData.beduerfnisse[id].key,
            text: catData.beduerfnisse[id].strategie
        }));
}

// ─── BUILD OUTPUT FILES ────────────────────────────────────────────────────

function buildWisdomOutput(deData, translations, target) {
    const needs = deData.beduerfnisse;
    const out = {
        version: deData.version || '4.0.0',
        sprache: target.code,
        beschreibung: `Ti-age Bedürfnis-Weisheitstexte – ${target.lang}`,
        beduerfnisse: {}
    };

    Object.keys(needs).forEach(needId => {
        const need = needs[needId];
        if (!need.varianten) return;

        out.beduerfnisse[needId] = {
            label: need.label,  // will be looked up via i18n separately
            varianten: {}
        };

        Object.keys(need.varianten).forEach(vk => {
            const v = need.varianten[vk];
            out.beduerfnisse[needId].varianten[vk] = {};

            // Copy non-text fields
            ['kontext', 'bild', 'karte', 'karte_de', 'karte_key', 'karte_nummer'].forEach(f => {
                if (v[f] !== undefined) out.beduerfnisse[needId].varianten[vk][f] = v[f];
            });

            // Translated text fields
            if (translations[needId] && translations[needId][vk]) {
                const t = translations[needId][vk];
                if (t.tiage)     out.beduerfnisse[needId].varianten[vk].tiage     = t.tiage;
                if (t.reflexion) out.beduerfnisse[needId].varianten[vk].reflexion = t.reflexion;
            }
        });
    });

    return out;
}

// ─── MAIN ──────────────────────────────────────────────────────────────────

async function main() {
    console.log('\n=== Ti-age Wisdom Text Translator ===\n');

    // Load source files
    const deData  = JSON.parse(fs.readFileSync(DE_FILE,  'utf8'));
    const catData = JSON.parse(fs.readFileSync(CAT_FILE, 'utf8'));

    const wisdomItems  = extractWisdomTexts(deData);
    const strategien   = extractStrategien(catData);

    const totalTexts   = wisdomItems.length + strategien.length;
    const totalChars   = [...wisdomItems, ...strategien].reduce((s, i) => s + i.text.length, 0);

    console.log(`Source texts: ${totalTexts} strings (${totalChars} chars)`);
    console.log(`Target languages: ${TARGETS.map(t => t.code).join(', ')}`);
    console.log(`Estimated total chars: ${totalTexts * TARGETS.length} strings, ~${totalChars * TARGETS.length} chars`);
    console.log('');

    const allStrategienTranslations = {};

    for (const target of TARGETS) {
        console.log(`\n── Translating → ${target.lang} ──`);

        // 1. Translate wisdom texts in one batch
        const wisdomTexts = wisdomItems.map(i => i.text);
        console.log(`  Wisdom batch: ${wisdomTexts.length} texts...`);
        const wisdomTranslated = await translateBatch(wisdomTexts, target.deepl);

        // Rebuild into nested structure
        const translations = {};
        wisdomItems.forEach((item, idx) => {
            if (!translations[item.needId]) translations[item.needId] = {};
            if (!translations[item.needId][item.vk]) translations[item.needId][item.vk] = {};
            translations[item.needId][item.vk][item.field] = wisdomTranslated[idx];
        });

        // 2. Translate Strategien
        const stratTexts = strategien.map(s => s.text);
        console.log(`  Strategien batch: ${stratTexts.length} texts...`);
        const stratTranslated = await translateBatch(stratTexts, target.deepl);
        strategien.forEach((s, idx) => {
            if (!allStrategienTranslations[s.needId]) allStrategienTranslations[s.needId] = {};
            allStrategienTranslations[s.needId][target.code] = stratTranslated[idx];
        });

        // 3. Build output file
        const output = buildWisdomOutput(deData, translations, target);
        const outPath = path.join(OUT_DIR, `osho-zen-beduerfnisse-${target.code}.json`);
        fs.writeFileSync(outPath, JSON.stringify(output, null, 2), 'utf8');

        const sizeKB = Math.round(fs.statSync(outPath).size / 1024);
        console.log(`  ✓ Written: ${path.basename(outPath)} (${sizeKB}KB)`);

        // Small delay to be polite to the API
        if (target !== TARGETS[TARGETS.length - 1]) {
            await new Promise(r => setTimeout(r, 500));
        }
    }

    // 4. Write combined Strategien translations
    const stratOut = {
        version: '4.0.0',
        beschreibung: 'Strategie translations for beduerfnis-katalog.json',
        strategien: {}
    };
    strategien.forEach(s => {
        stratOut.strategien[s.needId] = {
            key: s.key,
            de: s.text,
            ...Object.fromEntries(Object.entries(allStrategienTranslations[s.needId] || {}).map(([lang, text]) => [lang, text]))
        };
    });
    const stratPath = path.join(OUT_DIR, 'beduerfnis-katalog-translations.json');
    fs.writeFileSync(stratPath, JSON.stringify(stratOut, null, 2), 'utf8');
    console.log(`\n✓ Written: beduerfnis-katalog-translations.json`);

    console.log(`\n=== Done! Used ~${_usedChars} chars ===`);
    console.log(`Generated files in profiles/data/`);
}

main().catch(err => {
    console.error('\n❌ Error:', err.message);
    process.exit(1);
});
