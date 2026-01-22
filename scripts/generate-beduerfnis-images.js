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
    tarotKartenFile: path.join(__dirname, '..', 'profiles', 'data', 'osho-zen-tarot-karten.json'),
    model: 'dall-e-3',
    size: '1024x1792', // Hochformat, wird später auf 400x600 skaliert
    quality: 'standard',
    delayBetweenRequests: 2000, // 2 Sekunden zwischen Anfragen
};

// Basis-Stil für alle Bilder (DALL-E 3 Prompt-Präfix)
// Hinweis: Die visuellen Beschreibungen kommen aus osho-zen-tarot-karten.json
const STYLE_PREFIX = `Osho Zen Tarot card illustration in the style of Ma Deva Padma,
mystical spiritual meditation art, soft ethereal lighting,
warm earth tones with deep purple and gold accents,
contemplative sacred atmosphere, symbolic mystical imagery,
digital painting style, vertical tarot card format, centered composition,
no text, no words, no letters, no writing, no watermarks`;

// Lade Tarot-Karten-Daten mit Bildbeschreibungen
let tarotKartenCache = null;

function loadTarotKarten() {
    if (tarotKartenCache) return tarotKartenCache;

    const data = fs.readFileSync(CONFIG.tarotKartenFile, 'utf8');
    const tarotData = JSON.parse(data);

    // Erstelle ein Lookup-Dictionary: Kartenname -> Bildbeschreibung
    const kartenLookup = {};

    // Major Arcana
    for (const [key, karte] of Object.entries(tarotData.major_arcana || {})) {
        if (karte.name && karte.bild) {
            kartenLookup[karte.name] = karte.bild;
        }
    }

    // Minor Arcana (Fire, Water, Clouds, Rainbows)
    for (const [element, suite] of Object.entries(tarotData.minor_arcana || {})) {
        for (const [key, karte] of Object.entries(suite.karten || {})) {
            if (karte.name && karte.bild) {
                kartenLookup[karte.name] = karte.bild;
            }
        }
    }

    // Zusätzliche Karten
    for (const [key, karte] of Object.entries(tarotData.zusaetzliche_karten?.karten || {})) {
        if (karte.name && karte.bild) {
            kartenLookup[karte.name] = karte.bild;
        }
    }

    tarotKartenCache = kartenLookup;
    console.log(`📖 ${Object.keys(kartenLookup).length} Tarot-Karten mit Bildbeschreibungen geladen`);
    return kartenLookup;
}

// Spezielle Ersatz-Beschreibungen für problematische Karten (DALL-E Policy)
const CARD_OVERRIDES = {
    // "The Master" enthält "Porträt von Osho selbst" - echte Person nicht erlaubt!
    "The Master": "An enlightened spiritual master figure sitting in deep meditation, surrounded by golden cosmic light. His eyes show infinite depth and wisdom, a knowing smile on his face. He radiates perfect stillness and peace. Disciples sit around him in reverence. This is the archetype of one who has mastered themselves - not a master over others, but a master of the self.",

    // "Existence" enthält "nackte Gestalt"
    "Existence": "An ethereal luminous figure floating in cosmic space, surrounded by stars and galaxies. Arms outstretched, the body radiates pure light. The figure is one with the universe - not separate, but part of the greater whole. Pure consciousness experiencing itself.",

    // "Healing" enthält "nackt, verletzlich"
    "Healing": "A translucent figure bathed in soft healing light, open and vulnerable to the loving touch of existence. The aura around the body is full of light, with a quality of relaxation, care and love dissolving struggle and suffering. Lotus flowers of light appear around the physical and subtle energy bodies. Healing crystals appear in each of these subtle layers.",

    // "Flowering" enthält "erotisch"
    "Flowering": "An imaginative tree at the peak of its bloom and freshness. She is vibrant, alive and full of surprises. Her branches contain many seeds, and when the wind blows, the seeds scatter to take root wherever they may. She spreads them everywhere while enjoying life and love - inviting bees and birds to drink her nectar.",
};

