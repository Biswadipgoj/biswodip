"use client";

import React, { useEffect, useRef, useState } from "react";
import { personal } from "@/lib/data";

interface GraphNode {
  id: number;
  x: number;
  y: number;
  z: number;
  label: string;
  isPrimary?: boolean;
}

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string>("BFT Consensus");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const nodes: GraphNode[] = [
      { id: 0, x: 0, y: 0, z: 0, label: "Root: Kernel", isPrimary: true },
      { id: 1, x: -120, y: -80, z: 40, label: "MMU Paging" },
      { id: 2, x: 120, y: -70, z: -30, label: "BFT Consensus", isPrimary: true },
      { id: 3, x: -140, y: 80, z: -50, label: "L1/L2 Cache" },
      { id: 4, x: 130, y: 90, z: 60, label: "Async Pipeline" },
      { id: 5, x: -50, y: -140, z: -40, label: "AST Compiler" },
      { id: 6, x: 60, y: -150, z: 50, label: "SIMD Vector" },
      { id: 7, x: -60, y: 140, z: 40, label: "TCP Gateway" },
      { id: 8, x: 70, y: 150, z: -40, label: "WASM JIT" },
      { id: 9, x: 0, y: -90, z: 80, label: "Raft Lease" },
      { id: 10, x: 0, y: 90, z: -80, label: "CRDT State" },
    ];

    const edges: Array<[number, number]> = [
      [0, 1], [0, 2], [0, 3], [0, 4], [0, 9], [0, 10],
      [1, 5], [2, 6], [3, 7], [4, 8],
      [5, 6], [7, 8], [9, 2], [10, 4], [1, 3]
    ];

    let rotX = 0.15;
    let rotY = 0.2;
    let targetRotX = 0.15;
    let targetRotY = 0.2;
    let pulseProgress = 0;

    const onMouseMove = (e: MouseEvent) => {
      const normX = e.clientX / window.innerWidth - 0.5;
      const normY = e.clientY / window.innerHeight - 0.5;
      targetRotY = normX * 0.8;
      targetRotX = normY * 0.8 + 0.15;
    };
    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      rotY += (targetRotY - rotY) * 0.05 + 0.0025;
      rotX += (targetRotX - rotX) * 0.05;
      pulseProgress = (pulseProgress + 0.015) % 1;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Project Nodes
      const projected = nodes.map((n) => {
        const x1 = n.x * cosY - n.z * sinY;
        const z1 = n.z * cosY + n.x * sinY;
        const y2 = n.y * cosX - z1 * sinX;
        const z2 = z1 * cosX + n.y * sinX;

        const scale = 400 / (400 + z2);
        return {
          id: n.id,
          label: n.label,
          isPrimary: n.isPrimary,
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2,
          scale,
        };
      });

      // Draw Edges with animated data packet pulse
      edges.forEach(([fromIdx, toIdx], eIdx) => {
        const p1 = projected[fromIdx];
        const p2 = projected[toIdx];

        ctx.strokeStyle = "rgba(37, 84, 215, 0.18)";
        ctx.lineWidth = 1.2 * Math.min(p1.scale, p2.scale);
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Data Packet on Edge
        const packetT = (pulseProgress + eIdx * 0.15) % 1;
        const px = p1.x + (p2.x - p1.x) * packetT;
        const py = p1.y + (p2.y - p1.y) * packetT;
        ctx.fillStyle = "#028A76";
        ctx.beginPath();
        ctx.arc(px, py, 2.5 * Math.min(p1.scale, p2.scale), 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw Nodes
      projected.forEach((p) => {
        const alpha = Math.max(0.2, (p.z + 200) / 400);
        ctx.save();
        ctx.shadowColor = p.isPrimary ? "rgba(37, 84, 215, 0.35)" : "rgba(17, 20, 26, 0.1)";
        ctx.shadowBlur = p.isPrimary ? 12 : 6;

        ctx.fillStyle = p.isPrimary ? "#2554D7" : "#FFFFFF";
        ctx.strokeStyle = p.isPrimary ? "#183EB5" : "#CFCBC0";
        ctx.lineWidth = 2;

        const r = (p.isPrimary ? 9 : 6) * p.scale;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();

        // Node Label
        ctx.font = `500 ${Math.max(10, 11 * p.scale)}px "IBM Plex Mono", monospace`;
        ctx.fillStyle = `rgba(17, 20, 26, ${Math.min(1, alpha + 0.4)})`;
        ctx.fillText(p.label, p.x + 12, p.y + 4);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <section id="sec-001" className="section-wrap min-h-[92vh] flex items-center" aria-label="Introduction">
      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center w-full">
        <div className="z-10">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 border border-[var(--line)] bg-[var(--paper-elevated)] rounded-full text-xs font-mono text-[var(--ink-secondary)] shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
            <span>FULL-STACK & SYSTEMS ENGINEER · INDIA</span>
          </div>

          <h1 className="font-display text-[clamp(2.75rem,5.2vw,4.6rem)] font-medium leading-[1.08] tracking-[-0.03em] text-[var(--ink)] mb-6">
            Software engineer building web apps, backend APIs, and distributed tools.
          </h1>

          <p className="text-lg leading-relaxed text-[var(--ink-secondary)] max-w-[54ch] mb-10">
            I&apos;m {personal.name}. I studied Computer Science in West Bengal and build production software using TypeScript, Rust, Go, and PostgreSQL — focusing on clean code, predictable state, and sub-50ms performance.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <a href="#sec-003" className="btn-primary">
              View Production Work
            </a>
            <a href="#sec-004" className="btn-outline">
              Open Developer Sandbox
            </a>
          </div>
        </div>

        {/* Right: Computer Science B-Tree / Graph Topology Simulation */}
        <div className="relative w-full h-[480px] card-volumetric flex items-center justify-center p-4 overflow-hidden">
          <div className="absolute top-4 left-4 z-10 font-mono text-xs text-[var(--ink-muted)] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span>TOPOLOGY: DISTRIBUTED B-TREE & RAFT STATE</span>
          </div>

          <canvas
            ref={canvasRef}
            width={640}
            height={480}
            className="w-full h-full block cursor-grab active:cursor-grabbing"
            aria-label="Interactive Computer Science Topology Graph"
          />

          <div className="absolute bottom-4 right-4 font-mono text-[0.7rem] text-[var(--ink-muted)] pointer-events-none bg-[var(--paper-elevated)] px-2.5 py-1 border border-[var(--line)] rounded shadow-xs">
            {"// live node traversal [interactive mouse tilt]"}
          </div>
        </div>
      </div>
    </section>
  );
}
