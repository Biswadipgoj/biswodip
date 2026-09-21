'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { glyphMarkup } from '@/lib/motion-markup';

gsap.registerPlugin(ScrollTrigger);

/**
 * Entrance vocabulary. Every preset starts from opacity 0 so the element actually
 * arrives instead of nudging a few pixels — the old scrubbed `opacity: 1 -> 1`
 * tweens were invisible on a phone, which is why the page read as "not animated".
 * `desktop` only scales travel distance; the animation itself is identical on touch.
 */
export type PresetName =
  | 'fade' | 'up' | 'down' | 'left' | 'right' | 'rise' | 'pop' | 'blur'
  | 'clip' | 'tilt' | 'swing' | 'zoom' | 'unfold' | 'curtain' | 'skew';

type FromVars = (desktop: boolean) => gsap.TweenVars;

export const PRESETS: Record<PresetName, FromVars> = {
  fade: () => ({ opacity: 0 }),
  up: d => ({ opacity: 0, y: d ? 40 : 26 }),
  down: d => ({ opacity: 0, y: d ? -30 : -18 }),
  left: d => ({ opacity: 0, x: d ? -54 : -26 }),
  right: d => ({ opacity: 0, x: d ? 54 : 26 }),
  rise: d => ({ opacity: 0, y: d ? 56 : 34, scale: 0.97 }),
  pop: () => ({ opacity: 0, scale: 0.92 }),
  blur: d => ({ opacity: 0, y: d ? 22 : 14, filter: 'blur(14px)' }),
  clip: d => ({ opacity: 0, y: d ? 28 : 16, clipPath: 'inset(0% 0% 100% 0%)' }),
  tilt: d => ({ opacity: 0, y: d ? 58 : 32, rotationX: d ? 22 : 12, transformPerspective: 1200, transformOrigin: '50% 100%' }),
  swing: d => ({ opacity: 0, x: d ? 52 : 24, rotationY: d ? 26 : 13, transformPerspective: 1200, transformOrigin: '0% 50%' }),
  zoom: () => ({ opacity: 0, scale: 1.07 }),
  unfold: d => ({ opacity: 0, scaleY: 0.72, y: d ? 26 : 16, transformOrigin: '50% 0%' }),
  curtain: () => ({ clipPath: 'inset(0% 100% 0% 0%)' }),
  skew: d => ({ opacity: 0, y: d ? 44 : 26, skewY: d ? 4 : 2.5 }),
};

/** Strong ease-out curves. `expo.out` is the GSAP twin of cubic-bezier(.23,1,.32,1). */
export const EASE = {
  out: 'expo.out',
  soft: 'power3.out',
  gentle: 'power2.out',
  // A few percent past the mark and back — enough to land, not enough to bounce.
  overshoot: 'back.out(1.15)',
  inOut: 'power2.inOut',
} as const;

export interface RevealOptions {
  preset?: PresetName;
  /** Seconds between siblings. 0.04–0.08 reads as a wave; above 0.12 reads as a queue. */
  stagger?: number;
  duration?: number;
  ease?: string;
  delay?: number;
  /** Fraction of the viewport height at which the reveal fires. 0.88 = near the fold. */
  start?: string;
  trigger?: Element;
  from?: gsap.TweenVars;
}

export interface EngineContext {
  root: HTMLElement;
  desktop: boolean;
  reduced: boolean;
  /** Elements inside this section only — nested project scenes own their own children. */
  owned: (selector: string) => HTMLElement[];
  onCleanup: (fn: () => void) => void;
  register: (tween: gsap.core.Animation) => void;
}

const REVEAL_FLAG = 'motionBound';

/** One element never gets two entrances, whatever route tagged it. */
function claim(elements: HTMLElement[]) {
  return elements.filter(element => {
    if (element.dataset[REVEAL_FLAG]) return false;
    element.dataset[REVEAL_FLAG] = '1';
    return true;
  });
}

export function reveal(ctx: EngineContext, targets: HTMLElement[], options: RevealOptions = {}) {
  const elements = claim(targets);
  if (!elements.length) return;

  const {
    preset = 'up',
    stagger = 0.06,
    duration = ctx.desktop ? 0.82 : 0.64,
    ease = EASE.out,
    delay = 0,
    start = 'top 88%',
    trigger,
    from,
  } = options;

  // Reduced motion keeps the comprehension cue (things still arrive) and drops travel.
  const vars: gsap.TweenVars = ctx.reduced
    ? { opacity: 0 }
    : { ...PRESETS[preset](ctx.desktop), ...from };

  // A `from` tween reads its end state from the element's computed style. If a CSS
  // transition is mid-flight at that moment (a revert just removed the previous run's
  // inline transform, and the button's hover transition picked it up), the tween
  // records the in-between value and parks the element there for good. Removing the
  // properties from transition-property cancels any running transition, so the read
  // is the true resting state; the entrance hands transitions back when it finishes.
  const prior = elements.map(element => element.style.transitionProperty);
  for (const element of elements) element.style.transitionProperty = 'none';
  const restore = () => elements.forEach((element, index) => { element.style.transitionProperty = prior[index]; });
  ctx.onCleanup(restore);

  const tween = gsap.from(elements, {
    ...vars,
    duration: ctx.reduced ? 0.3 : duration,
    ease: ctx.reduced ? 'power1.out' : ease,
    delay,
    stagger: ctx.reduced ? 0 : stagger,
    // 'auto' animates on the GPU and drops back to a 2D transform when the entrance lands.
    // `true` left translate3d(0,0,0) behind on every revealed element — each one a permanent
    // compositor layer (≈900 across the page), and layerizing them cost more per scroll frame
    // on a phone than all the page's script.
    force3D: 'auto',
    clearProps: 'filter,clipPath,willChange',
    onComplete: restore,
    scrollTrigger: {
      trigger: trigger || elements[0],
      start,
      once: true,
      // No invalidateOnRefresh here: a refresh (a <details> toggle, a font load)
      // re-records a `from` tween's start values and re-applies them, and because
      // `once` has already killed the trigger nothing plays it forward again --
      // the element is stranded at opacity 0. Entrances need no recalculation.
    },
  });
  ctx.register(tween);
  return tween;
}