// Übersetze deutsche Bildbeschreibung zu englischem DALL-E Prompt
function translateToEnglishPrompt(germanBild, karteName) {
    // Prüfe ob es eine spezielle Ersatz-Beschreibung gibt
    if (CARD_OVERRIDES[karteName]) {
        console.log(`   📝 Verwende DALL-E-sichere Beschreibung für "${karteName}"`);
        return CARD_OVERRIDES[karteName];
    }

    // DALL-E Policy: Ersetze problematische Phrasen ZUERST (vor Wort-für-Wort)
    const policyReplacements = {
        // Nacktheit -> ethereal/luminous
        'Eine nackte Gestalt': 'An ethereal luminous figure',
        'eine nackte Gestalt': 'an ethereal luminous figure',
        'nackte Gestalt': 'ethereal figure',
        'ist nackt': 'is ethereal and luminous',
        'Nackte Seelen': 'Souls revealed in their essence',
        'nackte Seelen': 'souls revealed',
        'nackt': 'ethereal',
        'Nackt': 'Ethereal',
        // Erotik -> vibrant/sensual energy
        'sehr erotisch': 'vibrantly alive with sensual energy',
        'erotisch': 'sensually alive',
        // Tod -> transition (im spirituellen Kontext OK, aber sicherer)
        'Leben und Tod': 'life and transition',
        'Geburt und Tod': 'birth and transformation',
        'den Tod': 'transformation',
        // Porträt von echten Personen
        'Porträt von Osho': 'portrait of a wise spiritual master',
        'Osho selbst': 'an enlightened master figure',
        'Osho': 'a spiritual master',
    };

    let result = germanBild;

    // Wende Policy-Ersetzungen zuerst an (längere Phrasen zuerst)
    const sortedPolicyKeys = Object.keys(policyReplacements).sort((a, b) => b.length - a.length);
    for (const phrase of sortedPolicyKeys) {
        result = result.replace(new RegExp(phrase, 'g'), policyReplacements[phrase]);
    }

    // Standard-Übersetzungen (Wort für Wort)
    const translations = {
        'Gestalt': 'figure',
        'sitzt': 'sits',
        'steht': 'stands',
        'schwebt': 'floats',
        'meditiert': 'meditates',
        'Lotusposition': 'lotus position',
        'Licht': 'light',
        'golden': 'golden',
        'Aura': 'aura',
        'Regenbogen': 'rainbow',
        'Farben': 'colors',
        'Himmel': 'sky',
        'Sterne': 'stars',
        'Galaxien': 'galaxies',
        'Universum': 'universe',
        'kosmisch': 'cosmic',
        'Herz': 'heart',
        'Seele': 'soul',
        'Flammen': 'flames',
        'Feuer': 'fire',
        'Wasser': 'water',
        'Erde': 'earth',
        'Luft': 'air',
        'Blume': 'flower',
        'Lotus': 'lotus',
        'Baum': 'tree',
        'Wurzeln': 'roots',
        'Augen': 'eyes',
        'Hände': 'hands',
        'Liebe': 'love',
        'Freiheit': 'freedom',
        'Weisheit': 'wisdom',
        'Stille': 'silence',
        'friedlich': 'peaceful',
        'strahlend': 'radiant',
        'leuchtend': 'luminous',
        'Energie': 'energy',
        'heilig': 'sacred',
        'mystisch': 'mystical',
        'Schmetterling': 'butterfly',
        'Vogel': 'bird',
        'Adler': 'eagle',
        'Schwan': 'swan',
        'Phönix': 'phoenix',
        'Schlange': 'serpent',
        'Delphin': 'dolphin',
        'Delphine': 'dolphins',
        'Klippe': 'cliff',
        'Felsen': 'rocks',
        'Stein': 'stone',
        'Berg': 'mountain',
        'Tal': 'valley',
        'Ozean': 'ocean',
        'Meer': 'sea',
        'Wellen': 'waves',
        'Fluss': 'river',
        'Quelle': 'spring',
        'Brunnen': 'fountain',
        'Regen': 'rain',
        'Tränen': 'tears',
        'Sonne': 'sun',
        'Mond': 'moon',
        'Nacht': 'night',
        'Tag': 'day',
        'Morgen': 'dawn',
        'Abend': 'dusk',
        'Kreis': 'circle',
        'Spirale': 'spiral',
        'Symbol': 'symbol',
        'Mandala': 'mandala',
        'Chakra': 'chakra',
        'drittes Auge': 'third eye',
        'Stirn': 'forehead',
        'Krone': 'crown',
        'Flügel': 'wings',
        'geflügelt': 'winged',
        'tanzt': 'dances',
        'fliegt': 'flies',
        'springt': 'leaps',
        'umarmt': 'embraces',
        'hält': 'holds',
        'öffnet': 'opens',
        'schließt': 'closes',
        'Tür': 'door',
        'Tor': 'gate',
        'Weg': 'path',
        'Brücke': 'bridge',
        'Turm': 'tower',
        'Tempel': 'temple',
        'Altar': 'altar',
        'Kelch': 'chalice',
        'Schwert': 'sword',
        'Stab': 'staff',
        'Kette': 'chain',
        'Käfig': 'cage',
        'frei': 'free',
        'gefangen': 'bound',
        'Befreiung': 'liberation',
        'Transformation': 'transformation',
        'Wiedergeburt': 'rebirth',
        'Erwachen': 'awakening',
        'Erleuchtung': 'enlightenment',
        'Meister': 'master',
        'Schüler': 'disciples',
        'weise': 'wise',
        'alt': 'ancient',
        'jung': 'young',
        'Kind': 'child',
        'Mann': 'man',
        'Frau': 'woman',
        'weiblich': 'feminine',
        'männlich': 'masculine',
        'Liebende': 'lovers',
        'Paar': 'couple',
        'Einheit': 'unity',
        'Vereinigung': 'union',
        'Yin': 'yin',
        'Yang': 'yang',
        'Gleichgewicht': 'balance',
        'Harmonie': 'harmony',
        'verletzlich': 'vulnerable',
        'offen': 'open',
        'Berührung': 'touch',
        'Existenz': 'existence',
        'umgeben': 'surrounded',
        'erscheint': 'appears',
        'zeigt': 'shows',
        'voller': 'full of',
        'tiefe': 'deep',
        'unendlich': 'infinite',
        'Güte': 'kindness',
        'Lächeln': 'smile',
        'vollkommen': 'complete',
        'Kristall': 'crystal',
        'Kristalle': 'crystals',
        'subtil': 'subtle',
        'Körper': 'body',
        'physisch': 'physical',
        'Schicht': 'layer',
        'Schichten': 'layers',
        'Blüte': 'bloom',
        'Samen': 'seeds',
        'Wind': 'wind',
        'Äste': 'branches',
        'Nektar': 'nectar',
        'Bienen': 'bees',
        'Vögel': 'birds',
        'genießt': 'enjoys',
        'lebendig': 'alive',
        'Überraschungen': 'surprises',
        'verstreut': 'scatters'
    };

    for (const [de, en] of Object.entries(translations)) {
        result = result.replace(new RegExp(de, 'gi'), en);
    }
    return result;
}

