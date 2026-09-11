import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true, args: ['--enable-webgl', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader'] });
fs.mkdirSync('artifacts', { recursive: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(error.message));
try {
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:3001', { waitUntil: 'networkidle2', timeout: 90000 });
  await new Promise(resolve => setTimeout(resolve, 2500));
  await page.screenshot({ path: 'artifacts/desktop.png' });
  const size = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < size; y += 700) { await page.evaluate(y => scrollTo({ top: y, behavior: 'instant' }), y); await new Promise(resolve => setTimeout(resolve, 130)); }
  await new Promise(resolve => setTimeout(resolve, 800));
  await page.screenshot({ path: 'artifacts/full-desktop.png', fullPage: true });
  for (const id of ['projects', 'contact']) {
    await page.$eval(`#${id}`, el => el.scrollIntoView({ behavior: 'instant' }));
    await new Promise(resolve => setTimeout(resolve, 900));
    await page.screenshot({ path: `artifacts/${id}.png` });
  }
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
  await page.goto(process.env.PORTFOLIO_URL || 'http://127.0.0.1:3001', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'artifacts/mobile.png' });
  console.log(JSON.stringify({ errors, mobileOverflow: await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), mobileCanvas: await page.$('canvas') !== null }));
} finally { await browser.close(); }
