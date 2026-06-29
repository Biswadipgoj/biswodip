'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { projects, type Project } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';

/* A live, scaled-down preview of the real deployed site inside a browser frame.
   The whole frame is a link that opens the project in the same tab. */
function LivePreview({ project }: { project: Project }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <a
      href={project.url}
      className="card-glow group/preview relative block aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/70 bg-white shadow-lg"
      aria-label={`Open ${project.name} live site`}
    >
      {/* browser chrome */}
      <div className="absolute inset-x-0 top-0 z-20 flex h-8 items-center gap-1.5 border-b border-slate-200/70 bg-white/90 px-3 backdrop-blur">
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
        <span className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/95 px-4 py-2 text-sm font-semibold text-ink shadow-lg">
          Open live site
          <span aria-hidden>↗</span>
        </span>
      </div>
    </a>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  function onMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: py * -6, y: px * 6 });
  }

  const reversed = index % 2 === 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7 }}
      className="grid items-center gap-8 lg:grid-cols-2"
    >
      {/* live preview with 3D tilt */}
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        whileHover={{ scale: 1.015 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
        className={`relative ${reversed ? 'lg:order-2' : ''}`}
      >
        <div
          className="absolute -inset-4 -z-10 rounded-[2rem] opacity-60 blur-2xl"
          style={{ background: `radial-gradient(circle at 50% 50%, ${project.accent}, transparent 70%)` }}
          aria-hidden
        />
        <LivePreview project={project} />
      </motion.div>

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
            0{index + 1} · Live project
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
            className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            Open in new tab
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
      <SectionHeading eyebrow="Selected work" title="Real products," highlight="really shipped">
        Two of the 15+ solutions I&apos;ve delivered — live, deployed and explorable right here.
      </SectionHeading>

      <div className="mt-20 space-y-28">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
