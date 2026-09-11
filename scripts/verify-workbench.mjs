import assert from 'node:assert/strict';
import fs from 'node:fs';
import puppeteer from 'puppeteer-core';
import { AxePuppeteer } from '@axe-core/puppeteer';

const url = process.env.PORTFOLIO_URL || 'http://127.0.0.1:3017';
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
fs.mkdirSync('artifacts/workbench', { recursive: true });
const results = [];
const errors = [];
try {
  const page = await browser.newPage();
  page.on('pageerror', error => errors.push(error.message));
  if (process.env.INSPECT_REFERENCE === '1') {
    try {
      await page.setViewport({ width: 1440, height: 1000 });
      await page.goto('https://jiro.build/components/header/pet-daycare-header-pawvie', { waitUntil: 'networkidle2', timeout: 45000 });
      await page.screenshot({ path: 'artifacts/workbench/reference.png', fullPage: true });
      results.push({ reference: await page.evaluate(() => ({ title: document.title, text: document.body.innerText.slice(0, 10000), frames: [...document.querySelectorAll('iframe')].map(frame => frame.src) })) });
    } catch (error) { results.push({ referenceError: error.message }); }
  }
  for (const width of [320, 390, 768, 1440, 1920]) {
    await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
    await page.goto(url, { waitUntil: 'networkidle2' });
    await wait(1000);
    assert.equal(await page.$eval('body', el => getComputedStyle(el).backgroundColor), 'rgb(169, 190, 198)');
    for (const id of ['hero', 'about', 'skills', 'projects', 'github', 'journey', 'impact', 'contact']) assert.ok(await page.$(`#${id}`), `Missing ${id}`);
    const overflow = await page.evaluate(() => [...document.querySelectorAll('main h1, main h2, main h3, main p, main input, main textarea, .project, .skill-tabs')].filter(el => { const r = el.getBoundingClientRect(); return r.width && (r.right > innerWidth + 1 || r.left < -1); }).map(el => ({ tag: el.tagName, className: el.className, text: el.textContent.slice(0, 60) })));
    assert.deepEqual(overflow, [], `${width}px overflow: ${JSON.stringify(overflow)}`);
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${width}px document overflow`);
    await page.screenshot({ path: `artifacts/workbench/hero-${width}.png` });
    const projects = await page.$$('.project');
    assert.equal(projects.length, 5);
    for (const project of projects) {
      await project.evaluate(el => el.scrollIntoView({ behavior: 'instant', block: 'center' }));
      await wait(160);
      const collision = await project.evaluate(el => { const copy = el.querySelector('.project-copy').getBoundingClientRect(); const visual = el.querySelector('.project-visual').getBoundingClientRect(); return copy.left < visual.right - 1 && copy.right > visual.left + 1 && copy.top < visual.bottom - 1 && copy.bottom > visual.top + 1; });
      assert.equal(collision, false, `${width}px project copy/visual overlap`);
    }
    await page.$eval('#skills', el => el.scrollIntoView({ behavior: 'instant' }));
    let panelHeight;
    for (const index of [0, 1, 2, 3, 0, 3, 1]) {
      await page.click(`#skill-tab-${index}`);
      const height = await page.$eval('.skill-panels', el => el.getBoundingClientRect().height);
      if (panelHeight) assert.ok(Math.abs(panelHeight - height) < 1, 'Skills height remains stable');
      panelHeight = height;
      assert.equal(await page.$$eval('.skill-panel.is-active .skill', els => els.length), 12);
    }
    await page.focus('#skill-tab-1'); await page.keyboard.press('Home');
    assert.equal(await page.$eval('#skill-tab-0', el => el.getAttribute('aria-selected')), 'true');
    if ([390, 768, 1440].includes(width)) {
      for (const id of ['about', 'skills', 'projects', 'journey', 'impact', 'contact']) {
        await page.$eval(`#${id}`, el => el.scrollIntoView({ behavior: 'instant' })); await wait(250);
        await page.screenshot({ path: `artifacts/workbench/${id}-${width}.png` });
      }
      await page.screenshot({ path: `artifacts/workbench/full-${width}.png`, fullPage: true });
    }
    if (width === 390) {
      await page.click('.menu-toggle'); assert.ok(await page.$('#mobile-nav'));
      await page.keyboard.press('Escape'); assert.equal(await page.$('#mobile-nav'), null);
    }
    if (width === 390 || width === 1440) {
      const axe = await new AxePuppeteer(page).analyze();
      fs.writeFileSync(`artifacts/workbench/axe-${width}.json`, JSON.stringify(axe, null, 2));
      const severe = axe.violations.filter(issue => ['critical', 'serious'].includes(issue.impact));
      assert.deepEqual(severe.map(issue => ({ id: issue.id, targets: issue.nodes.map(node => node.target) })), [], `${width}px accessibility`);
    }
    results.push({ width, overflow: false, projectCollisions: false, stableSkillHeight: panelHeight });
  }
  await page.$eval('#about', el => el.scrollIntoView({ behavior: 'instant' }));
  await page.type('#terminal-command', 'projects'); await page.keyboard.press('Enter');
  assert.ok(await page.$eval('.terminal-output', el => el.textContent.includes('Erpixa')));
  await page.$eval('#contact', el => el.scrollIntoView({ behavior: 'instant' }));
  assert.equal(await page.$eval('.contact-form', el => el.checkValidity()), false);
  await page.type('#contact-name', 'Browser Test'); await page.type('#contact-email', 'test@example.com'); await page.type('#contact-message', 'Testing the portfolio contact draft.');
  await page.click('.contact-form button[type=submit]');
  await page.waitForSelector('.form-status a');
  assert.ok((await page.$eval('.form-status a', el => el.href)).includes('test%40example.com'));
  await page.click('.motion-switch');
  assert.ok(await page.$('.motion-paused'));
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.reload({ waitUntil: 'networkidle2' });
  assert.equal(await page.$eval('.signal', el => getComputedStyle(el).animationName), 'none');
  const links = await page.$$eval('.project-copy a[href^="/project/"]', els => els.map(el => el.href));
  for (const link of links) {
    const response = await page.goto(link, { waitUntil: 'networkidle2' });
    assert.equal(response.status(), 200);
    assert.ok(await page.$('.detail-grid'));
  }
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.evaluate(() => { document.documentElement.style.zoom = '2'; });
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), '200% zoom overflow');
  await page.screenshot({ path: 'artifacts/workbench/zoom-200.png' });
  assert.deepEqual(errors, [], 'Browser runtime errors');
  results.push({ terminal: true, formDraft: true, reducedMotion: true, projectRoutes: links.length, zoom200: true, runtimeErrors: errors });
  console.log(JSON.stringify(results, null, 2));
} finally { fs.writeFileSync('artifacts/workbench/results.json', JSON.stringify(results, null, 2)); await browser.close(); }
