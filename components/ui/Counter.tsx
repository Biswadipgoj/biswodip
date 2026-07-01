'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/** Counts up to `value` when scrolled into view. */
export default function Counter({
  value,
  suffix = '',
  plain = false,
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  plain?: boolean;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  const formatted = plain ? value : display;
  return (
    <span ref={ref}>
      {formatted}
      {suffix}
    </span>
  );
}
