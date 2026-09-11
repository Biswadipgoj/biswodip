'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';
import { constellation, type Craft } from '@/lib/data';
import TechIcon, { getTechDetails } from '../ui/TechIcon';
import { AudioEngine } from '../ui/AudioFeedback';
import { getCraftSpec, type CraftSpec } from './craftSpecs';

const LAYER_THEMES = [
  {
    name: 'Frontend UI Systems',
    shortName: 'Client Runtime',
    accent: '#00f0ff',
    badgeGradient: 'from-cyan-400 via-teal-300 to-blue-400',
    bgGradient: 'radial-gradient(ellipse 90% 70% at 50% 15%, rgba(0, 240, 255, 0.16) 0%, rgba(2, 6, 23, 0.98) 75%)',
    borderGlow: 'rgba(0, 240, 255, 0.4)',
    tag: '120 FPS RECONCILIATION · CLIENT RUNTIME',
    origamiFold: 'ORIGAMI QUAD-FOLD · TOP-DOWN INVARIANT',
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
    origamiFold: 'ORIGAMI BI-LATERAL CREASE · PROTOBUF BUS',
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
    origamiFold: 'ORIGAMI VERTICAL EXPAND · KUBERNETES POD',
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
    origamiFold: 'ORIGAMI RADIAL BLOSSOM · B-TREE INDEX',
    nodeSpec: 'ACID · PARQUET · REDIS · TESTING',
  },
];

