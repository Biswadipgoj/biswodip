'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { useExperience } from '../ExperienceProvider';

/**
 * Counts up to the numeric part of a *real* value from lib/data.ts.
 *
 * The source strings are authored content ('15+', '0', '2', '∞'), never
 * generated, so this only animates the leading integer and preserves any
 * suffix verbatim. Non-numeric values (the '∞' curiosity figure) render as-is.
 *
 * The true value is always present for assistive tech via a visually hidden
 * node; the animating digits are aria-hidden so a screen reader never hears a
 * stream of intermediate numbers.
 */
export default function CountUp({ value, duration = 1500 }: { value: string; duration?: number }) {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : '';

  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
  const { animated } = useExperience();
  const [display, setDisplay] = useState(target === null ? value : '0');

  useEffect(() => {
    if (target === null) return;
    // Reduced motion, motion paused, or not yet scrolled in: show the true
    // value immediately rather than an animated one.
    if (!animated) {
      setDisplay(String(target));
      return;
    }
    if (!inView) return;
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast start, soft landing, no overshoot.
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(String(Math.round(eased * target)));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [animated, inView, target, duration]);

  return (
    <span ref={ref}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true">{display}{suffix}</span>
    </span>
  );
}
