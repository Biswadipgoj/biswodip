'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { projects, type Project } from '@/lib/data';
import Image from 'next/image';
import Icon from '../ui/Icon';
import { AudioEngine } from '../ui/AudioFeedback';

const PROJECT_STACKS: Record<string, string[]> = {
  Erpixa: ['React', 'TypeScript', 'PostgreSQL', 'Tailwind CSS', 'Supabase'],
  TelePoint: ['Next.js', 'WebSockets', 'TypeScript', 'Tailwind CSS'],
  Tripmate: ['React', 'Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
  NanoLink: ['Next.js', 'Prisma', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'],
  Nexora: ['Next.js', 'TypeScript', 'Supabase', 'Tailwind CSS'],
};

const PROJECT_THEMES: Record<
  string,
  {
    gradientStyle: string;
    accent: string;
    accentSoft: string;
    category: string;
  }
> = {
  Erpixa: {
    gradientStyle: 'linear-gradient(90deg, #22d3ee 0%, #67e8f9 50%, #34d399 100%)',
    accent: '#22d3ee',
    accentSoft: 'rgba(34, 211, 238, 0.3)',
    category: 'ENTERPRISE ERP PLATFORM',
  },
  TelePoint: {
    gradientStyle: 'linear-gradient(90deg, #818cf8 0%, #a78bfa 50%, #f472b6 100%)',
    accent: '#818cf8',
    accentSoft: 'rgba(129, 140, 248, 0.3)',
    category: 'REAL-TIME WEBSOCKET HUB',
  },
  Tripmate: {
    gradientStyle: 'linear-gradient(90deg, #f472b6 0%, #fb7185 50%, #fbbf24 100%)',
    accent: '#f472b6',
    accentSoft: 'rgba(244, 114, 182, 0.3)',
    category: 'DYNAMIC TRAVEL ENGINE',
  },
  NanoLink: {
    gradientStyle: 'linear-gradient(90deg, #34d399 0%, #2dd4bf 50%, #38bdf8 100%)',
    accent: '#34d399',
    accentSoft: 'rgba(52, 211, 153, 0.3)',
    category: 'EDGE ANALYTICS SHORTENER',
  },
  Nexora: {
    gradientStyle: 'linear-gradient(90deg, #fbbf24 0%, #f59e0b 50%, #fb7185 100%)',
    accent: '#fbbf24',
    accentSoft: 'rgba(251, 191, 36, 0.3)',
    category: 'COLLABORATIVE WORKSPACE',
  },
};

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const prefersReduced = useReducedMotion();

  // Mouse tilt on center card
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const tiltX = useSpring(useTransform(mouseY, [0, 1], [5, -5]), { stiffness: 260, damping: 22 });
  const tiltY = useSpring(useTransform(mouseX, [0, 1], [-5, 5]), { stiffness: 260, damping: 22 });
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);

  const activeProject = projects[currentIndex];
  const activeTheme = PROJECT_THEMES[activeProject.name] || PROJECT_THEMES.Erpixa;

  // Scroll tracking across the 380vh scroll track
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map scroll progress (0..1) to 5 discrete projects
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const N = projects.length;
      const nextIndex = Math.min(N - 1, Math.floor(latest * N));
      if (nextIndex !== currentIndex) {
        AudioEngine.playClick();
        setCurrentIndex(nextIndex);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress, currentIndex]);

  // Measure stage width dynamically for responsive 3D trajectory
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const updateWidth = () => {
      if (el) setContainerWidth(el.clientWidth);
    };

    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Continuous auto-advancing cycle when explicitly enabled
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleNext = useCallback(() => {
    AudioEngine.playClick();
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const handlePrev = useCallback(() => {
    AudioEngine.playClick();
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev]);

  // Calculate 3D curved elliptical trajectory coordinates
  const getCardTransform = useCallback(
    (index: number) => {
      const N = projects.length;
      let p = index - currentIndex;
      while (p > N / 2) p -= N;
      while (p < -N / 2) p += N;

      const W = containerWidth;
      const isMobile = W < 768;

      const spreadX = isMobile ? W * 0.44 : W * 0.32;
      const arcY = isMobile ? 26 : 40;

      const x = p * spreadX;
      // Parabolic upward curve: side cards sit higher and turned in
      const y = -Math.pow(Math.abs(p) / 2, 1.35) * arcY;

      // Scale: 1.0 at center, drops to ~0.76 at p=1, ~0.52 at p=2
      const scale = Math.max(0.48, 1 - Math.abs(p) * 0.22);

      // Inward rotation along elliptical perimeter
      const rotZ = p * (isMobile ? 7 : 9.5);
      const rotY = -p * (isMobile ? 10 : 14); // Inward perspective angle!
      const z = -Math.abs(p) * 120;
      const opacity = Math.abs(p) > 2.2 ? 0 : Math.max(0.35, 1 - Math.abs(p) * 0.28);
      const zIndex = Math.round((4 - Math.abs(p)) * 10);

      return {
        x,
        y,
        z,
        scale,
        rotZ,
        rotY,
        opacity,
        zIndex,
        isCenter: Math.abs(p) < 0.1,
      };
    },
    [currentIndex, containerWidth]
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative w-full min-h-[380vh] bg-[#020617] text-white select-none"
    >
      {/* =========================================================================
          STICKY FULL-PAGE THEATRE STAGE (Pinned 100vh)
          The user stays in the full-page experience throughout the 380vh scroll!
         ========================================================================= */}
      <div
        ref={stageRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between pt-16 sm:pt-20 pb-5 px-3 sm:px-8 lg:px-12 z-20 bg-gradient-to-b from-[#020617] via-[#050c20] to-[#020617]"
      >
        {/* Dynamic ambient caustics that match active project */}
        <div
          className="pointer-events-none absolute top-1/4 right-1/4 w-[650px] h-[650px] rounded-full blur-[170px] transition-colors duration-700 opacity-25"
          style={{ background: activeTheme.accent }}
        />
        <div
          className="pointer-events-none absolute bottom-1/4 left-1/4 w-[650px] h-[650px] rounded-full blur-[170px] transition-colors duration-700 opacity-20"
          style={{ background: activeTheme.accent }}
        />

        {/* -------------------------------------------------------------------------
            HEADER ROW: Project Index & Orbital Controls
           ------------------------------------------------------------------------- */}
        <div className="relative z-30 max-w-7xl mx-auto w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-3 border-b border-slate-700/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span
                className="w-2.5 h-2.5 rounded-full animate-ping"
                style={{ background: activeTheme.accent }}
              />
              <span className="text-[0.68rem] sm:text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                03 / SELECTED BUILDS · EXPERIMENTAL 3D CURVED SLIDER
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight flex items-center gap-2 sm:gap-3">
              <span style={{ color: activeTheme.accent }}>0{currentIndex + 1}</span>
              <span className="text-slate-600 font-light">/</span>
              <span
                className="bg-clip-text text-transparent font-black"
                style={{
                  backgroundImage: activeTheme.gradientStyle,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {activeProject.name}
              </span>
            </h2>
          </div>

          {/* Interactive Project Indicators & Controls */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              id="project-btn-prev"
              onClick={handlePrev}
              type="button"
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 transition-colors flex items-center gap-1 shadow-sm"
              title="Previous project (←)"
            >
              <span>←</span>
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* Direct Project Indicators */}
            {projects.map((p, i) => {
              const isSelected = currentIndex === i;
              const pTheme = PROJECT_THEMES[p.name] || PROJECT_THEMES.Erpixa;
              return (
                <button
                  key={p.name}
                  id={`project-tab-${i}`}
                  type="button"
                  onClick={() => {
                    AudioEngine.playClick();
                    setCurrentIndex(i);
                  }}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-mono transition-all duration-200 border flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-slate-800 text-white shadow-lg'
                      : 'bg-slate-900/80 text-slate-300 hover:text-white border-slate-700'
                  }`}
                  style={{
                    borderColor: isSelected ? pTheme.accent : undefined,
                    boxShadow: isSelected ? `0 0 18px ${pTheme.accent}55` : undefined,
                  }}
                >
                  <span className="font-bold" style={{ color: isSelected ? pTheme.accent : undefined }}>
                    0{i + 1}
                  </span>
                  <span className="hidden md:inline">{p.name}</span>
                </button>
              );
            })}

            <button
              id="project-btn-next"
              onClick={handleNext}
              type="button"
              className="px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 transition-colors flex items-center gap-1 shadow-sm"
              title="Next project (→)"
            >
              <span className="hidden sm:inline">Next</span>
              <span>→</span>
            </button>

            <button
              onClick={() => setIsAutoPlaying((p) => !p)}
              type="button"
              className="px-2.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-mono transition-colors"
              title="Toggle auto cycle"
            >
              {isAutoPlaying ? '⏸' : '▶'}
            </button>
          </div>
        </div>

        {/* -------------------------------------------------------------------------
            MIDDLE STAGE: The 3D Curved Elliptical Horizon
            Smooth orbital trajectory, zero overlap over active card, high gradient text
           ------------------------------------------------------------------------- */}
        <div
          className="relative w-full flex-1 flex items-center justify-center my-auto overflow-visible"
          style={{
            perspective: '1300px',
            perspectiveOrigin: '50% 50%',
          }}
        >
          {/* Orbital Horizon Arc Line */}
          <div
            className="pointer-events-none absolute w-[140%] h-[520px] rounded-[100%] border-t border-cyan-400/20 -top-8 left-1/2 -translate-x-1/2 -z-10 blur-[1px]"
            style={{
              maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)',
            }}
          />

          {/* Cards along the 3D curved elliptical trajectory */}
          <div className="relative w-full h-[470px] sm:h-[510px] flex items-center justify-center">
            {projects.map((project, index) => {
              const transform = getCardTransform(index);
              const stack = PROJECT_STACKS[project.name] || project.tags || ['Next.js', 'TypeScript', 'Tailwind CSS'];
              const slug = project.name.toLowerCase().replace(/[^a-z0-9]/g, '');
              const theme = PROJECT_THEMES[project.name] || PROJECT_THEMES.Erpixa;

              return (
                <motion.div
                  key={project.name}
                  animate={{
                    x: transform.x,
                    y: transform.y,
                    z: transform.z,
                    scale: transform.scale,
                    rotateZ: transform.rotZ,
                    rotateY: transform.rotY,
                    opacity: transform.opacity,
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{
                    position: 'absolute',
                    zIndex: transform.zIndex,
                    width: 'min(92vw, 800px)',
                    transformStyle: 'preserve-3d',
                    backgroundColor: '#070b1a', // Solid luxury dark card canvas: NEVER white!
                    borderColor: transform.isCenter ? theme.accent : 'rgba(255, 255, 255, 0.12)',
                    boxShadow: transform.isCenter
                      ? `0 24px 60px -15px ${theme.accent}44, 0 0 0 1px ${theme.accent}66, inset 0 1px 1px rgba(255, 255, 255, 0.2)`
                      : '0 12px 30px -10px rgba(0, 0, 0, 0.8), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
                  }}
                  onClick={() => {
                    if (!transform.isCenter) {
                      AudioEngine.playClick();
                      setCurrentIndex(index);
                    }
                  }}
                  className={`rounded-2xl sm:rounded-3xl border backdrop-blur-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between ${
                    transform.isCenter ? 'cursor-default ring-1 ring-white/10' : 'cursor-pointer hover:opacity-90'
                  }`}
                >
                  {/* Card macOS Browser Chrome Header */}
                  <div
                    style={{ backgroundColor: '#030612' }}
                    className="px-4 sm:px-5 py-3 border-b border-slate-800 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500 inline-block border border-rose-600" />
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500 inline-block border border-amber-600" />
                      <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 inline-block border border-emerald-600" />
                      <span className="ml-2 sm:ml-3 text-[0.7rem] sm:text-xs font-mono text-cyan-300 bg-cyan-950/40 px-2.5 py-0.5 rounded-full border border-cyan-500/25">
                        https://{project.name.toLowerCase()}.biswodip.dev
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {transform.isCenter && (
                        <span className="px-2 py-0.5 rounded-full text-[0.65rem] sm:text-[0.68rem] font-mono bg-cyan-500/15 text-cyan-300 border border-cyan-400/40 animate-pulse font-semibold">
                          ● FOCAL ACTIVE
                        </span>
                      )}
                      <span className="text-xs font-mono font-bold text-slate-400">0{index + 1}</span>
                    </div>
                  </div>

                  {/* Card Content: Screenshot & Architectural Details */}
                  <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-center">
                    {/* Visual Preview Screenshot (7 cols) */}
                    <div className="md:col-span-7 relative h-44 sm:h-56 rounded-xl sm:rounded-2xl overflow-hidden border border-slate-700/80 bg-[#020510] group">
                      <Image
                        src={`/previews/${slug}.webp`}
                        alt={project.name}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 460px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#030612]/90 via-transparent to-transparent pointer-events-none" />

                      {/* Live Indicator Pill on Preview */}
                      <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-md border border-white/20 text-[0.65rem] font-mono text-white flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>LIVE DEPLOYMENT</span>
                      </div>
                    </div>

                    {/* Meta Specifications (5 cols) */}
                    <div className="md:col-span-5 flex flex-col justify-between h-full space-y-2.5 sm:space-y-3">
                      <div>
                        <div
                          className="text-[0.68rem] font-mono uppercase tracking-widest font-bold mb-1"
                          style={{ color: theme.accent }}
                        >
                          {theme.category}
                        </div>
                        {/* High Gradient Project Title */}
                        <h3
                          style={{
                            background: theme.gradientStyle,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            color: theme.accent,
                          }}
                          className="text-2xl sm:text-3xl font-black tracking-tight"
                        >
                          {project.name}
                        </h3>
                        {/* High Contrast Crisp Copy */}
                        <p
                          style={{ color: '#ffffff' }}
                          className="text-xs sm:text-sm font-medium leading-relaxed mt-1"
                        >
                          {project.blurb}
                        </p>
                        <p
                          style={{ color: '#cbd5e1' }}
                          className="text-xs font-sans leading-relaxed mt-1 line-clamp-2"
                        >
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {stack.slice(0, 4).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-md bg-[#0c1328] border border-cyan-500/30 text-[0.68rem] font-mono text-cyan-200 font-medium shadow-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Direct Interactive Action Links */}
                      {transform.isCenter && (
                        <div className="pt-2 flex items-center gap-2">
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-mono text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                          >
                            <span>Live System</span>
                            <Icon name="arrowUpRight" />
                          </a>
                          {project.repo && (
                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3.5 py-2 rounded-xl bg-[#0f1730] hover:bg-[#162142] text-slate-200 font-mono text-xs transition-colors flex items-center gap-1.5 border border-slate-700"
                            >
                              <span>Source</span>
                              <Icon name="arrowUpRight" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Status */}
                  <div
                    style={{ backgroundColor: '#030612' }}
                    className="px-4 sm:px-5 py-2.5 border-t border-slate-800 flex items-center justify-between text-[0.68rem] font-mono text-slate-300"
                  >
                    <span className="text-emerald-400 font-semibold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      POSTGRES RLS · PROD VERIFIED
                    </span>
                    <span className="text-slate-400 hidden sm:inline">100% INDEPENDENT BUILD</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* -------------------------------------------------------------------------
            BOTTOM ROW: Trajectory Telemetry & Scrub Bar
           ------------------------------------------------------------------------- */}
        <div className="relative z-30 max-w-7xl mx-auto w-full pt-2 sm:pt-3 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-[0.7rem] sm:text-[0.72rem] font-mono text-slate-300">
          <div className="flex items-center gap-3">
            <span className="text-cyan-400 font-bold">● 05 FLAGSHIP SYSTEMS IN 3D ORBIT</span>
            <span className="hidden sm:inline text-slate-600">|</span>
            <span className="hidden sm:inline text-slate-400">
              GPU ACCELERATED ELLIPTICAL PERSPECTIVE TRAJECTORY
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-slate-400 hidden sm:inline">
              SCROLL DOWN OR USE ARROWS (← →) TO NAVIGATE FLEET
            </span>
            <span className="text-cyan-400 font-bold animate-bounce">↓</span>
          </div>
        </div>
      </div>
    </section>
  );
}
