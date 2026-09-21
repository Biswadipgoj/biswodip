import { chromium } from '@playwright/test';

const browser = await chromium.launch({ channel: 'msedge' });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000');
await page.waitForTimeout(2000);

const results = await page.evaluate(() => {
  // 1. Buttons
  const buttons = Array.from(document.querySelectorAll('button, [role="button"], a.action, a.btn, .showcase-tab, .privacy-reveal-btn, .privacy-hide-btn, .skill-filters button, .term-pill'));
  const buttonStyles = new Map();
  buttons.forEach(b => {
    if (!b.offsetParent && b.offsetWidth === 0 && b.offsetHeight === 0) return;
    const cs = window.getComputedStyle(b);
    const key = `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft} | ${cs.borderRadius} | ${cs.fontSize}`;
    if (!buttonStyles.has(key)) {
      buttonStyles.set(key, {
        tag: b.tagName,
        cls: b.className,
        text: (b.textContent || '').trim().slice(0, 20),
        padding: `${cs.paddingTop} ${cs.paddingRight} ${cs.paddingBottom} ${cs.paddingLeft}`,
        borderRadius: cs.borderRadius,
        fontSize: cs.fontSize,
        lineHeight: cs.lineHeight,
      });
    }
  });

  // 2. Text Colors
  const allElements = Array.from(document.querySelectorAll('*'));
  const textColors = new Map();
  allElements.forEach(el => {
    // Only elements that directly contain text or visible text
    const hasDirectText = Array.from(el.childNodes).some(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0);
    if (!hasDirectText) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const cs = window.getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) === 0) return;
    const col = cs.color;
    if (!textColors.has(col)) {
      textColors.set(col, { sample: el.textContent.trim().slice(0, 25), tag: el.tagName, cls: el.className });
    }
  });

  // 3. Border Radii
  const borderRadii = new Map();
  allElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const cs = window.getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.display === 'none') return;
    const r = cs.borderTopLeftRadius;
    if (r && r !== '0px') {
      if (!borderRadii.has(r)) {
        borderRadii.set(r, { tag: el.tagName, cls: el.className });
      }
    }
  });

  // 4. Long All-Caps
  const allCaps = [];
  allElements.forEach(el => {
    const text = (el.innerText || el.textContent || '').trim();
    if (text.length >= 15) {
      const cs = window.getComputedStyle(el);
      const isUpperCSS = cs.textTransform === 'uppercase';
      const isUpperText = text === text.toUpperCase() && /[A-Z]/.test(text);
      if (isUpperCSS || isUpperText) {
        allCaps.push({
          len: text.length,
          text: text.slice(0, 50),
          tag: el.tagName,
          cls: el.className,
          isCSS: isUpperCSS
        });
      }
    }
  });

  // 5. Small Body Text (11px)
  const smallText = [];
  allElements.forEach(el => {
    const hasDirectText = Array.from(el.childNodes).some(n => n.nodeType === Node.TEXT_NODE && n.textContent.trim().length > 0);
    if (!hasDirectText) return;
    const cs = window.getComputedStyle(el);
    const fs = parseFloat(cs.fontSize);
    if (fs <= 11.5) {
      smallText.push({
        fontSize: cs.fontSize,
        text: el.textContent.trim().slice(0, 30),
        tag: el.tagName,
        cls: el.className
      });
    }
  });

  // 6. Truncated Text with ellipsis
  const truncated = [];
  allElements.forEach(el => {
    const cs = window.getComputedStyle(el);
    if (cs.textOverflow === 'ellipsis') {
      truncated.push({
        text: (el.textContent || '').trim().slice(0, 30),
        tag: el.tagName,
        cls: el.className,
        scrollWidth: el.scrollWidth,
        clientWidth: el.clientWidth,
        isClipped: el.scrollWidth > el.clientWidth
      });
    }
  });

  return {
    buttonCount: buttonStyles.size,
    buttonStyles: Array.from(buttonStyles.values()),
    textColorCount: textColors.size,
    textColors: Array.from(textColors.entries()),
    borderRadiusCount: borderRadii.size,
    borderRadii: Array.from(borderRadii.entries()),
    allCaps,
    smallText,
    truncated
  };
});

console.log(JSON.stringify(results, null, 2));
await browser.close();
