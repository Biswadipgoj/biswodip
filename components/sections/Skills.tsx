'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { constellation, type Craft } from '@/lib/data';
import TechIcon, { getTechDetails } from '../ui/TechIcon';
import { AudioEngine } from '../ui/AudioFeedback';
import { getCraftSpec } from './craftSpecs';

const LAYER_THEMES = [
  {
    name: 'Frontend UI Systems',
    shortName: 'Client Runtime',
    accent: '#00f0ff',
    badgeGradient: 'from-cyan-400 via-teal-300 to-blue-400',
    bgGradient: 'radial-gradient(ellipse 90% 70% at 50% 15%, rgba(0, 240, 255, 0.16) 0%, rgba(2, 6, 23, 0.98) 75%)',
    borderGlow: 'rgba(0, 240, 255, 0.4)',
    tag: '120 FPS RECONCILIATION · CLIENT RUNTIME',
    nodeSpec: 'SSR / RSC · VDOM DIFFING · WEBGL 3D',
  },
  {
    name: 'Distributed Backend & APIs',
    shortName: 'Microservices & APIs',
    accent: '#8b5cf6',
    badgeGradient: 'from-indigo-400 via-violet-300 to-purple-400',
    bgGradient: 'radial-gradient(ellipse 90% 70% at 50% 15%, rgba(139, 92, 246, 0.16) 0%, rgba(2, 6, 23, 0.98) 75%)',
    borderGlow: 'rgba(139, 92, 246, 0.4)',
    tag: 'HIGH CONCURRENCY · POSTGRES RLS ISOLATION',
    nodeSpec: 'gRPC · WEBSOCKETS · EVENT BUS · ACID',
  },
  {
    name: 'Cloud Infrastructure & DevOps',
    shortName: 'Cloud & Kubernetes',
    accent: '#f97316',
    badgeGradient: 'from-amber-400 via-orange-300 to-rose-400',
    bgGradient: 'radial-gradient(ellipse 90% 70% at 50% 15%, rgba(249, 115, 22, 0.16) 0%, rgba(2, 6, 23, 0.98) 75%)',
    borderGlow: 'rgba(249, 115, 22, 0.4)',
    tag: 'OCI CONTAINER RUNTIME · GITOPS AUTONOMOUS',
    nodeSpec: 'DOCKER · CI/CD · MULTI-CLOUD · HPA',
  },
  {
    name: 'Data Engineering & Distributed Tooling',
    shortName: 'Data Mesh & Tooling',
    accent: '#ff007f',
    badgeGradient: 'from-pink-400 via-fuchsia-300 to-cyan-300',
    bgGradient: 'radial-gradient(ellipse 90% 70% at 50% 15%, rgba(255, 0, 127, 0.16) 0%, rgba(2, 6, 23, 0.98) 75%)',
    borderGlow: 'rgba(255, 0, 127, 0.4)',
    tag: 'COLUMNAR STORAGE · EVENT LOGS · REDIS CACHE',
    nodeSpec: 'ACID · PARQUET · REDIS · TESTING',
  },
];

