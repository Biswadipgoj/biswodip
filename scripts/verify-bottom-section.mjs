import puppeteer from 'puppeteer-core';
import path from 'node:path';

const ARTIFACTS_DIR = 'C:/Users/biswa/.gemini/antigravity-ide/brain/79c300ee-e394-4283-bd8c-fb495ea29ebc';

async function run() {
  const edgePath = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
  const browser = await puppeteer.launch({
    executablePath: edgePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--enable-webgl', '--ignore-gpu-blocklist'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Scroll directly to Contact element
  console.log('Scrolling to Contact...');
  await page.evaluate(() => {
    const contact = document.getElementById('contact');
    if (contact) {
      const top = contact.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, top);
    }
  });
  await new Promise(r => setTimeout(r, 2000));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'bottom_contact_transmission_deck.png') });

  // 2. Select intent pills
  console.log('Clicking intent pills...');
  const intentBtns = await page.$$('form button[type="button"]');
  if (intentBtns.length > 0) {
    await intentBtns[0].click();
    if (intentBtns.length > 1) await intentBtns[1].click();
  }
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'bottom_contact_intent_pills_selected.png') });

  // 3. Scroll directly to Terminal
  console.log('Scrolling to Terminal...');
  await page.evaluate(() => {
    const terminal = document.querySelector('section:has(input[placeholder*="Type \'help\'"])') || document.querySelector('section:last-of-type');
    if (terminal) {
      const top = terminal.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, top - 60);
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'bottom_terminal_initial_boot.png') });

  // 4. Click '$ status' chip in terminal
  console.log('Clicking $ status in terminal...');
  await page.evaluate(() => {
    const chips = Array.from(document.querySelectorAll('button')).filter(b => b.textContent?.includes('$ status'));
    if (chips[0]) chips[0].click();
  });
  await new Promise(r => setTimeout(r, 800));

  // 5. Click '$ ping' chip in terminal
  console.log('Clicking $ ping in terminal...');
  await page.evaluate(() => {
    const chips = Array.from(document.querySelectorAll('button')).filter(b => b.textContent?.includes('$ ping'));
    if (chips[0]) chips[0].click();
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'bottom_terminal_status_and_ping.png') });

  // 6. Click '$ sudo hire' in terminal
  console.log('Clicking $ sudo hire in terminal...');
  await page.evaluate(() => {
    const chips = Array.from(document.querySelectorAll('button')).filter(b => b.textContent?.includes('sudo hire'));
    if (chips[0]) chips[0].click();
  });
  await new Promise(r => setTimeout(r, 800));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'bottom_terminal_hire_handshake.png') });

  // 7. Scroll to Footer Wordmark
  console.log('Scrolling to Footer...');
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await new Promise(r => setTimeout(r, 1500));

  // Move mouse over the giant wordmark to trigger holographic specular effect
  const wordmarkBox = await page.evaluate(() => {
    const h2 = document.querySelector('footer h2');
    if (!h2) return null;
    const rect = h2.getBoundingClientRect();
    return { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  });

  if (wordmarkBox) {
    await page.mouse.move(wordmarkBox.x, wordmarkBox.y);
    await new Promise(r => setTimeout(r, 500));
  }
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'bottom_footer_specular_wordmark.png') });

  // 8. Mobile Viewport Test (390 x 844)
  console.log('Testing Mobile Viewport...');
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => {
    const contact = document.getElementById('contact');
    if (contact) {
      const top = contact.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, top);
    }
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'bottom_mobile_contact_and_terminal.png') });

  console.log('Done!');
  await browser.close();
}

run().catch(console.error);
