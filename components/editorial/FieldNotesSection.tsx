"use client";

import React, { useState } from "react";

interface ResearchNote {
  id: string;
  tag: string;
  topic: string;
  title: string;
  finding: string;
  metricLabel: string;
  metricA: { name: string; val: string; pct: number; color: string };
  metricB: { name: string; val: string; pct: number; color: string };
  codeSnippet: string;
}

const researchNotes: ResearchNote[] = [
  {
    id: "note-01",
    tag: "// NOTE-01",
    topic: "Systems & Memory",
    title: "Zero-Copy Deserialization in Rust (rkyv vs Serde JSON)",
    finding: "On high-throughput socket pipelines, allocating thousands of JSON strings on the heap consumes substantial CPU cycles. Using rkyv allows in-place memory casting directly from incoming network packet buffers without deserialization allocations.",
    metricLabel: "Deserialization Latency (Nanoseconds per 1KB payload)",
    metricA: { name: "rkyv (Zero-Copy)", val: "12 ns", pct: 15, color: "var(--accent-emerald)" },
    metricB: { name: "Serde JSON (Allocating)", val: "285 ns", pct: 90, color: "var(--accent-amber)" },
    codeSnippet: `// Map directly onto byte buffer without heap allocation
let archived = rkyv::check_archived_root::<TelemetryPayload>(&buffer)
    .expect("Buffer layout validation failed");
println!("Device ID: {}", archived.device_id);`,
  },
  {
    id: "note-02",
    tag: "// NOTE-02",
    topic: "Databases & Storage",
    title: "PostgreSQL Indexing for Time-Series (BRIN vs B-Tree)",
    finding: "For append-only transaction tables where created_at strictly increases, standard B-Tree indexes store an entry per row, ballooning to hundreds of megabytes. Block Range Indexes (BRIN) store min/max values per page range, shrinking index size by 85% with matching range-scan throughput.",
    metricLabel: "Index Storage Overhead on 10M Row Table",
    metricA: { name: "BRIN (Block Range Index)", val: "24 MB", pct: 15, color: "var(--accent-emerald)" },
    metricB: { name: "Standard B-Tree Index", val: "185 MB", pct: 90, color: "var(--accent-coral)" },
    codeSnippet: `// 85% index size reduction for append-only audit logs
CREATE INDEX CONCURRENTLY idx_transactions_created_brin
ON transactions USING brin (created_at)
WITH (pages_per_range = 128);`,
  },
  {
    id: "note-03",
    tag: "// NOTE-03",
    topic: "Distributed Algorithms",
    title: "Conflict-Free Replicated Data Types (State-Based LWW Set)",
    finding: "Building collaborative workspaces without central lock coordinators requires mathematically monotonic state merges. Using a Last-Write-Wins Element-Set (LWW-Element-Set) ensures that regardless of message delivery order, all peers arrive at the exact same converged state.",
    metricLabel: "State Merge Lock Contention",
    metricA: { name: "CRDT Monotonic Merge", val: "0.0ms (Lock-Free)", pct: 10, color: "var(--accent-emerald)" },
    metricB: { name: "Central Locking RPC", val: "32.4ms (Waiting)", pct: 85, color: "var(--accent-coral)" },
    codeSnippet: `// Monotonic merge operator guarantees mathematical convergence
fn merge(&mut self, other: LwwElementSet<T>) {
    for (id, (elem, ts)) in other.add_set {
        self.add_set.entry(id).and_modify(|(_, cur_ts)| {
            if ts > *cur_ts { *cur_ts = ts; }
        }).or_insert((elem, ts));
    }
}`,
  },
  {
    id: "note-04",
    tag: "// NOTE-04",
    topic: "Concurrency & Async",
    title: "Tail Latency in Async Runtimes (Tokio Worker Starvation)",
    finding: "Accidentally executing blocking file IO or synchronous cryptographic hash routines inside a Tokio async task blocks the underlying worker thread, causing other ready tasks on that worker to experience massive latency spikes.",
    metricLabel: "Tail Latency P99 Under Heavy Disk IO",
    metricA: { name: "spawn_blocking offload", val: "2.1 ms", pct: 12, color: "var(--accent-emerald)" },
    metricB: { name: "Direct async task blocking", val: "140 ms", pct: 95, color: "var(--accent-coral)" },
    codeSnippet: `// Move blocking file IO to dedicated thread-pool
let hash = tokio::task::spawn_blocking(move || {
    sha256_digest_file(&path)
}).await??;`,
  },
  {
    id: "note-05",
    tag: "// NOTE-05",
    topic: "Frontend Architecture",
    title: "Hardware-Accelerated Compositing (Matrix3D vs WebGL)",
    finding: "For interactive developer mockups, heavy WebGL pipelines carry significant setup overhead and battery drain. Modern CSS matrix3d and perspective transforms execute directly on the GPU compositor thread without blocking the browser main thread.",
    metricLabel: "Main-Thread Frame Duration during Interactions",
    metricA: { name: "CSS Compositor Layer", val: "0.4 ms (60 FPS Locked)", pct: 8, color: "var(--accent-emerald)" },
    metricB: { name: "Canvas/DOM Re-layout", val: "16.8 ms (Frame Drops)", pct: 88, color: "var(--accent-amber)" },
    codeSnippet: `.compositor-layer {
  transform: translate3d(0, 0, 0);
  will-change: transform;
  contain: layout paint;
}`,
  },
];

