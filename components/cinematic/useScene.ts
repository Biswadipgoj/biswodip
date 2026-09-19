'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
export type SceneBuilder = (timeline: gsap.core.Timeline, root: HTMLElement, desktop: boolean) => void;

/**
 * Progressive enhancement: natural document flow until a timeline is ready.
 * CSS sticky owns pinning; GSAP owns reversible transforms. No React scroll state.
 */
export function useScene(build: SceneBuilder) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const media = gsap.matchMedia();
    media.add({ desktop: '(min-width: 800px)', motion: '(prefers-reduced-motion: no-preference)' }, context => {
      if (!context.conditions?.motion) return;
      root.dataset.animated = 'true';
      const stages = [...root.querySelectorAll<HTMLElement>('[data-range]')];
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root, start: 'top top', end: 'bottom bottom', scrub: 0.35,
          invalidateOnRefresh: true,
          onUpdate: ({ progress }) => {
            for (const stage of stages) {
              const [start, end] = stage.dataset.range!.split(',').map(Number);
              const inactive = progress < start || progress > end;
              stage.inert = inactive;
              stage.setAttribute('aria-hidden', String(inactive));
            }
          },
        },
      });
      build(timeline, root, Boolean(context.conditions.desktop));
      // Explicit duration keeps stage ranges stable as individual beats are edited.
      timeline.to({}, { duration: 0.001 }, 1);
      return () => {
        delete root.dataset.animated;
        stages.forEach(stage => { stage.inert = false; stage.removeAttribute('aria-hidden'); });
      };
    }, root);
    const refresh = () => ScrollTrigger.refresh();
    document.fonts.ready.then(refresh);
    window.addEventListener('load', refresh, { once: true });
    return () => { window.removeEventListener('load', refresh); media.revert(); };
  }, [build]);
  return ref;
}

export function useEditorialReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray<HTMLElement>('[data-reveal]', ref.current).forEach(element => {
        gsap.fromTo(element, { y: 40, clipPath: 'inset(0 0 12% 0)' }, {
          y: 0, clipPath: 'inset(0 0 0% 0)', duration: 0.85, ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 94%', toggleActions: 'play none none reverse' },
        });
      });
    }, ref);
    return () => media.revert();
  }, []);
  return ref;
}
