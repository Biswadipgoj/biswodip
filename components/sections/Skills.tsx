'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { constellation, shipped } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import Tilt3D from '@/components/ui/Tilt3D';

/**
 * THE ORBIT — skills as a living constellation.
 *
 * No bars, no percentages, no spec sheets. Every craft is a star in one of
 * three orbits around the core; pick any star (in the system or the cards)
 * and the core tells you how that tool and I get along.
 */

/* ring radii as a % of the system's half-width */
const RING_RADII = [30, 44, 58];
const RING_DURATIONS = [36, 52, 70];

export default function Skills() {
  const [active, setActive] = useState<[number, number]>([0, 0]);
  const activeCraft = constellation[active[0]].crafts[active[1]];

  return (
    <section id="skills" className="relative overflow-hidden py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="The orbit" title="Every craft is a star" highlight="in this system">
          Skip the spec sheet. Hover the stars — each one tells you how that tool and I actually
          get along.
        </SectionHeading>

        <div className="mt-20 grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* -------------------------------------------------------------- */}
          {/* The orbital system                                             */}
          {/* -------------------------------------------------------------- */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateX: 18 }}
            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
            className="orbit-system relative mx-auto aspect-square w-[min(88vw,34rem)]"
          >
            {/* the core — reflects whichever star is chosen */}
            <div className="absolute left-1/2 top-1/2 z-10 w-[11rem] -translate-x-1/2 -translate-y-1/2 text-center sm:w-[13rem]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCraft.name}
                  initial={{ opacity: 0, scale: 0.85, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="glass-strong rounded-3xl px-4 py-5"
                  style={{ boxShadow: `0 0 60px -12px ${activeCraft.color}90` }}
                >
                  <div
                    className="mx-auto mb-2 h-2.5 w-2.5 rounded-full"
                    style={{ background: activeCraft.color, boxShadow: `0 0 16px ${activeCraft.color}` }}
                    aria-hidden
                  />
                  <div className="font-display text-base font-extrabold text-ink sm:text-lg">
                    {activeCraft.name}
                  </div>
                  <p className="mt-1.5 text-[0.72rem] leading-snug text-slate-500 sm:text-xs">
                    {activeCraft.vibe}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* the rings + orbiting stars */}
            {constellation.map((orbit, oi) => {
              const radius = RING_RADII[oi];
              return (
                <div key={orbit.ring}>
                  {/* ring line */}
                  <div
                    className="absolute left-1/2 top-1/2 rounded-full border border-white/10"
                    style={{
                      width: `${radius * 2}%`,
                      height: `${radius * 2}%`,
                      transform: 'translate(-50%, -50%)',
                      boxShadow: 'inset 0 0 30px rgba(139,92,246,0.06)',
                    }}
                    aria-hidden
                  />
                  {/* rotating carrier (transparent to the pointer; only stars are hot) */}
                  <div
                    className="orbit-carrier pointer-events-none absolute inset-0"
                    style={{
                      animationDuration: `${RING_DURATIONS[oi]}s`,
                      animationDirection: oi % 2 ? 'reverse' : 'normal',
                    }}
                  >
                    {orbit.crafts.map((craft, ci) => {
                      const angle = ((360 / orbit.crafts.length) * ci + oi * 30) * (Math.PI / 180);
                      const isActive = active[0] === oi && active[1] === ci;
                      return (
                        <div
                          key={craft.name}
                          className="absolute"
                          style={{
                            left: `${50 + radius * Math.cos(angle)}%`,
                            top: `${50 + radius * Math.sin(angle)}%`,
                          }}
                        >
                          {/* counter-rotate so the star stays upright */}
                          <div
                            className="orbit-node"
                            style={{
                              animationDuration: `${RING_DURATIONS[oi]}s`,
                              animationDirection: oi % 2 ? 'normal' : 'reverse',
                            }}
                          >
                            <button
                              type="button"
                              onMouseEnter={() => setActive([oi, ci])}
                              onFocus={() => setActive([oi, ci])}
                              onClick={() => setActive([oi, ci])}
                              className={`group pointer-events-auto relative -translate-x-1/2 -translate-y-1/2 rounded-full p-2 outline-none transition-transform duration-300 ${
                                isActive ? 'scale-125' : 'hover:scale-110'
                              }`}
                              aria-label={`${craft.name} — ${craft.vibe}`}
                            >
                              <span
                                className="block h-3.5 w-3.5 rounded-full transition-shadow duration-300 sm:h-4 sm:w-4"
                                style={{
                                  background: craft.color,
                                  boxShadow: isActive
                                    ? `0 0 22px 5px ${craft.color}b0`
                                    : `0 0 12px 2px ${craft.color}70`,
                                }}
                              />
                              <span
                                className={`pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-base-elevated/95 px-2.5 py-1 text-[0.62rem] font-semibold backdrop-blur transition-opacity duration-300 ${
                                  isActive ? 'opacity-100 text-ink' : 'opacity-0 group-hover:opacity-100 text-slate-500'
                                }`}
                              >
                                {craft.name}
                              </span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </motion.div>

          {/* -------------------------------------------------------------- */}
          {/* Orbit legends — three cards, one per ring                       */}
          {/* -------------------------------------------------------------- */}
          <div className="space-y-5">
            {constellation.map((orbit, oi) => (
              <motion.div
                key={orbit.ring}
                initial={{ opacity: 0, x: 60, rotateY: -14 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: oi * 0.12, ease: [0.22, 1, 0.36, 1] }}
              >
                <Tilt3D maxTilt={5}>
                  <div className="glass card-glow rounded-3xl p-6">
                    <div
                      className={`inline-block bg-gradient-to-r ${orbit.tint} bg-clip-text font-display text-lg font-bold text-transparent`}
                    >
                      {orbit.ring}
                    </div>
                    <p className="mt-1 text-xs text-slate-400">{orbit.caption}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {orbit.crafts.map((craft, ci) => {
                        const isActive = active[0] === oi && active[1] === ci;
                        return (
                          <button
                            key={craft.name}
                            type="button"
                            onMouseEnter={() => setActive([oi, ci])}
                            onClick={() => setActive([oi, ci])}
                            className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all duration-300 ${
                              isActive
                                ? 'border-transparent text-ink'
                                : 'border-white/10 bg-white/[0.03] text-slate-500 hover:text-ink'
                            }`}
                            style={
                              isActive
                                ? { background: `${craft.color}26`, boxShadow: `0 0 18px -4px ${craft.color}` }
                                : undefined
                            }
                          >
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ background: craft.color, boxShadow: `0 0 8px ${craft.color}` }}
                            />
                            {craft.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </Tilt3D>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* what all of it ships — a ribbon of outcomes, not a parts list */}
      <div className="relative mt-20 flex overflow-hidden py-4" aria-hidden>
        <div className="flex shrink-0 animate-marquee items-center gap-8 whitespace-nowrap pr-8">
          {[...shipped, ...shipped].map((item, i) => (
            <span key={item + i} className="font-display text-2xl font-bold text-slate-400/70 md:text-3xl">
              {item}
              <span className="mx-4 text-aurora-violet">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
