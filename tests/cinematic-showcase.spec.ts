import { test, expect, type Page, type Locator } from '@playwright/test';

const headlines = [
  'GOOD IDEAS. GREAT SOFTWARE.',
  'BUSINESS MANAGEMENT, FINALLY WITHOUT THE BLOAT.',
  'REAL-TIME COMMUNICATION, REIMAGINED.',
  'PLAN JOURNEYS THAT FEEL EFFORTLESS.',
  'SHORTEN ANY LINK. SHARE IT ANYWHERE.',
  'PLAN THE WORK. WATCH IT MOVE. FINISH IT TOGETHER.',
  'THE BEST STORIES START WHEN YOU SHIP.',
];
const projects = [
  { name: 'Erpixa', url: 'https://erpixa.vercel.app/', repo: 'https://github.com/Biswadipgoj/Erpixa' },
  { name: 'TelePoint', url: 'https://telepoint-topaz.vercel.app/' },
  { name: 'Tripmate', url: 'https://trip-mu-coral.vercel.app/' },
  { name: 'NanoLink', url: 'https://nanl.vercel.app/', repo: 'https://github.com/Biswadipgoj/nl' },
  { name: 'Nexora', url: 'https://nexora-xi-rust.vercel.app/', repo: 'https://github.com/Biswadipgoj/nexora' },
];
type ScrollWindow = Window & { __portfolioScrollTo: (top: number, immediate: boolean) => void };
const panels = (page: Page) => page.locator('#projects article[data-panel]');

async function openShowcase(page: Page, pinned: boolean) {
  await page.goto('/');
  await page.waitForFunction(() => typeof (window as unknown as ScrollWindow).__portfolioScrollTo === 'function');
  await expect(page.locator('#projects')).toHaveAttribute('data-pinned', String(pinned));
  await expect(panels(page)).toHaveCount(7);
  await page.evaluate(() => document.fonts.ready);
}

async function scrollToProgress(page: Page, progress: number) {
  const top = await page.locator('#projects > div').evaluate((track, value) =>
    track.getBoundingClientRect().top + window.scrollY + (track.getBoundingClientRect().height - innerHeight) * value,
  progress);
  await page.evaluate(y => (window as unknown as ScrollWindow).__portfolioScrollTo(y, true), top);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeCloseTo(top, 0);
}

async function expectState(page: Page, index: number) {
  await expect.poll(() => panels(page).evaluateAll(nodes => nodes.map(node =>
    Math.round(Number(getComputedStyle(node).opacity) * 100) / 100,
  ))).toEqual(headlines.map((_, i) => i === index ? 1 : 0));
  await expect(page.locator('#projects').getByRole('heading', { level: 3 })).toHaveText(headlines[index]);
  await expect(page.locator('#projects')).toContainText(`${String(index + 1).padStart(2, '0')} / 07`);
  for (let i = 0; i < 7; i++) {
    const panel = panels(page).nth(i);
    if (i === index) {
      await expect(panel).not.toHaveAttribute('aria-hidden', 'true');
      await expect(panel).toHaveCSS('pointer-events', 'auto');
    } else {
      await expect(panel).toHaveAttribute('aria-hidden', 'true');
      await expect(panel).toHaveCSS('pointer-events', 'none');
    }
    expect(await panel.locator('a').evaluateAll((links, active) => links.every(link => link.tabIndex === (active ? 0 : -1)), i === index)).toBe(true);
  }
}

async function expectStacked(page: Page) {
  await expect(page.locator('#projects')).toHaveAttribute('data-pinned', 'false');
  await expect(page.locator('#projects').getByRole('heading', { level: 3 })).toHaveText(headlines);
  await expect.soft.poll(() => panels(page).evaluateAll(nodes => nodes.map(node => getComputedStyle(node).opacity)), {
    message: 'All seven panels must become opaque after switching to stacked reading',
  }).toEqual(headlines.map(() => '1'));
  const geometry = await panels(page).evaluateAll(nodes => nodes.map(node => {
    const rect = node.getBoundingClientRect();
    return { top: rect.top, bottom: rect.bottom, height: rect.height, position: getComputedStyle(node).position, opacity: getComputedStyle(node).opacity };
  }));
  geometry.forEach((rect, index) => {
    expect(rect.position).toBe('relative');
    expect(rect.height).toBeGreaterThanOrEqual(page.viewportSize()!.height - 1);
    if (index) expect(rect.top).toBeGreaterThanOrEqual(geometry[index - 1].bottom - 1);
  });
  expect(await panels(page).locator('a').evaluateAll(links => links.every(link => link.tabIndex === 0))).toBe(true);
  await expect(page.locator('#projects [data-playing="true"]')).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
}

