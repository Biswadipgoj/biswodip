import { chromium } from 'playwright';

async function scan() {
  console.log('Launching Chromium in clean guest-like incognito context...');
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  // incognito / clean guest context
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
    reducedMotion: 'no-preference',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
  });

  const page = await context.newPage();

  const consoleLogs = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on('console', (msg) => {
    const text = msg.text();
    const type = msg.type();
    consoleLogs.push({ type, text });
    if (type === 'error' || type === 'warning') {
      console.log(`[BROWSER ${type.toUpperCase()}]: ${text}`);
    }
  });

  page.on('pageerror', (err) => {
    pageErrors.push(err.message || String(err));
    console.error(`[PAGE ERROR]: ${err.stack || err.message}`);
  });

  page.on('requestfailed', (req) => {
    failedRequests.push({ url: req.url(), failure: req.failure()?.errorText });
    console.warn(`[FAILED REQUEST]: ${req.url()} - ${req.failure()?.errorText}`);
  });

  console.log('Navigating to http://localhost:3000 ...');
  const res = await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
  console.log(`Page status: ${res?.status()}`);

  // Wait a moment for initial Three.js render and animations
  await page.waitForTimeout(2000);

  // Scroll down smoothly through the entire document to trigger all section mounts / scroll triggers
  console.log('Scrolling down the page...');
  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log(`Total scrollHeight: ${scrollHeight}px`);

  const step = 400;
  for (let y = 0; y <= scrollHeight; y += step) {
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await page.waitForTimeout(100);
  }

  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);

  console.log('\n--- SCAN SUMMARY ---');
  console.log(`Page Errors: ${pageErrors.length}`);
  console.log(`Console Errors: ${consoleLogs.filter(l => l.type === 'error').length}`);
  console.log(`Console Warnings: ${consoleLogs.filter(l => l.type === 'warning').length}`);
  console.log(`Failed Requests: ${failedRequests.length}`);

  if (pageErrors.length > 0) {
    console.log('\nPage Errors detail:');
    pageErrors.forEach((e, idx) => console.log(`  ${idx + 1}. ${e}`));
  }

  const errors = consoleLogs.filter(l => l.type === 'error');
  if (errors.length > 0) {
    console.log('\nConsole Errors detail:');
    errors.forEach((e, idx) => console.log(`  ${idx + 1}. ${e.text}`));
  }

  // Check if WebGL canvases are rendered
  const canvasCount = await page.locator('canvas').count();
  console.log(`\nWebGL / Canvas elements found on page: ${canvasCount}`);

  await browser.close();
}

scan().catch((err) => {
  console.error('Scan failed:', err);
  process.exit(1);
});
