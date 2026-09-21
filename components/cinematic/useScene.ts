'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  reveal, parallax, revealHeading, revealCode, countUp, drawLine,
  EASE, type EngineContext, type PresetName, type RevealOptions,
} from '@/lib/reveal-engine';

gsap.registerPlugin(ScrollTrigger);
export type SceneBuilder = (timeline: gsap.core.Timeline, root: HTMLElement, desktop: boolean) => void;

/**
 * Choreography table. `group`/`items` staggers children inside each container it finds;
 * `each` gives every match its own trigger. Selectors are scoped to the owning section,
 * so a project chapter never steals the choreography of the one above it.
 */
type ChoreoRule =
  | { group: string; items: string; opts?: RevealOptions }
  | { each: string; opts?: RevealOptions };

const CHOREOGRAPHY: ChoreoRule[] = [
  // --- Section furniture -------------------------------------------------
  { each: '.section-index', opts: { preset: 'down', duration: 0.6 } },
  { each: '.sub-section-heading > p:not(.section-index)', opts: { preset: 'up', delay: 0.05 } },
  { each: '.section-heading > p:not(.section-index)', opts: { preset: 'up', delay: 0.05 } },

  // --- Hero --------------------------------------------------------------
  { each: '.hero-eyebrow', opts: { preset: 'down', start: 'top 98%' } },
  { each: '.hero-body', opts: { preset: 'blur', start: 'top 98%', delay: 0.12 } },
  { group: '.hero-proof-strip', items: '.proof-item', opts: { preset: 'up', stagger: 0.07, start: 'top 98%', delay: 0.18 } },
  // Controls enter in place (fade + scale about their centre). A control that slides while it
  // enters can move between press and release, and the browser then drops the click.
  { group: '.hero-actions', items: ':scope > *', opts: { preset: 'pop', stagger: 0.06, start: 'top 98%', delay: 0.22 } },
  { group: '.hero-links', items: ':scope > li', opts: { preset: 'pop', stagger: 0.05, start: 'top 98%', delay: 0.34 } },
  { group: '.showcase-selector-bar', items: '.showcase-tab', opts: { preset: 'pop', stagger: 0.05, start: 'top 98%', delay: 0.3 } },
  { group: '.hero-workflow', items: ':scope > li', opts: { preset: 'up', stagger: 0.06 } },
  { group: '.hero-bottom', items: ':scope > *', opts: { preset: 'fade', stagger: 0.08 } },
  { each: '.showcase-floating-pill', opts: { preset: 'pop', ease: EASE.overshoot, delay: 0.45 } },
  { group: '.showcase-footer-bar', items: ':scope > *', opts: { preset: 'up', stagger: 0.07 } },

  // --- Identity ----------------------------------------------------------
  { group: '.identity-facts', items: ':scope > span', opts: { preset: 'up', stagger: 0.07 } },
  { group: '.identity-links', items: ':scope > *', opts: { preset: 'pop', stagger: 0.06 } },
  { each: '.identity-portrait', opts: { preset: 'clip', duration: 1.1 } },
  { group: '.identity-statement', items: ':scope > p', opts: { preset: 'up', stagger: 0.09 } },
  { group: '.scope-list', items: ':scope > div', opts: { preset: 'rise', stagger: 0.08 } },

  // --- Stack / skills ----------------------------------------------------
  { group: '.skill-explorer-heading', items: ':scope > *', opts: { preset: 'up', stagger: 0.07 } },
  { group: '.skill-filters', items: 'button', opts: { preset: 'pop', stagger: 0.035, ease: EASE.overshoot } },
  { group: '.skill-proof-heading', items: ':scope > *', opts: { preset: 'up', stagger: 0.08 } },
  { each: '.skill-proof-row', opts: { preset: 'left', duration: 0.7 } },
  { each: '.tech-system-card', opts: { preset: 'rise' } },
  { group: '.stack-categories', items: '.stack-category', opts: { preset: 'rise', stagger: 0.07 } },
  { group: '.primary-stack', items: ':scope > span', opts: { preset: 'pop', stagger: 0.045 } },
  { each: '.request-source', opts: { preset: 'left', duration: 0.9 } },
  { group: '.request-steps', items: ':scope > li', opts: { preset: 'up', stagger: 0.1 } },
  { group: '.request-heading', items: ':scope > p', opts: { preset: 'up' } },

  // --- Projects ----------------------------------------------------------
  { each: '.shipped-distinction-banner', opts: { preset: 'rise', duration: 0.95 } },
  { group: '.projects-intro nav', items: 'a', opts: { preset: 'up', stagger: 0.05 } },
  { each: '.chapter-meta', opts: { preset: 'fade' } },
  { each: '.project-visual', opts: { preset: 'clip', duration: 1.15 } },
  { each: '.project-heading > p', opts: { preset: 'up', delay: 0.08 } },
  { group: '.project-stack', items: ':scope > li', opts: { preset: 'pop', stagger: 0.035 } },
  { group: '.project-actions', items: ':scope > *', opts: { preset: 'pop', stagger: 0.06 } },
  { group: '.recruiter-signal-grid', items: '.signal-item', opts: { preset: 'rise', stagger: 0.08 } },
  { each: '.flow-title', opts: { preset: 'fade' } },
  { group: '.flow-line', items: ':scope > li', opts: { preset: 'up', stagger: 0.07 } },
  { each: '.screenshot-caption', opts: { preset: 'fade', delay: 0.15 } },
  { group: '.product-story', items: ':scope > *', opts: { preset: 'up', stagger: 0.1 } },
  { each: '.schema-sheet', opts: { preset: 'rise' } },
  { group: '.schema-sheet tbody', items: 'tr', opts: { preset: 'left', stagger: 0.04, duration: 0.55 } },

  // --- Process -----------------------------------------------------------
  { each: '.lifecycle-panel', opts: { preset: 'rise', duration: 0.95 } },
  { group: '.process-steps', items: ':scope > li', opts: { preset: 'left', stagger: 0.1 } },
  { group: '.engineering-evidence-grid', items: '.evidence-card', opts: { preset: 'tilt', stagger: 0.09 } },
  { group: '.evidence-items', items: ':scope > li', opts: { preset: 'up', stagger: 0.04, duration: 0.5 } },
  { group: '.engineering-decisions-grid', items: '.decision-card', opts: { preset: 'tilt', stagger: 0.09 } },
  { group: '.principles dl', items: ':scope > div', opts: { preset: 'rise', stagger: 0.08 } },
  { group: '.capability-list', items: 'article', opts: { preset: 'rise', stagger: 0.08 } },

  // --- Journey -----------------------------------------------------------
  { group: '.education-degrees', items: 'article', opts: { preset: 'left', stagger: 0.1 } },
  { group: '.education-timeline', items: ':scope > li', opts: { preset: 'up', stagger: 0.09 } },
  { group: '.foundations ul', items: ':scope > li', opts: { preset: 'pop', stagger: 0.04 } },

  // --- Resume ------------------------------------------------------------
  { each: '.resume-col-title', opts: { preset: 'up' } },
  { group: '.resume-timeline', items: '.resume-timeline-item', opts: { preset: 'left', stagger: 0.1 } },
  { group: '.resume-bullet-list', items: '.resume-bullet', opts: { preset: 'up', stagger: 0.05, duration: 0.55 } },
  { each: '.resume-academic-summary', opts: { preset: 'rise' } },
  { each: '.resume-skills-drawer', opts: { preset: 'rise' } },
  { each: '.resume-dossier-card', opts: { preset: 'tilt', duration: 1 } },
  { each: '.candidate-photo', opts: { preset: 'clip', duration: 0.9, delay: 0.2 } },
  { group: '.dossier-candidate > div:last-child', items: ':scope > p', opts: { preset: 'up', stagger: 0.06, delay: 0.28 } },
  { group: '.dossier-badge-row', items: '.dossier-pill', opts: { preset: 'pop', stagger: 0.07, ease: EASE.overshoot } },
  { group: '.dossier-actions', items: ':scope > *', opts: { preset: 'pop', stagger: 0.07 } },

  // --- Contact -----------------------------------------------------------
  { each: '.availability-badge', opts: { preset: 'pop', ease: EASE.overshoot } },
  { each: '.contact-body', opts: { preset: 'up', delay: 0.06 } },
  { each: '.contact-secondary-note', opts: { preset: 'up', delay: 0.1 } },
  { each: '.contact-email', opts: { preset: 'curtain', duration: 0.9 } },
  { group: '.contact-tools', items: ':scope > *', opts: { preset: 'pop', stagger: 0.07 } },
  { each: '.terminal-deck', opts: { preset: 'rise', duration: 0.95 } },
  { group: '.terminal-controls', items: '.term-pill', opts: { preset: 'up', stagger: 0.05 } },
  { group: '.contact-socials', items: 'a', opts: { preset: 'up', stagger: 0.06 } },
  { each: '.source-index', opts: { preset: 'right', duration: 0.95 } },
  { group: '.source-index ul', items: ':scope > li', opts: { preset: 'up', stagger: 0.07 } },
  { each: '.footer-person', opts: { preset: 'rise' } },
  { group: '.contact-colophon', items: ':scope > *', opts: { preset: 'fade', stagger: 0.08 } },

  // --- Project detail pages ---------------------------------------------
  { each: '.detail-section', opts: { preset: 'up' } },
  { group: '.decision-list', items: ':scope > *', opts: { preset: 'up', stagger: 0.06 } },
  { group: '.other-projects', items: 'a', opts: { preset: 'up', stagger: 0.06 } },
  { group: '.source-references', items: 'a', opts: { preset: 'up', stagger: 0.05 } },
  { group: '.detail-stack', items: ':scope > *', opts: { preset: 'pop', stagger: 0.04 } },
];

