#!/usr/bin/env node
/**
 * DALL-E Bildgenerator für 226 Bedürfnis-Karten
 *
 * Verwendung:
 *   OPENAI_API_KEY=sk-xxx node scripts/generate-beduerfnis-images.js
 *
 * Optionen:
 *   --start=N     Starte bei Bild N (default: 1)
 *   --end=N       Ende bei Bild N (default: 226)
 *   --dry-run     Nur Prompts anzeigen, nichts generieren
 *   --delay=N     Pause zwischen Bildern in ms (default: 2000)
 *
 * Kosten: ~$0.04 pro Bild = ~$9.04 für alle 226 Bilder
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

// Konfiguration
const CONFIG = {
    outputDir: path.join(__dirname, '..', 'assets', 'images', 'beduerfnisse'),
    mappingFile: path.join(__dirname, '..', 'assets', 'images', 'beduerfnisse', 'image-mapping.json'),
    model: 'dall-e-3',
    size: '1024x1792', // Hochformat, wird später auf 400x600 skaliert
    quality: 'standard',
    delayBetweenRequests: 2000, // 2 Sekunden zwischen Anfragen
};

// Basis-Stil für alle Bilder
const STYLE_PREFIX = `Mystical Osho Zen Tarot card illustration, spiritual meditation art,
soft ethereal lighting, warm earth tones with deep purple and gold accents,
contemplative sacred atmosphere, symbolic mystical imagery,
digital painting style, centered composition, no text, no words, no letters, no writing`;

// Prompt-Templates für jede Karte
const CARD_PROMPTS = {
    "The Master": "an enlightened wise figure radiating infinite peace, surrounded by cosmic light and disciples",
    "Healing": "gentle healing energy flowing like water, crystals emanating soft blue light, lotus flowers",
    "Conditioning": "roots breaking through old stone patterns, transformation of conditioned mind",
    "Adventure": "a figure stepping boldly into vast unknown landscape, sunrise of possibilities",
    "Touch": "two hands meeting with golden healing light between them, intimate energy connection",
    "No-Thingness": "vast peaceful void with single meditating figure, starfield of pure potential",
    "Passion": "sacred flames of creative fire rising like kundalini energy, red and gold",
    "Courage": "a delicate flower blooming through solid rock, strength in vulnerability",
    "Harmony": "perfect balance of elements, peaceful sanctuary with golden light dome",
    "Completion": "perfect luminous circle, seasons merging into wholeness, eternal cycle",
    "Trust": "figure leaping into cosmic void with serene faith, golden safety net of light",
    "Protection": "gentle guardian energy surrounding vulnerable being, soft protective shield",
    "Maturity": "ancient wise tree with deep roots and expansive branches, grounded presence",
    "Playfulness": "dancing light particles, childlike joy energy, feathers floating freely",
    "We Are the World": "interconnected web of luminous souls, global unity consciousness",
    "Warmth": "gentle sun rays embracing figure, heart radiating golden comfort light",
    "Success": "figure seen in true radiant essence, inner worth shining brightly",
    "The Lovers": "two souls in sacred intimate connection, energy bridge between hearts",
    "Participation": "figures in harmonious gathering circle, shared creation energy",
    "Intimacy": "souls revealing essence to each other, deep vulnerable beauty",
    "Love": "expansive heart energy filling infinite space, unconditional radiance",
    "Compassion": "hands offering healing light selflessly, nurturing energy flow",
    "Support": "invisible loving hands holding figure, foundation of cosmic trust",
    "Friendliness": "two figures in comfortable peaceful silence together, gentle presence",
    "Acceptance": "figure breathing freely in total release, embracing what is",
    "Receptivity": "empty golden chalice ready to receive, heart as open vessel",
    "Change": "butterfly emerging from cocoon, trusting beautiful transformation",
    "Awareness": "conscious luminous eye seeing deeply, focused attention beam",
    "Understanding": "bridge of light between two minds, hearts speaking same language",
    "Rebirth": "phoenix rising from ashes, old dissolving for glorious new",
    "Aloneness": "figure in peaceful sacred solitude, sovereignty of sovereign self",
    "Transformation": "crossroads with multiple glowing paths, power of conscious choice",
    "The Rebel": "figure walking own authentic path against crowd, inner truth compass",
    "Going With The Flow": "figure flowing with cosmic river current, natural ease",
    "Ripeness": "fruit at perfect golden maturity, significance revealed beautifully",
    "Creativity": "soul speaking through artistic form, endless creative universe flow",
    "Integration": "all parts coming together in joyful wholeness, unified being",
    "Celebration": "life as ecstatic festival, joyful existence celebration",
    "Source": "inner wellspring of light, deep motivation and inspiration rising",
    "Inner Voice": "wisdom whispering from heart center, intuitive sacred guidance",
    "Sorrow": "rain of grief flowing as cleansing tears, emotional healing release",
    "New Vision": "perspective shifting dramatically, fresh insight dawning",
    "Control": "releasing control to gain true mastery, flowing non-grasping power",
    "Letting Go": "empty open hands ready to receive, surrender liberation",
    "Guidance": "lighting the path walked, authentic inspiring leadership",
    "Intensity": "pure life force burning brightly, fully alive present moment",
    "Flowering": "life wanting to bloom magnificently, creative generative desire",
    "Slowing Down": "peaceful stillness, unhurried being in quiet freedom",
    "Commitment": "conscious sacred yes, all-seasons eternal promise",
    "Traveling": "freedom of joyful movement, unfolding journey adventure",
    "Experiencing": "fully living intense experience, vibrant life abundance",
    "Ordinariness": "sacred in the ordinary everyday, mundane becomes divine",
    "Abundance": "overflowing golden prosperity, material and spiritual wealth",
    "Totality": "complete wholehearted commitment, full presence engagement",
    "Silence": "deep profound stillness, meaning emerging from quiet",
    "Sharing": "giving from overflowing abundance, natural generous contribution",
    "Breakthrough": "fog lifting suddenly, clear vision finally emerging",
    "The Creator": "mastery developing through loving practice, creative competence",
    "Consciousness": "vast sky mind, thoughts as passing clouds, pure awareness",
    "Turning In": "inward sacred turning, pause for profound depth",
    "Possibilities": "infinite doors opening, limitless potential paths",
    "Compromise": "wise flexible balancing, healthy mutual adjustment",
    "Patience": "patient seeds growing, trusting future harvest timing",
    "Moment to Moment": "only eternal now exists, present moment perfection",
    "Surrender": "complete letting go into trust, paradox of bound freedom"
};

// Lade das Mapping
function loadMapping() {
    const data = fs.readFileSync(CONFIG.mappingFile, 'utf8');
    return JSON.parse(data);
}

// Erstelle den vollständigen Prompt für ein Bedürfnis
function createPrompt(info) {
    const cardPrompt = CARD_PROMPTS[info.karte] || `mystical ${info.karte} tarot card energy`;
    return `${STYLE_PREFIX}, representing "${info.label}" (${info.karte}): ${cardPrompt}`;
}

// API-Aufruf an DALL-E
async function generateImage(prompt, filename) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        throw new Error('OPENAI_API_KEY Umgebungsvariable nicht gesetzt!');
    }

    const requestBody = JSON.stringify({
        model: CONFIG.model,
        prompt: prompt,
        n: 1,
        size: CONFIG.size,
        quality: CONFIG.quality,
    });

    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'api.openai.com',
            port: 443,
            path: '/v1/images/generations',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
                'Content-Length': Buffer.byteLength(requestBody),
            },
        };

        const req = https.request(options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode !== 200) {
                    reject(new Error(`API Error ${res.statusCode}: ${data}`));
                    return;
                }
                try {
                    const response = JSON.parse(data);
                    resolve(response.data[0].url);
                } catch (e) {
                    reject(new Error(`Parse Error: ${e.message}`));
                }
            });
        });

        req.on('error', reject);
        req.write(requestBody);
        req.end();
    });
}

// Bild von URL herunterladen
async function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve(filepath);
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => {}); // Lösche fehlerhafte Datei
            reject(err);
        });
    });
}

// Pause-Funktion
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Argumente parsen
function parseArgs() {
    const args = {
        start: 1,
        end: 226,
        dryRun: false,
        delay: CONFIG.delayBetweenRequests,
    };

    process.argv.slice(2).forEach(arg => {
        if (arg.startsWith('--start=')) {
            args.start = parseInt(arg.split('=')[1], 10);
        } else if (arg.startsWith('--end=')) {
            args.end = parseInt(arg.split('=')[1], 10);
        } else if (arg === '--dry-run') {
            args.dryRun = true;
        } else if (arg.startsWith('--delay=')) {
            args.delay = parseInt(arg.split('=')[1], 10);
        }
    });

    return args;
}

// Fortschritts-Datei für Resume-Funktion
const PROGRESS_FILE = path.join(CONFIG.outputDir, '.generation-progress.json');

function loadProgress() {
    try {
        if (fs.existsSync(PROGRESS_FILE)) {
            return JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf8'));
        }
    } catch (e) {}
    return { completed: [], failed: [] };
}

function saveProgress(progress) {
    fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

// Hauptfunktion
async function main() {
    const args = parseArgs();
    const mapping = loadMapping();
    const progress = loadProgress();

    console.log('='.repeat(60));
    console.log('DALL-E Bedürfnis-Bilder Generator');
    console.log('='.repeat(60));
    console.log(`Bereich: #B${args.start} bis #B${args.end}`);
    console.log(`Modus: ${args.dryRun ? 'DRY RUN (keine Generierung)' : 'LIVE'}`);
    console.log(`Verzögerung: ${args.delay}ms zwischen Bildern`);
    console.log(`Bereits generiert: ${progress.completed.length} Bilder`);
    console.log('='.repeat(60));

    if (!args.dryRun && !process.env.OPENAI_API_KEY) {
        console.error('\n❌ FEHLER: OPENAI_API_KEY nicht gesetzt!');
        console.error('Setze die Variable mit:');
        console.error('  export OPENAI_API_KEY=sk-...');
        process.exit(1);
    }

    // Stelle sicher, dass Output-Verzeichnis existiert
    if (!fs.existsSync(CONFIG.outputDir)) {
        fs.mkdirSync(CONFIG.outputDir, { recursive: true });
    }

    let generated = 0;
    let skipped = 0;
    let failed = 0;

    for (let i = args.start; i <= args.end; i++) {
        const id = `#B${i}`;
        const info = mapping.images[id];

        if (!info) {
            console.log(`⚠️  ${id}: Nicht im Mapping gefunden, überspringe`);
            continue;
        }

        const filename = info.file;
        const filepath = path.join(CONFIG.outputDir, filename);

        // Bereits vorhanden?
        if (fs.existsSync(filepath)) {
            console.log(`⏭️  ${id} (${info.label}): Existiert bereits`);
            skipped++;
            continue;
        }

        // Bereits als generiert markiert?
        if (progress.completed.includes(id)) {
            console.log(`⏭️  ${id} (${info.label}): Bereits in Fortschritt`);
            skipped++;
            continue;
        }

        const prompt = createPrompt(info);

        if (args.dryRun) {
            console.log(`\n📝 ${id} - ${info.label} (${info.karte}):`);
            console.log(`   Datei: ${filename}`);
            console.log(`   Prompt: ${prompt.substring(0, 100)}...`);
            continue;
        }

        console.log(`\n🎨 Generiere ${id} - ${info.label} (${info.karte})...`);

        try {
            // Bild generieren
            const imageUrl = await generateImage(prompt, filename);
            console.log(`   ✅ Bild generiert, lade herunter...`);

            // Als PNG herunterladen (DALL-E liefert PNG)
            const pngPath = filepath.replace('.webp', '.png');
            await downloadImage(imageUrl, pngPath);
            console.log(`   ✅ Gespeichert: ${pngPath}`);

            // Fortschritt speichern
            progress.completed.push(id);
            saveProgress(progress);

            generated++;

            // Kosten-Info
            const cost = generated * 0.04;
            console.log(`   💰 Bisherige Kosten: ~$${cost.toFixed(2)}`);

            // Pause vor nächstem Request
            if (i < args.end) {
                console.log(`   ⏳ Warte ${args.delay}ms...`);
                await sleep(args.delay);
            }

        } catch (error) {
            console.error(`   ❌ Fehler: ${error.message}`);
            progress.failed.push({ id, error: error.message });
            saveProgress(progress);
            failed++;

            // Bei Rate Limit länger warten
            if (error.message.includes('429') || error.message.includes('rate')) {
                console.log('   ⏳ Rate Limit erreicht, warte 60 Sekunden...');
                await sleep(60000);
            }
        }
    }

    console.log('\n' + '='.repeat(60));
    console.log('ZUSAMMENFASSUNG');
    console.log('='.repeat(60));
    console.log(`✅ Generiert: ${generated}`);
    console.log(`⏭️  Übersprungen: ${skipped}`);
    console.log(`❌ Fehlgeschlagen: ${failed}`);
    console.log(`💰 Geschätzte Kosten: ~$${(generated * 0.04).toFixed(2)}`);

    if (failed > 0) {
        console.log('\nFehlgeschlagene Bilder:');
        progress.failed.forEach(f => console.log(`  - ${f.id}: ${f.error}`));
    }

    console.log('\n📌 Nächste Schritte:');
    console.log('1. PNG-Bilder zu WebP konvertieren:');
    console.log('   cd assets/images/beduerfnisse');
    console.log('   for f in *.png; do cwebp -q 80 -resize 400 600 "$f" -o "${f%.png}.webp"; done');
    console.log('2. PNG-Dateien löschen:');
    console.log('   rm *.png');
}

main().catch(console.error);
