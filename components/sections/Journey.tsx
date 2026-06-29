'use client';

import { motion } from 'framer-motion';
import { journey } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';

export default function Journey() {
  return (
    <section id="journey" className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
      <SectionHeading eyebrow="The road so far" title="From first commit to" highlight="shipping at scale">
        A short story of how curiosity turned into a discipline for delivering software.
      </SectionHeading>

      <div className="relative mt-20">
        {/* central glowing spine */}
        <div
          className="absolute left-4 top-0 h-full w-0.5 md:left-1/2 md:-translate-x-1/2"
          style={{
            background: 'linear-gradient(180deg,#22d3ee,#8b5cf6,#34d399,#fbbf24)',
            boxShadow: '0 0 24px rgba(139,92,246,0.5)',
          }}
          aria-hidden
        />

        <div className="space-y-12">
          {journey.map((step, i) => {
            const left = i % 2 === 0;
            return (
              <motion.div
                key={step.year}
                initial={{ opacity: 0, x: left ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6 }}
                className={`relative flex flex-col pl-12 md:w-1/2 md:pl-0 ${
                  left ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'
                }`}
              >
                {/* node */}
                <span
                  className={`absolute left-4 top-2 z-10 h-4 w-4 -translate-x-1/2 rounded-full ring-4 ring-white md:left-auto ${
                    left ? 'md:-right-2 md:translate-x-1/2' : 'md:-left-2 md:-translate-x-1/2'
                  }`}
                  style={{ background: step.accent, boxShadow: `0 0 20px ${step.accent}` }}
                  aria-hidden
                />
                <div className="glass rounded-3xl p-6">
                  <span
                    className="font-display text-sm font-extrabold"
                    style={{ color: step.accent }}
                  >
                    {step.year}
                  </span>
                  <h3 className="mt-1 font-display text-xl font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{step.body}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
