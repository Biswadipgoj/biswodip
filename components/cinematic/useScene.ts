'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { glyphMarkup } from '@/lib/motion-markup';

gsap.registerPlugin(ScrollTrigger);
export type SceneBuilder = (timeline: gsap.core.Timeline, root: HTMLElement, desktop: boolean) => void;

/** Section ownership prevents two timelines from controlling nested project scenes. */
export function useEditorialReveal(build?: SceneBuilder) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = gsap.matchMedia();
    const initialize = () => media.add({ motion: '(prefers-reduced-motion: no-preference)', desktop: '(min-width: 1000px) and (min-height: 700px)' }, context => {
      if (!context.conditions?.motion) return;
      const desktop = Boolean(context.conditions.desktop);
      const cleanup: Array<() => void> = [];
      const owned = (selector: string) => [...root.querySelectorAll<HTMLElement>(selector)]
        .filter(element => element.closest('[data-motion-root]') === root);
      const scroll = (trigger: HTMLElement, end = 'top 66%') => ({
        trigger, start: 'top 96%', end, scrub: 0.45, invalidateOnRefresh: true,
      });

      // Read transforms before any tween writes to avoid a layout pass per glyph.
      const transforms = new Set(owned('[data-reveal], [data-media], [data-parallax], [data-wire], [data-drift], [data-depth], [data-plane], [data-spatial]'));
      for (const group of owned('[data-stagger]')) {
        for (const child of group.children) transforms.add(child as HTMLElement);
      }
      transforms.forEach(element => gsap.getProperty(element, 'x'));

      // One numeric tween per block avoids a computed-style read and tween per letter.
      for (const block of owned('[data-type]')) {
        const visual = block.querySelector<HTMLElement>('[data-motion-visual]');
        if (!visual) continue;
        const originalMarkup = visual.innerHTML;
        // Keep the initial document small; letters are split only in nearby scenes.
        visual.querySelectorAll<HTMLElement>('.motion-word, .code-line').forEach(word => {
          word.innerHTML = glyphMarkup(word.textContent || '');
        });
        cleanup.push(() => { visual.innerHTML = originalMarkup; });
        const glyphs = [...block.querySelectorAll<HTMLElement>('[data-glyph]')];
        if (!glyphs.length) continue;
        const code = block.dataset.type === 'code';
        const progress = { value: 0 };
        const stagger = 0.65 / Math.max(1, glyphs.length - 1);
        const render = () => {
          glyphs.forEach((glyph, index) => {
            const remaining = 1 - Math.max(0, Math.min(1, (progress.value - index * stagger) / 0.35));
            const y = ((code ? 3 : 14) * remaining).toFixed(2);
            const rotation = ((code ? 0 : desktop ? 32 : 16) * remaining).toFixed(2);
            const transform = remaining === 0 ? 'none' : `translateY(${y}px) rotateX(${rotation}deg)`;
            if (glyph.style.transform !== transform) glyph.style.transform = transform;
          });
        };
        gsap.to(progress, {
          value: 1, duration: 1, ease: 'none', onUpdate: render,
          scrollTrigger: scroll(block, 'top 60%'),
        });
        render();
      }
      for (const element of owned('[data-reveal]')) {
        const side = element.dataset.reveal;
        gsap.fromTo(element, { y: side === 'left' || side === 'right' ? 0 : 28, x: side === 'left' ? -30 : side === 'right' ? 30 : 0, opacity: 1 }, {
          x: 0, y: 0, opacity: 1, ease: 'none', scrollTrigger: scroll(element),
        });
      }
      for (const container of owned('[data-stagger]')) {
        const children = [...container.children].filter(child => !child.hasAttribute('data-reveal'));
        if (!children.length) continue;
        gsap.fromTo(children, { y: 22, opacity: 1 }, {
          y: 0, opacity: 1, ease: 'none', stagger: { amount: 0.45 }, scrollTrigger: scroll(container, 'top 55%'),
        });
      }
      for (const element of owned('[data-media]:not([data-spatial])')) {
        gsap.fromTo(element, { y: desktop ? 60 : 36, scale: 0.94, rotation: desktop ? -1.5 : -1.0 }, {
          y: 0, scale: 1, rotation: 0, ease: 'none', scrollTrigger: scroll(element, 'top 30%'),
        });
      }
      for (const element of owned('[data-parallax]:not([data-plane]):not([data-spatial])')) {
        const amount = Number(element.dataset.parallax || 24) * (desktop ? 1 : 0.85);
        gsap.fromTo(element, { y: amount }, { y: -amount, ease: 'none', scrollTrigger: {
          trigger: element.parentElement, start: 'top bottom', end: 'bottom top', scrub: 0.5,
        } });
      }
      for (const wire of owned('[data-wire]')) {
        const vertical = wire.dataset.wire === 'vertical';
        gsap.fromTo(wire, vertical ? { scaleY: 0, transformOrigin: 'top' } : { scaleX: 0, transformOrigin: 'left' }, {
          ...(vertical ? { scaleY: 1 } : { scaleX: 1 }), ease: 'none',
          scrollTrigger: scroll(wire.closest<HTMLElement>('[data-flow]') || wire.parentElement!, 'bottom 45%'),
        });
      }
      for (const element of owned('[data-drift]')) {
        gsap.fromTo(element, { xPercent: desktop ? 8 : 6 }, {
          xPercent: desktop ? -8 : -6, ease: 'none', scrollTrigger: {
            trigger: element, start: 'top bottom', end: 'bottom top', scrub: 0.5,
          },
        });
      }
      // Interface planes arrive in depth, square up for reading, and gently recede.
      for (const element of owned('[data-depth]:not([data-spatial])')) {
        const screen = element.dataset.depth === 'screen';
        const depth = desktop ? 1 : 0.9;
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: element, start: 'top 95%', end: 'bottom 10%', scrub: 0.45,
          invalidateOnRefresh: true,
        } });
        timeline.fromTo(element, {
          transformPerspective: 1400, rotationX: (screen ? 14 : 8) * depth,
          rotationY: (screen ? -6 : 3) * depth, z: -45 * depth,
        }, { rotationX: 0, rotationY: 0, z: 0, duration: 0.45, ease: 'none' })
          .to(element, { rotationX: -4 * depth, rotationY: 2 * depth, z: -20 * depth, duration: 0.35, ease: 'none' }, 0.65);
      }
      for (const plane of owned('[data-plane]')) {
        const direction = Number(plane.dataset.plane || 1);
        gsap.fromTo(plane, { transformPerspective: 900, rotationY: -14 * direction, rotationX: 7, z: -30 }, {
          rotationY: 10 * direction, rotationX: -4, z: 30, ease: 'none', scrollTrigger: {
            trigger: plane, start: 'top bottom', end: 'bottom top', scrub: 0.5,
          },
        });
      }
      for (const element of owned('[data-spatial]')) {
        const type = element.dataset.spatial;
        const depth = desktop ? 1 : 0.6;
        const timeline = gsap.timeline({ scrollTrigger: {
          trigger: element, start: 'top 98%', end: 'bottom 8%', scrub: 0.45,
          invalidateOnRefresh: true,
        } });
        if (type === 'hero') {
          timeline.fromTo(element, {
            transformPerspective: 1400, rotationX: 14 * depth, rotationY: -10 * depth, z: -70 * depth, scale: 0.95
          }, { rotationX: 0, rotationY: 0, z: 0, scale: 1, duration: 0.5, ease: 'none' })
            .to(element, { rotationX: -10 * depth, rotationY: 7 * depth, z: -50 * depth, scale: 0.96, duration: 0.5, ease: 'none' });
        } else if (type === 'card') {
          timeline.fromTo(element, {
            transformPerspective: 1200, rotationX: 12 * depth, rotationY: -5 * depth, z: -40 * depth, y: 24, scale: 0.97
          }, { rotationX: 0, rotationY: 0, z: 0, y: 0, scale: 1, duration: 0.45, ease: 'none' })
            .to(element, { rotationX: -7 * depth, rotationY: 3 * depth, z: -24 * depth, y: -16, scale: 0.98, duration: 0.3, ease: 'none' }, 0.7);
        } else if (type === 'panel') {
          timeline.fromTo(element, {
            transformPerspective: 1300, rotationX: 9 * depth, rotationY: 6 * depth, z: -35 * depth, y: 20
          }, { rotationX: 0, rotationY: 0, z: 0, y: 0, duration: 0.48, ease: 'none' })
            .to(element, { rotationX: -5 * depth, rotationY: -3 * depth, z: -18 * depth, y: -14, duration: 0.48, ease: 'none' });
        } else if (type === 'chip' || type === 'float') {
          const dir = Number(element.dataset.dir || 1);
          const chipAmp = desktop ? 16 : 8;
          timeline.fromTo(element, {
            transformPerspective: 1000, y: chipAmp * depth * dir, z: -16 * depth, rotationZ: -2.5 * dir, rotationX: 4 * depth
          }, { y: 0, z: 10 * depth, rotationZ: 0, rotationX: 0, duration: 0.5, ease: 'none' })
            .to(element, { y: -chipAmp * depth * dir, z: -10 * depth, rotationZ: 2.5 * dir, rotationX: -4 * depth, duration: 0.5, ease: 'none' });
        } else if (type === 'orb') {
          timeline.fromTo(element, {
            yPercent: 25 * depth, xPercent: -12 * depth, scale: 0.88
          }, { yPercent: 0, xPercent: 0, scale: 1.12, duration: 0.5, ease: 'none' })
            .to(element, { yPercent: -25 * depth, xPercent: 12 * depth, scale: 0.92, duration: 0.5, ease: 'none' });
        } else if (type === 'stagger-3d') {
          const children = [...element.children].filter(child => !child.hasAttribute('data-spatial'));
          if (children.length) {
            gsap.fromTo(children, {
              transformPerspective: 1000, rotationX: 14 * depth, z: -30 * depth, y: 22, opacity: 1
            }, {
              rotationX: 0, z: 0, y: 0, opacity: 1, ease: 'none', stagger: { amount: 0.45 }, scrollTrigger: scroll(element, 'top 55%')
            });
          }
        } else {
          timeline.fromTo(element, {
            transformPerspective: 1000, rotationX: 7 * depth, z: -25 * depth, y: 16
          }, { rotationX: 0, z: 0, y: 0, duration: 0.5, ease: 'none' })
            .to(element, { rotationX: -3 * depth, z: -12 * depth, y: -8, duration: 0.5, ease: 'none' });
        }
      }

      // Pointer tracking for dynamic VisionOS specular reflection on spatial cards
      if (desktop) {
        const tiltTargets = owned('.glass-panel, .project-card, .source-index, .footer-person, .process-document, .schema-sheet');
        tiltTargets.forEach(card => {
          const onMove = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
          };
          card.addEventListener('mousemove', onMove);
          cleanup.push(() => card.removeEventListener('mousemove', onMove));
        });
      }
      if (build) {
        root.dataset.animated = 'true';
        const isHero = root.id === 'opening';
        const galleryEl = root.querySelector<HTMLElement>('.hero-gallery');
        const timeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: desktop ? {
            trigger: root,
            start: 'top 72px',
            end: 'bottom bottom',
            scrub: 0.45,
            invalidateOnRefresh: true,
          } : {
            trigger: isHero && galleryEl ? galleryEl : root,
            start: isHero ? 'top 95%' : 'top 90%',
            end: isHero ? 'bottom 15%' : 'bottom 20%',
            scrub: 0.45,
            invalidateOnRefresh: true,
          }
        });
        build(timeline, root, desktop);
      }
      return () => { cleanup.forEach(reset => reset()); delete root.dataset.animated; };
    }, root);
    // Prepare only nearby sections so a long page does not block first interaction.
    let observer: IntersectionObserver | undefined;
    if (root.id === 'opening') initialize();
    else {
      observer = new IntersectionObserver(entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          observer?.disconnect();
          initialize();
        }
      }, { rootMargin: '200px 0px' });
      observer.observe(root);
    }
    return () => { observer?.disconnect(); media.revert(); };
  }, [build]);
  return ref;
}

export const useScene = useEditorialReveal;
