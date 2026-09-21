import fs from 'node:fs';

const css = fs.readFileSync('app/journey.css', 'utf-8');

// 1. Distinct font sizes
const fsMatches = [...css.matchAll(/font-size:\s*([^;!}]+)/g)].map(m => m[1].trim());
const uniqueFs = Array.from(new Set(fsMatches));

// 2. Distinct border-radii
const brMatches = [...css.matchAll(/border-radius:\s*([^;!}]+)/g)].map(m => m[1].trim());
const uniqueBr = Array.from(new Set(brMatches));

// 3. Distinct text colors
const colorMatches = [...css.matchAll(/(?:^|[{;\s])color:\s*([^;!}]+)/g)].map(m => m[1].trim());
const uniqueColors = Array.from(new Set(colorMatches));

console.log(JSON.stringify({
  fontSizeCount: uniqueFs.length,
  fontSizes: uniqueFs,
  borderRadiusCount: uniqueBr.length,
  borderRadii: uniqueBr,
  colorCount: uniqueColors.length,
  colors: uniqueColors.slice(0, 25)
}, null, 2));
