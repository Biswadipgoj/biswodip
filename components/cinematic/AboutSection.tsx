'use client';

import React from 'react';
import Image from 'next/image';
import { personal } from '@/lib/data';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/[0.15]"
    >
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-10">
        <span className="mono text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-purple-500/20 border border-purple-300/40 text-[#c084fc] shadow-sm">
          02 · FOUNDATION &amp; PHILOSOPHY
        </span>
        <div className="h-px flex-1 bg-white/[0.15]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Core Engineering Standards & Bio Portrait (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Bio Portrait Card with Specular Double-Bezel */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl space-y-4 bg-white/[0.20] backdrop-blur-2xl border border-purple-300/35 shadow-xl">
            <div className="flex items-center gap-4">
              <div className="relative w-16 h-16 rounded-2xl overflow-hidden ring-2 ring-purple-300/50 shadow-md shrink-0">
                <Image
                  src="/biswodip.png"
                  alt="Biswodip Goj"
                  fill
                  className="object-cover object-top filter contrast-[1.04]"
                />
              </div>
              <div>
                <h3 className="font-display font-bold text-xl text-white">
                  Biswodip Goj
                </h3>
                <span className="mono text-xs text-[#c084fc] font-semibold">
                  Software Systems Engineer
                </span>
                <div className="text-[11px] text-white/80 mt-0.5">
                  B.Tech CSE (2024) · Diploma CST (2021)
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#f1f5f9] leading-relaxed">
              Six years of rigorous Computer Science education combined with independent shipping of 15+ production codebases across distributed systems, APIs, and real-time architectures.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/[0.15] border border-white/[0.25] flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#a855f7] mt-1.5 shrink-0 shadow-[0_0_6px_#a855f7]" />
                <div>
                  <div className="text-xs font-bold text-white">B.Tech in Computer Science &amp; Engineering</div>
                  <div className="text-[11px] mono text-[#c084fc]">2021 – 2024 · MAKAUT Lateral Entry</div>
                  <div className="text-xs text-[#e2e8f0] mt-1">
                    Distributed systems, compiler design, relational databases, computational complexity.
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.15] border border-white/[0.25] flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#00d2ff] mt-1.5 shrink-0 shadow-[0_0_6px_#00d2ff]" />
                <div>
                  <div className="text-xs font-bold text-white">Diploma in Computer Science &amp; Technology</div>
                  <div className="text-[11px] mono text-[#38bdf8]">2018 – 2021 · WBSCTE Polytechnic</div>
                  <div className="text-xs text-[#e2e8f0] mt-1">
                    C/C++ systems programming, data structures, computer organization, digital logic.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-5 rounded-2xl flex items-center justify-between bg-white/[0.20] backdrop-blur-2xl border border-white/30 shadow-lg">
            <div>
              <div className="mono text-[10px] text-white/70 uppercase font-bold">Location &amp; Availability</div>
              <div className="text-sm font-bold text-white mt-0.5">{personal.location}</div>
            </div>
            <span className="mono text-xs text-[#10b981] font-bold px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-300/40">
              Open to Roles
            </span>
          </div>
        </div>

        {/* Right Column: Engineering Principles & Narrative (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Component Showcase Image Banner (No dark blackness) */}
          <div className="relative w-full aspect-[21/9] rounded-3xl overflow-hidden border-2 border-white/35 shadow-2xl group bg-purple-950/20">
            <Image
              src="/previews/showcase-bookend.webp"
              alt="Biswodip Goj — Shipped Software Architecture Fleet"
              fill
              className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 1024px) 100vw, 700px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#312e81]/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
              <span className="mono text-xs text-white font-bold px-3 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm">
                15+ Shipped Production Systems
              </span>
              <span className="mono text-xs text-[#c084fc] font-bold px-3 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm">
                CSE FOUNDATIONS
              </span>
            </div>
          </div>

          <div className="glass-panel p-7 sm:p-9 rounded-3xl space-y-5 bg-white/[0.20] backdrop-blur-3xl border border-purple-300/35 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-white tracking-tight">
              Software built for real humans, backed by deterministic architecture.
            </h2>
            <p className="text-sm sm:text-base text-[#f1f5f9] leading-relaxed">
              {personal.about}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/[0.15]">
              <div className="p-4 rounded-2xl bg-white/[0.15] border border-white/[0.25]">
                <div className="mono text-xs font-bold text-[#00d2ff] mb-1">
                  DESIGN BEFORE CODE
                </div>
                <p className="text-xs text-[#e2e8f0] leading-relaxed">
                  Explicit boundaries between client, edge runtime, and storage prevent costly rewrites and architectural regressions.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.15] border border-white/[0.25]">
                <div className="mono text-xs font-bold text-[#34d399] mb-1">
                  TYPED &amp; VERIFIED
                </div>
                <p className="text-xs text-[#e2e8f0] leading-relaxed">
                  Rigorous TypeScript contracts, Zod runtime schemas, and automated migration scripts ensure reliability in production.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Scope Banner */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/[0.20] backdrop-blur-2xl border border-white/30 shadow-lg">
            <div>
              <span className="mono text-[11px] font-bold uppercase text-[#00d2ff] tracking-wider">
                Full-Stack Delivery Scope
              </span>
              <p className="text-sm font-semibold text-white mt-0.5">
                From 120 FPS 3D graphics to transactional PostgreSQL row-level security.
              </p>
            </div>
            <a href="#work" className="btn-secondary-action text-xs shrink-0 py-2 px-4">
              <span>View Fleet</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
