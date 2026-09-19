'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    portfolioScroll?: Lenis;
    gsap?: typeof gsap;
    ScrollTrigger?: typeof ScrollTrigger;
  }
}

/** One synchronized clock for smooth scrolling, GSAP ScrollTrigger, and 3D scenes. */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Expose tools for runtime inspection
    window.gsap = gsap;
    window.ScrollTrigger = ScrollTrigger;

    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({
        duration: 1.1,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: -80 },
      });

      const tick = (seconds: number) => {
        lenis.raf(seconds * 1000);
      };

      lenis.on('scroll', () => {
        ScrollTrigger.update();
      });

      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      window.portfolioScroll = lenis;

      // Ensure ScrollTrigger measures after layout settles
      const refresh = () => ScrollTrigger.refresh();
      requestAnimationFrame(refresh);
      setTimeout(refresh, 250);
      setTimeout(refresh, 1000);
      window.addEventListener('resize', refresh);

      return () => {
        window.removeEventListener('resize', refresh);
        gsap.ticker.remove(tick);
        lenis.destroy();
        if (window.portfolioScroll === lenis) {
          window.portfolioScroll = undefined;
        }
      };
    });

    return () => media.revert();
  }, []);

  return <>{children}</>;
}
