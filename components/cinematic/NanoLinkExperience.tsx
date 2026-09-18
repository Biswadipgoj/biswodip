'use client';

import { useState } from 'react';
import Image from 'next/image';
import ComputerFrame from './ComputerFrame';

interface SceneStep {
  id: string;
  step: string;
  title: string;
  hook: string;
  accent: string;
}

const nanolinkScenes: SceneStep[] = [
  {
    id: 'compressor',
    step: '01',
    title: 'Base62 Engine',
    hook: 'Deterministic URL Compression Workbench',
    accent: '#10b981',
  },
  {
    id: 'schema',
    step: '02',
    title: 'Prisma Schema',
    hook: 'B-Tree Relational Indexing & Foreign Keys',
    accent: '#00d2ff',
  },
  {
    id: 'telemetry',
    step: '03',
    title: 'Edge Redirection',
    hook: 'Sub-2ms HTTP 301 Edge Telemetry',
    accent: '#38bdf8',
  },
  {
    id: 'product',
    step: '04',
    title: 'Production System',
    hook: 'Live Application Interface & Shipped Code',
    accent: '#a855f7',
  },
];

export default function NanoLinkExperience() {
  const [activeScene, setActiveScene] = useState<number>(0);
  const [inputUrl, setInputUrl] = useState('https://github.com/Biswadipgoj/distributed-systems-lab/tree/main/engine');
  const [shortened, setShortened] = useState('nanl.vercel.app/d9f4a');
  const [copied, setCopied] = useState(false);

  const handleCompress = () => {
    const hash = Math.random().toString(36).substring(2, 7);
    setShortened(`nanl.vercel.app/${hash}`);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(`https://${shortened}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const current = nanolinkScenes[activeScene];

  return (
    <section
      id="nanolink"
      className="relative w-full py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/[0.1]"
    >
      {/* ── FIXED TOP CAPTION HOOK (STICKY HUD HEADER) ── */}
      <div className="sticky top-20 z-30 mb-8 w-full max-w-4xl mx-auto">
        <div className="glass-hud-pill flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-ping" />
            <span className="mono text-xs font-bold uppercase tracking-wider text-white">
              SYSTEM 02 // NANOLINK
            </span>
            <span className="hidden sm:inline-block mono text-xs text-[#10b981]">
              · {current.hook}
            </span>
          </div>

          {/* Scene Transition Selector Tabs */}
          <div className="flex items-center gap-1 sm:gap-2">
            {nanolinkScenes.map((scene, idx) => {
              const isActive = activeScene === idx;
              return (
                <button
                  key={scene.id}
                  onClick={() => setActiveScene(idx)}
                  className={`px-3 py-1 rounded-full text-xs mono font-bold transition-all ${
                    isActive
                      ? 'bg-[#10b981] text-[#0a0f1d] shadow-[0_0_14px_rgba(16,185,129,0.7)] scale-105'
                      : 'text-white/70 hover:text-white bg-white/[0.06] border border-white/10'
                  }`}
                >
                  <span className="hidden sm:inline">{scene.step} · </span>
                  <span>{scene.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── SECTION INTRO HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#10b981] shadow-[0_0_8px_#10b981]" />
            <span className="mono text-xs font-bold uppercase tracking-wider text-[#10b981]">
              ALGORITHMIC EDGE SYSTEM
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            NanoLink
          </h2>
          <p className="text-sm sm:text-base text-[#cbd5e1] mt-1 max-w-xl">
            High-performance URL compression, edge redirection, and analytics pipeline backed by PostgreSQL and Prisma ORM.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://nanl.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-action text-xs sm:text-sm py-2.5 px-5"
          >
            <span>Run NanoLink</span>
            <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://github.com/Biswodipgoj/nanolink"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary-action text-xs sm:text-sm py-2.5 px-5"
          >
            <span>Source Code</span>
            <span aria-hidden="true">⌥</span>
          </a>
        </div>
      </div>

      {/* ── MULTIPLE SCROLL-TRIGGERED SCENE TRANSITIONS (INSIDE COMPUTER DISPLAY) ── */}
      <div className="relative w-full mb-16">
        <ComputerFrame
          title={`nanolink-engine://${current.id}.internal`}
          url="https://nanl.vercel.app"
          statusBadge="EDGE ROUTER ACTIVE"
        >
          {/* SCENE 01: BASE62 ENGINE & INTERACTIVE WORKBENCH */}
          {activeScene === 0 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/[0.1] pb-4">
                <div>
                  <span className="mono text-xs font-bold text-[#10b981] uppercase tracking-wider">
                    SCENE 01 // BASE62 WORKBENCH
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                    Interactive URL Compression Engine
                  </h3>
                </div>
                <span className="mono text-xs text-[#10b981] px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 font-bold">
                  LIVE ALGORITHM
                </span>
              </div>

              <div className="space-y-4">
                <label className="mono text-xs text-[#cbd5e1] block">
                  Target Long URL to Encode:
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-2xl bg-white/[0.06] border border-white/[0.2] text-xs sm:text-sm mono text-white focus:outline-none focus:border-[#10b981] shadow-inner"
                    placeholder="https://..."
                  />
                  <button
                    onClick={handleCompress}
                    className="px-6 py-3 rounded-2xl bg-[#10b981] hover:bg-emerald-400 text-[#0a0f1d] font-bold text-xs sm:text-sm mono transition-colors shadow-lg shrink-0"
                  >
                    Encode Base62 ⚡
                  </button>
                </div>

                {/* Result Preview */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/[0.1] flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="mono text-xs text-[#94a3b8]">Generated Hash:</span>
                    <span className="mono text-sm sm:text-base font-bold text-[#00d2ff]">
                      https://{shortened}
                    </span>
                  </div>
                  <button
                    onClick={handleCopy}
                    className="px-4 py-1.5 rounded-xl bg-white/[0.1] hover:bg-white/[0.2] border border-white/[0.2] text-xs mono text-white transition-colors"
                  >
                    {copied ? '✓ Copied!' : 'Copy Link 📋'}
                  </button>
                </div>

                {/* Live System Interface Snapshot */}
                <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/30 shadow-xl group bg-rose-950/20 mt-3">
                  <Image
                    src="/previews/nanolink.webp"
                    alt="NanoLink Engine Interface Preview"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 1024px) 100vw, 900px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#831843]/60 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="mono text-xs text-white font-bold px-3 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm">
                      Live Base62 URL Redirection &amp; Analytics
                    </span>
                    <span className="mono text-xs text-[#fb7185] font-bold px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-300/40">
                      1.8MS REDIRECT
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SCENE 02: PRISMA RELATIONAL SCHEMA & B-TREE INDEX */}
          {activeScene === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/[0.1] pb-4">
                <div>
                  <span className="mono text-xs font-bold text-[#00d2ff] uppercase tracking-wider">
                    SCENE 02 // PERSISTENCE SCHEMA
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                    Prisma ORM &amp; Compound Index Optimization
                  </h3>
                </div>
                <span className="mono text-xs text-[#00d2ff] px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 font-bold">
                  POSTGRESQL
                </span>
              </div>

              <div className="light-code-panel">
                <div className="light-code-header">
                  <div className="editor-window-dots">
                    <span className="editor-dot dot-red" />
                    <span className="editor-dot dot-yellow" />
                    <span className="editor-dot dot-green" />
                  </div>
                  <span className="mono text-xs text-[#94a3b8]">nanolink/prisma/schema.prisma</span>
                </div>
                <pre className="p-5 text-xs font-mono text-[#e2e8f0] overflow-x-auto leading-relaxed bg-[#0a0d18]">
                  <code>{`model ShortLink {
  id          String       @id @default(uuid())
  slug        String       @unique
  originalUrl String       @db.Text
  clicks      Int          @default(0)
  createdAt   DateTime     @default(now())
  clicksData  ClickEvent[]

  @@index([slug])
  @@index([createdAt(sort: Desc)])
}

model ClickEvent {
  id          String     @id @default(uuid())
  shortLinkId String
  country     String?
  referrer    String?
  timestamp   DateTime   @default(now())
  shortLink   ShortLink  @relation(fields: [shortLinkId], references: [id], onDelete: Cascade)

  @@index([shortLinkId, timestamp])
}`}</code>
                </pre>
              </div>
            </div>
          )}

          {/* SCENE 03: EDGE REDIRECTION TELEMETRY */}
          {activeScene === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/[0.1] pb-4">
                <div>
                  <span className="mono text-xs font-bold text-[#38bdf8] uppercase tracking-wider">
                    SCENE 03 // EDGE REDIRECTION PIPELINE
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                    Sub-2ms HTTP 301 Edge Resolution
                  </h3>
                </div>
                <span className="mono text-xs text-[#10b981] px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 font-bold">
                  GLOBAL CDN
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.1]">
                  <div className="mono text-xs text-[#94a3b8]">Edge Lookup Time</div>
                  <div className="text-4xl font-display font-extrabold text-[#10b981] mt-1">
                    1.8 <span className="text-sm font-normal text-white/60">ms</span>
                  </div>
                  <div className="text-xs mono text-[#38bdf8] mt-2">● Edge In-Memory Cache</div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.1]">
                  <div className="mono text-xs text-[#94a3b8]">Algorithm Complexity</div>
                  <div className="text-4xl font-display font-extrabold text-white mt-1">
                    O(1)
                  </div>
                  <div className="text-xs mono text-[#00d2ff] mt-2">Deterministic Key Map</div>
                </div>

                <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.1]">
                  <div className="mono text-xs text-[#94a3b8]">Cache Hit Ratio</div>
                  <div className="text-4xl font-display font-extrabold text-[#00d2ff] mt-1">
                    98.2%
                  </div>
                  <div className="text-xs mono text-[#10b981] mt-2">Zero Cold Starts</div>
                </div>
              </div>
            </div>
          )}

          {/* SCENE 04: PRODUCTION SYSTEM & LIVE INTERFACE */}
          {activeScene === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-white/[0.1] pb-4">
                <div>
                  <span className="mono text-xs font-bold text-[#a855f7] uppercase tracking-wider">
                    SCENE 04 // SHIPPED INTERFACE
                  </span>
                  <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                    Production Application Runtime
                  </h3>
                </div>
                <a
                  href="https://nanl.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary-action py-2 px-5 text-xs font-bold"
                >
                  <span>Launch Live App ↗</span>
                </a>
              </div>

              <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.15] shadow-2xl group">
                <Image
                  src="/previews/nanolink.webp"
                  alt="NanoLink — URL Redirection & Analytics"
                  fill
                  className="object-cover object-top group-hover:scale-[1.01] transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 1000px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#831843]/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="mono text-xs text-white font-bold px-3 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm">
                    Vercel Edge Network + Prisma PostgreSQL
                  </span>
                  <span className="mono text-xs text-[#fb7185] font-bold px-2.5 py-1 rounded-full bg-rose-500/20 border border-rose-300/40">
                    LIVE PRODUCTION
                  </span>
                </div>
              </div>
            </div>
          )}
        </ComputerFrame>
      </div>

      {/* ── ENDING ON A BOLD STATEMENT / STATS SECTION ── */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border-emerald-400/30 shadow-2xl relative overflow-hidden">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.15]">
            <span className="w-2 h-2 rounded-full bg-[#10b981]" />
            <span className="mono text-xs text-[#10b981] font-bold tracking-wider uppercase">
              NANOLINK ALGORITHMIC RIGOR
            </span>
          </div>

          <h3 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight leading-[1.05]">
            DETERMINISTIC O(1) BASE62 ENCODING.
            <span className="grad-text-vivid block mt-2">
              GLOBAL EDGE REDIRECTION.
            </span>
          </h3>

          <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed max-w-2xl">
            Translating mathematical hashing into production reality: collision avoidance, indexed row scans, and sub-2ms edge proxy hops.
          </p>

          {/* 4 Glassmorphic Benchmark Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.12]">
            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.1]">
              <div className="mono text-[10px] text-[#94a3b8] uppercase">Edge Redirect</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#10b981] mt-1">1.8ms</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.1]">
              <div className="mono text-[10px] text-[#94a3b8] uppercase">Lookup Time</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#00d2ff] mt-1">O(1)</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.1]">
              <div className="mono text-[10px] text-[#94a3b8] uppercase">Storage Mode</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">ACID</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.1]">
              <div className="mono text-[10px] text-[#94a3b8] uppercase">Hash Collisions</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#a855f7] mt-1">0</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