// -----------------------------------------------------------------------------
// FOUR-SIDED 3D FOLDED PAPER (ORIGAMI) TRANSITION
// Real 3D geometric paper fold with specular creases and ambient drop shadows
// -----------------------------------------------------------------------------
function FoldedPaperTransition({
  trigger,
  accentColor,
}: {
  trigger: number;
  accentColor: string;
}) {
  const prefersReduced = useReducedMotion();
  if (trigger === 0 || prefersReduced) return null;

  // Editorial origami bezier curve
  const origamiEase = [0.76, 0, 0.24, 1] as const;

  return (
    <div
      key={`folded-paper-${trigger}`}
      className="pointer-events-none absolute inset-0 z-40 overflow-hidden"
      style={{ perspective: 1200 }}
    >
      {/* Flap 1: Top Origami Paper Flap (folds down) */}
      <motion.div
        initial={{ rotateX: 90, opacity: 0 }}
        animate={{
          rotateX: [90, 0, 0, 90],
          opacity: [0, 0.96, 0.96, 0],
        }}
        transition={{
          duration: 0.85,
          times: [0, 0.35, 0.65, 1],
          ease: origamiEase,
        }}
        style={{
          transformOrigin: 'top center',
          clipPath: 'polygon(0% 0%, 100% 0%, 50% 50%)',
          background: `linear-gradient(180deg, ${accentColor}dd 0%, #060a1cf5 100%)`,
          boxShadow: 'inset 0 -20px 40px rgba(0,0,0,0.7)',
        }}
        className="absolute inset-0 border-b border-cyan-300/40 backdrop-blur-md"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/50" />
      </motion.div>

      {/* Flap 2: Bottom Origami Paper Flap (folds up) */}
      <motion.div
        initial={{ rotateX: -90, opacity: 0 }}
        animate={{
          rotateX: [-90, 0, 0, -90],
          opacity: [0, 0.96, 0.96, 0],
        }}
        transition={{
          duration: 0.85,
          times: [0, 0.35, 0.65, 1],
          ease: origamiEase,
        }}
        style={{
          transformOrigin: 'bottom center',
          clipPath: 'polygon(0% 100%, 100% 100%, 50% 50%)',
          background: `linear-gradient(0deg, ${accentColor}dd 0%, #060a1cf5 100%)`,
          boxShadow: 'inset 0 20px 40px rgba(0,0,0,0.7)',
        }}
        className="absolute inset-0 border-t border-cyan-300/40 backdrop-blur-md"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-white/25 via-transparent to-black/50" />
      </motion.div>

      {/* Flap 3: Left Origami Paper Flap (folds right) */}
      <motion.div
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{
          rotateY: [-90, 0, 0, -90],
          opacity: [0, 0.96, 0.96, 0],
        }}
        transition={{
          duration: 0.85,
          delay: 0.03,
          times: [0, 0.35, 0.65, 1],
          ease: origamiEase,
        }}
        style={{
          transformOrigin: 'left center',
          clipPath: 'polygon(0% 0%, 50% 50%, 0% 100%)',
          background: `linear-gradient(90deg, ${accentColor}ee 0%, #080d2af5 100%)`,
          boxShadow: 'inset -20px 0 40px rgba(0,0,0,0.7)',
        }}
        className="absolute inset-0 border-r border-cyan-300/40 backdrop-blur-md"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/25 via-transparent to-black/50" />
      </motion.div>

      {/* Flap 4: Right Origami Paper Flap (folds left) */}
      <motion.div
        initial={{ rotateY: 90, opacity: 0 }}
        animate={{
          rotateY: [90, 0, 0, 90],
          opacity: [0, 0.96, 0.96, 0],
        }}
        transition={{
          duration: 0.85,
          delay: 0.03,
          times: [0, 0.35, 0.65, 1],
          ease: origamiEase,
        }}
        style={{
          transformOrigin: 'right center',
          clipPath: 'polygon(100% 0%, 100% 100%, 50% 50%)',
          background: `linear-gradient(270deg, ${accentColor}ee 0%, #080d2af5 100%)`,
          boxShadow: 'inset 20px 0 40px rgba(0,0,0,0.7)',
        }}
        className="absolute inset-0 border-l border-cyan-300/40 backdrop-blur-md"
      >
        <div className="absolute inset-0 bg-gradient-to-l from-white/25 via-transparent to-black/50" />
      </motion.div>

      {/* Center 4-Fold Origami Crease Intersection Badge */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{
          scale: [0.5, 1.05, 1, 0.5],
          opacity: [0, 1, 1, 0],
        }}
        transition={{ duration: 0.85, times: [0, 0.35, 0.65, 1], ease: origamiEase }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="px-4 py-2 rounded-xl border border-white/40 flex items-center gap-2 backdrop-blur-2xl bg-slate-950/80 shadow-[0_0_35px_rgba(0,240,255,0.4)]">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="font-mono text-xs text-white font-black tracking-widest uppercase">
            3D ORIGAMI FOLD TRANSITION · 120 FPS
          </span>
        </div>
      </motion.div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// COMPUTER SCIENCE SOFTWARE OBJECT: Interactive Abstract Syntax Tree & DAG Flow
// 100% Pure Software Engineering (Zero Core Hardware/Chips)
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-xs font-bold">λ Computer Science Software Objects</span>
          <span className="text-slate-400">·</span>
          <span className="text-xs font-mono text-slate-300">
            Abstract Syntax Tree (AST) &amp; Reactive Event Loop
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>V8 Microtask Queue: 0.12ms Tick</span>
        </div>
      </div>

      {/* Interactive AST Software Grammar Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
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
              className={`p-2.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-400/80 shadow-[0_0_15px_rgba(56,189,248,0.2)]'
                  : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono mb-1">
                <span style={{ color: node.color }} className="font-bold">
                  {node.type}
                </span>
                <span className="text-slate-400">O(1)</span>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
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
              className="w-10 h-10 rounded-xl flex items-center justify-center border shadow-md"
              style={{
                background: `${color}20`,
                borderColor: `${color}60`,
                boxShadow: `0 0 16px ${color}30`,
              }}
            >
              <TechIcon name={craft.name} size={22} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[0.68rem] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                  {spec.category}
                </span>
                <span className="text-slate-600">·</span>
                <span className="text-[0.68rem] font-mono text-emerald-400 font-bold">
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
            className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm font-mono border border-slate-700 transition-colors"
            title="Close Inspector"
          >
            ✕
          </button>
        </div>

        {/* Body Content */}
        <div className="space-y-4 py-4 text-xs sm:text-sm font-sans relative z-10">
          {/* Production Role */}
          <div>
            <span className="text-[0.68rem] font-mono font-bold uppercase text-slate-400 block mb-1">
              PRODUCTION ARCHITECTURAL ROLE
            </span>
            <p className="text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              {spec.role}
            </p>
          </div>

          {/* Recruiter Tradeoff Takeaway */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[0.68rem] font-mono font-bold uppercase text-cyan-400 block mb-1">
                ALGORITHMIC COMPLEXITY
              </span>
              <p className="text-slate-200 font-mono text-xs">{spec.complexity}</p>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[0.68rem] font-mono font-bold uppercase text-amber-400 block mb-1">
                SYSTEM DESIGN TRADEOFF
              </span>
              <p className="text-slate-300 text-xs leading-normal">{spec.tradeoff}</p>
            </div>
          </div>

          {/* Production Code Contract */}
          <div>
            <span className="text-[0.68rem] font-mono font-bold uppercase text-slate-400 block mb-1">
              PRODUCTION INTERFACE CONTRACT / SOURCE BLUEPRINT
            </span>
            <pre className="p-3 rounded-xl bg-black/70 border border-slate-800 text-[0.72rem] font-mono text-cyan-300 overflow-x-auto leading-relaxed">
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
            className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-colors shadow-md"
          >
            Dismiss
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// INTERACTIVE 3D SPATIAL CARD (120 FPS Mouse Physics, Glassmorphic Sheen)
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

  // Mouse tilt motion values
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 300, damping: 24 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 300, damping: 24 });
  const glareX = useTransform(mouseX, [0, 1], [0, 100]);
  const glareY = useTransform(mouseY, [0, 1], [0, 100]);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) => `radial-gradient(circle 220px at ${gx}% ${gy}%, rgba(255,255,255,0.25), transparent 75%)`
  );
  const [hovered, setHovered] = useState(false);

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!cardRef.current) return;
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
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.2, delay: index * 0.01, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="relative group h-full cursor-pointer"
      onClick={() => onInspect(craft)}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          backgroundColor: hovered ? 'rgba(14, 23, 52, 0.96)' : 'rgba(8, 14, 34, 0.92)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: hovered ? `${color}cc` : 'rgba(255, 255, 255, 0.14)',
          boxShadow: hovered
            ? `0 16px 36px -10px ${color}66, inset 0 1px 1px rgba(255, 255, 255, 0.3)`
            : '0 8px 20px -8px rgba(0, 0, 0, 0.7), inset 0 1px 1px rgba(255, 255, 255, 0.08)',
        }}
        className="relative h-full rounded-xl sm:rounded-2xl p-3.5 sm:p-4 transition-all duration-300 backdrop-blur-xl flex flex-col justify-between overflow-hidden"
      >
        {/* Dynamic Specular Glare */}
        <motion.div
          className="pointer-events-none absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: glareBackground,
          }}
        />

        {/* Card Header in 3D */}
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
            className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center border transition-all duration-300 group-hover:scale-110 shadow-sm"
            style={{
              background: `${color}22`,
              borderColor: `${color}55`,
              boxShadow: `0 0 12px ${color}33`,
            }}
          >
            <TechIcon name={craft.name} size={16} />
          </div>
        </div>

        {/* Card Body */}
        <div style={{ transform: 'translateZ(24px)' }} className="my-1">
          <div className="flex items-center justify-between gap-1 mb-0.5">
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

        {/* Card Footer: Algorithmic Complexity & Live Metric */}
        <div
          style={{ transform: 'translateZ(16px)' }}
          className="mt-2 pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs font-mono"
        >
          <span
            className="px-2 py-0.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-cyan-300 font-mono text-xs truncate max-w-[160px] flex items-center gap-1 shadow-inner"
            title={spec.metric}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="truncate">{spec.metric}</span>
          </span>
          <button
            type="button"
            data-inspect-btn={craft.name}
            onClick={(e) => {
              e.stopPropagation();
              onInspect(craft);
            }}
            className="text-cyan-400 group-hover:text-cyan-300 font-bold px-2 py-1 min-h-[32px] inline-flex items-center gap-1 rounded bg-cyan-950/40 border border-cyan-500/20 hover:border-cyan-400/50 hover:underline cursor-pointer"
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
// MAIN SKILLS SECTION COMPONENT
// -----------------------------------------------------------------------------
export default function Skills() {
  const [active, setActive] = useState(0);
  const [wipeTrigger, setWipeTrigger] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [inspectedCraft, setInspectedCraft] = useState<Craft | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-play interval: Continuous 120 FPS Reel across all layers
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActive((prev) => {
        const next = (prev + 1) % constellation.length;
        setWipeTrigger((k) => k + 1);
        return next;
      });
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleSelectTab = (index: number) => {
    if (index === active) return;
    try {
      AudioEngine.playClick();
    } catch {}
    setActive(index);
    setWipeTrigger((k) => k + 1);
  };

  const handleStepNext = () => {
    try {
      AudioEngine.playClick();
    } catch {}
    const next = (active + 1) % constellation.length;
    setActive(next);
    setWipeTrigger((k) => k + 1);
  };

  const handleStepPrev = () => {
    try {
      AudioEngine.playClick();
    } catch {}
    const prev = (active - 1 + constellation.length) % constellation.length;
    setActive(prev);
    setWipeTrigger((k) => k + 1);
  };

  const triggerManualWipe = () => {
    try {
      AudioEngine.playChime();
    } catch {}
    setWipeTrigger((k) => k + 1);
  };

  const handleInspectCraft = (craft: Craft) => {
    try {
      AudioEngine.playChime();
    } catch {}
    setInspectedCraft(craft);
  };

  const activeOrbit = constellation[active];
  const activeTheme = LAYER_THEMES[active];

  // Editorial reference bezier curve
  const transitionEase = [0.76, 0, 0.24, 1] as const;

  return (
    <section
      id="skills"
      data-hydrated={isMounted ? 'true' : 'false'}
      className="relative w-full min-h-screen py-20 sm:py-28 px-3 sm:px-8 lg:px-12 bg-[#020617] text-white select-none overflow-hidden transition-colors duration-700"
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

      {/* -------------------------------------------------------------------------
          FOUR-SIDED 3D FOLDED PAPER (ORIGAMI) TRANSITION
          Flaps fold from Top, Bottom, Left, and Right on 3D perspective axes
         ------------------------------------------------------------------------- */}
      <FoldedPaperTransition trigger={wipeTrigger} accentColor={activeTheme.accent} />

      {/* -------------------------------------------------------------------------
          MAIN CONTAINER: Fluid page flow, zero sticking, 120 FPS spatial depth
         ------------------------------------------------------------------------- */}
      <div className="relative z-30 max-w-7xl mx-auto w-full flex flex-col justify-between space-y-6 sm:space-y-8">
        {/* HEADER ROW: Architectural System Layers & Stepper */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-700/80">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ background: activeTheme.accent }} />
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400">
                02 / Architectural System Layers · Distributed CS Topology
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

          {/* Interactive Stepper & 4-Side Origami Manual Trigger */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              id="skill-btn-prev"
              onClick={handleStepPrev}
              type="button"
              className="px-3 py-1.5 min-h-[36px] min-w-[36px] justify-center rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 transition-colors inline-flex items-center gap-1 shadow-sm"
              title="Previous Layer"
            >
              <span>←</span>
              <span className="hidden sm:inline">Prev</span>
            </button>

            {/* 4-Sided Origami Fold Trigger */}
            <button
              id="skill-btn-wipe"
              onClick={triggerManualWipe}
              type="button"
              className="px-3.5 py-1.5 min-h-[36px] rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-400/50 text-cyan-300 text-xs font-mono transition-colors inline-flex items-center gap-1.5 shadow-sm"
              title="Trigger 4-sided 3D origami paper fold"
            >
              <span>Origami Fold</span>
              <span>✦</span>
            </button>

            <button
              id="skill-btn-autoplay"
              onClick={() => setIsAutoPlaying((p) => !p)}
              type="button"
              className={`px-3 py-1.5 min-h-[36px] rounded-xl border text-xs font-mono transition-all inline-flex items-center gap-1.5 shadow-sm ${
                isAutoPlaying
                  ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse'
                  : 'bg-slate-900/90 hover:bg-slate-800 border-slate-700 text-slate-300'
              }`}
              title="Toggle continuous 120 FPS video-like reel"
            >
              <span>{isAutoPlaying ? '⏸ 120 FPS Reel (Active)' : '▶ 120 FPS Reel'}</span>
            </button>

            <button
              id="skill-btn-next"
              onClick={handleStepNext}
              type="button"
              className="px-3 py-1.5 min-h-[36px] min-w-[36px] justify-center rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-200 transition-colors inline-flex items-center gap-1 shadow-sm"
              title="Next Layer"
            >
              <span className="hidden sm:inline">Next</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* -------------------------------------------------------------------------
            CS ARCHITECTURE BUS (4 Interconnected Layer Nodes)
           ------------------------------------------------------------------------- */}
        <div className="relative w-full rounded-2xl bg-[#060b1e]/90 border border-slate-700/80 p-3 sm:p-4 backdrop-blur-xl shadow-xl overflow-hidden">
          {/* Animated Execution Circuit Bus Line */}
          <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-slate-800 -translate-y-1/2 -z-0 hidden md:block" />
          <motion.div
            className="absolute top-1/2 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 -translate-y-1/2 -z-0 hidden md:block"
            animate={{
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
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
                  className={`relative p-2.5 sm:p-3 rounded-xl text-left transition-all duration-300 border flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#0e1738] text-white shadow-lg'
                      : 'bg-[#080d22]/80 text-slate-400 hover:text-white hover:bg-[#0b122e] border-slate-800'
                  }`}
                  style={{
                    borderColor: isSelected ? theme.accent : undefined,
                    boxShadow: isSelected ? `0 0 24px ${theme.accent}33, inset 0 1px 1px rgba(255,255,255,0.2)` : undefined,
                  }}
                >
                  <div className="flex items-center justify-between mb-1.5">
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

        {/* -------------------------------------------------------------------------
            COMPUTER SCIENCE SOFTWARE ARTIFACT: AST & Reactive Event Loop
           ------------------------------------------------------------------------- */}
        <SoftwareArchitectureTelemetry activeLayer={active} />

        {/* -------------------------------------------------------------------------
            STAGE HEADER TAG & 4-SIDED FOLD TELEMETRY
           ------------------------------------------------------------------------- */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-300 px-1">
          <span className="text-cyan-400 font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-pulse" />
            {activeTheme.tag}
          </span>
          <span className="text-amber-400 font-medium hidden sm:inline">
            {activeTheme.origamiFold}
          </span>
        </div>

        {/* -------------------------------------------------------------------------
            THE 12 PRODUCTION TECH CARDS GRID
            Spacious, high-contrast, zero data overlap, interactive inspection
           ------------------------------------------------------------------------- */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`tech-grid-${active}`}
            id={`skill-panel-${active}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: transitionEase }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5"
          >
            {activeOrbit.crafts.map((craft, i) => (
              <SpatialSkillCard
                key={craft.name}
                craft={craft}
                index={i}
                accentColor={activeTheme.accent}
                onInspect={handleInspectCraft}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* -------------------------------------------------------------------------
            BOTTOM ROW: Live Telemetry & Fluid Continuation
           ------------------------------------------------------------------------- */}
        <div className="pt-4 border-t border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-300">
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-bold">● 48 Recruiter-Verified CSE Modules</span>
            <span className="hidden sm:inline text-slate-400">|</span>
            <span className="hidden sm:inline text-slate-300">
              Layer {active + 1} of 4 · {activeOrbit.ring} · Click any card to inspect architecture
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-slate-300 hidden sm:inline">Continue scrolling down for process &amp; work</span>
            <span className="text-cyan-400 font-bold animate-bounce">↓</span>
          </div>
        </div>
      </div>

      {/* Interactive Architectural Modal */}
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
