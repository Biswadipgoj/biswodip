"use client";

import React, { useState } from "react";

interface ProjectItem {
  id: string;
  fileTag: string;
  status: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  tags: string[];
  metrics: { label: string; val: string }[];
  architectureBreakdown: {
    layer: string;
    detail: string;
  }[];
  codeSnippet: string;
}

const projects: ProjectItem[] = [
  {
    id: "erpixa",
    fileTag: "src/systems/erpixa-erp.rs",
    status: "● PRODUCTION BUILD",
    title: "Erpixa Enterprise Resource Platform",
    subtitle: "Transactional accounting, inventory ledgers & relational data pipeline",
    description: "Full-stack enterprise application with inventory tracking, customer invoicing, and transactional double-entry accounting. Handles concurrent order placement with PostgreSQL row-level locks and strict isolation.",
    imageSrc: "/images/project_erpixa_erp.jpg",
    tags: ["Rust", "PostgreSQL", "Next.js", "Redis", "Row-Level Locks"],
    metrics: [
      { label: "Throughput", val: "8,500 tx/sec" },
      { label: "Isolation", val: "Serializable / Row-Locks" },
      { label: "Audit Log", val: "100% Append-Only" },
    ],
    architectureBreakdown: [
      { layer: "Ingress & Gateway", detail: "Next.js frontend communicating with a Rust Axum API gateway over typed JSON/Protobuf." },
      { layer: "Transactional Core", detail: "Double-entry bookkeeping engine with strict balance invariants and automated reconciliation." },
      { layer: "Database Storage", detail: "PostgreSQL relational schemas with FOR UPDATE row-level locking to prevent concurrent inventory overselling." },
      { layer: "Caching Layer", detail: "Redis distributed caches for high-frequency stock level queries and active user sessions." },
    ],
    codeSnippet: `// Rust Axum transaction with row-level lock
async fn reserve_inventory(
    State(pool): State<PgPool>,
    Json(payload): Json<OrderPayload>
) -> Result<Response, AppError> {
    let mut tx = pool.begin().await?;
    let item = sqlx::query!(
        "SELECT stock_qty FROM inventory_items WHERE id = $1 FOR UPDATE",
        payload.item_id
    ).fetch_one(&mut *tx).await?;
    
    if item.stock_qty < payload.quantity {
        return Err(AppError::InsufficientStock);
    }
    tx.commit().await?;
    Ok(StatusCode::OK.into_response())
}`,
  },
  {
    id: "nanolink",
    fileTag: "src/edge/nanolink-mesh.ts",
    status: "● OPEN SOURCE",
    title: "NanoLink Global Edge URL & Telemetry Mesh",
    subtitle: "Sub-10ms Anycast DNS routing & distributed key-value caching",
    description: "Distributed redirect engine deployed across 250+ Cloudflare Worker edge nodes. Resolves vanity short links from edge-local memory caches with real-time analytics aggregation.",
    imageSrc: "/images/project_nanolink_edge.jpg",
    tags: ["TypeScript", "Cloudflare Workers", "KV Store", "Anycast DNS", "Edge Analytics"],
    metrics: [
      { label: "P99 Edge Latency", val: "6.8ms" },
      { label: "Global Edge PoPs", val: "250+ Locations" },
      { label: "Cache Hit Rate", val: "99.4%" },
    ],
    architectureBreakdown: [
      { layer: "Anycast Ingress", detail: "Client requests hit the nearest geographic Cloudflare edge PoP with BGP routing." },
      { layer: "Worker Execution", detail: "V8 isolate executes URL rewrite and extraction logic in <1ms without cold starts." },
      { layer: "Global KV Cache", detail: "Local edge cache lookup avoids round-trips to the origin server for 99.4% of traffic." },
      { layer: "Click Stream Telemetry", detail: "Asynchronous background telemetry emits geo-location, referrers, and latency metrics." },
    ],
    codeSnippet: `export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);
    
    // Sub-10ms Edge KV Cache Resolution
    const destination = await env.SHORT_LINKS.get(key, { cacheTtl: 3600 });
    if (destination) {
      env.TELEMETRY.writeDataPoint({ blobs: [key, request.cf?.country || "XX"] });
      return Response.redirect(destination, 301);
    }
    return new Response("Not Found", { status: 404 });
  }
};`,
  },
  {
    id: "nexora",
    fileTag: "src/apps/nexora-collab.tsx",
    status: "● ACTIVE RELEASE",
    title: "Nexora Collaborative Real-Time Suite",
    subtitle: "Conflict-Free Replicated Data Types & peer-to-peer WebSocket sync",
    description: "Real-time collaborative canvas and document workspace. Uses CRDT lattices and state vector clocks so multiple distributed peers can draw, edit, and move objects concurrently with 0 merge conflicts.",
    imageSrc: "/images/project_nexora_crdt.jpg",
    tags: ["TypeScript", "CRDT Lattices", "WebSockets", "Vector Clocks", "Next.js"],
    metrics: [
      { label: "Conflict Rate", val: "0.00% (Guaranteed)" },
      { label: "Sync Latency", val: "< 15ms P2P" },
      { label: "Topology", val: "Mesh / Peer-to-Peer" },
    ],
    architectureBreakdown: [
      { layer: "Canvas UI", detail: "Hardware-accelerated HTML5 Canvas with fluid multi-pointer rendering and interpolation." },
      { layer: "State Convergence", detail: "State-based LWW-Element-Set ensuring mathematical commutativity and associativity on all merges." },
      { layer: "WebSocket Mesh", detail: "High-frequency delta broadcasting over persistent bidirectional WebSocket channels." },
      { layer: "Vector Clocks", detail: "Causal ordering tracking to deterministically order concurrent client mutations." },
    ],
    codeSnippet: `// Monotonic LWW-Element-Set Merge Operation
class StateCRDT<T> {
  private state: Map<string, { value: T; timestamp: number }> = new Map();

  merge(incoming: Map<string, { value: T; timestamp: number }>): void {
    for (const [key, inc] of incoming) {
      const current = this.state.get(key);
      if (!current || inc.timestamp > current.timestamp) {
        this.state.set(key, inc); // Monotonic last-write-wins merge
      }
    }
  }
}`,
  },
  {
    id: "kestrel",
    fileTag: "src/consensus/kestrel-kv.rs",
    status: "● SYSTEMS CORE",
    title: "Kestrel Distributed Key-Value Store",
    subtitle: "In-memory Raft consensus algorithm & partitioned quorum engine in Rust",
    description: "High-performance replicated key-value storage engine implemented in Rust. Implements the full Raft consensus protocol: automated leader election, log replication via AppendEntries RPCs, and state machine commits.",
    imageSrc: "/images/project_kestrel_raft.jpg",
    tags: ["Rust", "Raft Consensus", "Tokio Async", "gRPC / Protobuf", "State Machine"],
    metrics: [
      { label: "Election Timeout", val: "150ms – 300ms" },
      { label: "Quorum", val: "Majority (3/5 Nodes)" },
      { label: "Consistency", val: "Strict Linearizable" },
    ],
    architectureBreakdown: [
      { layer: "Consensus Engine", detail: "Leader election state machine with randomized heartbeat timers and election terms." },
      { layer: "Replication RPCs", detail: "AppendEntries and RequestVote gRPC channels communicating asynchronously via Tokio." },
      { layer: "Log Compaction", detail: "Snapshotting state machine to prune committed entries and bound memory growth." },
      { layer: "Partition Tolerance", detail: "Safe isolation when network partitions occur; only majority quorums accept writes." },
    ],
    codeSnippet: `// Raft AppendEntries RPC Handler in Rust
async fn handle_append_entries(
    &mut self,
    req: AppendEntriesRequest
) -> AppendEntriesResponse {
    if req.term < self.current_term {
        return AppendEntriesResponse { term: self.current_term, success: false };
    }
    self.reset_election_timer();
    if !self.log_matches(req.prev_log_index, req.prev_log_term) {
        return AppendEntriesResponse { term: self.current_term, success: false };
    }
    self.append_entries(req.entries);
    self.commit_index = req.leader_commit.min(self.last_log_index());
    AppendEntriesResponse { term: self.current_term, success: true }
}`,
  },
];

