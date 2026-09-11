import fs from 'node:fs';
import lighthouse from 'lighthouse';
import puppeteer from 'puppeteer-core';

const url = process.env.PORTFOLIO_URL || 'http://127.0.0.1:3029';
const browser = await puppeteer.launch({ executablePath: process.env.CHROME_PATH || 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', headless: true });
fs.mkdirSync('artifacts', { recursive: true });
try {
  const result = await lighthouse(url, { port: Number(new URL(browser.wsEndpoint()).port), output: ['html', 'json'], onlyCategories: ['performance', 'accessibility'], logLevel: 'error', throttlingMethod: 'simulate' });
  if (!result) throw new Error('No Lighthouse result');
  const { lhr, report } = result;
  fs.writeFileSync('artifacts/lighthouse-mobile.html', report[0]);
  fs.writeFileSync('artifacts/lighthouse-mobile.json', report[1]);
  const summary = {
    performance: Math.round(lhr.categories.performance.score * 100),
    accessibility: Math.round(lhr.categories.accessibility.score * 100),
    lcpMs: Math.round(lhr.audits['largest-contentful-paint'].numericValue),
    fcpMs: Math.round(lhr.audits['first-contentful-paint'].numericValue),
    tbtMs: Math.round(lhr.audits['total-blocking-time'].numericValue),
    cls: lhr.audits['cumulative-layout-shift'].numericValue,
    environment: lhr.configSettings,
    findings: Object.values(lhr.audits).filter(a => a.score !== null && a.score < 0.9).map(a => ({ id: a.id, title: a.title, value: a.displayValue })),
  };
  fs.writeFileSync('artifacts/performance-summary.json', JSON.stringify(summary, null, 2));
  console.log(JSON.stringify(summary, null, 2));
  if (summary.performance < 90 || summary.accessibility < 95 || summary.lcpMs > 2500) process.exitCode = 1;
} finally { await browser.close(); }
