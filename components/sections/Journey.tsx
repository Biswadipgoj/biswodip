'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { journey } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import Tilt3D from '@/components/ui/Tilt3D';

/**
 * The warp corridor — the road so far, told as waypoints emerging from the
 * depth of the world. The spine draws itself as you travel, and each stop
 * swings in from its own side with true 3D rotation.
 */
export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.5'] });
  const spine = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });
  const spineScale = useTransform(spine, [0, 1], [0, 1]);

  return (
    <section id="journey" className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
      <SectionHeading eyebrow="The road so far" title="From first commit to" highlight="shipping at scale">
        A short story of how curiosity turned into a discipline for delivering software.
      </SectionHeading>

      <div ref={ref} className="relative mt-20" style={{ perspective: 1400 }}>
        {/* the spine — drawn by your own scroll */}
        <div
          className="absolute left-4 top-0 h-full w-0.5 bg-white/10 md:left-1/2 md:-translate-x-1/2"
          aria-hidden
        />
        <motion.div
          className="absolute left-4 top-0 h-full w-0.5 origin-top md:left-1/2 md:-translate-x-1/2"
          style={{
            scaleY: spineScale,
            background: 'linear-gradient(180deg,#22d3ee,#8b5cf6,#34d399,#fbbf24)',
            boxShadow: '0 0 24px rgba(139,92,246,0.5)',
          }}
          aria-hidden
        />

        <div className="space-y-16">
          {journey.map((step, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={step.year}
                initial={{
                  opacity: 0,
                  x: left ? -70 : 70,
                  rotateY: left ? 24 : -24,
                  z: -140,
                }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0, z: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformStyle: 'preserve-3d' }}
                className={`relative flex flex-col pl-12 md:w-1/2 md:pl-0 ${
                  left ? 'md:pr-14 md:text-right' : 'md:ml-auto md:pl-14'
                }`}
              >
                {/* waypoint node — pulses like a small star on the spine */}
                <span
                  className={`absolute left-4 top-6 z-10 h-4 w-4 -translate-x-1/2 rounded-full ring-4 ring-base md:left-auto ${
                    left ? 'md:-right-2 md:translate-x-1/2' : 'md:-left-2 md:-translate-x-1/2'
                  }`}
                  style={{ background: step.accent, boxShadow: `0 0 20px ${step.accent}` }}
                  aria-hidden
                >
                  <span
                    className="absolute inset-0 animate-ping rounded-full opacity-40"
                    style={{ background: step.accent }}
                  />
                </span>

                <Tilt3D maxTilt={6}>
                  <div className="glass card-glow rounded-3xl p-6">
                    <span className="font-display text-sm font-extrabold" style={{ color: step.accent }}>
                      {step.year}
                    </span>
                    <h3 className="mt-1 font-display text-xl font-bold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-600">{step.body}</p>
                  </div>
                </Tilt3D>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
