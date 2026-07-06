'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects, type Project } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';
import Tilt3D from '@/components/ui/Tilt3D';

/* A live, scaled-down preview of the real deployed site inside a browser frame.
   The whole frame is a link that opens the project. */
function LivePreview({ project }: { project: Project }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <a
      href={project.url}
      className="group/preview relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-base-surface shadow-lg"
      aria-label={`Open ${project.name} live site`}
    >
      {/* browser chrome */}
      <div className="absolute inset-x-0 top-0 z-20 flex h-8 items-center gap-1.5 border-b border-white/10 bg-base-elevated/90 px-3 backdrop-blur">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-500">
          {project.url.replace('https://', '')}
        </span>
      </div>

      {/* loading shimmer */}
      {!loaded && (
        <div
          className="absolute inset-0 z-10 animate-pulse"
          style={{ background: `linear-gradient(135deg, ${project.accentSoft}, transparent)` }}
        />
      )}

      {/* the actual live site, scaled to fit as a "small" preview */}
      <div className="absolute inset-0 top-8 origin-top-left">
        <iframe
          src={project.url}
          title={`${project.name} live preview`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin"
          className="pointer-events-none h-[200%] w-[200%] origin-top-left scale-[0.5] border-0"
        />
      </div>

      {/* hover veil + open cue */}
      <div className="absolute inset-0 top-8 z-20 flex items-end justify-center bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/preview:opacity-100">
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-base-elevated/95 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          Step inside
          <span aria-hidden>↗</span>
        </span>
      </div>
    </a>
  );
}

/* One pinned panel. It holds the screen while you read, then sinks into the
   depth (scales down, dims, tips back) as the next world slides over it. */
function ProjectPanel({
  project,
  index,
  total,
}: {
  project: Project;
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const isLast = index === total - 1;
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.9]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, isLast ? 0 : 7]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.55]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  const reversed = index % 2 === 1;

  return (
    <div ref={ref} className={isLast ? 'relative' : 'relative mb-[12vh]'}>
      <motion.div
        style={{ scale, rotateX, filter, transformPerspective: 1400 }}
        className="sticky top-24"
      >
        <div className="glass-strong card-glow relative overflow-hidden rounded-[2.2rem] p-6 sm:p-10">
          {/* accent nebula inside the panel */}
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{ background: `radial-gradient(circle, ${project.accent}, transparent 70%)` }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full opacity-25 blur-3xl"
            style={{ background: 'radial-gradient(circle, #8b5cf6, transparent 70%)' }}
            aria-hidden
          />

          <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* live preview in a tilting frame */}
            <div className={reversed ? 'lg:order-2' : ''}>
              <Tilt3D maxTilt={7}>
                <div className="relative">
                  <div
                    className="absolute -inset-4 -z-10 rounded-[2rem] opacity-60 blur-2xl"
                    style={{
                      background: `radial-gradient(circle at 50% 50%, ${project.accent}, transparent 70%)`,
                    }}
                    aria-hidden
                  />
                  <LivePreview project={project} />
                </div>
              </Tilt3D>
            </div>

            {/* details */}
            <div className={reversed ? 'lg:order-1' : ''}>
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="grid h-12 w-12 place-items-center rounded-2xl font-display text-lg font-extrabold text-white"
                  style={{ background: `linear-gradient(135deg, ${project.accent}, #8b5cf6)` }}
                >
                  {project.name[0]}
                </span>
                <span className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  World 0{index + 1} · Live & explorable
                </span>
              </div>

              <h3 className="font-display text-3xl font-extrabold tracking-tight md:text-4xl">
                {project.name}
              </h3>
              <p className="mt-1 text-lg font-medium" style={{ color: project.accent }}>
                {project.blurb}
              </p>
              <p className="mt-4 max-w-lg text-slate-600">{project.description}</p>

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                    <span className="mt-0.5 shrink-0" style={{ color: project.accent }}>
                      ◆
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="chip text-slate-600">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={project.url}
                  className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:-translate-y-0.5"
                  style={{ background: `linear-gradient(110deg, ${project.accent}, #8b5cf6)` }}
                >
                  Visit live site
                  <span aria-hidden>↗</span>
                </a>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                >
                  Open in new tab
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* spacer that gives each pinned panel its reading time */}
      {!isLast && <div className="h-[46vh]" aria-hidden />}
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
      <SectionHeading eyebrow="Selected work" title="Worlds I've built —" highlight="step inside">
        These aren&apos;t screenshots. Each panel is the real, deployed product running live — scroll
        through and try them.
      </SectionHeading>

      <div className="mt-20">
        {projects.map((p, i) => (
          <ProjectPanel key={p.name} project={p} index={i} total={projects.length} />
        ))}
      </div>
    </section>
  );
}
