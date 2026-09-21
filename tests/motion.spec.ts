import { test, expect } from '@playwright/test';

test('recruiter facts, functional resume and accessible animated text', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('.education-degrees p')).toHaveText([/Brainware University/, /Brainware University/]);
  await expect(page.locator('h1')).toHaveAccessibleName('From real problems to working software.');
  await expect(page.locator('main')).not.toContainText(/vibe.cod|MAKAUT|WBSCTE|gateway callback/i);
  const resume = await request.get('/Biswodip-Goj-Resume.pdf');
  expect(resume.status()).toBe(200);
  expect((await resume.body()).length).toBeGreaterThan(4000);
  // Letter detail is prepared as scenes approach, keeping initial layout light.
  expect(await page.locator('[data-glyph]').count()).toBeLessThan(200);
  for (const id of ['about','stack','projects','erpixa','nanolink','telepoint','nexora','tripmate','process','journey','contact']) {
    await page.evaluate(id => window.portfolioScroll?.scrollTo(document.getElementById(id)!, { immediate: true }), id);
    await expect.poll(() => page.locator('#' + id + ' [data-glyph]').count()).toBeGreaterThan(0);
  }
  expect(await page.locator('[data-glyph]').count()).toBeGreaterThan(1000);
});

test('scroll chapters remain contained at every position, forward and backward', async ({ page }) => {
  await page.goto('/');
  for (const id of ['about', 'stack', 'erpixa', 'nanolink', 'telepoint', 'nexora', 'tripmate', 'process', 'journey', 'contact', 'nanolink', 'about']) {
    await page.evaluate(id => { const el = document.getElementById(id)!; window.portfolioScroll?.scrollTo(el, { immediate: true }); if (!window.portfolioScroll) el.scrollIntoView(); }, id);
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - innerWidth)).toBeLessThanOrEqual(1);
    const heading = page.locator('#' + id).locator('h2,h3').first();
    await expect(heading).toBeVisible();
  }
});

test('navigation skips the cinematic path and keeps browser history', async ({ page }) => {
  await page.goto('/');
  await page.locator('.hero-actions a[href="#projects"]').click();
  await expect(page).toHaveURL(/#projects$/);
  await expect.poll(() => page.locator('#projects').evaluate(el => Math.round(el.getBoundingClientRect().top))).toBeGreaterThanOrEqual(60);
  await expect.poll(() => page.locator('#projects').evaluate(el => Math.round(el.getBoundingClientRect().top))).toBeLessThan(130);
  await page.goBack();
  await expect.poll(() => page.evaluate(() => scrollY)).toBeLessThan(120);
});

test('reduced motion immediately restores every glyph and removes cinematic pinning', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#opening')).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('#opening')).not.toHaveAttribute('data-animated', 'true');
  const unreadable = await page.locator('[data-glyph]').evaluateAll(nodes => nodes.filter(node => parseFloat(getComputedStyle(node).opacity) < 1).length);
  expect(unreadable).toBe(0);
  await expect.poll(() => page.locator('[data-glyph]').evaluateAll(nodes => nodes.filter(node => getComputedStyle(node).transform !== 'none').length)).toBe(0);
  await page.locator('#journey').scrollIntoViewIfNeeded();
  await expect(page.locator('.education-degrees p').first()).toBeVisible();
});

