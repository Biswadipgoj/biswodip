'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personal, socials } from '@/lib/data';

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  // the finale scales up into view like a curtain rising
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [48, 0]);

  return (
    <section id="contact" ref={ref} className="relative px-0 pt-10 md:pt-16">
      <motion.div
        style={{ scale, borderRadius: radius }}
        className="cta-gradient relative mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center text-white"
      >
        {/* floating glow accents */}
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-white/25 blur-3xl"
          animate={{ y: [0, 30, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.span
          aria-hidden
          className="pointer-events-none absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl"
          animate={{ y: [0, -36, 0], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />

        <div className="relative z-10 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] backdrop-blur"
          >
            <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
            Let&apos;s build
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE }}
            className="font-display text-[clamp(2.4rem,7vw,5rem)] font-extrabold leading-[1.02] tracking-tight drop-shadow-sm"
          >
            Have an idea worth <br className="hidden sm:block" />
            shipping?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
            className="mx-auto mt-6 max-w-xl text-lg text-white/90"
          >
            I&apos;m open to freelance builds, product collaborations and business-analyst roles.
            Tell me what you&apos;re making — I&apos;ll help you ship it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.a
              href={`mailto:${personal.email}`}
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-indigo-600 shadow-xl shadow-indigo-900/20"
            >
              {personal.email}
              <span aria-hidden>✦</span>
            </motion.a>
            <motion.a
              href="https://github.com/Biswadipgoj"
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              View GitHub
            </motion.a>
          </motion.div>

          <div className="mx-auto mt-14 grid max-w-2xl gap-4 sm:grid-cols-3">
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE }}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-white/30 bg-white/10 px-4 py-4 text-left backdrop-blur transition-colors hover:bg-white/20"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  {s.label}
                </div>
                <div className="mt-1 truncate text-sm font-medium text-white">{s.handle}</div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
