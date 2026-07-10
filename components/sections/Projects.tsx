'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { projects, type Project } from '@/lib/data';
import SectionHeading from '@/components/ui/SectionHeading';

/* ------------------------------------------------------------------ */
/* Mock Telemetry Data Component                                      */
/* ------------------------------------------------------------------ */
function TelemetryOverlay({ accent, name }: { accent: string, name: string }) {
  const [logs, setLogs] = useState<string[]>([`> INIT SYSTEM [${name.toUpperCase()}]`]);
  
  useEffect(() => {
    const commands = [
      `> FETCHING METRICS...`,
      `> COMPILING BUNDLE...`,
      `> DEPLOYMENT SUCCESS`,
      `> LATENCY: 24ms`,
      `> ALL SYSTEMS GO.`
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < commands.length) {
        setLogs(prev => [...prev.slice(-3), commands[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, [name]);

  return (
    <div className="absolute right-4 bottom-4 z-30 w-48 rounded-lg border border-white/10 bg-[#0d1018]/90 p-3 backdrop-blur-md shadow-2xl overflow-hidden hidden sm:block">
      <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/5">
        <span className="font-mono text-[0.55rem] text-slate-400 uppercase tracking-widest">SYS.MONITOR</span>
        <span className="flex h-1.5 w-1.5 rounded-full bg-aurora-emerald animate-pulse" />
      </div>
      <div className="space-y-1">
        {logs.map((log, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-mono text-[0.6rem] text-white/70"
            style={{ color: idx === logs.length - 1 ? accent : 'rgba(255,255,255,0.5)' }}
          >
            {log}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Holographic Preview Interface                                      */
/* ------------------------------------------------------------------ */
function LivePreview({ project }: { project: Project }) {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <a
      href={project.url}
      className="group/preview relative block aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-[#080a10] shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      aria-label={`Open ${project.name} live site`}
    >
      {/* Sci-fi UI Chrome */}
      <div className="absolute inset-x-0 top-0 z-20 flex h-9 items-center justify-between border-b border-white/10 bg-[#0d1018]/95 px-4 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-8 rounded-sm bg-white/10 group-hover/preview:bg-white/20 transition-colors" />
            <span className="h-2.5 w-2.5 rounded-sm bg-white/10 group-hover/preview:bg-white/20 transition-colors" />
          </div>
          <span className="font-mono text-[0.65rem] font-semibold tracking-widest text-white/70 uppercase">
            {project.name} // LIVE_ENV
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: project.accent }} />
          <span className="font-mono text-[0.55rem] tracking-[0.2em]" style={{ color: project.accent }}>ONLINE</span>
        </div>
      </div>

      {/* Crosshairs & Borders */}
      <div className="absolute top-9 left-0 w-2 h-2 border-t-2 border-l-2 border-white/20 z-20" />
      <div className="absolute top-9 right-0 w-2 h-2 border-t-2 border-r-2 border-white/20 z-20" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-white/20 z-20" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-white/20 z-20" />

      {/* Loading shimmer */}
      {!loaded && (
        <div
          className="absolute inset-0 z-10 animate-pulse"
          style={{ background: `radial-gradient(circle at center, ${project.accentSoft} 0%, transparent 70%)` }}
        />
      )}

      {/* The actual live site or image fallback */}
      <div className="absolute inset-0 top-9 origin-top-left">
        {project.previewImage ? (
          <img
            src={project.previewImage}
            alt={`${project.name} live preview`}
            onLoad={() => setLoaded(true)}
            className="w-full h-full object-cover object-top opacity-90 group-hover/preview:opacity-100 transition-opacity"
          />
        ) : (
          <iframe
            src={project.url}
            title={`${project.name} live preview`}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            referrerPolicy="no-referrer"
            sandbox="allow-scripts allow-same-origin"
            className="pointer-events-none h-[200%] w-[200%] origin-top-left scale-[0.5] border-0 filter opacity-90 group-hover/preview:opacity-100 transition-opacity"
          />
        )}
        
        {/* Holographic Scanline Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none opacity-20"
             style={{ background: 'linear-gradient(to bottom, transparent 50%, rgba(255,255,255,0.1) 51%, transparent 51%)', backgroundSize: '100% 4px' }} />
      </div>

      {/* Dynamic Telemetry Widget */}
      <TelemetryOverlay accent={project.accent} name={project.name} />

      {/* Hover action veil */}
      <div className="absolute inset-0 top-9 z-40 flex items-center justify-center bg-black/60 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover/preview:opacity-100">
        <div className="translate-y-4 transition-transform duration-300 group-hover/preview:translate-y-0">
          <span className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-[#0d1018]/90 px-6 py-3 text-sm font-bold text-white shadow-[0_0_30px_rgba(0,0,0,0.8)] backdrop-blur-md"
                style={{ boxShadow: `0 0 20px ${project.accentSoft}, inset 0 0 0 1px ${project.accent}55` }}>
            <span className="font-mono tracking-widest text-[0.65rem] uppercase text-aurora-cyan">Execute Launch</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-aurora-cyan">
               <path d="M5 12h14"></path><path d="M12 5l7 7-7 7"></path>
            </svg>
          </span>
        </div>
      </div>
    </a>
  );
}

/* ------------------------------------------------------------------ */
/* Project Panel — Immersive Data Card                                */
/* ------------------------------------------------------------------ */
function ProjectPanel({ project, index, total }: { project: Project; index: number; total: number }) {
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
        <div className="relative overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#0a0c12]/95 p-6 sm:p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,1)] backdrop-blur-2xl">
          
          {/* Accent nebula inside the panel */}
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-[0.15] blur-[80px]"
            style={{ background: `radial-gradient(circle, ${project.accent}, transparent 70%)` }}
            aria-hidden
          />

          {/* Grid pattern background */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
               style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          <div className={`relative z-10 grid items-center gap-12 lg:grid-cols-2 ${reversed ? 'lg:grid-flow-col-dense' : ''}`}>
            
            {/* ── Content side ── */}
            <div className={reversed ? 'lg:col-start-2' : ''}>
              
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: project.accent }} />
                <span className="font-mono text-[0.6rem] font-bold uppercase tracking-widest text-white/70">
                  Project_0{index + 1}
                </span>
              </div>

              <h3 className="mb-4 font-display text-4xl font-extrabold text-white sm:text-5xl tracking-tight">
                {project.name}
              </h3>
              
              <p className="mb-6 text-lg font-medium text-white/80 leading-snug">
                {project.blurb}
              </p>
              
              {/* Terminal-style description */}
              <div className="mb-8 rounded-xl border border-white/5 bg-[#080a0e] p-4 font-mono text-[0.75rem] leading-relaxed text-slate-400 shadow-inner">
                <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
                  <span className="h-2 w-2 bg-slate-600 rounded-full" />
                  <span className="text-[0.5rem] uppercase tracking-widest text-slate-500">ReadMe.txt</span>
                </div>
                <p>{project.description} <span className="inline-block h-3 w-1.5 bg-aurora-cyan animate-pulse align-middle ml-1" /></p>
              </div>

              {/* Tags & Features */}
              <div className="space-y-6">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span key={tag} className="rounded border border-white/10 bg-white/5 px-2.5 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-white/70">
                      {tag}
                    </span>
                  ))}
                </div>

                <ul className="space-y-2 border-l border-white/10 pl-4">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm text-slate-400 font-medium">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full" style={{ backgroundColor: project.accent }} />
                      <span className="leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {project.repo && (
                <div className="mt-10">
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-white transition-colors hover:text-aurora-cyan"
                  >
                    <span>[ View Source ]</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </a>
                </div>
              )}
            </div>

            {/* ── Holographic Preview side ── */}
            <div className={reversed ? 'lg:col-start-1' : ''}>
              <LivePreview project={project} />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Section                                                       */
/* ------------------------------------------------------------------ */
export default function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-28 md:py-36">
      <SectionHeading eyebrow="Deployed Systems" title="Software that" highlight="actually exists">
        No mockups. No placeholders. Every project here is live on the internet and used by real people.
      </SectionHeading>

      <div className="mt-20">
        {projects.map((project, index) => (
          <ProjectPanel
            key={project.name}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>
    </section>
  );
}
