const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function captureRestored() {
  const browser = await puppeteer.launch({
    headless: "new",
    executablePath: 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  const consoleLogs = [];
  page.on('console', msg => {
    consoleLogs.push({ type: msg.type(), text: msg.text() });
  });

  const pageErrors = [];
  page.on('pageerror', err => {
    pageErrors.push(err.toString());
  });

  console.log('Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0', timeout: 30000 });

  const title = await page.title();
  console.log('Page Title:', title);

  const outDir = path.join(__dirname, '..', 'test-screens', 'restored');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Capture Hero viewport
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, '01-hero-restored.png') });
  console.log('Captured 01-hero-restored.png');

  // Scroll down smoothly through sections
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outDir, '02-skills-restored.png') });
  console.log('Captured 02-skills-restored.png');

  await page.evaluate(() => window.scrollTo({ top: 2000, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(outDir, '03-projects-restored.png') });
  console.log('Captured 03-projects-restored.png');

  console.log('Console logs:', consoleLogs.slice(-10));
  console.log('Page errors:', pageErrors);

  await browser.close();
  console.log('Done!');
}

captureRestored().catch(console.error);
