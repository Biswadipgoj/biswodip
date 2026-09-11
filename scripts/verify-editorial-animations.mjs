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

  // Ensure animations run without reduced motion restriction
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);

  page.on('console', msg => console.log('LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('ERR:', err.message));

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 20000 });
  await new Promise(r => setTimeout(r, 2000));

  // 1. Scroll directly to the demo card
  console.log('Scrolling to center of demo card...');
  await page.evaluate(() => {
    const el = document.querySelector('#motion-labs .rounded-3xl');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1200));

  // Capture Page Transition Demo - State A
  console.log('Capturing Page Transition Demo (State A)...');
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'page_transition_state_a.png') });

  // Trigger wipe to State B
  console.log('Triggering wipe to State B...');
  const wipeBtn = await page.evaluateHandle(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    return buttons.find(b => b.textContent?.includes('Trigger Wipe'));
  });
  if (wipeBtn.asElement()) {
    await wipeBtn.asElement().click();
    // Capture mid-transition
    await new Promise(r => setTimeout(r, 900));
    console.log('Capturing mid-transition diagonal wipe...');
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'page_transition_wiping.png') });

    // Wait for full reveal of State B
    await new Promise(r => setTimeout(r, 1600));
    console.log('Capturing State B revealed...');
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'page_transition_state_b.png') });
  }

  // Switch to Demo 02: Experimental 3D Curved Slider
  console.log('Switching to Demo 02 (Slider)...');
  const sliderTab = await page.$('#btn-demo-slider');
  if (sliderTab) {
    await sliderTab.click();
    await new Promise(r => setTimeout(r, 1500));
    console.log('Capturing Experimental Slider Demo (Initial Slide 1)...');
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'slider_demo_initial.png') });

    // Click Next slide
    console.log('Advancing slider to slide 2...');
    const nextBtn = await page.$('button[aria-label="Next Slide"]');
    if (nextBtn) {
      await nextBtn.click();
      await new Promise(r => setTimeout(r, 800)); // mid-motion
      await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'slider_demo_in_motion.png') });

      await new Promise(r => setTimeout(r, 1200)); // settled
      await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'slider_demo_slide_2.png') });
    }
  }

  // Mobile viewport test (390 x 844)
  console.log('Testing Mobile Viewport (390 x 844)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => {
    const el = document.querySelector('#motion-labs .rounded-3xl');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'slider_mobile_view.png') });

  // Switch to Page Transition on Mobile
  const transitionTabMobile = await page.$('#btn-demo-transition');
  if (transitionTabMobile) {
    await transitionTabMobile.click();
    await new Promise(r => setTimeout(r, 1200));
    await page.evaluate(() => {
      const el = document.querySelector('#motion-labs .rounded-3xl');
      if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
    });
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'page_transition_mobile_view.png') });
  }

  console.log('All verification screenshots captured successfully!');
  await browser.close();
}

run().catch(console.error);
