'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Smooth scroll with GSAP ScrollTrigger integration.
 * This is the CRITICAL bridge — without it, no scroll animation works.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 0.65,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.2,
      wheelMultiplier: 1.0,
    });

    // ★ CRITICAL: Sync Lenis scroll position → GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // ★ CRITICAL: Drive Lenis RAF from GSAP ticker (single unified loop)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // Expose for anchor navigation
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback);
      (window as unknown as { lenis?: Lenis }).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
