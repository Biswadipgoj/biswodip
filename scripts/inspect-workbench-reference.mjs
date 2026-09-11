import fs from 'node:fs';
import puppeteer from 'puppeteer-core';

const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
fs.mkdirSync('artifacts/workbench', { recursive: true });
try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 1000 });
  await page.goto('https://jiro.build/preview/component/marketing-blocks/header/pet-daycare-header-pawvie', { waitUntil: 'domcontentloaded', timeout: 45000 });
  const snapshots = [];
  for (const delay of [100, 400, 800, 1600]) {
    await new Promise(resolve => setTimeout(resolve, delay));
    snapshots.push(await page.evaluate(() => ({ time: performance.now(), animations: document.getAnimations().map(a => ({ target: a.effect?.target?.className, timing: a.effect?.getTiming(), frames: a.effect?.getKeyframes() })) })));
    await page.screenshot({ path: `artifacts/workbench/reference-${delay}.png` });
  }
  const controls = await page.$$('button, a');
  if (controls.length) await controls[controls.length - 1].hover();
  const styles = await page.evaluate(() => [...document.querySelectorAll('style')].map(el => el.textContent).join('\n'));
  fs.writeFileSync('artifacts/workbench/reference-motion.json', JSON.stringify({ snapshots, styles }, null, 2));
  console.log(JSON.stringify(snapshots.map(s => ({ time: s.time, animations: s.animations.map(a => ({ target: a.target, timing: a.timing })) })), null, 2));
} finally { await browser.close(); }
