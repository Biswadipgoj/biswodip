'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { personal } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import Tilt3D from '@/components/ui/Tilt3D';

/**
 * ABOUT — The Traveler (Core System)
 * 
 * Re-imagined to match the "planet orbiter" theme.
 * The portrait acts as the central planetary body.
 * Key traits (End-to-end, etc) physically orbit the portrait as data satellites.
 * The manifesto text acts as a holographic system log.
 */

const traits = [
  { title: 'End-to-end delivery',  color: '#22d3ee', delay: 0 },
  { title: 'Product thinking',     color: '#a78bfa', delay: 2 },
  { title: 'Clean engineering',    color: '#2496ed', delay: 4 },
  { title: 'Business analysis',    color: '#34d399', delay: 6 } 
];

/* ------------------------------------------------------------------ */
/* Orbiting Satellite Component                                       */
/* ------------------------------------------------------------------ */
function Satellite({ trait, index, total }: { trait: typeof traits[0], index: number, total: number }) {
  const elRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  
  useEffect(() => {
    // Config for portrait orbit
    const rx = 180; // orbit width
    const ry = 240; // orbit height (vertical orbit around portrait)
    const tilt = 0.2; // slight tilt
    const speed = 0.003;
    let angle = (index / total) * Math.PI * 2;

    const loop = () => {
      angle += speed;
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      
      // Orbiting around a center point (portrait)
      const sx = Math.cos(tilt) * rx * cosA;
      const sy = ry * sinA;
      const z  = Math.sin(tilt) * rx * cosA; 
      
      const depth = (z + 100) / 200; // rough normalization for scale/opacity
      
      if (elRef.current) {
        const el = elRef.current;
        const scale = 0.8 + depth * 0.4;
        const opacity = 0.4 + depth * 0.6;
        
        el.style.transform = `translate3d(${sx}px, ${sy}px, ${z}px) scale(${scale})`;
        el.style.opacity = String(opacity.toFixed(2));
        el.style.zIndex = String(Math.round(depth * 100));
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [index, total]);

  return (
    <div
      ref={elRef}
      className="absolute left-1/2 top-1/2 -ml-[70px] -mt-[24px] w-[140px] pointer-events-none"
      style={{ willChange: 'transform, opacity' }}
    >
      <div className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0d1018]/90 px-3 py-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.8)]"
           style={{ boxShadow: `0 0 12px ${trait.color}33, inset 0 0 0 1px ${trait.color}55` }}>
        <span className="h-2 w-2 rounded-full animate-pulse" style={{ background: trait.color, boxShadow: `0 0 8px ${trait.color}` }} />
        <span className="text-[0.6rem] font-bold uppercase tracking-wider text-white/90 whitespace-nowrap">
          {trait.title}
        </span>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-28 md:py-36 overflow-hidden">
      
      {/* Background ambient grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <SectionHeading eyebrow="Core System" title="A developer who" highlight="ships outcomes">
        Not just code on a screen — software that gets designed, built, deployed and actually used.
      </SectionHeading>

      <div className="mt-24 grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
        
        {/* ══════════════════════════════════════════ */}
        {/* LEFT — The Planetary Portrait              */}
        {/* ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex justify-center items-center h-[500px]"
          style={{ perspective: '1200px' }}
        >
          {/* Orbital Paths (Rings) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'rotate(-15deg)' }}>
             <ellipse cx="50%" cy="50%" rx="180" ry="240" fill="none" stroke="#22d3ee" strokeWidth="1" strokeOpacity="0.15" strokeDasharray="4 6" />
             <ellipse cx="50%" cy="50%" rx="200" ry="260" fill="none" stroke="#a78bfa" strokeWidth="1" strokeOpacity="0.05" />
          </svg>

          {/* Central Body (Portrait) */}
          <div className="relative z-10 w-full max-w-[16rem]">
            {/* Core Glow */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-aurora-cyan/30 to-aurora-violet/30 blur-[40px] animate-pulse" />
            
            <Tilt3D maxTilt={15} glare={true} lift={true}>
              <div className="portrait-card group relative aspect-[4/5] w-full rounded-[1.8rem] border border-white/10 bg-[#0d1018] shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0c10] z-10" />
                
                <Image
                  src="/biswodip.png"
                  alt={`${personal.name} — ${personal.role}`}
                  fill
                  sizes="(max-width: 1024px) 76vw, 304px"
                  className="object-cover object-top transition-transform duration-1000 group-hover:scale-110 opacity-90"
                />
                
                {/* HUD Overlay inside portrait */}
                <div className="absolute inset-x-0 bottom-0 p-5 z-20">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-aurora-emerald animate-ping" />
                    <span className="font-mono text-[0.55rem] uppercase tracking-widest text-aurora-emerald">System Active</span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white tracking-wide">
                    {personal.firstName} <span className="text-white/60">{personal.lastName}</span>
                  </h3>
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] text-slate-400 mt-1 font-mono">
                    {personal.location.split(',')[0]} // {personal.role}
                  </p>
                </div>
                
                {/* Tech scanline over portrait */}
                <div className="absolute inset-0 z-30 opacity-10 pointer-events-none"
                     style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.1) 51%, transparent 51%)', backgroundSize: '100% 4px' }} />
              </div>
            </Tilt3D>
          </div>

          {/* Orbiting Satellites (Traits) */}
          <div className="absolute inset-0" style={{ transform: 'rotate(-15deg)', transformStyle: 'preserve-3d' }}>
            {traits.map((trait, i) => (
              <Satellite key={trait.title} trait={trait} index={i} total={traits.length} />
            ))}
          </div>

        </motion.div>

        {/* ══════════════════════════════════════════ */}
        {/* RIGHT — System Log (Manifesto)             */}
        {/* ══════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          {/* Holographic panel styling */}
          <div className="relative rounded-3xl border border-white/10 bg-gradient-to-br from-[#121622]/90 to-[#0a0c10]/90 p-8 md:p-10 shadow-[0_0_40px_rgba(0,0,0,0.5)] backdrop-blur-xl">
            
            {/* Top decorative bar */}
            <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-aurora-cyan/50 to-transparent" />
            <div className="absolute top-0 left-10 w-12 h-[2px] bg-aurora-cyan shadow-[0_0_10px_#22d3ee]" />

            <div className="mb-6 flex items-center gap-3">
               <div className="flex gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-slate-600" />
                  <div className="h-2 w-2 rounded-full bg-slate-600" />
                  <div className="h-2 w-2 rounded-full bg-aurora-cyan animate-pulse" />
               </div>
               <span className="font-mono text-[0.6rem] uppercase tracking-widest text-aurora-cyan/80">
                  Mission_Directive.log
               </span>
            </div>

            <p className="font-mono text-sm leading-relaxed md:text-base md:leading-loose" style={{ color: '#d2ebf9' }}>
              I work end to end: <span className="text-aurora-cyan font-semibold">research</span>, <span className="text-aurora-violet font-semibold">design</span>, <span className="text-aurora-pink font-semibold">engineering</span> and <span className="text-aurora-emerald font-semibold">delivery</span>. 
              <br /><br />
              Across every real solution I have shipped, I have learned that great software is equal parts crisp interface, solid engineering and a clear understanding of the business problem underneath. 
              <br /><br />
              <span className="text-white bg-white/10 px-2 py-1 border-l-2 border-aurora-cyan">That bridge — between code and outcomes — is exactly where I want to keep building.</span>
            </p>

            {/* Bottom decorative accents */}
            <div className="mt-10 flex items-center justify-between border-t border-white/5 pt-6">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-aurora-emerald animate-pulse" />
                <div className="font-mono text-[0.55rem] text-aurora-emerald uppercase tracking-[0.2em]">
                  Status: Operational
                </div>
              </div>
              <svg className="w-16 h-4 opacity-50" viewBox="0 0 100 20" preserveAspectRatio="none">
                <path d="M0,10 L20,10 L25,5 L35,5 L40,15 L50,15 L55,10 L100,10" fill="none" stroke="#22d3ee" strokeWidth="1" />
              </svg>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
