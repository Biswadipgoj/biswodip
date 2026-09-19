const { chromium } = require('playwright');
(async () => {
  const targets = [
    { file: 'erpixa', url: 'https://erpixa.vercel.app/' },
    { file: 'nanolink', url: 'https://nanl.vercel.app/' },
    { file: 'nexora', url: 'https://nexora-xi-rust.vercel.app/' },
    { file: 'telepoint', url: 'https://telepoint-topaz.vercel.app/' },
    { file: 'tripmate', url: 'https://trip-mu-coral.vercel.app/' },
  ];
  const b = await chromium.launch({ channel: 'msedge' });
  for (const t of targets) {
    try {
      const p = await b.newPage({
        viewport: { width: 1920, height: 1200 },
        deviceScaleFactor: 2, // 3840x2400 effective pixels
      });
      await p.goto(t.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await p.waitForTimeout(8000);
      await p.screenshot({ path: `public/previews/${t.file}-4k.png`, type: 'png' });
      console.log('captured', t.file);
      await p.close();
    } catch (e) {
      console.log('FAILED', t.file, String(e).slice(0, 120));
    }
  }
  await b.close();
})();
