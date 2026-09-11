'use client';

import { useEffect, type ReactNode } from 'react';
import Lenis from 'lenis';
import { useExperience } from '../ExperienceProvider';

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const { animated } = useExperience();
  useEffect(() => {
    if (!animated) return;
    const lenis = new Lenis({ duration: 0.8, smoothWheel: true, anchors: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    let frame = 0;
    const tick = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    };
    const visibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('visibilitychange', visibility);
      lenis.destroy();
    };
  }, [animated]);
  return <>{children}</>;
}
