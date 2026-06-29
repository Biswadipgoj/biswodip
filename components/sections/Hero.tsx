'use client';

import { useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
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
  const ref = useRef<HTMLElement>(null);
  // Apple-style: as you scroll out of the hero it zooms out, lifts and fades.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.86]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const blurPx = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);

  return (
    <section ref={ref} id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* 3D layer */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* readability veil that doesn't kill the color */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(900px 500px at 18% 50%, rgba(255,255,255,0.55), transparent 70%)',
        }}
        aria-hidden
      />

      <motion.div
        style={{ scale, opacity, y, filter }}
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 px-6 pt-28 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-0 lg:pb-0">
        {/* ---- text column ---- */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="section-eyebrow mb-6"
          >
            <span className="h-2 w-2 rounded-full bg-aurora-emerald animate-pulse" />
            {personal.role} · {personal.aspiration}
          </motion.div>

          <h1 className="font-display text-[clamp(2.4rem,8vw,5.6rem)] font-extrabold leading-[0.98] tracking-tight">
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
            className="mt-6 max-w-xl text-base text-slate-600 sm:text-lg"
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

        {/* ---- photo column ---- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-[20rem] sm:max-w-sm lg:max-w-md"
        >
          <div className="photo-frame group relative aspect-[4/5] w-full">
            {/* spinning vibrant ring */}
            <span className="photo-ring" aria-hidden />
            {/* soft color glow */}
            <span className="photo-glow" aria-hidden />

            {/* portrait */}
            <div className="photo-inner relative h-full w-full overflow-hidden rounded-[1.7rem]">
              <Image
                src="/biswodip.png"
                alt={`${personal.name} — ${personal.role}`}
                fill
                priority
                sizes="(max-width: 1024px) 80vw, 420px"
                className="object-cover object-top transition-transform duration-700 will-change-transform group-hover:scale-[1.04]"
              />
              {/* colour wash so the white studio background reads as vibrant, not flat */}
              <span className="photo-wash" aria-hidden />
            </div>

            {/* floating status badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-white/80 px-4 py-2 text-xs font-semibold text-ink shadow-xl shadow-violet-500/20 backdrop-blur-md"
            >
              <span className="h-2 w-2 rounded-full bg-aurora-emerald animate-pulse" />
              Open to opportunities
            </motion.div>

            {/* floating name chip */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.25, duration: 0.6 }}
              className="absolute -left-3 top-6 hidden rounded-2xl bg-white/80 px-3 py-2 text-left shadow-lg shadow-cyan-500/20 backdrop-blur-md sm:block"
            >
              <div className="font-display text-sm font-extrabold text-gradient">
                {personal.firstName} {personal.lastName}
              </div>
              <div className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-500">
                B.Tech · CSE
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      <motion.button
        onClick={() => scrollToSection('about')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-500 sm:flex"
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
