"use client";

import React, { useState } from "react";

interface TechDetail {
  name: string;
  category: string;
  layer: string;
  color: string;
  bgColor: string;
  borderColor: string;
  role: string;
  benchmark: string;
  codeSnippet: string;
}

const techCatalog: TechDetail[] = [
  // 01 Frontend
  {
    name: "TypeScript",
    category: "01 Frontend",
    layer: "01 / Frontend",
    color: "#2563EB",
    bgColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    role: "Full-stack application architecture, strict compile-time types, and typed API boundaries.",
    benchmark: "Zero runtime overhead · Strict type coverage",
    codeSnippet: "type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };",
  },
  {
    name: "React & Next.js",
    category: "01 Frontend",
    layer: "01 / Frontend",
    color: "#0F172A",
    bgColor: "#F8FAFC",
    borderColor: "#CBD5E1",
    role: "Server components (RSC), static site generation, streaming hydration, and responsive layouts.",
    benchmark: "Sub-100ms first contentful paint · Zero client bundle bloat",
    codeSnippet: "export default async function Page() { const data = await fetchCached(); return <View {...data} />; }",
  },
  {
    name: "Tailwind CSS",
    category: "01 Frontend",
    layer: "01 / Frontend",
    color: "#0891B2",
    bgColor: "#ECFEFF",
    borderColor: "#A5F3FC",
    role: "Utility-first design systems, physical volumetric elevation, and responsive design tokens.",
    benchmark: "Zero runtime CSS parser · Purged single-digit KB stylesheets",
    codeSnippet: "className=\"card-volumetric p-6 flex flex-col justify-between shadow-card\"",
  },
  {
    name: "WebSockets & RTC",
    category: "01 Frontend",
    layer: "01 / Frontend",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    borderColor: "#DDD6FE",
    role: "Bi-directional real-time communication for collaborative editors and live system telemetry.",
    benchmark: "Sub-15ms peer-to-peer event propagation",
    codeSnippet: "socket.send(JSON.stringify({ type: 'CRDT_DELTA', payload: delta }));",
  },

  // 02 Backend & APIs
  {
    name: "Rust",
    category: "02 Backend & APIs",
    layer: "02 / Backend",
    color: "#EA580C",
    bgColor: "#FFF7ED",
    borderColor: "#FED7AA",
    role: "High-throughput network proxies, consensus engines, and memory-safe systems software.",
    benchmark: "Zero-cost abstractions · No GC pauses (< 0.1ms p99)",
    codeSnippet: "pub async fn handle_stream<T: AsyncRead + Unpin>(mut stream: T) -> Result<(), IoError>",
  },
  {
    name: "Go",
    category: "02 Backend & APIs",
    layer: "02 / Backend",
    color: "#0284C7",
    bgColor: "#F0F9FF",
    borderColor: "#BAE6FD",
    role: "Concurrent microservices, gRPC backends, and distributed worker queues.",
    benchmark: "Lightweight goroutines (~2KB initial stack) · Sub-millisecond GC",
    codeSnippet: "go func(job Job) { results <- process(job) }(currentJob)",
  },
  {
    name: "Python",
    category: "02 Backend & APIs",
    layer: "02 / Backend",
    color: "#D97706",
    bgColor: "#FFFBEB",
    borderColor: "#FDE68A",
    role: "Data pipelines, telemetry processing scripts, and automation tooling.",
    benchmark: "Rapid script execution · Rich scientific and analysis libraries",
    codeSnippet: "async def handle_telemetry(packet: bytes) -> dict: return parse_binary(packet)",
  },
  {
    name: "gRPC & Protobuf",
    category: "02 Backend & APIs",
    layer: "02 / Backend",
    color: "#4338CA",
    bgColor: "#EEF2FF",
    borderColor: "#C7D2FE",
    role: "Compact binary serialization and strongly-typed contract definitions for microservice RPCs.",
    benchmark: "8x smaller payload size compared to standard JSON",
    codeSnippet: "rpc SyncState (SyncRequest) returns (SyncResponse);",
  },

  // 03 DevOps & Cloud
  {
    name: "Linux POSIX & Bash",
    category: "03 DevOps & Cloud",
    layer: "03 / DevOps",
    color: "#059669",
    bgColor: "#ECFDF5",
    borderColor: "#A7F3D0",
    role: "POSIX system environments, daemon process supervisors, and shell automation scripts.",
    benchmark: "Direct OS syscalls · Deterministic shell scripting",
    codeSnippet: "systemctl status worker.service --no-pager",
  },
  {
    name: "Cloudflare Workers",
    category: "03 DevOps & Cloud",
    layer: "03 / DevOps",
    color: "#E11D48",
    bgColor: "#FFF1F2",
    borderColor: "#FECDD3",
    role: "Serverless edge compute deployed to 250+ global points of presence with V8 isolates.",
    benchmark: "0ms cold starts · Global p99 response under 10ms",
    codeSnippet: "export default { fetch: (req, env) => handleEdgeRouting(req, env) };",
  },
  {
    name: "Docker Containers",
    category: "03 DevOps & Cloud",
    layer: "03 / DevOps",
    color: "#0284C7",
    bgColor: "#F0F9FF",
    borderColor: "#BAE6FD",
    role: "Reproducible container builds, isolated application runtimes, and local multi-service testing.",
    benchmark: "Lightweight OCI containers · Strict cgroup resource limits",
    codeSnippet: "docker run --pids-limit 100 --memory 512m -d api_server",
  },

  // 04 Data & Tooling
  {
    name: "PostgreSQL",
    category: "04 Data & Tooling",
    layer: "04 / Data",
    color: "#1D4ED8",
    bgColor: "#EFF6FF",
    borderColor: "#BFDBFE",
    role: "Relational persistence, JSONB indexing, row-level concurrency locks, and transactional integrity.",
    benchmark: "ACID guarantees · BRIN indexing cuts time-series size by 85%",
    codeSnippet: "CREATE INDEX CONCURRENTLY ON logs USING brin(created_at);",
  },
  {
    name: "Redis",
    category: "04 Data & Tooling",
    layer: "04 / Data",
    color: "#DC2626",
    bgColor: "#FEF2F2",
    borderColor: "#FECACA",
    role: "In-memory caching, distributed rate limiters, session storage, and pub/sub channels.",
    benchmark: "Sub-millisecond read/write latency (~0.8ms) · 100K+ ops/sec",
    codeSnippet: "await redis.set(`session:${token}`, userId, 'EX', 3600);",
  },
  {
    name: "Raft Consensus",
    category: "04 Data & Tooling",
    layer: "04 / Data",
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    borderColor: "#DDD6FE",
    role: "Distributed leader election, log replication, and linearizable consistency across node clusters.",
    benchmark: "Majority quorum fault tolerance · Automated 150ms failover",
    codeSnippet: "fn commit_log_entries(&mut self, leader_commit: u64)",
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

  const categories = ["All", "01 Frontend", "02 Backend & APIs", "03 DevOps & Cloud", "04 Data & Tooling"];

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
    <section id="sec-005" className="section-wrap" aria-label="Technical Craft & System Layers">
      <header className="section-header">
        <div className="section-tag">{"005 // SYSTEM LAYERS & TECH STACK"}</div>
        <h2 className="section-title">The right tools. The whole picture.</h2>
        <p className="section-subtitle">
          From the interface you touch to the systems you don&apos;t see. A toolkit for taking ownership of the whole product across frontend, backend, devops, and data.
        </p>
      </header>

      {/* Main Grid: Interactive Technology Matrix & Memory Hierarchy (NO GENERIC CHART POSTER) */}
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
                  className={`px-3 py-1.5 rounded text-xs transition-all ${
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
                      {tech.layer}
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
                    {selectedTech.layer}
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
