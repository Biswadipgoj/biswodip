'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { impacts } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import Tilt3D from '@/components/ui/Tilt3D';

/* ------------------------------------------------------------------ */
/* Mock Telemetry Graph (Sine wave or bars)                           */
/* ------------------------------------------------------------------ */
function TelemetryGraph({ color, type }: { color: string, type: 'wave' | 'bars' | 'pulse' }) {
  const [data, setData] = useState<number[]>([]);
  
  useEffect(() => {
    // Generate initial random data
    const initial = Array.from({ length: 15 }, () => Math.random() * 40 + 10);
    setData(initial);
    
    const interval = setInterval(() => {
      setData(prev => {
        const next = [...prev.slice(1), Math.random() * 40 + 10];
        return next;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-16 w-full flex items-end justify-between gap-1 mt-6 opacity-60 mix-blend-screen">
      {type === 'bars' && data.length > 0 && data.map((val, i) => (
        <motion.div 
          key={i} 
          className="w-full rounded-t-sm" 
          style={{ backgroundColor: color, height: `${val}%` }}
          layout transition={{ type: 'spring', bounce: 0, duration: 0.6 }}
        />
      ))}
      
      {type === 'pulse' && (
        <div className="w-full h-full relative flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-dashed animate-spin-slow" style={{ borderColor: color }} />
          <div className="absolute w-8 h-8 rounded-full border border-dotted animate-reverse-spin" style={{ borderColor: color }} />
          <div className="absolute w-2 h-2 rounded-full animate-ping" style={{ backgroundColor: color }} />
        </div>
      )}

      {type === 'wave' && data.length > 0 && (
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
          <path 
            d={`M 0 ${50 - data[0]} Q 25 ${50 - data[5]}, 50 ${50 - data[8]} T 100 ${50 - data[14]}`} 
            fill="none" stroke={color} strokeWidth="2" className="transition-all duration-700 ease-in-out" 
          />
        </svg>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Section                                                       */
/* ------------------------------------------------------------------ */
export default function Impact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineX = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  const getGraphType = (index: number) => {
    if (index === 0) return 'wave';
    if (index === 1) return 'bars';
    return 'pulse';
  };

  return (
    <section id="impact" ref={ref} className="relative mx-auto max-w-7xl px-6 py-28 md:py-36 overflow-hidden">
      
      {/* Deep space ambient background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
           style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <SectionHeading eyebrow="System Telemetry" title="Metrics that" highlight="matter">
        Not pixels for their own sake — outcomes. Here&apos;s the value I bring to every build.
      </SectionHeading>

      {/* drifting gradient data stream */}
      <motion.div style={{ x: lineX }} className="mx-auto mt-12 h-[2px] w-64 rounded-full relative overflow-hidden" aria-hidden>
        <div className="absolute inset-0 bg-white/10" />
        <div
          className="h-full w-1/2 rounded-full absolute left-0 animate-pulse"
          style={{ background: 'linear-gradient(90deg, transparent, #22d3ee, #8b5cf6)' }}
        />
      </motion.div>

      <div className="mt-20 grid gap-8 md:grid-cols-3 relative z-10" style={{ perspective: 1400 }}>
        {impacts.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, rotateY: i === 0 ? -20 : i === 2 ? 20 : 0, y: 60, z: -80 }}
            whileInView={{ opacity: 1, rotateY: 0, y: 0, z: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.85, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Tilt3D maxTilt={12}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0c12]/90 p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-xl">
                
                {/* Corner holographic bloom */}
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full opacity-30 blur-[50px] transition-opacity duration-500 group-hover:opacity-70"
                  style={{ background: `radial-gradient(circle, ${item.accent}, transparent 70%)` }}
                  aria-hidden
                />
                
                {/* Tech grid overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
                     style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '12px 12px' }} />

                {/* Header / ID Badge */}
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-3">
                   <div className="flex items-center gap-2">
                     <span className="font-mono text-[0.55rem] text-slate-500 uppercase tracking-widest">
                       SENSOR_NODE_0{i+1}
                     </span>
                   </div>
                   <span className="flex h-1.5 w-1.5 rounded-full" style={{ backgroundColor: item.accent, boxShadow: `0 0 10px ${item.accent}` }} />
                </div>

                {/* Metric Value */}
                <div className="relative">
                  <div
                    className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl drop-shadow-md"
                    style={{ color: item.accent, textShadow: `0 0 20px ${item.accent}66` }}
                  >
                    {item.metric}
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold text-white tracking-wide">{item.title}</h3>
                </div>
                
                <p className="mt-4 text-[0.8rem] leading-relaxed text-slate-400 font-medium">{item.body}</p>

                {/* Mock Telemetry Graph */}
                <TelemetryGraph color={item.accent} type={getGraphType(i) as any} />

                {/* Bottom connection terminal */}
                <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-4">
                  <span
                    className="block h-[2px] w-12 rounded-full transition-all duration-500 group-hover:w-full"
                    style={{ background: `linear-gradient(90deg, ${item.accent}, transparent)` }}
                    aria-hidden
                  />
                  <span className="font-mono text-[0.5rem] uppercase tracking-widest text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    LINK_ESTABLISHED
                  </span>
                </div>
              </article>
            </Tilt3D>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
