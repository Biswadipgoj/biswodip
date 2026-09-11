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

  page.on('console', msg => console.log('LOG:', msg.type(), msg.text()));
  page.on('pageerror', err => console.log('ERR:', err.message));

  console.log('Navigating to http://localhost:3000 ...');
  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded', timeout: 15000 });
  await new Promise(r => setTimeout(r, 2500));

  // 1. Hero 3D Computer Workstation with 120+ Action Telemetry
  console.log('Capturing Hero 3D Architecture Computer...');
  await new Promise(r => setTimeout(r, 3000));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'hero_3d_architecture_computer.png') });

  // 2. Switch Hero to Source Architecture Mode
  console.log('Switching Hero to Source Architecture mode...');
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const sourceBtn = btns.find(b => b.textContent?.includes('Source Architecture'));
    sourceBtn?.click();
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'hero_glassmorphic_source_architecture.png') });

  // Switch back to 3D mode
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const archBtn = btns.find(b => b.textContent?.includes('Architecture Runtime'));
    archBtn?.click();
  });
  await new Promise(r => setTimeout(r, 600));

  // 3. Skills Section - Topology Bus, AST, and 3D Cards
  console.log('Capturing Skills Frontend Layer...');
  await page.evaluate(() => {
    const el = document.getElementById('skills');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
    window.scrollBy({ top: 100, behavior: 'instant' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'skills_high_gradient_tech_stack.png') });

  // 4. Trigger 4-Sided Origami Fold Transition
  console.log('Triggering 4-sided 3D Origami Fold transition...');
  await page.evaluate(() => {
    const wipeBtn = document.getElementById('skill-btn-wipe');
    wipeBtn?.click();
  });
  await new Promise(r => setTimeout(r, 300));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'skills_4sided_origami_fold_active.png') });
  await new Promise(r => setTimeout(r, 900));

  // 5. Open Architectural Interface Inspector Modal
  console.log('Opening Inspector Modal on React & Next.js card...');
  await page.evaluate(() => {
    const btn = document.querySelector('button[data-inspect-btn="React & Next.js"]');
    btn?.click();
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'skills_architectural_inspector_modal.png') });

  // Dismiss modal
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const dismiss = btns.find(b => b.textContent?.includes('Dismiss'));
    dismiss?.click();
  });
  await new Promise(r => setTimeout(r, 400));

  // 6. Projects Erpixa
  console.log('Capturing Projects Erpixa...');
  await page.evaluate(() => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  });
  await new Promise(r => setTimeout(r, 1200));
  await page.screenshot({ path: path.join(ARTIFACTS_DIR, 'projects_contrast_verified.png') });

  console.log('All screenshots captured successfully!');
  await browser.close();
}

run().catch(console.error);
