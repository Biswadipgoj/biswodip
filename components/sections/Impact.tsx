'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { impacts } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import { RevealGroup, revealItem } from '@/components/ui/Reveal';

/**
 * SCENE 5 — Impact / Value.
 *
 * The "why it matters" beat before the final CTA: a band of animated value
 * highlights that stagger in, lift + glow on hover, and ride a parallaxing
 * accent line as the scene scrolls through.
 */
export default function Impact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const lineX = useTransform(scrollYProgress, [0, 1], ['-6%', '6%']);

  return (
    <section id="impact" ref={ref} className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
      <SectionHeading eyebrow="Why it matters" title="Software that moves" highlight="the needle">
        Not pixels for their own sake — outcomes. Here&apos;s the value I bring to every build.
      </SectionHeading>

      {/* drifting gradient accent line */}
      <motion.div style={{ x: lineX }} className="mx-auto mt-10 h-1 w-40 rounded-full" aria-hidden>
        <div
          className="h-full w-full rounded-full"
          style={{ background: 'linear-gradient(90deg,#22d3ee,#8b5cf6,#f472b6)' }}
        />
      </motion.div>

      <RevealGroup className="mt-16 grid gap-6 md:grid-cols-3">
        {impacts.map((item) => (
          <motion.article
            key={item.title}
            variants={revealItem}
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            className="card-glow glass group relative overflow-hidden rounded-3xl p-8"
          >
            {/* corner color glow that blooms on hover */}
            <div
              className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
              style={{ background: `radial-gradient(circle, ${item.accent}, transparent 70%)` }}
              aria-hidden
            />

            <div
              className="font-display text-5xl font-extrabold tracking-tight"
              style={{ color: item.accent }}
            >
              {item.metric}
            </div>
            <h3 className="mt-5 font-display text-xl font-bold text-ink">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.body}</p>

            <span
              className="mt-6 block h-1 w-12 rounded-full transition-all duration-500 group-hover:w-24"
              style={{ background: item.accent }}
              aria-hidden
            />
          </motion.article>
        ))}
      </RevealGroup>
    </section>
  );
}
