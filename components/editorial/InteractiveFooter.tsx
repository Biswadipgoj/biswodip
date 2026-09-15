"use client";

import React, { useEffect, useRef, useState } from "react";
import { personal } from "@/lib/data";

interface PhysicsToken {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  text: string;
  color: string;
}

export default function InteractiveFooter() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gravityMode, setGravityMode] = useState<"down" | "zero" | "up">("down");
  const [timeStr, setTimeStr] = useState<string>("");
  const [pingLatency, setPingLatency] = useState<number>(14.2);
  const [copied, setCopied] = useState<boolean>(false);

  // Live UTC+5:30 Millisecond Clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const istOptions: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timePart = now.toLocaleTimeString("en-GB", istOptions);
      const ms = String(now.getMilliseconds()).padStart(3, "0");
      setTimeStr(`${timePart}.${ms} IST (UTC+5:30)`);
    };

    const interval = setInterval(updateTime, 40);
    return () => clearInterval(interval);
  }, []);

  // Physics Gravity Box Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const tokenLabels = [
      { text: "0x7F", color: "#2554D7" },
      { text: "NULL", color: "#6B7280" },
      { text: "&mut self", color: "#028A76" },
      { text: "O(1)", color: "#2554D7" },
      { text: "WASM", color: "#D97706" },
      { text: "SIGINT", color: "#DC2626" },
      { text: "EOF", color: "#4B5563" },
      { text: "Mutex<T>", color: "#028A76" },
      { text: "Raft", color: "#2554D7" },
      { text: "CRDT", color: "#7C3AED" },
    ];

    const tokens: PhysicsToken[] = tokenLabels.map((item, idx) => ({
      x: 30 + (idx % 5) * 80 + Math.random() * 20,
      y: 20 + Math.floor(idx / 5) * 50,
      vx: (Math.random() - 0.5) * 3,
      vy: Math.random() * 2,
      width: 76,
      height: 32,
      text: item.text,
      color: item.color,
    }));

    let isDragging = false;
    let dragIndex = -1;
    let dragOffset = { x: 0, y: 0 };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background subtle grid
      ctx.strokeStyle = "rgba(17, 20, 26, 0.04)";
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 24) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      const g = gravityMode === "down" ? 0.35 : gravityMode === "up" ? -0.35 : 0;

      tokens.forEach((t, i) => {
        if (!isDragging || dragIndex !== i) {
          t.vy += g;
          t.vx *= 0.985;
          t.vy *= 0.985;
          t.x += t.vx;
          t.y += t.vy;

          // Boundary bounce with damping
          if (t.x < 0) {
            t.x = 0;
            t.vx *= -0.7;
          }
          if (t.x + t.width > canvas.width) {
            t.x = canvas.width - t.width;
            t.vx *= -0.7;
          }
          if (t.y < 0) {
            t.y = 0;
            t.vy *= -0.7;
          }
          if (t.y + t.height > canvas.height) {
            t.y = canvas.height - t.height;
            t.vy *= -0.65;
            // Floor friction
            t.vx *= 0.94;
          }
        }

        // Draw Token Pill
        ctx.save();
        ctx.shadowColor = "rgba(17, 20, 26, 0.08)";
        ctx.shadowBlur = 6;
        ctx.shadowOffsetY = 2;

        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#D4D0C5";
        ctx.lineWidth = 1.5;

        // Rounded rect
        ctx.beginPath();
        ctx.roundRect(t.x, t.y, t.width, t.height, 4);
        ctx.fill();
        ctx.stroke();

        ctx.restore();

        // Token Accent Bar
        ctx.fillStyle = t.color;
        ctx.fillRect(t.x + 4, t.y + 4, 3, t.height - 8);

        // Token Text
        ctx.font = '500 12px "IBM Plex Mono", monospace';
        ctx.fillStyle = "#11141A";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(t.text, t.x + t.width / 2 + 2, t.y + t.height / 2);
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    const onMouseDown = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      for (let i = tokens.length - 1; i >= 0; i--) {
        const t = tokens[i];
        if (mx >= t.x && mx <= t.x + t.width && my >= t.y && my <= t.y + t.height) {
          isDragging = true;
          dragIndex = i;
          dragOffset = { x: mx - t.x, y: my - t.y };
          t.vx = 0;
          t.vy = 0;
          break;
        }
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      if (isDragging && dragIndex !== -1) {
        const rect = canvas.getBoundingClientRect();
        const mx = e.clientX - rect.left;
        const my = e.clientY - rect.top;
        const t = tokens[dragIndex];
        const newX = mx - dragOffset.x;
        const newY = my - dragOffset.y;
        t.vx = (newX - t.x) * 0.4;
        t.vy = (newY - t.y) * 0.4;
        t.x = newX;
        t.y = newY;
      }
    };

    const onMouseUp = () => {
      isDragging = false;
      dragIndex = -1;
    };

    canvas.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [gravityMode]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSimulatePing = () => {
    setPingLatency(Number((12 + Math.random() * 5).toFixed(1)));
  };

  return (
    <footer id="sec-008" className="section-wrap bg-[var(--paper-elevated)] border-t-2 border-[var(--line-strong)]" aria-label="Interactive Footer">
      <header className="section-header">
        <div className="section-tag">{"008 // SYSTEM DISPATCH & CONTACT"}</div>
        <h2 className="section-title">Get in touch.</h2>
        <p className="section-subtitle">
          Whether you have an interesting engineering challenge, a distributed systems question, or want to work together — my inbox is open.
        </p>
      </header>

      {/* Main Grid: Interactive Gravity Sandbox & Network Packet Tracer */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left: Interactive Token Gravity Box */}
        <div className="card-volumetric p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <div>
              <div className="font-mono text-xs font-semibold text-[var(--accent-ink)]">
                {"// CS TOKENS GRAVITY BOX"}
              </div>
              <div className="text-xs text-[var(--ink-muted)]">
                Click and toss primitives around. Zero lag.
              </div>
            </div>
            <div className="flex gap-1.5 font-mono text-xs">
              <button
                onClick={() => setGravityMode("down")}
                className={`px-2 py-1 rounded border text-xs ${
                  gravityMode === "down" ? "bg-[var(--accent)] text-white border-[var(--accent)]" : "bg-[var(--paper)] border-[var(--line)]"
                }`}
              >
                Down
              </button>
              <button
                onClick={() => setGravityMode("zero")}
                className={`px-2 py-1 rounded border text-xs ${
                  gravityMode === "zero" ? "bg-[var(--accent)] text-white border-[var(--accent)]" : "bg-[var(--paper)] border-[var(--line)]"
                }`}
              >
                Zero G
              </button>
              <button
                onClick={() => setGravityMode("up")}
                className={`px-2 py-1 rounded border text-xs ${
                  gravityMode === "up" ? "bg-[var(--accent)] text-white border-[var(--accent)]" : "bg-[var(--paper)] border-[var(--line)]"
                }`}
              >
                Invert
              </button>
            </div>
          </div>

          <div className="relative h-[220px] w-full border border-[var(--line)] rounded bg-[var(--paper-subtle)] overflow-hidden">
            <canvas
              ref={canvasRef}
              width={540}
              height={220}
              className="w-full h-full block cursor-grab active:cursor-grabbing"
              aria-label="Interactive Physics Token Sandbox"
            />
          </div>
        </div>

        {/* Right: Live Route Tracer & Latency Gauge */}
        <div className="card-volumetric p-6 flex flex-col justify-between font-mono text-xs">
          <div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-semibold text-[var(--accent-ink)]">{"// LIVE EDGE PACKET ROUTE"}</span>
              <button
                onClick={handleSimulatePing}
                className="px-2.5 py-1 bg-[var(--accent-light)] border border-[var(--accent)] text-[var(--accent-ink)] rounded hover:bg-[var(--accent)] hover:text-white transition-all"
              >
                ● Re-Ping Hop
              </button>
            </div>

            <div className="space-y-2 text-[var(--ink-secondary)] bg-[var(--paper-subtle)] p-3.5 rounded border border-[var(--line)] mb-4">
              <div className="flex justify-between">
                <span>Hop 01: Client Browser (Local Interface)</span>
                <span className="text-[var(--accent-emerald)]">&lt; 1ms</span>
              </div>
              <div className="flex justify-between">
                <span>Hop 02: Cloudflare Anycast CDN (Edge DNS)</span>
                <span className="text-[var(--accent-emerald)]">4.2ms</span>
              </div>
              <div className="flex justify-between">
                <span>Hop 03: Delhi Primary Transit (DEL-IX)</span>
                <span className="text-[var(--accent-emerald)]">8.9ms</span>
              </div>
              <div className="flex justify-between font-semibold text-[var(--ink)]">
                <span>Hop 04: Kolkata Core Node (CCU-POP) → Uluberia</span>
                <span className="text-[var(--accent)]">{pingLatency}ms</span>
              </div>
            </div>
          </div>

          {/* Time & Workstation Status */}
          <div className="border-t border-[var(--line)] pt-3.5 flex flex-wrap justify-between items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] animate-pulse" />
              <span className="text-[var(--ink-secondary)]">ENGINEER NODE ONLINE</span>
            </div>
            <div className="text-[var(--ink)] font-semibold">{timeStr || "Loading clock..."}</div>
          </div>
        </div>
      </div>

      {/* Contact Channels & Direct Dispatch */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Email */}
        <div className="card-volumetric p-6 flex flex-col justify-between">
          <div>
            <div className="font-mono text-xs text-[var(--ink-muted)] mb-1">{"// DIRECT EMAIL"}</div>
            <div className="font-mono text-base font-semibold text-[var(--ink)] break-all mb-4">
              {personal.email}
            </div>
          </div>
          <button
            onClick={handleCopyEmail}
            className="btn-primary w-full justify-center text-xs"
          >
            {copied ? "✓ Copied to Clipboard!" : "Copy Email Address"}
          </button>
        </div>

        {/* GitHub */}
        <a
          href="https://github.com/biswadip"
          target="_blank"
          rel="noopener noreferrer"
          className="card-volumetric p-6 flex flex-col justify-between group"
        >
          <div>
            <div className="font-mono text-xs text-[var(--ink-muted)] mb-1">{"// GITHUB REPOSITORIES"}</div>
            <div className="font-mono text-base font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-2">
              github.com/biswadip
            </div>
            <p className="text-xs text-[var(--ink-muted)]">
              Explore open-source systems, Rust engines, and full-stack projects.
            </p>
          </div>
          <div className="font-mono text-xs text-[var(--accent)] font-semibold mt-4">
            View Repositories →
          </div>
        </a>

        {/* LinkedIn */}
        <a
          href="https://linkedin.com/in/biswadip"
          target="_blank"
          rel="noopener noreferrer"
          className="card-volumetric p-6 flex flex-col justify-between group"
        >
          <div>
            <div className="font-mono text-xs text-[var(--ink-muted)] mb-1">{"// PROFESSIONAL NETWORK"}</div>
            <div className="font-mono text-base font-semibold text-[var(--ink)] group-hover:text-[var(--accent)] transition-colors mb-2">
              linkedin.com/in/biswadip
            </div>
            <p className="text-xs text-[var(--ink-muted)]">
              Connect for full-time engineering opportunities and consulting.
            </p>
          </div>
          <div className="font-mono text-xs text-[var(--accent)] font-semibold mt-4">
            Connect on LinkedIn →
          </div>
        </a>
      </div>

      {/* ASCII Art Signature & Colophon */}
      <div className="border-t border-[var(--line)] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 font-mono text-xs text-[var(--ink-muted)]">
        <div>
          <pre className="text-[0.65rem] sm:text-xs leading-tight text-[var(--ink)] select-none font-bold">
{` ____  _                     _ _       
| __ )(_)_____      ____ _  __| (_)_ __  
|  _ \\| / __\\ \\ /\\ / / _\` |/ _\` | | '_ \\ 
| |_) | \\__ \\\\ V  V / (_| | (_| | | |_) |
|____/|_|___/ \\_/\\_/ \\__,_|\\__,_|_| .__/ 
                                  |_|    `}
          </pre>
          <div className="mt-2 text-[var(--ink-secondary)]">
            © 2026 Biswadip Goj · Built with Next.js, Canvas 2D & GSAP
          </div>
        </div>

        <div className="flex flex-col md:items-end gap-1 text-[var(--ink-secondary)]">
          <div>Architecture: Volumetric Light Theme · Non-Flat Design</div>
          <div>Location: Uluberia, West Bengal, India · Available Worldwide</div>
        </div>
      </div>
    </footer>
  );
}
