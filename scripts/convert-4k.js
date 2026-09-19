const sharp = require('sharp');
const fs = require('fs');

(async () => {
  for (const f of ['erpixa', 'nanolink', 'nexora', 'telepoint', 'tripmate']) {
    const src = `public/previews/${f}-4k.png`;
    if (!fs.existsSync(src)) { console.log('missing', src); continue; }
    await sharp(src)
      .resize(2800, null, { withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(`public/previews/${f}.webp`);
    const s = fs.statSync(`public/previews/${f}.webp`);
    console.log(f, Math.round(s.size / 1024) + 'KB');
  }
})();