/**
 * Continuous parallax. This is the layer that responds to *every* scroll event,
 * as opposed to the play-once entrances above.
 */
export function parallax(ctx: EngineContext, element: HTMLElement, distance: number, extra: gsap.TweenVars = {}) {
  if (ctx.reduced) return;
  const amount = distance * (ctx.desktop ? 1 : 0.6);
  const tween = gsap.fromTo(element, { y: amount }, {
    y: -amount,
    ...extra,
    ease: 'none',
    scrollTrigger: {
      trigger: element.parentElement || element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 0.6,
      invalidateOnRefresh: true,
    },
  });
  ctx.register(tween);
  return tween;
}

/** Split a line of text into word-sized masks with individual data-glyph elements. */
export function splitGlyphs(host: HTMLElement) {
  const words = [...host.querySelectorAll<HTMLElement>('.motion-word, .code-line')];
  if (!words.length) return [];
  for (const word of words) {
    if (word.querySelector('[data-glyph]')) continue;
    word.innerHTML = glyphMarkup(word.textContent || '');
  }
  return [...host.querySelectorAll<HTMLElement>('[data-glyph]')];
}

export function revealHeading(ctx: EngineContext, block: HTMLElement) {
  const visual = block.querySelector<HTMLElement>('[data-motion-visual]');
  if (!visual) return;
  const original = visual.innerHTML;
  const glyphs = splitGlyphs(visual);
  if (!glyphs.length) return;
  ctx.onCleanup(() => { visual.innerHTML = original; });
  visual.classList.add('is-split');

  if (ctx.reduced) {
    const tween = gsap.from(glyphs, {
      opacity: 0, duration: 0.3, ease: 'power1.out',
      scrollTrigger: { trigger: block, start: 'top 90%', once: true },
    });
    ctx.register(tween);
    return;
  }

  const tween = gsap.from(glyphs, {
    yPercent: 118,
    rotate: ctx.desktop ? 4 : 2.5,
    opacity: 0,
    duration: ctx.desktop ? 0.8 : 0.64,
    ease: EASE.out,
    stagger: { amount: Math.min(0.4, glyphs.length * 0.015) },
    force3D: 'auto',
    // Letters rest at identity: clear the transform so a thousand spans don't keep one each.
    clearProps: 'transform',
    scrollTrigger: { trigger: block, start: 'top 90%', once: true },
  });
  ctx.register(tween);
}

/** Code blocks reveal per row. Per-glyph was ~40 tweens a block and stuttered on phones. */
export function revealCode(ctx: EngineContext, block: HTMLElement) {
  const rows = [...block.querySelectorAll<HTMLElement>('.code-row')];
  if (!rows.length) return;
  const tween = gsap.from(rows, {
    opacity: 0,
    x: ctx.reduced ? 0 : -14,
    duration: ctx.reduced ? 0.25 : 0.5,
    ease: EASE.soft,
    stagger: ctx.reduced ? 0 : 0.035,
    scrollTrigger: { trigger: block, start: 'top 88%', once: true },
  });
  ctx.register(tween);
}

/** Count a figure up to its printed value so metrics land instead of just sitting there. */
export function countUp(ctx: EngineContext, element: HTMLElement) {
  const raw = (element.textContent || '').trim();
  const match = raw.match(/^(\D*)(\d[\d,]*)([\s\S]*)$/);
  if (!match) return;
  const [, prefix, digits, suffix] = match;
  const target = Number(digits.replace(/,/g, ''));
  if (!Number.isFinite(target) || target === 0) return;
  if (ctx.reduced) return;

  const counter = { value: 0 };
  const tween = gsap.to(counter, {
    value: target,
    duration: 1.4,
    ease: 'power2.out',
    onUpdate: () => { element.textContent = prefix + Math.round(counter.value).toLocaleString() + suffix; },
    onComplete: () => { element.textContent = raw; },
    scrollTrigger: { trigger: element, start: 'top 92%', once: true },
  });
  ctx.register(tween);
  element.textContent = prefix + '0' + suffix;
}

/** Rule and connector lines draw themselves along the section they belong to. */
export function drawLine(ctx: EngineContext, element: HTMLElement, vertical: boolean, trigger: Element) {
  const tween = gsap.fromTo(element,
    vertical
      ? { scaleY: 0, transformOrigin: 'top center' }
      : { scaleX: 0, transformOrigin: 'left center' },
    {
      ...(vertical ? { scaleY: 1 } : { scaleX: 1 }),
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top 85%',
        end: 'bottom 60%',
        scrub: 0.5,
        invalidateOnRefresh: true,
      },
    });
  ctx.register(tween);
}
