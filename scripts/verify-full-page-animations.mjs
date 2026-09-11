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
  await new Promise(r => setTimeout(r, 2500));

  // 1. Capture Skills Layer 01 (Frontend) Desktop
  console.log('Scrolling to Skills Layer 01...');
  await page.evaluate(() => {
    const skills = document.getElementById('skills');
    if (skills) {
      const top = skills.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, top + 80);
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'skills_high_gradient_layer01.png') });

  // 2. Trigger multi-directional wipe to Layer 02
  console.log('Triggering multi-directional wipe to Layer 02...');
  const wipeBtn = await page.$('button[title*="next direction vector wipe"]');
  if (wipeBtn) {
    await wipeBtn.click();
    await new Promise(r => setTimeout(r, 380));
    await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'skills_multi_direction_wipe_midair.png') });
  }

  // Click Layer 02 directly
  console.log('Clicking Layer 02 (Backend & APIs)...');
  await page.evaluate(() => {
    const btn = document.getElementById('skill-tab-1');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1300));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'skills_high_gradient_layer02.png') });

  // Click Layer 03 (DevOps & Cloud)
  console.log('Clicking Layer 03 (DevOps & Cloud)...');
  await page.evaluate(() => {
    const btn = document.getElementById('skill-tab-2');
    if (btn) btn.click();
  });
  await new Promise(r => setTimeout(r, 1300));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'skills_high_gradient_layer03.png') });

  // 3. Projects Section: Erpixa
  console.log('Scrolling to Projects Section (Erpixa)...');
  await page.evaluate(() => {
    const proj = document.getElementById('projects');
    if (proj) {
      const top = proj.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, top + 100);
    }
  });
  await new Promise(r => setTimeout(r, 1600));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'projects_erpixa_high_gradient_verified.png') });

  // 4. Projects Section: TelePoint
  console.log('Advancing to TelePoint via #project-btn-next...');
  await page.evaluate(() => {
    const nextBtn = document.getElementById('project-btn-next');
    if (nextBtn) nextBtn.click();
  });
  await new Promise(r => setTimeout(r, 1300));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'projects_telepoint_high_gradient_verified.png') });

  // 5. Projects Section: Tripmate
  console.log('Advancing to Tripmate via #project-tab-2...');
  await page.evaluate(() => {
    const tab = document.getElementById('project-tab-2');
    if (tab) tab.click();
  });
  await new Promise(r => setTimeout(r, 1300));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'projects_tripmate_high_gradient_verified.png') });

  // 6. Mobile Viewport (390 x 844) - Skills
  console.log('Switching to mobile viewport (390 x 844)...');
  await page.setViewport({ width: 390, height: 844 });
  await page.evaluate(() => {
    const skills = document.getElementById('skills');
    if (skills) {
      const top = skills.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, top + 80);
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'skills_mobile_zero_overlap.png') });

  // 7. Mobile Viewport - Projects
  console.log('Mobile Viewport Projects...');
  await page.evaluate(() => {
    const proj = document.getElementById('projects');
    if (proj) {
      const top = proj.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo(0, top + 80);
    }
  });
  await new Promise(r => setTimeout(r, 1500));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'projects_mobile_high_gradient_verified.png') });

  console.log('All verification screenshots captured successfully!');
  await browser.close();
}

run().catch(console.error);
