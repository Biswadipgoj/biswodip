'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface TechItem {
  id: string;
  name: string;
  category: 'client' | 'engine' | 'data' | 'cloud';
  accent: string;
  badge: string;
  role: string;
  projectTie: string;
  image: string;
  zoomTarget: number;
  interactiveLabel: string;
  interactiveResult: string;
}

const technologies: TechItem[] = [
  {
    id: 'blueprint',
    name: 'Full System Architecture Blueprint',
    category: 'cloud',
    accent: '#00d2ff',
    badge: 'Macro Architecture',
    role: 'End-to-end topology: API Gateway, WebSocket mesh, Postgres cluster & Docker services.',
    projectTie: 'Comprehensive Enterprise Infrastructure',
    image: '/previews/tech-blueprint.jpg',
    zoomTarget: 1.0,
    interactiveLabel: 'Inspect Topology',
    interactiveResult: '⚡ Topology Validated · 0 Bottlenecks Detected',
  },
  {
    id: 'nextjs',
    name: 'Next.js 14 App Router',
    category: 'client',
    accent: '#38bdf8',
    badge: 'React Server Components',
    role: 'Streaming SSR hydration, parallel routing, and edge API rendering.',
    projectTie: 'Powers TelePoint, NanoLink & Erpixa',
    image: '/previews/tech-client.jpg',
    zoomTarget: 1.35,
    interactiveLabel: 'Stream RSC Payload',
    interactiveResult: '✨ RSC Payload Hydrated in 12ms',
  },
  {
    id: 'threejs',
    name: 'Three.js / WebGL 3D Engine',
    category: 'client',
    accent: '#a855f7',
    badge: '120 FPS Viewport',
    role: 'Hardware-accelerated shaders, dynamic tonemapping, and spatial 3D interactivity.',
    projectTie: 'Powers 3D Workstation Live Compiler',
    image: '/editorial/slide1.jpg',
    zoomTarget: 1.5,
    interactiveLabel: 'Compile 3D Shaders',
    interactiveResult: '🎮 120 FPS Maintained · 42k Polygons Batched',
  },
  {
    id: 'websockets',
    name: 'WebSockets & Socket Mesh',
    category: 'engine',
    accent: '#00d2ff',
    badge: 'Sub-42ms Mesh',
    role: 'Bidirectional full-duplex room fan-out with CRC32 packet integrity checks.',
    projectTie: 'TelePoint Real-Time Core',
    image: '/previews/telepoint.webp',
    zoomTarget: 1.8,
    interactiveLabel: 'Dispatch Socket Frame',
    interactiveResult: '📡 Broadcast to 12 Peers in 31ms',
  },
  {
    id: 'nodejs',
    name: 'Node.js Asynchronous Engine',
    category: 'engine',
    accent: '#22c55e',
    badge: 'V8 Non-Blocking',
    role: 'High-throughput event loop scheduling and microtask queue serialization.',
    projectTie: 'TelePoint Hub & API Pipelines',
    image: '/editorial/slide3.jpg',
    zoomTarget: 1.9,
    interactiveLabel: 'Poll Event Loop',
    interactiveResult: '⚡ 0ms Lag · Microtask Queue Flushed',
  },
  {
    id: 'postgres',
    name: 'PostgreSQL & B-Tree Indexing',
    category: 'data',
    accent: '#3b82f6',
    badge: 'ACID Relational Storage',
    role: 'Relational data modeling, compound index optimization, and Row-Level Security.',
    projectTie: 'TelePoint & NanoLink Database',
    image: '/previews/tech-data.jpg',
    zoomTarget: 2.15,
    interactiveLabel: 'EXPLAIN ANALYZE',
    interactiveResult: '🗄️ B-Tree Index Hit · 1.6ms execution scan',
  },
  {
    id: 'prisma',
    name: 'Prisma ORM & Schema Engine',
    category: 'data',
    accent: '#2dd4bf',
    badge: 'Type-Safe ORM',
    role: 'Automated schema migrations, connection pooling & generated TS interfaces.',
    projectTie: 'NanoLink Data Pipeline',
    image: '/previews/nanolink.webp',
    zoomTarget: 2.25,
    interactiveLabel: 'Sync Schema Types',
    interactiveResult: '✓ 100% Type-Safe · 0 Any Violations',
  },
  {
    id: 'docker',
    name: 'Docker Containers & Cloud Edge',
    category: 'cloud',
    accent: '#38bdf8',
    badge: 'Isolated Runtime',
    role: 'Multi-stage Docker builds, isolated sandbox environments, and Vercel edge routes.',
    projectTie: 'Fleet CI/CD Deployment',
    image: '/previews/showcase-bookend.webp',
    zoomTarget: 2.4,
    interactiveLabel: 'Run Container Sandbox',
    interactiveResult: '🐳 Container Healthy · 24ms Boot Time',
  },
];

