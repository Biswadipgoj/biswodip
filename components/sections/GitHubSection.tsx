'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { github } from '@/lib/data';

export default function GitHubSection() {
  const ref = useRef<HTMLAnchorElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mag, setMag] = useState({ x: 0, y: 0 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -18, y: px * 18 });
    setMag({ x: px * 22, y: py * 22 });
  }
  function reset() {
    setTilt({ x: 0, y: 0 });
    setMag({ x: 0, y: 0 });
  }

  return (
    <section id="github" className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
      <div className="glass-strong relative overflow-hidden rounded-[2.5rem] px-6 py-16 text-center md:py-24">
        {/* animated repo-grid backdrop */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139,92,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.5) 1px, transparent 1px)',
            backgroundSize: '46px 46px',
            maskImage: 'radial-gradient(circle at 50% 45%, black, transparent 75%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(circle,#8b5cf6,transparent 70%)' }}
          aria-hidden
        />

        <div className="relative">
          <div className="section-eyebrow mx-auto mb-6">Open source</div>

          <motion.a
            ref={ref}
            href={github.url}
            target="_blank"
            rel="noreferrer"
            onMouseMove={onMove}
            onMouseLeave={reset}
            animate={{ rotateX: tilt.x, rotateY: tilt.y, x: mag.x, y: mag.y }}
            transition={{ type: 'spring', stiffness: 200, damping: 16 }}
            style={{ transformStyle: 'preserve-3d', perspective: 800 }}
            className="group relative mx-auto grid h-28 w-28 place-items-center rounded-[1.8rem]"
            aria-label="Visit my GitHub profile"
          >
            <span
              className="absolute inset-0 rounded-[1.8rem] opacity-90 animate-gradient-pan"
              style={{
                backgroundImage: 'linear-gradient(135deg,#22d3ee,#8b5cf6,#f472b6)',
                backgroundSize: '200% 200%',
                boxShadow: '0 20px 60px -12px rgba(139,92,246,0.6)',
              }}
            />
            <svg
              viewBox="0 0 24 24"
              className="relative h-14 w-14 fill-white drop-shadow"
              aria-hidden
              style={{ transform: 'translateZ(40px)' }}
            >
              <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.05.78 2.12v3.14c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
            </svg>
          </motion.a>

          <h2 className="mt-8 font-display text-[clamp(1.8rem,4vw,3rem)] font-extrabold tracking-tight">
            Built in the open on <span className="text-gradient">GitHub</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600">{github.blurb}</p>

          <a
            href={github.url}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
            style={{ background: 'linear-gradient(110deg,#3b82f6,#8b5cf6,#f472b6)' }}
          >
            github.com/{github.username}
            <span aria-hidden>↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
