'use client';

import { motion } from 'framer-motion';
import { skillGroups } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import { RevealGroup, revealItem } from '@/components/ui/Reveal';

const marqueeItems = [
  'Next.js',
  'TypeScript',
  'React',
  'Three.js',
  'Tailwind',
  'Node.js',
  'GSAP',
  'Framer Motion',
  'GLSL',
  'Python',
  'REST',
  'Vercel',
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading eyebrow="Capabilities" title="The stack behind" highlight="the ship">
          A toolkit tuned for building fast, looking premium and holding up in production.
        </SectionHeading>

        <RevealGroup stagger={0.12} className="mt-16 grid gap-6 md:grid-cols-3">
          {skillGroups.map((group) => (
            <motion.div
              key={group.title}
              variants={revealItem}
              whileHover={{ y: -8, scale: 1.025 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="card-glow glass rounded-3xl p-7"
            >
              <div
                className={`mb-6 inline-block rounded-full bg-gradient-to-r ${group.tint} bg-clip-text px-1 font-display text-lg font-bold text-transparent`}
              >
                {group.title}
              </div>
              <div className="space-y-5">
                {group.skills.map((skill, si) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="font-medium text-slate-700">{skill.name}</span>
                      <span className="text-xs font-semibold text-slate-400">{skill.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-200/70">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + si * 0.08, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
                          boxShadow: `0 0 16px ${skill.color}80`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </RevealGroup>
      </div>

      {/* tech marquee ribbon */}
      <div className="relative mt-16 flex overflow-hidden py-4">
        <div className="flex shrink-0 animate-marquee items-center gap-8 whitespace-nowrap pr-8">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={item + i}
              className="font-display text-2xl font-bold text-slate-400/70 md:text-3xl"
            >
              {item}
              <span className="mx-4 text-aurora-violet">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
