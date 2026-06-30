'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { personal, stats, socials } from '@/lib/data';
import MagneticButton from '@/components/ui/MagneticButton';
import Counter from '@/components/ui/Counter';
import { scrollToSection } from '@/components/SmoothScroll';

// 3D is heavy + browser-only — load it lazily, render a gradient while it boots.
const HeroScene = dynamic(() => import('@/components/scene/HeroScene'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 animate-pulse-glow" aria-hidden />,
});

const headlineWords = ['I', 'build', 'digital', 'products', 'that', 'ship.'];

// Compact icon set for the social row — kept inline so there's no icon dependency.
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
  const portraitRef = useRef<HTMLDivElement>(null);

  // Apple-style: as you scroll out of the hero it zooms out, lifts and fades.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const blurPx = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const filter = useTransform(blurPx, (b) => `blur(${b}px)`);

  // ---- Mouse-reactive parallax for the portrait (desktop / fine pointer only) ----
  // Raw pointer offset, normalised to roughly [-0.5, 0.5].
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  // Smooth, spring-damped so the tilt glides instead of snapping — feels premium,
  // and the spring naturally throttles work so it never gets laggy.
  const sx = useSpring(px, { stiffness: 120, damping: 18, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 120, damping: 18, mass: 0.4 });

  // Card tilts toward the cursor; the inner layer translates a touch for depth.
  // (Kept on a dedicated element so it never fights the float/spin keyframes.)
  const rotateY = useTransform(sx, [-0.5, 0.5], [8, -8]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-8, 8]);
  const cardX = useTransform(sx, [-0.5, 0.5], [-12, 12]);
  const cardY = useTransform(sy, [-0.5, 0.5], [-12, 12]);

  useEffect(() => {
    const fine = window.matchMedia?.('(pointer: fine)').matches;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    const el = portraitRef.current;
    if (!el) return;

    let raf = 0;
    function onMove(e: MouseEvent) {
      if (raf) return; // coalesce to one update per frame — keeps it smooth
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = el!.getBoundingClientRect();
        const nx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
        const ny = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
        px.set(Math.max(-0.6, Math.min(0.6, nx)));
        py.set(Math.max(-0.6, Math.min(0.6, ny)));
      });
    }
    function onLeave() {
      px.set(0);
      py.set(0);
    }

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [px, py]);

  return (
    <section ref={ref} id="hero" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Lighter colorful gradient base — sits behind the (transparent) 3D layer
          so the hero never reads as a flat dark/empty block. */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            'radial-gradient(1100px 760px at 18% 12%, rgba(56,189,248,0.34), transparent 60%),' +
            'radial-gradient(1000px 720px at 86% 8%, rgba(129,140,248,0.40), transparent 60%),' +
            'radial-gradient(900px 760px at 78% 82%, rgba(236,72,153,0.30), transparent 62%),' +
            'radial-gradient(820px 620px at 30% 88%, rgba(52,211,153,0.22), transparent 62%),' +
            'linear-gradient(160deg, #211c4d 0%, #2a2360 45%, #1b1740 100%)',
        }}
        aria-hidden
      />

      {/* 3D layer */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Light readability scrim — just enough lift behind the type so it stays
          crisp over the colorful gradient, without darkening the composition. */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'radial-gradient(1000px 720px at 24% 46%, rgba(15,12,38,0.5), rgba(15,12,38,0.18) 48%, transparent 72%),' +
            'linear-gradient(180deg, rgba(15,12,38,0.32) 0%, transparent 24%, transparent 78%, rgba(15,12,38,0.42) 100%)',
        }}
        aria-hidden
      />

      <motion.div
        style={{ scale, opacity, y, filter }}
        className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-6 pt-28 pb-20 xl:grid-cols-[1.1fr_0.9fr] xl:gap-16 xl:pt-0 xl:pb-0"
      >
        {/* ---------------------------------------------------------------- */}
        {/* LEFT — narrative column (~55%)                                    */}
        {/* ---------------------------------------------------------------- */}
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

          <h1 className="font-display text-[clamp(2.4rem,7.2vw,5.4rem)] font-extrabold leading-[0.98] tracking-tight">
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
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-500 sm:text-lg"
          >
            {personal.intro}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.82 }}
            className="mt-3 text-sm font-medium text-slate-400"
          >
            {personal.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.95 }}
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

          {/* social links */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.1 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel={s.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-medium text-slate-500 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-aurora-cyan/40 hover:text-ink"
                aria-label={s.label}
              >
                <span className="text-aurora-cyan transition-colors group-hover:text-aurora-violet">
                  <SocialIcon label={s.label} />
                </span>
                {s.handle}
              </a>
            ))}
          </motion.div>

          {/* animated statistics */}
          <motion.dl
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.25 }}
            className="mt-10 grid max-w-xl grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="order-2 mt-1 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-slate-400">
                  {s.label}
                </dt>
                <dd className="order-1 font-display text-2xl font-extrabold text-gradient sm:text-3xl">
                  <Counter
                    value={s.value}
                    suffix={'suffix' in s ? s.suffix : ''}
                    plain={'plain' in s ? (s as { plain?: boolean }).plain : false}
                  />
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* RIGHT — premium portrait composition (~45%)                      */}
        {/* ---------------------------------------------------------------- */}
        <motion.div
          ref={portraitRef}
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="hero-portrait relative mx-auto w-full max-w-[18rem] sm:max-w-[20rem] xl:max-w-[23rem]"
        >
          {/* decorative layers — centred on the card, transform-free so their
              keyframe animations (spin / pulse) never get clobbered */}
          <span className="portrait-aurora" aria-hidden />
          <span className="holo-ring holo-ring--1" aria-hidden />
          <span className="holo-ring holo-ring--2" aria-hidden />
          <span className="portrait-orb portrait-orb--cyan" aria-hidden />
          <span className="portrait-orb portrait-orb--violet" aria-hidden />
          <span className="portrait-orb portrait-orb--pink" aria-hidden />

          {/* float lives on the wrapper; mouse-tilt on the inner element, so the
              two transforms compose instead of overriding each other */}
          <div className="portrait-breathe">
            <motion.div
              className="portrait-tilt"
              style={{ rotateX, rotateY, x: cardX, y: cardY, transformPerspective: 1000 }}
            >
              <div className="portrait-card group relative aspect-[4/5] w-full">
                {/* animated gradient border */}
                <span className="portrait-border" aria-hidden />

                {/* portrait media */}
                <div className="portrait-media relative h-full w-full overflow-hidden rounded-[1.65rem]">
                  <Image
                    src="/biswodip.png"
                    alt={`${personal.name} — ${personal.role}`}
                    fill
                    priority
                    sizes="(max-width: 1280px) 80vw, 368px"
                    className="object-cover object-top transition-transform duration-700 will-change-transform group-hover:scale-[1.05]"
                  />
                  {/* colour wash so the white studio background reads vibrant, not flat */}
                  <span className="portrait-wash" aria-hidden />
                  {/* dynamic reflection sweep */}
                  <span className="portrait-shine" aria-hidden />
                </div>

                {/* floating "open to work" badge */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.15, duration: 0.6 }}
                  className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-base-elevated/90 px-4 py-2 text-xs font-semibold text-ink shadow-xl shadow-black/40 backdrop-blur-md"
                >
                  <span className="h-2 w-2 rounded-full bg-aurora-emerald animate-pulse" />
                  Open to opportunities
                </motion.div>

                {/* floating name chip */}
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.3, duration: 0.6 }}
                  className="absolute -left-3 top-6 hidden rounded-2xl border border-white/10 bg-base-elevated/90 px-3 py-2 text-left shadow-lg shadow-black/40 backdrop-blur-md sm:block"
                >
                  <div className="font-display text-sm font-extrabold text-gradient">
                    {personal.firstName} {personal.lastName}
                  </div>
                  <div className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                    B.Tech · CSE
                  </div>
                </motion.div>
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
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-slate-400 sm:flex"
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
