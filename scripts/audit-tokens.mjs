import fs from 'node:fs';

const css = fs.readFileSync('app/journey.css', 'utf-8');

// 1. Font sizes
const fontSizes = new Set();
const fsRegex = /font(?:-size)?:\s*(?:[^;]*?\s+)?([0-9.]+(?:px|rem|em))/g;
let m;
while ((m = fsRegex.exec(css)) !== null) {
  fontSizes.add(m[1]);
}

// Also scan direct font-size:
const directFs = new Set();
const dfsRegex = /font-size:\s*([^;]+);/g;
while ((m = dfsRegex.exec(css)) !== null) {
  directFs.add(m[1].trim());
}

// 2. Border radii
const radii = new Set();
const brRegex = /border-radius:\s*([^;]+);/g;
while ((m = brRegex.exec(css)) !== null) {
  radii.add(m[1].trim());
}

// 3. Text colors
const colors = new Set();
const colRegex = /(?:^|[{;])\s*(?:color):\s*([^;]+);/gm;
while ((m = colRegex.exec(css)) !== null) {
  colors.add(m[1].trim());
}

// 4. Text transform uppercase
const uppercaseRules = [];
const ucRegex = /([^{}]+)\{[^{}]*text-transform:\s*uppercase[^{}]*\}/g;
while ((m = ucRegex.exec(css)) !== null) {
  uppercaseRules.push(m[1].trim().replace(/\s+/g, ' '));
}

// 5. Text overflow ellipsis
const ellipsisRules = [];
const elRegex = /([^{}]+)\{[^{}]*text-overflow:\s*ellipsis[^{}]*\}/g;
while ((m = elRegex.exec(css)) !== null) {
  ellipsisRules.push(m[1].trim().replace(/\s+/g, ' '));
}

// 6. Font sizes under 13px
const smallFontRules = [];
const sfRegex = /([^{}]+)\{[^{}]*font(?:-size)?:\s*([^;]*(?:[1-9]|10|11|12)px)[^;]*;/g;
while ((m = sfRegex.exec(css)) !== null) {
  smallFontRules.push({ selector: m[1].trim().split('\n').pop().trim(), val: m[2].trim() });
}

console.log(JSON.stringify({
  fontSizesCount: directFs.size,
  fontSizes: Array.from(directFs),
  radiiCount: radii.size,
  radii: Array.from(radii),
  colorsCount: colors.size,
  colors: Array.from(colors).slice(0, 30),
  uppercaseRulesCount: uppercaseRules.length,
  uppercaseRules: uppercaseRules.slice(0, 15),
  ellipsisRules,
  smallFontCount: smallFontRules.length,
  smallFontRules: smallFontRules.slice(0, 20)
}, null, 2));