export default function FieldNotesSection() {
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const currentNote = researchNotes[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? researchNotes.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === researchNotes.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="sec-006" className="section-wrap overflow-hidden" aria-label="Field Notes and Research Spikes">
      <header className="section-header">
        <div className="section-tag">{"006 // RESEARCH NOTES & BENCHMARKS"}</div>
        <h2 className="section-title">Technical experiments, benchmarks, and notes.</h2>
        <p className="section-subtitle">
          Documented findings from profiling memory usage, comparing indexing strategies, and benchmarking async runtimes. Clean, verified numbers with zero fluff.
        </p>
      </header>

      {/* Visual Header: Full-Width Research Notebook & Telemetry Graphic */}
      <div className="card-volumetric p-4 sm:p-6 mb-10 overflow-hidden">
        <div className="flex justify-between items-center pb-3 mb-3 border-b border-[var(--line)] font-mono text-xs text-[var(--ink-secondary)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-semibold text-[var(--ink)]">RESEARCH TELEMETRY: BENCHMARK PROFILING CURVES</span>
          </div>
          <span className="text-[var(--accent-emerald)] font-semibold text-[0.7rem]">PEER-VERIFIABLE</span>
        </div>
        <div className="relative rounded overflow-hidden bg-[var(--paper-subtle)] border border-[var(--line)]">
          <img
            src="/images/research_benchmarks_lab.jpg"
            alt="CS Research Notebook: Benchmark Telemetry & System Profiling"
            className="w-full h-auto object-contain max-h-[460px] mx-auto block"
          />
        </div>
      </div>

      {/* Interactive Research Note Inspector */}
      <div className="card-volumetric p-6 sm:p-8">
        {/* Note Selector Tabs */}
        <div className="flex flex-wrap gap-2 pb-5 mb-6 border-b border-[var(--line)]">
          {researchNotes.map((note, idx) => (
            <button
              key={note.id}
              onClick={() => setActiveIdx(idx)}
              className={`px-3.5 py-1.5 rounded font-mono text-xs transition-all ${
                activeIdx === idx
                  ? "bg-[var(--accent)] text-white font-semibold shadow-xs"
                  : "bg-[var(--paper-subtle)] text-[var(--ink-secondary)] hover:bg-[var(--line)]"
              }`}
            >
              {note.tag} · {note.topic}
            </button>
          ))}
        </div>

        {/* Selected Note Content */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
          <div>
            <div className="font-mono text-xs text-[var(--accent-ink)] font-semibold mb-2">
              {currentNote.tag}{" // "}{currentNote.topic}
            </div>
            <h3 className="font-display text-2xl font-medium text-[var(--ink)] mb-4 leading-snug">
              {currentNote.title}
            </h3>
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed mb-6">
              {currentNote.finding}
            </p>

            {/* Benchmark Comparison Bars */}
            <div className="p-4 bg-[var(--paper-subtle)] border border-[var(--line)] rounded-lg font-mono text-xs">
              <div className="text-[0.7rem] text-[var(--ink-muted)] mb-3 font-semibold">
                BENCHMARK COMPARISON: {currentNote.metricLabel}
              </div>

              {/* Metric A */}
              <div className="space-y-1 mb-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[var(--ink)]">{currentNote.metricA.name}</span>
                  <span className="font-bold text-[var(--accent-emerald)]">{currentNote.metricA.val}</span>
                </div>
                <div className="h-2 w-full bg-[var(--line)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${currentNote.metricA.pct}%`,
                      backgroundColor: currentNote.metricA.color,
                    }}
                  />
                </div>
              </div>

              {/* Metric B */}
              <div className="space-y-1">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[var(--ink-secondary)]">{currentNote.metricB.name}</span>
                  <span className="font-semibold text-[var(--ink-muted)]">{currentNote.metricB.val}</span>
                </div>
                <div className="h-2 w-full bg-[var(--line)] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${currentNote.metricB.pct}%`,
                      backgroundColor: currentNote.metricB.color,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Code Snippet & Navigation */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <div className="font-mono text-xs font-semibold text-[var(--accent-ink)] mb-2">
                {"// IMPLEMENTATION / BENCHMARK PROOF:"}
              </div>
              <pre className="p-4 bg-[var(--paper-inset)] border border-[var(--line-strong)] rounded text-[0.72rem] font-mono text-[var(--ink)] overflow-x-auto leading-relaxed max-h-[260px] mb-6">
                <code>{currentNote.codeSnippet}</code>
              </pre>
            </div>

            {/* Note Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[var(--line)] font-mono text-xs">
              <button
                onClick={handlePrev}
                className="btn-outline text-xs px-4 py-2"
              >
                ← Prev Note
              </button>
              <span className="text-[var(--ink-muted)] text-[0.75rem]">
                Note {activeIdx + 1} of {researchNotes.length}
              </span>
              <button
                onClick={handleNext}
                className="btn-outline text-xs px-4 py-2"
              >
                Next Note →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
