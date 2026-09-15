"use client";

import React, { useState } from "react";

interface TechDetail {
  name: string;
  category: string;
  color: string;
  bgColor: string;
  borderColor: string;
  role: string;
  benchmark: string;
  codeSnippet: string;
}

const techCatalog: TechDetail[] = [
  {
    name: "TypeScript",
    category: "Languages",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    role: "Full-stack application architecture, strict compile-time types, and React client interfaces.",
    benchmark: "Zero runtime overhead · 100% strict type coverage",
    codeSnippet: "type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };",
  },
  {
    name: "Rust",
    category: "Languages",
    color: "#EA580C",
    bgColor: "#FFF7ED",
    borderColor: "#FED7AA",
    role: "High-throughput network proxies, consensus engines, and memory-safe systems software.",
    benchmark: "Zero-cost abstractions · No GC pauses (< 0.1ms p99)",
    codeSnippet: "pub async fn handle_stream<T: AsyncRead + Unpin>(mut stream: T) -> Result<(), IoError>",
  },
  {
    name: "Go",
    category: "Languages",
    color: "#0891B2",
    bgColor: "#ECFEFF",
    borderColor: "#A5F3FC",
    role: "Concurrent microservices, gRPC backends, and distributed worker queues.",
    benchmark: "Lightweight goroutines (~2KB initial stack) · Sub-millisecond GC",
    codeSnippet: "go func(job Job) { results <- process(job) }(currentJob)",
  },
  {
    name: "PostgreSQL",
    category: "Databases",
    color: "#1D4ED8",
    bgColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    role: "Relational persistence, JSONB indexing, row-level concurrency locks, and transactional integrity.",
    benchmark: "ACID guarantees · BRIN indexing cuts time-series size by 85%",
    codeSnippet: "CREATE INDEX CONCURRENTLY ON logs USING brin(created_at);",
  },
  {
    name: "Redis",
    category: "Databases",
    color: "#DC2626",
    bgColor: "#FEF2F2",
    borderColor: "#FECACA",
    role: "In-memory caching, distributed rate limiters, session storage, and pub/sub channels.",
    benchmark: "Sub-millisecond read/write latency (~0.8ms) · 100K+ ops/sec",
    codeSnippet: "await redis.set(`session:${token}`, userId, 'EX', 3600);",
  },
  {
    name: "Cloudflare Workers",
    category: "Distributed Systems",
    color: "#D97706",
    bgColor: "#FFFBEB",
    borderColor: "#FDE68A",
    role: "Serverless edge compute deployed to 250+ global points of presence with V8 isolates.",
    benchmark: "0ms cold starts · Worldwide p99 response under 10ms",
    codeSnippet: "export default { fetch: (req, env) => handleEdgeRouting(req, env) };",
  },
  {
    name: "Raft Consensus",
    category: "Distributed Systems",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    borderColor: "#DDD6FE",
    role: "Distributed leader election, log replication, and linearizable consistency across node clusters.",
    benchmark: "Majority quorum fault tolerance · Automated 150ms failover",
    codeSnippet: "fn commit_log_entries(&mut self, leader_commit: u64)",
  },
  {
    name: "Linux & Docker",
    category: "Tooling & Infrastructure",
    color: "#059669",
    bgColor: "#ECFDF5",
    borderColor: "#A7F3D0",
    role: "POSIX system environments, containerized deployments, automated CI pipelines, and bash scripting.",
    benchmark: "Reproducible OCI container builds · Strict cgroup resource limits",
    codeSnippet: "docker run --pids-limit 100 --memory 512m -d api_server",
  },
];

interface CacheLine {
  level: string;
  size: string;
  latency: string;
  detail: string;
}

