'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { personal, facts } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import Tilt3D from '@/components/ui/Tilt3D';

/**
 * Beat two of the journey — meet the traveler. The portrait floats as a
 * holo-card on one side; the manifesto and story-facts rise out of the
 * world on the other, every tile pointer-reactive.
 */
export default function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
      <SectionHeading eyebrow="Who I am" title="A developer who" highlight="ships outcomes">
        Not just code on a screen — software that gets designed, built, deployed and actually used.
      </SectionHeading>

      <div className="mt-20 grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
        {/* portrait holo-card — every screen size gets to meet me */}
        <motion.div
          initial={{ opacity: 0, rotateY: -28, x: -60 }}
          whileInView={{ opacity: 1, rotateY: 0, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: 'preserve-3d' }}
          className="hero-portrait relative mx-auto w-full max-w-[17rem] sm:max-w-[19rem]"
        >
          <span className="portrait-aurora" aria-hidden />
          <span className="holo-ring holo-ring--1" aria-hidden />
          <span className="holo-ring holo-ring--2" aria-hidden />
          <span className="portrait-orb portrait-orb--cyan" aria-hidden />
          <span className="portrait-orb portrait-orb--violet" aria-hidden />
          <span className="portrait-orb portrait-orb--pink" aria-hidden />
          <div className="portrait-breathe">
            <Tilt3D maxTilt={10} glare={false} lift={false}>
              <div className="portrait-card group relative aspect-[4/5] w-full">
                <span className="portrait-border" aria-hidden />
                <div className="portrait-media relative h-full w-full overflow-hidden rounded-[1.65rem]">
                  <Image
                    src="/biswodip.png"
                    alt={`${personal.name} — ${personal.role}`}
                    fill
                    sizes="(max-width: 1024px) 76vw, 304px"
                    className="object-cover object-top transition-transform duration-700 will-change-transform group-hover:scale-[1.05]"
                  />
                  <span className="portrait-wash" aria-hidden />
                  <span className="portrait-shine" aria-hidden />
                </div>
                <div className="absolute -left-3 top-6 rounded-2xl border border-white/10 bg-base-elevated/90 px-3 py-2 text-left shadow-lg shadow-black/40 backdrop-blur-md">
                  <div className="font-display text-sm font-extrabold text-gradient">
                    {personal.firstName} {personal.lastName}
                  </div>
                  <div className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-slate-400">
                    {personal.location.split(',')[0]} · India
                  </div>
                </div>
                <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-white/10 bg-base-elevated/90 px-4 py-2 text-xs font-semibold text-ink shadow-xl shadow-black/40 backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-aurora-emerald animate-pulse" />
                  Open to opportunities
                </div>
              </div>
            </Tilt3D>
          </div>
        </motion.div>

        {/* manifesto + story-facts */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 40, rotateX: 12 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Tilt3D maxTilt={4}>
              <div className="glass relative overflow-hidden rounded-3xl p-8">
                <div
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-40 blur-3xl"
                  style={{ background: 'radial-gradient(circle,#8b5cf6,transparent)' }}
                  aria-hidden
                />
                <p className="text-lg font-medium leading-relaxed text-slate-700 sm:text-xl">
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
              </div>
            </Tilt3D>
          </motion.div>

          {/* story-facts told in full — figure, headline, and the punchline */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {facts.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 30, rotateX: 20 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt3D maxTilt={7}>
                  <div className="card-glow glass flex h-full flex-col justify-between rounded-3xl p-6">
                    <div className="font-display text-4xl font-extrabold text-gradient-cool">
                      {f.figure}
                    </div>
                    <div className="mt-2 text-sm font-semibold text-ink">{f.label}</div>
                    <div className="mt-1 text-xs text-slate-500">{f.detail}</div>
                  </div>
                </Tilt3D>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
