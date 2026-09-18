'use client';

import Image from 'next/image';

type ProjectSpec = {
  name: string;
  slug: string;
  tagline: string;
  overview: string;
  architectureNote: string;
  image: string;
  url: string;
  repo?: string;
  stack: string[];
  badge: string;
  accent: string;
};

const otherProjects: ProjectSpec[] = [
  {
    name: 'Erpixa',
    slug: 'erpixa',
    tagline: 'Business management, finally without the bloat.',
    overview:
      'A modular, multi-tenant ERP platform built for small and mid-sized businesses. Dynamically configures CRM, Sales, Inventory, Accounting, and HR modules based on verified business type.',
    architectureNote:
      'PostgreSQL Row-Level Security ensures tenant isolation. Live KPI calculation engine executes real aggregate queries without mock fallbacks.',
    image: '/previews/erpixa.webp',
    url: 'https://erpixa.vercel.app/',
    repo: 'https://github.com/Biswadipgoj/Erpixa',
    stack: ['React', 'TypeScript', 'PostgreSQL', 'Supabase', 'Tailwind CSS'],
    badge: 'ENTERPRISE ARCHITECTURE',
    accent: '#00d2ff',
  },
  {
    name: 'Nexora',
    slug: 'nexora',
    tagline: 'Plan the work, watch it move, finish it together.',
    overview:
      'A calm command center for planning, tracking, and shipping engineering projects. Features kanban boards, list projections, keyboard-first command palette, and real-time collaboration.',
    architectureNote:
      'Isolated workspace channels with optimistic drag-and-drop state syncing. Native cross-platform desktop wrapper via Electron.',
    image: '/previews/nexora.webp',
    url: 'https://nexora-xi-rust.vercel.app/',
    repo: 'https://github.com/Biswadipgoj/nexora',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Electron', 'Tailwind CSS'],
    badge: 'COLLABORATION ENGINE',
    accent: '#38bdf8',
  },
  {
    name: 'Tripmate',
    slug: 'tripmate',
    tagline: 'Plan journeys that feel effortless.',
    overview:
      'A multi-step travel itinerary generator turning complex itineraries into clear, actionable timelines with persistent draft states.',
    architectureNote:
      'State-machine driven multistep flow with browser persistence and responsive layout transitions.',
    image: '/previews/tripmate.webp',
    url: 'https://trip-mu-coral.vercel.app/',
    stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    badge: 'EXPERIENCE FLOW',
    accent: '#10b981',
  },
];

export default function ProjectShowcase() {
  return (
    <section
      id="work"
      className="relative w-full py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/[0.08]"
    >
      {/* ── FIXED TOP CAPTION HOOK (STICKY HUD HEADER) ── */}
      <div className="sticky top-20 z-30 mb-8 w-full max-w-4xl mx-auto">
        <div className="glass-hud-pill flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00d2ff] animate-ping" />
            <span className="mono text-xs font-bold uppercase tracking-wider text-white">
              SHIPPED SUITE // ARCHITECTURE
            </span>
            <span className="hidden sm:inline-block mono text-xs text-[#00d2ff]">
              · ERP, WORKSPACES &amp; FLOWS
            </span>
          </div>
          <span className="mono text-xs text-[#10b981] px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 font-bold">
            3 SYSTEMS ONLINE
          </span>
        </div>
      </div>

      <div className="space-y-16">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <span className="mono text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.1] text-[#00d2ff]">
            03 · ADDITIONAL SHIPPED SYSTEMS
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-extrabold text-white mt-3">
            Modular Tooling, Command Centers, and User Flows
          </h2>
          <p className="text-sm md:text-base text-[#cbd5e1] mt-2">
            Every project represents working software tested against production environments with typed code and verified architectures.
          </p>
        </div>

        {/* Project Cards in Editorial Showcase Layout */}
        <div className="space-y-12">
          {otherProjects.map((project, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={project.name}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center glass-panel p-6 sm:p-10 shadow-2xl"
              >
                {/* Visual Screenshot Side (7 cols) */}
                <div
                  className={`lg:col-span-7 ${
                    isEven ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/35 shadow-2xl bg-purple-950/20">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      className="object-cover object-top hover:scale-[1.02] transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 680px"
                    />
                  </div>
                </div>

                {/* Information & Architecture Side (5 cols) */}
                <div
                  className={`lg:col-span-5 space-y-4 ${
                    isEven ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/[0.08] border border-white/[0.15]"
                      style={{ color: project.accent }}
                    >
                      {project.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    {project.name}
                  </h3>

                  <p className="text-sm font-semibold text-[#00d2ff]">
                    {project.tagline}
                  </p>

                  <p className="text-xs md:text-sm text-[#cbd5e1] leading-relaxed">
                    {project.overview}
                  </p>

                  {/* Architecture Detail Box */}
                  <div className="p-3.5 rounded-xl bg-white/[0.05] border border-white/[0.1]">
                    <div className="mono text-[10px] font-bold text-[#00d2ff] uppercase tracking-wider mb-1">
                      Architecture &amp; Data
                    </div>
                    <p className="text-xs text-[#cbd5e1] leading-relaxed">
                      {project.architectureNote}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.stack.map((tech) => (
                      <span key={tech} className="tech-tag-pill text-[11px]">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center gap-3 pt-2">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary-action text-xs py-2 px-4"
                    >
                      <span>Run {project.name}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary-action text-xs py-2 px-3.5"
                      >
                        <span>View Source</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── ENDING ON A BOLD STATEMENT / STATS SECTION ── */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.15]">
              <span className="w-2 h-2 rounded-full bg-[#00d2ff]" />
              <span className="mono text-xs text-[#00d2ff] font-bold tracking-wider uppercase">
                PRODUCTION INTEGRITY GUARANTEE
              </span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight leading-[1.05]">
              MODULAR ARCHITECTURE.
              <span className="grad-text-vivid block mt-2">
                TESTED UNDER REAL MULTI-TENANT CONCURRENCY.
              </span>
            </h3>

            <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed max-w-2xl">
              From small utility tools to multi-tenant ERP suites, every application is built with strict schema validation, persistent relational storage, and zero mock fallbacks.
            </p>

            {/* 4 Glassmorphic Benchmark Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.12]">
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.1]">
                <div className="mono text-[10px] text-[#94a3b8] uppercase">Data Isolation</div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#00d2ff] mt-1">100%</div>
                <div className="text-[10px] mono text-[#cbd5e1] mt-1">Postgres RLS</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.1]">
                <div className="mono text-[10px] text-[#94a3b8] uppercase">Sync Latency</div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#10b981] mt-1">&lt; 30ms</div>
                <div className="text-[10px] mono text-[#cbd5e1] mt-1">State Channels</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.1]">
                <div className="mono text-[10px] text-[#94a3b8] uppercase">Live Uptime</div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">99.9%</div>
                <div className="text-[10px] mono text-[#cbd5e1] mt-1">Edge Deployed</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.1]">
                <div className="mono text-[10px] text-[#94a3b8] uppercase">Code Standard</div>
                <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#a855f7] mt-1">Zero Slop</div>
                <div className="text-[10px] mono text-[#cbd5e1] mt-1">Typed Contracts</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
