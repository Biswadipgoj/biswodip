'use client';

import { motion } from 'framer-motion';
import { personal, socials } from '@/lib/data';
import MagneticButton from '@/components/ui/MagneticButton';

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7 }}
        className="glass-strong relative overflow-hidden rounded-[2.5rem] px-6 py-20 text-center md:py-28"
      >
        <div
          className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(circle,#22d3ee,transparent 70%)' }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -right-20 h-72 w-72 rounded-full opacity-50 blur-3xl"
          style={{ background: 'radial-gradient(circle,#f472b6,transparent 70%)' }}
          aria-hidden
        />

        <div className="relative">
          <div className="section-eyebrow mx-auto mb-6">Let&apos;s build</div>
          <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] font-extrabold leading-[1.02] tracking-tight">
            Have an idea worth <br className="hidden sm:block" />
            <span className="text-gradient">shipping?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-lg text-slate-600">
            I&apos;m open to freelance builds, product collaborations and business-analyst roles.
            Tell me what you&apos;re making — I&apos;ll help you ship it.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton href={`mailto:${personal.email}`}>
              {personal.email}
              <span aria-hidden>✦</span>
            </MagneticButton>
            <MagneticButton variant="ghost" href="https://github.com/Biswadipgoj" target="_blank" rel="noreferrer">
              View GitHub
            </MagneticButton>
          </div>

          <div className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target={s.url.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="glass rounded-2xl px-4 py-4 text-left transition-transform hover:-translate-y-1"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  {s.label}
                </div>
                <div className="mt-1 truncate text-sm font-medium text-ink">{s.handle}</div>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
