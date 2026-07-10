'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { journey } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import Tilt3D from '@/components/ui/Tilt3D';

/**
 * JOURNEY — System Boot Sequence / Orbital Trajectory
 * 
 * Re-imagined as a sci-fi flight path or terminal log trail.
 * The timeline spine is a data stream. The waypoint nodes are Git/System commits.
 */
export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.5'] });
  const spine = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const spineScale = useTransform(spine, [0, 1], [0, 1]);

  // Generate a mock hash for each step to look like a git commit
  const getHash = (index: number) => {
    const hashes = ['a8f2c3d', 'f89e3a2', 'b47c91x', 'sys_init'];
    return hashes[index] || 'commit_x';
  };

  return (
    <section id="journey" className="relative mx-auto max-w-7xl px-6 py-28 md:py-36 overflow-hidden">
      
      {/* Ambient background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
           style={{ backgroundImage: 'radial-gradient(circle at center, #fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

      <SectionHeading eyebrow="System Log" title="From init() to" highlight="deployment">
        A short story of how curiosity turned into a discipline for delivering software.
      </SectionHeading>

      <div ref={ref} className="relative mt-24" style={{ perspective: 1400 }}>
        
        {/* The Trajectory Spine */}
        <div
          className="absolute left-6 top-0 h-full w-[2px] bg-white/5 md:left-1/2 md:-translate-x-1/2"
          style={{ backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.2) 50%, transparent 50%)', backgroundSize: '100% 12px' }}
          aria-hidden
        />
        <motion.div
          className="absolute left-6 top-0 h-full w-[2px] origin-top md:left-1/2 md:-translate-x-1/2 shadow-[0_0_15px_#22d3ee]"
          style={{
            scaleY: spineScale,
            background: 'linear-gradient(180deg, #22d3ee, #8b5cf6, #34d399, #fbbf24)',
          }}
          aria-hidden
        />

        <div className="space-y-20">
          {journey.map((step, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={step.year}
                initial={{
                  opacity: 0,
                  x: left ? -50 : 50,
                  rotateY: left ? 15 : -15,
                  z: -100,
                }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0, z: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
                className={`relative flex flex-col pl-16 md:w-1/2 md:pl-0 ${
                  left ? 'md:pr-16 md:text-right' : 'md:ml-auto md:pl-16'
                }`}
              >
                {/* Waypoint Node (Git Commit Dot) */}
                <span
                  className={`absolute left-6 top-8 z-10 flex h-5 w-5 -translate-x-1/2 items-center justify-center rounded-full border border-white/20 bg-[#080a10] md:left-auto ${
                    left ? 'md:-right-[2px] md:translate-x-1/2' : 'md:-left-[2px] md:-translate-x-1/2'
                  }`}
                  style={{ boxShadow: `0 0 15px ${step.accent}88` }}
                  aria-hidden
                >
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: step.accent }} />
                  <span
                    className="absolute inset-0 animate-ping rounded-full opacity-50"
                    style={{ background: step.accent }}
                  />
                </span>

                <Tilt3D maxTilt={5}>
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0a0c12]/95 p-6 shadow-2xl backdrop-blur-xl group hover:border-white/20 transition-colors duration-300">
                    
                    {/* Glowing Accent Bar */}
                    <div className={`absolute top-0 w-1 h-full bg-gradient-to-b ${left ? 'right-0' : 'left-0'}`} 
                         style={{ backgroundImage: `linear-gradient(to bottom, ${step.accent}, transparent)` }} />

                    {/* Git Commit Header */}
                    <div className={`flex items-center gap-3 mb-4 pb-3 border-b border-white/5 ${left ? 'md:flex-row-reverse' : ''}`}>
                      <span className="rounded bg-white/5 px-2 py-1 font-mono text-[0.65rem] font-semibold tracking-widest" style={{ color: step.accent }}>
                        {step.year}
                      </span>
                      <span className="font-mono text-[0.55rem] uppercase text-slate-500 tracking-wider">
                        commit {getHash(i)}
                      </span>
                    </div>

                    <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-aurora-cyan transition-colors">{step.title}</h3>
                    
                    {/* Terminal body text */}
                    <p className="font-mono text-[0.75rem] leading-relaxed text-slate-400">
                      <span className="text-aurora-cyan opacity-50 select-none mr-2">&gt;</span>
                      {step.body}
                    </p>

                    {/* Decorative Scanline */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                         style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(255,255,255,1) 51%, transparent 51%)', backgroundSize: '100% 4px' }} />
                  </div>
                </Tilt3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
