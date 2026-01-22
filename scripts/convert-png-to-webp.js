#!/usr/bin/env node
/**
 * Convert PNG images to WebP format with resize
 * Usage: node scripts/convert-png-to-webp.js [--input=<dir>] [--width=400] [--height=600]
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (name, defaultValue) => {
    const arg = args.find(a => a.startsWith(`--${name}=`));
    return arg ? arg.split('=')[1] : defaultValue;
};

const inputDir = getArg('input', 'assets/images/beduerfnisse-v2');
const width = parseInt(getArg('width', '400'), 10);
const height = parseInt(getArg('height', '600'), 10);
const quality = parseInt(getArg('quality', '80'), 10);

async function convertImages() {
    const absoluteInputDir = path.resolve(inputDir);

    if (!fs.existsSync(absoluteInputDir)) {
        console.error(`Input directory not found: ${absoluteInputDir}`);
        process.exit(1);
    }

    const pngFiles = fs.readdirSync(absoluteInputDir)
        .filter(f => f.toLowerCase().endsWith('.png'))
        .sort();

    console.log(`Found ${pngFiles.length} PNG files in ${absoluteInputDir}`);
    console.log(`Converting to WebP at ${width}x${height}, quality ${quality}`);
    console.log('');

    let success = 0;
    let failed = 0;

    for (const file of pngFiles) {
        const inputPath = path.join(absoluteInputDir, file);
        const outputFile = file.replace(/\.png$/i, '.webp');
        const outputPath = path.join(absoluteInputDir, outputFile);

        try {
            await sharp(inputPath)
                .resize(width, height, { fit: 'cover' })
                .webp({ quality })
                .toFile(outputPath);

            const inputStats = fs.statSync(inputPath);
            const outputStats = fs.statSync(outputPath);
            const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

            console.log(`✓ ${file} -> ${outputFile} (${(inputStats.size/1024/1024).toFixed(1)}MB -> ${(outputStats.size/1024).toFixed(0)}KB, -${reduction}%)`);
            success++;
        } catch (err) {
            console.error(`✗ ${file}: ${err.message}`);
            failed++;
        }
    }

    console.log('');
    console.log(`Conversion complete: ${success} success, ${failed} failed`);
}

convertImages().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
