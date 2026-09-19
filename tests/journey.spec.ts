import { test, expect } from '@playwright/test';

/**
 * Journey structure audit for the rebuilt portfolio.
 * Verifies the chapter chain, real content, and absence of overflow.
 */

const CHAPTERS = [
  '#opening',
  '#identity',
  '#process',
  '#api',
  '#projects',
  '#capabilities',
  '#about',
  '#contact',
];

test.describe('journey structure', () => {
  test('all chapters exist in order', async ({ page }) => {
    await page.goto('/');
    for (const sel of CHAPTERS) {
      await expect(page.locator(sel)).toHaveCount(1);
    }

    const order = await page.evaluate((sels) => {
      return sels
        .map((s) => document.querySelector(s))
        .filter(Boolean)
        .map((el) => (el as HTMLElement).getBoundingClientRect().top + window.scrollY);
    }, CHAPTERS);
    const sorted = [...order].sort((a, b) => a - b);
    expect(order).toEqual(sorted);
  });

  test('identity shows real name and education', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#identity')).toContainText('Biswodip');
    await expect(page.locator('#about')).toContainText('MAKAUT');
    await expect(page.locator('#about')).toContainText('WBSCTE');
  });

  test('all five real projects with real screenshots', async ({ page }) => {
    await page.goto('/');
    for (const slug of ['erpixa', 'nanolink', 'nexora', 'telepoint', 'tripmate']) {
      const img = page.locator(`img[alt*="${slug === 'erpixa' ? 'Erpixa' : slug === 'nanolink' ? 'NanoLink' : slug === 'nexora' ? 'Nexora' : slug === 'telepoint' ? 'TelePoint' : 'Tripmate'}"]`).first();
      await expect(img).toBeAttached();
    }
  });

  test('no horizontal overflow', async ({ page }) => {
    await page.goto('/');
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
    );
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('no console errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', (err) => errors.push(String(err)));
    await page.goto('/');
    await page.waitForTimeout(2500);
    expect(errors).toEqual([]);
  });
});

test.describe('project detail pages', () => {
  for (const slug of ['erpixa', 'nanolink', 'nexora', 'telepoint', 'tripmate']) {
    test(`/project/${slug} renders real content`, async ({ page }) => {
      await page.goto(`/project/${slug}`);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('img')).toHaveCount(1);
      await expect(page.getByRole('link', { name: /↗/ }).first()).toBeVisible();
    });
  }
});