const zoomPresets = [
  { label: '1.0x Macro Blueprint', level: 1.0, desc: 'Full System Topology' },
  { label: '1.4x Client Surface', level: 1.35, desc: 'Next.js & React RSC' },
  { label: '1.8x WebSocket Mesh', level: 1.8, desc: 'Sub-42ms Sockets' },
  { label: '2.2x Data & B-Tree', level: 2.15, desc: 'Postgres & Redis' },
  { label: '2.4x Cloud Container', level: 2.4, desc: 'Docker & Edge' },
];

export default function SystemStackSection() {
  const [zoomLevel, setZoomLevel] = useState<number>(1.15);
  const [activeTechIndex, setActiveTechIndex] = useState<number>(0);
  const [interactionFeedback, setInteractionFeedback] = useState<{ [key: string]: string }>({});
  const sectionRef = useRef<HTMLElement>(null);
  const zoomStageRef = useRef<HTMLDivElement>(null);

  // ── SCROLL-DRIVEN ZOOM LISTENER ──
  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // When section enters the viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // Calculate scroll progress through the section (0.0 to 1.0)
        const totalDistance = rect.height + windowHeight;
        const scrolled = windowHeight - rect.top;
        const progress = Math.min(Math.max(scrolled / totalDistance, 0), 1);

        // Map scroll progress smoothly to zoom level: 1.0x to 2.4x
        const computedZoom = 1.0 + progress * 1.4;
        setZoomLevel(Number(computedZoom.toFixed(2)));

        // Automatically map zoom level to appropriate tech tier
        if (computedZoom < 1.3) setActiveTechIndex(0); // Blueprint
        else if (computedZoom < 1.6) setActiveTechIndex(1); // Next.js
        else if (computedZoom < 1.95) setActiveTechIndex(3); // WebSockets
        else if (computedZoom < 2.25) setActiveTechIndex(5); // PostgreSQL
        else setActiveTechIndex(7); // Docker
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentTech = technologies[activeTechIndex] || technologies[0];

  const handleTestTrigger = (e: React.MouseEvent, tech: TechItem) => {
    e.stopPropagation();
    setInteractionFeedback((prev) => ({
      ...prev,
      [tech.id]: 'Simulating execution...',
    }));
    setTimeout(() => {
      setInteractionFeedback((prev) => ({
        ...prev,
        [tech.id]: tech.interactiveResult,
      }));
    }, 280);
  };

  const handleManualZoomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newZoom = parseFloat(e.target.value);
    setZoomLevel(newZoom);

    // Map to closest preset
    if (newZoom < 1.25) setActiveTechIndex(0);
    else if (newZoom < 1.6) setActiveTechIndex(1);
    else if (newZoom < 1.95) setActiveTechIndex(3);
    else if (newZoom < 2.25) setActiveTechIndex(5);
    else setActiveTechIndex(7);
  };

  return (
    <section
      ref={sectionRef}
      id="stack"
      className="relative w-full py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/[0.15]"
    >
      {/* ── STICKY TOP CAPTION HOOK ── */}
      <div className="sticky top-20 z-30 mb-8 w-full max-w-4xl mx-auto">
        <div className="glass-hud-pill flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl bg-white/[0.22] backdrop-blur-2xl border border-white/40 shadow-xl">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] animate-ping" />
            <span className="mono text-xs font-bold uppercase tracking-wider text-white">
              03 // SYSTEM ARCHITECTURE &amp; TECH STACK
            </span>
            <span className="hidden sm:inline-block mono text-xs text-[#34d399]">
              · SCROLL-DRIVEN 3D ZOOM WORKBENCH
            </span>
          </div>
          <span className="mono text-xs text-[#34d399] px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-300/40 font-bold">
            ZOOM: {zoomLevel.toFixed(2)}x
          </span>
        </div>
      </div>

      <div className="space-y-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.15] border border-white/[0.25] text-xs mono text-[#34d399] mb-3">
            <span>🔍 SCROLL-LINKED ZOOM OPTIC LENS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Scroll-Driven 3D Architecture Zoom
          </h2>
          <p className="text-sm sm:text-base text-[#f1f5f9] mt-2">
            Scroll through this section or drag the magnification optic slider to dynamically zoom from high-level topology into deep micro-engine execution surfaces.
          </p>
        </div>

        {/* ── INTERACTIVE ZOOM PRESET BUTTONS (Apple-Style Segmented Pill) ── */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {zoomPresets.map((p) => {
            const isSelected = Math.abs(zoomLevel - p.level) < 0.2;
            return (
              <button
                key={p.label}
                onClick={() => {
                  setZoomLevel(p.level);
                  if (p.level <= 1.1) setActiveTechIndex(0);
                  else if (p.level <= 1.5) setActiveTechIndex(1);
                  else if (p.level <= 1.9) setActiveTechIndex(3);
                  else if (p.level <= 2.2) setActiveTechIndex(5);
                  else setActiveTechIndex(7);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-[#34d399] to-[#00d2ff] text-[#0a0f1d] border-white shadow-[0_0_20px_rgba(52,211,153,0.5)] scale-105'
                    : 'bg-white/[0.18] text-white border-white/30 hover:bg-white/[0.28]'
                }`}
              >
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── 3D SCROLLING ZOOM WORKSTATION STAGE (HERO MAGNIFIER) ── */}
        <div
          ref={zoomStageRef}
          className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/35 shadow-2xl relative overflow-hidden bg-white/[0.18] backdrop-blur-3xl"
        >
          {/* Top Stage Control HUD */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.15]">
            <div className="flex items-center gap-3">
              <span
                className="w-3.5 h-3.5 rounded-full shadow-md animate-pulse"
                style={{ backgroundColor: currentTech.accent }}
              />
              <div>
                <span className="mono text-xs font-bold uppercase tracking-wider text-[#00d2ff]">
                  ZOOM FOCUS · {currentTech.category.toUpperCase()} SUBSYSTEM
                </span>
                <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mt-0.5">
                  {currentTech.name}
                </h3>
              </div>
            </div>

            {/* Interactive Tactile Zoom Optic Slider & Step Controls */}
            <div className="flex items-center gap-3 bg-white/[0.16] px-4 py-2 rounded-2xl border border-white/30">
              <span className="mono text-xs font-bold text-white/80">1.0x</span>
              <input
                type="range"
                min="1.0"
                max="2.4"
                step="0.05"
                value={zoomLevel}
                onChange={handleManualZoomChange}
                className="w-28 sm:w-44 accent-[#34d399] cursor-pointer"
              />
              <span className="mono text-xs font-bold text-[#34d399] min-w-[42px]">
                {zoomLevel.toFixed(2)}x
              </span>
            </div>
          </div>

          {/* ── Center Stage: Scrolling Zoom Viewport with Real Blueprint & Component Screenshot ── */}
          <div className="my-6 relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border-2 border-white/40 shadow-2xl group bg-[#151c38]">
            {/* The Dynamically Scaled Image Container */}
            <div
              className="absolute inset-0 transition-transform duration-300 ease-out"
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: 'center center',
              }}
            >
              <Image
                src={currentTech.image}
                alt={`${currentTech.name} Architecture Visualization`}
                fill
                className="object-cover object-center filter contrast-[1.05]"
                sizes="(max-width: 1024px) 100vw, 1200px"
                priority
              />
            </div>

            {/* Optical Zoom Reticle Crosshairs & Camera HUD */}
            <div className="absolute inset-0 pointer-events-none z-20">
              {/* Center Crosshairs */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-white/40 rounded-full flex items-center justify-center">
                <span className="w-1 h-1 rounded-full bg-[#00d2ff] shadow-[0_0_6px_#00d2ff]" />
                <div className="absolute w-full h-[1px] bg-white/25" />
                <div className="absolute h-full w-[1px] bg-white/25" />
              </div>

              {/* Corner Optic Brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/60" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/60" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/60" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/60" />
            </div>

            {/* Specular Ambient Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1428]/80 via-transparent to-black/20 pointer-events-none" />

            {/* Top HUD Badges */}
            <div className="absolute top-6 left-6 flex flex-wrap items-center gap-2 z-30">
              <span className="mono text-xs text-white font-bold px-3 py-1 rounded-full bg-white/25 backdrop-blur-md border border-white/40 shadow-sm">
                {currentTech.badge}
              </span>
              <span className="mono text-xs text-[#00d2ff] font-bold px-3 py-1 rounded-full bg-white/25 backdrop-blur-md border border-white/40 shadow-sm">
                ⚓ {currentTech.projectTie}
              </span>
            </div>

            {/* Bottom HUD Information & Live Trigger */}
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 z-30">
              <p className="text-xs sm:text-sm text-white font-medium drop-shadow-md max-w-xl">
                {currentTech.role}
              </p>

              <button
                onClick={(e) => handleTestTrigger(e, currentTech)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#34d399] to-[#00d2ff] text-[#0a0f1d] font-bold text-xs mono transition-all shadow-[0_0_18px_rgba(52,211,153,0.5)] active:scale-95 shrink-0 pointer-events-auto"
              >
                ⚡ {currentTech.interactiveLabel}
              </button>
            </div>
          </div>

          {/* Micro-Interaction Result Feedback */}
          {interactionFeedback[currentTech.id] && (
            <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-400/50 text-xs mono text-[#34d399] flex items-center justify-between animate-fadeIn mt-4">
              <span>{interactionFeedback[currentTech.id]}</span>
              <span className="text-[#00d2ff] font-bold">● BENCHMARK PASSED</span>
            </div>
          )}
        </div>

        {/* ── HORIZONTAL SNAP CAROUSEL OF ALL TECH TIERS (WITH IMAGES) ── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#34d399]" />
              <span className="mono text-xs font-bold text-white uppercase tracking-wider">
                ENGINE TIERS · CLICK ANY TO JUMP ZOOM CAMERA
              </span>
            </div>
            <span className="text-xs mono text-white/80">
              {technologies.length} Verified Systems
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {technologies.map((t, idx) => {
              const isFocused = idx === activeTechIndex;
              return (
                <div
                  key={t.id}
                  onClick={() => {
                    setActiveTechIndex(idx);
                    setZoomLevel(t.zoomTarget);
                  }}
                  className={`glass-panel p-4 rounded-2xl border transition-all cursor-pointer group hover:scale-[1.02] ${
                    isFocused
                      ? 'border-[#34d399] bg-white/[0.28] shadow-[0_0_25px_rgba(52,211,153,0.4)]'
                      : 'border-white/30 bg-white/[0.16] hover:bg-white/[0.24]'
                  }`}
                >
                  <div className="relative w-full h-32 rounded-xl overflow-hidden mb-3 border border-white/25 shadow-sm">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 260px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <span className="absolute bottom-2 left-2 mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-white/35 backdrop-blur-md text-white border border-white/30">
                      {t.zoomTarget}x ZOOM
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-bold text-sm text-white truncate">
                      {t.name}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full shrink-0 ml-1"
                      style={{ backgroundColor: t.accent }}
                    />
                  </div>
                  <p className="text-[11px] text-[#f1f5f9] line-clamp-2 leading-relaxed">
                    {t.role}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
