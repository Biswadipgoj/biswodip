'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
declare global { interface Window { portfolioScroll?: Lenis } }

/** One clock for smooth scrolling and every scroll scene, including route cleanup. */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add('(prefers-reduced-motion: no-preference)', () => {
      const lenis = new Lenis({ duration: 0.8, smoothWheel: true, syncTouch: false, anchors: { offset: -80 } });
      const tick = (seconds: number) => lenis.raf(seconds * 1000);
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      window.portfolioScroll = lenis;
      return () => {
        gsap.ticker.remove(tick);
        lenis.off('scroll', ScrollTrigger.update);
        lenis.destroy();
        if (window.portfolioScroll === lenis) delete window.portfolioScroll;
      };
    });
    return () => media.revert();
  }, []);
  return <>{children}</>;
}
