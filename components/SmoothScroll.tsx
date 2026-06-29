'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Wraps the app in Lenis smooth scrolling and exposes a global lenis instance
 * so navigation anchors can animate to sections.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    // Expose for anchor navigation
    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let frame = 0;
    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      (window as unknown as { lenis?: Lenis }).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}

/** Smoothly scroll to a section id, falling back to native behaviour. */
export function scrollToSection(id: string) {
  if (typeof window === 'undefined') return;
  const target = document.getElementById(id);
  if (!target) return;
  const lenis = (window as unknown as { lenis?: Lenis }).lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.4 });
  } else {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
