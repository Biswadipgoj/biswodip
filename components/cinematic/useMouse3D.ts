'use client';
import { useEffect, useRef, useCallback } from 'react';

/**
 * useMouse3D — tracks mouse position across the page and applies a 3D tilt
 * to any elements with [data-tilt] attribute. Returns a ref to attach to the
 * perspective container.
 *
 * Used by: Opening, Identity, Stack, project cards.
 */
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

export function useMouse3D(strength = 1) {
  const rafRef = useRef<number | null>(null);
  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  const tick = useCallback(() => {
    currentX.current = lerp(currentX.current, targetX.current, 0.08);
    currentY.current = lerp(currentY.current, targetY.current, 0.08);

    const tilts = document.querySelectorAll<HTMLElement>('[data-tilt]');
    tilts.forEach(el => {
      const factor = parseFloat(el.dataset.tiltStrength ?? '1') * strength;
      const rx = currentY.current * -8 * factor;
      const ry = currentX.current * 8 * factor;
      el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(${el.dataset.tiltZ ?? '0'}px)`;
    });

    // Parallax layers at different depths
    const layers = document.querySelectorAll<HTMLElement>('[data-depth]');
    layers.forEach(el => {
      const d = parseFloat(el.dataset.depth ?? '1');
      const x = currentX.current * d * 28;
      const y = currentY.current * d * 18;
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    });

    rafRef.current = requestAnimationFrame(tick);
  }, [strength]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetX.current = (e.clientX / window.innerWidth) * 2 - 1;   // -1 to 1
      targetY.current = (e.clientY / window.innerHeight) * 2 - 1;  // -1 to 1
    };

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [tick]);
}

/**
 * useTiltCard — applies per-element mouse tilt on hover (for cards).
 * Returns a ref to attach to the card element.
 */
export function useTiltCard<T extends HTMLElement>(maxTilt = 12) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      el.style.transform = `perspective(700px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg) scale(1.02)`;
      el.style.transition = 'transform 60ms linear';
    };
    const onLeave = () => {
      el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)';
      el.style.transition = 'transform 600ms cubic-bezier(.22,1,.36,1)';
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [maxTilt]);

  return ref;
}
