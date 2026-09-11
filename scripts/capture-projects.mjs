import puppeteer from 'puppeteer-core';
import fs from 'node:fs';
import { content } from './content.mjs';
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
fs.mkdirSync('public/previews', { recursive: true });
try {
  for (const project of content.projects) {
    const page = await browser.newPage();
    try {
      await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 1 });
      const response = await page.goto(project.url, { waitUntil: 'networkidle2', timeout: 45000 });
      await new Promise(resolve => setTimeout(resolve, 2200));
      await page.screenshot({ path: `public/previews/${project.name.toLowerCase()}.webp`, type: 'webp', quality: 82 });
      console.log(JSON.stringify({ project: project.name, status: response?.status(), url: page.url(), framePolicy: response?.headers()['x-frame-options'] || response?.headers()['content-security-policy'] || 'none', title: await page.title() }));
    } catch (error) { console.error(project.name, error.message); process.exitCode = 1; }
    finally { await page.close(); }
  }
} finally { await browser.close(); }
