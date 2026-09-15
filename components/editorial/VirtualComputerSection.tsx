"use client";

import React, { useEffect, useRef, useState } from "react";

interface TerminalHistory {
  cmd: string;
  output: string | React.ReactNode;
}

interface MemoryBlock {
  id: number;
  size: number;
  allocated: boolean;
  tag: string;
}

export default function VirtualComputerSection() {
  // Canvas: Conway's Game of Life Cellular Automaton
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gridRef = useRef<number[][]>([]);
  const isPaintingRef = useRef<boolean>(false);
  const [generations, setGenerations] = useState<number>(0);

  // Terminal State
  const [termInput, setTermInput] = useState<string>("");
  const [termHistory, setTermHistory] = useState<TerminalHistory[]>([
    {
      cmd: "init-sandbox",
      output: "Initializing POSIX process environment... Kernel state ready. Type 'help' to view available diagnostic commands.",
    },
    {
      cmd: "uname -a",
      output: "Linux workstation 6.8.0-arch1-1 x86_64 GNU/Linux — Biswadip Goj Environment",
    },
  ]);
  const termEndRef = useRef<HTMLDivElement | null>(null);

  // Virtual Memory Allocator State
  const [memBlocks, setMemBlocks] = useState<MemoryBlock[]>([
    { id: 1001, size: 128, allocated: true, tag: "Buffer::PacketQueue" },
    { id: 1002, size: 256, allocated: true, tag: "RaftLog::Segment_0" },
    { id: 1003, size: 128, allocated: false, tag: "FreeArena" },
    { id: 1004, size: 512, allocated: true, tag: "PgPool::ConnectionPool" },
    { id: 1005, size: 128, allocated: false, tag: "FreeArena" },
    { id: 1006, size: 256, allocated: true, tag: "CRDT::LatticeState" },
  ]);

  // Cellular Automaton Initialization & Animation Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cols = 64;
    const rows = 28;
    const cellSize = canvas.width / cols;

    // Initialize grid with random seed
    const grid: number[][] = [];
    for (let r = 0; r < rows; r++) {
      grid[r] = [];
      for (let c = 0; c < cols; c++) {
        grid[r][c] = Math.random() > 0.82 ? 1 : 0;
      }
    }
    gridRef.current = grid;

    let animId: number;
    let lastTick = performance.now();

    const stepSimulation = () => {
      const g = gridRef.current;
      if (!g || g.length === 0) return;
      const next: number[][] = [];

      for (let r = 0; r < rows; r++) {
        next[r] = [];
        for (let c = 0; c < cols; c++) {
          let neighbors = 0;
          for (let dr = -1; dr <= 1; dr++) {
            for (let dc = -1; dc <= 1; dc++) {
              if (dr === 0 && dc === 0) continue;
              const nr = (r + dr + rows) % rows;
              const nc = (c + dc + cols) % cols;
              neighbors += g[nr][nc];
            }
          }

          if (g[r][c] === 1) {
            next[r][c] = neighbors === 2 || neighbors === 3 ? 1 : 0;
          } else {
            next[r][c] = neighbors === 3 ? 1 : 0;
          }
        }
      }

      gridRef.current = next;
      setGenerations((prev) => prev + 1);
    };

    const render = (time: number) => {
      if (time - lastTick > 140) {
        stepSimulation();
        lastTick = time;
      }

      const g = gridRef.current;
      ctx.fillStyle = "#0B0F17";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid Lines
      ctx.strokeStyle = "rgba(40, 50, 75, 0.4)";
      ctx.lineWidth = 0.5;
      for (let c = 0; c <= cols; c++) {
        ctx.beginPath();
        ctx.moveTo(c * cellSize, 0);
        ctx.lineTo(c * cellSize, canvas.height);
        ctx.stroke();
      }
      for (let r = 0; r <= rows; r++) {
        ctx.beginPath();
        ctx.moveTo(0, r * cellSize);
        ctx.lineTo(canvas.width, r * cellSize);
        ctx.stroke();
      }

      // Draw Cells
      if (g && g.length > 0) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            if (g[r][c] === 1) {
              const hue = (c / cols) * 80 + 190;
              ctx.fillStyle = `hsl(${hue}, 90%, 58%)`;
              ctx.shadowColor = `hsla(${hue}, 90%, 58%, 0.5)`;
              ctx.shadowBlur = 4;
              ctx.fillRect(c * cellSize + 1, r * cellSize + 1, cellSize - 2, cellSize - 2);
              ctx.shadowBlur = 0;
            }
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const handleCanvasPaint = (e: MouseEvent) => {
      if (!isPaintingRef.current) return;
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      const x = (e.clientX - rect.left) * scaleX;
      const y = (e.clientY - rect.top) * scaleY;
      const c = Math.floor(x / cellSize);
      const r = Math.floor(y / cellSize);

      if (gridRef.current[r] && gridRef.current[r][c] !== undefined) {
        gridRef.current[r][c] = 1;
        if (gridRef.current[r + 1]) gridRef.current[r + 1][c] = 1;
        if (gridRef.current[r][c + 1]) gridRef.current[r][c + 1] = 1;
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      isPaintingRef.current = true;
      handleCanvasPaint(e);
    };
    const onMouseUp = () => {
      isPaintingRef.current = false;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);
    canvas.addEventListener("mousemove", handleCanvasPaint);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      canvas.removeEventListener("mousemove", handleCanvasPaint);
    };
  }, []);

  // Terminal Execution Engine
  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    let reply: string | React.ReactNode = "";

    switch (trimmed) {
      case "help":
        reply = "Commands: 'tree', 'mem', 'bench', 'cat bio', 'whoami', 'skills', 'clear'";
        break;
      case "tree":
        reply = `├── src/
│   ├── systems/
│   │   ├── erpixa_erp.rs
│   │   └── kestrel_raft.rs
│   ├── edge/
│   │   └── nanolink_mesh.ts
│   └── apps/
│       └── nexora_collab.tsx
└── database/
    └── schema.sql`;
        break;
      case "mem":
        reply = `Arena Allocator: 6 Segments Total · 1,408 KB Allocated · 256 KB Free (Fragmentation: 0.0%)`;
        break;
      case "bench":
        reply = `Running Async Socket Benchmark:
[tokio::worker::0] 10,000 IO events in 1.42ms
Throughput: 7,042,253 ops/sec
P50: 0.12µs | P95: 0.28µs | P99: 0.54µs`;
        break;
      case "whoami":
        reply = "biswadip — B.Tech Computer Science & Engineering, West Bengal, India";
        break;
      case "cat bio":
        reply = "Full-stack software engineer building web apps, backend APIs, and distributed systems in TypeScript, Rust, Go, and PostgreSQL.";
        break;
      case "skills":
        reply = "TypeScript, Rust, Go, Python, PostgreSQL, Redis, Cloudflare Workers, Docker, Linux Shell";
        break;
      case "clear":
        setTermHistory([]);
        return;
      default:
        reply = `command not found: ${trimmed}. Type 'help' for available commands.`;
        break;
    }

    setTermHistory((prev) => [...prev, { cmd: cmdStr, output: reply }]);
    setTimeout(() => {
      termEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  const handleTermSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!termInput) return;
    executeCommand(termInput);
    setTermInput("");
  };

  // Memory sandbox allocate / free
  const handleMalloc = () => {
    const freeIdx = memBlocks.findIndex((b) => !b.allocated);
    if (freeIdx !== -1) {
      const next = [...memBlocks];
      next[freeIdx] = {
        ...next[freeIdx],
        allocated: true,
        tag: `Alloc_${Math.floor(Math.random() * 900 + 100)}`,
      };
      setMemBlocks(next);
    } else {
      const newBlock: MemoryBlock = {
        id: Date.now() % 10000,
        size: 128,
        allocated: true,
        tag: `Arena_${memBlocks.length + 1}`,
      };
      setMemBlocks([...memBlocks, newBlock]);
    }
  };

  const handleFree = (id: number) => {
    setMemBlocks(
      memBlocks.map((b) => (b.id === id ? { ...b, allocated: false, tag: "FreeArena" } : b))
    );
  };

  return (
    <section id="sec-004" className="section-wrap" aria-label="Interactive Developer Sandbox">
      <header className="section-header">
        <div className="section-tag">{"004 // COMPUTATIONAL SANDBOX"}</div>
        <h2 className="section-title">Living runtime sandbox & developer workspace.</h2>
        <p className="section-subtitle">
          An interactive software environment featuring Conway&apos;s Game of Life, an executable developer shell, and a virtual memory arena allocator. Everything flows naturally as you scroll.
        </p>
      </header>

      {/* Main Container */}
      <div className="card-volumetric p-6 sm:p-8 space-y-10">
        {/* Environment Status Topbar */}
        <div className="flex flex-wrap justify-between items-center pb-4 border-b border-[var(--line)] font-mono text-xs text-[var(--ink-secondary)]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
            <span className="font-semibold text-[var(--ink)]">RUNTIME: POSIX_WORKSTATION</span>
          </div>
          <div className="flex flex-wrap gap-4 text-[0.72rem] text-[var(--ink-muted)]">
            <span>EVENT_LOOP: 60Hz</span>
            <span>ACTIVE_PROCESSES: 142</span>
            <span>ACTIVE_SOCKETS: 88</span>
            <span>ALLOCATED_ARENA: 1,408 KB</span>
          </div>
        </div>

        {/* STAGE 1: Cellular Automata (Conway's Game of Life) */}
        <div>
          <div className="flex justify-between items-center mb-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
              <span className="font-semibold text-[var(--accent-ink)]">
                {"// 01: CELLULAR AUTOMATA (CONWAY'S GAME OF LIFE)"}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[0.72rem]">
              <span className="text-[var(--ink-muted)] hidden sm:inline">Generation: #{generations} · Click & drag canvas to paint</span>
              <button
                onClick={() => {
                  const cols = 64;
                  const rows = 28;
                  const g: number[][] = [];
                  for (let r = 0; r < rows; r++) {
                    g[r] = [];
                    for (let c = 0; c < cols; c++) {
                      g[r][c] = Math.random() > 0.8 ? 1 : 0;
                    }
                  }
                  gridRef.current = g;
                }}
                className="px-2.5 py-1 bg-[var(--paper-subtle)] border border-[var(--line)] rounded hover:bg-[var(--line)] font-mono text-[var(--ink)] transition-all"
              >
                Randomize Seed
              </button>
              <button
                onClick={() => {
                  const cols = 64;
                  const rows = 28;
                  const g: number[][] = [];
                  for (let r = 0; r < rows; r++) {
                    g[r] = new Array(cols).fill(0);
                  }
                  gridRef.current = g;
                }}
                className="px-2.5 py-1 bg-[var(--paper-subtle)] border border-[var(--line)] rounded hover:bg-[var(--line)] font-mono text-[var(--ink)] transition-all"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="relative rounded-lg overflow-hidden border border-[#21262D] bg-[#0B0F17] shadow-inner h-[240px] sm:h-[280px]">
            <canvas
              ref={canvasRef}
              width={640}
              height={280}
              className="w-full h-full block cursor-crosshair"
              aria-label="Conway's Game of Life Cellular Automaton"
            />
            <div className="absolute bottom-2 left-3 font-mono text-[0.68rem] text-slate-400 pointer-events-none">
              {"// paint cells with mouse · 2D toroidal lattice"}
            </div>
          </div>
        </div>

        {/* STAGE 2: Interactive Developer Shell (Terminal) */}
        <div>
          <div className="flex justify-between items-center mb-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-violet)]" />
              <span className="font-semibold text-[var(--accent-violet)]">
                {"// 02: INTERACTIVE KERNEL & DIAGNOSTIC SHELL"}
              </span>
            </div>
            <div className="text-[0.72rem] text-[var(--ink-muted)]">
              Interactive terminal · Type or click pills below
            </div>
          </div>

          <div className="rounded-lg overflow-hidden border border-[#21262D] bg-[#0D1117] text-[#C9D1D9] font-mono text-xs sm:text-sm p-4 h-[280px] flex flex-col justify-between shadow-inner">
            <div className="overflow-y-auto space-y-2.5 pr-2 scrollbar-thin">
              {termHistory.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex items-center gap-2 text-[#58A6FF]">
                    <span className="text-[#7EE787]">biswa@workstation</span>
                    <span className="text-[#8B949E]">:</span>
                    <span className="text-[#D2A8FF]">~</span>
                    <span className="text-[#8B949E]">$</span>
                    <span className="text-white font-medium">{item.cmd}</span>
                  </div>
                  <div className="text-[#8B949E] pl-4 whitespace-pre-wrap leading-relaxed text-xs">
                    {item.output}
                  </div>
                </div>
              ))}
              <div ref={termEndRef} />
            </div>

            {/* Terminal Input Form */}
            <form onSubmit={handleTermSubmit} className="pt-3 border-t border-[#21262D] flex items-center gap-2">
              <span className="text-[#7EE787]">biswa@workstation</span>
              <span className="text-[#8B949E]">$</span>
              <input
                type="text"
                value={termInput}
                onChange={(e) => setTermInput(e.target.value)}
                placeholder="Type 'help', 'bench', 'tree', 'mem', 'cat bio'..."
                className="flex-1 bg-transparent border-none outline-none text-[#58A6FF] font-mono text-xs sm:text-sm"
              />
              <button
                type="submit"
                className="px-3 py-1 bg-[#238636] hover:bg-[#2EA043] text-white rounded text-xs transition-colors"
              >
                Run
              </button>
            </form>
          </div>

          {/* Quick-run Command Buttons */}
          <div className="flex flex-wrap gap-2 mt-2 font-mono text-xs">
            <span className="text-[var(--ink-muted)] text-[0.7rem] self-center">Quick commands:</span>
            {["bench", "tree", "mem", "whoami", "skills", "clear"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-1 bg-[var(--paper-subtle)] border border-[var(--line)] rounded text-[var(--accent-ink)] hover:bg-[var(--paper-inset)] text-[0.72rem] transition-all"
              >
                ${cmd}
              </button>
            ))}
          </div>
        </div>

        {/* STAGE 3: Virtual Memory Arena Allocator */}
        <div>
          <div className="flex justify-between items-center mb-3 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-coral)]" />
              <span className="font-semibold text-[var(--accent-coral)]">
                {"// 03: VIRTUAL HEAP ARENA ALLOCATOR (MEMORY MODEL)"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleMalloc}
                className="px-3 py-1 bg-[var(--accent)] text-white rounded text-xs hover:bg-[var(--accent-ink)] font-mono transition-all"
              >
                + malloc(128KB)
              </button>
            </div>
          </div>

          <div className="p-4 bg-[var(--paper-subtle)] border border-[var(--line)] rounded-lg">
            <p className="text-xs text-[var(--ink-secondary)] mb-3 leading-relaxed">
              Visual representation of an in-memory arena buffer. Click any allocated block to trigger <code>free()</code> and return the space to the memory pool.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-4">
              {memBlocks.map((block) => (
                <div
                  key={block.id}
                  onClick={() => block.allocated && handleFree(block.id)}
                  className={`p-3 border rounded transition-all cursor-pointer ${
                    block.allocated
                      ? "bg-[var(--paper-elevated)] border-[var(--accent)] shadow-xs hover:border-red-500"
                      : "bg-[var(--paper-inset)] border-[var(--line-strong)] border-dashed opacity-60"
                  }`}
                >
                  <div className="flex justify-between items-center text-[0.65rem] font-mono mb-1">
                    <span className="text-[var(--ink-muted)]">#{block.id.toString().slice(-4)}</span>
                    <span className={block.allocated ? "text-[var(--accent-emerald)] font-semibold" : "text-[var(--ink-muted)]"}>
                      {block.allocated ? "ALLOC" : "FREE"}
                    </span>
                  </div>
                  <div className="font-mono text-xs font-semibold text-[var(--ink)] truncate">
                    {block.tag}
                  </div>
                  <div className="font-mono text-[0.68rem] text-[var(--ink-secondary)] mt-0.5">
                    {block.size} KB
                  </div>
                  {block.allocated && (
                    <div className="text-[0.62rem] text-red-600 mt-1 font-mono">click: free()</div>
                  )}
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[var(--line)] flex justify-between items-center font-mono text-[0.72rem] text-[var(--ink-muted)]">
              <span>Residency: {memBlocks.filter((b) => b.allocated).reduce((acc, b) => acc + b.size, 0)} KB Total</span>
              <span className="text-[var(--accent-emerald)]">Zero Heap Fragmentation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
