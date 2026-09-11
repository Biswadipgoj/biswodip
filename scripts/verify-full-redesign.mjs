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
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);

  page.on('console', msg => console.log('LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('ERR:', err.message));

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 25000 });
  await new Promise(r => setTimeout(r, 2500));

  // 1. Capture Hero Section (Professional Terminology)
  console.log('Capturing Hero Section...');
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'hero_professional_runtime.png') });

  // 2. Scroll to Skills (Page Transition Vector Wipe on Tech Stack)
  console.log('Scrolling to Skills Section (#skills)...');
  await page.evaluate(() => {
    const el = document.getElementById('skills');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.scrollBy({ top: 120, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'skills_page_transition_frontend.png') });

  // Click Backend & APIs tab to trigger diagonal vector wipe
  console.log('Triggering vector wipe to Backend & APIs...');
  const tab1 = await page.$('#skill-tab-1');
  if (tab1) {
    await tab1.click();
    // Mid-wipe capture
    await new Promise(r => setTimeout(r, 450));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'skills_vector_wipe_in_action.png') });

    // Settled Backend cards
    await new Promise(r => setTimeout(r, 1200));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'skills_backend_cards_revealed.png') });
  }

  // 3. Scroll to Projects (3D Curved Elliptical Slider)
  console.log('Scrolling to Projects Section (#projects)...');
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'projects_3d_curved_slider_erpixa.png') });

  // Click Next Project in 3D Slider
  console.log('Advancing 3D Curved Slider to TelePoint...');
  const nextBtn = await page.$('button[aria-label="Next Project"]');
  if (nextBtn) {
    await nextBtn.click();
    await new Promise(r => setTimeout(r, 600)); // mid-motion
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'projects_slider_in_motion.png') });

    await new Promise(r => setTimeout(r, 1200)); // settled
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'projects_3d_curved_slider_telepoint.png') });
  }

  // 4. Scroll to Bottom (Creative Premium Footer & Systems Bar)
  console.log('Scrolling to Bottom Footer...');
  await page.evaluate(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'footer_premium_systems_bar.png') });

  // 5. Mobile Viewport Test (390 x 844)
  console.log('Testing Mobile Viewport (390 x 844)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'projects_mobile_curved_slider.png') });

  // Skills on mobile
  await page.evaluate(() => {
    const el = document.getElementById('skills');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.scrollBy({ top: 120, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'skills_mobile_page_transition.png') });

  console.log('All redesign verification screenshots captured successfully!');
  await browser.close();
}

run().catch(console.error);
