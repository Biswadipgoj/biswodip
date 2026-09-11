import assert from 'node:assert/strict';
import fs from 'node:fs';
import puppeteer from 'puppeteer-core';
import { AxePuppeteer } from '@axe-core/puppeteer';
import { content } from './content.mjs';

const url = process.env.PORTFOLIO_URL || 'http://127.0.0.1:3002';
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true, args: ['--enable-webgl', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'] });
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));
const errors = [];
const checks = [];
const page = await browser.newPage();
page.on('pageerror', error => errors.push(error.message));
fs.mkdirSync('artifacts', { recursive: true });
const check = (condition, message) => { assert.ok(condition, message); checks.push(message); };
async function goTo(id) {
  await page.$eval(`#${id}`, element => element.scrollIntoView({ behavior: 'instant' }));
  await wait(700);
}
async function scrollThrough() {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let top = 0; top < height; top += 650) { await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), top); await wait(90); }
  await wait(800);
}
async function accessibility(label) {
  const results = await new AxePuppeteer(page).analyze();
  fs.writeFileSync(`artifacts/axe-${label}.json`, JSON.stringify(results, null, 2));
  const severe = results.violations.filter(issue => ['critical', 'serious'].includes(issue.impact));
  check(severe.length === 0, `${label}: no serious/critical accessibility issues: ${severe.map(issue => `${issue.id}: ${issue.nodes.map(node => node.target.join(' ')).join(', ')}`).join('; ')}`);
}
try {
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await page.evaluateOnNewDocument(() => {
    window.__bootTimes = [];
    let previous = false;
    new MutationObserver(() => {
      const present = !!document.querySelector('.boot-sequence');
      if (present !== previous) { window.__bootTimes.push({ present, time: performance.now() }); previous = present; }
    }).observe(document, { childList: true, subtree: true });
  });
  await page.goto(url, { waitUntil: 'networkidle2', timeout: 90000 });
  await page.waitForSelector('.scene-loaded canvas', { timeout: 30000 });
  await wait(1400);
  const boot = await page.evaluate(() => window.__bootTimes);
  fs.writeFileSync('artifacts/boot-timing.json', JSON.stringify(boot, null, 2));
  check(boot.length >= 2 && boot[1].time - boot[0].time <= 1500, 'First-visit boot completes within 1.5 seconds');
  check(await page.evaluate(() => sessionStorage.getItem('biswodip-experience-seen') === '1'), 'Boot records session completion');
  check((await page.$$('canvas')).length === 1, 'Desktop has exactly one WebGL canvas');
  await page.screenshot({ path: 'artifacts/desktop.png' });
  await page.locator('.scene-tools button').click();
  check(await page.$eval('.scene-tools button', el => el.getAttribute('aria-pressed') === 'true'), 'Sculpture pull-apart control works');
  const canvas = await page.$('canvas');
  const box = await canvas.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width / 2 + 75, box.y + box.height / 2 + 25, { steps: 12 });
  await page.mouse.up();
  check(await page.$('canvas') !== null, 'Sculpture remains usable after dragging');
  await page.reload({ waitUntil: 'networkidle2' });
  check((await page.evaluate(() => window.__bootTimes)).length === 0, 'Repeat visit skips the boot sequence');

  for (const link of content.nav) check(await page.$(`#${link.id}`) !== null, `Section anchor ${link.id} exists`);
  check((await page.$$('.project')).length === content.projects.length, 'All five projects share the same card structure');
  for (let index = 0; index < content.projects.length; index++) {
    const project = content.projects[index];
    const text = await page.$eval(`.project:nth-child(${index + 1})`, el => el.textContent);
    for (const expected of [project.name, project.blurb, project.description, ...project.tags, ...project.features]) assert.ok(text.includes(expected), `Missing ${project.name} content: ${expected}`);
    const links = await page.$$eval(`.project:nth-child(${index + 1}) a`, els => els.map(el => el.href));
    check(links.includes(project.url) && (!project.repo || links.includes(project.repo)), `${project.name}: copy, live URL and source link preserved`);
  }
  for (let index = 0; index < content.constellation.length; index++) {
    await goTo('skills'); await page.locator(`#skill-tab-${index}`).click(); await wait(350);
    const text = await page.$eval('[role=tabpanel]', el => el.textContent);
    check(content.constellation[index].crafts.every(craft => text.includes(craft.name) && text.includes(craft.vibe)), `All ${content.constellation[index].ring} skills are available`);
  }
  await page.focus('#skill-tab-3'); await page.keyboard.press('Home');
  check(await page.$eval('#skill-tab-0', el => el.getAttribute('aria-selected') === 'true' && el === document.activeElement), 'Skill tabs support keyboard Home and focus');
  await page.keyboard.press('ArrowRight');
  check(await page.$eval('#skill-tab-1', el => el.getAttribute('aria-selected') === 'true'), 'Skill tabs support arrow keys');
  await goTo('projects');
  await page.waitForSelector('.project:first-child iframe', { timeout: 10000 });
  check(await page.$eval('.project:first-child iframe', el => el.tabIndex === -1), 'Live previews do not capture keyboard tab navigation');
  const tilt = await page.$('.project:first-child .tilt-anchor');
  const bounds = await tilt.boundingBox();
  await page.mouse.move(bounds.x + bounds.width * .8, bounds.y + bounds.height * .35); await wait(450);
  check(await page.$eval('.project:first-child .tilt-surface', el => getComputedStyle(el).transform !== 'none'), 'Desktop device responds to pointer tilt');
  await page.screenshot({ path: 'artifacts/projects.png' });
  await scrollThrough();
  await accessibility('desktop');
  await page.screenshot({ path: 'artifacts/full-desktop.png', fullPage: true });

  await goTo('contact');
  check(await page.$eval('.contact-form', form => !form.checkValidity()), 'Empty contact form is invalid');
  await page.type('#contact-name', 'Portfolio reviewer');
  await page.type('#contact-email', 'reviewer@example.com');
  await page.type('#contact-message', 'Testing a draft with ampersand & newline-safe text.');
  check(await page.$eval('.contact-form', form => form.checkValidity()), 'Valid contact fields are accepted');
  await page.locator('.contact-form button[type=submit]').click();
  await page.waitForSelector('.form-status a');
  const draft = await page.$eval('.form-status a', link => link.href);
  check(draft.startsWith(`mailto:${content.personal.email}?`) && decodeURIComponent(draft).includes('ampersand & newline-safe'), 'Contact prepares an encoded email draft without claiming delivery');
  await browser.defaultBrowserContext().overridePermissions(url, ['clipboard-read', 'clipboard-write']);
  await page.locator('.copy-email').click();
  check(await page.evaluate(() => navigator.clipboard.readText()) === content.personal.email, 'Copy email writes the correct address');
  await page.evaluate(() => Object.defineProperty(navigator.clipboard, 'writeText', { configurable: true, value: () => Promise.reject(new Error('Clipboard denied')) }));
  await page.locator('.copy-email').click(); await wait(100);
  check(await page.$eval('.copy-status', el => el.textContent.includes('Select the email')), 'Clipboard-denied fallback is visible');
  await page.screenshot({ path: 'artifacts/contact.png' });

  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  const mobileRequests = [];
  const track = request => mobileRequests.push(request.url()); page.on('request', track);
  await page.goto(url, { waitUntil: 'networkidle2' });
  check(await page.$('canvas') === null, 'Mobile does not mount WebGL');
  check(await page.$('iframe') === null, 'Mobile does not load remote apps automatically');
  await page.screenshot({ path: 'artifacts/mobile.png' });
  await page.locator('.menu-toggle').click();
  check(await page.$('#mobile-nav') !== null, 'Mobile menu opens');
  await page.keyboard.press('Escape');
  check(await page.$('#mobile-nav') === null && await page.$eval('.menu-toggle', el => el === document.activeElement), 'Escape dismisses the menu and restores focus');
  await page.locator('.menu-toggle').click(); await page.locator('#mobile-nav a[href="#projects"]').click();
  check(await page.$('#mobile-nav') === null, 'Selecting a mobile navigation link closes the menu');
  await goTo('projects');
  const firstDevice = await page.$('.project:first-child .device-footer button');
  await firstDevice.click(); await page.waitForSelector('.project:first-child iframe');
  await firstDevice.click();
  check(await page.$('.project:first-child iframe') === null, 'Mobile live preview loads and pauses on request');
  for (const index of [3, 4, 5]) check(await page.$(`.project:nth-child(${index}) iframe`) === null, `Frame-blocked project ${index} uses a real snapshot`);
  await scrollThrough(); await accessibility('mobile');
  await page.screenshot({ path: 'artifacts/full-mobile.png', fullPage: true });
  page.off('request', track);
  const manifest = JSON.parse(fs.readFileSync('.next/react-loadable-manifest.json', 'utf8'));
  const sceneFiles = Object.entries(manifest).filter(([key]) => key.includes('StudioScene')).flatMap(([, value]) => value.files);
  check(sceneFiles.length > 0 && !mobileRequests.some(request => sceneFiles.some(file => request.endsWith(file))), 'Mobile does not download the deferred scene bundle');

  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1, isMobile: false, hasTouch: false });
  await page.evaluate(() => sessionStorage.clear());
  await page.goto(url, { waitUntil: 'networkidle2' });
  check(await page.$('canvas') === null && await page.$('.boot-sequence') === null, 'Reduced motion skips WebGL and loader');
  await scrollThrough();
  check(await page.$$eval('.depth-layer, .tilt-surface', els => els.every(el => ['none', 'matrix(1, 0, 0, 1, 0, 0)'].includes(getComputedStyle(el).transform))), 'Reduced motion freezes all depth and tilt transforms');
  for (const width of [320, 390, 768, 1024, 1440, 1728, 1920]) {
    await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `No horizontal overflow at ${width}px`);
  }
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'no-preference' }]);
  await page.goto(url, { waitUntil: 'networkidle2' });
  await page.locator('.motion-switch').click(); await wait(300);
  check(await page.$('canvas') === null && await page.$eval('.motion-switch', el => el.getAttribute('aria-pressed') === 'true'), 'Pause control disables the animated experience');
  await page.locator('.motion-switch').click();
  await page.waitForSelector('canvas', { timeout: 30000 });
  check(await page.$eval('.motion-switch', el => el.getAttribute('aria-pressed') === 'false'), 'Motion can be enabled again');
  check(errors.length === 0, `No uncaught browser errors: ${errors.join('; ')}`);
  fs.writeFileSync('artifacts/browser-checks.json', JSON.stringify({ passed: checks, errors }, null, 2));
  console.log(`PASS: ${checks.length} browser checks; desktop/mobile axe scans; content fidelity; motion, preview and contact flows.`);
} catch (error) {
  await page.screenshot({ path: 'artifacts/test-failure.png' });
  fs.writeFileSync('artifacts/browser-checks.json', JSON.stringify({ passed: checks, errors, failure: error.message }, null, 2));
  throw error;
} finally { await browser.close(); }
