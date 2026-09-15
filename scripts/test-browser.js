const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function testPortfolio() {
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

  console.log('Page title:', await page.title());

  // Check horizontal overflow
  const dimensions = await page.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollHeight: document.documentElement.scrollHeight,
      hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth
    };
  });
  console.log('Viewport dimensions:', dimensions);

  const outDir = path.join(__dirname, '..', 'test-screens');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Scroll through every section and capture high-res screenshots
  const sections = ['sec-001', 'sec-002', 'sec-003', 'sec-004', 'sec-005', 'sec-006', 'sec-007', 'sec-008'];
  for (const id of sections) {
    const el = await page.$(`#${id}`);
    if (el) {
      await el.scrollIntoView();
      await new Promise(r => setTimeout(r, 600));
      await page.screenshot({ path: path.join(outDir, `${id}.png`) });
      console.log(`Captured screenshot for ${id}`);
    } else {
      console.log(`Element #${id} not found!`);
    }
  }

  // Test Project Architecture Modal (Clicking to inspect blueprint)
  console.log('Testing Project Architecture Inspector Modal...');
  await page.evaluate(() => {
    const workSection = document.getElementById('sec-003');
    if (workSection) {
      const firstCard = workSection.querySelector('article');
      if (firstCard) firstCard.click();
    }
  });
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({ path: path.join(outDir, '03-modal-architecture.png') });
  console.log('Captured architecture modal screenshot');

  // Close modal with ESC or button
  await page.keyboard.press('Escape');
  await page.evaluate(() => {
    const closeBtn = document.querySelector('button[aria-label="Close Architecture Modal"]');
    if (closeBtn) closeBtn.click();
  });
  await new Promise(r => setTimeout(r, 300));

  // Test Interactive Tech Stack switching
  console.log('Testing Tech Stack category switching...');
  await page.evaluate(() => {
    const craft = document.getElementById('sec-005');
    if (craft) craft.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('#sec-005 button'));
    const rustBtn = btns.find(b => b.textContent.includes('Rust'));
    if (rustBtn) rustBtn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outDir, '05-tech-rust-selected.png') });

  // Test Research Notebook note switching
  console.log('Testing Research Notebook tabs...');
  await page.evaluate(() => {
    const notes = document.getElementById('sec-006');
    if (notes) notes.scrollIntoView();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('#sec-006 button'));
    const note2Btn = btns.find(b => b.textContent.includes('NOTE-02'));
    if (note2Btn) note2Btn.click();
  });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({ path: path.join(outDir, '06-research-note-2.png') });

  console.log('Console logs count:', consoleLogs.length);
  if (consoleLogs.length > 0) console.log('Console logs:', consoleLogs);
  console.log('Page errors count:', pageErrors.length);
  if (pageErrors.length > 0) console.log('Page errors:', pageErrors);

  await browser.close();
  console.log('Browser test complete!');
}

testPortfolio().catch(err => {
  console.error('Test failed:', err);
  process.exit(1);
});
