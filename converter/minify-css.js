// converter/minify-css.js
const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');

const inputPath = path.resolve('public', 'index.css');
const outputPath = path.resolve('public', 'index.css');

const css = fs.readFileSync(inputPath, 'utf8');
const output = new CleanCSS({}).minify(css);

if (output.errors.length) {
  console.error('Fehler beim Minifizieren:', output.errors);
  process.exit(1);
}

fs.writeFileSync(outputPath, output.styles);
console.log('CSS minified successfully:', outputPath);
