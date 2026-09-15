import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const previews = new URL('../public/previews/', import.meta.url);
const output = new URL('showcase-bookend.webp', previews);
const width = 1920;
const height = 1080;
const maxBytes = 300_000;
const margin = 24;
const gap = 16;
const names = ['erpixa', 'telepoint', 'tripmate', 'nanolink', 'nexora'];
const hash = (buffer) => createHash('sha256').update(buffer).digest('hex');

const sources = await Promise.all(names.map(async (name) => {
  const path = new URL(`${name}.webp`, previews);
  const input = await readFile(path);
  const metadata = await sharp(input).metadata();
  return { name, path, input, hash: hash(input), ...metadata };
}));

console.table(sources.map(({ name, width, height, input }) => ({
  source: `${name}.webp`, width, height, bytes: input.length,
})));

// Three screenshots above two wider screenshots preserve the source layouts.
const tiles = await Promise.all(sources.map(async (source, index) => {
  const columns = index < 3 ? 3 : 2;
  const column = index < 3 ? index : index - 3;
  const available = width - margin * 2 - gap * (columns - 1);
  const start = Math.round(column * available / columns);
  const tileWidth = Math.round((column + 1) * available / columns) - start;
  const tileHeight = index < 3 ? 400 : 616;
  const input = await sharp(source.input)
    .resize(tileWidth, tileHeight, { fit: 'cover', position: 'centre' })
    .removeAlpha()
    .toBuffer();
  return {
    input,
    left: margin + start + column * gap,
    top: index < 3 ? margin : margin + 400 + gap,
  };
}));

const collage = await sharp({
  create: { width, height, channels: 3, background: '#d8d1c7' },
}).composite(tiles).png().toBuffer();

// Grade after compositing so all five screenshots share the same treatment.
const graded = await sharp(collage)
  .modulate({ saturation: 0.55, brightness: 0.98 })
  .linear([1.015, 1, 0.97], [2, 1, 0])
  .blur(1.2)
  .png()
  .toBuffer();

let result;
let quality;
for (quality = 84; quality >= 44; quality -= 4) {
  result = await sharp(graded).webp({ quality, effort: 6 }).toBuffer();
  if (result.length < maxBytes) break;
}
if (result.length >= maxBytes) {
  throw new Error(`Composite exceeds the ${maxBytes}-byte budget; nothing written.`);
}

const metadata = await sharp(result).metadata();
if (metadata.format !== 'webp' || metadata.width !== width || metadata.height !== height) {
  throw new Error('Composite format or dimensions are invalid; nothing written.');
}
for (const source of sources) {
  if (hash(await readFile(source.path)) !== source.hash) {
    throw new Error(`Source changed during generation: ${source.name}; nothing written.`);
  }
}

await writeFile(output, result);
console.log(`${fileURLToPath(output)}: ${width}x${height}, ${result.length} bytes, WebP quality ${quality}`);
console.log('Verified all five originals are unchanged (SHA-256).');
