'use client';

import { motion } from 'framer-motion';
import { personal, stats } from '@/lib/data';
import Counter from '@/components/ui/Counter';
import SectionHeading from '@/components/ui/SectionHeading';

export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
      <SectionHeading eyebrow="Who I am" title="A developer who" highlight="ships outcomes">
        Not just code on a screen — software that gets designed, built, deployed and actually used.
      </SectionHeading>

      <div className="mt-16 grid gap-6 lg:grid-cols-5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="glass relative overflow-hidden rounded-3xl p-8 lg:col-span-3"
        >
          <div
            className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl"
            style={{ background: 'radial-gradient(circle,#8b5cf6,transparent)' }}
            aria-hidden
          />
          <p className="text-xl font-medium leading-relaxed text-slate-700">
            {personal.about}
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {['End-to-end delivery', 'Product thinking', 'Clean engineering', 'Business analysis'].map(
              (t) => (
                <span key={t} className="chip text-slate-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-aurora-cyan" />
                  {t}
                </span>
              ),
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 gap-4 lg:col-span-2"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              whileHover={{ y: -6, scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
              className="card-glow glass flex flex-col justify-between rounded-3xl p-6"
            >
              <div className="font-display text-4xl font-extrabold text-gradient-cool">
                <Counter value={s.value} suffix={s.suffix} plain={'plain' in s ? s.plain : false} />
              </div>
              <div className="mt-2 text-sm font-medium text-slate-500">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