const cacheHierarchy: CacheLine[] = [
  { level: "L1 Data Cache", size: "32 KB / core", latency: "~1.2 ns", detail: "Single-cycle access for immediate instruction operands." },
  { level: "L2 Unified Cache", size: "1 MB / core", latency: "~3.8 ns", detail: "Non-inclusive intermediate cache for fast loop variables." },
  { level: "L3 Shared Cache", size: "32 MB pool", latency: "~11.5 ns", detail: "Cross-core coherent cache for synchronized memory arenas." },
  { level: "Main Memory (DRAM)", size: "32 GB DDR5", latency: "~52.0 ns", detail: "Paged virtual memory backed by OS page tables." },
];

export default function SystemCraftSection() {
  const [selectedTech, setSelectedTech] = useState<TechDetail>(techCatalog[0]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lastCacheEvent, setLastCacheEvent] = useState<string>("Read Hit @ 0x7FFF0040 (L1 Cache · 1.1ns)");
  const [hitRate, setHitRate] = useState<number>(95.8);

  const categories = ["All", "Languages", "Distributed Systems", "Databases", "Tooling & Infrastructure"];

  const filteredTech = activeCategory === "All" 
    ? techCatalog 
    : techCatalog.filter((t) => t.category === activeCategory);

  const handleSimulateHit = () => {
    const lat = (1.0 + Math.random() * 0.4).toFixed(1);
    const addr = "0x" + Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, "0");
    setLastCacheEvent(`Read Hit @ ${addr} (L1 Cache · ${lat}ns)`);
    setHitRate((prev) => Math.min(99.4, Number((prev + 0.1).toFixed(1))));
  };

  const handleSimulateMiss = () => {
    const lat = (48 + Math.random() * 8).toFixed(1);
    const addr = "0x" + Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, "0");
    setLastCacheEvent(`Cache Miss! Paged DRAM @ ${addr} (${lat}ns)`);
    setHitRate((prev) => Math.max(88.0, Number((prev - 0.4).toFixed(1))));
  };

  return (
    <section id="sec-005" className="section-wrap" aria-label="Technical Craft & Technology Ecosystem">
      <header className="section-header">
        <div className="section-tag">{"005 // TECH STACK & SYSTEM CRAFT"}</div>
        <h2 className="section-title">Core technologies, protocols, and memory models.</h2>
        <p className="section-subtitle">
          An interactive software ecosystem built around high concurrency, type safety, and predictable latency. Click any technology to inspect its role and benchmark figures.
        </p>
      </header>

      {/* Hero Visual: Full-Width Colorful Tech Stack Ecosystem Graphic */}
      <div className="card-volumetric p-4 sm:p-6 mb-10 overflow-hidden">
        <div className="flex justify-between items-center pb-3 mb-3 border-b border-[var(--line)] font-mono text-xs text-[var(--ink-secondary)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-semibold text-[var(--ink)]">INTERCONNECTED RUNTIME & LANGUAGE ECOSYSTEM</span>
          </div>
          <span className="text-[var(--accent-emerald)] font-semibold text-[0.7rem]">100% SOFTWARE ARCHITECTURE</span>
        </div>
        <div className="relative rounded overflow-hidden bg-[var(--paper-subtle)] border border-[var(--line)]">
          <img
            src="/images/tech_stack_ecosystem.jpg"
            alt="Modern Software Engineering Tech Stack Matrix"
            className="w-full h-auto object-contain max-h-[460px] mx-auto block"
          />
        </div>
      </div>

      {/* Main Grid: Interactive Technology Matrix & Memory Hierarchy */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
        {/* Left: Interactive Tech Matrix */}
        <div className="card-volumetric p-6 flex flex-col justify-between">
          <div>
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pb-4 mb-5 border-b border-[var(--line)] font-mono text-xs">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1 rounded text-xs transition-all ${
                    activeCategory === cat
                      ? "bg-[var(--ink)] text-white font-medium"
                      : "bg-[var(--paper-subtle)] text-[var(--ink-secondary)] hover:bg-[var(--line)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Tech Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {filteredTech.map((tech) => {
                const isSelected = selectedTech.name === tech.name;
                return (
                  <button
                    key={tech.name}
                    onClick={() => setSelectedTech(tech)}
                    className="p-3 rounded border text-left transition-all"
                    style={{
                      backgroundColor: isSelected ? tech.bgColor : "var(--paper-elevated)",
                      borderColor: isSelected ? tech.color : "var(--line)",
                      boxShadow: isSelected ? "0 4px 12px rgba(17,20,26,0.06)" : "none",
                    }}
                  >
                    <div className="font-mono text-xs font-bold" style={{ color: tech.color }}>
                      {tech.name}
                    </div>
                    <div className="text-[0.68rem] text-[var(--ink-muted)] truncate mt-1">
                      {tech.category}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Tech Inspector Panel */}
            <div
              className="p-5 rounded-lg border transition-all"
              style={{
                backgroundColor: selectedTech.bgColor,
                borderColor: selectedTech.borderColor,
              }}
            >
              <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: selectedTech.color }}
                  />
                  <h3 className="font-display text-lg font-semibold text-[var(--ink)]">
                    {selectedTech.name}
                  </h3>
                  <span className="font-mono text-[0.7rem] px-2 py-0.5 rounded bg-white/70 border border-[var(--line)] text-[var(--ink-secondary)]">
                    {selectedTech.category}
                  </span>
                </div>
                <div className="font-mono text-xs font-semibold" style={{ color: selectedTech.color }}>
                  {selectedTech.benchmark}
                </div>
              </div>

              <p className="text-sm text-[var(--ink)] leading-relaxed mb-4">
                {selectedTech.role}
              </p>

              <div className="font-mono text-xs">
                <div className="text-[0.68rem] text-[var(--ink-muted)] mb-1">
                  {"// REPRESENTATIVE SYNTAX & USAGE:"}
                </div>
                <pre className="p-3 bg-white/80 border border-[var(--line)] rounded text-[0.72rem] overflow-x-auto text-[var(--ink)]">
                  <code>{selectedTech.codeSnippet}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Computer Science Memory Hierarchy Simulator */}
        <div className="card-volumetric p-6 font-mono">
          <div className="flex justify-between items-center pb-4 mb-4 border-b border-[var(--line)]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-ink)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <span>SOFTWARE CACHE & MEMORY HIERARCHY</span>
            </div>
            <div className="text-xs text-[var(--accent-emerald)] font-semibold">
              HIT RATE: {hitRate}%
            </div>
          </div>

          {/* Cache Lines */}
          <div className="space-y-3 mb-6">
            {cacheHierarchy.map((item, idx) => (
              <div
                key={idx}
                className="p-3 bg-[var(--paper-subtle)] border border-[var(--line)] rounded"
              >
                <div className="flex justify-between items-center text-xs mb-1">
                  <span className="font-semibold text-[var(--ink)]">{item.level}</span>
                  <span className="text-[var(--accent)] font-semibold">{item.latency}</span>
                </div>
                <div className="flex justify-between items-center text-[0.7rem] text-[var(--ink-muted)]">
                  <span>{item.size}</span>
                  <span>{item.detail}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Real-Time Event Log */}
          <div className="p-3 bg-[var(--paper-subtle)] border border-[var(--line)] rounded text-xs mb-4">
            <div className="text-[0.68rem] text-[var(--ink-muted)] mb-1">LAST MEMORY EVENT:</div>
            <div className="text-[var(--ink)] font-semibold break-all">
              {lastCacheEvent}
            </div>
          </div>

          {/* Simulator Actions */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleSimulateHit}
              className="px-3 py-2 bg-[var(--paper-elevated)] border border-[var(--line)] rounded text-xs hover:border-[var(--accent)] text-[var(--ink)] transition-all font-semibold"
            >
              Simulate L1 Cache Hit
            </button>
            <button
              onClick={handleSimulateMiss}
              className="px-3 py-2 bg-[var(--paper-elevated)] border border-[var(--line)] rounded text-xs hover:border-amber-500 text-[var(--ink)] transition-all font-semibold"
            >
              Simulate DRAM Page Miss
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
