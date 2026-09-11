import { test, expect } from '@playwright/test';

test.describe('Tech Stack Section, 3D Origami & CS Architecture Tests', () => {
  test('should load page and smoothly scroll to Tech Stack without getting stuck', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Verify initial Hero
    const hero = page.locator('#hero');
    await expect(hero).toBeVisible();

    // Scroll to Tech Stack
    const skills = page.locator('#skills');
    await skills.scrollIntoViewIfNeeded();
    await expect(skills).toBeVisible();

    // Verify Layer 01 (Frontend UI Systems) is active by default
    const heading = skills.locator('h2');
    await expect(heading).toContainText('Frontend UI Systems');

    // Verify 12 cards are rendered
    const cards = skills.locator('#skill-panel-0 > div');
    await expect(cards).toHaveCount(12);

    // Verify specific high-gradient technologies are readable
    await expect(skills.getByText('React & Next.js')).toBeVisible();
    await expect(skills.getByText('TypeScript')).toBeVisible();
    await expect(skills.getByText('Tailwind CSS')).toBeVisible();
  });

  test('should verify Computer Science Software Objects (AST & Microtask Queue)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const skills = page.locator('#skills');
    await skills.scrollIntoViewIfNeeded();

    // Verify CS Software Artifacts (AST and V8 Microtask Queue)
    await expect(skills.getByText('λ COMPUTER SCIENCE SOFTWARE OBJECTS')).toBeVisible();
    await expect(skills.getByText('V8 MICROTASK QUEUE: 0.12ms TICK')).toBeVisible();
    await expect(skills.getByText('Program(root)')).toBeVisible();
    await expect(skills.getByText('FuncDecl: executeEngine()')).toBeVisible();
  });

  test('should trigger 4-sided 3D Origami Fold transition and switch layers', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const skills = page.locator('#skills');
    await skills.scrollIntoViewIfNeeded();
    await expect(skills).toHaveAttribute('data-hydrated', 'true', { timeout: 10000 });

    // 1. Click Layer 02 (Distributed Backend & APIs)
    const tab1 = page.locator('#skill-tab-1');
    await tab1.scrollIntoViewIfNeeded();
    await tab1.click();
    await page.waitForTimeout(400);

    const heading = skills.locator('h2');
    await expect(heading).toContainText('Distributed Backend & APIs');
    await expect(skills.getByText('Node.js & Express')).toBeVisible();
    await expect(skills.getByText('Python & FastAPI')).toBeVisible();

    // 2. Click Origami Fold button (triggers 4-sided 3D paper fold)
    const origamiBtn = page.locator('#skill-btn-wipe');
    await expect(origamiBtn).toContainText('Origami Fold');
    await origamiBtn.click();
    await page.waitForTimeout(300);

    // 3. Click Layer 03 (Cloud Infrastructure & DevOps)
    const tab2 = page.locator('#skill-tab-2');
    await tab2.scrollIntoViewIfNeeded();
    await tab2.click();
    await page.waitForTimeout(400);
    await expect(heading).toContainText('Cloud Infrastructure & DevOps');
    await expect(skills.getByText('Docker & Compose')).toBeVisible();
    await expect(skills.getByText('Kubernetes (K8s)')).toBeVisible();

    // 4. Click Layer 04 (Data Engineering & Distributed Tooling)
    const tab3 = page.locator('#skill-tab-3');
    await tab3.scrollIntoViewIfNeeded();
    await tab3.click();
    await page.waitForTimeout(400);
    await expect(heading).toContainText('Data Engineering & Distributed Tooling');
    await expect(skills.getByText('PostgreSQL & MySQL')).toBeVisible();
  });

  test('should open Architectural Interface Inspector modal on card click', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const skills = page.locator('#skills');
    await skills.scrollIntoViewIfNeeded();
    await expect(skills).toHaveAttribute('data-hydrated', 'true', { timeout: 10000 });

    // Click on React & Next.js inspect button
    const inspectBtn = skills.locator('button[data-inspect-btn="React & Next.js"]').first();
    await inspectBtn.scrollIntoViewIfNeeded();
    await inspectBtn.click({ force: true });
    await page.waitForTimeout(300);

    // Verify modal is displayed with recruiter-focused specifications
    await expect(page.getByText('PRODUCTION ARCHITECTURAL ROLE')).toBeVisible();
    await expect(page.getByText('ALGORITHMIC COMPLEXITY')).toBeVisible();
    await expect(page.getByText('PRODUCTION INTERFACE CONTRACT / SOURCE BLUEPRINT')).toBeVisible();

    // Dismiss modal
    const dismissBtn = page.getByRole('button', { name: 'Dismiss' });
    await dismissBtn.click({ force: true });
    await page.waitForTimeout(200);
    await expect(page.getByText('PRODUCTION ARCHITECTURAL ROLE')).not.toBeVisible();
  });

  test('should verify location is set to Uluberia (zero Bangalore references)', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // 1. Check Contact Section
    const contact = page.locator('#contact');
    await contact.scrollIntoViewIfNeeded();
    await expect(contact.getByText('ULUBERIA NODE · 22.4735° N, 88.1077° E')).toBeVisible();

    // 2. Check Footer
    const footer = page.locator('footer');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer.getByText('ULUBERIA NODE')).toBeVisible();
    await expect(footer.getByText('ULUBERIA (IST):')).toBeVisible();

    // 3. Verify no lingering Bangalore in visible content
    const pageContent = await page.content();
    expect(pageContent.includes('BENGALURU')).toBeFalsy();
    expect(pageContent.includes('Bengaluru')).toBeFalsy();
  });

  test('should scroll smoothly past Tech Stack into Projects without getting stuck', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    // Scroll smoothly from top down past skills
    await page.evaluate(async () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
      await new Promise(r => setTimeout(r, 200));

      // Scroll past skills to projects
      const proj = document.getElementById('projects');
      if (proj) {
        proj.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    await page.waitForTimeout(1000);

    // Verify Projects section is in view and not blocked by skills
    const projects = page.locator('#projects');
    await expect(projects).toBeInViewport();
    await expect(projects.locator('h2')).toContainText('Erpixa');
  });

  test('should verify high contrast text in Projects section', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');

    const projects = page.locator('#projects');
    await projects.scrollIntoViewIfNeeded();

    // Verify Erpixa title and high-contrast description are visible
    await expect(projects.getByText('Erpixa').first()).toBeVisible();
    await expect(projects.getByText('Business management, finally without the bloat.').first()).toBeVisible();
    await expect(projects.getByText('Live System').first()).toBeVisible();
  });
});
