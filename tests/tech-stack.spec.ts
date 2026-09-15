import { test, expect } from '@playwright/test';

test.describe('Portfolio: tech stack, projects, navigation', () => {
  test('home loads with no fatal errors and every major section is present', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', error => errors.push(error.message));

    await page.goto('/');
    await expect(page.locator('#hero')).toBeVisible();
    for (const id of ['about', 'skills', 'pipeline', 'projects', 'journey', 'contact']) {
      await expect(page.locator(`#${id}`)).toBeAttached();
    }
    expect(errors, errors.join('\n')).toEqual([]);
  });

  test('tech stack traverses all four layers in order with 12 tools each', async ({ page }) => {
    await page.goto('/');
    const skills = page.locator('#skills');
    await skills.scrollIntoViewIfNeeded();
    await expect(skills).toHaveAttribute('data-hydrated', 'true', { timeout: 10000 });

    const titles = [
      'Frontend UI Systems',
      'Distributed Backend & APIs',
      'Cloud Infrastructure & DevOps',
      'Data Engineering & Distributed Tooling',
    ];

    for (let layer = 0; layer < titles.length; layer += 1) {
      await page.locator(`#skill-tab-${layer}`).click({ force: true });
      const panel = page.locator(`#skill-panel-${layer}`);
      await expect(panel).toBeVisible();
      await expect(panel.locator('h3')).toContainText(titles[layer]);
      await expect(panel.locator('[data-inspect-btn]')).toHaveCount(12);
    }

    // Return to the first layer and assert its own content, not the last layer's.
    await page.locator('#skill-tab-0').click({ force: true });
    const frontPanel = page.locator('#skill-panel-0');
    await expect(frontPanel).toBeVisible();
    await expect(frontPanel.getByText('React & Next.js').first()).toBeVisible();
  });

  test('inspector opens as an accessible dialog and closes with Escape', async ({ page }) => {
    await page.goto('/');
    await page.locator('#skills').scrollIntoViewIfNeeded();
    await page.locator('button[data-inspect-btn="React & Next.js"]').first().click({ force: true });

    const dialog = page.getByRole('dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toContainText('Where this is used');
    await expect(dialog).toContainText('Example code');

    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
  });

  test('all real projects are represented with Explore Details and live links', async ({ page }) => {
    await page.goto('/');
    const skills = page.locator('#projects');
    await skills.scrollIntoViewIfNeeded();
    await expect(page.locator('#projects .project')).toHaveCount(5);
    await expect(page.locator('#projects a', { hasText: 'Explore Details' })).toHaveCount(5);
  });

  test('project detail deep link renders', async ({ page }) => {
    await page.goto('/project/erpixa');
    await expect(page.locator('.detail-grid')).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Erpixa');
  });

  test('no horizontal page overflow on the home page', async ({ page }) => {
    await page.goto('/');
    await page.waitForTimeout(500);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow).toBeLessThanOrEqual(1);
  });

  test('reduced motion keeps tech content visible', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    await page.locator('#skills').scrollIntoViewIfNeeded();
    await expect(page.locator('#skill-panel-0')).toBeVisible();
    await expect(page.locator('#skills [data-inspect-btn]')).toHaveCount(12);
  });
});
