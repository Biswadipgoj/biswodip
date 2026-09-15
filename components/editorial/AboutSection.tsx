"use client";

import React, { useEffect, useState } from "react";
import { personal } from "@/lib/data";

interface ExecutionStage {
  stage: string;
  instr: string;
  context: string;
  status: string;
}

export default function AboutSection() {
  const [cycle, setCycle] = useState<number>(4120);
  const [activeTab, setActiveTab] = useState<"pipeline" | "architecture">("pipeline");
  const [pipeline] = useState<ExecutionStage[]>([
    { stage: "01 // ROUTE INGRESS", instr: "POST /v1/orders/commit", context: "INGRESS: CLOUDFLARE_EDGE", status: "ACCEPTED" },
    { stage: "02 // AUTH & VALIDATION", instr: "VERIFY ed25519_signature(token)", context: "ROLE: VERIFIED", status: "VALIDATED" },
    { stage: "03 // TRANSACTION ISOLATION", instr: "SELECT * FROM inventory FOR UPDATE", context: "LOCK: ROW_EXCLUSIVE", status: "COMMITTED" },
    { stage: "04 // EVENT BROADCAST", instr: "PUBLISH event_stream, delta_crdt", context: "EVENT: KAFKA_ACK", status: "SYNCED" },
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCycle((prev) => prev + 1);
    }, 1400);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="sec-002" className="section-wrap" aria-label="About Biswadip Goj">
      <header className="section-header">
        <div className="section-tag">{"002 // BACKGROUND & SYSTEMS"}</div>
        <h2 className="section-title">Studied computer science, building full-stack software.</h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-start">
        <div className="space-y-6 text-lg text-[var(--ink-secondary)] leading-relaxed">
          <p>
            I am a software engineer based in Uluberia, West Bengal. I completed my B.Tech in Computer Science and Engineering (2021–2024) after earning a Diploma in CSE (2018–2021). That formal grounding gave me a strong foundation in operating systems, algorithms, distributed systems, and database internals.
          </p>
          <p>
            Over the last four years, I have built web applications, backend services, and APIs. When building a product, I care about predictable state, typed boundaries, and fast queries. I don&apos;t use complex tools when simple code solves the problem.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="card-volumetric p-5">
              <div className="font-mono text-xs text-[var(--accent-ink)] mb-1">{"// EDUCATION & DEGREE"}</div>
              <div className="font-medium text-[var(--ink)] text-sm">
                B.Tech in CSE (2021–2024)
              </div>
              <div className="text-xs text-[var(--ink-muted)] mt-1">
                Diploma in CSE (2018–2021) · West Bengal
              </div>
            </div>

            <div className="card-volumetric p-5">
              <div className="font-mono text-xs text-[var(--accent-ink)] mb-1">{"// CURRENT FOCUS"}</div>
              <div className="font-medium text-[var(--ink)] text-sm">
                Full-Stack & Systems Architecture
              </div>
              <div className="text-xs text-[var(--ink-muted)] mt-1">
                TypeScript, Rust, PostgreSQL, Cloudflare Edge
              </div>
            </div>
          </div>
        </div>

        {/* Right: Software Execution Pipeline */}
        <div className="card-volumetric p-6 font-mono flex flex-col justify-between">
          <div className="flex justify-between items-center pb-4 mb-4 border-b border-[var(--line)]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--accent-ink)]">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span>SOFTWARE REQUEST & EXECUTION PIPELINE</span>
            </div>
            <div className="text-xs text-[var(--ink-muted)]">
              CYCLE: #{cycle}
            </div>
          </div>

          <div className="space-y-3 mb-6">
            {pipeline.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 bg-[var(--paper-subtle)] border border-[var(--line)] rounded flex flex-col sm:flex-row justify-between sm:items-center gap-2 text-xs"
              >
                <div>
                  <div className="text-[var(--accent-ink)] font-semibold text-[0.7rem] mb-0.5">
                    {item.stage}
                  </div>
                  <div className="text-[var(--ink)] font-medium">
                    <code>{item.instr}</code>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-[var(--ink-muted)]">
                  <span className="text-[0.68rem]">{item.context}</span>
                  <span className="px-2 py-0.5 bg-[var(--paper-elevated)] border border-[var(--line)] rounded text-[0.7rem] text-[var(--accent-emerald)] font-semibold">
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-xs text-[var(--ink-muted)] flex justify-between items-center pt-3 border-t border-[var(--line)]">
            <span>Ingress Rate: ~14,200 req/sec</span>
            <span className="text-[var(--accent-emerald)]">P99 Latency: 4.8ms</span>
          </div>
        </div>
      </div>
    </section>
  );
}
