'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { personal } from '@/lib/data';
import MagneticButton from '@/components/ui/MagneticButton';
import { scrollToSection } from '@/components/SmoothScroll';

// 3D is heavy + browser-only — load it lazily, render a gradient while it boots.
const HeroScene = dynamic(() => import('@/components/scene/HeroScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 animate-pulse-glow" aria-hidden />,
});

const headlineWords = ['I', 'build', 'digital', 'products', 'that', 'ship.'];

export default function Hero() {
  return (
    <section id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* 3D layer */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* readability veil that doesn't kill the color */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(900px 500px at 18% 50%, rgba(255,255,255,0.62), transparent 70%)',
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="section-eyebrow mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-aurora-emerald animate-pulse" />
            {personal.role} · {personal.aspiration}
          </motion.div>

          <h1 className="font-display text-[clamp(2.6rem,8vw,6rem)] font-extrabold leading-[0.98] tracking-tight">
            {headlineWords.map((word, i) => (
              <motion.span
                key={word + i}
                initial={{ opacity: 0, y: 40, rotateX: -40 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`mr-3 inline-block ${
                  word === 'products' || word === 'ship.' ? 'text-gradient' : 'text-ink'
                }`}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="mt-6 max-w-xl text-lg text-slate-600"
          >
            {personal.intro}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton onClick={() => scrollToSection('projects')}>
              Explore the work
              <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => scrollToSection('contact')}>
              Let&apos;s talk
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500"
          >
            <span>📍 {personal.location}</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-400 sm:block" />
            <span>🎓 {personal.education}</span>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-500"
        aria-label="Scroll to about section"
      >
        Scroll
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-slate-400/60 p-1">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-aurora-violet"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </span>
      </motion.button>
    </section>
  );
}
