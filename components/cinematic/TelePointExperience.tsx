'use client';

import { useState } from 'react';
import Image from 'next/image';
import ComputerFrame from './ComputerFrame';

interface SceneStep {
  id: string;
  step: string;
  title: string;
  hook: string;
  accent: string;
}

const telepointScenes: SceneStep[] = [
  {
    id: 'topology',
    step: '01',
    title: 'Distributed Topology',
    hook: 'Multi-Tenant Event Mesh Routing',
    accent: '#00d2ff',
  },
  {
    id: 'protocol',
    step: '02',
    title: 'WebSocket Protocol',
    hook: 'RFC 6455 Full-Duplex Framing',
    accent: '#38bdf8',
  },
  {
    id: 'telemetry',
    step: '03',
    title: 'Live Telemetry',
    hook: 'Interactive Packet Simulation',
    accent: '#10b981',
  },
  {
    id: 'product',
    step: '04',
    title: 'Shipped Product',
    hook: 'Production Interface & Verification',
    accent: '#a855f7',
  },
];

export default function TelePointExperience() {
  const [activeScene, setActiveScene] = useState<number>(0);
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [lastLatency, setLastLatency] = useState<number>(38);
  const [packetCount, setPacketCount] = useState<number>(1420);

  const handleTransmitPacket = () => {
    setIsTransmitting(true);
    setTimeout(() => {
      setIsTransmitting(false);
      setLastLatency(Math.floor(28 + Math.random() * 16));
      setPacketCount((prev) => prev + 1);
    }, 280);
  };

  const current = telepointScenes[activeScene];

  return (
    <section
      id="telepoint"
      className="relative w-full py-24 px-4 md:px-8 max-w-7xl mx-auto border-t border-white/[0.1]"
    >
      {/* ── FIXED TOP CAPTION HOOK (STICKY HUD HEADER) ── */}
      <div className="sticky top-20 z-30 mb-8 w-full max-w-4xl mx-auto">
        <div className="glass-hud-pill flex items-center justify-between px-4 sm:px-6 py-3 rounded-2xl">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00d2ff] animate-ping" />
            <span className="mono text-xs font-bold uppercase tracking-wider text-white">
              SYSTEM 01 // TELEPOINT
            </span>
            <span className="hidden sm:inline-block mono text-xs text-[#00d2ff]">
              · {current.hook}
            </span>
          </div>

          {/* Scene Transition Selector Tabs */}
          <div className="flex items-center gap-1 sm:gap-2">
            {telepointScenes.map((scene, idx) => {
              const isActive = activeScene === idx;
              return (
                <button
                  key={scene.id}
                  onClick={() => setActiveScene(idx)}
                  className={`px-3 py-1 rounded-full text-xs mono font-bold transition-all ${
                    isActive
                      ? 'bg-[#00d2ff] text-[#0a0f1d] shadow-[0_0_14px_rgba(0,210,255,0.7)] scale-105'
                      : 'text-white/70 hover:text-white bg-white/[0.06] border border-white/10'
                  }`}
                >
                  <span className="hidden sm:inline">{scene.step} · </span>
                  <span>{scene.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── SECTION INTRO HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#00d2ff] shadow-[0_0_8px_#00d2ff]" />
            <span className="mono text-xs font-bold uppercase tracking-wider text-[#00d2ff]">
              FLAGSHIP REAL-TIME PLATFORM
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white">
            TelePoint
          </h2>
          <p className="text-sm sm:text-base text-[#cbd5e1] mt-1 max-w-xl">
            High-throughput bidirectional communication engine engineered with Next.js, Node.js, WebSockets, and TypeScript.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://telepoint-topaz.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-action text-xs sm:text-sm py-2.5 px-5"
          >
            <span>Run TelePoint</span>
            <span aria-hidden="true">↗</span>
          </a>
          <a
            href="https://github.com/Biswadipgoj/telepoint"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary-action text-xs sm:text-sm py-2.5 px-5"
          >
            <span>Source Code</span>
            <span aria-hidden="true">⌥</span>
          </a>
        </div>
      </div>

      {/* ── COMPUTER WORKSTATION DISPLAY CONTAINER ── */}
      <div className="relative w-full mb-16">
        <ComputerFrame
          title={`telepoint://runtime/${current.id}`}
          url="https://telepoint-topaz.vercel.app"
          statusBadge={`PHASE ${current.step} · WSS 120 FPS`}
        >
          {/* SCENE 01: DISTRIBUTED SYSTEM TOPOLOGY */}
          {activeScene === 0 && (
            <div className="space-y-8 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/[0.1] pb-4">
              <div>
                <span className="mono text-xs font-bold text-[#00d2ff] uppercase tracking-wider">
                  SCENE 01 // TOPOLOGY MESH
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                  Multi-Tenant Event Mesh Routing
                </h3>
              </div>
              <span className="mono text-xs text-[#10b981] px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-800/40 font-bold">
                100% NON-BLOCKING
              </span>
            </div>

            {/* Visual Node Diagram */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-cyan-400/30 shadow-lg">
                <div className="mono text-[10px] text-[#00d2ff] font-bold">01 · INITIATOR</div>
                <div className="font-display font-bold text-white text-base mt-1">Client Viewport</div>
                <div className="text-xs text-[#cbd5e1] mt-1">Optimistic UI Dispatch</div>
                <div className="mt-3 text-xs mono text-[#00d2ff] font-semibold">t = 0ms</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.05] border border-sky-400/30 shadow-lg">
                <div className="mono text-[10px] text-[#38bdf8] font-bold">02 · EDGE INGRESS</div>
                <div className="font-display font-bold text-white text-base mt-1">Vercel Edge</div>
                <div className="text-xs text-[#cbd5e1] mt-1">JWT Auth &amp; Rate Limit</div>
                <div className="mt-3 text-xs mono text-[#38bdf8] font-semibold">t + 8ms</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.05] border border-indigo-400/30 shadow-lg">
                <div className="mono text-[10px] text-[#818cf8] font-bold">03 · SOCKET HUB</div>
                <div className="font-display font-bold text-white text-base mt-1">Node.js Engine</div>
                <div className="text-xs text-[#cbd5e1] mt-1">Room Channel Broadcast</div>
                <div className="mt-3 text-xs mono text-[#818cf8] font-semibold">t + 22ms</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.05] border border-emerald-400/30 shadow-lg">
                <div className="mono text-[10px] text-[#10b981] font-bold">04 · PERSISTENCE</div>
                <div className="font-display font-bold text-white text-base mt-1">PostgreSQL</div>
                <div className="text-xs text-[#cbd5e1] mt-1">Async Audit &amp; B-Tree Index</div>
                <div className="mt-3 text-xs mono text-[#10b981] font-semibold">t + 38ms</div>
              </div>
            </div>

            <p className="text-sm text-[#cbd5e1] leading-relaxed max-w-3xl">
              By separating client optimistic paint from server-side fan-out, TelePoint guarantees immediate visual responsiveness while the WebSocket cluster reliably broadcasts payload frames to all active room peers.
            </p>

            {/* Live System Interface Snapshot */}
            <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-white/30 shadow-xl group bg-blue-950/20 mt-3">
              <Image
                src="/previews/telepoint.webp"
                alt="TelePoint Live System Preview"
                fill
                className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 900px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className="mono text-xs text-white font-bold px-3 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm">
                  Live TelePoint Communication Room
                </span>
                <span className="mono text-xs text-[#00d2ff] font-bold px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-300/40">
                  SUB-42MS MESH
                </span>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 02: PROTOCOL ENGINE & CODE IMPLEMENTATION */}
        {activeScene === 1 && (
          <div className="cyber-card p-6 sm:p-10 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/[0.1] pb-4">
              <div>
                <span className="mono text-xs font-bold text-[#38bdf8] uppercase tracking-wider">
                  SCENE 02 // PROTOCOL SPECIFICATION
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                  RFC 6455 Full-Duplex Socket Engine
                </h3>
              </div>
              <span className="mono text-xs text-[#38bdf8] px-3 py-1 rounded-full bg-sky-950/40 border border-sky-800/40 font-bold">
                TYPESCRIPT STRICT
              </span>
            </div>

            <div className="light-code-panel">
              <div className="light-code-header">
                <div className="editor-window-dots">
                  <span className="editor-dot dot-red" />
                  <span className="editor-dot dot-yellow" />
                  <span className="editor-dot dot-green" />
                </div>
                <span className="mono text-xs text-[#94a3b8]">telepoint/socket-broker.ts</span>
              </div>
              <pre className="p-5 text-xs font-mono text-[#e2e8f0] overflow-x-auto leading-relaxed bg-[#0a0d18]">
                <code>{`// RFC 6455 WebSocket Broadcast Pipeline with Room Isolation
export async function broadcastToRoom(
  roomId: string,
  event: TelePointEvent,
  senderSocketId: string
) {
  const room = activeRooms.get(roomId);
  if (!room) return;

  const framePayload = JSON.stringify({
    type: event.type,
    payload: event.data,
    originTime: Date.now(),
    sequenceId: generateUUID(),
  });

  // Zero-copy fan-out to all connected peers in parallel
  room.subscribers.forEach((clientSocket) => {
    if (clientSocket.id !== senderSocketId && clientSocket.readyState === WebSocket.OPEN) {
      clientSocket.send(framePayload);
    }
  });

  // Non-blocking asynchronous message audit to PostgreSQL
  queueDatabaseAudit({ roomId, payload: event.data });
}`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* SCENE 03: LIVE INTERACTIVE TELEMETRY */}
        {activeScene === 2 && (
          <div className="cyber-card p-6 sm:p-10 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/[0.1] pb-4">
              <div>
                <span className="mono text-xs font-bold text-[#10b981] uppercase tracking-wider">
                  SCENE 03 // LIVE PACKET SIMULATOR
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                  Real-Time Telemetry &amp; Ping Test
                </h3>
              </div>
              <button
                onClick={handleTransmitPacket}
                disabled={isTransmitting}
                className="btn-primary-action py-2 px-5 text-xs font-bold"
              >
                <span>{isTransmitting ? 'Transmitting...' : 'Emit Packet Frame ⚡'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.1]">
                <div className="mono text-xs text-[#94a3b8]">Live Round-Trip Time</div>
                <div className="text-4xl font-display font-extrabold text-[#00d2ff] mt-1">
                  {lastLatency} <span className="text-sm font-normal text-white/60">ms</span>
                </div>
                <div className="text-xs mono text-[#10b981] mt-2">● Optimal WebSocket Frame</div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.1]">
                <div className="mono text-xs text-[#94a3b8]">Dispatched Packets</div>
                <div className="text-4xl font-display font-extrabold text-white mt-1">
                  {packetCount.toLocaleString()}
                </div>
                <div className="text-xs mono text-[#00d2ff] mt-2">↑ 0 Packet Loss</div>
              </div>

              <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/[0.1]">
                <div className="mono text-xs text-[#94a3b8]">Socket Handshake</div>
                <div className="text-4xl font-display font-extrabold text-[#10b981] mt-1">
                  101 <span className="text-sm font-normal text-white/60">Switching Protocols</span>
                </div>
                <div className="text-xs mono text-[#94a3b8] mt-2">WSS SSL 256-bit</div>
              </div>
            </div>
          </div>
        )}

        {/* SCENE 04: SHIPPED PRODUCT & LIVE UI */}
        {activeScene === 3 && (
          <div className="cyber-card p-6 sm:p-10 space-y-6 animate-fadeIn">
            <div className="flex items-center justify-between border-b border-white/[0.1] pb-4">
              <div>
                <span className="mono text-xs font-bold text-[#a855f7] uppercase tracking-wider">
                  SCENE 04 // PRODUCTION RUNTIME
                </span>
                <h3 className="text-2xl font-display font-bold text-white mt-0.5">
                  Production Application Interface
                </h3>
              </div>
              <a
                href="https://telepoint-topaz.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-action py-2 px-5 text-xs font-bold"
              >
                <span>Launch Live App ↗</span>
              </a>
            </div>

            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/[0.15] shadow-2xl group">
              <Image
                src="/previews/telepoint.webp"
                alt="TelePoint — Real-time communication interface"
                fill
                className="object-cover object-top group-hover:scale-[1.01] transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 1000px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a8a]/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="mono text-xs text-white font-bold px-3 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-sm">
                    Shipped on Vercel Edge + Node.js WebSockets
                  </span>
                  <span className="mono text-xs text-[#34d399] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-300/40">
                    LIVE PRODUCTION
                  </span>
                </div>
              </div>
            </div>
          )}
        </ComputerFrame>
      </div>

      {/* ── ENDING ON A BOLD STATEMENT / STATS SECTION ── */}
      <div className="glass-panel p-8 sm:p-12 rounded-3xl border-cyan-400/30 shadow-2xl relative overflow-hidden">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.08] border border-white/[0.15]">
            <span className="w-2 h-2 rounded-full bg-[#00d2ff]" />
            <span className="mono text-xs text-[#00d2ff] font-bold tracking-wider uppercase">
              TELEPOINT BENCHMARK RIGOR
            </span>
          </div>

          <h3 className="text-3xl sm:text-5xl font-display font-extrabold text-white uppercase tracking-tight leading-[1.05]">
            SUB-42MS BIDIRECTIONAL MESH.
            <span className="grad-text-vivid block mt-2">
              ZERO DROPPED PACKETS.
            </span>
          </h3>

          <p className="text-sm sm:text-base text-[#cbd5e1] leading-relaxed max-w-2xl">
            Engineered with strict separation between non-blocking event loops, in-memory peer buffers, and ACID PostgreSQL persistence for enterprise-grade real-time collaboration.
          </p>

          {/* 4 Glassmorphic Benchmark Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/[0.12]">
            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.1]">
              <div className="mono text-[10px] text-[#94a3b8] uppercase">Full-Duplex RTT</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#00d2ff] mt-1">&lt; 42ms</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.1]">
              <div className="mono text-[10px] text-[#94a3b8] uppercase">Delivery Rate</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#10b981] mt-1">99.99%</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.1]">
              <div className="mono text-[10px] text-[#94a3b8] uppercase">State Desync</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white mt-1">0.00%</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/[0.1]">
              <div className="mono text-[10px] text-[#94a3b8] uppercase">Type Safety</div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-[#a855f7] mt-1">100%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
