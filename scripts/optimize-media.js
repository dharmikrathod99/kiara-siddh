/**
 * Media Optimization Script
 * Usage: node scripts/optimize-media.js
 *
 * Requirements:
 * npm install sharp --save-dev
 *
 * This script batch-converts originals in /public/media/originals
 * into optimized responsive WebP and AVIF formats (800px, 1400px, 2200px).
 */

const fs = require('fs');
const path = require('path');

const ORIGINALS_DIR = path.join(__dirname, '..', 'public', 'media', 'originals');
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'media');
const SIZES = [800, 1400, 2200];

async function optimize() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.error('Sharp is not installed. Run: npm install sharp --save-dev');
    return;
  }

  if (!fs.existsSync(ORIGINALS_DIR)) {
    console.log(`Please create ${ORIGINALS_DIR} and place your high-res photos there.`);
    return;
  }

  const files = fs.readdirSync(ORIGINALS_DIR);

  for (const file of files) {
    if (!/\.(jpe?g|png|webp|avif)$/i.test(file)) continue;

    const inputPath = path.join(ORIGINALS_DIR, file);
    const parsed = path.parse(file);

    console.log(`Processing ${file}...`);

    for (const width of SIZES) {
      // Generate WebP
      const webpOut = path.join(OUTPUT_DIR, `${parsed.name}-${width}.webp`);
      await sharp(inputPath)
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(webpOut);

      // Generate AVIF for ultra compression
      const avifOut = path.join(OUTPUT_DIR, `${parsed.name}-${width}.avif`);
      await sharp(inputPath)
        .resize({ width, withoutEnlargement: true })
        .avif({ quality: 78 })
        .toFile(avifOut);
    }
  }

  console.log('Media batch optimization complete!');
}

optimize();
