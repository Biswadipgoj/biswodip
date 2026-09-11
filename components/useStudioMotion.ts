'use client';
import { useEffect, type RefObject } from 'react';
/** Motion owns DOM transforms. GSAP lives exclusively in the WebGL scene. */
export function useStudioMotion(rootRef: RefObject<HTMLDivElement>, enabled: boolean) {
  useEffect(() => {
    if (!enabled || !rootRef.current) return;
    let disposed = false; let cleanup = () => {};
    import('lenis').then(({ default: Lenis }) => {
      if (disposed) return;
      const lenis = new Lenis({ duration: 1.05, smoothWheel: true, anchors: true });
      let frame = 0;
      const tick = (time: number) => { lenis.raf(time); frame = requestAnimationFrame(tick); };
      frame = requestAnimationFrame(tick);
      cleanup = () => { cancelAnimationFrame(frame); lenis.destroy(); };
    });
    return () => { disposed = true; cleanup(); };
  }, [rootRef, enabled]);
}
