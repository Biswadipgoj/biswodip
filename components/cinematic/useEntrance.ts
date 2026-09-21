'use client';
import { useEffect, type RefObject } from 'react';
import { animate, stagger, createScope } from 'animejs';

/** Anime owns entrance children only; GSAP owns their scrolling parents. */
export function useEntrance(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;
    const scope = createScope({ root: ref.current, mediaQueries: {
      reduced: '(prefers-reduced-motion: reduce)', mobile: '(max-width: 799px)',
    }}).add(self => {
      if (!self || self.matches.reduced) return;
      animate('[data-entrance]', {
        opacity: [0.6, 1], y: [self.matches.mobile ? 8 : 18, 0],
        duration: self.matches.mobile ? 360 : 560,
        delay: stagger(65), ease: 'outCubic',
      });
    });
    return () => scope.revert();
  }, [ref]);
}

