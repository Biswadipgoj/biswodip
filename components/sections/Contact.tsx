'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { personal } from '@/lib/data';

const EASE = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Mock Terminal Command Input                                        */
/* ------------------------------------------------------------------ */
function TerminalCommand() {
  const [input, setInput] = useState('');
  const [state, setState] = useState<'idle' | 'typing' | 'success'>('idle');
  
  const handleConnect = () => {
    if (state !== 'idle') return;
    setState('typing');
    let i = 0;
    const txt = `mailto:${personal.email}`;
    setInput('');
    const interval = setInterval(() => {
      setInput(prev => prev + txt.charAt(i));
      i++;
      if (i === txt.length) {
        clearInterval(interval);
        setTimeout(() => {
          setState('success');
          setTimeout(() => {
            window.location.href = `mailto:${personal.email}`;
            setTimeout(() => {
              setInput('');
              setState('idle');
            }, 2000);
          }, 500);
        }, 300);
      }
    }, 50);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 rounded-xl border border-aurora-cyan/30 bg-[#080a10]/80 p-4 shadow-[0_0_30px_rgba(34,211,238,0.15)] backdrop-blur-xl relative group">
      {/* Decorative dots */}
      <div className="flex gap-1.5 mb-3">
        <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
        <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
        <div className="h-2.5 w-2.5 rounded-full bg-aurora-cyan/50" />
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex-1 font-mono text-sm sm:text-base text-white/80 flex items-center bg-[#0d1018] rounded-md px-3 py-2.5 border border-white/5">
          <span className="text-aurora-cyan mr-2 font-bold select-none">root@sys:~#</span>
          <span>{input}</span>
          <span className="inline-block w-2 h-4 bg-aurora-cyan animate-pulse ml-1" />
        </div>
        
        <button
          onClick={handleConnect}
          disabled={state !== 'idle'}
          className="relative px-6 py-2.5 font-mono text-sm font-bold uppercase tracking-widest text-white rounded-md overflow-hidden bg-aurora-cyan/20 border border-aurora-cyan/50 hover:bg-aurora-cyan hover:text-black transition-colors"
        >
          <AnimatePresence mode="wait">
            {state === 'idle' && <motion.span key="init" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>Init_Link</motion.span>}
            {state === 'typing' && <motion.span key="exec" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>Executing...</motion.span>}
            {state === 'success' && <motion.span key="done" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>Ping_Sent</motion.span>}
          </AnimatePresence>
        </button>
      </div>

      {state === 'success' && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="absolute -bottom-8 left-0 right-0 text-center font-mono text-[0.65rem] text-aurora-emerald tracking-widest"
        >
          [ SUCCESS: CONNECTION ESTABLISHED ]
        </motion.div>
      )}
    </div>
  );
}

/**
 * CONTACT — The Final Transmission
 * Re-imagined as a sci-fi command terminal waiting for user input.
 */
export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [10, 0]);

  return (
    <section id="contact" ref={ref} className="relative px-0 pt-10 md:pt-16 pb-24" style={{ perspective: 1600 }}>
      <motion.div
        style={{ scale, rotateX, transformStyle: 'preserve-3d' }}
        className="relative mx-auto flex min-h-[80svh] w-full max-w-[1400px] flex-col items-center justify-center overflow-hidden rounded-[3rem] border border-white/10 bg-[#0a0c12]/95 px-6 py-24 text-center text-white shadow-[0_0_80px_rgba(0,0,0,0.8)] backdrop-blur-3xl"
      >
        {/* Radar / Core Glow Background */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
             style={{ backgroundImage: 'radial-gradient(circle at center, #22d3ee 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-aurora-cyan/10"
          animate={{ rotate: 360, scale: [1, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,#22d3ee_0%,transparent_50%)] opacity-10 blur-[100px]" />

        <div className="relative z-10 max-w-4xl w-full">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto mb-8 inline-flex items-center gap-3 rounded-full border border-aurora-cyan/40 bg-aurora-cyan/10 px-4 py-2 text-xs font-mono font-bold uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(34,211,238,0.2)] backdrop-blur"
          >
            <span className="flex h-2 w-2 items-center justify-center">
              <span className="absolute h-2 w-2 rounded-full bg-aurora-cyan animate-ping opacity-75" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-aurora-cyan" />
            </span>
            Transmission Ready
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40, rotateX: -20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ transformStyle: 'preserve-3d' }}
            className="font-display text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight drop-shadow-lg mb-6"
          >
            Ready to deploy your <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurora-cyan via-aurora-violet to-aurora-pink">next build?</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mx-auto max-w-2xl text-base sm:text-lg text-slate-400 font-mono leading-relaxed"
          >
            I&apos;m open to freelance builds, product collaborations, and business-analyst roles.
            Enter the command below to initialize contact. Let&apos;s build the future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="w-full"
          >
            <TerminalCommand />
          </motion.div>

        </div>
        
        {/* Scanline Overlay */}
        <div className="absolute inset-0 z-20 pointer-events-none opacity-[0.04]"
             style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(255,255,255,1) 51%, transparent 51%)', backgroundSize: '100% 4px' }} />
      </motion.div>
    </section>
  );
}
