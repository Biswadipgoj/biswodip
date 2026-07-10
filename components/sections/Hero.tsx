'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  type MotionValue,
} from 'framer-motion';
import { personal, facts, socials } from '@/lib/data';
import MagneticButton from '@/components/ui/MagneticButton';
import { scrollToSection } from '@/components/SmoothScroll';

const headline = [
  { words: ['I', 'build'], gradient: false },
  { words: ['digital', 'worlds'], gradient: true },
  { words: ['that', 'ship.'], gradient: false },
];

function SocialIcon({ label }: { label: string }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'currentColor' } as const;
  if (label === 'GitHub')
    return (
      <svg {...common} aria-hidden>
        <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.7.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 5 18.3 5.3 18.3 5.3c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5Z" />
      </svg>
    );
  if (label === 'Email')
    return (
      <svg {...common} aria-hidden>
        <path d="M2 5.5A1.5 1.5 0 0 1 3.5 4h17A1.5 1.5 0 0 1 22 5.5v13a1.5 1.5 0 0 1-1.5 1.5h-17A1.5 1.5 0 0 1 2 18.5v-13Zm2.3.5 7.7 5.2L19.7 6H4.3ZM20 7.6l-7.4 5a1 1 0 0 1-1.2 0L4 7.6V18h16V7.6Z" />
      </svg>
    );
  return (
    <svg {...common} aria-hidden>
      <path d="M12 2C7.9 2 4.5 5.4 4.5 9.5c0 5.3 6.6 11.7 6.9 12a1 1 0 0 0 1.3 0c.3-.3 6.8-6.7 6.8-12C19.5 5.4 16.1 2 12 2Zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z" />
    </svg>
  );
}



export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale   = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const y       = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 10]);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 20, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 90, damping: 20, mass: 0.5 });

  const headX = useTransform(sx, [-0.5, 0.5], [8, -8]);
  const headY = useTransform(sy, [-0.5, 0.5], [6, -6]);

  useEffect(() => {
    const fine = window.matchMedia?.('(pointer: fine)').matches;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    let raf = 0;
    function onMove(e: MouseEvent) {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        px.set(e.clientX / window.innerWidth - 0.5);
        py.set(e.clientY / window.innerHeight - 0.5);
      });
    }
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [px, py]);

  let wordIndex = 0;

  return (
    /*
     * LAYOUT FIX: flex-col on section so the scroll-cue sits AFTER
     * the content div in the flex flow. It can NEVER overlap with
     * the social row regardless of viewport height.
     */
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-[100dvh] flex-col items-center overflow-hidden"
      style={{ perspective: 1400 }}
    >
      {/* Dark scrim over the 3D world */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(900px 620px at 50% 46%, rgba(10,11,16,0.5), rgba(10,11,16,0.12) 55%, transparent 75%),' +
            'linear-gradient(180deg, rgba(10,11,16,0.4) 0%, transparent 20%, transparent 80%, rgba(10,11,16,0.5) 100%)',
        }}
        aria-hidden
      />

      {/* ── Main content — flex-1 so it fills space above the scroll cue ── */}
      <motion.div
        style={{ scale, opacity, y, rotateX, transformStyle: 'preserve-3d' }}
        className="relative z-10 flex w-full flex-1 flex-col items-center justify-center px-6 pt-28 pb-6 text-center"
      >
        <motion.div
          initial={{ filter: 'blur(20px)', scale: 1.1, opacity: 0, y: 40 }}
          animate={{ filter: 'blur(0px)', scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="flex w-full flex-col items-center justify-center"
        >
          {/* Profile Pill */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-8 flex items-center gap-3 rounded-full border border-white/10 bg-[#13161e]/80 p-1.5 pr-6 shadow-[0_0_30px_rgba(0,0,0,0.5)] backdrop-blur-md"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/20">
              <Image
                src="/biswodip.png"
                alt="Biswodip Goj"
                fill
                className="object-cover object-top"
              />
            </div>
            <div className="flex flex-col items-start justify-center">
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-white/90">
                Biswodip Goj
              </span>
              <span className="flex items-center gap-1.5 text-[0.6rem] font-medium text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-aurora-emerald animate-pulse shadow-[0_0_8px_#34d399]" />
                {personal.role}
              </span>
            </div>
          </motion.div>

        {/* Headline — floats with pointer */}
        <motion.h1
          style={{ x: headX, y: headY }}
          className="font-display text-[clamp(2.6rem,8.5vw,6.2rem)] font-extrabold leading-[0.98] tracking-tight"
        >
          {headline.map((line, li) => (
            <span key={li} className="block">
              {line.words.map((word) => {
                const i = wordIndex++;
                return (
                  <motion.span
                    key={word + i}
                    initial={{ opacity: 0, y: 60, rotateX: -70, z: -120 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
                    transition={{ duration: 0.8, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                    className={`mr-[0.28em] inline-block last:mr-0 ${line.gradient ? 'text-gradient' : 'text-ink'}`}
                    style={{ transformStyle: 'preserve-3d' }}
                  >
                    {word}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </motion.h1>

        {/* Intro */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="mx-auto mt-7 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg"
        >
          {personal.intro}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton onClick={() => scrollToSection('projects')}>
            Step into the work
            <span aria-hidden>→</span>
          </MagneticButton>
          <MagneticButton variant="ghost" onClick={() => scrollToSection('contact')}>
            Let&apos;s talk
          </MagneticButton>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target={s.url.startsWith('http') ? '_blank' : undefined}
              rel={s.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-[#13161e] px-4 py-2 text-xs font-medium text-slate-500 transition-all duration-300 hover:-translate-y-0.5 hover:border-aurora-cyan/40 hover:text-ink"
              aria-label={s.label}
            >
              <span className="text-aurora-cyan transition-colors group-hover:text-aurora-violet">
                <SocialIcon label={s.label} />
              </span>
              {s.handle}
            </a>
          ))}
        </motion.div>

        {/* Unified Glass Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.25 }}
          className="mx-auto mt-16 grid w-full max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4"
        >
          {facts.map((f, i) => (
            <div key={f.label} className="glass card-glow flex flex-col items-center justify-center rounded-2xl p-4 sm:p-6 text-center">
              <span className="font-display text-2xl font-extrabold text-gradient sm:text-3xl">{f.figure}</span>
              <span className="mt-1.5 text-[0.6rem] font-medium uppercase tracking-[0.12em] text-slate-400">
                {f.label}
              </span>
            </div>
          ))}
        </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ── AFTER content in flex column = ZERO overlap possible */}
      <motion.button
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="relative z-10 mb-6 hidden flex-col items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-slate-500/60 transition-all duration-300 hover:text-white/90 sm:flex"
        aria-label="Begin the journey"
      >
        <span>Begin the journey</span>
        <span className="flex h-7 w-3.5 items-start justify-center rounded-full border border-slate-600/50 p-px">
          <motion.span
            className="h-[3px] w-[3px] rounded-full bg-aurora-violet"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
          />
        </span>
      </motion.button>
    </section>
  );
}
