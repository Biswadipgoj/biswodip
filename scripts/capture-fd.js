const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

async function captureCommitFd() {
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

  const outDir = path.join(__dirname, '..', 'test-screens', 'fd69b38');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Hero Viewport
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(outDir, '01-hero-fd.png') });
  console.log('Captured 01-hero-fd.png');

  // 2. Scroll to Workstation / About
  await page.evaluate(() => window.scrollTo({ top: 850, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, '02-workstation-fd.png') });
  console.log('Captured 02-workstation-fd.png');

  // 3. Scroll to Projects
  await page.evaluate(() => window.scrollTo({ top: 1800, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, '03-projects-fd.png') });
  console.log('Captured 03-projects-fd.png');

  // 4. Scroll to Skills / Terminal
  await page.evaluate(() => window.scrollTo({ top: 2800, behavior: 'smooth' }));
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(outDir, '04-skills-terminal-fd.png') });
  console.log('Captured 04-skills-terminal-fd.png');

  console.log('Page errors:', pageErrors);
  await browser.close();
  console.log('Screenshot capture complete!');
}

captureCommitFd().catch(console.error);
