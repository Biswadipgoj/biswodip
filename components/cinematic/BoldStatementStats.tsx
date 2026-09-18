'use client';

export default function BoldStatementStats() {
  return (
    <section
      id="rigor"
      className="relative w-full py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/[0.1]"
    >
      {/* ── FIXED TOP CAPTION HOOK ── */}
      <div className="sticky top-20 z-30 mb-8 w-full max-w-4xl mx-auto">
        <div className="glass-hud-pill flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00d2ff] animate-ping" />
            <span className="mono text-xs font-bold uppercase tracking-wider text-white">
              CSE RIGOR // PRODUCTION STATS
            </span>
            <span className="hidden sm:inline-block mono text-xs text-[#00d2ff]">
              · 6 YEARS DEDICATED COMPUTER SCIENCE
            </span>
          </div>
          <span className="mono text-xs text-[#10b981] px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 font-bold">
            VERIFIED BENCHMARKS
          </span>
        </div>
      </div>

      <div className="space-y-16">
        {/* ── BOLD STATEMENT MANIFESTO ── */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-white/20 shadow-2xl relative overflow-hidden">
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.08] border border-white/[0.15]">
              <span className="w-2 h-2 rounded-full bg-[#10b981]" />
              <span className="mono text-xs text-[#10b981] font-semibold tracking-wider uppercase">
                FORMAL COMPUTER SCIENCE RIGOR
              </span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight leading-[1.05]">
              ENGINEERED FROM FIRST PRINCIPLES.
              <span className="grad-text-vivid block mt-2">
                RELIABLE SOFTWARE UNDER PRODUCTION CONCURRENCY.
              </span>
            </h2>

            <p className="text-base text-[#cbd5e1] leading-relaxed max-w-3xl">
              Software is deterministic computer science. Every system I architect is grounded in formal foundations: asynchronous event loops, relational query execution plans, type-safe API boundaries, and network socket protocols.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs mono text-[#cbd5e1]">
              <span className="px-3.5 py-1.5 rounded-xl bg-white/[0.06] border border-white/[0.15] text-white font-medium">
                DIPLOMA IN CSE (2018–2021)
              </span>
              <span>+</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-white/[0.06] border border-white/[0.15] text-white font-medium">
                B.TECH IN CSE (2021–2024)
              </span>
              <span>=</span>
              <span className="px-3.5 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-[#00d2ff] font-bold">
                6 YEARS PRACTICAL COMPUTER SCIENCE RIGOR
              </span>
            </div>
          </div>
        </div>

        {/* ── BOLD STATS GRID (6 AUTHORITATIVE BENCHMARKS) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="glass-panel p-6 border-l-4 border-l-[#00d2ff]">
            <div className="flex items-center justify-between mb-3">
              <span className="mono text-xs font-bold text-[#00d2ff]">01 · DELIVERY</span>
              <span className="mono text-[10px] px-2 py-0.5 rounded-full bg-white/[0.08] text-[#cbd5e1]">
                PRODUCTION
              </span>
            </div>
            <div className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-2">
              15+ <span className="text-sm font-sans font-normal text-[#94a3b8]">Repositories</span>
            </div>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Complete full-stack applications with custom route controllers, typed databases, and zero placeholder templates.
            </p>
          </div>

          <div className="glass-panel p-6 border-l-4 border-l-[#10b981]">
            <div className="flex items-center justify-between mb-3">
              <span className="mono text-xs font-bold text-[#10b981]">02 · NETWORK</span>
              <span className="mono text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/60 text-[#10b981]">
                TELEPOINT MESH
              </span>
            </div>
            <div className="font-display font-extrabold text-4xl sm:text-5xl text-[#10b981] mb-2">
              &lt; 42 <span className="text-sm font-sans font-normal text-[#94a3b8]">ms</span>
            </div>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Sub-50ms message round-trip time via optimized WebSocket channels and non-blocking asynchronous event queues.
            </p>
          </div>

          <div className="glass-panel p-6 border-l-4 border-l-[#38bdf8]">
            <div className="flex items-center justify-between mb-3">
              <span className="mono text-xs font-bold text-[#38bdf8]">03 · SAFETY</span>
              <span className="mono text-[10px] px-2 py-0.5 rounded-full bg-white/[0.08] text-[#cbd5e1]">
                STATIC ANALYSIS
              </span>
            </div>
            <div className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-2">
              100% <span className="text-sm font-sans font-normal text-[#94a3b8]">Type-Safe</span>
            </div>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Strict TypeScript contracts, runtime Zod validators, and static synchronization with Prisma database models.
            </p>
          </div>

          <div className="glass-panel p-6 border-l-4 border-l-[#00d2ff]">
            <div className="flex items-center justify-between mb-3">
              <span className="mono text-xs font-bold text-[#00d2ff]">04 · GRAPHICS</span>
              <span className="mono text-[10px] px-2 py-0.5 rounded-full bg-white/[0.08] text-[#cbd5e1]">
                WEBGL ENGINE
              </span>
            </div>
            <div className="font-display font-extrabold text-4xl sm:text-5xl text-[#00d2ff] mb-2">
              120 <span className="text-sm font-sans font-normal text-[#94a3b8]">FPS Three.js</span>
            </div>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              ACES Filmic tonemapped shaders with optimized polygon draw calls, GPU batching, and zero layout thrashing.
            </p>
          </div>

          <div className="glass-panel p-6 border-l-4 border-l-[#fbbf24]">
            <div className="flex items-center justify-between mb-3">
              <span className="mono text-xs font-bold text-[#fbbf24]">05 · FOUNDATIONS</span>
              <span className="mono text-[10px] px-2 py-0.5 rounded-full bg-white/[0.08] text-[#cbd5e1]">
                ACADEMIA
              </span>
            </div>
            <div className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-2">
              6 <span className="text-sm font-sans font-normal text-[#94a3b8]">Years CSE</span>
            </div>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              3 years Polytechnic Diploma in Computer Science + 3 years Lateral B.Tech in CSE from Adamas University.
            </p>
          </div>

          <div className="glass-panel p-6 border-l-4 border-l-[#a855f7]">
            <div className="flex items-center justify-between mb-3">
              <span className="mono text-xs font-bold text-[#a855f7]">06 · UPTIME</span>
              <span className="mono text-[10px] px-2 py-0.5 rounded-full bg-purple-950/60 text-[#a855f7]">
                INFRASTRUCTURE
              </span>
            </div>
            <div className="font-display font-extrabold text-4xl sm:text-5xl text-white mb-2">
              99.9% <span className="text-sm font-sans font-normal text-[#94a3b8]">SLA Edge</span>
            </div>
            <p className="text-xs text-[#cbd5e1] leading-relaxed">
              Automated GitHub Actions CI/CD pipelines, edge serverless distribution via Vercel CDN, and connection pooling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
