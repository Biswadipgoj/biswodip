import { test, expect } from '@playwright/test';

test('LinkedIn links use the exact supplied profile URL', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('a[href*="linkedin.com"]');
  expect(await links.count()).toBeGreaterThanOrEqual(3);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/biswodipgoj');
    await expect(link).toHaveAttribute('rel', /noopener/);
  }
});

test('resume is reachable and serves a real PDF', async ({ page, request }) => {
  await page.goto('/#resume');
  await expect(page.locator('#resume')).toContainText('Professional experience');
  const response = await request.get('/Biswodip-Goj-Resume.pdf');
  expect(response.ok()).toBeTruthy();
  expect((await response.body()).subarray(0, 5).toString()).toBe('%PDF-');
  await expect.poll(() => page.locator('#resume .document-preview-img').evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
  // The résumé card carries the candidate's real portrait.
  await expect.poll(() => page.locator('#resume .candidate-photo img').evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
});

test('the PDF résumé links to repositories that exist in lib/data.ts', async ({ request }) => {
  const pdf = (await (await request.get('/Biswodip-Goj-Resume.pdf')).body()).toString('latin1');
  // Every GitHub link in the document points at the account the site links to.
  expect(pdf).not.toContain('github.com/Biswodipgoj');
  for (const repo of ['Erpixa', 'nl', 'telepoint', 'nexora', 'trip']) expect(pdf).toContain(`https://github.com/Biswadipgoj/${repo}`);
});

test('public copy avoids ATS and filler wording recruiters discount', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).not.toContainText(/\bATS\b|dossier|deterministic|shielded/i);
});

test('canonical and sitemap use the same source domain', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://biswodip.in');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  for (const slug of ['erpixa', 'nanolink', 'telepoint', 'nexora', 'tripmate']) {
    expect(sitemap).toContain(`https://biswodip.in/project/${slug}`);
  }
});

