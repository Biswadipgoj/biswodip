'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import ThreeComputerScene from './ThreeComputerScene';
import { personal } from '@/lib/data';

export default function CinematicHero() {
  const [recompileTrigger, setRecompileTrigger] = useState(0);

  const handleRecompile = () => {
    setRecompileTrigger((prev) => prev + 1);
  };

  return (
    <div id="home" className="relative w-full">
      {/* ── 01: HERO SECTION (2-Column Desktop: Left Typography & Spotlight, Right 3D Workstation) ── */}
      <section className="relative min-h-[92dvh] w-full flex items-center pt-24 pb-16 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Focused Value Proposition & Engineer Spotlight (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Eyebrow & Status Pill */}
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.18] border border-white/35 text-xs mono text-white shadow-sm backdrop-blur-xl">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_#10b981]" />
                <span className="font-semibold">CSE RUNTIME ENGINE · v3.2</span>
              </div>
              <span className="hidden sm:inline-block text-xs mono text-white/80 font-medium">
                120 FPS THREE.JS · DETERMINISTIC ARCHITECTURE
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-[1.0] tracking-tight uppercase">
              <span className="block text-white">BUILT TO</span>
              <span className="grad-text-vivid block">SHIP REALITY.</span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-[#f1f5f9] leading-relaxed max-w-xl">
              Software engineered by <strong className="text-white font-bold underline decoration-[#00d2ff] decoration-2 underline-offset-4">Biswodip Goj</strong>. Combining formal Computer Science fundamentals with high-performance web systems and real-time distributed architectures.
            </p>

            {/* ── PROMINENT EXECUTIVE ENGINEER SPOTLIGHT (Biswodip's Real Photo) ── */}
            <div className="glass-panel p-4 sm:p-5 rounded-2xl border border-white/35 shadow-xl flex items-center gap-4 bg-white/[0.18] backdrop-blur-2xl">
              {/* Photo Portrait with Specular Halo */}
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden ring-2 ring-white/50 shadow-lg shrink-0">
                <Image
                  src="/biswodip.png"
                  alt="Biswodip Goj — Software Systems Engineer"
                  fill
                  className="object-cover object-top filter contrast-[1.04]"
                  sizes="(max-width: 768px) 80px, 96px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Identity Details */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-base sm:text-lg font-bold text-white font-display">
                    Biswodip Goj
                  </span>
                  <span className="mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/25 text-[#10b981] font-bold border border-emerald-300/40">
                    ● OPEN TO ROLES
                  </span>
                </div>
                <div className="mono text-xs text-[#00d2ff] font-semibold truncate">
                  B.Tech in CSE (2024) · Diploma in CST (2021)
                </div>
                <div className="text-xs text-[#e2e8f0] mt-0.5 truncate">
                  Full-Stack Distributed Systems · APIs · WebSockets · PostgreSQL
                </div>
              </div>
            </div>

            {/* Key Metrics Strip */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg border-t border-white/[0.15]">
              <div>
                <div className="mono text-[10px] text-white/70 uppercase font-semibold">Shipped Fleet</div>
                <div className="font-display font-bold text-lg text-white">15+ Systems</div>
              </div>
              <div>
                <div className="mono text-[10px] text-white/70 uppercase font-semibold">WS Latency</div>
                <div className="font-display font-bold text-lg text-[#00d2ff]">&lt; 42ms Mesh</div>
              </div>
              <div>
                <div className="mono text-[10px] text-white/70 uppercase font-semibold">CSE Degree</div>
                <div className="font-display font-bold text-lg text-[#a855f7]">B.Tech 2024</div>
              </div>
            </div>

            {/* Action Triggers */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a href="#work" className="btn-primary-action">
                <span>Explore Fleet</span>
                <span aria-hidden="true">↘</span>
              </a>
              <a href="#about" className="btn-secondary-action">
                <span>Inspect Architecture</span>
                <span aria-hidden="true">⚙</span>
              </a>
              <a href={`mailto:${personal.email}`} className="btn-secondary-action">
                <span>Connect Direct</span>
                <span aria-hidden="true">✉</span>
              </a>
            </div>
          </div>

          {/* Right Column: Dedicated 3D Workstation Stage (5 cols) */}
          <div className="lg:col-span-5 w-full">
            {/* Apple-grade Workstation Enclosure (No harsh dark borders) */}
            <div className="relative w-full h-[440px] sm:h-[490px] lg:h-[530px] rounded-3xl overflow-hidden glass-panel border border-white/35 shadow-2xl flex items-center justify-center bg-white/[0.14] backdrop-blur-3xl group">
              {/* Top Window Strip with Traffic Lights */}
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between z-10">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-[0_0_6px_rgba(255,95,86,0.6)]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-[0_0_6px_rgba(255,189,46,0.6)]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] shadow-[0_0_6px_rgba(39,201,63,0.6)]" />
                  <span className="mono text-[11px] text-white/90 ml-2 font-bold">
                    workstation-runtime.3d
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleRecompile}
                    title="Trigger Recompile"
                    className="mono text-[10px] text-[#00d2ff] px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-300/40 font-bold hover:bg-cyan-500/30 transition-all cursor-pointer pointer-events-auto"
                  >
                    ⚡ RECOMPILE
                  </button>
                  <span className="mono text-[10px] text-[#10b981] px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-300/40 font-bold">
                    120 FPS
                  </span>
                </div>
              </div>

              {/* 3D WebGL Canvas */}
              <ThreeComputerScene key={recompileTrigger} className="w-full h-full" />

              {/* Bottom Interactive Hint */}
              <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none px-4">
                <span className="mono text-[10px] text-white/80 uppercase tracking-wider px-3 py-1 rounded-full bg-white/[0.15] border border-white/20 backdrop-blur-md">
                  Hover to tilt workstation · Real-time socket mesh compiled
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 02: THREE FORCES ARCHITECTURE (Distinct Lighter Color Shades per Force) ── */}
      <section className="relative w-full py-20 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/[0.15]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.14] border border-white/[0.25] text-xs mono text-[#00d2ff] mb-2">
            <span>⚡ THE SYSTEM TRIAD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white tracking-tight">
            Three Forces. One Deterministic Machine.
          </h2>
          <p className="text-sm text-[#e2e8f0] mt-2">
            The foundational engineering layers powering every production system I architect and deploy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Force 01: Client Surface — Lighter Sky/Cyan */}
          <div className="glass-panel p-6 rounded-3xl border border-sky-300/40 hover:border-sky-300/70 group transition-all duration-300 shadow-xl bg-white/[0.20] backdrop-blur-2xl">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 border border-white/30 shadow-md bg-sky-950/20">
              <Image
                src="/previews/nexora.webp"
                alt="Client Surface — Reactive Interfaces"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 360px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2.5">
                <span className="mono text-[10px] text-[#00d2ff] font-bold px-2.5 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm">
                  REACT &amp; NEXT.JS RSC
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="mono text-xs font-bold text-[#00d2ff]">01 · CLIENT SURFACE</span>
              <span className="mono text-[10px] px-2.5 py-0.5 rounded-full bg-white/[0.15] text-white border border-white/25">
                Next.js &amp; TS
              </span>
            </div>
            <h3 className="text-lg font-display font-bold text-white mb-2">
              Reactive Interface Surface
            </h3>
            <p className="text-xs text-[#f1f5f9] leading-relaxed mb-4">
              Sub-second initial paint, zero layout thrashing, optimistic UI updates, and GPU-accelerated micro-interactions.
            </p>
            <div className="pt-3 border-t border-white/[0.15] flex items-center justify-between text-[11px] mono text-white/80">
              <span>SSR / Hydration</span>
              <span className="text-[#10b981] font-bold">100% Type-Safe</span>
            </div>
          </div>

          {/* Force 02: Logic Engine — Lighter Emerald/Mint */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-300/40 hover:border-emerald-300/70 group transition-all duration-300 shadow-xl bg-white/[0.20] backdrop-blur-2xl">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 border border-white/30 shadow-md bg-emerald-950/20">
              <Image
                src="/previews/telepoint.webp"
                alt="Logic Engine — Real-Time WebSocket Mesh"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 360px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#065f46]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2.5">
                <span className="mono text-[10px] text-[#34d399] font-bold px-2.5 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm">
                  WEBSOCKET MESH
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="mono text-xs font-bold text-[#34d399]">02 · LOGIC ENGINE</span>
              <span className="mono text-[10px] px-2.5 py-0.5 rounded-full bg-white/[0.15] text-white border border-white/25">
                Node &amp; Sockets
              </span>
            </div>
            <h3 className="text-lg font-display font-bold text-white mb-2">
              Real-Time Mesh Services
            </h3>
            <p className="text-xs text-[#f1f5f9] leading-relaxed mb-4">
              Bidirectional socket channels powering instant multi-user messaging, live telemetry, and low-latency packet routing.
            </p>
            <div className="pt-3 border-t border-white/[0.15] flex items-center justify-between text-[11px] mono text-white/80">
              <span>Atomic Frames</span>
              <span className="text-[#00d2ff] font-bold">&lt; 42ms Latency</span>
            </div>
          </div>

          {/* Force 03: Data Cockpit — Lighter Amethyst/Lavender */}
          <div className="glass-panel p-6 rounded-3xl border border-purple-300/40 hover:border-purple-300/70 group transition-all duration-300 shadow-xl bg-white/[0.20] backdrop-blur-2xl">
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-4 border border-white/30 shadow-md bg-purple-950/20">
              <Image
                src="/previews/erpixa.webp"
                alt="Data Cockpit — Relational Postgres Engine"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 360px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#581c87]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2.5">
                <span className="mono text-[10px] text-[#c084fc] font-bold px-2.5 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm">
                  POSTGRESQL &amp; RLS
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between mb-2">
              <span className="mono text-xs font-bold text-[#c084fc]">03 · DATA COCKPIT</span>
              <span className="mono text-[10px] px-2.5 py-0.5 rounded-full bg-white/[0.15] text-white border border-white/25">
                Postgres &amp; Prisma
              </span>
            </div>
            <h3 className="text-lg font-display font-bold text-white mb-2">
              Relational Storage Core
            </h3>
            <p className="text-xs text-[#f1f5f9] leading-relaxed mb-4">
              Row-level security policies, indexed B-Tree access on hot query paths, atomic transactions, and automated schema migrations.
            </p>
            <div className="pt-3 border-t border-white/[0.15] flex items-center justify-between text-[11px] mono text-white/80">
              <span>ACID Storage</span>
              <span className="text-[#fcd34d] font-bold">RLS Enforced</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03: HUMAN ARCHITECT (Biswodip Goj Profile Section) ── */}
      <section className="relative w-full py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/[0.15]">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl flex flex-col md:flex-row items-center gap-8 border-white/35 shadow-2xl bg-white/[0.20] backdrop-blur-3xl">
          {/* Portrait Photo */}
          <div className="relative w-44 h-56 sm:w-52 sm:h-64 rounded-2xl overflow-hidden border-2 border-white/50 shadow-2xl shrink-0">
            <Image
              src="/biswodip.png"
              alt="Biswodip Goj — Full-Stack Software Engineer"
              fill
              className="object-cover object-top filter contrast-[1.04]"
              sizes="(max-width: 768px) 176px, 208px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1e2348]/70 via-transparent to-transparent" />
            <div className="absolute bottom-2.5 left-2.5 right-2.5 text-center">
              <span className="mono text-[10px] text-[#10b981] font-bold px-3 py-1 rounded-full bg-white/35 backdrop-blur-md border border-white/40 shadow-md">
                B.TECH IN CSE · 2024
              </span>
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.15] border border-white/[0.25]">
              <span className="w-2 h-2 rounded-full bg-[#00d2ff]" />
              <span className="mono text-xs text-white font-semibold">ENGINEER BEHIND THE CODE</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Biswodip Goj
            </h2>

            <p className="text-sm sm:text-base text-[#f1f5f9] leading-relaxed max-w-xl">
              Full-stack software engineer from Uluberia, West Bengal. Six years of continuous Computer Science education (Diploma 2021 + B.Tech 2024), translating foundational engineering principles into 15+ production-tested software systems.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-left max-w-md">
              <div className="p-3.5 rounded-xl bg-white/[0.15] border border-white/[0.25]">
                <div className="mono text-[10px] text-white/70 uppercase font-bold">Academic Track</div>
                <div className="text-xs font-bold text-white mt-0.5">Diploma + B.Tech in CSE</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.15] border border-white/[0.25]">
                <div className="mono text-[10px] text-white/70 uppercase font-bold">Delivery Record</div>
                <div className="text-xs font-bold text-[#10b981] mt-0.5">15+ Shipped Codebases</div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <a href="#work" className="btn-primary-action text-xs py-2.5 px-5">
                <span>View Systems Fleet</span>
                <span aria-hidden="true">↓</span>
              </a>
              <a href={`mailto:${personal.email}`} className="btn-secondary-action text-xs py-2.5 px-5">
                <span>Direct Contact</span>
                <span aria-hidden="true">✉</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
