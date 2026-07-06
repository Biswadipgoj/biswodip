'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { impacts } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import Tilt3D from '@/components/ui/Tilt3D';

/**
 * The "why it matters" beat: three value cards fan out of the depth like
 * panels unfolding in space — each tilts toward the pointer and blooms
 * with its own accent light.
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

      <div className="mt-16 grid gap-6 md:grid-cols-3" style={{ perspective: 1400 }}>
        {impacts.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, rotateY: i === 0 ? -32 : i === 2 ? 32 : 0, y: 60, z: -120 }}
            whileInView={{ opacity: 1, rotateY: 0, y: 0, z: 0 }}
            viewport={{ once: true, margin: '-70px' }}
            transition={{ duration: 0.85, delay: i * 0.14, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <Tilt3D maxTilt={9}>
              <article className="card-glow glass group relative h-full overflow-hidden rounded-3xl p-8">
                {/* corner color glow that blooms on hover */}
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-50 blur-3xl transition-opacity duration-500 group-hover:opacity-90"
                  style={{ background: `radial-gradient(circle, ${item.accent}, transparent 70%)` }}
                  aria-hidden
                />

                <div
                  className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl"
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
              </article>
            </Tilt3D>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
