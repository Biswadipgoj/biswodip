'use client';

import { useEffect, useRef } from 'react';

/** A soft, color-changing glow that trails the cursor — desktop only, pointer-fine. */
export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      
      // Dynamically calculate hue rotation for the color changing effect
      const hue = (Date.now() * 0.05) % 360;
      
      // Offset by half of 400px (200px) to center the 400x400 element on the cursor
      el.style.transform = `translate3d(${x - 200}px, ${y - 200}px, 0)`;
      // Apply the Tailwind blur-3xl (64px) alongside the dynamic hue rotation
      el.style.filter = `blur(64px) hue-rotate(${hue}deg)`;
      
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      // Increased size to 400px (h-[400px] w-[400px]) as requested
      className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[400px] w-[400px] rounded-full opacity-60 md:block"
      style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.40), transparent 65%)' }}
      aria-hidden
    />
  );
}
