'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { personal, socials } from '@/lib/data';
import MagneticButton from '@/components/ui/MagneticButton';
import Tilt3D from '@/components/ui/Tilt3D';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * The finale — the camera in the world behind sails into a glowing portal,
 * and this panel is what's on the other side: the invitation. It grows out
 * of the depth as you approach, ringed by slowly turning halos.
 */
export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] });
  // approach through the portal: scale + straighten out of the depth
  const scale = useTransform(scrollYProgress, [0, 1], [0.78, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [16, 0]);
  const radius = useTransform(scrollYProgress, [0, 1], [64, 0]);

  return (
    <section id="contact" ref={ref} className="relative px-0 pt-10 md:pt-16" style={{ perspective: 1600 }}>
      <motion.div
        style={{ scale, rotateX, borderRadius: radius, transformStyle: 'preserve-3d' }}
        className="cta-gradient relative mx-auto flex min-h-[100svh] w-full max-w-[1600px] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center text-white"
      >
        {/* portal halos — slow counter-rotating rings around the invitation */}
        <span className="portal-halo portal-halo--1" aria-hidden />
        <span className="portal-halo portal-halo--2" aria-hidden />

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
            You made it through the universe
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 40, rotateX: -30 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            style={{ transformStyle: 'preserve-3d' }}
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
            <MagneticButton
              href={`mailto:${personal.email}`}
              className="!bg-white !text-indigo-600 shadow-xl shadow-indigo-900/20"
              variant="ghost"
            >
              {personal.email}
              <span aria-hidden>✦</span>
            </MagneticButton>
            <MagneticButton
              href="https://github.com/Biswadipgoj"
              target="_blank"
              rel="noreferrer"
              variant="ghost"
              className="!border !border-white/60 !bg-white/10 !text-white backdrop-blur"
            >
              View GitHub
            </MagneticButton>
          </motion.div>

          <div className="mx-auto mt-14 grid max-w-2xl gap-4 sm:grid-cols-3">
            {socials.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30, rotateX: 24 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease: EASE }}
              >
                <Tilt3D maxTilt={10}>
                  <a
                    href={s.url}
                    target={s.url.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="block h-full rounded-2xl border border-white/30 bg-white/10 px-4 py-4 text-left backdrop-blur transition-colors hover:bg-white/20"
                  >
                    <div className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      {s.label}
                    </div>
                    <div className="mt-1 truncate text-sm font-medium text-white">{s.handle}</div>
                  </a>
                </Tilt3D>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
