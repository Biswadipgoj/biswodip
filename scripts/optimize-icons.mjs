import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

// Delivery-size variants of the existing portrait. Never serve the 2 MB source as a favicon.
for (const [file, size] of [['app/icon.png', 64], ['app/apple-icon.png', 180]]) {
  const bytes = await sharp('public/biswodip.png').resize(size, size, {fit:'cover', position:'top'}).png({palette:true, compressionLevel:9}).toBuffer();
  await writeFile(file, bytes);
  console.log(file, bytes.length, 'bytes');
}
