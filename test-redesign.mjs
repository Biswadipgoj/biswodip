import puppeteer from "puppeteer-core";
import assert from "node:assert/strict";
const browser = await puppeteer.launch({
  executablePath:
    "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: true,
  args: ["--enable-webgl", "--ignore-gpu-blocklist"],
});
const page = await browser.newPage();
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
try {
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000", {
    waitUntil: "networkidle0",
    timeout: 90000,
  });
  await wait(2500);
  await page.screenshot({ path: "desktop-preview.png" });
  assert.equal(
    await page
      .locator("h1")
      .map((el) => el.textContent)
      .wait(),
    "Big ideas.Real impact.",
  );
  assert.ok(await page.$("canvas"), "3D canvas mounts");
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    true,
    "No desktop overflow",
  );
  await page.locator(".scene-tools button").click();
  assert.equal(
    await page.$eval(".scene-tools button", (el) =>
      el.getAttribute("aria-pressed"),
    ),
    "true",
  );
  const canvas = await page.$("canvas");
  const box = await canvas.boundingBox();
  await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.mouse.move(
    box.x + box.width / 2 + 85,
    box.y + box.height / 2 + 30,
    { steps: 12 },
  );
  await page.mouse.up();
  const beforeMotion = await page.$eval(
    ".color-blob",
    (el) => getComputedStyle(el).transform,
  );
  await wait(160);
  assert.notEqual(
    await page.$eval(".color-blob", (el) => getComputedStyle(el).transform),
    beforeMotion,
    "GSAP color shapes animate",
  );
  for (let i = 0; i < 3; i++) {
    await page.locator(".motion-switch").click();
    const still = await page.$eval(
      ".color-blob",
      (el) => getComputedStyle(el).transform,
    );
    await wait(100);
    assert.equal(
      await page.$eval(".color-blob", (el) => getComputedStyle(el).transform),
      still,
      "Paused GSAP stays still",
    );
    await page.locator(".motion-switch").click();
    await wait(120);
  }
  await page.locator(".motion-switch").click();
  assert.equal(
    await page.$eval(".motion-switch", (el) => el.getAttribute("aria-pressed")),
    "true",
  );
  await page.locator(".skill-selectors button:nth-child(2)").click();
  assert.ok(
    await page.$eval(".skill-detail", (el) =>
      el.textContent.includes("PostgreSQL"),
    ),
  );
  await page.locator(".skill-selectors button:nth-child(3)").click();
  assert.ok(
    await page.$eval(".skill-detail", (el) =>
      el.textContent.includes("Business analysis"),
    ),
  );
  for (const id of ["work", "expertise", "about", "contact"]) {
    await page.$eval("#" + id, (el) =>
      el.scrollIntoView({ behavior: "instant" }),
    );
    await wait(300);
  }
  await page.screenshot({ path: "contact-preview.png" });
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 1 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  await wait(1500);
  await page.screenshot({ path: "mobile-preview.png" });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
    true,
    "No mobile overflow",
  );
  await page.locator(".menu-toggle").click();
  assert.ok(await page.$("#mobile-nav"));
  await page.keyboard.press("Escape");
  assert.equal(await page.$("#mobile-nav"), null);
  await page.locator(".menu-toggle").click();
  await page.locator("#mobile-nav a").click();
  await wait(1700);
  assert.equal(await page.$("#mobile-nav"), null);
  await page.emulateMediaFeatures([
    { name: "prefers-reduced-motion", value: "reduce" },
  ]);
  await page.goto("http://localhost:3000", { waitUntil: "networkidle0" });
  assert.equal(
    await page.$("canvas"),
    null,
    "Reduced motion omits WebGL animation",
  );
  assert.equal(
    await page.$eval(
      ".marquee>div",
      (el) => getComputedStyle(el).animationName,
    ),
    "none",
  );
  assert.equal(
    await page.$eval(".motion-switch", (el) => el.getAttribute("aria-pressed")),
    "true",
  );
  for (const width of [320, 768, 1024, 1920]) {
    await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      true,
      "No overflow at " + width,
    );
  }
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 2 });
  await page.emulateMediaFeatures([{name:"prefers-reduced-motion", value:"no-preference"}]);
  await page.goto("http://localhost:3000", {waitUntil:"networkidle0"});
  await wait(1200);
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let top = 0; top < pageHeight; top += 650) {
    await page.evaluate(y => window.scrollTo({top:y, behavior:"instant"}), top);
    await wait(180);
  }
  await wait(1000);
  await page.evaluate(() => window.scrollTo({top:0, behavior:"instant"}));
  await wait(1800);
  await page.screenshot({ path: "full-preview.png", fullPage: true });
  await page.screenshot({ path: "desktop-preview.png" });
  assert.deepEqual(errors, [], "No page errors");
  console.log(
    "PASS: desktop/mobile overflow, WebGL mount and drag, explode control, motion toggle, expertise categories, mobile menu/Escape/link, reduced motion, and browser errors.",
  );
} finally {
  await browser.close();
}

