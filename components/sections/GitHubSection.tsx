'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { github } from '@/lib/data';
import Tilt3D from '@/components/ui/Tilt3D';

/* ------------------------------------------------------------------ */
/* Mock Contribution Grid                                             */
/* ------------------------------------------------------------------ */
function ContributionGrid() {
  const [grid, setGrid] = useState<number[]>([]);
  
  useEffect(() => {
    // 7 days x 20 weeks = 140 blocks
    const initialGrid = Array.from({ length: 140 }, () => Math.random() > 0.6 ? Math.floor(Math.random() * 4) + 1 : 0);
    setGrid(initialGrid);

    const interval = setInterval(() => {
      setGrid(prev => {
        const next = [...prev];
        // Randomly update a few blocks to simulate live commits
        for(let i = 0; i < 3; i++) {
           const idx = Math.floor(Math.random() * next.length);
           next[idx] = Math.floor(Math.random() * 4) + 1;
        }
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const getColor = (level: number) => {
    if (level === 0) return 'rgba(255,255,255,0.05)';
    if (level === 1) return 'rgba(34, 211, 238, 0.3)'; // aurora-cyan dim
    if (level === 2) return 'rgba(34, 211, 238, 0.6)';
    if (level === 3) return 'rgba(34, 211, 238, 0.9)';
    return '#fff'; // max level
  };

  return (
    <div className="grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1.5 p-4 bg-[#080a10] rounded-xl border border-white/5 shadow-inner w-fit mx-auto opacity-80 group-hover:opacity-100 transition-opacity">
      {grid.map((level, i) => (
        <motion.div 
          key={i}
          layout
          className="w-2.5 h-2.5 rounded-sm"
          style={{ 
            backgroundColor: getColor(level),
            boxShadow: level > 1 ? `0 0 ${level * 3}px rgba(34,211,238,0.5)` : 'none'
          }}
          transition={{ duration: 0.5 }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Section                                                       */
/* ------------------------------------------------------------------ */
export default function GitHubSection() {
  const ref = useRef<HTMLAnchorElement>(null);

  return (
    <section id="github" className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
      
      <Tilt3D maxTilt={4}>
        <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#0a0c12]/95 px-6 py-16 text-center md:py-24 shadow-[0_0_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl group">
          
          {/* animated repo-grid backdrop */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: 'radial-gradient(circle at center, #22d3ee 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)',
            }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[80px] transition-opacity duration-700 group-hover:opacity-40"
            style={{ background: 'radial-gradient(circle, #22d3ee, transparent 70%)' }}
            aria-hidden
          />

          <div className="relative z-10">
            <div className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-aurora-cyan/30 bg-aurora-cyan/10 px-3 py-1 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-aurora-cyan animate-pulse" />
              <span className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-aurora-cyan">
                Open Source Infrastructure
              </span>
            </div>

            <motion.a
              ref={ref}
              href={github.url}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[1.8rem] border border-white/20 bg-[#0d1018] shadow-2xl overflow-hidden mb-12"
              aria-label="Visit my GitHub profile"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-aurora-cyan/20 to-aurora-violet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <svg
                viewBox="0 0 24 24"
                className="relative z-10 h-12 w-12 fill-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] transition-transform duration-300 group-hover:scale-110"
                aria-hidden
              >
                <path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.36-3.88-1.36-.53-1.34-1.3-1.7-1.3-1.7-1.06-.72.08-.71.08-.71 1.17.08 1.79 1.2 1.79 1.2 1.04 1.78 2.73 1.27 3.4.97.1-.76.4-1.27.74-1.56-2.56-.29-5.26-1.28-5.26-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.41-5.27 5.69.41.36.78 1.05.78 2.12v3.14c0 .31.2.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
              </svg>
            </motion.a>

            {/* Live Mock Contribution Grid */}
            <div className="hidden md:block mb-12">
               <div className="font-mono text-[0.55rem] text-slate-500 uppercase tracking-[0.2em] mb-3">Live commit stream_</div>
               <ContributionGrid />
            </div>

            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-extrabold tracking-tight text-white mb-4">
              Code built in the <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-cyan to-aurora-violet">open</span>
            </h2>
            
            <p className="mx-auto max-w-xl text-slate-400 font-mono text-sm leading-relaxed mb-10">
              {github.blurb}
            </p>

            <a
              href={github.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 rounded-full border border-aurora-cyan/50 bg-[#080a10]/80 px-8 py-4 text-sm font-bold text-white shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:bg-aurora-cyan/10 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:-translate-y-1"
            >
              <span>Initialize Connection</span>
              <span className="font-mono text-aurora-cyan">github.com/{github.username}</span>
              <span className="text-aurora-cyan" aria-hidden>↗</span>
            </a>
          </div>
          
          {/* Holographic Scanline Overlay */}
          <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500"
               style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(34,211,238,1) 51%, transparent 51%)', backgroundSize: '100% 4px' }} />
        </div>
      </Tilt3D>
    </section>
  );
}
