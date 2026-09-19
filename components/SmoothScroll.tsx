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

      let velocityDecay: ReturnType<typeof setTimeout>;
      lenis.on('scroll', (e: { velocity?: number }) => {
        ScrollTrigger.update();
        if (typeof e.velocity === 'number') {
          const v = Math.max(-14, Math.min(14, e.velocity));
          document.documentElement.style.setProperty('--scroll-velocity', `${v * 0.14}deg`);
          document.documentElement.style.setProperty('--scroll-stretch', `${1 + Math.abs(v) * 0.003}`);
          clearTimeout(velocityDecay);
          velocityDecay = setTimeout(() => {
            document.documentElement.style.setProperty('--scroll-velocity', '0deg');
            document.documentElement.style.setProperty('--scroll-stretch', '1');
          }, 120);
        }
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
