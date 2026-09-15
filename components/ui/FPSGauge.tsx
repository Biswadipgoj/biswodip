'use client';

import { useEffect, useRef, useState } from 'react';

type FrameSample = { fps: number; meanMs: number; maxMs: number; frames: number; periodMs: number };

export default function FPSGauge() {
  const [sample, setSample] = useState<FrameSample | null>(null);
  const mounted = useRef(true);
  const frameId = useRef<number>(0);
  const lastTime = useRef<number>(0);
  const frames = useRef(0);
  const accMs = useRef(0);
  const maxMs = useRef(0);

  useEffect(() => {
    mounted.current = true;

    const measure = (now: number) => {
      if (!mounted.current) return;
      if (document.hidden) {
        frameId.current = requestAnimationFrame(measure);
        return;
      }
      if (lastTime.current !== 0) {
        const dt = now - lastTime.current;
        if (dt > 0) {
          accMs.current += dt;
          maxMs.current = Math.max(maxMs.current, dt);
          frames.current++;
        }
        if (accMs.current >= 1000) {
          const fps = Math.round((frames.current * 1000) / accMs.current);
          setSample({
            fps,
            meanMs: accMs.current / frames.current,
            maxMs: maxMs.current,
            frames: frames.current,
            periodMs: accMs.current,
          });
          accMs.current = 0;
          frames.current = 0;
          maxMs.current = 0;
        }
      }
      lastTime.current = now;
      frameId.current = requestAnimationFrame(measure);
    };

    const reset = () => {
      cancelAnimationFrame(frameId.current);
      frameId.current = 0;
      lastTime.current = 0;
      frames.current = 0;
      accMs.current = 0;
      maxMs.current = 0;
      setSample(null);
      if (!document.hidden) frameId.current = requestAnimationFrame(measure);
    };

    frameId.current = requestAnimationFrame(measure);
    document.addEventListener('visibilitychange', reset);
    return () => {
      mounted.current = false;
      cancelAnimationFrame(frameId.current);
      document.removeEventListener('visibilitychange', reset);
    };
  }, []);

  return (
    <div
      className="fps-gauge pointer-events-none fixed z-40"
      style={{
        left: '50%',
        bottom: 'max(12px, env(safe-area-inset-bottom, 0px))',
        transform: 'translateX(-50%)',
      }}
    >
      <details className="group relative" onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.currentTarget.open = false;
          event.currentTarget.querySelector('summary')?.focus();
        }
      }}>
        <summary
          className="pointer-events-auto flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-xl border border-cyan-200/20 bg-slate-800/80 px-3 backdrop-blur-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300 [&::-webkit-details-marker]:hidden"
          title="Toggle frame timing details"
        >
          <span className="sr-only">Frame timing details: </span>
          <span className="min-w-[3ch] text-right text-sm font-semibold tabular-nums text-cyan-200" aria-live="polite">{sample?.fps ?? '--'}</span>
          <span className="text-slate-300">FPS</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" className="group-open:rotate-180 transition-transform">
            <path d="m3 7 3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 rounded-xl border border-slate-600 bg-slate-900/95 p-4 leading-relaxed text-slate-200 shadow-xl"
          style={{ width: 'min(20rem, calc(100vw - 32px))' }}
        >
          <p className="font-semibold text-slate-100">Frame Timing</p>
          <dl className="mt-3 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 tabular-nums text-sm">
            <dt className="text-slate-400">Mean interval</dt><dd>{sample ? `${sample.meanMs.toFixed(2)} ms` : 'Sampling…'}</dd>
            <dt className="text-slate-400">Longest interval</dt><dd>{sample ? `${sample.maxMs.toFixed(2)} ms` : '--'}</dd>
            <dt className="text-slate-400">Sample size</dt><dd>{sample ? `${sample.frames} frames / ${(sample.periodMs / 1000).toFixed(2)} s` : '--'}</dd>
            <dt className="text-slate-400">Target budget</dt><dd className="text-cyan-200">8.33 ms (120 Hz)</dd>
          </dl>
          <p className="mt-3 text-xs text-slate-500">Browser animation-frame cadence, not GPU render time or monitor refresh rate. 120 FPS is a target, not a guarantee.</p>
        </div>
      </details>
    </div>
  );
}