/** Section ownership prevents two timelines from controlling nested project scenes. */
export function useEditorialReveal(build?: SceneBuilder) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = gsap.matchMedia();
    // `always` has to be here: gsap.matchMedia skips the callback entirely when no
    // condition matches, and on a phone reduced/desktop/hoverable are all false.
    const initialize = () => media.add({
      always: '(min-width: 0px)',
      reduced: '(prefers-reduced-motion: reduce)',
      desktop: '(min-width: 1000px) and (min-height: 700px)',
      hoverable: '(hover: hover) and (pointer: fine)',
    }, context => {
      const desktop = Boolean(context.conditions?.desktop);
      const reduced = Boolean(context.conditions?.reduced);
      const hoverable = Boolean(context.conditions?.hoverable);
      const cleanup: Array<() => void> = [];
      const tweens: gsap.core.Animation[] = [];

      const owned = (selector: string) => {
        let matches: HTMLElement[];
        try { matches = [...root.querySelectorAll<HTMLElement>(selector)]; }
        catch { return []; }
        return matches.filter(element => element.closest('[data-motion-root]') === root);
      };

      const ctx: EngineContext = {
        root, desktop, reduced, owned,
        onCleanup: fn => cleanup.push(fn),
        register: tween => tweens.push(tween),
      };

      // Read a transform once before any tween writes, to avoid a layout pass per element.
      gsap.getProperty(root, 'x');

      // Scrubbed elements have their transform rewritten by GSAP on every scroll frame. A CSS
      // transition on transform would chase each write — a new transition object per frame and
      // a doubled, laggy ease. They keep their colour and shadow transitions and lose the rest.
      // This runs before the entrances below, which save and restore the value around themselves.
      if (!reduced) {
        const scrubbed = [
          ...owned('[data-spatial]:not([data-spatial="orb"]):not([data-spatial="stagger-3d"]), [data-depth], [data-parallax], [data-plane], [data-drift]'),
          ...owned('.product-image-content img, .showcase-main-img-wrap img, .showcase-img-wrap img'),
        ];
        for (const element of scrubbed) element.style.transitionProperty = 'box-shadow, background-color, border-color, color';
        cleanup.push(() => { for (const element of scrubbed) element.style.removeProperty('transition-property'); });
      }

      // ---- 1. Explicit attributes authored in the components -------------
      for (const block of owned('[data-type]')) {
        if (block.dataset.type === 'code') revealCode(ctx, block);
        else revealHeading(ctx, block);
      }

      for (const element of owned('[data-anim]')) {
        reveal(ctx, [element], { preset: (element.dataset.anim || 'up') as PresetName });
      }

      for (const element of owned('[data-entrance]')) {
        reveal(ctx, [element], { preset: 'up', start: 'top 98%' });
      }

      for (const element of owned('[data-reveal]')) {
        const side = element.dataset.reveal;
        reveal(ctx, [element], {
          preset: side === 'left' ? 'left' : side === 'right' ? 'right' : 'up',
        });
      }

      for (const container of owned('[data-stagger]')) {
        const children = [...container.children] as HTMLElement[];
        if (children.length) reveal(ctx, children, { preset: 'up', stagger: 0.06, trigger: container });
      }

      for (const element of owned('[data-media]')) {
        reveal(ctx, [element], { preset: 'clip', duration: desktop ? 1.1 : 0.8 });
      }

      // ---- 2. Choreography table ------------------------------------------
      for (const rule of CHOREOGRAPHY) {
        if ('each' in rule) {
          for (const element of owned(rule.each)) reveal(ctx, [element], rule.opts);
        } else {
          for (const container of owned(rule.group)) {
            let items: HTMLElement[];
            try { items = [...container.querySelectorAll<HTMLElement>(rule.items)]; }
            catch { continue; }
            if (items.length) reveal(ctx, items, { ...rule.opts, trigger: container });
          }
        }
      }

      // ---- 3. Continuous scroll layer -------------------------------------
      if (!reduced) {
        for (const element of owned('[data-depth]')) {
          const screen = element.dataset.depth === 'screen';
          const depth = desktop ? 1 : 0.45;
          const timeline = gsap.timeline({ scrollTrigger: {
            trigger: element.parentElement || element, start: 'top 95%', end: 'bottom 8%', scrub: 0.5,
            invalidateOnRefresh: true,
          } });
          timeline.fromTo(element, {
            transformPerspective: 1400, rotationX: (screen ? 16 : 9) * depth,
            rotationY: (screen ? -7 : 4) * depth, z: -55 * depth,
          }, { rotationX: 0, rotationY: 0, z: 0, duration: 0.45, ease: 'none' })
            .to(element, { rotationX: -4 * depth, rotationY: 2 * depth, z: -24 * depth, duration: 0.35, ease: 'none' }, 0.65);
          tweens.push(timeline);
        }

        for (const element of owned('[data-parallax]')) {
          parallax(ctx, element, Number(element.dataset.parallax || 24));
        }

        for (const element of owned('[data-drift]')) {
          const amount = desktop ? 9 : 5;
          tweens.push(gsap.fromTo(element, { xPercent: amount }, {
            xPercent: -amount, ease: 'none',
            scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
          }));
        }

        // Ambient colour fields drift slowly behind the content.
        for (const [index, orb] of owned('.spatial-ambient-orb').entries()) {
          const dir = index % 2 === 0 ? 1 : -1;
          const amp = desktop ? 22 : 12;
          tweens.push(gsap.fromTo(orb,
            { yPercent: amp * dir, xPercent: -6 * dir, scale: 0.92 },
            {
              yPercent: -amp * dir, xPercent: 6 * dir, scale: 1.08, ease: 'none',
              scrollTrigger: { trigger: root, start: 'top bottom', end: 'bottom top', scrub: 1 },
            }));
        }

        // Screenshots breathe inside their frames as the frame crosses the viewport.
        for (const frame of owned('.product-image-content, .showcase-main-img-wrap, .showcase-img-wrap')) {
          const shot = frame.querySelector<HTMLElement>('img');
          if (!shot) continue;
          tweens.push(gsap.fromTo(shot, { scale: 1.14, yPercent: -3 }, {
            scale: 1, yPercent: 3, ease: 'none',
            scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: 0.7 },
          }));
        }

        // Interface planes keep the gentle depth pass that reads on a large screen.
        for (const element of owned('[data-spatial]')) {
          const type = element.dataset.spatial;
          if (type === 'orb' || type === 'hero' || type === 'stagger-3d') continue;
          // Chips move a few pixels at phone scale — invisible, yet each one is a scrubbed
          // tween evaluated on every scroll frame. Cards and panels keep their depth pass.
          if (type === 'chip' && !desktop) continue;
          const depth = desktop ? 1 : 0.5;
          const large = type === 'card' || type === 'panel';
          const amp = (large ? 22 : 10) * depth;
          // Cards rise out of depth tilted back, pass the middle of the screen flat, and lean away as they leave.
          tweens.push(gsap.fromTo(element,
            { y: amp, rotationX: (large ? 7 : 3) * depth, z: (large ? -60 : 0) * depth, transformPerspective: 1200 },
            {
              y: -amp, rotationX: -(large ? 5 : 3) * depth, z: (large ? 20 : 0) * depth, ease: 'none',
              scrollTrigger: { trigger: element, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
            }));
        }

        // Section headings fold up out of depth, hinged at their baseline, as they scroll into view.
        for (const heading of owned('.section-heading, .projects-intro > h2, .sub-section-heading, .footer-connection > h2')) {
          tweens.push(gsap.fromTo(heading,
            { rotationX: desktop ? 26 : 16, z: desktop ? -110 : -50, transformPerspective: 1000, transformOrigin: '50% 100%' },
            {
              rotationX: 0, z: 0, ease: 'none',
              scrollTrigger: { trigger: heading, start: 'top bottom', end: 'top 52%', scrub: 0.6 },
            }));
        }

        for (const wire of owned('[data-wire]')) {
          const vertical = wire.dataset.wire === 'vertical';
          drawLine(ctx, wire, vertical, wire.closest('[data-flow]') || wire.parentElement || wire);
        }

        for (const plane of owned('[data-plane]')) {
          const direction = Number(plane.dataset.plane || 1);
          tweens.push(gsap.fromTo(plane,
            { transformPerspective: 900, rotationY: -12 * direction, rotationX: 6, z: -25 },
            {
              rotationY: 9 * direction, rotationX: -4, z: 25, ease: 'none',
              scrollTrigger: { trigger: plane, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
            }));
        }
      }

      for (const element of owned('[data-count]')) countUp(ctx, element);

      // ---- 4. Pointer specular for spatial cards --------------------------
      if (hoverable) {
        const tiltTargets = owned('.glass-panel, .project-card, .source-index, .footer-person, .process-document, .schema-sheet, .evidence-card, .decision-card, .resume-dossier-card');
        for (const card of tiltTargets) {
          const onMove = (event: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', (event.clientX - rect.left) + 'px');
            card.style.setProperty('--mouse-y', (event.clientY - rect.top) + 'px');
          };
          card.addEventListener('mousemove', onMove);
          cleanup.push(() => card.removeEventListener('mousemove', onMove));
        }
      }

      // ---- 5. Section-specific timeline -----------------------------------
      if (build && !reduced) {
        root.dataset.animated = 'true';
        const isHero = root.id === 'opening';
        const galleryEl = root.querySelector<HTMLElement>('.hero-gallery');
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: desktop ? {
            trigger: root, start: 'top 72px', end: 'bottom bottom', scrub: 0.45, invalidateOnRefresh: true,
          } : {
            trigger: isHero && galleryEl ? galleryEl : root,
            start: isHero ? 'top 95%' : 'top 90%',
            end: isHero ? 'bottom 15%' : 'bottom 20%',
            scrub: 0.45, invalidateOnRefresh: true,
          },
        });
        build(timeline, root, desktop);
        tweens.push(timeline);
      }

      return () => {
        for (const tween of tweens) { tween.scrollTrigger?.kill(); tween.kill(); }
        // Last registered, first undone: entrances restore what the scrub setup wrote before them.
        for (const reset of [...cleanup].reverse()) reset();
        root.querySelectorAll<HTMLElement>('[data-motion-bound]').forEach(element => { delete element.dataset.motionBound; });
        delete root.dataset.animated;
      };
    }, root);

    // Prepare a full viewport ahead so an entrance never starts mid-screen.
    let observer: IntersectionObserver | undefined;
    if (root.id === 'opening' || root.getBoundingClientRect().top < window.innerHeight * 1.5) initialize();
    else {
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer?.disconnect();
          initialize();
        }
      }, { rootMargin: '900px 0px' });
      observer.observe(root);
    }
    return () => { observer?.disconnect(); media.revert(); };
  }, [build]);
  return ref;
}

export const useScene = useEditorialReveal;
