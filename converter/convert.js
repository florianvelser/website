const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = './src/projects';
const OUT_AVIF = './src/avif';
const OUT_T_AVIF = './src/thumbs_avif';

const QUALITY = 70;
const THUMB_SIZES = [320, 640, 1280];

function ensureDir(p) {
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
}
[OUT_AVIF, OUT_T_AVIF].forEach(ensureDir);

function isImage(ext) {
    return ['.png', '.jpg', '.jpeg'].includes(ext);
}

async function convertFile(filePath) {
    const rel = path.relative(SRC, filePath);
    const dir = path.dirname(rel);
    const ext = path.extname(rel).toLowerCase();
    if (!isImage(ext)) return;

    const base = path.basename(rel, ext);

    const srcFull = path.join(SRC, rel);
    ensureDir(path.join(OUT_AVIF, dir));
    ensureDir(path.join(OUT_T_AVIF, dir));

    // Full-size
    await sharp(srcFull).avif({ quality: QUALITY }).toFile(path.join(OUT_AVIF, dir, base + '.avif'));

    // Thumbnails
    // for (const w of THUMB_SIZES) {
    //     await sharp(srcFull)
    //        .resize({ width: w })
    //        .avif({ quality: QUALITY })
    //        .toFile(path.join(OUT_T_AVIF, dir, `${base}_${w}.avif`));
    // }

    console.log('Konvertiert:', rel);
}

function walk(dir) {
    for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, f.name);
        if (f.isDirectory()) walk(p);
        else convertFile(p);
    }
}

console.log('Scan & Konvertierung gestartet...');
walk(SRC);
console.log('Fertig.');