export default function WorkSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section id="sec-003" className="section-wrap" aria-label="Selected Production Systems">
      <header className="section-header">
        <div className="section-tag">{"003 // PROJECTS & ARCHITECTURE"}</div>
        <h2 className="section-title">Production systems, APIs, and tools I have built.</h2>
        <p className="section-subtitle">
          Each project is engineered with concrete performance guarantees, typed boundaries, and clear architectural diagrams. Click any card to inspect the full architecture blueprint.
        </p>
      </header>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {projects.map((proj) => (
          <article
            key={proj.id}
            className="card-volumetric flex flex-col overflow-hidden group cursor-pointer"
            onClick={() => setSelectedProject(proj)}
          >
            {/* Card Header Bar */}
            <div className="px-5 py-3 border-b border-[var(--line)] bg-[var(--paper-subtle)] flex justify-between items-center font-mono text-xs text-[var(--ink-secondary)]">
              <span>{"// "}{proj.fileTag}</span>
              <span className="text-[0.7rem] text-[var(--accent-emerald)] font-semibold">{proj.status}</span>
            </div>

            {/* Architecture Image Stage */}
            <div className="relative h-64 overflow-hidden bg-[var(--paper-inset)] border-b border-[var(--line)] flex items-center justify-center">
              <img
                src={proj.imageSrc}
                alt={proj.title}
                className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(17,20,26,0.55)] via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              <div className="absolute bottom-3 left-4 right-4 flex justify-between items-center text-white font-mono text-xs">
                <span className="text-[0.72rem] tracking-wide font-medium bg-[rgba(17,20,26,0.7)] px-2.5 py-1 rounded backdrop-blur-sm border border-white/20">
                  {proj.subtitle}
                </span>
                <span className="text-[0.75rem] font-semibold text-emerald-300 bg-[rgba(17,20,26,0.7)] px-2.5 py-1 rounded backdrop-blur-sm border border-white/20">
                  Click to Inspect Blueprint ↗
                </span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-7 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="font-display text-2xl font-medium text-[var(--ink)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-sm text-[var(--ink-secondary)] leading-relaxed mb-6">
                  {proj.description}
                </p>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-2 p-3 bg-[var(--paper-subtle)] border border-[var(--line)] rounded mb-5 font-mono text-xs">
                {proj.metrics.map((m, mIdx) => (
                  <div key={mIdx}>
                    <div className="text-[0.65rem] text-[var(--ink-muted)]">{m.label}</div>
                    <div className="font-semibold text-[var(--ink)] text-[0.75rem] mt-0.5">{m.val}</div>
                  </div>
                ))}
              </div>

              {/* Tech Badges */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--line)]">
                <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 bg-[var(--paper-subtle)] border border-[var(--line)] rounded text-[var(--ink)] text-[0.7rem]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="font-mono text-xs text-[var(--accent)] font-semibold group-hover:translate-x-1 transition-transform">
                  Inspect Architecture →
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Architecture Inspector Modal */}
      {selectedProject && (
        <div
          className="modal-backdrop"
          onClick={() => setSelectedProject(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="modal-dialog p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-start pb-4 mb-6 border-b border-[var(--line)]">
              <div>
                <div className="font-mono text-xs text-[var(--accent-ink)] font-semibold mb-1">
                  {"// "}{selectedProject.fileTag} · SYSTEM ARCHITECTURE
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-medium text-[var(--ink)]">
                  {selectedProject.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="px-3 py-1.5 bg-[var(--paper-subtle)] border border-[var(--line)] rounded font-mono text-xs hover:bg-[var(--line)] text-[var(--ink)] transition-all"
                aria-label="Close Architecture Modal"
              >
                ✕ Close [ESC]
              </button>
            </div>

            {/* High-Resolution Architecture Graphic */}
            <div className="rounded-lg overflow-hidden border border-[var(--line)] bg-[var(--paper-subtle)] mb-6 shadow-sm">
              <img
                src={selectedProject.imageSrc}
                alt={selectedProject.title}
                className="w-full h-auto object-contain max-h-[520px] mx-auto block"
              />
            </div>

            {/* Architectural Layer Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="font-mono text-xs font-semibold text-[var(--accent-ink)] mb-3">
                  {"// ARCHITECTURAL LAYERS & DATA FLOW"}
                </div>
                <div className="space-y-3">
                  {selectedProject.architectureBreakdown.map((layer, lIdx) => (
                    <div
                      key={lIdx}
                      className="p-3 bg-[var(--paper-subtle)] border border-[var(--line)] rounded text-xs"
                    >
                      <div className="font-mono font-semibold text-[var(--ink)] mb-1">
                        {layer.layer}
                      </div>
                      <div className="text-[var(--ink-secondary)] leading-relaxed">
                        {layer.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code / Protocol Core */}
              <div>
                <div className="font-mono text-xs font-semibold text-[var(--accent-ink)] mb-3">
                  {"// CORE PROTOCOL / RUNTIME IMPLEMENTATION"}
                </div>
                <pre className="p-4 bg-[var(--paper-inset)] border border-[var(--line-strong)] rounded text-[0.72rem] font-mono text-[var(--ink)] overflow-x-auto leading-relaxed max-h-[280px]">
                  <code>{selectedProject.codeSnippet}</code>
                </pre>

                {/* Key Metrics */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {selectedProject.metrics.map((m, mIdx) => (
                    <div key={mIdx} className="p-2.5 bg-[var(--paper-subtle)] border border-[var(--line)] rounded font-mono text-xs">
                      <div className="text-[0.65rem] text-[var(--ink-muted)]">{m.label}</div>
                      <div className="font-semibold text-[var(--accent-ink)] text-xs mt-0.5">{m.val}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-[var(--line)] flex justify-between items-center font-mono text-xs text-[var(--ink-muted)]">
              <span>Status: {selectedProject.status}</span>
              <button
                onClick={() => setSelectedProject(null)}
                className="btn-primary text-xs py-2 px-4"
              >
                Done Viewing Blueprint
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