// -----------------------------------------------------------------------------
// COMPUTER SCIENCE SOFTWARE OBJECT: Interactive Abstract Syntax Tree & DAG Flow
// -----------------------------------------------------------------------------
function SoftwareArchitectureTelemetry({ activeLayer }: { activeLayer: number }) {
  const [selectedASTNode, setSelectedASTNode] = useState('optimize');

  const astNodes = [
    { id: 'program', label: 'Program(root)', type: 'AST_ROOT', color: '#38bdf8' },
    { id: 'func', label: 'FuncDecl: executeEngine()', type: 'DECLARATION', color: '#818cf8' },
    { id: 'optimize', label: 'optimize(system: Scalability)', type: 'CALL_EXPR', color: '#34d399' },
    { id: 'return', label: 'Return("120 FPS Guaranteed")', type: 'LITERAL', color: '#f472b6' },
  ];

  return (
    <div className="w-full rounded-2xl bg-[#070c22]/90 border border-slate-700/80 p-3 sm:p-4 backdrop-blur-xl shadow-lg">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-xs font-bold">λ COMPUTER SCIENCE SOFTWARE OBJECTS</span>
          <span className="text-slate-500">·</span>
          <span className="text-xs font-mono text-slate-300">
            Abstract Syntax Tree (AST) &amp; Reactive Event Loop
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>V8 MICROTASK QUEUE: 0.12ms TICK</span>
        </div>
      </div>

      {/* Interactive AST Software Grammar Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2.5">
        {astNodes.map((node) => {
          const isSelected = selectedASTNode === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => {
                try {
                  AudioEngine.playClick();
                } catch {}
                setSelectedASTNode(node.id);
              }}
              className={`p-2 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-400/80 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-0.5">
                <span style={{ color: node.color }} className="font-bold">
                  {node.type}
                </span>
                <span className="text-slate-500">O(1)</span>
              </div>
              <div className="text-xs font-mono font-semibold text-slate-200 line-clamp-1">
                {node.label}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// ARCHITECTURAL INTERFACE INSPECTOR MODAL (Glassmorphic Drawer)
// -----------------------------------------------------------------------------
function ArchitecturalInspectorModal({
  craft,
  onClose,
}: {
  craft: Craft;
  onClose: () => void;
}) {
  const spec = getCraftSpec(craft.name);
  const { color } = getTechDetails(craft.name);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-2xl rounded-2xl bg-[#090e26]/95 border border-cyan-500/40 p-5 sm:p-7 backdrop-blur-2xl shadow-2xl text-white overflow-hidden"
      >
        {/* Ambient Top Glow */}
        <div
          className="absolute -top-24 -left-24 w-72 h-72 rounded-full blur-[90px] opacity-25 pointer-events-none"
          style={{ background: color }}
        />

        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-700/80 relative z-10">
          <div className="flex items-center gap-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center border shadow-md"
              style={{
                background: `${color}20`,
                borderColor: `${color}60`,
                boxShadow: `0 0 16px ${color}30`,
              }}
            >
              <TechIcon name={craft.name} size={24} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  {spec.category}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-xs font-mono text-emerald-400 font-bold">
                  {spec.metric}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white">{craft.name}</h3>
            </div>
          </div>

          <button
            onClick={() => {
              try {
                AudioEngine.playClick();
              } catch {}
              onClose();
            }}
            type="button"
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm font-mono border border-slate-700 transition-colors cursor-pointer"
            title="Close Inspector"
          >
            ✕
          </button>
        </div>

        {/* Body Content */}
        <div className="space-y-4 py-4 text-xs sm:text-sm font-sans relative z-10">
          {/* Production Role */}
          <div>
            <span className="text-xs font-mono font-bold uppercase text-slate-400 block mb-1">
              PRODUCTION ARCHITECTURAL ROLE
            </span>
            <p className="text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              {spec.role}
            </p>
          </div>

          {/* Recruiter Tradeoff Takeaway */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-mono font-bold uppercase text-cyan-400 block mb-1">
                ALGORITHMIC COMPLEXITY
              </span>
              <p className="text-slate-200 font-mono text-xs">{spec.complexity}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-xs font-mono font-bold uppercase text-amber-400 block mb-1">
                SYSTEM DESIGN TRADEOFF
              </span>
              <p className="text-slate-300 text-xs leading-normal">{spec.tradeoff}</p>
            </div>
          </div>

          {/* Production Code Contract */}
          <div>
            <span className="text-xs font-mono font-bold uppercase text-slate-400 block mb-1">
              PRODUCTION INTERFACE CONTRACT / SOURCE BLUEPRINT
            </span>
            <pre className="p-3 rounded-xl bg-black/70 border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
              <code>{spec.codeSnippet}</code>
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400 relative z-10">
          <span>STATUS: PRODUCTION DEPLOYED · ZERO BLOAT</span>
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-colors shadow-md cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// INTERACTIVE 3D SPATIAL CARD (120 FPS Physics, No Text Truncation, Solid CTA)
// -----------------------------------------------------------------------------
function SpatialSkillCard({
  craft,
  index,
  accentColor,
  onInspect,
}: {
  craft: Craft;
  index: number;
  accentColor: string;
  onInspect: (craft: Craft) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { color } = getTechDetails(craft.name);
  const spec = getCraftSpec(craft.name);
  const prefersReduced = useReducedMotion();

  // Mouse tilt motion values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], prefersReduced ? [0, 0] : [6, -6]), { stiffness: 320, damping: 24 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], prefersReduced ? [0, 0] : [-6, 6]), { stiffness: 320, damping: 24 });
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle 240px at ${gx}% ${gy}%, rgba(255,255,255,0.22), transparent 70%)`
  );
  const [hovered, setHovered] = useState(false);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!cardRef.current || prefersReduced) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handlePointerLeave() {
    setHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <motion.div
      id={`skill-card-${craft.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => {
        setHovered(true);
        try {
          AudioEngine.playClick();
        } catch {}
      }}
      onPointerLeave={handlePointerLeave}
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.24, delay: index * 0.015, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="relative group h-full cursor-pointer"
      onClick={() => onInspect(craft)}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          backgroundColor: hovered ? 'rgba(12, 19, 44, 0.98)' : 'rgba(7, 12, 30, 0.94)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: hovered ? `${color}cc` : 'rgba(255, 255, 255, 0.14)',
          boxShadow: hovered
            ? `0 20px 40px -10px ${color}55, inset 0 1px 1px rgba(255, 255, 255, 0.35)`
            : '0 8px 22px -8px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.08)',
        }}
        className="relative h-full rounded-2xl p-4 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between overflow-hidden"
      >
        {/* Dynamic Specular Glare */}
        <motion.div
          className="pointer-events-none absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: glareBackground }}
        />

        {/* Card Top: Numbering + Status + Tech Icon */}
        <div style={{ transform: 'translateZ(20px)' }} className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-mono font-bold tracking-wider px-2 py-0.5 rounded-lg border"
              style={{
                color,
                borderColor: `${color}55`,
                background: `${color}18`,
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="relative flex h-2 w-2">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: color }}
              />
              <span
                className="relative inline-flex rounded-full h-2 w-2"
                style={{ background: color }}
              />
            </span>
          </div>

          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center border transition-all duration-300 group-hover:scale-110 shadow-sm"
            style={{
              background: `${color}22`,
              borderColor: `${color}55`,
              boxShadow: `0 0 12px ${color}33`,
            }}
          >
            <TechIcon name={craft.name} size={18} />
          </div>
        </div>

        {/* Card Body: Title & Engineering Role */}
        <div style={{ transform: 'translateZ(24px)' }} className="my-1 flex-1">
          <div className="flex items-center justify-between gap-1 mb-1">
            <h3
              style={{
                background: `linear-gradient(90deg, #ffffff 0%, ${color} 70%, #67e8f9 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                color: '#ffffff',
              }}
              className="font-sans font-black text-sm sm:text-base tracking-tight"
            >
              {craft.name}
            </h3>
            <span
              style={{ color, borderColor: `${color}40`, background: `${color}15` }}
              className="text-xs font-mono font-bold px-1.5 py-0.5 rounded border shrink-0"
            >
              {spec.complexity.split(' ')[0]}
            </span>
          </div>
          <p
            style={{ color: '#e2e8f0' }}
            className="text-xs leading-relaxed font-sans line-clamp-2"
          >
            {craft.vibe}
          </p>
        </div>

        {/* Card Footer: Full Performance Metric (No Truncation) & Solid Tactile CTA */}
        <div
          style={{ transform: 'translateZ(16px)' }}
          className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center justify-between gap-2 text-xs font-mono"
        >
          {/* Unclipped metric badge (fixes Usability Issues 8-19) */}
          <span
            className="px-2.5 py-1 rounded-lg bg-slate-900/90 border border-slate-700/80 text-cyan-300 font-mono text-xs whitespace-nowrap flex items-center gap-1.5 shadow-inner"
            title={spec.metric}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="font-semibold">{spec.metric}</span>
          </span>

          {/* Solid prominent Inspect Button (fixes Usability Issue 27) */}
          <button
            type="button"
            data-inspect-btn={craft.name}
            onClick={(e) => {
              e.stopPropagation();
              onInspect(craft);
            }}
            className="px-3 py-1.5 min-h-[32px] rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono shadow-md shadow-cyan-500/20 hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-1 cursor-pointer shrink-0"
          >
            <span>Inspect</span>
            <span>↗</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// -----------------------------------------------------------------------------
// MAIN FLUID 3D SCROLL-DRIVEN ARCHITECTURAL LAYERS SECTION
// Naturally progresses through Layer 01 -> Layer 04 as user scrolls vertically
// -----------------------------------------------------------------------------
export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [inspectedCraft, setInspectedCraft] = useState<Craft | null>(null);
  const [scrollPct, setScrollPct] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Motion Scroll Progress across the scroll track
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  const manualOverrideRef = useRef(false);
  const overrideTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (overrideTimerRef.current) clearTimeout(overrideTimerRef.current);
    };
  }, []);

  // Dynamically map scroll progress with wide hysteresis thresholds (desktop only)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    setScrollPct(Math.round(latest * 100));
    if (manualOverrideRef.current) return;

    let layerIndex = 0;
    if (latest >= 0.75) layerIndex = 3;
    else if (latest >= 0.50) layerIndex = 2;
    else if (latest >= 0.25) layerIndex = 1;
    else layerIndex = 0;

    setActive((prev) => {
      if (prev !== layerIndex) {
        try {
          AudioEngine.playClick();
        } catch {}
        return layerIndex;
      }
      return prev;
    });
  });

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % constellation.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  // Clicking a layer smoothly updates state and scroll
  const handleSelectTab = (index: number) => {
    try {
      AudioEngine.playClick();
    } catch {}
    manualOverrideRef.current = true;
    if (overrideTimerRef.current) clearTimeout(overrideTimerRef.current);
    overrideTimerRef.current = setTimeout(() => {
      manualOverrideRef.current = false;
    }, 1500);

    setActive(index);
    if (sectionRef.current && typeof window !== 'undefined' && window.innerWidth >= 1024) {
      const rect = sectionRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const startTop = scrollTop + rect.top;
      const trackHeight = sectionRef.current.offsetHeight - window.innerHeight;
      if (trackHeight > 0) {
        const targets = [0.05, 0.38, 0.63, 0.92];
        const targetY = startTop + (targets[index] ?? 0.1) * trackHeight;
        window.scrollTo({ top: targetY, behavior: 'smooth' });
      }
    }
  };

  const handleStepNext = () => {
    try {
      AudioEngine.playClick();
    } catch {}
    handleSelectTab((active + 1) % constellation.length);
  };

  const handleStepPrev = () => {
    try {
      AudioEngine.playClick();
    } catch {}
    handleSelectTab((active - 1 + constellation.length) % constellation.length);
  };

  const triggerManualWipe = () => {
    try {
      AudioEngine.playChime();
    } catch {}
    handleSelectTab((active + 1) % constellation.length);
  };

  const handleInspectCraft = (craft: Craft) => {
    try {
      AudioEngine.playChime();
    } catch {}
    setInspectedCraft(craft);
  };

  const activeOrbit = constellation[active];
  const activeTheme = LAYER_THEMES[active];

  return (
    <section
      id="skills"
      ref={sectionRef}
      data-hydrated="true"
      className="relative w-full bg-[#020617] text-white select-none transition-colors duration-700 lg:h-[280vh]"
    >
      {/* -----------------------------------------------------------------------
          STICKY PINNED STAGE (Viewport Anchor on desktop, natural on mobile)
         ----------------------------------------------------------------------- */}
      <div
        className="lg:sticky lg:top-0 w-full min-h-screen lg:h-screen flex flex-col justify-between py-6 sm:py-8 px-4 sm:px-8 lg:px-12 overflow-hidden transition-colors duration-700"
        style={{
          background: activeTheme.bgGradient,
        }}
      >
        {/* Dynamic Background Radial Caustics */}
        <div
          className="pointer-events-none absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 transition-colors duration-700"
          style={{ background: activeTheme.accent }}
        />
        <div
          className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full blur-[140px] opacity-25 transition-colors duration-700"
          style={{ background: activeTheme.accent }}
        />

        {/* ---------------------------------------------------------------------
            TOP ARCHITECTURAL TOPOLOGY CONTROLS & HEADER
           --------------------------------------------------------------------- */}
        <div className="relative z-30 max-w-7xl mx-auto w-full space-y-3">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 pb-3 border-b border-slate-700/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ background: activeTheme.accent }} />
                <span className="text-xs font-mono font-bold tracking-widest text-cyan-400">
                  02 / Architectural System Layers · Scroll-Driven 3D Progression
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white flex items-center gap-2 sm:gap-3">
                <span style={{ color: activeTheme.accent }}>0{active + 1}</span>
                <span className="text-slate-600 font-light">/</span>
                <span
                  className="bg-clip-text text-transparent font-black"
                  style={{
                    backgroundImage: 'linear-gradient(90deg, #ffffff 0%, #e2e8f0 50%, #38bdf8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {activeTheme.name}
                </span>
              </h2>
            </div>

            {/* Stepper & Controls */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <button
                id="skill-btn-prev"
                onClick={handleStepPrev}
                type="button"
                className="px-3 py-1.5 min-h-[36px] min-w-[36px] justify-center rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 transition-colors inline-flex items-center gap-1 shadow-sm cursor-pointer"
                title="Previous Layer"
              >
                <span>←</span>
                <span className="hidden sm:inline">Prev</span>
              </button>

              <button
                id="skill-btn-wipe"
                onClick={triggerManualWipe}
                type="button"
                className="px-3.5 py-1.5 min-h-[36px] rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/50 text-cyan-300 text-xs font-mono transition-colors inline-flex items-center gap-1.5 shadow-sm cursor-pointer"
                title="Trigger 3D Origami Fold transition"
              >
                <span>Origami Fold</span>
                <span>✦</span>
              </button>

              <button
                id="skill-btn-autoplay"
                onClick={() => setIsAutoPlaying((p) => !p)}
                type="button"
                className={`px-3 py-1.5 min-h-[36px] rounded-xl border text-xs font-mono transition-all inline-flex items-center gap-1.5 shadow-sm cursor-pointer ${
                  isAutoPlaying
                    ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse'
                    : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700 text-slate-300'
                }`}
                title="Toggle continuous 120 FPS reel"
              >
                <span>{isAutoPlaying ? '⏸ 120 FPS Reel (Active)' : '▶ 120 FPS Reel'}</span>
              </button>

              <button
                id="skill-btn-next"
                onClick={handleStepNext}
                type="button"
                className="px-3 py-1.5 min-h-[36px] min-w-[36px] justify-center rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 transition-colors inline-flex items-center gap-1 shadow-sm cursor-pointer"
                title="Next Layer"
              >
                <span className="hidden sm:inline">Next</span>
                <span>→</span>
              </button>
            </div>
          </div>

          {/* -------------------------------------------------------------------
              TOPOLOGY CIRCUIT BUS (4 Connected Architecture Layers)
             ------------------------------------------------------------------- */}
          <div className="relative w-full rounded-2xl bg-[#060b1e]/90 border border-slate-700/80 p-2.5 sm:p-3 backdrop-blur-xl shadow-xl overflow-hidden">
            {/* Animated Interconnect Bus Line */}
            <div className="absolute top-1/2 left-6 right-6 h-1 bg-slate-800/80 -translate-y-1/2 hidden md:block" />
            <motion.div
              className="absolute top-1/2 left-6 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 -translate-y-1/2 hidden md:block"
              animate={{
                width: `${((active + 0.5) / 4) * 100}%`,
              }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 relative z-10">
              {constellation.map((orbit, i) => {
                const isSelected = active === i;
                const theme = LAYER_THEMES[i];
                return (
                  <button
                    key={orbit.ring}
                    id={`skill-tab-${i}`}
                    type="button"
                    onClick={() => handleSelectTab(i)}
                    className={`relative p-2 sm:p-2.5 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-[#0e1738] text-white shadow-lg'
                        : 'bg-[#080d22]/80 text-slate-400 hover:text-white hover:bg-[#0b122e] border-slate-800'
                    }`}
                    style={{
                      borderColor: isSelected ? theme.accent : undefined,
                      boxShadow: isSelected ? `0 0 24px ${theme.accent}33, inset 0 1px 1px rgba(255,255,255,0.2)` : undefined,
                    }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg"
                        style={{
                          background: isSelected ? `${theme.accent}25` : 'rgba(255,255,255,0.06)',
                          color: isSelected ? theme.accent : '#94a3b8',
                        }}
                      >
                        LAYER 0{i + 1}
                      </span>
                      {isSelected && (
                        <span className="relative flex h-2 w-2">
                          <span
                            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                            style={{ background: theme.accent }}
                          />
                          <span
                            className="relative inline-flex rounded-full h-2 w-2"
                            style={{ background: theme.accent }}
                          />
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="text-xs sm:text-sm font-bold tracking-tight text-white line-clamp-1">
                        {theme.shortName}
                      </div>
                      <div className="text-xs font-mono text-slate-300 mt-0.5 hidden sm:block">
                        {theme.nodeSpec}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Computer Science AST Grammar Strip */}
          <SoftwareArchitectureTelemetry activeLayer={active} />
        </div>

        {/* ---------------------------------------------------------------------
            THE 12 PRODUCTION TECH CARDS 3D SPATIAL GRID (All 4 Panels Stable in DOM)
           --------------------------------------------------------------------- */}
        <div className="relative z-20 max-w-7xl mx-auto w-full my-auto py-1">
          {constellation.map((orbit, orbitIdx) => (
            <div
              key={orbit.ring}
              id={`skill-panel-${orbitIdx}`}
              style={{
                display: active === orbitIdx ? 'grid' : 'none',
                perspective: 1200,
              }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-4.5"
            >
              {orbit.crafts.map((craft, i) => (
                <SpatialSkillCard
                  key={craft.name}
                  craft={craft}
                  index={i}
                  accentColor={LAYER_THEMES[orbitIdx].accent}
                  onInspect={handleInspectCraft}
                />
              ))}
            </div>
          ))}
        </div>

        {/* ---------------------------------------------------------------------
            BOTTOM TELEMETRY & PERSISTENT STATUS BAR
           --------------------------------------------------------------------- */}
        <div className="relative z-30 max-w-7xl mx-auto w-full pt-3 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-bold">● 48 Recruiter-Verified CS Modules</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-300">
              Layer {active + 1} of 4 · {activeOrbit.ring} · Click any card or &quot;Inspect&quot; for interface contract
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-slate-300 hidden sm:inline">Scroll down or use tabs to traverse full topology</span>
            <span className="text-cyan-400 font-bold animate-bounce">↓</span>
          </div>
        </div>
      </div>

      {/* Interactive Architectural Modal Drawer */}
      <AnimatePresence>
        {inspectedCraft && (
          <ArchitecturalInspectorModal
            craft={inspectedCraft}
            onClose={() => setInspectedCraft(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