async function expectHitTarget(locator: Locator) {
  await expect(locator).toBeInViewport();
  expect(await locator.evaluate(element => {
    const rect = element.getBoundingClientRect();
    const hit = document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2);
    return hit === element || element.contains(hit);
  })).toBe(true);
}

test.describe('Cinematic showcase', () => {
  test('SSR returns all seven headlines and real project links in HTML', async ({ request }) => {
    const response = await request.get('/');
    expect(response.ok()).toBe(true);
    const html = await response.text();
    // Restrict assertions to rendered section markup, not Next's serialized hydration data.
    const section = html.match(/<section\b[^>]*\bid="projects"[^>]*>[\s\S]*?<\/section>/)?.[0];
    expect(section).toBeTruthy();
    for (const headline of headlines) expect(section).toContain(`>${headline}</h3>`);
    expect(section!.match(/data-panel="[1-7]"/g)).toHaveLength(7);
    for (const project of projects) {
      expect(section).toContain(`href="/project/${project.name.toLowerCase()}"`);
      expect(section).toContain(`href="${project.url}"`);
      if (project.repo) expect(section).toContain(`href="${project.repo}"`);
    }
    expect(section).toContain('href="#contact"');
  });

  test('each story has the matching project details, live link and technology stack', async ({ page }) => {
    await page.goto('/');
    for (const [index, project] of projects.entries()) {
      const panel = panels(page).filter({ has: page.getByText(headlines[index + 1], { exact: true }) });
      await expect.soft(panel.locator('a', { hasText: 'Explore Details' })).toHaveAttribute('href', `/project/${project.name.toLowerCase()}`, { timeout: 1000 });
      await expect.soft(panel.locator('a', { hasText: 'View live' })).toHaveAttribute('href', project.url, { timeout: 1000 });
      await expect.soft(panel.locator('ul')).toHaveAttribute('aria-label', `${project.name} technology stack`, { timeout: 1000 });
    }
  });

  test.describe('Desktop motion', () => {
    test.beforeEach(async ({ page }) => {
      test.skip(page.viewportSize()!.width < 1024, 'Pinned motion requires a desktop viewport.');
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      await openShowcase(page, true);
    });

    test('all seven scroll states are visible and accessible in order', async ({ page }, testInfo) => {
      for (let index = 0; index < 7; index++) {
        await scrollToProgress(page, (index + 0.5) / 7);
        await expectState(page, index);
        if (index === 1) {
          await expect.poll(() => panels(page).nth(index).locator('img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
          const path = testInfo.outputPath('desktop-project.png');
          await page.screenshot({ path });
          await testInfo.attach('Desktop project', { path, contentType: 'image/png' });
        }
      }
    });

    test('every midpoint boundary pairs two half-opacity panels', async ({ page }) => {
      for (let boundary = 1; boundary < 7; boundary++) {
        await scrollToProgress(page, boundary / 7);
        await expect.poll(async () => {
          const values = await panels(page).evaluateAll(nodes => nodes.map(node => Number(getComputedStyle(node).opacity)));
          return values.every((value, index) => Math.abs(value - (index === boundary - 1 || index === boundary ? 0.5 : 0)) < 0.015);
        }, { message: `Boundary ${boundary}: only adjacent panels should have opacity 0.5` }).toBe(true);
        await expect(page.locator('#projects').getByRole('heading', { level: 3 })).toHaveCount(1);
      }
    });

    test('reverse scroll restores all seven states without stale visibility', async ({ page }) => {
      for (let index = 6; index >= 0; index--) {
        await scrollToProgress(page, (index + 0.5) / 7);
        await expectState(page, index);
      }
    });

    test('site header and showcase controls remain hit-testable over panels', async ({ page }) => {
      for (const progress of [1.5 / 7, 3 / 7, 6.5 / 7]) {
        await scrollToProgress(page, progress);
        await expectHitTarget(page.locator('.site-header .wordmark'));
        await expectHitTarget(page.locator('.site-header .header-contact'));
        await expectHitTarget(page.getByRole('button', { name: 'Read without motion' }));
        await expectHitTarget(page.locator('#projects a[data-skip]'));
      }
      await page.locator('#projects a[data-skip]').click();
      await expect(page).toHaveURL(/#journey$/);
      await expect(page.locator('#journey')).toBeFocused();
      await expect(page.locator('#journey')).toBeInViewport();
    });

    test('final CTA navigates to and focuses contact', async ({ page }) => {
      await scrollToProgress(page, 6.5 / 7);
      await expectState(page, 6);
      const cta = page.locator('#projects').getByRole('link', { name: "Let's talk" });
      await expectHitTarget(cta);
      await cta.click();
      await expect(page).toHaveURL(/#contact$/);
      await expect(page.locator('#contact')).toBeFocused();
      await expect(page.locator('#contact')).toBeInViewport();
    });

    test('resize unpins to mobile and short desktop then restores the timeline', async ({ page }) => {
      await scrollToProgress(page, 3.5 / 7);
      await expectState(page, 3);
      await page.setViewportSize({ width: 390, height: 844 });
      await expectStacked(page);
      await page.setViewportSize({ width: 1440, height: 550 });
      await expectStacked(page);
      await page.setViewportSize({ width: 1440, height: 900 });
      await expect(page.locator('#projects')).toHaveAttribute('data-pinned', 'true');
      await scrollToProgress(page, 4.5 / 7);
      await expectState(page, 4);
    });

    test('keyboard can enable Read without motion and tab through every project', async ({ page }) => {
      await scrollToProgress(page, 1.5 / 7);
      await page.locator('#projects').focus();
      await page.keyboard.press('Tab');
      const read = page.getByRole('button', { name: 'Read without motion' });
      await expect(read).toBeFocused();
      await page.keyboard.press('Enter');
      await expectStacked(page);
      await expect(read).toHaveCount(0);
      await expect(page.locator('#projects')).toBeFocused();
      const links = page.locator('#projects a');
      for (let index = 0; index < await links.count(); index++) {
        await page.keyboard.press('Tab');
        await expect(links.nth(index)).toBeFocused();
        await expect(links.nth(index)).toBeInViewport();
      }
      expect(await panels(page).locator('[data-playing]').evaluateAll(nodes => nodes.every(node => getComputedStyle(node).animationName === 'none'))).toBe(true);
    });
  });

  test('mobile stacks seven non-overlapping panels with reachable links', async ({ page }, testInfo) => {
    test.skip(page.viewportSize()!.width >= 1024, 'Mobile viewport coverage.');
    await openShowcase(page, false);
    await expectStacked(page);
    for (let index = 0; index < 7; index++) {
      const panel = panels(page).nth(index);
      await panel.locator('h3').scrollIntoViewIfNeeded();
      await expect(panel.locator('h3')).toBeInViewport();
      if (index === 1) {
        const y = await panel.evaluate(node => node.getBoundingClientRect().top + scrollY);
        await page.evaluate(top => (window as unknown as ScrollWindow).__portfolioScrollTo(top, true), y);
        await expect.poll(() => panel.locator('img').evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
        const path = testInfo.outputPath('mobile-project.png');
        await page.screenshot({ path });
        await testInfo.attach('Mobile project', { path, contentType: 'image/png' });
      }
      for (const link of await panel.locator('a').all()) {
        await link.scrollIntoViewIfNeeded();
        await expectHitTarget(link);
      }
    }
  });

  test('reduced motion keeps all stories readable with no image or copy motion', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await openShowcase(page, false);
    await expectStacked(page);
    await expect(page.getByRole('button', { name: 'Read without motion' })).toHaveCount(0);
    for (const panel of await panels(page).all()) {
      await panel.locator('h3').scrollIntoViewIfNeeded();
      await expect(panel.locator('h3')).toBeInViewport();
      for (const element of [panel.locator('[data-playing]'), panel.locator('h3').locator('..')]) {
        await expect(element).toHaveCSS('animation-name', 'none');
        await expect(element).toHaveCSS('transform', 'none');
        await expect(element).toHaveCSS('opacity', '1');
      }
    }
  });
});