test('mobile disclosure supports Escape and section navigation', async ({ page }) => {
  test.skip((page.viewportSize()?.width || 1440) > 1099, 'Mobile disclosure');
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open navigation' });
  await toggle.click();
  await expect(page.locator('#mobile-navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toBeFocused();
  await expect(page.locator('#mobile-navigation')).toBeHidden();
  await toggle.click();
  await page.locator('#mobile-navigation').getByRole('link', { name: 'Education', exact: true }).click();
  await expect(page).toHaveURL(/#journey$/);
  await expect(page.locator('#mobile-navigation')).toBeHidden();
});

test('opening transforms reverse with scroll', async ({ page }) => {
  test.skip((page.viewportSize()?.width || 0) < 1000, 'Desktop cinematic stage');
  await page.goto('/');
  await expect(page.locator('#opening')).toHaveAttribute('data-animated', 'true');
  const read = () => page.locator('.hero-main-image').evaluate(el => {
    const matrix = new DOMMatrix(getComputedStyle(el).transform);
    return [matrix.a, matrix.b, matrix.c, matrix.d, matrix.e, matrix.f].map(n => Number(n.toFixed(3)));
  });
  const initial = await read();
  await page.evaluate(() => window.portfolioScroll?.scrollTo(500, { immediate: true }));
  await expect.poll(read).not.toEqual(initial);
  await page.evaluate(() => window.portfolioScroll?.scrollTo(0, { immediate: true }));
  await expect.poll(read).toEqual(initial);
});

test('the portfolio is complete without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.locator('h1')).toHaveAccessibleName('From real problems to working software.');
  await expect(page.locator('.project-chapter')).toHaveCount(5);
  await expect(page.locator('.education-degrees p')).toHaveText([/Brainware University/, /Brainware University/]);
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await expect(page.locator('.contact-email')).toBeVisible();
  await context.close();
});

test('project interfaces move through 3D depth and direct project anchors remain readable', async ({ page }) => {
  await page.goto('/#nanolink');
  await expect(page.locator('#nanolink h3')).toBeVisible();
  const screen = page.locator('#nanolink .project-visual [data-depth="screen"]');
  const positions = await screen.evaluate(el => {
    const rect = el.getBoundingClientRect();
    const top = rect.top + scrollY;
    return [Math.max(0, top - innerHeight * 0.8), top + rect.height * 0.3 - innerHeight * 0.25];
  });
  await page.evaluate(y => window.portfolioScroll?.scrollTo(y, { immediate: true }), positions[0]);
  await expect.poll(() => screen.evaluate(el => getComputedStyle(el).transform)).toMatch(/^matrix3d/);
  const first = await screen.evaluate(el => getComputedStyle(el).transform);
  await page.evaluate(y => window.portfolioScroll?.scrollTo(y, { immediate: true }), positions[1]);
  await expect.poll(() => screen.evaluate(el => getComputedStyle(el).transform)).not.toBe(first);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect.poll(() => screen.evaluate(el => getComputedStyle(el).transform)).toBe('none');
});

test('all interactive buttons and click functions respond properly across the journey', async ({ page, context }) => {
  try {
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  } catch {}
  await page.goto('/');

  // 1. Hero primary action button clicks and navigates
  const heroPrimary = page.locator('.hero-actions a[href="#projects"]');
  await expect(heroPrimary).toBeVisible();
  await heroPrimary.click();
  await expect(page).toHaveURL(/#projects$/);

  // 2. Desktop navigation links all have valid hrefs
  const navLinks = page.locator('.desktop-nav a');
  expect(await navLinks.count()).toBeGreaterThan(5);

  // 3. Project buttons (Live, Source, Details) all exist and have valid targets
  const liveButtons = page.locator('.project-actions a:has-text("Live")');
  expect(await liveButtons.count()).toBe(5);
  for (let i = 0; i < 5; i++) {
    const href = await liveButtons.nth(i).getAttribute('href');
    expect(href).toMatch(/^https?:\/\//);
  }

  // 4. Copy email button in footer
  await page.locator('#contact').scrollIntoViewIfNeeded();
  const copyBtn = page.locator('.copy-email');
  await expect(copyBtn).toBeVisible();
  await copyBtn.click();
  await expect(copyBtn).toContainText('Copied');

  // 5. Back to top button
  const backToTop = page.locator('.back-to-top');
  await expect(backToTop).toBeVisible();
  await backToTop.click();
  await expect(page).toHaveURL(/#opening$/);

  // 6. Resume download links exist with valid PDF target
  const resumeLinks = page.locator('a[download]');
  expect(await resumeLinks.count()).toBeGreaterThan(0);
  for (let i = 0; i < await resumeLinks.count(); i++) {
    expect(await resumeLinks.nth(i).getAttribute('href')).toContain('.pdf');
  }
});

 test('technology explorer connects skills to projects and works by keyboard', async ({ page }) => {
  await page.goto('/#stack');
  const next = page.getByRole('button', { name: 'Next.js', exact: true });
  await next.focus();
  await page.keyboard.press('Enter');
  await expect(next).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.skill-proof-list')).toContainText('NanoLink');
  await expect(page.locator('.skill-proof-list')).not.toContainText('Erpixa');
  await page.getByRole('button', { name: 'All technologies', exact: true }).click();
  await expect(page.locator('.skill-proof-row')).toHaveCount(5);
  const analysis = page.locator('.stack-category').filter({ hasText: 'Business analysis & systems' });
  await analysis.locator('summary').click();
  await expect(analysis).toHaveAttribute('open', '');
  await expect(analysis).toContainText('Requirements elicitation');
 });

 test('mobile opening offers work and resume before the first scroll', async ({ page }) => {
  test.skip((page.viewportSize()?.width || 1440) > 799, 'Mobile first viewport');
  await page.goto('/');
  await expect(page.locator('.hero-actions a[href="#projects"]')).toBeInViewport();
  await expect(page.locator('.hero-actions a[download]')).toBeInViewport();
  await expect(page.locator('.cli-loader-overlay')).toHaveCount(0);
 });