// Lade das Mapping
function loadMapping() {
    const data = fs.readFileSync(CONFIG.mappingFile, 'utf8');
    return JSON.parse(data);
}

// Erstelle den vollständigen Prompt für ein Bedürfnis
// Verwendet die Original-Bildbeschreibungen aus osho-zen-tarot-karten.json
// mit DALL-E Policy-sicheren Anpassungen
function createPrompt(info, tarotKarten) {
    const karteName = info.karte;
    const oshoDescription = tarotKarten[karteName];

    if (oshoDescription) {
        // Übersetze die deutsche Osho-Beschreibung für DALL-E (mit Policy-Anpassungen)
        const translatedDescription = translateToEnglishPrompt(oshoDescription, karteName);
        return `${STYLE_PREFIX}. Visual scene for "${info.label}" based on Osho Zen Tarot card "${karteName}": ${translatedDescription}`;
    } else {
        // Fallback: Generischer Prompt wenn keine Beschreibung gefunden
        console.warn(`⚠️  Keine Bildbeschreibung für Karte "${karteName}" gefunden`);
        return `${STYLE_PREFIX}, mystical spiritual tarot card representing "${info.label}" (${karteName})`;
    }
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
        outputDir: null,  // null = use default CONFIG.outputDir
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
        } else if (arg.startsWith('--output=')) {
            args.outputDir = arg.split('=')[1];
        }
    });

    // Override output directory if specified
    if (args.outputDir) {
        CONFIG.outputDir = path.resolve(args.outputDir);
        console.log(`📁 Ausgabeverzeichnis: ${CONFIG.outputDir}`);
        // Create directory if it doesn't exist
        if (!fs.existsSync(CONFIG.outputDir)) {
            fs.mkdirSync(CONFIG.outputDir, { recursive: true });
            console.log(`   (Verzeichnis erstellt)`);
        }
    }

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
    const tarotKarten = loadTarotKarten();
    const progress = loadProgress();

    console.log('='.repeat(60));
    console.log('DALL-E Bedürfnis-Bilder Generator');
    console.log('='.repeat(60));
    console.log(`Bereich: #B${args.start} bis #B${args.end}`);
    console.log(`Modus: ${args.dryRun ? 'DRY RUN (keine Generierung)' : 'LIVE'}`);
    console.log(`Verzögerung: ${args.delay}ms zwischen Bildern`);
    console.log(`Bereits generiert: ${progress.completed.length} Bilder`);
    console.log(`Tarot-Karten mit Bildbeschreibungen: ${Object.keys(tarotKarten).length}`);
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

        const prompt = createPrompt(info, tarotKarten);

        if (args.dryRun) {
            console.log(`\n📝 ${id} - ${info.label} (${info.karte}):`);
            console.log(`   Datei: ${filename}`);
            console.log(`   Prompt (${prompt.length} Zeichen):`);
            console.log(`   ${prompt.substring(0, 200)}...`);
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
